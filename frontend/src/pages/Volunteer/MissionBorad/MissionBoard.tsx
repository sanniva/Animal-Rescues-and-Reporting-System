// import React, { useState, useEffect } from 'react';
// import { useNavigate, Link } from 'react-router-dom';
// import { useAuth } from '../../../context/AuthContext';
// import './MissionBoard.css';

// interface Mission {
//   task_id: number;
//   report_id: number;
//   assigned_to_user_id: number;
//   assigned_by_user_id: number;
//   task_status_id: number;
//   task_status: string;
//   assigned_at: string;
//   started_at?: string;
//   completed_at?: string;
//   volunteer_responded_at?: string;
//   volunteer_response?: string;
//   declined_reason?: string;
  
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

// interface TaskProof {
//   proof_id: number;
//   task_id: number;
//   proof_url: string;
//   uploaded_at: string;
// }

// interface AdminNote {
//   note_id: number;
//   report_id: number;
//   admin_id: number;
//   note_text: string;
//   created_at: string;
//   admin_name?: string;
// }

// interface CompletionNote {
//   note_id: number;
//   task_id: number;
//   volunteer_id: number;
//   note_text: string;
//   created_at: string;
//   volunteer_name?: string;
// }

// // Helper functions
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

// const formatDate = (dateString: string): string => {
//   if (!dateString || dateString === 'Not available' || dateString === 'Invalid date' || dateString === '') {
//     return 'Not available';
//   }
//   try {
//     const date = new Date(dateString);
//     if (isNaN(date.getTime())) return 'Not available';
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
//     if (isNaN(date.getTime())) return 'Not available';
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
//     if (isNaN(date.getTime())) return 'Not available';
    
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

// const getTaskStatusBadge = (statusId: number | undefined): { text: string; class: string; color: string } => {
//   // All statuses use dark green now
//   switch(statusId) {
//     case 1: return { text: 'PENDING', class: 'pending', color: '#1e3f1a' };
//     case 2: return { text: 'ACTIVE', class: 'active', color: '#1e3f1a' };
//     case 3: return { text: 'COMPLETED', class: 'completed', color: '#1e3f1a' };
//     case 4: return { text: 'DECLINED', class: 'declined', color: '#1e3f1a' };
//     default: return { text: 'UNKNOWN', class: 'unknown', color: '#1e3f1a' };
//   }
// };

// // FIXED: Image URL helper - handles paths correctly
// const getFullImageUrl = (proofUrl: string): string => {
//   if (!proofUrl) return '';
  
//   console.log('Original proof URL from database:', proofUrl);
  
//   // If it's already a full URL, return as is
//   if (proofUrl.startsWith('http://') || proofUrl.startsWith('https://')) {
//     console.log('Using full URL as is:', proofUrl);
//     return proofUrl;
//   }
  
//   const baseUrl = 'http://localhost:5000';
  
//   // Remove any leading slashes
//   let cleanUrl = proofUrl.replace(/^\/+/, '');
  
//   // If the URL already starts with 'uploads/', don't add it again
//   if (cleanUrl.startsWith('uploads/')) {
//     const fullUrl = `${baseUrl}/${cleanUrl}`;
//     console.log('Constructed URL (already has uploads):', fullUrl);
//     return fullUrl;
//   }
  
//   // Otherwise, add uploads/ prefix
//   const fullUrl = `${baseUrl}/uploads/${cleanUrl}`;
//   console.log('Constructed URL (added uploads):', fullUrl);
//   return fullUrl;
// };

// // ===========================================
// // COMPLETE MISSION MODAL
// // ===========================================
// const CompleteMissionModal: React.FC<{
//   isOpen: boolean;
//   onClose: () => void;
//   onSubmit: (files: File[], notes: string) => void;
//   taskId: number;
// }> = ({ isOpen, onClose, onSubmit, taskId }) => {
//   const [proofFiles, setProofFiles] = useState<File[]>([]);
//   const [notes, setNotes] = useState('');
//   const [previewUrls, setPreviewUrls] = useState<string[]>([]);
//   const [uploading, setUploading] = useState(false);

//   if (!isOpen) return null;

//   const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     if (e.target.files) {
//       const files = Array.from(e.target.files);
//       setProofFiles(prev => [...prev, ...files]);
      
//       const newPreviews = files.map(file => URL.createObjectURL(file));
//       setPreviewUrls(prev => [...prev, ...newPreviews]);
//     }
//   };

//   const removeFile = (index: number) => {
//     setProofFiles(prev => prev.filter((_, i) => i !== index));
//     URL.revokeObjectURL(previewUrls[index]);
//     setPreviewUrls(prev => prev.filter((_, i) => i !== index));
//   };

//   const handleSubmit = async () => {
//     if (proofFiles.length === 0) {
//       alert('Please upload at least one proof photo');
//       return;
//     }
//     if (!notes.trim()) {
//       alert('Please enter completion notes');
//       return;
//     }
    
//     setUploading(true);
//     try {
//       await onSubmit(proofFiles, notes);
//       previewUrls.forEach(url => URL.revokeObjectURL(url));
//       setProofFiles([]);
//       setNotes('');
//       setPreviewUrls([]);
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
//               <h3 className="modal-title">Complete Mission #{taskId}</h3>
//               <p className="modal-subtitle">Upload evidence of the rescue</p>
//             </div>
//           </div>
//           <button className="modal-close" onClick={onClose}>×</button>
//         </div>
        
//         <div className="modal-body">
//           <div className="form-group">
//             <label className="form-label">
//               Proof Photos <span className="required">*</span>
//             </label>
//             <div className="photo-upload-section">
//               {previewUrls.length > 0 ? (
//                 <div className="photo-preview-container">
//                   <div className="proofs-grid" style={{ 
//                     display: 'grid', 
//                     gridTemplateColumns: 'repeat(2, 1fr)', 
//                     gap: '10px',
//                     marginBottom: '15px'
//                   }}>
//                     {previewUrls.map((url, index) => (
//                       <div key={index} className="proof-item" style={{ position: 'relative' }}>
//                         <img 
//                           src={url} 
//                           alt={`Proof ${index + 1}`} 
//                           style={{ 
//                             width: '100%',
//                             height: '100px',
//                             objectFit: 'cover',
//                             borderRadius: '4px'
//                           }} 
//                         />
//                         <button 
//                           onClick={() => removeFile(index)}
//                           style={{
//                             position: 'absolute',
//                             top: '5px',
//                             right: '5px',
//                             background: '#c62828',
//                             color: 'white',
//                             border: 'none',
//                             borderRadius: '50%',
//                             width: '25px',
//                             height: '25px',
//                             cursor: 'pointer',
//                             display: 'flex',
//                             alignItems: 'center',
//                             justifyContent: 'center',
//                             fontSize: '16px',
//                             fontWeight: 'bold'
//                           }}
//                         >
//                           ×
//                         </button>
//                       </div>
//                     ))}
//                   </div>
//                   <label className="reports-btn change-photo" style={{ 
//                     background: 'transparent',
//                     color: '#2D5A27',
//                     border: '1px solid #2D5A27',
//                     padding: '8px 16px',
//                     borderRadius: '8px',
//                     cursor: 'pointer',
//                     display: 'inline-block',
//                     fontSize: '0.9rem',
//                     fontWeight: '600'
//                   }}>
//                     Add More Photos
//                     <input
//                       type="file"
//                       accept="image/*"
//                       multiple
//                       onChange={handleFileChange}
//                       style={{ display: 'none' }}
//                     />
//                   </label>
//                 </div>
//               ) : (
//                 <div className="photo-upload-placeholder" style={{
//                   display: 'flex',
//                   flexDirection: 'column',
//                   alignItems: 'center',
//                   padding: '2rem',
//                   background: '#f9f5ec',
//                   borderRadius: '8px',
//                   border: '2px dashed #2D5A27'
//                 }}>
//                   <span className="upload-icon" style={{ fontSize: '3rem', marginBottom: '1rem' }}>📷</span>
//                   <p style={{ marginBottom: '0.5rem', color: '#333' }}>Upload proof photos of the rescue</p>
//                   <p className="upload-hint" style={{ fontSize: '0.8rem', color: '#666', marginBottom: '1rem' }}>
//                     This is required to complete the mission
//                   </p>
//                   <label className="reports-btn primary upload-btn" style={{ 
//                     background: '#2D5A27',
//                     color: 'white',
//                     padding: '10px 20px',
//                     borderRadius: '8px',
//                     cursor: 'pointer',
//                     fontSize: '0.9rem',
//                     fontWeight: '600',
//                     border: 'none'
//                   }}>
//                     Choose Photos
//                     <input
//                       type="file"
//                       accept="image/*"
//                       multiple
//                       onChange={handleFileChange}
//                       style={{ display: 'none' }}
//                     />
//                   </label>
//                 </div>
//               )}
//             </div>
//           </div>

//           <div className="form-group">
//             <label className="form-label">
//               Completion Notes <span className="required">*</span>
//             </label>
//             <textarea
//               className="form-textarea"
//               value={notes}
//               onChange={(e) => setNotes(e.target.value)}
//               placeholder="Describe the rescue outcome, any challenges, and the animal's condition..."
//               rows={4}
//               maxLength={500}
//               style={{
//                 width: '100%',
//                 padding: '10px',
//                 border: '2px solid #2D5A27',
//                 borderRadius: '8px',
//                 fontFamily: 'inherit',
//                 fontSize: '0.95rem',
//                 resize: 'vertical'
//               }}
//             />
//             <p style={{ fontSize: '0.75rem', color: '#666', marginTop: '5px', textAlign: 'right' }}>
//               {notes.length}/500 characters
//             </p>
//           </div>
//         </div>
        
//         <div className="modal-footer">
//           <button className="modal-btn secondary" onClick={onClose}>
//             Cancel
//           </button>
//           <button 
//             className="modal-btn primary" 
//             onClick={handleSubmit}
//             disabled={proofFiles.length === 0 || !notes.trim() || uploading}
//             style={{ 
//               background: proofFiles.length === 0 || !notes.trim() ? '#ccc' : '#2D5A27',
//               color: 'white',
//               border: 'none',
//               opacity: proofFiles.length === 0 || !notes.trim() ? 0.6 : 1,
//               cursor: proofFiles.length === 0 || !notes.trim() ? 'not-allowed' : 'pointer'
//             }}
//           >
//             {uploading ? 'Uploading...' : 'Complete Mission'}
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// };

// // Decline Modal Component
// const DeclineModal: React.FC<{
//   isOpen: boolean;
//   onClose: () => void;
//   onSubmit: (reason: string) => void;
//   taskId: number;
// }> = ({ isOpen, onClose, onSubmit, taskId }) => {
//   const [reason, setReason] = useState('');
//   const [otherReason, setOtherReason] = useState('');

//   if (!isOpen) return null;

//   const handleSubmit = () => {
//     const finalReason = reason === 'other' ? otherReason : reason;
//     if (finalReason) {
//       onSubmit(finalReason);
//       setReason('');
//       setOtherReason('');
//       onClose();
//     }
//   };

//   return (
//     <div className="modal-overlay" onClick={onClose}>
//       <div className="modal-content" onClick={e => e.stopPropagation()}>
//         <div className="modal-header" style={{ background: 'linear-gradient(135deg, #2D5A27 0%, #1e3f1a 100%)' }}>
//           <div className="modal-header-left">
//             <span className="modal-icon">❌</span>
//             <div>
//               <h3 className="modal-title">Decline Mission</h3>
//               <p className="modal-subtitle">Task #{taskId}</p>
//             </div>
//           </div>
//           <button className="modal-close" onClick={onClose}>×</button>
//         </div>
        
//         <div className="modal-body">
//           <div className="decline-info">
//             <p>Please provide a reason for declining this mission.</p>
//           </div>
          
