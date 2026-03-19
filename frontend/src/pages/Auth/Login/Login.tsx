// // // import React, { useState } from "react";
// // // import { useNavigate } from "react-router-dom";
// // // import Icon from "../../components/Icon";
// // // import { useAuth } from "../../context/AuthContext";
// // // import "./login.css";

// // // export const Login: React.FC = () => {
// // //   const [isLogin, setIsLogin] = useState(true);
// // //   const [error, setError] = useState("");
// // //   const [loading, setLoading] = useState(false);
// // //   const [formData, setFormData] = useState({
// // //     username: "",
// // //     email: "",
// // //     password: "",
// // //     confirmPassword: "",
// // //     phone: "",
// // //     isVolunteer: false,
// // //   });

// // //   const navigate = useNavigate();
// // //   const { login, register } = useAuth();

// // //   const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
// // //     const { name, type, value, checked } = e.target;
// // //     const inputValue = type === "checkbox" ? checked : value;
// // //     setFormData({ ...formData, [name]: inputValue });
// // //   };

// // //   const handleSubmit = async (e: React.FormEvent) => {
// // //     e.preventDefault();
// // //     setError("");
// // //     setLoading(true);

// // //     try {
// // //       if (isLogin) {
// // //         const success = await login(formData.email, formData.password);
// // //         if (success) {
// // //           navigate("/dashboard");
// // //         } else {
// // //           setError("Invalid email or password");
// // //         }
// // //       } else {
// // //         // Registration validations
// // //         if (formData.password !== formData.confirmPassword) {
// // //           setError("Passwords don't match");
// // //           setLoading(false);
// // //           return;
// // //         }

// // //         if (formData.username.length < 3) {
// // //           setError("Username must be at least 3 characters");
// // //           setLoading(false);
// // //           return;
// // //         }

// // //         if (formData.password.length < 6) {
// // //           setError("Password must be at least 6 characters");
// // //           setLoading(false);
// // //           return;
// // //         }

// // //         const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
// // //         if (!emailRegex.test(formData.email)) {
// // //           setError("Please enter a valid email address");
// // //           setLoading(false);
// // //           return;
// // //         }

// // //         if (formData.phone && formData.phone.trim() !== "") {
// // //           const cleanedPhone = formData.phone.replace(/[\s\-+]/g, '');
// // //           const nepaliPhoneRegex = /^9[78]\d{8}$/;
// // //           if (!nepaliPhoneRegex.test(cleanedPhone)) {
// // //             setError("Please enter a valid 10-digit Nepali mobile number (starting with 98 or 97)");
// // //             setLoading(false);
// // //             return;
// // //           }
// // //         }

// // //         const success = await register(
// // //           formData.username,
// // //           formData.email,
// // //           formData.password,
// // //           formData.phone,
// // //           formData.isVolunteer
// // //         );

// // //         if (success) {
// // //           navigate("/dashboard");
// // //         } else {
// // //           setError("Registration failed");
// // //         }
// // //       }
// // //     } catch (err) {
// // //       setError("An error occurred. Please try again.");
// // //       console.error(err);
// // //     } finally {
// // //       setLoading(false);
// // //     }
// // //   };

// // //   return (
// // //     <div className="auth-wrapper">
// // //       <div className="auth-box">
// // //         <div className="auth-left">
// // //           <div className="auth-left-overlay">
// // //             <div className="logo">
// // //               <Icon type="fa" name="FaPaw" size={48} color="#ffffff" />
// // //             </div>
// // //             <h2>ResQAll Network</h2>
// // //             <p>Protecting every paw on the street. Join our mission.</p>
// // //           </div>
// // //         </div>

// // //         <div className="auth-right">
// // //           <h3>{isLogin ? "Mission Check-in" : "Join the Squad"}</h3>
// // //           {error && <div className="auth-error">{error}</div>}

// // //           <form onSubmit={handleSubmit}>
// // //             {!isLogin && (
// // //               <div className="form-group">
// // //                 <label>Username</label>
// // //                 <input
// // //                   name="username"
// // //                   placeholder="FieldRanger"
// // //                   value={formData.username}
// // //                   onChange={handleChange}
// // //                   required
// // //                   minLength={3}
// // //                 />
// // //               </div>
// // //             )}

// // //             <div className="form-group">
// // //               <label>Email Address</label>
// // //               <input
// // //                 name="email"
// // //                 type="email"
// // //                 placeholder={isLogin ? "sam@resqall.com" : "ranger@resqall.com"}
// // //                 value={formData.email}
// // //                 onChange={handleChange}
// // //                 required
// // //               />
// // //             </div>

