
const CustomerModel = require('../models/customer'); // Import the User model
const jwt = require('jsonwebtoken');
const JWT_SECRET = 'your-secret-key';

var settings = require('../common/settings');
var common_methods = require('../common/common_methods');

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
        for (let index = 0; index < 5; index++) {

            const userDetails = new CustomerModel({
                name: req.body.name + '' + index,
                email: req.body.email + '' + index,
                age: req.body.age
            });
            const doc = await userDetails.save();

        }
        const response = {
            status: "success",
            message: "Data get successfully",
            data: 'done'
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

            // res.status(200).json({ error: 'Authentication failed' });
            common_methods.sendResponse(res, false, 200,'', 'Authentication failed','');
        } else {
            
            const token = jwt.sign({ userId: user._id }, settings.JWT_SECRET);
            user.access_token = token;
            await user.save();
            // Return the token in the response
            // const response = {
            //     status: true,
            //     message: "Login successful",
            //     data: [{ token }]
            // };

        common_methods.sendResponse(res, true, 200, { token },'Login successful', '');
            // res.status(200).json(response);
        }
    } catch (error) {
        console.log("error -", error);
        // res.status(500).json({
        //     status: false,
        //     message: "Login Fail"
        // });
        common_methods.sendResponse(res, false, 500, '','something wrong', error);
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
            // return res.status(201).json({
            //     status: "error",
            //     message: "Email already in use ",
            //     data:[]
            // });
            common_methods.sendResponse(res, false, 200, '','Email already in use' ,'');
        }
        //  
        const user = new CustomerModel({
            name,
            email,
            password
        });
        await user.save();

        // Save the user to the database
        const response = {
            status: "success",
            message: "Data add successfully ",
            data: user
        };
        // res.status(201).json(response)
        common_methods.sendResponse(res, true, 200, '','User Created !!' ,'');

    } catch (error) {
        console.log("error -", error);
        // res.status(500).json({
        //     status: false,
        //     message: "Login Fail"
        // });
        common_methods.sendResponse(res, false, 500, '','something wrong', error);
    }
    

};