//           <div className="form-group">
//             <label className="form-label">
//               Reason <span className="required">*</span>
//             </label>
//             <select 
//               className="form-select"
//               value={reason}
//               onChange={(e) => setReason(e.target.value)}
//               style={{
//                 width: '100%',
//                 padding: '10px',
//                 border: '2px solid #2D5A27',
//                 borderRadius: '8px',
//                 fontSize: '0.95rem'
//               }}
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
//               <label className="form-label">
//                 Please specify <span className="required">*</span>
//               </label>
//               <textarea
//                 className="form-textarea"
//                 value={otherReason}
//                 onChange={(e) => setOtherReason(e.target.value)}
//                 placeholder="Enter your reason..."
//                 rows={3}
//                 style={{
//                   width: '100%',
//                   padding: '10px',
//                   border: '2px solid #2D5A27',
//                   borderRadius: '8px',
//                   fontSize: '0.95rem',
//                   resize: 'vertical'
//                 }}
//               />
//             </div>
//           )}
//         </div>
        
//         <div className="modal-footer">
//           <button className="modal-btn secondary" onClick={onClose}>
//             Cancel
//           </button>
//           <button 
//             className="modal-btn danger" 
//             onClick={handleSubmit}
//             disabled={!reason || (reason === 'other' && !otherReason)}
//             style={{
//               background: '#c62828',
//               color: 'white',
//               border: 'none',
//               opacity: !reason || (reason === 'other' && !otherReason) ? 0.6 : 1,
//               cursor: !reason || (reason === 'other' && !otherReason) ? 'not-allowed' : 'pointer'
//             }}
//           >
//             Decline Mission
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// };

// // ===========================================
// // TASK DETAIL MODAL - WITH COMPLETION NOTES AND FIXED IMAGES
// // ===========================================
// const TaskDetailModal: React.FC<{
//   task: Mission | null;
//   isOpen: boolean;
//   onClose: () => void;
//   onAccept?: (taskId: number) => void;
//   onDecline?: (taskId: number, reason: string) => void;
//   onUploadEvidence?: (taskId: number, file: File, notes: string) => void;
//   actionLoading?: boolean;
//   userProfile?: any;
//   evidence?: TaskProof[];
//   adminNotes?: AdminNote[];
//   completionNotes?: CompletionNote[];
// }> = ({ 
//   task, 
//   isOpen, 
//   onClose, 
//   onAccept, 
//   onDecline, 
//   onUploadEvidence,
//   actionLoading,
//   userProfile,
//   evidence = [], 
//   adminNotes = [],
//   completionNotes = []
// }) => {
//   const [selectedImage, setSelectedImage] = useState<string | null>(null);
//   const [showUploadForm, setShowUploadForm] = useState(false);
//   const [proofFile, setProofFile] = useState<File | null>(null);
//   const [completionNote, setCompletionNote] = useState('');
//   const [previewUrl, setPreviewUrl] = useState<string | null>(null);
//   const [uploadError, setUploadError] = useState<string | null>(null);
//   const [uploading, setUploading] = useState(false);
//   const [showDeclineModal, setShowDeclineModal] = useState(false);
//   const [imageErrors, setImageErrors] = useState<Record<number, boolean>>({});

//   if (!isOpen || !task) return null;

//   const hasProofs = evidence.length > 0;

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
//         if (previewUrl) {
//           URL.revokeObjectURL(previewUrl);
//         }
        
//         setProofFile(file);
//         const newPreview = URL.createObjectURL(file);
//         setPreviewUrl(newPreview);
//       }
//     }
//   };

//   const removeFile = () => {
//     if (previewUrl) {
//       URL.revokeObjectURL(previewUrl);
//     }
//     setProofFile(null);
//     setPreviewUrl(null);
//     setUploadError(null);
//   };

//   const handleUploadSubmit = async () => {
//     if (!proofFile) {
//       setUploadError('Please select a photo');
//       return;
//     }
//     if (!completionNote.trim()) {
//       setUploadError('Please enter completion notes');
//       return;
//     }
    
//     setUploading(true);
//     try {
//       await onUploadEvidence?.(task.task_id, proofFile, completionNote);
//       setShowUploadForm(false);
//       setProofFile(null);
//       setCompletionNote('');
//       setPreviewUrl(null);
//     } catch (error) {
//       console.error('Upload error:', error);
//     } finally {
//       setUploading(false);
//     }
//   };

//   const handleImageError = (proofId: number, url: string) => {
//     console.log(`Image failed to load for proof ID: ${proofId}, URL: ${url}`);
//     setImageErrors(prev => ({ ...prev, [proofId]: true }));
//   };

//   const statusBadge = getTaskStatusBadge(task.task_status_id);

//   return (
//     <>
//       <div className="reports-modal-overlay" onClick={onClose}>
//         <div className="reports-modal-content large" onClick={e => e.stopPropagation()}>
//           <div className="reports-modal-header dark" style={{ background: '#1e3f1a' }}>
//             <div>
//               <h3>Mission #{task.report_id}</h3>
//               <div className="reports-modal-subheader">
//                 <span className={`reports-status-badge`} style={{ 
//                   background: 'rgba(255,255,255,0.2)',
//                   color: 'white',
//                   padding: '0.25rem 0.75rem',
//                   borderRadius: '20px',
//                   fontSize: '0.75rem',
//                   fontWeight: '600',
//                   textTransform: 'uppercase'
//                 }}>
//                   {statusBadge.text}
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
//                 {/* Animal Information */}
//                 <div className="reports-info-card">
//                   <div className="reports-card-header beige">
//                     <h4>🐾 Animal Information</h4>
//                   </div>
//                   <div className="reports-card-content">
//                     <div className="reports-animal-display">
//                       <div className="reports-animal-icon">
//                         {getAnimalEmoji(task.animal_type)}
//                       </div>
//                       <div className="reports-animal-details">
//                         <div className="reports-animal-type">{task.animal_type}</div>
//                         <div className="reports-animal-condition">
//                           <span className="condition-tag">{task.animal_condition}</span>
//                         </div>
//                       </div>
//                     </div>
//                   </div>
//                 </div>

//                 {/* Reporter Details */}
//                 <div className="reports-info-card">
//                   <div className="reports-card-header beige">
//                     <h4>👤 Reporter Details</h4>
//                   </div>
//                   <div className="reports-card-content">
//                     <div className="reports-detail-list">
//                       <div className="reports-detail-row">
//                         <span className="reports-detail-label">Name</span>
//                         <span className="reports-detail-value">{task.reporter_name || 'Anonymous'}</span>
//                       </div>
//                       {task.reporter_email && task.reporter_email !== 'No email' && (
//                         <div className="reports-detail-row">
//                           <span className="reports-detail-label">Email</span>
//                           <span className="reports-detail-value">
//                             <span className="email-icon">✉️</span>
//                             {task.reporter_email}
//                           </span>
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

//                 {/* Location */}
//                 <div className="reports-info-card">
//                   <div className="reports-card-header beige">
//                     <h4>📍 Location</h4>
//                   </div>
//                   <div className="reports-card-content">
//                     <div className="reports-location-info">
//                       <p>{task.location_address}</p>
//                       <button 
//                         className="reports-btn map"
//                         onClick={() => {
//                           const encodedAddress = encodeURIComponent(task.location_address);
//                           window.open(`https://maps.google.com/?q=${encodedAddress}`, '_blank');
//                         }}
//                       >
//                         View on Map
//                       </button>
//                     </div>
//                   </div>
//                 </div>

//                 {/* Timeline */}
//                 <div className="reports-info-card">
//                   <div className="reports-card-header beige">
//                     <h4>⏱️ Timeline</h4>
//                   </div>
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
//                       {task.completed_at && (
//                         <div className="reports-detail-row">
//                           <span className="reports-detail-label">Completed</span>
//                           <span className="reports-detail-value">{formatDate(task.completed_at)}</span>
//                         </div>
//                       )}
//                     </div>
//                   </div>
//                 </div>
//               </div>

//               <div className="reports-detail-column">
//                 {/* Mission Description */}
//                 <div className="reports-info-card">
//                   <div className="reports-card-header beige">
//                     <h4>📝 Mission Description</h4>
//                   </div>
//                   <div className="reports-card-content">
//                     <div className="reports-description">
//                       <p>{task.description}</p>
//                     </div>
//                     {task.user_note && (
//                       <div className="reports-user-note">
//                         <div className="note-label">Reporter's Note:</div>
//                         <p>{task.user_note}</p>
//                       </div>
//                     )}
//                   </div>
//                 </div>

//                 {/* Evidence Section - FIXED IMAGE DISPLAY */}
//                 <div className="reports-info-card">
//                   <div className="reports-card-header beige">
//                     <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
//                       <h4>📸 Evidence Photos</h4>
//                       {task.task_status_id === 2 && onUploadEvidence && !hasProofs && !showUploadForm && (
//                         <button 
//                           className="reports-btn primary small"
//                           onClick={() => setShowUploadForm(true)}
//                           style={{ 
//                             background: '#2D5A27',
//                             color: 'white',
//                             padding: '4px 12px',
//                             fontSize: '0.8rem',
//                             border: 'none',
//                             borderRadius: '4px',
//                             cursor: 'pointer',
//                             fontWeight: '600'
//                           }}
//                         >
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
//                         <div style={{ 
//                           display: 'grid', 
//                           gridTemplateColumns: 'repeat(2, 1fr)', 
//                           gap: '15px',
//                           marginTop: '10px'
//                         }}>
//                           {evidence.map((proof) => {
//                             const imageUrl = getFullImageUrl(proof.proof_url);
//                             const hasError = imageErrors[proof.proof_id];
                            
//                             return (
//                               <div 
//                                 key={proof.proof_id} 
//                                 style={{ 
//                                   border: '1px solid #e8dfc9',
//                                   borderRadius: '8px',
//                                   padding: '8px',
//                                   background: '#f9f5ec',
//                                   cursor: 'pointer'
//                                 }}
//                                 onClick={() => !hasError && setSelectedImage(imageUrl)}
//                               >
//                                 {!hasError ? (
//                                   <img 
//                                     src={imageUrl} 
//                                     alt={`Evidence ${proof.proof_id}`}
//                                     style={{ 
//                                       width: '100%',
//                                       height: '120px',
//                                       objectFit: 'cover',
//                                       borderRadius: '4px'
//                                     }}
//                                     onError={() => handleImageError(proof.proof_id, imageUrl)}
//                                   />
//                                 ) : (
//                                   <div style={{
//                                     width: '100%',
//                                     height: '120px',
//                                     display: 'flex',
//                                     flexDirection: 'column',
//                                     alignItems: 'center',
//                                     justifyContent: 'center',
//                                     background: '#e8f0e0',
//                                     borderRadius: '4px',
//                                     color: '#2D5A27',
//                                     fontSize: '0.9rem',
//                                     padding: '10px',
//                                     textAlign: 'center'
//                                   }}>
//                                     <span style={{ fontSize: '2rem', marginBottom: '5px' }}>📷</span>
//                                     <span>Image unavailable</span>
//                                     <span style={{ fontSize: '0.7rem', marginTop: '5px', color: '#666', wordBreak: 'break-all' }}>
//                                       {proof.proof_url}
//                                     </span>
//                                   </div>
//                                 )}
//                                 <p style={{ 
//                                   fontSize: '0.7rem', 
//                                   textAlign: 'center', 
//                                   marginTop: '5px',
//                                   color: '#666'
//                                 }}>
//                                   Uploaded: {formatShortDate(proof.uploaded_at)}
//                                 </p>
//                               </div>
//                             );
//                           })}
//                         </div>
//                       </div>
//                     ) : (
//                       <div>
//                         {showUploadForm ? (
//                           <div className="upload-form">
//                             {uploadError && (
//                               <div className="error-message" style={{ marginBottom: '10px', color: '#c62828' }}>
//                                 {uploadError}
//                               </div>
//                             )}

