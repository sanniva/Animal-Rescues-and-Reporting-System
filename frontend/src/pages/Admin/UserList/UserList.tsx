// import React, { useEffect, useState } from 'react';
// import './UserList.css';

// interface User {
//   id: number;
//   user_id: number;
//   username: string;
//   email: string;
//   phone?: string;
//   bio?: string;
//   role: string;
//   role_id?: number;
//   approval_status?: 'pending' | 'approved' | 'rejected' | string;
//   volunteer_status?: 'pending' | 'approved' | 'rejected' | string;
//   badges?: string[];
//   joined_at?: string;
//   created_at?: string;
//   profile_image_url?: string;
// }

// const UserList: React.FC = () => {
//   const [users, setUsers] = useState<User[]>([]);
//   const [activeTab, setActiveTab] = useState<'volunteers' | 'users'>('volunteers');
//   const [loading, setLoading] = useState(true);
//   const [apiStatus, setApiStatus] = useState<{
//     usersEndpoint: string;
//     approveEndpoint?: string;
//     rejectEndpoint?: string;
//   }>({
//     usersEndpoint: 'http://localhost:5000/api/users'
//   });

//   // Fetch all users
//   const fetchUsers = async () => {
//     try {
//       const token = localStorage.getItem('token');
//       const res = await fetch('http://localhost:5000/api/users', {
//         headers: {
//           Authorization: `Bearer ${token}`,
//           'Content-Type': 'application/json'
//         },
//       });

//       if (!res.ok) {
//         const errorText = await res.text();
//         console.error('Error response:', errorText);
        
//         try {
//           const errorData = JSON.parse(errorText);
//           throw new Error(errorData.message || `Failed to fetch users (${res.status})`);
//         } catch {
//           throw new Error(`Server error: ${res.status} ${res.statusText}`);
//         }
//       }

//       const data = await res.json();
//       console.log('Users data:', data);

//       // Process the data
//       const mappedUsers: User[] = data.map((u: any) => {
//         // Determine role
//         let role = 'user';
        
//         if (u.role_id === 2 || u.role === 'volunteer' || u.role_name === 'volunteer') {
//           role = 'volunteer';
//         } else if (u.role_id === 3 || u.role === 'admin' || u.role_name === 'admin') {
//           role = 'admin';
//         }

//         // Determine status
//         let status: 'pending' | 'approved' | 'rejected' | string | undefined;
        
//         if (u.volunteer && u.volunteer.status) {
//           status = u.volunteer.status.toLowerCase();
//         } else if (u.volunteer_status) {
//           status = u.volunteer_status.toLowerCase();
//         } else if (u.status_name) {
//           status = u.status_name.toLowerCase();
//         } else if (u.approval_status_id === 1) {
//           status = 'pending';
//         } else if (u.approval_status_id === 2) {
//           status = 'approved';
//         } else if (u.approval_status_id === 3) {
//           status = 'rejected';
//         } else if (role === 'volunteer') {
//           status = 'pending';
//         }

//         return {
//           id: u.user_id || u.id,
//           user_id: u.user_id || u.id,
//           username: u.username || 'Unknown',
//           email: u.email || 'No email',
//           phone: u.phone,
//           bio: u.bio,
//           role: role,
//           role_id: u.role_id,
//           approval_status: status,
//           volunteer_status: status,
//           badges: u.volunteer?.badges || (u.badges ? (typeof u.badges === 'string' ? JSON.parse(u.badges) : u.badges) : []),
//           joined_at: u.volunteer?.volunteer_since || u.joined_at || u.created_at,
//           created_at: u.created_at,
//           profile_image_url: u.profile_image_url,
//         };
//       });

//       setUsers(mappedUsers);
//     } catch (err: any) {
//       console.error('Error fetching users:', err);
//       alert(`Failed to fetch users: ${err.message}`);
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     fetchUsers();
//   }, []);

//   // ✅ FIXED: CORRECT APPROVE FUNCTION
//   const approveVolunteer = async (userId: number) => {
//     const token = localStorage.getItem('token');
//     if (!token) {
//       alert('Please login first');
//       return;
//     }

//     console.log(`=== APPROVING USER ID: ${userId} ===`);
    
//     // ✅ Use the exact endpoints you created in users.js
//     const endpoints = [
//       `http://localhost:5000/api/users/${userId}/approve`,   // Primary - from users.js
//       `http://localhost:5000/api/volunteers/${userId}/approve`, // Secondary - from volunteers.js
//     ];
    
//     const methods = ['PUT', 'POST']; // Both methods should work
    
//     for (const endpoint of endpoints) {
//       for (const method of methods) {
//         try {
//           console.log(`🔄 Trying: ${method} ${endpoint}`);
          
//           const response = await fetch(endpoint, {
//             method: method,
//             headers: {
//               'Content-Type': 'application/json',
//               'Authorization': `Bearer ${token}`
//             },
//           });
          
//           console.log(`📊 Response status: ${response.status}`);
          
//           if (response.ok) {
//             const result = await response.json();
//             console.log('✅ Success:', result);
            
//             // Update the specific user in state
//             setUsers(prevUsers => 
//               prevUsers.map(user => {
//                 if (user.user_id === userId || user.id === userId) {
//                   return {
//                     ...user,
//                     approval_status: 'approved',
//                     volunteer_status: 'approved',
//                     role: 'volunteer',
//                     badges: result.user?.volunteer?.badges || user.badges,
//                     joined_at: result.user?.volunteer?.volunteer_since || user.joined_at
//                   };
//                 }
//                 return user;
//               })
//             );
            
//             alert(result.message || 'Volunteer approved successfully!');
//             return;
//           } else if (response.status === 403) {
//             const errorData = await response.json();
//             throw new Error(errorData.message || 'You do not have admin permissions');
//           } else if (response.status === 404) {
//             console.log(`❌ Endpoint not found: ${endpoint}`);
//             continue; // Try next endpoint
//           }
//         } catch (error) {
//           console.error(`❌ Failed ${method} ${endpoint}:`, error);
//         }
//       }
//     }
    
//     // If all endpoints failed, show error
//     alert('Failed to approve volunteer. Please check:\n1. You are logged in as admin\n2. Backend is running\n3. Check browser console for details');
//   };

//   // ✅ FIXED: CORRECT REJECT FUNCTION
//   const rejectVolunteer = async (userId: number) => {
//     const token = localStorage.getItem('token');
//     if (!token) {
//       alert('Please login first');
//       return;
//     }

//     console.log(`=== REJECTING USER ID: ${userId} ===`);
    
//     const endpoints = [
//       `http://localhost:5000/api/users/${userId}/reject`,   // Primary - from users.js
//       `http://localhost:5000/api/volunteers/${userId}/reject`, // Secondary - from volunteers.js
//     ];
    
//     const methods = ['PUT', 'POST'];
    
//     for (const endpoint of endpoints) {
//       for (const method of methods) {
//         try {
//           console.log(`🔄 Trying: ${method} ${endpoint}`);
          
//           const response = await fetch(endpoint, {
//             method: method,
//             headers: {
//               'Content-Type': 'application/json',
//               'Authorization': `Bearer ${token}`
//             },
//           });
          
//           console.log(`📊 Response status: ${response.status}`);
          
//           if (response.ok) {
//             const result = await response.json();
//             console.log('✅ Success:', result);
            
