/* eslint-disable consistent-return */
const crypto = require('crypto');
const console = require('better-console');

Parse.Cloud.afterSave('Client', request => {
	const key = request.object.get('key');
	const status = request.object.get('status');
	const config = request.object.get('config');

	let isDataChange = false;

	if (key === undefined) {
		console.info(`NEW CLIENT KEY GENERATE TO : ${request.object.id}`);
		const newKey = crypto
			.createHash('sha512')
			.update(request.object.id)
			.digest('hex');
		request.object.set('key', newKey);
		isDataChange = true;
	}
	if (status === undefined) {
		request.object.set('status', {
			brightness: '0',
			humidity: 'true',
			temperature: '24',
			automode: 'false',
			fan: 'false',
			led: 'false',
			hum: 'true',
			image: ''
		});
		isDataChange = true;
	}

	if (config === undefined) {
		request.object.set('config', {
			brightnessSetValue: '500',
			humiditySetValue: '50',
			temperatureSetValue: '50',
			automode: 'true',
			fan: 'true',
			led: 'true',
			hum: 'true'
		});
		isDataChange = true;
	}

	if (isDataChange) {
		return request.object.save();
	}
});
