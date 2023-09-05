const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const db = require('./conf/database.js');  

//api
const userRoutes = require('./userRoutes');
const bookRoutes = require('./bookRoutes');

var app = express();
app.use(bodyParser.json());

// NodeExpress
// mongoose.connect('mongodb://127.0.0.1:27017/NodeExpress', { useNewUrlParser: true, useUnifiedTopology: true });

// api paths
app.use('/api', userRoutes);
app.use('/api', bookRoutes);


// var server = app.listen(5005, function () {
//     var host = server.address().address
//     var port = server.address().port

//     console.log("Example app listening at http://%s:%s", host, port)
//  })

const PORT = process.env.PORT || 5005;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});