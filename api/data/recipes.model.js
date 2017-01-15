var mongoose = require('mongoose');

// Build a basic schema
//
// name: path | String: type
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
	currency: String
});

// mongoose.model( nameOfModel, schema, mongoDBcollection);
mongoose.model('Recipe', recipeSchema, 'recipes');