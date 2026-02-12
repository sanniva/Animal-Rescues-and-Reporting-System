// import React, { useEffect, useState, useCallback } from 'react';
// import './RescueReports.css';

// interface RescueReport {
//   report_id: number;
//   user_id: number;
//   username: string;
//   email: string;
//   phone: string;
//   description: string;
//   location_address: string;
//   user_note?: string;
//   admin_note?: string;
//   submitted_at: string;
//   updated_at?: string;
//   animal_type: string;
//   animal_condition: string;
//   status_id: number;
//   volunteer_name?: string;
//   volunteer_id?: number;
//   volunteer_email?: string;
//   volunteer_phone?: string;
// }

// interface Volunteer {
//   user_id: number;
//   username: string;
//   email: string;
//   phone: string;
//   bio?: string;
//   joined_at: string;
//   approval_status: string;
//   approval_status_id: number;
//   availability_status: string;
//   availability_status_id: number;
//   assigned_reports_count: number;
//   role_id: number;
//   created_at: string;
// }

// // Volunteer Selection Modal Component
// const VolunteerSelectModal: React.FC<{
//   report: RescueReport | null;
//   isOpen: boolean;
//   onClose: () => void;
//   onSelect: (volunteer: Volunteer) => void;
//   volunteers: Volunteer[];
//   loadingVolunteers: boolean;
//   statusConfig: any[];
//   getStatusName: (id: number) => string;
//   getAnimalEmoji: (type: string) => string;
//   formatVolunteerDate: (date: string) => string;
// }> = ({ 
//   report, 
//   isOpen, 
//   onClose, 
//   onSelect, 
//   volunteers, 
//   loadingVolunteers, 
//   statusConfig, 
//   getStatusName, 
//   getAnimalEmoji,
//   formatVolunteerDate 
// }) => {
//   if (!isOpen || !report) return null;

//   const availableVolunteers = volunteers.filter(v => 
//     v.availability_status_id === 1 || v.availability_status === 'Available'
//   );
//   const busyVolunteers = volunteers.filter(v => 
//     v.availability_status_id === 2 || v.availability_status === 'Busy'
//   );
//   const unavailableVolunteers = volunteers.filter(v => 
//     v.availability_status_id === 3 || v.availability_status === 'Unavailable'
//   );

//   return (
//     <div className="modal-overlay" onClick={onClose}>
//       <div className="modal-content" onClick={e => e.stopPropagation()}>
//         <div className="modal-header">
//           <div>
//             <h3>Assign Volunteer</h3>
//             <p className="modal-subtitle">Report #{report.report_id}</p>
//           </div>
//           <button className="modal-close" onClick={onClose}>×</button>
//         </div>
        
//         <div className="modal-body">
//           <div className="modal-summary">
//             <div className="summary-item">
//               <span className="summary-label">Current Status</span>
//               <span className={`status-indicator status-${getStatusName(report.status_id).toLowerCase().replace(' ', '-')}`}>
//                 {getStatusName(report.status_id)}
//               </span>
//             </div>
//             <div className="summary-item">
//               <span className="summary-label">Animal</span>
//               <span className="summary-value">
//                 {getAnimalEmoji(report.animal_type)} {report.animal_type}
//               </span>
//             </div>
//           </div>

//           <div className="volunteers-container">
//             <h4>Available Volunteers ({volunteers.length})</h4>
            
//             {loadingVolunteers ? (
//               <div className="loading-state">
//                 <div className="spinner"></div>
//                 <p>Loading volunteers...</p>
//               </div>
//             ) : volunteers.length === 0 ? (
//               <div className="empty-state">
//                 <p>No approved volunteers available.</p>
//               </div>
//             ) : (
//               <div className="volunteers-grid">
//                 {/* Available Volunteers */}
//                 {availableVolunteers.length > 0 && (
//                   <div className="volunteer-category">
//                     <div className="category-header">
//                       <span className="status-dot available"></span>
//                       <span>Available ({availableVolunteers.length})</span>
//                     </div>
//                     {availableVolunteers.map(volunteer => (
//                       <div key={volunteer.user_id} className="volunteer-item">
//                         <div className="volunteer-info">
//                           <div className="volunteer-avatar">
//                             {volunteer.username.charAt(0).toUpperCase()}
//                           </div>
//                           <div className="volunteer-details">
//                             <h5>{volunteer.username}</h5>
//                             <div className="volunteer-meta">
//                               <span className="meta-item">
//                                 <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
//                                   <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
//                                   <circle cx="12" cy="10" r="3"></circle>
//                                 </svg>
//                                 {volunteer.assigned_reports_count} reports
//                               </span>
//                               <span className="meta-item">
//                                 <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
//                                   <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
//                                   <line x1="16" y1="2" x2="16" y2="6"></line>
//                                   <line x1="8" y1="2" x2="8" y2="6"></line>
//                                   <line x1="3" y1="10" x2="21" y2="10"></line>
//                                 </svg>
//                                 Joined {formatVolunteerDate(volunteer.joined_at)}
//                               </span>
//                             </div>
//                             {volunteer.email && (
//                               <div className="volunteer-contact">
//                                 <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
//                                   <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
//                                   <polyline points="22,6 12,13 2,6"></polyline>
//                                 </svg>
//                                 {volunteer.email}
//                               </div>
//                             )}
//                           </div>
//                         </div>
//                         <button
//                           className="btn primary"
//                           onClick={() => onSelect(volunteer)}
//                         >
//                           Assign
//                         </button>
//                       </div>
//                     ))}
//                   </div>
//                 )}
                
//                 {/* Busy Volunteers */}
//                 {busyVolunteers.length > 0 && (
//                   <div className="volunteer-category">
//                     <div className="category-header">
//                       <span className="status-dot busy"></span>
//                       <span>Busy ({busyVolunteers.length})</span>
//                     </div>
//                     {busyVolunteers.map(volunteer => (
//                       <div key={volunteer.user_id} className="volunteer-item">
//                         <div className="volunteer-info">
//                           <div className="volunteer-avatar">
//                             {volunteer.username.charAt(0).toUpperCase()}
//                           </div>
//                           <div className="volunteer-details">
//                             <h5>{volunteer.username}</h5>
//                             <div className="volunteer-meta">
//                               <span className="meta-item warning">
//                                 <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
//                                   <circle cx="12" cy="12" r="10"></circle>
//                                   <line x1="12" y1="8" x2="12" y2="12"></line>
//                                   <line x1="12" y1="16" x2="12" y2="16"></line>
//                                 </svg>
//                                 {volunteer.assigned_reports_count} active reports
//                               </span>
//                             </div>
//                           </div>
//                         </div>
//                         <button
//                           className="btn secondary"
//                           onClick={() => onSelect(volunteer)}
//                         >
//                           Assign Anyway
//                         </button>
//                       </div>
//                     ))}
//                   </div>
//                 )}
                
//                 {/* Unavailable Volunteers */}
//                 {unavailableVolunteers.length > 0 && (
//                   <div className="volunteer-category">
//                     <div className="category-header">
//                       <span className="status-dot unavailable"></span>
//                       <span>Unavailable ({unavailableVolunteers.length})</span>
//                     </div>
//                     {unavailableVolunteers.map(volunteer => (
//                       <div key={volunteer.user_id} className="volunteer-item disabled">
//                         <div className="volunteer-info">
//                           <div className="volunteer-avatar">
//                             {volunteer.username.charAt(0).toUpperCase()}
//                           </div>
//                           <div className="volunteer-details">
//                             <h5>{volunteer.username}</h5>
//                             <div className="volunteer-meta">
//                               <span className="meta-item">
//                                 Currently unavailable
//                               </span>
//                             </div>
//                           </div>
//                         </div>
//                         <button className="btn" disabled>
//                           Unavailable
//                         </button>
//                       </div>
//                     ))}
//                   </div>
//                 )}
//               </div>
//             )}
//           </div>
//         </div>
        
//         <div className="modal-footer">
//           <button className="btn secondary" onClick={onClose}>
//             Cancel
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// };

// // Report Detail Modal Component
// const ReportDetailModal: React.FC<{
//   report: RescueReport | null;
//   isOpen: boolean;
//   onClose: () => void;
//   onAssignClick: () => void;
//   onUnassign: (reportId: number) => void;
//   getToken: () => string | null;
//   getAnimalEmoji: (type: string) => string;
//   formatDate: (date: string) => string;
//   statusConfig: any[];
//   getStatusName: (id: number) => string;
//   showMessage: (text: string, type: 'success' | 'error') => void;
// }> = ({ 
//   report, 
//   isOpen, 
//   onClose, 
//   onAssignClick, 
//   onUnassign, 
//   getToken, 
//   getAnimalEmoji, 
//   formatDate, 
//   statusConfig,
//   getStatusName,
//   showMessage
// }) => {
//   const [localAdminNote, setLocalAdminNote] = useState('');
//   const [savingNote, setSavingNote] = useState(false);

