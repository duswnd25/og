const express = require('express');

const router = express.Router();
const reqlib = require('app-root-path').require;

const util = reqlib('/src/core/utils.js');
const dataDb = reqlib('/src/db/data_manager.js');

router.post('/:clientId/update/staus', async (req, res) => {
	const { clientId } = req.params;
	const {
		key,
		brightness,
		humidity,
		temperature,
		automode,
		fan,
		led,
		hum,
		image
	} = req.body;

	dataDb.createLog(clientId, key, brightness, humidity, temperature);

	dataDb.updateClientStatus(
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
	);

	return res.status(200).json({ result: 'upload finish' });
});

router.post('/:clientId/update/halftime', async (req, res) => {
	const { clientId } = req.params;
	const { key, brightness, humidity, temperature } = req.body;

	dataDb.updateHalftimeValue(
		clientId,
		key,
		brightness,
		humidity,
		temperature
	);

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

router.get('/:clientId/status', async (req, res) => {
	const { clientId } = req.params;
	const status = await dataDb.getClientStatus(clientId);
	return res.status(200).json(status);
});

router.get('/:clientId/config', async (req, res) => {
	const { clientId } = req.params;
	const status = await dataDb.getClientConfig(clientId);
	return res.status(200).json(status);
});

module.exports = router;
