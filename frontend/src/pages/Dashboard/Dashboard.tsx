

// // // import React, { useState, useEffect } from 'react';
// // // import { useNavigate, Link } from 'react-router-dom';
// // // import { 
// // //   BarChart, 
// // //   Bar, 
// // //   XAxis, 
// // //   YAxis, 
// // //   Tooltip, 
// // //   ResponsiveContainer, 
// // //   Cell 
// // // } from 'recharts';
// // // import { useAuth } from '../../context/AuthContext'; 
// // // import './Dashboard.css';

// // // // Define Report interface with status_name from database JOIN
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
// // //   status_name: string; // This comes from database JOIN with report_statuses table
// // //   is_deleted?: number;
// // //   reporter_name?: string;
// // //   reporter_phone?: string;
// // //   volunteer_name?: string;
// // //   volunteer_id?: number;
// // // }

// // // // Define User Profile interface
// // // interface UserProfile {
// // //   user_id: number;
// // //   username: string;
// // //   email: string;
// // //   phone: string;
// // //   bio: string;
// // //   profile_image_url: string;
// // //   role_id: number;
// // //   created_at: string;
// // // }

// // // // Helper functions for status - USING DATABASE STATUS NAMES
// // // const getStatusText = (statusName: string): string => {
// // //   if (!statusName) return 'Unknown';
  
// // //   // Format the status name for display (from database: 'submitted', 'in_progress', etc.)
// // //   const formattedName = statusName
// // //     .replace(/_/g, ' ')  // Replace underscores with spaces
// // //     .split(' ')          // Split into words
// // //     .map(word => word.charAt(0).toUpperCase() + word.slice(1)) // Capitalize each word
// // //     .join(' ');          // Join back together
  
// // //   return formattedName;
// // // };

// // // const getStatusClass = (statusName: string): string => {
// // //   if (!statusName) return 'unknown';
  
// // //   const statusLower = statusName.toLowerCase();
  
// // //   if (statusLower.includes('submitted')) return 'submitted';
// // //   if (statusLower.includes('assigned')) return 'assigned';
// // //   if (statusLower.includes('in_progress')) return 'progress';
// // //   if (statusLower.includes('completed')) return 'completed';
// // //   if (statusLower.includes('declined')) return 'declined';
  
// // //   return 'unknown';
// // // };

// // // // Get animal emoji based on animal type
// // // const getAnimalEmoji = (animalType: string): string => {
// // //   const type = animalType?.toLowerCase() || '';
// // //   if (type.includes('dog')) return '🐶';
// // //   if (type.includes('cat')) return '🐱';
// // //   if (type.includes('bird')) return '🐦';
// // //   if (type.includes('rabbit') || type.includes('bunny')) return '🐰';
// // //   if (type.includes('hamster')) return '🐹';
// // //   if (type.includes('turtle') || type.includes('tortoise')) return '🐢';
// // //   if (type.includes('horse')) return '🐴';
// // //   if (type.includes('cow')) return '🐮';
// // //   if (type.includes('goat')) return '🐐';
// // //   if (type.includes('sheep')) return '🐑';
// // //   if (type.includes('fish')) return '🐠';
// // //   if (type.includes('snake')) return '🐍';
// // //   if (type.includes('mouse') || type.includes('rat')) return '🐭';
// // //   if (type.includes('monkey')) return '🐒';
// // //   if (type.includes('pig')) return '🐷';
// // //   if (type.includes('chicken')) return '🐔';
// // //   if (type.includes('duck')) return '🦆';
// // //   return '🐾';
// // // };

// // // // Format date for display
// // // const formatDate = (dateString: string): string => {
// // //   const date = new Date(dateString);
// // //   return date.toLocaleDateString('en-US', {
// // //     month: 'short',
// // //     day: 'numeric',
// // //     year: 'numeric',
// // //     hour: '2-digit',
// // //     minute: '2-digit'
// // //   });
// // // };

// // // // Report Detail Modal Component
// // // const ReportDetailModal: React.FC<{
// // //   report: Report | null;
// // //   isOpen: boolean;
// // //   onClose: () => void;
// // //   userPhone?: string;
// // //   userName?: string;
// // // }> = ({ report, isOpen, onClose, userPhone, userName }) => {
// // //   if (!isOpen || !report) return null;

// // //   // Use reporter info from report or fall back to current user info
// // //   const reporterName = report.reporter_name || userName;
// // //   const phoneNumber = report.reporter_phone || userPhone;

// // //   const isEditable = report.status_name?.toLowerCase() === 'submitted';

// // //   // Helper function to check if phone exists
// // //   const hasPhone = (phone?: string | null): boolean => {
// // //     if (phone === null || phone === undefined) return false;
// // //     if (typeof phone !== 'string') return false;
// // //     return phone.trim().length > 0;
// // //   };

// // //   // Format phone number for display
// // //   const formatPhoneNumber = (phone?: string | null): string => {
// // //     if (!hasPhone(phone)) {
// // //       return 'Not provided';
// // //     }
    
// // //     const phoneStr = String(phone).trim();
// // //     const cleaned = phoneStr.replace(/\D/g, '');
    
// // //     if (cleaned.length === 10) {
// // //       return `+977 ${cleaned}`;
// // //     }
    
// // //     return phoneStr;
// // //   };

// // //   const getConditionIcon = (condition: string): string => {
// // //     const cond = condition?.toLowerCase() || '';
// // //     if (cond.includes('critical') || cond.includes('emergency')) return '🆘';
// // //     if (cond.includes('severe') || cond.includes('serious')) return '⚠️';
// // //     if (cond.includes('moderate') || cond.includes('injured')) return '🩹';
// // //     if (cond.includes('mild') || cond.includes('sick')) return '🤒';
// // //     if (cond.includes('abandoned') || cond.includes('lost')) return '💔';
// // //     if (cond.includes('healthy') || cond.includes('safe')) return '✅';
// // //     return 'ℹ️';
// // //   };

// // //   // Get status text and class from database status_name
// // //   const statusText = getStatusText(report.status_name);
// // //   const statusClass = getStatusClass(report.status_name);

// // //   return (
// // //     <div className="modal-overlay" onClick={onClose}>
// // //       <div className="modal-content" onClick={e => e.stopPropagation()}>
// // //         <div className="modal-header">
// // //           <div className="modal-header-left">
// // //             <span className="modal-animal-emoji">{getAnimalEmoji(report.animal_type)}</span>
// // //             <div>
// // //               <h3 className="modal-title">Report #{report.report_id}</h3>
// // //               <p className="modal-subtitle">{report.animal_type} • {report.animal_condition}</p>
// // //             </div>
// // //           </div>
// // //           <button className="modal-close" onClick={onClose}>×</button>
// // //         </div>
        
// // //         <div className="modal-body">
// // //           {/* Top row with status */}
// // //           <div className="modal-top-row">
// // //             <div className="modal-status">
// // //               <span className={`status-badge-large status-${statusClass}`}>
// // //                 {statusText}
// // //               </span>
// // //               {!isEditable && (
// // //                 <span className="non-editable-badge">Non-editable</span>
// // //               )}
// // //             </div>
// // //           </div>

// // //           {/* Your Information Section */}
// // //           <div className="modal-section">
// // //             <h4 className="modal-section-title">
// // //               <span className="section-icon">👤</span>
// // //               Your Information
// // //             </h4>
// // //             <div className="modal-detail-grid">
// // //               <div className="detail-item">
// // //                 <span className="detail-label">Name</span>
// // //                 <span className="detail-value">{reporterName || 'Anonymous'}</span>
// // //               </div>
// // //               <div className="detail-item">
// // //                 <span className="detail-label">User ID</span>
// // //                 <span className="detail-value">#{report.user_id}</span>
// // //               </div>
// // //               {hasPhone(phoneNumber) && (
// // //                 <div className="detail-item">
// // //                   <span className="detail-label">Phone</span>
// // //                   <span className="detail-value phone-emphasis">
// // //                     {formatPhoneNumber(phoneNumber)}
// // //                   </span>
// // //                 </div>
// // //               )}
// // //             </div>
// // //           </div>

// // //           {/* Animal Information Section */}
// // //           <div className="modal-section">
// // //             <h4 className="modal-section-title">
// // //               <span className="section-icon">🐾</span>
// // //               Animal Information
// // //             </h4>
// // //             <div className="modal-detail-grid">
// // //               <div className="detail-item">
// // //                 <span className="detail-label">Animal Type</span>
// // //                 <div className="detail-value-with-emoji">
// // //                   <span className="detail-emoji">{getAnimalEmoji(report.animal_type)}</span>
// // //                   <span>{report.animal_type || 'Unknown Animal'}</span>
// // //                 </div>
// // //               </div>
// // //               <div className="detail-item">
// // //                 <span className="detail-label">Condition</span>
// // //                 <div className="detail-value-with-emoji">
// // //                   <span className="detail-emoji">{getConditionIcon(report.animal_condition)}</span>
// // //                   <span>{report.animal_condition || 'Not specified'}</span>
// // //                 </div>
// // //               </div>
// // //             </div>
// // //           </div>

// // //           {/* Location Details */}
// // //           <div className="modal-section">
// // //             <h4 className="modal-section-title">
// // //               <span className="section-icon">📍</span>
// // //               Location Details
// // //             </h4>
// // //             <div className="location-card">
// // //               <div className="location-content">
// // //                 <span className="location-icon-large">📍</span>
// // //                 <span className="location-text">{report.location_address}</span>
// // //               </div>
// // //             </div>
// // //           </div>

// // //           {/* Description */}
// // //           <div className="modal-section">
// // //             <h4 className="modal-section-title">
// // //               <span className="section-icon">📝</span>
// // //               Description
// // //             </h4>
// // //             <div className="description-card">
// // //               <p className="description-text">{report.description}</p>
// // //             </div>
// // //           </div>

// // //           {/* Show assigned volunteer name only (no phone) */}
// // //           {report.volunteer_name && (
// // //             <div className="modal-section">
// // //               <h4 className="modal-section-title">
// // //                 <span className="section-icon">🦸</span>
// // //                 Assigned Volunteer
// // //               </h4>
// // //               <div className="detail-item">
// // //                 <div className="detail-value-with-emoji">
// // //                   <span className="detail-emoji">🦸</span>
// // //                   <span>{report.volunteer_name}</span>
// // //                 </div>
// // //               </div>
// // //             </div>
// // //           )}

// // //           {/* Timeline */}
// // //           <div className="modal-section">
// // //             <h4 className="modal-section-title">
// // //               <span className="section-icon">📅</span>
// // //               Timeline
// // //             </h4>
// // //             <div className="timeline-card">
// // //               <div className="timeline-item">
// // //                 <div className="timeline-icon">📅</div>
// // //                 <div className="timeline-content">
// // //                   <div className="timeline-label">Report Submitted</div>
// // //                   <div className="timeline-value">{formatDate(report.submitted_at)}</div>
// // //                 </div>
// // //               </div>
// // //             </div>
// // //           </div>
// // //         </div>
        
// // //         <div className="modal-footer">
// // //           <button className="modal-btn secondary" onClick={onClose}>
// // //             Close
// // //           </button>
// // //         </div>
// // //       </div>
// // //     </div>
// // //   );
// // // };

// // // export const Dashboard: React.FC = () => {
// // //   const [isLoading, setIsLoading] = useState(true);
// // //   const [userReports, setUserReports] = useState<Report[]>([]);
// // //   const [reportsLoading, setReportsLoading] = useState(true);
// // //   const [userProfile, setUserProfile] = useState<UserProfile | null>(null);
// // //   const [selectedReport, setSelectedReport] = useState<Report | null>(null);
// // //   const [isModalOpen, setIsModalOpen] = useState(false);
// // //   const navigate = useNavigate();
  
// // //   const { user: currentUser } = useAuth();
  
// // //   // Fetch user profile (including phone number)
// // //   useEffect(() => {
// // //     const fetchUserProfile = async () => {
// // //       if (!currentUser) return;
      
// // //       try {
// // //         const token = localStorage.getItem('token');
// // //         const response = await fetch('http://localhost:5000/api/users/profile', {
// // //           headers: {
// // //             'Authorization': `Bearer ${token}`,
// // //             'Content-Type': 'application/json'
// // //           }
// // //         });

// // //         if (response.ok) {
// // //           const data = await response.json();
// // //           if (data.success) {
// // //             setUserProfile(data.data);
// // //           }
// // //         }
// // //       } catch (err) {
// // //         console.error('Error fetching user profile:', err);
// // //       }
// // //     };

// // //     fetchUserProfile();
// // //   }, [currentUser]);

// // //   // Fetch user's reports from backend WITH STATUS NAMES from report_statuses table
// // //   useEffect(() => {
// // //     const fetchUserReports = async () => {
// // //       if (!currentUser) return;
      
// // //       try {
// // //         setReportsLoading(true);
// // //         const token = localStorage.getItem('token');
        
// // //         console.log('🔍 Fetching reports with status names from database...');
        
// // //         const response = await fetch('http://localhost:5000/api/reports/my-reports', {
// // //           headers: {
// // //             'Authorization': `Bearer ${token}`,
// // //             'Content-Type': 'application/json'
// // //           }
// // //         });
        
// // //         if (response.ok) {
// // //           const data = await response.json();
// // //           console.log('📊 API response received:', {
// // //             success: data.success,
// // //             count: data.count,
// // //             dataLength: data.data?.length
// // //           });
          
