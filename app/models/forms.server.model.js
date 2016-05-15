"use strict";

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
	Schema = mongoose.Schema,
	crypto = require('crypto'),
	mailchimp = require('./../../services/mailchimp.js');

/**
 * User Schema
 */
var FormModel= new Schema({
	user : {
		type: Schema.Types.ObjectId,
		role : String
	},
	formType : {
		type : String
	},
	formData : Schema.Types.Mixed,
	date_created: {
		type: Date
	}
});

/**
 * Hook a pre save method to set created date
 */
FormModel.pre('save', function(next) {
	this.created = Date.now();

	next();
});

/**
 * Hook a pre save method to sync with mailchimp db
 */
FormModel.pre('save', function(next) {
	mailchimp.subscribers.addToList('12a516a5f0', this.formData.email);
});

mongoose.model('forms', FormModel);