//   useEffect(() => {
//     if (report) {
//       setLocalAdminNote(report.admin_note || '');
//     }
//   }, [report]);

//   if (!isOpen || !report) return null;

//   const currentStatus = statusConfig.find(s => s.id === report.status_id);

//   const handleSaveNote = async (e: React.FormEvent) => {
//     e.preventDefault();
    
//     if (!localAdminNote.trim()) {
//       showMessage('Please enter a note', 'error');
//       return;
//     }

//     try {
//       const token = getToken();
//       if (!token) {
//         showMessage('Please login first', 'error');
//         return;
//       }

//       setSavingNote(true);
      
//       const response = await fetch(`http://localhost:5000/api/reports/${report.report_id}/admin-note`, {
//         method: 'POST',
//         headers: {
//           'Authorization': `Bearer ${token}`,
//           'Content-Type': 'application/json'
//         },
//         body: JSON.stringify({ note: localAdminNote })
//       });
      
//       if (response.ok) {
//         const data = await response.json();
//         showMessage('Note saved successfully!', 'success');
//         report.admin_note = data.admin_note;
//       } else {
//         const errorData = await response.json();
//         showMessage(errorData.message || 'Failed to save note', 'error');
//       }
//     } catch (error: any) {
//       console.error('Error saving note:', error);
//       showMessage(error.message || 'Error saving note. Please try again.', 'error');
//     } finally {
//       setSavingNote(false);
//     }
//   };

//   return (
//     <div className="modal-overlay" onClick={onClose}>
//       <div className="modal-content" onClick={e => e.stopPropagation()}>
//         <div className="modal-header">
//           <div>
//             <h3>Rescue Report #{report.report_id}</h3>
//             <div className="modal-subheader">
//               <span className={`status-badge status-${getStatusName(report.status_id).toLowerCase().replace(' ', '-')}`}>
//                 {getStatusName(report.status_id)}
//               </span>
//               <span className="report-meta">{formatDate(report.submitted_at)}</span>
//             </div>
//           </div>
//           <button className="modal-close" onClick={onClose}>×</button>
//         </div>
        
//         <div className="modal-body">
//           <div className="modal-grid">
//             <div className="modal-column">
//               <div className="info-card">
//                 <div className="card-header">
//                   <h4>Animal Information</h4>
//                 </div>
//                 <div className="card-content">
//                   <div className="animal-display">
//                     <div className="animal-icon">
//                       {getAnimalEmoji(report.animal_type)}
//                     </div>
//                     <div>
//                       <div className="animal-type">{report.animal_type}</div>
//                       <div className="animal-condition">{report.animal_condition}</div>
//                     </div>
//                   </div>
//                 </div>
//               </div>

//               <div className="info-card">
//                 <div className="card-header">
//                   <h4>Reporter Details</h4>
//                 </div>
//                 <div className="card-content">
//                   <div className="detail-list">
//                     <div className="detail-item">
//                       <span className="detail-label">Name</span>
//                       <span className="detail-value">{report.username}</span>
//                     </div>
//                     <div className="detail-item">
//                       <span className="detail-label">Email</span>
//                       <span className="detail-value">{report.email}</span>
//                     </div>
//                     <div className="detail-item">
//                       <span className="detail-label">Phone</span>
//                       <span className="detail-value">{report.phone}</span>
//                     </div>
//                   </div>
//                 </div>
//               </div>

//               <div className="info-card">
//                 <div className="card-header">
//                   <h4>Location</h4>
//                 </div>
//                 <div className="card-content">
//                   <div className="location-info">
//                     <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
//                       <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
//                       <circle cx="12" cy="10" r="3"></circle>
//                     </svg>
//                     <span>{report.location_address}</span>
//                   </div>
//                   <button 
//                     className="btn outline small"
//                     onClick={() => {
//                       const encodedAddress = encodeURIComponent(report.location_address);
//                       window.open(`https://maps.google.com/?q=${encodedAddress}`, '_blank');
//                     }}
//                   >
//                     View on Map
//                   </button>
//                 </div>
//               </div>
//             </div>

//             <div className="modal-column">
//               <div className="info-card">
//                 <div className="card-header">
//                   <div className="header-row">
//                     <h4>Volunteer Assignment</h4>
//                     {!report.volunteer_name && (
//                       <button 
//                         className="btn primary small"
//                         onClick={onAssignClick}
//                       >
//                         Assign Volunteer
//                       </button>
//                     )}
//                   </div>
//                 </div>
//                 <div className="card-content">
//                   {report.volunteer_name ? (
//                     <div className="volunteer-assigned">
//                       <div className="volunteer-display">
//                         <div className="volunteer-avatar">
//                           {report.volunteer_name.charAt(0).toUpperCase()}
//                         </div>
//                         <div className="volunteer-info">
//                           <h5>{report.volunteer_name}</h5>
//                           <div className="volunteer-contact">
//                             {report.volunteer_email && (
//                               <span className="contact-item">{report.volunteer_email}</span>
//                             )}
//                             {report.volunteer_phone && (
//                               <span className="contact-item">{report.volunteer_phone}</span>
//                             )}
//                           </div>
//                         </div>
//                       </div>
//                       <button 
//                         className="btn danger small"
//                         onClick={() => onUnassign(report.report_id)}
//                       >
//                         Unassign
//                       </button>
//                     </div>
//                   ) : (
//                     <div className="no-volunteer">
//                       <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
//                         <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
//                         <circle cx="12" cy="7" r="4"></circle>
//                       </svg>
//                       <p>No volunteer assigned</p>
//                       <button 
//                         className="btn text"
//                         onClick={onAssignClick}
//                       >
//                         Click to assign a volunteer
//                       </button>
//                     </div>
//                   )}
//                 </div>
//               </div>

//               <div className="info-card">
//                 <div className="card-header">
//                   <h4>Report Description</h4>
//                 </div>
//                 <div className="card-content">
//                   <div className="description-text">
//                     <p>{report.description}</p>
//                   </div>
//                   {report.user_note && (
//                     <div className="user-note">
//                       <div className="note-label">Additional Note:</div>
//                       <p>{report.user_note}</p>
//                     </div>
//                   )}
//                 </div>
//               </div>

//               <div className="info-card">
//                 <div className="card-header">
//                   <h4>Admin Notes</h4>
//                 </div>
//                 <div className="card-content">
//                   <form onSubmit={handleSaveNote} className="notes-form">
//                     <textarea
//                       className="notes-input"
//                       placeholder="Add internal notes about this report..."
//                       value={localAdminNote}
//                       onChange={(e) => setLocalAdminNote(e.target.value)}
//                       rows={3}
//                     />
//                     <div className="notes-actions">
//                       <button
//                         type="submit"
//                         className="btn primary small"
//                         disabled={savingNote || !localAdminNote.trim()}
//                       >
//                         {savingNote ? 'Saving...' : 'Save Note'}
//                       </button>
//                     </div>
//                   </form>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>
        
//         <div className="modal-footer">
//           <button className="btn secondary" onClick={onClose}>
//             Close
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// };

// const RescueReports: React.FC = () => {
//   const [reports, setReports] = useState<RescueReport[]>([]);
//   const [volunteers, setVolunteers] = useState<Volunteer[]>([]);
//   const [loading, setLoading] = useState(true);
//   const [loadingVolunteers, setLoadingVolunteers] = useState(false);
//   const [filterStatus, setFilterStatus] = useState<string>('all');
//   const [sortBy, setSortBy] = useState<string>('recent');
//   const [searchQuery, setSearchQuery] = useState<string>('');
//   const [selectedReport, setSelectedReport] = useState<RescueReport | null>(null);
//   const [isModalOpen, setIsModalOpen] = useState(false);
//   const [isVolunteerModalOpen, setIsVolunteerModalOpen] = useState(false);
//   const [showSuccessMessage, setShowSuccessMessage] = useState(false);
//   const [showErrorMessage, setShowErrorMessage] = useState(false);
//   const [message, setMessage] = useState('');

