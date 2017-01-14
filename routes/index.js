// require express
var express = require('express');

// extenciate the router
var router = express.Router();


// assign to the router
router
	.route('/json')
	.get(function(req, res){
		console.log('Get the json');
		res
		.status(200)
		.json({"jsonData": true});
	})
	.post(function(req, res){
		console.log('Post the json');
		res
		.status(200)
		.json({"jsonData": "POST received"});
	});

// export the router
module.exports = router;