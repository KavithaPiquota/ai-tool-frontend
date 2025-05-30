import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import '../styles/AdminApproval.css';

const AdminApproval = () => {
  const { token } = useParams();
  const [loading, setLoading] = useState(true);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');
  const [userInfo, setUserInfo] = useState(null);

  useEffect(() => {
    handleApproval();
  }, [token]);

  const handleApproval = async () => {
    try {
      setLoading(true);
      const response = await axios.get(`http://localhost:5000/api/admin/approve/${token}`);
      
      if (response.data.success) {
        setSuccess(true);
        setUserInfo(response.data.user);
      }
    } catch (error) {
      if (error.response) {
        setError(error.response.data.message || 'Approval failed');
      } else {
        setError('Network error. Please try again.');
      }
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="approval-container">
        <div className="approval-card">
          <div className="loading-spinner"></div>
          <h2>Processing Approval...</h2>
          <p>Please wait while we approve the user.</p>
        </div>
      </div>
    );
  }

  if (success) {
    return (
      <div className="approval-container">
        <div className="approval-card success">
          <div className="success-icon">✓</div>
          <h2>User Approved Successfully!</h2>
          {userInfo && (
            <div className="user-info">
              <p><strong>User:</strong> {userInfo.name}</p>
              <p><strong>Email:</strong> {userInfo.email}</p>
            </div>
          )}
          <p>The user has been notified via email and can now login to the system.</p>
          <button 
            onClick={() => window.close()} 
            className="close-btn"
          >
            Close Window
          </button>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="approval-container">
        <div className="approval-card error">
          <div className="error-icon">✗</div>
          <h2>Approval Failed</h2>
          <p>{error}</p>
          <button 
            onClick={() => window.location.reload()} 
            className="retry-btn"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return null;
};

export default AdminApproval;