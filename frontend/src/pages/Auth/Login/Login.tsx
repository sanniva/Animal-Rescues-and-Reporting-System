import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Icon from "../../../components/Icon";
import { useAuth } from "../../../context/AuthContext";
import "./login.css";

export const Login: React.FC = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [formData, setFormData] = useState({
    username: "", email: "", password: "", confirmPassword: "",
    phone: "", isVolunteer: false,
    hasCar: false, canFoster: false, animalHandling: "", city: "",
  });

  const navigate = useNavigate();
  const { login, register, user, loading: authLoading } = useAuth();

  useEffect(() => {
    const storedUser = sessionStorage.getItem('resqall_user') || localStorage.getItem('resqall_user');
    const token = sessionStorage.getItem('token') || localStorage.getItem('token');
    if ((storedUser && token) || user) navigate("/dashboard");
  }, [navigate, user]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, type, value, checked } = e.target;
    if (name === "phone") {
      setFormData({ ...formData, phone: value.replace(/\D/g, "") }); return;
    }
    setFormData({ ...formData, [name]: type === "checkbox" ? checked : value });
  };

  const validatePhone = (p: string) => /^9[78]\d{8}$/.test(p.replace(/[\s\-+]/g, ''));
  const validateEmail = (e: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(e);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(""); setLoading(true);
    try {
      if (isLogin) {
        const ok = await login(formData.email.trim(), formData.password, rememberMe);
        if (ok) navigate("/dashboard"); else setError("Invalid email or password");
      } else {
        if (formData.password !== formData.confirmPassword) { setError("Passwords don't match"); setLoading(false); return; }
        if (/^\s/.test(formData.username)) { setError("Username cannot start with spaces"); setLoading(false); return; }
        if (formData.username.trim().length < 3) { setError("Username must be at least 3 characters"); setLoading(false); return; }
        if (formData.username.trim().length > 30) { setError("Username must be less than 30 characters"); setLoading(false); return; }
        if (formData.password.length < 6) { setError("Password must be at least 6 characters"); setLoading(false); return; }
        if (!validateEmail(formData.email.trim())) { setError("Please enter a valid email address"); setLoading(false); return; }
        if (!formData.phone) { setError("Phone number is required"); setLoading(false); return; }
        const phone = formData.phone.replace(/[\s\-+]/g, '');
        if (!validatePhone(phone)) { setError("Please enter a valid 10-digit Nepali mobile number (starting with 98 or 97)"); setLoading(false); return; }
        if (formData.isVolunteer) {
          if (!formData.city.trim()) { setError("City is required for volunteers"); setLoading(false); return; }
          if (!formData.animalHandling.trim()) { setError("Please specify which animals you can handle"); setLoading(false); return; }
        }
        const ok = await register(
          formData.username.trim(), formData.email.trim(), formData.password, phone,
          formData.isVolunteer,
          formData.isVolunteer ? {
            hasCar: formData.hasCar, canFoster: formData.canFoster,
            animalHandling: formData.animalHandling.trim(), city: formData.city.trim()
          } : undefined
        );
        if (ok) navigate("/dashboard"); else setError("Registration failed - username or email may already exist");
      }
    } catch (err: any) {
      setError(err.message || "An error occurred. Please try again.");
    } finally { setLoading(false); }
  };

  const switchMode = () => {
    if (loading) return;
    setIsLogin(!isLogin); setError("");
    setFormData({ username: "", email: "", password: "", confirmPassword: "",
      phone: "", isVolunteer: false, hasCar: false, canFoster: false, animalHandling: "", city: "" });
    setRememberMe(false);
  };

  if (authLoading) {
    return (
      <div className="auth-loading-screen">
        <div className="auth-spinner-lg" />
        <p>Loading...</p>
      </div>
    );
  }

  return (
    /* auth-page-root uses position:fixed to take over the entire screen
       independently of any parent overflow/height constraints */
    <div className="auth-page-root">
      {/* Decorative background elements */}
      <div className="auth-deco-top" />
      <div className="auth-deco-bottom" />
      <div className="auth-deco-wave" />
      <div className="auth-card">

        {/* Left green panel */}
        <div className="auth-panel-left">
          <div className="auth-brand">
            <div className="auth-brand-logo">
              <Icon type="fa" name="FaPaw" size={48} color="#2D5A27" />
            </div>
            <h2>ResQAll Network</h2>
            <p>Protecting every paw on the street. Join our mission.</p>
          </div>
        </div>

        {/* Right form panel */}
        <div className="auth-panel-right">

          <h3 className="auth-heading">{isLogin ? "Mission Check-in" : "Join the Squad"}</h3>

          {!isLogin && (
            <p className="auth-sub">
              Create your account and become a hero for animals in need
            </p>
          )}

          {error && <div className="auth-err">{error}</div>}

          <form onSubmit={handleSubmit}>

            {!isLogin && (
              <div className="auth-group">
                <label>Username <span className="auth-req">*</span></label>
                <div className="auth-input-wrap">
                  <Icon type="fa" name="FaUser" size={14} className="auth-input-icon" />
                  <input name="username" placeholder="FieldRanger"
                    value={formData.username} onChange={handleChange}
                    required minLength={3} maxLength={30} disabled={loading} />
                </div>
              </div>
            )}

            <div className="auth-group">
              <label>Email Address <span className="auth-req">*</span></label>
              <div className="auth-input-wrap">
                <Icon type="fa" name="FaEnvelope" size={14} className="auth-input-icon" />
                <input name="email" type="email"
                  placeholder={isLogin ? "sam@resqall.com" : "ranger@resqall.com"}
                  value={formData.email} onChange={handleChange}
                  required disabled={loading} />
              </div>
            </div>

            {!isLogin && (
              <div className="auth-group">
                <label>Phone Number <span className="auth-req">*</span></label>
                <div className="auth-input-wrap">
                  <Icon type="fa" name="FaPhone" size={14} className="auth-input-icon" />
                  <input name="phone" type="tel" inputMode="numeric" pattern="[0-9]*"
                    placeholder="98XXXXXXXX" value={formData.phone}
                    onChange={handleChange} required maxLength={10} disabled={loading} />
                </div>
                <small className="auth-hint">10 digits starting with 98 or 97</small>
              </div>
            )}

            <div className="auth-group">
              <label>Password <span className="auth-req">*</span></label>
              <div className="auth-pass-wrap">
                <Icon type="fa" name="FaLock" size={14} className="auth-input-icon" />
                <input name="password" type={showPassword ? "text" : "password"}
                  placeholder="••••••••" value={formData.password}
                  onChange={handleChange} required minLength={6} disabled={loading} />
                <button type="button" className="auth-pass-toggle"
                  onClick={() => setShowPassword(!showPassword)} disabled={loading}>
                  <Icon type="fa" name={showPassword ? "FaEyeSlash" : "FaEye"} size={15} />
                </button>
              </div>
            </div>

            {!isLogin && (
              <div className="auth-group">
                <label>Confirm Password <span className="auth-req">*</span></label>
                <div className="auth-pass-wrap">
                  <Icon type="fa" name="FaLock" size={14} className="auth-input-icon" />
                  <input name="confirmPassword"
                    type={showConfirmPassword ? "text" : "password"}
                    placeholder="••••••••" value={formData.confirmPassword}
                    onChange={handleChange} required disabled={loading} />
                  <button type="button" className="auth-pass-toggle"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)} disabled={loading}>
                    <Icon type="fa" name={showConfirmPassword ? "FaEyeSlash" : "FaEye"} size={15} />
                  </button>
                </div>
              </div>
            )}

            {isLogin && (
              <div className="auth-remember">
                <label className="auth-check-label">
                  <input type="checkbox" checked={rememberMe}
                    onChange={(e) => setRememberMe(e.target.checked)} disabled={loading} />
                  <span>Remember me for 30 days</span>
                </label>
              </div>
            )}

            {!isLogin && (
              <>
                <div className="auth-vol-wrap">
                  <label className="auth-vol-box">
                    <input type="checkbox" name="isVolunteer"
                      checked={formData.isVolunteer} onChange={handleChange} disabled={loading} />
                    <div className="auth-vol-content">
                      <strong>🐾 Enlist as Volunteer</strong>
                      <span>I want to respond to field missions and help animals in need</span>
                      <small className="auth-vol-note">
                        Volunteer applications require admin approval before accessing missions
                      </small>
                    </div>
                    {formData.isVolunteer && (
                      <Icon type="fa" name="FaPaw" size={54} className="auth-paw-bg" />
                    )}
                  </label>
                </div>

                {formData.isVolunteer && (
                  <div className="auth-vol-fields">
                    <h4>Volunteer Information</h4>

                    <div className="auth-checkbox-group">
                      <label className="auth-checkbox-label">
                        <input type="checkbox" name="hasCar"
                          checked={formData.hasCar} onChange={handleChange} disabled={loading} />
                        <span>I have access to a vehicle for rescue missions</span>
                      </label>
                    </div>

                    <div className="auth-checkbox-group">
                      <label className="auth-checkbox-label">
                        <input type="checkbox" name="canFoster"
                          checked={formData.canFoster} onChange={handleChange} disabled={loading} />
                        <span>I can temporarily foster animals</span>
                      </label>
                    </div>

                    <div className="auth-group">
                      <label>Animal Handling Experience <span className="auth-req">*</span></label>
                      <div className="auth-input-wrap">
                        <Icon type="fa" name="FaPaw" size={13} className="auth-input-icon" />
                        <input type="text" name="animalHandling"
                          placeholder="e.g., dogs, cats, all animals"
                          value={formData.animalHandling} onChange={handleChange}
                          required={formData.isVolunteer} disabled={loading} />
                      </div>
                      <small className="auth-hint">Specify which animals you can handle</small>
                    </div>

                    <div className="auth-group">
                      <label>City / Location <span className="auth-req">*</span></label>
                      <div className="auth-input-wrap">
                        <Icon type="fa" name="FaMapMarkerAlt" size={13} className="auth-input-icon" />
                        <input name="city" type="text"
                          placeholder="e.g., Kathmandu, Pokhara"
                          value={formData.city} onChange={handleChange}
                          required={formData.isVolunteer} disabled={loading} />
                      </div>
                    </div>
                  </div>
                )}
              </>
            )}

            <button type="submit" className="auth-submit" disabled={loading}>
              {loading ? (
                <><span className="auth-spinner" />Processing...</>
              ) : (
                <>{isLogin ? "Access Console" : "Complete Enlistment"}
                  <Icon type="fa" name="FaArrowRight" size={15} /></>
              )}
            </button>

            {isLogin && (
              <div className="auth-forgot">
                <a href="/forgot-password">Forgot password?</a>
              </div>
            )}
          </form>

          <p className="auth-toggle">
            {isLogin ? "New to the mission?" : "Already an operative?"}
            <span className="auth-toggle-btn" onClick={switchMode}>
              {isLogin ? "Sign Up" : "Log In"}
            </span>
          </p>

          <div className="auth-foot">
            <p>
              By continuing, you agree to our{" "}
              <a href="/terms">Terms of Service</a> and{" "}
              <a href="/privacy">Privacy Policy</a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
