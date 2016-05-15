'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
	Schema = mongoose.Schema,
	crypto = require('crypto');

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
		type: Date,
		default: new Date()
	}
});

mongoose.model('forms', FormModel);