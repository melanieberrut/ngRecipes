var express = require('express');

// define express
var app = express();
var path = require('path');

// define property of application
app.set('port', 3000);

// Create our own middleware (app.use)
// Parameters: request object,  response object, next
// position in the app.js matters, it needs to be
// before the static files
app.use(function(req, res, next){
	// check what the method is and what is the URL
	console.log(req.method, req.url);
	next();
});
// Output in terminal:
// GET /
// GET /css/bootstrap.min.css
// GET /css/custom.css
// GET /jquery/jquery-3.1.1.min.js
// GET /images/logo.png

// you could also only restrict to a folder:
// app.use('/css ',function(req, res, next){
// 	// check what the method is and what is the URL
// 	console.log(req.method, req.url);
// 	next();
// });
// Output in terminal:
// GET /bootstrap.min.css
// GET /custom.css

// add.use = act as middleware
app.use(express.static(path.join(__dirname, 'public')));


app.get('/json', function(req, res){
	console.log('Get the json');
	res
		.status(200)
		.json({"jsonData": true});
});

// return file to browser
app.get('/file', function(req, res){
	console.log('Get the file');
	res
		.status(200)
		.sendFile(path.join(__dirname, 'app.js'));
});

var server = app.listen(app.get('port'), function(){
	// extract port number from object
	var port = server.address().port;
	console.log("magic happens "+ port);

});


