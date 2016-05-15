'use strict';

module.exports = function(app) {
	// Root routing
	//var messagesCRUDController = require('../../app/controllers/messages.server.controller');
	var channelsCRUDController = require('../../app/controllers/channels.server.controller');
	
	app.route('/channels/save').post(channelsCRUDController.saveChannel);
	app.route('/channels/load').get(channelsCRUDController.loadChannels);
	app.route('/channels/me').get(channelsCRUDController.myChannels);
	
	// REST get by channel id
	app.route(/channels\/[A-z0-9]{24}/)
		.get(channelsCRUDController.readChannel)
		.post(channelsCRUDController.saveChannel)
}