var recipeData = require('../data/recipe-data.json');

module.exports.recipesGetAll = function(req, res){
	console.log('Get the recipes');
	res
	.status(200)
	.json( recipeData );
};