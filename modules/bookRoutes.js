const express = require('express');
const { verifyToken } = require('./middleware/authMiddleware');
const router = express.Router();
const {
    getAllBooks,
    createBook,
    findBookById,
    updateUserById,
    deleteUserById,
} = require('./controller/bookController'); // Import controller functions for the Book model

// Create routes for Book model
router.get('/books', verifyToken,getAllBooks);
router.post('/books',verifyToken ,createBook);
router.get('/books/:bookId',verifyToken ,findBookById);
router.put('/books/:booksId',verifyToken ,updateUserById);
router.delete('/books/:booksId',verifyToken ,deleteUserById);

module.exports = router;
