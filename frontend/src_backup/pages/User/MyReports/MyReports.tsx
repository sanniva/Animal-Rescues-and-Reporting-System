import { toast } from 'react-toastify';
// // // import React, { useState, useEffect } from 'react';
// // // import { Link } from 'react-router-dom';
// // // import { useAuth } from '../../../context/AuthContext';
// // // import './MyReports.css';

// // // interface Report {
// // //   report_id: number;
// // //   user_id: number;
// // //   description: string;
// // //   location_address: string;
// // //   submitted_at: string;
// // //   animal_type: string;
// // //   animal_condition: string;
// // //   status_id: number;
// // //   reporter_name?: string;
// // //   reporter_phone?: string | null;
// // //   email?: string;
// // // }

// // // // Helper function to check if phone exists
// // // const hasPhone = (phone?: string | null): boolean => {
// // //   if (phone === null || phone === undefined) return false;
// // //   if (typeof phone !== 'string') return false;
// // //   return phone.trim().length > 0;
// // // };

// // // const ReportDetailModal: React.FC<{
// // //   report: Report | null;
// // //   isOpen: boolean;
// // //   onClose: () => void;
// // // }> = ({ report, isOpen, onClose }) => {
// // //   if (!isOpen || !report) return null;

// // //   const getStatusText = (statusId: number): string => {
// // //     switch(statusId) {
// // //       case 1: return 'Submitted';
// // //       case 2: return 'Under Review';
// // //       case 3: return 'In Progress';
// // //       case 4: return 'Completed';
// // //       case 5: return 'Cancelled';
// // //       default: return 'Unknown';
// // //     }
// // //   };

// // //   const getStatusClass = (statusId: number): string => {
// // //     switch(statusId) {
// // //       case 1: return 'submitted';
// // //       case 2: return 'review';
// // //       case 3: return 'progress';
// // //       case 4: return 'completed';
// // //       case 5: return 'cancelled';
// // //       default: return 'unknown';
// // //     }
// // //   };

// // //   const getAnimalEmoji = (animalType: string): string => {
// // //     const type = animalType?.toLowerCase() || '';
// // //     if (type.includes('dog')) return '🐶';
// // //     if (type.includes('cat')) return '🐱';
// // //     if (type.includes('bird')) return '🐦';
// // //     if (type.includes('rabbit') || type.includes('bunny')) return '🐰';
// // //     if (type.includes('hamster')) return '🐹';
// // //     if (type.includes('turtle') || type.includes('tortoise')) return '🐢';
// // //     if (type.includes('horse')) return '🐴';
// // //     if (type.includes('cow')) return '🐮';
// // //     if (type.includes('goat')) return '🐐';
// // //     if (type.includes('sheep')) return '🐑';
// // //     if (type.includes('fish')) return '🐠';
// // //     if (type.includes('snake')) return '🐍';
// // //     if (type.includes('mouse') || type.includes('rat')) return '🐭';
// // //     if (type.includes('monkey')) return '🐒';
// // //     if (type.includes('pig')) return '🐷';
// // //     if (type.includes('chicken')) return '🐔';
// // //     if (type.includes('duck')) return '🦆';
// // //     return '🐾';
// // //   };

// // //   const formatDate = (dateString: string): string => {
// // //     const date = new Date(dateString);
// // //     return date.toLocaleDateString('en-US', {
// // //       weekday: 'short',
// // //       month: 'short',
// // //       day: 'numeric',
// // //       year: 'numeric',
// // //       hour: '2-digit',
// // //       minute: '2-digit'
// // //     });
// // //   };

// // //   const getConditionIcon = (condition: string): string => {
// // //     const cond = condition.toLowerCase();
// // //     if (cond.includes('critical') || cond.includes('emergency')) return '🆘';
// // //     if (cond.includes('severe') || cond.includes('serious')) return '⚠️';
// // //     if (cond.includes('moderate') || cond.includes('injured')) return '🩹';
// // //     if (cond.includes('mild') || cond.includes('sick')) return '🤒';
// // //     if (cond.includes('abandoned') || cond.includes('lost')) return '💔';
// // //     if (cond.includes('healthy') || cond.includes('safe')) return '✅';
// // //     return 'ℹ️';
// // //   };

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
// // //           <div className="modal-top-row">
// // //             <div className="modal-status">
// // //               <span className={`status-badge-large status-${getStatusClass(report.status_id)}`}>
// // //                 {getStatusText(report.status_id)}
// // //               </span>
// // //             </div>
// // //           </div>

// // //           <div className="modal-section">
// // //             <h4 className="modal-section-title">
// // //               <span className="section-icon">👤</span>
// // //               Your Information
// // //             </h4>
// // //             <div className="modal-detail-grid">
// // //               <div className="detail-item">
// // //                 <span className="detail-label">Name</span>
// // //                 <span className="detail-value">{report.reporter_name || 'Anonymous'}</span>
// // //               </div>
// // //               <div className="detail-item">
// // //                 <span className="detail-label">User ID</span>
// // //                 <span className="detail-value">#{report.user_id}</span>
// // //               </div>
// // //               {report.email && (
// // //                 <div className="detail-item">
// // //                   <span className="detail-label">Email</span>
// // //                   <span className="detail-value">{report.email}</span>
// // //                 </div>
// // //               )}
// // //               {hasPhone(report.reporter_phone) && (
// // //                 <div className="detail-item">
// // //                   <span className="detail-label">Phone</span>
// // //                   <span className="detail-value">
// // //                     {formatPhoneNumber(report.reporter_phone)}
// // //                   </span>
// // //                 </div>
// // //               )}
// // //             </div>
// // //           </div>

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

// // //           <div className="modal-section">
// // //             <h4 className="modal-section-title">
// // //               <span className="section-icon">📝</span>
// // //               Description
// // //             </h4>
// // //             <div className="description-card">
// // //               <p className="description-text">{report.description}</p>
// // //             </div>
// // //           </div>

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

// // // const MyReports: React.FC = () => {
// // //   const [reports, setReports] = useState<Report[]>([]);
// // //   const [loading, setLoading] = useState(true);
// // //   const [error, setError] = useState<string | null>(null);
// // //   const [selectedReport, setSelectedReport] = useState<Report | null>(null);
// // //   const [isModalOpen, setIsModalOpen] = useState(false);
  
// // //   const { user: currentUser } = useAuth();

// // //   useEffect(() => {
// // //     const fetchUserReports = async () => {
// // //       if (!currentUser) return;
      
// // //       try {
// // //         setLoading(true);
// // //         setError(null);
// // //         const token = sessionStorage.getItem('token') || localStorage.getItem('token');
        
// // //         console.log('FETCHING reports for user ID:', currentUser.user_id);
        
// // //         const response = await fetch('http://localhost:5000/api/reports/my-reports', {
// // //           headers: {
// // //             'Authorization': `Bearer ${token}`,
// // //             'Content-Type': 'application/json'
// // //           }
// // //         });
        
// // //         console.log('Response status:', response.status);
        
// // //         if (response.ok) {
// // //           const data = await response.json();
// // //           console.log('API RESPONSE:', data);
          
// // //           if (data.success) {
// // //             console.log(`Found ${data.data?.length || 0} reports`);
// // //             setReports(data.data || []);
// // //           } else {
// // //             console.error('API error:', data.message);
// // //             setError(data.message || 'Failed to load reports');
// // //           }
// // //         } else {
// // //           console.error('HTTP error:', response.status, response.statusText);
// // //           setError('Failed to fetch reports: ' + response.statusText);
// // //         }
// // //       } catch (error) {
// // //         console.error('Network error:', error);
// // //         setError('Error loading reports. Please try again.');
// // //       } finally {
// // //         setLoading(false);
// // //       }
// // //     };
    
// // //     if (currentUser) {
// // //       fetchUserReports();
// // //     }
// // //   }, [currentUser]);

// // //   const handleViewDetails = (report: Report) => {
// // //     setSelectedReport(report);
// // //     setIsModalOpen(true);
// // //   };

// // //   const getStatusText = (statusId: number): string => {
// // //     switch(statusId) {
// // //       case 1: return 'Submitted';
// // //       case 2: return 'Under Review';
// // //       case 3: return 'In Progress';
// // //       case 4: return 'Completed';
// // //       case 5: return 'Cancelled';
// // //       default: return 'Unknown';
// // //     }
// // //   };

// // //   const getStatusClass = (statusId: number): string => {
// // //     switch(statusId) {
// // //       case 1: return 'submitted';
// // //       case 2: return 'review';
// // //       case 3: return 'progress';
// // //       case 4: return 'completed';
// // //       case 5: return 'cancelled';
// // //       default: return 'unknown';
// // //     }
// // //   };

// // //   const formatDate = (dateString: string): string => {
// // //     const date = new Date(dateString);
// // //     return date.toLocaleDateString('en-US', {
// // //       month: 'short',
// // //       day: 'numeric',
// // //       year: 'numeric'
// // //     });
// // //   };

// // //   const getAnimalEmoji = (animalType: string): string => {
// // //     const type = animalType?.toLowerCase() || '';
// // //     if (type.includes('dog')) return '🐶';
// // //     if (type.includes('cat')) return '🐱';
// // //     if (type.includes('bird')) return '🐦';
// // //     if (type.includes('rabbit') || type.includes('bunny')) return '🐰';
// // //     if (type.includes('hamster')) return '🐹';
// // //     if (type.includes('turtle') || type.includes('tortoise')) return '🐢';
// // //     if (type.includes('horse')) return '🐴';
// // //     if (type.includes('cow')) return '🐮';
// // //     if (type.includes('goat')) return '🐐';
// // //     if (type.includes('sheep')) return '🐑';
// // //     if (type.includes('fish')) return '🐠';
// // //     if (type.includes('snake')) return '🐍';
// // //     if (type.includes('mouse') || type.includes('rat')) return '🐭';
// // //     if (type.includes('monkey')) return '🐒';
// // //     if (type.includes('pig')) return '🐷';
// // //     if (type.includes('chicken')) return '🐔';
// // //     if (type.includes('duck')) return '🦆';
// // //     return '🐾';
// // //   };

// // //   const formatPhoneNumber = (phone?: string | null): string => {
// // //     if (!hasPhone(phone)) {
// // //       return 'No phone';
// // //     }
    
// // //     const phoneStr = String(phone).trim();
// // //     const cleaned = phoneStr.replace(/\D/g, '');
    
// // //     if (cleaned.length === 10) {
// // //       return `+977 ${cleaned}`;
// // //     }
    
// // //     return phoneStr;
// // //   };

// // //   if (!currentUser) {
// // //     return (
// // //       <div className="my-reports-container">
// // //         <div className="no-access">
// // //           <h2>Access Denied</h2>
// // //           <p>Please log in to view your reports.</p>
// // //           <Link to="/login" className="login-link">
// // //             Go to Login
// // //           </Link>
// // //         </div>
// // //       </div>
// // //     );
// // //   }

// // //   return (
// // //     <div className="my-reports-container">
// // //       <div className="reports-header">
// // //         <div>
// // //           <h1 className="page-title">My Reports</h1>
// // //           <p className="page-subtitle">
// // //             All your submitted animal rescue reports
// // //           </p>
// // //         </div>
// // //         <Link to="/create-report" className="new-report-btn">
// // //           + New Report
// // //         </Link>
// // //       </div>

// // //       <div className="reports-list-section">
// // //         {loading ? (
// // //           <div className="loading-container">
// // //             <div className="loading-spinner"></div>
// // //             <p>Loading your reports...</p>
// // //           </div>
// // //         ) : error ? (
// // //           <div className="error-container">
// // //             <div className="error-icon">⚠️</div>
// // //             <h3 className="error-title">Unable to Load Reports</h3>
// // //             <p className="error-message">{error}</p>
// // //             <button 
// // //               onClick={() => window.location.reload()} 
// // //               className="retry-btn"
// // //             >
// // //               Try Again
// // //             </button>
// // //           </div>
// // //         ) : reports.length > 0 ? (
// // //           <div className="simple-reports-list">
// // //             <table className="reports-table">
// // //               <thead>
// // //                 <tr>
// // //                   <th>ID</th>
// // //                   <th>Animal</th>
// // //                   <th>Phone</th>
// // //                   <th>Location</th>
// // //                   <th>Date</th>
// // //                   <th>Status</th>
// // //                   <th>Actions</th>
// // //                 </tr>
// // //               </thead>
// // //               <tbody>
// // //                 {reports.map(report => (
// // //                   <tr key={report.report_id}>
// // //                     <td className="report-id">#{report.report_id}</td>
// // //                     <td className="animal-cell">
// // //                       <div className="animal-info">
// // //                         <span className="animal-emoji">{getAnimalEmoji(report.animal_type)}</span>
// // //                         <span className="animal-name">{report.animal_type || 'Unknown'}</span>
// // //                       </div>
// // //                     </td>
// // //                     <td className="phone-cell">
// // //                       <div className="phone-info">
// // //                         <span className="phone-icon">📱</span>
// // //                         <span className="phone-number">
// // //                           {formatPhoneNumber(report.reporter_phone)}
// // //                         </span>
// // //                       </div>
// // //                     </td>
// // //                     <td className="location-cell">
// // //                       <div className="location-info">
// // //                         <span className="location-icon">📍</span>
// // //                         <span className="location-text">
// // //                           {report.location_address.length > 25 
// // //                             ? `${report.location_address.substring(0, 25)}...` 
// // //                             : report.location_address}
// // //                         </span>
// // //                       </div>
// // //                     </td>
// // //                     <td className="date-cell">{formatDate(report.submitted_at)}</td>
// // //                     <td>
// // //                       <span className={`status-badge status-${getStatusClass(report.status_id)}`}>
// // //                         {getStatusText(report.status_id)}
// // //                       </span>
// // //                     </td>
// // //                     <td>
// // //                       <button 
// // //                         onClick={() => handleViewDetails(report)}
// // //                         className="view-detail-btn"
// // //                       >
// // //                         View Detail
// // //                       </button>
// // //                     </td>
// // //                   </tr>
// // //                 ))}
// // //               </tbody>
// // //             </table>
// // //           </div>
// // //         ) : (
// // //           <div className="empty-state">
// // //             <div className="empty-icon">📝</div>
// // //             <h3 className="empty-title">No Reports Yet</h3>
// // //             <p className="empty-message">
// // //               You haven't submitted any reports yet.
// // //             </p>
// // //             <Link to="/create-report" className="empty-action-btn">
// // //               Submit Your First Report
// // //             </Link>
// // //           </div>
// // //         )}
// // //       </div>

// // //       <ReportDetailModal 
// // //         report={selectedReport} 
// // //         isOpen={isModalOpen} 
// // //         onClose={() => setIsModalOpen(false)}
// // //       />
// // //     </div>
// // //   );
// // // };

// // // export default MyReports;

// // import React, { useState, useEffect } from 'react';
// // import { Link } from 'react-router-dom';
// // import { useAuth } from '../../../context/AuthContext';
// // import './MyReports.css';

// // interface Report {
// //   report_id: number;
// //   user_id: number;
// //   description: string;
// //   location_address: string;
// //   submitted_at: string;
// //   animal_type: string;
// //   animal_condition: string;
// //   status_id: number;
// //   reporter_name?: string;
// //   reporter_phone?: string | null;
// //   email?: string;
// // }

// // // Helper function to check if phone exists
// // const hasPhone = (phone?: string | null): boolean => {
// //   if (phone === null || phone === undefined) return false;
// //   if (typeof phone !== 'string') return false;
// //   return phone.trim().length > 0;
// // };

// // // Helper functions (same as Dashboard)
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

// // const formatDate = (dateString: string): string => {
// //   const date = new Date(dateString);
// //   return date.toLocaleDateString('en-US', {
// //     weekday: 'short',
// //     month: 'short',
// //     day: 'numeric',
// //     year: 'numeric',
// //     hour: '2-digit',
// //     minute: '2-digit'
// //   });
// // };

