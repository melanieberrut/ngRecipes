var dbconn = require('../data/db.connection.js');
var ObjectId = require('mongodb').ObjectId;
var recipeData = require('../data/recipe-data.json');

// Get all recipes
module.exports.recipesGetAll = function(req, res){

	var db = dbconn.get();
	// find which collection to use
	var collection = db.collection('recipes');

	var offset = 0;
	var count = 5;

	// extract the value
	// > Check if the query exist in the request
	// > and check that the query offset exist as well
	if( req.query && req.query.offset ) {
		// if both exist, offset param exist and define it as offset value
		// convert the string to a number
		offset = parseInt(req.query.offset, 10);
	}
	// > Check if the query exist in the request
	// > and check that the count offset exist as well
	if( req.query && req.query.count ) {
		// if both exist, offset param exist and define it as offset value
		// convert the string to a number
		count = parseInt(req.query.count, 10);
	}

	// find documents
	// querying the mongodb
	collection
		.find()
		.skip(offset) //define how many docs we are going to skip/offset
		.limit(count) // set the number of docs we want to return
		.toArray(function(err, docs){
			console.log("Found recipes", docs);

			res
			.status(200)
			.json(docs);

		});

};

// Get a specific recipe
module.exports.recipesGetOne = function(req, res){

	var db = dbconn.get();
	// find which collection to use
	var collection = db.collection('recipes');

	// get the recipeID from the req object
	var recipeId = req.params.recipeId;
	// use url parameter as location index for the array,
	// to return in the response
	var thisRecipe = recipeData[recipeId];
	console.log('Get recipeId '+ recipeId);

	collection
		.findOne({
			_id: ObjectId(recipeId)
		}, function(err, doc){
			res
			.status(200)
			.json( doc );
		});

};

// read the posted data, send to console.log() and return as json in the reponse
module.exports.recipesAddOne = function(req, res){
	console.log('POST new hotel');
	console.log(req.body);
	res
		.status(200)
		.json(req.body);
};