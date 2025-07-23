import React from 'react';
import { useNavigate } from 'react-router-dom';

const Countdown = () => {
  const navigate = useNavigate();

  return (
    <div className="feature-page">
      <nav className="feature-nav">
        <div className="nav-container">
          <div className="logo">⏰ Countdown & Reminder</div>
          <button className="back-to-dashboard" onClick={() => navigate('/dashboard')}>
            <span>←</span>
            <span>Dashboard</span>
          </button>
        </div>
      </nav>
      
      <div className="feature-container">
        <div className="feature-header">
          <h1 className="feature-title">Countdown & Reminder</h1>
          <p className="feature-subtitle">Jangan pernah lupa hari spesial kalian</p>
        </div>
        
        <div className="feature-content">
          <div className="coming-soon">🚧 Fitur dalam pengembangan</div>
          <p className="feature-description">
            Set reminder untuk anniversary, ulang tahun, dan momen spesial lainnya. 
            Dapatkan notifikasi di waktu yang tepat agar kalian tidak pernah melewatkan 
            kesempatan untuk merayakan kebahagiaan bersama.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Countdown;