//                             {previewUrl ? (
//                               <div className="single-photo-preview">
//                                 <div className="preview-container" style={{ position: 'relative', display: 'inline-block', width: '100%' }}>
//                                   <img 
//                                     src={previewUrl} 
//                                     alt="Preview" 
//                                     style={{ 
//                                       width: '100%',
//                                       maxHeight: '200px',
//                                       objectFit: 'contain',
//                                       borderRadius: '4px'
//                                     }} 
//                                   />
//                                   <button 
//                                     onClick={removeFile}
//                                     style={{
//                                       position: 'absolute',
//                                       top: '5px',
//                                       right: '5px',
//                                       background: '#c62828',
//                                       color: 'white',
//                                       border: 'none',
//                                       borderRadius: '50%',
//                                       width: '25px',
//                                       height: '25px',
//                                       cursor: 'pointer',
//                                       display: 'flex',
//                                       alignItems: 'center',
//                                       justifyContent: 'center',
//                                       fontSize: '16px',
//                                       fontWeight: 'bold'
//                                     }}
//                                   >
//                                     ×
//                                   </button>
//                                 </div>
//                                 <p style={{ fontSize: '0.8rem', marginTop: '5px' }}>
//                                   {proofFile?.name} ({(proofFile!.size / 1024).toFixed(1)} KB)
//                                 </p>
//                               </div>
//                             ) : (
//                               <div style={{ marginBottom: '15px' }}>
//                                 <label className="reports-btn primary" style={{ 
//                                   cursor: 'pointer',
//                                   background: '#2D5A27',
//                                   color: 'white',
//                                   padding: '8px 16px',
//                                   borderRadius: '4px',
//                                   border: 'none',
//                                   fontSize: '0.9rem',
//                                   fontWeight: '600'
//                                 }}>
//                                   Choose Photo
//                                   <input
//                                     type="file"
//                                     accept="image/jpeg,image/png,image/jpg,image/gif"
//                                     onChange={handleFileChange}
//                                     style={{ display: 'none' }}
//                                   />
//                                 </label>
//                               </div>
//                             )}

//                             <div style={{ marginTop: '15px' }}>
//                               <label style={{ fontWeight: 'bold', display: 'block', marginBottom: '5px', color: '#333' }}>
//                                 Completion Notes <span style={{ color: '#c62828' }}>*</span>
//                               </label>
//                               <textarea
//                                 value={completionNote}
//                                 onChange={(e) => setCompletionNote(e.target.value)}
//                                 placeholder="Describe the rescue outcome, any challenges, and the animal's condition..."
//                                 rows={3}
//                                 maxLength={500}
//                                 style={{
//                                   width: '100%',
//                                   padding: '8px',
//                                   border: '1px solid #ccc',
//                                   borderRadius: '4px',
//                                   fontFamily: 'inherit',
//                                   fontSize: '0.9rem'
//                                 }}
//                               />
//                               <p style={{ fontSize: '0.75rem', color: '#666', marginTop: '5px', textAlign: 'right' }}>
//                                 {completionNote.length}/500 characters
//                               </p>
//                             </div>

//                             <div style={{ display: 'flex', gap: '10px', marginTop: '15px' }}>
//                               <button 
//                                 className="reports-btn secondary"
//                                 onClick={() => {
//                                   setShowUploadForm(false);
//                                   setProofFile(null);
//                                   setCompletionNote('');
//                                   setPreviewUrl(null);
//                                   setUploadError(null);
//                                 }}
//                                 style={{
//                                   background: 'transparent',
//                                   color: '#666',
//                                   border: '1px solid #ccc',
//                                   padding: '8px 16px',
//                                   borderRadius: '4px',
//                                   cursor: 'pointer',
//                                   fontWeight: '600'
//                                 }}
//                               >
//                                 Cancel
//                               </button>
//                               <button 
//                                 className="reports-btn primary"
//                                 onClick={handleUploadSubmit}
//                                 disabled={!proofFile || !completionNote.trim() || uploading}
//                                 style={{
//                                   background: !proofFile || !completionNote.trim() ? '#ccc' : '#2D5A27',
//                                   color: 'white',
//                                   border: 'none',
//                                   padding: '8px 16px',
//                                   borderRadius: '4px',
//                                   cursor: !proofFile || !completionNote.trim() ? 'not-allowed' : 'pointer',
//                                   fontWeight: '600'
//                                 }}
//                               >
//                                 {uploading ? 'Uploading...' : 'Submit Evidence'}
//                               </button>
//                             </div>
//                           </div>
//                         ) : (
//                           <div style={{ 
//                             padding: '20px', 
//                             textAlign: 'center', 
//                             background: '#f9f5ec', 
//                             borderRadius: '8px',
//                             color: '#666'
//                           }}>
//                             <span style={{ fontSize: '2rem', display: 'block', marginBottom: '8px' }}>📷</span>
//                             <p>No evidence uploaded yet.</p>
//                           </div>
//                         )}
//                       </div>
//                     )}
//                   </div>
//                 </div>

//                 {/* Completion Notes Section */}
//                 {completionNotes.length > 0 && (
//                   <div className="reports-info-card">
//                     <div className="reports-card-header beige">
//                       <h4>✅ Completion Notes</h4>
//                     </div>
//                     <div className="reports-card-content">
//                       <div className="completion-notes-container">
//                         {completionNotes.map((note) => (
//                           <div key={note.note_id} className="completion-note-item" style={{
//                             background: '#e8f5e9',
//                             padding: '15px',
//                             borderRadius: '8px',
//                             marginBottom: '10px',
//                             border: '1px solid #2D5A27'
//                           }}>
//                             <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '10px' }}>
//                               <span style={{ fontWeight: 'bold', color: '#2D5A27' }}>
//                                 {note.volunteer_name || 'Volunteer'}
//                               </span>
//                               <span style={{ fontSize: '0.75rem', color: '#666' }}>
//                                 {formatDate(note.created_at)}
//                               </span>
//                             </div>
//                             <p style={{ margin: 0, fontSize: '0.95rem', lineHeight: '1.5', color: '#333' }}>
//                               {note.note_text}
//                             </p>
//                           </div>
//                         ))}
//                       </div>
//                     </div>
//                   </div>
//                 )}

//                 {/* Admin Notes */}
//                 {adminNotes.length > 0 && (
//                   <div className="reports-info-card">
//                     <div className="reports-card-header beige">
//                       <h4>📌 Admin Notes</h4>
//                     </div>
//                     <div className="reports-card-content">
//                       <div className="admin-notes-container">
//                         {adminNotes.map((note) => (
//                           <div key={note.note_id} className="admin-note-item" style={{
//                             background: '#f9f5ec',
//                             padding: '12px',
//                             borderRadius: '8px',
//                             marginBottom: '10px',
//                             borderLeft: '3px solid #2D5A27'
//                           }}>
//                             <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '6px' }}>
//                               <span style={{ fontWeight: 'bold', color: '#2D5A27' }}>
//                                 {note.admin_name || 'Admin'}
//                               </span>
//                               <span style={{ fontSize: '0.75rem', color: '#666' }}>
//                                 {formatRelativeTime(note.created_at)}
//                               </span>
//                             </div>
//                             <p style={{ margin: 0, fontSize: '0.95rem', lineHeight: '1.5' }}>
//                               {note.note_text}
//                             </p>
//                           </div>
//                         ))}
//                       </div>
//                     </div>
//                   </div>
//                 )}
//               </div>
//             </div>

//             {/* Image Lightbox */}
//             {selectedImage && (
//               <div 
//                 className="image-lightbox" 
//                 onClick={() => setSelectedImage(null)} 
//                 style={{
//                   position: 'fixed',
//                   top: 0,
//                   left: 0,
//                   right: 0,
//                   bottom: 0,
//                   background: 'rgba(0,0,0,0.9)',
//                   display: 'flex',
//                   alignItems: 'center',
//                   justifyContent: 'center',
//                   zIndex: 2000
//                 }}
//               >
//                 <img 
//                   src={selectedImage} 
//                   alt="Enlarged evidence" 
//                   style={{ maxWidth: '90%', maxHeight: '90%', objectFit: 'contain' }} 
//                 />
//                 <button 
//                   onClick={() => setSelectedImage(null)} 
//                   style={{
//                     position: 'absolute',
//                     top: '20px',
//                     right: '20px',
//                     background: 'white',
//                     border: 'none',
//                     borderRadius: '50%',
//                     width: '40px',
//                     height: '40px',
//                     fontSize: '20px',
//                     cursor: 'pointer',
//                     display: 'flex',
//                     alignItems: 'center',
//                     justifyContent: 'center'
//                   }}
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
//             {task.task_status_id === 1 && onAccept && onDecline && (
//               <>
//                 <button 
//                   className="reports-btn primary"
//                   onClick={() => onAccept(task.task_id)}
//                   disabled={actionLoading}
//                   style={{ background: '#2D5A27', color: 'white', border: 'none' }}
//                 >
//                   {actionLoading ? 'Processing...' : 'Accept Mission'}
//                 </button>
//                 <button 
//                   className="reports-btn danger"
//                   onClick={() => setShowDeclineModal(true)}
//                   disabled={actionLoading}
//                 >
//                   Decline
//                 </button>
//               </>
//             )}
//           </div>
//         </div>
//       </div>

//       {/* Decline Modal */}
//       <DeclineModal
//         isOpen={showDeclineModal}
//         onClose={() => setShowDeclineModal(false)}
//         onSubmit={(reason) => onDecline?.(task.task_id, reason)}
//         taskId={task.task_id}
//       />
//     </>
//   );
// };

// // ===========================================
// // MAIN MISSION BOARD COMPONENT
// // ===========================================
// export const MissionBoard: React.FC = () => {
//   const [missions, setMissions] = useState<Mission[]>([]);
//   const [filteredMissions, setFilteredMissions] = useState<Mission[]>([]);
//   const [loading, setLoading] = useState(true);
//   const [actionLoading, setActionLoading] = useState(false);
//   const [error, setError] = useState<string | null>(null);
//   const [selectedTask, setSelectedTask] = useState<Mission | null>(null);
//   const [isTaskModalOpen, setIsTaskModalOpen] = useState(false);
//   const [activeTab, setActiveTab] = useState<'all' | 'pending' | 'active' | 'completed'>('all');
//   const [searchTerm, setSearchTerm] = useState('');
//   const [taskEvidence, setTaskEvidence] = useState<{[key: number]: TaskProof[]}>({});
//   const [taskAdminNotes, setTaskAdminNotes] = useState<{[key: number]: AdminNote[]}>({});
//   const [taskCompletionNotes, setTaskCompletionNotes] = useState<{[key: number]: CompletionNote[]}>({});
//   const [showAllActive, setShowAllActive] = useState(false);
//   const [showAllPending, setShowAllPending] = useState(false);
  
//   const { user: currentUser } = useAuth();
//   const navigate = useNavigate();

//   useEffect(() => {
//     if (!currentUser) {
//       navigate('/login');
//       return;
//     }
//     fetchMissions();
//   }, [currentUser]);

//   const fetchMissions = async () => {
//     try {
//       setLoading(true);
//       setError(null);
//       const token = localStorage.getItem('token');
      
//       const response = await fetch('http://localhost:5000/api/volunteers/tasks', {
//         headers: { 'Authorization': `Bearer ${token}` }
//       });
      
//       if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
      
//       const data = await response.json();
      
//       if (data.success && data.data) {
//         console.log('Fetched missions:', data.data);
//         setMissions(data.data);
//         setFilteredMissions(data.data);
//       }
//     } catch (err) {
//       console.error('Error fetching missions:', err);
//       setError(err instanceof Error ? err.message : 'Failed to fetch missions');
//     } finally {
//       setLoading(false);
//     }
//   };

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

//   const fetchTaskAdminNotes = async (reportId: number, taskId: number) => {
//     try {
//       const token = localStorage.getItem('token');
//       const response = await fetch(
//         `http://localhost:5000/api/reports/${reportId}/admin-notes`,
//         {
//           headers: { 'Authorization': `Bearer ${token}` }
//         }
//       );
//       const data = await response.json();
//       if (data.success) {
//         setTaskAdminNotes(prev => ({ ...prev, [taskId]: data.data }));
//       }
//     } catch (error) {
//       console.error('Error fetching admin notes:', error);
//     }
//   };

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

//   const handleAcceptTask = async (taskId: number) => {
//     try {
//       setActionLoading(true);
//       const token = localStorage.getItem('token');
//       const response = await fetch(`http://localhost:5000/api/volunteers/tasks/${taskId}/accept`, {
//         method: 'PATCH',
//         headers: {
//           'Authorization': `Bearer ${token}`,
//           'Content-Type': 'application/json'
//         }
//       });
      
//       const data = await response.json();
//       if (data.success) {
//         await fetchMissions();
//         setIsTaskModalOpen(false);
//         setSelectedTask(null);
//         alert('Mission accepted successfully!');
//       } else {
//         alert('Failed to accept task: ' + data.message);
//       }
//     } catch (error) {
//       console.error('Error accepting task:', error);
//       alert('Failed to accept task');
//     } finally {
//       setActionLoading(false);
//     }
//   };