// // //           if (data.success) {
// // //             const reportsData = data.data || [];
            
// // //             // Debug: Log what fields we're getting from the database
// // //             if (reportsData.length > 0) {
// // //               const sampleReport = reportsData[0];
// // //               console.log('📋 Sample report fields:', Object.keys(sampleReport));
// // //               console.log('📋 Sample report status data:', {
// // //                 status_id: sampleReport.status_id,
// // //                 status_name: sampleReport.status_name,
// // //                 animal_type: sampleReport.animal_type,
// // //                 animal_condition: sampleReport.animal_condition
// // //               });
// // //             }
            
// // //             // Log all status names to verify they're coming from database
// // //             console.log('📊 All report statuses from database:');
// // //             reportsData.forEach((report: Report, index: number) => {
// // //               console.log(`Report ${index + 1}: ID=${report.report_id}, Status=${report.status_name} (ID: ${report.status_id})`);
// // //             });
            
// // //             // Add current user's info to each report
// // //             const reportsWithUserInfo = reportsData.map((report: Report) => ({
// // //               ...report,
// // //               reporter_name: userProfile?.username || currentUser.username,
// // //               reporter_phone: userProfile?.phone || ''
// // //             }));
            
// // //             setUserReports(reportsWithUserInfo);
// // //             console.log(`✅ Loaded ${reportsWithUserInfo.length} reports with status names from database`);
// // //           } else {
// // //             console.error('❌ API returned success: false', data);
// // //           }
// // //         } else {
// // //           console.error('❌ Failed to fetch reports:', response.status, response.statusText);
// // //         }
// // //       } catch (error) {
// // //         console.error('❌ Error fetching reports:', error);
// // //       } finally {
// // //         setReportsLoading(false);
// // //       }
// // //     };
    
// // //     if (currentUser) {
// // //       fetchUserReports();
// // //     }
// // //   }, [currentUser, userProfile]);
  
// // //   useEffect(() => {
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
    
// // //     return 'user';
// // //   };
  
// // //   const getVolunteerStatus = (user: any): string | null => {
// // //     if (!user) return null;

// // //     if (user.approval_status_id) {
// // //       if (user.approval_status_id === 1) return 'pending';
// // //       if (user.approval_status_id === 2) return 'approved';
// // //       if (user.approval_status_id === 3) return 'rejected';
// // //     }

// // //     if (user.volunteer) {
// // //       if (user.volunteer.approval_status_id) {
// // //         if (user.volunteer.approval_status_id === 1) return 'pending';
// // //         if (user.volunteer.approval_status_id === 2) return 'approved';
// // //         if (user.volunteer.approval_status_id === 3) return 'rejected';
// // //       }
      
// // //       if (user.volunteer.status) {
// // //         return user.volunteer.status.toLowerCase();
// // //       }
// // //     }

// // //     if (user.volunteer_status) {
// // //       return user.volunteer_status.toLowerCase();
// // //     }

// // //     return null;
// // //   };

// // //   const handleViewDetails = (report: Report) => {
// // //     setSelectedReport(report);
// // //     setIsModalOpen(true);
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
// // //           <div className="loading-spinner-large"></div>
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

// // //   const getStats = () => {
// // //     const totalReports = userReports.length;
// // //     const completedRescues = userReports.filter(r => 
// // //       r.status_name?.toLowerCase() === 'completed'
// // //     ).length;
// // //     const activeVolunteers = 1;
// // //     const pendingApprovals = 0;
    
// // //     const userId = currentUser.user_id?.toString() || '';
    
// // //     const myReports = userReports.filter(r => {
// // //       const reportUserId = Number(r.user_id);
// // //       const currentUserId = Number(userId);
// // //       return reportUserId === currentUserId;
// // //     });
    
// // //     const myCompletedTasks = userReports.filter(r => 
// // //       r.status_name?.toLowerCase() === 'completed'
// // //     ).length;

// // //     return {
// // //       totalReports,
// // //       completedRescues,
// // //       activeVolunteers,
// // //       pendingApprovals,
// // //       myReports: myReports.length,
// // //       myCompletedTasks,
// // //     };
// // //   };

// // //   const stats = getStats();

// // //   // Clean rendering logic
// // //   const renderDashboard = () => {
// // //     console.log('👤 Rendering dashboard for:', { 
// // //       username: currentUser.username,
// // //       userRole, 
// // //       volunteerStatus 
// // //     });
    
// // //     // Admin
// // //     if (userRole === 'admin') {
// // //       return <AdminDashboard 
// // //         stats={stats} 
// // //         reports={userReports} 
// // //         reportsLoading={reportsLoading} 
// // //       />;
// // //     }
    
// // //     // Approved Volunteer
// // //     if (userRole === 'volunteer') {
// // //       return <VolunteerDashboard 
// // //         user={{...currentUser, role: userRole}} 
// // //         stats={stats} 
// // //         reports={userReports}
// // //         reportsLoading={reportsLoading}
// // //         userProfile={userProfile}
// // //       />;
// // //     }
    
// // //     // User with pending volunteer application
// // //     if (volunteerStatus === 'pending') {
// // //       return <PendingVolunteerDashboard user={currentUser} />;
// // //     }
    
// // //     // User with rejected volunteer application
// // //     if (volunteerStatus === 'rejected') {
// // //       return <RejectedVolunteerDashboard />;
// // //     }
    
// // //     // Regular user (no volunteer status or not applied)
// // //     return <UserDashboard 
// // //       user={{...currentUser, role: userRole}} 
// // //       userReports={userReports}
// // //       reportsLoading={reportsLoading}
// // //       onViewDetails={handleViewDetails}
// // //       userProfile={userProfile}
// // //     />;
// // //   };

// // //   return (
// // //     <div className="dashboard-content">
// // //       {renderDashboard()}
      
// // //       <ReportDetailModal 
// // //         report={selectedReport} 
// // //         isOpen={isModalOpen} 
// // //         onClose={() => setIsModalOpen(false)}
// // //         userPhone={userProfile?.phone}
// // //         userName={userProfile?.username}
// // //       />
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

// // // // ADMIN DASHBOARD
// // // const AdminDashboard: React.FC<{ 
// // //   stats: any, 
// // //   reports: Report[], 
// // //   reportsLoading: boolean
// // // }> = ({ stats, reports, reportsLoading }) => {
// // //   const chartData = [
// // //     { name: 'Reports', value: stats.totalReports },
// // //     { name: 'Rescued', value: stats.completedRescues },
// // //     { name: 'Volunteers', value: stats.activeVolunteers },
// // //   ];
// // //   const COLORS = ['#A67C52', '#2D5A27', '#7D8C5A'];

// // //   return (
// // //     <div className="dashboard-wrapper animate-fade-in">
// // //       <div className="admin-dashboard">
// // //         <h2 className="admin-header">ResQAll Global Overview</h2>
        
// // //         <div className="admin-stats-grid">
// // //           <div className="stat-card">
// // //             <p className="stat-label">Pending Operatives</p>
// // //             <div className="stat-content">
// // //               <div className="stat-value stat-value-earth">{stats.pendingApprovals}</div>
// // //               {stats.pendingApprovals > 0 && (
// // //                 <Link to="/admin/volunteers" className="stat-alert animate-pulse">
// // //                   Review Now
// // //                 </Link>
// // //               )}
// // //             </div>
// // //           </div>
          
// // //           <div className="stat-card">
// // //             <p className="stat-label">Field Rangers</p>
// // //             <div className="stat-value stat-value-emerald">{stats.activeVolunteers}</div>
// // //           </div>
          
// // //           <div className="stat-card">
// // //             <p className="stat-label">Mission Reports</p>
// // //             <div className="stat-value stat-value-emerald">
// // //               {reportsLoading ? '...' : stats.totalReports}
// // //             </div>
// // //           </div>
          
// // //           <div className="stat-card">
// // //             <p className="stat-label">Saved Lives</p>
// // //             <div className="stat-value stat-value-moss">
// // //               {reportsLoading ? '...' : stats.completedRescues}
// // //             </div>
// // //           </div>
// // //         </div>

// // //         <div className="admin-charts-grid">
// // //           <div className="chart-container">
// // //             <h3 className="chart-title">Operational Metrics</h3>
            
// // //             <div className="recharts-wrapper">
// // //               {reportsLoading ? (
// // //                 <div className="chart-loading">
// // //                   <p>Loading chart data...</p>
// // //                 </div>
// // //               ) : (
// // //                 <ResponsiveContainer width="100%" height={300}>
// // //                   <BarChart data={chartData}>
// // //                     <XAxis dataKey="name" axisLine={false} tickLine={false} />
// // //                     <YAxis axisLine={false} tickLine={false} />
// // //                     <Tooltip 
// // //                       cursor={{fill: '#F5F1E8'}} 
// // //                       formatter={(value) => [value, 'Count']}
// // //                       labelFormatter={(label) => `${label}`}
// // //                     />
// // //                     <Bar 
// // //                       dataKey="value" 
// // //                       radius={[10, 10, 0, 0]}
// // //                       barSize={60}
// // //                     >
// // //                       {chartData.map((entry, index) => (
// // //                         <Cell 
// // //                           key={`cell-${index}`} 
// // //                           fill={COLORS[index % COLORS.length]} 
// // //                         />
// // //                       ))}
// // //                     </Bar>
// // //                   </BarChart>
// // //                 </ResponsiveContainer>
// // //               )}
// // //             </div>
// // //           </div>
          
// // //           <div className="volunteer-alert-box">
// // //             <div className="volunteer-alert-icon">
// // //               ⚠️
// // //             </div>
// // //             <h3 className="volunteer-alert-title">Volunteer Queue</h3>
// // //             <p className="volunteer-alert-text">
// // //               There are {stats.pendingApprovals} rangers waiting for activation to join the ResQAll squad.
// // //             </p>
// // //             <Link to="/admin/volunteers" className="volunteer-alert-btn">
// // //               Manage Operatives
// // //             </Link>
// // //           </div>
// // //         </div>

// // //         <div className="recent-reports-section">
// // //           <h3 className="section-header">Recent Reports ({reports.length})</h3>
// // //           <div className="reports-table-container">
// // //             {reportsLoading ? (
// // //               <div className="loading-message">
// // //                 <div className="loading-spinner-small"></div>
// // //                 <p>Loading reports...</p>
// // //               </div>
// // //             ) : reports.length > 0 ? (
// // //               <>
// // //                 <table className="reports-table">
// // //                   <thead>
// // //                     <tr>
// // //                       <th>ID</th>
// // //                       <th>Animal</th>
// // //                       <th>Condition</th>
// // //                       <th>Location</th>
// // //                       <th>Reporter</th>
// // //                       <th>Phone</th>
// // //                       <th>Date</th>
// // //                       <th>Status</th>
// // //                     </tr>
// // //                   </thead>
// // //                   <tbody>
// // //                     {reports.slice(0, 10).map((report) => (
// // //                       <tr key={report.report_id}>
// // //                         <td>#{report.report_id}</td>
// // //                         <td className="animal-type">{report.animal_type || 'Unknown'}</td>
// // //                         <td>{report.animal_condition || 'Unknown'}</td>
// // //                         <td className="location-cell">{report.location_address || 'No location'}</td>
// // //                         <td>{report.reporter_name || 'Anonymous'}</td>
// // //                         <td>{report.reporter_phone || 'N/A'}</td>
// // //                         <td className="report-date">
// // //                           {report.submitted_at ? 
// // //                             new Date(report.submitted_at).toLocaleDateString() : 
// // //                             'Unknown date'}
// // //                         </td>
// // //                         <td>
// // //                           <span className={`status-badge status-${getStatusClass(report.status_name)}`}>
// // //                             {getStatusText(report.status_name)}
// // //                           </span>
// // //                         </td>
// // //                       </tr>
// // //                     ))}
// // //                   </tbody>
// // //                 </table>
// // //                 {reports.length > 10 && (
// // //                   <div className="view-all-container">
// // //                     <Link to="/admin/reports" className="view-all-link">
// // //                       View All Reports ({reports.length})
// // //                     </Link>
// // //                   </div>
// // //                 )}
// // //               </>
// // //             ) : (
// // //               <div className="no-reports">
// // //                 <p>No reports found in the system.</p>
// // //               </div>
// // //             )}
// // //           </div>
// // //         </div>
// // //       </div>
// // //     </div>
// // //   );
// // // };

// // // // VOLUNTEER DASHBOARD
// // // const VolunteerDashboard: React.FC<{ 
// // //   user: any, 
// // //   stats: any, 
// // //   reports: Report[],
// // //   reportsLoading: boolean,
// // //   userProfile: UserProfile | null
// // // }> = ({ user, stats, reports, reportsLoading, userProfile }) => {
// // //   const userId = user.user_id?.toString() || '';
  
// // //   const myTasks = reports.filter(r => {
// // //     return r.status_name?.toLowerCase() === 'in_progress';
// // //   });
  
// // //   const inProgressTask = reports.find(r => {
// // //     return r.status_name?.toLowerCase() === 'in_progress';
// // //   });
  
// // //   const pendingTasks = reports.filter(r => r.status_name?.toLowerCase() === 'submitted');

