import React from 'react';
import { useNavigate } from 'react-router-dom';

const Quiz = () => {
  const navigate = useNavigate();

  return (
    <div className="feature-page">
      <nav className="feature-nav">
        <div className="nav-container">
          <div className="logo">🎯 Quiz Pasangan</div>
          <button className="back-to-dashboard" onClick={() => navigate('/dashboard')}>
            <span>←</span>
            <span>Dashboard</span>
          </button>
        </div>
      </nav>
      
      <div className="feature-container">
        <div className="feature-header">
          <h1 className="feature-title">Quiz Pasangan</h1>
          <p className="feature-subtitle">Tes seberapa baik kalian saling mengenal</p>
        </div>
        
        <div className="feature-content">
          <div className="coming-soon">🚧 Fitur dalam pengembangan</div>
          <p className="feature-description">
            Quiz interaktif untuk mengetes seberapa baik kalian mengenal satu sama lain. 
            Jawab pertanyaan tentang kesukaan, impian, dan hal-hal favorit pasangan kalian. 
            Semakin tinggi skor, semakin dalam kalian saling memahami!
          </p>
        </div>
      </div>
    </div>
  );
};

export default Quiz;