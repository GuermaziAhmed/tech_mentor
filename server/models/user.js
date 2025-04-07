const mongoose = require('mongoose');

// Define the schema
const users = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      lowercase: true,
    },
    password: {
      type: String,
      required: true,
      minlength: 6,
    },
    role: {
      type: String,
      enum: ['user', 'coach', 'admin'],
      default: 'user',
    },
    image: {
      type: String,
      default: '', // Placeholder, dynamically set in middleware
    },
    skills: [
      {
        type: String,
        trim: true,
      },
    ],
    createdAt: {
      type: Date,
      default: Date.now,
    },
  },
  { timestamps: true }
);

// Pre-save middleware to set dynamic default image
users.pre('save', function (next) {
  if (!this.image) {
    const name = this.name ;
    this.image = `https://ui-avatars.com/api/?name=${encodeURIComponent(name)}&background=random`;
  }
  next();
});

// Create the model
const Users = mongoose.model('Users', users);

module.exports = Users;
