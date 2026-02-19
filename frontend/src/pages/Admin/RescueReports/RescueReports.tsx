// // // // import React, { useEffect, useState, useCallback } from 'react';
// // // // import './RescueReports.css';

// // // // interface RescueReport {
// // // //   report_id: number;
// // // //   user_id: number;
// // // //   username: string;
// // // //   email: string;
// // // //   phone: string;
// // // //   description: string;
// // // //   location_address: string;
// // // //   user_note?: string;
// // // //   admin_note?: string;
// // // //   submitted_at: string;
// // // //   updated_at?: string;
// // // //   animal_type: string;
// // // //   animal_condition: string;
// // // //   status_id: number;
// // // //   status_name?: string;
// // // //   volunteer_name?: string;
// // // //   volunteer_id?: number;
// // // //   volunteer_email?: string;
// // // //   volunteer_phone?: string;
// // // // }

// // // // interface Volunteer {
// // // //   user_id: number;
// // // //   username: string;
// // // //   email: string;
// // // //   phone: string;
// // // //   bio?: string;
// // // //   joined_at: string;
// // // //   approval_status: string;
// // // //   approval_status_id: number;
// // // //   availability_status: string;
// // // //   availability_status_id: number;
// // // //   assigned_reports_count: number;
// // // //   role_id: number;
// // // //   created_at: string;
// // // // }

// // // // interface AvailabilityStatus {
// // // //   status_id: number;
// // // //   status_name: string;
// // // // }

// // // // // Volunteer Selection Modal Component
// // // // const VolunteerSelectModal: React.FC<{
// // // //   report: RescueReport | null;
// // // //   isOpen: boolean;
// // // //   onClose: () => void;
// // // //   onSelect: (volunteer: Volunteer) => void;
// // // //   volunteers: Volunteer[];
// // // //   loadingVolunteers: boolean;
// // // //   getAnimalEmoji: (type: string) => string;
// // // //   formatVolunteerDate: (date: string) => string;
// // // // }> = ({ 
// // // //   report, 
// // // //   isOpen, 
// // // //   onClose, 
// // // //   onSelect, 
// // // //   volunteers, 
// // // //   loadingVolunteers, 
// // // //   getAnimalEmoji,
// // // //   formatVolunteerDate 
// // // // }) => {
// // // //   if (!isOpen || !report) return null;

// // // //   // Filter volunteers based on availability status from database
// // // //   const availableVolunteers = volunteers.filter(v => 
// // // //     v.availability_status_id === 1 || v.availability_status?.toLowerCase() === 'available'
// // // //   );

// // // //   const unavailableVolunteers = volunteers.filter(v => 
// // // //     v.availability_status_id === 2 || v.availability_status?.toLowerCase() === 'unavailable'
// // // //   );

// // // //   return (
// // // //     <div className="reports-modal-overlay" onClick={onClose}>
// // // //       <div className="reports-modal-content" onClick={e => e.stopPropagation()}>
// // // //         <div className="reports-modal-header dark">
// // // //           <div>
// // // //             <h3>Assign Volunteer</h3>
// // // //             <p className="reports-modal-subtitle">Report #{report.report_id}</p>
// // // //           </div>
// // // //           <button className="reports-modal-close" onClick={onClose}>×</button>
// // // //         </div>

// // // //         <div className="reports-modal-body">
// // // //           <div className="reports-summary-card">
// // // //             <div className="reports-summary-item">
// // // //               <span className="reports-summary-label">Animal</span>
// // // //               <span className="reports-summary-value">
// // // //                 {getAnimalEmoji(report.animal_type)} {report.animal_type}
// // // //               </span>
// // // //             </div>
// // // //             <div className="reports-summary-item">
// // // //               <span className="reports-summary-label">Location</span>
// // // //               <span className="reports-summary-value location">
// // // //                 {report.location_address}
// // // //               </span>
// // // //             </div>
// // // //           </div>

// // // //           <div className="reports-volunteers-container">
// // // //             <h4>Available Rangers ({availableVolunteers.length})</h4>

// // // //             {loadingVolunteers ? (
// // // //               <div className="reports-loading-state">
// // // //                 <div className="reports-spinner"></div>
// // // //                 <p>Loading volunteers...</p>
// // // //               </div>
// // // //             ) : volunteers.length === 0 ? (
// // // //               <div className="reports-empty-state small">
// // // //                 <span className="empty-emoji">🕊️</span>
// // // //                 <p>No volunteers found</p>
// // // //               </div>
// // // //             ) : (
// // // //               <div className="reports-volunteers-grid">
// // // //                 {/* Available Volunteers */}
// // // //                 {availableVolunteers.length > 0 && (
// // // //                   <div className="reports-volunteer-category">
// // // //                     <div className="reports-category-header">
// // // //                       <span className="reports-status-dot available"></span>
// // // //                       <span>Available for Rescue ({availableVolunteers.length})</span>
// // // //                     </div>
// // // //                     {availableVolunteers.map(volunteer => (
// // // //                       <div key={volunteer.user_id} className="reports-volunteer-item">
// // // //                         <div className="reports-volunteer-avatar-wrapper">
// // // //                           <div className="reports-volunteer-avatar">
// // // //                             {volunteer.username.charAt(0).toUpperCase()}
// // // //                           </div>
// // // //                           {volunteer.assigned_reports_count > 0 && (
// // // //                             <span className="reports-badge-count">{volunteer.assigned_reports_count}</span>
// // // //                           )}
// // // //                         </div>
// // // //                         <div className="reports-volunteer-info">
// // // //                           <div className="reports-volunteer-header">
// // // //                             <h5>{volunteer.username}</h5>
// // // //                             <span className="reports-volunteer-status available">Available</span>
// // // //                           </div>
// // // //                           <div className="reports-volunteer-contact">
// // // //                             <span>{volunteer.email}</span>
// // // //                             {volunteer.phone && <span>{volunteer.phone}</span>}
// // // //                           </div>
// // // //                           <div className="reports-volunteer-meta">
// // // //                             <span>Joined {formatVolunteerDate(volunteer.joined_at)}</span>
// // // //                             <span>{volunteer.assigned_reports_count} active rescues</span>
// // // //                           </div>
// // // //                         </div>
// // // //                         <button
// // // //                           className="reports-btn assign"
// // // //                           onClick={() => onSelect(volunteer)}
// // // //                         >
// // // //                           Assign
// // // //                         </button>
// // // //                       </div>
// // // //                     ))}
// // // //                   </div>
// // // //                 )}

// // // //                 {/* Unavailable Volunteers */}
// // // //                 {unavailableVolunteers.length > 0 && (
// // // //                   <div className="reports-volunteer-category">
// // // //                     <div className="reports-category-header">
// // // //                       <span className="reports-status-dot unavailable"></span>
// // // //                       <span>Unavailable ({unavailableVolunteers.length})</span>
// // // //                     </div>
// // // //                     {unavailableVolunteers.map(volunteer => (
// // // //                       <div key={volunteer.user_id} className="reports-volunteer-item unavailable">
// // // //                         <div className="reports-volunteer-avatar-wrapper">
// // // //                           <div className="reports-volunteer-avatar unavailable">
// // // //                             {volunteer.username.charAt(0).toUpperCase()}
// // // //                           </div>
// // // //                         </div>
// // // //                         <div className="reports-volunteer-info">
// // // //                           <div className="reports-volunteer-header">
// // // //                             <h5>{volunteer.username}</h5>
// // // //                             <span className="reports-volunteer-status unavailable">Unavailable</span>
// // // //                           </div>
// // // //                           <div className="reports-volunteer-contact">
// // // //                             <span>{volunteer.email}</span>
// // // //                           </div>
// // // //                           <div className="reports-volunteer-meta">
// // // //                             <span>Currently unavailable</span>
// // // //                           </div>
// // // //                         </div>
// // // //                         <button
// // // //                           className="reports-btn assign-disabled"
// // // //                           disabled
// // // //                         >
// // // //                           Unavailable
// // // //                         </button>
// // // //                       </div>
// // // //                     ))}
// // // //                   </div>
// // // //                 )}
// // // //               </div>
// // // //             )}
// // // //           </div>
// // // //         </div>

// // // //         <div className="reports-modal-footer">
// // // //           <button className="reports-btn secondary" onClick={onClose}>
// // // //             Cancel
// // // //           </button>
// // // //         </div>
// // // //       </div>
// // // //     </div>
// // // //   );
// // // // };

// // // // // Report Detail Modal Component
// // // // const ReportDetailModal: React.FC<{
// // // //   report: RescueReport | null;
// // // //   isOpen: boolean;
// // // //   onClose: () => void;
// // // //   onAssignClick: () => void;
// // // //   onUnassign: (reportId: number) => void;
// // // //   getAnimalEmoji: (type: string) => string;
// // // //   formatDate: (date: string) => string;
// // // //   getStatusName: (id: number) => string;
// // // //   showMessage: (text: string, type: 'success' | 'error') => void;
// // // // }> = ({ 
// // // //   report, 
// // // //   isOpen, 
// // // //   onClose, 
// // // //   onAssignClick, 
// // // //   onUnassign, 
// // // //   getAnimalEmoji, 
// // // //   formatDate, 
// // // //   getStatusName,
// // // //   showMessage
// // // // }) => {
// // // //   const [localAdminNote, setLocalAdminNote] = useState('');
// // // //   const [savingNote, setSavingNote] = useState(false);

// // // //   useEffect(() => {
// // // //     if (report) {
// // // //       setLocalAdminNote(report.admin_note || '');
// // // //     }
// // // //   }, [report]);

// // // //   if (!isOpen || !report) return null;

// // // //   const handleSaveNote = async (e: React.FormEvent) => {
// // // //     e.preventDefault();

// // // //     if (!localAdminNote.trim()) {
// // // //       showMessage('Please enter a note', 'error');
// // // //       return;
// // // //     }

// // // //     try {
// // // //       const token = localStorage.getItem('token');
// // // //       if (!token) {
// // // //         showMessage('Please login first', 'error');
// // // //         return;
// // // //       }

// // // //       setSavingNote(true);

// // // //       const response = await fetch(`http://localhost:5000/api/reports/${report.report_id}/admin-note`, {
// // // //         method: 'POST',
// // // //         headers: {
// // // //           'Authorization': `Bearer ${token}`,
// // // //           'Content-Type': 'application/json'
// // // //         },
// // // //         body: JSON.stringify({ note: localAdminNote })
// // // //       });

// // // //       if (response.ok) {
// // // //         const data = await response.json();
// // // //         showMessage('Note saved successfully!', 'success');
// // // //         report.admin_note = data.admin_note;
// // // //       } else {
// // // //         const errorData = await response.json();
// // // //         showMessage(errorData.message || 'Failed to save note', 'error');
// // // //       }
// // // //     } catch (error: any) {
// // // //       console.error('Error saving note:', error);
// // // //       showMessage(error.message || 'Error saving note. Please try again.', 'error');
// // // //     } finally {
// // // //       setSavingNote(false);
// // // //     }
// // // //   };

// // // //   return (
// // // //     <div className="reports-modal-overlay" onClick={onClose}>
// // // //       <div className="reports-modal-content large" onClick={e => e.stopPropagation()}>
// // // //         {/* Dark green header for the main modal title */}
// // // //         <div className="reports-modal-header dark">
// // // //           <div>
// // // //             <h3>Rescue Report #{report.report_id}</h3>
// // // //             <div className="reports-modal-subheader">
// // // //               <span className={`reports-status-badge ${getStatusName(report.status_id).toLowerCase().replace(' ', '-')}`}>
// // // //                 {getStatusName(report.status_id)}
// // // //               </span>
// // // //               <span className="reports-meta">{formatDate(report.submitted_at)}</span>
// // // //             </div>
// // // //           </div>
// // // //           <button className="reports-modal-close" onClick={onClose}>×</button>
// // // //         </div>

// // // //         <div className="reports-modal-body">
// // // //           <div className="reports-detail-grid">
// // // //             <div className="reports-detail-column">
// // // //               {/* Animal Information Card - Beige header */}
// // // //               <div className="reports-info-card">
// // // //                 <div className="reports-card-header beige">
// // // //                   <h4>🐾 Animal Information</h4>
// // // //                 </div>
// // // //                 <div className="reports-card-content">
// // // //                   <div className="reports-animal-display">
// // // //                     <div className="reports-animal-icon">
// // // //                       {getAnimalEmoji(report.animal_type)}
// // // //                     </div>
// // // //                     <div className="reports-animal-details">
// // // //                       <div className="reports-animal-type">{report.animal_type}</div>
// // // //                       <div className="reports-animal-condition">
// // // //                         <span className="condition-tag">{report.animal_condition}</span>
// // // //                       </div>
// // // //                     </div>
// // // //                   </div>
// // // //                 </div>
// // // //               </div>

// // // //               {/* Reporter Details Card - Beige header */}
// // // //               <div className="reports-info-card">
// // // //                 <div className="reports-card-header beige">
// // // //                   <h4>👤 Reporter Details</h4>
// // // //                 </div>
// // // //                 <div className="reports-card-content">
// // // //                   <div className="reports-detail-list">
// // // //                     <div className="reports-detail-row">
// // // //                       <span className="reports-detail-label">Name</span>
// // // //                       <span className="reports-detail-value">{report.username}</span>
// // // //                     </div>
// // // //                     <div className="reports-detail-row">
// // // //                       <span className="reports-detail-label">Email</span>
// // // //                       <span className="reports-detail-value">{report.email}</span>
// // // //                     </div>
// // // //                     <div className="reports-detail-row">
// // // //                       <span className="reports-detail-label">Phone</span>
// // // //                       <span className="reports-detail-value">{report.phone}</span>
// // // //                     </div>
// // // //                   </div>
// // // //                 </div>
// // // //               </div>

// // // //               {/* Location Card - Beige header */}
// // // //               <div className="reports-info-card">
// // // //                 <div className="reports-card-header beige">
// // // //                   <h4>📍 Location</h4>
// // // //                 </div>
// // // //                 <div className="reports-card-content">
// // // //                   <div className="reports-location-info">
// // // //                     <p>{report.location_address}</p>
// // // //                     <button 
// // // //                       className="reports-btn map"
// // // //                       onClick={() => {
// // // //                         const encodedAddress = encodeURIComponent(report.location_address);
// // // //                         window.open(`https://maps.google.com/?q=${encodedAddress}`, '_blank');
// // // //                       }}
// // // //                     >
// // // //                       View on Map
// // // //                     </button>
// // // //                   </div>
// // // //                 </div>
// // // //               </div>
// // // //             </div>

// // // //             <div className="reports-detail-column">
// // // //               {/* Volunteer Assignment Card - Beige header */}
// // // //               <div className="reports-info-card">
// // // //                 <div className="reports-card-header beige">
// // // //                   <div className="reports-header-row">
// // // //                     <h4>🦸 Volunteer Assignment</h4>
// // // //                     {!report.volunteer_name && (
// // // //                       <button 
// // // //                         className="reports-btn primary small"
// // // //                         onClick={onAssignClick}
// // // //                       >
// // // //                         + Assign Ranger
// // // //                       </button>
// // // //                     )}
// // // //                   </div>
// // // //                 </div>
// // // //                 <div className="reports-card-content">
// // // //                   {report.volunteer_name ? (
// // // //                     <div className="reports-volunteer-assigned">
// // // //                       <div className="reports-assigned-volunteer">
// // // //                         <div className="reports-volunteer-avatar large">
// // // //                           {report.volunteer_name.charAt(0).toUpperCase()}
// // // //                         </div>
// // // //                         <div className="reports-assigned-info">
// // // //                           <h5>{report.volunteer_name}</h5>
// // // //                           <div className="reports-assigned-contact">
// // // //                             {report.volunteer_email && <span>{report.volunteer_email}</span>}
// // // //                             {report.volunteer_phone && <span>{report.volunteer_phone}</span>}
// // // //                           </div>
// // // //                         </div>
// // // //                       </div>
// // // //                       <button 
// // // //                         className="reports-btn unassign"
// // // //                         onClick={() => onUnassign(report.report_id)}
// // // //                       >
// // // //                         Unassign
// // // //                       </button>
// // // //                     </div>
// // // //                   ) : (
// // // //                     <div className="reports-no-volunteer">
// // // //                       <span className="no-volunteer-emoji">🕊️</span>
// // // //                       <p>No ranger assigned yet</p>
// // // //                       <button 
// // // //                         className="reports-btn text"
// // // //                         onClick={onAssignClick}
// // // //                       >
// // // //                         Click to assign a ranger
// // // //                       </button>
// // // //                     </div>
// // // //                   )}
// // // //                 </div>
// // // //               </div>

// // // //               {/* Description Card - Beige header */}
// // // //               <div className="reports-info-card">
// // // //                 <div className="reports-card-header beige">
// // // //                   <h4>📝 Report Description</h4>
// // // //                 </div>
// // // //                 <div className="reports-card-content">
// // // //                   <div className="reports-description">
// // // //                     <p>{report.description}</p>
// // // //                   </div>
// // // //                   {report.user_note && (
// // // //                     <div className="reports-user-note">
// // // //                       <div className="note-label">Reporter's Note:</div>
// // // //                       <p>{report.user_note}</p>
// // // //                     </div>
// // // //                   )}
// // // //                 </div>
// // // //               </div>

// // // //               {/* Admin Notes Card - Beige header */}
// // // //               <div className="reports-info-card">
// // // //                 <div className="reports-card-header beige">
// // // //                   <h4>📌 Admin Notes</h4>
// // // //                 </div>
// // // //                 <div className="reports-card-content">
// // // //                   <form onSubmit={handleSaveNote} className="reports-notes-form">
// // // //                     <textarea
// // // //                       className="reports-notes-input"
// // // //                       placeholder="Add internal notes about this rescue mission..."
// // // //                       value={localAdminNote}
// // // //                       onChange={(e) => setLocalAdminNote(e.target.value)}
// // // //                       rows={3}
// // // //                     />
// // // //                     <div className="reports-notes-actions">
// // // //                       <button
// // // //                         type="submit"
// // // //                         className="reports-btn save"
// // // //                         disabled={savingNote || !localAdminNote.trim()}
// // // //                       >
// // // //                         {savingNote ? 'Saving...' : 'Save Note'}
// // // //                       </button>
// // // //                     </div>
// // // //                   </form>
// // // //                 </div>
// // // //               </div>
// // // //             </div>
// // // //           </div>
// // // //         </div>

// // // //         <div className="reports-modal-footer">
// // // //           <button className="reports-btn secondary" onClick={onClose}>
// // // //             Close
// // // //           </button>
// // // //         </div>
// // // //       </div>
// // // //     </div>
// // // //   );
// // // // };

// // // // const RescueReports: React.FC = () => {
// // // //   const [reports, setReports] = useState<RescueReport[]>([]);
// // // //   const [volunteers, setVolunteers] = useState<Volunteer[]>([]);
// // // //   const [availabilityStatuses, setAvailabilityStatuses] = useState<AvailabilityStatus[]>([]);
// // // //   const [loading, setLoading] = useState(true);
// // // //   const [loadingVolunteers, setLoadingVolunteers] = useState(false);
// // // //   const [filterStatus, setFilterStatus] = useState<string>('all');
// // // //   const [sortBy, setSortBy] = useState<string>('recent');
// // // //   const [searchQuery, setSearchQuery] = useState<string>('');
// // // //   const [selectedReport, setSelectedReport] = useState<RescueReport | null>(null);
// // // //   const [isModalOpen, setIsModalOpen] = useState(false);
// // // //   const [isVolunteerModalOpen, setIsVolunteerModalOpen] = useState(false);
// // // //   const [showSuccessMessage, setShowSuccessMessage] = useState(false);
// // // //   const [showErrorMessage, setShowErrorMessage] = useState(false);
// // // //   const [message, setMessage] = useState('');

// // // //   // Pagination state
// // // //   const [currentPage, setCurrentPage] = useState(1);
// // // //   const [itemsPerPage] = useState(9);

// // // //   // Fetch status list from database
// // // //   const fetchStatusList = useCallback(async () => {
// // // //     try {
// // // //       const token = localStorage.getItem('token');
// // // //       if (!token) return;

// // // //       const response = await fetch('http://localhost:5000/api/reports/status/list', {
// // // //         headers: {
// // // //           'Authorization': `Bearer ${token}`,
// // // //           'Content-Type': 'application/json'
// // // //         }
// // // //       });

// // // //       if (response.ok) {
// // // //         const data = await response.json();
// // // //         if (data.success) {
// // // //           setAvailabilityStatuses(data.data || []);
// // // //         }
// // // //       }
// // // //     } catch (error) {
// // // //       console.error('Error fetching status list:', error);
// // // //     }
// // // //   }, []);

// // // //   const getStatusName = (statusId: number): string => {
// // // //     // Try to get from report status_name first
// // // //     const report = reports.find(r => r.status_id === statusId);
// // // //     if (report?.status_name) {
// // // //       return report.status_name;
// // // //     }

// // // //     // Fallback mapping
// // // //     const statusMap: { [key: number]: string } = {
// // // //       1: 'Submitted',
// // // //       2: 'Assigned',
// // // //       3: 'In Progress',
// // // //       4: 'Completed',
// // // //       5: 'Declined'
// // // //     };
// // // //     return statusMap[statusId] || 'Unknown';
// // // //   };

// // // //   const showMessage = (text: string, type: 'success' | 'error') => {
// // // //     setMessage(text);
// // // //     if (type === 'success') {
// // // //       setShowSuccessMessage(true);
// // // //     } else {
// // // //       setShowErrorMessage(true);
// // // //     }
// // // //     setTimeout(() => {
// // // //       setShowSuccessMessage(false);
// // // //       setShowErrorMessage(false);
// // // //       setMessage('');
// // // //     }, 3000);
// // // //   };

// // // //   const fetchReports = useCallback(async () => {
// // // //     try {
// // // //       setLoading(true);

// // // //       const token = localStorage.getItem('token');
// // // //       if (!token) {
// // // //         showMessage('Please login first', 'error');
// // // //         setLoading(false);
// // // //         return;
// // // //       }

// // // //       const response = await fetch('http://localhost:5000/api/reports/admin/all', {
// // // //         headers: {
// // // //           'Authorization': `Bearer ${token}`,
// // // //           'Content-Type': 'application/json'
// // // //         }
// // // //       });

// // // //       if (response.ok) {
// // // //         const data = await response.json();

// // // //         if (data.success) {
// // // //           const reportsData = data.data || [];

// // // //           const mappedReports = reportsData.map((report: any) => ({
// // // //             report_id: report.report_id,
// // // //             user_id: report.user_id,
// // // //             username: report.reporter_name || 'Anonymous',
// // // //             email: report.email || 'No email',
// // // //             phone: report.reporter_phone || 'No phone',
// // // //             description: report.description,
// // // //             location_address: report.location_address,
// // // //             user_note: report.user_note,
// // // //             admin_note: report.admin_note,
// // // //             submitted_at: report.submitted_at,
// // // //             animal_type: report.animal_type || 'Unknown',
// // // //             animal_condition: report.animal_condition || 'Unknown',
// // // //             status_id: report.status_id || 1,
// // // //             status_name: report.status_name, // From database join
// // // //             volunteer_name: report.volunteer_name,
// // // //             volunteer_id: report.volunteer_id,
// // // //             volunteer_email: report.volunteer_email,
// // // //             volunteer_phone: report.volunteer_phone
// // // //           }));

// // // //           setReports(mappedReports);
// // // //           setCurrentPage(1);
// // // //         } else {
// // // //           showMessage(data.message || 'Failed to load reports', 'error');
// // // //         }
// // // //       } else {
// // // //         showMessage('Failed to fetch reports', 'error');
// // // //       }
// // // //     } catch (error: any) {
// // // //       console.error('Network error fetching reports:', error);
// // // //       showMessage('Error loading reports. Please check your connection.', 'error');
// // // //     } finally {
// // // //       setLoading(false);
// // // //     }
// // // //   }, []);

// // // //   const fetchVolunteers = useCallback(async () => {
// // // //     try {
// // // //       setLoadingVolunteers(true);

// // // //       const token = localStorage.getItem('token');
// // // //       if (!token) {
// // // //         setVolunteers([]);
// // // //         setLoadingVolunteers(false);
// // // //         return;
// // // //       }

// // // //       const response = await fetch('http://localhost:5000/api/volunteers/available', {
// // // //         headers: {
// // // //           'Authorization': `Bearer ${token}`,
// // // //           'Content-Type': 'application/json'
// // // //         }
// // // //       });

// // // //       if (response.ok) {
// // // //         const data = await response.json();

// // // //         if (data.success) {
// // // //           const volunteersData = data.data || [];

// // // //           const mappedVolunteers = volunteersData.map((volunteer: any) => ({
// // // //             user_id: volunteer.user_id,
// // // //             username: volunteer.username,
// // // //             email: volunteer.email,
// // // //             phone: volunteer.phone || 'Not provided',
// // // //             bio: volunteer.bio,
// // // //             joined_at: volunteer.joined_at || volunteer.created_at,
// // // //             approval_status: volunteer.approval_status,
// // // //             approval_status_id: volunteer.approval_status_id,
// // // //             availability_status: volunteer.availability_status,
// // // //             availability_status_id: volunteer.availability_status_id,
// // // //             assigned_reports_count: volunteer.assigned_reports_count || 0,
// // // //             role_id: volunteer.role_id,
// // // //             created_at: volunteer.created_at
// // // //           }));

// // // //           setVolunteers(mappedVolunteers);
// // // //         } else {
// // // //           console.error('Failed to load volunteers:', data.message);
// // // //           setVolunteers([]);
// // // //         }
// // // //       } else {
// // // //         console.error('HTTP Error fetching volunteers:', response.status);
// // // //         setVolunteers([]);
// // // //       }
// // // //     } catch (error) {
// // // //       console.error('Error fetching volunteers:', error);
// // // //       setVolunteers([]);
// // // //     } finally {
// // // //       setLoadingVolunteers(false);
// // // //     }
// // // //   }, []);

// // // //   useEffect(() => {
// // // //     fetchStatusList();
// // // //     fetchReports();
// // // //     fetchVolunteers();
// // // //   }, [fetchReports, fetchVolunteers, fetchStatusList]);

// // // //   const assignVolunteer = async (reportId: number, volunteerId: number, volunteerName: string) => {
// // // //     try {
// // // //       const token = localStorage.getItem('token');
// // // //       if (!token) {
// // // //         showMessage('Please login first', 'error');
// // // //         return;
// // // //       }

// // // //       const response = await fetch(`http://localhost:5000/api/reports/${reportId}/assign`, {
// // // //         method: 'POST',
// // // //         headers: {
// // // //           'Authorization': `Bearer ${token}`,
// // // //           'Content-Type': 'application/json'
// // // //         },
// // // //         body: JSON.stringify({ 
// // // //           volunteer_id: volunteerId,
// // // //           status_id: 2
// // // //         })
// // // //       });

// // // //       if (response.ok) {
// // // //         const data = await response.json();

// // // //         const volunteer = volunteers.find(v => v.user_id === volunteerId);

// // // //         setReports(prev => prev.map(report => {
// // // //           if (report.report_id === reportId) {
// // // //             return {
// // // //               ...report,
// // // //               volunteer_id: volunteerId,
// // // //               volunteer_name: volunteerName,
// // // //               volunteer_email: volunteer?.email || '',
// // // //               volunteer_phone: volunteer?.phone || '',
// // // //               status_id: 2,
// // // //               status_name: 'Assigned'
// // // //             };
// // // //           }
// // // //           return report;
// // // //         }));

// // // //         setVolunteers(prev => prev.map(v => {
// // // //           if (v.user_id === volunteerId) {
// // // //             return {
// // // //               ...v,
// // // //               assigned_reports_count: (v.assigned_reports_count || 0) + 1
// // // //             };
// // // //           }
// // // //           return v;
// // // //         }));

// // // //         showMessage(`Ranger "${volunteerName}" assigned successfully!`, 'success');
// // // //         setIsVolunteerModalOpen(false);
// // // //         setSelectedReport(null);
// // // //         fetchReports();
// // // //         fetchVolunteers();
// // // //       } else {
// // // //         const errorData = await response.json();
// // // //         showMessage(errorData.message || 'Failed to assign volunteer', 'error');
// // // //       }
// // // //     } catch (error: any) {
// // // //       console.error('Error assigning volunteer:', error);
// // // //       showMessage(error.message || 'Error assigning volunteer. Please try again.', 'error');
// // // //     }
// // // //   };

// // // //   const unassignVolunteer = async (reportId: number) => {
// // // //     if (!window.confirm('Are you sure you want to unassign this ranger? The status will be reset to "Submitted".')) return;

// // // //     try {
// // // //       const token = localStorage.getItem('token');
// // // //       if (!token) {
// // // //         showMessage('Please login first', 'error');
// // // //         return;
// // // //       }

// // // //       const response = await fetch(`http://localhost:5000/api/reports/${reportId}/unassign`, {
// // // //         method: 'PUT',
// // // //         headers: {
// // // //           'Authorization': `Bearer ${token}`,
// // // //           'Content-Type': 'application/json'
// // // //         }
// // // //       });

// // // //       if (response.ok) {
// // // //         const report = reports.find(r => r.report_id === reportId);
// // // //         const volunteerId = report?.volunteer_id;

// // // //         setReports(prev => prev.map(report => {
// // // //           if (report.report_id === reportId) {
// // // //             return {
// // // //               ...report,
// // // //               volunteer_id: undefined,
// // // //               volunteer_name: undefined,
// // // //               volunteer_email: undefined,
// // // //               volunteer_phone: undefined,
// // // //               status_id: 1,
// // // //               status_name: 'Submitted'
// // // //             };
// // // //           }
// // // //           return report;
// // // //         }));

// // // //         if (volunteerId) {
// // // //           setVolunteers(prev => prev.map(v => {
// // // //             if (v.user_id === volunteerId) {
// // // //               return {
// // // //                 ...v,
// // // //                 assigned_reports_count: Math.max(0, (v.assigned_reports_count || 0) - 1)
// // // //               };
// // // //             }
// // // //             return v;
// // // //           }));
// // // //         }

// // // //         showMessage('Ranger unassigned successfully!', 'success');
// // // //         fetchReports();
// // // //         fetchVolunteers();
// // // //       } else {
// // // //         const errorData = await response.json();
// // // //         showMessage(errorData.message || 'Failed to unassign volunteer', 'error');
// // // //       }
// // // //     } catch (error: any) {
// // // //       console.error('Error unassigning volunteer:', error);
// // // //       showMessage(error.message || 'Error unassigning volunteer. Please try again.', 'error');
// // // //     }
// // // //   };

// // // //   const getAnimalEmoji = (animalType: string): string => {
// // // //     const type = animalType?.toLowerCase() || '';
// // // //     if (type.includes('dog')) return '🐶';
// // // //     if (type.includes('cat')) return '🐱';
// // // //     if (type.includes('bird')) return '🐦';
// // // //     if (type.includes('rabbit')) return '🐰';
// // // //     if (type.includes('hamster')) return '🐹';
// // // //     if (type.includes('turtle')) return '🐢';
// // // //     if (type.includes('snake')) return '🐍';
// // // //     if (type.includes('fish')) return '🐟';
// // // //     if (type.includes('horse')) return '🐴';
// // // //     if (type.includes('cow')) return '🐮';
// // // //     if (type.includes('goat')) return '🐐';
// // // //     if (type.includes('sheep')) return '🐑';
// // // //     return '🐾';
// // // //   };

// // // //   const formatDate = (dateString: string): string => {
// // // //     try {
// // // //       const date = new Date(dateString);
// // // //       return date.toLocaleDateString('en-US', {
// // // //         month: 'short',
// // // //         day: 'numeric',
// // // //         year: 'numeric',
// // // //         hour: '2-digit',
// // // //         minute: '2-digit'
// // // //       });
// // // //     } catch (error) {
// // // //       return 'Invalid date';
// // // //     }
// // // //   };

// // // //   const formatVolunteerDate = (dateString: string): string => {
// // // //     try {
// // // //       const date = new Date(dateString);
// // // //       return date.toLocaleDateString('en-US', {
// // // //         year: 'numeric',
// // // //         month: 'short',
// // // //         day: 'numeric'
// // // //       });
// // // //     } catch (error) {
// // // //       return 'Invalid date';
// // // //     }
// // // //   };

// // // //   const filteredReports = reports
// // // //     .filter(report => {
// // // //       if (filterStatus !== 'all') {
// // // //         const statusMap: { [key: string]: number } = {
// // // //           'submitted': 1,
// // // //           'assigned': 2,
// // // //           'in-progress': 3,
// // // //           'completed': 4,
// // // //           'declined': 5
// // // //         };
// // // //         if (report.status_id !== statusMap[filterStatus]) return false;
// // // //       }

// // // //       if (searchQuery) {
// // // //         const query = searchQuery.toLowerCase();
// // // //         return (
// // // //           report.username?.toLowerCase().includes(query) ||
// // // //           report.animal_type?.toLowerCase().includes(query) ||
// // // //           report.location_address?.toLowerCase().includes(query) ||
// // // //           report.description?.toLowerCase().includes(query) ||
// // // //           report.report_id.toString().includes(query) ||
// // // //           report.volunteer_name?.toLowerCase().includes(query) ||
// // // //           report.phone?.toLowerCase().includes(query)
// // // //         );
// // // //       }

