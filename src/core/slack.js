/*
  Slack api
  message - https://api.slack.com/docs/messages
  message builder - https://api.slack.com/docs/messages/builder

*/

const request = require('request-promise-native');

async function messageToSlack(input) {
	const message = {
		text: input
	};
	const config = {
		method: 'PUT',
		preambleCRLF: true,
		postambleCRLF: true,
		uri: 'SLACK HOOK URL',
		body: JSON.stringify(message)
	};
	await request(config);
}

module.exports = { messageToSlack };
