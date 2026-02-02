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

// interface Report {
//   id: string;
//   userId: string;
//   animalType: string;
//   description: string;
//   location: string;
//   photoUrl: string;
//   condition: 'critical' | 'moderate' | 'mild';
//   status: 'submitted' | 'in-progress' | 'completed';
//   assignedTo: string | null;
//   createdAt: string;
// }

// const MOCK_REPORTS: Report[] = [
//   {
//     id: '1',
//     userId: '3',
//     animalType: 'Dog',
//     description: 'Injured stray dog found near Central Park',
//     location: 'Central Park, NYC',
//     photoUrl: 'https://images.unsplash.com/photo-1552053831-71594a27632d',
//     condition: 'critical',
//     status: 'in-progress',
//     assignedTo: '2',
//     createdAt: new Date('2024-03-10').toISOString(),
//   },
//   {
//     id: '2',
//     userId: '3',
//     animalType: 'Cat',
//     description: 'Kitten stuck in tree for 2 days',
//     location: 'Brooklyn Heights',
//     photoUrl: 'https://images.unsplash.com/photo-1514888286974-6d03bde4ba14',
//     condition: 'moderate',
//     status: 'submitted',
//     assignedTo: null,
//     createdAt: new Date('2024-03-11').toISOString(),
//   },
//   {
//     id: '3',
//     userId: '3',
//     animalType: 'Bird',
//     description: 'Bird with broken wing in backyard',
//     location: 'Queens Botanical Garden',
//     photoUrl: 'https://images.unsplash.com/photo-1522926193341-e9ffd686c60f',
//     condition: 'mild',
//     status: 'completed',
//     assignedTo: '2',
//     createdAt: new Date('2024-03-05').toISOString(),
//   },
// ];

// export const Dashboard: React.FC = () => {
//   const [isLoading, setIsLoading] = useState(true);
//   const navigate = useNavigate();
  
//   const { user: currentUser } = useAuth();
  
//   useEffect(() => {
//     console.log('Current User from API:', currentUser);
    
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
    
//     if (user.email === 'admin@example.com') return 'admin';
//     if (user.email === 'volunteer@example.com') return 'volunteer';
    
//     return 'user';
//   };
  
//   const getVolunteerStatus = (user: any) => {
//     if (user.volunteerStatus) {
//       return user.volunteerStatus;
//     }
    
//     if (user.role_id === 2) {
//       return 'approved';
//     }
    
//     return null;
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
  
//   console.log('Final User Role:', userRole);
//   console.log('Final Volunteer Status:', volunteerStatus);

//   const getStats = () => {
//     const totalReports = MOCK_REPORTS.length;
//     const completedRescues = MOCK_REPORTS.filter(r => r.status === 'completed').length;
//     const activeVolunteers = 1;
//     const pendingApprovals = 0;
    
//     const userId = (currentUser as any).user_id?.toString() || '';
//     console.log('Current user ID:', userId);
    
//     const myReports = MOCK_REPORTS.filter(r => r.userId === userId);
//     const myCompletedTasks = MOCK_REPORTS.filter(r => r.assignedTo === userId && r.status === 'completed').length;

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

//   return (
//     <div className="dashboard-content">
//       {userRole === 'admin' ? (
//         <AdminDashboard stats={stats} />
//       ) : userRole === 'volunteer' ? (
//         volunteerStatus === 'pending' ? (
//           <PendingVolunteerDashboard user={currentUser} />
//         ) : volunteerStatus === 'rejected' ? (
//           <RejectedVolunteerDashboard />
//         ) : (
//           <VolunteerDashboard 
//             user={{...currentUser, role: userRole}} 
//             stats={stats} 
//             reports={MOCK_REPORTS} 
//           />
//         )
//       ) : (
//         <UserDashboard 
//           user={{...currentUser, role: userRole}} 
//           stats={stats} 
//           reports={MOCK_REPORTS} 
//         />
//       )}
//     </div>
//   );
// };

// const AdminDashboard: React.FC<{ stats: any }> = ({ stats }) => {
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
//             <div className="stat-value stat-value-emerald">{stats.totalReports}</div>
//           </div>
          
//           <div className="stat-card">
//             <p className="stat-label">Saved Lives</p>
//             <div className="stat-value stat-value-moss">{stats.completedRescues}</div>
//           </div>
//         </div>

//         <div className="admin-charts-grid">
//           <div className="chart-container">
//             <h3 className="chart-title">Operational Metrics</h3>
            
