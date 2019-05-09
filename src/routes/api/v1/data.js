const express = require('express');

const router = express.Router();
const reqlib = require('app-root-path').require;

router.post('/:userId/purchase', async (req, res) => {
	return res.status(200).json({ result: '결제 완료' });
});

module.exports = router;
