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
// //     if (!isOpen || !report) return null;

// //     const availableVolunteers = volunteers.filter(v =>
// //       v.availability_status_id === 1 || v.availability_status?.toLowerCase() === 'available'
// //     );

// //     const unavailableVolunteers = volunteers.filter(v =>
// //       v.availability_status_id === 2 || v.availability_status?.toLowerCase() === 'unavailable'
// //     );

// //     const getBadgeDisplay = (badges?: string) => {
// //       if (!badges) return null;
// //       try {
// //         if (typeof badges === 'string' && !badges.startsWith('[')) {
// //           return badges.split(',').slice(0, 3).join(', ');
// //         }
// //         const badgeList = JSON.parse(badges);
// //         if (Array.isArray(badgeList) && badgeList.length > 0) {
// //           return badgeList.slice(0, 3).join(', ');
// //         }
// //       } catch (e) {
// //         return badges;
// //       }
// //       return null;
// //     };

// //     return (
// //       <div className="reports-modal-overlay" onClick={onClose}>
// //         <div className="reports-modal-content" onClick={e => e.stopPropagation()}>
// //           <div className="reports-modal-header dark">
// //             <div>
// //               <h3>Assign Ranger</h3>
// //               <p className="reports-modal-subtitle">Report #{report.report_id}</p>
// //             </div>
// //             <button className="reports-modal-close" onClick={onClose}>×</button>
// //           </div>

// //           <div className="reports-modal-body">
// //             <div className="reports-summary-card">
// //               <div className="reports-summary-item">
// //                 <span className="reports-summary-label">Animal</span>
// //                 <span className="reports-summary-value">
// //                   {getAnimalEmoji(report.animal_type)} {report.animal_type}
// //                 </span>
// //               </div>
// //               <div className="reports-summary-item">
// //                 <span className="reports-summary-label">Location</span>
// //                 <span className="reports-summary-value location">
// //                   {report.location_address}
// //                 </span>
// //               </div>
// //             </div>

// //             <div className="reports-volunteers-container">
// //               <h4>Available Rangers ({availableVolunteers.length})</h4>

// //               {loadingVolunteers ? (
// //                 <div className="reports-loading-state">
// //                   <div className="reports-spinner"></div>
// //                   <p>Loading rangers...</p>
// //                 </div>
// //               ) : volunteers.length === 0 ? (
// //                 <div className="reports-empty-state small">
// //                   <span className="empty-emoji">🕊️</span>
// //                   <p>No rangers found</p>
// //                 </div>
// //               ) : (
// //                 <div className="reports-volunteers-grid">
// //                   {availableVolunteers.length > 0 && (
// //                     <div className="reports-volunteer-category">
// //                       <div className="reports-category-header">
// //                         <span className="reports-status-dot available"></span>
// //                         <span>Available for Rescue ({availableVolunteers.length})</span>
// //                       </div>
// //                       {availableVolunteers.map(volunteer => (
// //                         <div key={volunteer.user_id} className="reports-volunteer-item">
// //                           <div className="reports-volunteer-avatar-wrapper">
// //                             <div className="reports-volunteer-avatar">
// //                               {volunteer.username.charAt(0).toUpperCase()}
// //                             </div>
// //                             {volunteer.assigned_reports_count > 0 && (
// //                               <span className="reports-badge-count">{volunteer.assigned_reports_count}</span>
// //                             )}
// //                           </div>
// //                           <div className="reports-volunteer-info">
// //                             <div className="reports-volunteer-header">
// //                               <h5>{volunteer.username}</h5>
// //                               <span className="reports-volunteer-status available">Available</span>
// //                             </div>
// //                             <div className="reports-volunteer-contact">
// //                               <span>{volunteer.email}</span>
// //                               {volunteer.phone && <span>{volunteer.phone}</span>}
// //                             </div>

// //                             <div className="reports-volunteer-details">
// //                               <div className="reports-detail-row">
// //                                 <span className="reports-detail-label">ID:</span>
// //                                 <span className="reports-detail-value">{volunteer.user_id}</span>
// //                               </div>
// //                               <div className="reports-detail-row">
// //                                 <span className="reports-detail-label">City:</span>
// //                                 <span className="reports-detail-value">{volunteer.city || 'Not specified'}</span>
// //                               </div>
// //                               <div className="reports-detail-row">
// //                                 <span className="reports-detail-label">Joined:</span>
// //                                 <span className="reports-detail-value">{formatVolunteerDate(volunteer.joined_at)}</span>
// //                               </div>
// //                               <div className="reports-detail-row">
// //                                 <span className="reports-detail-label">Has Car:</span>
// //                                 <span className="reports-detail-value">{volunteer.has_car === 1 ? 'Yes' : 'No'}</span>
// //                               </div>
// //                               <div className="reports-detail-row">
// //                                 <span className="reports-detail-label">Can Foster:</span>
// //                                 <span className="reports-detail-value">{volunteer.can_foster === 1 ? 'Yes' : 'No'}</span>
// //                               </div>
// //                               <div className="reports-detail-row">
// //                                 <span className="reports-detail-label">Animal Handling:</span>
// //                                 <span className="reports-detail-value">{volunteer.animal_handling || 'Not specified'}</span>
// //                               </div>
// //                               {getBadgeDisplay(volunteer.badges) && (
// //                                 <div className="reports-detail-row">
// //                                   <span className="reports-detail-label">Badges:</span>
// //                                   <span className="reports-detail-value">{getBadgeDisplay(volunteer.badges)}</span>
// //                                 </div>
// //                               )}
// //                             </div>

// //                             <div className="reports-volunteer-meta">
// //                               <span>Joined {formatVolunteerDate(volunteer.joined_at)}</span>
// //                               <span>{volunteer.assigned_reports_count} active rescues</span>
// //                             </div>
// //                           </div>
// //                           <button
// //                             className="reports-btn assign"
// //                             onClick={() => onSelect(volunteer)}
// //                           >
// //                             Assign
// //                           </button>
// //                         </div>
// //                       ))}
// //                     </div>
// //                   )}

// //                   {unavailableVolunteers.length > 0 && (
// //                     <div className="reports-volunteer-category">
// //                       <div className="reports-category-header">
// //                         <span className="reports-status-dot unavailable"></span>
// //                         <span>Unavailable ({unavailableVolunteers.length})</span>
// //                       </div>
// //                       {unavailableVolunteers.map(volunteer => (
// //                         <div key={volunteer.user_id} className="reports-volunteer-item unavailable">
// //                           <div className="reports-volunteer-avatar-wrapper">
// //                             <div className="reports-volunteer-avatar unavailable">
// //                               {volunteer.username.charAt(0).toUpperCase()}
// //                             </div>
// //                           </div>
// //                           <div className="reports-volunteer-info">
// //                             <div className="reports-volunteer-header">
// //                               <h5>{volunteer.username}</h5>
// //                               <span className="reports-volunteer-status unavailable">Unavailable</span>
// //                             </div>
// //                             <div className="reports-volunteer-contact">
// //                               <span>{volunteer.email}</span>
// //                             </div>

// //                             <div className="reports-volunteer-details">
// //                               <div className="reports-detail-row">
// //                                 <span className="reports-detail-label">ID:</span>
// //                                 <span className="reports-detail-value">{volunteer.user_id}</span>
// //                               </div>
// //                               <div className="reports-detail-row">
// //                                 <span className="reports-detail-label">City:</span>
// //                                 <span className="reports-detail-value">{volunteer.city || 'Not specified'}</span>
// //                               </div>
// //                               <div className="reports-detail-row">
// //                                 <span className="reports-detail-label">Has Car:</span>
// //                                 <span className="reports-detail-value">{volunteer.has_car === 1 ? 'Yes' : 'No'}</span>
// //                               </div>
// //                               <div className="reports-detail-row">
// //                                 <span className="reports-detail-label">Can Foster:</span>
// //                                 <span className="reports-detail-value">{volunteer.can_foster === 1 ? 'Yes' : 'No'}</span>
// //                               </div>
// //                             </div>

// //                             <div className="reports-volunteer-meta">
// //                               <span>Currently unavailable</span>
// //                             </div>
// //                           </div>
// //                           <button
// //                             className="reports-btn assign-disabled"
// //                             disabled
// //                           >
// //                             Unavailable
// //                           </button>
// //                         </div>
// //                       ))}
// //                     </div>
// //                   )}
// //                 </div>
// //               )}
// //             </div>
// //           </div>

// //           <div className="reports-modal-footer">
// //             <button className="reports-btn secondary" onClick={onClose}>
// //               Cancel
// //             </button>
// //           </div>
// //         </div>
// //       </div>
// //     );
// //   };

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
// //     const [localAdminNote, setLocalAdminNote] = useState('');
// //     const [savingNote, setSavingNote] = useState(false);
// //     const [selectedImage, setSelectedImage] = useState<string | null>(null);
// //     const [imageErrors, setImageErrors] = useState<Record<number, boolean>>({});

// //     useEffect(() => {
// //       if (report) {
// //         setLocalAdminNote(report.admin_note || '');
// //       }
// //     }, [report]);

// //     if (!isOpen || !report) return null;

// //     const handleSaveNote = async (e: React.FormEvent) => {
// //       e.preventDefault();

// //       if (!localAdminNote.trim()) {
// //         showMessage('Please enter a note', 'error');
// //         return;
// //       }

// //       try {
// //         const token = sessionStorage.getItem('token') || localStorage.getItem('token');
// //         if (!token) {
// //           showMessage('Please login first', 'error');
// //           return;
// //         }

// //         setSavingNote(true);

// //         const response = await fetch(`http://localhost:5000/api/reports/${report.report_id}/admin-note`, {
// //           method: 'POST',
// //           headers: {
// //             'Authorization': `Bearer ${token}`,
// //             'Content-Type': 'application/json'
// //           },
// //           body: JSON.stringify({ note: localAdminNote })
// //         });

// //         if (response.ok) {
// //           const data = await response.json();
// //           showMessage('Note saved successfully!', 'success');
// //           report.admin_note = data.data?.admin_note || localAdminNote;
// //         } else {
// //           const errorData = await response.json();
// //           showMessage(errorData.message || 'Failed to save note', 'error');
// //         }
// //       } catch (error: any) {
// //         console.error('Error saving note:', error);
// //         showMessage(error.message || 'Error saving note. Please try again.', 'error');
// //       } finally {
// //         setSavingNote(false);
// //       }
// //     };

// //     const handleImageError = (proofId: number, url: string) => {
// //       console.log(`Image failed to load for proof ID: ${proofId}, URL: ${url}`);
// //       setImageErrors(prev => ({ ...prev, [proofId]: true }));
// //     };

// //     const statusDisplay = getStatusName(report.status_id, report.status_name);
// //     const isDeclined = report.status_id === 5;
// //     const isInProgress = report.status_id === 3;
// //     const isCompleted = report.status_id === 4;

// //     return (
// //       <div className="reports-modal-overlay" onClick={onClose}>
// //         <div className="reports-modal-content large" onClick={e => e.stopPropagation()}>
// //           <div className="reports-modal-header dark">
// //             <div>
// //               <h3>Rescue Report #{report.report_id}</h3>
// //               <div className="reports-modal-subheader">
// //                 <span className={`reports-status-badge ${statusDisplay.toLowerCase().replace(' ', '-')}`}>
// //                   {statusDisplay}
// //                 </span>
// //                 <span className="reports-meta">{formatDate(report.submitted_at)}</span>
// //               </div>
// //             </div>
// //             <button className="reports-modal-close" onClick={onClose}>×</button>
// //           </div>

// //           <div className="reports-modal-body">
// //             <div className="reports-detail-grid">
// //               <div className="reports-detail-column">
// //                 {/* Animal Information Card */}
// //                 <div className="reports-info-card">
// //                   <div className="reports-card-header beige">
// //                     <h4>🐾 Animal Information</h4>
// //                   </div>
// //                   <div className="reports-card-content">
// //                     <div className="reports-animal-display">
// //                       <div className="reports-animal-icon">
// //                         {getAnimalEmoji(report.animal_type)}
// //                       </div>
// //                       <div className="reports-animal-details">
// //                         <div className="reports-animal-type">{report.animal_type}</div>
// //                         <div className="reports-animal-condition">
// //                           <span className="condition-tag">{report.animal_condition}</span>
// //                         </div>
// //                       </div>
// //                     </div>
// //                   </div>
// //                 </div>

// //                 {/* Reporter Details Card */}
// //                 <div className="reports-info-card">
// //                   <div className="reports-card-header beige">
// //                     <h4>👤 Reporter Details</h4>
// //                   </div>
// //                   <div className="reports-card-content">
// //                     <div className="reports-detail-list">
// //                       <div className="reports-detail-row">
// //                         <span className="reports-detail-label">Name</span>
// //                         <span className="reports-detail-value">{report.username}</span>
// //                       </div>
// //                       <div className="reports-detail-row">
// //                         <span className="reports-detail-label">Email</span>
// //                         <span className="reports-detail-value">{report.email}</span>
// //                       </div>
// //                       <div className="reports-detail-row">
// //                         <span className="reports-detail-label">Phone</span>
// //                         <span className="reports-detail-value">{report.phone}</span>
// //                       </div>
// //                     </div>
// //                   </div>
// //                 </div>

// //                 {/* Location Card */}
// //                 <div className="reports-info-card">
// //                   <div className="reports-card-header beige">
// //                     <h4>📍 Location</h4>
// //                   </div>
// //                   <div className="reports-card-content">
// //                     <div className="reports-location-info">
// //                       <p>{report.location_address}</p>
// //                       <button
// //                         className="reports-btn map"
// //                         onClick={() => {
// //                           const encodedAddress = encodeURIComponent(report.location_address);
// //                           window.open(`https://maps.google.com/?q=${encodedAddress}`, '_blank');
// //                         }}
// //                       >
// //                         View on Map
// //                       </button>
// //                     </div>
// //                   </div>
// //                 </div>
// //               </div>

// //               <div className="reports-detail-column">
// //                 {/* Volunteer Assignment Card */}
// //                 <div className="reports-info-card">
// //                   <div className="reports-card-header beige">
// //                     <div className="reports-header-row">
// //                       <h4>🦸 Ranger Assignment</h4>
// //                       {!report.volunteer_name && !isDeclined && !isInProgress && !isCompleted && (
// //                         <button
// //                           className="reports-btn primary small"
// //                           onClick={onAssignClick}
// //                         >
// //                           + Assign Ranger
// //                         </button>
// //                       )}
// //                     </div>
// //                   </div>
// //                   <div className="reports-card-content">
// //                     {report.volunteer_name && !isDeclined ? (
// //                       <div className="reports-volunteer-assigned">
// //                         <div className="reports-assigned-volunteer">
// //                           <div className="reports-volunteer-avatar large">
// //                             {report.volunteer_name.charAt(0).toUpperCase()}
// //                           </div>
// //                           <div className="reports-assigned-info">
// //                             <h5>{report.volunteer_name}</h5>
// //                             <div className="reports-assigned-contact">
// //                               {report.volunteer_email && <span>{report.volunteer_email}</span>}
// //                               {report.volunteer_phone && <span>{report.volunteer_phone}</span>}
// //                             </div>
// //                           </div>
// //                         </div>
// //                         {!isInProgress && !isCompleted && (
// //                           <button
// //                             className="reports-btn unassign"
// //                             onClick={() => onUnassign(report.report_id)}
// //                           >
// //                             Unassign
// //                           </button>
// //                         )}
// //                         {isInProgress && (
// //                           <span className="reports-badge in-progress">In Progress</span>
// //                         )}
// //                         {isCompleted && (
// //                           <span className="reports-badge completed">Completed</span>
// //                         )}
// //                       </div>
// //                     ) : isDeclined ? (
// //                       <div className="reports-declined-container">
// //                         <div className="reports-declined-header">
// //                           <span className="reports-declined-icon">❌</span>
// //                           <div className="reports-declined-title">Mission Declined by Ranger</div>
// //                         </div>

// //                         {report.volunteer_name && (
// //                           <div className="reports-declined-volunteer">
// //                             <div className="reports-volunteer-avatar declined">
// //                               {report.volunteer_name.charAt(0).toUpperCase()}
// //                             </div>
// //                             <div className="reports-declined-volunteer-info">
// //                               <div className="reports-declined-volunteer-name">{report.volunteer_name}</div>
// //                               <div className="reports-declined-volunteer-contact">
// //                                 {report.volunteer_email && <span>{report.volunteer_email}</span>}
// //                                 {report.volunteer_phone && <span>{report.volunteer_phone}</span>}
// //                               </div>
// //                               {report.volunteer_responded_at && (
// //                                 <div className="reports-declined-time">
// //                                   Declined on {formatDate(report.volunteer_responded_at)}
// //                                 </div>
// //                               )}
// //                             </div>
// //                           </div>
// //                         )}

