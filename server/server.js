// server.js
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const multer = require('multer');
const path = require('path');
require('dotenv').config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use('/uploads', express.static('uploads'));

// Database Connection
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/lovestory', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// File Upload Configuration
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/');
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + '-' + Math.round(Math.random() * 1E9) + path.extname(file.originalname));
  }
});

const upload = multer({ 
  storage: storage,
  limits: {
    fileSize: 10 * 1024 * 1024 // 10MB limit
  }
});

// Models
const User = require('./models/User');
const Timeline = require('./models/Timeline');
const Countdown = require('./models/Countdown');
const Wishlist = require('./models/Wishlist');
const Quiz = require('./models/Quiz');
const MoodTracker = require('./models/MoodTracker');
const Music = require('./models/Music');
const Game = require('./models/Game');
const TimeCapsule = require('./models/TimeCapsule');

// Auth Middleware
const authMiddleware = (req, res, next) => {
  const token = req.header('Authorization')?.replace('Bearer ', '');
  
  if (!token) {
    return res.status(401).json({ message: 'No token, authorization denied' });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET || 'fallback_secret');
    req.user = decoded;
    next();
  } catch (error) {
    res.status(401).json({ message: 'Token is not valid' });
  }
};

// AUTH ROUTES
app.post('/api/auth/register', async (req, res) => {
  try {
    const { email, password, name, partnerName } = req.body;

    // Check if user exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: 'User already exists' });
    }

    // Hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Create user
    const user = new User({
      email,
      password: hashedPassword,
      name,
      partnerName,
      relationshipStartDate: new Date()
    });

    await user.save();

    // Create JWT token
    const token = jwt.sign(
      { userId: user._id, email: user.email },
      process.env.JWT_SECRET || 'fallback_secret',
      { expiresIn: '7d' }
    );

    res.status(201).json({
      message: 'User created successfully',
      token,
      user: {
        id: user._id,
        email: user.email,
        name: user.name,
        partnerName: user.partnerName
      }
    });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

app.post('/api/auth/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    // Check if user exists
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    // Check password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    // Create JWT token
    const token = jwt.sign(
      { userId: user._id, email: user.email },
      process.env.JWT_SECRET || 'fallback_secret',
      { expiresIn: '7d' }
    );

    res.json({
      message: 'Login successful',
      token,
      user: {
        id: user._id,
        email: user.email,
        name: user.name,
        partnerName: user.partnerName
      }
    });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// TIMELINE ROUTES
app.get('/api/timeline', authMiddleware, async (req, res) => {
  try {
    const timeline = await Timeline.find({ userId: req.user.userId }).sort({ date: -1 });
    res.json(timeline);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

app.post('/api/timeline', authMiddleware, upload.array('images', 5), async (req, res) => {
  try {
    const { title, description, date, category } = req.body;
    const images = req.files ? req.files.map(file => file.filename) : [];

    const timelineEntry = new Timeline({
      userId: req.user.userId,
      title,
      description,
      date,
      category,
      images
    });

    await timelineEntry.save();
    res.status(201).json(timelineEntry);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// COUNTDOWN ROUTES
app.get('/api/countdown', authMiddleware, async (req, res) => {
  try {
    const countdowns = await Countdown.find({ userId: req.user.userId }).sort({ targetDate: 1 });
    res.json(countdowns);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

app.post('/api/countdown', authMiddleware, async (req, res) => {
  try {
    const { title, description, targetDate, category } = req.body;

    const countdown = new Countdown({
      userId: req.user.userId,
      title,
      description,
      targetDate,
      category
    });

    await countdown.save();
    res.status(201).json(countdown);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// WISHLIST ROUTES
app.get('/api/wishlist', authMiddleware, async (req, res) => {
  try {
    const wishlist = await Wishlist.find({ userId: req.user.userId }).sort({ priority: -1 });
    res.json(wishlist);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

app.post('/api/wishlist', authMiddleware, async (req, res) => {
  try {
    const { title, description, category, priority, estimatedCost } = req.body;

    const wishlistItem = new Wishlist({
      userId: req.user.userId,
      title,
      description,
      category,
      priority,
      estimatedCost
    });

    await wishlistItem.save();
    res.status(201).json(wishlistItem);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

app.patch('/api/wishlist/:id/complete', authMiddleware, async (req, res) => {
  try {
    const wishlistItem = await Wishlist.findOneAndUpdate(
      { _id: req.params.id, userId: req.user.userId },
      { isCompleted: true, completedDate: new Date() },
      { new: true }
    );

    if (!wishlistItem) {
      return res.status(404).json({ message: 'Wishlist item not found' });
    }

    res.json(wishlistItem);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// QUIZ ROUTES
app.get('/api/quiz', authMiddleware, async (req, res) => {
  try {
    const quizzes = await Quiz.find({ userId: req.user.userId }).sort({ createdAt: -1 });
    res.json(quizzes);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

app.post('/api/quiz', authMiddleware, async (req, res) => {
  try {
    const { questions } = req.body;

    const quiz = new Quiz({
      userId: req.user.userId,
      questions
    });

    await quiz.save();
    res.status(201).json(quiz);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

app.post('/api/quiz/:id/attempt', authMiddleware, async (req, res) => {
  try {
    const { answers } = req.body;
    const quiz = await Quiz.findOne({ _id: req.params.id, userId: req.user.userId });
    
    if (!quiz) {
      return res.status(404).json({ message: 'Quiz not found' });
    }

    // Calculate score
    let score = 0;
    quiz.questions.forEach((question, index) => {
      if (question.correctAnswer === answers[index]) {
        score++;
      }
    });

    const attempt = {
      answers,
      score,
      totalQuestions: quiz.questions.length,
      attemptDate: new Date()
    };

    quiz.attempts.push(attempt);
    await quiz.save();

    res.json({
      score,
      totalQuestions: quiz.questions.length,
      percentage: Math.round((score / quiz.questions.length) * 100)
    });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// MOOD TRACKER ROUTES
app.get('/api/mood', authMiddleware, async (req, res) => {
  try {
    const { startDate, endDate } = req.query;
    let query = { userId: req.user.userId };
    
    if (startDate && endDate) {
      query.date = {
        $gte: new Date(startDate),
        $lte: new Date(endDate)
      };
    }

    const moods = await MoodTracker.find(query).sort({ date: -1 });
    res.json(moods);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

app.post('/api/mood', authMiddleware, async (req, res) => {
  try {
    const { userMood, partnerMood, note, date } = req.body;

    const moodEntry = new MoodTracker({
      userId: req.user.userId,
      userMood,
      partnerMood,
      note,
      date: date || new Date()
    });

    await moodEntry.save();
    res.status(201).json(moodEntry);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// MUSIC ROUTES
app.get('/api/music', authMiddleware, async (req, res) => {
  try {
    const music = await Music.find({ userId: req.user.userId }).sort({ createdAt: -1 });
    res.json(music);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

app.post('/api/music', authMiddleware, async (req, res) => {
  try {
    const { title, artist, spotifyUrl, youtubeUrl, memory, category } = req.body;

    const musicEntry = new Music({
      userId: req.user.userId,
      title,
      artist,
      spotifyUrl,
      youtubeUrl,
      memory,
      category
    });

    await musicEntry.save();
    res.status(201).json(musicEntry);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// TIME CAPSULE ROUTES
app.get('/api/timecapsule', authMiddleware, async (req, res) => {
  try {
    const timeCapsules = await TimeCapsule.find({ 
      userId: req.user.userId,
      openDate: { $lte: new Date() }
    }).sort({ openDate: -1 });
    res.json(timeCapsules);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

app.post('/api/timecapsule', authMiddleware, upload.array('attachments', 10), async (req, res) => {
  try {
    const { title, message, openDate } = req.body;
    const attachments = req.files ? req.files.map(file => ({
      filename: file.filename,
      originalName: file.originalname,
      fileType: file.mimetype
    })) : [];

    const timeCapsule = new TimeCapsule({
      userId: req.user.userId,
      title,
      message,
      openDate,
      attachments
    });

    await timeCapsule.save();
    res.status(201).json({ message: 'Time capsule created successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});