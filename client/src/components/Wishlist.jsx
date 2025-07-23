import React from 'react';
import { useNavigate } from 'react-router-dom';

const Wishlist = () => {
  const navigate = useNavigate();

  return (
    <div className="feature-page">
      <nav className="feature-nav">
        <div className="nav-container">
          <div className="logo">📝 Wishlist Berdua</div>
          <button className="back-to-dashboard" onClick={() => navigate('/dashboard')}>
            <span>←</span>
            <span>Dashboard</span>
          </button>
        </div>
      </nav>
      
      <div className="feature-container">
        <div className="feature-header">
          <h1 className="feature-title">Wishlist Berdua</h1>
          <p className="feature-subtitle">Buat daftar impian yang ingin dicapai bersama</p>
        </div>
        
        <div className="feature-content">
          <div className="coming-soon">🚧 Fitur dalam pengembangan</div>
          <p className="feature-description">
            Buat bucket list dan wishlist untuk perjalanan, pengalaman, dan goals 
            yang ingin kalian capai bersama. Tandai yang sudah tercapai dan 
            rayakan setiap pencapaian sebagai pasangan.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Wishlist;