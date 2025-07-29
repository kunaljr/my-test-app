const Book = require('../models/Books')
const asyncHandler = require('../utils/asyncHandler');
// const redisClient = require('../config/redis');

// @desc    Get all books
exports.getBooks = asyncHandler(async (req, res, next) => {
    const books = await Book.find();
    res.json(books);
});

// @desc    Get single book
exports.getBook = asyncHandler(async (req, res, next) => {

    const cacheKey = `book:${req.params.id}`;
    // const cached = await redisClient.get(cacheKey);

    if (cached) {
      console.log('⚡ Serving from Redis Cache');
      return res.status(200).json(JSON.parse(cached));
    }

    const book = await Book.findById(req.params.id);
    if (!book) return res.status(404).json({ message: 'Book not found' });

    // Cache the result with an expiration of 1 hour
    // await redisClient.setEx(cacheKey, 3600, JSON.stringify(book));
    
    res.json(book);
});

// @desc    Create new book
exports.createBook = asyncHandler(async (req, res, next) => {
    const book = await Book.create(req.body);
    res.status(201).json(book);
});

// @desc    Update book
exports.updateBook = asyncHandler(async (req, res, next) => {
    const book = await Book.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );
    if (!book) return res.status(404).json({ message: 'Book not found' });
    // await redisClient.del(`book:${req.params.id}`);
    res.json(book);
});

exports.searchBook = asyncHandler(async (req, res, next) => {  
    const { title } = req.query;
    if (!title) {
      return res.status(400).json({ message: 'Title query param is required' });
    }

    const books = await Book.find({
      title: { $regex: title, $options: 'i' }, // case-insensitive search
    });

    res.status(200).json(books);
})

// @desc    Delete book
exports.deleteBook = asyncHandler(async (req, res, next) => {
    const book = await Book.findByIdAndDelete(req.params.id);
    if (!book) return res.status(404).json({ message: 'Book not found' });
    // await redisClient.del(`book:${req.params.id}`);
    res.json({ message: 'Book removed' });
});

