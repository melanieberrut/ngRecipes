var express = require('express');
var app = express();
var path = require('path');
var routes = require('./routes');

// define property of application
app.set('port', 3000);

// Create our own middleware (app.use)
app.use(function(req, res, next){
	console.log(req.method, req.url);
	next();
});

// add.use = act as middleware
app.use(express.static(path.join(__dirname, 'public')));

app.use('/api', routes);

var server = app.listen(app.get('port'), function(){
	// extract port number from object
	var port = server.address().port;
	console.log("magic happens "+ port);

});


