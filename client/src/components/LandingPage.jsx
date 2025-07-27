import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Heart, Calendar, Music, Users, Star, Gift, Clock, Gamepad2, Archive } from 'lucide-react';

const LandingPage = () => {
  const navigate = useNavigate();
  const [scrollY, setScrollY] = useState(0);
  const [isVisible, setIsVisible] = useState({});

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          setIsVisible(prev => ({
            ...prev,
            [entry.target.id]: entry.isIntersecting
          }));
        });
      },
      { threshold: 0.1 }
    );

    document.querySelectorAll('[id]').forEach((el) => {
      observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  const handleStartJourney = () => {
    navigate('/login');
  };

  const features = [
    {
      icon: <Clock className="w-8 h-8" />,
      title: "Timeline Hubungan",
      description: "Catat setiap momen berharga dalam perjalanan cinta kalian",
      color: "from-blue-400 to-blue-600"
    },
    {
      icon: <Calendar className="w-8 h-8" />,
      title: "Countdown Special",
      description: "Hitung mundur ke hari-hari istimewa yang akan datang",
      color: "from-pink-400 to-pink-600"
    },
    {
      icon: <Gift className="w-8 h-8" />,
      title: "Wishlist Berdua",
      description: "Buat daftar keinginan dan impian yang ingin dicapai bersama",
      color: "from-purple-400 to-purple-600"
    },
    {
      icon: <Users className="w-8 h-8" />,
      title: "Quiz Pasangan",
      description: "Uji seberapa baik kalian saling mengenal dengan kuis seru",
      color: "from-indigo-400 to-indigo-600"
    },
    {
      icon: <Heart className="w-8 h-8" />,
      title: "Mood Tracker",
      description: "Pantau perasaan kalian setiap hari dan saling support",
      color: "from-red-400 to-red-600"
    },
    {
      icon: <Music className="w-8 h-8" />,
      title: "Galeri Musik Cinta",
      description: "Koleksi lagu-lagu yang menjadi soundtrack hubungan kalian",
      color: "from-green-400 to-green-600"
    },
    {
      icon: <Gamepad2 className="w-8 h-8" />,
      title: "Game Kenangan",
      description: "Bermain game interaktif yang berisi memori manis kalian",
      color: "from-yellow-400 to-yellow-600"
    },
    {
      icon: <Archive className="w-8 h-8" />,
      title: "Time Capsule Digital",
      description: "Simpan pesan dan foto untuk dibuka di masa depan",
      color: "from-teal-400 to-teal-600"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-pink-50 to-purple-50 overflow-hidden">
      {/* Floating Hearts Animation */}
      <div className="fixed inset-0 pointer-events-none">
        {[...Array(6)].map((_, i) => (
          <div
            key={i}
            className="absolute animate-bounce"
            style={{
              left: `${20 + i * 15}%`,
              top: `${10 + i * 10}%`,
              animationDelay: `${i * 0.5}s`,
              animationDuration: `${3 + i * 0.5}s`
            }}
          >
            <Heart className="w-4 h-4 text-pink-300 opacity-60" fill="currentColor" />
          </div>
        ))}
      </div>

      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center px-4">
        <div 
          className="text-center z-10 transform transition-all duration-1000"
          style={{
            transform: `translateY(${scrollY * 0.3}px)`,
          }}
        >
          <div className="mb-8 relative">
            <div className="absolute inset-0 bg-gradient-to-r from-blue-400 to-pink-400 rounded-full blur-xl opacity-30 animate-pulse"></div>
            <Heart className="w-24 h-24 mx-auto text-pink-500 relative animate-pulse" fill="currentColor" />
          </div>
          
          <h1 className="text-6xl md:text-8xl font-bold bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent mb-6 animate-fade-in">
            BucinConnect
          </h1>
          
          <p className="text-xl md:text-2xl text-gray-700 mb-8 max-w-2xl mx-auto leading-relaxed">
            Tempat spesial untuk menyimpan, merayakan, dan menjalani setiap momen indah dalam hubungan kalian
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button 
              onClick={handleStartJourney}
              className="group relative px-8 py-4 bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-full font-semibold text-lg hover:from-blue-600 hover:to-blue-700 transform hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl"
            >
              <span className="relative z-10">Mulai Perjalanan</span>
              <div className="absolute inset-0 bg-gradient-to-r from-pink-500 to-pink-600 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            </button>
            
            <button 
              onClick={() => document.getElementById('features').scrollIntoView({ behavior: 'smooth' })}
              className="px-8 py-4 border-2 border-pink-500 text-pink-600 rounded-full font-semibold text-lg hover:bg-pink-500 hover:text-white transform hover:scale-105 transition-all duration-300"
            >
              Pelajari Lebih Lanjut
            </button>
          </div>
        </div>

        {/* Animated Background Elements */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-20 left-10 w-72 h-72 bg-blue-300 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-blob"></div>
          <div className="absolute top-40 right-10 w-72 h-72 bg-pink-300 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-blob animation-delay-2000"></div>
          <div className="absolute bottom-20 left-20 w-72 h-72 bg-purple-300 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-blob animation-delay-4000"></div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 px-4 relative">
        <div className="max-w-6xl mx-auto">
          <div 
            className={`text-center mb-16 transition-all duration-1000 ${
              isVisible.features ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
            }`}
          >
            <h2 className="text-5xl font-bold bg-gradient-to-r from-blue-600 to-pink-600 bg-clip-text text-transparent mb-6">
              Fitur Istimewa
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Delapan fitur magical yang akan membuat hubungan kalian semakin berkesan
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <div
                key={index}
                className={`group relative p-6 bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg hover:shadow-2xl transform transition-all duration-500 hover:scale-105 ${
                  isVisible.features ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
                }`}
                style={{ transitionDelay: `${index * 100}ms` }}
              >
                <div className={`w-16 h-16 rounded-2xl bg-gradient-to-r ${feature.color} flex items-center justify-center mb-4 group-hover:rotate-12 transition-transform duration-300`}>
                  <div className="text-white">
                    {feature.icon}
                  </div>
                </div>
                
                <h3 className="text-xl font-bold text-gray-800 mb-3 group-hover:text-purple-600 transition-colors">
                  {feature.title}
                </h3>
                
                <p className="text-gray-600 leading-relaxed">
                  {feature.description}
                </p>
                
                {/* Hover effect overlay */}
                <div className="absolute inset-0 bg-gradient-to-r from-blue-500/5 to-pink-500/5 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Call to Action Section */}
      <section id="cta" className="py-20 px-4 relative">
        <div 
          className={`max-w-4xl mx-auto text-center transition-all duration-1000 ${
            isVisible.cta ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
          }`}
        >
          <div className="bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 rounded-3xl p-12 relative overflow-hidden">
            <div className="absolute inset-0 bg-black/10"></div>
            <div className="relative z-10">
              <Star className="w-16 h-16 mx-auto text-white mb-6 animate-spin-slow" />
              <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
                Siap Memulai?
              </h2>
              <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
                Bergabunglah dengan ribuan pasangan yang telah mempercayai platform kami untuk menyimpan kenangan indah mereka
              </p>
              <button 
                onClick={handleStartJourney}
                className="px-10 py-4 bg-white text-purple-600 rounded-full font-bold text-lg hover:bg-gray-100 transform hover:scale-105 transition-all duration-300 shadow-lg"
              >
                Daftar Sekarang - Gratis!
              </button>
            </div>
            
            {/* Animated particles */}
            <div className="absolute inset-0">
              {[...Array(20)].map((_, i) => (
                <div
                  key={i}
                  className="absolute w-2 h-2 bg-white rounded-full opacity-30"
                  style={{
                    left: `${Math.random() * 100}%`,
                    top: `${Math.random() * 100}%`,
                    animation: `float ${3 + Math.random() * 4}s ease-in-out infinite`,
                    animationDelay: `${Math.random() * 2}s`
                  }}
                ></div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Custom CSS Classes */}
      <style>{`
        @keyframes blob {
          0% { transform: translate(0px, 0px) scale(1); }
          33% { transform: translate(30px, -50px) scale(1.1); }
          66% { transform: translate(-20px, 20px) scale(0.9); }
          100% { transform: translate(0px, 0px) scale(1); }
        }
        
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-20px); }
        }
        
        @keyframes fade-in {
          0% { opacity: 0; transform: translateY(30px); }
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
        
        .animate-fade-in {
          animation: fade-in 1s ease-out;
        }
        
        .animate-spin-slow {
          animation: spin 3s linear infinite;
        }
      `}</style>
    </div>
  );
};

export default LandingPage;