// // // Format phone number for display
// // const formatPhoneNumber = (phone?: string | null): string => {
// //   if (!hasPhone(phone)) {
// //     return 'Not provided';
// //   }
  
// //   const phoneStr = String(phone).trim();
// //   const cleaned = phoneStr.replace(/\D/g, '');
  
// //   if (cleaned.length === 10) {
// //     return `+977 ${cleaned}`;
// //   }
  
// //   return phoneStr;
// // };

// // // Report Detail Modal Component (Consistent with Dashboard)
// // const ReportDetailModal: React.FC<{
// //   report: Report | null;
// //   isOpen: boolean;
// //   onClose: () => void;
// //   userPhone?: string;
// //   userName?: string;
// // }> = ({ report, isOpen, onClose, userPhone, userName }) => {
// //   if (!isOpen || !report) return null;

// //   const isEditable = report.status_id === 1;

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
// //                 <span className="detail-value">{report.reporter_name || userName || 'Anonymous'}</span>
// //               </div>
// //               <div className="detail-item">
// //                 <span className="detail-label">User ID</span>
// //                 <span className="detail-value">#{report.user_id}</span>
// //               </div>
// //               {report.email && (
// //                 <div className="detail-item">
// //                   <span className="detail-label">Email</span>
// //                   <span className="detail-value">{report.email}</span>
// //                 </div>
// //               )}
// //               {hasPhone(report.reporter_phone) && (
// //                 <div className="detail-item">
// //                   <span className="detail-label">Phone</span>
// //                   <span className="detail-value phone-emphasis">
// //                     {formatPhoneNumber(report.reporter_phone)}
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
// //                   <span className="detail-emoji">
// //                     {report.animal_condition?.includes('Critical') ? '🆘' : 
// //                      report.animal_condition?.includes('Severe') ? '⚠️' : 
// //                      report.animal_condition?.includes('Injured') ? '🩹' : 
// //                      report.animal_condition?.includes('Sick') ? '🤒' : 
// //                      report.animal_condition?.includes('Abandoned') ? '💔' : 
// //                      'ℹ️'}
// //                   </span>
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

// // // Edit Report Modal (Updated to match Dashboard style)
// // const EditReportModal: React.FC<{
// //   report: Report | null;
// //   isOpen: boolean;
// //   onClose: () => void;
// //   onSave: (updatedReport: Report) => Promise<void>;
// // }> = ({ report, isOpen, onClose, onSave }) => {
// //   const [description, setDescription] = useState('');
// //   const [location, setLocation] = useState('');
// //   const [showSaveConfirm, setShowSaveConfirm] = useState(false);
// //   const [isSaving, setIsSaving] = useState(false);
// //   const [error, setError] = useState<string | null>(null);

// //   useEffect(() => {
// //     if (report) {
// //       setDescription(report.description);
// //       setLocation(report.location_address);
// //       setError(null);
// //     }
// //   }, [report]);

// //   if (!isOpen || !report) return null;

// //   const validateForm = (): boolean => {
// //     if (description.trim().length < 10) {
// //       setError('Description must be at least 10 characters long');
// //       return false;
// //     }

// //     if (location.trim().length < 5) {
// //       setError('Location must be at least 5 characters long');
// //       return false;
// //     }

// //     // Check if there are actual changes
// //     if (description.trim() === report.description && 
// //         location.trim() === report.location_address) {
// //       setError('No changes made to save');
// //       return false;
// //     }

// //     return true;
// //   };

// //   const handleSaveClick = () => {
// //     setError(null);
// //     if (validateForm()) {
// //       setShowSaveConfirm(true);
// //     }
// //   };

// //   const handleConfirmSave = async () => {
// //     try {
// //       setIsSaving(true);
// //       setError(null);

// //       const updatedReport = {
// //         ...report,
// //         description: description.trim(),
// //         location_address: location.trim()
// //       };

// //       await onSave(updatedReport);
// //       setShowSaveConfirm(false);
// //       onClose();
// //     } catch (err) {
// //       setError(err instanceof Error ? err.message : 'Failed to save changes');
// //       setShowSaveConfirm(false);
// //     } finally {
// //       setIsSaving(false);
// //     }
// //   };

// //   const handleCancel = () => {
// //     if (description !== report.description || location !== report.location_address) {
// //       if (window.confirm('You have unsaved changes. Are you sure you want to cancel?')) {
// //         setDescription(report.description);
// //         setLocation(report.location_address);
// //         setError(null);
// //         onClose();
// //       }
// //     } else {
// //       onClose();
// //     }
// //   };

// //   return (
// //     <>
// //       <div className="modal-overlay" onClick={handleCancel}>
// //         <div className="modal-content edit-modal" onClick={e => e.stopPropagation()}>
// //           <div className="modal-header">
// //             <div className="modal-header-left">
// //               <span className="modal-animal-emoji">{getAnimalEmoji(report.animal_type)}</span>
// //               <div>
// //                 <h3 className="modal-title">Edit Report #{report.report_id}</h3>
// //                 <p className="modal-subtitle">{report.animal_type} • {report.animal_condition}</p>
// //               </div>
// //             </div>
// //             <button 
// //               className="modal-close" 
// //               onClick={handleCancel}
// //               disabled={isSaving}
// //             >
// //               ×
// //             </button>
// //           </div>
          
// //           <div className="modal-body">
// //             {error && (
// //               <div className="edit-error-message">
// //                 <span className="error-icon-small">⚠️</span>
// //                 <span>{error}</span>
// //               </div>
// //             )}

// //             <div className="edit-form">
// //               <div className="form-group">
// //                 <label htmlFor="description" className="form-label">
// //                   <span className="form-label-icon">📝</span>
// //                   Description
// //                 </label>
// //                 <textarea
// //                   id="description"
// //                   className="form-textarea"
// //                   value={description}
// //                   onChange={(e) => setDescription(e.target.value)}
// //                   placeholder="Describe the animal's situation in detail..."
// //                   rows={6}
// //                   disabled={isSaving}
// //                 />
// //                 <div className="form-help">
// //                   Minimum 10 characters. Current: {description.length}
// //                 </div>
// //               </div>

// //               <div className="form-group">
// //                 <label htmlFor="location" className="form-label">
// //                   <span className="form-label-icon">📍</span>
// //                   Location Address
// //                 </label>
// //                 <textarea
// //                   id="location"
// //                   className="form-textarea"
// //                   value={location}
// //                   onChange={(e) => setLocation(e.target.value)}
// //                   placeholder="Provide the exact location where the animal is..."
// //                   rows={3}
// //                   disabled={isSaving}
// //                 />
// //                 <div className="form-help">
// //                   Minimum 5 characters. Current: {location.length}
// //                 </div>
// //               </div>

// //               <div className="form-notice">
// //                 <div className="notice-icon">ℹ️</div>
// //                 <div className="notice-content">
// //                   <strong>Note:</strong> You can only edit reports with "Submitted" status. 
// //                   Once a report is under review or in progress, it cannot be edited.
// //                 </div>
// //               </div>
// //             </div>
// //           </div>
          
// //           <div className="modal-footer">
// //             <button 
// //               className="modal-btn secondary" 
// //               onClick={handleCancel}
// //               disabled={isSaving}
// //             >
// //               Cancel
// //             </button>
// //             <button 
// //               className="modal-btn primary" 
// //               onClick={handleSaveClick}
// //               disabled={isSaving}
// //             >
// //               {isSaving ? (
// //                 <>
// //                   <span className="loading-spinner-small"></span>
// //                   Saving...
// //                 </>
// //               ) : 'Save Changes'}
// //             </button>
// //           </div>
// //         </div>
// //       </div>

// //       {/* Save Confirmation Modal */}
// //       {showSaveConfirm && (
// //         <div className="modal-overlay">
// //           <div className="modal-content save-confirm-modal">
// //             <div className="modal-header">
// //               <h3 className="modal-title">Confirm Save</h3>
// //               <button 
// //                 className="modal-close" 
// //                 onClick={() => setShowSaveConfirm(false)}
// //                 disabled={isSaving}
// //               >
// //                 ×
// //               </button>
// //             </div>
// //             <div className="modal-body">
// //               <div className="save-confirm-warning">
// //                 <div className="warning-icon">💾</div>
// //                 <h4>Are you sure you want to save these changes?</h4>
// //                 <div className="changes-list">
// //                   {description.trim() !== report.description && (
// //                     <div className="change-item">
// //                       <span className="change-label">Description:</span>
// //                       <span className="change-value">Updated</span>
// //                     </div>
// //                   )}
// //                   {location.trim() !== report.location_address && (
// //                     <div className="change-item">
// //                       <span className="change-label">Location:</span>
// //                       <span className="change-value">Updated</span>
// //                     </div>
// //                   )}
// //                 </div>
// //                 <p className="confirm-message">
// //                   Your changes will be submitted for review.
// //                 </p>
// //               </div>
// //             </div>
// //             <div className="modal-footer">
// //               <button 
// //                 className="modal-btn secondary" 
// //                 onClick={() => setShowSaveConfirm(false)}
// //                 disabled={isSaving}
// //               >
// //                 Cancel
// //               </button>
// //               <button 
// //                 className="modal-btn primary" 
// //                 onClick={handleConfirmSave}
// //                 disabled={isSaving}
// //               >
// //                 {isSaving ? (
// //                   <>
// //                     <span className="loading-spinner-small"></span>
// //                     Saving...
// //                   </>
// //                 ) : 'Yes, Save Changes'}
// //               </button>
// //             </div>
// //           </div>
// //         </div>
// //       )}
// //     </>
// //   );
// // };

// // const MyReports: React.FC = () => {
// //   const [reports, setReports] = useState<Report[]>([]);
// //   const [loading, setLoading] = useState(true);
// //   const [error, setError] = useState<string | null>(null);
// //   const [selectedReport, setSelectedReport] = useState<Report | null>(null);
// //   const [editingReport, setEditingReport] = useState<Report | null>(null);
// //   const [isModalOpen, setIsModalOpen] = useState(false);
// //   const [isEditModalOpen, setIsEditModalOpen] = useState(false);
// //   const [deleteConfirmOpen, setDeleteConfirmOpen] = useState(false);
// //   const [reportToDelete, setReportToDelete] = useState<number | null>(null);
// //   const [isDeleting, setIsDeleting] = useState(false);
// //   const [userProfile, setUserProfile] = useState<any>(null);
  
// //   const { user: currentUser } = useAuth();

// //   // Fetch user profile
// //   useEffect(() => {
// //     const fetchUserProfile = async () => {
// //       if (!currentUser) return;
      
// //       try {
// //         const token = sessionStorage.getItem('token') || localStorage.getItem('token');
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

// //   // Fetch user's reports
// //   useEffect(() => {
// //     const fetchUserReports = async () => {
// //       if (!currentUser) return;
      
// //       try {
// //         setLoading(true);
// //         setError(null);
// //         const token = sessionStorage.getItem('token') || localStorage.getItem('token');
        
// //         const response = await fetch('http://localhost:5000/api/reports/my-reports', {
// //           headers: {
// //             'Authorization': `Bearer ${token}`,
// //             'Content-Type': 'application/json'
// //           }
// //         });
        
// //         if (response.ok) {
// //           const data = await response.json();
// //           if (data.success) {
// //             setReports(data.data || []);
// //           } else {
// //             setError(data.message || 'Failed to load reports');
// //           }
// //         } else {
// //           setError('Failed to fetch reports: ' + response.statusText);
// //         }
// //       } catch (error) {
// //         console.error('Network error:', error);
// //         setError('Error loading reports. Please try again.');
// //       } finally {
// //         setLoading(false);
// //       }
// //     };
    
// //     if (currentUser) {
// //       fetchUserReports();
// //     }
// //   }, [currentUser]);

// //   const handleViewDetails = (report: Report) => {
// //     setSelectedReport(report);
// //     setIsModalOpen(true);
// //   };

// //   const handleEditClick = (report: Report, e: React.MouseEvent) => {
// //     e.stopPropagation();
// //     setEditingReport(report);
// //     setIsEditModalOpen(true);
// //   };

// //   const handleSaveReport = async (updatedReport: Report) => {
// //     try {
// //       const token = sessionStorage.getItem('token') || localStorage.getItem('token');
      
// //       const response = await fetch(`http://localhost:5000/api/reports/${updatedReport.report_id}`, {
// //         method: 'PATCH',
// //         headers: {
// //           'Authorization': `Bearer ${token}`,
// //           'Content-Type': 'application/json'
// //         },
// //         body: JSON.stringify({
// //           description: updatedReport.description,
// //           location_address: updatedReport.location_address
// //         })
// //       });

// //       if (response.ok) {
// //         const data = await response.json();
// //         if (data.success) {
// //           // Update the report in the list
// //           setReports(prev => prev.map(report => 
// //             report.report_id === updatedReport.report_id 
// //               ? { ...report, ...updatedReport }
// //               : report
// //           ));
          
// //           // Also update the selected report if it's the same one
// //           if (selectedReport?.report_id === updatedReport.report_id) {
// //             setSelectedReport(updatedReport);
// //           }
          
// //           return; // Success
// //         } else {
// //           throw new Error(data.message || 'Failed to update report');
// //         }
// //       } else {
// //         const errorData = await response.json();
// //         throw new Error(errorData.message || 'Failed to update report');
// //       }
// //     } catch (error) {
// //       console.error('Error updating report:', error);
// //       throw error;
// //     }
// //   };

// //   const handleDeleteClick = (reportId: number, e: React.MouseEvent) => {
// //     e.stopPropagation();
// //     setReportToDelete(reportId);
// //     setDeleteConfirmOpen(true);
// //   };

// //   const handleDeleteReport = async () => {
// //     if (!reportToDelete || !currentUser) return;
    
// //     try {
// //       setIsDeleting(true);
// //       const token = sessionStorage.getItem('token') || localStorage.getItem('token');
      
// //       const response = await fetch(`http://localhost:5000/api/reports/${reportToDelete}`, {
// //         method: 'DELETE',
// //         headers: {
// //           'Authorization': `Bearer ${token}`,
// //           'Content-Type': 'application/json'
// //         }
// //       });
      
// //       if (response.ok) {
// //         const data = await response.json();
// //         if (data.success) {
// //           // Remove the deleted report from the list
// //           setReports(prev => prev.filter(report => report.report_id !== reportToDelete));
// //           setDeleteConfirmOpen(false);
// //           setReportToDelete(null);
// //           setIsModalOpen(false);
// //         } else {
// //           toast.success(data.message || 'Failed to delete report');
// //         }
// //       } else {
// //         toast.success('Failed to delete report');
// //       }
// //     } catch (error) {
// //       console.error('Error deleting report:', error);
// //       toast.success('Error deleting report. Please try again.');
// //     } finally {
// //       setIsDeleting(false);
// //     }
// //   };

// //   const formatDate = (dateString: string): string => {
// //     const date = new Date(dateString);
// //     return date.toLocaleDateString('en-US', {
// //       month: 'short',
// //       day: 'numeric',
// //       year: 'numeric'
// //     });
// //   };

// //   const isReportEditable = (statusId: number): boolean => {
// //     return statusId === 1;
// //   };

// //   if (!currentUser) {
// //     return (
// //       <div className="my-reports-container">
// //         <div className="no-access">
// //           <h2>Access Denied</h2>
// //           <p>Please log in to view your reports.</p>
// //           <Link to="/login" className="login-link">
// //             Go to Login
// //           </Link>
// //         </div>
// //       </div>
// //     );
// //   }

// //   return (
// //     <div className="my-reports-container">
// //       <div className="reports-header">
// //         <div>
// //           <h1 className="page-title">My Reports</h1>
// //           <p className="page-subtitle">
// //             All your submitted animal rescue reports
// //           </p>
// //         </div>
// //         <Link to="/create-report" className="new-report-btn">
// //           + New Report
// //         </Link>
// //       </div>