// // // //       return true;
// // // //     })
// // // //     .sort((a, b) => {
// // // //       switch(sortBy) {
// // // //         case 'recent':
// // // //           return new Date(b.submitted_at).getTime() - new Date(a.submitted_at).getTime();
// // // //         case 'oldest':
// // // //           return new Date(a.submitted_at).getTime() - new Date(b.submitted_at).getTime();
// // // //         case 'critical':
// // // //           const getCriticalScore = (condition: string) => {
// // // //             const cond = condition?.toLowerCase() || '';
// // // //             if (cond.includes('critical')) return 0;
// // // //             if (cond.includes('severe')) return 1;
// // // //             if (cond.includes('urgent')) return 2;
// // // //             return 3;
// // // //           };
// // // //           return getCriticalScore(a.animal_condition) - getCriticalScore(b.animal_condition);
// // // //         case 'status':
// // // //           return a.status_id - b.status_id;
// // // //         default:
// // // //           return 0;
// // // //       }
// // // //     });

// // // //   // Pagination logic
// // // //   const indexOfLastItem = currentPage * itemsPerPage;
// // // //   const indexOfFirstItem = indexOfLastItem - itemsPerPage;
// // // //   const currentItems = filteredReports.slice(indexOfFirstItem, indexOfLastItem);
// // // //   const totalPages = Math.ceil(filteredReports.length / itemsPerPage);

// // // //   const paginate = (pageNumber: number) => setCurrentPage(pageNumber);
// // // //   const nextPage = () => setCurrentPage(prev => Math.min(prev + 1, totalPages));
// // // //   const prevPage = () => setCurrentPage(prev => Math.max(prev - 1, 1));

// // // //   const getPageNumbers = (): number[] => {
// // // //     const pageNumbers: number[] = [];
// // // //     const maxVisible = 5;

// // // //     if (totalPages <= maxVisible) {
// // // //       for (let i = 1; i <= totalPages; i++) {
// // // //         pageNumbers.push(i);
// // // //       }
// // // //     } else {
// // // //       if (currentPage <= 3) {
// // // //         for (let i = 1; i <= 5; i++) {
// // // //           pageNumbers.push(i);
// // // //         }
// // // //       } else if (currentPage >= totalPages - 2) {
// // // //         for (let i = totalPages - 4; i <= totalPages; i++) {
// // // //           pageNumbers.push(i);
// // // //         }
// // // //       } else {
// // // //         for (let i = currentPage - 2; i <= currentPage + 2; i++) {
// // // //           pageNumbers.push(i);
// // // //         }
// // // //       }
// // // //     }

// // // //     return pageNumbers;
// // // //   };

// // // //   if (loading) {
// // // //     return (
// // // //       <div className="reports-loading-container">
// // // //         <div className="reports-loader">
// // // //           <div className="reports-spinner"></div>
// // // //           <p className="reports-loader-text">Loading rescue missions...</p>
// // // //         </div>
// // // //       </div>
// // // //     );
// // // //   }

// // // //   return (
// // // //     <div className="reports-container">
// // // //       {/* Success/Error Messages */}
// // // //       {showSuccessMessage && (
// // // //         <div className="reports-notification success">
// // // //           <span className="notification-icon">✓</span>
// // // //           <span>{message}</span>
// // // //         </div>
// // // //       )}
// // // //       {showErrorMessage && (
// // // //         <div className="reports-notification error">
// // // //           <span className="notification-icon">⚠</span>
// // // //           <span>{message}</span>
// // // //         </div>
// // // //       )}

// // // //       {/* Header */}
// // // //       <div className="reports-header">
// // // //         <div className="reports-header-content">
// // // //           <h1 className="reports-title">Rescue Operations</h1>
// // // //           <p className="reports-subtitle">
// // // //             Manage and coordinate animal rescue missions with our ranger team
// // // //           </p>
// // // //         </div>
// // // //         <div className="reports-header-actions">
// // // //           <button onClick={fetchReports} className="reports-btn refresh">
// // // //             <span className="btn-icon">↻</span>
// // // //             Refresh
// // // //           </button>
// // // //         </div>
// // // //       </div>

// // // //       {/* Filters */}
// // // //       <div className="reports-filters-card">
// // // //         <div className="reports-search-wrapper">
// // // //           <span className="search-icon">🔍</span>
// // // //           <input
// // // //             type="text"
// // // //             placeholder="Search by ID, animal, location, ranger..."
// // // //             value={searchQuery}
// // // //             onChange={(e) => setSearchQuery(e.target.value)}
// // // //             className="reports-search-input"
// // // //           />
// // // //           {searchQuery && (
// // // //             <button 
// // // //               className="reports-clear-search"
// // // //               onClick={() => setSearchQuery('')}
// // // //             >
// // // //               ×
// // // //             </button>
// // // //           )}
// // // //         </div>

// // // //         <div className="reports-filters-row">
// // // //           <div className="reports-filter-group">
// // // //             <label className="reports-filter-label">Status</label>
// // // //             <select 
// // // //               value={filterStatus} 
// // // //               onChange={(e) => setFilterStatus(e.target.value)}
// // // //               className="reports-filter-select"
// // // //             >
// // // //               <option value="all">All Status</option>
// // // //               <option value="submitted">Submitted</option>
// // // //               <option value="assigned">Assigned</option>
// // // //               <option value="in-progress">In Progress</option>
// // // //               <option value="completed">Completed</option>
// // // //               <option value="declined">Declined</option>
// // // //             </select>
// // // //           </div>

// // // //           <div className="reports-filter-group">
// // // //             <label className="reports-filter-label">Sort By</label>
// // // //             <select 
// // // //               value={sortBy} 
// // // //               onChange={(e) => setSortBy(e.target.value)}
// // // //               className="reports-filter-select"
// // // //             >
// // // //               <option value="recent">Most Recent</option>
// // // //               <option value="oldest">Oldest</option>
// // // //               <option value="critical">Critical First</option>
// // // //               <option value="status">By Status</option>
// // // //             </select>
// // // //           </div>

// // // //           <div className="reports-stats-badge">
// // // //             {filteredReports.length} of {reports.length} missions
// // // //           </div>
// // // //         </div>
// // // //       </div>

// // // //       {/* Reports Grid/Cards */}
// // // //       <div className="reports-content">
// // // //         {filteredReports.length === 0 ? (
// // // //           <div className="reports-empty-state">
// // // //             <span className="empty-state-emoji">🕊️</span>
// // // //             <h3>No Rescue Missions Found</h3>
// // // //             <p>
// // // //               {searchQuery 
// // // //                 ? `No missions matching "${searchQuery}"` 
// // // //                 : filterStatus !== 'all'
// // // //                 ? `No missions with status "${filterStatus}"`
// // // //                 : 'No rescue missions have been reported yet.'}
// // // //             </p>
// // // //             {(searchQuery || filterStatus !== 'all') && (
// // // //               <button 
// // // //                 onClick={() => {
// // // //                   setSearchQuery('');
// // // //                   setFilterStatus('all');
// // // //                   setCurrentPage(1);
// // // //                 }}
// // // //                 className="reports-btn outline"
// // // //               >
// // // //                 Clear Filters
// // // //               </button>
// // // //             )}
// // // //           </div>
// // // //         ) : (
// // // //           <>
// // // //             <div className="reports-grid">
// // // //               {currentItems.map(report => (
// // // //                 <div key={report.report_id} className="reports-card">
// // // //                   <div className="reports-card-header dark">
// // // //                     <div className="reports-card-title">
// // // //                       <span className="reports-id">#{report.report_id}</span>
// // // //                       <span className={`reports-status ${getStatusName(report.status_id).toLowerCase().replace(' ', '-')}`}>
// // // //                         {getStatusName(report.status_id)}
// // // //                       </span>
// // // //                     </div>
// // // //                     <div className="reports-date">
// // // //                       {formatDate(report.submitted_at)}
// // // //                     </div>
// // // //                   </div>

// // // //                   <div className="reports-card-body">
// // // //                     <div className="reports-animal-section">
// // // //                       <div className="reports-animal-icon large">
// // // //                         {getAnimalEmoji(report.animal_type)}
// // // //                       </div>
// // // //                       <div className="reports-animal-info">
// // // //                         <h4>{report.animal_type}</h4>
// // // //                         <span className="reports-condition">{report.animal_condition}</span>
// // // //                       </div>
// // // //                     </div>

// // // //                     <div className="reports-location-section">
// // // //                       <span className="location-icon">📍</span>
// // // //                       <span className="location-text">{report.location_address}</span>
// // // //                     </div>

// // // //                     <div className="reports-volunteer-section">
// // // //                       {report.volunteer_name ? (
// // // //                         <div className="reports-assigned-ranger">
// // // //                           <div className="ranger-avatar">
// // // //                             {report.volunteer_name.charAt(0).toUpperCase()}
// // // //                           </div>
// // // //                           <div className="ranger-info">
// // // //                             <span className="ranger-name">{report.volunteer_name}</span>
// // // //                             <span className="ranger-role">Ranger</span>
// // // //                           </div>
// // // //                         </div>
// // // //                       ) : (
// // // //                         <div className="reports-no-ranger">
// // // //                           <span>No ranger assigned</span>
// // // //                         </div>
// // // //                       )}
// // // //                     </div>
// // // //                   </div>

// // // //                   <div className="reports-card-footer">
// // // //                     <button 
// // // //                       onClick={() => {
// // // //                         setSelectedReport(report);
// // // //                         setIsModalOpen(true);
// // // //                       }}
// // // //                       className="reports-btn view"
// // // //                     >
// // // //                       View Mission Details
// // // //                     </button>
// // // //                   </div>
// // // //                 </div>
// // // //               ))}
// // // //             </div>

// // // //             {/* Pagination */}
// // // //             {totalPages > 1 && (
// // // //               <div className="reports-pagination">
// // // //                 <button 
// // // //                   onClick={prevPage} 
// // // //                   disabled={currentPage === 1}
// // // //                   className="reports-pagination-btn"
// // // //                 >
// // // //                   ← Prev
// // // //                 </button>

// // // //                 <div className="reports-pagination-numbers">
// // // //                   {getPageNumbers().map((pageNum) => (
// // // //                     <button
// // // //                       key={pageNum}
// // // //                       onClick={() => paginate(pageNum)}
// // // //                       className={`reports-pagination-number ${currentPage === pageNum ? 'active' : ''}`}
// // // //                     >
// // // //                       {pageNum}
// // // //                     </button>
// // // //                   ))}
// // // //                 </div>

// // // //                 <button 
// // // //                   onClick={nextPage} 
// // // //                   disabled={currentPage === totalPages}
// // // //                   className="reports-pagination-btn"
// // // //                 >
// // // //                   Next →
// // // //                 </button>
// // // //               </div>
// // // //             )}
// // // //           </>
// // // //         )}
// // // //       </div>

// // // //       {/* Report Detail Modal */}
// // // //       <ReportDetailModal 
// // // //         report={selectedReport} 
// // // //         isOpen={isModalOpen} 
// // // //         onClose={() => {
// // // //           setIsModalOpen(false);
// // // //           setSelectedReport(null);
// // // //         }}
// // // //         onAssignClick={() => {
// // // //           setIsModalOpen(false);
// // // //           setIsVolunteerModalOpen(true);
// // // //         }}
// // // //         onUnassign={unassignVolunteer}
// // // //         getAnimalEmoji={getAnimalEmoji}
// // // //         formatDate={formatDate}
// // // //         getStatusName={getStatusName}
// // // //         showMessage={showMessage}
// // // //       />

// // // //       {/* Volunteer Selection Modal */}
// // // //       <VolunteerSelectModal
// // // //         report={selectedReport}
// // // //         isOpen={isVolunteerModalOpen}
// // // //         onClose={() => {
// // // //           setIsVolunteerModalOpen(false);
// // // //           setIsModalOpen(true);
// // // //         }}
// // // //         onSelect={(volunteer) => {
// // // //           if (selectedReport) {
// // // //             assignVolunteer(selectedReport.report_id, volunteer.user_id, volunteer.username);
// // // //           }
// // // //         }}
// // // //         volunteers={volunteers}
// // // //         loadingVolunteers={loadingVolunteers}
// // // //         getAnimalEmoji={getAnimalEmoji}
// // // //         formatVolunteerDate={formatVolunteerDate}
// // // //       />
// // // //     </div>
// // // //   );
// // // // };

// // // // export default RescueReports;


// // // // import React, { useEffect, useState, useCallback } from 'react';
// // // // import './RescueReports.css';

// // // // interface RescueReport {
// // // //   report_id: number;
// // // //   user_id: number;
// // // //   username: string;
// // // //   email: string;
// // // //   phone: string;
// // // //   description: string;
// // // //   location_address: string;
// // // //   user_note?: string;
// // // //   admin_note?: string;
// // // //   submitted_at: string;
// // // //   updated_at?: string;
// // // //   animal_type: string;
// // // //   animal_condition: string;
// // // //   status_id: number;
// // // //   status_name?: string;
// // // //   volunteer_name?: string;
// // // //   volunteer_id?: number;
// // // //   volunteer_email?: string;
// // // //   volunteer_phone?: string;
// // // //   // Task declined information - comes directly from backend
// // // //   declined_reason?: string;
// // // //   volunteer_responded_at?: string;
// // // //   volunteer_response?: string;
// // // //   task_id?: number;
// // // //   task_status?: string;
// // // // }

// // // // interface Volunteer {
// // // //   user_id: number;
// // // //   username: string;
// // // //   email: string;
// // // //   phone: string;
// // // //   bio?: string;
// // // //   joined_at: string;
// // // //   approval_status: string;
// // // //   approval_status_id: number;
// // // //   availability_status: string;
// // // //   availability_status_id: number;
// // // //   assigned_reports_count: number;
// // // //   role_id: number;
// // // //   created_at: string;
// // // // }

// // // // interface AvailabilityStatus {
// // // //   status_id: number;
// // // //   status_name: string;
// // // // }

// // // // // Volunteer Selection Modal Component
// // // // const VolunteerSelectModal: React.FC<{
// // // //   report: RescueReport | null;
// // // //   isOpen: boolean;
// // // //   onClose: () => void;
// // // //   onSelect: (volunteer: Volunteer) => void;
// // // //   volunteers: Volunteer[];
// // // //   loadingVolunteers: boolean;
// // // //   getAnimalEmoji: (type: string) => string;
// // // //   formatVolunteerDate: (date: string) => string;
// // // // }> = ({ 
// // // //   report, 
// // // //   isOpen, 
// // // //   onClose, 
// // // //   onSelect, 
// // // //   volunteers, 
// // // //   loadingVolunteers, 
// // // //   getAnimalEmoji,
// // // //   formatVolunteerDate 
// // // // }) => {
// // // //   if (!isOpen || !report) return null;

// // // //   const availableVolunteers = volunteers.filter(v => 
// // // //     v.availability_status_id === 1 || v.availability_status?.toLowerCase() === 'available'
// // // //   );

// // // //   const unavailableVolunteers = volunteers.filter(v => 
// // // //     v.availability_status_id === 2 || v.availability_status?.toLowerCase() === 'unavailable'
// // // //   );

// // // //   return (
// // // //     <div className="reports-modal-overlay" onClick={onClose}>
// // // //       <div className="reports-modal-content" onClick={e => e.stopPropagation()}>
// // // //         <div className="reports-modal-header dark">
// // // //           <div>
// // // //             <h3>Assign Ranger</h3>
// // // //             <p className="reports-modal-subtitle">Report #{report.report_id}</p>
// // // //           </div>
// // // //           <button className="reports-modal-close" onClick={onClose}>×</button>
// // // //         </div>

// // // //         <div className="reports-modal-body">
// // // //           <div className="reports-summary-card">
// // // //             <div className="reports-summary-item">
// // // //               <span className="reports-summary-label">Animal</span>
// // // //               <span className="reports-summary-value">
// // // //                 {getAnimalEmoji(report.animal_type)} {report.animal_type}
// // // //               </span>
// // // //             </div>
// // // //             <div className="reports-summary-item">
// // // //               <span className="reports-summary-label">Location</span>
// // // //               <span className="reports-summary-value location">
// // // //                 {report.location_address}
// // // //               </span>
// // // //             </div>
// // // //           </div>

// // // //           <div className="reports-volunteers-container">
// // // //             <h4>Available Rangers ({availableVolunteers.length})</h4>

// // // //             {loadingVolunteers ? (
// // // //               <div className="reports-loading-state">
// // // //                 <div className="reports-spinner"></div>
// // // //                 <p>Loading rangers...</p>
// // // //               </div>
// // // //             ) : volunteers.length === 0 ? (
// // // //               <div className="reports-empty-state small">
// // // //                 <span className="empty-emoji">🕊️</span>
// // // //                 <p>No rangers found</p>
// // // //               </div>
// // // //             ) : (
// // // //               <div className="reports-volunteers-grid">
// // // //                 {availableVolunteers.length > 0 && (
// // // //                   <div className="reports-volunteer-category">
// // // //                     <div className="reports-category-header">
// // // //                       <span className="reports-status-dot available"></span>
// // // //                       <span>Available for Rescue ({availableVolunteers.length})</span>
// // // //                     </div>
// // // //                     {availableVolunteers.map(volunteer => (
// // // //                       <div key={volunteer.user_id} className="reports-volunteer-item">
// // // //                         <div className="reports-volunteer-avatar-wrapper">
// // // //                           <div className="reports-volunteer-avatar">
// // // //                             {volunteer.username.charAt(0).toUpperCase()}
// // // //                           </div>
// // // //                           {volunteer.assigned_reports_count > 0 && (
// // // //                             <span className="reports-badge-count">{volunteer.assigned_reports_count}</span>
// // // //                           )}
// // // //                         </div>
// // // //                         <div className="reports-volunteer-info">
// // // //                           <div className="reports-volunteer-header">
// // // //                             <h5>{volunteer.username}</h5>
// // // //                             <span className="reports-volunteer-status available">Available</span>
// // // //                           </div>
// // // //                           <div className="reports-volunteer-contact">
// // // //                             <span>{volunteer.email}</span>
// // // //                             {volunteer.phone && <span>{volunteer.phone}</span>}
// // // //                           </div>
// // // //                           <div className="reports-volunteer-meta">
// // // //                             <span>Joined {formatVolunteerDate(volunteer.joined_at)}</span>
// // // //                             <span>{volunteer.assigned_reports_count} active rescues</span>
// // // //                           </div>
// // // //                         </div>
// // // //                         <button
// // // //                           className="reports-btn assign"
// // // //                           onClick={() => onSelect(volunteer)}
// // // //                         >
// // // //                           Assign
// // // //                         </button>
// // // //                       </div>
// // // //                     ))}
// // // //                   </div>
// // // //                 )}

// // // //                 {unavailableVolunteers.length > 0 && (
// // // //                   <div className="reports-volunteer-category">
// // // //                     <div className="reports-category-header">
// // // //                       <span className="reports-status-dot unavailable"></span>
// // // //                       <span>Unavailable ({unavailableVolunteers.length})</span>
// // // //                     </div>
// // // //                     {unavailableVolunteers.map(volunteer => (
// // // //                       <div key={volunteer.user_id} className="reports-volunteer-item unavailable">
// // // //                         <div className="reports-volunteer-avatar-wrapper">
// // // //                           <div className="reports-volunteer-avatar unavailable">
// // // //                             {volunteer.username.charAt(0).toUpperCase()}
// // // //                           </div>
// // // //                         </div>
// // // //                         <div className="reports-volunteer-info">
// // // //                           <div className="reports-volunteer-header">
// // // //                             <h5>{volunteer.username}</h5>
// // // //                             <span className="reports-volunteer-status unavailable">Unavailable</span>
// // // //                           </div>
// // // //                           <div className="reports-volunteer-contact">
// // // //                             <span>{volunteer.email}</span>
// // // //                           </div>
// // // //                           <div className="reports-volunteer-meta">
// // // //                             <span>Currently unavailable</span>
// // // //                           </div>
// // // //                         </div>
// // // //                         <button
// // // //                           className="reports-btn assign-disabled"
// // // //                           disabled
// // // //                         >
// // // //                           Unavailable
// // // //                         </button>
// // // //                       </div>
// // // //                     ))}
// // // //                   </div>
// // // //                 )}
// // // //               </div>
// // // //             )}
// // // //           </div>
// // // //         </div>

// // // //         <div className="reports-modal-footer">
// // // //           <button className="reports-btn secondary" onClick={onClose}>
// // // //             Cancel
// // // //           </button>
// // // //         </div>
// // // //       </div>
// // // //     </div>
// // // //   );
// // // // };

// // // // // Report Detail Modal Component
// // // // const ReportDetailModal: React.FC<{
// // // //   report: RescueReport | null;
// // // //   isOpen: boolean;
// // // //   onClose: () => void;
// // // //   onAssignClick: () => void;
// // // //   onUnassign: (reportId: number) => void;
// // // //   getAnimalEmoji: (type: string) => string;
// // // //   formatDate: (date: string) => string;
// // // //   getStatusName: (statusId: number, statusName?: string) => string;
// // // //   showMessage: (text: string, type: 'success' | 'error') => void;
// // // // }> = ({ 
// // // //   report, 
// // // //   isOpen, 
// // // //   onClose, 
// // // //   onAssignClick, 
// // // //   onUnassign, 
// // // //   getAnimalEmoji, 
// // // //   formatDate, 
// // // //   getStatusName,
// // // //   showMessage
// // // // }) => {
// // // //   const [localAdminNote, setLocalAdminNote] = useState('');
// // // //   const [savingNote, setSavingNote] = useState(false);

// // // //   useEffect(() => {
// // // //     if (report) {
// // // //       setLocalAdminNote(report.admin_note || '');
// // // //     }
// // // //   }, [report]);

// // // //   if (!isOpen || !report) return null;

// // // //   const handleSaveNote = async (e: React.FormEvent) => {
// // // //     e.preventDefault();

// // // //     if (!localAdminNote.trim()) {
// // // //       showMessage('Please enter a note', 'error');
// // // //       return;
// // // //     }

// // // //     try {
// // // //       const token = localStorage.getItem('token');
// // // //       if (!token) {
// // // //         showMessage('Please login first', 'error');
// // // //         return;
// // // //       }

// // // //       setSavingNote(true);

// // // //       const response = await fetch(`http://localhost:5000/api/reports/${report.report_id}/admin-note`, {
// // // //         method: 'POST',
// // // //         headers: {
// // // //           'Authorization': `Bearer ${token}`,
// // // //           'Content-Type': 'application/json'
// // // //         },
// // // //         body: JSON.stringify({ note: localAdminNote })
// // // //       });

// // // //       if (response.ok) {
// // // //         const data = await response.json();
// // // //         showMessage('Note saved successfully!', 'success');
// // // //         report.admin_note = data.data?.admin_note || localAdminNote;
// // // //       } else {
// // // //         const errorData = await response.json();
// // // //         showMessage(errorData.message || 'Failed to save note', 'error');
// // // //       }
// // // //     } catch (error: any) {
// // // //       console.error('Error saving note:', error);
// // // //       showMessage(error.message || 'Error saving note. Please try again.', 'error');
// // // //     } finally {
// // // //       setSavingNote(false);
// // // //     }
// // // //   };

// // // //   const statusDisplay = getStatusName(report.status_id, report.status_name);
// // // //   const isDeclined = report.status_id === 5;

// // // //   return (
// // // //     <div className="reports-modal-overlay" onClick={onClose}>
// // // //       <div className="reports-modal-content large" onClick={e => e.stopPropagation()}>
// // // //         <div className="reports-modal-header dark">
// // // //           <div>
// // // //             <h3>Rescue Report #{report.report_id}</h3>
// // // //             <div className="reports-modal-subheader">
// // // //               <span className={`reports-status-badge ${statusDisplay.toLowerCase().replace(' ', '-')}`}>
// // // //                 {statusDisplay}
// // // //               </span>
// // // //               <span className="reports-meta">{formatDate(report.submitted_at)}</span>
// // // //             </div>
// // // //           </div>
// // // //           <button className="reports-modal-close" onClick={onClose}>×</button>
// // // //         </div>

// // // //         <div className="reports-modal-body">
// // // //           <div className="reports-detail-grid">
// // // //             <div className="reports-detail-column">
// // // //               <div className="reports-info-card">
// // // //                 <div className="reports-card-header beige">
// // // //                   <h4>🐾 Animal Information</h4>
// // // //                 </div>
// // // //                 <div className="reports-card-content">
// // // //                   <div className="reports-animal-display">
// // // //                     <div className="reports-animal-icon">
// // // //                       {getAnimalEmoji(report.animal_type)}
// // // //                     </div>
// // // //                     <div className="reports-animal-details">
// // // //                       <div className="reports-animal-type">{report.animal_type}</div>
// // // //                       <div className="reports-animal-condition">
// // // //                         <span className="condition-tag">{report.animal_condition}</span>
// // // //                       </div>
// // // //                     </div>
// // // //                   </div>
// // // //                 </div>
// // // //               </div>

// // // //               <div className="reports-info-card">
// // // //                 <div className="reports-card-header beige">
// // // //                   <h4>👤 Reporter Details</h4>
// // // //                 </div>
// // // //                 <div className="reports-card-content">
// // // //                   <div className="reports-detail-list">
// // // //                     <div className="reports-detail-row">
// // // //                       <span className="reports-detail-label">Name</span>
// // // //                       <span className="reports-detail-value">{report.username}</span>
// // // //                     </div>
// // // //                     <div className="reports-detail-row">
// // // //                       <span className="reports-detail-label">Email</span>
// // // //                       <span className="reports-detail-value">{report.email}</span>
// // // //                     </div>
// // // //                     <div className="reports-detail-row">
// // // //                       <span className="reports-detail-label">Phone</span>
// // // //                       <span className="reports-detail-value">{report.phone}</span>
// // // //                     </div>
// // // //                   </div>
// // // //                 </div>
// // // //               </div>

// // // //               <div className="reports-info-card">
// // // //                 <div className="reports-card-header beige">
// // // //                   <h4>📍 Location</h4>
// // // //                 </div>
// // // //                 <div className="reports-card-content">
// // // //                   <div className="reports-location-info">
// // // //                     <p>{report.location_address}</p>
// // // //                     <button 
// // // //                       className="reports-btn map"
// // // //                       onClick={() => {
// // // //                         const encodedAddress = encodeURIComponent(report.location_address);
// // // //                         window.open(`https://maps.google.com/?q=${encodedAddress}`, '_blank');
// // // //                       }}
// // // //                     >
// // // //                       View on Map
// // // //                     </button>
// // // //                   </div>
// // // //                 </div>
// // // //               </div>
// // // //             </div>

// // // //             <div className="reports-detail-column">
// // // //               {/* Volunteer Assignment Card - Show declined reason and volunteer info */}
// // // //               <div className="reports-info-card">
// // // //                 <div className="reports-card-header beige">
// // // //                   <div className="reports-header-row">
// // // //                     <h4>🦸 Ranger Assignment</h4>
// // // //                     {!report.volunteer_name && !isDeclined && (
// // // //                       <button 
// // // //                         className="reports-btn primary small"
// // // //                         onClick={onAssignClick}
// // // //                       >
// // // //                         + Assign Ranger
// // // //                       </button>
// // // //                     )}
// // // //                   </div>
// // // //                 </div>
// // // //                 <div className="reports-card-content">
// // // //                   {report.volunteer_name && !isDeclined ? (
// // // //                     <div className="reports-volunteer-assigned">
// // // //                       <div className="reports-assigned-volunteer">
// // // //                         <div className="reports-volunteer-avatar large">
// // // //                           {report.volunteer_name.charAt(0).toUpperCase()}
// // // //                         </div>
// // // //                         <div className="reports-assigned-info">
// // // //                           <h5>{report.volunteer_name}</h5>
// // // //                           <div className="reports-assigned-contact">
// // // //                             {report.volunteer_email && <span>{report.volunteer_email}</span>}
// // // //                             {report.volunteer_phone && <span>{report.volunteer_phone}</span>}
// // // //                           </div>
// // // //                         </div>
// // // //                       </div>
// // // //                       <button 
// // // //                         className="reports-btn unassign"
// // // //                         onClick={() => onUnassign(report.report_id)}
// // // //                       >
// // // //                         Unassign
// // // //                       </button>
// // // //                     </div>
// // // //                   ) : isDeclined ? (
// // // //                     <div className="reports-declined-container">
// // // //                       <div className="reports-declined-header">
// // // //                         <span className="reports-declined-icon">❌</span>
// // // //                         <div className="reports-declined-title">Mission Declined by Ranger</div>
// // // //                       </div>

// // // //                       {/* Show volunteer who declined */}
// // // //                       {report.volunteer_name && (
// // // //                         <div className="reports-declined-volunteer">
// // // //                           <div className="reports-volunteer-avatar declined">
// // // //                             {report.volunteer_name.charAt(0).toUpperCase()}
// // // //                           </div>
// // // //                           <div className="reports-declined-volunteer-info">
// // // //                             <div className="reports-declined-volunteer-name">{report.volunteer_name}</div>
// // // //                             <div className="reports-declined-volunteer-contact">
// // // //                               {report.volunteer_email && <span>{report.volunteer_email}</span>}
// // // //                               {report.volunteer_phone && <span>{report.volunteer_phone}</span>}
// // // //                             </div>
// // // //                             {report.volunteer_responded_at && (
// // // //                               <div className="reports-declined-time">
// // // //                                 Declined on {formatDate(report.volunteer_responded_at)}
// // // //                               </div>
// // // //                             )}
// // // //                           </div>
// // // //                         </div>
// // // //                       )}

// // // //                       {/* Show declined reason */}
// // // //                       {report.declined_reason ? (
// // // //                         <div className="reports-declined-reason">
// // // //                           <div className="reports-declined-reason-label">Declined Reason:</div>
// // // //                           <div className="reports-declined-reason-text">"{report.declined_reason}"</div>
// // // //                         </div>
// // // //                       ) : (
// // // //                         <div className="reports-declined-reason empty">
// // // //                           <em>No reason provided</em>
// // // //                         </div>
// // // //                       )}

// // // //                       <button 
// // // //                         className="reports-btn primary"
// // // //                         onClick={onAssignClick}
// // // //                       >
// // // //                         + Assign New Ranger
// // // //                       </button>
// // // //                     </div>
// // // //                   ) : (
// // // //                     <div className="reports-no-volunteer">
// // // //                       <span className="no-volunteer-emoji">🕊️</span>
// // // //                       <p>No ranger assigned yet</p>
// // // //                       <button 
// // // //                         className="reports-btn text"
// // // //                         onClick={onAssignClick}
// // // //                       >
// // // //                         Click to assign a ranger
// // // //                       </button>
// // // //                     </div>
// // // //                   )}
// // // //                 </div>
// // // //               </div>

// // // //               <div className="reports-info-card">
// // // //                 <div className="reports-card-header beige">
// // // //                   <h4>📝 Report Description</h4>
// // // //                 </div>
// // // //                 <div className="reports-card-content">
// // // //                   <div className="reports-description">
// // // //                     <p>{report.description}</p>
// // // //                   </div>
// // // //                   {report.user_note && (
// // // //                     <div className="reports-user-note">
// // // //                       <div className="note-label">Reporter's Note:</div>
// // // //                       <p>{report.user_note}</p>
// // // //                     </div>
// // // //                   )}
// // // //                 </div>
// // // //               </div>

// // // //               <div className="reports-info-card">
// // // //                 <div className="reports-card-header beige">
// // // //                   <h4>📌 Admin Notes</h4>
// // // //                 </div>
// // // //                 <div className="reports-card-content">
// // // //                   <form onSubmit={handleSaveNote} className="reports-notes-form">
// // // //                     <textarea
// // // //                       className="reports-notes-input"
// // // //                       placeholder="Add internal notes about this rescue mission..."
// // // //                       value={localAdminNote}
// // // //                       onChange={(e) => setLocalAdminNote(e.target.value)}
// // // //                       rows={3}
// // // //                     />
// // // //                     <div className="reports-notes-actions">
// // // //                       <button
// // // //                         type="submit"
// // // //                         className="reports-btn save"
// // // //                         disabled={savingNote || !localAdminNote.trim()}
// // // //                       >
// // // //                         {savingNote ? 'Saving...' : 'Save Note'}
// // // //                       </button>
// // // //                     </div>
// // // //                   </form>
// // // //                 </div>
// // // //               </div>
// // // //             </div>
// // // //           </div>
// // // //         </div>

// // // //         <div className="reports-modal-footer">
// // // //           <button className="reports-btn secondary" onClick={onClose}>
// // // //             Close
// // // //           </button>
// // // //         </div>
// // // //       </div>
// // // //     </div>
// // // //   );
// // // // };

