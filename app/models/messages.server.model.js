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
var MessageSchema = new Schema({
	user: {
		type: Schema.Types.ObjectId
	},
	messageID: {
		type: Number
	},
	messageText: {
		type: String	
	},
	key: {
		type: String
	},
	date_created: {
		type: Date,
		default: new Date()
	},
	allowed_users: [{
		username: {
			type: String
		},
		user_id: {
			type: Schema.Types.ObjectId
		},
		reads: [{
			date: {
				type: Date
			}
		}],
		max_reads: {
			type: Number
		},
		expiry_date: {
			type: Date
		},
		revoked: {
			type: Boolean
		}
	}],
	allow_all_friends: {
		type: Boolean
	},
	public_message: {
		type: Boolean
	},
	deleted : {
		type: Boolean
	}
});

mongoose.model('MessageObj', MessageSchema);