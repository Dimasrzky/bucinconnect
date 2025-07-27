// server/server.js - Fixed timing issue
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const multer = require('multer');
const path = require('path');
const fs = require('fs');

// Load environment variables with explicit path
const envPath = path.join(__dirname, '.env');
console.log('🔍 Loading .env from:', envPath);

if (fs.existsSync(envPath)) {
  require('dotenv').config({ path: envPath });
  console.log('✅ .env file found and loaded');
} else {
  console.log('❌ .env file not found at:', envPath);
}

const app = express();

// Middleware
app.use(cors({
  origin: ['http://localhost:3000', 'http://127.0.0.1:3000'],
  credentials: true
}));
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ extended: true, limit: '50mb' }));
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Ensure uploads directory exists
const uploadsDir = path.join(__dirname, 'uploads');
if (!fs.existsSync(uploadsDir)) {
  fs.mkdirSync(uploadsDir, { recursive: true });
  console.log('📁 Created uploads directory');
}

let isMongoConnected = false;

// Environment validation and debugging
console.log('\n🔍 Environment Validation:');
console.log('Working directory:', process.cwd());
console.log('Script directory:', __dirname);
console.log('NODE_ENV:', process.env.NODE_ENV || 'not set');
console.log('PORT:', process.env.PORT || 'not set');
console.log('MONGODB_URI exists:', !!process.env.MONGODB_URI);
console.log('JWT_SECRET exists:', !!process.env.JWT_SECRET);

// Validate required environment variables
const requiredEnvVars = ['MONGODB_URI', 'JWT_SECRET'];
const missingEnvVars = requiredEnvVars.filter(varName => !process.env[varName]);

if (missingEnvVars.length > 0) {
  console.log('\n❌ Missing required environment variables:');
  missingEnvVars.forEach(varName => {
    console.log(`   - ${varName}`);
  });
  console.log('\n🟡 Running in DEMO MODE due to missing environment variables...\n');
} else {
  console.log('✅ All required environment variables are present');
  
  // Safe logging of MongoDB URI (mask password)
  if (process.env.MONGODB_URI) {
    const maskedUri = process.env.MONGODB_URI.replace(/\/\/([^:]+):([^@]+)@/, '//$1:****@');
    console.log('📊 MongoDB URI format:', maskedUri);
  }
}

// Enhanced MongoDB connection function
const connectToMongo = async () => {
  try {
    const mongoUri = process.env.MONGODB_URI;
    
    if (!mongoUri) {
      throw new Error('MONGODB_URI not found in environment variables');
    }

    console.log('\n🔗 Attempting MongoDB Atlas connection...');
    
    const connectionOptions = {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      serverSelectionTimeoutMS: 15000,
      connectTimeoutMS: 15000,
      socketTimeoutMS: 45000,
      maxPoolSize: 10,
      retryWrites: true,
      w: 'majority',
      authSource: 'admin',
    };

    await mongoose.connect(mongoUri, connectionOptions);
    
    console.log('\n✅ MongoDB Atlas Connection Successful!');
    console.log('📊 Database:', mongoose.connection.db.databaseName);
    console.log('🌐 Host:', mongoose.connection.host);
    console.log('🔌 Ready State:', mongoose.connection.readyState);
    
    isMongoConnected = true;
    
    // Update server status display
    console.log('\n🔄 Database Status Updated:');
    console.log('💾 Database: ✅ MongoDB Atlas Connected');
    
    // Test database access
    try {
      await mongoose.connection.db.admin().ping();
      console.log('🏓 Database ping successful');
      
      const collections = await mongoose.connection.db.listCollections().toArray();
      console.log('📋 Available collections:', collections.length);
      
    } catch (testError) {
      console.log('⚠️ Database operation test failed:', testError.message);
    }

    // Handle connection events
    mongoose.connection.on('disconnected', () => {
      console.log('❌ MongoDB Atlas disconnected');
      isMongoConnected = false;
    });

    mongoose.connection.on('error', (err) => {
      console.log('❌ MongoDB Atlas error:', err.message);
      isMongoConnected = false;
    });

    mongoose.connection.on('reconnected', () => {
      console.log('🔄 MongoDB Atlas reconnected');
      isMongoConnected = true;
    });

  } catch (error) {
    console.log('\n🔴 MongoDB Atlas Connection Failed');
    console.log('📝 Error:', error.message);
    console.log('\n🟡 Running in DEMO MODE without database...\n');
    isMongoConnected = false;
  }
};

// Import models
let User, Timeline, Countdown, Wishlist, Quiz, MoodTracker, Music, Game, TimeCapsule;

