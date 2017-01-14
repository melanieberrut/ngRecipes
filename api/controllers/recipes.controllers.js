var recipeData = require('../data/recipe-data.json');

// Get all recipes
module.exports.recipesGetAll = function(req, res){
	console.log('Get the recipes');
	res
	.status(200)
	.json( recipeData );
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