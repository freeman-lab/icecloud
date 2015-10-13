#! /usr/bin/env node

var fs = require('fs')
var path = require('path')
var async = require('async')
var tinycloud = require('tinycloud')
var clicloud = require('clicloud')
var logger = clicloud.logger

var opts = {
  name: 'icecloud',
  options: [
    {
      name: 'builder',
      abbr: 'b',
      default: 'builder',
      help: 'Name for build machine'
    }
  ],
  commands: [
    {
      name: 'setup',
      command: setup,
      help: 'Setup icecc on the cluster'
    }
  ]
}

var cli = new clicloud(opts)

var args = cli.parse(process.argv)
args.ports = [22, 80, 8765, 10245]

function setup(input) {
  var args = input._[0]
  var cloud = input._[1]
  var log = new logger('setup')
  log.message('Setting up icecc on cluster')
  if (!args.keyfile) return log.error(new Error('Must provide identity keyfile (-i)'))

  cloud.list('scheduler', function(err, instances) {
    if (err) return log.error(err)
    if (instances.length === 0) return log.error(new Error('No instances found'))
    var ip = instances[0].privateip

    function all(next) {
      var exec = fs.readFileSync(path.join(__dirname, '.', 'exec', 'install.sh'))
      cloud.execute(null, null, args.keyfile, exec, function(err, data) {
        if (err) return log.error(err)
        next()
      })
    }

    function one(group) {
      return function setup(next) {
        log.message('Setting up ' + group)
        var exec = fs.readFileSync(path.join(__dirname, '.', 'exec', group + '.sh'))
        exec = exec.toString()
          .replace(new RegExp('{NAME}', 'g'), args.builder)
          .replace(new RegExp('{IP}', 'g'), ip)
        cloud.execute(group, null, args.keyfile, exec, function(err, data) {
          if (err) return next(err)
          next()
        })
      }
    }
    
    async.series([
      all,
      one('master'),
      one('scheduler'), 
      one('worker')
    ], function(err, data) {
      if (err) return log.error(err)
    })
  })
}

var groups = [
  {tag: 'master', count: 1},
  {tag: 'scheduler', count: 1},
  {tag: 'worker', count: args.count}
]

var cloud = new tinycloud(args, groups)

cli.init(args, cloud)