const loadModels = async () => {
  try {
    if (isMongoConnected) {
      console.log('\n📦 Loading Mongoose models...');
      User = require('./models/User');
      Timeline = require('./models/Timeline');
      Countdown = require('./models/Countdown');
      Wishlist = require('./models/Wishlist');
      Quiz = require('./models/Quiz');
      MoodTracker = require('./models/MoodTracker');
      Music = require('./models/Music');
      Game = require('./models/Game');
      TimeCapsule = require('./models/TimeCapsule');
      
      console.log('✅ All models loaded successfully');
      
      // Final status update
      console.log('\n🎉 SYSTEM READY:');
      console.log('💾 Database: ✅ MongoDB Atlas Connected & Models Loaded');
      console.log('🔒 Authentication: ✅ JWT Ready');
      console.log('📁 File Upload: ✅ Ready');
      console.log('🌐 API Endpoints: ✅ Active');
      
    } else {
      console.log('⚠️ Models not loaded - running in demo mode');
    }
  } catch (error) {
    console.log('❌ Error loading models:', error.message);
  }
};

// File Upload Configuration
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, uploadsDir);
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, file.fieldname + '-' + uniqueSuffix + path.extname(file.originalname));
  }
});

const upload = multer({ 
  storage: storage,
  limits: {
    fileSize: 10 * 1024 * 1024, // 10MB
    files: 10
  }
});

