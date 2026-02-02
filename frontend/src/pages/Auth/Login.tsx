// import React, { useState } from "react";
// import { useNavigate } from "react-router-dom";
// import Icon from "../../components/Icon";
// import { useAuth } from "../../context/AuthContext";
// import "./login.css";

// export const Login: React.FC = () => {
//   const [isLogin, setIsLogin] = useState(true);
//   const [error, setError] = useState("");
//   const [loading, setLoading] = useState(false);
//   const [formData, setFormData] = useState({
//     username: "",
//     email: "",
//     password: "",
//     confirmPassword: "",
//     phone: "",
//     isVolunteer: false,
//   });

//   const navigate = useNavigate();
//   const { login, register } = useAuth();

//   const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     const { name, type, value, checked } = e.target;
//     const inputValue = type === "checkbox" ? checked : value;
//     setFormData({ ...formData, [name]: inputValue });
//   };

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();
//     setError("");
//     setLoading(true);

//     try {
//       if (isLogin) {
//         const success = await login(formData.email, formData.password);
//         if (success) {
//           navigate("/dashboard");
//         } else {
//           setError("Invalid email or password");
//         }
//       } else {
//         // Registration validations
//         if (formData.password !== formData.confirmPassword) {
//           setError("Passwords don't match");
//           setLoading(false);
//           return;
//         }

//         if (formData.username.length < 3) {
//           setError("Username must be at least 3 characters");
//           setLoading(false);
//           return;
//         }

//         if (formData.password.length < 6) {
//           setError("Password must be at least 6 characters");
//           setLoading(false);
//           return;
//         }

//         const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
//         if (!emailRegex.test(formData.email)) {
//           setError("Please enter a valid email address");
//           setLoading(false);
//           return;
//         }

//         if (formData.phone && formData.phone.trim() !== "") {
//           const cleanedPhone = formData.phone.replace(/[\s\-+]/g, '');
//           const nepaliPhoneRegex = /^9[78]\d{8}$/;
//           if (!nepaliPhoneRegex.test(cleanedPhone)) {
//             setError("Please enter a valid 10-digit Nepali mobile number (starting with 98 or 97)");
//             setLoading(false);
//             return;
//           }
//         }

//         const success = await register(
//           formData.username,
//           formData.email,
//           formData.password,
//           formData.phone,
//           formData.isVolunteer
//         );

//         if (success) {
//           navigate("/dashboard");
//         } else {
//           setError("Registration failed");
//         }
//       }
//     } catch (err) {
//       setError("An error occurred. Please try again.");
//       console.error(err);
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="auth-wrapper">
//       <div className="auth-box">
//         <div className="auth-left">
//           <div className="auth-left-overlay">
//             <div className="logo">
//               <Icon type="fa" name="FaPaw" size={48} color="#ffffff" />
//             </div>
//             <h2>ResQAll Network</h2>
//             <p>Protecting every paw on the street. Join our mission.</p>
//           </div>
//         </div>

//         <div className="auth-right">
//           <h3>{isLogin ? "Mission Check-in" : "Join the Squad"}</h3>
//           {error && <div className="auth-error">{error}</div>}

//           <form onSubmit={handleSubmit}>
//             {!isLogin && (
//               <div className="form-group">
//                 <label>Username</label>
//                 <input
//                   name="username"
//                   placeholder="FieldRanger"
//                   value={formData.username}
//                   onChange={handleChange}
//                   required
//                   minLength={3}
//                 />
//               </div>
//             )}

//             <div className="form-group">
//               <label>Email Address</label>
//               <input
//                 name="email"
//                 type="email"
//                 placeholder={isLogin ? "sam@resqall.com" : "ranger@resqall.com"}
//                 value={formData.email}
//                 onChange={handleChange}
//                 required
//               />
//             </div>

//             {!isLogin && (
//               <div className="form-group">
//                 <label>Phone (Optional)</label>
//                 <input
//                   name="phone"
//                   type="tel"
//                   placeholder="98XXXXXXXX"
//                   value={formData.phone}
//                   onChange={handleChange}
//                 />
//               </div>
//             )}

//             <div className="form-group">
//               <label>Password</label>
//               <input
//                 name="password"
//                 type="password"
//                 placeholder="••••••••"
//                 value={formData.password}
//                 onChange={handleChange}
//                 required
//                 minLength={6}
//               />
//             </div>

//             {!isLogin && (
//               <>
//                 <div className="form-group">
//                   <label>Confirm Password</label>
//                   <input
//                     name="confirmPassword"
//                     type="password"
//                     placeholder="••••••••"
//                     value={formData.confirmPassword}
//                     onChange={handleChange}
//                     required
//                   />
//                 </div>

//                 <label className="volunteer-box">
//                   <input
//                     type="checkbox"
//                     name="isVolunteer"
//                     checked={formData.isVolunteer}
//                     onChange={handleChange}
//                   />
//                   <div className="volunteer-box-content">
//                     <strong>Enlist as Volunteer</strong>
//                     <span>I want to respond to field missions.</span>
//                   </div>
//                   {formData.isVolunteer && (
//                     <Icon type="fa" name="FaPaw" size={60} className="paw-bg" />
//                   )}
//                 </label>
//               </>
//             )}

