var usage = require('../lib/usage.js')('root.txt')

module.exports = {
  name: '',
  options: [
    { name: 'version', boolean: false }
  ],
  command: onCommand
}

function onCommand (args) {
  if (args.version) return console.log(require('../package.json').version)
  return usage()
}