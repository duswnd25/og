/* eslint-disable consistent-return */
const crypto = require('crypto');
const console = require('better-console');

Parse.Cloud.afterSave('Data', request => {
	const brightness = request.object.get('brightness');
	const humidity = request.object.get('humidity');
	const temperature = request.object.get('temperature');

	let isDataChange = false;

	if (brightness === undefined) {
		request.object.set('brightness', 0);
		isDataChange = true;
	}
	if (humidity === undefined) {
		request.object.set('humidity', 0);
		isDataChange = true;
	}	
  if (temperature === undefined) {
		request.object.set('temperature', 0);
		isDataChange = true;
	}

	if (isDataChange) {
		return request.object.save();
	}
});
