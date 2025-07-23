import React from 'react';
import { useNavigate } from 'react-router-dom';

const Timeline = () => {
  const navigate = useNavigate();

  return (
    <div className="feature-page">
      <nav className="feature-nav">
        <div className="nav-container">
          <div className="logo">📅 Timeline Hubungan</div>
          <button className="back-to-dashboard" onClick={() => navigate('/dashboard')}>
            <span>←</span>
            <span>Dashboard</span>
          </button>
        </div>
      </nav>
      
      <div className="feature-container">
        <div className="feature-header">
          <h1 className="feature-title">Timeline Hubungan</h1>
          <p className="feature-subtitle">Catat setiap momen penting dalam perjalanan cinta kalian</p>
        </div>
        
        <div className="feature-content">
          <div className="coming-soon">🚧 Fitur dalam pengembangan</div>
          <p className="feature-description">
            Timeline hubungan akan memungkinkan kalian untuk mencatat dan melihat kronologi 
            perjalanan cinta dari awal hingga sekarang. Tambahkan foto, tanggal penting, 
            dan cerita di balik setiap momen spesial.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Timeline;