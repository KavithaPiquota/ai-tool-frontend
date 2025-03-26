import React, { useState } from 'react';
import axios from 'axios';
import { motion } from 'framer-motion';
import { FaUser, FaEnvelope, FaLock, FaCheck, FaTimes } from 'react-icons/fa';
import '../styles/Register.css';

const Register = () => {
  const [form, setForm] = useState({
    name: '',
    email: '',
    password: '',
    terms: false
  });

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [step, setStep] = useState(1);
  const [showPassword, setShowPassword] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [modalMessage, setModalMessage] = useState('');
  const [isError, setIsError] = useState(false);

  const API_BASE_URL = process.env.REACT_APP_BACKEND_URL;

  // Handle form input changes
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm({
      ...form,
      [name]: type === 'checkbox' ? checked : value
    });

    if (errors[name]) {
      setErrors({ ...errors, [name]: '' });
    }
  };

  // Toggle password visibility
  const togglePasswordVisibility = () => {
    setShowPassword((prev) => !prev);
  };

  // Validate form steps
  const validateStep = (stepNumber) => {
    const newErrors = {};

    if (stepNumber === 1) {
      if (!form.name.trim()) newErrors.name = 'Name is required';
      if (!form.email.trim()) newErrors.email = 'Email is required';
      else if (!/\S+@\S+\.\S+/.test(form.email)) newErrors.email = 'Invalid email address';
      if (!form.password) newErrors.password = 'Password is required';
      else if (form.password.length < 6) newErrors.password = 'Password must be at least 6 characters';
    }

    if (stepNumber === 2 && !form.terms) {
      newErrors.terms = 'You must agree to the terms and conditions';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const nextStep = () => {
    if (validateStep(step)) {
      setStep(step + 1);
    }
  };

  const prevStep = () => {
    setStep(step - 1);
  };

  const closeModal = () => {
    setShowSuccessModal(false);
  };

  // Form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateStep(step)) return;

    setIsSubmitting(true);

    try {
      const res = await axios.post(`${API_BASE_URL}/register`, form);
      setIsSubmitting(false);
      setModalMessage('Registration successful!');
      setIsError(false);
      setShowSuccessModal(true);

      setTimeout(() => {
        window.location.href = '/login';
      }, 2000);
    } catch (err) {
      setIsSubmitting(false);
      const errorMsg = err.response?.data?.message || 'Registration failed';
      setIsError(true);
      setModalMessage(errorMsg);
      setShowSuccessModal(true);

      if (err.response?.data?.errors) {
        setErrors(err.response.data.errors);
      }
    }
  };

  // Render form steps
  const renderStep = () => (
    <motion.div
      initial={{ opacity: 0, x: step === 1 ? -20 : 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: step === 1 ? 20 : -20 }}
      className="form-step"
    >
      {step === 1 ? (
        <>
          <h3 className="step-title">Personal Details</h3>
          <div className="form-group">
            <label>Full Name</label>
            <div className="input-container">
              <FaUser className="input-icon" />
              <input
                type="text"
                name="name"
                placeholder="Enter your name"
                value={form.name}
                onChange={handleChange}
                className={errors.name ? 'error' : ''}
              />
            </div>
            {errors.name && <div className="error-message">{errors.name}</div>}
          </div>

          <div className="form-group">
            <label>Email Address</label>
            <div className="input-container">
              <FaEnvelope className="input-icon" />
              <input
                type="email"
                name="email"
                placeholder="Enter your email"
                value={form.email}
                onChange={handleChange}
                className={errors.email ? 'error' : ''}
              />
            </div>
            {errors.email && <div className="error-message">{errors.email}</div>}
          </div>

          <div className="form-group">
            <label>Password</label>
            <div className="input-container">
              <FaLock className="input-icon" />
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                placeholder="Enter your password"
                value={form.password}
                onChange={handleChange}
                className={errors.password ? 'error' : ''}
              />
              
            </div>
            {errors.password && <div className="error-message">{errors.password}</div>}
          </div>

          <div className="button-container">
            <button type="button" className="next-button" onClick={nextStep}>
              Continue
            </button>
          </div>
        </>
      ) : (
        <>
          <h3 className="step-title">Account Details</h3>
          <div className="form-group checkbox-group">
            <label className="checkbox-container">
              <input
                type="checkbox"
                name="terms"
                checked={form.terms}
                onChange={handleChange}
              />
              <span className="checkbox-label">
                I agree to the <a href="#terms">terms and conditions</a>
              </span>
            </label>
            {errors.terms && <div className="error-message">{errors.terms}</div>}
          </div>

          <div className="button-container">
            <button type="button" className="back-button" onClick={prevStep}>
              Back
            </button>
            <button type="submit" className={`submit-button ${isSubmitting ? 'loading' : ''}`} disabled={isSubmitting}>
              {isSubmitting ? 'Registering...' : 'Create Account'}
            </button>
          </div>
        </>
      )}
    </motion.div>
  );

  return (
    <div className="register-container">
      <div className="register-card">
        <h2>Create an Account</h2>
        <form onSubmit={handleSubmit} className="register-form">
          {renderStep()}
        </form>

        <div className="register-footer">
          <p>Already have an account? <a href="/login">Sign in</a></p>
        </div>

        {showSuccessModal && (
          <div className="modal-overlay">
            <div className="success-modal">
              <button className="modal-close-button" onClick={closeModal}>
                <FaTimes />
              </button>
              <div className="success-icon">{isError ? <FaTimes /> : <FaCheck />}</div>
              <h3>{isError ? 'Failed' : 'Success!'}</h3>
              <p>{modalMessage}</p>
            </div>
          </div>
        )}
      </div>

      {/* Decorative Shapes */}
      <div className="register-decoration">
        <div className="decoration-circle circle-1"></div>
        <div className="decoration-circle circle-2"></div>
        <div className="decoration-circle circle-3"></div>
      </div>
    </div>
  );
};

export default Register;
