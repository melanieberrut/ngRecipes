var mongoose = require('mongoose');
var Recipe = mongoose.model('Recipe');

// Get all reviews for a hotel
module.exports.reviewsGetAll = function(req, res){
	// get the recipeID from the req object
	var recipeId = req.params.recipeId;

	Recipe
		.findById(recipeId)
		.select('reviews') // restrict to return not the whole recipe but just the reviews
		.exec(function(err, doc){
			res
			.status(200)
			.json( doc.reviews );
		});
};

// Get single reviews for a hotel
module.exports.reviewsGetOne = function(req, res){
	// extract IDs
	var recipeId = req.params.recipeId;
	var reviewId = req.params.reviewId;
	console.log("GET reviewId " + reviewId + " for recipeId " + recipeId );

	Recipe
		.findById(recipeId)
		.select('reviews') // restrict to return not the whole recipe but just the reviews
		.exec(function(err, recipe){
			console.log("Returned recipe ", recipe);
			var review = recipe.reviews.id(reviewId);
			res
			.status(200)
			.json( review );
		});
};