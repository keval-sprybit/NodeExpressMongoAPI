const express = require('express');
const router = express.Router();
const {
    getAllBooks,
    createBook,
    findUserById,
    updateUserById,
    deleteUserById,
} = require('./bookController'); // Import controller functions for the User model

// Create routes for User model
router.get('/books', getAllBooks);
router.post('/books', createBook);
router.get('/books/:bookId', findUserById);
router.put('/books/:booksId', updateUserById);
router.delete('/books/:booksId', deleteUserById);

module.exports = router;
