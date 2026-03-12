import { toast } from 'react-toastify';
// // // // // // import React, { useEffect, useState } from "react";
// // // // // // import { useParams, useNavigate } from "react-router-dom";
// // // // // // import Icon from "../../components/Icon";
// // // // // // import { useAuth } from "../../context/AuthContext";
// // // // // // import "./Profile.css";

// // // // // // interface ProfileUser {
// // // // // //   user_id: number;
// // // // // //   username: string;
// // // // // //   email: string;
// // // // // //   phone: string;
// // // // // //   profile_image_url?: string | null;
// // // // // //   role_name?: "admin" | "volunteer" | "user";
// // // // // //   created_at: string;
// // // // // //   volunteer?: {
// // // // // //     status?: string;
// // // // // //     badges?: string[];
// // // // // //     volunteer_since?: string;
// // // // // //   };
// // // // // // }

// // // // // // export const Profile: React.FC = () => {
// // // // // //   const { userId: paramUserId } = useParams<{ userId: string }>();
// // // // // //   const { user: currentUser } = useAuth();
// // // // // //   const navigate = useNavigate();

// // // // // //   const [profileUser, setProfileUser] = useState<ProfileUser | null>(null);
// // // // // //   const [loading, setLoading] = useState(true);
// // // // // //   const [error, setError] = useState<string | null>(null);
// // // // // //   const [editing, setEditing] = useState(false);
// // // // // //   const [formData, setFormData] = useState({
// // // // // //     username: "",
// // // // // //     email: "",
// // // // // //     phone: "",
// // // // // //   });
// // // // // //   const [saving, setSaving] = useState(false);

// // // // // //   const userId = paramUserId || currentUser?.user_id?.toString();

// // // // // //   useEffect(() => {
// // // // // //     if (!userId) return;

// // // // // //     const fetchUser = async () => {
// // // // // //       setLoading(true);
// // // // // //       setError(null);
// // // // // //       try {
// // // // // //         const token = sessionStorage.getItem("token");
// // // // // //         if (!token) throw new Error("No authentication token found");

// // // // // //         const res = await fetch(`http://localhost:5000/api/users/${userId}`, {
// // // // // //           headers: { 
// // // // // //             Authorization: `Bearer ${token}`,
// // // // // //             "Content-Type": "application/json"
// // // // // //           },
// // // // // //         });

// // // // // //         if (!res.ok) {
// // // // // //           throw new Error(`Failed to fetch user (${res.status})`);
// // // // // //         }

// // // // // //         const data = await res.json();

// // // // // //         setProfileUser(data);
// // // // // //         setFormData({
// // // // // //           username: data.username || "",
// // // // // //           email: data.email || "",
// // // // // //           phone: data.phone || "",
// // // // // //         });
// // // // // //       } catch (err: any) {
// // // // // //         console.error("Fetch user error:", err);
// // // // // //         setError(err.message);
// // // // // //       } finally {
// // // // // //         setLoading(false);
// // // // // //       }
// // // // // //     };

// // // // // //     fetchUser();
// // // // // //   }, [userId]);

// // // // // //   const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
// // // // // //     setFormData({ ...formData, [e.target.name]: e.target.value });
// // // // // //   };

// // // // // //   const handleSave = async () => {
// // // // // //     if (!profileUser) return;

// // // // // //     try {
// // // // // //       setSaving(true);
// // // // // //       const token = sessionStorage.getItem("token");
// // // // // //       if (!token) throw new Error("No authentication token");

// // // // // //       const res = await fetch(`http://localhost:5000/api/users/${profileUser.user_id}`, {
// // // // // //         method: "PATCH",
// // // // // //         headers: {
// // // // // //           "Content-Type": "application/json",
// // // // // //           Authorization: `Bearer ${token}`,
// // // // // //         },
// // // // // //         body: JSON.stringify(formData),
// // // // // //       });

// // // // // //       if (!res.ok) {
// // // // // //         throw new Error(`Failed to update profile (${res.status})`);
// // // // // //       }

// // // // // //       const result = await res.json();

// // // // // //       setProfileUser(prev => prev ? { ...prev, ...formData } : null);
// // // // // //       setEditing(false);
// // // // // //       toast.success("Profile updated successfully!");
// // // // // //     } catch (err: any) {
// // // // // //       console.error("Update error:", err);
// // // // // //       toast.success("Failed to update profile: " + err.message);
// // // // // //     } finally {
// // // // // //       setSaving(false);
// // // // // //     }
// // // // // //   };

// // // // // //   const handleCancel = () => {
// // // // // //     if (profileUser) {
// // // // // //       setFormData({
// // // // // //         username: profileUser.username,
// // // // // //         email: profileUser.email,
// // // // // //         phone: profileUser.phone,
// // // // // //       });
// // // // // //     }
// // // // // //     setEditing(false);
// // // // // //   };

// // // // // //   if (loading) {
// // // // // //     return (
// // // // // //       <div className="profile-loading">
// // // // // //         <Icon type="fa" name="FaSpinner" className="spinner" size={32} />
// // // // // //         <p>Loading profile...</p>
// // // // // //       </div>
// // // // // //     );
// // // // // //   }

// // // // // //   if (error) {
// // // // // //     return (
// // // // // //       <div className="profile-error">
// // // // // //         <h3>Error Loading Profile</h3>
// // // // // //         <p>{error}</p>
// // // // // //         <div className="error-actions">
// // // // // //           <button onClick={() => window.location.reload()}>Retry</button>
// // // // // //           <button onClick={() => navigate("/dashboard")}>Dashboard</button>
// // // // // //         </div>
// // // // // //       </div>
// // // // // //     );
// // // // // //   }

// // // // // //   if (!profileUser) {
// // // // // //     return (
// // // // // //       <div className="profile-not-found">
// // // // // //         <h3>Profile Not Found</h3>
// // // // // //         <p>The requested profile could not be loaded.</p>
// // // // // //         <button onClick={() => navigate(-1)}>Go Back</button>
// // // // // //       </div>
// // // // // //     );
// // // // // //   }

// // // // // //   const joinDate = profileUser.created_at
// // // // // //     ? new Date(profileUser.created_at).toLocaleDateString("en-US", {
// // // // // //         year: "numeric",
// // // // // //         month: "long",
// // // // // //         day: "numeric",
// // // // // //       })
// // // // // //     : "Unknown";

// // // // // //   const canEdit = currentUser && (
// // // // // //     currentUser.user_id === profileUser.user_id || 
// // // // // //     (currentUser.role && (
// // // // // //       (typeof currentUser.role === 'object' && currentUser.role.role_name === 'admin') ||
// // // // // //       (typeof currentUser.role === 'string' && currentUser.role === 'admin')
// // // // // //     ))
// // // // // //   );

// // // // // //   return (
// // // // // //     <div className="profile-container">
// // // // // //       <div className="profile-header">
// // // // // //         <button onClick={() => navigate(-1)} className="back-button">
// // // // // //           <Icon type="feather" name="FiArrowLeft" /> Back
// // // // // //         </button>
// // // // // //         <div className="header-content">
// // // // // //           <h2>{profileUser.username}'s Profile</h2>
// // // // // //           <p>Manage your account details and settings</p>
// // // // // //         </div>
// // // // // //       </div>

// // // // // //       <div className="profile-grid">
// // // // // //         <div className="profile-card">
// // // // // //           <div className="profile-avatar">
// // // // // //             {profileUser.profile_image_url ? (
// // // // // //               <img
// // // // // //                 src={profileUser.profile_image_url}
// // // // // //                 alt="Avatar"
// // // // // //                 className="avatar-img"
// // // // // //                 onError={(e) => {
// // // // // //                   e.currentTarget.style.display = "none";
// // // // // //                   const parent = e.currentTarget.parentElement;
// // // // // //                   if (parent) {
// // // // // //                     const fallback = parent.querySelector('.avatar-fallback') as HTMLDivElement;
// // // // // //                     if (fallback) fallback.style.display = 'flex';
// // // // // //                   }
// // // // // //                 }}
// // // // // //               />
// // // // // //             ) : null}
// // // // // //             <div className="avatar-fallback">
// // // // // //               {profileUser.username?.charAt(0)?.toUpperCase() || "U"}
// // // // // //             </div>
// // // // // //           </div>

// // // // // //           {!editing ? (
// // // // // //             <>
// // // // // //               <div className="profile-info">
// // // // // //                 <h3 className="profile-username">{profileUser.username}</h3>
// // // // // //                 <p className={`role-badge ${profileUser.role_name || ""}`}>
// // // // // //                   {profileUser.role_name?.toUpperCase() || "USER"}
// // // // // //                   {profileUser.volunteer?.status ? ` • ${profileUser.volunteer.status.toUpperCase()}` : ""}
// // // // // //                 </p>

// // // // // //                 <div className="profile-details">
// // // // // //                   <div className="detail-item">
// // // // // //                     <Icon type="feather" name="FiMail" size={16} />
// // // // // //                     <span>{profileUser.email || "Not provided"}</span>
// // // // // //                   </div>
// // // // // //                   <div className="detail-item">
// // // // // //                     <Icon type="feather" name="FiPhone" size={16} />
// // // // // //                     <span>{profileUser.phone || "Not provided"}</span>
// // // // // //                   </div>
// // // // // //                   <div className="detail-item">
// // // // // //                     <Icon type="feather" name="FiCalendar" size={16} />
// // // // // //                     <span>Joined {joinDate}</span>
// // // // // //                   </div>
// // // // // //                 </div>

// // // // // //                 {canEdit && (
// // // // // //                   <button 
// // // // // //                     onClick={() => setEditing(true)} 
// // // // // //                     className="btn-edit"
// // // // // //                   >
// // // // // //                     <Icon type="feather" name="FiEdit" /> Edit Profile
// // // // // //                   </button>
// // // // // //                 )}
// // // // // //               </div>
// // // // // //             </>
// // // // // //           ) : (
// // // // // //             <>
// // // // // //               <div className="profile-form">
// // // // // //                 <h3>Edit Profile</h3>
                
// // // // // //                 <div className="form-group">
// // // // // //                   <label htmlFor="username">
// // // // // //                     <Icon type="feather" name="FiUser" size={14} /> Username *
// // // // // //                   </label>
// // // // // //                   <input
// // // // // //                     id="username"
// // // // // //                     type="text"
// // // // // //                     name="username"
// // // // // //                     value={formData.username}
// // // // // //                     onChange={handleChange}
// // // // // //                     placeholder="Enter username"
// // // // // //                     required
// // // // // //                   />
// // // // // //                 </div>

// // // // // //                 <div className="form-group">
// // // // // //                   <label htmlFor="email">
// // // // // //                     <Icon type="feather" name="FiMail" size={14} /> Email *
// // // // // //                   </label>
// // // // // //                   <input
// // // // // //                     id="email"
// // // // // //                     type="email"
// // // // // //                     name="email"
// // // // // //                     value={formData.email}
// // // // // //                     onChange={handleChange}
// // // // // //                     placeholder="Enter email"
// // // // // //                     required
// // // // // //                   />
// // // // // //                 </div>

// // // // // //                 <div className="form-group">
// // // // // //                   <label htmlFor="phone">
// // // // // //                     <Icon type="feather" name="FiPhone" size={14} /> Phone
// // // // // //                   </label>
// // // // // //                   <input
// // // // // //                     id="phone"
// // // // // //                     type="text"
// // // // // //                     name="phone"
// // // // // //                     value={formData.phone}
// // // // // //                     onChange={handleChange}
// // // // // //                     placeholder="Enter phone number"
// // // // // //                   />
// // // // // //                 </div>

// // // // // //                 <div className="form-actions">
// // // // // //                   <button 
// // // // // //                     onClick={handleSave} 
// // // // // //                     className="btn-save"
// // // // // //                     disabled={saving}
// // // // // //                   >
// // // // // //                     <Icon type="feather" name="FiCheck" /> 
// // // // // //                     {saving ? "Saving..." : "Save Changes"}
// // // // // //                   </button>
// // // // // //                   <button 
// // // // // //                     onClick={handleCancel} 
// // // // // //                     className="btn-cancel"
// // // // // //                     disabled={saving}
// // // // // //                   >
// // // // // //                     <Icon type="feather" name="FiX" /> Cancel
// // // // // //                   </button>
// // // // // //                 </div>
// // // // // //               </div>
// // // // // //             </>
// // // // // //           )}
// // // // // //         </div>
// // // // // //       </div>
// // // // // //     </div>
// // // // // //   );
// // // // // // };


// // // // // import React, { useEffect, useState, useRef } from "react";
// // // // // import { useParams, useNavigate } from "react-router-dom";
// // // // // import Icon from "../../components/Icon";
// // // // // import { useAuth } from "../../context/AuthContext";
// // // // // import "./Profile.css";

// // // // // interface ProfileUser {
// // // // //   user_id: number;
// // // // //   username: string;
// // // // //   email: string;
// // // // //   phone: string;
// // // // //   bio: string;
// // // // //   profile_image_url?: string | null;
// // // // //   role_name?: "admin" | "volunteer" | "user";
// // // // //   created_at: string;
// // // // //   volunteer?: {
// // // // //     status?: string;
// // // // //     badges?: string[];
// // // // //     volunteer_since?: string;
// // // // //   };
// // // // // }

// // // // // export const Profile: React.FC = () => {
// // // // //   const { userId: paramUserId } = useParams<{ userId: string }>();
// // // // //   const { user: currentUser } = useAuth();
// // // // //   const navigate = useNavigate();
// // // // //   const fileInputRef = useRef<HTMLInputElement>(null);

// // // // //   const [profileUser, setProfileUser] = useState<ProfileUser | null>(null);
// // // // //   const [loading, setLoading] = useState(true);
// // // // //   const [error, setError] = useState<string | null>(null);
// // // // //   const [editing, setEditing] = useState(false);
// // // // //   const [saving, setSaving] = useState(false);
// // // // //   const [uploadingImage, setUploadingImage] = useState(false);
// // // // //   const [showImageControls, setShowImageControls] = useState(false);
// // // // //   const [imageVersion, setImageVersion] = useState(0); // Add this for cache busting

// // // // //   const [formData, setFormData] = useState({
// // // // //     username: "",
// // // // //     email: "",
// // // // //     phone: "",
// // // // //     bio: "",
// // // // //   });

// // // // //   const userId = paramUserId || currentUser?.user_id?.toString();

// // // // //   const getFullImageUrl = (url: string | null | undefined) => {
// // // // //     if (!url) return null;
// // // // //     // If it's already a full URL, return it
// // // // //     if (url.startsWith('http')) return url;
// // // // //     // If it's a relative path, prepend the backend URL
// // // // //     if (url.startsWith('/')) {
// // // // //       return `http://localhost:5000${url}${imageVersion ? `?v=${imageVersion}` : ''}`;
// // // // //     }
// // // // //     return url;
// // // // //   };

// // // // //   useEffect(() => {
// // // // //     if (!userId) return;

// // // // //     const fetchUser = async () => {
// // // // //       setLoading(true);
// // // // //       setError(null);
// // // // //       try {
// // // // //         const token = sessionStorage.getItem("token");
// // // // //         if (!token) throw new Error("No authentication token found");

// // // // //         const res = await fetch(`http://localhost:5000/api/users/${userId}`, {
// // // // //           headers: { 
// // // // //             Authorization: `Bearer ${token}`,
// // // // //             "Content-Type": "application/json"
// // // // //           },
// // // // //         });

// // // // //         if (!res.ok) {
// // // // //           throw new Error(`Failed to fetch user (${res.status})`);
// // // // //         }

// // // // //         const data = await res.json();
// // // // //         setProfileUser(data);
// // // // //         setFormData({
// // // // //           username: data.username || "",
// // // // //           email: data.email || "",
// // // // //           phone: data.phone || "",
// // // // //           bio: data.bio || "",
// // // // //         });
// // // // //       } catch (err: any) {
// // // // //         console.error("Fetch user error:", err);
// // // // //         setError(err.message);
// // // // //       } finally {
// // // // //         setLoading(false);
// // // // //       }
// // // // //     };

// // // // //     fetchUser();
// // // // //   }, [userId]);

// // // // //   const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
// // // // //     setFormData({ ...formData, [e.target.name]: e.target.value });
// // // // //   };

// // // // //   const handleAvatarClick = () => {
// // // // //     if (canEdit && !editing && fileInputRef.current) {
// // // // //       fileInputRef.current.click();
// // // // //     }
// // // // //   };

// // // // //   const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
// // // // //     const file = e.target.files?.[0];
// // // // //     if (!file || !profileUser) return;

// // // // //     const validTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/gif', 'image/webp'];
// // // // //     if (!validTypes.includes(file.type)) {
// // // // //       toast.success('Please select a valid image file (JPEG, PNG, GIF, WEBP)');
// // // // //       return;
// // // // //     }

// // // // //     if (file.size > 2 * 1024 * 1024) {
// // // // //       toast.success('Image size should be less than 2MB');
// // // // //       return;
// // // // //     }

// // // // //     try {
// // // // //       setUploadingImage(true);
// // // // //       const token = sessionStorage.getItem("token");
// // // // //       if (!token) throw new Error("No authentication token");

// // // // //       const uploadFormData = new FormData();
// // // // //       uploadFormData.append('profile_image', file);

// // // // //       const res = await fetch(`http://localhost:5000/api/users/${profileUser.user_id}/profile-image`, {
// // // // //         method: "POST",
// // // // //         headers: {
// // // // //           Authorization: `Bearer ${token}`,
// // // // //         },
// // // // //         body: uploadFormData,
// // // // //       });

// // // // //       if (!res.ok) {
// // // // //         const errorData = await res.json().catch(() => ({}));
// // // // //         throw new Error(`Failed to upload image: ${errorData.message || res.statusText}`);
// // // // //       }

// // // // //       const result = await res.json();
// // // // //       console.log("Upload response:", result);
      
// // // // //       // Force image reload by incrementing version
// // // // //       setImageVersion(prev => prev + 1);
      
// // // // //       // Update profileUser with the new image URL
// // // // //       setProfileUser(prev => {
// // // // //         if (!prev) return null;
// // // // //         return {
// // // // //           ...prev,
// // // // //           profile_image_url: result.profile_image_url || result.image_url || result.url
// // // // //         };
// // // // //       });
      
// // // // //       setShowImageControls(false);
      
// // // // //       // Force a re-fetch of user data after a short delay
// // // // //       setTimeout(() => {
// // // // //         const refreshData = async () => {
// // // // //           try {
// // // // //             const token = sessionStorage.getItem("token");
// // // // //             const res = await fetch(`http://localhost:5000/api/users/${userId}`, {
// // // // //               headers: { 
// // // // //                 Authorization: `Bearer ${token}`,
// // // // //                 "Content-Type": "application/json"
// // // // //               },
// // // // //             });
// // // // //             if (res.ok) {
// // // // //               const data = await res.json();
// // // // //               setProfileUser(data);
// // // // //             }
// // // // //           } catch (err) {
// // // // //             console.error("Failed to refresh user data:", err);
// // // // //           }
// // // // //         };
// // // // //         refreshData();
// // // // //       }, 500);
      
// // // // //       toast.success("Profile image updated successfully!");
// // // // //     } catch (err: any) {
// // // // //       console.error("Image upload error:", err);
// // // // //       toast.success("Failed to upload image: " + err.message);
// // // // //     } finally {
// // // // //       setUploadingImage(false);
// // // // //       if (fileInputRef.current) {
// // // // //         fileInputRef.current.value = '';
// // // // //       }
// // // // //     }
// // // // //   };

// // // // //   const handleRemoveImage = async () => {
// // // // //     if (!profileUser) return;

// // // // //     if (!window.confirm("Are you sure you want to remove your profile image?")) {
// // // // //       return;
// // // // //     }

// // // // //     try {
// // // // //       setUploadingImage(true);
// // // // //       const token = sessionStorage.getItem("token");
// // // // //       if (!token) throw new Error("No authentication token");

// // // // //       const res = await fetch(`http://localhost:5000/api/users/${profileUser.user_id}/profile-image`, {
// // // // //         method: "DELETE",
// // // // //         headers: {
// // // // //           Authorization: `Bearer ${token}`,
// // // // //         },
// // // // //       });

// // // // //       if (!res.ok) {
// // // // //         const errorData = await res.json().catch(() => ({}));
// // // // //         throw new Error(`Failed to remove image: ${errorData.message || res.statusText}`);
// // // // //       }

// // // // //       // Force image reload by incrementing version
// // // // //       setImageVersion(prev => prev + 1);
      
// // // // //       // Update profileUser to remove image URL
// // // // //       setProfileUser(prev => {
// // // // //         if (!prev) return null;
// // // // //         return {
// // // // //           ...prev,
// // // // //           profile_image_url: null
// // // // //         };
// // // // //       });
      
// // // // //       setShowImageControls(false);
// // // // //       toast.success("Profile image removed successfully!");
// // // // //     } catch (err: any) {
// // // // //       console.error("Image removal error:", err);
// // // // //       toast.success("Failed to remove image: " + err.message);
// // // // //     } finally {
// // // // //       setUploadingImage(false);
// // // // //     }
// // // // //   };

// // // // //   const handleSave = async () => {
// // // // //     if (!profileUser) return;

// // // // //     if (!formData.username.trim() || !formData.email.trim()) {
// // // // //       toast.success("Username and email are required");
// // // // //       return;
// // // // //     }

// // // // //     try {
// // // // //       setSaving(true);
// // // // //       const token = sessionStorage.getItem("token");
// // // // //       if (!token) throw new Error("No authentication token");

// // // // //       const res = await fetch(`http://localhost:5000/api/users/${profileUser.user_id}`, {
// // // // //         method: "PATCH",
// // // // //         headers: {
// // // // //           "Content-Type": "application/json",
// // // // //           Authorization: `Bearer ${token}`,
// // // // //         },
// // // // //         body: JSON.stringify({
// // // // //           username: formData.username,
// // // // //           email: formData.email,
// // // // //           phone: formData.phone,
// // // // //           bio: formData.bio,
// // // // //         }),
// // // // //       });

// // // // //       if (!res.ok) {
// // // // //         const errorData = await res.json().catch(() => ({}));
// // // // //         throw new Error(`Failed to update profile: ${errorData.message || res.statusText}`);
// // // // //       }

// // // // //       setProfileUser(prev => prev ? { 
// // // // //         ...prev, 
// // // // //         username: formData.username,
// // // // //         email: formData.email,
// // // // //         phone: formData.phone,
// // // // //         bio: formData.bio,
// // // // //       } : null);
      
// // // // //       setEditing(false);
// // // // //       toast.success("Profile updated successfully!");
// // // // //     } catch (err: any) {
// // // // //       console.error("Update error:", err);
// // // // //       toast.success("Failed to update profile: " + err.message);
// // // // //     } finally {
// // // // //       setSaving(false);
// // // // //     }
// // // // //   };

// // // // //   const handleCancel = () => {
// // // // //     if (profileUser) {
// // // // //       setFormData({
// // // // //         username: profileUser.username,
// // // // //         email: profileUser.email,
// // // // //         phone: profileUser.phone,
// // // // //         bio: profileUser.bio || "",
// // // // //       });
// // // // //     }
// // // // //     setEditing(false);
// // // // //   };

// // // // //   if (loading) {
// // // // //     return (
// // // // //       <div className="profile-loading">
// // // // //         <Icon type="fa" name="FaSpinner" className="spinner" size={32} />
// // // // //         <p>Loading profile...</p>
// // // // //       </div>
// // // // //     );
// // // // //   }