// //       <div className="reports-list-section">
// //         {loading ? (
// //           <div className="loading-container">
// //             <div className="loading-spinner"></div>
// //             <p>Loading your reports...</p>
// //           </div>
// //         ) : error ? (
// //           <div className="error-container">
// //             <div className="error-icon">⚠️</div>
// //             <h3 className="error-title">Unable to Load Reports</h3>
// //             <p className="error-message">{error}</p>
// //             <button 
// //               onClick={() => window.location.reload()} 
// //               className="retry-btn"
// //             >
// //               Try Again
// //             </button>
// //           </div>
// //         ) : reports.length > 0 ? (
// //           <div className="simple-reports-list">
// //             <table className="reports-table">
// //               <thead>
// //                 <tr>
// //                   <th>ID</th>
// //                   <th>Animal</th>
// //                   <th>Location</th>
// //                   <th>Date</th>
// //                   <th>Status</th>
// //                   <th>Actions</th>
// //                 </tr>
// //               </thead>
// //               <tbody>
// //                 {reports.map(report => {
// //                   const editable = isReportEditable(report.status_id);
// //                   return (
// //                     <tr key={report.report_id}>
// //                       <td className="report-id">#{report.report_id}</td>
// //                       <td className="animal-cell">
// //                         <div className="animal-info">
// //                           <span className="animal-emoji">{getAnimalEmoji(report.animal_type)}</span>
// //                           <span className="animal-name">{report.animal_type || 'Unknown'}</span>
// //                         </div>
// //                       </td>
// //                       <td className="location-cell">
// //                         <div className="location-info">
// //                           <span className="location-icon">📍</span>
// //                           <span className="location-text">
// //                             {report.location_address.length > 25 
// //                               ? `${report.location_address.substring(0, 25)}...` 
// //                               : report.location_address}
// //                           </span>
// //                         </div>
// //                       </td>
// //                       <td className="date-cell">{formatDate(report.submitted_at)}</td>
// //                       <td>
// //                         <span className={`status-badge status-${getStatusClass(report.status_id)}`}>
// //                           {getStatusText(report.status_id)}
// //                         </span>
// //                       </td>
// //                       <td>
// //                         <div className="action-buttons">
// //                           <button 
// //                             onClick={() => handleViewDetails(report)}
// //                             className="view-detail-btn"
// //                           >
// //                             View
// //                           </button>
// //                           {editable && (
// //                             <>
// //                               <button 
// //                                 onClick={(e) => handleEditClick(report, e)}
// //                                 className="edit-btn-small"
// //                               >
// //                                 Edit
// //                               </button>
// //                               <button 
// //                                 onClick={(e) => handleDeleteClick(report.report_id, e)}
// //                                 className="delete-btn-small"
// //                               >
// //                                 Delete
// //                               </button>
// //                             </>
// //                           )}
// //                         </div>
// //                       </td>
// //                     </tr>
// //                   );
// //                 })}
// //               </tbody>
// //             </table>
// //           </div>
// //         ) : (
// //           <div className="empty-state">
// //             <div className="empty-icon">📝</div>
// //             <h3 className="empty-title">No Reports Yet</h3>
// //             <p className="empty-message">
// //               You haven't submitted any reports yet.
// //             </p>
// //             <Link to="/create-report" className="empty-action-btn">
// //               Submit Your First Report
// //             </Link>
// //           </div>
// //         )}
// //       </div>

// //       {/* View Details Modal */}
// //       <ReportDetailModal 
// //         report={selectedReport} 
// //         isOpen={isModalOpen} 
// //         onClose={() => setIsModalOpen(false)}
// //         userPhone={userProfile?.phone}
// //         userName={userProfile?.username}
// //       />

// //       {/* Edit Modal */}
// //       <EditReportModal
// //         report={editingReport}
// //         isOpen={isEditModalOpen}
// //         onClose={() => setIsEditModalOpen(false)}
// //         onSave={handleSaveReport}
// //       />

// //       {/* Delete Confirmation Modal */}
// //       {deleteConfirmOpen && (
// //         <div className="modal-overlay">
// //           <div className="modal-content delete-confirm-modal">
// //             <div className="modal-header">
// //               <h3 className="modal-title">Confirm Delete</h3>
// //               <button 
// //                 className="modal-close" 
// //                 onClick={() => setDeleteConfirmOpen(false)}
// //                 disabled={isDeleting}
// //               >
// //                 ×
// //               </button>
// //             </div>
// //             <div className="modal-body">
// //               <div className="delete-warning">
// //                 <div className="warning-icon">⚠️</div>
// //                 <h4>Are you sure you want to delete this report?</h4>
// //                 <p>This action cannot be undone. The report will be permanently removed.</p>
// //               </div>
// //             </div>
// //             <div className="modal-footer">
// //               <button 
// //                 className="modal-btn secondary" 
// //                 onClick={() => setDeleteConfirmOpen(false)}
// //                 disabled={isDeleting}
// //               >
// //                 Cancel
// //               </button>
// //               <button 
// //                 className="modal-btn delete-btn" 
// //                 onClick={handleDeleteReport}
// //                 disabled={isDeleting}
// //               >
// //                 {isDeleting ? 'Deleting...' : 'Delete Report'}
// //               </button>
// //             </div>
// //           </div>
// //         </div>
// //       )}
// //     </div>
// //   );
// // };

// // export default MyReports;

// import React, { useState, useEffect, useMemo } from 'react';
// import { Link } from 'react-router-dom';
// import { useAuth } from '../../../context/AuthContext';
// import './MyReports.css';

// interface Report {
//   report_id: number;
//   user_id: number;
//   description: string;
//   location_address: string;
//   submitted_at: string;
//   animal_type: string;
//   animal_condition: string;
//   status_id: number;
//   status_name?: string;
//   reporter_name?: string;
//   reporter_phone?: string | null;
//   email?: string;
// }

// const ReportDetailModal: React.FC<{
//   report: Report | null;
//   isOpen: boolean;
//   onClose: () => void;
// }> = ({ report, isOpen, onClose }) => {
//   if (!isOpen || !report) return null;

//   const getAnimalEmoji = (animalType: string): string => {
//     const type = animalType?.toLowerCase() || '';
//     if (type.includes('dog')) return '🐶';
//     if (type.includes('cat')) return '🐱';
//     if (type.includes('bird')) return '🐦';
//     if (type.includes('rabbit') || type.includes('bunny')) return '🐰';
//     if (type.includes('hamster')) return '🐹';
//     if (type.includes('turtle') || type.includes('tortoise')) return '🐢';
//     if (type.includes('horse')) return '🐴';
//     if (type.includes('cow')) return '🐮';
//     if (type.includes('goat')) return '🐐';
//     if (type.includes('sheep')) return '🐑';
//     return '🐾';
//   };

//   const formatDate = (dateString: string): string => {
//     const date = new Date(dateString);
//     return date.toLocaleDateString('en-US', {
//       weekday: 'short',
//       month: 'short',
//       day: 'numeric',
//       year: 'numeric',
//       hour: '2-digit',
//       minute: '2-digit'
//     });
//   };

//   const getStatusDisplay = (statusName?: string): string => {
//     if (!statusName) return 'Unknown';
//     return statusName
//       .replace(/_/g, ' ')
//       .replace(/\b\w/g, char => char.toUpperCase());
//   };

//   const getStatusClass = (statusName?: string): string => {
//     const name = statusName?.toLowerCase() || '';
//     if (name.includes('submitted')) return 'submitted';
//     if (name.includes('review')) return 'review';
//     if (name.includes('progress')) return 'progress';
//     if (name.includes('completed')) return 'completed';
//     if (name.includes('cancelled') || name.includes('declined')) return 'cancelled';
//     return 'unknown';
//   };

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
//               <span className={`status-badge-large status-${getStatusClass(report.status_name)}`}>
//                 {getStatusDisplay(report.status_name)}
//               </span>
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
//                 <span className="detail-value">{report.reporter_name || 'Anonymous'}</span>
//               </div>
//               <div className="detail-item">
//                 <span className="detail-label">User ID</span>
//                 <span className="detail-value">#{report.user_id}</span>
//               </div>
//               {report.email && (
//                 <div className="detail-item">
//                   <span className="detail-label">Email</span>
//                   <span className="detail-value">{report.email}</span>
//                 </div>
//               )}
//               {hasPhone(report.reporter_phone) && (
//                 <div className="detail-item">
//                   <span className="detail-label">Phone</span>
//                   <span className="detail-value phone-emphasis">
//                     {formatPhoneNumber(report.reporter_phone)}
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
//                   <span className="detail-emoji">
//                     {report.animal_condition?.toLowerCase().includes('critical') ? '🆘' : 
//                      report.animal_condition?.toLowerCase().includes('severe') ? '⚠️' : 
//                      report.animal_condition?.toLowerCase().includes('injured') ? '🩹' : 
//                      report.animal_condition?.toLowerCase().includes('sick') ? '🤒' : 
//                      report.animal_condition?.toLowerCase().includes('abandoned') ? '💔' : 
//                      'ℹ️'}
//                   </span>
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

// const EditReportModal: React.FC<{
//   report: Report | null;
//   isOpen: boolean;
//   onClose: () => void;
//   onSave: (updatedReport: Report) => Promise<void>;
// }> = ({ report, isOpen, onClose, onSave }) => {
//   const [description, setDescription] = useState('');
//   const [location, setLocation] = useState('');
//   const [isSaving, setIsSaving] = useState(false);
//   const [error, setError] = useState<string | null>(null);

//   useEffect(() => {
//     if (report) {
//       setDescription(report.description);
//       setLocation(report.location_address);
//       setError(null);
//     }
//   }, [report]);

//   if (!isOpen || !report) return null;

//   const validateForm = (): boolean => {
//     if (description.trim().length < 10) {
//       setError('Description must be at least 10 characters long');
//       return false;
//     }

//     if (location.trim().length < 5) {
//       setError('Location must be at least 5 characters long');
//       return false;
//     }

//     if (description.trim() === report.description && 
//         location.trim() === report.location_address) {
//       setError('No changes made to save');
//       return false;
//     }

//     return true;
//   };

//   const handleSave = async () => {
//     try {
//       setError(null);
//       if (!validateForm()) return;
      
//       setIsSaving(true);
//       const updatedReport = {
//         ...report,
//         description: description.trim(),
//         location_address: location.trim()
//       };

//       await onSave(updatedReport);
//       onClose();
//     } catch (err) {
//       setError(err instanceof Error ? err.message : 'Failed to save changes');
//     } finally {
//       setIsSaving(false);
//     }
//   };

//   const handleCancel = () => {
//     if (description !== report.description || location !== report.location_address) {
//       if (window.confirm('You have unsaved changes. Are you sure you want to cancel?')) {
//         onClose();
//       }
//     } else {
//       onClose();
//     }
//   };

//   return (
//     <div className="modal-overlay" onClick={handleCancel}>
//       <div className="modal-content edit-modal" onClick={e => e.stopPropagation()}>
//         <div className="modal-header">
//           <div className="modal-header-left">
//             <span className="modal-animal-emoji">✏️</span>
//             <div>
//               <h3 className="modal-title">Edit Report #{report.report_id}</h3>
//               <p className="modal-subtitle">Update report details</p>
//             </div>
//           </div>
//           <button 
//             className="modal-close" 
//             onClick={handleCancel}
//             disabled={isSaving}
//           >
//             ×
//           </button>
//         </div>
        
//         <div className="modal-body">
//           {error && (
//             <div className="edit-error-message">
//               <span className="error-icon-small">⚠️</span>
//               <span>{error}</span>
//             </div>
//           )}

//           <div className="edit-form">
//             <div className="form-group">
//               <label htmlFor="description" className="form-label">
//                 <span className="form-label-icon">📝</span>
//                 Description
//               </label>
//               <textarea
//                 id="description"
//                 className="form-textarea"
//                 value={description}
//                 onChange={(e) => setDescription(e.target.value)}
//                 placeholder="Describe the animal's situation in detail..."
//                 rows={6}
//                 disabled={isSaving}
//               />
//               <div className="form-help">
//                 Minimum 10 characters. Current: {description.length}
//               </div>
//             </div>

//             <div className="form-group">
//               <label htmlFor="location" className="form-label">
//                 <span className="form-label-icon">📍</span>
//                 Location Address
//               </label>
//               <textarea
//                 id="location"
//                 className="form-textarea"
//                 value={location}
//                 onChange={(e) => setLocation(e.target.value)}
//                 placeholder="Provide the exact location where the animal is..."
//                 rows={3}
//                 disabled={isSaving}
//               />
//               <div className="form-help">
//                 Minimum 5 characters. Current: {location.length}
//               </div>
//             </div>
//           </div>
//         </div>
        
//         <div className="modal-footer">
//           <button 
//             className="modal-btn secondary" 
//             onClick={handleCancel}
//             disabled={isSaving}
//           >
//             Cancel
//           </button>
//           <button 
//             className="modal-btn primary" 
//             onClick={handleSave}
//             disabled={isSaving}
//           >
//             {isSaving ? (
//               <>
//                 <span className="loading-spinner-small"></span>
//                 Saving...
//               </>
//             ) : 'Save Changes'}
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// };

// const MyReports: React.FC = () => {
//   const [reports, setReports] = useState<Report[]>([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState<string | null>(null);
//   const [selectedReport, setSelectedReport] = useState<Report | null>(null);
//   const [editingReport, setEditingReport] = useState<Report | null>(null);
//   const [isModalOpen, setIsModalOpen] = useState(false);
//   const [isEditModalOpen, setIsEditModalOpen] = useState(false);
//   const [deleteConfirmOpen, setDeleteConfirmOpen] = useState(false);
//   const [reportToDelete, setReportToDelete] = useState<number | null>(null);
//   const [isDeleting, setIsDeleting] = useState(false);
  
//   // Search and Filter states
//   const [searchTerm, setSearchTerm] = useState('');
//   const [statusFilter, setStatusFilter] = useState<string>('all');
//   const [animalTypeFilter, setAnimalTypeFilter] = useState<string>('all');
//   const [dateFilter, setDateFilter] = useState<string>('all');
  
//   // Pagination states
//   const [currentPage, setCurrentPage] = useState(1);
//   const [reportsPerPage, setReportsPerPage] = useState(10);
  
//   const { user: currentUser } = useAuth();

//   // Fetch user's reports
//   useEffect(() => {
//     const fetchUserReports = async () => {
//       if (!currentUser) return;
      
//       try {
//         setLoading(true);
//         setError(null);
//         const token = sessionStorage.getItem('token') || localStorage.getItem('token');
        
//         const response = await fetch('http://localhost:5000/api/reports/my-reports', {
//           headers: {
//             'Authorization': `Bearer ${token}`,
//             'Content-Type': 'application/json'
//           }
//         });
        
//         if (response.ok) {
//           const data = await response.json();
//           if (data.success) {
//             setReports(data.data || []);
//           } else {
//             setError(data.message || 'Failed to load reports');
//           }
//         } else {
//           setError('Failed to fetch reports: ' + response.statusText);
//         }
//       } catch (error) {
//         console.error('Network error:', error);
//         setError('Error loading reports. Please try again.');
//       } finally {
//         setLoading(false);
//       }
//     };
    
//     if (currentUser) {
//       fetchUserReports();
//     }
//   }, [currentUser]);

//   // Get unique animal types for filter
//   const animalTypes = useMemo(() => {
//     const types = new Set<string>();
//     reports.forEach(report => {
//       if (report.animal_type) {
//         types.add(report.animal_type);
//       }
//     });
//     return Array.from(types).sort();
//   }, [reports]);

//   // Get unique statuses for filter
//   const statuses = useMemo(() => {
//     const statusSet = new Set<string>();
//     reports.forEach(report => {
//       if (report.status_name) {
//         statusSet.add(report.status_name);
//       }
//     });
//     return Array.from(statusSet).sort();
//   }, [reports]);

