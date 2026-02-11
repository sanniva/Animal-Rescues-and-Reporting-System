// // // // // import React, { useState, useEffect } from 'react';
// // // // // import { useNavigate, Link } from 'react-router-dom';
// // // // // import { 
// // // // //   BarChart, 
// // // // //   Bar, 
// // // // //   XAxis, 
// // // // //   YAxis, 
// // // // //   Tooltip, 
// // // // //   ResponsiveContainer, 
// // // // //   Cell 
// // // // // } from 'recharts';
// // // // // import { useAuth } from '../../context/AuthContext'; 
// // // // // import './Dashboard.css';

// // // // // interface Report {
// // // // //   id: string;
// // // // //   userId: string;
// // // // //   animalType: string;
// // // // //   description: string;
// // // // //   location: string;
// // // // //   photoUrl: string;
// // // // //   condition: 'critical' | 'moderate' | 'mild';
// // // // //   status: 'submitted' | 'in-progress' | 'completed';
// // // // //   assignedTo: string | null;
// // // // //   createdAt: string;
// // // // // }

// // // // // const MOCK_REPORTS: Report[] = [
// // // // //   {
// // // // //     id: '1',
// // // // //     userId: '3',
// // // // //     animalType: 'Dog',
// // // // //     description: 'Injured stray dog found near Central Park',
// // // // //     location: 'Central Park, NYC',
// // // // //     photoUrl: 'https://images.unsplash.com/photo-1552053831-71594a27632d',
// // // // //     condition: 'critical',
// // // // //     status: 'in-progress',
// // // // //     assignedTo: '2',
// // // // //     createdAt: new Date('2024-03-10').toISOString(),
// // // // //   },
// // // // //   {
// // // // //     id: '2',
// // // // //     userId: '3',
// // // // //     animalType: 'Cat',
// // // // //     description: 'Kitten stuck in tree for 2 days',
// // // // //     location: 'Brooklyn Heights',
// // // // //     photoUrl: 'https://images.unsplash.com/photo-1514888286974-6d03bde4ba14',
// // // // //     condition: 'moderate',
// // // // //     status: 'submitted',
// // // // //     assignedTo: null,
// // // // //     createdAt: new Date('2024-03-11').toISOString(),
// // // // //   },
// // // // //   {
// // // // //     id: '3',
// // // // //     userId: '3',
// // // // //     animalType: 'Bird',
// // // // //     description: 'Bird with broken wing in backyard',
// // // // //     location: 'Queens Botanical Garden',
// // // // //     photoUrl: 'https://images.unsplash.com/photo-1522926193341-e9ffd686c60f',
// // // // //     condition: 'mild',
// // // // //     status: 'completed',
// // // // //     assignedTo: '2',
// // // // //     createdAt: new Date('2024-03-05').toISOString(),
// // // // //   },
// // // // // ];

// // // // // export const Dashboard: React.FC = () => {
// // // // //   const [isLoading, setIsLoading] = useState(true);
// // // // //   const navigate = useNavigate();
  
// // // // //   const { user: currentUser } = useAuth();
  
// // // // //   useEffect(() => {
// // // // //     console.log('Current User from API:', currentUser);
    
// // // // //     if (currentUser) {
// // // // //       setIsLoading(false);
// // // // //     } else {
// // // // //       const timer = setTimeout(() => {
// // // // //         setIsLoading(false);
// // // // //       }, 1000);
// // // // //       return () => clearTimeout(timer);
// // // // //     }
// // // // //   }, [currentUser]);
  
// // // // //   const getUserRole = (user: any): string => {
// // // // //     if (!user) return 'user';
    
// // // // //     if (user.role && typeof user.role === 'object' && user.role.role_name) {
// // // // //       return user.role.role_name.toLowerCase();
// // // // //     }
    
// // // // //     if (user.role_name) {
// // // // //       return user.role_name.toLowerCase();
// // // // //     }
    
// // // // //     if (user.role_id) {
// // // // //       if (user.role_id === 3) return 'admin';
// // // // //       if (user.role_id === 2) return 'volunteer';
// // // // //       if (user.role_id === 1) return 'user';
// // // // //     }
    
// // // // //     if (user.email === 'admin@example.com') return 'admin';
// // // // //     if (user.email === 'volunteer@example.com') return 'volunteer';
    
// // // // //     return 'user';
// // // // //   };
  
// // // // //   const getVolunteerStatus = (user: any) => {
// // // // //     if (user.volunteerStatus) {
// // // // //       return user.volunteerStatus;
// // // // //     }
    
// // // // //     if (user.role_id === 2) {
// // // // //       return 'approved';
// // // // //     }
    
// // // // //     return null;
// // // // //   };

// // // // //   useEffect(() => {
// // // // //     if (!isLoading && !currentUser) {
// // // // //       navigate('/login');
// // // // //     }
// // // // //   }, [currentUser, navigate, isLoading]);

// // // // //   if (isLoading) {
// // // // //     return (
// // // // //       <div className="dashboard-wrapper">
// // // // //         <div className="no-access">
// // // // //           <h2>Loading...</h2>
// // // // //           <p>Please wait while we load your dashboard...</p>
// // // // //         </div>
// // // // //       </div>
// // // // //     );
// // // // //   }

// // // // //   if (!currentUser) {
// // // // //     return (
// // // // //       <div className="dashboard-wrapper">
// // // // //         <div className="no-access">
// // // // //           <h2>Access Denied</h2>
// // // // //           <p>Please log in to view the dashboard.</p>
// // // // //           <Link to="/login" className="login-link">
// // // // //             Go to Login
// // // // //           </Link>
// // // // //         </div>
// // // // //       </div>
// // // // //     );
// // // // //   }

// // // // //   const userRole = getUserRole(currentUser);
// // // // //   const volunteerStatus = getVolunteerStatus(currentUser);
  
// // // // //   console.log('Final User Role:', userRole);
// // // // //   console.log('Final Volunteer Status:', volunteerStatus);

// // // // //   const getStats = () => {
// // // // //     const totalReports = MOCK_REPORTS.length;
// // // // //     const completedRescues = MOCK_REPORTS.filter(r => r.status === 'completed').length;
// // // // //     const activeVolunteers = 1;
// // // // //     const pendingApprovals = 0;
    
// // // // //     const userId = (currentUser as any).user_id?.toString() || '';
// // // // //     console.log('Current user ID:', userId);
    
// // // // //     const myReports = MOCK_REPORTS.filter(r => r.userId === userId);
// // // // //     const myCompletedTasks = MOCK_REPORTS.filter(r => r.assignedTo === userId && r.status === 'completed').length;

// // // // //     return {
// // // // //       totalReports,
// // // // //       completedRescues,
// // // // //       activeVolunteers,
// // // // //       pendingApprovals,
// // // // //       myReports: myReports.length,
// // // // //       myCompletedTasks,
// // // // //     };
// // // // //   };

// // // // //   const stats = getStats();

// // // // //   return (
// // // // //     <div className="dashboard-content">
// // // // //       {userRole === 'admin' ? (
// // // // //         <AdminDashboard stats={stats} />
// // // // //       ) : userRole === 'volunteer' ? (
// // // // //         volunteerStatus === 'pending' ? (
// // // // //           <PendingVolunteerDashboard user={currentUser} />
// // // // //         ) : volunteerStatus === 'rejected' ? (
// // // // //           <RejectedVolunteerDashboard />
// // // // //         ) : (
// // // // //           <VolunteerDashboard 
// // // // //             user={{...currentUser, role: userRole}} 
// // // // //             stats={stats} 
// // // // //             reports={MOCK_REPORTS} 
// // // // //           />
// // // // //         )
// // // // //       ) : (
// // // // //         <UserDashboard 
// // // // //           user={{...currentUser, role: userRole}} 
// // // // //           stats={stats} 
// // // // //           reports={MOCK_REPORTS} 
// // // // //         />
// // // // //       )}
// // // // //     </div>
// // // // //   );
// // // // // };

// // // // // const AdminDashboard: React.FC<{ stats: any }> = ({ stats }) => {
// // // // //   const chartData = [
// // // // //     { name: 'Reports', value: stats.totalReports },
// // // // //     { name: 'Rescued', value: stats.completedRescues },
// // // // //     { name: 'Volunteers', value: stats.activeVolunteers },
// // // // //   ];
// // // // //   const COLORS = ['#A67C52', '#2D5A27', '#7D8C5A'];

// // // // //   return (
// // // // //     <div className="dashboard-wrapper animate-fade-in">
// // // // //       <div className="admin-dashboard">
// // // // //         <h2 className="admin-header">ResQAll Global Overview</h2>
        
// // // // //         <div className="admin-stats-grid">
// // // // //           <div className="stat-card">
// // // // //             <p className="stat-label">Pending Operatives</p>
// // // // //             <div className="stat-content">
// // // // //               <div className="stat-value stat-value-earth">{stats.pendingApprovals}</div>
// // // // //               {stats.pendingApprovals > 0 && (
// // // // //                 <Link to="/admin/volunteers" className="stat-alert animate-pulse">
// // // // //                   Review Now
// // // // //                 </Link>
// // // // //               )}
// // // // //             </div>
// // // // //           </div>
          
// // // // //           <div className="stat-card">
// // // // //             <p className="stat-label">Field Rangers</p>
// // // // //             <div className="stat-value stat-value-emerald">{stats.activeVolunteers}</div>
// // // // //           </div>
          
// // // // //           <div className="stat-card">
// // // // //             <p className="stat-label">Mission Reports</p>
// // // // //             <div className="stat-value stat-value-emerald">{stats.totalReports}</div>
// // // // //           </div>
          
// // // // //           <div className="stat-card">
// // // // //             <p className="stat-label">Saved Lives</p>
// // // // //             <div className="stat-value stat-value-moss">{stats.completedRescues}</div>
// // // // //           </div>
// // // // //         </div>

// // // // //         <div className="admin-charts-grid">
// // // // //           <div className="chart-container">
// // // // //             <h3 className="chart-title">Operational Metrics</h3>
            
// // // // //             <div className="recharts-wrapper">
// // // // //               <ResponsiveContainer width="100%" height={300}>
// // // // //                 <BarChart data={chartData}>
// // // // //                   <XAxis dataKey="name" axisLine={false} tickLine={false} />
// // // // //                   <YAxis axisLine={false} tickLine={false} />
// // // // //                   <Tooltip 
// // // // //                     cursor={{fill: '#F5F1E8'}} 
// // // // //                     formatter={(value) => [value, 'Count']}
// // // // //                     labelFormatter={(label) => `${label}`}
// // // // //                   />
// // // // //                   <Bar 
// // // // //                     dataKey="value" 
// // // // //                     radius={[10, 10, 0, 0]}
// // // // //                     barSize={60}
// // // // //                   >
// // // // //                     {chartData.map((entry, index) => (
// // // // //                       <Cell 
// // // // //                         key={`cell-${index}`} 
// // // // //                         fill={COLORS[index % COLORS.length]} 
// // // // //                       />
// // // // //                     ))}
// // // // //                   </Bar>
// // // // //                 </BarChart>
// // // // //               </ResponsiveContainer>
// // // // //             </div>
// // // // //           </div>
          
// // // // //           <div className="volunteer-alert-box">
// // // // //             <div className="volunteer-alert-icon">
// // // // //               ⚠️
// // // // //             </div>
// // // // //             <h3 className="volunteer-alert-title">Volunteer Queue</h3>
// // // // //             <p className="volunteer-alert-text">
// // // // //               There are {stats.pendingApprovals} rangers waiting for activation to join the ResQAll squad.
// // // // //             </p>
// // // // //             <Link to="/admin/volunteers" className="volunteer-alert-btn">
// // // // //               Manage Operatives
// // // // //             </Link>
// // // // //           </div>
// // // // //         </div>
// // // // //       </div>
// // // // //     </div>
// // // // //   );
// // // // // };

// // // // // const VolunteerDashboard: React.FC<{ user: any, stats: any, reports: Report[] }> = ({ user, stats, reports }) => {
// // // // //   const userId = user.user_id?.toString() || '';
// // // // //   const myTasks = reports.filter(r => r.assignedTo === userId);
// // // // //   const inProgressTask = myTasks.find(t => t.status === 'in-progress');
// // // // //   const pendingTasks = myTasks.filter(t => t.status === 'submitted');

// // // // //   return (
// // // // //     <div className="dashboard-wrapper animate-fade-in">
// // // // //       <div className="volunteer-dashboard">
// // // // //         <div className="volunteer-header-grid">
// // // // //           <div className="volunteer-welcome-card">
// // // // //             <div className="volunteer-welcome-paw">
// // // // //               🐾
// // // // //             </div>
// // // // //             <h2 className="volunteer-welcome-title">Welcome back, Operative {user.username}</h2>
// // // // //             <p className="volunteer-welcome-text">
// // // // //               Scanning sectors for animals in need. Ready for your next mission?
// // // // //             </p>
// // // // //             <div className="volunteer-welcome-btns">
// // // // //               <Link to="/tasks" className="welcome-btn welcome-btn-primary">
// // // // //                 Open Mission Board
// // // // //               </Link>
// // // // //               <Link to="/profile" className="welcome-btn welcome-btn-secondary">
// // // // //                 My Service Medals
// // // // //               </Link>
// // // // //             </div>
// // // // //           </div>

// // // // //           <div className="volunteer-stats-column">
// // // // //             <div className="volunteer-stat-card">
// // // // //               <div className="stat-info">
// // // // //                 <p className="stat-label-small">Successful Rescues</p>
// // // // //                 <p className="stat-value-large">{stats.myCompletedTasks}</p>
// // // // //               </div>
// // // // //               <div className="stat-icon stat-icon-success">
// // // // //                 ✓
// // // // //               </div>
// // // // //             </div>
            
// // // // //             <div className="volunteer-stat-card">
// // // // //               <div className="stat-info">
// // // // //                 <p className="stat-label-small">Ranger Rank</p>
// // // // //                 <p className="stat-value-medium">
// // // // //                   Volunteer
// // // // //                 </p>
// // // // //               </div>
// // // // //               <div className="stat-icon stat-icon-rank">
// // // // //                 🏆
// // // // //               </div>
// // // // //             </div>
// // // // //           </div>
// // // // //         </div>

// // // // //         <div className="mission-section">
// // // // //           <h3 className="section-header">
// // // // //             📻 Active Assignment
// // // // //           </h3>
          
// // // // //           {inProgressTask ? (
// // // // //             <div className="square-assignment-grid">
// // // // //               <div className="square-mission-card active">
// // // // //                 <div className="square-card-header">
// // // // //                   <div className="square-status-badge in-field">IN FIELD</div>
// // // // //                   <div className="square-volunteer-tag">{user.username?.toUpperCase()}</div>
// // // // //                 </div>
                
// // // // //                 <div className="square-card-content">
// // // // //                   <div className="square-mission-title">
// // // // //                     <h4 className="square-title">{inProgressTask.animalType} Mission</h4>
// // // // //                     <span className="square-condition critical">{inProgressTask.condition}</span>
// // // // //                   </div>
                  
// // // // //                   <div className="square-location">
// // // // //                     📍
// // // // //                     <span className="location-text">{inProgressTask.location}</span>
// // // // //                   </div>
                  
// // // // //                   <p className="square-description">
// // // // //                     {inProgressTask.description.length > 80 
// // // // //                       ? `${inProgressTask.description.substring(0, 80)}...` 
// // // // //                       : inProgressTask.description}
// // // // //                   </p>
                  
// // // // //                   <div className="square-actions">
// // // // //                     <Link 
// // // // //                       to={`/tasks/${inProgressTask.id}`}
// // // // //                       className="square-action-btn"
// // // // //                     >
// // // // //                       Update Report →
// // // // //                     </Link>
// // // // //                   </div>
// // // // //                 </div>
// // // // //               </div>

// // // // //               {pendingTasks.length > 0 && (
// // // // //                 <div className="square-mission-card pending">
// // // // //                   <div className="square-card-header">
// // // // //                     <div className="square-status-badge pending-badge">PENDING</div>
// // // // //                     <div className="square-count">{pendingTasks.length} waiting</div>
// // // // //                   </div>
                  
// // // // //                   <div className="square-card-content">
// // // // //                     <div className="square-mission-title">
// // // // //                       <h4 className="square-title">Queued Missions</h4>
// // // // //                       <span className="square-condition moderate">MODERATE</span>
// // // // //                     </div>
                    
// // // // //                     <div className="square-pending-list">
// // // // //                       {pendingTasks.slice(0, 2).map((task) => (
// // // // //                         <div key={task.id} className="pending-item">
// // // // //                           <span className="pending-animal">{task.animalType}</span>
// // // // //                           <span className="pending-location">
// // // // //                             📍{task.location.split(',')[0]}
// // // // //                           </span>
// // // // //                         </div>
// // // // //                       ))}
// // // // //                       {pendingTasks.length > 2 && (
// // // // //                         <div className="pending-more">
// // // // //                           +{pendingTasks.length - 2} more missions
// // // // //                         </div>
// // // // //                       )}
// // // // //                     </div>
                    
// // // // //                     <div className="square-actions">
// // // // //                       <Link to="/tasks" className="square-action-btn view-all">
// // // // //                         View All →
// // // // //                       </Link>
// // // // //                     </div>
// // // // //                   </div>
// // // // //                 </div>
// // // // //               )}
// // // // //             </div>
// // // // //           ) : (
// // // // //             <div className="square-assignment-grid">
// // // // //               <div className="square-mission-card empty">
// // // // //                 <div className="square-card-content centered">
// // // // //                   <div className="no-mission-icon">
// // // // //                     ⏰
// // // // //                   </div>
// // // // //                   <h4 className="no-mission-title">No Active Missions</h4>
// // // // //                   <p className="no-mission-text">
// // // // //                     The sector is quiet. Head to the mission board to see new reports.
// // // // //                   </p>
// // // // //                   <Link to="/tasks" className="square-action-btn primary">
// // // // //                     Go to Mission Board
// // // // //                   </Link>
// // // // //                 </div>
// // // // //               </div>

// // // // //               <div className="square-mission-card stats">
// // // // //                 <div className="square-card-content">
// // // // //                   <div className="quick-stats">
// // // // //                     <div className="quick-stat-item">
// // // // //                       <div className="quick-stat-icon">
// // // // //                         ✓
// // // // //                       </div>
// // // // //                       <div className="quick-stat-info">
// // // // //                         <div className="quick-stat-value">{stats.myCompletedTasks}</div>
// // // // //                         <div className="quick-stat-label">Rescues</div>
// // // // //                       </div>
// // // // //                     </div>
// // // // //                     <div className="quick-stat-item">
// // // // //                       <div className="quick-stat-icon">
// // // // //                         ⏰
// // // // //                       </div>
// // // // //                       <div className="quick-stat-info">
// // // // //                         <div className="quick-stat-value">{pendingTasks.length}</div>
// // // // //                         <div className="quick-stat-label">Pending</div>
// // // // //                       </div>
// // // // //                     </div>
// // // // //                     <div className="quick-stat-item">
// // // // //                       <div className="quick-stat-icon">
// // // // //                         🏆
// // // // //                       </div>
// // // // //                       <div className="quick-stat-info">
// // // // //                         <div className="quick-stat-value">0</div>
// // // // //                         <div className="quick-stat-label">Badges</div>
// // // // //                       </div>
// // // // //                     </div>
// // // // //                   </div>
// // // // //                   <Link to="/profile" className="square-action-btn secondary">
// // // // //                     View Profile
// // // // //                   </Link>
// // // // //                 </div>
// // // // //               </div>
// // // // //             </div>
// // // // //           )}
// // // // //         </div>
// // // // //       </div>
// // // // //     </div>
// // // // //   );
// // // // // };

// // // // // const PendingVolunteerDashboard: React.FC<{ user: any }> = ({ user }) => {
// // // // //   return (
// // // // //     <div className="dashboard-wrapper animate-fade-in">
// // // // //       <div className="pending-volunteer">
// // // // //         <div className="pending-icon">
// // // // //           ⏰
// // // // //         </div>
// // // // //         <h2 className="pending-title">Activation Pending</h2>
// // // // //         <p className="pending-text">
// // // // //           Thank you for joining ResQAll. Our HQ is currently reviewing your ranger profile. 
// // // // //           You will be notified via field log once approved.
// // // // //         </p>
// // // // //       </div>
// // // // //     </div>
// // // // //   );
// // // // // };

// // // // // const RejectedVolunteerDashboard: React.FC = () => {
// // // // //   return (
// // // // //     <div className="dashboard-wrapper animate-fade-in">
// // // // //       <div className="rejected-volunteer">
// // // // //         <h2 className="rejected-title">Application Status</h2>
// // // // //         <p className="rejected-text">Unfortunately, your ResQAll operative status was not approved.</p>
// // // // //       </div>
// // // // //     </div>
// // // // //   );
// // // // // };

// // // // // const UserDashboard: React.FC<{ user: any, stats: any, reports: Report[] }> = ({ user, stats, reports }) => {
// // // // //   const userId = user.user_id?.toString() || '';
// // // // //   const myReports = reports.filter(r => r.userId === userId);

// // // // //   return (
// // // // //     <div className="dashboard-wrapper animate-fade-in">
// // // // //       <div className="user-dashboard">
// // // // //         <div className="user-hero-banner">
// // // // //           <div className="user-hero-bg mask-image-gradient"></div>
// // // // //           <div className="user-hero-content">
// // // // //             <h2 className="user-hero-title">Protect the Streets</h2>
// // // // //             <p className="user-hero-text">
// // // // //               Spot an animal in distress? ResQAll rangers are on standby to respond to your report.
// // // // //             </p>
// // // // //             <Link to="/submit-report" className="user-hero-btn">
// // // // //               ⚠️ File Field Report
// // // // //             </Link>
// // // // //           </div>
// // // // //         </div>

// // // // //         <div className="user-reports-section">
// // // // //           <h3 className="user-reports-title">My Report History</h3>
          
// // // // //           <div className="user-reports-table">
// // // // //             {myReports.length > 0 ? (
// // // // //               <table className="reports-table">
// // // // //                 <thead>
// // // // //                   <tr>
// // // // //                     <th>Animal</th>
// // // // //                     <th>Location</th>
// // // // //                     <th>Date</th>
// // // // //                     <th>Status</th>
// // // // //                   </tr>
// // // // //                 </thead>
// // // // //                 <tbody>
// // // // //                   {myReports.map(report => (
// // // // //                     <tr key={report.id}>
// // // // //                       <td className="animal-type">{report.animalType}</td>
// // // // //                       <td>{report.location}</td>
// // // // //                       <td className="report-date">
// // // // //                         {new Date(report.createdAt).toLocaleDateString()}
// // // // //                       </td>
// // // // //                       <td>
// // // // //                         <span className={`status-badge status-badge-${report.status}`}>
// // // // //                           {report.status}
// // // // //                         </span>
// // // // //                       </td>
// // // // //                     </tr>
// // // // //                   ))}
// // // // //                 </tbody>
// // // // //               </table>
// // // // //             ) : (
// // // // //               <div className="no-reports">
// // // // //                 <p>You haven't filed any rescue reports yet.</p>
// // // // //               </div>
// // // // //             )}
// // // // //           </div>
// // // // //         </div>
// // // // //       </div>
// // // // //     </div>
// // // // //   );
// // // // // };

// // // // // export default Dashboard;


// // // // import React, { useState, useEffect } from 'react';
// // // // import { useNavigate, Link } from 'react-router-dom';
// // // // import { 
// // // //   BarChart, 
// // // //   Bar, 
// // // //   XAxis, 
// // // //   YAxis, 
// // // //   Tooltip, 
// // // //   ResponsiveContainer, 
// // // //   Cell 
// // // // } from 'recharts';
// // // // import { useAuth } from '../../context/AuthContext'; 
// // // // import './Dashboard.css';

// // // // interface Report {
// // // //   id: string;
// // // //   userId: string;
// // // //   animalType: string;
// // // //   description: string;
// // // //   location: string;
// // // //   photoUrl: string;
// // // //   condition: 'critical' | 'moderate' | 'mild';
// // // //   status: 'submitted' | 'in-progress' | 'completed';
// // // //   assignedTo: string | null;
// // // //   createdAt: string;
// // // // }

// // // // const MOCK_REPORTS: Report[] = [
// // // //   {
// // // //     id: '1',
// // // //     userId: '3',
// // // //     animalType: 'Dog',
// // // //     description: 'Injured stray dog found near Central Park',
// // // //     location: 'Central Park, NYC',
// // // //     photoUrl: 'https://images.unsplash.com/photo-1552053831-71594a27632d',
// // // //     condition: 'critical',
// // // //     status: 'in-progress',
// // // //     assignedTo: '2',
// // // //     createdAt: new Date('2024-03-10').toISOString(),
// // // //   },
// // // //   {
// // // //     id: '2',
// // // //     userId: '3',
// // // //     animalType: 'Cat',
// // // //     description: 'Kitten stuck in tree for 2 days',
// // // //     location: 'Brooklyn Heights',
// // // //     photoUrl: 'https://images.unsplash.com/photo-1514888286974-6d03bde4ba14',
// // // //     condition: 'moderate',
// // // //     status: 'submitted',
// // // //     assignedTo: null,
// // // //     createdAt: new Date('2024-03-11').toISOString(),
// // // //   },
// // // //   {
// // // //     id: '3',
// // // //     userId: '3',
// // // //     animalType: 'Bird',
// // // //     description: 'Bird with broken wing in backyard',
// // // //     location: 'Queens Botanical Garden',
// // // //     photoUrl: 'https://images.unsplash.com/photo-1522926193341-e9ffd686c60f',
// // // //     condition: 'mild',
// // // //     status: 'completed',
// // // //     assignedTo: '2',
// // // //     createdAt: new Date('2024-03-05').toISOString(),
// // // //   },
// // // // ];

// // // // export const Dashboard: React.FC = () => {
// // // //   const [isLoading, setIsLoading] = useState(true);
// // // //   const navigate = useNavigate();
  
// // // //   const { user: currentUser } = useAuth();
  
// // // //   useEffect(() => {
// // // //     console.log('=== DASHBOARD LOADING ===');
// // // //     console.log('Current User object:', currentUser);
    
// // // //     if (currentUser) {
// // // //       setIsLoading(false);
// // // //     } else {
// // // //       const timer = setTimeout(() => {
// // // //         setIsLoading(false);
// // // //       }, 1000);
// // // //       return () => clearTimeout(timer);
// // // //     }
// // // //   }, [currentUser]);
  
// // // //   // Get volunteer status - FIXED VERSION
// // // //   const getVolunteerStatus = (user: any): string | null => {
// // // //     if (!user) return null;

// // // //     console.log('Checking volunteer status for user:', {
// // // //       user_id: user.user_id,
// // // //       // Check both ways to access role_id
// // // //       role_id_from_role: user.role?.role_id,
// // // //       role_id_direct: user.role_id,
// // // //       approval_status_id: user.approval_status_id,
// // // //       volunteer: user.volunteer,
// // // //       volunteer_status: user.volunteer_status
// // // //     });

// // // //     // 1. Check for direct approval_status_id (from AuthContext)
// // // //     if (user.approval_status_id) {
// // // //       console.log('Found direct approval_status_id:', user.approval_status_id);
// // // //       if (user.approval_status_id === 1) return 'pending';
// // // //       if (user.approval_status_id === 2) return 'approved';
// // // //       if (user.approval_status_id === 3) return 'rejected';
// // // //     }

