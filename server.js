const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors =require('cors');
const cron = require('node-cron'); 
const db = require('./conf/database.js');  

//api
const routes = require('./routes');

// Use the routes defined in routes.js

// const userRoutes = require('./userRoutes');
// const bookRoutes = require('./bookRoutes');

var app = express();

app.use(bodyParser.json());
app.use(express.json());
app.use(cors());

app.use(bodyParser.urlencoded({ extended: true })); 

app.use('/api', routes);


function myCronJob() {
  console.log('Cron job executed at:', new Date());
  // Add your task logic here
}
cron.schedule('*/10 * * * * *', () => {
  console.log('Running a job at 01:00 at America/Sao_Paulo timezone');
}, {
  scheduled: false,
  timezone: "Asia/Kolkata"
});
// cron.schedule('0 0 * * *', myCronJob);
// cron.schedule('*/10 * * * * *', myCronJob);

// cron.schedule('*/10 * * * *', myCronJob);


// NodeExpress
// mongoose.connect('mongodb://127.0.0.1:27017/NodeExpress', { useNewUrlParser: true, useUnifiedTopology: true });

// api paths

// app.use('/api', userRoutes);
// app.use('/api', bookRoutes);

app.use((req, res) => {
    res.status(404).json({ error: 'Route not found' });
  });
    

// var server = app.listen(5005, function () {
//     var host = server.address().address
//     var port = server.address().port
//     console.log("Example app listening at http://%s:%s", host, port)
//  })

const PORT = process.env.PORT || 5005;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});