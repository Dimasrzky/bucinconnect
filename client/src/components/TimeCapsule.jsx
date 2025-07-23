import React from 'react';
import { useNavigate } from 'react-router-dom';

const TimeCapsule = () => {
  const navigate = useNavigate();

  return (
    <div className="feature-page">
      <nav className="feature-nav">
        <div className="nav-container">
          <div className="logo">💌 Time Capsule Digital</div>
          <button className="back-to-dashboard" onClick={() => navigate('/dashboard')}>
            <span>←</span>
            <span>Dashboard</span>
          </button>
        </div>
      </nav>
      
      <div className="feature-container">
        <div className="feature-header">
          <h1 className="feature-title">Time Capsule Digital</h1>
          <p className="feature-subtitle">Simpan pesan untuk masa depan</p>
        </div>
        
        <div className="feature-content">
          <div className="coming-soon">🚧 Fitur dalam pengembangan</div>
          <p className="feature-description">
            Buat kapsul waktu digital berisi pesan, foto, dan harapan untuk 
            dibuka di masa depan. Set tanggal pembukaan dan kejutkan diri 
            kalian di anniversary atau momen spesial mendatang.
          </p>
        </div>
      </div>
    </div>
  );
};

export default TimeCapsule;