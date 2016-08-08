'use strict';

module.exports = function(app) {

	var alphaController = require('../../app/controllers/alpha.server.controller');

	app.route('/alpha/config').get(alphaController.config);

	app.route('/alpha/invite').post(alphaController.invite);
};
