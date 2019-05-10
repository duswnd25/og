const express = require('express');

const router = express.Router();

// 기본
router.get('/', (req, res) => {
	const data = {
		client: ['mCcaI95vzy']
	};
	return res.status(200).render('index', { data });
});

// 사용자별
router.get('/:clientId/dashboard', (req, res) => {
	const { clientId } = req.params;
	const data = {
		client: [clientId]
	};
	return res.status(200).render('index', { data });
});

module.exports = router;
