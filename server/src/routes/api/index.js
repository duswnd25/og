const express = require('express');

const router = express.Router();

router.get('/', (req, res) => {
	return res.json({ message: 'api' });
});

router.use('/v1', require('./v1/index'));

module.exports = router;
