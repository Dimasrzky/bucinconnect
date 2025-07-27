// models/Wishlist.js
const mongoose = require('mongoose');

const wishlistSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  title: {
    type: String,
    required: true,
    trim: true
  },
  description: {
    type: String,
    required: true
  },
  category: {
    type: String,
    enum: ['travel', 'experience', 'gift', 'goal', 'adventure', 'learning', 'other'],
    default: 'other'
  },
  priority: {
    type: Number,
    enum: [1, 2, 3, 4, 5],
    default: 3
  },
  estimatedCost: {
    type: Number,
    default: 0
  },
  targetDate: {
    type: Date
  },
  isCompleted: {
    type: Boolean,
    default: false
  },
  completedDate: {
    type: Date
  },
  completedImages: [{
    type: String
  }],
  completedNotes: {
    type: String,
    default: ''
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('Wishlist', wishlistSchema);