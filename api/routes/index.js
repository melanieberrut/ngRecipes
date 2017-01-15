// require express
var express = require('express');

// extenciate the router
var router = express.Router();

var ctrlRecipes = require('../controllers/recipes.controllers.js');
var ctrlReviews = require('../controllers/reviews.controllers.js');

// ***
// Recipes
// ***

// mapping a controller to a route
router
	.route('/recipes')
	.get(ctrlRecipes.recipesGetAll);

// Create a route for a specific recipe
router
	.route('/recipes/:recipeId')
	.get(ctrlRecipes.recipesGetOne);

// route to add a new hotel
router
	.route('/recipes/new')
	.post(ctrlRecipes.recipesAddOne);


// ***
// Reviews
// ***

router
	.route('/recipes/:recipeId/reviews')
	.get(ctrlReviews.reviewsGetAll);

router
	.route('/recipes/:recipeId/reviews/:reviewId')
	.get(ctrlReviews.reviewsGetOne);


// export the router
module.exports = router;