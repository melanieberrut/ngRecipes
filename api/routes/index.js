// require express
var express = require('express');

// extenciate the router
var router = express.Router();

var ctrlRecipes = require('../controllers/recipes.controllers.js');
var ctrlReviews = require('../controllers/reviews.controllers.js');
var ctrlUsers   = require('../controllers/users.controllers.js');

// ***
// Recipes
// ***

// mapping a controller to a route
router
	.route('/recipes')
	.get(ctrlUsers.authenticate, ctrlRecipes.recipesGetAll)
	.post(ctrlRecipes.recipesAddOne); // add a new hotel

// Create a route for a specific recipe
router
	.route('/recipes/:recipeId')
	.get(ctrlRecipes.recipesGetOne)
	.put(ctrlRecipes.recipesUpdateOne)
	.delete(ctrlRecipes.recipesDeleteOne);


// ***
// Reviews
// ***

router
	.route('/recipes/:recipeId/reviews')
	.get(ctrlReviews.reviewsGetAll)
	.post(ctrlReviews.reviewsAddOne);

router
	.route('/recipes/:recipeId/reviews/:reviewId')
	.get(ctrlReviews.reviewsGetOne)
	.put(ctrlReviews.reviewsUpdateOne)
	.delete(ctrlReviews.reviewsDeleteOne);


// ***
// Authentication
// ***

router
	.route('/users/register')
	.post(ctrlUsers.register);

router
	.route('/users/login')
	.post(ctrlUsers.login);

// export the router
module.exports = router;