// // //             {!isLogin && (
// // //               <div className="form-group">
// // //                 <label>Phone (Optional)</label>
// // //                 <input
// // //                   name="phone"
// // //                   type="tel"
// // //                   placeholder="98XXXXXXXX"
// // //                   value={formData.phone}
// // //                   onChange={handleChange}
// // //                 />
// // //               </div>
// // //             )}

// // //             <div className="form-group">
// // //               <label>Password</label>
// // //               <input
// // //                 name="password"
// // //                 type="password"
// // //                 placeholder="••••••••"
// // //                 value={formData.password}
// // //                 onChange={handleChange}
// // //                 required
// // //                 minLength={6}
// // //               />
// // //             </div>

// // //             {!isLogin && (
// // //               <>
// // //                 <div className="form-group">
// // //                   <label>Confirm Password</label>
// // //                   <input
// // //                     name="confirmPassword"
// // //                     type="password"
// // //                     placeholder="••••••••"
// // //                     value={formData.confirmPassword}
// // //                     onChange={handleChange}
// // //                     required
// // //                   />
// // //                 </div>

// // //                 <label className="volunteer-box">
// // //                   <input
// // //                     type="checkbox"
// // //                     name="isVolunteer"
// // //                     checked={formData.isVolunteer}
// // //                     onChange={handleChange}
// // //                   />
// // //                   <div className="volunteer-box-content">
// // //                     <strong>Enlist as Volunteer</strong>
// // //                     <span>I want to respond to field missions.</span>
// // //                   </div>
// // //                   {formData.isVolunteer && (
// // //                     <Icon type="fa" name="FaPaw" size={60} className="paw-bg" />
// // //                   )}
// // //                 </label>
// // //               </>
// // //             )}

// // //             <button type="submit" className="auth-btn" disabled={loading}>
// // //               {loading ? "Processing..." : isLogin ? "Access Console" : "Complete Enlistment"}
// // //               {!loading && <Icon type="fa" name="FaArrowRight" size={18} />}
// // //             </button>
// // //           </form>

// // //           <p className="toggle">
// // //             {isLogin ? "New to the mission?" : "Already an operative?"}
// // //             <span
// // //               className="toggle-text"
// // //               onClick={() => {
// // //                 if (!loading) {
// // //                   setIsLogin(!isLogin);
// // //                   setError("");
// // //                   setFormData({
// // //                     username: "",
// // //                     email: "",
// // //                     password: "",
// // //                     confirmPassword: "",
// // //                     phone: "",
// // //                     isVolunteer: false,
// // //                   });
// // //                 }
// // //               }}
// // //             >
// // //               {isLogin ? "Sign Up" : "Log In"}
// // //             </span>
// // //           </p>
// // //         </div>
// // //       </div>
// // //     </div>
// // //   );
// // // };

// // // import React, { useState } from "react";
// // // import { useNavigate } from "react-router-dom";
// // // import Icon from "../../components/Icon";
// // // import { useAuth } from "../../context/AuthContext";
// // // import "./login.css";

// // // export const Login: React.FC = () => {
// // //   const [isLogin, setIsLogin] = useState(true);
// // //   const [error, setError] = useState("");
// // //   const [loading, setLoading] = useState(false);
// // //   const [formData, setFormData] = useState({
// // //     username: "",
// // //     email: "",
// // //     password: "",
// // //     confirmPassword: "",
// // //     phone: "",
// // //     isVolunteer: false,
// // //   });

// // //   const navigate = useNavigate();
// // //   const { login, register} = useAuth(); // Get user from context

// // //   const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
// // //     const { name, type, value, checked } = e.target;
// // //     const inputValue = type === "checkbox" ? checked : value;
// // //     setFormData({ ...formData, [name]: inputValue });
// // //   };

// // //   const handleSubmit = async (e: React.FormEvent) => {
// // //     e.preventDefault();
// // //     setError("");
// // //     setLoading(true);

// // //     try {
// // //       if (isLogin) {
// // //         const success = await login(formData.email, formData.password);
// // //         if (success) {
// // //           // After login, check user status to determine redirect
// // //           const storedUser = JSON.parse(localStorage.getItem('resqall_user') || '{}');
          
// // //           // Check if user is a pending volunteer
// // //           const roleName = storedUser.role?.role_name || storedUser.role_name;
// // //           const volunteerStatus = storedUser.volunteer_status || storedUser.volunteerStatus;
          
