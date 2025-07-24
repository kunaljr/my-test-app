const fs = require('fs')
const asyncHandler = require('../utils/asyncHandler');

exports.fileCopy = asyncHandler(async (req, res, next) => {
    const readable = fs.createReadStream('output.txt');
    const writable = fs.createWriteStream('destination.txt');

    readable.pipe(writable)

    res.status(200).json('SUCCESS')
});