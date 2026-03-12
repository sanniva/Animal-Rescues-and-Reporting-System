import { toast } from 'react-toastify';
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
// // //   status_name: string;
// // //   is_deleted?: number;
// // //   reporter_name?: string;
// // //   reporter_phone?: string;
// // //   reporter_email?: string;
// // //   volunteer_name?: string;
// // //   volunteer_id?: number;
// // //   task_id?: number;
// // //   task_status_id?: number;
// // //   task_status?: string;
// // //   assigned_at?: string;
// // //   started_at?: string;
// // //   completed_at?: string;
// // //   volunteer_responded_at?: string;
// // //   volunteer_response?: string;
// // //   declined_reason?: string;
// // //   admin_note?: string;
// // // }

// // // interface AdminNote {
// // //   note_id: number;
// // //   report_id: number;
// // //   admin_id: number;
// // //   note_text: string;
// // //   created_at: string;
// // //   admin_name?: string;
// // // }

// // // interface TaskProof {
// // //   proof_id: number;
// // //   task_id: number;
// // //   proof_url: string;
// // //   uploaded_at: string;
// // // }

// // // interface TaskCompletionNote {
// // //   note_id: number;
// // //   task_id: number;
// // //   volunteer_id: number;
// // //   note_text: string;
// // //   created_at: string;
// // // }

// // // interface VolunteerTask {
// // //   task_id: number;
// // //   report_id: number;
// // //   assigned_to_user_id: number;
// // //   assigned_by_user_id: number;
// // //   task_status_id: number;
// // //   task_status: string;
// // //   assigned_at: string;
// // //   volunteer_responded_at?: string;
// // //   volunteer_response?: string;
// // //   declined_reason?: string;
// // //   started_at?: string;
// // //   completed_at?: string;
// // //   is_deleted?: number;
  
// // //   // Report fields
// // //   user_id: number;
// // //   description: string;
// // //   location_address: string;
// // //   user_note: string;
// // //   submitted_at: string;
// // //   animal_type: string;
// // //   animal_condition: string;
// // //   report_status_id: number;
// // //   report_status: string;
  
// // //   // Reporter fields
// // //   reporter_name: string;
// // //   reporter_phone: string;
// // //   reporter_email: string;
  
// // //   // Volunteer fields
// // //   volunteer_name: string;
// // //   volunteer_email: string;
// // //   volunteer_phone: string;
// // // }

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

// // // const getStatusText = (statusName: string): string => {
// // //   if (!statusName) return 'Unknown';
  
// // //   const formattedName = statusName
// // //     .replace(/_/g, ' ')
// // //     .split(' ')
// // //     .map(word => word.charAt(0).toUpperCase() + word.slice(1))
// // //     .join(' ');
  
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

// // // const getTaskStatusBadge = (statusId: number | undefined): { text: string; class: string } => {
// // //   switch(statusId) {
// // //     case 1: return { text: 'ASSIGNED', class: 'assigned' };
// // //     case 2: return { text: 'IN PROGRESS', class: 'progress' };
// // //     case 3: return { text: 'COMPLETED', class: 'completed' };
// // //     case 4: return { text: 'DECLINED', class: 'declined' };
// // //     default: return { text: 'UNKNOWN', class: 'unknown' };
// // //   }
// // // };

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

// // // const formatDate = (dateString: string): string => {
// // //   if (!dateString || dateString === 'Not available' || dateString === 'Invalid date' || dateString === '') {
// // //     return 'Not available';
// // //   }
// // //   try {
// // //     const date = new Date(dateString);
// // //     if (isNaN(date.getTime())) return 'Not available';
// // //     return date.toLocaleDateString('en-US', {
// // //       month: 'short',
// // //       day: 'numeric',
// // //       year: 'numeric',
// // //       hour: '2-digit',
// // //       minute: '2-digit'
// // //     });
// // //   } catch (e) {
// // //     return 'Not available';
// // //   }
// // // };

// // // const formatShortDate = (dateString: string): string => {
// // //   if (!dateString || dateString === 'Not available' || dateString === 'Invalid date' || dateString === '') {
// // //     return 'Not available';
// // //   }
// // //   try {
// // //     const date = new Date(dateString);
// // //     if (isNaN(date.getTime())) return 'Not available';
// // //     return date.toLocaleDateString('en-US', {
// // //       month: 'short',
// // //       day: 'numeric',
// // //       year: 'numeric'
// // //     });
// // //   } catch (e) {
// // //     return 'Not available';
// // //   }
// // // };

// // // const formatRelativeTime = (dateString: string): string => {
// // //   if (!dateString || dateString === 'Not available' || dateString === 'Invalid date' || dateString === '') {
// // //     return 'Not available';
// // //   }
// // //   try {
// // //     const date = new Date(dateString);
// // //     if (isNaN(date.getTime())) return 'Not available';
    
// // //     const now = new Date();
// // //     const diffMs = now.getTime() - date.getTime();
// // //     const diffMins = Math.floor(diffMs / 60000);
// // //     const diffHours = Math.floor(diffMins / 60);
// // //     const diffDays = Math.floor(diffHours / 24);

// // //     if (diffMins < 1) return 'Just now';
// // //     if (diffMins < 60) return `${diffMins} minute${diffMins === 1 ? '' : 's'} ago`;
// // //     if (diffHours < 24) return `${diffHours} hour${diffHours === 1 ? '' : 's'} ago`;
// // //     if (diffDays === 1) return 'Yesterday';
// // //     if (diffDays < 7) return `${diffDays} days ago`;
// // //     return formatShortDate(dateString);
// // //   } catch (e) {
// // //     return 'Not available';
// // //   }
// // // };

// // // const DeclineModal: React.FC<{
// // //   isOpen: boolean;
// // //   onClose: () => void;
// // //   onSubmit: (reason: string) => void;
// // //   taskId: number;
// // // }> = ({ isOpen, onClose, onSubmit, taskId }) => {
// // //   const [reason, setReason] = useState('');
// // //   const [otherReason, setOtherReason] = useState('');
// // //   const [submitting, setSubmitting] = useState(false);

// // //   if (!isOpen) return null;

// // //   const handleSubmit = async () => {
// // //     const finalReason = reason === 'other' ? otherReason : reason;
// // //     if (finalReason) {
// // //       setSubmitting(true);
// // //       try {
// // //         await onSubmit(finalReason);
// // //       } finally {
// // //         setSubmitting(false);
// // //         setReason('');
// // //         setOtherReason('');
// // //       }
// // //     }
// // //   };

// // //   return (
// // //     <div className="modal-overlay" onClick={onClose}>
// // //       <div className="modal-content" onClick={e => e.stopPropagation()}>
// // //         <div className="modal-header">
// // //           <div className="modal-header-left">
// // //             <span className="modal-icon">❌</span>
// // //             <div>
// // //               <h3 className="modal-title">Decline Task #{taskId}</h3>
// // //               <p className="modal-subtitle">Please provide a reason for declining</p>
// // //             </div>
// // //           </div>
// // //           <button className="modal-close" onClick={onClose}>×</button>
// // //         </div>
        
// // //         <div className="modal-body">
// // //           <div className="decline-info">
// // //             <p>Your reason helps us improve our volunteer matching system.</p>
// // //           </div>
          
// // //           <div className="form-group">
// // //             <label className="form-label">
// // //               Reason <span className="required">*</span>
// // //             </label>
// // //             <select 
// // //               className="form-select"
// // //               value={reason}
// // //               onChange={(e) => setReason(e.target.value)}
// // //             >
// // //               <option value="">Select a reason</option>
// // //               <option value="Too far away">Too far away</option>
// // //               <option value="Already have active tasks">Already have active tasks</option>
// // //               <option value="Animal type not suitable">Animal type not suitable</option>
// // //               <option value="Condition too severe">Condition too severe</option>
// // //               <option value="Equipment not available">Equipment not available</option>
// // //               <option value="other">Other (please specify)</option>
// // //             </select>
// // //           </div>

// // //           {reason === 'other' && (
// // //             <div className="form-group">
// // //               <label className="form-label">
// // //                 Please specify <span className="required">*</span>
// // //               </label>
// // //               <textarea
// // //                 className="form-textarea"
// // //                 value={otherReason}
// // //                 onChange={(e) => setOtherReason(e.target.value)}
// // //                 placeholder="Enter your reason..."
// // //                 rows={3}
// // //               />
// // //             </div>
// // //           )}
// // //         </div>
        
// // //         <div className="modal-footer">
// // //           <button className="modal-btn secondary" onClick={onClose}>
// // //             Cancel
// // //           </button>
// // //           <button 
// // //             className="modal-btn danger" 
// // //             onClick={handleSubmit}
// // //             disabled={!reason || (reason === 'other' && !otherReason) || submitting}
// // //           >
// // //             {submitting ? 'Processing...' : 'Decline Task'}
// // //           </button>
// // //         </div>
// // //       </div>
// // //     </div>
// // //   );
// // // };

// // // const TaskDetailModal: React.FC<{
// // //   task: VolunteerTask | null;
// // //   isOpen: boolean;
// // //   onClose: () => void;
// // //   onComplete: (taskId: number) => void;
// // //   onUploadEvidence: (taskId: number, file: File, notes: string) => void;
// // //   actionLoading: boolean;
// // //   userProfile: UserProfile | null;
// // //   evidence?: TaskProof[];
// // //   adminNotes?: AdminNote[];
// // // }> = ({ 
// // //   task, 
// // //   isOpen, 
// // //   onClose, 
// // //   onComplete,
// // //   onUploadEvidence,
// // //   actionLoading, 
// // //   userProfile, 
// // //   evidence = [], 
// // //   adminNotes = []
// // // }) => {
// // //   const [selectedImage, setSelectedImage] = useState<string | null>(null);
// // //   const [showUploadForm, setShowUploadForm] = useState(false);
// // //   const [proofFile, setProofFile] = useState<File | null>(null);
// // //   const [completionNote, setCompletionNote] = useState('');
// // //   const [previewUrl, setPreviewUrl] = useState<string | null>(null);
// // //   const [uploadError, setUploadError] = useState<string | null>(null);
// // //   const [uploading, setUploading] = useState(false);

// // //   if (!isOpen || !task) return null;

// // //   const hasProofs = evidence.length > 0;

// // //   const validateFile = (file: File): boolean => {
// // //     if (file.size > 5 * 1024 * 1024) {
// // //       setUploadError('File is too large. Maximum size is 5MB');
// // //       return false;
// // //     }
    
// // //     const allowedTypes = ['image/jpeg', 'image/png', 'image/jpg', 'image/gif'];
// // //     if (!allowedTypes.includes(file.type)) {
// // //       setUploadError('Invalid file type. Allowed: JPG, PNG, GIF');
// // //       return false;
// // //     }
    
// // //     return true;
// // //   };

// // //   const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
// // //     if (e.target.files && e.target.files[0]) {
// // //       setUploadError(null);
// // //       const file = e.target.files[0];
      
// // //       if (validateFile(file)) {
// // //         if (previewUrl) {
// // //           URL.revokeObjectURL(previewUrl);
// // //         }
        
// // //         setProofFile(file);
// // //         const newPreview = URL.createObjectURL(file);
// // //         setPreviewUrl(newPreview);
// // //       }
// // //     }
// // //   };

// // //   const removeFile = () => {
// // //     if (previewUrl) {
// // //       URL.revokeObjectURL(previewUrl);
// // //     }
// // //     setProofFile(null);
// // //     setPreviewUrl(null);
// // //     setUploadError(null);
// // //   };

// // //   const handleUploadSubmit = async () => {
// // //     if (!proofFile) {
// // //       setUploadError('Please select a photo');
// // //       return;
// // //     }
// // //     if (!completionNote.trim()) {
// // //       setUploadError('Please enter completion notes');
// // //       return;
// // //     }
    
// // //     setUploading(true);
// // //     try {
// // //       await onUploadEvidence(task.task_id, proofFile, completionNote);
// // //       setShowUploadForm(false);
// // //       setProofFile(null);
// // //       setCompletionNote('');
// // //       setPreviewUrl(null);
// // //     } catch (error) {
// // //       console.error('Upload error:', error);
// // //     } finally {
// // //       setUploading(false);
// // //     }
// // //   };

// // //   const getFullImageUrl = (proofUrl: string) => {
// // //     if (proofUrl.startsWith('http')) {
// // //       return proofUrl;
// // //     }
// // //     const cleanUrl = proofUrl.startsWith('/') ? proofUrl.substring(1) : proofUrl;
// // //     return `http://localhost:5000/${cleanUrl}`;
// // //   };

// // //   return (
// // //     <div className="reports-modal-overlay" onClick={onClose}>
// // //       <div className="reports-modal-content large" onClick={e => e.stopPropagation()}>
// // //         <div className="reports-modal-header dark">
// // //           <div>
// // //             <h3>Rescue Report #{task.report_id}</h3>
// // //             <div className="reports-modal-subheader">
// // //               <span className="reports-status-badge in-progress">
// // //                 {task.task_status || 'IN PROGRESS'}
// // //               </span>
// // //               <span className="reports-meta">
// // //                 {formatDate(task.submitted_at)}
// // //               </span>
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
// // //                       {getAnimalEmoji(task.animal_type)}
// // //                     </div>
// // //                     <div className="reports-animal-details">
// // //                       <div className="reports-animal-type">{task.animal_type}</div>
// // //                       <div className="reports-animal-condition">
// // //                         <span className="condition-tag">{task.animal_condition}</span>
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
// // //                       <span className="reports-detail-value">{task.reporter_name || 'Anonymous'}</span>
// // //                     </div>
// // //                     {task.reporter_email && task.reporter_email !== 'No email' && (
// // //                       <div className="reports-detail-row">
// // //                         <span className="reports-detail-label">Email</span>
// // //                         <span className="reports-detail-value">
// // //                           <span className="email-icon">✉️</span>
// // //                           {task.reporter_email}
// // //                         </span>
// // //                       </div>
// // //                     )}
// // //                     {task.reporter_phone && task.reporter_phone !== 'No phone' && (
// // //                       <div className="reports-detail-row">
// // //                         <span className="reports-detail-label">Phone</span>
// // //                         <span className="reports-detail-value">{task.reporter_phone}</span>
// // //                       </div>
// // //                     )}
// // //                   </div>
// // //                 </div>
// // //               </div>

// // //               <div className="reports-info-card">
// // //                 <div className="reports-card-header beige">
// // //                   <h4>📍 Location</h4>
// // //                 </div>
// // //                 <div className="reports-card-content">
// // //                   <div className="reports-location-info">
// // //                     <p>{task.location_address}</p>
// // //                     <button 
// // //                       className="reports-btn map"
// // //                       onClick={() => {
// // //                         const encodedAddress = encodeURIComponent(task.location_address);
// // //                         window.open(`https://maps.google.com/?q=${encodedAddress}`, '_blank');
// // //                       }}
// // //                     >
// // //                       View on Map
// // //                     </button>
// // //                   </div>
// // //                 </div>
// // //               </div>

// // //               <div className="reports-info-card">
// // //                 <div className="reports-card-header beige">
// // //                   <h4>⏱️ Timeline</h4>
// // //                 </div>
// // //                 <div className="reports-card-content">
// // //                   <div className="reports-detail-list">
// // //                     <div className="reports-detail-row">
// // //                       <span className="reports-detail-label">Reported</span>
// // //                       <span className="reports-detail-value">{formatDate(task.submitted_at)}</span>
// // //                     </div>
// // //                     <div className="reports-detail-row">
// // //                       <span className="reports-detail-label">Assigned</span>
// // //                       <span className="reports-detail-value">{formatDate(task.assigned_at)}</span>
// // //                     </div>
// // //                     {task.started_at && (
// // //                       <div className="reports-detail-row">
// // //                         <span className="reports-detail-label">Started</span>
// // //                         <span className="reports-detail-value">{formatDate(task.started_at)}</span>
// // //                       </div>
// // //                     )}
// // //                   </div>
// // //                 </div>
// // //               </div>
// // //             </div>

// // //             <div className="reports-detail-column">
// // //               <div className="reports-info-card">
// // //                 <div className="reports-card-header beige">
// // //                   <h4>📝 Mission Description</h4>
// // //                 </div>
// // //                 <div className="reports-card-content">
// // //                   <div className="reports-description">
// // //                     <p>{task.description}</p>
// // //                   </div>
// // //                   {task.user_note && (
// // //                     <div className="reports-user-note">
// // //                       <div className="note-label">Reporter's Note:</div>
// // //                       <p>{task.user_note}</p>
// // //                     </div>
// // //                   )}
// // //                 </div>
// // //               </div>

// // //               <div className="reports-info-card">
// // //                 <div className="reports-card-header beige">
// // //                   <div className="reports-header-row">
// // //                     <h4>📸 Evidence Photos</h4>
// // //                     {task.task_status_id === 2 && !showUploadForm && !hasProofs && (
// // //                       <button 
// // //                         className="reports-btn primary small"
// // //                         onClick={() => setShowUploadForm(true)}
// // //                       >
// // //                         + Upload Evidence
// // //                       </button>
// // //                     )}
// // //                   </div>
// // //                 </div>
// // //                 <div className="reports-card-content">
// // //                   {evidence.length > 0 ? (
// // //                     <div>
// // //                       <p style={{ marginBottom: '10px', color: '#2D5A27', fontWeight: '600' }}>
// // //                         {evidence.length} photo(s) uploaded
// // //                       </p>
// // //                       <div style={{ 
// // //                         display: 'grid', 
// // //                         gridTemplateColumns: 'repeat(2, 1fr)', 
// // //                         gap: '15px',
// // //                         marginTop: '10px'
// // //                       }}>
// // //                         {evidence.map((proof) => (
// // //                           <div 
// // //                             key={proof.proof_id} 
// // //                             style={{ 
// // //                               border: '1px solid #e8dfc9',
// // //                               borderRadius: '8px',
// // //                               padding: '8px',
// // //                               background: '#f9f5ec',
// // //                               cursor: 'pointer'
// // //                             }}
// // //                             onClick={() => setSelectedImage(getFullImageUrl(proof.proof_url))}
// // //                           >
// // //                             <img 
// // //                               src={getFullImageUrl(proof.proof_url)} 
// // //                               alt={`Evidence ${proof.proof_id}`}
// // //                               style={{ 
// // //                                 width: '100%',
// // //                                 height: '120px',
// // //                                 objectFit: 'cover',
// // //                                 borderRadius: '4px'
// // //                               }}
// // //                               onError={(e) => {
// // //                                 console.error('Image failed to load:', proof.proof_url);
// // //                                 e.currentTarget.style.display = 'none';
// // //                               }}
// // //                             />
// // //                             <p style={{ 
// // //                               fontSize: '0.7rem', 
// // //                               textAlign: 'center', 
// // //                               marginTop: '5px',
// // //                               color: '#666'
// // //                             }}>
// // //                               Uploaded: {formatShortDate(proof.uploaded_at)}
// // //                             </p>
// // //                           </div>
// // //                         ))}
// // //                       </div>
// // //                     </div>
// // //                   ) : (
// // //                     <div>
// // //                       {showUploadForm ? (
// // //                         <div className="upload-form">
// // //                           {uploadError && (
// // //                             <div className="error-message" style={{ marginBottom: '10px', color: '#c62828' }}>
// // //                               {uploadError}
// // //                             </div>
// // //                           )}

// // //                           {previewUrl ? (
// // //                             <div className="single-photo-preview">
// // //                               <div className="preview-container" style={{ position: 'relative', display: 'inline-block', width: '100%' }}>
// // //                                 <img 
// // //                                   src={previewUrl} 
// // //                                   alt="Preview" 
// // //                                   style={{ 
// // //                                     width: '100%',
// // //                                     maxHeight: '200px',
// // //                                     objectFit: 'contain',
// // //                                     borderRadius: '4px'
// // //                                   }} 
// // //                                 />
// // //                                 <button 
// // //                                   onClick={removeFile}
// // //                                   style={{
// // //                                     position: 'absolute',
// // //                                     top: '5px',
// // //                                     right: '5px',
// // //                                     background: '#c62828',
// // //                                     color: 'white',
// // //                                     border: 'none',
// // //                                     borderRadius: '50%',
// // //                                     width: '25px',
// // //                                     height: '25px',
// // //                                     cursor: 'pointer'
// // //                                   }}
// // //                                 >
// // //                                   ×
// // //                                 </button>
// // //                               </div>
// // //                               <p style={{ fontSize: '0.8rem', marginTop: '5px' }}>
// // //                                 {proofFile?.name} ({(proofFile!.size / 1024).toFixed(1)} KB)
// // //                               </p>
// // //                             </div>
// // //                           ) : (
// // //                             <div style={{ marginBottom: '15px' }}>
// // //                               <label className="reports-btn primary" style={{ cursor: 'pointer' }}>
// // //                                 Choose Photo
// // //                                 <input
// // //                                   type="file"
// // //                                   accept="image/jpeg,image/png,image/jpg,image/gif"
// // //                                   onChange={handleFileChange}
// // //                                   style={{ display: 'none' }}
// // //                                 />
// // //                               </label>
// // //                             </div>
// // //                           )}

// // //                           <div style={{ marginTop: '15px' }}>
// // //                             <label style={{ fontWeight: 'bold', display: 'block', marginBottom: '5px' }}>
// // //                               Completion Notes <span style={{ color: '#c62828' }}>*</span>
// // //                             </label>
// // //                             <textarea
// // //                               value={completionNote}
// // //                               onChange={(e) => setCompletionNote(e.target.value)}
// // //                               placeholder="Describe the rescue outcome, any challenges, and the animal's condition..."
// // //                               rows={3}
// // //                               maxLength={500}
// // //                               style={{
// // //                                 width: '100%',
// // //                                 padding: '8px',
// // //                                 border: '1px solid #ccc',
// // //                                 borderRadius: '4px',
// // //                                 fontFamily: 'inherit'
// // //                               }}
// // //                             />
// // //                             <p style={{ fontSize: '0.75rem', color: '#666', marginTop: '5px' }}>
// // //                               {completionNote.length}/500 characters
// // //                             </p>
// // //                           </div>

// // //                           <div style={{ display: 'flex', gap: '10px', marginTop: '15px' }}>
// // //                             <button 
// // //                               className="reports-btn secondary"
// // //                               onClick={() => {
// // //                                 setShowUploadForm(false);
// // //                                 setProofFile(null);
// // //                                 setCompletionNote('');
// // //                                 setPreviewUrl(null);
// // //                                 setUploadError(null);
// // //                               }}
// // //                             >
// // //                               Cancel
// // //                             </button>
// // //                             <button 
// // //                               className="reports-btn primary"
// // //                               onClick={handleUploadSubmit}
// // //                               disabled={!proofFile || !completionNote.trim() || uploading}
// // //                             >
// // //                               {uploading ? 'Uploading...' : 'Submit Evidence'}
// // //                             </button>
// // //                           </div>
// // //                         </div>
// // //                       ) : (
// // //                         <p>No evidence uploaded yet.</p>
// // //                       )}
// // //                     </div>
// // //                   )}
// // //                 </div>
// // //               </div>

// // //               <div className="reports-info-card">
// // //                 <div className="reports-card-header beige">
// // //                   <h4>📌 Admin Notes</h4>
// // //                 </div>
// // //                 <div className="reports-card-content">
// // //                   {adminNotes && adminNotes.length > 0 ? (
// // //                     <div className="admin-notes-container">
// // //                       {adminNotes.map((note) => (
// // //                         <div key={note.note_id} className="admin-note-item" style={{
// // //                           background: '#f9f5ec',
// // //                           padding: '12px',
// // //                           borderRadius: '8px',
// // //                           marginBottom: '10px',
// // //                           borderLeft: '3px solid #2D5A27'
// // //                         }}>
// // //                           <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '6px' }}>
// // //                             <span style={{ fontWeight: 'bold', color: '#2D5A27' }}>
// // //                               {note.admin_name || 'Admin'}
// // //                             </span>
// // //                             <span style={{ fontSize: '0.75rem', color: '#666' }}>
// // //                               {formatRelativeTime(note.created_at)}
// // //                             </span>
// // //                           </div>
// // //                           <p style={{ margin: 0, fontSize: '0.95rem', lineHeight: '1.5' }}>
// // //                             {note.note_text}
// // //                           </p>
// // //                         </div>
// // //                       ))}
// // //                     </div>
// // //                   ) : (
// // //                     <div style={{ 
// // //                       padding: '20px', 
// // //                       textAlign: 'center', 
// // //                       background: '#f9f5ec', 
// // //                       borderRadius: '8px',
// // //                       color: '#666'
// // //                     }}>
// // //                       <span style={{ fontSize: '2rem', display: 'block', marginBottom: '8px' }}>📝</span>
// // //                       <p style={{ margin: 0 }}>No admin notes for this report.</p>
// // //                     </div>
// // //                   )}
// // //                 </div>
// // //               </div>
// // //             </div>
// // //           </div>

// // //           {selectedImage && (
// // //             <div 
// // //               className="image-lightbox" 
// // //               onClick={() => setSelectedImage(null)} 
// // //               style={{
// // //                 position: 'fixed',
// // //                 top: 0,
// // //                 left: 0,
// // //                 right: 0,
// // //                 bottom: 0,
// // //                 background: 'rgba(0,0,0,0.9)',
// // //                 display: 'flex',
// // //                 alignItems: 'center',
// // //                 justifyContent: 'center',
// // //                 zIndex: 2000
// // //               }}
// // //             >
// // //               <img 
// // //                 src={selectedImage} 
// // //                 alt="Enlarged evidence" 
// // //                 style={{ maxWidth: '90%', maxHeight: '90%', objectFit: 'contain' }} 
// // //               />
// // //               <button 
// // //                 onClick={() => setSelectedImage(null)} 
// // //                 style={{
// // //                   position: 'absolute',
// // //                   top: '20px',
// // //                   right: '20px',
// // //                   background: 'white',
// // //                   border: 'none',
// // //                   borderRadius: '50%',
// // //                   width: '40px',
// // //                   height: '40px',
// // //                   fontSize: '20px',
// // //                   cursor: 'pointer'
// // //                 }}
// // //               >
// // //                 ×
// // //               </button>
// // //             </div>
// // //           )}
// // //         </div>
        
// // //         <div className="reports-modal-footer">
// // //           <button className="reports-btn secondary" onClick={onClose}>
// // //             Close
// // //           </button>
// // //           {task.task_status_id === 2 && !hasProofs && !showUploadForm && (
// // //             <button 
// // //               className="reports-btn complete"
// // //               onClick={() => onComplete(task.task_id)}
// // //               disabled={actionLoading}
// // //               style={{ background: '#2e7d32', color: 'white' }}
// // //             >
// // //               {actionLoading ? 'Processing...' : 'Complete Mission'}
// // //             </button>
// // //           )}
// // //         </div>
// // //       </div>
// // //     </div>
// // //   );
// // // };

// // // const ReportDetailModal: React.FC<{
// // //   report: Report | null;
// // //   isOpen: boolean;
// // //   onClose: () => void;
// // //   userPhone?: string;
// // //   userEmail?: string;
// // //   userName?: string;
// // // }> = ({ report, isOpen, onClose, userPhone, userEmail, userName }) => {
// // //   if (!isOpen || !report) return null;

// // //   const reporterName = report.reporter_name || userName;
// // //   const phoneNumber = report.reporter_phone || userPhone;
// // //   const emailAddress = report.reporter_email || userEmail;
// // //   const isEditable = report.status_name?.toLowerCase() === 'submitted';

// // //   const hasPhone = (phone?: string | null): boolean => {
// // //     if (phone === null || phone === undefined) return false;
// // //     if (typeof phone !== 'string') return false;
// // //     return phone.trim().length > 0;
// // //   };

// // //   const hasEmail = (email?: string | null): boolean => {
// // //     if (email === null || email === undefined) return false;
// // //     if (typeof email !== 'string') return false;
// // //     return email.trim().length > 0 && email.includes('@');
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
// // //               {hasEmail(emailAddress) && (
// // //                 <div className="detail-item">
// // //                   <span className="detail-label">Email</span>
// // //                   <span className="detail-value">
// // //                     <span className="email-icon">✉️</span>
// // //                     {emailAddress}
// // //                   </span>
// // //                 </div>
// // //               )}
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
// // //   const [allReports, setAllReports] = useState<Report[]>([]);
// // //   const [reportsLoading, setReportsLoading] = useState(true);
// // //   const [userProfile, setUserProfile] = useState<UserProfile | null>(null);
// // //   const [selectedReport, setSelectedReport] = useState<Report | null>(null);
// // //   const [isModalOpen, setIsModalOpen] = useState(false);
// // //   const navigate = useNavigate();
  
// // //   const { user: currentUser } = useAuth();
  
// // //   useEffect(() => {
// // //     const fetchUserProfile = async () => {
// // //       if (!currentUser) return;
      
// // //       try {
// // //         const token = sessionStorage.getItem('token');
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

// // //   const fetchAllReports = async () => {
// // //     try {
// // //       const token = sessionStorage.getItem('token');
// // //       const response = await fetch('http://localhost:5000/api/reports/admin/all', {
// // //         headers: {
// // //           'Authorization': `Bearer ${token}`,
// // //           'Content-Type': 'application/json'
// // //         }
// // //       });
      
// // //       if (response.ok) {
// // //         const data = await response.json();
// // //         if (data.success) {
// // //           setAllReports(data.data || []);
// // //         }
// // //       }
// // //     } catch (error) {
// // //       console.error('Error fetching all reports:', error);
// // //     }
// // //   };

// // //   useEffect(() => {
// // //     const fetchUserReports = async () => {
// // //       if (!currentUser) return;
      
// // //       try {
// // //         setReportsLoading(true);
// // //         const token = sessionStorage.getItem('token');
        
// // //         const response = await fetch('http://localhost:5000/api/reports/my-reports', {
// // //           headers: {
// // //             'Authorization': `Bearer ${token}`,
// // //             'Content-Type': 'application/json'
// // //           }
// // //         });
        
// // //         if (response.ok) {
// // //           const data = await response.json();
// // //           if (data.success) {
// // //             const reportsData = data.data || [];
// // //             const reportsWithUserInfo = reportsData.map((report: Report) => ({
// // //               ...report,
// // //               reporter_name: userProfile?.username || currentUser.username,
// // //               reporter_phone: userProfile?.phone || '',
// // //               reporter_email: userProfile?.email || ''
// // //             }));
// // //             setUserReports(reportsWithUserInfo);
// // //           }
// // //         }

// // //         if (getUserRole(currentUser) === 'admin') {
// // //           await fetchAllReports();
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

// // //     console.log('Checking volunteer status for user:', user);

// // //     // Check approval_status_id directly on user
// // //     if (user.approval_status_id !== undefined) {
// // //       if (user.approval_status_id === 1) return 'pending';
// // //       if (user.approval_status_id === 2) return 'approved';
// // //       if (user.approval_status_id === 3) return 'rejected';
// // //     }

// // //     // Check volunteer object
// // //     if (user.volunteer) {
// // //       console.log('Volunteer object:', user.volunteer);
      
// // //       // Check approval_status_id in volunteer object
// // //       if (user.volunteer.approval_status_id !== undefined) {
// // //         if (user.volunteer.approval_status_id === 1) return 'pending';
// // //         if (user.volunteer.approval_status_id === 2) return 'approved';
// // //         if (user.volunteer.approval_status_id === 3) return 'rejected';
// // //       }
      
// // //       // Check status string in volunteer object
// // //       if (user.volunteer.status) {
// // //         const status = user.volunteer.status.toLowerCase();
// // //         if (status.includes('pending')) return 'pending';
// // //         if (status.includes('approved')) return 'approved';
// // //         if (status.includes('reject')) return 'rejected';
// // //       }
// // //     }

// // //     // Check volunteer_status directly
// // //     if (user.volunteer_status) {
// // //       const status = user.volunteer_status.toLowerCase();
// // //       if (status.includes('pending')) return 'pending';
// // //       if (status.includes('approved')) return 'approved';
// // //       if (status.includes('reject')) return 'rejected';
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

// // //   const renderDashboard = () => {
// // //     console.log('Rendering dashboard with:', { userRole, volunteerStatus });

// // //     // ADMIN - highest priority
// // //     if (userRole === 'admin') {
// // //       return <AdminDashboard 
// // //         stats={stats} 
// // //         reports={allReports}
// // //         reportsLoading={reportsLoading} 
// // //       />;
// // //     }
    
// // //     // For volunteers, check their approval status FIRST
// // //     if (userRole === 'volunteer') {
// // //       // Check if volunteer is rejected - show rejection dashboard
// // //       if (volunteerStatus === 'rejected') {
// // //         console.log('Showing REJECTED volunteer dashboard');
// // //         return <RejectedVolunteerDashboard user={currentUser} />;
// // //       }
      
// // //       // Check if volunteer is pending - show pending dashboard
// // //       if (volunteerStatus === 'pending' || volunteerStatus === 'none' || !volunteerStatus) {
// // //         console.log('Showing PENDING volunteer dashboard');
// // //         return <PendingVolunteerDashboard user={currentUser} />;
// // //       }
      
// // //       // Only show full volunteer dashboard if approved
// // //       if (volunteerStatus === 'approved') {
// // //         console.log('Showing APPROVED volunteer dashboard');
// // //         return <VolunteerDashboard 
// // //           user={{...currentUser, role: userRole}} 
// // //           stats={stats} 
// // //           reports={userReports}
// // //           reportsLoading={reportsLoading}
// // //           userProfile={userProfile}
// // //         />;
// // //       }
// // //     }
    
// // //     // Regular user dashboard
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
// // //         userEmail={userProfile?.email}
// // //         userName={userProfile?.username}
// // //       />
// // //     </div>
// // //   );
// // // };

// // // const LoadingSpinner: React.FC = () => (
// // //   <div className="loading-spinner">
// // //     <div className="spinner"></div>
// // //     <p>Loading reports...</p>
// // //   </div>
// // // );

// // // const AdminDashboard: React.FC<{ 
// // //   stats: any, 
// // //   reports: Report[], 
// // //   reportsLoading: boolean
// // // }> = ({ stats, reports, reportsLoading }) => {
// // //   const totalReports = reports.length;
// // //   const submittedReports = reports.filter(r => r.status_name?.toLowerCase() === 'submitted').length;
// // //   const assignedReports = reports.filter(r => r.status_name?.toLowerCase() === 'assigned').length;
// // //   const inProgressReports = reports.filter(r => r.status_name?.toLowerCase() === 'in_progress').length;
// // //   const completedReports = reports.filter(r => r.status_name?.toLowerCase() === 'completed').length;
// // //   const declinedReports = reports.filter(r => r.status_name?.toLowerCase() === 'declined').length;

// // //   const uniqueReporters = new Set(reports.map(r => r.user_id)).size;

// // //   const chartData = [
// // //     { name: 'Reports', value: totalReports },
// // //     { name: 'Rescued', value: completedReports },
// // //     { name: 'Volunteers', value: 5 },
// // //   ];
  
// // //   const COLORS = ['#A67C52', '#2D5A27', '#7D8C5A'];

// // //   return (
// // //     <div className="dashboard-wrapper animate-fade-in">
// // //       <div className="admin-dashboard">
// // //         <div className="admin-header-section">
// // //           <h1 className="admin-header-title">ResQAll Command Center</h1>
// // //           <p className="admin-header-subtitle">Welcome back, Commander</p>
// // //         </div>
        
// // //         {/* Statistics Cards */}
// // //         <div className="admin-stats-grid">
// // //           <div className="stat-card">
// // //             <div className="stat-icon">📋</div>
// // //             <div className="stat-content">
// // //               <div className="stat-value">{reportsLoading ? '...' : totalReports}</div>
// // //               <div className="stat-label">Total Reports</div>
// // //             </div>
// // //           </div>
          
// // //           <div className="stat-card">
// // //             <div className="stat-icon">⏳</div>
// // //             <div className="stat-content">
// // //               <div className="stat-value">{reportsLoading ? '...' : submittedReports + assignedReports + inProgressReports}</div>
// // //               <div className="stat-label">Active Cases</div>
// // //             </div>
// // //           </div>
          
// // //           <div className="stat-card">
// // //             <div className="stat-icon">✅</div>
// // //             <div className="stat-content">
// // //               <div className="stat-value">{reportsLoading ? '...' : completedReports}</div>
// // //               <div className="stat-label">Completed</div>
// // //             </div>
// // //           </div>
          
// // //           <div className="stat-card">
// // //             <div className="stat-icon">👥</div>
// // //             <div className="stat-content">
// // //               <div className="stat-value">{reportsLoading ? '...' : uniqueReporters}</div>
// // //               <div className="stat-label">Reporters</div>
// // //             </div>
// // //           </div>
// // //         </div>

// // //         {/* Charts and Quick Actions Section */}
// // //         <div className="admin-charts-section">
// // //           <div className="chart-container">
// // //             <h3 className="chart-title">Report Status Distribution</h3>
// // //             <div className="recharts-wrapper">
// // //               {reportsLoading ? (
// // //                 <div className="chart-loading">
// // //                   <div className="spinner"></div>
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
// // //             <div className="volunteer-alert-icon">⚡</div>
// // //             <h3 className="volunteer-alert-title">Quick Navigation</h3>
// // //             <p className="volunteer-alert-text">
// // //               Manage your volunteer force or review all mission reports.
// // //             </p>
// // //             <Link to="/admin/users" className="volunteer-alert-btn" style={{ marginBottom: '10px', background: '#2D5A27' }}>
// // //               <span style={{ marginRight: '8px' }}>👥</span>
// // //               Manage Volunteers
// // //             </Link>
// // //             <Link to="/admin/rescue-reports" className="volunteer-alert-btn" style={{ background: '#1976D2' }}>
// // //               <span style={{ marginRight: '8px' }}>📋</span>
// // //               View All Reports
// // //             </Link>
// // //           </div>
// // //         </div>

// // //         {/* Recent Reports Table */}
// // //         <div className="recent-reports-section">
// // //           <div className="section-header">
// // //             <h3>Recent Reports ({reports.length})</h3>
// // //             <Link to="/admin/rescue-reports" className="view-all-link">
// // //               View All Reports →
// // //             </Link>
// // //           </div>
// // //           <div className="reports-table-container">
// // //             {reportsLoading ? (
// // //               <div className="loading-message">
// // //                 <div className="loading-spinner-small"></div>
// // //                 <p>Loading reports...</p>
// // //               </div>
// // //             ) : reports.length > 0 ? (
// // //               <table className="reports-table">
// // //                 <thead>
// // //                   <tr>
// // //                     <th>ID</th>
// // //                     <th>Animal</th>
// // //                     <th>Condition</th>
// // //                     <th>Location</th>
// // //                     <th>Reporter</th>
// // //                     <th>Volunteer</th>
// // //                     <th>Date</th>
// // //                     <th>Status</th>
// // //                   </tr>
// // //                 </thead>
// // //                 <tbody>
// // //                   {reports.slice(0, 10).map((report) => (
// // //                     <tr key={report.report_id}>
// // //                       <td>#{report.report_id}</td>
// // //                       <td className="animal-type">
// // //                         {getAnimalEmoji(report.animal_type)} {report.animal_type || 'Unknown'}
// // //                       </td>
// // //                       <td>{report.animal_condition || 'Unknown'}</td>
// // //                       <td className="location-cell">{report.location_address || 'No location'}</td>
// // //                       <td>{report.reporter_name || 'Anonymous'}</td>
// // //                       <td>
// // //                         {report.volunteer_name ? (
// // //                           <span className="volunteer-name">{report.volunteer_name}</span>
// // //                         ) : (
// // //                           <span className="not-assigned">Not assigned</span>
// // //                         )}
// // //                       </td>
// // //                       <td className="report-date">{formatShortDate(report.submitted_at)}</td>
// // //                       <td>
// // //                         <span className={`status-badge status-${getStatusClass(report.status_name)}`}>
// // //                           {getStatusText(report.status_name)}
// // //                         </span>
// // //                       </td>
// // //                     </tr>
// // //                   ))}
// // //                 </tbody>
// // //               </table>
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