//             // Update the specific user in state
//             setUsers(prevUsers => 
//               prevUsers.map(user => {
//                 if (user.user_id === userId || user.id === userId) {
//                   return {
//                     ...user,
//                     approval_status: 'rejected',
//                     volunteer_status: 'rejected'
//                   };
//                 }
//                 return user;
//               })
//             );
            
//             alert(result.message || 'Volunteer rejected!');
//             return;
//           }
//         } catch (error) {
//           console.error(`❌ Failed ${method} ${endpoint}:`, error);
//         }
//       }
//     }
    
//     alert('Failed to reject volunteer.');
//   };

//   // Delete a user
//   const deleteUser = async (id: number) => {
//     if (!window.confirm('Are you sure you want to delete this user? This action cannot be undone.')) return;

//     try {
//       const token = localStorage.getItem('token');
//       const res = await fetch(`http://localhost:5000/api/users/${id}`, {
//         method: 'DELETE',
//         headers: {
//           Authorization: `Bearer ${token}`,
//           'Content-Type': 'application/json'
//         },
//       });

//       const data = await res.json();

//       if (!res.ok) {
//         throw new Error(data.message || 'Delete failed');
//       }

//       alert('User deleted successfully!');
//       fetchUsers();
//     } catch (err: any) {
//       console.error('Delete error:', err);
//       alert(`Failed to delete user: ${err.message}`);
//     }
//   };

//   // Export CSV
//   const exportCSV = () => {
//     const headers = ['ID', 'Username', 'Email', 'Role', 'Status', 'Phone', 'Joined Date', 'Created At'];
//     const data = users.map(u => [
//       u.id,
//       u.username,
//       u.email,
//       u.role,
//       u.approval_status || u.volunteer_status || '',
//       u.phone || '',
//       u.joined_at || '',
//       u.created_at || '',
//     ]);
//     const csv = [headers, ...data].map(r => r.join(',')).join('\n');
//     const blob = new Blob([csv], { type: 'text/csv' });
//     const url = URL.createObjectURL(blob);
//     const a = document.createElement('a');
//     a.href = url;
//     a.download = `users_${new Date().toISOString().split('T')[0]}.csv`;
//     a.click();
//     URL.revokeObjectURL(url);
//   };

//   // Filter users
//   const allVolunteers = users.filter(u => u.role === 'volunteer');
//   const pendingVolunteers = allVolunteers.filter(v => 
//     (v.approval_status === 'pending' || v.volunteer_status === 'pending')
//   );
//   const activeVolunteers = allVolunteers.filter(v => 
//     (v.approval_status === 'approved' || v.volunteer_status === 'approved')
//   );
//   const rejectedVolunteers = allVolunteers.filter(v => 
//     (v.approval_status === 'rejected' || v.volunteer_status === 'rejected')
//   );

//   if (loading) {
//     return (
//       <div className="loading-container">
//         <div className="loading-spinner"></div>
//         <p>Loading users...</p>
//       </div>
//     );
//   }

//   return (
//     <div className="container">
//       <div className="header">
//         <div>
//           <h2>People Management</h2>
//           <p>Manage your ranger squad and user base.</p>
//         </div>
//         <button onClick={exportCSV} className="export-btn">
//           📊 Export CSV
//         </button>
//       </div>

//       {/* Stats Cards */}
//       <div className="stats-grid">
//         <div className="stat-card total">
//           <div className="stat-value">{users.length}</div>
//           <div className="stat-label">Total Users</div>
//         </div>
//         <div className="stat-card pending">
//           <div className="stat-value">{pendingVolunteers.length}</div>
//           <div className="stat-label">Pending Rangers</div>
//         </div>
//         <div className="stat-card approved">
//           <div className="stat-value">{activeVolunteers.length}</div>
//           <div className="stat-label">Active Rangers</div>
//         </div>
//         <div className="stat-card rejected">
//           <div className="stat-value">{rejectedVolunteers.length}</div>
//           <div className="stat-label">Rejected</div>
//         </div>
//       </div>

//       <div className="tabs">
//         <button
//           className={activeTab === 'volunteers' ? 'active' : ''}
//           onClick={() => setActiveTab('volunteers')}
//         >
//           Ranger Squad ({allVolunteers.length})
//         </button>
//         <button
//           className={activeTab === 'users' ? 'active' : ''}
//           onClick={() => setActiveTab('users')}
//         >
//           User Directory ({users.length})
//         </button>
//       </div>

//       {activeTab === 'volunteers' && (
//         <>
//           {/* Pending Approvals Section */}
//           <div className="section-header">
//             <h3>Pending Approvals ({pendingVolunteers.length})</h3>
//             <p className="section-subtitle">
//               New volunteer applications waiting for review
//             </p>
//           </div>
          
//           {pendingVolunteers.length === 0 ? (
//             <div className="empty-state">
//               <div className="empty-icon">📭</div>
//               <h4>No Pending Applications</h4>
//               <p>There are no volunteer applications waiting for approval.</p>
//             </div>
//           ) : (
//             <div className="pending-list">
//               {pendingVolunteers.map(v => (
//                 <div key={v.id} className="pending-card">
//                   <div className="volunteer-info">
//                     <div className="volunteer-header">
//                       <div className="user-avatar">
//                         {v.username.charAt(0).toUpperCase()}
//                       </div>
//                       <div>
//                         <strong>{v.username}</strong>
//                         <div className="contact-info">
//                           <span>{v.email}</span>
//                           {v.phone && <span className="phone">📱 {v.phone}</span>}
//                         </div>
//                       </div>
//                     </div>
                    
//                     <div className="volunteer-details">
//                       <div>
//                         <strong>User ID:</strong> <span>#{v.user_id || v.id}</span>
//                       </div>
//                       <div>
//                         <strong>Status:</strong> 
//                         <span className="status-display pending">
//                           {v.approval_status || v.volunteer_status || 'pending'}
//                         </span>
//                       </div>
//                       <div>
//                         <strong>Applied on:</strong> <span>
//                           {v.joined_at ? new Date(v.joined_at).toLocaleDateString() : 
//                            v.created_at ? new Date(v.created_at).toLocaleDateString() : 'N/A'}
//                         </span>
//                       </div>
//                     </div>
                    
//                     {v.bio && (
//                       <div className="volunteer-bio">
//                         "{v.bio}"
//                       </div>
//                     )}
//                   </div>
                  
//                   <div className="actions">
//                     <button 
//                       className="reject-btn" 
//                       onClick={() => rejectVolunteer(v.user_id || v.id)}
//                     >
//                       ✗ Reject Application
//                     </button>
//                     <button 
//                       className="approve-btn" 
//                       onClick={() => approveVolunteer(v.user_id || v.id)}
//                     >
//                       ✓ Approve as Ranger
//                     </button>
//                   </div>
//                 </div>
//               ))}
//             </div>
//           )}

//           {/* Active Rangers Section */}
//           <div className="section-header">
//             <h3>Active Rangers ({activeVolunteers.length})</h3>
//             <p className="section-subtitle">
//               Approved volunteers who can respond to rescue missions
//             </p>
//           </div>
          
