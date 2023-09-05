const mongoose = require('mongoose');

// Define the MongoDB connection URL
const mongoURI = 'mongodb://127.0.0.1:27017/NodeExpress';

// mongoose.connect('mongodb://127.0.0.1:27017/NodeExpress', { useNewUrlParser: true, useUnifiedTopology: true });

// Configure Mongoose options
const mongooseOptions = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
};

// Create the MongoDB connection
const db = mongoose.createConnection(mongoURI, mongooseOptions);

// Handle connection events
db.on('connected', () => {
    console.log('Connected to MongoDB');
});

db.on('error', (err) => {
    console.error('MongoDB connection error:', err);
});

db.on('disconnected', () => {
    console.log('Disconnected from MongoDB');
});
db.once('open', () => {
    console.log('Connected to MongoDB open');
});

// Export the Mongoose connection
module.exports = db;