//   const statusConfig = [
//     { id: 1, name: 'Submitted', color: '#6366F1', bgColor: '#EEF2FF' },
//     { id: 2, name: 'Assigned', color: '#0EA5E9', bgColor: '#F0F9FF' },
//     { id: 3, name: 'In Progress', color: '#10B981', bgColor: '#F0FDF4' },
//     { id: 4, name: 'Completed', color: '#8B5CF6', bgColor: '#F5F3FF' },
//     { id: 5, name: 'Declined', color: '#EF4444', bgColor: '#FEF2F2' }
//   ];

//   const getStatusName = (statusId: number): string => {
//     const status = statusConfig.find(s => s.id === statusId);
//     return status ? status.name : 'Unknown';
//   };

//   const getToken = (): string | null => {
//     return localStorage.getItem('token');
//   };

//   const showMessage = (text: string, type: 'success' | 'error') => {
//     setMessage(text);
//     if (type === 'success') {
//       setShowSuccessMessage(true);
//     } else {
//       setShowErrorMessage(true);
//     }
//     setTimeout(() => {
//       setShowSuccessMessage(false);
//       setShowErrorMessage(false);
//       setMessage('');
//     }, 3000);
//   };

//   const fetchReports = useCallback(async () => {
//     try {
//       setLoading(true);
      
//       const token = getToken();
//       if (!token) {
//         showMessage('Please login first', 'error');
//         setLoading(false);
//         return;
//       }

//       const response = await fetch('http://localhost:5000/api/reports/admin/all', {
//         headers: {
//           'Authorization': `Bearer ${token}`,
//           'Content-Type': 'application/json'
//         }
//       });
      
//       if (response.ok) {
//         const data = await response.json();
        
//         if (data.success) {
//           const reportsData = data.data || [];
          
//           const mappedReports = reportsData.map((report: any) => ({
//             report_id: report.report_id,
//             user_id: report.user_id,
//             username: report.reporter_name || 'Anonymous',
//             email: report.email,
//             phone: report.reporter_phone || 'No phone',
//             description: report.description,
//             location_address: report.location_address,
//             user_note: report.user_note,
//             admin_note: report.admin_note,
//             submitted_at: report.submitted_at,
//             animal_type: report.animal_type,
//             animal_condition: report.animal_condition,
//             status_id: report.status_id,
//             volunteer_name: report.volunteer_name,
//             volunteer_id: report.volunteer_id,
//             volunteer_email: report.volunteer_email,
//             volunteer_phone: report.volunteer_phone
//           }));
          
//           setReports(mappedReports);
//         } else {
//           showMessage(data.message || 'Failed to load reports', 'error');
//         }
//       } else {
//         showMessage('Failed to fetch reports', 'error');
//       }
//     } catch (error: any) {
//       console.error('Network error fetching reports:', error);
//       showMessage('Error loading reports. Please check your connection.', 'error');
//     } finally {
//       setLoading(false);
//     }
//   }, []);

//   const fetchVolunteers = useCallback(async () => {
//     try {
//       setLoadingVolunteers(true);
      
//       const token = getToken();
//       if (!token) {
//         setVolunteers([]);
//         setLoadingVolunteers(false);
//         return;
//       }

//       const response = await fetch('http://localhost:5000/api/volunteers/available', {
//         headers: {
//           'Authorization': `Bearer ${token}`,
//           'Content-Type': 'application/json'
//         }
//       });
      
//       if (response.ok) {
//         const data = await response.json();
        
//         if (data.success) {
//           const volunteersData = data.data || [];
          
//           const mappedVolunteers = volunteersData.map((volunteer: any) => ({
//             user_id: volunteer.user_id,
//             username: volunteer.username,
//             email: volunteer.email,
//             phone: volunteer.phone || 'Not provided',
//             bio: volunteer.bio,
//             joined_at: volunteer.joined_at || volunteer.created_at,
//             approval_status: volunteer.approval_status,
//             approval_status_id: volunteer.approval_status_id,
//             availability_status: volunteer.availability_status,
//             availability_status_id: volunteer.availability_status_id,
//             assigned_reports_count: volunteer.assigned_reports_count || 0,
//             role_id: volunteer.role_id,
//             created_at: volunteer.created_at
//           }));
          
//           setVolunteers(mappedVolunteers);
//         } else {
//           console.error('Failed to load volunteers:', data.message);
//           setVolunteers([]);
//         }
//       } else {
//         console.error('HTTP Error fetching volunteers:', response.status);
//         setVolunteers([]);
//       }
//     } catch (error) {
//       console.error('Error fetching volunteers:', error);
//       setVolunteers([]);
//     } finally {
//       setLoadingVolunteers(false);
//     }
//   }, []);

//   useEffect(() => {
//     fetchReports();
//     fetchVolunteers();
//   }, [fetchReports, fetchVolunteers]);

//   const assignVolunteer = async (reportId: number, volunteerId: number, volunteerName: string) => {
//     try {
//       const token = getToken();
//       if (!token) {
//         showMessage('Please login first', 'error');
//         return;
//       }

//       const response = await fetch('http://localhost:5000/api/volunteers/assign', {
//         method: 'POST',
//         headers: {
//           'Authorization': `Bearer ${token}`,
//           'Content-Type': 'application/json'
//         },
//         body: JSON.stringify({ 
//           report_id: reportId,
//           volunteer_id: volunteerId,
//           status_id: 2
//         })
//       });
      
//       if (response.ok) {
//         const data = await response.json();
        
//         const volunteer = volunteers.find(v => v.user_id === volunteerId);
        
//         setReports(prev => prev.map(report => {
//           if (report.report_id === reportId) {
//             return {
//               ...report,
//               volunteer_id: volunteerId,
//               volunteer_name: volunteerName,
//               volunteer_email: volunteer?.email || '',
//               volunteer_phone: volunteer?.phone || '',
//               status_id: 2
//             };
//           }
//           return report;
//         }));
        
//         setVolunteers(prev => prev.map(v => {
//           if (v.user_id === volunteerId) {
//             return {
//               ...v,
//               assigned_reports_count: (v.assigned_reports_count || 0) + 1
//             };
//           }
//           return v;
//         }));
        
//         showMessage(`Volunteer "${volunteerName}" assigned successfully!`, 'success');
//         setIsVolunteerModalOpen(false);
//         setSelectedReport(null);
//         fetchReports();
//         fetchVolunteers();
//       } else {
//         const errorData = await response.json();
//         showMessage(errorData.message || 'Failed to assign volunteer', 'error');
//       }
//     } catch (error: any) {
//       console.error('Error assigning volunteer:', error);
//       showMessage(error.message || 'Error assigning volunteer. Please try again.', 'error');
//     }
//   };

//   const unassignVolunteer = async (reportId: number) => {
//     if (!window.confirm('Are you sure you want to unassign this volunteer? The status will be reset to "Submitted".')) return;
    
//     try {
//       const token = getToken();
//       if (!token) {
//         showMessage('Please login first', 'error');
//         return;
//       }

//       const response = await fetch(`http://localhost:5000/api/reports/${reportId}/unassign`, {
//         method: 'PUT',
//         headers: {
//           'Authorization': `Bearer ${token}`,
//           'Content-Type': 'application/json'
//         }
//       });
      
//       if (response.ok) {
//         const report = reports.find(r => r.report_id === reportId);
//         const volunteerId = report?.volunteer_id;
        
//         setReports(prev => prev.map(report => {
//           if (report.report_id === reportId) {
//             return {
//               ...report,
//               volunteer_id: undefined,
//               volunteer_name: undefined,
//               volunteer_email: undefined,
//               volunteer_phone: undefined,
//               status_id: 1
//             };
//           }
//           return report;
//         }));
        
//         if (volunteerId) {
//           setVolunteers(prev => prev.map(v => {
//             if (v.user_id === volunteerId) {
//               return {
//                 ...v,
//                 assigned_reports_count: Math.max(0, (v.assigned_reports_count || 0) - 1)
//               };
//             }
//             return v;
//           }));
//         }
        
//         showMessage('Volunteer unassigned successfully!', 'success');
//         fetchReports();
//         fetchVolunteers();
//       } else {
//         const errorData = await response.json();
//         showMessage(errorData.message || 'Failed to unassign volunteer', 'error');
//       }
//     } catch (error: any) {
//       console.error('Error unassigning volunteer:', error);
//       showMessage(error.message || 'Error unassigning volunteer. Please try again.', 'error');
//     }
//   };

//   const getAnimalEmoji = (animalType: string): string => {
//     const type = animalType?.toLowerCase() || '';
//     if (type.includes('dog')) return '🐶';
//     if (type.includes('cat')) return '🐱';
//     if (type.includes('bird')) return '🐦';
//     if (type.includes('rabbit')) return '🐰';
//     if (type.includes('hamster')) return '🐹';
//     if (type.includes('turtle')) return '🐢';
//     if (type.includes('snake')) return '🐍';
//     if (type.includes('fish')) return '🐟';
//     return '🐾';
//   };