// // // const VolunteerDashboard: React.FC<{ 
// // //   user: any, 
// // //   stats: any, 
// // //   reports: Report[],
// // //   reportsLoading: boolean,
// // //   userProfile: UserProfile | null
// // // }> = ({ user, stats, reports, reportsLoading, userProfile }) => {
// // //   const [activeMissions, setActiveMissions] = useState<VolunteerTask[]>([]);
// // //   const [pendingTasks, setPendingTasks] = useState<VolunteerTask[]>([]);
// // //   const [missionsLoading, setMissionsLoading] = useState(true);
// // //   const [fetchError, setFetchError] = useState<string | null>(null);
// // //   const [actionLoading, setActionLoading] = useState(false);
// // //   const [showAllActive, setShowAllActive] = useState(false);
// // //   const [showAllPending, setShowAllPending] = useState(false);
// // //   const [selectedTask, setSelectedTask] = useState<VolunteerTask | null>(null);
// // //   const [isTaskModalOpen, setIsTaskModalOpen] = useState(false);
// // //   const [isDeclineModalOpen, setIsDeclineModalOpen] = useState(false);
// // //   const [selectedTaskId, setSelectedTaskId] = useState<number | null>(null);
// // //   const [completedTasksCount, setCompletedTasksCount] = useState(0);
// // //   const [taskEvidence, setTaskEvidence] = useState<{[key: number]: TaskProof[]}>({});
// // //   const [taskAdminNotes, setTaskAdminNotes] = useState<{[key: number]: AdminNote[]}>({});
  
// // //   useEffect(() => {
// // //     const fetchAllTasks = async () => {
// // //       if (!user?.user_id) return;
      
// // //       try {
// // //         setMissionsLoading(true);
// // //         setFetchError(null);
// // //         const token = sessionStorage.getItem('token');
        
// // //         if (!token) {
// // //           setFetchError('No authentication token');
// // //           return;
// // //         }

// // //         const response = await fetch(
// // //           `http://localhost:5000/api/volunteers/tasks`,
// // //           {
// // //             method: 'GET',
// // //             headers: {
// // //               'Authorization': `Bearer ${token}`,
// // //               'Content-Type': 'application/json'
// // //             }
// // //           }
// // //         );
        
// // //         if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
        
// // //         const data = await response.json();
        
// // //         if (data.success && data.data) {
// // //           const assigned = data.data.filter((t: VolunteerTask) => t.task_status_id === 1);
// // //           const inProgress = data.data.filter((t: VolunteerTask) => t.task_status_id === 2);
// // //           const completed = data.data.filter((t: VolunteerTask) => t.task_status_id === 3);
          
// // //           setPendingTasks(assigned);
// // //           setActiveMissions(inProgress);
// // //           setCompletedTasksCount(completed.length);
// // //         } else {
// // //           setPendingTasks([]);
// // //           setActiveMissions([]);
// // //         }
// // //       } catch (error) {
// // //         console.error('Error fetching tasks:', error);
// // //         setFetchError(error instanceof Error ? error.message : 'Unknown error');
// // //         setPendingTasks([]);
// // //         setActiveMissions([]);
// // //       } finally {
// // //         setMissionsLoading(false);
// // //       }
// // //     };
    
// // //     fetchAllTasks();
// // //   }, [user?.user_id]);

// // //   const fetchTaskEvidence = async (taskId: number) => {
// // //     try {
// // //       const token = sessionStorage.getItem('token');
// // //       const response = await fetch(
// // //         `http://localhost:5000/api/tasks/${taskId}/evidence`,
// // //         {
// // //           headers: {
// // //             'Authorization': `Bearer ${token}`
// // //           }
// // //         }
// // //       );
// // //       const data = await response.json();
// // //       if (data.success) {
// // //         setTaskEvidence(prev => ({
// // //           ...prev,
// // //           [taskId]: data.data
// // //         }));
// // //       }
// // //     } catch (error) {
// // //       console.error('Error fetching evidence:', error);
// // //     }
// // //   };

// // //   const fetchTaskAdminNotes = async (reportId: number, taskId: number) => {
// // //     try {
// // //       const token = sessionStorage.getItem('token');
// // //       const response = await fetch(
// // //         `http://localhost:5000/api/reports/${reportId}/admin-notes`,
// // //         {
// // //           headers: {
// // //             'Authorization': `Bearer ${token}`
// // //           }
// // //         }
// // //       );
// // //       const data = await response.json();
// // //       if (data.success) {
// // //         setTaskAdminNotes(prev => ({
// // //           ...prev,
// // //           [taskId]: data.data
// // //         }));
// // //       }
// // //     } catch (error) {
// // //       console.error('Error fetching admin notes:', error);
// // //     }
// // //   };

// // //   const handleAcceptTask = async (taskId: number) => {
// // //     try {
// // //       setActionLoading(true);
// // //       const token = sessionStorage.getItem('token');
      
// // //       const response = await fetch(
// // //         `http://localhost:5000/api/volunteers/tasks/${taskId}/accept`,
// // //         {
// // //           method: 'PATCH',
// // //           headers: {
// // //             'Authorization': `Bearer ${token}`,
// // //             'Content-Type': 'application/json'
// // //           }
// // //         }
// // //       );
      
// // //       const data = await response.json();
      
// // //       if (data.success) {
// // //         const acceptedTask = pendingTasks.find(t => t.task_id === taskId);
// // //         if (acceptedTask) {
// // //           const updatedTask = {
// // //             ...acceptedTask,
// // //             task_status_id: 2,
// // //             task_status: 'in_progress',
// // //             started_at: new Date().toISOString()
// // //           };
// // //           setPendingTasks(prev => prev.filter(t => t.task_id !== taskId));
// // //           setActiveMissions(prev => [...prev, updatedTask]);
// // //         }
// // //         toast.success('Task accepted successfully!');
// // //       } else {
// // //         toast.success('Failed to accept task: ' + data.message);
// // //       }
// // //     } catch (error) {
// // //       console.error('Error accepting task:', error);
// // //       toast.success('Failed to accept task');
// // //     } finally {
// // //       setActionLoading(false);
// // //     }
// // //   };

// // //   const handleDeclineTask = async (taskId: number, reason: string) => {
// // //     try {
// // //       setActionLoading(true);
// // //       const token = sessionStorage.getItem('token');
      
// // //       const response = await fetch(
// // //         `http://localhost:5000/api/volunteers/tasks/${taskId}/decline`,
// // //         {
// // //           method: 'PATCH',
// // //           headers: {
// // //             'Authorization': `Bearer ${token}`,
// // //             'Content-Type': 'application/json'
// // //           },
// // //           body: JSON.stringify({ reason })
// // //         }
// // //       );
      
// // //       const data = await response.json();
      
// // //       if (data.success) {
// // //         setPendingTasks(prev => prev.filter(t => t.task_id !== taskId));
// // //         toast.success('Task declined successfully');
// // //       } else {
// // //         toast.success('Failed to decline task: ' + data.message);
// // //       }
// // //     } catch (error) {
// // //       console.error('Error declining task:', error);
// // //       toast.success('Failed to decline task');
// // //     } finally {
// // //       setActionLoading(false);
// // //       setIsDeclineModalOpen(false);
// // //       setSelectedTaskId(null);
// // //     }
// // //   };

// // //   const handleUploadEvidence = async (taskId: number, file: File, notes: string) => {
// // //     try {
// // //       setActionLoading(true);
// // //       const token = sessionStorage.getItem('token');
      
// // //       const formData = new FormData();
// // //       formData.append('proofs', file);
      
// // //       const uploadResponse = await fetch(
// // //         `http://localhost:5000/api/tasks/${taskId}/upload-proofs`,
// // //         {
// // //           method: 'POST',
// // //           headers: {
// // //             'Authorization': `Bearer ${token}`
// // //           },
// // //           body: formData
// // //         }
// // //       );
      
// // //       const uploadData = await uploadResponse.json();
      
// // //       if (!uploadData.success) {
// // //         toast.success('Failed to upload proof: ' + uploadData.message);
// // //         return;
// // //       }
      
// // //       const noteResponse = await fetch(
// // //         `http://localhost:5000/api/tasks/${taskId}/completion-notes`,
// // //         {
// // //           method: 'POST',
// // //           headers: {
// // //             'Authorization': `Bearer ${token}`,
// // //             'Content-Type': 'application/json'
// // //           },
// // //           body: JSON.stringify({ 
// // //             note_text: notes,
// // //             volunteer_id: user.user_id 
// // //           })
// // //         }
// // //       );
      
// // //       const noteData = await noteResponse.json();
      
// // //       if (!noteData.success) {
// // //         toast.success('Failed to save completion note: ' + noteData.message);
// // //         return;
// // //       }
      
// // //       const completeResponse = await fetch(
// // //         `http://localhost:5000/api/volunteers/tasks/${taskId}/complete`,
// // //         {
// // //           method: 'PATCH',
// // //           headers: {
// // //             'Authorization': `Bearer ${token}`,
// // //             'Content-Type': 'application/json'
// // //           }
// // //         }
// // //       );
      
// // //       const completeData = await completeResponse.json();
      
// // //       if (completeData.success) {
// // //         setActiveMissions(prev => prev.filter(t => t.task_id !== taskId));
// // //         setCompletedTasksCount(prev => prev + 1);
// // //         setIsTaskModalOpen(false);
// // //         setSelectedTask(null);
// // //         toast.success('Mission completed successfully! Thank you for your service!');
        
// // //         fetchTaskEvidence(taskId);
// // //       } else {
// // //         toast.success('Failed to complete mission: ' + completeData.message);
// // //       }
      
// // //     } catch (error) {
// // //       console.error('Error uploading evidence:', error);
// // //       toast.success('Failed to upload evidence and complete mission');
// // //     } finally {
// // //       setActionLoading(false);
// // //     }
// // //   };

// // //   const handleCompleteTask = async (taskId: number) => {
// // //     try {
// // //       setActionLoading(true);
// // //       const token = sessionStorage.getItem('token');
      
// // //       const response = await fetch(
// // //         `http://localhost:5000/api/volunteers/tasks/${taskId}/complete`,
// // //         {
// // //           method: 'PATCH',
// // //           headers: {
// // //             'Authorization': `Bearer ${token}`,
// // //             'Content-Type': 'application/json'
// // //           }
// // //         }
// // //       );
      
// // //       const data = await response.json();
      
// // //       if (data.success) {
// // //         const completedTask = activeMissions.find(t => t.task_id === taskId);
// // //         if (completedTask) {
// // //           setActiveMissions(prev => prev.filter(t => t.task_id !== taskId));
// // //           setCompletedTasksCount(prev => prev + 1);
// // //         }
// // //         setIsTaskModalOpen(false);
// // //         setSelectedTask(null);
// // //         toast.success('Mission completed successfully! Thank you for your service!');
// // //       } else {
// // //         toast.success('Failed to complete mission: ' + data.message);
// // //       }
// // //     } catch (error) {
// // //       console.error('Error completing task:', error);
// // //       toast.success('Failed to complete mission');
// // //     } finally {
// // //       setActionLoading(false);
// // //     }
// // //   };

// // //   const handleViewTaskDetails = (task: VolunteerTask) => {
// // //     setSelectedTask(task);
// // //     fetchTaskEvidence(task.task_id);
// // //     fetchTaskAdminNotes(task.report_id, task.task_id);
// // //     setIsTaskModalOpen(true);
// // //   };

// // //   const displayedActiveMissions = showAllActive ? activeMissions : activeMissions.slice(0, 3);
// // //   const displayedPendingTasks = showAllPending ? pendingTasks : pendingTasks.slice(0, 3);

// // //   return (
// // //     <div className="dashboard-wrapper animate-fade-in">
// // //       <div className="volunteer-dashboard-new">
        
// // //         <div className="reports-header" style={{ marginBottom: '2rem' }}>
// // //           <div className="reports-header-content">
// // //             <h1 className="reports-title">Welcome back, Ranger {user.username}!</h1>
// // //             <p className="reports-subtitle">
// // //               Your dedication saves lives. Ready for your next mission?
// // //             </p>
// // //             {userProfile?.email && (
// // //               <div style={{ marginTop: '0.5rem', display: 'flex', alignItems: 'center', gap: '8px' }}>
// // //                 <span style={{ fontSize: '1.1rem' }}>✉️</span>
// // //                 <span style={{ color: '#2D5A27', fontWeight: '500' }}>{userProfile.email}</span>
// // //               </div>
// // //             )}
// // //             {userProfile?.phone && (
// // //               <div style={{ marginTop: '0.5rem', display: 'flex', alignItems: 'center', gap: '8px' }}>
// // //                 <span style={{ fontSize: '1.1rem' }}>📱</span>
// // //                 <span style={{ color: '#2D5A27', fontWeight: '500' }}>Contact: {userProfile.phone}</span>
// // //               </div>
// // //             )}
// // //           </div>
// // //           <div className="reports-header-actions">
// // //             <Link to="/tasks" className="reports-btn refresh">
// // //               <span className="btn-icon">📋</span>
// // //               Mission Board
// // //             </Link>
// // //             <Link to="/profile" className="reports-btn refresh">
// // //               <span className="btn-icon">🏆</span>
// // //               My Profile
// // //             </Link>
// // //           </div>
// // //         </div>

// // //         <div className="reports-filters-card" style={{ marginBottom: '2rem', padding: '1.5rem' }}>
// // //           <div style={{ 
// // //             display: 'grid', 
// // //             gridTemplateColumns: 'repeat(4, 1fr)', 
// // //             gap: '1.5rem'
// // //           }}>
// // //             <div style={{ 
// // //               background: 'linear-gradient(135deg, #2D5A27 0%, #1e3f1a 100%)',
// // //               borderRadius: '12px',
// // //               padding: '1.25rem',
// // //               color: 'white'
// // //             }}>
// // //               <div style={{ fontSize: '0.85rem', opacity: '0.9', marginBottom: '0.5rem' }}>TOTAL RESCUES</div>
// // //               <div style={{ fontSize: '2.5rem', fontWeight: '700', lineHeight: '1' }}>
// // //                 {completedTasksCount}
// // //               </div>
// // //               <div style={{ fontSize: '0.8rem', opacity: '0.8', marginTop: '0.5rem' }}>Lives Saved ✓</div>
// // //             </div>

// // //             <div style={{ 
// // //               background: 'linear-gradient(135deg, #1976D2 0%, #0D47A1 100%)',
// // //               borderRadius: '12px',
// // //               padding: '1.25rem',
// // //               color: 'white'
// // //             }}>
// // //               <div style={{ fontSize: '0.85rem', opacity: '0.9', marginBottom: '0.5rem' }}>ACTIVE MISSIONS</div>
// // //               <div style={{ fontSize: '2.5rem', fontWeight: '700', lineHeight: '1' }}>
// // //                 {activeMissions.length}
// // //               </div>
// // //               <div style={{ fontSize: '0.8rem', opacity: '0.8', marginTop: '0.5rem' }}>In Progress 🎯</div>
// // //             </div>

// // //             <div style={{ 
// // //               background: 'linear-gradient(135deg, #FF9F1C 0%, #E65100 100%)',
// // //               borderRadius: '12px',
// // //               padding: '1.25rem',
// // //               color: 'white'
// // //             }}>
// // //               <div style={{ fontSize: '0.85rem', opacity: '0.9', marginBottom: '0.5rem' }}>PENDING</div>
// // //               <div style={{ fontSize: '2.5rem', fontWeight: '700', lineHeight: '1' }}>
// // //                 {pendingTasks.length}
// // //               </div>
// // //               <div style={{ fontSize: '0.8rem', opacity: '0.8', marginTop: '0.5rem' }}>Awaiting Decision ⏳</div>
// // //             </div>

// // //             <div style={{ 
// // //               background: 'linear-gradient(135deg, #7D8C5A 0%, #5A6B3E 100%)',
// // //               borderRadius: '12px',
// // //               padding: '1.25rem',
// // //               color: 'white'
// // //             }}>
// // //               <div style={{ fontSize: '0.85rem', opacity: '0.9', marginBottom: '0.5rem' }}>SUCCESS RATE</div>
// // //               <div style={{ fontSize: '2.5rem', fontWeight: '700', lineHeight: '1' }}>
// // //                 {completedTasksCount + activeMissions.length > 0 
// // //                   ? Math.round((completedTasksCount / (completedTasksCount + activeMissions.length)) * 100) 
// // //                   : 0}%
// // //               </div>
// // //               <div style={{ fontSize: '0.8rem', opacity: '0.8', marginTop: '0.5rem' }}>Mission Success</div>
// // //             </div>
// // //           </div>
// // //         </div>

// // //         {pendingTasks.length > 0 && (
// // //           <div className="reports-section" style={{ marginBottom: '2.5rem' }}>
// // //             <div className="reports-header">
// // //               <h2 className="reports-title" style={{ fontSize: '1.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
// // //                 <span>⏳</span> Pending Confirmation ({pendingTasks.length})
// // //               </h2>
// // //               {pendingTasks.length > 3 && (
// // //                 <button 
// // //                   onClick={() => setShowAllPending(!showAllPending)}
// // //                   className="view-all-link"
// // //                 >
// // //                   {showAllPending ? 'Show Less ↑' : `View All (${pendingTasks.length}) →`}
// // //                 </button>
// // //               )}
// // //             </div>
            
// // //             <div className="reports-grid" style={{ gridTemplateColumns: 'repeat(3, 1fr)' }}>
// // //               {displayedPendingTasks.map((task) => {
// // //                 const statusBadge = getTaskStatusBadge(task.task_status_id);
                
// // //                 return (
// // //                   <div key={task.task_id} className="reports-card">
// // //                     <div className="reports-card-header" style={{ background: '#FF9F1C' }}>
// // //                       <div className="reports-card-title">
// // //                         <span className="reports-id" style={{ background: 'rgba(255,255,255,0.2)', color: 'white' }}>
// // //                           #{task.report_id}
// // //                         </span>
// // //                         <span className="reports-status" style={{ background: 'rgba(255,255,255,0.2)', color: 'white' }}>
// // //                           {statusBadge.text}
// // //                         </span>
// // //                       </div>
// // //                       <div className="reports-date" style={{ color: 'rgba(255,255,255,0.9)' }}>
// // //                         {formatShortDate(task.submitted_at)}
// // //                       </div>
// // //                     </div>

// // //                     <div className="reports-card-body">
// // //                       <div className="reports-animal-section">
// // //                         <div className="reports-animal-icon large">
// // //                           {getAnimalEmoji(task.animal_type)}
// // //                         </div>
// // //                         <div className="reports-animal-info">
// // //                           <h4>{task.animal_type}</h4>
// // //                           <span className="reports-condition">{task.animal_condition}</span>
// // //                         </div>
// // //                       </div>

// // //                       <div className="reports-location-section">
// // //                         <span className="location-icon">📍</span>
// // //                         <span className="location-text">{task.location_address}</span>
// // //                       </div>

// // //                       <div className="reports-volunteer-section">
// // //                         <div className="reports-assigned-ranger" style={{ background: '#fef2e8' }}>
// // //                           <div className="ranger-avatar" style={{ background: '#E65100' }}>
// // //                             {task.reporter_name?.charAt(0).toUpperCase() || '?'}
// // //                           </div>
// // //                           <div className="ranger-info">
// // //                             <span className="ranger-name">{task.reporter_name || 'Anonymous'}</span>
// // //                             <span className="ranger-role">Reporter</span>
// // //                             {task.reporter_email && task.reporter_email !== 'No email' && (
// // //                               <span className="ranger-phone" style={{ fontSize: '0.75rem', color: '#E65100' }}>
// // //                                 ✉️ {task.reporter_email}
// // //                               </span>
// // //                             )}
// // //                             {task.reporter_phone && task.reporter_phone !== 'No phone' && (
// // //                               <span className="ranger-phone" style={{ fontSize: '0.75rem', color: '#E65100' }}>
// // //                                 📱 {task.reporter_phone}
// // //                               </span>
// // //                             )}
// // //                           </div>
// // //                         </div>
// // //                       </div>
                      
// // //                       <p className="reports-description" style={{ 
// // //                         fontSize: '0.85rem', 
// // //                         marginBottom: '0.5rem',
// // //                         color: '#666'
// // //                       }}>
// // //                         {task.description?.length > 80 
// // //                           ? `${task.description.substring(0, 80)}...` 
// // //                           : task.description || 'No description provided'}
// // //                       </p>
// // //                     </div>

// // //                     <div className="reports-card-footer">
// // //                       <div style={{ display: 'flex', gap: '0.75rem' }}>
// // //                         <button 
// // //                           onClick={() => handleAcceptTask(task.task_id!)}
// // //                           disabled={actionLoading}
// // //                           className="reports-btn"
// // //                           style={{ 
// // //                             flex: 2,
// // //                             background: '#2e7d32',
// // //                             color: 'white',
// // //                             padding: '0.6rem',
// // //                             fontSize: '0.85rem',
// // //                             fontWeight: '600',
// // //                             border: 'none',
// // //                             borderRadius: '4px',
// // //                             cursor: actionLoading ? 'not-allowed' : 'pointer'
// // //                           }}
// // //                         >
// // //                           {actionLoading ? '...' : 'Accept'}
// // //                         </button>
// // //                         <button 
// // //                           onClick={() => {
// // //                             setSelectedTaskId(task.task_id!);
// // //                             setIsDeclineModalOpen(true);
// // //                           }}
// // //                           disabled={actionLoading}
// // //                           className="reports-btn"
// // //                           style={{ 
// // //                             flex: 1,
// // //                             background: 'transparent',
// // //                             color: '#c62828',
// // //                             border: '1px solid #c62828',
// // //                             padding: '0.6rem',
// // //                             fontSize: '0.85rem',
// // //                             fontWeight: '600',
// // //                             borderRadius: '4px',
// // //                             cursor: actionLoading ? 'not-allowed' : 'pointer'
// // //                           }}
// // //                         >
// // //                           Decline
// // //                         </button>
// // //                       </div>
// // //                     </div>
// // //                   </div>
// // //                 );
// // //               })}
// // //             </div>
// // //           </div>
// // //         )}

// // //         <div className="reports-section">
// // //           <div className="reports-header">
// // //             <h2 className="reports-title" style={{ fontSize: '1.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
// // //               <span>📻</span> Your Active Missions ({activeMissions.length})
// // //             </h2>
// // //             {activeMissions.length > 3 && (
// // //               <button 
// // //                 onClick={() => setShowAllActive(!showAllActive)}
// // //                 className="view-all-link"
// // //               >
// // //                 {showAllActive ? 'Show Less ↑' : `View All (${activeMissions.length}) →`}
// // //               </button>
// // //             )}
// // //           </div>
          
// // //           {missionsLoading ? (
// // //             <div className="reports-loading-container">
// // //               <div className="reports-loader">
// // //                 <div className="reports-spinner"></div>
// // //                 <p className="reports-loader-text">Loading your missions...</p>
// // //               </div>
// // //             </div>
// // //           ) : fetchError ? (
// // //             <div className="reports-empty-state">
// // //               <span className="empty-state-emoji">❌</span>
// // //               <h3>Error Loading Missions</h3>
// // //               <p>{fetchError}</p>
// // //               <button onClick={() => window.location.reload()} className="reports-btn primary">
// // //                 Retry
// // //               </button>
// // //             </div>
// // //           ) : activeMissions.length > 0 ? (
// // //             <>
// // //               <div className="reports-grid" style={{ gridTemplateColumns: 'repeat(3, 1fr)' }}>
// // //                 {displayedActiveMissions.map((mission) => {
// // //                   const statusBadge = getTaskStatusBadge(mission.task_status_id);
// // //                   const hasEvidence = taskEvidence[mission.task_id]?.length > 0;
                  
// // //                   return (
// // //                     <div key={mission.task_id} className="reports-card">
// // //                       <div className="reports-card-header dark">
// // //                         <div className="reports-card-title">
// // //                           <span className="reports-id" style={{ background: 'rgba(255,255,255,0.2)', color: 'white' }}>
// // //                             #{mission.report_id}
// // //                           </span>
// // //                           <span className="reports-status" style={{ background: 'rgba(255,255,255,0.2)', color: 'white' }}>
// // //                             {statusBadge.text}
// // //                           </span>
// // //                         </div>
// // //                         <div className="reports-volunteer-tag" style={{ color: 'white', fontSize: '0.8rem', fontWeight: '600' }}>
// // //                           {user.username?.toUpperCase()}
// // //                         </div>
// // //                       </div>

// // //                       <div className="reports-card-body">
// // //                         <div className="reports-animal-section">
// // //                           <div className="reports-animal-icon large">
// // //                             {getAnimalEmoji(mission.animal_type)}
// // //                           </div>
// // //                           <div className="reports-animal-info">
// // //                             <h4>{mission.animal_type || 'Animal'} Rescue</h4>
// // //                             <span className="reports-condition" style={{ 
// // //                               background: '#ffebee', 
// // //                               color: '#c62828',
// // //                               fontWeight: 'bold'
// // //                             }}>
// // //                               {mission.animal_condition || 'CRITICAL'}
// // //                             </span>
// // //                           </div>
// // //                         </div>

// // //                         <div className="reports-location-section">
// // //                           <span className="location-icon">📍</span>
// // //                           <span className="location-text">{mission.location_address || 'Location not specified'}</span>
// // //                         </div>

// // //                         <div className="reports-volunteer-section">
// // //                           <div className="reports-assigned-ranger" style={{ background: '#e8f5e9' }}>
// // //                             <div className="ranger-avatar" style={{ background: '#2e7d32' }}>
// // //                               {mission.reporter_name?.charAt(0).toUpperCase() || '?'}
// // //                             </div>
// // //                             <div className="ranger-info">
// // //                               <span className="ranger-name">{mission.reporter_name || 'Anonymous'}</span>
// // //                               <span className="ranger-role">Reporter</span>
// // //                               {mission.reporter_email && mission.reporter_email !== 'No email' && (
// // //                                 <span className="ranger-phone" style={{ fontSize: '0.75rem', color: '#2e7d32' }}>
// // //                                   ✉️ {mission.reporter_email}
// // //                                 </span>
// // //                               )}
// // //                               {mission.reporter_phone && mission.reporter_phone !== 'No phone' && (
// // //                                 <span className="ranger-phone" style={{ fontSize: '0.75rem', color: '#2e7d32' }}>
// // //                                   📱 {mission.reporter_phone}
// // //                                 </span>
// // //                               )}
// // //                             </div>
// // //                           </div>
// // //                         </div>
                        
// // //                         <p className="reports-description" style={{ 
// // //                           fontSize: '0.85rem', 
// // //                           marginBottom: '0.5rem',
// // //                           color: '#666'
// // //                         }}>
// // //                           {mission.description?.length > 100 
// // //                             ? `${mission.description.substring(0, 100)}...` 
// // //                             : mission.description || 'No description provided'}
// // //                         </p>

// // //                         {hasEvidence && (
// // //                           <div className="evidence-indicator">
// // //                             <span style={{ color: '#2e7d32', fontSize: '0.8rem', fontWeight: '600' }}>📸 Evidence Uploaded</span>
// // //                           </div>
// // //                         )}

// // //                         <div style={{ 
// // //                           display: 'flex', 
// // //                           justifyContent: 'space-between',
// // //                           alignItems: 'center',
// // //                           fontSize: '0.7rem',
// // //                           color: '#888',
// // //                           marginTop: '0.5rem',
// // //                           paddingTop: '0.5rem',
// // //                           borderTop: '1px solid #e8dfc9'
// // //                         }}>
// // //                           <span style={{ 
// // //                             padding: '2px 8px',
// // //                             borderRadius: '12px',
// // //                             background: '#e3f2fd',
// // //                             color: '#1565c0',
// // //                             fontWeight: 'bold'
// // //                           }}>
// // //                             {statusBadge.text}
// // //                           </span>
// // //                           {mission.assigned_at && (
// // //                             <span>Assigned: {formatShortDate(mission.assigned_at)}</span>
// // //                           )}
// // //                         </div>
// // //                       </div>

// // //                       <div className="reports-card-footer">
// // //                         <button 
// // //                           onClick={() => handleViewTaskDetails(mission)}
// // //                           className="reports-btn"
// // //                           style={{ 
// // //                             width: '100%',
// // //                             background: '#2D5A27',
// // //                             color: 'white',
// // //                             padding: '0.6rem',
// // //                             fontSize: '0.85rem',
// // //                             fontWeight: '600',
// // //                             border: 'none',
// // //                             borderRadius: '4px',
// // //                             cursor: 'pointer'
// // //                           }}
// // //                         >
// // //                           View Details →
// // //                         </button>
// // //                       </div>
// // //                     </div>
// // //                   );
// // //                 })}
// // //               </div>
// // //             </>
// // //           ) : (
// // //             <div className="reports-empty-state">
// // //               <span className="empty-state-emoji">🎯</span>
// // //               <h3>No Active Missions</h3>
// // //               <p>You don't have any active rescue missions at the moment.</p>
// // //               <Link to="/tasks" className="reports-btn primary">
// // //                 Browse Available Missions
// // //               </Link>
// // //             </div>
// // //           )}
// // //         </div>
// // //       </div>

// // //       {selectedTask && (
// // //         <TaskDetailModal 
// // //           task={selectedTask}
// // //           isOpen={isTaskModalOpen}
// // //           onClose={() => {
// // //             setIsTaskModalOpen(false);
// // //             setSelectedTask(null);
// // //           }}
// // //           onComplete={handleCompleteTask}
// // //           onUploadEvidence={handleUploadEvidence}
// // //           actionLoading={actionLoading}
// // //           userProfile={userProfile}
// // //           evidence={taskEvidence[selectedTask.task_id]}
// // //           adminNotes={taskAdminNotes[selectedTask.task_id]}
// // //         />
// // //       )}

// // //       {selectedTaskId && (
// // //         <DeclineModal
// // //           isOpen={isDeclineModalOpen}
// // //           onClose={() => {
// // //             setIsDeclineModalOpen(false);
// // //             setSelectedTaskId(null);
// // //           }}
// // //           onSubmit={(reason) => handleDeclineTask(selectedTaskId, reason)}
// // //           taskId={selectedTaskId}
// // //         />
// // //       )}
// // //     </div>
// // //   );
// // // };

// // // const PendingVolunteerDashboard: React.FC<{ user: any }> = ({ user }) => {
// // //   return (
// // //     <div className="dashboard-wrapper animate-fade-in">
// // //       <div className="pending-volunteer">
// // //         <div className="pending-icon">⏰</div>
// // //         <h2 className="pending-title">Activation Pending</h2>
// // //         <p className="pending-text">
// // //           Thank you for joining ResQAll. Our HQ is currently reviewing your ranger profile. 
// // //           You will be notified via field log once approved.
// // //         </p>
// // //       </div>
// // //     </div>
// // //   );
// // // };


// // // // const PendingVolunteerDashboard: React.FC<{ user: any }> = ({ user }) => {
// // // //   const [applicationDate, setApplicationDate] = useState<string>('');
// // // //   const [volunteerDetails, setVolunteerDetails] = useState<any>(null);
// // // //   const [loading, setLoading] = useState(true);

// // // //   useEffect(() => {
// // // //     const fetchVolunteerDetails = async () => {
// // // //       try {
// // // //         const token = sessionStorage.getItem('token');
// // // //         const response = await fetch(`http://localhost:5000/api/volunteers/${user.user_id}/profile`, {
// // // //           headers: {
// // // //             'Authorization': `Bearer ${token}`,
// // // //             'Content-Type': 'application/json'
// // // //           }
// // // //         });

// // // //         if (response.ok) {
// // // //           const data = await response.json();
// // // //           if (data.success) {
// // // //             setVolunteerDetails(data.data);
// // // //             setApplicationDate(data.data.joined_at || new Date().toISOString());
// // // //           }
// // // //         }
// // // //       } catch (error) {
// // // //         console.error('Error fetching volunteer details:', error);
// // // //       } finally {
// // // //         setLoading(false);
// // // //       }
// // // //     };

// // // //     fetchVolunteerDetails();
// // // //   }, [user.user_id]);

// // // //   const formatDate = (dateString: string) => {
// // // //     if (!dateString) return 'N/A';
// // // //     return new Date(dateString).toLocaleDateString('en-US', {
// // // //       year: 'numeric',
// // // //       month: 'long',
// // // //       day: 'numeric'
// // // //     });
// // // //   };

// // // //   if (loading) {
// // // //     return (
// // // //       <div className="dashboard-wrapper">
// // // //         <div className="pending-volunteer loading">
// // // //           <div className="loading-spinner-large"></div>
// // // //           <p>Loading your application details...</p>
// // // //         </div>
// // // //       </div>
// // // //     );
// // // //   }

// // // //   return (
// // // //     <div className="dashboard-wrapper animate-fade-in">
// // // //       <div className="pending-volunteer-container">
// // // //         {/* Hero Section */}
// // // //         <div className="pending-hero">
// // // //           <div className="pending-hero-overlay">
// // // //             <div className="pending-hero-content">
// // // //               <div className="pending-hero-icon">
// // // //                 <span className="hero-emoji">⏳</span>
// // // //               </div>
// // // //               <h1>Application Under Review</h1>
// // // //               <p className="hero-subtitle">Thank you for joining our rescue team, {user.username}!</p>
// // // //             </div>
// // // //           </div>
// // // //         </div>

// // // //         {/* Main Content */}
// // // //         <div className="pending-content">
// // // //           {/* Status Card */}
// // // //           <div className="status-card pending">
// // // //             <div className="status-card-header">
// // // //               <div className="status-icon-wrapper">
// // // //                 <span className="status-icon">📋</span>
// // // //               </div>
// // // //               <div className="status-info">
// // // //                 <h2>Application Status: <span className="status-badge pending-badge">Pending Review</span></h2>
// // // //                 <p className="status-date">Submitted on {formatDate(applicationDate)}</p>
// // // //               </div>
// // // //             </div>
// // // //             <div className="status-card-body">
// // // //               <p className="status-message">
// // // //                 Your volunteer application is currently being reviewed by our admin team. 
// // // //                 This process typically takes 24-48 hours. You'll receive an email notification 
// // // //                 once your application has been processed.
// // // //               </p>
// // // //             </div>
// // // //           </div>

// // // //           {/* Application Details Grid */}
// // // //           <div className="details-grid">
// // // //             <div className="detail-card">
// // // //               <div className="detail-icon">📝</div>
// // // //               <h3>Application ID</h3>
// // // //               <p className="detail-value">VOL-{user.user_id.toString().padStart(4, '0')}</p>
// // // //             </div>

// // // //             <div className="detail-card">
// // // //               <div className="detail-icon">📅</div>
// // // //               <h3>Submitted On</h3>
// // // //               <p className="detail-value">{formatDate(applicationDate)}</p>
// // // //             </div>

// // // //             <div className="detail-card">
// // // //               <div className="detail-icon">⏱️</div>
// // // //               <h3>Est. Wait Time</h3>
// // // //               <p className="detail-value">24-48 hours</p>
// // // //             </div>

// // // //             <div className="detail-card">
// // // //               <div className="detail-icon">✉️</div>
// // // //               <h3>Notification</h3>
// // // //               <p className="detail-value">{user.email}</p>
// // // //             </div>
// // // //           </div>

// // // //           {/* Volunteer Information Card */}
// // // //           {volunteerDetails && (
// // // //             <div className="info-card">
// // // //               <h3>Your Volunteer Profile</h3>
// // // //               <div className="info-grid">
// // // //                 <div className="info-row">
// // // //                   <span className="info-label">Has Vehicle:</span>
// // // //                   <span className="info-value">{volunteerDetails.has_car ? '✅ Yes' : '❌ No'}</span>
// // // //                 </div>
// // // //                 <div className="info-row">
// // // //                   <span className="info-label">Can Foster:</span>
// // // //                   <span className="info-value">{volunteerDetails.can_foster ? '✅ Yes' : '❌ No'}</span>
// // // //                 </div>
// // // //                 <div className="info-row">
// // // //                   <span className="info-label">Animal Handling:</span>
// // // //                   <span className="info-value">{volunteerDetails.animal_handling || 'Not specified'}</span>
// // // //                 </div>
// // // //                 <div className="info-row">
// // // //                   <span className="info-label">City/Location:</span>
// // // //                   <span className="info-value">{volunteerDetails.city || 'Not specified'}</span>
// // // //                 </div>
// // // //               </div>
// // // //             </div>
// // // //           )}

// // // //           {/* What Happens Next */}
// // // //           <div className="next-steps-card">
// // // //             <h3>What Happens Next?</h3>
// // // //             <div className="steps-grid">
// // // //               <div className="step">
// // // //                 <div className="step-number">1</div>
// // // //                 <div className="step-content">
// // // //                   <h4>Application Review</h4>
// // // //                   <p>An admin will review your volunteer profile and experience.</p>
// // // //                 </div>
// // // //               </div>
// // // //               <div className="step">
// // // //                 <div className="step-number">2</div>
// // // //                 <div className="step-content">
// // // //                   <h4>Background Check</h4>
// // // //                   <p>Basic verification of your provided information.</p>
// // // //                 </div>
// // // //               </div>
// // // //               <div className="step">
// // // //                 <div className="step-number">3</div>
// // // //                 <div className="step-content">
// // // //                   <h4>Approval Notification</h4>
// // // //                   <p>You'll receive an email at <strong>{user.email}</strong> with the decision.</p>
// // // //                 </div>
// // // //               </div>
// // // //               <div className="step">
// // // //                 <div className="step-number">4</div>
// // // //                 <div className="step-content">
// // // //                   <h4>Full Access Granted</h4>
// // // //                   <p>Once approved, you'll get access to all volunteer features.</p>
// // // //                 </div>
// // // //               </div>
// // // //             </div>
// // // //           </div>