// // //           console.log("After login - Role:", roleName, "Status:", volunteerStatus);
          
// // //           if (roleName === 'volunteer' && volunteerStatus === 'pending') {
// // //             navigate("/dashboard"); // The Dashboard will show pending view
// // //           } else {
// // //             navigate("/dashboard");
// // //           }
// // //         } else {
// // //           setError("Invalid email or password");
// // //         }
// // //       } else {
// // //         // Registration validations
// // //         if (formData.password !== formData.confirmPassword) {
// // //           setError("Passwords don't match");
// // //           setLoading(false);
// // //           return;
// // //         }

// // //         if (formData.username.length < 3) {
// // //           setError("Username must be at least 3 characters");
// // //           setLoading(false);
// // //           return;
// // //         }

// // //         if (formData.password.length < 6) {
// // //           setError("Password must be at least 6 characters");
// // //           setLoading(false);
// // //           return;
// // //         }

// // //         const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
// // //         if (!emailRegex.test(formData.email)) {
// // //           setError("Please enter a valid email address");
// // //           setLoading(false);
// // //           return;
// // //         }

// // //         if (formData.phone && formData.phone.trim() !== "") {
// // //           const cleanedPhone = formData.phone.replace(/[\s\-+]/g, '');
// // //           const nepaliPhoneRegex = /^9[78]\d{8}$/;
// // //           if (!nepaliPhoneRegex.test(cleanedPhone)) {
// // //             setError("Please enter a valid 10-digit Nepali mobile number (starting with 98 or 97)");
// // //             setLoading(false);
// // //             return;
// // //           }
// // //         }

// // //         const success = await register(
// // //           formData.username,
// // //           formData.email,
// // //           formData.password,
// // //           formData.phone,
// // //           formData.isVolunteer
// // //         );

// // //         if (success) {
// // //           // If volunteer registration was successful, they'll see pending dashboard
// // //           navigate("/dashboard");
// // //         } else {
// // //           setError("Registration failed");
// // //         }
// // //       }
// // //     } catch (err: any) {
// // //       setError(err.message || "An error occurred. Please try again.");
// // //       console.error(err);
// // //     } finally {
// // //       setLoading(false);
// // //     }
// // //   };

// // //   return (
// // //     <div className="auth-wrapper">
// // //       <div className="auth-box">
// // //         <div className="auth-left">
// // //           <div className="auth-left-overlay">
// // //             <div className="logo">
// // //               <Icon type="fa" name="FaPaw" size={48} color="#ffffff" />
// // //             </div>
// // //             <h2>ResQAll Network</h2>
// // //             <p>Protecting every paw on the street. Join our mission.</p>
// // //           </div>
// // //         </div>

// // //         <div className="auth-right">
// // //           <h3>{isLogin ? "Mission Check-in" : "Join the Squad"}</h3>
// // //           {error && <div className="auth-error">{error}</div>}

// // //           <form onSubmit={handleSubmit}>
// // //             {!isLogin && (
// // //               <div className="form-group">
// // //                 <label>Username</label>
// // //                 <input
// // //                   name="username"
// // //                   placeholder="FieldRanger"
// // //                   value={formData.username}
// // //                   onChange={handleChange}
// // //                   required
// // //                   minLength={3}
// // //                 />
// // //               </div>
// // //             )}

// // //             <div className="form-group">
// // //               <label>Email Address</label>
// // //               <input
// // //                 name="email"
// // //                 type="email"
// // //                 placeholder={isLogin ? "sam@resqall.com" : "ranger@resqall.com"}
// // //                 value={formData.email}
// // //                 onChange={handleChange}
// // //                 required
// // //               />
// // //             </div>

// // //             {!isLogin && (
// // //               <div className="form-group">
// // //                 <label>Phone (Optional)</label>
// // //                 <input
// // //                   name="phone"
// // //                   type="tel"
// // //                   placeholder="98XXXXXXXX"
// // //                   value={formData.phone}
// // //                   onChange={handleChange}
// // //                 />
// // //               </div>
// // //             )}

// // //             <div className="form-group">
// // //               <label>Password</label>
// // //               <input
// // //                 name="password"
// // //                 type="password"
// // //                 placeholder="••••••••"
// // //                 value={formData.password}
// // //                 onChange={handleChange}
// // //                 required
// // //                 minLength={6}
// // //               />
// // //             </div>

