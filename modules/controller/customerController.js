
const CustomerModel = require('../models/customer'); // Import the User model

exports.getAllcustomer  = async (req, res) => {
    try {
        const users = await CustomerModel.find();
        const response = {
            status: "success",
            message: "Data get successfully",
            data: users
        };
        res.json(response)
    } catch (err) {
        res.status(500).json({ error: "Error fetching users" + err });
    }
};

// Create a new user
exports.createUser = async (req, res) => {
    // Your create user logic here
    try {
        const userDetails = new CustomerModel({
            name: req.body.name,
            email: req.body.email,
            age:req.body.age
        });
        const doc = await userDetails.save();
        const response = {
            status: "success",
            message: "Data get successfully",
            data: doc
        };
        res.json(response)
    } catch (err) {
        
        res.status(500).json({ error: "Error fetching users" + err });
    }
};

// Find a user by ID
exports.findUserById = async (req, res) => {
    // Your find user by ID logic here
    try {
        const userId = req.params.userId;
        const user = await CustomerModel.findById(userId).select("name email age");

        if (!user) {
            return res.status(404).json({
                status: "error",
                message: "User not found"
            });
        }

        const response = {
            status: "success",
            message: "User retrieved successfully",
            data: user
        };
        res.json(response);
    } catch (err) {
        console.log("error -", err);
        res.status(500).json({
            status: "error",
            message: "Error fetching user data"
        });
    }
    
};

// Update a user by ID
exports.updateUserById = async (req, res) => {
    // Your update user by ID logic here

};

// Delete a user by ID
exports.deleteUserById = async (req, res) => {
    // Your delete user by ID logic here
   
};