//   const handleDeclineTask = async (taskId: number, reason: string) => {
//     try {
//       setActionLoading(true);
//       const token = localStorage.getItem('token');
//       const response = await fetch(`http://localhost:5000/api/volunteers/tasks/${taskId}/decline`, {
//         method: 'PATCH',
//         headers: {
//           'Authorization': `Bearer ${token}`,
//           'Content-Type': 'application/json'
//         },
//         body: JSON.stringify({ reason })
//       });
      
//       const data = await response.json();
//       if (data.success) {
//         await fetchMissions();
//         setIsTaskModalOpen(false);
//         setSelectedTask(null);
//         alert('Mission declined');
//       } else {
//         alert('Failed to decline task: ' + data.message);
//       }
//     } catch (error) {
//       console.error('Error declining task:', error);
//       alert('Failed to decline task');
//     } finally {
//       setActionLoading(false);
//     }
//   };

//   const handleUploadEvidence = async (taskId: number, file: File, notes: string) => {
//     try {
//       setActionLoading(true);
//       const token = localStorage.getItem('token');
      
//       // Upload proof
//       const formData = new FormData();
//       formData.append('proofs', file);
      
//       const uploadResponse = await fetch(
//         `http://localhost:5000/api/tasks/${taskId}/upload-proofs`,
//         {
//           method: 'POST',
//           headers: {
//             'Authorization': `Bearer ${token}`
//           },
//           body: formData
//         }
//       );
      
//       const uploadData = await uploadResponse.json();
      
//       if (!uploadData.success) {
//         alert('Failed to upload proof: ' + uploadData.message);
//         return;
//       }
      
//       // Save completion note
//       const noteResponse = await fetch(
//         `http://localhost:5000/api/tasks/${taskId}/completion-notes`,
//         {
//           method: 'POST',
//           headers: {
//             'Authorization': `Bearer ${token}`,
//             'Content-Type': 'application/json'
//           },
//           body: JSON.stringify({ 
//             note_text: notes,
//             volunteer_id: currentUser?.user_id 
//           })
//         }
//       );
      
//       const noteData = await noteResponse.json();
      
//       if (!noteData.success) {
//         alert('Failed to save completion note: ' + noteData.message);
//         return;
//       }
      
//       // Complete the task
//       const completeResponse = await fetch(
//         `http://localhost:5000/api/volunteers/tasks/${taskId}/complete`,
//         {
//           method: 'PATCH',
//           headers: {
//             'Authorization': `Bearer ${token}`,
//             'Content-Type': 'application/json'
//           }
//         }
//       );
      
//       const completeData = await completeResponse.json();
      
//       if (completeData.success) {
//         await fetchMissions();
//         setIsTaskModalOpen(false);
//         setSelectedTask(null);
//         alert('Mission completed successfully! Thank you for your service!');
//       } else {
//         alert('Failed to complete mission: ' + completeData.message);
//       }
//     } catch (error) {
//       console.error('Error uploading evidence:', error);
//       alert('Failed to upload evidence and complete mission');
//     } finally {
//       setActionLoading(false);
//     }
//   };

//   const handleViewTaskDetails = async (mission: Mission) => {
//     setSelectedTask(mission);
//     await Promise.all([
//       fetchTaskEvidence(mission.task_id),
//       fetchTaskAdminNotes(mission.report_id, mission.task_id),
//       fetchTaskCompletionNotes(mission.task_id)
//     ]);
//     setIsTaskModalOpen(true);
//   };

//   // Get counts for tabs
//   const pendingCount = missions.filter(m => m.task_status_id === 1).length;
//   const activeCount = missions.filter(m => m.task_status_id === 2).length;
//   const completedCount = missions.filter(m => m.task_status_id === 3).length;

//   // Filter missions based on active tab and search term
//   useEffect(() => {
//     let filtered = [...missions];

//     // Apply tab filter
//     if (activeTab !== 'all') {
//       filtered = filtered.filter(m => {
//         if (activeTab === 'pending') return m.task_status_id === 1;
//         if (activeTab === 'active') return m.task_status_id === 2;
//         if (activeTab === 'completed') return m.task_status_id === 3;
//         return true;
//       });
//     }

//     // Apply search filter
//     if (searchTerm) {
//       const term = searchTerm.toLowerCase();
//       filtered = filtered.filter(m => 
//         m.animal_type?.toLowerCase().includes(term) ||
//         m.animal_condition?.toLowerCase().includes(term) ||
//         m.location_address?.toLowerCase().includes(term) ||
//         m.reporter_name?.toLowerCase().includes(term) ||
//         m.description?.toLowerCase().includes(term)
//       );
//     }

//     setFilteredMissions(filtered);
//   }, [missions, activeTab, searchTerm]);

//   const pendingTasks = missions.filter(m => m.task_status_id === 1);
//   const activeMissions = missions.filter(m => m.task_status_id === 2);
//   const completedTasks = missions.filter(m => m.task_status_id === 3);
  
//   const displayedActiveMissions = showAllActive ? activeMissions : activeMissions.slice(0, 3);
//   const displayedPendingTasks = showAllPending ? pendingTasks : pendingTasks.slice(0, 3);

//   // Determine what to show based on active tab
//   const getDisplayedMissions = () => {
//     switch(activeTab) {
//       case 'pending':
//         return displayedPendingTasks;
//       case 'active':
//         return displayedActiveMissions;
//       case 'completed':
//         return completedTasks;
//       default:
//         return filteredMissions;
//     }
//   };

//   const displayedMissions = getDisplayedMissions();

//   return (
//     <div className="dashboard-wrapper animate-fade-in">
//       <div className="volunteer-dashboard-new" style={{ maxWidth: '1200px', margin: '0 auto' }}>
        
//         {/* Header Section */}
//         <div className="reports-header" style={{ marginBottom: '2rem' }}>
//           <div className="reports-header-content">
//             <h1 className="reports-title">Mission Board</h1>
//             <p className="reports-subtitle">
//               Welcome back, {currentUser?.username}! Review and manage your missions.
//             </p>
//           </div>
//           <div className="reports-header-actions">
//             <Link to="/dashboard" className="reports-btn refresh">
//               <span className="btn-icon">🏠</span>
//               Back to Dashboard
//             </Link>
//           </div>
//         </div>

//         {/* Tabs and Filters */}
//         <div className="reports-filters-card" style={{ marginBottom: '2rem', padding: '1.5rem' }}>
//           {/* Tabs */}
//           <div style={{ 
//             display: 'flex', 
//             gap: '0.5rem',
//             marginBottom: '1.5rem',
//             borderBottom: '2px solid var(--border)',
//             paddingBottom: '1rem',
//             flexWrap: 'wrap'
//           }}>
//             <button
//               onClick={() => setActiveTab('all')}
//               className={`tab-btn ${activeTab === 'all' ? 'active' : ''}`}
//               style={{
//                 padding: '0.5rem 1rem',
//                 background: activeTab === 'all' ? '#1e3f1a' : 'transparent',
//                 color: activeTab === 'all' ? 'white' : '#1e3f1a',
//                 border: '1px solid #1e3f1a',
//                 borderRadius: '8px',
//                 cursor: 'pointer',
//                 fontWeight: '600',
//                 transition: 'all 0.2s ease'
//               }}
//             >
//               All ({missions.length})
//             </button>
//             <button
//               onClick={() => setActiveTab('pending')}
//               className={`tab-btn ${activeTab === 'pending' ? 'active' : ''}`}
//               style={{
//                 padding: '0.5rem 1rem',
//                 background: activeTab === 'pending' ? '#1e3f1a' : 'transparent',
//                 color: activeTab === 'pending' ? 'white' : '#1e3f1a',
//                 border: '1px solid #1e3f1a',
//                 borderRadius: '8px',
//                 cursor: 'pointer',
//                 fontWeight: '600',
//                 transition: 'all 0.2s ease'
//               }}
//             >
//               Pending ({pendingCount})
//             </button>
//             <button
//               onClick={() => setActiveTab('active')}
//               className={`tab-btn ${activeTab === 'active' ? 'active' : ''}`}
//               style={{
//                 padding: '0.5rem 1rem',
//                 background: activeTab === 'active' ? '#1e3f1a' : 'transparent',
//                 color: activeTab === 'active' ? 'white' : '#1e3f1a',
//                 border: '1px solid #1e3f1a',
//                 borderRadius: '8px',
//                 cursor: 'pointer',
//                 fontWeight: '600',
//                 transition: 'all 0.2s ease'
//               }}
//             >
//               Active ({activeCount})
//             </button>
//             <button
//               onClick={() => setActiveTab('completed')}
//               className={`tab-btn ${activeTab === 'completed' ? 'active' : ''}`}
//               style={{
//                 padding: '0.5rem 1rem',
//                 background: activeTab === 'completed' ? '#1e3f1a' : 'transparent',
//                 color: activeTab === 'completed' ? 'white' : '#1e3f1a',
//                 border: '1px solid #1e3f1a',
//                 borderRadius: '8px',
//                 cursor: 'pointer',
//                 fontWeight: '600',
//                 transition: 'all 0.2s ease'
//               }}
//             >
//               Completed ({completedCount})
//             </button>
//           </div>

//           {/* Search Bar */}
//           <div style={{ 
//             display: 'flex', 
//             justifyContent: 'space-between',
//             alignItems: 'center',
//             gap: '1rem',
//             flexWrap: 'wrap'
//           }}>
//             <div style={{ flex: 1, minWidth: '250px' }}>
//               <input
//                 type="text"
//                 placeholder="Search missions..."
//                 value={searchTerm}
//                 onChange={(e) => setSearchTerm(e.target.value)}
//                 style={{
//                   width: '100%',
//                   padding: '0.75rem 1rem',
//                   border: '2px solid #1e3f1a',
//                   borderRadius: '8px',
//                   fontSize: '0.95rem',
//                   background: 'white'
//                 }}
//               />
//             </div>
//             <div style={{ 
//               background: '#e8f0e0', 
//               padding: '0.5rem 1rem',
//               borderRadius: '8px',
//               color: '#1e3f1a',
//               fontWeight: '600',
//               whiteSpace: 'nowrap'
//             }}>
//               {filteredMissions.length} Mission{filteredMissions.length !== 1 ? 's' : ''}
//             </div>
//           </div>
//         </div>

//         {/* Missions Grid */}
//         <div className="reports-section">
//           {loading ? (
//             <div className="reports-loading-container">
//               <div className="reports-loader">
//                 <div className="reports-spinner"></div>
//                 <p className="reports-loader-text">Loading missions...</p>
//               </div>
//             </div>
//           ) : error ? (
//             <div className="reports-empty-state">
//               <span className="empty-state-emoji">❌</span>
//               <h3 style={{ color: '#1e3f1a' }}>Error Loading Missions</h3>
//               <p>{error}</p>
//               <button onClick={fetchMissions} className="reports-btn primary" style={{ background: '#1e3f1a' }}>
//                 Retry
//               </button>
//             </div>
//           ) : displayedMissions.length === 0 ? (
//             <div className="reports-empty-state">
//               <span className="empty-state-emoji">
//                 {activeTab === 'all' ? '📋' : 
//                  activeTab === 'pending' ? '⏳' :
//                  activeTab === 'active' ? '🎯' : '✅'}
//               </span>
//               <h3 style={{ color: '#1e3f1a' }}>No {activeTab} missions</h3>
//               <p>
//                 {activeTab === 'all' && "There are no missions available."}
//                 {activeTab === 'pending' && "You don't have any pending missions."}
//                 {activeTab === 'active' && "You're not on any active missions."}
//                 {activeTab === 'completed' && "No completed missions yet."}
//               </p>
//             </div>
//           ) : (
//             <div className="reports-grid" style={{ gridTemplateColumns: 'repeat(3, 1fr)' }}>
//               {displayedMissions.map((mission) => {
//                 const statusBadge = getTaskStatusBadge(mission.task_status_id);
//                 const hasEvidence = taskEvidence[mission.task_id]?.length > 0;
                
