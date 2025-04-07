const mongoose = require('mongoose');

// Define the schema for embedded_movies
const coach = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  name: {
    type: String,
    required: true
  },
  image:{
    type:String,
  },
  role:{
    type : String,
    required: true
  },
  image: {
    type: String,
    required: true
  },
  specializations: [{
    type: String,
    required: true
  }],
  bio: {
    type: String,
    required: true
  },
  hourlyRate: {
    type: Number,
    required: true
  },
  rating: {
    type: Number,
    default: 0
  },
  reviewCount: {
    type: Number,
    default: 0
  },
  availability: [{
    day: {
      type: String,
      enum: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday']
    },
    slots: [{
      startTime: String,
      endTime: String
    }]
  }],
  experience: {
    type: String,
    required: true
  }
}, {
  timestamps: true
});

  
// Create the model
const Coach = mongoose.model('coach', coach);

module.exports = Coach;