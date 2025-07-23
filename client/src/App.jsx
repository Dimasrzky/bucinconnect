import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import './index.css';

// Import Components
import LandingPage from './components/LandingPage';
import LoginPage from './components/LoginPage';
import Dashboard from './components/Dashboard';
import Timeline from './components/Timeline';
import Countdown from './components/Countdown';
import Wishlist from './components/Wishlist';
import Quiz from './components/Quiz';
import MoodTracker from './components/MoodTracker';
import MusicGallery from './components/MusicGallery';
import GameMemory from './components/GameMemory';
import TimeCapsule from './components/TimeCapsule';

// Protected Route Component
const ProtectedRoute = ({ children }) => {
  const isAuthenticated = localStorage.getItem('isAuthenticated') === 'true';
  
  return isAuthenticated ? children : <Navigate to="/login" replace />;
};

// App Component with Routing
const App = () => {
  return (
    <Router>
      <div className="app">
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<LandingPage />} />
          <Route path="/login" element={<LoginPage />} />
          
          {/* Protected Routes */}
          <Route 
            path="/dashboard" 
            element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            } 
          />
          
          <Route 
            path="/timeline" 
            element={
              <ProtectedRoute>
                <Timeline />
              </ProtectedRoute>
            } 
          />
          
          <Route 
            path="/countdown" 
            element={
              <ProtectedRoute>
                <Countdown />
              </ProtectedRoute>
            } 
          />
          
          <Route 
            path="/wishlist" 
            element={
              <ProtectedRoute>
                <Wishlist />
              </ProtectedRoute>
            } 
          />
          
          <Route 
            path="/quiz" 
            element={
              <ProtectedRoute>
                <Quiz />
              </ProtectedRoute>
            } 
          />
          
          <Route 
            path="/mood-tracker" 
            element={
              <ProtectedRoute>
                <MoodTracker />
              </ProtectedRoute>
            } 
          />
          
          <Route 
            path="/music-gallery" 
            element={
              <ProtectedRoute>
                <MusicGallery />
              </ProtectedRoute>
            } 
          />
          
          <Route 
            path="/game-memory" 
            element={
              <ProtectedRoute>
                <GameMemory />
              </ProtectedRoute>
            } 
          />
          
          <Route 
            path="/time-capsule" 
            element={
              <ProtectedRoute>
                <TimeCapsule />
              </ProtectedRoute>
            } 
          />
          
          {/* Fallback Route */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;