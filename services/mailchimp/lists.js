// lists.js

var request = require('request'),
	config = require('./../../config/config.js'),
	chalk = require('chalk'),
	Promise = require('bluebird'),
	_ = require('lodash');

// returns : {lists:[]}
function getAllLists() {
	return request.get({
		url: config.mailer.options.baseURL + '/lists',
		headers : {
			'Content-Type' : 'application/json',
			'Authorization' : 'apikey '+config.mailer.options.auth.apikey
		},
		json : true
	})
	.catch(function (err) {
		console.log(chalk.red(err));
	});
}

// returns : { members : []}
function getMembers(listId) {
	return request.get({
		url: config.mailer.options.baseURL + '/lists/' + '/members',
		headers : {
			'Content-Type' : 'application/json',
			'Authorization' : 'apikey '+config.mailer.options.auth.apikey
		},
		json : true
	})
	.catch(function (err) {
		console.log(chalk.red(err));
	});
}

function getListByName(listName, cb) {
	return new Promise(function (res, rej) {
		getAllLists().then(function (listsObj) {
			var filt = _.filter({name : listName});
			if(filt && filt.length){
				res(filt);
			} else {
				rej('Mailchimp list not found');
			}
		});
	});
}

module.exports = {
	lists : {
		getAllLists : getAllLists,
		getMembers : getMembers,
		getListByName : getListByName
	}
};