//   const formatDate = (dateString: string): string => {
//     try {
//       const date = new Date(dateString);
//       return date.toLocaleDateString('en-US', {
//         month: 'short',
//         day: 'numeric',
//         year: 'numeric',
//         hour: '2-digit',
//         minute: '2-digit'
//       });
//     } catch (error) {
//       return 'Invalid date';
//     }
//   };

//   const formatVolunteerDate = (dateString: string): string => {
//     try {
//       const date = new Date(dateString);
//       return date.toLocaleDateString('en-US', {
//         year: 'numeric',
//         month: 'short',
//         day: 'numeric'
//       });
//     } catch (error) {
//       return 'Invalid date';
//     }
//   };

//   const filteredReports = reports
//     .filter(report => {
//       if (filterStatus !== 'all') {
//         const statusMap: { [key: string]: number } = {
//           'submitted': 1,
//           'assigned': 2,
//           'in-progress': 3,
//           'completed': 4,
//           'declined': 5
//         };
//         if (report.status_id !== statusMap[filterStatus]) return false;
//       }
      
//       if (searchQuery) {
//         const query = searchQuery.toLowerCase();
//         return (
//           report.username?.toLowerCase().includes(query) ||
//           report.animal_type?.toLowerCase().includes(query) ||
//           report.location_address?.toLowerCase().includes(query) ||
//           report.description?.toLowerCase().includes(query) ||
//           report.report_id.toString().includes(query) ||
//           report.volunteer_name?.toLowerCase().includes(query) ||
//           report.phone?.toLowerCase().includes(query)
//         );
//       }
      
//       return true;
//     })
//     .sort((a, b) => {
//       switch(sortBy) {
//         case 'recent':
//           return new Date(b.submitted_at).getTime() - new Date(a.submitted_at).getTime();
//         case 'oldest':
//           return new Date(a.submitted_at).getTime() - new Date(b.submitted_at).getTime();
//         case 'critical':
//           const getCriticalScore = (condition: string) => {
//             const cond = condition?.toLowerCase() || '';
//             if (cond.includes('critical')) return 0;
//             if (cond.includes('severe')) return 1;
//             if (cond.includes('urgent')) return 2;
//             return 3;
//           };
//           return getCriticalScore(a.animal_condition) - getCriticalScore(b.animal_condition);
//         case 'status':
//           return a.status_id - b.status_id;
//         default:
//           return 0;
//       }
//     });

//   if (loading) {
//     return (
//       <div className="loading-container">
//         <div className="spinner"></div>
//         <p>Loading rescue reports...</p>
//       </div>
//     );
//   }

//   return (
//     <div className="container">
//       {/* Success/Error Messages */}
//       {showSuccessMessage && (
//         <div className="notification success">
//           <span>✅ {message}</span>
//         </div>
//       )}
//       {showErrorMessage && (
//         <div className="notification error">
//           <span>❌ {message}</span>
//         </div>
//       )}

//       {/* Header */}
//       <div className="header">
//         <div className="header-content">
//           <h1>Rescue Reports</h1>
//           <p>Manage and assign animal rescue reports to volunteers</p>
//         </div>
//         <div className="header-actions">
//           <button onClick={fetchReports} className="btn secondary">
//             <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
//               <path d="M23 4v6h-6"></path>
//               <path d="M1 20v-6h6"></path>
//               <path d="M3.51 9a9 9 0 0 1 14.85-3.36L23 10"></path>
//               <path d="M1 14l4.64 4.36A9 9 0 0 0 20.49 15"></path>
//             </svg>
//             Refresh
//           </button>
//         </div>
//       </div>

//       {/* Filters and Controls */}
//       <div className="filters">
//         <div className="search-container">
//           <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
//             <circle cx="11" cy="11" r="8"></circle>
//             <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
//           </svg>
//           <input
//             type="text"
//             placeholder="Search reports..."
//             value={searchQuery}
//             onChange={(e) => setSearchQuery(e.target.value)}
//             className="search-input"
//           />
//           {searchQuery && (
//             <button 
//               className="clear-search"
//               onClick={() => setSearchQuery('')}
//               type="button"
//             >
//               ×
//             </button>
//           )}
//         </div>
        
//         <div className="filter-controls">
//           <div className="filter-group">
//             <label>Status</label>
//             <select 
//               value={filterStatus} 
//               onChange={(e) => setFilterStatus(e.target.value)}
//               className="filter-select"
//             >
//               <option value="all">All Status</option>
//               <option value="submitted">Submitted</option>
//               <option value="assigned">Assigned</option>
//               <option value="in-progress">In Progress</option>
//               <option value="completed">Completed</option>
//               <option value="declined">Declined</option>
//             </select>
//           </div>
          
//           <div className="filter-group">
//             <label>Sort By</label>
//             <select 
//               value={sortBy} 
//               onChange={(e) => setSortBy(e.target.value)}
//               className="filter-select"
//             >
//               <option value="recent">Most Recent</option>
//               <option value="oldest">Oldest</option>
//               <option value="critical">Critical First</option>
//               <option value="status">By Status</option>
//             </select>
//           </div>

//           <div className="results-count">
//             {filteredReports.length} of {reports.length} reports
//           </div>
//         </div>
//       </div>

//       {/* Reports Table */}
//       <div className="content">
//         {filteredReports.length === 0 ? (
//           <div className="empty-state">
//             <svg width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
//               <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
//               <polyline points="14 2 14 8 20 8"></polyline>
//               <line x1="16" y1="13" x2="8" y2="13"></line>
//               <line x1="16" y1="17" x2="8" y2="17"></line>
//               <polyline points="10 9 9 9 8 9"></polyline>
//             </svg>
//             <h3>No Reports Found</h3>
//             <p>
//               {searchQuery 
//                 ? `No reports match "${searchQuery}"` 
//                 : filterStatus !== 'all'
//                 ? `No reports with status "${filterStatus}"`
//                 : 'There are no rescue reports yet.'}
//             </p>
//             {(searchQuery || filterStatus !== 'all') && (
//               <button 
//                 onClick={() => {
//                   setSearchQuery('');
//                   setFilterStatus('all');
//                 }}
//                 className="btn outline"
//               >
//                 Clear Filters
//               </button>
//             )}
//           </div>
//         ) : (
//           <div className="reports-table">
//             <table>
//               <thead>
//                 <tr>
//                   <th>Report ID</th>
//                   <th>Animal</th>
//                   <th>Location</th>
//                   <th>Status</th>
//                   <th>Volunteer</th>
//                   <th>Submitted</th>
//                   <th>Actions</th>
//                 </tr>
//               </thead>
//               <tbody>
//                 {filteredReports.map(report => (
//                   <tr key={report.report_id}>
//                     <td>
//                       <div className="report-id">#{report.report_id}</div>
//                     </td>
//                     <td>
//                       <div className="animal-cell">
//                         <span className="animal-emoji">{getAnimalEmoji(report.animal_type)}</span>
//                         <div>
//                           <div className="animal-type">{report.animal_type}</div>
//                           <div className="animal-condition">{report.animal_condition}</div>
//                         </div>
//                       </div>
//                     </td>
//                     <td>
//                       <div className="location-cell">
//                         <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
//                           <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
//                           <circle cx="12" cy="10" r="3"></circle>
//                         </svg>
//                         <span>{report.location_address}</span>
//                       </div>
//                     </td>
//                     <td>
//                       <span className={`status-badge status-${getStatusName(report.status_id).toLowerCase().replace(' ', '-')}`}>
//                         {getStatusName(report.status_id)}
//                       </span>
//                     </td>
//                     <td>
//                       {report.volunteer_name ? (
//                         <div className="volunteer-cell">
//                           <div className="volunteer-avatar small">
//                             {report.volunteer_name.charAt(0).toUpperCase()}
//                           </div>
//                           <span>{report.volunteer_name}</span>
//                         </div>
//                       ) : (
//                         <span className="no-volunteer">Not assigned</span>
//                       )}
//                     </td>
//                     <td>
//                       <div className="date-cell">
//                         {formatDate(report.submitted_at)}
//                       </div>
//                     </td>
//                     <td>
//                       <button 
//                         onClick={() => {
//                           setSelectedReport(report);
//                           setIsModalOpen(true);
//                         }}
//                         className="btn primary small"
//                       >
//                         View Details
//                       </button>
//                     </td>
//                   </tr>
//                 ))}
//               </tbody>
//             </table>
//           </div>
//         )}
//       </div>