// //                         {report.declined_reason ? (
// //                           <div className="reports-declined-reason">
// //                             <div className="reports-declined-reason-label">Declined Reason:</div>
// //                             <div className="reports-declined-reason-text">"{report.declined_reason}"</div>
// //                           </div>
// //                         ) : (
// //                           <div className="reports-declined-reason empty">
// //                             <em>No reason provided</em>
// //                           </div>
// //                         )}

// //                         <button
// //                           className="reports-btn primary"
// //                           onClick={onAssignClick}
// //                         >
// //                           + Assign New Ranger
// //                         </button>
// //                       </div>
// //                     ) : (
// //                       <div className="reports-no-volunteer">
// //                         <span className="no-volunteer-emoji">🕊️</span>
// //                         <p>No ranger assigned yet</p>
// //                         <button
// //                           className="reports-btn text"
// //                           onClick={onAssignClick}
// //                         >
// //                           Click to assign a ranger
// //                         </button>
// //                       </div>
// //                     )}
// //                   </div>
// //                 </div>

// //                 {/* Evidence Photos Section */}
// //                 {report.task_id && evidence && evidence.length > 0 && (
// //                   <div className="reports-info-card">
// //                     <div className="reports-card-header beige">
// //                       <h4>📸 Evidence Photos</h4>
// //                     </div>
// //                     <div className="reports-card-content">
// //                       <p style={{ marginBottom: '10px', color: '#2D5A27', fontWeight: '600' }}>
// //                         {evidence.length} photo(s) uploaded
// //                       </p>
// //                       <div className="evidence-grid">
// //                         {evidence.map((proof) => {
// //                           const imageUrl = getFullImageUrl(proof.proof_url);
// //                           const hasError = imageErrors[proof.proof_id];

// //                           return (
// //                             <div
// //                               key={proof.proof_id}
// //                               className="evidence-item"
// //                               onClick={() => !hasError && setSelectedImage(imageUrl)}
// //                             >
// //                               {!hasError ? (
// //                                 <img
// //                                   src={imageUrl}
// //                                   alt={`Evidence ${proof.proof_id}`}
// //                                   className="evidence-image"
// //                                   onError={() => handleImageError(proof.proof_id, imageUrl)}
// //                                 />
// //                               ) : (
// //                                 <div className="evidence-image-placeholder">
// //                                   <span style={{ fontSize: '2rem', marginBottom: '5px' }}>📷</span>
// //                                   <span>Image unavailable</span>
// //                                 </div>
// //                               )}
// //                               <p className="evidence-date">
// //                                 Uploaded: {formatDate(proof.uploaded_at)}
// //                               </p>
// //                             </div>
// //                           );
// //                         })}
// //                       </div>
// //                     </div>
// //                   </div>
// //                 )}

// //                 {/* Completion Notes Section */}
// //                 {report.task_id && completionNotes && completionNotes.length > 0 && (
// //                   <div className="reports-info-card">
// //                     <div className="reports-card-header beige">
// //                       <h4>✅ Completion Notes</h4>
// //                     </div>
// //                     <div className="reports-card-content">
// //                       <div className="completion-notes-container">
// //                         {completionNotes.map((note) => (
// //                           <div key={note.note_id} className="completion-note-item">
// //                             <div className="completion-note-header">
// //                               <span className="completion-note-author">
// //                                 {note.volunteer_name || 'Volunteer'}
// //                               </span>
// //                               <span className="completion-note-time">
// //                                 {formatDate(note.created_at)}
// //                               </span>
// //                             </div>
// //                             <p className="completion-note-text">
// //                               {note.note_text}
// //                             </p>
// //                           </div>
// //                         ))}
// //                       </div>
// //                     </div>
// //                   </div>
// //                 )}

// //                 {/* Report Description Card */}
// //                 <div className="reports-info-card">
// //                   <div className="reports-card-header beige">
// //                     <h4>📝 Report Description</h4>
// //                   </div>
// //                   <div className="reports-card-content">
// //                     <div className="reports-description">
// //                       <p>{report.description}</p>
// //                     </div>
// //                     {report.user_note && (
// //                       <div className="reports-user-note">
// //                         <div className="note-label">Reporter's Note:</div>
// //                         <p>{report.user_note}</p>
// //                       </div>
// //                     )}
// //                   </div>
// //                 </div>

// //                 {/* Admin Notes Card */}
// //                 <div className="reports-info-card">
// //                   <div className="reports-card-header beige">
// //                     <h4>📌 Admin Notes</h4>
// //                   </div>
// //                   <div className="reports-card-content">
// //                     <form onSubmit={handleSaveNote} className="reports-notes-form">
// //                       <textarea
// //                         className="reports-notes-input"
// //                         placeholder={
// //                           isInProgress
// //                             ? "Notes disabled - mission is in progress"
// //                             : isCompleted
// //                               ? "Notes disabled - mission is completed"
// //                               : "Add internal notes about this rescue mission..."
// //                         }
// //                         value={localAdminNote}
// //                         onChange={(e) => setLocalAdminNote(e.target.value)}
// //                         rows={3}
// //                         disabled={isInProgress || isCompleted}
// //                       />
// //                       <div className="reports-notes-actions">
// //                         <button
// //                           type="submit"
// //                           className="reports-btn save"
// //                           disabled={savingNote || !localAdminNote.trim() || isInProgress || isCompleted}
// //                         >
// //                           {savingNote ? 'Saving...' : 'Save Note'}
// //                         </button>
// //                         {(isInProgress || isCompleted) && (
// //                           <span className="reports-note-disabled-hint">
// //                             {isCompleted
// //                               ? 'Notes disabled - mission completed'
// //                               : 'Notes disabled - mission in progress'}
// //                           </span>
// //                         )}
// //                       </div>
// //                     </form>
// //                   </div>
// //                 </div>
// //               </div>
// //             </div>

// //             {/* Image Lightbox */}
// //             {selectedImage && (
// //               <div
// //                 className="image-lightbox"
// //                 onClick={() => setSelectedImage(null)}
// //               >
// //                 <img
// //                   src={selectedImage}
// //                   alt="Enlarged evidence"
// //                 />
// //                 <button
// //                   className="lightbox-close"
// //                   onClick={() => setSelectedImage(null)}
// //                 >
// //                   ×
// //                 </button>
// //               </div>
// //             )}
// //           </div>

// //           <div className="reports-modal-footer">
// //             <button className="reports-btn secondary" onClick={onClose}>
// //               Close
// //             </button>
// //           </div>
// //         </div>
// //       </div>
// //     );
// //   };

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
// //   const [taskEvidence, setTaskEvidence] = useState<{ [key: number]: TaskProof[] }>({});
// //   const [taskCompletionNotes, setTaskCompletionNotes] = useState<{ [key: number]: CompletionNote[] }>({});

// //   // Pagination state
// //   const [currentPage, setCurrentPage] = useState(1);
// //   const [itemsPerPage] = useState(9);

// //   // Fetch status list from database
// //   const fetchStatusList = useCallback(async () => {
// //     try {
// //       const token = sessionStorage.getItem('token') || localStorage.getItem('token');
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
// //       const token = sessionStorage.getItem('token') || localStorage.getItem('token');
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
// //       const token = sessionStorage.getItem('token') || localStorage.getItem('token');
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

// //       const token = sessionStorage.getItem('token') || localStorage.getItem('token');
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

// //       const token = sessionStorage.getItem('token') || localStorage.getItem('token');
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
// //       const token = sessionStorage.getItem('token') || localStorage.getItem('token');
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
// //       const token = sessionStorage.getItem('token') || localStorage.getItem('token');
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
// //       switch (sortBy) {
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

// //       {/* Filters - IMPROVED UI */}
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
// //             <div className="reports-select-wrapper">
// //               <select
// //                 value={filterStatus}
// //                 onChange={(e) => setFilterStatus(e.target.value)}
// //                 className="reports-filter-select"
// //               >
// //                 <option value="all">All Status</option>
// //                 <option value="submitted">Submitted</option>
// //                 <option value="assigned">Assigned</option>
// //                 <option value="in-progress">In Progress</option>
// //                 <option value="completed">Completed</option>
// //                 <option value="declined">Declined</option>
// //               </select>
// //               <span className="reports-select-arrow">▼</span>
// //             </div>
// //           </div>

// //           <div className="reports-filter-group">
// //             <label className="reports-filter-label">Sort By</label>
// //             <div className="reports-select-wrapper">
// //               <select
// //                 value={sortBy}
// //                 onChange={(e) => setSortBy(e.target.value)}
// //                 className="reports-filter-select"
// //               >
// //                 <option value="recent">Most Recent</option>
// //                 <option value="oldest">Oldest</option>
// //                 <option value="critical">Critical First</option>
// //                 <option value="status">By Status</option>
// //               </select>
// //               <span className="reports-select-arrow">▼</span>
// //             </div>
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
// //                   ? `No missions with status "${filterStatus}"`
// //                   : 'No rescue missions have been reported yet.'}
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

// //                       {/* Evidence indicator - Compact mint oval */}
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
//         const token = sessionStorage.getItem('token') || localStorage.getItem('token');
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
//       const token = sessionStorage.getItem('token') || localStorage.getItem('token');
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
//       const token = sessionStorage.getItem('token') || localStorage.getItem('token');
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
//       const token = sessionStorage.getItem('token') || localStorage.getItem('token');
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

//       const token = sessionStorage.getItem('token') || localStorage.getItem('token');
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

//       const token = sessionStorage.getItem('token') || localStorage.getItem('token');
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
//       const token = sessionStorage.getItem('token') || localStorage.getItem('token');
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
//       const token = sessionStorage.getItem('token') || localStorage.getItem('token');
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

//   // ===== NEW EXPORT CSV FUNCTION =====
//   const exportToCSV = () => {
//     try {
//       // Prepare the data for export
//       const exportData = reports.map(report => ({
//         'Report ID': report.report_id,
//         'Status': getStatusName(report.status_id, report.status_name),
//         'Animal Type': report.animal_type,
//         'Condition': report.animal_condition,
//         'Location': report.location_address,
//         'Reporter': report.username,
//         'Reporter Email': report.email,
//         'Reporter Phone': report.phone,
//         'Assigned Ranger': report.volunteer_name || 'Not assigned',
//         'Ranger Email': report.volunteer_email || '',
//         'Ranger Phone': report.volunteer_phone || '',
//         'Submitted Date': formatDate(report.submitted_at),
//         'Description': report.description.replace(/,/g, ';'), // Remove commas to avoid CSV issues
//         'User Note': (report.user_note || '').replace(/,/g, ';'),
//         'Admin Note': (report.admin_note || '').replace(/,/g, ';'),
//         'Declined Reason': report.declined_reason || '',
//         'Has Evidence': report.task_id && taskEvidence[report.task_id]?.length > 0 ? 'Yes' : 'No',
//         'Evidence Count': report.task_id ? (taskEvidence[report.task_id]?.length || 0) : 0
//       }));

//       if (exportData.length === 0) {
//         showMessage('No data to export', 'error');
//         return;
//       }

//       // Get headers
//       const headers = Object.keys(exportData[0]);

//       // Convert to CSV
//       const csvContent = [
//         headers.join(','),
//         ...exportData.map(row => 
//           headers.map(header => {
//             const value = row[header as keyof typeof row];
//             // Handle values that might contain commas
//             if (typeof value === 'string' && value.includes(',')) {
//               return `"${value}"`;
//             }
//             return value;
//           }).join(',')
//         )
//       ].join('\n');

//       // Create download link
//       const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
//       const link = document.createElement('a');
//       const url = URL.createObjectURL(blob);
//       link.setAttribute('href', url);
//       link.setAttribute('download', `rescue_reports_${new Date().toISOString().split('T')[0]}.csv`);
//       link.style.visibility = 'hidden';
//       document.body.appendChild(link);
//       link.click();
//       document.body.removeChild(link);
//       URL.revokeObjectURL(url);

//       showMessage(`Exported ${exportData.length} reports successfully!`, 'success');
//     } catch (error) {
//       console.error('Error exporting CSV:', error);
//       showMessage('Failed to export CSV', 'error');
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
//           <button 
//             onClick={fetchReports} 
//             className="reports-btn refresh" 
//             title="Refresh data"
//           >
//             <span className="btn-icon">↻</span>
//           </button>
//           <button 
//             onClick={exportToCSV} 
//             className="reports-btn primary"
//             disabled={reports.length === 0}
//             title="Export to CSV"
//           >
//             <span className="btn-icon">📊</span>
//             Export CSV
//           </button>
//         </div>
//       </div>

//       {/* Filters - IMPROVED UI */}
//       <div className="reports-filters-card">
//         <div className="reports-search-wrapper">
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

// import React, { useEffect, useState, useCallback } from 'react';
// import './RescueReports.css';
// import L from 'leaflet';
// import 'leaflet/dist/leaflet.css';
// import { MapContainer, TileLayer, Marker, Polyline, Popup } from 'react-leaflet';

// // Fix for default marker icons in React-Leaflet
// import icon from 'leaflet/dist/images/marker-icon.png';
// import iconShadow from 'leaflet/dist/images/marker-shadow.png';

// let DefaultIcon = L.icon({
//   iconUrl: icon,
//   shadowUrl: iconShadow,
//   iconSize: [25, 41],
//   iconAnchor: [12, 41]
// });
// L.Marker.prototype.options.icon = DefaultIcon;

// // Custom icons
// const startIcon = L.divIcon({
//   html: '🏁',
//   className: 'custom-marker start-marker',
//   iconSize: [30, 30],
//   popupAnchor: [0, -15]
// });

// const endIcon = L.divIcon({
//   html: '📍',
//   className: 'custom-marker end-marker',
//   iconSize: [30, 30],
//   popupAnchor: [0, -15]
// });

// const liveIcon = L.divIcon({
//   html: '🔴',
//   className: 'custom-marker live-marker',
//   iconSize: [30, 30],
//   popupAnchor: [0, -15]
// });

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

// // Tracking interfaces
// interface TrackingPoint {
//   tracking_id: number;
//   task_id: number;
//   volunteer_id: number;
//   latitude: number;
//   longitude: number;
//   accuracy: number;
//   timestamp: string;
//   synced: number;
//   volunteer_name?: string;
// }

// interface TrackingStats {
//   pointCount: number;
//   startTime: string | null;
//   lastSeen: string | null;
//   distance: number;
//   lastLat?: number;
//   lastLng?: number;
//   pendingPoints: number;
//   isLive: boolean;
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

// // ── Confirm Modal interface ──
// interface ConfirmModal {
//   show: boolean;
//   title: string;
//   message: string;
//   confirmText: string;
//   confirmColor: string;
//   onConfirm: () => void;
// }

// const CONFIRM_CLOSED: ConfirmModal = {
//   show: false, title: '', message: '',
//   confirmText: 'Confirm', confirmColor: '#c62828', onConfirm: () => {}
// };

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

// // Helper function to calculate distance between coordinates
// const calculateDistance = (lat1: number, lng1: number, lat2: number, lng2: number): number => {
//   const R = 6371;
//   const dLat = (lat2 - lat1) * Math.PI / 180;
//   const dLng = (lng2 - lng1) * Math.PI / 180;
//   const a =
//     Math.sin(dLat/2) * Math.sin(dLat/2) +
//     Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) *
//     Math.sin(dLng/2) * Math.sin(dLng/2);
//   const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
//   return R * c;
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
//                           <button className="reports-btn assign-disabled" disabled>
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

// // Report Detail Modal Component
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

//     // TRACKING STATE
//     const [trackingPoints, setTrackingPoints] = useState<TrackingPoint[]>([]);
//     const [trackingStats, setTrackingStats] = useState<TrackingStats>({
//       pointCount: 0,
//       startTime: null,
//       lastSeen: null,
//       distance: 0,
//       pendingPoints: 0,
//       isLive: false
//     });
//     const [loadingTracking, setLoadingTracking] = useState(false);
//     const [showTrackingDetails, setShowTrackingDetails] = useState(true);
//     const [autoRefresh, setAutoRefresh] = useState(false);
//     const [refreshInterval, setRefreshInterval] = useState<NodeJS.Timeout | null>(null);
//     const [mapKey, setMapKey] = useState(0);

//     useEffect(() => {
//       if (report) {
//         setLocalAdminNote(report.admin_note || '');
//       }
//     }, [report]);

//     useEffect(() => {
//       if (report?.task_id && isOpen) {
//         fetchTrackingData(report.task_id);

//         if (autoRefresh) {
//           const interval = setInterval(() => {
//             fetchTrackingData(report.task_id!);
//             setMapKey(prev => prev + 1);
//           }, 5000);
//           setRefreshInterval(interval);

//           return () => {
//             if (interval) clearInterval(interval);
//           };
//         }
//       }

//       return () => {
//         if (refreshInterval) {
//           clearInterval(refreshInterval);
//         }
//       };
//     }, [report?.task_id, isOpen, autoRefresh]);

//     const fetchTrackingData = async (taskId: number) => {
//       try {
//         setLoadingTracking(true);
//         const token = sessionStorage.getItem('token') || localStorage.getItem('token');

//         if (!token) {
//           setLoadingTracking(false);
//           return;
//         }

