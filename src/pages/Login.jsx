import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/Login.css';

const Login = () => {
   const [email, setEmail] = useState('');
   const [password, setPassword] = useState('');
   const [error, setError] = useState('');
   const [isLoading, setIsLoading] = useState(false);
   const navigate = useNavigate();

   const handleSubmit = async (e) => {
     e.preventDefault();
     
     // Set loading state
     setIsLoading(true);
     
     // Basic validation (you can expand on this)
     if (!email || !password) {
       setError('Please enter both email and password');
       setIsLoading(false);
       return;
     }

     try {
       // Simulating an authentication process
       // In a real app, you would replace this with an actual API call
       if (email && password) {
         // Clear any previous errors
         setError('');
         
         // Redirect to dashboard
         navigate('/dashboard');
       } else {
         setError('Invalid credentials');
       }
     } catch (err) {
       setError('An error occurred. Please try again.');
     } finally {
       setIsLoading(false);
     }
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