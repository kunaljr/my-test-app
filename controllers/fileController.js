const fs = require('fs');
const asyncHandler = require('../utils/asyncHandler');

exports.fileRead = asyncHandler(async (req, res, next) => {
    fs.readFile('output.txt', 'utf-8', (err, data) => {
        if (err) {
            console.error('Error reading file:', err);
            return;
        }
        console.log('File contents:', data);
        res.status(200).json(data);
    })
});

exports.fileWrite = asyncHandler(async (req, res, next) => {
    fs.writeFile('output.txt', 'Hello, world!', (err) => {
        if (err) {
            console.error('Error writing file:', err);
            return;
        }
        console.log('File written successfully.');
    });
    res.status(201).json('SUCCESS');
});