
const jwt = require('jsonwebtoken');
// const { JWT_SECRET } = require('../app'); // Import the secret key
const JWT_SECRET = 'your-secret-key';

// Middleware to verify JWT token
const verifyToken = (req, res, next) => {
    const token = req.headers.authorization;

    if (!token) {
        return res.status(401).json({ error: 'No token provided' });
    }

    jwt.verify(token, JWT_SECRET, (err, decodedToken) => {
        if (err) {
            return res.status(401).json({ error: 'Invalid token' });
        } else {
            req.userId = decodedToken.userId;
            next();
        }
    });
};

module.exports = { verifyToken };
