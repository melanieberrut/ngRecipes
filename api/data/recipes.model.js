var mongoose = require('mongoose');

// Build a basic schema

// Nested schema for reviews (to be defined before the parent schema)
var reviewSchema = new mongoose.Schema({
	name : {
		type: String,
		required: true
	},
	stars: {
		type: Number,
		min: 0,
		max: 5,
		required: true
	},
	review: {
		type: String,
		required: true
	},
	createdOn: {
		type: Date,
		default: Date.now
	}
});

// Nested schema for rooms (to be defined before the parent schema)
var roomsSchema = new mongoose.Schema({
	type : String,
	number : Number,
	description : String,
	photos : [String],
	price: Number
});

// Parent schema
var recipeSchema = new mongoose.Schema({
	// name: String
	// stars: Number,
	name : {
		type: String,
		required: true // adding validation for field to be required
	},
	stars: {
		type: Number,
		min: 0,
		max: 5,
		default: 0 //if nothing have been defined
	},
	services: [String],
	description: String,
	photos: [String],
	currency: String,
	reviews: [reviewSchema], // parsing the name of the review schema inside the recipe schema
	rooms: [roomsSchema],
	location: {
		address: String,
		// longitude (E/W) first, latitude (N/S) second
		coordinates: {
			type: [Number],
			index: '2dsphere'// to use for location based search
		},

	}

});

// Compiling
//
// mongoose.model( nameOfModel, schema, mongoDBcollection);
mongoose.model('Recipe', recipeSchema, 'recipes');