// // // //           {/* While You Wait Section */}
// // // //           <div className="waiting-section">
// // // //             <h3>While You Wait</h3>
// // // //             <div className="waiting-grid">
// // // //               <div className="waiting-card">
// // // //                 <div className="waiting-icon">📚</div>
// // // //                 <h4>Learn About Rescue</h4>
// // // //                 <p>Read our guides on animal rescue best practices</p>
// // // //                 <button className="waiting-btn" onClick={() => window.open('/resources', '_blank')}>
// // // //                   View Resources
// // // //                 </button>
// // // //               </div>
// // // //               <div className="waiting-card">
// // // //                 <div className="waiting-icon">💬</div>
// // // //                 <h4>Join Community</h4>
// // // //                 <p>Connect with other volunteers in our forum</p>
// // // //                 <button className="waiting-btn" onClick={() => window.open('/forum', '_blank')}>
// // // //                   Visit Forum
// // // //                 </button>
// // // //               </div>
// // // //               <div className="waiting-card">
// // // //                 <div className="waiting-icon">✏️</div>
// // // //                 <h4>Update Profile</h4>
// // // //                 <p>Add more details to your volunteer profile</p>
// // // //                 <Link to="/profile" className="waiting-btn">
// // // //                   Edit Profile
// // // //                 </Link>
// // // //               </div>
// // // //             </div>
// // // //           </div>

// // // //           {/* Help Section */}
// // // //           <div className="help-section">
// // // //             <div className="help-icon">❓</div>
// // // //             <div className="help-content">
// // // //               <h4>Need Help?</h4>
// // // //               <p>If you have questions about your application, contact our support team.</p>
// // // //             </div>
// // // //             <button className="help-btn" onClick={() => window.location.href = 'mailto:support@resqall.com'}>
// // // //               Contact Support
// // // //             </button>
// // // //           </div>

// // // //           {/* Logout Option */}
// // // //           <div className="logout-section">
// // // //             <button onClick={() => {
// // // //               localStorage.removeItem('token');
// // // //               localStorage.removeItem('resqall_user');
// // // //               window.location.href = '/login';
// // // //             }} className="logout-btn">
// // // //               <span className="logout-icon">🚪</span>
// // // //               Sign Out
// // // //             </button>
// // // //           </div>
// // // //         </div>
// // // //       </div>
// // // //     </div>
// // // //   );
// // // // };



// // // const RejectedVolunteerDashboard: React.FC<{ user: any }> = ({ user }) => {
// // //   return (
// // //     <div className="dashboard-wrapper animate-fade-in">
// // //       <div className="rejected-volunteer">
// // //         <h2 className="rejected-title">Application Status</h2>
// // //         <p className="rejected-text">Unfortunately, your ResQAll operative status was not approved.</p>
// // //       </div>
// // //     </div>
// // //   );
// // // };
// // // //   const { logout } = useAuth();
// // // //   const [rejectionReason, setRejectionReason] = useState<string>('');

// // // //   useEffect(() => {
// // // //     // Fetch rejection reason if available
// // // //     const fetchRejectionReason = async () => {
// // // //       try {
// // // //         const token = sessionStorage.getItem('token');
// // // //         const response = await fetch(`http://localhost:5000/api/volunteers/${user?.user_id}/rejection-reason`, {
// // // //           headers: {
// // // //             'Authorization': `Bearer ${token}`,
// // // //             'Content-Type': 'application/json'
// // // //           }
// // // //         });
        
// // // //         if (response.ok) {
// // // //           const data = await response.json();
// // // //           if (data.success && data.reason) {
// // // //             setRejectionReason(data.reason);
// // // //           }
// // // //         }
// // // //       } catch (error) {
// // // //         console.error('Error fetching rejection reason:', error);
// // // //       }
// // // //     };

// // // //     fetchRejectionReason();
// // // //   }, [user?.user_id]);

// // // //   return (
// // // //     <div className="dashboard-wrapper animate-fade-in">
// // // //       <div className="rejected-volunteer-container">
// // // //         {/* Hero Section */}
// // // //         <div className="rejected-hero">
// // // //           <div className="rejected-hero-overlay">
// // // //             <div className="rejected-hero-icon">
// // // //               <span className="hero-emoji">❌</span>
// // // //             </div>
// // // //             <h1>Application Not Approved</h1>
// // // //             <p className="hero-subtitle">We appreciate your interest in joining ResQAll</p>
// // // //           </div>
// // // //         </div>

// // // //         {/* Main Content */}
// // // //         <div className="rejected-content">
// // // //           {/* Status Card */}
// // // //           <div className="status-card rejected">
// // // //             <div className="status-card-header">
// // // //               <div className="status-icon-wrapper">
// // // //                 <span className="status-icon">⚠️</span>
// // // //               </div>
// // // //               <div className="status-info">
// // // //                 <h2>Application Status: <span className="status-badge rejected-badge">Rejected</span></h2>
// // // //                 <p className="status-date">Decision made on {new Date().toLocaleDateString()}</p>
// // // //               </div>
// // // //             </div>
// // // //             <div className="status-card-body">
// // // //               <p className="status-message">
// // // //                 Your volunteer application has been reviewed and was not approved at this time.
// // // //               </p>
// // // //               {rejectionReason && (
// // // //                 <div className="rejection-reason">
// // // //                   <strong>Reason:</strong> {rejectionReason}
// // // //                 </div>
// // // //               )}
// // // //             </div>
// // // //           </div>

// // // //           {/* Options Grid */}
// // // //           <div className="options-grid">
// // // //             <div className="option-card">
// // // //               <div className="option-icon">📋</div>
// // // //               <h3>Submit New Application</h3>
// // // //               <p>You can apply again with updated information</p>
// // // //               <button 
// // // //                 className="option-btn primary"
// // // //                 onClick={() => window.location.href = '/volunteer/apply'}
// // // //               >
// // // //                 Apply Again
// // // //               </button>
// // // //             </div>

// // // //             <div className="option-card">
// // // //               <div className="option-icon">✉️</div>
// // // //               <h3>Contact Support</h3>
// // // //               <p>Get more information about the decision</p>
// // // //               <button 
// // // //                 className="option-btn secondary"
// // // //                 onClick={() => window.location.href = 'mailto:support@resqall.com'}
// // // //               >
// // // //                 Contact Support
// // // //               </button>
// // // //             </div>

// // // //             <div className="option-card">
// // // //               <div className="option-icon">👤</div>
// // // //               <h3>Continue as User</h3>
// // // //               <p>You can still use the platform as a regular user</p>
// // // //               <button 
// // // //                 className="option-btn"
// // // //                 onClick={() => window.location.href = '/dashboard'}
// // // //               >
// // // //                 Go to User Dashboard
// // // //               </button>
// // // //             </div>
// // // //           </div>

// // // //           {/* Help Section */}
// // // //           <div className="help-section">
// // // //             <div className="help-icon">❓</div>
// // // //             <div className="help-content">
// // // //               <h4>Questions about the decision?</h4>
// // // //               <p>Our support team is here to help you understand the requirements and guide you through the process.</p>
// // // //             </div>
// // // //             <button className="help-btn" onClick={() => window.location.href = 'mailto:support@resqall.com'}>
// // // //               Contact Support
// // // //             </button>
// // // //           </div>

// // // //           {/* Logout Option */}
// // // //           <div className="logout-section">
// // // //             <button onClick={logout} className="logout-btn">
// // // //               <span className="logout-icon">🚪</span>
// // // //               Sign Out
// // // //             </button>
// // // //           </div>
// // // //         </div>
// // // //       </div>
// // // //     </div>
// // // //   );
// // // // };

// // // const UserDashboard: React.FC<{ 
// // //   user: any; 
// // //   userReports: Report[]; 
// // //   reportsLoading: boolean;
// // //   onViewDetails: (report: Report) => void;
// // //   userProfile: UserProfile | null;
// // // }> = ({ user, userReports, reportsLoading, onViewDetails, userProfile }) => {
// // //   const myReports = userReports.filter(report => {
// // //     const reportUserId = Number(report.user_id);
// // //     const currentUserId = Number(user.user_id);
// // //     return reportUserId === currentUserId;
// // //   });

// // //   const totalReports = myReports.length;
// // //   const submittedReports = myReports.filter(r => r.status_name?.toLowerCase() === 'submitted').length;
// // //   const inProgressReports = myReports.filter(r => r.status_name?.toLowerCase() === 'in_progress').length;
// // //   const completedReports = myReports.filter(r => r.status_name?.toLowerCase() === 'completed').length;
// // //   const userPhone = userProfile?.phone;
// // //   const userEmail = userProfile?.email;

// // //   return (
// // //     <div className="dashboard-wrapper animate-fade-in">
// // //       <div className="user-dashboard">
// // //         <div className="user-welcome-section">
// // //           <div className="user-welcome-content">
// // //             <h2 className="user-welcome-title">
// // //               <span className="user-welcome-greeting">Welcome back,</span>
// // //               <span className="user-welcome-name">{user.username || 'Animal Friend'}!</span>
// // //             </h2>
// // //             {userEmail && (
// // //               <p className="user-contact-info">
// // //                 <span className="contact-icon">✉️</span>
// // //                 <span className="contact-text">{userEmail}</span>
// // //               </p>
// // //             )}
// // //             {userPhone && (
// // //               <p className="user-contact-info">
// // //                 <span className="contact-icon">📱</span>
// // //                 <span className="contact-text">Contact: {userPhone}</span>
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

// // //         <div className="user-stats-grid">
// // //           <div className="user-stat-card">
// // //             <div className="stat-card-icon total-reports">📄</div>
// // //             <div className="stat-card-content">
// // //               <h3 className="stat-card-value">{totalReports}</h3>
// // //               <p className="stat-card-label">Total Reports</p>
// // //             </div>
// // //           </div>
          
// // //           <div className="user-stat-card">
// // //             <div className="stat-card-icon in-progress">⏳</div>
// // //             <div className="stat-card-content">
// // //               <h3 className="stat-card-value">{inProgressReports}</h3>
// // //               <p className="stat-card-label">In Progress</p>
// // //             </div>
// // //           </div>
          
// // //           <div className="user-stat-card">
// // //             <div className="stat-card-icon completed">✓</div>
// // //             <div className="stat-card-content">
// // //               <h3 className="stat-card-value">{completedReports}</h3>
// // //               <p className="stat-card-label">Completed</p>
// // //             </div>
// // //           </div>
          
// // //           <div className="user-stat-card">
// // //             <div className="stat-card-icon waiting">⏰</div>
// // //             <div className="stat-card-content">
// // //               <h3 className="stat-card-value">{submittedReports}</h3>
// // //               <p className="stat-card-label">Submitted</p>
// // //             </div>
// // //           </div>
// // //         </div>

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
// // //               <>
// // //                 <div className="reports-grid">
// // //                   {myReports.slice(0, 3).map(report => {
// // //                     const statusText = getStatusText(report.status_name);
// // //                     const statusClass = getStatusClass(report.status_name);
                    
// // //                     return (
// // //                       <div key={report.report_id} className="report-grid-card">
// // //                         <div className="report-grid-header">
// // //                           <div className="report-grid-animal">
// // //                             <span className="animal-grid-emoji">{getAnimalEmoji(report.animal_type)}</span>
// // //                             <div>
// // //                               <h4 className="animal-grid-type">{report.animal_type || 'Unknown Animal'}</h4>
// // //                               <span className="condition-grid-badge">{report.animal_condition || 'Unknown'}</span>
// // //                             </div>
// // //                           </div>
// // //                           <span className={`status-grid-badge status-${statusClass}`}>
// // //                             {statusText}
// // //                           </span>
// // //                         </div>
                        
// // //                         <div className="report-grid-body">
// // //                           <p className="report-grid-description">
// // //                             {report.description?.length > 100 
// // //                               ? `${report.description.substring(0, 100)}...` 
// // //                               : report.description}
// // //                           </p>
                          
// // //                           <div className="report-grid-info">
// // //                             <div className="report-grid-location">
// // //                               <span className="grid-location-icon">📍</span>
// // //                               <span className="grid-location-text">
// // //                                 {report.location_address?.length > 30 
// // //                                   ? `${report.location_address.substring(0, 30)}...` 
// // //                                   : report.location_address}
// // //                               </span>
// // //                             </div>
                            
// // //                             <div className="report-grid-date">
// // //                               <span className="grid-date-icon">📅</span>
// // //                               <span className="grid-date-text">
// // //                                 {formatShortDate(report.submitted_at)}
// // //                               </span>
// // //                             </div>
// // //                           </div>
// // //                         </div>
                        
// // //                         <div className="report-grid-footer">
// // //                           <button 
// // //                             className="report-grid-details-link"
// // //                             onClick={() => onViewDetails(report)}
// // //                           >
// // //                             View Details →
// // //                           </button>
// // //                         </div>
// // //                       </div>
// // //                     );
// // //                   })}
// // //                 </div>
                
// // //                 {myReports.length > 3 && (
// // //                   <div className="view-all-container">
// // //                     <Link to="/my-reports" className="view-all-btn">
// // //                       View All Reports ({myReports.length})
// // //                     </Link>
// // //                   </div>
// // //                 )}
// // //               </>
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
// // import {Heatmap}  from '../../components/Dashboard/HeatMap';
// // import './Dashboard.css';

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
// //   reporter_email?: string;
// //   volunteer_name?: string;
// //   volunteer_id?: number;
// //   task_id?: number;
// //   task_status_id?: number;
// //   task_status?: string;
// //   assigned_at?: string;
// //   started_at?: string;
// //   completed_at?: string;
// //   volunteer_responded_at?: string;
// //   volunteer_response?: string;
// //   declined_reason?: string;
// //   admin_note?: string;
// // }

// // interface AdminNote {
// //   note_id: number;
// //   report_id: number;
// //   admin_id: number;
// //   note_text: string;
// //   created_at: string;
// //   admin_name?: string;
// // }

// // interface TaskProof {
// //   proof_id: number;
// //   task_id: number;
// //   proof_url: string;
// //   uploaded_at: string;
// // }

// // interface TaskCompletionNote {
// //   note_id: number;
// //   task_id: number;
// //   volunteer_id: number;
// //   note_text: string;
// //   created_at: string;
// // }

// // interface VolunteerTask {
// //   task_id: number;
// //   report_id: number;
// //   assigned_to_user_id: number;
// //   assigned_by_user_id: number;
// //   task_status_id: number;
// //   task_status: string;
// //   assigned_at: string;
// //   volunteer_responded_at?: string;
// //   volunteer_response?: string;
// //   declined_reason?: string;
// //   started_at?: string;
// //   completed_at?: string;
// //   is_deleted?: number;
  
// //   // Report fields
// //   user_id: number;
// //   description: string;
// //   location_address: string;
// //   user_note: string;
// //   submitted_at: string;
// //   animal_type: string;
// //   animal_condition: string;
// //   report_status_id: number;
// //   report_status: string;
  
// //   // Reporter fields
// //   reporter_name: string;
// //   reporter_phone: string;
// //   reporter_email: string;
  
// //   // Volunteer fields
// //   volunteer_name: string;
// //   volunteer_email: string;
// //   volunteer_phone: string;
// // }

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

// // const getTaskStatusBadge = (statusId: number | undefined): { text: string; class: string } => {
// //   switch(statusId) {
// //     case 1: return { text: 'ASSIGNED', class: 'assigned' };
// //     case 2: return { text: 'IN PROGRESS', class: 'progress' };
// //     case 3: return { text: 'COMPLETED', class: 'completed' };
// //     case 4: return { text: 'DECLINED', class: 'declined' };
// //     default: return { text: 'UNKNOWN', class: 'unknown' };
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
// //   if (!dateString || dateString === 'Not available' || dateString === 'Invalid date' || dateString === '') {
// //     return 'Not available';
// //   }
// //   try {
// //     const date = new Date(dateString);
// //     if (isNaN(date.getTime())) return 'Not available';
// //     return date.toLocaleDateString('en-US', {
// //       month: 'short',
// //       day: 'numeric',
// //       year: 'numeric',
// //       hour: '2-digit',
// //       minute: '2-digit'
// //     });
// //   } catch (e) {
// //     return 'Not available';
// //   }
// // };

// // const formatShortDate = (dateString: string): string => {
// //   if (!dateString || dateString === 'Not available' || dateString === 'Invalid date' || dateString === '') {
// //     return 'Not available';
// //   }
// //   try {
// //     const date = new Date(dateString);
// //     if (isNaN(date.getTime())) return 'Not available';
// //     return date.toLocaleDateString('en-US', {
// //       month: 'short',
// //       day: 'numeric',
// //       year: 'numeric'
// //     });
// //   } catch (e) {
// //     return 'Not available';
// //   }
// // };

// // const formatRelativeTime = (dateString: string): string => {
// //   if (!dateString || dateString === 'Not available' || dateString === 'Invalid date' || dateString === '') {
// //     return 'Not available';
// //   }
// //   try {
// //     const date = new Date(dateString);
// //     if (isNaN(date.getTime())) return 'Not available';
    
// //     const now = new Date();
// //     const diffMs = now.getTime() - date.getTime();
// //     const diffMins = Math.floor(diffMs / 60000);
// //     const diffHours = Math.floor(diffMins / 60);
// //     const diffDays = Math.floor(diffHours / 24);

// //     if (diffMins < 1) return 'Just now';
// //     if (diffMins < 60) return `${diffMins} minute${diffMins === 1 ? '' : 's'} ago`;
// //     if (diffHours < 24) return `${diffHours} hour${diffHours === 1 ? '' : 's'} ago`;
// //     if (diffDays === 1) return 'Yesterday';
// //     if (diffDays < 7) return `${diffDays} days ago`;
// //     return formatShortDate(dateString);
// //   } catch (e) {
// //     return 'Not available';
// //   }
// // };

// // const DeclineModal: React.FC<{
// //   isOpen: boolean;
// //   onClose: () => void;
// //   onSubmit: (reason: string) => void;
// //   taskId: number;
// // }> = ({ isOpen, onClose, onSubmit, taskId }) => {
// //   const [reason, setReason] = useState('');
// //   const [otherReason, setOtherReason] = useState('');
// //   const [submitting, setSubmitting] = useState(false);

// //   if (!isOpen) return null;

// //   const handleSubmit = async () => {
// //     const finalReason = reason === 'other' ? otherReason : reason;
// //     if (finalReason) {
// //       setSubmitting(true);
// //       try {
// //         await onSubmit(finalReason);
// //       } finally {
// //         setSubmitting(false);
// //         setReason('');
// //         setOtherReason('');
// //       }
// //     }
// //   };

// //   return (
// //     <div className="modal-overlay" onClick={onClose}>
// //       <div className="modal-content" onClick={e => e.stopPropagation()}>
// //         <div className="modal-header">
// //           <div className="modal-header-left">
// //             <span className="modal-icon">❌</span>
// //             <div>
// //               <h3 className="modal-title">Decline Task #{taskId}</h3>
// //               <p className="modal-subtitle">Please provide a reason for declining</p>
// //             </div>
// //           </div>
// //           <button className="modal-close" onClick={onClose}>×</button>
// //         </div>
        
// //         <div className="modal-body">
// //           <div className="decline-info">
// //             <p>Your reason helps us improve our volunteer matching system.</p>
// //           </div>
          
// //           <div className="form-group">
// //             <label className="form-label">
// //               Reason <span className="required">*</span>
// //             </label>
// //             <select 
// //               className="form-select"
// //               value={reason}
// //               onChange={(e) => setReason(e.target.value)}
// //             >
// //               <option value="">Select a reason</option>
// //               <option value="Too far away">Too far away</option>
// //               <option value="Already have active tasks">Already have active tasks</option>
// //               <option value="Animal type not suitable">Animal type not suitable</option>
// //               <option value="Condition too severe">Condition too severe</option>
// //               <option value="Equipment not available">Equipment not available</option>
// //               <option value="other">Other (please specify)</option>
// //             </select>
// //           </div>

// //           {reason === 'other' && (
// //             <div className="form-group">
// //               <label className="form-label">
// //                 Please specify <span className="required">*</span>
// //               </label>
// //               <textarea
// //                 className="form-textarea"
// //                 value={otherReason}
// //                 onChange={(e) => setOtherReason(e.target.value)}
// //                 placeholder="Enter your reason..."
// //                 rows={3}
// //               />
// //             </div>
// //           )}
// //         </div>
        
// //         <div className="modal-footer">
// //           <button className="modal-btn secondary" onClick={onClose}>
// //             Cancel
// //           </button>
// //           <button 
// //             className="modal-btn danger" 
// //             onClick={handleSubmit}
// //             disabled={!reason || (reason === 'other' && !otherReason) || submitting}
// //           >
// //             {submitting ? 'Processing...' : 'Decline Task'}
// //           </button>
// //         </div>
// //       </div>
// //     </div>
// //   );
// // };

// // const TaskDetailModal: React.FC<{
// //   task: VolunteerTask | null;
// //   isOpen: boolean;
// //   onClose: () => void;
// //   onComplete: (taskId: number) => void;
// //   onUploadEvidence: (taskId: number, file: File, notes: string) => void;
// //   actionLoading: boolean;
// //   userProfile: UserProfile | null;
// //   evidence?: TaskProof[];
// //   adminNotes?: AdminNote[];
// // }> = ({ 
// //   task, 
// //   isOpen, 
// //   onClose, 
// //   onComplete,
// //   onUploadEvidence,
// //   actionLoading, 
// //   userProfile, 
// //   evidence = [], 
// //   adminNotes = []
// // }) => {
// //   const [selectedImage, setSelectedImage] = useState<string | null>(null);
// //   const [showUploadForm, setShowUploadForm] = useState(false);
// //   const [proofFile, setProofFile] = useState<File | null>(null);
// //   const [completionNote, setCompletionNote] = useState('');
// //   const [previewUrl, setPreviewUrl] = useState<string | null>(null);
// //   const [uploadError, setUploadError] = useState<string | null>(null);
// //   const [uploading, setUploading] = useState(false);

// //   if (!isOpen || !task) return null;

// //   const hasProofs = evidence.length > 0;

// //   const validateFile = (file: File): boolean => {
// //     if (file.size > 5 * 1024 * 1024) {
// //       setUploadError('File is too large. Maximum size is 5MB');
// //       return false;
// //     }
    
// //     const allowedTypes = ['image/jpeg', 'image/png', 'image/jpg', 'image/gif'];
// //     if (!allowedTypes.includes(file.type)) {
// //       setUploadError('Invalid file type. Allowed: JPG, PNG, GIF');
// //       return false;
// //     }
    
// //     return true;
// //   };

// //   const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
// //     if (e.target.files && e.target.files[0]) {
// //       setUploadError(null);
// //       const file = e.target.files[0];
      
// //       if (validateFile(file)) {
// //         if (previewUrl) {
// //           URL.revokeObjectURL(previewUrl);
// //         }
        
// //         setProofFile(file);
// //         const newPreview = URL.createObjectURL(file);
// //         setPreviewUrl(newPreview);
// //       }
// //     }
// //   };

// //   const removeFile = () => {
// //     if (previewUrl) {
// //       URL.revokeObjectURL(previewUrl);
// //     }
// //     setProofFile(null);
// //     setPreviewUrl(null);
// //     setUploadError(null);
// //   };

// //   const handleUploadSubmit = async () => {
// //     if (!proofFile) {
// //       setUploadError('Please select a photo');
// //       return;
// //     }
// //     if (!completionNote.trim()) {
// //       setUploadError('Please enter completion notes');
// //       return;
// //     }
    
// //     setUploading(true);
// //     try {
// //       await onUploadEvidence(task.task_id, proofFile, completionNote);
// //       setShowUploadForm(false);
// //       setProofFile(null);
// //       setCompletionNote('');
// //       setPreviewUrl(null);
// //     } catch (error) {
// //       console.error('Upload error:', error);
// //     } finally {
// //       setUploading(false);
// //     }
// //   };

// //   const getFullImageUrl = (proofUrl: string) => {
// //     if (proofUrl.startsWith('http')) {
// //       return proofUrl;
// //     }
// //     const cleanUrl = proofUrl.startsWith('/') ? proofUrl.substring(1) : proofUrl;
// //     return `http://localhost:5000/${cleanUrl}`;
// //   };

// //   return (
// //     <div className="reports-modal-overlay" onClick={onClose}>
// //       <div className="reports-modal-content large" onClick={e => e.stopPropagation()}>
// //         <div className="reports-modal-header dark">
// //           <div>
// //             <h3>Rescue Report #{task.report_id}</h3>
// //             <div className="reports-modal-subheader">
// //               <span className="reports-status-badge in-progress">
// //                 {task.task_status || 'IN PROGRESS'}
// //               </span>
// //               <span className="reports-meta">
// //                 {formatDate(task.submitted_at)}
// //               </span>
// //             </div>
// //           </div>
// //           <button className="reports-modal-close" onClick={onClose}>×</button>
// //         </div>
        
// //         <div className="reports-modal-body">
// //           <div className="reports-detail-grid">
// //             <div className="reports-detail-column">
// //               <div className="reports-info-card">
// //                 <div className="reports-card-header beige">
// //                   <h4>🐾 Animal Information</h4>
// //                 </div>
// //                 <div className="reports-card-content">
// //                   <div className="reports-animal-display">
// //                     <div className="reports-animal-icon">
// //                       {getAnimalEmoji(task.animal_type)}
// //                     </div>
// //                     <div className="reports-animal-details">
// //                       <div className="reports-animal-type">{task.animal_type}</div>
// //                       <div className="reports-animal-condition">
// //                         <span className="condition-tag">{task.animal_condition}</span>
// //                       </div>
// //                     </div>
// //                   </div>
// //                 </div>
// //               </div>

// //               <div className="reports-info-card">
// //                 <div className="reports-card-header beige">
// //                   <h4>👤 Reporter Details</h4>
// //                 </div>
// //                 <div className="reports-card-content">
// //                   <div className="reports-detail-list">
// //                     <div className="reports-detail-row">
// //                       <span className="reports-detail-label">Name</span>
// //                       <span className="reports-detail-value">{task.reporter_name || 'Anonymous'}</span>
// //                     </div>
// //                     {task.reporter_email && task.reporter_email !== 'No email' && (
// //                       <div className="reports-detail-row">
// //                         <span className="reports-detail-label">Email</span>
// //                         <span className="reports-detail-value">
// //                           <span className="email-icon">✉️</span>
// //                           {task.reporter_email}
// //                         </span>
// //                       </div>
// //                     )}
// //                     {task.reporter_phone && task.reporter_phone !== 'No phone' && (
// //                       <div className="reports-detail-row">
// //                         <span className="reports-detail-label">Phone</span>
// //                         <span className="reports-detail-value">{task.reporter_phone}</span>
// //                       </div>
// //                     )}
// //                   </div>
// //                 </div>
// //               </div>

// //               <div className="reports-info-card">
// //                 <div className="reports-card-header beige">
// //                   <h4>📍 Location</h4>
// //                 </div>
// //                 <div className="reports-card-content">
// //                   <div className="reports-location-info">
// //                     <p>{task.location_address}</p>
// //                     <button 
// //                       className="reports-btn map"
// //                       onClick={() => {
// //                         const encodedAddress = encodeURIComponent(task.location_address);
// //                         window.open(`https://maps.google.com/?q=${encodedAddress}`, '_blank');
// //                       }}
// //                     >
// //                       View on Map
// //                     </button>
// //                   </div>
// //                 </div>
// //               </div>

// //               <div className="reports-info-card">
// //                 <div className="reports-card-header beige">
// //                   <h4>⏱️ Timeline</h4>
// //                 </div>
// //                 <div className="reports-card-content">
// //                   <div className="reports-detail-list">
// //                     <div className="reports-detail-row">
// //                       <span className="reports-detail-label">Reported</span>
// //                       <span className="reports-detail-value">{formatDate(task.submitted_at)}</span>
// //                     </div>
// //                     <div className="reports-detail-row">
// //                       <span className="reports-detail-label">Assigned</span>
// //                       <span className="reports-detail-value">{formatDate(task.assigned_at)}</span>
// //                     </div>
// //                     {task.started_at && (
// //                       <div className="reports-detail-row">
// //                         <span className="reports-detail-label">Started</span>
// //                         <span className="reports-detail-value">{formatDate(task.started_at)}</span>
// //                       </div>
// //                     )}
// //                   </div>
// //                 </div>
// //               </div>
// //             </div>

// //             <div className="reports-detail-column">
// //               <div className="reports-info-card">
// //                 <div className="reports-card-header beige">
// //                   <h4>📝 Mission Description</h4>
// //                 </div>
// //                 <div className="reports-card-content">
// //                   <div className="reports-description">
// //                     <p>{task.description}</p>
// //                   </div>
// //                   {task.user_note && (
// //                     <div className="reports-user-note">
// //                       <div className="note-label">Reporter's Note:</div>
// //                       <p>{task.user_note}</p>
// //                     </div>
// //                   )}
// //                 </div>
// //               </div>

// //               <div className="reports-info-card">
// //                 <div className="reports-card-header beige">
// //                   <div className="reports-header-row">
// //                     <h4>📸 Evidence Photos</h4>
// //                     {task.task_status_id === 2 && !showUploadForm && !hasProofs && (
// //                       <button 
// //                         className="reports-btn primary small"
// //                         onClick={() => setShowUploadForm(true)}
// //                       >
// //                         + Upload Evidence
// //                       </button>
// //                     )}
// //                   </div>
// //                 </div>
// //                 <div className="reports-card-content">
// //                   {evidence.length > 0 ? (
// //                     <div>
// //                       <p style={{ marginBottom: '10px', color: '#2D5A27', fontWeight: '600' }}>
// //                         {evidence.length} photo(s) uploaded
// //                       </p>
// //                       <div style={{ 
// //                         display: 'grid', 
// //                         gridTemplateColumns: 'repeat(2, 1fr)', 
// //                         gap: '15px',
// //                         marginTop: '10px'
// //                       }}>
// //                         {evidence.map((proof) => (
// //                           <div 
// //                             key={proof.proof_id} 
// //                             style={{ 
// //                               border: '1px solid #e8dfc9',
// //                               borderRadius: '8px',
// //                               padding: '8px',
// //                               background: '#f9f5ec',
// //                               cursor: 'pointer'
// //                             }}
// //                             onClick={() => setSelectedImage(getFullImageUrl(proof.proof_url))}
// //                           >
// //                             <img 
// //                               src={getFullImageUrl(proof.proof_url)} 
// //                               alt={`Evidence ${proof.proof_id}`}
// //                               style={{ 
// //                                 width: '100%',
// //                                 height: '120px',
// //                                 objectFit: 'cover',
// //                                 borderRadius: '4px'
// //                               }}
// //                               onError={(e) => {
// //                                 console.error('Image failed to load:', proof.proof_url);
// //                                 e.currentTarget.style.display = 'none';
// //                               }}
// //                             />
// //                             <p style={{ 
// //                               fontSize: '0.7rem', 
// //                               textAlign: 'center', 
// //                               marginTop: '5px',
// //                               color: '#666'
// //                             }}>
// //                               Uploaded: {formatShortDate(proof.uploaded_at)}
// //                             </p>
// //                           </div>
// //                         ))}
// //                       </div>
// //                     </div>
// //                   ) : (
// //                     <div>
// //                       {showUploadForm ? (
// //                         <div className="upload-form">
// //                           {uploadError && (
// //                             <div className="error-message" style={{ marginBottom: '10px', color: '#c62828' }}>
// //                               {uploadError}
// //                             </div>
// //                           )}

// //                           {previewUrl ? (
// //                             <div className="single-photo-preview">
// //                               <div className="preview-container" style={{ position: 'relative', display: 'inline-block', width: '100%' }}>
// //                                 <img 
// //                                   src={previewUrl} 
// //                                   alt="Preview" 
// //                                   style={{ 
// //                                     width: '100%',
// //                                     maxHeight: '200px',
// //                                     objectFit: 'contain',
// //                                     borderRadius: '4px'
// //                                   }} 
// //                                 />
// //                                 <button 
// //                                   onClick={removeFile}
// //                                   style={{
// //                                     position: 'absolute',
// //                                     top: '5px',
// //                                     right: '5px',
// //                                     background: '#c62828',
// //                                     color: 'white',
// //                                     border: 'none',
// //                                     borderRadius: '50%',
// //                                     width: '25px',
// //                                     height: '25px',
// //                                     cursor: 'pointer'
// //                                   }}
// //                                 >
// //                                   ×
// //                                 </button>
// //                               </div>
// //                               <p style={{ fontSize: '0.8rem', marginTop: '5px' }}>
// //                                 {proofFile?.name} ({(proofFile!.size / 1024).toFixed(1)} KB)
// //                               </p>
// //                             </div>
// //                           ) : (
// //                             <div style={{ marginBottom: '15px' }}>
// //                               <label className="reports-btn primary" style={{ cursor: 'pointer' }}>
// //                                 Choose Photo
// //                                 <input
// //                                   type="file"
// //                                   accept="image/jpeg,image/png,image/jpg,image/gif"
// //                                   onChange={handleFileChange}
// //                                   style={{ display: 'none' }}
// //                                 />
// //                               </label>
// //                             </div>
// //                           )}

// //                           <div style={{ marginTop: '15px' }}>
// //                             <label style={{ fontWeight: 'bold', display: 'block', marginBottom: '5px' }}>
// //                               Completion Notes <span style={{ color: '#c62828' }}>*</span>
// //                             </label>
// //                             <textarea
// //                               value={completionNote}
// //                               onChange={(e) => setCompletionNote(e.target.value)}
// //                               placeholder="Describe the rescue outcome, any challenges, and the animal's condition..."
// //                               rows={3}
// //                               maxLength={500}
// //                               style={{
// //                                 width: '100%',
// //                                 padding: '8px',
// //                                 border: '1px solid #ccc',
// //                                 borderRadius: '4px',
// //                                 fontFamily: 'inherit'
// //                               }}
// //                             />
// //                             <p style={{ fontSize: '0.75rem', color: '#666', marginTop: '5px' }}>
// //                               {completionNote.length}/500 characters
// //                             </p>
// //                           </div>

// //                           <div style={{ display: 'flex', gap: '10px', marginTop: '15px' }}>
// //                             <button 
// //                               className="reports-btn secondary"
// //                               onClick={() => {
// //                                 setShowUploadForm(false);
// //                                 setProofFile(null);
// //                                 setCompletionNote('');
// //                                 setPreviewUrl(null);
// //                                 setUploadError(null);
// //                               }}
// //                             >
// //                               Cancel
// //                             </button>
// //                             <button 
// //                               className="reports-btn primary"
// //                               onClick={handleUploadSubmit}
// //                               disabled={!proofFile || !completionNote.trim() || uploading}
// //                             >
// //                               {uploading ? 'Uploading...' : 'Submit Evidence'}
// //                             </button>
// //                           </div>
// //                         </div>
// //                       ) : (
// //                         <p>No evidence uploaded yet.</p>
// //                       )}
// //                     </div>
// //                   )}
// //                 </div>
// //               </div>

// //               <div className="reports-info-card">
// //                 <div className="reports-card-header beige">
// //                   <h4>📌 Admin Notes</h4>
// //                 </div>
// //                 <div className="reports-card-content">
// //                   {adminNotes && adminNotes.length > 0 ? (
// //                     <div className="admin-notes-container">
// //                       {adminNotes.map((note) => (
// //                         <div key={note.note_id} className="admin-note-item" style={{
// //                           background: '#f9f5ec',
// //                           padding: '12px',
// //                           borderRadius: '8px',
// //                           marginBottom: '10px',
// //                           borderLeft: '3px solid #2D5A27'
// //                         }}>
// //                           <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '6px' }}>
// //                             <span style={{ fontWeight: 'bold', color: '#2D5A27' }}>
// //                               {note.admin_name || 'Admin'}
// //                             </span>
// //                             <span style={{ fontSize: '0.75rem', color: '#666' }}>
// //                               {formatRelativeTime(note.created_at)}
// //                             </span>
// //                           </div>
// //                           <p style={{ margin: 0, fontSize: '0.95rem', lineHeight: '1.5' }}>
// //                             {note.note_text}
// //                           </p>
// //                         </div>
// //                       ))}
// //                     </div>
// //                   ) : (
// //                     <div style={{ 
// //                       padding: '20px', 
// //                       textAlign: 'center', 
// //                       background: '#f9f5ec', 
// //                       borderRadius: '8px',
// //                       color: '#666'
// //                     }}>
// //                       <span style={{ fontSize: '2rem', display: 'block', marginBottom: '8px' }}>📝</span>
// //                       <p style={{ margin: 0 }}>No admin notes for this report.</p>
// //                     </div>
// //                   )}
// //                 </div>
// //               </div>
// //             </div>
// //           </div>

// //           {selectedImage && (
// //             <div 
// //               className="image-lightbox" 
// //               onClick={() => setSelectedImage(null)} 
// //               style={{
// //                 position: 'fixed',
// //                 top: 0,
// //                 left: 0,
// //                 right: 0,
// //                 bottom: 0,
// //                 background: 'rgba(0,0,0,0.9)',
// //                 display: 'flex',
// //                 alignItems: 'center',
// //                 justifyContent: 'center',
// //                 zIndex: 2000
// //               }}
// //             >
// //               <img 
// //                 src={selectedImage} 
// //                 alt="Enlarged evidence" 
// //                 style={{ maxWidth: '90%', maxHeight: '90%', objectFit: 'contain' }} 
// //               />
// //               <button 
// //                 onClick={() => setSelectedImage(null)} 
// //                 style={{
// //                   position: 'absolute',
// //                   top: '20px',
// //                   right: '20px',
// //                   background: 'white',
// //                   border: 'none',
// //                   borderRadius: '50%',
// //                   width: '40px',
// //                   height: '40px',
// //                   fontSize: '20px',
// //                   cursor: 'pointer'
// //                 }}
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
// //           {task.task_status_id === 2 && !hasProofs && !showUploadForm && (
// //             <button 
// //               className="reports-btn complete"
// //               onClick={() => onComplete(task.task_id)}
// //               disabled={actionLoading}
// //               style={{ background: '#2e7d32', color: 'white' }}
// //             >
// //               {actionLoading ? 'Processing...' : 'Complete Mission'}
// //             </button>
// //           )}
// //         </div>
// //       </div>
// //     </div>
// //   );
// // };

// // const ReportDetailModal: React.FC<{
// //   report: Report | null;
// //   isOpen: boolean;
// //   onClose: () => void;
// //   userPhone?: string;
// //   userEmail?: string;
// //   userName?: string;
// // }> = ({ report, isOpen, onClose, userPhone, userEmail, userName }) => {
// //   if (!isOpen || !report) return null;

// //   const reporterName = report.reporter_name || userName;
// //   const phoneNumber = report.reporter_phone || userPhone;
// //   const emailAddress = report.reporter_email || userEmail;
// //   const isEditable = report.status_name?.toLowerCase() === 'submitted';

// //   const hasPhone = (phone?: string | null): boolean => {
// //     if (phone === null || phone === undefined) return false;
// //     if (typeof phone !== 'string') return false;
// //     return phone.trim().length > 0;
// //   };