//         const endpoints = [
//           `http://localhost:5000/api/tasks/${taskId}/tracking`,
//           `http://localhost:5000/api/admin/tracking/route/${taskId}`,
//           `http://localhost:5000/api/volunteer/tracking/task/${taskId}`
//         ];

//         let success = false;
//         let trackingData = null;

//         for (const url of endpoints) {
//           try {
//             const response = await fetch(url, {
//               headers: { 'Authorization': `Bearer ${token}` }
//             });
//             if (response.ok) {
//               const data = await response.json();
//               if (data.success && data.data) {
//                 trackingData = data.data;
//                 success = true;
//                 break;
//               }
//             }
//           } catch (e) {
//             console.log(`Failed for endpoint: ${url}`);
//           }
//         }

//         if (success && trackingData && trackingData.length > 0) {
//           const points: TrackingPoint[] = trackingData.map((point: any) => ({
//             tracking_id: point.tracking_id,
//             task_id: point.task_id,
//             volunteer_id: point.volunteer_id,
//             latitude: parseFloat(point.latitude),
//             longitude: parseFloat(point.longitude),
//             accuracy: point.accuracy || 0,
//             timestamp: point.timestamp,
//             synced: point.synced || 1,
//             volunteer_name: point.volunteer_name
//           }));

//           setTrackingPoints(points);
//           setMapKey(prev => prev + 1);

//           const sortedPoints = [...points].sort((a, b) =>
//             new Date(a.timestamp).getTime() - new Date(b.timestamp).getTime()
//           );

//           const startTime = new Date(sortedPoints[0].timestamp);
//           const lastSeen = new Date(sortedPoints[sortedPoints.length - 1].timestamp);

//           let distance = 0;
//           for (let i = 1; i < sortedPoints.length; i++) {
//             const prev = sortedPoints[i-1];
//             const curr = sortedPoints[i];
//             distance += calculateDistance(prev.latitude, prev.longitude, curr.latitude, curr.longitude);
//           }

//           const pendingPoints = points.filter(p => !p.synced).length;
//           const isLive = (Date.now() - lastSeen.getTime()) < 300000;
//           const lastPoint = sortedPoints[sortedPoints.length - 1];

//           setTrackingStats({
//             pointCount: points.length,
//             startTime: startTime.toLocaleTimeString(),
//             lastSeen: lastSeen.toLocaleTimeString(),
//             distance: Math.round(distance * 10) / 10,
//             lastLat: lastPoint.latitude,
//             lastLng: lastPoint.longitude,
//             pendingPoints,
//             isLive
//           });
//         } else {
//           setTrackingPoints([]);
//           setTrackingStats({ pointCount: 0, startTime: null, lastSeen: null, distance: 0, pendingPoints: 0, isLive: false });
//         }
//       } catch (error) {
//         console.error('Error fetching tracking:', error);
//       } finally {
//         setLoadingTracking(false);
//       }
//     };

//     const toggleAutoRefresh = () => setAutoRefresh(!autoRefresh);

//     if (!isOpen || !report) return null;

//     const handleSaveNote = async (e: React.FormEvent) => {
//       e.preventDefault();
//       if (!localAdminNote.trim()) { showMessage('Please enter a note', 'error'); return; }

//       try {
//         const token = sessionStorage.getItem('token') || localStorage.getItem('token');
//         if (!token) { showMessage('Please login first', 'error'); return; }
//         setSavingNote(true);

//         const response = await fetch(`http://localhost:5000/api/reports/${report.report_id}/admin-note`, {
//           method: 'POST',
//           headers: { 'Authorization': `Bearer ${token}`, 'Content-Type': 'application/json' },
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
//         showMessage(error.message || 'Error saving note. Please try again.', 'error');
//       } finally {
//         setSavingNote(false);
//       }
//     };

//     const handleImageError = (proofId: number, url: string) => {
//       setImageErrors(prev => ({ ...prev, [proofId]: true }));
//     };

//     const statusDisplay = getStatusName(report.status_id, report.status_name);
//     const isDeclined = report.status_id === 5;
//     const isInProgress = report.status_id === 3;
//     const isCompleted = report.status_id === 4;
//     const showTracking = !!report.task_id && (isInProgress || isCompleted);
//     const positions: [number, number][] = trackingPoints.map(point => [point.latitude, point.longitude]);

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
//                 <div className="reports-info-card">
//                   <div className="reports-card-header beige"><h4>🐾 Animal Information</h4></div>
//                   <div className="reports-card-content">
//                     <div className="reports-animal-display">
//                       <div className="reports-animal-icon">{getAnimalEmoji(report.animal_type)}</div>
//                       <div className="reports-animal-details">
//                         <div className="reports-animal-type">{report.animal_type}</div>
//                         <div className="reports-animal-condition">
//                           <span className="condition-tag">{report.animal_condition}</span>
//                         </div>
//                       </div>
//                     </div>
//                   </div>
//                 </div>

//                 <div className="reports-info-card">
//                   <div className="reports-card-header beige"><h4>👤 Reporter Details</h4></div>
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

//                 <div className="reports-info-card">
//                   <div className="reports-card-header beige"><h4>📍 Location</h4></div>
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

//                 <div className="reports-info-card">
//                   <div className="reports-card-header beige"><h4>⏱️ Timeline</h4></div>
//                   <div className="reports-card-content">
//                     <div className="reports-detail-list">
//                       <div className="reports-detail-row">
//                         <span className="reports-detail-label">Reported</span>
//                         <span className="reports-detail-value">{formatDate(report.submitted_at)}</span>
//                       </div>
//                       <div className="reports-detail-row">
//                         <span className="reports-detail-label">Assigned to</span>
//                         <span className="reports-detail-value">{report.volunteer_name || 'Not assigned'}</span>
//                       </div>
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
//                         <button className="reports-btn primary small" onClick={onAssignClick}>
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
//                         {isInProgress && <span className="reports-badge in-progress">In Progress</span>}
//                         {isCompleted && <span className="reports-badge completed">Completed</span>}
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
//                           <div className="reports-declined-reason empty"><em>No reason provided</em></div>
//                         )}
//                         <button className="reports-btn primary" onClick={onAssignClick}>
//                           + Assign New Ranger
//                         </button>
//                       </div>
//                     ) : (
//                       <div className="reports-no-volunteer">
//                         <span className="no-volunteer-emoji">🕊️</span>
//                         <p>No ranger assigned yet</p>
//                         <button className="reports-btn text" onClick={onAssignClick}>
//                           Click to assign a ranger
//                         </button>
//                       </div>
//                     )}
//                   </div>
//                 </div>

//                 {/* TRACKING MAP SECTION */}
//                 {showTracking && (
//                   <div className="reports-info-card tracking-card">
//                     <div className="reports-card-header beige">
//                       <div className="reports-header-row">
//                         <h4><span className="tracking-icon">🗺️</span> Live Tracking</h4>
//                         <div className="tracking-controls">
//                           <button
//                             className={`tracking-refresh-btn ${autoRefresh ? 'active' : ''}`}
//                             onClick={toggleAutoRefresh}
//                           >
//                             <span className="refresh-icon">↻</span>
//                             {autoRefresh ? 'Auto' : 'Manual'}
//                           </button>
//                           <button
//                             className="tracking-refresh-btn"
//                             onClick={() => { if (report.task_id) { fetchTrackingData(report.task_id); setMapKey(prev => prev + 1); } }}
//                           >
//                             <span className="refresh-icon">↻</span>
//                           </button>
//                           <span
//                             className={`tracking-expand-icon ${showTrackingDetails ? 'expanded' : ''}`}
//                             onClick={() => setShowTrackingDetails(!showTrackingDetails)}
//                           >▼</span>
//                         </div>
//                       </div>
//                     </div>

//                     {showTrackingDetails && (
//                       <div className="reports-card-content">
//                         {loadingTracking ? (
//                           <div className="tracking-loading-state">
//                             <div className="reports-spinner small"></div>
//                             <p>Loading tracking data...</p>
//                           </div>
//                         ) : trackingPoints.length > 0 ? (
//                           <div className="tracking-container">
//                             <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '16px' }}>
//                               <div style={{ width: '10px', height: '10px', borderRadius: '50%', backgroundColor: trackingStats.isLive ? '#4caf50' : '#9e9e9e', boxShadow: trackingStats.isLive ? '0 0 8px #4caf50' : 'none' }} />
//                               <span style={{ fontSize: '0.85rem', fontWeight: 500, color: trackingStats.isLive ? '#2e7d32' : '#757575' }}>
//                                 {trackingStats.isLive ? 'Ranger is active' : 'Ranger offline'}
//                               </span>
//                               {trackingStats.isLive && <span style={{ fontSize: '0.7rem', color: '#666', marginLeft: 'auto' }}>Last seen: {trackingStats.lastSeen}</span>}
//                             </div>
//                             <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '8px', marginBottom: '16px' }}>
//                               {[['Points', trackingStats.pointCount], ['Distance', `${trackingStats.distance} km`], ['Started', trackingStats.startTime || 'N/A'], ['Last update', trackingStats.lastSeen || 'N/A']].map(([label, value]) => (
//                                 <div key={label as string} style={{ background: '#f5f5f5', padding: '10px', borderRadius: '8px', textAlign: 'center' }}>
//                                   <div style={{ fontSize: '0.7rem', color: '#666', marginBottom: '4px' }}>{label}</div>
//                                   <div style={{ fontSize: '1rem', fontWeight: 600, color: '#2D5A27' }}>{value}</div>
//                                 </div>
//                               ))}
//                             </div>
//                             <div style={{ height: '300px', marginBottom: '16px', borderRadius: '8px', overflow: 'hidden', border: '1px solid #e0e0e0' }}>
//                               {positions.length > 0 && (
//                                 <MapContainer key={mapKey} center={positions[positions.length - 1]} zoom={15} style={{ height: '100%', width: '100%' }}>
//                                   <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" attribution='&copy; OpenStreetMap' />
//                                   <Polyline positions={positions} color="#2D5A27" weight={4} opacity={0.7} />
//                                   <Marker position={positions[0]} icon={startIcon}>
//                                     <Popup><strong>Start</strong><br />{new Date(trackingPoints[0].timestamp).toLocaleString()}</Popup>
//                                   </Marker>
//                                   <Marker position={positions[positions.length - 1]} icon={trackingStats.isLive ? liveIcon : endIcon}>
//                                     <Popup><strong>{trackingStats.isLive ? 'Current' : 'Last seen'}</strong><br />{new Date(trackingPoints[trackingPoints.length - 1].timestamp).toLocaleString()}</Popup>
//                                   </Marker>
//                                 </MapContainer>
//                               )}
//                             </div>
//                           </div>
//                         ) : (
//                           <div style={{ textAlign: 'center', padding: '40px 20px', background: '#fafafa', borderRadius: '8px' }}>
//                             <span style={{ fontSize: '2.5rem', display: 'block', marginBottom: '12px' }}>📡</span>
//                             <p style={{ color: '#666', marginBottom: '8px' }}>No tracking data available</p>
//                             <button className="reports-btn primary small" onClick={() => report.task_id && fetchTrackingData(report.task_id)}>Refresh</button>
//                           </div>
//                         )}
//                       </div>
//                     )}

//                     {!showTrackingDetails && (
//                       <div className="reports-card-content" style={{ padding: '12px' }}>
//                         <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
//                           <div style={{ width: '8px', height: '8px', borderRadius: '50%', backgroundColor: trackingStats.isLive ? '#4caf50' : '#9e9e9e' }} />
//                           <span style={{ fontSize: '0.85rem' }}>{trackingStats.isLive ? 'Live' : 'Last seen'}: {trackingStats.lastSeen || 'N/A'}</span>
//                         </div>
//                       </div>
//                     )}
//                   </div>
//                 )}

//                 {/* Evidence Photos */}
//                 {report.task_id && evidence && evidence.length > 0 && (
//                   <div className="reports-info-card">
//                     <div className="reports-card-header beige"><h4>📸 Evidence Photos</h4></div>
//                     <div className="reports-card-content">
//                       <p style={{ marginBottom: '10px', color: '#2D5A27', fontWeight: '600' }}>{evidence.length} photo(s) uploaded</p>
//                       <div className="evidence-grid">
//                         {evidence.map((proof) => {
//                           const imageUrl = getFullImageUrl(proof.proof_url);
//                           const hasError = imageErrors[proof.proof_id];
//                           return (
//                             <div key={proof.proof_id} className="evidence-item" onClick={() => !hasError && setSelectedImage(imageUrl)}>
//                               {!hasError ? (
//                                 <img src={imageUrl} alt={`Evidence ${proof.proof_id}`} className="evidence-image" onError={() => handleImageError(proof.proof_id, imageUrl)} />
//                               ) : (
//                                 <div className="evidence-image-placeholder">
//                                   <span style={{ fontSize: '2rem', marginBottom: '5px' }}>📷</span>
//                                   <span>Image unavailable</span>
//                                 </div>
//                               )}
//                               <p className="evidence-date">Uploaded: {formatDate(proof.uploaded_at)}</p>
//                             </div>
//                           );
//                         })}
//                       </div>
//                     </div>
//                   </div>
//                 )}

//                 {/* Completion Notes */}
//                 {report.task_id && completionNotes && completionNotes.length > 0 && (
//                   <div className="reports-info-card">
//                     <div className="reports-card-header beige"><h4>✅ Completion Notes</h4></div>
//                     <div className="reports-card-content">
//                       <div className="completion-notes-container">
//                         {completionNotes.map((note) => (
//                           <div key={note.note_id} className="completion-note-item">
//                             <div className="completion-note-header">
//                               <span className="completion-note-author">{note.volunteer_name || 'Volunteer'}</span>
//                               <span className="completion-note-time">{formatDate(note.created_at)}</span>
//                             </div>
//                             <p className="completion-note-text">{note.note_text}</p>
//                           </div>
//                         ))}
//                       </div>
//                     </div>
//                   </div>
//                 )}

//                 {/* Report Description */}
//                 <div className="reports-info-card">
//                   <div className="reports-card-header beige"><h4>📝 Report Description</h4></div>
//                   <div className="reports-card-content">
//                     <div className="reports-description"><p>{report.description}</p></div>
//                     {report.user_note && (
//                       <div className="reports-user-note">
//                         <div className="note-label">Reporter's Note:</div>
//                         <p>{report.user_note}</p>
//                       </div>
//                     )}
//                   </div>
//                 </div>

//                 {/* Admin Notes */}
//                 <div className="reports-info-card">
//                   <div className="reports-card-header beige"><h4>📌 Admin Notes</h4></div>
//                   <div className="reports-card-content">
//                     <form onSubmit={handleSaveNote} className="reports-notes-form">
//                       <textarea
//                         className="reports-notes-input"
//                         placeholder={isInProgress ? "Notes disabled - mission is in progress" : isCompleted ? "Notes disabled - mission is completed" : "Add internal notes about this rescue mission..."}
//                         value={localAdminNote}
//                         onChange={(e) => setLocalAdminNote(e.target.value)}
//                         rows={3}
//                         disabled={isInProgress || isCompleted}
//                       />
//                       <div className="reports-notes-actions">
//                         <button type="submit" className="reports-btn save" disabled={savingNote || !localAdminNote.trim() || isInProgress || isCompleted}>
//                           {savingNote ? 'Saving...' : 'Save Note'}
//                         </button>
//                         {(isInProgress || isCompleted) && (
//                           <span className="reports-note-disabled-hint">
//                             {isCompleted ? 'Notes disabled - mission completed' : 'Notes disabled - mission in progress'}
//                           </span>
//                         )}
//                       </div>
//                     </form>
//                   </div>
//                 </div>
//               </div>
//             </div>

//             {selectedImage && (
//               <div className="image-lightbox" onClick={() => setSelectedImage(null)}>
//                 <img src={selectedImage} alt="Enlarged evidence" />
//                 <button className="lightbox-close" onClick={() => setSelectedImage(null)}>×</button>
//               </div>
//             )}
//           </div>

//           <div className="reports-modal-footer">
//             <button className="reports-btn secondary" onClick={onClose}>Close</button>
//           </div>
//         </div>
//       </div>
//     );
//   };

// // ── Main Component ──
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

//   // ── Custom Confirm Modal state ──
//   const [confirmModal, setConfirmModal] = useState<ConfirmModal>(CONFIRM_CLOSED);

//   const showConfirm = (
//     title: string,
//     message: string,
//     onConfirm: () => void,
//     confirmText = 'Confirm',
//     confirmColor = '#c62828'
//   ) => {
//     setConfirmModal({ show: true, title, message, confirmText, confirmColor, onConfirm });
//   };

//   const [taskEvidence, setTaskEvidence] = useState<{ [key: number]: TaskProof[] }>({});
//   const [taskCompletionNotes, setTaskCompletionNotes] = useState<{ [key: number]: CompletionNote[] }>({});
//   const [currentPage, setCurrentPage] = useState(1);
//   const [itemsPerPage] = useState(9);

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

