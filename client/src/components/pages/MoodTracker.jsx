import React, { useState, useEffect } from 'react';
import { Smile, Frown, Meh, Heart, Angry, Zap, Sun, Cloud, CloudRain, Snowflake, Plus, Calendar, TrendingUp, BarChart3, PieChart, Filter, MessageCircle, Eye, Users, User, ChevronLeft, ChevronRight, Star, Target, Activity } from 'lucide-react';

const MoodTracker = () => {
  const [moods, setMoods] = useState([]);
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split('T')[0]);
  const [viewMode, setViewMode] = useState('today'); // today, week, month, chart
  const [isAddingMood, setIsAddingMood] = useState(false);
  const [selectedPerson, setSelectedPerson] = useState('both'); // both, him, her
  const [newMood, setNewMood] = useState({
    emotion: 'happy',
    intensity: 7,
    note: '',
    activities: [],
    triggers: [],
    person: 'him'
  });

  // Sample mood data
  useEffect(() => {
    const sampleMoods = [
      {
        id: 1,
        date: '2025-01-28',
        time: '09:00',
        emotion: 'happy',
        intensity: 8,
        note: 'Bangun pagi dalam mood yang sangat baik! Ada pesan sweet dari dia 💕',
        activities: ['texting', 'morning-routine'],
        triggers: ['romantic-message'],
        person: 'her',
        weather: 'sunny'
      },
      {
        id: 2,
        date: '2025-01-28',
        time: '10:30',
        emotion: 'excited',
        intensity: 9,
        note: 'Dapat kabar baik tentang pekerjaan! Langsung share sama dia',
        activities: ['work', 'sharing-news'],
        triggers: ['good-news'],
        person: 'him',
        weather: 'sunny'
      },
      {
        id: 3,
        date: '2025-01-27',
        time: '14:20',
        emotion: 'loved',
        intensity: 10,
        note: 'Lunch date berdua di tempat favorit. Dia sangat perhatian hari ini 🥰',
        activities: ['date', 'eating'],
        triggers: ['quality-time'],
        person: 'her',
        weather: 'cloudy'
      },
      {
        id: 4,
        date: '2025-01-27',
        time: '20:15',
        emotion: 'grateful',
        intensity: 9,
        note: 'Bersyukur punya pasangan yang selalu mendukung. Love you so much!',
        activities: ['reflection', 'conversation'],
        triggers: ['deep-talk'],
        person: 'him',
        weather: 'cloudy'
      },
      {
        id: 5,
        date: '2025-01-26',
        time: '16:45',
        emotion: 'anxious',
        intensity: 4,
        note: 'Sempat khawatir karena dia lama tidak balas chat. Ternyata meeting panjang',
        activities: ['waiting', 'overthinking'],
        triggers: ['communication-gap'],
        person: 'her',
        weather: 'rainy'
      },
      {
        id: 6,
        date: '2025-01-26',
        time: '19:30',
        emotion: 'content',
        intensity: 8,
        note: 'Video call malam ini menenangkan. Dia selalu tahu cara bikin aku tenang',
        activities: ['video-call', 'talking'],
        triggers: ['reassurance'],
        person: 'her',
        weather: 'rainy'
      },
      {
        id: 7,
        date: '2025-01-25',
        time: '12:00',
        emotion: 'playful',
        intensity: 8,
        note: 'Lagi main game online bareng. Dia lucu banget kalau kalah 😂',
        activities: ['gaming', 'laughing'],
        triggers: ['fun-activity'],
        person: 'him',
        weather: 'sunny'
      }
    ];
    setMoods(sampleMoods);
  }, []);

  const emotions = {
    happy: { emoji: '😊', label: 'Bahagia', color: '#4ade80' },
    excited: { emoji: '🤩', label: 'Bersemangat', color: '#f59e0b' },
    loved: { emoji: '🥰', label: 'Merasa Dicintai', color: '#ec4899' },
    grateful: { emoji: '🙏', label: 'Bersyukur', color: '#8b5cf6' },
    content: { emoji: '😌', label: 'Puas/Tenang', color: '#06b6d4' },
    playful: { emoji: '😄', label: 'Playful', color: '#f97316' },
    anxious: { emoji: '😰', label: 'Cemas', color: '#ef4444' },
    sad: { emoji: '😢', label: 'Sedih', color: '#64748b' },
    angry: { emoji: '😠', label: 'Marah', color: '#dc2626' },
    confused: { emoji: '😕', label: 'Bingung', color: '#6b7280' },
    romantic: { emoji: '😍', label: 'Romantis', color: '#be185d' },
    lonely: { emoji: '😔', label: 'Kesepian', color: '#475569' }
  };

  const activities = {
    'date': 'Kencan',
    'texting': 'Chatting',
    'video-call': 'Video Call',
    'work': 'Bekerja',
    'eating': 'Makan',
    'gaming': 'Main Game',
    'movie': 'Nonton Film',
    'exercise': 'Olahraga',
    'reading': 'Membaca',
    'cooking': 'Memasak',
    'traveling': 'Jalan-jalan',
    'shopping': 'Belanja',
    'family-time': 'Waktu Keluarga',
    'friend-time': 'Dengan Teman',
    'alone-time': 'Me Time',
    'sleeping': 'Tidur',
    'morning-routine': 'Rutina Pagi',
    'working-out': 'Workout',
    'meditation': 'Meditasi',
    'music': 'Mendengar Musik'
  };

  const triggers = {
    'romantic-message': 'Pesan Romantis',
    'quality-time': 'Quality Time',
    'physical-touch': 'Physical Touch',
    'good-news': 'Kabar Baik',
    'achievement': 'Pencapaian',
    'surprise': 'Kejutan',
    'deep-talk': 'Pembicaraan Mendalam',
    'communication-gap': 'Kurang Komunikasi',
    'misunderstanding': 'Kesalahpahaman',
    'stress': 'Stress',
    'tired': 'Kelelahan',
    'pms': 'PMS',
    'work-pressure': 'Tekanan Kerja',
    'family-issue': 'Masalah Keluarga',
    'health-issue': 'Masalah Kesehatan',
    'financial-worry': 'Kekhawatiran Finansial',
    'jealousy': 'Cemburu',
    'insecurity': 'Insecurity',
    'missing-partner': 'Kangen Pasangan',
    'reassurance': 'Dapat Dukungan',
    'fun-activity': 'Aktivitas Menyenangkan'
  };

  const weatherIcons = {
    sunny: { icon: Sun, label: 'Cerah', color: '#f59e0b' },
    cloudy: { icon: Cloud, label: 'Berawan', color: '#6b7280' },
    rainy: { icon: CloudRain, label: 'Hujan', color: '#3b82f6' },
    snowy: { icon: Snowflake, label: 'Bersalju', color: '#06b6d4' }
  };

  // Add new mood
  const addMood = () => {
    if (newMood.emotion && newMood.intensity) {
      const mood = {
        ...newMood,
        id: Date.now(),
        date: selectedDate,
        time: new Date().toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' }),
        weather: 'sunny' // default weather
      };
      setMoods([...moods, mood].sort((a, b) => new Date(b.date + ' ' + b.time) - new Date(a.date + ' ' + a.time)));
      resetForm();
    }
  };

  // Reset form
  const resetForm = () => {
    setNewMood({
      emotion: 'happy',
      intensity: 7,
      note: '',
      activities: [],
      triggers: [],
      person: 'him'
    });
    setIsAddingMood(false);
  };

  // Filter moods
  const getFilteredMoods = () => {
    let filtered = moods;

    // Filter by person
    if (selectedPerson !== 'both') {
      filtered = filtered.filter(mood => mood.person === selectedPerson);
    }

    // Filter by date range based on view mode
    const today = new Date();
    if (viewMode === 'today') {
      const todayStr = today.toISOString().split('T')[0];
      filtered = filtered.filter(mood => mood.date === todayStr);
    } else if (viewMode === 'week') {
      const weekAgo = new Date(today.getTime() - 7 * 24 * 60 * 60 * 1000);
      filtered = filtered.filter(mood => new Date(mood.date) >= weekAgo);
    } else if (viewMode === 'month') {
      const monthAgo = new Date(today.getTime() - 30 * 24 * 60 * 60 * 1000);
      filtered = filtered.filter(mood => new Date(mood.date) >= monthAgo);
    }

    return filtered.sort((a, b) => new Date(b.date + ' ' + b.time) - new Date(a.date + ' ' + a.time));
  };

  // Calculate mood statistics
  const getMoodStats = () => {
    const filtered = getFilteredMoods();
    if (filtered.length === 0) return { average: 0, total: 0, distribution: {} };

    const total = filtered.length;
    const average = filtered.reduce((sum, mood) => sum + mood.intensity, 0) / total;
    
    const distribution = {};
    filtered.forEach(mood => {
      distribution[mood.emotion] = (distribution[mood.emotion] || 0) + 1;
    });

    return { average: Math.round(average * 10) / 10, total, distribution };
  };

  // Get mood trend
  const getMoodTrend = () => {
    const filtered = getFilteredMoods();
    if (filtered.length < 2) return 'stable';
    
    const recent = filtered.slice(0, Math.min(3, filtered.length));
    const older = filtered.slice(Math.min(3, filtered.length), Math.min(6, filtered.length));
    
    const recentAvg = recent.reduce((sum, mood) => sum + mood.intensity, 0) / recent.length;
    const olderAvg = older.length > 0 ? older.reduce((sum, mood) => sum + mood.intensity, 0) / older.length : recentAvg;
    
    if (recentAvg > olderAvg + 0.5) return 'improving';
    if (recentAvg < olderAvg - 0.5) return 'declining';
    return 'stable';
  };

  // Format date
  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('id-ID', {
      weekday: 'long',
      day: 'numeric',
      month: 'long'
    });
  };

  const stats = getMoodStats();
  const trend = getMoodTrend();
  const filteredMoods = getFilteredMoods();

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 p-6">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-2">
            Mood Tracker 😊
          </h1>
          <p className="text-gray-600 text-lg">
            Lacak perasaan dan emosi kalian untuk memahami satu sama lain lebih dalam
          </p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          <div className="bg-white rounded-xl p-4 shadow-lg text-center">
            <div className="text-2xl font-bold text-blue-600">{stats.total}</div>
            <div className="text-gray-600 text-sm">Total Mood Records</div>
          </div>
          <div className="bg-white rounded-xl p-4 shadow-lg text-center">
            <div className="text-2xl font-bold text-green-600">{stats.average}/10</div>
            <div className="text-gray-600 text-sm">Average Mood</div>
          </div>
          <div className="bg-white rounded-xl p-4 shadow-lg text-center">
            <div className={`text-2xl font-bold ${
              trend === 'improving' ? 'text-green-600' : 
              trend === 'declining' ? 'text-red-600' : 'text-yellow-600'
            }`}>
              {trend === 'improving' ? '📈' : trend === 'declining' ? '📉' : '➡️'}
            </div>
            <div className="text-gray-600 text-sm">
              {trend === 'improving' ? 'Membaik' : 
               trend === 'declining' ? 'Menurun' : 'Stabil'}
            </div>
          </div>
          <div className="bg-white rounded-xl p-4 shadow-lg text-center">
            <div className="text-2xl">
              {Object.keys(stats.distribution).length > 0 ? 
                emotions[Object.keys(stats.distribution).reduce((a, b) => 
                  stats.distribution[a] > stats.distribution[b] ? a : b
                )].emoji : '😊'}
            </div>
            <div className="text-gray-600 text-sm">Mood Terbanyak</div>
          </div>
        </div>

        {/* Controls */}
        <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
          <div className="flex flex-col lg:flex-row gap-4 items-center justify-between">
            {/* View Mode */}
            <div className="flex gap-2">
              {[
                { key: 'today', label: 'Hari Ini' },
                { key: 'week', label: 'Minggu Ini' },
                { key: 'month', label: 'Bulan Ini' },
                { key: 'chart', label: 'Grafik' }
              ].map(mode => (
                <button
                  key={mode.key}
                  onClick={() => setViewMode(mode.key)}
                  className={`px-4 py-2 rounded-lg transition-all ${
                    viewMode === mode.key
                      ? 'bg-blue-500 text-white'
                      : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                  }`}
                >
                  {mode.label}
                </button>
              ))}
            </div>

            {/* Person Filter */}
            <div className="flex gap-2">
              {[
                { key: 'both', label: 'Berdua', icon: Users },
                { key: 'him', label: 'Dia', icon: User },
                { key: 'her', label: 'Saya', icon: User }
              ].map(person => {
                const IconComponent = person.icon;
                return (
                  <button
                    key={person.key}
                    onClick={() => setSelectedPerson(person.key)}
                    className={`px-4 py-2 rounded-lg transition-all flex items-center gap-2 ${
                      selectedPerson === person.key
                        ? 'bg-purple-500 text-white'
                        : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                    }`}
                  >
                    <IconComponent size={16} />
                    {person.label}
                  </button>
                );
              })}
            </div>

            {/* Add Mood Button */}
            <button
              onClick={() => setIsAddingMood(true)}
              className="bg-gradient-to-r from-blue-500 to-purple-500 text-white px-6 py-2 rounded-lg flex items-center gap-2 hover:shadow-lg transition-all duration-300 transform hover:scale-105"
            >
              <Plus size={20} />
              Catat Mood
            </button>
          </div>
        </div>

        {/* Chart View */}
        {viewMode === 'chart' && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
            {/* Mood Distribution */}
            <div className="bg-white rounded-xl shadow-lg p-6">
              <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                <PieChart size={20} />
                Distribusi Emosi
              </h3>
              <div className="space-y-3">
                {Object.entries(stats.distribution).map(([emotion, count]) => {
                  const percentage = Math.round((count / stats.total) * 100);
                  return (
                    <div key={emotion} className="flex items-center gap-3">
                      <span className="text-2xl">{emotions[emotion].emoji}</span>
                      <div className="flex-1">
                        <div className="flex justify-between items-center mb-1">
                          <span className="text-sm font-medium">{emotions[emotion].label}</span>
                          <span className="text-sm text-gray-500">{count}x ({percentage}%)</span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2">
                          <div 
                            className="h-2 rounded-full transition-all"
                            style={{ 
                              width: `${percentage}%`,
                              backgroundColor: emotions[emotion].color 
                            }}
                          ></div>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Mood Intensity Chart */}
            <div className="bg-white rounded-xl shadow-lg p-6">
              <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                <BarChart3 size={20} />
                Intensitas Mood (7 Hari Terakhir)
              </h3>
              <div className="space-y-2">
                {filteredMoods.slice(0, 7).map((mood, index) => (
                  <div key={mood.id} className="flex items-center gap-3">
                    <span className="text-lg">{emotions[mood.emotion].emoji}</span>
                    <div className="flex-1">
                      <div className="flex justify-between items-center mb-1">
                        <span className="text-sm font-medium">{formatDate(mood.date)}</span>
                        <span className="text-sm text-gray-500">{mood.intensity}/10</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div 
                          className="h-2 rounded-full transition-all"
                          style={{ 
                            width: `${mood.intensity * 10}%`,
                            backgroundColor: emotions[mood.emotion].color 
                          }}
                        ></div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Mood Timeline */}
        {viewMode !== 'chart' && (
          <div className="space-y-4">
            <h3 className="text-xl font-semibold text-gray-800 flex items-center gap-2">
              <Activity size={20} />
              {viewMode === 'today' ? 'Mood Hari Ini' : 
               viewMode === 'week' ? 'Mood Minggu Ini' : 
               'Mood Bulan Ini'}
            </h3>

            {filteredMoods.length === 0 ? (
              <div className="bg-white rounded-xl shadow-lg p-8 text-center">
                <Meh size={48} className="mx-auto text-gray-300 mb-4" />
                <h3 className="text-lg font-semibold text-gray-600 mb-2">
                  Belum ada mood yang dicatat
                </h3>
                <p className="text-gray-500">
                  Mulai catat mood harian untuk memahami pola emosi kalian
                </p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {filteredMoods.map((mood) => {
                  const WeatherIcon = weatherIcons[mood.weather]?.icon || Sun;
                  
                  return (
                    <div
                      key={mood.id}
                      className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-all duration-300"
                      style={{ borderLeft: `4px solid ${emotions[mood.emotion].color}` }}
                    >
                      {/* Header */}
                      <div className="flex justify-between items-start mb-3">
                        <div className="flex items-center gap-2">
                          <span className="text-3xl">{emotions[mood.emotion].emoji}</span>
                          <div>
                            <h4 className="font-semibold text-gray-800">{emotions[mood.emotion].label}</h4>
                            <p className="text-sm text-gray-500">
                              {mood.person === 'him' ? 'Dia' : 'Saya'} • {mood.time}
                            </p>
                          </div>
                        </div>
                        <WeatherIcon 
                          size={16} 
                          className="text-gray-400" 
                          style={{ color: weatherIcons[mood.weather]?.color }}
                        />
                      </div>

                      {/* Intensity */}
                      <div className="mb-3">
                        <div className="flex justify-between items-center mb-1">
                          <span className="text-sm font-medium text-gray-700">Intensitas</span>
                          <span className="text-sm text-gray-500">{mood.intensity}/10</span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2">
                          <div 
                            className="h-2 rounded-full transition-all"
                            style={{ 
                              width: `${mood.intensity * 10}%`,
                              backgroundColor: emotions[mood.emotion].color 
                            }}
                          ></div>
                        </div>
                      </div>

                      {/* Note */}
                      {mood.note && (
                        <p className="text-gray-700 text-sm mb-3 italic">"{mood.note}"</p>
                      )}

                      {/* Activities & Triggers */}
                      <div className="space-y-2">
                        {mood.activities.length > 0 && (
                          <div>
                            <span className="text-xs text-gray-500 font-medium">Aktivitas:</span>
                            <div className="flex flex-wrap gap-1 mt-1">
                              {mood.activities.slice(0, 3).map(activity => (
                                <span 
                                  key={activity}
                                  className="text-xs bg-blue-100 text-blue-700 px-2 py-1 rounded-full"
                                >
                                  {activities[activity]}
                                </span>
                              ))}
                              {mood.activities.length > 3 && (
                                <span className="text-xs text-gray-500">+{mood.activities.length - 3}</span>
                              )}
                            </div>
                          </div>
                        )}

                        {mood.triggers.length > 0 && (
                          <div>
                            <span className="text-xs text-gray-500 font-medium">Pemicu:</span>
                            <div className="flex flex-wrap gap-1 mt-1">
                              {mood.triggers.slice(0, 2).map(trigger => (
                                <span 
                                  key={trigger}
                                  className="text-xs bg-purple-100 text-purple-700 px-2 py-1 rounded-full"
                                >
                                  {triggers[trigger]}
                                </span>
                              ))}
                              {mood.triggers.length > 2 && (
                                <span className="text-xs text-gray-500">+{mood.triggers.length - 2}</span>
                              )}
                            </div>
                          </div>
                        )}
                      </div>

                      {/* Date */}
                      <div className="mt-3 pt-3 border-t border-gray-100">
                        <span className="text-xs text-gray-500">{formatDate(mood.date)}</span>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        )}

        {/* Add Mood Modal */}
        {isAddingMood && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
              <div className="p-6">
                <h2 className="text-xl font-bold mb-6">Catat Mood Saat Ini</h2>
                
                {/* Person Selection */}
                <div className="mb-6">
                  <label className="block text-sm font-medium text-gray-700 mb-2">Siapa yang merasa?</label>
                  <div className="flex gap-3">
                    {[
                      { key: 'him', label: 'Dia' },
                      { key: 'her', label: 'Saya' }
                    ].map(person => (
                      <button
                        key={person.key}
                        onClick={() => setNewMood({...newMood, person: person.key})}
                        className={`flex-1 py-3 px-4 rounded-lg border-2 transition-all ${
                          newMood.person === person.key
                            ? 'border-blue-500 bg-blue-50 text-blue-700'
                            : 'border-gray-200 hover:border-gray-300'
                        }`}
                      >
                        {person.label}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Emotion Selection */}
                <div className="mb-6">
                  <label className="block text-sm font-medium text-gray-700 mb-3">Emosi yang dirasakan</label>
                  <div className="grid grid-cols-3 md:grid-cols-4 gap-3">
                    {Object.entries(emotions).map(([key, emotion]) => (
                      <button
                        key={key}
                        onClick={() => setNewMood({...newMood, emotion: key})}
                        className={`p-3 rounded-lg border-2 transition-all text-center ${
                          newMood.emotion === key
                            ? 'border-blue-500 bg-blue-50'
                            : 'border-gray-200 hover:border-gray-300'
                        }`}
                      >
                        <div className="text-2xl mb-1">{emotion.emoji}</div>
                        <div className="text-xs font-medium">{emotion.label}</div>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Intensity Slider */}
                <div className="mb-6">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Intensitas: {newMood.intensity}/10
                  </label>
                  <input
                    type="range"
                    min="1"
                    max="10"
                    value={newMood.intensity}
                    onChange={(e) => setNewMood({...newMood, intensity: parseInt(e.target.value)})}
                    className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
                    style={{
                      background: `linear-gradient(to right, ${emotions[newMood.emotion].color} 0%, ${emotions[newMood.emotion].color} ${newMood.intensity * 10}%, #e5e7eb ${newMood.intensity * 10}%, #e5e7eb 100%)`
                    }}
                  />
                  <div className="flex justify-between text-xs text-gray-500 mt-1">
                    <span>Sangat Rendah</span>
                    <span>Sedang</span>
                    <span>Sangat Tinggi</span>
                  </div>
                </div>

                {/* Note */}
                <div className="mb-6">
                  <label className="block text-sm font-medium text-gray-700 mb-2">Catatan (opsional)</label>
                  <textarea
                    placeholder="Ceritakan apa yang kamu rasakan atau apa yang terjadi..."
                    value={newMood.note}
                    onChange={(e) => setNewMood({...newMood, note: e.target.value})}
                    rows={3}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>

                {/* Activities */}
                <div className="mb-6">
                  <label className="block text-sm font-medium text-gray-700 mb-2">Aktivitas saat ini</label>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-2 max-h-32 overflow-y-auto">
                    {Object.entries(activities).map(([key, label]) => (
                      <button
                        key={key}
                        onClick={() => {
                          const newActivities = newMood.activities.includes(key)
                            ? newMood.activities.filter(a => a !== key)
                            : [...newMood.activities, key];
                          setNewMood({...newMood, activities: newActivities});
                        }}
                        className={`p-2 text-xs rounded-lg border transition-all ${
                          newMood.activities.includes(key)
                            ? 'border-green-500 bg-green-50 text-green-700'
                            : 'border-gray-200 hover:border-gray-300'
                        }`}
                      >
                        {label}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Triggers */}
                <div className="mb-6">
                  <label className="block text-sm font-medium text-gray-700 mb-2">Pemicu perasaan ini</label>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-2 max-h-32 overflow-y-auto">
                    {Object.entries(triggers).map(([key, label]) => (
                      <button
                        key={key}
                        onClick={() => {
                          const newTriggers = newMood.triggers.includes(key)
                            ? newMood.triggers.filter(t => t !== key)
                            : [...newMood.triggers, key];
                          setNewMood({...newMood, triggers: newTriggers});
                        }}
                        className={`p-2 text-xs rounded-lg border transition-all text-left ${
                          newMood.triggers.includes(key)
                            ? 'border-purple-500 bg-purple-50 text-purple-700'
                            : 'border-gray-200 hover:border-gray-300'
                        }`}
                      >
                        {label}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Actions */}
                <div className="flex gap-3">
                  <button
                    onClick={resetForm}
                    className="flex-1 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
                  >
                    Batal
                  </button>
                  <button
                    onClick={addMood}
                    disabled={!newMood.emotion || !newMood.intensity}
                    className={`flex-1 px-4 py-2 rounded-lg transition-all ${
                      newMood.emotion && newMood.intensity
                        ? 'bg-gradient-to-r from-blue-500 to-purple-500 text-white hover:shadow-lg'
                        : 'bg-gray-200 text-gray-400 cursor-not-allowed'
                    }`}
                  >
                    Simpan Mood
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Insights Section */}
        {filteredMoods.length > 0 && (
          <div className="mt-8 bg-white rounded-xl shadow-lg p-6">
            <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
              <Target size={20} />
              Insights & Rekomendasi
            </h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Mood Patterns */}
              <div>
                <h4 className="font-medium text-gray-800 mb-3">Pola Mood</h4>
                <div className="space-y-2 text-sm">
                  {stats.average >= 7 && (
                    <div className="flex items-center gap-2 text-green-600">
                      <span>✅</span>
                      <span>Mood kalian secara keseluruhan sangat positif!</span>
                    </div>
                  )}
                  {stats.average < 5 && (
                    <div className="flex items-center gap-2 text-yellow-600">
                      <span>⚠️</span>
                      <span>Mungkin kalian perlu lebih banyak quality time bersama</span>
                    </div>
                  )}
                  {trend === 'improving' && (
                    <div className="flex items-center gap-2 text-green-600">
                      <span>📈</span>
                      <span>Mood kalian terus membaik! Keep it up!</span>
                    </div>
                  )}
                  {trend === 'declining' && (
                    <div className="flex items-center gap-2 text-red-600">
                      <span>📉</span>
                      <span>Ada yang mengganggu mood kalian? Coba bicarakan bersama</span>
                    </div>
                  )}
                </div>
              </div>

              {/* Recommendations */}
              <div>
                <h4 className="font-medium text-gray-800 mb-3">Rekomendasi</h4>
                <div className="space-y-2 text-sm text-gray-600">
                  <div>💡 Catat mood setidaknya sekali sehari untuk pola yang lebih akurat</div>
                  <div>💝 Berbagi perasaan positif dapat memperkuat hubungan</div>
                  <div>🗣️ Komunikasi terbuka saat mood sedang tidak baik</div>
                  <div>📱 Gunakan fitur ini sebagai starting point untuk diskusi</div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Quick Mood Buttons (for easy access) */}
        <div className="fixed bottom-6 right-6 z-40">
          <div className="bg-white rounded-full shadow-lg p-2 flex gap-2">
            {['happy', 'loved', 'anxious', 'sad'].map(emotion => (
              <button
                key={emotion}
                onClick={() => {
                  setNewMood({
                    ...newMood,
                    emotion,
                    person: 'him' // default
                  });
                  setIsAddingMood(true);
                }}
                className="w-12 h-12 rounded-full bg-gray-50 hover:bg-gray-100 flex items-center justify-center transition-all hover:scale-110"
                title={`Quick add: ${emotions[emotion].label}`}
              >
                <span className="text-xl">{emotions[emotion].emoji}</span>
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MoodTracker;