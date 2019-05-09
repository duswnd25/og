const express = require('express');

const router = express.Router();
const reqlib = require('app-root-path').require;

const dataDb = reqlib('/src/db/data_manager.js');

router.post('/:clientId/update/staus', async (req, res) => {
	const { clientId } = req.params;
	const { key, brightness, humidity, temperature } = req.body;

	await dataDb.updatePFCStatus(
		clientId,
		key,
		brightness,
		humidity,
		temperature
	);

	return res.status(200).json({ result: 'upload finish' });
});

module.exports = router;
