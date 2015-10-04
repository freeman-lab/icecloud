var ec2 = require('../lib/connect.js')
var usage = require('../lib/usage.js')('login.txt')

module.exports = {
  name: 'login',
  command: login,
  options: []
}

function login(args) {

  if (args._.length === 0) return usage()

  var name = args._[0]

  var ec2 = connect()

  // TODO
  // connect to scheduler based on name
  // get public DNS
  // ssh into it

}