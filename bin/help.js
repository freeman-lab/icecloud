var usage = require('../lib/usage.js')('root.txt')

module.exports = {
  name: 'help',
  command: function () { return usage() },
  options: []
}