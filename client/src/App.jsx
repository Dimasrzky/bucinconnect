import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import LandingPage from './components/pages/LandingPage';
import LoginPage from './components/pages/LoginPage';
import Dashboard from './components/pages/Dashboard';
import Timeline from './components/pages/Timeline';
import Countdown from './components/pages/Countdown';
import Wishlist from './components/pages/Wishlist';
import Quiz from './components/pages/Quiz';
import MoodTracker from './components/pages/MoodTracker';
import MusicGallery from './components/pages/MusicGallery';
import GameMemory from './components/pages/GameMemory';
import TimeCapsule from './components/pages/TimeCapsule';

// Context untuk authentication state
export const AuthContext = React.createContext();

// Protected Route Component
const ProtectedRoute = ({ children }) => {
  const { isAuthenticated } = React.useContext(AuthContext);
  return isAuthenticated ? children : <Navigate to="/login" replace />;
};

// Public Route Component (redirect to dashboard if already authenticated)
const PublicRoute = ({ children }) => {
  const { isAuthenticated } = React.useContext(AuthContext);
  return !isAuthenticated ? children : <Navigate to="/dashboard" replace />;
};

function App() {
  const [isAuthenticated, setIsAuthenticated] = React.useState(false);
  const [user, setUser] = React.useState(null);
  const [loading, setLoading] = React.useState(true);

  // Check authentication status on app load
  React.useEffect(() => {
    const checkAuthStatus = () => {
      try {
        const token = localStorage.getItem('authToken');
        const userData = localStorage.getItem('userData');
        
        if (token && userData) {
          const parsedUserData = JSON.parse(userData);
          
          // Validate token expiry if exists
          const tokenExpiry = localStorage.getItem('tokenExpiry');
          if (tokenExpiry && new Date().getTime() > parseInt(tokenExpiry)) {
            // Token expired
            logout();
            return;
          }
          
          setUser(parsedUserData);
          setIsAuthenticated(true);
        }
      } catch (error) {
        console.error('Error parsing user data:', error);
        // Clear corrupted data
        localStorage.removeItem('authToken');
        localStorage.removeItem('userData');
        localStorage.removeItem('tokenExpiry');
      } finally {
        setLoading(false);
      }
    };

    checkAuthStatus();
  }, []);

  // Login function
  const login = (token, userData, expiresIn = null) => {
    try {
      localStorage.setItem('authToken', token);
      localStorage.setItem('userData', JSON.stringify(userData));
      
      // Set token expiry if provided (in milliseconds)
      if (expiresIn) {
        const expiryTime = new Date().getTime() + expiresIn;
        localStorage.setItem('tokenExpiry', expiryTime.toString());
      }
      
      setUser(userData);
      setIsAuthenticated(true);
    } catch (error) {
      console.error('Error during login:', error);
    }
  };

  // Logout function
  const logout = () => {
    try {
      localStorage.removeItem('authToken');
      localStorage.removeItem('userData');
      localStorage.removeItem('tokenExpiry');
      setUser(null);
      setIsAuthenticated(false);
    } catch (error) {
      console.error('Error during logout:', error);
    }
  };

  // Show loading spinner while checking auth
  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-pink-50 to-purple-50 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-pink-200 border-t-pink-500 rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600 font-medium">Loading Love Story...</p>
          <div className="mt-2 text-sm text-gray-400">
            Preparing your romantic journey ✨
          </div>
        </div>
      </div>
    );
  }

  return (
    <AuthContext.Provider value={{
      isAuthenticated,
      user,
      login,
      logout
    }}>
      <Router>
        <div className="App">
          <Routes>
            {/* Public Routes */}
            <Route 
              path="/" 
              element={
                <PublicRoute>
                  <LandingPage />
                </PublicRoute>
              } 
            />
            <Route 
              path="/login" 
              element={
                <PublicRoute>
                  <LoginPage />
                </PublicRoute>
              } 
            />
            
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
            
            {/* Catch all route - redirect to dashboard if authenticated, login if not */}
            <Route 
              path="*" 
              element={
                isAuthenticated ? 
                  <Navigate to="/dashboard" replace /> : 
                  <Navigate to="/login" replace />
              } 
            />
          </Routes>
        </div>
      </Router>
    </AuthContext.Provider>
  );
}

export default App;