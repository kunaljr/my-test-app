const express = require('express');

const {
  getBooks,
  getBook,
  createBook,
  updateBook,
  deleteBook
} = require('../controllers/bookController');
const {bookValidationRules} = require('../validators/bookValidator')
const handleValidationErrors = require('../middleware/validationMiddleware');
const authenticateToken = require('../middleware/authMiddleware')
const authorizeRoles = require('../middleware/roleMiddleware')
const router = express.Router();

router.get('/', getBooks);
router.post('/',authenticateToken, authorizeRoles('admin'),bookValidationRules,handleValidationErrors,createBook);

router.route('/:id', getBook);
router.put('/:id',authenticateToken, authorizeRoles('admin', 'editor'), bookValidationRules,handleValidationErrors,updateBook)
router.delete('/:id',deleteBook);

module.exports = router;