// // // //     // 2. Check volunteer object (from AuthContext)
// // // //     if (user.volunteer) {
// // // //       console.log('Found volunteer object:', user.volunteer);
      
// // // //       if (user.volunteer.approval_status_id) {
// // // //         if (user.volunteer.approval_status_id === 1) return 'pending';
// // // //         if (user.volunteer.approval_status_id === 2) return 'approved';
// // // //         if (user.volunteer.approval_status_id === 3) return 'rejected';
// // // //       }
      
// // // //       if (user.volunteer.status) {
// // // //         return user.volunteer.status.toLowerCase();
// // // //       }
// // // //     }

// // // //     // 3. Check volunteer_status direct field
// // // //     if (user.volunteer_status) {
// // // //       return user.volunteer_status.toLowerCase();
// // // //     }

// // // //     console.log('No volunteer status found');
// // // //     return null;
// // // //   };
  
// // // //   // Get user role - FIXED VERSION
// // // //   const getUserRole = (user: any): string => {
// // // //     if (!user) return 'user';

// // // //     const volunteerStatus = getVolunteerStatus(user);
    
// // // //     // Get role_id from both possible locations
// // // //     const roleId = user.role?.role_id || user.role_id;
    
// // // //     console.log('Determining role for user:', {
// // // //       user_id: user.user_id,
// // // //       role_id: roleId,
// // // //       volunteerStatus,
// // // //       role_name: user.role?.role_name,
// // // //       role_object: user.role
// // // //     });

// // // //     // Admin check
// // // //     if (roleId === 3) {
// // // //       console.log('User is admin (role_id = 3)');
// // // //       return 'admin';
// // // //     }

// // // //     // Volunteer check - ONLY if approved
// // // //     if (roleId === 2) {
// // // //       if (volunteerStatus === 'approved') {
// // // //         console.log('User is APPROVED volunteer (role_id=2, status=approved)');
// // // //         return 'volunteer';
// // // //       } else if (volunteerStatus === 'pending' || volunteerStatus === 'rejected') {
// // // //         console.log('User has role_id=2 but status is', volunteerStatus, '- showing as regular user');
// // // //         return 'user';
// // // //       }
// // // //     }

// // // //     // Check role name from role object
// // // //     if (user.role?.role_name) {
// // // //       console.log('Using role.role_name:', user.role.role_name);
// // // //       return user.role.role_name;
// // // //     }

// // // //     console.log('Defaulting to user role');
// // // //     return 'user';
// // // //   };

// // // //   useEffect(() => {
// // // //     if (!isLoading && !currentUser) {
// // // //       navigate('/login');
// // // //     }
// // // //   }, [currentUser, navigate, isLoading]);

// // // //   if (isLoading) {
// // // //     return (
// // // //       <div className="dashboard-wrapper">
// // // //         <div className="no-access">
// // // //           <h2>Loading...</h2>
// // // //           <p>Please wait while we load your dashboard...</p>
// // // //         </div>
// // // //       </div>
// // // //     );
// // // //   }

// // // //   if (!currentUser) {
// // // //     return (
// // // //       <div className="dashboard-wrapper">
// // // //         <div className="no-access">
// // // //           <h2>Access Denied</h2>
// // // //           <p>Please log in to view the dashboard.</p>
// // // //           <Link to="/login" className="login-link">
// // // //             Go to Login
// // // //           </Link>
// // // //         </div>
// // // //       </div>
// // // //     );
// // // //   }

// // // //   const userRole = getUserRole(currentUser);
// // // //   const volunteerStatus = getVolunteerStatus(currentUser);
  
// // // //   console.log('=== FINAL DASHBOARD DETERMINATION ===');
// // // //   console.log('User ID:', currentUser.user_id);
// // // //   console.log('Role Object:', currentUser.role);
// // // //   console.log('Role ID (from role object):', currentUser.role?.role_id);
// // // //   console.log('Role Name:', currentUser.role?.role_name);
// // // //   console.log('Approval Status ID:', currentUser.approval_status_id);
// // // //   console.log('Volunteer Object:', currentUser.volunteer);
// // // //   console.log('Final User Role:', userRole);
// // // //   console.log('Final Volunteer Status:', volunteerStatus);
// // // //   console.log('=====================================');

// // // //   const getStats = () => {
// // // //     const totalReports = MOCK_REPORTS.length;
// // // //     const completedRescues = MOCK_REPORTS.filter(r => r.status === 'completed').length;
// // // //     const activeVolunteers = 1;
// // // //     const pendingApprovals = 0;
    
// // // //     const userId = currentUser.user_id?.toString() || '';
    
// // // //     const myReports = MOCK_REPORTS.filter(r => r.userId === userId);
// // // //     const myCompletedTasks = MOCK_REPORTS.filter(r => r.assignedTo === userId && r.status === 'completed').length;

// // // //     return {
// // // //       totalReports,
// // // //       completedRescues,
// // // //       activeVolunteers,
// // // //       pendingApprovals,
// // // //       myReports: myReports.length,
// // // //       myCompletedTasks,
// // // //     };
// // // //   };

// // // //   const stats = getStats();

// // // //   // Clean rendering logic
// // // //   const renderDashboard = () => {
// // // //     console.log('Rendering dashboard with:', { userRole, volunteerStatus });
    
// // // //     // Admin
// // // //     if (userRole === 'admin') {
// // // //       return <AdminDashboard stats={stats} />;
// // // //     }
    
// // // //     // Approved Volunteer
// // // //     if (userRole === 'volunteer') {
// // // //       return <VolunteerDashboard 
// // // //         user={{...currentUser, role: userRole}} 
// // // //         stats={stats} 
// // // //         reports={MOCK_REPORTS} 
// // // //       />;
// // // //     }
    
// // // //     // User with pending volunteer application
// // // //     if (volunteerStatus === 'pending') {
// // // //       return <PendingVolunteerDashboard user={currentUser} />;
// // // //     }
    
// // // //     // User with rejected volunteer application
// // // //     if (volunteerStatus === 'rejected') {
// // // //       return <RejectedVolunteerDashboard />;
// // // //     }
    
// // // //     // Regular user (no volunteer status or not applied)
// // // //     return <UserDashboard 
// // // //       user={{...currentUser, role: userRole}} 
// // // //       stats={stats} 
// // // //       reports={MOCK_REPORTS} 
// // // //     />;
// // // //   };

// // // //   return (
// // // //     <div className="dashboard-content">
// // // //       {renderDashboard()}
// // // //     </div>
// // // //   );
// // // // };

// // // // // Rest of the components remain the same...
// // // // const AdminDashboard: React.FC<{ stats: any }> = ({ stats }) => {
// // // //   const chartData = [
// // // //     { name: 'Reports', value: stats.totalReports },
// // // //     { name: 'Rescued', value: stats.completedRescues },
// // // //     { name: 'Volunteers', value: stats.activeVolunteers },
// // // //   ];
// // // //   const COLORS = ['#A67C52', '#2D5A27', '#7D8C5A'];

// // // //   return (
// // // //     <div className="dashboard-wrapper animate-fade-in">
// // // //       <div className="admin-dashboard">
// // // //         <h2 className="admin-header">ResQAll Global Overview</h2>
        
// // // //         <div className="admin-stats-grid">
// // // //           <div className="stat-card">
// // // //             <p className="stat-label">Pending Operatives</p>
// // // //             <div className="stat-content">
// // // //               <div className="stat-value stat-value-earth">{stats.pendingApprovals}</div>
// // // //               {stats.pendingApprovals > 0 && (
// // // //                 <Link to="/admin/volunteers" className="stat-alert animate-pulse">
// // // //                   Review Now
// // // //                 </Link>
// // // //               )}
// // // //             </div>
// // // //           </div>
          
// // // //           <div className="stat-card">
// // // //             <p className="stat-label">Field Rangers</p>
// // // //             <div className="stat-value stat-value-emerald">{stats.activeVolunteers}</div>
// // // //           </div>
          
// // // //           <div className="stat-card">
// // // //             <p className="stat-label">Mission Reports</p>
// // // //             <div className="stat-value stat-value-emerald">{stats.totalReports}</div>
// // // //           </div>
          
// // // //           <div className="stat-card">
// // // //             <p className="stat-label">Saved Lives</p>
// // // //             <div className="stat-value stat-value-moss">{stats.completedRescues}</div>
// // // //           </div>
// // // //         </div>

// // // //         <div className="admin-charts-grid">
// // // //           <div className="chart-container">
// // // //             <h3 className="chart-title">Operational Metrics</h3>
            
// // // //             <div className="recharts-wrapper">
// // // //               <ResponsiveContainer width="100%" height={300}>
// // // //                 <BarChart data={chartData}>
// // // //                   <XAxis dataKey="name" axisLine={false} tickLine={false} />
// // // //                   <YAxis axisLine={false} tickLine={false} />
// // // //                   <Tooltip 
// // // //                     cursor={{fill: '#F5F1E8'}} 
// // // //                     formatter={(value) => [value, 'Count']}
// // // //                     labelFormatter={(label) => `${label}`}
// // // //                   />
// // // //                   <Bar 
// // // //                     dataKey="value" 
// // // //                     radius={[10, 10, 0, 0]}
// // // //                     barSize={60}
// // // //                   >
// // // //                     {chartData.map((entry, index) => (
// // // //                       <Cell 
// // // //                         key={`cell-${index}`} 
// // // //                         fill={COLORS[index % COLORS.length]} 
// // // //                       />
// // // //                     ))}
// // // //                   </Bar>
// // // //                 </BarChart>
// // // //               </ResponsiveContainer>
// // // //             </div>
// // // //           </div>
          
// // // //           <div className="volunteer-alert-box">
// // // //             <div className="volunteer-alert-icon">
// // // //               ⚠️
// // // //             </div>
// // // //             <h3 className="volunteer-alert-title">Volunteer Queue</h3>
// // // //             <p className="volunteer-alert-text">
// // // //               There are {stats.pendingApprovals} rangers waiting for activation to join the ResQAll squad.
// // // //             </p>
// // // //             <Link to="/admin/volunteers" className="volunteer-alert-btn">
// // // //               Manage Operatives
// // // //             </Link>
// // // //           </div>
// // // //         </div>
// // // //       </div>
// // // //     </div>
// // // //   );
// // // // };

// // // // const VolunteerDashboard: React.FC<{ user: any, stats: any, reports: Report[] }> = ({ user, stats, reports }) => {
// // // //   const userId = user.user_id?.toString() || '';
// // // //   const myTasks = reports.filter(r => r.assignedTo === userId);
// // // //   const inProgressTask = myTasks.find(t => t.status === 'in-progress');
// // // //   const pendingTasks = myTasks.filter(t => t.status === 'submitted');

// // // //   return (
// // // //     <div className="dashboard-wrapper animate-fade-in">
// // // //       <div className="volunteer-dashboard">
// // // //         <div className="volunteer-header-grid">
// // // //           <div className="volunteer-welcome-card">
// // // //             <div className="volunteer-welcome-paw">
// // // //               🐾
// // // //             </div>
// // // //             <h2 className="volunteer-welcome-title">Welcome back, Operative {user.username}</h2>
// // // //             <p className="volunteer-welcome-text">
// // // //               Scanning sectors for animals in need. Ready for your next mission?
// // // //             </p>
// // // //             <div className="volunteer-welcome-btns">
// // // //               <Link to="/tasks" className="welcome-btn welcome-btn-primary">
// // // //                 Open Mission Board
// // // //               </Link>
// // // //               <Link to="/profile" className="welcome-btn welcome-btn-secondary">
// // // //                 My Service Medals
// // // //               </Link>
// // // //             </div>
// // // //           </div>

// // // //           <div className="volunteer-stats-column">
// // // //             <div className="volunteer-stat-card">
// // // //               <div className="stat-info">
// // // //                 <p className="stat-label-small">Successful Rescues</p>
// // // //                 <p className="stat-value-large">{stats.myCompletedTasks}</p>
// // // //               </div>
// // // //               <div className="stat-icon stat-icon-success">
// // // //                 ✓
// // // //               </div>
// // // //             </div>
            
// // // //             <div className="volunteer-stat-card">
// // // //               <div className="stat-info">
// // // //                 <p className="stat-label-small">Ranger Rank</p>
// // // //                 <p className="stat-value-medium">
// // // //                   Volunteer
// // // //                 </p>
// // // //               </div>
// // // //               <div className="stat-icon stat-icon-rank">
// // // //                 🏆
// // // //               </div>
// // // //             </div>
// // // //           </div>
// // // //         </div>

// // // //         <div className="mission-section">
// // // //           <h3 className="section-header">
// // // //             📻 Active Assignment
// // // //           </h3>
          
// // // //           {inProgressTask ? (
// // // //             <div className="square-assignment-grid">
// // // //               <div className="square-mission-card active">
// // // //                 <div className="square-card-header">
// // // //                   <div className="square-status-badge in-field">IN FIELD</div>
// // // //                   <div className="square-volunteer-tag">{user.username?.toUpperCase()}</div>
// // // //                 </div>
                
// // // //                 <div className="square-card-content">
// // // //                   <div className="square-mission-title">
// // // //                     <h4 className="square-title">{inProgressTask.animalType} Mission</h4>
// // // //                     <span className="square-condition critical">{inProgressTask.condition}</span>
// // // //                   </div>
                  
// // // //                   <div className="square-location">
// // // //                     📍
// // // //                     <span className="location-text">{inProgressTask.location}</span>
// // // //                   </div>
                  
// // // //                   <p className="square-description">
// // // //                     {inProgressTask.description.length > 80 
// // // //                       ? `${inProgressTask.description.substring(0, 80)}...` 
// // // //                       : inProgressTask.description}
// // // //                   </p>
                  
// // // //                   <div className="square-actions">
// // // //                     <Link 
// // // //                       to={`/tasks/${inProgressTask.id}`}
// // // //                       className="square-action-btn"
// // // //                     >
// // // //                       Update Report →
// // // //                     </Link>
// // // //                   </div>
// // // //                 </div>
// // // //               </div>

// // // //               {pendingTasks.length > 0 && (
// // // //                 <div className="square-mission-card pending">
// // // //                   <div className="square-card-header">
// // // //                     <div className="square-status-badge pending-badge">PENDING</div>
// // // //                     <div className="square-count">{pendingTasks.length} waiting</div>
// // // //                   </div>
                  
// // // //                   <div className="square-card-content">
// // // //                     <div className="square-mission-title">
// // // //                       <h4 className="square-title">Queued Missions</h4>
// // // //                       <span className="square-condition moderate">MODERATE</span>
// // // //                     </div>
                    
// // // //                     <div className="square-pending-list">
// // // //                       {pendingTasks.slice(0, 2).map((task) => (
// // // //                         <div key={task.id} className="pending-item">
// // // //                           <span className="pending-animal">{task.animalType}</span>
// // // //                           <span className="pending-location">
// // // //                             📍{task.location.split(',')[0]}
// // // //                           </span>
// // // //                         </div>
// // // //                       ))}
// // // //                       {pendingTasks.length > 2 && (
// // // //                         <div className="pending-more">
// // // //                           +{pendingTasks.length - 2} more missions
// // // //                         </div>
// // // //                       )}
// // // //                     </div>
                    
// // // //                     <div className="square-actions">
// // // //                       <Link to="/tasks" className="square-action-btn view-all">
// // // //                         View All →
// // // //                       </Link>
// // // //                     </div>
// // // //                   </div>
// // // //                 </div>
// // // //               )}
// // // //             </div>
// // // //           ) : (
// // // //             <div className="square-assignment-grid">
// // // //               <div className="square-mission-card empty">
// // // //                 <div className="square-card-content centered">
// // // //                   <div className="no-mission-icon">
// // // //                     ⏰
// // // //                   </div>
// // // //                   <h4 className="no-mission-title">No Active Missions</h4>
// // // //                   <p className="no-mission-text">
// // // //                     The sector is quiet. Head to the mission board to see new reports.
// // // //                   </p>
// // // //                   <Link to="/tasks" className="square-action-btn primary">
// // // //                     Go to Mission Board
// // // //                   </Link>
// // // //                 </div>
// // // //               </div>

// // // //               <div className="square-mission-card stats">
// // // //                 <div className="square-card-content">
// // // //                   <div className="quick-stats">
// // // //                     <div className="quick-stat-item">
// // // //                       <div className="quick-stat-icon">
// // // //                         ✓
// // // //                       </div>
// // // //                       <div className="quick-stat-info">
// // // //                         <div className="quick-stat-value">{stats.myCompletedTasks}</div>
// // // //                         <div className="quick-stat-label">Rescues</div>
// // // //                       </div>
// // // //                     </div>
// // // //                     <div className="quick-stat-item">
// // // //                       <div className="quick-stat-icon">
// // // //                         ⏰
// // // //                       </div>
// // // //                       <div className="quick-stat-info">
// // // //                         <div className="quick-stat-value">{pendingTasks.length}</div>
// // // //                         <div className="quick-stat-label">Pending</div>
// // // //                       </div>
// // // //                     </div>
// // // //                     <div className="quick-stat-item">
// // // //                       <div className="quick-stat-icon">
// // // //                         🏆
// // // //                       </div>
// // // //                       <div className="quick-stat-info">
// // // //                         <div className="quick-stat-value">0</div>
// // // //                         <div className="quick-stat-label">Badges</div>
// // // //                       </div>
// // // //                     </div>
// // // //                   </div>
// // // //                   <Link to="/profile" className="square-action-btn secondary">
// // // //                     View Profile
// // // //                   </Link>
// // // //                 </div>
// // // //               </div>
// // // //             </div>
// // // //           )}
// // // //         </div>
// // // //       </div>
// // // //     </div>
// // // //   );
// // // // };

// // // // const PendingVolunteerDashboard: React.FC<{ user: any }> = ({ user }) => {
// // // //   return (
// // // //     <div className="dashboard-wrapper animate-fade-in">
// // // //       <div className="pending-volunteer">
// // // //         <div className="pending-icon">
// // // //           ⏰
// // // //         </div>
// // // //         <h2 className="pending-title">Activation Pending</h2>
// // // //         <p className="pending-text">
// // // //           Thank you for joining ResQAll. Our HQ is currently reviewing your ranger profile. 
// // // //           You will be notified via field log once approved.
// // // //         </p>
// // // //       </div>
// // // //     </div>
// // // //   );
// // // // };

// // // // const RejectedVolunteerDashboard: React.FC = () => {
// // // //   return (
// // // //     <div className="dashboard-wrapper animate-fade-in">
// // // //       <div className="rejected-volunteer">
// // // //         <h2 className="rejected-title">Application Status</h2>
// // // //         <p className="rejected-text">Unfortunately, your ResQAll operative status was not approved.</p>
// // // //       </div>
// // // //     </div>
// // // //   );
// // // // };

// // // // const UserDashboard: React.FC<{ user: any, stats: any, reports: Report[] }> = ({ user, stats, reports }) => {
// // // //   const userId = user.user_id?.toString() || '';
// // // //   const myReports = reports.filter(r => r.userId === userId);

// // // //   return (
// // // //     <div className="dashboard-wrapper animate-fade-in">
// // // //       <div className="user-dashboard">
// // // //         <div className="user-hero-banner">
// // // //           <div className="user-hero-bg mask-image-gradient"></div>
// // // //           <div className="user-hero-content">
// // // //             <h2 className="user-hero-title">Protect the Streets</h2>
// // // //             <p className="user-hero-text">
// // // //               Spot an animal in distress? ResQAll rangers are on standby to respond to your report.
// // // //             </p>
// // // //             <Link to="/submit-report" className="user-hero-btn">
// // // //               ⚠️ File Field Report
// // // //             </Link>
// // // //           </div>
// // // //         </div>

// // // //         <div className="user-reports-section">
// // // //           <h3 className="user-reports-title">My Report History</h3>
          
// // // //           <div className="user-reports-table">
// // // //             {myReports.length > 0 ? (
// // // //               <table className="reports-table">
// // // //                 <thead>
// // // //                   <tr>
// // // //                     <th>Animal</th>
// // // //                     <th>Location</th>
// // // //                     <th>Date</th>
// // // //                     <th>Status</th>
// // // //                   </tr>
// // // //                 </thead>
// // // //                 <tbody>
// // // //                   {myReports.map(report => (
// // // //                     <tr key={report.id}>
// // // //                       <td className="animal-type">{report.animalType}</td>
// // // //                       <td>{report.location}</td>
// // // //                       <td className="report-date">
// // // //                         {new Date(report.createdAt).toLocaleDateString()}
// // // //                       </td>
// // // //                       <td>
// // // //                         <span className={`status-badge status-badge-${report.status}`}>
// // // //                           {report.status}
// // // //                         </span>
// // // //                       </td>
// // // //                     </tr>
// // // //                   ))}
// // // //                 </tbody>
// // // //               </table>
// // // //             ) : (
// // // //               <div className="no-reports">
// // // //                 <p>You haven't filed any rescue reports yet.</p>
// // // //               </div>
// // // //             )}
// // // //           </div>
// // // //         </div>
// // // //       </div>
// // // //     </div>
// // // //   );
// // // // };

// // // // export default Dashboard;

// // // // import React, { useState, useEffect } from 'react';
// // // // import { useNavigate, Link } from 'react-router-dom';
// // // // import { 
// // // //   BarChart, 
// // // //   Bar, 
// // // //   XAxis, 
// // // //   YAxis, 
// // // //   Tooltip, 
// // // //   ResponsiveContainer, 
// // // //   Cell 
// // // // } from 'recharts';
// // // // import { useAuth } from '../../context/AuthContext'; 
// // // // import './Dashboard.css';

// // // // interface Report {
// // // //   report_id: number;
// // // //   user_id: number;
// // // //   animal_type: string;
// // // //   animal_condition: string;
// // // //   description: string;
// // // //   location_address: string;
// // // //   status_id: number;
// // // //   submitted_at: string;
// // // //   reporter_name?: string;
// // // //   user_note?: string;
// // // // }

// // // // interface Status {
// // // //   status_id: number;
// // // //   status_name: string;
// // // // }

// // // // export const Dashboard: React.FC = () => {
// // // //   const [isLoading, setIsLoading] = useState(true);
// // // //   const [reports, setReports] = useState<Report[]>([]);
// // // //   const [reportsLoading, setReportsLoading] = useState(false);
// // // //   const [statuses, setStatuses] = useState<Status[]>([]);
// // // //   const [stats, setStats] = useState({
// // // //     totalReports: 0,
// // // //     completedRescues: 0,
// // // //     activeVolunteers: 0,
// // // //     pendingApprovals: 0,
// // // //     myReports: 0,
// // // //     myCompletedTasks: 0,
// // // //   });
// // // //   const navigate = useNavigate();
  
// // // //   const { user: currentUser } = useAuth();
  
// // // //   const fetchStatuses = async () => {
// // // //     try {
// // // //       const token = localStorage.getItem('token');
// // // //       if (!token) {
// // // //         console.error('No token found for status fetch');
// // // //         return;
// // // //       }
      
// // // //       const response = await fetch('/api/status', {
// // // //         method: 'GET',
// // // //         headers: {
// // // //           'Authorization': `Bearer ${token}`,
// // // //           'Content-Type': 'application/json',
// // // //         },
// // // //       });
      
// // // //       if (response.ok) {
// // // //         const data = await response.json();
// // // //         setStatuses(data.data || []);
// // // //       }
// // // //     } catch (error) {
// // // //       console.error('Error fetching statuses:', error);
// // // //       setStatuses([
// // // //         { status_id: 1, status_name: 'Submitted' },
// // // //         { status_id: 2, status_name: 'Assigned' },
// // // //         { status_id: 3, status_name: 'In Progress' },
// // // //         { status_id: 4, status_name: 'Completed' },
// // // //         { status_id: 5, status_name: 'Declined' },
// // // //       ]);
// // // //     }
// // // //   };

// // // //   const loadReports = async () => {
// // // //     if (!currentUser) return;
    
// // // //     setReportsLoading(true);
// // // //     try {
// // // //       // Get token from localStorage
// // // //       const token = localStorage.getItem('token');
      
// // // //       // Check if token exists
// // // //       if (!token) {
// // // //         console.error('No token found in localStorage');
// // // //         throw new Error('Authentication token missing. Please log in again.');
// // // //       }
      
// // // //       const userRole = getUserRole(currentUser);
// // // //       let endpoint = '/api/reports/my-reports';
      
// // // //       if (userRole === 'admin') {
// // // //         endpoint = '/api/reports/admin/all';
// // // //       }
      
// // // //       console.log('Loading reports for user ID:', currentUser.user_id);
// // // //       console.log('Token exists:', !!token);
// // // //       console.log('API Endpoint:', endpoint);
      
// // // //       const response = await fetch(endpoint, {
// // // //         method: 'GET',
// // // //         headers: {
// // // //           'Authorization': `Bearer ${token}`,
// // // //           'Content-Type': 'application/json',
// // // //         },
// // // //       });
      
// // // //       console.log('API Response Status:', response.status);
      
// // // //       if (response.status === 401) {
// // // //         console.error('Unauthorized - Token invalid or expired');
// // // //         // Clear token and redirect to login
// // // //         localStorage.removeItem('token');
// // // //         navigate('/login');
// // // //         return;
// // // //       }
      
// // // //       if (!response.ok) {
// // // //         throw new Error(`HTTP error! status: ${response.status}`);
// // // //       }
      
// // // //       const responseData = await response.json();
// // // //       console.log('API Response Data:', responseData);
      
// // // //       const reportsData = responseData.data || [];
// // // //       console.log('Reports received:', reportsData.length);
      
// // // //       await fetchStatuses();
// // // //       setReports(reportsData);
      
// // // //       if (reportsData && reportsData.length > 0) {
// // // //         const userId = currentUser.user_id;
// // // //         const userRole = getUserRole(currentUser);
        
// // // //         const totalReports = reportsData.length;
// // // //         const completedRescues = reportsData.filter((r: Report) => r.status_id === 4).length;
// // // //         const activeVolunteers = 1;
// // // //         const pendingApprovals = 0;
        
// // // //         const myReports = reportsData.filter((r: Report) => {
// // // //           const reportUserId = Number(r.user_id);
// // // //           const currentUserId = Number(userId);
// // // //           return reportUserId === currentUserId;
// // // //         }).length;
        
// // // //         const myCompletedTasks = reportsData.filter((r: Report) => {
// // // //           if (userRole !== 'volunteer') return 0;
// // // //           return r.status_id === 4;
// // // //         }).length;

// // // //         setStats({
// // // //           totalReports,
// // // //           completedRescues,
// // // //           activeVolunteers,
// // // //           pendingApprovals,
// // // //           myReports,
// // // //           myCompletedTasks,
// // // //         });
// // // //       }
// // // //     } catch (error) {
// // // //       console.error('Error fetching reports:', error);
// // // //       setReports([]);
// // // //     } finally {
// // // //       setReportsLoading(false);
// // // //     }
// // // //   };

// // // //   useEffect(() => {
// // // //     if (currentUser) {
// // // //       setIsLoading(false);
// // // //       loadReports();
// // // //     } else {
// // // //       const timer = setTimeout(() => {
// // // //         setIsLoading(false);
// // // //       }, 1000);
// // // //       return () => clearTimeout(timer);
// // // //     }
// // // //   }, [currentUser]);
  