// // // // const RescueReports: React.FC = () => {
// // // //   const [reports, setReports] = useState<RescueReport[]>([]);
// // // //   const [volunteers, setVolunteers] = useState<Volunteer[]>([]);
// // // //   const [availabilityStatuses, setAvailabilityStatuses] = useState<AvailabilityStatus[]>([]);
// // // //   const [loading, setLoading] = useState(true);
// // // //   const [loadingVolunteers, setLoadingVolunteers] = useState(false);
// // // //   const [filterStatus, setFilterStatus] = useState<string>('all');
// // // //   const [sortBy, setSortBy] = useState<string>('recent');
// // // //   const [searchQuery, setSearchQuery] = useState<string>('');
// // // //   const [selectedReport, setSelectedReport] = useState<RescueReport | null>(null);
// // // //   const [isModalOpen, setIsModalOpen] = useState(false);
// // // //   const [isVolunteerModalOpen, setIsVolunteerModalOpen] = useState(false);
// // // //   const [showSuccessMessage, setShowSuccessMessage] = useState(false);
// // // //   const [showErrorMessage, setShowErrorMessage] = useState(false);
// // // //   const [message, setMessage] = useState('');

// // // //   // Pagination state
// // // //   const [currentPage, setCurrentPage] = useState(1);
// // // //   const [itemsPerPage] = useState(9);

// // // //   // Fetch status list from database
// // // //   const fetchStatusList = useCallback(async () => {
// // // //     try {
// // // //       const token = localStorage.getItem('token');
// // // //       if (!token) return;

// // // //       const response = await fetch('http://localhost:5000/api/reports/status/list', {
// // // //         headers: {
// // // //           'Authorization': `Bearer ${token}`,
// // // //           'Content-Type': 'application/json'
// // // //         }
// // // //       });

// // // //       if (response.ok) {
// // // //         const data = await response.json();
// // // //         if (data.success) {
// // // //           setAvailabilityStatuses(data.data || []);
// // // //         }
// // // //       }
// // // //     } catch (error) {
// // // //       console.error('Error fetching status list:', error);
// // // //     }
// // // //   }, []);

// // // //   const getStatusName = (statusId: number, statusName?: string): string => {
// // // //     if (statusName) {
// // // //       return statusName
// // // //         .split('_')
// // // //         .map(word => word.charAt(0).toUpperCase() + word.slice(1))
// // // //         .join(' ');
// // // //     }

// // // //     const statusMap: { [key: number]: string } = {
// // // //       1: 'Submitted',
// // // //       2: 'Assigned',
// // // //       3: 'In Progress',
// // // //       4: 'Completed',
// // // //       5: 'Declined'
// // // //     };
// // // //     return statusMap[statusId] || 'Unknown';
// // // //   };

// // // //   const showMessage = (text: string, type: 'success' | 'error') => {
// // // //     setMessage(text);
// // // //     if (type === 'success') {
// // // //       setShowSuccessMessage(true);
// // // //     } else {
// // // //       setShowErrorMessage(true);
// // // //     }
// // // //     setTimeout(() => {
// // // //       setShowSuccessMessage(false);
// // // //       setShowErrorMessage(false);
// // // //       setMessage('');
// // // //     }, 3000);
// // // //   };

// // // //   // ✅ FIXED: Direct mapping - NO EXTRA API CALLS!
// // // //   const fetchReports = useCallback(async () => {
// // // //     try {
// // // //       setLoading(true);

// // // //       const token = localStorage.getItem('token');
// // // //       if (!token) {
// // // //         showMessage('Please login first', 'error');
// // // //         setLoading(false);
// // // //         return;
// // // //       }

// // // //       const response = await fetch('http://localhost:5000/api/reports/admin/all', {
// // // //         headers: {
// // // //           'Authorization': `Bearer ${token}`,
// // // //           'Content-Type': 'application/json'
// // // //         }
// // // //       });

// // // //       if (response.ok) {
// // // //         const data = await response.json();

// // // //         if (data.success) {
// // // //           const reportsData = data.data || [];

// // // //           // ✅ DIRECT MAPPING - data ALREADY includes declined_reason from backend!
// // // //           const mappedReports: RescueReport[] = reportsData.map((report: any) => {
// // // //             const mappedReport: RescueReport = {
// // // //               report_id: report.report_id,
// // // //               user_id: report.user_id,
// // // //               username: report.reporter_name || 'Anonymous',
// // // //               email: report.email || 'No email',
// // // //               phone: report.reporter_phone || 'No phone',
// // // //               description: report.description,
// // // //               location_address: report.location_address,
// // // //               user_note: report.user_note,
// // // //               admin_note: report.admin_note,
// // // //               submitted_at: report.submitted_at,
// // // //               animal_type: report.animal_type || 'Unknown',
// // // //               animal_condition: report.animal_condition || 'Unknown',
// // // //               status_id: report.status_id || 1,
// // // //               status_name: report.status_name,
// // // //               // Volunteer info - ALREADY in the response!
// // // //               volunteer_id: report.volunteer_id,
// // // //               volunteer_name: report.volunteer_name,
// // // //               volunteer_email: report.volunteer_email,
// // // //               volunteer_phone: report.volunteer_phone,
// // // //               task_id: report.task_id,
// // // //               task_status: report.task_status,
// // // //               // ✅ DECLINED REASON - ALREADY in the response from backend!
// // // //               declined_reason: report.declined_reason,
// // // //               volunteer_responded_at: report.volunteer_responded_at,
// // // //               volunteer_response: report.volunteer_response
// // // //             };

// // // //             // Debug log to verify data is coming through
// // // //             if (report.status_id === 5) {
// // // //               console.log(`Report #${report.report_id}:`, {
// // // //                 volunteer: report.volunteer_name,
// // // //                 reason: report.declined_reason,
// // // //                 responded_at: report.volunteer_responded_at
// // // //               });
// // // //             }

// // // //             return mappedReport;
// // // //           });

// // // //           setReports(mappedReports);
// // // //           setCurrentPage(1);

// // // //           // Log summary of declined reports - FIXED: Added type annotation
// // // //           const declinedReports = mappedReports.filter((report: RescueReport) => report.status_id === 5);
// // // //           if (declinedReports.length > 0) {
// // // //             console.log(`Found ${declinedReports.length} declined reports`);
// // // //             declinedReports.forEach((report: RescueReport) => {
// // // //               console.log(`  #${report.report_id}: ${report.volunteer_name} - "${report.declined_reason}"`);
// // // //             });
// // // //           }

// // // //         } else {
// // // //           showMessage(data.message || 'Failed to load reports', 'error');
// // // //         }
// // // //       } else {
// // // //         showMessage('Failed to fetch reports', 'error');
// // // //       }
// // // //     } catch (error: any) {
// // // //       console.error('Network error fetching reports:', error);
// // // //       showMessage('Error loading reports. Please check your connection.', 'error');
// // // //     } finally {
// // // //       setLoading(false);
// // // //     }
// // // //   }, []);

// // // //   const fetchVolunteers = useCallback(async () => {
// // // //     try {
// // // //       setLoadingVolunteers(true);

// // // //       const token = localStorage.getItem('token');
// // // //       if (!token) {
// // // //         setVolunteers([]);
// // // //         setLoadingVolunteers(false);
// // // //         return;
// // // //       }

// // // //       const response = await fetch('http://localhost:5000/api/volunteers/available', {
// // // //         headers: {
// // // //           'Authorization': `Bearer ${token}`,
// // // //           'Content-Type': 'application/json'
// // // //         }
// // // //       });

// // // //       if (response.ok) {
// // // //         const data = await response.json();

// // // //         if (data.success) {
// // // //           const volunteersData = data.data || [];

// // // //           const mappedVolunteers: Volunteer[] = volunteersData.map((volunteer: any) => ({
// // // //             user_id: volunteer.user_id,
// // // //             username: volunteer.username,
// // // //             email: volunteer.email,
// // // //             phone: volunteer.phone || 'Not provided',
// // // //             bio: volunteer.bio,
// // // //             joined_at: volunteer.joined_at || volunteer.created_at,
// // // //             approval_status: volunteer.approval_status,
// // // //             approval_status_id: volunteer.approval_status_id,
// // // //             availability_status: volunteer.availability_status,
// // // //             availability_status_id: volunteer.availability_status_id,
// // // //             assigned_reports_count: volunteer.assigned_reports_count || 0,
// // // //             role_id: volunteer.role_id,
// // // //             created_at: volunteer.created_at
// // // //           }));

// // // //           setVolunteers(mappedVolunteers);
// // // //         } else {
// // // //           console.error('Failed to load volunteers:', data.message);
// // // //           setVolunteers([]);
// // // //         }
// // // //       } else {
// // // //         console.error('HTTP Error fetching volunteers:', response.status);
// // // //         setVolunteers([]);
// // // //       }
// // // //     } catch (error) {
// // // //       console.error('Error fetching volunteers:', error);
// // // //       setVolunteers([]);
// // // //     } finally {
// // // //       setLoadingVolunteers(false);
// // // //     }
// // // //   }, []);

// // // //   useEffect(() => {
// // // //     fetchStatusList();
// // // //     fetchReports();
// // // //     fetchVolunteers();
// // // //   }, [fetchReports, fetchVolunteers, fetchStatusList]);

// // // //   const assignVolunteer = async (reportId: number, volunteerId: number, volunteerName: string) => {
// // // //     try {
// // // //       const token = localStorage.getItem('token');
// // // //       if (!token) {
// // // //         showMessage('Please login first', 'error');
// // // //         return;
// // // //       }

// // // //       const response = await fetch(`http://localhost:5000/api/reports/${reportId}/assign`, {
// // // //         method: 'POST',
// // // //         headers: {
// // // //           'Authorization': `Bearer ${token}`,
// // // //           'Content-Type': 'application/json'
// // // //         },
// // // //         body: JSON.stringify({ 
// // // //           volunteer_id: volunteerId
// // // //         })
// // // //       });

// // // //       if (response.ok) {
// // // //         const data = await response.json();

// // // //         const volunteer = volunteers.find(v => v.user_id === volunteerId);

// // // //         setReports(prev => prev.map(report => {
// // // //           if (report.report_id === reportId) {
// // // //             return {
// // // //               ...report,
// // // //               volunteer_id: volunteerId,
// // // //               volunteer_name: volunteerName,
// // // //               volunteer_email: volunteer?.email || '',
// // // //               volunteer_phone: volunteer?.phone || '',
// // // //               status_id: 2,
// // // //               status_name: 'assigned',
// // // //               declined_reason: undefined,
// // // //               volunteer_responded_at: undefined
// // // //             };
// // // //           }
// // // //           return report;
// // // //         }));

// // // //         setVolunteers(prev => prev.map(v => {
// // // //           if (v.user_id === volunteerId) {
// // // //             return {
// // // //               ...v,
// // // //               assigned_reports_count: (v.assigned_reports_count || 0) + 1
// // // //             };
// // // //           }
// // // //           return v;
// // // //         }));

// // // //         showMessage(`Ranger "${volunteerName}" assigned successfully!`, 'success');
// // // //         setIsVolunteerModalOpen(false);
// // // //         setSelectedReport(null);
// // // //         fetchReports();
// // // //         fetchVolunteers();
// // // //       } else {
// // // //         const errorData = await response.json();
// // // //         showMessage(errorData.message || 'Failed to assign ranger', 'error');
// // // //       }
// // // //     } catch (error: any) {
// // // //       console.error('Error assigning volunteer:', error);
// // // //       showMessage(error.message || 'Error assigning ranger. Please try again.', 'error');
// // // //     }
// // // //   };

// // // //   const unassignVolunteer = async (reportId: number) => {
// // // //     if (!window.confirm('Are you sure you want to unassign this ranger? The status will be reset to "Submitted".')) return;

// // // //     try {
// // // //       const token = localStorage.getItem('token');
// // // //       if (!token) {
// // // //         showMessage('Please login first', 'error');
// // // //         return;
// // // //       }

// // // //       const response = await fetch(`http://localhost:5000/api/reports/${reportId}/unassign`, {
// // // //         method: 'PUT',
// // // //         headers: {
// // // //           'Authorization': `Bearer ${token}`,
// // // //           'Content-Type': 'application/json'
// // // //         }
// // // //       });

// // // //       if (response.ok) {
// // // //         const report = reports.find(r => r.report_id === reportId);
// // // //         const volunteerId = report?.volunteer_id;

// // // //         setReports(prev => prev.map(report => {
// // // //           if (report.report_id === reportId) {
// // // //             return {
// // // //               ...report,
// // // //               volunteer_id: undefined,
// // // //               volunteer_name: undefined,
// // // //               volunteer_email: undefined,
// // // //               volunteer_phone: undefined,
// // // //               status_id: 1,
// // // //               status_name: 'submitted',
// // // //               declined_reason: undefined,
// // // //               volunteer_responded_at: undefined
// // // //             };
// // // //           }
// // // //           return report;
// // // //         }));

// // // //         if (volunteerId) {
// // // //           setVolunteers(prev => prev.map(v => {
// // // //             if (v.user_id === volunteerId) {
// // // //               return {
// // // //                 ...v,
// // // //                 assigned_reports_count: Math.max(0, (v.assigned_reports_count || 0) - 1)
// // // //               };
// // // //             }
// // // //             return v;
// // // //           }));
// // // //         }

// // // //         showMessage('Ranger unassigned successfully!', 'success');
// // // //         fetchReports();
// // // //         fetchVolunteers();
// // // //       } else {
// // // //         const errorData = await response.json();
// // // //         showMessage(errorData.message || 'Failed to unassign ranger', 'error');
// // // //       }
// // // //     } catch (error: any) {
// // // //       console.error('Error unassigning volunteer:', error);
// // // //       showMessage(error.message || 'Error unassigning ranger. Please try again.', 'error');
// // // //     }
// // // //   };

// // // //   const getAnimalEmoji = (animalType: string): string => {
// // // //     const type = animalType?.toLowerCase() || '';
// // // //     if (type.includes('dog')) return '🐶';
// // // //     if (type.includes('cat')) return '🐱';
// // // //     if (type.includes('bird')) return '🐦';
// // // //     if (type.includes('rabbit')) return '🐰';
// // // //     if (type.includes('hamster')) return '🐹';
// // // //     if (type.includes('turtle')) return '🐢';
// // // //     if (type.includes('snake')) return '🐍';
// // // //     if (type.includes('fish')) return '🐟';
// // // //     if (type.includes('horse')) return '🐴';
// // // //     if (type.includes('cow')) return '🐮';
// // // //     if (type.includes('goat')) return '🐐';
// // // //     if (type.includes('sheep')) return '🐑';
// // // //     return '🐾';
// // // //   };

// // // //   const formatDate = (dateString: string): string => {
// // // //     try {
// // // //       const date = new Date(dateString);
// // // //       return date.toLocaleDateString('en-US', {
// // // //         month: 'short',
// // // //         day: 'numeric',
// // // //         year: 'numeric',
// // // //         hour: '2-digit',
// // // //         minute: '2-digit'
// // // //       });
// // // //     } catch (error) {
// // // //       return 'Invalid date';
// // // //     }
// // // //   };

// // // //   const formatVolunteerDate = (dateString: string): string => {
// // // //     try {
// // // //       const date = new Date(dateString);
// // // //       return date.toLocaleDateString('en-US', {
// // // //         year: 'numeric',
// // // //         month: 'short',
// // // //         day: 'numeric'
// // // //       });
// // // //     } catch (error) {
// // // //       return 'Invalid date';
// // // //     }
// // // //   };

// // // //   const filteredReports = reports
// // // //     .filter(report => {
// // // //       if (filterStatus !== 'all') {
// // // //         const statusMap: { [key: string]: number } = {
// // // //           'submitted': 1,
// // // //           'assigned': 2,
// // // //           'in-progress': 3,
// // // //           'completed': 4,
// // // //           'declined': 5
// // // //         };
// // // //         if (report.status_id !== statusMap[filterStatus]) return false;
// // // //       }

// // // //       if (searchQuery) {
// // // //         const query = searchQuery.toLowerCase();
// // // //         return (
// // // //           report.username?.toLowerCase().includes(query) ||
// // // //           report.animal_type?.toLowerCase().includes(query) ||
// // // //           report.location_address?.toLowerCase().includes(query) ||
// // // //           report.description?.toLowerCase().includes(query) ||
// // // //           report.report_id.toString().includes(query) ||
// // // //           report.volunteer_name?.toLowerCase().includes(query) ||
// // // //           report.phone?.toLowerCase().includes(query) ||
// // // //           (report.declined_reason?.toLowerCase().includes(query) ?? false)
// // // //         );
// // // //       }

// // // //       return true;
// // // //     })
// // // //     .sort((a, b) => {
// // // //       switch(sortBy) {
// // // //         case 'recent':
// // // //           return new Date(b.submitted_at).getTime() - new Date(a.submitted_at).getTime();
// // // //         case 'oldest':
// // // //           return new Date(a.submitted_at).getTime() - new Date(b.submitted_at).getTime();
// // // //         case 'critical':
// // // //           const getCriticalScore = (condition: string) => {
// // // //             const cond = condition?.toLowerCase() || '';
// // // //             if (cond.includes('critical')) return 0;
// // // //             if (cond.includes('severe')) return 1;
// // // //             if (cond.includes('urgent')) return 2;
// // // //             return 3;
// // // //           };
// // // //           return getCriticalScore(a.animal_condition) - getCriticalScore(b.animal_condition);
// // // //         case 'status':
// // // //           return a.status_id - b.status_id;
// // // //         default:
// // // //           return 0;
// // // //       }
// // // //     });

// // // //   // Pagination logic
// // // //   const indexOfLastItem = currentPage * itemsPerPage;
// // // //   const indexOfFirstItem = indexOfLastItem - itemsPerPage;
// // // //   const currentItems = filteredReports.slice(indexOfFirstItem, indexOfLastItem);
// // // //   const totalPages = Math.ceil(filteredReports.length / itemsPerPage);

// // // //   const paginate = (pageNumber: number) => setCurrentPage(pageNumber);
// // // //   const nextPage = () => setCurrentPage(prev => Math.min(prev + 1, totalPages));
// // // //   const prevPage = () => setCurrentPage(prev => Math.max(prev - 1, 1));

// // // //   const getPageNumbers = (): number[] => {
// // // //     const pageNumbers: number[] = [];
// // // //     const maxVisible = 5;

// // // //     if (totalPages <= maxVisible) {
// // // //       for (let i = 1; i <= totalPages; i++) {
// // // //         pageNumbers.push(i);
// // // //       }
// // // //     } else {
// // // //       if (currentPage <= 3) {
// // // //         for (let i = 1; i <= 5; i++) {
// // // //           pageNumbers.push(i);
// // // //         }
// // // //       } else if (currentPage >= totalPages - 2) {
// // // //         for (let i = totalPages - 4; i <= totalPages; i++) {
// // // //           pageNumbers.push(i);
// // // //         }
// // // //       } else {
// // // //         for (let i = currentPage - 2; i <= currentPage + 2; i++) {
// // // //           pageNumbers.push(i);
// // // //         }
// // // //       }
// // // //     }

// // // //     return pageNumbers;
// // // //   };

// // // //   if (loading) {
// // // //     return (
// // // //       <div className="reports-loading-container">
// // // //         <div className="reports-loader">
// // // //           <div className="reports-spinner"></div>
// // // //           <p className="reports-loader-text">Loading rescue missions...</p>
// // // //         </div>
// // // //       </div>
// // // //     );
// // // //   }

// // // //   return (
// // // //     <div className="reports-container">
// // // //       {/* Success/Error Messages */}
// // // //       {showSuccessMessage && (
// // // //         <div className="reports-notification success">
// // // //           <span className="notification-icon">✓</span>
// // // //           <span>{message}</span>
// // // //         </div>
// // // //       )}
// // // //       {showErrorMessage && (
// // // //         <div className="reports-notification error">
// // // //           <span className="notification-icon">⚠</span>
// // // //           <span>{message}</span>
// // // //         </div>
// // // //       )}

// // // //       {/* Header */}
// // // //       <div className="reports-header">
// // // //         <div className="reports-header-content">
// // // //           <h1 className="reports-title">Rescue Operations</h1>
// // // //           <p className="reports-subtitle">
// // // //             Manage and coordinate animal rescue missions with our ranger team
// // // //           </p>
// // // //         </div>
// // // //         <div className="reports-header-actions">
// // // //           <button onClick={fetchReports} className="reports-btn refresh">
// // // //             <span className="btn-icon">↻</span>
// // // //             Refresh
// // // //           </button>
// // // //         </div>
// // // //       </div>

// // // //       {/* Filters */}
// // // //       <div className="reports-filters-card">
// // // //         <div className="reports-search-wrapper">
// // // //           <span className="search-icon">🔍</span>
// // // //           <input
// // // //             type="text"
// // // //             placeholder="Search by ID, animal, location, ranger, declined reason..."
// // // //             value={searchQuery}
// // // //             onChange={(e) => setSearchQuery(e.target.value)}
// // // //             className="reports-search-input"
// // // //           />
// // // //           {searchQuery && (
// // // //             <button 
// // // //               className="reports-clear-search"
// // // //               onClick={() => setSearchQuery('')}
// // // //             >
// // // //               ×
// // // //             </button>
// // // //           )}
// // // //         </div>

// // // //         <div className="reports-filters-row">
// // // //           <div className="reports-filter-group">
// // // //             <label className="reports-filter-label">Status</label>
// // // //             <select 
// // // //               value={filterStatus} 
// // // //               onChange={(e) => setFilterStatus(e.target.value)}
// // // //               className="reports-filter-select"
// // // //             >
// // // //               <option value="all">All Status</option>
// // // //               <option value="submitted">Submitted</option>
// // // //               <option value="assigned">Assigned</option>
// // // //               <option value="in-progress">In Progress</option>
// // // //               <option value="completed">Completed</option>
// // // //               <option value="declined">Declined</option>
// // // //             </select>
// // // //           </div>

// // // //           <div className="reports-filter-group">
// // // //             <label className="reports-filter-label">Sort By</label>
// // // //             <select 
// // // //               value={sortBy} 
// // // //               onChange={(e) => setSortBy(e.target.value)}
// // // //               className="reports-filter-select"
// // // //             >
// // // //               <option value="recent">Most Recent</option>
// // // //               <option value="oldest">Oldest</option>
// // // //               <option value="critical">Critical First</option>
// // // //               <option value="status">By Status</option>
// // // //             </select>
// // // //           </div>

// // // //           <div className="reports-stats-badge">
// // // //             {filteredReports.length} of {reports.length} missions
// // // //           </div>
// // // //         </div>
// // // //       </div>

// // // //       {/* Reports Grid/Cards */}
// // // //       <div className="reports-content">
// // // //         {filteredReports.length === 0 ? (
// // // //           <div className="reports-empty-state">
// // // //             <span className="empty-state-emoji">🕊️</span>
// // // //             <h3>No Rescue Missions Found</h3>
// // // //             <p>
// // // //               {searchQuery 
// // // //                 ? `No missions matching "${searchQuery}"` 
// // // //                 : filterStatus !== 'all'
// // // //                 ? `No missions with status "${filterStatus}"`
// // // //                 : 'No rescue missions have been reported yet.'}
// // // //             </p>
// // // //             {(searchQuery || filterStatus !== 'all') && (
// // // //               <button 
// // // //                 onClick={() => {
// // // //                   setSearchQuery('');
// // // //                   setFilterStatus('all');
// // // //                   setCurrentPage(1);
// // // //                 }}
// // // //                 className="reports-btn outline"
// // // //               >
// // // //                 Clear Filters
// // // //               </button>
// // // //             )}
// // // //           </div>
// // // //         ) : (
// // // //           <>
// // // //             <div className="reports-grid">
// // // //               {currentItems.map(report => {
// // // //                 const isDeclined = report.status_id === 5;
// // // //                 const statusDisplay = getStatusName(report.status_id, report.status_name);

// // // //                 return (
// // // //                   <div key={report.report_id} className="reports-card">
// // // //                     <div className="reports-card-header dark">
// // // //                       <div className="reports-card-title">
// // // //                         <span className="reports-id">#{report.report_id}</span>
// // // //                         <span className={`reports-status ${statusDisplay.toLowerCase().replace(' ', '-')}`}>
// // // //                           {statusDisplay}
// // // //                         </span>
// // // //                       </div>
// // // //                       <div className="reports-date">
// // // //                         {formatDate(report.submitted_at)}
// // // //                       </div>
// // // //                     </div>

// // // //                     <div className="reports-card-body">
// // // //                       <div className="reports-animal-section">
// // // //                         <div className="reports-animal-icon large">
// // // //                           {getAnimalEmoji(report.animal_type)}
// // // //                         </div>
// // // //                         <div className="reports-animal-info">
// // // //                           <h4>{report.animal_type}</h4>
// // // //                           <span className="reports-condition">{report.animal_condition}</span>
// // // //                         </div>
// // // //                       </div>

// // // //                       <div className="reports-location-section">
// // // //                         <span className="location-icon">📍</span>
// // // //                         <span className="location-text">{report.location_address}</span>
// // // //                       </div>

// // // //                       {/* Show volunteer info even for declined tasks */}
// // // //                       <div className="reports-volunteer-section">
// // // //                         {report.volunteer_name ? (
// // // //                           <div className="reports-assigned-ranger">
// // // //                             <div className={`ranger-avatar ${isDeclined ? 'declined' : ''}`}>
// // // //                               {report.volunteer_name.charAt(0).toUpperCase()}
// // // //                             </div>
// // // //                             <div className="ranger-info">
// // // //                               <span className="ranger-name">{report.volunteer_name}</span>
// // // //                               <span className="ranger-role">
// // // //                                 {isDeclined ? 'Declined' : 'Ranger'}
// // // //                               </span>
// // // //                               {isDeclined && report.declined_reason && (
// // // //                                 <span className="ranger-declined-reason">
// // // //                                   Reason: {report.declined_reason.length > 30 
// // // //                                     ? `${report.declined_reason.substring(0, 30)}...` 
// // // //                                     : report.declined_reason}
// // // //                                 </span>
// // // //                               )}
// // // //                             </div>
// // // //                           </div>
// // // //                         ) : (
// // // //                           <div className="reports-no-ranger">
// // // //                             <span>No ranger assigned</span>
// // // //                           </div>
// // // //                         )}
// // // //                       </div>
// // // //                     </div>

// // // //                     <div className="reports-card-footer">
// // // //                       <button 
// // // //                         onClick={() => {
// // // //                           setSelectedReport(report);
// // // //                           setIsModalOpen(true);
// // // //                         }}
// // // //                         className="reports-btn view"
// // // //                       >
// // // //                         View Mission Details
// // // //                       </button>
// // // //                     </div>
// // // //                   </div>
// // // //                 );
// // // //               })}
// // // //             </div>

// // // //             {/* Pagination */}
// // // //             {totalPages > 1 && (
// // // //               <div className="reports-pagination">
// // // //                 <button 
// // // //                   onClick={prevPage} 
// // // //                   disabled={currentPage === 1}
// // // //                   className="reports-pagination-btn"
// // // //                 >
// // // //                   ← Prev
// // // //                 </button>

// // // //                 <div className="reports-pagination-numbers">
// // // //                   {getPageNumbers().map((pageNum) => (
// // // //                     <button
// // // //                       key={pageNum}
// // // //                       onClick={() => paginate(pageNum)}
// // // //                       className={`reports-pagination-number ${currentPage === pageNum ? 'active' : ''}`}
// // // //                     >
// // // //                       {pageNum}
// // // //                     </button>
// // // //                   ))}
// // // //                 </div>

// // // //                 <button 
// // // //                   onClick={nextPage} 
// // // //                   disabled={currentPage === totalPages}
// // // //                   className="reports-pagination-btn"
// // // //                 >
// // // //                   Next →
// // // //                 </button>
// // // //               </div>
// // // //             )}
// // // //           </>
// // // //         )}
// // // //       </div>

// // // //       {/* Report Detail Modal */}
// // // //       <ReportDetailModal 
// // // //         report={selectedReport} 
// // // //         isOpen={isModalOpen} 
// // // //         onClose={() => {
// // // //           setIsModalOpen(false);
// // // //           setSelectedReport(null);
// // // //         }}
// // // //         onAssignClick={() => {
// // // //           setIsModalOpen(false);
// // // //           setIsVolunteerModalOpen(true);
// // // //         }}
// // // //         onUnassign={unassignVolunteer}
// // // //         getAnimalEmoji={getAnimalEmoji}
// // // //         formatDate={formatDate}
// // // //         getStatusName={getStatusName}
// // // //         showMessage={showMessage}
// // // //       />

// // // //       {/* Volunteer Selection Modal */}
// // // //       <VolunteerSelectModal
// // // //         report={selectedReport}
// // // //         isOpen={isVolunteerModalOpen}
// // // //         onClose={() => {
// // // //           setIsVolunteerModalOpen(false);
// // // //           setIsModalOpen(true);
// // // //         }}
// // // //         onSelect={(volunteer) => {
// // // //           if (selectedReport) {
// // // //             assignVolunteer(selectedReport.report_id, volunteer.user_id, volunteer.username);
// // // //           }
// // // //         }}
// // // //         volunteers={volunteers}
// // // //         loadingVolunteers={loadingVolunteers}
// // // //         getAnimalEmoji={getAnimalEmoji}
// // // //         formatVolunteerDate={formatVolunteerDate}
// // // //       />
// // // //     </div>
// // // //   );
// // // // };

// // // // export default RescueReports;


// // // import React, { useEffect, useState, useCallback } from 'react';
// // // import './RescueReports.css';

// // // interface RescueReport {
// // //   report_id: number;
// // //   user_id: number;
// // //   username: string;
// // //   email: string;
// // //   phone: string;
// // //   description: string;
// // //   location_address: string;
// // //   user_note?: string;
// // //   admin_note?: string;
// // //   submitted_at: string;
// // //   updated_at?: string;
// // //   animal_type: string;
// // //   animal_condition: string;
// // //   status_id: number;
// // //   status_name?: string;
// // //   volunteer_name?: string;
// // //   volunteer_id?: number;
// // //   volunteer_email?: string;
// // //   volunteer_phone?: string;
// // //   declined_reason?: string;
// // //   volunteer_responded_at?: string;
// // //   volunteer_response?: string;
// // //   task_id?: number;
// // //   task_status?: string;
// // // }

// // // interface Volunteer {
// // //   user_id: number;
// // //   username: string;
// // //   email: string;
// // //   phone: string;
// // //   bio?: string;
// // //   joined_at: string;
// // //   approval_status: string;
// // //   approval_status_id: number;
// // //   availability_status: string;
// // //   availability_status_id: number;
// // //   assigned_reports_count: number;
// // //   role_id: number;
// // //   created_at: string;
// // //   has_car: number;
// // //   can_foster: number;
// // //   animal_handling: string;
// // //   city: string;
// // //   badges?: string;
// // // }

// // // interface AvailabilityStatus {
// // //   status_id: number;
// // //   status_name: string;
// // // }

// // // // Volunteer Selection Modal Component
// // // const VolunteerSelectModal: React.FC<{
// // //   report: RescueReport | null;
// // //   isOpen: boolean;
// // //   onClose: () => void;
// // //   onSelect: (volunteer: Volunteer) => void;
// // //   volunteers: Volunteer[];
// // //   loadingVolunteers: boolean;
// // //   getAnimalEmoji: (type: string) => string;
// // //   formatVolunteerDate: (date: string) => string;
// // // }> = ({ 
// // //   report, 
// // //   isOpen, 
// // //   onClose, 
// // //   onSelect, 
// // //   volunteers, 
// // //   loadingVolunteers, 
// // //   getAnimalEmoji,
// // //   formatVolunteerDate 
// // // }) => {
// // //   if (!isOpen || !report) return null;

// // //   const availableVolunteers = volunteers.filter(v => 
// // //     v.availability_status_id === 1 || v.availability_status?.toLowerCase() === 'available'
// // //   );

// // //   const unavailableVolunteers = volunteers.filter(v => 
// // //     v.availability_status_id === 2 || v.availability_status?.toLowerCase() === 'unavailable'
// // //   );

// // //   const getBadgeDisplay = (badges?: string) => {
// // //     if (!badges) return null;
// // //     try {
// // //       // If badges is already a string like "badge1 badge2"
// // //       if (typeof badges === 'string' && !badges.startsWith('[')) {
// // //         return badges.split(',').slice(0, 3).join(', ');
// // //       }
// // //       // If badges is a JSON string
// // //       const badgeList = JSON.parse(badges);
// // //       if (Array.isArray(badgeList) && badgeList.length > 0) {
// // //         return badgeList.slice(0, 3).join(', ');
// // //       }
// // //     } catch (e) {
// // //       // If parsing fails, return the raw string
// // //       return badges;
// // //     }
// // //     return null;
// // //   };

// // //   return (
// // //     <div className="reports-modal-overlay" onClick={onClose}>
// // //       <div className="reports-modal-content" onClick={e => e.stopPropagation()}>
// // //         <div className="reports-modal-header dark">
// // //           <div>
// // //             <h3>Assign Ranger</h3>
// // //             <p className="reports-modal-subtitle">Report #{report.report_id}</p>
// // //           </div>
// // //           <button className="reports-modal-close" onClick={onClose}>×</button>
// // //         </div>

