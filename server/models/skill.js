const mongoose = require('mongoose');

// Define the schema for embedded_movies
const skill = new mongoose.Schema({

  name: { 
    type: String,
    required:true
  },
  photo: { 
    type: String,
    required:true
  },
  description: { 
    type: String,
    required:true
  },
  coaches:{
    type: [String],
  },
  cheapestPrice:{
    type:Number,
    required:true
  }
  
});

// Create the model
const Skill = mongoose.model('Skills', skill);

module.exports = Skill;