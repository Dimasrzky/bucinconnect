import React, { useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { Heart, Eye, EyeOff, Mail, Lock, User, ArrowRight, Sparkles } from 'lucide-react';
import { AuthContext } from '../App';

const LoginPage = () => {
  const navigate = useNavigate();
  const { login } = useContext(AuthContext);
  const [isLogin, setIsLogin] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    name: '',
    partnerName: '',
    confirmPassword: ''
  });
  const [hearts, setHearts] = useState([]);

  // Generate floating hearts
  useEffect(() => {
    const generateHearts = () => {
      const newHearts = [];
      for (let i = 0; i < 15; i++) {
        newHearts.push({
          id: i,
          left: Math.random() * 100,
          delay: Math.random() * 5,
          duration: 3 + Math.random() * 2,
          size: 0.5 + Math.random() * 0.5
        });
      }
      setHearts(newHearts);
    };

    generateHearts();
    const interval = setInterval(generateHearts, 10000);
    return () => clearInterval(interval);
  }, []);

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
    // Clear error when user starts typing
    if (error) setError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const endpoint = isLogin ? '/api/auth/login' : '/api/auth/register';
      const payload = isLogin 
        ? { email: formData.email, password: formData.password }
        : { 
            email: formData.email, 
            password: formData.password, 
            name: formData.name, 
            partnerName: formData.partnerName 
          };

      // Validation for register
      if (!isLogin) {
        if (formData.password !== formData.confirmPassword) {
          setError('Password tidak sama');
          setLoading(false);
          return;
        }
        if (formData.password.length < 6) {
          setError('Password minimal 6 karakter');
          setLoading(false);
          return;
        }
      }

      const response = await fetch(`http://localhost:5000${endpoint}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });

      const data = await response.json();

      if (response.ok) {
        // Login successful
        login(data.token, data.user);
        navigate('/dashboard');
      } else {
        setError(data.message || 'Terjadi kesalahan');
      }
    } catch (error) {
      console.error('Auth error:', error);
      setError('Tidak dapat terhubung ke server');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 via-purple-50 to-pink-100 flex items-center justify-center p-4 relative overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-20 left-20 w-96 h-96 bg-blue-300 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob"></div>
        <div className="absolute top-40 right-20 w-96 h-96 bg-pink-300 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-2000"></div>
        <div className="absolute bottom-20 left-1/2 w-96 h-96 bg-purple-300 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-4000"></div>
      </div>

      {/* Floating Hearts */}
      <div className="absolute inset-0 pointer-events-none">
        {hearts.map((heart) => (
          <div
            key={heart.id}
            className="absolute animate-float-up"
            style={{
              left: `${heart.left}%`,
              animationDelay: `${heart.delay}s`,
              animationDuration: `${heart.duration}s`,
              transform: `scale(${heart.size})`
            }}
          >
            <Heart className="w-6 h-6 text-pink-400 opacity-60" fill="currentColor" />
          </div>
        ))}
      </div>

      {/* Main Container */}
      <div className="relative z-10 w-full max-w-md">
        {/* Logo/Header */}
        <div className="text-center mb-8 animate-fade-in">
          <div className="relative inline-block">
            <div className="absolute inset-0 bg-gradient-to-r from-blue-400 to-pink-400 rounded-full blur-lg opacity-40 animate-pulse"></div>
            <Heart className="w-16 h-16 mx-auto text-pink-500 relative animate-heartbeat" fill="currentColor" />
          </div>
          <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-pink-600 bg-clip-text text-transparent mt-4 mb-2">
            BucinConnect
          </h1>
          <p className="text-gray-600">
            {isLogin ? 'Masuk ke dunia kenangan kalian' : 'Mulai perjalanan cinta kalian'}
          </p>
        </div>

        {/* Form Container */}
        <div className="bg-white/90 backdrop-blur-sm rounded-3xl shadow-2xl p-8 transform transition-all duration-500 hover:shadow-3xl animate-slide-up">
          {/* Form Toggle */}
          <div className="flex bg-gray-100 rounded-2xl p-1 mb-8">
            <button
              onClick={() => {
                setIsLogin(true);
                setError('');
                setFormData({
                  email: '',
                  password: '',
                  name: '',
                  partnerName: '',
                  confirmPassword: ''
                });
              }}
              className={`flex-1 py-3 px-4 rounded-xl font-semibold transition-all duration-300 ${
                isLogin
                  ? 'bg-gradient-to-r from-blue-500 to-blue-600 text-white shadow-lg'
                  : 'text-gray-600 hover:text-gray-800'
              }`}
            >
              Masuk
            </button>
            <button
              onClick={() => {
                setIsLogin(false);
                setError('');
                setFormData({
                  email: '',
                  password: '',
                  name: '',
                  partnerName: '',
                  confirmPassword: ''
                });
              }}
              className={`flex-1 py-3 px-4 rounded-xl font-semibold transition-all duration-300 ${
                !isLogin
                  ? 'bg-gradient-to-r from-pink-500 to-pink-600 text-white shadow-lg'
                  : 'text-gray-600 hover:text-gray-800'
              }`}
            >
              Daftar
            </button>
          </div>

          {/* Error Message */}
          {error && (
            <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-xl">
              <p className="text-red-600 text-sm">{error}</p>
            </div>
          )}

          {/* Demo Mode Notice */}
          <div className="mb-6 p-4 bg-blue-50 border border-blue-200 rounded-xl">
            <p className="text-blue-600 text-sm">
              <Sparkles className="w-4 h-4 inline mr-2" />
              Mode Demo: Gunakan email/password apapun untuk masuk
            </p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-6">
            {!isLogin && (
              <>
                {/* Name Field */}
                <div className="group">
                  <label className="block text-gray-700 text-sm font-semibold mb-2">
                    Nama Anda
                  </label>
                  <div className="relative">
                    <User className="absolute left-4 top-4 w-5 h-5 text-gray-400 group-focus-within:text-blue-500 transition-colors" />
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      className="w-full pl-12 pr-4 py-4 border-2 border-gray-200 rounded-2xl focus:border-blue-500 focus:outline-none transition-all duration-300 bg-gray-50 focus:bg-white"
                      placeholder="Masukkan nama Anda"
                      required={!isLogin}
                    />
                  </div>
                </div>

                {/* Partner Name Field */}
                <div className="group">
                  <label className="block text-gray-700 text-sm font-semibold mb-2">
                    Nama Pasangan
                  </label>
                  <div className="relative">
                    <Heart className="absolute left-4 top-4 w-5 h-5 text-gray-400 group-focus-within:text-pink-500 transition-colors" />
                    <input
                      type="text"
                      name="partnerName"
                      value={formData.partnerName}
                      onChange={handleInputChange}
                      className="w-full pl-12 pr-4 py-4 border-2 border-gray-200 rounded-2xl focus:border-pink-500 focus:outline-none transition-all duration-300 bg-gray-50 focus:bg-white"
                      placeholder="Masukkan nama pasangan"
                      required={!isLogin}
                    />
                  </div>
                </div>
              </>
            )}

            {/* Email Field */}
            <div className="group">
              <label className="block text-gray-700 text-sm font-semibold mb-2">
                Email
              </label>
              <div className="relative">
                <Mail className="absolute left-4 top-4 w-5 h-5 text-gray-400 group-focus-within:text-blue-500 transition-colors" />
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  className="w-full pl-12 pr-4 py-4 border-2 border-gray-200 rounded-2xl focus:border-blue-500 focus:outline-none transition-all duration-300 bg-gray-50 focus:bg-white"
                  placeholder="masukkan@email.com"
                  required
                />
              </div>
            </div>

            {/* Password Field */}
            <div className="group">
              <label className="block text-gray-700 text-sm font-semibold mb-2">
                Password
              </label>
              <div className="relative">
                <Lock className="absolute left-4 top-4 w-5 h-5 text-gray-400 group-focus-within:text-blue-500 transition-colors" />
                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  value={formData.password}
                  onChange={handleInputChange}
                  className="w-full pl-12 pr-12 py-4 border-2 border-gray-200 rounded-2xl focus:border-blue-500 focus:outline-none transition-all duration-300 bg-gray-50 focus:bg-white"
                  placeholder="Masukkan password"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-4 w-5 h-5 text-gray-400 hover:text-gray-600 transition-colors"
                >
                  {showPassword ? <EyeOff /> : <Eye />}
                </button>
              </div>
            </div>

            {!isLogin && (
              <div className="group">
                <label className="block text-gray-700 text-sm font-semibold mb-2">
                  Konfirmasi Password
                </label>
                <div className="relative">
                  <Lock className="absolute left-4 top-4 w-5 h-5 text-gray-400 group-focus-within:text-pink-500 transition-colors" />
                  <input
                    type="password"
                    name="confirmPassword"
                    value={formData.confirmPassword}
                    onChange={handleInputChange}
                    className="w-full pl-12 pr-4 py-4 border-2 border-gray-200 rounded-2xl focus:border-pink-500 focus:outline-none transition-all duration-300 bg-gray-50 focus:bg-white"
                    placeholder="Konfirmasi password"
                    required={!isLogin}
                  />
                </div>
              </div>
            )}

            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading}
              className={`group w-full py-4 px-6 rounded-2xl font-bold text-lg text-white shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 flex items-center justify-center space-x-2 ${
                loading 
                  ? 'bg-gray-400 cursor-not-allowed' 
                  : isLogin
                    ? 'bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700'
                    : 'bg-gradient-to-r from-pink-500 to-pink-600 hover:from-pink-600 hover:to-pink-700'
              }`}
            >
              {loading ? (
                <>
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  <span>Loading...</span>
                </>
              ) : (
                <>
                  <span>{isLogin ? 'Masuk' : 'Daftar'}</span>
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </>
              )}
            </button>
          </form>

          {/* Additional Options */}
          <div className="mt-8 text-center space-y-4">
            {isLogin && (
              <button className="text-blue-600 hover:text-blue-700 font-medium transition-colors">
                Lupa password?
              </button>
            )}
            
            <div className="flex items-center space-x-2 justify-center">
              <Sparkles className="w-4 h-4 text-purple-500" />
              <span className="text-gray-600 text-sm">
                {isLogin ? 'Belum punya akun?' : 'Sudah punya akun?'}
              </span>
              <button
                type="button"
                onClick={() => {
                  setIsLogin(!isLogin);
                  setError('');
                  setFormData({
                    email: '',
                    password: '',
                    name: '',
                    partnerName: '',
                    confirmPassword: ''
                  });
                }}
                className="text-purple-600 hover:text-purple-700 font-medium transition-colors"
              >
                {isLogin ? 'Daftar di sini' : 'Masuk di sini'}
              </button>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="text-center mt-8 text-gray-500 text-sm animate-fade-in">
          <p>Dibuat dengan ❤️ untuk pasangan yang saling mencinta</p>
        </div>

        {/* Back to Home */}
        <div className="text-center mt-4">
          <button
            onClick={() => navigate('/')}
            className="text-gray-600 hover:text-gray-800 font-medium transition-colors"
          >
            ← Kembali ke Home
          </button>
        </div>
      </div>

      {/* Custom CSS Classes */}
      <style>{`
        @keyframes blob {
          0% { transform: translate(0px, 0px) scale(1); }
          33% { transform: translate(30px, -50px) scale(1.1); }
          66% { transform: translate(-20px, 20px) scale(0.9); }
          100% { transform: translate(0px, 0px) scale(1); }
        }
        
        @keyframes float-up {
          0% { 
            transform: translateY(100vh) rotate(0deg);
            opacity: 0;
          }
          10% { opacity: 1; }
          90% { opacity: 1; }
          100% { 
            transform: translateY(-100px) rotate(360deg);
            opacity: 0;
          }
        }
        
        @keyframes heartbeat {
          0%, 100% { transform: scale(1); }
          50% { transform: scale(1.1); }
        }
        
        @keyframes fade-in {
          0% { opacity: 0; transform: translateY(20px); }
          100% { opacity: 1; transform: translateY(0); }
        }
        
        @keyframes slide-up {
          0% { opacity: 0; transform: translateY(40px); }
          100% { opacity: 1; transform: translateY(0); }
        }
        
        .animate-blob {
          animation: blob 7s infinite;
        }
        
        .animation-delay-2000 {
          animation-delay: 2s;
        }
        
        .animation-delay-4000 {
          animation-delay: 4s;
        }
        
        .animate-float-up {
          animation: float-up linear infinite;
        }
        
        .animate-heartbeat {
          animation: heartbeat 2s ease-in-out infinite;
        }
        
        .animate-fade-in {
          animation: fade-in 1s ease-out;
        }
        
        .animate-slide-up {
          animation: slide-up 0.8s ease-out;
        }
        
        .shadow-3xl {
          box-shadow: 0 35px 60px -12px rgba(0, 0, 0, 0.25);
        }
      `}</style>
    </div>
  );
};

export default LoginPage;