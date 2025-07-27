// models/Quiz.js
const mongoose = require('mongoose');

const quizSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  title: {
    type: String,
    default: 'Quiz Tentang Pasangan'
  },
  questions: [{
    question: {
      type: String,
      required: true
    },
    options: [{
      type: String,
      required: true
    }],
    correctAnswer: {
      type: Number,
      required: true
    },
    category: {
      type: String,
      enum: ['favorites', 'memories', 'preferences', 'future', 'personality', 'family'],
      default: 'favorites'
    }
  }],
  attempts: [{
    answers: [{
      type: Number
    }],
    score: {
      type: Number,
      required: true
    },
    totalQuestions: {
      type: Number,
      required: true
    },
    attemptDate: {
      type: Date,
      default: Date.now
    }
  }],
  difficulty: {
    type: String,
    enum: ['easy', 'medium', 'hard'],
    default: 'medium'
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('Quiz', quizSchema);