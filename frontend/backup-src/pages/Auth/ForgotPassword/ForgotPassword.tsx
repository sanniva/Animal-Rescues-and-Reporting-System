import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Icon from '../../../components/Icon';
import './ForgotPassword.css';

export const ForgotPassword: React.FC = () => {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const response = await fetch('http://localhost:5000/api/auth/forgot-password', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      });

      const data = await response.json();

      if (response.ok) {
        setSuccess(true);
      } else {
        setError(data.message || 'Failed to send reset email');
      }
    } catch (err) {
      setError('An error occurred. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-wrapper">
      <div className="bg-shape-top"></div>
      <div className="bg-shape-bottom"></div>
      <div className="bg-wave"></div>

      <div className="auth-box">
        <div className="auth-left">
          <div className="auth-left-overlay">
            <div className="logo">
              <Icon type="fa" name="FaPaw" size={48} color="#2D5A27" />
            </div>
            <h2>ResQAll Network</h2>
            <p>Protecting every paw on the street.</p>
          </div>
        </div>

        <div className="auth-right">
          <h3>Reset Password</h3>
          
          {success ? (
            <div className="success-message">
              <Icon type="fa" name="FaCheckCircle" size={48} color="#2D5A27" />
              <h4>Check Your Email</h4>
              <p>We've sent a password reset link to <strong>{email}</strong></p>
              <p className="small">The link will expire in 1 hour.</p>
              <Link to="/login" className="auth-btn" style={{ marginTop: '20px' }}>
                Return to Login
              </Link>
            </div>
          ) : (
            <form onSubmit={handleSubmit}>
              <p className="instruction">
                Enter your email address and we'll send you a link to reset your password.
              </p>

              {error && <div className="auth-error">{error}</div>}

              <div className="form-group">
                <label>Email Address</label>
                <div className="input-wrapper">
                  <Icon type="fa" name="FaEnvelope" size={16} className="input-icon" />
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="sam@resqall.com"
                    required
                    disabled={loading}
                  />
                </div>
              </div>

              <button type="submit" className="auth-btn" disabled={loading}>
                {loading ? 'Sending...' : 'Send Reset Link'}
              </button>

              <div className="auth-links">
                <Link to="/login" className="back-link">
                  ← Back to Login
                </Link>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};