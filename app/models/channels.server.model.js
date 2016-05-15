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
var ChannelModel= new Schema({
	user : {
		type: Schema.Types.ObjectId,
		role : String
	},
	date_created: {
		type: Date,
		default: new Date()
	},
	origin_url : {
		type : String
	},
	channel_paths : [{
		type : String
	}],
	channel_name : {
		type : String
	},
	channel_id : {
		type : String
	},
	message_count : {
		type : Number,
		default : 0
	},
	active : {
		type : Boolean,
		default : true
	},
	allowed_users: [{
		username: {
			type: String
		},
		user_id: {
			type: Schema.Types.ObjectId
		},
	}],
	allow_all_friends: {
		type: Boolean
	},
	public_channel: {
		type: Boolean
	},
	expiry_time : {
		type: Number,
		default: Infinity
	},
	expiry_count : {
		type: Number,
		default: Infinity
	},
	deleted : {
		type: Boolean,
		default: false
	}
});

mongoose.model('channels', ChannelModel);