//             <button type="submit" className="auth-btn" disabled={loading}>
//               {loading ? "Processing..." : isLogin ? "Access Console" : "Complete Enlistment"}
//               {!loading && <Icon type="fa" name="FaArrowRight" size={18} />}
//             </button>
//           </form>

//           <p className="toggle">
//             {isLogin ? "New to the mission?" : "Already an operative?"}
//             <span
//               className="toggle-text"
//               onClick={() => {
//                 if (!loading) {
//                   setIsLogin(!isLogin);
//                   setError("");
//                   setFormData({
//                     username: "",
//                     email: "",
//                     password: "",
//                     confirmPassword: "",
//                     phone: "",
//                     isVolunteer: false,
//                   });
//                 }
//               }}
//             >
//               {isLogin ? "Sign Up" : "Log In"}
//             </span>
//           </p>
//         </div>
//       </div>
//     </div>
//   );
// };

import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Icon from "../../components/Icon";
import { useAuth } from "../../context/AuthContext";
import "./login.css";

export const Login: React.FC = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
    phone: "",
    isVolunteer: false,
  });

  const navigate = useNavigate();
  const { login, register} = useAuth(); // Get user from context

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, type, value, checked } = e.target;
    const inputValue = type === "checkbox" ? checked : value;
    setFormData({ ...formData, [name]: inputValue });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      if (isLogin) {
        const success = await login(formData.email, formData.password);
        if (success) {
          // After login, check user status to determine redirect
          const storedUser = JSON.parse(localStorage.getItem('resqall_user') || '{}');
          
          // Check if user is a pending volunteer
          const roleName = storedUser.role?.role_name || storedUser.role_name;
          const volunteerStatus = storedUser.volunteer_status || storedUser.volunteerStatus;
          
          console.log("After login - Role:", roleName, "Status:", volunteerStatus);
          
          if (roleName === 'volunteer' && volunteerStatus === 'pending') {
            navigate("/dashboard"); // The Dashboard will show pending view
          } else {
            navigate("/dashboard");
          }
        } else {
          setError("Invalid email or password");
        }
      } else {
        // Registration validations
        if (formData.password !== formData.confirmPassword) {
          setError("Passwords don't match");
          setLoading(false);
          return;
        }

        if (formData.username.length < 3) {
          setError("Username must be at least 3 characters");
          setLoading(false);
          return;
        }

        if (formData.password.length < 6) {
          setError("Password must be at least 6 characters");
          setLoading(false);
          return;
        }

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(formData.email)) {
          setError("Please enter a valid email address");
          setLoading(false);
          return;
        }

        if (formData.phone && formData.phone.trim() !== "") {
          const cleanedPhone = formData.phone.replace(/[\s\-+]/g, '');
          const nepaliPhoneRegex = /^9[78]\d{8}$/;
          if (!nepaliPhoneRegex.test(cleanedPhone)) {
            setError("Please enter a valid 10-digit Nepali mobile number (starting with 98 or 97)");
            setLoading(false);
            return;
          }
        }

        const success = await register(
          formData.username,
          formData.email,
          formData.password,
          formData.phone,
          formData.isVolunteer
        );

        if (success) {
          // If volunteer registration was successful, they'll see pending dashboard
          navigate("/dashboard");
        } else {
          setError("Registration failed");
        }
      }
    } catch (err: any) {
      setError(err.message || "An error occurred. Please try again.");
      console.error(err);
    } finally {
      setLoading(false);
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
                  minLength={3}
                />
              </div>
            )}

            <div className="form-group">
              <label>Email Address</label>
              <input
                name="email"
                type="email"
                placeholder={isLogin ? "sam@resqall.com" : "ranger@resqall.com"}
                value={formData.email}
                onChange={handleChange}
                required
              />
            </div>

            {!isLogin && (
              <div className="form-group">
                <label>Phone (Optional)</label>
                <input
                  name="phone"
                  type="tel"
                  placeholder="98XXXXXXXX"
                  value={formData.phone}
                  onChange={handleChange}
                />
              </div>
            )}

            <div className="form-group">
              <label>Password</label>
              <input
                name="password"
                type="password"
                placeholder="••••••••"
                value={formData.password}
                onChange={handleChange}
                required
                minLength={6}
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
                    <small className="volunteer-note">
                      Note: Volunteer applications require admin approval before accessing the dashboard.
                    </small>
                  </div>
                  {formData.isVolunteer && (
                    <Icon type="fa" name="FaPaw" size={60} className="paw-bg" />
                  )}
                </label>
              </>
            )}

            <button type="submit" className="auth-btn" disabled={loading}>
              {loading ? "Processing..." : isLogin ? "Access Console" : "Complete Enlistment"}
              {!loading && <Icon type="fa" name="FaArrowRight" size={18} />}
            </button>
          </form>

          <p className="toggle">
            {isLogin ? "New to the mission?" : "Already an operative?"}
            <span
              className="toggle-text"
              onClick={() => {
                if (!loading) {
                  setIsLogin(!isLogin);
                  setError("");
                  setFormData({
                    username: "",
                    email: "",
                    password: "",
                    confirmPassword: "",
                    phone: "",
                    isVolunteer: false,
                  });
                }
              }}
            >
              {isLogin ? "Sign Up" : "Log In"}
            </span>
          </p>
        </div>
      </div>
    </div>
  );
};