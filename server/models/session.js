const mongoose = require('mongoose');

const sessionSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Users',
    //required: true
  },
  coachId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'coach',
    required: true
  },
  date: {
    type: Date,
    required: true
  },
  duration: {
    type: Number,
    required: true,
    default: 60 // minutes
  },
  type: {
    type: String,
    enum: ['video', 'chat'],
    required: true
  },
  status: {
    type: String,
    enum: ['scheduled', 'completed', 'cancelled'],
    default: 'scheduled'
  },
  topic: {
    type: String,
    required: true
  },
  link:{
    type:String,
  },
  isReviewed:{
    type:Boolean,
    default:false
  }
}, {
  timestamps: true
});
module.exports = mongoose.model('Session', sessionSchema);