// // // //   const getVolunteerStatus = (user: any): string | null => {
// // // //     if (!user) return null;

// // // //     if (user.approval_status_id) {
// // // //       if (user.approval_status_id === 1) return 'pending';
// // // //       if (user.approval_status_id === 2) return 'approved';
// // // //       if (user.approval_status_id === 3) return 'rejected';
// // // //     }

// // // //     if (user.volunteer) {
// // // //       if (user.volunteer.approval_status_id) {
// // // //         if (user.volunteer.approval_status_id === 1) return 'pending';
// // // //         if (user.volunteer.approval_status_id === 2) return 'approved';
// // // //         if (user.volunteer.approval_status_id === 3) return 'rejected';
// // // //       }
      
// // // //       if (user.volunteer.status) {
// // // //         return user.volunteer.status.toLowerCase();
// // // //       }
// // // //     }

// // // //     if (user.volunteer_status) {
// // // //       return user.volunteer_status.toLowerCase();
// // // //     }

// // // //     return null;
// // // //   };
  
// // // //   const getUserRole = (user: any): string => {
// // // //     if (!user) return 'user';

// // // //     if (user.role?.role_name) {
// // // //       const roleName = user.role.role_name.toLowerCase();
      
// // // //       if (roleName === 'volunteer') {
// // // //         const volunteerStatus = getVolunteerStatus(user);
// // // //         if (volunteerStatus === 'approved') {
// // // //           return 'volunteer';
// // // //         } else {
// // // //           return 'user';
// // // //         }
// // // //       }
// // // //       return roleName;
// // // //     }

// // // //     const roleId = user.role?.role_id || user.role_id;
    
// // // //     if (roleId === 3) {
// // // //       return 'admin';
// // // //     }
    
// // // //     if (roleId === 2) {
// // // //       const volunteerStatus = getVolunteerStatus(user);
// // // //       if (volunteerStatus === 'approved') {
// // // //         return 'volunteer';
// // // //       } else {
// // // //         return 'user';
// // // //       }
// // // //     }

// // // //     return 'user';
// // // //   };

// // // //   useEffect(() => {
// // // //     if (!isLoading && !currentUser) {
// // // //       navigate('/login');
// // // //     }
// // // //   }, [currentUser, navigate, isLoading]);

// // // //   if (isLoading) {
// // // //     return (
// // // //       <div className="dashboard-wrapper">
// // // //         <div className="no-access">
// // // //           <div className="loading-spinner"></div>
// // // //           <h2>Loading...</h2>
// // // //           <p>Please wait while we load your dashboard...</p>
// // // //         </div>
// // // //       </div>
// // // //     );
// // // //   }

// // // //   if (!currentUser) {
// // // //     return (
// // // //       <div className="dashboard-wrapper">
// // // //         <div className="no-access">
// // // //           <h2>Access Denied</h2>
// // // //           <p>Please log in to view the dashboard.</p>
// // // //           <Link to="/login" className="login-link">
// // // //             Go to Login
// // // //           </Link>
// // // //         </div>
// // // //       </div>
// // // //     );
// // // //   }

// // // //   const userRole = getUserRole(currentUser);
// // // //   const volunteerStatus = getVolunteerStatus(currentUser);

// // // //   const getStatusName = (statusId: number): string => {
// // // //     const status = statuses.find(s => s.status_id === statusId);
// // // //     return status?.status_name || 'Unknown';
// // // //   };

// // // //   const getStatusClass = (statusId: number): string => {
// // // //     switch(statusId) {
// // // //       case 1: return 'submitted';
// // // //       case 2: return 'assigned';
// // // //       case 3: return 'in-progress';
// // // //       case 4: return 'completed';
// // // //       case 5: return 'declined';
// // // //       default: return 'unknown';
// // // //     }
// // // //   };

// // // //   const renderDashboard = () => {
// // // //     if (userRole === 'admin') {
// // // //       return <AdminDashboard 
// // // //         stats={stats} 
// // // //         reports={reports} 
// // // //         reportsLoading={reportsLoading} 
// // // //         statuses={statuses} 
// // // //         getStatusName={getStatusName} 
// // // //         getStatusClass={getStatusClass} 
// // // //       />;
// // // //     }
    
// // // //     if (userRole === 'volunteer') {
// // // //       return <VolunteerDashboard 
// // // //         user={{...currentUser, role: userRole}} 
// // // //         stats={stats} 
// // // //         reports={reports}
// // // //         reportsLoading={reportsLoading}
// // // //         statuses={statuses}
// // // //         getStatusName={getStatusName}
// // // //         getStatusClass={getStatusClass}
// // // //       />;
// // // //     }
    
// // // //     if (volunteerStatus === 'pending') {
// // // //       return <PendingVolunteerDashboard user={currentUser} />;
// // // //     }
    
// // // //     if (volunteerStatus === 'rejected') {
// // // //       return <RejectedVolunteerDashboard />;
// // // //     }
    
// // // //     return <UserDashboard 
// // // //       user={{...currentUser, role: userRole}} 
// // // //       stats={stats} 
// // // //       reports={reports}
// // // //       reportsLoading={reportsLoading}
// // // //       statuses={statuses}
// // // //       getStatusName={getStatusName}
// // // //       getStatusClass={getStatusClass}
// // // //     />;
// // // //   };

// // // //   return (
// // // //     <div className="dashboard-content">
// // // //       {renderDashboard()}
// // // //     </div>
// // // //   );
// // // // };

// // // // const AdminDashboard: React.FC<{ 
// // // //   stats: any, 
// // // //   reports: Report[], 
// // // //   reportsLoading: boolean,
// // // //   statuses: Status[],
// // // //   getStatusName: (statusId: number) => string,
// // // //   getStatusClass: (statusId: number) => string
// // // // }> = ({ stats, reports, reportsLoading, getStatusName, getStatusClass }) => {
// // // //   const chartData = [
// // // //     { name: 'Reports', value: stats.totalReports },
// // // //     { name: 'Rescued', value: stats.completedRescues },
// // // //     { name: 'Volunteers', value: stats.activeVolunteers },
// // // //   ];
// // // //   const COLORS = ['#A67C52', '#2D5A27', '#7D8C5A'];

// // // //   return (
// // // //     <div className="dashboard-wrapper animate-fade-in">
// // // //       <div className="admin-dashboard">
// // // //         <h2 className="admin-header">ResQAll Global Overview</h2>
        
// // // //         <div className="admin-stats-grid">
// // // //           <div className="stat-card">
// // // //             <p className="stat-label">Pending Operatives</p>
// // // //             <div className="stat-content">
// // // //               <div className="stat-value stat-value-earth">{stats.pendingApprovals}</div>
// // // //               {stats.pendingApprovals > 0 && (
// // // //                 <Link to="/admin/volunteers" className="stat-alert animate-pulse">
// // // //                   Review Now
// // // //                 </Link>
// // // //               )}
// // // //             </div>
// // // //           </div>
          
// // // //           <div className="stat-card">
// // // //             <p className="stat-label">Field Rangers</p>
// // // //             <div className="stat-value stat-value-emerald">{stats.activeVolunteers}</div>
// // // //           </div>
          
// // // //           <div className="stat-card">
// // // //             <p className="stat-label">Mission Reports</p>
// // // //             <div className="stat-value stat-value-emerald">
// // // //               {reportsLoading ? '...' : stats.totalReports}
// // // //             </div>
// // // //           </div>
          
// // // //           <div className="stat-card">
// // // //             <p className="stat-label">Saved Lives</p>
// // // //             <div className="stat-value stat-value-moss">
// // // //               {reportsLoading ? '...' : stats.completedRescues}
// // // //             </div>
// // // //           </div>
// // // //         </div>

// // // //         <div className="admin-charts-grid">
// // // //           <div className="chart-container">
// // // //             <h3 className="chart-title">Operational Metrics</h3>
            
// // // //             <div className="recharts-wrapper">
// // // //               {reportsLoading ? (
// // // //                 <div className="chart-loading">
// // // //                   <p>Loading chart data...</p>
// // // //                 </div>
// // // //               ) : (
// // // //                 <ResponsiveContainer width="100%" height={300}>
// // // //                   <BarChart data={chartData}>
// // // //                     <XAxis dataKey="name" axisLine={false} tickLine={false} />
// // // //                     <YAxis axisLine={false} tickLine={false} />
// // // //                     <Tooltip 
// // // //                       cursor={{fill: '#F5F1E8'}} 
// // // //                       formatter={(value) => [value, 'Count']}
// // // //                       labelFormatter={(label) => `${label}`}
// // // //                     />
// // // //                     <Bar 
// // // //                       dataKey="value" 
// // // //                       radius={[10, 10, 0, 0]}
// // // //                       barSize={60}
// // // //                     >
// // // //                       {chartData.map((entry, index) => (
// // // //                         <Cell 
// // // //                           key={`cell-${index}`} 
// // // //                           fill={COLORS[index % COLORS.length]} 
// // // //                         />
// // // //                       ))}
// // // //                     </Bar>
// // // //                   </BarChart>
// // // //                 </ResponsiveContainer>
// // // //               )}
// // // //             </div>
// // // //           </div>
          
// // // //           <div className="volunteer-alert-box">
// // // //             <div className="volunteer-alert-icon">
// // // //               Warning
// // // //             </div>
// // // //             <h3 className="volunteer-alert-title">Volunteer Queue</h3>
// // // //             <p className="volunteer-alert-text">
// // // //               There {stats.pendingApprovals === 1 ? 'is' : 'are'} {stats.pendingApprovals} ranger{stats.pendingApprovals !== 1 ? 's' : ''} waiting for activation.
// // // //             </p>
// // // //             <Link to="/admin/volunteers" className="volunteer-alert-btn">
// // // //               Manage Operatives
// // // //             </Link>
// // // //           </div>
// // // //         </div>

// // // //         <div className="recent-reports-section">
// // // //           <h3 className="section-header">Recent Reports ({reports.length})</h3>
// // // //           <div className="reports-table-container">
// // // //             {reportsLoading ? (
// // // //               <div className="loading-message">
// // // //                 <div className="loading-spinner-small"></div>
// // // //                 <p>Loading reports...</p>
// // // //               </div>
// // // //             ) : reports.length > 0 ? (
// // // //               <>
// // // //                 <table className="reports-table">
// // // //                   <thead>
// // // //                     <tr>
// // // //                       <th>ID</th>
// // // //                       <th>Animal</th>
// // // //                       <th>Condition</th>
// // // //                       <th>Location</th>
// // // //                       <th>Reporter</th>
// // // //                       <th>Date</th>
// // // //                       <th>Status</th>
// // // //                     </tr>
// // // //                   </thead>
// // // //                   <tbody>
// // // //                     {reports.slice(0, 10).map((report) => (
// // // //                       <tr key={report.report_id}>
// // // //                         <td>#{report.report_id}</td>
// // // //                         <td className="animal-type">{report.animal_type || 'Unknown'}</td>
// // // //                         <td>{report.animal_condition || 'Unknown'}</td>
// // // //                         <td className="location-cell">{report.location_address || 'No location'}</td>
// // // //                         <td>{report.reporter_name || 'Anonymous'}</td>
// // // //                         <td className="report-date">
// // // //                           {report.submitted_at ? 
// // // //                             new Date(report.submitted_at).toLocaleDateString() : 
// // // //                             'Unknown date'}
// // // //                         </td>
// // // //                         <td>
// // // //                           <span className={`status-badge status-${getStatusClass(report.status_id)}`}>
// // // //                             {getStatusName(report.status_id)}
// // // //                           </span>
// // // //                         </td>
// // // //                       </tr>
// // // //                     ))}
// // // //                   </tbody>
// // // //                 </table>
// // // //                 {reports.length > 10 && (
// // // //                   <div className="view-all-container">
// // // //                     <Link to="/admin/reports" className="view-all-link">
// // // //                       View All Reports ({reports.length})
// // // //                     </Link>
// // // //                   </div>
// // // //                 )}
// // // //               </>
// // // //             ) : (
// // // //               <div className="no-reports">
// // // //                 <p>No reports found in the system.</p>
// // // //               </div>
// // // //             )}
// // // //           </div>
// // // //         </div>
// // // //       </div>
// // // //     </div>
// // // //   );
// // // // };

// // // // const VolunteerDashboard: React.FC<{ 
// // // //   user: any, 
// // // //   stats: any, 
// // // //   reports: Report[],
// // // //   reportsLoading: boolean,
// // // //   statuses: Status[],
// // // //   getStatusName: (statusId: number) => string,
// // // //   getStatusClass: (statusId: number) => string
// // // // }> = ({ user, stats, reports, reportsLoading, getStatusName, getStatusClass }) => {
// // // //   const userId = user.user_id?.toString() || '';
  
// // // //   const myTasks = reports.filter(r => {
// // // //     return r.status_id === 2;
// // // //   });
  
// // // //   const inProgressTask = reports.find(r => {
// // // //     return r.status_id === 3;
// // // //   });
  
// // // //   const pendingTasks = reports.filter(r => r.status_id === 1);

// // // //   return (
// // // //     <div className="dashboard-wrapper animate-fade-in">
// // // //       <div className="volunteer-dashboard">
// // // //         <div className="volunteer-header-grid">
// // // //           <div className="volunteer-welcome-card">
// // // //             <div className="volunteer-welcome-paw">
// // // //               Paw
// // // //             </div>
// // // //             <h2 className="volunteer-welcome-title">Welcome back, Operative {user.username}</h2>
// // // //             <p className="volunteer-welcome-text">
// // // //               Scanning sectors for animals in need. Ready for your next mission?
// // // //             </p>
// // // //             <div className="volunteer-welcome-btns">
// // // //               <Link to="/tasks" className="welcome-btn welcome-btn-primary">
// // // //                 Open Mission Board
// // // //               </Link>
// // // //               <Link to="/profile" className="welcome-btn welcome-btn-secondary">
// // // //                 My Service Medals
// // // //               </Link>
// // // //             </div>
// // // //           </div>

// // // //           <div className="volunteer-stats-column">
// // // //             <div className="volunteer-stat-card">
// // // //               <div className="stat-info">
// // // //                 <p className="stat-label-small">Successful Rescues</p>
// // // //                 <p className="stat-value-large">
// // // //                   {reportsLoading ? '...' : stats.myCompletedTasks}
// // // //                 </p>
// // // //               </div>
// // // //               <div className="stat-icon stat-icon-success">
// // // //                 Check
// // // //               </div>
// // // //             </div>
            
// // // //             <div className="volunteer-stat-card">
// // // //               <div className="stat-info">
// // // //                 <p className="stat-label-small">Ranger Rank</p>
// // // //                 <p className="stat-value-medium">
// // // //                   Volunteer
// // // //                 </p>
// // // //               </div>
// // // //               <div className="stat-icon stat-icon-rank">
// // // //                 Trophy
// // // //               </div>
// // // //             </div>
// // // //           </div>
// // // //         </div>

// // // //         <div className="mission-section">
// // // //           <h3 className="section-header">
// // // //             Active Assignment
// // // //           </h3>
          
// // // //           {reportsLoading ? (
// // // //             <div className="square-assignment-grid">
// // // //               <div className="square-mission-card empty">
// // // //                 <div className="square-card-content centered">
// // // //                   <div className="no-mission-icon">
// // // //                     Clock
// // // //                   </div>
// // // //                   <h4 className="no-mission-title">Loading Missions...</h4>
// // // //                   <p className="no-mission-text">
// // // //                     Fetching your assignments from the database...
// // // //                   </p>
// // // //                 </div>
// // // //               </div>
// // // //             </div>
// // // //           ) : inProgressTask ? (
// // // //             <div className="square-assignment-grid">
// // // //               <div className="square-mission-card active">
// // // //                 <div className="square-card-header">
// // // //                   <div className="square-status-badge in-field">IN FIELD</div>
// // // //                   <div className="square-volunteer-tag">{user.username?.toUpperCase()}</div>
// // // //                 </div>
                
// // // //                 <div className="square-card-content">
// // // //                   <div className="square-mission-title">
// // // //                     <h4 className="square-title">{inProgressTask.animal_type} Mission</h4>
// // // //                     <span className="square-condition">
// // // //                       {inProgressTask.animal_condition || 'NEEDS HELP'}
// // // //                     </span>
// // // //                   </div>
                  
// // // //                   <div className="square-location">
// // // //                     Location
// // // //                     <span className="location-text">{inProgressTask.location_address || 'Location not specified'}</span>
// // // //                   </div>
                  
// // // //                   <p className="square-description">
// // // //                     {inProgressTask.description?.length > 80 
// // // //                       ? `${inProgressTask.description.substring(0, 80)}...` 
// // // //                       : inProgressTask.description || 'No description provided'}
// // // //                   </p>
                  
// // // //                   <div className="square-actions">
// // // //                     <Link 
// // // //                       to={`/tasks/${inProgressTask.report_id}`}
// // // //                       className="square-action-btn"
// // // //                     >
// // // //                       Update Report
// // // //                     </Link>
// // // //                   </div>
// // // //                 </div>
// // // //               </div>

// // // //               {pendingTasks.length > 0 && (
// // // //                 <div className="square-mission-card pending">
// // // //                   <div className="square-card-header">
// // // //                     <div className="square-status-badge pending-badge">AVAILABLE</div>
// // // //                     <div className="square-count">{pendingTasks.length} waiting</div>
// // // //                   </div>
                  
// // // //                   <div className="square-card-content">
// // // //                     <div className="square-mission-title">
// // // //                       <h4 className="square-title">Available Missions</h4>
// // // //                       <span className="square-condition">NEEDS VOLUNTEER</span>
// // // //                     </div>
                    
// // // //                     <div className="square-pending-list">
// // // //                       {pendingTasks.slice(0, 2).map((task) => (
// // // //                         <div key={task.report_id} className="pending-item">
// // // //                           <span className="pending-animal">{task.animal_type}</span>
// // // //                           <span className="pending-location">
// // // //                             Location{task.location_address?.split(',')[0] || 'Unknown'}
// // // //                           </span>
// // // //                         </div>
// // // //                       ))}
// // // //                       {pendingTasks.length > 2 && (
// // // //                         <div className="pending-more">
// // // //                           +{pendingTasks.length - 2} more missions
// // // //                         </div>
// // // //                       )}
// // // //                     </div>
                    
// // // //                     <div className="square-actions">
// // // //                       <Link to="/tasks" className="square-action-btn view-all">
// // // //                         View All
// // // //                       </Link>
// // // //                     </div>
// // // //                   </div>
// // // //                 </div>
// // // //               )}
// // // //             </div>
// // // //           ) : (
// // // //             <div className="square-assignment-grid">
// // // //               <div className="square-mission-card empty">
// // // //                 <div className="square-card-content centered">
// // // //                   <div className="no-mission-icon">
// // // //                     Clock
// // // //                   </div>
// // // //                   <h4 className="no-mission-title">No Active Missions</h4>
// // // //                   <p className="no-mission-text">
// // // //                     The sector is quiet. Head to the mission board to see new reports.
// // // //                   </p>
// // // //                   <Link to="/tasks" className="square-action-btn primary">
// // // //                     Go to Mission Board
// // // //                   </Link>
// // // //                 </div>
// // // //               </div>

// // // //               <div className="square-mission-card stats">
// // // //                 <div className="square-card-content">
// // // //                   <div className="quick-stats">
// // // //                     <div className="quick-stat-item">
// // // //                       <div className="quick-stat-icon">
// // // //                         Check
// // // //                       </div>
// // // //                       <div className="quick-stat-info">
// // // //                         <div className="quick-stat-value">
// // // //                           {reportsLoading ? '...' : stats.myCompletedTasks}
// // // //                         </div>
// // // //                         <div className="quick-stat-label">Rescues</div>
// // // //                       </div>
// // // //                     </div>
// // // //                     <div className="quick-stat-item">
// // // //                       <div className="quick-stat-icon">
// // // //                         Clock
// // // //                       </div>
// // // //                       <div className="quick-stat-info">
// // // //                         <div className="quick-stat-value">
// // // //                           {reportsLoading ? '...' : pendingTasks.length}
// // // //                         </div>
// // // //                         <div className="quick-stat-label">Available</div>
// // // //                       </div>
// // // //                     </div>
// // // //                     <div className="quick-stat-item">
// // // //                       <div className="quick-stat-icon">
// // // //                         Trophy
// // // //                       </div>
// // // //                       <div className="quick-stat-info">
// // // //                         <div className="quick-stat-value">0</div>
// // // //                         <div className="quick-stat-label">Badges</div>
// // // //                       </div>
// // // //                     </div>
// // // //                   </div>
// // // //                   <Link to="/profile" className="square-action-btn secondary">
// // // //                     View Profile
// // // //                   </Link>
// // // //                 </div>
// // // //               </div>
// // // //             </div>
// // // //           )}
// // // //         </div>
// // // //       </div>
// // // //     </div>
// // // //   );
// // // // };

// // // // const PendingVolunteerDashboard: React.FC<{ user: any }> = ({ user }) => {
// // // //   return (
// // // //     <div className="dashboard-wrapper animate-fade-in">
// // // //       <div className="pending-volunteer">
// // // //         <div className="pending-icon">
// // // //           Clock
// // // //         </div>
// // // //         <h2 className="pending-title">Activation Pending</h2>
// // // //         <p className="pending-text">
// // // //           Thank you for joining ResQAll. Our HQ is currently reviewing your ranger profile. 
// // // //           You will be notified via field log once approved.
// // // //         </p>
// // // //         <Link to="/profile" className="pending-volunteer-link">
// // // //           View Your Profile
// // // //         </Link>
// // // //       </div>
// // // //     </div>
// // // //   );
// // // // };

// // // // const RejectedVolunteerDashboard: React.FC = () => {
// // // //   return (
// // // //     <div className="dashboard-wrapper animate-fade-in">
// // // //       <div className="rejected-volunteer">
// // // //         <h2 className="rejected-title">Application Status</h2>
// // // //         <p className="rejected-text">Unfortunately, your ResQAll operative status was not approved.</p>
// // // //         <p className="rejected-subtext">You can still use the platform as a regular user to report animals in need.</p>
// // // //         <Link to="/submit-report" className="rejected-volunteer-link">
// // // //           Report an Animal in Need
// // // //         </Link>
// // // //       </div>
// // // //     </div>
// // // //   );
// // // // };

// // // // const UserDashboard: React.FC<{ 
// // // //   user: any, 
// // // //   stats: any, 
// // // //   reports: Report[],
// // // //   reportsLoading: boolean,
// // // //   statuses: Status[],
// // // //   getStatusName: (statusId: number) => string,
// // // //   getStatusClass: (statusId: number) => string
// // // // }> = ({ user, stats, reports, reportsLoading, getStatusName, getStatusClass }) => {
// // // //   const userId = Number(user.user_id);
  
// // // //   // Filter reports by user_id - FIXED
// // // //   const myReports = reports.filter(report => {
// // // //     const reportUserId = Number(report.user_id);
// // // //     return reportUserId === userId;
// // // //   });

// // // //   return (
// // // //     <div className="dashboard-wrapper animate-fade-in">
// // // //       <div className="user-dashboard">
// // // //         <div className="user-hero-banner">
// // // //           <div className="user-hero-bg mask-image-gradient"></div>
// // // //           <div className="user-hero-content">
// // // //             <h2 className="user-hero-title">Protect the Streets</h2>
// // // //             <p className="user-hero-text">
// // // //               Spot an animal in distress? ResQAll rangers are on standby to respond to your report.
// // // //             </p>
// // // //             <Link to="/submit-report" className="user-hero-btn">
// // // //               File Field Report
// // // //             </Link>
// // // //           </div>
// // // //         </div>

// // // //         <div className="user-reports-section">
// // // //           <h3 className="user-reports-title">My Report History ({myReports.length})</h3>
          
// // // //           <div className="user-reports-table">
// // // //             {reportsLoading ? (
// // // //               <div className="no-reports">
// // // //                 <div className="loading-spinner-small"></div>
// // // //                 <p>Loading your reports...</p>
// // // //               </div>
// // // //             ) : myReports.length > 0 ? (
// // // //               <table className="reports-table">
// // // //                 <thead>
// // // //                   <tr>
// // // //                     <th>ID</th>
// // // //                     <th>Animal</th>
// // // //                     <th>Condition</th>
// // // //                     <th>Location</th>
// // // //                     <th>Date</th>
// // // //                     <th>Status</th>
// // // //                   </tr>
// // // //                 </thead>
// // // //                 <tbody>
// // // //                   {myReports.map(report => (
// // // //                     <tr key={report.report_id}>
// // // //                       <td>#{report.report_id}</td>
// // // //                       <td className="animal-type">{report.animal_type || 'Unknown'}</td>
// // // //                       <td>{report.animal_condition || 'Unknown'}</td>
// // // //                       <td className="location-cell">{report.location_address || 'No location'}</td>
// // // //                       <td className="report-date">
// // // //                         {report.submitted_at ? 
// // // //                           new Date(report.submitted_at).toLocaleDateString() : 
// // // //                           'Unknown date'}
// // // //                       </td>
// // // //                       <td>
// // // //                         <span className={`status-badge status-${getStatusClass(report.status_id)}`}>
// // // //                           {getStatusName(report.status_id)}
// // // //                         </span>
// // // //                       </td>
// // // //                     </tr>
// // // //                   ))}
// // // //                 </tbody>
// // // //               </table>
// // // //             ) : (
// // // //               <div className="no-reports">
// // // //                 <p>You haven't filed any rescue reports yet.</p>
// // // //                 <Link to="/submit-report" className="submit-report-link">
// // // //                   File Your First Report
// // // //                 </Link>
// // // //               </div>
// // // //             )}
// // // //           </div>
// // // //         </div>
// // // //       </div>
// // // //     </div>
// // // //   );
// // // // };

// // // // export default Dashboard;

// // // import React, { useState, useEffect } from 'react';
// // // import { useNavigate, Link } from 'react-router-dom';
// // // import { useAuth } from '../../context/AuthContext'; 
// // // import './Dashboard.css';

// // // // Define Report interface based on your database
// // // interface Report {
// // //   report_id: number;
// // //   user_id: number;
// // //   description: string;
// // //   location_address: string;
// // //   user_note: string;
// // //   submitted_at: string;
// // //   animal_type: string;
// // //   animal_condition: string;
// // //   status_id: number;
// // //   is_deleted?: number; // Optional for debugging
// // // }

// // // // Helper functions for status
// // // const getStatusText = (statusId: number): string => {
// // //   switch(statusId) {
// // //     case 1: return 'Submitted';
// // //     case 2: return 'Under Review';
// // //     case 3: return 'In Progress';
// // //     case 4: return 'Completed';
// // //     case 5: return 'Cancelled';
// // //     default: return 'Unknown';
// // //   }
// // // };

// // // const getStatusClass = (statusId: number): string => {
// // //   switch(statusId) {
// // //     case 1: return 'submitted';
// // //     case 2: return 'review';
// // //     case 3: return 'progress';
// // //     case 4: return 'completed';
// // //     case 5: return 'cancelled';
// // //     default: return 'unknown';
// // //   }
// // // };

