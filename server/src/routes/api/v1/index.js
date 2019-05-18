const express = require('express');

const router = express.Router();

router.use('/datas', require('./data'));

module.exports = router;