// // //         <div className="reports-modal-body">
// // //           <div className="reports-summary-card">
// // //             <div className="reports-summary-item">
// // //               <span className="reports-summary-label">Animal</span>
// // //               <span className="reports-summary-value">
// // //                 {getAnimalEmoji(report.animal_type)} {report.animal_type}
// // //               </span>
// // //             </div>
// // //             <div className="reports-summary-item">
// // //               <span className="reports-summary-label">Location</span>
// // //               <span className="reports-summary-value location">
// // //                 {report.location_address}
// // //               </span>
// // //             </div>
// // //           </div>

// // //           <div className="reports-volunteers-container">
// // //             <h4>Available Rangers ({availableVolunteers.length})</h4>

// // //             {loadingVolunteers ? (
// // //               <div className="reports-loading-state">
// // //                 <div className="reports-spinner"></div>
// // //                 <p>Loading rangers...</p>
// // //               </div>
// // //             ) : volunteers.length === 0 ? (
// // //               <div className="reports-empty-state small">
// // //                 <span className="empty-emoji">🕊️</span>
// // //                 <p>No rangers found</p>
// // //               </div>
// // //             ) : (
// // //               <div className="reports-volunteers-grid">
// // //                 {availableVolunteers.length > 0 && (
// // //                   <div className="reports-volunteer-category">
// // //                     <div className="reports-category-header">
// // //                       <span className="reports-status-dot available"></span>
// // //                       <span>Available for Rescue ({availableVolunteers.length})</span>
// // //                     </div>
// // //                     {availableVolunteers.map(volunteer => (
// // //                       <div key={volunteer.user_id} className="reports-volunteer-item">
// // //                         <div className="reports-volunteer-avatar-wrapper">
// // //                           <div className="reports-volunteer-avatar">
// // //                             {volunteer.username.charAt(0).toUpperCase()}
// // //                           </div>
// // //                           {volunteer.assigned_reports_count > 0 && (
// // //                             <span className="reports-badge-count">{volunteer.assigned_reports_count}</span>
// // //                           )}
// // //                         </div>
// // //                         <div className="reports-volunteer-info">
// // //                           <div className="reports-volunteer-header">
// // //                             <h5>{volunteer.username}</h5>
// // //                             <span className="reports-volunteer-status available">Available</span>
// // //                           </div>
// // //                           <div className="reports-volunteer-contact">
// // //                             <span>{volunteer.email}</span>
// // //                             {volunteer.phone && <span>{volunteer.phone}</span>}
// // //                           </div>

// // //                           {/* Volunteer Details Section - NOW SHOWING ALL FIELDS */}
// // //                           <div className="reports-volunteer-details">
// // //                             <div className="reports-detail-row">
// // //                               <span className="reports-detail-label">ID:</span>
// // //                               <span className="reports-detail-value">{volunteer.user_id}</span>
// // //                             </div>
// // //                             <div className="reports-detail-row">
// // //                               <span className="reports-detail-label">City:</span>
// // //                               <span className="reports-detail-value">{volunteer.city || 'Not specified'}</span>
// // //                             </div>
// // //                             <div className="reports-detail-row">
// // //                               <span className="reports-detail-label">Joined:</span>
// // //                               <span className="reports-detail-value">{formatVolunteerDate(volunteer.joined_at)}</span>
// // //                             </div>
// // //                             <div className="reports-detail-row">
// // //                               <span className="reports-detail-label">Status ID:</span>
// // //                               <span className="reports-detail-value">{volunteer.availability_status_id}</span>
// // //                             </div>
// // //                             <div className="reports-detail-row">
// // //                               <span className="reports-detail-label">Approval ID:</span>
// // //                               <span className="reports-detail-value">{volunteer.approval_status_id}</span>
// // //                             </div>
// // //                             <div className="reports-detail-row">
// // //                               <span className="reports-detail-label">Has Car:</span>
// // //                               <span className="reports-detail-value">{volunteer.has_car === 1 ? 'Yes' : 'No'}</span>
// // //                             </div>
// // //                             <div className="reports-detail-row">
// // //                               <span className="reports-detail-label">Can Foster:</span>
// // //                               <span className="reports-detail-value">{volunteer.can_foster === 1 ? 'Yes' : 'No'}</span>
// // //                             </div>
// // //                             <div className="reports-detail-row">
// // //                               <span className="reports-detail-label">Animal Handling:</span>
// // //                               <span className="reports-detail-value">{volunteer.animal_handling || 'Not specified'}</span>
// // //                             </div>
// // //                             {getBadgeDisplay(volunteer.badges) && (
// // //                               <div className="reports-detail-row">
// // //                                 <span className="reports-detail-label">Badges:</span>
// // //                                 <span className="reports-detail-value">{getBadgeDisplay(volunteer.badges)}</span>
// // //                               </div>
// // //                             )}
// // //                           </div>

// // //                           <div className="reports-volunteer-meta">
// // //                             <span>Joined {formatVolunteerDate(volunteer.joined_at)}</span>
// // //                             <span>{volunteer.assigned_reports_count} active rescues</span>
// // //                           </div>
// // //                         </div>
// // //                         <button
// // //                           className="reports-btn assign"
// // //                           onClick={() => onSelect(volunteer)}
// // //                         >
// // //                           Assign
// // //                         </button>
// // //                       </div>
// // //                     ))}
// // //                   </div>
// // //                 )}

// // //                 {unavailableVolunteers.length > 0 && (
// // //                   <div className="reports-volunteer-category">
// // //                     <div className="reports-category-header">
// // //                       <span className="reports-status-dot unavailable"></span>
// // //                       <span>Unavailable ({unavailableVolunteers.length})</span>
// // //                     </div>
// // //                     {unavailableVolunteers.map(volunteer => (
// // //                       <div key={volunteer.user_id} className="reports-volunteer-item unavailable">
// // //                         <div className="reports-volunteer-avatar-wrapper">
// // //                           <div className="reports-volunteer-avatar unavailable">
// // //                             {volunteer.username.charAt(0).toUpperCase()}
// // //                           </div>
// // //                         </div>
// // //                         <div className="reports-volunteer-info">
// // //                           <div className="reports-volunteer-header">
// // //                             <h5>{volunteer.username}</h5>
// // //                             <span className="reports-volunteer-status unavailable">Unavailable</span>
// // //                           </div>
// // //                           <div className="reports-volunteer-contact">
// // //                             <span>{volunteer.email}</span>
// // //                           </div>

// // //                           {/* Volunteer Details for Unavailable */}
// // //                           <div className="reports-volunteer-details">
// // //                             <div className="reports-detail-row">
// // //                               <span className="reports-detail-label">ID:</span>
// // //                               <span className="reports-detail-value">{volunteer.user_id}</span>
// // //                             </div>
// // //                             <div className="reports-detail-row">
// // //                               <span className="reports-detail-label">City:</span>
// // //                               <span className="reports-detail-value">{volunteer.city || 'Not specified'}</span>
// // //                             </div>
// // //                             <div className="reports-detail-row">
// // //                               <span className="reports-detail-label">Has Car:</span>
// // //                               <span className="reports-detail-value">{volunteer.has_car === 1 ? 'Yes' : 'No'}</span>
// // //                             </div>
// // //                             <div className="reports-detail-row">
// // //                               <span className="reports-detail-label">Can Foster:</span>
// // //                               <span className="reports-detail-value">{volunteer.can_foster === 1 ? 'Yes' : 'No'}</span>
// // //                             </div>
// // //                           </div>

// // //                           <div className="reports-volunteer-meta">
// // //                             <span>Currently unavailable</span>
// // //                           </div>
// // //                         </div>
// // //                         <button
// // //                           className="reports-btn assign-disabled"
// // //                           disabled
// // //                         >
// // //                           Unavailable
// // //                         </button>
// // //                       </div>
// // //                     ))}
// // //                   </div>
// // //                 )}
// // //               </div>
// // //             )}
// // //           </div>
// // //         </div>

// // //         <div className="reports-modal-footer">
// // //           <button className="reports-btn secondary" onClick={onClose}>
// // //             Cancel
// // //           </button>
// // //         </div>
// // //       </div>
// // //     </div>
// // //   );
// // // };

// // // // Report Detail Modal Component
// // // const ReportDetailModal: React.FC<{
// // //   report: RescueReport | null;
// // //   isOpen: boolean;
// // //   onClose: () => void;
// // //   onAssignClick: () => void;
// // //   onUnassign: (reportId: number) => void;
// // //   getAnimalEmoji: (type: string) => string;
// // //   formatDate: (date: string) => string;
// // //   getStatusName: (statusId: number, statusName?: string) => string;
// // //   showMessage: (text: string, type: 'success' | 'error') => void;
// // // }> = ({ 
// // //   report, 
// // //   isOpen, 
// // //   onClose, 
// // //   onAssignClick, 
// // //   onUnassign, 
// // //   getAnimalEmoji, 
// // //   formatDate, 
// // //   getStatusName,
// // //   showMessage
// // // }) => {
// // //   const [localAdminNote, setLocalAdminNote] = useState('');
// // //   const [savingNote, setSavingNote] = useState(false);

// // //   useEffect(() => {
// // //     if (report) {
// // //       setLocalAdminNote(report.admin_note || '');
// // //     }
// // //   }, [report]);

// // //   if (!isOpen || !report) return null;

// // //   const handleSaveNote = async (e: React.FormEvent) => {
// // //     e.preventDefault();

// // //     if (!localAdminNote.trim()) {
// // //       showMessage('Please enter a note', 'error');
// // //       return;
// // //     }

// // //     try {
// // //       const token = localStorage.getItem('token');
// // //       if (!token) {
// // //         showMessage('Please login first', 'error');
// // //         return;
// // //       }

// // //       setSavingNote(true);

// // //       const response = await fetch(`http://localhost:5000/api/reports/${report.report_id}/admin-note`, {
// // //         method: 'POST',
// // //         headers: {
// // //           'Authorization': `Bearer ${token}`,
// // //           'Content-Type': 'application/json'
// // //         },
// // //         body: JSON.stringify({ note: localAdminNote })
// // //       });

// // //       if (response.ok) {
// // //         const data = await response.json();
// // //         showMessage('Note saved successfully!', 'success');
// // //         report.admin_note = data.data?.admin_note || localAdminNote;
// // //       } else {
// // //         const errorData = await response.json();
// // //         showMessage(errorData.message || 'Failed to save note', 'error');
// // //       }
// // //     } catch (error: any) {
// // //       console.error('Error saving note:', error);
// // //       showMessage(error.message || 'Error saving note. Please try again.', 'error');
// // //     } finally {
// // //       setSavingNote(false);
// // //     }
// // //   };

// // //   const statusDisplay = getStatusName(report.status_id, report.status_name);
// // //   const isDeclined = report.status_id === 5;
// // //   const isInProgress = report.status_id === 3;

// // //   return (
// // //     <div className="reports-modal-overlay" onClick={onClose}>
// // //       <div className="reports-modal-content large" onClick={e => e.stopPropagation()}>
// // //         <div className="reports-modal-header dark">
// // //           <div>
// // //             <h3>Rescue Report #{report.report_id}</h3>
// // //             <div className="reports-modal-subheader">
// // //               <span className={`reports-status-badge ${statusDisplay.toLowerCase().replace(' ', '-')}`}>
// // //                 {statusDisplay}
// // //               </span>
// // //               <span className="reports-meta">{formatDate(report.submitted_at)}</span>
// // //             </div>
// // //           </div>
// // //           <button className="reports-modal-close" onClick={onClose}>×</button>
// // //         </div>

// // //         <div className="reports-modal-body">
// // //           <div className="reports-detail-grid">
// // //             <div className="reports-detail-column">
// // //               <div className="reports-info-card">
// // //                 <div className="reports-card-header beige">
// // //                   <h4>🐾 Animal Information</h4>
// // //                 </div>
// // //                 <div className="reports-card-content">
// // //                   <div className="reports-animal-display">
// // //                     <div className="reports-animal-icon">
// // //                       {getAnimalEmoji(report.animal_type)}
// // //                     </div>
// // //                     <div className="reports-animal-details">
// // //                       <div className="reports-animal-type">{report.animal_type}</div>
// // //                       <div className="reports-animal-condition">
// // //                         <span className="condition-tag">{report.animal_condition}</span>
// // //                       </div>
// // //                     </div>
// // //                   </div>
// // //                 </div>
// // //               </div>

// // //               <div className="reports-info-card">
// // //                 <div className="reports-card-header beige">
// // //                   <h4>👤 Reporter Details</h4>
// // //                 </div>
// // //                 <div className="reports-card-content">
// // //                   <div className="reports-detail-list">
// // //                     <div className="reports-detail-row">
// // //                       <span className="reports-detail-label">Name</span>
// // //                       <span className="reports-detail-value">{report.username}</span>
// // //                     </div>
// // //                     <div className="reports-detail-row">
// // //                       <span className="reports-detail-label">Email</span>
// // //                       <span className="reports-detail-value">{report.email}</span>
// // //                     </div>
// // //                     <div className="reports-detail-row">
// // //                       <span className="reports-detail-label">Phone</span>
// // //                       <span className="reports-detail-value">{report.phone}</span>
// // //                     </div>
// // //                   </div>
// // //                 </div>
// // //               </div>

// // //               <div className="reports-info-card">
// // //                 <div className="reports-card-header beige">
// // //                   <h4>📍 Location</h4>
// // //                 </div>
// // //                 <div className="reports-card-content">
// // //                   <div className="reports-location-info">
// // //                     <p>{report.location_address}</p>
// // //                     <button 
// // //                       className="reports-btn map"
// // //                       onClick={() => {
// // //                         const encodedAddress = encodeURIComponent(report.location_address);
// // //                         window.open(`https://maps.google.com/?q=${encodedAddress}`, '_blank');
// // //                       }}
// // //                     >
// // //                       View on Map
// // //                     </button>
// // //                   </div>
// // //                 </div>
// // //               </div>
// // //             </div>

// // //             <div className="reports-detail-column">
// // //               {/* Volunteer Assignment Card */}
// // //               <div className="reports-info-card">
// // //                 <div className="reports-card-header beige">
// // //                   <div className="reports-header-row">
// // //                     <h4>🦸 Ranger Assignment</h4>
// // //                     {!report.volunteer_name && !isDeclined && !isInProgress && (
// // //                       <button 
// // //                         className="reports-btn primary small"
// // //                         onClick={onAssignClick}
// // //                       >
// // //                         + Assign Ranger
// // //                       </button>
// // //                     )}
// // //                   </div>
// // //                 </div>
// // //                 <div className="reports-card-content">
// // //                   {report.volunteer_name && !isDeclined ? (
// // //                     <div className="reports-volunteer-assigned">
// // //                       <div className="reports-assigned-volunteer">
// // //                         <div className="reports-volunteer-avatar large">
// // //                           {report.volunteer_name.charAt(0).toUpperCase()}
// // //                         </div>
// // //                         <div className="reports-assigned-info">
// // //                           <h5>{report.volunteer_name}</h5>
// // //                           <div className="reports-assigned-contact">
// // //                             {report.volunteer_email && <span>{report.volunteer_email}</span>}
// // //                             {report.volunteer_phone && <span>{report.volunteer_phone}</span>}
// // //                           </div>
// // //                         </div>
// // //                       </div>
// // //                       {/* Show unassign button only if not in progress */}
// // //                       {!isInProgress && (
// // //                         <button 
// // //                           className="reports-btn unassign"
// // //                           onClick={() => onUnassign(report.report_id)}
// // //                         >
// // //                           Unassign
// // //                         </button>
// // //                       )}
// // //                       {isInProgress && (
// // //                         <span className="reports-badge in-progress">In Progress - Cannot Unassign</span>
// // //                       )}
// // //                     </div>
// // //                   ) : isDeclined ? (
// // //                     <div className="reports-declined-container">
// // //                       <div className="reports-declined-header">
// // //                         <span className="reports-declined-icon">❌</span>
// // //                         <div className="reports-declined-title">Mission Declined by Ranger</div>
// // //                       </div>

// // //                       {report.volunteer_name && (
// // //                         <div className="reports-declined-volunteer">
// // //                           <div className="reports-volunteer-avatar declined">
// // //                             {report.volunteer_name.charAt(0).toUpperCase()}
// // //                           </div>
// // //                           <div className="reports-declined-volunteer-info">
// // //                             <div className="reports-declined-volunteer-name">{report.volunteer_name}</div>
// // //                             <div className="reports-declined-volunteer-contact">
// // //                               {report.volunteer_email && <span>{report.volunteer_email}</span>}
// // //                               {report.volunteer_phone && <span>{report.volunteer_phone}</span>}
// // //                             </div>
// // //                             {report.volunteer_responded_at && (
// // //                               <div className="reports-declined-time">
// // //                                 Declined on {formatDate(report.volunteer_responded_at)}
// // //                               </div>
// // //                             )}
// // //                           </div>
// // //                         </div>
// // //                       )}

// // //                       {report.declined_reason ? (
// // //                         <div className="reports-declined-reason">
// // //                           <div className="reports-declined-reason-label">Declined Reason:</div>
// // //                           <div className="reports-declined-reason-text">"{report.declined_reason}"</div>
// // //                         </div>
// // //                       ) : (
// // //                         <div className="reports-declined-reason empty">
// // //                           <em>No reason provided</em>
// // //                         </div>
// // //                       )}

// // //                       <button 
// // //                         className="reports-btn primary"
// // //                         onClick={onAssignClick}
// // //                       >
// // //                         + Assign New Ranger
// // //                       </button>
// // //                     </div>
// // //                   ) : (
// // //                     <div className="reports-no-volunteer">
// // //                       <span className="no-volunteer-emoji">🕊️</span>
// // //                       <p>No ranger assigned yet</p>
// // //                       <button 
// // //                         className="reports-btn text"
// // //                         onClick={onAssignClick}
// // //                       >
// // //                         Click to assign a ranger
// // //                       </button>
// // //                     </div>
// // //                   )}
// // //                 </div>
// // //               </div>

// // //               <div className="reports-info-card">
// // //                 <div className="reports-card-header beige">
// // //                   <h4>📝 Report Description</h4>
// // //                 </div>
// // //                 <div className="reports-card-content">
// // //                   <div className="reports-description">
// // //                     <p>{report.description}</p>
// // //                   </div>
// // //                   {report.user_note && (
// // //                     <div className="reports-user-note">
// // //                       <div className="note-label">Reporter's Note:</div>
// // //                       <p>{report.user_note}</p>
// // //                     </div>
// // //                   )}
// // //                 </div>
// // //               </div>

// // //               <div className="reports-info-card">
// // //                 <div className="reports-card-header beige">
// // //                   <h4>📌 Admin Notes</h4>
// // //                 </div>
// // //                 <div className="reports-card-content">
// // //                   <form onSubmit={handleSaveNote} className="reports-notes-form">
// // //                     <textarea
// // //                       className="reports-notes-input"
// // //                       placeholder="Add internal notes about this rescue mission..."
// // //                       value={localAdminNote}
// // //                       onChange={(e) => setLocalAdminNote(e.target.value)}
// // //                       rows={3}
// // //                       disabled={isInProgress} // Disable when task is in progress
// // //                     />
// // //                     <div className="reports-notes-actions">
// // //                       <button
// // //                         type="submit"
// // //                         className="reports-btn save"
// // //                         disabled={savingNote || !localAdminNote.trim() || isInProgress} // Disable when in progress
// // //                       >
// // //                         {savingNote ? 'Saving...' : 'Save Note'}
// // //                       </button>
// // //                       {isInProgress && (
// // //                         <span className="reports-note-disabled-hint">Notes disabled while task in progress</span>
// // //                       )}
// // //                     </div>
// // //                   </form>
// // //                 </div>
// // //               </div>
// // //             </div>
// // //           </div>
// // //         </div>

// // //         <div className="reports-modal-footer">
// // //           <button className="reports-btn secondary" onClick={onClose}>
// // //             Close
// // //           </button>
// // //         </div>
// // //       </div>
// // //     </div>
// // //   );
// // // };

// // // const RescueReports: React.FC = () => {
// // //   const [reports, setReports] = useState<RescueReport[]>([]);
// // //   const [volunteers, setVolunteers] = useState<Volunteer[]>([]);
// // //   const [availabilityStatuses, setAvailabilityStatuses] = useState<AvailabilityStatus[]>([]);
// // //   const [loading, setLoading] = useState(true);
// // //   const [loadingVolunteers, setLoadingVolunteers] = useState(false);
// // //   const [filterStatus, setFilterStatus] = useState<string>('all');
// // //   const [sortBy, setSortBy] = useState<string>('recent');
// // //   const [searchQuery, setSearchQuery] = useState<string>('');
// // //   const [selectedReport, setSelectedReport] = useState<RescueReport | null>(null);
// // //   const [isModalOpen, setIsModalOpen] = useState(false);
// // //   const [isVolunteerModalOpen, setIsVolunteerModalOpen] = useState(false);
// // //   const [showSuccessMessage, setShowSuccessMessage] = useState(false);
// // //   const [showErrorMessage, setShowErrorMessage] = useState(false);
// // //   const [message, setMessage] = useState('');

// // //   // Pagination state
// // //   const [currentPage, setCurrentPage] = useState(1);
// // //   const [itemsPerPage] = useState(9);

// // //   // Fetch status list from database
// // //   const fetchStatusList = useCallback(async () => {
// // //     try {
// // //       const token = localStorage.getItem('token');
// // //       if (!token) return;

// // //       const response = await fetch('http://localhost:5000/api/reports/status/list', {
// // //         headers: {
// // //           'Authorization': `Bearer ${token}`,
// // //           'Content-Type': 'application/json'
// // //         }
// // //       });

// // //       if (response.ok) {
// // //         const data = await response.json();
// // //         if (data.success) {
// // //           setAvailabilityStatuses(data.data || []);
// // //         }
// // //       }
// // //     } catch (error) {
// // //       console.error('Error fetching status list:', error);
// // //     }
// // //   }, []);

// // //   const getStatusName = (statusId: number, statusName?: string): string => {
// // //     if (statusName) {
// // //       return statusName
// // //         .split('_')
// // //         .map(word => word.charAt(0).toUpperCase() + word.slice(1))
// // //         .join(' ');
// // //     }

// // //     const statusMap: { [key: number]: string } = {
// // //       1: 'Submitted',
// // //       2: 'Assigned',
// // //       3: 'In Progress',
// // //       4: 'Completed',
// // //       5: 'Declined'
// // //     };
// // //     return statusMap[statusId] || 'Unknown';
// // //   };

// // //   const showMessage = (text: string, type: 'success' | 'error') => {
// // //     setMessage(text);
// // //     if (type === 'success') {
// // //       setShowSuccessMessage(true);
// // //     } else {
// // //       setShowErrorMessage(true);
// // //     }
// // //     setTimeout(() => {
// // //       setShowSuccessMessage(false);
// // //       setShowErrorMessage(false);
// // //       setMessage('');
// // //     }, 3000);
// // //   };

// // //   const fetchReports = useCallback(async () => {
// // //     try {
// // //       setLoading(true);

// // //       const token = localStorage.getItem('token');
// // //       if (!token) {
// // //         showMessage('Please login first', 'error');
// // //         setLoading(false);
// // //         return;
// // //       }

// // //       const response = await fetch('http://localhost:5000/api/reports/admin/all', {
// // //         headers: {
// // //           'Authorization': `Bearer ${token}`,
// // //           'Content-Type': 'application/json'
// // //         }
// // //       });

// // //       if (response.ok) {
// // //         const data = await response.json();

// // //         if (data.success) {
// // //           const reportsData = data.data || [];

// // //           const mappedReports: RescueReport[] = reportsData.map((report: any) => {
// // //             const mappedReport: RescueReport = {
// // //               report_id: report.report_id,
// // //               user_id: report.user_id,
// // //               username: report.reporter_name || 'Anonymous',
// // //               email: report.email || 'No email',
// // //               phone: report.reporter_phone || 'No phone',
// // //               description: report.description,
// // //               location_address: report.location_address,
// // //               user_note: report.user_note,
// // //               admin_note: report.admin_note,
// // //               submitted_at: report.submitted_at,
// // //               animal_type: report.animal_type || 'Unknown',
// // //               animal_condition: report.animal_condition || 'Unknown',
// // //               status_id: report.status_id || 1,
// // //               status_name: report.status_name,
// // //               volunteer_id: report.volunteer_id,
// // //               volunteer_name: report.volunteer_name,
// // //               volunteer_email: report.volunteer_email,
// // //               volunteer_phone: report.volunteer_phone,
// // //               task_id: report.task_id,
// // //               task_status: report.task_status,
// // //               declined_reason: report.declined_reason,
// // //               volunteer_responded_at: report.volunteer_responded_at,
// // //               volunteer_response: report.volunteer_response
// // //             };

// // //             if (report.status_id === 5) {
// // //               console.log(`Report #${report.report_id}:`, {
// // //                 volunteer: report.volunteer_name,
// // //                 reason: report.declined_reason,
// // //                 responded_at: report.volunteer_responded_at
// // //               });
// // //             }

// // //             return mappedReport;
// // //           });

// // //           setReports(mappedReports);
// // //           setCurrentPage(1);

// // //           const declinedReports = mappedReports.filter((report: RescueReport) => report.status_id === 5);
// // //           if (declinedReports.length > 0) {
// // //             console.log(`Found ${declinedReports.length} declined reports`);
// // //             declinedReports.forEach((report: RescueReport) => {
// // //               console.log(`  #${report.report_id}: ${report.volunteer_name} - "${report.declined_reason}"`);
// // //             });
// // //           }

// // //         } else {
// // //           showMessage(data.message || 'Failed to load reports', 'error');
// // //         }
// // //       } else {
// // //         showMessage('Failed to fetch reports', 'error');
// // //       }
// // //     } catch (error: any) {
// // //       console.error('Network error fetching reports:', error);
// // //       showMessage('Error loading reports. Please check your connection.', 'error');
// // //     } finally {
// // //       setLoading(false);
// // //     }
// // //   }, []);

// // //   // FIXED: fetchVolunteers with all fields properly mapped
// // //   const fetchVolunteers = useCallback(async () => {
// // //     try {
// // //       setLoadingVolunteers(true);

// // //       const token = localStorage.getItem('token');
// // //       if (!token) {
// // //         setVolunteers([]);
// // //         setLoadingVolunteers(false);
// // //         return;
// // //       }

// // //       const response = await fetch('http://localhost:5000/api/volunteers/available', {
// // //         headers: {
// // //           'Authorization': `Bearer ${token}`,
// // //           'Content-Type': 'application/json'
// // //         }
// // //       });

// // //       if (response.ok) {
// // //         const data = await response.json();

// // //         if (data.success) {
// // //           const volunteersData = data.data || [];

// // //           // Debug log to see raw data from backend
// // //           if (volunteersData.length > 0) {
// // //             console.log('Raw volunteer data from API:', volunteersData[0]);
// // //           }

// // //           const mappedVolunteers: Volunteer[] = volunteersData.map((volunteer: any) => ({
// // //             user_id: volunteer.user_id,
// // //             username: volunteer.username,
// // //             email: volunteer.email,
// // //             phone: volunteer.phone || 'Not provided',
// // //             bio: volunteer.bio,
// // //             joined_at: volunteer.joined_at || volunteer.created_at,
// // //             approval_status: volunteer.approval_status,
// // //             approval_status_id: volunteer.approval_status_id,
// // //             availability_status: volunteer.availability_status,
// // //             availability_status_id: volunteer.availability_status_id,
// // //             assigned_reports_count: volunteer.assigned_reports_count || 0,
// // //             role_id: volunteer.role_id,
// // //             created_at: volunteer.created_at,
// // //             // These fields come directly from the backend now
// // //             has_car: volunteer.has_car !== undefined ? volunteer.has_car : 0,
// // //             can_foster: volunteer.can_foster !== undefined ? volunteer.can_foster : 0,
// // //             animal_handling: volunteer.animal_handling || '',
// // //             city: volunteer.city || '',
// // //             badges: volunteer.badges
// // //           }));

// // //           // Debug log after mapping
// // //           if (mappedVolunteers.length > 0) {
// // //             console.log('Mapped volunteer data:', {
// // //               user_id: mappedVolunteers[0].user_id,
// // //               has_car: mappedVolunteers[0].has_car,
// // //               can_foster: mappedVolunteers[0].can_foster,
// // //               animal_handling: mappedVolunteers[0].animal_handling,
// // //               city: mappedVolunteers[0].city,
// // //               badges: mappedVolunteers[0].badges
// // //             });
// // //           }

// // //           setVolunteers(mappedVolunteers);
// // //         } else {
// // //           console.error('Failed to load volunteers:', data.message);
// // //           setVolunteers([]);
// // //         }
// // //       } else {
// // //         console.error('HTTP Error fetching volunteers:', response.status);
// // //         setVolunteers([]);
// // //       }
// // //     } catch (error) {
// // //       console.error('Error fetching volunteers:', error);
// // //       setVolunteers([]);
// // //     } finally {
// // //       setLoadingVolunteers(false);
// // //     }
// // //   }, []);

// // //   useEffect(() => {
// // //     fetchStatusList();
// // //     fetchReports();
// // //     fetchVolunteers();
// // //   }, [fetchReports, fetchVolunteers, fetchStatusList]);

// // //   const assignVolunteer = async (reportId: number, volunteerId: number, volunteerName: string) => {
// // //     try {
// // //       const token = localStorage.getItem('token');
// // //       if (!token) {
// // //         showMessage('Please login first', 'error');
// // //         return;
// // //       }

// // //       const response = await fetch(`http://localhost:5000/api/reports/${reportId}/assign`, {
// // //         method: 'POST',
// // //         headers: {
// // //           'Authorization': `Bearer ${token}`,
// // //           'Content-Type': 'application/json'
// // //         },
// // //         body: JSON.stringify({ 
// // //           volunteer_id: volunteerId
// // //         })
// // //       });

// // //       if (response.ok) {
// // //         const data = await response.json();

// // //         const volunteer = volunteers.find(v => v.user_id === volunteerId);

// // //         setReports(prev => prev.map(report => {
// // //           if (report.report_id === reportId) {
// // //             return {
// // //               ...report,
// // //               volunteer_id: volunteerId,
// // //               volunteer_name: volunteerName,
// // //               volunteer_email: volunteer?.email || '',
// // //               volunteer_phone: volunteer?.phone || '',
// // //               status_id: 2,
// // //               status_name: 'assigned',
// // //               declined_reason: undefined,
// // //               volunteer_responded_at: undefined
// // //             };
// // //           }
// // //           return report;
// // //         }));

// // //         setVolunteers(prev => prev.map(v => {
// // //           if (v.user_id === volunteerId) {
// // //             return {
// // //               ...v,
// // //               assigned_reports_count: (v.assigned_reports_count || 0) + 1
// // //             };
// // //           }
// // //           return v;
// // //         }));

// // //         showMessage(`Ranger "${volunteerName}" assigned successfully!`, 'success');
// // //         setIsVolunteerModalOpen(false);
// // //         setSelectedReport(null);
// // //         fetchReports();
// // //         fetchVolunteers();
// // //       } else {
// // //         const errorData = await response.json();
// // //         showMessage(errorData.message || 'Failed to assign ranger', 'error');
// // //       }
// // //     } catch (error: any) {
// // //       console.error('Error assigning volunteer:', error);
// // //       showMessage(error.message || 'Error assigning ranger. Please try again.', 'error');
// // //     }
// // //   };

// // //   const unassignVolunteer = async (reportId: number) => {
// // //     if (!window.confirm('Are you sure you want to unassign this ranger? The status will be reset to "Submitted".')) return;

// // //     try {
// // //       const token = localStorage.getItem('token');
// // //       if (!token) {
// // //         showMessage('Please login first', 'error');
// // //         return;
// // //       }

// // //       const response = await fetch(`http://localhost:5000/api/reports/${reportId}/unassign`, {
// // //         method: 'PUT',
// // //         headers: {
// // //           'Authorization': `Bearer ${token}`,
// // //           'Content-Type': 'application/json'
// // //         }
// // //       });

// // //       if (response.ok) {
// // //         const report = reports.find(r => r.report_id === reportId);
// // //         const volunteerId = report?.volunteer_id;

// // //         setReports(prev => prev.map(report => {
// // //           if (report.report_id === reportId) {
// // //             return {
// // //               ...report,
// // //               volunteer_id: undefined,
// // //               volunteer_name: undefined,
// // //               volunteer_email: undefined,
// // //               volunteer_phone: undefined,
// // //               status_id: 1,
// // //               status_name: 'submitted',
// // //               declined_reason: undefined,
// // //               volunteer_responded_at: undefined
// // //             };
// // //           }
// // //           return report;
// // //         }));

// // //         if (volunteerId) {
// // //           setVolunteers(prev => prev.map(v => {
// // //             if (v.user_id === volunteerId) {
// // //               return {
// // //                 ...v,
// // //                 assigned_reports_count: Math.max(0, (v.assigned_reports_count || 0) - 1)
// // //               };
// // //             }
// // //             return v;
// // //           }));
// // //         }