// // //             {!isLogin && (
// // //               <>
// // //                 <div className="form-group">
// // //                   <label>Confirm Password</label>
// // //                   <input
// // //                     name="confirmPassword"
// // //                     type="password"
// // //                     placeholder="••••••••"
// // //                     value={formData.confirmPassword}
// // //                     onChange={handleChange}
// // //                     required
// // //                   />
// // //                 </div>

// // //                 <label className="volunteer-box">
// // //                   <input
// // //                     type="checkbox"
// // //                     name="isVolunteer"
// // //                     checked={formData.isVolunteer}
// // //                     onChange={handleChange}
// // //                   />
// // //                   <div className="volunteer-box-content">
// // //                     <strong>Enlist as Volunteer</strong>
// // //                     <span>I want to respond to field missions.</span>
// // //                     <small className="volunteer-note">
// // //                       Note: Volunteer applications require admin approval before accessing the dashboard.
// // //                     </small>
// // //                   </div>
// // //                   {formData.isVolunteer && (
// // //                     <Icon type="fa" name="FaPaw" size={60} className="paw-bg" />
// // //                   )}
// // //                 </label>
// // //               </>
// // //             )}

// // //             <button type="submit" className="auth-btn" disabled={loading}>
// // //               {loading ? "Processing..." : isLogin ? "Access Console" : "Complete Enlistment"}
// // //               {!loading && <Icon type="fa" name="FaArrowRight" size={18} />}
// // //             </button>
// // //           </form>

// // //           <p className="toggle">
// // //             {isLogin ? "New to the mission?" : "Already an operative?"}
// // //             <span
// // //               className="toggle-text"
// // //               onClick={() => {
// // //                 if (!loading) {
// // //                   setIsLogin(!isLogin);
// // //                   setError("");
// // //                   setFormData({
// // //                     username: "",
// // //                     email: "",
// // //                     password: "",
// // //                     confirmPassword: "",
// // //                     phone: "",
// // //                     isVolunteer: false,
// // //                   });
// // //                 }
// // //               }}
// // //             >
// // //               {isLogin ? "Sign Up" : "Log In"}
// // //             </span>
// // //           </p>
// // //         </div>
// // //       </div>
// // //     </div>
// // //   );
// // // };


// // import React, { useState, useEffect } from "react";
// // import { useNavigate } from "react-router-dom";
// // import Icon from "../../components/Icon";
// // import { useAuth } from "../../context/AuthContext";
// // import "./login.css";

// // export const Login: React.FC = () => {
// //   const [isLogin, setIsLogin] = useState(true);
// //   const [error, setError] = useState("");
// //   const [loading, setLoading] = useState(false);
// //   const [showPassword, setShowPassword] = useState(false);
// //   const [showConfirmPassword, setShowConfirmPassword] = useState(false);
// //   const [formData, setFormData] = useState({
// //     username: "",
// //     email: "",
// //     password: "",
// //     confirmPassword: "",
// //     phone: "",
// //     isVolunteer: false,
// //     // Volunteer specific fields
// //     hasCar: false,
// //     canFoster: false,
// //     animalHandling: "",
// //     city: "",
// //   });

// //   const navigate = useNavigate();
// //   const { login, register, user } = useAuth();

// //   // Check if user is already logged in (SESSION PERSISTENCE)
// //   useEffect(() => {
// //     const storedUser = localStorage.getItem('resqall_user');
// //     const token = localStorage.getItem('token');
// //     if ((storedUser && token) || user) {
// //       navigate("/dashboard");
// //     }
// //   }, [navigate, user]);

// //   const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
// //     const { name, type, value, checked } = e.target;
    
// //     if (type === "checkbox") {
// //       setFormData({ ...formData, [name]: checked });
// //     } else {
// //       setFormData({ ...formData, [name]: value });
// //     }
// //   };

// //   const validatePhone = (phone: string): boolean => {
// //     const cleanedPhone = phone.replace(/[\s\-+]/g, '');
// //     const nepaliPhoneRegex = /^9[78]\d{8}$/;
// //     return nepaliPhoneRegex.test(cleanedPhone);
// //   };

// //   const validateEmail = (email: string): boolean => {
// //     const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
// //     return emailRegex.test(email);
// //   };

// //   const handleSubmit = async (e: React.FormEvent) => {
// //     e.preventDefault();
// //     setError("");
// //     setLoading(true);

