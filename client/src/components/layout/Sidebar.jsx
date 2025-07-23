import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

const Sidebar = ({ isOpen, onToggle }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const [userEmail, setUserEmail] = useState('');
  const [userProfile, setUserProfile] = useState({
    name: 'Couple User',
    avatar: '💕',
    relationship: 'Dating since 2023'
  });

  useEffect(() => {
    const email = localStorage.getItem('userEmail');
    setUserEmail(email || 'couple@love.com');
  }, []);

  const mainFeatures = [
    {
      icon: '🏠',
      title: 'Dashboard',
      path: '/dashboard',
      description: 'Beranda utama'
    },
    {
      icon: '📅',
      title: 'Timeline',
      path: '/timeline',
      description: 'Momen berharga'
    },
    {
      icon: '⏰',
      title: 'Countdown',
      path: '/countdown',
      description: 'Hari spesial'
    },
    {
      icon: '📝',
      title: 'Wishlist',
      path: '/wishlist',
      description: 'Impian bersama'
    },
    {
      icon: '🎯',
      title: 'Quiz',
      path: '/quiz',
      description: 'Tes pasangan'
    },
    {
      icon: '😊',
      title: 'Mood Tracker',
      path: '/mood-tracker',
      description: 'Perasaan harian'
    },
    {
      icon: '🎵',
      title: 'Music Gallery',
      path: '/music-gallery',
      description: 'Lagu cinta'
    },
    {
      icon: '🎮',
      title: 'Games',
      path: '/game-memory',
      description: 'Game kenangan'
    },
    {
      icon: '💌',
      title: 'Time Capsule',
      path: '/time-capsule',
      description: 'Pesan masa depan'
    }
  ];

  const settingsMenu = [
    {
      icon: '👤',
      title: 'Profile',
      action: 'profile',
      description: 'Pengaturan profil'
    },
    {
      icon: '💑',
      title: 'Relationship',
      action: 'relationship',
      description: 'Info hubungan'
    },
    {
      icon: '🔔',
      title: 'Notifications',
      action: 'notifications',
      description: 'Pengaturan notifikasi'
    },
    {
      icon: '🎨',
      title: 'Theme',
      action: 'theme',
      description: 'Tema & tampilan'
    },
    {
      icon: '🔒',
      title: 'Privacy',
      action: 'privacy',
      description: 'Privasi & keamanan'
    },
    {
      icon: '📤',
      title: 'Export Data',
      action: 'export',
      description: 'Ekspor data'
    },
    {
      icon: '❓',
      title: 'Help',
      action: 'help',
      description: 'Bantuan & FAQ'
    }
  ];

  const handleNavigation = (path) => {
    navigate(path);
    if (window.innerWidth <= 768) {
      onToggle(); // Close sidebar on mobile after navigation
    }
  };

  const handleSettingAction = (action) => {
    switch (action) {
      case 'profile':
        alert('Pengaturan Profil akan segera tersedia! 👤');
        break;
      case 'relationship':
        alert('Pengaturan Hubungan akan segera tersedia! 💑');
        break;
      case 'notifications':
        alert('Pengaturan Notifikasi akan segera tersedia! 🔔');
        break;
      case 'theme':
        alert('Pengaturan Tema akan segera tersedia! 🎨');
        break;
      case 'privacy':
        alert('Pengaturan Privasi akan segera tersedia! 🔒');
        break;
      case 'export':
        alert('Export Data akan segera tersedia! 📤');
        break;
      case 'help':
        alert('Bantuan & FAQ akan segera tersedia! ❓');
        break;
      default:
        break;
    }
  };

  const handleLogout = () => {
    if (window.confirm('Apakah Anda yakin ingin keluar?')) {
      localStorage.removeItem('isAuthenticated');
      localStorage.removeItem('userEmail');
      navigate('/');
    }
  };

  const isActiveRoute = (path) => {
    return location.pathname === path;
  };

  return (
    <>
      {/* Overlay for mobile */}
      {isOpen && (
        <div className="sidebar-overlay" onClick={onToggle}></div>
      )}
      
      {/* Sidebar */}
      <div className={`sidebar ${isOpen ? 'sidebar-open' : ''}`}>
        {/* User Profile Section */}
        <div className="sidebar-profile">
          <div className="profile-avatar">{userProfile.avatar}</div>
          <div className="profile-info">
            <h3 className="profile-name">{userProfile.name}</h3>
            <p className="profile-email">{userEmail}</p>
            <p className="profile-relationship">{userProfile.relationship}</p>
          </div>
        </div>

        {/* Navigation Menu */}
        <div className="sidebar-content">
          <div className="sidebar-section">
            <h4 className="sidebar-section-title">Menu Utama</h4>
            <ul className="sidebar-menu">
              {mainFeatures.map((item, index) => (
                <li key={index} className="sidebar-menu-item">
                  <button
                    className={`sidebar-menu-link ${isActiveRoute(item.path) ? 'active' : ''}`}
                    onClick={() => handleNavigation(item.path)}
                  >
                    <span className="menu-icon">{item.icon}</span>
                    <div className="menu-content">
                      <span className="menu-title">{item.title}</span>
                      <span className="menu-description">{item.description}</span>
                    </div>
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Settings Section */}
          <div className="sidebar-section">
            <h4 className="sidebar-section-title">Pengaturan</h4>
            <ul className="sidebar-menu">
              {settingsMenu.map((item, index) => (
                <li key={index} className="sidebar-menu-item">
                  <button
                    className="sidebar-menu-link"
                    onClick={() => handleSettingAction(item.action)}
                  >
                    <span className="menu-icon">{item.icon}</span>
                    <div className="menu-content">
                      <span className="menu-title">{item.title}</span>
                      <span className="menu-description">{item.description}</span>
                    </div>
                  </button>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Logout Button */}
        <div className="sidebar-footer">
          <button className="logout-button" onClick={handleLogout}>
            <span className="menu-icon">🚪</span>
            <span>Keluar</span>
          </button>
        </div>
      </div>
    </>
  );
};

export default Sidebar;