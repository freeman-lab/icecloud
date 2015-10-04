var aws = require('aws-ec2')

module.exports = function(credentials) {

	var client = aws(credentials.key, credentials.secret)

	function scheduler (opts, callback) {
		console.log(opts)
	}

	function worker (opts, callback) {
		console.log(opts)
	}

	return {
		scheduler: scheduler,
		worker: worker
	}

}

