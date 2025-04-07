const mongoose = require('mongoose');
const Coach = require('./coach'); // Import Coach model


const reviewSchema = new mongoose.Schema({
  sessionId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Session',
    required: true
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Users',
    required: true
  },
  coachId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'coach', // Ensure this matches your model registration
    required: true
  },
  rating: {
    type: Number,
    required: true,
    min: 1,
    max: 5
  },
  comment: {
    type: String,
    required: true
  }
}, {
  timestamps: true
});

// Update coach rating when a review is added
reviewSchema.post('save', async function () {
  const reviews = await this.model('review').find({ coachId: this.coachId });
  
  const coach = await Coach.findById(this.coachId);
  if (coach) {
    coach.rating = reviews.reduce((acc, review) => acc + review.rating, 0) / reviews.length;
    coach.reviewCount = reviews.length;
    await coach.save();
  }
});

const Review = mongoose.model('review', reviewSchema);

module.exports = Review;
