const createError = require('http-errors');
const console = require('better-console');

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
module.exports = { getClientObject };