// //   const hasEmail = (email?: string | null): boolean => {
// //     if (email === null || email === undefined) return false;
// //     if (typeof email !== 'string') return false;
// //     return email.trim().length > 0 && email.includes('@');
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
// //               {hasEmail(emailAddress) && (
// //                 <div className="detail-item">
// //                   <span className="detail-label">Email</span>
// //                   <span className="detail-value">
// //                     <span className="email-icon">✉️</span>
// //                     {emailAddress}
// //                   </span>
// //                 </div>
// //               )}
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
// //   const [allReports, setAllReports] = useState<Report[]>([]);
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
// //         const token = sessionStorage.getItem('token');
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

// //   const fetchAllReports = async () => {
// //     try {
// //       const token = sessionStorage.getItem('token');
// //       const response = await fetch('http://localhost:5000/api/reports/admin/all', {
// //         headers: {
// //           'Authorization': `Bearer ${token}`,
// //           'Content-Type': 'application/json'
// //         }
// //       });
      
// //       if (response.ok) {
// //         const data = await response.json();
// //         if (data.success) {
// //           setAllReports(data.data || []);
// //         }
// //       }
// //     } catch (error) {
// //       console.error('Error fetching all reports:', error);
// //     }
// //   };

// //   useEffect(() => {
// //     const fetchUserReports = async () => {
// //       if (!currentUser) return;
      
// //       try {
// //         setReportsLoading(true);
// //         const token = sessionStorage.getItem('token');
        
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
// //               reporter_phone: userProfile?.phone || '',
// //               reporter_email: userProfile?.email || ''
// //             }));
// //             setUserReports(reportsWithUserInfo);
// //           }
// //         }

// //         if (getUserRole(currentUser) === 'admin') {
// //           await fetchAllReports();
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

// //     console.log('Checking volunteer status for user:', user);

// //     if (user.approval_status_id !== undefined) {
// //       if (user.approval_status_id === 1) return 'pending';
// //       if (user.approval_status_id === 2) return 'approved';
// //       if (user.approval_status_id === 3) return 'rejected';
// //     }

// //     if (user.volunteer) {
// //       console.log('Volunteer object:', user.volunteer);
      
// //       if (user.volunteer.approval_status_id !== undefined) {
// //         if (user.volunteer.approval_status_id === 1) return 'pending';
// //         if (user.volunteer.approval_status_id === 2) return 'approved';
// //         if (user.volunteer.approval_status_id === 3) return 'rejected';
// //       }
      
// //       if (user.volunteer.status) {
// //         const status = user.volunteer.status.toLowerCase();
// //         if (status.includes('pending')) return 'pending';
// //         if (status.includes('approved')) return 'approved';
// //         if (status.includes('reject')) return 'rejected';
// //       }
// //     }

// //     if (user.volunteer_status) {
// //       const status = user.volunteer_status.toLowerCase();
// //       if (status.includes('pending')) return 'pending';
// //       if (status.includes('approved')) return 'approved';
// //       if (status.includes('reject')) return 'rejected';
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
// //     console.log('Rendering dashboard with:', { userRole, volunteerStatus });

// //     if (userRole === 'admin') {
// //       return <AdminDashboard 
// //         stats={stats} 
// //         reports={allReports}
// //         reportsLoading={reportsLoading} 
// //       />;
// //     }
    
// //     if (userRole === 'volunteer') {
// //       if (volunteerStatus === 'rejected') {
// //         console.log('Showing REJECTED volunteer dashboard');
// //         return <RejectedVolunteerDashboard user={currentUser} />;
// //       }
      
// //       if (volunteerStatus === 'pending' || volunteerStatus === 'none' || !volunteerStatus) {
// //         console.log('Showing PENDING volunteer dashboard');
// //         return <PendingVolunteerDashboard user={currentUser} />;
// //       }
      
// //       if (volunteerStatus === 'approved') {
// //         console.log('Showing APPROVED volunteer dashboard');
// //         return <VolunteerDashboard 
// //           user={{...currentUser, role: userRole}} 
// //           stats={stats} 
// //           reports={userReports}
// //           reportsLoading={reportsLoading}
// //           userProfile={userProfile}
// //         />;
// //       }
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
// //         userEmail={userProfile?.email}
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
// //   const [showHeatmap, setShowHeatmap] = useState(false);
// //   const [heatmapData, setHeatmapData] = useState<Report[]>([]);
  
// //   const totalReports = reports.length;
// //   const submittedReports = reports.filter(r => r.status_name?.toLowerCase() === 'submitted').length;
// //   const assignedReports = reports.filter(r => r.status_name?.toLowerCase() === 'assigned').length;
// //   const inProgressReports = reports.filter(r => r.status_name?.toLowerCase() === 'in_progress').length;
// //   const completedReports = reports.filter(r => r.status_name?.toLowerCase() === 'completed').length;
// //   const declinedReports = reports.filter(r => r.status_name?.toLowerCase() === 'declined').length;

// //   const uniqueReporters = new Set(reports.map(r => r.user_id)).size;

// //   useEffect(() => {
// //     if (reports && reports.length > 0) {
// //       const validReports = reports.filter(r => 
// //         r.location_address && 
// //         r.location_address.trim() !== '' && 
// //         r.location_address !== 'No location'
// //       );
// //       setHeatmapData(validReports);
// //     }
// //   }, [reports]);

// //   const getMostCommonAnimal = (): string => {
// //     const animalCounts = reports.reduce((acc, r) => {
// //       if (r.animal_type) {
// //         acc[r.animal_type] = (acc[r.animal_type] || 0) + 1;
// //       }
// //       return acc;
// //     }, {} as Record<string, number>);
    
// //     let maxCount = 0;
// //     let mostCommon = 'N/A';
    
// //     Object.entries(animalCounts).forEach(([animal, count]) => {
// //       if (count > maxCount) {
// //         maxCount = count;
// //         mostCommon = animal;
// //       }
// //     });
    
// //     return mostCommon;
// //   };

// //   const getHotspotCount = (): number => {
// //     const locationCounts = heatmapData.reduce((acc, r) => {
// //       acc[r.location_address] = (acc[r.location_address] || 0) + 1;
// //       return acc;
// //     }, {} as Record<string, number>);
    
// //     return Object.values(locationCounts).filter(count => count >= 3).length;
// //   };

// //   const chartData = [
// //     { name: 'Reports', value: totalReports },
// //     { name: 'Rescued', value: completedReports },
// //     { name: 'Volunteers', value: 5 },
// //   ];
  
// //   const COLORS = ['#A67C52', '#2D5A27', '#7D8C5A'];

// //   return (
// //     <div className="dashboard-wrapper animate-fade-in">
// //       <div className="admin-dashboard">
// //         <div className="admin-header-section">
// //           <h1 className="admin-header-title">ResQAll Command Center</h1>
// //           <p className="admin-header-subtitle">Welcome back, Commander</p>
// //         </div>
        
// //         <div className="admin-stats-grid">
// //           <div className="stat-card">
// //             <div className="stat-icon">📋</div>
// //             <div className="stat-content">
// //               <div className="stat-value">{reportsLoading ? '...' : totalReports}</div>
// //               <div className="stat-label">Total Reports</div>
// //             </div>
// //           </div>
          
// //           <div className="stat-card">
// //             <div className="stat-icon">⏳</div>
// //             <div className="stat-content">
// //               <div className="stat-value">{reportsLoading ? '...' : submittedReports + assignedReports + inProgressReports}</div>
// //               <div className="stat-label">Active Cases</div>
// //             </div>
// //           </div>
          
// //           <div className="stat-card">
// //             <div className="stat-icon">✅</div>
// //             <div className="stat-content">
// //               <div className="stat-value">{reportsLoading ? '...' : completedReports}</div>
// //               <div className="stat-label">Completed</div>
// //             </div>
// //           </div>
          
// //           <div className="stat-card">
// //             <div className="stat-icon">👥</div>
// //             <div className="stat-content">
// //               <div className="stat-value">{reportsLoading ? '...' : uniqueReporters}</div>
// //               <div className="stat-label">Reporters</div>
// //             </div>
// //           </div>
// //         </div>

// //         <div className="heatmap-section">
// //           <div style={{ 
// //             display: 'flex', 
// //             justifyContent: 'space-between', 
// //             alignItems: 'center',
// //             marginBottom: '1rem'
// //           }}>
// //             <h3 className="section-header" style={{ margin: 0 }}>
// //               Incident Heatmap - Most Reported Areas
// //             </h3>
// //             <button 
// //               onClick={() => setShowHeatmap(!showHeatmap)}
// //               className="reports-btn"
// //               style={{ 
// //                 background: showHeatmap ? '#f44336' : '#2D5A27',
// //                 color: 'white',
// //                 border: 'none',
// //                 padding: '8px 20px',
// //                 borderRadius: '6px',
// //                 cursor: 'pointer',
// //                 fontSize: '14px',
// //                 fontWeight: '600',
// //                 transition: 'all 0.3s ease'
// //               }}
// //             >
// //               {showHeatmap ? 'Hide Map' : 'Show Heatmap'}
// //             </button>
// //           </div>

// //           {showHeatmap && (
// //             <div className="heatmap-container">
// //               {heatmapData.length > 0 ? (
// //                 <>
// //                   <Heatmap reports={heatmapData} height="500px" />
                  
// //                   <div className="heatmap-stats-grid">
// //                     <div className="heatmap-stat-card">
// //                       <div className="heatmap-stat-label">Total Locations</div>
// //                       <div className="heatmap-stat-value">{heatmapData.length}</div>
// //                     </div>
// //                     <div className="heatmap-stat-card">
// //                       <div className="heatmap-stat-label">Unique Areas</div>
// //                       <div className="heatmap-stat-value">
// //                         {new Set(heatmapData.map(r => r.location_address)).size}
// //                       </div>
// //                     </div>
// //                     <div className="heatmap-stat-card">
// //                       <div className="heatmap-stat-label">Most Common Animal</div>
// //                       <div className="heatmap-stat-value">{getMostCommonAnimal()}</div>
// //                     </div>
// //                     <div className="heatmap-stat-card">
// //                       <div className="heatmap-stat-label">Hotspots (3+ reports)</div>
// //                       <div className="heatmap-stat-value highlight">{getHotspotCount()}</div>
// //                     </div>
// //                   </div>

// //                   <div style={{ marginTop: '1.5rem' }}>
// //                     <h4 style={{ marginBottom: '1rem', color: '#333' }}>Top Hotspot Areas</h4>
// //                     <div className="hotspot-tags">
// //                       {Object.entries(
// //                         heatmapData.reduce((acc, r) => {
// //                           acc[r.location_address] = (acc[r.location_address] || 0) + 1;
// //                           return acc;
// //                         }, {} as Record<string, number>)
// //                       )
// //                         .sort((a, b) => b[1] - a[1])
// //                         .slice(0, 8)
// //                         .map(([location, count]) => (
// //                           <div 
// //                             key={location}
// //                             className={`hotspot-tag ${count >= 5 ? 'high' : count >= 3 ? 'medium' : 'low'}`}
// //                           >
// //                             {location.length > 25 ? location.substring(0, 25) + '...' : location} ({count})
// //                           </div>
// //                         ))}
// //                     </div>
// //                   </div>
// //                 </>
// //               ) : (
// //                 <div style={{ 
// //                   height: '300px', 
// //                   display: 'flex', 
// //                   alignItems: 'center', 
// //                   justifyContent: 'center',
// //                   background: '#f5f5f5',
// //                   borderRadius: '8px',
// //                   flexDirection: 'column',
// //                   gap: '1rem'
// //                 }}>
// //                   <span style={{ fontSize: '3rem' }}>🗺️</span>
// //                   <p style={{ color: '#666' }}>No location data available for heatmap</p>
// //                 </div>
// //               )}
// //             </div>
// //           )}
// //         </div>

// //         <div className="admin-charts-section">
// //           <div className="chart-container">
// //             <h3 className="chart-title">Report Status Distribution</h3>
// //             <div className="recharts-wrapper">
// //               {reportsLoading ? (
// //                 <div className="chart-loading">
// //                   <div className="spinner"></div>
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
// //             <div className="volunteer-alert-icon">⚡</div>
// //             <h3 className="volunteer-alert-title">Quick Navigation</h3>
// //             <p className="volunteer-alert-text">
// //               Manage your volunteer force or review all mission reports.
// //             </p>
// //             <Link to="/admin/users" className="volunteer-alert-btn" style={{ marginBottom: '10px', background: '#2D5A27' }}>
// //               <span style={{ marginRight: '8px' }}>👥</span>
// //               Manage Volunteers
// //             </Link>
// //             <Link to="/admin/rescue-reports" className="volunteer-alert-btn" style={{ background: '#1976D2' }}>
// //               <span style={{ marginRight: '8px' }}>📋</span>
// //               View All Reports
// //             </Link>
// //           </div>
// //         </div>

// //         <div className="recent-reports-section">
// //           <div className="section-header">
// //             <h3>Recent Reports ({reports.length})</h3>
// //             <Link to="/admin/rescue-reports" className="view-all-link">
// //               View All Reports →
// //             </Link>
// //           </div>
// //           <div className="reports-table-container">
// //             {reportsLoading ? (
// //               <div className="loading-message">
// //                 <div className="loading-spinner-small"></div>
// //                 <p>Loading reports...</p>
// //               </div>
// //             ) : reports.length > 0 ? (
// //               <table className="reports-table">
// //                 <thead>
// //                   <tr>
// //                     <th>ID</th>
// //                     <th>Animal</th>
// //                     <th>Condition</th>
// //                     <th>Location</th>
// //                     <th>Reporter</th>
// //                     <th>Volunteer</th>
// //                     <th>Date</th>
// //                     <th>Status</th>
// //                   </tr>
// //                 </thead>
// //                 <tbody>
// //                   {reports.slice(0, 10).map((report) => (
// //                     <tr key={report.report_id}>
// //                       <td>#{report.report_id}</td>
// //                       <td className="animal-type">
// //                         {getAnimalEmoji(report.animal_type)} {report.animal_type || 'Unknown'}
// //                       </td>
// //                       <td>{report.animal_condition || 'Unknown'}</td>
// //                       <td className="location-cell">{report.location_address || 'No location'}</td>
// //                       <td>{report.reporter_name || 'Anonymous'}</td>
// //                       <td>
// //                         {report.volunteer_name ? (
// //                           <span className="volunteer-name">{report.volunteer_name}</span>
// //                         ) : (
// //                           <span className="not-assigned">Not assigned</span>
// //                         )}
// //                       </td>
// //                       <td className="report-date">{formatShortDate(report.submitted_at)}</td>
// //                       <td>
// //                         <span className={`status-badge status-${getStatusClass(report.status_name)}`}>
// //                           {getStatusText(report.status_name)}
// //                         </span>
// //                       </td>
// //                     </tr>
// //                   ))}
// //                 </tbody>
// //               </table>
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
// //   const [activeMissions, setActiveMissions] = useState<VolunteerTask[]>([]);
// //   const [pendingTasks, setPendingTasks] = useState<VolunteerTask[]>([]);
// //   const [missionsLoading, setMissionsLoading] = useState(true);
// //   const [fetchError, setFetchError] = useState<string | null>(null);
// //   const [actionLoading, setActionLoading] = useState(false);
// //   const [showAllActive, setShowAllActive] = useState(false);
// //   const [showAllPending, setShowAllPending] = useState(false);
// //   const [selectedTask, setSelectedTask] = useState<VolunteerTask | null>(null);
// //   const [isTaskModalOpen, setIsTaskModalOpen] = useState(false);
// //   const [isDeclineModalOpen, setIsDeclineModalOpen] = useState(false);
// //   const [selectedTaskId, setSelectedTaskId] = useState<number | null>(null);
// //   const [completedTasksCount, setCompletedTasksCount] = useState(0);
// //   const [taskEvidence, setTaskEvidence] = useState<{[key: number]: TaskProof[]}>({});
// //   const [taskAdminNotes, setTaskAdminNotes] = useState<{[key: number]: AdminNote[]}>({});
  
// //   useEffect(() => {
// //     const fetchAllTasks = async () => {
// //       if (!user?.user_id) return;
      
// //       try {
// //         setMissionsLoading(true);
// //         setFetchError(null);
// //         const token = sessionStorage.getItem('token');
        
// //         if (!token) {
// //           setFetchError('No authentication token');
// //           return;
// //         }

// //         const response = await fetch(
// //           `http://localhost:5000/api/volunteers/tasks`,
// //           {
// //             method: 'GET',
// //             headers: {
// //               'Authorization': `Bearer ${token}`,
// //               'Content-Type': 'application/json'
// //             }
// //           }
// //         );
        
// //         if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
        
// //         const data = await response.json();
        
// //         if (data.success && data.data) {
// //           const assigned = data.data.filter((t: VolunteerTask) => t.task_status_id === 1);
// //           const inProgress = data.data.filter((t: VolunteerTask) => t.task_status_id === 2);
// //           const completed = data.data.filter((t: VolunteerTask) => t.task_status_id === 3);
          
// //           setPendingTasks(assigned);
// //           setActiveMissions(inProgress);
// //           setCompletedTasksCount(completed.length);
// //         } else {
// //           setPendingTasks([]);
// //           setActiveMissions([]);
// //         }
// //       } catch (error) {
// //         console.error('Error fetching tasks:', error);
// //         setFetchError(error instanceof Error ? error.message : 'Unknown error');
// //         setPendingTasks([]);
// //         setActiveMissions([]);
// //       } finally {
// //         setMissionsLoading(false);
// //       }
// //     };
    
// //     fetchAllTasks();
// //   }, [user?.user_id]);

// //   const fetchTaskEvidence = async (taskId: number) => {
// //     try {
// //       const token = sessionStorage.getItem('token');
// //       const response = await fetch(
// //         `http://localhost:5000/api/tasks/${taskId}/evidence`,
// //         {
// //           headers: {
// //             'Authorization': `Bearer ${token}`
// //           }
// //         }
// //       );
// //       const data = await response.json();
// //       if (data.success) {
// //         setTaskEvidence(prev => ({
// //           ...prev,
// //           [taskId]: data.data
// //         }));
// //       }
// //     } catch (error) {
// //       console.error('Error fetching evidence:', error);
// //     }
// //   };

// //   const fetchTaskAdminNotes = async (reportId: number, taskId: number) => {
// //     try {
// //       const token = sessionStorage.getItem('token');
// //       const response = await fetch(
// //         `http://localhost:5000/api/reports/${reportId}/admin-notes`,
// //         {
// //           headers: {
// //             'Authorization': `Bearer ${token}`
// //           }
// //         }
// //       );
// //       const data = await response.json();
// //       if (data.success) {
// //         setTaskAdminNotes(prev => ({
// //           ...prev,
// //           [taskId]: data.data
// //         }));
// //       }
// //     } catch (error) {
// //       console.error('Error fetching admin notes:', error);
// //     }
// //   };

// //   const handleAcceptTask = async (taskId: number) => {
// //     try {
// //       setActionLoading(true);
// //       const token = sessionStorage.getItem('token');
      
// //       const response = await fetch(
// //         `http://localhost:5000/api/volunteers/tasks/${taskId}/accept`,
// //         {
// //           method: 'PATCH',
// //           headers: {
// //             'Authorization': `Bearer ${token}`,
// //             'Content-Type': 'application/json'
// //           }
// //         }
// //       );
      
// //       const data = await response.json();
      
// //       if (data.success) {
// //         const acceptedTask = pendingTasks.find(t => t.task_id === taskId);
// //         if (acceptedTask) {
// //           const updatedTask = {
// //             ...acceptedTask,
// //             task_status_id: 2,
// //             task_status: 'in_progress',
// //             started_at: new Date().toISOString()
// //           };
// //           setPendingTasks(prev => prev.filter(t => t.task_id !== taskId));
// //           setActiveMissions(prev => [...prev, updatedTask]);
// //         }
// //         toast.success('Task accepted successfully!');
// //       } else {
// //         toast.success('Failed to accept task: ' + data.message);
// //       }
// //     } catch (error) {
// //       console.error('Error accepting task:', error);
// //       toast.success('Failed to accept task');
// //     } finally {
// //       setActionLoading(false);
// //     }
// //   };

// //   const handleDeclineTask = async (taskId: number, reason: string) => {
// //     try {
// //       setActionLoading(true);
// //       const token = sessionStorage.getItem('token');
      
// //       const response = await fetch(
// //         `http://localhost:5000/api/volunteers/tasks/${taskId}/decline`,
// //         {
// //           method: 'PATCH',
// //           headers: {
// //             'Authorization': `Bearer ${token}`,
// //             'Content-Type': 'application/json'
// //           },
// //           body: JSON.stringify({ reason })
// //         }
// //       );
      
// //       const data = await response.json();
      
// //       if (data.success) {
// //         setPendingTasks(prev => prev.filter(t => t.task_id !== taskId));
// //         toast.success('Task declined successfully');
// //       } else {
// //         toast.success('Failed to decline task: ' + data.message);
// //       }
// //     } catch (error) {
// //       console.error('Error declining task:', error);
// //       toast.success('Failed to decline task');
// //     } finally {
// //       setActionLoading(false);
// //       setIsDeclineModalOpen(false);
// //       setSelectedTaskId(null);
// //     }
// //   };

// //   const handleUploadEvidence = async (taskId: number, file: File, notes: string) => {
// //     try {
// //       setActionLoading(true);
// //       const token = sessionStorage.getItem('token');
      
// //       const formData = new FormData();
// //       formData.append('proofs', file);
      
// //       const uploadResponse = await fetch(
// //         `http://localhost:5000/api/tasks/${taskId}/upload-proofs`,
// //         {
// //           method: 'POST',
// //           headers: {
// //             'Authorization': `Bearer ${token}`
// //           },
// //           body: formData
// //         }
// //       );
      
// //       const uploadData = await uploadResponse.json();
      
// //       if (!uploadData.success) {
// //         toast.success('Failed to upload proof: ' + uploadData.message);
// //         return;
// //       }
      
// //       const noteResponse = await fetch(
// //         `http://localhost:5000/api/tasks/${taskId}/completion-notes`,
// //         {
// //           method: 'POST',
// //           headers: {
// //             'Authorization': `Bearer ${token}`,
// //             'Content-Type': 'application/json'
// //           },
// //           body: JSON.stringify({ 
// //             note_text: notes,
// //             volunteer_id: user.user_id 
// //           })
// //         }
// //       );
      
// //       const noteData = await noteResponse.json();
      
// //       if (!noteData.success) {
// //         toast.success('Failed to save completion note: ' + noteData.message);
// //         return;
// //       }
      
// //       const completeResponse = await fetch(
// //         `http://localhost:5000/api/volunteers/tasks/${taskId}/complete`,
// //         {
// //           method: 'PATCH',
// //           headers: {
// //             'Authorization': `Bearer ${token}`,
// //             'Content-Type': 'application/json'
// //           }
// //         }
// //       );
      
// //       const completeData = await completeResponse.json();
      
// //       if (completeData.success) {
// //         setActiveMissions(prev => prev.filter(t => t.task_id !== taskId));
// //         setCompletedTasksCount(prev => prev + 1);
// //         setIsTaskModalOpen(false);
// //         setSelectedTask(null);
// //         toast.success('Mission completed successfully! Thank you for your service!');
        
// //         fetchTaskEvidence(taskId);
// //       } else {
// //         toast.success('Failed to complete mission: ' + completeData.message);
// //       }
      
// //     } catch (error) {
// //       console.error('Error uploading evidence:', error);
// //       toast.success('Failed to upload evidence and complete mission');
// //     } finally {
// //       setActionLoading(false);
// //     }
// //   };

// //   const handleCompleteTask = async (taskId: number) => {
// //     try {
// //       setActionLoading(true);
// //       const token = sessionStorage.getItem('token');
      
// //       const response = await fetch(
// //         `http://localhost:5000/api/volunteers/tasks/${taskId}/complete`,
// //         {
// //           method: 'PATCH',
// //           headers: {
// //             'Authorization': `Bearer ${token}`,
// //             'Content-Type': 'application/json'
// //           }
// //         }
// //       );
      
// //       const data = await response.json();
      
// //       if (data.success) {
// //         const completedTask = activeMissions.find(t => t.task_id === taskId);
// //         if (completedTask) {
// //           setActiveMissions(prev => prev.filter(t => t.task_id !== taskId));
// //           setCompletedTasksCount(prev => prev + 1);
// //         }
// //         setIsTaskModalOpen(false);
// //         setSelectedTask(null);
// //         toast.success('Mission completed successfully! Thank you for your service!');
// //       } else {
// //         toast.success('Failed to complete mission: ' + data.message);
// //       }
// //     } catch (error) {
// //       console.error('Error completing task:', error);
// //       toast.success('Failed to complete mission');
// //     } finally {
// //       setActionLoading(false);
// //     }
// //   };

// //   const handleViewTaskDetails = (task: VolunteerTask) => {
// //     setSelectedTask(task);
// //     fetchTaskEvidence(task.task_id);
// //     fetchTaskAdminNotes(task.report_id, task.task_id);
// //     setIsTaskModalOpen(true);
// //   };

// //   const displayedActiveMissions = showAllActive ? activeMissions : activeMissions.slice(0, 3);
// //   const displayedPendingTasks = showAllPending ? pendingTasks : pendingTasks.slice(0, 3);

// //   return (
// //     <div className="dashboard-wrapper animate-fade-in">
// //       <div className="volunteer-dashboard-new">
        
// //         <div className="reports-header" style={{ marginBottom: '2rem' }}>
// //           <div className="reports-header-content">
// //             <h1 className="reports-title">Welcome back, Ranger {user.username}!</h1>
// //             <p className="reports-subtitle">
// //               Your dedication saves lives. Ready for your next mission?
// //             </p>
// //             {userProfile?.email && (
// //               <div style={{ marginTop: '0.5rem', display: 'flex', alignItems: 'center', gap: '8px' }}>
// //                 <span style={{ fontSize: '1.1rem' }}>✉️</span>
// //                 <span style={{ color: '#2D5A27', fontWeight: '500' }}>{userProfile.email}</span>
// //               </div>
// //             )}
// //             {userProfile?.phone && (
// //               <div style={{ marginTop: '0.5rem', display: 'flex', alignItems: 'center', gap: '8px' }}>
// //                 <span style={{ fontSize: '1.1rem' }}>📱</span>
// //                 <span style={{ color: '#2D5A27', fontWeight: '500' }}>Contact: {userProfile.phone}</span>
// //               </div>
// //             )}
// //           </div>
// //           <div className="reports-header-actions">
// //             <Link to="/tasks" className="reports-btn refresh">
// //               <span className="btn-icon">📋</span>
// //               Mission Board
// //             </Link>
// //             <Link to="/profile" className="reports-btn refresh">
// //               <span className="btn-icon">🏆</span>
// //               My Profile
// //             </Link>
// //           </div>
// //         </div>

// //         <div className="reports-filters-card" style={{ marginBottom: '2rem', padding: '1.5rem' }}>
// //           <div style={{ 
// //             display: 'grid', 
// //             gridTemplateColumns: 'repeat(4, 1fr)', 
// //             gap: '1.5rem'
// //           }}>
// //             <div style={{ 
// //               background: 'linear-gradient(135deg, #2D5A27 0%, #1e3f1a 100%)',
// //               borderRadius: '12px',
// //               padding: '1.25rem',
// //               color: 'white'
// //             }}>
// //               <div style={{ fontSize: '0.85rem', opacity: '0.9', marginBottom: '0.5rem' }}>TOTAL RESCUES</div>
// //               <div style={{ fontSize: '2.5rem', fontWeight: '700', lineHeight: '1' }}>
// //                 {completedTasksCount}
// //               </div>
// //               <div style={{ fontSize: '0.8rem', opacity: '0.8', marginTop: '0.5rem' }}>Lives Saved ✓</div>
// //             </div>

// //             <div style={{ 
// //               background: 'linear-gradient(135deg, #1976D2 0%, #0D47A1 100%)',
// //               borderRadius: '12px',
// //               padding: '1.25rem',
// //               color: 'white'
// //             }}>
// //               <div style={{ fontSize: '0.85rem', opacity: '0.9', marginBottom: '0.5rem' }}>ACTIVE MISSIONS</div>
// //               <div style={{ fontSize: '2.5rem', fontWeight: '700', lineHeight: '1' }}>
// //                 {activeMissions.length}
// //               </div>
// //               <div style={{ fontSize: '0.8rem', opacity: '0.8', marginTop: '0.5rem' }}>In Progress 🎯</div>
// //             </div>

// //             <div style={{ 
// //               background: 'linear-gradient(135deg, #FF9F1C 0%, #E65100 100%)',
// //               borderRadius: '12px',
// //               padding: '1.25rem',
// //               color: 'white'
// //             }}>
// //               <div style={{ fontSize: '0.85rem', opacity: '0.9', marginBottom: '0.5rem' }}>PENDING</div>
// //               <div style={{ fontSize: '2.5rem', fontWeight: '700', lineHeight: '1' }}>
// //                 {pendingTasks.length}
// //               </div>
// //               <div style={{ fontSize: '0.8rem', opacity: '0.8', marginTop: '0.5rem' }}>Awaiting Decision ⏳</div>
// //             </div>

// //             <div style={{ 
// //               background: 'linear-gradient(135deg, #7D8C5A 0%, #5A6B3E 100%)',
// //               borderRadius: '12px',
// //               padding: '1.25rem',
// //               color: 'white'
// //             }}>
// //               <div style={{ fontSize: '0.85rem', opacity: '0.9', marginBottom: '0.5rem' }}>SUCCESS RATE</div>
// //               <div style={{ fontSize: '2.5rem', fontWeight: '700', lineHeight: '1' }}>
// //                 {completedTasksCount + activeMissions.length > 0 
// //                   ? Math.round((completedTasksCount / (completedTasksCount + activeMissions.length)) * 100) 
// //                   : 0}%
// //               </div>
// //               <div style={{ fontSize: '0.8rem', opacity: '0.8', marginTop: '0.5rem' }}>Mission Success</div>
// //             </div>
// //           </div>
// //         </div>

// //         {pendingTasks.length > 0 && (
// //           <div className="reports-section" style={{ marginBottom: '2.5rem' }}>
// //             <div className="reports-header">
// //               <h2 className="reports-title" style={{ fontSize: '1.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
// //                 <span>⏳</span> Pending Confirmation ({pendingTasks.length})
// //               </h2>
// //               {pendingTasks.length > 3 && (
// //                 <button 
// //                   onClick={() => setShowAllPending(!showAllPending)}
// //                   className="view-all-link"
// //                 >
// //                   {showAllPending ? 'Show Less ↑' : `View All (${pendingTasks.length}) →`}
// //                 </button>
// //               )}
// //             </div>
            
// //             <div className="reports-grid" style={{ gridTemplateColumns: 'repeat(3, 1fr)' }}>
// //               {displayedPendingTasks.map((task) => {
// //                 const statusBadge = getTaskStatusBadge(task.task_status_id);
                
// //                 return (
// //                   <div key={task.task_id} className="reports-card">
// //                     <div className="reports-card-header" style={{ background: '#FF9F1C' }}>
// //                       <div className="reports-card-title">
// //                         <span className="reports-id" style={{ background: 'rgba(255,255,255,0.2)', color: 'white' }}>
// //                           #{task.report_id}
// //                         </span>
// //                         <span className="reports-status" style={{ background: 'rgba(255,255,255,0.2)', color: 'white' }}>
// //                           {statusBadge.text}
// //                         </span>
// //                       </div>
// //                       <div className="reports-date" style={{ color: 'rgba(255,255,255,0.9)' }}>
// //                         {formatShortDate(task.submitted_at)}
// //                       </div>
// //                     </div>

// //                     <div className="reports-card-body">
// //                       <div className="reports-animal-section">
// //                         <div className="reports-animal-icon large">
// //                           {getAnimalEmoji(task.animal_type)}
// //                         </div>
// //                         <div className="reports-animal-info">
// //                           <h4>{task.animal_type}</h4>
// //                           <span className="reports-condition">{task.animal_condition}</span>
// //                         </div>
// //                       </div>

// //                       <div className="reports-location-section">
// //                         <span className="location-icon">📍</span>
// //                         <span className="location-text">{task.location_address}</span>
// //                       </div>

// //                       <div className="reports-volunteer-section">
// //                         <div className="reports-assigned-ranger" style={{ background: '#fef2e8' }}>
// //                           <div className="ranger-avatar" style={{ background: '#E65100' }}>
// //                             {task.reporter_name?.charAt(0).toUpperCase() || '?'}
// //                           </div>
// //                           <div className="ranger-info">
// //                             <span className="ranger-name">{task.reporter_name || 'Anonymous'}</span>
// //                             <span className="ranger-role">Reporter</span>
// //                             {task.reporter_email && task.reporter_email !== 'No email' && (
// //                               <span className="ranger-phone" style={{ fontSize: '0.75rem', color: '#E65100' }}>
// //                                 ✉️ {task.reporter_email}
// //                               </span>
// //                             )}
// //                             {task.reporter_phone && task.reporter_phone !== 'No phone' && (
// //                               <span className="ranger-phone" style={{ fontSize: '0.75rem', color: '#E65100' }}>
// //                                 📱 {task.reporter_phone}
// //                               </span>
// //                             )}
// //                           </div>
// //                         </div>
// //                       </div>
                      
// //                       <p className="reports-description" style={{ 
// //                         fontSize: '0.85rem', 
// //                         marginBottom: '0.5rem',
// //                         color: '#666'
// //                       }}>
// //                         {task.description?.length > 80 
// //                           ? `${task.description.substring(0, 80)}...` 
// //                           : task.description || 'No description provided'}
// //                       </p>
// //                     </div>

// //                     <div className="reports-card-footer">
// //                       <div style={{ display: 'flex', gap: '0.75rem' }}>
// //                         <button 
// //                           onClick={() => handleAcceptTask(task.task_id!)}
// //                           disabled={actionLoading}
// //                           className="reports-btn"
// //                           style={{ 
// //                             flex: 2,
// //                             background: '#2e7d32',
// //                             color: 'white',
// //                             padding: '0.6rem',
// //                             fontSize: '0.85rem',
// //                             fontWeight: '600',
// //                             border: 'none',
// //                             borderRadius: '4px',
// //                             cursor: actionLoading ? 'not-allowed' : 'pointer'
// //                           }}
// //                         >
// //                           {actionLoading ? '...' : 'Accept'}
// //                         </button>
// //                         <button 
// //                           onClick={() => {
// //                             setSelectedTaskId(task.task_id!);
// //                             setIsDeclineModalOpen(true);
// //                           }}
// //                           disabled={actionLoading}
// //                           className="reports-btn"
// //                           style={{ 
// //                             flex: 1,
// //                             background: 'transparent',
// //                             color: '#c62828',
// //                             border: '1px solid #c62828',
// //                             padding: '0.6rem',
// //                             fontSize: '0.85rem',
// //                             fontWeight: '600',
// //                             borderRadius: '4px',
// //                             cursor: actionLoading ? 'not-allowed' : 'pointer'
// //                           }}
// //                         >
// //                           Decline
// //                         </button>
// //                       </div>
// //                     </div>
// //                   </div>
// //                 );
// //               })}
// //             </div>
// //           </div>
// //         )}

// //         <div className="reports-section">
// //           <div className="reports-header">
// //             <h2 className="reports-title" style={{ fontSize: '1.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
// //               <span>📻</span> Your Active Missions ({activeMissions.length})
// //             </h2>
// //             {activeMissions.length > 3 && (
// //               <button 
// //                 onClick={() => setShowAllActive(!showAllActive)}
// //                 className="view-all-link"
// //               >
// //                 {showAllActive ? 'Show Less ↑' : `View All (${activeMissions.length}) →`}
// //               </button>
// //             )}
// //           </div>
          
// //           {missionsLoading ? (
// //             <div className="reports-loading-container">
// //               <div className="reports-loader">
// //                 <div className="reports-spinner"></div>
// //                 <p className="reports-loader-text">Loading your missions...</p>
// //               </div>
// //             </div>
// //           ) : fetchError ? (
// //             <div className="reports-empty-state">
// //               <span className="empty-state-emoji">❌</span>
// //               <h3>Error Loading Missions</h3>
// //               <p>{fetchError}</p>
// //               <button onClick={() => window.location.reload()} className="reports-btn primary">
// //                 Retry
// //               </button>
// //             </div>
// //           ) : activeMissions.length > 0 ? (
// //             <>
// //               <div className="reports-grid" style={{ gridTemplateColumns: 'repeat(3, 1fr)' }}>
// //                 {displayedActiveMissions.map((mission) => {
// //                   const statusBadge = getTaskStatusBadge(mission.task_status_id);
// //                   const hasEvidence = taskEvidence[mission.task_id]?.length > 0;
                  
// //                   return (
// //                     <div key={mission.task_id} className="reports-card">
// //                       <div className="reports-card-header dark">
// //                         <div className="reports-card-title">
// //                           <span className="reports-id" style={{ background: 'rgba(255,255,255,0.2)', color: 'white' }}>
// //                             #{mission.report_id}
// //                           </span>
// //                           <span className="reports-status" style={{ background: 'rgba(255,255,255,0.2)', color: 'white' }}>
// //                             {statusBadge.text}
// //                           </span>
// //                         </div>
// //                         <div className="reports-volunteer-tag" style={{ color: 'white', fontSize: '0.8rem', fontWeight: '600' }}>
// //                           {user.username?.toUpperCase()}
// //                         </div>
// //                       </div>

// //                       <div className="reports-card-body">
// //                         <div className="reports-animal-section">
// //                           <div className="reports-animal-icon large">
// //                             {getAnimalEmoji(mission.animal_type)}
// //                           </div>
// //                           <div className="reports-animal-info">
// //                             <h4>{mission.animal_type || 'Animal'} Rescue</h4>
// //                             <span className="reports-condition" style={{ 
// //                               background: '#ffebee', 
// //                               color: '#c62828',
// //                               fontWeight: 'bold'
// //                             }}>
// //                               {mission.animal_condition || 'CRITICAL'}
// //                             </span>
// //                           </div>
// //                         </div>

// //                         <div className="reports-location-section">
// //                           <span className="location-icon">📍</span>
// //                           <span className="location-text">{mission.location_address || 'Location not specified'}</span>
// //                         </div>

// //                         <div className="reports-volunteer-section">
// //                           <div className="reports-assigned-ranger" style={{ background: '#e8f5e9' }}>
// //                             <div className="ranger-avatar" style={{ background: '#2e7d32' }}>
// //                               {mission.reporter_name?.charAt(0).toUpperCase() || '?'}
// //                             </div>
// //                             <div className="ranger-info">
// //                               <span className="ranger-name">{mission.reporter_name || 'Anonymous'}</span>
// //                               <span className="ranger-role">Reporter</span>
// //                               {mission.reporter_email && mission.reporter_email !== 'No email' && (
// //                                 <span className="ranger-phone" style={{ fontSize: '0.75rem', color: '#2e7d32' }}>
// //                                   ✉️ {mission.reporter_email}
// //                                 </span>
// //                               )}
// //                               {mission.reporter_phone && mission.reporter_phone !== 'No phone' && (
// //                                 <span className="ranger-phone" style={{ fontSize: '0.75rem', color: '#2e7d32' }}>
// //                                   📱 {mission.reporter_phone}
// //                                 </span>
// //                               )}
// //                             </div>
// //                           </div>
// //                         </div>
                        