//                 return (
//                   <div 
//                     key={mission.task_id} 
//                     className="reports-card"
//                     onClick={() => handleViewTaskDetails(mission)}
//                     style={{ cursor: 'pointer', borderColor: '#1e3f1a' }}
//                   >
//                     <div className="reports-card-header" style={{ background: '#1e3f1a' }}>
//                       <div className="reports-card-title">
//                         <span className="reports-id" style={{ background: 'rgba(255,255,255,0.2)', color: 'white' }}>
//                           #{mission.report_id}
//                         </span>
//                         <span className="reports-status" style={{ background: 'rgba(255,255,255,0.2)', color: 'white' }}>
//                           {statusBadge.text}
//                         </span>
//                       </div>
//                       <div className="reports-date" style={{ color: 'rgba(255,255,255,0.9)' }}>
//                         {formatRelativeTime(mission.submitted_at)}
//                       </div>
//                       {mission.task_status_id === 2 && (
//                         <div className="reports-volunteer-tag" style={{ color: 'white', fontSize: '0.8rem', fontWeight: '600', marginTop: '5px' }}>
//                           {currentUser?.username?.toUpperCase()}
//                         </div>
//                       )}
//                     </div>

//                     <div className="reports-card-body">
//                       <div className="reports-animal-section">
//                         <div className="reports-animal-icon large">
//                           {getAnimalEmoji(mission.animal_type)}
//                         </div>
//                         <div className="reports-animal-info">
//                           <h4 style={{ color: '#1e3f1a' }}>{mission.animal_type || 'Unknown Animal'}</h4>
//                           <span className="reports-condition" style={{ 
//                             background: '#e8f0e0', 
//                             color: '#1e3f1a', 
//                             border: '1px solid #1e3f1a'
//                           }}>
//                             {mission.animal_condition || 'Unknown'}
//                           </span>
//                         </div>
//                       </div>

//                       <div className="reports-location-section">
//                         <span className="location-icon">📍</span>
//                         <span className="location-text">{mission.location_address}</span>
//                       </div>

//                       <div className="reports-volunteer-section">
//                         <div className="reports-assigned-ranger" style={{ background: '#e8f0e0' }}>
//                           <div className="ranger-avatar" style={{ background: '#1e3f1a' }}>
//                             {mission.reporter_name?.charAt(0).toUpperCase() || '?'}
//                           </div>
//                           <div className="ranger-info">
//                             <span className="ranger-name">{mission.reporter_name || 'Anonymous'}</span>
//                             <span className="ranger-role">Reporter</span>
//                             {mission.reporter_phone && mission.reporter_phone !== 'No phone' && (
//                               <span className="ranger-phone" style={{ fontSize: '0.75rem', color: '#1e3f1a' }}>
//                                 📱 {mission.reporter_phone}
//                               </span>
//                             )}
//                           </div>
//                         </div>
//                       </div>
                      
//                       <p className="reports-description" style={{ 
//                         fontSize: '0.85rem', 
//                         marginBottom: '0.5rem',
//                         color: '#666'
//                       }}>
//                         {mission.description?.length > 80 
//                           ? `${mission.description.substring(0, 80)}...` 
//                           : mission.description || 'No description provided'}
//                       </p>

//                       {hasEvidence && (
//                         <div className="evidence-indicator">
//                           <span style={{ color: '#1e3f1a', fontSize: '0.8rem', fontWeight: '600' }}>
//                             📸 Evidence Uploaded
//                           </span>
//                         </div>
//                       )}
//                     </div>

//                     <div className="reports-card-footer">
//                       <button 
//                         className="reports-btn"
//                         style={{ 
//                           width: '100%',
//                           background: '#1e3f1a',
//                           color: 'white',
//                           padding: '0.6rem',
//                           fontSize: '0.85rem',
//                           fontWeight: '600',
//                           border: 'none',
//                           borderRadius: '4px',
//                           cursor: 'pointer'
//                         }}
//                       >
//                         View Details →
//                       </button>
//                     </div>
//                   </div>
//                 );
//               })}
//             </div>
//           )}
//         </div>

//         {/* Show More buttons for pending and active tabs */}
//         {activeTab === 'pending' && pendingTasks.length > 3 && !showAllPending && (
//           <div className="view-all-container" style={{ marginTop: '1rem', textAlign: 'center' }}>
//             <button 
//               onClick={() => setShowAllPending(true)}
//               className="view-all-link"
//               style={{ color: '#1e3f1a', borderColor: '#1e3f1a' }}
//             >
//               View All {pendingTasks.length} Pending Missions →
//             </button>
//           </div>
//         )}

//         {activeTab === 'active' && activeMissions.length > 3 && !showAllActive && (
//           <div className="view-all-container" style={{ marginTop: '1rem', textAlign: 'center' }}>
//             <button 
//               onClick={() => setShowAllActive(true)}
//               className="view-all-link"
//               style={{ color: '#1e3f1a', borderColor: '#1e3f1a' }}
//             >
//               View All {activeMissions.length} Active Missions →
//             </button>
//           </div>
//         )}
//       </div>

//       {/* Task Detail Modal */}
//       {selectedTask && (
//         <TaskDetailModal 
//           task={selectedTask}
//           isOpen={isTaskModalOpen}
//           onClose={() => {
//             setIsTaskModalOpen(false);
//             setSelectedTask(null);
//           }}
//           onAccept={handleAcceptTask}
//           onDecline={handleDeclineTask}
//           onUploadEvidence={handleUploadEvidence}
//           actionLoading={actionLoading}
//           userProfile={currentUser}
//           evidence={taskEvidence[selectedTask.task_id]}
//           adminNotes={taskAdminNotes[selectedTask.task_id]}
//           completionNotes={taskCompletionNotes[selectedTask.task_id]}
//         />
//       )}
//     </div>
//   );
// };

// export default MissionBoard;

import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../../../context/AuthContext';
import './MissionBoard.css';

interface Mission {
  task_id: number;
  report_id: number;
  assigned_to_user_id: number;
  assigned_by_user_id: number;
  task_status_id: number;
  task_status: string;
  assigned_at: string;
  started_at?: string;
  completed_at?: string;
  volunteer_responded_at?: string;
  volunteer_response?: string;
  declined_reason?: string;
  
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
  reporter_name: string;
  reporter_phone: string;
  reporter_email: string;
  
  // Volunteer fields
  volunteer_name: string;
  volunteer_email: string;
  volunteer_phone: string;
}

interface TaskProof {
  proof_id: number;
  task_id: number;
  proof_url: string;
  uploaded_at: string;
}

interface AdminNote {
  note_id: number;
  report_id: number;
  admin_id: number;
  note_text: string;
  created_at: string;
  admin_name?: string;
}

interface CompletionNote {
  note_id: number;
  task_id: number;
  volunteer_id: number;
  note_text: string;
  created_at: string;
  volunteer_name?: string;
}

// Helper functions
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

const formatDate = (dateString: string): string => {
  if (!dateString || dateString === 'Not available' || dateString === 'Invalid date' || dateString === '') {
    return 'Not available';
  }
  try {
    const date = new Date(dateString);
    if (isNaN(date.getTime())) return 'Not available';
    return date.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  } catch (e) {
    return 'Not available';
  }
};

const formatShortDate = (dateString: string): string => {
  if (!dateString || dateString === 'Not available' || dateString === 'Invalid date' || dateString === '') {
    return 'Not available';
  }
  try {
    const date = new Date(dateString);
    if (isNaN(date.getTime())) return 'Not available';
    return date.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    });
  } catch (e) {
    return 'Not available';
  }
};

const formatRelativeTime = (dateString: string): string => {
  if (!dateString || dateString === 'Not available' || dateString === 'Invalid date' || dateString === '') {
    return 'Not available';
  }
  try {
    const date = new Date(dateString);
    if (isNaN(date.getTime())) return 'Not available';
    
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
  } catch (e) {
    return 'Not available';
  }
};

const getTaskStatusBadge = (statusId: number | undefined): { text: string; class: string; color: string } => {
  switch(statusId) {
    case 1: return { text: 'PENDING', class: 'pending', color: '#1e3f1a' };
    case 2: return { text: 'ACTIVE', class: 'active', color: '#1e3f1a' };
    case 3: return { text: 'COMPLETED', class: 'completed', color: '#1e3f1a' };
    case 4: return { text: 'DECLINED', class: 'declined', color: '#1e3f1a' };
    default: return { text: 'UNKNOWN', class: 'unknown', color: '#1e3f1a' };
  }
};

// FIXED: Image URL helper
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

// ===========================================
// COMPLETE MISSION MODAL
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
  const [uploading, setUploading] = useState(false);

  if (!isOpen) return null;

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const files = Array.from(e.target.files);
      setProofFiles(prev => [...prev, ...files]);
      
      const newPreviews = files.map(file => URL.createObjectURL(file));
      setPreviewUrls(prev => [...prev, ...newPreviews]);
    }
  };

  const removeFile = (index: number) => {
    setProofFiles(prev => prev.filter((_, i) => i !== index));
    URL.revokeObjectURL(previewUrls[index]);
    setPreviewUrls(prev => prev.filter((_, i) => i !== index));
  };

  const handleSubmit = async () => {
    if (proofFiles.length === 0) {
      alert('Please upload at least one proof photo');
      return;
    }
    if (!notes.trim()) {
      alert('Please enter completion notes');
      return;
    }
    
    setUploading(true);
    try {
      await onSubmit(proofFiles, notes);
      previewUrls.forEach(url => URL.revokeObjectURL(url));
      setProofFiles([]);
      setNotes('');
      setPreviewUrls([]);
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
                  <div className="proofs-grid" style={{ 
                    display: 'grid', 
                    gridTemplateColumns: 'repeat(2, 1fr)', 
                    gap: '10px',
                    marginBottom: '15px'
                  }}>
                    {previewUrls.map((url, index) => (
                      <div key={index} className="proof-item" style={{ position: 'relative' }}>
                        <img 
                          src={url} 
                          alt={`Proof ${index + 1}`} 
                          style={{ 
                            width: '100%',
                            height: '100px',
                            objectFit: 'cover',
                            borderRadius: '4px'
                          }} 
                        />
                        <button 
                          onClick={() => removeFile(index)}
                          style={{
                            position: 'absolute',
                            top: '5px',
                            right: '5px',
                            background: '#c62828',
                            color: 'white',
                            border: 'none',
                            borderRadius: '50%',
                            width: '25px',
                            height: '25px',
                            cursor: 'pointer',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            fontSize: '16px',
                            fontWeight: 'bold'
                          }}
                        >
                          ×
                        </button>
                      </div>
                    ))}
                  </div>
                  <label className="reports-btn change-photo" style={{ 
                    background: 'transparent',
                    color: '#2D5A27',
                    border: '1px solid #2D5A27',
                    padding: '8px 16px',
                    borderRadius: '8px',
                    cursor: 'pointer',
                    display: 'inline-block',
                    fontSize: '0.9rem',
                    fontWeight: '600'
                  }}>
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
                <div className="photo-upload-placeholder" style={{
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  padding: '2rem',
                  background: '#f9f5ec',
                  borderRadius: '8px',
                  border: '2px dashed #2D5A27'
                }}>
                  <span className="upload-icon" style={{ fontSize: '3rem', marginBottom: '1rem' }}>📷</span>
                  <p style={{ marginBottom: '0.5rem', color: '#333' }}>Upload proof photos of the rescue</p>
                  <p className="upload-hint" style={{ fontSize: '0.8rem', color: '#666', marginBottom: '1rem' }}>
                    This is required to complete the mission
                  </p>
                  <label className="reports-btn primary upload-btn" style={{ 
                    background: '#2D5A27',
                    color: 'white',
                    padding: '10px 20px',
                    borderRadius: '8px',
                    cursor: 'pointer',
                    fontSize: '0.9rem',
                    fontWeight: '600',
                    border: 'none'
                  }}>
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
              Completion Notes <span className="required">*</span>
            </label>
            <textarea
              className="form-textarea"
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder="Describe the rescue outcome, any challenges, and the animal's condition..."
              rows={4}
              maxLength={500}
              style={{
                width: '100%',
                padding: '10px',
                border: '2px solid #2D5A27',
                borderRadius: '8px',
                fontFamily: 'inherit',
                fontSize: '0.95rem',
                resize: 'vertical'
              }}
            />
            <p style={{ fontSize: '0.75rem', color: '#666', marginTop: '5px', textAlign: 'right' }}>
              {notes.length}/500 characters
            </p>
          </div>
        </div>
        
        <div className="modal-footer">
          <button className="modal-btn secondary" onClick={onClose}>
            Cancel
          </button>
          <button 
            className="modal-btn primary" 
            onClick={handleSubmit}
            disabled={proofFiles.length === 0 || !notes.trim() || uploading}
            style={{ 
              background: proofFiles.length === 0 || !notes.trim() ? '#ccc' : '#2D5A27',
              color: 'white',
              border: 'none',
              opacity: proofFiles.length === 0 || !notes.trim() ? 0.6 : 1,
              cursor: proofFiles.length === 0 || !notes.trim() ? 'not-allowed' : 'pointer'
            }}
          >
            {uploading ? 'Uploading...' : 'Complete Mission'}
          </button>
        </div>
      </div>
    </div>
  );
};

