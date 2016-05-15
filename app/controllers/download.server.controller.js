'use strict';

/**
 * Module dependencies.
 */
exports.sendZip = function(req, res) {
	//res.setHeader('Content-disposition', 'attachment; filename=CryptoLayer.zip');
	var filePath = __dirname + '/../../public_static/chrome_app/chrome_appv2.zip';
	
	res.setHeader('Content-type', 'application/zip');
	
	res.download(filePath);
};