// //     try {
// //       if (isLogin) {
// //         const success = await login(formData.email, formData.password);
// //         if (success) {
// //           navigate("/dashboard");
// //         } else {
// //           setError("Invalid email or password");
// //         }
// //       } else {
// //         // Registration validations
// //         if (formData.password !== formData.confirmPassword) {
// //           setError("Passwords don't match");
// //           setLoading(false);
// //           return;
// //         }

// //         if (formData.username.length < 3) {
// //           setError("Username must be at least 3 characters");
// //           setLoading(false);
// //           return;
// //         }

// //         if (formData.username.length > 30) {
// //           setError("Username must be less than 30 characters");
// //           setLoading(false);
// //           return;
// //         }

// //         if (formData.password.length < 6) {
// //           setError("Password must be at least 6 characters");
// //           setLoading(false);
// //           return;
// //         }

// //         if (!validateEmail(formData.email)) {
// //           setError("Please enter a valid email address");
// //           setLoading(false);
// //           return;
// //         }

// //         // Phone is now mandatory
// //         if (!formData.phone || formData.phone.trim() === "") {
// //           setError("Phone number is required");
// //           setLoading(false);
// //           return;
// //         }

// //         const cleanedPhone = formData.phone.replace(/[\s\-+]/g, '');
// //         if (!validatePhone(cleanedPhone)) {
// //           setError("Please enter a valid 10-digit Nepali mobile number (starting with 98 or 97)");
// //           setLoading(false);
// //           return;
// //         }

// //         // Validate volunteer specific fields if volunteer is checked
// //         if (formData.isVolunteer) {
// //           if (!formData.city || formData.city.trim() === "") {
// //             setError("City is required for volunteers");
// //             setLoading(false);
// //             return;
// //           }

// //           if (!formData.animalHandling || formData.animalHandling.trim() === "") {
// //             setError("Please specify which animals you can handle");
// //             setLoading(false);
// //             return;
// //           }
// //         }

// //         const success = await register(
// //           formData.username,
// //           formData.email,
// //           formData.password,
// //           cleanedPhone,
// //           formData.isVolunteer,
// //           formData.isVolunteer ? {
// //             hasCar: formData.hasCar,
// //             canFoster: formData.canFoster,
// //             animalHandling: formData.animalHandling,
// //             city: formData.city
// //           } : undefined
// //         );

// //         if (success) {
// //           navigate("/dashboard");
// //         } else {
// //           setError("Registration failed - username or email may already exist");
// //         }
// //       }
// //     } catch (err: any) {
// //       setError(err.message || "An error occurred. Please try again.");
// //       console.error(err);
// //     } finally {
// //       setLoading(false);
// //     }
// //   };

// //   return (
// //     <div className="auth-wrapper">
// //       <div className="auth-box">
// //         <div className="auth-left">
// //           <div className="auth-left-overlay">
// //             <div className="logo">
// //               <Icon type="fa" name="FaPaw" size={48} color="#ffffff" />
// //             </div>
// //             <h2>ResQAll Network</h2>
// //             <p>Protecting every paw on the street. Join our mission.</p>
// //           </div>
// //         </div>

// //         <div className="auth-right">
// //           <h3>{isLogin ? "Mission Check-in" : "Join the Squad"}</h3>
// //           {error && <div className="auth-error">{error}</div>}

// //           <form onSubmit={handleSubmit}>
// //             {!isLogin && (
// //               <div className="form-group">
// //                 <label>Username *</label>
// //                 <input
// //                   name="username"
// //                   placeholder="FieldRanger"
// //                   value={formData.username}
// //                   onChange={handleChange}
// //                   required
// //                   minLength={3}
// //                   maxLength={30}
// //                 />
// //               </div>
// //             )}

// //             <div className="form-group">
// //               <label>Email Address *</label>
// //               <input
// //                 name="email"
// //                 type="email"
// //                 placeholder={isLogin ? "sam@resqall.com" : "ranger@resqall.com"}
// //                 value={formData.email}
// //                 onChange={handleChange}
// //                 required
// //               />
// //             </div>

// //             {!isLogin && (
// //               <div className="form-group">
// //                 <label>Phone Number *</label>
// //                 <input
// //                   name="phone"
// //                   type="tel"
// //                   placeholder="98XXXXXXXX"
// //                   value={formData.phone}
// //                   onChange={handleChange}
// //                   required
// //                   maxLength={10}
// //                 />
// //                 <small className="input-hint">Must be 10 digits starting with 98 or 97</small>
// //               </div>
// //             )}