// // // // //   if (error) {
// // // // //     return (
// // // // //       <div className="profile-error">
// // // // //         <h3>Error Loading Profile</h3>
// // // // //         <p>{error}</p>
// // // // //         <div className="error-actions">
// // // // //           <button onClick={() => window.location.reload()}>Retry</button>
// // // // //           <button onClick={() => navigate("/dashboard")}>Dashboard</button>
// // // // //         </div>
// // // // //       </div>
// // // // //     );
// // // // //   }

// // // // //   if (!profileUser) {
// // // // //     return (
// // // // //       <div className="profile-not-found">
// // // // //         <h3>Profile Not Found</h3>
// // // // //         <p>The requested profile could not be loaded.</p>
// // // // //         <button onClick={() => navigate(-1)}>Go Back</button>
// // // // //       </div>
// // // // //     );
// // // // //   }

// // // // //   const joinDate = profileUser.created_at
// // // // //     ? new Date(profileUser.created_at).toLocaleDateString("en-US", {
// // // // //         month: "long",
// // // // //         day: "numeric",
// // // // //         year: "numeric",
// // // // //       })
// // // // //     : "Unknown";

// // // // //   const canEdit = currentUser && (
// // // // //     currentUser.user_id === profileUser.user_id || 
// // // // //     (currentUser.role && (
// // // // //       (typeof currentUser.role === 'object' && currentUser.role.role_name === 'admin') ||
// // // // //       (typeof currentUser.role === 'string' && currentUser.role === 'admin')
// // // // //     ))
// // // // //   );

// // // // //   const isVolunteer = profileUser.role_name === 'volunteer';
// // // // //   const isAdmin = profileUser.role_name === 'admin';
// // // // //   const imageUrl = getFullImageUrl(profileUser.profile_image_url);

// // // // //   return (
// // // // //     <div className="ranger-profile">
// // // // //       <div className="profile-container">
// // // // //         <div className="profile-header">
// // // // //           <h1 className="profile-title">Ranger Profile</h1>
// // // // //           <p className="profile-subtitle">Your identity and service record.</p>
// // // // //         </div>

// // // // //         <div className="profile-layout">
// // // // //           {/* Left Column - Profile Display */}
// // // // //           <div className="profile-display">
// // // // //             <div className="profile-card">
// // // // //               <div className="profile-cover">
// // // // //                 <div className="profile-avatar-wrapper">
// // // // //                   <div 
// // // // //                     className={`profile-avatar ${canEdit && !editing ? 'editable' : ''} ${uploadingImage ? 'uploading' : ''}`}
// // // // //                     onClick={handleAvatarClick}
// // // // //                     onMouseEnter={() => canEdit && !editing && !uploadingImage && setShowImageControls(true)}
// // // // //                     onMouseLeave={() => setShowImageControls(false)}
// // // // //                   >
// // // // //                     {uploadingImage ? (
// // // // //                       <div className="avatar-loading">
// // // // //                         <Icon type="fa" name="FaSpinner" className="spinner" size={24} />
// // // // //                       </div>
// // // // //                     ) : imageUrl ? (
// // // // //                       <img 
// // // // //                         key={`${imageUrl}-${imageVersion}`}
// // // // //                         src={imageUrl} 
// // // // //                         alt={profileUser.username}
// // // // //                         className="avatar-image"
// // // // //                         onError={(e) => {
// // // // //                           console.error("Image failed to load:", imageUrl);
// // // // //                           // If image fails to load, update state to remove broken URL
// // // // //                           setProfileUser(prev => prev ? { ...prev, profile_image_url: null } : null);
// // // // //                         }}
// // // // //                       />
// // // // //                     ) : (
// // // // //                       <div className="avatar-initial">
// // // // //                         {profileUser.username?.charAt(0)?.toUpperCase() || "U"}
// // // // //                       </div>
// // // // //                     )}
                    
// // // // //                     {canEdit && !editing && showImageControls && !uploadingImage && (
// // // // //                       <div className="avatar-overlay">
// // // // //                         <Icon type="feather" name="FiCamera" size={24} />
// // // // //                         <span>Change Photo</span>
// // // // //                       </div>
// // // // //                     )}
// // // // //                   </div>

// // // // //                   {/* Image upload controls */}
// // // // //                   {canEdit && !editing && (
// // // // //                     <div className="avatar-controls">
// // // // //                       <input
// // // // //                         ref={fileInputRef}
// // // // //                         type="file"
// // // // //                         accept="image/*"
// // // // //                         onChange={handleImageUpload}
// // // // //                         disabled={uploadingImage}
// // // // //                         style={{ display: 'none' }}
// // // // //                       />
// // // // //                       <div className="avatar-buttons">
// // // // //                         <button 
// // // // //                           className="btn-change-avatar"
// // // // //                           onClick={() => fileInputRef.current?.click()}
// // // // //                           disabled={uploadingImage}
// // // // //                         >
// // // // //                           <Icon type="feather" name={uploadingImage ? "FiLoader" : "FiCamera"} size={14} />
// // // // //                           {uploadingImage ? 'Uploading...' : 'Change Photo'}
// // // // //                         </button>
// // // // //                         {imageUrl && (
// // // // //                           <button 
// // // // //                             className="btn-remove-avatar"
// // // // //                             onClick={handleRemoveImage}
// // // // //                             disabled={uploadingImage}
// // // // //                           >
// // // // //                             <Icon type="feather" name={uploadingImage ? "FiLoader" : "FiTrash2"} size={14} />
// // // // //                             Remove
// // // // //                           </button>
// // // // //                         )}
// // // // //                       </div>
// // // // //                     </div>
// // // // //                   )}
// // // // //                 </div>
// // // // //               </div>

// // // // //               <div className="profile-content">
// // // // //                 <h2 className="profile-name">{profileUser.username}</h2>
                
// // // // //                 <div className={`role-badge ${profileUser.role_name || 'user'}`}>
// // // // //                   <span className="badge-text">
// // // // //                     {profileUser.role_name?.toUpperCase() || "USER"}
// // // // //                     {profileUser.volunteer?.status && ` • ${profileUser.volunteer.status.toUpperCase()}`}
// // // // //                   </span>
// // // // //                 </div>

// // // // //                 <div className="profile-bio-section">
// // // // //                   <div className="bio-label">
// // // // //                     <Icon type="feather" name="FiUser" size={14} />
// // // // //                     <span>About</span>
// // // // //                   </div>
// // // // //                   <p className="profile-bio">
// // // // //                     {profileUser.bio || (isAdmin 
// // // // //                       ? 'System Administrator and Animal Lover.' 
// // // // //                       : isVolunteer 
// // // // //                         ? 'Wildlife Conservation Ranger' 
// // // // //                         : 'Community Member')}
// // // // //                   </p>
// // // // //                 </div>

// // // // //                 <div className="profile-info">
// // // // //                   <div className="info-item">
// // // // //                     <div className="info-icon">
// // // // //                       <Icon type="feather" name="FiMail" size={16} />
// // // // //                     </div>
// // // // //                     <div className="info-content">
// // // // //                       <div className="info-label">Email</div>
// // // // //                       <div className="info-value">{profileUser.email}</div>
// // // // //                     </div>
// // // // //                   </div>

// // // // //                   <div className="info-item">
// // // // //                     <div className="info-icon">
// // // // //                       <Icon type="feather" name="FiCalendar" size={16} />
// // // // //                     </div>
// // // // //                     <div className="info-content">
// // // // //                       <div className="info-label">Member Since</div>
// // // // //                       <div className="info-value">{joinDate}</div>
// // // // //                     </div>
// // // // //                   </div>

// // // // //                   {profileUser.volunteer?.volunteer_since && (
// // // // //                     <div className="info-item">
// // // // //                       <div className="info-icon">
// // // // //                         <Icon type="feather" name="FiAward" size={16} />
// // // // //                       </div>
// // // // //                       <div className="info-content">
// // // // //                         <div className="info-label">Volunteer Since</div>
// // // // //                         <div className="info-value">
// // // // //                           {new Date(profileUser.volunteer.volunteer_since).toLocaleDateString("en-US", {
// // // // //                             month: "long",
// // // // //                             day: "numeric",
// // // // //                             year: "numeric",
// // // // //                           })}
// // // // //                         </div>
// // // // //                       </div>
// // // // //                     </div>
// // // // //                   )}

// // // // //                   <div className="info-item">
// // // // //                     <div className="info-icon">
// // // // //                       <Icon type="feather" name="FiHash" size={16} />
// // // // //                     </div>
// // // // //                     <div className="info-content">
// // // // //                       <div className="info-label">User ID</div>
// // // // //                       <div className="info-value">SRMS-{profileUser.user_id.toString().padStart(6, '0')}</div>
// // // // //                     </div>
// // // // //                   </div>
// // // // //                 </div>

// // // // //                 {!editing && canEdit && (
// // // // //                   <button 
// // // // //                     className="btn-edit-profile"
// // // // //                     onClick={() => setEditing(true)}
// // // // //                   >
// // // // //                     <Icon type="feather" name="FiEdit2" size={16} />
// // // // //                     Edit Profile
// // // // //                   </button>
// // // // //                 )}
// // // // //               </div>
// // // // //             </div>

// // // // //             {/* Badges Section for Volunteers */}
// // // // //             {isVolunteer && profileUser.volunteer?.badges && profileUser.volunteer.badges.length > 0 && (
// // // // //               <div className="badges-card">
// // // // //                 <div className="badges-header">
// // // // //                   <Icon type="feather" name="FiAward" size={18} />
// // // // //                   <h3>Achievement Badges</h3>
// // // // //                 </div>
// // // // //                 <div className="badges-grid">
// // // // //                   {profileUser.volunteer.badges.map((badge, index) => (
// // // // //                     <div key={index} className="badge-item">
// // // // //                       <Icon type="feather" name="FiStar" size={12} />
// // // // //                       <span>{badge}</span>
// // // // //                     </div>
// // // // //                   ))}
// // // // //                 </div>
// // // // //               </div>
// // // // //             )}
// // // // //           </div>

// // // // //           {/* Right Column - Edit Form or Details */}
// // // // //           <div className="profile-edit">
// // // // //             {editing ? (
// // // // //               <div className="edit-section">
// // // // //                 <div className="edit-notice">
// // // // //                   <div className="edit-notice-content">
// // // // //                     <Icon type="feather" name="FiEdit3" size={16} />
// // // // //                     <span>You are currently editing your profile.</span>
// // // // //                   </div>
// // // // //                   <div className="edit-notice-actions">
// // // // //                     <button 
// // // // //                       className="btn-cancel-edit"
// // // // //                       onClick={handleCancel}
// // // // //                       disabled={saving}
// // // // //                     >
// // // // //                       Cancel
// // // // //                     </button>
// // // // //                     <button 
// // // // //                       className="btn-save-edit"
// // // // //                       onClick={handleSave}
// // // // //                       disabled={saving}
// // // // //                     >
// // // // //                       {saving ? 'Saving...' : 'Save Changes'}
// // // // //                     </button>
// // // // //                   </div>
// // // // //                 </div>

// // // // //                 <div className="edit-form-card">
// // // // //                   <h3 className="edit-form-title">
// // // // //                     <Icon type="feather" name="FiUser" size={18} />
// // // // //                     Edit Personal Information
// // // // //                   </h3>
                  
// // // // //                   <div className="edit-form">
// // // // //                     <div className="form-group">
// // // // //                       <label htmlFor="username">Username *</label>
// // // // //                       <input
// // // // //                         id="username"
// // // // //                         type="text"
// // // // //                         name="username"
// // // // //                         value={formData.username}
// // // // //                         onChange={handleChange}
// // // // //                         placeholder="Enter username"
// // // // //                         required
// // // // //                       />
// // // // //                     </div>

// // // // //                     <div className="form-group">
// // // // //                       <label htmlFor="email">Email Address *</label>
// // // // //                       <input
// // // // //                         id="email"
// // // // //                         type="email"
// // // // //                         name="email"
// // // // //                         value={formData.email}
// // // // //                         onChange={handleChange}
// // // // //                         placeholder="Enter email address"
// // // // //                         required
// // // // //                       />
// // // // //                     </div>

// // // // //                     <div className="form-group">
// // // // //                       <label htmlFor="phone">Phone Number</label>
// // // // //                       <input
// // // // //                         id="phone"
// // // // //                         type="tel"
// // // // //                         name="phone"
// // // // //                         value={formData.phone}
// // // // //                         onChange={handleChange}
// // // // //                         placeholder="Enter phone number"
// // // // //                       />
// // // // //                     </div>

// // // // //                     <div className="form-group">
// // // // //                       <label htmlFor="bio">Bio</label>
// // // // //                       <textarea
// // // // //                         id="bio"
// // // // //                         name="bio"
// // // // //                         value={formData.bio}
// // // // //                         onChange={handleChange}
// // // // //                         placeholder="Tell us about yourself..."
// // // // //                         rows={5}
// // // // //                       />
// // // // //                       <div className="char-counter">
// // // // //                         {formData.bio.length}/500 characters
// // // // //                       </div>
// // // // //                     </div>
// // // // //                   </div>
// // // // //                 </div>
// // // // //               </div>
// // // // //             ) : (
// // // // //               <div className="details-section">
// // // // //                 <div className="details-card">
// // // // //                   <h3 className="details-title">
// // // // //                     <Icon type="feather" name="FiInfo" size={18} />
// // // // //                     Profile Information
// // // // //                   </h3>
                  
// // // // //                   <div className="details-content">
// // // // //                     <div className="detail-row">
// // // // //                       <span className="detail-label">Account Status</span>
// // // // //                       <span className={`detail-value status ${profileUser.role_name || 'user'}`}>
// // // // //                         {isAdmin ? 'Administrator' : isVolunteer ? 'Active Volunteer' : 'Regular User'}
// // // // //                       </span>
// // // // //                     </div>
                    
// // // // //                     <div className="detail-row">
// // // // //                       <span className="detail-label">Email Verified</span>
// // // // //                       <span className="detail-value verified">Yes</span>
// // // // //                     </div>
                    
// // // // //                     <div className="detail-row">
// // // // //                       <span className="detail-label">Profile Completeness</span>
// // // // //                       <div className="progress-container">
// // // // //                         <div className="progress-bar">
// // // // //                           <div 
// // // // //                             className="progress-fill"
// // // // //                             style={{ width: `${(profileUser.bio ? 20 : 0) + (profileUser.phone ? 20 : 0) + 60}%` }}
// // // // //                           />
// // // // //                         </div>
// // // // //                         <span className="progress-text">
// // // // //                           {((profileUser.bio ? 20 : 0) + (profileUser.phone ? 20 : 0) + 60)}%
// // // // //                         </span>
// // // // //                       </div>
// // // // //                     </div>
                    
// // // // //                     <div className="detail-row">
// // // // //                       <span className="detail-label">Last Updated</span>
// // // // //                       <span className="detail-value">
// // // // //                         {new Date(profileUser.created_at).toLocaleDateString()}
// // // // //                       </span>
// // // // //                     </div>
// // // // //                   </div>
// // // // //                 </div>

// // // // //                 <div className="quick-actions">
// // // // //                   <h4>Quick Actions</h4>
// // // // //                   <div className="action-buttons">
// // // // //                     <button className="action-btn">
// // // // //                       <Icon type="feather" name="FiSettings" size={16} />
// // // // //                       <span>Account Settings</span>
// // // // //                     </button>
// // // // //                     <button className="action-btn">
// // // // //                       <Icon type="feather" name="FiLock" size={16} />
// // // // //                       <span>Privacy Settings</span>
// // // // //                     </button>
// // // // //                     <button className="action-btn">
// // // // //                       <Icon type="feather" name="FiBell" size={16} />
// // // // //                       <span>Notifications</span>
// // // // //                     </button>
// // // // //                   </div>
// // // // //                 </div>
// // // // //               </div>
// // // // //             )}
// // // // //           </div>
// // // // //         </div>
// // // // //       </div>
// // // // //     </div>
// // // // //   );
// // // // // };

// // // // import React, { useEffect, useState, useRef } from "react";
// // // // import { useParams, useNavigate } from "react-router-dom";
// // // // import Icon from "../../components/Icon";
// // // // import { useAuth } from "../../context/AuthContext";
// // // // import "./Profile.css";

// // // // interface ProfileUser {
// // // //   user_id: number;
// // // //   username: string;
// // // //   email: string;
// // // //   phone: string;
// // // //   bio: string;
// // // //   profile_image_url?: string | null;
// // // //   role_name?: "admin" | "volunteer" | "user";
// // // //   created_at: string;
// // // //   volunteer?: {
// // // //     status?: string;
// // // //     badges?: string[];
// // // //     volunteer_since?: string;
// // // //   };
// // // // }

// // // // export const Profile: React.FC = () => {
// // // //   const { userId: paramUserId } = useParams<{ userId: string }>();
// // // //   const { user: currentUser } = useAuth();
// // // //   const navigate = useNavigate();
// // // //   const fileInputRef = useRef<HTMLInputElement>(null);
// // // //   const [imgKey, setImgKey] = useState(Date.now()); // Key for forcing image reload

// // // //   const [profileUser, setProfileUser] = useState<ProfileUser | null>(null);
// // // //   const [loading, setLoading] = useState(true);
// // // //   const [error, setError] = useState<string | null>(null);
// // // //   const [editing, setEditing] = useState(false);
// // // //   const [saving, setSaving] = useState(false);
// // // //   const [uploadingImage, setUploadingImage] = useState(false);

// // // //   const [formData, setFormData] = useState({
// // // //     username: "",
// // // //     email: "",
// // // //     phone: "",
// // // //     bio: "",
// // // //   });

// // // //   const userId = paramUserId || currentUser?.user_id?.toString();

// // // //   // Function to construct image URL with cache busting
// // // //   const getImageUrl = (url: string | null | undefined): string | null => {
// // // //     if (!url) return null;
    
// // // //     let imageUrl = url;
    
// // // //     // If it's a relative path starting with /uploads
// // // //     if (url.startsWith('/uploads/')) {
// // // //       imageUrl = `http://localhost:5000${url}`;
// // // //     }
// // // //     // If it's just uploads without leading slash
// // // //     else if (url.startsWith('uploads/')) {
// // // //       imageUrl = `http://localhost:5000/${url}`;
// // // //     }
    
// // // //     // Add cache busting parameter
// // // //     const separator = imageUrl.includes('?') ? '&' : '?';
// // // //     return `${imageUrl}${separator}key=${imgKey}`;
// // // //   };

// // // //   const fetchUserData = async (force = false) => {
// // // //     if (!userId) return;
    
// // // //     setLoading(true);
// // // //     setError(null);
// // // //     try {
// // // //       const token = sessionStorage.getItem("token");
// // // //       if (!token) throw new Error("No authentication token found");

// // // //       const url = `http://localhost:5000/api/users/${userId}${force ? `?t=${Date.now()}` : ''}`;
      
// // // //       const res = await fetch(url, {
// // // //         headers: { 
// // // //           Authorization: `Bearer ${token}`,
// // // //           "Content-Type": "application/json",
// // // //         },
// // // //         cache: 'no-store' // Disable caching
// // // //       });

// // // //       if (!res.ok) {
// // // //         throw new Error(`Failed to fetch user (${res.status})`);
// // // //       }

// // // //       const data = await res.json();
// // // //       console.log("Fetched user data:", data);
// // // //       setProfileUser(data);
// // // //       setFormData({
// // // //         username: data.username || "",
// // // //         email: data.email || "",
// // // //         phone: data.phone || "",
// // // //         bio: data.bio || "",
// // // //       });
// // // //     } catch (err: any) {
// // // //       console.error("Fetch user error:", err);
// // // //       setError(err.message);
// // // //     } finally {
// // // //       setLoading(false);
// // // //     }
// // // //   };

// // // //   useEffect(() => {
// // // //     if (!userId) return;
// // // //     fetchUserData();
// // // //   }, [userId]);

// // // //   const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
// // // //     setFormData({ ...formData, [e.target.name]: e.target.value });
// // // //   };

// // // //   const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
// // // //     const file = e.target.files?.[0];
// // // //     if (!file || !profileUser) return;

// // // //     const validTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/gif', 'image/webp'];
// // // //     if (!validTypes.includes(file.type)) {
// // // //       toast.success('Please select a valid image file (JPEG, PNG, GIF, WEBP)');
// // // //       return;
// // // //     }

// // // //     if (file.size > 5 * 1024 * 1024) {
// // // //       toast.success('Image size should be less than 5MB');
// // // //       return;
// // // //     }

// // // //     try {
// // // //       setUploadingImage(true);
// // // //       const token = sessionStorage.getItem("token");
// // // //       if (!token) throw new Error("No authentication token");

// // // //       const uploadFormData = new FormData();
// // // //       uploadFormData.append('profile_image', file);

// // // //       console.log("Uploading image for user:", profileUser.user_id);

// // // //       const res = await fetch(
// // // //         `http://localhost:5000/api/users/${profileUser.user_id}/profile-image`, 
// // // //         {
// // // //           method: "POST",
// // // //           headers: {
// // // //             Authorization: `Bearer ${token}`,
// // // //           },
// // // //           body: uploadFormData,
// // // //         }
// // // //       );

// // // //       if (!res.ok) {
// // // //         const errorData = await res.json().catch(() => ({}));
// // // //         throw new Error(`Failed to upload image: ${errorData.message || res.statusText}`);
// // // //       }

// // // //       const result = await res.json();
// // // //       console.log("Upload successful! Response:", result);
      
// // // //       // Force image reload by changing the key
// // // //       setImgKey(Date.now());
      
// // // //       // IMPORTANT: Update the profile user with new image URL from backend
// // // //       if (result.profile_image_url || result.imageUrl || result.image_url) {
// // // //         const newImageUrl = result.profile_image_url || result.imageUrl || result.image_url;
// // // //         console.log("New image URL from backend:", newImageUrl);
        
// // // //         setProfileUser(prev => {
// // // //           if (!prev) return null;
// // // //           return {
// // // //             ...prev,
// // // //             profile_image_url: newImageUrl
// // // //           };
// // // //         });
        
// // // //         // Force a complete refetch after 500ms to ensure we have updated data
// // // //         setTimeout(() => {
// // // //           fetchUserData(true); // Force fetch with timestamp
// // // //         }, 500);
// // // //       }
      
// // // //       toast.success("Profile image updated successfully!");
      
// // // //     } catch (err: any) {
// // // //       console.error("Image upload error:", err);
// // // //       toast.success("Failed to upload image: " + err.message);
// // // //     } finally {
// // // //       setUploadingImage(false);
// // // //       if (fileInputRef.current) {
// // // //         fileInputRef.current.value = '';
// // // //       }
// // // //     }
// // // //   };

// // // //   const handleRemoveImage = async () => {
// // // //     if (!profileUser) return;

// // // //     if (!window.confirm("Are you sure you want to remove your profile image?")) {
// // // //       return;
// // // //     }

// // // //     try {
// // // //       setUploadingImage(true);
// // // //       const token = sessionStorage.getItem("token");
// // // //       if (!token) throw new Error("No authentication token");

// // // //       const res = await fetch(
// // // //         `http://localhost:5000/api/users/${profileUser.user_id}/profile-image`, 
// // // //         {
// // // //           method: "DELETE",
// // // //           headers: {
// // // //             Authorization: `Bearer ${token}`,
// // // //             "Content-Type": "application/json"
// // // //           },
// // // //         }
// // // //       );

// // // //       if (!res.ok) {
// // // //         const errorData = await res.json().catch(() => ({}));
// // // //         throw new Error(`Failed to remove image: ${errorData.message || res.statusText}`);
// // // //       }

// // // //       // Force image reload
// // // //       setImgKey(Date.now());
      