//   // Filter reports based on search and filters
//   const filteredReports = useMemo(() => {
//     return reports.filter(report => {
//       // Search term filter
//       const searchLower = searchTerm.toLowerCase();
//       const matchesSearch = searchTerm === '' || 
//         report.description.toLowerCase().includes(searchLower) ||
//         report.location_address.toLowerCase().includes(searchLower) ||
//         report.animal_type.toLowerCase().includes(searchLower) ||
//         report.animal_condition.toLowerCase().includes(searchLower) ||
//         report.report_id.toString().includes(searchTerm);

//       // Status filter
//       const matchesStatus = statusFilter === 'all' || 
//         report.status_name === statusFilter;

//       // Animal type filter
//       const matchesAnimalType = animalTypeFilter === 'all' || 
//         report.animal_type === animalTypeFilter;

//       // Date filter
//       const matchesDate = dateFilter === 'all' || isWithinDateRange(report.submitted_at, dateFilter);

//       return matchesSearch && matchesStatus && matchesAnimalType && matchesDate;
//     });
//   }, [reports, searchTerm, statusFilter, animalTypeFilter, dateFilter]);

//   // Pagination calculations
//   const totalFilteredReports = filteredReports.length;
//   const totalPages = Math.ceil(totalFilteredReports / reportsPerPage);
  
//   // Get current reports for the page
//   const indexOfLastReport = currentPage * reportsPerPage;
//   const indexOfFirstReport = indexOfLastReport - reportsPerPage;
//   const currentReports = filteredReports.slice(indexOfFirstReport, indexOfLastReport);

//   // Reset to first page when filters change
//   useEffect(() => {
//     setCurrentPage(1);
//   }, [searchTerm, statusFilter, animalTypeFilter, dateFilter, reportsPerPage]);

//   const isWithinDateRange = (dateString: string, range: string): boolean => {
//     const reportDate = new Date(dateString);
//     const now = new Date();
//     const diffTime = now.getTime() - reportDate.getTime();
//     const diffDays = diffTime / (1000 * 60 * 60 * 24);

//     switch(range) {
//       case 'today':
//         return diffDays < 1;
//       case 'week':
//         return diffDays < 7;
//       case 'month':
//         return diffDays < 30;
//       case '3months':
//         return diffDays < 90;
//       case '6months':
//         return diffDays < 180;
//       default:
//         return true;
//     }
//   };

//   const handleViewDetails = (report: Report) => {
//     setSelectedReport(report);
//     setIsModalOpen(true);
//   };

//   const handleEditClick = (report: Report, e: React.MouseEvent) => {
//     e.stopPropagation();
//     setEditingReport(report);
//     setIsEditModalOpen(true);
//   };

//   const handleSaveReport = async (updatedReport: Report) => {
//     try {
//       const token = sessionStorage.getItem('token') || localStorage.getItem('token');
      
//       const response = await fetch(`http://localhost:5000/api/reports/${updatedReport.report_id}`, {
//         method: 'PATCH',
//         headers: {
//           'Authorization': `Bearer ${token}`,
//           'Content-Type': 'application/json'
//         },
//         body: JSON.stringify({
//           description: updatedReport.description,
//           location_address: updatedReport.location_address
//         })
//       });

//       if (response.ok) {
//         const data = await response.json();
//         if (data.success) {
//           setReports(prev => prev.map(report => 
//             report.report_id === updatedReport.report_id 
//               ? { ...report, ...updatedReport }
//               : report
//           ));
          
//           if (selectedReport?.report_id === updatedReport.report_id) {
//             setSelectedReport(updatedReport);
//           }
          
//           return;
//         } else {
//           throw new Error(data.message || 'Failed to update report');
//         }
//       } else {
//         const errorData = await response.json();
//         throw new Error(errorData.message || 'Failed to update report');
//       }
//     } catch (error) {
//       console.error('Error updating report:', error);
//       throw error;
//     }
//   };

//   const handleDeleteClick = (reportId: number, e: React.MouseEvent) => {
//     e.stopPropagation();
//     setReportToDelete(reportId);
//     setDeleteConfirmOpen(true);
//   };

//   const handleDeleteReport = async () => {
//     if (!reportToDelete || !currentUser) return;
    
//     try {
//       setIsDeleting(true);
//       const token = sessionStorage.getItem('token') || localStorage.getItem('token');
      
//       const response = await fetch(`http://localhost:5000/api/reports/${reportToDelete}`, {
//         method: 'DELETE',
//         headers: {
//           'Authorization': `Bearer ${token}`,
//           'Content-Type': 'application/json'
//         }
//       });
      
//       if (response.ok) {
//         const data = await response.json();
//         if (data.success) {
//           setReports(prev => prev.filter(report => report.report_id !== reportToDelete));
//           setDeleteConfirmOpen(false);
//           setReportToDelete(null);
//           setIsModalOpen(false);
//         } else {
//           toast.success(data.message || 'Failed to delete report');
//         }
//       } else {
//         toast.success('Failed to delete report');
//       }
//     } catch (error) {
//       console.error('Error deleting report:', error);
//       toast.success('Error deleting report. Please try again.');
//     } finally {
//       setIsDeleting(false);
//     }
//   };

//   // Pagination handlers
//   const handlePageChange = (pageNumber: number) => {
//     setCurrentPage(pageNumber);
//     window.scrollTo({ top: 0, behavior: 'smooth' });
//   };

//   const handlePrevPage = () => {
//     if (currentPage > 1) {
//       setCurrentPage(currentPage - 1);
//       window.scrollTo({ top: 0, behavior: 'smooth' });
//     }
//   };

//   const handleNextPage = () => {
//     if (currentPage < totalPages) {
//       setCurrentPage(currentPage + 1);
//       window.scrollTo({ top: 0, behavior: 'smooth' });
//     }
//   };

//   // Helper functions
//   const getAnimalEmoji = (animalType: string): string => {
//     const type = animalType?.toLowerCase() || '';
//     if (type.includes('dog')) return '🐶';
//     if (type.includes('cat')) return '🐱';
//     if (type.includes('bird')) return '🐦';
//     if (type.includes('rabbit') || type.includes('bunny')) return '🐰';
//     if (type.includes('hamster')) return '🐹';
//     if (type.includes('turtle') || type.includes('tortoise')) return '🐢';
//     if (type.includes('horse')) return '🐴';
//     if (type.includes('cow')) return '🐮';
//     if (type.includes('goat')) return '🐐';
//     if (type.includes('sheep')) return '🐑';
//     return '🐾';
//   };

//   const formatDate = (dateString: string): string => {
//     const date = new Date(dateString);
//     return date.toLocaleDateString('en-US', {
//       month: 'short',
//       day: 'numeric',
//       year: 'numeric'
//     });
//   };

//   const formatTime = (dateString: string): string => {
//     const date = new Date(dateString);
//     return date.toLocaleTimeString('en-US', {
//       hour: '2-digit',
//       minute: '2-digit'
//     });
//   };

//   const getStatusDisplay = (statusName?: string): string => {
//     if (!statusName) return 'Unknown';
//     return statusName
//       .replace(/_/g, ' ')
//       .replace(/\b\w/g, char => char.toUpperCase());
//   };

//   const getStatusClass = (statusName?: string): string => {
//     const name = statusName?.toLowerCase() || '';
//     if (name.includes('submitted')) return 'submitted';
//     if (name.includes('review')) return 'review';
//     if (name.includes('progress')) return 'progress';
//     if (name.includes('completed')) return 'completed';
//     if (name.includes('cancelled') || name.includes('declined')) return 'cancelled';
//     return 'unknown';
//   };

//   const isReportEditable = (statusId: number): boolean => {
//     return statusId === 1; // Only editable if status is "Submitted"
//   };

//   if (!currentUser) {
//     return (
//       <div className="my-reports-container">
//         <div className="no-access">
//           <h2>Access Denied</h2>
//           <p>Please log in to view your reports.</p>
//           <Link to="/login" className="login-link">
//             Go to Login
//           </Link>
//         </div>
//       </div>
//     );
//   }

//   return (
//     <div className="my-reports-container">
//       <div className="reports-header">
//         <div>
//           <h1 className="page-title">My Reports</h1>
//           <p className="page-subtitle">
//             All your submitted animal rescue reports
//           </p>
//         </div>
//         <Link to="/create-report" className="new-report-btn">
//           + New Report
//         </Link>
//       </div>

//       {/* Search and Filter Section */}
//       <div className="search-filter-section">
//         <div className="search-box">
//           <div className="search-icon">🔍</div>
//           <input
//             type="text"
//             placeholder="Search reports by ID, description, location, animal type..."
//             value={searchTerm}
//             onChange={(e) => setSearchTerm(e.target.value)}
//             className="search-input"
//           />
//           {searchTerm && (
//             <button 
//               onClick={() => setSearchTerm('')}
//               className="clear-search-btn"
//             >
//               ✕
//             </button>
//           )}
//         </div>

//         <div className="filter-row">
//           <div className="filter-group">
//             <label className="filter-label">Status:</label>
//             <select 
//               value={statusFilter} 
//               onChange={(e) => setStatusFilter(e.target.value)}
//               className="filter-select"
//             >
//               <option value="all">All Statuses</option>
//               {statuses.map(status => (
//                 <option key={status} value={status}>
//                   {getStatusDisplay(status)}
//                 </option>
//               ))}
//             </select>
//           </div>

//           <div className="filter-group">
//             <label className="filter-label">Animal Type:</label>
//             <select 
//               value={animalTypeFilter} 
//               onChange={(e) => setAnimalTypeFilter(e.target.value)}
//               className="filter-select"
//             >
//               <option value="all">All Animals</option>
//               {animalTypes.map(type => (
//                 <option key={type} value={type}>{type}</option>
//               ))}
//             </select>
//           </div>

//           <div className="filter-group">
//             <label className="filter-label">Date Range:</label>
//             <select 
//               value={dateFilter} 
//               onChange={(e) => setDateFilter(e.target.value)}
//               className="filter-select"
//             >
//               <option value="all">All Time</option>
//               <option value="today">Today</option>
//               <option value="week">Last 7 Days</option>
//               <option value="month">Last 30 Days</option>
//               <option value="3months">Last 3 Months</option>
//               <option value="6months">Last 6 Months</option>
//             </select>
//           </div>

//           <div className="filter-group">
//             <label className="filter-label">Reports per page:</label>
//             <select 
//               value={reportsPerPage} 
//               onChange={(e) => setReportsPerPage(Number(e.target.value))}
//               className="filter-select"
//             >
//               <option value="5">5</option>
//               <option value="10">10</option>
//               <option value="20">20</option>
//               <option value="50">50</option>
//             </select>
//           </div>
//         </div>

//         <div className="results-summary">
//           Showing {filteredReports.length === 0 ? 0 : indexOfFirstReport + 1}-{Math.min(indexOfLastReport, totalFilteredReports)} of {totalFilteredReports} reports
//           {searchTerm && ` matching "${searchTerm}"`}
//         </div>
//       </div>

//       <div className="reports-list-section">
//         {loading ? (
//           <div className="loading-container">
//             <div className="loading-spinner"></div>
//             <p>Loading your reports...</p>
//           </div>
//         ) : error ? (
//           <div className="error-container">
//             <div className="error-icon">⚠️</div>
//             <h3 className="error-title">Unable to Load Reports</h3>
//             <p className="error-message">{error}</p>
//             <button 
//               onClick={() => window.location.reload()} 
//               className="retry-btn"
//             >
//               Try Again
//             </button>
//           </div>
//         ) : filteredReports.length > 0 ? (
//           <>
//             <div className="reports-list-view">
//               <div className="reports-list">
//                 {currentReports.map(report => {
//                   const editable = isReportEditable(report.status_id);
//                   const statusClass = getStatusClass(report.status_name);
//                   const statusText = getStatusDisplay(report.status_name);
                  
//                   return (
//                     <div 
//                       key={report.report_id} 
//                       className="report-card"
//                     >
//                       <div className="report-card-header">
//                         <div className="report-card-left">
//                           <span className="animal-emoji-large">
//                             {getAnimalEmoji(report.animal_type)}
//                           </span>
//                           <div>
//                             <h4 className="report-title">
//                               Report #{report.report_id} - {report.animal_type}
//                             </h4>
//                             <div className="report-meta">
//                               <span className="report-meta-item">
//                                 📍 {report.location_address.substring(0, 30)}
//                                 {report.location_address.length > 30 ? '...' : ''}
//                               </span>
//                               <span className="report-meta-item">
//                                 📅 {formatDate(report.submitted_at)} at {formatTime(report.submitted_at)}
//                               </span>
//                             </div>
//                           </div>
//                         </div>
//                         <div className="report-card-right">
//                           <span className={`status-badge status-${statusClass}`}>
//                             {statusText}
//                           </span>
//                         </div>
//                       </div>
                      
//                       <div className="report-card-body">
//                         <p className="report-description">
//                           {report.description.substring(0, 120)}
//                           {report.description.length > 120 ? '...' : ''}
//                         </p>
//                         <div className="report-card-actions">
//                           <button 
//                             onClick={() => handleViewDetails(report)}
//                             className="view-detail-btn"
//                           >
//                             View Details
//                           </button>
//                           {editable && (
//                             <>
//                               <button 
//                                 onClick={(e) => handleEditClick(report, e)}
//                                 className="edit-btn"
//                               >
//                                 Edit
//                               </button>
//                               <button 
//                                 onClick={(e) => handleDeleteClick(report.report_id, e)}
//                                 className="delete-btn"
//                               >
//                                 Delete
//                               </button>
//                             </>
//                           )}
//                         </div>
//                       </div>
//                     </div>
//                   );
//                 })}
//               </div>
//             </div>

//             {/* Pagination Controls */}
//             {totalPages > 1 && (
//               <div className="pagination-container">
//                 <div className="pagination-controls">
//                   <button
//                     onClick={handlePrevPage}
//                     disabled={currentPage === 1}
//                     className="pagination-btn prev-btn"
//                   >
//                     ← Previous
//                   </button>
                  
//                   <div className="page-numbers">
//                     {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => {
//                       // Show limited page numbers for better UX
//                       if (
//                         page === 1 ||
//                         page === totalPages ||
//                         (page >= currentPage - 1 && page <= currentPage + 1)
//                       ) {
//                         return (
//                           <button
//                             key={page}
//                             onClick={() => handlePageChange(page)}
//                             className={`page-number ${currentPage === page ? 'active' : ''}`}
//                           >
//                             {page}
//                           </button>
//                         );
//                       } else if (
//                         page === currentPage - 2 ||
//                         page === currentPage + 2
//                       ) {
//                         return <span key={page} className="page-dots">...</span>;
//                       }
//                       return null;
//                     })}
//                   </div>
                  
//                   <button
//                     onClick={handleNextPage}
//                     disabled={currentPage === totalPages}
//                     className="pagination-btn next-btn"
//                   >
//                     Next →
//                   </button>
//                 </div>
//                 <div className="pagination-info">
//                   Page {currentPage} of {totalPages} • {reportsPerPage} reports per page
//                 </div>
//               </div>
//             )}
//           </>
//         ) : (
//           <div className="empty-state">
//             <div className="empty-icon">🔍</div>
//             <h3 className="empty-title">No Reports Found</h3>
//             <p className="empty-message">
//               {searchTerm || statusFilter !== 'all' || animalTypeFilter !== 'all' || dateFilter !== 'all'
//                 ? 'No reports match your search criteria. Try adjusting your filters.'
//                 : 'You haven\'t submitted any reports yet. Start by creating your first report!'}
//             </p>
//             {(searchTerm || statusFilter !== 'all' || animalTypeFilter !== 'all' || dateFilter !== 'all') && (
//               <button 
//                 onClick={() => {
//                   setSearchTerm('');
//                   setStatusFilter('all');
//                   setAnimalTypeFilter('all');
//                   setDateFilter('all');
//                 }}
//                 className="empty-action-btn"
//               >
//                 Clear All Filters
//               </button>
//             )}
//             {!searchTerm && statusFilter === 'all' && animalTypeFilter === 'all' && dateFilter === 'all' && (
//               <Link to="/create-report" className="empty-action-btn">
//                 Submit Your First Report
//               </Link>
//             )}
//           </div>
//         )}
//       </div>

