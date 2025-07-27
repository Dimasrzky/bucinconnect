// models/Countdown.js
const mongoose = require('mongoose');

const countdownSchema = new mongoose.Schema({
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
  targetDate: {
    type: Date,
    required: true
  },
  category: {
    type: String,
    enum: ['anniversary', 'birthday', 'vacation', 'wedding', 'meeting', 'special_day', 'other'],
    default: 'other'
  },
  isRecurring: {
    type: Boolean,
    default: false
  },
  reminderDays: {
    type: Number,
    default: 1
  },
  isCompleted: {
    type: Boolean,
    default: false
  },
  completedDate: {
    type: Date
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('Countdown', countdownSchema);