// //             <div className="form-group password-group">
// //               <label>Password *</label>
// //               <div className="password-input-wrapper">
// //                 <input
// //                   name="password"
// //                   type={showPassword ? "text" : "password"}
// //                   placeholder="••••••••"
// //                   value={formData.password}
// //                   onChange={handleChange}
// //                   required
// //                   minLength={6}
// //                 />
// //                 <button
// //                   type="button"
// //                   className="password-toggle"
// //                   onClick={() => setShowPassword(!showPassword)}
// //                 >
// //                   <Icon 
// //                     type="fa" 
// //                     name={showPassword ? "FaEyeSlash" : "FaEye"} 
// //                     size={18} 
// //                   />
// //                 </button>
// //               </div>
// //             </div>

// //             {!isLogin && (
// //               <>
// //                 <div className="form-group password-group">
// //                   <label>Confirm Password *</label>
// //                   <div className="password-input-wrapper">
// //                     <input
// //                       name="confirmPassword"
// //                       type={showConfirmPassword ? "text" : "password"}
// //                       placeholder="••••••••"
// //                       value={formData.confirmPassword}
// //                       onChange={handleChange}
// //                       required
// //                     />
// //                     <button
// //                       type="button"
// //                       className="password-toggle"
// //                       onClick={() => setShowConfirmPassword(!showConfirmPassword)}
// //                     >
// //                       <Icon 
// //                         type="fa" 
// //                         name={showConfirmPassword ? "FaEyeSlash" : "FaEye"} 
// //                         size={18} 
// //                       />
// //                     </button>
// //                   </div>
// //                 </div>

// //                 <label className="volunteer-box">
// //                   <input
// //                     type="checkbox"
// //                     name="isVolunteer"
// //                     checked={formData.isVolunteer}
// //                     onChange={handleChange}
// //                   />
// //                   <div className="volunteer-box-content">
// //                     <strong>Enlist as Volunteer</strong>
// //                     <span>I want to respond to field missions.</span>
// //                     <small className="volunteer-note">
// //                       Note: Volunteer applications require admin approval before accessing missions.
// //                     </small>
// //                   </div>
// //                   {formData.isVolunteer && (
// //                     <Icon type="fa" name="FaPaw" size={60} className="paw-bg" />
// //                   )}
// //                 </label>

// //                 {/* Volunteer-specific fields */}
// //                 {formData.isVolunteer && (
// //                   <div className="volunteer-fields">
// //                     <h4>Volunteer Information</h4>
                    
// //                     <div className="form-group checkbox-group">
// //                       <label className="checkbox-label">
// //                         <input
// //                           type="checkbox"
// //                           name="hasCar"
// //                           checked={formData.hasCar}
// //                           onChange={handleChange}
// //                         />
// //                         <span>I have access to a vehicle</span>
// //                       </label>
// //                     </div>

// //                     <div className="form-group checkbox-group">
// //                       <label className="checkbox-label">
// //                         <input
// //                           type="checkbox"
// //                           name="canFoster"
// //                           checked={formData.canFoster}
// //                           onChange={handleChange}
// //                         />
// //                         <span>I can foster animals</span>
// //                       </label>
// //                     </div>

// //                     <div className="form-group">
// //                       <label>Animal Handling Experience *</label>
// //                       <input
// //                         type="text"
// //                         name="animalHandling"
// //                         placeholder="e.g., dogs, cats, all animals, horses"
// //                         value={formData.animalHandling}
// //                         onChange={handleChange}
// //                         required={formData.isVolunteer}
// //                       />
// //                       <small className="input-hint">Specify which animals you can handle</small>
// //                     </div>

// //                     <div className="form-group">
// //                       <label>City/Location *</label>
// //                       <input
// //                         name="city"
// //                         type="text"
// //                         placeholder="e.g., Kathmandu, Pokhara, Lalitpur"
// //                         value={formData.city}
// //                         onChange={handleChange}
// //                         required={formData.isVolunteer}
// //                       />
// //                     </div>
// //                   </div>
// //                 )}
// //               </>
// //             )}

// //             <button type="submit" className="auth-btn" disabled={loading}>
// //               {loading ? "Processing..." : isLogin ? "Access Console" : "Complete Enlistment"}
// //               {!loading && <Icon type="fa" name="FaArrowRight" size={18} />}
// //             </button>
// //           </form>