//       {/* View Details Modal */}
//       <ReportDetailModal 
//         report={selectedReport} 
//         isOpen={isModalOpen} 
//         onClose={() => setIsModalOpen(false)}
//       />

//       {/* Edit Modal */}
//       <EditReportModal
//         report={editingReport}
//         isOpen={isEditModalOpen}
//         onClose={() => setIsEditModalOpen(false)}
//         onSave={handleSaveReport}
//       />

//       {/* Delete Confirmation Modal */}
//       {deleteConfirmOpen && (
//         <div className="modal-overlay">
//           <div className="modal-content delete-confirm-modal">
//             <div className="modal-header">
//               <h3 className="modal-title">Confirm Delete</h3>
//               <button 
//                 className="modal-close" 
//                 onClick={() => setDeleteConfirmOpen(false)}
//                 disabled={isDeleting}
//               >
//                 ×
//               </button>
//             </div>
//             <div className="modal-body">
//               <div className="delete-warning">
//                 <div className="warning-icon">⚠️</div>
//                 <h4>Are you sure you want to delete this report?</h4>
//                 <p>This action cannot be undone. The report will be permanently removed.</p>
//               </div>
//             </div>
//             <div className="modal-footer">
//               <button 
//                 className="modal-btn secondary" 
//                 onClick={() => setDeleteConfirmOpen(false)}
//                 disabled={isDeleting}
//               >
//                 Cancel
//               </button>
//               <button 
//                 className="modal-btn delete-btn" 
//                 onClick={handleDeleteReport}
//                 disabled={isDeleting}
//               >
//                 {isDeleting ? 'Deleting...' : 'Delete Report'}
//               </button>
//             </div>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default MyReports;

// import React, { useState, useEffect, useMemo } from 'react';
// import { Link } from 'react-router-dom';
// import { useAuth } from '../../../context/AuthContext';
// import './MyReports.css';

// // Interfaces for evidence and completion notes
// interface TaskProof {
//   proof_id: number;
//   task_id: number;
//   proof_url: string;
//   uploaded_at: string;
// }

// interface CompletionNote {
//   note_id: number;
//   task_id: number;
//   volunteer_id: number;
//   note_text: string;
//   created_at: string;
//   volunteer_name?: string;
// }

// interface Report {
//   report_id: number;
//   user_id: number;
//   description: string;
//   location_address: string;
//   submitted_at: string;
//   animal_type: string;
//   animal_condition: string;
//   status_id: number;
//   status_name?: string;
//   reporter_name?: string;
//   reporter_phone?: string | null;
//   email?: string;
//   // Task related fields
//   task_id?: number;
//   volunteer_name?: string;
//   volunteer_email?: string;
//   volunteer_phone?: string;
//   completed_at?: string;
// }

// // Helper function for image URLs
// const getFullImageUrl = (proofUrl: string): string => {
//   if (!proofUrl) return '';
//   if (proofUrl.startsWith('http://') || proofUrl.startsWith('https://')) {
//     return proofUrl;
//   }
//   const baseUrl = 'http://localhost:5000';
//   let cleanUrl = proofUrl.replace(/^\/+/, '');
//   if (cleanUrl.startsWith('uploads/')) {
//     return `${baseUrl}/${cleanUrl}`;
//   }
//   return `${baseUrl}/uploads/${cleanUrl}`;
// };

// // Helper function for animal emoji
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
//   return '🐾';
// };

// // Helper function for status display
// const getStatusDisplay = (statusName?: string): string => {
//   if (!statusName) return 'Unknown';
//   return statusName
//     .replace(/_/g, ' ')
//     .replace(/\b\w/g, char => char.toUpperCase());
// };

// const getStatusClass = (statusName?: string): string => {
//   const name = statusName?.toLowerCase() || '';
//   if (name.includes('submitted')) return 'submitted';
//   if (name.includes('review')) return 'review';
//   if (name.includes('progress')) return 'progress';
//   if (name.includes('completed')) return 'completed';
//   if (name.includes('cancelled') || name.includes('declined')) return 'cancelled';
//   return 'unknown';
// };

// // Helper function for date formatting
// const formatDate = (dateString: string | undefined): string => {
//   if (!dateString) return 'Not available';
//   try {
//     const date = new Date(dateString);
//     return date.toLocaleDateString('en-US', {
//       month: 'short',
//       day: 'numeric',
//       year: 'numeric',
//       hour: '2-digit',
//       minute: '2-digit'
//     });
//   } catch {
//     return 'Invalid date';
//   }
// };

// // Helper function for short date formatting
// const formatShortDate = (dateString: string): string => {
//   const date = new Date(dateString);
//   return date.toLocaleDateString('en-US', {
//     month: 'short',
//     day: 'numeric',
//     year: 'numeric'
//   });
// };

// // Helper function for phone formatting
// const hasPhone = (phone?: string | null): boolean => {
//   if (phone === null || phone === undefined) return false;
//   if (typeof phone !== 'string') return false;
//   return phone.trim().length > 0;
// };

// const formatPhoneNumber = (phone?: string | null): string => {
//   if (!hasPhone(phone)) return 'Not provided';
//   const phoneStr = String(phone).trim();
//   const cleaned = phoneStr.replace(/\D/g, '');
//   if (cleaned.length === 10) return `+977 ${cleaned}`;
//   return phoneStr;
// };

// // =============================================
// // Enhanced Report Detail Modal Component
// // =============================================
// const ReportDetailModal: React.FC<{
//   report: Report | null;
//   isOpen: boolean;
//   onClose: () => void;
// }> = ({ report, isOpen, onClose }) => {
//   const [evidence, setEvidence] = useState<TaskProof[]>([]);
//   const [completionNotes, setCompletionNotes] = useState<CompletionNote[]>([]);
//   const [loading, setLoading] = useState(false);
//   const [selectedImage, setSelectedImage] = useState<string | null>(null);
//   const [imageErrors, setImageErrors] = useState<Record<number, boolean>>({});

//   useEffect(() => {
//     if (isOpen && report?.task_id && report.status_id === 4) {
//       fetchEvidenceAndNotes(report.task_id);
//     } else {
//       setEvidence([]);
//       setCompletionNotes([]);
//       setImageErrors({});
//     }
//   }, [isOpen, report]);

//   const fetchEvidenceAndNotes = async (taskId: number) => {
//     setLoading(true);
//     const token = sessionStorage.getItem('token') || localStorage.getItem('token');
    
//     try {
//       // Fetch evidence
//       const evidenceRes = await fetch(`http://localhost:5000/api/tasks/${taskId}/evidence`, {
//         headers: { 'Authorization': `Bearer ${token}` }
//       });
//       const evidenceData = await evidenceRes.json();
//       if (evidenceData.success) setEvidence(evidenceData.data || []);

//       // Fetch notes
//       const notesRes = await fetch(`http://localhost:5000/api/tasks/${taskId}/completion-notes`, {
//         headers: { 'Authorization': `Bearer ${token}` }
//       });
//       const notesData = await notesRes.json();
//       if (notesData.success) setCompletionNotes(notesData.data || []);
//     } catch (error) {
//       console.error('Error fetching data:', error);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleImageError = (proofId: number) => {
//     setImageErrors(prev => ({ ...prev, [proofId]: true }));
//   };

//   if (!isOpen || !report) return null;

//   const isCompleted = report.status_id === 4;
//   const hasEvidence = evidence.length > 0;
//   const hasNotes = completionNotes.length > 0;

//   return (
//     <div className="modal-overlay" onClick={onClose}>
//       <div className="modal-content report-detail-modal" onClick={e => e.stopPropagation()}>
//         {/* Header */}
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
//           {/* Status Bar */}
//           <div className="status-bar">
//             <span className={`status-badge-large status-${getStatusClass(report.status_name)}`}>
//               {getStatusDisplay(report.status_name)}
//             </span>
//             {report.task_id && (
//               <span className="task-id-badge">Task #{report.task_id}</span>
//             )}
//           </div>

//           {/* Compact Info Grid */}
//           <div className="compact-info-grid">
//             {/* Reporter Info */}
//             <div className="info-block">
//               <div className="info-block-header">👤 Reporter</div>
//               <div className="info-block-content">
//                 <div><strong>{report.reporter_name || 'Anonymous'}</strong></div>
//                 {report.email && <div className="info-small">{report.email}</div>}
//                 {hasPhone(report.reporter_phone) && (
//                   <div className="info-small">{formatPhoneNumber(report.reporter_phone)}</div>
//                 )}
//               </div>
//             </div>

//             {/* Animal Info */}
//             <div className="info-block">
//               <div className="info-block-header">🐾 Animal</div>
//               <div className="info-block-content">
//                 <div><strong>{report.animal_type}</strong></div>
//                 <div className="info-small">{report.animal_condition}</div>
//               </div>
//             </div>

//             {/* Location & Timeline */}
//             <div className="info-block">
//               <div className="info-block-header">📍 Location</div>
//               <div className="info-block-content">
//                 <div>{report.location_address}</div>
//                 <div className="info-small">
//                   📅 {new Date(report.submitted_at).toLocaleDateString()}
//                 </div>
//               </div>
//             </div>

//             {/* Volunteer Info (if assigned) */}
//             {report.volunteer_name && (
//               <div className="info-block">
//                 <div className="info-block-header">🦸 Ranger</div>
//                 <div className="info-block-content">
//                   <div><strong>{report.volunteer_name}</strong></div>
//                   {report.volunteer_phone && (
//                     <div className="info-small">{report.volunteer_phone}</div>
//                   )}
//                 </div>
//               </div>
//             )}
//           </div>

//           {/* Description */}
//           <div className="description-compact">
//             <div className="description-compact-header">📝 Description</div>
//             <p>{report.description}</p>
//           </div>

//           {/* Evidence Section - Only for completed reports */}
//           {isCompleted && (
//             <div className="evidence-section-compact">
//               <div className="evidence-section-header">
//                 <span>📸 Evidence Photos</span>
//                 {hasEvidence && <span className="evidence-count">{evidence.length}</span>}
//               </div>
              
//               {loading ? (
//                 <div className="loading-mini">Loading...</div>
//               ) : hasEvidence ? (
//                 <div className="evidence-grid-compact">
//                   {evidence.map((proof) => {
//                     const imageUrl = getFullImageUrl(proof.proof_url);
//                     const hasError = imageErrors[proof.proof_id];
                    
//                     return (
//                       <div 
//                         key={proof.proof_id} 
//                         className="evidence-item-compact"
//                         onClick={() => !hasError && setSelectedImage(imageUrl)}
//                       >
//                         {!hasError ? (
//                           <img 
//                             src={imageUrl} 
//                             alt={`Evidence`}
//                             onError={() => handleImageError(proof.proof_id)}
//                           />
//                         ) : (
//                           <div className="evidence-placeholder">📷</div>
//                         )}
//                       </div>
//                     );
//                   })}
//                 </div>
//               ) : (
//                 <div className="empty-mini">No evidence photos</div>
//               )}
//             </div>
//           )}

//           {/* Notes Section - Only for completed reports */}
//           {isCompleted && (
//             <div className="notes-section-compact">
//               <div className="notes-section-header">
//                 <span>✅ Rescue Notes</span>
//                 {hasNotes && <span className="notes-count">{completionNotes.length}</span>}
//               </div>
              
//               {loading ? (
//                 <div className="loading-mini">Loading...</div>
//               ) : hasNotes ? (
//                 <div className="notes-list-compact">
//                   {completionNotes.map((note) => (
//                     <div key={note.note_id} className="note-item-compact">
//                       <div className="note-header-compact">
//                         <span className="note-author">{note.volunteer_name || 'Volunteer'}</span>
//                         <span className="note-time">{formatDate(note.created_at)}</span>
//                       </div>
//                       <p className="note-text-compact">{note.note_text}</p>
//                     </div>
//                   ))}
//                 </div>
//               ) : (
//                 <div className="empty-mini">No notes available</div>
//               )}
//             </div>
//           )}
//         </div>

//         {/* Image Lightbox */}
//         {selectedImage && (
//           <div className="lightbox" onClick={() => setSelectedImage(null)}>
//             <img src={selectedImage} alt="Enlarged evidence" />
//             <button className="lightbox-close" onClick={() => setSelectedImage(null)}>×</button>
//           </div>
//         )}
        
//         <div className="modal-footer">
//           <button className="modal-btn secondary" onClick={onClose}>Close</button>
//         </div>
//       </div>
//     </div>
//   );
// };

// // =============================================
// // Edit Report Modal (unchanged)
// // =============================================
// const EditReportModal: React.FC<{
//   report: Report | null;
//   isOpen: boolean;
//   onClose: () => void;
//   onSave: (updatedReport: Report) => Promise<void>;
// }> = ({ report, isOpen, onClose, onSave }) => {
//   const [description, setDescription] = useState('');
//   const [location, setLocation] = useState('');
//   const [isSaving, setIsSaving] = useState(false);
//   const [error, setError] = useState<string | null>(null);

//   useEffect(() => {
//     if (report) {
//       setDescription(report.description);
//       setLocation(report.location_address);
//       setError(null);
//     }
//   }, [report]);

//   if (!isOpen || !report) return null;

//   const validateForm = (): boolean => {
//     if (description.trim().length < 10) {
//       setError('Description must be at least 10 characters');
//       return false;
//     }
//     if (location.trim().length < 5) {
//       setError('Location must be at least 5 characters');
//       return false;
//     }
//     if (description.trim() === report.description && location.trim() === report.location_address) {
//       setError('No changes made');
//       return false;
//     }
//     return true;
//   };

//   const handleSave = async () => {
//     setError(null);
//     if (!validateForm()) return;
    
//     setIsSaving(true);
//     try {
//       const updatedReport = {
//         ...report,
//         description: description.trim(),
//         location_address: location.trim()
//       };
//       await onSave(updatedReport);
//       onClose();
//     } catch (err) {
//       setError(err instanceof Error ? err.message : 'Failed to save');
//     } finally {
//       setIsSaving(false);
//     }
//   };

//   return (
//     <div className="modal-overlay" onClick={onClose}>
//       <div className="modal-content edit-modal" onClick={e => e.stopPropagation()}>
//         <div className="modal-header">
//           <div className="modal-header-left">
//             <span className="modal-animal-emoji">✏️</span>
//             <div>
//               <h3 className="modal-title">Edit Report #{report.report_id}</h3>
//               <p className="modal-subtitle">{report.animal_type}</p>
//             </div>
//           </div>
//           <button className="modal-close" onClick={onClose} disabled={isSaving}>×</button>
//         </div>
        
//         <div className="modal-body">
//           {error && <div className="edit-error-message">{error}</div>}
          
//           <div className="form-group">
//             <label>Description</label>
//             <textarea
//               value={description}
//               onChange={(e) => setDescription(e.target.value)}
//               rows={4}
//               disabled={isSaving}
//             />
//           </div>

//           <div className="form-group">
//             <label>Location</label>
//             <textarea
//               value={location}
//               onChange={(e) => setLocation(e.target.value)}
//               rows={2}
//               disabled={isSaving}
//             />
//           </div>
//         </div>
        
//         <div className="modal-footer">
//           <button className="modal-btn secondary" onClick={onClose} disabled={isSaving}>Cancel</button>
//           <button className="modal-btn primary" onClick={handleSave} disabled={isSaving}>
//             {isSaving ? 'Saving...' : 'Save Changes'}
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// };

// // =============================================
// // Main MyReports Component (with original table/list view)
// // =============================================
// const MyReports: React.FC = () => {
//   const [reports, setReports] = useState<Report[]>([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState<string | null>(null);
//   const [selectedReport, setSelectedReport] = useState<Report | null>(null);
//   const [editingReport, setEditingReport] = useState<Report | null>(null);
//   const [isModalOpen, setIsModalOpen] = useState(false);
//   const [isEditModalOpen, setIsEditModalOpen] = useState(false);
//   const [deleteConfirmOpen, setDeleteConfirmOpen] = useState(false);
//   const [reportToDelete, setReportToDelete] = useState<number | null>(null);
//   const [isDeleting, setIsDeleting] = useState(false);
  
