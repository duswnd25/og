const express = require('express');

const router = express.Router();
const reqlib = require('app-root-path').require;

const util = reqlib('/src/core/utils.js');
const dataDb = reqlib('/src/db/data_manager.js');

router.post('/:clientId/update/staus', async (req, res) => {
	const { clientId } = req.params;
	const { key, brightness, humidity, temperature } = req.body;

	const average = dataDb.updateAverageValue(
		clientId,
		key,
		brightness,
		humidity,
		temperature
	);
	const log = dataDb.updatePFCStatus(
		clientId,
		key,
		brightness,
		humidity,
		temperature
	);

	await Promise.all([average, log]);

	return res.status(200).json({ result: 'upload finish' });
});

router.get('/:clientId/datas', async (req, res) => {
	const { clientId } = req.params;
	let { limit } = req.query;

	if (limit === undefined) {
		limit = 50;
	}

	const result = util.generateDisplayData(
		await dataDb.getClientData(clientId, limit)
	);
	return res.status(200).json(result);
});

module.exports = router;
