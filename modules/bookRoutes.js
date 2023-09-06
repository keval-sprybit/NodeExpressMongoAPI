const express = require('express');
const router = express.Router();
const {
    getAllBooks,
    createBook,
    findBookById,
    updateUserById,
    deleteUserById,
} = require('./controller/bookController'); // Import controller functions for the Book model

// Create routes for Book model
router.get('/books', getAllBooks);
router.post('/books', createBook);
router.get('/books/:bookId', findBookById);
router.put('/books/:booksId', updateUserById);
router.delete('/books/:booksId', deleteUserById);

module.exports = router;
