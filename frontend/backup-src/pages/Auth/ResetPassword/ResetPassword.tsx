import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import Icon from '../../../components/Icon';
import './ResetPassword.css';

export const ResetPassword: React.FC = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const token = searchParams.get('token');

  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  const [validating, setValidating] = useState(true);
  const [tokenValid, setTokenValid] = useState(false);

  // Validate token on mount
  useEffect(() => {
    const validateToken = async () => {
      if (!token) {
        setTokenValid(false);
        setValidating(false);
        return;
      }

      try {
        const response = await fetch(`http://localhost:5000/api/auth/validate-reset-token?token=${token}`);
        const data = await response.json();
        
        if (response.ok && data.valid) {
          setTokenValid(true);
        } else {
          setTokenValid(false);
        }
      } catch (err) {
        setTokenValid(false);
      } finally {
        setValidating(false);
      }
    };

    validateToken();
  }, [token]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (password !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    if (password.length < 6) {
      setError('Password must be at least 6 characters');
      return;
    }

    setLoading(true);
    setError('');

    try {
      const response = await fetch('http://localhost:5000/api/auth/reset-password', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ token, password }),
      });

      const data = await response.json();

      if (response.ok) {
        setSuccess(true);
        setTimeout(() => {
          navigate('/login');
        }, 3000);
      } else {
        setError(data.message || 'Failed to reset password');
      }
    } catch (err) {
      setError('An error occurred. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  if (validating) {
    return (
      <div className="auth-wrapper">
        <div className="auth-box">
          <div className="auth-loading">
            <div className="loading-spinner"></div>
            <p>Validating reset link...</p>
          </div>
        </div>
      </div>
    );
  }

  if (!tokenValid) {
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
            </div>
          </div>

          <div className="auth-right">
            <div className="error-state">
              <Icon type="fa" name="FaExclamationTriangle" size={48} color="#c62828" />
              <h3>Invalid or Expired Link</h3>
              <p>The password reset link is invalid or has expired.</p>
              <Link to="/forgot-password" className="auth-btn">
                Request New Link
              </Link>
              <Link to="/login" className="back-link" style={{ marginTop: '15px' }}>
                ← Back to Login
              </Link>
            </div>
          </div>
        </div>
      </div>
    );
  }

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
            <p>Create a new password for your account.</p>
          </div>
        </div>

        <div className="auth-right">
          {success ? (
            <div className="success-message">
              <Icon type="fa" name="FaCheckCircle" size={48} color="#2D5A27" />
              <h4>Password Reset Successfully!</h4>
              <p>Your password has been updated.</p>
              <p className="small">Redirecting to login...</p>
            </div>
          ) : (
            <>
              <h3>Set New Password</h3>

              <form onSubmit={handleSubmit}>
                {error && <div className="auth-error">{error}</div>}

                <div className="form-group">
                  <label>New Password</label>
                  <div className="password-input-wrapper">
                    <Icon type="fa" name="FaLock" size={16} className="input-icon" />
                    <input
                      type={showPassword ? "text" : "password"}
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="••••••••"
                      required
                      minLength={6}
                      disabled={loading}
                    />
                    <button
                      type="button"
                      className="password-toggle"
                      onClick={() => setShowPassword(!showPassword)}
                    >
                      <Icon 
                        type="fa" 
                        name={showPassword ? "FaEyeSlash" : "FaEye"} 
                        size={18} 
                      />
                    </button>
                  </div>
                </div>

                <div className="form-group">
                  <label>Confirm New Password</label>
                  <div className="password-input-wrapper">
                    <Icon type="fa" name="FaLock" size={16} className="input-icon" />
                    <input
                      type={showPassword ? "text" : "password"}
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      placeholder="••••••••"
                      required
                      disabled={loading}
                    />
                  </div>
                </div>

                <button type="submit" className="auth-btn" disabled={loading}>
                  {loading ? 'Resetting...' : 'Reset Password'}
                </button>
              </form>
            </>
          )}
        </div>
      </div>
    </div>
  );
};