// // //         showMessage('Ranger unassigned successfully!', 'success');
// // //         fetchReports();
// // //         fetchVolunteers();
// // //       } else {
// // //         const errorData = await response.json();
// // //         showMessage(errorData.message || 'Failed to unassign ranger', 'error');
// // //       }
// // //     } catch (error: any) {
// // //       console.error('Error unassigning volunteer:', error);
// // //       showMessage(error.message || 'Error unassigning ranger. Please try again.', 'error');
// // //     }
// // //   };

// // //   const getAnimalEmoji = (animalType: string): string => {
// // //     const type = animalType?.toLowerCase() || '';
// // //     if (type.includes('dog')) return '🐶';
// // //     if (type.includes('cat')) return '🐱';
// // //     if (type.includes('bird')) return '🐦';
// // //     if (type.includes('rabbit')) return '🐰';
// // //     if (type.includes('hamster')) return '🐹';
// // //     if (type.includes('turtle')) return '🐢';
// // //     if (type.includes('snake')) return '🐍';
// // //     if (type.includes('fish')) return '🐟';
// // //     if (type.includes('horse')) return '🐴';
// // //     if (type.includes('cow')) return '🐮';
// // //     if (type.includes('goat')) return '🐐';
// // //     if (type.includes('sheep')) return '🐑';
// // //     return '🐾';
// // //   };

// // //   const formatDate = (dateString: string): string => {
// // //     try {
// // //       const date = new Date(dateString);
// // //       return date.toLocaleDateString('en-US', {
// // //         month: 'short',
// // //         day: 'numeric',
// // //         year: 'numeric',
// // //         hour: '2-digit',
// // //         minute: '2-digit'
// // //       });
// // //     } catch (error) {
// // //       return 'Invalid date';
// // //     }
// // //   };

// // //   const formatVolunteerDate = (dateString: string): string => {
// // //     try {
// // //       const date = new Date(dateString);
// // //       return date.toLocaleDateString('en-US', {
// // //         year: 'numeric',
// // //         month: 'short',
// // //         day: 'numeric'
// // //       });
// // //     } catch (error) {
// // //       return 'Invalid date';
// // //     }
// // //   };

// // //   const filteredReports = reports
// // //     .filter(report => {
// // //       if (filterStatus !== 'all') {
// // //         const statusMap: { [key: string]: number } = {
// // //           'submitted': 1,
// // //           'assigned': 2,
// // //           'in-progress': 3,
// // //           'completed': 4,
// // //           'declined': 5
// // //         };
// // //         if (report.status_id !== statusMap[filterStatus]) return false;
// // //       }

// // //       if (searchQuery) {
// // //         const query = searchQuery.toLowerCase();
// // //         return (
// // //           report.username?.toLowerCase().includes(query) ||
// // //           report.animal_type?.toLowerCase().includes(query) ||
// // //           report.location_address?.toLowerCase().includes(query) ||
// // //           report.description?.toLowerCase().includes(query) ||
// // //           report.report_id.toString().includes(query) ||
// // //           report.volunteer_name?.toLowerCase().includes(query) ||
// // //           report.phone?.toLowerCase().includes(query) ||
// // //           (report.declined_reason?.toLowerCase().includes(query) ?? false)
// // //         );
// // //       }

// // //       return true;
// // //     })
// // //     .sort((a, b) => {
// // //       switch(sortBy) {
// // //         case 'recent':
// // //           return new Date(b.submitted_at).getTime() - new Date(a.submitted_at).getTime();
// // //         case 'oldest':
// // //           return new Date(a.submitted_at).getTime() - new Date(b.submitted_at).getTime();
// // //         case 'critical':
// // //           const getCriticalScore = (condition: string) => {
// // //             const cond = condition?.toLowerCase() || '';
// // //             if (cond.includes('critical')) return 0;
// // //             if (cond.includes('severe')) return 1;
// // //             if (cond.includes('urgent')) return 2;
// // //             return 3;
// // //           };
// // //           return getCriticalScore(a.animal_condition) - getCriticalScore(b.animal_condition);
// // //         case 'status':
// // //           return a.status_id - b.status_id;
// // //         default:
// // //           return 0;
// // //       }
// // //     });

// // //   // Pagination logic
// // //   const indexOfLastItem = currentPage * itemsPerPage;
// // //   const indexOfFirstItem = indexOfLastItem - itemsPerPage;
// // //   const currentItems = filteredReports.slice(indexOfFirstItem, indexOfLastItem);
// // //   const totalPages = Math.ceil(filteredReports.length / itemsPerPage);

// // //   const paginate = (pageNumber: number) => setCurrentPage(pageNumber);
// // //   const nextPage = () => setCurrentPage(prev => Math.min(prev + 1, totalPages));
// // //   const prevPage = () => setCurrentPage(prev => Math.max(prev - 1, 1));

// // //   const getPageNumbers = (): number[] => {
// // //     const pageNumbers: number[] = [];
// // //     const maxVisible = 5;

// // //     if (totalPages <= maxVisible) {
// // //       for (let i = 1; i <= totalPages; i++) {
// // //         pageNumbers.push(i);
// // //       }
// // //     } else {
// // //       if (currentPage <= 3) {
// // //         for (let i = 1; i <= 5; i++) {
// // //           pageNumbers.push(i);
// // //         }
// // //       } else if (currentPage >= totalPages - 2) {
// // //         for (let i = totalPages - 4; i <= totalPages; i++) {
// // //           pageNumbers.push(i);
// // //         }
// // //       } else {
// // //         for (let i = currentPage - 2; i <= currentPage + 2; i++) {
// // //           pageNumbers.push(i);
// // //         }
// // //       }
// // //     }

// // //     return pageNumbers;
// // //   };

// // //   if (loading) {
// // //     return (
// // //       <div className="reports-loading-container">
// // //         <div className="reports-loader">
// // //           <div className="reports-spinner"></div>
// // //           <p className="reports-loader-text">Loading rescue missions...</p>
// // //         </div>
// // //       </div>
// // //     );
// // //   }

// // //   return (
// // //     <div className="reports-container">
// // //       {/* Success/Error Messages */}
// // //       {showSuccessMessage && (
// // //         <div className="reports-notification success">
// // //           <span className="notification-icon">✓</span>
// // //           <span>{message}</span>
// // //         </div>
// // //       )}
// // //       {showErrorMessage && (
// // //         <div className="reports-notification error">
// // //           <span className="notification-icon">⚠</span>
// // //           <span>{message}</span>
// // //         </div>
// // //       )}

// // //       {/* Header */}
// // //       <div className="reports-header">
// // //         <div className="reports-header-content">
// // //           <h1 className="reports-title">Rescue Operations</h1>
// // //           <p className="reports-subtitle">
// // //             Manage and coordinate animal rescue missions with our ranger team
// // //           </p>
// // //         </div>
// // //         <div className="reports-header-actions">
// // //           <button onClick={fetchReports} className="reports-btn refresh">
// // //             <span className="btn-icon">↻</span>
// // //             Refresh
// // //           </button>
// // //         </div>
// // //       </div>

// // //       {/* Filters */}
// // //       <div className="reports-filters-card">
// // //         <div className="reports-search-wrapper">
// // //           <span className="search-icon">🔍</span>
// // //           <input
// // //             type="text"
// // //             placeholder="Search by ID, animal, location, ranger, declined reason..."
// // //             value={searchQuery}
// // //             onChange={(e) => setSearchQuery(e.target.value)}
// // //             className="reports-search-input"
// // //           />
// // //           {searchQuery && (
// // //             <button 
// // //               className="reports-clear-search"
// // //               onClick={() => setSearchQuery('')}
// // //             >
// // //               ×
// // //             </button>
// // //           )}
// // //         </div>

// // //         <div className="reports-filters-row">
// // //           <div className="reports-filter-group">
// // //             <label className="reports-filter-label">Status</label>
// // //             <select 
// // //               value={filterStatus} 
// // //               onChange={(e) => setFilterStatus(e.target.value)}
// // //               className="reports-filter-select"
// // //             >
// // //               <option value="all">All Status</option>
// // //               <option value="submitted">Submitted</option>
// // //               <option value="assigned">Assigned</option>
// // //               <option value="in-progress">In Progress</option>
// // //               <option value="completed">Completed</option>
// // //               <option value="declined">Declined</option>
// // //             </select>
// // //           </div>

// // //           <div className="reports-filter-group">
// // //             <label className="reports-filter-label">Sort By</label>
// // //             <select 
// // //               value={sortBy} 
// // //               onChange={(e) => setSortBy(e.target.value)}
// // //               className="reports-filter-select"
// // //             >
// // //               <option value="recent">Most Recent</option>
// // //               <option value="oldest">Oldest</option>
// // //               <option value="critical">Critical First</option>
// // //               <option value="status">By Status</option>
// // //             </select>
// // //           </div>

// // //           <div className="reports-stats-badge">
// // //             {filteredReports.length} of {reports.length} missions
// // //           </div>
// // //         </div>
// // //       </div>

// // //       {/* Reports Grid/Cards */}
// // //       <div className="reports-content">
// // //         {filteredReports.length === 0 ? (
// // //           <div className="reports-empty-state">
// // //             <span className="empty-state-emoji">🕊️</span>
// // //             <h3>No Rescue Missions Found</h3>
// // //             <p>
// // //               {searchQuery 
// // //                 ? `No missions matching "${searchQuery}"` 
// // //                 : filterStatus !== 'all'
// // //                 ? `No missions with status "${filterStatus}"`
// // //                 : 'No rescue missions have been reported yet.'}
// // //             </p>
// // //             {(searchQuery || filterStatus !== 'all') && (
// // //               <button 
// // //                 onClick={() => {
// // //                   setSearchQuery('');
// // //                   setFilterStatus('all');
// // //                   setCurrentPage(1);
// // //                 }}
// // //                 className="reports-btn outline"
// // //               >
// // //                 Clear Filters
// // //               </button>
// // //             )}
// // //           </div>
// // //         ) : (
// // //           <>
// // //             <div className="reports-grid">
// // //               {currentItems.map(report => {
// // //                 const isDeclined = report.status_id === 5;
// // //                 const statusDisplay = getStatusName(report.status_id, report.status_name);

// // //                 return (
// // //                   <div key={report.report_id} className="reports-card">
// // //                     <div className="reports-card-header dark">
// // //                       <div className="reports-card-title">
// // //                         <span className="reports-id">#{report.report_id}</span>
// // //                         <span className={`reports-status ${statusDisplay.toLowerCase().replace(' ', '-')}`}>
// // //                           {statusDisplay}
// // //                         </span>
// // //                       </div>
// // //                       <div className="reports-date">
// // //                         {formatDate(report.submitted_at)}
// // //                       </div>
// // //                     </div>

// // //                     <div className="reports-card-body">
// // //                       <div className="reports-animal-section">
// // //                         <div className="reports-animal-icon large">
// // //                           {getAnimalEmoji(report.animal_type)}
// // //                         </div>
// // //                         <div className="reports-animal-info">
// // //                           <h4>{report.animal_type}</h4>
// // //                           <span className="reports-condition">{report.animal_condition}</span>
// // //                         </div>
// // //                       </div>

// // //                       <div className="reports-location-section">
// // //                         <span className="location-icon">📍</span>
// // //                         <span className="location-text">{report.location_address}</span>
// // //                       </div>

// // //                       {/* Show volunteer info even for declined tasks */}
// // //                       <div className="reports-volunteer-section">
// // //                         {report.volunteer_name ? (
// // //                           <div className="reports-assigned-ranger">
// // //                             <div className={`ranger-avatar ${isDeclined ? 'declined' : ''}`}>
// // //                               {report.volunteer_name.charAt(0).toUpperCase()}
// // //                             </div>
// // //                             <div className="ranger-info">
// // //                               <span className="ranger-name">{report.volunteer_name}</span>
// // //                               <span className="ranger-role">
// // //                                 {isDeclined ? 'Declined' : 'Ranger'}
// // //                               </span>
// // //                               {isDeclined && report.declined_reason && (
// // //                                 <span className="ranger-declined-reason">
// // //                                   Reason: {report.declined_reason.length > 30 
// // //                                     ? `${report.declined_reason.substring(0, 30)}...` 
// // //                                     : report.declined_reason}
// // //                                 </span>
// // //                               )}
// // //                             </div>
// // //                           </div>
// // //                         ) : (
// // //                           <div className="reports-no-ranger">
// // //                             <span>No ranger assigned</span>
// // //                           </div>
// // //                         )}
// // //                       </div>
// // //                     </div>

// // //                     <div className="reports-card-footer">
// // //                       <button 
// // //                         onClick={() => {
// // //                           setSelectedReport(report);
// // //                           setIsModalOpen(true);
// // //                         }}
// // //                         className="reports-btn view"
// // //                       >
// // //                         View Mission Details
// // //                       </button>
// // //                     </div>
// // //                   </div>
// // //                 );
// // //               })}
// // //             </div>

// // //             {/* Pagination */}
// // //             {totalPages > 1 && (
// // //               <div className="reports-pagination">
// // //                 <button 
// // //                   onClick={prevPage} 
// // //                   disabled={currentPage === 1}
// // //                   className="reports-pagination-btn"
// // //                 >
// // //                   ← Prev
// // //                 </button>

// // //                 <div className="reports-pagination-numbers">
// // //                   {getPageNumbers().map((pageNum) => (
// // //                     <button
// // //                       key={pageNum}
// // //                       onClick={() => paginate(pageNum)}
// // //                       className={`reports-pagination-number ${currentPage === pageNum ? 'active' : ''}`}
// // //                     >
// // //                       {pageNum}
// // //                     </button>
// // //                   ))}
// // //                 </div>

// // //                 <button 
// // //                   onClick={nextPage} 
// // //                   disabled={currentPage === totalPages}
// // //                   className="reports-pagination-btn"
// // //                 >
// // //                   Next →
// // //                 </button>
// // //               </div>
// // //             )}
// // //           </>
// // //         )}
// // //       </div>

// // //       {/* Report Detail Modal */}
// // //       <ReportDetailModal 
// // //         report={selectedReport} 
// // //         isOpen={isModalOpen} 
// // //         onClose={() => {
// // //           setIsModalOpen(false);
// // //           setSelectedReport(null);
// // //         }}
// // //         onAssignClick={() => {
// // //           setIsModalOpen(false);
// // //           setIsVolunteerModalOpen(true);
// // //         }}
// // //         onUnassign={unassignVolunteer}
// // //         getAnimalEmoji={getAnimalEmoji}
// // //         formatDate={formatDate}
// // //         getStatusName={getStatusName}
// // //         showMessage={showMessage}
// // //       />

// // //       {/* Volunteer Selection Modal */}
// // //       <VolunteerSelectModal
// // //         report={selectedReport}
// // //         isOpen={isVolunteerModalOpen}
// // //         onClose={() => {
// // //           setIsVolunteerModalOpen(false);
// // //           setIsModalOpen(true);
// // //         }}
// // //         onSelect={(volunteer) => {
// // //           if (selectedReport) {
// // //             assignVolunteer(selectedReport.report_id, volunteer.user_id, volunteer.username);
// // //           }
// // //         }}
// // //         volunteers={volunteers}
// // //         loadingVolunteers={loadingVolunteers}
// // //         getAnimalEmoji={getAnimalEmoji}
// // //         formatVolunteerDate={formatVolunteerDate}
// // //       />
// // //     </div>
// // //   );
// // // };

// // // export default RescueReports;

// // import React, { useEffect, useState, useCallback } from 'react';
// // import './RescueReports.css';

// // interface TaskProof {
// //   proof_id: number;
// //   task_id: number;
// //   proof_url: string;
// //   uploaded_at: string;
// // }

// // interface CompletionNote {
// //   note_id: number;
// //   task_id: number;
// //   volunteer_id: number;
// //   note_text: string;
// //   created_at: string;
// //   volunteer_name?: string;
// // }

// // interface RescueReport {
// //   report_id: number;
// //   user_id: number;
// //   username: string;
// //   email: string;
// //   phone: string;
// //   description: string;
// //   location_address: string;
// //   user_note?: string;
// //   admin_note?: string;
// //   submitted_at: string;
// //   updated_at?: string;
// //   animal_type: string;
// //   animal_condition: string;
// //   status_id: number;
// //   status_name?: string;
// //   volunteer_name?: string;
// //   volunteer_id?: number;
// //   volunteer_email?: string;
// //   volunteer_phone?: string;
// //   declined_reason?: string;
// //   volunteer_responded_at?: string;
// //   volunteer_response?: string;
// //   task_id?: number;
// //   task_status?: string;
// // }

// // interface Volunteer {
// //   user_id: number;
// //   username: string;
// //   email: string;
// //   phone: string;
// //   bio?: string;
// //   joined_at: string;
// //   approval_status: string;
// //   approval_status_id: number;
// //   availability_status: string;
// //   availability_status_id: number;
// //   assigned_reports_count: number;
// //   role_id: number;
// //   created_at: string;
// //   has_car: number;
// //   can_foster: number;
// //   animal_handling: string;
// //   city: string;
// //   badges?: string;
// // }

// // interface AvailabilityStatus {
// //   status_id: number;
// //   status_name: string;
// // }

// // // Helper function for image URLs
// // const getFullImageUrl = (proofUrl: string): string => {
// //   if (!proofUrl) return '';

// //   if (proofUrl.startsWith('http://') || proofUrl.startsWith('https://')) {
// //     return proofUrl;
// //   }

// //   const baseUrl = 'http://localhost:5000';
// //   let cleanUrl = proofUrl.replace(/^\/+/, '');

// //   if (cleanUrl.startsWith('uploads/')) {
// //     return `${baseUrl}/${cleanUrl}`;
// //   }

// //   return `${baseUrl}/uploads/${cleanUrl}`;
// // };

// // // Volunteer Selection Modal Component
// // const VolunteerSelectModal: React.FC<{
// //   report: RescueReport | null;
// //   isOpen: boolean;
// //   onClose: () => void;
// //   onSelect: (volunteer: Volunteer) => void;
// //   volunteers: Volunteer[];
// //   loadingVolunteers: boolean;
// //   getAnimalEmoji: (type: string) => string;
// //   formatVolunteerDate: (date: string) => string;
// // }> = ({ 
// //   report, 
// //   isOpen, 
// //   onClose, 
// //   onSelect, 
// //   volunteers, 
// //   loadingVolunteers, 
// //   getAnimalEmoji,
// //   formatVolunteerDate 
// // }) => {
// //   if (!isOpen || !report) return null;

// //   const availableVolunteers = volunteers.filter(v => 
// //     v.availability_status_id === 1 || v.availability_status?.toLowerCase() === 'available'
// //   );

// //   const unavailableVolunteers = volunteers.filter(v => 
// //     v.availability_status_id === 2 || v.availability_status?.toLowerCase() === 'unavailable'
// //   );

// //   const getBadgeDisplay = (badges?: string) => {
// //     if (!badges) return null;
// //     try {
// //       if (typeof badges === 'string' && !badges.startsWith('[')) {
// //         return badges.split(',').slice(0, 3).join(', ');
// //       }
// //       const badgeList = JSON.parse(badges);
// //       if (Array.isArray(badgeList) && badgeList.length > 0) {
// //         return badgeList.slice(0, 3).join(', ');
// //       }
// //     } catch (e) {
// //       return badges;
// //     }
// //     return null;
// //   };

// //   return (
// //     <div className="reports-modal-overlay" onClick={onClose}>
// //       <div className="reports-modal-content" onClick={e => e.stopPropagation()}>
// //         <div className="reports-modal-header dark">
// //           <div>
// //             <h3>Assign Ranger</h3>
// //             <p className="reports-modal-subtitle">Report #{report.report_id}</p>
// //           </div>
// //           <button className="reports-modal-close" onClick={onClose}>×</button>
// //         </div>

// //         <div className="reports-modal-body">
// //           <div className="reports-summary-card">
// //             <div className="reports-summary-item">
// //               <span className="reports-summary-label">Animal</span>
// //               <span className="reports-summary-value">
// //                 {getAnimalEmoji(report.animal_type)} {report.animal_type}
// //               </span>
// //             </div>
// //             <div className="reports-summary-item">
// //               <span className="reports-summary-label">Location</span>
// //               <span className="reports-summary-value location">
// //                 {report.location_address}
// //               </span>
// //             </div>
// //           </div>

// //           <div className="reports-volunteers-container">
// //             <h4>Available Rangers ({availableVolunteers.length})</h4>

// //             {loadingVolunteers ? (
// //               <div className="reports-loading-state">
// //                 <div className="reports-spinner"></div>
// //                 <p>Loading rangers...</p>
// //               </div>
// //             ) : volunteers.length === 0 ? (
// //               <div className="reports-empty-state small">
// //                 <span className="empty-emoji">🕊️</span>
// //                 <p>No rangers found</p>
// //               </div>
// //             ) : (
// //               <div className="reports-volunteers-grid">
// //                 {availableVolunteers.length > 0 && (
// //                   <div className="reports-volunteer-category">
// //                     <div className="reports-category-header">
// //                       <span className="reports-status-dot available"></span>
// //                       <span>Available for Rescue ({availableVolunteers.length})</span>
// //                     </div>
// //                     {availableVolunteers.map(volunteer => (
// //                       <div key={volunteer.user_id} className="reports-volunteer-item">
// //                         <div className="reports-volunteer-avatar-wrapper">
// //                           <div className="reports-volunteer-avatar">
// //                             {volunteer.username.charAt(0).toUpperCase()}
// //                           </div>
// //                           {volunteer.assigned_reports_count > 0 && (
// //                             <span className="reports-badge-count">{volunteer.assigned_reports_count}</span>
// //                           )}
// //                         </div>
// //                         <div className="reports-volunteer-info">
// //                           <div className="reports-volunteer-header">
// //                             <h5>{volunteer.username}</h5>
// //                             <span className="reports-volunteer-status available">Available</span>
// //                           </div>
// //                           <div className="reports-volunteer-contact">
// //                             <span>{volunteer.email}</span>
// //                             {volunteer.phone && <span>{volunteer.phone}</span>}
// //                           </div>

// //                           <div className="reports-volunteer-details">
// //                             <div className="reports-detail-row">
// //                               <span className="reports-detail-label">ID:</span>
// //                               <span className="reports-detail-value">{volunteer.user_id}</span>
// //                             </div>
// //                             <div className="reports-detail-row">
// //                               <span className="reports-detail-label">City:</span>
// //                               <span className="reports-detail-value">{volunteer.city || 'Not specified'}</span>
// //                             </div>
// //                             <div className="reports-detail-row">
// //                               <span className="reports-detail-label">Joined:</span>
// //                               <span className="reports-detail-value">{formatVolunteerDate(volunteer.joined_at)}</span>
// //                             </div>
// //                             <div className="reports-detail-row">
// //                               <span className="reports-detail-label">Has Car:</span>
// //                               <span className="reports-detail-value">{volunteer.has_car === 1 ? 'Yes' : 'No'}</span>
// //                             </div>
// //                             <div className="reports-detail-row">
// //                               <span className="reports-detail-label">Can Foster:</span>
// //                               <span className="reports-detail-value">{volunteer.can_foster === 1 ? 'Yes' : 'No'}</span>
// //                             </div>
// //                             <div className="reports-detail-row">
// //                               <span className="reports-detail-label">Animal Handling:</span>
// //                               <span className="reports-detail-value">{volunteer.animal_handling || 'Not specified'}</span>
// //                             </div>
// //                             {getBadgeDisplay(volunteer.badges) && (
// //                               <div className="reports-detail-row">
// //                                 <span className="reports-detail-label">Badges:</span>
// //                                 <span className="reports-detail-value">{getBadgeDisplay(volunteer.badges)}</span>
// //                               </div>
// //                             )}
// //                           </div>

// //                           <div className="reports-volunteer-meta">
// //                             <span>Joined {formatVolunteerDate(volunteer.joined_at)}</span>
// //                             <span>{volunteer.assigned_reports_count} active rescues</span>
// //                           </div>
// //                         </div>
// //                         <button
// //                           className="reports-btn assign"
// //                           onClick={() => onSelect(volunteer)}
// //                         >
// //                           Assign
// //                         </button>
// //                       </div>
// //                     ))}
// //                   </div>
// //                 )}

// //                 {unavailableVolunteers.length > 0 && (
// //                   <div className="reports-volunteer-category">
// //                     <div className="reports-category-header">
// //                       <span className="reports-status-dot unavailable"></span>
// //                       <span>Unavailable ({unavailableVolunteers.length})</span>
// //                     </div>
// //                     {unavailableVolunteers.map(volunteer => (
// //                       <div key={volunteer.user_id} className="reports-volunteer-item unavailable">
// //                         <div className="reports-volunteer-avatar-wrapper">
// //                           <div className="reports-volunteer-avatar unavailable">
// //                             {volunteer.username.charAt(0).toUpperCase()}
// //                           </div>
// //                         </div>
// //                         <div className="reports-volunteer-info">
// //                           <div className="reports-volunteer-header">
// //                             <h5>{volunteer.username}</h5>
// //                             <span className="reports-volunteer-status unavailable">Unavailable</span>
// //                           </div>
// //                           <div className="reports-volunteer-contact">
// //                             <span>{volunteer.email}</span>
// //                           </div>

// //                           <div className="reports-volunteer-details">
// //                             <div className="reports-detail-row">
// //                               <span className="reports-detail-label">ID:</span>
// //                               <span className="reports-detail-value">{volunteer.user_id}</span>
// //                             </div>
// //                             <div className="reports-detail-row">
// //                               <span className="reports-detail-label">City:</span>
// //                               <span className="reports-detail-value">{volunteer.city || 'Not specified'}</span>
// //                             </div>
// //                             <div className="reports-detail-row">
// //                               <span className="reports-detail-label">Has Car:</span>
// //                               <span className="reports-detail-value">{volunteer.has_car === 1 ? 'Yes' : 'No'}</span>
// //                             </div>
// //                             <div className="reports-detail-row">
// //                               <span className="reports-detail-label">Can Foster:</span>
// //                               <span className="reports-detail-value">{volunteer.can_foster === 1 ? 'Yes' : 'No'}</span>
// //                             </div>
// //                           </div>

// //                           <div className="reports-volunteer-meta">
// //                             <span>Currently unavailable</span>
// //                           </div>
// //                         </div>
// //                         <button
// //                           className="reports-btn assign-disabled"
// //                           disabled
// //                         >
// //                           Unavailable
// //                         </button>
// //                       </div>
// //                     ))}
// //                   </div>
// //                 )}
// //               </div>
// //             )}
// //           </div>
// //         </div>

// //         <div className="reports-modal-footer">
// //           <button className="reports-btn secondary" onClick={onClose}>
// //             Cancel
// //           </button>
// //         </div>
// //       </div>
// //     </div>
// //   );
// // };

// // // Report Detail Modal Component with Evidence and Completion Notes
// // const ReportDetailModal: React.FC<{
// //   report: RescueReport | null;
// //   isOpen: boolean;
// //   onClose: () => void;
// //   onAssignClick: () => void;
// //   onUnassign: (reportId: number) => void;
// //   getAnimalEmoji: (type: string) => string;
// //   formatDate: (date: string) => string;
// //   getStatusName: (statusId: number, statusName?: string) => string;
// //   showMessage: (text: string, type: 'success' | 'error') => void;
// //   evidence?: TaskProof[];
// //   completionNotes?: CompletionNote[];
// // }> = ({ 
// //   report, 
// //   isOpen, 
// //   onClose, 
// //   onAssignClick, 
// //   onUnassign, 
// //   getAnimalEmoji, 
// //   formatDate, 
// //   getStatusName,
// //   showMessage,
// //   evidence = [],
// //   completionNotes = []
// // }) => {
// //   const [localAdminNote, setLocalAdminNote] = useState('');
// //   const [savingNote, setSavingNote] = useState(false);
// //   const [selectedImage, setSelectedImage] = useState<string | null>(null);
// //   const [imageErrors, setImageErrors] = useState<Record<number, boolean>>({});

// //   useEffect(() => {
// //     if (report) {
// //       setLocalAdminNote(report.admin_note || '');
// //     }
// //   }, [report]);

// //   if (!isOpen || !report) return null;

// //   const handleSaveNote = async (e: React.FormEvent) => {
// //     e.preventDefault();

// //     if (!localAdminNote.trim()) {
// //       showMessage('Please enter a note', 'error');
// //       return;
// //     }

// //     try {
// //       const token = localStorage.getItem('token');
// //       if (!token) {
// //         showMessage('Please login first', 'error');
// //         return;
// //       }

// //       setSavingNote(true);

// //       const response = await fetch(`http://localhost:5000/api/reports/${report.report_id}/admin-note`, {
// //         method: 'POST',
// //         headers: {
// //           'Authorization': `Bearer ${token}`,
// //           'Content-Type': 'application/json'
// //         },
// //         body: JSON.stringify({ note: localAdminNote })
// //       });

// //       if (response.ok) {
// //         const data = await response.json();
// //         showMessage('Note saved successfully!', 'success');
// //         report.admin_note = data.data?.admin_note || localAdminNote;
// //       } else {
// //         const errorData = await response.json();
// //         showMessage(errorData.message || 'Failed to save note', 'error');
// //       }
// //     } catch (error: any) {
// //       console.error('Error saving note:', error);
// //       showMessage(error.message || 'Error saving note. Please try again.', 'error');
// //     } finally {
// //       setSavingNote(false);
// //     }
// //   };

// //   const handleImageError = (proofId: number, url: string) => {
// //     console.log(`Image failed to load for proof ID: ${proofId}, URL: ${url}`);
// //     setImageErrors(prev => ({ ...prev, [proofId]: true }));
// //   };

// //   const statusDisplay = getStatusName(report.status_id, report.status_name);
// //   const isDeclined = report.status_id === 5;
// //   const isInProgress = report.status_id === 3;
// //   const isCompleted = report.status_id === 4;

// //   return (
// //     <div className="reports-modal-overlay" onClick={onClose}>
// //       <div className="reports-modal-content large" onClick={e => e.stopPropagation()}>
// //         <div className="reports-modal-header dark">
// //           <div>
// //             <h3>Rescue Report #{report.report_id}</h3>
// //             <div className="reports-modal-subheader">
// //               <span className={`reports-status-badge ${statusDisplay.toLowerCase().replace(' ', '-')}`}>
// //                 {statusDisplay}
// //               </span>
// //               <span className="reports-meta">{formatDate(report.submitted_at)}</span>
// //             </div>
// //           </div>
// //           <button className="reports-modal-close" onClick={onClose}>×</button>
// //         </div>

// //         <div className="reports-modal-body">
// //           <div className="reports-detail-grid">
// //             <div className="reports-detail-column">
// //               {/* Animal Information Card */}
// //               <div className="reports-info-card">
// //                 <div className="reports-card-header beige">
// //                   <h4>🐾 Animal Information</h4>
// //                 </div>
// //                 <div className="reports-card-content">
// //                   <div className="reports-animal-display">
// //                     <div className="reports-animal-icon">
// //                       {getAnimalEmoji(report.animal_type)}
// //                     </div>
// //                     <div className="reports-animal-details">
// //                       <div className="reports-animal-type">{report.animal_type}</div>
// //                       <div className="reports-animal-condition">
// //                         <span className="condition-tag">{report.animal_condition}</span>
// //                       </div>
// //                     </div>
// //                   </div>
// //                 </div>
// //               </div>

// //               {/* Reporter Details Card */}
// //               <div className="reports-info-card">
// //                 <div className="reports-card-header beige">
// //                   <h4>👤 Reporter Details</h4>
// //                 </div>
// //                 <div className="reports-card-content">
// //                   <div className="reports-detail-list">
// //                     <div className="reports-detail-row">
// //                       <span className="reports-detail-label">Name</span>
// //                       <span className="reports-detail-value">{report.username}</span>
// //                     </div>
// //                     <div className="reports-detail-row">
// //                       <span className="reports-detail-label">Email</span>
// //                       <span className="reports-detail-value">{report.email}</span>
// //                     </div>
// //                     <div className="reports-detail-row">
// //                       <span className="reports-detail-label">Phone</span>
// //                       <span className="reports-detail-value">{report.phone}</span>
// //                     </div>
// //                   </div>
// //                 </div>
// //               </div>

// //               {/* Location Card */}
// //               <div className="reports-info-card">
// //                 <div className="reports-card-header beige">
// //                   <h4>📍 Location</h4>
// //                 </div>
// //                 <div className="reports-card-content">
// //                   <div className="reports-location-info">
// //                     <p>{report.location_address}</p>
// //                     <button 
// //                       className="reports-btn map"
// //                       onClick={() => {
// //                         const encodedAddress = encodeURIComponent(report.location_address);
// //                         window.open(`https://maps.google.com/?q=${encodedAddress}`, '_blank');
// //                       }}
// //                     >
// //                       View on Map
// //                     </button>
// //                   </div>
// //                 </div>
// //               </div>
// //             </div>