//       {/* Report Detail Modal */}
//       <ReportDetailModal 
//         report={selectedReport} 
//         isOpen={isModalOpen} 
//         onClose={() => {
//           setIsModalOpen(false);
//           setSelectedReport(null);
//         }}
//         onAssignClick={() => {
//           setIsModalOpen(false);
//           setIsVolunteerModalOpen(true);
//         }}
//         onUnassign={unassignVolunteer}
//         getToken={getToken}
//         getAnimalEmoji={getAnimalEmoji}
//         formatDate={formatDate}
//         statusConfig={statusConfig}
//         getStatusName={getStatusName}
//         showMessage={showMessage}
//       />

//       {/* Volunteer Selection Modal */}
//       <VolunteerSelectModal
//         report={selectedReport}
//         isOpen={isVolunteerModalOpen}
//         onClose={() => {
//           setIsVolunteerModalOpen(false);
//           setIsModalOpen(true);
//         }}
//         onSelect={(volunteer) => {
//           if (selectedReport) {
//             assignVolunteer(selectedReport.report_id, volunteer.user_id, volunteer.username);
//           }
//         }}
//         volunteers={volunteers}
//         loadingVolunteers={loadingVolunteers}
//         statusConfig={statusConfig}
//         getStatusName={getStatusName}
//         getAnimalEmoji={getAnimalEmoji}
//         formatVolunteerDate={formatVolunteerDate}
//       />
//     </div>
//   );
// };

// export default RescueReports;

import React, { useEffect, useState, useCallback } from 'react';
import './RescueReports.css';

interface RescueReport {
  report_id: number;
  user_id: number;
  username: string;
  email: string;
  phone: string;
  description: string;
  location_address: string;
  user_note?: string;
  admin_note?: string;
  submitted_at: string;
  updated_at?: string;
  animal_type: string;
  animal_condition: string;
  status_id: number;
  status_name?: string;
  volunteer_name?: string;
  volunteer_id?: number;
  volunteer_email?: string;
  volunteer_phone?: string;
}

interface Volunteer {
  user_id: number;
  username: string;
  email: string;
  phone: string;
  bio?: string;
  joined_at: string;
  approval_status: string;
  approval_status_id: number;
  availability_status: string;
  availability_status_id: number;
  assigned_reports_count: number;
  role_id: number;
  created_at: string;
}

interface AvailabilityStatus {
  status_id: number;
  status_name: string;
}