//           {activeVolunteers.length === 0 ? (
//             <div className="empty-state">
//               <div className="empty-icon">👥</div>
//               <h4>No Active Rangers</h4>
//               <p>There are no approved volunteers yet.</p>
//             </div>
//           ) : (
//             <div className="table-container">
//               <table className="volunteers-table">
//                 <thead>
//                   <tr>
//                     <th>Ranger</th>
//                     <th>Contact</th>
//                     <th>Badges</th>
//                     <th>Status</th>
//                     <th>Joined Date</th>
//                     <th>Actions</th>
//                   </tr>
//                 </thead>
//                 <tbody>
//                   {activeVolunteers.map(v => (
//                     <tr key={v.id}>
//                       <td>
//                         <div className="user-cell">
//                           <div className="user-avatar">
//                             {v.username.charAt(0).toUpperCase()}
//                           </div>
//                           <div className="user-info">
//                             <strong>{v.username}</strong>
//                             {v.bio && <div className="user-bio">{v.bio}</div>}
//                           </div>
//                         </div>
//                       </td>
//                       <td>
//                         <div className="contact-info">
//                           <span>{v.email}</span>
//                           {v.phone && <span className="phone">📱 {v.phone}</span>}
//                         </div>
//                       </td>
//                       <td>
//                         {v.badges && v.badges.length > 0 ? (
//                           <div className="badges-container">
//                             {v.badges.map((badge, idx) => (
//                               <span key={idx} className="badge">🏅 {badge}</span>
//                             ))}
//                           </div>
//                         ) : (
//                           <span className="no-badges">No badges yet</span>
//                         )}
//                       </td>
//                       <td>
//                         <span className="status-badge approved">ACTIVE</span>
//                       </td>
//                       <td>
//                         {v.joined_at ? new Date(v.joined_at).toLocaleDateString() : 
//                          v.created_at ? new Date(v.created_at).toLocaleDateString() : 'N/A'}
//                       </td>
//                       <td>
//                         <div className="action-buttons">
//                           <button 
//                             className="table-btn remove-btn"
//                             onClick={() => {
//                               if (window.confirm(`Are you sure you want to remove ${v.username} as a volunteer? This will change their role to regular user.`)) {
//                                 rejectVolunteer(v.user_id || v.id);
//                               }
//                             }}
//                           >
//                             Remove Volunteer
//                           </button>
//                         </div>
//                       </td>
//                     </tr>
//                   ))}
//                 </tbody>
//               </table>
//             </div>
//           )}

//           {/* Rejected Volunteers Section */}
//           {rejectedVolunteers.length > 0 && (
//             <>
//               <div className="section-header">
//                 <h3>Rejected Applications ({rejectedVolunteers.length})</h3>
//                 <p className="section-subtitle">
//                   Volunteer applications that were not approved
//                 </p>
//               </div>
//               <div className="table-container">
//                 <table className="volunteers-table">
//                   <thead>
//                     <tr>
//                       <th>Username</th>
//                       <th>Email</th>
//                       <th>Applied Date</th>
//                       <th>Status</th>
//                     </tr>
//                   </thead>
//                   <tbody>
//                     {rejectedVolunteers.map(v => (
//                       <tr key={v.id}>
//                         <td>{v.username}</td>
//                         <td>{v.email}</td>
//                         <td>
//                           {v.joined_at ? new Date(v.joined_at).toLocaleDateString() : 
//                            v.created_at ? new Date(v.created_at).toLocaleDateString() : 'N/A'}
//                         </td>
//                         <td>
//                           <span className="status-badge rejected">REJECTED</span>
//                         </td>
//                       </tr>
//                     ))}
//                   </tbody>
//                 </table>
//               </div>
//             </>
//           )}
//         </>
//       )}

//       {activeTab === 'users' && (
//         <>
//           <div className="section-header">
//             <h3>User Directory ({users.length})</h3>
//             <p className="section-subtitle">
//               All registered users in the system
//             </p>
//           </div>
          
//           {users.length === 0 ? (
//             <div className="empty-state">
//               <div className="empty-icon">👤</div>
//               <h4>No Users Found</h4>
//               <p>There are no registered users in the system.</p>
//             </div>
//           ) : (
//             <div className="table-container">
//               <table className="users-table">
//                 <thead>
//                   <tr>
//                     <th>User</th>
//                     <th>Contact</th>
//                     <th>Role</th>
//                     <th>Status</th>
//                     <th>Joined</th>
//                     <th>Actions</th>
//                   </tr>
//                 </thead>
//                 <tbody>
//                   {users.map(u => (
//                     <tr key={u.id}>
//                       <td>
//                         <div className="user-cell">
//                           <div className="user-avatar">
//                             {u.username.charAt(0).toUpperCase()}
//                           </div>
//                           <div className="user-info">
//                             <strong>{u.username}</strong>
//                             <span>ID: #{u.id}</span>
//                           </div>
//                         </div>
//                       </td>
//                       <td>
//                         <div className="contact-info">
//                           <span>{u.email}</span>
//                           {u.phone && <span className="phone">📱 {u.phone}</span>}
//                         </div>
//                       </td>
//                       <td>
//                         <span className={`role-badge ${u.role}`}>
//                           {u.role.toUpperCase()}
//                         </span>
//                       </td>
//                       <td>
//                         {u.role === 'volunteer' ? (
//                           <span className={`status-badge ${u.approval_status || u.volunteer_status || 'pending'}`}>
//                             {(u.approval_status || u.volunteer_status || 'pending').toUpperCase()}
//                           </span>
//                         ) : (
//                           <span className="status-badge user">USER</span>
//                         )}
//                       </td>
//                       <td>
//                         {u.created_at ? new Date(u.created_at).toLocaleDateString() : 'N/A'}
//                       </td>
//                       <td>
//                         {u.role !== 'admin' && (
//                           <button 
//                             className="table-btn delete-btn"
//                             onClick={() => deleteUser(u.id)}
//                             title="Delete user"
//                           >
//                             Delete User
//                           </button>
//                         )}
//                       </td>
//                     </tr>
//                   ))}
//                 </tbody>
//               </table>
//             </div>
//           )}
//         </>
//       )}
//     </div>
//   );
// };

// export default UserList;


// import React, { useEffect, useState, useCallback } from 'react';
// import './UserList.css';

// interface User {
//   id: number;
//   user_id: number;
//   username: string;
//   email: string;
//   phone?: string;
//   bio?: string;
//   role: string;
//   role_id?: number;
//   approval_status?: 'pending' | 'approved' | 'rejected' | string;
//   volunteer_status?: 'pending' | 'approved' | 'rejected' | string;
//   badges?: string[];
//   joined_at?: string;
//   created_at?: string;
//   profile_image_url?: string;
// }

// const UserList: React.FC = () => {
//   const [users, setUsers] = useState<User[]>([]);
//   const [activeTab, setActiveTab] = useState<'volunteers' | 'users'>('volunteers');
//   const [loading, setLoading] = useState(true);

//   // Fetch all users
//   const fetchUsers = useCallback(async () => {
//     try {
//       const token = localStorage.getItem('token');
//       if (!token) {
//         console.error('No token found');
//         setLoading(false);
//         return;
//       }

//       const res = await fetch('http://localhost:5000/api/users', {
//         headers: {
//           Authorization: `Bearer ${token}`,
//           'Content-Type': 'application/json'
//         },
//       });

//       if (!res.ok) {
//         const errorText = await res.text();
//         console.error('Error response:', errorText);
//         throw new Error(`Failed to fetch users (${res.status})`);
//       }

//       const data = await res.json();
//       console.log('Users data:', data);

//       // Process the data
//       const mappedUsers: User[] = data.map((u: any) => {
//         let role = 'user';
        
//         if (u.role_id === 2 || u.role === 'volunteer' || u.role_name === 'volunteer') {
//           role = 'volunteer';
//         } else if (u.role_id === 3 || u.role === 'admin' || u.role_name === 'admin') {
//           role = 'admin';
//         }