// //             <div className="reports-detail-column">
// //               {/* Volunteer Assignment Card */}
// //               <div className="reports-info-card">
// //                 <div className="reports-card-header beige">
// //                   <div className="reports-header-row">
// //                     <h4>🦸 Ranger Assignment</h4>
// //                     {!report.volunteer_name && !isDeclined && !isInProgress && !isCompleted && (
// //                       <button 
// //                         className="reports-btn primary small"
// //                         onClick={onAssignClick}
// //                       >
// //                         + Assign Ranger
// //                       </button>
// //                     )}
// //                   </div>
// //                 </div>
// //                 <div className="reports-card-content">
// //                   {report.volunteer_name && !isDeclined ? (
// //                     <div className="reports-volunteer-assigned">
// //                       <div className="reports-assigned-volunteer">
// //                         <div className="reports-volunteer-avatar large">
// //                           {report.volunteer_name.charAt(0).toUpperCase()}
// //                         </div>
// //                         <div className="reports-assigned-info">
// //                           <h5>{report.volunteer_name}</h5>
// //                           <div className="reports-assigned-contact">
// //                             {report.volunteer_email && <span>{report.volunteer_email}</span>}
// //                             {report.volunteer_phone && <span>{report.volunteer_phone}</span>}
// //                           </div>
// //                         </div>
// //                       </div>
// //                       {!isInProgress && !isCompleted && (
// //                         <button 
// //                           className="reports-btn unassign"
// //                           onClick={() => onUnassign(report.report_id)}
// //                         >
// //                           Unassign
// //                         </button>
// //                       )}
// //                       {isInProgress && (
// //                         <span className="reports-badge in-progress">In Progress</span>
// //                       )}
// //                       {isCompleted && (
// //                         <span className="reports-badge completed">Completed</span>
// //                       )}
// //                     </div>
// //                   ) : isDeclined ? (
// //                     <div className="reports-declined-container">
// //                       <div className="reports-declined-header">
// //                         <span className="reports-declined-icon">❌</span>
// //                         <div className="reports-declined-title">Mission Declined by Ranger</div>
// //                       </div>

// //                       {report.volunteer_name && (
// //                         <div className="reports-declined-volunteer">
// //                           <div className="reports-volunteer-avatar declined">
// //                             {report.volunteer_name.charAt(0).toUpperCase()}
// //                           </div>
// //                           <div className="reports-declined-volunteer-info">
// //                             <div className="reports-declined-volunteer-name">{report.volunteer_name}</div>
// //                             <div className="reports-declined-volunteer-contact">
// //                               {report.volunteer_email && <span>{report.volunteer_email}</span>}
// //                               {report.volunteer_phone && <span>{report.volunteer_phone}</span>}
// //                             </div>
// //                             {report.volunteer_responded_at && (
// //                               <div className="reports-declined-time">
// //                                 Declined on {formatDate(report.volunteer_responded_at)}
// //                               </div>
// //                             )}
// //                           </div>
// //                         </div>
// //                       )}

// //                       {report.declined_reason ? (
// //                         <div className="reports-declined-reason">
// //                           <div className="reports-declined-reason-label">Declined Reason:</div>
// //                           <div className="reports-declined-reason-text">"{report.declined_reason}"</div>
// //                         </div>
// //                       ) : (
// //                         <div className="reports-declined-reason empty">
// //                           <em>No reason provided</em>
// //                         </div>
// //                       )}

// //                       <button 
// //                         className="reports-btn primary"
// //                         onClick={onAssignClick}
// //                       >
// //                         + Assign New Ranger
// //                       </button>
// //                     </div>
// //                   ) : (
// //                     <div className="reports-no-volunteer">
// //                       <span className="no-volunteer-emoji">🕊️</span>
// //                       <p>No ranger assigned yet</p>
// //                       <button 
// //                         className="reports-btn text"
// //                         onClick={onAssignClick}
// //                       >
// //                         Click to assign a ranger
// //                       </button>
// //                     </div>
// //                   )}
// //                 </div>
// //               </div>

// //               {/* Evidence Photos Section */}
// //               {report.task_id && evidence && evidence.length > 0 && (
// //                 <div className="reports-info-card">
// //                   <div className="reports-card-header beige">
// //                     <h4>📸 Evidence Photos</h4>
// //                   </div>
// //                   <div className="reports-card-content">
// //                     <p style={{ marginBottom: '10px', color: '#2D5A27', fontWeight: '600' }}>
// //                       {evidence.length} photo(s) uploaded
// //                     </p>
// //                     <div className="evidence-grid">
// //                       {evidence.map((proof) => {
// //                         const imageUrl = getFullImageUrl(proof.proof_url);
// //                         const hasError = imageErrors[proof.proof_id];

// //                         return (
// //                           <div 
// //                             key={proof.proof_id} 
// //                             className="evidence-item"
// //                             onClick={() => !hasError && setSelectedImage(imageUrl)}
// //                           >
// //                             {!hasError ? (
// //                               <img 
// //                                 src={imageUrl} 
// //                                 alt={`Evidence ${proof.proof_id}`}
// //                                 className="evidence-image"
// //                                 onError={() => handleImageError(proof.proof_id, imageUrl)}
// //                               />
// //                             ) : (
// //                               <div className="evidence-image-placeholder">
// //                                 <span style={{ fontSize: '2rem', marginBottom: '5px' }}>📷</span>
// //                                 <span>Image unavailable</span>
// //                               </div>
// //                             )}
// //                             <p className="evidence-date">
// //                               Uploaded: {formatDate(proof.uploaded_at)}
// //                             </p>
// //                           </div>
// //                         );
// //                       })}
// //                     </div>
// //                   </div>
// //                 </div>
// //               )}

// //               {/* Completion Notes Section */}
// //               {report.task_id && completionNotes && completionNotes.length > 0 && (
// //                 <div className="reports-info-card">
// //                   <div className="reports-card-header beige">
// //                     <h4>✅ Completion Notes</h4>
// //                   </div>
// //                   <div className="reports-card-content">
// //                     <div className="completion-notes-container">
// //                       {completionNotes.map((note) => (
// //                         <div key={note.note_id} className="completion-note-item">
// //                           <div className="completion-note-header">
// //                             <span className="completion-note-author">
// //                               {note.volunteer_name || 'Volunteer'}
// //                             </span>
// //                             <span className="completion-note-time">
// //                               {formatDate(note.created_at)}
// //                             </span>
// //                           </div>
// //                           <p className="completion-note-text">
// //                             {note.note_text}
// //                           </p>
// //                         </div>
// //                       ))}
// //                     </div>
// //                   </div>
// //                 </div>
// //               )}

// //               {/* Report Description Card */}
// //               <div className="reports-info-card">
// //                 <div className="reports-card-header beige">
// //                   <h4>📝 Report Description</h4>
// //                 </div>
// //                 <div className="reports-card-content">
// //                   <div className="reports-description">
// //                     <p>{report.description}</p>
// //                   </div>
// //                   {report.user_note && (
// //                     <div className="reports-user-note">
// //                       <div className="note-label">Reporter's Note:</div>
// //                       <p>{report.user_note}</p>
// //                     </div>
// //                   )}
// //                 </div>
// //               </div>

// //               {/* Admin Notes Card */}
// //               <div className="reports-info-card">
// //                 <div className="reports-card-header beige">
// //                   <h4>📌 Admin Notes</h4>
// //                 </div>
// //                 <div className="reports-card-content">
// //                   <form onSubmit={handleSaveNote} className="reports-notes-form">
// //                     <textarea
// //                       className="reports-notes-input"
// //                       placeholder={
// //                         isInProgress 
// //                           ? "Notes disabled - mission is in progress" 
// //                           : isCompleted 
// //                             ? "Notes disabled - mission is completed" 
// //                             : "Add internal notes about this rescue mission..."
// //                       }
// //                       value={localAdminNote}
// //                       onChange={(e) => setLocalAdminNote(e.target.value)}
// //                       rows={3}
// //                       disabled={isInProgress || isCompleted}
// //                     />
// //                     <div className="reports-notes-actions">
// //                       <button
// //                         type="submit"
// //                         className="reports-btn save"
// //                         disabled={savingNote || !localAdminNote.trim() || isInProgress || isCompleted}
// //                       >
// //                         {savingNote ? 'Saving...' : 'Save Note'}
// //                       </button>
// //                       {(isInProgress || isCompleted) && (
// //                         <span className="reports-note-disabled-hint">
// //                           {isCompleted 
// //                             ? 'Notes disabled - mission completed' 
// //                             : 'Notes disabled - mission in progress'}
// //                         </span>
// //                       )}
// //                     </div>
// //                   </form>
// //                 </div>
// //               </div>
// //             </div>
// //           </div>

// //           {/* Image Lightbox */}
// //           {selectedImage && (
// //             <div 
// //               className="image-lightbox" 
// //               onClick={() => setSelectedImage(null)}
// //             >
// //               <img 
// //                 src={selectedImage} 
// //                 alt="Enlarged evidence" 
// //               />
// //               <button 
// //                 className="lightbox-close"
// //                 onClick={() => setSelectedImage(null)}
// //               >
// //                 ×
// //               </button>
// //             </div>
// //           )}
// //         </div>

// //         <div className="reports-modal-footer">
// //           <button className="reports-btn secondary" onClick={onClose}>
// //             Close
// //           </button>
// //         </div>
// //       </div>
// //     </div>
// //   );
// // };

// // const RescueReports: React.FC = () => {
// //   const [reports, setReports] = useState<RescueReport[]>([]);
// //   const [volunteers, setVolunteers] = useState<Volunteer[]>([]);
// //   const [availabilityStatuses, setAvailabilityStatuses] = useState<AvailabilityStatus[]>([]);
// //   const [loading, setLoading] = useState(true);
// //   const [loadingVolunteers, setLoadingVolunteers] = useState(false);
// //   const [filterStatus, setFilterStatus] = useState<string>('all');
// //   const [sortBy, setSortBy] = useState<string>('recent');
// //   const [searchQuery, setSearchQuery] = useState<string>('');
// //   const [selectedReport, setSelectedReport] = useState<RescueReport | null>(null);
// //   const [isModalOpen, setIsModalOpen] = useState(false);
// //   const [isVolunteerModalOpen, setIsVolunteerModalOpen] = useState(false);
// //   const [showSuccessMessage, setShowSuccessMessage] = useState(false);
// //   const [showErrorMessage, setShowErrorMessage] = useState(false);
// //   const [message, setMessage] = useState('');

// //   // New state for evidence and completion notes
// //   const [taskEvidence, setTaskEvidence] = useState<{[key: number]: TaskProof[]}>({});
// //   const [taskCompletionNotes, setTaskCompletionNotes] = useState<{[key: number]: CompletionNote[]}>({});

// //   // Pagination state
// //   const [currentPage, setCurrentPage] = useState(1);
// //   const [itemsPerPage] = useState(9);

// //   // Fetch status list from database
// //   const fetchStatusList = useCallback(async () => {
// //     try {
// //       const token = localStorage.getItem('token');
// //       if (!token) return;

// //       const response = await fetch('http://localhost:5000/api/reports/status/list', {
// //         headers: {
// //           'Authorization': `Bearer ${token}`,
// //           'Content-Type': 'application/json'
// //         }
// //       });

// //       if (response.ok) {
// //         const data = await response.json();
// //         if (data.success) {
// //           setAvailabilityStatuses(data.data || []);
// //         }
// //       }
// //     } catch (error) {
// //       console.error('Error fetching status list:', error);
// //     }
// //   }, []);

// //   // Fetch task evidence
// //   const fetchTaskEvidence = async (taskId: number) => {
// //     try {
// //       const token = localStorage.getItem('token');
// //       const response = await fetch(
// //         `http://localhost:5000/api/tasks/${taskId}/evidence`,
// //         {
// //           headers: { 'Authorization': `Bearer ${token}` }
// //         }
// //       );
// //       const data = await response.json();
// //       if (data.success) {
// //         setTaskEvidence(prev => ({ ...prev, [taskId]: data.data }));
// //       }
// //     } catch (error) {
// //       console.error('Error fetching evidence:', error);
// //     }
// //   };

// //   // Fetch task completion notes
// //   const fetchTaskCompletionNotes = async (taskId: number) => {
// //     try {
// //       const token = localStorage.getItem('token');
// //       const response = await fetch(
// //         `http://localhost:5000/api/tasks/${taskId}/completion-notes`,
// //         {
// //           headers: { 'Authorization': `Bearer ${token}` }
// //         }
// //       );
// //       const data = await response.json();
// //       if (data.success) {
// //         setTaskCompletionNotes(prev => ({ ...prev, [taskId]: data.data }));
// //       }
// //     } catch (error) {
// //       console.error('Error fetching completion notes:', error);
// //     }
// //   };

// //   const getStatusName = (statusId: number, statusName?: string): string => {
// //     if (statusName) {
// //       return statusName
// //         .split('_')
// //         .map(word => word.charAt(0).toUpperCase() + word.slice(1))
// //         .join(' ');
// //     }

// //     const statusMap: { [key: number]: string } = {
// //       1: 'Submitted',
// //       2: 'Assigned',
// //       3: 'In Progress',
// //       4: 'Completed',
// //       5: 'Declined'
// //     };
// //     return statusMap[statusId] || 'Unknown';
// //   };

// //   const showMessage = (text: string, type: 'success' | 'error') => {
// //     setMessage(text);
// //     if (type === 'success') {
// //       setShowSuccessMessage(true);
// //     } else {
// //       setShowErrorMessage(true);
// //     }
// //     setTimeout(() => {
// //       setShowSuccessMessage(false);
// //       setShowErrorMessage(false);
// //       setMessage('');
// //     }, 3000);
// //   };

// //   const fetchReports = useCallback(async () => {
// //     try {
// //       setLoading(true);

// //       const token = localStorage.getItem('token');
// //       if (!token) {
// //         showMessage('Please login first', 'error');
// //         setLoading(false);
// //         return;
// //       }

// //       const response = await fetch('http://localhost:5000/api/reports/admin/all', {
// //         headers: {
// //           'Authorization': `Bearer ${token}`,
// //           'Content-Type': 'application/json'
// //         }
// //       });

// //       if (response.ok) {
// //         const data = await response.json();

// //         if (data.success) {
// //           const reportsData = data.data || [];

// //           const mappedReports: RescueReport[] = reportsData.map((report: any) => {
// //             const mappedReport: RescueReport = {
// //               report_id: report.report_id,
// //               user_id: report.user_id,
// //               username: report.reporter_name || 'Anonymous',
// //               email: report.email || 'No email',
// //               phone: report.reporter_phone || 'No phone',
// //               description: report.description,
// //               location_address: report.location_address,
// //               user_note: report.user_note,
// //               admin_note: report.admin_note,
// //               submitted_at: report.submitted_at,
// //               animal_type: report.animal_type || 'Unknown',
// //               animal_condition: report.animal_condition || 'Unknown',
// //               status_id: report.status_id || 1,
// //               status_name: report.status_name,
// //               volunteer_id: report.volunteer_id,
// //               volunteer_name: report.volunteer_name,
// //               volunteer_email: report.volunteer_email,
// //               volunteer_phone: report.volunteer_phone,
// //               task_id: report.task_id,
// //               task_status: report.task_status,
// //               declined_reason: report.declined_reason,
// //               volunteer_responded_at: report.volunteer_responded_at,
// //               volunteer_response: report.volunteer_response
// //             };

// //             if (report.status_id === 5) {
// //               console.log(`Report #${report.report_id}:`, {
// //                 volunteer: report.volunteer_name,
// //                 reason: report.declined_reason,
// //                 responded_at: report.volunteer_responded_at
// //               });
// //             }

// //             return mappedReport;
// //           });

// //           setReports(mappedReports);
// //           setCurrentPage(1);

// //         } else {
// //           showMessage(data.message || 'Failed to load reports', 'error');
// //         }
// //       } else {
// //         showMessage('Failed to fetch reports', 'error');
// //       }
// //     } catch (error: any) {
// //       console.error('Network error fetching reports:', error);
// //       showMessage('Error loading reports. Please check your connection.', 'error');
// //     } finally {
// //       setLoading(false);
// //     }
// //   }, []);

// //   const fetchVolunteers = useCallback(async () => {
// //     try {
// //       setLoadingVolunteers(true);

// //       const token = localStorage.getItem('token');
// //       if (!token) {
// //         setVolunteers([]);
// //         setLoadingVolunteers(false);
// //         return;
// //       }

// //       const response = await fetch('http://localhost:5000/api/volunteers/available', {
// //         headers: {
// //           'Authorization': `Bearer ${token}`,
// //           'Content-Type': 'application/json'
// //         }
// //       });

// //       if (response.ok) {
// //         const data = await response.json();

// //         if (data.success) {
// //           const volunteersData = data.data || [];

// //           const mappedVolunteers: Volunteer[] = volunteersData.map((volunteer: any) => ({
// //             user_id: volunteer.user_id,
// //             username: volunteer.username,
// //             email: volunteer.email,
// //             phone: volunteer.phone || 'Not provided',
// //             bio: volunteer.bio,
// //             joined_at: volunteer.joined_at || volunteer.created_at,
// //             approval_status: volunteer.approval_status,
// //             approval_status_id: volunteer.approval_status_id,
// //             availability_status: volunteer.availability_status,
// //             availability_status_id: volunteer.availability_status_id,
// //             assigned_reports_count: volunteer.assigned_reports_count || 0,
// //             role_id: volunteer.role_id,
// //             created_at: volunteer.created_at,
// //             has_car: volunteer.has_car !== undefined ? volunteer.has_car : 0,
// //             can_foster: volunteer.can_foster !== undefined ? volunteer.can_foster : 0,
// //             animal_handling: volunteer.animal_handling || '',
// //             city: volunteer.city || '',
// //             badges: volunteer.badges
// //           }));

// //           setVolunteers(mappedVolunteers);
// //         } else {
// //           console.error('Failed to load volunteers:', data.message);
// //           setVolunteers([]);
// //         }
// //       } else {
// //         console.error('HTTP Error fetching volunteers:', response.status);
// //         setVolunteers([]);
// //       }
// //     } catch (error) {
// //       console.error('Error fetching volunteers:', error);
// //       setVolunteers([]);
// //     } finally {
// //       setLoadingVolunteers(false);
// //     }
// //   }, []);

// //   // Handle view task details with evidence and completion notes
// //   const handleViewTaskDetails = async (report: RescueReport) => {
// //     setSelectedReport(report);
// //     if (report.task_id) {
// //       await Promise.all([
// //         fetchTaskEvidence(report.task_id),
// //         fetchTaskCompletionNotes(report.task_id)
// //       ]);
// //     }
// //     setIsModalOpen(true);
// //   };

// //   useEffect(() => {
// //     fetchStatusList();
// //     fetchReports();
// //     fetchVolunteers();
// //   }, [fetchReports, fetchVolunteers, fetchStatusList]);

// //   const assignVolunteer = async (reportId: number, volunteerId: number, volunteerName: string) => {
// //     try {
// //       const token = localStorage.getItem('token');
// //       if (!token) {
// //         showMessage('Please login first', 'error');
// //         return;
// //       }

// //       const response = await fetch(`http://localhost:5000/api/reports/${reportId}/assign`, {
// //         method: 'POST',
// //         headers: {
// //           'Authorization': `Bearer ${token}`,
// //           'Content-Type': 'application/json'
// //         },
// //         body: JSON.stringify({ 
// //           volunteer_id: volunteerId
// //         })
// //       });

// //       if (response.ok) {
// //         const data = await response.json();

// //         const volunteer = volunteers.find(v => v.user_id === volunteerId);

// //         setReports(prev => prev.map(report => {
// //           if (report.report_id === reportId) {
// //             return {
// //               ...report,
// //               volunteer_id: volunteerId,
// //               volunteer_name: volunteerName,
// //               volunteer_email: volunteer?.email || '',
// //               volunteer_phone: volunteer?.phone || '',
// //               status_id: 2,
// //               status_name: 'assigned',
// //               declined_reason: undefined,
// //               volunteer_responded_at: undefined
// //             };
// //           }
// //           return report;
// //         }));

// //         setVolunteers(prev => prev.map(v => {
// //           if (v.user_id === volunteerId) {
// //             return {
// //               ...v,
// //               assigned_reports_count: (v.assigned_reports_count || 0) + 1
// //             };
// //           }
// //           return v;
// //         }));

// //         showMessage(`Ranger "${volunteerName}" assigned successfully!`, 'success');
// //         setIsVolunteerModalOpen(false);
// //         setSelectedReport(null);
// //         fetchReports();
// //         fetchVolunteers();
// //       } else {
// //         const errorData = await response.json();
// //         showMessage(errorData.message || 'Failed to assign ranger', 'error');
// //       }
// //     } catch (error: any) {
// //       console.error('Error assigning volunteer:', error);
// //       showMessage(error.message || 'Error assigning ranger. Please try again.', 'error');
// //     }
// //   };

// //   const unassignVolunteer = async (reportId: number) => {
// //     if (!window.confirm('Are you sure you want to unassign this ranger? The status will be reset to "Submitted".')) return;

// //     try {
// //       const token = localStorage.getItem('token');
// //       if (!token) {
// //         showMessage('Please login first', 'error');
// //         return;
// //       }

// //       const response = await fetch(`http://localhost:5000/api/reports/${reportId}/unassign`, {
// //         method: 'PUT',
// //         headers: {
// //           'Authorization': `Bearer ${token}`,
// //           'Content-Type': 'application/json'
// //         }
// //       });

// //       if (response.ok) {
// //         const report = reports.find(r => r.report_id === reportId);
// //         const volunteerId = report?.volunteer_id;

// //         setReports(prev => prev.map(report => {
// //           if (report.report_id === reportId) {
// //             return {
// //               ...report,
// //               volunteer_id: undefined,
// //               volunteer_name: undefined,
// //               volunteer_email: undefined,
// //               volunteer_phone: undefined,
// //               status_id: 1,
// //               status_name: 'submitted',
// //               declined_reason: undefined,
// //               volunteer_responded_at: undefined
// //             };
// //           }
// //           return report;
// //         }));

// //         if (volunteerId) {
// //           setVolunteers(prev => prev.map(v => {
// //             if (v.user_id === volunteerId) {
// //               return {
// //                 ...v,
// //                 assigned_reports_count: Math.max(0, (v.assigned_reports_count || 0) - 1)
// //               };
// //             }
// //             return v;
// //           }));
// //         }

// //         showMessage('Ranger unassigned successfully!', 'success');
// //         fetchReports();
// //         fetchVolunteers();
// //       } else {
// //         const errorData = await response.json();
// //         showMessage(errorData.message || 'Failed to unassign ranger', 'error');
// //       }
// //     } catch (error: any) {
// //       console.error('Error unassigning volunteer:', error);
// //       showMessage(error.message || 'Error unassigning ranger. Please try again.', 'error');
// //     }
// //   };

// //   const getAnimalEmoji = (animalType: string): string => {
// //     const type = animalType?.toLowerCase() || '';
// //     if (type.includes('dog')) return '🐶';
// //     if (type.includes('cat')) return '🐱';
// //     if (type.includes('bird')) return '🐦';
// //     if (type.includes('rabbit')) return '🐰';
// //     if (type.includes('hamster')) return '🐹';
// //     if (type.includes('turtle')) return '🐢';
// //     if (type.includes('snake')) return '🐍';
// //     if (type.includes('fish')) return '🐟';
// //     if (type.includes('horse')) return '🐴';
// //     if (type.includes('cow')) return '🐮';
// //     if (type.includes('goat')) return '🐐';
// //     if (type.includes('sheep')) return '🐑';
// //     return '🐾';
// //   };

// //   const formatDate = (dateString: string): string => {
// //     try {
// //       const date = new Date(dateString);
// //       return date.toLocaleDateString('en-US', {
// //         month: 'short',
// //         day: 'numeric',
// //         year: 'numeric',
// //         hour: '2-digit',
// //         minute: '2-digit'
// //       });
// //     } catch (error) {
// //       return 'Invalid date';
// //     }
// //   };

// //   const formatVolunteerDate = (dateString: string): string => {
// //     try {
// //       const date = new Date(dateString);
// //       return date.toLocaleDateString('en-US', {
// //         year: 'numeric',
// //         month: 'short',
// //         day: 'numeric'
// //       });
// //     } catch (error) {
// //       return 'Invalid date';
// //     }
// //   };

// //   const filteredReports = reports
// //     .filter(report => {
// //       if (filterStatus !== 'all') {
// //         const statusMap: { [key: string]: number } = {
// //           'submitted': 1,
// //           'assigned': 2,
// //           'in-progress': 3,
// //           'completed': 4,
// //           'declined': 5
// //         };
// //         if (report.status_id !== statusMap[filterStatus]) return false;
// //       }

// //       if (searchQuery) {
// //         const query = searchQuery.toLowerCase();
// //         return (
// //           report.username?.toLowerCase().includes(query) ||
// //           report.animal_type?.toLowerCase().includes(query) ||
// //           report.location_address?.toLowerCase().includes(query) ||
// //           report.description?.toLowerCase().includes(query) ||
// //           report.report_id.toString().includes(query) ||
// //           report.volunteer_name?.toLowerCase().includes(query) ||
// //           report.phone?.toLowerCase().includes(query) ||
// //           (report.declined_reason?.toLowerCase().includes(query) ?? false)
// //         );
// //       }

// //       return true;
// //     })
// //     .sort((a, b) => {
// //       switch(sortBy) {
// //         case 'recent':
// //           return new Date(b.submitted_at).getTime() - new Date(a.submitted_at).getTime();
// //         case 'oldest':
// //           return new Date(a.submitted_at).getTime() - new Date(b.submitted_at).getTime();
// //         case 'critical':
// //           const getCriticalScore = (condition: string) => {
// //             const cond = condition?.toLowerCase() || '';
// //             if (cond.includes('critical')) return 0;
// //             if (cond.includes('severe')) return 1;
// //             if (cond.includes('urgent')) return 2;
// //             return 3;
// //           };
// //           return getCriticalScore(a.animal_condition) - getCriticalScore(b.animal_condition);
// //         case 'status':
// //           return a.status_id - b.status_id;
// //         default:
// //           return 0;
// //       }
// //     });

// //   // Pagination logic
// //   const indexOfLastItem = currentPage * itemsPerPage;
// //   const indexOfFirstItem = indexOfLastItem - itemsPerPage;
// //   const currentItems = filteredReports.slice(indexOfFirstItem, indexOfLastItem);
// //   const totalPages = Math.ceil(filteredReports.length / itemsPerPage);

// //   const paginate = (pageNumber: number) => setCurrentPage(pageNumber);
// //   const nextPage = () => setCurrentPage(prev => Math.min(prev + 1, totalPages));
// //   const prevPage = () => setCurrentPage(prev => Math.max(prev - 1, 1));

// //   const getPageNumbers = (): number[] => {
// //     const pageNumbers: number[] = [];
// //     const maxVisible = 5;

// //     if (totalPages <= maxVisible) {
// //       for (let i = 1; i <= totalPages; i++) {
// //         pageNumbers.push(i);
// //       }
// //     } else {
// //       if (currentPage <= 3) {
// //         for (let i = 1; i <= 5; i++) {
// //           pageNumbers.push(i);
// //         }
// //       } else if (currentPage >= totalPages - 2) {
// //         for (let i = totalPages - 4; i <= totalPages; i++) {
// //           pageNumbers.push(i);
// //         }
// //       } else {
// //         for (let i = currentPage - 2; i <= currentPage + 2; i++) {
// //           pageNumbers.push(i);
// //         }
// //       }
// //     }

// //     return pageNumbers;
// //   };

// //   if (loading) {
// //     return (
// //       <div className="reports-loading-container">
// //         <div className="reports-loader">
// //           <div className="reports-spinner"></div>
// //           <p className="reports-loader-text">Loading rescue missions...</p>
// //         </div>
// //       </div>
// //     );
// //   }

// //   return (
// //     <div className="reports-container">
// //       {/* Success/Error Messages */}
// //       {showSuccessMessage && (
// //         <div className="reports-notification success">
// //           <span className="notification-icon">✓</span>
// //           <span>{message}</span>
// //         </div>
// //       )}
// //       {showErrorMessage && (
// //         <div className="reports-notification error">
// //           <span className="notification-icon">⚠</span>
// //           <span>{message}</span>
// //         </div>
// //       )}

// //       {/* Header */}
// //       <div className="reports-header">
// //         <div className="reports-header-content">
// //           <h1 className="reports-title">Rescue Operations</h1>
// //           <p className="reports-subtitle">
// //             Manage and coordinate animal rescue missions with our ranger team
// //           </p>
// //         </div>
// //         <div className="reports-header-actions">
// //           <button onClick={fetchReports} className="reports-btn refresh">
// //             <span className="btn-icon">↻</span>
// //             Refresh
// //           </button>
// //         </div>
// //       </div>

// //       {/* Filters */}
// //       <div className="reports-filters-card">
// //         <div className="reports-search-wrapper">
// //           {/* <span className="search-icon">🔍</span> */}
// //           <input
// //             type="text"
// //             placeholder="Search by ID, animal, location, ranger, declined reason..."
// //             value={searchQuery}
// //             onChange={(e) => setSearchQuery(e.target.value)}
// //             className="reports-search-input"
// //           />
// //           {searchQuery && (
// //             <button 
// //               className="reports-clear-search"
// //               onClick={() => setSearchQuery('')}
// //             >
// //               ×
// //             </button>
// //           )}
// //         </div>

// //         <div className="reports-filters-row">
// //           <div className="reports-filter-group">
// //             <label className="reports-filter-label">Status</label>
// //             <select 
// //               value={filterStatus} 
// //               onChange={(e) => setFilterStatus(e.target.value)}
// //               className="reports-filter-select"
// //             >
// //               <option value="all">All Status</option>
// //               <option value="submitted">Submitted</option>
// //               <option value="assigned">Assigned</option>
// //               <option value="in-progress">In Progress</option>
// //               <option value="completed">Completed</option>
// //               <option value="declined">Declined</option>
// //             </select>
// //           </div>

// //           <div className="reports-filter-group">
// //             <label className="reports-filter-label">Sort By</label>
// //             <select 
// //               value={sortBy} 
// //               onChange={(e) => setSortBy(e.target.value)}
// //               className="reports-filter-select"
// //             >
// //               <option value="recent">Most Recent</option>
// //               <option value="oldest">Oldest</option>
// //               <option value="critical">Critical First</option>
// //               <option value="status">By Status</option>
// //             </select>
// //           </div>

// //           <div className="reports-stats-badge">
// //             {filteredReports.length} of {reports.length} missions
// //           </div>
// //         </div>
// //       </div>

// //       {/* Reports Grid/Cards - 3 per row */}
// //       <div className="reports-content">
// //         {filteredReports.length === 0 ? (
// //           <div className="reports-empty-state">
// //             <span className="empty-state-emoji">🕊️</span>
// //             <h3>No Rescue Missions Found</h3>
// //             <p>
// //               {searchQuery 
// //                 ? `No missions matching "${searchQuery}"` 
// //                 : filterStatus !== 'all'
// //                 ? `No missions with status "${filterStatus}"`
// //                 : 'No rescue missions have been reported yet.'}
// //             </p>
// //             {(searchQuery || filterStatus !== 'all') && (
// //               <button 
// //                 onClick={() => {
// //                   setSearchQuery('');
// //                   setFilterStatus('all');
// //                   setCurrentPage(1);
// //                 }}
// //                 className="reports-btn outline"
// //               >
// //                 Clear Filters
// //               </button>
// //             )}
// //           </div>
// //         ) : (
// //           <>
// //             <div className="reports-grid">
// //               {currentItems.map(report => {
// //                 const isDeclined = report.status_id === 5;
// //                 const statusDisplay = getStatusName(report.status_id, report.status_name);
// //                 const hasEvidence = report.task_id && taskEvidence[report.task_id]?.length > 0;

// //                 return (
// //                   <div key={report.report_id} className="reports-card">
// //                     <div className="reports-card-header dark">
// //                       <div className="reports-card-title">
// //                         <span className="reports-id">#{report.report_id}</span>
// //                         <span className={`reports-status ${statusDisplay.toLowerCase().replace(' ', '-')}`}>
// //                           {statusDisplay}
// //                         </span>
// //                       </div>
// //                       <div className="reports-date">
// //                         {formatDate(report.submitted_at)}
// //                       </div>
// //                     </div>

// //                     <div className="reports-card-body">
// //                       <div className="reports-animal-section">
// //                         <div className="reports-animal-icon large">
// //                           {getAnimalEmoji(report.animal_type)}
// //                         </div>
// //                         <div className="reports-animal-info">
// //                           <h4>{report.animal_type}</h4>
// //                           <span className="reports-condition">{report.animal_condition}</span>
// //                         </div>
// //                       </div>

// //                       <div className="reports-location-section">
// //                         <span className="location-icon">📍</span>
// //                         <span className="location-text">{report.location_address}</span>
// //                       </div>

// //                       {/* Volunteer info */}
// //                       <div className="reports-volunteer-section">
// //                         {report.volunteer_name ? (
// //                           <div className="reports-assigned-ranger">
// //                             <div className={`ranger-avatar ${isDeclined ? 'declined' : ''}`}>
// //                               {report.volunteer_name.charAt(0).toUpperCase()}
// //                             </div>
// //                             <div className="ranger-info">
// //                               <span className="ranger-name">{report.volunteer_name}</span>
// //                               <span className="ranger-role">
// //                                 {isDeclined ? 'Declined' : 'Ranger'}
// //                               </span>
// //                               {isDeclined && report.declined_reason && (
// //                                 <span className="ranger-declined-reason">
// //                                   Reason: {report.declined_reason.length > 30 
// //                                     ? `${report.declined_reason.substring(0, 30)}...` 
// //                                     : report.declined_reason}
// //                                 </span>
// //                               )}
// //                             </div>
// //                           </div>
// //                         ) : (
// //                           <div className="reports-no-ranger">
// //                             <span>No ranger assigned</span>
// //                           </div>
// //                         )}
// //                       </div>

