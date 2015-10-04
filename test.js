var icecc = require('./index.js')

credentials = {
	'key': '',
	'secret': ''
}

options = {
	'workers': 2,
	'scheduler': 1,
	'zone':'us-east-1a',
	'instance':'t1-micro'
};

icecloud launch -n chrome

icecloud login -n chrome


var client = icecc(credentials)

client.scheduler(options, function(err, response) {

	console.log()

})

client.worker(options, function(err, response) {

	console.log()

})