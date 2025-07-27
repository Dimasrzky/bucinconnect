// models/TimeCapsule.js
const mongoose = require('mongoose');

const timeCapsuleSchema = new mongoose.Schema({
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
  message: {
    type: String,
    required: true,
    maxlength: 2000
  },
  createdDate: {
    type: Date,
    default: Date.now
  },
  openDate: {
    type: Date,
    required: true
  },
  isOpened: {
    type: Boolean,
    default: false
  },
  openedDate: {
    type: Date
  },
  category: {
    type: String,
    enum: ['anniversary', 'future_goals', 'current_feelings', 'memories', 'promises', 'gratitude', 'other'],
    default: 'other'
  },
  attachments: [{
    filename: {
      type: String,
      required: true
    },
    originalName: {
      type: String,
      required: true
    },
    fileType: {
      type: String,
      required: true
    },
    uploadDate: {
      type: Date,
      default: Date.now
    }
  }],
  recipientType: {
    type: String,
    enum: ['both', 'self', 'partner'],
    default: 'both'
  },
  priority: {
    type: String,
    enum: ['low', 'medium', 'high'],
    default: 'medium'
  },
  tags: [{
    type: String,
    trim: true
  }],
  isPrivate: {
    type: Boolean,
    default: false
  },
  reactions: [{
    emoji: String,
    comment: String,
    timestamp: {
      type: Date,
      default: Date.now
    }
  }]
}, {
  timestamps: true
});

// Index for efficient queries
timeCapsuleSchema.index({ userId: 1, openDate: 1 });
timeCapsuleSchema.index({ userId: 1, isOpened: 1 });

module.exports = mongoose.model('TimeCapsule', timeCapsuleSchema);