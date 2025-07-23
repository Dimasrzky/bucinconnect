import React from 'react';
import { useNavigate } from 'react-router-dom';

const MoodTracker = () => {
  const navigate = useNavigate();

  return (
    <div className="feature-page">
      <nav className="feature-nav">
        <div className="nav-container">
          <div className="logo">😊 Mood Tracker</div>
          <button className="back-to-dashboard" onClick={() => navigate('/dashboard')}>
            <span>←</span>
            <span>Dashboard</span>
          </button>
        </div>
      </nav>
      
      <div className="feature-container">
        <div className="feature-header">
          <h1 className="feature-title">Mood Tracker</h1>
          <p className="feature-subtitle">Pantau perasaan harian kalian</p>
        </div>
        
        <div className="feature-content">
          <div className="coming-soon">🚧 Fitur dalam pengembangan</div>
          <p className="feature-description">
            Catat mood dan perasaan harian kalian. Lihat pola emosi dan support 
            satu sama lain di hari-hari sulit. Rayakan bersama di hari-hari bahagia 
            dan jadikan hubungan kalian lebih kuat dan harmonis.
          </p>
        </div>
      </div>
    </div>
  );
};

export default MoodTracker;