// Decline Modal Component
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
        <div className="modal-header" style={{ background: 'linear-gradient(135deg, #2D5A27 0%, #1e3f1a 100%)' }}>
          <div className="modal-header-left">
            <span className="modal-icon">❌</span>
            <div>
              <h3 className="modal-title">Decline Mission</h3>
              <p className="modal-subtitle">Task #{taskId}</p>
            </div>
          </div>
          <button className="modal-close" onClick={onClose}>×</button>
        </div>
        
        <div className="modal-body">
          <div className="decline-info">
            <p>Please provide a reason for declining this mission.</p>
          </div>
          
          <div className="form-group">
            <label className="form-label">
              Reason <span className="required">*</span>
            </label>
            <select 
              className="form-select"
              value={reason}
              onChange={(e) => setReason(e.target.value)}
              style={{
                width: '100%',
                padding: '10px',
                border: '2px solid #2D5A27',
                borderRadius: '8px',
                fontSize: '0.95rem'
              }}
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
                style={{
                  width: '100%',
                  padding: '10px',
                  border: '2px solid #2D5A27',
                  borderRadius: '8px',
                  fontSize: '0.95rem',
                  resize: 'vertical'
                }}
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
            style={{
              background: '#c62828',
              color: 'white',
              border: 'none',
              opacity: !reason || (reason === 'other' && !otherReason) ? 0.6 : 1,
              cursor: !reason || (reason === 'other' && !otherReason) ? 'not-allowed' : 'pointer'
            }}
          >
            Decline Mission
          </button>
        </div>
      </div>
    </div>
  );
};