// // // //       // Update state to remove image
// // // //       setProfileUser(prev => {
// // // //         if (!prev) return null;
// // // //         return {
// // // //           ...prev,
// // // //           profile_image_url: null
// // // //         };
// // // //       });
      
// // // //       toast.success("Profile image removed successfully!");
      
// // // //       // Force refetch
// // // //       setTimeout(() => {
// // // //         fetchUserData(true);
// // // //       }, 500);
      
// // // //     } catch (err: any) {
// // // //       console.error("Image removal error:", err);
// // // //       toast.success("Failed to remove image: " + err.message);
// // // //     } finally {
// // // //       setUploadingImage(false);
// // // //     }
// // // //   };

// // // //   const handleSave = async () => {
// // // //     if (!profileUser) return;

// // // //     if (!formData.username.trim() || !formData.email.trim()) {
// // // //       toast.success("Username and email are required");
// // // //       return;
// // // //     }

// // // //     try {
// // // //       setSaving(true);
// // // //       const token = sessionStorage.getItem("token");
// // // //       if (!token) throw new Error("No authentication token");

// // // //       const res = await fetch(
// // // //         `http://localhost:5000/api/users/${profileUser.user_id}`, 
// // // //         {
// // // //           method: "PATCH",
// // // //           headers: {
// // // //             "Content-Type": "application/json",
// // // //             Authorization: `Bearer ${token}`,
// // // //           },
// // // //           body: JSON.stringify({
// // // //             username: formData.username,
// // // //             email: formData.email,
// // // //             phone: formData.phone,
// // // //             bio: formData.bio,
// // // //           }),
// // // //         }
// // // //       );

// // // //       if (!res.ok) {
// // // //         throw new Error(`Failed to update profile (${res.status})`);
// // // //       }

// // // //       await fetchUserData(true);
      
// // // //       setEditing(false);
// // // //       toast.success("Profile updated successfully!");
// // // //     } catch (err: any) {
// // // //       console.error("Update error:", err);
// // // //       toast.success("Failed to update profile: " + err.message);
// // // //     } finally {
// // // //       setSaving(false);
// // // //     }
// // // //   };

// // // //   const handleCancel = () => {
// // // //     if (profileUser) {
// // // //       setFormData({
// // // //         username: profileUser.username,
// // // //         email: profileUser.email,
// // // //         phone: profileUser.phone,
// // // //         bio: profileUser.bio || "",
// // // //       });
// // // //     }
// // // //     setEditing(false);
// // // //   };

// // // //   if (loading) {
// // // //     return (
// // // //       <div className="profile-loading">
// // // //         <Icon type="fa" name="FaSpinner" className="spinner" size={32} />
// // // //         <p>Loading profile...</p>
// // // //       </div>
// // // //     );
// // // //   }

// // // //   if (error) {
// // // //     return (
// // // //       <div className="profile-error">
// // // //         <h3>Error Loading Profile</h3>
// // // //         <p>{error}</p>
// // // //         <div className="error-actions">
// // // //           <button onClick={() => window.location.reload()}>Retry</button>
// // // //           <button onClick={() => navigate("/dashboard")}>Dashboard</button>
// // // //         </div>
// // // //       </div>
// // // //     );
// // // //   }

// // // //   if (!profileUser) {
// // // //     return (
// // // //       <div className="profile-not-found">
// // // //         <h3>Profile Not Found</h3>
// // // //         <p>The requested profile could not be loaded.</p>
// // // //         <button onClick={() => navigate(-1)}>Go Back</button>
// // // //       </div>
// // // //     );
// // // //   }

// // // //   const joinDate = profileUser.created_at
// // // //     ? new Date(profileUser.created_at).toLocaleDateString("en-US", {
// // // //         month: "long",
// // // //         day: "numeric",
// // // //         year: "numeric",
// // // //       })
// // // //     : "Unknown";

// // // //   const canEdit = currentUser && (
// // // //     currentUser.user_id === profileUser.user_id || 
// // // //     currentUser.role_name === 'admin'
// // // //   );

// // // //   const isVolunteer = profileUser.role_name === 'volunteer';
// // // //   const isAdmin = profileUser.role_name === 'admin';
// // // //   const imageUrl = getImageUrl(profileUser.profile_image_url);

// // // //   return (
// // // //     <div className="profile-page">
// // // //       <div className="profile-container">
// // // //         <div className="profile-header">
// // // //           <button onClick={() => navigate(-1)} className="back-btn">
// // // //             <Icon type="feather" name="FiArrowLeft" /> Back
// // // //           </button>
// // // //           <div className="header-content">
// // // //             <h1>User Profile</h1>
// // // //             <p>Manage your account information</p>
// // // //           </div>
// // // //         </div>

// // // //         <div className="profile-main">
// // // //           <div className="profile-display">
// // // //             <div className="profile-card">
// // // //               <div className="profile-cover">
// // // //                 <div className="profile-avatar-section">
// // // //                   <div className={`avatar-container ${uploadingImage ? 'uploading' : ''}`}>
// // // //                     {uploadingImage ? (
// // // //                       <div className="avatar-loading">
// // // //                         <Icon type="fa" name="FaSpinner" className="spinner" size={28} />
// // // //                         <span>Uploading...</span>
// // // //                       </div>
// // // //                     ) : null}
                    
// // // //                     {imageUrl ? (
// // // //                       <img 
// // // //                         key={`avatar-${imgKey}`}
// // // //                         src={imageUrl}
// // // //                         alt={profileUser.username}
// // // //                         className="avatar-img"
// // // //                         onLoad={() => console.log("Image loaded successfully:", imageUrl)}
// // // //                         onError={(e) => {
// // // //                           console.error("Image failed to load:", imageUrl);
// // // //                           e.currentTarget.style.display = 'none';
// // // //                           const fallback = e.currentTarget.nextElementSibling as HTMLDivElement;
// // // //                           if (fallback) {
// // // //                             fallback.style.display = 'flex';
// // // //                           }
// // // //                         }}
// // // //                       />
// // // //                     ) : null}
                    
// // // //                     <div 
// // // //                       className="avatar-fallback"
// // // //                       style={{ 
// // // //                         display: imageUrl ? 'none' : 'flex' 
// // // //                       }}
// // // //                     >
// // // //                       {profileUser.username?.charAt(0)?.toUpperCase() || "U"}
// // // //                     </div>
// // // //                   </div>

// // // //                   {canEdit && !editing && (
// // // //                     <div className="avatar-controls">
// // // //                       <input
// // // //                         ref={fileInputRef}
// // // //                         type="file"
// // // //                         accept="image/*"
// // // //                         onChange={handleImageUpload}
// // // //                         disabled={uploadingImage}
// // // //                         style={{ display: 'none' }}
// // // //                       />
// // // //                       <div className="avatar-buttons">
// // // //                         <button 
// // // //                           className="btn-change-avatar"
// // // //                           onClick={() => fileInputRef.current?.click()}
// // // //                           disabled={uploadingImage}
// // // //                         >
// // // //                           <Icon 
// // // //                             type="feather" 
// // // //                             name={uploadingImage ? "FiLoader" : "FiCamera"} 
// // // //                             size={14} 
// // // //                           />
// // // //                           {uploadingImage ? 'Uploading...' : 'Change Photo'}
// // // //                         </button>
// // // //                         {imageUrl && (
// // // //                           <button 
// // // //                             className="btn-remove-avatar"
// // // //                             onClick={handleRemoveImage}
// // // //                             disabled={uploadingImage}
// // // //                           >
// // // //                             <Icon 
// // // //                               type="feather" 
// // // //                               name={uploadingImage ? "FiLoader" : "FiTrash2"} 
// // // //                               size={14} 
// // // //                             />
// // // //                             Remove
// // // //                           </button>
// // // //                         )}
// // // //                       </div>
// // // //                     </div>
// // // //                   )}
// // // //                 </div>
// // // //               </div>

// // // //               <div className="profile-info">
// // // //                 <h2 className="profile-name">{profileUser.username}</h2>
                
// // // //                 <div className={`role-badge ${profileUser.role_name || 'user'}`}>
// // // //                   <span className="badge-text">
// // // //                     {profileUser.role_name?.toUpperCase() || "USER"}
// // // //                     {profileUser.volunteer?.status && ` • ${profileUser.volunteer.status.toUpperCase()}`}
// // // //                   </span>
// // // //                 </div>

// // // //                 <div className="profile-bio-section">
// // // //                   <div className="bio-label">
// // // //                     <Icon type="feather" name="FiUser" size={14} />
// // // //                     <span>About</span>
// // // //                   </div>
// // // //                   <p className="profile-bio">
// // // //                     {profileUser.bio || (isAdmin 
// // // //                       ? 'System Administrator and Animal Lover.' 
// // // //                       : isVolunteer 
// // // //                         ? 'Wildlife Conservation Ranger' 
// // // //                         : 'Community Member')}
// // // //                   </p>
// // // //                 </div>

// // // //                 <div className="profile-details">
// // // //                   <div className="detail-item">
// // // //                     <div className="detail-icon">
// // // //                       <Icon type="feather" name="FiMail" size={16} />
// // // //                     </div>
// // // //                     <div className="detail-content">
// // // //                       <div className="detail-label">Email</div>
// // // //                       <div className="detail-value">{profileUser.email}</div>
// // // //                     </div>
// // // //                   </div>

// // // //                   <div className="detail-item">
// // // //                     <div className="detail-icon">
// // // //                       <Icon type="feather" name="FiPhone" size={16} />
// // // //                     </div>
// // // //                     <div className="detail-content">
// // // //                       <div className="detail-label">Phone</div>
// // // //                       <div className="detail-value">{profileUser.phone || "Not provided"}</div>
// // // //                     </div>
// // // //                   </div>

// // // //                   <div className="detail-item">
// // // //                     <div className="detail-icon">
// // // //                       <Icon type="feather" name="FiCalendar" size={16} />
// // // //                     </div>
// // // //                     <div className="detail-content">
// // // //                       <div className="detail-label">Member Since</div>
// // // //                       <div className="detail-value">{joinDate}</div>
// // // //                     </div>
// // // //                   </div>

// // // //                   {profileUser.volunteer?.volunteer_since && (
// // // //                     <div className="detail-item">
// // // //                       <div className="detail-icon">
// // // //                         <Icon type="feather" name="FiAward" size={16} />
// // // //                       </div>
// // // //                       <div className="detail-content">
// // // //                         <div className="detail-label">Volunteer Since</div>
// // // //                         <div className="detail-value">
// // // //                           {new Date(profileUser.volunteer.volunteer_since).toLocaleDateString("en-US", {
// // // //                             month: "long",
// // // //                             day: "numeric",
// // // //                             year: "numeric",
// // // //                           })}
// // // //                         </div>
// // // //                       </div>
// // // //                     </div>
// // // //                   )}

// // // //                   <div className="detail-item">
// // // //                     <div className="detail-icon">
// // // //                       <Icon type="feather" name="FiHash" size={16} />
// // // //                     </div>
// // // //                     <div className="detail-content">
// // // //                       <div className="detail-label">User ID</div>
// // // //                       <div className="detail-value">#{profileUser.user_id.toString().padStart(6, '0')}</div>
// // // //                     </div>
// // // //                   </div>
// // // //                 </div>

// // // //                 {!editing && canEdit && (
// // // //                   <button 
// // // //                     className="btn-edit-profile"
// // // //                     onClick={() => setEditing(true)}
// // // //                   >
// // // //                     <Icon type="feather" name="FiEdit2" size={16} />
// // // //                     Edit Profile
// // // //                   </button>
// // // //                 )}
// // // //               </div>
// // // //             </div>
// // // //           </div>

// // // //           <div className="profile-edit">
// // // //             {editing ? (
// // // //               <div className="edit-section">
// // // //                 <div className="edit-header">
// // // //                   <h3><Icon type="feather" name="FiEdit3" size={18} /> Edit Profile</h3>
// // // //                   <p>Update your personal information</p>
// // // //                 </div>

// // // //                 <div className="edit-form">
// // // //                   <div className="form-group">
// // // //                     <label htmlFor="username">Username *</label>
// // // //                     <input
// // // //                       id="username"
// // // //                       type="text"
// // // //                       name="username"
// // // //                       value={formData.username}
// // // //                       onChange={handleChange}
// // // //                       placeholder="Enter username"
// // // //                       required
// // // //                     />
// // // //                   </div>

// // // //                   <div className="form-group">
// // // //                     <label htmlFor="email">Email Address *</label>
// // // //                     <input
// // // //                       id="email"
// // // //                       type="email"
// // // //                       name="email"
// // // //                       value={formData.email}
// // // //                       onChange={handleChange}
// // // //                       placeholder="Enter email address"
// // // //                       required
// // // //                     />
// // // //                   </div>

// // // //                   <div className="form-group">
// // // //                     <label htmlFor="phone">Phone Number</label>
// // // //                     <input
// // // //                       id="phone"
// // // //                       type="tel"
// // // //                       name="phone"
// // // //                       value={formData.phone}
// // // //                       onChange={handleChange}
// // // //                       placeholder="Enter phone number"
// // // //                     />
// // // //                     <small className="input-hint">Example: 9801234567</small>
// // // //                   </div>

// // // //                   <div className="form-group">
// // // //                     <label htmlFor="bio">Bio</label>
// // // //                     <textarea
// // // //                       id="bio"
// // // //                       name="bio"
// // // //                       value={formData.bio}
// // // //                       onChange={handleChange}
// // // //                       placeholder="Tell us about yourself..."
// // // //                       rows={4}
// // // //                       maxLength={500}
// // // //                     />
// // // //                     <div className="char-counter">
// // // //                       {formData.bio.length}/500 characters
// // // //                     </div>
// // // //                   </div>

// // // //                   <div className="form-actions">
// // // //                     <button 
// // // //                       className="btn-cancel"
// // // //                       onClick={handleCancel}
// // // //                       disabled={saving}
// // // //                     >
// // // //                       Cancel
// // // //                     </button>
// // // //                     <button 
// // // //                       className="btn-save"
// // // //                       onClick={handleSave}
// // // //                       disabled={saving}
// // // //                     >
// // // //                       {saving ? 'Saving...' : 'Save Changes'}
// // // //                     </button>
// // // //                   </div>
// // // //                 </div>
// // // //               </div>
// // // //             ) : (
// // // //               <div className="stats-section">
// // // //                 <div className="stats-card">
// // // //                   <h3><Icon type="feather" name="FiBarChart2" size={18} /> Profile Stats</h3>
                  
// // // //                   <div className="stats-content">
// // // //                     <div className="stat-item">
// // // //                       <div className="stat-icon">
// // // //                         <Icon type="feather" name="FiCheckCircle" size={16} />
// // // //                       </div>
// // // //                       <div className="stat-details">
// // // //                         <div className="stat-label">Account Type</div>
// // // //                         <div className={`stat-value ${profileUser.role_name || 'user'}`}>
// // // //                           {isAdmin ? 'Administrator' : isVolunteer ? 'Volunteer' : 'User'}
// // // //                         </div>
// // // //                       </div>
// // // //                     </div>

// // // //                     <div className="stat-item">
// // // //                       <div className="stat-icon">
// // // //                         <Icon type="feather" name="FiCalendar" size={16} />
// // // //                       </div>
// // // //                       <div className="stat-details">
// // // //                         <div className="stat-label">Member Since</div>
// // // //                         <div className="stat-value">{joinDate}</div>
// // // //                       </div>
// // // //                     </div>

// // // //                     <div className="stat-item">
// // // //                       <div className="stat-icon">
// // // //                         <Icon type="feather" name="FiTrendingUp" size={16} />
// // // //                       </div>
// // // //                       <div className="stat-details">
// // // //                         <div className="stat-label">Profile Complete</div>
// // // //                         <div className="progress-container">
// // // //                           <div className="progress-bar">
// // // //                             <div 
// // // //                               className="progress-fill"
// // // //                               style={{ 
// // // //                                 width: `${(profileUser.bio ? 25 : 0) + 
// // // //                                        (profileUser.phone ? 25 : 0) + 
// // // //                                        50}%` 
// // // //                               }}
// // // //                             />
// // // //                           </div>
// // // //                           <span className="progress-text">
// // // //                             {((profileUser.bio ? 25 : 0) + 
// // // //                               (profileUser.phone ? 25 : 0) + 
// // // //                               50)}%
// // // //                           </span>
// // // //                         </div>
// // // //                       </div>
// // // //                     </div>
// // // //                   </div>
// // // //                 </div>

// // // //                 {isVolunteer && profileUser.volunteer?.badges && profileUser.volunteer.badges.length > 0 && (
// // // //                   <div className="badges-card">
// // // //                     <h3><Icon type="feather" name="FiAward" size={18} /> Badges</h3>
// // // //                     <div className="badges-list">
// // // //                       {profileUser.volunteer.badges.map((badge, index) => (
// // // //                         <div key={index} className="badge-item">
// // // //                           <Icon type="feather" name="FiStar" size={12} />
// // // //                           <span>{badge}</span>
// // // //                         </div>
// // // //                       ))}
// // // //                     </div>
// // // //                   </div>
// // // //                 )}
// // // //               </div>
// // // //             )}
// // // //           </div>
// // // //         </div>
// // // //       </div>
// // // //     </div>
// // // //   );
// // // // };

// // // // frontend/src/pages/Profile/Profile.tsx
// // // import React, { useEffect, useState, useRef } from "react";
// // // import { useParams, useNavigate } from "react-router-dom";
// // // import { useAuth } from "../../context/AuthContext";
// // // import "./Profile.css";

// // // interface ProfileUser {
// // //   user_id: number;
// // //   username: string;
// // //   email: string;
// // //   phone: string;
// // //   bio: string;
// // //   profile_image_url?: string | null;
// // //   role_name?: "admin" | "volunteer" | "user";
// // //   created_at: string;
// // //   volunteer?: {
// // //     status?: string;
// // //     badges?: string[];
// // //     volunteer_since?: string;
// // //   };
// // // }

// // // export const Profile: React.FC = () => {
// // //   const { userId: paramUserId } = useParams<{ userId: string }>();
// // //   const { user: currentUser } = useAuth();
// // //   const navigate = useNavigate();
// // //   const fileInputRef = useRef<HTMLInputElement>(null);
// // //   const [imgKey, setImgKey] = useState(Date.now());

// // //   const [profileUser, setProfileUser] = useState<ProfileUser | null>(null);
// // //   const [loading, setLoading] = useState(true);
// // //   const [error, setError] = useState<string | null>(null);
// // //   const [editing, setEditing] = useState(false);
// // //   const [saving, setSaving] = useState(false);
// // //   const [uploadingImage, setUploadingImage] = useState(false);

// // //   const [formData, setFormData] = useState({
// // //     username: "",
// // //     email: "",
// // //     phone: "",
// // //     bio: "",
// // //   });

// // //   const userId = paramUserId || currentUser?.user_id?.toString();

// // //   const getImageUrl = (url: string | null | undefined): string | null => {
// // //     if (!url) return null;
    
// // //     let imageUrl = url;
    
// // //     if (url.startsWith('/uploads/')) {
// // //       imageUrl = `http://localhost:5000${url}`;
// // //     } else if (url.startsWith('uploads/')) {
// // //       imageUrl = `http://localhost:5000/${url}`;
// // //     }
    
// // //     const separator = imageUrl.includes('?') ? '&' : '?';
// // //     return `${imageUrl}${separator}key=${imgKey}`;
// // //   };

// // //   const fetchUserData = async (force = false) => {
// // //     if (!userId) return;
    
// // //     setLoading(true);
// // //     setError(null);
// // //     try {
// // //       const token = sessionStorage.getItem("token");
// // //       if (!token) throw new Error("No authentication token found");

// // //       const url = `http://localhost:5000/api/users/${userId}${force ? `?t=${Date.now()}` : ''}`;
      
// // //       const res = await fetch(url, {
// // //         headers: { 
// // //           Authorization: `Bearer ${token}`,
// // //           "Content-Type": "application/json",
// // //         },
// // //         cache: 'no-store'
// // //       });

// // //       if (!res.ok) {
// // //         throw new Error(`Failed to fetch user (${res.status})`);
// // //       }

// // //       const data = await res.json();
// // //       setProfileUser(data);
// // //       setFormData({
// // //         username: data.username || "",
// // //         email: data.email || "",
// // //         phone: data.phone || "",
// // //         bio: data.bio || "",
// // //       });
// // //     } catch (err: any) {
// // //       console.error("Fetch user error:", err);
// // //       setError(err.message);
// // //     } finally {
// // //       setLoading(false);
// // //     }
// // //   };

// // //   useEffect(() => {
// // //     if (!userId) return;
// // //     fetchUserData();
// // //   }, [userId]);

// // //   const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
// // //     setFormData({ ...formData, [e.target.name]: e.target.value });
// // //   };

// // //   const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
// // //     const file = e.target.files?.[0];
// // //     if (!file || !profileUser) return;

// // //     const validTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/gif', 'image/webp'];
// // //     if (!validTypes.includes(file.type)) {
// // //       toast.success('Please select a valid image file (JPEG, PNG, GIF, WEBP)');
// // //       return;
// // //     }

// // //     if (file.size > 5 * 1024 * 1024) {
// // //       toast.success('Image size should be less than 5MB');
// // //       return;
// // //     }

// // //     try {
// // //       setUploadingImage(true);
// // //       const token = sessionStorage.getItem("token");
// // //       if (!token) throw new Error("No authentication token");

// // //       const uploadFormData = new FormData();
// // //       uploadFormData.append('profile_image', file);

// // //       const res = await fetch(
// // //         `http://localhost:5000/api/users/${profileUser.user_id}/profile-image`, 
// // //         {
// // //           method: "POST",
// // //           headers: {
// // //             Authorization: `Bearer ${token}`,
// // //           },
// // //           body: uploadFormData,
// // //         }
// // //       );

// // //       if (!res.ok) {
// // //         const errorData = await res.json().catch(() => ({}));
// // //         throw new Error(`Failed to upload image: ${errorData.message || res.statusText}`);
// // //       }

// // //       const result = await res.json();
// // //       setImgKey(Date.now());
      
// // //       if (result.profile_image_url || result.imageUrl || result.image_url) {
// // //         const newImageUrl = result.profile_image_url || result.imageUrl || result.image_url;
// // //         setProfileUser(prev => {
// // //           if (!prev) return null;
// // //           return {
// // //             ...prev,
// // //             profile_image_url: newImageUrl
// // //           };
// // //         });
        
// // //         setTimeout(() => {
// // //           fetchUserData(true);
// // //         }, 500);
// // //       }
      
// // //       toast.success("Profile image updated successfully!");
      
// // //     } catch (err: any) {
// // //       console.error("Image upload error:", err);
// // //       toast.success("Failed to upload image: " + err.message);
// // //     } finally {
// // //       setUploadingImage(false);
// // //       if (fileInputRef.current) {
// // //         fileInputRef.current.value = '';
// // //       }
// // //     }
// // //   };

// // //   const handleRemoveImage = async () => {
// // //     if (!profileUser) return;

// // //     if (!window.confirm("Are you sure you want to remove your profile image?")) {
// // //       return;
// // //     }

// // //     try {
// // //       setUploadingImage(true);
// // //       const token = sessionStorage.getItem("token");
// // //       if (!token) throw new Error("No authentication token");

// // //       const res = await fetch(
// // //         `http://localhost:5000/api/users/${profileUser.user_id}/profile-image`, 
// // //         {
// // //           method: "DELETE",
// // //           headers: {
// // //             Authorization: `Bearer ${token}`,
// // //             "Content-Type": "application/json"
// // //           },
// // //         }
// // //       );

