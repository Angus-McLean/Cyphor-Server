'use strict';

/**
 * Module dependencies.
 */
var _ = require('lodash'),
	path = require('path'),
    mongoose = require('mongoose'),
	passport = require('passport'),
	User = mongoose.model('User'),
	config = require('./../../config/config.js'),
	mailchimp = require('./../../services/mailchimp.js'),
	errorHandler = require('./errors.server.controller');	

exports.config = function(req, res) {
	if(!req.user) {
		return res.status(400).send(null);
	}

	res.json({
		extension_url : 'https://chrome.google.com/webstore/detail/oiahaghleeahnipdomfflikocpomnpnh'
	});
};

/**
 * Invite
 */
exports.invite = function(req, res) {

	// validate that user is signed in
	if(!req.user) {
		return res.status(403).send('You must be logged in to invite a friend');
	}

	// validate invite token
	if(req.user.tokens.available.indexOf(req.body.invite_token) == -1) {
		return res.status(403).send('Invalid invite token.');
	}

	// validate invite token hasn't already been used
	if(req.user.tokens.used.indexOf(req.body.invite_token) != -1) {
		return res.status(403).send('This invite token has already been used.');
	}

	// get fields
	var {email, invite_token} = req.body;

	var userObj = {
		username : email,
		password : invite_token,
		email : email
	};

	// Init Variables
	var user = new User(userObj);

	user.referral = req.user.email;
	user.tokens.personal = invite_token;
	user.roles = ['user', 'alpha-invite'];

	var message = null;

	// Add missing user fields
	user.provider = 'local';

	// Then save the user
	user.save(function(err) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {

			// delete sensitive user data
			user.tokens = undefined;
			user.password = undefined;
			user.salt = undefined;

			// New person successfully added to the DB. Mark that token as used in user's doc
			req.user.tokens.used.push(invite_token);
			req.user.invited_users.push(email);

			req.user.save(function (err) {
				if(err){
					console.error(errorHandler.getErrorMessage(err));
					return res.status(200).json(user);
				} else {
					return res.status(200).json(user);
				}
			});
		}
	});
};