// // //   return (
// // //     <div className="dashboard-wrapper animate-fade-in">
// // //       <div className="volunteer-dashboard">
// // //         <div className="volunteer-header-grid">
// // //           <div className="volunteer-welcome-card">
// // //             <div className="volunteer-welcome-paw">
// // //               🐾
// // //             </div>
// // //             <h2 className="volunteer-welcome-title">Welcome back, Operative {user.username}</h2>
// // //             {userProfile?.phone && (
// // //               <p className="volunteer-contact-info">
// // //                 📱 Contact: {userProfile.phone}
// // //               </p>
// // //             )}
// // //             <p className="volunteer-welcome-text">
// // //               Scanning sectors for animals in need. Ready for your next mission?
// // //             </p>
// // //             <div className="volunteer-welcome-btns">
// // //               <Link to="/tasks" className="welcome-btn welcome-btn-primary">
// // //                 Open Mission Board
// // //               </Link>
// // //               <Link to="/profile" className="welcome-btn welcome-btn-secondary">
// // //                 My Service Medals
// // //               </Link>
// // //             </div>
// // //           </div>

// // //           <div className="volunteer-stats-column">
// // //             <div className="volunteer-stat-card">
// // //               <div className="stat-info">
// // //                 <p className="stat-label-small">Successful Rescues</p>
// // //                 <p className="stat-value-large">
// // //                   {reportsLoading ? '...' : stats.myCompletedTasks}
// // //                 </p>
// // //               </div>
// // //               <div className="stat-icon stat-icon-success">
// // //                 ✓
// // //               </div>
// // //             </div>
            
// // //             <div className="volunteer-stat-card">
// // //               <div className="stat-info">
// // //                 <p className="stat-label-small">Ranger Rank</p>
// // //                 <p className="stat-value-medium">
// // //                   Volunteer
// // //                 </p>
// // //               </div>
// // //               <div className="stat-icon stat-icon-rank">
// // //                 🏆
// // //               </div>
// // //             </div>
// // //           </div>
// // //         </div>

// // //         <div className="mission-section">
// // //           <h3 className="section-header">
// // //             📻 Active Assignment
// // //           </h3>
          
// // //           {reportsLoading ? (
// // //             <div className="square-assignment-grid">
// // //               <div className="square-mission-card empty">
// // //                 <div className="square-card-content centered">
// // //                   <div className="no-mission-icon">
// // //                     ⏰
// // //                   </div>
// // //                   <h4 className="no-mission-title">Loading Missions...</h4>
// // //                   <p className="no-mission-text">
// // //                     Fetching your assignments from the database...
// // //                   </p>
// // //                 </div>
// // //               </div>
// // //             </div>
// // //           ) : inProgressTask ? (
// // //             <div className="square-assignment-grid">
// // //               <div className="square-mission-card active">
// // //                 <div className="square-card-header">
// // //                   <div className="square-status-badge in-field">IN FIELD</div>
// // //                   <div className="square-volunteer-tag">{user.username?.toUpperCase()}</div>
// // //                 </div>
                
// // //                 <div className="square-card-content">
// // //                   <div className="square-mission-title">
// // //                     <h4 className="square-title">{inProgressTask.animal_type} Mission</h4>
// // //                     <span className="square-condition critical">
// // //                       {inProgressTask.animal_condition || 'CRITICAL'}
// // //                     </span>
// // //                   </div>
                  
// // //                   <div className="square-location">
// // //                     📍
// // //                     <span className="location-text">{inProgressTask.location_address || 'Location not specified'}</span>
// // //                   </div>
                  
// // //                   {/* Show reporter info for volunteers */}
// // //                   <div className="square-reporter-info">
// // //                     <div className="reporter-name">
// // //                       <span className="reporter-icon-small">👤</span>
// // //                       {inProgressTask.reporter_name || 'Anonymous'}
// // //                     </div>
// // //                     {inProgressTask.reporter_phone && (
// // //                       <div className="reporter-phone">
// // //                         <span className="phone-icon-small">📱</span>
// // //                         {inProgressTask.reporter_phone}
// // //                       </div>
// // //                     )}
// // //                   </div>
                  
// // //                   <p className="square-description">
// // //                     {inProgressTask.description?.length > 80 
// // //                       ? `${inProgressTask.description.substring(0, 80)}...` 
// // //                       : inProgressTask.description || 'No description provided'}
// // //                   </p>
                  
// // //                   <div className="square-actions">
// // //                     <Link 
// // //                       to={`/tasks/${inProgressTask.report_id}`}
// // //                       className="square-action-btn"
// // //                     >
// // //                       Update Report →
// // //                     </Link>
// // //                   </div>
// // //                 </div>
// // //               </div>

// // //               {pendingTasks.length > 0 && (
// // //                 <div className="square-mission-card pending">
// // //                   <div className="square-card-header">
// // //                     <div className="square-status-badge pending-badge">AVAILABLE</div>
// // //                     <div className="square-count">{pendingTasks.length} waiting</div>
// // //                   </div>
                  
// // //                   <div className="square-card-content">
// // //                     <div className="square-mission-title">
// // //                       <h4 className="square-title">Available Missions</h4>
// // //                       <span className="square-condition moderate">NEEDS VOLUNTEER</span>
// // //                     </div>
                    
// // //                     <div className="square-pending-list">
// // //                       {pendingTasks.slice(0, 2).map((task) => (
// // //                         <div key={task.report_id} className="pending-item">
// // //                           <span className="pending-animal">{task.animal_type}</span>
// // //                           <span className="pending-location">
// // //                             📍{task.location_address?.split(',')[0] || 'Unknown'}
// // //                           </span>
// // //                           <div className="pending-reporter">
// // //                             <small>👤 {task.reporter_name || 'Anonymous'}</small>
// // //                           </div>
// // //                           <div className="pending-status">
// // //                             <small>
// // //                               Status: {getStatusText(task.status_name)}
// // //                             </small>
// // //                           </div>
// // //                         </div>
// // //                       ))}
// // //                       {pendingTasks.length > 2 && (
// // //                         <div className="pending-more">
// // //                           +{pendingTasks.length - 2} more missions
// // //                         </div>
// // //                       )}
// // //                     </div>
                    
// // //                     <div className="square-actions">
// // //                       <Link to="/tasks" className="square-action-btn view-all">
// // //                         View All →
// // //                       </Link>
// // //                     </div>
// // //                   </div>
// // //                 </div>
// // //               )}
// // //             </div>
// // //           ) : (
// // //             <div className="square-assignment-grid">
// // //               <div className="square-mission-card empty">
// // //                 <div className="square-card-content centered">
// // //                   <div className="no-mission-icon">
// // //                     ⏰
// // //                   </div>
// // //                   <h4 className="no-mission-title">No Active Missions</h4>
// // //                   <p className="no-mission-text">
// // //                     The sector is quiet. Head to the mission board to see new reports.
// // //                   </p>
// // //                   <Link to="/tasks" className="square-action-btn primary">
// // //                     Go to Mission Board
// // //                   </Link>
// // //                 </div>
// // //               </div>

// // //               <div className="square-mission-card stats">
// // //                 <div className="square-card-content">
// // //                   <div className="quick-stats">
// // //                     <div className="quick-stat-item">
// // //                       <div className="quick-stat-icon">
// // //                         ✓
// // //                       </div>
// // //                       <div className="quick-stat-info">
// // //                         <div className="quick-stat-value">
// // //                           {reportsLoading ? '...' : stats.myCompletedTasks}
// // //                         </div>
// // //                         <div className="quick-stat-label">Rescues</div>
// // //                       </div>
// // //                     </div>
// // //                     <div className="quick-stat-item">
// // //                       <div className="quick-stat-icon">
// // //                         ⏰
// // //                       </div>
// // //                       <div className="quick-stat-info">
// // //                         <div className="quick-stat-value">
// // //                           {reportsLoading ? '...' : pendingTasks.length}
// // //                         </div>
// // //                         <div className="quick-stat-label">Available</div>
// // //                       </div>
// // //                     </div>
// // //                     <div className="quick-stat-item">
// // //                       <div className="quick-stat-icon">
// // //                         🏆
// // //                       </div>
// // //                       <div className="quick-stat-info">
// // //                         <div className="quick-stat-value">0</div>
// // //                         <div className="quick-stat-label">Badges</div>
// // //                       </div>
// // //                     </div>
// // //                   </div>
// // //                   <Link to="/profile" className="square-action-btn secondary">
// // //                     View Profile
// // //                   </Link>
// // //                 </div>
// // //               </div>
// // //             </div>
// // //           )}
// // //         </div>
// // //       </div>
// // //     </div>
// // //   );
// // // };

// // // // PENDING VOLUNTEER
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

// // // // REJECTED VOLUNTEER
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

// // // // USER DASHBOARD
// // // const UserDashboard: React.FC<{ 
// // //   user: any; 
// // //   userReports: Report[]; 
// // //   reportsLoading: boolean;
// // //   onViewDetails: (report: Report) => void;
// // //   userProfile: UserProfile | null;
// // // }> = ({ user, userReports, reportsLoading, onViewDetails, userProfile }) => {
// // //   // Filter reports by current user
// // //   const myReports = userReports.filter(report => {
// // //     const reportUserId = Number(report.user_id);
// // //     const currentUserId = Number(user.user_id);
// // //     return reportUserId === currentUserId;
// // //   });

// // //   // Calculate statistics using status_name from database
// // //   const totalReports = myReports.length;
// // //   const submittedReports = myReports.filter(r => r.status_name?.toLowerCase() === 'submitted').length;
// // //   const assignedReports = myReports.filter(r => r.status_name?.toLowerCase() === 'assigned').length;
// // //   const inProgressReports = myReports.filter(r => r.status_name?.toLowerCase() === 'in_progress').length;
// // //   const completedReports = myReports.filter(r => r.status_name?.toLowerCase() === 'completed').length;
// // //   const declinedReports = myReports.filter(r => r.status_name?.toLowerCase() === 'declined').length;

// // //   // Get user's phone number
// // //   const userPhone = userProfile?.phone;

// // //   return (
// // //     <div className="dashboard-wrapper animate-fade-in">
// // //       <div className="user-dashboard">
// // //         {/* Welcome Section */}
// // //         <div className="user-welcome-section">
// // //           <div className="user-welcome-content">
// // //             <h2 className="user-welcome-title">
// // //               <span className="user-welcome-greeting">Welcome back,</span>
// // //               <span className="user-welcome-name">{user.username || 'Animal Friend'}!</span>
// // //             </h2>
// // //             {userPhone && (
// // //               <p className="user-contact-info">
// // //                 <span className="contact-icon">📱</span>
// // //                 <span className="contact-text">Your contact: {userPhone}</span>
// // //               </p>
// // //             )}
// // //             <p className="user-welcome-subtitle">
// // //               Your reports help save animals in need.
// // //             </p>
// // //           </div>
// // //           <Link to="/create-report" className="user-primary-btn">
// // //             <span className="btn-icon">⚠️</span>
// // //             File Field Report
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
// // //               <p className="stat-card-label">Submitted</p>
// // //             </div>
// // //           </div>
// // //         </div>

// // //         {/* Reports Section */}
// // //         <div className="reports-section">
// // //           <div className="reports-header">
// // //             <h3 className="reports-title">Your Reports ({totalReports})</h3>
// // //             {myReports.length > 0 && (
// // //               <Link to="/my-reports" className="view-all-link">
// // //                 View All →
// // //               </Link>
// // //             )}
// // //           </div>
          
// // //           <div className="reports-container">
// // //             {reportsLoading ? (
// // //               <LoadingSpinner />
// // //             ) : myReports.length > 0 ? (
// // //               <div className="reports-list">
// // //                 {myReports.slice(0, 6).map(report => {
// // //                   const statusText = getStatusText(report.status_name);
// // //                   const statusClass = getStatusClass(report.status_name);
                  
// // //                   return (
// // //                     <div key={report.report_id} className="report-card">
// // //                       <div className="report-card-header">
// // //                         <div className="report-card-left">
// // //                           <div className="animal-emoji-title">
// // //                             <span className="animal-emoji">{getAnimalEmoji(report.animal_type)}</span>
// // //                             <span className="animal-type-text">{report.animal_type || 'Unknown Animal'}</span>
// // //                           </div>
// // //                           <span className="condition-badge condition-info">
// // //                             {report.animal_condition || 'Unknown'}
// // //                           </span>
// // //                         </div>
// // //                         <span className={`status-badge status-${statusClass}`}>
// // //                           {statusText}
// // //                         </span>
// // //                       </div>
                      
// // //                       <div className="report-card-body">
// // //                         <p className="report-description">
// // //                           {report.description}
// // //                         </p>
                        
// // //                         <div className="report-info">
// // //                           <div className="report-location">
// // //                             <span className="location-icon">📍</span>
// // //                             <span className="location-text">{report.location_address}</span>
// // //                           </div>
                          
// // //                           <div className="report-date">
// // //                             <span className="date-icon">📅</span>
// // //                             <span className="date-text">
// // //                               {formatDate(report.submitted_at)}
// // //                             </span>
// // //                           </div>
// // //                         </div>
                        
// // //                         {report.user_note && (
// // //                           <div className="user-note">
// // //                             <strong>Your Note:</strong> {report.user_note}
// // //                           </div>
// // //                         )}
// // //                       </div>
                      
