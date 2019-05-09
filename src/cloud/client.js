/* eslint-disable consistent-return */
const crypto = require('crypto');
const console = require('better-console');

Parse.Cloud.afterSave('Client', request => {
	const key = request.object.get('key');
	if (key === undefined) {
		console.info(`NEW CLIENT KEY GENERATE TO : ${request.object.id}`);
		const newKey = crypto
			.createHash('sha512')
			.update(request.object.id)
			.digest('hex');
		request.object.set('key', newKey);
		return request.object.save();
	}
});
