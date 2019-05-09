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

function getClientData(clientId) {
	return new Promise(async (resolve, reject) => {
		try {
			const Data = Parse.Object.extend('Data');
			const query = new Parse.Query(Data);
			query.equalTo('client', util.getPointer('Client', clientId));
			query.limit(100);
			const queryResults = await query.find();
			console.info(queryResults.length);
			const result = [];

			for (let index = 0; index < queryResults.length; index += 1) {
				const brightness = queryResults[index].get('brightness');
				const humidity = queryResults[index].get('humidity');
				const temperature = queryResults[index].get('temperature');
				const time = queryResults[index].createdAt;
				result.push({ brightness, humidity, temperature, time });
			}

			return resolve(result);
		} catch (error) {
			return reject(error);
		}
	});
}

module.exports = { updatePFCStatus, getClientData };
