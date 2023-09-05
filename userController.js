
const UserModel = require('./models/user'); // Import the User model

exports.getAllUsers = async (req, res) => {
    try {
        const users = await UserModel.find();
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
        const userDetails = new UserModel({
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
        const user = await UserModel.findById(userId).select("name email age");

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
    try {
        const userId = req.params.userId;

        // Define the updated data
        const updatedData = {
                name: req.body.name,
                email: req.body.email
            // Add other fields to update as needed
        };

        const updatedUser = await UserModel.findByIdAndUpdate(userId, updatedData, {
            new: true, // Return the updated document
            runValidators: true // Run validation on updated data
        }).select("name email age");

        if (!updatedUser) {
            return res.status(404).json({
                status: "error",
                message: "User not found"
            });
        }

        const response = {
            status: "success",
            message: "User updated successfully",
            data: updatedUser
        };
        res.json(response);
    } catch (err) {
        console.log("error -", err);
        res.status(500).json({
            status: "error",
            message: "Error updating user data"
        });
    }
};

// Delete a user by ID
exports.deleteUserById = async (req, res) => {
    // Your delete user by ID logic here
    try {
        const userId = req.params.userId;
        const deletedUser = await UserModel.findByIdAndRemove(userId);

        if (!deletedUser) {
            return res.status(404).json({
                status: "error",
                message: "User not found"
            });
        }

        const response = {
            status: "success",
            message: "User deleted successfully",
            data: deletedUser
        };
        res.status(200).json(response);
    } catch (err) {
        console.log("error -", err);
        res.status(500).json({
            status: "error",
            message: "Error deleting user data"
        });
    }
};