// //                       {/* Evidence indicator */}
// //                       {hasEvidence && (
// //                         <div className="evidence-indicator">
// //                           <span>📸 Evidence Uploaded</span>
// //                         </div>
// //                       )}
// //                     </div>

// //                     <div className="reports-card-footer">
// //                       <button 
// //                         onClick={() => handleViewTaskDetails(report)}
// //                         className="reports-btn view"
// //                       >
// //                         View Mission Details
// //                       </button>
// //                     </div>
// //                   </div>
// //                 );
// //               })}
// //             </div>

// //             {/* Pagination */}
// //             {totalPages > 1 && (
// //               <div className="reports-pagination">
// //                 <button 
// //                   onClick={prevPage} 
// //                   disabled={currentPage === 1}
// //                   className="reports-pagination-btn"
// //                 >
// //                   ← Prev
// //                 </button>

// //                 <div className="reports-pagination-numbers">
// //                   {getPageNumbers().map((pageNum) => (
// //                     <button
// //                       key={pageNum}
// //                       onClick={() => paginate(pageNum)}
// //                       className={`reports-pagination-number ${currentPage === pageNum ? 'active' : ''}`}
// //                     >
// //                       {pageNum}
// //                     </button>
// //                   ))}
// //                 </div>

// //                 <button 
// //                   onClick={nextPage} 
// //                   disabled={currentPage === totalPages}
// //                   className="reports-pagination-btn"
// //                 >
// //                   Next →
// //                 </button>
// //               </div>
// //             )}
// //           </>
// //         )}
// //       </div>

// //       {/* Report Detail Modal */}
// //       <ReportDetailModal 
// //         report={selectedReport} 
// //         isOpen={isModalOpen} 
// //         onClose={() => {
// //           setIsModalOpen(false);
// //           setSelectedReport(null);
// //         }}
// //         onAssignClick={() => {
// //           setIsModalOpen(false);
// //           setIsVolunteerModalOpen(true);
// //         }}
// //         onUnassign={unassignVolunteer}
// //         getAnimalEmoji={getAnimalEmoji}
// //         formatDate={formatDate}
// //         getStatusName={getStatusName}
// //         showMessage={showMessage}
// //         evidence={selectedReport?.task_id ? taskEvidence[selectedReport.task_id] : []}
// //         completionNotes={selectedReport?.task_id ? taskCompletionNotes[selectedReport.task_id] : []}
// //       />

// //       {/* Volunteer Selection Modal */}
// //       <VolunteerSelectModal
// //         report={selectedReport}
// //         isOpen={isVolunteerModalOpen}
// //         onClose={() => {
// //           setIsVolunteerModalOpen(false);
// //           setIsModalOpen(true);
// //         }}
// //         onSelect={(volunteer) => {
// //           if (selectedReport) {
// //             assignVolunteer(selectedReport.report_id, volunteer.user_id, volunteer.username);
// //           }
// //         }}
// //         volunteers={volunteers}
// //         loadingVolunteers={loadingVolunteers}
// //         getAnimalEmoji={getAnimalEmoji}
// //         formatVolunteerDate={formatVolunteerDate}
// //       />
// //     </div>
// //   );
// // };

// // export default RescueReports;

// import React, { useEffect, useState, useCallback } from 'react';
// import './RescueReports.css';

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
//   status_name?: string;
//   volunteer_name?: string;
//   volunteer_id?: number;
//   volunteer_email?: string;
//   volunteer_phone?: string;
//   declined_reason?: string;
//   volunteer_responded_at?: string;
//   volunteer_response?: string;
//   task_id?: number;
//   task_status?: string;
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
//   has_car: number;
//   can_foster: number;
//   animal_handling: string;
//   city: string;
//   badges?: string;
// }

// interface AvailabilityStatus {
//   status_id: number;
//   status_name: string;
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

// // Volunteer Selection Modal Component
// const VolunteerSelectModal: React.FC<{
//   report: RescueReport | null;
//   isOpen: boolean;
//   onClose: () => void;
//   onSelect: (volunteer: Volunteer) => void;
//   volunteers: Volunteer[];
//   loadingVolunteers: boolean;
//   getAnimalEmoji: (type: string) => string;
//   formatVolunteerDate: (date: string) => string;
// }> = ({
//   report,
//   isOpen,
//   onClose,
//   onSelect,
//   volunteers,
//   loadingVolunteers,
//   getAnimalEmoji,
//   formatVolunteerDate
// }) => {
//     if (!isOpen || !report) return null;

//     const availableVolunteers = volunteers.filter(v =>
//       v.availability_status_id === 1 || v.availability_status?.toLowerCase() === 'available'
//     );

//     const unavailableVolunteers = volunteers.filter(v =>
//       v.availability_status_id === 2 || v.availability_status?.toLowerCase() === 'unavailable'
//     );

//     const getBadgeDisplay = (badges?: string) => {
//       if (!badges) return null;
//       try {
//         if (typeof badges === 'string' && !badges.startsWith('[')) {
//           return badges.split(',').slice(0, 3).join(', ');
//         }
//         const badgeList = JSON.parse(badges);
//         if (Array.isArray(badgeList) && badgeList.length > 0) {
//           return badgeList.slice(0, 3).join(', ');
//         }
//       } catch (e) {
//         return badges;
//       }
//       return null;
//     };

//     return (
//       <div className="reports-modal-overlay" onClick={onClose}>
//         <div className="reports-modal-content" onClick={e => e.stopPropagation()}>
//           <div className="reports-modal-header dark">
//             <div>
//               <h3>Assign Ranger</h3>
//               <p className="reports-modal-subtitle">Report #{report.report_id}</p>
//             </div>
//             <button className="reports-modal-close" onClick={onClose}>×</button>
//           </div>

//           <div className="reports-modal-body">
//             <div className="reports-summary-card">
//               <div className="reports-summary-item">
//                 <span className="reports-summary-label">Animal</span>
//                 <span className="reports-summary-value">
//                   {getAnimalEmoji(report.animal_type)} {report.animal_type}
//                 </span>
//               </div>
//               <div className="reports-summary-item">
//                 <span className="reports-summary-label">Location</span>
//                 <span className="reports-summary-value location">
//                   {report.location_address}
//                 </span>
//               </div>
//             </div>

//             <div className="reports-volunteers-container">
//               <h4>Available Rangers ({availableVolunteers.length})</h4>

//               {loadingVolunteers ? (
//                 <div className="reports-loading-state">
//                   <div className="reports-spinner"></div>
//                   <p>Loading rangers...</p>
//                 </div>
//               ) : volunteers.length === 0 ? (
//                 <div className="reports-empty-state small">
//                   <span className="empty-emoji">🕊️</span>
//                   <p>No rangers found</p>
//                 </div>
//               ) : (
//                 <div className="reports-volunteers-grid">
//                   {availableVolunteers.length > 0 && (
//                     <div className="reports-volunteer-category">
//                       <div className="reports-category-header">
//                         <span className="reports-status-dot available"></span>
//                         <span>Available for Rescue ({availableVolunteers.length})</span>
//                       </div>
//                       {availableVolunteers.map(volunteer => (
//                         <div key={volunteer.user_id} className="reports-volunteer-item">
//                           <div className="reports-volunteer-avatar-wrapper">
//                             <div className="reports-volunteer-avatar">
//                               {volunteer.username.charAt(0).toUpperCase()}
//                             </div>
//                             {volunteer.assigned_reports_count > 0 && (
//                               <span className="reports-badge-count">{volunteer.assigned_reports_count}</span>
//                             )}
//                           </div>
//                           <div className="reports-volunteer-info">
//                             <div className="reports-volunteer-header">
//                               <h5>{volunteer.username}</h5>
//                               <span className="reports-volunteer-status available">Available</span>
//                             </div>
//                             <div className="reports-volunteer-contact">
//                               <span>{volunteer.email}</span>
//                               {volunteer.phone && <span>{volunteer.phone}</span>}
//                             </div>

//                             <div className="reports-volunteer-details">
//                               <div className="reports-detail-row">
//                                 <span className="reports-detail-label">ID:</span>
//                                 <span className="reports-detail-value">{volunteer.user_id}</span>
//                               </div>
//                               <div className="reports-detail-row">
//                                 <span className="reports-detail-label">City:</span>
//                                 <span className="reports-detail-value">{volunteer.city || 'Not specified'}</span>
//                               </div>
//                               <div className="reports-detail-row">
//                                 <span className="reports-detail-label">Joined:</span>
//                                 <span className="reports-detail-value">{formatVolunteerDate(volunteer.joined_at)}</span>
//                               </div>
//                               <div className="reports-detail-row">
//                                 <span className="reports-detail-label">Has Car:</span>
//                                 <span className="reports-detail-value">{volunteer.has_car === 1 ? 'Yes' : 'No'}</span>
//                               </div>
//                               <div className="reports-detail-row">
//                                 <span className="reports-detail-label">Can Foster:</span>
//                                 <span className="reports-detail-value">{volunteer.can_foster === 1 ? 'Yes' : 'No'}</span>
//                               </div>
//                               <div className="reports-detail-row">
//                                 <span className="reports-detail-label">Animal Handling:</span>
//                                 <span className="reports-detail-value">{volunteer.animal_handling || 'Not specified'}</span>
//                               </div>
//                               {getBadgeDisplay(volunteer.badges) && (
//                                 <div className="reports-detail-row">
//                                   <span className="reports-detail-label">Badges:</span>
//                                   <span className="reports-detail-value">{getBadgeDisplay(volunteer.badges)}</span>
//                                 </div>
//                               )}
//                             </div>

//                             <div className="reports-volunteer-meta">
//                               <span>Joined {formatVolunteerDate(volunteer.joined_at)}</span>
//                               <span>{volunteer.assigned_reports_count} active rescues</span>
//                             </div>
//                           </div>
//                           <button
//                             className="reports-btn assign"
//                             onClick={() => onSelect(volunteer)}
//                           >
//                             Assign
//                           </button>
//                         </div>
//                       ))}
//                     </div>
//                   )}

//                   {unavailableVolunteers.length > 0 && (
//                     <div className="reports-volunteer-category">
//                       <div className="reports-category-header">
//                         <span className="reports-status-dot unavailable"></span>
//                         <span>Unavailable ({unavailableVolunteers.length})</span>
//                       </div>
//                       {unavailableVolunteers.map(volunteer => (
//                         <div key={volunteer.user_id} className="reports-volunteer-item unavailable">
//                           <div className="reports-volunteer-avatar-wrapper">
//                             <div className="reports-volunteer-avatar unavailable">
//                               {volunteer.username.charAt(0).toUpperCase()}
//                             </div>
//                           </div>
//                           <div className="reports-volunteer-info">
//                             <div className="reports-volunteer-header">
//                               <h5>{volunteer.username}</h5>
//                               <span className="reports-volunteer-status unavailable">Unavailable</span>
//                             </div>
//                             <div className="reports-volunteer-contact">
//                               <span>{volunteer.email}</span>
//                             </div>

//                             <div className="reports-volunteer-details">
//                               <div className="reports-detail-row">
//                                 <span className="reports-detail-label">ID:</span>
//                                 <span className="reports-detail-value">{volunteer.user_id}</span>
//                               </div>
//                               <div className="reports-detail-row">
//                                 <span className="reports-detail-label">City:</span>
//                                 <span className="reports-detail-value">{volunteer.city || 'Not specified'}</span>
//                               </div>
//                               <div className="reports-detail-row">
//                                 <span className="reports-detail-label">Has Car:</span>
//                                 <span className="reports-detail-value">{volunteer.has_car === 1 ? 'Yes' : 'No'}</span>
//                               </div>
//                               <div className="reports-detail-row">
//                                 <span className="reports-detail-label">Can Foster:</span>
//                                 <span className="reports-detail-value">{volunteer.can_foster === 1 ? 'Yes' : 'No'}</span>
//                               </div>
//                             </div>

//                             <div className="reports-volunteer-meta">
//                               <span>Currently unavailable</span>
//                             </div>
//                           </div>
//                           <button
//                             className="reports-btn assign-disabled"
//                             disabled
//                           >
//                             Unavailable
//                           </button>
//                         </div>
//                       ))}
//                     </div>
//                   )}
//                 </div>
//               )}
//             </div>
//           </div>

//           <div className="reports-modal-footer">
//             <button className="reports-btn secondary" onClick={onClose}>
//               Cancel
//             </button>
//           </div>
//         </div>
//       </div>
//     );
//   };

// // Report Detail Modal Component with Evidence and Completion Notes
// const ReportDetailModal: React.FC<{
//   report: RescueReport | null;
//   isOpen: boolean;
//   onClose: () => void;
//   onAssignClick: () => void;
//   onUnassign: (reportId: number) => void;
//   getAnimalEmoji: (type: string) => string;
//   formatDate: (date: string) => string;
//   getStatusName: (statusId: number, statusName?: string) => string;
//   showMessage: (text: string, type: 'success' | 'error') => void;
//   evidence?: TaskProof[];
//   completionNotes?: CompletionNote[];
// }> = ({
//   report,
//   isOpen,
//   onClose,
//   onAssignClick,
//   onUnassign,
//   getAnimalEmoji,
//   formatDate,
//   getStatusName,
//   showMessage,
//   evidence = [],
//   completionNotes = []
// }) => {
//     const [localAdminNote, setLocalAdminNote] = useState('');
//     const [savingNote, setSavingNote] = useState(false);
//     const [selectedImage, setSelectedImage] = useState<string | null>(null);
//     const [imageErrors, setImageErrors] = useState<Record<number, boolean>>({});

//     useEffect(() => {
//       if (report) {
//         setLocalAdminNote(report.admin_note || '');
//       }
//     }, [report]);

//     if (!isOpen || !report) return null;

//     const handleSaveNote = async (e: React.FormEvent) => {
//       e.preventDefault();

//       if (!localAdminNote.trim()) {
//         showMessage('Please enter a note', 'error');
//         return;
//       }

//       try {
//         const token = localStorage.getItem('token');
//         if (!token) {
//           showMessage('Please login first', 'error');
//           return;
//         }

//         setSavingNote(true);

//         const response = await fetch(`http://localhost:5000/api/reports/${report.report_id}/admin-note`, {
//           method: 'POST',
//           headers: {
//             'Authorization': `Bearer ${token}`,
//             'Content-Type': 'application/json'
//           },
//           body: JSON.stringify({ note: localAdminNote })
//         });

//         if (response.ok) {
//           const data = await response.json();
//           showMessage('Note saved successfully!', 'success');
//           report.admin_note = data.data?.admin_note || localAdminNote;
//         } else {
//           const errorData = await response.json();
//           showMessage(errorData.message || 'Failed to save note', 'error');
//         }
//       } catch (error: any) {
//         console.error('Error saving note:', error);
//         showMessage(error.message || 'Error saving note. Please try again.', 'error');
//       } finally {
//         setSavingNote(false);
//       }
//     };

//     const handleImageError = (proofId: number, url: string) => {
//       console.log(`Image failed to load for proof ID: ${proofId}, URL: ${url}`);
//       setImageErrors(prev => ({ ...prev, [proofId]: true }));
//     };

//     const statusDisplay = getStatusName(report.status_id, report.status_name);
//     const isDeclined = report.status_id === 5;
//     const isInProgress = report.status_id === 3;
//     const isCompleted = report.status_id === 4;

//     return (
//       <div className="reports-modal-overlay" onClick={onClose}>
//         <div className="reports-modal-content large" onClick={e => e.stopPropagation()}>
//           <div className="reports-modal-header dark">
//             <div>
//               <h3>Rescue Report #{report.report_id}</h3>
//               <div className="reports-modal-subheader">
//                 <span className={`reports-status-badge ${statusDisplay.toLowerCase().replace(' ', '-')}`}>
//                   {statusDisplay}
//                 </span>
//                 <span className="reports-meta">{formatDate(report.submitted_at)}</span>
//               </div>
//             </div>
//             <button className="reports-modal-close" onClick={onClose}>×</button>
//           </div>

//           <div className="reports-modal-body">
//             <div className="reports-detail-grid">
//               <div className="reports-detail-column">
//                 {/* Animal Information Card */}
//                 <div className="reports-info-card">
//                   <div className="reports-card-header beige">
//                     <h4>🐾 Animal Information</h4>
//                   </div>
//                   <div className="reports-card-content">
//                     <div className="reports-animal-display">
//                       <div className="reports-animal-icon">
//                         {getAnimalEmoji(report.animal_type)}
//                       </div>
//                       <div className="reports-animal-details">
//                         <div className="reports-animal-type">{report.animal_type}</div>
//                         <div className="reports-animal-condition">
//                           <span className="condition-tag">{report.animal_condition}</span>
//                         </div>
//                       </div>
//                     </div>
//                   </div>
//                 </div>

//                 {/* Reporter Details Card */}
//                 <div className="reports-info-card">
//                   <div className="reports-card-header beige">
//                     <h4>👤 Reporter Details</h4>
//                   </div>
//                   <div className="reports-card-content">
//                     <div className="reports-detail-list">
//                       <div className="reports-detail-row">
//                         <span className="reports-detail-label">Name</span>
//                         <span className="reports-detail-value">{report.username}</span>
//                       </div>
//                       <div className="reports-detail-row">
//                         <span className="reports-detail-label">Email</span>
//                         <span className="reports-detail-value">{report.email}</span>
//                       </div>
//                       <div className="reports-detail-row">
//                         <span className="reports-detail-label">Phone</span>
//                         <span className="reports-detail-value">{report.phone}</span>
//                       </div>
//                     </div>
//                   </div>
//                 </div>

//                 {/* Location Card */}
//                 <div className="reports-info-card">
//                   <div className="reports-card-header beige">
//                     <h4>📍 Location</h4>
//                   </div>
//                   <div className="reports-card-content">
//                     <div className="reports-location-info">
//                       <p>{report.location_address}</p>
//                       <button
//                         className="reports-btn map"
//                         onClick={() => {
//                           const encodedAddress = encodeURIComponent(report.location_address);
//                           window.open(`https://maps.google.com/?q=${encodedAddress}`, '_blank');
//                         }}
//                       >
//                         View on Map
//                       </button>
//                     </div>
//                   </div>
//                 </div>
//               </div>

//               <div className="reports-detail-column">
//                 {/* Volunteer Assignment Card */}
//                 <div className="reports-info-card">
//                   <div className="reports-card-header beige">
//                     <div className="reports-header-row">
//                       <h4>🦸 Ranger Assignment</h4>
//                       {!report.volunteer_name && !isDeclined && !isInProgress && !isCompleted && (
//                         <button
//                           className="reports-btn primary small"
//                           onClick={onAssignClick}
//                         >
//                           + Assign Ranger
//                         </button>
//                       )}
//                     </div>
//                   </div>
//                   <div className="reports-card-content">
//                     {report.volunteer_name && !isDeclined ? (
//                       <div className="reports-volunteer-assigned">
//                         <div className="reports-assigned-volunteer">
//                           <div className="reports-volunteer-avatar large">
//                             {report.volunteer_name.charAt(0).toUpperCase()}
//                           </div>
//                           <div className="reports-assigned-info">
//                             <h5>{report.volunteer_name}</h5>
//                             <div className="reports-assigned-contact">
//                               {report.volunteer_email && <span>{report.volunteer_email}</span>}
//                               {report.volunteer_phone && <span>{report.volunteer_phone}</span>}
//                             </div>
//                           </div>
//                         </div>
//                         {!isInProgress && !isCompleted && (
//                           <button
//                             className="reports-btn unassign"
//                             onClick={() => onUnassign(report.report_id)}
//                           >
//                             Unassign
//                           </button>
//                         )}
//                         {isInProgress && (
//                           <span className="reports-badge in-progress">In Progress</span>
//                         )}
//                         {isCompleted && (
//                           <span className="reports-badge completed">Completed</span>
//                         )}
//                       </div>
//                     ) : isDeclined ? (
//                       <div className="reports-declined-container">
//                         <div className="reports-declined-header">
//                           <span className="reports-declined-icon">❌</span>
//                           <div className="reports-declined-title">Mission Declined by Ranger</div>
//                         </div>

//                         {report.volunteer_name && (
//                           <div className="reports-declined-volunteer">
//                             <div className="reports-volunteer-avatar declined">
//                               {report.volunteer_name.charAt(0).toUpperCase()}
//                             </div>
//                             <div className="reports-declined-volunteer-info">
//                               <div className="reports-declined-volunteer-name">{report.volunteer_name}</div>
//                               <div className="reports-declined-volunteer-contact">
//                                 {report.volunteer_email && <span>{report.volunteer_email}</span>}
//                                 {report.volunteer_phone && <span>{report.volunteer_phone}</span>}
//                               </div>
//                               {report.volunteer_responded_at && (
//                                 <div className="reports-declined-time">
//                                   Declined on {formatDate(report.volunteer_responded_at)}
//                                 </div>
//                               )}
//                             </div>
//                           </div>
//                         )}

//                         {report.declined_reason ? (
//                           <div className="reports-declined-reason">
//                             <div className="reports-declined-reason-label">Declined Reason:</div>
//                             <div className="reports-declined-reason-text">"{report.declined_reason}"</div>
//                           </div>
//                         ) : (
//                           <div className="reports-declined-reason empty">
//                             <em>No reason provided</em>
//                           </div>
//                         )}

//                         <button
//                           className="reports-btn primary"
//                           onClick={onAssignClick}
//                         >
//                           + Assign New Ranger
//                         </button>
//                       </div>
//                     ) : (
//                       <div className="reports-no-volunteer">
//                         <span className="no-volunteer-emoji">🕊️</span>
//                         <p>No ranger assigned yet</p>
//                         <button
//                           className="reports-btn text"
//                           onClick={onAssignClick}
//                         >
//                           Click to assign a ranger
//                         </button>
//                       </div>
//                     )}
//                   </div>
//                 </div>

//                 {/* Evidence Photos Section */}
//                 {report.task_id && evidence && evidence.length > 0 && (
//                   <div className="reports-info-card">
//                     <div className="reports-card-header beige">
//                       <h4>📸 Evidence Photos</h4>
//                     </div>
//                     <div className="reports-card-content">
//                       <p style={{ marginBottom: '10px', color: '#2D5A27', fontWeight: '600' }}>
//                         {evidence.length} photo(s) uploaded
//                       </p>
//                       <div className="evidence-grid">
//                         {evidence.map((proof) => {
//                           const imageUrl = getFullImageUrl(proof.proof_url);
//                           const hasError = imageErrors[proof.proof_id];

//                           return (
//                             <div
//                               key={proof.proof_id}
//                               className="evidence-item"
//                               onClick={() => !hasError && setSelectedImage(imageUrl)}
//                             >
//                               {!hasError ? (
//                                 <img
//                                   src={imageUrl}
//                                   alt={`Evidence ${proof.proof_id}`}
//                                   className="evidence-image"
//                                   onError={() => handleImageError(proof.proof_id, imageUrl)}
//                                 />
//                               ) : (
//                                 <div className="evidence-image-placeholder">
//                                   <span style={{ fontSize: '2rem', marginBottom: '5px' }}>📷</span>
//                                   <span>Image unavailable</span>
//                                 </div>
//                               )}
//                               <p className="evidence-date">
//                                 Uploaded: {formatDate(proof.uploaded_at)}
//                               </p>
//                             </div>
//                           );
//                         })}
//                       </div>
//                     </div>
//                   </div>
//                 )}

//                 {/* Completion Notes Section */}
//                 {report.task_id && completionNotes && completionNotes.length > 0 && (
//                   <div className="reports-info-card">
//                     <div className="reports-card-header beige">
//                       <h4>✅ Completion Notes</h4>
//                     </div>
//                     <div className="reports-card-content">
//                       <div className="completion-notes-container">
//                         {completionNotes.map((note) => (
//                           <div key={note.note_id} className="completion-note-item">
//                             <div className="completion-note-header">
//                               <span className="completion-note-author">
//                                 {note.volunteer_name || 'Volunteer'}
//                               </span>
//                               <span className="completion-note-time">
//                                 {formatDate(note.created_at)}
//                               </span>
//                             </div>
//                             <p className="completion-note-text">
//                               {note.note_text}
//                             </p>
//                           </div>
//                         ))}
//                       </div>
//                     </div>
//                   </div>
//                 )}

//                 {/* Report Description Card */}
//                 <div className="reports-info-card">
//                   <div className="reports-card-header beige">
//                     <h4>📝 Report Description</h4>
//                   </div>
//                   <div className="reports-card-content">
//                     <div className="reports-description">
//                       <p>{report.description}</p>
//                     </div>
//                     {report.user_note && (
//                       <div className="reports-user-note">
//                         <div className="note-label">Reporter's Note:</div>
//                         <p>{report.user_note}</p>
//                       </div>
//                     )}
//                   </div>
//                 </div>

//                 {/* Admin Notes Card */}
//                 <div className="reports-info-card">
//                   <div className="reports-card-header beige">
//                     <h4>📌 Admin Notes</h4>
//                   </div>
//                   <div className="reports-card-content">
//                     <form onSubmit={handleSaveNote} className="reports-notes-form">
//                       <textarea
//                         className="reports-notes-input"
//                         placeholder={
//                           isInProgress
//                             ? "Notes disabled - mission is in progress"
//                             : isCompleted
//                               ? "Notes disabled - mission is completed"
//                               : "Add internal notes about this rescue mission..."
//                         }
//                         value={localAdminNote}
//                         onChange={(e) => setLocalAdminNote(e.target.value)}
//                         rows={3}
//                         disabled={isInProgress || isCompleted}
//                       />
//                       <div className="reports-notes-actions">
//                         <button
//                           type="submit"
//                           className="reports-btn save"
//                           disabled={savingNote || !localAdminNote.trim() || isInProgress || isCompleted}
//                         >
//                           {savingNote ? 'Saving...' : 'Save Note'}
//                         </button>
//                         {(isInProgress || isCompleted) && (
//                           <span className="reports-note-disabled-hint">
//                             {isCompleted
//                               ? 'Notes disabled - mission completed'
//                               : 'Notes disabled - mission in progress'}
//                           </span>
//                         )}
//                       </div>
//                     </form>
//                   </div>
//                 </div>
//               </div>
//             </div>

//             {/* Image Lightbox */}
//             {selectedImage && (
//               <div
//                 className="image-lightbox"
//                 onClick={() => setSelectedImage(null)}
//               >
//                 <img
//                   src={selectedImage}
//                   alt="Enlarged evidence"
//                 />
//                 <button
//                   className="lightbox-close"
//                   onClick={() => setSelectedImage(null)}
//                 >
//                   ×
//                 </button>
//               </div>
//             )}
//           </div>

//           <div className="reports-modal-footer">
//             <button className="reports-btn secondary" onClick={onClose}>
//               Close
//             </button>
//           </div>
//         </div>
//       </div>
//     );
//   };

// const RescueReports: React.FC = () => {
//   const [reports, setReports] = useState<RescueReport[]>([]);
//   const [volunteers, setVolunteers] = useState<Volunteer[]>([]);
//   const [availabilityStatuses, setAvailabilityStatuses] = useState<AvailabilityStatus[]>([]);
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

//   // New state for evidence and completion notes
//   const [taskEvidence, setTaskEvidence] = useState<{ [key: number]: TaskProof[] }>({});
//   const [taskCompletionNotes, setTaskCompletionNotes] = useState<{ [key: number]: CompletionNote[] }>({});

//   // Pagination state
//   const [currentPage, setCurrentPage] = useState(1);
//   const [itemsPerPage] = useState(9);

//   // Fetch status list from database
//   const fetchStatusList = useCallback(async () => {
//     try {
//       const token = localStorage.getItem('token');
//       if (!token) return;

//       const response = await fetch('http://localhost:5000/api/reports/status/list', {
//         headers: {
//           'Authorization': `Bearer ${token}`,
//           'Content-Type': 'application/json'
//         }
//       });

//       if (response.ok) {
//         const data = await response.json();
//         if (data.success) {
//           setAvailabilityStatuses(data.data || []);
//         }
//       }
//     } catch (error) {
//       console.error('Error fetching status list:', error);
//     }
//   }, []);

//   // Fetch task evidence
//   const fetchTaskEvidence = async (taskId: number) => {
//     try {
//       const token = localStorage.getItem('token');
//       const response = await fetch(
//         `http://localhost:5000/api/tasks/${taskId}/evidence`,
//         {
//           headers: { 'Authorization': `Bearer ${token}` }
//         }
//       );
//       const data = await response.json();
//       if (data.success) {
//         setTaskEvidence(prev => ({ ...prev, [taskId]: data.data }));
//       }
//     } catch (error) {
//       console.error('Error fetching evidence:', error);
//     }
//   };

//   // Fetch task completion notes
//   const fetchTaskCompletionNotes = async (taskId: number) => {
//     try {
//       const token = localStorage.getItem('token');
//       const response = await fetch(
//         `http://localhost:5000/api/tasks/${taskId}/completion-notes`,
//         {
//           headers: { 'Authorization': `Bearer ${token}` }
//         }
//       );
//       const data = await response.json();
//       if (data.success) {
//         setTaskCompletionNotes(prev => ({ ...prev, [taskId]: data.data }));
//       }
//     } catch (error) {
//       console.error('Error fetching completion notes:', error);
//     }
//   };

//   const getStatusName = (statusId: number, statusName?: string): string => {
//     if (statusName) {
//       return statusName
//         .split('_')
//         .map(word => word.charAt(0).toUpperCase() + word.slice(1))
//         .join(' ');
//     }

//     const statusMap: { [key: number]: string } = {
//       1: 'Submitted',
//       2: 'Assigned',
//       3: 'In Progress',
//       4: 'Completed',
//       5: 'Declined'
//     };
//     return statusMap[statusId] || 'Unknown';
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

//       const token = localStorage.getItem('token');
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

//           const mappedReports: RescueReport[] = reportsData.map((report: any) => {
//             const mappedReport: RescueReport = {
//               report_id: report.report_id,
//               user_id: report.user_id,
//               username: report.reporter_name || 'Anonymous',
//               email: report.email || 'No email',
//               phone: report.reporter_phone || 'No phone',
//               description: report.description,
//               location_address: report.location_address,
//               user_note: report.user_note,
//               admin_note: report.admin_note,
//               submitted_at: report.submitted_at,
//               animal_type: report.animal_type || 'Unknown',
//               animal_condition: report.animal_condition || 'Unknown',
//               status_id: report.status_id || 1,
//               status_name: report.status_name,
//               volunteer_id: report.volunteer_id,
//               volunteer_name: report.volunteer_name,
//               volunteer_email: report.volunteer_email,
//               volunteer_phone: report.volunteer_phone,
//               task_id: report.task_id,
//               task_status: report.task_status,
//               declined_reason: report.declined_reason,
//               volunteer_responded_at: report.volunteer_responded_at,
//               volunteer_response: report.volunteer_response
//             };

//             if (report.status_id === 5) {
//               console.log(`Report #${report.report_id}:`, {
//                 volunteer: report.volunteer_name,
//                 reason: report.declined_reason,
//                 responded_at: report.volunteer_responded_at
//               });
//             }

//             return mappedReport;
//           });

//           setReports(mappedReports);
//           setCurrentPage(1);

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

//       const token = localStorage.getItem('token');
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

//           const mappedVolunteers: Volunteer[] = volunteersData.map((volunteer: any) => ({
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
//             created_at: volunteer.created_at,
//             has_car: volunteer.has_car !== undefined ? volunteer.has_car : 0,
//             can_foster: volunteer.can_foster !== undefined ? volunteer.can_foster : 0,
//             animal_handling: volunteer.animal_handling || '',
//             city: volunteer.city || '',
//             badges: volunteer.badges
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

//   // Handle view task details with evidence and completion notes
//   const handleViewTaskDetails = async (report: RescueReport) => {
//     setSelectedReport(report);
//     if (report.task_id) {
//       await Promise.all([
//         fetchTaskEvidence(report.task_id),
//         fetchTaskCompletionNotes(report.task_id)
//       ]);
//     }
//     setIsModalOpen(true);
//   };

//   useEffect(() => {
//     fetchStatusList();
//     fetchReports();
//     fetchVolunteers();
//   }, [fetchReports, fetchVolunteers, fetchStatusList]);

//   const assignVolunteer = async (reportId: number, volunteerId: number, volunteerName: string) => {
//     try {
//       const token = localStorage.getItem('token');
//       if (!token) {
//         showMessage('Please login first', 'error');
//         return;
//       }

//       const response = await fetch(`http://localhost:5000/api/reports/${reportId}/assign`, {
//         method: 'POST',
//         headers: {
//           'Authorization': `Bearer ${token}`,
//           'Content-Type': 'application/json'
//         },
//         body: JSON.stringify({
//           volunteer_id: volunteerId
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
//               status_id: 2,
//               status_name: 'assigned',
//               declined_reason: undefined,
//               volunteer_responded_at: undefined
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

