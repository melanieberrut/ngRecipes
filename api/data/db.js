var mongoose = require('mongoose');
var dburl = 'mongodb://localhost:27017/meanRecipes';

mongoose.connect(dburl);

// listen to mongoose connection events
// 
mongoose.connection.on('connected', function(){
	// listen if connected
	console.log('Mongoose connected to ' + dburl);
});
mongoose.connection.on('disconnected', function(){
	// listen if disconnected
	console.log('Mongoose disconnected to ' + dburl);
});
mongoose.connection.on('error', function(err){
	// listen if error
	console.log('Mongoose connection error ' + err);
});

// When we are listening to the events, we will capture
// and stop the mongoose connection
//

process.on('SIGINT', function(){
	mongoose.connection.close(function(){
		console.log('Mongoose disconnected through app termination (SIGINT)');
		process.exit(0);
	});
});

process.on('SIGTERM', function(){
	mongoose.connection.close(function(){
		console.log('Mongoose disconnected through app termination (SIGTERM)');
		process.exit(0);
	});
});

process.once('SIGUSR2', function(){
	mongoose.connection.close(function(){
		console.log('Mongoose disconnected through app termination (SIGUSR2)');
		process.kill(process.pid, 'SIGUSR2');
	});
});

// Bring the schemas and models
require('./recipes.model.js');