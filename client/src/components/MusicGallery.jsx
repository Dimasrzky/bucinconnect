import React from 'react';
import { useNavigate } from 'react-router-dom';

const MusicGallery = () => {
  const navigate = useNavigate();

  return (
    <div className="feature-page">
      <nav className="feature-nav">
        <div className="nav-container">
          <div className="logo">🎵 Galeri Musik Cinta</div>
          <button className="back-to-dashboard" onClick={() => navigate('/dashboard')}>
            <span>←</span>
            <span>Dashboard</span>
          </button>
        </div>
      </nav>
      
      <div className="feature-container">
        <div className="feature-header">
          <h1 className="feature-title">Galeri Musik Cinta</h1>
          <p className="feature-subtitle">Kumpulkan lagu-lagu bermakna dalam hubungan kalian</p>
        </div>
        
        <div className="feature-content">
          <div className="coming-soon">🚧 Fitur dalam pengembangan</div>
          <p className="feature-description">
            Buat playlist lagu-lagu special yang bermakna dalam hubungan kalian. 
            Tambahkan cerita di balik setiap lagu dan dengarkan bersama untuk 
            mengenang momen-momen indah yang telah kalian lalui.
          </p>
        </div>
      </div>
    </div>
  );
};

export default MusicGallery;