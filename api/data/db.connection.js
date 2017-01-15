var MongoClient = require('mongodb').MongoClient;
var dburl = 'mongodb://localhost:27017/meanRecipes';

// open the connection
var _connection = null;
var open = function (){
	// set connection
	MongoClient.connect(dburl, function(err, db){
		// callback function once the connection is made or failed
		if(err) {
			console.info('Databse connection failed');
		} else {
			// save to _connection
			_connection = db;
			console.log('DB connection opened: ', db);
		}
	});
};

// retrieve the connection
var get = function () {
	return _connection;
};

module.exports = {
	open : open,
	get : get
};