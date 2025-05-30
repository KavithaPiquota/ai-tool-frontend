import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Layout from './components/Layout';
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import Reports from './pages/Reports';
import SearchHistory from './pages/SearchHistory';
import AdminApproval from './pages/AdminApproval';
import './styles/style.css';

function App() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check if user is already logged in
    checkAuthStatus();
  }, []);

  const checkAuthStatus = () => {
    try {
      const token = localStorage.getItem('authToken');
      const userData = localStorage.getItem('userData');
      
      if (token && userData) {
        const parsedUserData = JSON.parse(userData);
        setUser(parsedUserData);
      }
    } catch (error) {
      console.error('Error parsing stored user data:', error);
      // Clear corrupted data
      localStorage.removeItem('authToken');
      localStorage.removeItem('userData');
    } finally {
      setLoading(false);
    }
  };

  const handleLogin = (userData) => {
    setUser(userData);
  };

  const handleLogout = () => {
    setUser(null);
    localStorage.removeItem('authToken');
    localStorage.removeItem('userData');
  };

  // Loading state
  if (loading) {
    return (
      <div className="app-loading">
        <div className="loading-container">
          <svg className="loading-spinner" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 714 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
          </svg>
          <p>Loading application...</p>
        </div>
      </div>
    );
  }

  // Protected Route Component
  const ProtectedRoute = ({ children }) => {
    return user ? children : <Navigate to="/login" replace />;
  };

  return (
    <Router>
      <Routes>
        {/* Default Route - Always redirect to login */}
        <Route path="/" element={<Navigate to="/login" />} />
        
        {/* Public Routes */}
        <Route 
          path="/login" 
          element={<Login onLogin={handleLogin} />} 
        />
        <Route 
          path="/register" 
          element={<Register />} 
        />
        
        {/* Admin Approval Route */}
        <Route 
          path="/admin/approve/:token" 
          element={<AdminApproval />} 
        />
        
        {/* Protected Routes with Layout */}
        <Route 
          path="/dashboard" 
          element={
            <ProtectedRoute>
              <Layout user={user} onLogout={handleLogout}>
                <Dashboard user={user} />
              </Layout>
            </ProtectedRoute>
          } 
        />
        
        <Route 
          path="/report" 
          element={
            <ProtectedRoute>
              <Layout user={user} onLogout={handleLogout}>
                <Reports user={user} />
              </Layout>
            </ProtectedRoute>
          } 
        />
        
        <Route 
          path="/history" 
          element={
            <ProtectedRoute>
              <Layout user={user} onLogout={handleLogout}>
                <SearchHistory user={user} />
              </Layout>
            </ProtectedRoute>
          } 
        />
        
        {/* 404 Route */}
        <Route 
          path="*" 
          element={
            <div className="not-found">
              <h2>404 - Page Not Found</h2>
              <p>The page you're looking for doesn't exist.</p>
              <a href="/login">Go to Login</a>
            </div>
          } 
        />
      </Routes>
    </Router>
  );
}

export default App;