// //                         <p className="reports-description" style={{ 
// //                           fontSize: '0.85rem', 
// //                           marginBottom: '0.5rem',
// //                           color: '#666'
// //                         }}>
// //                           {mission.description?.length > 100 
// //                             ? `${mission.description.substring(0, 100)}...` 
// //                             : mission.description || 'No description provided'}
// //                         </p>

// //                         {hasEvidence && (
// //                           <div className="evidence-indicator">
// //                             <span style={{ color: '#2e7d32', fontSize: '0.8rem', fontWeight: '600' }}>📸 Evidence Uploaded</span>
// //                           </div>
// //                         )}

// //                         <div style={{ 
// //                           display: 'flex', 
// //                           justifyContent: 'space-between',
// //                           alignItems: 'center',
// //                           fontSize: '0.7rem',
// //                           color: '#888',
// //                           marginTop: '0.5rem',
// //                           paddingTop: '0.5rem',
// //                           borderTop: '1px solid #e8dfc9'
// //                         }}>
// //                           <span style={{ 
// //                             padding: '2px 8px',
// //                             borderRadius: '12px',
// //                             background: '#e3f2fd',
// //                             color: '#1565c0',
// //                             fontWeight: 'bold'
// //                           }}>
// //                             {statusBadge.text}
// //                           </span>
// //                           {mission.assigned_at && (
// //                             <span>Assigned: {formatShortDate(mission.assigned_at)}</span>
// //                           )}
// //                         </div>
// //                       </div>

// //                       <div className="reports-card-footer">
// //                         <button 
// //                           onClick={() => handleViewTaskDetails(mission)}
// //                           className="reports-btn"
// //                           style={{ 
// //                             width: '100%',
// //                             background: '#2D5A27',
// //                             color: 'white',
// //                             padding: '0.6rem',
// //                             fontSize: '0.85rem',
// //                             fontWeight: '600',
// //                             border: 'none',
// //                             borderRadius: '4px',
// //                             cursor: 'pointer'
// //                           }}
// //                         >
// //                           View Details →
// //                         </button>
// //                       </div>
// //                     </div>
// //                   );
// //                 })}
// //               </div>
// //             </>
// //           ) : (
// //             <div className="reports-empty-state">
// //               <span className="empty-state-emoji">🎯</span>
// //               <h3>No Active Missions</h3>
// //               <p>You don't have any active rescue missions at the moment.</p>
// //               <Link to="/tasks" className="reports-btn primary">
// //                 Browse Available Missions
// //               </Link>
// //             </div>
// //           )}
// //         </div>
// //       </div>

// //       {selectedTask && (
// //         <TaskDetailModal 
// //           task={selectedTask}
// //           isOpen={isTaskModalOpen}
// //           onClose={() => {
// //             setIsTaskModalOpen(false);
// //             setSelectedTask(null);
// //           }}
// //           onComplete={handleCompleteTask}
// //           onUploadEvidence={handleUploadEvidence}
// //           actionLoading={actionLoading}
// //           userProfile={userProfile}
// //           evidence={taskEvidence[selectedTask.task_id]}
// //           adminNotes={taskAdminNotes[selectedTask.task_id]}
// //         />
// //       )}

// //       {selectedTaskId && (
// //         <DeclineModal
// //           isOpen={isDeclineModalOpen}
// //           onClose={() => {
// //             setIsDeclineModalOpen(false);
// //             setSelectedTaskId(null);
// //           }}
// //           onSubmit={(reason) => handleDeclineTask(selectedTaskId, reason)}
// //           taskId={selectedTaskId}
// //         />
// //       )}
// //     </div>
// //   );
// // };

// // const PendingVolunteerDashboard: React.FC<{ user: any }> = ({ user }) => {
// //   return (
// //     <div className="dashboard-wrapper animate-fade-in">
// //       <div className="pending-volunteer">
// //         <div className="pending-icon">⏰</div>
// //         <h2 className="pending-title">Activation Pending</h2>
// //         <p className="pending-text">
// //           Thank you for joining ResQAll. Our HQ is currently reviewing your ranger profile. 
// //           You will be notified via field log once approved.
// //         </p>
// //       </div>
// //     </div>
// //   );
// // };

// // const RejectedVolunteerDashboard: React.FC<{ user: any }> = ({ user }) => {
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
// //   const userEmail = userProfile?.email;

// //   return (
// //     <div className="dashboard-wrapper animate-fade-in">
// //       <div className="user-dashboard">
// //         <div className="user-welcome-section">
// //           <div className="user-welcome-content">
// //             <h2 className="user-welcome-title">
// //               <span className="user-welcome-greeting">Welcome back,</span>
// //               <span className="user-welcome-name">{user.username || 'Animal Friend'}!</span>
// //             </h2>
// //             {userEmail && (
// //               <p className="user-contact-info">
// //                 <span className="contact-icon">✉️</span>
// //                 <span className="contact-text">{userEmail}</span>
// //               </p>
// //             )}
// //             {userPhone && (
// //               <p className="user-contact-info">
// //                 <span className="contact-icon">📱</span>
// //                 <span className="contact-text">Contact: {userPhone}</span>
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
// //             <div className="stat-card-icon total-reports">📄</div>
// //             <div className="stat-card-content">
// //               <h3 className="stat-card-value">{totalReports}</h3>
// //               <p className="stat-card-label">Total Reports</p>
// //             </div>
// //           </div>
          
// //           <div className="user-stat-card">
// //             <div className="stat-card-icon in-progress">⏳</div>
// //             <div className="stat-card-content">
// //               <h3 className="stat-card-value">{inProgressReports}</h3>
// //               <p className="stat-card-label">In Progress</p>
// //             </div>
// //           </div>
          
// //           <div className="user-stat-card">
// //             <div className="stat-card-icon completed">✓</div>
// //             <div className="stat-card-content">
// //               <h3 className="stat-card-value">{completedReports}</h3>
// //               <p className="stat-card-label">Completed</p>
// //             </div>
// //           </div>
          
// //           <div className="user-stat-card">
// //             <div className="stat-card-icon waiting">⏰</div>
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
// //                                 {formatShortDate(report.submitted_at)}
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
                
// //                 {myReports.length > 3 && (
// //                   <div className="view-all-container">
// //                     <Link to="/my-reports" className="view-all-btn">
// //                       View All Reports ({myReports.length})
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
// //           </div>
// //         </div>
// //       </div>
// //     </div>
// //   );
// // };

// // export default Dashboard;


// import React, { useState, useEffect, useCallback, useRef } from 'react';
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
// import { Heatmap } from '../../components/Dashboard/HeatMap';
// import './Dashboard.css';

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
//   reporter_email?: string;
//   volunteer_name?: string;
//   volunteer_id?: number;
//   task_id?: number;
//   task_status_id?: number;
//   task_status?: string;
//   assigned_at?: string;
//   started_at?: string;
//   completed_at?: string;
//   volunteer_responded_at?: string;
//   volunteer_response?: string;
//   declined_reason?: string;
//   admin_note?: string;
// }

// interface AdminNote {
//   note_id: number;
//   report_id: number;
//   admin_id: number;
//   note_text: string;
//   created_at: string;
//   admin_name?: string;
// }

// interface TaskProof {
//   proof_id: number;
//   task_id: number;
//   proof_url: string;
//   uploaded_at: string;
// }

// interface TaskCompletionNote {
//   note_id: number;
//   task_id: number;
//   volunteer_id: number;
//   note_text: string;
//   created_at: string;
// }

// interface VolunteerTask {
//   task_id: number;
//   report_id: number;
//   assigned_to_user_id: number;
//   assigned_by_user_id: number;
//   task_status_id: number;
//   task_status: string;
//   assigned_at: string;
//   volunteer_responded_at?: string;
//   volunteer_response?: string;
//   declined_reason?: string;
//   started_at?: string;
//   completed_at?: string;
//   is_deleted?: number;
  
//   // Report fields
//   user_id: number;
//   description: string;
//   location_address: string;
//   user_note: string;
//   submitted_at: string;
//   animal_type: string;
//   animal_condition: string;
//   report_status_id: number;
//   report_status: string;
  
//   // Reporter fields
//   reporter_name: string;
//   reporter_phone: string;
//   reporter_email: string;
  
//   // Volunteer fields
//   volunteer_name: string;
//   volunteer_email: string;
//   volunteer_phone: string;
// }

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

// interface FullTaskDetails {
//   task: VolunteerTask;
//   evidence: TaskProof[];
//   admin_notes: AdminNote[];
//   completion_notes: TaskCompletionNote[];
// }

// // ===========================================
// // DATE FORMATTING FUNCTIONS
// // ===========================================
// const formatDate = (dateString: string): string => {
//   if (!dateString || dateString === 'Not available' || dateString === 'Invalid date' || dateString === '') {
//     return 'Not available';
//   }
  
//   try {
//     const date = new Date(dateString);
//     if (isNaN(date.getTime())) {
//       return 'Not available';
//     }
//     return date.toLocaleDateString('en-US', {
//       month: 'short',
//       day: 'numeric',
//       year: 'numeric',
//       hour: '2-digit',
//       minute: '2-digit'
//     });
//   } catch (e) {
//     return 'Not available';
//   }
// };

// const formatShortDate = (dateString: string): string => {
//   if (!dateString || dateString === 'Not available' || dateString === 'Invalid date' || dateString === '') {
//     return 'Not available';
//   }
  
//   try {
//     const date = new Date(dateString);
//     if (isNaN(date.getTime())) {
//       return 'Not available';
//     }
//     return date.toLocaleDateString('en-US', {
//       month: 'short',
//       day: 'numeric',
//       year: 'numeric'
//     });
//   } catch (e) {
//     return 'Not available';
//   }
// };

// const formatRelativeTime = (dateString: string): string => {
//   if (!dateString || dateString === 'Not available' || dateString === 'Invalid date' || dateString === '') {
//     return 'Not available';
//   }
  
//   try {
//     const date = new Date(dateString);
//     if (isNaN(date.getTime())) {
//       return 'Not available';
//     }
    
//     const now = new Date();
//     const diffMs = now.getTime() - date.getTime();
//     const diffMins = Math.floor(diffMs / 60000);
//     const diffHours = Math.floor(diffMins / 60);
//     const diffDays = Math.floor(diffHours / 24);

//     if (diffMins < 1) return 'Just now';
//     if (diffMins < 60) return `${diffMins} minute${diffMins === 1 ? '' : 's'} ago`;
//     if (diffHours < 24) return `${diffHours} hour${diffHours === 1 ? '' : 's'} ago`;
//     if (diffDays === 1) return 'Yesterday';
//     if (diffDays < 7) return `${diffDays} days ago`;
//     return formatShortDate(dateString);
//   } catch (e) {
//     return 'Not available';
//   }
// };

// // ===========================================
// // HELPER FUNCTIONS
// // ===========================================
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

// const getTaskStatusBadge = (statusId: number | undefined): { text: string; class: string } => {
//   switch(statusId) {
//     case 1: return { text: 'ASSIGNED', class: 'assigned' };
//     case 2: return { text: 'IN PROGRESS', class: 'progress' };
//     case 3: return { text: 'COMPLETED', class: 'completed' };
//     case 4: return { text: 'DECLINED', class: 'declined' };
//     default: return { text: 'UNKNOWN', class: 'unknown' };
//   }
// };

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

// // ===========================================
// // LOCATION TRACKER COMPONENT
// // ===========================================
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

// const LocationTracker: React.FC<{
//   taskId: number;
//   isActive: boolean;
// }> = ({ taskId, isActive }) => {
//   const [watchId, setWatchId] = useState<number | null>(null);
//   const [lastLocation, setLastLocation] = useState<GeolocationPosition | null>(null);
//   const [isTracking, setIsTracking] = useState(false);
//   const [error, setError] = useState<string | null>(null);
//   const [pendingPoints, setPendingPoints] = useState<number>(0);
  
//   const pendingQueue = useRef<any[]>([]);
  
//   const saveLocation = useCallback(async (latitude: number, longitude: number, accuracy: number) => {
//     try {
//       const token = sessionStorage.getItem('token');
//       if (!token) return;
      
//       const response = await fetch('http://localhost:5000/api/volunteer/tracking/point', {
//         method: 'POST',
//         headers: {
//           'Authorization': `Bearer ${token}`,
//           'Content-Type': 'application/json'
//         },
//         body: JSON.stringify({ taskId, latitude, longitude, accuracy })
//       });
      
//       const data = await response.json();
//       if (!data.success) {
//         pendingQueue.current.push({ latitude, longitude, accuracy, timestamp: new Date() });
//         setPendingPoints(pendingQueue.current.length);
//       }
//     } catch (error) {
//       pendingQueue.current.push({ latitude, longitude, accuracy, timestamp: new Date() });
//       setPendingPoints(pendingQueue.current.length);
//     }
//   }, [taskId]);
  
//   const retryPendingPoints = useCallback(async () => {
//     if (pendingQueue.current.length === 0) return;
    
//     const token = sessionStorage.getItem('token');
//     if (!token) return;
    
//     const points = [...pendingQueue.current];
//     pendingQueue.current = [];
//     setPendingPoints(0);
    
//     for (const point of points) {
//       try {
//         await fetch('http://localhost:5000/api/volunteer/tracking/point', {
//           method: 'POST',
//           headers: {
//             'Authorization': `Bearer ${token}`,
//             'Content-Type': 'application/json'
//           },
//           body: JSON.stringify({
//             taskId,
//             latitude: point.latitude,
//             longitude: point.longitude,
//             accuracy: point.accuracy
//           })
//         });
//       } catch (error) {
//         pendingQueue.current.push(point);
//         setPendingPoints(pendingQueue.current.length);
//       }
//     }
//   }, [taskId]);
  
//   const startTracking = useCallback(() => {
//     if (!navigator.geolocation) {
//       setError('Geolocation is not supported');
//       return;
//     }
    
//     setError(null);
    
//     navigator.geolocation.getCurrentPosition(
//       (position) => {
//         setLastLocation(position);
//         saveLocation(
//           position.coords.latitude,
//           position.coords.longitude,
//           position.coords.accuracy || 0
//         );
//       },
//       () => {},
//       { enableHighAccuracy: false, timeout: 10000, maximumAge: 60000 }
//     );
    
//     const id = navigator.geolocation.watchPosition(
//       (position) => {
//         let shouldSave = true;
        
//         if (lastLocation) {
//           const distance = calculateDistance(
//             lastLocation.coords.latitude,
//             lastLocation.coords.longitude,
//             position.coords.latitude,
//             position.coords.longitude
//           );
//           const timeDiff = (position.timestamp - lastLocation.timestamp) / 1000;
//           shouldSave = distance > 0.05 || timeDiff > 30;
//         }
        
//         if (shouldSave) {
//           saveLocation(
//             position.coords.latitude,
//             position.coords.longitude,
//             position.coords.accuracy || 0
//           );
//         }
        
//         setLastLocation(position);
//       },
//       (error) => {
//         let errorMsg = 'Location error';
//         switch(error.code) {
//           case error.PERMISSION_DENIED: errorMsg = 'Permission denied'; break;
//           case error.POSITION_UNAVAILABLE: errorMsg = 'Location unavailable'; break;
//           case error.TIMEOUT: errorMsg = 'Location timeout'; break;
//         }
//         setError(errorMsg);
//       },
//       { enableHighAccuracy: true, timeout: 30000, maximumAge: 0 }
//     );
    
//     setWatchId(id);
//     setIsTracking(true);
//   }, [lastLocation, saveLocation]);
  
//   const stopTracking = useCallback(() => {
//     if (watchId !== null) {
//       navigator.geolocation.clearWatch(watchId);
//       setWatchId(null);
//       setIsTracking(false);
//     }
//   }, [watchId]);
  
//   useEffect(() => {
//     if (isActive) {
//       const timer = setTimeout(() => startTracking(), 1000);
//       return () => { clearTimeout(timer); stopTracking(); };
//     } else {
//       stopTracking();
//     }
//   }, [isActive, startTracking, stopTracking]);
  
//   useEffect(() => {
//     const handleOnline = () => retryPendingPoints();
//     window.addEventListener('online', handleOnline);
//     return () => window.removeEventListener('online', handleOnline);
//   }, [retryPendingPoints]);
  
//   useEffect(() => {
//     const interval = setInterval(() => {
//       if (navigator.onLine && pendingQueue.current.length > 0) retryPendingPoints();
//     }, 30000);
//     return () => clearInterval(interval);
//   }, [retryPendingPoints]);
  
//   if (!isActive) return null;
  
//   return (
//     <div style={{
//       position: 'fixed', bottom: '20px', right: '20px',
//       background: error ? '#ffebee' : '#e8f5e9',
//       padding: '8px 12px', borderRadius: '20px', fontSize: '0.8rem',
//       boxShadow: '0 2px 5px rgba(0,0,0,0.2)', zIndex: 9999,
//       display: 'flex', alignItems: 'center', gap: '6px'
//     }}>
//       <span style={{
//         width: '8px', height: '8px', borderRadius: '50%',
//         background: error ? '#f44336' : (isTracking ? '#4caf50' : '#ff9800'),
//         animation: isTracking && !error ? 'pulse 2s infinite' : 'none'
//       }}></span>
//       <span>
//         {error ? 'Location Error' : (isTracking ? 'Sharing Location' : 'Starting...')}
//       </span>
//       {pendingPoints > 0 && (
//         <span style={{ background: '#fff3e0', padding: '2px 6px', borderRadius: '12px', fontSize: '0.7rem' }}>
//           {pendingPoints} pending
//         </span>
//       )}
//     </div>
//   );
// };

// // ===========================================
// // DECLINE MODAL
// // ===========================================
// const DeclineModal: React.FC<{
//   isOpen: boolean;
//   onClose: () => void;
//   onSubmit: (reason: string) => void;
//   taskId: number;
// }> = ({ isOpen, onClose, onSubmit, taskId }) => {
//   const [reason, setReason] = useState('');
//   const [otherReason, setOtherReason] = useState('');
//   const [submitting, setSubmitting] = useState(false);

//   if (!isOpen) return null;

//   const handleSubmit = async () => {
//     const finalReason = reason === 'other' ? otherReason : reason;
//     if (finalReason) {
//       setSubmitting(true);
//       try {
//         await onSubmit(finalReason);
//       } finally {
//         setSubmitting(false);
//         setReason('');
//         setOtherReason('');
//         onClose();
//       }
//     }
//   };

//   return (
//     <div className="modal-overlay" onClick={onClose}>
//       <div className="modal-content" onClick={e => e.stopPropagation()}>
//         <div className="modal-header">
//           <div className="modal-header-left">
//             <span className="modal-icon">❌</span>
//             <div>
//               <h3 className="modal-title">Decline Task #{taskId}</h3>
//               <p className="modal-subtitle">Please provide a reason for declining</p>
//             </div>
//           </div>
//           <button className="modal-close" onClick={onClose}>×</button>
//         </div>
        
//         <div className="modal-body">
//           <div className="decline-info">
//             <p>Your reason helps us improve our volunteer matching system.</p>
//           </div>
          
//           <div className="form-group">
//             <label className="form-label">Reason <span className="required">*</span></label>
//             <select 
//               className="form-select"
//               value={reason}
//               onChange={(e) => setReason(e.target.value)}
//             >
//               <option value="">Select a reason</option>
//               <option value="Too far away">Too far away</option>
//               <option value="Already have active tasks">Already have active tasks</option>
//               <option value="Animal type not suitable">Animal type not suitable</option>
//               <option value="Condition too severe">Condition too severe</option>
//               <option value="Equipment not available">Equipment not available</option>
//               <option value="other">Other (please specify)</option>
//             </select>
//           </div>

//           {reason === 'other' && (
//             <div className="form-group">
//               <label className="form-label">Please specify <span className="required">*</span></label>
//               <textarea
//                 className="form-textarea"
//                 value={otherReason}
//                 onChange={(e) => setOtherReason(e.target.value)}
//                 placeholder="Enter your reason..."
//                 rows={3}
//               />
//             </div>
//           )}
//         </div>
        
//         <div className="modal-footer">
//           <button className="modal-btn secondary" onClick={onClose}>Cancel</button>
//           <button 
//             className="modal-btn danger" 
//             onClick={handleSubmit}
//             disabled={!reason || (reason === 'other' && !otherReason) || submitting}
//           >
//             {submitting ? 'Processing...' : 'Decline Task'}
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// };

// // ===========================================
// // UPLOAD EVIDENCE MODAL
// // ===========================================
// const UploadEvidenceModal: React.FC<{
//   isOpen: boolean;
//   onClose: () => void;
//   onSubmit: (file: File, notes: string) => void;
//   taskId: number;
// }> = ({ isOpen, onClose, onSubmit, taskId }) => {
//   const [proofFile, setProofFile] = useState<File | null>(null);
//   const [notes, setNotes] = useState('');
//   const [previewUrl, setPreviewUrl] = useState<string | null>(null);
//   const [uploading, setUploading] = useState(false);
//   const [uploadError, setUploadError] = useState<string | null>(null);

//   if (!isOpen) return null;

//   const validateFile = (file: File): boolean => {
//     if (file.size > 5 * 1024 * 1024) {
//       setUploadError('File is too large. Maximum size is 5MB');
//       return false;
//     }
//     const allowedTypes = ['image/jpeg', 'image/png', 'image/jpg', 'image/gif'];
//     if (!allowedTypes.includes(file.type)) {
//       setUploadError('Invalid file type. Allowed: JPG, PNG, GIF');
//       return false;
//     }
//     return true;
//   };

//   const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     if (e.target.files && e.target.files[0]) {
//       setUploadError(null);
//       const file = e.target.files[0];
//       if (validateFile(file)) {
//         if (previewUrl) URL.revokeObjectURL(previewUrl);
//         setProofFile(file);
//         setPreviewUrl(URL.createObjectURL(file));
//       }
//     }
//   };

//   const removeFile = () => {
//     if (previewUrl) URL.revokeObjectURL(previewUrl);
//     setProofFile(null);
//     setPreviewUrl(null);
//     setUploadError(null);
//   };

//   const handleSubmit = async () => {
//     if (!proofFile) {
//       setUploadError('Please select a photo');
//       return;
//     }
//     if (!notes.trim()) {
//       setUploadError('Please enter completion notes');
//       return;
//     }
    
//     setUploading(true);
//     try {
//       await onSubmit(proofFile, notes);
//       setProofFile(null);
//       setNotes('');
//       setPreviewUrl(null);
//       onClose();
//     } finally {
//       setUploading(false);
//     }
//   };

//   return (
//     <div className="modal-overlay" onClick={onClose}>
//       <div className="modal-content" onClick={e => e.stopPropagation()}>
//         <div className="modal-header" style={{ background: 'linear-gradient(135deg, #2D5A27 0%, #1e3f1a 100%)' }}>
//           <div className="modal-header-left">
//             <span className="modal-icon">📸</span>
//             <div>
//               <h3 className="modal-title">Upload Evidence for Task #{taskId}</h3>
//               <p className="modal-subtitle">Add photos and notes to complete the mission</p>
//             </div>
//           </div>
//           <button className="modal-close" onClick={onClose}>×</button>
//         </div>
        
//         <div className="modal-body">
//           {uploadError && (
//             <div style={{ color: '#c62828', marginBottom: '15px', padding: '10px', background: '#ffebee', borderRadius: '4px' }}>
//               {uploadError}
//             </div>
//           )}

//           <div className="form-group">
//             <label className="form-label">Proof Photo <span className="required">*</span></label>
//             {previewUrl ? (
//               <div className="single-photo-preview">
//                 <div style={{ position: 'relative', display: 'inline-block', width: '100%' }}>
//                   <img src={previewUrl} alt="Preview" style={{ width: '100%', maxHeight: '200px', objectFit: 'contain', borderRadius: '4px' }} />
//                   <button onClick={removeFile} style={{ position: 'absolute', top: '5px', right: '5px', background: '#c62828', color: 'white', border: 'none', borderRadius: '50%', width: '25px', height: '25px', cursor: 'pointer' }}>×</button>
//                 </div>
//                 <p style={{ marginTop: '5px' }}>{proofFile?.name} ({(proofFile!.size / 1024).toFixed(1)} KB)</p>
//               </div>
//             ) : (
//               <label className="reports-btn primary" style={{ cursor: 'pointer', display: 'inline-block' }}>
//                 Choose Photo
//                 <input type="file" accept="image/jpeg,image/png,image/jpg,image/gif" onChange={handleFileChange} style={{ display: 'none' }} />
//               </label>
//             )}
//           </div>

//           <div className="form-group" style={{ marginTop: '15px' }}>
//             <label className="form-label">Completion Notes <span className="required">*</span></label>
//             <textarea
//               value={notes}
//               onChange={(e) => setNotes(e.target.value)}
//               placeholder="Describe the rescue outcome, any challenges, and the animal's condition..."
//               rows={4}
//               maxLength={500}
//               style={{ width: '100%', padding: '10px', border: '2px solid #2D5A27', borderRadius: '8px' }}
//             />
//             <p style={{ fontSize: '0.75rem', color: '#666', marginTop: '5px', textAlign: 'right' }}>
//               {notes.length}/500 characters
//             </p>
//           </div>
//         </div>
        
//         <div className="modal-footer">
//           <button className="modal-btn secondary" onClick={onClose}>Cancel</button>
//           <button 
//             className="modal-btn primary" 
//             onClick={handleSubmit}
//             disabled={!proofFile || !notes.trim() || uploading}
//             style={{ background: (!proofFile || !notes.trim()) ? '#ccc' : '#2D5A27' }}
//           >
//             {uploading ? 'Uploading...' : 'Submit Evidence'}
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// };

// // ===========================================
// // TASK DETAIL MODAL (WITH LOCATION TRACKER)
// // ===========================================
// const TaskDetailModal: React.FC<{
//   task: VolunteerTask | null;
//   isOpen: boolean;
//   onClose: () => void;
//   onUploadEvidence: (taskId: number, file: File, notes: string) => void;
//   actionLoading: boolean;
//   userProfile: UserProfile | null;
//   evidence?: TaskProof[];
//   adminNotes?: AdminNote[];
// }> = ({ 
//   task, 
//   isOpen, 
//   onClose, 
//   onUploadEvidence,
//   actionLoading, 
//   userProfile, 
//   evidence = [], 
//   adminNotes = []
// }) => {
//   const [selectedImage, setSelectedImage] = useState<string | null>(null);
//   const [showUploadForm, setShowUploadForm] = useState(false);
//   const [isTrackingActive, setIsTrackingActive] = useState(false);

//   useEffect(() => {
//     if (task?.task_status_id === 2) setIsTrackingActive(true);
//     else setIsTrackingActive(false);
//   }, [task?.task_status_id]);

//   if (!isOpen || !task) return null;

//   const hasProofs = evidence.length > 0;

//   const getFullImageUrl = (proofUrl: string) => {
//     if (proofUrl.startsWith('http')) return proofUrl;
//     const cleanUrl = proofUrl.startsWith('/') ? proofUrl.substring(1) : proofUrl;
//     return `http://localhost:5000/${cleanUrl}`;
//   };

//   return (
//     <>
//       {/* Location Tracker - Only visible when task is active */}
//       {task.task_status_id === 2 && (
//         <LocationTracker taskId={task.task_id} isActive={isTrackingActive} />
//       )}

//       <div className="reports-modal-overlay" onClick={onClose}>
//         <div className="reports-modal-content large" onClick={e => e.stopPropagation()}>
//           <div className="reports-modal-header dark" style={{ background: '#1e3f1a' }}>
//             <div>
//               <h3>Rescue Report #{task.report_id}</h3>
//               <div className="reports-modal-subheader">
//                 <span className="reports-status-badge" style={{ 
//                   background: 'rgba(255,255,255,0.2)', color: 'white', padding: '0.25rem 0.75rem',
//                   borderRadius: '20px', fontSize: '0.75rem', fontWeight: '600', textTransform: 'uppercase'
//                 }}>
//                   {getTaskStatusBadge(task.task_status_id).text}
//                 </span>
//                 <span className="reports-meta" style={{ color: 'rgba(255,255,255,0.8)' }}>
//                   Reported: {formatRelativeTime(task.submitted_at)}
//                 </span>
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
//                       <div className="reports-animal-icon">{getAnimalEmoji(task.animal_type)}</div>
//                       <div className="reports-animal-details">
//                         <div className="reports-animal-type">{task.animal_type}</div>
//                         <div className="reports-animal-condition">
//                           <span className="condition-tag">{task.animal_condition}</span>
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
//                         <span className="reports-detail-value">{task.reporter_name || 'Anonymous'}</span>
//                       </div>
//                       {task.reporter_email && task.reporter_email !== 'No email' && (
//                         <div className="reports-detail-row">
//                           <span className="reports-detail-label">Email</span>
//                           <span className="reports-detail-value">✉️ {task.reporter_email}</span>
//                         </div>
//                       )}
//                       {task.reporter_phone && task.reporter_phone !== 'No phone' && (
//                         <div className="reports-detail-row">
//                           <span className="reports-detail-label">Phone</span>
//                           <span className="reports-detail-value">{task.reporter_phone}</span>
//                         </div>
//                       )}
//                     </div>
//                   </div>
//                 </div>

//                 <div className="reports-info-card">
//                   <div className="reports-card-header beige"><h4>📍 Location</h4></div>
//                   <div className="reports-card-content">
//                     <div className="reports-location-info">
//                       <p>{task.location_address}</p>
//                       <button className="reports-btn map" onClick={() => window.open(`https://maps.google.com/?q=${encodeURIComponent(task.location_address)}`, '_blank')}>
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
//                         <span className="reports-detail-value">{formatDate(task.submitted_at)}</span>
//                       </div>
//                       {task.assigned_at && (
//                         <div className="reports-detail-row">
//                           <span className="reports-detail-label">Assigned</span>
//                           <span className="reports-detail-value">{formatDate(task.assigned_at)}</span>
//                         </div>
//                       )}
//                       {task.started_at && (
//                         <div className="reports-detail-row">
//                           <span className="reports-detail-label">Started</span>
//                           <span className="reports-detail-value">{formatDate(task.started_at)}</span>
//                         </div>
//                       )}
//                     </div>
//                   </div>
//                 </div>
//               </div>

//               <div className="reports-detail-column">
//                 <div className="reports-info-card">
//                   <div className="reports-card-header beige"><h4>📝 Mission Description</h4></div>
//                   <div className="reports-card-content">
//                     <div className="reports-description"><p>{task.description}</p></div>
//                     {task.user_note && (
//                       <div className="reports-user-note">
//                         <div className="note-label">Reporter's Note:</div>
//                         <p>{task.user_note}</p>
//                       </div>
//                     )}
//                   </div>
//                 </div>

//                 <div className="reports-info-card">
//                   <div className="reports-card-header beige">
//                     <div className="reports-header-row" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
//                       <h4>📸 Evidence Photos</h4>
//                       {task.task_status_id === 2 && !hasProofs && !showUploadForm && (
//                         <button className="reports-btn primary small" onClick={() => setShowUploadForm(true)}>
//                           + Upload Evidence
//                         </button>
//                       )}
//                     </div>
//                   </div>
//                   <div className="reports-card-content">
//                     {evidence.length > 0 ? (
//                       <div>
//                         <p style={{ marginBottom: '10px', color: '#2D5A27', fontWeight: '600' }}>
//                           {evidence.length} photo(s) uploaded
//                         </p>
//                         <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '15px' }}>
//                           {evidence.map((proof) => (
//                             <div key={proof.proof_id} style={{ border: '1px solid #e8dfc9', borderRadius: '8px', padding: '8px', background: '#f9f5ec', cursor: 'pointer' }}
//                                  onClick={() => setSelectedImage(getFullImageUrl(proof.proof_url))}>
//                               <img src={getFullImageUrl(proof.proof_url)} alt={`Evidence ${proof.proof_id}`}
//                                    style={{ width: '100%', height: '120px', objectFit: 'cover', borderRadius: '4px' }}
//                                    onError={(e) => { e.currentTarget.style.display = 'none'; }} />
//                               <p style={{ fontSize: '0.7rem', textAlign: 'center', marginTop: '5px', color: '#666' }}>
//                                 Uploaded: {formatShortDate(proof.uploaded_at)}
//                               </p>
//                             </div>
//                           ))}
//                         </div>
//                       </div>
//                     ) : (
//                       <div>
//                         {showUploadForm ? (
//                           <p>Please use the Upload Evidence button to add photos.</p>
//                         ) : (
//                           <p>No evidence uploaded yet.</p>
//                         )}
//                       </div>
//                     )}
//                   </div>
//                 </div>

//                 {adminNotes.length > 0 && (
//                   <div className="reports-info-card">
//                     <div className="reports-card-header beige"><h4>📌 Admin Notes</h4></div>
//                     <div className="reports-card-content">
//                       {adminNotes.map((note) => (
//                         <div key={note.note_id} style={{ background: '#f9f5ec', padding: '12px', borderRadius: '8px', marginBottom: '10px', borderLeft: '3px solid #2D5A27' }}>
//                           <div style={{ display: 'flex', justifyContent: 'space-between' }}>
//                             <span style={{ fontWeight: 'bold', color: '#2D5A27' }}>{note.admin_name || 'Admin'}</span>
//                             <span style={{ fontSize: '0.75rem', color: '#666' }}>{formatRelativeTime(note.created_at)}</span>
//                           </div>
//                           <p style={{ margin: 0 }}>{note.note_text}</p>
//                         </div>
//                       ))}
//                     </div>
//                   </div>
//                 )}
//               </div>
//             </div>

//             {selectedImage && (
//               <div className="image-lightbox" onClick={() => setSelectedImage(null)} style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, background: 'rgba(0,0,0,0.9)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 2000 }}>
//                 <img src={selectedImage} alt="Enlarged evidence" style={{ maxWidth: '90%', maxHeight: '90%', objectFit: 'contain' }} />
//                 <button onClick={() => setSelectedImage(null)} style={{ position: 'absolute', top: '20px', right: '20px', background: 'white', border: 'none', borderRadius: '50%', width: '40px', height: '40px', fontSize: '20px', cursor: 'pointer' }}>×</button>
//               </div>
//             )}
//           </div>
          
//           <div className="reports-modal-footer">
//             <button className="reports-btn secondary" onClick={onClose}>Close</button>
//           </div>
//         </div>
//       </div>

//       {/* Upload Evidence Modal */}
//       {showUploadForm && (
//         <UploadEvidenceModal
//           isOpen={showUploadForm}
//           onClose={() => setShowUploadForm(false)}
//           onSubmit={(file, notes) => {
//             onUploadEvidence(task.task_id, file, notes);
//             setShowUploadForm(false);
//           }}
//           taskId={task.task_id}
//         />
//       )}
//     </>
//   );
// };

// // ===========================================
// // REPORT DETAIL MODAL
// // ===========================================
// const ReportDetailModal: React.FC<{
//   report: Report | null;
//   isOpen: boolean;
//   onClose: () => void;
//   userPhone?: string;
//   userEmail?: string;
//   userName?: string;
// }> = ({ report, isOpen, onClose, userPhone, userEmail, userName }) => {
//   if (!isOpen || !report) return null;

//   const reporterName = report.reporter_name || userName;
//   const phoneNumber = report.reporter_phone || userPhone;
//   const emailAddress = report.reporter_email || userEmail;
//   const isEditable = report.status_name?.toLowerCase() === 'submitted';

//   const hasPhone = (phone?: string | null): boolean => {
//     if (!phone) return false;
//     return phone.trim().length > 0;
//   };

//   const hasEmail = (email?: string | null): boolean => {
//     if (!email) return false;
//     return email.trim().length > 0 && email.includes('@');
//   };

//   const formatPhoneNumber = (phone?: string | null): string => {
//     if (!hasPhone(phone)) return 'Not provided';
//     const phoneStr = String(phone).trim();
//     const cleaned = phoneStr.replace(/\D/g, '');
//     if (cleaned.length === 10) return `+977 ${cleaned}`;
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
//                 {getStatusText(report.status_name)}
//               </span>
//               {!isEditable && <span className="non-editable-badge">Non-editable</span>}
//             </div>
//           </div>

//           <div className="modal-section">
//             <h4 className="modal-section-title"><span className="section-icon">👤</span> Your Information</h4>
//             <div className="modal-detail-grid">
//               <div className="detail-item"><span className="detail-label">Name</span><span className="detail-value">{reporterName || 'Anonymous'}</span></div>
//               <div className="detail-item"><span className="detail-label">User ID</span><span className="detail-value">#{report.user_id}</span></div>
//               {hasEmail(emailAddress) && (
//                 <div className="detail-item"><span className="detail-label">Email</span><span className="detail-value">✉️ {emailAddress}</span></div>
//               )}
//               {hasPhone(phoneNumber) && (
//                 <div className="detail-item"><span className="detail-label">Phone</span><span className="detail-value phone-emphasis">{formatPhoneNumber(phoneNumber)}</span></div>
//               )}
//             </div>
//           </div>

//           <div className="modal-section">
//             <h4 className="modal-section-title"><span className="section-icon">🐾</span> Animal Information</h4>
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
//             <h4 className="modal-section-title"><span className="section-icon">📍</span> Location Details</h4>
//             <div className="location-card">
//               <div className="location-content">
//                 <span className="location-icon-large">📍</span>
//                 <span className="location-text">{report.location_address}</span>
//               </div>
//             </div>
//           </div>

//           <div className="modal-section">
//             <h4 className="modal-section-title"><span className="section-icon">📝</span> Description</h4>
//             <div className="description-card">
//               <p className="description-text">{report.description}</p>
//             </div>
//           </div>

//           {report.volunteer_name && (
//             <div className="modal-section">
//               <h4 className="modal-section-title"><span className="section-icon">🦸</span> Assigned Volunteer</h4>
//               <div className="detail-item">
//                 <div className="detail-value-with-emoji"><span className="detail-emoji">🦸</span><span>{report.volunteer_name}</span></div>
//               </div>
//             </div>
//           )}

//           <div className="modal-section">
//             <h4 className="modal-section-title"><span className="section-icon">📅</span> Timeline</h4>
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
//           <button className="modal-btn secondary" onClick={onClose}>Close</button>
//         </div>
//       </div>
//     </div>
//   );
// };

// // ===========================================
// // LOADING SPINNER
// // ===========================================
// const LoadingSpinner: React.FC = () => (
//   <div className="loading-spinner">
//     <div className="spinner"></div>
//     <p>Loading reports...</p>
//   </div>
// );

// // ===========================================
// // ADMIN DASHBOARD
// // ===========================================
// const AdminDashboard: React.FC<{ 
//   stats: any, 
//   reports: Report[], 
//   reportsLoading: boolean
// }> = ({ stats, reports, reportsLoading }) => {
//   const [showHeatmap, setShowHeatmap] = useState(false);
//   const [heatmapData, setHeatmapData] = useState<Report[]>([]);
  
