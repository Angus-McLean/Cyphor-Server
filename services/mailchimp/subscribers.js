// subscribers.js

var request = require('request'),
	config = require('./../../config/config.js'),
	chalk = require('chalk');

function addToList(listId, emailAddr, subscriberObj) {
	request({
		method: 'post',
		url: 'https://us13.api.mailchimp.com/3.0/lists/'+listId+'/members',
		headers : {
			'Content-Type' : 'application/json',
			'Authorization' : 'apikey '+config.mailer.options.auth.apikey
		},
		body : {
			email_address : emailAddr,
			status : 'subscribed'
		},
		json : true
	}, function (err, resp, body) {
		if(err){
			console.error(chalk.red('Failed to sync email '+emailAddr));
			console.log(chalk.red(err));
		} else {
			console.log(chalk.green('Synced with mailchimp : '+body.email_address));
		}
		
	});
}


module.exports = {
	subscribers : {
		addToList : addToList
	}
};
