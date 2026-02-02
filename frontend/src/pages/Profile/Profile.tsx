// import React, { useEffect, useState } from "react";
// import { useParams, useNavigate } from "react-router-dom";
// import Icon from "../../components/Icon";
// import { useAuth } from "../../context/AuthContext";
// import "./Profile.css";

// interface ProfileUser {
//   user_id: number;
//   username: string;
//   email: string;
//   phone: string;
//   profile_image_url?: string | null;
//   role_name?: "admin" | "volunteer" | "user";
//   created_at: string;
//   volunteer?: {
//     status?: string;
//     badges?: string[];
//     volunteer_since?: string;
//   };
// }

// export const Profile: React.FC = () => {
//   const { userId: paramUserId } = useParams<{ userId: string }>();
//   const { user: currentUser } = useAuth();
//   const navigate = useNavigate();

//   const [profileUser, setProfileUser] = useState<ProfileUser | null>(null);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState<string | null>(null);
//   const [editing, setEditing] = useState(false);
//   const [formData, setFormData] = useState({
//     username: "",
//     email: "",
//     phone: "",
//   });
//   const [saving, setSaving] = useState(false);

//   const userId = paramUserId || currentUser?.user_id?.toString();

//   useEffect(() => {
//     if (!userId) return;

//     const fetchUser = async () => {
//       setLoading(true);
//       setError(null);
//       try {
//         const token = localStorage.getItem("token");
//         if (!token) throw new Error("No authentication token found");

//         const res = await fetch(`http://localhost:5000/api/users/${userId}`, {
//           headers: { 
//             Authorization: `Bearer ${token}`,
//             "Content-Type": "application/json"
//           },
//         });

//         if (!res.ok) {
//           throw new Error(`Failed to fetch user (${res.status})`);
//         }

//         const data = await res.json();

//         setProfileUser(data);
//         setFormData({
//           username: data.username || "",
//           email: data.email || "",
//           phone: data.phone || "",
//         });
//       } catch (err: any) {
//         console.error("Fetch user error:", err);
//         setError(err.message);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchUser();
//   }, [userId]);

//   const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     setFormData({ ...formData, [e.target.name]: e.target.value });
//   };

//   const handleSave = async () => {
//     if (!profileUser) return;

//     try {
//       setSaving(true);
//       const token = localStorage.getItem("token");
//       if (!token) throw new Error("No authentication token");

//       const res = await fetch(`http://localhost:5000/api/users/${profileUser.user_id}`, {
//         method: "PATCH",
//         headers: {
//           "Content-Type": "application/json",
//           Authorization: `Bearer ${token}`,
//         },
//         body: JSON.stringify(formData),
//       });

//       if (!res.ok) {
//         throw new Error(`Failed to update profile (${res.status})`);
//       }

//       const result = await res.json();

//       setProfileUser(prev => prev ? { ...prev, ...formData } : null);
//       setEditing(false);
//       alert("Profile updated successfully!");
//     } catch (err: any) {
//       console.error("Update error:", err);
//       alert("Failed to update profile: " + err.message);
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
//       });
//     }
//     setEditing(false);
//   };

//   if (loading) {
//     return (
//       <div className="profile-loading">
//         <Icon type="fa" name="FaSpinner" className="spinner" size={32} />
//         <p>Loading profile...</p>
//       </div>
//     );
//   }

//   if (error) {
//     return (
//       <div className="profile-error">
//         <h3>Error Loading Profile</h3>
//         <p>{error}</p>
//         <div className="error-actions">
//           <button onClick={() => window.location.reload()}>Retry</button>
//           <button onClick={() => navigate("/dashboard")}>Dashboard</button>
//         </div>
//       </div>
//     );
//   }

//   if (!profileUser) {
//     return (
//       <div className="profile-not-found">
//         <h3>Profile Not Found</h3>
//         <p>The requested profile could not be loaded.</p>
//         <button onClick={() => navigate(-1)}>Go Back</button>
//       </div>
//     );
//   }

//   const joinDate = profileUser.created_at
//     ? new Date(profileUser.created_at).toLocaleDateString("en-US", {
//         year: "numeric",
//         month: "long",
//         day: "numeric",
//       })
//     : "Unknown";

