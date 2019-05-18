const express = require('express');

const router = express.Router();
const reqlib = require('app-root-path').require;

const util = reqlib('/src/core/utils.js');
const dataDb = reqlib('/src/db/data_manager.js');

router.get('/:clientId/configs', async (req, res) => {
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
