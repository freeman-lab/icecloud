var fs = require('fs')
var path = require('path')
var connect = require('../lib/connect.js')
var start = require('../lib/start.js')
var usage = require('../lib/usage.js')('launch.txt')

module.exports = {
  name: 'launch',
  command: launch,
  options: [
    {
      name: 'workers',
      boolean: false,
      default: 1,
      abbr: 'n'
    }
  ]
}

function launch(args) {

  if (args._.length === 0) return usage()
  if (args.workers < 1) return usage()

  var name = args._[0]

  var scheduler = {
    ImageId: 'ami-d05e75b8',
    InstanceType: 't1.micro',
    MinCount: 1, MaxCount: 1,
    SecurityGroupIds: name + '-scheduler'
  };

  var worker = {
    ImageId: 'ami-d05e75b8',
    InstanceType: 't1.micro',
    MinCount: 1, MaxCount: args.workers,
    SecurityGroupIds: name + '-worker'
  };

  var ec2 = connect()

  start(scheduler, 'scheduler')
  start(worker, 'worker')

}