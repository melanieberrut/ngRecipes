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
				response.message = doc.reviews ? doc.reviews : [];
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

var _addReview = function(req, res, recipe){

	// pushed the review in the review array model instance
	recipe.reviews.push({
		name: req.body.name,
		rating: parseInt(req.body.rating, 10),
		review: req.body.review
	});

	// save the model instance by save the parent document
	recipe.save(function(err, recipeUpdated){
		console.log("recipeUpdated "+recipeUpdated);
		if ( err ) {
			console.log("Error trying to write the review " + err);
			res
				.status(500)
				.json(err);
		} else {
			console.log("Review has been added");
			res
				.status(201)
				.json(recipeUpdated.reviews[recipeUpdated.reviews -1]); //last review that's been added
		}
	});
};

// Add a review for a specific recipe
module.exports.reviewsAddOne = function(req, res){
	// get the recipeID from the req object
	var recipeId = req.params.recipeId;
	console.log('Add review to recipe number', recipeId);

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
				response.status = 500;
				response.message = err;
			} else if (!doc) {
				console.log("ReviewId is not found in DB ", recipeId);
				response.status = 404;
				response.message = { "message": "ReviewId is not found in DB " + recipeId };
			}
			if(doc) {
				_addReview(req, res, doc);
			} else {
				res
					.status( response.status )
					.json( response.message );
				
			}

		});
};