//   const showMessage = (text: string, type: 'success' | 'error') => {
//     setMessage(text);
//     if (type === 'success') setShowSuccessMessage(true);
//     else setShowErrorMessage(true);
//     setTimeout(() => {
//       setShowSuccessMessage(false);
//       setShowErrorMessage(false);
//       setMessage('');
//     }, 3000);
//   };

//   const fetchReports = useCallback(async () => {
//     try {
//       setLoading(true);
//       const token = sessionStorage.getItem('token') || localStorage.getItem('token');
//       if (!token) { showMessage('Please login first', 'error'); setLoading(false); return; }

//       const response = await fetch('http://localhost:5000/api/reports/admin/all', {
//         headers: { 'Authorization': `Bearer ${token}`, 'Content-Type': 'application/json' }
//       });

//       if (response.ok) {
//         const data = await response.json();
//         if (data.success) {
//           const mappedReports: RescueReport[] = (data.data || []).map((report: any) => ({
//             report_id: report.report_id,
//             user_id: report.user_id,
//             username: report.reporter_name || 'Anonymous',
//             email: report.email || 'No email',
//             phone: report.reporter_phone || 'No phone',
//             description: report.description,
//             location_address: report.location_address,
//             user_note: report.user_note,
//             admin_note: report.admin_note,
//             submitted_at: report.submitted_at,
//             animal_type: report.animal_type || 'Unknown',
//             animal_condition: report.animal_condition || 'Unknown',
//             status_id: report.status_id || 1,
//             status_name: report.status_name,
//             volunteer_id: report.volunteer_id,
//             volunteer_name: report.volunteer_name,
//             volunteer_email: report.volunteer_email,
//             volunteer_phone: report.volunteer_phone,
//             task_id: report.task_id,
//             task_status: report.task_status,
//             declined_reason: report.declined_reason,
//             volunteer_responded_at: report.volunteer_responded_at,
//             volunteer_response: report.volunteer_response
//           }));
//           setReports(mappedReports);
//           setCurrentPage(1);
//         } else {
//           showMessage(data.message || 'Failed to load reports', 'error');
//         }
//       } else {
//         showMessage('Failed to fetch reports', 'error');
//       }
//     } catch (error: any) {
//       showMessage('Error loading reports. Please check your connection.', 'error');
//     } finally {
//       setLoading(false);
//     }
//   }, []);

//   const fetchVolunteers = useCallback(async () => {
//     try {
//       setLoadingVolunteers(true);
//       const token = sessionStorage.getItem('token') || localStorage.getItem('token');
//       if (!token) { setVolunteers([]); setLoadingVolunteers(false); return; }

//       const response = await fetch('http://localhost:5000/api/volunteers/available', {
//         headers: { 'Authorization': `Bearer ${token}`, 'Content-Type': 'application/json' }
//       });

//       if (response.ok) {
//         const data = await response.json();
//         if (data.success) {
//           setVolunteers((data.data || []).map((volunteer: any) => ({
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
//           })));
//         } else {
//           setVolunteers([]);
//         }
//       } else {
//         setVolunteers([]);
//       }
//     } catch (error) {
//       setVolunteers([]);
//     } finally {
//       setLoadingVolunteers(false);
//     }
//   }, []);

//   const fetchTaskEvidence = async (taskId: number) => {
//     try {
//       const token = sessionStorage.getItem('token') || localStorage.getItem('token');
//       const response = await fetch(`http://localhost:5000/api/tasks/${taskId}/evidence`, {
//         headers: { 'Authorization': `Bearer ${token}` }
//       });
//       const data = await response.json();
//       if (data.success) setTaskEvidence(prev => ({ ...prev, [taskId]: data.data }));
//     } catch (error) {
//       console.error('Error fetching evidence:', error);
//     }
//   };

//   const fetchTaskCompletionNotes = async (taskId: number) => {
//     try {
//       const token = sessionStorage.getItem('token') || localStorage.getItem('token');
//       const response = await fetch(`http://localhost:5000/api/tasks/${taskId}/completion-notes`, {
//         headers: { 'Authorization': `Bearer ${token}` }
//       });
//       const data = await response.json();
//       if (data.success) setTaskCompletionNotes(prev => ({ ...prev, [taskId]: data.data }));
//     } catch (error) {
//       console.error('Error fetching completion notes:', error);
//     }
//   };

//   const handleViewTaskDetails = async (report: RescueReport) => {
//     setSelectedReport(report);
//     if (report.task_id) {
//       await Promise.all([fetchTaskEvidence(report.task_id), fetchTaskCompletionNotes(report.task_id)]);
//     }
//     setIsModalOpen(true);
//   };

//   useEffect(() => {
//     fetchReports();
//     fetchVolunteers();
//   }, [fetchReports, fetchVolunteers]);

//   const assignVolunteer = async (reportId: number, volunteerId: number, volunteerName: string) => {
//     try {
//       const token = sessionStorage.getItem('token') || localStorage.getItem('token');
//       if (!token) { showMessage('Please login first', 'error'); return; }

//       const response = await fetch(`http://localhost:5000/api/reports/${reportId}/assign`, {
//         method: 'POST',
//         headers: { 'Authorization': `Bearer ${token}`, 'Content-Type': 'application/json' },
//         body: JSON.stringify({ volunteer_id: volunteerId })
//       });

//       if (response.ok) {
//         const volunteer = volunteers.find(v => v.user_id === volunteerId);
//         setReports(prev => prev.map(report =>
//           report.report_id === reportId
//             ? { ...report, volunteer_id: volunteerId, volunteer_name: volunteerName, volunteer_email: volunteer?.email || '', volunteer_phone: volunteer?.phone || '', status_id: 2, status_name: 'assigned', declined_reason: undefined, volunteer_responded_at: undefined }
//             : report
//         ));
//         setVolunteers(prev => prev.map(v =>
//           v.user_id === volunteerId ? { ...v, assigned_reports_count: (v.assigned_reports_count || 0) + 1 } : v
//         ));
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
//       showMessage(error.message || 'Error assigning ranger. Please try again.', 'error');
//     }
//   };

//   // ── unassignVolunteer now uses custom confirm modal ──
//   const unassignVolunteer = (reportId: number) => {
//     showConfirm(
//       'Unassign Ranger',
//       'Are you sure you want to unassign this ranger? The status will be reset to "Submitted".',
//       () => doUnassign(reportId),
//       'Unassign',
//       '#FF9F1C'
//     );
//   };

//   const doUnassign = async (reportId: number) => {
//     try {
//       const token = sessionStorage.getItem('token') || localStorage.getItem('token');
//       if (!token) { showMessage('Please login first', 'error'); return; }

//       const response = await fetch(`http://localhost:5000/api/reports/${reportId}/unassign`, {
//         method: 'PUT',
//         headers: { 'Authorization': `Bearer ${token}`, 'Content-Type': 'application/json' }
//       });

//       if (response.ok) {
//         const report = reports.find(r => r.report_id === reportId);
//         const volunteerId = report?.volunteer_id;

//         setReports(prev => prev.map(r =>
//           r.report_id === reportId
//             ? { ...r, volunteer_id: undefined, volunteer_name: undefined, volunteer_email: undefined, volunteer_phone: undefined, status_id: 1, status_name: 'submitted', declined_reason: undefined, volunteer_responded_at: undefined }
//             : r
//         ));

//         if (volunteerId) {
//           setVolunteers(prev => prev.map(v =>
//             v.user_id === volunteerId ? { ...v, assigned_reports_count: Math.max(0, (v.assigned_reports_count || 0) - 1) } : v
//           ));
//         }

//         showMessage('Ranger unassigned successfully!', 'success');
//         fetchReports();
//         fetchVolunteers();
//       } else {
//         const errorData = await response.json();
//         showMessage(errorData.message || 'Failed to unassign ranger', 'error');
//       }
//     } catch (error: any) {
//       showMessage(error.message || 'Error unassigning ranger. Please try again.', 'error');
//     }
//   };

//   const formatDate = (dateString: string): string => {
//     try {
//       return new Date(dateString).toLocaleDateString('en-US', {
//         month: 'short', day: 'numeric', year: 'numeric', hour: '2-digit', minute: '2-digit'
//       });
//     } catch { return 'Invalid date'; }
//   };

//   const formatVolunteerDate = (dateString: string): string => {
//     try {
//       return new Date(dateString).toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' });
//     } catch { return 'Invalid date'; }
//   };

//   const getStatusName = (statusId: number, statusName?: string): string => {
//     if (statusName) return statusName.split('_').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');
//     const statusMap: { [key: number]: string } = { 1: 'Submitted', 2: 'Assigned', 3: 'In Progress', 4: 'Completed', 5: 'Declined' };
//     return statusMap[statusId] || 'Unknown';
//   };

//   const exportToCSV = () => {
//     try {
//       const exportData = reports.map(report => ({
//         'Report ID': report.report_id,
//         'Status': getStatusName(report.status_id, report.status_name),
//         'Animal Type': report.animal_type,
//         'Condition': report.animal_condition,
//         'Location': report.location_address,
//         'Reporter': report.username,
//         'Reporter Email': report.email,
//         'Reporter Phone': report.phone,
//         'Assigned Ranger': report.volunteer_name || 'Not assigned',
//         'Ranger Email': report.volunteer_email || '',
//         'Ranger Phone': report.volunteer_phone || '',
//         'Submitted Date': formatDate(report.submitted_at),
//         'Description': report.description.replace(/,/g, ';'),
//         'User Note': (report.user_note || '').replace(/,/g, ';'),
//         'Admin Note': (report.admin_note || '').replace(/,/g, ';'),
//         'Declined Reason': report.declined_reason || '',
//         'Has Evidence': report.task_id && taskEvidence[report.task_id]?.length > 0 ? 'Yes' : 'No',
//         'Evidence Count': report.task_id ? (taskEvidence[report.task_id]?.length || 0) : 0
//       }));

//       if (exportData.length === 0) { showMessage('No data to export', 'error'); return; }

//       const headers = Object.keys(exportData[0]);
//       const csvContent = [
//         headers.join(','),
//         ...exportData.map(row =>
//           headers.map(header => {
//             const value = row[header as keyof typeof row];
//             return (typeof value === 'string' && value.includes(',')) ? `"${value}"` : value;
//           }).join(',')
//         )
//       ].join('\n');

//       const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
//       const link = document.createElement('a');
//       const url = URL.createObjectURL(blob);
//       link.setAttribute('href', url);
//       link.setAttribute('download', `rescue_reports_${new Date().toISOString().split('T')[0]}.csv`);
//       link.style.visibility = 'hidden';
//       document.body.appendChild(link);
//       link.click();
//       document.body.removeChild(link);
//       URL.revokeObjectURL(url);
//       showMessage(`Exported ${exportData.length} reports successfully!`, 'success');
//     } catch (error) {
//       showMessage('Failed to export CSV', 'error');
//     }
//   };

//   const filteredReports = reports
//     .filter(report => {
//       if (filterStatus !== 'all') {
//         const statusMap: { [key: string]: number } = { 'submitted': 1, 'assigned': 2, 'in-progress': 3, 'completed': 4, 'declined': 5 };
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
//         case 'recent': return new Date(b.submitted_at).getTime() - new Date(a.submitted_at).getTime();
//         case 'oldest': return new Date(a.submitted_at).getTime() - new Date(b.submitted_at).getTime();
//         case 'critical': {
//           const score = (c: string) => { const s = c?.toLowerCase() || ''; return s.includes('critical') ? 0 : s.includes('severe') ? 1 : s.includes('urgent') ? 2 : 3; };
//           return score(a.animal_condition) - score(b.animal_condition);
//         }
//         case 'status': return a.status_id - b.status_id;
//         default: return 0;
//       }
//     });

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
//       for (let i = 1; i <= totalPages; i++) pageNumbers.push(i);
//     } else {
//       if (currentPage <= 3) { for (let i = 1; i <= 5; i++) pageNumbers.push(i); }
//       else if (currentPage >= totalPages - 2) { for (let i = totalPages - 4; i <= totalPages; i++) pageNumbers.push(i); }
//       else { for (let i = currentPage - 2; i <= currentPage + 2; i++) pageNumbers.push(i); }
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

//       {/* ── Custom Confirm Modal ── */}
//       {confirmModal.show && (
//         <div style={{
//           position: 'fixed', top: 0, left: 0, right: 0, bottom: 0,
//           background: 'rgba(0,0,0,0.45)', zIndex: 99999,
//           display: 'flex', alignItems: 'center', justifyContent: 'center',
//           backdropFilter: 'blur(3px)'
//         }}>
//           <div style={{
//             background: 'white', borderRadius: '20px',
//             padding: '36px 32px', maxWidth: '420px', width: '90%',
//             boxShadow: '0 25px 50px rgba(0,0,0,0.2)',
//             border: '1px solid #e8dfc9', textAlign: 'center'
//           }}>
//             <div style={{ fontSize: '2.8rem', marginBottom: '14px' }}>⚠️</div>
//             <h3 style={{ color: '#2D5A27', margin: '0 0 10px', fontSize: '1.25rem', fontWeight: 700 }}>
//               {confirmModal.title}
//             </h3>
//             <p style={{ color: '#666', margin: '0 0 28px', lineHeight: 1.65, fontSize: '0.95rem' }}>
//               {confirmModal.message}
//             </p>
//             <div style={{ display: 'flex', gap: '12px', justifyContent: 'center' }}>
//               <button
//                 onClick={() => setConfirmModal(CONFIRM_CLOSED)}
//                 style={{
//                   padding: '11px 28px', borderRadius: '10px',
//                   border: '2px solid #e8dfc9', background: 'white',
//                   color: '#666', fontWeight: 600, cursor: 'pointer', fontSize: '0.9rem'
//                 }}
//                 onMouseEnter={e => (e.currentTarget.style.borderColor = '#2D5A27')}
//                 onMouseLeave={e => (e.currentTarget.style.borderColor = '#e8dfc9')}
//               >
//                 Cancel
//               </button>
//               <button
//                 onClick={() => { confirmModal.onConfirm(); setConfirmModal(CONFIRM_CLOSED); }}
//                 style={{
//                   padding: '11px 28px', borderRadius: '10px',
//                   border: 'none', background: confirmModal.confirmColor,
//                   color: 'white', fontWeight: 600, cursor: 'pointer', fontSize: '0.9rem'
//                 }}
//               >
//                 {confirmModal.confirmText}
//               </button>
//             </div>
//           </div>
//         </div>
//       )}

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
//           <p className="reports-subtitle">Manage and coordinate animal rescue missions with our ranger team</p>
//         </div>
//         <div className="reports-header-actions">
//           <button onClick={fetchReports} className="reports-btn refresh" title="Refresh data">
//             <span className="btn-icon">↻</span>
//           </button>
//           <button onClick={exportToCSV} className="reports-btn primary" disabled={reports.length === 0} title="Export to CSV">
//             <span className="btn-icon">📊</span>
//             Export CSV
//           </button>
//         </div>
//       </div>

//       {/* Filters */}
//       <div className="reports-filters-card">
//         <div className="reports-search-wrapper">
//           <input
//             type="text"
//             placeholder="Search by ID, animal, location, ranger, declined reason..."
//             value={searchQuery}
//             onChange={(e) => setSearchQuery(e.target.value)}
//             className="reports-search-input"
//           />
//           {searchQuery && (
//             <button className="reports-clear-search" onClick={() => setSearchQuery('')}>×</button>
//           )}
//         </div>

//         <div className="reports-filters-row">
//           <div className="reports-filter-group">
//             <label className="reports-filter-label">Status</label>
//             <div className="reports-select-wrapper">
//               <select value={filterStatus} onChange={(e) => setFilterStatus(e.target.value)} className="reports-filter-select">
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
//               <select value={sortBy} onChange={(e) => setSortBy(e.target.value)} className="reports-filter-select">
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

//       {/* Reports Grid */}
//       <div className="reports-content">
//         {filteredReports.length === 0 ? (
//           <div className="reports-empty-state">
//             <span className="empty-state-emoji">🕊️</span>
//             <h3>No Rescue Missions Found</h3>
//             <p>
//               {searchQuery ? `No missions matching "${searchQuery}"` : filterStatus !== 'all' ? `No missions with status "${filterStatus}"` : 'No rescue missions have been reported yet.'}
//             </p>
//             {(searchQuery || filterStatus !== 'all') && (
//               <button onClick={() => { setSearchQuery(''); setFilterStatus('all'); setCurrentPage(1); }} className="reports-btn outline">
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
//                         <span className={`reports-status ${statusDisplay.toLowerCase().replace(' ', '-')}`}>{statusDisplay}</span>
//                       </div>
//                       <div className="reports-date">{formatDate(report.submitted_at)}</div>
//                     </div>

//                     <div className="reports-card-body">
//                       <div className="reports-animal-section">
//                         <div className="reports-animal-icon large">{getAnimalEmoji(report.animal_type)}</div>
//                         <div className="reports-animal-info">
//                           <h4>{report.animal_type}</h4>
//                           <span className="reports-condition">{report.animal_condition}</span>
//                         </div>
//                       </div>