// // //       if (!res.ok) {
// // //         const errorData = await res.json().catch(() => ({}));
// // //         throw new Error(`Failed to remove image: ${errorData.message || res.statusText}`);
// // //       }

// // //       setImgKey(Date.now());
// // //       setProfileUser(prev => {
// // //         if (!prev) return null;
// // //         return {
// // //           ...prev,
// // //           profile_image_url: null
// // //         };
// // //       });
      
// // //       toast.success("Profile image removed successfully!");
// // //       setTimeout(() => {
// // //         fetchUserData(true);
// // //       }, 500);
      
// // //     } catch (err: any) {
// // //       console.error("Image removal error:", err);
// // //       toast.success("Failed to remove image: " + err.message);
// // //     } finally {
// // //       setUploadingImage(false);
// // //     }
// // //   };

// // //   const handleSave = async () => {
// // //     if (!profileUser) return;

// // //     if (!formData.username.trim() || !formData.email.trim()) {
// // //       toast.success("Username and email are required");
// // //       return;
// // //     }

// // //     try {
// // //       setSaving(true);
// // //       const token = sessionStorage.getItem("token");
// // //       if (!token) throw new Error("No authentication token");

// // //       const res = await fetch(
// // //         `http://localhost:5000/api/users/${profileUser.user_id}`, 
// // //         {
// // //           method: "PATCH",
// // //           headers: {
// // //             "Content-Type": "application/json",
// // //             Authorization: `Bearer ${token}`,
// // //           },
// // //           body: JSON.stringify({
// // //             username: formData.username,
// // //             email: formData.email,
// // //             phone: formData.phone,
// // //             bio: formData.bio,
// // //           }),
// // //         }
// // //       );

// // //       if (!res.ok) {
// // //         throw new Error(`Failed to update profile (${res.status})`);
// // //       }

// // //       await fetchUserData(true);
// // //       setEditing(false);
// // //       toast.success("Profile updated successfully!");
// // //     } catch (err: any) {
// // //       console.error("Update error:", err);
// // //       toast.success("Failed to update profile: " + err.message);
// // //     } finally {
// // //       setSaving(false);
// // //     }
// // //   };

// // //   const handleCancel = () => {
// // //     if (profileUser) {
// // //       setFormData({
// // //         username: profileUser.username,
// // //         email: profileUser.email,
// // //         phone: profileUser.phone,
// // //         bio: profileUser.bio || "",
// // //       });
// // //     }
// // //     setEditing(false);
// // //   };

// // //   // Get role emoji
// // //   const getRoleEmoji = (roleName?: string) => {
// // //     switch (roleName) {
// // //       case 'admin': return '👑';
// // //       case 'volunteer': return '🛡️';
// // //       default: return '👤';
// // //     }
// // //   };

// // //   // Get badge emoji
// // //   const getBadgeEmoji = (badge: string) => {
// // //     const badgeLower = badge.toLowerCase();
// // //     if (badgeLower.includes('first')) return '🥇';
// // //     if (badgeLower.includes('hero') || badgeLower.includes('rescue')) return '🦸';
// // //     if (badgeLower.includes('star')) return '⭐';
// // //     if (badgeLower.includes('expert')) return '🎯';
// // //     if (badgeLower.includes('dedicated')) return '💪';
// // //     if (badgeLower.includes('quick')) return '⚡';
// // //     if (badgeLower.includes('wildlife')) return '🐾';
// // //     return '🏅';
// // //   };

// // //   if (loading) {
// // //     return (
// // //       <div className="profile-loading">
// // //         <div className="loader-circle"></div>
// // //         <p className="loader-text">🌲 Loading Profile...</p>
// // //       </div>
// // //     );
// // //   }

// // //   if (error) {
// // //     return (
// // //       <div className="profile-error">
// // //         <div className="error-icon">❌</div>
// // //         <h3>Error Loading Profile</h3>
// // //         <p>{error}</p>
// // //         <div className="error-actions">
// // //           <button onClick={() => window.location.reload()} className="retry-button">
// // //             Retry
// // //           </button>
// // //           <button onClick={() => navigate("/dashboard")} className="secondary-button">
// // //             Dashboard
// // //           </button>
// // //         </div>
// // //       </div>
// // //     );
// // //   }

// // //   if (!profileUser) {
// // //     return (
// // //       <div className="profile-not-found">
// // //         <div className="not-found-icon">🔍</div>
// // //         <h3>Profile Not Found</h3>
// // //         <p>The requested profile could not be loaded.</p>
// // //         <button onClick={() => navigate(-1)} className="secondary-button">
// // //           Go Back
// // //         </button>
// // //       </div>
// // //     );
// // //   }

// // //   const joinDate = profileUser.created_at
// // //     ? new Date(profileUser.created_at).toLocaleDateString("en-US", {
// // //         month: "long",
// // //         day: "numeric",
// // //         year: "numeric",
// // //       })
// // //     : "Unknown";

// // //   const canEdit = currentUser && (
// // //     currentUser.user_id === profileUser.user_id || 
// // //     currentUser.role_name === 'admin'
// // //   );

// // //   const isVolunteer = profileUser.role_name === 'volunteer';
// // //   const isAdmin = profileUser.role_name === 'admin';
// // //   const imageUrl = getImageUrl(profileUser.profile_image_url);

// // //   return (
// // //     <div className="profile-page">
// // //       <div className="profile-container">
// // //         {/* Header */}
// // //         <div className="profile-header">
// // //           {/* <button onClick={() => navigate(-1)} className="back-button">
// // //             ← Back to Dashboard
// // //           </button> */}
// // //           <div className="header-content">
// // //             <h1 className="profile-title">🌲 Ranger Profile</h1>
// // //             <p className="profile-subtitle">
// // //               {isAdmin ? 'Administrator Account' : 
// // //                isVolunteer ? 'Wildlife Rescue Volunteer' : 
// // //                'Community Member Profile'}
// // //             </p>
// // //           </div>
// // //         </div>

// // //         {/* Main Content */}
// // //         <div className="profile-main">
// // //           {/* Left Column - Profile Info */}
// // //           <div className="profile-left">
// // //             <div className="profile-card">
// // //               {/* Avatar Section */}
// // //               <div className="profile-avatar-section">
// // //                 <div className={`avatar-container ${uploadingImage ? 'uploading' : ''}`}>
// // //                   {uploadingImage ? (
// // //                     <div className="avatar-loading">
// // //                       <div className="loader-spinner"></div>
// // //                       <span>Uploading...</span>
// // //                     </div>
// // //                   ) : null}
                  
// // //                   {imageUrl ? (
// // //                     <img 
// // //                       key={`avatar-${imgKey}`}
// // //                       src={imageUrl}
// // //                       alt={profileUser.username}
// // //                       className="avatar-image"
// // //                       onError={(e) => {
// // //                         e.currentTarget.style.display = 'none';
// // //                         const fallback = e.currentTarget.nextElementSibling as HTMLDivElement;
// // //                         if (fallback) fallback.style.display = 'flex';
// // //                       }}
// // //                     />
// // //                   ) : null}
                  
// // //                   <div 
// // //                     className="avatar-fallback"
// // //                     style={{ display: imageUrl ? 'none' : 'flex' }}
// // //                   >
// // //                     <span className="fallback-text">
// // //                       {profileUser.username?.charAt(0)?.toUpperCase() || "U"}
// // //                     </span>
// // //                   </div>
                  
// // //                   {canEdit && !editing && (
// // //                     <div className="avatar-edit-overlay">
// // //                       <button 
// // //                         className="change-photo-btn"
// // //                         onClick={() => fileInputRef.current?.click()}
// // //                       >
// // //                         📷 Change Photo
// // //                       </button>
// // //                     </div>
// // //                   )}
// // //                 </div>

// // //                 <input
// // //                   ref={fileInputRef}
// // //                   type="file"
// // //                   accept="image/*"
// // //                   onChange={handleImageUpload}
// // //                   disabled={uploadingImage}
// // //                   style={{ display: 'none' }}
// // //                 />

// // //                 {canEdit && !editing && imageUrl && (
// // //                   <button 
// // //                     className="remove-photo-btn"
// // //                     onClick={handleRemoveImage}
// // //                     disabled={uploadingImage}
// // //                   >
// // //                     🗑️ Remove Photo
// // //                   </button>
// // //                 )}
// // //               </div>

// // //               {/* Profile Details */}
// // //               <div className="profile-details-section">
// // //                 <div className="profile-header-info">
// // //                   <h2 className="profile-name">
// // //                     {profileUser.username}
// // //                     <span className="user-id">ID: #{profileUser.user_id.toString().padStart(6, '0')}</span>
// // //                   </h2>
                  
// // //                   <div className={`role-badge ${profileUser.role_name || 'user'}`}>
// // //                     <span className="role-emoji">{getRoleEmoji(profileUser.role_name)}</span>
// // //                     <span className="role-text">
// // //                       {profileUser.role_name?.toUpperCase() || "USER"}
// // //                       {profileUser.volunteer?.status && ` • ${profileUser.volunteer.status.toUpperCase()}`}
// // //                     </span>
// // //                   </div>
// // //                 </div>

// // //                 {/* Bio Section */}
// // //                 <div className="bio-section">
// // //                   <div className="section-header">
// // //                     <span className="section-icon">📝</span>
// // //                     <h3>About</h3>
// // //                   </div>
// // //                   <p className="bio-text">
// // //                     {profileUser.bio || (isAdmin 
// // //                       ? 'Administrator dedicated to wildlife conservation and rescue operations.' 
// // //                       : isVolunteer 
// // //                         ? 'Passionate wildlife rescuer committed to animal welfare and conservation.' 
// // //                         : 'Community member supporting wildlife rescue efforts.')}
// // //                   </p>
// // //                 </div>

// // //                 {/* Contact Info */}
// // //                 <div className="contact-info">
// // //                   <div className="section-header">
// // //                     <span className="section-icon">📬</span>
// // //                     <h3>Contact Information</h3>
// // //                   </div>
                  
// // //                   <div className="contact-details">
// // //                     <div className="contact-item">
// // //                       <span className="contact-icon">📧</span>
// // //                       <div className="contact-content">
// // //                         <span className="contact-label">Email</span>
// // //                         <span className="contact-value">{profileUser.email}</span>
// // //                       </div>
// // //                     </div>
                    
// // //                     <div className="contact-item">
// // //                       <span className="contact-icon">📱</span>
// // //                       <div className="contact-content">
// // //                         <span className="contact-label">Phone</span>
// // //                         <span className="contact-value">{profileUser.phone || "Not provided"}</span>
// // //                       </div>
// // //                     </div>
                    
// // //                     <div className="contact-item">
// // //                       <span className="contact-icon">📅</span>
// // //                       <div className="contact-content">
// // //                         <span className="contact-label">Member Since</span>
// // //                         <span className="contact-value">{joinDate}</span>
// // //                       </div>
// // //                     </div>
                    
// // //                     {profileUser.volunteer?.volunteer_since && (
// // //                       <div className="contact-item">
// // //                         <span className="contact-icon">🛡️</span>
// // //                         <div className="contact-content">
// // //                           <span className="contact-label">Volunteer Since</span>
// // //                           <span className="contact-value">
// // //                             {new Date(profileUser.volunteer.volunteer_since).toLocaleDateString("en-US", {
// // //                               month: "long",
// // //                               day: "numeric",
// // //                               year: "numeric",
// // //                             })}
// // //                           </span>
// // //                         </div>
// // //                       </div>
// // //                     )}
// // //                   </div>
// // //                 </div>

// // //                 {!editing && canEdit && (
// // //                   <button 
// // //                     className="edit-profile-button"
// // //                     onClick={() => setEditing(true)}
// // //                   >
// // //                     ✏️ Edit Profile
// // //                   </button>
// // //                 )}
// // //               </div>
// // //             </div>
// // //           </div>

// // //           {/* Right Column - Edit Form or Additional Info */}
// // //           <div className="profile-right">
// // //             {editing ? (
// // //               <div className="edit-section">
// // //                 <div className="edit-header">
// // //                   <h2>✏️ Edit Profile Information</h2>
// // //                   <p>Update your personal details below</p>
// // //                 </div>

// // //                 <div className="edit-form">
// // //                   <div className="form-group">
// // //                     <label className="form-label">
// // //                       <span className="label-icon">👤</span>
// // //                       Username *
// // //                     </label>
// // //                     <input
// // //                       type="text"
// // //                       name="username"
// // //                       value={formData.username}
// // //                       onChange={handleChange}
// // //                       placeholder="Enter username"
// // //                       required
// // //                       className="form-input"
// // //                     />
// // //                   </div>

// // //                   <div className="form-group">
// // //                     <label className="form-label">
// // //                       <span className="label-icon">📧</span>
// // //                       Email Address *
// // //                     </label>
// // //                     <input
// // //                       type="email"
// // //                       name="email"
// // //                       value={formData.email}
// // //                       onChange={handleChange}
// // //                       placeholder="Enter email address"
// // //                       required
// // //                       className="form-input"
// // //                     />
// // //                   </div>

// // //                   <div className="form-group">
// // //                     <label className="form-label">
// // //                       <span className="label-icon">📱</span>
// // //                       Phone Number
// // //                     </label>
// // //                     <input
// // //                       type="tel"
// // //                       name="phone"
// // //                       value={formData.phone}
// // //                       onChange={handleChange}
// // //                       placeholder="Enter phone number"
// // //                       className="form-input"
// // //                     />
// // //                     <div className="input-hint">
// // //                       💡 Example: 9801234567
// // //                     </div>
// // //                   </div>

// // //                   <div className="form-group">
// // //                     <label className="form-label">
// // //                       <span className="label-icon">📝</span>
// // //                       Bio
// // //                     </label>
// // //                     <textarea
// // //                       name="bio"
// // //                       value={formData.bio}
// // //                       onChange={handleChange}
// // //                       placeholder="Tell us about yourself..."
// // //                       rows={4}
// // //                       maxLength={500}
// // //                       className="form-textarea"
// // //                     />
// // //                     <div className="char-counter">
// // //                       {formData.bio.length}/500 characters
// // //                     </div>
// // //                   </div>

// // //                   <div className="form-actions">
// // //                     <button 
// // //                       className="cancel-button"
// // //                       onClick={handleCancel}
// // //                       disabled={saving}
// // //                     >
// // //                       Cancel
// // //                     </button>
// // //                     <button 
// // //                       className="save-button"
// // //                       onClick={handleSave}
// // //                       disabled={saving}
// // //                     >
// // //                       {saving ? '🔄 Saving...' : '💾 Save Changes'}
// // //                     </button>
// // //                   </div>
// // //                 </div>
// // //               </div>
// // //             ) : (
// // //               <div className="info-section">
// // //                 {/* Profile Stats */}
// // //                 <div className="stats-card">
// // //                   <div className="card-header">
// // //                     <h3>📊 Profile Stats</h3>
// // //                   </div>
                  
// // //                   <div className="stats-content">
// // //                     <div className="stat-item">
// // //                       <div className="stat-icon">
// // //                         {getRoleEmoji(profileUser.role_name)}
// // //                       </div>
// // //                       <div className="stat-info">
// // //                         <span className="stat-label">Account Type</span>
// // //                         <span className={`stat-value ${profileUser.role_name || 'user'}`}>
// // //                           {isAdmin ? 'Administrator' : isVolunteer ? 'Volunteer' : 'User'}
// // //                         </span>
// // //                       </div>
// // //                     </div>

// // //                     <div className="stat-item">
// // //                       <div className="stat-icon">📅</div>
// // //                       <div className="stat-info">
// // //                         <span className="stat-label">Member Since</span>
// // //                         <span className="stat-value">{joinDate}</span>
// // //                       </div>
// // //                     </div>

// // //                     <div className="stat-item">
// // //                       <div className="stat-icon">📈</div>
// // //                       <div className="stat-info">
// // //                         <span className="stat-label">Profile Complete</span>
// // //                         <div className="progress-container">
// // //                           <div className="progress-bar">
// // //                             <div 
// // //                               className="progress-fill"
// // //                               style={{ 
// // //                                 width: `${(profileUser.bio ? 25 : 0) + 
// // //                                        (profileUser.phone ? 25 : 0) + 
// // //                                        50}%` 
// // //                               }}
// // //                             />
// // //                           </div>
// // //                           <span className="progress-text">
// // //                             {((profileUser.bio ? 25 : 0) + 
// // //                               (profileUser.phone ? 25 : 0) + 
// // //                               50)}%
// // //                           </span>
// // //                         </div>
// // //                       </div>
// // //                     </div>
// // //                   </div>
// // //                 </div>

// // //                 {/* Badges Section for Volunteers */}
// // //                 {isVolunteer && profileUser.volunteer?.badges && profileUser.volunteer.badges.length > 0 && (
// // //                   <div className="badges-card">
// // //                     <div className="card-header">
// // //                       <h3>🏅 Achievement Badges</h3>
// // //                       <span className="badges-count">{profileUser.volunteer.badges.length} earned</span>
// // //                     </div>
                    
// // //                     <div className="badges-grid">
// // //                       {profileUser.volunteer.badges.map((badge, index) => (
// // //                         <div key={index} className="badge-item">
// // //                           <div className="badge-icon">
// // //                             {getBadgeEmoji(badge)}
// // //                           </div>
// // //                           <span className="badge-name">{badge}</span>
// // //                         </div>
// // //                       ))}
// // //                     </div>
                    
// // //                     <div className="badges-footer">
// // //                       <span className="badges-note">
// // //                         🎯 Keep up the great work in wildlife rescue!
// // //                       </span>
// // //                     </div>
// // //                   </div>
// // //                 )}

// // //                 {/* System Info */}
// // //                 <div className="system-card">
// // //                   <div className="card-header">
// // //                     <h3>⚙️ System Information</h3>
// // //                   </div>
                  
// // //                   <div className="system-info">
// // //                     <div className="info-row">
// // //                       <span className="info-label">Account Status</span>
// // //                       <span className={`info-value status ${profileUser.role_name || 'user'}`}>
// // //                         {isAdmin ? 'Administrator' : isVolunteer ? 'Active Volunteer' : 'Active User'}
// // //                       </span>
// // //                     </div>
                    
// // //                     <div className="info-row">
// // //                       <span className="info-label">Last Updated</span>
// // //                       <span className="info-value">
// // //                         {new Date().toLocaleDateString('en-US', {
// // //                           month: 'short',
// // //                           day: 'numeric',
// // //                           year: 'numeric'
// // //                         })}
// // //                       </span>
// // //                     </div>
                    
// // //                     <div className="info-row">
// // //                       <span className="info-label">Profile Visibility</span>
// // //                       <span className="info-value">Public</span>
// // //                     </div>
// // //                   </div>
// // //                 </div>
// // //               </div>
// // //             )}
// // //           </div>
// // //         </div>
// // //       </div>
// // //     </div>
// // //   );
// // // };

// // // frontend/src/pages/Profile/Profile.tsx
// // import React, { useEffect, useState, useRef } from "react";
// // import { useParams, useNavigate } from "react-router-dom";
// // import { useAuth } from "../../context/AuthContext";
// // import "./Profile.css";

// // interface ProfileUser {
// //   user_id: number;
// //   username: string;
// //   email: string;
// //   phone: string;
// //   bio: string;
// //   profile_image_url?: string | null;
// //   role_name?: "admin" | "volunteer" | "user";
// //   created_at: string;
// //   volunteer?: {
// //     status?: string;
// //     badges?: string[];
// //     volunteer_since?: string;
// //   };
// // }

// // export const Profile: React.FC = () => {
// //   const { userId: paramUserId } = useParams<{ userId: string }>();
// //   const { user: currentUser } = useAuth();
// //   const navigate = useNavigate();
// //   const fileInputRef = useRef<HTMLInputElement>(null);
// //   const [imgKey, setImgKey] = useState(Date.now());

// //   const [profileUser, setProfileUser] = useState<ProfileUser | null>(null);
// //   const [loading, setLoading] = useState(true);
// //   const [error, setError] = useState<string | null>(null);
// //   const [editing, setEditing] = useState(false);
// //   const [saving, setSaving] = useState(false);
// //   const [uploadingImage, setUploadingImage] = useState(false);

// //   const [formData, setFormData] = useState({
// //     username: "",
// //     email: "",
// //     phone: "",
// //     bio: "",
// //   });

// //   const userId = paramUserId || currentUser?.user_id?.toString();

// //   // Get image URL with cache busting
// //   const getImageUrl = (url: string | null | undefined): string | null => {
// //     if (!url) return null;
    
// //     let imageUrl = url;
    
// //     if (url.startsWith('/uploads/')) {
// //       imageUrl = `http://localhost:5000${url}`;
// //     } else if (url.startsWith('uploads/')) {
// //       imageUrl = `http://localhost:5000/${url}`;
// //     }
    
// //     const separator = imageUrl.includes('?') ? '&' : '?';
// //     return `${imageUrl}${separator}key=${imgKey}`;
// //   };

// //   // Fetch user data
// //   const fetchUserData = async (force = false) => {
// //     if (!userId) return;
    
// //     setLoading(true);
// //     setError(null);
// //     try {
// //       const token = sessionStorage.getItem("token");
// //       if (!token) throw new Error("No authentication token found");

// //       const url = `http://localhost:5000/api/users/${userId}${force ? `?t=${Date.now()}` : ''}`;
      
// //       const res = await fetch(url, {
// //         headers: { 
// //           Authorization: `Bearer ${token}`,
// //           "Content-Type": "application/json",
// //         },
// //         cache: 'no-store'
// //       });

// //       if (!res.ok) {
// //         throw new Error(`Failed to fetch user (${res.status})`);
// //       }

// //       const data = await res.json();
// //       setProfileUser(data);
// //       setFormData({
// //         username: data.username || "",
// //         email: data.email || "",
// //         phone: data.phone || "",
// //         bio: data.bio || "",
// //       });
// //     } catch (err: any) {
// //       console.error("Fetch user error:", err);
// //       setError(err.message);
// //     } finally {
// //       setLoading(false);
// //     }
// //   };

// //   useEffect(() => {
// //     if (!userId) return;
// //     fetchUserData();
// //   }, [userId]);

// //   // Form handlers
// //   const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
// //     setFormData({ ...formData, [e.target.name]: e.target.value });
// //   };

// //   const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
// //     const file = e.target.files?.[0];
// //     if (!file || !profileUser) return;

// //     const validTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/gif', 'image/webp'];
// //     if (!validTypes.includes(file.type)) {
// //       toast.success('Please select a valid image file (JPEG, PNG, GIF, WEBP)');
// //       return;
// //     }

// //     if (file.size > 5 * 1024 * 1024) {
// //       toast.success('Image size should be less than 5MB');
// //       return;
// //     }

// //     try {
// //       setUploadingImage(true);
// //       const token = sessionStorage.getItem("token");
// //       if (!token) throw new Error("No authentication token");

// //       const uploadFormData = new FormData();
// //       uploadFormData.append('profile_image', file);

// //       const res = await fetch(
// //         `http://localhost:5000/api/users/${profileUser.user_id}/profile-image`, 
// //         {
// //           method: "POST",
// //           headers: {
// //             Authorization: `Bearer ${token}`,
// //           },
// //           body: uploadFormData,
// //         }
// //       );

// //       if (!res.ok) {
// //         const errorData = await res.json().catch(() => ({}));
// //         throw new Error(`Failed to upload image: ${errorData.message || res.statusText}`);
// //       }

// //       const result = await res.json();
// //       setImgKey(Date.now());
      
// //       if (result.profile_image_url || result.imageUrl || result.image_url) {
// //         const newImageUrl = result.profile_image_url || result.imageUrl || result.image_url;
// //         setProfileUser(prev => prev ? { ...prev, profile_image_url: newImageUrl } : null);
        
