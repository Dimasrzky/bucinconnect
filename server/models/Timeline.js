const mongoose = require('mongoose');

const timelineSchema = new mongoose.Schema({
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
  date: {
    type: Date,
    required: true
  },
  category: {
    type: String,
    enum: ['first_meeting', 'first_date', 'anniversary', 'travel', 'milestone', 'surprise', 'other'],
    default: 'other'
  },
  images: [{
    type: String
  }],
  location: {
    type: String,
    default: ''
  },
  mood: {
    type: String,
    enum: ['happy', 'romantic', 'excited', 'peaceful', 'adventurous'],
    default: 'happy'
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('Timeline', timelineSchema);