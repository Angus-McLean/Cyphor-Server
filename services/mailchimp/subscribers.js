// subscribers.js

var request = require('request'),
	config = require('./../../config/config.js'),
	chalk = require('chalk');

function addToList(listId, emailAddr, subscriberObj) {
	request.post({
		url: 'https://usX.api.mailchimp.com/3.0/lists/'+listId+'/members',
		headers : {
			'content-type' : 'application/json',
			'Authorization' : 'apikey '+config.mailer.options.auth.apikey
		},
		body : {
			email_address : emailAddr,
			status : (subscriberObj && subscriberObj.status) || 'subscribed'
		},
		json : true
	}, function (err, resp, body) {
		if(err){
			console.error(chalk.red('Failed to sync email '+emailAddr));
			console.log(chalk.red(err));
		}
	});
}


module.exports = {
	subscribers : {
		addToList : addToList
	}
};