//   // Search and Filter states
//   const [searchTerm, setSearchTerm] = useState('');
//   const [statusFilter, setStatusFilter] = useState<string>('all');
//   const [animalTypeFilter, setAnimalTypeFilter] = useState<string>('all');
//   const [dateFilter, setDateFilter] = useState<string>('all');
  
//   // Pagination states
//   const [currentPage, setCurrentPage] = useState(1);
//   const [reportsPerPage, setReportsPerPage] = useState(10);
  
//   const { user: currentUser } = useAuth();

//   // Fetch user's reports
//   useEffect(() => {
//     const fetchUserReports = async () => {
//       if (!currentUser) return;
      
//       try {
//         setLoading(true);
//         setError(null);
//         const token = sessionStorage.getItem('token') || localStorage.getItem('token');
        
//         const response = await fetch('http://localhost:5000/api/reports/my-reports', {
//           headers: {
//             'Authorization': `Bearer ${token}`,
//             'Content-Type': 'application/json'
//           }
//         });
        
//         if (response.ok) {
//           const data = await response.json();
//           if (data.success) {
//             setReports(data.data || []);
//           } else {
//             setError(data.message || 'Failed to load reports');
//           }
//         } else {
//           setError('Failed to fetch reports: ' + response.statusText);
//         }
//       } catch (error) {
//         console.error('Network error:', error);
//         setError('Error loading reports. Please try again.');
//       } finally {
//         setLoading(false);
//       }
//     };
    
//     if (currentUser) {
//       fetchUserReports();
//     }
//   }, [currentUser]);

//   // Get unique animal types for filter
//   const animalTypes = useMemo(() => {
//     const types = new Set<string>();
//     reports.forEach(report => {
//       if (report.animal_type) {
//         types.add(report.animal_type);
//       }
//     });
//     return Array.from(types).sort();
//   }, [reports]);

//   // Get unique statuses for filter
//   const statuses = useMemo(() => {
//     const statusSet = new Set<string>();
//     reports.forEach(report => {
//       if (report.status_name) {
//         statusSet.add(report.status_name);
//       }
//     });
//     return Array.from(statusSet).sort();
//   }, [reports]);

//   // Filter reports based on search and filters
//   const filteredReports = useMemo(() => {
//     return reports.filter(report => {
//       // Search term filter
//       const searchLower = searchTerm.toLowerCase();
//       const matchesSearch = searchTerm === '' || 
//         report.description.toLowerCase().includes(searchLower) ||
//         report.location_address.toLowerCase().includes(searchLower) ||
//         report.animal_type.toLowerCase().includes(searchLower) ||
//         report.animal_condition.toLowerCase().includes(searchLower) ||
//         report.report_id.toString().includes(searchTerm);

//       // Status filter
//       const matchesStatus = statusFilter === 'all' || 
//         report.status_name === statusFilter;

//       // Animal type filter
//       const matchesAnimalType = animalTypeFilter === 'all' || 
//         report.animal_type === animalTypeFilter;

//       // Date filter
//       const matchesDate = dateFilter === 'all' || isWithinDateRange(report.submitted_at, dateFilter);

//       return matchesSearch && matchesStatus && matchesAnimalType && matchesDate;
//     });
//   }, [reports, searchTerm, statusFilter, animalTypeFilter, dateFilter]);

//   // Pagination calculations
//   const totalFilteredReports = filteredReports.length;
//   const totalPages = Math.ceil(totalFilteredReports / reportsPerPage);
  
//   // Get current reports for the page
//   const indexOfLastReport = currentPage * reportsPerPage;
//   const indexOfFirstReport = indexOfLastReport - reportsPerPage;
//   const currentReports = filteredReports.slice(indexOfFirstReport, indexOfLastReport);

//   // Reset to first page when filters change
//   useEffect(() => {
//     setCurrentPage(1);
//   }, [searchTerm, statusFilter, animalTypeFilter, dateFilter, reportsPerPage]);

//   const isWithinDateRange = (dateString: string, range: string): boolean => {
//     const reportDate = new Date(dateString);
//     const now = new Date();
//     const diffTime = now.getTime() - reportDate.getTime();
//     const diffDays = diffTime / (1000 * 60 * 60 * 24);

//     switch(range) {
//       case 'today':
//         return diffDays < 1;
//       case 'week':
//         return diffDays < 7;
//       case 'month':
//         return diffDays < 30;
//       case '3months':
//         return diffDays < 90;
//       case '6months':
//         return diffDays < 180;
//       default:
//         return true;
//     }
//   };

//   const handleViewDetails = (report: Report) => {
//     setSelectedReport(report);
//     setIsModalOpen(true);
//   };

//   const handleEditClick = (report: Report, e: React.MouseEvent) => {
//     e.stopPropagation();
//     setEditingReport(report);
//     setIsEditModalOpen(true);
//   };

//   const handleSaveReport = async (updatedReport: Report) => {
//     try {
//       const token = sessionStorage.getItem('token') || localStorage.getItem('token');
      
//       const response = await fetch(`http://localhost:5000/api/reports/${updatedReport.report_id}`, {
//         method: 'PATCH',
//         headers: {
//           'Authorization': `Bearer ${token}`,
//           'Content-Type': 'application/json'
//         },
//         body: JSON.stringify({
//           description: updatedReport.description,
//           location_address: updatedReport.location_address
//         })
//       });

//       if (response.ok) {
//         const data = await response.json();
//         if (data.success) {
//           setReports(prev => prev.map(report => 
//             report.report_id === updatedReport.report_id 
//               ? { ...report, ...updatedReport }
//               : report
//           ));
          
//           if (selectedReport?.report_id === updatedReport.report_id) {
//             setSelectedReport(updatedReport);
//           }
          
//           return;
//         } else {
//           throw new Error(data.message || 'Failed to update report');
//         }
//       } else {
//         const errorData = await response.json();
//         throw new Error(errorData.message || 'Failed to update report');
//       }
//     } catch (error) {
//       console.error('Error updating report:', error);
//       throw error;
//     }
//   };

//   const handleDeleteClick = (reportId: number, e: React.MouseEvent) => {
//     e.stopPropagation();
//     setReportToDelete(reportId);
//     setDeleteConfirmOpen(true);
//   };

//   const handleDeleteReport = async () => {
//     if (!reportToDelete || !currentUser) return;
    
//     try {
//       setIsDeleting(true);
//       const token = sessionStorage.getItem('token') || localStorage.getItem('token');
      
//       const response = await fetch(`http://localhost:5000/api/reports/${reportToDelete}`, {
//         method: 'DELETE',
//         headers: {
//           'Authorization': `Bearer ${token}`,
//           'Content-Type': 'application/json'
//         }
//       });
      
//       if (response.ok) {
//         const data = await response.json();
//         if (data.success) {
//           setReports(prev => prev.filter(report => report.report_id !== reportToDelete));
//           setDeleteConfirmOpen(false);
//           setReportToDelete(null);
//           setIsModalOpen(false);
//         } else {
//           toast.success(data.message || 'Failed to delete report');
//         }
//       } else {
//         toast.success('Failed to delete report');
//       }
//     } catch (error) {
//       console.error('Error deleting report:', error);
//       toast.success('Error deleting report. Please try again.');
//     } finally {
//       setIsDeleting(false);
//     }
//   };

//   // Pagination handlers
//   const handlePageChange = (pageNumber: number) => {
//     setCurrentPage(pageNumber);
//     window.scrollTo({ top: 0, behavior: 'smooth' });
//   };

//   const handlePrevPage = () => {
//     if (currentPage > 1) {
//       setCurrentPage(currentPage - 1);
//       window.scrollTo({ top: 0, behavior: 'smooth' });
//     }
//   };

//   const handleNextPage = () => {
//     if (currentPage < totalPages) {
//       setCurrentPage(currentPage + 1);
//       window.scrollTo({ top: 0, behavior: 'smooth' });
//     }
//   };

//   const isReportEditable = (statusId: number): boolean => {
//     return statusId === 1; // Only editable if status is "Submitted"
//   };

//   if (!currentUser) {
//     return (
//       <div className="my-reports-container">
//         <div className="no-access">
//           <h2>Access Denied</h2>
//           <p>Please log in to view your reports.</p>
//           <Link to="/login" className="login-link">
//             Go to Login
//           </Link>
//         </div>
//       </div>
//     );
//   }

//   return (
//     <div className="my-reports-container">
//       <div className="reports-header">
//         <div>
//           <h1 className="page-title">My Reports</h1>
//           <p className="page-subtitle">
//             All your submitted animal rescue reports
//           </p>
//         </div>
//         <Link to="/create-report" className="new-report-btn">
//           + New Report
//         </Link>
//       </div>

//       {/* Search and Filter Section */}
//       <div className="search-filter-section">
//         <div className="search-box">
//           <div className="search-icon">🔍</div>
//           <input
//             type="text"
//             placeholder="Search reports by ID, description, location, animal type..."
//             value={searchTerm}
//             onChange={(e) => setSearchTerm(e.target.value)}
//             className="search-input"
//           />
//           {searchTerm && (
//             <button 
//               onClick={() => setSearchTerm('')}
//               className="clear-search-btn"
//             >
//               ✕
//             </button>
//           )}
//         </div>

//         <div className="filter-row">
//           <div className="filter-group">
//             <label className="filter-label">Status:</label>
//             <select 
//               value={statusFilter} 
//               onChange={(e) => setStatusFilter(e.target.value)}
//               className="filter-select"
//             >
//               <option value="all">All Statuses</option>
//               {statuses.map(status => (
//                 <option key={status} value={status}>
//                   {getStatusDisplay(status)}
//                 </option>
//               ))}
//             </select>
//           </div>

//           <div className="filter-group">
//             <label className="filter-label">Animal Type:</label>
//             <select 
//               value={animalTypeFilter} 
//               onChange={(e) => setAnimalTypeFilter(e.target.value)}
//               className="filter-select"
//             >
//               <option value="all">All Animals</option>
//               {animalTypes.map(type => (
//                 <option key={type} value={type}>{type}</option>
//               ))}
//             </select>
//           </div>

//           <div className="filter-group">
//             <label className="filter-label">Date Range:</label>
//             <select 
//               value={dateFilter} 
//               onChange={(e) => setDateFilter(e.target.value)}
//               className="filter-select"
//             >
//               <option value="all">All Time</option>
//               <option value="today">Today</option>
//               <option value="week">Last 7 Days</option>
//               <option value="month">Last 30 Days</option>
//               <option value="3months">Last 3 Months</option>
//               <option value="6months">Last 6 Months</option>
//             </select>
//           </div>

//           <div className="filter-group">
//             <label className="filter-label">Per page:</label>
//             <select 
//               value={reportsPerPage} 
//               onChange={(e) => setReportsPerPage(Number(e.target.value))}
//               className="filter-select"
//             >
//               <option value="5">5</option>
//               <option value="10">10</option>
//               <option value="20">20</option>
//               <option value="50">50</option>
//             </select>
//           </div>
//         </div>

//         <div className="results-summary">
//           Showing {filteredReports.length === 0 ? 0 : indexOfFirstReport + 1}-{Math.min(indexOfLastReport, totalFilteredReports)} of {totalFilteredReports} reports
//           {searchTerm && ` matching "${searchTerm}"`}
//         </div>
//       </div>

//       <div className="reports-list-section">
//         {loading ? (
//           <div className="loading-container">
//             <div className="loading-spinner"></div>
//             <p>Loading your reports...</p>
//           </div>
//         ) : error ? (
//           <div className="error-container">
//             <div className="error-icon">⚠️</div>
//             <h3 className="error-title">Unable to Load Reports</h3>
//             <p className="error-message">{error}</p>
//             <button 
//               onClick={() => window.location.reload()} 
//               className="retry-btn"
//             >
//               Try Again
//             </button>
//           </div>
//         ) : filteredReports.length > 0 ? (
//           <>
//             <div className="simple-reports-list">
//               <table className="reports-table">
//                 <thead>
//                   <tr>
//                     <th>ID</th>
//                     <th>Animal</th>
//                     <th>Location</th>
//                     <th>Date</th>
//                     <th>Status</th>
//                     <th>Actions</th>
//                   </tr>
//                 </thead>
//                 <tbody>
//                   {currentReports.map(report => {
//                     const editable = isReportEditable(report.status_id);
//                     return (
//                       <tr key={report.report_id}>
//                         <td className="report-id">#{report.report_id}</td>
//                         <td className="animal-cell">
//                           <div className="animal-info">
//                             <span className="animal-emoji">{getAnimalEmoji(report.animal_type)}</span>
//                             <span className="animal-name">{report.animal_type || 'Unknown'}</span>
//                           </div>
//                         </td>
//                         <td className="location-cell">
//                           <div className="location-info">
//                             <span className="location-icon">📍</span>
//                             <span className="location-text">
//                               {report.location_address.length > 25 
//                                 ? `${report.location_address.substring(0, 25)}...` 
//                                 : report.location_address}
//                             </span>
//                           </div>
//                         </td>
//                         <td className="date-cell">{formatShortDate(report.submitted_at)}</td>
//                         <td>
//                           <span className={`status-badge status-${getStatusClass(report.status_name)}`}>
//                             {getStatusDisplay(report.status_name)}
//                           </span>
//                         </td>
//                         <td>
//                           <div className="action-buttons">
//                             <button 
//                               onClick={() => handleViewDetails(report)}
//                               className="view-detail-btn"
//                             >
//                               View
//                             </button>
//                             {editable && (
//                               <>
//                                 <button 
//                                   onClick={(e) => handleEditClick(report, e)}
//                                   className="edit-btn-small"
//                                 >
//                                   Edit
//                                 </button>
//                                 <button 
//                                   onClick={(e) => handleDeleteClick(report.report_id, e)}
//                                   className="delete-btn-small"
//                                 >
//                                   Delete
//                                 </button>
//                               </>
//                             )}
//                           </div>
//                         </td>
//                       </tr>
//                     );
//                   })}
//                 </tbody>
//               </table>
//             </div>

//             {/* Pagination Controls */}
//             {totalPages > 1 && (
//               <div className="pagination-container">
//                 <div className="pagination-controls">
//                   <button
//                     onClick={handlePrevPage}
//                     disabled={currentPage === 1}
//                     className="pagination-btn prev-btn"
//                   >
//                     ← Previous
//                   </button>
                  
//                   <div className="page-numbers">
//                     {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => {
//                       if (
//                         page === 1 ||
//                         page === totalPages ||
//                         (page >= currentPage - 1 && page <= currentPage + 1)
//                       ) {
//                         return (
//                           <button
//                             key={page}
//                             onClick={() => handlePageChange(page)}
//                             className={`page-number ${currentPage === page ? 'active' : ''}`}
//                           >
//                             {page}
//                           </button>
//                         );
//                       } else if (
//                         page === currentPage - 2 ||
//                         page === currentPage + 2
//                       ) {
//                         return <span key={page} className="page-dots">...</span>;
//                       }
//                       return null;
//                     })}
//                   </div>
                  
