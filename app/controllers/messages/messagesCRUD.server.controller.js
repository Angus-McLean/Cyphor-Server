'use strict';

/**
 * Module dependencies.
 */
 
var _ = require('lodash'),
	errorHandler = require('../errors.server.controller'),
	mongoose = require('mongoose'),
	User = mongoose.model('User'),
	MessageObj = mongoose.model('MessageObj'),
	path = require('path');
 
exports.saveMessage = function(req, res) {

	if(req.user !== undefined && req.user !== null){
	    var messageObj = new MessageObj();
    
	    messageObj.user = req.user;
		messageObj.messageID = req.body.messageID;
		messageObj.messageText = req.body.messageText;
		messageObj.key = req.body.key;
		messageObj.date_created = req.body.date_created;
		messageObj.expiry_date = req.body.expiry_date;
		messageObj.permissions = {
			allow_all_friends: req.body.permissions.allow_all_friends,
			public_message: req.body.permissions.public_message
		};
	    
	    
	    
	    
	    messageObj.save(function(err){
		    if(err){
		        return res.status(400).send({
	                success: false,
	                message: errorHandler.getErrorMessage(err)
	            });
		    } else { 
		        return res.status(200).send({
	                success: true,
	                messageObj : messageObj
	            });
		    }
		});
	}
};

//
exports.loadMessage = function(req, res){
	console.log('Loading message : '+req.body.messageID);
	MessageObj.findOne({
		messageID: req.body.messageID
	}).exec(function(err, messageObj){
		if(err){
			res.status(500).send({
	            success: false,
	            message: 'Error reading message from data base'
	        });
		}
		if(messageObj){
			res.status(200).send({
	            success: true,
	            message: '',
	            messageObj: messageObj
	        });
		} else {
			res.status(200).send({
	            success: false,
	            message: 'Key not found'
	        });
		}
	});
};

exports.readMessage = function(req, res){
	res.sendFile(path.join(__dirname, '../../../public_static/messages.html'));	
};