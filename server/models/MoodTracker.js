// models/MoodTracker.js
const mongoose = require('mongoose');

const moodTrackerSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  date: {
    type: Date,
    required: true,
    default: Date.now
  },
  userMood: {
    type: String,
    enum: ['very_happy', 'happy', 'neutral', 'sad', 'very_sad', 'angry', 'excited', 'anxious', 'romantic', 'grateful'],
    required: true
  },
  partnerMood: {
    type: String,
    enum: ['very_happy', 'happy', 'neutral', 'sad', 'very_sad', 'angry', 'excited', 'anxious', 'romantic', 'grateful'],
    required: true
  },
  userMoodScore: {
    type: Number,
    min: 1,
    max: 10,
    default: 5
  },
  partnerMoodScore: {
    type: Number,
    min: 1,
    max: 10,
    default: 5
  },
  note: {
    type: String,
    maxlength: 500
  },
  activities: [{
    type: String,
    enum: ['date', 'home', 'work', 'travel', 'family', 'friends', 'exercise', 'hobby', 'rest', 'other']
  }],
  relationshipSatisfaction: {
    type: Number,
    min: 1,
    max: 10,
    default: 8
  }
}, {
  timestamps: true
});

// Ensure one mood entry per day per user
moodTrackerSchema.index({ userId: 1, date: 1 }, { unique: true });

module.exports = mongoose.model('MoodTracker', moodTrackerSchema);