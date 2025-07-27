import React, { useState, useEffect } from 'react';
import { 
  Heart, Calendar, Music, Camera, Users, Star, Gift, Clock, 
  Gamepad2, Archive, Plus, TrendingUp, User, LogOut, Menu, X,
  ChevronRight, Sparkles, BarChart3, MessageCircle
} from 'lucide-react';

const Dashboard = () => {
  const [user, setUser] = useState({
    name: 'Sarah',
    partnerName: 'David',
    relationshipDays: 847,
    profilePic: null
  });
  
  const [activeSection, setActiveSection] = useState('overview');
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [stats, setStats] = useState({
    memories: 42,
    upcomingEvents: 3,
    completedWishes: 8,
    moodScore: 8.5
  });

  const features = [
    {
      id: 'timeline',
      icon: <Clock className="w-6 h-6" />,
      title: "Timeline Hubungan",
      subtitle: "Memory Lane",
      description: "Catat setiap momen berharga",
      color: "from-blue-500 to-blue-600",
      bgColor: "bg-blue-50",
      count: stats.memories,
      countLabel: "kenangan tersimpan"
    },
    {
      id: 'countdown',
      icon: <Calendar className="w-6 h-6" />,
      title: "Countdown Special",
      subtitle: "Hari Istimewa",
      description: "Hitung mundur ke moment penting",
      color: "from-pink-500 to-pink-600",
      bgColor: "bg-pink-50",
      count: stats.upcomingEvents,
      countLabel: "event mendatang"
    },
    {
      id: 'wishlist',
      icon: <Gift className="w-6 h-6" />,
      title: "Wishlist Berdua",
      subtitle: "Bucket List",
      description: "Impian yang ingin dicapai bersama",
      color: "from-purple-500 to-purple-600",
      bgColor: "bg-purple-50",
      count: stats.completedWishes,
      countLabel: "wish terwujud"
    },
    {
      id: 'quiz',
      icon: <Users className="w-6 h-6" />,
      title: "Quiz Pasangan",
      subtitle: "Saling Mengenal",
      description: "Uji seberapa baik kalian saling mengenal",
      color: "from-indigo-500 to-indigo-600",
      bgColor: "bg-indigo-50",
      count: "95%",
      countLabel: "compatibility score"
    },
    {
      id: 'mood',
      icon: <TrendingUp className="w-6 h-6" />,
      title: "Mood Tracker",
      subtitle: "Perasaan Harian",
      description: "Pantau kebahagiaan kalian",
      color: "from-green-500 to-green-600",
      bgColor: "bg-green-50",
      count: stats.moodScore,
      countLabel: "rata-rata mood"
    },
    {
      id: 'music',
      icon: <Music className="w-6 h-6" />,
      title: "Galeri Musik",
      subtitle: "Soundtrack Cinta",
      description: "Lagu-lagu yang bercerita",
      color: "from-red-500 to-red-600",
      bgColor: "bg-red-50",
      count: "27",
      countLabel: "lagu favorit"
    },
    {
      id: 'games',
      icon: <Gamepad2 className="w-6 h-6" />,
      title: "Game Kenangan",
      subtitle: "Bermain Bersama",
      description: "Game interaktif berisi memori",
      color: "from-yellow-500 to-yellow-600",
      bgColor: "bg-yellow-50",
      count: "12",
      countLabel: "game tersedia"
    },
    {
      id: 'timecapsule',
      icon: <Archive className="w-6 h-6" />,
      title: "Time Capsule",
      subtitle: "Pesan Masa Depan",
      description: "Simpan untuk dibuka nanti",
      color: "from-teal-500 to-teal-600",
      bgColor: "bg-teal-50",
      count: "5",
      countLabel: "capsule menunggu"
    }
  ];

  const quickActions = [
    { icon: <Plus className="w-5 h-5" />, label: "Tambah Kenangan", action: "timeline" },
    { icon: <Calendar className="w-5 h-5" />, label: "Buat Event", action: "countdown" },
    { icon: <Heart className="w-5 h-5" />, label: "Catat Mood", action: "mood" },
    { icon: <Camera className="w-5 h-5" />, label: "Upload Foto", action: "timeline" }
  ];

  const recentActivities = [
    { type: "memory", text: "Menambahkan kenangan 'Dinner romantis di rooftop'", time: "2 jam lalu", icon: <Heart className="w-4 h-4" /> },
    { type: "mood", text: "Mood hari ini: Bahagia ❤️", time: "5 jam lalu", icon: <TrendingUp className="w-4 h-4" /> },
    { type: "wishlist", text: "Menyelesaikan wish 'Belajar memasak pasta'", time: "1 hari lalu", icon: <Gift className="w-4 h-4" /> },
    { type: "music", text: "Menambahkan lagu 'Perfect' ke playlist", time: "2 hari lalu", icon: <Music className="w-4 h-4" /> }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-pink-50 to-purple-50">
      {/* Mobile Sidebar Overlay */}
      {sidebarOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <div className={`fixed left-0 top-0 h-full w-64 bg-white shadow-xl transform transition-transform duration-300 z-50 ${
        sidebarOpen ? 'translate-x-0' : '-translate-x-full'
      } lg:translate-x-0 lg:static lg:shadow-none`}>
        <div className="p-6">
          {/* Logo */}
          <div className="flex items-center space-x-3 mb-8">
            <div className="w-10 h-10 bg-gradient-to-r from-pink-500 to-blue-500 rounded-xl flex items-center justify-center">
              <Heart className="w-6 h-6 text-white" fill="currentColor" />
            </div>
            <div>
              <h1 className="text-xl font-bold bg-gradient-to-r from-pink-600 to-blue-600 bg-clip-text text-transparent">
                Our Love Story
              </h1>
            </div>
          </div>

          {/* User Info */}
          <div className="bg-gradient-to-r from-pink-100 to-blue-100 rounded-2xl p-4 mb-6">
            <div className="flex items-center space-x-3">
              <div className="w-12 h-12 bg-gradient-to-r from-pink-400 to-blue-400 rounded-full flex items-center justify-center">
                <User className="w-6 h-6 text-white" />
              </div>
              <div>
                <p className="font-semibold text-gray-800">{user.name} & {user.partnerName}</p>
                <p className="text-sm text-gray-600">{user.relationshipDays} hari bersama</p>
              </div>
            </div>
          </div>

          {/* Navigation */}
          <nav className="space-y-2">
            <button
              onClick={() => setActiveSection('overview')}
              className={`w-full flex items-center space-x-3 px-4 py-3 rounded-xl transition-all ${
                activeSection === 'overview' 
                  ? 'bg-gradient-to-r from-pink-500 to-blue-500 text-white' 
                  : 'text-gray-600 hover:bg-gray-100'
              }`}
            >
              <BarChart3 className="w-5 h-5" />
              <span>Overview</span>
            </button>
            
            {features.map((feature) => (
              <button
                key={feature.id}
                onClick={() => setActiveSection(feature.id)}
                className={`w-full flex items-center space-x-3 px-4 py-3 rounded-xl transition-all ${
                  activeSection === feature.id 
                    ? 'bg-gradient-to-r from-pink-500 to-blue-500 text-white' 
                    : 'text-gray-600 hover:bg-gray-100'
                }`}
              >
                {feature.icon}
                <span className="text-sm">{feature.title}</span>
              </button>
            ))}
          </nav>
        </div>

        {/* Logout Button */}
        <div className="absolute bottom-6 left-6 right-6">
          <button className="w-full flex items-center space-x-3 px-4 py-3 text-gray-600 hover:bg-red-50 hover:text-red-600 rounded-xl transition-all">
            <LogOut className="w-5 h-5" />
            <span>Keluar</span>
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="lg:ml-64 flex-1">
        {/* Header */}
        <header className="bg-white shadow-sm border-b border-gray-100">
          <div className="flex items-center justify-between px-6 py-4">
            <div className="flex items-center space-x-4">
              <button
                onClick={() => setSidebarOpen(!sidebarOpen)}
                className="lg:hidden p-2 rounded-lg hover:bg-gray-100"
              >
                {sidebarOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
              <div>
                <h2 className="text-2xl font-bold text-gray-800">
                  {activeSection === 'overview' ? 'Dashboard' : features.find(f => f.id === activeSection)?.title}
                </h2>
                <p className="text-gray-600">
                  {activeSection === 'overview' 
                    ? `Selamat datang kembali, ${user.name}!` 
                    : features.find(f => f.id === activeSection)?.description
                  }
                </p>
              </div>
            </div>
            
            <div className="flex items-center space-x-4">
              <button className="p-2 rounded-lg hover:bg-gray-100 relative">
                <MessageCircle className="w-6 h-6 text-gray-600" />
                <span className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full"></span>
              </button>
              <div className="w-10 h-10 bg-gradient-to-r from-pink-400 to-blue-400 rounded-full flex items-center justify-center">
                <User className="w-6 h-6 text-white" />
              </div>
            </div>
          </div>
        </header>

        {/* Content */}
        <main className="p-6">
          {activeSection === 'overview' ? (
            <>
              {/* Stats Overview */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-gray-600 text-sm">Total Kenangan</p>
                      <p className="text-3xl font-bold text-blue-600">{stats.memories}</p>
                    </div>
                    <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center">
                      <Clock className="w-6 h-6 text-blue-600" />
                    </div>
                  </div>
                </div>

                <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-gray-600 text-sm">Event Mendatang</p>
                      <p className="text-3xl font-bold text-pink-600">{stats.upcomingEvents}</p>
                    </div>
                    <div className="w-12 h-12 bg-pink-100 rounded-xl flex items-center justify-center">
                      <Calendar className="w-6 h-6 text-pink-600" />
                    </div>
                  </div>
                </div>

                <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-gray-600 text-sm">Wish Terwujud</p>
                      <p className="text-3xl font-bold text-purple-600">{stats.completedWishes}</p>
                    </div>
                    <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center">
                      <Gift className="w-6 h-6 text-purple-600" />
                    </div>
                  </div>
                </div>

                <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-gray-600 text-sm">Mood Score</p>
                      <p className="text-3xl font-bold text-green-600">{stats.moodScore}/10</p>
                    </div>
                    <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center">
                      <TrendingUp className="w-6 h-6 text-green-600" />
                    </div>
                  </div>
                </div>
              </div>

              {/* Quick Actions */}
              <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 mb-8">
                <h3 className="text-lg font-semibold text-gray-800 mb-4">Quick Actions</h3>
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                  {quickActions.map((action, index) => (
                    <button
                      key={index}
                      onClick={() => setActiveSection(action.action)}
                      className="flex flex-col items-center p-4 rounded-xl border-2 border-gray-100 hover:border-pink-200 hover:bg-pink-50 transition-all group"
                    >
                      <div className="w-12 h-12 bg-gradient-to-r from-pink-100 to-blue-100 rounded-xl flex items-center justify-center mb-2 group-hover:from-pink-200 group-hover:to-blue-200 transition-all">
                        {action.icon}
                      </div>
                      <span className="text-sm font-medium text-gray-700">{action.label}</span>
                    </button>
                  ))}
                </div>
              </div>

              <div className="grid lg:grid-cols-2 gap-8">
                {/* Features Grid */}
                <div className="space-y-6">
                  <h3 className="text-lg font-semibold text-gray-800">Fitur Tersedia</h3>
                  <div className="grid gap-4">
                    {features.map((feature) => (
                      <button
                        key={feature.id}
                        onClick={() => setActiveSection(feature.id)}
                        className={`${feature.bgColor} rounded-2xl p-6 text-left hover:shadow-lg transition-all group border border-gray-100`}
                      >
                        <div className="flex items-start justify-between">
                          <div className="flex-1">
                            <div className="flex items-center space-x-3 mb-2">
                              <div className={`w-10 h-10 bg-gradient-to-r ${feature.color} rounded-xl flex items-center justify-center text-white`}>
                                {feature.icon}
                              </div>
                              <div>
                                <h4 className="font-semibold text-gray-800">{feature.title}</h4>
                                <p className="text-sm text-gray-600">{feature.subtitle}</p>
                              </div>
                            </div>
                            <p className="text-gray-600 text-sm mb-3">{feature.description}</p>
                            <div className="flex items-center space-x-2">
                              <span className="text-2xl font-bold text-gray-800">{feature.count}</span>
                              <span className="text-sm text-gray-600">{feature.countLabel}</span>
                            </div>
                          </div>
                          <ChevronRight className="w-5 h-5 text-gray-400 group-hover:text-gray-600 transition-colors" />
                        </div>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Recent Activities */}
                <div className="space-y-6">
                  <h3 className="text-lg font-semibold text-gray-800">Aktivitas Terbaru</h3>
                  <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
                    <div className="space-y-4">
                      {recentActivities.map((activity, index) => (
                        <div key={index} className="flex items-start space-x-3 p-3 rounded-xl hover:bg-gray-50 transition-colors">
                          <div className="w-8 h-8 bg-gradient-to-r from-pink-100 to-blue-100 rounded-lg flex items-center justify-center flex-shrink-0">
                            {activity.icon}
                          </div>
                          <div className="flex-1">
                            <p className="text-gray-800 text-sm">{activity.text}</p>
                            <p className="text-gray-500 text-xs">{activity.time}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Love Quote */}
                  <div className="bg-gradient-to-r from-pink-500 to-blue-500 rounded-2xl p-6 text-white relative overflow-hidden">
                    <div className="relative z-10">
                      <Sparkles className="w-8 h-8 mb-3 opacity-80" />
                      <blockquote className="text-lg font-medium mb-2">
                        "Cinta bukan tentang menemukan seseorang yang sempurna, tapi tentang melihat seseorang yang tidak sempurna dengan cara yang sempurna."
                      </blockquote>
                      <p className="text-pink-100 text-sm">- Quote Hari Ini</p>
                    </div>
                    <div className="absolute top-0 right-0 w-32 h-32 bg-white opacity-10 rounded-full -translate-y-16 translate-x-16"></div>
                    <div className="absolute bottom-0 left-0 w-20 h-20 bg-white opacity-10 rounded-full translate-y-10 -translate-x-10"></div>
                  </div>
                </div>
              </div>
            </>
          ) : (
            // Feature-specific content
            <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100">
              <div className="text-center py-20">
                <div className={`w-20 h-20 mx-auto rounded-2xl bg-gradient-to-r ${features.find(f => f.id === activeSection)?.color} flex items-center justify-center mb-6`}>
                  <div className="text-white text-2xl">
                    {features.find(f => f.id === activeSection)?.icon}
                  </div>
                </div>
                <h3 className="text-2xl font-bold text-gray-800 mb-4">
                  {features.find(f => f.id === activeSection)?.title}
                </h3>
                <p className="text-gray-600 mb-8 max-w-md mx-auto">
                  Fitur {features.find(f => f.id === activeSection)?.title} sedang dalam pengembangan. 
                  Akan segera hadir dengan tampilan dan fungsionalitas yang menakjubkan!
                </p>
                <div className="flex justify-center space-x-4">
                  <button className={`px-6 py-3 bg-gradient-to-r ${features.find(f => f.id === activeSection)?.color} text-white rounded-xl font-medium hover:shadow-lg transition-all`}>
                    Mulai Sekarang
                  </button>
                  <button 
                    onClick={() => setActiveSection('overview')}
                    className="px-6 py-3 border-2 border-gray-200 text-gray-700 rounded-xl font-medium hover:border-gray-300 transition-all"
                  >
                    Kembali ke Dashboard
                  </button>
                </div>
              </div>
            </div>
          )}
        </main>
      </div>

      {/* Floating Action Button */}
      <button className="fixed bottom-6 right-6 w-14 h-14 bg-gradient-to-r from-pink-500 to-blue-500 text-white rounded-full shadow-lg hover:shadow-xl transform hover:scale-110 transition-all flex items-center justify-center z-30">
        <Plus className="w-6 h-6" />
      </button>

      {/* Background Decorations */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-1/4 left-10 w-2 h-2 bg-pink-300 rounded-full opacity-60 animate-pulse"></div>
        <div className="absolute top-1/3 right-20 w-1 h-1 bg-blue-300 rounded-full opacity-60 animate-pulse" style={{animationDelay: '1s'}}></div>
        <div className="absolute bottom-1/4 left-1/4 w-1.5 h-1.5 bg-purple-300 rounded-full opacity-60 animate-pulse" style={{animationDelay: '2s'}}></div>
        <div className="absolute bottom-1/3 right-1/3 w-2 h-2 bg-pink-300 rounded-full opacity-60 animate-pulse" style={{animationDelay: '3s'}}></div>
      </div>
    </div>
  );
};

export default Dashboard;