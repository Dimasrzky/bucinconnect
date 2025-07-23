import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Sidebar from './layout/Sidebar';

const Dashboard = () => {
  const navigate = useNavigate();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [userEmail, setUserEmail] = useState('');

  useEffect(() => {
    // Get user email from localStorage
    const email = localStorage.getItem('userEmail');
    setUserEmail(email || 'couple@love.com');
  }, []);

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  const stats = [
    { 
      label: 'Hari Bersama', 
      value: '365', 
      icon: '💕',
      color: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      growth: '+1 hari'
    },
    { 
      label: 'Kenangan', 
      value: '24', 
      icon: '📸',
      color: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
      growth: '+3 baru'
    },
    { 
      label: 'Pesan Tersimpan', 
      value: '12', 
      icon: '💌',
      color: 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)',
      growth: '+2 pesan'
    },
    { 
      label: 'Lagu Favorit', 
      value: '8', 
      icon: '🎵',
      color: 'linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)',
      growth: '+1 lagu'
    }
  ];

  const quickActions = [
    {
      title: 'Tambah Timeline',
      icon: '📅',
      path: '/timeline',
      color: '#667eea',
      description: 'Catat momen berharga hari ini'
    },
    {
      title: 'Set Reminder',
      icon: '⏰',
      path: '/countdown',
      color: '#f093fb',
      description: 'Ingatkan hari spesial'
    },
    {
      title: 'Catat Mood',
      icon: '😊',
      path: '/mood-tracker',
      color: '#43e97b',
      description: 'Bagaimana perasaan kalian hari ini?'
    },
    {
      title: 'Buat Kapsul',
      icon: '💌',
      path: '/time-capsule',
      color: '#4facfe',
      description: 'Simpan pesan untuk masa depan'
    }
  ];

  const recentActivities = [
    {
      icon: '📸',
      title: 'Menambahkan foto kencan pertama',
      time: '2 jam yang lalu',
      type: 'timeline'
    },
    {
      icon: '🎵',
      title: 'Menambahkan lagu "Perfect" ke playlist',
      time: '1 hari yang lalu',
      type: 'music'
    },
    {
      icon: '💌',
      title: 'Membuat time capsule untuk anniversary',
      time: '3 hari yang lalu',
      type: 'capsule'
    },
    {
      icon: '😊',
      title: 'Mencatat mood bahagia bersama',
      time: '5 hari yang lalu',
      type: 'mood'
    }
  ];

  const upcomingEvents = [
    {
      title: 'Anniversary 1 Tahun',
      date: '2025-02-14',
      daysLeft: 22,
      icon: '💝'
    },
    {
      title: 'Ulang tahun Sarah',
      date: '2025-03-10',
      daysLeft: 46,
      icon: '🎂'
    },
    {
      title: 'Liburan ke Bali',
      date: '2025-04-15',
      daysLeft: 82,
      icon: '✈️'
    }
  ];

  return (
    <div className="dashboard-layout">
      {/* Sidebar */}
      <Sidebar isOpen={sidebarOpen} onToggle={toggleSidebar} />
      
      {/* Sidebar Toggle Button */}
      <button 
        className={`sidebar-toggle ${sidebarOpen ? 'sidebar-open' : ''}`}
        onClick={toggleSidebar}
      >
        {sidebarOpen ? '✕' : '☰'}
      </button>

      {/* Main Content */}
      <div className={`dashboard-main ${sidebarOpen ? 'sidebar-open' : ''}`}>
        {/* Header */}
        <div className="dashboard-header">
          <div className="header-content">
            <h1 className="dashboard-title">
              Selamat Datang! 💕
            </h1>
            <p className="dashboard-subtitle">
              {new Date().toLocaleDateString('id-ID', { 
                weekday: 'long', 
                year: 'numeric', 
                month: 'long', 
                day: 'numeric' 
              })}
            </p>
          </div>
          <div className="header-weather">
            <div className="weather-info">
              <span className="weather-icon">☀️</span>
              <span className="weather-temp">28°C</span>
            </div>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="stats-section">
          <h2 className="section-title">Statistik Hubungan</h2>
          <div className="stats-grid">
            {stats.map((stat, index) => (
              <div key={index} className="stat-card" style={{animationDelay: `${index * 0.1}s`}}>
                <div className="stat-header">
                  <div className="stat-icon" style={{background: stat.color}}>
                    {stat.icon}
                  </div>
                  <div className="stat-growth">{stat.growth}</div>
                </div>
                <div className="stat-content">
                  <div className="stat-value">{stat.value}</div>
                  <div className="stat-label">{stat.label}</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Quick Actions */}
        <div className="quick-actions-section">
          <h2 className="section-title">Aksi Cepat</h2>
          <div className="quick-actions-grid">
            {quickActions.map((action, index) => (
              <div 
                key={index} 
                className="quick-action-card"
                onClick={() => navigate(action.path)}
                style={{animationDelay: `${index * 0.1}s`}}
              >
                <div className="action-icon" style={{color: action.color}}>
                  {action.icon}
                </div>
                <h3 className="action-title">{action.title}</h3>
                <p className="action-description">{action.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Content Grid */}
        <div className="dashboard-content-grid">
          {/* Recent Activities */}
          <div className="content-card">
            <div className="card-header">
              <h2 className="card-title">Aktivitas Terbaru</h2>
              <button className="view-all-btn">Lihat Semua</button>
            </div>
            <div className="activity-list">
              {recentActivities.map((activity, index) => (
                <div key={index} className="activity-item">
                  <div className="activity-icon">{activity.icon}</div>
                  <div className="activity-content">
                    <p className="activity-title">{activity.title}</p>
                    <span className="activity-time">{activity.time}</span>
                  </div>
                  <div className={`activity-badge ${activity.type}`}></div>
                </div>
              ))}
            </div>
          </div>

          {/* Upcoming Events */}
          <div className="content-card">
            <div className="card-header">
              <h2 className="card-title">Event Mendatang</h2>
              <button className="add-event-btn">+ Tambah</button>
            </div>
            <div className="events-list">
              {upcomingEvents.map((event, index) => (
                <div key={index} className="event-item">
                  <div className="event-icon">{event.icon}</div>
                  <div className="event-content">
                    <h4 className="event-title">{event.title}</h4>
                    <p className="event-date">
                      {new Date(event.date).toLocaleDateString('id-ID')}
                    </p>
                  </div>
                  <div className="event-countdown">
                    <span className="countdown-number">{event.daysLeft}</span>
                    <span className="countdown-label">hari</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Love Quote of the Day */}
        <div className="quote-section">
          <div className="quote-card">
            <div className="quote-icon">💝</div>
            <blockquote className="quote-text">
              "Cinta sejati bukan tentang menjadi sempurna, tetapi tentang menerima ketidaksempurnaan satu sama lain."
            </blockquote>
            <cite className="quote-author">— Quote of the Day</cite>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;