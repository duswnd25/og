const express = require('express');

const router = express.Router();

router.use('/datas', require('./data'));
router.use('/configs', require('./config'));

module.exports = router;
