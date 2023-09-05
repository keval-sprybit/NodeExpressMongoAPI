
const BookModel = require('./models/book'); // Import the User model
const UserModel = require('./models/user'); // Import the Book model

exports.getAllBooks = async (req, res) => {
    try {
        // const books = await BookModel.find();
        // const response = {
        //     status: "success",
        //     message: "Data get successfully",
        //     data: books
        // };
        const books = await BookModel.find()
            .populate('user'); // Populate the user field in each book document

        // Create an array to store books with user details
        const booksWithUserDetails = [];

        for (const book of books) {
            const user = await UserModel.findById(book.user);

            // Create an object that combines book and user details
            const bookWithUser = {
                _id: book._id,
                title: book.title,
                // Add other book-related fields as needed
                user: {
                    _id: user._id,
                    name: user.name,
                    email:user.email,
                    age:user.age
                    // Add other user-related fields as needed
                },
            };

            booksWithUserDetails.push(bookWithUser);
        }

        const response = {
            status: "success",
            message: "Data get successfully",
            data: booksWithUserDetails, // Send the array of books with user details
        };
        res.json(response)
    } catch (err) {
        res.status(500).json({ error: "Error fetching books " + err });
    }
};

// Create a new user
exports.createBook = async (req, res) => {
    // Your create user logic here
    try {
        let author = await UserModel.findOne({ name: req.body.name });
        const bookDetails = new BookModel({
            title: req.body.title,
            user: author,   
        });
        const doc = await bookDetails.save();
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
        const bookId = req.params.bookId;
        const book = await BookModel.findById(bookId).populate('user');

        if (!book) {
          return res.status(404).json({ error: 'Book not found' });
        }    

        if (book.user) {
            userDetails = {
                _id: book.user._id,
                name: book.user.name,
                email:book.user.email,
                age:book.user.age
            };
        }
          // Create a response object that includes both book and author details
          const response1 = {
            _id: book._id,
            title: book.title,
            author: userDetails,
          };

        const response = {
            status: "success",
            message: "User retrieved successfully",
            data: response1
        };

        res.json(response);
        
    } catch (err) {
        console.log("error -", err);
        res.status(500).json({
            status: "error",
            message: "Error fetching user data"+err
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