// // //                       <div className="report-card-footer">
// // //                         <button 
// // //                           className="report-details-link"
// // //                           onClick={() => onViewDetails(report)}
// // //                         >
// // //                           View Details →
// // //                         </button>
// // //                       </div>
// // //                     </div>
// // //                   );
// // //                 })}
// // //               </div>
// // //             ) : (
// // //               <div className="no-reports-message">
// // //                 <div className="no-reports-icon">📝</div>
// // //                 <h4 className="no-reports-title">No Reports Yet</h4>
// // //                 <p className="no-reports-text">
// // //                   You haven't filed any animal rescue reports yet.
// // //                 </p>
// // //                 <Link to="/create-report" className="no-reports-btn">
// // //                   File Your First Report
// // //                 </Link>
// // //               </div>
// // //             )}
            
// // //             {myReports.length > 6 && (
// // //               <div className="view-all-container">
// // //                 <Link to="/my-reports" className="view-all-btn">
// // //                   View All Reports ({myReports.length})
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

// // // Define Report interface with status_name from database JOIN
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
// //   status_name: string;
// //   is_deleted?: number;
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

// // // Helper functions for status - USING DATABASE STATUS NAMES
// // const getStatusText = (statusName: string): string => {
// //   if (!statusName) return 'Unknown';
  
// //   const formattedName = statusName
// //     .replace(/_/g, ' ')
// //     .split(' ')
// //     .map(word => word.charAt(0).toUpperCase() + word.slice(1))
// //     .join(' ');
  
// //   return formattedName;
// // };

// // const getStatusClass = (statusName: string): string => {
// //   if (!statusName) return 'unknown';
  
// //   const statusLower = statusName.toLowerCase();
  
// //   if (statusLower.includes('submitted')) return 'submitted';
// //   if (statusLower.includes('assigned')) return 'assigned';
// //   if (statusLower.includes('in_progress')) return 'progress';
// //   if (statusLower.includes('completed')) return 'completed';
// //   if (statusLower.includes('declined')) return 'declined';
  
// //   return 'unknown';
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

// // // Report Detail Modal Component
// // const ReportDetailModal: React.FC<{
// //   report: Report | null;
// //   isOpen: boolean;
// //   onClose: () => void;
// //   userPhone?: string;
// //   userName?: string;
// // }> = ({ report, isOpen, onClose, userPhone, userName }) => {
// //   if (!isOpen || !report) return null;

// //   const reporterName = report.reporter_name || userName;
// //   const phoneNumber = report.reporter_phone || userPhone;
// //   const isEditable = report.status_name?.toLowerCase() === 'submitted';

// //   const hasPhone = (phone?: string | null): boolean => {
// //     if (phone === null || phone === undefined) return false;
// //     if (typeof phone !== 'string') return false;
// //     return phone.trim().length > 0;
// //   };

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

// //   const statusText = getStatusText(report.status_name);
// //   const statusClass = getStatusClass(report.status_name);

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
// //           <div className="modal-top-row">
// //             <div className="modal-status">
// //               <span className={`status-badge-large status-${statusClass}`}>
// //                 {statusText}
// //               </span>
// //               {!isEditable && (
// //                 <span className="non-editable-badge">Non-editable</span>
// //               )}
// //             </div>
// //           </div>

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

// //           <div className="modal-section">
// //             <h4 className="modal-section-title">
// //               <span className="section-icon">📝</span>
// //               Description
// //             </h4>
// //             <div className="description-card">
// //               <p className="description-text">{report.description}</p>
// //             </div>
// //           </div>

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
// //             const reportsData = data.data || [];
// //             const reportsWithUserInfo = reportsData.map((report: Report) => ({
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

// //   const getStats = () => {
// //     const totalReports = userReports.length;
// //     const completedRescues = userReports.filter(r => 
// //       r.status_name?.toLowerCase() === 'completed'
// //     ).length;
// //     const activeVolunteers = 1;
// //     const pendingApprovals = 0;
    
// //     const userId = currentUser.user_id?.toString() || '';
    
// //     const myReports = userReports.filter(r => {
// //       const reportUserId = Number(r.user_id);
// //       const currentUserId = Number(userId);
// //       return reportUserId === currentUserId;
// //     });
    
// //     const myCompletedTasks = userReports.filter(r => 
// //       r.status_name?.toLowerCase() === 'completed'
// //     ).length;

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

// //   const renderDashboard = () => {
// //     if (userRole === 'admin') {
// //       return <AdminDashboard 
// //         stats={stats} 
// //         reports={userReports} 
// //         reportsLoading={reportsLoading} 
// //       />;
// //     }
    
// //     if (userRole === 'volunteer') {
// //       return <VolunteerDashboard 
// //         user={{...currentUser, role: userRole}} 
// //         stats={stats} 
// //         reports={userReports}
// //         reportsLoading={reportsLoading}
// //         userProfile={userProfile}
// //       />;
// //     }
    
// //     if (volunteerStatus === 'pending') {
// //       return <PendingVolunteerDashboard user={currentUser} />;
// //     }
    
// //     if (volunteerStatus === 'rejected') {
// //       return <RejectedVolunteerDashboard />;
// //     }
    
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

// // const LoadingSpinner: React.FC = () => (
// //   <div className="loading-spinner">
// //     <div className="spinner"></div>
// //     <p>Loading reports...</p>
// //   </div>
// // );

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
// //                           <span className={`status-badge status-${getStatusClass(report.status_name)}`}>
// //                             {getStatusText(report.status_name)}
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

// // const VolunteerDashboard: React.FC<{ 
// //   user: any, 
// //   stats: any, 
// //   reports: Report[],
// //   reportsLoading: boolean,
// //   userProfile: UserProfile | null
// // }> = ({ user, stats, reports, reportsLoading, userProfile }) => {
// //   const userId = user.user_id?.toString() || '';
  
// //   const myTasks = reports.filter(r => {
// //     return r.status_name?.toLowerCase() === 'in_progress';
// //   });
  
// //   const inProgressTask = reports.find(r => {
// //     return r.status_name?.toLowerCase() === 'in_progress';
// //   });
  
// //   const pendingTasks = reports.filter(r => r.status_name?.toLowerCase() === 'submitted');

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
// //                           <div className="pending-status">
// //                             <small>
// //                               Status: {getStatusText(task.status_name)}
// //                             </small>
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

// // const UserDashboard: React.FC<{ 
// //   user: any; 
// //   userReports: Report[]; 
// //   reportsLoading: boolean;
// //   onViewDetails: (report: Report) => void;
// //   userProfile: UserProfile | null;
// // }> = ({ user, userReports, reportsLoading, onViewDetails, userProfile }) => {
// //   const myReports = userReports.filter(report => {
// //     const reportUserId = Number(report.user_id);
// //     const currentUserId = Number(user.user_id);
// //     return reportUserId === currentUserId;
// //   });

// //   const totalReports = myReports.length;
// //   const submittedReports = myReports.filter(r => r.status_name?.toLowerCase() === 'submitted').length;
// //   const inProgressReports = myReports.filter(r => r.status_name?.toLowerCase() === 'in_progress').length;
// //   const completedReports = myReports.filter(r => r.status_name?.toLowerCase() === 'completed').length;
// //   const userPhone = userProfile?.phone;

// //   return (
// //     <div className="dashboard-wrapper animate-fade-in">
// //       <div className="user-dashboard">
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
// //               <p className="stat-card-label">Submitted</p>
// //             </div>
// //           </div>
// //         </div>

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
// //               <>
// //                 <div className="reports-grid">
// //                   {myReports.slice(0, 3).map(report => {
// //                     const statusText = getStatusText(report.status_name);
// //                     const statusClass = getStatusClass(report.status_name);
                    
// //                     return (
// //                       <div key={report.report_id} className="report-grid-card">
// //                         <div className="report-grid-header">
// //                           <div className="report-grid-animal">
// //                             <span className="animal-grid-emoji">{getAnimalEmoji(report.animal_type)}</span>
// //                             <div>
// //                               <h4 className="animal-grid-type">{report.animal_type || 'Unknown Animal'}</h4>
// //                               <span className="condition-grid-badge">{report.animal_condition || 'Unknown'}</span>
// //                             </div>
// //                           </div>
// //                           <span className={`status-grid-badge status-${statusClass}`}>
// //                             {statusText}
// //                           </span>
// //                         </div>
                        
// //                         <div className="report-grid-body">
// //                           <p className="report-grid-description">
// //                             {report.description?.length > 100 
// //                               ? `${report.description.substring(0, 100)}...` 
// //                               : report.description}
// //                           </p>
                          
// //                           <div className="report-grid-info">
// //                             <div className="report-grid-location">
// //                               <span className="grid-location-icon">📍</span>
// //                               <span className="grid-location-text">
// //                                 {report.location_address?.length > 30 
// //                                   ? `${report.location_address.substring(0, 30)}...` 
// //                                   : report.location_address}
// //                               </span>
// //                             </div>
                            
// //                             <div className="report-grid-date">
// //                               <span className="grid-date-icon">📅</span>
// //                               <span className="grid-date-text">
// //                                 {new Date(report.submitted_at).toLocaleDateString('en-US', {
// //                                   month: 'short',
// //                                   day: 'numeric'
// //                                 })}
// //                               </span>
// //                             </div>
// //                           </div>
// //                         </div>
                        
// //                         <div className="report-grid-footer">
// //                           <button 
// //                             className="report-grid-details-link"
// //                             onClick={() => onViewDetails(report)}
// //                           >
// //                             View Details →
// //                           </button>
// //                         </div>
// //                       </div>
// //                     );
// //                   })}
// //                 </div>
                
// //                 {myReports.length === 0 && (
// //                   <div className="no-reports-grid-message">
// //                     <div className="no-reports-grid-icon">📝</div>
// //                     <h4 className="no-reports-grid-title">No Reports Yet</h4>
// //                     <p className="no-reports-grid-text">
// //                       You haven't filed any animal rescue reports yet.
// //                     </p>
// //                     <Link to="/create-report" className="no-reports-grid-btn">
// //                       File Your First Report
// //                     </Link>
// //                   </div>
// //                 )}
// //               </>
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
            
// //             {myReports.length > 3 && (
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
//   status_name: string;
//   is_deleted?: number;
//   reporter_name?: string;
//   reporter_phone?: string;
//   volunteer_name?: string;
//   volunteer_id?: number;
//   task_id?: number;
//   task_status_id?: number;
//   task_status?: string;
//   assigned_at?: string;
//   started_at?: string;
//   completed_at?: string;
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
  
//   const formattedName = statusName
//     .replace(/_/g, ' ')
//     .split(' ')
//     .map(word => word.charAt(0).toUpperCase() + word.slice(1))
//     .join(' ');
  
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

//   const reporterName = report.reporter_name || userName;
//   const phoneNumber = report.reporter_phone || userPhone;
//   const isEditable = report.status_name?.toLowerCase() === 'submitted';

//   const hasPhone = (phone?: string | null): boolean => {
//     if (phone === null || phone === undefined) return false;
//     if (typeof phone !== 'string') return false;
//     return phone.trim().length > 0;
//   };

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

//           <div className="modal-section">
//             <h4 className="modal-section-title">
//               <span className="section-icon">📝</span>
//               Description
//             </h4>
//             <div className="description-card">
//               <p className="description-text">{report.description}</p>
//             </div>
//           </div>

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

//   useEffect(() => {
//     const fetchUserReports = async () => {
//       if (!currentUser) return;
      
//       try {
//         setReportsLoading(true);
//         const token = localStorage.getItem('token');
        
//         const response = await fetch('http://localhost:5000/api/reports/my-reports', {
//           headers: {
//             'Authorization': `Bearer ${token}`,
//             'Content-Type': 'application/json'
//           }
//         });
        
//         if (response.ok) {
//           const data = await response.json();
//           if (data.success) {
//             const reportsData = data.data || [];
//             const reportsWithUserInfo = reportsData.map((report: Report) => ({
//               ...report,
//               reporter_name: userProfile?.username || currentUser.username,
//               reporter_phone: userProfile?.phone || ''
//             }));
//             setUserReports(reportsWithUserInfo);
//           }
//         }
//       } catch (error) {
//         console.error('Error fetching reports:', error);
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

//   const renderDashboard = () => {
//     if (userRole === 'admin') {
//       return <AdminDashboard 
//         stats={stats} 
//         reports={userReports} 
//         reportsLoading={reportsLoading} 
//       />;
//     }
    
//     if (userRole === 'volunteer') {
//       return <VolunteerDashboard 
//         user={{...currentUser, role: userRole}} 
//         stats={stats} 
//         reports={userReports}
//         reportsLoading={reportsLoading}
//         userProfile={userProfile}
//       />;
//     }
    
//     if (volunteerStatus === 'pending') {
//       return <PendingVolunteerDashboard user={currentUser} />;
//     }
    
//     if (volunteerStatus === 'rejected') {
//       return <RejectedVolunteerDashboard />;
//     }
    
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

// const LoadingSpinner: React.FC = () => (
//   <div className="loading-spinner">
//     <div className="spinner"></div>
//     <p>Loading reports...</p>
//   </div>
// );

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

