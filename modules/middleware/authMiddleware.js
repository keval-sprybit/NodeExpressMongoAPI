
const jwt = require('jsonwebtoken');
// const { JWT_SECRET } = require('../app'); // Import the secret key
const CustomerModel = require('../models/customer'); // Import the User model
var common_methods = require('../common/common_methods');
const JWT_SECRET = 'your-secret-key';

// Middleware to verify JWT token
/* const verifyToken = async (req, res, next) => {
    const token = req.headers.authorization;

    if (!token) {
        return res.status(401).json({ error: 'No token provided' });
    }

     jwt.verify(token, JWT_SECRET, (err, decodedToken) => {
        if (err) {
            return res.status(401).json({ error: 'Invalid token' });
        } 
        else {
            req.userId = decodedToken.userId;
            next();
        }
       
    });
}; */

const verifyToken = async (req, res, next) => {
  // const token = req.headers.authorization;
  console.log("----------------------------")
  console.log("Request URL", req.originalUrl,req.method)
  const authorizationHeader = req.headers.authorization;

  if (!authorizationHeader || !authorizationHeader.startsWith('Bearer ') || authorizationHeader === undefined) {
    // return res.status(401).json({ error: 'No valid token provided' });
    return common_methods.sendResponse(res, false, 401, '', 'No valid token provided', 'Opps');
  }

  const token = authorizationHeader.split(' ')[1]; // Extract the token (remove "Bearer ")
  jwt.verify(token, JWT_SECRET, async (err, decodedToken) => {
    if (err) {
      return common_methods.sendResponse(res, false, 401, '', 'Invalid token', 'Opps');
    }

    try {
      const user = await CustomerModel.findOne({ access_token: token });
      if (!user) {
        return common_methods.sendResponse(res, false, 401, '', 'Session Expired', 'Opps');
      }
      req.userId = decodedToken.userId;
      console.log("decodedToken", decodedToken)
      next();
    } catch (error) {

      return common_methods.sendResponse(res, false, 500, '', 'Database error', error);
    }
  });
};

module.exports = { verifyToken };