// ===========================================
// TASK DETAIL MODAL
// ===========================================
const TaskDetailModal: React.FC<{
  task: Mission | null;
  isOpen: boolean;
  onClose: () => void;
  onAccept?: (taskId: number) => void;
  onDecline?: (taskId: number, reason: string) => void;
  onUploadEvidence?: (taskId: number, file: File, notes: string) => void;
  actionLoading?: boolean;
  userProfile?: any;
  evidence?: TaskProof[];
  adminNotes?: AdminNote[];
  completionNotes?: CompletionNote[];
}> = ({ 
  task, 
  isOpen, 
  onClose, 
  onAccept, 
  onDecline, 
  onUploadEvidence,
  actionLoading,
  userProfile,
  evidence = [], 
  adminNotes = [],
  completionNotes = []
}) => {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [showUploadForm, setShowUploadForm] = useState(false);
  const [proofFile, setProofFile] = useState<File | null>(null);
  const [completionNote, setCompletionNote] = useState('');
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [uploadError, setUploadError] = useState<string | null>(null);
  const [uploading, setUploading] = useState(false);
  const [showDeclineModal, setShowDeclineModal] = useState(false);
  const [imageErrors, setImageErrors] = useState<Record<number, boolean>>({});

  if (!isOpen || !task) return null;

  const hasProofs = evidence.length > 0;

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
        if (previewUrl) {
          URL.revokeObjectURL(previewUrl);
        }
        
        setProofFile(file);
        const newPreview = URL.createObjectURL(file);
        setPreviewUrl(newPreview);
      }
    }
  };

  const removeFile = () => {
    if (previewUrl) {
      URL.revokeObjectURL(previewUrl);
    }
    setProofFile(null);
    setPreviewUrl(null);
    setUploadError(null);
  };

  const handleUploadSubmit = async () => {
    if (!proofFile) {
      setUploadError('Please select a photo');
      return;
    }
    if (!completionNote.trim()) {
      setUploadError('Please enter completion notes');
      return;
    }
    
    setUploading(true);
    try {
      await onUploadEvidence?.(task.task_id, proofFile, completionNote);
      setShowUploadForm(false);
      setProofFile(null);
      setCompletionNote('');
      setPreviewUrl(null);
    } catch (error) {
      console.error('Upload error:', error);
    } finally {
      setUploading(false);
    }
  };

  const handleImageError = (proofId: number, url: string) => {
    console.log(`Image failed to load for proof ID: ${proofId}, URL: ${url}`);
    setImageErrors(prev => ({ ...prev, [proofId]: true }));
  };

  const statusBadge = getTaskStatusBadge(task.task_status_id);

  return (
    <>
      <div className="reports-modal-overlay" onClick={onClose}>
        <div className="reports-modal-content large" onClick={e => e.stopPropagation()}>
          <div className="reports-modal-header dark" style={{ background: '#1e3f1a' }}>
            <div>
              <h3>Mission #{task.report_id}</h3>
              <div className="reports-modal-subheader">
                <span className={`reports-status-badge`} style={{ 
                  background: 'rgba(255,255,255,0.2)',
                  color: 'white',
                  padding: '0.25rem 0.75rem',
                  borderRadius: '20px',
                  fontSize: '0.75rem',
                  fontWeight: '600',
                  textTransform: 'uppercase'
                }}>
                  {statusBadge.text}
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
                {/* Animal Information */}
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

                {/* Reporter Details */}
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
                      {task.reporter_email && task.reporter_email !== 'No email' && (
                        <div className="reports-detail-row">
                          <span className="reports-detail-label">Email</span>
                          <span className="reports-detail-value">
                            <span className="email-icon">✉️</span>
                            {task.reporter_email}
                          </span>
                        </div>
                      )}
                      {task.reporter_phone && task.reporter_phone !== 'No phone' && (
                        <div className="reports-detail-row">
                          <span className="reports-detail-label">Phone</span>
                          <span className="reports-detail-value">{task.reporter_phone}</span>
                        </div>
                      )}
                    </div>
                  </div>
                </div>

                {/* Location */}
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

                {/* Timeline */}
                <div className="reports-info-card">
                  <div className="reports-card-header beige">
                    <h4>⏱️ Timeline</h4>
                  </div>
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
                      {task.completed_at && (
                        <div className="reports-detail-row">
                          <span className="reports-detail-label">Completed</span>
                          <span className="reports-detail-value">{formatDate(task.completed_at)}</span>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>

              <div className="reports-detail-column">
                {/* Mission Description */}
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

                {/* Evidence Section */}
                <div className="reports-info-card">
                  <div className="reports-card-header beige">
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <h4>📸 Evidence Photos</h4>
                      {task.task_status_id === 2 && onUploadEvidence && !hasProofs && !showUploadForm && (
                        <button 
                          className="reports-btn primary small"
                          onClick={() => setShowUploadForm(true)}
                          style={{ 
                            background: '#2D5A27',
                            color: 'white',
                            padding: '4px 12px',
                            fontSize: '0.8rem',
                            border: 'none',
                            borderRadius: '4px',
                            cursor: 'pointer',
                            fontWeight: '600'
                          }}
                        >
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
                        <div style={{ 
                          display: 'grid', 
                          gridTemplateColumns: 'repeat(2, 1fr)', 
                          gap: '15px',
                          marginTop: '10px'
                        }}>
                          {evidence.map((proof) => {
                            const imageUrl = getFullImageUrl(proof.proof_url);
                            const hasError = imageErrors[proof.proof_id];
                            
                            return (
                              <div 
                                key={proof.proof_id} 
                                style={{ 
                                  border: '1px solid #e8dfc9',
                                  borderRadius: '8px',
                                  padding: '8px',
                                  background: '#f9f5ec',
                                  cursor: 'pointer'
                                }}
                                onClick={() => !hasError && setSelectedImage(imageUrl)}
                              >
                                {!hasError ? (
                                  <img 
                                    src={imageUrl} 
                                    alt={`Evidence ${proof.proof_id}`}
                                    style={{ 
                                      width: '100%',
                                      height: '120px',
                                      objectFit: 'cover',
                                      borderRadius: '4px'
                                    }}
                                    onError={() => handleImageError(proof.proof_id, imageUrl)}
                                  />
                                ) : (
                                  <div style={{
                                    width: '100%',
                                    height: '120px',
                                    display: 'flex',
                                    flexDirection: 'column',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    background: '#e8f0e0',
                                    borderRadius: '4px',
                                    color: '#2D5A27',
                                    fontSize: '0.9rem',
                                    padding: '10px',
                                    textAlign: 'center'
                                  }}>
                                    <span style={{ fontSize: '2rem', marginBottom: '5px' }}>📷</span>
                                    <span>Image unavailable</span>
                                    <span style={{ fontSize: '0.7rem', marginTop: '5px', color: '#666', wordBreak: 'break-all' }}>
                                      {proof.proof_url}
                                    </span>
                                  </div>
                                )}
                                <p style={{ 
                                  fontSize: '0.7rem', 
                                  textAlign: 'center', 
                                  marginTop: '5px',
                                  color: '#666'
                                }}>
                                  Uploaded: {formatShortDate(proof.uploaded_at)}
                                </p>
                              </div>
                            );
                          })}
                        </div>
                      </div>
                    ) : (
                      <div>
                        {showUploadForm ? (
                          <div className="upload-form">
                            {uploadError && (
                              <div className="error-message" style={{ marginBottom: '10px', color: '#c62828' }}>
                                {uploadError}
                              </div>
                            )}

                            {previewUrl ? (
                              <div className="single-photo-preview">
                                <div className="preview-container" style={{ position: 'relative', display: 'inline-block', width: '100%' }}>
                                  <img 
                                    src={previewUrl} 
                                    alt="Preview" 
                                    style={{ 
                                      width: '100%',
                                      maxHeight: '200px',
                                      objectFit: 'contain',
                                      borderRadius: '4px'
                                    }} 
                                  />
                                  <button 
                                    onClick={removeFile}
                                    style={{
                                      position: 'absolute',
                                      top: '5px',
                                      right: '5px',
                                      background: '#c62828',
                                      color: 'white',
                                      border: 'none',
                                      borderRadius: '50%',
                                      width: '25px',
                                      height: '25px',
                                      cursor: 'pointer',
                                      display: 'flex',
                                      alignItems: 'center',
                                      justifyContent: 'center',
                                      fontSize: '16px',
                                      fontWeight: 'bold'
                                    }}
                                  >
                                    ×
                                  </button>
                                </div>
                                <p style={{ fontSize: '0.8rem', marginTop: '5px' }}>
                                  {proofFile?.name} ({(proofFile!.size / 1024).toFixed(1)} KB)
                                </p>
                              </div>
                            ) : (
                              <div style={{ marginBottom: '15px' }}>
                                <label className="reports-btn primary" style={{ 
                                  cursor: 'pointer',
                                  background: '#2D5A27',
                                  color: 'white',
                                  padding: '8px 16px',
                                  borderRadius: '4px',
                                  border: 'none',
                                  fontSize: '0.9rem',
                                  fontWeight: '600'
                                }}>
                                  Choose Photo
                                  <input
                                    type="file"
                                    accept="image/jpeg,image/png,image/jpg,image/gif"
                                    onChange={handleFileChange}
                                    style={{ display: 'none' }}
                                  />
                                </label>
                              </div>
                            )}

                            <div style={{ marginTop: '15px' }}>
                              <label style={{ fontWeight: 'bold', display: 'block', marginBottom: '5px', color: '#333' }}>
                                Completion Notes <span style={{ color: '#c62828' }}>*</span>
                              </label>
                              <textarea
                                value={completionNote}
                                onChange={(e) => setCompletionNote(e.target.value)}
                                placeholder="Describe the rescue outcome, any challenges, and the animal's condition..."
                                rows={3}
                                maxLength={500}
                                style={{
                                  width: '100%',
                                  padding: '8px',
                                  border: '1px solid #ccc',
                                  borderRadius: '4px',
                                  fontFamily: 'inherit',
                                  fontSize: '0.9rem'
                                }}
                              />
                              <p style={{ fontSize: '0.75rem', color: '#666', marginTop: '5px', textAlign: 'right' }}>
                                {completionNote.length}/500 characters
                              </p>
                            </div>

                            <div style={{ display: 'flex', gap: '10px', marginTop: '15px' }}>
                              <button 
                                className="reports-btn secondary"
                                onClick={() => {
                                  setShowUploadForm(false);
                                  setProofFile(null);
                                  setCompletionNote('');
                                  setPreviewUrl(null);
                                  setUploadError(null);
                                }}
                                style={{
                                  background: 'transparent',
                                  color: '#666',
                                  border: '1px solid #ccc',
                                  padding: '8px 16px',
                                  borderRadius: '4px',
                                  cursor: 'pointer',
                                  fontWeight: '600'
                                }}
                              >
                                Cancel
                              </button>
                              <button 
                                className="reports-btn primary"
                                onClick={handleUploadSubmit}
                                disabled={!proofFile || !completionNote.trim() || uploading}
                                style={{
                                  background: !proofFile || !completionNote.trim() ? '#ccc' : '#2D5A27',
                                  color: 'white',
                                  border: 'none',
                                  padding: '8px 16px',
                                  borderRadius: '4px',
                                  cursor: !proofFile || !completionNote.trim() ? 'not-allowed' : 'pointer',
                                  fontWeight: '600'
                                }}
                              >
                                {uploading ? 'Uploading...' : 'Submit Evidence'}
                              </button>
                            </div>
                          </div>
                        ) : (
                          <div style={{ 
                            padding: '20px', 
                            textAlign: 'center', 
                            background: '#f9f5ec', 
                            borderRadius: '8px',
                            color: '#666'
                          }}>
                            <span style={{ fontSize: '2rem', display: 'block', marginBottom: '8px' }}>📷</span>
                            <p>No evidence uploaded yet.</p>
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                </div>

                {/* Completion Notes Section */}
                {completionNotes.length > 0 && (
                  <div className="reports-info-card">
                    <div className="reports-card-header beige">
                      <h4>✅ Completion Notes</h4>
                    </div>
                    <div className="reports-card-content">
                      <div className="completion-notes-container">
                        {completionNotes.map((note) => (
                          <div key={note.note_id} className="completion-note-item" style={{
                            background: '#e8f5e9',
                            padding: '15px',
                            borderRadius: '8px',
                            marginBottom: '10px',
                            border: '1px solid #2D5A27'
                          }}>
                            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '10px' }}>
                              <span style={{ fontWeight: 'bold', color: '#2D5A27' }}>
                                {note.volunteer_name || 'Volunteer'}
                              </span>
                              <span style={{ fontSize: '0.75rem', color: '#666' }}>
                                {formatDate(note.created_at)}
                              </span>
                            </div>
                            <p style={{ margin: 0, fontSize: '0.95rem', lineHeight: '1.5', color: '#333' }}>
                              {note.note_text}
                            </p>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                )}

                {/* Admin Notes */}
                {adminNotes.length > 0 && (
                  <div className="reports-info-card">
                    <div className="reports-card-header beige">
                      <h4>📌 Admin Notes</h4>
                    </div>
                    <div className="reports-card-content">
                      <div className="admin-notes-container">
                        {adminNotes.map((note) => (
                          <div key={note.note_id} className="admin-note-item" style={{
                            background: '#f9f5ec',
                            padding: '12px',
                            borderRadius: '8px',
                            marginBottom: '10px',
                            borderLeft: '3px solid #2D5A27'
                          }}>
                            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '6px' }}>
                              <span style={{ fontWeight: 'bold', color: '#2D5A27' }}>
                                {note.admin_name || 'Admin'}
                              </span>
                              <span style={{ fontSize: '0.75rem', color: '#666' }}>
                                {formatRelativeTime(note.created_at)}
                              </span>
                            </div>
                            <p style={{ margin: 0, fontSize: '0.95rem', lineHeight: '1.5' }}>
                              {note.note_text}
                            </p>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Image Lightbox */}
            {selectedImage && (
              <div 
                className="image-lightbox" 
                onClick={() => setSelectedImage(null)} 
                style={{
                  position: 'fixed',
                  top: 0,
                  left: 0,
                  right: 0,
                  bottom: 0,
                  background: 'rgba(0,0,0,0.9)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  zIndex: 2000
                }}
              >
                <img 
                  src={selectedImage} 
                  alt="Enlarged evidence" 
                  style={{ maxWidth: '90%', maxHeight: '90%', objectFit: 'contain' }} 
                />
                <button 
                  onClick={() => setSelectedImage(null)} 
                  style={{
                    position: 'absolute',
                    top: '20px',
                    right: '20px',
                    background: 'white',
                    border: 'none',
                    borderRadius: '50%',
                    width: '40px',
                    height: '40px',
                    fontSize: '20px',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center'
                  }}
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
            {task.task_status_id === 1 && onAccept && onDecline && (
              <>
                <button 
                  className="reports-btn primary"
                  onClick={() => onAccept(task.task_id)}
                  disabled={actionLoading}
                  style={{ background: '#2D5A27', color: 'white', border: 'none' }}
                >
                  {actionLoading ? 'Processing...' : 'Accept Mission'}
                </button>
                <button 
                  className="reports-btn danger"
                  onClick={() => setShowDeclineModal(true)}
                  disabled={actionLoading}
                >
                  Decline
                </button>
              </>
            )}
          </div>
        </div>
      </div>

      {/* Decline Modal */}
      <DeclineModal
        isOpen={showDeclineModal}
        onClose={() => setShowDeclineModal(false)}
        onSubmit={(reason) => onDecline?.(task.task_id, reason)}
        taskId={task.task_id}
      />
    </>
  );
};

// ===========================================
// MAIN MISSION BOARD COMPONENT
// ===========================================
export const MissionBoard: React.FC = () => {
  const [missions, setMissions] = useState<Mission[]>([]);
  const [filteredMissions, setFilteredMissions] = useState<Mission[]>([]);
  const [loading, setLoading] = useState(true);
  const [actionLoading, setActionLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [selectedTask, setSelectedTask] = useState<Mission | null>(null);
  const [isTaskModalOpen, setIsTaskModalOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<'all' | 'pending' | 'active' | 'completed'>('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [taskEvidence, setTaskEvidence] = useState<{[key: number]: TaskProof[]}>({});
  const [taskAdminNotes, setTaskAdminNotes] = useState<{[key: number]: AdminNote[]}>({});
  const [taskCompletionNotes, setTaskCompletionNotes] = useState<{[key: number]: CompletionNote[]}>({});
  const [showAllActive, setShowAllActive] = useState(false);
  const [showAllPending, setShowAllPending] = useState(false);
  const [taskDetails, setTaskDetails] = useState<{[key: number]: Mission}>({});
  
  const { user: currentUser } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!currentUser) {
      navigate('/login');
      return;
    }
    fetchMissions();
  }, [currentUser]);

  const fetchMissions = async () => {
    try {
      setLoading(true);
      setError(null);
      const token = localStorage.getItem('token');
      
      const response = await fetch('http://localhost:5000/api/volunteers/tasks', {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      
      if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
      
      const data = await response.json();
      
      if (data.success && data.data) {
        console.log('Fetched missions:', data.data);
        setMissions(data.data);
        setFilteredMissions(data.data);
      }
    } catch (err) {
      console.error('Error fetching missions:', err);
      setError(err instanceof Error ? err.message : 'Failed to fetch missions');
    } finally {
      setLoading(false);
    }
  };

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

  const fetchTaskAdminNotes = async (reportId: number, taskId: number) => {
    try {
      const token = localStorage.getItem('token');
      const response = await fetch(
        `http://localhost:5000/api/reports/${reportId}/admin-notes`,
        {
          headers: { 'Authorization': `Bearer ${token}` }
        }
      );
      const data = await response.json();
      if (data.success) {
        setTaskAdminNotes(prev => ({ ...prev, [taskId]: data.data }));
      }
    } catch (error) {
      console.error('Error fetching admin notes:', error);
    }
  };

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

  const fetchFullTaskDetails = async (taskId: number) => {
    try {
      const token = localStorage.getItem('token');
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
      const token = localStorage.getItem('token');
      const response = await fetch(`http://localhost:5000/api/volunteers/tasks/${taskId}/accept`, {
        method: 'PATCH',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });
      
      const data = await response.json();
      if (data.success) {
        await fetchMissions();
        setIsTaskModalOpen(false);
        setSelectedTask(null);
        alert('Mission accepted successfully!');
      } else {
        alert('Failed to accept task: ' + data.message);
      }
    } catch (error) {
      console.error('Error accepting task:', error);
      alert('Failed to accept task');
    } finally {
      setActionLoading(false);
    }
  };

  const handleDeclineTask = async (taskId: number, reason: string) => {
    try {
      setActionLoading(true);
      const token = localStorage.getItem('token');
      const response = await fetch(`http://localhost:5000/api/volunteers/tasks/${taskId}/decline`, {
        method: 'PATCH',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ reason })
      });
      
      const data = await response.json();
      if (data.success) {
        await fetchMissions();
        setIsTaskModalOpen(false);
        setSelectedTask(null);
        alert('Mission declined');
      } else {
        alert('Failed to decline task: ' + data.message);
      }
    } catch (error) {
      console.error('Error declining task:', error);
      alert('Failed to decline task');
    } finally {
      setActionLoading(false);
    }
  };

  const handleUploadEvidence = async (taskId: number, file: File, notes: string) => {
    try {
      setActionLoading(true);
      const token = localStorage.getItem('token');
      
      // Upload proof
      const formData = new FormData();
      formData.append('proofs', file);
      
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
        alert('Failed to upload proof: ' + uploadData.message);
        return;
      }
      
      // Save completion note
      const noteResponse = await fetch(
        `http://localhost:5000/api/tasks/${taskId}/completion-notes`,
        {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ 
            note_text: notes,
            volunteer_id: currentUser?.user_id 
          })
        }
      );
      
      const noteData = await noteResponse.json();
      
      if (!noteData.success) {
        alert('Failed to save completion note: ' + noteData.message);
        return;
      }
      
      // Complete the task
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
        await fetchMissions();
        setIsTaskModalOpen(false);
        setSelectedTask(null);
        alert('Mission completed successfully! Thank you for your service!');
      } else {
        alert('Failed to complete mission: ' + completeData.message);
      }
    } catch (error) {
      console.error('Error uploading evidence:', error);
      alert('Failed to upload evidence and complete mission');
    } finally {
      setActionLoading(false);
    }
  };

  // ===== FIXED: handleViewTaskDetails - NOW FETCHES FULL TASK DETAILS =====
  const handleViewTaskDetails = async (mission: Mission) => {
    setSelectedTask(mission);
    
    try {
      // Fetch full task details to get all data including submitted_at
      const fullDetails = await fetchFullTaskDetails(mission.task_id);
      
      if (fullDetails) {
        // Update the selected task with the full details from the API
        setSelectedTask(fullDetails.task);
        
        // Also set the evidence, admin notes, and completion notes
        setTaskEvidence(prev => ({ ...prev, [mission.task_id]: fullDetails.evidence || [] }));
        setTaskAdminNotes(prev => ({ ...prev, [mission.task_id]: fullDetails.admin_notes || [] }));
        setTaskCompletionNotes(prev => ({ ...prev, [mission.task_id]: fullDetails.completion_notes || [] }));
      } else {
        // Fallback to separate fetches if full-details fails
        await Promise.all([
          fetchTaskEvidence(mission.task_id),
          fetchTaskAdminNotes(mission.report_id, mission.task_id),
          fetchTaskCompletionNotes(mission.task_id)
        ]);
      }
    } catch (error) {
      console.error('Error in handleViewTaskDetails:', error);
      // Fallback to separate fetches
      await Promise.all([
        fetchTaskEvidence(mission.task_id),
        fetchTaskAdminNotes(mission.report_id, mission.task_id),
        fetchTaskCompletionNotes(mission.task_id)
      ]);
    }
    
    setIsTaskModalOpen(true);
  };

  // Get counts for tabs
  const pendingCount = missions.filter(m => m.task_status_id === 1).length;
  const activeCount = missions.filter(m => m.task_status_id === 2).length;
  const completedCount = missions.filter(m => m.task_status_id === 3).length;

  // Filter missions based on active tab and search term
  useEffect(() => {
    let filtered = [...missions];

    // Apply tab filter
    if (activeTab !== 'all') {
      filtered = filtered.filter(m => {
        if (activeTab === 'pending') return m.task_status_id === 1;
        if (activeTab === 'active') return m.task_status_id === 2;
        if (activeTab === 'completed') return m.task_status_id === 3;
        return true;
      });
    }

    // Apply search filter
    if (searchTerm) {
      const term = searchTerm.toLowerCase();
      filtered = filtered.filter(m => 
        m.animal_type?.toLowerCase().includes(term) ||
        m.animal_condition?.toLowerCase().includes(term) ||
        m.location_address?.toLowerCase().includes(term) ||
        m.reporter_name?.toLowerCase().includes(term) ||
        m.description?.toLowerCase().includes(term)
      );
    }

    setFilteredMissions(filtered);
  }, [missions, activeTab, searchTerm]);

  const pendingTasks = missions.filter(m => m.task_status_id === 1);
  const activeMissions = missions.filter(m => m.task_status_id === 2);
  const completedTasks = missions.filter(m => m.task_status_id === 3);
  
  const displayedActiveMissions = showAllActive ? activeMissions : activeMissions.slice(0, 3);
  const displayedPendingTasks = showAllPending ? pendingTasks : pendingTasks.slice(0, 3);

  // Determine what to show based on active tab
  const getDisplayedMissions = () => {
    switch(activeTab) {
      case 'pending':
        return displayedPendingTasks;
      case 'active':
        return displayedActiveMissions;
      case 'completed':
        return completedTasks;
      default:
        return filteredMissions;
    }
  };

  const displayedMissions = getDisplayedMissions();

  return (
    <div className="dashboard-wrapper animate-fade-in">
      <div className="volunteer-dashboard-new" style={{ maxWidth: '1200px', margin: '0 auto' }}>
        
        {/* Header Section */}
        <div className="reports-header" style={{ marginBottom: '2rem' }}>
          <div className="reports-header-content">
            <h1 className="reports-title">Mission Board</h1>
            <p className="reports-subtitle">
              Welcome back, {currentUser?.username}! Review and manage your missions.
            </p>
          </div>
          <div className="reports-header-actions">
            <Link to="/dashboard" className="reports-btn refresh">
              <span className="btn-icon">🏠</span>
              Back to Dashboard
            </Link>
          </div>
        </div>

        {/* Tabs and Filters */}
        <div className="reports-filters-card" style={{ marginBottom: '2rem', padding: '1.5rem' }}>
          {/* Tabs */}
          <div style={{ 
            display: 'flex', 
            gap: '0.5rem',
            marginBottom: '1.5rem',
            borderBottom: '2px solid var(--border)',
            paddingBottom: '1rem',
            flexWrap: 'wrap'
          }}>
            <button
              onClick={() => setActiveTab('all')}
              className={`tab-btn ${activeTab === 'all' ? 'active' : ''}`}
              style={{
                padding: '0.5rem 1rem',
                background: activeTab === 'all' ? '#1e3f1a' : 'transparent',
                color: activeTab === 'all' ? 'white' : '#1e3f1a',
                border: '1px solid #1e3f1a',
                borderRadius: '8px',
                cursor: 'pointer',
                fontWeight: '600',
                transition: 'all 0.2s ease'
              }}
            >
              All ({missions.length})
            </button>
            <button
              onClick={() => setActiveTab('pending')}
              className={`tab-btn ${activeTab === 'pending' ? 'active' : ''}`}
              style={{
                padding: '0.5rem 1rem',
                background: activeTab === 'pending' ? '#1e3f1a' : 'transparent',
                color: activeTab === 'pending' ? 'white' : '#1e3f1a',
                border: '1px solid #1e3f1a',
                borderRadius: '8px',
                cursor: 'pointer',
                fontWeight: '600',
                transition: 'all 0.2s ease'
              }}
            >
              Pending ({pendingCount})
            </button>
            <button
              onClick={() => setActiveTab('active')}
              className={`tab-btn ${activeTab === 'active' ? 'active' : ''}`}
              style={{
                padding: '0.5rem 1rem',
                background: activeTab === 'active' ? '#1e3f1a' : 'transparent',
                color: activeTab === 'active' ? 'white' : '#1e3f1a',
                border: '1px solid #1e3f1a',
                borderRadius: '8px',
                cursor: 'pointer',
                fontWeight: '600',
                transition: 'all 0.2s ease'
              }}
            >
              Active ({activeCount})
            </button>
            <button
              onClick={() => setActiveTab('completed')}
              className={`tab-btn ${activeTab === 'completed' ? 'active' : ''}`}
              style={{
                padding: '0.5rem 1rem',
                background: activeTab === 'completed' ? '#1e3f1a' : 'transparent',
                color: activeTab === 'completed' ? 'white' : '#1e3f1a',
                border: '1px solid #1e3f1a',
                borderRadius: '8px',
                cursor: 'pointer',
                fontWeight: '600',
                transition: 'all 0.2s ease'
              }}
            >
              Completed ({completedCount})
            </button>
          </div>

          {/* Search Bar */}
          <div style={{ 
            display: 'flex', 
            justifyContent: 'space-between',
            alignItems: 'center',
            gap: '1rem',
            flexWrap: 'wrap'
          }}>
            <div style={{ flex: 1, minWidth: '250px' }}>
              <input
                type="text"
                placeholder="Search missions..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                style={{
                  width: '100%',
                  padding: '0.75rem 1rem',
                  border: '2px solid #1e3f1a',
                  borderRadius: '8px',
                  fontSize: '0.95rem',
                  background: 'white'
                }}
              />
            </div>
            <div style={{ 
              background: '#e8f0e0', 
              padding: '0.5rem 1rem',
              borderRadius: '8px',
              color: '#1e3f1a',
              fontWeight: '600',
              whiteSpace: 'nowrap'
            }}>
              {filteredMissions.length} Mission{filteredMissions.length !== 1 ? 's' : ''}
            </div>
          </div>
        </div>

        {/* Missions Grid */}
        <div className="reports-section">
          {loading ? (
            <div className="reports-loading-container">
              <div className="reports-loader">
                <div className="reports-spinner"></div>
                <p className="reports-loader-text">Loading missions...</p>
              </div>
            </div>
          ) : error ? (
            <div className="reports-empty-state">
              <span className="empty-state-emoji">❌</span>
              <h3 style={{ color: '#1e3f1a' }}>Error Loading Missions</h3>
              <p>{error}</p>
              <button onClick={fetchMissions} className="reports-btn primary" style={{ background: '#1e3f1a' }}>
                Retry
              </button>
            </div>
          ) : displayedMissions.length === 0 ? (
            <div className="reports-empty-state">
              <span className="empty-state-emoji">
                {activeTab === 'all' ? '📋' : 
                 activeTab === 'pending' ? '⏳' :
                 activeTab === 'active' ? '🎯' : '✅'}
              </span>
              <h3 style={{ color: '#1e3f1a' }}>No {activeTab} missions</h3>
              <p>
                {activeTab === 'all' && "There are no missions available."}
                {activeTab === 'pending' && "You don't have any pending missions."}
                {activeTab === 'active' && "You're not on any active missions."}
                {activeTab === 'completed' && "No completed missions yet."}
              </p>
            </div>
          ) : (
            <div className="reports-grid" style={{ gridTemplateColumns: 'repeat(3, 1fr)' }}>
              {displayedMissions.map((mission) => {
                const statusBadge = getTaskStatusBadge(mission.task_status_id);
                const hasEvidence = taskEvidence[mission.task_id]?.length > 0;
                // Use the full task details if available, otherwise use the mission data
                const displayMission = taskDetails[mission.task_id] || mission;
                
                return (
                  <div 
                    key={mission.task_id} 
                    className="reports-card"
                    onClick={() => handleViewTaskDetails(mission)}
                    style={{ cursor: 'pointer', borderColor: '#1e3f1a' }}
                  >
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
                        {formatRelativeTime(displayMission.submitted_at)}
                      </div>
                      {mission.task_status_id === 2 && (
                        <div className="reports-volunteer-tag" style={{ color: 'white', fontSize: '0.8rem', fontWeight: '600', marginTop: '5px' }}>
                          {currentUser?.username?.toUpperCase()}
                        </div>
                      )}
                    </div>

                    <div className="reports-card-body">
                      <div className="reports-animal-section">
                        <div className="reports-animal-icon large">
                          {getAnimalEmoji(mission.animal_type)}
                        </div>
                        <div className="reports-animal-info">
                          <h4 style={{ color: '#1e3f1a' }}>{mission.animal_type || 'Unknown Animal'}</h4>
                          <span className="reports-condition" style={{ 
                            background: '#e8f0e0', 
                            color: '#1e3f1a', 
                            border: '1px solid #1e3f1a'
                          }}>
                            {mission.animal_condition || 'Unknown'}
                          </span>
                        </div>
                      </div>

                      <div className="reports-location-section">
                        <span className="location-icon">📍</span>
                        <span className="location-text">{mission.location_address}</span>
                      </div>

                      <div className="reports-volunteer-section">
                        <div className="reports-assigned-ranger" style={{ background: '#e8f0e0' }}>
                          <div className="ranger-avatar" style={{ background: '#1e3f1a' }}>
                            {mission.reporter_name?.charAt(0).toUpperCase() || '?'}
                          </div>
                          <div className="ranger-info">
                            <span className="ranger-name">{mission.reporter_name || 'Anonymous'}</span>
                            <span className="ranger-role">Reporter</span>
                            {mission.reporter_phone && mission.reporter_phone !== 'No phone' && (
                              <span className="ranger-phone" style={{ fontSize: '0.75rem', color: '#1e3f1a' }}>
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
                        {mission.description?.length > 80 
                          ? `${mission.description.substring(0, 80)}...` 
                          : mission.description || 'No description provided'}
                      </p>

                      {hasEvidence && (
                        <div className="evidence-indicator">
                          <span style={{ color: '#1e3f1a', fontSize: '0.8rem', fontWeight: '600' }}>
                            📸 Evidence Uploaded
                          </span>
                        </div>
                      )}
                    </div>

                    <div className="reports-card-footer">
                      <button 
                        className="reports-btn"
                        style={{ 
                          width: '100%',
                          background: '#1e3f1a',
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
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>

        {/* Show More buttons for pending and active tabs */}
        {activeTab === 'pending' && pendingTasks.length > 3 && !showAllPending && (
          <div className="view-all-container" style={{ marginTop: '1rem', textAlign: 'center' }}>
            <button 
              onClick={() => setShowAllPending(true)}
              className="view-all-link"
              style={{ color: '#1e3f1a', borderColor: '#1e3f1a' }}
            >
              View All {pendingTasks.length} Pending Missions →
            </button>
          </div>
        )}

        {activeTab === 'active' && activeMissions.length > 3 && !showAllActive && (
          <div className="view-all-container" style={{ marginTop: '1rem', textAlign: 'center' }}>
            <button 
              onClick={() => setShowAllActive(true)}
              className="view-all-link"
              style={{ color: '#1e3f1a', borderColor: '#1e3f1a' }}
            >
              View All {activeMissions.length} Active Missions →
            </button>
          </div>
        )}
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
          onAccept={handleAcceptTask}
          onDecline={handleDeclineTask}
          onUploadEvidence={handleUploadEvidence}
          actionLoading={actionLoading}
          userProfile={currentUser}
          evidence={taskEvidence[selectedTask.task_id]}
          adminNotes={taskAdminNotes[selectedTask.task_id]}
          completionNotes={taskCompletionNotes[selectedTask.task_id]}
        />
      )}
    </div>
  );
};

export default MissionBoard;