// // // export const Dashboard: React.FC = () => {
// // //   const [isLoading, setIsLoading] = useState(true);
// // //   const [userReports, setUserReports] = useState<Report[]>([]);
// // //   const [reportsLoading, setReportsLoading] = useState(true);
// // //   const navigate = useNavigate();
  
// // //   const { user: currentUser } = useAuth();
  
// // //   // Fetch user's reports from backend
// // //   useEffect(() => {
// // //     const fetchUserReports = async () => {
// // //       if (!currentUser) return;
      
// // //       try {
// // //         setReportsLoading(true);
// // //         const token = localStorage.getItem('token');
// // //         console.log('Fetching reports with token:', token ? 'Token exists' : 'No token');
// // //         console.log('Current user ID:', currentUser.user_id);
        
// // //         const response = await fetch('http://localhost:5000/api/reports/my-reports', {
// // //           headers: {
// // //             'Authorization': `Bearer ${token}`,
// // //             'Content-Type': 'application/json'
// // //           }
// // //         });
        
// // //         console.log('Reports response status:', response.status);
        
// // //         if (response.ok) {
// // //           const data = await response.json();
// // //           console.log('Reports API response:', data);
// // //           if (data.success) {
// // //             setUserReports(data.data || []);
// // //             console.log(`✅ Loaded ${data.data?.length || 0} reports`);
// // //           } else {
// // //             console.error('API returned success: false', data);
// // //           }
// // //         } else {
// // //           console.error('Failed to fetch reports:', response.status, response.statusText);
// // //         }
// // //       } catch (error) {
// // //         console.error('Error fetching reports:', error);
// // //       } finally {
// // //         setReportsLoading(false);
// // //       }
// // //     };
    
// // //     if (currentUser) {
// // //       fetchUserReports();
// // //     }
// // //   }, [currentUser]);
  
// // //   useEffect(() => {
// // //     console.log('Current User from API:', currentUser);
    
// // //     if (currentUser) {
// // //       setIsLoading(false);
// // //     } else {
// // //       const timer = setTimeout(() => {
// // //         setIsLoading(false);
// // //       }, 1000);
// // //       return () => clearTimeout(timer);
// // //     }
// // //   }, [currentUser]);
  
// // //   const getUserRole = (user: any): string => {
// // //     if (!user) return 'user';
    
// // //     if (user.role && typeof user.role === 'object' && user.role.role_name) {
// // //       return user.role.role_name.toLowerCase();
// // //     }
    
// // //     if (user.role_name) {
// // //       return user.role_name.toLowerCase();
// // //     }
    
// // //     if (user.role_id) {
// // //       if (user.role_id === 3) return 'admin';
// // //       if (user.role_id === 2) return 'volunteer';
// // //       if (user.role_id === 1) return 'user';
// // //     }
    
// // //     if (user.email === 'admin@example.com') return 'admin';
// // //     if (user.email === 'volunteer@example.com') return 'volunteer';
    
// // //     return 'user';
// // //   };
  
// // //   const getVolunteerStatus = (user: any) => {
// // //     if (user.volunteerStatus) {
// // //       return user.volunteerStatus;
// // //     }
    
// // //     if (user.role_id === 2) {
// // //       return 'approved';
// // //     }
    
// // //     return null;
// // //   };

// // //   useEffect(() => {
// // //     if (!isLoading && !currentUser) {
// // //       navigate('/login');
// // //     }
// // //   }, [currentUser, navigate, isLoading]);

// // //   if (isLoading) {
// // //     return (
// // //       <div className="dashboard-wrapper">
// // //         <div className="no-access">
// // //           <h2>Loading...</h2>
// // //           <p>Please wait while we load your dashboard...</p>
// // //         </div>
// // //       </div>
// // //     );
// // //   }

// // //   if (!currentUser) {
// // //     return (
// // //       <div className="dashboard-wrapper">
// // //         <div className="no-access">
// // //           <h2>Access Denied</h2>
// // //           <p>Please log in to view the dashboard.</p>
// // //           <Link to="/login" className="login-link">
// // //             Go to Login
// // //           </Link>
// // //         </div>
// // //       </div>
// // //     );
// // //   }

// // //   const userRole = getUserRole(currentUser);
// // //   const volunteerStatus = getVolunteerStatus(currentUser);
  
// // //   console.log('Final User Role:', userRole);
// // //   console.log('Final Volunteer Status:', volunteerStatus);
// // //   console.log('User reports state:', userReports);

// // //   return (
// // //     <div className="dashboard-content">
// // //       {userRole === 'admin' ? (
// // //         <AdminDashboard userReports={userReports} />
// // //       ) : userRole === 'volunteer' ? (
// // //         volunteerStatus === 'pending' ? (
// // //           <PendingVolunteerDashboard user={currentUser} />
// // //         ) : volunteerStatus === 'rejected' ? (
// // //           <RejectedVolunteerDashboard />
// // //         ) : (
// // //           <VolunteerDashboard 
// // //             user={{...currentUser, role: userRole}} 
// // //             userReports={userReports} 
// // //           />
// // //         )
// // //       ) : (
// // //         <UserDashboard 
// // //           user={{...currentUser, role: userRole}} 
// // //           userReports={userReports}
// // //           reportsLoading={reportsLoading}
// // //         />
// // //       )}
// // //     </div>
// // //   );
// // // };

// // // // Helper component for loading state
// // // const LoadingSpinner: React.FC = () => (
// // //   <div className="loading-spinner">
// // //     <div className="spinner"></div>
// // //     <p>Loading reports...</p>
// // //   </div>
// // // );

// // // const AdminDashboard: React.FC<{ userReports: Report[] }> = ({ userReports }) => {
// // //   return (
// // //     <div className="dashboard-wrapper animate-fade-in">
// // //       <div className="admin-dashboard">
// // //         <h2 className="admin-header">ResQAll Global Overview</h2>
        
// // //         <div className="admin-stats-grid">
// // //           <div className="stat-card">
// // //             <p className="stat-label">Pending Operatives</p>
// // //             <div className="stat-content">
// // //               <div className="stat-value stat-value-earth">0</div>
// // //             </div>
// // //           </div>
          
// // //           <div className="stat-card">
// // //             <p className="stat-label">Field Rangers</p>
// // //             <div className="stat-value stat-value-emerald">1</div>
// // //           </div>
          
// // //           <div className="stat-card">
// // //             <p className="stat-label">Mission Reports</p>
// // //             <div className="stat-value stat-value-emerald">{userReports.length}</div>
// // //           </div>
          
// // //           <div className="stat-card">
// // //             <p className="stat-label">Saved Lives</p>
// // //             <div className="stat-value stat-value-moss">
// // //               {userReports.filter(r => r.status_id === 4).length}
// // //             </div>
// // //           </div>
// // //         </div>

// // //         <div className="reports-section">
// // //           <h3 className="reports-title">All User Reports</h3>
// // //           {userReports.length > 0 ? (
// // //             <div className="reports-list">
// // //               {userReports.map(report => (
// // //                 <div key={report.report_id} className="report-card">
// // //                   <div className="report-card-header">
// // //                     <span className={`animal-type-badge animal-${report.animal_type?.toLowerCase() || 'other'}`}>
// // //                       {report.animal_type || 'Unknown'}
// // //                     </span>
// // //                     <span className={`status-badge status-${getStatusClass(report.status_id)}`}>
// // //                       {getStatusText(report.status_id)}
// // //                     </span>
// // //                   </div>
                  
// // //                   <div className="report-card-body">
// // //                     <p className="report-description">{report.description}</p>
                    
// // //                     <div className="report-info">
// // //                       <div className="report-location">
// // //                         <span className="location-icon">📍</span>
// // //                         <span className="location-text">{report.location_address}</span>
// // //                       </div>
                      
// // //                       <div className="report-date">
// // //                         <span className="date-icon">📅</span>
// // //                         <span className="date-text">
// // //                           {new Date(report.submitted_at).toLocaleDateString('en-US', {
// // //                             month: 'short',
// // //                             day: 'numeric',
// // //                             year: 'numeric'
// // //                           })}
// // //                         </span>
// // //                       </div>
// // //                     </div>
// // //                   </div>
                  
// // //                   <div className="report-card-footer">
// // //                     <div className="report-condition">
// // //                       Condition: <strong>{report.animal_condition || 'Unknown'}</strong>
// // //                     </div>
// // //                     <Link 
// // //                       to={`/admin/reports/${report.report_id}`} 
// // //                       className="report-details-link"
// // //                     >
// // //                       Manage →
// // //                     </Link>
// // //                   </div>
// // //                 </div>
// // //               ))}
// // //             </div>
// // //           ) : (
// // //             <div className="no-reports-message">
// // //               <div className="no-reports-icon">📋</div>
// // //               <p className="no-reports-text">No reports found in the system.</p>
// // //             </div>
// // //           )}
// // //         </div>
// // //       </div>
// // //     </div>
// // //   );
// // // };

// // // const VolunteerDashboard: React.FC<{ user: any, userReports: Report[] }> = ({ user, userReports }) => {
// // //   return (
// // //     <div className="dashboard-wrapper animate-fade-in">
// // //       <div className="volunteer-dashboard">
// // //         <div className="volunteer-welcome-card">
// // //           <div className="volunteer-welcome-paw">
// // //             🐾
// // //           </div>
// // //           <h2 className="volunteer-welcome-title">Welcome back, Operative {user.username}</h2>
// // //           <p className="volunteer-welcome-text">
// // //             Scanning sectors for animals in need. Ready for your next mission?
// // //           </p>
// // //         </div>

// // //         <div className="reports-section">
// // //           <h3 className="reports-title">Assigned Missions</h3>
// // //           {userReports.length > 0 ? (
// // //             <div className="reports-list">
// // //               {userReports.map(report => (
// // //                 <div key={report.report_id} className="report-card">
// // //                   <div className="report-card-header">
// // //                     <span className={`animal-type-badge animal-${report.animal_type?.toLowerCase() || 'other'}`}>
// // //                       {report.animal_type || 'Unknown'}
// // //                     </span>
// // //                     <span className={`status-badge status-${getStatusClass(report.status_id)}`}>
// // //                       {getStatusText(report.status_id)}
// // //                     </span>
// // //                   </div>
                  
// // //                   <div className="report-card-body">
// // //                     <p className="report-description">{report.description}</p>
                    
// // //                     <div className="report-info">
// // //                       <div className="report-location">
// // //                         <span className="location-icon">📍</span>
// // //                         <span className="location-text">{report.location_address}</span>
// // //                       </div>
                      
// // //                       <div className="report-date">
// // //                         <span className="date-icon">📅</span>
// // //                         <span className="date-text">
// // //                           {new Date(report.submitted_at).toLocaleDateString('en-US', {
// // //                             month: 'short',
// // //                             day: 'numeric',
// // //                             year: 'numeric'
// // //                           })}
// // //                         </span>
// // //                       </div>
// // //                     </div>
// // //                   </div>
                  
// // //                   <div className="report-card-footer">
// // //                     <div className="report-condition">
// // //                       Condition: <strong>{report.animal_condition || 'Unknown'}</strong>
// // //                     </div>
// // //                     <Link 
// // //                       to={`/tasks/${report.report_id}`} 
// // //                       className="report-details-link"
// // //                     >
// // //                       Update Mission →
// // //                     </Link>
// // //                   </div>
// // //                 </div>
// // //               ))}
// // //             </div>
// // //           ) : (
// // //             <div className="no-reports-message">
// // //               <div className="no-reports-icon">🎯</div>
// // //               <h4 className="no-reports-title">No Assigned Missions</h4>
// // //               <p className="no-reports-text">
// // //                 You don't have any assigned rescue missions yet.
// // //               </p>
// // //               <Link to="/tasks" className="no-reports-btn">
// // //                 Check Available Missions
// // //               </Link>
// // //             </div>
// // //           )}
// // //         </div>
// // //       </div>
// // //     </div>
// // //   );
// // // };

// // // const PendingVolunteerDashboard: React.FC<{ user: any }> = ({ user }) => {
// // //   return (
// // //     <div className="dashboard-wrapper animate-fade-in">
// // //       <div className="pending-volunteer">
// // //         <div className="pending-icon">
// // //           ⏰
// // //         </div>
// // //         <h2 className="pending-title">Activation Pending</h2>
// // //         <p className="pending-text">
// // //           Thank you for joining ResQAll. Our HQ is currently reviewing your ranger profile. 
// // //           You will be notified via field log once approved.
// // //         </p>
// // //       </div>
// // //     </div>
// // //   );
// // // };

// // // const RejectedVolunteerDashboard: React.FC = () => {
// // //   return (
// // //     <div className="dashboard-wrapper animate-fade-in">
// // //       <div className="rejected-volunteer">
// // //         <h2 className="rejected-title">Application Status</h2>
// // //         <p className="rejected-text">Unfortunately, your ResQAll operative status was not approved.</p>
// // //       </div>
// // //     </div>
// // //   );
// // // };

// // // const UserDashboard: React.FC<{ user: any, userReports: Report[], reportsLoading: boolean }> = ({ user, userReports, reportsLoading }) => {
// // //   // Calculate statistics
// // //   const totalReports = userReports.length;
// // //   const submittedReports = userReports.filter(r => r.status_id === 1).length;
// // //   const inProgressReports = userReports.filter(r => r.status_id === 3).length;
// // //   const completedReports = userReports.filter(r => r.status_id === 4).length;

// // //   return (
// // //     <div className="dashboard-wrapper animate-fade-in">
// // //       <div className="user-dashboard">
// // //         {/* Welcome Section */}
// // //         <div className="user-welcome-section">
// // //           <div className="user-welcome-content">
// // //             <h2 className="user-welcome-title">
// // //               Welcome back, {user.username || 'Animal Friend'}!
// // //             </h2>
// // //             <p className="user-welcome-subtitle">
// // //               Your reports help save animals in need.
// // //             </p>
// // //           </div>
// // //           <Link to="/submit-report" className="user-primary-btn">
// // //             <span className="btn-icon">+</span>
// // //             File New Report
// // //           </Link>
// // //         </div>

// // //         {/* Statistics Cards */}
// // //         <div className="user-stats-grid">
// // //           <div className="user-stat-card">
// // //             <div className="stat-card-icon total-reports">
// // //               📄
// // //             </div>
// // //             <div className="stat-card-content">
// // //               <h3 className="stat-card-value">{totalReports}</h3>
// // //               <p className="stat-card-label">Total Reports</p>
// // //             </div>
// // //           </div>
          
// // //           <div className="user-stat-card">
// // //             <div className="stat-card-icon in-progress">
// // //               ⏳
// // //             </div>
// // //             <div className="stat-card-content">
// // //               <h3 className="stat-card-value">{inProgressReports}</h3>
// // //               <p className="stat-card-label">In Progress</p>
// // //             </div>
// // //           </div>
          
// // //           <div className="user-stat-card">
// // //             <div className="stat-card-icon completed">
// // //               ✓
// // //             </div>
// // //             <div className="stat-card-content">
// // //               <h3 className="stat-card-value">{completedReports}</h3>
// // //               <p className="stat-card-label">Completed</p>
// // //             </div>
// // //           </div>
          
// // //           <div className="user-stat-card">
// // //             <div className="stat-card-icon waiting">
// // //               ⏰
// // //             </div>
// // //             <div className="stat-card-content">
// // //               <h3 className="stat-card-value">{submittedReports}</h3>
// // //               <p className="stat-card-label">Awaiting Review</p>
// // //             </div>
// // //           </div>
// // //         </div>

// // //         {/* Reports Section */}
// // //         <div className="reports-section">
// // //           <div className="reports-header">
// // //             <h3 className="reports-title">Your Reports</h3>
// // //             {userReports.length > 0 && (
// // //               <Link to="/my-reports" className="view-all-link">
// // //                 View All →
// // //               </Link>
// // //             )}
// // //           </div>
          
// // //           <div className="reports-container">
// // //             {reportsLoading ? (
// // //               <LoadingSpinner />
// // //             ) : userReports.length > 0 ? (
// // //               <div className="reports-list">
// // //                 {userReports.map(report => (
// // //                   <div key={report.report_id} className="report-card">
// // //                     <div className="report-card-header">
// // //                       <div className="report-card-left">
// // //                         <span className={`animal-type-badge animal-${report.animal_type?.toLowerCase() || 'other'}`}>
// // //                           {report.animal_type || 'Unknown'}
// // //                         </span>
// // //                         <span className="condition-badge condition-info">
// // //                           {report.animal_condition || 'Unknown'}
// // //                         </span>
// // //                       </div>
// // //                       <span className={`status-badge status-${getStatusClass(report.status_id)}`}>
// // //                         {getStatusText(report.status_id)}
// // //                       </span>
// // //                     </div>
                    
// // //                     <div className="report-card-body">
// // //                       <p className="report-description">
// // //                         {report.description}
// // //                       </p>
                      
// // //                       <div className="report-info">
// // //                         <div className="report-location">
// // //                           <span className="location-icon">📍</span>
// // //                           <span className="location-text">{report.location_address}</span>
// // //                         </div>
                        
// // //                         <div className="report-date">
// // //                           <span className="date-icon">📅</span>
// // //                           <span className="date-text">
// // //                             {new Date(report.submitted_at).toLocaleDateString('en-US', {
// // //                               weekday: 'short',
// // //                               month: 'short',
// // //                               day: 'numeric',
// // //                               year: 'numeric'
// // //                             })}
// // //                           </span>
// // //                         </div>
// // //                       </div>
                      
// // //                       {report.user_note && (
// // //                         <div className="user-note">
// // //                           <strong>Your Note:</strong> {report.user_note}
// // //                         </div>
// // //                       )}
// // //                     </div>
                    
// // //                     <div className="report-card-footer">
// // //                       <Link 
// // //                         to={`/reports/${report.report_id}`} 
// // //                         className="report-details-link"
// // //                       >
// // //                         View Details →
// // //                       </Link>
// // //                     </div>
// // //                   </div>
// // //                 ))}
// // //               </div>
// // //             ) : (
// // //               <div className="no-reports-message">
// // //                 <div className="no-reports-icon">📝</div>
// // //                 <h4 className="no-reports-title">No Reports Yet</h4>
// // //                 <p className="no-reports-text">
// // //                   You haven't filed any animal rescue reports yet.
// // //                 </p>
// // //                 <Link to="/submit-report" className="no-reports-btn">
// // //                   File Your First Report
// // //                 </Link>
// // //               </div>
// // //             )}
// // //           </div>
// // //         </div>
// // //       </div>
// // //     </div>
// // //   );
// // // };

// // // export default Dashboard;

// // import React, { useState, useEffect } from 'react';
// // import { useNavigate, Link } from 'react-router-dom';
// // import { 
// //   BarChart, 
// //   Bar, 
// //   XAxis, 
// //   YAxis, 
// //   Tooltip, 
// //   ResponsiveContainer, 
// //   Cell 
// // } from 'recharts';
// // import { useAuth } from '../../context/AuthContext'; 
// // import './Dashboard.css';

// // // Define Report interface based on your database
// // interface Report {
// //   report_id: number;
// //   user_id: number;
// //   description: string;
// //   location_address: string;
// //   user_note: string;
// //   submitted_at: string;
// //   animal_type: string;
// //   animal_condition: string;
// //   status_id: number;
// //   is_deleted?: number;
// //   // Add reporter information
// //   reporter_name?: string;
// //   reporter_phone?: string;
// //   volunteer_name?: string;
// //   volunteer_id?: number;
// // }

// // // Define User Profile interface
// // interface UserProfile {
// //   user_id: number;
// //   username: string;
// //   email: string;
// //   phone: string;
// //   bio: string;
// //   profile_image_url: string;
// //   role_id: number;
// //   created_at: string;
// // }

// // // Helper functions for status
// // const getStatusText = (statusId: number): string => {
// //   switch(statusId) {
// //     case 1: return 'Submitted';
// //     case 2: return 'Under Review';
// //     case 3: return 'In Progress';
// //     case 4: return 'Completed';
// //     case 5: return 'Cancelled';
// //     default: return 'Unknown';
// //   }
// // };

// // const getStatusClass = (statusId: number): string => {
// //   switch(statusId) {
// //     case 1: return 'submitted';
// //     case 2: return 'review';
// //     case 3: return 'progress';
// //     case 4: return 'completed';
// //     case 5: return 'cancelled';
// //     default: return 'unknown';
// //   }
// // };

// // // Get animal emoji based on animal type
// // const getAnimalEmoji = (animalType: string): string => {
// //   const type = animalType?.toLowerCase() || '';
// //   if (type.includes('dog')) return '🐶';
// //   if (type.includes('cat')) return '🐱';
// //   if (type.includes('bird')) return '🐦';
// //   if (type.includes('rabbit') || type.includes('bunny')) return '🐰';
// //   if (type.includes('hamster')) return '🐹';
// //   if (type.includes('turtle') || type.includes('tortoise')) return '🐢';
// //   if (type.includes('horse')) return '🐴';
// //   if (type.includes('cow')) return '🐮';
// //   if (type.includes('goat')) return '🐐';
// //   if (type.includes('sheep')) return '🐑';
// //   if (type.includes('fish')) return '🐠';
// //   if (type.includes('snake')) return '🐍';
// //   if (type.includes('mouse') || type.includes('rat')) return '🐭';
// //   if (type.includes('monkey')) return '🐒';
// //   if (type.includes('pig')) return '🐷';
// //   if (type.includes('chicken')) return '🐔';
// //   if (type.includes('duck')) return '🦆';
// //   return '🐾';
// // };

// // // Format date for display
// // const formatDate = (dateString: string): string => {
// //   const date = new Date(dateString);
// //   return date.toLocaleDateString('en-US', {
// //     month: 'short',
// //     day: 'numeric',
// //     year: 'numeric',
// //     hour: '2-digit',
// //     minute: '2-digit'
// //   });
// // };

// // // Report Detail Modal Component (For User Dashboard)
// // // const ReportDetailModal: React.FC<{
// // //   report: Report | null;
// // //   isOpen: boolean;
// // //   onClose: () => void;
// // //   userPhone?: string; // Current user's phone number
// // //   userName?: string;  // Current user's name
// // // }> = ({ report, isOpen, onClose, userPhone, userName }) => {
// // //   if (!isOpen || !report) return null;

// // //   // Use reporter info from report or fall back to current user info
// // //   const reporterName = report.reporter_name || userName;
// // //   const phoneNumber = report.reporter_phone || userPhone;

// // //   return (
// // //     <div className="modal-overlay" onClick={onClose}>
// // //       <div className="modal-content" onClick={e => e.stopPropagation()}>
// // //         <div className="modal-header">
// // //           <h3 className="modal-title">
// // //             <span className="modal-animal-emoji">{getAnimalEmoji(report.animal_type)}</span>
// // //             Report Details
// // //           </h3>
// // //           <button className="modal-close" onClick={onClose}>×</button>
// // //         </div>
        
// // //         <div className="modal-body">
// // //           <div className="detail-row">
// // //             <div className="detail-label">Report ID</div>
// // //             <div className="detail-value">#{report.report_id}</div>
// // //           </div>
          
// // //           <div className="detail-row">
// // //             <div className="detail-label">Status</div>
// // //             <div className="detail-value">
// // //               <span className={`status-badge status-${getStatusClass(report.status_id)}`}>
// // //                 {getStatusText(report.status_id)}
// // //               </span>
// // //             </div>
// // //           </div>
          
// // //           {/* Reporter Information Section */}
// // //           <div className="reporter-section">
// // //             <h4 className="reporter-section-title">Reporter Information</h4>
            
// // //             <div className="detail-row">
// // //               <div className="detail-label">Name</div>
// // //               <div className="detail-value">
// // //                 <div className="reporter-info">
// // //                   <span className="reporter-icon">👤</span>
// // //                   <span className="reporter-name">{reporterName || 'Anonymous'}</span>
// // //                 </div>
// // //               </div>
// // //             </div>
            
// // //             {/* Show phone number */}
// // //             {phoneNumber && (
// // //               <div className="detail-row">
// // //                 <div className="detail-label">Phone Number</div>
// // //                 <div className="detail-value detail-contact">
// // //                   <span className="contact-icon">📱</span>
// // //                   <span className="phone-number">{phoneNumber}</span>
// // //                 </div>
// // //               </div>
// // //             )}
// // //           </div>
          
// // //           <div className="animal-section">
// // //             <h4 className="animal-section-title">Animal Information</h4>
            
// // //             <div className="detail-row">
// // //               <div className="detail-label">Animal Type</div>
// // //               <div className="detail-value">{report.animal_type || 'Unknown'}</div>
// // //             </div>
            
// // //             <div className="detail-row">
// // //               <div className="detail-label">Animal Condition</div>
// // //               <div className="detail-value">{report.animal_condition || 'Not specified'}</div>
// // //             </div>
// // //           </div>
          
// // //           <div className="location-section">
// // //             <h4 className="location-section-title">Location Details</h4>
            
// // //             <div className="detail-row">
// // //               <div className="detail-label">Location</div>
// // //               <div className="detail-value">
// // //                 <div className="location-info">
// // //                   <span className="location-icon">📍</span>
// // //                   <span className="location-text">{report.location_address}</span>
// // //                 </div>
// // //               </div>
// // //             </div>
// // //           </div>
          
// // //           <div className="details-section">
// // //             <h4 className="details-section-title">Report Details</h4>
            
// // //             <div className="detail-row">
// // //               <div className="detail-label">Description</div>
// // //               <div className="detail-value detail-description">{report.description}</div>
// // //             </div>
            
// // //             {report.user_note && (
// // //               <div className="detail-row">
// // //                 <div className="detail-label">Additional Notes</div>
// // //                 <div className="detail-value detail-note">{report.user_note}</div>
// // //               </div>
// // //             )}
// // //           </div>
          
// // //           {/* Show assigned volunteer name only (no phone) */}
// // //           {report.volunteer_name && (
// // //             <div className="volunteer-section">
// // //               <h4 className="volunteer-section-title">Assigned Volunteer</h4>
// // //               <div className="detail-row">
// // //                 <div className="detail-label">Volunteer Name</div>
// // //                 <div className="detail-value detail-volunteer">
// // //                   <span className="volunteer-icon">🦸</span>
// // //                   <span>{report.volunteer_name}</span>
// // //                 </div>
// // //               </div>
// // //             </div>
// // //           )}
          
// // //           <div className="timeline-section">
// // //             <h4 className="timeline-section-title">Timeline</h4>
// // //             <div className="detail-row">
// // //               <div className="detail-label">Submitted On</div>
// // //               <div className="detail-value">{formatDate(report.submitted_at)}</div>
// // //             </div>
// // //           </div>
// // //         </div>
        
// // //         <div className="modal-footer">
// // //           <button className="modal-btn secondary" onClick={onClose}>
// // //             Close
// // //           </button>
// // //           {/* <Link to={`/reports/${report.report_id}`} className="modal-btn primary">
// // //             View Full Details
// // //           </Link> */}
// // //         </div>
// // //       </div>
// // //     </div>
// // //   );
// // // };
// // // Report Detail Modal Component (Updated to match MyReports style)
// // const ReportDetailModal: React.FC<{
// //   report: Report | null;
// //   isOpen: boolean;
// //   onClose: () => void;
// //   userPhone?: string;
// //   userName?: string;
// // }> = ({ report, isOpen, onClose, userPhone, userName }) => {
// //   if (!isOpen || !report) return null;