//   const totalReports = reports.length;
//   const submittedReports = reports.filter(r => r.status_name?.toLowerCase() === 'submitted').length;
//   const assignedReports = reports.filter(r => r.status_name?.toLowerCase() === 'assigned').length;
//   const inProgressReports = reports.filter(r => r.status_name?.toLowerCase() === 'in_progress').length;
//   const completedReports = reports.filter(r => r.status_name?.toLowerCase() === 'completed').length;

//   const uniqueReporters = new Set(reports.map(r => r.user_id)).size;

//   useEffect(() => {
//     if (reports && reports.length > 0) {
//       const validReports = reports.filter(r => 
//         r.location_address && r.location_address.trim() !== '' && r.location_address !== 'No location'
//       );
//       setHeatmapData(validReports);
//     }
//   }, [reports]);

//   const getMostCommonAnimal = (): string => {
//     const animalCounts = reports.reduce((acc, r) => {
//       if (r.animal_type) acc[r.animal_type] = (acc[r.animal_type] || 0) + 1;
//       return acc;
//     }, {} as Record<string, number>);
    
//     let maxCount = 0, mostCommon = 'N/A';
//     Object.entries(animalCounts).forEach(([animal, count]) => {
//       if (count > maxCount) { maxCount = count; mostCommon = animal; }
//     });
//     return mostCommon;
//   };

//   const getHotspotCount = (): number => {
//     const locationCounts = heatmapData.reduce((acc, r) => {
//       acc[r.location_address] = (acc[r.location_address] || 0) + 1;
//       return acc;
//     }, {} as Record<string, number>);
//     return Object.values(locationCounts).filter(count => count >= 3).length;
//   };

//   const chartData = [
//     { name: 'Reports', value: totalReports },
//     { name: 'Rescued', value: completedReports },
//     { name: 'Volunteers', value: 5 },
//   ];
  
//   const COLORS = ['#A67C52', '#2D5A27', '#7D8C5A'];

//   return (
//     <div className="dashboard-wrapper animate-fade-in">
//       <div className="admin-dashboard">
//         <div className="admin-header-section">
//           <h1 className="admin-header-title">ResQAll Command Center</h1>
//           <p className="admin-header-subtitle">Welcome back, Commander</p>
//         </div>
        
//         <div className="admin-stats-grid">
//           <div className="stat-card">
//             <div className="stat-icon">📋</div>
//             <div className="stat-content">
//               <div className="stat-value">{reportsLoading ? '...' : totalReports}</div>
//               <div className="stat-label">Total Reports</div>
//             </div>
//           </div>
          
//           <div className="stat-card">
//             <div className="stat-icon">⏳</div>
//             <div className="stat-content">
//               <div className="stat-value">{reportsLoading ? '...' : submittedReports + assignedReports + inProgressReports}</div>
//               <div className="stat-label">Active Cases</div>
//             </div>
//           </div>
          
//           <div className="stat-card">
//             <div className="stat-icon">✅</div>
//             <div className="stat-content">
//               <div className="stat-value">{reportsLoading ? '...' : completedReports}</div>
//               <div className="stat-label">Completed</div>
//             </div>
//           </div>
          
//           <div className="stat-card">
//             <div className="stat-icon">👥</div>
//             <div className="stat-content">
//               <div className="stat-value">{reportsLoading ? '...' : uniqueReporters}</div>
//               <div className="stat-label">Reporters</div>
//             </div>
//           </div>
//         </div>

//         <div className="heatmap-section">
//           <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
//             <h3 className="section-header" style={{ margin: 0 }}>Incident Heatmap - Most Reported Areas</h3>
//             <button onClick={() => setShowHeatmap(!showHeatmap)} className="reports-btn"
//                     style={{ background: showHeatmap ? '#f44336' : '#2D5A27', color: 'white', border: 'none', padding: '8px 20px', borderRadius: '6px', cursor: 'pointer' }}>
//               {showHeatmap ? 'Hide Map' : 'Show Heatmap'}
//             </button>
//           </div>

//           {showHeatmap && (
//             <div className="heatmap-container">
//               {heatmapData.length > 0 ? (
//                 <>
//                   <Heatmap reports={heatmapData} height="500px" />
                  
//                   <div className="heatmap-stats-grid">
//                     <div className="heatmap-stat-card"><div className="heatmap-stat-label">Total Locations</div><div className="heatmap-stat-value">{heatmapData.length}</div></div>
//                     <div className="heatmap-stat-card"><div className="heatmap-stat-label">Unique Areas</div><div className="heatmap-stat-value">{new Set(heatmapData.map(r => r.location_address)).size}</div></div>
//                     <div className="heatmap-stat-card"><div className="heatmap-stat-label">Most Common Animal</div><div className="heatmap-stat-value">{getMostCommonAnimal()}</div></div>
//                     <div className="heatmap-stat-card"><div className="heatmap-stat-label">Hotspots (3+ reports)</div><div className="heatmap-stat-value highlight">{getHotspotCount()}</div></div>
//                   </div>

//                   <div style={{ marginTop: '1.5rem' }}>
//                     <h4 style={{ marginBottom: '1rem', color: '#333' }}>Top Hotspot Areas</h4>
//                     <div className="hotspot-tags">
//                       {Object.entries(heatmapData.reduce((acc, r) => {
//                         acc[r.location_address] = (acc[r.location_address] || 0) + 1;
//                         return acc;
//                       }, {} as Record<string, number>))
//                         .sort((a, b) => b[1] - a[1])
//                         .slice(0, 8)
//                         .map(([location, count]) => (
//                           <div key={location} className={`hotspot-tag ${count >= 5 ? 'high' : count >= 3 ? 'medium' : 'low'}`}>
//                             {location.length > 25 ? location.substring(0, 25) + '...' : location} ({count})
//                           </div>
//                         ))}
//                     </div>
//                   </div>
//                 </>
//               ) : (
//                 <div style={{ height: '300px', display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#f5f5f5', borderRadius: '8px', flexDirection: 'column', gap: '1rem' }}>
//                   <span style={{ fontSize: '3rem' }}>🗺️</span>
//                   <p style={{ color: '#666' }}>No location data available for heatmap</p>
//                 </div>
//               )}
//             </div>
//           )}
//         </div>

//         <div className="admin-charts-section">
//           <div className="chart-container">
//             <h3 className="chart-title">Report Status Distribution</h3>
//             <div className="recharts-wrapper">
//               {reportsLoading ? (
//                 <div className="chart-loading"><div className="spinner"></div><p>Loading chart data...</p></div>
//               ) : (
//                 <ResponsiveContainer width="100%" height={300}>
//                   <BarChart data={chartData}>
//                     <XAxis dataKey="name" axisLine={false} tickLine={false} />
//                     <YAxis axisLine={false} tickLine={false} />
//                     <Tooltip cursor={{fill: '#F5F1E8'}} formatter={(value) => [value, 'Count']} labelFormatter={(label) => `${label}`} />
//                     <Bar dataKey="value" radius={[10, 10, 0, 0]} barSize={60}>
//                       {chartData.map((entry, index) => <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />)}
//                     </Bar>
//                   </BarChart>
//                 </ResponsiveContainer>
//               )}
//             </div>
//           </div>
          
//           <div className="volunteer-alert-box">
//             <div className="volunteer-alert-icon">⚡</div>
//             <h3 className="volunteer-alert-title">Quick Navigation</h3>
//             <p className="volunteer-alert-text">Manage your volunteer force or review all mission reports.</p>
//             <Link to="/admin/users" className="volunteer-alert-btn" style={{ marginBottom: '10px', background: '#2D5A27' }}>
//               <span style={{ marginRight: '8px' }}>👥</span> Manage Volunteers
//             </Link>
//             <Link to="/admin/rescue-reports" className="volunteer-alert-btn" style={{ background: '#1976D2' }}>
//               <span style={{ marginRight: '8px' }}>📋</span> View All Reports
//             </Link>
//           </div>
//         </div>

//         <div className="recent-reports-section">
//           <div className="section-header">
//             <h3>Recent Reports ({reports.length})</h3>
//             <Link to="/admin/rescue-reports" className="view-all-link">View All Reports →</Link>
//           </div>
//           <div className="reports-table-container">
//             {reportsLoading ? (
//               <div className="loading-message"><div className="loading-spinner-small"></div><p>Loading reports...</p></div>
//             ) : reports.length > 0 ? (
//               <table className="reports-table">
//                 <thead>
//                   <tr>
//                     <th>ID</th><th>Animal</th><th>Condition</th><th>Location</th><th>Reporter</th><th>Volunteer</th><th>Date</th><th>Status</th>
//                   </tr>
//                 </thead>
//                 <tbody>
//                   {reports.slice(0, 10).map((report) => (
//                     <tr key={report.report_id}>
//                       <td>#{report.report_id}</td>
//                       <td className="animal-type">{getAnimalEmoji(report.animal_type)} {report.animal_type || 'Unknown'}</td>
//                       <td>{report.animal_condition || 'Unknown'}</td>
//                       <td className="location-cell">{report.location_address || 'No location'}</td>
//                       <td>{report.reporter_name || 'Anonymous'}</td>
//                       <td>{report.volunteer_name ? <span className="volunteer-name">{report.volunteer_name}</span> : <span className="not-assigned">Not assigned</span>}</td>
//                       <td className="report-date">{formatShortDate(report.submitted_at)}</td>
//                       <td><span className={`status-badge status-${getStatusClass(report.status_name)}`}>{getStatusText(report.status_name)}</span></td>
//                     </tr>
//                   ))}
//                 </tbody>
//               </table>
//             ) : (
//               <div className="no-reports"><p>No reports found in the system.</p></div>
//             )}
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// // ===========================================
// // VOLUNTEER DASHBOARD (WITH FIXED DATE FORMATTING)
// // ===========================================
// const VolunteerDashboard: React.FC<{ 
//   user: any, 
//   stats: any, 
//   reports: Report[],
//   reportsLoading: boolean,
//   userProfile: UserProfile | null
// }> = ({ user, stats, reports, reportsLoading, userProfile }) => {
//   const [activeMissions, setActiveMissions] = useState<VolunteerTask[]>([]);
//   const [pendingTasks, setPendingTasks] = useState<VolunteerTask[]>([]);
//   const [missionsLoading, setMissionsLoading] = useState(true);
//   const [fetchError, setFetchError] = useState<string | null>(null);
//   const [actionLoading, setActionLoading] = useState(false);
//   const [showAllActive, setShowAllActive] = useState(false);
//   const [showAllPending, setShowAllPending] = useState(false);
//   const [selectedTask, setSelectedTask] = useState<VolunteerTask | null>(null);
//   const [isTaskModalOpen, setIsTaskModalOpen] = useState(false);
//   const [isDeclineModalOpen, setIsDeclineModalOpen] = useState(false);
//   const [selectedTaskId, setSelectedTaskId] = useState<number | null>(null);
//   const [completedTasksCount, setCompletedTasksCount] = useState(0);
//   const [taskEvidence, setTaskEvidence] = useState<{[key: number]: TaskProof[]}>({});
//   const [taskAdminNotes, setTaskAdminNotes] = useState<{[key: number]: AdminNote[]}>({});
//   const [taskDetails, setTaskDetails] = useState<{[key: number]: VolunteerTask}>({});
  
//   useEffect(() => {
//     const fetchAllTasks = async () => {
//       if (!user?.user_id) return;
      
//       try {
//         setMissionsLoading(true);
//         setFetchError(null);
//         const token = sessionStorage.getItem('token');
        
//         if (!token) {
//           setFetchError('No authentication token');
//           return;
//         }

//         const response = await fetch(`http://localhost:5000/api/volunteers/tasks`, {
//           method: 'GET',
//           headers: { 'Authorization': `Bearer ${token}`, 'Content-Type': 'application/json' }
//         });
        
//         if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
        
//         const data = await response.json();
        
//         if (data.success && data.data) {
//           const assigned = data.data.filter((t: VolunteerTask) => t.task_status_id === 1);
//           const inProgress = data.data.filter((t: VolunteerTask) => t.task_status_id === 2);
//           const completed = data.data.filter((t: VolunteerTask) => t.task_status_id === 3);
          
//           setPendingTasks(assigned);
//           setActiveMissions(inProgress);
//           setCompletedTasksCount(completed.length);
//         } else {
//           setPendingTasks([]);
//           setActiveMissions([]);
//         }
//       } catch (error) {
//         console.error('Error fetching tasks:', error);
//         setFetchError(error instanceof Error ? error.message : 'Unknown error');
//         setPendingTasks([]);
//         setActiveMissions([]);
//       } finally {
//         setMissionsLoading(false);
//       }
//     };
    
//     fetchAllTasks();
//   }, [user?.user_id]);

//   const fetchTaskEvidence = async (taskId: number) => {
//     try {
//       const token = sessionStorage.getItem('token');
//       const response = await fetch(`http://localhost:5000/api/tasks/${taskId}/evidence`, {
//         headers: { 'Authorization': `Bearer ${token}` }
//       });
//       const data = await response.json();
//       if (data.success) {
//         setTaskEvidence(prev => ({ ...prev, [taskId]: data.data }));
//       }
//     } catch (error) {
//       console.error('Error fetching evidence:', error);
//     }
//   };

//   const fetchTaskAdminNotes = async (reportId: number, taskId: number) => {
//     try {
//       const token = sessionStorage.getItem('token');
//       const response = await fetch(`http://localhost:5000/api/reports/${reportId}/admin-notes`, {
//         headers: { 'Authorization': `Bearer ${token}` }
//       });
//       const data = await response.json();
//       if (data.success) {
//         setTaskAdminNotes(prev => ({ ...prev, [taskId]: data.data }));
//       }
//     } catch (error) {
//       console.error('Error fetching admin notes:', error);
//     }
//   };

//   const fetchFullTaskDetails = async (taskId: number) => {
//     try {
//       const token = sessionStorage.getItem('token');
//       const response = await fetch(
//         `http://localhost:5000/api/tasks/task/${taskId}/full-details`,
//         {
//           headers: { 'Authorization': `Bearer ${token}` }
//         }
//       );
      
//       const data = await response.json();
//       if (data.success) {
//         setTaskDetails(prev => ({ ...prev, [taskId]: data.data.task }));
//         return data.data;
//       }
//     } catch (error) {
//       console.error('Error fetching full task details:', error);
//     }
//     return null;
//   };

//   const handleAcceptTask = async (taskId: number) => {
//     try {
//       setActionLoading(true);
//       const token = sessionStorage.getItem('token');
      
//       const response = await fetch(`http://localhost:5000/api/volunteers/tasks/${taskId}/accept`, {
//         method: 'PATCH',
//         headers: { 'Authorization': `Bearer ${token}`, 'Content-Type': 'application/json' }
//       });
      
//       const data = await response.json();
      
//       if (data.success) {
//         const acceptedTask = pendingTasks.find(t => t.task_id === taskId);
//         if (acceptedTask) {
//           const updatedTask = {
//             ...acceptedTask,
//             task_status_id: 2,
//             task_status: 'in_progress',
//             started_at: new Date().toISOString()
//           };
//           setPendingTasks(prev => prev.filter(t => t.task_id !== taskId));
//           setActiveMissions(prev => [...prev, updatedTask]);
//         }
//         toast.success('Task accepted successfully!');
//       } else {
//         toast.success('Failed to accept task: ' + data.message);
//       }
//     } catch (error) {
//       console.error('Error accepting task:', error);
//       toast.success('Failed to accept task');
//     } finally {
//       setActionLoading(false);
//     }
//   };

//   const handleDeclineTask = async (taskId: number, reason: string) => {
//     try {
//       setActionLoading(true);
//       const token = sessionStorage.getItem('token');
      
//       const response = await fetch(`http://localhost:5000/api/volunteers/tasks/${taskId}/decline`, {
//         method: 'PATCH',
//         headers: { 'Authorization': `Bearer ${token}`, 'Content-Type': 'application/json' },
//         body: JSON.stringify({ reason })
//       });
      
//       const data = await response.json();
      
//       if (data.success) {
//         setPendingTasks(prev => prev.filter(t => t.task_id !== taskId));
//         toast.success('Task declined successfully');
//       } else {
//         toast.success('Failed to decline task: ' + data.message);
//       }
//     } catch (error) {
//       console.error('Error declining task:', error);
//       toast.success('Failed to decline task');
//     } finally {
//       setActionLoading(false);
//       setIsDeclineModalOpen(false);
//       setSelectedTaskId(null);
//     }
//   };

//   const handleUploadEvidence = async (taskId: number, file: File, notes: string) => {
//     try {
//       setActionLoading(true);
//       const token = sessionStorage.getItem('token');
      
//       const formData = new FormData();
//       formData.append('proofs', file);
      
//       const uploadResponse = await fetch(`http://localhost:5000/api/tasks/${taskId}/upload-proofs`, {
//         method: 'POST',
//         headers: { 'Authorization': `Bearer ${token}` },
//         body: formData
//       });
      
//       const uploadData = await uploadResponse.json();
      
//       if (!uploadData.success) {
//         toast.success('Failed to upload proof: ' + uploadData.message);
//         return;
//       }
      
//       const noteResponse = await fetch(`http://localhost:5000/api/tasks/${taskId}/completion-notes`, {
//         method: 'POST',
//         headers: { 'Authorization': `Bearer ${token}`, 'Content-Type': 'application/json' },
//         body: JSON.stringify({ note_text: notes, volunteer_id: user.user_id })
//       });
      
//       const noteData = await noteResponse.json();
      
//       if (!noteData.success) {
//         toast.success('Failed to save completion note: ' + noteData.message);
//         return;
//       }
      
//       // Refresh evidence after upload
//       fetchTaskEvidence(taskId);
//       toast.success('Evidence uploaded successfully!');
      
//     } catch (error) {
//       console.error('Error uploading evidence:', error);
//       toast.success('Failed to upload evidence');
//     } finally {
//       setActionLoading(false);
//     }
//   };

//   const handleViewTaskDetails = async (task: VolunteerTask) => {
//     setSelectedTask(task);
    
//     try {
//       // Fetch full task details to get all data including submitted_at
//       const fullDetails = await fetchFullTaskDetails(task.task_id);
      
//       if (fullDetails) {
//         // Update the selected task with the full details from the API
//         setSelectedTask(fullDetails.task);
        
//         // Also set the evidence, admin notes, and completion notes
//         setTaskEvidence(prev => ({ ...prev, [task.task_id]: fullDetails.evidence || [] }));
//         setTaskAdminNotes(prev => ({ ...prev, [task.task_id]: fullDetails.admin_notes || [] }));
//       } else {
//         // Fallback to separate fetches if full-details fails
//         await Promise.all([
//           fetchTaskEvidence(task.task_id),
//           fetchTaskAdminNotes(task.report_id, task.task_id)
//         ]);
//       }
//     } catch (error) {
//       console.error('Error in handleViewTaskDetails:', error);
//       // Fallback to separate fetches
//       await Promise.all([
//         fetchTaskEvidence(task.task_id),
//         fetchTaskAdminNotes(task.report_id, task.task_id)
//       ]);
//     }
    
//     setIsTaskModalOpen(true);
//   };

//   const displayedActiveMissions = showAllActive ? activeMissions : activeMissions.slice(0, 3);
//   const displayedPendingTasks = showAllPending ? pendingTasks : pendingTasks.slice(0, 3);

//   // Add CSS animation for pulse
//   useEffect(() => {
//     const style = document.createElement('style');
//     style.textContent = `
//       @keyframes pulse {
//         0% { opacity: 1; transform: scale(1); }
//         50% { opacity: 0.7; transform: scale(1.1); }
//         100% { opacity: 1; transform: scale(1); }
//       }
//     `;
//     document.head.appendChild(style);
//     return () => {
//       document.head.removeChild(style);
//     };
//   }, []);

//   return (
//     <div className="dashboard-wrapper animate-fade-in">
//       <div className="volunteer-dashboard-new" style={{ maxWidth: '1200px', margin: '0 auto' }}>
        
//         {/* Header Section */}
//         <div className="reports-header" style={{ marginBottom: '2rem' }}>
//           <div className="reports-header-content">
//             <h1 className="reports-title">Welcome back, Ranger {user.username}!</h1>
//             <p className="reports-subtitle">Your dedication saves lives. Ready for your next mission?</p>
//             {userProfile?.email && (
//               <div style={{ marginTop: '0.5rem', display: 'flex', alignItems: 'center', gap: '8px' }}>
//                 <span style={{ fontSize: '1.1rem' }}>✉️</span>
//                 <span style={{ color: '#2D5A27', fontWeight: '500' }}>{userProfile.email}</span>
//               </div>
//             )}
//             {userProfile?.phone && (
//               <div style={{ marginTop: '0.5rem', display: 'flex', alignItems: 'center', gap: '8px' }}>
//                 <span style={{ fontSize: '1.1rem' }}>📱</span>
//                 <span style={{ color: '#2D5A27', fontWeight: '500' }}>Contact: {userProfile.phone}</span>
//               </div>
//             )}
//           </div>
//           <div className="reports-header-actions">
//             <Link to="/tasks" className="reports-btn refresh"><span className="btn-icon">📋</span> Mission Board</Link>
//             <Link to="/profile" className="reports-btn refresh"><span className="btn-icon">🏆</span> My Profile</Link>
//           </div>
//         </div>

//         {/* Stats Cards */}
//         <div className="reports-filters-card" style={{ marginBottom: '2rem', padding: '1.5rem' }}>
//           <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '1.5rem' }}>
//             <div style={{ background: 'linear-gradient(135deg, #2D5A27 0%, #1e3f1a 100%)', borderRadius: '12px', padding: '1.25rem', color: 'white' }}>
//               <div style={{ fontSize: '0.85rem', opacity: '0.9', marginBottom: '0.5rem' }}>TOTAL RESCUES</div>
//               <div style={{ fontSize: '2.5rem', fontWeight: '700', lineHeight: '1' }}>{completedTasksCount}</div>
//               <div style={{ fontSize: '0.8rem', opacity: '0.8', marginTop: '0.5rem' }}>Lives Saved ✓</div>
//             </div>

//             <div style={{ background: 'linear-gradient(135deg, #1976D2 0%, #0D47A1 100%)', borderRadius: '12px', padding: '1.25rem', color: 'white' }}>
//               <div style={{ fontSize: '0.85rem', opacity: '0.9', marginBottom: '0.5rem' }}>ACTIVE MISSIONS</div>
//               <div style={{ fontSize: '2.5rem', fontWeight: '700', lineHeight: '1' }}>{activeMissions.length}</div>
//               <div style={{ fontSize: '0.8rem', opacity: '0.8', marginTop: '0.5rem' }}>In Progress 🎯</div>
//             </div>

//             <div style={{ background: 'linear-gradient(135deg, #FF9F1C 0%, #E65100 100%)', borderRadius: '12px', padding: '1.25rem', color: 'white' }}>
//               <div style={{ fontSize: '0.85rem', opacity: '0.9', marginBottom: '0.5rem' }}>PENDING</div>
//               <div style={{ fontSize: '2.5rem', fontWeight: '700', lineHeight: '1' }}>{pendingTasks.length}</div>
//               <div style={{ fontSize: '0.8rem', opacity: '0.8', marginTop: '0.5rem' }}>Awaiting Decision ⏳</div>
//             </div>

//             <div style={{ background: 'linear-gradient(135deg, #7D8C5A 0%, #5A6B3E 100%)', borderRadius: '12px', padding: '1.25rem', color: 'white' }}>
//               <div style={{ fontSize: '0.85rem', opacity: '0.9', marginBottom: '0.5rem' }}>SUCCESS RATE</div>
//               <div style={{ fontSize: '2.5rem', fontWeight: '700', lineHeight: '1' }}>
//                 {completedTasksCount + activeMissions.length > 0 
//                   ? Math.round((completedTasksCount / (completedTasksCount + activeMissions.length)) * 100) 
//                   : 0}%
//               </div>
//               <div style={{ fontSize: '0.8rem', opacity: '0.8', marginTop: '0.5rem' }}>Mission Success</div>
//             </div>
//           </div>
//         </div>

//         {/* PENDING TASKS SECTION */}
//         {pendingTasks.length > 0 && (
//           <div className="reports-section" style={{ marginBottom: '2.5rem' }}>
//             <div className="reports-header">
//               <h2 className="reports-title" style={{ fontSize: '1.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
//                 <span>⏳</span> Pending Confirmation ({pendingTasks.length})
//               </h2>
//               {pendingTasks.length > 3 && (
//                 <button onClick={() => setShowAllPending(!showAllPending)} className="view-all-link">
//                   {showAllPending ? 'Show Less ↑' : `View All (${pendingTasks.length}) →`}
//                 </button>
//               )}
//             </div>
            
//             <div className="reports-grid" style={{ gridTemplateColumns: 'repeat(3, 1fr)' }}>
//               {displayedPendingTasks.map((task) => {
//                 const statusBadge = getTaskStatusBadge(task.task_status_id);
//                 const displayMission = taskDetails[task.task_id] || task;
                
//                 return (
//                   <div key={task.task_id} className="reports-card">
//                     <div className="reports-card-header" style={{ background: '#FF9F1C' }}>
//                       <div className="reports-card-title">
//                         <span className="reports-id" style={{ background: 'rgba(255,255,255,0.2)', color: 'white' }}>
//                           #{task.report_id}
//                         </span>
//                         <span className="reports-status" style={{ background: 'rgba(255,255,255,0.2)', color: 'white' }}>
//                           {statusBadge.text}
//                         </span>
//                       </div>
//                       <div className="reports-date" style={{ color: 'rgba(255,255,255,0.9)' }}>
//                         {formatShortDate(displayMission.submitted_at)}
//                       </div>
//                     </div>

//                     <div className="reports-card-body">
//                       <div className="reports-animal-section">
//                         <div className="reports-animal-icon large">{getAnimalEmoji(task.animal_type)}</div>
//                         <div className="reports-animal-info">
//                           <h4>{task.animal_type}</h4>
//                           <span className="reports-condition">{task.animal_condition}</span>
//                         </div>
//                       </div>

//                       <div className="reports-location-section">
//                         <span className="location-icon">📍</span>
//                         <span className="location-text">{task.location_address}</span>
//                       </div>

//                       <div className="reports-volunteer-section">
//                         <div className="reports-assigned-ranger" style={{ background: '#fef2e8' }}>
//                           <div className="ranger-avatar" style={{ background: '#E65100' }}>
//                             {task.reporter_name?.charAt(0).toUpperCase() || '?'}
//                           </div>
//                           <div className="ranger-info">
//                             <span className="ranger-name">{task.reporter_name || 'Anonymous'}</span>
//                             <span className="ranger-role">Reporter</span>
//                             {task.reporter_email && task.reporter_email !== 'No email' && (
//                               <span className="ranger-phone" style={{ fontSize: '0.75rem', color: '#E65100' }}>✉️ {task.reporter_email}</span>
//                             )}
//                             {task.reporter_phone && task.reporter_phone !== 'No phone' && (
//                               <span className="ranger-phone" style={{ fontSize: '0.75rem', color: '#E65100' }}>📱 {task.reporter_phone}</span>
//                             )}
//                           </div>
//                         </div>
//                       </div>
                      
//                       <p className="reports-description" style={{ fontSize: '0.85rem', marginBottom: '0.5rem', color: '#666' }}>
//                         {task.description?.length > 80 
//                           ? `${task.description.substring(0, 80)}...` 
//                           : task.description || 'No description provided'}
//                       </p>
//                     </div>

//                     <div className="reports-card-footer">
//                       <div style={{ display: 'flex', gap: '0.75rem' }}>
//                         <button onClick={() => handleAcceptTask(task.task_id!)}
//                                 disabled={actionLoading}
//                                 className="reports-btn"
//                                 style={{ flex: 2, background: '#2e7d32', color: 'white', padding: '0.6rem', fontSize: '0.85rem', fontWeight: '600', border: 'none', borderRadius: '4px', cursor: actionLoading ? 'not-allowed' : 'pointer' }}>
//                           {actionLoading ? '...' : 'Accept'}
//                         </button>
//                         <button onClick={() => { setSelectedTaskId(task.task_id!); setIsDeclineModalOpen(true); }}
//                                 disabled={actionLoading}
//                                 className="reports-btn"
//                                 style={{ flex: 1, background: 'transparent', color: '#c62828', border: '1px solid #c62828', padding: '0.6rem', fontSize: '0.85rem', fontWeight: '600', borderRadius: '4px', cursor: actionLoading ? 'not-allowed' : 'pointer' }}>
//                           Decline
//                         </button>
//                       </div>
//                     </div>
//                   </div>
//                 );
//               })}
//             </div>
//           </div>
//         )}

//         {/* ACTIVE MISSIONS SECTION */}
//         <div className="reports-section">
//           <div className="reports-header">
//             <h2 className="reports-title" style={{ fontSize: '1.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
//               <span>📻</span> Your Active Missions ({activeMissions.length})
//             </h2>
//             {activeMissions.length > 3 && (
//               <button onClick={() => setShowAllActive(!showAllActive)} className="view-all-link">
//                 {showAllActive ? 'Show Less ↑' : `View All (${activeMissions.length}) →`}
//               </button>
//             )}
//           </div>
          
//           {missionsLoading ? (
//             <div className="reports-loading-container">
//               <div className="reports-loader"><div className="reports-spinner"></div><p className="reports-loader-text">Loading your missions...</p></div>
//             </div>
//           ) : fetchError ? (
//             <div className="reports-empty-state">
//               <span className="empty-state-emoji">❌</span>
//               <h3>Error Loading Missions</h3>
//               <p>{fetchError}</p>
//               <button onClick={() => window.location.reload()} className="reports-btn primary">Retry</button>
//             </div>
//           ) : activeMissions.length > 0 ? (
//             <>
//               <div className="reports-grid" style={{ gridTemplateColumns: 'repeat(3, 1fr)' }}>
//                 {displayedActiveMissions.map((mission) => {
//                   const statusBadge = getTaskStatusBadge(mission.task_status_id);
//                   const hasEvidence = taskEvidence[mission.task_id]?.length > 0;
//                   const displayMission = taskDetails[mission.task_id] || mission;
                  
//                   return (
//                     <div key={mission.task_id} className="reports-card">
//                       <div className="reports-card-header" style={{ background: '#1e3f1a' }}>
//                         <div className="reports-card-title">
//                           <span className="reports-id" style={{ background: 'rgba(255,255,255,0.2)', color: 'white' }}>
//                             #{mission.report_id}
//                           </span>
//                           <span className="reports-status" style={{ background: 'rgba(255,255,255,0.2)', color: 'white' }}>
//                             {statusBadge.text}
//                           </span>
//                         </div>
//                         <div className="reports-date" style={{ color: 'rgba(255,255,255,0.9)' }}>
//                           {formatShortDate(displayMission.submitted_at)}
//                         </div>
//                         <div className="reports-volunteer-tag" style={{ color: 'white', fontSize: '0.8rem', fontWeight: '600', marginTop: '5px' }}>
//                           {user.username?.toUpperCase()}
//                         </div>
//                       </div>

//                       <div className="reports-card-body">
//                         <div className="reports-animal-section">
//                           <div className="reports-animal-icon large">{getAnimalEmoji(mission.animal_type)}</div>
//                           <div className="reports-animal-info">
//                             <h4 style={{ color: '#1e3f1a' }}>{mission.animal_type || 'Animal'} Rescue</h4>
//                             <span className="reports-condition" style={{ background: '#ffebee', color: '#c62828', fontWeight: 'bold' }}>
//                               {mission.animal_condition || 'CRITICAL'}
//                             </span>
//                           </div>
//                         </div>

//                         <div className="reports-location-section">
//                           <span className="location-icon">📍</span>
//                           <span className="location-text">{mission.location_address || 'Location not specified'}</span>
//                         </div>

//                         <div className="reports-volunteer-section">
//                           <div className="reports-assigned-ranger" style={{ background: '#e8f5e9' }}>
//                             <div className="ranger-avatar" style={{ background: '#2e7d32' }}>
//                               {mission.reporter_name?.charAt(0).toUpperCase() || '?'}
//                             </div>
//                             <div className="ranger-info">
//                               <span className="ranger-name">{mission.reporter_name || 'Anonymous'}</span>
//                               <span className="ranger-role">Reporter</span>
//                               {mission.reporter_email && mission.reporter_email !== 'No email' && (
//                                 <span className="ranger-phone" style={{ fontSize: '0.75rem', color: '#2e7d32' }}>✉️ {mission.reporter_email}</span>
//                               )}
//                               {mission.reporter_phone && mission.reporter_phone !== 'No phone' && (
//                                 <span className="ranger-phone" style={{ fontSize: '0.75rem', color: '#2e7d32' }}>📱 {mission.reporter_phone}</span>
//                               )}
//                             </div>
//                           </div>
//                         </div>
                        
//                         <p className="reports-description" style={{ fontSize: '0.85rem', marginBottom: '0.5rem', color: '#666' }}>
//                           {mission.description?.length > 100 
//                             ? `${mission.description.substring(0, 100)}...` 
//                             : mission.description || 'No description provided'}
//                         </p>

//                         {hasEvidence && (
//                           <div className="evidence-indicator">
//                             <span style={{ color: '#1e3f1a', fontSize: '0.8rem', fontWeight: '600' }}>
//                               📸 Evidence Uploaded
//                             </span>
//                           </div>
//                         )}

//                         <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '0.7rem', color: '#888', marginTop: '0.5rem', paddingTop: '0.5rem', borderTop: '1px solid #e8dfc9' }}>
//                           <span style={{ padding: '2px 8px', borderRadius: '12px', background: '#e3f2fd', color: '#1565c0', fontWeight: 'bold' }}>
//                             {statusBadge.text}
//                           </span>
//                           {mission.assigned_at && <span>Assigned: {formatShortDate(mission.assigned_at)}</span>}
//                         </div>
//                       </div>

//                       <div className="reports-card-footer">
//                         <button onClick={() => handleViewTaskDetails(mission)}
//                                 className="reports-btn"
//                                 style={{ width: '100%', background: '#2D5A27', color: 'white', padding: '0.6rem', fontSize: '0.85rem', fontWeight: '600', border: 'none', borderRadius: '4px', cursor: 'pointer' }}>
//                           View Details
//                         </button>
//                       </div>
//                     </div>
//                   );
//                 })}
//               </div>
//             </>
//           ) : (
//             <div className="reports-empty-state">
//               <span className="empty-state-emoji">🎯</span>
//               <h3>No Active Missions</h3>
//               <p>You don't have any active rescue missions at the moment.</p>
//               <Link to="/tasks" className="reports-btn primary">Browse Available Missions</Link>
//             </div>
//           )}
//         </div>
//       </div>

//       {/* Task Detail Modal - WITH LOCATION TRACKING INSIDE */}
//       {selectedTask && (
//         <TaskDetailModal 
//           task={selectedTask}
//           isOpen={isTaskModalOpen}
//           onClose={() => { setIsTaskModalOpen(false); setSelectedTask(null); }}
//           onUploadEvidence={handleUploadEvidence}
//           actionLoading={actionLoading}
//           userProfile={userProfile}
//           evidence={taskEvidence[selectedTask.task_id]}
//           adminNotes={taskAdminNotes[selectedTask.task_id]}
//         />
//       )}

//       {/* Decline Modal */}
//       {selectedTaskId && (
//         <DeclineModal
//           isOpen={isDeclineModalOpen}
//           onClose={() => { setIsDeclineModalOpen(false); setSelectedTaskId(null); }}
//           onSubmit={(reason) => handleDeclineTask(selectedTaskId, reason)}
//           taskId={selectedTaskId}
//         />
//       )}
//     </div>
//   );
// };

// // ===========================================
// // PENDING VOLUNTEER DASHBOARD
// // ===========================================
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

// // ===========================================
// // REJECTED VOLUNTEER DASHBOARD
// // ===========================================
// const RejectedVolunteerDashboard: React.FC<{ user: any }> = ({ user }) => {
//   return (
//     <div className="dashboard-wrapper animate-fade-in">
//       <div className="rejected-volunteer">
//         <h2 className="rejected-title">Application Status</h2>
//         <p className="rejected-text">Unfortunately, your ResQAll operative status was not approved.</p>
//       </div>
//     </div>
//   );
// };

// // ===========================================
// // USER DASHBOARD
// // ===========================================
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
//   const userEmail = userProfile?.email;

//   return (
//     <div className="dashboard-wrapper animate-fade-in">
//       <div className="user-dashboard">
//         <div className="user-welcome-section">
//           <div className="user-welcome-content">
//             <h2 className="user-welcome-title">
//               <span className="user-welcome-greeting">Welcome back,</span>
//               <span className="user-welcome-name">{user.username || 'Animal Friend'}!</span>
//             </h2>
//             {userEmail && (
//               <p className="user-contact-info"><span className="contact-icon">✉️</span><span className="contact-text">{userEmail}</span></p>
//             )}
//             {userPhone && (
//               <p className="user-contact-info"><span className="contact-icon">📱</span><span className="contact-text">Contact: {userPhone}</span></p>
//             )}
//             <p className="user-welcome-subtitle">Your reports help save animals in need.</p>
//           </div>
//           <Link to="/create-report" className="user-primary-btn"><span className="btn-icon">⚠️</span> File Field Report</Link>
//         </div>

//         <div className="user-stats-grid">
//           <div className="user-stat-card">
//             <div className="stat-card-icon total-reports">📄</div>
//             <div className="stat-card-content"><h3 className="stat-card-value">{totalReports}</h3><p className="stat-card-label">Total Reports</p></div>
//           </div>
//           <div className="user-stat-card">
//             <div className="stat-card-icon in-progress">⏳</div>
//             <div className="stat-card-content"><h3 className="stat-card-value">{inProgressReports}</h3><p className="stat-card-label">In Progress</p></div>
//           </div>
//           <div className="user-stat-card">
//             <div className="stat-card-icon completed">✓</div>
//             <div className="stat-card-content"><h3 className="stat-card-value">{completedReports}</h3><p className="stat-card-label">Completed</p></div>
//           </div>
//           <div className="user-stat-card">
//             <div className="stat-card-icon waiting">⏰</div>
//             <div className="stat-card-content"><h3 className="stat-card-value">{submittedReports}</h3><p className="stat-card-label">Submitted</p></div>
//           </div>
//         </div>

//         <div className="reports-section">
//           <div className="reports-header">
//             <h3 className="reports-title">Your Reports ({totalReports})</h3>
//             {myReports.length > 0 && <Link to="/my-reports" className="view-all-link">View All →</Link>}
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
//                           <span className={`status-grid-badge status-${statusClass}`}>{statusText}</span>
//                         </div>
                        
//                         <div className="report-grid-body">
//                           <p className="report-grid-description">
//                             {report.description?.length > 100 ? `${report.description.substring(0, 100)}...` : report.description}
//                           </p>
                          
//                           <div className="report-grid-info">
//                             <div className="report-grid-location">
//                               <span className="grid-location-icon">📍</span>
//                               <span className="grid-location-text">
//                                 {report.location_address?.length > 30 ? `${report.location_address.substring(0, 30)}...` : report.location_address}
//                               </span>
//                             </div>
                            