//             <div className="recharts-wrapper">
//               <ResponsiveContainer width="100%" height={300}>
//                 <BarChart data={chartData}>
//                   <XAxis dataKey="name" axisLine={false} tickLine={false} />
//                   <YAxis axisLine={false} tickLine={false} />
//                   <Tooltip 
//                     cursor={{fill: '#F5F1E8'}} 
//                     formatter={(value) => [value, 'Count']}
//                     labelFormatter={(label) => `${label}`}
//                   />
//                   <Bar 
//                     dataKey="value" 
//                     radius={[10, 10, 0, 0]}
//                     barSize={60}
//                   >
//                     {chartData.map((entry, index) => (
//                       <Cell 
//                         key={`cell-${index}`} 
//                         fill={COLORS[index % COLORS.length]} 
//                       />
//                     ))}
//                   </Bar>
//                 </BarChart>
//               </ResponsiveContainer>
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
//       </div>
//     </div>
//   );
// };

// const VolunteerDashboard: React.FC<{ user: any, stats: any, reports: Report[] }> = ({ user, stats, reports }) => {
//   const userId = user.user_id?.toString() || '';
//   const myTasks = reports.filter(r => r.assignedTo === userId);
//   const inProgressTask = myTasks.find(t => t.status === 'in-progress');
//   const pendingTasks = myTasks.filter(t => t.status === 'submitted');

//   return (
//     <div className="dashboard-wrapper animate-fade-in">
//       <div className="volunteer-dashboard">
//         <div className="volunteer-header-grid">
//           <div className="volunteer-welcome-card">
//             <div className="volunteer-welcome-paw">
//               🐾
//             </div>
//             <h2 className="volunteer-welcome-title">Welcome back, Operative {user.username}</h2>
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
//                 <p className="stat-value-large">{stats.myCompletedTasks}</p>
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
          
//           {inProgressTask ? (
//             <div className="square-assignment-grid">
//               <div className="square-mission-card active">
//                 <div className="square-card-header">
//                   <div className="square-status-badge in-field">IN FIELD</div>
//                   <div className="square-volunteer-tag">{user.username?.toUpperCase()}</div>
//                 </div>
                
//                 <div className="square-card-content">
//                   <div className="square-mission-title">
//                     <h4 className="square-title">{inProgressTask.animalType} Mission</h4>
//                     <span className="square-condition critical">{inProgressTask.condition}</span>
//                   </div>
                  
//                   <div className="square-location">
//                     📍
//                     <span className="location-text">{inProgressTask.location}</span>
//                   </div>
                  
//                   <p className="square-description">
//                     {inProgressTask.description.length > 80 
//                       ? `${inProgressTask.description.substring(0, 80)}...` 
//                       : inProgressTask.description}
//                   </p>
                  
//                   <div className="square-actions">
//                     <Link 
//                       to={`/tasks/${inProgressTask.id}`}
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
//                     <div className="square-status-badge pending-badge">PENDING</div>
//                     <div className="square-count">{pendingTasks.length} waiting</div>
//                   </div>
                  
//                   <div className="square-card-content">
//                     <div className="square-mission-title">
//                       <h4 className="square-title">Queued Missions</h4>
//                       <span className="square-condition moderate">MODERATE</span>
//                     </div>
                    
//                     <div className="square-pending-list">
//                       {pendingTasks.slice(0, 2).map((task) => (
//                         <div key={task.id} className="pending-item">
//                           <span className="pending-animal">{task.animalType}</span>
//                           <span className="pending-location">
//                             📍{task.location.split(',')[0]}
//                           </span>
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
//                         <div className="quick-stat-value">{stats.myCompletedTasks}</div>
//                         <div className="quick-stat-label">Rescues</div>
//                       </div>
//                     </div>
//                     <div className="quick-stat-item">
//                       <div className="quick-stat-icon">
//                         ⏰
//                       </div>
//                       <div className="quick-stat-info">
//                         <div className="quick-stat-value">{pendingTasks.length}</div>
//                         <div className="quick-stat-label">Pending</div>
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

// const UserDashboard: React.FC<{ user: any, stats: any, reports: Report[] }> = ({ user, stats, reports }) => {
//   const userId = user.user_id?.toString() || '';
//   const myReports = reports.filter(r => r.userId === userId);