// //   // Use reporter info from report or fall back to current user info
// //   const reporterName = report.reporter_name || userName;
// //   const phoneNumber = report.reporter_phone || userPhone;

// //   const isEditable = report.status_id === 1;

// //   // Helper function to check if phone exists
// //   const hasPhone = (phone?: string | null): boolean => {
// //     if (phone === null || phone === undefined) return false;
// //     if (typeof phone !== 'string') return false;
// //     return phone.trim().length > 0;
// //   };

// //   // Format phone number for display
// //   const formatPhoneNumber = (phone?: string | null): string => {
// //     if (!hasPhone(phone)) {
// //       return 'Not provided';
// //     }
    
// //     const phoneStr = String(phone).trim();
// //     const cleaned = phoneStr.replace(/\D/g, '');
    
// //     if (cleaned.length === 10) {
// //       return `+977 ${cleaned}`;
// //     }
    
// //     return phoneStr;
// //   };

// //   const getConditionIcon = (condition: string): string => {
// //     const cond = condition?.toLowerCase() || '';
// //     if (cond.includes('critical') || cond.includes('emergency')) return '🆘';
// //     if (cond.includes('severe') || cond.includes('serious')) return '⚠️';
// //     if (cond.includes('moderate') || cond.includes('injured')) return '🩹';
// //     if (cond.includes('mild') || cond.includes('sick')) return '🤒';
// //     if (cond.includes('abandoned') || cond.includes('lost')) return '💔';
// //     if (cond.includes('healthy') || cond.includes('safe')) return '✅';
// //     return 'ℹ️';
// //   };

// //   return (
// //     <div className="modal-overlay" onClick={onClose}>
// //       <div className="modal-content" onClick={e => e.stopPropagation()}>
// //         <div className="modal-header">
// //           <div className="modal-header-left">
// //             <span className="modal-animal-emoji">{getAnimalEmoji(report.animal_type)}</span>
// //             <div>
// //               <h3 className="modal-title">Report #{report.report_id}</h3>
// //               <p className="modal-subtitle">{report.animal_type} • {report.animal_condition}</p>
// //             </div>
// //           </div>
// //           <button className="modal-close" onClick={onClose}>×</button>
// //         </div>
        
// //         <div className="modal-body">
// //           {/* Top row with status */}
// //           <div className="modal-top-row">
// //             <div className="modal-status">
// //               <span className={`status-badge-large status-${getStatusClass(report.status_id)}`}>
// //                 {getStatusText(report.status_id)}
// //               </span>
// //               {!isEditable && (
// //                 <span className="non-editable-badge">Non-editable</span>
// //               )}
// //             </div>
// //           </div>

// //           {/* Your Information Section */}
// //           <div className="modal-section">
// //             <h4 className="modal-section-title">
// //               <span className="section-icon">👤</span>
// //               Your Information
// //             </h4>
// //             <div className="modal-detail-grid">
// //               <div className="detail-item">
// //                 <span className="detail-label">Name</span>
// //                 <span className="detail-value">{reporterName || 'Anonymous'}</span>
// //               </div>
// //               <div className="detail-item">
// //                 <span className="detail-label">User ID</span>
// //                 <span className="detail-value">#{report.user_id}</span>
// //               </div>
// //               {hasPhone(phoneNumber) && (
// //                 <div className="detail-item">
// //                   <span className="detail-label">Phone</span>
// //                   <span className="detail-value phone-emphasis">
// //                     {formatPhoneNumber(phoneNumber)}
// //                   </span>
// //                 </div>
// //               )}
// //             </div>
// //           </div>

// //           {/* Animal Information Section */}
// //           <div className="modal-section">
// //             <h4 className="modal-section-title">
// //               <span className="section-icon">🐾</span>
// //               Animal Information
// //             </h4>
// //             <div className="modal-detail-grid">
// //               <div className="detail-item">
// //                 <span className="detail-label">Animal Type</span>
// //                 <div className="detail-value-with-emoji">
// //                   <span className="detail-emoji">{getAnimalEmoji(report.animal_type)}</span>
// //                   <span>{report.animal_type || 'Unknown Animal'}</span>
// //                 </div>
// //               </div>
// //               <div className="detail-item">
// //                 <span className="detail-label">Condition</span>
// //                 <div className="detail-value-with-emoji">
// //                   <span className="detail-emoji">{getConditionIcon(report.animal_condition)}</span>
// //                   <span>{report.animal_condition || 'Not specified'}</span>
// //                 </div>
// //               </div>
// //             </div>
// //           </div>

// //           {/* Location Details */}
// //           <div className="modal-section">
// //             <h4 className="modal-section-title">
// //               <span className="section-icon">📍</span>
// //               Location Details
// //             </h4>
// //             <div className="location-card">
// //               <div className="location-content">
// //                 <span className="location-icon-large">📍</span>
// //                 <span className="location-text">{report.location_address}</span>
// //               </div>
// //             </div>
// //           </div>

// //           {/* Description */}
// //           <div className="modal-section">
// //             <h4 className="modal-section-title">
// //               <span className="section-icon">📝</span>
// //               Description
// //             </h4>
// //             <div className="description-card">
// //               <p className="description-text">{report.description}</p>
// //             </div>
// //           </div>

// //           {/* Show assigned volunteer name only (no phone) */}
// //           {report.volunteer_name && (
// //             <div className="modal-section">
// //               <h4 className="modal-section-title">
// //                 <span className="section-icon">🦸</span>
// //                 Assigned Volunteer
// //               </h4>
// //               <div className="detail-item">
// //                 <div className="detail-value-with-emoji">
// //                   <span className="detail-emoji">🦸</span>
// //                   <span>{report.volunteer_name}</span>
// //                 </div>
// //               </div>
// //             </div>
// //           )}

// //           {/* Timeline */}
// //           <div className="modal-section">
// //             <h4 className="modal-section-title">
// //               <span className="section-icon">📅</span>
// //               Timeline
// //             </h4>
// //             <div className="timeline-card">
// //               <div className="timeline-item">
// //                 <div className="timeline-icon">📅</div>
// //                 <div className="timeline-content">
// //                   <div className="timeline-label">Report Submitted</div>
// //                   <div className="timeline-value">{formatDate(report.submitted_at)}</div>
// //                 </div>
// //               </div>
// //             </div>
// //           </div>
// //         </div>
        
// //         <div className="modal-footer">
// //           <button className="modal-btn secondary" onClick={onClose}>
// //             Close
// //           </button>
// //         </div>
// //       </div>
// //     </div>
// //   );
// // };

// // export const Dashboard: React.FC = () => {
// //   const [isLoading, setIsLoading] = useState(true);
// //   const [userReports, setUserReports] = useState<Report[]>([]);
// //   const [reportsLoading, setReportsLoading] = useState(true);
// //   const [userProfile, setUserProfile] = useState<UserProfile | null>(null);
// //   const [selectedReport, setSelectedReport] = useState<Report | null>(null);
// //   const [isModalOpen, setIsModalOpen] = useState(false);
// //   const navigate = useNavigate();
  
// //   const { user: currentUser } = useAuth();
  
// //   // Fetch user profile (including phone number)
// //   useEffect(() => {
// //     const fetchUserProfile = async () => {
// //       if (!currentUser) return;
      
// //       try {
// //         const token = localStorage.getItem('token');
// //         const response = await fetch('http://localhost:5000/api/users/profile', {
// //           headers: {
// //             'Authorization': `Bearer ${token}`,
// //             'Content-Type': 'application/json'
// //           }
// //         });

// //         if (response.ok) {
// //           const data = await response.json();
// //           if (data.success) {
// //             setUserProfile(data.data);
// //           }
// //         }
// //       } catch (err) {
// //         console.error('Error fetching user profile:', err);
// //       }
// //     };

// //     fetchUserProfile();
// //   }, [currentUser]);

// //   // Fetch user's reports from backend
// //   useEffect(() => {
// //     const fetchUserReports = async () => {
// //       if (!currentUser) return;
      
// //       try {
// //         setReportsLoading(true);
// //         const token = localStorage.getItem('token');
        
// //         const response = await fetch('http://localhost:5000/api/reports/my-reports', {
// //           headers: {
// //             'Authorization': `Bearer ${token}`,
// //             'Content-Type': 'application/json'
// //           }
// //         });
        
// //         if (response.ok) {
// //           const data = await response.json();
// //           if (data.success) {
// //             // Add current user's info to each report
// //             const reportsWithUserInfo = (data.data || []).map((report: Report) => ({
// //               ...report,
// //               reporter_name: userProfile?.username || currentUser.username,
// //               reporter_phone: userProfile?.phone || ''
// //             }));
// //             setUserReports(reportsWithUserInfo);
// //           }
// //         }
// //       } catch (error) {
// //         console.error('Error fetching reports:', error);
// //       } finally {
// //         setReportsLoading(false);
// //       }
// //     };
    
// //     if (currentUser) {
// //       fetchUserReports();
// //     }
// //   }, [currentUser, userProfile]);
  
// //   useEffect(() => {
// //     if (currentUser) {
// //       setIsLoading(false);
// //     } else {
// //       const timer = setTimeout(() => {
// //         setIsLoading(false);
// //       }, 1000);
// //       return () => clearTimeout(timer);
// //     }
// //   }, [currentUser]);
  
// //   const getUserRole = (user: any): string => {
// //     if (!user) return 'user';
    
// //     if (user.role && typeof user.role === 'object' && user.role.role_name) {
// //       return user.role.role_name.toLowerCase();
// //     }
    
// //     if (user.role_name) {
// //       return user.role_name.toLowerCase();
// //     }
    
// //     if (user.role_id) {
// //       if (user.role_id === 3) return 'admin';
// //       if (user.role_id === 2) return 'volunteer';
// //       if (user.role_id === 1) return 'user';
// //     }
    
// //     return 'user';
// //   };
  
// //   const getVolunteerStatus = (user: any): string | null => {
// //     if (!user) return null;

// //     if (user.approval_status_id) {
// //       if (user.approval_status_id === 1) return 'pending';
// //       if (user.approval_status_id === 2) return 'approved';
// //       if (user.approval_status_id === 3) return 'rejected';
// //     }

// //     if (user.volunteer) {
// //       if (user.volunteer.approval_status_id) {
// //         if (user.volunteer.approval_status_id === 1) return 'pending';
// //         if (user.volunteer.approval_status_id === 2) return 'approved';
// //         if (user.volunteer.approval_status_id === 3) return 'rejected';
// //       }
      
// //       if (user.volunteer.status) {
// //         return user.volunteer.status.toLowerCase();
// //       }
// //     }

// //     if (user.volunteer_status) {
// //       return user.volunteer_status.toLowerCase();
// //     }

// //     return null;
// //   };

// //   const handleViewDetails = (report: Report) => {
// //     setSelectedReport(report);
// //     setIsModalOpen(true);
// //   };

// //   useEffect(() => {
// //     if (!isLoading && !currentUser) {
// //       navigate('/login');
// //     }
// //   }, [currentUser, navigate, isLoading]);

// //   if (isLoading) {
// //     return (
// //       <div className="dashboard-wrapper">
// //         <div className="no-access">
// //           <div className="loading-spinner-large"></div>
// //           <h2>Loading...</h2>
// //           <p>Please wait while we load your dashboard...</p>
// //         </div>
// //       </div>
// //     );
// //   }

// //   if (!currentUser) {
// //     return (
// //       <div className="dashboard-wrapper">
// //         <div className="no-access">
// //           <h2>Access Denied</h2>
// //           <p>Please log in to view the dashboard.</p>
// //           <Link to="/login" className="login-link">
// //             Go to Login
// //           </Link>
// //         </div>
// //       </div>
// //     );
// //   }

// //   const userRole = getUserRole(currentUser);
// //   const volunteerStatus = getVolunteerStatus(currentUser);
  
// //   console.log('=== FINAL DASHBOARD DETERMINATION ===');
// //   console.log('User ID:', currentUser.user_id);
// //   console.log('Role Object:', currentUser.role);
// //   console.log('Role ID (from role object):', currentUser.role?.role_id);
// //   console.log('Role Name:', currentUser.role?.role_name);
// //   console.log('Approval Status ID:', currentUser.approval_status_id);
// //   console.log('Volunteer Object:', currentUser.volunteer);
// //   console.log('Final User Role:', userRole);
// //   console.log('Final Volunteer Status:', volunteerStatus);
// //   console.log('=====================================');

// //   const getStats = () => {
// //     const totalReports = userReports.length;
// //     const completedRescues = userReports.filter(r => r.status_id === 4).length;
// //     const activeVolunteers = 1;
// //     const pendingApprovals = 0;
    
// //     const userId = currentUser.user_id?.toString() || '';
    
// //     const myReports = userReports.filter(r => {
// //       const reportUserId = Number(r.user_id);
// //       const currentUserId = Number(userId);
// //       return reportUserId === currentUserId;
// //     });
// //     const myCompletedTasks = userReports.filter(r => r.status_id === 4).length;

// //     return {
// //       totalReports,
// //       completedRescues,
// //       activeVolunteers,
// //       pendingApprovals,
// //       myReports: myReports.length,
// //       myCompletedTasks,
// //     };
// //   };

// //   const stats = getStats();

// //   // Clean rendering logic
// //   const renderDashboard = () => {
// //     console.log('Rendering dashboard with:', { userRole, volunteerStatus });
    
// //     // Admin
// //     if (userRole === 'admin') {
// //       return <AdminDashboard stats={stats} reports={userReports} reportsLoading={reportsLoading} />;
// //     }
    
// //     // Approved Volunteer
// //     if (userRole === 'volunteer') {
// //       return <VolunteerDashboard 
// //         user={{...currentUser, role: userRole}} 
// //         stats={stats} 
// //         reports={userReports}
// //         reportsLoading={reportsLoading}
// //         userProfile={userProfile}
// //       />;
// //     }
    
// //     // User with pending volunteer application
// //     if (volunteerStatus === 'pending') {
// //       return <PendingVolunteerDashboard user={currentUser} />;
// //     }
    
// //     // User with rejected volunteer application
// //     if (volunteerStatus === 'rejected') {
// //       return <RejectedVolunteerDashboard />;
// //     }
    
// //     // Regular user (no volunteer status or not applied)
// //     return <UserDashboard 
// //       user={{...currentUser, role: userRole}} 
// //       userReports={userReports}
// //       reportsLoading={reportsLoading}
// //       onViewDetails={handleViewDetails}
// //       userProfile={userProfile}
// //     />;
// //   };

// //   return (
// //     <div className="dashboard-content">
// //       {renderDashboard()}
      
// //       <ReportDetailModal 
// //         report={selectedReport} 
// //         isOpen={isModalOpen} 
// //         onClose={() => setIsModalOpen(false)}
// //         userPhone={userProfile?.phone}
// //         userName={userProfile?.username}
// //       />
// //     </div>
// //   );
// // };

// // // Helper component for loading state
// // const LoadingSpinner: React.FC = () => (
// //   <div className="loading-spinner">
// //     <div className="spinner"></div>
// //     <p>Loading reports...</p>
// //   </div>
// // );

// // // ADMIN DASHBOARD - Keep original style
// // const AdminDashboard: React.FC<{ 
// //   stats: any, 
// //   reports: Report[], 
// //   reportsLoading: boolean
// // }> = ({ stats, reports, reportsLoading }) => {
// //   const chartData = [
// //     { name: 'Reports', value: stats.totalReports },
// //     { name: 'Rescued', value: stats.completedRescues },
// //     { name: 'Volunteers', value: stats.activeVolunteers },
// //   ];
// //   const COLORS = ['#A67C52', '#2D5A27', '#7D8C5A'];

// //   return (
// //     <div className="dashboard-wrapper animate-fade-in">
// //       <div className="admin-dashboard">
// //         <h2 className="admin-header">ResQAll Global Overview</h2>
        
// //         <div className="admin-stats-grid">
// //           <div className="stat-card">
// //             <p className="stat-label">Pending Operatives</p>
// //             <div className="stat-content">
// //               <div className="stat-value stat-value-earth">{stats.pendingApprovals}</div>
// //               {stats.pendingApprovals > 0 && (
// //                 <Link to="/admin/volunteers" className="stat-alert animate-pulse">
// //                   Review Now
// //                 </Link>
// //               )}
// //             </div>
// //           </div>
          
// //           <div className="stat-card">
// //             <p className="stat-label">Field Rangers</p>
// //             <div className="stat-value stat-value-emerald">{stats.activeVolunteers}</div>
// //           </div>
          
// //           <div className="stat-card">
// //             <p className="stat-label">Mission Reports</p>
// //             <div className="stat-value stat-value-emerald">
// //               {reportsLoading ? '...' : stats.totalReports}
// //             </div>
// //           </div>
          
// //           <div className="stat-card">
// //             <p className="stat-label">Saved Lives</p>
// //             <div className="stat-value stat-value-moss">
// //               {reportsLoading ? '...' : stats.completedRescues}
// //             </div>
// //           </div>
// //         </div>

// //         <div className="admin-charts-grid">
// //           <div className="chart-container">
// //             <h3 className="chart-title">Operational Metrics</h3>
            
// //             <div className="recharts-wrapper">
// //               {reportsLoading ? (
// //                 <div className="chart-loading">
// //                   <p>Loading chart data...</p>
// //                 </div>
// //               ) : (
// //                 <ResponsiveContainer width="100%" height={300}>
// //                   <BarChart data={chartData}>
// //                     <XAxis dataKey="name" axisLine={false} tickLine={false} />
// //                     <YAxis axisLine={false} tickLine={false} />
// //                     <Tooltip 
// //                       cursor={{fill: '#F5F1E8'}} 
// //                       formatter={(value) => [value, 'Count']}
// //                       labelFormatter={(label) => `${label}`}
// //                     />
// //                     <Bar 
// //                       dataKey="value" 
// //                       radius={[10, 10, 0, 0]}
// //                       barSize={60}
// //                     >
// //                       {chartData.map((entry, index) => (
// //                         <Cell 
// //                           key={`cell-${index}`} 
// //                           fill={COLORS[index % COLORS.length]} 
// //                         />
// //                       ))}
// //                     </Bar>
// //                   </BarChart>
// //                 </ResponsiveContainer>
// //               )}
// //             </div>
// //           </div>
          
// //           <div className="volunteer-alert-box">
// //             <div className="volunteer-alert-icon">
// //               ⚠️
// //             </div>
// //             <h3 className="volunteer-alert-title">Volunteer Queue</h3>
// //             <p className="volunteer-alert-text">
// //               There are {stats.pendingApprovals} rangers waiting for activation to join the ResQAll squad.
// //             </p>
// //             <Link to="/admin/volunteers" className="volunteer-alert-btn">
// //               Manage Operatives
// //             </Link>
// //           </div>
// //         </div>

// //         <div className="recent-reports-section">
// //           <h3 className="section-header">Recent Reports ({reports.length})</h3>
// //           <div className="reports-table-container">
// //             {reportsLoading ? (
// //               <div className="loading-message">
// //                 <div className="loading-spinner-small"></div>
// //                 <p>Loading reports...</p>
// //               </div>
// //             ) : reports.length > 0 ? (
// //               <>
// //                 <table className="reports-table">
// //                   <thead>
// //                     <tr>
// //                       <th>ID</th>
// //                       <th>Animal</th>
// //                       <th>Condition</th>
// //                       <th>Location</th>
// //                       <th>Reporter</th>
// //                       <th>Phone</th>
// //                       <th>Date</th>
// //                       <th>Status</th>
// //                     </tr>
// //                   </thead>
// //                   <tbody>
// //                     {reports.slice(0, 10).map((report) => (
// //                       <tr key={report.report_id}>
// //                         <td>#{report.report_id}</td>
// //                         <td className="animal-type">{report.animal_type || 'Unknown'}</td>
// //                         <td>{report.animal_condition || 'Unknown'}</td>
// //                         <td className="location-cell">{report.location_address || 'No location'}</td>
// //                         <td>{report.reporter_name || 'Anonymous'}</td>
// //                         <td>{report.reporter_phone || 'N/A'}</td>
// //                         <td className="report-date">
// //                           {report.submitted_at ? 
// //                             new Date(report.submitted_at).toLocaleDateString() : 
// //                             'Unknown date'}
// //                         </td>
// //                         <td>
// //                           <span className={`status-badge status-${getStatusClass(report.status_id)}`}>
// //                             {getStatusText(report.status_id)}
// //                           </span>
// //                         </td>
// //                       </tr>
// //                     ))}
// //                   </tbody>
// //                 </table>
// //                 {reports.length > 10 && (
// //                   <div className="view-all-container">
// //                     <Link to="/admin/reports" className="view-all-link">
// //                       View All Reports ({reports.length})
// //                     </Link>
// //                   </div>
// //                 )}
// //               </>
// //             ) : (
// //               <div className="no-reports">
// //                 <p>No reports found in the system.</p>
// //               </div>
// //             )}
// //           </div>
// //         </div>
// //       </div>
// //     </div>
// //   );
// // };

// // // VOLUNTEER DASHBOARD - Keep original style (with phone access to assigned reports)
// // const VolunteerDashboard: React.FC<{ 
// //   user: any, 
// //   stats: any, 
// //   reports: Report[],
// //   reportsLoading: boolean,
// //   userProfile: UserProfile | null
// // }> = ({ user, stats, reports, reportsLoading, userProfile }) => {
// //   const userId = user.user_id?.toString() || '';
  
// //   const myTasks = reports.filter(r => {
// //     return r.status_id === 3; // In Progress tasks
// //   });
  
// //   const inProgressTask = reports.find(r => {
// //     return r.status_id === 3;
// //   });
  
// //   const pendingTasks = reports.filter(r => r.status_id === 1);

// //   return (
// //     <div className="dashboard-wrapper animate-fade-in">
// //       <div className="volunteer-dashboard">
// //         <div className="volunteer-header-grid">
// //           <div className="volunteer-welcome-card">
// //             <div className="volunteer-welcome-paw">
// //               🐾
// //             </div>
// //             <h2 className="volunteer-welcome-title">Welcome back, Operative {user.username}</h2>
// //             {userProfile?.phone && (
// //               <p className="volunteer-contact-info">
// //                 📱 Contact: {userProfile.phone}
// //               </p>
// //             )}
// //             <p className="volunteer-welcome-text">
// //               Scanning sectors for animals in need. Ready for your next mission?
// //             </p>
// //             <div className="volunteer-welcome-btns">
// //               <Link to="/tasks" className="welcome-btn welcome-btn-primary">
// //                 Open Mission Board
// //               </Link>
// //               <Link to="/profile" className="welcome-btn welcome-btn-secondary">
// //                 My Service Medals
// //               </Link>
// //             </div>
// //           </div>

// //           <div className="volunteer-stats-column">
// //             <div className="volunteer-stat-card">
// //               <div className="stat-info">
// //                 <p className="stat-label-small">Successful Rescues</p>
// //                 <p className="stat-value-large">
// //                   {reportsLoading ? '...' : stats.myCompletedTasks}
// //                 </p>
// //               </div>
// //               <div className="stat-icon stat-icon-success">
// //                 ✓
// //               </div>
// //             </div>
            
// //             <div className="volunteer-stat-card">
// //               <div className="stat-info">
// //                 <p className="stat-label-small">Ranger Rank</p>
// //                 <p className="stat-value-medium">
// //                   Volunteer
// //                 </p>
// //               </div>
// //               <div className="stat-icon stat-icon-rank">
// //                 🏆
// //               </div>
// //             </div>
// //           </div>
// //         </div>

// //         <div className="mission-section">
// //           <h3 className="section-header">
// //             📻 Active Assignment
// //           </h3>
          
// //           {reportsLoading ? (
// //             <div className="square-assignment-grid">
// //               <div className="square-mission-card empty">
// //                 <div className="square-card-content centered">
// //                   <div className="no-mission-icon">
// //                     ⏰
// //                   </div>
// //                   <h4 className="no-mission-title">Loading Missions...</h4>
// //                   <p className="no-mission-text">
// //                     Fetching your assignments from the database...
// //                   </p>
// //                 </div>
// //               </div>
// //             </div>
// //           ) : inProgressTask ? (
// //             <div className="square-assignment-grid">
// //               <div className="square-mission-card active">
// //                 <div className="square-card-header">
// //                   <div className="square-status-badge in-field">IN FIELD</div>
// //                   <div className="square-volunteer-tag">{user.username?.toUpperCase()}</div>
// //                 </div>
                
// //                 <div className="square-card-content">
// //                   <div className="square-mission-title">
// //                     <h4 className="square-title">{inProgressTask.animal_type} Mission</h4>
// //                     <span className="square-condition critical">
// //                       {inProgressTask.animal_condition || 'CRITICAL'}
// //                     </span>
// //                   </div>
                  
// //                   <div className="square-location">
// //                     📍
// //                     <span className="location-text">{inProgressTask.location_address || 'Location not specified'}</span>
// //                   </div>
                  
// //                   {/* Show reporter info for volunteers */}
// //                   <div className="square-reporter-info">
// //                     <div className="reporter-name">
// //                       <span className="reporter-icon-small">👤</span>
// //                       {inProgressTask.reporter_name || 'Anonymous'}
// //                     </div>
// //                     {inProgressTask.reporter_phone && (
// //                       <div className="reporter-phone">
// //                         <span className="phone-icon-small">📱</span>
// //                         {inProgressTask.reporter_phone}
// //                       </div>
// //                     )}
// //                   </div>
                  
// //                   <p className="square-description">
// //                     {inProgressTask.description?.length > 80 
// //                       ? `${inProgressTask.description.substring(0, 80)}...` 
// //                       : inProgressTask.description || 'No description provided'}
// //                   </p>
                  
// //                   <div className="square-actions">
// //                     <Link 
// //                       to={`/tasks/${inProgressTask.report_id}`}
// //                       className="square-action-btn"
// //                     >
// //                       Update Report →
// //                     </Link>
// //                   </div>
// //                 </div>
// //               </div>

// //               {pendingTasks.length > 0 && (
// //                 <div className="square-mission-card pending">
// //                   <div className="square-card-header">
// //                     <div className="square-status-badge pending-badge">AVAILABLE</div>
// //                     <div className="square-count">{pendingTasks.length} waiting</div>
// //                   </div>
                  
// //                   <div className="square-card-content">
// //                     <div className="square-mission-title">
// //                       <h4 className="square-title">Available Missions</h4>
// //                       <span className="square-condition moderate">NEEDS VOLUNTEER</span>
// //                     </div>
                    
// //                     <div className="square-pending-list">
// //                       {pendingTasks.slice(0, 2).map((task) => (
// //                         <div key={task.report_id} className="pending-item">
// //                           <span className="pending-animal">{task.animal_type}</span>
// //                           <span className="pending-location">
// //                             📍{task.location_address?.split(',')[0] || 'Unknown'}
// //                           </span>
// //                           <div className="pending-reporter">
// //                             <small>👤 {task.reporter_name || 'Anonymous'}</small>
// //                           </div>
// //                         </div>
// //                       ))}
// //                       {pendingTasks.length > 2 && (
// //                         <div className="pending-more">
// //                           +{pendingTasks.length - 2} more missions
// //                         </div>
// //                       )}
// //                     </div>
                    
