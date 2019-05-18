const createError = require('http-errors');

function getPointer(className, objectId) {
	const Class = Parse.Object.extend(className);
	const pointer = Class.createWithoutData(objectId);
	return pointer;
}

// ObjectId로 객체 반환
function getClientObject(clientId, inputKey) {
	return new Promise(async function result(resolve, reject) {
		const Client = Parse.Object.extend('Client');
		const query = new Parse.Query(Client);
		try {
			const object = await query.get(clientId);

			if (object === undefined) {
				return reject(new createError.NotFound());
			}

			const key = object.get('key');

			if (key !== inputKey) {
				return reject(new createError.NotFound());
			}

			return resolve(object);
		} catch (error) {
			return reject(error);
		}
	});
}

function generateDisplayData(clientDataArray) {
	const result = {
		average: {
			brightness: 0,
			humidity: 0,
			temperature: 0
		},
		chart: {
			label: [],
			time: [],
			brightness: {
				value: [],
				label: []
			},
			humidity: {
				value: []
			},
			temperature: {
				value: []
			}
		}
	};

	for (let index = 0; index < clientDataArray.length; index += 1) {
		const brightness = parseInt(clientDataArray[index].brightness, 10);
		const humidity = parseFloat(clientDataArray[index].humidity);
		const temperature = parseFloat(clientDataArray[index].temperature);

		result.average.brightness += brightness;
		result.average.humidity += humidity;
		result.average.temperature += temperature;

		result.chart.brightness.value.push(parseInt(brightness, 10));
		result.chart.humidity.value.push(parseFloat(humidity));
		result.chart.temperature.value.push(clientDataArray[index].temperature);

		result.chart.label.push(clientDataArray[index].stamp);
		result.chart.time.push(clientDataArray[index].time);
	}

	result.average.brightness /= clientDataArray.length;
	result.average.humidity /= clientDataArray.length;
	result.average.temperature /= clientDataArray.length;

	return result;
}

module.exports = {
	getClientObject,
	getPointer,
	generateDisplayData
};
