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

exports.contact = function(req, res) {

    var formsObj = new formsModel();

    formsObj.user = req.user;
    formsObj.formType = 'contact';

    delete (req.body.contactnofill);
    formsObj.formData = req.body;

    formsObj.save(function(err){
	    if(err){
	        return res.status(400).send(err);
	    } else {
	        return res.status(200).send(formsObj);
	    }
	});

	mailchimp.subscribers.addToList(config.mailer.lists.beta, formsObj.formData.email, formsObj);
};

exports.subscribe = function(req, res) {

    var formsObj = new formsModel();

    formsObj.user = req.user;
    formsObj.formType = 'subscribe';

    delete (req.body.subscribenofill);
    formsObj.formData = req.body;

    formsObj.save(function(err, savedObj){
	    if(err){
	        return res.status(400).send(err);
	    } else {
	        return res.status(200).send(savedObj);
	    }
	});

	mailchimp.subscribers.addToList(config.mailer.lists.beta, formsObj.formData.email, formsObj);
};

exports.bugreport = function(req, res) {
    console.log(req.body);

    var formsObj = new formsModel();

    formsObj.user = req.user;
    formsObj.formType = 'bugreport';

    formsObj.formData = req.body;

    formsObj.save(function(err, savedObj){
	    if(err){
	        return res.status(400).send(err);
	    } else {
	        return res.status(200).send(savedObj);
	    }
	});

};

exports.feedback = function(req, res) {
    console.log(req.body);

    var formsObj = new formsModel();

    formsObj.user = req.user;
    formsObj.formType = 'feedback';

    formsObj.formData = req.body;

    formsObj.save(function(err, savedObj){
	    if(err){
	        return res.status(400).send(err);
	    } else {
	        return res.status(200).send(savedObj);
	    }
	});

};
