// models/Game.js
const mongoose = require('mongoose');

const gameSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  gameType: {
    type: String,
    enum: ['memory_match', 'timeline_quiz', 'photo_guess', 'word_association', 'trivia', 'story_builder'],
    required: true
  },
  title: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  gameData: {
    // Flexible schema for different game types
    cards: [{
      id: String,
      image: String,
      text: String,
      matchId: String
    }],
    questions: [{
      question: String,
      options: [String],
      correctAnswer: Number,
      image: String
    }],
    photos: [{
      image: String,
      hint: String,
      answer: String
    }],
    stories: [{
      prompt: String,
      userContribution: String,
      partnerContribution: String,
      timestamp: Date
    }]
  },
  sessions: [{
    playDate: {
      type: Date,
      default: Date.now
    },
    playerScore: {
      type: Number,
      default: 0
    },
    partnerScore: {
      type: Number,
      default: 0
    },
    duration: {
      type: Number, // in seconds
      default: 0
    },
    completedLevels: {
      type: Number,
      default: 0
    },
    gameResults: {
      type: mongoose.Schema.Types.Mixed
    }
  }],
  difficulty: {
    type: String,
    enum: ['easy', 'medium', 'hard'],
    default: 'medium'
  },
  isActive: {
    type: Boolean,
    default: true
  },
  highScore: {
    type: Number,
    default: 0
  },
  totalPlays: {
    type: Number,
    default: 0
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('Game', gameSchema);