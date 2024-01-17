
const BookModel = require('../models/book'); // Import the Book model
const UserModel = require('../models/user'); // Import the user model
const CustomerModel = require('../models/customer'); // Import the Book model

var common_methods = require('../common/common_methods');

exports.getAllBooks = async (req, res) => {
    try {
        // const books = await BookModel.find();
        // const response = {
        //     status: "success",
        //     message: "Data get successfully",
        //     data: books
        // };
        const books = await BookModel.find({ user: req.userId })
            .populate('user'); // Populate the user field in each book document

        // Create an array to store books with user details
        const booksWithUserDetails = [];

        // for (const book of books) {
        //     const user = await UserModel.findById(book.user);

        //     // Create an object that combines book and user details
        //     const bookWithUser = {
        //         _id: book._id,
        //         title: book.title,
        //         // Add other book-related fields as needed
        //         user: {
        //             _id: user._id,
        //             name: user.name,
        //             email:user.email,
        //             age:user.age
        //             // Add other user-related fields as needed
        //         },
        //     };

        //     booksWithUserDetails.push(bookWithUser);
        // }

        for (const book of books) {
            const user = book.user; // The user field is already populated
            // Create an object that combines book and user details
            const bookWithUser = {
                _id: book._id,
                title: book.title,
                price: book.price,
                pages: book.pages,
                image: book.image,
                user: {
                    _id: user._id,
                    name: user.name,
                    email: user.email,

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
        let author = await CustomerModel.findOne({ _id: req.userId });
        const bookDetails = new BookModel({
            title: req.body.title,
            price: req.body.price,
            pages: req.body.pages,
            image: req.body.pages,
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
exports.findBookById = async (req, res) => {
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
                email: book.user.email,
                age: book.user.age
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
            message: "Error fetching user data" + err
        });
    }
};

// Update a user by ID
exports.updateBookById = async (req, res) => {
    // Your update user by ID logic here
    try {
        console.log("book update callled")

        const bookId = req.params.bookId;

        // Define the updated data
        const updatedData = {
            title: req.body.title,
            price: req.body.price,
            pages: req.body.pages

        };
        console.log("book id", bookId, updatedData)
        // return;

        const updatedUser = await BookModel.findByIdAndUpdate(bookId, updatedData, {
            new: true, // Return the updated document
            runValidators: true // Run validation on updated data
        });

        if (!updatedUser) {

            common_methods.sendResponse(res, false, 200, '', 'User not found', 'error');
        }

        common_methods.sendResponse(res, true, 200, '', 'Data added successful', '');
    } catch (err) {
        console.log("error -", err);
        // res.status(500).json({
        //     status: "error",
        //     message: "Error updating user data"
        // });
        common_methods.sendResponse(res, false, 200, '', 'Error updating book', '');
    }
};

// Delete a user by ID
exports.deleteBookById = async (req, res) => {
    // Your delete user by ID logic here
    try {
        const bookId = req.params.bookId;
        const deletedBook = await BookModel.findByIdAndRemove(bookId);

        if (!deletedBook) {
            common_methods.sendResponse(res, false, 200, '', 'Book Not Found', '');
        }

        common_methods.sendResponse(res, true, 200, '', 'Book deleted successfully', '');
    } catch (err) {
        console.log("error -", err);
        res.status(500).json({
            status: "error",
            message: "Error deleting user data"
        });
    }
};
exports.getAllDataTableBooks = async (req, res) => {
    try {
        const { page = 1, itemsPerPage = 5, title, sortBy, sortOrder } = req.body;

        const query = { user: req.userId };
        if (title) {
            query.title = { $regex: new RegExp(title, 'i') };
        }
        const sortOptions = {};
        if (sortBy && sortOrder) {
            sortOptions[sortBy] = sortOrder === 'desc' ? -1 : 1;
        }

        const totalBooks = await BookModel.countDocuments(query);

        // const books = await BookModel.find({ user: req.userId })
        //   .populate('user')
        //   .skip((page - 1) * itemsPerPage)
        //   .limit(parseInt(itemsPerPage));
        let books;
        // if (page === 'all') {
        if (itemsPerPage==-1) {
            books = await BookModel.find(query).sort(sortOptions).lean();
        }
        else {
            books = await BookModel.find(query)
                .populate('user')
                .sort(sortOptions)
                .skip((page - 1) * itemsPerPage)
                .limit(parseInt(itemsPerPage));
        }
        const booksWithUserDetails = books.map(book => ({
            _id: book._id,
            title: book.title,
            price: book.price,
            pages: book.pages,
            image: book.image,
            user: {
                _id: book.user._id,
                name: book.user.name,
                email: book.user.email,
            },
        }));

        // const response = {
        //     status: "success",
        //     message: "Data retrieved successfully",
        //     data: {
        //         books: booksWithUserDetails,
        //         totalItems: totalBooks
        //     }
        // };
        // res.json(response)
        common_methods.sendResponse(res, true, 200, { 'data': booksWithUserDetails, 'totalItems': totalBooks }, 'Data retrieved successfully', '');

    } catch (error) {
        // res.status(500).json({ message: error.message });
        common_methods.sendResponse(res, false, 500, '', 'something wrong', error);
    }

}