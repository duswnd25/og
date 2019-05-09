const createError = require('http-errors');

// ObjectId로 객체 반환
function getClientObject(objectId, inputKey) {
	return new Promise(async function result(resolve, reject) {
		const Data = Parse.Object.extend('Data');
		const query = new Parse.Query(Data);
		try {
			const object = await query.get(objectId);
			if (object === undefined) {
				return reject(new createError.NotFound());
			}

			const key = object.get('key');

			if (key === inputKey) {
				return resolve(object);
			}
			return reject(new createError.NotFound());
		} catch (error) {
			return reject(error);
		}
	});
}
module.exports = { getClientObject };
