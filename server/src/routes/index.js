const express = require('express');
const reqlib = require('app-root-path').require;

const dbManager = reqlib('/src/db/data_manager.js');
const util = reqlib('/src/core/utils.js');

const router = express.Router();

const clientId = 'mCcaI95vzy';

// 기본
router.get('/', async (req, res) => {
	const clientDataArray = await dbManager.getClientData(clientId, 50);
	const data = {
		client: [clientId],
		log: util.generateDisplayData(clientDataArray)
	};
	data.page = 'index';
	return res.status(200).render('layout', { data });
});

// 실시간
router.get('/current', async (req, res) => {
	const clientDataArray = await dbManager.getClientData(clientId, 50);
	const data = {
		client: [clientId],
		log: util.generateDisplayData(clientDataArray)
	};
	data.page = 'index';
	return res.status(200).render('layout', { data });
});

// 전체
router.get('/total', async (req, res) => {
	const clientId = 'mCcaI95vzy';
	const clientDataArray = await dbManager.getClientData(clientId, 0);
	const data = {
		client: [clientId],
		log: util.generateDisplayData(clientDataArray)
	};
	data.page = 'total';
	return res.status(200).render('layout', { data });
});

// 전체
router.get('/table', async (req, res) => {
	const clientDataArray = await dbManager.getClientData(clientId, 0);
	const data = {
		client: [clientId],
		log: util.generateDisplayData(clientDataArray)
	};
	data.page = 'table';
	return res.status(200).render('layout', { data });
});

// 시간별
router.get('/halftime', async (req, res) => {
	const clientDataArray = await dbManager.getClientHourlyData(clientId);
	const data = {
		client: [clientId],
		log: util.generateDisplayData(clientDataArray)
	};
	data.page = 'hour';
	return res.status(200).render('layout', { data });
});

module.exports = router;