//         showMessage(`Ranger "${volunteerName}" assigned successfully!`, 'success');
//         setIsVolunteerModalOpen(false);
//         setSelectedReport(null);
//         fetchReports();
//         fetchVolunteers();
//       } else {
//         const errorData = await response.json();
//         showMessage(errorData.message || 'Failed to assign ranger', 'error');
//       }
//     } catch (error: any) {
//       console.error('Error assigning volunteer:', error);
//       showMessage(error.message || 'Error assigning ranger. Please try again.', 'error');
//     }
//   };

//   const unassignVolunteer = async (reportId: number) => {
//     if (!window.confirm('Are you sure you want to unassign this ranger? The status will be reset to "Submitted".')) return;

//     try {
//       const token = localStorage.getItem('token');
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
//               status_id: 1,
//               status_name: 'submitted',
//               declined_reason: undefined,
//               volunteer_responded_at: undefined
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

//         showMessage('Ranger unassigned successfully!', 'success');
//         fetchReports();
//         fetchVolunteers();
//       } else {
//         const errorData = await response.json();
//         showMessage(errorData.message || 'Failed to unassign ranger', 'error');
//       }
//     } catch (error: any) {
//       console.error('Error unassigning volunteer:', error);
//       showMessage(error.message || 'Error unassigning ranger. Please try again.', 'error');
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
//     if (type.includes('horse')) return '🐴';
//     if (type.includes('cow')) return '🐮';
//     if (type.includes('goat')) return '🐐';
//     if (type.includes('sheep')) return '🐑';
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
//           report.phone?.toLowerCase().includes(query) ||
//           (report.declined_reason?.toLowerCase().includes(query) ?? false)
//         );
//       }

//       return true;
//     })
//     .sort((a, b) => {
//       switch (sortBy) {
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

//   // Pagination logic
//   const indexOfLastItem = currentPage * itemsPerPage;
//   const indexOfFirstItem = indexOfLastItem - itemsPerPage;
//   const currentItems = filteredReports.slice(indexOfFirstItem, indexOfLastItem);
//   const totalPages = Math.ceil(filteredReports.length / itemsPerPage);

//   const paginate = (pageNumber: number) => setCurrentPage(pageNumber);
//   const nextPage = () => setCurrentPage(prev => Math.min(prev + 1, totalPages));
//   const prevPage = () => setCurrentPage(prev => Math.max(prev - 1, 1));

//   const getPageNumbers = (): number[] => {
//     const pageNumbers: number[] = [];
//     const maxVisible = 5;

//     if (totalPages <= maxVisible) {
//       for (let i = 1; i <= totalPages; i++) {
//         pageNumbers.push(i);
//       }
//     } else {
//       if (currentPage <= 3) {
//         for (let i = 1; i <= 5; i++) {
//           pageNumbers.push(i);
//         }
//       } else if (currentPage >= totalPages - 2) {
//         for (let i = totalPages - 4; i <= totalPages; i++) {
//           pageNumbers.push(i);
//         }
//       } else {
//         for (let i = currentPage - 2; i <= currentPage + 2; i++) {
//           pageNumbers.push(i);
//         }
//       }
//     }

//     return pageNumbers;
//   };

//   if (loading) {
//     return (
//       <div className="reports-loading-container">
//         <div className="reports-loader">
//           <div className="reports-spinner"></div>
//           <p className="reports-loader-text">Loading rescue missions...</p>
//         </div>
//       </div>
//     );
//   }

//   return (
//     <div className="reports-container">
//       {/* Success/Error Messages */}
//       {showSuccessMessage && (
//         <div className="reports-notification success">
//           <span className="notification-icon">✓</span>
//           <span>{message}</span>
//         </div>
//       )}
//       {showErrorMessage && (
//         <div className="reports-notification error">
//           <span className="notification-icon">⚠</span>
//           <span>{message}</span>
//         </div>
//       )}

//       {/* Header */}
//       <div className="reports-header">
//         <div className="reports-header-content">
//           <h1 className="reports-title">Rescue Operations</h1>
//           <p className="reports-subtitle">
//             Manage and coordinate animal rescue missions with our ranger team
//           </p>
//         </div>
//         <div className="reports-header-actions">
//           <button onClick={fetchReports} className="reports-btn refresh">
//             <span className="btn-icon">↻</span>
//             Refresh
//           </button>
//         </div>
//       </div>

//       {/* Filters - IMPROVED UI */}
//       <div className="reports-filters-card">
//         <div className="reports-search-wrapper">
//           {/* <span className="search-icon">🔍</span> */}
//           <input
//             type="text"
//             placeholder="Search by ID, animal, location, ranger, declined reason..."
//             value={searchQuery}
//             onChange={(e) => setSearchQuery(e.target.value)}
//             className="reports-search-input"
//           />
//           {searchQuery && (
//             <button
//               className="reports-clear-search"
//               onClick={() => setSearchQuery('')}
//             >
//               ×
//             </button>
//           )}
//         </div>

//         <div className="reports-filters-row">
//           <div className="reports-filter-group">
//             <label className="reports-filter-label">Status</label>
//             <div className="reports-select-wrapper">
//               <select
//                 value={filterStatus}
//                 onChange={(e) => setFilterStatus(e.target.value)}
//                 className="reports-filter-select"
//               >
//                 <option value="all">All Status</option>
//                 <option value="submitted">Submitted</option>
//                 <option value="assigned">Assigned</option>
//                 <option value="in-progress">In Progress</option>
//                 <option value="completed">Completed</option>
//                 <option value="declined">Declined</option>
//               </select>
//               <span className="reports-select-arrow">▼</span>
//             </div>
//           </div>

//           <div className="reports-filter-group">
//             <label className="reports-filter-label">Sort By</label>
//             <div className="reports-select-wrapper">
//               <select
//                 value={sortBy}
//                 onChange={(e) => setSortBy(e.target.value)}
//                 className="reports-filter-select"
//               >
//                 <option value="recent">Most Recent</option>
//                 <option value="oldest">Oldest</option>
//                 <option value="critical">Critical First</option>
//                 <option value="status">By Status</option>
//               </select>
//               <span className="reports-select-arrow">▼</span>
//             </div>
//           </div>

//           <div className="reports-stats-badge">
//             {filteredReports.length} of {reports.length} missions
//           </div>
//         </div>
//       </div>

//       {/* Reports Grid/Cards - 3 per row */}
//       <div className="reports-content">
//         {filteredReports.length === 0 ? (
//           <div className="reports-empty-state">
//             <span className="empty-state-emoji">🕊️</span>
//             <h3>No Rescue Missions Found</h3>
//             <p>
//               {searchQuery
//                 ? `No missions matching "${searchQuery}"`
//                 : filterStatus !== 'all'
//                   ? `No missions with status "${filterStatus}"`
//                   : 'No rescue missions have been reported yet.'}
//             </p>
//             {(searchQuery || filterStatus !== 'all') && (
//               <button
//                 onClick={() => {
//                   setSearchQuery('');
//                   setFilterStatus('all');
//                   setCurrentPage(1);
//                 }}
//                 className="reports-btn outline"
//               >
//                 Clear Filters
//               </button>
//             )}
//           </div>
//         ) : (
//           <>
//             <div className="reports-grid">
//               {currentItems.map(report => {
//                 const isDeclined = report.status_id === 5;
//                 const statusDisplay = getStatusName(report.status_id, report.status_name);
//                 const hasEvidence = report.task_id && taskEvidence[report.task_id]?.length > 0;

//                 return (
//                   <div key={report.report_id} className="reports-card">
//                     <div className="reports-card-header dark">
//                       <div className="reports-card-title">
//                         <span className="reports-id">#{report.report_id}</span>
//                         <span className={`reports-status ${statusDisplay.toLowerCase().replace(' ', '-')}`}>
//                           {statusDisplay}
//                         </span>
//                       </div>
//                       <div className="reports-date">
//                         {formatDate(report.submitted_at)}
//                       </div>
//                     </div>

//                     <div className="reports-card-body">
//                       <div className="reports-animal-section">
//                         <div className="reports-animal-icon large">
//                           {getAnimalEmoji(report.animal_type)}
//                         </div>
//                         <div className="reports-animal-info">
//                           <h4>{report.animal_type}</h4>
//                           <span className="reports-condition">{report.animal_condition}</span>
//                         </div>
//                       </div>

//                       <div className="reports-location-section">
//                         <span className="location-icon">📍</span>
//                         <span className="location-text">{report.location_address}</span>
//                       </div>

//                       {/* Volunteer info */}
//                       <div className="reports-volunteer-section">
//                         {report.volunteer_name ? (
//                           <div className="reports-assigned-ranger">
//                             <div className={`ranger-avatar ${isDeclined ? 'declined' : ''}`}>
//                               {report.volunteer_name.charAt(0).toUpperCase()}
//                             </div>
//                             <div className="ranger-info">
//                               <span className="ranger-name">{report.volunteer_name}</span>
//                               <span className="ranger-role">
//                                 {isDeclined ? 'Declined' : 'Ranger'}
//                               </span>
//                               {isDeclined && report.declined_reason && (
//                                 <span className="ranger-declined-reason">
//                                   Reason: {report.declined_reason.length > 30
//                                     ? `${report.declined_reason.substring(0, 30)}...`
//                                     : report.declined_reason}
//                                 </span>
//                               )}
//                             </div>
//                           </div>
//                         ) : (
//                           <div className="reports-no-ranger">
//                             <span>No ranger assigned</span>
//                           </div>
//                         )}
//                       </div>

//                       {/* Evidence indicator - Compact mint oval */}
//                       {hasEvidence && (
//                         <div className="evidence-indicator">
//                           <span>📸 Evidence Uploaded</span>
//                         </div>
//                       )}
//                     </div>

//                     <div className="reports-card-footer">
//                       <button
//                         onClick={() => handleViewTaskDetails(report)}
//                         className="reports-btn view"
//                       >
//                         View Mission Details
//                       </button>
//                     </div>
//                   </div>
//                 );
//               })}
//             </div>

//             {/* Pagination */}
//             {totalPages > 1 && (
//               <div className="reports-pagination">
//                 <button
//                   onClick={prevPage}
//                   disabled={currentPage === 1}
//                   className="reports-pagination-btn"
//                 >
//                   ← Prev
//                 </button>

//                 <div className="reports-pagination-numbers">
//                   {getPageNumbers().map((pageNum) => (
//                     <button
//                       key={pageNum}
//                       onClick={() => paginate(pageNum)}
//                       className={`reports-pagination-number ${currentPage === pageNum ? 'active' : ''}`}
//                     >
//                       {pageNum}
//                     </button>
//                   ))}
//                 </div>

//                 <button
//                   onClick={nextPage}
//                   disabled={currentPage === totalPages}
//                   className="reports-pagination-btn"
//                 >
//                   Next →
//                 </button>
//               </div>
//             )}
//           </>
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
//         getAnimalEmoji={getAnimalEmoji}
//         formatDate={formatDate}
//         getStatusName={getStatusName}
//         showMessage={showMessage}
//         evidence={selectedReport?.task_id ? taskEvidence[selectedReport.task_id] : []}
//         completionNotes={selectedReport?.task_id ? taskCompletionNotes[selectedReport.task_id] : []}
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
//         getAnimalEmoji={getAnimalEmoji}
//         formatVolunteerDate={formatVolunteerDate}
//       />
//     </div>
//   );
// };

// export default RescueReports;

import React, { useEffect, useState, useCallback } from 'react';
import './RescueReports.css';

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
  declined_reason?: string;
  volunteer_responded_at?: string;
  volunteer_response?: string;
  task_id?: number;
  task_status?: string;
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
  has_car: number;
  can_foster: number;
  animal_handling: string;
  city: string;
  badges?: string;
}

interface AvailabilityStatus {
  status_id: number;
  status_name: string;
}

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

    const availableVolunteers = volunteers.filter(v =>
      v.availability_status_id === 1 || v.availability_status?.toLowerCase() === 'available'
    );

    const unavailableVolunteers = volunteers.filter(v =>
      v.availability_status_id === 2 || v.availability_status?.toLowerCase() === 'unavailable'
    );

    const getBadgeDisplay = (badges?: string) => {
      if (!badges) return null;
      try {
        if (typeof badges === 'string' && !badges.startsWith('[')) {
          return badges.split(',').slice(0, 3).join(', ');
        }
        const badgeList = JSON.parse(badges);
        if (Array.isArray(badgeList) && badgeList.length > 0) {
          return badgeList.slice(0, 3).join(', ');
        }
      } catch (e) {
        return badges;
      }
      return null;
    };

    return (
      <div className="reports-modal-overlay" onClick={onClose}>
        <div className="reports-modal-content" onClick={e => e.stopPropagation()}>
          <div className="reports-modal-header dark">
            <div>
              <h3>Assign Ranger</h3>
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
                  <p>Loading rangers...</p>
                </div>
              ) : volunteers.length === 0 ? (
                <div className="reports-empty-state small">
                  <span className="empty-emoji">🕊️</span>
                  <p>No rangers found</p>
                </div>
              ) : (
                <div className="reports-volunteers-grid">
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

                            <div className="reports-volunteer-details">
                              <div className="reports-detail-row">
                                <span className="reports-detail-label">ID:</span>
                                <span className="reports-detail-value">{volunteer.user_id}</span>
                              </div>
                              <div className="reports-detail-row">
                                <span className="reports-detail-label">City:</span>
                                <span className="reports-detail-value">{volunteer.city || 'Not specified'}</span>
                              </div>
                              <div className="reports-detail-row">
                                <span className="reports-detail-label">Joined:</span>
                                <span className="reports-detail-value">{formatVolunteerDate(volunteer.joined_at)}</span>
                              </div>
                              <div className="reports-detail-row">
                                <span className="reports-detail-label">Has Car:</span>
                                <span className="reports-detail-value">{volunteer.has_car === 1 ? 'Yes' : 'No'}</span>
                              </div>
                              <div className="reports-detail-row">
                                <span className="reports-detail-label">Can Foster:</span>
                                <span className="reports-detail-value">{volunteer.can_foster === 1 ? 'Yes' : 'No'}</span>
                              </div>
                              <div className="reports-detail-row">
                                <span className="reports-detail-label">Animal Handling:</span>
                                <span className="reports-detail-value">{volunteer.animal_handling || 'Not specified'}</span>
                              </div>
                              {getBadgeDisplay(volunteer.badges) && (
                                <div className="reports-detail-row">
                                  <span className="reports-detail-label">Badges:</span>
                                  <span className="reports-detail-value">{getBadgeDisplay(volunteer.badges)}</span>
                                </div>
                              )}
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

                            <div className="reports-volunteer-details">
                              <div className="reports-detail-row">
                                <span className="reports-detail-label">ID:</span>
                                <span className="reports-detail-value">{volunteer.user_id}</span>
                              </div>
                              <div className="reports-detail-row">
                                <span className="reports-detail-label">City:</span>
                                <span className="reports-detail-value">{volunteer.city || 'Not specified'}</span>
                              </div>
                              <div className="reports-detail-row">
                                <span className="reports-detail-label">Has Car:</span>
                                <span className="reports-detail-value">{volunteer.has_car === 1 ? 'Yes' : 'No'}</span>
                              </div>
                              <div className="reports-detail-row">
                                <span className="reports-detail-label">Can Foster:</span>
                                <span className="reports-detail-value">{volunteer.can_foster === 1 ? 'Yes' : 'No'}</span>
                              </div>
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

// Report Detail Modal Component with Evidence and Completion Notes
const ReportDetailModal: React.FC<{
  report: RescueReport | null;
  isOpen: boolean;
  onClose: () => void;
  onAssignClick: () => void;
  onUnassign: (reportId: number) => void;
  getAnimalEmoji: (type: string) => string;
  formatDate: (date: string) => string;
  getStatusName: (statusId: number, statusName?: string) => string;
  showMessage: (text: string, type: 'success' | 'error') => void;
  evidence?: TaskProof[];
  completionNotes?: CompletionNote[];
}> = ({
  report,
  isOpen,
  onClose,
  onAssignClick,
  onUnassign,
  getAnimalEmoji,
  formatDate,
  getStatusName,
  showMessage,
  evidence = [],
  completionNotes = []
}) => {
    const [localAdminNote, setLocalAdminNote] = useState('');
    const [savingNote, setSavingNote] = useState(false);
    const [selectedImage, setSelectedImage] = useState<string | null>(null);
    const [imageErrors, setImageErrors] = useState<Record<number, boolean>>({});

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
          report.admin_note = data.data?.admin_note || localAdminNote;
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

    const handleImageError = (proofId: number, url: string) => {
      console.log(`Image failed to load for proof ID: ${proofId}, URL: ${url}`);
      setImageErrors(prev => ({ ...prev, [proofId]: true }));
    };

    const statusDisplay = getStatusName(report.status_id, report.status_name);
    const isDeclined = report.status_id === 5;
    const isInProgress = report.status_id === 3;
    const isCompleted = report.status_id === 4;

    return (
      <div className="reports-modal-overlay" onClick={onClose}>
        <div className="reports-modal-content large" onClick={e => e.stopPropagation()}>
          <div className="reports-modal-header dark">
            <div>
              <h3>Rescue Report #{report.report_id}</h3>
              <div className="reports-modal-subheader">
                <span className={`reports-status-badge ${statusDisplay.toLowerCase().replace(' ', '-')}`}>
                  {statusDisplay}
                </span>
                <span className="reports-meta">{formatDate(report.submitted_at)}</span>
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

                {/* Reporter Details Card */}
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

                {/* Location Card */}
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
                {/* Volunteer Assignment Card */}
                <div className="reports-info-card">
                  <div className="reports-card-header beige">
                    <div className="reports-header-row">
                      <h4>🦸 Ranger Assignment</h4>
                      {!report.volunteer_name && !isDeclined && !isInProgress && !isCompleted && (
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
                    {report.volunteer_name && !isDeclined ? (
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
                        {!isInProgress && !isCompleted && (
                          <button
                            className="reports-btn unassign"
                            onClick={() => onUnassign(report.report_id)}
                          >
                            Unassign
                          </button>
                        )}
                        {isInProgress && (
                          <span className="reports-badge in-progress">In Progress</span>
                        )}
                        {isCompleted && (
                          <span className="reports-badge completed">Completed</span>
                        )}
                      </div>
                    ) : isDeclined ? (
                      <div className="reports-declined-container">
                        <div className="reports-declined-header">
                          <span className="reports-declined-icon">❌</span>
                          <div className="reports-declined-title">Mission Declined by Ranger</div>
                        </div>

                        {report.volunteer_name && (
                          <div className="reports-declined-volunteer">
                            <div className="reports-volunteer-avatar declined">
                              {report.volunteer_name.charAt(0).toUpperCase()}
                            </div>
                            <div className="reports-declined-volunteer-info">
                              <div className="reports-declined-volunteer-name">{report.volunteer_name}</div>
                              <div className="reports-declined-volunteer-contact">
                                {report.volunteer_email && <span>{report.volunteer_email}</span>}
                                {report.volunteer_phone && <span>{report.volunteer_phone}</span>}
                              </div>
                              {report.volunteer_responded_at && (
                                <div className="reports-declined-time">
                                  Declined on {formatDate(report.volunteer_responded_at)}
                                </div>
                              )}
                            </div>
                          </div>
                        )}

                        {report.declined_reason ? (
                          <div className="reports-declined-reason">
                            <div className="reports-declined-reason-label">Declined Reason:</div>
                            <div className="reports-declined-reason-text">"{report.declined_reason}"</div>
                          </div>
                        ) : (
                          <div className="reports-declined-reason empty">
                            <em>No reason provided</em>
                          </div>
                        )}

                        <button
                          className="reports-btn primary"
                          onClick={onAssignClick}
                        >
                          + Assign New Ranger
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

                {/* Evidence Photos Section */}
                {report.task_id && evidence && evidence.length > 0 && (
                  <div className="reports-info-card">
                    <div className="reports-card-header beige">
                      <h4>📸 Evidence Photos</h4>
                    </div>
                    <div className="reports-card-content">
                      <p style={{ marginBottom: '10px', color: '#2D5A27', fontWeight: '600' }}>
                        {evidence.length} photo(s) uploaded
                      </p>
                      <div className="evidence-grid">
                        {evidence.map((proof) => {
                          const imageUrl = getFullImageUrl(proof.proof_url);
                          const hasError = imageErrors[proof.proof_id];

                          return (
                            <div
                              key={proof.proof_id}
                              className="evidence-item"
                              onClick={() => !hasError && setSelectedImage(imageUrl)}
                            >
                              {!hasError ? (
                                <img
                                  src={imageUrl}
                                  alt={`Evidence ${proof.proof_id}`}
                                  className="evidence-image"
                                  onError={() => handleImageError(proof.proof_id, imageUrl)}
                                />
                              ) : (
                                <div className="evidence-image-placeholder">
                                  <span style={{ fontSize: '2rem', marginBottom: '5px' }}>📷</span>
                                  <span>Image unavailable</span>
                                </div>
                              )}
                              <p className="evidence-date">
                                Uploaded: {formatDate(proof.uploaded_at)}
                              </p>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  </div>
                )}

                {/* Completion Notes Section */}
                {report.task_id && completionNotes && completionNotes.length > 0 && (
                  <div className="reports-info-card">
                    <div className="reports-card-header beige">
                      <h4>✅ Completion Notes</h4>
                    </div>
                    <div className="reports-card-content">
                      <div className="completion-notes-container">
                        {completionNotes.map((note) => (
                          <div key={note.note_id} className="completion-note-item">
                            <div className="completion-note-header">
                              <span className="completion-note-author">
                                {note.volunteer_name || 'Volunteer'}
                              </span>
                              <span className="completion-note-time">
                                {formatDate(note.created_at)}
                              </span>
                            </div>
                            <p className="completion-note-text">
                              {note.note_text}
                            </p>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                )}

                {/* Report Description Card */}
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

                {/* Admin Notes Card */}
                <div className="reports-info-card">
                  <div className="reports-card-header beige">
                    <h4>📌 Admin Notes</h4>
                  </div>
                  <div className="reports-card-content">
                    <form onSubmit={handleSaveNote} className="reports-notes-form">
                      <textarea
                        className="reports-notes-input"
                        placeholder={
                          isInProgress
                            ? "Notes disabled - mission is in progress"
                            : isCompleted
                              ? "Notes disabled - mission is completed"
                              : "Add internal notes about this rescue mission..."
                        }
                        value={localAdminNote}
                        onChange={(e) => setLocalAdminNote(e.target.value)}
                        rows={3}
                        disabled={isInProgress || isCompleted}
                      />
                      <div className="reports-notes-actions">
                        <button
                          type="submit"
                          className="reports-btn save"
                          disabled={savingNote || !localAdminNote.trim() || isInProgress || isCompleted}
                        >
                          {savingNote ? 'Saving...' : 'Save Note'}
                        </button>
                        {(isInProgress || isCompleted) && (
                          <span className="reports-note-disabled-hint">
                            {isCompleted
                              ? 'Notes disabled - mission completed'
                              : 'Notes disabled - mission in progress'}
                          </span>
                        )}
                      </div>
                    </form>
                  </div>
                </div>
              </div>
            </div>

            {/* Image Lightbox */}
            {selectedImage && (
              <div
                className="image-lightbox"
                onClick={() => setSelectedImage(null)}
              >
                <img
                  src={selectedImage}
                  alt="Enlarged evidence"
                />
                <button
                  className="lightbox-close"
                  onClick={() => setSelectedImage(null)}
                >
                  ×
                </button>
              </div>
            )}
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

  // New state for evidence and completion notes
  const [taskEvidence, setTaskEvidence] = useState<{ [key: number]: TaskProof[] }>({});
  const [taskCompletionNotes, setTaskCompletionNotes] = useState<{ [key: number]: CompletionNote[] }>({});

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

  // Fetch task evidence
  const fetchTaskEvidence = async (taskId: number) => {
    try {
      const token = localStorage.getItem('token');
      const response = await fetch(
        `http://localhost:5000/api/tasks/${taskId}/evidence`,
        {
          headers: { 'Authorization': `Bearer ${token}` }
        }
      );
      const data = await response.json();
      if (data.success) {
        setTaskEvidence(prev => ({ ...prev, [taskId]: data.data }));
      }
    } catch (error) {
      console.error('Error fetching evidence:', error);
    }
  };

  // Fetch task completion notes
  const fetchTaskCompletionNotes = async (taskId: number) => {
    try {
      const token = localStorage.getItem('token');
      const response = await fetch(
        `http://localhost:5000/api/tasks/${taskId}/completion-notes`,
        {
          headers: { 'Authorization': `Bearer ${token}` }
        }
      );
      const data = await response.json();
      if (data.success) {
        setTaskCompletionNotes(prev => ({ ...prev, [taskId]: data.data }));
      }
    } catch (error) {
      console.error('Error fetching completion notes:', error);
    }
  };

  const getStatusName = (statusId: number, statusName?: string): string => {
    if (statusName) {
      return statusName
        .split('_')
        .map(word => word.charAt(0).toUpperCase() + word.slice(1))
        .join(' ');
    }

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

          const mappedReports: RescueReport[] = reportsData.map((report: any) => {
            const mappedReport: RescueReport = {
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
              status_name: report.status_name,
              volunteer_id: report.volunteer_id,
              volunteer_name: report.volunteer_name,
              volunteer_email: report.volunteer_email,
              volunteer_phone: report.volunteer_phone,
              task_id: report.task_id,
              task_status: report.task_status,
              declined_reason: report.declined_reason,
              volunteer_responded_at: report.volunteer_responded_at,
              volunteer_response: report.volunteer_response
            };

            if (report.status_id === 5) {
              console.log(`Report #${report.report_id}:`, {
                volunteer: report.volunteer_name,
                reason: report.declined_reason,
                responded_at: report.volunteer_responded_at
              });
            }

            return mappedReport;
          });

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

          const mappedVolunteers: Volunteer[] = volunteersData.map((volunteer: any) => ({
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
            created_at: volunteer.created_at,
            has_car: volunteer.has_car !== undefined ? volunteer.has_car : 0,
            can_foster: volunteer.can_foster !== undefined ? volunteer.can_foster : 0,
            animal_handling: volunteer.animal_handling || '',
            city: volunteer.city || '',
            badges: volunteer.badges
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

  // Handle view task details with evidence and completion notes
  const handleViewTaskDetails = async (report: RescueReport) => {
    setSelectedReport(report);
    if (report.task_id) {
      await Promise.all([
        fetchTaskEvidence(report.task_id),
        fetchTaskCompletionNotes(report.task_id)
      ]);
    }
    setIsModalOpen(true);
  };

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
          volunteer_id: volunteerId
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
              status_name: 'assigned',
              declined_reason: undefined,
              volunteer_responded_at: undefined
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
        showMessage(errorData.message || 'Failed to assign ranger', 'error');
      }
    } catch (error: any) {
      console.error('Error assigning volunteer:', error);
      showMessage(error.message || 'Error assigning ranger. Please try again.', 'error');
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
              status_name: 'submitted',
              declined_reason: undefined,
              volunteer_responded_at: undefined
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
        showMessage(errorData.message || 'Failed to unassign ranger', 'error');
      }
    } catch (error: any) {
      console.error('Error unassigning volunteer:', error);
      showMessage(error.message || 'Error unassigning ranger. Please try again.', 'error');
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

  // ===== NEW EXPORT CSV FUNCTION =====
  const exportToCSV = () => {
    try {
      // Prepare the data for export
      const exportData = reports.map(report => ({
        'Report ID': report.report_id,
        'Status': getStatusName(report.status_id, report.status_name),
        'Animal Type': report.animal_type,
        'Condition': report.animal_condition,
        'Location': report.location_address,
        'Reporter': report.username,
        'Reporter Email': report.email,
        'Reporter Phone': report.phone,
        'Assigned Ranger': report.volunteer_name || 'Not assigned',
        'Ranger Email': report.volunteer_email || '',
        'Ranger Phone': report.volunteer_phone || '',
        'Submitted Date': formatDate(report.submitted_at),
        'Description': report.description.replace(/,/g, ';'), // Remove commas to avoid CSV issues
        'User Note': (report.user_note || '').replace(/,/g, ';'),
        'Admin Note': (report.admin_note || '').replace(/,/g, ';'),
        'Declined Reason': report.declined_reason || '',
        'Has Evidence': report.task_id && taskEvidence[report.task_id]?.length > 0 ? 'Yes' : 'No',
        'Evidence Count': report.task_id ? (taskEvidence[report.task_id]?.length || 0) : 0
      }));

      if (exportData.length === 0) {
        showMessage('No data to export', 'error');
        return;
      }

      // Get headers
      const headers = Object.keys(exportData[0]);

      // Convert to CSV
      const csvContent = [
        headers.join(','),
        ...exportData.map(row => 
          headers.map(header => {
            const value = row[header as keyof typeof row];
            // Handle values that might contain commas
            if (typeof value === 'string' && value.includes(',')) {
              return `"${value}"`;
            }
            return value;
          }).join(',')
        )
      ].join('\n');

      // Create download link
      const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
      const link = document.createElement('a');
      const url = URL.createObjectURL(blob);
      link.setAttribute('href', url);
      link.setAttribute('download', `rescue_reports_${new Date().toISOString().split('T')[0]}.csv`);
      link.style.visibility = 'hidden';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);

      showMessage(`Exported ${exportData.length} reports successfully!`, 'success');
    } catch (error) {
      console.error('Error exporting CSV:', error);
      showMessage('Failed to export CSV', 'error');
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
          report.phone?.toLowerCase().includes(query) ||
          (report.declined_reason?.toLowerCase().includes(query) ?? false)
        );
      }

      return true;
    })
    .sort((a, b) => {
      switch (sortBy) {
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
          <button 
            onClick={fetchReports} 
            className="reports-btn refresh" 
            title="Refresh data"
          >
            <span className="btn-icon">↻</span>
          </button>
          <button 
            onClick={exportToCSV} 
            className="reports-btn primary"
            disabled={reports.length === 0}
            title="Export to CSV"
          >
            <span className="btn-icon">📊</span>
            Export CSV
          </button>
        </div>
      </div>

      {/* Filters - IMPROVED UI */}
      <div className="reports-filters-card">
        <div className="reports-search-wrapper">
          <input
            type="text"
            placeholder="Search by ID, animal, location, ranger, declined reason..."
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
            <div className="reports-select-wrapper">
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
              <span className="reports-select-arrow">▼</span>
            </div>
          </div>

          <div className="reports-filter-group">
            <label className="reports-filter-label">Sort By</label>
            <div className="reports-select-wrapper">
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
              <span className="reports-select-arrow">▼</span>
            </div>
          </div>

          <div className="reports-stats-badge">
            {filteredReports.length} of {reports.length} missions
          </div>
        </div>
      </div>

      {/* Reports Grid/Cards - 3 per row */}
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
              {currentItems.map(report => {
                const isDeclined = report.status_id === 5;
                const statusDisplay = getStatusName(report.status_id, report.status_name);
                const hasEvidence = report.task_id && taskEvidence[report.task_id]?.length > 0;

                return (
                  <div key={report.report_id} className="reports-card">
                    <div className="reports-card-header dark">
                      <div className="reports-card-title">
                        <span className="reports-id">#{report.report_id}</span>
                        <span className={`reports-status ${statusDisplay.toLowerCase().replace(' ', '-')}`}>
                          {statusDisplay}
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

                      {/* Volunteer info */}
                      <div className="reports-volunteer-section">
                        {report.volunteer_name ? (
                          <div className="reports-assigned-ranger">
                            <div className={`ranger-avatar ${isDeclined ? 'declined' : ''}`}>
                              {report.volunteer_name.charAt(0).toUpperCase()}
                            </div>
                            <div className="ranger-info">
                              <span className="ranger-name">{report.volunteer_name}</span>
                              <span className="ranger-role">
                                {isDeclined ? 'Declined' : 'Ranger'}
                              </span>
                              {isDeclined && report.declined_reason && (
                                <span className="ranger-declined-reason">
                                  Reason: {report.declined_reason.length > 30
                                    ? `${report.declined_reason.substring(0, 30)}...`
                                    : report.declined_reason}
                                </span>
                              )}
                            </div>
                          </div>
                        ) : (
                          <div className="reports-no-ranger">
                            <span>No ranger assigned</span>
                          </div>
                        )}
                      </div>

                      {/* Evidence indicator - Compact mint oval */}
                      {hasEvidence && (
                        <div className="evidence-indicator">
                          <span>📸 Evidence Uploaded</span>
                        </div>
                      )}
                    </div>

                    <div className="reports-card-footer">
                      <button
                        onClick={() => handleViewTaskDetails(report)}
                        className="reports-btn view"
                      >
                        View Mission Details
                      </button>
                    </div>
                  </div>
                );
              })}
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
        evidence={selectedReport?.task_id ? taskEvidence[selectedReport.task_id] : []}
        completionNotes={selectedReport?.task_id ? taskCompletionNotes[selectedReport.task_id] : []}
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