// //         setTimeout(() => fetchUserData(true), 500);
// //       }
      
// //       toast.success("Profile image updated successfully!");
      
// //     } catch (err: any) {
// //       console.error("Image upload error:", err);
// //       toast.success("Failed to upload image: " + err.message);
// //     } finally {
// //       setUploadingImage(false);
// //       if (fileInputRef.current) fileInputRef.current.value = '';
// //     }
// //   };

// //   const handleRemoveImage = async () => {
// //     if (!profileUser) return;

// //     if (!window.confirm("Are you sure you want to remove your profile image?")) {
// //       return;
// //     }

// //     try {
// //       setUploadingImage(true);
// //       const token = sessionStorage.getItem("token");
// //       if (!token) throw new Error("No authentication token");

// //       const res = await fetch(
// //         `http://localhost:5000/api/users/${profileUser.user_id}/profile-image`, 
// //         {
// //           method: "DELETE",
// //           headers: {
// //             Authorization: `Bearer ${token}`,
// //             "Content-Type": "application/json"
// //           },
// //         }
// //       );

// //       if (!res.ok) {
// //         const errorData = await res.json().catch(() => ({}));
// //         throw new Error(`Failed to remove image: ${errorData.message || res.statusText}`);
// //       }

// //       setImgKey(Date.now());
// //       setProfileUser(prev => prev ? { ...prev, profile_image_url: null } : null);
      
// //       toast.success("Profile image removed successfully!");
// //       setTimeout(() => fetchUserData(true), 500);
      
// //     } catch (err: any) {
// //       console.error("Image removal error:", err);
// //       toast.success("Failed to remove image: " + err.message);
// //     } finally {
// //       setUploadingImage(false);
// //     }
// //   };

// //   const handleSave = async () => {
// //     if (!profileUser) return;

// //     if (!formData.username.trim() || !formData.email.trim()) {
// //       toast.success("Username and email are required");
// //       return;
// //     }

// //     try {
// //       setSaving(true);
// //       const token = sessionStorage.getItem("token");
// //       if (!token) throw new Error("No authentication token");

// //       const res = await fetch(
// //         `http://localhost:5000/api/users/${profileUser.user_id}`, 
// //         {
// //           method: "PATCH",
// //           headers: {
// //             "Content-Type": "application/json",
// //             Authorization: `Bearer ${token}`,
// //           },
// //           body: JSON.stringify({
// //             username: formData.username,
// //             email: formData.email,
// //             phone: formData.phone,
// //             bio: formData.bio,
// //           }),
// //         }
// //       );

// //       if (!res.ok) throw new Error(`Failed to update profile (${res.status})`);

// //       await fetchUserData(true);
// //       setEditing(false);
// //       toast.success("Profile updated successfully!");
// //     } catch (err: any) {
// //       console.error("Update error:", err);
// //       toast.success("Failed to update profile: " + err.message);
// //     } finally {
// //       setSaving(false);
// //     }
// //   };

// //   const handleCancel = () => {
// //     if (profileUser) {
// //       setFormData({
// //         username: profileUser.username,
// //         email: profileUser.email,
// //         phone: profileUser.phone,
// //         bio: profileUser.bio || "",
// //       });
// //     }
// //     setEditing(false);
// //   };

// //   // Helper functions
// //   const getRoleEmoji = (roleName?: string) => {
// //     switch (roleName) {
// //       case 'admin': return '👑';
// //       case 'volunteer': return '🛡️';
// //       default: return '👤';
// //     }
// //   };

// //   const getBadgeEmoji = (badge: string) => {
// //     const badgeLower = badge.toLowerCase();
// //     if (badgeLower.includes('first')) return '🥇';
// //     if (badgeLower.includes('hero') || badgeLower.includes('rescue')) return '🦸';
// //     if (badgeLower.includes('star')) return '⭐';
// //     if (badgeLower.includes('expert')) return '🎯';
// //     if (badgeLower.includes('dedicated')) return '💪';
// //     if (badgeLower.includes('quick')) return '⚡';
// //     if (badgeLower.includes('wildlife')) return '🐾';
// //     return '🏅';
// //   };

// //   // Get badges with fallback for volunteers
// //   const getBadges = () => {
// //     if (profileUser?.volunteer?.badges && profileUser.volunteer.badges.length > 0) {
// //       return profileUser.volunteer.badges;
// //     }
    
// //     // Default badges for volunteers (if no badges from backend)
// //     if (profileUser?.role_name === 'volunteer') {
// //       return [
// //         "First Rescue",
// //         "Wildlife Hero", 
// //         "Quick Responder",
// //         "Dedicated Volunteer"
// //       ];
// //     }
    
// //     return [];
// //   };

// //   // Loading state
// //   if (loading) {
// //     return (
// //       <div className="profile-loading">
// //         <div className="loader-circle"></div>
// //         <p className="loader-text">🌲 Loading Profile...</p>
// //       </div>
// //     );
// //   }

// //   // Error state
// //   if (error) {
// //     return (
// //       <div className="profile-error">
// //         <div className="error-icon">❌</div>
// //         <h3>Error Loading Profile</h3>
// //         <p>{error}</p>
// //         <div className="error-actions">
// //           <button onClick={() => window.location.reload()} className="retry-button">
// //             Retry
// //           </button>
// //           <button onClick={() => navigate("/dashboard")} className="secondary-button">
// //             Dashboard
// //           </button>
// //         </div>
// //       </div>
// //     );
// //   }

// //   // No user found
// //   if (!profileUser) {
// //     return (
// //       <div className="profile-not-found">
// //         <div className="not-found-icon">🔍</div>
// //         <h3>Profile Not Found</h3>
// //         <p>The requested profile could not be loaded.</p>
// //         <button onClick={() => navigate(-1)} className="secondary-button">
// //           Go Back
// //         </button>
// //       </div>
// //     );
// //   }

// //   // Format dates
// //   const joinDate = profileUser.created_at
// //     ? new Date(profileUser.created_at).toLocaleDateString("en-US", {
// //         month: "long",
// //         day: "numeric",
// //         year: "numeric",
// //       })
// //     : "Unknown";

// //   const volunteerSince = profileUser.volunteer?.volunteer_since
// //     ? new Date(profileUser.volunteer.volunteer_since).toLocaleDateString("en-US", {
// //         month: "long",
// //         day: "numeric",
// //         year: "numeric",
// //       })
// //     : null;

// //   // Permissions
// //   const canEdit = currentUser && (
// //     currentUser.user_id === profileUser.user_id || 
// //     currentUser.role_name === 'admin'
// //   );

// //   const isVolunteer = profileUser.role_name === 'volunteer';
// //   const isAdmin = profileUser.role_name === 'admin';
// //   const imageUrl = getImageUrl(profileUser.profile_image_url);
// //   const badges = getBadges();

// //   return (
// //     <div className="profile-page">
// //       <div className="profile-container">
// //         {/* Header */}
// //         <div className="profile-header">
// //           <div className="header-content">
// //             <h1 className="profile-title">🌲 Ranger Profile</h1>
// //             <p className="profile-subtitle">
// //               {isAdmin ? 'Administrator Account' : 
// //                isVolunteer ? 'Wildlife Rescue Volunteer' : 
// //                'Community Member Profile'}
// //             </p>
// //           </div>
// //         </div>

// //         {/* Main Content */}
// //         <div className="profile-main">
// //           {/* Left Column - Profile Info */}
// //           <div className="profile-left">
// //             <div className="profile-card">
// //               {/* Avatar Section */}
// //               <div className="profile-avatar-section">
// //                 <div className={`avatar-container ${uploadingImage ? 'uploading' : ''}`}>
// //                   {uploadingImage ? (
// //                     <div className="avatar-loading">
// //                       <div className="loader-spinner"></div>
// //                       <span>Uploading...</span>
// //                     </div>
// //                   ) : null}
                  
// //                   {imageUrl ? (
// //                     <img 
// //                       key={`avatar-${imgKey}`}
// //                       src={imageUrl}
// //                       alt={profileUser.username}
// //                       className="avatar-image"
// //                       onError={(e) => {
// //                         e.currentTarget.style.display = 'none';
// //                         const fallback = e.currentTarget.nextElementSibling as HTMLDivElement;
// //                         if (fallback) fallback.style.display = 'flex';
// //                       }}
// //                     />
// //                   ) : null}
                  
// //                   <div 
// //                     className="avatar-fallback"
// //                     style={{ display: imageUrl ? 'none' : 'flex' }}
// //                   >
// //                     <span className="fallback-text">
// //                       {profileUser.username?.charAt(0)?.toUpperCase() || "U"}
// //                     </span>
// //                   </div>
                  
// //                   {canEdit && !editing && (
// //                     <div className="avatar-edit-overlay">
// //                       <button 
// //                         className="change-photo-btn"
// //                         onClick={() => fileInputRef.current?.click()}
// //                       >
// //                         📷 Change Photo
// //                       </button>
// //                     </div>
// //                   )}
// //                 </div>

// //                 <input
// //                   ref={fileInputRef}
// //                   type="file"
// //                   accept="image/*"
// //                   onChange={handleImageUpload}
// //                   disabled={uploadingImage}
// //                   style={{ display: 'none' }}
// //                 />

// //                 {canEdit && !editing && imageUrl && (
// //                   <button 
// //                     className="remove-photo-btn"
// //                     onClick={handleRemoveImage}
// //                     disabled={uploadingImage}
// //                   >
// //                     🗑️ Remove Photo
// //                   </button>
// //                 )}
// //               </div>

// //               {/* Profile Details */}
// //               <div className="profile-details-section">
// //                 <div className="profile-header-info">
// //                   <h2 className="profile-name">
// //                     {profileUser.username}
// //                     <span className="user-id">ID: #{profileUser.user_id.toString().padStart(6, '0')}</span>
// //                   </h2>
                  
// //                   <div className={`role-badge ${profileUser.role_name || 'user'}`}>
// //                     <span className="role-emoji">{getRoleEmoji(profileUser.role_name)}</span>
// //                     <span className="role-text">
// //                       {profileUser.role_name?.toUpperCase() || "USER"}
// //                       {profileUser.volunteer?.status && ` • ${profileUser.volunteer.status.toUpperCase()}`}
// //                     </span>
// //                   </div>
// //                 </div>

// //                 {/* Bio Section */}
// //                 <div className="bio-section">
// //                   <div className="section-header">
// //                     <span className="section-icon">📝</span>
// //                     <h3>About</h3>
// //                   </div>
// //                   <p className="bio-text">
// //                     {profileUser.bio || (isAdmin 
// //                       ? 'Administrator dedicated to wildlife conservation and rescue operations.' 
// //                       : isVolunteer 
// //                         ? 'Passionate wildlife rescuer committed to animal welfare and conservation.' 
// //                         : 'Community member supporting wildlife rescue efforts.')}
// //                   </p>
// //                 </div>

// //                 {/* Contact Info */}
// //                 <div className="contact-info">
// //                   <div className="section-header">
// //                     <span className="section-icon">📬</span>
// //                     <h3>Contact Information</h3>
// //                   </div>
                  
// //                   <div className="contact-details">
// //                     <div className="contact-item">
// //                       <span className="contact-icon">📧</span>
// //                       <div className="contact-content">
// //                         <span className="contact-label">Email</span>
// //                         <span className="contact-value">{profileUser.email}</span>
// //                       </div>
// //                     </div>
                    
// //                     <div className="contact-item">
// //                       <span className="contact-icon">📱</span>
// //                       <div className="contact-content">
// //                         <span className="contact-label">Phone</span>
// //                         <span className="contact-value">{profileUser.phone || "Not provided"}</span>
// //                       </div>
// //                     </div>
                    
// //                     <div className="contact-item">
// //                       <span className="contact-icon">📅</span>
// //                       <div className="contact-content">
// //                         <span className="contact-label">Member Since</span>
// //                         <span className="contact-value">{joinDate}</span>
// //                       </div>
// //                     </div>
                    
// //                     {volunteerSince && (
// //                       <div className="contact-item">
// //                         <span className="contact-icon">🛡️</span>
// //                         <div className="contact-content">
// //                           <span className="contact-label">Volunteer Since</span>
// //                           <span className="contact-value">{volunteerSince}</span>
// //                         </div>
// //                       </div>
// //                     )}
// //                   </div>
// //                 </div>

// //                 {!editing && canEdit && (
// //                   <button 
// //                     className="edit-profile-button"
// //                     onClick={() => setEditing(true)}
// //                   >
// //                     ✏️ Edit Profile
// //                   </button>
// //                 )}
// //               </div>
// //             </div>
// //           </div>

// //           {/* Right Column - Edit Form or Additional Info */}
// //           <div className="profile-right">
// //             {editing ? (
// //               <div className="edit-section">
// //                 <div className="edit-header">
// //                   <h2>✏️ Edit Profile Information</h2>
// //                   <p>Update your personal details below</p>
// //                 </div>

// //                 <div className="edit-form">
// //                   <div className="form-group">
// //                     <label className="form-label">
// //                       <span className="label-icon">👤</span>
// //                       Username *
// //                     </label>
// //                     <input
// //                       type="text"
// //                       name="username"
// //                       value={formData.username}
// //                       onChange={handleChange}
// //                       placeholder="Enter username"
// //                       required
// //                       className="form-input"
// //                     />
// //                   </div>

// //                   <div className="form-group">
// //                     <label className="form-label">
// //                       <span className="label-icon">📧</span>
// //                       Email Address *
// //                     </label>
// //                     <input
// //                       type="email"
// //                       name="email"
// //                       value={formData.email}
// //                       onChange={handleChange}
// //                       placeholder="Enter email address"
// //                       required
// //                       className="form-input"
// //                     />
// //                   </div>

// //                   <div className="form-group">
// //                     <label className="form-label">
// //                       <span className="label-icon">📱</span>
// //                       Phone Number
// //                     </label>
// //                     <input
// //                       type="tel"
// //                       name="phone"
// //                       value={formData.phone}
// //                       onChange={handleChange}
// //                       placeholder="Enter phone number"
// //                       className="form-input"
// //                     />
// //                     <div className="input-hint">
// //                       💡 Example: 9801234567
// //                     </div>
// //                   </div>

// //                   <div className="form-group">
// //                     <label className="form-label">
// //                       <span className="label-icon">📝</span>
// //                       Bio
// //                     </label>
// //                     <textarea
// //                       name="bio"
// //                       value={formData.bio}
// //                       onChange={handleChange}
// //                       placeholder="Tell us about yourself..."
// //                       rows={4}
// //                       maxLength={500}
// //                       className="form-textarea"
// //                     />
// //                     <div className="char-counter">
// //                       {formData.bio.length}/500 characters
// //                     </div>
// //                   </div>

// //                   <div className="form-actions">
// //                     <button 
// //                       className="cancel-button"
// //                       onClick={handleCancel}
// //                       disabled={saving}
// //                     >
// //                       Cancel
// //                     </button>
// //                     <button 
// //                       className="save-button"
// //                       onClick={handleSave}
// //                       disabled={saving}
// //                     >
// //                       {saving ? '🔄 Saving...' : '💾 Save Changes'}
// //                     </button>
// //                   </div>
// //                 </div>
// //               </div>
// //             ) : (
// //               <div className="info-section">
// //                 {/* Profile Stats */}
// //                 <div className="stats-card">
// //                   <div className="card-header">
// //                     <h3>📊 Profile Stats</h3>
// //                   </div>
                  
// //                   <div className="stats-content">
// //                     <div className="stat-item">
// //                       <div className="stat-icon">
// //                         {getRoleEmoji(profileUser.role_name)}
// //                       </div>
// //                       <div className="stat-info">
// //                         <span className="stat-label">Account Type</span>
// //                         <span className={`stat-value ${profileUser.role_name || 'user'}`}>
// //                           {isAdmin ? 'Administrator' : isVolunteer ? 'Volunteer' : 'User'}
// //                         </span>
// //                       </div>
// //                     </div>

// //                     <div className="stat-item">
// //                       <div className="stat-icon">📅</div>
// //                       <div className="stat-info">
// //                         <span className="stat-label">Member Since</span>
// //                         <span className="stat-value">{joinDate}</span>
// //                       </div>
// //                     </div>

// //                     <div className="stat-item">
// //                       <div className="stat-icon">📈</div>
// //                       <div className="stat-info">
// //                         <span className="stat-label">Profile Complete</span>
// //                         <div className="progress-container">
// //                           <div className="progress-bar">
// //                             <div 
// //                               className="progress-fill"
// //                               style={{ 
// //                                 width: `${(profileUser.bio ? 25 : 0) + 
// //                                        (profileUser.phone ? 25 : 0) + 
// //                                        50}%` 
// //                               }}
// //                             />
// //                           </div>
// //                           <span className="progress-text">
// //                             {((profileUser.bio ? 25 : 0) + 
// //                               (profileUser.phone ? 25 : 0) + 
// //                               50)}%
// //                           </span>
// //                         </div>
// //                       </div>
// //                     </div>
// //                   </div>
// //                 </div>

// //                 {/* Badges Section - ALWAYS SHOW FOR VOLUNTEERS */}
// //                 {isVolunteer && (
// //                   <div className="badges-card">
// //                     <div className="card-header">
// //                       <h3>🏅 Achievement Badges</h3>
// //                       <span className="badges-count">{badges.length} earned</span>
// //                     </div>
                    
// //                     {badges.length > 0 ? (
// //                       <>
// //                         <div className="badges-grid">
// //                           {badges.map((badge, index) => (
// //                             <div key={index} className="badge-item">
// //                               <div className="badge-icon">
// //                                 {getBadgeEmoji(badge)}
// //                               </div>
// //                               <span className="badge-name">{badge}</span>
// //                             </div>
// //                           ))}
// //                         </div>
                        
// //                         <div className="badges-footer">
// //                           <span className="badges-note">
// //                             🎯 Keep up the great work in wildlife rescue!
// //                           </span>
// //                         </div>
// //                       </>
// //                     ) : (
// //                       <div className="no-badges">
// //                         <div className="no-badges-icon">📭</div>
// //                         <p className="no-badges-text">No badges earned yet</p>
// //                         <p className="no-badges-hint">
// //                           Complete rescue missions and reports to earn badges!
// //                         </p>
// //                       </div>
// //                     )}
// //                   </div>
// //                 )}

// //                 {/* System Info */}
// //                 <div className="system-card">
// //                   <div className="card-header">
// //                     <h3>⚙️ System Information</h3>
// //                   </div>
                  
// //                   <div className="system-info">
// //                     <div className="info-row">
// //                       <span className="info-label">Account Status</span>
// //                       <span className={`info-value status ${profileUser.role_name || 'user'}`}>
// //                         {isAdmin ? 'Administrator' : isVolunteer ? 'Active Volunteer' : 'Active User'}
// //                       </span>
// //                     </div>
                    
// //                     <div className="info-row">
// //                       <span className="info-label">Profile Visibility</span>
// //                       <span className="info-value">Public</span>
// //                     </div>
                    
// //                     <div className="info-row">
// //                       <span className="info-label">Last Updated</span>
// //                       <span className="info-value">
// //                         {new Date().toLocaleDateString('en-US', {
// //                           month: 'short',
// //                           day: 'numeric',
// //                           year: 'numeric'
// //                         })}
// //                       </span>
// //                     </div>
// //                   </div>
// //                 </div>
// //               </div>
// //             )}
// //           </div>
// //         </div>
// //       </div>
// //     </div>
// //   );
// // };

// import React, { useEffect, useState, useRef, useCallback } from "react";
// import { useParams, useNavigate } from "react-router-dom";
// import { useAuth } from "../../context/AuthContext";
// import "./Profile.css";

// interface ProfileUser {
//   user_id: number;
//   username: string;
//   email: string;
//   phone: string;
//   bio: string;
//   profile_image_url?: string | null;
//   role_name?: "admin" | "volunteer" | "user";
//   created_at: string;
//   volunteer?: {
//     approval_status_id?: number;
//     status?: string;
//     volunteer_since?: string;
//     has_car?: boolean;
//     can_foster?: boolean;
//     animal_handling?: string;
//     city?: string;
//     total_tasks?: number;
//     badges?: string[];
//   };
// }

// interface Badge {
//   badge_id: number;
//   badge_name: string;
//   description: string;
//   status: "unlocked" | "locked";
//   awarded_at?: string;
//   task_id?: number;
// }

// interface RescueReport {
//   report_id: number;
//   animal_type: string;
//   animal_condition: string;
//   description: string;
//   location_address: string;
//   status_id: number;
//   status_name: string;
//   submitted_at: string;
//   reporter_name: string;
//   user_id: number;
// }

// interface AdminStats {
//   total_reports: number;
//   reports_this_month: number;
//   total_volunteers: number;
//   resolved_reports: number;
//   by_status?: Array<{ status_id: number; status_name: string; count: number }>;
//   by_type?: Array<{ type_name: string; count: number }>;
// }

// export const Profile: React.FC = () => {
//   const { userId: paramUserId } = useParams<{ userId: string }>();
//   const { user: currentUser } = useAuth();
//   const navigate = useNavigate();
//   const fileInputRef = useRef<HTMLInputElement>(null);
//   const [imgKey, setImgKey] = useState(Date.now());

//   const [profileUser, setProfileUser] = useState<ProfileUser | null>(null);
//   const [badges, setBadges] = useState<Badge[]>([]);
//   const [recentReports, setRecentReports] = useState<RescueReport[]>([]);
//   const [adminStats, setAdminStats] = useState<AdminStats>({
//     total_reports: 0,
//     reports_this_month: 0,
//     total_volunteers: 0,
//     resolved_reports: 0,
//     by_status: [],
//     by_type: []
//   });
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState<string | null>(null);
//   const [editing, setEditing] = useState(false);
//   const [editingEquipment, setEditingEquipment] = useState(false);
//   const [saving, setSaving] = useState(false);
//   const [uploadingImage, setUploadingImage] = useState(false);

//   const [formData, setFormData] = useState({
//     username: "",
//     email: "",
//     phone: "",
//     bio: "",
//   });

//   const [equipmentData, setEquipmentData] = useState({
//     has_car: false,
//     can_foster: false,
//     animal_handling: "dogs",
//     city: "",
//   });

//   const userId = paramUserId || currentUser?.user_id?.toString();

//   const getImageUrl = (url: string | null | undefined): string | null => {
//     if (!url) return null;
//     if (url.startsWith('http')) return `${url}?key=${imgKey}`;
//     if (url.startsWith('/uploads/')) {
//       return `http://localhost:5000${url}?key=${imgKey}`;
//     }
//     return url;
//   };

//   // ============= DATA FETCHING =============
//   const fetchVolunteerBadges = useCallback(async () => {
//     if (!userId) return;
//     try {
//       const token = sessionStorage.getItem("token");
//       const res = await fetch(`http://localhost:5000/api/volunteers/${userId}/badges`, {
//         headers: { 
//           Authorization: `Bearer ${token}`,
//           "Content-Type": "application/json"
//         },
//       });
      
//       if (res.ok) {
//         const data = await res.json();
//         setBadges(data.badges || []);
//       }
//     } catch (err) {
//       console.error("❌ Failed to fetch badges:", err);
//     }
//   }, [userId]);

//   const fetchVolunteerTasks = useCallback(async (userId: number) => {
//     try {
//       const token = sessionStorage.getItem("token");
//       const res = await fetch(`http://localhost:5000/api/tasks/volunteer/${userId}`, {
//         headers: { 
//           Authorization: `Bearer ${token}`,
//           "Content-Type": "application/json"
//         },
//       });
      
