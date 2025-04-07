// MongoDB Connection URI
const mongoURI = "mongodb://localhost:27017/coaching"; // Replace with your actual URI
const mongoose = require('mongoose');

mongoose.connect(mongoURI)
.then(() => console.log('Connected to MongoDB'))
.catch(err => console.error('MongoDB connection error:', err));