//                       <div className="reports-location-section">
//                         <span className="location-icon">📍</span>
//                         <span className="location-text">{report.location_address}</span>
//                       </div>

//                       <div className="reports-volunteer-section">
//                         {report.volunteer_name ? (
//                           <div className="reports-assigned-ranger">
//                             <div className={`ranger-avatar ${isDeclined ? 'declined' : ''}`}>
//                               {report.volunteer_name.charAt(0).toUpperCase()}
//                             </div>
//                             <div className="ranger-info">
//                               <span className="ranger-name">{report.volunteer_name}</span>
//                               <span className="ranger-role">{isDeclined ? 'Declined' : 'Ranger'}</span>
//                               {isDeclined && report.declined_reason && (
//                                 <span className="ranger-declined-reason">
//                                   Reason: {report.declined_reason.length > 30 ? `${report.declined_reason.substring(0, 30)}...` : report.declined_reason}
//                                 </span>
//                               )}
//                             </div>
//                           </div>
//                         ) : (
//                           <div className="reports-no-ranger"><span>No ranger assigned</span></div>
//                         )}
//                       </div>

//                       {hasEvidence && <div className="evidence-indicator"><span>📸 Evidence Uploaded</span></div>}
//                     </div>

//                     <div className="reports-card-footer">
//                       <button onClick={() => handleViewTaskDetails(report)} className="reports-btn view">
//                         View Mission Details
//                       </button>
//                     </div>
//                   </div>
//                 );
//               })}
//             </div>

//             {totalPages > 1 && (
//               <div className="reports-pagination">
//                 <button onClick={prevPage} disabled={currentPage === 1} className="reports-pagination-btn">← Prev</button>
//                 <div className="reports-pagination-numbers">
//                   {getPageNumbers().map((pageNum) => (
//                     <button key={pageNum} onClick={() => paginate(pageNum)} className={`reports-pagination-number ${currentPage === pageNum ? 'active' : ''}`}>
//                       {pageNum}
//                     </button>
//                   ))}
//                 </div>
//                 <button onClick={nextPage} disabled={currentPage === totalPages} className="reports-pagination-btn">Next →</button>
//               </div>
//             )}
//           </>
//         )}
//       </div>

//       {/* Report Detail Modal */}
//       <ReportDetailModal
//         report={selectedReport}
//         isOpen={isModalOpen}
//         onClose={() => { setIsModalOpen(false); setSelectedReport(null); }}
//         onAssignClick={() => { setIsModalOpen(false); setIsVolunteerModalOpen(true); }}
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
//         onClose={() => { setIsVolunteerModalOpen(false); setIsModalOpen(true); }}
//         onSelect={(volunteer) => { if (selectedReport) assignVolunteer(selectedReport.report_id, volunteer.user_id, volunteer.username); }}
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
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { MapContainer, TileLayer, Marker, Polyline, Popup } from 'react-leaflet';

// Fix for default marker icons in React-Leaflet
import icon from 'leaflet/dist/images/marker-icon.png';
import iconShadow from 'leaflet/dist/images/marker-shadow.png';

// ── Inline SVG icons to avoid TS2786 react-icons JSX type conflict ───────────
type SvgProps = { size?: number; color?: string; style?: React.CSSProperties; className?: string };
const Svg = (path: string, vb = '0 0 24 24') => ({ size = 16, color = 'currentColor', style, className }: SvgProps) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox={vb} fill={color} style={style} className={className}>{React.createElement('path', { d: path })}</svg>
);
const MdLocationOn   = Svg('M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z');
const MdEmail        = Svg('M20 4H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4-8 5-8-5V6l8 5 8-5v2z');
const MdPhone        = Svg('M6.62 10.79c1.44 2.83 3.76 5.14 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z');
const MdSearch       = Svg('M15.5 14h-.79l-.28-.27C15.41 12.59 16 11.11 16 9.5 16 5.91 13.09 3 9.5 3S3 5.91 3 9.5 5.91 16 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z');
const MdClose        = Svg('M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z');
const MdAccessTime   = Svg('M11.99 2C6.47 2 2 6.48 2 12s4.47 10 9.99 10C17.52 22 22 17.52 22 12S17.52 2 11.99 2zM12 20c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8zm.5-13H11v6l5.25 3.15.75-1.23-4.5-2.67z');
const MdDescription  = Svg('M14 2H6c-1.1 0-1.99.9-1.99 2L4 20c0 1.1.89 2 1.99 2H18c1.1 0 2-.9 2-2V8l-6-6zm2 16H8v-2h8v2zm0-4H8v-2h8v2zm-3-5V3.5L18.5 9H13z');
const MdCheckCircle  = Svg('M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z');
const MdPushPin      = Svg('M16 9V4h1c.55 0 1-.45 1-1s-.45-1-1-1H7c-.55 0-1 .45-1 1s.45 1 1 1h1v5c0 1.66-1.34 3-3 3v2h5.97v7l1 1 1-1v-7H19v-2c-1.66 0-3-1.34-3-3z');
const MdCameraAlt    = Svg('M12 15.2A3.2 3.2 0 1 0 12 8.8a3.2 3.2 0 0 0 0 6.4zM9 2L7.17 4H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2h-3.17L15 2H9zm3 15c-2.76 0-5-2.24-5-5s2.24-5 5-5 5 2.24 5 5-2.24 5-5 5z');
const MdUpload       = Svg('M9 16h6v-6h4l-7-7-7 7h4zm-4 2h14v2H5z');
const MdBrokenImage  = Svg('M21 5v6.59l-3-3.01-4 4.01-4-4-4 4-3-3.01V5c0-1.1.9-2 2-2h14c1.1 0 2 .9 2 2zm-3 6.42 3 3.01V19c0 1.1-.9 2-2 2H5c-1.1 0-2-.9-2-2v-6.58l3 2.99 4-4 4 4 4-3.99z');
const MdError        = Svg('M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-2h2v2zm0-4h-2V7h2v6z');
const MdPerson       = Svg('M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z');
const MdMyLocation   = Svg('M12 8c-2.21 0-4 1.79-4 4s1.79 4 4 4 4-1.79 4-4-1.79-4-4-4zm8.94 3c-.46-4.17-3.77-7.48-7.94-7.94V1h-2v2.06C6.83 3.52 3.52 6.83 3.06 11H1v2h2.06c.46 4.17 3.77 7.48 7.94 7.94V23h2v-2.06c4.17-.46 7.48-3.77 7.94-7.94H23v-2h-2.06zM12 19c-3.87 0-7-3.13-7-7s3.13-7 7-7 7 3.13 7 7-3.13 7-7 7z');
const MdRefresh      = Svg('M17.65 6.35C16.2 4.9 14.21 4 12 4c-4.42 0-7.99 3.58-7.99 8s3.57 8 7.99 8c3.73 0 6.84-2.55 7.73-6h-2.08c-.82 2.33-3.04 4-5.65 4-3.31 0-6-2.69-6-6s2.69-6 6-6c1.66 0 3.14.69 4.22 1.78L13 11h7V4l-2.35 2.35z');
const MdDownload     = Svg('M19 9h-4V3H9v6H5l7 7 7-7zM5 18v2h14v-2H5z');
const MdFilterList   = Svg('M10 18h4v-2h-4v2zM3 6v2h18V6H3zm3 7h12v-2H6v2z');
const MdSort         = Svg('M3 18h6v-2H3v2zM3 6v2h18V6H3zm0 7h12v-2H3v2z');
const MdWarning      = Svg('M1 21h22L12 2 1 21zm12-3h-2v-2h2v2zm0-4h-2v-4h2v4z');
const MdAssignment   = Svg('M19 3h-4.18C14.4 1.84 13.3 1 12 1c-1.3 0-2.4.84-2.82 2H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-7 0c.55 0 1 .45 1 1s-.45 1-1 1-1-.45-1-1 .45-1 1-1zm2 14H7v-2h7v2zm3-4H7v-2h10v2zm0-4H7V7h10v2z');
const MdCancel       = Svg('M12 2C6.47 2 2 6.47 2 12s4.47 10 10 10 10-4.47 10-10S17.53 2 12 2zm5 13.59L15.59 17 12 13.41 8.41 17 7 15.59 10.59 12 7 8.41 8.41 7 12 10.59 15.59 7 17 8.41 13.41 12 17 15.59z');
const FaPaw          = Svg('M4.5 9.5a2 2 0 1 0 0-4 2 2 0 0 0 0 4zm5-3.5a2 2 0 1 0 0-4 2 2 0 0 0 0 4zm5 0a2 2 0 1 0 0-4 2 2 0 0 0 0 4zm4.5 3.5a2 2 0 1 0 0-4 2 2 0 0 0 0 4zM12 11c-3.5 0-7 2.5-7 5.5 0 1.5 1.5 2.5 3.5 2.5.8 0 1.6-.2 2.2-.6.2-.1.5-.1.7 0 .6.4 1.4.6 2.1.6 2 0 3.5-1 3.5-2.5C19 13.5 15.5 11 12 11z');
const FaUserShield   = Svg('M12 1L3 5v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V5l-9-4zm0 4a3 3 0 1 1 0 6 3 3 0 0 1 0-6zm0 14c-2.67 0-5.47-1.3-7.16-3.33C5.84 14 8.72 13 12 13s6.16 1 7.16 2.67C17.47 17.7 14.67 19 12 19z');
const FaBan          = Svg('M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zM4 12c0-4.42 3.58-8 8-8 1.85 0 3.55.63 4.9 1.68L5.68 16.9A7.902 7.902 0 0 1 4 12zm8 8c-1.85 0-3.55-.63-4.9-1.68L18.32 7.1A7.902 7.902 0 0 1 20 12c0 4.42-3.58 8-8 8z');
const FaTimesCircle  = Svg('M12 2C6.47 2 2 6.47 2 12s4.47 10 10 10 10-4.47 10-10S17.53 2 12 2zm5 13.59L15.59 17 12 13.41 8.41 17 7 15.59 10.59 12 7 8.41 8.41 7 12 10.59 15.59 7 17 8.41 13.41 12 17 15.59z');
const GiPawPrint     = Svg('M12 11c-2.76 0-5 2.24-5 5 0 1.38.56 2.63 1.46 3.54L12 22l3.54-2.46C16.44 18.63 17 17.38 17 16c0-2.76-2.24-5-5-5zm-5.5-1a2 2 0 1 0 0-4 2 2 0 0 0 0 4zm11 0a2 2 0 1 0 0-4 2 2 0 0 0 0 4zm-8-4a2 2 0 1 0 0-4 2 2 0 0 0 0 4zm5 0a2 2 0 1 0 0-4 2 2 0 0 0 0 4z');
const TbMapSearch    = Svg('M11 3a8 8 0 1 0 0 16A8 8 0 0 0 11 3zM2 11a9 9 0 1 1 18 0 9 9 0 0 1-18 0zm15.657 5.243 3.536 3.535-1.414 1.415-3.536-3.536 1.414-1.414z');

let DefaultIcon = L.icon({
  iconUrl: icon,
  shadowUrl: iconShadow,
  iconSize: [25, 41],
  iconAnchor: [12, 41]
});
L.Marker.prototype.options.icon = DefaultIcon;

const startIcon = L.divIcon({
  html: '🏁',
  className: 'custom-marker start-marker',
  iconSize: [30, 30],
  popupAnchor: [0, -15]
});
const endIcon = L.divIcon({
  html: '📍',
  className: 'custom-marker end-marker',
  iconSize: [30, 30],
  popupAnchor: [0, -15]
});
const liveIcon = L.divIcon({
  html: '🔴',
  className: 'custom-marker live-marker',
  iconSize: [30, 30],
  popupAnchor: [0, -15]
});

// ── Interfaces ────────────────────────────────────────────────────────────────
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

interface TrackingPoint {
  tracking_id: number;
  task_id: number;
  volunteer_id: number;
  latitude: number;
  longitude: number;
  accuracy: number;
  timestamp: string;
  synced: number;
  volunteer_name?: string;
}

interface TrackingStats {
  pointCount: number;
  startTime: string | null;
  lastSeen: string | null;
  distance: number;
  lastLat?: number;
  lastLng?: number;
  pendingPoints: number;
  isLive: boolean;
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

interface ConfirmModal {
  show: boolean;
  title: string;
  message: string;
  confirmText: string;
  confirmColor: string;
  onConfirm: () => void;
}

const CONFIRM_CLOSED: ConfirmModal = {
  show: false, title: '', message: '',
  confirmText: 'Confirm', confirmColor: '#c62828', onConfirm: () => {}
};

// ── Helpers ───────────────────────────────────────────────────────────────────
const getFullImageUrl = (proofUrl: string): string => {
  if (!proofUrl) return '';
  if (proofUrl.startsWith('http://') || proofUrl.startsWith('https://')) return proofUrl;
  const baseUrl = 'http://localhost:5000';
  const cleanUrl = proofUrl.replace(/^\/+/, '');
  if (cleanUrl.startsWith('uploads/')) return `${baseUrl}/${cleanUrl}`;
  return `${baseUrl}/uploads/${cleanUrl}`;
};

const calculateDistance = (lat1: number, lng1: number, lat2: number, lng2: number): number => {
  const R = 6371;
  const dLat = (lat2 - lat1) * Math.PI / 180;
  const dLng = (lng2 - lng1) * Math.PI / 180;
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) *
    Math.sin(dLng / 2) * Math.sin(dLng / 2);
  return R * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
};

const getAnimalEmoji = (animalType: string): string => {
  const type = animalType?.toLowerCase() || '';
  if (type.includes('dog'))    return '🐶';
  if (type.includes('cat'))    return '🐱';
  if (type.includes('bird'))   return '🐦';
  if (type.includes('rabbit')) return '🐰';
  if (type.includes('hamster'))return '🐹';
  if (type.includes('turtle')) return '🐢';
  if (type.includes('snake'))  return '🐍';
  if (type.includes('fish'))   return '🐟';
  if (type.includes('horse'))  return '🐴';
  if (type.includes('cow'))    return '🐮';
  if (type.includes('goat'))   return '🐐';
  if (type.includes('sheep'))  return '🐑';
  return '🐾';
};

// Smart card title: "Injured Dog" or "Cat in need"
const getCardTitle = (animalType: string, animalCondition: string): string => {
  const type = (animalType || '').trim();
  const cond = (animalCondition || '').trim();
  if (!type) return 'Animal in need';
  const adjectives = ['injured', 'stray', 'sick', 'lost', 'abandoned', 'wounded', 'starving', 'malnourished', 'critical', 'trapped', 'orphaned'];
  const isAdj = adjectives.some(a => cond.toLowerCase().includes(a));
  if (cond && isAdj) return `${cond.charAt(0).toUpperCase() + cond.slice(1).toLowerCase()} ${type}`;
  return `${type} in need`;
};

const getStatusBadgeColors = (statusId: number) => {
  switch (statusId) {
    case 1: return { bg: '#1e3f1a', color: '#c8e6b0' }; // submitted
    case 2: return { bg: '#1a3a5e', color: '#b0d4f1' }; // assigned
    case 3: return { bg: '#1a4a3a', color: '#b0e8d0' }; // in-progress
    case 4: return { bg: '#3d1a5e', color: '#e0c8f5' }; // completed
    case 5: return { bg: '#5e1a1a', color: '#f5c8c8' }; // declined
    default: return { bg: '#4a4a4a', color: '#e0e0e0' };
  }
};

