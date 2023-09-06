const express = require('express');
const router = express.Router();
const {
    createUser,
    findUserById,
    updateUserById,
    deleteUserById,
    getAllcustomer,
} = require('./controller/customerController'); // Import controller functions for the User model

// Create routes for User model
router.get('/customers', getAllcustomer);
router.post('/customers', createUser);
router.get('/customers/:customerId', findUserById);
router.put('/customers/:customerId', updateUserById);
router.delete('/customers/:customerId', deleteUserById);

module.exports = router;
