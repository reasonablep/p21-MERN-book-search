require("dotenv").config();
const mongoose = require('mongoose');

const mongoURI = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/googlebooks';

mongoose.connect(mongoURI, { 
    useNewUrlParser: true, // Use new URL parser
    useUnifiedTopology: true // Use new server discovery and monitoring engine
})
.then(() => {
    console.log('MongoDB connected successfully');
})
.catch((error) => {
    console.error('Error connecting to MongoDB:', error.message);
});

// mongoose.connect(process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/googlebooks');

module.exports = mongoose.connection;
