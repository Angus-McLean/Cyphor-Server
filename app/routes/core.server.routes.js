'use strict';

var path = require("path");

module.exports = function(app) {
	// Root routing
	var core = require('../../app/controllers/core.server.controller');
	var binder = require('../../app/controllers/binder/binder.server.controller');
	var download = require('../../app/controllers/download.server.controller');
	
	app.route('/').get(core.index);
	
	//app.route('/download').get(download.sendZip);
	
	app.route(/\/binder\/\w+\/?$/).put(binder.put);
	app.route('/binder/:model/:docid')
		.put(binder.put)
		.get(binder.query);
	
	app.route('/downloadangusqwerty').get(download.sendZip);
	
	// app.route('/iframe').get(function (req, res) {
	// 	res.sendFile(path.resolve(__dirname+'/../views/iframe/div.iframe.html'))
	// })
	// app.use('/iframe', function (req, res, next) {
		
	// })
};