// ── Volunteer Selection Modal ─────────────────────────────────────────────────
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
  report, isOpen, onClose, onSelect, volunteers,
  loadingVolunteers, getAnimalEmoji, formatVolunteerDate
}) => {
  if (!isOpen || !report) return null;

  const availableVolunteers   = volunteers.filter(v => v.availability_status_id === 1 || v.availability_status?.toLowerCase() === 'available');
  const unavailableVolunteers = volunteers.filter(v => v.availability_status_id === 2 || v.availability_status?.toLowerCase() === 'unavailable');

  const getBadgeDisplay = (badges?: string) => {
    if (!badges) return null;
    try {
      if (typeof badges === 'string' && !badges.startsWith('[')) return badges.split(',').slice(0, 3).join(', ');
      const badgeList = JSON.parse(badges);
      if (Array.isArray(badgeList) && badgeList.length > 0) return badgeList.slice(0, 3).join(', ');
    } catch (e) { return badges; }
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
          <button className="reports-modal-close" onClick={onClose}><MdClose size={20} /></button>
        </div>

        <div className="reports-modal-body">
          <div className="reports-summary-card">
            <div className="reports-summary-item">
              <span className="reports-summary-label">Animal</span>
              <span className="reports-summary-value">{getAnimalEmoji(report.animal_type)} {report.animal_type}</span>
            </div>
            <div className="reports-summary-item">
              <span className="reports-summary-label">Location</span>
              <span className="reports-summary-value location">{report.location_address}</span>
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
                <FaPaw size={32} color="#ccc" />
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
                          <div className="reports-volunteer-avatar">{volunteer.username.charAt(0).toUpperCase()}</div>
                          {volunteer.assigned_reports_count > 0 && <span className="reports-badge-count">{volunteer.assigned_reports_count}</span>}
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
                            <div className="reports-detail-row"><span className="reports-detail-label">City:</span><span className="reports-detail-value">{volunteer.city || 'Not specified'}</span></div>
                            <div className="reports-detail-row"><span className="reports-detail-label">Has Car:</span><span className="reports-detail-value">{volunteer.has_car === 1 ? 'Yes' : 'No'}</span></div>
                            <div className="reports-detail-row"><span className="reports-detail-label">Can Foster:</span><span className="reports-detail-value">{volunteer.can_foster === 1 ? 'Yes' : 'No'}</span></div>
                            <div className="reports-detail-row"><span className="reports-detail-label">Handling:</span><span className="reports-detail-value">{volunteer.animal_handling || 'Not specified'}</span></div>
                            {getBadgeDisplay(volunteer.badges) && <div className="reports-detail-row"><span className="reports-detail-label">Badges:</span><span className="reports-detail-value">{getBadgeDisplay(volunteer.badges)}</span></div>}
                          </div>
                          <div className="reports-volunteer-meta">
                            <span>Joined {formatVolunteerDate(volunteer.joined_at)}</span>
                            <span>{volunteer.assigned_reports_count} active rescues</span>
                          </div>
                        </div>
                        <button className="reports-btn assign" onClick={() => onSelect(volunteer)}>Assign</button>
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
                          <div className="reports-volunteer-avatar unavailable">{volunteer.username.charAt(0).toUpperCase()}</div>
                        </div>
                        <div className="reports-volunteer-info">
                          <div className="reports-volunteer-header">
                            <h5>{volunteer.username}</h5>
                            <span className="reports-volunteer-status unavailable">Unavailable</span>
                          </div>
                          <div className="reports-volunteer-contact"><span>{volunteer.email}</span></div>
                          <div className="reports-volunteer-meta"><span>Currently unavailable</span></div>
                        </div>
                        <button className="reports-btn assign-disabled" disabled>Unavailable</button>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}
          </div>
        </div>

        <div className="reports-modal-footer">
          <button className="reports-btn secondary" onClick={onClose}>Cancel</button>
        </div>
      </div>
    </div>
  );
};

