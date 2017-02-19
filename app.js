require('./api/data/db.js');
var express = require('express');
var app = express();
var path = require('path');
var routes = require('./api/routes');
var bodyParser = require('body-parser');
var router = express.Router();
// define property of application
app.set('port', 3000);

// Create our own middleware (app.use)
app.use(function(req, res, next){
	console.log(req.method, req.url);
	next();
});

// add.use = act as middleware
app.use(express.static(path.join(__dirname, 'public')));
// allow node module folder
app.use('/node_modules', express.static(path.join(__dirname + '/node_modules')));
// allow fonts folder
app.use('/fonts', express.static(path.join(__dirname + '/fonts')));

// use middleware to get form body
// > method: urlencoded - method how html form sends
// > options: extended: true/false, false to only need
//            string and arrays from the form
app.use(bodyParser.urlencoded({ extended : false }));
// Tell API to understand JSON data
app.use(bodyParser.json());


app.use('/api', routes);

// Just send the index.html for other files to support HTML5Mode
app.all('*', function(req, res) {
    res.sendFile( 'index.html', { root: path.join(__dirname, '/public/') } );
});

var server = app.listen(app.get('port'), function(){
	// extract port number from object
	var port = server.address().port;
	console.log("magic happens "+ port);

});


