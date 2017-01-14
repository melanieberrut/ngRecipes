var express = require('express');

// define express
var app = express();
var path = require('path');

// define property of application
app.set('port', 3000);

// deliver a number of static file from express
// define folder for static files
// when express receive for a route, first thing,
// check if the route is match by any of the files
// within that defined folder. If it finds a match,
// it will deliver directly to the browser, without
// defining any routes
// will read: http://localhost:3000/index.html and http://localhost:3000/
app.use(express.static(path.join(__dirname, 'public')));
// Could also specify sub directories like this:
// app.use('public', express.static(path.join(__dirname, 'public')));
// browser will read index on http://localhost:3000/public/index.html


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


