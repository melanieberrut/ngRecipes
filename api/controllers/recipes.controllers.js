var mongoose = require('mongoose');
var Recipe = mongoose.model('Recipe');

var runGeoQuery = function(req, res){
	// extract values from query string
	var lng = parseFloat(req.query.lng);
	var lat = parseFloat(req.query.lat);

	// Validate that lng & lat value
	// in the query string are numbers
	if( isNaN(lng) || isNaN(lat) ){
		res
			.status(400)
			.json({
				"message": "If supplied in querystring, lng, and lat must both be numbers"
			});
	}

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

			if( err ) {
				res
					.status(500)
					.json(err);
			} else {
				res
					.status(200)
					.json(results);
			}
		});

};

// Get all recipes
module.exports.recipesGetAll = function(req, res){

	var offset = 0;
	var count = 5;
	var maxCount = 10;

	if(req.query && req.query.lat && req.query.lng) {
		// if query exist
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

	// Validate that offest & count value in the query string
	// are numbers
	if (isNaN(offset) || isNaN(count)) {
		res
			.status(400)
			.json({
				"message": "If supplied in querystring count and offset should be numbers"
			});
		return;
	}

	// Prevent with maximum of request for records
	if(count > maxCount) {
		res
			.status(400)
			.json({
				"message": "Count limit of "+ maxCount + " exceeded"
			});
		return;
	}

	Recipe
		.find()
		.skip(offset) // define how many docs we are going to skip/offset
		.limit(count) // set the number of docs we want to return
		.exec(function(err, recipes){

			if(err) {

				console.log("Error finding recipes");
				res
					.status(500)
					.json(err);
			} else {

				console.log("Found recipes", recipes.length);
				res
					.json(recipes);
			}
		});

};

// Get a specific recipe
module.exports.recipesGetOne = function(req, res){

	// get the recipeID from the req object
	var recipeId = req.params.recipeId;

	Recipe
		.findById(recipeId)
		.exec(function(err, doc){

			// Hold the status and message of response
			var response = {
				status : 200,
				message: doc
			};

			if (err) {

				console.log("Error finding recipe");
				response.status = 500;
				response.message = err;

			} else if (!doc) {
				// if the document is empty
				response.status = 404;
				response.message = { "message": "Recipe ID not found"};

			}

			res
				.status(response.status)
				.json(response.message);

		});

};

var _slitArray = function(input){
		var output;
		if (input && input.length > 0) {
			output = input.split(";");
		} else {
			output = [];
		}
		return output;
	};

// read the posted data, send to console.log() and return as json in the reponse
module.exports.recipesAddOne = function(req, res){

	console.log('POST new Recipe');

	Recipe
		.create({
			name: req.body.name,
			description: req.body.description,
			stars: parseInt(req.body.stars, 10),
			services: _slitArray(req.body.services), // convert string into array
			photos: _slitArray(req.body.photos), // convert string into array
			currency: req.body.currency,
			location: {
				address: req.body.address,
				coordinates: [parseFloat(req.body.lng), parseFloat(req.body.lat)]
			}

		}, function(err, recipe){
			// run when create method completed

			if(err) {
				console.log("Error creating recipe: "+ err);
				res
					.status(400)
					.json(err);
			} else {
				console.log("Recipe created ", recipe);
				res
					.status(201)
					.json(recipe);
			}

		});

};

// Update specific recipe
module.exports.recipesUpdateOne = function(req, res){
	// update the specific document

	// get the recipeID from the req object
	var recipeId = req.params.recipeId;

	Recipe
		// 1- Find specific document to create a model instance
		.findById(recipeId)
		.select("-reviews -rooms")  // exclide reviews and rooms
		.exec(function(err, recipe){
			console.log("recipesUpdateOne ", recipe);

			if (err) {
				console.log("Error finding recipe");
				res
				.status(500)
				.json(err);
				return;
			} else if(!recipe) {
				console.log("recipeId not found in database", recipeId);
				res
				.status(404)
				.json({
					"message" : "Recipe ID not found " + recipeId
				});
				return;
			}


			// 2- update model data instance
			recipe.name        = req.body.name;
			recipe.description = req.body.description;
			recipe.stars       = parseInt(req.body.stars, 10);
			recipe.services    = _slitArray(req.body.services); // convert string into array
			recipe.photos      = _slitArray(req.body.photos); // convert string into array
			recipe.currency    = req.body.currency;
			recipe.location    = {
				address: req.body.address,
				coordinates: [parseFloat(req.body.lng), parseFloat(req.body.lat)]
			};

			// 3- Save model to mongoDB
			recipe.save(function(err, recipeUpdated){

				if( err ){
					console.log("Error saving the model");
					res
						.status(500)
						.json(err);
				} else {
					console.log(">>> recipeUpdated ", recipeUpdated);
					console.log("Updated");
					res
						.status(204)
						.json(); //empty
				}
			});


		});

};

// delete specific recipe
module.exports.recipesDeleteOne = function(req, res){

	// get the recipeID from the req object
	var recipeId = req.params.recipeId;

	Recipe
		// 1- Find specific document to create a model instance
		.findByIdAndRemove(recipeId)
		.exec(function(err, recipe){
			if( err ) {
				res
					.status(404)
					.json(err);
			} else {
				console.log("Recipe deleted, id: ", recipeId);
				res
					.status(204)
					.json();
			}
		});
};
