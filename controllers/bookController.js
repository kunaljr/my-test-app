const Book = require('../models/Books')
const asyncHandler = require('../utils/asyncHandler');

// @desc    Get all books
exports.getBooks = asyncHandler(async (req, res, next) => {
    const books = await Book.find();
    res.json(books);
});

// @desc    Get single book
exports.getBook = asyncHandler(async (req, res, next) => {
    const book = await Book.findById(req.params.id);
    if (!book) return res.status(404).json({ message: 'Book not found' });
    res.json(book);
});

// @desc    Create new book
exports.createBook = asyncHandler(async (req, res, next) => {
    const book = await Book.create(req.body);
    res.status(201).json(book);
});

// @desc    Update book
exports.updateBook = async (req, res, next) => {
  try {
    const book = await Book.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );
    if (!book) return res.status(404).json({ message: 'Book not found' });
    res.json(book);
  } catch (err) {
    next(err);
  }
};

// @desc    Delete book
exports.deleteBook = asyncHandler(async (req, res, next) => {
    const book = await Book.findByIdAndDelete(req.params.id);
    if (!book) return res.status(404).json({ message: 'Book not found' });
    res.json({ message: 'Book removed' });
});

