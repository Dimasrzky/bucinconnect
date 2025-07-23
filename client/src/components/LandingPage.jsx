import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';

const LandingPage = () => {
  const navigate = useNavigate();
  const [isScrolled, setIsScrolled] = useState(false);
  const [animatedElements, setAnimatedElements] = useState(new Set());
  const observerRef = useRef(null);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 100);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    observerRef.current = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setAnimatedElements(prev => new Set([...prev, entry.target.id]));
          }
        });
      },
      { threshold: 0.1, rootMargin: '0px 0px -50px 0px' }
    );

    const elementsToObserve = document.querySelectorAll('[data-animate]');
    elementsToObserve.forEach(el => observerRef.current.observe(el));

    return () => {
      if (observerRef.current) {
        observerRef.current.disconnect();
      }
    };
  }, []);

  useEffect(() => {
    const createFloatingHeart = () => {
      const heart = document.createElement('div');
      heart.innerHTML = '💕';
      heart.className = 'floating-heart-particle';
      heart.style.cssText = `
        position: fixed;
        left: ${Math.random() * 100}vw;
        font-size: ${Math.random() * 10 + 10}px;
        opacity: ${Math.random()};
        pointer-events: none;
        z-index: 1;
        animation: floatUp ${Math.random() * 3 + 2}s linear forwards;
      `;
      
      document.body.appendChild(heart);
      setTimeout(() => heart.remove(), 5000);
    };

    const interval = setInterval(createFloatingHeart, 3000);
    return () => clearInterval(interval);
  }, []);

  const scrollToSection = (sectionId) => {
    document.getElementById(sectionId)?.scrollIntoView({ 
      behavior: 'smooth',
      block: 'start'
    });
  };

  const handleLogin = () => {
    navigate('/login');
  };

  const features = [
    {
      icon: '📅',
      title: 'Timeline Hubungan',
      description: 'Catat setiap momen penting dalam perjalanan cinta kalian dari awal hingga sekarang',
      path: '/timeline'
    },
    {
      icon: '⏰',
      title: 'Countdown & Reminder',
      description: 'Jangan pernah lupa anniversary, ulang tahun, atau hari spesial lainnya',
      path: '/countdown'
    },
    {
      icon: '📝',
      title: 'Wishlist Berdua',
      description: 'Buat daftar impian dan bucket list yang ingin kalian capai bersama',
      path: '/wishlist'
    },
    {
      icon: '🎯',
      title: 'Quiz Pasangan',
      description: 'Tes seberapa baik kalian saling mengenal dengan quiz seru',
      path: '/quiz'
    },
    {
      icon: '😊',
      title: 'Mood Tracker',
      description: 'Pantau perasaan harian kalian dan saling mendukung',
      path: '/mood-tracker'
    },
    {
      icon: '🎵',
      title: 'Galeri Musik Cinta',
      description: 'Kumpulkan lagu-lagu yang bermakna dalam hubungan kalian',
      path: '/music-gallery'
    },
    {
      icon: '🎮',
      title: 'Game Kenangan',
      description: 'Bermain game seru sambil mengenang momen-momen indah',
      path: '/game-memory'
    },
    {
      icon: '💌',
      title: 'Time Capsule Digital',
      description: 'Simpan pesan untuk masa depan dan buka di waktu yang tepat',
      path: '/time-capsule'
    }
  ];

  return (
    <div className="landing-page">
      {/* Navigation */}
      <nav className={`navbar ${isScrolled ? 'scrolled' : ''}`}>
        <div className="nav-container">
          <div className="logo">💕 BucinConnect</div>
          <ul className="nav-links">
            <li><a className="nav-link" onClick={() => scrollToSection('home')}>Home</a></li>
            <li><a className="nav-link" onClick={() => scrollToSection('features')}>Fitur</a></li>
            <li><a className="nav-link" onClick={() => scrollToSection('about')}>Tentang</a></li>
          </ul>
          <button className="login-btn" onClick={handleLogin}>Masuk</button>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="hero" id="home">
        <div className="hero-background"></div>
        <div className="hero-content">
          <h1 className="hero-title">Cerita Cinta Kita</h1>
          <p className="hero-subtitle">Tempat spesial untuk menyimpan setiap momen berharga bersama</p>
          <button className="cta-button" onClick={handleLogin}>
            Mulai Perjalanan Kita
          </button>
        </div>
        <div className="scroll-indicator" onClick={() => scrollToSection('features')}>
          <div className="scroll-arrow">⬇</div>
          <div>Scroll untuk melihat lebih</div>
        </div>
      </section>

      {/* Features Section */}
      <section className="features" id="features">
        <div className="container">
          <h2 
            className={`section-title ${animatedElements.has('features-title') ? 'animate' : ''}`}
            data-animate
            id="features-title"
          >
            Fitur Spesial Untuk Kalian
          </h2>
          <div className="features-grid">
            {features.map((feature, index) => (
              <div
                key={index}
                className={`feature-card ${animatedElements.has(`feature-${index}`) ? 'animate' : ''}`}
                data-animate
                id={`feature-${index}`}
                style={{transitionDelay: `${index * 0.1}s`}}
                onClick={() => {
                  // Check if user is authenticated before navigating to feature
                  const isAuthenticated = localStorage.getItem('isAuthenticated') === 'true';
                  if (isAuthenticated) {
                    navigate(feature.path);
                  } else {
                    navigate('/login');
                  }
                }}
              >
                <div className="feature-icon">{feature.icon}</div>
                <h3>{feature.title}</h3>
                <p>{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* About Section */}
      <section className="about" id="about">
        <div className="container">
          <div className="about-content">
            <div className="about-text">
              <h2 
                className={`about-title ${animatedElements.has('about-title') ? 'animate' : ''}`}
                data-animate
                id="about-title"
              >
                Untuk Cinta yang Abadi
              </h2>
              <p 
                className={`about-paragraph ${animatedElements.has('about-p1') ? 'animate' : ''}`}
                data-animate
                id="about-p1"
                style={{transitionDelay: '0.2s'}}
              >
                Setiap hubungan memiliki cerita uniknya sendiri. Platform ini dibuat khusus untuk kalian yang ingin menyimpan, merayakan, dan mengenang setiap momen berharga dalam perjalanan cinta.
              </p>
              <p 
                className={`about-paragraph ${animatedElements.has('about-p2') ? 'animate' : ''}`}
                data-animate
                id="about-p2"
                style={{transitionDelay: '0.4s'}}
              >
                Dari kencan pertama hingga rencana masa depan, dari tawa bersama hingga dukungan di saat sulit - semua terekam dengan indah di sini.
              </p>
              <p 
                className={`about-paragraph ${animatedElements.has('about-p3') ? 'animate' : ''}`}
                data-animate
                id="about-p3"
                style={{transitionDelay: '0.6s'}}
              >
                Mari buat kenangan yang akan kalian hargai selamanya.
              </p>
            </div>
            <div 
              className={`about-image ${animatedElements.has('about-image') ? 'animate' : ''}`}
              data-animate
              id="about-image"
            >
              <div className="heart-illustration">💖</div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="footer">
        <p>&copy; 2025 Our Love Story. Made with 💕 for couples everywhere.</p>
      </footer>
    </div>
  );
};

export default LandingPage;