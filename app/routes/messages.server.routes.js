'use strict';

module.exports = function(app) {
	// Root routing
	//var messagesCRUDController = require('../../app/controllers/messages.server.controller');
	var messagesCRUDController = require('../../app/controllers/messages.server.controller');
	
	/*
	app.route('/messages/:id').get(function(req, res){
		console.log(req.params.id);
		res.status(200).send({
			success: true,
			message: 'Parsed message ID : '+req.params.id
		});
	});
	*/
	app.route('/messages/:id').get(messagesCRUDController.readMessage);
	
	app.route('/messages/save').post(messagesCRUDController.saveMessage);
	app.route('/messages/load').post(messagesCRUDController.loadMessage);
	
	
};