'use strict';

/**
 * Module dependencies.
 */
var _ = require('lodash'),
    mongoose = require('mongoose'),
    formsModel = mongoose.model('forms'),
    path = require('path'),
	config = require('./../../config/config.js'),
	mailchimp = require('./../../services/mailchimp.js');



exports.config = function(req, res) {
	if(!req.user) {
		return res.status(400).send(null);
	}

	res.json({
		extension_url : 'https://chrome.google.com/webstore/detail/oiahaghleeahnipdomfflikocpomnpnh'
	});
};
