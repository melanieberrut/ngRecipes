var express = require('express');

// define express
var app = express();
var path = require('path');

// define property of application
app.set('port', 3000);


// routing: listen to request on specific URLs, do something on the server, sending a response.
// define http method (get/post)
// specify path
// specify the function we need to run on the url

// req: contains the details about the ougoing request
// res: contains the data/method related to response
// homepage route:
app.get('/', function(req, res){
	console.log('Get the homepage');
	// send a response
	// Deliver HTML from express server
	res
		.status(200)
		.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// return json in the browser, like an API
app.get('/json', function(req, res){
	console.log('Get the json');
	// send a response
	res
		.status(200)
		.json({"jsonData": true});
});

// return file to browser
app.get('/file', function(req, res){
	console.log('Get the file');
	// send a response
	res
		.status(200)
		.sendFile(path.join(__dirname, 'app.js'));
});

// listen for requests and define port to listen to
// app.get to retrieve port variable
// app.listen is asynch, add anynomous function (callback) once app listen is finished running
// app.listen return object
var server = app.listen(app.get('port'), function(){

	// extract port number from object
	var port = server.address().port;
	console.log("magic happens "+ port);

});


