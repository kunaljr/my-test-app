const express = require('express')
const router = express.Router();

const { fileRead, fileWrite, fileDelete } = require('../controllers/fileController')

router.get("/read", fileRead)

router.post("/write", fileWrite)

router.delete("/delete", fileDelete)

module.exports = router