const mongoose = require('mongoose');

// Define the User schema
const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        // unique: true,
    },
    age: {
        type: Number,
        required: true,
    },
    // Add more fields as needed
});

// Create the User model
const UserModel = mongoose.model('User', userSchema);

module.exports = UserModel;