//         let status: 'pending' | 'approved' | 'rejected' | string | undefined;
        
//         if (u.volunteer && u.volunteer.status) {
//           status = u.volunteer.status.toLowerCase();
//         } else if (u.volunteer_status) {
//           status = u.volunteer_status.toLowerCase();
//         } else if (u.status_name) {
//           status = u.status_name.toLowerCase();
//         } else if (u.approval_status_id === 1) {
//           status = 'pending';
//         } else if (u.approval_status_id === 2) {
//           status = 'approved';
//         } else if (u.approval_status_id === 3) {
//           status = 'rejected';
//         } else if (role === 'volunteer') {
//           status = 'pending';
//         }

//         return {
//           id: u.user_id || u.id,
//           user_id: u.user_id || u.id,
//           username: u.username || 'Unknown',
//           email: u.email || 'No email',
//           phone: u.phone,
//           bio: u.bio,
//           role: role,
//           role_id: u.role_id,
//           approval_status: status,
//           volunteer_status: status,
//           badges: u.volunteer?.badges || (u.badges ? (typeof u.badges === 'string' ? JSON.parse(u.badges) : u.badges) : []),
//           joined_at: u.volunteer?.volunteer_since || u.joined_at || u.created_at,
//           created_at: u.created_at,
//           profile_image_url: u.profile_image_url,
//         };
//       });

//       setUsers(mappedUsers);
//     } catch (err: any) {
//       console.error('Error fetching users:', err);
//       alert(`Failed to fetch users: ${err.message}`);
//     } finally {
//       setLoading(false);
//     }
//   }, []);

//   useEffect(() => {
//     fetchUsers();
//   }, [fetchUsers]);

//   // ✅ APPROVE VOLUNTEER - SIMPLE & WORKING
//   const approveVolunteer = async (userId: number) => {
//     try {
//       const token = localStorage.getItem('token');
//       if (!token) {
//         alert('Please login first');
//         return;
//       }

//       console.log('Approving user ID:', userId);
      
//       // Try PUT method first (most reliable)
//       const response = await fetch(`http://localhost:5000/api/users/${userId}/approve`, {
//         method: 'PUT',
//         headers: {
//           'Content-Type': 'application/json',
//           'Authorization': `Bearer ${token}`
//         },
//       });

//       console.log('Response status:', response.status);
      
//       if (response.ok) {
//         const result = await response.json();
//         console.log('Success:', result);
        
//         alert(result.message || 'Volunteer approved successfully!');
        
//         // Update the user in state
//         setUsers(prevUsers => 
//           prevUsers.map(user => {
//             if (user.user_id === userId || user.id === userId) {
//               return {
//                 ...user,
//                 approval_status: 'approved',
//                 volunteer_status: 'approved',
//                 role: 'volunteer',
//                 badges: result.user?.volunteer?.badges || user.badges,
//                 joined_at: result.user?.volunteer?.volunteer_since || user.joined_at
//               };
//             }
//             return user;
//           })
//         );
        
//       } else {
//         // Try POST method if PUT fails
//         const response2 = await fetch(`http://localhost:5000/api/users/${userId}/approve`, {
//           method: 'POST',
//           headers: {
//             'Content-Type': 'application/json',
//             'Authorization': `Bearer ${token}`
//           },
//         });
        
//         if (response2.ok) {
//           const result = await response2.json();
//           alert(result.message || 'Volunteer approved successfully!');
          
//           setUsers(prevUsers => 
//             prevUsers.map(user => {
//               if (user.user_id === userId || user.id === userId) {
//                 return {
//                   ...user,
//                   approval_status: 'approved',
//                   volunteer_status: 'approved',
//                   role: 'volunteer'
//                 };
//               }
//               return user;
//             })
//           );
//         } else {
//           const errorData = await response2.json();
//           throw new Error(errorData.message || `Failed with status: ${response2.status}`);
//         }
//       }
      
//     } catch (error: any) {
//       console.error('Approve error:', error);
//       alert(`Failed to approve volunteer: ${error.message}`);
//     }
//   };

//   // ✅ REJECT VOLUNTEER - SIMPLE & WORKING
//   const rejectVolunteer = async (userId: number) => {
//     try {
//       const token = localStorage.getItem('token');
//       if (!token) {
//         alert('Please login first');
//         return;
//       }

//       console.log('Rejecting user ID:', userId);
      
//       // Try PUT method first
//       const response = await fetch(`http://localhost:5000/api/users/${userId}/reject`, {
//         method: 'PUT',
//         headers: {
//           'Content-Type': 'application/json',
//           'Authorization': `Bearer ${token}`
//         },
//       });

//       console.log('Response status:', response.status);
      
//       if (response.ok) {
//         const result = await response.json();
//         console.log('Success:', result);
        
//         alert(result.message || 'Volunteer rejected!');
        
//         // Update the user in state
//         setUsers(prevUsers => 
//           prevUsers.map(user => {
//             if (user.user_id === userId || user.id === userId) {
//               return {
//                 ...user,
//                 approval_status: 'rejected',
//                 volunteer_status: 'rejected'
//               };
//             }
//             return user;
//           })
//         );
        
//       } else {
//         // Try POST method if PUT fails
//         const response2 = await fetch(`http://localhost:5000/api/users/${userId}/reject`, {
//           method: 'POST',
//           headers: {
//             'Content-Type': 'application/json',
//             'Authorization': `Bearer ${token}`
//           },
//         });
        
//         if (response2.ok) {
//           const result = await response2.json();
//           alert(result.message || 'Volunteer rejected!');
          
//           setUsers(prevUsers => 
//             prevUsers.map(user => {
//               if (user.user_id === userId || user.id === userId) {
//                 return {
//                   ...user,
//                   approval_status: 'rejected',
//                   volunteer_status: 'rejected'
//                 };
//               }
//               return user;
//             })
//           );
//         } else {
//           const errorData = await response2.json();
//           throw new Error(errorData.message || `Failed with status: ${response2.status}`);
//         }
//       }
      
//     } catch (error: any) {
//       console.error('Reject error:', error);
//       alert(`Failed to reject volunteer: ${error.message}`);
//     }
//   };

//   // Delete a user
//   const deleteUser = async (id: number) => {
//     if (!window.confirm('Are you sure you want to delete this user? This action cannot be undone.')) return;

//     try {
//       const token = localStorage.getItem('token');
//       const res = await fetch(`http://localhost:5000/api/users/${id}`, {
//         method: 'DELETE',
//         headers: {
//           Authorization: `Bearer ${token}`,
//           'Content-Type': 'application/json'
//         },
//       });

//       const data = await res.json();

//       if (!res.ok) {
//         throw new Error(data.message || 'Delete failed');
//       }

//       alert('User deleted successfully!');
//       fetchUsers();
//     } catch (err: any) {
//       console.error('Delete error:', err);
//       alert(`Failed to delete user: ${err.message}`);
//     }
//   };

//   // Export CSV
//   const exportCSV = () => {
//     const headers = ['ID', 'Username', 'Email', 'Role', 'Status', 'Phone', 'Joined Date', 'Created At'];
//     const data = users.map(u => [
//       u.id,
//       u.username,
//       u.email,
//       u.role,
//       u.approval_status || u.volunteer_status || '',
//       u.phone || '',
//       u.joined_at || '',
//       u.created_at || '',
//     ]);
//     const csv = [headers, ...data].map(r => r.join(',')).join('\n');
//     const blob = new Blob([csv], { type: 'text/csv' });
//     const url = URL.createObjectURL(blob);
//     const a = document.createElement('a');
//     a.href = url;
//     a.download = `users_${new Date().toISOString().split('T')[0]}.csv`;
//     a.click();
//     URL.revokeObjectURL(url);
//   };

