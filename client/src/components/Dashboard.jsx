import React, { useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Heart, Calendar, Music, Camera, Users, Star, Gift, Clock, 
  Gamepad2, Archive, Plus, TrendingUp, User, Menu, X,
  ChevronRight, Sparkles, BarChart3, MessageCircle
} from 'lucide-react';
import { AuthContext } from '../App';
import Sidebar from './layout/Sidebar'; // Import Sidebar component

const Dashboard = () => {
  const navigate = useNavigate();
  const { user } = useContext(AuthContext);
  
  // Sidebar states
  const [sidebarOpen, setSidebarOpen] = useState(false); // Mobile sidebar
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false); // Desktop collapse
  
  const [stats, setStats] = useState({
    memories: 42,
    upcomingEvents: 3,
    completedWishes: 8,
    moodScore: 8.5
  });

  // Handle window resize untuk menutup sidebar otomatis di desktop
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1024) {
        setSidebarOpen(false); // Tutup mobile sidebar di desktop
      }
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const calculateRelationshipDays = () => {
    if (user?.relationshipStartDate) {
      const startDate = new Date(user.relationshipStartDate);
      const today = new Date();
      const diffTime = Math.abs(today - startDate);
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
      return diffDays;
    }
    return 847;
  };

  const [userInfo, setUserInfo] = useState({
    name: 'Sarah',
    partnerName: 'David',
    relationshipDays: 847,
    profilePic: null
  });

  useEffect(() => {
    if (user) {
      setUserInfo({
        name: user.name || 'User',
        partnerName: user.partnerName || 'Partner',
        relationshipDays: calculateRelationshipDays(),
        profilePic: user.profilePicture || null
      });
    }
  }, [user]);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const token = localStorage.getItem('authToken');
        if (!token) return;

        const endpoints = [
          '/api/timeline',
          '/api/countdown',
          '/api/wishlist',
          '/api/mood'
        ];

        const results = await Promise.all(
          endpoints.map(async (endpoint) => {
            try {
              const response = await fetch(`http://localhost:5000${endpoint}`, {
                headers: {
                  'Authorization': `Bearer ${token}`
                }
              });
              return response.ok ? await response.json() : [];
            } catch (error) {
              console.log(`Failed to fetch ${endpoint}:`, error.message);
              return [];
            }
          })
        );

        const [timeline, countdowns, wishlist, moods] = results;

        const completedWishes = wishlist.filter(item => item.isCompleted).length;
        const upcomingEvents = countdowns.filter(item => !item.isCompleted).length;
        const avgMoodScore = moods.length > 0 
          ? moods.reduce((sum, mood) => sum + ((mood.userMoodScore + mood.partnerMoodScore) / 2), 0) / moods.length
          : 8.5;

        setStats({
          memories: timeline.length,
          upcomingEvents,
          completedWishes,
          moodScore: Math.round(avgMoodScore * 10) / 10
        });

      } catch (error) {
        console.error('Error fetching stats:', error);
      }
    };

    fetchStats();
  }, []);

  const quickActions = [
    { 
      icon: <Plus className="w-5 h-5" />, 
      label: "Tambah Kenangan", 
      action: () => navigate('/timeline'),
      color: "from-blue-500 to-blue-600"
    },
    { 
      icon: <Calendar className="w-5 h-5" />, 
      label: "Buat Event", 
      action: () => navigate('/countdown'),
      color: "from-pink-500 to-pink-600"
    },
    { 
      icon: <Heart className="w-5 h-5" />, 
      label: "Catat Mood", 
      action: () => navigate('/mood-tracker'),
      color: "from-red-500 to-red-600"
    },
    { 
      icon: <Camera className="w-5 h-5" />, 
      label: "Upload Foto", 
      action: () => navigate('/timeline'),
      color: "from-green-500 to-green-600"
    }
  ];

  const recentActivities = [
    { 
      type: "memory", 
      text: "Menambahkan kenangan 'Dinner romantis di rooftop'", 
      time: "2 jam lalu", 
      icon: <Heart className="w-4 h-4" />,
      color: "from-pink-100 to-pink-200"
    },
    { 
      type: "mood", 
      text: "Mood hari ini: Bahagia ❤️", 
      time: "5 jam lalu", 
      icon: <TrendingUp className="w-4 h-4" />,
      color: "from-green-100 to-green-200"
    },
    { 
      type: "wishlist", 
      text: "Menyelesaikan wish 'Belajar memasak pasta'", 
      time: "1 hari lalu", 
      icon: <Gift className="w-4 h-4" />,
      color: "from-purple-100 to-purple-200"
    },
    { 
      type: "music", 
      text: "Menambahkan lagu 'Perfect' ke playlist", 
      time: "2 hari lalu", 
      icon: <Music className="w-4 h-4" />,
      color: "from-blue-100 to-blue-200"
    }
  ];

  const handleQuickAction = (action) => {
    if (typeof action === 'function') {
      action();
    }
  };

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  const toggleSidebarCollapse = () => {
    setSidebarCollapsed(!sidebarCollapsed);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-pink-50 to-purple-50 flex overflow-hidden">
      {/* Sidebar Component dengan props untuk collapse */}
      <Sidebar 
        isOpen={sidebarOpen} 
        onToggle={toggleSidebar}
        isCollapsed={sidebarCollapsed}
        onCollapse={toggleSidebarCollapse}
      />

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0 max-h-screen overflow-hidden">
        {/* Header */}
        <header className="bg-white shadow-sm border-b border-gray-100 flex-shrink-0 z-30">
          <div className="flex items-center justify-between px-6 py-4">
            <div className="flex items-center space-x-4">
              <button
                onClick={toggleSidebar}
                className="p-2 rounded-lg hover:bg-gray-100 transition-colors lg:hidden"
              >
                <Menu className="w-6 h-6" />
              </button>
              <div>
                <h2 className="text-2xl font-bold text-gray-800">
                  Dashboard
                </h2>
                <p className="text-gray-600">
                  Selamat datang kembali, {userInfo.name}! 💕
                </p>
              </div>
            </div>
            
            <div className="flex items-center space-x-4">
              <button className="p-2 rounded-lg hover:bg-gray-100 relative transition-colors">
                <MessageCircle className="w-6 h-6 text-gray-600" />
                <span className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full animate-pulse"></span>
              </button>
              <div className="w-10 h-10 bg-gradient-to-r from-pink-400 to-blue-400 rounded-full flex items-center justify-center">
                {userInfo.profilePic ? (
                  <img 
                    src={userInfo.profilePic} 
                    alt="Profile" 
                    className="w-full h-full rounded-full object-cover"
                  />
                ) : (
                  <User className="w-6 h-6 text-white" />
                )}
              </div>
            </div>
          </div>
        </header>

        {/* Content - dengan tinggi yang disesuaikan dan single scroll */}
        <main className="p-6 flex-1 overflow-y-auto main-scroll"
              style={{ height: 'calc(100vh - 80px)' }}>
          {/* Welcome Section */}
          <div className="bg-gradient-to-r from-pink-500 to-blue-500 rounded-2xl p-8 text-white mb-8 relative overflow-hidden">
            <div className="relative z-10">
              <div className="flex items-center justify-between">
                <div>
                  <h1 className="text-3xl font-bold mb-2">
                    {userInfo.name} & {userInfo.partnerName}
                  </h1>
                  <p className="text-pink-100 text-lg">
                    💕 {userInfo.relationshipDays} hari bersama
                  </p>
                  <p className="text-pink-200 text-sm mt-1">
                    Setiap hari adalah petualangan cinta yang baru ✨
                  </p>
                </div>
                <div className="text-6xl opacity-80">
                  💖
                </div>
              </div>
            </div>
            <div className="absolute top-0 right-0 w-40 h-40 bg-white opacity-10 rounded-full -translate-y-20 translate-x-20"></div>
            <div className="absolute bottom-0 left-0 w-32 h-32 bg-white opacity-10 rounded-full translate-y-16 -translate-x-16"></div>
          </div>

          {/* Stats Overview */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 hover:shadow-lg transition-shadow">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-600 text-sm">Total Kenangan</p>
                  <p className="text-3xl font-bold text-blue-600">{stats.memories}</p>
                  <p className="text-blue-500 text-xs mt-1">Momen terdokumentasi</p>
                </div>
                <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center">
                  <Clock className="w-6 h-6 text-blue-600" />
                </div>
              </div>
            </div>

            <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 hover:shadow-lg transition-shadow">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-600 text-sm">Event Mendatang</p>
                  <p className="text-3xl font-bold text-pink-600">{stats.upcomingEvents}</p>
                  <p className="text-pink-500 text-xs mt-1">Hari spesial menunggu</p>
                </div>
                <div className="w-12 h-12 bg-pink-100 rounded-xl flex items-center justify-center">
                  <Calendar className="w-6 h-6 text-pink-600" />
                </div>
              </div>
            </div>

            <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 hover:shadow-lg transition-shadow">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-600 text-sm">Wish Terwujud</p>
                  <p className="text-3xl font-bold text-purple-600">{stats.completedWishes}</p>
                  <p className="text-purple-500 text-xs mt-1">Impian jadi kenyataan</p>
                </div>
                <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center">
                  <Gift className="w-6 h-6 text-purple-600" />
                </div>
              </div>
            </div>

            <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 hover:shadow-lg transition-shadow">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-600 text-sm">Mood Score</p>
                  <p className="text-3xl font-bold text-green-600">{stats.moodScore}/10</p>
                  <p className="text-green-500 text-xs mt-1">Tingkat kebahagiaan</p>
                </div>
                <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center">
                  <TrendingUp className="w-6 h-6 text-green-600" />
                </div>
              </div>
            </div>
          </div>

          {/* Quick Actions */}
          <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 mb-8">
            <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
              <Sparkles className="w-5 h-5 mr-2 text-purple-500" />
              Quick Actions
            </h3>
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
              {quickActions.map((action, index) => (
                <button
                  key={index}
                  onClick={() => handleQuickAction(action.action)}
                  className="group flex flex-col items-center p-4 rounded-xl border-2 border-gray-100 hover:border-pink-200 hover:bg-pink-50 transition-all transform hover:scale-105"
                >
                  <div className={`w-12 h-12 bg-gradient-to-r ${action.color} rounded-xl flex items-center justify-center mb-3 text-white group-hover:shadow-lg transition-shadow`}>
                    {action.icon}
                  </div>
                  <span className="text-sm font-medium text-gray-700 text-center">{action.label}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Rest of Dashboard content dengan spacing yang disesuaikan */}
          <div className="grid lg:grid-cols-2 gap-6 mb-6">
            {/* Recent Activities */}
            <div className="space-y-6">
              <h3 className="text-lg font-semibold text-gray-800 flex items-center">
                <Clock className="w-5 h-5 mr-2 text-blue-500" />
                Aktivitas Terbaru
              </h3>
              <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
                <div className="space-y-4">
                  {recentActivities.map((activity, index) => (
                    <div key={index} className="flex items-start space-x-3 p-3 rounded-xl hover:bg-gray-50 transition-colors">
                      <div className={`w-8 h-8 bg-gradient-to-r ${activity.color} rounded-lg flex items-center justify-center flex-shrink-0`}>
                        {activity.icon}
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm text-gray-700 font-medium">
                          {activity.text}
                        </p>
                        <p className="text-xs text-gray-500 mt-1">
                          {activity.time}
                        </p>
                      </div>
                      <button className="text-gray-400 hover:text-gray-600 transition-colors">
                        <ChevronRight className="w-4 h-4" />
                      </button>
                    </div>
                  ))}
                </div>
                <div className="mt-4 text-center">
                  <button className="text-sm text-blue-600 hover:text-blue-700 font-medium transition-colors">
                    Lihat Semua Aktivitas →
                  </button>
                </div>
              </div>
            </div>

            {/* Next Event Countdown */}
            <div className="space-y-6">
              <h3 className="text-lg font-semibold text-gray-800 flex items-center">
                <Calendar className="w-5 h-5 mr-2 text-pink-500" />
                Event Mendatang
              </h3>
              <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
                <div className="text-center">
                  <div className="w-16 h-16 bg-gradient-to-r from-pink-500 to-purple-500 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Gift className="w-8 h-8 text-white" />
                  </div>
                  <h4 className="text-lg font-semibold text-gray-800 mb-2">
                    Anniversary 3 Tahun
                  </h4>
                  <p className="text-gray-600 text-sm mb-4">
                    Perayaan cinta yang tak terlupakan
                  </p>
                  
                  {/* Countdown */}
                  <div className="grid grid-cols-4 gap-2 mb-6">
                    <div className="bg-gray-50 rounded-lg p-3">
                      <div className="text-2xl font-bold text-pink-600">15</div>
                      <div className="text-xs text-gray-600">Hari</div>
                    </div>
                    <div className="bg-gray-50 rounded-lg p-3">
                      <div className="text-2xl font-bold text-pink-600">08</div>
                      <div className="text-xs text-gray-600">Jam</div>
                    </div>
                    <div className="bg-gray-50 rounded-lg p-3">
                      <div className="text-2xl font-bold text-pink-600">23</div>
                      <div className="text-xs text-gray-600">Menit</div>
                    </div>
                    <div className="bg-gray-50 rounded-lg p-3">
                      <div className="text-2xl font-bold text-pink-600">45</div>
                      <div className="text-xs text-gray-600">Detik</div>
                    </div>
                  </div>
                  
                  <button 
                    onClick={() => navigate('/countdown')}
                    className="w-full bg-gradient-to-r from-pink-500 to-purple-500 text-white py-3 px-4 rounded-xl font-medium hover:shadow-lg transition-all transform hover:scale-105"
                  >
                    Lihat Detail Event
                  </button>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default Dashboard;