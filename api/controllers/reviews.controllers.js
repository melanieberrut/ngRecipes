var mongoose = require('mongoose');
var Recipe = mongoose.model('Recipe');

// Get all reviews for a hotel
module.exports.reviewsGetAll = function(req, res){
	// get the recipeID from the req object
	var recipeId = req.params.recipeId;
	console.log('GET reviews for recipeId', recipeId);

	Recipe
		.findById(recipeId)
		.select('reviews') // restrict to return not the whole recipe but just the reviews
		.exec(function(err, doc){

			var response = {
				status : 200,
				message : []
			};

			if ( err ) {
				console.log("Error finding review");
				response.status = 404;
				response.message = err;
			} else if (!doc) {
				console.log("ReviewId is not found in DB ", recipeId);
				response.status = 404;
				response.message = { "message": "ReviewId is not found in DB " + recipeId };
			} else {
				response.message = doc.reviews ? docs.reviews : [];
			}

			res
				.status( response.status )
				.json( response.message );
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

			var response = {
				status : 200,
				message : {}
			};

			if ( err ) {
				console.log("Error getting review");
				response.status = 500;
				response.message = err;
			} else if (!recipe) {
				console.log("ReviewId is not found in DB ", reviewId);
				response.status = 404;
				response.message = { "message": "ReviewId is not found in DB " + reviewId };
			} else {
				// Get the review
				response.message = recipe.reviews.id(reviewId);
				// If the review doesn't exist Mongoose returns null
				if (!response.message) {
					response.status = 404;
					response.message = {
						"message" : "Review ID not found " + reviewId
					};
				}
			}

			var review = recipe.reviews.id(reviewId);
			res
				.status(response.status)
				.json(response.message);
		});
};