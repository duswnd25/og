const reqlib = require('app-root-path').require;
const moment = require('moment-timezone');

const util = reqlib('/src/core/utils.js');

// update pfc status
function updatePFCStatus(clientId, key, brightness, humidity, temperature) {
	return new Promise(async (resolve, reject) => {
		try {
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

// update pfc status
function updateAverageValue(clientId, key, brightness, humidity, temperature) {
	return new Promise(async (resolve, reject) => {
		try {
			const year = parseInt(moment().format('YYYY'), 10);
			const month = parseInt(moment().format('MM'), 10);
			const date = parseInt(moment().format('DD'), 10);
			const hour = parseInt(moment().format('hh'), 10);
			const clientObject = await util.getClientObject(clientId, key);
			const Hour = Parse.Object.extend('HourData');
			const query = new Parse.Query(Hour);
			query.equalTo('client', clientObject);
			query.equalTo('year', year);
			query.equalTo('month', month);
			query.equalTo('date', date);
			query.equalTo('hour', hour);
			let recentData = await query.first();

			if (recentData === undefined) {
				recentData = new Hour();
				recentData.set('client', clientObject);
				recentData.set('year', year);
				recentData.set('month', month);
				recentData.set('date', date);
				recentData.set('hour', hour);
				recentData.set('count', 0);
				recentData.set('brightness', 0);
				recentData.set('humidity', 0.0);
				recentData.set('temperature', 0.0);
			}
			recentData.set(
				'brightness',
				parseInt(recentData.get('brightness'), 10) +
					parseInt(brightness, 10)
			);
			recentData.set(
				'humidity',
				parseFloat(recentData.get('humidity') + parseFloat(humidity))
			);
			recentData.set(
				'temperature',
				parseFloat(
					recentData.get('temperature') + parseFloat(temperature)
				)
			);
			recentData.increment('count');
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

module.exports = {
	updatePFCStatus,
	getClientData,
	getClientHourlyData,
	updateAverageValue
};
