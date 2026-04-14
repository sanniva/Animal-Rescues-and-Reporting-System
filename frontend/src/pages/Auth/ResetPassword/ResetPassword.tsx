import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import Icon from '../../../components/Icon';
import './ResetPassword.css';

export const ResetPassword: React.FC = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const token = searchParams.get('token');

  const [password,        setPassword]        = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword,    setShowPassword]    = useState(false);
  const [showConfirm,     setShowConfirm]     = useState(false);
  const [loading,         setLoading]         = useState(false);
  const [error,           setError]           = useState('');
  const [success,         setSuccess]         = useState(false);
  const [validating,      setValidating]      = useState(true);
  const [tokenValid,      setTokenValid]      = useState(false);

  useEffect(() => {
    const validateToken = async () => {
      if (!token) { setTokenValid(false); setValidating(false); return; }
      try {
        const res  = await fetch(`${process.env.REACT_APP_API_URL}/api/auth/validate-reset-token?token=${token}`);
        const data = await res.json();
        setTokenValid(res.ok && data.valid);
      } catch { setTokenValid(false); }
      finally   { setValidating(false); }
    };
    validateToken();
  }, [token]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (password !== confirmPassword) { setError('Passwords do not match'); return; }
    if (password.length < 6)          { setError('Password must be at least 6 characters'); return; }

    setLoading(true); setError('');
    try {
      const res  = await fetch('${process.env.REACT_APP_API_URL}/api/auth/reset-password', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ token, password }),
      });
      const data = await res.json();
      if (res.ok) {
        setSuccess(true);
        setTimeout(() => navigate('/login'), 3000);
      } else {
        setError(data.message || 'Failed to reset password');
      }
    } catch { setError('An error occurred. Please try again.'); }
    finally  { setLoading(false); }
  };

  /* ── Validating ── */
  if (validating) {
    return (
      <div className="auth-page-root">
        <div className="auth-deco-top" />
        <div className="auth-deco-bottom" />
        <div className="auth-deco-wave" />
        <div className="auth-card" style={{ maxWidth: 480, justifyContent: 'center' }}>
          <div className="auth-panel-right" style={{ borderRadius: 40, textAlign: 'center', padding: '56px 48px' }}>
            <div className="auth-spinner-lg" style={{ margin: '0 auto 20px' }} />
            <p style={{ color: '#5c6b5c', fontWeight: 600 }}>Validating reset link…</p>
          </div>
        </div>
      </div>
    );
  }

  /* Invalid / expired token */
  if (!tokenValid) {
    return (
      <div className="auth-page-root">
        <div className="auth-deco-top" />
        <div className="auth-deco-bottom" />
        <div className="auth-deco-wave" />
        <div className="auth-card">
          <div className="auth-panel-left">
            <div className="auth-brand">
              <div className="auth-brand-logo">
                <Icon type="fa" name="FaPaw" size={48} color="#2D5A27" />
              </div>
              <h2>ResQAll Network</h2>
              <p>Protecting every paw on the street.</p>
            </div>
          </div>

          <div className="auth-panel-right" style={{ justifyContent: 'center', textAlign: 'center' }}>
            <div style={{
              width: 64, height: 64, borderRadius: '50%',
              background: '#fff3f3', border: '2px solid #ffd6d6',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              margin: '0 auto 20px',
            }}>
              <Icon type="fa" name="FaExclamationTriangle" size={26} color="#c62828" />
            </div>
            <h3 className="auth-heading" style={{ color: '#c62828' }}>Link Expired</h3>
            <p className="auth-sub" style={{ marginBottom: 28 }}>
              This password reset link is invalid or has expired. Please request a new one to continue.
            </p>
            <Link to="/forgot-password" className="auth-submit" style={{ textDecoration: 'none', justifyContent: 'center' }}>
              <Icon type="fa" name="FaEnvelope" size={14} />
              Request New Link
            </Link>
            <Link to="/login" className="fp-back" style={{ marginTop: 20, justifyContent: 'center' }}>
              <Icon type="fa" name="FaArrowLeft" size={13} />
              Back to login
            </Link>
          </div>
        </div>
      </div>
    );
  }

  /*  Main form  */
  return (
    <div className="auth-page-root">
      <div className="auth-deco-top" />
      <div className="auth-deco-bottom" />
      <div className="auth-deco-wave" />

      <div className="auth-card">
        {/* Left panel */}
        <div className="auth-panel-left">
          <div className="auth-brand">
            <div className="auth-brand-logo">
              <Icon type="fa" name="FaPaw" size={48} color="#2D5A27" />
            </div>
            <h2>ResQAll Network</h2>
            <p>Create a strong new password to secure your account.</p>
          </div>
        </div>

        {/* Right panel */}
        <div className="auth-panel-right">
          {success ? (
            /* ── Success ── */
            <div className="fp-success">
              <div style={{
                width: 64, height: 64, borderRadius: '50%',
                background: '#eaf4e8', border: '2px solid #b8ddb5',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                margin: '0 auto 20px',
              }}>
                <Icon type="fa" name="FaCheckCircle" size={32} color="#2D5A27" />
              </div>
              <h3>Password Reset!</h3>
              <p>Your password has been updated successfully.</p>
              <div style={{
                display: 'flex', alignItems: 'center', gap: 7,
                background: '#F5F1E8', border: '1px solid #e8dfc9',
                borderRadius: 10, padding: '9px 14px',
                fontSize: 13, color: '#5c6b5c',
                margin: '12px 0 24px',
              }}>
                <Icon type="fa" name="FaClock" size={13} color="#5c6b5c" />
                <span>Redirecting to login in 3 seconds…</span>
              </div>
              <Link to="/login" className="auth-submit" style={{ textDecoration: 'none', marginTop: 0 }}>
                <Icon type="fa" name="FaSignInAlt" size={14} />
                Go to Login
              </Link>
            </div>
          ) : (
            /*  Form  */
            <>
              <div className="fp-icon-wrap">
                <Icon type="fa" name="FaLock" size={28} color="#2D5A27" />
              </div>

              <h3 className="auth-heading">Set New Password</h3>
              <p className="auth-sub">Choose a strong password — at least 6 characters.</p>

              {error && (
                <div className="auth-err">
                  <Icon type="fa" name="FaExclamationCircle" size={14} />
                  {error}
                </div>
              )}

              <form onSubmit={handleSubmit}>
                {/* New password */}
                <div className="auth-group">
                  <label>New Password <span className="auth-req">*</span></label>
                  <div className="auth-pass-wrap">
                    <Icon type="fa" name="FaLock" size={14} className="auth-input-icon" />
                    <input
                      type={showPassword ? 'text' : 'password'}
                      placeholder="••••••••"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required minLength={6} disabled={loading}
                    />
                    <button type="button" className="auth-pass-toggle"
                      onClick={() => setShowPassword(!showPassword)} disabled={loading}>
                      <Icon type="fa" name={showPassword ? 'FaEyeSlash' : 'FaEye'} size={15} />
                    </button>
                  </div>
                </div>

                {/* Confirm password */}
                <div className="auth-group">
                  <label>Confirm Password <span className="auth-req">*</span></label>
                  <div className="auth-pass-wrap">
                    <Icon type="fa" name="FaLock" size={14} className="auth-input-icon" />
                    <input
                      type={showConfirm ? 'text' : 'password'}
                      placeholder="••••••••"
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      required disabled={loading}
                    />
                    <button type="button" className="auth-pass-toggle"
                      onClick={() => setShowConfirm(!showConfirm)} disabled={loading}>
                      <Icon type="fa" name={showConfirm ? 'FaEyeSlash' : 'FaEye'} size={15} />
                    </button>
                  </div>
                  {/* Match indicator */}
                  {confirmPassword.length > 0 && (
                    <div style={{
                      marginTop: 6, fontSize: 12, fontWeight: 600,
                      color: password === confirmPassword ? '#2e7d32' : '#c62828',
                      display: 'flex', alignItems: 'center', gap: 5
                    }}>
                      <Icon
                        type="fa"
                        name={password === confirmPassword ? 'FaCheckCircle' : 'FaTimesCircle'}
                        size={12}
                      />
                      {password === confirmPassword ? 'Passwords match' : 'Passwords do not match'}
                    </div>
                  )}
                </div>

                <button type="submit" className="auth-submit" disabled={loading}>
                  {loading ? (
                    <><span className="auth-spinner" />Resetting…</>
                  ) : (
                    <>Reset Password <Icon type="fa" name="FaArrowRight" size={14} /></>
                  )}
                </button>
              </form>

              <Link to="/login" className="fp-back" style={{ marginTop: 20 }}>
                <Icon type="fa" name="FaArrowLeft" size={13} />
                Back to login
              </Link>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

