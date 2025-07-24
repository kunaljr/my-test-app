const express = require('express')
const router = express.Router();

const { fileRead, fileWrite } = require('../controllers/fileController')

router.get("/read", fileRead)

router.post("/write", fileWrite)

module.exports = router