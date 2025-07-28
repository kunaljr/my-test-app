const mongoose = require('mongoose');

const bookSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Please add a title'],
  },
  author: {
    type: String,
    required: [true, 'Please add an author'],
  },
  publishedYear: Number,
}, {
  timestamps: true
});

module.exports = mongoose.model('Book', bookSchema);