//   // Filter users
//   const allVolunteers = users.filter(u => u.role === 'volunteer');
//   const pendingVolunteers = allVolunteers.filter(v => 
//     (v.approval_status === 'pending' || v.volunteer_status === 'pending')
//   );
//   const activeVolunteers = allVolunteers.filter(v => 
//     (v.approval_status === 'approved' || v.volunteer_status === 'approved')
//   );
//   const rejectedVolunteers = allVolunteers.filter(v => 
//     (v.approval_status === 'rejected' || v.volunteer_status === 'rejected')
//   );

//   if (loading) {
//     return (
//       <div className="loading-container">
//         <div className="loading-spinner"></div>
//         <p>Loading users...</p>
//       </div>
//     );
//   }

//   return (
//     <div className="container">
//       <div className="header">
//         <div>
//           <h2>People Management</h2>
//           <p>Manage your ranger squad and user base.</p>
//         </div>
//         <button onClick={exportCSV} className="export-btn">
//           📊 Export CSV
//         </button>
//       </div>

//       {/* Stats Cards */}
//       <div className="stats-grid">
//         <div className="stat-card total">
//           <div className="stat-value">{users.length}</div>
//           <div className="stat-label">Total Users</div>
//         </div>
//         <div className="stat-card pending">
//           <div className="stat-value">{pendingVolunteers.length}</div>
//           <div className="stat-label">Pending Rangers</div>
//         </div>
//         <div className="stat-card approved">
//           <div className="stat-value">{activeVolunteers.length}</div>
//           <div className="stat-label">Active Rangers</div>
//         </div>
//         <div className="stat-card rejected">
//           <div className="stat-value">{rejectedVolunteers.length}</div>
//           <div className="stat-label">Rejected</div>
//         </div>
//       </div>

//       <div className="tabs">
//         <button
//           className={activeTab === 'volunteers' ? 'active' : ''}
//           onClick={() => setActiveTab('volunteers')}
//         >
//           Ranger Squad ({allVolunteers.length})
//         </button>
//         <button
//           className={activeTab === 'users' ? 'active' : ''}
//           onClick={() => setActiveTab('users')}
//         >
//           User Directory ({users.length})
//         </button>
//       </div>

//       {activeTab === 'volunteers' && (
//         <>
//           {/* Pending Approvals Section */}
//           <div className="section-header">
//             <h3>Pending Approvals ({pendingVolunteers.length})</h3>
//             <p className="section-subtitle">
//               New volunteer applications waiting for review
//             </p>
//           </div>
          
//           {pendingVolunteers.length === 0 ? (
//             <div className="empty-state">
//               <div className="empty-icon">📭</div>
//               <h4>No Pending Applications</h4>
//               <p>There are no volunteer applications waiting for approval.</p>
//             </div>
//           ) : (
//             <div className="pending-list">
//               {pendingVolunteers.map(v => (
//                 <div key={v.id} className="pending-card">
//                   <div className="volunteer-info">
//                     <div className="volunteer-header">
//                       <div className="user-avatar">
//                         {v.username.charAt(0).toUpperCase()}
//                       </div>
//                       <div>
//                         <strong>{v.username}</strong>
//                         <div className="contact-info">
//                           <span>{v.email}</span>
//                           {v.phone && <span className="phone">📱 {v.phone}</span>}
//                         </div>
//                       </div>
//                     </div>
                    
//                     <div className="volunteer-details">
//                       <div>
//                         <strong>User ID:</strong> <span>#{v.user_id || v.id}</span>
//                       </div>
//                       <div>
//                         <strong>Status:</strong> 
//                         <span className="status-display pending">
//                           {v.approval_status || v.volunteer_status || 'pending'}
//                         </span>
//                       </div>
//                       <div>
//                         <strong>Applied on:</strong> <span>
//                           {v.joined_at ? new Date(v.joined_at).toLocaleDateString() : 
//                            v.created_at ? new Date(v.created_at).toLocaleDateString() : 'N/A'}
//                         </span>
//                       </div>
//                     </div>
                    
//                     {v.bio && (
//                       <div className="volunteer-bio">
//                         "{v.bio}"
//                       </div>
//                     )}
//                   </div>
                  
//                   <div className="actions">
//                     <button 
//                       className="reject-btn" 
//                       onClick={() => rejectVolunteer(v.user_id || v.id)}
//                     >
//                       ✗ Reject Application
//                     </button>
//                     <button 
//                       className="approve-btn" 
//                       onClick={() => approveVolunteer(v.user_id || v.id)}
//                     >
//                       ✓ Approve as Ranger
//                     </button>
//                   </div>
//                 </div>
//               ))}
//             </div>
//           )}

//           {/* Active Rangers Section */}
//           <div className="section-header">
//             <h3>Active Rangers ({activeVolunteers.length})</h3>
//             <p className="section-subtitle">
//               Approved volunteers who can respond to rescue missions
//             </p>
//           </div>
          
//           {activeVolunteers.length === 0 ? (
//             <div className="empty-state">
//               <div className="empty-icon">👥</div>
//               <h4>No Active Rangers</h4>
//               <p>There are no approved volunteers yet.</p>
//             </div>
//           ) : (
//             <div className="table-container">
//               <table className="volunteers-table">
//                 <thead>
//                   <tr>
//                     <th>Ranger</th>
//                     <th>Contact</th>
//                     <th>Badges</th>
//                     <th>Status</th>
//                     <th>Joined Date</th>
//                     <th>Actions</th>
//                   </tr>
//                 </thead>
//                 <tbody>
//                   {activeVolunteers.map(v => (
//                     <tr key={v.id}>
//                       <td>
//                         <div className="user-cell">
//                           <div className="user-avatar">
//                             {v.username.charAt(0).toUpperCase()}
//                           </div>
//                           <div className="user-info">
//                             <strong>{v.username}</strong>
//                             {v.bio && <div className="user-bio">{v.bio}</div>}
//                           </div>
//                         </div>
//                       </td>
//                       <td>
//                         <div className="contact-info">
//                           <span>{v.email}</span>
//                           {v.phone && <span className="phone">📱 {v.phone}</span>}
//                         </div>
//                       </td>
//                       <td>
//                         {v.badges && v.badges.length > 0 ? (
//                           <div className="badges-container">
//                             {v.badges.map((badge, idx) => (
//                               <span key={idx} className="badge">🏅 {badge}</span>
//                             ))}
//                           </div>
//                         ) : (
//                           <span className="no-badges">No badges yet</span>
//                         )}
//                       </td>
//                       <td>
//                         <span className="status-badge approved">ACTIVE</span>
//                       </td>
//                       <td>
//                         {v.joined_at ? new Date(v.joined_at).toLocaleDateString() : 
//                          v.created_at ? new Date(v.created_at).toLocaleDateString() : 'N/A'}
//                       </td>
//                       <td>
//                         <div className="action-buttons">
//                           <button 
//                             className="table-btn remove-btn"
//                             onClick={() => {
//                               if (window.confirm(`Are you sure you want to remove ${v.username} as a volunteer? This will change their role to regular user.`)) {
//                                 rejectVolunteer(v.user_id || v.id);
//                               }
//                             }}
//                           >
//                             Remove Volunteer
//                           </button>
//                         </div>
//                       </td>
//                     </tr>
//                   ))}
//                 </tbody>
//               </table>
//             </div>
//           )}

