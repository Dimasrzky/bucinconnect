// models/Music.js
const mongoose = require('mongoose');

const musicSchema = new mongoose.Schema({
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
  artist: {
    type: String,
    required: true,
    trim: true
  },
  album: {
    type: String,
    trim: true
  },
  genre: {
    type: String,
    trim: true
  },
  releaseYear: {
    type: Number
  },
  spotifyUrl: {
    type: String,
    trim: true
  },
  youtubeUrl: {
    type: String,
    trim: true
  },
  appleUrl: {
    type: String,
    trim: true
  },
  memory: {
    type: String,
    required: true
  },
  category: {
    type: String,
    enum: ['our_song', 'first_dance', 'proposal', 'wedding', 'travel', 'romantic', 'fun', 'nostalgic', 'other'],
    default: 'other'
  },
  mood: {
    type: String,
    enum: ['romantic', 'happy', 'nostalgic', 'energetic', 'calm', 'sad', 'passionate'],
    default: 'romantic'
  },
  rating: {
    type: Number,
    min: 1,
    max: 5,
    default: 5
  },
  dateAdded: {
    type: Date,
    default: Date.now
  },
  playCount: {
    type: Number,
    default: 0
  },
  isFavorite: {
    type: Boolean,
    default: false
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('Music', musicSchema);
