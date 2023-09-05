const mongoose = require('mongoose');

// Define the User schema
const userSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User', // Reference to the Author model
  },
},
{
  strictPopulate: false, // Set strictPopulate to false
});

// Create the User model
const BookModel = mongoose.model('Book', userSchema);

module.exports = BookModel;
