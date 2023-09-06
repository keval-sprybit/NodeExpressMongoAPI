const express = require('express');
const router = express.Router();

// Import user routes from userRoutes.js
const userRoutes = require('./modules/userRoutes');

// Import book routes from bookRoutes.js
const bookRoutes = require('./modules/bookRoutes');

// Define routes for users
router.use(userRoutes);

// Define routes for books
router.use(bookRoutes);

module.exports = router;