//   const canEdit = currentUser && (
//     currentUser.user_id === profileUser.user_id || 
//     (currentUser.role && (
//       (typeof currentUser.role === 'object' && currentUser.role.role_name === 'admin') ||
//       (typeof currentUser.role === 'string' && currentUser.role === 'admin')
//     ))
//   );

//   return (
//     <div className="profile-container">
//       <div className="profile-header">
//         <button onClick={() => navigate(-1)} className="back-button">
//           <Icon type="feather" name="FiArrowLeft" /> Back
//         </button>
//         <div className="header-content">
//           <h2>{profileUser.username}'s Profile</h2>
//           <p>Manage your account details and settings</p>
//         </div>
//       </div>

//       <div className="profile-grid">
//         <div className="profile-card">
//           <div className="profile-avatar">
//             {profileUser.profile_image_url ? (
//               <img
//                 src={profileUser.profile_image_url}
//                 alt="Avatar"
//                 className="avatar-img"
//                 onError={(e) => {
//                   e.currentTarget.style.display = "none";
//                   const parent = e.currentTarget.parentElement;
//                   if (parent) {
//                     const fallback = parent.querySelector('.avatar-fallback') as HTMLDivElement;
//                     if (fallback) fallback.style.display = 'flex';
//                   }
//                 }}
//               />
//             ) : null}
//             <div className="avatar-fallback">
//               {profileUser.username?.charAt(0)?.toUpperCase() || "U"}
//             </div>
//           </div>

//           {!editing ? (
//             <>
//               <div className="profile-info">
//                 <h3 className="profile-username">{profileUser.username}</h3>
//                 <p className={`role-badge ${profileUser.role_name || ""}`}>
//                   {profileUser.role_name?.toUpperCase() || "USER"}
//                   {profileUser.volunteer?.status ? ` • ${profileUser.volunteer.status.toUpperCase()}` : ""}
//                 </p>

//                 <div className="profile-details">
//                   <div className="detail-item">
//                     <Icon type="feather" name="FiMail" size={16} />
//                     <span>{profileUser.email || "Not provided"}</span>
//                   </div>
//                   <div className="detail-item">
//                     <Icon type="feather" name="FiPhone" size={16} />
//                     <span>{profileUser.phone || "Not provided"}</span>
//                   </div>
//                   <div className="detail-item">
//                     <Icon type="feather" name="FiCalendar" size={16} />
//                     <span>Joined {joinDate}</span>
//                   </div>
//                 </div>

//                 {canEdit && (
//                   <button 
//                     onClick={() => setEditing(true)} 
//                     className="btn-edit"
//                   >
//                     <Icon type="feather" name="FiEdit" /> Edit Profile
//                   </button>
//                 )}
//               </div>
//             </>
//           ) : (
//             <>
//               <div className="profile-form">
//                 <h3>Edit Profile</h3>
                
//                 <div className="form-group">
//                   <label htmlFor="username">
//                     <Icon type="feather" name="FiUser" size={14} /> Username *
//                   </label>
//                   <input
//                     id="username"
//                     type="text"
//                     name="username"
//                     value={formData.username}
//                     onChange={handleChange}
//                     placeholder="Enter username"
//                     required
//                   />
//                 </div>

//                 <div className="form-group">
//                   <label htmlFor="email">
//                     <Icon type="feather" name="FiMail" size={14} /> Email *
//                   </label>
//                   <input
//                     id="email"
//                     type="email"
//                     name="email"
//                     value={formData.email}
//                     onChange={handleChange}
//                     placeholder="Enter email"
//                     required
//                   />
//                 </div>

//                 <div className="form-group">
//                   <label htmlFor="phone">
//                     <Icon type="feather" name="FiPhone" size={14} /> Phone
//                   </label>
//                   <input
//                     id="phone"
//                     type="text"
//                     name="phone"
//                     value={formData.phone}
//                     onChange={handleChange}
//                     placeholder="Enter phone number"
//                   />
//                 </div>

//                 <div className="form-actions">
//                   <button 
//                     onClick={handleSave} 
//                     className="btn-save"
//                     disabled={saving}
//                   >
//                     <Icon type="feather" name="FiCheck" /> 
//                     {saving ? "Saving..." : "Save Changes"}
//                   </button>
//                   <button 
//                     onClick={handleCancel} 
//                     className="btn-cancel"
//                     disabled={saving}
//                   >
//                     <Icon type="feather" name="FiX" /> Cancel
//                   </button>
//                 </div>
//               </div>
//             </>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// };


