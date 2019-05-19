const reqlib = require('app-root-path').require;
const moment = require('moment-timezone');

const util = reqlib('/src/core/utils.js');

// update pfc status
function createLog(clientId, key, brightness, humidity, temperature) {
	return new Promise(async (resolve, reject) => {
		try {
			const clientObject = await util.getClientObject(clientId, key);
			const Data = Parse.Object.extend('Data');
			const status = new Data();
			status.set('brightness', Number.parseInt(brightness, 10));
			status.set('humidity', Number.parseInt(humidity, 10));
			status.set('temperature', Number.parseInt(temperature, 10));
			status.set('client', clientObject);
			await status.save();
			return resolve();
		} catch (error) {
			return reject(error);
		}
	});
}

function updateClientStatus(
	clientId,
	key,
	brightness,
	humidity,
	temperature,
	automode,
	fan,
	led,
	hum,
	image
) {
	return new Promise(async (resolve, reject) => {
		try {
			const Client = Parse.Object.extend('Client');
			const query = new Parse.Query(Client);
			const queryResult = await query.get(clientId);

			if (queryResult.get('key') !== key) {
				return reject();
			}

			queryResult.set('status', {
				brightness,
				humidity,
				temperature,
				automode,
				fan,
				led,
				hum
			});

			const file = new Parse.File(
				'pic.jpg',
				new Buffer(image).toString('binary'),
				'image/png'
			);

			queryResult.set('image', await file.save);

			await queryResult.save();
			return resolve();
		} catch (error) {
			return reject(error);
		}
	});
}

// update pfc status
function updateHalftimeValue(clientId, key, brightness, humidity, temperature) {
	return new Promise(async (resolve, reject) => {
		try {
			const Client = Parse.Object.extend('Client');
			const query = new Parse.Query(Client);
			const clientObject = await query.get(clientId);

			if (clientObject.get('key') !== key) {
				return reject();
			}

			const Halftime = Parse.Object.extend('Halftime');
			const recentData = new Halftime();
			recentData.set('brightness', parseInt(brightness, 10));
			recentData.set('humidity', parseInt(humidity, 10));
			recentData.set('temperature', parseInt(temperature, 10));
			await recentData.save();

			return resolve();
		} catch (error) {
			return reject(error);
		}
	});
}

function getClientData(clientId, limit) {
	return new Promise(async (resolve, reject) => {
		try {
			const Data = Parse.Object.extend('Data');
			const query = new Parse.Query(Data);
			query.equalTo('client', util.getPointer('Client', clientId));
			if (parseInt(limit, 10) === 0) {
				query.limit(100000);
			} else {
				query.limit(parseInt(limit, 10));
			}
			query.descending('createdAt');
			const queryResults = await query.find();
			const result = [];

			for (let index = 0; index < queryResults.length; index += 1) {
				const brightness = queryResults[index].get('brightness');
				const humidity = queryResults[index].get('humidity');
				const temperature = queryResults[index].get('temperature');
				const time = queryResults[index].createdAt;
				const stamp = moment(time)
					.tz('Asia/Seoul')
					.format('hh:mm:ss');
				result.push({
					brightness,
					humidity,
					temperature,
					time,
					stamp
				});
			}

			result.sort((a, b) => {
				return a.time - b.time;
			});

			return resolve(result);
		} catch (error) {
			return reject(error);
		}
	});
}

function getClientHourlyData(clientId) {
	return new Promise(async (resolve, reject) => {
		try {
			const result = [];
			const Hour = Parse.Object.extend('HourData');
			const query = new Parse.Query(Hour);
			query.equalTo('client', util.getPointer('Client', clientId));
			query.descending('createdAt');
			query.limit(48);
			const hourDataList = await query.find();

			for (let index = 0; index < hourDataList.length; index += 1) {
				const temp = {
					index,
					brightness: 0,
					humidity: 0,
					temperature: 0,
					stamp: '',
					time: moment()
						.add(-1 * index, 'hours')
						.tz('Asia/Seoul')
						.format()
				};

				const count = parseInt(hourDataList[index].get('count'), 10);
				temp.brightness =
					parseInt(hourDataList[index].get('brightness'), 10) / count;
				temp.humidity =
					parseFloat(hourDataList[index].get('humidity')) / count;
				temp.temperature =
					parseFloat(hourDataList[index].get('temperature')) / count;

				temp.stamp = moment(hourDataList[index].get('createdAt'))
					.tz('Asia/Seoul')
					.format('DD일 hh시');

				result.push(temp);
			}

			result.sort((a, b) => {
				return b.index - a.index;
			});

			return resolve(result);
		} catch (error) {
			return reject(error);
		}
	});
}

function getClientStatus(clientId) {
	return new Promise(async (resolve, reject) => {
		try {
			const Client = Parse.Object.extend('Client');
			const query = new Parse.Query(Client);
			const queryResult = await query.get(clientId);
			return resolve(queryResult.get('status'));
		} catch (error) {
			return reject(error);
		}
	});
}

function getClientConfig(clientId) {
	return new Promise(async (resolve, reject) => {
		try {
			const Client = Parse.Object.extend('Client');
			const query = new Parse.Query(Client);
			const queryResult = await query.get(clientId);
			return resolve(queryResult.get('config'));
		} catch (error) {
			return reject(error);
		}
	});
}

module.exports = {
	createLog,
	getClientData,
	getClientHourlyData,
	updateHalftimeValue,
	updateClientStatus,
	getClientStatus,
	getClientConfig
};
