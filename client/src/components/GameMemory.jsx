import React from 'react';
import { useNavigate } from 'react-router-dom';

const GameMemory = () => {
  const navigate = useNavigate();

  return (
    <div className="feature-page">
      <nav className="feature-nav">
        <div className="nav-container">
          <div className="logo">🎮 Game Kenangan</div>
          <button className="back-to-dashboard" onClick={() => navigate('/dashboard')}>
            <span>←</span>
            <span>Dashboard</span>
          </button>
        </div>
      </nav>
      
      <div className="feature-container">
        <div className="feature-header">
          <h1 className="feature-title">Game Kenangan</h1>
          <p className="feature-subtitle">Bermain game seru sambil mengenang momen indah</p>
        </div>
        
        <div className="feature-content">
          <div className="coming-soon">🚧 Fitur dalam pengembangan</div>
          <p className="feature-description">
            Game interaktif yang menggabungkan kenangan kalian. Tebak foto, 
            cocokkan tanggal dengan kejadian, dan bermain puzzle yang dibuat 
            dari foto-foto memorable kalian berdua.
          </p>
        </div>
      </div>
    </div>
  );
};

export default GameMemory;