const { check } = require('express-validator');

const bookValidationRules = [
  check('title')
    .notEmpty()
    .withMessage('Title is required'),
    
  check('author')
    .notEmpty()
    .withMessage('Author is required')
];

module.exports = {
  bookValidationRules
};