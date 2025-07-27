const mongoose = require('mongoose');
require('dotenv').config();

// Import models
const User = require('../models/User');
const Timeline = require('../models/Timeline');
const Countdown = require('../models/Countdown');
const Wishlist = require('../models/Wishlist');
const Quiz = require('../models/Quiz');
const MoodTracker = require('../models/MoodTracker');
const Music = require('../models/Music');
const TimeCapsule = require('../models/TimeCapsule');

async function seedDatabase() {
  try {
    // Connect to MongoDB
    await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/lovestory');
    console.log('Connected to MongoDB');

    // Clear existing data
    await Promise.all([
      User.deleteMany({}),
      Timeline.deleteMany({}),
      Countdown.deleteMany({}),
      Wishlist.deleteMany({}),
      Quiz.deleteMany({}),
      MoodTracker.deleteMany({}),
      Music.deleteMany({}),
      TimeCapsule.deleteMany({})
    ]);

    // Create demo user
    const bcrypt = require('bcryptjs');
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash('demo123', salt);

    const user = new User({
      email: 'demo@lovestory.com',
      password: hashedPassword,
      name: 'Sarah',
      partnerName: 'David',
      relationshipStartDate: new Date('2022-02-14')
    });

    await user.save();
    console.log('✅ Demo user created');

    // Create sample timeline entries
    const timelineEntries = [
      {
        userId: user._id,
        title: 'Pertemuan Pertama',
        description: 'Bertemu di kafe favorit dan langsung merasa ada chemistry',
        date: new Date('2022-02-14'),
        category: 'first_meeting',
        mood: 'excited'
      },
      {
        userId: user._id,
        title: 'Kencan Pertama',
        description: 'Dinner romantis di rooftop restaurant',
        date: new Date('2022-02-20'),
        category: 'first_date',
        mood: 'romantic'
      },
      {
        userId: user._id,
        title: 'Anniversary 1 Tahun',
        description: 'Merayakan 1 tahun bersama dengan trip ke Bali',
        date: new Date('2023-02-14'),
        category: 'anniversary',
        mood: 'happy'
      }
    ];

    await Timeline.insertMany(timelineEntries);
    console.log('✅ Sample timeline entries created');

    // Create sample countdowns
    const countdowns = [
      {
        userId: user._id,
        title: 'Anniversary ke-2',
        description: 'Dua tahun kebersamaan yang indah',
        targetDate: new Date('2024-02-14'),
        category: 'anniversary'
      },
      {
        userId: user._id,
        title: 'Trip ke Jepang',
        description: 'Liburan impian ke negeri sakura',
        targetDate: new Date('2024-03-15'),
        category: 'vacation'
      }
    ];

    await Countdown.insertMany(countdowns);
    console.log('✅ Sample countdowns created');

    // Create sample wishlist
    const wishlistItems = [
      {
        userId: user._id,
        title: 'Belajar Memasak Bersama',
        description: 'Mengikuti cooking class untuk couples',
        category: 'experience',
        priority: 4,
        estimatedCost: 500000
      },
      {
        userId: user._id,
        title: 'Road Trip Keliling Jawa',
        description: 'Menjelajahi keindahan Pulau Jawa dengan mobil',
        category: 'travel',
        priority: 5,
        estimatedCost: 5000000
      }
    ];

    await Wishlist.insertMany(wishlistItems);
    console.log('✅ Sample wishlist created');

    // Create sample music entries
    const musicEntries = [
      {
        userId: user._id,
        title: 'Perfect',
        artist: 'Ed Sheeran',
        memory: 'Lagu yang diputar saat kencan pertama',
        category: 'first_dance',
        mood: 'romantic',
        rating: 5,
        isFavorite: true
      },
      {
        userId: user._id,
        title: 'All of Me',
        artist: 'John Legend',
        memory: 'Lagu yang selalu membuat kita tersenyum',
        category: 'romantic',
        mood: 'romantic',
        rating: 5,
        isFavorite: true
      }
    ];

    await Music.insertMany(musicEntries);
    console.log('✅ Sample music entries created');

    console.log('\n🎉 Database seeded successfully!');
    console.log('👤 Demo user credentials:');
    console.log('📧 Email: demo@lovestory.com');
    console.log('🔒 Password: demo123');

    process.exit(0);
  } catch (error) {
    console.error('Error seeding database:', error);
    process.exit(1);
  }
}

seedDatabase();