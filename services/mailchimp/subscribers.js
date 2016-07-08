// subscribers.js

var request = require('request'),
	config = require('./../../config/config.js'),
	chalk = require('chalk');

function convertDocToMailChimp(doc) {
	switch (doc.formType) {
		case 'subscribe':
			return subscribeToMC(doc);
		case 'contact':
			return contactToMC(doc);
		default:
			return null;
	}
}

function subscribeToMC (subscriberDoc) {
	return {
		email_address : subscriberDoc.formData.email,
		status : 'subscribed',
		merge_fields : {
			PSEUDONYM : (subscriberDoc.formData && subscriberDoc.formData.pseudonym),
			FORMTYPE : 'subscribe'
		}
	};
}

function contactToMC (contactDoc) {
	return {
		email_address : contactDoc.formData.email,
		status : 'subscribed',
		merge_fields : {
			PSEUDONYM : (contactDoc.formData && (contactDoc.formData.pseudonym || contactDoc.formData.name)),
			FORMTYPE : 'contact'
		}
	};
}

function addToList(listId, emailAddr, subscriberDoc) {

	var mailChimpDoc = convertDocToMailChimp(subscriberDoc);
	console.log('mailChimpDoc', mailChimpDoc);
	if(!emailAddr || !mailChimpDoc) return;

	request({
		method: 'post',
		url: config.mailer.options.baseURL + 'lists/' + listId + '/members',
		headers : {
			'Content-Type' : 'application/json',
			'Authorization' : 'apikey '+config.mailer.options.auth.apikey
		},
		body : mailChimpDoc,
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