// //           <p className="toggle">
// //             {isLogin ? "New to the mission?" : "Already an operative?"}
// //             <span
// //               className="toggle-text"
// //               onClick={() => {
// //                 if (!loading) {
// //                   setIsLogin(!isLogin);
// //                   setError("");
// //                   setFormData({
// //                     username: "",
// //                     email: "",
// //                     password: "",
// //                     confirmPassword: "",
// //                     phone: "",
// //                     isVolunteer: false,
// //                     hasCar: false,
// //                     canFoster: false,
// //                     animalHandling: "",
// //                     city: "",
// //                   });
// //                 }
// //               }}
// //             >
// //               {isLogin ? "Sign Up" : "Log In"}
// //             </span>
// //           </p>
// //         </div>
// //       </div>
// //     </div>
// //   );
// // };

// import React, { useState, useEffect } from "react";
// import { useNavigate } from "react-router-dom";
// import Icon from "../../components/Icon";
// import { useAuth } from "../../context/AuthContext";
// import "./login.css";

// export const Login: React.FC = () => {
//   const [isLogin, setIsLogin] = useState(true);
//   const [error, setError] = useState("");
//   const [loading, setLoading] = useState(false);
//   const [showPassword, setShowPassword] = useState(false);
//   const [showConfirmPassword, setShowConfirmPassword] = useState(false);
//   const [formData, setFormData] = useState({
//     username: "",
//     email: "",
//     password: "",
//     confirmPassword: "",
//     phone: "",
//     isVolunteer: false,
//     // Volunteer specific fields
//     hasCar: false,
//     canFoster: false,
//     animalHandling: "",
//     city: "",
//   });

//   const navigate = useNavigate();
//   const { login, register, user } = useAuth();

//   // Check if user is already logged in (SESSION PERSISTENCE)
//   useEffect(() => {
//     const storedUser = localStorage.getItem('resqall_user');
//     const token = localStorage.getItem('token');
//     if ((storedUser && token) || user) {
//       navigate("/dashboard");
//     }
//   }, [navigate, user]);

//   const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     const { name, type, value, checked } = e.target;
    
//     if (type === "checkbox") {
//       setFormData({ ...formData, [name]: checked });
//     } else {
//       setFormData({ ...formData, [name]: value });
//     }
//   };

//   const validatePhone = (phone: string): boolean => {
//     const cleanedPhone = phone.replace(/[\s\-+]/g, '');
//     const nepaliPhoneRegex = /^9[78]\d{8}$/;
//     return nepaliPhoneRegex.test(cleanedPhone);
//   };

//   const validateEmail = (email: string): boolean => {
//     const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
//     return emailRegex.test(email);
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

//         if (formData.username.length > 30) {
//           setError("Username must be less than 30 characters");
//           setLoading(false);
//           return;
//         }

//         if (formData.password.length < 6) {
//           setError("Password must be at least 6 characters");
//           setLoading(false);
//           return;
//         }

//         if (!validateEmail(formData.email)) {
//           setError("Please enter a valid email address");
//           setLoading(false);
//           return;
//         }

//         // Phone is now mandatory
//         if (!formData.phone || formData.phone.trim() === "") {
//           setError("Phone number is required");
//           setLoading(false);
//           return;
//         }

//         const cleanedPhone = formData.phone.replace(/[\s\-+]/g, '');
//         if (!validatePhone(cleanedPhone)) {
//           setError("Please enter a valid 10-digit Nepali mobile number (starting with 98 or 97)");
//           setLoading(false);
//           return;
//         }

//         // Validate volunteer specific fields if volunteer is checked
//         if (formData.isVolunteer) {
//           if (!formData.city || formData.city.trim() === "") {
//             setError("City is required for volunteers");
//             setLoading(false);
//             return;
//           }

//           if (!formData.animalHandling || formData.animalHandling.trim() === "") {
//             setError("Please specify which animals you can handle");
//             setLoading(false);
//             return;
//           }
//         }

//         const success = await register(
//           formData.username,
//           formData.email,
//           formData.password,
//           cleanedPhone,
//           formData.isVolunteer,
//           formData.isVolunteer ? {
//             hasCar: formData.hasCar,
//             canFoster: formData.canFoster,
//             animalHandling: formData.animalHandling,
//             city: formData.city
//           } : undefined
//         );

//         if (success) {
//           navigate("/dashboard");
//         } else {
//           setError("Registration failed - username or email may already exist");
//         }
//       }
//     } catch (err: any) {
//       setError(err.message || "An error occurred. Please try again.");
//       console.error(err);
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="auth-wrapper">
//       {/* Background Shapes - Matching Hero Page */}
//       <div className="bg-shape-top"></div>
//       <div className="bg-shape-bottom"></div>
//       <div className="bg-wave"></div>
      
