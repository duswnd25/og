const reqlib = require('app-root-path').require;
const console = require('better-console');

const util = reqlib('/src/core/utils.js');

// update pfc status
function updatePFCStatus(clientId, key, brightness, humidity, temperature) {
	return new Promise(async (resolve, reject) => {
		try {
			console.info(humidity);
			const clientObject = await util.getClientObject(clientId, key);
			const Data = Parse.Object.extend('Data');
			const status = new Data();
			status.set('brightness', Number.parseInt(brightness, 10));
			status.set(
				'humidity',
				Number.parseFloat(Number.parseFloat(humidity).toFixed(3))
			);
			status.set(
				'temperature',
				Number.parseFloat(Number.parseFloat(temperature).toFixed(3))
			);
			status.set('client', clientObject);
			await status.save();
			return resolve();
		} catch (error) {
			return reject(error);
		}
	});
}

module.exports = { updatePFCStatus };