// /* ===========================================
//    ✅ UPDATED VOLUNTEER DASHBOARD
//    Shows active mission with Accept/Decline buttons
//    Uses task_statuses from database
// =========================================== */
// const VolunteerDashboard: React.FC<{ 
//   user: any, 
//   stats: any, 
//   reports: Report[],
//   reportsLoading: boolean,
//   userProfile: UserProfile | null
// }> = ({ user, stats, reports, reportsLoading, userProfile }) => {
//   const [activeMission, setActiveMission] = useState<Report | null>(null);
//   const [missionLoading, setMissionLoading] = useState(true);
//   const [fetchError, setFetchError] = useState<string | null>(null);
//   const [actionLoading, setActionLoading] = useState(false);
  
//   // ✅ Fetch ONLY the active mission for this volunteer
//   useEffect(() => {
//     const fetchActiveMission = async () => {
//       if (!user?.user_id) return;
      
//       try {
//         setMissionLoading(true);
//         setFetchError(null);
//         const token = localStorage.getItem('token');
        
//         if (!token) {
//           setFetchError('No authentication token');
//           return;
//         }

//         console.log(`🎯 Fetching active mission for volunteer ${user.user_id}...`);
        
//         const response = await fetch(
//           `http://localhost:5000/api/volunteers/${user.user_id}/active-mission`,
//           {
//             method: 'GET',
//             headers: {
//               'Authorization': `Bearer ${token}`,
//               'Content-Type': 'application/json'
//             }
//           }
//         );
        
//         if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
        
//         const data = await response.json();
        
//         if (data.success && data.data) {
//           setActiveMission(data.data);
//           console.log('✅ Active mission loaded:', data.data.report_id);
//         } else {
//           setActiveMission(null);
//         }
//       } catch (error) {
//         console.error('❌ Error fetching active mission:', error);
//         setFetchError(error instanceof Error ? error.message : 'Unknown error');
//         setActiveMission(null);
//       } finally {
//         setMissionLoading(false);
//       }
//     };
    
//     fetchActiveMission();
//   }, [user?.user_id]);

//   // ✅ Handle Accept Task
//   const handleAcceptTask = async () => {
//     if (!activeMission?.task_id) return;
    
//     try {
//       setActionLoading(true);
//       const token = localStorage.getItem('token');
      
//       const response = await fetch(
//         `http://localhost:5000/api/volunteers/tasks/${activeMission.task_id}/accept`,
//         {
//           method: 'PATCH',
//           headers: {
//             'Authorization': `Bearer ${token}`,
//             'Content-Type': 'application/json'
//           }
//         }
//       );
      
//       const data = await response.json();
      
//       if (data.success) {
//         // Update the mission status to in_progress
//         setActiveMission(prev => prev ? {
//           ...prev,
//           task_status_id: 2,
//           task_status: 'in_progress',
//           started_at: new Date().toISOString()
//         } : null);
//         alert('✅ Task accepted successfully!');
//       } else {
//         alert('❌ Failed to accept task: ' + data.message);
//       }
//     } catch (error) {
//       console.error('Error accepting task:', error);
//       alert('❌ Failed to accept task');
//     } finally {
//       setActionLoading(false);
//     }
//   };

//   // ✅ Handle Decline Task
//   const handleDeclineTask = async () => {
//     if (!activeMission?.task_id) return;
    
//     const reason = prompt('Please provide a reason for declining this task:', '');
//     if (reason === null) return; // User cancelled
    
//     try {
//       setActionLoading(true);
//       const token = localStorage.getItem('token');
      
//       const response = await fetch(
//         `http://localhost:5000/api/volunteers/tasks/${activeMission.task_id}/decline`,
//         {
//           method: 'PATCH',
//           headers: {
//             'Authorization': `Bearer ${token}`,
//             'Content-Type': 'application/json'
//           },
//           body: JSON.stringify({ reason })
//         }
//       );
      
//       const data = await response.json();
      
//       if (data.success) {
//         // Remove the mission from dashboard
//         setActiveMission(null);
//         alert('✅ Task declined successfully');
//       } else {
//         alert('❌ Failed to decline task: ' + data.message);
//       }
//     } catch (error) {
//       console.error('Error declining task:', error);
//       alert('❌ Failed to decline task');
//     } finally {
//       setActionLoading(false);
//     }
//   };

//   // ✅ Get task status badge color based on task status (with safe check)
//   const getTaskStatusBadge = (statusId: number | undefined): { text: string; class: string } => {
//     switch(statusId) {
//       case 1: return { text: 'ASSIGNED', class: 'status-assigned' };
//       case 2: return { text: 'IN PROGRESS', class: 'status-progress' };
//       case 3: return { text: 'COMPLETED', class: 'status-completed' };
//       case 4: return { text: 'DECLINED', class: 'status-declined' };
//       default: return { text: 'UNKNOWN', class: 'status-unknown' };
//     }
//   };

//   return (
//     <div className="dashboard-wrapper animate-fade-in">
//       <div className="volunteer-dashboard">
//         {/* Header Section */}
//         <div className="volunteer-header-grid">
//           <div className="volunteer-welcome-card">
//             <div className="volunteer-welcome-paw">
//               🐾
//             </div>
//             <h2 className="volunteer-welcome-title">
//               Welcome back, Operative {user.username}
//             </h2>
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

//         {/* ✅ Active Mission Section */}
//         <div className="mission-section">
//           <h3 className="section-header">
//             📻 Your Active Mission
//           </h3>
          
//           {missionLoading || reportsLoading ? (
//             <div className="single-mission-container">
//               <div className="square-mission-card empty">
//                 <div className="square-card-content centered">
//                   <div className="no-mission-icon">⏰</div>
//                   <h4 className="no-mission-title">Loading Mission...</h4>
//                   <p className="no-mission-text">Fetching your assignment from the database...</p>
//                 </div>
//               </div>
//             </div>
//           ) : fetchError ? (
//             <div className="single-mission-container">
//               <div className="square-mission-card empty">
//                 <div className="square-card-content centered">
//                   <div className="no-mission-icon">❌</div>
//                   <h4 className="no-mission-title">Error Loading Mission</h4>
//                   <p className="no-mission-text">{fetchError}</p>
//                   <button onClick={() => window.location.reload()} className="square-action-btn primary">
//                     Retry
//                   </button>
//                 </div>
//               </div>
//             </div>
//           ) : activeMission ? (
//             <div className="single-mission-container">
//               <div className="square-mission-card active">
//                 <div className="square-card-header">
//                   <div className="square-status-badge in-field">
//                     {activeMission.task_status_id === 2 ? 'IN PROGRESS' : 'ASSIGNED'}
//                   </div>
//                   <div className="square-volunteer-tag">{user.username?.toUpperCase()}</div>
//                 </div>
                
//                 <div className="square-card-content">
//                   <div className="square-mission-title">
//                     <h4 className="square-title">
//                       {activeMission.animal_type || 'Animal'} Rescue Mission
//                     </h4>
//                     <span className="square-condition critical">
//                       {activeMission.animal_condition || 'CRITICAL'}
//                     </span>
//                   </div>
                  
//                   <div className="square-location">
//                     📍
//                     <span className="location-text">
//                       {activeMission.location_address || 'Location not specified'}
//                     </span>
//                   </div>
                  
//                   {/* Reporter Contact Info */}
//                   <div className="square-reporter-info">
//                     <div className="reporter-name">
//                       <span className="reporter-icon-small">👤</span>
//                       {activeMission.reporter_name || 'Anonymous'}
//                     </div>
//                     {activeMission.reporter_phone && 
//                      activeMission.reporter_phone !== 'No phone' && 
//                      activeMission.reporter_phone.trim() !== '' && (
//                       <div className="reporter-phone">
//                         <span className="phone-icon-small">📱</span>
//                         {activeMission.reporter_phone}
//                       </div>
//                     )}
//                   </div>
                  
//                   <p className="square-description">
//                     {activeMission.description?.length > 120 
//                       ? `${activeMission.description.substring(0, 120)}...` 
//                       : activeMission.description || 'No description provided'}
//                   </p>
                  
//                   {/* ✅ Action Buttons - Show different based on task status */}
//                   <div className="square-actions">
//                     {activeMission.task_status_id === 1 ? (
//                       // Task is ASSIGNED - Show Accept/Decline buttons
//                       <div className="action-buttons-group">
//                         <button 
//                           onClick={handleAcceptTask}
//                           disabled={actionLoading}
//                           className="square-action-btn accept-btn"
//                         >
//                           {actionLoading ? 'Processing...' : '✅ Accept Mission'}
//                         </button>
//                         <button 
//                           onClick={handleDeclineTask}
//                           disabled={actionLoading}
//                           className="square-action-btn decline-btn"
//                         >
//                           {actionLoading ? 'Processing...' : '❌ Decline Mission'}
//                         </button>
//                       </div>
//                     ) : activeMission.task_status_id === 2 ? (
//                       // Task is IN PROGRESS - Show Update button
//                       <Link 
//                         to={`/tasks/${activeMission.task_id}`}
//                         className="square-action-btn primary"
//                       >
//                         Update Mission Report →
//                       </Link>
//                     ) : null}
//                   </div>

//                   {/* ✅ Task Status Footer - WITH SAFE CHECK for undefined */}
//                   <div className="task-status-footer">
//                     {activeMission.task_status_id ? (
//                       <>
//                         <span className={`task-status-badge ${getTaskStatusBadge(activeMission.task_status_id).class}`}>
//                           {getTaskStatusBadge(activeMission.task_status_id).text}
//                         </span>
//                         {activeMission.assigned_at && (
//                           <span className="assigned-date">
//                             Assigned: {new Date(activeMission.assigned_at).toLocaleDateString()}
//                           </span>
//                         )}
//                       </>
//                     ) : (
//                       <span className="task-status-badge status-unknown">UNKNOWN</span>
//                     )}
//                   </div>
//                 </div>
//               </div>
//             </div>
//           ) : (
//             <div className="single-mission-container">
//               <div className="square-mission-card empty">
//                 <div className="square-card-content centered">
//                   <div className="no-mission-icon">🎯</div>
//                   <h4 className="no-mission-title">No Active Mission</h4>
//                   <p className="no-mission-text">
//                     You don't have any assigned rescue missions at the moment.
//                   </p>
//                   <Link to="/tasks" className="square-action-btn primary">
//                     Browse Available Missions
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
//         <div className="pending-icon">⏰</div>
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

// const UserDashboard: React.FC<{ 
//   user: any; 
//   userReports: Report[]; 
//   reportsLoading: boolean;
//   onViewDetails: (report: Report) => void;
//   userProfile: UserProfile | null;
// }> = ({ user, userReports, reportsLoading, onViewDetails, userProfile }) => {
//   const myReports = userReports.filter(report => {
//     const reportUserId = Number(report.user_id);
//     const currentUserId = Number(user.user_id);
//     return reportUserId === currentUserId;
//   });

//   const totalReports = myReports.length;
//   const submittedReports = myReports.filter(r => r.status_name?.toLowerCase() === 'submitted').length;
//   const inProgressReports = myReports.filter(r => r.status_name?.toLowerCase() === 'in_progress').length;
//   const completedReports = myReports.filter(r => r.status_name?.toLowerCase() === 'completed').length;
//   const userPhone = userProfile?.phone;

//   return (
//     <div className="dashboard-wrapper animate-fade-in">
//       <div className="user-dashboard">
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

//         <div className="user-stats-grid">
//           <div className="user-stat-card">
//             <div className="stat-card-icon total-reports">📄</div>
//             <div className="stat-card-content">
//               <h3 className="stat-card-value">{totalReports}</h3>
//               <p className="stat-card-label">Total Reports</p>
//             </div>
//           </div>
          
//           <div className="user-stat-card">
//             <div className="stat-card-icon in-progress">⏳</div>
//             <div className="stat-card-content">
//               <h3 className="stat-card-value">{inProgressReports}</h3>
//               <p className="stat-card-label">In Progress</p>
//             </div>
//           </div>
          
//           <div className="user-stat-card">
//             <div className="stat-card-icon completed">✓</div>
//             <div className="stat-card-content">
//               <h3 className="stat-card-value">{completedReports}</h3>
//               <p className="stat-card-label">Completed</p>
//             </div>
//           </div>
          
//           <div className="user-stat-card">
//             <div className="stat-card-icon waiting">⏰</div>
//             <div className="stat-card-content">
//               <h3 className="stat-card-value">{submittedReports}</h3>
//               <p className="stat-card-label">Submitted</p>
//             </div>
//           </div>
//         </div>

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
//               <>
//                 <div className="reports-grid">
//                   {myReports.slice(0, 3).map(report => {
//                     const statusText = getStatusText(report.status_name);
//                     const statusClass = getStatusClass(report.status_name);
                    
//                     return (
//                       <div key={report.report_id} className="report-grid-card">
//                         <div className="report-grid-header">
//                           <div className="report-grid-animal">
//                             <span className="animal-grid-emoji">{getAnimalEmoji(report.animal_type)}</span>
//                             <div>
//                               <h4 className="animal-grid-type">{report.animal_type || 'Unknown Animal'}</h4>
//                               <span className="condition-grid-badge">{report.animal_condition || 'Unknown'}</span>
//                             </div>
//                           </div>
//                           <span className={`status-grid-badge status-${statusClass}`}>
//                             {statusText}
//                           </span>
//                         </div>
                        
//                         <div className="report-grid-body">
//                           <p className="report-grid-description">
//                             {report.description?.length > 100 
//                               ? `${report.description.substring(0, 100)}...` 
//                               : report.description}
//                           </p>
                          
