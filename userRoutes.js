const express = require('express');
const router = express.Router();
const {
    createUser,
    findUserById,
    updateUserById,
    deleteUserById,
    getAllUsers,
} = require('./userController'); // Import controller functions for the User model

// Create routes for User model
router.get('/users', getAllUsers);
router.post('/users', createUser);
router.get('/users/:userId', findUserById);
router.put('/users/:userId', updateUserById);
router.delete('/users/:userId', deleteUserById);

module.exports = router;
