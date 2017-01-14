// require express
var express = require('express');

// extenciate the router
var router = express.Router();

var ctrlHotels = require('../controllers/recipes.controllers.js');

// mapping a controller to a route
router
	.route('/recipes')
	.get(ctrlHotels.recipesGetAll);

// Create a route for a specific recipe
router
	.route('/recipes/:recipeId')
	.get(ctrlHotels.recipesGetOne);

// export the router
module.exports = router;