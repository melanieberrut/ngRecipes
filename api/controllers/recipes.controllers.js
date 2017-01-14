var recipeData = require('../data/recipe-data.json');

// Get all recipes
module.exports.recipesGetAll = function(req, res){
	console.log('Get the recipes');
	console.log(req.query);

	// Set default values for query
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

	// take the data, slide it with the offset (starting point) and offset+count (end point)
	var returnData = recipeData.slice(offset, offset+count);

	res
	.status(200)
	.json( returnData );
};

// Get a specific recipe
module.exports.recipesGetOne = function(req, res){
	// get the recipeID from the req object
	var recipeId = req.params.recipeId;
	// use url parameter as location index for the array,
	// to return in the response
	var thisRecipe = recipeData[recipeId];
	console.log('Get recipeId '+ recipeId);
	res
	.status(200)
	.json( thisRecipe );
};