// Volunteer Selection Modal Component
const VolunteerSelectModal: React.FC<{
  report: RescueReport | null;
  isOpen: boolean;
  onClose: () => void;
  onSelect: (volunteer: Volunteer) => void;
  volunteers: Volunteer[];
  loadingVolunteers: boolean;
  getAnimalEmoji: (type: string) => string;
  formatVolunteerDate: (date: string) => string;
}> = ({ 
  report, 
  isOpen, 
  onClose, 
  onSelect, 
  volunteers, 
  loadingVolunteers, 
  getAnimalEmoji,
  formatVolunteerDate 
}) => {
  if (!isOpen || !report) return null;

  // Filter volunteers based on availability status from database
  const availableVolunteers = volunteers.filter(v => 
    v.availability_status_id === 1 || v.availability_status?.toLowerCase() === 'available'
  );
  
  const unavailableVolunteers = volunteers.filter(v => 
    v.availability_status_id === 2 || v.availability_status?.toLowerCase() === 'unavailable'
  );

  return (
    <div className="reports-modal-overlay" onClick={onClose}>
      <div className="reports-modal-content" onClick={e => e.stopPropagation()}>
        <div className="reports-modal-header dark">
          <div>
            <h3>Assign Volunteer</h3>
            <p className="reports-modal-subtitle">Report #{report.report_id}</p>
          </div>
          <button className="reports-modal-close" onClick={onClose}>×</button>
        </div>
        
        <div className="reports-modal-body">
          <div className="reports-summary-card">
            <div className="reports-summary-item">
              <span className="reports-summary-label">Animal</span>
              <span className="reports-summary-value">
                {getAnimalEmoji(report.animal_type)} {report.animal_type}
              </span>
            </div>
            <div className="reports-summary-item">
              <span className="reports-summary-label">Location</span>
              <span className="reports-summary-value location">
                {report.location_address}
              </span>
            </div>
          </div>

          <div className="reports-volunteers-container">
            <h4>Available Rangers ({availableVolunteers.length})</h4>
            
            {loadingVolunteers ? (
              <div className="reports-loading-state">
                <div className="reports-spinner"></div>
                <p>Loading volunteers...</p>
              </div>
            ) : volunteers.length === 0 ? (
              <div className="reports-empty-state small">
                <span className="empty-emoji">🕊️</span>
                <p>No volunteers found</p>
              </div>
            ) : (
              <div className="reports-volunteers-grid">
                {/* Available Volunteers */}
                {availableVolunteers.length > 0 && (
                  <div className="reports-volunteer-category">
                    <div className="reports-category-header">
                      <span className="reports-status-dot available"></span>
                      <span>Available for Rescue ({availableVolunteers.length})</span>
                    </div>
                    {availableVolunteers.map(volunteer => (
                      <div key={volunteer.user_id} className="reports-volunteer-item">
                        <div className="reports-volunteer-avatar-wrapper">
                          <div className="reports-volunteer-avatar">
                            {volunteer.username.charAt(0).toUpperCase()}
                          </div>
                          {volunteer.assigned_reports_count > 0 && (
                            <span className="reports-badge-count">{volunteer.assigned_reports_count}</span>
                          )}
                        </div>
                        <div className="reports-volunteer-info">
                          <div className="reports-volunteer-header">
                            <h5>{volunteer.username}</h5>
                            <span className="reports-volunteer-status available">Available</span>
                          </div>
                          <div className="reports-volunteer-contact">
                            <span>{volunteer.email}</span>
                            {volunteer.phone && <span>{volunteer.phone}</span>}
                          </div>
                          <div className="reports-volunteer-meta">
                            <span>Joined {formatVolunteerDate(volunteer.joined_at)}</span>
                            <span>{volunteer.assigned_reports_count} active rescues</span>
                          </div>
                        </div>
                        <button
                          className="reports-btn assign"
                          onClick={() => onSelect(volunteer)}
                        >
                          Assign
                        </button>
                      </div>
                    ))}
                  </div>
                )}
                
                {/* Unavailable Volunteers */}
                {unavailableVolunteers.length > 0 && (
                  <div className="reports-volunteer-category">
                    <div className="reports-category-header">
                      <span className="reports-status-dot unavailable"></span>
                      <span>Unavailable ({unavailableVolunteers.length})</span>
                    </div>
                    {unavailableVolunteers.map(volunteer => (
                      <div key={volunteer.user_id} className="reports-volunteer-item unavailable">
                        <div className="reports-volunteer-avatar-wrapper">
                          <div className="reports-volunteer-avatar unavailable">
                            {volunteer.username.charAt(0).toUpperCase()}
                          </div>
                        </div>
                        <div className="reports-volunteer-info">
                          <div className="reports-volunteer-header">
                            <h5>{volunteer.username}</h5>
                            <span className="reports-volunteer-status unavailable">Unavailable</span>
                          </div>
                          <div className="reports-volunteer-contact">
                            <span>{volunteer.email}</span>
                          </div>
                          <div className="reports-volunteer-meta">
                            <span>Currently unavailable</span>
                          </div>
                        </div>
                        <button
                          className="reports-btn assign-disabled"
                          disabled
                        >
                          Unavailable
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
        
        <div className="reports-modal-footer">
          <button className="reports-btn secondary" onClick={onClose}>
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

// Report Detail Modal Component
const ReportDetailModal: React.FC<{
  report: RescueReport | null;
  isOpen: boolean;
  onClose: () => void;
  onAssignClick: () => void;
  onUnassign: (reportId: number) => void;
  getAnimalEmoji: (type: string) => string;
  formatDate: (date: string) => string;
  getStatusName: (id: number) => string;
  showMessage: (text: string, type: 'success' | 'error') => void;
}> = ({ 
  report, 
  isOpen, 
  onClose, 
  onAssignClick, 
  onUnassign, 
  getAnimalEmoji, 
  formatDate, 
  getStatusName,
  showMessage
}) => {
  const [localAdminNote, setLocalAdminNote] = useState('');
  const [savingNote, setSavingNote] = useState(false);

  useEffect(() => {
    if (report) {
      setLocalAdminNote(report.admin_note || '');
    }
  }, [report]);

  if (!isOpen || !report) return null;

  const handleSaveNote = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!localAdminNote.trim()) {
      showMessage('Please enter a note', 'error');
      return;
    }

    try {
      const token = localStorage.getItem('token');
      if (!token) {
        showMessage('Please login first', 'error');
        return;
      }

      setSavingNote(true);
      
      const response = await fetch(`http://localhost:5000/api/reports/${report.report_id}/admin-note`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ note: localAdminNote })
      });
      
      if (response.ok) {
        const data = await response.json();
        showMessage('Note saved successfully!', 'success');
        report.admin_note = data.admin_note;
      } else {
        const errorData = await response.json();
        showMessage(errorData.message || 'Failed to save note', 'error');
      }
    } catch (error: any) {
      console.error('Error saving note:', error);
      showMessage(error.message || 'Error saving note. Please try again.', 'error');
    } finally {
      setSavingNote(false);
    }
  };

  return (
    <div className="reports-modal-overlay" onClick={onClose}>
      <div className="reports-modal-content large" onClick={e => e.stopPropagation()}>
        {/* Dark green header for the main modal title */}
        <div className="reports-modal-header dark">
          <div>
            <h3>Rescue Report #{report.report_id}</h3>
            <div className="reports-modal-subheader">
              <span className={`reports-status-badge ${getStatusName(report.status_id).toLowerCase().replace(' ', '-')}`}>
                {getStatusName(report.status_id)}
              </span>
              <span className="reports-meta">{formatDate(report.submitted_at)}</span>
            </div>
          </div>
          <button className="reports-modal-close" onClick={onClose}>×</button>
        </div>
        
        <div className="reports-modal-body">
          <div className="reports-detail-grid">
            <div className="reports-detail-column">
              {/* Animal Information Card - Beige header */}
              <div className="reports-info-card">
                <div className="reports-card-header beige">
                  <h4>🐾 Animal Information</h4>
                </div>
                <div className="reports-card-content">
                  <div className="reports-animal-display">
                    <div className="reports-animal-icon">
                      {getAnimalEmoji(report.animal_type)}
                    </div>
                    <div className="reports-animal-details">
                      <div className="reports-animal-type">{report.animal_type}</div>
                      <div className="reports-animal-condition">
                        <span className="condition-tag">{report.animal_condition}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Reporter Details Card - Beige header */}
              <div className="reports-info-card">
                <div className="reports-card-header beige">
                  <h4>👤 Reporter Details</h4>
                </div>
                <div className="reports-card-content">
                  <div className="reports-detail-list">
                    <div className="reports-detail-row">
                      <span className="reports-detail-label">Name</span>
                      <span className="reports-detail-value">{report.username}</span>
                    </div>
                    <div className="reports-detail-row">
                      <span className="reports-detail-label">Email</span>
                      <span className="reports-detail-value">{report.email}</span>
                    </div>
                    <div className="reports-detail-row">
                      <span className="reports-detail-label">Phone</span>
                      <span className="reports-detail-value">{report.phone}</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Location Card - Beige header */}
              <div className="reports-info-card">
                <div className="reports-card-header beige">
                  <h4>📍 Location</h4>
                </div>
                <div className="reports-card-content">
                  <div className="reports-location-info">
                    <p>{report.location_address}</p>
                    <button 
                      className="reports-btn map"
                      onClick={() => {
                        const encodedAddress = encodeURIComponent(report.location_address);
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
              {/* Volunteer Assignment Card - Beige header */}
              <div className="reports-info-card">
                <div className="reports-card-header beige">
                  <div className="reports-header-row">
                    <h4>🦸 Volunteer Assignment</h4>
                    {!report.volunteer_name && (
                      <button 
                        className="reports-btn primary small"
                        onClick={onAssignClick}
                      >
                        + Assign Ranger
                      </button>
                    )}
                  </div>
                </div>
                <div className="reports-card-content">
                  {report.volunteer_name ? (
                    <div className="reports-volunteer-assigned">
                      <div className="reports-assigned-volunteer">
                        <div className="reports-volunteer-avatar large">
                          {report.volunteer_name.charAt(0).toUpperCase()}
                        </div>
                        <div className="reports-assigned-info">
                          <h5>{report.volunteer_name}</h5>
                          <div className="reports-assigned-contact">
                            {report.volunteer_email && <span>{report.volunteer_email}</span>}
                            {report.volunteer_phone && <span>{report.volunteer_phone}</span>}
                          </div>
                        </div>
                      </div>
                      <button 
                        className="reports-btn unassign"
                        onClick={() => onUnassign(report.report_id)}
                      >
                        Unassign
                      </button>
                    </div>
                  ) : (
                    <div className="reports-no-volunteer">
                      <span className="no-volunteer-emoji">🕊️</span>
                      <p>No ranger assigned yet</p>
                      <button 
                        className="reports-btn text"
                        onClick={onAssignClick}
                      >
                        Click to assign a ranger
                      </button>
                    </div>
                  )}
                </div>
              </div>

              {/* Description Card - Beige header */}
              <div className="reports-info-card">
                <div className="reports-card-header beige">
                  <h4>📝 Report Description</h4>
                </div>
                <div className="reports-card-content">
                  <div className="reports-description">
                    <p>{report.description}</p>
                  </div>
                  {report.user_note && (
                    <div className="reports-user-note">
                      <div className="note-label">Reporter's Note:</div>
                      <p>{report.user_note}</p>
                    </div>
                  )}
                </div>
              </div>

              {/* Admin Notes Card - Beige header */}
              <div className="reports-info-card">
                <div className="reports-card-header beige">
                  <h4>📌 Admin Notes</h4>
                </div>
                <div className="reports-card-content">
                  <form onSubmit={handleSaveNote} className="reports-notes-form">
                    <textarea
                      className="reports-notes-input"
                      placeholder="Add internal notes about this rescue mission..."
                      value={localAdminNote}
                      onChange={(e) => setLocalAdminNote(e.target.value)}
                      rows={3}
                    />
                    <div className="reports-notes-actions">
                      <button
                        type="submit"
                        className="reports-btn save"
                        disabled={savingNote || !localAdminNote.trim()}
                      >
                        {savingNote ? 'Saving...' : 'Save Note'}
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        <div className="reports-modal-footer">
          <button className="reports-btn secondary" onClick={onClose}>
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

const RescueReports: React.FC = () => {
  const [reports, setReports] = useState<RescueReport[]>([]);
  const [volunteers, setVolunteers] = useState<Volunteer[]>([]);
  const [availabilityStatuses, setAvailabilityStatuses] = useState<AvailabilityStatus[]>([]);
  const [loading, setLoading] = useState(true);
  const [loadingVolunteers, setLoadingVolunteers] = useState(false);
  const [filterStatus, setFilterStatus] = useState<string>('all');
  const [sortBy, setSortBy] = useState<string>('recent');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedReport, setSelectedReport] = useState<RescueReport | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isVolunteerModalOpen, setIsVolunteerModalOpen] = useState(false);
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);
  const [showErrorMessage, setShowErrorMessage] = useState(false);
  const [message, setMessage] = useState('');
  
  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(9);

  // Fetch status list from database
  const fetchStatusList = useCallback(async () => {
    try {
      const token = localStorage.getItem('token');
      if (!token) return;

      const response = await fetch('http://localhost:5000/api/reports/status/list', {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });

      if (response.ok) {
        const data = await response.json();
        if (data.success) {
          setAvailabilityStatuses(data.data || []);
        }
      }
    } catch (error) {
      console.error('Error fetching status list:', error);
    }
  }, []);

  const getStatusName = (statusId: number): string => {
    // Try to get from report status_name first
    const report = reports.find(r => r.status_id === statusId);
    if (report?.status_name) {
      return report.status_name;
    }
    
    // Fallback mapping
    const statusMap: { [key: number]: string } = {
      1: 'Submitted',
      2: 'Assigned',
      3: 'In Progress',
      4: 'Completed',
      5: 'Declined'
    };
    return statusMap[statusId] || 'Unknown';
  };

  const showMessage = (text: string, type: 'success' | 'error') => {
    setMessage(text);
    if (type === 'success') {
      setShowSuccessMessage(true);
    } else {
      setShowErrorMessage(true);
    }
    setTimeout(() => {
      setShowSuccessMessage(false);
      setShowErrorMessage(false);
      setMessage('');
    }, 3000);
  };

  const fetchReports = useCallback(async () => {
    try {
      setLoading(true);
      
      const token = localStorage.getItem('token');
      if (!token) {
        showMessage('Please login first', 'error');
        setLoading(false);
        return;
      }

      const response = await fetch('http://localhost:5000/api/reports/admin/all', {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });
      
      if (response.ok) {
        const data = await response.json();
        
        if (data.success) {
          const reportsData = data.data || [];
          
          const mappedReports = reportsData.map((report: any) => ({
            report_id: report.report_id,
            user_id: report.user_id,
            username: report.reporter_name || 'Anonymous',
            email: report.email || 'No email',
            phone: report.reporter_phone || 'No phone',
            description: report.description,
            location_address: report.location_address,
            user_note: report.user_note,
            admin_note: report.admin_note,
            submitted_at: report.submitted_at,
            animal_type: report.animal_type || 'Unknown',
            animal_condition: report.animal_condition || 'Unknown',
            status_id: report.status_id || 1,
            status_name: report.status_name, // From database join
            volunteer_name: report.volunteer_name,
            volunteer_id: report.volunteer_id,
            volunteer_email: report.volunteer_email,
            volunteer_phone: report.volunteer_phone
          }));
          
          setReports(mappedReports);
          setCurrentPage(1);
        } else {
          showMessage(data.message || 'Failed to load reports', 'error');
        }
      } else {
        showMessage('Failed to fetch reports', 'error');
      }
    } catch (error: any) {
      console.error('Network error fetching reports:', error);
      showMessage('Error loading reports. Please check your connection.', 'error');
    } finally {
      setLoading(false);
    }
  }, []);

  const fetchVolunteers = useCallback(async () => {
    try {
      setLoadingVolunteers(true);
      
      const token = localStorage.getItem('token');
      if (!token) {
        setVolunteers([]);
        setLoadingVolunteers(false);
        return;
      }

      const response = await fetch('http://localhost:5000/api/volunteers/available', {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });
      
      if (response.ok) {
        const data = await response.json();
        
        if (data.success) {
          const volunteersData = data.data || [];
          
          const mappedVolunteers = volunteersData.map((volunteer: any) => ({
            user_id: volunteer.user_id,
            username: volunteer.username,
            email: volunteer.email,
            phone: volunteer.phone || 'Not provided',
            bio: volunteer.bio,
            joined_at: volunteer.joined_at || volunteer.created_at,
            approval_status: volunteer.approval_status,
            approval_status_id: volunteer.approval_status_id,
            availability_status: volunteer.availability_status,
            availability_status_id: volunteer.availability_status_id,
            assigned_reports_count: volunteer.assigned_reports_count || 0,
            role_id: volunteer.role_id,
            created_at: volunteer.created_at
          }));
          
          setVolunteers(mappedVolunteers);
        } else {
          console.error('Failed to load volunteers:', data.message);
          setVolunteers([]);
        }
      } else {
        console.error('HTTP Error fetching volunteers:', response.status);
        setVolunteers([]);
      }
    } catch (error) {
      console.error('Error fetching volunteers:', error);
      setVolunteers([]);
    } finally {
      setLoadingVolunteers(false);
    }
  }, []);

  useEffect(() => {
    fetchStatusList();
    fetchReports();
    fetchVolunteers();
  }, [fetchReports, fetchVolunteers, fetchStatusList]);

  const assignVolunteer = async (reportId: number, volunteerId: number, volunteerName: string) => {
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        showMessage('Please login first', 'error');
        return;
      }

      const response = await fetch(`http://localhost:5000/api/reports/${reportId}/assign`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ 
          volunteer_id: volunteerId,
          status_id: 2
        })
      });
      
      if (response.ok) {
        const data = await response.json();
        
        const volunteer = volunteers.find(v => v.user_id === volunteerId);
        
        setReports(prev => prev.map(report => {
          if (report.report_id === reportId) {
            return {
              ...report,
              volunteer_id: volunteerId,
              volunteer_name: volunteerName,
              volunteer_email: volunteer?.email || '',
              volunteer_phone: volunteer?.phone || '',
              status_id: 2,
              status_name: 'Assigned'
            };
          }
          return report;
        }));
        
        setVolunteers(prev => prev.map(v => {
          if (v.user_id === volunteerId) {
            return {
              ...v,
              assigned_reports_count: (v.assigned_reports_count || 0) + 1
            };
          }
          return v;
        }));
        
        showMessage(`Ranger "${volunteerName}" assigned successfully!`, 'success');
        setIsVolunteerModalOpen(false);
        setSelectedReport(null);
        fetchReports();
        fetchVolunteers();
      } else {
        const errorData = await response.json();
        showMessage(errorData.message || 'Failed to assign volunteer', 'error');
      }
    } catch (error: any) {
      console.error('Error assigning volunteer:', error);
      showMessage(error.message || 'Error assigning volunteer. Please try again.', 'error');
    }
  };

  const unassignVolunteer = async (reportId: number) => {
    if (!window.confirm('Are you sure you want to unassign this ranger? The status will be reset to "Submitted".')) return;
    
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        showMessage('Please login first', 'error');
        return;
      }

      const response = await fetch(`http://localhost:5000/api/reports/${reportId}/unassign`, {
        method: 'PUT',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });
      
      if (response.ok) {
        const report = reports.find(r => r.report_id === reportId);
        const volunteerId = report?.volunteer_id;
        
        setReports(prev => prev.map(report => {
          if (report.report_id === reportId) {
            return {
              ...report,
              volunteer_id: undefined,
              volunteer_name: undefined,
              volunteer_email: undefined,
              volunteer_phone: undefined,
              status_id: 1,
              status_name: 'Submitted'
            };
          }
          return report;
        }));
        
        if (volunteerId) {
          setVolunteers(prev => prev.map(v => {
            if (v.user_id === volunteerId) {
              return {
                ...v,
                assigned_reports_count: Math.max(0, (v.assigned_reports_count || 0) - 1)
              };
            }
            return v;
          }));
        }
        
        showMessage('Ranger unassigned successfully!', 'success');
        fetchReports();
        fetchVolunteers();
      } else {
        const errorData = await response.json();
        showMessage(errorData.message || 'Failed to unassign volunteer', 'error');
      }
    } catch (error: any) {
      console.error('Error unassigning volunteer:', error);
      showMessage(error.message || 'Error unassigning volunteer. Please try again.', 'error');
    }
  };

  const getAnimalEmoji = (animalType: string): string => {
    const type = animalType?.toLowerCase() || '';
    if (type.includes('dog')) return '🐶';
    if (type.includes('cat')) return '🐱';
    if (type.includes('bird')) return '🐦';
    if (type.includes('rabbit')) return '🐰';
    if (type.includes('hamster')) return '🐹';
    if (type.includes('turtle')) return '🐢';
    if (type.includes('snake')) return '🐍';
    if (type.includes('fish')) return '🐟';
    if (type.includes('horse')) return '🐴';
    if (type.includes('cow')) return '🐮';
    if (type.includes('goat')) return '🐐';
    if (type.includes('sheep')) return '🐑';
    return '🐾';
  };

  const formatDate = (dateString: string): string => {
    try {
      const date = new Date(dateString);
      return date.toLocaleDateString('en-US', {
        month: 'short',
        day: 'numeric',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
      });
    } catch (error) {
      return 'Invalid date';
    }
  };

  const formatVolunteerDate = (dateString: string): string => {
    try {
      const date = new Date(dateString);
      return date.toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric'
      });
    } catch (error) {
      return 'Invalid date';
    }
  };

  const filteredReports = reports
    .filter(report => {
      if (filterStatus !== 'all') {
        const statusMap: { [key: string]: number } = {
          'submitted': 1,
          'assigned': 2,
          'in-progress': 3,
          'completed': 4,
          'declined': 5
        };
        if (report.status_id !== statusMap[filterStatus]) return false;
      }
      
      if (searchQuery) {
        const query = searchQuery.toLowerCase();
        return (
          report.username?.toLowerCase().includes(query) ||
          report.animal_type?.toLowerCase().includes(query) ||
          report.location_address?.toLowerCase().includes(query) ||
          report.description?.toLowerCase().includes(query) ||
          report.report_id.toString().includes(query) ||
          report.volunteer_name?.toLowerCase().includes(query) ||
          report.phone?.toLowerCase().includes(query)
        );
      }
      
      return true;
    })
    .sort((a, b) => {
      switch(sortBy) {
        case 'recent':
          return new Date(b.submitted_at).getTime() - new Date(a.submitted_at).getTime();
        case 'oldest':
          return new Date(a.submitted_at).getTime() - new Date(b.submitted_at).getTime();
        case 'critical':
          const getCriticalScore = (condition: string) => {
            const cond = condition?.toLowerCase() || '';
            if (cond.includes('critical')) return 0;
            if (cond.includes('severe')) return 1;
            if (cond.includes('urgent')) return 2;
            return 3;
          };
          return getCriticalScore(a.animal_condition) - getCriticalScore(b.animal_condition);
        case 'status':
          return a.status_id - b.status_id;
        default:
          return 0;
      }
    });

  // Pagination logic
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredReports.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(filteredReports.length / itemsPerPage);

  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);
  const nextPage = () => setCurrentPage(prev => Math.min(prev + 1, totalPages));
  const prevPage = () => setCurrentPage(prev => Math.max(prev - 1, 1));

  const getPageNumbers = (): number[] => {
    const pageNumbers: number[] = [];
    const maxVisible = 5;
    
    if (totalPages <= maxVisible) {
      for (let i = 1; i <= totalPages; i++) {
        pageNumbers.push(i);
      }
    } else {
      if (currentPage <= 3) {
        for (let i = 1; i <= 5; i++) {
          pageNumbers.push(i);
        }
      } else if (currentPage >= totalPages - 2) {
        for (let i = totalPages - 4; i <= totalPages; i++) {
          pageNumbers.push(i);
        }
      } else {
        for (let i = currentPage - 2; i <= currentPage + 2; i++) {
          pageNumbers.push(i);
        }
      }
    }
    
    return pageNumbers;
  };

  if (loading) {
    return (
      <div className="reports-loading-container">
        <div className="reports-loader">
          <div className="reports-spinner"></div>
          <p className="reports-loader-text">Loading rescue missions...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="reports-container">
      {/* Success/Error Messages */}
      {showSuccessMessage && (
        <div className="reports-notification success">
          <span className="notification-icon">✓</span>
          <span>{message}</span>
        </div>
      )}
      {showErrorMessage && (
        <div className="reports-notification error">
          <span className="notification-icon">⚠</span>
          <span>{message}</span>
        </div>
      )}

      {/* Header */}
      <div className="reports-header">
        <div className="reports-header-content">
          <h1 className="reports-title">Rescue Operations</h1>
          <p className="reports-subtitle">
            Manage and coordinate animal rescue missions with our ranger team
          </p>
        </div>
        <div className="reports-header-actions">
          <button onClick={fetchReports} className="reports-btn refresh">
            <span className="btn-icon">↻</span>
            Refresh
          </button>
        </div>
      </div>

      {/* Filters */}
      <div className="reports-filters-card">
        <div className="reports-search-wrapper">
          <span className="search-icon">🔍</span>
          <input
            type="text"
            placeholder="Search by ID, animal, location, ranger..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="reports-search-input"
          />
          {searchQuery && (
            <button 
              className="reports-clear-search"
              onClick={() => setSearchQuery('')}
            >
              ×
            </button>
          )}
        </div>
        
        <div className="reports-filters-row">
          <div className="reports-filter-group">
            <label className="reports-filter-label">Status</label>
            <select 
              value={filterStatus} 
              onChange={(e) => setFilterStatus(e.target.value)}
              className="reports-filter-select"
            >
              <option value="all">All Status</option>
              <option value="submitted">Submitted</option>
              <option value="assigned">Assigned</option>
              <option value="in-progress">In Progress</option>
              <option value="completed">Completed</option>
              <option value="declined">Declined</option>
            </select>
          </div>
          
          <div className="reports-filter-group">
            <label className="reports-filter-label">Sort By</label>
            <select 
              value={sortBy} 
              onChange={(e) => setSortBy(e.target.value)}
              className="reports-filter-select"
            >
              <option value="recent">Most Recent</option>
              <option value="oldest">Oldest</option>
              <option value="critical">Critical First</option>
              <option value="status">By Status</option>
            </select>
          </div>

          <div className="reports-stats-badge">
            {filteredReports.length} of {reports.length} missions
          </div>
        </div>
      </div>

      {/* Reports Grid/Cards */}
      <div className="reports-content">
        {filteredReports.length === 0 ? (
          <div className="reports-empty-state">
            <span className="empty-state-emoji">🕊️</span>
            <h3>No Rescue Missions Found</h3>
            <p>
              {searchQuery 
                ? `No missions matching "${searchQuery}"` 
                : filterStatus !== 'all'
                ? `No missions with status "${filterStatus}"`
                : 'No rescue missions have been reported yet.'}
            </p>
            {(searchQuery || filterStatus !== 'all') && (
              <button 
                onClick={() => {
                  setSearchQuery('');
                  setFilterStatus('all');
                  setCurrentPage(1);
                }}
                className="reports-btn outline"
              >
                Clear Filters
              </button>
            )}
          </div>
        ) : (
          <>
            <div className="reports-grid">
              {currentItems.map(report => (
                <div key={report.report_id} className="reports-card">
                  <div className="reports-card-header dark">
                    <div className="reports-card-title">
                      <span className="reports-id">#{report.report_id}</span>
                      <span className={`reports-status ${getStatusName(report.status_id).toLowerCase().replace(' ', '-')}`}>
                        {getStatusName(report.status_id)}
                      </span>
                    </div>
                    <div className="reports-date">
                      {formatDate(report.submitted_at)}
                    </div>
                  </div>

                  <div className="reports-card-body">
                    <div className="reports-animal-section">
                      <div className="reports-animal-icon large">
                        {getAnimalEmoji(report.animal_type)}
                      </div>
                      <div className="reports-animal-info">
                        <h4>{report.animal_type}</h4>
                        <span className="reports-condition">{report.animal_condition}</span>
                      </div>
                    </div>

                    <div className="reports-location-section">
                      <span className="location-icon">📍</span>
                      <span className="location-text">{report.location_address}</span>
                    </div>

                    <div className="reports-volunteer-section">
                      {report.volunteer_name ? (
                        <div className="reports-assigned-ranger">
                          <div className="ranger-avatar">
                            {report.volunteer_name.charAt(0).toUpperCase()}
                          </div>
                          <div className="ranger-info">
                            <span className="ranger-name">{report.volunteer_name}</span>
                            <span className="ranger-role">Ranger</span>
                          </div>
                        </div>
                      ) : (
                        <div className="reports-no-ranger">
                          <span>No ranger assigned</span>
                        </div>
                      )}
                    </div>
                  </div>

                  <div className="reports-card-footer">
                    <button 
                      onClick={() => {
                        setSelectedReport(report);
                        setIsModalOpen(true);
                      }}
                      className="reports-btn view"
                    >
                      View Mission Details
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {/* Pagination */}
            {totalPages > 1 && (
              <div className="reports-pagination">
                <button 
                  onClick={prevPage} 
                  disabled={currentPage === 1}
                  className="reports-pagination-btn"
                >
                  ← Prev
                </button>
                
                <div className="reports-pagination-numbers">
                  {getPageNumbers().map((pageNum) => (
                    <button
                      key={pageNum}
                      onClick={() => paginate(pageNum)}
                      className={`reports-pagination-number ${currentPage === pageNum ? 'active' : ''}`}
                    >
                      {pageNum}
                    </button>
                  ))}
                </div>
                
                <button 
                  onClick={nextPage} 
                  disabled={currentPage === totalPages}
                  className="reports-pagination-btn"
                >
                  Next →
                </button>
              </div>
            )}
          </>
        )}
      </div>

      {/* Report Detail Modal */}
      <ReportDetailModal 
        report={selectedReport} 
        isOpen={isModalOpen} 
        onClose={() => {
          setIsModalOpen(false);
          setSelectedReport(null);
        }}
        onAssignClick={() => {
          setIsModalOpen(false);
          setIsVolunteerModalOpen(true);
        }}
        onUnassign={unassignVolunteer}
        getAnimalEmoji={getAnimalEmoji}
        formatDate={formatDate}
        getStatusName={getStatusName}
        showMessage={showMessage}
      />

      {/* Volunteer Selection Modal */}
      <VolunteerSelectModal
        report={selectedReport}
        isOpen={isVolunteerModalOpen}
        onClose={() => {
          setIsVolunteerModalOpen(false);
          setIsModalOpen(true);
        }}
        onSelect={(volunteer) => {
          if (selectedReport) {
            assignVolunteer(selectedReport.report_id, volunteer.user_id, volunteer.username);
          }
        }}
        volunteers={volunteers}
        loadingVolunteers={loadingVolunteers}
        getAnimalEmoji={getAnimalEmoji}
        formatVolunteerDate={formatVolunteerDate}
      />
    </div>
  );
};

export default RescueReports;