// Auth Middleware
const authMiddleware = (req, res, next) => {
  if (!isMongoConnected) {
    req.user = { 
      userId: 'demo-user-123', 
      email: 'demo@lovestory.com',
      name: 'Sarah'
    };
    return next();
  }

  const token = req.header('Authorization')?.replace('Bearer ', '');
  
  if (!token) {
    return res.status(401).json({ message: 'No token, authorization denied' });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (error) {
    res.status(401).json({ message: 'Token is not valid' });
  }
};

// Demo Data
const demoData = {
  users: {
    'demo@lovestory.com': {
      id: 'demo-user-123',
      email: 'demo@lovestory.com',
      name: 'Sarah',
      partnerName: 'David',
      relationshipStartDate: new Date('2022-02-14')
    }
  },
  timeline: [
    {
      _id: '1',
      userId: 'demo-user-123',
      title: 'Pertemuan Pertama',
      description: 'Bertemu di kafe favorit dan langsung merasa ada chemistry yang luar biasa.',
      date: new Date('2022-02-14'),
      category: 'first_meeting',
      mood: 'excited',
      images: [],
      location: 'Kafe Romantis Jakarta',
      createdAt: new Date('2022-02-14')
    }
  ],
  countdown: [
    {
      _id: '1',
      userId: 'demo-user-123',
      title: 'Anniversary ke-3',
      description: 'Tiga tahun kebersamaan yang indah',
      targetDate: new Date('2025-02-14'),
      category: 'anniversary',
      isCompleted: false,
      createdAt: new Date()
    }
  ],
  wishlist: []
};

// HEALTH CHECK ENDPOINT
app.get('/api/health', (req, res) => {
  res.json({
    status: 'OK',
    timestamp: new Date().toISOString(),
    database: isMongoConnected ? 'Connected to MongoDB Atlas' : 'Demo Mode',
    environment: process.env.NODE_ENV,
    environmentVariables: {
      mongodbUri: !!process.env.MONGODB_URI,
      jwtSecret: !!process.env.JWT_SECRET,
      port: process.env.PORT,
      nodeEnv: process.env.NODE_ENV
    },
    connection: {
      isConnected: isMongoConnected,
      host: isMongoConnected ? mongoose.connection.host : null,
      database: isMongoConnected ? mongoose.connection.db?.databaseName : null,
      readyState: isMongoConnected ? mongoose.connection.readyState : 0
    },
    server: 'Love Story Backend v1.0'
  });
});

// AUTH ROUTES
app.post('/api/auth/register', async (req, res) => {
  try {
    const { email, password, name, partnerName } = req.body;

    if (!email || !password || !name || !partnerName) {
      return res.status(400).json({ 
        message: 'Semua field harus diisi',
        required: ['email', 'password', 'name', 'partnerName']
      });
    }

    if (password.length < 6) {
      return res.status(400).json({ message: 'Password minimal 6 karakter' });
    }

    // Demo mode
    if (!isMongoConnected) {
      const demoUser = {
        id: 'demo-user-' + Date.now(),
        email: email,
        name: name,
        partnerName: partnerName,
        relationshipStartDate: new Date()
      };
      
      const token = jwt.sign(
        { userId: demoUser.id, email: demoUser.email },
        process.env.JWT_SECRET || 'demo_secret_key',
        { expiresIn: process.env.JWT_EXPIRE || '7d' }
      );

      return res.status(201).json({
        message: 'Demo registration successful! 🎉',
        token,
        user: demoUser,
        note: 'Demo mode - data will not be saved permanently'
      });
    }

    // Real database mode
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: 'Email sudah terdaftar' });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const user = new User({
      email,
      password: hashedPassword,
      name,
      partnerName,
      relationshipStartDate: new Date()
    });

    await user.save();

    const token = jwt.sign(
      { userId: user._id, email: user.email },
      process.env.JWT_SECRET,
      { expiresIn: process.env.JWT_EXPIRE || '7d' }
    );

    res.status(201).json({
      message: 'User berhasil dibuat',
      token,
      user: {
        id: user._id,
        email: user.email,
        name: user.name,
        partnerName: user.partnerName,
        relationshipStartDate: user.relationshipStartDate
      }
    });
  } catch (error) {
    console.error('Registration error:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

app.post('/api/auth/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ message: 'Email dan password harus diisi' });
    }

    // Demo mode
    if (!isMongoConnected) {
      const demoUser = demoData.users[email] || demoData.users['demo@lovestory.com'];
      
      const token = jwt.sign(
        { userId: demoUser.id, email: demoUser.email },
        process.env.JWT_SECRET || 'demo_secret_key',
        { expiresIn: process.env.JWT_EXPIRE || '7d' }
      );

      return res.json({
        message: 'Demo login successful! 🎉',
        token,
        user: demoUser,
        note: 'Demo mode - any email/password works'
      });
    }

    // Real database mode
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: 'Email atau password salah' });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: 'Email atau password salah' });
    }

    const token = jwt.sign(
      { userId: user._id, email: user.email },
      process.env.JWT_SECRET,
      { expiresIn: process.env.JWT_EXPIRE || '7d' }
    );

    res.json({
      message: 'Login berhasil',
      token,
      user: {
        id: user._id,
        email: user.email,
        name: user.name,
        partnerName: user.partnerName,
        relationshipStartDate: user.relationshipStartDate
      }
    });
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Basic API routes
app.get('/api/timeline', authMiddleware, async (req, res) => {
  try {
    if (!isMongoConnected) {
      return res.json(demoData.timeline.filter(item => item.userId === req.user.userId));
    }

    const timeline = await Timeline.find({ userId: req.user.userId }).sort({ date: -1 });
    res.json(timeline);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

app.get('/api/countdown', authMiddleware, async (req, res) => {
  try {
    if (!isMongoConnected) {
      return res.json(demoData.countdown.filter(item => item.userId === req.user.userId));
    }

    const countdowns = await Countdown.find({ userId: req.user.userId }).sort({ targetDate: 1 });
    res.json(countdowns);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

app.get('/api/wishlist', authMiddleware, async (req, res) => {
  try {
    if (!isMongoConnected) {
      return res.json(demoData.wishlist.filter(item => item.userId === req.user.userId));
    }

    const wishlist = await Wishlist.find({ userId: req.user.userId }).sort({ priority: -1 });
    res.json(wishlist);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Error handling
app.use((error, req, res, next) => {
  console.error('Server Error:', error);
  res.status(500).json({
    message: 'Internal server error',
    error: process.env.NODE_ENV === 'development' ? error.message : 'Something went wrong'
  });
});

// Function to display current status
const displayServerStatus = () => {
  const dbStatus = isMongoConnected ? '✅ MongoDB Atlas Connected' : '🟡 Demo Mode';
  const securityStatus = process.env.JWT_SECRET ? '✅ JWT Configured' : '⚠️ Using fallback';
  
  console.log('\n🚀 Love Story Server Started Successfully!');
  console.log('┌─────────────────────────────────────────┐');
  console.log(`│ 📱 Frontend:  http://localhost:3000     │`);
  console.log(`│ 🔧 Backend:   http://localhost:5000     │`);
  console.log(`│ 🌐 Health:    http://localhost:5000/api/health │`);
  console.log('└─────────────────────────────────────────┘');
  console.log(`💾 Database:  ${dbStatus}`);
  console.log(`🔒 Security:  ${securityStatus}`);
  console.log(`📁 Uploads:   ${uploadsDir}`);
  console.log('\n💝 Ready to store your love story! 💕\n');
};

// Connect to MongoDB and start server
const startServer = async () => {
  // Connect to MongoDB first if environment variables are available
  if (!missingEnvVars.length) {
    await connectToMongo();
    
    if (isMongoConnected) {
      setTimeout(loadModels, 1000);
    }
  } else {
    console.log('Skipping MongoDB connection due to missing environment variables');
  }

  // Start server
  const PORT = process.env.PORT || 5000;
  const server = app.listen(PORT, () => {
    displayServerStatus();
  });

  server.on('error', (error) => {
    console.error('❌ Server Error:', error);
  });
};

// Start the application
startServer();

module.exports = app;