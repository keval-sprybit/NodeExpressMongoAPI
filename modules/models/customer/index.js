const mongoose = require('mongoose');

// Define the User schema
const customerSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
    access_token:{
        type:String,
        required:false,
    }

    
});

// Create the Customer model
const CustomerModel = mongoose.model('Customer', customerSchema);

module.exports = CustomerModel;
