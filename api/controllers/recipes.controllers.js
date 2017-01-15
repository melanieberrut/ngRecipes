var mongoose = require('mongoose');
var Recipe = mongoose.model('Recipe');

var runGeoQuery = function(req, res){
	// extract values from query string
	var lng = parseFloat(req.query.lng);
	var lat = parseFloat(req.query.lat);
	// create geo Json point
	var point = {
		type: "Point",
		coordinates: [lng, lat]
	};
	var geoOptions = {
		// sphere or flat
		spherical: true,
		// limit distance of search
		maxDistance: 2000,
		// limit results
		num: 5
	};

	// Model.geoNear(GeoJSON, options, [callback])
	Recipe
		.geoNear(point, geoOptions, function(err, results, stats){
			console.log("geo results ", results);
			console.log("geo tats ", stats);
			res
				.status(200)
				.json(results);
		});

};

// Get all recipes
module.exports.recipesGetAll = function(req, res){

	var offset = 0;
	var count = 5;

	if(req.query && req.query.lat && req.query.lng) {
		// if query exist
		console.log("lat" , req.query.lat);
		runGeoQuery(req, res);
		return;
	}

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

	Recipe
		.find()
		.skip(offset) // define how many docs we are going to skip/offset
		.limit(count) // set the number of docs we want to return
		.exec(function(err, recipes){
			console.log("Found recipes", recipes.length);
			res
				.json(recipes);
		});

};

// Get a specific recipe
module.exports.recipesGetOne = function(req, res){

	// get the recipeID from the req object
	var recipeId = req.params.recipeId;

	Recipe
		.findById(recipeId)
		.exec(function(err, doc){
			res
			.status(200)
			.json( doc );
		});

};

// read the posted data, send to console.log() and return as json in the reponse
module.exports.recipesAddOne = function(req, res){

	var db = dbconn.get();
	// find which collection to use
	var collection = db.collection('recipes');
	var newRecipe;

	console.log('POST new hotel');
	// simple validation for property name and stars
	if( req.body && req.body.name && req.body.stars ){
		newRecipe = req.body;
		newRecipe.stars = parseInt(req.body.stars, 10);
		console.log("body ", newRecipe);
		collection.insertOne(newRecipe, function(err, response){
			console.log("response ", response);
			console.log("response.ops ", response.ops);
			// if success: send
			res
				.status(201) // status for new being added
				.json(response.ops);
		});
	} else {
		// if undefined, return 400 and error msg
		console.info('Data is missing from body');
		res
			.status(400)
			.json({ message : "Required data missing from body" });

	}

};