//       if (res.ok) {
//         const data = await res.json();
//         setProfileUser(prev => {
//           if (!prev || !prev.volunteer) return prev;
//           return {
//             ...prev,
//             volunteer: {
//               ...prev.volunteer,
//               total_tasks: data.tasks?.length || 0
//             }
//           };
//         });
//       }
//     } catch (err) {
//       console.error("❌ Failed to fetch volunteer tasks:", err);
//     }
//   }, []);

//   const fetchUserReports = useCallback(async () => {
//     try {
//       const token = sessionStorage.getItem("token");
//       const res = await fetch(`http://localhost:5000/api/reports/my-reports`, {
//         headers: { 
//           Authorization: `Bearer ${token}`,
//           "Content-Type": "application/json"
//         },
//       });
      
//       if (res.ok) {
//         const data = await res.json();
//         setRecentReports(data.data || []);
//       }
//     } catch (err) {
//       console.error("❌ Failed to fetch user reports:", err);
//     }
//   }, []);

//   const fetchAllReports = useCallback(async () => {
//     try {
//       const token = sessionStorage.getItem("token");
//       const res = await fetch(`http://localhost:5000/api/reports/admin/all`, {
//         headers: { 
//           Authorization: `Bearer ${token}`,
//           "Content-Type": "application/json"
//         },
//       });
      
//       if (res.ok) {
//         const data = await res.json();
//         setRecentReports(data.data?.slice(0, 4) || []);
        
//         setAdminStats(prev => ({
//           ...prev,
//           total_reports: data.count || 0,
//           resolved_reports: data.data?.filter((r: any) => 
//             r.status_name?.toLowerCase().includes('resolved') || 
//             r.status_name?.toLowerCase().includes('completed') ||
//             r.status_id === 4
//           ).length || 0,
//           reports_this_month: prev.reports_this_month || 0,
//           total_volunteers: prev.total_volunteers || 0
//         }));
//       }
//     } catch (err) {
//       console.error("❌ Failed to fetch reports:", err);
//     }
//   }, []);

//   const fetchAdminStats = useCallback(async () => {
//     try {
//       const token = sessionStorage.getItem("token");
//       const res = await fetch(`http://localhost:5000/api/reports/admin/statistics`, {
//         headers: { 
//           Authorization: `Bearer ${token}`,
//           "Content-Type": "application/json"
//         },
//       });
      
//       if (res.ok) {
//         const data = await res.json();
//         setAdminStats(prev => ({
//           total_reports: data.data?.total || prev.total_reports,
//           reports_this_month: data.data?.recent_week || prev.reports_this_month,
//           total_volunteers: prev.total_volunteers,
//           resolved_reports: prev.resolved_reports,
//           by_status: data.data?.by_status || prev.by_status,
//           by_type: data.data?.by_type || prev.by_type
//         }));
//       }
//     } catch (err) {
//       console.error("❌ Failed to fetch admin stats:", err);
//     }
//   }, []);

//   const fetchAdminVolunteerCount = useCallback(async () => {
//     try {
//       const token = sessionStorage.getItem("token");
//       const res = await fetch(`http://localhost:5000/api/users`, {
//         headers: { 
//           Authorization: `Bearer ${token}`,
//           "Content-Type": "application/json"
//         },
//       });
      
//       if (res.ok) {
//         const data = await res.json();
//         const volunteerCount = data.filter((u: any) => u.role_name === 'volunteer').length;
//         setAdminStats(prev => ({
//           ...prev,
//           total_volunteers: volunteerCount
//         }));
//       }
//     } catch (err) {
//       console.error("❌ Failed to fetch volunteer count:", err);
//       setAdminStats(prev => ({
//         ...prev,
//         total_volunteers: 0
//       }));
//     }
//   }, []);

//   const fetchAdminReportsCount = useCallback(async () => {
//     try {
//       const token = sessionStorage.getItem("token");
//       const res = await fetch(`http://localhost:5000/api/reports/admin/all`, {
//         headers: { 
//           Authorization: `Bearer ${token}`,
//           "Content-Type": "application/json"
//         },
//       });
      
//       if (res.ok) {
//         const data = await res.json();
//         setAdminStats(prev => ({
//           ...prev,
//           total_reports: data.count || 0
//         }));
//       }
//     } catch (err) {
//       console.error("❌ Failed to fetch reports count:", err);
//     }
//   }, []);

//   const fetchUserData = useCallback(async (force = false) => {
//     if (!userId) return;
    
//     setLoading(true);
//     setError(null);
//     try {
//       const token = sessionStorage.getItem("token");
//       if (!token) throw new Error("No authentication token found");

//       const url = `http://localhost:5000/api/users/${userId}${force ? `?t=${Date.now()}` : ''}`;
//       const res = await fetch(url, {
//         headers: { 
//           Authorization: `Bearer ${token}`,
//           "Content-Type": "application/json",
//         },
//         cache: 'no-store'
//       });

//       if (!res.ok) throw new Error(`Failed to fetch user (${res.status})`);

//       const data = await res.json();
      
//       setProfileUser(data);
//       setFormData({
//         username: data.username || "",
//         email: data.email || "",
//         phone: data.phone || "",
//         bio: data.bio || "",
//       });

//       // Set equipment data for volunteers
//       if (data.role_name === 'volunteer' && data.volunteer) {
//         setEquipmentData({
//           has_car: data.volunteer.has_car || false,
//           can_foster: data.volunteer.can_foster || false,
//           animal_handling: data.volunteer.animal_handling || "dogs",
//           city: data.volunteer.city || "",
//         });
//       }

//       // Fetch role-specific data
//       if (data.role_name === 'volunteer') {
//         fetchVolunteerBadges();
//         fetchVolunteerTasks(data.user_id);
//       } else if (data.role_name === 'admin') {
//         fetchAdminStats();
//         fetchAllReports();
//         fetchAdminVolunteerCount();
//         fetchAdminReportsCount();
//       } else if (data.role_name === 'user' && currentUser?.user_id === data.user_id) {
//         fetchUserReports();
//       }

//     } catch (err: any) {
//       console.error("❌ Fetch user error:", err);
//       setError(err.message);
//     } finally {
//       setLoading(false);
//     }
//   }, [userId, currentUser, fetchVolunteerBadges, fetchVolunteerTasks, fetchUserReports, fetchAllReports, fetchAdminStats, fetchAdminVolunteerCount, fetchAdminReportsCount]);

//   useEffect(() => {
//     if (!userId) return;
//     fetchUserData();
//   }, [userId, fetchUserData]);

//   // ============= IMAGE HANDLERS =============
//   const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
//     const file = e.target.files?.[0];
//     if (!file || !profileUser) return;

//     try {
//       setUploadingImage(true);
//       const token = sessionStorage.getItem("token");
//       if (!token) throw new Error("No authentication token");

//       const uploadFormData = new FormData();
//       uploadFormData.append('profile_image', file);

//       const res = await fetch(
//         `http://localhost:5000/api/users/${profileUser.user_id}/profile-image`, 
//         {
//           method: "POST",
//           headers: { Authorization: `Bearer ${token}` },
//           body: uploadFormData,
//         }
//       );

//       if (!res.ok) throw new Error(`Failed to upload image`);

//       const result = await res.json();
//       setImgKey(Date.now());
      
//       if (result.profile_image_url) {
//         setProfileUser(prev => prev ? { ...prev, profile_image_url: result.profile_image_url } : null);
//         setTimeout(() => fetchUserData(true), 500);
//       }
      
//     } catch (err: any) {
//       console.error("❌ Image upload error:", err);
//       toast.success("Failed to upload image: " + err.message);
//     } finally {
//       setUploadingImage(false);
//       if (fileInputRef.current) fileInputRef.current.value = '';
//     }
//   };

//   const handleRemoveImage = async () => {
//     if (!profileUser) return;
//     if (!window.confirm("Remove profile image?")) return;

//     try {
//       setUploadingImage(true);
//       const token = sessionStorage.getItem("token");
//       if (!token) throw new Error("No authentication token");

//       const res = await fetch(
//         `http://localhost:5000/api/users/${profileUser.user_id}/profile-image`, 
//         {
//           method: "DELETE",
//           headers: {
//             Authorization: `Bearer ${token}`,
//             "Content-Type": "application/json"
//           },
//         }
//       );

//       if (!res.ok) throw new Error(`Failed to remove image`);

//       setImgKey(Date.now());
//       setProfileUser(prev => prev ? { ...prev, profile_image_url: null } : null);
//       setTimeout(() => fetchUserData(true), 500);
//     } catch (err: any) {
//       console.error("❌ Image removal error:", err);
//       toast.success("Failed to remove image: " + err.message);
//     } finally {
//       setUploadingImage(false);
//     }
//   };

//   // ============= PROFILE EDIT HANDLERS =============
//   const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
//     setFormData({ ...formData, [e.target.name]: e.target.value });
//   };

//   const handleEquipmentChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
//     const { name, value, type } = e.target;
//     if (type === 'checkbox') {
//       const checked = (e.target as HTMLInputElement).checked;
//       setEquipmentData({ ...equipmentData, [name]: checked });
//     } else {
//       setEquipmentData({ ...equipmentData, [name]: value });
//     }
//   };

//   const handleSaveProfile = async () => {
//     if (!profileUser) return;
//     if (!formData.username.trim() || !formData.email.trim()) {
//       toast.success("Username and email are required");
//       return;
//     }

//     try {
//       setSaving(true);
//       const token = sessionStorage.getItem("token");
//       if (!token) throw new Error("No authentication token");

//       const res = await fetch(
//         `http://localhost:5000/api/users/${profileUser.user_id}`, 
//         {
//           method: "PATCH",
//           headers: {
//             "Content-Type": "application/json",
//             Authorization: `Bearer ${token}`,
//           },
//           body: JSON.stringify({
//             username: formData.username,
//             email: formData.email,
//             phone: formData.phone,
//             bio: formData.bio,
//           }),
//         }
//       );

//       if (!res.ok) throw new Error(`Failed to update profile`);

//       await fetchUserData(true);
//       setEditing(false);
//       toast.success("Profile updated successfully!");
//     } catch (err: any) {
//       console.error("❌ Update error:", err);
//       toast.success("Failed to update profile: " + err.message);
//     } finally {
//       setSaving(false);
//     }
//   };

//   // ============= ✅ FIXED VOLUNTEER EQUIPMENT UPDATE =============
//   const handleSaveEquipment = async () => {
//     if (!profileUser) return;

//     try {
//       setSaving(true);
//       const token = sessionStorage.getItem("token");
//       if (!token) throw new Error("No authentication token");

//       console.log("📤 Sending equipment update to:", `http://localhost:5000/api/users/${profileUser.user_id}/volunteer-profile`);
//       console.log("📤 Equipment data:", {
//         has_car: equipmentData.has_car,
//         can_foster: equipmentData.can_foster,
//         animal_handling: equipmentData.animal_handling,
//         city: equipmentData.city
//       });

//       // ✅ CORRECT ENDPOINT - matches your backend EXACTLY
//       const res = await fetch(
//         `http://localhost:5000/api/users/${profileUser.user_id}/volunteer-profile`, 
//         {
//           method: "PATCH",
//           headers: {
//             "Content-Type": "application/json",
//             Authorization: `Bearer ${token}`,
//           },
//           body: JSON.stringify({
//             has_car: equipmentData.has_car,
//             can_foster: equipmentData.can_foster,
//             animal_handling: equipmentData.animal_handling,
//             city: equipmentData.city,
//           }),
//         }
//       );

//       const responseData = await res.json();

//       if (!res.ok) {
//         console.error("❌ Server responded with error:", responseData);
//         throw new Error(responseData.message || 'Failed to update volunteer equipment & skills');
//       }

//       console.log("✅ Equipment update successful:", responseData);
      
//       await fetchUserData(true);
//       setEditingEquipment(false);
//       toast.success("Equipment & Skills updated successfully!");
//     } catch (err: any) {
//       console.error("❌ Update equipment error:", err);
//       toast.success("Failed to update equipment: " + err.message);
//     } finally {
//       setSaving(false);
//     }
//   };

//   const handleCancel = () => {
//     if (profileUser) {
//       setFormData({
//         username: profileUser.username,
//         email: profileUser.email,
//         phone: profileUser.phone,
//         bio: profileUser.bio || "",
//       });
//     }
//     setEditing(false);
//   };

//   const handleCancelEquipment = () => {
//     if (profileUser?.volunteer) {
//       setEquipmentData({
//         has_car: profileUser.volunteer.has_car || false,
//         can_foster: profileUser.volunteer.can_foster || false,
//         animal_handling: profileUser.volunteer.animal_handling || "dogs",
//         city: profileUser.volunteer.city || "",
//       });
//     }
//     setEditingEquipment(false);
//   };

//   // ============= HELPER FUNCTIONS =============
//   const getStatusText = (statusId?: number) => {
//     switch (statusId) {
//       case 1: return 'Pending';
//       case 2: return 'Approved';
//       case 3: return 'Rejected';
//       default: return 'Unknown';
//     }
//   };

//   const getAnimalHandlingText = (value?: string) => {
//     const map: Record<string, string> = {
//       'all': 'All animals',
//       'dogs': 'Dogs',
//       'cats': 'Cats',
//       'horses': 'Horses',
//       'both': 'Dogs & cats',
//       'small': 'Small animals',
//       'birds': 'Birds',
//     };
//     return map[value || ''] || value || 'Not specified';
//   };

//   const getReportIcon = (animalType: string) => {
//     const type = animalType?.toLowerCase() || '';
//     if (type.includes('dog')) return '🐕';
//     if (type.includes('cat')) return '🐈';
//     if (type.includes('bird')) return '🕊️';
//     if (type.includes('fox')) return '🦊';
//     if (type.includes('deer')) return '🦌';
//     if (type.includes('rabbit')) return '🐇';
//     if (type.includes('squirrel')) return '🐿️';
//     if (type.includes('raccoon')) return '🦝';
//     if (type.includes('owl')) return '🦉';
//     if (type.includes('eagle')) return '🦅';
//     if (type.includes('turtle')) return '🐢';
//     return '🐾';
//   };

//   const getPriorityFromStatus = (statusName: string) => {
//     const name = statusName?.toLowerCase() || '';
//     if (name.includes('critical')) return 'critical';
//     if (name.includes('urgent') || name.includes('high')) return 'high';
//     if (name.includes('medium')) return 'medium';
//     return 'low';
//   };

//   const getPriorityColor = (priority: string) => {
//     switch (priority) {
//       case 'critical': return '#dc4a4a';
//       case 'high': return '#b85a1a';
//       case 'medium': return '#f4b942';
//       case 'low': return '#2c5e4a';
//       default: return '#5f7970';
//     }
//   };

//   const getStatusBadge = (statusName: string) => {
//     const name = statusName?.toLowerCase() || '';
//     if (name.includes('resolved') || name.includes('completed')) 
//       return { text: 'Resolved', class: 'status-resolved' };
//     if (name.includes('progress') || name.includes('assigned')) 
//       return { text: 'In Progress', class: 'status-progress' };
//     if (name.includes('pending') || name.includes('submitted')) 
//       return { text: 'Pending', class: 'status-pending' };
//     return { text: statusName || 'Unknown', class: '' };
//   };

//   const unlockedBadges = badges.filter(b => b.status === 'unlocked');
//   const lockedBadges = badges.filter(b => b.status === 'locked');
  
//   const joinDate = profileUser?.created_at
//     ? new Date(profileUser.created_at).toLocaleDateString("en-US", {
//         month: "short",
//         day: "numeric",
//         year: "numeric",
//       })
//     : "Unknown";

//   const volunteerSince = profileUser?.volunteer?.volunteer_since
//     ? new Date(profileUser.volunteer.volunteer_since).toLocaleDateString("en-US", {
//         month: "short",
//         day: "numeric",
//         year: "numeric",
//       })
//     : null;

//   const canEdit = currentUser && (
//     currentUser.user_id === profileUser?.user_id || 
//     currentUser.role_name === 'admin'
//   );

//   const isVolunteer = profileUser?.role_name === 'volunteer';
//   const isAdmin = profileUser?.role_name === 'admin';
//   const imageUrl = getImageUrl(profileUser?.profile_image_url);
//   const statusText = getStatusText(profileUser?.volunteer?.approval_status_id);

//   // ============= LOADING STATES =============
//   if (loading) {
//     return (
//       <div className="profile-loading">
//         <div className="loading-spinner"></div>
//         <p>Loading profile...</p>
//       </div>
//     );
//   }

//   if (error || !profileUser) {
//     return (
//       <div className="profile-error">
//         <div className="error-icon">⚠️</div>
//         <h3>Profile Not Found</h3>
//         <p>{error || 'The requested profile could not be loaded.'}</p>
//         <button onClick={() => navigate('/dashboard')} className="btn-primary">
//           Back to Dashboard
//         </button>
//       </div>
//     );
//   }

//   return (
//     <div className="profile">
//       <div className="profile-header">
//         <div>
//           <h1>Profile</h1>
//           <p>@{profileUser.username}</p>
//         </div>
//         {canEdit && !editing && !editingEquipment && (
//           <button className="btn-edit" onClick={() => setEditing(true)}>
//             <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
//               <path d="M12 20h9M16.5 3.5L20 7l-9 9H7v-4l9-9z"/>
//             </svg>
//             Edit Profile
//           </button>
//         )}
//       </div>

//       <div className="profile-grid">
//         {/* ============ LEFT COLUMN - PROFILE CARD ============ */}
//         <div className="profile-card">
//           <div className="profile-avatar-section">
//             <div className="profile-avatar-wrapper">
//               <div className={`profile-avatar ${uploadingImage ? 'uploading' : ''}`}>
//                 {uploadingImage ? (
//                   <div className="avatar-uploading">
//                     <div className="spinner"></div>
//                   </div>
//                 ) : imageUrl ? (
//                   <img 
//                     key={`avatar-${imgKey}`}
//                     src={imageUrl} 
//                     alt={profileUser.username}
//                   />
//                 ) : (
//                   <div className="avatar-fallback">
//                     {profileUser.username?.charAt(0)?.toUpperCase() || 'U'}
//                   </div>
//                 )}
//               </div>
              
//               {canEdit && !editing && !editingEquipment && (
//                 <div className="avatar-edit-buttons">
//                   <input
//                     ref={fileInputRef}
//                     type="file"
//                     accept="image/*"
//                     onChange={handleImageUpload}
//                     disabled={uploadingImage}
//                     id="avatar-upload"
//                     hidden
//                   />
//                   <button 
//                     className="avatar-btn change"
//                     onClick={() => fileInputRef.current?.click()}
//                     disabled={uploadingImage}
//                   >
//                     <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
//                       <path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z"/>
//                       <circle cx="12" cy="13" r="4"/>
//                     </svg>
//                     Change
//                   </button>
//                   {imageUrl && (
//                     <button 
//                       className="avatar-btn remove"
//                       onClick={handleRemoveImage}
//                       disabled={uploadingImage}
//                     >
//                       <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
//                         <path d="M3 6h18M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/>
//                       </svg>
//                       Remove
//                     </button>
//                   )}
//                 </div>
//               )}
//             </div>
//           </div>

//           <div className="profile-info">
//             {editing ? (
//               <div className="edit-field">
//                 <label>Username</label>
//                 <input
//                   type="text"
//                   name="username"
//                   value={formData.username}
//                   onChange={handleChange}
//                   placeholder="Username"
//                 />
//               </div>
//             ) : (
//               <h2>{profileUser.username}</h2>
//             )}
            
//             <div className={`profile-role ${profileUser.role_name || 'user'}`}>
//               {profileUser.role_name === 'admin' ? '👑' : 
//                profileUser.role_name === 'volunteer' ? '🦊' : '🌿'}
//               <span>{profileUser.role_name?.toUpperCase() || 'MEMBER'}</span>
//               {isVolunteer && statusText && (
//                 <span className={`role-status status-${statusText.toLowerCase()}`}>
//                   • {statusText}
//                 </span>
//               )}
//             </div>
            
//             {editing ? (
//               <div className="edit-field">
//                 <label>Bio</label>
//                 <textarea
//                   name="bio"
//                   value={formData.bio}
//                   onChange={handleChange}
//                   placeholder="Tell us about yourself..."
//                   rows={3}
//                   maxLength={120}
//                 />
//                 <div className="field-hint">{formData.bio.length}/120</div>
//               </div>
//             ) : (
//               profileUser.bio && (
//                 <div className="profile-bio">
//                   <span className="bio-quote">"</span>
//                   {profileUser.bio}
//                   <span className="bio-quote">"</span>
//                 </div>
//               )
//             )}

//             <div className="profile-meta">
//               <div className="meta-group">
//                 <div className="meta-item">
//                   <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
//                     <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
//                     <polyline points="22,6 12,13 2,6"/>
//                   </svg>
//                   {editing ? (
//                     <input
//                       type="email"
//                       name="email"
//                       value={formData.email}
//                       onChange={handleChange}
//                       placeholder="Email address"
//                     />
//                   ) : (
//                     <span>{profileUser.email}</span>
//                   )}
//                 </div>

//                 <div className="meta-item">
//                   <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
//                     <rect x="5" y="2" width="14" height="20" rx="2" ry="2"/>
//                     <line x1="12" y1="18" x2="12" y2="18"/>
//                   </svg>
//                   {editing ? (
//                     <input
//                       type="tel"
//                       name="phone"
//                       value={formData.phone}
//                       onChange={handleChange}
//                       placeholder="Phone number"
//                     />
//                   ) : (
//                     <span>{profileUser.phone || 'Not provided'}</span>
//                   )}
//                 </div>

//                 <div className="meta-item">
//                   <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
//                     <rect x="3" y="4" width="18" height="18" rx="2" ry="2"/>
//                     <line x1="16" y1="2" x2="16" y2="6"/>
//                     <line x1="8" y1="2" x2="8" y2="6"/>
//                     <line x1="3" y1="10" x2="21" y2="10"/>
//                   </svg>
//                   <span>Joined {joinDate}</span>
//                 </div>

//                 {volunteerSince && (
//                   <div className="meta-item">
//                     <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
//                       <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/>
//                       <circle cx="12" cy="7" r="4"/>
//                     </svg>
//                     <span>Ranger since {volunteerSince}</span>
//                   </div>
//                 )}
//               </div>
//             </div>

//             <div className="profile-id">
//               <span className="id-label">RANGER ID</span>
//               <span className="id-value">SRMS-{profileUser.user_id.toString().padStart(6, '0')}</span>
//             </div>

//             {canEdit && editing && (
//               <div className="profile-actions">
//                 <button className="btn-secondary" onClick={handleCancel} disabled={saving}>
//                   Cancel
//                 </button>
//                 <button className="btn-primary" onClick={handleSaveProfile} disabled={saving}>
//                   {saving ? 'Saving...' : 'Save Changes'}
//                 </button>
//               </div>
//             )}
//           </div>
//         </div>

//         {/* ============ RIGHT COLUMN - ROLE SPECIFIC CONTENT ============ */}
//         <div className="profile-sidebar">
          
//           {/* ---------- STATS CARD (ALL ROLES) ---------- */}
//           <div className="stats-card">
//             <div className="stats-header">
//               <h3>
//                 <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
//                   <path d="M21 12v-2a5 5 0 0 0-5-2H8a5 5 0 0 0-5 2v2"/>
//                   <rect x="3" y="12" width="18" height="8" rx="2"/>
//                 </svg>
//                 Statistics
//               </h3>
//               <span className="stats-badge">
//                 {isAdmin ? 'ADMIN' : isVolunteer ? 'VOLUNTEER' : 'MEMBER'}
//               </span>
//             </div>
            
