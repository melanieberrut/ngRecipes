var mongoose = require('mongoose');
var User = mongoose.model('User');

module.exports.register = function(req, res){
	console.log('registering user');

	// Collect information from the FE
	var username = req.body.username;
	var name     = req.body.name || null; // not required field
	var password = req.body.password;

	// Create our user in DB
	User.create({
		username: username,
		name: name,
		password: password

	}, function(err, user) {
		if (err) {
			console.log(err);
			res.status(400).json(err);
		} else {
			console.log('user created', user);
			res.status(201).json(user);
		}
	});

};

module.exports.login = function(req, res){
	console.log('logging in user');

	// Collect information from the FE
	var username = req.body.username;
	var password = req.body.password;

	User.findOne({
		username: username
	}).exec(function(err, user){
		if (err) {
			console.log(err);
			res.status(400).json(err);
		} else {
			console.log('user found', user);
			res.status(200).json(user);
		}
	});
};