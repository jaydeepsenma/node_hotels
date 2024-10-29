const mongoose = require('mongoose');
require('dotenv').config();

// Define the MongoDB connection URL.
//const mongoURL = 'mongodb://localhost:27017/hotels'; // Replace 'hotels' with your. database name 

const mongoURL= process.env.MONGODB_URL;

// Set up MongoDB connection
mongoose.connect(mongoURL,{
});

// Get the default connection.
// Mongoose maintains a default connection object representing the MongoDB connection. 
const db = mongoose.connection;

// Define event listeners for database connection
db.on('connected',()=>{
    console.log('Connected to the MongoDB server')
})

// Define event listeners for database connection error
db.on('error',(err)=>{
    console.error('MongoDB connection error:'+err)
})

// Define event listeners for database disconnection
db.on('disconnected',()=>{
    console.log('MongoDB disconnected')
})

// Export the database connection
module.exports = db; 