// //                     <div className="square-actions">
// //                       <Link to="/tasks" className="square-action-btn view-all">
// //                         View All →
// //                       </Link>
// //                     </div>
// //                   </div>
// //                 </div>
// //               )}
// //             </div>
// //           ) : (
// //             <div className="square-assignment-grid">
// //               <div className="square-mission-card empty">
// //                 <div className="square-card-content centered">
// //                   <div className="no-mission-icon">
// //                     ⏰
// //                   </div>
// //                   <h4 className="no-mission-title">No Active Missions</h4>
// //                   <p className="no-mission-text">
// //                     The sector is quiet. Head to the mission board to see new reports.
// //                   </p>
// //                   <Link to="/tasks" className="square-action-btn primary">
// //                     Go to Mission Board
// //                   </Link>
// //                 </div>
// //               </div>

// //               <div className="square-mission-card stats">
// //                 <div className="square-card-content">
// //                   <div className="quick-stats">
// //                     <div className="quick-stat-item">
// //                       <div className="quick-stat-icon">
// //                         ✓
// //                       </div>
// //                       <div className="quick-stat-info">
// //                         <div className="quick-stat-value">
// //                           {reportsLoading ? '...' : stats.myCompletedTasks}
// //                         </div>
// //                         <div className="quick-stat-label">Rescues</div>
// //                       </div>
// //                     </div>
// //                     <div className="quick-stat-item">
// //                       <div className="quick-stat-icon">
// //                         ⏰
// //                       </div>
// //                       <div className="quick-stat-info">
// //                         <div className="quick-stat-value">
// //                           {reportsLoading ? '...' : pendingTasks.length}
// //                         </div>
// //                         <div className="quick-stat-label">Available</div>
// //                       </div>
// //                     </div>
// //                     <div className="quick-stat-item">
// //                       <div className="quick-stat-icon">
// //                         🏆
// //                       </div>
// //                       <div className="quick-stat-info">
// //                         <div className="quick-stat-value">0</div>
// //                         <div className="quick-stat-label">Badges</div>
// //                       </div>
// //                     </div>
// //                   </div>
// //                   <Link to="/profile" className="square-action-btn secondary">
// //                     View Profile
// //                   </Link>
// //                 </div>
// //               </div>
// //             </div>
// //           )}
// //         </div>
// //       </div>
// //     </div>
// //   );
// // };

// // // PENDING VOLUNTEER - Keep original style
// // const PendingVolunteerDashboard: React.FC<{ user: any }> = ({ user }) => {
// //   return (
// //     <div className="dashboard-wrapper animate-fade-in">
// //       <div className="pending-volunteer">
// //         <div className="pending-icon">
// //           ⏰
// //         </div>
// //         <h2 className="pending-title">Activation Pending</h2>
// //         <p className="pending-text">
// //           Thank you for joining ResQAll. Our HQ is currently reviewing your ranger profile. 
// //           You will be notified via field log once approved.
// //         </p>
// //       </div>
// //     </div>
// //   );
// // };

// // // REJECTED VOLUNTEER - Keep original style
// // const RejectedVolunteerDashboard: React.FC = () => {
// //   return (
// //     <div className="dashboard-wrapper animate-fade-in">
// //       <div className="rejected-volunteer">
// //         <h2 className="rejected-title">Application Status</h2>
// //         <p className="rejected-text">Unfortunately, your ResQAll operative status was not approved.</p>
// //       </div>
// //     </div>
// //   );
// // };

// // // USER DASHBOARD - NEW STYLE with modal and phone
// // const UserDashboard: React.FC<{ 
// //   user: any; 
// //   userReports: Report[]; 
// //   reportsLoading: boolean;
// //   onViewDetails: (report: Report) => void;
// //   userProfile: UserProfile | null;
// // }> = ({ user, userReports, reportsLoading, onViewDetails, userProfile }) => {
// //   // Filter reports by current user
// //   const myReports = userReports.filter(report => {
// //     const reportUserId = Number(report.user_id);
// //     const currentUserId = Number(user.user_id);
// //     return reportUserId === currentUserId;
// //   });

// //   // Calculate statistics
// //   const totalReports = myReports.length;
// //   const submittedReports = myReports.filter(r => r.status_id === 1).length;
// //   const inProgressReports = myReports.filter(r => r.status_id === 3).length;
// //   const completedReports = myReports.filter(r => r.status_id === 4).length;

// //   // Get user's phone number
// //   const userPhone = userProfile?.phone;

// //   return (
// //     <div className="dashboard-wrapper animate-fade-in">
// //       <div className="user-dashboard">
// //         {/* Welcome Section */}
// //         <div className="user-welcome-section">
// //           <div className="user-welcome-content">
// //             <h2 className="user-welcome-title">
// //               <span className="user-welcome-greeting">Welcome back,</span>
// //               <span className="user-welcome-name">{user.username || 'Animal Friend'}!</span>
// //             </h2>
// //             {userPhone && (
// //               <p className="user-contact-info">
// //                 <span className="contact-icon">📱</span>
// //                 <span className="contact-text">Your contact: {userPhone}</span>
// //               </p>
// //             )}
// //             <p className="user-welcome-subtitle">
// //               Your reports help save animals in need.
// //             </p>
// //           </div>
// //           <Link to="/create-report" className="user-primary-btn">
// //             <span className="btn-icon">⚠️</span>
// //             File Field Report
// //           </Link>
// //         </div>

// //         {/* Statistics Cards */}
// //         <div className="user-stats-grid">
// //           <div className="user-stat-card">
// //             <div className="stat-card-icon total-reports">
// //               📄
// //             </div>
// //             <div className="stat-card-content">
// //               <h3 className="stat-card-value">{totalReports}</h3>
// //               <p className="stat-card-label">Total Reports</p>
// //             </div>
// //           </div>
          
// //           <div className="user-stat-card">
// //             <div className="stat-card-icon in-progress">
// //               ⏳
// //             </div>
// //             <div className="stat-card-content">
// //               <h3 className="stat-card-value">{inProgressReports}</h3>
// //               <p className="stat-card-label">In Progress</p>
// //             </div>
// //           </div>
          
// //           <div className="user-stat-card">
// //             <div className="stat-card-icon completed">
// //               ✓
// //             </div>
// //             <div className="stat-card-content">
// //               <h3 className="stat-card-value">{completedReports}</h3>
// //               <p className="stat-card-label">Completed</p>
// //             </div>
// //           </div>
          
// //           <div className="user-stat-card">
// //             <div className="stat-card-icon waiting">
// //               ⏰
// //             </div>
// //             <div className="stat-card-content">
// //               <h3 className="stat-card-value">{submittedReports}</h3>
// //               <p className="stat-card-label">Awaiting Review</p>
// //             </div>
// //           </div>
// //         </div>

// //         {/* Reports Section */}
// //         <div className="reports-section">
// //           <div className="reports-header">
// //             <h3 className="reports-title">Your Reports ({totalReports})</h3>
// //             {myReports.length > 0 && (
// //               <Link to="/my-reports" className="view-all-link">
// //                 View All →
// //               </Link>
// //             )}
// //           </div>
          
// //           <div className="reports-container">
// //             {reportsLoading ? (
// //               <LoadingSpinner />
// //             ) : myReports.length > 0 ? (
// //               <div className="reports-list">
// //                 {myReports.slice(0, 6).map(report => (
// //                   <div key={report.report_id} className="report-card">
// //                     <div className="report-card-header">
// //                       <div className="report-card-left">
// //                         <div className="animal-emoji-title">
// //                           <span className="animal-emoji">{getAnimalEmoji(report.animal_type)}</span>
// //                           <span className="animal-type-text">{report.animal_type || 'Unknown Animal'}</span>
// //                         </div>
// //                         <span className="condition-badge condition-info">
// //                           {report.animal_condition || 'Unknown'}
// //                         </span>
// //                       </div>
// //                       <span className={`status-badge status-${getStatusClass(report.status_id)}`}>
// //                         {getStatusText(report.status_id)}
// //                       </span>
// //                     </div>
                    
// //                     <div className="report-card-body">
// //                       <p className="report-description">
// //                         {report.description}
// //                       </p>
                      
// //                       <div className="report-info">
// //                         <div className="report-location">
// //                           <span className="location-icon">📍</span>
// //                           <span className="location-text">{report.location_address}</span>
// //                         </div>
                        
// //                         <div className="report-date">
// //                           <span className="date-icon">📅</span>
// //                           <span className="date-text">
// //                             {formatDate(report.submitted_at)}
// //                           </span>
// //                         </div>
// //                       </div>
                      
// //                       {report.user_note && (
// //                         <div className="user-note">
// //                           <strong>Your Note:</strong> {report.user_note}
// //                         </div>
// //                       )}
// //                     </div>
                    
// //                     <div className="report-card-footer">
// //                       <button 
// //                         className="report-details-link"
// //                         onClick={() => onViewDetails(report)}
// //                       >
// //                         View Details →
// //                       </button>
// //                     </div>
// //                   </div>
// //                 ))}
// //               </div>
// //             ) : (
// //               <div className="no-reports-message">
// //                 <div className="no-reports-icon">📝</div>
// //                 <h4 className="no-reports-title">No Reports Yet</h4>
// //                 <p className="no-reports-text">
// //                   You haven't filed any animal rescue reports yet.
// //                 </p>
// //                 <Link to="/create-report" className="no-reports-btn">
// //                   File Your First Report
// //                 </Link>
// //               </div>
// //             )}
            
// //             {myReports.length > 6 && (
// //               <div className="view-all-container">
// //                 <Link to="/my-reports" className="view-all-btn">
// //                   View All Reports ({myReports.length})
// //                 </Link>
// //               </div>
// //             )}
// //           </div>
// //         </div>
// //       </div>
// //     </div>
// //   );
// // };

// // export default Dashboard;

// import React, { useState, useEffect } from 'react';
// import { useNavigate, Link } from 'react-router-dom';
// import { 
//   BarChart, 
//   Bar, 
//   XAxis, 
//   YAxis, 
//   Tooltip, 
//   ResponsiveContainer, 
//   Cell 
// } from 'recharts';
// import { useAuth } from '../../context/AuthContext'; 
// import './Dashboard.css';

// // Define Report interface with status_name from database JOIN
// interface Report {
//   report_id: number;
//   user_id: number;
//   description: string;
//   location_address: string;
//   user_note: string;
//   submitted_at: string;
//   animal_type: string;
//   animal_condition: string;
//   status_id: number;
//   status_name: string; // This comes from database JOIN with report_statuses table
//   is_deleted?: number;
//   reporter_name?: string;
//   reporter_phone?: string;
//   volunteer_name?: string;
//   volunteer_id?: number;
// }

// // Define User Profile interface
// interface UserProfile {
//   user_id: number;
//   username: string;
//   email: string;
//   phone: string;
//   bio: string;
//   profile_image_url: string;
//   role_id: number;
//   created_at: string;
// }

// // Helper functions for status - USING DATABASE STATUS NAMES
// const getStatusText = (statusName: string): string => {
//   if (!statusName) return 'Unknown';
  
//   // Format the status name for display (from database: 'submitted', 'in_progress', etc.)
//   const formattedName = statusName
//     .replace(/_/g, ' ')  // Replace underscores with spaces
//     .split(' ')          // Split into words
//     .map(word => word.charAt(0).toUpperCase() + word.slice(1)) // Capitalize each word
//     .join(' ');          // Join back together
  
//   return formattedName;
// };

// const getStatusClass = (statusName: string): string => {
//   if (!statusName) return 'unknown';
  
//   const statusLower = statusName.toLowerCase();
  
//   if (statusLower.includes('submitted')) return 'submitted';
//   if (statusLower.includes('assigned')) return 'assigned';
//   if (statusLower.includes('in_progress')) return 'progress';
//   if (statusLower.includes('completed')) return 'completed';
//   if (statusLower.includes('declined')) return 'declined';
  
//   return 'unknown';
// };

// // Get animal emoji based on animal type
// const getAnimalEmoji = (animalType: string): string => {
//   const type = animalType?.toLowerCase() || '';
//   if (type.includes('dog')) return '🐶';
//   if (type.includes('cat')) return '🐱';
//   if (type.includes('bird')) return '🐦';
//   if (type.includes('rabbit') || type.includes('bunny')) return '🐰';
//   if (type.includes('hamster')) return '🐹';
//   if (type.includes('turtle') || type.includes('tortoise')) return '🐢';
//   if (type.includes('horse')) return '🐴';
//   if (type.includes('cow')) return '🐮';
//   if (type.includes('goat')) return '🐐';
//   if (type.includes('sheep')) return '🐑';
//   if (type.includes('fish')) return '🐠';
//   if (type.includes('snake')) return '🐍';
//   if (type.includes('mouse') || type.includes('rat')) return '🐭';
//   if (type.includes('monkey')) return '🐒';
//   if (type.includes('pig')) return '🐷';
//   if (type.includes('chicken')) return '🐔';
//   if (type.includes('duck')) return '🦆';
//   return '🐾';
// };

// // Format date for display
// const formatDate = (dateString: string): string => {
//   const date = new Date(dateString);
//   return date.toLocaleDateString('en-US', {
//     month: 'short',
//     day: 'numeric',
//     year: 'numeric',
//     hour: '2-digit',
//     minute: '2-digit'
//   });
// };

// // Report Detail Modal Component
// const ReportDetailModal: React.FC<{
//   report: Report | null;
//   isOpen: boolean;
//   onClose: () => void;
//   userPhone?: string;
//   userName?: string;
// }> = ({ report, isOpen, onClose, userPhone, userName }) => {
//   if (!isOpen || !report) return null;

//   // Use reporter info from report or fall back to current user info
//   const reporterName = report.reporter_name || userName;
//   const phoneNumber = report.reporter_phone || userPhone;

//   const isEditable = report.status_name?.toLowerCase() === 'submitted';

//   // Helper function to check if phone exists
//   const hasPhone = (phone?: string | null): boolean => {
//     if (phone === null || phone === undefined) return false;
//     if (typeof phone !== 'string') return false;
//     return phone.trim().length > 0;
//   };

//   // Format phone number for display
//   const formatPhoneNumber = (phone?: string | null): string => {
//     if (!hasPhone(phone)) {
//       return 'Not provided';
//     }
    
//     const phoneStr = String(phone).trim();
//     const cleaned = phoneStr.replace(/\D/g, '');
    
//     if (cleaned.length === 10) {
//       return `+977 ${cleaned}`;
//     }
    
//     return phoneStr;
//   };

//   const getConditionIcon = (condition: string): string => {
//     const cond = condition?.toLowerCase() || '';
//     if (cond.includes('critical') || cond.includes('emergency')) return '🆘';
//     if (cond.includes('severe') || cond.includes('serious')) return '⚠️';
//     if (cond.includes('moderate') || cond.includes('injured')) return '🩹';
//     if (cond.includes('mild') || cond.includes('sick')) return '🤒';
//     if (cond.includes('abandoned') || cond.includes('lost')) return '💔';
//     if (cond.includes('healthy') || cond.includes('safe')) return '✅';
//     return 'ℹ️';
//   };

//   // Get status text and class from database status_name
//   const statusText = getStatusText(report.status_name);
//   const statusClass = getStatusClass(report.status_name);

//   return (
//     <div className="modal-overlay" onClick={onClose}>
//       <div className="modal-content" onClick={e => e.stopPropagation()}>
//         <div className="modal-header">
//           <div className="modal-header-left">
//             <span className="modal-animal-emoji">{getAnimalEmoji(report.animal_type)}</span>
//             <div>
//               <h3 className="modal-title">Report #{report.report_id}</h3>
//               <p className="modal-subtitle">{report.animal_type} • {report.animal_condition}</p>
//             </div>
//           </div>
//           <button className="modal-close" onClick={onClose}>×</button>
//         </div>
        
//         <div className="modal-body">
//           {/* Top row with status */}
//           <div className="modal-top-row">
//             <div className="modal-status">
//               <span className={`status-badge-large status-${statusClass}`}>
//                 {statusText}
//               </span>
//               {!isEditable && (
//                 <span className="non-editable-badge">Non-editable</span>
//               )}
//             </div>
//           </div>

//           {/* Your Information Section */}
//           <div className="modal-section">
//             <h4 className="modal-section-title">
//               <span className="section-icon">👤</span>
//               Your Information
//             </h4>
//             <div className="modal-detail-grid">
//               <div className="detail-item">
//                 <span className="detail-label">Name</span>
//                 <span className="detail-value">{reporterName || 'Anonymous'}</span>
//               </div>
//               <div className="detail-item">
//                 <span className="detail-label">User ID</span>
//                 <span className="detail-value">#{report.user_id}</span>
//               </div>
//               {hasPhone(phoneNumber) && (
//                 <div className="detail-item">
//                   <span className="detail-label">Phone</span>
//                   <span className="detail-value phone-emphasis">
//                     {formatPhoneNumber(phoneNumber)}
//                   </span>
//                 </div>
//               )}
//             </div>
//           </div>

//           {/* Animal Information Section */}
//           <div className="modal-section">
//             <h4 className="modal-section-title">
//               <span className="section-icon">🐾</span>
//               Animal Information
//             </h4>
//             <div className="modal-detail-grid">
//               <div className="detail-item">
//                 <span className="detail-label">Animal Type</span>
//                 <div className="detail-value-with-emoji">
//                   <span className="detail-emoji">{getAnimalEmoji(report.animal_type)}</span>
//                   <span>{report.animal_type || 'Unknown Animal'}</span>
//                 </div>
//               </div>
//               <div className="detail-item">
//                 <span className="detail-label">Condition</span>
//                 <div className="detail-value-with-emoji">
//                   <span className="detail-emoji">{getConditionIcon(report.animal_condition)}</span>
//                   <span>{report.animal_condition || 'Not specified'}</span>
//                 </div>
//               </div>
//             </div>
//           </div>

//           {/* Location Details */}
//           <div className="modal-section">
//             <h4 className="modal-section-title">
//               <span className="section-icon">📍</span>
//               Location Details
//             </h4>
//             <div className="location-card">
//               <div className="location-content">
//                 <span className="location-icon-large">📍</span>
//                 <span className="location-text">{report.location_address}</span>
//               </div>
//             </div>
//           </div>

//           {/* Description */}
//           <div className="modal-section">
//             <h4 className="modal-section-title">
//               <span className="section-icon">📝</span>
//               Description
//             </h4>
//             <div className="description-card">
//               <p className="description-text">{report.description}</p>
//             </div>
//           </div>

//           {/* Show assigned volunteer name only (no phone) */}
//           {report.volunteer_name && (
//             <div className="modal-section">
//               <h4 className="modal-section-title">
//                 <span className="section-icon">🦸</span>
//                 Assigned Volunteer
//               </h4>
//               <div className="detail-item">
//                 <div className="detail-value-with-emoji">
//                   <span className="detail-emoji">🦸</span>
//                   <span>{report.volunteer_name}</span>
//                 </div>
//               </div>
//             </div>
//           )}

//           {/* Timeline */}
//           <div className="modal-section">
//             <h4 className="modal-section-title">
//               <span className="section-icon">📅</span>
//               Timeline
//             </h4>
//             <div className="timeline-card">
//               <div className="timeline-item">
//                 <div className="timeline-icon">📅</div>
//                 <div className="timeline-content">
//                   <div className="timeline-label">Report Submitted</div>
//                   <div className="timeline-value">{formatDate(report.submitted_at)}</div>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>
        
//         <div className="modal-footer">
//           <button className="modal-btn secondary" onClick={onClose}>
//             Close
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// };

// export const Dashboard: React.FC = () => {
//   const [isLoading, setIsLoading] = useState(true);
//   const [userReports, setUserReports] = useState<Report[]>([]);
//   const [reportsLoading, setReportsLoading] = useState(true);
//   const [userProfile, setUserProfile] = useState<UserProfile | null>(null);
//   const [selectedReport, setSelectedReport] = useState<Report | null>(null);
//   const [isModalOpen, setIsModalOpen] = useState(false);
//   const navigate = useNavigate();
  
//   const { user: currentUser } = useAuth();
  
//   // Fetch user profile (including phone number)
//   useEffect(() => {
//     const fetchUserProfile = async () => {
//       if (!currentUser) return;
      
//       try {
//         const token = localStorage.getItem('token');
//         const response = await fetch('http://localhost:5000/api/users/profile', {
//           headers: {
//             'Authorization': `Bearer ${token}`,
//             'Content-Type': 'application/json'
//           }
//         });

//         if (response.ok) {
//           const data = await response.json();
//           if (data.success) {
//             setUserProfile(data.data);
//           }
//         }
//       } catch (err) {
//         console.error('Error fetching user profile:', err);
//       }
//     };

//     fetchUserProfile();
//   }, [currentUser]);

//   // Fetch user's reports from backend WITH STATUS NAMES from report_statuses table
//   useEffect(() => {
//     const fetchUserReports = async () => {
//       if (!currentUser) return;
      
//       try {
//         setReportsLoading(true);
//         const token = localStorage.getItem('token');
        
//         console.log('🔍 Fetching reports with status names from database...');
        
//         const response = await fetch('http://localhost:5000/api/reports/my-reports', {
//           headers: {
//             'Authorization': `Bearer ${token}`,
//             'Content-Type': 'application/json'
//           }
//         });
        
//         if (response.ok) {
//           const data = await response.json();
//           console.log('📊 API response received:', {
//             success: data.success,
//             count: data.count,
//             dataLength: data.data?.length
//           });
          
//           if (data.success) {
//             const reportsData = data.data || [];
            
//             // Debug: Log what fields we're getting from the database
//             if (reportsData.length > 0) {
//               const sampleReport = reportsData[0];
//               console.log('📋 Sample report fields:', Object.keys(sampleReport));
//               console.log('📋 Sample report status data:', {
//                 status_id: sampleReport.status_id,
//                 status_name: sampleReport.status_name,
//                 animal_type: sampleReport.animal_type,
//                 animal_condition: sampleReport.animal_condition
//               });
//             }
            
//             // Log all status names to verify they're coming from database
//             console.log('📊 All report statuses from database:');
//             reportsData.forEach((report: Report, index: number) => {
//               console.log(`Report ${index + 1}: ID=${report.report_id}, Status=${report.status_name} (ID: ${report.status_id})`);
//             });
            
//             // Add current user's info to each report
//             const reportsWithUserInfo = reportsData.map((report: Report) => ({
//               ...report,
//               reporter_name: userProfile?.username || currentUser.username,
//               reporter_phone: userProfile?.phone || ''
//             }));
            
//             setUserReports(reportsWithUserInfo);
//             console.log(`✅ Loaded ${reportsWithUserInfo.length} reports with status names from database`);
//           } else {
//             console.error('❌ API returned success: false', data);
//           }
//         } else {
//           console.error('❌ Failed to fetch reports:', response.status, response.statusText);
//         }
//       } catch (error) {
//         console.error('❌ Error fetching reports:', error);
//       } finally {
//         setReportsLoading(false);
//       }
//     };
    
//     if (currentUser) {
//       fetchUserReports();
//     }
//   }, [currentUser, userProfile]);
  
//   useEffect(() => {
//     if (currentUser) {
//       setIsLoading(false);
//     } else {
//       const timer = setTimeout(() => {
//         setIsLoading(false);
//       }, 1000);
//       return () => clearTimeout(timer);
//     }
//   }, [currentUser]);
  
//   const getUserRole = (user: any): string => {
//     if (!user) return 'user';
    
//     if (user.role && typeof user.role === 'object' && user.role.role_name) {
//       return user.role.role_name.toLowerCase();
//     }
    
//     if (user.role_name) {
//       return user.role_name.toLowerCase();
//     }
    
//     if (user.role_id) {
//       if (user.role_id === 3) return 'admin';
//       if (user.role_id === 2) return 'volunteer';
//       if (user.role_id === 1) return 'user';
//     }
    
//     return 'user';
//   };
  
//   const getVolunteerStatus = (user: any): string | null => {
//     if (!user) return null;

//     if (user.approval_status_id) {
//       if (user.approval_status_id === 1) return 'pending';
//       if (user.approval_status_id === 2) return 'approved';
//       if (user.approval_status_id === 3) return 'rejected';
//     }

//     if (user.volunteer) {
//       if (user.volunteer.approval_status_id) {
//         if (user.volunteer.approval_status_id === 1) return 'pending';
//         if (user.volunteer.approval_status_id === 2) return 'approved';
//         if (user.volunteer.approval_status_id === 3) return 'rejected';
//       }
      
//       if (user.volunteer.status) {
//         return user.volunteer.status.toLowerCase();
//       }
//     }

//     if (user.volunteer_status) {
//       return user.volunteer_status.toLowerCase();
//     }

//     return null;
//   };

//   const handleViewDetails = (report: Report) => {
//     setSelectedReport(report);
//     setIsModalOpen(true);
//   };

//   useEffect(() => {
//     if (!isLoading && !currentUser) {
//       navigate('/login');
//     }
//   }, [currentUser, navigate, isLoading]);

//   if (isLoading) {
//     return (
//       <div className="dashboard-wrapper">
//         <div className="no-access">
//           <div className="loading-spinner-large"></div>
//           <h2>Loading...</h2>
//           <p>Please wait while we load your dashboard...</p>
//         </div>
//       </div>
//     );
//   }

//   if (!currentUser) {
//     return (
//       <div className="dashboard-wrapper">
//         <div className="no-access">
//           <h2>Access Denied</h2>
//           <p>Please log in to view the dashboard.</p>
//           <Link to="/login" className="login-link">
//             Go to Login
//           </Link>
//         </div>
//       </div>
//     );
//   }

//   const userRole = getUserRole(currentUser);
//   const volunteerStatus = getVolunteerStatus(currentUser);

//   const getStats = () => {
//     const totalReports = userReports.length;
//     const completedRescues = userReports.filter(r => 
//       r.status_name?.toLowerCase() === 'completed'
//     ).length;
//     const activeVolunteers = 1;
//     const pendingApprovals = 0;
    
//     const userId = currentUser.user_id?.toString() || '';
    
//     const myReports = userReports.filter(r => {
//       const reportUserId = Number(r.user_id);
//       const currentUserId = Number(userId);
//       return reportUserId === currentUserId;
//     });
    
//     const myCompletedTasks = userReports.filter(r => 
//       r.status_name?.toLowerCase() === 'completed'
//     ).length;

//     return {
//       totalReports,
//       completedRescues,
//       activeVolunteers,
//       pendingApprovals,
//       myReports: myReports.length,
//       myCompletedTasks,
//     };
//   };

//   const stats = getStats();

//   // Clean rendering logic
//   const renderDashboard = () => {
//     console.log('👤 Rendering dashboard for:', { 
//       username: currentUser.username,
//       userRole, 
//       volunteerStatus 
//     });
    
//     // Admin
//     if (userRole === 'admin') {
//       return <AdminDashboard 
//         stats={stats} 
//         reports={userReports} 
//         reportsLoading={reportsLoading} 
//       />;
//     }
    
//     // Approved Volunteer
//     if (userRole === 'volunteer') {
//       return <VolunteerDashboard 
//         user={{...currentUser, role: userRole}} 
//         stats={stats} 
//         reports={userReports}
//         reportsLoading={reportsLoading}
//         userProfile={userProfile}
//       />;
//     }
    
//     // User with pending volunteer application
//     if (volunteerStatus === 'pending') {
//       return <PendingVolunteerDashboard user={currentUser} />;
//     }
    
//     // User with rejected volunteer application
//     if (volunteerStatus === 'rejected') {
//       return <RejectedVolunteerDashboard />;
//     }
    