//       <div className="auth-box">
//         <div className="auth-left">
//           <div className="auth-left-overlay">
//             <div className="logo">
//               <Icon type="fa" name="FaPaw" size={48} color="#2D5A27" />
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
//                 <label>Username *</label>
//                 <input
//                   name="username"
//                   placeholder="FieldRanger"
//                   value={formData.username}
//                   onChange={handleChange}
//                   required
//                   minLength={3}
//                   maxLength={30}
//                 />
//               </div>
//             )}

//             <div className="form-group">
//               <label>Email Address *</label>
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
//                 <label>Phone Number *</label>
//                 <input
//                   name="phone"
//                   type="tel"
//                   placeholder="98XXXXXXXX"
//                   value={formData.phone}
//                   onChange={handleChange}
//                   required
//                   maxLength={10}
//                 />
//                 <small className="input-hint">Must be 10 digits starting with 98 or 97</small>
//               </div>
//             )}

//             <div className="form-group password-group">
//               <label>Password *</label>
//               <div className="password-input-wrapper">
//                 <input
//                   name="password"
//                   type={showPassword ? "text" : "password"}
//                   placeholder="••••••••"
//                   value={formData.password}
//                   onChange={handleChange}
//                   required
//                   minLength={6}
//                 />
//                 <button
//                   type="button"
//                   className="password-toggle"
//                   onClick={() => setShowPassword(!showPassword)}
//                 >
//                   <Icon 
//                     type="fa" 
//                     name={showPassword ? "FaEyeSlash" : "FaEye"} 
//                     size={18} 
//                   />
//                 </button>
//               </div>
//             </div>

//             {!isLogin && (
//               <>
//                 <div className="form-group password-group">
//                   <label>Confirm Password *</label>
//                   <div className="password-input-wrapper">
//                     <input
//                       name="confirmPassword"
//                       type={showConfirmPassword ? "text" : "password"}
//                       placeholder="••••••••"
//                       value={formData.confirmPassword}
//                       onChange={handleChange}
//                       required
//                     />
//                     <button
//                       type="button"
//                       className="password-toggle"
//                       onClick={() => setShowConfirmPassword(!showConfirmPassword)}
//                     >
//                       <Icon 
//                         type="fa" 
//                         name={showConfirmPassword ? "FaEyeSlash" : "FaEye"} 
//                         size={18} 
//                       />
//                     </button>
//                   </div>
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
//                     <small className="volunteer-note">
//                       Note: Volunteer applications require admin approval before accessing missions.
//                     </small>
//                   </div>
//                   {formData.isVolunteer && (
//                     <Icon type="fa" name="FaPaw" size={60} className="paw-bg" />
//                   )}
//                 </label>

//                 {/* Volunteer-specific fields */}
//                 {formData.isVolunteer && (
//                   <div className="volunteer-fields">
//                     <h4>Volunteer Information</h4>
                    
//                     <div className="form-group checkbox-group">
//                       <label className="checkbox-label">
//                         <input
//                           type="checkbox"
//                           name="hasCar"
//                           checked={formData.hasCar}
//                           onChange={handleChange}
//                         />
//                         <span>I have access to a vehicle</span>
//                       </label>
//                     </div>

//                     <div className="form-group checkbox-group">
//                       <label className="checkbox-label">
//                         <input
//                           type="checkbox"
//                           name="canFoster"
//                           checked={formData.canFoster}
//                           onChange={handleChange}
//                         />
//                         <span>I can foster animals</span>
//                       </label>
//                     </div>

//                     <div className="form-group">
//                       <label>Animal Handling Experience *</label>
//                       <input
//                         type="text"
//                         name="animalHandling"
//                         placeholder="e.g., dogs, cats, all animals, horses"
//                         value={formData.animalHandling}
//                         onChange={handleChange}
//                         required={formData.isVolunteer}
//                       />
//                       <small className="input-hint">Specify which animals you can handle</small>
//                     </div>

//                     <div className="form-group">
//                       <label>City/Location *</label>
//                       <input
//                         name="city"
//                         type="text"
//                         placeholder="e.g., Kathmandu, Pokhara, Lalitpur"
//                         value={formData.city}
//                         onChange={handleChange}
//                         required={formData.isVolunteer}
//                       />
//                     </div>
//                   </div>
//                 )}
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
//                     hasCar: false,
//                     canFoster: false,
//                     animalHandling: "",
//                     city: "",
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
