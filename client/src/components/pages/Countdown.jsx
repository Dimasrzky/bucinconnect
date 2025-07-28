import React, { useState, useEffect } from 'react';
import { Clock, Calendar, Heart, Gift, Plus, Edit, Trash2, Bell, Star, Cake } from 'lucide-react';

const Countdown = () => {
  const [countdowns, setCountdowns] = useState([]);
  const [currentTime, setCurrentTime] = useState(new Date());
  const [isAddingCountdown, setIsAddingCountdown] = useState(false);
  const [editingCountdown, setEditingCountdown] = useState(null);
  const [newCountdown, setNewCountdown] = useState({
    title: '',
    date: '',
    description: '',
    category: 'anniversary',
    color: '#ff6b6b',
    isRecurring: false,
    recurringType: 'yearly'
  });

  // Update current time every second
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  // Sample initial data
  useEffect(() => {
    const sampleCountdowns = [
      {
        id: 1,
        title: 'Anniversary 1 Tahun',
        date: '2025-02-14',
        description: 'Satu tahun perjalanan cinta kita! 💕',
        category: 'anniversary',
        color: '#ff6b6b',
        isRecurring: true,
        recurringType: 'yearly'
      },
      {
        id: 2,
        title: 'Ulang Tahun Sayang',
        date: '2025-09-15',
        description: 'Hari spesial untukmu tersayang 🎂',
        category: 'birthday',
        color: '#4ecdc4',
        isRecurring: true,
        recurringType: 'yearly'
      },
      {
        id: 3,
        title: 'Trip ke Bali',
        date: '2025-12-25',
        description: 'Liburan romantis ke Pulau Dewata 🏖️',
        category: 'trip',
        color: '#45b7d1',
        isRecurring: false,
        recurringType: 'none'
      },
      {
        id: 4,
        title: 'Valentine Day',
        date: '2025-02-14',
        description: 'Hari kasih sayang sedunia 💝',
        category: 'special',
        color: '#e74c3c',
        isRecurring: true,
        recurringType: 'yearly'
      },
      {
        id: 5,
        title: 'Anniversary 6 Bulan',
        date: '2025-08-14',
        description: 'Setengah tahun kebahagiaan bersama',
        category: 'anniversary',
        color: '#f39c12',
        isRecurring: true,
        recurringType: 'half-yearly'
      }
    ];
    setCountdowns(sampleCountdowns);
  }, []);

  const categoryIcons = {
    anniversary: Heart,
    birthday: Cake,
    trip: Star,
    special: Gift,
    reminder: Bell
  };

  const categoryColors = {
    anniversary: '#ff6b6b',
    birthday: '#4ecdc4',
    trip: '#45b7d1',
    special: '#e74c3c',
    reminder: '#9b59b6'
  };

  const calculateTimeRemaining = (targetDate) => {
    const target = new Date(targetDate);
    const now = currentTime;
    const difference = target.getTime() - now.getTime();

    if (difference > 0) {
      const days = Math.floor(difference / (1000 * 60 * 60 * 24));
      const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((difference % (1000 * 60)) / 1000);

      return { days, hours, minutes, seconds, isExpired: false };
    } else {
      return { days: 0, hours: 0, minutes: 0, seconds: 0, isExpired: true };
    }
  };

  const getNextOccurrence = (countdown) => {
    const eventDate = new Date(countdown.date);
    const now = new Date();
    
    if (!countdown.isRecurring) {
      return eventDate;
    }

    let nextDate = new Date(eventDate);
    
    if (countdown.recurringType === 'yearly') {
      nextDate.setFullYear(now.getFullYear());
      if (nextDate < now) {
        nextDate.setFullYear(now.getFullYear() + 1);
      }
    } else if (countdown.recurringType === 'half-yearly') {
      // Find next 6-month occurrence
      while (nextDate < now) {
        nextDate.setMonth(nextDate.getMonth() + 6);
      }
    }
    
    return nextDate;
  };

  const handleAddCountdown = () => {
    if (newCountdown.title && newCountdown.date) {
      const countdown = {
        ...newCountdown,
        id: Date.now(),
        color: categoryColors[newCountdown.category]
      };
      setCountdowns([...countdowns, countdown]);
      resetForm();
    }
  };

  const handleEditCountdown = (countdown) => {
    setEditingCountdown(countdown);
    setNewCountdown(countdown);
  };

  const handleUpdateCountdown = () => {
    setCountdowns(countdowns.map(countdown => 
      countdown.id === editingCountdown.id 
        ? { ...newCountdown, color: categoryColors[newCountdown.category] }
        : countdown
    ));
    setEditingCountdown(null);
    resetForm();
  };

  const handleDeleteCountdown = (countdownId) => {
    setCountdowns(countdowns.filter(countdown => countdown.id !== countdownId));
  };

  const resetForm = () => {
    setNewCountdown({
      title: '',
      date: '',
      description: '',
      category: 'anniversary',
      color: '#ff6b6b',
      isRecurring: false,
      recurringType: 'yearly'
    });
    setIsAddingCountdown(false);
  };

  const formatDate = (date) => {
    return new Date(date).toLocaleDateString('id-ID', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const sortedCountdowns = countdowns
    .map(countdown => ({
      ...countdown,
      nextDate: getNextOccurrence(countdown),
      timeRemaining: calculateTimeRemaining(getNextOccurrence(countdown))
    }))
    .sort((a, b) => a.nextDate - b.nextDate);

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-red-50 p-6">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent mb-2">
            Countdown Special Days ⏰
          </h1>
          <p className="text-gray-600 text-lg">
            Jangan sampai terlewat momen-momen istimewa kita
          </p>
        </div>

        {/* Current Time Display */}
        <div className="text-center mb-8">
          <div className="bg-white rounded-xl shadow-lg p-6 inline-block">
            <div className="text-gray-500 text-sm mb-2">Waktu Sekarang</div>
            <div className="text-2xl font-bold text-gray-800">
              {currentTime.toLocaleTimeString('id-ID')}
            </div>
            <div className="text-gray-600">
              {formatDate(currentTime)}
            </div>
          </div>
        </div>

        {/* Add Countdown Button */}
        <div className="flex justify-center mb-8">
          <button
            onClick={() => setIsAddingCountdown(true)}
            className="bg-gradient-to-r from-purple-500 to-pink-500 text-white px-6 py-3 rounded-full flex items-center gap-2 hover:shadow-lg transition-all duration-300 transform hover:scale-105"
          >
            <Plus size={20} />
            Tambah Countdown Baru
          </button>
        </div>

        {/* Countdowns Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          {sortedCountdowns.map((countdown) => {
            const IconComponent = categoryIcons[countdown.category] || Heart;
            const timeLeft = countdown.timeRemaining;

            return (
              <div
                key={countdown.id}
                className={`bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 transform hover:scale-105 ${
                  timeLeft.isExpired ? 'opacity-75' : ''
                }`}
                style={{ borderTop: `4px solid ${countdown.color}` }}
              >
                {/* Header */}
                <div className="p-4 bg-gradient-to-r from-gray-50 to-white">
                  <div className="flex justify-between items-start">
                    <div className="flex items-center gap-3">
                      <div
                        className="w-10 h-10 rounded-full flex items-center justify-center text-white"
                        style={{ backgroundColor: countdown.color }}
                      >
                        <IconComponent size={20} />
                      </div>
                      <div>
                        <h3 className="text-lg font-bold text-gray-800">{countdown.title}</h3>
                        <p className="text-sm text-gray-500">
                          {formatDate(countdown.nextDate)}
                        </p>
                      </div>
                    </div>
                    <div className="flex gap-1">
                      <button
                        onClick={() => handleEditCountdown(countdown)}
                        className="text-blue-500 hover:text-blue-700 transition-colors p-1"
                      >
                        <Edit size={16} />
                      </button>
                      <button
                        onClick={() => handleDeleteCountdown(countdown.id)}
                        className="text-red-500 hover:text-red-700 transition-colors p-1"
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </div>
                </div>

                {/* Countdown Display */}
                <div className="p-6">
                  {timeLeft.isExpired ? (
                    <div className="text-center">
                      <div className="text-2xl font-bold text-gray-400 mb-2">
                        Event Telah Berlalu
                      </div>
                      <div className="text-sm text-gray-500">
                        {countdown.isRecurring ? 'Menunggu kejadian berikutnya...' : 'Event selesai'}
                      </div>
                    </div>
                  ) : (
                    <div className="grid grid-cols-2 gap-3 mb-4">
                      <div className="text-center">
                        <div className="text-2xl font-bold" style={{ color: countdown.color }}>
                          {timeLeft.days}
                        </div>
                        <div className="text-xs text-gray-500">Hari</div>
                      </div>
                      <div className="text-center">
                        <div className="text-2xl font-bold" style={{ color: countdown.color }}>
                          {timeLeft.hours}
                        </div>
                        <div className="text-xs text-gray-500">Jam</div>
                      </div>
                      <div className="text-center">
                        <div className="text-2xl font-bold" style={{ color: countdown.color }}>
                          {timeLeft.minutes}
                        </div>
                        <div className="text-xs text-gray-500">Menit</div>
                      </div>
                      <div className="text-center">
                        <div className="text-2xl font-bold" style={{ color: countdown.color }}>
                          {timeLeft.seconds}
                        </div>
                        <div className="text-xs text-gray-500">Detik</div>
                      </div>
                    </div>
                  )}

                  {countdown.description && (
                    <p className="text-gray-600 text-sm text-center mb-3">
                      {countdown.description}
                    </p>
                  )}

                  {countdown.isRecurring && (
                    <div className="text-center">
                      <span className="inline-block bg-gray-100 text-gray-600 text-xs px-2 py-1 rounded-full">
                        🔄 Berulang {countdown.recurringType === 'yearly' ? 'Tahunan' : 'Setengah Tahun'}
                      </span>
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>

        {/* Add/Edit Modal */}
        {(isAddingCountdown || editingCountdown) && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-xl max-w-md w-full max-h-[90vh] overflow-y-auto">
              <div className="p-6">
                <h2 className="text-xl font-bold mb-4">
                  {editingCountdown ? 'Edit Countdown' : 'Tambah Countdown Baru'}
                </h2>
                
                <div className="space-y-4">
                  <input
                    type="text"
                    placeholder="Nama event"
                    value={newCountdown.title}
                    onChange={(e) => setNewCountdown({...newCountdown, title: e.target.value})}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  />
                  
                  <input
                    type="date"
                    value={newCountdown.date}
                    onChange={(e) => setNewCountdown({...newCountdown, date: e.target.value})}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  />
                  
                  <select
                    value={newCountdown.category}
                    onChange={(e) => setNewCountdown({...newCountdown, category: e.target.value})}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  >
                    <option value="anniversary">Anniversary</option>
                    <option value="birthday">Ulang Tahun</option>
                    <option value="trip">Perjalanan</option>
                    <option value="special">Hari Spesial</option>
                    <option value="reminder">Pengingat</option>
                  </select>

                  <div className="flex items-center gap-3">
                    <input
                      type="checkbox"
                      id="isRecurring"
                      checked={newCountdown.isRecurring}
                      onChange={(e) => setNewCountdown({...newCountdown, isRecurring: e.target.checked})}
                      className="w-4 h-4 text-purple-600 border-gray-300 rounded focus:ring-purple-500"
                    />
                    <label htmlFor="isRecurring" className="text-gray-700">
                      Event berulang
                    </label>
                  </div>

                  {newCountdown.isRecurring && (
                    <select
                      value={newCountdown.recurringType}
                      onChange={(e) => setNewCountdown({...newCountdown, recurringType: e.target.value})}
                      className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                    >
                      <option value="yearly">Setiap Tahun</option>
                      <option value="half-yearly">Setiap 6 Bulan</option>
                    </select>
                  )}
                  
                  <textarea
                    placeholder="Deskripsi (opsional)"
                    value={newCountdown.description}
                    onChange={(e) => setNewCountdown({...newCountdown, description: e.target.value})}
                    rows={3}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  />
                </div>
                
                <div className="flex gap-3 mt-6">
                  <button
                    onClick={() => {
                      setIsAddingCountdown(false);
                      setEditingCountdown(null);
                      resetForm();
                    }}
                    className="flex-1 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
                  >
                    Batal
                  </button>
                  <button
                    onClick={editingCountdown ? handleUpdateCountdown : handleAddCountdown}
                    className="flex-1 px-4 py-2 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-lg hover:shadow-lg transition-all"
                  >
                    {editingCountdown ? 'Update' : 'Simpan'}
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-white rounded-xl p-4 shadow-lg text-center">
            <div className="text-2xl font-bold text-purple-600">
              {sortedCountdowns.filter(c => !c.timeRemaining.isExpired).length}
            </div>
            <div className="text-gray-600 text-sm">Event Mendatang</div>
          </div>
          <div className="bg-white rounded-xl p-4 shadow-lg text-center">
            <div className="text-2xl font-bold text-pink-600">
              {sortedCountdowns.filter(c => c.timeRemaining.days <= 7 && !c.timeRemaining.isExpired).length}
            </div>
            <div className="text-gray-600 text-sm">Minggu Ini</div>
          </div>
          <div className="bg-white rounded-xl p-4 shadow-lg text-center">
            <div className="text-2xl font-bold text-red-600">
              {sortedCountdowns.filter(c => c.timeRemaining.days <= 1 && !c.timeRemaining.isExpired).length}
            </div>
            <div className="text-gray-600 text-sm">Besok/Hari Ini</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Countdown;