//     // Regular user (no volunteer status or not applied)
//     return <UserDashboard 
//       user={{...currentUser, role: userRole}} 
//       userReports={userReports}
//       reportsLoading={reportsLoading}
//       onViewDetails={handleViewDetails}
//       userProfile={userProfile}
//     />;
//   };

//   return (
//     <div className="dashboard-content">
//       {renderDashboard()}
      
//       <ReportDetailModal 
//         report={selectedReport} 
//         isOpen={isModalOpen} 
//         onClose={() => setIsModalOpen(false)}
//         userPhone={userProfile?.phone}
//         userName={userProfile?.username}
//       />
//     </div>
//   );
// };

// // Helper component for loading state
// const LoadingSpinner: React.FC = () => (
//   <div className="loading-spinner">
//     <div className="spinner"></div>
//     <p>Loading reports...</p>
//   </div>
// );

// // ADMIN DASHBOARD
// const AdminDashboard: React.FC<{ 
//   stats: any, 
//   reports: Report[], 
//   reportsLoading: boolean
// }> = ({ stats, reports, reportsLoading }) => {
//   const chartData = [
//     { name: 'Reports', value: stats.totalReports },
//     { name: 'Rescued', value: stats.completedRescues },
//     { name: 'Volunteers', value: stats.activeVolunteers },
//   ];
//   const COLORS = ['#A67C52', '#2D5A27', '#7D8C5A'];

//   return (
//     <div className="dashboard-wrapper animate-fade-in">
//       <div className="admin-dashboard">
//         <h2 className="admin-header">ResQAll Global Overview</h2>
        
//         <div className="admin-stats-grid">
//           <div className="stat-card">
//             <p className="stat-label">Pending Operatives</p>
//             <div className="stat-content">
//               <div className="stat-value stat-value-earth">{stats.pendingApprovals}</div>
//               {stats.pendingApprovals > 0 && (
//                 <Link to="/admin/volunteers" className="stat-alert animate-pulse">
//                   Review Now
//                 </Link>
//               )}
//             </div>
//           </div>
          
//           <div className="stat-card">
//             <p className="stat-label">Field Rangers</p>
//             <div className="stat-value stat-value-emerald">{stats.activeVolunteers}</div>
//           </div>
          
//           <div className="stat-card">
//             <p className="stat-label">Mission Reports</p>
//             <div className="stat-value stat-value-emerald">
//               {reportsLoading ? '...' : stats.totalReports}
//             </div>
//           </div>
          
//           <div className="stat-card">
//             <p className="stat-label">Saved Lives</p>
//             <div className="stat-value stat-value-moss">
//               {reportsLoading ? '...' : stats.completedRescues}
//             </div>
//           </div>
//         </div>

//         <div className="admin-charts-grid">
//           <div className="chart-container">
//             <h3 className="chart-title">Operational Metrics</h3>
            
//             <div className="recharts-wrapper">
//               {reportsLoading ? (
//                 <div className="chart-loading">
//                   <p>Loading chart data...</p>
//                 </div>
//               ) : (
//                 <ResponsiveContainer width="100%" height={300}>
//                   <BarChart data={chartData}>
//                     <XAxis dataKey="name" axisLine={false} tickLine={false} />
//                     <YAxis axisLine={false} tickLine={false} />
//                     <Tooltip 
//                       cursor={{fill: '#F5F1E8'}} 
//                       formatter={(value) => [value, 'Count']}
//                       labelFormatter={(label) => `${label}`}
//                     />
//                     <Bar 
//                       dataKey="value" 
//                       radius={[10, 10, 0, 0]}
//                       barSize={60}
//                     >
//                       {chartData.map((entry, index) => (
//                         <Cell 
//                           key={`cell-${index}`} 
//                           fill={COLORS[index % COLORS.length]} 
//                         />
//                       ))}
//                     </Bar>
//                   </BarChart>
//                 </ResponsiveContainer>
//               )}
//             </div>
//           </div>
          
//           <div className="volunteer-alert-box">
//             <div className="volunteer-alert-icon">
//               ⚠️
//             </div>
//             <h3 className="volunteer-alert-title">Volunteer Queue</h3>
//             <p className="volunteer-alert-text">
//               There are {stats.pendingApprovals} rangers waiting for activation to join the ResQAll squad.
//             </p>
//             <Link to="/admin/volunteers" className="volunteer-alert-btn">
//               Manage Operatives
//             </Link>
//           </div>
//         </div>

//         <div className="recent-reports-section">
//           <h3 className="section-header">Recent Reports ({reports.length})</h3>
//           <div className="reports-table-container">
//             {reportsLoading ? (
//               <div className="loading-message">
//                 <div className="loading-spinner-small"></div>
//                 <p>Loading reports...</p>
//               </div>
//             ) : reports.length > 0 ? (
//               <>
//                 <table className="reports-table">
//                   <thead>
//                     <tr>
//                       <th>ID</th>
//                       <th>Animal</th>
//                       <th>Condition</th>
//                       <th>Location</th>
//                       <th>Reporter</th>
//                       <th>Phone</th>
//                       <th>Date</th>
//                       <th>Status</th>
//                     </tr>
//                   </thead>
//                   <tbody>
//                     {reports.slice(0, 10).map((report) => (
//                       <tr key={report.report_id}>
//                         <td>#{report.report_id}</td>
//                         <td className="animal-type">{report.animal_type || 'Unknown'}</td>
//                         <td>{report.animal_condition || 'Unknown'}</td>
//                         <td className="location-cell">{report.location_address || 'No location'}</td>
//                         <td>{report.reporter_name || 'Anonymous'}</td>
//                         <td>{report.reporter_phone || 'N/A'}</td>
//                         <td className="report-date">
//                           {report.submitted_at ? 
//                             new Date(report.submitted_at).toLocaleDateString() : 
//                             'Unknown date'}
//                         </td>
//                         <td>
//                           <span className={`status-badge status-${getStatusClass(report.status_name)}`}>
//                             {getStatusText(report.status_name)}
//                           </span>
//                         </td>
//                       </tr>
//                     ))}
//                   </tbody>
//                 </table>
//                 {reports.length > 10 && (
//                   <div className="view-all-container">
//                     <Link to="/admin/reports" className="view-all-link">
//                       View All Reports ({reports.length})
//                     </Link>
//                   </div>
//                 )}
//               </>
//             ) : (
//               <div className="no-reports">
//                 <p>No reports found in the system.</p>
//               </div>
//             )}
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// // VOLUNTEER DASHBOARD
// const VolunteerDashboard: React.FC<{ 
//   user: any, 
//   stats: any, 
//   reports: Report[],
//   reportsLoading: boolean,
//   userProfile: UserProfile | null
// }> = ({ user, stats, reports, reportsLoading, userProfile }) => {
//   const userId = user.user_id?.toString() || '';
  
//   const myTasks = reports.filter(r => {
//     return r.status_name?.toLowerCase() === 'in_progress';
//   });
  
//   const inProgressTask = reports.find(r => {
//     return r.status_name?.toLowerCase() === 'in_progress';
//   });
  
//   const pendingTasks = reports.filter(r => r.status_name?.toLowerCase() === 'submitted');

//   return (
//     <div className="dashboard-wrapper animate-fade-in">
//       <div className="volunteer-dashboard">
//         <div className="volunteer-header-grid">
//           <div className="volunteer-welcome-card">
//             <div className="volunteer-welcome-paw">
//               🐾
//             </div>
//             <h2 className="volunteer-welcome-title">Welcome back, Operative {user.username}</h2>
//             {userProfile?.phone && (
//               <p className="volunteer-contact-info">
//                 📱 Contact: {userProfile.phone}
//               </p>
//             )}
//             <p className="volunteer-welcome-text">
//               Scanning sectors for animals in need. Ready for your next mission?
//             </p>
//             <div className="volunteer-welcome-btns">
//               <Link to="/tasks" className="welcome-btn welcome-btn-primary">
//                 Open Mission Board
//               </Link>
//               <Link to="/profile" className="welcome-btn welcome-btn-secondary">
//                 My Service Medals
//               </Link>
//             </div>
//           </div>

//           <div className="volunteer-stats-column">
//             <div className="volunteer-stat-card">
//               <div className="stat-info">
//                 <p className="stat-label-small">Successful Rescues</p>
//                 <p className="stat-value-large">
//                   {reportsLoading ? '...' : stats.myCompletedTasks}
//                 </p>
//               </div>
//               <div className="stat-icon stat-icon-success">
//                 ✓
//               </div>
//             </div>
            
//             <div className="volunteer-stat-card">
//               <div className="stat-info">
//                 <p className="stat-label-small">Ranger Rank</p>
//                 <p className="stat-value-medium">
//                   Volunteer
//                 </p>
//               </div>
//               <div className="stat-icon stat-icon-rank">
//                 🏆
//               </div>
//             </div>
//           </div>
//         </div>

//         <div className="mission-section">
//           <h3 className="section-header">
//             📻 Active Assignment
//           </h3>
          
//           {reportsLoading ? (
//             <div className="square-assignment-grid">
//               <div className="square-mission-card empty">
//                 <div className="square-card-content centered">
//                   <div className="no-mission-icon">
//                     ⏰
//                   </div>
//                   <h4 className="no-mission-title">Loading Missions...</h4>
//                   <p className="no-mission-text">
//                     Fetching your assignments from the database...
//                   </p>
//                 </div>
//               </div>
//             </div>
//           ) : inProgressTask ? (
//             <div className="square-assignment-grid">
//               <div className="square-mission-card active">
//                 <div className="square-card-header">
//                   <div className="square-status-badge in-field">IN FIELD</div>
//                   <div className="square-volunteer-tag">{user.username?.toUpperCase()}</div>
//                 </div>
                
//                 <div className="square-card-content">
//                   <div className="square-mission-title">
//                     <h4 className="square-title">{inProgressTask.animal_type} Mission</h4>
//                     <span className="square-condition critical">
//                       {inProgressTask.animal_condition || 'CRITICAL'}
//                     </span>
//                   </div>
                  
//                   <div className="square-location">
//                     📍
//                     <span className="location-text">{inProgressTask.location_address || 'Location not specified'}</span>
//                   </div>
                  
//                   {/* Show reporter info for volunteers */}
//                   <div className="square-reporter-info">
//                     <div className="reporter-name">
//                       <span className="reporter-icon-small">👤</span>
//                       {inProgressTask.reporter_name || 'Anonymous'}
//                     </div>
//                     {inProgressTask.reporter_phone && (
//                       <div className="reporter-phone">
//                         <span className="phone-icon-small">📱</span>
//                         {inProgressTask.reporter_phone}
//                       </div>
//                     )}
//                   </div>
                  
//                   <p className="square-description">
//                     {inProgressTask.description?.length > 80 
//                       ? `${inProgressTask.description.substring(0, 80)}...` 
//                       : inProgressTask.description || 'No description provided'}
//                   </p>
                  
//                   <div className="square-actions">
//                     <Link 
//                       to={`/tasks/${inProgressTask.report_id}`}
//                       className="square-action-btn"
//                     >
//                       Update Report →
//                     </Link>
//                   </div>
//                 </div>
//               </div>

//               {pendingTasks.length > 0 && (
//                 <div className="square-mission-card pending">
//                   <div className="square-card-header">
//                     <div className="square-status-badge pending-badge">AVAILABLE</div>
//                     <div className="square-count">{pendingTasks.length} waiting</div>
//                   </div>
                  
//                   <div className="square-card-content">
//                     <div className="square-mission-title">
//                       <h4 className="square-title">Available Missions</h4>
//                       <span className="square-condition moderate">NEEDS VOLUNTEER</span>
//                     </div>
                    
//                     <div className="square-pending-list">
//                       {pendingTasks.slice(0, 2).map((task) => (
//                         <div key={task.report_id} className="pending-item">
//                           <span className="pending-animal">{task.animal_type}</span>
//                           <span className="pending-location">
//                             📍{task.location_address?.split(',')[0] || 'Unknown'}
//                           </span>
//                           <div className="pending-reporter">
//                             <small>👤 {task.reporter_name || 'Anonymous'}</small>
//                           </div>
//                           <div className="pending-status">
//                             <small>
//                               Status: {getStatusText(task.status_name)}
//                             </small>
//                           </div>
//                         </div>
//                       ))}
//                       {pendingTasks.length > 2 && (
//                         <div className="pending-more">
//                           +{pendingTasks.length - 2} more missions
//                         </div>
//                       )}
//                     </div>
                    
//                     <div className="square-actions">
//                       <Link to="/tasks" className="square-action-btn view-all">
//                         View All →
//                       </Link>
//                     </div>
//                   </div>
//                 </div>
//               )}
//             </div>
//           ) : (
//             <div className="square-assignment-grid">
//               <div className="square-mission-card empty">
//                 <div className="square-card-content centered">
//                   <div className="no-mission-icon">
//                     ⏰
//                   </div>
//                   <h4 className="no-mission-title">No Active Missions</h4>
//                   <p className="no-mission-text">
//                     The sector is quiet. Head to the mission board to see new reports.
//                   </p>
//                   <Link to="/tasks" className="square-action-btn primary">
//                     Go to Mission Board
//                   </Link>
//                 </div>
//               </div>

//               <div className="square-mission-card stats">
//                 <div className="square-card-content">
//                   <div className="quick-stats">
//                     <div className="quick-stat-item">
//                       <div className="quick-stat-icon">
//                         ✓
//                       </div>
//                       <div className="quick-stat-info">
//                         <div className="quick-stat-value">
//                           {reportsLoading ? '...' : stats.myCompletedTasks}
//                         </div>
//                         <div className="quick-stat-label">Rescues</div>
//                       </div>
//                     </div>
//                     <div className="quick-stat-item">
//                       <div className="quick-stat-icon">
//                         ⏰
//                       </div>
//                       <div className="quick-stat-info">
//                         <div className="quick-stat-value">
//                           {reportsLoading ? '...' : pendingTasks.length}
//                         </div>
//                         <div className="quick-stat-label">Available</div>
//                       </div>
//                     </div>
//                     <div className="quick-stat-item">
//                       <div className="quick-stat-icon">
//                         🏆
//                       </div>
//                       <div className="quick-stat-info">
//                         <div className="quick-stat-value">0</div>
//                         <div className="quick-stat-label">Badges</div>
//                       </div>
//                     </div>
//                   </div>
//                   <Link to="/profile" className="square-action-btn secondary">
//                     View Profile
//                   </Link>
//                 </div>
//               </div>
//             </div>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// };

// // PENDING VOLUNTEER
// const PendingVolunteerDashboard: React.FC<{ user: any }> = ({ user }) => {
//   return (
//     <div className="dashboard-wrapper animate-fade-in">
//       <div className="pending-volunteer">
//         <div className="pending-icon">
//           ⏰
//         </div>
//         <h2 className="pending-title">Activation Pending</h2>
//         <p className="pending-text">
//           Thank you for joining ResQAll. Our HQ is currently reviewing your ranger profile. 
//           You will be notified via field log once approved.
//         </p>
//       </div>
//     </div>
//   );
// };

// // REJECTED VOLUNTEER
// const RejectedVolunteerDashboard: React.FC = () => {
//   return (
//     <div className="dashboard-wrapper animate-fade-in">
//       <div className="rejected-volunteer">
//         <h2 className="rejected-title">Application Status</h2>
//         <p className="rejected-text">Unfortunately, your ResQAll operative status was not approved.</p>
//       </div>
//     </div>
//   );
// };

// // USER DASHBOARD
// const UserDashboard: React.FC<{ 
//   user: any; 
//   userReports: Report[]; 
//   reportsLoading: boolean;
//   onViewDetails: (report: Report) => void;
//   userProfile: UserProfile | null;
// }> = ({ user, userReports, reportsLoading, onViewDetails, userProfile }) => {
//   // Filter reports by current user
//   const myReports = userReports.filter(report => {
//     const reportUserId = Number(report.user_id);
//     const currentUserId = Number(user.user_id);
//     return reportUserId === currentUserId;
//   });

//   // Calculate statistics using status_name from database
//   const totalReports = myReports.length;
//   const submittedReports = myReports.filter(r => r.status_name?.toLowerCase() === 'submitted').length;
//   const assignedReports = myReports.filter(r => r.status_name?.toLowerCase() === 'assigned').length;
//   const inProgressReports = myReports.filter(r => r.status_name?.toLowerCase() === 'in_progress').length;
//   const completedReports = myReports.filter(r => r.status_name?.toLowerCase() === 'completed').length;
//   const declinedReports = myReports.filter(r => r.status_name?.toLowerCase() === 'declined').length;

//   // Get user's phone number
//   const userPhone = userProfile?.phone;

//   return (
//     <div className="dashboard-wrapper animate-fade-in">
//       <div className="user-dashboard">
//         {/* Welcome Section */}
//         <div className="user-welcome-section">
//           <div className="user-welcome-content">
//             <h2 className="user-welcome-title">
//               <span className="user-welcome-greeting">Welcome back,</span>
//               <span className="user-welcome-name">{user.username || 'Animal Friend'}!</span>
//             </h2>
//             {userPhone && (
//               <p className="user-contact-info">
//                 <span className="contact-icon">📱</span>
//                 <span className="contact-text">Your contact: {userPhone}</span>
//               </p>
//             )}
//             <p className="user-welcome-subtitle">
//               Your reports help save animals in need.
//             </p>
//           </div>
//           <Link to="/create-report" className="user-primary-btn">
//             <span className="btn-icon">⚠️</span>
//             File Field Report
//           </Link>
//         </div>

//         {/* Statistics Cards */}
//         <div className="user-stats-grid">
//           <div className="user-stat-card">
//             <div className="stat-card-icon total-reports">
//               📄
//             </div>
//             <div className="stat-card-content">
//               <h3 className="stat-card-value">{totalReports}</h3>
//               <p className="stat-card-label">Total Reports</p>
//             </div>
//           </div>
          
//           <div className="user-stat-card">
//             <div className="stat-card-icon in-progress">
//               ⏳
//             </div>
//             <div className="stat-card-content">
//               <h3 className="stat-card-value">{inProgressReports}</h3>
//               <p className="stat-card-label">In Progress</p>
//             </div>
//           </div>
          
//           <div className="user-stat-card">
//             <div className="stat-card-icon completed">
//               ✓
//             </div>
//             <div className="stat-card-content">
//               <h3 className="stat-card-value">{completedReports}</h3>
//               <p className="stat-card-label">Completed</p>
//             </div>
//           </div>
          
//           <div className="user-stat-card">
//             <div className="stat-card-icon waiting">
//               ⏰
//             </div>
//             <div className="stat-card-content">
//               <h3 className="stat-card-value">{submittedReports}</h3>
//               <p className="stat-card-label">Submitted</p>
//             </div>
//           </div>
//         </div>

//         {/* Reports Section */}
//         <div className="reports-section">
//           <div className="reports-header">
//             <h3 className="reports-title">Your Reports ({totalReports})</h3>
//             {myReports.length > 0 && (
//               <Link to="/my-reports" className="view-all-link">
//                 View All →
//               </Link>
//             )}
//           </div>
          
//           <div className="reports-container">
//             {reportsLoading ? (
//               <LoadingSpinner />
//             ) : myReports.length > 0 ? (
//               <div className="reports-list">
//                 {myReports.slice(0, 6).map(report => {
//                   const statusText = getStatusText(report.status_name);
//                   const statusClass = getStatusClass(report.status_name);
                  
//                   return (
//                     <div key={report.report_id} className="report-card">
//                       <div className="report-card-header">
//                         <div className="report-card-left">
//                           <div className="animal-emoji-title">
//                             <span className="animal-emoji">{getAnimalEmoji(report.animal_type)}</span>
//                             <span className="animal-type-text">{report.animal_type || 'Unknown Animal'}</span>
//                           </div>
//                           <span className="condition-badge condition-info">
//                             {report.animal_condition || 'Unknown'}
//                           </span>
//                         </div>
//                         <span className={`status-badge status-${statusClass}`}>
//                           {statusText}
//                         </span>
//                       </div>
                      
//                       <div className="report-card-body">
//                         <p className="report-description">
//                           {report.description}
//                         </p>
                        
//                         <div className="report-info">
//                           <div className="report-location">
//                             <span className="location-icon">📍</span>
//                             <span className="location-text">{report.location_address}</span>
//                           </div>
                          
//                           <div className="report-date">
//                             <span className="date-icon">📅</span>
//                             <span className="date-text">
//                               {formatDate(report.submitted_at)}
//                             </span>
//                           </div>
//                         </div>
                        
//                         {report.user_note && (
//                           <div className="user-note">
//                             <strong>Your Note:</strong> {report.user_note}
//                           </div>
//                         )}
//                       </div>
                      
//                       <div className="report-card-footer">
//                         <button 
//                           className="report-details-link"
//                           onClick={() => onViewDetails(report)}
//                         >
//                           View Details →
//                         </button>
//                       </div>
//                     </div>
//                   );
//                 })}
//               </div>
//             ) : (
//               <div className="no-reports-message">
//                 <div className="no-reports-icon">📝</div>
//                 <h4 className="no-reports-title">No Reports Yet</h4>
//                 <p className="no-reports-text">
//                   You haven't filed any animal rescue reports yet.
//                 </p>
//                 <Link to="/create-report" className="no-reports-btn">
//                   File Your First Report
//                 </Link>
//               </div>
//             )}
            
//             {myReports.length > 6 && (
//               <div className="view-all-container">
//                 <Link to="/my-reports" className="view-all-btn">
//                   View All Reports ({myReports.length})
//                 </Link>
//               </div>
//             )}
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Dashboard;

import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  Tooltip, 
  ResponsiveContainer, 
  Cell 
} from 'recharts';
import { useAuth } from '../../context/AuthContext'; 
import './Dashboard.css';

// Define Report interface with status_name from database JOIN
interface Report {
  report_id: number;
  user_id: number;
  description: string;
  location_address: string;
  user_note: string;
  submitted_at: string;
  animal_type: string;
  animal_condition: string;
  status_id: number;
  status_name: string;
  is_deleted?: number;
  reporter_name?: string;
  reporter_phone?: string;
  volunteer_name?: string;
  volunteer_id?: number;
}

// Define User Profile interface
interface UserProfile {
  user_id: number;
  username: string;
  email: string;
  phone: string;
  bio: string;
  profile_image_url: string;
  role_id: number;
  created_at: string;
}

// Helper functions for status - USING DATABASE STATUS NAMES
const getStatusText = (statusName: string): string => {
  if (!statusName) return 'Unknown';
  
  const formattedName = statusName
    .replace(/_/g, ' ')
    .split(' ')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
  
  return formattedName;
};

const getStatusClass = (statusName: string): string => {
  if (!statusName) return 'unknown';
  
  const statusLower = statusName.toLowerCase();
  
  if (statusLower.includes('submitted')) return 'submitted';
  if (statusLower.includes('assigned')) return 'assigned';
  if (statusLower.includes('in_progress')) return 'progress';
  if (statusLower.includes('completed')) return 'completed';
  if (statusLower.includes('declined')) return 'declined';
  
  return 'unknown';
};

// Get animal emoji based on animal type
const getAnimalEmoji = (animalType: string): string => {
  const type = animalType?.toLowerCase() || '';
  if (type.includes('dog')) return '🐶';
  if (type.includes('cat')) return '🐱';
  if (type.includes('bird')) return '🐦';
  if (type.includes('rabbit') || type.includes('bunny')) return '🐰';
  if (type.includes('hamster')) return '🐹';
  if (type.includes('turtle') || type.includes('tortoise')) return '🐢';
  if (type.includes('horse')) return '🐴';
  if (type.includes('cow')) return '🐮';
  if (type.includes('goat')) return '🐐';
  if (type.includes('sheep')) return '🐑';
  if (type.includes('fish')) return '🐠';
  if (type.includes('snake')) return '🐍';
  if (type.includes('mouse') || type.includes('rat')) return '🐭';
  if (type.includes('monkey')) return '🐒';
  if (type.includes('pig')) return '🐷';
  if (type.includes('chicken')) return '🐔';
  if (type.includes('duck')) return '🦆';
  return '🐾';
};

// Format date for display
const formatDate = (dateString: string): string => {
  const date = new Date(dateString);
  return date.toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  });
};