//           {/* Rejected Volunteers Section */}
//           {rejectedVolunteers.length > 0 && (
//             <>
//               <div className="section-header">
//                 <h3>Rejected Applications ({rejectedVolunteers.length})</h3>
//                 <p className="section-subtitle">
//                   Volunteer applications that were not approved
//                 </p>
//               </div>
//               <div className="table-container">
//                 <table className="volunteers-table">
//                   <thead>
//                     <tr>
//                       <th>Username</th>
//                       <th>Email</th>
//                       <th>Applied Date</th>
//                       <th>Status</th>
//                     </tr>
//                   </thead>
//                   <tbody>
//                     {rejectedVolunteers.map(v => (
//                       <tr key={v.id}>
//                         <td>{v.username}</td>
//                         <td>{v.email}</td>
//                         <td>
//                           {v.joined_at ? new Date(v.joined_at).toLocaleDateString() : 
//                            v.created_at ? new Date(v.created_at).toLocaleDateString() : 'N/A'}
//                         </td>
//                         <td>
//                           <span className="status-badge rejected">REJECTED</span>
//                         </td>
//                       </tr>
//                     ))}
//                   </tbody>
//                 </table>
//               </div>
//             </>
//           )}
//         </>
//       )}

//       {activeTab === 'users' && (
//         <>
//           <div className="section-header">
//             <h3>User Directory ({users.length})</h3>
//             <p className="section-subtitle">
//               All registered users in the system
//             </p>
//           </div>
          
//           {users.length === 0 ? (
//             <div className="empty-state">
//               <div className="empty-icon">👤</div>
//               <h4>No Users Found</h4>
//               <p>There are no registered users in the system.</p>
//             </div>
//           ) : (
//             <div className="table-container">
//               <table className="users-table">
//                 <thead>
//                   <tr>
//                     <th>User</th>
//                     <th>Contact</th>
//                     <th>Role</th>
//                     <th>Status</th>
//                     <th>Joined</th>
//                     <th>Actions</th>
//                   </tr>
//                 </thead>
//                 <tbody>
//                   {users.map(u => (
//                     <tr key={u.id}>
//                       <td>
//                         <div className="user-cell">
//                           <div className="user-avatar">
//                             {u.username.charAt(0).toUpperCase()}
//                           </div>
//                           <div className="user-info">
//                             <strong>{u.username}</strong>
//                             <span>ID: #{u.id}</span>
//                           </div>
//                         </div>
//                       </td>
//                       <td>
//                         <div className="contact-info">
//                           <span>{u.email}</span>
//                           {u.phone && <span className="phone">📱 {u.phone}</span>}
//                         </div>
//                       </td>
//                       <td>
//                         <span className={`role-badge ${u.role}`}>
//                           {u.role.toUpperCase()}
//                         </span>
//                       </td>
//                       <td>
//                         {u.role === 'volunteer' ? (
//                           <span className={`status-badge ${u.approval_status || u.volunteer_status || 'pending'}`}>
//                             {(u.approval_status || u.volunteer_status || 'pending').toUpperCase()}
//                           </span>
//                         ) : (
//                           <span className="status-badge user">USER</span>
//                         )}
//                       </td>
//                       <td>
//                         {u.created_at ? new Date(u.created_at).toLocaleDateString() : 'N/A'}
//                       </td>
//                       <td>
//                         {u.role !== 'admin' && (
//                           <button 
//                             className="table-btn delete-btn"
//                             onClick={() => deleteUser(u.id)}
//                             title="Delete user"
//                           >
//                             Delete User
//                           </button>
//                         )}
//                       </td>
//                     </tr>
//                   ))}
//                 </tbody>
//               </table>
//             </div>
//           )}
//         </>
//       )}
//     </div>
//   );
// };

// export default UserList;

import React, { useEffect, useState, useCallback } from 'react';
import './UserList.css';

interface User {
  id: number;
  user_id: number;
  username: string;
  email: string;
  phone?: string;
  bio?: string;
  role: string;
  role_id?: number;
  approval_status?: 'pending' | 'approved' | 'rejected' | string;
  volunteer_status?: 'pending' | 'approved' | 'rejected' | string;
  badges?: string[];
  badge_count?: number;
  joined_at?: string;
  created_at?: string;
  profile_image_url?: string;
}