//                   <button
//                     onClick={handleNextPage}
//                     disabled={currentPage === totalPages}
//                     className="pagination-btn next-btn"
//                   >
//                     Next →
//                   </button>
//                 </div>
//                 <div className="pagination-info">
//                   Page {currentPage} of {totalPages}
//                 </div>
//               </div>
//             )}
//           </>
//         ) : (
//           <div className="empty-state">
//             <div className="empty-icon">📝</div>
//             <h3 className="empty-title">No Reports Found</h3>
//             <p className="empty-message">
//               {searchTerm || statusFilter !== 'all' || animalTypeFilter !== 'all' || dateFilter !== 'all'
//                 ? 'No reports match your search criteria. Try adjusting your filters.'
//                 : 'You haven\'t submitted any reports yet. Start by creating your first report!'}
//             </p>
//             {(searchTerm || statusFilter !== 'all' || animalTypeFilter !== 'all' || dateFilter !== 'all') && (
//               <button 
//                 onClick={() => {
//                   setSearchTerm('');
//                   setStatusFilter('all');
//                   setAnimalTypeFilter('all');
//                   setDateFilter('all');
//                 }}
//                 className="empty-action-btn"
//               >
//                 Clear All Filters
//               </button>
//             )}
//             {!searchTerm && statusFilter === 'all' && animalTypeFilter === 'all' && dateFilter === 'all' && (
//               <Link to="/create-report" className="empty-action-btn">
//                 Submit Your First Report
//               </Link>
//             )}
//           </div>
//         )}
//       </div>

//       {/* Enhanced View Details Modal */}
//       <ReportDetailModal 
//         report={selectedReport} 
//         isOpen={isModalOpen} 
//         onClose={() => setIsModalOpen(false)}
//       />

//       {/* Edit Modal */}
//       <EditReportModal
//         report={editingReport}
//         isOpen={isEditModalOpen}
//         onClose={() => setIsEditModalOpen(false)}
//         onSave={handleSaveReport}
//       />

//       {/* Delete Confirmation Modal */}
//       {deleteConfirmOpen && (
//         <div className="modal-overlay">
//           <div className="modal-content delete-confirm-modal">
//             <div className="modal-header">
//               <h3 className="modal-title">Confirm Delete</h3>
//               <button 
//                 className="modal-close" 
//                 onClick={() => setDeleteConfirmOpen(false)}
//                 disabled={isDeleting}
//               >
//                 ×
//               </button>
//             </div>
//             <div className="modal-body">
//               <div className="delete-warning">
//                 <div className="warning-icon">⚠️</div>
//                 <h4>Are you sure you want to delete this report?</h4>
//                 <p>This action cannot be undone. The report will be permanently removed.</p>
//               </div>
//             </div>
//             <div className="modal-footer">
//               <button 
//                 className="modal-btn secondary" 
//                 onClick={() => setDeleteConfirmOpen(false)}
//                 disabled={isDeleting}
//               >
//                 Cancel
//               </button>
//               <button 
//                 className="modal-btn delete-btn" 
//                 onClick={handleDeleteReport}
//                 disabled={isDeleting}
//               >
//                 {isDeleting ? 'Deleting...' : 'Delete Report'}
//               </button>
//             </div>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default MyReports;

import React, { useState, useEffect, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../../context/AuthContext';
import './MyReports.css';

// Interfaces for evidence and completion notes
interface TaskProof {
  proof_id: number;
  task_id: number;
  proof_url: string;
  uploaded_at: string;
}

interface CompletionNote {
  note_id: number;
  task_id: number;
  volunteer_id: number;
  note_text: string;
  created_at: string;
  volunteer_name?: string;
}

interface Report {
  report_id: number;
  user_id: number;
  description: string;
  location_address: string;
  submitted_at: string;
  animal_type: string;
  animal_condition: string;
  status_id: number;
  status_name?: string;
  reporter_name?: string;
  reporter_phone?: string | null;
  email?: string;
  // Task related fields
  task_id?: number;
  volunteer_name?: string;
  volunteer_email?: string;
  volunteer_phone?: string;
  completed_at?: string;
}

// Helper function to check if phone exists
const hasPhone = (phone?: string | null): boolean => {
  if (phone === null || phone === undefined) return false;
  if (typeof phone !== 'string') return false;
  return phone.trim().length > 0;
};

// Helper function for image URLs
const getFullImageUrl = (proofUrl: string): string => {
  if (!proofUrl) return '';
  if (proofUrl.startsWith('http://') || proofUrl.startsWith('https://')) {
    return proofUrl;
  }
  const baseUrl = 'http://localhost:5000';
  let cleanUrl = proofUrl.replace(/^\/+/, '');
  if (cleanUrl.startsWith('uploads/')) {
    return `${baseUrl}/${cleanUrl}`;
  }
  return `${baseUrl}/uploads/${cleanUrl}`;
};

// Helper function for animal emoji
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
  return '🐾';
};

// Helper function for status display
const getStatusDisplay = (statusName?: string): string => {
  if (!statusName) return 'Unknown';
  return statusName
    .replace(/_/g, ' ')
    .replace(/\b\w/g, char => char.toUpperCase());
};

const getStatusClass = (statusName?: string): string => {
  const name = statusName?.toLowerCase() || '';
  if (name.includes('submitted')) return 'submitted';
  if (name.includes('review')) return 'review';
  if (name.includes('progress')) return 'progress';
  if (name.includes('completed')) return 'completed';
  if (name.includes('cancelled') || name.includes('declined')) return 'cancelled';
  return 'unknown';
};

// Helper function for date formatting
const formatDate = (dateString: string | undefined): string => {
  if (!dateString) return 'Not available';
  try {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  } catch {
    return 'Invalid date';
  }
};

// Helper function for short date formatting
const formatShortDate = (dateString: string): string => {
  const date = new Date(dateString);
  return date.toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric'
  });
};

// Format phone number for display
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