// Report Detail Modal Component
const ReportDetailModal: React.FC<{
  report: Report | null;
  isOpen: boolean;
  onClose: () => void;
  userPhone?: string;
  userName?: string;
}> = ({ report, isOpen, onClose, userPhone, userName }) => {
  if (!isOpen || !report) return null;

  const reporterName = report.reporter_name || userName;
  const phoneNumber = report.reporter_phone || userPhone;
  const isEditable = report.status_name?.toLowerCase() === 'submitted';

  const hasPhone = (phone?: string | null): boolean => {
    if (phone === null || phone === undefined) return false;
    if (typeof phone !== 'string') return false;
    return phone.trim().length > 0;
  };

  const formatPhoneNumber = (phone?: string | null): string => {
    if (!hasPhone(phone)) {
      return 'Not provided';
    }
    
    const phoneStr = String(phone).trim();
    const cleaned = phoneStr.replace(/\D/g, '');
    
    if (cleaned.length === 10) {
      return `+977 ${cleaned}`;
    }
    
    return phoneStr;
  };

  const getConditionIcon = (condition: string): string => {
    const cond = condition?.toLowerCase() || '';
    if (cond.includes('critical') || cond.includes('emergency')) return '🆘';
    if (cond.includes('severe') || cond.includes('serious')) return '⚠️';
    if (cond.includes('moderate') || cond.includes('injured')) return '🩹';
    if (cond.includes('mild') || cond.includes('sick')) return '🤒';
    if (cond.includes('abandoned') || cond.includes('lost')) return '💔';
    if (cond.includes('healthy') || cond.includes('safe')) return '✅';
    return 'ℹ️';
  };

  const statusText = getStatusText(report.status_name);
  const statusClass = getStatusClass(report.status_name);

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={e => e.stopPropagation()}>
        <div className="modal-header">
          <div className="modal-header-left">
            <span className="modal-animal-emoji">{getAnimalEmoji(report.animal_type)}</span>
            <div>
              <h3 className="modal-title">Report #{report.report_id}</h3>
              <p className="modal-subtitle">{report.animal_type} • {report.animal_condition}</p>
            </div>
          </div>
          <button className="modal-close" onClick={onClose}>×</button>
        </div>
        
        <div className="modal-body">
          <div className="modal-top-row">
            <div className="modal-status">
              <span className={`status-badge-large status-${statusClass}`}>
                {statusText}
              </span>
              {!isEditable && (
                <span className="non-editable-badge">Non-editable</span>
              )}
            </div>
          </div>

          <div className="modal-section">
            <h4 className="modal-section-title">
              <span className="section-icon">👤</span>
              Your Information
            </h4>
            <div className="modal-detail-grid">
              <div className="detail-item">
                <span className="detail-label">Name</span>
                <span className="detail-value">{reporterName || 'Anonymous'}</span>
              </div>
              <div className="detail-item">
                <span className="detail-label">User ID</span>
                <span className="detail-value">#{report.user_id}</span>
              </div>
              {hasPhone(phoneNumber) && (
                <div className="detail-item">
                  <span className="detail-label">Phone</span>
                  <span className="detail-value phone-emphasis">
                    {formatPhoneNumber(phoneNumber)}
                  </span>
                </div>
              )}
            </div>
          </div>

          <div className="modal-section">
            <h4 className="modal-section-title">
              <span className="section-icon">🐾</span>
              Animal Information
            </h4>
            <div className="modal-detail-grid">
              <div className="detail-item">
                <span className="detail-label">Animal Type</span>
                <div className="detail-value-with-emoji">
                  <span className="detail-emoji">{getAnimalEmoji(report.animal_type)}</span>
                  <span>{report.animal_type || 'Unknown Animal'}</span>
                </div>
              </div>
              <div className="detail-item">
                <span className="detail-label">Condition</span>
                <div className="detail-value-with-emoji">
                  <span className="detail-emoji">{getConditionIcon(report.animal_condition)}</span>
                  <span>{report.animal_condition || 'Not specified'}</span>
                </div>
              </div>
            </div>
          </div>

          <div className="modal-section">
            <h4 className="modal-section-title">
              <span className="section-icon">📍</span>
              Location Details
            </h4>
            <div className="location-card">
              <div className="location-content">
                <span className="location-icon-large">📍</span>
                <span className="location-text">{report.location_address}</span>
              </div>
            </div>
          </div>

          <div className="modal-section">
            <h4 className="modal-section-title">
              <span className="section-icon">📝</span>
              Description
            </h4>
            <div className="description-card">
              <p className="description-text">{report.description}</p>
            </div>
          </div>

          {report.volunteer_name && (
            <div className="modal-section">
              <h4 className="modal-section-title">
                <span className="section-icon">🦸</span>
                Assigned Volunteer
              </h4>
              <div className="detail-item">
                <div className="detail-value-with-emoji">
                  <span className="detail-emoji">🦸</span>
                  <span>{report.volunteer_name}</span>
                </div>
              </div>
            </div>
          )}

          <div className="modal-section">
            <h4 className="modal-section-title">
              <span className="section-icon">📅</span>
              Timeline
            </h4>
            <div className="timeline-card">
              <div className="timeline-item">
                <div className="timeline-icon">📅</div>
                <div className="timeline-content">
                  <div className="timeline-label">Report Submitted</div>
                  <div className="timeline-value">{formatDate(report.submitted_at)}</div>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        <div className="modal-footer">
          <button className="modal-btn secondary" onClick={onClose}>
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export const Dashboard: React.FC = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [userReports, setUserReports] = useState<Report[]>([]);
  const [reportsLoading, setReportsLoading] = useState(true);
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null);
  const [selectedReport, setSelectedReport] = useState<Report | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const navigate = useNavigate();
  
  const { user: currentUser } = useAuth();
  
  useEffect(() => {
    const fetchUserProfile = async () => {
      if (!currentUser) return;
      
      try {
        const token = localStorage.getItem('token');
        const response = await fetch('http://localhost:5000/api/users/profile', {
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
          }
        });

        if (response.ok) {
          const data = await response.json();
          if (data.success) {
            setUserProfile(data.data);
          }
        }
      } catch (err) {
        console.error('Error fetching user profile:', err);
      }
    };

    fetchUserProfile();
  }, [currentUser]);

  useEffect(() => {
    const fetchUserReports = async () => {
      if (!currentUser) return;
      
      try {
        setReportsLoading(true);
        const token = localStorage.getItem('token');
        
        const response = await fetch('http://localhost:5000/api/reports/my-reports', {
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
          }
        });
        
        if (response.ok) {
          const data = await response.json();
          if (data.success) {
            const reportsData = data.data || [];
            const reportsWithUserInfo = reportsData.map((report: Report) => ({
              ...report,
              reporter_name: userProfile?.username || currentUser.username,
              reporter_phone: userProfile?.phone || ''
            }));
            setUserReports(reportsWithUserInfo);
          }
        }
      } catch (error) {
        console.error('Error fetching reports:', error);
      } finally {
        setReportsLoading(false);
      }
    };
    
    if (currentUser) {
      fetchUserReports();
    }
  }, [currentUser, userProfile]);
  
  useEffect(() => {
    if (currentUser) {
      setIsLoading(false);
    } else {
      const timer = setTimeout(() => {
        setIsLoading(false);
      }, 1000);
      return () => clearTimeout(timer);
    }
  }, [currentUser]);
  
  const getUserRole = (user: any): string => {
    if (!user) return 'user';
    
    if (user.role && typeof user.role === 'object' && user.role.role_name) {
      return user.role.role_name.toLowerCase();
    }
    
    if (user.role_name) {
      return user.role_name.toLowerCase();
    }
    
    if (user.role_id) {
      if (user.role_id === 3) return 'admin';
      if (user.role_id === 2) return 'volunteer';
      if (user.role_id === 1) return 'user';
    }
    
    return 'user';
  };
  
  const getVolunteerStatus = (user: any): string | null => {
    if (!user) return null;

    if (user.approval_status_id) {
      if (user.approval_status_id === 1) return 'pending';
      if (user.approval_status_id === 2) return 'approved';
      if (user.approval_status_id === 3) return 'rejected';
    }

    if (user.volunteer) {
      if (user.volunteer.approval_status_id) {
        if (user.volunteer.approval_status_id === 1) return 'pending';
        if (user.volunteer.approval_status_id === 2) return 'approved';
        if (user.volunteer.approval_status_id === 3) return 'rejected';
      }
      
      if (user.volunteer.status) {
        return user.volunteer.status.toLowerCase();
      }
    }

    if (user.volunteer_status) {
      return user.volunteer_status.toLowerCase();
    }

    return null;
  };

  const handleViewDetails = (report: Report) => {
    setSelectedReport(report);
    setIsModalOpen(true);
  };

  useEffect(() => {
    if (!isLoading && !currentUser) {
      navigate('/login');
    }
  }, [currentUser, navigate, isLoading]);

  if (isLoading) {
    return (
      <div className="dashboard-wrapper">
        <div className="no-access">
          <div className="loading-spinner-large"></div>
          <h2>Loading...</h2>
          <p>Please wait while we load your dashboard...</p>
        </div>
      </div>
    );
  }

  if (!currentUser) {
    return (
      <div className="dashboard-wrapper">
        <div className="no-access">
          <h2>Access Denied</h2>
          <p>Please log in to view the dashboard.</p>
          <Link to="/login" className="login-link">
            Go to Login
          </Link>
        </div>
      </div>
    );
  }

  const userRole = getUserRole(currentUser);
  const volunteerStatus = getVolunteerStatus(currentUser);

  const getStats = () => {
    const totalReports = userReports.length;
    const completedRescues = userReports.filter(r => 
      r.status_name?.toLowerCase() === 'completed'
    ).length;
    const activeVolunteers = 1;
    const pendingApprovals = 0;
    
    const userId = currentUser.user_id?.toString() || '';
    
    const myReports = userReports.filter(r => {
      const reportUserId = Number(r.user_id);
      const currentUserId = Number(userId);
      return reportUserId === currentUserId;
    });
    
    const myCompletedTasks = userReports.filter(r => 
      r.status_name?.toLowerCase() === 'completed'
    ).length;

    return {
      totalReports,
      completedRescues,
      activeVolunteers,
      pendingApprovals,
      myReports: myReports.length,
      myCompletedTasks,
    };
  };

  const stats = getStats();

  const renderDashboard = () => {
    if (userRole === 'admin') {
      return <AdminDashboard 
        stats={stats} 
        reports={userReports} 
        reportsLoading={reportsLoading} 
      />;
    }
    
    if (userRole === 'volunteer') {
      return <VolunteerDashboard 
        user={{...currentUser, role: userRole}} 
        stats={stats} 
        reports={userReports}
        reportsLoading={reportsLoading}
        userProfile={userProfile}
      />;
    }
    
    if (volunteerStatus === 'pending') {
      return <PendingVolunteerDashboard user={currentUser} />;
    }
    
    if (volunteerStatus === 'rejected') {
      return <RejectedVolunteerDashboard />;
    }
    
    return <UserDashboard 
      user={{...currentUser, role: userRole}} 
      userReports={userReports}
      reportsLoading={reportsLoading}
      onViewDetails={handleViewDetails}
      userProfile={userProfile}
    />;
  };

  return (
    <div className="dashboard-content">
      {renderDashboard()}
      
      <ReportDetailModal 
        report={selectedReport} 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)}
        userPhone={userProfile?.phone}
        userName={userProfile?.username}
      />
    </div>
  );
};

const LoadingSpinner: React.FC = () => (
  <div className="loading-spinner">
    <div className="spinner"></div>
    <p>Loading reports...</p>
  </div>
);

const AdminDashboard: React.FC<{ 
  stats: any, 
  reports: Report[], 
  reportsLoading: boolean
}> = ({ stats, reports, reportsLoading }) => {
  const chartData = [
    { name: 'Reports', value: stats.totalReports },
    { name: 'Rescued', value: stats.completedRescues },
    { name: 'Volunteers', value: stats.activeVolunteers },
  ];
  const COLORS = ['#A67C52', '#2D5A27', '#7D8C5A'];

  return (
    <div className="dashboard-wrapper animate-fade-in">
      <div className="admin-dashboard">
        <h2 className="admin-header">ResQAll Global Overview</h2>
        
        <div className="admin-stats-grid">
          <div className="stat-card">
            <p className="stat-label">Pending Operatives</p>
            <div className="stat-content">
              <div className="stat-value stat-value-earth">{stats.pendingApprovals}</div>
              {stats.pendingApprovals > 0 && (
                <Link to="/admin/volunteers" className="stat-alert animate-pulse">
                  Review Now
                </Link>
              )}
            </div>
          </div>
          
          <div className="stat-card">
            <p className="stat-label">Field Rangers</p>
            <div className="stat-value stat-value-emerald">{stats.activeVolunteers}</div>
          </div>
          
          <div className="stat-card">
            <p className="stat-label">Mission Reports</p>
            <div className="stat-value stat-value-emerald">
              {reportsLoading ? '...' : stats.totalReports}
            </div>
          </div>
          
          <div className="stat-card">
            <p className="stat-label">Saved Lives</p>
            <div className="stat-value stat-value-moss">
              {reportsLoading ? '...' : stats.completedRescues}
            </div>
          </div>
        </div>

        <div className="admin-charts-grid">
          <div className="chart-container">
            <h3 className="chart-title">Operational Metrics</h3>
            
            <div className="recharts-wrapper">
              {reportsLoading ? (
                <div className="chart-loading">
                  <p>Loading chart data...</p>
                </div>
              ) : (
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={chartData}>
                    <XAxis dataKey="name" axisLine={false} tickLine={false} />
                    <YAxis axisLine={false} tickLine={false} />
                    <Tooltip 
                      cursor={{fill: '#F5F1E8'}} 
                      formatter={(value) => [value, 'Count']}
                      labelFormatter={(label) => `${label}`}
                    />
                    <Bar 
                      dataKey="value" 
                      radius={[10, 10, 0, 0]}
                      barSize={60}
                    >
                      {chartData.map((entry, index) => (
                        <Cell 
                          key={`cell-${index}`} 
                          fill={COLORS[index % COLORS.length]} 
                        />
                      ))}
                    </Bar>
                  </BarChart>
                </ResponsiveContainer>
              )}
            </div>
          </div>
          
          <div className="volunteer-alert-box">
            <div className="volunteer-alert-icon">
              ⚠️
            </div>
            <h3 className="volunteer-alert-title">Volunteer Queue</h3>
            <p className="volunteer-alert-text">
              There are {stats.pendingApprovals} rangers waiting for activation to join the ResQAll squad.
            </p>
            <Link to="/admin/volunteers" className="volunteer-alert-btn">
              Manage Operatives
            </Link>
          </div>
        </div>

        <div className="recent-reports-section">
          <h3 className="section-header">Recent Reports ({reports.length})</h3>
          <div className="reports-table-container">
            {reportsLoading ? (
              <div className="loading-message">
                <div className="loading-spinner-small"></div>
                <p>Loading reports...</p>
              </div>
            ) : reports.length > 0 ? (
              <>
                <table className="reports-table">
                  <thead>
                    <tr>
                      <th>ID</th>
                      <th>Animal</th>
                      <th>Condition</th>
                      <th>Location</th>
                      <th>Reporter</th>
                      <th>Phone</th>
                      <th>Date</th>
                      <th>Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {reports.slice(0, 10).map((report) => (
                      <tr key={report.report_id}>
                        <td>#{report.report_id}</td>
                        <td className="animal-type">{report.animal_type || 'Unknown'}</td>
                        <td>{report.animal_condition || 'Unknown'}</td>
                        <td className="location-cell">{report.location_address || 'No location'}</td>
                        <td>{report.reporter_name || 'Anonymous'}</td>
                        <td>{report.reporter_phone || 'N/A'}</td>
                        <td className="report-date">
                          {report.submitted_at ? 
                            new Date(report.submitted_at).toLocaleDateString() : 
                            'Unknown date'}
                        </td>
                        <td>
                          <span className={`status-badge status-${getStatusClass(report.status_name)}`}>
                            {getStatusText(report.status_name)}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
                {reports.length > 10 && (
                  <div className="view-all-container">
                    <Link to="/admin/reports" className="view-all-link">
                      View All Reports ({reports.length})
                    </Link>
                  </div>
                )}
              </>
            ) : (
              <div className="no-reports">
                <p>No reports found in the system.</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

const VolunteerDashboard: React.FC<{ 
  user: any, 
  stats: any, 
  reports: Report[],
  reportsLoading: boolean,
  userProfile: UserProfile | null
}> = ({ user, stats, reports, reportsLoading, userProfile }) => {
  const userId = user.user_id?.toString() || '';
  
  const myTasks = reports.filter(r => {
    return r.status_name?.toLowerCase() === 'in_progress';
  });
  
  const inProgressTask = reports.find(r => {
    return r.status_name?.toLowerCase() === 'in_progress';
  });
  
  const pendingTasks = reports.filter(r => r.status_name?.toLowerCase() === 'submitted');

  return (
    <div className="dashboard-wrapper animate-fade-in">
      <div className="volunteer-dashboard">
        <div className="volunteer-header-grid">
          <div className="volunteer-welcome-card">
            <div className="volunteer-welcome-paw">
              🐾
            </div>
            <h2 className="volunteer-welcome-title">Welcome back, Operative {user.username}</h2>
            {userProfile?.phone && (
              <p className="volunteer-contact-info">
                📱 Contact: {userProfile.phone}
              </p>
            )}
            <p className="volunteer-welcome-text">
              Scanning sectors for animals in need. Ready for your next mission?
            </p>
            <div className="volunteer-welcome-btns">
              <Link to="/tasks" className="welcome-btn welcome-btn-primary">
                Open Mission Board
              </Link>
              <Link to="/profile" className="welcome-btn welcome-btn-secondary">
                My Service Medals
              </Link>
            </div>
          </div>

          <div className="volunteer-stats-column">
            <div className="volunteer-stat-card">
              <div className="stat-info">
                <p className="stat-label-small">Successful Rescues</p>
                <p className="stat-value-large">
                  {reportsLoading ? '...' : stats.myCompletedTasks}
                </p>
              </div>
              <div className="stat-icon stat-icon-success">
                ✓
              </div>
            </div>
            
            <div className="volunteer-stat-card">
              <div className="stat-info">
                <p className="stat-label-small">Ranger Rank</p>
                <p className="stat-value-medium">
                  Volunteer
                </p>
              </div>
              <div className="stat-icon stat-icon-rank">
                🏆
              </div>
            </div>
          </div>
        </div>

        <div className="mission-section">
          <h3 className="section-header">
            📻 Active Assignment
          </h3>
          
          {reportsLoading ? (
            <div className="square-assignment-grid">
              <div className="square-mission-card empty">
                <div className="square-card-content centered">
                  <div className="no-mission-icon">
                    ⏰
                  </div>
                  <h4 className="no-mission-title">Loading Missions...</h4>
                  <p className="no-mission-text">
                    Fetching your assignments from the database...
                  </p>
                </div>
              </div>
            </div>
          ) : inProgressTask ? (
            <div className="square-assignment-grid">
              <div className="square-mission-card active">
                <div className="square-card-header">
                  <div className="square-status-badge in-field">IN FIELD</div>
                  <div className="square-volunteer-tag">{user.username?.toUpperCase()}</div>
                </div>
                
                <div className="square-card-content">
                  <div className="square-mission-title">
                    <h4 className="square-title">{inProgressTask.animal_type} Mission</h4>
                    <span className="square-condition critical">
                      {inProgressTask.animal_condition || 'CRITICAL'}
                    </span>
                  </div>
                  
                  <div className="square-location">
                    📍
                    <span className="location-text">{inProgressTask.location_address || 'Location not specified'}</span>
                  </div>
                  
                  <div className="square-reporter-info">
                    <div className="reporter-name">
                      <span className="reporter-icon-small">👤</span>
                      {inProgressTask.reporter_name || 'Anonymous'}
                    </div>
                    {inProgressTask.reporter_phone && (
                      <div className="reporter-phone">
                        <span className="phone-icon-small">📱</span>
                        {inProgressTask.reporter_phone}
                      </div>
                    )}
                  </div>
                  
                  <p className="square-description">
                    {inProgressTask.description?.length > 80 
                      ? `${inProgressTask.description.substring(0, 80)}...` 
                      : inProgressTask.description || 'No description provided'}
                  </p>
                  
                  <div className="square-actions">
                    <Link 
                      to={`/tasks/${inProgressTask.report_id}`}
                      className="square-action-btn"
                    >
                      Update Report →
                    </Link>
                  </div>
                </div>
              </div>

              {pendingTasks.length > 0 && (
                <div className="square-mission-card pending">
                  <div className="square-card-header">
                    <div className="square-status-badge pending-badge">AVAILABLE</div>
                    <div className="square-count">{pendingTasks.length} waiting</div>
                  </div>
                  
                  <div className="square-card-content">
                    <div className="square-mission-title">
                      <h4 className="square-title">Available Missions</h4>
                      <span className="square-condition moderate">NEEDS VOLUNTEER</span>
                    </div>
                    
                    <div className="square-pending-list">
                      {pendingTasks.slice(0, 2).map((task) => (
                        <div key={task.report_id} className="pending-item">
                          <span className="pending-animal">{task.animal_type}</span>
                          <span className="pending-location">
                            📍{task.location_address?.split(',')[0] || 'Unknown'}
                          </span>
                          <div className="pending-reporter">
                            <small>👤 {task.reporter_name || 'Anonymous'}</small>
                          </div>
                          <div className="pending-status">
                            <small>
                              Status: {getStatusText(task.status_name)}
                            </small>
                          </div>
                        </div>
                      ))}
                      {pendingTasks.length > 2 && (
                        <div className="pending-more">
                          +{pendingTasks.length - 2} more missions
                        </div>
                      )}
                    </div>
                    
                    <div className="square-actions">
                      <Link to="/tasks" className="square-action-btn view-all">
                        View All →
                      </Link>
                    </div>
                  </div>
                </div>
              )}
            </div>
          ) : (
            <div className="square-assignment-grid">
              <div className="square-mission-card empty">
                <div className="square-card-content centered">
                  <div className="no-mission-icon">
                    ⏰
                  </div>
                  <h4 className="no-mission-title">No Active Missions</h4>
                  <p className="no-mission-text">
                    The sector is quiet. Head to the mission board to see new reports.
                  </p>
                  <Link to="/tasks" className="square-action-btn primary">
                    Go to Mission Board
                  </Link>
                </div>
              </div>

              <div className="square-mission-card stats">
                <div className="square-card-content">
                  <div className="quick-stats">
                    <div className="quick-stat-item">
                      <div className="quick-stat-icon">
                        ✓
                      </div>
                      <div className="quick-stat-info">
                        <div className="quick-stat-value">
                          {reportsLoading ? '...' : stats.myCompletedTasks}
                        </div>
                        <div className="quick-stat-label">Rescues</div>
                      </div>
                    </div>
                    <div className="quick-stat-item">
                      <div className="quick-stat-icon">
                        ⏰
                      </div>
                      <div className="quick-stat-info">
                        <div className="quick-stat-value">
                          {reportsLoading ? '...' : pendingTasks.length}
                        </div>
                        <div className="quick-stat-label">Available</div>
                      </div>
                    </div>
                    <div className="quick-stat-item">
                      <div className="quick-stat-icon">
                        🏆
                      </div>
                      <div className="quick-stat-info">
                        <div className="quick-stat-value">0</div>
                        <div className="quick-stat-label">Badges</div>
                      </div>
                    </div>
                  </div>
                  <Link to="/profile" className="square-action-btn secondary">
                    View Profile
                  </Link>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

const PendingVolunteerDashboard: React.FC<{ user: any }> = ({ user }) => {
  return (
    <div className="dashboard-wrapper animate-fade-in">
      <div className="pending-volunteer">
        <div className="pending-icon">
          ⏰
        </div>
        <h2 className="pending-title">Activation Pending</h2>
        <p className="pending-text">
          Thank you for joining ResQAll. Our HQ is currently reviewing your ranger profile. 
          You will be notified via field log once approved.
        </p>
      </div>
    </div>
  );
};

const RejectedVolunteerDashboard: React.FC = () => {
  return (
    <div className="dashboard-wrapper animate-fade-in">
      <div className="rejected-volunteer">
        <h2 className="rejected-title">Application Status</h2>
        <p className="rejected-text">Unfortunately, your ResQAll operative status was not approved.</p>
      </div>
    </div>
  );
};

const UserDashboard: React.FC<{ 
  user: any; 
  userReports: Report[]; 
  reportsLoading: boolean;
  onViewDetails: (report: Report) => void;
  userProfile: UserProfile | null;
}> = ({ user, userReports, reportsLoading, onViewDetails, userProfile }) => {
  const myReports = userReports.filter(report => {
    const reportUserId = Number(report.user_id);
    const currentUserId = Number(user.user_id);
    return reportUserId === currentUserId;
  });

  const totalReports = myReports.length;
  const submittedReports = myReports.filter(r => r.status_name?.toLowerCase() === 'submitted').length;
  const inProgressReports = myReports.filter(r => r.status_name?.toLowerCase() === 'in_progress').length;
  const completedReports = myReports.filter(r => r.status_name?.toLowerCase() === 'completed').length;
  const userPhone = userProfile?.phone;

  return (
    <div className="dashboard-wrapper animate-fade-in">
      <div className="user-dashboard">
        <div className="user-welcome-section">
          <div className="user-welcome-content">
            <h2 className="user-welcome-title">
              <span className="user-welcome-greeting">Welcome back,</span>
              <span className="user-welcome-name">{user.username || 'Animal Friend'}!</span>
            </h2>
            {userPhone && (
              <p className="user-contact-info">
                <span className="contact-icon">📱</span>
                <span className="contact-text">Your contact: {userPhone}</span>
              </p>
            )}
            <p className="user-welcome-subtitle">
              Your reports help save animals in need.
            </p>
          </div>
          <Link to="/create-report" className="user-primary-btn">
            <span className="btn-icon">⚠️</span>
            File Field Report
          </Link>
        </div>

        <div className="user-stats-grid">
          <div className="user-stat-card">
            <div className="stat-card-icon total-reports">
              📄
            </div>
            <div className="stat-card-content">
              <h3 className="stat-card-value">{totalReports}</h3>
              <p className="stat-card-label">Total Reports</p>
            </div>
          </div>
          
          <div className="user-stat-card">
            <div className="stat-card-icon in-progress">
              ⏳
            </div>
            <div className="stat-card-content">
              <h3 className="stat-card-value">{inProgressReports}</h3>
              <p className="stat-card-label">In Progress</p>
            </div>
          </div>
          
          <div className="user-stat-card">
            <div className="stat-card-icon completed">
              ✓
            </div>
            <div className="stat-card-content">
              <h3 className="stat-card-value">{completedReports}</h3>
              <p className="stat-card-label">Completed</p>
            </div>
          </div>
          
          <div className="user-stat-card">
            <div className="stat-card-icon waiting">
              ⏰
            </div>
            <div className="stat-card-content">
              <h3 className="stat-card-value">{submittedReports}</h3>
              <p className="stat-card-label">Submitted</p>
            </div>
          </div>
        </div>

        <div className="reports-section">
          <div className="reports-header">
            <h3 className="reports-title">Your Reports ({totalReports})</h3>
            {myReports.length > 0 && (
              <Link to="/my-reports" className="view-all-link">
                View All →
              </Link>
            )}
          </div>
          
          <div className="reports-container">
            {reportsLoading ? (
              <LoadingSpinner />
            ) : myReports.length > 0 ? (
              <>
                <div className="reports-grid">
                  {myReports.slice(0, 3).map(report => {
                    const statusText = getStatusText(report.status_name);
                    const statusClass = getStatusClass(report.status_name);
                    
                    return (
                      <div key={report.report_id} className="report-grid-card">
                        <div className="report-grid-header">
                          <div className="report-grid-animal">
                            <span className="animal-grid-emoji">{getAnimalEmoji(report.animal_type)}</span>
                            <div>
                              <h4 className="animal-grid-type">{report.animal_type || 'Unknown Animal'}</h4>
                              <span className="condition-grid-badge">{report.animal_condition || 'Unknown'}</span>
                            </div>
                          </div>
                          <span className={`status-grid-badge status-${statusClass}`}>
                            {statusText}
                          </span>
                        </div>
                        
                        <div className="report-grid-body">
                          <p className="report-grid-description">
                            {report.description?.length > 100 
                              ? `${report.description.substring(0, 100)}...` 
                              : report.description}
                          </p>
                          
                          <div className="report-grid-info">
                            <div className="report-grid-location">
                              <span className="grid-location-icon">📍</span>
                              <span className="grid-location-text">
                                {report.location_address?.length > 30 
                                  ? `${report.location_address.substring(0, 30)}...` 
                                  : report.location_address}
                              </span>
                            </div>
                            
                            <div className="report-grid-date">
                              <span className="grid-date-icon">📅</span>
                              <span className="grid-date-text">
                                {new Date(report.submitted_at).toLocaleDateString('en-US', {
                                  month: 'short',
                                  day: 'numeric'
                                })}
                              </span>
                            </div>
                          </div>
                        </div>
                        
                        <div className="report-grid-footer">
                          <button 
                            className="report-grid-details-link"
                            onClick={() => onViewDetails(report)}
                          >
                            View Details →
                          </button>
                        </div>
                      </div>
                    );
                  })}
                </div>
                
                {myReports.length === 0 && (
                  <div className="no-reports-grid-message">
                    <div className="no-reports-grid-icon">📝</div>
                    <h4 className="no-reports-grid-title">No Reports Yet</h4>
                    <p className="no-reports-grid-text">
                      You haven't filed any animal rescue reports yet.
                    </p>
                    <Link to="/create-report" className="no-reports-grid-btn">
                      File Your First Report
                    </Link>
                  </div>
                )}
              </>
            ) : (
              <div className="no-reports-message">
                <div className="no-reports-icon">📝</div>
                <h4 className="no-reports-title">No Reports Yet</h4>
                <p className="no-reports-text">
                  You haven't filed any animal rescue reports yet.
                </p>
                <Link to="/create-report" className="no-reports-btn">
                  File Your First Report
                </Link>
              </div>
            )}
            
            {myReports.length > 3 && (
              <div className="view-all-container">
                <Link to="/my-reports" className="view-all-btn">
                  View All Reports ({myReports.length})
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;