//   return (
//     <div className="dashboard-wrapper animate-fade-in">
//       <div className="user-dashboard">
//         <div className="user-hero-banner">
//           <div className="user-hero-bg mask-image-gradient"></div>
//           <div className="user-hero-content">
//             <h2 className="user-hero-title">Protect the Streets</h2>
//             <p className="user-hero-text">
//               Spot an animal in distress? ResQAll rangers are on standby to respond to your report.
//             </p>
//             <Link to="/submit-report" className="user-hero-btn">
//               ⚠️ File Field Report
//             </Link>
//           </div>
//         </div>

//         <div className="user-reports-section">
//           <h3 className="user-reports-title">My Report History</h3>
          
//           <div className="user-reports-table">
//             {myReports.length > 0 ? (
//               <table className="reports-table">
//                 <thead>
//                   <tr>
//                     <th>Animal</th>
//                     <th>Location</th>
//                     <th>Date</th>
//                     <th>Status</th>
//                   </tr>
//                 </thead>
//                 <tbody>
//                   {myReports.map(report => (
//                     <tr key={report.id}>
//                       <td className="animal-type">{report.animalType}</td>
//                       <td>{report.location}</td>
//                       <td className="report-date">
//                         {new Date(report.createdAt).toLocaleDateString()}
//                       </td>
//                       <td>
//                         <span className={`status-badge status-badge-${report.status}`}>
//                           {report.status}
//                         </span>
//                       </td>
//                     </tr>
//                   ))}
//                 </tbody>
//               </table>
//             ) : (
//               <div className="no-reports">
//                 <p>You haven't filed any rescue reports yet.</p>
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

interface Report {
  id: string;
  userId: string;
  animalType: string;
  description: string;
  location: string;
  photoUrl: string;
  condition: 'critical' | 'moderate' | 'mild';
  status: 'submitted' | 'in-progress' | 'completed';
  assignedTo: string | null;
  createdAt: string;
}

const MOCK_REPORTS: Report[] = [
  {
    id: '1',
    userId: '3',
    animalType: 'Dog',
    description: 'Injured stray dog found near Central Park',
    location: 'Central Park, NYC',
    photoUrl: 'https://images.unsplash.com/photo-1552053831-71594a27632d',
    condition: 'critical',
    status: 'in-progress',
    assignedTo: '2',
    createdAt: new Date('2024-03-10').toISOString(),
  },
  {
    id: '2',
    userId: '3',
    animalType: 'Cat',
    description: 'Kitten stuck in tree for 2 days',
    location: 'Brooklyn Heights',
    photoUrl: 'https://images.unsplash.com/photo-1514888286974-6d03bde4ba14',
    condition: 'moderate',
    status: 'submitted',
    assignedTo: null,
    createdAt: new Date('2024-03-11').toISOString(),
  },
  {
    id: '3',
    userId: '3',
    animalType: 'Bird',
    description: 'Bird with broken wing in backyard',
    location: 'Queens Botanical Garden',
    photoUrl: 'https://images.unsplash.com/photo-1522926193341-e9ffd686c60f',
    condition: 'mild',
    status: 'completed',
    assignedTo: '2',
    createdAt: new Date('2024-03-05').toISOString(),
  },
];

