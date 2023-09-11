const express = require('express');
const router = express.Router();
const { verifyToken } = require('./middleware/authMiddleware');
const {
    createUser,
    findUserById,
    updateUserById,
    deleteUserById,
    getAllcustomer,
    customer_signin,
    customer_signup,
} = require('./controller/customerController'); // Import controller functions for the User model

// Create routes for User model
router.get('/auth/signin', customer_signin);
router.get('/auth/signup', customer_signup);

router.get('/customers', verifyToken,getAllcustomer);
router.post('/customers', createUser);
router.get('/customers/:customerId', findUserById);
router.put('/customers/:customerId', updateUserById);
router.delete('/customers/:customerId', deleteUserById);

module.exports = router;
