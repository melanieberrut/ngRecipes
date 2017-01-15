require('./api/data/db.js');
var express = require('express');
var app = express();
var path = require('path');
var routes = require('./api/routes');
var bodyParser = require('body-parser');

// define property of application
app.set('port', 3000);

// Create our own middleware (app.use)
app.use(function(req, res, next){
	console.log(req.method, req.url);
	next();
});

// add.use = act as middleware
app.use(express.static(path.join(__dirname, 'public')));

// use middleware to get form body
// > method: urlencoded - method how html form sends
// > options: extended: true/false, false to only need
//            string and arrays from the form
app.use(bodyParser.urlencoded({ extended : false }));

app.use('/api', routes);

var server = app.listen(app.get('port'), function(){
	// extract port number from object
	var port = server.address().port;
	console.log("magic happens "+ port);

});


