'use strict';

/**
 * Module dependencies.
 */
 
var _ = require('lodash'),
	errorHandler = require('../errors.server.controller'),
	mongoose = require('mongoose'),
	User = mongoose.model('User'),
	ChannelObj = mongoose.model('channels');
 
exports.saveChannel = function(req, res) {

	if(req.user !== undefined && req.user !== null){
	    
	    ChannelObj.findOne({
			user : req.user._id,
			origin_url : req.body.origin_url,
			channel_name : req.body.channel_name
		}).exec(function(err, channelObj_res){
			if(err){
				res.status(500).send( 'Error reading channel from data base');
			}
			// a channel with that name already exists. Merge the channels
			if(channelObj_res){
				
				channelObj_res.channel_paths.push(req.body.channel_path);
				
			    channelObj_res.save(function(err){
				    if(err){
				        return res.status(400).send( errorHandler.getErrorMessage(err));
				    } else {
				        return res.status(200).send(channelObj_res);
				    }
				});
			} else {
				var channelObj = new ChannelObj();				//channel doesn't already exist, creating a new one
		    
			    channelObj.user = req.user;
				channelObj.date_created = new Date();
				channelObj.origin_url = req.body.origin_url;
				channelObj.channel_paths = [req.body.channel_path];
				channelObj.channel_name = req.body.channel_name;
				channelObj.channel_id = req.body.channel_id;
				channelObj.origin_url = req.body.origin_url;
		
			    
			    channelObj.save(function(err){
				    if(err){
				        return res.status(400).send( errorHandler.getErrorMessage(err));
				    } else {
				        return res.status(200).send(channelObj);
				    }
				});
			}
		});
	}
};

//
exports.loadChannels = function(req, res){
	//console.log('Loading channels : '+req.query.origin_url);
	if(req.user !== undefined && req.user !== null){
		ChannelObj.find({
			user : req.user._id,
			origin_url : req.query.origin_url
		})
		.exec(function(err, channelObj_results){
			if(err){
				res.status(500).send( 'Error reading channel from data base');
			}
			if(channelObj_results){
		        return res.status(200).send(channelObj_results);
			} else {
				res.status(200).send( 'Channel not found');
			}
		});
	} else {
		res.status(400).send( 'Not signed in');
	}
};


exports.myChannels = function(req, res){
	//console.log('loading all channels');
	if(req.user !== undefined && req.user !== null){
		ChannelObj.find({
			user : req.user._id
		})
		.exec(function(err, channelObj_results){
			if(err){
				res.status(500).send( 'Error reading channel from data base');
			}
			if(channelObj_results){
		        return res.status(200).send(channelObj_results);
			} else {
				res.status(200).send( 'Channel not found');
			}
		});
	} else {
		res.status(400).send( 'Not signed in');
	}
};

exports.readChannel = function(req, res){
	//console.log('Loading channels : '+req.query.origin_url);
	if(req.user !== undefined && req.user !== null){
		var docId = req.url.match(/channels\/([A-z0-9]{24})/);
		if(docId){
			docId = docId[1];
		} else {
			res.status(400).send('Couldn\'t extract 24 character Mongo key');
		}
		ChannelObj.find({
			user : req.user._id,
			_id : docId
		})
		.exec(function(err, channelObj_results){
			if(err){
				res.status(500).send( 'Error reading channel from data base');
			}
			if(channelObj_results){
		        return res.status(200).send(channelObj_results);
			} else {
				res.status(200).send([]);
			}
		});
	} else {
		res.status(400).send( 'Not signed in');
	}
};