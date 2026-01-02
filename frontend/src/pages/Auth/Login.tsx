import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Icon from "../../components/Icon";
import { useAuth } from "../../context/AuthContext"; 
import "./login.css";

export const Login: React.FC = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [error, setError] = useState("");
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
    isVolunteer: false,
  });

  const navigate = useNavigate();
  const { login, register } = useAuth(); 

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.type === "checkbox" ? e.target.checked : e.target.value;
    setFormData({ ...formData, [e.target.name]: value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (isLogin) {
      // Call context login
      const success = login(formData.email);
      if (!success) {
        setError(
          "Invalid credentials. Use admin@resqall.com, jane@example.com, or sam@resqall.com"
        );
        return;
      }
      navigate("/"); // Redirect to dashboard via MainStack
    } else {
      // Signup via context register
      if (formData.password !== formData.confirmPassword) {
        setError("Passwords don't match");
        return;
      }
      if (formData.username.length < 3) {
        setError("Username must be at least 3 characters");
        return;
      }
      register(formData.username, formData.email, formData.isVolunteer);
      navigate("/"); // Redirect to dashboard
    }
  };

  return (
    <div className="auth-wrapper">
      <div className="auth-box">
        <div className="auth-left">
          <div className="auth-left-overlay">
            <div className="logo">
              <Icon type="fa" name="FaPaw" size={48} color="#ffffff" />
            </div>
            <h2>ResQAll Network</h2>
            <p>Protecting every paw on the street. Join our mission.</p>
          </div>
        </div>

        <div className="auth-right">
          <h3>{isLogin ? "Mission Check-in" : "Join the Squad"}</h3>
          {error && <div className="auth-error">{error}</div>}

          <form onSubmit={handleSubmit}>
            {!isLogin && (
              <div className="form-group">
                <label>Username</label>
                <input
                  name="username"
                  placeholder="FieldRanger"
                  value={formData.username}
                  onChange={handleChange}
                  required
                />
              </div>
            )}

            <div className="form-group">
              <label>Email Address</label>
              <input
                name="email"
                type="email"
                placeholder={isLogin ? "sam@resqall.com (volunteer)" : "ranger@resqall.com"}
                value={formData.email}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-group">
              <label>Password</label>
              <input
                name="password"
                type="password"
                placeholder="••••••••"
                value={formData.password}
                onChange={handleChange}
                required
              />
            </div>

            {!isLogin && (
              <>
                <div className="form-group">
                  <label>Confirm Password</label>
                  <input
                    name="confirmPassword"
                    type="password"
                    placeholder="••••••••"
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    required
                  />
                </div>

                <label className="volunteer-box">
                  <input
                    type="checkbox"
                    name="isVolunteer"
                    checked={formData.isVolunteer}
                    onChange={handleChange}
                  />
                  <div className="volunteer-box-content">
                    <strong>Enlist as Volunteer</strong>
                    <span>I want to respond to field missions.</span>
                  </div>
                  {formData.isVolunteer && (
                    <Icon type="fa" name="FaPaw" size={60} className="paw-bg" />
                  )}
                </label>
              </>
            )}

            <button type="submit" className="auth-btn">
              {isLogin ? "Access Console" : "Complete Enlistment"}
              <Icon type="fa" name="FaArrowRight" size={18} />
            </button>
          </form>

          <p className="toggle">
            {isLogin ? "New to the mission?" : "Already an operative?"}
            <span className="toggle-text" onClick={() => setIsLogin(!isLogin)}>
              {isLogin ? "Sign Up" : "Log In"}
            </span>
          </p>
        </div>
      </div>
    </div>
  );
};
