'use strict';

module.exports = function(app) {

	var formsController = require('../../app/controllers/forms.server.controller');

	app.route('/forms/contact').post(formsController.contact);
	app.route('/forms/subscribe').post(formsController.subscribe);
	
	
};