const UserList: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [activeTab, setActiveTab] = useState<'volunteers' | 'users'>('volunteers');
  const [loading, setLoading] = useState(true);

  // Fetch all users
  const fetchUsers = useCallback(async () => {
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        console.error('No token found');
        setLoading(false);
        return;
      }

      const res = await fetch('http://localhost:5000/api/users', {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
      });

      if (!res.ok) {
        const errorText = await res.text();
        console.error('Error response:', errorText);
        throw new Error(`Failed to fetch users (${res.status})`);
      }

      const data = await res.json();
      console.log('RAW API RESPONSE:', JSON.stringify(data, null, 2));

      // Process the data
      const mappedUsers: User[] = data.map((u: any) => {
        let role = 'user';
        
        if (u.role_id === 2 || u.role === 'volunteer' || u.role_name === 'volunteer') {
          role = 'volunteer';
        } else if (u.role_id === 3 || u.role === 'admin' || u.role_name === 'admin') {
          role = 'admin';
        }

        let status: 'pending' | 'approved' | 'rejected' | string | undefined;
        
        if (u.volunteer && u.volunteer.status) {
          status = u.volunteer.status.toLowerCase();
        } else if (u.volunteer_status) {
          status = u.volunteer_status.toLowerCase();
        } else if (u.status_name) {
          status = u.status_name.toLowerCase();
        } else if (u.approval_status_id === 1) {
          status = 'pending';
        } else if (u.approval_status_id === 2) {
          status = 'approved';
        } else if (u.approval_status_id === 3) {
          status = 'rejected';
        } else if (role === 'volunteer') {
          status = 'pending';
        }

        // Extract badges from badges_string (new format from GROUP_CONCAT)
        let badges: string[] = [];
        if (u.badges_string) {
          badges = u.badges_string.split('||').filter((b: string) => b.trim() !== '');
          console.log(`Found badges_string for ${u.username}:`, badges);
        } 
        // Check for badges array
        else if (u.badges && Array.isArray(u.badges)) {
          badges = u.badges;
          console.log(`Found badges array for ${u.username}:`, badges);
        }
        // Check in volunteer object
        else if (u.volunteer && u.volunteer.badges) {
          badges = Array.isArray(u.volunteer.badges) 
            ? u.volunteer.badges 
            : (typeof u.volunteer.badges === 'string' ? JSON.parse(u.volunteer.badges) : []);
          console.log(`Found badges in volunteer for ${u.username}:`, badges);
        }

        return {
          id: u.user_id || u.id,
          user_id: u.user_id || u.id,
          username: u.username || 'Unknown',
          email: u.email || 'No email',
          phone: u.phone,
          bio: u.bio,
          role: role,
          role_id: u.role_id,
          approval_status: status,
          volunteer_status: status,
          badges: badges,
          badge_count: u.badge_count || badges.length || 0,
          joined_at: u.volunteer?.volunteer_since || u.joined_at || u.created_at,
          created_at: u.created_at,
          profile_image_url: u.profile_image_url,
        };
      });

      console.log('Mapped users with badges:', mappedUsers.map(u => ({
        username: u.username,
        badges: u.badges,
        badge_count: u.badge_count
      })));

      setUsers(mappedUsers);
    } catch (err: any) {
      console.error('Error fetching users:', err);
      alert(`Failed to fetch users: ${err.message}`);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchUsers();
  }, [fetchUsers]);

  // ✅ APPROVE VOLUNTEER - SIMPLE & WORKING
  const approveVolunteer = async (userId: number) => {
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        alert('Please login first');
        return;
      }

      console.log('Approving user ID:', userId);
      
      // Try PUT method first (most reliable)
      const response = await fetch(`http://localhost:5000/api/users/${userId}/approve`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
      });

      console.log('Response status:', response.status);
      
      if (response.ok) {
        const result = await response.json();
        console.log('Success:', result);
        
        alert(result.message || 'Volunteer approved successfully!');
        
        // Update the user in state
        setUsers(prevUsers => 
          prevUsers.map(user => {
            if (user.user_id === userId || user.id === userId) {
              return {
                ...user,
                approval_status: 'approved',
                volunteer_status: 'approved',
                role: 'volunteer',
                badges: result.user?.badges || result.user?.volunteer?.badges || user.badges,
                joined_at: result.user?.volunteer?.volunteer_since || user.joined_at
              };
            }
            return user;
          })
        );
        
      } else {
        // Try POST method if PUT fails
        const response2 = await fetch(`http://localhost:5000/api/users/${userId}/approve`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
          },
        });
        
        if (response2.ok) {
          const result = await response2.json();
          alert(result.message || 'Volunteer approved successfully!');
          
          setUsers(prevUsers => 
            prevUsers.map(user => {
              if (user.user_id === userId || user.id === userId) {
                return {
                  ...user,
                  approval_status: 'approved',
                  volunteer_status: 'approved',
                  role: 'volunteer'
                };
              }
              return user;
            })
          );
        } else {
          const errorData = await response2.json();
          throw new Error(errorData.message || `Failed with status: ${response2.status}`);
        }
      }
      
    } catch (error: any) {
      console.error('Approve error:', error);
      alert(`Failed to approve volunteer: ${error.message}`);
    }
  };

  // ✅ REJECT VOLUNTEER - SIMPLE & WORKING
  const rejectVolunteer = async (userId: number) => {
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        alert('Please login first');
        return;
      }

      console.log('Rejecting user ID:', userId);
      
      // Try PUT method first
      const response = await fetch(`http://localhost:5000/api/users/${userId}/reject`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
      });

      console.log('Response status:', response.status);
      
      if (response.ok) {
        const result = await response.json();
        console.log('Success:', result);
        
        alert(result.message || 'Volunteer rejected!');
        
        // Update the user in state
        setUsers(prevUsers => 
          prevUsers.map(user => {
            if (user.user_id === userId || user.id === userId) {
              return {
                ...user,
                approval_status: 'rejected',
                volunteer_status: 'rejected'
              };
            }
            return user;
          })
        );
        
      } else {
        // Try POST method if PUT fails
        const response2 = await fetch(`http://localhost:5000/api/users/${userId}/reject`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
          },
        });
        
        if (response2.ok) {
          const result = await response2.json();
          alert(result.message || 'Volunteer rejected!');
          
          setUsers(prevUsers => 
            prevUsers.map(user => {
              if (user.user_id === userId || user.id === userId) {
                return {
                  ...user,
                  approval_status: 'rejected',
                  volunteer_status: 'rejected'
                };
              }
              return user;
            })
          );
        } else {
          const errorData = await response2.json();
          throw new Error(errorData.message || `Failed with status: ${response2.status}`);
        }
      }
      
    } catch (error: any) {
      console.error('Reject error:', error);
      alert(`Failed to reject volunteer: ${error.message}`);
    }
  };

  // Delete a user
  const deleteUser = async (id: number) => {
    if (!window.confirm('Are you sure you want to delete this user? This action cannot be undone.')) return;

    try {
      const token = localStorage.getItem('token');
      const res = await fetch(`http://localhost:5000/api/users/${id}`, {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message || 'Delete failed');
      }

      alert('User deleted successfully!');
      fetchUsers();
    } catch (err: any) {
      console.error('Delete error:', err);
      alert(`Failed to delete user: ${err.message}`);
    }
  };

  // Export CSV
  const exportCSV = () => {
    const headers = ['ID', 'Username', 'Email', 'Role', 'Status', 'Phone', 'Joined Date', 'Created At', 'Badges Count'];
    const data = users.map(u => [
      u.id,
      u.username,
      u.email,
      u.role,
      u.approval_status || u.volunteer_status || '',
      u.phone || '',
      u.joined_at || '',
      u.created_at || '',
      u.badges?.length || 0,
    ]);
    const csv = [headers, ...data].map(r => r.join(',')).join('\n');
    const blob = new Blob([csv], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `users_${new Date().toISOString().split('T')[0]}.csv`;
    a.click();
    URL.revokeObjectURL(url);
  };

  // Filter users
  const allVolunteers = users.filter(u => u.role === 'volunteer');
  const pendingVolunteers = allVolunteers.filter(v => 
    (v.approval_status === 'pending' || v.volunteer_status === 'pending')
  );
  const activeVolunteers = allVolunteers.filter(v => 
    (v.approval_status === 'approved' || v.volunteer_status === 'approved')
  );
  const rejectedVolunteers = allVolunteers.filter(v => 
    (v.approval_status === 'rejected' || v.volunteer_status === 'rejected')
  );

  if (loading) {
    return (
      <div className="loading-container">
        <div className="loading-spinner"></div>
        <p>Loading users...</p>
      </div>
    );
  }

  return (
    <div className="container">
      <div className="header">
        <div>
          <h2>People Management</h2>
          <p>Manage your ranger squad and user base.</p>
        </div>
        <button onClick={exportCSV} className="export-btn">
          📊 Export CSV
        </button>
      </div>

      {/* Stats Cards */}
      <div className="stats-grid">
        <div className="stat-card total">
          <div className="stat-value">{users.length}</div>
          <div className="stat-label">Total Users</div>
        </div>
        <div className="stat-card pending">
          <div className="stat-value">{pendingVolunteers.length}</div>
          <div className="stat-label">Pending Rangers</div>
        </div>
        <div className="stat-card approved">
          <div className="stat-value">{activeVolunteers.length}</div>
          <div className="stat-label">Active Rangers</div>
        </div>
        <div className="stat-card rejected">
          <div className="stat-value">{rejectedVolunteers.length}</div>
          <div className="stat-label">Rejected</div>
        </div>
      </div>

      <div className="tabs">
        <button
          className={activeTab === 'volunteers' ? 'active' : ''}
          onClick={() => setActiveTab('volunteers')}
        >
          Ranger Squad ({allVolunteers.length})
        </button>
        <button
          className={activeTab === 'users' ? 'active' : ''}
          onClick={() => setActiveTab('users')}
        >
          User Directory ({users.length})
        </button>
      </div>

      {activeTab === 'volunteers' && (
        <>
          {/* Pending Approvals Section */}
          <div className="section-header">
            <h3>Pending Approvals ({pendingVolunteers.length})</h3>
            <p className="section-subtitle">
              New volunteer applications waiting for review
            </p>
          </div>
          
          {pendingVolunteers.length === 0 ? (
            <div className="empty-state">
              <div className="empty-icon">📭</div>
              <h4>No Pending Applications</h4>
              <p>There are no volunteer applications waiting for approval.</p>
            </div>
          ) : (
            <div className="pending-list">
              {pendingVolunteers.map(v => (
                <div key={v.id} className="pending-card">
                  <div className="volunteer-info">
                    <div className="volunteer-header">
                      <div className="user-avatar">
                        {v.username.charAt(0).toUpperCase()}
                      </div>
                      <div>
                        <strong>{v.username}</strong>
                        <div className="contact-info">
                          <span>{v.email}</span>
                          {v.phone && <span className="phone">📱 {v.phone}</span>}
                        </div>
                      </div>
                    </div>
                    
                    <div className="volunteer-details">
                      <div>
                        <strong>User ID:</strong> <span>#{v.user_id || v.id}</span>
                      </div>
                      <div>
                        <strong>Status:</strong> 
                        <span className="status-display pending">
                          {v.approval_status || v.volunteer_status || 'pending'}
                        </span>
                      </div>
                      <div>
                        <strong>Applied on:</strong> <span>
                          {v.joined_at ? new Date(v.joined_at).toLocaleDateString() : 
                           v.created_at ? new Date(v.created_at).toLocaleDateString() : 'N/A'}
                        </span>
                      </div>
                    </div>
                    
                    {v.bio && (
                      <div className="volunteer-bio">
                        "{v.bio}"
                      </div>
                    )}
                  </div>
                  
                  <div className="actions">
                    <button 
                      className="reject-btn" 
                      onClick={() => rejectVolunteer(v.user_id || v.id)}
                    >
                      ✗ Reject Application
                    </button>
                    <button 
                      className="approve-btn" 
                      onClick={() => approveVolunteer(v.user_id || v.id)}
                    >
                      ✓ Approve as Ranger
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Active Rangers Section */}
          <div className="section-header">
            <h3>Active Rangers ({activeVolunteers.length})</h3>
            <p className="section-subtitle">
              Approved volunteers who can respond to rescue missions
            </p>
          </div>
          
          {activeVolunteers.length === 0 ? (
            <div className="empty-state">
              <div className="empty-icon">👥</div>
              <h4>No Active Rangers</h4>
              <p>There are no approved volunteers yet.</p>
            </div>
          ) : (
            <div className="table-container">
              <table className="volunteers-table">
                <thead>
                  <tr>
                    <th>Ranger</th>
                    <th>Contact</th>
                    <th>Badges</th>
                    <th>Status</th>
                    <th>Joined Date</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {activeVolunteers.map(v => (
                    <tr key={v.id}>
                      <td>
                        <div className="user-cell">
                          <div className="user-avatar">
                            {v.username.charAt(0).toUpperCase()}
                          </div>
                          <div className="user-info">
                            <strong>{v.username}</strong>
                            {v.bio && <div className="user-bio">{v.bio}</div>}
                          </div>
                        </div>
                      </td>
                      <td>
                        <div className="contact-info">
                          <span>{v.email}</span>
                          {v.phone && <span className="phone">📱 {v.phone}</span>}
                        </div>
                      </td>
                      <td>
                        {v.badges && v.badges.length > 0 ? (
                          <div className="badge-stack">
                            {v.badges.slice(0, 3).map((badge, idx) => (
                              <div
                                key={idx}
                                className="badge-item"
                                style={{
                                  zIndex: (v.badges?.length || 0) - idx,
                                  marginLeft: idx > 0 ? '-8px' : '0'
                                }}
                                title={badge}
                              >
                                🏅
                              </div>
                            ))}
                            {v.badges && v.badges.length > 3 && (
                              <div className="badge-count" title={`${v.badges.length - 3} more badges: ${v.badges.slice(3).join(', ')}`}>
                                +{v.badges.length - 3}
                              </div>
                            )}
                          </div>
                        ) : (
                          <span className="no-badges">0</span>
                        )}
                      </td>
                      <td>
                        <span className="status-badge approved">ACTIVE</span>
                      </td>
                      <td>
                        {v.joined_at ? new Date(v.joined_at).toLocaleDateString() : 
                         v.created_at ? new Date(v.created_at).toLocaleDateString() : 'N/A'}
                      </td>
                      <td>
                        <div className="action-buttons">
                          <button 
                            className="table-btn remove-btn"
                            onClick={() => {
                              if (window.confirm(`Are you sure you want to remove ${v.username} as a volunteer? This will change their role to regular user.`)) {
                                rejectVolunteer(v.user_id || v.id);
                              }
                            }}
                          >
                            Remove Volunteer
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}

          {/* Rejected Volunteers Section */}
          {rejectedVolunteers.length > 0 && (
            <>
              <div className="section-header">
                <h3>Rejected Applications ({rejectedVolunteers.length})</h3>
                <p className="section-subtitle">
                  Volunteer applications that were not approved
                </p>
              </div>
              <div className="table-container">
                <table className="volunteers-table">
                  <thead>
                    <tr>
                      <th>Username</th>
                      <th>Email</th>
                      <th>Applied Date</th>
                      <th>Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {rejectedVolunteers.map(v => (
                      <tr key={v.id}>
                        <td>{v.username}</td>
                        <td>{v.email}</td>
                        <td>
                          {v.joined_at ? new Date(v.joined_at).toLocaleDateString() : 
                           v.created_at ? new Date(v.created_at).toLocaleDateString() : 'N/A'}
                        </td>
                        <td>
                          <span className="status-badge rejected">REJECTED</span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </>
          )}
        </>
      )}

      {activeTab === 'users' && (
        <>
          <div className="section-header">
            <h3>User Directory ({users.length})</h3>
            <p className="section-subtitle">
              All registered users in the system
            </p>
          </div>
          
          {users.length === 0 ? (
            <div className="empty-state">
              <div className="empty-icon">👤</div>
              <h4>No Users Found</h4>
              <p>There are no registered users in the system.</p>
            </div>
          ) : (
            <div className="table-container">
              <table className="users-table">
                <thead>
                  <tr>
                    <th>User</th>
                    <th>Contact</th>
                    <th>Role</th>
                    <th>Status</th>
                    <th>Joined</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {users.map(u => (
                    <tr key={u.id}>
                      <td>
                        <div className="user-cell">
                          <div className="user-avatar">
                            {u.username.charAt(0).toUpperCase()}
                          </div>
                          <div className="user-info">
                            <strong>{u.username}</strong>
                            <span>ID: #{u.id}</span>
                          </div>
                        </div>
                      </td>
                      <td>
                        <div className="contact-info">
                          <span>{u.email}</span>
                          {u.phone && <span className="phone">📱 {u.phone}</span>}
                        </div>
                      </td>
                      <td>
                        <span className={`role-badge ${u.role}`}>
                          {u.role.toUpperCase()}
                        </span>
                      </td>
                      <td>
                        {u.role === 'volunteer' ? (
                          <span className={`status-badge ${u.approval_status || u.volunteer_status || 'pending'}`}>
                            {(u.approval_status || u.volunteer_status || 'pending').toUpperCase()}
                          </span>
                        ) : (
                          <span className="status-badge user">USER</span>
                        )}
                      </td>
                      <td>
                        {u.created_at ? new Date(u.created_at).toLocaleDateString() : 'N/A'}
                      </td>
                      <td>
                        {u.role !== 'admin' && (
                          <button 
                            className="table-btn delete-btn"
                            onClick={() => deleteUser(u.id)}
                            title="Delete user"
                          >
                            Delete User
                          </button>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default UserList;