//                           <div className="report-grid-info">
//                             <div className="report-grid-location">
//                               <span className="grid-location-icon">📍</span>
//                               <span className="grid-location-text">
//                                 {report.location_address?.length > 30 
//                                   ? `${report.location_address.substring(0, 30)}...` 
//                                   : report.location_address}
//                               </span>
//                             </div>
                            
//                             <div className="report-grid-date">
//                               <span className="grid-date-icon">📅</span>
//                               <span className="grid-date-text">
//                                 {new Date(report.submitted_at).toLocaleDateString('en-US', {
//                                   month: 'short',
//                                   day: 'numeric'
//                                 })}
//                               </span>
//                             </div>
//                           </div>
//                         </div>
                        
//                         <div className="report-grid-footer">
//                           <button 
//                             className="report-grid-details-link"
//                             onClick={() => onViewDetails(report)}
//                           >
//                             View Details →
//                           </button>
//                         </div>
//                       </div>
//                     );
//                   })}
//                 </div>
//               </>
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
            
//             {myReports.length > 3 && (
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
  task_id?: number;
  task_status_id?: number;
  task_status?: string;
  assigned_at?: string;
  started_at?: string;
  completed_at?: string;
  volunteer_responded_at?: string;
  volunteer_response?: string;
  declined_reason?: string;
}

// Define Task interface for volunteer tasks
interface VolunteerTask extends Report {
  task_id: number;
  task_status_id: number;
  task_status: string;
  assigned_at: string;
  started_at?: string;
  completed_at?: string;
  volunteer_responded_at?: string;
  declined_reason?: string;
}

// Define Task Proof interface
interface TaskProof {
  proof_id: number;
  task_id: number;
  proof_url: string;
  uploaded_at: string;
}

// Define Admin Note interface
interface AdminNote {
  note_id: number;
  report_id: number;
  admin_id: number;
  note_text: string;
  created_at: string;
  admin_name?: string;
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

// Format date for short display (no time)
const formatShortDate = (dateString: string): string => {
  const date = new Date(dateString);
  return date.toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric'
  });
};

// ===========================================
// ✅ DECLINE MODAL COMPONENT
// ===========================================
const DeclineModal: React.FC<{
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (reason: string) => void;
  taskId: number;
}> = ({ isOpen, onClose, onSubmit, taskId }) => {
  const [reason, setReason] = useState('');
  const [otherReason, setOtherReason] = useState('');

  if (!isOpen) return null;

  const handleSubmit = () => {
    const finalReason = reason === 'other' ? otherReason : reason;
    if (finalReason) {
      onSubmit(finalReason);
      setReason('');
      setOtherReason('');
      onClose();
    }
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={e => e.stopPropagation()}>
        <div className="modal-header">
          <div className="modal-header-left">
            <span className="modal-icon">❌</span>
            <div>
              <h3 className="modal-title">Decline Task #{taskId}</h3>
              <p className="modal-subtitle">Please provide a reason for declining</p>
            </div>
          </div>
          <button className="modal-close" onClick={onClose}>×</button>
        </div>
        
        <div className="modal-body">
          <div className="decline-info">
            <p>Your reason helps us improve our volunteer matching system.</p>
          </div>
          
          <div className="form-group">
            <label className="form-label">
              Reason <span className="required">*</span>
            </label>
            <select 
              className="form-select"
              value={reason}
              onChange={(e) => setReason(e.target.value)}
            >
              <option value="">Select a reason</option>
              <option value="Too far away">Too far away</option>
              <option value="Already have active tasks">Already have active tasks</option>
              <option value="Animal type not suitable">Animal type not suitable</option>
              <option value="Condition too severe">Condition too severe</option>
              <option value="Equipment not available">Equipment not available</option>
              <option value="other">Other (please specify)</option>
            </select>
          </div>

          {reason === 'other' && (
            <div className="form-group">
              <label className="form-label">
                Please specify <span className="required">*</span>
              </label>
              <textarea
                className="form-textarea"
                value={otherReason}
                onChange={(e) => setOtherReason(e.target.value)}
                placeholder="Enter your reason..."
                rows={3}
              />
            </div>
          )}
        </div>
        
        <div className="modal-footer">
          <button className="modal-btn secondary" onClick={onClose}>
            Cancel
          </button>
          <button 
            className="modal-btn danger" 
            onClick={handleSubmit}
            disabled={!reason || (reason === 'other' && !otherReason)}
          >
            Decline Task
          </button>
        </div>
      </div>
    </div>
  );
};

// ===========================================
// ✅ COMPLETE MISSION MODAL WITH PHOTO UPLOAD
// ===========================================
const CompleteMissionModal: React.FC<{
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (files: File[], notes: string) => void;
  taskId: number;
}> = ({ isOpen, onClose, onSubmit, taskId }) => {
  const [proofFiles, setProofFiles] = useState<File[]>([]);
  const [notes, setNotes] = useState('');
  const [previewUrls, setPreviewUrls] = useState<string[]>([]);

  if (!isOpen) return null;

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const files = Array.from(e.target.files);
      setProofFiles(prev => [...prev, ...files]);
      
      // Create preview URLs
      const newPreviews = files.map(file => URL.createObjectURL(file));
      setPreviewUrls(prev => [...prev, ...newPreviews]);
    }
  };

  const removeFile = (index: number) => {
    setProofFiles(prev => prev.filter((_, i) => i !== index));
    URL.revokeObjectURL(previewUrls[index]);
    setPreviewUrls(prev => prev.filter((_, i) => i !== index));
  };

  const handleSubmit = () => {
    if (proofFiles.length === 0) {
      alert('Please upload at least one proof photo');
      return;
    }
    onSubmit(proofFiles, notes);
    // Cleanup preview URLs
    previewUrls.forEach(url => URL.revokeObjectURL(url));
    setProofFiles([]);
    setNotes('');
    setPreviewUrls([]);
    onClose();
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={e => e.stopPropagation()}>
        <div className="modal-header">
          <div className="modal-header-left">
            <span className="modal-icon">📸</span>
            <div>
              <h3 className="modal-title">Complete Mission #{taskId}</h3>
              <p className="modal-subtitle">Upload evidence of the rescue</p>
            </div>
          </div>
          <button className="modal-close" onClick={onClose}>×</button>
        </div>
        
        <div className="modal-body">
          <div className="form-group">
            <label className="form-label">
              Proof Photos <span className="required">*</span>
            </label>
            <div className="photo-upload-section">
              {previewUrls.length > 0 ? (
                <div className="photo-preview-container">
                  <div className="proofs-grid">
                    {previewUrls.map((url, index) => (
                      <div key={index} className="proof-item">
                        <img src={url} alt={`Proof ${index + 1}`} className="proof-image" />
                        <button 
                          className="remove-proof-btn"
                          onClick={() => removeFile(index)}
                        >
                          ×
                        </button>
                      </div>
                    ))}
                  </div>
                  <label className="reports-btn change-photo">
                    Add More Photos
                    <input
                      type="file"
                      accept="image/*"
                      multiple
                      onChange={handleFileChange}
                      style={{ display: 'none' }}
                    />
                  </label>
                </div>
              ) : (
                <div className="photo-upload-placeholder">
                  <span className="upload-icon">📷</span>
                  <p>Upload proof photos of the rescue</p>
                  <p className="upload-hint">This is required to complete the mission</p>
                  <label className="reports-btn primary upload-btn">
                    Choose Photos
                    <input
                      type="file"
                      accept="image/*"
                      multiple
                      onChange={handleFileChange}
                      style={{ display: 'none' }}
                    />
                  </label>
                </div>
              )}
            </div>
          </div>

          <div className="form-group">
            <label className="form-label">
              Completion Notes
            </label>
            <textarea
              className="form-textarea"
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder="Describe the rescue outcome, any challenges, and the animal's condition..."
              rows={4}
            />
          </div>
        </div>
        
        <div className="modal-footer">
          <button className="modal-btn secondary" onClick={onClose}>
            Cancel
          </button>
          <button 
            className="modal-btn primary" 
            onClick={handleSubmit}
            disabled={proofFiles.length === 0}
          >
            Complete Mission
          </button>
        </div>
      </div>
    </div>
  );
};

