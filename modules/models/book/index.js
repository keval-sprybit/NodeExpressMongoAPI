const mongoose = require('mongoose');

// Define the Book schema
const bookSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    price: {
        type: Number,
        required: true,
    },
    pages: {
        type: Number,
        required: true,
    },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Customer', // Reference to the User model
  },
},
{
  strictPopulate: false, // Set strictPopulate to false
});

// Create the Book model
const BookModel = mongoose.model('Book', bookSchema);

module.exports = BookModel;
