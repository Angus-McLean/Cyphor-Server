'use strict';

/**
 * Module dependencies.
 */
var passport = require('passport'),
	express = require('express');

module.exports = function(app) {
	// User Routes
	var users = require('../../app/controllers/users.server.controller');
	var alphaAdmin = require('../../app/controllers/admin/alpha.admin.server.controller');

	var adminRouter = express.Router();

	// Authenticate user as an admin
	adminRouter.use(function (req, res, next) {
		if(!req.user || req.user.roles.indexOf('admin') == -1){
			return res.redirect('/');
		}
		next();
	});

	// test authentication
	adminRouter.route('/authtest').get(function (req, res) {
		res.json(req.user);
	});


	adminRouter.route('/alpha/signup').post(alphaAdmin.signup);

	app.use('/admin', adminRouter);

};