// =============================================
// Enhanced Report Detail Modal - Horizontal Rectangle
// =============================================
const ReportDetailModal: React.FC<{
  report: Report | null;
  isOpen: boolean;
  onClose: () => void;
}> = ({ report, isOpen, onClose }) => {
  const [evidence, setEvidence] = useState<TaskProof[]>([]);
  const [completionNotes, setCompletionNotes] = useState<CompletionNote[]>([]);
  const [loading, setLoading] = useState(false);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [imageErrors, setImageErrors] = useState<Record<number, boolean>>({});
  const [activeTab, setActiveTab] = useState<'details' | 'evidence' | 'notes'>('details');

  useEffect(() => {
    if (isOpen && report?.task_id && report.status_id === 4) {
      fetchEvidenceAndNotes(report.task_id);
    } else {
      setEvidence([]);
      setCompletionNotes([]);
      setImageErrors({});
    }
  }, [isOpen, report]);

  const fetchEvidenceAndNotes = async (taskId: number) => {
    setLoading(true);
    const token = sessionStorage.getItem('token') || localStorage.getItem('token');
    
    try {
      // Fetch evidence
      const evidenceRes = await fetch(`http://localhost:5000/api/tasks/${taskId}/evidence`, {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      const evidenceData = await evidenceRes.json();
      if (evidenceData.success) setEvidence(evidenceData.data || []);

      // Fetch notes
      const notesRes = await fetch(`http://localhost:5000/api/tasks/${taskId}/completion-notes`, {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      const notesData = await notesRes.json();
      if (notesData.success) setCompletionNotes(notesData.data || []);
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleImageError = (proofId: number) => {
    setImageErrors(prev => ({ ...prev, [proofId]: true }));
  };

  if (!isOpen || !report) return null;

  const isCompleted = report.status_id === 4;
  const hasEvidence = evidence.length > 0;
  const hasNotes = completionNotes.length > 0;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content report-detail-modal horizontal-modal" onClick={e => e.stopPropagation()}>
        {/* Header - More compact */}
        <div className="modal-header compact-header">
          <div className="modal-header-left">
            <span className="modal-animal-emoji small">{getAnimalEmoji(report.animal_type)}</span>
            <div>
              <h3 className="modal-title small">Report #{report.report_id}</h3>
              <p className="modal-subtitle small">{report.animal_type} • {report.animal_condition}</p>
            </div>
          </div>
          <div className="header-actions">
            <span className={`status-badge-small status-${getStatusClass(report.status_name)}`}>
              {getStatusDisplay(report.status_name)}
            </span>
            <button className="modal-close small" onClick={onClose}>×</button>
          </div>
        </div>
        
        {/* Tab Navigation for horizontal layout */}
        <div className="modal-tabs">
          <button 
            className={`modal-tab ${activeTab === 'details' ? 'active' : ''}`}
            onClick={() => setActiveTab('details')}
          >
            📋 Details
          </button>
          {isCompleted && (
            <>
              <button 
                className={`modal-tab ${activeTab === 'evidence' ? 'active' : ''}`}
                onClick={() => setActiveTab('evidence')}
              >
                📸 Evidence {hasEvidence && `(${evidence.length})`}
              </button>
              <button 
                className={`modal-tab ${activeTab === 'notes' ? 'active' : ''}`}
                onClick={() => setActiveTab('notes')}
              >
                📝 Notes {hasNotes && `(${completionNotes.length})`}
              </button>
            </>
          )}
        </div>
        
        <div className="modal-body horizontal-body">
          {/* Details Tab */}
          {activeTab === 'details' && (
            <div className="details-tab-content">
              {/* Two-column layout for horizontal modal */}
              <div className="details-two-column">
                <div className="details-column">
                  <div className="detail-row">
                    <span className="detail-row-label">👤 Reporter:</span>
                    <span className="detail-row-value">{report.reporter_name || 'Anonymous'}</span>
                  </div>
                  {report.email && (
                    <div className="detail-row">
                      <span className="detail-row-label">📧 Email:</span>
                      <span className="detail-row-value">{report.email}</span>
                    </div>
                  )}
                  {hasPhone(report.reporter_phone) && (
                    <div className="detail-row">
                      <span className="detail-row-label">📱 Phone:</span>
                      <span className="detail-row-value phone">{formatPhoneNumber(report.reporter_phone)}</span>
                    </div>
                  )}
                  <div className="detail-row">
                    <span className="detail-row-label">🆔 User ID:</span>
                    <span className="detail-row-value">#{report.user_id}</span>
                  </div>
                </div>
                
                <div className="details-column">
                  <div className="detail-row">
                    <span className="detail-row-label">🐾 Animal:</span>
                    <span className="detail-row-value">{report.animal_type}</span>
                  </div>
                  <div className="detail-row">
                    <span className="detail-row-label">🏥 Condition:</span>
                    <span className="detail-row-value">{report.animal_condition}</span>
                  </div>
                  <div className="detail-row">
                    <span className="detail-row-label">📍 Location:</span>
                    <span className="detail-row-value location">{report.location_address}</span>
                  </div>
                  <div className="detail-row">
                    <span className="detail-row-label">📅 Submitted:</span>
                    <span className="detail-row-value">{formatShortDate(report.submitted_at)}</span>
                  </div>
                </div>
              </div>

              {/* Description in its own row */}
              <div className="description-horizontal">
                <div className="description-horizontal-header">📝 Description</div>
                <p>{report.description}</p>
              </div>

              {/* Volunteer info if assigned */}
              {report.volunteer_name && (
                <div className="volunteer-horizontal">
                  <span className="volunteer-horizontal-label">🦸 Assigned Ranger:</span>
                  <span className="volunteer-horizontal-value">{report.volunteer_name}</span>
                  {report.volunteer_phone && (
                    <span className="volunteer-horizontal-phone">{report.volunteer_phone}</span>
                  )}
                </div>
              )}
            </div>
          )}

          {/* Evidence Tab */}
          {activeTab === 'evidence' && isCompleted && (
            <div className="evidence-tab-content">
              {loading ? (
                <div className="loading-mini">Loading evidence...</div>
              ) : hasEvidence ? (
                <div className="evidence-horizontal-grid">
                  {evidence.map((proof) => {
                    const imageUrl = getFullImageUrl(proof.proof_url);
                    const hasError = imageErrors[proof.proof_id];
                    
                    return (
                      <div 
                        key={proof.proof_id} 
                        className="evidence-horizontal-item"
                        onClick={() => !hasError && setSelectedImage(imageUrl)}
                      >
                        {!hasError ? (
                          <img 
                            src={imageUrl} 
                            alt={`Evidence`}
                            onError={() => handleImageError(proof.proof_id)}
                          />
                        ) : (
                          <div className="evidence-placeholder">📷</div>
                        )}
                        <span className="evidence-horizontal-date">
                          {new Date(proof.uploaded_at).toLocaleDateString()}
                        </span>
                      </div>
                    );
                  })}
                </div>
              ) : (
                <div className="empty-mini">No evidence photos available</div>
              )}
            </div>
          )}

          {/* Notes Tab */}
          {activeTab === 'notes' && isCompleted && (
            <div className="notes-tab-content">
              {loading ? (
                <div className="loading-mini">Loading notes...</div>
              ) : hasNotes ? (
                <div className="notes-horizontal-list">
                  {completionNotes.map((note) => (
                    <div key={note.note_id} className="note-horizontal-item">
                      <div className="note-horizontal-header">
                        <span className="note-horizontal-author">{note.volunteer_name || 'Volunteer'}</span>
                        <span className="note-horizontal-time">{formatDate(note.created_at)}</span>
                      </div>
                      <p className="note-horizontal-text">{note.note_text}</p>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="empty-mini">No notes available</div>
              )}
            </div>
          )}
        </div>

        {/* Image Lightbox */}
        {selectedImage && (
          <div className="lightbox" onClick={() => setSelectedImage(null)}>
            <img src={selectedImage} alt="Enlarged evidence" />
            <button className="lightbox-close" onClick={() => setSelectedImage(null)}>×</button>
          </div>
        )}
        
        <div className="modal-footer compact-footer">
          <button className="modal-btn secondary small" onClick={onClose}>Close</button>
          {report.task_id && (
            <span className="task-id-badge small">Task #{report.task_id}</span>
          )}
        </div>
      </div>
    </div>
  );
};

// =============================================
// Edit Report Modal
// =============================================
const EditReportModal: React.FC<{
  report: Report | null;
  isOpen: boolean;
  onClose: () => void;
  onSave: (updatedReport: Report) => Promise<void>;
}> = ({ report, isOpen, onClose, onSave }) => {
  const [description, setDescription] = useState('');
  const [location, setLocation] = useState('');
  const [isSaving, setIsSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (report) {
      setDescription(report.description);
      setLocation(report.location_address);
      setError(null);
    }
  }, [report]);

  if (!isOpen || !report) return null;

  const validateForm = (): boolean => {
    if (description.trim().length < 10) {
      setError('Description must be at least 10 characters');
      return false;
    }
    if (location.trim().length < 5) {
      setError('Location must be at least 5 characters');
      return false;
    }
    if (description.trim() === report.description && location.trim() === report.location_address) {
      setError('No changes made');
      return false;
    }
    return true;
  };

  const handleSave = async () => {
    setError(null);
    if (!validateForm()) return;
    
    setIsSaving(true);
    try {
      const updatedReport = {
        ...report,
        description: description.trim(),
        location_address: location.trim()
      };
      await onSave(updatedReport);
      onClose();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to save');
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content edit-modal horizontal-modal" onClick={e => e.stopPropagation()}>
        <div className="modal-header compact-header">
          <div className="modal-header-left">
            <span className="modal-animal-emoji small">✏️</span>
            <div>
              <h3 className="modal-title small">Edit Report #{report.report_id}</h3>
              <p className="modal-subtitle small">{report.animal_type}</p>
            </div>
          </div>
          <button className="modal-close small" onClick={onClose} disabled={isSaving}>×</button>
        </div>
        
        <div className="modal-body horizontal-body">
          {error && <div className="edit-error-message compact">{error}</div>}
          
          <div className="edit-form-horizontal">
            <div className="form-group-horizontal">
              <label>Description</label>
              <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                rows={3}
                disabled={isSaving}
                placeholder="Describe the animal's situation..."
              />
            </div>

            <div className="form-group-horizontal">
              <label>Location</label>
              <textarea
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                rows={2}
                disabled={isSaving}
                placeholder="Provide the exact location..."
              />
            </div>
          </div>
        </div>
        
        <div className="modal-footer compact-footer">
          <button className="modal-btn secondary small" onClick={onClose} disabled={isSaving}>Cancel</button>
          <button className="modal-btn primary small" onClick={handleSave} disabled={isSaving}>
            {isSaving ? 'Saving...' : 'Save Changes'}
          </button>
        </div>
      </div>
    </div>
  );
};

// =============================================
// Main MyReports Component (with the specific list you want)
// =============================================
const MyReports: React.FC = () => {
  const [reports, setReports] = useState<Report[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedReport, setSelectedReport] = useState<Report | null>(null);
  const [editingReport, setEditingReport] = useState<Report | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [deleteConfirmOpen, setDeleteConfirmOpen] = useState(false);
  const [reportToDelete, setReportToDelete] = useState<number | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);
  
  // Search and Filter states
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [animalTypeFilter, setAnimalTypeFilter] = useState<string>('all');
  const [dateFilter, setDateFilter] = useState<string>('all');
  
  // Pagination states
  const [currentPage, setCurrentPage] = useState(1);
  const [reportsPerPage, setReportsPerPage] = useState(10);
  
  const { user: currentUser } = useAuth();

  // Fetch user's reports
  useEffect(() => {
    const fetchUserReports = async () => {
      if (!currentUser) return;
      
      try {
        setLoading(true);
        setError(null);
        const token = sessionStorage.getItem('token') || localStorage.getItem('token');
        
        const response = await fetch('http://localhost:5000/api/reports/my-reports', {
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
          }
        });
        
        if (response.ok) {
          const data = await response.json();
          if (data.success) {
            setReports(data.data || []);
          } else {
            setError(data.message || 'Failed to load reports');
          }
        } else {
          setError('Failed to fetch reports: ' + response.statusText);
        }
      } catch (error) {
        console.error('Network error:', error);
        setError('Error loading reports. Please try again.');
      } finally {
        setLoading(false);
      }
    };
    
    if (currentUser) {
      fetchUserReports();
    }
  }, [currentUser]);

  // Get unique animal types for filter
  const animalTypes = useMemo(() => {
    const types = new Set<string>();
    reports.forEach(report => {
      if (report.animal_type) {
        types.add(report.animal_type);
      }
    });
    return Array.from(types).sort();
  }, [reports]);

  // Get unique statuses for filter
  const statuses = useMemo(() => {
    const statusSet = new Set<string>();
    reports.forEach(report => {
      if (report.status_name) {
        statusSet.add(report.status_name);
      }
    });
    return Array.from(statusSet).sort();
  }, [reports]);

  // Filter reports based on search and filters
  const filteredReports = useMemo(() => {
    return reports.filter(report => {
      // Search term filter
      const searchLower = searchTerm.toLowerCase();
      const matchesSearch = searchTerm === '' || 
        report.description.toLowerCase().includes(searchLower) ||
        report.location_address.toLowerCase().includes(searchLower) ||
        report.animal_type.toLowerCase().includes(searchLower) ||
        report.animal_condition.toLowerCase().includes(searchLower) ||
        report.report_id.toString().includes(searchTerm);

      // Status filter
      const matchesStatus = statusFilter === 'all' || 
        report.status_name === statusFilter;

      // Animal type filter
      const matchesAnimalType = animalTypeFilter === 'all' || 
        report.animal_type === animalTypeFilter;

      // Date filter
      const matchesDate = dateFilter === 'all' || isWithinDateRange(report.submitted_at, dateFilter);

      return matchesSearch && matchesStatus && matchesAnimalType && matchesDate;
    });
  }, [reports, searchTerm, statusFilter, animalTypeFilter, dateFilter]);

  // Pagination calculations
  const totalFilteredReports = filteredReports.length;
  const totalPages = Math.ceil(totalFilteredReports / reportsPerPage);
  
  // Get current reports for the page
  const indexOfLastReport = currentPage * reportsPerPage;
  const indexOfFirstReport = indexOfLastReport - reportsPerPage;
  const currentReports = filteredReports.slice(indexOfFirstReport, indexOfLastReport);

  // Reset to first page when filters change
  useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm, statusFilter, animalTypeFilter, dateFilter, reportsPerPage]);

  const isWithinDateRange = (dateString: string, range: string): boolean => {
    const reportDate = new Date(dateString);
    const now = new Date();
    const diffTime = now.getTime() - reportDate.getTime();
    const diffDays = diffTime / (1000 * 60 * 60 * 24);

    switch(range) {
      case 'today':
        return diffDays < 1;
      case 'week':
        return diffDays < 7;
      case 'month':
        return diffDays < 30;
      case '3months':
        return diffDays < 90;
      case '6months':
        return diffDays < 180;
      default:
        return true;
    }
  };

  const handleViewDetails = (report: Report) => {
    setSelectedReport(report);
    setIsModalOpen(true);
  };

  const handleEditClick = (report: Report, e: React.MouseEvent) => {
    e.stopPropagation();
    setEditingReport(report);
    setIsEditModalOpen(true);
  };

  const handleSaveReport = async (updatedReport: Report) => {
    try {
      const token = sessionStorage.getItem('token') || localStorage.getItem('token');
      
      const response = await fetch(`http://localhost:5000/api/reports/${updatedReport.report_id}`, {
        method: 'PATCH',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          description: updatedReport.description,
          location_address: updatedReport.location_address
        })
      });

      if (response.ok) {
        const data = await response.json();
        if (data.success) {
          setReports(prev => prev.map(report => 
            report.report_id === updatedReport.report_id 
              ? { ...report, ...updatedReport }
              : report
          ));
          
          if (selectedReport?.report_id === updatedReport.report_id) {
            setSelectedReport(updatedReport);
          }
          
          return;
        } else {
          throw new Error(data.message || 'Failed to update report');
        }
      } else {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to update report');
      }
    } catch (error) {
      console.error('Error updating report:', error);
      throw error;
    }
  };

  const handleDeleteClick = (reportId: number, e: React.MouseEvent) => {
    e.stopPropagation();
    setReportToDelete(reportId);
    setDeleteConfirmOpen(true);
  };

  const handleDeleteReport = async () => {
    if (!reportToDelete || !currentUser) return;
    
    try {
      setIsDeleting(true);
      const token = sessionStorage.getItem('token') || localStorage.getItem('token');
      
      const response = await fetch(`http://localhost:5000/api/reports/${reportToDelete}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });
      
      if (response.ok) {
        const data = await response.json();
        if (data.success) {
          setReports(prev => prev.filter(report => report.report_id !== reportToDelete));
          setDeleteConfirmOpen(false);
          setReportToDelete(null);
          setIsModalOpen(false);
        } else {
          toast.success(data.message || 'Failed to delete report');
        }
      } else {
        toast.success('Failed to delete report');
      }
    } catch (error) {
      console.error('Error deleting report:', error);
      toast.success('Error deleting report. Please try again.');
    } finally {
      setIsDeleting(false);
    }
  };

  // Pagination handlers
  const handlePageChange = (pageNumber: number) => {
    setCurrentPage(pageNumber);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handlePrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const isReportEditable = (statusId: number): boolean => {
    return statusId === 1; // Only editable if status is "Submitted"
  };

  if (!currentUser) {
    return (
      <div className="my-reports-container">
        <div className="no-access">
          <h2>Access Denied</h2>
          <p>Please log in to view your reports.</p>
          <Link to="/login" className="login-link">
            Go to Login
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="my-reports-container">
      <div className="reports-header">
        <div>
          <h1 className="page-title">My Reports</h1>
          <p className="page-subtitle">
            All your submitted animal rescue reports
          </p>
        </div>
        <Link to="/create-report" className="new-report-btn">
          + New Report
        </Link>
      </div>

      {/* Search and Filter Section */}
      <div className="search-filter-section">
        <div className="search-box">
          <div className="search-icon">🔍</div>
          <input
            type="text"
            placeholder="Search reports by ID, description, location, animal type..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="search-input"
          />
          {searchTerm && (
            <button 
              onClick={() => setSearchTerm('')}
              className="clear-search-btn"
            >
              ✕
            </button>
          )}
        </div>

        <div className="filter-row">
          <div className="filter-group">
            <label className="filter-label">Status:</label>
            <select 
              value={statusFilter} 
              onChange={(e) => setStatusFilter(e.target.value)}
              className="filter-select"
            >
              <option value="all">All Statuses</option>
              {statuses.map(status => (
                <option key={status} value={status}>
                  {getStatusDisplay(status)}
                </option>
              ))}
            </select>
          </div>

          <div className="filter-group">
            <label className="filter-label">Animal Type:</label>
            <select 
              value={animalTypeFilter} 
              onChange={(e) => setAnimalTypeFilter(e.target.value)}
              className="filter-select"
            >
              <option value="all">All Animals</option>
              {animalTypes.map(type => (
                <option key={type} value={type}>{type}</option>
              ))}
            </select>
          </div>

          <div className="filter-group">
            <label className="filter-label">Date Range:</label>
            <select 
              value={dateFilter} 
              onChange={(e) => setDateFilter(e.target.value)}
              className="filter-select"
            >
              <option value="all">All Time</option>
              <option value="today">Today</option>
              <option value="week">Last 7 Days</option>
              <option value="month">Last 30 Days</option>
              <option value="3months">Last 3 Months</option>
              <option value="6months">Last 6 Months</option>
            </select>
          </div>

          <div className="filter-group">
            <label className="filter-label">Per page:</label>
            <select 
              value={reportsPerPage} 
              onChange={(e) => setReportsPerPage(Number(e.target.value))}
              className="filter-select"
            >
              <option value="5">5</option>
              <option value="10">10</option>
              <option value="20">20</option>
              <option value="50">50</option>
            </select>
          </div>
        </div>

        <div className="results-summary">
          Showing {filteredReports.length === 0 ? 0 : indexOfFirstReport + 1}-{Math.min(indexOfLastReport, totalFilteredReports)} of {totalFilteredReports} reports
          {searchTerm && ` matching "${searchTerm}"`}
        </div>
      </div>

      <div className="reports-list-section">
        {loading ? (
          <div className="loading-container">
            <div className="loading-spinner"></div>
            <p>Loading your reports...</p>
          </div>
        ) : error ? (
          <div className="error-container">
            <div className="error-icon">⚠️</div>
            <h3 className="error-title">Unable to Load Reports</h3>
            <p className="error-message">{error}</p>
            <button 
              onClick={() => window.location.reload()} 
              className="retry-btn"
            >
              Try Again
            </button>
          </div>
        ) : filteredReports.length > 0 ? (
          <>
            <div className="simple-reports-list">
              <table className="reports-table">
                <thead>
                  <tr>
                    <th>ID</th>
                    <th>Animal</th>
                    <th>Phone</th>
                    <th>Location</th>
                    <th>Date</th>
                    <th>Status</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {currentReports.map(report => {
                    const editable = isReportEditable(report.status_id);
                    return (
                      <tr key={report.report_id}>
                        <td className="report-id">#{report.report_id}</td>
                        <td className="animal-cell">
                          <div className="animal-info">
                            <span className="animal-emoji">{getAnimalEmoji(report.animal_type)}</span>
                            <span className="animal-name">{report.animal_type || 'Unknown'}</span>
                          </div>
                        </td>
                        <td className="phone-cell">
                          <div className="phone-info">
                            <span className="phone-icon">📱</span>
                            <span className="phone-number">
                              {formatPhoneNumber(report.reporter_phone)}
                            </span>
                          </div>
                        </td>
                        <td className="location-cell">
                          <div className="location-info">
                            <span className="location-icon">📍</span>
                            <span className="location-text">
                              {report.location_address.length > 25 
                                ? `${report.location_address.substring(0, 25)}...` 
                                : report.location_address}
                            </span>
                          </div>
                        </td>
                        <td className="date-cell">{formatShortDate(report.submitted_at)}</td>
                        <td>
                          <span className={`status-badge status-${getStatusClass(report.status_name)}`}>
                            {getStatusDisplay(report.status_name)}
                          </span>
                        </td>
                        <td>
                          <div className="action-buttons">
                            <button 
                              onClick={() => handleViewDetails(report)}
                              className="view-detail-btn"
                            >
                              View
                            </button>
                            {editable && (
                              <>
                                <button 
                                  onClick={(e) => handleEditClick(report, e)}
                                  className="edit-btn-small"
                                >
                                  Edit
                                </button>
                                <button 
                                  onClick={(e) => handleDeleteClick(report.report_id, e)}
                                  className="delete-btn-small"
                                >
                                  Delete
                                </button>
                              </>
                            )}
                          </div>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>

            {/* Pagination Controls */}
            {totalPages > 1 && (
              <div className="pagination-container">
                <div className="pagination-controls">
                  <button
                    onClick={handlePrevPage}
                    disabled={currentPage === 1}
                    className="pagination-btn prev-btn"
                  >
                    ← Previous
                  </button>
                  
                  <div className="page-numbers">
                    {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => {
                      if (
                        page === 1 ||
                        page === totalPages ||
                        (page >= currentPage - 1 && page <= currentPage + 1)
                      ) {
                        return (
                          <button
                            key={page}
                            onClick={() => handlePageChange(page)}
                            className={`page-number ${currentPage === page ? 'active' : ''}`}
                          >
                            {page}
                          </button>
                        );
                      } else if (
                        page === currentPage - 2 ||
                        page === currentPage + 2
                      ) {
                        return <span key={page} className="page-dots">...</span>;
                      }
                      return null;
                    })}
                  </div>
                  
                  <button
                    onClick={handleNextPage}
                    disabled={currentPage === totalPages}
                    className="pagination-btn next-btn"
                  >
                    Next →
                  </button>
                </div>
                <div className="pagination-info">
                  Page {currentPage} of {totalPages}
                </div>
              </div>
            )}
          </>
        ) : (
          <div className="empty-state">
            <div className="empty-icon">📝</div>
            <h3 className="empty-title">No Reports Found</h3>
            <p className="empty-message">
              {searchTerm || statusFilter !== 'all' || animalTypeFilter !== 'all' || dateFilter !== 'all'
                ? 'No reports match your search criteria. Try adjusting your filters.'
                : 'You haven\'t submitted any reports yet. Start by creating your first report!'}
            </p>
            {(searchTerm || statusFilter !== 'all' || animalTypeFilter !== 'all' || dateFilter !== 'all') && (
              <button 
                onClick={() => {
                  setSearchTerm('');
                  setStatusFilter('all');
                  setAnimalTypeFilter('all');
                  setDateFilter('all');
                }}
                className="empty-action-btn"
              >
                Clear All Filters
              </button>
            )}
            {!searchTerm && statusFilter === 'all' && animalTypeFilter === 'all' && dateFilter === 'all' && (
              <Link to="/create-report" className="empty-action-btn">
                Submit Your First Report
              </Link>
            )}
          </div>
        )}
      </div>

      {/* Enhanced View Details Modal - Horizontal */}
      <ReportDetailModal 
        report={selectedReport} 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)}
      />

      {/* Edit Modal - Horizontal */}
      <EditReportModal
        report={editingReport}
        isOpen={isEditModalOpen}
        onClose={() => setIsEditModalOpen(false)}
        onSave={handleSaveReport}
      />

      {/* Delete Confirmation Modal */}
      {deleteConfirmOpen && (
        <div className="modal-overlay">
          <div className="modal-content delete-confirm-modal horizontal-modal">
            <div className="modal-header compact-header">
              <h3 className="modal-title small">Confirm Delete</h3>
              <button 
                className="modal-close small" 
                onClick={() => setDeleteConfirmOpen(false)}
                disabled={isDeleting}
              >
                ×
              </button>
            </div>
            <div className="modal-body horizontal-body compact-body">
              <div className="delete-warning compact">
                <div className="warning-icon small">⚠️</div>
                <p>This action cannot be undone. The report will be permanently removed.</p>
              </div>
            </div>
            <div className="modal-footer compact-footer">
              <button 
                className="modal-btn secondary small" 
                onClick={() => setDeleteConfirmOpen(false)}
                disabled={isDeleting}
              >
                Cancel
              </button>
              <button 
                className="modal-btn delete-btn small" 
                onClick={handleDeleteReport}
                disabled={isDeleting}
              >
                {isDeleting ? 'Deleting...' : 'Delete'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MyReports;