// ── Report Detail Modal ───────────────────────────────────────────────────────
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
  report, isOpen, onClose, onAssignClick, onUnassign,
  getAnimalEmoji, formatDate, getStatusName, showMessage,
  evidence = [], completionNotes = []
}) => {
  const [localAdminNote, setLocalAdminNote] = useState('');
  const [savingNote,     setSavingNote]     = useState(false);
  const [selectedImage,  setSelectedImage]  = useState<string | null>(null);
  const [imageErrors,    setImageErrors]    = useState<Record<number, boolean>>({});

  const [trackingPoints,      setTrackingPoints]      = useState<TrackingPoint[]>([]);
  const [trackingStats,       setTrackingStats]       = useState<TrackingStats>({ pointCount: 0, startTime: null, lastSeen: null, distance: 0, pendingPoints: 0, isLive: false });
  const [loadingTracking,     setLoadingTracking]     = useState(false);
  const [showTrackingDetails, setShowTrackingDetails] = useState(true);
  const [autoRefresh,         setAutoRefresh]         = useState(false);
  const [refreshInterval,     setRefreshInterval]     = useState<NodeJS.Timeout | null>(null);
  const [mapKey,              setMapKey]              = useState(0);

  useEffect(() => {
    if (report) setLocalAdminNote(report.admin_note || '');
  }, [report]);

  useEffect(() => {
    if (report?.task_id && isOpen) {
      fetchTrackingData(report.task_id);
      if (autoRefresh) {
        const interval = setInterval(() => { fetchTrackingData(report.task_id!); setMapKey(prev => prev + 1); }, 5000);
        setRefreshInterval(interval);
        return () => { if (interval) clearInterval(interval); };
      }
    }
    return () => { if (refreshInterval) clearInterval(refreshInterval); };
  }, [report?.task_id, isOpen, autoRefresh]);

  const fetchTrackingData = async (taskId: number) => {
    try {
      setLoadingTracking(true);
      const token = sessionStorage.getItem('token') || localStorage.getItem('token');
      if (!token) { setLoadingTracking(false); return; }
      const endpoints = [
        `http://localhost:5000/api/tasks/${taskId}/tracking`,
        `http://localhost:5000/api/admin/tracking/route/${taskId}`,
        `http://localhost:5000/api/volunteer/tracking/task/${taskId}`
      ];
      let success = false;
      let trackingData = null;
      for (const url of endpoints) {
        try {
          const response = await fetch(url, { headers: { 'Authorization': `Bearer ${token}` } });
          if (response.ok) {
            const data = await response.json();
            if (data.success && data.data) { trackingData = data.data; success = true; break; }
          }
        } catch (e) { /* continue */ }
      }
      if (success && trackingData && trackingData.length > 0) {
        const points: TrackingPoint[] = trackingData.map((point: any) => ({
          tracking_id: point.tracking_id, task_id: point.task_id, volunteer_id: point.volunteer_id,
          latitude: parseFloat(point.latitude), longitude: parseFloat(point.longitude),
          accuracy: point.accuracy || 0, timestamp: point.timestamp, synced: point.synced || 1, volunteer_name: point.volunteer_name
        }));
        setTrackingPoints(points);
        setMapKey(prev => prev + 1);
        const sorted    = [...points].sort((a, b) => new Date(a.timestamp).getTime() - new Date(b.timestamp).getTime());
        const startTime = new Date(sorted[0].timestamp);
        const lastSeen  = new Date(sorted[sorted.length - 1].timestamp);
        let distance = 0;
        for (let i = 1; i < sorted.length; i++) {
          distance += calculateDistance(sorted[i - 1].latitude, sorted[i - 1].longitude, sorted[i].latitude, sorted[i].longitude);
        }
        const pendingPoints = points.filter(p => !p.synced).length;
        const isLive        = (Date.now() - lastSeen.getTime()) < 300000;
        const lastPoint     = sorted[sorted.length - 1];
        setTrackingStats({ pointCount: points.length, startTime: startTime.toLocaleTimeString(), lastSeen: lastSeen.toLocaleTimeString(), distance: Math.round(distance * 10) / 10, lastLat: lastPoint.latitude, lastLng: lastPoint.longitude, pendingPoints, isLive });
      } else {
        setTrackingPoints([]);
        setTrackingStats({ pointCount: 0, startTime: null, lastSeen: null, distance: 0, pendingPoints: 0, isLive: false });
      }
    } catch (error) { console.error('Error fetching tracking:', error); }
    finally { setLoadingTracking(false); }
  };

  if (!isOpen || !report) return null;

  const handleSaveNote = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!localAdminNote.trim()) { showMessage('Please enter a note', 'error'); return; }
    try {
      const token = sessionStorage.getItem('token') || localStorage.getItem('token');
      if (!token) { showMessage('Please login first', 'error'); return; }
      setSavingNote(true);
      const response = await fetch(`http://localhost:5000/api/reports/${report.report_id}/admin-note`, {
        method: 'POST',
        headers: { 'Authorization': `Bearer ${token}`, 'Content-Type': 'application/json' },
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
    } catch (error: any) { showMessage(error.message || 'Error saving note.', 'error'); }
    finally { setSavingNote(false); }
  };

  const handleImageError = (proofId: number, url: string) => {
    setImageErrors(prev => ({ ...prev, [proofId]: true }));
  };

  const statusDisplay = getStatusName(report.status_id, report.status_name);
  const isDeclined    = report.status_id === 5;
  const isInProgress  = report.status_id === 3;
  const isCompleted   = report.status_id === 4;
  const showTracking  = !!report.task_id && (isInProgress || isCompleted);
  const positions: [number, number][] = trackingPoints.map(p => [p.latitude, p.longitude]);

  return (
    <div className="reports-modal-overlay" onClick={onClose}>
      <div className="reports-modal-content large" onClick={e => e.stopPropagation()}>
        <div className="reports-modal-header dark">
          <div>
            <h3>Rescue Report #{report.report_id}</h3>
            <div className="reports-modal-subheader">
              <span className={`reports-status-badge ${statusDisplay.toLowerCase().replace(' ', '-')}`}>{statusDisplay}</span>
              <span className="reports-meta">{formatDate(report.submitted_at)}</span>
            </div>
          </div>
          <button className="reports-modal-close" onClick={onClose}><MdClose size={20} /></button>
        </div>

        <div className="reports-modal-body">
          <div className="reports-detail-grid">
            <div className="reports-detail-column">

              {/* Animal Info */}
              <div className="reports-info-card">
                <div className="reports-card-header beige">
                  <h4><GiPawPrint size={15} style={{ marginRight: 6 }} />Animal Information</h4>
                </div>
                <div className="reports-card-content">
                  <div className="reports-animal-display">
                    <div className="reports-animal-icon">{getAnimalEmoji(report.animal_type)}</div>
                    <div className="reports-animal-details">
                      <div className="reports-animal-type">{report.animal_type}</div>
                      <span className="condition-tag">{report.animal_condition}</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Reporter */}
              <div className="reports-info-card">
                <div className="reports-card-header beige">
                  <h4><MdPerson size={15} style={{ marginRight: 6 }} />Reporter Details</h4>
                </div>
                <div className="reports-card-content">
                  <div className="reports-detail-list">
                    <div className="reports-detail-row"><span className="reports-detail-label">Name</span><span className="reports-detail-value">{report.username}</span></div>
                    <div className="reports-detail-row"><span className="reports-detail-label">Email</span><span className="reports-detail-value"><MdEmail size={12} style={{ marginRight: 4 }} />{report.email}</span></div>
                    <div className="reports-detail-row"><span className="reports-detail-label">Phone</span><span className="reports-detail-value"><MdPhone size={12} style={{ marginRight: 4 }} />{report.phone}</span></div>
                  </div>
                </div>
              </div>

              {/* Location */}
              <div className="reports-info-card">
                <div className="reports-card-header beige">
                  <h4><MdLocationOn size={15} style={{ marginRight: 6 }} />Location</h4>
                </div>
                <div className="reports-card-content">
                  <div className="reports-location-info">
                    <p>{report.location_address}</p>
                    <button className="reports-btn map" onClick={() => window.open(`https://maps.google.com/?q=${encodeURIComponent(report.location_address)}`, '_blank')}>
                      <TbMapSearch size={14} style={{ marginRight: 4 }} />View on Map
                    </button>
                  </div>
                </div>
              </div>

              {/* Timeline */}
              <div className="reports-info-card">
                <div className="reports-card-header beige">
                  <h4><MdAccessTime size={15} style={{ marginRight: 6 }} />Timeline</h4>
                </div>
                <div className="reports-card-content">
                  <div className="reports-detail-list">
                    <div className="reports-detail-row"><span className="reports-detail-label">Reported</span><span className="reports-detail-value">{formatDate(report.submitted_at)}</span></div>
                    <div className="reports-detail-row"><span className="reports-detail-label">Assigned to</span><span className="reports-detail-value">{report.volunteer_name || 'Not assigned'}</span></div>
                  </div>
                </div>
              </div>
            </div>

            <div className="reports-detail-column">

              {/* Ranger Assignment */}
              <div className="reports-info-card">
                <div className="reports-card-header beige">
                  <div className="reports-header-row">
                    <h4><FaUserShield size={13} style={{ marginRight: 6 }} />Ranger Assignment</h4>
                    {!report.volunteer_name && !isDeclined && !isInProgress && !isCompleted && (
                      <button className="reports-btn primary small" onClick={onAssignClick}>+ Assign Ranger</button>
                    )}
                  </div>
                </div>
                <div className="reports-card-content">
                  {report.volunteer_name && !isDeclined ? (
                    <div className="reports-volunteer-assigned">
                      <div className="reports-assigned-volunteer">
                        <div className="reports-volunteer-avatar large">{report.volunteer_name.charAt(0).toUpperCase()}</div>
                        <div className="reports-assigned-info">
                          <h5>{report.volunteer_name}</h5>
                          <div className="reports-assigned-contact">
                            {report.volunteer_email && <span>{report.volunteer_email}</span>}
                            {report.volunteer_phone && <span>{report.volunteer_phone}</span>}
                          </div>
                        </div>
                      </div>
                      {!isInProgress && !isCompleted && (
                        <button className="reports-btn unassign" onClick={() => onUnassign(report.report_id)}>Unassign</button>
                      )}
                      {isInProgress && <span className="reports-badge in-progress">In Progress</span>}
                      {isCompleted  && <span className="reports-badge completed">Completed</span>}
                    </div>
                  ) : isDeclined ? (
                    <div className="reports-declined-container">
                      <div className="reports-declined-header">
                        <FaTimesCircle size={18} color="#d32f2f" />
                        <div className="reports-declined-title">Mission Declined by Ranger</div>
                      </div>
                      {report.volunteer_name && (
                        <div className="reports-declined-volunteer">
                          <div className="reports-volunteer-avatar declined">{report.volunteer_name.charAt(0).toUpperCase()}</div>
                          <div className="reports-declined-volunteer-info">
                            <div className="reports-declined-volunteer-name">{report.volunteer_name}</div>
                            <div className="reports-declined-volunteer-contact">
                              {report.volunteer_email && <span>{report.volunteer_email}</span>}
                              {report.volunteer_phone && <span>{report.volunteer_phone}</span>}
                            </div>
                            {report.volunteer_responded_at && <div className="reports-declined-time">Declined on {formatDate(report.volunteer_responded_at)}</div>}
                          </div>
                        </div>
                      )}
                      {report.declined_reason
                        ? <div className="reports-declined-reason"><div className="reports-declined-reason-label">Declined Reason:</div><div className="reports-declined-reason-text">"{report.declined_reason}"</div></div>
                        : <div className="reports-declined-reason empty"><em>No reason provided</em></div>}
                      <button className="reports-btn primary" onClick={onAssignClick}>+ Assign New Ranger</button>
                    </div>
                  ) : (
                    <div className="reports-no-volunteer">
                      <FaPaw size={32} color="#ccc" />
                      <p>No ranger assigned yet</p>
                      <button className="reports-btn text" onClick={onAssignClick}>Click to assign a ranger</button>
                    </div>
                  )}
                </div>
              </div>

              {/* Live Tracking */}
              {showTracking && (
                <div className="reports-info-card tracking-card">
                  <div className="reports-card-header beige">
                    <div className="reports-header-row">
                      <h4><MdMyLocation size={15} style={{ marginRight: 6 }} />Live Tracking</h4>
                      <div className="tracking-controls">
                        <button className={`tracking-refresh-btn ${autoRefresh ? 'active' : ''}`} onClick={() => setAutoRefresh(!autoRefresh)}>
                          <MdRefresh size={13} className="refresh-icon" />{autoRefresh ? 'Auto' : 'Manual'}
                        </button>
                        <button className="tracking-refresh-btn" onClick={() => { if (report.task_id) { fetchTrackingData(report.task_id); setMapKey(prev => prev + 1); } }}>
                          <MdRefresh size={13} className="refresh-icon" />
                        </button>
                        <span className={`tracking-expand-icon ${showTrackingDetails ? 'expanded' : ''}`} onClick={() => setShowTrackingDetails(!showTrackingDetails)}>▼</span>
                      </div>
                    </div>
                  </div>
                  {showTrackingDetails && (
                    <div className="reports-card-content">
                      {loadingTracking ? (
                        <div className="tracking-loading-state"><div className="reports-spinner small"></div><p>Loading tracking data...</p></div>
                      ) : trackingPoints.length > 0 ? (
                        <div className="tracking-container">
                          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '16px' }}>
                            <div style={{ width: '10px', height: '10px', borderRadius: '50%', backgroundColor: trackingStats.isLive ? '#4caf50' : '#9e9e9e', boxShadow: trackingStats.isLive ? '0 0 8px #4caf50' : 'none' }} />
                            <span style={{ fontSize: '0.85rem', fontWeight: 500, color: trackingStats.isLive ? '#2e7d32' : '#757575' }}>{trackingStats.isLive ? 'Ranger is active' : 'Ranger offline'}</span>
                            {trackingStats.isLive && <span style={{ fontSize: '0.7rem', color: '#666', marginLeft: 'auto' }}>Last seen: {trackingStats.lastSeen}</span>}
                          </div>
                          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '8px', marginBottom: '16px' }}>
                            {[['Points', trackingStats.pointCount], ['Distance', `${trackingStats.distance} km`], ['Started', trackingStats.startTime || 'N/A'], ['Last update', trackingStats.lastSeen || 'N/A']].map(([label, value]) => (
                              <div key={label as string} style={{ background: '#f5f5f5', padding: '10px', borderRadius: '8px', textAlign: 'center' }}>
                                <div style={{ fontSize: '0.7rem', color: '#666', marginBottom: '4px' }}>{label}</div>
                                <div style={{ fontSize: '1rem', fontWeight: 600, color: '#2D5A27' }}>{value}</div>
                              </div>
                            ))}
                          </div>
                          <div style={{ height: '300px', marginBottom: '16px', borderRadius: '8px', overflow: 'hidden', border: '1px solid #e0e0e0' }}>
                            {positions.length > 0 && (
                              <MapContainer key={mapKey} center={positions[positions.length - 1]} zoom={15} style={{ height: '100%', width: '100%' }}>
                                <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" attribution='&copy; OpenStreetMap' />
                                <Polyline positions={positions} color="#2D5A27" weight={4} opacity={0.7} />
                                <Marker position={positions[0]} icon={startIcon}><Popup><strong>Start</strong><br />{new Date(trackingPoints[0].timestamp).toLocaleString()}</Popup></Marker>
                                <Marker position={positions[positions.length - 1]} icon={trackingStats.isLive ? liveIcon : endIcon}><Popup><strong>{trackingStats.isLive ? 'Current' : 'Last seen'}</strong><br />{new Date(trackingPoints[trackingPoints.length - 1].timestamp).toLocaleString()}</Popup></Marker>
                              </MapContainer>
                            )}
                          </div>
                        </div>
                      ) : (
                        <div style={{ textAlign: 'center', padding: '40px 20px', background: '#fafafa', borderRadius: '8px' }}>
                          <MdMyLocation size={40} color="#ccc" />
                          <p style={{ color: '#666', marginBottom: '8px', marginTop: '12px' }}>No tracking data available</p>
                          <button className="reports-btn primary small" onClick={() => report.task_id && fetchTrackingData(report.task_id)}>Refresh</button>
                        </div>
                      )}
                    </div>
                  )}
                  {!showTrackingDetails && (
                    <div className="reports-card-content" style={{ padding: '12px' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                        <div style={{ width: '8px', height: '8px', borderRadius: '50%', backgroundColor: trackingStats.isLive ? '#4caf50' : '#9e9e9e' }} />
                        <span style={{ fontSize: '0.85rem' }}>{trackingStats.isLive ? 'Live' : 'Last seen'}: {trackingStats.lastSeen || 'N/A'}</span>
                      </div>
                    </div>
                  )}
                </div>
              )}

              {/* Evidence Photos */}
              {report.task_id && evidence && evidence.length > 0 && (
                <div className="reports-info-card">
                  <div className="reports-card-header beige"><h4><MdCameraAlt size={15} style={{ marginRight: 6 }} />Evidence Photos</h4></div>
                  <div className="reports-card-content">
                    <p style={{ marginBottom: '10px', color: '#2D5A27', fontWeight: '600' }}>{evidence.length} photo(s) uploaded</p>
                    <div className="evidence-grid">
                      {evidence.map(proof => {
                        const imageUrl = getFullImageUrl(proof.proof_url);
                        const hasError = imageErrors[proof.proof_id];
                        return (
                          <div key={proof.proof_id} className="evidence-item" onClick={() => !hasError && setSelectedImage(imageUrl)}>
                            {!hasError
                              ? <img src={imageUrl} alt={`Evidence ${proof.proof_id}`} className="evidence-image" onError={() => handleImageError(proof.proof_id, imageUrl)} />
                              : <div className="evidence-image-placeholder"><MdBrokenImage size={24} color="#2D5A27" /><span>Image unavailable</span></div>}
                            <p className="evidence-date">Uploaded: {formatDate(proof.uploaded_at)}</p>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                </div>
              )}

              {/* Completion Notes */}
              {report.task_id && completionNotes && completionNotes.length > 0 && (
                <div className="reports-info-card">
                  <div className="reports-card-header beige"><h4><MdCheckCircle size={15} style={{ marginRight: 6 }} />Completion Notes</h4></div>
                  <div className="reports-card-content">
                    <div className="completion-notes-container">
                      {completionNotes.map(note => (
                        <div key={note.note_id} className="completion-note-item">
                          <div className="completion-note-header">
                            <span className="completion-note-author">{note.volunteer_name || 'Volunteer'}</span>
                            <span className="completion-note-time">{formatDate(note.created_at)}</span>
                          </div>
                          <p className="completion-note-text">{note.note_text}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {/* Report Description */}
              <div className="reports-info-card">
                <div className="reports-card-header beige"><h4><MdDescription size={15} style={{ marginRight: 6 }} />Report Description</h4></div>
                <div className="reports-card-content">
                  <div className="reports-description"><p>{report.description}</p></div>
                  {report.user_note && (
                    <div className="reports-user-note">
                      <div className="note-label">Reporter's Note:</div>
                      <p>{report.user_note}</p>
                    </div>
                  )}
                </div>
              </div>

              {/* Admin Notes */}
              <div className="reports-info-card">
                <div className="reports-card-header beige"><h4><MdPushPin size={15} style={{ marginRight: 6 }} />Admin Notes</h4></div>
                <div className="reports-card-content">
                  <form onSubmit={handleSaveNote} className="reports-notes-form">
                    <textarea
                      className="reports-notes-input"
                      placeholder={isInProgress ? 'Notes disabled - mission is in progress' : isCompleted ? 'Notes disabled - mission is completed' : 'Add internal notes about this rescue mission...'}
                      value={localAdminNote}
                      onChange={(e) => setLocalAdminNote(e.target.value)}
                      rows={3}
                      disabled={isInProgress || isCompleted}
                    />
                    <div className="reports-notes-actions">
                      <button type="submit" className="reports-btn save" disabled={savingNote || !localAdminNote.trim() || isInProgress || isCompleted}>
                        {savingNote ? 'Saving...' : 'Save Note'}
                      </button>
                      {(isInProgress || isCompleted) && (
                        <span className="reports-note-disabled-hint">{isCompleted ? 'Notes disabled - mission completed' : 'Notes disabled - mission in progress'}</span>
                      )}
                    </div>
                  </form>
                </div>
              </div>

            </div>
          </div>

          {selectedImage && (
            <div className="image-lightbox" onClick={() => setSelectedImage(null)}>
              <img src={selectedImage} alt="Enlarged evidence" />
              <button className="lightbox-close" onClick={() => setSelectedImage(null)}><MdClose size={20} /></button>
            </div>
          )}
        </div>

        <div className="reports-modal-footer">
          <button className="reports-btn secondary" onClick={onClose}>Close</button>
        </div>
      </div>
    </div>
  );
};

// ── Main Component ────────────────────────────────────────────────────────────
const RescueReports: React.FC = () => {
  const [reports,              setReports]              = useState<RescueReport[]>([]);
  const [volunteers,           setVolunteers]           = useState<Volunteer[]>([]);
  const [loading,              setLoading]              = useState(true);
  const [loadingVolunteers,    setLoadingVolunteers]    = useState(false);
  const [filterStatus,         setFilterStatus]         = useState<string>('all');
  const [sortBy,               setSortBy]               = useState<string>('recent');
  const [searchQuery,          setSearchQuery]          = useState<string>('');
  const [selectedReport,       setSelectedReport]       = useState<RescueReport | null>(null);
  const [isModalOpen,          setIsModalOpen]          = useState(false);
  const [isVolunteerModalOpen, setIsVolunteerModalOpen] = useState(false);
  const [showSuccessMessage,   setShowSuccessMessage]   = useState(false);
  const [showErrorMessage,     setShowErrorMessage]     = useState(false);
  const [message,              setMessage]              = useState('');
  const [confirmModal,         setConfirmModal]         = useState<ConfirmModal>(CONFIRM_CLOSED);
  const [taskEvidence,         setTaskEvidence]         = useState<{ [key: number]: TaskProof[] }>({});
  const [taskCompletionNotes,  setTaskCompletionNotes]  = useState<{ [key: number]: CompletionNote[] }>({});
  const [currentPage,          setCurrentPage]          = useState(1);
  const [itemsPerPage]                                  = useState(9);

  const showConfirm = (title: string, message: string, onConfirm: () => void, confirmText = 'Confirm', confirmColor = '#c62828') => {
    setConfirmModal({ show: true, title, message, confirmText, confirmColor, onConfirm });
  };

  const showMessage = (text: string, type: 'success' | 'error') => {
    setMessage(text);
    if (type === 'success') setShowSuccessMessage(true); else setShowErrorMessage(true);
    setTimeout(() => { setShowSuccessMessage(false); setShowErrorMessage(false); setMessage(''); }, 3000);
  };

  // ── Fetch helpers ──────────────────────────────────────────────────────────
  const fetchTaskEvidence = async (taskId: number) => {
    try {
      const token    = sessionStorage.getItem('token') || localStorage.getItem('token');
      const response = await fetch(`http://localhost:5000/api/tasks/${taskId}/evidence`, { headers: { 'Authorization': `Bearer ${token}` } });
      const data     = await response.json();
      if (data.success) setTaskEvidence(prev => ({ ...prev, [taskId]: data.data }));
    } catch (error) { console.error('Error fetching evidence:', error); }
  };

  const fetchTaskCompletionNotes = async (taskId: number) => {
    try {
      const token    = sessionStorage.getItem('token') || localStorage.getItem('token');
      const response = await fetch(`http://localhost:5000/api/tasks/${taskId}/completion-notes`, { headers: { 'Authorization': `Bearer ${token}` } });
      const data     = await response.json();
      if (data.success) setTaskCompletionNotes(prev => ({ ...prev, [taskId]: data.data }));
    } catch (error) { console.error('Error fetching completion notes:', error); }
  };

  // ── Eagerly load all evidence + notes after reports load ──────────────────
  const fetchAllTaskData = useCallback((reportList: RescueReport[], token: string | null) => {
    reportList.forEach(report => {
      if (report.task_id) {
        // Evidence
        fetch(`http://localhost:5000/api/tasks/${report.task_id}/evidence`, { headers: { 'Authorization': `Bearer ${token}` } })
          .then(r => r.json())
          .then(data => { if (data.success) setTaskEvidence(prev => ({ ...prev, [report.task_id!]: data.data })); })
          .catch(() => {});
        // Completion notes
        fetch(`http://localhost:5000/api/tasks/${report.task_id}/completion-notes`, { headers: { 'Authorization': `Bearer ${token}` } })
          .then(r => r.json())
          .then(data => { if (data.success) setTaskCompletionNotes(prev => ({ ...prev, [report.task_id!]: data.data })); })
          .catch(() => {});
      }
    });
  }, []);

  const fetchReports = useCallback(async () => {
    try {
      setLoading(true);
      const token = sessionStorage.getItem('token') || localStorage.getItem('token');
      if (!token) { showMessage('Please login first', 'error'); setLoading(false); return; }
      const response = await fetch('http://localhost:5000/api/reports/admin/all', {
        headers: { 'Authorization': `Bearer ${token}`, 'Content-Type': 'application/json' }
      });
      if (response.ok) {
        const data = await response.json();
        if (data.success) {
          const mappedReports: RescueReport[] = (data.data || []).map((report: any) => ({
            report_id: report.report_id, user_id: report.user_id,
            username: report.reporter_name || 'Anonymous', email: report.email || 'No email', phone: report.reporter_phone || 'No phone',
            description: report.description, location_address: report.location_address,
            user_note: report.user_note, admin_note: report.admin_note, submitted_at: report.submitted_at,
            animal_type: report.animal_type || 'Unknown', animal_condition: report.animal_condition || 'Unknown',
            status_id: report.status_id || 1, status_name: report.status_name,
            volunteer_id: report.volunteer_id, volunteer_name: report.volunteer_name, volunteer_email: report.volunteer_email, volunteer_phone: report.volunteer_phone,
            task_id: report.task_id, task_status: report.task_status,
            declined_reason: report.declined_reason, volunteer_responded_at: report.volunteer_responded_at, volunteer_response: report.volunteer_response
          }));
          setReports(mappedReports);
          setCurrentPage(1);
          // Eagerly fetch all task data right after reports load
          fetchAllTaskData(mappedReports, token);
        } else { showMessage(data.message || 'Failed to load reports', 'error'); }
      } else { showMessage('Failed to fetch reports', 'error'); }
    } catch (error: any) { showMessage('Error loading reports. Please check your connection.', 'error'); }
    finally { setLoading(false); }
  }, [fetchAllTaskData]);

  const fetchVolunteers = useCallback(async () => {
    try {
      setLoadingVolunteers(true);
      const token = sessionStorage.getItem('token') || localStorage.getItem('token');
      if (!token) { setVolunteers([]); setLoadingVolunteers(false); return; }
      const response = await fetch('http://localhost:5000/api/volunteers/available', { headers: { 'Authorization': `Bearer ${token}`, 'Content-Type': 'application/json' } });
      if (response.ok) {
        const data = await response.json();
        if (data.success) {
          setVolunteers((data.data || []).map((v: any) => ({
            user_id: v.user_id, username: v.username, email: v.email, phone: v.phone || 'Not provided',
            bio: v.bio, joined_at: v.joined_at || v.created_at, approval_status: v.approval_status,
            approval_status_id: v.approval_status_id, availability_status: v.availability_status,
            availability_status_id: v.availability_status_id, assigned_reports_count: v.assigned_reports_count || 0,
            role_id: v.role_id, created_at: v.created_at, has_car: v.has_car !== undefined ? v.has_car : 0,
            can_foster: v.can_foster !== undefined ? v.can_foster : 0, animal_handling: v.animal_handling || '',
            city: v.city || '', badges: v.badges
          })));
        } else { setVolunteers([]); }
      } else { setVolunteers([]); }
    } catch (error) { setVolunteers([]); }
    finally { setLoadingVolunteers(false); }
  }, []);

  const handleViewTaskDetails = async (report: RescueReport) => {
    setSelectedReport(report);
    if (report.task_id) {
      // Only fetch if not already loaded
      if (!taskEvidence[report.task_id]) await fetchTaskEvidence(report.task_id);
      if (!taskCompletionNotes[report.task_id]) await fetchTaskCompletionNotes(report.task_id);
    }
    setIsModalOpen(true);
  };

  useEffect(() => { fetchReports(); fetchVolunteers(); }, [fetchReports, fetchVolunteers]);

  const assignVolunteer = async (reportId: number, volunteerId: number, volunteerName: string) => {
    try {
      const token = sessionStorage.getItem('token') || localStorage.getItem('token');
      if (!token) { showMessage('Please login first', 'error'); return; }
      const response = await fetch(`http://localhost:5000/api/reports/${reportId}/assign`, {
        method: 'POST', headers: { 'Authorization': `Bearer ${token}`, 'Content-Type': 'application/json' },
        body: JSON.stringify({ volunteer_id: volunteerId })
      });
      if (response.ok) {
        const volunteer = volunteers.find(v => v.user_id === volunteerId);
        setReports(prev => prev.map(r => r.report_id === reportId
          ? { ...r, volunteer_id: volunteerId, volunteer_name: volunteerName, volunteer_email: volunteer?.email || '', volunteer_phone: volunteer?.phone || '', status_id: 2, status_name: 'assigned', declined_reason: undefined, volunteer_responded_at: undefined }
          : r));
        setVolunteers(prev => prev.map(v => v.user_id === volunteerId ? { ...v, assigned_reports_count: (v.assigned_reports_count || 0) + 1 } : v));
        showMessage(`Ranger "${volunteerName}" assigned successfully!`, 'success');
        setIsVolunteerModalOpen(false); setSelectedReport(null);
        fetchReports(); fetchVolunteers();
      } else {
        const errorData = await response.json();
        showMessage(errorData.message || 'Failed to assign ranger', 'error');
      }
    } catch (error: any) { showMessage(error.message || 'Error assigning ranger.', 'error'); }
  };

  const unassignVolunteer = (reportId: number) => {
    showConfirm('Unassign Ranger', 'Are you sure you want to unassign this ranger? The status will be reset to "Submitted".', () => doUnassign(reportId), 'Unassign', '#FF9F1C');
  };

  const doUnassign = async (reportId: number) => {
    try {
      const token = sessionStorage.getItem('token') || localStorage.getItem('token');
      if (!token) { showMessage('Please login first', 'error'); return; }
      const response = await fetch(`http://localhost:5000/api/reports/${reportId}/unassign`, { method: 'PUT', headers: { 'Authorization': `Bearer ${token}`, 'Content-Type': 'application/json' } });
      if (response.ok) {
        const report      = reports.find(r => r.report_id === reportId);
        const volunteerId = report?.volunteer_id;
        setReports(prev => prev.map(r => r.report_id === reportId
          ? { ...r, volunteer_id: undefined, volunteer_name: undefined, volunteer_email: undefined, volunteer_phone: undefined, status_id: 1, status_name: 'submitted', declined_reason: undefined, volunteer_responded_at: undefined }
          : r));
        if (volunteerId) setVolunteers(prev => prev.map(v => v.user_id === volunteerId ? { ...v, assigned_reports_count: Math.max(0, (v.assigned_reports_count || 0) - 1) } : v));
        showMessage('Ranger unassigned successfully!', 'success');
        fetchReports(); fetchVolunteers();
      } else {
        const errorData = await response.json();
        showMessage(errorData.message || 'Failed to unassign ranger', 'error');
      }
    } catch (error: any) { showMessage(error.message || 'Error unassigning ranger.', 'error'); }
  };

  const formatDate = (dateString: string): string => {
    try { return new Date(dateString).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric', hour: '2-digit', minute: '2-digit' }); }
    catch { return 'Invalid date'; }
  };

  const formatRelativeTime = (dateString: string): string => {
    try {
      const date    = new Date(dateString);
      const now     = new Date();
      const diffMs  = now.getTime() - date.getTime();
      const diffMin = Math.floor(diffMs / 60000);
      const diffHrs = Math.floor(diffMin / 60);
      const diffDay = Math.floor(diffHrs / 24);
      if (diffMin < 1)   return 'Just now';
      if (diffMin < 60)  return `${diffMin}m ago`;
      if (diffHrs < 24)  return `${diffHrs}h ago`;
      if (diffDay === 1) return 'Yesterday';
      if (diffDay < 7)   return `${diffDay} days ago`;
      return formatDate(dateString);
    } catch { return 'Invalid date'; }
  };

  const formatVolunteerDate = (dateString: string): string => {
    try { return new Date(dateString).toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' }); }
    catch { return 'Invalid date'; }
  };

  const getStatusName = (statusId: number, statusName?: string): string => {
    if (statusName) return statusName.split('_').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ');
    const statusMap: { [key: number]: string } = { 1: 'Submitted', 2: 'Assigned', 3: 'In Progress', 4: 'Completed', 5: 'Declined' };
    return statusMap[statusId] || 'Unknown';
  };

  const exportToCSV = () => {
    try {
      const exportData = reports.map(report => ({
        'Report ID': report.report_id, 'Status': getStatusName(report.status_id, report.status_name),
        'Animal Type': report.animal_type, 'Condition': report.animal_condition, 'Location': report.location_address,
        'Reporter': report.username, 'Reporter Email': report.email, 'Reporter Phone': report.phone,
        'Assigned Ranger': report.volunteer_name || 'Not assigned', 'Ranger Email': report.volunteer_email || '',
        'Submitted Date': formatDate(report.submitted_at), 'Description': report.description.replace(/,/g, ';'),
      }));
      if (exportData.length === 0) { showMessage('No data to export', 'error'); return; }
      const headers = Object.keys(exportData[0]);
      const csvContent = [headers.join(','), ...exportData.map(row => headers.map(h => { const v = row[h as keyof typeof row]; return (typeof v === 'string' && v.includes(',')) ? `"${v}"` : v; }).join(','))].join('\n');
      const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
      const link = document.createElement('a');
      link.setAttribute('href', URL.createObjectURL(blob));
      link.setAttribute('download', `rescue_reports_${new Date().toISOString().split('T')[0]}.csv`);
      link.style.visibility = 'hidden';
      document.body.appendChild(link); link.click(); document.body.removeChild(link);
      showMessage(`Exported ${exportData.length} reports successfully!`, 'success');
    } catch { showMessage('Failed to export CSV', 'error'); }
  };

  const filteredReports = reports
    .filter(report => {
      if (filterStatus !== 'all') {
        const statusMap: { [key: string]: number } = { 'submitted': 1, 'assigned': 2, 'in-progress': 3, 'completed': 4, 'declined': 5 };
        if (report.status_id !== statusMap[filterStatus]) return false;
      }
      if (searchQuery) {
        const query = searchQuery.toLowerCase();
        return (
          report.username?.toLowerCase().includes(query) || report.animal_type?.toLowerCase().includes(query) ||
          report.location_address?.toLowerCase().includes(query) || report.description?.toLowerCase().includes(query) ||
          report.report_id.toString().includes(query) || report.volunteer_name?.toLowerCase().includes(query) ||
          (report.declined_reason?.toLowerCase().includes(query) ?? false)
        );
      }
      return true;
    })
    .sort((a, b) => {
      switch (sortBy) {
        case 'recent':   return new Date(b.submitted_at).getTime() - new Date(a.submitted_at).getTime();
        case 'oldest':   return new Date(a.submitted_at).getTime() - new Date(b.submitted_at).getTime();
        case 'critical': { const score = (c: string) => { const s = c?.toLowerCase() || ''; return s.includes('critical') ? 0 : s.includes('severe') ? 1 : s.includes('urgent') ? 2 : 3; }; return score(a.animal_condition) - score(b.animal_condition); }
        case 'status':   return a.status_id - b.status_id;
        default:         return 0;
      }
    });

  const indexOfLastItem  = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems     = filteredReports.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages       = Math.ceil(filteredReports.length / itemsPerPage);

  const paginate   = (pageNumber: number) => setCurrentPage(pageNumber);
  const nextPage   = () => setCurrentPage(prev => Math.min(prev + 1, totalPages));
  const prevPage   = () => setCurrentPage(prev => Math.max(prev - 1, 1));

  const getPageNumbers = (): number[] => {
    const nums: number[] = [];
    if (totalPages <= 5) { for (let i = 1; i <= totalPages; i++) nums.push(i); }
    else if (currentPage <= 3) { for (let i = 1; i <= 5; i++) nums.push(i); }
    else if (currentPage >= totalPages - 2) { for (let i = totalPages - 4; i <= totalPages; i++) nums.push(i); }
    else { for (let i = currentPage - 2; i <= currentPage + 2; i++) nums.push(i); }
    return nums;
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

      {/* Confirm Modal */}
      {confirmModal.show && (
        <div style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, background: 'rgba(0,0,0,0.45)', zIndex: 99999, display: 'flex', alignItems: 'center', justifyContent: 'center', backdropFilter: 'blur(3px)' }}>
          <div style={{ background: 'white', borderRadius: '20px', padding: '36px 32px', maxWidth: '420px', width: '90%', boxShadow: '0 25px 50px rgba(0,0,0,0.2)', border: '1px solid #e8dfc9', textAlign: 'center' }}>
            <MdWarning size={48} color="#FF9F1C" style={{ marginBottom: 14 }} />
            <h3 style={{ color: '#2D5A27', margin: '0 0 10px', fontSize: '1.25rem', fontWeight: 700 }}>{confirmModal.title}</h3>
            <p style={{ color: '#666', margin: '0 0 28px', lineHeight: 1.65, fontSize: '0.95rem' }}>{confirmModal.message}</p>
            <div style={{ display: 'flex', gap: '12px', justifyContent: 'center' }}>
              <button onClick={() => setConfirmModal(CONFIRM_CLOSED)} style={{ padding: '11px 28px', borderRadius: '10px', border: '2px solid #e8dfc9', background: 'white', color: '#666', fontWeight: 600, cursor: 'pointer', fontSize: '0.9rem' }}>Cancel</button>
              <button onClick={() => { confirmModal.onConfirm(); setConfirmModal(CONFIRM_CLOSED); }} style={{ padding: '11px 28px', borderRadius: '10px', border: 'none', background: confirmModal.confirmColor, color: 'white', fontWeight: 600, cursor: 'pointer', fontSize: '0.9rem' }}>{confirmModal.confirmText}</button>
            </div>
          </div>
        </div>
      )}

      {/* Notifications */}
      {showSuccessMessage && <div className="reports-notification success"><MdCheckCircle size={18} color="#2e7d32" /><span>{message}</span></div>}
      {showErrorMessage   && <div className="reports-notification error"><MdError size={18} color="#b33a3a" /><span>{message}</span></div>}

      {/* Header */}
      <div className="reports-header">
        <div className="reports-header-content">
          <h1 className="reports-title">Rescue Operations</h1>
          <p className="reports-subtitle">Manage and coordinate animal rescue missions with our ranger team</p>
        </div>
        <div className="reports-header-actions">
          <button onClick={fetchReports} className="reports-btn refresh" title="Refresh data"><MdRefresh size={18} /></button>
          <button onClick={exportToCSV} className="reports-btn primary" disabled={reports.length === 0} title="Export to CSV">
            <MdDownload size={16} style={{ marginRight: 4 }} />Export CSV
          </button>
        </div>
      </div>

      {/* Filters */}
      <div className="reports-filters-card">
        <div className="reports-search-wrapper">
          <MdSearch className="search-icon" size={18} />
          <input
            type="text"
            placeholder="Search by ID, animal, location, ranger, declined reason..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="reports-search-input"
          />
          {searchQuery && <button className="reports-clear-search" onClick={() => setSearchQuery('')}><MdClose size={18} /></button>}
        </div>
        <div className="reports-filters-row">
          <div className="reports-filter-group">
            <label className="reports-filter-label"><MdFilterList size={11} style={{ marginRight: 4 }} />Status</label>
            <div className="reports-select-wrapper">
              <select value={filterStatus} onChange={(e) => setFilterStatus(e.target.value)} className="reports-filter-select">
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
            <label className="reports-filter-label"><MdSort size={11} style={{ marginRight: 4 }} />Sort By</label>
            <div className="reports-select-wrapper">
              <select value={sortBy} onChange={(e) => setSortBy(e.target.value)} className="reports-filter-select">
                <option value="recent">Most Recent</option>
                <option value="oldest">Oldest</option>
                <option value="critical">Critical First</option>
                <option value="status">By Status</option>
              </select>
              <span className="reports-select-arrow">▼</span>
            </div>
          </div>
          <div className="reports-stats-badge">{filteredReports.length} of {reports.length} missions</div>
        </div>
      </div>

      {/* Grid */}
      <div className="reports-content">
        {filteredReports.length === 0 ? (
          <div className="reports-empty-state">
            <FaPaw size={48} color="#ccc" style={{ marginBottom: 16 }} />
            <h3>No Rescue Missions Found</h3>
            <p>
              {searchQuery ? `No missions matching "${searchQuery}"` : filterStatus !== 'all' ? `No missions with status "${filterStatus}"` : 'No rescue missions have been reported yet.'}
            </p>
            {(searchQuery || filterStatus !== 'all') && (
              <button onClick={() => { setSearchQuery(''); setFilterStatus('all'); setCurrentPage(1); }} className="reports-btn outline">Clear Filters</button>
            )}
          </div>
        ) : (
          <>
            <div className="reports-grid">
              {currentItems.map(report => {
                const isDeclined      = report.status_id === 5;
                const statusDisplay   = getStatusName(report.status_id, report.status_name);
                const badgeColors     = getStatusBadgeColors(report.status_id);
                const evidencePhotos  = report.task_id ? (taskEvidence[report.task_id] || []) : [];
                const firstPhoto      = evidencePhotos.length > 0 ? getFullImageUrl(evidencePhotos[0].proof_url) : null;
                const cardTitle       = getCardTitle(report.animal_type, report.animal_condition);
                const isCritical      = report.animal_condition?.toLowerCase().includes('critical') || report.animal_condition?.toLowerCase().includes('injur');
                const condInTitle     = cardTitle.toLowerCase().startsWith((report.animal_condition || '').toLowerCase().split(' ')[0]);
                const completionNotes = report.task_id ? (taskCompletionNotes[report.task_id] || []) : [];

                return (
                  <div key={report.report_id} className="rr-card" onClick={() => handleViewTaskDetails(report)}>

                    {/* Image / Placeholder */}
                    <div className="rr-card-img">
                      {firstPhoto && (
                        <img
                          src={firstPhoto}
                          alt="Evidence"
                          onError={e => {
                            (e.currentTarget as HTMLImageElement).style.display = 'none';
                            const fb = (e.currentTarget as HTMLImageElement).nextElementSibling as HTMLElement;
                            if (fb) fb.style.display = 'flex';
                          }}
                        />
                      )}
                      <div className="rr-card-placeholder" style={{ display: firstPhoto ? 'none' : 'flex' }}>
                        <div className="rr-card-placeholder-emoji">{getAnimalEmoji(report.animal_type)}</div>
                        <span className="rr-card-placeholder-label">No photo yet</span>
                      </div>
                      {/* Overlays */}
                      <span className="rr-card-badge" style={{ background: badgeColors.bg, color: badgeColors.color }}>{statusDisplay.toUpperCase()}</span>
                      <span className="rr-card-id">#{report.report_id}</span>
                      {evidencePhotos.length > 0 && (
                        <span className="rr-card-photo-count"><MdCameraAlt size={11} style={{ marginRight: 3 }} />{evidencePhotos.length}</span>
                      )}
                    </div>

                    {/* Body */}
                    <div className="rr-card-body">
                      <div className="rr-card-title-row">
                        <span className="rr-card-emoji">{getAnimalEmoji(report.animal_type)}</span>
                        <span className="rr-card-title">{cardTitle}</span>
                      </div>

                      {report.animal_condition && !condInTitle && (
                        <span className={`rr-card-condition ${isCritical ? 'critical' : 'normal'}`}>{report.animal_condition}</span>
                      )}

                      <div className="rr-card-location">
                        <MdLocationOn size={13} color="#2D5A27" className="rr-location-icon" />
                        <span className="rr-card-location-text">{report.location_address}</span>
                      </div>

                      <p className="rr-card-desc">"{report.description}"</p>

                      {/* Volunteer / Declined */}
                      <div className="rr-card-ranger">
                        {report.volunteer_name ? (
                          <div className={`rr-ranger-pill ${isDeclined ? 'declined' : ''}`}>
                            <div className={`rr-ranger-avatar ${isDeclined ? 'declined' : ''}`}>{report.volunteer_name.charAt(0).toUpperCase()}</div>
                            <div className="rr-ranger-info">
                              <span className="rr-ranger-name">{report.volunteer_name}</span>
                              <span className="rr-ranger-role">{isDeclined ? 'Declined mission' : 'Assigned Ranger'}</span>
                              {isDeclined && report.declined_reason && (
                                <span className="rr-ranger-reason">"{report.declined_reason.length > 35 ? `${report.declined_reason.substring(0, 35)}…` : report.declined_reason}"</span>
                              )}
                            </div>
                            {isDeclined && <FaBan size={14} color="#d32f2f" className="rr-declined-icon" />}
                          </div>
                        ) : (
                          <div className="rr-no-ranger">
                            <FaUserShield size={13} color="#aaa" style={{ marginRight: 6 }} />
                            <span>No ranger assigned</span>
                          </div>
                        )}
                      </div>

                      {/* Reporter row */}
                      <div className="rr-card-reporter-row">
                        <div className="rr-reporter-pill">
                          <div className="rr-reporter-avatar">{report.username.charAt(0).toUpperCase()}</div>
                          <span className="rr-reporter-name">{report.username}</span>
                        </div>
                        <span className="rr-card-time"><MdAccessTime size={11} style={{ marginRight: 3 }} />{formatRelativeTime(report.submitted_at)}</span>
                      </div>

                      {/* Completion notes teaser */}
                      {completionNotes.length > 0 && (
                        <div className="rr-completion-note-teaser">
                          <MdCheckCircle size={12} color="#2D5A27" style={{ marginRight: 4, flexShrink: 0 }} />
                          <span>"{completionNotes[0].note_text.length > 55 ? `${completionNotes[0].note_text.substring(0, 55)}…` : completionNotes[0].note_text}"</span>
                        </div>
                      )}
                    </div>

                    {/* Footer */}
                    <div className="rr-card-footer">
                      <button className="rr-card-btn" onClick={e => { e.stopPropagation(); handleViewTaskDetails(report); }}>
                        <MdAssignment size={14} style={{ marginRight: 5 }} />VIEW MISSION DETAILS
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Pagination */}
            {totalPages > 1 && (
              <div className="reports-pagination">
                <button onClick={prevPage} disabled={currentPage === 1} className="reports-pagination-btn">← Prev</button>
                <div className="reports-pagination-numbers">
                  {getPageNumbers().map(pageNum => (
                    <button key={pageNum} onClick={() => paginate(pageNum)} className={`reports-pagination-number ${currentPage === pageNum ? 'active' : ''}`}>{pageNum}</button>
                  ))}
                </div>
                <button onClick={nextPage} disabled={currentPage === totalPages} className="reports-pagination-btn">Next →</button>
              </div>
            )}
          </>
        )}
      </div>

      {/* Modals */}
      <ReportDetailModal
        report={selectedReport}
        isOpen={isModalOpen}
        onClose={() => { setIsModalOpen(false); setSelectedReport(null); }}
        onAssignClick={() => { setIsModalOpen(false); setIsVolunteerModalOpen(true); }}
        onUnassign={unassignVolunteer}
        getAnimalEmoji={getAnimalEmoji}
        formatDate={formatDate}
        getStatusName={getStatusName}
        showMessage={showMessage}
        evidence={selectedReport?.task_id ? taskEvidence[selectedReport.task_id] : []}
        completionNotes={selectedReport?.task_id ? taskCompletionNotes[selectedReport.task_id] : []}
      />

      <VolunteerSelectModal
        report={selectedReport}
        isOpen={isVolunteerModalOpen}
        onClose={() => { setIsVolunteerModalOpen(false); setIsModalOpen(true); }}
        onSelect={(volunteer) => { if (selectedReport) assignVolunteer(selectedReport.report_id, volunteer.user_id, volunteer.username); }}
        volunteers={volunteers}
        loadingVolunteers={loadingVolunteers}
        getAnimalEmoji={getAnimalEmoji}
        formatVolunteerDate={formatVolunteerDate}
      />
    </div>
  );
};

export default RescueReports;