//                             <div className="report-grid-date">
//                               <span className="grid-date-icon">📅</span>
//                               <span className="grid-date-text">{formatShortDate(report.submitted_at)}</span>
//                             </div>
//                           </div>
//                         </div>
                        
//                         <div className="report-grid-footer">
//                           <button className="report-grid-details-link" onClick={() => onViewDetails(report)}>View Details →</button>
//                         </div>
//                       </div>
//                     );
//                   })}
//                 </div>
                
//                 {myReports.length > 3 && (
//                   <div className="view-all-container">
//                     <Link to="/my-reports" className="view-all-btn">View All Reports ({myReports.length})</Link>
//                   </div>
//                 )}
//               </>
//             ) : (
//               <div className="no-reports-message">
//                 <div className="no-reports-icon">📝</div>
//                 <h4 className="no-reports-title">No Reports Yet</h4>
//                 <p className="no-reports-text">You haven't filed any animal rescue reports yet.</p>
//                 <Link to="/create-report" className="no-reports-btn">File Your First Report</Link>
//               </div>
//             )}
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// // ===========================================
// // MAIN DASHBOARD COMPONENT
// // ===========================================
// export const Dashboard: React.FC = () => {
//   const [isLoading, setIsLoading] = useState(true);
//   const [userReports, setUserReports] = useState<Report[]>([]);
//   const [allReports, setAllReports] = useState<Report[]>([]);
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
//         const token = sessionStorage.getItem('token');
//         const response = await fetch('http://localhost:5000/api/users/profile', {
//           headers: { 'Authorization': `Bearer ${token}`, 'Content-Type': 'application/json' }
//         });

//         if (response.ok) {
//           const data = await response.json();
//           if (data.success) setUserProfile(data.data);
//         }
//       } catch (err) {
//         console.error('Error fetching user profile:', err);
//       }
//     };

//     fetchUserProfile();
//   }, [currentUser]);

//   const fetchAllReports = async () => {
//     try {
//       const token = sessionStorage.getItem('token');
//       const response = await fetch('http://localhost:5000/api/reports/admin/all', {
//         headers: { 'Authorization': `Bearer ${token}`, 'Content-Type': 'application/json' }
//       });
      
//       if (response.ok) {
//         const data = await response.json();
//         if (data.success) setAllReports(data.data || []);
//       }
//     } catch (error) {
//       console.error('Error fetching all reports:', error);
//     }
//   };

//   useEffect(() => {
//     const fetchUserReports = async () => {
//       if (!currentUser) return;
      
//       try {
//         setReportsLoading(true);
//         const token = sessionStorage.getItem('token');
        
//         const response = await fetch('http://localhost:5000/api/reports/my-reports', {
//           headers: { 'Authorization': `Bearer ${token}`, 'Content-Type': 'application/json' }
//         });
        
//         if (response.ok) {
//           const data = await response.json();
//           if (data.success) {
//             const reportsData = data.data || [];
//             const reportsWithUserInfo = reportsData.map((report: Report) => ({
//               ...report,
//               reporter_name: userProfile?.username || currentUser.username,
//               reporter_phone: userProfile?.phone || '',
//               reporter_email: userProfile?.email || ''
//             }));
//             setUserReports(reportsWithUserInfo);
//           }
//         }

//         if (getUserRole(currentUser) === 'admin') await fetchAllReports();
//       } catch (error) {
//         console.error('Error fetching reports:', error);
//       } finally {
//         setReportsLoading(false);
//       }
//     };
    
//     if (currentUser) fetchUserReports();
//   }, [currentUser, userProfile]);
  
//   useEffect(() => {
//     if (currentUser) setIsLoading(false);
//     else {
//       const timer = setTimeout(() => setIsLoading(false), 1000);
//       return () => clearTimeout(timer);
//     }
//   }, [currentUser]);
  
//   const getUserRole = (user: any): string => {
//     if (!user) return 'user';
    
//     if (user.role && typeof user.role === 'object' && user.role.role_name) return user.role.role_name.toLowerCase();
//     if (user.role_name) return user.role_name.toLowerCase();
//     if (user.role_id) {
//       if (user.role_id === 3) return 'admin';
//       if (user.role_id === 2) return 'volunteer';
//       if (user.role_id === 1) return 'user';
//     }
//     return 'user';
//   };
  
//   const getVolunteerStatus = (user: any): string | null => {
//     if (!user) return null;

//     if (user.approval_status_id !== undefined) {
//       if (user.approval_status_id === 1) return 'pending';
//       if (user.approval_status_id === 2) return 'approved';
//       if (user.approval_status_id === 3) return 'rejected';
//     }

//     if (user.volunteer) {
//       if (user.volunteer.approval_status_id !== undefined) {
//         if (user.volunteer.approval_status_id === 1) return 'pending';
//         if (user.volunteer.approval_status_id === 2) return 'approved';
//         if (user.volunteer.approval_status_id === 3) return 'rejected';
//       }
      
//       if (user.volunteer.status) {
//         const status = user.volunteer.status.toLowerCase();
//         if (status.includes('pending')) return 'pending';
//         if (status.includes('approved')) return 'approved';
//         if (status.includes('reject')) return 'rejected';
//       }
//     }

//     if (user.volunteer_status) {
//       const status = user.volunteer_status.toLowerCase();
//       if (status.includes('pending')) return 'pending';
//       if (status.includes('approved')) return 'approved';
//       if (status.includes('reject')) return 'rejected';
//     }

//     return null;
//   };

//   const handleViewDetails = (report: Report) => {
//     setSelectedReport(report);
//     setIsModalOpen(true);
//   };

//   useEffect(() => {
//     if (!isLoading && !currentUser) navigate('/login');
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
//           <Link to="/login" className="login-link">Go to Login</Link>
//         </div>
//       </div>
//     );
//   }

//   const userRole = getUserRole(currentUser);
//   const volunteerStatus = getVolunteerStatus(currentUser);

//   const getStats = () => {
//     const totalReports = userReports.length;
//     const completedRescues = userReports.filter(r => r.status_name?.toLowerCase() === 'completed').length;
//     const activeVolunteers = 1;
//     const pendingApprovals = 0;
    
//     const userId = currentUser.user_id?.toString() || '';
    
//     const myReports = userReports.filter(r => {
//       const reportUserId = Number(r.user_id);
//       const currentUserId = Number(userId);
//       return reportUserId === currentUserId;
//     });
    
//     const myCompletedTasks = userReports.filter(r => r.status_name?.toLowerCase() === 'completed').length;

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
//       return <AdminDashboard stats={stats} reports={allReports} reportsLoading={reportsLoading} />;
//     }
    
//     if (userRole === 'volunteer') {
//       if (volunteerStatus === 'rejected') {
//         return <RejectedVolunteerDashboard user={currentUser} />;
//       }
      
//       if (volunteerStatus === 'pending' || volunteerStatus === 'none' || !volunteerStatus) {
//         return <PendingVolunteerDashboard user={currentUser} />;
//       }
      
//       if (volunteerStatus === 'approved') {
//         return <VolunteerDashboard 
//           user={{...currentUser, role: userRole}} 
//           stats={stats} 
//           reports={userReports}
//           reportsLoading={reportsLoading}
//           userProfile={userProfile}
//         />;
//       }
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
//         userEmail={userProfile?.email}
//         userName={userProfile?.username}
//       />
//     </div>
//   );
// };

// export default Dashboard;

import React, { useState, useEffect, useCallback, useRef } from 'react';
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
import { Heatmap } from '../../components/Dashboard/HeatMap';
import './Dashboard.css';

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
  
  // Reporter fields - CRITICAL: These must match API response
  reporter_name?: string | null;
  reporter_phone?: string | null;
  reporter_email?: string | null;
  
  // Volunteer fields
  volunteer_name?: string | null;
  volunteer_id?: number;
  volunteer_phone?: string | null;
  volunteer_email?: string | null;
  
  // Task fields
  task_id?: number;
  task_status_id?: number;
  task_status?: string;
  assigned_at?: string;
  started_at?: string;
  completed_at?: string;
  volunteer_responded_at?: string;
  volunteer_response?: string;
  declined_reason?: string;
  admin_note?: string;
}

interface AdminNote {
  note_id: number;
  report_id: number;
  admin_id: number;
  note_text: string;
  created_at: string;
  admin_name?: string;
}

interface TaskProof {
  proof_id: number;
  task_id: number;
  proof_url: string;
  uploaded_at: string;
}

interface TaskCompletionNote {
  note_id: number;
  task_id: number;
  volunteer_id: number;
  volunteer_name?: string;
  note_text: string;
  created_at: string;
}

interface VolunteerTask {
  task_id: number;
  report_id: number;
  assigned_to_user_id: number;
  assigned_by_user_id: number;
  task_status_id: number;
  task_status: string;
  assigned_at: string;
  volunteer_responded_at?: string;
  volunteer_response?: string;
  declined_reason?: string;
  started_at?: string;
  completed_at?: string;
  is_deleted?: number;
  
  // Report fields
  user_id: number;
  description: string;
  location_address: string;
  user_note: string;
  submitted_at: string;
  animal_type: string;
  animal_condition: string;
  report_status_id: number;
  report_status: string;
  
  // Reporter fields
  reporter_name: string | null;
  reporter_phone: string | null;
  reporter_email: string | null;
  
  // Volunteer fields
  volunteer_name: string;
  volunteer_email: string | null;
  volunteer_phone: string | null;
}

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

interface FullTaskDetails {
  task: VolunteerTask;
  evidence: TaskProof[];
  admin_notes: AdminNote[];
  completion_notes: TaskCompletionNote[];
}

// ===========================================
// HELPER FUNCTIONS - CRITICAL FOR DISPLAY
// ===========================================
const hasPhone = (phone?: string | null): boolean => {
  if (phone === null || phone === undefined) return false;
  if (typeof phone !== 'string') return false;
  return phone.trim().length > 0;
};

const hasEmail = (email?: string | null): boolean => {
  if (email === null || email === undefined) return false;
  if (typeof email !== 'string') return false;
  const trimmed = email.trim();
  return trimmed.length > 0 && trimmed.includes('@') && trimmed.includes('.');
};

const formatPhoneNumber = (phone?: string | null): string => {
  if (!hasPhone(phone)) return 'Not provided';
  const phoneStr = String(phone).trim();
  const cleaned = phoneStr.replace(/\D/g, '');
  if (cleaned.length === 10) return `+977 ${cleaned}`;
  return phoneStr;
};

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

const formatShortDate = (dateString: string): string => {
  if (!dateString) return 'Not available';
  try {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    });
  } catch {
    return 'Not available';
  }
};

const formatRelativeTime = (dateString: string): string => {
  if (!dateString) return 'Not available';
  try {
    const date = new Date(dateString);
    const now = new Date();
    const diffMs = now.getTime() - date.getTime();
    const diffMins = Math.floor(diffMs / 60000);
    const diffHours = Math.floor(diffMins / 60);
    const diffDays = Math.floor(diffHours / 24);

    if (diffMins < 1) return 'Just now';
    if (diffMins < 60) return `${diffMins} minute${diffMins === 1 ? '' : 's'} ago`;
    if (diffHours < 24) return `${diffHours} hour${diffHours === 1 ? '' : 's'} ago`;
    if (diffDays === 1) return 'Yesterday';
    if (diffDays < 7) return `${diffDays} days ago`;
    return formatShortDate(dateString);
  } catch {
    return 'Not available';
  }
};

const getStatusText = (statusName: string): string => {
  if (!statusName) return 'Unknown';
  return statusName
    .replace(/_/g, ' ')
    .split(' ')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
};

const getTaskStatusBadge = (statusId: number | undefined): { text: string; class: string } => {
  switch(statusId) {
    case 1: return { text: 'ASSIGNED', class: 'assigned' };
    case 2: return { text: 'IN PROGRESS', class: 'progress' };
    case 3: return { text: 'COMPLETED', class: 'completed' };
    case 4: return { text: 'DECLINED', class: 'declined' };
    default: return { text: 'UNKNOWN', class: 'unknown' };
  }
};

// ===========================================
// LOCATION TRACKER COMPONENT
// ===========================================
const calculateDistance = (lat1: number, lng1: number, lat2: number, lng2: number): number => {
  const R = 6371;
  const dLat = (lat2 - lat1) * Math.PI / 180;
  const dLng = (lng2 - lng1) * Math.PI / 180;
  const a = 
    Math.sin(dLat/2) * Math.sin(dLat/2) +
    Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) * 
    Math.sin(dLng/2) * Math.sin(dLng/2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
  return R * c;
};

const LocationTracker: React.FC<{
  taskId: number;
  isActive: boolean;
}> = ({ taskId, isActive }) => {
  const [watchId, setWatchId] = useState<number | null>(null);
  const [lastLocation, setLastLocation] = useState<GeolocationPosition | null>(null);
  const [isTracking, setIsTracking] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [pendingPoints, setPendingPoints] = useState<number>(0);
  
  const pendingQueue = useRef<any[]>([]);
  
  const saveLocation = useCallback(async (latitude: number, longitude: number, accuracy: number) => {
    try {
      const token = sessionStorage.getItem('token');
      if (!token) return;
      
      const response = await fetch('http://localhost:5000/api/volunteer/tracking/point', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ taskId, latitude, longitude, accuracy })
      });
      
      const data = await response.json();
      if (!data.success) {
        pendingQueue.current.push({ latitude, longitude, accuracy, timestamp: new Date() });
        setPendingPoints(pendingQueue.current.length);
      }
    } catch (error) {
      pendingQueue.current.push({ latitude, longitude, accuracy, timestamp: new Date() });
      setPendingPoints(pendingQueue.current.length);
    }
  }, [taskId]);
  
  const retryPendingPoints = useCallback(async () => {
    if (pendingQueue.current.length === 0) return;
    
    const token = sessionStorage.getItem('token');
    if (!token) return;
    
    const points = [...pendingQueue.current];
    pendingQueue.current = [];
    setPendingPoints(0);
    
    for (const point of points) {
      try {
        await fetch('http://localhost:5000/api/volunteer/tracking/point', {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            taskId,
            latitude: point.latitude,
            longitude: point.longitude,
            accuracy: point.accuracy
          })
        });
      } catch (error) {
        pendingQueue.current.push(point);
        setPendingPoints(pendingQueue.current.length);
      }
    }
  }, [taskId]);
  
  const startTracking = useCallback(() => {
    if (!navigator.geolocation) {
      setError('Geolocation is not supported');
      return;
    }
    
    setError(null);
    
    navigator.geolocation.getCurrentPosition(
      (position) => {
        setLastLocation(position);
        saveLocation(
          position.coords.latitude,
          position.coords.longitude,
          position.coords.accuracy || 0
        );
      },
      () => {},
      { enableHighAccuracy: false, timeout: 10000, maximumAge: 60000 }
    );
    
    const id = navigator.geolocation.watchPosition(
      (position) => {
        let shouldSave = true;
        
        if (lastLocation) {
          const distance = calculateDistance(
            lastLocation.coords.latitude,
            lastLocation.coords.longitude,
            position.coords.latitude,
            position.coords.longitude
          );
          const timeDiff = (position.timestamp - lastLocation.timestamp) / 1000;
          shouldSave = distance > 0.05 || timeDiff > 30;
        }
        
        if (shouldSave) {
          saveLocation(
            position.coords.latitude,
            position.coords.longitude,
            position.coords.accuracy || 0
          );
        }
        
        setLastLocation(position);
      },
      (error) => {
        let errorMsg = 'Location error';
        switch(error.code) {
          case error.PERMISSION_DENIED: errorMsg = 'Permission denied'; break;
          case error.POSITION_UNAVAILABLE: errorMsg = 'Location unavailable'; break;
          case error.TIMEOUT: errorMsg = 'Location timeout'; break;
        }
        setError(errorMsg);
      },
      { enableHighAccuracy: true, timeout: 30000, maximumAge: 0 }
    );
    
    setWatchId(id);
    setIsTracking(true);
  }, [lastLocation, saveLocation]);
  
  const stopTracking = useCallback(() => {
    if (watchId !== null) {
      navigator.geolocation.clearWatch(watchId);
      setWatchId(null);
      setIsTracking(false);
    }
  }, [watchId]);
  
  useEffect(() => {
    if (isActive) {
      const timer = setTimeout(() => startTracking(), 1000);
      return () => { clearTimeout(timer); stopTracking(); };
    } else {
      stopTracking();
    }
  }, [isActive, startTracking, stopTracking]);
  
  useEffect(() => {
    const handleOnline = () => retryPendingPoints();
    window.addEventListener('online', handleOnline);
    return () => window.removeEventListener('online', handleOnline);
  }, [retryPendingPoints]);
  
  useEffect(() => {
    const interval = setInterval(() => {
      if (navigator.onLine && pendingQueue.current.length > 0) retryPendingPoints();
    }, 30000);
    return () => clearInterval(interval);
  }, [retryPendingPoints]);
  
  if (!isActive) return null;
  
  return (
    <div style={{
      position: 'fixed', bottom: '20px', right: '20px',
      background: error ? '#ffebee' : '#e8f5e9',
      padding: '8px 12px', borderRadius: '20px', fontSize: '0.8rem',
      boxShadow: '0 2px 5px rgba(0,0,0,0.2)', zIndex: 9999,
      display: 'flex', alignItems: 'center', gap: '6px'
    }}>
      <span style={{
        width: '8px', height: '8px', borderRadius: '50%',
        background: error ? '#f44336' : (isTracking ? '#4caf50' : '#ff9800'),
        animation: isTracking && !error ? 'pulse 2s infinite' : 'none'
      }}></span>
      <span>
        {error ? 'Location Error' : (isTracking ? 'Sharing Location' : 'Starting...')}
      </span>
      {pendingPoints > 0 && (
        <span style={{ background: '#fff3e0', padding: '2px 6px', borderRadius: '12px', fontSize: '0.7rem' }}>
          {pendingPoints} pending
        </span>
      )}
    </div>
  );
};