//             {isVolunteer ? (
//               <div className="stats-grid">
//                 <div className="stat-item">
//                   <div className="stat-value">{profileUser.volunteer?.total_tasks || 0}</div>
//                   <div className="stat-label">Missions</div>
//                   <div className="stat-trend">Completed</div>
//                 </div>
//                 <div className="stat-item">
//                   <div className="stat-value">{unlockedBadges.length}</div>
//                   <div className="stat-label">Badges</div>
//                   <div className="stat-trend">{lockedBadges.length} locked</div>
//                 </div>
//               </div>
//             ) : isAdmin ? (
//               <div className="admin-stats">
//                 <div className="admin-stats-grid">
//                   <div className="admin-stat-item">
//                     <div className="admin-stat-value">{adminStats.total_reports}</div>
//                     <div className="admin-stat-label">Total Reports</div>
//                   </div>
//                   <div className="admin-stat-item">
//                     <div className="admin-stat-value">{adminStats.reports_this_month}</div>
//                     <div className="admin-stat-label">This Month</div>
//                   </div>
//                   <div className="admin-stat-item">
//                     <div className="admin-stat-value">{adminStats.total_volunteers}</div>
//                     <div className="admin-stat-label">Volunteers</div>
//                   </div>
//                   <div className="admin-stat-item">
//                     <div className="admin-stat-value">{adminStats.resolved_reports}</div>
//                     <div className="admin-stat-label">Resolved</div>
//                   </div>
//                 </div>
//                 <div className="admin-role-info">
//                   <span className="admin-icon">👑</span>
//                   <div className="admin-role-text">
//                     <h4>Administrator</h4>
//                     <p>Managing wildlife rescue operations</p>
//                   </div>
//                 </div>
//               </div>
//             ) : (
//               <div className="user-stats">
//                 <div className="user-stat-main">
//                   <div className="user-stat-icon">📋</div>
//                   <div className="user-stat-info">
//                     <div className="user-stat-value">{recentReports.length}</div>
//                     <div className="user-stat-label">Reports Submitted</div>
//                   </div>
//                 </div>
//                 <div className="user-role-info">
//                   <span className="user-icon">🌿</span>
//                   <div className="user-role-text">
//                     <h4>Community Member</h4>
//                     <p>Supporting wildlife rescue since {joinDate}</p>
//                   </div>
//                 </div>
//               </div>
//             )}
//           </div>

//           {/* ---------- VOLUNTEER EQUIPMENT (VOLUNTEER ONLY) - NOW EDITABLE ---------- */}
//           {isVolunteer && (
//             <div className="equipment-card">
//               <div className="equipment-header">
//                 <h3>
//                   <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
//                     <path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z"/>
//                   </svg>
//                   Equipment & Skills
//                 </h3>
//                 {canEdit && !editing && !editingEquipment && (
//                   <button 
//                     className="btn-edit-small"
//                     onClick={() => setEditingEquipment(true)}
//                   >
//                     <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
//                       <path d="M12 20h9M16.5 3.5L20 7l-9 9H7v-4l9-9z"/>
//                     </svg>
//                     Edit
//                   </button>
//                 )}
//               </div>

//               {editingEquipment ? (
//                 <div className="equipment-edit-form">
//                   <div className="equipment-edit-field">
//                     <label className="checkbox-label">
//                       <input
//                         type="checkbox"
//                         name="has_car"
//                         checked={equipmentData.has_car}
//                         onChange={handleEquipmentChange}
//                       />
//                       <span>I have a car available for transport</span>
//                     </label>
//                   </div>

//                   <div className="equipment-edit-field">
//                     <label className="checkbox-label">
//                       <input
//                         type="checkbox"
//                         name="can_foster"
//                         checked={equipmentData.can_foster}
//                         onChange={handleEquipmentChange}
//                       />
//                       <span>I can foster animals</span>
//                     </label>
//                   </div>

//                   <div className="equipment-edit-field">
//                     <label htmlFor="animal_handling">Animal handling experience:</label>
//                     <select
//                       id="animal_handling"
//                       name="animal_handling"
//                       value={equipmentData.animal_handling}
//                       onChange={handleEquipmentChange}
//                       className="equipment-select"
//                     >
//                       <option value="dogs">Dogs</option>
//                       <option value="cats">Cats</option>
//                       <option value="both">Dogs & cats</option>
//                       <option value="small">Small animals</option>
//                       <option value="birds">Birds</option>
//                       <option value="horses">Horses</option>
//                       <option value="all">All animals</option>
//                     </select>
//                   </div>

//                   <div className="equipment-edit-field">
//                     <label htmlFor="city">Base city/location:</label>
//                     <input
//                       type="text"
//                       id="city"
//                       name="city"
//                       value={equipmentData.city}
//                       onChange={handleEquipmentChange}
//                       placeholder="e.g., Kathmandu"
//                       className="equipment-input"
//                     />
//                   </div>

//                   <div className="equipment-edit-actions">
//                     <button 
//                       className="btn-secondary small"
//                       onClick={handleCancelEquipment}
//                       disabled={saving}
//                     >
//                       Cancel
//                     </button>
//                     <button 
//                       className="btn-primary small"
//                       onClick={handleSaveEquipment}
//                       disabled={saving}
//                     >
//                       {saving ? 'Saving...' : 'Save Changes'}
//                     </button>
//                   </div>
//                 </div>
//               ) : (
//                 <div className="equipment-grid">
//                   <div className="equipment-item">
//                     <span className="equipment-icon">🚗</span>
//                     <div className="equipment-info">
//                       <span className="equipment-label">Transport</span>
//                       <span className={`equipment-badge ${profileUser.volunteer?.has_car ? 'yes' : 'no'}`}>
//                         {profileUser.volunteer?.has_car ? 'Available' : 'Not available'}
//                       </span>
//                     </div>
//                   </div>
//                   <div className="equipment-item">
//                     <span className="equipment-icon">🏠</span>
//                     <div className="equipment-info">
//                       <span className="equipment-label">Fostering</span>
//                       <span className={`equipment-badge ${profileUser.volunteer?.can_foster ? 'yes' : 'no'}`}>
//                         {profileUser.volunteer?.can_foster ? 'Available' : 'Not available'}
//                       </span>
//                     </div>
//                   </div>
//                   <div className="equipment-item">
//                     <span className="equipment-icon">🐾</span>
//                     <div className="equipment-info">
//                       <span className="equipment-label">Handles</span>
//                       <span className="equipment-value">
//                         {getAnimalHandlingText(profileUser.volunteer?.animal_handling)}
//                       </span>
//                     </div>
//                   </div>
//                   <div className="equipment-item">
//                     <span className="equipment-icon">📍</span>
//                     <div className="equipment-info">
//                       <span className="equipment-label">Base</span>
//                       <span className="equipment-value">
//                         {profileUser.volunteer?.city || 'Any location'}
//                       </span>
//                     </div>
//                   </div>
//                 </div>
//               )}
//             </div>
//           )}

//           {/* ---------- VOLUNTEER BADGES (VOLUNTEER ONLY) ---------- */}
//           {isVolunteer && (
//             <div className="badges-card">
//               <h3>
//                 <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
//                   <circle cx="12" cy="8" r="7"/>
//                   <polyline points="8.21 13.89 7 23 12 20 17 23 15.79 13.88"/>
//                 </svg>
//                 Badges & Achievements
//               </h3>
              
//               {unlockedBadges.length > 0 ? (
//                 <div className="badges-grid">
//                   {unlockedBadges.map(badge => (
//                     <div key={badge.badge_id} className="badge-card">
//                       <div className="badge-icon-wrapper">
//                         <span className="badge-icon">🏆</span>
//                       </div>
//                       <div className="badge-info">
//                         <span className="badge-name">{badge.badge_name}</span>
//                         {badge.awarded_at && (
//                           <span className="badge-date">
//                             {new Date(badge.awarded_at).toLocaleDateString()}
//                           </span>
//                         )}
//                       </div>
//                     </div>
//                   ))}
//                 </div>
//               ) : (
//                 <div className="badges-empty">
//                   <div className="empty-icon">🏅</div>
//                   <p>No badges yet</p>
//                   <span>Complete missions to earn achievements</span>
//                 </div>
//               )}
//             </div>
//           )}

//           {/* ---------- RECENT REPORTS (REGULAR USERS AND ADMINS ONLY - NOT VOLUNTEERS) ---------- */}
//           {!isVolunteer && (
//             <div className="reports-card">
//               <div className="reports-header">
//                 <h3>
//                   <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
//                     <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8l-6-6z"/>
//                     <path d="M14 2v6h6M16 13H8M16 17H8M10 9H8"/>
//                   </svg>
//                   Recent Reports
//                 </h3>
//                 {recentReports.length > 0 && (
//                   <span className="reports-count">{recentReports.length} total</span>
//                 )}
//               </div>
              
//               <div className="reports-list">
//                 {recentReports.length > 0 ? (
//                   recentReports.slice(0, 3).map((report) => {
//                     const status = getStatusBadge(report.status_name);
//                     const priority = getPriorityFromStatus(report.status_name);
//                     return (
//                       <div key={report.report_id} className="report-item">
//                         <div className="report-icon">
//                           {getReportIcon(report.animal_type)}
//                         </div>
//                         <div className="report-content">
//                           <div className="report-title">
//                             <span className="animal-type">{report.animal_type || 'Unknown'}</span>
//                             <span 
//                               className="report-priority" 
//                               style={{ 
//                                 backgroundColor: getPriorityColor(priority) + '20', 
//                                 color: getPriorityColor(priority) 
//                               }}
//                             >
//                               {report.animal_condition || 'Injured'}
//                             </span>
//                           </div>
//                           <div className="report-location">
//                             <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
//                               <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/>
//                               <circle cx="12" cy="10" r="3"/>
//                             </svg>
//                             {report.location_address?.split(',')[0] || 'Unknown location'}
//                           </div>
//                           <div className="report-meta">
//                             <span className={`report-status ${status.class}`}>
//                               {status.text}
//                             </span>
//                             <span className="report-date">
//                               {new Date(report.submitted_at).toLocaleDateString('en-US', { 
//                                 month: 'short', 
//                                 day: 'numeric' 
//                               })}
//                             </span>
//                           </div>
//                           {isAdmin && report.reporter_name && (
//                             <div className="report-reporter">
//                               Reported by: <strong>{report.reporter_name}</strong>
//                             </div>
//                           )}
//                         </div>
//                       </div>
//                     );
//                   })
//                 ) : (
//                   <div className="reports-empty">
//                     <div className="empty-icon">📋</div>
//                     <p>No reports yet</p>
//                     <span>{isAdmin ? 'Reports submitted will appear here' : 'Reports you submit will appear here'}</span>
//                   </div>
//                 )}
                
//                 {recentReports.length > 0 && (
//                   <button 
//                     className="view-all-btn"
//                     onClick={() => navigate(isAdmin ? '/admin/reports' : '/reports')}
//                   >
//                     View all reports
//                     <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
//                       <path d="M5 12h14M12 5l7 7-7 7"/>
//                     </svg>
//                   </button>
//                 )}
//               </div>
//             </div>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// };

import React, { useEffect, useState, useRef, useCallback } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import "./Profile.css";

interface ProfileUser {
  user_id: number;
  username: string;
  email: string;
  phone: string;
  bio: string;
  profile_image_url?: string | null;
  role_name?: "admin" | "volunteer" | "user";
  created_at: string;
  volunteer?: {
    approval_status_id?: number;
    status?: string;
    volunteer_since?: string;
    has_car?: boolean;
    can_foster?: boolean;
    animal_handling?: string;
    city?: string;
    total_tasks?: number;
    badges?: string[];
    availability_status_id?: number;
    availability_status?: string;
  };
}

interface Badge {
  badge_id: number;
  badge_name: string;
  description: string;
  status: "unlocked" | "locked";
  awarded_at?: string;
  task_id?: number;
}

interface RescueReport {
  report_id: number;
  animal_type: string;
  animal_condition: string;
  description: string;
  location_address: string;
  status_id: number;
  status_name: string;
  submitted_at: string;
  reporter_name: string;
  user_id: number;
}

interface AdminStats {
  total_reports: number;
  reports_this_month: number;
  total_volunteers: number;
  resolved_reports: number;
  by_status?: Array<{ status_id: number; status_name: string; count: number }>;
  by_type?: Array<{ type_name: string; count: number }>;
}

interface AvailabilityStatus {
  status_id: number;
  status_name: string;
}