import React, { useEffect, useState, useRef } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Icon from "../../components/Icon";
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
    status?: string;
    badges?: string[];
    volunteer_since?: string;
  };
}

export const Profile: React.FC = () => {
  const { userId: paramUserId } = useParams<{ userId: string }>();
  const { user: currentUser } = useAuth();
  const navigate = useNavigate();
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [profileUser, setProfileUser] = useState<ProfileUser | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [editing, setEditing] = useState(false);
  const [saving, setSaving] = useState(false);
  const [uploadingImage, setUploadingImage] = useState(false);
  const [showImageControls, setShowImageControls] = useState(false);
  const [imageVersion, setImageVersion] = useState(0); // Add this for cache busting

  const [formData, setFormData] = useState({
    username: "",
    email: "",
    phone: "",
    bio: "",
  });

  const userId = paramUserId || currentUser?.user_id?.toString();

  const getFullImageUrl = (url: string | null | undefined) => {
    if (!url) return null;
    // If it's already a full URL, return it
    if (url.startsWith('http')) return url;
    // If it's a relative path, prepend the backend URL
    if (url.startsWith('/')) {
      return `http://localhost:5000${url}${imageVersion ? `?v=${imageVersion}` : ''}`;
    }
    return url;
  };

  useEffect(() => {
    if (!userId) return;

    const fetchUser = async () => {
      setLoading(true);
      setError(null);
      try {
        const token = localStorage.getItem("token");
        if (!token) throw new Error("No authentication token found");

        const res = await fetch(`http://localhost:5000/api/users/${userId}`, {
          headers: { 
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json"
          },
        });

        if (!res.ok) {
          throw new Error(`Failed to fetch user (${res.status})`);
        }

        const data = await res.json();
        setProfileUser(data);
        setFormData({
          username: data.username || "",
          email: data.email || "",
          phone: data.phone || "",
          bio: data.bio || "",
        });
      } catch (err: any) {
        console.error("Fetch user error:", err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, [userId]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleAvatarClick = () => {
    if (canEdit && !editing && fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file || !profileUser) return;

    const validTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/gif', 'image/webp'];
    if (!validTypes.includes(file.type)) {
      alert('Please select a valid image file (JPEG, PNG, GIF, WEBP)');
      return;
    }

    if (file.size > 2 * 1024 * 1024) {
      alert('Image size should be less than 2MB');
      return;
    }

    try {
      setUploadingImage(true);
      const token = localStorage.getItem("token");
      if (!token) throw new Error("No authentication token");

      const uploadFormData = new FormData();
      uploadFormData.append('profile_image', file);

      const res = await fetch(`http://localhost:5000/api/users/${profileUser.user_id}/profile-image`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: uploadFormData,
      });

      if (!res.ok) {
        const errorData = await res.json().catch(() => ({}));
        throw new Error(`Failed to upload image: ${errorData.message || res.statusText}`);
      }

      const result = await res.json();
      console.log("Upload response:", result);
      
      // Force image reload by incrementing version
      setImageVersion(prev => prev + 1);
      
      // Update profileUser with the new image URL
      setProfileUser(prev => {
        if (!prev) return null;
        return {
          ...prev,
          profile_image_url: result.profile_image_url || result.image_url || result.url
        };
      });
      
      setShowImageControls(false);
      
      // Force a re-fetch of user data after a short delay
      setTimeout(() => {
        const refreshData = async () => {
          try {
            const token = localStorage.getItem("token");
            const res = await fetch(`http://localhost:5000/api/users/${userId}`, {
              headers: { 
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json"
              },
            });
            if (res.ok) {
              const data = await res.json();
              setProfileUser(data);
            }
          } catch (err) {
            console.error("Failed to refresh user data:", err);
          }
        };
        refreshData();
      }, 500);
      
      alert("Profile image updated successfully!");
    } catch (err: any) {
      console.error("Image upload error:", err);
      alert("Failed to upload image: " + err.message);
    } finally {
      setUploadingImage(false);
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }
    }
  };

  const handleRemoveImage = async () => {
    if (!profileUser) return;

    if (!window.confirm("Are you sure you want to remove your profile image?")) {
      return;
    }

    try {
      setUploadingImage(true);
      const token = localStorage.getItem("token");
      if (!token) throw new Error("No authentication token");

      const res = await fetch(`http://localhost:5000/api/users/${profileUser.user_id}/profile-image`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!res.ok) {
        const errorData = await res.json().catch(() => ({}));
        throw new Error(`Failed to remove image: ${errorData.message || res.statusText}`);
      }

      // Force image reload by incrementing version
      setImageVersion(prev => prev + 1);
      
      // Update profileUser to remove image URL
      setProfileUser(prev => {
        if (!prev) return null;
        return {
          ...prev,
          profile_image_url: null
        };
      });
      
      setShowImageControls(false);
      alert("Profile image removed successfully!");
    } catch (err: any) {
      console.error("Image removal error:", err);
      alert("Failed to remove image: " + err.message);
    } finally {
      setUploadingImage(false);
    }
  };

  const handleSave = async () => {
    if (!profileUser) return;

    if (!formData.username.trim() || !formData.email.trim()) {
      alert("Username and email are required");
      return;
    }

    try {
      setSaving(true);
      const token = localStorage.getItem("token");
      if (!token) throw new Error("No authentication token");

      const res = await fetch(`http://localhost:5000/api/users/${profileUser.user_id}`, {
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
      });

      if (!res.ok) {
        const errorData = await res.json().catch(() => ({}));
        throw new Error(`Failed to update profile: ${errorData.message || res.statusText}`);
      }

      setProfileUser(prev => prev ? { 
        ...prev, 
        username: formData.username,
        email: formData.email,
        phone: formData.phone,
        bio: formData.bio,
      } : null);
      
      setEditing(false);
      alert("Profile updated successfully!");
    } catch (err: any) {
      console.error("Update error:", err);
      alert("Failed to update profile: " + err.message);
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

  if (loading) {
    return (
      <div className="profile-loading">
        <Icon type="fa" name="FaSpinner" className="spinner" size={32} />
        <p>Loading profile...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="profile-error">
        <h3>Error Loading Profile</h3>
        <p>{error}</p>
        <div className="error-actions">
          <button onClick={() => window.location.reload()}>Retry</button>
          <button onClick={() => navigate("/dashboard")}>Dashboard</button>
        </div>
      </div>
    );
  }

  if (!profileUser) {
    return (
      <div className="profile-not-found">
        <h3>Profile Not Found</h3>
        <p>The requested profile could not be loaded.</p>
        <button onClick={() => navigate(-1)}>Go Back</button>
      </div>
    );
  }

  const joinDate = profileUser.created_at
    ? new Date(profileUser.created_at).toLocaleDateString("en-US", {
        month: "long",
        day: "numeric",
        year: "numeric",
      })
    : "Unknown";

  const canEdit = currentUser && (
    currentUser.user_id === profileUser.user_id || 
    (currentUser.role && (
      (typeof currentUser.role === 'object' && currentUser.role.role_name === 'admin') ||
      (typeof currentUser.role === 'string' && currentUser.role === 'admin')
    ))
  );

  const isVolunteer = profileUser.role_name === 'volunteer';
  const isAdmin = profileUser.role_name === 'admin';
  const imageUrl = getFullImageUrl(profileUser.profile_image_url);

  return (
    <div className="ranger-profile">
      <div className="profile-container">
        <div className="profile-header">
          <h1 className="profile-title">Ranger Profile</h1>
          <p className="profile-subtitle">Your identity and service record.</p>
        </div>

        <div className="profile-layout">
          {/* Left Column - Profile Display */}
          <div className="profile-display">
            <div className="profile-card">
              <div className="profile-cover">
                <div className="profile-avatar-wrapper">
                  <div 
                    className={`profile-avatar ${canEdit && !editing ? 'editable' : ''} ${uploadingImage ? 'uploading' : ''}`}
                    onClick={handleAvatarClick}
                    onMouseEnter={() => canEdit && !editing && !uploadingImage && setShowImageControls(true)}
                    onMouseLeave={() => setShowImageControls(false)}
                  >
                    {uploadingImage ? (
                      <div className="avatar-loading">
                        <Icon type="fa" name="FaSpinner" className="spinner" size={24} />
                      </div>
                    ) : imageUrl ? (
                      <img 
                        key={`${imageUrl}-${imageVersion}`}
                        src={imageUrl} 
                        alt={profileUser.username}
                        className="avatar-image"
                        onError={(e) => {
                          console.error("Image failed to load:", imageUrl);
                          // If image fails to load, update state to remove broken URL
                          setProfileUser(prev => prev ? { ...prev, profile_image_url: null } : null);
                        }}
                      />
                    ) : (
                      <div className="avatar-initial">
                        {profileUser.username?.charAt(0)?.toUpperCase() || "U"}
                      </div>
                    )}
                    
                    {canEdit && !editing && showImageControls && !uploadingImage && (
                      <div className="avatar-overlay">
                        <Icon type="feather" name="FiCamera" size={24} />
                        <span>Change Photo</span>
                      </div>
                    )}
                  </div>

                  {/* Image upload controls */}
                  {canEdit && !editing && (
                    <div className="avatar-controls">
                      <input
                        ref={fileInputRef}
                        type="file"
                        accept="image/*"
                        onChange={handleImageUpload}
                        disabled={uploadingImage}
                        style={{ display: 'none' }}
                      />
                      <div className="avatar-buttons">
                        <button 
                          className="btn-change-avatar"
                          onClick={() => fileInputRef.current?.click()}
                          disabled={uploadingImage}
                        >
                          <Icon type="feather" name={uploadingImage ? "FiLoader" : "FiCamera"} size={14} />
                          {uploadingImage ? 'Uploading...' : 'Change Photo'}
                        </button>
                        {imageUrl && (
                          <button 
                            className="btn-remove-avatar"
                            onClick={handleRemoveImage}
                            disabled={uploadingImage}
                          >
                            <Icon type="feather" name={uploadingImage ? "FiLoader" : "FiTrash2"} size={14} />
                            Remove
                          </button>
                        )}
                      </div>
                    </div>
                  )}
                </div>
              </div>

              <div className="profile-content">
                <h2 className="profile-name">{profileUser.username}</h2>
                
                <div className={`role-badge ${profileUser.role_name || 'user'}`}>
                  <span className="badge-text">
                    {profileUser.role_name?.toUpperCase() || "USER"}
                    {profileUser.volunteer?.status && ` • ${profileUser.volunteer.status.toUpperCase()}`}
                  </span>
                </div>

                <div className="profile-bio-section">
                  <div className="bio-label">
                    <Icon type="feather" name="FiUser" size={14} />
                    <span>About</span>
                  </div>
                  <p className="profile-bio">
                    {profileUser.bio || (isAdmin 
                      ? 'System Administrator and Animal Lover.' 
                      : isVolunteer 
                        ? 'Wildlife Conservation Ranger' 
                        : 'Community Member')}
                  </p>
                </div>

                <div className="profile-info">
                  <div className="info-item">
                    <div className="info-icon">
                      <Icon type="feather" name="FiMail" size={16} />
                    </div>
                    <div className="info-content">
                      <div className="info-label">Email</div>
                      <div className="info-value">{profileUser.email}</div>
                    </div>
                  </div>

                  <div className="info-item">
                    <div className="info-icon">
                      <Icon type="feather" name="FiCalendar" size={16} />
                    </div>
                    <div className="info-content">
                      <div className="info-label">Member Since</div>
                      <div className="info-value">{joinDate}</div>
                    </div>
                  </div>

                  {profileUser.volunteer?.volunteer_since && (
                    <div className="info-item">
                      <div className="info-icon">
                        <Icon type="feather" name="FiAward" size={16} />
                      </div>
                      <div className="info-content">
                        <div className="info-label">Volunteer Since</div>
                        <div className="info-value">
                          {new Date(profileUser.volunteer.volunteer_since).toLocaleDateString("en-US", {
                            month: "long",
                            day: "numeric",
                            year: "numeric",
                          })}
                        </div>
                      </div>
                    </div>
                  )}

                  <div className="info-item">
                    <div className="info-icon">
                      <Icon type="feather" name="FiHash" size={16} />
                    </div>
                    <div className="info-content">
                      <div className="info-label">User ID</div>
                      <div className="info-value">SRMS-{profileUser.user_id.toString().padStart(6, '0')}</div>
                    </div>
                  </div>
                </div>

                {!editing && canEdit && (
                  <button 
                    className="btn-edit-profile"
                    onClick={() => setEditing(true)}
                  >
                    <Icon type="feather" name="FiEdit2" size={16} />
                    Edit Profile
                  </button>
                )}
              </div>
            </div>

            {/* Badges Section for Volunteers */}
            {isVolunteer && profileUser.volunteer?.badges && profileUser.volunteer.badges.length > 0 && (
              <div className="badges-card">
                <div className="badges-header">
                  <Icon type="feather" name="FiAward" size={18} />
                  <h3>Achievement Badges</h3>
                </div>
                <div className="badges-grid">
                  {profileUser.volunteer.badges.map((badge, index) => (
                    <div key={index} className="badge-item">
                      <Icon type="feather" name="FiStar" size={12} />
                      <span>{badge}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Right Column - Edit Form or Details */}
          <div className="profile-edit">
            {editing ? (
              <div className="edit-section">
                <div className="edit-notice">
                  <div className="edit-notice-content">
                    <Icon type="feather" name="FiEdit3" size={16} />
                    <span>You are currently editing your profile.</span>
                  </div>
                  <div className="edit-notice-actions">
                    <button 
                      className="btn-cancel-edit"
                      onClick={handleCancel}
                      disabled={saving}
                    >
                      Cancel
                    </button>
                    <button 
                      className="btn-save-edit"
                      onClick={handleSave}
                      disabled={saving}
                    >
                      {saving ? 'Saving...' : 'Save Changes'}
                    </button>
                  </div>
                </div>

                <div className="edit-form-card">
                  <h3 className="edit-form-title">
                    <Icon type="feather" name="FiUser" size={18} />
                    Edit Personal Information
                  </h3>
                  
                  <div className="edit-form">
                    <div className="form-group">
                      <label htmlFor="username">Username *</label>
                      <input
                        id="username"
                        type="text"
                        name="username"
                        value={formData.username}
                        onChange={handleChange}
                        placeholder="Enter username"
                        required
                      />
                    </div>

                    <div className="form-group">
                      <label htmlFor="email">Email Address *</label>
                      <input
                        id="email"
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        placeholder="Enter email address"
                        required
                      />
                    </div>

                    <div className="form-group">
                      <label htmlFor="phone">Phone Number</label>
                      <input
                        id="phone"
                        type="tel"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        placeholder="Enter phone number"
                      />
                    </div>

                    <div className="form-group">
                      <label htmlFor="bio">Bio</label>
                      <textarea
                        id="bio"
                        name="bio"
                        value={formData.bio}
                        onChange={handleChange}
                        placeholder="Tell us about yourself..."
                        rows={5}
                      />
                      <div className="char-counter">
                        {formData.bio.length}/500 characters
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              <div className="details-section">
                <div className="details-card">
                  <h3 className="details-title">
                    <Icon type="feather" name="FiInfo" size={18} />
                    Profile Information
                  </h3>
                  
                  <div className="details-content">
                    <div className="detail-row">
                      <span className="detail-label">Account Status</span>
                      <span className={`detail-value status ${profileUser.role_name || 'user'}`}>
                        {isAdmin ? 'Administrator' : isVolunteer ? 'Active Volunteer' : 'Regular User'}
                      </span>
                    </div>
                    
                    <div className="detail-row">
                      <span className="detail-label">Email Verified</span>
                      <span className="detail-value verified">Yes</span>
                    </div>
                    
                    <div className="detail-row">
                      <span className="detail-label">Profile Completeness</span>
                      <div className="progress-container">
                        <div className="progress-bar">
                          <div 
                            className="progress-fill"
                            style={{ width: `${(profileUser.bio ? 20 : 0) + (profileUser.phone ? 20 : 0) + 60}%` }}
                          />
                        </div>
                        <span className="progress-text">
                          {((profileUser.bio ? 20 : 0) + (profileUser.phone ? 20 : 0) + 60)}%
                        </span>
                      </div>
                    </div>
                    
                    <div className="detail-row">
                      <span className="detail-label">Last Updated</span>
                      <span className="detail-value">
                        {new Date(profileUser.created_at).toLocaleDateString()}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="quick-actions">
                  <h4>Quick Actions</h4>
                  <div className="action-buttons">
                    <button className="action-btn">
                      <Icon type="feather" name="FiSettings" size={16} />
                      <span>Account Settings</span>
                    </button>
                    <button className="action-btn">
                      <Icon type="feather" name="FiLock" size={16} />
                      <span>Privacy Settings</span>
                    </button>
                    <button className="action-btn">
                      <Icon type="feather" name="FiBell" size={16} />
                      <span>Notifications</span>
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};