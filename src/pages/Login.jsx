import React, { useState } from 'react'; 
import '../styles/Login.css';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();
  const API_BASE_URL = import.meta.env.VITE_BACKEND_URL;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const res = await axios.post(`${API_BASE_URL}/login`, {
        email,
        password,
      });
      localStorage.setItem('token', res.data.token);
      navigate('/dashboard');
    } catch (err) {
      console.error(err.response?.data || err.message);
      alert(err.response?.data?.message || 'Login failed');
    } finally {
      setIsLoading(false);
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

   return (
     <div className="login-container">
       <div className="login-left-section">
         <div className="company-branding">
           <div className="decoration-shapes">
             <div className="shape shape-1"></div>
             <div className="shape shape-2"></div>
             <div className="shape shape-3"></div>
             <div className="shape shape-4"></div>
             <div className="shape shape-5"></div>
             <div className="shape shape-6"></div>
           </div>
         </div>
         <div className="login-right-section">
           <div className="login-box">
             <h2>Welcome Back</h2>
             <p className="login-subtitle">Enter your credentials to access your account</p>
             
             {error && <p className="error-message">{error}</p>}
             
             <form onSubmit={handleSubmit}>
               {/* Email Field */}
               <div className="form-group">
                 <label>Email Address</label>
                 <div className="input-container">
                   <i className="input-icon email-icon"></i>
                   <input
                     type="email"
                     value={email}
                     onChange={(e) => setEmail(e.target.value)}
                     placeholder="Enter your email"
                     required
                   />
                 </div>
               </div>
               
               {/* Password Field */}
               <div className="form-group">
                 <div className="password-header">
                   <label>Password</label>
                   <a href="/forgot-password" className="forgot-password">Forgot Password?</a>
                 </div>
                 <div className="input-container">
                   <i className="input-icon password-icon"></i>
                   <input
                     type="password"
                     value={password}
                     onChange={(e) => setPassword(e.target.value)}
                     placeholder="••••••••"
                     required
                   />
                 </div>
               </div>
               
               {/* Submit Button */}
               <button
                 type="submit"
                 className={`login-button ${isLoading ? 'loading' : ''}`}
                 disabled={isLoading}
               >
                 {isLoading ? 'Signing in...' : 'Log In'}
               </button>
             </form>
             
             <div className="login-footer">
               <p>Don't have an account? <a href="/register">Sign up</a></p>
             </div>
           </div>
         </div>
       </div>
     </div>
   );
};

export default Login;