export const Profile: React.FC = () => {
  const { userId: paramUserId } = useParams<{ userId: string }>();
  const { user: currentUser } = useAuth();
  const navigate = useNavigate();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [imgKey, setImgKey] = useState(Date.now());

  const [profileUser, setProfileUser] = useState<ProfileUser | null>(null);
  const [badges, setBadges] = useState<Badge[]>([]);
  const [recentReports, setRecentReports] = useState<RescueReport[]>([]);
  const [adminStats, setAdminStats] = useState<AdminStats>({
    total_reports: 0,
    reports_this_month: 0,
    total_volunteers: 0,
    resolved_reports: 0,
    by_status: [],
    by_type: []
  });
  const [availabilityStatuses, setAvailabilityStatuses] = useState<AvailabilityStatus[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [editing, setEditing] = useState(false);
  const [editingEquipment, setEditingEquipment] = useState(false);
  const [saving, setSaving] = useState(false);
  const [uploadingImage, setUploadingImage] = useState(false);

  const [formData, setFormData] = useState({
    username: "",
    email: "",
    phone: "",
    bio: "",
  });

  const [equipmentData, setEquipmentData] = useState({
    has_car: false,
    can_foster: false,
    animal_handling: "dogs",
    city: "",
    availability_status_id: 1,
  });

  const userId = paramUserId || currentUser?.user_id?.toString();

  const getImageUrl = (url: string | null | undefined): string | null => {
    if (!url) return null;
    if (url.startsWith('http')) return `${url}?key=${imgKey}`;
    if (url.startsWith('/uploads/')) {
      return `http://localhost:5000${url}?key=${imgKey}`;
    }
    return url;
  };

  // ============= FETCH AVAILABILITY STATUSES =============
  const fetchAvailabilityStatuses = useCallback(async () => {
    try {
      const token = sessionStorage.getItem("token");
      const res = await fetch(`http://localhost:5000/api/volunteers/availability-statuses`, {
        headers: { 
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json"
        },
      });
      
      if (res.ok) {
        const data = await res.json();
        setAvailabilityStatuses(data.data || []);
      } else {
        // Fallback
        setAvailabilityStatuses([
          { status_id: 1, status_name: 'available' },
          { status_id: 2, status_name: 'unavailable' }
        ]);
      }
    } catch (err) {
      console.error("Failed to fetch availability statuses:", err);
      // Fallback
      setAvailabilityStatuses([
        { status_id: 1, status_name: 'available' },
        { status_id: 2, status_name: 'unavailable' }
      ]);
    }
  }, []);

  // ============= DATA FETCHING =============
  const fetchVolunteerBadges = useCallback(async () => {
    if (!userId) return;
    try {
      const token = sessionStorage.getItem("token");
      const res = await fetch(`http://localhost:5000/api/volunteers/${userId}/badges`, {
        headers: { 
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json"
        },
      });
      
      if (res.ok) {
        const data = await res.json();
        setBadges(data.badges || []);
      }
    } catch (err) {
      console.error("Failed to fetch badges:", err);
    }
  }, [userId]);

  const fetchVolunteerTasks = useCallback(async (userId: number) => {
    try {
      const token = sessionStorage.getItem("token");
      const res = await fetch(`http://localhost:5000/api/tasks/volunteer/${userId}`, {
        headers: { 
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json"
        },
      });
      
      if (res.ok) {
        const data = await res.json();
        setProfileUser(prev => {
          if (!prev || !prev.volunteer) return prev;
          return {
            ...prev,
            volunteer: {
              ...prev.volunteer,
              total_tasks: data.tasks?.length || 0
            }
          };
        });
      }
    } catch (err) {
      console.error("Failed to fetch volunteer tasks:", err);
    }
  }, []);

  const fetchUserReports = useCallback(async () => {
    try {
      const token = sessionStorage.getItem("token");
      const res = await fetch(`http://localhost:5000/api/reports/my-reports`, {
        headers: { 
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json"
        },
      });
      
      if (res.ok) {
        const data = await res.json();
        setRecentReports(data.data || []);
      }
    } catch (err) {
      console.error("Failed to fetch user reports:", err);
    }
  }, []);

  const fetchAllReports = useCallback(async () => {
    try {
      const token = sessionStorage.getItem("token");
      const res = await fetch(`http://localhost:5000/api/reports/admin/all`, {
        headers: { 
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json"
        },
      });
      
      if (res.ok) {
        const data = await res.json();
        setRecentReports(data.data?.slice(0, 4) || []);
        
        setAdminStats(prev => ({
          ...prev,
          total_reports: data.count || 0,
          resolved_reports: data.data?.filter((r: any) => 
            r.status_name?.toLowerCase().includes('resolved') || 
            r.status_name?.toLowerCase().includes('completed') ||
            r.status_id === 4
          ).length || 0,
          reports_this_month: prev.reports_this_month || 0,
          total_volunteers: prev.total_volunteers || 0
        }));
      }
    } catch (err) {
      console.error("Failed to fetch reports:", err);
    }
  }, []);

  const fetchAdminStats = useCallback(async () => {
    try {
      const token = sessionStorage.getItem("token");
      const res = await fetch(`http://localhost:5000/api/reports/admin/statistics`, {
        headers: { 
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json"
        },
      });
      
      if (res.ok) {
        const data = await res.json();
        setAdminStats(prev => ({
          total_reports: data.data?.total || prev.total_reports,
          reports_this_month: data.data?.recent_week || prev.reports_this_month,
          total_volunteers: prev.total_volunteers,
          resolved_reports: prev.resolved_reports,
          by_status: data.data?.by_status || prev.by_status,
          by_type: data.data?.by_type || prev.by_type
        }));
      }
    } catch (err) {
      console.error("Failed to fetch admin stats:", err);
    }
  }, []);

  const fetchAdminVolunteerCount = useCallback(async () => {
    try {
      const token = sessionStorage.getItem("token");
      const res = await fetch(`http://localhost:5000/api/users`, {
        headers: { 
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json"
        },
      });
      
      if (res.ok) {
        const data = await res.json();
        const volunteerCount = data.filter((u: any) => u.role_name === 'volunteer').length;
        setAdminStats(prev => ({
          ...prev,
          total_volunteers: volunteerCount
        }));
      }
    } catch (err) {
      console.error("Failed to fetch volunteer count:", err);
      setAdminStats(prev => ({
        ...prev,
        total_volunteers: 0
      }));
    }
  }, []);

  const fetchAdminReportsCount = useCallback(async () => {
    try {
      const token = sessionStorage.getItem("token");
      const res = await fetch(`http://localhost:5000/api/reports/admin/all`, {
        headers: { 
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json"
        },
      });
      
      if (res.ok) {
        const data = await res.json();
        setAdminStats(prev => ({
          ...prev,
          total_reports: data.count || 0
        }));
      }
    } catch (err) {
      console.error("Failed to fetch reports count:", err);
    }
  }, []);

  const fetchUserData = useCallback(async (force = false) => {
    if (!userId) return;
    
    setLoading(true);
    setError(null);
    try {
      const token = sessionStorage.getItem("token");
      if (!token) throw new Error("No authentication token found");

      const url = `http://localhost:5000/api/users/${userId}${force ? `?t=${Date.now()}` : ''}`;
      const res = await fetch(url, {
        headers: { 
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        cache: 'no-store'
      });

      if (!res.ok) throw new Error(`Failed to fetch user (${res.status})`);

      const data = await res.json();
      
      setProfileUser(data);
      setFormData({
        username: data.username || "",
        email: data.email || "",
        phone: data.phone || "",
        bio: data.bio || "",
      });

      // Set equipment data for volunteers
      if (data.role_name === 'volunteer' && data.volunteer) {
        setEquipmentData({
          has_car: data.volunteer.has_car || false,
          can_foster: data.volunteer.can_foster || false,
          animal_handling: data.volunteer.animal_handling || "dogs",
          city: data.volunteer.city || "",
          availability_status_id: data.volunteer.availability_status_id || 1,
        });
      }

      // Fetch role-specific data
      if (data.role_name === 'volunteer') {
        fetchVolunteerBadges();
        fetchVolunteerTasks(data.user_id);
        fetchAvailabilityStatuses();
      } else if (data.role_name === 'admin') {
        fetchAdminStats();
        fetchAllReports();
        fetchAdminVolunteerCount();
        fetchAdminReportsCount();
      } else if (data.role_name === 'user' && currentUser?.user_id === data.user_id) {
        fetchUserReports();
      }

    } catch (err: any) {
      console.error("Fetch user error:", err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, [userId, currentUser, fetchVolunteerBadges, fetchVolunteerTasks, fetchUserReports, fetchAllReports, fetchAdminStats, fetchAdminVolunteerCount, fetchAdminReportsCount, fetchAvailabilityStatuses]);

  useEffect(() => {
    if (!userId) return;
    fetchUserData();
  }, [userId, fetchUserData]);

  // ============= IMAGE HANDLERS =============
  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file || !profileUser) return;

    try {
      setUploadingImage(true);
      const token = sessionStorage.getItem("token");
      if (!token) throw new Error("No authentication token");

      const uploadFormData = new FormData();
      uploadFormData.append('profile_image', file);

      const res = await fetch(
        `http://localhost:5000/api/users/${profileUser.user_id}/profile-image`, 
        {
          method: "POST",
          headers: { Authorization: `Bearer ${token}` },
          body: uploadFormData,
        }
      );

      if (!res.ok) throw new Error(`Failed to upload image`);

      const result = await res.json();
      setImgKey(Date.now());
      
      if (result.profile_image_url) {
        setProfileUser(prev => prev ? { ...prev, profile_image_url: result.profile_image_url } : null);
        setTimeout(() => fetchUserData(true), 500);
      }
      
    } catch (err: any) {
      console.error("Image upload error:", err);
      toast.success("Failed to upload image: " + err.message);
    } finally {
      setUploadingImage(false);
      if (fileInputRef.current) fileInputRef.current.value = '';
    }
  };

  const handleRemoveImage = async () => {
    if (!profileUser) return;
    if (!window.confirm("Remove profile image?")) return;

    try {
      setUploadingImage(true);
      const token = sessionStorage.getItem("token");
      if (!token) throw new Error("No authentication token");

      const res = await fetch(
        `http://localhost:5000/api/users/${profileUser.user_id}/profile-image`, 
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json"
          },
        }
      );

      if (!res.ok) throw new Error(`Failed to remove image`);

      setImgKey(Date.now());
      setProfileUser(prev => prev ? { ...prev, profile_image_url: null } : null);
      setTimeout(() => fetchUserData(true), 500);
    } catch (err: any) {
      console.error("❌ Image removal error:", err);
      toast.success("Failed to remove image: " + err.message);
    } finally {
      setUploadingImage(false);
    }
  };

  // ============= PROFILE EDIT HANDLERS =============
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleEquipmentChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    if (type === 'checkbox') {
      const checked = (e.target as HTMLInputElement).checked;
      setEquipmentData({ ...equipmentData, [name]: checked });
    } else {
      setEquipmentData({ ...equipmentData, [name]: value });
    }
  };

  const handleSaveProfile = async () => {
    if (!profileUser) return;
    if (!formData.username.trim() || !formData.email.trim()) {
      toast.success("Username and email are required");
      return;
    }

    try {
      setSaving(true);
      const token = sessionStorage.getItem("token");
      if (!token) throw new Error("No authentication token");

      const res = await fetch(
        `http://localhost:5000/api/users/${profileUser.user_id}`, 
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            username: formData.username,
            email: formData.email,
            phone: formData.phone,
            bio: formData.bio,
          }),
        }
      );

      if (!res.ok) throw new Error(`Failed to update profile`);

      await fetchUserData(true);
      setEditing(false);
      toast.success("Profile updated successfully!");
    } catch (err: any) {
      console.error("Update error:", err);
      toast.success("Failed to update profile: " + err.message);
    } finally {
      setSaving(false);
    }
  };

  // ============= VOLUNTEER EQUIPMENT UPDATE =============
  const handleSaveEquipment = async () => {
    if (!profileUser) return;

    try {
      setSaving(true);
      const token = sessionStorage.getItem("token");
      if (!token) throw new Error("No authentication token");

      console.log("Sending equipment update to:", `http://localhost:5000/api/users/${profileUser.user_id}/volunteer-profile`);
      console.log("Equipment data:", {
        has_car: equipmentData.has_car,
        can_foster: equipmentData.can_foster,
        animal_handling: equipmentData.animal_handling,
        city: equipmentData.city,
        availability_status_id: equipmentData.availability_status_id
      });

      const res = await fetch(
        `http://localhost:5000/api/users/${profileUser.user_id}/volunteer-profile`, 
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            has_car: equipmentData.has_car,
            can_foster: equipmentData.can_foster,
            animal_handling: equipmentData.animal_handling,
            city: equipmentData.city,
            availability_status_id: equipmentData.availability_status_id,
          }),
        }
      );

      const responseData = await res.json();

      if (!res.ok) {
        console.error("Server responded with error:", responseData);
        throw new Error(responseData.message || 'Failed to update volunteer equipment & skills');
      }

      console.log("Equipment update successful:", responseData);
      
      await fetchUserData(true);
      setEditingEquipment(false);
      toast.success("Equipment & Skills updated successfully!");
    } catch (err: any) {
      console.error("Update equipment error:", err);
      toast.success("Failed to update equipment: " + err.message);
    } finally {
      setSaving(false);
    }
  };

  const handleCancel = () => {
    if (profileUser) {
      setFormData({
        username: profileUser.username,
        email: profileUser.email,
        phone: profileUser.phone,
        bio: profileUser.bio || "",
      });
    }
    setEditing(false);
  };

  const handleCancelEquipment = () => {
    if (profileUser?.volunteer) {
      setEquipmentData({
        has_car: profileUser.volunteer.has_car || false,
        can_foster: profileUser.volunteer.can_foster || false,
        animal_handling: profileUser.volunteer.animal_handling || "dogs",
        city: profileUser.volunteer.city || "",
        availability_status_id: profileUser.volunteer.availability_status_id || 1,
      });
    }
    setEditingEquipment(false);
  };

  // ============= HELPER FUNCTIONS =============
  const getStatusText = (statusId?: number) => {
    switch (statusId) {
      case 1: return 'Pending';
      case 2: return 'Approved';
      case 3: return 'Rejected';
      default: return 'Unknown';
    }
  };

  const getAnimalHandlingText = (value?: string) => {
    const map: Record<string, string> = {
      'all': 'All animals',
      'dogs': 'Dogs',
      'cats': 'Cats',
      'horses': 'Horses',
      'both': 'Dogs & cats',
      'small': 'Small animals',
      'birds': 'Birds',
    };
    return map[value || ''] || value || 'Not specified';
  };

  const getAvailabilityStatusText = (statusId?: number) => {
    const status = availabilityStatuses.find(s => s.status_id === statusId);
    return status?.status_name || (statusId === 1 ? 'available' : statusId === 2 ? 'unavailable' : 'available');
  };

  const getAvailabilityStatusClass = (statusId?: number) => {
    const status = getAvailabilityStatusText(statusId).toLowerCase();
    if (status.includes('available')) return 'available';
    if (status.includes('unavailable')) return 'unavailable';
    return 'available';
  };

  const getReportIcon = (animalType: string) => {
    const type = animalType?.toLowerCase() || '';
    if (type.includes('dog')) return '🐕';
    if (type.includes('cat')) return '🐈';
    if (type.includes('bird')) return '🕊️';
    if (type.includes('fox')) return '🦊';
    if (type.includes('deer')) return '🦌';
    if (type.includes('rabbit')) return '🐇';
    if (type.includes('squirrel')) return '🐿️';
    if (type.includes('raccoon')) return '🦝';
    if (type.includes('owl')) return '🦉';
    if (type.includes('eagle')) return '🦅';
    if (type.includes('turtle')) return '🐢';
    return '🐾';
  };

  const getPriorityFromStatus = (statusName: string) => {
    const name = statusName?.toLowerCase() || '';
    if (name.includes('critical')) return 'critical';
    if (name.includes('urgent') || name.includes('high')) return 'high';
    if (name.includes('medium')) return 'medium';
    return 'low';
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'critical': return '#dc4a4a';
      case 'high': return '#b85a1a';
      case 'medium': return '#f4b942';
      case 'low': return '#2c5e4a';
      default: return '#5f7970';
    }
  };

  const getStatusBadge = (statusName: string) => {
    const name = statusName?.toLowerCase() || '';
    if (name.includes('resolved') || name.includes('completed')) 
      return { text: 'Resolved', class: 'status-resolved' };
    if (name.includes('progress') || name.includes('assigned')) 
      return { text: 'In Progress', class: 'status-progress' };
    if (name.includes('pending') || name.includes('submitted')) 
      return { text: 'Pending', class: 'status-pending' };
    return { text: statusName || 'Unknown', class: '' };
  };

  const unlockedBadges = badges.filter(b => b.status === 'unlocked');
  const lockedBadges = badges.filter(b => b.status === 'locked');
  
  const joinDate = profileUser?.created_at
    ? new Date(profileUser.created_at).toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
        year: "numeric",
      })
    : "Unknown";

  const volunteerSince = profileUser?.volunteer?.volunteer_since
    ? new Date(profileUser.volunteer.volunteer_since).toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
        year: "numeric",
      })
    : null;

  const canEdit = currentUser && (
    currentUser.user_id === profileUser?.user_id || 
    currentUser.role_name === 'admin'
  );

  const isVolunteer = profileUser?.role_name === 'volunteer';
  const isAdmin = profileUser?.role_name === 'admin';
  const imageUrl = getImageUrl(profileUser?.profile_image_url);
  const statusText = getStatusText(profileUser?.volunteer?.approval_status_id);

  // ============= LOADING STATES =============
  if (loading) {
    return (
      <div className="profile-loading">
        <div className="loading-spinner"></div>
        <p>Loading profile...</p>
      </div>
    );
  }

  if (error || !profileUser) {
    return (
      <div className="profile-error">
        <div className="error-icon">⚠️</div>
        <h3>Profile Not Found</h3>
        <p>{error || 'The requested profile could not be loaded.'}</p>
        <button onClick={() => navigate('/dashboard')} className="btn-primary">
          Back to Dashboard
        </button>
      </div>
    );
  }

  return (
    <div className="profile">
      <div className="profile-header">
        <div>
          <h1>Profile</h1>
          <p>@{profileUser.username}</p>
        </div>
        {canEdit && !editing && !editingEquipment && (
          <button className="btn-edit" onClick={() => setEditing(true)}>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M12 20h9M16.5 3.5L20 7l-9 9H7v-4l9-9z"/>
            </svg>
            Edit Profile
          </button>
        )}
      </div>

      <div className="profile-grid">
        {/* ============ LEFT COLUMN - PROFILE CARD ============ */}
        <div className="profile-card">
          <div className="profile-avatar-section">
            <div className="profile-avatar-wrapper">
              <div className={`profile-avatar ${uploadingImage ? 'uploading' : ''}`}>
                {uploadingImage ? (
                  <div className="avatar-uploading">
                    <div className="spinner"></div>
                  </div>
                ) : imageUrl ? (
                  <img 
                    key={`avatar-${imgKey}`}
                    src={imageUrl} 
                    alt={profileUser.username}
                  />
                ) : (
                  <div className="avatar-fallback">
                    {profileUser.username?.charAt(0)?.toUpperCase() || 'U'}
                  </div>
                )}
              </div>
              
              {canEdit && !editing && !editingEquipment && (
                <div className="avatar-edit-buttons">
                  <input
                    ref={fileInputRef}
                    type="file"
                    accept="image/*"
                    onChange={handleImageUpload}
                    disabled={uploadingImage}
                    id="avatar-upload"
                    hidden
                  />
                  <button 
                    className="avatar-btn change"
                    onClick={() => fileInputRef.current?.click()}
                    disabled={uploadingImage}
                  >
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z"/>
                      <circle cx="12" cy="13" r="4"/>
                    </svg>
                    Change
                  </button>
                  {imageUrl && (
                    <button 
                      className="avatar-btn remove"
                      onClick={handleRemoveImage}
                      disabled={uploadingImage}
                    >
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M3 6h18M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/>
                      </svg>
                      Remove
                    </button>
                  )}
                </div>
              )}
            </div>
          </div>

          <div className="profile-info">
            {editing ? (
              <div className="edit-field">
                <label>Username</label>
                <input
                  type="text"
                  name="username"
                  value={formData.username}
                  onChange={handleChange}
                  placeholder="Username"
                />
              </div>
            ) : (
              <h2>{profileUser.username}</h2>
            )}
            
            <div className={`profile-role ${profileUser.role_name || 'user'}`}>
              {profileUser.role_name === 'admin' ? '👑' : 
               profileUser.role_name === 'volunteer' ? '🦊' : '🌿'}
              <span>{profileUser.role_name?.toUpperCase() || 'MEMBER'}</span>
              {isVolunteer && statusText && (
                <span className={`role-status status-${statusText.toLowerCase()}`}>
                  • {statusText}
                </span>
              )}
            </div>
            
            {editing ? (
              <div className="edit-field">
                <label>Bio</label>
                <textarea
                  name="bio"
                  value={formData.bio}
                  onChange={handleChange}
                  placeholder="Tell us about yourself..."
                  rows={3}
                  maxLength={120}
                />
                <div className="field-hint">{formData.bio.length}/120</div>
              </div>
            ) : (
              profileUser.bio && (
                <div className="profile-bio">
                  <span className="bio-quote">"</span>
                  {profileUser.bio}
                  <span className="bio-quote">"</span>
                </div>
              )
            )}

            <div className="profile-meta">
              <div className="meta-group">
                <div className="meta-item">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
                    <polyline points="22,6 12,13 2,6"/>
                  </svg>
                  {editing ? (
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="Email address"
                    />
                  ) : (
                    <span>{profileUser.email}</span>
                  )}
                </div>

                <div className="meta-item">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <rect x="5" y="2" width="14" height="20" rx="2" ry="2"/>
                    <line x1="12" y1="18" x2="12" y2="18"/>
                  </svg>
                  {editing ? (
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      placeholder="Phone number"
                    />
                  ) : (
                    <span>{profileUser.phone || 'Not provided'}</span>
                  )}
                </div>

                <div className="meta-item">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <rect x="3" y="4" width="18" height="18" rx="2" ry="2"/>
                    <line x1="16" y1="2" x2="16" y2="6"/>
                    <line x1="8" y1="2" x2="8" y2="6"/>
                    <line x1="3" y1="10" x2="21" y2="10"/>
                  </svg>
                  <span>Joined {joinDate}</span>
                </div>

                {volunteerSince && (
                  <div className="meta-item">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/>
                      <circle cx="12" cy="7" r="4"/>
                    </svg>
                    <span>Ranger since {volunteerSince}</span>
                  </div>
                )}
              </div>
            </div>

            <div className="profile-id">
              <span className="id-label">RANGER ID</span>
              <span className="id-value">SRMS-{profileUser.user_id.toString().padStart(6, '0')}</span>
            </div>

            {canEdit && editing && (
              <div className="profile-actions">
                <button className="btn-secondary" onClick={handleCancel} disabled={saving}>
                  Cancel
                </button>
                <button className="btn-primary" onClick={handleSaveProfile} disabled={saving}>
                  {saving ? 'Saving...' : 'Save Changes'}
                </button>
              </div>
            )}
          </div>
        </div>

        {/* ============ RIGHT COLUMN - ROLE SPECIFIC CONTENT ============ */}
        <div className="profile-sidebar">
          
          {/* ---------- STATS CARD (ALL ROLES) ---------- */}
          <div className="stats-card">
            <div className="stats-header">
              <h3>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M21 12v-2a5 5 0 0 0-5-2H8a5 5 0 0 0-5 2v2"/>
                  <rect x="3" y="12" width="18" height="8" rx="2"/>
                </svg>
                Statistics
              </h3>
              <span className="stats-badge">
                {isAdmin ? 'ADMIN' : isVolunteer ? 'VOLUNTEER' : 'MEMBER'}
              </span>
            </div>
            
            {isVolunteer ? (
              <div className="stats-grid">
                <div className="stat-item">
                  <div className="stat-value">{profileUser.volunteer?.total_tasks || 0}</div>
                  <div className="stat-label">Missions</div>
                  <div className="stat-trend">Completed</div>
                </div>
                <div className="stat-item">
                  <div className="stat-value">{unlockedBadges.length}</div>
                  <div className="stat-label">Badges</div>
                  <div className="stat-trend">{lockedBadges.length} locked</div>
                </div>
              </div>
            ) : isAdmin ? (
              <div className="admin-stats">
                <div className="admin-stats-grid">
                  <div className="admin-stat-item">
                    <div className="admin-stat-value">{adminStats.total_reports}</div>
                    <div className="admin-stat-label">Total Reports</div>
                  </div>
                  <div className="admin-stat-item">
                    <div className="admin-stat-value">{adminStats.reports_this_month}</div>
                    <div className="admin-stat-label">This Month</div>
                  </div>
                  <div className="admin-stat-item">
                    <div className="admin-stat-value">{adminStats.total_volunteers}</div>
                    <div className="admin-stat-label">Volunteers</div>
                  </div>
                  <div className="admin-stat-item">
                    <div className="admin-stat-value">{adminStats.resolved_reports}</div>
                    <div className="admin-stat-label">Resolved</div>
                  </div>
                </div>
                <div className="admin-role-info">
                  <span className="admin-icon">👑</span>
                  <div className="admin-role-text">
                    <h4>Administrator</h4>
                    <p>Managing wildlife rescue operations</p>
                  </div>
                </div>
              </div>
            ) : (
              <div className="user-stats">
                <div className="user-stat-main">
                  <div className="user-stat-icon">📋</div>
                  <div className="user-stat-info">
                    <div className="user-stat-value">{recentReports.length}</div>
                    <div className="user-stat-label">Reports Submitted</div>
                  </div>
                </div>
                <div className="user-role-info">
                  <span className="user-icon">🌿</span>
                  <div className="user-role-text">
                    <h4>Community Member</h4>
                    <p>Supporting wildlife rescue since {joinDate}</p>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* ---------- VOLUNTEER EQUIPMENT (VOLUNTEER ONLY) - WITH AVAILABILITY STATUS ---------- */}
          {isVolunteer && (
            <div className="equipment-card">
              <div className="equipment-header">
                <h3>
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z"/>
                  </svg>
                  Equipment & Skills
                </h3>
                {canEdit && !editing && !editingEquipment && (
                  <button 
                    className="btn-edit-small"
                    onClick={() => setEditingEquipment(true)}
                  >
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M12 20h9M16.5 3.5L20 7l-9 9H7v-4l9-9z"/>
                    </svg>
                    Edit
                  </button>
                )}
              </div>

              {editingEquipment ? (
                <div className="equipment-edit-form">
                  <div className="equipment-edit-field">
                    <label className="checkbox-label">
                      <input
                        type="checkbox"
                        name="has_car"
                        checked={equipmentData.has_car}
                        onChange={handleEquipmentChange}
                      />
                      <span>I have a car available for transport</span>
                    </label>
                  </div>

                  <div className="equipment-edit-field">
                    <label className="checkbox-label">
                      <input
                        type="checkbox"
                        name="can_foster"
                        checked={equipmentData.can_foster}
                        onChange={handleEquipmentChange}
                      />
                      <span>I can foster animals</span>
                    </label>
                  </div>

                  <div className="equipment-edit-field">
                    <label htmlFor="animal_handling">Animal handling experience:</label>
                    <select
                      id="animal_handling"
                      name="animal_handling"
                      value={equipmentData.animal_handling}
                      onChange={handleEquipmentChange}
                      className="equipment-select"
                    >
                      <option value="dogs">Dogs</option>
                      <option value="cats">Cats</option>
                      <option value="both">Dogs & cats</option>
                      <option value="small">Small animals</option>
                      <option value="birds">Birds</option>
                      <option value="horses">Horses</option>
                      <option value="all">All animals</option>
                    </select>
                  </div>

                  <div className="equipment-edit-field">
                    <label htmlFor="city">Base city/location:</label>
                    <input
                      type="text"
                      id="city"
                      name="city"
                      value={equipmentData.city}
                      onChange={handleEquipmentChange}
                      placeholder="e.g., Kathmandu"
                      className="equipment-input"
                    />
                  </div>

                  {/* AVAILABILITY STATUS DROPDOWN - FROM BACKEND */}
                  <div className="equipment-edit-field">
                    <label htmlFor="availability_status_id">
                      <span className="status-icon">🟢</span> Availability Status:
                    </label>
                    <select
                      id="availability_status_id"
                      name="availability_status_id"
                      value={equipmentData.availability_status_id || 1}
                      onChange={handleEquipmentChange}
                      className="equipment-select"
                    >
                      {availabilityStatuses.map(status => (
                        <option key={status.status_id} value={status.status_id}>
                          {status.status_name === 'available' ? 'Available' : 
                           status.status_name === 'unavailable' ? 'Unavailable' : 
                           status.status_name}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div className="equipment-edit-actions">
                    <button 
                      className="btn-secondary small"
                      onClick={handleCancelEquipment}
                      disabled={saving}
                    >
                      Cancel
                    </button>
                    <button 
                      className="btn-primary small"
                      onClick={handleSaveEquipment}
                      disabled={saving}
                    >
                      {saving ? 'Saving...' : 'Save Changes'}
                    </button>
                  </div>
                </div>
              ) : (
                <div className="equipment-grid">
                  <div className="equipment-item">
                    <span className="equipment-icon">🚗</span>
                    <div className="equipment-info">
                      <span className="equipment-label">Transport</span>
                      <span className={`equipment-badge ${profileUser.volunteer?.has_car ? 'yes' : 'no'}`}>
                        {profileUser.volunteer?.has_car ? 'Available' : 'Not available'}
                      </span>
                    </div>
                  </div>
                  <div className="equipment-item">
                    <span className="equipment-icon">🏠</span>
                    <div className="equipment-info">
                      <span className="equipment-label">Fostering</span>
                      <span className={`equipment-badge ${profileUser.volunteer?.can_foster ? 'yes' : 'no'}`}>
                        {profileUser.volunteer?.can_foster ? 'Available' : 'Not available'}
                      </span>
                    </div>
                  </div>
                  <div className="equipment-item">
                    <span className="equipment-icon">🐾</span>
                    <div className="equipment-info">
                      <span className="equipment-label">Handles</span>
                      <span className="equipment-value">
                        {getAnimalHandlingText(profileUser.volunteer?.animal_handling)}
                      </span>
                    </div>
                  </div>
                  <div className="equipment-item">
                    <span className="equipment-icon">📍</span>
                    <div className="equipment-info">
                      <span className="equipment-label">Base</span>
                      <span className="equipment-value">
                        {profileUser.volunteer?.city || 'Any location'}
                      </span>
                    </div>
                  </div>
                  
                  {/* AVAILABILITY STATUS DISPLAY */}
                  <div className="equipment-item">
                    <span className="equipment-icon">🟢</span>
                    <div className="equipment-info">
                      <span className="equipment-label">Availability Status</span>
                      <span className={`equipment-badge ${getAvailabilityStatusClass(profileUser.volunteer?.availability_status_id)}`}>
                        {getAvailabilityStatusText(profileUser.volunteer?.availability_status_id)}
                      </span>
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* ---------- VOLUNTEER BADGES (VOLUNTEER ONLY) ---------- */}
          {isVolunteer && (
            <div className="badges-card">
              <h3>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <circle cx="12" cy="8" r="7"/>
                  <polyline points="8.21 13.89 7 23 12 20 17 23 15.79 13.88"/>
                </svg>
                Badges & Achievements
              </h3>
              
              {unlockedBadges.length > 0 ? (
                <div className="badges-grid">
                  {unlockedBadges.map(badge => (
                    <div key={badge.badge_id} className="badge-card">
                      <div className="badge-icon-wrapper">
                        <span className="badge-icon">🏆</span>
                      </div>
                      <div className="badge-info">
                        <span className="badge-name">{badge.badge_name}</span>
                        {badge.awarded_at && (
                          <span className="badge-date">
                            {new Date(badge.awarded_at).toLocaleDateString()}
                          </span>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="badges-empty">
                  <div className="empty-icon">🏅</div>
                  <p>No badges yet</p>
                  <span>Complete missions to earn achievements</span>
                </div>
              )}
            </div>
          )}

          {/* ---------- RECENT REPORTS (REGULAR USERS AND ADMINS ONLY - NOT VOLUNTEERS) ---------- */}
          {!isVolunteer && (
            <div className="reports-card">
              <div className="reports-header">
                <h3>
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8l-6-6z"/>
                    <path d="M14 2v6h6M16 13H8M16 17H8M10 9H8"/>
                  </svg>
                  Recent Reports
                </h3>
                {recentReports.length > 0 && (
                  <span className="reports-count">{recentReports.length} total</span>
                )}
              </div>
              
              <div className="reports-list">
                {recentReports.length > 0 ? (
                  recentReports.slice(0, 3).map((report) => {
                    const status = getStatusBadge(report.status_name);
                    const priority = getPriorityFromStatus(report.status_name);
                    return (
                      <div key={report.report_id} className="report-item">
                        <div className="report-icon">
                          {getReportIcon(report.animal_type)}
                        </div>
                        <div className="report-content">
                          <div className="report-title">
                            <span className="animal-type">{report.animal_type || 'Unknown'}</span>
                            <span 
                              className="report-priority" 
                              style={{ 
                                backgroundColor: getPriorityColor(priority) + '20', 
                                color: getPriorityColor(priority) 
                              }}
                            >
                              {report.animal_condition || 'Injured'}
                            </span>
                          </div>
                          <div className="report-location">
                            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                              <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/>
                              <circle cx="12" cy="10" r="3"/>
                            </svg>
                            {report.location_address?.split(',')[0] || 'Unknown location'}
                          </div>
                          <div className="report-meta">
                            <span className={`report-status ${status.class}`}>
                              {status.text}
                            </span>
                            <span className="report-date">
                              {new Date(report.submitted_at).toLocaleDateString('en-US', { 
                                month: 'short', 
                                day: 'numeric' 
                              })}
                            </span>
                          </div>
                          {isAdmin && report.reporter_name && (
                            <div className="report-reporter">
                              Reported by: <strong>{report.reporter_name}</strong>
                            </div>
                          )}
                        </div>
                      </div>
                    );
                  })
                ) : (
                  <div className="reports-empty">
                    <div className="empty-icon">📋</div>
                    <p>No reports yet</p>
                    <span>{isAdmin ? 'Reports submitted will appear here' : 'Reports you submit will appear here'}</span>
                  </div>
                )}
                
                {recentReports.length > 0 && (
                  <button 
                    className="view-all-btn"
                    onClick={() => navigate(isAdmin ? '/admin/reports' : '/reports')}
                  >
                    View all reports
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M5 12h14M12 5l7 7-7 7"/>
                    </svg>
                  </button>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};