// ===========================================
// DECLINE MODAL
// ===========================================
const DeclineModal: React.FC<{
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (reason: string) => void;
  taskId: number;
}> = ({ isOpen, onClose, onSubmit, taskId }) => {
  const [reason, setReason] = useState('');
  const [otherReason, setOtherReason] = useState('');
  const [submitting, setSubmitting] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = async () => {
    const finalReason = reason === 'other' ? otherReason : reason;
    if (finalReason) {
      setSubmitting(true);
      try {
        await onSubmit(finalReason);
      } finally {
        setSubmitting(false);
        setReason('');
        setOtherReason('');
        onClose();
      }
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
            <label className="form-label">Reason <span className="required">*</span></label>
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
              <label className="form-label">Please specify <span className="required">*</span></label>
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
          <button className="modal-btn secondary" onClick={onClose}>Cancel</button>
          <button 
            className="modal-btn danger" 
            onClick={handleSubmit}
            disabled={!reason || (reason === 'other' && !otherReason) || submitting}
          >
            {submitting ? 'Processing...' : 'Decline Task'}
          </button>
        </div>
      </div>
    </div>
  );
};

// ===========================================
// UPLOAD EVIDENCE MODAL
// ===========================================
const UploadEvidenceModal: React.FC<{
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (file: File, notes: string) => void;
  taskId: number;
}> = ({ isOpen, onClose, onSubmit, taskId }) => {
  const [proofFile, setProofFile] = useState<File | null>(null);
  const [notes, setNotes] = useState('');
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [uploading, setUploading] = useState(false);
  const [uploadError, setUploadError] = useState<string | null>(null);

  if (!isOpen) return null;

  const validateFile = (file: File): boolean => {
    if (file.size > 5 * 1024 * 1024) {
      setUploadError('File is too large. Maximum size is 5MB');
      return false;
    }
    const allowedTypes = ['image/jpeg', 'image/png', 'image/jpg', 'image/gif'];
    if (!allowedTypes.includes(file.type)) {
      setUploadError('Invalid file type. Allowed: JPG, PNG, GIF');
      return false;
    }
    return true;
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setUploadError(null);
      const file = e.target.files[0];
      if (validateFile(file)) {
        if (previewUrl) URL.revokeObjectURL(previewUrl);
        setProofFile(file);
        setPreviewUrl(URL.createObjectURL(file));
      }
    }
  };

  const removeFile = () => {
    if (previewUrl) URL.revokeObjectURL(previewUrl);
    setProofFile(null);
    setPreviewUrl(null);
    setUploadError(null);
  };

  const handleSubmit = async () => {
    if (!proofFile) {
      setUploadError('Please select a photo');
      return;
    }
    if (!notes.trim()) {
      setUploadError('Please enter completion notes');
      return;
    }
    
    setUploading(true);
    try {
      await onSubmit(proofFile, notes);
      setProofFile(null);
      setNotes('');
      setPreviewUrl(null);
      onClose();
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={e => e.stopPropagation()}>
        <div className="modal-header" style={{ background: 'linear-gradient(135deg, #2D5A27 0%, #1e3f1a 100%)' }}>
          <div className="modal-header-left">
            <span className="modal-icon">📸</span>
            <div>
              <h3 className="modal-title">Upload Evidence for Task #{taskId}</h3>
              <p className="modal-subtitle">Add photos and notes to complete the mission</p>
            </div>
          </div>
          <button className="modal-close" onClick={onClose}>×</button>
        </div>
        
        <div className="modal-body">
          {uploadError && (
            <div style={{ color: '#c62828', marginBottom: '15px', padding: '10px', background: '#ffebee', borderRadius: '4px' }}>
              {uploadError}
            </div>
          )}

          <div className="form-group">
            <label className="form-label">Proof Photo <span className="required">*</span></label>
            {previewUrl ? (
              <div className="single-photo-preview">
                <div style={{ position: 'relative', display: 'inline-block', width: '100%' }}>
                  <img src={previewUrl} alt="Preview" style={{ width: '100%', maxHeight: '200px', objectFit: 'contain', borderRadius: '4px' }} />
                  <button onClick={removeFile} style={{ position: 'absolute', top: '5px', right: '5px', background: '#c62828', color: 'white', border: 'none', borderRadius: '50%', width: '25px', height: '25px', cursor: 'pointer' }}>×</button>
                </div>
                <p style={{ marginTop: '5px' }}>{proofFile?.name} ({(proofFile!.size / 1024).toFixed(1)} KB)</p>
              </div>
            ) : (
              <label className="reports-btn primary" style={{ cursor: 'pointer', display: 'inline-block' }}>
                Choose Photo
                <input type="file" accept="image/jpeg,image/png,image/jpg,image/gif" onChange={handleFileChange} style={{ display: 'none' }} />
              </label>
            )}
          </div>

          <div className="form-group" style={{ marginTop: '15px' }}>
            <label className="form-label">Completion Notes <span className="required">*</span></label>
            <textarea
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder="Describe the rescue outcome, any challenges, and the animal's condition..."
              rows={4}
              maxLength={500}
              style={{ width: '100%', padding: '10px', border: '2px solid #2D5A27', borderRadius: '8px' }}
            />
            <p style={{ fontSize: '0.75rem', color: '#666', marginTop: '5px', textAlign: 'right' }}>
              {notes.length}/500 characters
            </p>
          </div>
        </div>
        
        <div className="modal-footer">
          <button className="modal-btn secondary" onClick={onClose}>Cancel</button>
          <button 
            className="modal-btn primary" 
            onClick={handleSubmit}
            disabled={!proofFile || !notes.trim() || uploading}
            style={{ background: (!proofFile || !notes.trim()) ? '#ccc' : '#2D5A27' }}
          >
            {uploading ? 'Uploading...' : 'Submit Evidence'}
          </button>
        </div>
      </div>
    </div>
  );
};

// ===========================================
// TASK DETAIL MODAL (WITH LOCATION TRACKER)
// ===========================================
const TaskDetailModal: React.FC<{
  task: VolunteerTask | null;
  isOpen: boolean;
  onClose: () => void;
  onUploadEvidence: (taskId: number, file: File, notes: string) => void;
  actionLoading: boolean;
  userProfile: UserProfile | null;
  evidence?: TaskProof[];
  adminNotes?: AdminNote[];
}> = ({ 
  task, 
  isOpen, 
  onClose, 
  onUploadEvidence,
  actionLoading, 
  userProfile, 
  evidence = [], 
  adminNotes = []
}) => {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [showUploadForm, setShowUploadForm] = useState(false);
  const [isTrackingActive, setIsTrackingActive] = useState(false);

  useEffect(() => {
    if (task?.task_status_id === 2) setIsTrackingActive(true);
    else setIsTrackingActive(false);
  }, [task?.task_status_id]);

  if (!isOpen || !task) return null;

  const hasProofs = evidence.length > 0;

  const getFullImageUrl = (proofUrl: string) => {
    if (proofUrl.startsWith('http')) return proofUrl;
    const cleanUrl = proofUrl.startsWith('/') ? proofUrl.substring(1) : proofUrl;
    return `http://localhost:5000/${cleanUrl}`;
  };

  return (
    <>
      {/* Location Tracker - Only visible when task is active */}
      {task.task_status_id === 2 && (
        <LocationTracker taskId={task.task_id} isActive={isTrackingActive} />
      )}

      <div className="reports-modal-overlay" onClick={onClose}>
        <div className="reports-modal-content large" onClick={e => e.stopPropagation()}>
          <div className="reports-modal-header dark" style={{ background: '#1e3f1a' }}>
            <div>
              <h3>Rescue Report #{task.report_id}</h3>
              <div className="reports-modal-subheader">
                <span className="reports-status-badge" style={{ 
                  background: 'rgba(255,255,255,0.2)', color: 'white', padding: '0.25rem 0.75rem',
                  borderRadius: '20px', fontSize: '0.75rem', fontWeight: '600', textTransform: 'uppercase'
                }}>
                  {getTaskStatusBadge(task.task_status_id).text}
                </span>
                <span className="reports-meta" style={{ color: 'rgba(255,255,255,0.8)' }}>
                  Reported: {formatRelativeTime(task.submitted_at)}
                </span>
              </div>
            </div>
            <button className="reports-modal-close" onClick={onClose}>×</button>
          </div>
          
          <div className="reports-modal-body">
            <div className="reports-detail-grid">
              <div className="reports-detail-column">
                <div className="reports-info-card">
                  <div className="reports-card-header beige"><h4>🐾 Animal Information</h4></div>
                  <div className="reports-card-content">
                    <div className="reports-animal-display">
                      <div className="reports-animal-icon">{getAnimalEmoji(task.animal_type)}</div>
                      <div className="reports-animal-details">
                        <div className="reports-animal-type">{task.animal_type}</div>
                        <div className="reports-animal-condition">
                          <span className="condition-tag">{task.animal_condition}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="reports-info-card">
                  <div className="reports-card-header beige"><h4>👤 Reporter Details</h4></div>
                  <div className="reports-card-content">
                    <div className="reports-detail-list">
                      <div className="reports-detail-row">
                        <span className="reports-detail-label">Name</span>
                        <span className="reports-detail-value">{task.reporter_name || 'Anonymous'}</span>
                      </div>
                      {hasEmail(task.reporter_email) && (
                        <div className="reports-detail-row">
                          <span className="reports-detail-label">Email</span>
                          <span className="reports-detail-value">✉️ {task.reporter_email}</span>
                        </div>
                      )}
                      {hasPhone(task.reporter_phone) && (
                        <div className="reports-detail-row">
                          <span className="reports-detail-label">Phone</span>
                          <span className="reports-detail-value">{formatPhoneNumber(task.reporter_phone)}</span>
                        </div>
                      )}
                    </div>
                  </div>
                </div>

                <div className="reports-info-card">
                  <div className="reports-card-header beige"><h4>📍 Location</h4></div>
                  <div className="reports-card-content">
                    <div className="reports-location-info">
                      <p>{task.location_address}</p>
                      <button className="reports-btn map" onClick={() => window.open(`https://maps.google.com/?q=${encodeURIComponent(task.location_address)}`, '_blank')}>
                        View on Map
                      </button>
                    </div>
                  </div>
                </div>

                <div className="reports-info-card">
                  <div className="reports-card-header beige"><h4>⏱️ Timeline</h4></div>
                  <div className="reports-card-content">
                    <div className="reports-detail-list">
                      <div className="reports-detail-row">
                        <span className="reports-detail-label">Reported</span>
                        <span className="reports-detail-value">{formatDate(task.submitted_at)}</span>
                      </div>
                      {task.assigned_at && (
                        <div className="reports-detail-row">
                          <span className="reports-detail-label">Assigned</span>
                          <span className="reports-detail-value">{formatDate(task.assigned_at)}</span>
                        </div>
                      )}
                      {task.started_at && (
                        <div className="reports-detail-row">
                          <span className="reports-detail-label">Started</span>
                          <span className="reports-detail-value">{formatDate(task.started_at)}</span>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>

              <div className="reports-detail-column">
                <div className="reports-info-card">
                  <div className="reports-card-header beige"><h4>📝 Mission Description</h4></div>
                  <div className="reports-card-content">
                    <div className="reports-description"><p>{task.description}</p></div>
                    {task.user_note && (
                      <div className="reports-user-note">
                        <div className="note-label">Reporter's Note:</div>
                        <p>{task.user_note}</p>
                      </div>
                    )}
                  </div>
                </div>

                <div className="reports-info-card">
                  <div className="reports-card-header beige">
                    <div className="reports-header-row" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <h4>📸 Evidence Photos</h4>
                      {task.task_status_id === 2 && !hasProofs && !showUploadForm && (
                        <button className="reports-btn primary small" onClick={() => setShowUploadForm(true)}>
                          + Upload Evidence
                        </button>
                      )}
                    </div>
                  </div>
                  <div className="reports-card-content">
                    {evidence.length > 0 ? (
                      <div>
                        <p style={{ marginBottom: '10px', color: '#2D5A27', fontWeight: '600' }}>
                          {evidence.length} photo(s) uploaded
                        </p>
                        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '15px' }}>
                          {evidence.map((proof) => (
                            <div key={proof.proof_id} style={{ border: '1px solid #e8dfc9', borderRadius: '8px', padding: '8px', background: '#f9f5ec', cursor: 'pointer' }}
                                 onClick={() => setSelectedImage(getFullImageUrl(proof.proof_url))}>
                              <img src={getFullImageUrl(proof.proof_url)} alt={`Evidence ${proof.proof_id}`}
                                   style={{ width: '100%', height: '120px', objectFit: 'cover', borderRadius: '4px' }}
                                   onError={(e) => { e.currentTarget.style.display = 'none'; }} />
                              <p style={{ fontSize: '0.7rem', textAlign: 'center', marginTop: '5px', color: '#666' }}>
                                Uploaded: {formatShortDate(proof.uploaded_at)}
                              </p>
                            </div>
                          ))}
                        </div>
                      </div>
                    ) : (
                      <div>
                        {showUploadForm ? (
                          <p>Please use the Upload Evidence button to add photos.</p>
                        ) : (
                          <p>No evidence uploaded yet.</p>
                        )}
                      </div>
                    )}
                  </div>
                </div>

                {adminNotes.length > 0 && (
                  <div className="reports-info-card">
                    <div className="reports-card-header beige"><h4>📌 Admin Notes</h4></div>
                    <div className="reports-card-content">
                      {adminNotes.map((note) => (
                        <div key={note.note_id} style={{ background: '#f9f5ec', padding: '12px', borderRadius: '8px', marginBottom: '10px', borderLeft: '3px solid #2D5A27' }}>
                          <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                            <span style={{ fontWeight: 'bold', color: '#2D5A27' }}>{note.admin_name || 'Admin'}</span>
                            <span style={{ fontSize: '0.75rem', color: '#666' }}>{formatRelativeTime(note.created_at)}</span>
                          </div>
                          <p style={{ margin: 0 }}>{note.note_text}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>

            {selectedImage && (
              <div className="image-lightbox" onClick={() => setSelectedImage(null)} style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, background: 'rgba(0,0,0,0.9)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 2000 }}>
                <img src={selectedImage} alt="Enlarged evidence" style={{ maxWidth: '90%', maxHeight: '90%', objectFit: 'contain' }} />
                <button onClick={() => setSelectedImage(null)} style={{ position: 'absolute', top: '20px', right: '20px', background: 'white', border: 'none', borderRadius: '50%', width: '40px', height: '40px', fontSize: '20px', cursor: 'pointer' }}>×</button>
              </div>
            )}
          </div>
          
          <div className="reports-modal-footer">
            <button className="reports-btn secondary" onClick={onClose}>Close</button>
          </div>
        </div>
      </div>

      {/* Upload Evidence Modal */}
      {showUploadForm && (
        <UploadEvidenceModal
          isOpen={showUploadForm}
          onClose={() => setShowUploadForm(false)}
          onSubmit={(file, notes) => {
            onUploadEvidence(task.task_id, file, notes);
            setShowUploadForm(false);
          }}
          taskId={task.task_id}
        />
      )}
    </>
  );
};

// ===========================================
// ENHANCED REPORT DETAIL MODAL (FROM MYREPORTS)
// ===========================================
const ReportDetailModal: React.FC<{
  report: Report | null;
  isOpen: boolean;
  onClose: () => void;
  userPhone?: string;
  userEmail?: string;
  userName?: string;
  evidence?: TaskProof[];
  notes?: TaskCompletionNote[];
  loading?: boolean;
}> = ({ report, isOpen, onClose, userPhone, userEmail, userName, evidence = [], notes = [], loading = false }) => {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<'details' | 'evidence' | 'notes'>('details');
  const [imageErrors, setImageErrors] = useState<Record<number, boolean>>({});

  if (!isOpen || !report) return null;

  // Use report fields directly - these should come from the API
  const reporterName = report.reporter_name || userName || 'Anonymous';
  const phoneNumber = report.reporter_phone || userPhone;
  const emailAddress = report.reporter_email || userEmail;
  const volunteerName = report.volunteer_name;
  
  const isCompleted = report.status_id === 4;
  const hasEvidence = evidence.length > 0;
  const hasNotes = notes.length > 0;

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

  const handleImageError = (proofId: number) => {
    setImageErrors(prev => ({ ...prev, [proofId]: true }));
  };

  // Debug log to see what data is coming in
  console.log('ReportDetailModal received:', {
    reportId: report.report_id,
    reporterName,
    phoneNumber,
    emailAddress,
    volunteerName,
    evidence: evidence.length,
    notes: notes.length
  });

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
                📝 Notes {hasNotes && `(${notes.length})`}
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
                    <span className="detail-row-value">{reporterName}</span>
                  </div>
                  {hasEmail(emailAddress) && (
                    <div className="detail-row">
                      <span className="detail-row-label">📧 Email:</span>
                      <span className="detail-row-value">{emailAddress}</span>
                    </div>
                  )}
                  {hasPhone(phoneNumber) && (
                    <div className="detail-row">
                      <span className="detail-row-label">📱 Phone:</span>
                      <span className="detail-row-value phone">{formatPhoneNumber(phoneNumber)}</span>
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
                    <span className="detail-row-value">
                      <span className="condition-icon-small">{getConditionIcon(report.animal_condition)}</span> {report.animal_condition}
                    </span>
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
              {volunteerName && (
                <div className="volunteer-horizontal">
                  <span className="volunteer-horizontal-label">🦸 Assigned Ranger:</span>
                  <span className="volunteer-horizontal-value">{volunteerName}</span>
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
                  {notes.map((note) => (
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

// ===========================================
// LOADING SPINNER
// ===========================================
const LoadingSpinner: React.FC = () => (
  <div className="loading-spinner">
    <div className="spinner"></div>
    <p>Loading reports...</p>
  </div>
);

// ===========================================
// ADMIN DASHBOARD
// ===========================================
const AdminDashboard: React.FC<{ 
  stats: any, 
  reports: Report[], 
  reportsLoading: boolean
}> = ({ stats, reports, reportsLoading }) => {
  const [showHeatmap, setShowHeatmap] = useState(false);
  const [heatmapData, setHeatmapData] = useState<Report[]>([]);
  
  const totalReports = reports.length;
  const submittedReports = reports.filter(r => r.status_name?.toLowerCase() === 'submitted').length;
  const assignedReports = reports.filter(r => r.status_name?.toLowerCase() === 'assigned').length;
  const inProgressReports = reports.filter(r => r.status_name?.toLowerCase() === 'in_progress').length;
  const completedReports = reports.filter(r => r.status_name?.toLowerCase() === 'completed').length;

  const uniqueReporters = new Set(reports.map(r => r.user_id)).size;

  useEffect(() => {
    if (reports && reports.length > 0) {
      const validReports = reports.filter(r => 
        r.location_address && r.location_address.trim() !== '' && r.location_address !== 'No location'
      );
      setHeatmapData(validReports);
    }
  }, [reports]);

  const getMostCommonAnimal = (): string => {
    const animalCounts = reports.reduce((acc, r) => {
      if (r.animal_type) acc[r.animal_type] = (acc[r.animal_type] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);
    
    let maxCount = 0, mostCommon = 'N/A';
    Object.entries(animalCounts).forEach(([animal, count]) => {
      if (count > maxCount) { maxCount = count; mostCommon = animal; }
    });
    return mostCommon;
  };

  const getHotspotCount = (): number => {
    const locationCounts = heatmapData.reduce((acc, r) => {
      acc[r.location_address] = (acc[r.location_address] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);
    return Object.values(locationCounts).filter(count => count >= 3).length;
  };

  const chartData = [
    { name: 'Reports', value: totalReports },
    { name: 'Rescued', value: completedReports },
    { name: 'Volunteers', value: 5 },
  ];
  
  const COLORS = ['#A67C52', '#2D5A27', '#7D8C5A'];

  return (
    <div className="dashboard-wrapper animate-fade-in">
      <div className="admin-dashboard">
        <div className="admin-header-section">
          <h1 className="admin-header-title">ResQAll Command Center</h1>
          <p className="admin-header-subtitle">Welcome back, Commander</p>
        </div>
        
        <div className="admin-stats-grid">
          <div className="stat-card">
            <div className="stat-icon">📋</div>
            <div className="stat-content">
              <div className="stat-value">{reportsLoading ? '...' : totalReports}</div>
              <div className="stat-label">Total Reports</div>
            </div>
          </div>
          
          <div className="stat-card">
            <div className="stat-icon">⏳</div>
            <div className="stat-content">
              <div className="stat-value">{reportsLoading ? '...' : submittedReports + assignedReports + inProgressReports}</div>
              <div className="stat-label">Active Cases</div>
            </div>
          </div>
          
          <div className="stat-card">
            <div className="stat-icon">✅</div>
            <div className="stat-content">
              <div className="stat-value">{reportsLoading ? '...' : completedReports}</div>
              <div className="stat-label">Completed</div>
            </div>
          </div>
          
          <div className="stat-card">
            <div className="stat-icon">👥</div>
            <div className="stat-content">
              <div className="stat-value">{reportsLoading ? '...' : uniqueReporters}</div>
              <div className="stat-label">Reporters</div>
            </div>
          </div>
        </div>

        <div className="heatmap-section">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
            <h3 className="section-header" style={{ margin: 0 }}>Incident Heatmap - Most Reported Areas</h3>
            <button onClick={() => setShowHeatmap(!showHeatmap)} className="reports-btn"
                    style={{ background: showHeatmap ? '#f44336' : '#2D5A27', color: 'white', border: 'none', padding: '8px 20px', borderRadius: '6px', cursor: 'pointer' }}>
              {showHeatmap ? 'Hide Map' : 'Show Heatmap'}
            </button>
          </div>

          {showHeatmap && (
            <div className="heatmap-container">
              {heatmapData.length > 0 ? (
                <>
                  <Heatmap reports={heatmapData} height="500px" />
                  
                  <div className="heatmap-stats-grid">
                    <div className="heatmap-stat-card"><div className="heatmap-stat-label">Total Locations</div><div className="heatmap-stat-value">{heatmapData.length}</div></div>
                    <div className="heatmap-stat-card"><div className="heatmap-stat-label">Unique Areas</div><div className="heatmap-stat-value">{new Set(heatmapData.map(r => r.location_address)).size}</div></div>
                    <div className="heatmap-stat-card"><div className="heatmap-stat-label">Most Common Animal</div><div className="heatmap-stat-value">{getMostCommonAnimal()}</div></div>
                    <div className="heatmap-stat-card"><div className="heatmap-stat-label">Hotspots (3+ reports)</div><div className="heatmap-stat-value highlight">{getHotspotCount()}</div></div>
                  </div>

                  <div style={{ marginTop: '1.5rem' }}>
                    <h4 style={{ marginBottom: '1rem', color: '#333' }}>Top Hotspot Areas</h4>
                    <div className="hotspot-tags">
                      {Object.entries(heatmapData.reduce((acc, r) => {
                        acc[r.location_address] = (acc[r.location_address] || 0) + 1;
                        return acc;
                      }, {} as Record<string, number>))
                        .sort((a, b) => b[1] - a[1])
                        .slice(0, 8)
                        .map(([location, count]) => (
                          <div key={location} className={`hotspot-tag ${count >= 5 ? 'high' : count >= 3 ? 'medium' : 'low'}`}>
                            {location.length > 25 ? location.substring(0, 25) + '...' : location} ({count})
                          </div>
                        ))}
                    </div>
                  </div>
                </>
              ) : (
                <div style={{ height: '300px', display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#f5f5f5', borderRadius: '8px', flexDirection: 'column', gap: '1rem' }}>
                  <span style={{ fontSize: '3rem' }}>🗺️</span>
                  <p style={{ color: '#666' }}>No location data available for heatmap</p>
                </div>
              )}
            </div>
          )}
        </div>

        <div className="admin-charts-section">
          <div className="chart-container">
            <h3 className="chart-title">Report Status Distribution</h3>
            <div className="recharts-wrapper">
              {reportsLoading ? (
                <div className="chart-loading"><div className="spinner"></div><p>Loading chart data...</p></div>
              ) : (
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={chartData}>
                    <XAxis dataKey="name" axisLine={false} tickLine={false} />
                    <YAxis axisLine={false} tickLine={false} />
                    <Tooltip cursor={{fill: '#F5F1E8'}} formatter={(value) => [value, 'Count']} labelFormatter={(label) => `${label}`} />
                    <Bar dataKey="value" radius={[10, 10, 0, 0]} barSize={60}>
                      {chartData.map((entry, index) => <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />)}
                    </Bar>
                  </BarChart>
                </ResponsiveContainer>
              )}
            </div>
          </div>
          
          <div className="volunteer-alert-box">
            <div className="volunteer-alert-icon">⚡</div>
            <h3 className="volunteer-alert-title">Quick Navigation</h3>
            <p className="volunteer-alert-text">Manage your volunteer force or review all mission reports.</p>
            <Link to="/admin/users" className="volunteer-alert-btn" style={{ marginBottom: '10px', background: '#2D5A27' }}>
              <span style={{ marginRight: '8px' }}>👥</span> Manage Volunteers
            </Link>
            <Link to="/admin/rescue-reports" className="volunteer-alert-btn" style={{ background: '#1976D2' }}>
              <span style={{ marginRight: '8px' }}>📋</span> View All Reports
            </Link>
          </div>
        </div>

        <div className="recent-reports-section">
          <div className="section-header">
            <h3>Recent Reports ({reports.length})</h3>
            <Link to="/admin/rescue-reports" className="view-all-link">View All Reports →</Link>
          </div>
          <div className="reports-table-container">
            {reportsLoading ? (
              <div className="loading-message"><div className="loading-spinner-small"></div><p>Loading reports...</p></div>
            ) : reports.length > 0 ? (
              <table className="reports-table">
                <thead>
                  <tr>
                    <th>ID</th>
                    <th>Animal</th>
                    <th>Condition</th>
                    <th>Location</th>
                    <th>Reporter</th>
                    <th>Volunteer</th>
                    <th>Date</th>
                    <th>Status</th>
                  </tr>
                </thead>
                <tbody>
                  {reports.slice(0, 10).map((report) => (
                    <tr key={report.report_id}>
                      <td>#{report.report_id}</td>
                      <td>
                        <div className="animal-cell">
                          <span className="animal-emoji">{getAnimalEmoji(report.animal_type)}</span>
                          <span className="animal-name">{report.animal_type || 'Unknown'}</span>
                        </div>
                      </td>
                      <td>{report.animal_condition || 'Unknown'}</td>
                      <td className="location-cell">{report.location_address || 'No location'}</td>
                      <td>{report.reporter_name || 'Anonymous'}</td>
                      <td>
                        {report.volunteer_name ? (
                          <span className="volunteer-name">{report.volunteer_name}</span>
                        ) : (
                          <span className="not-assigned">Not assigned</span>
                        )}
                      </td>
                      <td className="report-date">{formatShortDate(report.submitted_at)}</td>
                      <td>
                        <span className={`status-badge status-${getStatusClass(report.status_name)}`}>
                          {getStatusText(report.status_name)}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            ) : (
              <div className="no-reports"><p>No reports found in the system.</p></div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

// ===========================================
// VOLUNTEER DASHBOARD
// ===========================================
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
  const [selectedTaskId, setSelectedTaskId] = useState<number | null>(null);
  const [completedTasksCount, setCompletedTasksCount] = useState(0);
  const [taskEvidence, setTaskEvidence] = useState<{[key: number]: TaskProof[]}>({});
  const [taskAdminNotes, setTaskAdminNotes] = useState<{[key: number]: AdminNote[]}>({});
  const [taskDetails, setTaskDetails] = useState<{[key: number]: VolunteerTask}>({});
  
  useEffect(() => {
    const fetchAllTasks = async () => {
      if (!user?.user_id) return;
      
      try {
        setMissionsLoading(true);
        setFetchError(null);
        const token = sessionStorage.getItem('token');
        
        if (!token) {
          setFetchError('No authentication token');
          return;
        }

        const response = await fetch(`http://localhost:5000/api/volunteers/tasks`, {
          method: 'GET',
          headers: { 'Authorization': `Bearer ${token}`, 'Content-Type': 'application/json' }
        });
        
        if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
        
        const data = await response.json();
        
        if (data.success && data.data) {
          const assigned = data.data.filter((t: VolunteerTask) => t.task_status_id === 1);
          const inProgress = data.data.filter((t: VolunteerTask) => t.task_status_id === 2);
          const completed = data.data.filter((t: VolunteerTask) => t.task_status_id === 3);
          
          setPendingTasks(assigned);
          setActiveMissions(inProgress);
          setCompletedTasksCount(completed.length);
        } else {
          setPendingTasks([]);
          setActiveMissions([]);
        }
      } catch (error) {
        console.error('Error fetching tasks:', error);
        setFetchError(error instanceof Error ? error.message : 'Unknown error');
        setPendingTasks([]);
        setActiveMissions([]);
      } finally {
        setMissionsLoading(false);
      }
    };
    
    fetchAllTasks();
  }, [user?.user_id]);

  const fetchTaskEvidence = async (taskId: number) => {
    try {
      const token = sessionStorage.getItem('token');
      const response = await fetch(`http://localhost:5000/api/tasks/${taskId}/evidence`, {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      const data = await response.json();
      if (data.success) {
        setTaskEvidence(prev => ({ ...prev, [taskId]: data.data }));
      }
    } catch (error) {
      console.error('Error fetching evidence:', error);
    }
  };

  const fetchTaskAdminNotes = async (reportId: number, taskId: number) => {
    try {
      const token = sessionStorage.getItem('token');
      const response = await fetch(`http://localhost:5000/api/reports/${reportId}/admin-notes`, {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      const data = await response.json();
      if (data.success) {
        setTaskAdminNotes(prev => ({ ...prev, [taskId]: data.data }));
      }
    } catch (error) {
      console.error('Error fetching admin notes:', error);
    }
  };

  const fetchFullTaskDetails = async (taskId: number) => {
    try {
      const token = sessionStorage.getItem('token');
      const response = await fetch(
        `http://localhost:5000/api/tasks/task/${taskId}/full-details`,
        {
          headers: { 'Authorization': `Bearer ${token}` }
        }
      );
      
      const data = await response.json();
      if (data.success) {
        setTaskDetails(prev => ({ ...prev, [taskId]: data.data.task }));
        return data.data;
      }
    } catch (error) {
      console.error('Error fetching full task details:', error);
    }
    return null;
  };

  const handleAcceptTask = async (taskId: number) => {
    try {
      setActionLoading(true);
      const token = sessionStorage.getItem('token');
      
      const response = await fetch(`http://localhost:5000/api/volunteers/tasks/${taskId}/accept`, {
        method: 'PATCH',
        headers: { 'Authorization': `Bearer ${token}`, 'Content-Type': 'application/json' }
      });
      
      const data = await response.json();
      
      if (data.success) {
        const acceptedTask = pendingTasks.find(t => t.task_id === taskId);
        if (acceptedTask) {
          const updatedTask = {
            ...acceptedTask,
            task_status_id: 2,
            task_status: 'in_progress',
            started_at: new Date().toISOString()
          };
          setPendingTasks(prev => prev.filter(t => t.task_id !== taskId));
          setActiveMissions(prev => [...prev, updatedTask]);
        }
        toast.success('Task accepted successfully!');
      } else {
        toast.success('Failed to accept task: ' + data.message);
      }
    } catch (error) {
      console.error('Error accepting task:', error);
      toast.success('Failed to accept task');
    } finally {
      setActionLoading(false);
    }
  };

  const handleDeclineTask = async (taskId: number, reason: string) => {
    try {
      setActionLoading(true);
      const token = sessionStorage.getItem('token');
      
      const response = await fetch(`http://localhost:5000/api/volunteers/tasks/${taskId}/decline`, {
        method: 'PATCH',
        headers: { 'Authorization': `Bearer ${token}`, 'Content-Type': 'application/json' },
        body: JSON.stringify({ reason })
      });
      
      const data = await response.json();
      
      if (data.success) {
        setPendingTasks(prev => prev.filter(t => t.task_id !== taskId));
        toast.success('Task declined successfully');
      } else {
        toast.success('Failed to decline task: ' + data.message);
      }
    } catch (error) {
      console.error('Error declining task:', error);
      toast.success('Failed to decline task');
    } finally {
      setActionLoading(false);
      setIsDeclineModalOpen(false);
      setSelectedTaskId(null);
    }
  };

  const handleUploadEvidence = async (taskId: number, file: File, notes: string) => {
    try {
      setActionLoading(true);
      const token = sessionStorage.getItem('token');
      
      const formData = new FormData();
      formData.append('proofs', file);
      
      const uploadResponse = await fetch(`http://localhost:5000/api/tasks/${taskId}/upload-proofs`, {
        method: 'POST',
        headers: { 'Authorization': `Bearer ${token}` },
        body: formData
      });
      
      const uploadData = await uploadResponse.json();
      
      if (!uploadData.success) {
        toast.success('Failed to upload proof: ' + uploadData.message);
        return;
      }
      
      const noteResponse = await fetch(`http://localhost:5000/api/tasks/${taskId}/completion-notes`, {
        method: 'POST',
        headers: { 'Authorization': `Bearer ${token}`, 'Content-Type': 'application/json' },
        body: JSON.stringify({ note_text: notes, volunteer_id: user.user_id })
      });
      
      const noteData = await noteResponse.json();
      
      if (!noteData.success) {
        toast.success('Failed to save completion note: ' + noteData.message);
        return;
      }
      
      // Refresh evidence after upload
      fetchTaskEvidence(taskId);
      toast.success('Evidence uploaded successfully!');
      
    } catch (error) {
      console.error('Error uploading evidence:', error);
      toast.success('Failed to upload evidence');
    } finally {
      setActionLoading(false);
    }
  };

  const handleViewTaskDetails = async (task: VolunteerTask) => {
    setSelectedTask(task);
    
    try {
      const fullDetails = await fetchFullTaskDetails(task.task_id);
      
      if (fullDetails) {
        setSelectedTask(fullDetails.task);
        setTaskEvidence(prev => ({ ...prev, [task.task_id]: fullDetails.evidence || [] }));
        setTaskAdminNotes(prev => ({ ...prev, [task.task_id]: fullDetails.admin_notes || [] }));
      } else {
        await Promise.all([
          fetchTaskEvidence(task.task_id),
          fetchTaskAdminNotes(task.report_id, task.task_id)
        ]);
      }
    } catch (error) {
      console.error('Error in handleViewTaskDetails:', error);
      await Promise.all([
        fetchTaskEvidence(task.task_id),
        fetchTaskAdminNotes(task.report_id, task.task_id)
      ]);
    }
    
    setIsTaskModalOpen(true);
  };

  const displayedActiveMissions = showAllActive ? activeMissions : activeMissions.slice(0, 3);
  const displayedPendingTasks = showAllPending ? pendingTasks : pendingTasks.slice(0, 3);

  useEffect(() => {
    const style = document.createElement('style');
    style.textContent = `
      @keyframes pulse {
        0% { opacity: 1; transform: scale(1); }
        50% { opacity: 0.7; transform: scale(1.1); }
        100% { opacity: 1; transform: scale(1); }
      }
    `;
    document.head.appendChild(style);
    return () => {
      document.head.removeChild(style);
    };
  }, []);

  return (
    <div className="dashboard-wrapper animate-fade-in">
      <div className="volunteer-dashboard-new" style={{ maxWidth: '1200px', margin: '0 auto' }}>
        
        {/* Header Section */}
        <div className="reports-header" style={{ marginBottom: '2rem' }}>
          <div className="reports-header-content">
            <h1 className="reports-title">Welcome back, Ranger {user.username}!</h1>
            <p className="reports-subtitle">Your dedication saves lives. Ready for your next mission?</p>
            {userProfile?.email && (
              <div style={{ marginTop: '0.5rem', display: 'flex', alignItems: 'center', gap: '8px' }}>
                <span style={{ fontSize: '1.1rem' }}>✉️</span>
                <span style={{ color: '#2D5A27', fontWeight: '500' }}>{userProfile.email}</span>
              </div>
            )}
            {userProfile?.phone && (
              <div style={{ marginTop: '0.5rem', display: 'flex', alignItems: 'center', gap: '8px' }}>
                <span style={{ fontSize: '1.1rem' }}>📱</span>
                <span style={{ color: '#2D5A27', fontWeight: '500' }}>Contact: {userProfile.phone}</span>
              </div>
            )}
          </div>
          <div className="reports-header-actions">
            <Link to="/tasks" className="reports-btn refresh"><span className="btn-icon">📋</span> Mission Board</Link>
            <Link to="/profile" className="reports-btn refresh"><span className="btn-icon">🏆</span> My Profile</Link>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="reports-filters-card" style={{ marginBottom: '2rem', padding: '1.5rem' }}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '1.5rem' }}>
            <div style={{ background: 'linear-gradient(135deg, #2D5A27 0%, #1e3f1a 100%)', borderRadius: '12px', padding: '1.25rem', color: 'white' }}>
              <div style={{ fontSize: '0.85rem', opacity: '0.9', marginBottom: '0.5rem' }}>TOTAL RESCUES</div>
              <div style={{ fontSize: '2.5rem', fontWeight: '700', lineHeight: '1' }}>{completedTasksCount}</div>
              <div style={{ fontSize: '0.8rem', opacity: '0.8', marginTop: '0.5rem' }}>Lives Saved ✓</div>
            </div>

            <div style={{ background: 'linear-gradient(135deg, #1976D2 0%, #0D47A1 100%)', borderRadius: '12px', padding: '1.25rem', color: 'white' }}>
              <div style={{ fontSize: '0.85rem', opacity: '0.9', marginBottom: '0.5rem' }}>ACTIVE MISSIONS</div>
              <div style={{ fontSize: '2.5rem', fontWeight: '700', lineHeight: '1' }}>{activeMissions.length}</div>
              <div style={{ fontSize: '0.8rem', opacity: '0.8', marginTop: '0.5rem' }}>In Progress 🎯</div>
            </div>

            <div style={{ background: 'linear-gradient(135deg, #FF9F1C 0%, #E65100 100%)', borderRadius: '12px', padding: '1.25rem', color: 'white' }}>
              <div style={{ fontSize: '0.85rem', opacity: '0.9', marginBottom: '0.5rem' }}>PENDING</div>
              <div style={{ fontSize: '2.5rem', fontWeight: '700', lineHeight: '1' }}>{pendingTasks.length}</div>
              <div style={{ fontSize: '0.8rem', opacity: '0.8', marginTop: '0.5rem' }}>Awaiting Decision ⏳</div>
            </div>

            <div style={{ background: 'linear-gradient(135deg, #7D8C5A 0%, #5A6B3E 100%)', borderRadius: '12px', padding: '1.25rem', color: 'white' }}>
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

        {/* PENDING TASKS SECTION */}
        {pendingTasks.length > 0 && (
          <div className="reports-section" style={{ marginBottom: '2.5rem' }}>
            <div className="reports-header">
              <h2 className="reports-title" style={{ fontSize: '1.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <span>⏳</span> Pending Confirmation ({pendingTasks.length})
              </h2>
              {pendingTasks.length > 3 && (
                <button onClick={() => setShowAllPending(!showAllPending)} className="view-all-link">
                  {showAllPending ? 'Show Less ↑' : `View All (${pendingTasks.length}) →`}
                </button>
              )}
            </div>
            
            <div className="reports-grid" style={{ gridTemplateColumns: 'repeat(3, 1fr)' }}>
              {displayedPendingTasks.map((task) => {
                const statusBadge = getTaskStatusBadge(task.task_status_id);
                const displayMission = taskDetails[task.task_id] || task;
                
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
                        {formatShortDate(displayMission.submitted_at)}
                      </div>
                    </div>

                    <div className="reports-card-body">
                      <div className="reports-animal-section">
                        <div className="reports-animal-icon large">{getAnimalEmoji(task.animal_type)}</div>
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
                            {hasEmail(task.reporter_email) && (
                              <span className="ranger-phone" style={{ fontSize: '0.75rem', color: '#E65100' }}>✉️ {task.reporter_email}</span>
                            )}
                            {hasPhone(task.reporter_phone) && (
                              <span className="ranger-phone" style={{ fontSize: '0.75rem', color: '#E65100' }}>📱 {formatPhoneNumber(task.reporter_phone)}</span>
                            )}
                          </div>
                        </div>
                      </div>
                      
                      <p className="reports-description" style={{ fontSize: '0.85rem', marginBottom: '0.5rem', color: '#666' }}>
                        {task.description?.length > 80 
                          ? `${task.description.substring(0, 80)}...` 
                          : task.description || 'No description provided'}
                      </p>
                    </div>

                    <div className="reports-card-footer">
                      <div style={{ display: 'flex', gap: '0.75rem' }}>
                        <button onClick={() => handleAcceptTask(task.task_id!)}
                                disabled={actionLoading}
                                className="reports-btn"
                                style={{ flex: 2, background: '#2e7d32', color: 'white', padding: '0.6rem', fontSize: '0.85rem', fontWeight: '600', border: 'none', borderRadius: '4px', cursor: actionLoading ? 'not-allowed' : 'pointer' }}>
                          {actionLoading ? '...' : 'Accept'}
                        </button>
                        <button onClick={() => { setSelectedTaskId(task.task_id!); setIsDeclineModalOpen(true); }}
                                disabled={actionLoading}
                                className="reports-btn"
                                style={{ flex: 1, background: 'transparent', color: '#c62828', border: '1px solid #c62828', padding: '0.6rem', fontSize: '0.85rem', fontWeight: '600', borderRadius: '4px', cursor: actionLoading ? 'not-allowed' : 'pointer' }}>
                          Decline
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* ACTIVE MISSIONS SECTION */}
        <div className="reports-section">
          <div className="reports-header">
            <h2 className="reports-title" style={{ fontSize: '1.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <span>📻</span> Your Active Missions ({activeMissions.length})
            </h2>
            {activeMissions.length > 3 && (
              <button onClick={() => setShowAllActive(!showAllActive)} className="view-all-link">
                {showAllActive ? 'Show Less ↑' : `View All (${activeMissions.length}) →`}
              </button>
            )}
          </div>
          
          {missionsLoading ? (
            <div className="reports-loading-container">
              <div className="reports-loader"><div className="reports-spinner"></div><p className="reports-loader-text">Loading your missions...</p></div>
            </div>
          ) : fetchError ? (
            <div className="reports-empty-state">
              <span className="empty-state-emoji">❌</span>
              <h3>Error Loading Missions</h3>
              <p>{fetchError}</p>
              <button onClick={() => window.location.reload()} className="reports-btn primary">Retry</button>
            </div>
          ) : activeMissions.length > 0 ? (
            <>
              <div className="reports-grid" style={{ gridTemplateColumns: 'repeat(3, 1fr)' }}>
                {displayedActiveMissions.map((mission) => {
                  const statusBadge = getTaskStatusBadge(mission.task_status_id);
                  const hasEvidence = taskEvidence[mission.task_id]?.length > 0;
                  const displayMission = taskDetails[mission.task_id] || mission;
                  
                  return (
                    <div key={mission.task_id} className="reports-card">
                      <div className="reports-card-header" style={{ background: '#1e3f1a' }}>
                        <div className="reports-card-title">
                          <span className="reports-id" style={{ background: 'rgba(255,255,255,0.2)', color: 'white' }}>
                            #{mission.report_id}
                          </span>
                          <span className="reports-status" style={{ background: 'rgba(255,255,255,0.2)', color: 'white' }}>
                            {statusBadge.text}
                          </span>
                        </div>
                        <div className="reports-date" style={{ color: 'rgba(255,255,255,0.9)' }}>
                          {formatShortDate(displayMission.submitted_at)}
                        </div>
                        <div className="reports-volunteer-tag" style={{ color: 'white', fontSize: '0.8rem', fontWeight: '600', marginTop: '5px' }}>
                          {user.username?.toUpperCase()}
                        </div>
                      </div>

                      <div className="reports-card-body">
                        <div className="reports-animal-section">
                          <div className="reports-animal-icon large">{getAnimalEmoji(mission.animal_type)}</div>
                          <div className="reports-animal-info">
                            <h4 style={{ color: '#1e3f1a' }}>{mission.animal_type || 'Animal'} Rescue</h4>
                            <span className="reports-condition" style={{ background: '#ffebee', color: '#c62828', fontWeight: 'bold' }}>
                              {mission.animal_condition || 'CRITICAL'}
                            </span>
                          </div>
                        </div>

                        <div className="reports-location-section">
                          <span className="location-icon">📍</span>
                          <span className="location-text">{mission.location_address || 'Location not specified'}</span>
                        </div>

                        <div className="reports-volunteer-section">
                          <div className="reports-assigned-ranger" style={{ background: '#e8f5e9' }}>
                            <div className="ranger-avatar" style={{ background: '#2e7d32' }}>
                              {mission.reporter_name?.charAt(0).toUpperCase() || '?'}
                            </div>
                            <div className="ranger-info">
                              <span className="ranger-name">{mission.reporter_name || 'Anonymous'}</span>
                              <span className="ranger-role">Reporter</span>
                              {hasEmail(mission.reporter_email) && (
                                <span className="ranger-phone" style={{ fontSize: '0.75rem', color: '#2e7d32' }}>✉️ {mission.reporter_email}</span>
                              )}
                              {hasPhone(mission.reporter_phone) && (
                                <span className="ranger-phone" style={{ fontSize: '0.75rem', color: '#2e7d32' }}>📱 {formatPhoneNumber(mission.reporter_phone)}</span>
                              )}
                            </div>
                          </div>
                        </div>
                        
                        <p className="reports-description" style={{ fontSize: '0.85rem', marginBottom: '0.5rem', color: '#666' }}>
                          {mission.description?.length > 100 
                            ? `${mission.description.substring(0, 100)}...` 
                            : mission.description || 'No description provided'}
                        </p>

                        {hasEvidence && (
                          <div className="evidence-indicator">
                            <span style={{ color: '#1e3f1a', fontSize: '0.8rem', fontWeight: '600' }}>
                              📸 Evidence Uploaded
                            </span>
                          </div>
                        )}

                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '0.7rem', color: '#888', marginTop: '0.5rem', paddingTop: '0.5rem', borderTop: '1px solid #e8dfc9' }}>
                          <span style={{ padding: '2px 8px', borderRadius: '12px', background: '#e3f2fd', color: '#1565c0', fontWeight: 'bold' }}>
                            {statusBadge.text}
                          </span>
                          {mission.assigned_at && <span>Assigned: {formatShortDate(mission.assigned_at)}</span>}
                        </div>
                      </div>

                      <div className="reports-card-footer">
                        <button onClick={() => handleViewTaskDetails(mission)}
                                className="reports-btn"
                                style={{ width: '100%', background: '#2D5A27', color: 'white', padding: '0.6rem', fontSize: '0.85rem', fontWeight: '600', border: 'none', borderRadius: '4px', cursor: 'pointer' }}>
                          View Details
                        </button>
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
              <Link to="/tasks" className="reports-btn primary">Browse Available Missions</Link>
            </div>
          )}
        </div>
      </div>

      {/* Task Detail Modal */}
      {selectedTask && (
        <TaskDetailModal 
          task={selectedTask}
          isOpen={isTaskModalOpen}
          onClose={() => { setIsTaskModalOpen(false); setSelectedTask(null); }}
          onUploadEvidence={handleUploadEvidence}
          actionLoading={actionLoading}
          userProfile={userProfile}
          evidence={taskEvidence[selectedTask.task_id]}
          adminNotes={taskAdminNotes[selectedTask.task_id]}
        />
      )}

      {/* Decline Modal */}
      {selectedTaskId && (
        <DeclineModal
          isOpen={isDeclineModalOpen}
          onClose={() => { setIsDeclineModalOpen(false); setSelectedTaskId(null); }}
          onSubmit={(reason) => handleDeclineTask(selectedTaskId, reason)}
          taskId={selectedTaskId}
        />
      )}
    </div>
  );
};

// ===========================================
// PENDING VOLUNTEER DASHBOARD
// ===========================================
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

// ===========================================
// REJECTED VOLUNTEER DASHBOARD
// ===========================================
const RejectedVolunteerDashboard: React.FC<{ user: any }> = ({ user }) => {
  return (
    <div className="dashboard-wrapper animate-fade-in">
      <div className="rejected-volunteer">
        <h2 className="rejected-title">Application Status</h2>
        <p className="rejected-text">Unfortunately, your ResQAll operative status was not approved.</p>
      </div>
    </div>
  );
};

// ===========================================
// USER DASHBOARD
// ===========================================
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
  const userEmail = userProfile?.email;

  return (
    <div className="dashboard-wrapper animate-fade-in">
      <div className="user-dashboard">
        <div className="welcome-section">
          <div className="welcome-content">
            <h1 className="welcome-title">
              <span className="welcome-greeting">Welcome back,</span>
              <span className="welcome-name">{user.username || 'Animal Friend'}!</span>
            </h1>
            <p className="welcome-subtitle">Track your rescue reports and their progress</p>
            {(userEmail || userPhone) && (
              <div className="contact-info">
                {userEmail && <span className="contact-item">✉️ {userEmail}</span>}
                {userPhone && <span className="contact-item">📱 {userPhone}</span>}
              </div>
            )}
          </div>
          <Link to="/create-report" className="create-report-btn">
            <span className="btn-icon">+</span>
            New Report
          </Link>
        </div>

        <div className="stats-grid">
          <div className="stat-card">
            <div className="stat-icon total">📋</div>
            <div className="stat-content">
              <div className="stat-value">{totalReports}</div>
              <div className="stat-label">Total Reports</div>
            </div>
          </div>
          
          <div className="stat-card">
            <div className="stat-icon submitted">⏳</div>
            <div className="stat-content">
              <div className="stat-value">{submittedReports}</div>
              <div className="stat-label">Submitted</div>
            </div>
          </div>
          
          <div className="stat-card">
            <div className="stat-icon in-progress">🚀</div>
            <div className="stat-content">
              <div className="stat-value">{inProgressReports}</div>
              <div className="stat-label">In Progress</div>
            </div>
          </div>
          
          <div className="stat-card">
            <div className="stat-icon completed">✅</div>
            <div className="stat-content">
              <div className="stat-value">{completedReports}</div>
              <div className="stat-label">Completed</div>
            </div>
          </div>
        </div>

        <div className="reports-section">
          <div className="section-header">
            <h2>Your Reports</h2>
            {myReports.length > 3 && (
              <Link to="/my-reports" className="view-all-link">View All ({myReports.length}) →</Link>
            )}
          </div>
          
          {reportsLoading ? (
            <div className="loading-container">
              <div className="spinner"></div>
              <p>Loading your reports...</p>
            </div>
          ) : myReports.length > 0 ? (
            <div className="reports-grid user-reports">
              {myReports.slice(0, 3).map(report => {
                const statusClass = getStatusClass(report.status_name);
                const statusText = getStatusText(report.status_name);
                
                return (
                  <div key={report.report_id} className="report-card user">
                    <div className="card-header">
                      <div className="header-top">
                        <span className="report-id">#{report.report_id}</span>
                        <span className={`status-badge ${statusClass}`}>{statusText}</span>
                      </div>
                    </div>

                    <div className="card-body">
                      <div className="animal-info-row">
                        <div className="animal-emoji-container">
                          <span className="animal-emoji-large">{getAnimalEmoji(report.animal_type)}</span>
                        </div>
                        <div className="animal-details">
                          <h3 className="animal-type">{report.animal_type || 'Unknown Animal'}</h3>
                          <div className="condition-tag">
                            <span className="condition-indicator">●</span>
                            {report.animal_condition || 'Condition Unknown'}
                          </div>
                        </div>
                      </div>

                      <div className="location-row">
                        <span className="location-icon">📍</span>
                        <span className="location-text" title={report.location_address}>
                          {report.location_address}
                        </span>
                      </div>

                      <div className="date-row">
                        <span className="date-icon">📅</span>
                        <span className="date-text">{formatShortDate(report.submitted_at)}</span>
                      </div>

                      <p className="description-preview">
                        {report.description?.length > 80 
                          ? `${report.description.substring(0, 80)}...` 
                          : report.description}
                      </p>
                    </div>

                    <div className="card-footer">
                      <button 
                        className="view-details-btn"
                        onClick={() => onViewDetails(report)}
                      >
                        View Details
                        <span className="btn-arrow">→</span>
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          ) : (
            <div className="empty-state">
              <div className="empty-icon">📝</div>
              <h3>No Reports Yet</h3>
              <p>Create your first rescue report to get started</p>
              <Link to="/create-report" className="create-first-btn">
                Create Report
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

// ===========================================
// MAIN DASHBOARD COMPONENT
// ===========================================
export const Dashboard: React.FC = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [userReports, setUserReports] = useState<Report[]>([]);
  const [allReports, setAllReports] = useState<Report[]>([]);
  const [reportsLoading, setReportsLoading] = useState(true);
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null);
  const [selectedReport, setSelectedReport] = useState<Report | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [reportEvidence, setReportEvidence] = useState<{[key: number]: TaskProof[]}>({});
  const [reportNotes, setReportNotes] = useState<{[key: number]: TaskCompletionNote[]}>({});
  const [loadingDetails, setLoadingDetails] = useState<{[key: number]: boolean}>({});
  
  const navigate = useNavigate();
  const { user: currentUser } = useAuth();
  
  useEffect(() => {
    const fetchUserProfile = async () => {
      if (!currentUser) return;
      
      try {
        const token = sessionStorage.getItem('token');
        const response = await fetch('http://localhost:5000/api/users/profile', {
          headers: { 'Authorization': `Bearer ${token}`, 'Content-Type': 'application/json' }
        });

        if (response.ok) {
          const data = await response.json();
          if (data.success) setUserProfile(data.data);
        }
      } catch (err) {
        console.error('Error fetching user profile:', err);
      }
    };

    fetchUserProfile();
  }, [currentUser]);

  const fetchAllReports = async () => {
    try {
      const token = sessionStorage.getItem('token');
      const response = await fetch('http://localhost:5000/api/reports/admin/all', {
        headers: { 'Authorization': `Bearer ${token}`, 'Content-Type': 'application/json' }
      });
      
      if (response.ok) {
        const data = await response.json();
        if (data.success) setAllReports(data.data || []);
      }
    } catch (error) {
      console.error('Error fetching all reports:', error);
    }
  };

  useEffect(() => {
    const fetchUserReports = async () => {
      if (!currentUser) return;
      
      try {
        setReportsLoading(true);
        const token = sessionStorage.getItem('token');
        
        const response = await fetch('http://localhost:5000/api/reports/my-reports', {
          headers: { 'Authorization': `Bearer ${token}`, 'Content-Type': 'application/json' }
        });
        
        if (response.ok) {
          const data = await response.json();
          if (data.success) {
            const reportsData = data.data || [];
            // Don't override API data - let the API provide it
            setUserReports(reportsData);
          }
        }

        if (getUserRole(currentUser) === 'admin') await fetchAllReports();
      } catch (error) {
        console.error('Error fetching reports:', error);
      } finally {
        setReportsLoading(false);
      }
    };
    
    if (currentUser) fetchUserReports();
  }, [currentUser, userProfile]);
  
  useEffect(() => {
    if (currentUser) setIsLoading(false);
    else {
      const timer = setTimeout(() => setIsLoading(false), 1000);
      return () => clearTimeout(timer);
    }
  }, [currentUser]);
  
  const getUserRole = (user: any): string => {
    if (!user) return 'user';
    
    if (user.role && typeof user.role === 'object' && user.role.role_name) return user.role.role_name.toLowerCase();
    if (user.role_name) return user.role_name.toLowerCase();
    if (user.role_id) {
      if (user.role_id === 3) return 'admin';
      if (user.role_id === 2) return 'volunteer';
      if (user.role_id === 1) return 'user';
    }
    return 'user';
  };
  
  const getVolunteerStatus = (user: any): string | null => {
    if (!user) return null;

    if (user.approval_status_id !== undefined) {
      if (user.approval_status_id === 1) return 'pending';
      if (user.approval_status_id === 2) return 'approved';
      if (user.approval_status_id === 3) return 'rejected';
    }

    if (user.volunteer) {
      if (user.volunteer.approval_status_id !== undefined) {
        if (user.volunteer.approval_status_id === 1) return 'pending';
        if (user.volunteer.approval_status_id === 2) return 'approved';
        if (user.volunteer.approval_status_id === 3) return 'rejected';
      }
      
      if (user.volunteer.status) {
        const status = user.volunteer.status.toLowerCase();
        if (status.includes('pending')) return 'pending';
        if (status.includes('approved')) return 'approved';
        if (status.includes('reject')) return 'rejected';
      }
    }

    if (user.volunteer_status) {
      const status = user.volunteer_status.toLowerCase();
      if (status.includes('pending')) return 'pending';
      if (status.includes('approved')) return 'approved';
      if (status.includes('reject')) return 'rejected';
    }

    return null;
  };

  const fetchReportEvidence = async (reportId: number, taskId?: number) => {
    if (!taskId) return;
    
    try {
      setLoadingDetails(prev => ({ ...prev, [reportId]: true }));
      const token = sessionStorage.getItem('token');
      
      // Fetch evidence
      const evidenceRes = await fetch(`http://localhost:5000/api/tasks/${taskId}/evidence`, {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      const evidenceData = await evidenceRes.json();
      if (evidenceData.success) {
        setReportEvidence(prev => ({ ...prev, [reportId]: evidenceData.data || [] }));
      }

      // Fetch completion notes
      const notesRes = await fetch(`http://localhost:5000/api/tasks/${taskId}/completion-notes`, {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      const notesData = await notesRes.json();
      if (notesData.success) {
        setReportNotes(prev => ({ ...prev, [reportId]: notesData.data || [] }));
      }
    } catch (error) {
      console.error('Error fetching report details:', error);
    } finally {
      setLoadingDetails(prev => ({ ...prev, [reportId]: false }));
    }
  };

  const handleViewDetails = (report: Report) => {
    setSelectedReport(report);
    console.log('Viewing report details:', report); // Debug log
    if (report.task_id) {
      fetchReportEvidence(report.report_id, report.task_id);
    }
    setIsModalOpen(true);
  };

  useEffect(() => {
    if (!isLoading && !currentUser) navigate('/login');
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
          <Link to="/login" className="login-link">Go to Login</Link>
        </div>
      </div>
    );
  }

  const userRole = getUserRole(currentUser);
  const volunteerStatus = getVolunteerStatus(currentUser);

  const getStats = () => {
    const totalReports = userReports.length;
    const completedRescues = userReports.filter(r => r.status_name?.toLowerCase() === 'completed').length;
    const activeVolunteers = 1;
    const pendingApprovals = 0;
    
    const userId = currentUser.user_id?.toString() || '';
    
    const myReports = userReports.filter(r => {
      const reportUserId = Number(r.user_id);
      const currentUserId = Number(userId);
      return reportUserId === currentUserId;
    });
    
    const myCompletedTasks = userReports.filter(r => r.status_name?.toLowerCase() === 'completed').length;

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
      return <AdminDashboard stats={stats} reports={allReports} reportsLoading={reportsLoading} />;
    }
    
    if (userRole === 'volunteer') {
      if (volunteerStatus === 'rejected') {
        return <RejectedVolunteerDashboard user={currentUser} />;
      }
      
      if (volunteerStatus === 'pending' || volunteerStatus === 'none' || !volunteerStatus) {
        return <PendingVolunteerDashboard user={currentUser} />;
      }
      
      if (volunteerStatus === 'approved') {
        return <VolunteerDashboard 
          user={{...currentUser, role: userRole}} 
          stats={stats} 
          reports={userReports}
          reportsLoading={reportsLoading}
          userProfile={userProfile}
        />;
      }
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
      
      {/* Enhanced Detail Modal */}
      <ReportDetailModal 
        report={selectedReport}
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
          setSelectedReport(null);
        }}
        userPhone={userProfile?.phone}
        userEmail={userProfile?.email}
        userName={userProfile?.username}
        evidence={selectedReport ? reportEvidence[selectedReport.report_id] : []}
        notes={selectedReport ? reportNotes[selectedReport.report_id] : []}
        loading={selectedReport ? loadingDetails[selectedReport.report_id] : false}
      />
    </div>
  );
};

export default Dashboard;

