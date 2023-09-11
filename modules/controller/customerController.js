
const CustomerModel = require('../models/customer'); // Import the User model

exports.getAllcustomer = async (req, res) => {
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
            age: req.body.age
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

// customer_signin
exports.customer_signin = async (req, res) => {
    // Your delete user by ID logic here

    const { email, password } = req.body;

    try {
        // Find the user by username
        const user = await CustomerModel.findOne({ email });

        if (!user || user.password !== password) {
            res.status(401).json({ error: 'Authentication failed' });
        } else {
            res.json({ message: 'Login successful' });
        }
    } catch (error) {
        res.status(400).json({ error: 'Login failed' });
    }

};
// customer_signup
exports.customer_signup = async (req, res) => {

    try {


        // const userId = req.params.userId;
        // const user = await CustomerModel.findById(userId).select("name email age");

        // if (!user) {
        //     return res.status(404).json({
        //         status: "error",
        //         message: "User not found"
        //     });
        // }

        // const userDetails = new CustomerModel({
        //     name: req.body.name,
        //     email: req.body.email,
        //     age: req.body.password
        // });
        // const doc = await userDetails.save();
        /* var header_data = req.headers;
         var token_key = header_data.tokenkey;
         console.log("token key",header_data.hasOwnProperty('tokenkey'),token_key)
 
         const response = {
             status: "success",
             message: "User retrieved successfully",
             data: req.header
         };
         res.json(response); */

        const { name, email, password, access_token } = req.body;
        // Create a new user
        const existingUser = await CustomerModel.findOne({ email });

        if (existingUser) {
            return res.status(400).json({
                status: "error",
                message: "Email already in use"
            });
        }
        const user = new CustomerModel({ name, email, password, access_token });

        // Save the user to the database
        await user.save();
        const response = {
            status: "success",
            message: "Data add successfully",
            data: user
        };
        res.status(201).json(response)

    } catch (err) {
        console.log("error -", err);
        res.status(500).json({
            status: "error",
            message: "Error while customer signup try later"
        });
    }

};
