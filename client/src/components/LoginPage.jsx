import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const LoginPage = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  const [validationErrors, setValidationErrors] = useState({});

  useEffect(() => {
    // Check if user is already authenticated
    const isAuthenticated = localStorage.getItem('isAuthenticated') === 'true';
    if (isAuthenticated) {
      navigate('/dashboard');
    }
  }, [navigate]);

  useEffect(() => {
    // Create floating hearts animation
    const createFloatingHeart = () => {
      const heart = document.createElement('div');
      heart.innerHTML = ['💕', '💖', '💝', '💗', '💓'][Math.floor(Math.random() * 5)];
      heart.className = 'login-floating-heart';
      heart.style.cssText = `
        position: fixed;
        left: ${Math.random() * 100}vw;
        top: 100vh;
        font-size: 2rem;
        color: rgba(255, 255, 255, 0.1);
        pointer-events: none;
        z-index: 1;
        animation: loginFloatUp 15s infinite linear;
      `;
      document.body.appendChild(heart);
      setTimeout(() => heart.remove(), 15000);
    };

    // Create particles
    const createParticle = () => {
      const particle = document.createElement('div');
      particle.className = 'login-particle';
      particle.style.cssText = `
        position: fixed;
        width: 4px;
        height: 4px;
        background: rgba(255, 255, 255, 0.8);
        border-radius: 50%;
        left: ${Math.random() * 100}vw;
        top: 100vh;
        pointer-events: none;
        z-index: 2;
        animation: particleFloat ${Math.random() * 3 + 2}s linear forwards;
      `;
      document.body.appendChild(particle);
      setTimeout(() => particle.remove(), 5000);
    };

    const heartInterval = setInterval(createFloatingHeart, 2000);
    const particleInterval = setInterval(createParticle, 300);

    return () => {
      clearInterval(heartInterval);
      clearInterval(particleInterval);
    };
  }, []);

  // Mouse follow effect
  useEffect(() => {
    let mouseX = 0;
    let mouseY = 0;
    let cardX = 0;
    let cardY = 0;

    const handleMouseMove = (e) => {
      mouseX = (e.clientX - window.innerWidth / 2) / 50;
      mouseY = (e.clientY - window.innerHeight / 2) / 50;
    };

    const animateCard = () => {
      cardX += (mouseX - cardX) * 0.1;
      cardY += (mouseY - cardY) * 0.1;
      
      const loginCard = document.querySelector('.login-card');
      if (loginCard) {
        loginCard.style.transform = `translateY(0px) rotateX(${cardY}deg) rotateY(${cardX}deg)`;
      }
      
      requestAnimationFrame(animateCard);
    };

    document.addEventListener('mousemove', handleMouseMove);
    animateCard();

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const validatePassword = (password) => {
    return password.length >= 6;
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));

    // Real-time validation
    const newValidationErrors = { ...validationErrors };
    
    if (name === 'email') {
      if (value === '') {
        delete newValidationErrors.email;
      } else if (validateEmail(value)) {
        newValidationErrors.email = 'valid';
      } else {
        newValidationErrors.email = 'invalid';
      }
    }

    if (name === 'password') {
      if (value === '') {
        delete newValidationErrors.password;
      } else if (validatePassword(value)) {
        newValidationErrors.password = 'valid';
      } else {
        newValidationErrors.password = 'invalid';
      }
    }

    setValidationErrors(newValidationErrors);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    try {
      // Simulate API call
      await simulateLogin(formData.email, formData.password);
      setSuccess(true);
      
      // Store authentication status
      localStorage.setItem('isAuthenticated', 'true');
      localStorage.setItem('userEmail', formData.email);
      
      setTimeout(() => {
        navigate('/dashboard');
      }, 1500);
    } catch (err) {
      setError('Email atau password salah. Silakan coba lagi.');
      // Add shake animation
      const loginCard = document.querySelector('.login-card');
      if (loginCard) {
        loginCard.classList.add('shake');
        setTimeout(() => {
          loginCard.classList.remove('shake');
        }, 500);
      }
    } finally {
      setIsLoading(false);
    }
  };

  const simulateLogin = async (email, password) => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        // Demo credentials for success
        if (email === 'couple@love.com' && password === 'password123') {
          resolve();
        } else {
          reject(new Error('Invalid credentials'));
        }
      }, 2000);
    });
  };

  const handleSocialLogin = (provider) => {
    alert(`Login dengan ${provider} akan segera tersedia!`);
  };

  const handleForgotPassword = () => {
    alert('Fitur lupa password akan segera tersedia! 🔑');
  };

  const handleRegister = () => {
    alert('Halaman registrasi akan segera tersedia! 📝');
  };

  const handleBack = () => {
    navigate('/');
  };

  return (
    <div className="login-page">
      {/* Back Button */}
      <button className="back-button" onClick={handleBack}>
        <span>←</span>
        <span>Kembali</span>
      </button>

      {/* Login Container */}
      <div className="login-container">
        <div className="login-card">
          <div className="login-header">
            <div className="logo">💕</div>
            <h1 className="login-title">Selamat Datang</h1>
            <p className="login-subtitle">Masuk ke dunia cinta kalian</p>
          </div>

          {/* Error Message */}
          {error && (
            <div className="error-message">
              {error}
            </div>
          )}

          {/* Success Checkmark */}
          {success && (
            <div className="success-checkmark">
              <div className="checkmark">✓</div>
            </div>
          )}

          <form className="login-form" onSubmit={handleSubmit}>
            <div className="form-group">
              <input
                type="email"
                name="email"
                className={`form-input ${
                  validationErrors.email === 'valid' ? 'success' : 
                  validationErrors.email === 'invalid' ? 'error' : ''
                }`}
                placeholder=" "
                value={formData.email}
                onChange={handleInputChange}
                required
              />
              <div className="form-icon">📧</div>
              <label className="form-label">Email</label>
            </div>

            <div className="form-group">
              <input
                type="password"
                name="password"
                className={`form-input ${
                  validationErrors.password === 'valid' ? 'success' : 
                  validationErrors.password === 'invalid' ? 'error' : ''
                }`}
                placeholder=" "
                value={formData.password}
                onChange={handleInputChange}
                required
              />
              <div className="form-icon">🔒</div>
              <label className="form-label">Password</label>
            </div>

            <div className="forgot-password">
              <a onClick={handleForgotPassword}>Lupa password?</a>
            </div>

            <button 
              type="submit" 
              className="login-button"
              disabled={isLoading}
            >
              <div className="button-content">
                {isLoading ? (
                  <>
                    <div className="spinner"></div>
                    <span>Masuk...</span>
                  </>
                ) : (
                  <span>Masuk</span>
                )}
              </div>
            </button>
          </form>

          <div className="divider">
            <span>atau masuk dengan</span>
          </div>

          <div className="social-login">
            <button 
              className="social-button google" 
              onClick={() => handleSocialLogin('Google')}
            >
              <span>🔍</span>
              <span>Google</span>
            </button>
            <button 
              className="social-button facebook" 
              onClick={() => handleSocialLogin('Facebook')}
            >
              <span>📘</span>
              <span>Facebook</span>
            </button>
          </div>

          <div className="register-link">
            <p>
              Belum punya akun?{' '}
              <a onClick={handleRegister}>Daftar di sini</a>
            </p>
          </div>
        </div>
      </div>

      {/* Demo Info */}
      <div className="demo-info">
        <strong>Demo Login:</strong><br />
        Email: couple@love.com<br />
        Password: password123
      </div>
    </div>
  );
};

export default LoginPage;