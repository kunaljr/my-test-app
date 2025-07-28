const express = require('express')
const { fileCopy } = require('../controllers/streamController');

const router = express.Router();

router.post('/copy', fileCopy)

module.exports = router;