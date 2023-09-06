const mongoose = require('mongoose');

// Define the Book schema
const bookSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User', // Reference to the User model
  },
},
{
  strictPopulate: false, // Set strictPopulate to false
});

// Create the Book model
const BookModel = mongoose.model('Book', bookSchema);

module.exports = BookModel;
