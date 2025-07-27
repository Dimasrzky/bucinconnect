import React, { useState, useEffect, useContext } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { AuthContext } from '../../App';

const Sidebar = ({ isOpen, onToggle, isCollapsed, onCollapse }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const { user, logout } = useContext(AuthContext);
  
  const [userProfile, setUserProfile] = useState({
    name: 'Couple User',
    avatar: '💕',
    relationship: 'Dating since 2023'
  });

  // Update user profile dari AuthContext
  useEffect(() => {
    if (user) {
      setUserProfile({
        name: user.name || 'User',
        avatar: '💕',
        relationship: user.partnerName ? `💑 ${user.name} & ${user.partnerName}` : 'Dating since 2023'
      });
    }
  }, [user]);

  // Main navigation features
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

  // Settings menu including logout
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
    },
    {
      icon: '🚪',
      title: 'Keluar',
      action: 'logout',
      description: 'Logout dari aplikasi'
    }
  ];

  // Handle navigation to different routes
  const handleNavigation = (path) => {
    navigate(path);
    // Close sidebar after navigation on mobile/tablet
    if (window.innerWidth < 1024) {
      onToggle();
    }
  };

  // Handle settings menu actions
  const handleSettingAction = (action) => {
    switch (action) {
      case 'profile':
        navigate('/profile');
        break;
      case 'relationship':
        navigate('/relationship-settings');
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
        handleExportData();
        break;
      case 'help':
        alert('Bantuan & FAQ akan segera tersedia! ❓');
        break;
      case 'logout':
        handleLogout();
        break;
      default:
        break;
    }
    
    // Close sidebar after action on mobile/tablet
    if (window.innerWidth < 1024) {
      onToggle();
    }
  };

  // Export user data functionality
  const handleExportData = async () => {
    try {
      const token = localStorage.getItem('authToken');
      if (!token) {
        alert('Anda perlu login untuk export data');
        return;
      }

      const endpoints = [
        '/api/timeline',
        '/api/countdown', 
        '/api/wishlist',
        '/api/mood',
        '/api/music'
      ];

      const exportData = {};
      
      for (const endpoint of endpoints) {
        try {
          const response = await fetch(`http://localhost:5000${endpoint}`, {
            headers: {
              'Authorization': `Bearer ${token}`
            }
          });
          
          if (response.ok) {
            const data = await response.json();
            const key = endpoint.split('/').pop();
            exportData[key] = data;
          }
        } catch (error) {
          console.log(`Failed to fetch ${endpoint}:`, error.message);
        }
      }

      exportData.user = user;
      exportData.exportDate = new Date().toISOString();

      const dataStr = JSON.stringify(exportData, null, 2);
      const dataBlob = new Blob([dataStr], { type: 'application/json' });
      const url = URL.createObjectURL(dataBlob);
      
      const link = document.createElement('a');
      link.href = url;
      link.download = `love-story-data-${new Date().toISOString().split('T')[0]}.json`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);

      alert('Data berhasil di-export! 📤');
      
    } catch (error) {
      console.error('Export error:', error);
      alert('Gagal export data. Silakan coba lagi.');
    }
  };

  // Handle user logout
  const handleLogout = async () => {
    const confirmLogout = window.confirm('💔 Apakah Anda yakin ingin keluar?\n\nSemua data yang belum disimpan akan hilang.');
    
    if (confirmLogout) {
      try {
        const token = localStorage.getItem('authToken');
        if (token) {
          try {
            await fetch('http://localhost:5000/api/auth/logout', {
              method: 'POST',
              headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
              }
            });
          } catch (error) {
            console.log('Logout API call failed:', error.message);
          }
        }

        logout();
        navigate('/', { replace: true });
        
        setTimeout(() => {
          alert('👋 Anda telah berhasil keluar. Sampai jumpa lagi!');
        }, 500);
        
      } catch (error) {
        console.error('Logout error:', error);
        localStorage.removeItem('authToken');
        localStorage.removeItem('userData');
        localStorage.removeItem('isAuthenticated');
        localStorage.removeItem('userEmail');
        navigate('/', { replace: true });
        alert('Logout berhasil!');
      }
    }
  };

  // Check if current route is active
  const isActiveRoute = (path) => {
    return location.pathname === path;
  };

  return (
    <>
      {/* Mobile Overlay - Only shows when sidebar is open */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
          onClick={onToggle}
        />
      )}
      
      {/* Sidebar Container */}
      <div 
        className={`
          ${isCollapsed ? 'w-20' : 'w-80'} bg-white shadow-xl
          transition-all duration-300 ease-in-out
          lg:block lg:static lg:h-screen lg:min-h-screen
          ${isOpen ? 'fixed top-0 left-0 h-screen z-50 translate-x-0' : 'hidden lg:block'}
          relative flex flex-col
        `}
      >
        {/* User Profile Section */}
        <div className="bg-white text-white p-6 relative">
          <div className={`text-center transition-all duration-300 ${isCollapsed ? 'px-0' : ''}`}>
            {/* Logo Section dengan text brand */}
            <div className={`flex items-center justify-center mb-3 transition-all duration-300 ${
              isCollapsed ? 'flex-col' : 'flex-row space-x-3'
            }`}>
              {/* Logo Button */}
              <button
                onClick={onCollapse}
                className={`flex items-center justify-center bg-white bg-opacity-20 rounded-full transition-all duration-300 hover:bg-opacity-30 hover:scale-110 active:scale-95 ${
                  isCollapsed ? 'w-12 h-12' : 'w-14 h-14'
                }`}
                title={isCollapsed ? "Expand Sidebar" : "Collapse Sidebar"}
              >
                <img 
                  src="./public/Logo Bucinconnect.png" 
                  alt="BucinConnect Logo"
                  className={`transition-all duration-300 object-contain ${
                    isCollapsed ? 'w-12 h-12' : 'w-20 h-20'
                  }`}
                  style={{
                    maxWidth: '100%',
                    maxHeight: '100%',
                    objectFit: 'contain'
                  }}
                />
              </button>
              
              {/* Brand Text - Only show when expanded */}
              {!isCollapsed && (
                <div className="transition-all duration-300 opacity-100">
                  <h2 className="text-xl font-bold text-black tracking-wide">
                    BucinConnect
                  </h2>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Sidebar Content */}
        <div className="flex flex-col min-h-0" style={{ height: 'calc(100vh - 120px)' }}>
          {/* Navigation Menu */}
          <div className="flex-1 py-6 overflow-y-auto">
            {/* Main Features Section */}
            <div className={`px-4 mb-8 transition-all duration-300 ${isCollapsed ? 'px-2' : ''}`}>
              {!isCollapsed && (
                <h4 className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-4 transition-opacity duration-300">
                  Menu Utama
                </h4>
              )}
              <nav className="space-y-1">
                {mainFeatures.map((item, index) => (
                  <div key={index} className="relative group">
                    <button
                      onClick={() => handleNavigation(item.path)}
                      className={`w-full flex items-center rounded-lg transition-all duration-300 group ${
                        isActiveRoute(item.path)
                          ? 'bg-gradient-to-r from-pink-500 to-blue-500 text-white shadow-lg'
                          : 'text-gray-700 hover:bg-gray-100 hover:text-gray-900'
                      } ${isCollapsed ? 'px-2 py-3 justify-center' : 'px-4 py-3'}`}
                    >
                      <span className={`text-lg transition-transform group-hover:scale-110 ${
                        isCollapsed ? '' : 'mr-3'
                      }`}>
                        {item.icon}
                      </span>
                      {!isCollapsed && (
                        <div className="flex-1 text-left transition-opacity duration-300">
                          <div className="font-medium">{item.title}</div>
                          <div className={`text-xs transition-colors ${
                            isActiveRoute(item.path) ? 'text-pink-100' : 'text-gray-500'
                          }`}>
                            {item.description}
                          </div>
                        </div>
                      )}
                    </button>
                    
                    {/* Tooltip for collapsed state */}
                    {isCollapsed && (
                      <div className="absolute left-full top-1/2 transform -translate-y-1/2 ml-2 px-3 py-2 bg-gray-900 text-white text-sm rounded-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 whitespace-nowrap z-50">
                        {item.title}
                        <div className="absolute left-0 top-1/2 transform -translate-y-1/2 -translate-x-1 w-2 h-2 bg-gray-900 rotate-45"></div>
                      </div>
                    )}
                    
                    {/* Active indicator for expanded state */}
                    {!isCollapsed && isActiveRoute(item.path) && (
                      <div className="absolute right-4 top-1/2 transform -translate-y-1/2">
                        <div className="w-2 h-2 bg-white rounded-full animate-pulse"></div>
                      </div>
                    )}
                  </div>
                ))}
              </nav>
            </div>

            {/* Settings Section */}
            <div className={`px-4 transition-all duration-300 ${isCollapsed ? 'px-2' : ''}`}>
              {!isCollapsed && (
                <h4 className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-4 transition-opacity duration-300">
                  Pengaturan
                </h4>
              )}
              <nav className="space-y-1">
                {settingsMenu.map((item, index) => (
                  <div key={index} className="relative group">
                    <button
                      onClick={() => handleSettingAction(item.action)}
                      className={`w-full flex items-center rounded-lg transition-all duration-300 group ${
                        item.action === 'logout' 
                          ? 'text-red-600 hover:bg-red-50 border border-red-200 hover:border-red-300' 
                          : 'text-gray-700 hover:bg-gray-100 hover:text-gray-900'
                      } ${isCollapsed ? 'px-2 py-3 justify-center' : 'px-4 py-3'}`}
                    >
                      <span className={`text-lg transition-transform group-hover:scale-110 ${
                        isCollapsed ? '' : 'mr-3'
                      }`}>
                        {item.icon}
                      </span>
                      {!isCollapsed && (
                        <div className="flex-1 text-left transition-opacity duration-300">
                          <div className="font-medium">{item.title}</div>
                          <div className={`text-xs ${
                            item.action === 'logout' ? 'text-red-400' : 'text-gray-500'
                          }`}>
                            {item.description}
                          </div>
                        </div>
                      )}
                    </button>
                    
                    {/* Tooltip for collapsed state */}
                    {isCollapsed && (
                      <div className="absolute left-full top-1/2 transform -translate-y-1/2 ml-2 px-3 py-2 bg-gray-900 text-white text-sm rounded-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 whitespace-nowrap z-50">
                        {item.title}
                        <div className="absolute left-0 top-1/2 transform -translate-y-1/2 -translate-x-1 w-2 h-2 bg-gray-900 rotate-45"></div>
                      </div>
                    )}
                  </div>
                ))}
              </nav>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Sidebar;