// ===========================================
// ✅ TASK DETAIL MODAL (for viewing mission details)
// ===========================================
const TaskDetailModal: React.FC<{
  task: VolunteerTask | null;
  isOpen: boolean;
  onClose: () => void;
  onComplete: (taskId: number) => void;
  actionLoading: boolean;
  userProfile: UserProfile | null;
}> = ({ task, isOpen, onClose, onComplete, actionLoading, userProfile }) => {
  if (!isOpen || !task) return null;

  return (
    <div className="reports-modal-overlay" onClick={onClose}>
      <div className="reports-modal-content large" onClick={e => e.stopPropagation()}>
        <div className="reports-modal-header dark">
          <div>
            <h3>Rescue Mission #{task.report_id}</h3>
            <div className="reports-modal-subheader">
              <span className="reports-status-badge in-progress">
                {task.task_status || 'IN PROGRESS'}
              </span>
              <span className="reports-meta">
                Assigned: {formatShortDate(task.assigned_at || task.submitted_at)}
              </span>
            </div>
          </div>
          <button className="reports-modal-close" onClick={onClose}>×</button>
        </div>
        
        <div className="reports-modal-body">
          <div className="reports-detail-grid">
            <div className="reports-detail-column">
              {/* Animal Information Card */}
              <div className="reports-info-card">
                <div className="reports-card-header beige">
                  <h4>🐾 Animal Information</h4>
                </div>
                <div className="reports-card-content">
                  <div className="reports-animal-display">
                    <div className="reports-animal-icon">
                      {getAnimalEmoji(task.animal_type)}
                    </div>
                    <div className="reports-animal-details">
                      <div className="reports-animal-type">{task.animal_type}</div>
                      <div className="reports-animal-condition">
                        <span className="condition-tag">{task.animal_condition}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Reporter Details Card */}
              <div className="reports-info-card">
                <div className="reports-card-header beige">
                  <h4>👤 Reporter Details</h4>
                </div>
                <div className="reports-card-content">
                  <div className="reports-detail-list">
                    <div className="reports-detail-row">
                      <span className="reports-detail-label">Name</span>
                      <span className="reports-detail-value">{task.reporter_name || 'Anonymous'}</span>
                    </div>
                    {task.reporter_phone && task.reporter_phone !== 'No phone' && (
                      <div className="reports-detail-row">
                        <span className="reports-detail-label">Phone</span>
                        <span className="reports-detail-value">{task.reporter_phone}</span>
                      </div>
                    )}
                  </div>
                </div>
              </div>

              {/* Location Card */}
              <div className="reports-info-card">
                <div className="reports-card-header beige">
                  <h4>📍 Location</h4>
                </div>
                <div className="reports-card-content">
                  <div className="reports-location-info">
                    <p>{task.location_address}</p>
                    <button 
                      className="reports-btn map"
                      onClick={() => {
                        const encodedAddress = encodeURIComponent(task.location_address);
                        window.open(`https://maps.google.com/?q=${encodedAddress}`, '_blank');
                      }}
                    >
                      View on Map
                    </button>
                  </div>
                </div>
              </div>
            </div>

            <div className="reports-detail-column">
              {/* Description Card */}
              <div className="reports-info-card">
                <div className="reports-card-header beige">
                  <h4>📝 Mission Description</h4>
                </div>
                <div className="reports-card-content">
                  <div className="reports-description">
                    <p>{task.description}</p>
                  </div>
                  {task.user_note && (
                    <div className="reports-user-note">
                      <div className="note-label">Reporter's Note:</div>
                      <p>{task.user_note}</p>
                    </div>
                  )}
                </div>
              </div>

              {/* Timeline Card */}
              <div className="reports-info-card">
                <div className="reports-card-header beige">
                  <h4>⏱️ Timeline</h4>
                </div>
                <div className="reports-card-content">
                  <div className="timeline-list">
                    <div className="timeline-item">
                      <div className="timeline-dot"></div>
                      <div className="timeline-content">
                        <span className="timeline-label">Reported</span>
                        <span className="timeline-date">{formatDate(task.submitted_at)}</span>
                      </div>
                    </div>
                    {task.assigned_at && (
                      <div className="timeline-item">
                        <div className="timeline-dot"></div>
                        <div className="timeline-content">
                          <span className="timeline-label">Assigned</span>
                          <span className="timeline-date">{formatDate(task.assigned_at)}</span>
                        </div>
                      </div>
                    )}
                    {task.started_at && (
                      <div className="timeline-item">
                        <div className="timeline-dot"></div>
                        <div className="timeline-content">
                          <span className="timeline-label">Started</span>
                          <span className="timeline-date">{formatDate(task.started_at)}</span>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        <div className="reports-modal-footer">
          <button className="reports-btn secondary" onClick={onClose}>
            Close
          </button>
          {task.task_status_id === 2 && (
            <button 
              className="reports-btn complete"
              onClick={() => onComplete(task.task_id)}
              disabled={actionLoading}
            >
              {actionLoading ? 'Processing...' : '✓ Complete Mission'}
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

// ===========================================
// ✅ REPORT DETAIL MODAL FOR USER
// ===========================================
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

/* ===========================================
   ✅ REDESIGNED VOLUNTEER DASHBOARD
   - 3-column grid for active missions
   - Accept/Decline buttons for pending tasks
   - Complete button opens modal requiring photo proof
=========================================== */
const VolunteerDashboard: React.FC<{ 
  user: any, 
  stats: any, 
  reports: Report[],
  reportsLoading: boolean,
  userProfile: UserProfile | null
}> = ({ user, stats, reports, reportsLoading, userProfile }) => {
  const [activeMissions, setActiveMissions] = useState<VolunteerTask[]>([]);
  const [pendingTasks, setPendingTasks] = useState<VolunteerTask[]>([]);
  const [missionsLoading, setMissionsLoading] = useState(true);
  const [fetchError, setFetchError] = useState<string | null>(null);
  const [actionLoading, setActionLoading] = useState(false);
  const [showAllActive, setShowAllActive] = useState(false);
  const [showAllPending, setShowAllPending] = useState(false);
  const [selectedTask, setSelectedTask] = useState<VolunteerTask | null>(null);
  const [isTaskModalOpen, setIsTaskModalOpen] = useState(false);
  const [isDeclineModalOpen, setIsDeclineModalOpen] = useState(false);
  const [isCompleteModalOpen, setIsCompleteModalOpen] = useState(false);
  const [selectedTaskId, setSelectedTaskId] = useState<number | null>(null);
  const [completedTasksCount, setCompletedTasksCount] = useState(0);
  
  // Fetch all tasks for this volunteer
  useEffect(() => {
    const fetchAllTasks = async () => {
      if (!user?.user_id) return;
      
      try {
        setMissionsLoading(true);
        setFetchError(null);
        const token = localStorage.getItem('token');
        
        if (!token) {
          setFetchError('No authentication token');
          return;
        }

        console.log(`🎯 Fetching all tasks for volunteer ${user.user_id}...`);
        
        const response = await fetch(
          `http://localhost:5000/api/volunteers/tasks`,
          {
            method: 'GET',
            headers: {
              'Authorization': `Bearer ${token}`,
              'Content-Type': 'application/json'
            }
          }
        );
        
        if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
        
        const data = await response.json();
        
        if (data.success && data.data) {
          // Separate tasks by status
          const assigned = data.data.filter((t: VolunteerTask) => t.task_status_id === 1);
          const inProgress = data.data.filter((t: VolunteerTask) => t.task_status_id === 2);
          const completed = data.data.filter((t: VolunteerTask) => t.task_status_id === 3);
          
          setPendingTasks(assigned);
          setActiveMissions(inProgress);
          setCompletedTasksCount(completed.length);
          
          console.log(`✅ Loaded: ${assigned.length} pending, ${inProgress.length} active, ${completed.length} completed`);
        } else {
          setPendingTasks([]);
          setActiveMissions([]);
        }
      } catch (error) {
        console.error('❌ Error fetching tasks:', error);
        setFetchError(error instanceof Error ? error.message : 'Unknown error');
        setPendingTasks([]);
        setActiveMissions([]);
      } finally {
        setMissionsLoading(false);
      }
    };
    
    fetchAllTasks();
  }, [user?.user_id]);

  // Handle Accept Task
  const handleAcceptTask = async (taskId: number) => {
    try {
      setActionLoading(true);
      const token = localStorage.getItem('token');
      
      const response = await fetch(
        `http://localhost:5000/api/volunteers/tasks/${taskId}/accept`,
        {
          method: 'PATCH',
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
          }
        }
      );
      
      const data = await response.json();
      
      if (data.success) {
        // Find the accepted task
        const acceptedTask = pendingTasks.find(t => t.task_id === taskId);
        if (acceptedTask) {
          // Update to in_progress
          const updatedTask = {
            ...acceptedTask,
            task_status_id: 2,
            task_status: 'in_progress',
            started_at: new Date().toISOString()
          };
          // Remove from pending, add to active
          setPendingTasks(prev => prev.filter(t => t.task_id !== taskId));
          setActiveMissions(prev => [...prev, updatedTask]);
        }
        alert('✅ Task accepted successfully!');
      } else {
        alert('❌ Failed to accept task: ' + data.message);
      }
    } catch (error) {
      console.error('Error accepting task:', error);
      alert('❌ Failed to accept task');
    } finally {
      setActionLoading(false);
    }
  };

  // Handle Decline Task
  const handleDeclineTask = async (taskId: number, reason: string) => {
    try {
      setActionLoading(true);
      const token = localStorage.getItem('token');
      
      const response = await fetch(
        `http://localhost:5000/api/volunteers/tasks/${taskId}/decline`,
        {
          method: 'PATCH',
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ reason })
        }
      );
      
      const data = await response.json();
      
      if (data.success) {
        // Remove from pending tasks
        setPendingTasks(prev => prev.filter(t => t.task_id !== taskId));
        alert('✅ Task declined successfully');
      } else {
        alert('❌ Failed to decline task: ' + data.message);
      }
    } catch (error) {
      console.error('Error declining task:', error);
      alert('❌ Failed to decline task');
    } finally {
      setActionLoading(false);
      setIsDeclineModalOpen(false);
      setSelectedTaskId(null);
    }
  };

  // Handle Complete Task (with photo proof)
  const handleCompleteTask = async (taskId: number, files: File[], notes: string) => {
    try {
      setActionLoading(true);
      const token = localStorage.getItem('token');
      
      // First upload proofs
      const formData = new FormData();
      files.forEach((file) => {
        formData.append('proofs', file);
      });
      formData.append('notes', notes);
      
      const uploadResponse = await fetch(
        `http://localhost:5000/api/tasks/${taskId}/upload-proofs`,
        {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${token}`
          },
          body: formData
        }
      );
      
      const uploadData = await uploadResponse.json();
      
      if (!uploadData.success) {
        alert('❌ Failed to upload proofs: ' + uploadData.message);
        return;
      }
      
      // Then complete the task
      const completeResponse = await fetch(
        `http://localhost:5000/api/volunteers/tasks/${taskId}/complete`,
        {
          method: 'PATCH',
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
          }
        }
      );
      
      const completeData = await completeResponse.json();
      
      if (completeData.success) {
        // Remove from active missions
        setActiveMissions(prev => prev.filter(t => t.task_id !== taskId));
        setCompletedTasksCount(prev => prev + 1);
        setIsTaskModalOpen(false);
        setSelectedTask(null);
        alert('✅ Mission completed successfully! Thank you for your service!');
      } else {
        alert('❌ Failed to complete mission: ' + completeData.message);
      }
    } catch (error) {
      console.error('Error completing task:', error);
      alert('❌ Failed to complete mission');
    } finally {
      setActionLoading(false);
      setIsCompleteModalOpen(false);
      setSelectedTaskId(null);
    }
  };

  // Handle View Task Details
  const handleViewTaskDetails = (task: VolunteerTask) => {
    setSelectedTask(task);
    setIsTaskModalOpen(true);
  };

  // Handle Upload Proof (from modal)
  const handleUploadProof = (taskId: number) => {
    setSelectedTaskId(taskId);
    setIsCompleteModalOpen(true);
  };

  // Determine which missions to display
  const displayedActiveMissions = showAllActive ? activeMissions : activeMissions.slice(0, 3);
  const displayedPendingTasks = showAllPending ? pendingTasks : pendingTasks.slice(0, 3);

  // Get task status badge
  const getTaskStatusBadge = (statusId: number | undefined): { text: string; class: string } => {
    switch(statusId) {
      case 1: return { text: 'ASSIGNED', class: 'assigned' };
      case 2: return { text: 'IN PROGRESS', class: 'progress' };
      case 3: return { text: 'COMPLETED', class: 'completed' };
      case 4: return { text: 'DECLINED', class: 'declined' };
      default: return { text: 'UNKNOWN', class: 'unknown' };
    }
  };

  // Calculate total active missions count
  const totalActiveMissions = activeMissions.length + pendingTasks.length;

  return (
    <div className="dashboard-wrapper animate-fade-in">
      <div className="volunteer-dashboard-new" style={{ maxWidth: '1200px', margin: '0 auto' }}>
        
        {/* ===== WELCOME SECTION ===== */}
        <div className="reports-header" style={{ marginBottom: '2rem' }}>
          <div className="reports-header-content">
            <h1 className="reports-title">Welcome back, Ranger {user.username}!</h1>
            <p className="reports-subtitle">
              Your dedication saves lives. Ready for your next mission?
            </p>
            {userProfile?.phone && (
              <div style={{ marginTop: '0.5rem', display: 'flex', alignItems: 'center', gap: '8px' }}>
                <span style={{ fontSize: '1.1rem' }}>📱</span>
                <span style={{ color: '#2D5A27', fontWeight: '500' }}>Contact: {userProfile.phone}</span>
              </div>
            )}
          </div>
          <div className="reports-header-actions">
            <Link to="/tasks" className="reports-btn refresh">
              <span className="btn-icon">📋</span>
              Mission Board
            </Link>
            <Link to="/profile" className="reports-btn refresh">
              <span className="btn-icon">🏆</span>
              My Profile
            </Link>
          </div>
        </div>

        {/* ===== STATS CARDS - HORIZONTAL LAYOUT ===== */}
        <div className="reports-filters-card" style={{ marginBottom: '2rem', padding: '1.5rem' }}>
          <div style={{ 
            display: 'grid', 
            gridTemplateColumns: 'repeat(4, 1fr)', 
            gap: '1.5rem'
          }}>
            {/* Total Rescues */}
            <div style={{ 
              background: 'linear-gradient(135deg, #2D5A27 0%, #1e3f1a 100%)',
              borderRadius: '12px',
              padding: '1.25rem',
              color: 'white'
            }}>
              <div style={{ fontSize: '0.85rem', opacity: '0.9', marginBottom: '0.5rem' }}>TOTAL RESCUES</div>
              <div style={{ fontSize: '2.5rem', fontWeight: '700', lineHeight: '1' }}>
                {completedTasksCount}
              </div>
              <div style={{ fontSize: '0.8rem', opacity: '0.8', marginTop: '0.5rem' }}>Lives Saved ✓</div>
            </div>

            {/* Active Missions */}
            <div style={{ 
              background: 'linear-gradient(135deg, #1976D2 0%, #0D47A1 100%)',
              borderRadius: '12px',
              padding: '1.25rem',
              color: 'white'
            }}>
              <div style={{ fontSize: '0.85rem', opacity: '0.9', marginBottom: '0.5rem' }}>ACTIVE MISSIONS</div>
              <div style={{ fontSize: '2.5rem', fontWeight: '700', lineHeight: '1' }}>
                {activeMissions.length}
              </div>
              <div style={{ fontSize: '0.8rem', opacity: '0.8', marginTop: '0.5rem' }}>In Progress 🎯</div>
            </div>

            {/* Pending Confirmations */}
            <div style={{ 
              background: 'linear-gradient(135deg, #FF9F1C 0%, #E65100 100%)',
              borderRadius: '12px',
              padding: '1.25rem',
              color: 'white'
            }}>
              <div style={{ fontSize: '0.85rem', opacity: '0.9', marginBottom: '0.5rem' }}>PENDING</div>
              <div style={{ fontSize: '2.5rem', fontWeight: '700', lineHeight: '1' }}>
                {pendingTasks.length}
              </div>
              <div style={{ fontSize: '0.8rem', opacity: '0.8', marginTop: '0.5rem' }}>Awaiting Decision ⏳</div>
            </div>

            {/* Success Rate */}
            <div style={{ 
              background: 'linear-gradient(135deg, #7D8C5A 0%, #5A6B3E 100%)',
              borderRadius: '12px',
              padding: '1.25rem',
              color: 'white'
            }}>
              <div style={{ fontSize: '0.85rem', opacity: '0.9', marginBottom: '0.5rem' }}>SUCCESS RATE</div>
              <div style={{ fontSize: '2.5rem', fontWeight: '700', lineHeight: '1' }}>
                {completedTasksCount + activeMissions.length > 0 
                  ? Math.round((completedTasksCount / (completedTasksCount + activeMissions.length)) * 100) 
                  : 0}%
              </div>
              <div style={{ fontSize: '0.8rem', opacity: '0.8', marginTop: '0.5rem' }}>Mission Success</div>
            </div>
          </div>
        </div>

        {/* ===== PENDING TASKS SECTION (AWAITING ACCEPT/DECLINE) ===== */}
        {pendingTasks.length > 0 && (
          <div className="reports-section" style={{ marginBottom: '2.5rem' }}>
            <div className="reports-header">
              <h2 className="reports-title" style={{ fontSize: '1.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <span>⏳</span> Pending Confirmation ({pendingTasks.length})
              </h2>
              {pendingTasks.length > 3 && (
                <button 
                  onClick={() => setShowAllPending(!showAllPending)}
                  className="view-all-link"
                >
                  {showAllPending ? 'Show Less ↑' : `View All (${pendingTasks.length}) →`}
                </button>
              )}
            </div>
            
            <div className="reports-grid" style={{ gridTemplateColumns: 'repeat(3, 1fr)' }}>
              {displayedPendingTasks.map((task) => {
                const statusBadge = getTaskStatusBadge(task.task_status_id);
                
                return (
                  <div key={task.task_id} className="reports-card">
                    <div className="reports-card-header" style={{ background: '#FF9F1C' }}>
                      <div className="reports-card-title">
                        <span className="reports-id" style={{ background: 'rgba(255,255,255,0.2)', color: 'white' }}>
                          #{task.report_id}
                        </span>
                        <span className="reports-status" style={{ background: 'rgba(255,255,255,0.2)', color: 'white' }}>
                          {statusBadge.text}
                        </span>
                      </div>
                      <div className="reports-date" style={{ color: 'rgba(255,255,255,0.9)' }}>
                        {formatShortDate(task.submitted_at)}
                      </div>
                    </div>

                    <div className="reports-card-body">
                      <div className="reports-animal-section">
                        <div className="reports-animal-icon large">
                          {getAnimalEmoji(task.animal_type)}
                        </div>
                        <div className="reports-animal-info">
                          <h4>{task.animal_type}</h4>
                          <span className="reports-condition">{task.animal_condition}</span>
                        </div>
                      </div>

                      <div className="reports-location-section">
                        <span className="location-icon">📍</span>
                        <span className="location-text">{task.location_address}</span>
                      </div>

                      <div className="reports-volunteer-section">
                        <div className="reports-assigned-ranger" style={{ background: '#fef2e8' }}>
                          <div className="ranger-avatar" style={{ background: '#E65100' }}>
                            {task.reporter_name?.charAt(0).toUpperCase() || '?'}
                          </div>
                          <div className="ranger-info">
                            <span className="ranger-name">{task.reporter_name || 'Anonymous'}</span>
                            <span className="ranger-role">Reporter</span>
                            {task.reporter_phone && task.reporter_phone !== 'No phone' && (
                              <span className="ranger-phone" style={{ fontSize: '0.75rem', color: '#E65100' }}>
                                📱 {task.reporter_phone}
                              </span>
                            )}
                          </div>
                        </div>
                      </div>
                      
                      <p className="reports-description" style={{ 
                        fontSize: '0.85rem', 
                        marginBottom: '0.5rem',
                        color: '#666'
                      }}>
                        {task.description?.length > 80 
                          ? `${task.description.substring(0, 80)}...` 
                          : task.description || 'No description provided'}
                      </p>
                    </div>

                    <div className="reports-card-footer">
                      <div style={{ display: 'flex', gap: '0.75rem' }}>
                        <button 
                          onClick={() => handleAcceptTask(task.task_id!)}
                          disabled={actionLoading}
                          className="reports-btn"
                          style={{ 
                            flex: 2,
                            background: '#2e7d32',
                            color: 'white',
                            padding: '0.6rem',
                            fontSize: '0.85rem',
                            fontWeight: '600',
                            border: 'none',
                            borderRadius: '4px',
                            cursor: actionLoading ? 'not-allowed' : 'pointer'
                          }}
                        >
                          {actionLoading ? '...' : '✅ Accept'}
                        </button>
                        <button 
                          onClick={() => {
                            setSelectedTaskId(task.task_id!);
                            setIsDeclineModalOpen(true);
                          }}
                          disabled={actionLoading}
                          className="reports-btn"
                          style={{ 
                            flex: 1,
                            background: 'transparent',
                            color: '#c62828',
                            border: '1px solid #c62828',
                            padding: '0.6rem',
                            fontSize: '0.85rem',
                            fontWeight: '600',
                            borderRadius: '4px',
                            cursor: actionLoading ? 'not-allowed' : 'pointer'
                          }}
                        >
                          ❌ Decline
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* ===== ACTIVE MISSIONS SECTION ===== */}
        <div className="reports-section">
          <div className="reports-header">
            <h2 className="reports-title" style={{ fontSize: '1.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <span>📻</span> Your Active Missions ({activeMissions.length})
            </h2>
            {activeMissions.length > 3 && (
              <button 
                onClick={() => setShowAllActive(!showAllActive)}
                className="view-all-link"
              >
                {showAllActive ? 'Show Less ↑' : `View All (${activeMissions.length}) →`}
              </button>
            )}
          </div>
          
          {missionsLoading ? (
            <div className="reports-loading-container">
              <div className="reports-loader">
                <div className="reports-spinner"></div>
                <p className="reports-loader-text">Loading your missions...</p>
              </div>
            </div>
          ) : fetchError ? (
            <div className="reports-empty-state">
              <span className="empty-state-emoji">❌</span>
              <h3>Error Loading Missions</h3>
              <p>{fetchError}</p>
              <button onClick={() => window.location.reload()} className="reports-btn primary">
                Retry
              </button>
            </div>
          ) : activeMissions.length > 0 ? (
            <>
              <div className="reports-grid" style={{ gridTemplateColumns: 'repeat(3, 1fr)' }}>
                {displayedActiveMissions.map((mission) => {
                  const statusBadge = getTaskStatusBadge(mission.task_status_id);
                  
                  return (
                    <div key={mission.task_id} className="reports-card">
                      <div className="reports-card-header dark">
                        <div className="reports-card-title">
                          <span className="reports-id" style={{ background: 'rgba(255,255,255,0.2)', color: 'white' }}>
                            #{mission.report_id}
                          </span>
                          <span className="reports-status" style={{ background: 'rgba(255,255,255,0.2)', color: 'white' }}>
                            {statusBadge.text}
                          </span>
                        </div>
                        <div className="reports-volunteer-tag" style={{ color: 'white', fontSize: '0.8rem', fontWeight: '600' }}>
                          {user.username?.toUpperCase()}
                        </div>
                      </div>

                      <div className="reports-card-body">
                        <div className="reports-animal-section">
                          <div className="reports-animal-icon large">
                            {getAnimalEmoji(mission.animal_type)}
                          </div>
                          <div className="reports-animal-info">
                            <h4>{mission.animal_type || 'Animal'} Rescue</h4>
                            <span className="reports-condition" style={{ 
                              background: '#ffebee', 
                              color: '#c62828',
                              fontWeight: 'bold'
                            }}>
                              {mission.animal_condition || 'CRITICAL'}
                            </span>
                          </div>
                        </div>

                        <div className="reports-location-section">
                          <span className="location-icon">📍</span>
                          <span className="location-text">{mission.location_address || 'Location not specified'}</span>
                        </div>

                        {/* Reporter Contact Info */}
                        <div className="reports-volunteer-section">
                          <div className="reports-assigned-ranger" style={{ background: '#e8f5e9' }}>
                            <div className="ranger-avatar" style={{ background: '#2e7d32' }}>
                              {mission.reporter_name?.charAt(0).toUpperCase() || '?'}
                            </div>
                            <div className="ranger-info">
                              <span className="ranger-name">{mission.reporter_name || 'Anonymous'}</span>
                              <span className="ranger-role">Reporter</span>
                              {mission.reporter_phone && 
                               mission.reporter_phone !== 'No phone' && 
                               mission.reporter_phone.trim() !== '' && (
                                <span className="ranger-phone" style={{ fontSize: '0.75rem', color: '#2e7d32' }}>
                                  📱 {mission.reporter_phone}
                                </span>
                              )}
                            </div>
                          </div>
                        </div>
                        
                        <p className="reports-description" style={{ 
                          fontSize: '0.85rem', 
                          marginBottom: '0.5rem',
                          color: '#666'
                        }}>
                          {mission.description?.length > 100 
                            ? `${mission.description.substring(0, 100)}...` 
                            : mission.description || 'No description provided'}
                        </p>

                        {/* Task Status Footer */}
                        <div style={{ 
                          display: 'flex', 
                          justifyContent: 'space-between',
                          alignItems: 'center',
                          fontSize: '0.7rem',
                          color: '#888',
                          marginTop: '0.5rem',
                          paddingTop: '0.5rem',
                          borderTop: '1px solid #e8dfc9'
                        }}>
                          <span style={{ 
                            padding: '2px 8px',
                            borderRadius: '12px',
                            background: '#e3f2fd',
                            color: '#1565c0',
                            fontWeight: 'bold'
                          }}>
                            {statusBadge.text}
                          </span>
                          {mission.assigned_at && (
                            <span>Assigned: {formatShortDate(mission.assigned_at)}</span>
                          )}
                        </div>
                      </div>

                      <div className="reports-card-footer">
                        <div style={{ display: 'flex', gap: '0.75rem' }}>
                          <button 
                            onClick={() => handleViewTaskDetails(mission)}
                            className="reports-btn"
                            style={{ 
                              flex: 2,
                              background: '#2D5A27',
                              color: 'white',
                              padding: '0.6rem',
                              fontSize: '0.85rem',
                              fontWeight: '600',
                              border: 'none',
                              borderRadius: '4px',
                              cursor: 'pointer'
                            }}
                          >
                            View Details →
                          </button>
                          <button 
                            onClick={() => handleUploadProof(mission.task_id!)}
                            className="reports-btn"
                            style={{ 
                              flex: 1,
                              background: '#FF9F1C',
                              color: 'white',
                              padding: '0.6rem',
                              fontSize: '0.85rem',
                              fontWeight: '600',
                              border: 'none',
                              borderRadius: '4px',
                              cursor: 'pointer'
                            }}
                            title="Upload evidence photo"
                          >
                            📸
                          </button>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </>
          ) : (
            <div className="reports-empty-state">
              <span className="empty-state-emoji">🎯</span>
              <h3>No Active Missions</h3>
              <p>You don't have any active rescue missions at the moment.</p>
              <Link to="/tasks" className="reports-btn primary">
                Browse Available Missions
              </Link>
            </div>
          )}
        </div>
      </div>

      {/* Task Detail Modal */}
      {selectedTask && (
        <TaskDetailModal 
          task={selectedTask}
          isOpen={isTaskModalOpen}
          onClose={() => {
            setIsTaskModalOpen(false);
            setSelectedTask(null);
          }}
          onComplete={(taskId) => handleUploadProof(taskId)}
          actionLoading={actionLoading}
          userProfile={userProfile}
        />
      )}

      {/* Decline Modal */}
      {selectedTaskId && (
        <DeclineModal
          isOpen={isDeclineModalOpen}
          onClose={() => {
            setIsDeclineModalOpen(false);
            setSelectedTaskId(null);
          }}
          onSubmit={(reason) => handleDeclineTask(selectedTaskId, reason)}
          taskId={selectedTaskId}
        />
      )}

      {/* Complete Mission Modal with Photo Upload */}
      {selectedTaskId && (
        <CompleteMissionModal
          isOpen={isCompleteModalOpen}
          onClose={() => {
            setIsCompleteModalOpen(false);
            setSelectedTaskId(null);
          }}
          onSubmit={(files, notes) => handleCompleteTask(selectedTaskId, files, notes)}
          taskId={selectedTaskId}
        />
      )}
    </div>
  );
};

const PendingVolunteerDashboard: React.FC<{ user: any }> = ({ user }) => {
  return (
    <div className="dashboard-wrapper animate-fade-in">
      <div className="pending-volunteer">
        <div className="pending-icon">⏰</div>
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

/* ===========================================
   USER DASHBOARD - 3 CARD GRID LAYOUT
   Shows 3 report cards in a row
=========================================== */
const UserDashboard: React.FC<{ 
  user: any; 
  userReports: Report[]; 
  reportsLoading: boolean;
  onViewDetails: (report: Report) => void;
  userProfile: UserProfile | null;
}> = ({ user, userReports, reportsLoading, onViewDetails, userProfile }) => {
  // Filter reports by current user
  const myReports = userReports.filter(report => {
    const reportUserId = Number(report.user_id);
    const currentUserId = Number(user.user_id);
    return reportUserId === currentUserId;
  });

  // Calculate statistics using status_name from database
  const totalReports = myReports.length;
  const submittedReports = myReports.filter(r => r.status_name?.toLowerCase() === 'submitted').length;
  const inProgressReports = myReports.filter(r => r.status_name?.toLowerCase() === 'in_progress').length;
  const completedReports = myReports.filter(r => r.status_name?.toLowerCase() === 'completed').length;

  // Get user's phone number
  const userPhone = userProfile?.phone;

  return (
    <div className="dashboard-wrapper animate-fade-in">
      <div className="user-dashboard">
        {/* Welcome Section */}
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

        {/* Statistics Cards */}
        <div className="user-stats-grid">
          <div className="user-stat-card">
            <div className="stat-card-icon total-reports">📄</div>
            <div className="stat-card-content">
              <h3 className="stat-card-value">{totalReports}</h3>
              <p className="stat-card-label">Total Reports</p>
            </div>
          </div>
          
          <div className="user-stat-card">
            <div className="stat-card-icon in-progress">⏳</div>
            <div className="stat-card-content">
              <h3 className="stat-card-value">{inProgressReports}</h3>
              <p className="stat-card-label">In Progress</p>
            </div>
          </div>
          
          <div className="user-stat-card">
            <div className="stat-card-icon completed">✓</div>
            <div className="stat-card-content">
              <h3 className="stat-card-value">{completedReports}</h3>
              <p className="stat-card-label">Completed</p>
            </div>
          </div>
          
          <div className="user-stat-card">
            <div className="stat-card-icon waiting">⏰</div>
            <div className="stat-card-content">
              <h3 className="stat-card-value">{submittedReports}</h3>
              <p className="stat-card-label">Submitted</p>
            </div>
          </div>
        </div>

        {/* Reports Section - 3 Card Grid */}
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
                {/* 3-Column Grid Layout */}
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
                                {formatShortDate(report.submitted_at)}
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
                
                {/* Show more reports if there are more than 3 */}
                {myReports.length > 3 && (
                  <div className="view-all-container">
                    <Link to="/my-reports" className="view-all-btn">
                      View All Reports ({myReports.length})
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
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
