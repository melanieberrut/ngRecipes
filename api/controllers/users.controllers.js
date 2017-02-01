var mongoose = require('mongoose');
var User = mongoose.model('User');
var bcrypt = require('bcrypt-nodejs');
var jwt = require('jsonwebtoken');

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
		password: bcrypt.hashSync(password, bcrypt.genSaltSync(10))

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
			if (bcrypt.compareSync(password, user.password)) {
				console.log('user found', user);
				// sign a token: {payload}, @secret, {expiresin}
				var token = jwt.sign( {username: user.username}, 's3cr3t', {expiresIn: 3600});
				res.status(200).json({ success: true, token: token });
			} else {
				res.status(401).json('Unauthorized');
			}
		}
	});
};

module.exports.authenticate = function(req, res, next){
	// Next parameter: express middleware
	// check for jwt token, and if valid, should call next middleware function
	//
	// check for header
	var headerExist = req.headers.authorization;
	if (headerExist) {
		// split the headers.authorization
		// header sample: Bearer token (space in between)
		var token = req.headers.authorization.split(' ')[1];
		jwt.verify(token, 's3cr3t', function(error, decoded) {
			if (error) {
				console.log("Unauthorized error ", error);
				res.status(401).json('Unauthorized');
			} else {
				// add property to request
				req.user = decoded.username;
				next();
			}
		});
	} else {
		res.status(403).json('No token provided');
	}
};