export const Dashboard: React.FC = () => {
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();
  
  const { user: currentUser } = useAuth();
  
  useEffect(() => {
    console.log('=== DASHBOARD LOADING ===');
    console.log('Current User object:', currentUser);
    
    if (currentUser) {
      setIsLoading(false);
    } else {
      const timer = setTimeout(() => {
        setIsLoading(false);
      }, 1000);
      return () => clearTimeout(timer);
    }
  }, [currentUser]);
  
  // Get volunteer status - FIXED VERSION
  const getVolunteerStatus = (user: any): string | null => {
    if (!user) return null;

    console.log('Checking volunteer status for user:', {
      user_id: user.user_id,
      // Check both ways to access role_id
      role_id_from_role: user.role?.role_id,
      role_id_direct: user.role_id,
      approval_status_id: user.approval_status_id,
      volunteer: user.volunteer,
      volunteer_status: user.volunteer_status
    });

    // 1. Check for direct approval_status_id (from AuthContext)
    if (user.approval_status_id) {
      console.log('Found direct approval_status_id:', user.approval_status_id);
      if (user.approval_status_id === 1) return 'pending';
      if (user.approval_status_id === 2) return 'approved';
      if (user.approval_status_id === 3) return 'rejected';
    }

    // 2. Check volunteer object (from AuthContext)
    if (user.volunteer) {
      console.log('Found volunteer object:', user.volunteer);
      
      if (user.volunteer.approval_status_id) {
        if (user.volunteer.approval_status_id === 1) return 'pending';
        if (user.volunteer.approval_status_id === 2) return 'approved';
        if (user.volunteer.approval_status_id === 3) return 'rejected';
      }
      
      if (user.volunteer.status) {
        return user.volunteer.status.toLowerCase();
      }
    }

    // 3. Check volunteer_status direct field
    if (user.volunteer_status) {
      return user.volunteer_status.toLowerCase();
    }

    console.log('No volunteer status found');
    return null;
  };
  
  // Get user role - FIXED VERSION
  const getUserRole = (user: any): string => {
    if (!user) return 'user';

    const volunteerStatus = getVolunteerStatus(user);
    
    // Get role_id from both possible locations
    const roleId = user.role?.role_id || user.role_id;
    
    console.log('Determining role for user:', {
      user_id: user.user_id,
      role_id: roleId,
      volunteerStatus,
      role_name: user.role?.role_name,
      role_object: user.role
    });

    // Admin check
    if (roleId === 3) {
      console.log('User is admin (role_id = 3)');
      return 'admin';
    }

    // Volunteer check - ONLY if approved
    if (roleId === 2) {
      if (volunteerStatus === 'approved') {
        console.log('User is APPROVED volunteer (role_id=2, status=approved)');
        return 'volunteer';
      } else if (volunteerStatus === 'pending' || volunteerStatus === 'rejected') {
        console.log('User has role_id=2 but status is', volunteerStatus, '- showing as regular user');
        return 'user';
      }
    }

    // Check role name from role object
    if (user.role?.role_name) {
      console.log('Using role.role_name:', user.role.role_name);
      return user.role.role_name;
    }

    console.log('Defaulting to user role');
    return 'user';
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
  
  console.log('=== FINAL DASHBOARD DETERMINATION ===');
  console.log('User ID:', currentUser.user_id);
  console.log('Role Object:', currentUser.role);
  console.log('Role ID (from role object):', currentUser.role?.role_id);
  console.log('Role Name:', currentUser.role?.role_name);
  console.log('Approval Status ID:', currentUser.approval_status_id);
  console.log('Volunteer Object:', currentUser.volunteer);
  console.log('Final User Role:', userRole);
  console.log('Final Volunteer Status:', volunteerStatus);
  console.log('=====================================');

  const getStats = () => {
    const totalReports = MOCK_REPORTS.length;
    const completedRescues = MOCK_REPORTS.filter(r => r.status === 'completed').length;
    const activeVolunteers = 1;
    const pendingApprovals = 0;
    
    const userId = currentUser.user_id?.toString() || '';
    
    const myReports = MOCK_REPORTS.filter(r => r.userId === userId);
    const myCompletedTasks = MOCK_REPORTS.filter(r => r.assignedTo === userId && r.status === 'completed').length;

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

  // Clean rendering logic
  const renderDashboard = () => {
    console.log('Rendering dashboard with:', { userRole, volunteerStatus });
    
    // Admin
    if (userRole === 'admin') {
      return <AdminDashboard stats={stats} />;
    }
    
    // Approved Volunteer
    if (userRole === 'volunteer') {
      return <VolunteerDashboard 
        user={{...currentUser, role: userRole}} 
        stats={stats} 
        reports={MOCK_REPORTS} 
      />;
    }
    
    // User with pending volunteer application
    if (volunteerStatus === 'pending') {
      return <PendingVolunteerDashboard user={currentUser} />;
    }
    
    // User with rejected volunteer application
    if (volunteerStatus === 'rejected') {
      return <RejectedVolunteerDashboard />;
    }
    
    // Regular user (no volunteer status or not applied)
    return <UserDashboard 
      user={{...currentUser, role: userRole}} 
      stats={stats} 
      reports={MOCK_REPORTS} 
    />;
  };

  return (
    <div className="dashboard-content">
      {renderDashboard()}
    </div>
  );
};

// Rest of the components remain the same...
const AdminDashboard: React.FC<{ stats: any }> = ({ stats }) => {
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
            <div className="stat-value stat-value-emerald">{stats.totalReports}</div>
          </div>
          
          <div className="stat-card">
            <p className="stat-label">Saved Lives</p>
            <div className="stat-value stat-value-moss">{stats.completedRescues}</div>
          </div>
        </div>

        <div className="admin-charts-grid">
          <div className="chart-container">
            <h3 className="chart-title">Operational Metrics</h3>
            
            <div className="recharts-wrapper">
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
      </div>
    </div>
  );
};

const VolunteerDashboard: React.FC<{ user: any, stats: any, reports: Report[] }> = ({ user, stats, reports }) => {
  const userId = user.user_id?.toString() || '';
  const myTasks = reports.filter(r => r.assignedTo === userId);
  const inProgressTask = myTasks.find(t => t.status === 'in-progress');
  const pendingTasks = myTasks.filter(t => t.status === 'submitted');

  return (
    <div className="dashboard-wrapper animate-fade-in">
      <div className="volunteer-dashboard">
        <div className="volunteer-header-grid">
          <div className="volunteer-welcome-card">
            <div className="volunteer-welcome-paw">
              🐾
            </div>
            <h2 className="volunteer-welcome-title">Welcome back, Operative {user.username}</h2>
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
                <p className="stat-value-large">{stats.myCompletedTasks}</p>
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
          
          {inProgressTask ? (
            <div className="square-assignment-grid">
              <div className="square-mission-card active">
                <div className="square-card-header">
                  <div className="square-status-badge in-field">IN FIELD</div>
                  <div className="square-volunteer-tag">{user.username?.toUpperCase()}</div>
                </div>
                
                <div className="square-card-content">
                  <div className="square-mission-title">
                    <h4 className="square-title">{inProgressTask.animalType} Mission</h4>
                    <span className="square-condition critical">{inProgressTask.condition}</span>
                  </div>
                  
                  <div className="square-location">
                    📍
                    <span className="location-text">{inProgressTask.location}</span>
                  </div>
                  
                  <p className="square-description">
                    {inProgressTask.description.length > 80 
                      ? `${inProgressTask.description.substring(0, 80)}...` 
                      : inProgressTask.description}
                  </p>
                  
                  <div className="square-actions">
                    <Link 
                      to={`/tasks/${inProgressTask.id}`}
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
                    <div className="square-status-badge pending-badge">PENDING</div>
                    <div className="square-count">{pendingTasks.length} waiting</div>
                  </div>
                  
                  <div className="square-card-content">
                    <div className="square-mission-title">
                      <h4 className="square-title">Queued Missions</h4>
                      <span className="square-condition moderate">MODERATE</span>
                    </div>
                    
                    <div className="square-pending-list">
                      {pendingTasks.slice(0, 2).map((task) => (
                        <div key={task.id} className="pending-item">
                          <span className="pending-animal">{task.animalType}</span>
                          <span className="pending-location">
                            📍{task.location.split(',')[0]}
                          </span>
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
                        <div className="quick-stat-value">{stats.myCompletedTasks}</div>
                        <div className="quick-stat-label">Rescues</div>
                      </div>
                    </div>
                    <div className="quick-stat-item">
                      <div className="quick-stat-icon">
                        ⏰
                      </div>
                      <div className="quick-stat-info">
                        <div className="quick-stat-value">{pendingTasks.length}</div>
                        <div className="quick-stat-label">Pending</div>
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

const UserDashboard: React.FC<{ user: any, stats: any, reports: Report[] }> = ({ user, stats, reports }) => {
  const userId = user.user_id?.toString() || '';
  const myReports = reports.filter(r => r.userId === userId);

  return (
    <div className="dashboard-wrapper animate-fade-in">
      <div className="user-dashboard">
        <div className="user-hero-banner">
          <div className="user-hero-bg mask-image-gradient"></div>
          <div className="user-hero-content">
            <h2 className="user-hero-title">Protect the Streets</h2>
            <p className="user-hero-text">
              Spot an animal in distress? ResQAll rangers are on standby to respond to your report.
            </p>
            <Link to="/submit-report" className="user-hero-btn">
              ⚠️ File Field Report
            </Link>
          </div>
        </div>

        <div className="user-reports-section">
          <h3 className="user-reports-title">My Report History</h3>
          
          <div className="user-reports-table">
            {myReports.length > 0 ? (
              <table className="reports-table">
                <thead>
                  <tr>
                    <th>Animal</th>
                    <th>Location</th>
                    <th>Date</th>
                    <th>Status</th>
                  </tr>
                </thead>
                <tbody>
                  {myReports.map(report => (
                    <tr key={report.id}>
                      <td className="animal-type">{report.animalType}</td>
                      <td>{report.location}</td>
                      <td className="report-date">
                        {new Date(report.createdAt).toLocaleDateString()}
                      </td>
                      <td>
                        <span className={`status-badge status-badge-${report.status}`}>
                          {report.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            ) : (
              <div className="no-reports">
                <p>You haven't filed any rescue reports yet.</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;