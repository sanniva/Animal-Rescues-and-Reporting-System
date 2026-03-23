

// // import React, { useState, useEffect, useCallback, useRef } from 'react';
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
// // import { Heatmap } from '../../components/Dashboard/HeatMap';
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
  
// //   // Reporter fields - CRITICAL: These must match API response
// //   reporter_name?: string | null;
// //   reporter_phone?: string | null;
// //   reporter_email?: string | null;
  
// //   // Volunteer fields
// //   volunteer_name?: string | null;
// //   volunteer_id?: number;
// //   volunteer_phone?: string | null;
// //   volunteer_email?: string | null;
  
// //   // Task fields
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
// //   volunteer_name?: string;
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
// //   reporter_name: string | null;
// //   reporter_phone: string | null;
// //   reporter_email: string | null;
  
// //   // Volunteer fields
// //   volunteer_name: string;
// //   volunteer_email: string | null;
// //   volunteer_phone: string | null;
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

// // interface FullTaskDetails {
// //   task: VolunteerTask;
// //   evidence: TaskProof[];
// //   admin_notes: AdminNote[];
// //   completion_notes: TaskCompletionNote[];
// // }

// // // ===========================================
// // // HELPER FUNCTIONS - CRITICAL FOR DISPLAY
// // // ===========================================
// // const hasPhone = (phone?: string | null): boolean => {
// //   if (phone === null || phone === undefined) return false;
// //   if (typeof phone !== 'string') return false;
// //   return phone.trim().length > 0;
// // };

// // const hasEmail = (email?: string | null): boolean => {
// //   if (email === null || email === undefined) return false;
// //   if (typeof email !== 'string') return false;
// //   const trimmed = email.trim();
// //   return trimmed.length > 0 && trimmed.includes('@') && trimmed.includes('.');
// // };

// // const formatPhoneNumber = (phone?: string | null): string => {
// //   if (!hasPhone(phone)) return 'Not provided';
// //   const phoneStr = String(phone).trim();
// //   const cleaned = phoneStr.replace(/\D/g, '');
// //   if (cleaned.length === 10) return `+977 ${cleaned}`;
// //   return phoneStr;
// // };

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

// // const getStatusDisplay = (statusName?: string): string => {
// //   if (!statusName) return 'Unknown';
// //   return statusName
// //     .replace(/_/g, ' ')
// //     .replace(/\b\w/g, char => char.toUpperCase());
// // };

// // const getStatusClass = (statusName?: string): string => {
// //   const name = statusName?.toLowerCase() || '';
// //   if (name.includes('submitted')) return 'submitted';
// //   if (name.includes('review')) return 'review';
// //   if (name.includes('progress')) return 'progress';
// //   if (name.includes('completed')) return 'completed';
// //   if (name.includes('cancelled') || name.includes('declined')) return 'cancelled';
// //   return 'unknown';
// // };

// // const formatDate = (dateString: string | undefined): string => {
// //   if (!dateString) return 'Not available';
// //   try {
// //     const date = new Date(dateString);
// //     return date.toLocaleDateString('en-US', {
// //       month: 'short',
// //       day: 'numeric',
// //       year: 'numeric',
// //       hour: '2-digit',
// //       minute: '2-digit'
// //     });
// //   } catch {
// //     return 'Invalid date';
// //   }
// // };

// // const formatShortDate = (dateString: string): string => {
// //   if (!dateString) return 'Not available';
// //   try {
// //     const date = new Date(dateString);
// //     return date.toLocaleDateString('en-US', {
// //       month: 'short',
// //       day: 'numeric',
// //       year: 'numeric'
// //     });
// //   } catch {
// //     return 'Not available';
// //   }
// // };

// // const formatRelativeTime = (dateString: string): string => {
// //   if (!dateString) return 'Not available';
// //   try {
// //     const date = new Date(dateString);
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
// //   } catch {
// //     return 'Not available';
// //   }
// // };

// // const getStatusText = (statusName: string): string => {
// //   if (!statusName) return 'Unknown';
// //   return statusName
// //     .replace(/_/g, ' ')
// //     .split(' ')
// //     .map(word => word.charAt(0).toUpperCase() + word.slice(1))
// //     .join(' ');
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

// // // ===========================================
// // // LOCATION TRACKER COMPONENT
// // // ===========================================
// // const calculateDistance = (lat1: number, lng1: number, lat2: number, lng2: number): number => {
// //   const R = 6371;
// //   const dLat = (lat2 - lat1) * Math.PI / 180;
// //   const dLng = (lng2 - lng1) * Math.PI / 180;
// //   const a = 
// //     Math.sin(dLat/2) * Math.sin(dLat/2) +
// //     Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) * 
// //     Math.sin(dLng/2) * Math.sin(dLng/2);
// //   const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
// //   return R * c;
// // };

// // const LocationTracker: React.FC<{
// //   taskId: number;
// //   isActive: boolean;
// // }> = ({ taskId, isActive }) => {
// //   const [watchId, setWatchId] = useState<number | null>(null);
// //   const [lastLocation, setLastLocation] = useState<GeolocationPosition | null>(null);
// //   const [isTracking, setIsTracking] = useState(false);
// //   const [error, setError] = useState<string | null>(null);
// //   const [pendingPoints, setPendingPoints] = useState<number>(0);
  
// //   const pendingQueue = useRef<any[]>([]);
  
// //   const saveLocation = useCallback(async (latitude: number, longitude: number, accuracy: number) => {
// //     try {
// //       const token = sessionStorage.getItem('token') || localStorage.getItem('token');
// //       if (!token) return;
      
// //       const response = await fetch('http://localhost:5000/api/volunteer/tracking/point', {
// //         method: 'POST',
// //         headers: {
// //           'Authorization': `Bearer ${token}`,
// //           'Content-Type': 'application/json'
// //         },
// //         body: JSON.stringify({ taskId, latitude, longitude, accuracy })
// //       });
      
// //       const data = await response.json();
// //       if (!data.success) {
// //         pendingQueue.current.push({ latitude, longitude, accuracy, timestamp: new Date() });
// //         setPendingPoints(pendingQueue.current.length);
// //       }
// //     } catch (error) {
// //       pendingQueue.current.push({ latitude, longitude, accuracy, timestamp: new Date() });
// //       setPendingPoints(pendingQueue.current.length);
// //     }
// //   }, [taskId]);
  
// //   const retryPendingPoints = useCallback(async () => {
// //     if (pendingQueue.current.length === 0) return;
    
// //     const token = sessionStorage.getItem('token') || localStorage.getItem('token');
// //     if (!token) return;
    
// //     const points = [...pendingQueue.current];
// //     pendingQueue.current = [];
// //     setPendingPoints(0);
    
// //     for (const point of points) {
// //       try {
// //         await fetch('http://localhost:5000/api/volunteer/tracking/point', {
// //           method: 'POST',
// //           headers: {
// //             'Authorization': `Bearer ${token}`,
// //             'Content-Type': 'application/json'
// //           },
// //           body: JSON.stringify({
// //             taskId,
// //             latitude: point.latitude,
// //             longitude: point.longitude,
// //             accuracy: point.accuracy
// //           })
// //         });
// //       } catch (error) {
// //         pendingQueue.current.push(point);
// //         setPendingPoints(pendingQueue.current.length);
// //       }
// //     }
// //   }, [taskId]);
  
// //   const startTracking = useCallback(() => {
// //     if (!navigator.geolocation) {
// //       setError('Geolocation is not supported');
// //       return;
// //     }
    
// //     setError(null);
    
// //     navigator.geolocation.getCurrentPosition(
// //       (position) => {
// //         setLastLocation(position);
// //         saveLocation(
// //           position.coords.latitude,
// //           position.coords.longitude,
// //           position.coords.accuracy || 0
// //         );
// //       },
// //       () => {},
// //       { enableHighAccuracy: false, timeout: 10000, maximumAge: 60000 }
// //     );
    
// //     const id = navigator.geolocation.watchPosition(
// //       (position) => {
// //         let shouldSave = true;
        
// //         if (lastLocation) {
// //           const distance = calculateDistance(
// //             lastLocation.coords.latitude,
// //             lastLocation.coords.longitude,
// //             position.coords.latitude,
// //             position.coords.longitude
// //           );
// //           const timeDiff = (position.timestamp - lastLocation.timestamp) / 1000;
// //           shouldSave = distance > 0.05 || timeDiff > 30;
// //         }
        
// //         if (shouldSave) {
// //           saveLocation(
// //             position.coords.latitude,
// //             position.coords.longitude,
// //             position.coords.accuracy || 0
// //           );
// //         }
        
// //         setLastLocation(position);
// //       },
// //       (error) => {
// //         let errorMsg = 'Location error';
// //         switch(error.code) {
// //           case error.PERMISSION_DENIED: errorMsg = 'Permission denied'; break;
// //           case error.POSITION_UNAVAILABLE: errorMsg = 'Location unavailable'; break;
// //           case error.TIMEOUT: errorMsg = 'Location timeout'; break;
// //         }
// //         setError(errorMsg);
// //       },
// //       { enableHighAccuracy: true, timeout: 30000, maximumAge: 0 }
// //     );
    
// //     setWatchId(id);
// //     setIsTracking(true);
// //   }, [lastLocation, saveLocation]);
  
// //   const stopTracking = useCallback(() => {
// //     if (watchId !== null) {
// //       navigator.geolocation.clearWatch(watchId);
// //       setWatchId(null);
// //       setIsTracking(false);
// //     }
// //   }, [watchId]);
  
// //   useEffect(() => {
// //     if (isActive) {
// //       const timer = setTimeout(() => startTracking(), 1000);
// //       return () => { clearTimeout(timer); stopTracking(); };
// //     } else {
// //       stopTracking();
// //     }
// //   }, [isActive, startTracking, stopTracking]);
  
// //   useEffect(() => {
// //     const handleOnline = () => retryPendingPoints();
// //     window.addEventListener('online', handleOnline);
// //     return () => window.removeEventListener('online', handleOnline);
// //   }, [retryPendingPoints]);
  
// //   useEffect(() => {
// //     const interval = setInterval(() => {
// //       if (navigator.onLine && pendingQueue.current.length > 0) retryPendingPoints();
// //     }, 30000);
// //     return () => clearInterval(interval);
// //   }, [retryPendingPoints]);
  
// //   if (!isActive) return null;
  
// //   return (
// //     <div style={{
// //       position: 'fixed', bottom: '20px', right: '20px',
// //       background: error ? '#ffebee' : '#e8f5e9',
// //       padding: '8px 12px', borderRadius: '20px', fontSize: '0.8rem',
// //       boxShadow: '0 2px 5px rgba(0,0,0,0.2)', zIndex: 9999,
// //       display: 'flex', alignItems: 'center', gap: '6px'
// //     }}>
// //       <span style={{
// //         width: '8px', height: '8px', borderRadius: '50%',
// //         background: error ? '#f44336' : (isTracking ? '#4caf50' : '#ff9800'),
// //         animation: isTracking && !error ? 'pulse 2s infinite' : 'none'
// //       }}></span>
// //       <span>
// //         {error ? 'Location Error' : (isTracking ? 'Sharing Location' : 'Starting...')}
// //       </span>
// //       {pendingPoints > 0 && (
// //         <span style={{ background: '#fff3e0', padding: '2px 6px', borderRadius: '12px', fontSize: '0.7rem' }}>
// //           {pendingPoints} pending
// //         </span>
// //       )}
// //     </div>
// //   );
// // };

// // // ===========================================
// // // DECLINE MODAL
// // // ===========================================
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
// //         onClose();
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
// //             <label className="form-label">Reason <span className="required">*</span></label>
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
// //               <label className="form-label">Please specify <span className="required">*</span></label>
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
// //           <button className="modal-btn secondary" onClick={onClose}>Cancel</button>
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

// // // ===========================================
// // // UPLOAD EVIDENCE MODAL
// // // ===========================================
// // const UploadEvidenceModal: React.FC<{
// //   isOpen: boolean;
// //   onClose: () => void;
// //   onSubmit: (file: File, notes: string) => void;
// //   taskId: number;
// // }> = ({ isOpen, onClose, onSubmit, taskId }) => {
// //   const [proofFile, setProofFile] = useState<File | null>(null);
// //   const [notes, setNotes] = useState('');
// //   const [previewUrl, setPreviewUrl] = useState<string | null>(null);
// //   const [uploading, setUploading] = useState(false);
// //   const [uploadError, setUploadError] = useState<string | null>(null);

// //   if (!isOpen) return null;

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
// //         if (previewUrl) URL.revokeObjectURL(previewUrl);
// //         setProofFile(file);
// //         setPreviewUrl(URL.createObjectURL(file));
// //       }
// //     }
// //   };

// //   const removeFile = () => {
// //     if (previewUrl) URL.revokeObjectURL(previewUrl);
// //     setProofFile(null);
// //     setPreviewUrl(null);
// //     setUploadError(null);
// //   };

// //   const handleSubmit = async () => {
// //     if (!proofFile) {
// //       setUploadError('Please select a photo');
// //       return;
// //     }
// //     if (!notes.trim()) {
// //       setUploadError('Please enter completion notes');
// //       return;
// //     }
    
// //     setUploading(true);
// //     try {
// //       await onSubmit(proofFile, notes);
// //       setProofFile(null);
// //       setNotes('');
// //       setPreviewUrl(null);
// //       onClose();
// //     } finally {
// //       setUploading(false);
// //     }
// //   };

// //   return (
// //     <div className="modal-overlay" onClick={onClose}>
// //       <div className="modal-content" onClick={e => e.stopPropagation()}>
// //         <div className="modal-header" style={{ background: 'linear-gradient(135deg, #2D5A27 0%, #1e3f1a 100%)' }}>
// //           <div className="modal-header-left">
// //             <span className="modal-icon">📸</span>
// //             <div>
// //               <h3 className="modal-title">Upload Evidence for Task #{taskId}</h3>
// //               <p className="modal-subtitle">Add photos and notes to complete the mission</p>
// //             </div>
// //           </div>
// //           <button className="modal-close" onClick={onClose}>×</button>
// //         </div>
        
// //         <div className="modal-body">
// //           {uploadError && (
// //             <div style={{ color: '#c62828', marginBottom: '15px', padding: '10px', background: '#ffebee', borderRadius: '4px' }}>
// //               {uploadError}
// //             </div>
// //           )}

// //           <div className="form-group">
// //             <label className="form-label">Proof Photo <span className="required">*</span></label>
// //             {previewUrl ? (
// //               <div className="single-photo-preview">
// //                 <div style={{ position: 'relative', display: 'inline-block', width: '100%' }}>
// //                   <img src={previewUrl} alt="Preview" style={{ width: '100%', maxHeight: '200px', objectFit: 'contain', borderRadius: '4px' }} />
// //                   <button onClick={removeFile} style={{ position: 'absolute', top: '5px', right: '5px', background: '#c62828', color: 'white', border: 'none', borderRadius: '50%', width: '25px', height: '25px', cursor: 'pointer' }}>×</button>
// //                 </div>
// //                 <p style={{ marginTop: '5px' }}>{proofFile?.name} ({(proofFile!.size / 1024).toFixed(1)} KB)</p>
// //               </div>
// //             ) : (
// //               <label className="reports-btn primary" style={{ cursor: 'pointer', display: 'inline-block' }}>
// //                 Choose Photo
// //                 <input type="file" accept="image/jpeg,image/png,image/jpg,image/gif" onChange={handleFileChange} style={{ display: 'none' }} />
// //               </label>
// //             )}
// //           </div>

// //           <div className="form-group" style={{ marginTop: '15px' }}>
// //             <label className="form-label">Completion Notes <span className="required">*</span></label>
// //             <textarea
// //               value={notes}
// //               onChange={(e) => setNotes(e.target.value)}
// //               placeholder="Describe the rescue outcome, any challenges, and the animal's condition..."
// //               rows={4}
// //               maxLength={500}
// //               style={{ width: '100%', padding: '10px', border: '2px solid #2D5A27', borderRadius: '8px' }}
// //             />
// //             <p style={{ fontSize: '0.75rem', color: '#666', marginTop: '5px', textAlign: 'right' }}>
// //               {notes.length}/500 characters
// //             </p>
// //           </div>
// //         </div>
        
// //         <div className="modal-footer">
// //           <button className="modal-btn secondary" onClick={onClose}>Cancel</button>
// //           <button 
// //             className="modal-btn primary" 
// //             onClick={handleSubmit}
// //             disabled={!proofFile || !notes.trim() || uploading}
// //             style={{ background: (!proofFile || !notes.trim()) ? '#ccc' : '#2D5A27' }}
// //           >
// //             {uploading ? 'Uploading...' : 'Submit Evidence'}
// //           </button>
// //         </div>
// //       </div>
// //     </div>
// //   );
// // };

// // // ===========================================
// // // TASK DETAIL MODAL (WITH LOCATION TRACKER)
// // // ===========================================
// // const TaskDetailModal: React.FC<{
// //   task: VolunteerTask | null;
// //   isOpen: boolean;
// //   onClose: () => void;
// //   onUploadEvidence: (taskId: number, file: File, notes: string) => void;
// //   actionLoading: boolean;
// //   userProfile: UserProfile | null;
// //   evidence?: TaskProof[];
// //   adminNotes?: AdminNote[];
// // }> = ({ 
// //   task, 
// //   isOpen, 
// //   onClose, 
// //   onUploadEvidence,
// //   actionLoading, 
// //   userProfile, 
// //   evidence = [], 
// //   adminNotes = []
// // }) => {
// //   const [selectedImage, setSelectedImage] = useState<string | null>(null);
// //   const [showUploadForm, setShowUploadForm] = useState(false);
// //   const [isTrackingActive, setIsTrackingActive] = useState(false);

// //   useEffect(() => {
// //     if (task?.task_status_id === 2) setIsTrackingActive(true);
// //     else setIsTrackingActive(false);
// //   }, [task?.task_status_id]);

// //   if (!isOpen || !task) return null;

// //   const hasProofs = evidence.length > 0;

// //   const getFullImageUrl = (proofUrl: string) => {
// //     if (proofUrl.startsWith('http')) return proofUrl;
// //     const cleanUrl = proofUrl.startsWith('/') ? proofUrl.substring(1) : proofUrl;
// //     return `http://localhost:5000/${cleanUrl}`;
// //   };

// //   return (
// //     <>
// //       {/* Location Tracker - Only visible when task is active */}
// //       {task.task_status_id === 2 && (
// //         <LocationTracker taskId={task.task_id} isActive={isTrackingActive} />
// //       )}

// //       <div className="reports-modal-overlay" onClick={onClose}>
// //         <div className="reports-modal-content large" onClick={e => e.stopPropagation()}>
// //           <div className="reports-modal-header dark" style={{ background: '#1e3f1a' }}>
// //             <div>
// //               <h3>Rescue Report #{task.report_id}</h3>
// //               <div className="reports-modal-subheader">
// //                 <span className="reports-status-badge" style={{ 
// //                   background: 'rgba(255,255,255,0.2)', color: 'white', padding: '0.25rem 0.75rem',
// //                   borderRadius: '20px', fontSize: '0.75rem', fontWeight: '600', textTransform: 'uppercase'
// //                 }}>
// //                   {getTaskStatusBadge(task.task_status_id).text}
// //                 </span>
// //                 <span className="reports-meta" style={{ color: 'rgba(255,255,255,0.8)' }}>
// //                   Reported: {formatRelativeTime(task.submitted_at)}
// //                 </span>
// //               </div>
// //             </div>
// //             <button className="reports-modal-close" onClick={onClose}>×</button>
// //           </div>
          
// //           <div className="reports-modal-body">
// //             <div className="reports-detail-grid">
// //               <div className="reports-detail-column">
// //                 <div className="reports-info-card">
// //                   <div className="reports-card-header beige"><h4>🐾 Animal Information</h4></div>
// //                   <div className="reports-card-content">
// //                     <div className="reports-animal-display">
// //                       <div className="reports-animal-icon">{getAnimalEmoji(task.animal_type)}</div>
// //                       <div className="reports-animal-details">
// //                         <div className="reports-animal-type">{task.animal_type}</div>
// //                         <div className="reports-animal-condition">
// //                           <span className="condition-tag">{task.animal_condition}</span>
// //                         </div>
// //                       </div>
// //                     </div>
// //                   </div>
// //                 </div>

// //                 <div className="reports-info-card">
// //                   <div className="reports-card-header beige"><h4>👤 Reporter Details</h4></div>
// //                   <div className="reports-card-content">
// //                     <div className="reports-detail-list">
// //                       <div className="reports-detail-row">
// //                         <span className="reports-detail-label">Name</span>
// //                         <span className="reports-detail-value">{task.reporter_name || 'Anonymous'}</span>
// //                       </div>
// //                       {hasEmail(task.reporter_email) && (
// //                         <div className="reports-detail-row">
// //                           <span className="reports-detail-label">Email</span>
// //                           <span className="reports-detail-value">✉️ {task.reporter_email}</span>
// //                         </div>
// //                       )}
// //                       {hasPhone(task.reporter_phone) && (
// //                         <div className="reports-detail-row">
// //                           <span className="reports-detail-label">Phone</span>
// //                           <span className="reports-detail-value">{formatPhoneNumber(task.reporter_phone)}</span>
// //                         </div>
// //                       )}
// //                     </div>
// //                   </div>
// //                 </div>

// //                 <div className="reports-info-card">
// //                   <div className="reports-card-header beige"><h4>📍 Location</h4></div>
// //                   <div className="reports-card-content">
// //                     <div className="reports-location-info">
// //                       <p>{task.location_address}</p>
// //                       <button className="reports-btn map" onClick={() => window.open(`https://maps.google.com/?q=${encodeURIComponent(task.location_address)}`, '_blank')}>
// //                         View on Map
// //                       </button>
// //                     </div>
// //                   </div>
// //                 </div>

// //                 <div className="reports-info-card">
// //                   <div className="reports-card-header beige"><h4>⏱️ Timeline</h4></div>
// //                   <div className="reports-card-content">
// //                     <div className="reports-detail-list">
// //                       <div className="reports-detail-row">
// //                         <span className="reports-detail-label">Reported</span>
// //                         <span className="reports-detail-value">{formatDate(task.submitted_at)}</span>
// //                       </div>
// //                       {task.assigned_at && (
// //                         <div className="reports-detail-row">
// //                           <span className="reports-detail-label">Assigned</span>
// //                           <span className="reports-detail-value">{formatDate(task.assigned_at)}</span>
// //                         </div>
// //                       )}
// //                       {task.started_at && (
// //                         <div className="reports-detail-row">
// //                           <span className="reports-detail-label">Started</span>
// //                           <span className="reports-detail-value">{formatDate(task.started_at)}</span>
// //                         </div>
// //                       )}
// //                     </div>
// //                   </div>
// //                 </div>
// //               </div>

// //               <div className="reports-detail-column">
// //                 <div className="reports-info-card">
// //                   <div className="reports-card-header beige"><h4>📝 Mission Description</h4></div>
// //                   <div className="reports-card-content">
// //                     <div className="reports-description"><p>{task.description}</p></div>
// //                     {task.user_note && (
// //                       <div className="reports-user-note">
// //                         <div className="note-label">Reporter's Note:</div>
// //                         <p>{task.user_note}</p>
// //                       </div>
// //                     )}
// //                   </div>
// //                 </div>

// //                 <div className="reports-info-card">
// //                   <div className="reports-card-header beige">
// //                     <div className="reports-header-row" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
// //                       <h4>📸 Evidence Photos</h4>
// //                       {task.task_status_id === 2 && !hasProofs && !showUploadForm && (
// //                         <button className="reports-btn primary small" onClick={() => setShowUploadForm(true)}>
// //                           + Upload Evidence
// //                         </button>
// //                       )}
// //                     </div>
// //                   </div>
// //                   <div className="reports-card-content">
// //                     {evidence.length > 0 ? (
// //                       <div>
// //                         <p style={{ marginBottom: '10px', color: '#2D5A27', fontWeight: '600' }}>
// //                           {evidence.length} photo(s) uploaded
// //                         </p>
// //                         <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '15px' }}>
// //                           {evidence.map((proof) => (
// //                             <div key={proof.proof_id} style={{ border: '1px solid #e8dfc9', borderRadius: '8px', padding: '8px', background: '#f9f5ec', cursor: 'pointer' }}
// //                                  onClick={() => setSelectedImage(getFullImageUrl(proof.proof_url))}>
// //                               <img src={getFullImageUrl(proof.proof_url)} alt={`Evidence ${proof.proof_id}`}
// //                                    style={{ width: '100%', height: '120px', objectFit: 'cover', borderRadius: '4px' }}
// //                                    onError={(e) => { e.currentTarget.style.display = 'none'; }} />
// //                               <p style={{ fontSize: '0.7rem', textAlign: 'center', marginTop: '5px', color: '#666' }}>
// //                                 Uploaded: {formatShortDate(proof.uploaded_at)}
// //                               </p>
// //                             </div>
// //                           ))}
// //                         </div>
// //                       </div>
// //                     ) : (
// //                       <div>
// //                         {showUploadForm ? (
// //                           <p>Please use the Upload Evidence button to add photos.</p>
// //                         ) : (
// //                           <p>No evidence uploaded yet.</p>
// //                         )}
// //                       </div>
// //                     )}
// //                   </div>
// //                 </div>

// //                 {adminNotes.length > 0 && (
// //                   <div className="reports-info-card">
// //                     <div className="reports-card-header beige"><h4>📌 Admin Notes</h4></div>
// //                     <div className="reports-card-content">
// //                       {adminNotes.map((note) => (
// //                         <div key={note.note_id} style={{ background: '#f9f5ec', padding: '12px', borderRadius: '8px', marginBottom: '10px', borderLeft: '3px solid #2D5A27' }}>
// //                           <div style={{ display: 'flex', justifyContent: 'space-between' }}>
// //                             <span style={{ fontWeight: 'bold', color: '#2D5A27' }}>{note.admin_name || 'Admin'}</span>
// //                             <span style={{ fontSize: '0.75rem', color: '#666' }}>{formatRelativeTime(note.created_at)}</span>
// //                           </div>
// //                           <p style={{ margin: 0 }}>{note.note_text}</p>
// //                         </div>
// //                       ))}
// //                     </div>
// //                   </div>
// //                 )}
// //               </div>
// //             </div>

// //             {selectedImage && (
// //               <div className="image-lightbox" onClick={() => setSelectedImage(null)} style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, background: 'rgba(0,0,0,0.9)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 2000 }}>
// //                 <img src={selectedImage} alt="Enlarged evidence" style={{ maxWidth: '90%', maxHeight: '90%', objectFit: 'contain' }} />
// //                 <button onClick={() => setSelectedImage(null)} style={{ position: 'absolute', top: '20px', right: '20px', background: 'white', border: 'none', borderRadius: '50%', width: '40px', height: '40px', fontSize: '20px', cursor: 'pointer' }}>×</button>
// //               </div>
// //             )}
// //           </div>
          
// //           <div className="reports-modal-footer">
// //             <button className="reports-btn secondary" onClick={onClose}>Close</button>
// //           </div>
// //         </div>
// //       </div>

// //       {/* Upload Evidence Modal */}
// //       {showUploadForm && (
// //         <UploadEvidenceModal
// //           isOpen={showUploadForm}
// //           onClose={() => setShowUploadForm(false)}
// //           onSubmit={(file, notes) => {
// //             onUploadEvidence(task.task_id, file, notes);
// //             setShowUploadForm(false);
// //           }}
// //           taskId={task.task_id}
// //         />
// //       )}
// //     </>
// //   );
// // };

// // // ===========================================
// // // ENHANCED REPORT DETAIL MODAL (FROM MYREPORTS)
// // // ===========================================
// // const ReportDetailModal: React.FC<{
// //   report: Report | null;
// //   isOpen: boolean;
// //   onClose: () => void;
// //   userPhone?: string;
// //   userEmail?: string;
// //   userName?: string;
// //   evidence?: TaskProof[];
// //   notes?: TaskCompletionNote[];
// //   loading?: boolean;
// // }> = ({ report, isOpen, onClose, userPhone, userEmail, userName, evidence = [], notes = [], loading = false }) => {
// //   const [selectedImage, setSelectedImage] = useState<string | null>(null);
// //   const [activeTab, setActiveTab] = useState<'details' | 'evidence' | 'notes'>('details');
// //   const [imageErrors, setImageErrors] = useState<Record<number, boolean>>({});

// //   if (!isOpen || !report) return null;

// //   // Use report fields directly - these should come from the API
// //   const reporterName = report.reporter_name || userName || 'Anonymous';
// //   const phoneNumber = report.reporter_phone || userPhone;
// //   const emailAddress = report.reporter_email || userEmail;
// //   const volunteerName = report.volunteer_name;
  
// //   const isCompleted = report.status_id === 4;
// //   const hasEvidence = evidence.length > 0;
// //   const hasNotes = notes.length > 0;

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

// //   const handleImageError = (proofId: number) => {
// //     setImageErrors(prev => ({ ...prev, [proofId]: true }));
// //   };

// //   // Debug log to see what data is coming in
// //   console.log('ReportDetailModal received:', {
// //     reportId: report.report_id,
// //     reporterName,
// //     phoneNumber,
// //     emailAddress,
// //     volunteerName,
// //     evidence: evidence.length,
// //     notes: notes.length
// //   });

// //   return (
// //     <div className="modal-overlay" onClick={onClose}>
// //       <div className="modal-content report-detail-modal horizontal-modal" onClick={e => e.stopPropagation()}>
// //         {/* Header - More compact */}
// //         <div className="modal-header compact-header">
// //           <div className="modal-header-left">
// //             <span className="modal-animal-emoji small">{getAnimalEmoji(report.animal_type)}</span>
// //             <div>
// //               <h3 className="modal-title small">Report #{report.report_id}</h3>
// //               <p className="modal-subtitle small">{report.animal_type} • {report.animal_condition}</p>
// //             </div>
// //           </div>
// //           <div className="header-actions">
// //             <span className={`status-badge-small status-${getStatusClass(report.status_name)}`}>
// //               {getStatusDisplay(report.status_name)}
// //             </span>
// //             <button className="modal-close small" onClick={onClose}>×</button>
// //           </div>
// //         </div>
        
// //         {/* Tab Navigation for horizontal layout */}
// //         <div className="modal-tabs">
// //           <button 
// //             className={`modal-tab ${activeTab === 'details' ? 'active' : ''}`}
// //             onClick={() => setActiveTab('details')}
// //           >
// //             📋 Details
// //           </button>
// //           {isCompleted && (
// //             <>
// //               <button 
// //                 className={`modal-tab ${activeTab === 'evidence' ? 'active' : ''}`}
// //                 onClick={() => setActiveTab('evidence')}
// //               >
// //                 📸 Evidence {hasEvidence && `(${evidence.length})`}
// //               </button>
// //               <button 
// //                 className={`modal-tab ${activeTab === 'notes' ? 'active' : ''}`}
// //                 onClick={() => setActiveTab('notes')}
// //               >
// //                 📝 Notes {hasNotes && `(${notes.length})`}
// //               </button>
// //             </>
// //           )}
// //         </div>
        
// //         <div className="modal-body horizontal-body">
// //           {/* Details Tab */}
// //           {activeTab === 'details' && (
// //             <div className="details-tab-content">
// //               {/* Two-column layout for horizontal modal */}
// //               <div className="details-two-column">
// //                 <div className="details-column">
// //                   <div className="detail-row">
// //                     <span className="detail-row-label">👤 Reporter:</span>
// //                     <span className="detail-row-value">{reporterName}</span>
// //                   </div>
// //                   {hasEmail(emailAddress) && (
// //                     <div className="detail-row">
// //                       <span className="detail-row-label">📧 Email:</span>
// //                       <span className="detail-row-value">{emailAddress}</span>
// //                     </div>
// //                   )}
// //                   {hasPhone(phoneNumber) && (
// //                     <div className="detail-row">
// //                       <span className="detail-row-label">📱 Phone:</span>
// //                       <span className="detail-row-value phone">{formatPhoneNumber(phoneNumber)}</span>
// //                     </div>
// //                   )}
// //                   <div className="detail-row">
// //                     <span className="detail-row-label">🆔 User ID:</span>
// //                     <span className="detail-row-value">#{report.user_id}</span>
// //                   </div>
// //                 </div>
                
// //                 <div className="details-column">
// //                   <div className="detail-row">
// //                     <span className="detail-row-label">🐾 Animal:</span>
// //                     <span className="detail-row-value">{report.animal_type}</span>
// //                   </div>
// //                   <div className="detail-row">
// //                     <span className="detail-row-label">🏥 Condition:</span>
// //                     <span className="detail-row-value">
// //                       <span className="condition-icon-small">{getConditionIcon(report.animal_condition)}</span> {report.animal_condition}
// //                     </span>
// //                   </div>
// //                   <div className="detail-row">
// //                     <span className="detail-row-label">📍 Location:</span>
// //                     <span className="detail-row-value location">{report.location_address}</span>
// //                   </div>
// //                   <div className="detail-row">
// //                     <span className="detail-row-label">📅 Submitted:</span>
// //                     <span className="detail-row-value">{formatShortDate(report.submitted_at)}</span>
// //                   </div>
// //                 </div>
// //               </div>

// //               {/* Description in its own row */}
// //               <div className="description-horizontal">
// //                 <div className="description-horizontal-header">📝 Description</div>
// //                 <p>{report.description}</p>
// //               </div>

// //               {/* Volunteer info if assigned */}
// //               {volunteerName && (
// //                 <div className="volunteer-horizontal">
// //                   <span className="volunteer-horizontal-label">🦸 Assigned Ranger:</span>
// //                   <span className="volunteer-horizontal-value">{volunteerName}</span>
// //                 </div>
// //               )}
// //             </div>
// //           )}

// //           {/* Evidence Tab */}
// //           {activeTab === 'evidence' && isCompleted && (
// //             <div className="evidence-tab-content">
// //               {loading ? (
// //                 <div className="loading-mini">Loading evidence...</div>
// //               ) : hasEvidence ? (
// //                 <div className="evidence-horizontal-grid">
// //                   {evidence.map((proof) => {
// //                     const imageUrl = getFullImageUrl(proof.proof_url);
// //                     const hasError = imageErrors[proof.proof_id];
                    
// //                     return (
// //                       <div 
// //                         key={proof.proof_id} 
// //                         className="evidence-horizontal-item"
// //                         onClick={() => !hasError && setSelectedImage(imageUrl)}
// //                       >
// //                         {!hasError ? (
// //                           <img 
// //                             src={imageUrl} 
// //                             alt={`Evidence`}
// //                             onError={() => handleImageError(proof.proof_id)}
// //                           />
// //                         ) : (
// //                           <div className="evidence-placeholder">📷</div>
// //                         )}
// //                         <span className="evidence-horizontal-date">
// //                           {new Date(proof.uploaded_at).toLocaleDateString()}
// //                         </span>
// //                       </div>
// //                     );
// //                   })}
// //                 </div>
// //               ) : (
// //                 <div className="empty-mini">No evidence photos available</div>
// //               )}
// //             </div>
// //           )}

// //           {/* Notes Tab */}
// //           {activeTab === 'notes' && isCompleted && (
// //             <div className="notes-tab-content">
// //               {loading ? (
// //                 <div className="loading-mini">Loading notes...</div>
// //               ) : hasNotes ? (
// //                 <div className="notes-horizontal-list">
// //                   {notes.map((note) => (
// //                     <div key={note.note_id} className="note-horizontal-item">
// //                       <div className="note-horizontal-header">
// //                         <span className="note-horizontal-author">{note.volunteer_name || 'Volunteer'}</span>
// //                         <span className="note-horizontal-time">{formatDate(note.created_at)}</span>
// //                       </div>
// //                       <p className="note-horizontal-text">{note.note_text}</p>
// //                     </div>
// //                   ))}
// //                 </div>
// //               ) : (
// //                 <div className="empty-mini">No notes available</div>
// //               )}
// //             </div>
// //           )}
// //         </div>

// //         {/* Image Lightbox */}
// //         {selectedImage && (
// //           <div className="lightbox" onClick={() => setSelectedImage(null)}>
// //             <img src={selectedImage} alt="Enlarged evidence" />
// //             <button className="lightbox-close" onClick={() => setSelectedImage(null)}>×</button>
// //           </div>
// //         )}
        
// //         <div className="modal-footer compact-footer">
// //           <button className="modal-btn secondary small" onClick={onClose}>Close</button>
// //           {report.task_id && (
// //             <span className="task-id-badge small">Task #{report.task_id}</span>
// //           )}
// //         </div>
// //       </div>
// //     </div>
// //   );
// // };

// // // ===========================================
// // // LOADING SPINNER
// // // ===========================================
// // const LoadingSpinner: React.FC = () => (
// //   <div className="loading-spinner">
// //     <div className="spinner"></div>
// //     <p>Loading reports...</p>
// //   </div>
// // );

// // // ===========================================
// // // ADMIN DASHBOARD
// // // ===========================================
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

// //   const uniqueReporters = new Set(reports.map(r => r.user_id)).size;

// //   useEffect(() => {
// //     if (reports && reports.length > 0) {
// //       const validReports = reports.filter(r => 
// //         r.location_address && r.location_address.trim() !== '' && r.location_address !== 'No location'
// //       );
// //       setHeatmapData(validReports);
// //     }
// //   }, [reports]);

// //   const getMostCommonAnimal = (): string => {
// //     const animalCounts = reports.reduce((acc, r) => {
// //       if (r.animal_type) acc[r.animal_type] = (acc[r.animal_type] || 0) + 1;
// //       return acc;
// //     }, {} as Record<string, number>);
    
// //     let maxCount = 0, mostCommon = 'N/A';
// //     Object.entries(animalCounts).forEach(([animal, count]) => {
// //       if (count > maxCount) { maxCount = count; mostCommon = animal; }
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
// //           <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
// //             <h3 className="section-header" style={{ margin: 0 }}>Incident Heatmap - Most Reported Areas</h3>
// //             <button onClick={() => setShowHeatmap(!showHeatmap)} className="reports-btn"
// //                     style={{ background: showHeatmap ? '#f44336' : '#2D5A27', color: 'white', border: 'none', padding: '8px 20px', borderRadius: '6px', cursor: 'pointer' }}>
// //               {showHeatmap ? 'Hide Map' : 'Show Heatmap'}
// //             </button>
// //           </div>

// //           {showHeatmap && (
// //             <div className="heatmap-container">
// //               {heatmapData.length > 0 ? (
// //                 <>
// //                   <Heatmap reports={heatmapData} height="500px" />
                  
// //                   <div className="heatmap-stats-grid">
// //                     <div className="heatmap-stat-card"><div className="heatmap-stat-label">Total Locations</div><div className="heatmap-stat-value">{heatmapData.length}</div></div>
// //                     <div className="heatmap-stat-card"><div className="heatmap-stat-label">Unique Areas</div><div className="heatmap-stat-value">{new Set(heatmapData.map(r => r.location_address)).size}</div></div>
// //                     <div className="heatmap-stat-card"><div className="heatmap-stat-label">Most Common Animal</div><div className="heatmap-stat-value">{getMostCommonAnimal()}</div></div>
// //                     <div className="heatmap-stat-card"><div className="heatmap-stat-label">Hotspots (3+ reports)</div><div className="heatmap-stat-value highlight">{getHotspotCount()}</div></div>
// //                   </div>

// //                   <div style={{ marginTop: '1.5rem' }}>
// //                     <h4 style={{ marginBottom: '1rem', color: '#333' }}>Top Hotspot Areas</h4>
// //                     <div className="hotspot-tags">
// //                       {Object.entries(heatmapData.reduce((acc, r) => {
// //                         acc[r.location_address] = (acc[r.location_address] || 0) + 1;
// //                         return acc;
// //                       }, {} as Record<string, number>))
// //                         .sort((a, b) => b[1] - a[1])
// //                         .slice(0, 8)
// //                         .map(([location, count]) => (
// //                           <div key={location} className={`hotspot-tag ${count >= 5 ? 'high' : count >= 3 ? 'medium' : 'low'}`}>
// //                             {location.length > 25 ? location.substring(0, 25) + '...' : location} ({count})
// //                           </div>
// //                         ))}
// //                     </div>
// //                   </div>
// //                 </>
// //               ) : (
// //                 <div style={{ height: '300px', display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#f5f5f5', borderRadius: '8px', flexDirection: 'column', gap: '1rem' }}>
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
// //                 <div className="chart-loading"><div className="spinner"></div><p>Loading chart data...</p></div>
// //               ) : (
// //                 <ResponsiveContainer width="100%" height={300}>
// //                   <BarChart data={chartData}>
// //                     <XAxis dataKey="name" axisLine={false} tickLine={false} />
// //                     <YAxis axisLine={false} tickLine={false} />
// //                     <Tooltip cursor={{fill: '#F5F1E8'}} formatter={(value) => [value, 'Count']} labelFormatter={(label) => `${label}`} />
// //                     <Bar dataKey="value" radius={[10, 10, 0, 0]} barSize={60}>
// //                       {chartData.map((entry, index) => <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />)}
// //                     </Bar>
// //                   </BarChart>
// //                 </ResponsiveContainer>
// //               )}
// //             </div>
// //           </div>
          
// //           <div className="volunteer-alert-box">
// //             <div className="volunteer-alert-icon">⚡</div>
// //             <h3 className="volunteer-alert-title">Quick Navigation</h3>
// //             <p className="volunteer-alert-text">Manage your volunteer force or review all mission reports.</p>
// //             <Link to="/admin/users" className="volunteer-alert-btn" style={{ marginBottom: '10px', background: '#2D5A27' }}>
// //               <span style={{ marginRight: '8px' }}>👥</span> Manage Volunteers
// //             </Link>
// //             <Link to="/admin/rescue-reports" className="volunteer-alert-btn" style={{ background: '#1976D2' }}>
// //               <span style={{ marginRight: '8px' }}>📋</span> View All Reports
// //             </Link>
// //           </div>
// //         </div>

// //         <div className="recent-reports-section">
// //           <div className="section-header">
// //             <h3>Recent Reports ({reports.length})</h3>
// //             <Link to="/admin/rescue-reports" className="view-all-link">View All Reports →</Link>
// //           </div>
// //           <div className="reports-table-container">
// //             {reportsLoading ? (
// //               <div className="loading-message"><div className="loading-spinner-small"></div><p>Loading reports...</p></div>
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
// //                       <td>
// //                         <div className="animal-cell">
// //                           <span className="animal-emoji">{getAnimalEmoji(report.animal_type)}</span>
// //                           <span className="animal-name">{report.animal_type || 'Unknown'}</span>
// //                         </div>
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
// //               <div className="no-reports"><p>No reports found in the system.</p></div>
// //             )}
// //           </div>
// //         </div>
// //       </div>
// //     </div>
// //   );
// // };

// // // ===========================================
// // // VOLUNTEER DASHBOARD
// // // ===========================================
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
// //   const [taskDetails, setTaskDetails] = useState<{[key: number]: VolunteerTask}>({});
  
// //   useEffect(() => {
// //     const fetchAllTasks = async () => {
// //       if (!user?.user_id) return;
      
// //       try {
// //         setMissionsLoading(true);
// //         setFetchError(null);
// //         const token = sessionStorage.getItem('token') || localStorage.getItem('token');
        
// //         if (!token) {
// //           setFetchError('No authentication token');
// //           return;
// //         }

// //         const response = await fetch(`http://localhost:5000/api/volunteers/tasks`, {
// //           method: 'GET',
// //           headers: { 'Authorization': `Bearer ${token}`, 'Content-Type': 'application/json' }
// //         });
        
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
// //       const token = sessionStorage.getItem('token') || localStorage.getItem('token');
// //       const response = await fetch(`http://localhost:5000/api/tasks/${taskId}/evidence`, {
// //         headers: { 'Authorization': `Bearer ${token}` }
// //       });
// //       const data = await response.json();
// //       if (data.success) {
// //         setTaskEvidence(prev => ({ ...prev, [taskId]: data.data }));
// //       }
// //     } catch (error) {
// //       console.error('Error fetching evidence:', error);
// //     }
// //   };

// //   const fetchTaskAdminNotes = async (reportId: number, taskId: number) => {
// //     try {
// //       const token = sessionStorage.getItem('token') || localStorage.getItem('token');
// //       const response = await fetch(`http://localhost:5000/api/reports/${reportId}/admin-notes`, {
// //         headers: { 'Authorization': `Bearer ${token}` }
// //       });
// //       const data = await response.json();
// //       if (data.success) {
// //         setTaskAdminNotes(prev => ({ ...prev, [taskId]: data.data }));
// //       }
// //     } catch (error) {
// //       console.error('Error fetching admin notes:', error);
// //     }
// //   };

// //   const fetchFullTaskDetails = async (taskId: number) => {
// //     try {
// //       const token = sessionStorage.getItem('token') || localStorage.getItem('token');
// //       const response = await fetch(
// //         `http://localhost:5000/api/tasks/task/${taskId}/full-details`,
// //         {
// //           headers: { 'Authorization': `Bearer ${token}` }
// //         }
// //       );
      
// //       const data = await response.json();
// //       if (data.success) {
// //         setTaskDetails(prev => ({ ...prev, [taskId]: data.data.task }));
// //         return data.data;
// //       }
// //     } catch (error) {
// //       console.error('Error fetching full task details:', error);
// //     }
// //     return null;
// //   };

// //   const handleAcceptTask = async (taskId: number) => {
// //     try {
// //       setActionLoading(true);
// //       const token = sessionStorage.getItem('token') || localStorage.getItem('token');
      
// //       const response = await fetch(`http://localhost:5000/api/volunteers/tasks/${taskId}/accept`, {
// //         method: 'PATCH',
// //         headers: { 'Authorization': `Bearer ${token}`, 'Content-Type': 'application/json' }
// //       });
      
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
// //       const token = sessionStorage.getItem('token') || localStorage.getItem('token');
      
// //       const response = await fetch(`http://localhost:5000/api/volunteers/tasks/${taskId}/decline`, {
// //         method: 'PATCH',
// //         headers: { 'Authorization': `Bearer ${token}`, 'Content-Type': 'application/json' },
// //         body: JSON.stringify({ reason })
// //       });
      
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
// //       const token = sessionStorage.getItem('token') || localStorage.getItem('token');
      
// //       const formData = new FormData();
// //       formData.append('proofs', file);
      
// //       const uploadResponse = await fetch(`http://localhost:5000/api/tasks/${taskId}/upload-proofs`, {
// //         method: 'POST',
// //         headers: { 'Authorization': `Bearer ${token}` },
// //         body: formData
// //       });
      
// //       const uploadData = await uploadResponse.json();
      
// //       if (!uploadData.success) {
// //         toast.success('Failed to upload proof: ' + uploadData.message);
// //         return;
// //       }
      
// //       const noteResponse = await fetch(`http://localhost:5000/api/tasks/${taskId}/completion-notes`, {
// //         method: 'POST',
// //         headers: { 'Authorization': `Bearer ${token}`, 'Content-Type': 'application/json' },
// //         body: JSON.stringify({ note_text: notes, volunteer_id: user.user_id })
// //       });
      
// //       const noteData = await noteResponse.json();
      
// //       if (!noteData.success) {
// //         toast.success('Failed to save completion note: ' + noteData.message);
// //         return;
// //       }
      
// //       // Refresh evidence after upload
// //       fetchTaskEvidence(taskId);
// //       toast.success('Evidence uploaded successfully!');
      
// //     } catch (error) {
// //       console.error('Error uploading evidence:', error);
// //       toast.success('Failed to upload evidence');
// //     } finally {
// //       setActionLoading(false);
// //     }
// //   };

// //   const handleViewTaskDetails = async (task: VolunteerTask) => {
// //     setSelectedTask(task);
    
// //     try {
// //       const fullDetails = await fetchFullTaskDetails(task.task_id);
      
// //       if (fullDetails) {
// //         setSelectedTask(fullDetails.task);
// //         setTaskEvidence(prev => ({ ...prev, [task.task_id]: fullDetails.evidence || [] }));
// //         setTaskAdminNotes(prev => ({ ...prev, [task.task_id]: fullDetails.admin_notes || [] }));
// //       } else {
// //         await Promise.all([
// //           fetchTaskEvidence(task.task_id),
// //           fetchTaskAdminNotes(task.report_id, task.task_id)
// //         ]);
// //       }
// //     } catch (error) {
// //       console.error('Error in handleViewTaskDetails:', error);
// //       await Promise.all([
// //         fetchTaskEvidence(task.task_id),
// //         fetchTaskAdminNotes(task.report_id, task.task_id)
// //       ]);
// //     }
    
// //     setIsTaskModalOpen(true);
// //   };

// //   const displayedActiveMissions = showAllActive ? activeMissions : activeMissions.slice(0, 3);
// //   const displayedPendingTasks = showAllPending ? pendingTasks : pendingTasks.slice(0, 3);

// //   useEffect(() => {
// //     const style = document.createElement('style');
// //     style.textContent = `
// //       @keyframes pulse {
// //         0% { opacity: 1; transform: scale(1); }
// //         50% { opacity: 0.7; transform: scale(1.1); }
// //         100% { opacity: 1; transform: scale(1); }
// //       }
// //     `;
// //     document.head.appendChild(style);
// //     return () => {
// //       document.head.removeChild(style);
// //     };
// //   }, []);

// //   return (
// //     <div className="dashboard-wrapper animate-fade-in">
// //       <div className="volunteer-dashboard-new" style={{ maxWidth: '1200px', margin: '0 auto' }}>
        
// //         {/* Header Section */}
// //         <div className="reports-header" style={{ marginBottom: '2rem' }}>
// //           <div className="reports-header-content">
// //             <h1 className="reports-title">Welcome back, Ranger {user.username}!</h1>
// //             <p className="reports-subtitle">Your dedication saves lives. Ready for your next mission?</p>
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
// //             <Link to="/tasks" className="reports-btn refresh"><span className="btn-icon">📋</span> Mission Board</Link>
// //             <Link to="/profile" className="reports-btn refresh"><span className="btn-icon">🏆</span> My Profile</Link>
// //           </div>
// //         </div>

// //         {/* Stats Cards */}
// //         <div className="reports-filters-card" style={{ marginBottom: '2rem', padding: '1.5rem' }}>
// //           <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '1.5rem' }}>
// //             <div style={{ background: 'linear-gradient(135deg, #2D5A27 0%, #1e3f1a 100%)', borderRadius: '12px', padding: '1.25rem', color: 'white' }}>
// //               <div style={{ fontSize: '0.85rem', opacity: '0.9', marginBottom: '0.5rem' }}>TOTAL RESCUES</div>
// //               <div style={{ fontSize: '2.5rem', fontWeight: '700', lineHeight: '1' }}>{completedTasksCount}</div>
// //               <div style={{ fontSize: '0.8rem', opacity: '0.8', marginTop: '0.5rem' }}>Lives Saved ✓</div>
// //             </div>

// //             <div style={{ background: 'linear-gradient(135deg, #1976D2 0%, #0D47A1 100%)', borderRadius: '12px', padding: '1.25rem', color: 'white' }}>
// //               <div style={{ fontSize: '0.85rem', opacity: '0.9', marginBottom: '0.5rem' }}>ACTIVE MISSIONS</div>
// //               <div style={{ fontSize: '2.5rem', fontWeight: '700', lineHeight: '1' }}>{activeMissions.length}</div>
// //               <div style={{ fontSize: '0.8rem', opacity: '0.8', marginTop: '0.5rem' }}>In Progress 🎯</div>
// //             </div>

// //             <div style={{ background: 'linear-gradient(135deg, #FF9F1C 0%, #E65100 100%)', borderRadius: '12px', padding: '1.25rem', color: 'white' }}>
// //               <div style={{ fontSize: '0.85rem', opacity: '0.9', marginBottom: '0.5rem' }}>PENDING</div>
// //               <div style={{ fontSize: '2.5rem', fontWeight: '700', lineHeight: '1' }}>{pendingTasks.length}</div>
// //               <div style={{ fontSize: '0.8rem', opacity: '0.8', marginTop: '0.5rem' }}>Awaiting Decision ⏳</div>
// //             </div>

// //             <div style={{ background: 'linear-gradient(135deg, #7D8C5A 0%, #5A6B3E 100%)', borderRadius: '12px', padding: '1.25rem', color: 'white' }}>
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

// //         {/* PENDING TASKS SECTION */}
// //         {pendingTasks.length > 0 && (
// //           <div className="reports-section" style={{ marginBottom: '2.5rem' }}>
// //             <div className="reports-header">
// //               <h2 className="reports-title" style={{ fontSize: '1.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
// //                 <span>⏳</span> Pending Confirmation ({pendingTasks.length})
// //               </h2>
// //               {pendingTasks.length > 3 && (
// //                 <button onClick={() => setShowAllPending(!showAllPending)} className="view-all-link">
// //                   {showAllPending ? 'Show Less ↑' : `View All (${pendingTasks.length}) →`}
// //                 </button>
// //               )}
// //             </div>
            
// //             <div className="reports-grid" style={{ gridTemplateColumns: 'repeat(3, 1fr)' }}>
// //               {displayedPendingTasks.map((task) => {
// //                 const statusBadge = getTaskStatusBadge(task.task_status_id);
// //                 const displayMission = taskDetails[task.task_id] || task;
                
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
// //                         {formatShortDate(displayMission.submitted_at)}
// //                       </div>
// //                     </div>

// //                     <div className="reports-card-body">
// //                       <div className="reports-animal-section">
// //                         <div className="reports-animal-icon large">{getAnimalEmoji(task.animal_type)}</div>
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
// //                             {hasEmail(task.reporter_email) && (
// //                               <span className="ranger-phone" style={{ fontSize: '0.75rem', color: '#E65100' }}>✉️ {task.reporter_email}</span>
// //                             )}
// //                             {hasPhone(task.reporter_phone) && (
// //                               <span className="ranger-phone" style={{ fontSize: '0.75rem', color: '#E65100' }}>📱 {formatPhoneNumber(task.reporter_phone)}</span>
// //                             )}
// //                           </div>
// //                         </div>
// //                       </div>
                      
// //                       <p className="reports-description" style={{ fontSize: '0.85rem', marginBottom: '0.5rem', color: '#666' }}>
// //                         {task.description?.length > 80 
// //                           ? `${task.description.substring(0, 80)}...` 
// //                           : task.description || 'No description provided'}
// //                       </p>
// //                     </div>

// //                     <div className="reports-card-footer">
// //                       <div style={{ display: 'flex', gap: '0.75rem' }}>
// //                         <button onClick={() => handleAcceptTask(task.task_id!)}
// //                                 disabled={actionLoading}
// //                                 className="reports-btn"
// //                                 style={{ flex: 2, background: '#2e7d32', color: 'white', padding: '0.6rem', fontSize: '0.85rem', fontWeight: '600', border: 'none', borderRadius: '4px', cursor: actionLoading ? 'not-allowed' : 'pointer' }}>
// //                           {actionLoading ? '...' : 'Accept'}
// //                         </button>
// //                         <button onClick={() => { setSelectedTaskId(task.task_id!); setIsDeclineModalOpen(true); }}
// //                                 disabled={actionLoading}
// //                                 className="reports-btn"
// //                                 style={{ flex: 1, background: 'transparent', color: '#c62828', border: '1px solid #c62828', padding: '0.6rem', fontSize: '0.85rem', fontWeight: '600', borderRadius: '4px', cursor: actionLoading ? 'not-allowed' : 'pointer' }}>
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

// //         {/* ACTIVE MISSIONS SECTION */}
// //         <div className="reports-section">
// //           <div className="reports-header">
// //             <h2 className="reports-title" style={{ fontSize: '1.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
// //               <span>📻</span> Your Active Missions ({activeMissions.length})
// //             </h2>
// //             {activeMissions.length > 3 && (
// //               <button onClick={() => setShowAllActive(!showAllActive)} className="view-all-link">
// //                 {showAllActive ? 'Show Less ↑' : `View All (${activeMissions.length}) →`}
// //               </button>
// //             )}
// //           </div>
          
// //           {missionsLoading ? (
// //             <div className="reports-loading-container">
// //               <div className="reports-loader"><div className="reports-spinner"></div><p className="reports-loader-text">Loading your missions...</p></div>
// //             </div>
// //           ) : fetchError ? (
// //             <div className="reports-empty-state">
// //               <span className="empty-state-emoji">❌</span>
// //               <h3>Error Loading Missions</h3>
// //               <p>{fetchError}</p>
// //               <button onClick={() => window.location.reload()} className="reports-btn primary">Retry</button>
// //             </div>
// //           ) : activeMissions.length > 0 ? (
// //             <>
// //               <div className="reports-grid" style={{ gridTemplateColumns: 'repeat(3, 1fr)' }}>
// //                 {displayedActiveMissions.map((mission) => {
// //                   const statusBadge = getTaskStatusBadge(mission.task_status_id);
// //                   const hasEvidence = taskEvidence[mission.task_id]?.length > 0;
// //                   const displayMission = taskDetails[mission.task_id] || mission;
                  
// //                   return (
// //                     <div key={mission.task_id} className="reports-card">
// //                       <div className="reports-card-header" style={{ background: '#1e3f1a' }}>
// //                         <div className="reports-card-title">
// //                           <span className="reports-id" style={{ background: 'rgba(255,255,255,0.2)', color: 'white' }}>
// //                             #{mission.report_id}
// //                           </span>
// //                           <span className="reports-status" style={{ background: 'rgba(255,255,255,0.2)', color: 'white' }}>
// //                             {statusBadge.text}
// //                           </span>
// //                         </div>
// //                         <div className="reports-date" style={{ color: 'rgba(255,255,255,0.9)' }}>
// //                           {formatShortDate(displayMission.submitted_at)}
// //                         </div>
// //                         <div className="reports-volunteer-tag" style={{ color: 'white', fontSize: '0.8rem', fontWeight: '600', marginTop: '5px' }}>
// //                           {user.username?.toUpperCase()}
// //                         </div>
// //                       </div>

// //                       <div className="reports-card-body">
// //                         <div className="reports-animal-section">
// //                           <div className="reports-animal-icon large">{getAnimalEmoji(mission.animal_type)}</div>
// //                           <div className="reports-animal-info">
// //                             <h4 style={{ color: '#1e3f1a' }}>{mission.animal_type || 'Animal'} Rescue</h4>
// //                             <span className="reports-condition" style={{ background: '#ffebee', color: '#c62828', fontWeight: 'bold' }}>
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
// //                               {hasEmail(mission.reporter_email) && (
// //                                 <span className="ranger-phone" style={{ fontSize: '0.75rem', color: '#2e7d32' }}>✉️ {mission.reporter_email}</span>
// //                               )}
// //                               {hasPhone(mission.reporter_phone) && (
// //                                 <span className="ranger-phone" style={{ fontSize: '0.75rem', color: '#2e7d32' }}>📱 {formatPhoneNumber(mission.reporter_phone)}</span>
// //                               )}
// //                             </div>
// //                           </div>
// //                         </div>
                        
// //                         <p className="reports-description" style={{ fontSize: '0.85rem', marginBottom: '0.5rem', color: '#666' }}>
// //                           {mission.description?.length > 100 
// //                             ? `${mission.description.substring(0, 100)}...` 
// //                             : mission.description || 'No description provided'}
// //                         </p>

// //                         {hasEvidence && (
// //                           <div className="evidence-indicator">
// //                             <span style={{ color: '#1e3f1a', fontSize: '0.8rem', fontWeight: '600' }}>
// //                               📸 Evidence Uploaded
// //                             </span>
// //                           </div>
// //                         )}

// //                         <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '0.7rem', color: '#888', marginTop: '0.5rem', paddingTop: '0.5rem', borderTop: '1px solid #e8dfc9' }}>
// //                           <span style={{ padding: '2px 8px', borderRadius: '12px', background: '#e3f2fd', color: '#1565c0', fontWeight: 'bold' }}>
// //                             {statusBadge.text}
// //                           </span>
// //                           {mission.assigned_at && <span>Assigned: {formatShortDate(mission.assigned_at)}</span>}
// //                         </div>
// //                       </div>

// //                       <div className="reports-card-footer">
// //                         <button onClick={() => handleViewTaskDetails(mission)}
// //                                 className="reports-btn"
// //                                 style={{ width: '100%', background: '#2D5A27', color: 'white', padding: '0.6rem', fontSize: '0.85rem', fontWeight: '600', border: 'none', borderRadius: '4px', cursor: 'pointer' }}>
// //                           View Details
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
// //               <Link to="/tasks" className="reports-btn primary">Browse Available Missions</Link>
// //             </div>
// //           )}
// //         </div>
// //       </div>

// //       {/* Task Detail Modal */}
// //       {selectedTask && (
// //         <TaskDetailModal 
// //           task={selectedTask}
// //           isOpen={isTaskModalOpen}
// //           onClose={() => { setIsTaskModalOpen(false); setSelectedTask(null); }}
// //           onUploadEvidence={handleUploadEvidence}
// //           actionLoading={actionLoading}
// //           userProfile={userProfile}
// //           evidence={taskEvidence[selectedTask.task_id]}
// //           adminNotes={taskAdminNotes[selectedTask.task_id]}
// //         />
// //       )}

// //       {/* Decline Modal */}
// //       {selectedTaskId && (
// //         <DeclineModal
// //           isOpen={isDeclineModalOpen}
// //           onClose={() => { setIsDeclineModalOpen(false); setSelectedTaskId(null); }}
// //           onSubmit={(reason) => handleDeclineTask(selectedTaskId, reason)}
// //           taskId={selectedTaskId}
// //         />
// //       )}
// //     </div>
// //   );
// // };

// // // ===========================================
// // // PENDING VOLUNTEER DASHBOARD
// // // ===========================================
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

// // // ===========================================
// // // REJECTED VOLUNTEER DASHBOARD
// // // ===========================================
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

// // // ===========================================
// // // USER DASHBOARD
// // // ===========================================
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
// //         <div className="welcome-section">
// //           <div className="welcome-content">
// //             <h1 className="welcome-title">
// //               <span className="welcome-greeting">Welcome back,</span>
// //               <span className="welcome-name">{user.username || 'Animal Friend'}!</span>
// //             </h1>
// //             <p className="welcome-subtitle">Track your rescue reports and their progress</p>
// //             {(userEmail || userPhone) && (
// //               <div className="contact-info">
// //                 {userEmail && <span className="contact-item">✉️ {userEmail}</span>}
// //                 {userPhone && <span className="contact-item">📱 {userPhone}</span>}
// //               </div>
// //             )}
// //           </div>
// //           <Link to="/create-report" className="create-report-btn">
// //             <span className="btn-icon">+</span>
// //             New Report
// //           </Link>
// //         </div>

// //         <div className="stats-grid">
// //           <div className="stat-card">
// //             <div className="stat-icon total">📋</div>
// //             <div className="stat-content">
// //               <div className="stat-value">{totalReports}</div>
// //               <div className="stat-label">Total Reports</div>
// //             </div>
// //           </div>
          
// //           <div className="stat-card">
// //             <div className="stat-icon submitted">⏳</div>
// //             <div className="stat-content">
// //               <div className="stat-value">{submittedReports}</div>
// //               <div className="stat-label">Submitted</div>
// //             </div>
// //           </div>
          
// //           <div className="stat-card">
// //             <div className="stat-icon in-progress">🚀</div>
// //             <div className="stat-content">
// //               <div className="stat-value">{inProgressReports}</div>
// //               <div className="stat-label">In Progress</div>
// //             </div>
// //           </div>
          
// //           <div className="stat-card">
// //             <div className="stat-icon completed">✅</div>
// //             <div className="stat-content">
// //               <div className="stat-value">{completedReports}</div>
// //               <div className="stat-label">Completed</div>
// //             </div>
// //           </div>
// //         </div>

// //         <div className="reports-section">
// //           <div className="section-header">
// //             <h2>Your Reports</h2>
// //             {myReports.length > 3 && (
// //               <Link to="/my-reports" className="view-all-link">View All ({myReports.length}) →</Link>
// //             )}
// //           </div>
          
// //           {reportsLoading ? (
// //             <div className="loading-container">
// //               <div className="spinner"></div>
// //               <p>Loading your reports...</p>
// //             </div>
// //           ) : myReports.length > 0 ? (
// //             <div className="reports-grid user-reports">
// //               {myReports.slice(0, 3).map(report => {
// //                 const statusClass = getStatusClass(report.status_name);
// //                 const statusText = getStatusText(report.status_name);
                
// //                 return (
// //                   <div key={report.report_id} className="report-card user">
// //                     <div className="card-header">
// //                       <div className="header-top">
// //                         <span className="report-id">#{report.report_id}</span>
// //                         <span className={`status-badge ${statusClass}`}>{statusText}</span>
// //                       </div>
// //                     </div>

// //                     <div className="card-body">
// //                       <div className="animal-info-row">
// //                         <div className="animal-emoji-container">
// //                           <span className="animal-emoji-large">{getAnimalEmoji(report.animal_type)}</span>
// //                         </div>
// //                         <div className="animal-details">
// //                           <h3 className="animal-type">{report.animal_type || 'Unknown Animal'}</h3>
// //                           <div className="condition-tag">
// //                             <span className="condition-indicator">●</span>
// //                             {report.animal_condition || 'Condition Unknown'}
// //                           </div>
// //                         </div>
// //                       </div>

// //                       <div className="location-row">
// //                         <span className="location-icon">📍</span>
// //                         <span className="location-text" title={report.location_address}>
// //                           {report.location_address}
// //                         </span>
// //                       </div>

// //                       <div className="date-row">
// //                         <span className="date-icon">📅</span>
// //                         <span className="date-text">{formatShortDate(report.submitted_at)}</span>
// //                       </div>

// //                       <p className="description-preview">
// //                         {report.description?.length > 80 
// //                           ? `${report.description.substring(0, 80)}...` 
// //                           : report.description}
// //                       </p>
// //                     </div>

// //                     <div className="card-footer">
// //                       <button 
// //                         className="view-details-btn"
// //                         onClick={() => onViewDetails(report)}
// //                       >
// //                         View Details
// //                         <span className="btn-arrow">→</span>
// //                       </button>
// //                     </div>
// //                   </div>
// //                 );
// //               })}
// //             </div>
// //           ) : (
// //             <div className="empty-state">
// //               <div className="empty-icon">📝</div>
// //               <h3>No Reports Yet</h3>
// //               <p>Create your first rescue report to get started</p>
// //               <Link to="/create-report" className="create-first-btn">
// //                 Create Report
// //               </Link>
// //             </div>
// //           )}
// //         </div>
// //       </div>
// //     </div>
// //   );
// // };

// // // ===========================================
// // // MAIN DASHBOARD COMPONENT
// // // ===========================================
// // export const Dashboard: React.FC = () => {
// //   const [isLoading, setIsLoading] = useState(true);
// //   const [userReports, setUserReports] = useState<Report[]>([]);
// //   const [allReports, setAllReports] = useState<Report[]>([]);
// //   const [reportsLoading, setReportsLoading] = useState(true);
// //   const [userProfile, setUserProfile] = useState<UserProfile | null>(null);
// //   const [selectedReport, setSelectedReport] = useState<Report | null>(null);
// //   const [isModalOpen, setIsModalOpen] = useState(false);
// //   const [reportEvidence, setReportEvidence] = useState<{[key: number]: TaskProof[]}>({});
// //   const [reportNotes, setReportNotes] = useState<{[key: number]: TaskCompletionNote[]}>({});
// //   const [loadingDetails, setLoadingDetails] = useState<{[key: number]: boolean}>({});
  
// //   const navigate = useNavigate();
// //   const { user: currentUser } = useAuth();
  
// //   useEffect(() => {
// //     const fetchUserProfile = async () => {
// //       if (!currentUser) return;
      
// //       try {
// //         const token = sessionStorage.getItem('token') || localStorage.getItem('token');
// //         const response = await fetch('http://localhost:5000/api/users/profile', {
// //           headers: { 'Authorization': `Bearer ${token}`, 'Content-Type': 'application/json' }
// //         });

// //         if (response.ok) {
// //           const data = await response.json();
// //           if (data.success) setUserProfile(data.data);
// //         }
// //       } catch (err) {
// //         console.error('Error fetching user profile:', err);
// //       }
// //     };

// //     fetchUserProfile();
// //   }, [currentUser]);

// //   const fetchAllReports = async () => {
// //     try {
// //       const token = sessionStorage.getItem('token') || localStorage.getItem('token');
// //       const response = await fetch('http://localhost:5000/api/reports/admin/all', {
// //         headers: { 'Authorization': `Bearer ${token}`, 'Content-Type': 'application/json' }
// //       });
      
// //       if (response.ok) {
// //         const data = await response.json();
// //         if (data.success) setAllReports(data.data || []);
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
// //         const token = sessionStorage.getItem('token') || localStorage.getItem('token');
        
// //         const response = await fetch('http://localhost:5000/api/reports/my-reports', {
// //           headers: { 'Authorization': `Bearer ${token}`, 'Content-Type': 'application/json' }
// //         });
        
// //         if (response.ok) {
// //           const data = await response.json();
// //           if (data.success) {
// //             const reportsData = data.data || [];
// //             // Don't override API data - let the API provide it
// //             setUserReports(reportsData);
// //           }
// //         }

// //         if (getUserRole(currentUser) === 'admin') await fetchAllReports();
// //       } catch (error) {
// //         console.error('Error fetching reports:', error);
// //       } finally {
// //         setReportsLoading(false);
// //       }
// //     };
    
// //     if (currentUser) fetchUserReports();
// //   }, [currentUser, userProfile]);
  
// //   useEffect(() => {
// //     if (currentUser) setIsLoading(false);
// //     else {
// //       const timer = setTimeout(() => setIsLoading(false), 1000);
// //       return () => clearTimeout(timer);
// //     }
// //   }, [currentUser]);
  
// //   const getUserRole = (user: any): string => {
// //     if (!user) return 'user';
    
// //     if (user.role && typeof user.role === 'object' && user.role.role_name) return user.role.role_name.toLowerCase();
// //     if (user.role_name) return user.role_name.toLowerCase();
// //     if (user.role_id) {
// //       if (user.role_id === 3) return 'admin';
// //       if (user.role_id === 2) return 'volunteer';
// //       if (user.role_id === 1) return 'user';
// //     }
// //     return 'user';
// //   };
  
// //   const getVolunteerStatus = (user: any): string | null => {
// //     if (!user) return null;

// //     if (user.approval_status_id !== undefined) {
// //       if (user.approval_status_id === 1) return 'pending';
// //       if (user.approval_status_id === 2) return 'approved';
// //       if (user.approval_status_id === 3) return 'rejected';
// //     }

// //     if (user.volunteer) {
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

// //   const fetchReportEvidence = async (reportId: number, taskId?: number) => {
// //     if (!taskId) return;
    
// //     try {
// //       setLoadingDetails(prev => ({ ...prev, [reportId]: true }));
// //       const token = sessionStorage.getItem('token') || localStorage.getItem('token');
      
// //       // Fetch evidence
// //       const evidenceRes = await fetch(`http://localhost:5000/api/tasks/${taskId}/evidence`, {
// //         headers: { 'Authorization': `Bearer ${token}` }
// //       });
// //       const evidenceData = await evidenceRes.json();
// //       if (evidenceData.success) {
// //         setReportEvidence(prev => ({ ...prev, [reportId]: evidenceData.data || [] }));
// //       }

// //       // Fetch completion notes
// //       const notesRes = await fetch(`http://localhost:5000/api/tasks/${taskId}/completion-notes`, {
// //         headers: { 'Authorization': `Bearer ${token}` }
// //       });
// //       const notesData = await notesRes.json();
// //       if (notesData.success) {
// //         setReportNotes(prev => ({ ...prev, [reportId]: notesData.data || [] }));
// //       }
// //     } catch (error) {
// //       console.error('Error fetching report details:', error);
// //     } finally {
// //       setLoadingDetails(prev => ({ ...prev, [reportId]: false }));
// //     }
// //   };

// //   const handleViewDetails = (report: Report) => {
// //     setSelectedReport(report);
// //     console.log('Viewing report details:', report); // Debug log
// //     if (report.task_id) {
// //       fetchReportEvidence(report.report_id, report.task_id);
// //     }
// //     setIsModalOpen(true);
// //   };

// //   useEffect(() => {
// //     if (!isLoading && !currentUser) navigate('/login');
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
// //           <Link to="/login" className="login-link">Go to Login</Link>
// //         </div>
// //       </div>
// //     );
// //   }

// //   const userRole = getUserRole(currentUser);
// //   const volunteerStatus = getVolunteerStatus(currentUser);

// //   const getStats = () => {
// //     const totalReports = userReports.length;
// //     const completedRescues = userReports.filter(r => r.status_name?.toLowerCase() === 'completed').length;
// //     const activeVolunteers = 1;
// //     const pendingApprovals = 0;
    
// //     const userId = currentUser.user_id?.toString() || '';
    
// //     const myReports = userReports.filter(r => {
// //       const reportUserId = Number(r.user_id);
// //       const currentUserId = Number(userId);
// //       return reportUserId === currentUserId;
// //     });
    
// //     const myCompletedTasks = userReports.filter(r => r.status_name?.toLowerCase() === 'completed').length;

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
// //       return <AdminDashboard stats={stats} reports={allReports} reportsLoading={reportsLoading} />;
// //     }
    
// //     if (userRole === 'volunteer') {
// //       if (volunteerStatus === 'rejected') {
// //         return <RejectedVolunteerDashboard user={currentUser} />;
// //       }
      
// //       if (volunteerStatus === 'pending' || volunteerStatus === 'none' || !volunteerStatus) {
// //         return <PendingVolunteerDashboard user={currentUser} />;
// //       }
      
// //       if (volunteerStatus === 'approved') {
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
      
// //       {/* Enhanced Detail Modal */}
// //       <ReportDetailModal 
// //         report={selectedReport}
// //         isOpen={isModalOpen}
// //         onClose={() => {
// //           setIsModalOpen(false);
// //           setSelectedReport(null);
// //         }}
// //         userPhone={userProfile?.phone}
// //         userEmail={userProfile?.email}
// //         userName={userProfile?.username}
// //         evidence={selectedReport ? reportEvidence[selectedReport.report_id] : []}
// //         notes={selectedReport ? reportNotes[selectedReport.report_id] : []}
// //         loading={selectedReport ? loadingDetails[selectedReport.report_id] : false}
// //       />
// //     </div>
// //   );
// // };

// // export default Dashboard;

// // this is the correct one

// // import React, { useState, useEffect, useCallback, useRef } from 'react';
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
// // import { Heatmap } from '../../components/Dashboard/HeatMap';
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
  
// //   // Reporter fields
// //   reporter_name?: string | null;
// //   reporter_phone?: string | null;
// //   reporter_email?: string | null;
  
// //   // Volunteer fields
// //   volunteer_name?: string | null;
// //   volunteer_id?: number;
// //   volunteer_phone?: string | null;
// //   volunteer_email?: string | null;
  
// //   // Task fields
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
// //   volunteer_name?: string;
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
// //   reporter_name: string | null;
// //   reporter_phone: string | null;
// //   reporter_email: string | null;
  
// //   // Volunteer fields
// //   volunteer_name: string;
// //   volunteer_email: string | null;
// //   volunteer_phone: string | null;
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

// // interface FullTaskDetails {
// //   task: VolunteerTask;
// //   evidence: TaskProof[];
// //   admin_notes: AdminNote[];
// //   completion_notes: TaskCompletionNote[];
// // }

// // // ===========================================
// // // HELPER FUNCTIONS - FIXED TO CHECK BOTH STORAGES
// // // ===========================================
// // const getToken = (): string | null => {
// //   // Check both localStorage (remember me) and sessionStorage (regular login)
// //   return localStorage.getItem('token') || sessionStorage.getItem('token');
// // };

// // const getStoredUser = (): any => {
// //   // Check both localStorage (remember me) and sessionStorage (regular login)
// //   const userStr = localStorage.getItem('resqall_user') || sessionStorage.getItem('resqall_user') || localStorage.getItem('resqall_user');
// //   if (userStr) {
// //     try {
// //       return JSON.parse(userStr);
// //     } catch {
// //       return null;
// //     }
// //   }
// //   return null;
// // };

// // const hasPhone = (phone?: string | null): boolean => {
// //   if (phone === null || phone === undefined) return false;
// //   if (typeof phone !== 'string') return false;
// //   return phone.trim().length > 0;
// // };

// // const hasEmail = (email?: string | null): boolean => {
// //   if (email === null || email === undefined) return false;
// //   if (typeof email !== 'string') return false;
// //   const trimmed = email.trim();
// //   return trimmed.length > 0 && trimmed.includes('@') && trimmed.includes('.');
// // };

// // const formatPhoneNumber = (phone?: string | null): string => {
// //   if (!hasPhone(phone)) return 'Not provided';
// //   const phoneStr = String(phone).trim();
// //   const cleaned = phoneStr.replace(/\D/g, '');
// //   if (cleaned.length === 10) return `+977 ${cleaned}`;
// //   return phoneStr;
// // };

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

// // const getStatusDisplay = (statusName?: string): string => {
// //   if (!statusName) return 'Unknown';
// //   return statusName
// //     .replace(/_/g, ' ')
// //     .replace(/\b\w/g, char => char.toUpperCase());
// // };

// // const getStatusClass = (statusName?: string): string => {
// //   const name = statusName?.toLowerCase() || '';
// //   if (name.includes('submitted')) return 'submitted';
// //   if (name.includes('review')) return 'review';
// //   if (name.includes('progress')) return 'progress';
// //   if (name.includes('completed')) return 'completed';
// //   if (name.includes('cancelled') || name.includes('declined')) return 'cancelled';
// //   return 'unknown';
// // };

// // const formatDate = (dateString: string | undefined): string => {
// //   if (!dateString) return 'Not available';
// //   try {
// //     const date = new Date(dateString);
// //     return date.toLocaleDateString('en-US', {
// //       month: 'short',
// //       day: 'numeric',
// //       year: 'numeric',
// //       hour: '2-digit',
// //       minute: '2-digit'
// //     });
// //   } catch {
// //     return 'Invalid date';
// //   }
// // };

// // const formatShortDate = (dateString: string): string => {
// //   if (!dateString) return 'Not available';
// //   try {
// //     const date = new Date(dateString);
// //     return date.toLocaleDateString('en-US', {
// //       month: 'short',
// //       day: 'numeric',
// //       year: 'numeric'
// //     });
// //   } catch {
// //     return 'Not available';
// //   }
// // };

// // const formatRelativeTime = (dateString: string): string => {
// //   if (!dateString) return 'Not available';
// //   try {
// //     const date = new Date(dateString);
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
// //   } catch {
// //     return 'Not available';
// //   }
// // };

// // const getStatusText = (statusName: string): string => {
// //   if (!statusName) return 'Unknown';
// //   return statusName
// //     .replace(/_/g, ' ')
// //     .split(' ')
// //     .map(word => word.charAt(0).toUpperCase() + word.slice(1))
// //     .join(' ');
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

// // // ===========================================
// // // LOCATION TRACKER COMPONENT
// // // ===========================================
// // const calculateDistance = (lat1: number, lng1: number, lat2: number, lng2: number): number => {
// //   const R = 6371;
// //   const dLat = (lat2 - lat1) * Math.PI / 180;
// //   const dLng = (lng2 - lng1) * Math.PI / 180;
// //   const a = 
// //     Math.sin(dLat/2) * Math.sin(dLat/2) +
// //     Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) * 
// //     Math.sin(dLng/2) * Math.sin(dLng/2);
// //   const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
// //   return R * c;
// // };

// // const LocationTracker: React.FC<{
// //   taskId: number;
// //   isActive: boolean;
// // }> = ({ taskId, isActive }) => {
// //   const [watchId, setWatchId] = useState<number | null>(null);
// //   const [lastLocation, setLastLocation] = useState<GeolocationPosition | null>(null);
// //   const [isTracking, setIsTracking] = useState(false);
// //   const [error, setError] = useState<string | null>(null);
// //   const [pendingPoints, setPendingPoints] = useState<number>(0);
  
// //   const pendingQueue = useRef<any[]>([]);
  
// //   const saveLocation = useCallback(async (latitude: number, longitude: number, accuracy: number) => {
// //     try {
// //       const token = getToken();
// //       if (!token) return;
      
// //       const response = await fetch('http://localhost:5000/api/volunteer/tracking/point', {
// //         method: 'POST',
// //         headers: {
// //           'Authorization': `Bearer ${token}`,
// //           'Content-Type': 'application/json'
// //         },
// //         body: JSON.stringify({ taskId, latitude, longitude, accuracy })
// //       });
      
// //       const data = await response.json();
// //       if (!data.success) {
// //         pendingQueue.current.push({ latitude, longitude, accuracy, timestamp: new Date() });
// //         setPendingPoints(pendingQueue.current.length);
// //       }
// //     } catch (error) {
// //       pendingQueue.current.push({ latitude, longitude, accuracy, timestamp: new Date() });
// //       setPendingPoints(pendingQueue.current.length);
// //     }
// //   }, [taskId]);
  
// //   const retryPendingPoints = useCallback(async () => {
// //     if (pendingQueue.current.length === 0) return;
    
// //     const token = getToken();
// //     if (!token) return;
    
// //     const points = [...pendingQueue.current];
// //     pendingQueue.current = [];
// //     setPendingPoints(0);
    
// //     for (const point of points) {
// //       try {
// //         await fetch('http://localhost:5000/api/volunteer/tracking/point', {
// //           method: 'POST',
// //           headers: {
// //             'Authorization': `Bearer ${token}`,
// //             'Content-Type': 'application/json'
// //           },
// //           body: JSON.stringify({
// //             taskId,
// //             latitude: point.latitude,
// //             longitude: point.longitude,
// //             accuracy: point.accuracy
// //           })
// //         });
// //       } catch (error) {
// //         pendingQueue.current.push(point);
// //         setPendingPoints(pendingQueue.current.length);
// //       }
// //     }
// //   }, [taskId]);
  
// //   const startTracking = useCallback(() => {
// //     if (!navigator.geolocation) {
// //       setError('Geolocation is not supported');
// //       return;
// //     }
    
// //     setError(null);
    
// //     navigator.geolocation.getCurrentPosition(
// //       (position) => {
// //         setLastLocation(position);
// //         saveLocation(
// //           position.coords.latitude,
// //           position.coords.longitude,
// //           position.coords.accuracy || 0
// //         );
// //       },
// //       () => {},
// //       { enableHighAccuracy: false, timeout: 10000, maximumAge: 60000 }
// //     );
    
// //     const id = navigator.geolocation.watchPosition(
// //       (position) => {
// //         let shouldSave = true;
        
// //         if (lastLocation) {
// //           const distance = calculateDistance(
// //             lastLocation.coords.latitude,
// //             lastLocation.coords.longitude,
// //             position.coords.latitude,
// //             position.coords.longitude
// //           );
// //           const timeDiff = (position.timestamp - lastLocation.timestamp) / 1000;
// //           shouldSave = distance > 0.05 || timeDiff > 30;
// //         }
        
// //         if (shouldSave) {
// //           saveLocation(
// //             position.coords.latitude,
// //             position.coords.longitude,
// //             position.coords.accuracy || 0
// //           );
// //         }
        
// //         setLastLocation(position);
// //       },
// //       (error) => {
// //         let errorMsg = 'Location error';
// //         switch(error.code) {
// //           case error.PERMISSION_DENIED: errorMsg = 'Permission denied'; break;
// //           case error.POSITION_UNAVAILABLE: errorMsg = 'Location unavailable'; break;
// //           case error.TIMEOUT: errorMsg = 'Location timeout'; break;
// //         }
// //         setError(errorMsg);
// //       },
// //       { enableHighAccuracy: true, timeout: 30000, maximumAge: 0 }
// //     );
    
// //     setWatchId(id);
// //     setIsTracking(true);
// //   }, [lastLocation, saveLocation]);
  
// //   const stopTracking = useCallback(() => {
// //     if (watchId !== null) {
// //       navigator.geolocation.clearWatch(watchId);
// //       setWatchId(null);
// //       setIsTracking(false);
// //     }
// //   }, [watchId]);
  
// //   useEffect(() => {
// //     if (isActive) {
// //       const timer = setTimeout(() => startTracking(), 1000);
// //       return () => { clearTimeout(timer); stopTracking(); };
// //     } else {
// //       stopTracking();
// //     }
// //   }, [isActive, startTracking, stopTracking]);
  
// //   useEffect(() => {
// //     const handleOnline = () => retryPendingPoints();
// //     window.addEventListener('online', handleOnline);
// //     return () => window.removeEventListener('online', handleOnline);
// //   }, [retryPendingPoints]);
  
// //   useEffect(() => {
// //     const interval = setInterval(() => {
// //       if (navigator.onLine && pendingQueue.current.length > 0) retryPendingPoints();
// //     }, 30000);
// //     return () => clearInterval(interval);
// //   }, [retryPendingPoints]);
  
// //   if (!isActive) return null;
  
// //   return (
// //     <div style={{
// //       position: 'fixed', bottom: '20px', right: '20px',
// //       background: error ? '#ffebee' : '#e8f5e9',
// //       padding: '8px 12px', borderRadius: '20px', fontSize: '0.8rem',
// //       boxShadow: '0 2px 5px rgba(0,0,0,0.2)', zIndex: 9999,
// //       display: 'flex', alignItems: 'center', gap: '6px'
// //     }}>
// //       <span style={{
// //         width: '8px', height: '8px', borderRadius: '50%',
// //         background: error ? '#f44336' : (isTracking ? '#4caf50' : '#ff9800'),
// //         animation: isTracking && !error ? 'pulse 2s infinite' : 'none'
// //       }}></span>
// //       <span>
// //         {error ? 'Location Error' : (isTracking ? 'Sharing Location' : 'Starting...')}
// //       </span>
// //       {pendingPoints > 0 && (
// //         <span style={{ background: '#fff3e0', padding: '2px 6px', borderRadius: '12px', fontSize: '0.7rem' }}>
// //           {pendingPoints} pending
// //         </span>
// //       )}
// //     </div>
// //   );
// // };

// // // ===========================================
// // // DECLINE MODAL
// // // ===========================================
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
// //         onClose();
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
// //             <label className="form-label">Reason <span className="required">*</span></label>
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
// //               <label className="form-label">Please specify <span className="required">*</span></label>
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
// //           <button className="modal-btn secondary" onClick={onClose}>Cancel</button>
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

// // // ===========================================
// // // UPLOAD EVIDENCE MODAL
// // // ===========================================
// // const UploadEvidenceModal: React.FC<{
// //   isOpen: boolean;
// //   onClose: () => void;
// //   onSubmit: (file: File, notes: string) => void;
// //   taskId: number;
// // }> = ({ isOpen, onClose, onSubmit, taskId }) => {
// //   const [proofFile, setProofFile] = useState<File | null>(null);
// //   const [notes, setNotes] = useState('');
// //   const [previewUrl, setPreviewUrl] = useState<string | null>(null);
// //   const [uploading, setUploading] = useState(false);
// //   const [uploadError, setUploadError] = useState<string | null>(null);

// //   if (!isOpen) return null;

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
// //         if (previewUrl) URL.revokeObjectURL(previewUrl);
// //         setProofFile(file);
// //         setPreviewUrl(URL.createObjectURL(file));
// //       }
// //     }
// //   };

// //   const removeFile = () => {
// //     if (previewUrl) URL.revokeObjectURL(previewUrl);
// //     setProofFile(null);
// //     setPreviewUrl(null);
// //     setUploadError(null);
// //   };

// //   const handleSubmit = async () => {
// //     if (!proofFile) {
// //       setUploadError('Please select a photo');
// //       return;
// //     }
// //     if (!notes.trim()) {
// //       setUploadError('Please enter completion notes');
// //       return;
// //     }
    
// //     setUploading(true);
// //     try {
// //       await onSubmit(proofFile, notes);
// //       setProofFile(null);
// //       setNotes('');
// //       setPreviewUrl(null);
// //       onClose();
// //     } finally {
// //       setUploading(false);
// //     }
// //   };

// //   return (
// //     <div className="modal-overlay" onClick={onClose}>
// //       <div className="modal-content" onClick={e => e.stopPropagation()}>
// //         <div className="modal-header" style={{ background: 'linear-gradient(135deg, #2D5A27 0%, #1e3f1a 100%)' }}>
// //           <div className="modal-header-left">
// //             <span className="modal-icon">📸</span>
// //             <div>
// //               <h3 className="modal-title">Upload Evidence for Task #{taskId}</h3>
// //               <p className="modal-subtitle">Add photos and notes to complete the mission</p>
// //             </div>
// //           </div>
// //           <button className="modal-close" onClick={onClose}>×</button>
// //         </div>
        
// //         <div className="modal-body">
// //           {uploadError && (
// //             <div style={{ color: '#c62828', marginBottom: '15px', padding: '10px', background: '#ffebee', borderRadius: '4px' }}>
// //               {uploadError}
// //             </div>
// //           )}

// //           <div className="form-group">
// //             <label className="form-label">Proof Photo <span className="required">*</span></label>
// //             {previewUrl ? (
// //               <div className="single-photo-preview">
// //                 <div style={{ position: 'relative', display: 'inline-block', width: '100%' }}>
// //                   <img src={previewUrl} alt="Preview" style={{ width: '100%', maxHeight: '200px', objectFit: 'contain', borderRadius: '4px' }} />
// //                   <button onClick={removeFile} style={{ position: 'absolute', top: '5px', right: '5px', background: '#c62828', color: 'white', border: 'none', borderRadius: '50%', width: '25px', height: '25px', cursor: 'pointer' }}>×</button>
// //                 </div>
// //                 <p style={{ marginTop: '5px' }}>{proofFile?.name} ({(proofFile!.size / 1024).toFixed(1)} KB)</p>
// //               </div>
// //             ) : (
// //               <label className="reports-btn primary" style={{ cursor: 'pointer', display: 'inline-block' }}>
// //                 Choose Photo
// //                 <input type="file" accept="image/jpeg,image/png,image/jpg,image/gif" onChange={handleFileChange} style={{ display: 'none' }} />
// //               </label>
// //             )}
// //           </div>

// //           <div className="form-group" style={{ marginTop: '15px' }}>
// //             <label className="form-label">Completion Notes <span className="required">*</span></label>
// //             <textarea
// //               value={notes}
// //               onChange={(e) => setNotes(e.target.value)}
// //               placeholder="Describe the rescue outcome, any challenges, and the animal's condition..."
// //               rows={4}
// //               maxLength={500}
// //               style={{ width: '100%', padding: '10px', border: '2px solid #2D5A27', borderRadius: '8px' }}
// //             />
// //             <p style={{ fontSize: '0.75rem', color: '#666', marginTop: '5px', textAlign: 'right' }}>
// //               {notes.length}/500 characters
// //             </p>
// //           </div>
// //         </div>
        
// //         <div className="modal-footer">
// //   <button className="modal-btn secondary" onClick={onClose}>Cancel</button>
// //   <button 
// //     className="modal-btn primary" 
// //     onClick={handleSubmit}
// //     disabled={!proofFile || !notes.trim() || uploading}
// //   >
// //     {uploading ? 'Uploading...' : 'Submit Evidence'}
// //   </button>
// // </div>
// //       </div>
// //     </div>
// //   );
// // };

// // // ===========================================
// // // TASK DETAIL MODAL (WITH LOCATION TRACKER)
// // // ===========================================
// // const TaskDetailModal: React.FC<{
// //   task: VolunteerTask | null;
// //   isOpen: boolean;
// //   onClose: () => void;
// //   onUploadEvidence: (taskId: number, file: File, notes: string) => void;
// //   actionLoading: boolean;
// //   userProfile: UserProfile | null;
// //   evidence?: TaskProof[];
// //   adminNotes?: AdminNote[];
// // }> = ({ 
// //   task, 
// //   isOpen, 
// //   onClose, 
// //   onUploadEvidence,
// //   actionLoading, 
// //   userProfile, 
// //   evidence = [], 
// //   adminNotes = []
// // }) => {
// //   const [selectedImage, setSelectedImage] = useState<string | null>(null);
// //   const [showUploadForm, setShowUploadForm] = useState(false);
// //   const [isTrackingActive, setIsTrackingActive] = useState(false);

// //   useEffect(() => {
// //     if (task?.task_status_id === 2) setIsTrackingActive(true);
// //     else setIsTrackingActive(false);
// //   }, [task?.task_status_id]);

// //   if (!isOpen || !task) return null;

// //   const hasProofs = evidence.length > 0;

// //   const getFullImageUrl = (proofUrl: string) => {
// //     if (proofUrl.startsWith('http')) return proofUrl;
// //     const cleanUrl = proofUrl.startsWith('/') ? proofUrl.substring(1) : proofUrl;
// //     return `http://localhost:5000/${cleanUrl}`;
// //   };

// //   return (
// //     <>
// //       {/* Location Tracker - Only visible when task is active */}
// //       {task.task_status_id === 2 && (
// //         <LocationTracker taskId={task.task_id} isActive={isTrackingActive} />
// //       )}

// //       <div className="reports-modal-overlay" onClick={onClose}>
// //         <div className="reports-modal-content large" onClick={e => e.stopPropagation()}>
// //           <div className="reports-modal-header dark" style={{ background: '#1e3f1a' }}>
// //             <div>
// //               <h3>Rescue Report #{task.report_id}</h3>
// //               <div className="reports-modal-subheader">
// //                 <span className="reports-status-badge" style={{ 
// //                   background: 'rgba(255,255,255,0.2)', color: 'white', padding: '0.25rem 0.75rem',
// //                   borderRadius: '20px', fontSize: '0.75rem', fontWeight: '600', textTransform: 'uppercase'
// //                 }}>
// //                   {getTaskStatusBadge(task.task_status_id).text}
// //                 </span>
// //                 <span className="reports-meta" style={{ color: 'rgba(255,255,255,0.8)' }}>
// //                   Reported: {formatRelativeTime(task.submitted_at)}
// //                 </span>
// //               </div>
// //             </div>
// //             <button className="reports-modal-close" onClick={onClose}>×</button>
// //           </div>
          
// //           <div className="reports-modal-body">
// //             <div className="reports-detail-grid">
// //               <div className="reports-detail-column">
// //                 <div className="reports-info-card">
// //                   <div className="reports-card-header beige"><h4>🐾 Animal Information</h4></div>
// //                   <div className="reports-card-content">
// //                     <div className="reports-animal-display">
// //                       <div className="reports-animal-icon">{getAnimalEmoji(task.animal_type)}</div>
// //                       <div className="reports-animal-details">
// //                         <div className="reports-animal-type">{task.animal_type}</div>
// //                         <div className="reports-animal-condition">
// //                           <span className="condition-tag">{task.animal_condition}</span>
// //                         </div>
// //                       </div>
// //                     </div>
// //                   </div>
// //                 </div>

// //                 <div className="reports-info-card">
// //                   <div className="reports-card-header beige"><h4>👤 Reporter Details</h4></div>
// //                   <div className="reports-card-content">
// //                     <div className="reports-detail-list">
// //                       <div className="reports-detail-row">
// //                         <span className="reports-detail-label">Name</span>
// //                         <span className="reports-detail-value">{task.reporter_name || 'Anonymous'}</span>
// //                       </div>
// //                       {hasEmail(task.reporter_email) && (
// //                         <div className="reports-detail-row">
// //                           <span className="reports-detail-label">Email</span>
// //                           <span className="reports-detail-value">✉️ {task.reporter_email}</span>
// //                         </div>
// //                       )}
// //                       {hasPhone(task.reporter_phone) && (
// //                         <div className="reports-detail-row">
// //                           <span className="reports-detail-label">Phone</span>
// //                           <span className="reports-detail-value">{formatPhoneNumber(task.reporter_phone)}</span>
// //                         </div>
// //                       )}
// //                     </div>
// //                   </div>
// //                 </div>

// //                 <div className="reports-info-card">
// //                   <div className="reports-card-header beige"><h4>📍 Location</h4></div>
// //                   <div className="reports-card-content">
// //                     <div className="reports-location-info">
// //                       <p>{task.location_address}</p>
// //                       <button className="reports-btn map" onClick={() => window.open(`https://maps.google.com/?q=${encodeURIComponent(task.location_address)}`, '_blank')}>
// //                         View on Map
// //                       </button>
// //                     </div>
// //                   </div>
// //                 </div>

// //                 <div className="reports-info-card">
// //                   <div className="reports-card-header beige"><h4>⏱️ Timeline</h4></div>
// //                   <div className="reports-card-content">
// //                     <div className="reports-detail-list">
// //                       <div className="reports-detail-row">
// //                         <span className="reports-detail-label">Reported</span>
// //                         <span className="reports-detail-value">{formatDate(task.submitted_at)}</span>
// //                       </div>
// //                       {task.assigned_at && (
// //                         <div className="reports-detail-row">
// //                           <span className="reports-detail-label">Assigned</span>
// //                           <span className="reports-detail-value">{formatDate(task.assigned_at)}</span>
// //                         </div>
// //                       )}
// //                       {task.started_at && (
// //                         <div className="reports-detail-row">
// //                           <span className="reports-detail-label">Started</span>
// //                           <span className="reports-detail-value">{formatDate(task.started_at)}</span>
// //                         </div>
// //                       )}
// //                     </div>
// //                   </div>
// //                 </div>
// //               </div>

// //               <div className="reports-detail-column">
// //                 <div className="reports-info-card">
// //                   <div className="reports-card-header beige"><h4>📝 Mission Description</h4></div>
// //                   <div className="reports-card-content">
// //                     <div className="reports-description"><p>{task.description}</p></div>
// //                     {task.user_note && (
// //                       <div className="reports-user-note">
// //                         <div className="note-label">Reporter's Note:</div>
// //                         <p>{task.user_note}</p>
// //                       </div>
// //                     )}
// //                   </div>
// //                 </div>

// //                 <div className="reports-info-card">
// //                   <div className="reports-card-header beige">
// //                     <div className="reports-header-row" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
// //                       <h4>📸 Evidence Photos</h4>
// //                       {task.task_status_id === 2 && !hasProofs && !showUploadForm && (
// //                         <button className="reports-btn primary small" onClick={() => setShowUploadForm(true)}>
// //                           + Upload Evidence
// //                         </button>
// //                       )}
// //                     </div>
// //                   </div>
// //                   <div className="reports-card-content">
// //                     {evidence.length > 0 ? (
// //                       <div>
// //                         <p style={{ marginBottom: '10px', color: '#2D5A27', fontWeight: '600' }}>
// //                           {evidence.length} photo(s) uploaded
// //                         </p>
// //                         <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '15px' }}>
// //                           {evidence.map((proof) => (
// //                             <div key={proof.proof_id} style={{ border: '1px solid #e8dfc9', borderRadius: '8px', padding: '8px', background: '#f9f5ec', cursor: 'pointer' }}
// //                                  onClick={() => setSelectedImage(getFullImageUrl(proof.proof_url))}>
// //                               <img src={getFullImageUrl(proof.proof_url)} alt={`Evidence ${proof.proof_id}`}
// //                                    style={{ width: '100%', height: '120px', objectFit: 'cover', borderRadius: '4px' }}
// //                                    onError={(e) => { e.currentTarget.style.display = 'none'; }} />
// //                               <p style={{ fontSize: '0.7rem', textAlign: 'center', marginTop: '5px', color: '#666' }}>
// //                                 Uploaded: {formatShortDate(proof.uploaded_at)}
// //                               </p>
// //                             </div>
// //                           ))}
// //                         </div>
// //                       </div>
// //                     ) : (
// //                       <div>
// //                         {showUploadForm ? (
// //                           <p>Please use the Upload Evidence button to add photos.</p>
// //                         ) : (
// //                           <p>No evidence uploaded yet.</p>
// //                         )}
// //                       </div>
// //                     )}
// //                   </div>
// //                 </div>

// //                 {adminNotes.length > 0 && (
// //                   <div className="reports-info-card">
// //                     <div className="reports-card-header beige"><h4>📌 Admin Notes</h4></div>
// //                     <div className="reports-card-content">
// //                       {adminNotes.map((note) => (
// //                         <div key={note.note_id} style={{ background: '#f9f5ec', padding: '12px', borderRadius: '8px', marginBottom: '10px', borderLeft: '3px solid #2D5A27' }}>
// //                           <div style={{ display: 'flex', justifyContent: 'space-between' }}>
// //                             <span style={{ fontWeight: 'bold', color: '#2D5A27' }}>{note.admin_name || 'Admin'}</span>
// //                             <span style={{ fontSize: '0.75rem', color: '#666' }}>{formatRelativeTime(note.created_at)}</span>
// //                           </div>
// //                           <p style={{ margin: 0 }}>{note.note_text}</p>
// //                         </div>
// //                       ))}
// //                     </div>
// //                   </div>
// //                 )}
// //               </div>
// //             </div>

// //             {selectedImage && (
// //               <div className="image-lightbox" onClick={() => setSelectedImage(null)} style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, background: 'rgba(0,0,0,0.9)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 2000 }}>
// //                 <img src={selectedImage} alt="Enlarged evidence" style={{ maxWidth: '90%', maxHeight: '90%', objectFit: 'contain' }} />
// //                 <button onClick={() => setSelectedImage(null)} style={{ position: 'absolute', top: '20px', right: '20px', background: 'white', border: 'none', borderRadius: '50%', width: '40px', height: '40px', fontSize: '20px', cursor: 'pointer' }}>×</button>
// //               </div>
// //             )}
// //           </div>
          
// //           <div className="reports-modal-footer">
// //             <button className="reports-btn secondary" onClick={onClose}>Close</button>
// //           </div>
// //         </div>
// //       </div>

// //       {/* Upload Evidence Modal */}
// //       {showUploadForm && (
// //         <UploadEvidenceModal
// //           isOpen={showUploadForm}
// //           onClose={() => setShowUploadForm(false)}
// //           onSubmit={(file, notes) => {
// //             onUploadEvidence(task.task_id, file, notes);
// //             setShowUploadForm(false);
// //           }}
// //           taskId={task.task_id}
// //         />
// //       )}
// //     </>
// //   );
// // };

// // // ===========================================
// // // ENHANCED REPORT DETAIL MODAL
// // // ===========================================
// // const ReportDetailModal: React.FC<{
// //   report: Report | null;
// //   isOpen: boolean;
// //   onClose: () => void;
// //   userPhone?: string;
// //   userEmail?: string;
// //   userName?: string;
// //   evidence?: TaskProof[];
// //   notes?: TaskCompletionNote[];
// //   loading?: boolean;
// // }> = ({ report, isOpen, onClose, userPhone, userEmail, userName, evidence = [], notes = [], loading = false }) => {
// //   const [selectedImage, setSelectedImage] = useState<string | null>(null);
// //   const [activeTab, setActiveTab] = useState<'details' | 'evidence' | 'notes'>('details');
// //   const [imageErrors, setImageErrors] = useState<Record<number, boolean>>({});

// //   if (!isOpen || !report) return null;

// //   // Use report fields directly
// //   const reporterName = report.reporter_name || userName || 'Anonymous';
// //   const phoneNumber = report.reporter_phone || userPhone;
// //   const emailAddress = report.reporter_email || userEmail;
// //   const volunteerName = report.volunteer_name;
  
// //   const isCompleted = report.status_id === 4;
// //   const hasEvidence = evidence.length > 0;
// //   const hasNotes = notes.length > 0;

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

// //   const handleImageError = (proofId: number) => {
// //     setImageErrors(prev => ({ ...prev, [proofId]: true }));
// //   };

// //   return (
// //     <div className="modal-overlay" onClick={onClose}>
// //       <div className="modal-content report-detail-modal horizontal-modal" onClick={e => e.stopPropagation()}>
// //         {/* Header */}
// //         <div className="modal-header compact-header">
// //           <div className="modal-header-left">
// //             <span className="modal-animal-emoji small">{getAnimalEmoji(report.animal_type)}</span>
// //             <div>
// //               <h3 className="modal-title small">Report #{report.report_id}</h3>
// //               <p className="modal-subtitle small">{report.animal_type} • {report.animal_condition}</p>
// //             </div>
// //           </div>
// //           <div className="header-actions">
// //             <span className={`status-badge-small status-${getStatusClass(report.status_name)}`}>
// //               {getStatusDisplay(report.status_name)}
// //             </span>
// //             <button className="modal-close small" onClick={onClose}>×</button>
// //           </div>
// //         </div>
        
// //         {/* Tab Navigation */}
// //         <div className="modal-tabs">
// //           <button 
// //             className={`modal-tab ${activeTab === 'details' ? 'active' : ''}`}
// //             onClick={() => setActiveTab('details')}
// //           >
// //             📋 Details
// //           </button>
// //           {isCompleted && (
// //             <>
// //               <button 
// //                 className={`modal-tab ${activeTab === 'evidence' ? 'active' : ''}`}
// //                 onClick={() => setActiveTab('evidence')}
// //               >
// //                 📸 Evidence {hasEvidence && `(${evidence.length})`}
// //               </button>
// //               <button 
// //                 className={`modal-tab ${activeTab === 'notes' ? 'active' : ''}`}
// //                 onClick={() => setActiveTab('notes')}
// //               >
// //                 📝 Notes {hasNotes && `(${notes.length})`}
// //               </button>
// //             </>
// //           )}
// //         </div>
        
// //         <div className="modal-body horizontal-body">
// //           {/* Details Tab */}
// //           {activeTab === 'details' && (
// //             <div className="details-tab-content">
// //               <div className="details-two-column">
// //                 <div className="details-column">
// //                   <div className="detail-row">
// //                     <span className="detail-row-label">👤 Reporter:</span>
// //                     <span className="detail-row-value">{reporterName}</span>
// //                   </div>
// //                   {hasEmail(emailAddress) && (
// //                     <div className="detail-row">
// //                       <span className="detail-row-label">📧 Email:</span>
// //                       <span className="detail-row-value">{emailAddress}</span>
// //                     </div>
// //                   )}
// //                   {hasPhone(phoneNumber) && (
// //                     <div className="detail-row">
// //                       <span className="detail-row-label">📱 Phone:</span>
// //                       <span className="detail-row-value phone">{formatPhoneNumber(phoneNumber)}</span>
// //                     </div>
// //                   )}
// //                   <div className="detail-row">
// //                     <span className="detail-row-label">🆔 User ID:</span>
// //                     <span className="detail-row-value">#{report.user_id}</span>
// //                   </div>
// //                 </div>
                
// //                 <div className="details-column">
// //                   <div className="detail-row">
// //                     <span className="detail-row-label">🐾 Animal:</span>
// //                     <span className="detail-row-value">{report.animal_type}</span>
// //                   </div>
// //                   <div className="detail-row">
// //                     <span className="detail-row-label">🏥 Condition:</span>
// //                     <span className="detail-row-value">
// //                       <span className="condition-icon-small">{getConditionIcon(report.animal_condition)}</span> {report.animal_condition}
// //                     </span>
// //                   </div>
// //                   <div className="detail-row">
// //                     <span className="detail-row-label">📍 Location:</span>
// //                     <span className="detail-row-value location">{report.location_address}</span>
// //                   </div>
// //                   <div className="detail-row">
// //                     <span className="detail-row-label">📅 Submitted:</span>
// //                     <span className="detail-row-value">{formatShortDate(report.submitted_at)}</span>
// //                   </div>
// //                 </div>
// //               </div>

// //               <div className="description-horizontal">
// //                 <div className="description-horizontal-header">📝 Description</div>
// //                 <p>{report.description}</p>
// //               </div>

// //               {volunteerName && (
// //                 <div className="volunteer-horizontal">
// //                   <span className="volunteer-horizontal-label">🦸 Assigned Ranger:</span>
// //                   <span className="volunteer-horizontal-value">{volunteerName}</span>
// //                 </div>
// //               )}
// //             </div>
// //           )}

// //           {/* Evidence Tab */}
// //           {activeTab === 'evidence' && isCompleted && (
// //             <div className="evidence-tab-content">
// //               {loading ? (
// //                 <div className="loading-mini">Loading evidence...</div>
// //               ) : hasEvidence ? (
// //                 <div className="evidence-horizontal-grid">
// //                   {evidence.map((proof) => {
// //                     const imageUrl = getFullImageUrl(proof.proof_url);
// //                     const hasError = imageErrors[proof.proof_id];
                    
// //                     return (
// //                       <div 
// //                         key={proof.proof_id} 
// //                         className="evidence-horizontal-item"
// //                         onClick={() => !hasError && setSelectedImage(imageUrl)}
// //                       >
// //                         {!hasError ? (
// //                           <img 
// //                             src={imageUrl} 
// //                             alt={`Evidence`}
// //                             onError={() => handleImageError(proof.proof_id)}
// //                           />
// //                         ) : (
// //                           <div className="evidence-placeholder">📷</div>
// //                         )}
// //                         <span className="evidence-horizontal-date">
// //                           {new Date(proof.uploaded_at).toLocaleDateString()}
// //                         </span>
// //                       </div>
// //                     );
// //                   })}
// //                 </div>
// //               ) : (
// //                 <div className="empty-mini">No evidence photos available</div>
// //               )}
// //             </div>
// //           )}

// //           {/* Notes Tab */}
// //           {activeTab === 'notes' && isCompleted && (
// //             <div className="notes-tab-content">
// //               {loading ? (
// //                 <div className="loading-mini">Loading notes...</div>
// //               ) : hasNotes ? (
// //                 <div className="notes-horizontal-list">
// //                   {notes.map((note) => (
// //                     <div key={note.note_id} className="note-horizontal-item">
// //                       <div className="note-horizontal-header">
// //                         <span className="note-horizontal-author">{note.volunteer_name || 'Volunteer'}</span>
// //                         <span className="note-horizontal-time">{formatDate(note.created_at)}</span>
// //                       </div>
// //                       <p className="note-horizontal-text">{note.note_text}</p>
// //                     </div>
// //                   ))}
// //                 </div>
// //               ) : (
// //                 <div className="empty-mini">No notes available</div>
// //               )}
// //             </div>
// //           )}
// //         </div>

// //         {/* Image Lightbox */}
// //         {selectedImage && (
// //           <div className="lightbox" onClick={() => setSelectedImage(null)}>
// //             <img src={selectedImage} alt="Enlarged evidence" />
// //             <button className="lightbox-close" onClick={() => setSelectedImage(null)}>×</button>
// //           </div>
// //         )}
        
// //         <div className="modal-footer compact-footer">
// //           <button className="modal-btn secondary small" onClick={onClose}>Close</button>
// //           {report.task_id && (
// //             <span className="task-id-badge small">Task #{report.task_id}</span>
// //           )}
// //         </div>
// //       </div>
// //     </div>
// //   );
// // };

// // // ===========================================
// // // LOADING SPINNER
// // // ===========================================
// // const LoadingSpinner: React.FC = () => (
// //   <div className="loading-spinner">
// //     <div className="spinner"></div>
// //     <p>Loading reports...</p>
// //   </div>
// // );

// // // ===========================================
// // // ADMIN DASHBOARD
// // // ===========================================
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

// //   const uniqueReporters = new Set(reports.map(r => r.user_id)).size;

// //   useEffect(() => {
// //     if (reports && reports.length > 0) {
// //       const validReports = reports.filter(r => 
// //         r.location_address && r.location_address.trim() !== '' && r.location_address !== 'No location'
// //       );
// //       setHeatmapData(validReports);
// //     }
// //   }, [reports]);

// //   const getMostCommonAnimal = (): string => {
// //     const animalCounts = reports.reduce((acc, r) => {
// //       if (r.animal_type) acc[r.animal_type] = (acc[r.animal_type] || 0) + 1;
// //       return acc;
// //     }, {} as Record<string, number>);
    
// //     let maxCount = 0, mostCommon = 'N/A';
// //     Object.entries(animalCounts).forEach(([animal, count]) => {
// //       if (count > maxCount) { maxCount = count; mostCommon = animal; }
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
// //           <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
// //             <h3 className="section-header" style={{ margin: 0 }}>Incident Heatmap - Most Reported Areas</h3>
// //             <button onClick={() => setShowHeatmap(!showHeatmap)} className="reports-btn"
// //                     style={{ background: showHeatmap ? '#f44336' : '#2D5A27', color: 'white', border: 'none', padding: '8px 20px', borderRadius: '6px', cursor: 'pointer' }}>
// //               {showHeatmap ? 'Hide Map' : 'Show Heatmap'}
// //             </button>
// //           </div>

// //           {showHeatmap && (
// //             <div className="heatmap-container">
// //               {heatmapData.length > 0 ? (
// //                 <>
// //                   <Heatmap reports={heatmapData} height="500px" />
                  
// //                   <div className="heatmap-stats-grid">
// //                     <div className="heatmap-stat-card"><div className="heatmap-stat-label">Total Locations</div><div className="heatmap-stat-value">{heatmapData.length}</div></div>
// //                     <div className="heatmap-stat-card"><div className="heatmap-stat-label">Unique Areas</div><div className="heatmap-stat-value">{new Set(heatmapData.map(r => r.location_address)).size}</div></div>
// //                     <div className="heatmap-stat-card"><div className="heatmap-stat-label">Most Common Animal</div><div className="heatmap-stat-value">{getMostCommonAnimal()}</div></div>
// //                     <div className="heatmap-stat-card"><div className="heatmap-stat-label">Hotspots (3+ reports)</div><div className="heatmap-stat-value highlight">{getHotspotCount()}</div></div>
// //                   </div>

// //                   <div style={{ marginTop: '1.5rem' }}>
// //                     <h4 style={{ marginBottom: '1rem', color: '#333' }}>Top Hotspot Areas</h4>
// //                     <div className="hotspot-tags">
// //                       {Object.entries(heatmapData.reduce((acc, r) => {
// //                         acc[r.location_address] = (acc[r.location_address] || 0) + 1;
// //                         return acc;
// //                       }, {} as Record<string, number>))
// //                         .sort((a, b) => b[1] - a[1])
// //                         .slice(0, 8)
// //                         .map(([location, count]) => (
// //                           <div key={location} className={`hotspot-tag ${count >= 5 ? 'high' : count >= 3 ? 'medium' : 'low'}`}>
// //                             {location.length > 25 ? location.substring(0, 25) + '...' : location} ({count})
// //                           </div>
// //                         ))}
// //                     </div>
// //                   </div>
// //                 </>
// //               ) : (
// //                 <div style={{ height: '300px', display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#f5f5f5', borderRadius: '8px', flexDirection: 'column', gap: '1rem' }}>
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
// //                 <div className="chart-loading"><div className="spinner"></div><p>Loading chart data...</p></div>
// //               ) : (
// //                 <ResponsiveContainer width="100%" height={300}>
// //                   <BarChart data={chartData}>
// //                     <XAxis dataKey="name" axisLine={false} tickLine={false} />
// //                     <YAxis axisLine={false} tickLine={false} />
// //                     <Tooltip cursor={{fill: '#F5F1E8'}} formatter={(value) => [value, 'Count']} labelFormatter={(label) => `${label}`} />
// //                     <Bar dataKey="value" radius={[10, 10, 0, 0]} barSize={60}>
// //                       {chartData.map((entry, index) => <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />)}
// //                     </Bar>
// //                   </BarChart>
// //                 </ResponsiveContainer>
// //               )}
// //             </div>
// //           </div>
          
// //           <div className="volunteer-alert-box">
// //             <div className="volunteer-alert-icon">⚡</div>
// //             <h3 className="volunteer-alert-title">Quick Navigation</h3>
// //             <p className="volunteer-alert-text">Manage your volunteer force or review all mission reports.</p>
// //             <Link to="/admin/users" className="volunteer-alert-btn" style={{ marginBottom: '10px', background: '#2D5A27' }}>
// //               <span style={{ marginRight: '8px' }}>👥</span> Manage Volunteers
// //             </Link>
// //             <Link to="/admin/rescue-reports" className="volunteer-alert-btn" style={{ background: '#1976D2' }}>
// //               <span style={{ marginRight: '8px' }}>📋</span> View All Reports
// //             </Link>
// //           </div>
// //         </div>

// //         <div className="recent-reports-section">
// //           <div className="section-header">
// //             <h3>Recent Reports ({reports.length})</h3>
// //             <Link to="/admin/rescue-reports" className="view-all-link">View All Reports →</Link>
// //           </div>
// //           <div className="reports-table-container">
// //             {reportsLoading ? (
// //               <div className="loading-message"><div className="loading-spinner-small"></div><p>Loading reports...</p></div>
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
// //                       <td>
// //                         <div className="animal-cell">
// //                           <span className="animal-emoji">{getAnimalEmoji(report.animal_type)}</span>
// //                           <span className="animal-name">{report.animal_type || 'Unknown'}</span>
// //                         </div>
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
// //               <div className="no-reports"><p>No reports found in the system.</p></div>
// //             )}
// //           </div>
// //         </div>
// //       </div>
// //     </div>
// //   );
// // };

// // // ===========================================
// // // VOLUNTEER DASHBOARD
// // // ===========================================
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
// //   const [taskDetails, setTaskDetails] = useState<{[key: number]: VolunteerTask}>({});
  
// //   useEffect(() => {
// //     const fetchAllTasks = async () => {
// //       if (!user?.user_id) return;
      
// //       try {
// //         setMissionsLoading(true);
// //         setFetchError(null);
// //         const token = getToken();
        
// //         if (!token) {
// //           setFetchError('No authentication token');
// //           return;
// //         }

// //         const response = await fetch(`http://localhost:5000/api/volunteers/tasks`, {
// //           method: 'GET',
// //           headers: { 'Authorization': `Bearer ${token}`, 'Content-Type': 'application/json' }
// //         });
        
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
// //       const token = getToken();
// //       const response = await fetch(`http://localhost:5000/api/tasks/${taskId}/evidence`, {
// //         headers: { 'Authorization': `Bearer ${token}` }
// //       });
// //       const data = await response.json();
// //       if (data.success) {
// //         setTaskEvidence(prev => ({ ...prev, [taskId]: data.data }));
// //       }
// //     } catch (error) {
// //       console.error('Error fetching evidence:', error);
// //     }
// //   };

// //   const fetchTaskAdminNotes = async (reportId: number, taskId: number) => {
// //     try {
// //       const token = getToken();
// //       const response = await fetch(`http://localhost:5000/api/reports/${reportId}/admin-notes`, {
// //         headers: { 'Authorization': `Bearer ${token}` }
// //       });
// //       const data = await response.json();
// //       if (data.success) {
// //         setTaskAdminNotes(prev => ({ ...prev, [taskId]: data.data }));
// //       }
// //     } catch (error) {
// //       console.error('Error fetching admin notes:', error);
// //     }
// //   };

// //   const fetchFullTaskDetails = async (taskId: number) => {
// //     try {
// //       const token = getToken();
// //       const response = await fetch(
// //         `http://localhost:5000/api/tasks/task/${taskId}/full-details`,
// //         {
// //           headers: { 'Authorization': `Bearer ${token}` }
// //         }
// //       );
      
// //       const data = await response.json();
// //       if (data.success) {
// //         setTaskDetails(prev => ({ ...prev, [taskId]: data.data.task }));
// //         return data.data;
// //       }
// //     } catch (error) {
// //       console.error('Error fetching full task details:', error);
// //     }
// //     return null;
// //   };

// //   const handleAcceptTask = async (taskId: number) => {
// //     try {
// //       setActionLoading(true);
// //       const token = getToken();
      
// //       const response = await fetch(`http://localhost:5000/api/volunteers/tasks/${taskId}/accept`, {
// //         method: 'PATCH',
// //         headers: { 'Authorization': `Bearer ${token}`, 'Content-Type': 'application/json' }
// //       });
      
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
// //         // Using toast would need to be imported
// //         console.log('Task accepted successfully!');
// //       } else {
// //         console.log('Failed to accept task: ' + data.message);
// //       }
// //     } catch (error) {
// //       console.error('Error accepting task:', error);
// //       console.log('Failed to accept task');
// //     } finally {
// //       setActionLoading(false);
// //     }
// //   };

// //   const handleDeclineTask = async (taskId: number, reason: string) => {
// //     try {
// //       setActionLoading(true);
// //       const token = getToken();
      
// //       const response = await fetch(`http://localhost:5000/api/volunteers/tasks/${taskId}/decline`, {
// //         method: 'PATCH',
// //         headers: { 'Authorization': `Bearer ${token}`, 'Content-Type': 'application/json' },
// //         body: JSON.stringify({ reason })
// //       });
      
// //       const data = await response.json();
      
// //       if (data.success) {
// //         setPendingTasks(prev => prev.filter(t => t.task_id !== taskId));
// //         console.log('Task declined successfully');
// //       } else {
// //         console.log('Failed to decline task: ' + data.message);
// //       }
// //     } catch (error) {
// //       console.error('Error declining task:', error);
// //       console.log('Failed to decline task');
// //     } finally {
// //       setActionLoading(false);
// //       setIsDeclineModalOpen(false);
// //       setSelectedTaskId(null);
// //     }
// //   };

// //   const handleUploadEvidence = async (taskId: number, file: File, notes: string) => {
// //     try {
// //       setActionLoading(true);
// //       const token = getToken();
      
// //       const formData = new FormData();
// //       formData.append('proofs', file);
      
// //       const uploadResponse = await fetch(`http://localhost:5000/api/tasks/${taskId}/upload-proofs`, {
// //         method: 'POST',
// //         headers: { 'Authorization': `Bearer ${token}` },
// //         body: formData
// //       });
      
// //       const uploadData = await uploadResponse.json();
      
// //       if (!uploadData.success) {
// //         console.log('Failed to upload proof: ' + uploadData.message);
// //         return;
// //       }
      
// //       const noteResponse = await fetch(`http://localhost:5000/api/tasks/${taskId}/completion-notes`, {
// //         method: 'POST',
// //         headers: { 'Authorization': `Bearer ${token}`, 'Content-Type': 'application/json' },
// //         body: JSON.stringify({ note_text: notes, volunteer_id: user.user_id })
// //       });
      
// //       const noteData = await noteResponse.json();
      
// //       if (!noteData.success) {
// //         console.log('Failed to save completion note: ' + noteData.message);
// //         return;
// //       }
      
// //       // Refresh evidence after upload
// //       fetchTaskEvidence(taskId);
// //       console.log('Evidence uploaded successfully!');
      
// //     } catch (error) {
// //       console.error('Error uploading evidence:', error);
// //       console.log('Failed to upload evidence');
// //     } finally {
// //       setActionLoading(false);
// //     }
// //   };

// //   const handleViewTaskDetails = async (task: VolunteerTask) => {
// //     setSelectedTask(task);
    
// //     try {
// //       const fullDetails = await fetchFullTaskDetails(task.task_id);
      
// //       if (fullDetails) {
// //         setSelectedTask(fullDetails.task);
// //         setTaskEvidence(prev => ({ ...prev, [task.task_id]: fullDetails.evidence || [] }));
// //         setTaskAdminNotes(prev => ({ ...prev, [task.task_id]: fullDetails.admin_notes || [] }));
// //       } else {
// //         await Promise.all([
// //           fetchTaskEvidence(task.task_id),
// //           fetchTaskAdminNotes(task.report_id, task.task_id)
// //         ]);
// //       }
// //     } catch (error) {
// //       console.error('Error in handleViewTaskDetails:', error);
// //       await Promise.all([
// //         fetchTaskEvidence(task.task_id),
// //         fetchTaskAdminNotes(task.report_id, task.task_id)
// //       ]);
// //     }
    
// //     setIsTaskModalOpen(true);
// //   };

// //   const displayedActiveMissions = showAllActive ? activeMissions : activeMissions.slice(0, 3);
// //   const displayedPendingTasks = showAllPending ? pendingTasks : pendingTasks.slice(0, 3);

// //   useEffect(() => {
// //     const style = document.createElement('style');
// //     style.textContent = `
// //       @keyframes pulse {
// //         0% { opacity: 1; transform: scale(1); }
// //         50% { opacity: 0.7; transform: scale(1.1); }
// //         100% { opacity: 1; transform: scale(1); }
// //       }
// //     `;
// //     document.head.appendChild(style);
// //     return () => {
// //       document.head.removeChild(style);
// //     };
// //   }, []);

// //   return (
// //     <div className="dashboard-wrapper animate-fade-in">
// //       <div className="volunteer-dashboard-new" style={{ maxWidth: '1200px', margin: '0 auto' }}>
        
// //         {/* Header Section */}
// //         <div className="reports-header" style={{ marginBottom: '2rem' }}>
// //           <div className="reports-header-content">
// //             <h1 className="reports-title">Welcome back, Ranger {user.username}!</h1>
// //             <p className="reports-subtitle">Your dedication saves lives. Ready for your next mission?</p>
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
// //             <Link to="/tasks" className="reports-btn refresh"><span className="btn-icon">📋</span> Mission Board</Link>
// //             <Link to="/profile" className="reports-btn refresh"><span className="btn-icon">🏆</span> My Profile</Link>
// //           </div>
// //         </div>

// //         {/* Stats Cards */}
// //         <div className="reports-filters-card" style={{ marginBottom: '2rem', padding: '1.5rem' }}>
// //           <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '1.5rem' }}>
// //             <div style={{ background: 'linear-gradient(135deg, #2D5A27 0%, #1e3f1a 100%)', borderRadius: '12px', padding: '1.25rem', color: 'white' }}>
// //               <div style={{ fontSize: '0.85rem', opacity: '0.9', marginBottom: '0.5rem' }}>TOTAL RESCUES</div>
// //               <div style={{ fontSize: '2.5rem', fontWeight: '700', lineHeight: '1' }}>{completedTasksCount}</div>
// //               <div style={{ fontSize: '0.8rem', opacity: '0.8', marginTop: '0.5rem' }}>Lives Saved ✓</div>
// //             </div>

// //             <div style={{ background: 'linear-gradient(135deg, #1976D2 0%, #0D47A1 100%)', borderRadius: '12px', padding: '1.25rem', color: 'white' }}>
// //               <div style={{ fontSize: '0.85rem', opacity: '0.9', marginBottom: '0.5rem' }}>ACTIVE MISSIONS</div>
// //               <div style={{ fontSize: '2.5rem', fontWeight: '700', lineHeight: '1' }}>{activeMissions.length}</div>
// //               <div style={{ fontSize: '0.8rem', opacity: '0.8', marginTop: '0.5rem' }}>In Progress 🎯</div>
// //             </div>

// //             <div style={{ background: 'linear-gradient(135deg, #FF9F1C 0%, #E65100 100%)', borderRadius: '12px', padding: '1.25rem', color: 'white' }}>
// //               <div style={{ fontSize: '0.85rem', opacity: '0.9', marginBottom: '0.5rem' }}>PENDING</div>
// //               <div style={{ fontSize: '2.5rem', fontWeight: '700', lineHeight: '1' }}>{pendingTasks.length}</div>
// //               <div style={{ fontSize: '0.8rem', opacity: '0.8', marginTop: '0.5rem' }}>Awaiting Decision ⏳</div>
// //             </div>

// //             <div style={{ background: 'linear-gradient(135deg, #7D8C5A 0%, #5A6B3E 100%)', borderRadius: '12px', padding: '1.25rem', color: 'white' }}>
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

// //         {/* PENDING TASKS SECTION */}
// //         {pendingTasks.length > 0 && (
// //           <div className="reports-section" style={{ marginBottom: '2.5rem' }}>
// //             <div className="reports-header">
// //               <h2 className="reports-title" style={{ fontSize: '1.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
// //                 <span>⏳</span> Pending Confirmation ({pendingTasks.length})
// //               </h2>
// //               {pendingTasks.length > 3 && (
// //                 <button onClick={() => setShowAllPending(!showAllPending)} className="view-all-link">
// //                   {showAllPending ? 'Show Less ↑' : `View All (${pendingTasks.length}) →`}
// //                 </button>
// //               )}
// //             </div>
            
// //             <div className="reports-grid" style={{ gridTemplateColumns: 'repeat(3, 1fr)' }}>
// //               {displayedPendingTasks.map((task) => {
// //                 const statusBadge = getTaskStatusBadge(task.task_status_id);
// //                 const displayMission = taskDetails[task.task_id] || task;
                
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
// //                         {formatShortDate(displayMission.submitted_at)}
// //                       </div>
// //                     </div>

// //                     <div className="reports-card-body">
// //                       <div className="reports-animal-section">
// //                         <div className="reports-animal-icon large">{getAnimalEmoji(task.animal_type)}</div>
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
// //                             {hasEmail(task.reporter_email) && (
// //                               <span className="ranger-phone" style={{ fontSize: '0.75rem', color: '#E65100' }}>✉️ {task.reporter_email}</span>
// //                             )}
// //                             {hasPhone(task.reporter_phone) && (
// //                               <span className="ranger-phone" style={{ fontSize: '0.75rem', color: '#E65100' }}>📱 {formatPhoneNumber(task.reporter_phone)}</span>
// //                             )}
// //                           </div>
// //                         </div>
// //                       </div>
                      
// //                       <p className="reports-description" style={{ fontSize: '0.85rem', marginBottom: '0.5rem', color: '#666' }}>
// //                         {task.description?.length > 80 
// //                           ? `${task.description.substring(0, 80)}...` 
// //                           : task.description || 'No description provided'}
// //                       </p>
// //                     </div>

// //                     <div className="reports-card-footer">
// //                       <div style={{ display: 'flex', gap: '0.75rem' }}>
// //                         <button onClick={() => handleAcceptTask(task.task_id!)}
// //                                 disabled={actionLoading}
// //                                 className="reports-btn"
// //                                 style={{ flex: 2, background: '#2e7d32', color: 'white', padding: '0.6rem', fontSize: '0.85rem', fontWeight: '600', border: 'none', borderRadius: '4px', cursor: actionLoading ? 'not-allowed' : 'pointer' }}>
// //                           {actionLoading ? '...' : 'Accept'}
// //                         </button>
// //                         <button onClick={() => { setSelectedTaskId(task.task_id!); setIsDeclineModalOpen(true); }}
// //                                 disabled={actionLoading}
// //                                 className="reports-btn"
// //                                 style={{ flex: 1, background: 'transparent', color: '#c62828', border: '1px solid #c62828', padding: '0.6rem', fontSize: '0.85rem', fontWeight: '600', borderRadius: '4px', cursor: actionLoading ? 'not-allowed' : 'pointer' }}>
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

// //         {/* ACTIVE MISSIONS SECTION */}
// //         <div className="reports-section">
// //           <div className="reports-header">
// //             <h2 className="reports-title" style={{ fontSize: '1.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
// //               <span>📻</span> Your Active Missions ({activeMissions.length})
// //             </h2>
// //             {activeMissions.length > 3 && (
// //               <button onClick={() => setShowAllActive(!showAllActive)} className="view-all-link">
// //                 {showAllActive ? 'Show Less ↑' : `View All (${activeMissions.length}) →`}
// //               </button>
// //             )}
// //           </div>
          
// //           {missionsLoading ? (
// //             <div className="reports-loading-container">
// //               <div className="reports-loader"><div className="reports-spinner"></div><p className="reports-loader-text">Loading your missions...</p></div>
// //             </div>
// //           ) : fetchError ? (
// //             <div className="reports-empty-state">
// //               <span className="empty-state-emoji">❌</span>
// //               <h3>Error Loading Missions</h3>
// //               <p>{fetchError}</p>
// //               <button onClick={() => window.location.reload()} className="reports-btn primary">Retry</button>
// //             </div>
// //           ) : activeMissions.length > 0 ? (
// //             <>
// //               <div className="reports-grid" style={{ gridTemplateColumns: 'repeat(3, 1fr)' }}>
// //                 {displayedActiveMissions.map((mission) => {
// //                   const statusBadge = getTaskStatusBadge(mission.task_status_id);
// //                   const hasEvidence = taskEvidence[mission.task_id]?.length > 0;
// //                   const displayMission = taskDetails[mission.task_id] || mission;
                  
// //                   return (
// //                     <div key={mission.task_id} className="reports-card">
// //                       <div className="reports-card-header" style={{ background: '#1e3f1a' }}>
// //                         <div className="reports-card-title">
// //                           <span className="reports-id" style={{ background: 'rgba(255,255,255,0.2)', color: 'white' }}>
// //                             #{mission.report_id}
// //                           </span>
// //                           <span className="reports-status" style={{ background: 'rgba(255,255,255,0.2)', color: 'white' }}>
// //                             {statusBadge.text}
// //                           </span>
// //                         </div>
// //                         <div className="reports-date" style={{ color: 'rgba(255,255,255,0.9)' }}>
// //                           {formatShortDate(displayMission.submitted_at)}
// //                         </div>
// //                         <div className="reports-volunteer-tag" style={{ color: 'white', fontSize: '0.8rem', fontWeight: '600', marginTop: '5px' }}>
// //                           {user.username?.toUpperCase()}
// //                         </div>
// //                       </div>

// //                       <div className="reports-card-body">
// //                         <div className="reports-animal-section">
// //                           <div className="reports-animal-icon large">{getAnimalEmoji(mission.animal_type)}</div>
// //                           <div className="reports-animal-info">
// //                             <h4 style={{ color: '#1e3f1a' }}>{mission.animal_type || 'Animal'} Rescue</h4>
// //                             <span className="reports-condition" style={{ background: '#ffebee', color: '#c62828', fontWeight: 'bold' }}>
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
// //                               {hasEmail(mission.reporter_email) && (
// //                                 <span className="ranger-phone" style={{ fontSize: '0.75rem', color: '#2e7d32' }}>✉️ {mission.reporter_email}</span>
// //                               )}
// //                               {hasPhone(mission.reporter_phone) && (
// //                                 <span className="ranger-phone" style={{ fontSize: '0.75rem', color: '#2e7d32' }}>📱 {formatPhoneNumber(mission.reporter_phone)}</span>
// //                               )}
// //                             </div>
// //                           </div>
// //                         </div>
                        
// //                         <p className="reports-description" style={{ fontSize: '0.85rem', marginBottom: '0.5rem', color: '#666' }}>
// //                           {mission.description?.length > 100 
// //                             ? `${mission.description.substring(0, 100)}...` 
// //                             : mission.description || 'No description provided'}
// //                         </p>

// //                         {hasEvidence && (
// //                           <div className="evidence-indicator">
// //                             <span style={{ color: '#1e3f1a', fontSize: '0.8rem', fontWeight: '600' }}>
// //                               📸 Evidence Uploaded
// //                             </span>
// //                           </div>
// //                         )}

// //                         <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '0.7rem', color: '#888', marginTop: '0.5rem', paddingTop: '0.5rem', borderTop: '1px solid #e8dfc9' }}>
// //                           <span style={{ padding: '2px 8px', borderRadius: '12px', background: '#e3f2fd', color: '#1565c0', fontWeight: 'bold' }}>
// //                             {statusBadge.text}
// //                           </span>
// //                           {mission.assigned_at && <span>Assigned: {formatShortDate(mission.assigned_at)}</span>}
// //                         </div>
// //                       </div>

// //                       <div className="reports-card-footer">
// //                         <button onClick={() => handleViewTaskDetails(mission)}
// //                                 className="reports-btn"
// //                                 style={{ width: '100%', background: '#2D5A27', color: 'white', padding: '0.6rem', fontSize: '0.85rem', fontWeight: '600', border: 'none', borderRadius: '4px', cursor: 'pointer' }}>
// //                           View Details
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
// //               <Link to="/tasks" className="reports-btn primary">Browse Available Missions</Link>
// //             </div>
// //           )}
// //         </div>
// //       </div>

// //       {/* Task Detail Modal */}
// //       {selectedTask && (
// //         <TaskDetailModal 
// //           task={selectedTask}
// //           isOpen={isTaskModalOpen}
// //           onClose={() => { setIsTaskModalOpen(false); setSelectedTask(null); }}
// //           onUploadEvidence={handleUploadEvidence}
// //           actionLoading={actionLoading}
// //           userProfile={userProfile}
// //           evidence={taskEvidence[selectedTask.task_id]}
// //           adminNotes={taskAdminNotes[selectedTask.task_id]}
// //         />
// //       )}

// //       {/* Decline Modal */}
// //       {selectedTaskId && (
// //         <DeclineModal
// //           isOpen={isDeclineModalOpen}
// //           onClose={() => { setIsDeclineModalOpen(false); setSelectedTaskId(null); }}
// //           onSubmit={(reason) => handleDeclineTask(selectedTaskId, reason)}
// //           taskId={selectedTaskId}
// //         />
// //       )}
// //     </div>
// //   );
// // };

// // // ===========================================
// // // PENDING VOLUNTEER DASHBOARD
// // // ===========================================
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

// // // ===========================================
// // // REJECTED VOLUNTEER DASHBOARD
// // // ===========================================
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

// // // ===========================================
// // // USER DASHBOARD
// // // ===========================================
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
// //         <div className="welcome-section">
// //           <div className="welcome-content">
// //             <h1 className="welcome-title">
// //               <span className="welcome-greeting">Welcome back,</span>
// //               <span className="welcome-name">{user.username || 'Animal Friend'}!</span>
// //             </h1>
// //             <p className="welcome-subtitle">Track your rescue reports and their progress</p>
// //             {(userEmail || userPhone) && (
// //               <div className="contact-info">
// //                 {userEmail && <span className="contact-item">✉️ {userEmail}</span>}
// //                 {userPhone && <span className="contact-item">📱 {userPhone}</span>}
// //               </div>
// //             )}
// //           </div>
// //           <Link to="/create-report" className="create-report-btn">
// //             <span className="btn-icon">+</span>
// //             New Report
// //           </Link>
// //         </div>

// //         <div className="stats-grid">
// //           <div className="stat-card">
// //             <div className="stat-icon total">📋</div>
// //             <div className="stat-content">
// //               <div className="stat-value">{totalReports}</div>
// //               <div className="stat-label">Total Reports</div>
// //             </div>
// //           </div>
          
// //           <div className="stat-card">
// //             <div className="stat-icon submitted">⏳</div>
// //             <div className="stat-content">
// //               <div className="stat-value">{submittedReports}</div>
// //               <div className="stat-label">Submitted</div>
// //             </div>
// //           </div>
          
// //           <div className="stat-card">
// //             <div className="stat-icon in-progress">🚀</div>
// //             <div className="stat-content">
// //               <div className="stat-value">{inProgressReports}</div>
// //               <div className="stat-label">In Progress</div>
// //             </div>
// //           </div>
          
// //           <div className="stat-card">
// //             <div className="stat-icon completed">✅</div>
// //             <div className="stat-content">
// //               <div className="stat-value">{completedReports}</div>
// //               <div className="stat-label">Completed</div>
// //             </div>
// //           </div>
// //         </div>

// //         <div className="reports-section">
// //           <div className="section-header">
// //             <h2>Your Reports</h2>
// //             {myReports.length > 3 && (
// //               <Link to="/my-reports" className="view-all-link">View All ({myReports.length}) →</Link>
// //             )}
// //           </div>
          
// //           {reportsLoading ? (
// //             <div className="loading-container">
// //               <div className="spinner"></div>
// //               <p>Loading your reports...</p>
// //             </div>
// //           ) : myReports.length > 0 ? (
// //             <div className="reports-grid user-reports">
// //               {myReports.slice(0, 3).map(report => {
// //                 const statusClass = getStatusClass(report.status_name);
// //                 const statusText = getStatusText(report.status_name);
                
// //                 return (
// //                   <div key={report.report_id} className="report-card user">
// //                     <div className="card-header">
// //                       <div className="header-top">
// //                         <span className="report-id">#{report.report_id}</span>
// //                         <span className={`status-badge ${statusClass}`}>{statusText}</span>
// //                       </div>
// //                     </div>

// //                     <div className="card-body">
// //                       <div className="animal-info-row">
// //                         <div className="animal-emoji-container">
// //                           <span className="animal-emoji-large">{getAnimalEmoji(report.animal_type)}</span>
// //                         </div>
// //                         <div className="animal-details">
// //                           <h3 className="animal-type">{report.animal_type || 'Unknown Animal'}</h3>
// //                           <div className="condition-tag">
// //                             <span className="condition-indicator">●</span>
// //                             {report.animal_condition || 'Condition Unknown'}
// //                           </div>
// //                         </div>
// //                       </div>

// //                       <div className="location-row">
// //                         <span className="location-icon">📍</span>
// //                         <span className="location-text" title={report.location_address}>
// //                           {report.location_address}
// //                         </span>
// //                       </div>

// //                       <div className="date-row">
// //                         <span className="date-icon">📅</span>
// //                         <span className="date-text">{formatShortDate(report.submitted_at)}</span>
// //                       </div>

// //                       <p className="description-preview">
// //                         {report.description?.length > 80 
// //                           ? `${report.description.substring(0, 80)}...` 
// //                           : report.description}
// //                       </p>
// //                     </div>

// //                     <div className="card-footer">
// //                       <button 
// //                         className="view-details-btn"
// //                         onClick={() => onViewDetails(report)}
// //                       >
// //                         View Details
// //                         <span className="btn-arrow">→</span>
// //                       </button>
// //                     </div>
// //                   </div>
// //                 );
// //               })}
// //             </div>
// //           ) : (
// //             <div className="empty-state">
// //               <div className="empty-icon">📝</div>
// //               <h3>No Reports Yet</h3>
// //               <p>Create your first rescue report to get started</p>
// //               <Link to="/create-report" className="create-first-btn">
// //                 Create Report
// //               </Link>
// //             </div>
// //           )}
// //         </div>
// //       </div>
// //     </div>
// //   );
// // };

// // // ===========================================
// // // MAIN DASHBOARD COMPONENT
// // // ===========================================
// // export const Dashboard: React.FC = () => {
// //   const [isLoading, setIsLoading] = useState(true);
// //   const [userReports, setUserReports] = useState<Report[]>([]);
// //   const [allReports, setAllReports] = useState<Report[]>([]);
// //   const [reportsLoading, setReportsLoading] = useState(true);
// //   const [userProfile, setUserProfile] = useState<UserProfile | null>(null);
// //   const [selectedReport, setSelectedReport] = useState<Report | null>(null);
// //   const [isModalOpen, setIsModalOpen] = useState(false);
// //   const [reportEvidence, setReportEvidence] = useState<{[key: number]: TaskProof[]}>({});
// //   const [reportNotes, setReportNotes] = useState<{[key: number]: TaskCompletionNote[]}>({});
// //   const [loadingDetails, setLoadingDetails] = useState<{[key: number]: boolean}>({});
  
// //   const navigate = useNavigate();
// //   const { user: currentUser } = useAuth();
  
// //   useEffect(() => {
// //     const fetchUserProfile = async () => {
// //       if (!currentUser) return;
      
// //       try {
// //         const token = getToken();
// //         const response = await fetch('http://localhost:5000/api/users/profile', {
// //           headers: { 'Authorization': `Bearer ${token}`, 'Content-Type': 'application/json' }
// //         });

// //         if (response.ok) {
// //           const data = await response.json();
// //           if (data.success) setUserProfile(data.data);
// //         }
// //       } catch (err) {
// //         console.error('Error fetching user profile:', err);
// //       }
// //     };

// //     fetchUserProfile();
// //   }, [currentUser]);

// //   const fetchAllReports = async () => {
// //     try {
// //       const token = getToken();
// //       const response = await fetch('http://localhost:5000/api/reports/admin/all', {
// //         headers: { 'Authorization': `Bearer ${token}`, 'Content-Type': 'application/json' }
// //       });
      
// //       if (response.ok) {
// //         const data = await response.json();
// //         if (data.success) setAllReports(data.data || []);
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
// //         const token = getToken();
        
// //         const response = await fetch('http://localhost:5000/api/reports/my-reports', {
// //           headers: { 'Authorization': `Bearer ${token}`, 'Content-Type': 'application/json' }
// //         });
        
// //         if (response.ok) {
// //           const data = await response.json();
// //           if (data.success) {
// //             const reportsData = data.data || [];
// //             // Don't override API data - let the API provide it
// //             setUserReports(reportsData);
// //           }
// //         }

// //         if (getUserRole(currentUser) === 'admin') await fetchAllReports();
// //       } catch (error) {
// //         console.error('Error fetching reports:', error);
// //       } finally {
// //         setReportsLoading(false);
// //       }
// //     };
    
// //     if (currentUser) fetchUserReports();
// //   }, [currentUser, userProfile]);
  
// //   useEffect(() => {
// //     if (currentUser) setIsLoading(false);
// //     else {
// //       const timer = setTimeout(() => setIsLoading(false), 1000);
// //       return () => clearTimeout(timer);
// //     }
// //   }, [currentUser]);
  
// //   const getUserRole = (user: any): string => {
// //     if (!user) return 'user';
    
// //     if (user.role && typeof user.role === 'object' && user.role.role_name) return user.role.role_name.toLowerCase();
// //     if (user.role_name) return user.role_name.toLowerCase();
// //     if (user.role_id) {
// //       if (user.role_id === 3) return 'admin';
// //       if (user.role_id === 2) return 'volunteer';
// //       if (user.role_id === 1) return 'user';
// //     }
// //     return 'user';
// //   };
  
// //   const getVolunteerStatus = (user: any): string | null => {
// //     if (!user) return null;

// //     if (user.approval_status_id !== undefined) {
// //       if (user.approval_status_id === 1) return 'pending';
// //       if (user.approval_status_id === 2) return 'approved';
// //       if (user.approval_status_id === 3) return 'rejected';
// //     }

// //     if (user.volunteer) {
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

// //   const fetchReportEvidence = async (reportId: number, taskId?: number) => {
// //     if (!taskId) return;
    
// //     try {
// //       setLoadingDetails(prev => ({ ...prev, [reportId]: true }));
// //       const token = getToken();
      
// //       // Fetch evidence
// //       const evidenceRes = await fetch(`http://localhost:5000/api/tasks/${taskId}/evidence`, {
// //         headers: { 'Authorization': `Bearer ${token}` }
// //       });
// //       const evidenceData = await evidenceRes.json();
// //       if (evidenceData.success) {
// //         setReportEvidence(prev => ({ ...prev, [reportId]: evidenceData.data || [] }));
// //       }

// //       // Fetch completion notes
// //       const notesRes = await fetch(`http://localhost:5000/api/tasks/${taskId}/completion-notes`, {
// //         headers: { 'Authorization': `Bearer ${token}` }
// //       });
// //       const notesData = await notesRes.json();
// //       if (notesData.success) {
// //         setReportNotes(prev => ({ ...prev, [reportId]: notesData.data || [] }));
// //       }
// //     } catch (error) {
// //       console.error('Error fetching report details:', error);
// //     } finally {
// //       setLoadingDetails(prev => ({ ...prev, [reportId]: false }));
// //     }
// //   };

// //   const handleViewDetails = (report: Report) => {
// //     setSelectedReport(report);
// //     console.log('Viewing report details:', report);
// //     if (report.task_id) {
// //       fetchReportEvidence(report.report_id, report.task_id);
// //     }
// //     setIsModalOpen(true);
// //   };

// //   useEffect(() => {
// //     if (!isLoading && !currentUser) navigate('/login');
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
// //           <Link to="/login" className="login-link">Go to Login</Link>
// //         </div>
// //       </div>
// //     );
// //   }

// //   const userRole = getUserRole(currentUser);
// //   const volunteerStatus = getVolunteerStatus(currentUser);

// //   const getStats = () => {
// //     const totalReports = userReports.length;
// //     const completedRescues = userReports.filter(r => r.status_name?.toLowerCase() === 'completed').length;
// //     const activeVolunteers = 1;
// //     const pendingApprovals = 0;
    
// //     const userId = currentUser.user_id?.toString() || '';
    
// //     const myReports = userReports.filter(r => {
// //       const reportUserId = Number(r.user_id);
// //       const currentUserId = Number(userId);
// //       return reportUserId === currentUserId;
// //     });
    
// //     const myCompletedTasks = userReports.filter(r => r.status_name?.toLowerCase() === 'completed').length;

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
// //       return <AdminDashboard stats={stats} reports={allReports} reportsLoading={reportsLoading} />;
// //     }
    
// //     if (userRole === 'volunteer') {
// //       if (volunteerStatus === 'rejected') {
// //         return <RejectedVolunteerDashboard user={currentUser} />;
// //       }
      
// //       if (volunteerStatus === 'pending' || volunteerStatus === 'none' || !volunteerStatus) {
// //         return <PendingVolunteerDashboard user={currentUser} />;
// //       }
      
// //       if (volunteerStatus === 'approved') {
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
      
// //       {/* Enhanced Detail Modal */}
// //       <ReportDetailModal 
// //         report={selectedReport}
// //         isOpen={isModalOpen}
// //         onClose={() => {
// //           setIsModalOpen(false);
// //           setSelectedReport(null);
// //         }}
// //         userPhone={userProfile?.phone}
// //         userEmail={userProfile?.email}
// //         userName={userProfile?.username}
// //         evidence={selectedReport ? reportEvidence[selectedReport.report_id] : []}
// //         notes={selectedReport ? reportNotes[selectedReport.report_id] : []}
// //         loading={selectedReport ? loadingDetails[selectedReport.report_id] : false}
// //       />
// //     </div>
// //   );
// // };

// // export default Dashboard;



// // import React, { useState, useEffect, useCallback, useRef } from 'react';
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
// // import { Heatmap } from '../../components/Dashboard/HeatMap';
// // import Icon from '../../components/Icon';
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
  
// //   // Reporter fields
// //   reporter_name?: string | null;
// //   reporter_phone?: string | null;
// //   reporter_email?: string | null;
  
// //   // Volunteer fields
// //   volunteer_name?: string | null;
// //   volunteer_id?: number;
// //   volunteer_phone?: string | null;
// //   volunteer_email?: string | null;
  
// //   // Task fields
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
// //   volunteer_name?: string;
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
// //   reporter_name: string | null;
// //   reporter_phone: string | null;
// //   reporter_email: string | null;
  
// //   // Volunteer fields
// //   volunteer_name: string;
// //   volunteer_email: string | null;
// //   volunteer_phone: string | null;
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

// // interface FullTaskDetails {
// //   task: VolunteerTask;
// //   evidence: TaskProof[];
// //   admin_notes: AdminNote[];
// //   completion_notes: TaskCompletionNote[];
// // }

// // // ===========================================
// // // HELPER FUNCTIONS
// // // ===========================================
// // const getToken = (): string | null => {
// //   return localStorage.getItem('token') || sessionStorage.getItem('token');
// // };

// // const hasPhone = (phone?: string | null): boolean => {
// //   if (phone === null || phone === undefined) return false;
// //   if (typeof phone !== 'string') return false;
// //   return phone.trim().length > 0;
// // };

// // const hasEmail = (email?: string | null): boolean => {
// //   if (email === null || email === undefined) return false;
// //   if (typeof email !== 'string') return false;
// //   const trimmed = email.trim();
// //   return trimmed.length > 0 && trimmed.includes('@') && trimmed.includes('.');
// // };

// // const formatPhoneNumber = (phone?: string | null): string => {
// //   if (!hasPhone(phone)) return 'Not provided';
// //   const phoneStr = String(phone).trim();
// //   const cleaned = phoneStr.replace(/\D/g, '');
// //   if (cleaned.length === 10) return `+977 ${cleaned}`;
// //   return phoneStr;
// // };

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

// // // Animal emojis only - kept as requested
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

// // const getStatusDisplay = (statusName?: string): string => {
// //   if (!statusName) return 'Unknown';
// //   return statusName
// //     .replace(/_/g, ' ')
// //     .replace(/\b\w/g, char => char.toUpperCase());
// // };

// // const getStatusClass = (statusName?: string): string => {
// //   const name = statusName?.toLowerCase() || '';
// //   if (name.includes('submitted')) return 'submitted';
// //   if (name.includes('review')) return 'review';
// //   if (name.includes('progress')) return 'progress';
// //   if (name.includes('completed')) return 'completed';
// //   if (name.includes('cancelled') || name.includes('declined')) return 'cancelled';
// //   return 'unknown';
// // };

// // const formatDate = (dateString: string | undefined): string => {
// //   if (!dateString) return 'Not available';
// //   try {
// //     const date = new Date(dateString);
// //     return date.toLocaleDateString('en-US', {
// //       month: 'short',
// //       day: 'numeric',
// //       year: 'numeric',
// //       hour: '2-digit',
// //       minute: '2-digit'
// //     });
// //   } catch {
// //     return 'Invalid date';
// //   }
// // };

// // const formatShortDate = (dateString: string): string => {
// //   if (!dateString) return 'Not available';
// //   try {
// //     const date = new Date(dateString);
// //     return date.toLocaleDateString('en-US', {
// //       month: 'short',
// //       day: 'numeric',
// //       year: 'numeric'
// //     });
// //   } catch {
// //     return 'Not available';
// //   }
// // };

// // const formatRelativeTime = (dateString: string): string => {
// //   if (!dateString) return 'Not available';
// //   try {
// //     const date = new Date(dateString);
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
// //   } catch {
// //     return 'Not available';
// //   }
// // };

// // const getStatusText = (statusName: string): string => {
// //   if (!statusName) return 'Unknown';
// //   return statusName
// //     .replace(/_/g, ' ')
// //     .split(' ')
// //     .map(word => word.charAt(0).toUpperCase() + word.slice(1))
// //     .join(' ');
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

// // // ===========================================
// // // LOCATION TRACKER COMPONENT
// // // ===========================================
// // const calculateDistance = (lat1: number, lng1: number, lat2: number, lng2: number): number => {
// //   const R = 6371;
// //   const dLat = (lat2 - lat1) * Math.PI / 180;
// //   const dLng = (lng2 - lng1) * Math.PI / 180;
// //   const a = 
// //     Math.sin(dLat/2) * Math.sin(dLat/2) +
// //     Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) * 
// //     Math.sin(dLng/2) * Math.sin(dLng/2);
// //   const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
// //   return R * c;
// // };

// // const LocationTracker: React.FC<{
// //   taskId: number;
// //   isActive: boolean;
// // }> = ({ taskId, isActive }) => {
// //   const [watchId, setWatchId] = useState<number | null>(null);
// //   const [lastLocation, setLastLocation] = useState<GeolocationPosition | null>(null);
// //   const [isTracking, setIsTracking] = useState(false);
// //   const [error, setError] = useState<string | null>(null);
// //   const [pendingPoints, setPendingPoints] = useState<number>(0);
  
// //   const pendingQueue = useRef<any[]>([]);
  
// //   const saveLocation = useCallback(async (latitude: number, longitude: number, accuracy: number) => {
// //     try {
// //       const token = getToken();
// //       if (!token) return;
      
// //       const response = await fetch('http://localhost:5000/api/volunteer/tracking/point', {
// //         method: 'POST',
// //         headers: {
// //           'Authorization': `Bearer ${token}`,
// //           'Content-Type': 'application/json'
// //         },
// //         body: JSON.stringify({ taskId, latitude, longitude, accuracy })
// //       });
      
// //       const data = await response.json();
// //       if (!data.success) {
// //         pendingQueue.current.push({ latitude, longitude, accuracy, timestamp: new Date() });
// //         setPendingPoints(pendingQueue.current.length);
// //       }
// //     } catch (error) {
// //       pendingQueue.current.push({ latitude, longitude, accuracy, timestamp: new Date() });
// //       setPendingPoints(pendingQueue.current.length);
// //     }
// //   }, [taskId]);
  
// //   const retryPendingPoints = useCallback(async () => {
// //     if (pendingQueue.current.length === 0) return;
    
// //     const token = getToken();
// //     if (!token) return;
    
// //     const points = [...pendingQueue.current];
// //     pendingQueue.current = [];
// //     setPendingPoints(0);
    
// //     for (const point of points) {
// //       try {
// //         await fetch('http://localhost:5000/api/volunteer/tracking/point', {
// //           method: 'POST',
// //           headers: {
// //             'Authorization': `Bearer ${token}`,
// //             'Content-Type': 'application/json'
// //           },
// //           body: JSON.stringify({
// //             taskId,
// //             latitude: point.latitude,
// //             longitude: point.longitude,
// //             accuracy: point.accuracy
// //           })
// //         });
// //       } catch (error) {
// //         pendingQueue.current.push(point);
// //         setPendingPoints(pendingQueue.current.length);
// //       }
// //     }
// //   }, [taskId]);
  
// //   const startTracking = useCallback(() => {
// //     if (!navigator.geolocation) {
// //       setError('Geolocation is not supported');
// //       return;
// //     }
    
// //     setError(null);
    
// //     navigator.geolocation.getCurrentPosition(
// //       (position) => {
// //         setLastLocation(position);
// //         saveLocation(
// //           position.coords.latitude,
// //           position.coords.longitude,
// //           position.coords.accuracy || 0
// //         );
// //       },
// //       () => {},
// //       { enableHighAccuracy: false, timeout: 10000, maximumAge: 60000 }
// //     );
    
// //     const id = navigator.geolocation.watchPosition(
// //       (position) => {
// //         let shouldSave = true;
        
// //         if (lastLocation) {
// //           const distance = calculateDistance(
// //             lastLocation.coords.latitude,
// //             lastLocation.coords.longitude,
// //             position.coords.latitude,
// //             position.coords.longitude
// //           );
// //           const timeDiff = (position.timestamp - lastLocation.timestamp) / 1000;
// //           shouldSave = distance > 0.05 || timeDiff > 30;
// //         }
        
// //         if (shouldSave) {
// //           saveLocation(
// //             position.coords.latitude,
// //             position.coords.longitude,
// //             position.coords.accuracy || 0
// //           );
// //         }
        
// //         setLastLocation(position);
// //       },
// //       (error) => {
// //         let errorMsg = 'Location error';
// //         switch(error.code) {
// //           case error.PERMISSION_DENIED: errorMsg = 'Permission denied'; break;
// //           case error.POSITION_UNAVAILABLE: errorMsg = 'Location unavailable'; break;
// //           case error.TIMEOUT: errorMsg = 'Location timeout'; break;
// //         }
// //         setError(errorMsg);
// //       },
// //       { enableHighAccuracy: true, timeout: 30000, maximumAge: 0 }
// //     );
    
// //     setWatchId(id);
// //     setIsTracking(true);
// //   }, [lastLocation, saveLocation]);
  
// //   const stopTracking = useCallback(() => {
// //     if (watchId !== null) {
// //       navigator.geolocation.clearWatch(watchId);
// //       setWatchId(null);
// //       setIsTracking(false);
// //     }
// //   }, [watchId]);
  
// //   useEffect(() => {
// //     if (isActive) {
// //       const timer = setTimeout(() => startTracking(), 1000);
// //       return () => { clearTimeout(timer); stopTracking(); };
// //     } else {
// //       stopTracking();
// //     }
// //   }, [isActive, startTracking, stopTracking]);
  
// //   useEffect(() => {
// //     const handleOnline = () => retryPendingPoints();
// //     window.addEventListener('online', handleOnline);
// //     return () => window.removeEventListener('online', handleOnline);
// //   }, [retryPendingPoints]);
  
// //   useEffect(() => {
// //     const interval = setInterval(() => {
// //       if (navigator.onLine && pendingQueue.current.length > 0) retryPendingPoints();
// //     }, 30000);
// //     return () => clearInterval(interval);
// //   }, [retryPendingPoints]);
  
// //   if (!isActive) return null;
  
// //   return (
// //     <div style={{
// //       position: 'fixed', bottom: '20px', right: '20px',
// //       background: error ? '#ffebee' : '#e8f5e9',
// //       padding: '8px 12px', borderRadius: '20px', fontSize: '0.8rem',
// //       boxShadow: '0 2px 5px rgba(0,0,0,0.2)', zIndex: 9999,
// //       display: 'flex', alignItems: 'center', gap: '6px'
// //     }}>
// //       <span style={{
// //         width: '8px', height: '8px', borderRadius: '50%',
// //         background: error ? '#f44336' : (isTracking ? '#4caf50' : '#ff9800'),
// //         animation: isTracking && !error ? 'pulse 2s infinite' : 'none'
// //       }}></span>
// //       <span>
// //         {error ? 'Location Error' : (isTracking ? 'Sharing Location' : 'Starting...')}
// //       </span>
// //       {pendingPoints > 0 && (
// //         <span style={{ background: '#fff3e0', padding: '2px 6px', borderRadius: '12px', fontSize: '0.7rem' }}>
// //           {pendingPoints} pending
// //         </span>
// //       )}
// //     </div>
// //   );
// // };

// // // ===========================================
// // // DECLINE MODAL
// // // ===========================================
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
// //         onClose();
// //       }
// //     }
// //   };

// //   return (
// //     <div className="modal-overlay" onClick={onClose}>
// //       <div className="modal-content" onClick={e => e.stopPropagation()}>
// //         <div className="modal-header">
// //           <div className="modal-header-left">
// //             <span className="modal-icon">
// //               <Icon type="fa6" name="FaCircleXmark" size={24} className="text-danger" />
// //             </span>
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
// //             <label className="form-label">Reason <span className="required">*</span></label>
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
// //               <label className="form-label">Please specify <span className="required">*</span></label>
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
// //           <button className="modal-btn secondary" onClick={onClose}>Cancel</button>
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

// // // ===========================================
// // // UPLOAD EVIDENCE MODAL
// // // ===========================================
// // const UploadEvidenceModal: React.FC<{
// //   isOpen: boolean;
// //   onClose: () => void;
// //   onSubmit: (file: File, notes: string) => void;
// //   taskId: number;
// // }> = ({ isOpen, onClose, onSubmit, taskId }) => {
// //   const [proofFile, setProofFile] = useState<File | null>(null);
// //   const [notes, setNotes] = useState('');
// //   const [previewUrl, setPreviewUrl] = useState<string | null>(null);
// //   const [uploading, setUploading] = useState(false);
// //   const [uploadError, setUploadError] = useState<string | null>(null);

// //   if (!isOpen) return null;

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
// //         if (previewUrl) URL.revokeObjectURL(previewUrl);
// //         setProofFile(file);
// //         setPreviewUrl(URL.createObjectURL(file));
// //       }
// //     }
// //   };

// //   const removeFile = () => {
// //     if (previewUrl) URL.revokeObjectURL(previewUrl);
// //     setProofFile(null);
// //     setPreviewUrl(null);
// //     setUploadError(null);
// //   };

// //   const handleSubmit = async () => {
// //     if (!proofFile) {
// //       setUploadError('Please select a photo');
// //       return;
// //     }
// //     if (!notes.trim()) {
// //       setUploadError('Please enter completion notes');
// //       return;
// //     }
    
// //     setUploading(true);
// //     try {
// //       await onSubmit(proofFile, notes);
// //       setProofFile(null);
// //       setNotes('');
// //       setPreviewUrl(null);
// //       onClose();
// //     } finally {
// //       setUploading(false);
// //     }
// //   };

// //   return (
// //     <div className="modal-overlay" onClick={onClose}>
// //       <div className="modal-content" onClick={e => e.stopPropagation()}>
// //         <div className="modal-header" style={{ background: 'linear-gradient(135deg, #2D5A27 0%, #1e3f1a 100%)' }}>
// //           <div className="modal-header-left">
// //             <span className="modal-icon">
// //               <Icon type="fa6" name="FaCamera" size={24} className="text-white" />
// //             </span>
// //             <div>
// //               <h3 className="modal-title">Upload Evidence for Task #{taskId}</h3>
// //               <p className="modal-subtitle">Add photos and notes to complete the mission</p>
// //             </div>
// //           </div>
// //           <button className="modal-close" onClick={onClose}>×</button>
// //         </div>
        
// //         <div className="modal-body">
// //           {uploadError && (
// //             <div style={{ color: '#c62828', marginBottom: '15px', padding: '10px', background: '#ffebee', borderRadius: '4px' }}>
// //               {uploadError}
// //             </div>
// //           )}

// //           <div className="form-group">
// //             <label className="form-label">Proof Photo <span className="required">*</span></label>
// //             {previewUrl ? (
// //               <div className="single-photo-preview">
// //                 <div style={{ position: 'relative', display: 'inline-block', width: '100%' }}>
// //                   <img src={previewUrl} alt="Preview" style={{ width: '100%', maxHeight: '200px', objectFit: 'contain', borderRadius: '4px' }} />
// //                   <button onClick={removeFile} style={{ position: 'absolute', top: '5px', right: '5px', background: '#c62828', color: 'white', border: 'none', borderRadius: '50%', width: '25px', height: '25px', cursor: 'pointer' }}>×</button>
// //                 </div>
// //                 <p style={{ marginTop: '5px' }}>{proofFile?.name} ({(proofFile!.size / 1024).toFixed(1)} KB)</p>
// //               </div>
// //             ) : (
// //               <label className="reports-btn primary" style={{ cursor: 'pointer', display: 'inline-block' }}>
// //                 <Icon type="fa6" name="FaCloudUploadAlt" size={16} className="text-white" />
// //                 <span style={{ marginLeft: '8px' }}>Choose Photo</span>
// //                 <input type="file" accept="image/jpeg,image/png,image/jpg,image/gif" onChange={handleFileChange} style={{ display: 'none' }} />
// //               </label>
// //             )}
// //           </div>

// //           <div className="form-group" style={{ marginTop: '15px' }}>
// //             <label className="form-label">Completion Notes <span className="required">*</span></label>
// //             <textarea
// //               value={notes}
// //               onChange={(e) => setNotes(e.target.value)}
// //               placeholder="Describe the rescue outcome, any challenges, and the animal's condition..."
// //               rows={4}
// //               maxLength={500}
// //               style={{ width: '100%', padding: '10px', border: '2px solid #2D5A27', borderRadius: '8px' }}
// //             />
// //             <p style={{ fontSize: '0.75rem', color: '#666', marginTop: '5px', textAlign: 'right' }}>
// //               {notes.length}/500 characters
// //             </p>
// //           </div>
// //         </div>
        
// //         <div className="modal-footer">
// //           <button className="modal-btn secondary" onClick={onClose}>Cancel</button>
// //           <button 
// //             className="modal-btn primary" 
// //             onClick={handleSubmit}
// //             disabled={!proofFile || !notes.trim() || uploading}
// //             style={{ background: (!proofFile || !notes.trim()) ? '#ccc' : '#2D5A27' }}
// //           >
// //             {uploading ? 'Uploading...' : 'Submit Evidence'}
// //           </button>
// //         </div>
// //       </div>
// //     </div>
// //   );
// // };

// // // ===========================================
// // // TASK DETAIL MODAL (WITH LOCATION TRACKER)
// // // ===========================================
// // const TaskDetailModal: React.FC<{
// //   task: VolunteerTask | null;
// //   isOpen: boolean;
// //   onClose: () => void;
// //   onUploadEvidence: (taskId: number, file: File, notes: string) => void;
// //   actionLoading: boolean;
// //   userProfile: UserProfile | null;
// //   evidence?: TaskProof[];
// //   adminNotes?: AdminNote[];
// // }> = ({ 
// //   task, 
// //   isOpen, 
// //   onClose, 
// //   onUploadEvidence,
// //   actionLoading, 
// //   userProfile, 
// //   evidence = [], 
// //   adminNotes = []
// // }) => {
// //   const [selectedImage, setSelectedImage] = useState<string | null>(null);
// //   const [showUploadForm, setShowUploadForm] = useState(false);
// //   const [isTrackingActive, setIsTrackingActive] = useState(false);

// //   useEffect(() => {
// //     if (task?.task_status_id === 2) setIsTrackingActive(true);
// //     else setIsTrackingActive(false);
// //   }, [task?.task_status_id]);

// //   if (!isOpen || !task) return null;

// //   const hasProofs = evidence.length > 0;

// //   const getFullImageUrl = (proofUrl: string) => {
// //     if (proofUrl.startsWith('http')) return proofUrl;
// //     const cleanUrl = proofUrl.startsWith('/') ? proofUrl.substring(1) : proofUrl;
// //     return `http://localhost:5000/${cleanUrl}`;
// //   };

// //   return (
// //     <>
// //       {/* Location Tracker - Only visible when task is active */}
// //       {task.task_status_id === 2 && (
// //         <LocationTracker taskId={task.task_id} isActive={isTrackingActive} />
// //       )}

// //       <div className="reports-modal-overlay" onClick={onClose}>
// //         <div className="reports-modal-content large" onClick={e => e.stopPropagation()}>
// //           <div className="reports-modal-header dark" style={{ background: '#1e3f1a' }}>
// //             <div>
// //               <h3>Rescue Report #{task.report_id}</h3>
// //               <div className="reports-modal-subheader">
// //                 <span className="reports-status-badge" style={{ 
// //                   background: 'rgba(255,255,255,0.2)', color: 'white', padding: '0.25rem 0.75rem',
// //                   borderRadius: '20px', fontSize: '0.75rem', fontWeight: '600', textTransform: 'uppercase'
// //                 }}>
// //                   {getTaskStatusBadge(task.task_status_id).text}
// //                 </span>
// //                 <span className="reports-meta" style={{ color: 'rgba(255,255,255,0.8)' }}>
// //                   <Icon type="fa6" name="FaRegClock" size={14} className="text-white-80" />
// //                   <span style={{ marginLeft: '4px' }}>Reported: {formatRelativeTime(task.submitted_at)}</span>
// //                 </span>
// //               </div>
// //             </div>
// //             <button className="reports-modal-close" onClick={onClose}>×</button>
// //           </div>
          
// //           <div className="reports-modal-body">
// //             <div className="reports-detail-grid">
// //               <div className="reports-detail-column">
// //                 <div className="reports-info-card">
// //                   <div className="reports-card-header beige">
// //                     <h4>
// //                       <Icon type="fa6" name="FaPaw" size={16} className="text-primary" />
// //                       <span style={{ marginLeft: '8px' }}>Animal Information</span>
// //                     </h4>
// //                   </div>
// //                   <div className="reports-card-content">
// //                     <div className="reports-animal-display">
// //                       <div className="reports-animal-icon">{getAnimalEmoji(task.animal_type)}</div>
// //                       <div className="reports-animal-details">
// //                         <div className="reports-animal-type">{task.animal_type}</div>
// //                         <div className="reports-animal-condition">
// //                           <span className="condition-tag">{task.animal_condition}</span>
// //                         </div>
// //                       </div>
// //                     </div>
// //                   </div>
// //                 </div>

// //                 <div className="reports-info-card">
// //                   <div className="reports-card-header beige">
// //                     <h4>
// //                       <Icon type="fa6" name="FaUser" size={16} className="text-primary" />
// //                       <span style={{ marginLeft: '8px' }}>Reporter Details</span>
// //                     </h4>
// //                   </div>
// //                   <div className="reports-card-content">
// //                     <div className="reports-detail-list">
// //                       <div className="reports-detail-row">
// //                         <span className="reports-detail-label">
// //                           <Icon type="fa6" name="FaUserCircle" size={14} className="text-primary" />
// //                           <span style={{ marginLeft: '4px' }}>Name</span>
// //                         </span>
// //                         <span className="reports-detail-value">{task.reporter_name || 'Anonymous'}</span>
// //                       </div>
// //                       {hasEmail(task.reporter_email) && (
// //                         <div className="reports-detail-row">
// //                           <span className="reports-detail-label">
// //                             <Icon type="fa6" name="FaEnvelope" size={14} className="text-primary" />
// //                             <span style={{ marginLeft: '4px' }}>Email</span>
// //                           </span>
// //                           <span className="reports-detail-value">{task.reporter_email}</span>
// //                         </div>
// //                       )}
// //                       {hasPhone(task.reporter_phone) && (
// //                         <div className="reports-detail-row">
// //                           <span className="reports-detail-label">
// //                             <Icon type="fa6" name="FaPhone" size={14} className="text-primary" />
// //                             <span style={{ marginLeft: '4px' }}>Phone</span>
// //                           </span>
// //                           <span className="reports-detail-value">{formatPhoneNumber(task.reporter_phone)}</span>
// //                         </div>
// //                       )}
// //                     </div>
// //                   </div>
// //                 </div>

// //                 <div className="reports-info-card">
// //                   <div className="reports-card-header beige">
// //                     <h4>
// //                       <Icon type="fa6" name="FaLocationDot" size={16} className="text-primary" />
// //                       <span style={{ marginLeft: '8px' }}>Location</span>
// //                     </h4>
// //                   </div>
// //                   <div className="reports-card-content">
// //                     <div className="reports-location-info">
// //                       <p>
// //                         <Icon type="fa6" name="FaMapPin" size={14} className="text-primary" />
// //                         <span style={{ marginLeft: '8px' }}>{task.location_address}</span>
// //                       </p>
// //                       <button className="reports-btn map" onClick={() => window.open(`https://maps.google.com/?q=${encodeURIComponent(task.location_address)}`, '_blank')}>
// //                         <Icon type="fa6" name="FaUpRightFromSquare" size={12} className="text-primary" />
// //                         <span style={{ marginLeft: '4px' }}>View on Map</span>
// //                       </button>
// //                     </div>
// //                   </div>
// //                 </div>

// //                 <div className="reports-info-card">
// //                   <div className="reports-card-header beige">
// //                     <h4>
// //                       <Icon type="fa6" name="FaClock" size={16} className="text-primary" />
// //                       <span style={{ marginLeft: '8px' }}>Timeline</span>
// //                     </h4>
// //                   </div>
// //                   <div className="reports-card-content">
// //                     <div className="reports-detail-list">
// //                       <div className="reports-detail-row">
// //                         <span className="reports-detail-label">
// //                           <Icon type="fa6" name="FaRegCalendar" size={14} className="text-primary" />
// //                           <span style={{ marginLeft: '4px' }}>Reported</span>
// //                         </span>
// //                         <span className="reports-detail-value">{formatDate(task.submitted_at)}</span>
// //                       </div>
// //                       {task.assigned_at && (
// //                         <div className="reports-detail-row">
// //                           <span className="reports-detail-label">
// //                             <Icon type="fa6" name="FaUserCheck" size={14} className="text-primary" />
// //                             <span style={{ marginLeft: '4px' }}>Assigned</span>
// //                           </span>
// //                           <span className="reports-detail-value">{formatDate(task.assigned_at)}</span>
// //                         </div>
// //                       )}
// //                       {task.started_at && (
// //                         <div className="reports-detail-row">
// //                           <span className="reports-detail-label">
// //                             <Icon type="fa6" name="FaPlay" size={14} className="text-primary" />
// //                             <span style={{ marginLeft: '4px' }}>Started</span>
// //                           </span>
// //                           <span className="reports-detail-value">{formatDate(task.started_at)}</span>
// //                         </div>
// //                       )}
// //                     </div>
// //                   </div>
// //                 </div>
// //               </div>

// //               <div className="reports-detail-column">
// //                 <div className="reports-info-card">
// //                   <div className="reports-card-header beige">
// //                     <h4>
// //                       <Icon type="fa6" name="FaClipboardList" size={16} className="text-primary" />
// //                       <span style={{ marginLeft: '8px' }}>Mission Description</span>
// //                     </h4>
// //                   </div>
// //                   <div className="reports-card-content">
// //                     <div className="reports-description"><p>{task.description}</p></div>
// //                     {task.user_note && (
// //                       <div className="reports-user-note">
// //                         <div className="note-label">
// //                           <Icon type="fa6" name="FaNoteSticky" size={14} className="text-primary" />
// //                           <span style={{ marginLeft: '4px' }}>Reporter's Note:</span>
// //                         </div>
// //                         <p>{task.user_note}</p>
// //                       </div>
// //                     )}
// //                   </div>
// //                 </div>

// //                 <div className="reports-info-card">
// //                   <div className="reports-card-header beige">
// //                     <div className="reports-header-row" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
// //                       <h4>
// //                         <Icon type="fa6" name="FaCamera" size={16} className="text-primary" />
// //                         <span style={{ marginLeft: '8px' }}>Evidence Photos</span>
// //                       </h4>
// //                       {task.task_status_id === 2 && !hasProofs && !showUploadForm && (
// //                         <button className="reports-btn primary small" onClick={() => setShowUploadForm(true)}>
// //                           <Icon type="fa6" name="FaUpload" size={12} className="text-white" />
// //                           <span style={{ marginLeft: '4px' }}>+ Upload Evidence</span>
// //                         </button>
// //                       )}
// //                     </div>
// //                   </div>
// //                   <div className="reports-card-content">
// //                     {evidence.length > 0 ? (
// //                       <div>
// //                         <p style={{ marginBottom: '10px', color: '#2D5A27', fontWeight: '600' }}>
// //                           <Icon type="fa6" name="FaCircleCheck" size={14} className="text-success" />
// //                           <span style={{ marginLeft: '4px' }}>{evidence.length} photo(s) uploaded</span>
// //                         </p>
// //                         <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '15px' }}>
// //                           {evidence.map((proof) => (
// //                             <div key={proof.proof_id} style={{ border: '1px solid #e8dfc9', borderRadius: '8px', padding: '8px', background: '#f9f5ec', cursor: 'pointer' }}
// //                                  onClick={() => setSelectedImage(getFullImageUrl(proof.proof_url))}>
// //                               <img src={getFullImageUrl(proof.proof_url)} alt={`Evidence ${proof.proof_id}`}
// //                                    style={{ width: '100%', height: '120px', objectFit: 'cover', borderRadius: '4px' }}
// //                                    onError={(e) => { e.currentTarget.style.display = 'none'; }} />
// //                               <p style={{ fontSize: '0.7rem', textAlign: 'center', marginTop: '5px', color: '#666' }}>
// //                                 <Icon type="fa6" name="FaRegCalendar" size={10} className="text-muted" />
// //                                 <span style={{ marginLeft: '4px' }}>Uploaded: {formatShortDate(proof.uploaded_at)}</span>
// //                               </p>
// //                             </div>
// //                           ))}
// //                         </div>
// //                       </div>
// //                     ) : (
// //                       <div>
// //                         {showUploadForm ? (
// //                           <p>Please use the Upload Evidence button to add photos.</p>
// //                         ) : (
// //                           <p>
// //                             <Icon type="fa6" name="FaCircleInfo" size={14} className="text-primary" />
// //                             <span style={{ marginLeft: '4px' }}>No evidence uploaded yet.</span>
// //                           </p>
// //                         )}
// //                       </div>
// //                     )}
// //                   </div>
// //                 </div>

// //                 {adminNotes.length > 0 && (
// //                   <div className="reports-info-card">
// //                     <div className="reports-card-header beige">
// //                       <h4>
// //                         <Icon type="fa6" name="FaClipboard" size={16} className="text-primary" />
// //                         <span style={{ marginLeft: '8px' }}>Admin Notes</span>
// //                       </h4>
// //                     </div>
// //                     <div className="reports-card-content">
// //                       {adminNotes.map((note) => (
// //                         <div key={note.note_id} style={{ background: '#f9f5ec', padding: '12px', borderRadius: '8px', marginBottom: '10px', borderLeft: '3px solid #2D5A27' }}>
// //                           <div style={{ display: 'flex', justifyContent: 'space-between' }}>
// //                             <span style={{ fontWeight: 'bold', color: '#2D5A27' }}>
// //                               <Icon type="fa6" name="FaUserShield" size={14} className="text-primary" />
// //                               <span style={{ marginLeft: '4px' }}>{note.admin_name || 'Admin'}</span>
// //                             </span>
// //                             <span style={{ fontSize: '0.75rem', color: '#666' }}>
// //                               <Icon type="fa6" name="FaRegClock" size={12} className="text-muted" />
// //                               <span style={{ marginLeft: '4px' }}>{formatRelativeTime(note.created_at)}</span>
// //                             </span>
// //                           </div>
// //                           <p style={{ margin: 0 }}>{note.note_text}</p>
// //                         </div>
// //                       ))}
// //                     </div>
// //                   </div>
// //                 )}
// //               </div>
// //             </div>

// //             {selectedImage && (
// //               <div className="image-lightbox" onClick={() => setSelectedImage(null)} style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, background: 'rgba(0,0,0,0.9)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 2000 }}>
// //                 <img src={selectedImage} alt="Enlarged evidence" style={{ maxWidth: '90%', maxHeight: '90%', objectFit: 'contain' }} />
// //                 <button onClick={() => setSelectedImage(null)} style={{ position: 'absolute', top: '20px', right: '20px', background: 'white', border: 'none', borderRadius: '50%', width: '40px', height: '40px', fontSize: '20px', cursor: 'pointer' }}>×</button>
// //               </div>
// //             )}
// //           </div>
          
// //           <div className="reports-modal-footer">
// //             <button className="reports-btn secondary" onClick={onClose}>
// //               <Icon type="fa6" name="FaXmark" size={14} className="text-secondary" />
// //               <span style={{ marginLeft: '4px' }}>Close</span>
// //             </button>
// //           </div>
// //         </div>
// //       </div>

// //       {/* Upload Evidence Modal */}
// //       {showUploadForm && (
// //         <UploadEvidenceModal
// //           isOpen={showUploadForm}
// //           onClose={() => setShowUploadForm(false)}
// //           onSubmit={(file, notes) => {
// //             onUploadEvidence(task.task_id, file, notes);
// //             setShowUploadForm(false);
// //           }}
// //           taskId={task.task_id}
// //         />
// //       )}
// //     </>
// //   );
// // };

// // // ===========================================
// // // ENHANCED REPORT DETAIL MODAL
// // // ===========================================
// // const ReportDetailModal: React.FC<{
// //   report: Report | null;
// //   isOpen: boolean;
// //   onClose: () => void;
// //   userPhone?: string;
// //   userEmail?: string;
// //   userName?: string;
// //   evidence?: TaskProof[];
// //   notes?: TaskCompletionNote[];
// //   loading?: boolean;
// // }> = ({ report, isOpen, onClose, userPhone, userEmail, userName, evidence = [], notes = [], loading = false }) => {
// //   const [selectedImage, setSelectedImage] = useState<string | null>(null);
// //   const [activeTab, setActiveTab] = useState<'details' | 'evidence' | 'notes'>('details');
// //   const [imageErrors, setImageErrors] = useState<Record<number, boolean>>({});

// //   if (!isOpen || !report) return null;

// //   const reporterName = report.reporter_name || userName || 'Anonymous';
// //   const phoneNumber = report.reporter_phone || userPhone;
// //   const emailAddress = report.reporter_email || userEmail;
// //   const volunteerName = report.volunteer_name;
  
// //   const isCompleted = report.status_id === 4;
// //   const hasEvidence = evidence.length > 0;
// //   const hasNotes = notes.length > 0;

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

// //   const handleImageError = (proofId: number) => {
// //     setImageErrors(prev => ({ ...prev, [proofId]: true }));
// //   };

// //   return (
// //     <div className="modal-overlay" onClick={onClose}>
// //       <div className="modal-content report-detail-modal horizontal-modal" onClick={e => e.stopPropagation()}>
// //         {/* Header */}
// //         <div className="modal-header compact-header">
// //           <div className="modal-header-left">
// //             <span className="modal-animal-emoji small">{getAnimalEmoji(report.animal_type)}</span>
// //             <div>
// //               <h3 className="modal-title small">Report #{report.report_id}</h3>
// //               <p className="modal-subtitle small">{report.animal_type} • {report.animal_condition}</p>
// //             </div>
// //           </div>
// //           <div className="header-actions">
// //             <span className={`status-badge-small status-${getStatusClass(report.status_name)}`}>
// //               {getStatusDisplay(report.status_name)}
// //             </span>
// //             <button className="modal-close small" onClick={onClose}>×</button>
// //           </div>
// //         </div>
        
// //         {/* Tab Navigation */}
// //         <div className="modal-tabs">
// //           <button 
// //             className={`modal-tab ${activeTab === 'details' ? 'active' : ''}`}
// //             onClick={() => setActiveTab('details')}
// //           >
// //             <Icon type="fa6" name="FaClipboardList" size={14} className="text-primary" />
// //             <span style={{ marginLeft: '8px' }}>Details</span>
// //           </button>
// //           {isCompleted && (
// //             <>
// //               <button 
// //                 className={`modal-tab ${activeTab === 'evidence' ? 'active' : ''}`}
// //                 onClick={() => setActiveTab('evidence')}
// //               >
// //                 <Icon type="fa6" name="FaCamera" size={14} className="text-primary" />
// //                 <span style={{ marginLeft: '8px' }}>Evidence {hasEvidence && `(${evidence.length})`}</span>
// //               </button>
// //               <button 
// //                 className={`modal-tab ${activeTab === 'notes' ? 'active' : ''}`}
// //                 onClick={() => setActiveTab('notes')}
// //               >
// //                 <Icon type="fa6" name="FaNoteSticky" size={14} className="text-primary" />
// //                 <span style={{ marginLeft: '8px' }}>Notes {hasNotes && `(${notes.length})`}</span>
// //               </button>
// //             </>
// //           )}
// //         </div>
        
// //         <div className="modal-body horizontal-body">
// //           {/* Details Tab */}
// //           {activeTab === 'details' && (
// //             <div className="details-tab-content">
// //               <div className="details-two-column">
// //                 <div className="details-column">
// //                   <div className="detail-row">
// //                     <span className="detail-row-label">
// //                       <Icon type="fa6" name="FaUser" size={12} className="text-primary" />
// //                       <span style={{ marginLeft: '4px' }}>Reporter:</span>
// //                     </span>
// //                     <span className="detail-row-value">{reporterName}</span>
// //                   </div>
// //                   {hasEmail(emailAddress) && (
// //                     <div className="detail-row">
// //                       <span className="detail-row-label">
// //                         <Icon type="fa6" name="FaEnvelope" size={12} className="text-primary" />
// //                         <span style={{ marginLeft: '4px' }}>Email:</span>
// //                       </span>
// //                       <span className="detail-row-value">{emailAddress}</span>
// //                     </div>
// //                   )}
// //                   {hasPhone(phoneNumber) && (
// //                     <div className="detail-row">
// //                       <span className="detail-row-label">
// //                         <Icon type="fa6" name="FaPhone" size={12} className="text-primary" />
// //                         <span style={{ marginLeft: '4px' }}>Phone:</span>
// //                       </span>
// //                       <span className="detail-row-value phone">{formatPhoneNumber(phoneNumber)}</span>
// //                     </div>
// //                   )}
// //                   <div className="detail-row">
// //                     <span className="detail-row-label">
// //                       <Icon type="fa6" name="FaIdCard" size={12} className="text-primary" />
// //                       <span style={{ marginLeft: '4px' }}>User ID:</span>
// //                     </span>
// //                     <span className="detail-row-value">#{report.user_id}</span>
// //                   </div>
// //                 </div>
                
// //                 <div className="details-column">
// //                   <div className="detail-row">
// //                     <span className="detail-row-label">
// //                       <Icon type="fa6" name="FaPaw" size={12} className="text-primary" />
// //                       <span style={{ marginLeft: '4px' }}>Animal:</span>
// //                     </span>
// //                     <span className="detail-row-value">{report.animal_type}</span>
// //                   </div>
// //                   <div className="detail-row">
// //                     <span className="detail-row-label">
// //                       <Icon type="fa6" name="FaHeartPulse" size={12} className="text-primary" />
// //                       <span style={{ marginLeft: '4px' }}>Condition:</span>
// //                     </span>
// //                     <span className="detail-row-value">
// //                       <span className="condition-icon-small">{getConditionIcon(report.animal_condition)}</span> {report.animal_condition}
// //                     </span>
// //                   </div>
// //                   <div className="detail-row">
// //                     <span className="detail-row-label">
// //                       <Icon type="fa6" name="FaLocationDot" size={12} className="text-primary" />
// //                       <span style={{ marginLeft: '4px' }}>Location:</span>
// //                     </span>
// //                     <span className="detail-row-value location">{report.location_address}</span>
// //                   </div>
// //                   <div className="detail-row">
// //                     <span className="detail-row-label">
// //                       <Icon type="fa6" name="FaRegCalendar" size={12} className="text-primary" />
// //                       <span style={{ marginLeft: '4px' }}>Submitted:</span>
// //                     </span>
// //                     <span className="detail-row-value">{formatShortDate(report.submitted_at)}</span>
// //                   </div>
// //                 </div>
// //               </div>

// //               <div className="description-horizontal">
// //                 <div className="description-horizontal-header">
// //                   <Icon type="fa6" name="FaAlignLeft" size={14} className="text-primary" />
// //                   <span style={{ marginLeft: '8px' }}>Description</span>
// //                 </div>
// //                 <p>{report.description}</p>
// //               </div>

// //               {volunteerName && (
// //                 <div className="volunteer-horizontal">
// //                   <span className="volunteer-horizontal-label">
// //                     <Icon type="fa6" name="FaUserTie" size={12} className="text-primary" />
// //                     <span style={{ marginLeft: '4px' }}>Assigned Ranger:</span>
// //                   </span>
// //                   <span className="volunteer-horizontal-value">{volunteerName}</span>
// //                 </div>
// //               )}
// //             </div>
// //           )}

// //           {/* Evidence Tab */}
// //           {activeTab === 'evidence' && isCompleted && (
// //             <div className="evidence-tab-content">
// //               {loading ? (
// //                 <div className="loading-mini">
// //                   <Icon type="fa6" name="FaSpinner" size={16} className="fa-spin text-primary" />
// //                   <span style={{ marginLeft: '8px' }}>Loading evidence...</span>
// //                 </div>
// //               ) : hasEvidence ? (
// //                 <div className="evidence-horizontal-grid">
// //                   {evidence.map((proof) => {
// //                     const imageUrl = getFullImageUrl(proof.proof_url);
// //                     const hasError = imageErrors[proof.proof_id];
                    
// //                     return (
// //                       <div 
// //                         key={proof.proof_id} 
// //                         className="evidence-horizontal-item"
// //                         onClick={() => !hasError && setSelectedImage(imageUrl)}
// //                       >
// //                         {!hasError ? (
// //                           <img 
// //                             src={imageUrl} 
// //                             alt={`Evidence`}
// //                             onError={() => handleImageError(proof.proof_id)}
// //                           />
// //                         ) : (
// //                           <div className="evidence-placeholder">
// //                             <Icon type="fa6" name="FaImage" size={24} className="text-muted" />
// //                           </div>
// //                         )}
// //                         <span className="evidence-horizontal-date">
// //                           <Icon type="fa6" name="FaRegCalendar" size={10} className="text-white" />
// //                           <span style={{ marginLeft: '4px' }}>{new Date(proof.uploaded_at).toLocaleDateString()}</span>
// //                         </span>
// //                       </div>
// //                     );
// //                   })}
// //                 </div>
// //               ) : (
// //                 <div className="empty-mini">
// //                   <Icon type="fa6" name="FaCameraSlash" size={32} className="text-muted" />
// //                   <p>No evidence photos available</p>
// //                 </div>
// //               )}
// //             </div>
// //           )}

// //           {/* Notes Tab */}
// //           {activeTab === 'notes' && isCompleted && (
// //             <div className="notes-tab-content">
// //               {loading ? (
// //                 <div className="loading-mini">
// //                   <Icon type="fa6" name="FaSpinner" size={16} className="fa-spin text-primary" />
// //                   <span style={{ marginLeft: '8px' }}>Loading notes...</span>
// //                 </div>
// //               ) : hasNotes ? (
// //                 <div className="notes-horizontal-list">
// //                   {notes.map((note) => (
// //                     <div key={note.note_id} className="note-horizontal-item">
// //                       <div className="note-horizontal-header">
// //                         <span className="note-horizontal-author">
// //                           <Icon type="fa6" name="FaUserCheck" size={12} className="text-primary" />
// //                           <span style={{ marginLeft: '4px' }}>{note.volunteer_name || 'Volunteer'}</span>
// //                         </span>
// //                         <span className="note-horizontal-time">
// //                           <Icon type="fa6" name="FaRegClock" size={10} className="text-muted" />
// //                           <span style={{ marginLeft: '4px' }}>{formatDate(note.created_at)}</span>
// //                         </span>
// //                       </div>
// //                       <p className="note-horizontal-text">{note.note_text}</p>
// //                     </div>
// //                   ))}
// //                 </div>
// //               ) : (
// //                 <div className="empty-mini">
// //                   <Icon type="fa6" name="FaNoteSticky" size={32} className="text-muted" />
// //                   <p>No notes available</p>
// //                 </div>
// //               )}
// //             </div>
// //           )}
// //         </div>

// //         {/* Image Lightbox */}
// //         {selectedImage && (
// //           <div className="lightbox" onClick={() => setSelectedImage(null)}>
// //             <img src={selectedImage} alt="Enlarged evidence" />
// //             <button className="lightbox-close" onClick={() => setSelectedImage(null)}>×</button>
// //           </div>
// //         )}
        
// //         <div className="modal-footer compact-footer">
// //           <button className="modal-btn secondary small" onClick={onClose}>
// //             <Icon type="fa6" name="FaXmark" size={12} className="text-secondary" />
// //             <span style={{ marginLeft: '4px' }}>Close</span>
// //           </button>
// //           {report.task_id && (
// //             <span className="task-id-badge small">
// //               <Icon type="fa6" name="FaTasks" size={12} className="text-primary" />
// //               <span style={{ marginLeft: '4px' }}>Task #{report.task_id}</span>
// //             </span>
// //           )}
// //         </div>
// //       </div>
// //     </div>
// //   );
// // };

// // // ===========================================
// // // LOADING SPINNER
// // // ===========================================
// // const LoadingSpinner: React.FC = () => (
// //   <div className="loading-spinner">
// //     <div className="spinner"></div>
// //     <p>Loading reports...</p>
// //   </div>
// // );

// // // ===========================================
// // // ADMIN DASHBOARD
// // // ===========================================
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

// //   const uniqueReporters = new Set(reports.map(r => r.user_id)).size;

// //   useEffect(() => {
// //     if (reports && reports.length > 0) {
// //       const validReports = reports.filter(r => 
// //         r.location_address && r.location_address.trim() !== '' && r.location_address !== 'No location'
// //       );
// //       setHeatmapData(validReports);
// //     }
// //   }, [reports]);

// //   const getMostCommonAnimal = (): string => {
// //     const animalCounts = reports.reduce((acc, r) => {
// //       if (r.animal_type) acc[r.animal_type] = (acc[r.animal_type] || 0) + 1;
// //       return acc;
// //     }, {} as Record<string, number>);
    
// //     let maxCount = 0, mostCommon = 'N/A';
// //     Object.entries(animalCounts).forEach(([animal, count]) => {
// //       if (count > maxCount) { maxCount = count; mostCommon = animal; }
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
// //             <div className="stat-icon">
// //               <Icon type="fa6" name="FaClipboardList" size={28} className="text-primary" />
// //             </div>
// //             <div className="stat-content">
// //               <div className="stat-value">{reportsLoading ? '...' : totalReports}</div>
// //               <div className="stat-label">Total Reports</div>
// //             </div>
// //           </div>
          
// //           <div className="stat-card">
// //             <div className="stat-icon">
// //               <Icon type="fa6" name="FaHourglassHalf" size={28} className="text-primary" />
// //             </div>
// //             <div className="stat-content">
// //               <div className="stat-value">{reportsLoading ? '...' : submittedReports + assignedReports + inProgressReports}</div>
// //               <div className="stat-label">Active Cases</div>
// //             </div>
// //           </div>
          
// //           <div className="stat-card">
// //             <div className="stat-icon">
// //               <Icon type="fa6" name="FaCircleCheck" size={28} className="text-primary" />
// //             </div>
// //             <div className="stat-content">
// //               <div className="stat-value">{reportsLoading ? '...' : completedReports}</div>
// //               <div className="stat-label">Completed</div>
// //             </div>
// //           </div>
          
// //           <div className="stat-card">
// //             <div className="stat-icon">
// //               <Icon type="fa6" name="FaUsers" size={28} className="text-primary" />
// //             </div>
// //             <div className="stat-content">
// //               <div className="stat-value">{reportsLoading ? '...' : uniqueReporters}</div>
// //               <div className="stat-label">Reporters</div>
// //             </div>
// //           </div>
// //         </div>

// //         <div className="heatmap-section">
// //           <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
// //             <h3 className="section-header" style={{ margin: 0 }}>
// //               <Icon type="fa6" name="FaFire" size={20} className="text-danger" />
// //               <span style={{ marginLeft: '8px' }}>Incident Heatmap - Most Reported Areas</span>
// //             </h3>
// //             <button onClick={() => setShowHeatmap(!showHeatmap)} className="reports-btn"
// //                     style={{ background: showHeatmap ? '#f44336' : '#2D5A27', color: 'white', border: 'none', padding: '8px 20px', borderRadius: '6px', cursor: 'pointer' }}>
// //               <Icon type="fa6" name={showHeatmap ? "FaEyeSlash" : "FaMap"} size={14} className="text-white" />
// //               <span style={{ marginLeft: '4px' }}>{showHeatmap ? 'Hide Map' : 'Show Heatmap'}</span>
// //             </button>
// //           </div>

// //           {showHeatmap && (
// //             <div className="heatmap-container">
// //               {heatmapData.length > 0 ? (
// //                 <>
// //                   <Heatmap reports={heatmapData} height="500px" />
                  
// //                   <div className="heatmap-stats-grid">
// //                     <div className="heatmap-stat-card">
// //                       <div className="heatmap-stat-label">
// //                         <Icon type="fa6" name="FaMapPin" size={12} className="text-primary" />
// //                         <span style={{ marginLeft: '4px' }}>Total Locations</span>
// //                       </div>
// //                       <div className="heatmap-stat-value">{heatmapData.length}</div>
// //                     </div>
// //                     <div className="heatmap-stat-card">
// //                       <div className="heatmap-stat-label">
// //                         <Icon type="fa6" name="FaLocationArrow" size={12} className="text-primary" />
// //                         <span style={{ marginLeft: '4px' }}>Unique Areas</span>
// //                       </div>
// //                       <div className="heatmap-stat-value">{new Set(heatmapData.map(r => r.location_address)).size}</div>
// //                     </div>
// //                     <div className="heatmap-stat-card">
// //                       <div className="heatmap-stat-label">
// //                         <Icon type="fa6" name="FaPaw" size={12} className="text-primary" />
// //                         <span style={{ marginLeft: '4px' }}>Most Common Animal</span>
// //                       </div>
// //                       <div className="heatmap-stat-value">{getMostCommonAnimal()}</div>
// //                     </div>
// //                     <div className="heatmap-stat-card">
// //                       <div className="heatmap-stat-label">
// //                         <Icon type="fa6" name="FaTriangleExclamation" size={12} className="text-danger" />
// //                         <span style={{ marginLeft: '4px' }}>Hotspots (3+ reports)</span>
// //                       </div>
// //                       <div className="heatmap-stat-value highlight">{getHotspotCount()}</div>
// //                     </div>
// //                   </div>

// //                   <div style={{ marginTop: '1.5rem' }}>
// //                     <h4 style={{ marginBottom: '1rem', color: '#333' }}>
// //                       <Icon type="fa6" name="FaTag" size={16} className="text-primary" />
// //                       <span style={{ marginLeft: '8px' }}>Top Hotspot Areas</span>
// //                     </h4>
// //                     <div className="hotspot-tags">
// //                       {Object.entries(heatmapData.reduce((acc, r) => {
// //                         acc[r.location_address] = (acc[r.location_address] || 0) + 1;
// //                         return acc;
// //                       }, {} as Record<string, number>))
// //                         .sort((a, b) => b[1] - a[1])
// //                         .slice(0, 8)
// //                         .map(([location, count]) => (
// //                           <div key={location} className={`hotspot-tag ${count >= 5 ? 'high' : count >= 3 ? 'medium' : 'low'}`}>
// //                             <Icon type="fa6" name={count >= 5 ? "FaFire" : "FaCircle"} size={10} className={count >= 5 ? 'text-danger' : 'text-muted'} />
// //                             <span style={{ marginLeft: '4px' }}>{location.length > 25 ? location.substring(0, 25) + '...' : location} ({count})</span>
// //                           </div>
// //                         ))}
// //                     </div>
// //                   </div>
// //                 </>
// //               ) : (
// //                 <div style={{ height: '300px', display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#f5f5f5', borderRadius: '8px', flexDirection: 'column', gap: '1rem' }}>
// //                   <Icon type="fa6" name="FaMapLocationDot" size={48} className="text-muted" />
// //                   <p style={{ color: '#666' }}>No location data available for heatmap</p>
// //                 </div>
// //               )}
// //             </div>
// //           )}
// //         </div>

// //         <div className="admin-charts-section">
// //           <div className="chart-container">
// //             <h3 className="chart-title">
// //               <Icon type="fa6" name="FaChartBar" size={20} className="text-primary" />
// //               <span style={{ marginLeft: '8px' }}>Report Status Distribution</span>
// //             </h3>
// //             <div className="recharts-wrapper">
// //               {reportsLoading ? (
// //                 <div className="chart-loading"><div className="spinner"></div><p>Loading chart data...</p></div>
// //               ) : (
// //                 <ResponsiveContainer width="100%" height={300}>
// //                   <BarChart data={chartData}>
// //                     <XAxis dataKey="name" axisLine={false} tickLine={false} />
// //                     <YAxis axisLine={false} tickLine={false} />
// //                     <Tooltip cursor={{fill: '#F5F1E8'}} formatter={(value) => [value, 'Count']} labelFormatter={(label) => `${label}`} />
// //                     <Bar dataKey="value" radius={[10, 10, 0, 0]} barSize={60}>
// //                       {chartData.map((entry, index) => <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />)}
// //                     </Bar>
// //                   </BarChart>
// //                 </ResponsiveContainer>
// //               )}
// //             </div>
// //           </div>
          
// //           <div className="volunteer-alert-box">
// //             <div className="volunteer-alert-icon">
// //               <Icon type="fa6" name="FaBolt" size={32} className="text-warning" />
// //             </div>
// //             <h3 className="volunteer-alert-title">Quick Navigation</h3>
// //             <p className="volunteer-alert-text">Manage your volunteer force or review all mission reports.</p>
// //             <Link to="/admin/users" className="volunteer-alert-btn" style={{ marginBottom: '10px', background: '#2D5A27' }}>
// //               <Icon type="fa6" name="FaUsers" size={14} className="text-white" />
// //               <span style={{ marginLeft: '8px' }}>Manage Volunteers</span>
// //             </Link>
// //             <Link to="/admin/rescue-reports" className="volunteer-alert-btn" style={{ background: '#1976D2' }}>
// //               <Icon type="fa6" name="FaClipboardList" size={14} className="text-white" />
// //               <span style={{ marginLeft: '8px' }}>View All Reports</span>
// //             </Link>
// //           </div>
// //         </div>

// //         <div className="recent-reports-section">
// //           <div className="section-header">
// //             <h3>
// //               <Icon type="fa6" name="FaRegClock" size={18} className="text-primary" />
// //               <span style={{ marginLeft: '8px' }}>Recent Reports ({reports.length})</span>
// //             </h3>
// //             <Link to="/admin/rescue-reports" className="view-all-link">
// //               View All Reports <Icon type="fa6" name="FaArrowRight" size={12} className="text-primary" />
// //             </Link>
// //           </div>
// //           <div className="reports-table-container">
// //             {reportsLoading ? (
// //               <div className="loading-message"><div className="loading-spinner-small"></div><p>Loading reports...</p></div>
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
// //                       <td>
// //                         <div className="animal-cell">
// //                           <span className="animal-emoji">{getAnimalEmoji(report.animal_type)}</span>
// //                           <span className="animal-name">{report.animal_type || 'Unknown'}</span>
// //                         </div>
// //                       </td>
// //                       <td>{report.animal_condition || 'Unknown'}</td>
// //                       <td className="location-cell">{report.location_address || 'No location'}</td>
// //                       <td>{report.reporter_name || 'Anonymous'}</td>
// //                       <td>
// //                         {report.volunteer_name ? (
// //                           <span className="volunteer-name">
// //                             <Icon type="fa6" name="FaUserTie" size={12} className="text-primary" />
// //                             <span style={{ marginLeft: '4px' }}>{report.volunteer_name}</span>
// //                           </span>
// //                         ) : (
// //                           <span className="not-assigned">
// //                             <Icon type="fa6" name="FaUserSlash" size={12} className="text-muted" />
// //                             <span style={{ marginLeft: '4px' }}>Not assigned</span>
// //                           </span>
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
// //                 <Icon type="fa6" name="FaClipboard" size={48} className="text-muted" />
// //                 <p>No reports found in the system.</p>
// //               </div>
// //             )}
// //           </div>
// //         </div>
// //       </div>
// //     </div>
// //   );
// // };

// // // ===========================================
// // // VOLUNTEER DASHBOARD
// // // ===========================================
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
// //   const [taskDetails, setTaskDetails] = useState<{[key: number]: VolunteerTask}>({});
  
// //   useEffect(() => {
// //     const fetchAllTasks = async () => {
// //       if (!user?.user_id) return;
      
// //       try {
// //         setMissionsLoading(true);
// //         setFetchError(null);
// //         const token = getToken();
        
// //         if (!token) {
// //           setFetchError('No authentication token');
// //           return;
// //         }

// //         const response = await fetch(`http://localhost:5000/api/volunteers/tasks`, {
// //           method: 'GET',
// //           headers: { 'Authorization': `Bearer ${token}`, 'Content-Type': 'application/json' }
// //         });
        
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
// //       const token = getToken();
// //       const response = await fetch(`http://localhost:5000/api/tasks/${taskId}/evidence`, {
// //         headers: { 'Authorization': `Bearer ${token}` }
// //       });
// //       const data = await response.json();
// //       if (data.success) {
// //         setTaskEvidence(prev => ({ ...prev, [taskId]: data.data }));
// //       }
// //     } catch (error) {
// //       console.error('Error fetching evidence:', error);
// //     }
// //   };

// //   const fetchTaskAdminNotes = async (reportId: number, taskId: number) => {
// //     try {
// //       const token = getToken();
// //       const response = await fetch(`http://localhost:5000/api/reports/${reportId}/admin-notes`, {
// //         headers: { 'Authorization': `Bearer ${token}` }
// //       });
// //       const data = await response.json();
// //       if (data.success) {
// //         setTaskAdminNotes(prev => ({ ...prev, [taskId]: data.data }));
// //       }
// //     } catch (error) {
// //       console.error('Error fetching admin notes:', error);
// //     }
// //   };

// //   const fetchFullTaskDetails = async (taskId: number) => {
// //     try {
// //       const token = getToken();
// //       const response = await fetch(
// //         `http://localhost:5000/api/tasks/task/${taskId}/full-details`,
// //         {
// //           headers: { 'Authorization': `Bearer ${token}` }
// //         }
// //       );
      
// //       const data = await response.json();
// //       if (data.success) {
// //         setTaskDetails(prev => ({ ...prev, [taskId]: data.data.task }));
// //         return data.data;
// //       }
// //     } catch (error) {
// //       console.error('Error fetching full task details:', error);
// //     }
// //     return null;
// //   };

// //   const handleAcceptTask = async (taskId: number) => {
// //     try {
// //       setActionLoading(true);
// //       const token = getToken();
      
// //       const response = await fetch(`http://localhost:5000/api/volunteers/tasks/${taskId}/accept`, {
// //         method: 'PATCH',
// //         headers: { 'Authorization': `Bearer ${token}`, 'Content-Type': 'application/json' }
// //       });
      
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
// //         console.log('Task accepted successfully!');
// //       } else {
// //         console.log('Failed to accept task: ' + data.message);
// //       }
// //     } catch (error) {
// //       console.error('Error accepting task:', error);
// //       console.log('Failed to accept task');
// //     } finally {
// //       setActionLoading(false);
// //     }
// //   };

// //   const handleDeclineTask = async (taskId: number, reason: string) => {
// //     try {
// //       setActionLoading(true);
// //       const token = getToken();
      
// //       const response = await fetch(`http://localhost:5000/api/volunteers/tasks/${taskId}/decline`, {
// //         method: 'PATCH',
// //         headers: { 'Authorization': `Bearer ${token}`, 'Content-Type': 'application/json' },
// //         body: JSON.stringify({ reason })
// //       });
      
// //       const data = await response.json();
      
// //       if (data.success) {
// //         setPendingTasks(prev => prev.filter(t => t.task_id !== taskId));
// //         console.log('Task declined successfully');
// //       } else {
// //         console.log('Failed to decline task: ' + data.message);
// //       }
// //     } catch (error) {
// //       console.error('Error declining task:', error);
// //       console.log('Failed to decline task');
// //     } finally {
// //       setActionLoading(false);
// //       setIsDeclineModalOpen(false);
// //       setSelectedTaskId(null);
// //     }
// //   };

// //   const handleUploadEvidence = async (taskId: number, file: File, notes: string) => {
// //     try {
// //       setActionLoading(true);
// //       const token = getToken();
      
// //       const formData = new FormData();
// //       formData.append('proofs', file);
      
// //       const uploadResponse = await fetch(`http://localhost:5000/api/tasks/${taskId}/upload-proofs`, {
// //         method: 'POST',
// //         headers: { 'Authorization': `Bearer ${token}` },
// //         body: formData
// //       });
      
// //       const uploadData = await uploadResponse.json();
      
// //       if (!uploadData.success) {
// //         console.log('Failed to upload proof: ' + uploadData.message);
// //         return;
// //       }
      
// //       const noteResponse = await fetch(`http://localhost:5000/api/tasks/${taskId}/completion-notes`, {
// //         method: 'POST',
// //         headers: { 'Authorization': `Bearer ${token}`, 'Content-Type': 'application/json' },
// //         body: JSON.stringify({ note_text: notes, volunteer_id: user.user_id })
// //       });
      
// //       const noteData = await noteResponse.json();
      
// //       if (!noteData.success) {
// //         console.log('Failed to save completion note: ' + noteData.message);
// //         return;
// //       }
      
// //       // Refresh evidence after upload
// //       fetchTaskEvidence(taskId);
// //       console.log('Evidence uploaded successfully!');
      
// //     } catch (error) {
// //       console.error('Error uploading evidence:', error);
// //       console.log('Failed to upload evidence');
// //     } finally {
// //       setActionLoading(false);
// //     }
// //   };

// //   const handleViewTaskDetails = async (task: VolunteerTask) => {
// //     setSelectedTask(task);
    
// //     try {
// //       const fullDetails = await fetchFullTaskDetails(task.task_id);
      
// //       if (fullDetails) {
// //         setSelectedTask(fullDetails.task);
// //         setTaskEvidence(prev => ({ ...prev, [task.task_id]: fullDetails.evidence || [] }));
// //         setTaskAdminNotes(prev => ({ ...prev, [task.task_id]: fullDetails.admin_notes || [] }));
// //       } else {
// //         await Promise.all([
// //           fetchTaskEvidence(task.task_id),
// //           fetchTaskAdminNotes(task.report_id, task.task_id)
// //         ]);
// //       }
// //     } catch (error) {
// //       console.error('Error in handleViewTaskDetails:', error);
// //       await Promise.all([
// //         fetchTaskEvidence(task.task_id),
// //         fetchTaskAdminNotes(task.report_id, task.task_id)
// //       ]);
// //     }
    
// //     setIsTaskModalOpen(true);
// //   };

// //   const displayedActiveMissions = showAllActive ? activeMissions : activeMissions.slice(0, 3);
// //   const displayedPendingTasks = showAllPending ? pendingTasks : pendingTasks.slice(0, 3);

// //   useEffect(() => {
// //     const style = document.createElement('style');
// //     style.textContent = `
// //       @keyframes pulse {
// //         0% { opacity: 1; transform: scale(1); }
// //         50% { opacity: 0.7; transform: scale(1.1); }
// //         100% { opacity: 1; transform: scale(1); }
// //       }
// //       .fa-spin {
// //         animation: fa-spin 2s infinite linear;
// //       }
// //       @keyframes fa-spin {
// //         0% { transform: rotate(0deg); }
// //         100% { transform: rotate(360deg); }
// //       }
// //     `;
// //     document.head.appendChild(style);
// //     return () => {
// //       document.head.removeChild(style);
// //     };
// //   }, []);

// //   return (
// //     <div className="dashboard-wrapper animate-fade-in">
// //       <div className="volunteer-dashboard-new" style={{ maxWidth: '1200px', margin: '0 auto' }}>
        
// //         {/* Header Section */}
// //         <div className="reports-header" style={{ marginBottom: '2rem' }}>
// //           <div className="reports-header-content">
// //             <h1 className="reports-title">Welcome back, Ranger {user.username}!</h1>
// //             <p className="reports-subtitle">Your dedication saves lives. Ready for your next mission?</p>
// //             {userProfile?.email && (
// //               <div style={{ marginTop: '0.5rem', display: 'flex', alignItems: 'center', gap: '8px' }}>
// //                 <Icon type="fa6" name="FaEnvelope" size={18} className="text-primary" />
// //                 <span style={{ color: '#2D5A27', fontWeight: '500' }}>{userProfile.email}</span>
// //               </div>
// //             )}
// //             {userProfile?.phone && (
// //               <div style={{ marginTop: '0.5rem', display: 'flex', alignItems: 'center', gap: '8px' }}>
// //                 <Icon type="fa6" name="FaPhone" size={18} className="text-primary" />
// //                 <span style={{ color: '#2D5A27', fontWeight: '500' }}>Contact: {userProfile.phone}</span>
// //               </div>
// //             )}
// //           </div>
// //           <div className="reports-header-actions">
// //             <Link to="/tasks" className="reports-btn refresh">
// //               <Icon type="fa6" name="FaClipboardList" size={14} className="text-primary" />
// //               <span style={{ marginLeft: '4px' }}>Mission Board</span>
// //             </Link>
// //             <Link to="/profile" className="reports-btn refresh">
// //               <Icon type="fa6" name="FaUserCircle" size={14} className="text-primary" />
// //               <span style={{ marginLeft: '4px' }}>My Profile</span>
// //             </Link>
// //           </div>
// //         </div>

// //         {/* Stats Cards */}
// //         <div className="reports-filters-card" style={{ marginBottom: '2rem', padding: '1.5rem' }}>
// //           <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '1.5rem' }}>
// //             <div style={{ background: 'linear-gradient(135deg, #2D5A27 0%, #1e3f1a 100%)', borderRadius: '12px', padding: '1.25rem', color: 'white' }}>
// //               <div style={{ fontSize: '0.85rem', opacity: '0.9', marginBottom: '0.5rem' }}>
// //                 <Icon type="fa6" name="FaHeart" size={14} className="text-white" />
// //                 <span style={{ marginLeft: '4px' }}>TOTAL RESCUES</span>
// //               </div>
// //               <div style={{ fontSize: '2.5rem', fontWeight: '700', lineHeight: '1' }}>{completedTasksCount}</div>
// //               <div style={{ fontSize: '0.8rem', opacity: '0.8', marginTop: '0.5rem' }}>Lives Saved ✓</div>
// //             </div>

// //             <div style={{ background: 'linear-gradient(135deg, #1976D2 0%, #0D47A1 100%)', borderRadius: '12px', padding: '1.25rem', color: 'white' }}>
// //               <div style={{ fontSize: '0.85rem', opacity: '0.9', marginBottom: '0.5rem' }}>
// //                 <Icon type="fa6" name="FaBullseye" size={14} className="text-white" />
// //                 <span style={{ marginLeft: '4px' }}>ACTIVE MISSIONS</span>
// //               </div>
// //               <div style={{ fontSize: '2.5rem', fontWeight: '700', lineHeight: '1' }}>{activeMissions.length}</div>
// //               <div style={{ fontSize: '0.8rem', opacity: '0.8', marginTop: '0.5rem' }}>In Progress <Icon type="fa6" name="FaPersonRunning" size={12} className="text-white" /></div>
// //             </div>

// //             <div style={{ background: 'linear-gradient(135deg, #FF9F1C 0%, #E65100 100%)', borderRadius: '12px', padding: '1.25rem', color: 'white' }}>
// //               <div style={{ fontSize: '0.85rem', opacity: '0.9', marginBottom: '0.5rem' }}>
// //                 <Icon type="fa6" name="FaClock" size={14} className="text-white" />
// //                 <span style={{ marginLeft: '4px' }}>PENDING</span>
// //               </div>
// //               <div style={{ fontSize: '2.5rem', fontWeight: '700', lineHeight: '1' }}>{pendingTasks.length}</div>
// //               <div style={{ fontSize: '0.8rem', opacity: '0.8', marginTop: '0.5rem' }}>Awaiting Decision <Icon type="fa6" name="FaHourglassHalf" size={12} className="text-white" /></div>
// //             </div>

// //             <div style={{ background: 'linear-gradient(135deg, #7D8C5A 0%, #5A6B3E 100%)', borderRadius: '12px', padding: '1.25rem', color: 'white' }}>
// //               <div style={{ fontSize: '0.85rem', opacity: '0.9', marginBottom: '0.5rem' }}>
// //                 <Icon type="fa6" name="FaChartLine" size={14} className="text-white" />
// //                 <span style={{ marginLeft: '4px' }}>SUCCESS RATE</span>
// //               </div>
// //               <div style={{ fontSize: '2.5rem', fontWeight: '700', lineHeight: '1' }}>
// //                 {completedTasksCount + activeMissions.length > 0 
// //                   ? Math.round((completedTasksCount / (completedTasksCount + activeMissions.length)) * 100) 
// //                   : 0}%
// //               </div>
// //               <div style={{ fontSize: '0.8rem', opacity: '0.8', marginTop: '0.5rem' }}>Mission Success</div>
// //             </div>
// //           </div>
// //         </div>

// //         {/* PENDING TASKS SECTION */}
// //         {pendingTasks.length > 0 && (
// //           <div className="reports-section" style={{ marginBottom: '2.5rem' }}>
// //             <div className="reports-header">
// //               <h2 className="reports-title" style={{ fontSize: '1.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
// //                 <Icon type="fa6" name="FaClock" size={20} className="text-warning" />
// //                 <span>Pending Confirmation ({pendingTasks.length})</span>
// //               </h2>
// //               {pendingTasks.length > 3 && (
// //                 <button onClick={() => setShowAllPending(!showAllPending)} className="view-all-link">
// //                   {showAllPending ? 'Show Less ↑' : `View All (${pendingTasks.length}) →`}
// //                 </button>
// //               )}
// //             </div>
            
// //             <div className="reports-grid" style={{ gridTemplateColumns: 'repeat(3, 1fr)' }}>
// //               {displayedPendingTasks.map((task) => {
// //                 const statusBadge = getTaskStatusBadge(task.task_status_id);
// //                 const displayMission = taskDetails[task.task_id] || task;
                
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
// //                         <Icon type="fa6" name="FaRegCalendar" size={12} className="text-white-80" />
// //                         <span style={{ marginLeft: '4px' }}>{formatShortDate(displayMission.submitted_at)}</span>
// //                       </div>
// //                     </div>

// //                     <div className="reports-card-body">
// //                       <div className="reports-animal-section">
// //                         <div className="reports-animal-icon large">{getAnimalEmoji(task.animal_type)}</div>
// //                         <div className="reports-animal-info">
// //                           <h4>{task.animal_type}</h4>
// //                           <span className="reports-condition">{task.animal_condition}</span>
// //                         </div>
// //                       </div>

// //                       <div className="reports-location-section">
// //                         <Icon type="fa6" name="FaLocationDot" size={14} className="location-icon text-primary" />
// //                         <span className="location-text">{task.location_address}</span>
// //                       </div>

// //                       <div className="reports-volunteer-section">
// //                         <div className="reports-assigned-ranger" style={{ background: '#fef2e8' }}>
// //                           <div className="ranger-avatar" style={{ background: '#E65100' }}>
// //                             {task.reporter_name?.charAt(0).toUpperCase() || '?'}
// //                           </div>
// //                           <div className="ranger-info">
// //                             <span className="ranger-name">{task.reporter_name || 'Anonymous'}</span>
// //                             <span className="ranger-role">
// //                               <Icon type="fa6" name="FaUser" size={10} className="text-primary" /> Reporter
// //                             </span>
// //                             {hasEmail(task.reporter_email) && (
// //                               <span className="ranger-phone" style={{ fontSize: '0.75rem', color: '#E65100' }}>
// //                                 <Icon type="fa6" name="FaEnvelope" size={10} className="text-warning" />
// //                                 <span style={{ marginLeft: '2px' }}>{task.reporter_email}</span>
// //                               </span>
// //                             )}
// //                             {hasPhone(task.reporter_phone) && (
// //                               <span className="ranger-phone" style={{ fontSize: '0.75rem', color: '#E65100' }}>
// //                                 <Icon type="fa6" name="FaPhone" size={10} className="text-warning" />
// //                                 <span style={{ marginLeft: '2px' }}>{formatPhoneNumber(task.reporter_phone)}</span>
// //                               </span>
// //                             )}
// //                           </div>
// //                         </div>
// //                       </div>
                      
// //                       <p className="reports-description" style={{ fontSize: '0.85rem', marginBottom: '0.5rem', color: '#666' }}>
// //                         {task.description?.length > 80 
// //                           ? `${task.description.substring(0, 80)}...` 
// //                           : task.description || 'No description provided'}
// //                       </p>
// //                     </div>

// //                     <div className="reports-card-footer">
// //                       <div style={{ display: 'flex', gap: '0.75rem' }}>
// //                         <button onClick={() => handleAcceptTask(task.task_id!)}
// //                                 disabled={actionLoading}
// //                                 className="reports-btn"
// //                                 style={{ flex: 2, background: '#2e7d32', color: 'white', padding: '0.6rem', fontSize: '0.85rem', fontWeight: '600', border: 'none', borderRadius: '4px', cursor: actionLoading ? 'not-allowed' : 'pointer' }}>
// //                           <Icon type="fa6" name="FaCheck" size={12} className="text-white" />
// //                           <span style={{ marginLeft: '4px' }}>{actionLoading ? '...' : 'Accept'}</span>
// //                         </button>
// //                         <button onClick={() => { setSelectedTaskId(task.task_id!); setIsDeclineModalOpen(true); }}
// //                                 disabled={actionLoading}
// //                                 className="reports-btn"
// //                                 style={{ flex: 1, background: 'transparent', color: '#c62828', border: '1px solid #c62828', padding: '0.6rem', fontSize: '0.85rem', fontWeight: '600', borderRadius: '4px', cursor: actionLoading ? 'not-allowed' : 'pointer' }}>
// //                           <Icon type="fa6" name="FaXmark" size={12} className="text-danger" />
// //                           <span style={{ marginLeft: '4px' }}>Decline</span>
// //                         </button>
// //                       </div>
// //                     </div>
// //                   </div>
// //                 );
// //               })}
// //             </div>
// //           </div>
// //         )}

// //         {/* ACTIVE MISSIONS SECTION */}
// //         <div className="reports-section">
// //           <div className="reports-header">
// //             <h2 className="reports-title" style={{ fontSize: '1.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
// //               <Icon type="fa6" name="FaBroadcastTower" size={20} className="text-primary" />
// //               <span>Your Active Missions ({activeMissions.length})</span>
// //             </h2>
// //             {activeMissions.length > 3 && (
// //               <button onClick={() => setShowAllActive(!showAllActive)} className="view-all-link">
// //                 {showAllActive ? 'Show Less ↑' : `View All (${activeMissions.length}) →`}
// //               </button>
// //             )}
// //           </div>
          
// //           {missionsLoading ? (
// //             <div className="reports-loading-container">
// //               <div className="reports-loader">
// //                 <div className="reports-spinner"></div>
// //                 <p className="reports-loader-text">
// //                   <Icon type="fa6" name="FaSpinner" size={14} className="fa-spin text-primary" />
// //                   <span style={{ marginLeft: '8px' }}>Loading your missions...</span>
// //                 </p>
// //               </div>
// //             </div>
// //           ) : fetchError ? (
// //             <div className="reports-empty-state">
// //               <Icon type="fa6" name="FaTriangleExclamation" size={48} className="text-danger" />
// //               <h3>Error Loading Missions</h3>
// //               <p>{fetchError}</p>
// //               <button onClick={() => window.location.reload()} className="reports-btn primary">
// //                 <Icon type="fa6" name="FaRotateRight" size={12} className="text-white" />
// //                 <span style={{ marginLeft: '4px' }}>Retry</span>
// //               </button>
// //             </div>
// //           ) : activeMissions.length > 0 ? (
// //             <>
// //               <div className="reports-grid" style={{ gridTemplateColumns: 'repeat(3, 1fr)' }}>
// //                 {displayedActiveMissions.map((mission) => {
// //                   const statusBadge = getTaskStatusBadge(mission.task_status_id);
// //                   const hasEvidence = taskEvidence[mission.task_id]?.length > 0;
// //                   const displayMission = taskDetails[mission.task_id] || mission;
                  
// //                   return (
// //                     <div key={mission.task_id} className="reports-card">
// //                       <div className="reports-card-header" style={{ background: '#1e3f1a' }}>
// //                         <div className="reports-card-title">
// //                           <span className="reports-id" style={{ background: 'rgba(255,255,255,0.2)', color: 'white' }}>
// //                             #{mission.report_id}
// //                           </span>
// //                           <span className="reports-status" style={{ background: 'rgba(255,255,255,0.2)', color: 'white' }}>
// //                             {statusBadge.text}
// //                           </span>
// //                         </div>
// //                         <div className="reports-date" style={{ color: 'rgba(255,255,255,0.9)' }}>
// //                           <Icon type="fa6" name="FaRegCalendar" size={12} className="text-white-80" />
// //                           <span style={{ marginLeft: '4px' }}>{formatShortDate(displayMission.submitted_at)}</span>
// //                         </div>
// //                         <div className="reports-volunteer-tag" style={{ color: 'white', fontSize: '0.8rem', fontWeight: '600', marginTop: '5px' }}>
// //                           <Icon type="fa6" name="FaUserTie" size={12} className="text-white" />
// //                           <span style={{ marginLeft: '4px' }}>{user.username?.toUpperCase()}</span>
// //                         </div>
// //                       </div>

// //                       <div className="reports-card-body">
// //                         <div className="reports-animal-section">
// //                           <div className="reports-animal-icon large">{getAnimalEmoji(mission.animal_type)}</div>
// //                           <div className="reports-animal-info">
// //                             <h4 style={{ color: '#1e3f1a' }}>{mission.animal_type || 'Animal'} Rescue</h4>
// //                             <span className="reports-condition" style={{ background: '#ffebee', color: '#c62828', fontWeight: 'bold' }}>
// //                               {mission.animal_condition || 'CRITICAL'}
// //                             </span>
// //                           </div>
// //                         </div>

// //                         <div className="reports-location-section">
// //                           <Icon type="fa6" name="FaLocationDot" size={14} className="location-icon text-primary" />
// //                           <span className="location-text">{mission.location_address || 'Location not specified'}</span>
// //                         </div>

// //                         <div className="reports-volunteer-section">
// //                           <div className="reports-assigned-ranger" style={{ background: '#e8f5e9' }}>
// //                             <div className="ranger-avatar" style={{ background: '#2e7d32' }}>
// //                               {mission.reporter_name?.charAt(0).toUpperCase() || '?'}
// //                             </div>
// //                             <div className="ranger-info">
// //                               <span className="ranger-name">{mission.reporter_name || 'Anonymous'}</span>
// //                               <span className="ranger-role">
// //                                 <Icon type="fa6" name="FaUser" size={10} className="text-primary" /> Reporter
// //                               </span>
// //                               {hasEmail(mission.reporter_email) && (
// //                                 <span className="ranger-phone" style={{ fontSize: '0.75rem', color: '#2e7d32' }}>
// //                                   <Icon type="fa6" name="FaEnvelope" size={10} className="text-success" />
// //                                   <span style={{ marginLeft: '2px' }}>{mission.reporter_email}</span>
// //                                 </span>
// //                               )}
// //                               {hasPhone(mission.reporter_phone) && (
// //                                 <span className="ranger-phone" style={{ fontSize: '0.75rem', color: '#2e7d32' }}>
// //                                   <Icon type="fa6" name="FaPhone" size={10} className="text-success" />
// //                                   <span style={{ marginLeft: '2px' }}>{formatPhoneNumber(mission.reporter_phone)}</span>
// //                                 </span>
// //                               )}
// //                             </div>
// //                           </div>
// //                         </div>
                        
// //                         <p className="reports-description" style={{ fontSize: '0.85rem', marginBottom: '0.5rem', color: '#666' }}>
// //                           {mission.description?.length > 100 
// //                             ? `${mission.description.substring(0, 100)}...` 
// //                             : mission.description || 'No description provided'}
// //                         </p>

// //                         {hasEvidence && (
// //                           <div className="evidence-indicator">
// //                             <Icon type="fa6" name="FaCircleCheck" size={14} className="text-success" />
// //                             <span style={{ marginLeft: '4px', color: '#1e3f1a', fontSize: '0.8rem', fontWeight: '600' }}>
// //                               Evidence Uploaded
// //                             </span>
// //                           </div>
// //                         )}

// //                         <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '0.7rem', color: '#888', marginTop: '0.5rem', paddingTop: '0.5rem', borderTop: '1px solid #e8dfc9' }}>
// //                           <span style={{ padding: '2px 8px', borderRadius: '12px', background: '#e3f2fd', color: '#1565c0', fontWeight: 'bold' }}>
// //                             {statusBadge.text}
// //                           </span>
// //                           {mission.assigned_at && (
// //                             <span>
// //                               <Icon type="fa6" name="FaRegCalendar" size={10} className="text-muted" />
// //                               <span style={{ marginLeft: '2px' }}>Assigned: {formatShortDate(mission.assigned_at)}</span>
// //                             </span>
// //                           )}
// //                         </div>
// //                       </div>

// //                       <div className="reports-card-footer">
// //                         <button onClick={() => handleViewTaskDetails(mission)}
// //                                 className="reports-btn"
// //                                 style={{ width: '100%', background: '#2D5A27', color: 'white', padding: '0.6rem', fontSize: '0.85rem', fontWeight: '600', border: 'none', borderRadius: '4px', cursor: 'pointer' }}>
// //                           <Icon type="fa6" name="FaEye" size={12} className="text-white" />
// //                           <span style={{ marginLeft: '4px' }}>View Details</span>
// //                         </button>
// //                       </div>
// //                     </div>
// //                   );
// //                 })}
// //               </div>
// //             </>
// //           ) : (
// //             <div className="reports-empty-state">
// //               <Icon type="fa6" name="FaBullseye" size={48} className="text-muted" />
// //               <h3>No Active Missions</h3>
// //               <p>You don't have any active rescue missions at the moment.</p>
// //               <Link to="/tasks" className="reports-btn primary">
// //                 <Icon type="fa6" name="FaMagnifyingGlass" size={12} className="text-white" />
// //                 <span style={{ marginLeft: '4px' }}>Browse Available Missions</span>
// //               </Link>
// //             </div>
// //           )}
// //         </div>
// //       </div>

// //       {/* Task Detail Modal */}
// //       {selectedTask && (
// //         <TaskDetailModal 
// //           task={selectedTask}
// //           isOpen={isTaskModalOpen}
// //           onClose={() => { setIsTaskModalOpen(false); setSelectedTask(null); }}
// //           onUploadEvidence={handleUploadEvidence}
// //           actionLoading={actionLoading}
// //           userProfile={userProfile}
// //           evidence={taskEvidence[selectedTask.task_id]}
// //           adminNotes={taskAdminNotes[selectedTask.task_id]}
// //         />
// //       )}

// //       {/* Decline Modal */}
// //       {selectedTaskId && (
// //         <DeclineModal
// //           isOpen={isDeclineModalOpen}
// //           onClose={() => { setIsDeclineModalOpen(false); setSelectedTaskId(null); }}
// //           onSubmit={(reason) => handleDeclineTask(selectedTaskId, reason)}
// //           taskId={selectedTaskId}
// //         />
// //       )}
// //     </div>
// //   );
// // };

// // // ===========================================
// // // PENDING VOLUNTEER DASHBOARD
// // // ===========================================
// // const PendingVolunteerDashboard: React.FC<{ user: any }> = ({ user }) => {
// //   return (
// //     <div className="dashboard-wrapper animate-fade-in">
// //       <div className="pending-volunteer">
// //         <Icon type="fa6" name="FaHourglassHalf" size={64} className="text-warning" />
// //         <h2 className="pending-title">Activation Pending</h2>
// //         <p className="pending-text">
// //           Thank you for joining ResQAll. Our HQ is currently reviewing your ranger profile. 
// //           You will be notified via field log once approved.
// //         </p>
// //       </div>
// //     </div>
// //   );
// // };

// // // ===========================================
// // // REJECTED VOLUNTEER DASHBOARD
// // // ===========================================
// // const RejectedVolunteerDashboard: React.FC<{ user: any }> = ({ user }) => {
// //   return (
// //     <div className="dashboard-wrapper animate-fade-in">
// //       <div className="rejected-volunteer">
// //         <Icon type="fa6" name="FaCircleXmark" size={64} className="text-danger" />
// //         <h2 className="rejected-title">Application Status</h2>
// //         <p className="rejected-text">Unfortunately, your ResQAll operative status was not approved.</p>
// //       </div>
// //     </div>
// //   );
// // };

// // // ===========================================
// // // USER DASHBOARD
// // // ===========================================
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
// //         <div className="welcome-section">
// //           <div className="welcome-content">
// //             <h1 className="welcome-title">
// //               <span className="welcome-greeting">Welcome back,</span>
// //               <span className="welcome-name">{user.username || 'Animal Friend'}!</span>
// //             </h1>
// //             <p className="welcome-subtitle">Track your rescue reports and their progress</p>
// //             {(userEmail || userPhone) && (
// //               <div className="contact-info">
// //                 {userEmail && (
// //                   <span className="contact-item">
// //                     <Icon type="fa6" name="FaEnvelope" size={14} className="text-primary" /> {userEmail}
// //                   </span>
// //                 )}
// //                 {userPhone && (
// //                   <span className="contact-item">
// //                     <Icon type="fa6" name="FaPhone" size={14} className="text-primary" /> {userPhone}
// //                   </span>
// //                 )}
// //               </div>
// //             )}
// //           </div>
// //           <Link to="/create-report" className="create-report-btn">
// //             <span className="btn-icon">+</span>
// //             New Report
// //           </Link>
// //         </div>

// //         <div className="stats-grid">
// //           <div className="stat-card">
// //             <div className="stat-icon total">
// //               <Icon type="fa6" name="FaClipboardList" size={28} className="text-primary" />
// //             </div>
// //             <div className="stat-content">
// //               <div className="stat-value">{totalReports}</div>
// //               <div className="stat-label">Total Reports</div>
// //             </div>
// //           </div>
          
// //           <div className="stat-card">
// //             <div className="stat-icon submitted">
// //               <Icon type="fa6" name="FaClock" size={28} className="text-warning" />
// //             </div>
// //             <div className="stat-content">
// //               <div className="stat-value">{submittedReports}</div>
// //               <div className="stat-label">Submitted</div>
// //             </div>
// //           </div>
          
// //           <div className="stat-card">
// //             <div className="stat-icon in-progress">
// //               <Icon type="fa6" name="FaSpinner" size={28} className="fa-spin text-info" />
// //             </div>
// //             <div className="stat-content">
// //               <div className="stat-value">{inProgressReports}</div>
// //               <div className="stat-label">In Progress</div>
// //             </div>
// //           </div>
          
// //           <div className="stat-card">
// //             <div className="stat-icon completed">
// //               <Icon type="fa6" name="FaCircleCheck" size={28} className="text-success" />
// //             </div>
// //             <div className="stat-content">
// //               <div className="stat-value">{completedReports}</div>
// //               <div className="stat-label">Completed</div>
// //             </div>
// //           </div>
// //         </div>

// //         <div className="reports-section">
// //           <div className="section-header">
// //             <h2>
// //               <Icon type="fa6" name="FaFileLines" size={18} className="text-primary" />
// //               <span style={{ marginLeft: '8px' }}>Your Reports</span>
// //             </h2>
// //             {myReports.length > 3 && (
// //               <Link to="/my-reports" className="view-all-link">
// //                 View All ({myReports.length}) <Icon type="fa6" name="FaArrowRight" size={12} className="text-primary" />
// //               </Link>
// //             )}
// //           </div>
          
// //           {reportsLoading ? (
// //             <div className="loading-container">
// //               <div className="spinner"></div>
// //               <p>Loading your reports...</p>
// //             </div>
// //           ) : myReports.length > 0 ? (
// //             <div className="reports-grid user-reports">
// //               {myReports.slice(0, 3).map(report => {
// //                 const statusClass = getStatusClass(report.status_name);
// //                 const statusText = getStatusText(report.status_name);
                
// //                 return (
// //                   <div key={report.report_id} className="report-card user">
// //                     <div className="card-header">
// //                       <div className="header-top">
// //                         <span className="report-id">#{report.report_id}</span>
// //                         <span className={`status-badge ${statusClass}`}>{statusText}</span>
// //                       </div>
// //                     </div>

// //                     <div className="card-body">
// //                       <div className="animal-info-row">
// //                         <div className="animal-emoji-container">
// //                           <span className="animal-emoji-large">{getAnimalEmoji(report.animal_type)}</span>
// //                         </div>
// //                         <div className="animal-details">
// //                           <h3 className="animal-type">{report.animal_type || 'Unknown Animal'}</h3>
// //                           <div className="condition-tag">
// //                             <span className="condition-indicator">●</span>
// //                             {report.animal_condition || 'Condition Unknown'}
// //                           </div>
// //                         </div>
// //                       </div>

// //                       <div className="location-row">
// //                         <Icon type="fa6" name="FaLocationDot" size={14} className="location-icon text-primary" />
// //                         <span className="location-text" title={report.location_address}>
// //                           {report.location_address}
// //                         </span>
// //                       </div>

// //                       <div className="date-row">
// //                         <Icon type="fa6" name="FaRegCalendar" size={14} className="date-icon text-muted" />
// //                         <span className="date-text">{formatShortDate(report.submitted_at)}</span>
// //                       </div>

// //                       <p className="description-preview">
// //                         {report.description?.length > 80 
// //                           ? `${report.description.substring(0, 80)}...` 
// //                           : report.description}
// //                       </p>
// //                     </div>

// //                     <div className="card-footer">
// //                       <button 
// //                         className="view-details-btn"
// //                         onClick={() => onViewDetails(report)}
// //                       >
// //                         View Details
// //                         <span className="btn-arrow">→</span>
// //                       </button>
// //                     </div>
// //                   </div>
// //                 );
// //               })}
// //             </div>
// //           ) : (
// //             <div className="empty-state">
// //               <Icon type="fa6" name="FaFileLines" size={64} className="empty-icon text-muted" />
// //               <h3>No Reports Yet</h3>
// //               <p>Create your first rescue report to get started</p>
// //               <Link to="/create-report" className="create-first-btn">
// //                 <Icon type="fa6" name="FaPlus" size={12} className="text-white" />
// //                 <span style={{ marginLeft: '4px' }}>Create Report</span>
// //               </Link>
// //             </div>
// //           )}
// //         </div>
// //       </div>
// //     </div>
// //   );
// // };

// // // ===========================================
// // // MAIN DASHBOARD COMPONENT
// // // ===========================================
// // export const Dashboard: React.FC = () => {
// //   const [isLoading, setIsLoading] = useState(true);
// //   const [userReports, setUserReports] = useState<Report[]>([]);
// //   const [allReports, setAllReports] = useState<Report[]>([]);
// //   const [reportsLoading, setReportsLoading] = useState(true);
// //   const [userProfile, setUserProfile] = useState<UserProfile | null>(null);
// //   const [selectedReport, setSelectedReport] = useState<Report | null>(null);
// //   const [isModalOpen, setIsModalOpen] = useState(false);
// //   const [reportEvidence, setReportEvidence] = useState<{[key: number]: TaskProof[]}>({});
// //   const [reportNotes, setReportNotes] = useState<{[key: number]: TaskCompletionNote[]}>({});
// //   const [loadingDetails, setLoadingDetails] = useState<{[key: number]: boolean}>({});
  
// //   const navigate = useNavigate();
// //   const { user: currentUser } = useAuth();
  
// //   useEffect(() => {
// //     const fetchUserProfile = async () => {
// //       if (!currentUser) return;
      
// //       try {
// //         const token = getToken();
// //         const response = await fetch('http://localhost:5000/api/users/profile', {
// //           headers: { 'Authorization': `Bearer ${token}`, 'Content-Type': 'application/json' }
// //         });

// //         if (response.ok) {
// //           const data = await response.json();
// //           if (data.success) setUserProfile(data.data);
// //         }
// //       } catch (err) {
// //         console.error('Error fetching user profile:', err);
// //       }
// //     };

// //     fetchUserProfile();
// //   }, [currentUser]);

// //   const fetchAllReports = async () => {
// //     try {
// //       const token = getToken();
// //       const response = await fetch('http://localhost:5000/api/reports/admin/all', {
// //         headers: { 'Authorization': `Bearer ${token}`, 'Content-Type': 'application/json' }
// //       });
      
// //       if (response.ok) {
// //         const data = await response.json();
// //         if (data.success) setAllReports(data.data || []);
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
// //         const token = getToken();
        
// //         const response = await fetch('http://localhost:5000/api/reports/my-reports', {
// //           headers: { 'Authorization': `Bearer ${token}`, 'Content-Type': 'application/json' }
// //         });
        
// //         if (response.ok) {
// //           const data = await response.json();
// //           if (data.success) {
// //             const reportsData = data.data || [];
// //             setUserReports(reportsData);
// //           }
// //         }

// //         if (getUserRole(currentUser) === 'admin') await fetchAllReports();
// //       } catch (error) {
// //         console.error('Error fetching reports:', error);
// //       } finally {
// //         setReportsLoading(false);
// //       }
// //     };
    
// //     if (currentUser) fetchUserReports();
// //   }, [currentUser, userProfile]);
  
// //   useEffect(() => {
// //     if (currentUser) setIsLoading(false);
// //     else {
// //       const timer = setTimeout(() => setIsLoading(false), 1000);
// //       return () => clearTimeout(timer);
// //     }
// //   }, [currentUser]);
  
// //   const getUserRole = (user: any): string => {
// //     if (!user) return 'user';
    
// //     if (user.role && typeof user.role === 'object' && user.role.role_name) return user.role.role_name.toLowerCase();
// //     if (user.role_name) return user.role_name.toLowerCase();
// //     if (user.role_id) {
// //       if (user.role_id === 3) return 'admin';
// //       if (user.role_id === 2) return 'volunteer';
// //       if (user.role_id === 1) return 'user';
// //     }
// //     return 'user';
// //   };
  
// //   const getVolunteerStatus = (user: any): string | null => {
// //     if (!user) return null;

// //     if (user.approval_status_id !== undefined) {
// //       if (user.approval_status_id === 1) return 'pending';
// //       if (user.approval_status_id === 2) return 'approved';
// //       if (user.approval_status_id === 3) return 'rejected';
// //     }

// //     if (user.volunteer) {
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

// //   const fetchReportEvidence = async (reportId: number, taskId?: number) => {
// //     if (!taskId) return;
    
// //     try {
// //       setLoadingDetails(prev => ({ ...prev, [reportId]: true }));
// //       const token = getToken();
      
// //       const evidenceRes = await fetch(`http://localhost:5000/api/tasks/${taskId}/evidence`, {
// //         headers: { 'Authorization': `Bearer ${token}` }
// //       });
// //       const evidenceData = await evidenceRes.json();
// //       if (evidenceData.success) {
// //         setReportEvidence(prev => ({ ...prev, [reportId]: evidenceData.data || [] }));
// //       }

// //       const notesRes = await fetch(`http://localhost:5000/api/tasks/${taskId}/completion-notes`, {
// //         headers: { 'Authorization': `Bearer ${token}` }
// //       });
// //       const notesData = await notesRes.json();
// //       if (notesData.success) {
// //         setReportNotes(prev => ({ ...prev, [reportId]: notesData.data || [] }));
// //       }
// //     } catch (error) {
// //       console.error('Error fetching report details:', error);
// //     } finally {
// //       setLoadingDetails(prev => ({ ...prev, [reportId]: false }));
// //     }
// //   };

// //   const handleViewDetails = (report: Report) => {
// //     setSelectedReport(report);
// //     console.log('Viewing report details:', report);
// //     if (report.task_id) {
// //       fetchReportEvidence(report.report_id, report.task_id);
// //     }
// //     setIsModalOpen(true);
// //   };

// //   useEffect(() => {
// //     if (!isLoading && !currentUser) navigate('/login');
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
// //           <Icon type="fa6" name="FaLock" size={48} className="text-danger" />
// //           <h2>Access Denied</h2>
// //           <p>Please log in to view the dashboard.</p>
// //           <Link to="/login" className="login-link">
// //             <Icon type="fa6" name="FaRightToBracket" size={14} className="text-white" />
// //             <span style={{ marginLeft: '8px' }}>Go to Login</span>
// //           </Link>
// //         </div>
// //       </div>
// //     );
// //   }

// //   const userRole = getUserRole(currentUser);
// //   const volunteerStatus = getVolunteerStatus(currentUser);

// //   const getStats = () => {
// //     const totalReports = userReports.length;
// //     const completedRescues = userReports.filter(r => r.status_name?.toLowerCase() === 'completed').length;
// //     const activeVolunteers = 1;
// //     const pendingApprovals = 0;
    
// //     const userId = currentUser.user_id?.toString() || '';
    
// //     const myReports = userReports.filter(r => {
// //       const reportUserId = Number(r.user_id);
// //       const currentUserId = Number(userId);
// //       return reportUserId === currentUserId;
// //     });
    
// //     const myCompletedTasks = userReports.filter(r => r.status_name?.toLowerCase() === 'completed').length;

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
// //       return <AdminDashboard stats={stats} reports={allReports} reportsLoading={reportsLoading} />;
// //     }
    
// //     if (userRole === 'volunteer') {
// //       if (volunteerStatus === 'rejected') {
// //         return <RejectedVolunteerDashboard user={currentUser} />;
// //       }
      
// //       if (volunteerStatus === 'pending' || volunteerStatus === 'none' || !volunteerStatus) {
// //         return <PendingVolunteerDashboard user={currentUser} />;
// //       }
      
// //       if (volunteerStatus === 'approved') {
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
      
// //       {/* Enhanced Detail Modal */}
// //       <ReportDetailModal 
// //         report={selectedReport}
// //         isOpen={isModalOpen}
// //         onClose={() => {
// //           setIsModalOpen(false);
// //           setSelectedReport(null);
// //         }}
// //         userPhone={userProfile?.phone}
// //         userEmail={userProfile?.email}
// //         userName={userProfile?.username}
// //         evidence={selectedReport ? reportEvidence[selectedReport.report_id] : []}
// //         notes={selectedReport ? reportNotes[selectedReport.report_id] : []}
// //         loading={selectedReport ? loadingDetails[selectedReport.report_id] : false}
// //       />
// //     </div>
// //   );
// // };

// // export default Dashboard;

// import React, { useState, useEffect, useCallback, useRef } from 'react';
// import { useNavigate, Link } from 'react-router-dom';
// import {
//   BarChart, Bar, XAxis, YAxis, Tooltip,
//   ResponsiveContainer, Cell
// } from 'recharts';
// import { useAuth } from '../../context/AuthContext';
// import { Heatmap } from '../../components/Dashboard/HeatMap';
// import './Dashboard.css';

// // ── Icon imports ──────────────────────────────────────────────────────────────
// import * as MdIcons  from 'react-icons/md';
// import * as FaIcons  from 'react-icons/fa';
// import * as Fa6Icons from 'react-icons/fa6';
// import * as IoIcons  from 'react-icons/io5';
// import * as AiIcons  from 'react-icons/ai';
// import * as BiIcons  from 'react-icons/bi';
// import * as FiIcons  from 'react-icons/fi';
// import * as GiIcons  from 'react-icons/gi';
// import * as HiIcons  from 'react-icons/hi2';
// import * as RiIcons  from 'react-icons/ri';
// import * as TbIcons  from 'react-icons/tb';
// import * as CiIcons  from 'react-icons/ci';
// import * as SiIcons  from 'react-icons/si';

// type IconProps = { type: string; name: string; size?: number; color?: string; className?: string };
// const getIconSet = (type: string) => {
//   switch (type) {
//     case 'material':  return MdIcons;
//     case 'fa':        return FaIcons;
//     case 'fa6':       return Fa6Icons;
//     case 'ion':       return IoIcons;
//     case 'ant':       return AiIcons;
//     case 'bootstrap': return BiIcons;
//     case 'feather':   return FiIcons;
//     case 'game':      return GiIcons;
//     case 'hero':      return HiIcons;
//     case 'remix':     return RiIcons;
//     case 'tabler':    return TbIcons;
//     case 'circum':    return CiIcons;
//     case 'simple':    return SiIcons;
//     default:          return FaIcons;
//   }
// };
// const Icon: React.FC<IconProps> = ({ type, name, size = 20, color = 'inherit', className }) => {
//   const icons = getIconSet(type);
//   const Comp  = (icons as Record<string, React.ComponentType<any>>)[name];
//   if (!Comp) return null;
//   return <Comp size={size} color={color} className={className} />;
// };

// // ── Interfaces ────────────────────────────────────────────────────────────────
// interface Report {
//   report_id: number; user_id: number; description: string;
//   location_address: string; user_note: string; submitted_at: string;
//   animal_type: string; animal_condition: string; status_id: number;
//   status_name: string; is_deleted?: number;
//   reporter_name?: string | null; reporter_phone?: string | null; reporter_email?: string | null;
//   volunteer_name?: string | null; volunteer_id?: number;
//   volunteer_phone?: string | null; volunteer_email?: string | null;
//   task_id?: number; task_status_id?: number; task_status?: string;
//   assigned_at?: string; started_at?: string; completed_at?: string;
//   volunteer_responded_at?: string; volunteer_response?: string;
//   declined_reason?: string; admin_note?: string;
// }
// interface AdminNote { note_id: number; report_id: number; admin_id: number; note_text: string; created_at: string; admin_name?: string; }
// interface TaskProof { proof_id: number; task_id: number; proof_url: string; uploaded_at: string; }
// interface TaskCompletionNote { note_id: number; task_id: number; volunteer_id: number; volunteer_name?: string; note_text: string; created_at: string; }
// interface VolunteerTask {
//   task_id: number; report_id: number; assigned_to_user_id: number; assigned_by_user_id: number;
//   task_status_id: number; task_status: string; assigned_at: string;
//   volunteer_responded_at?: string; volunteer_response?: string; declined_reason?: string;
//   started_at?: string; completed_at?: string; is_deleted?: number;
//   user_id: number; description: string; location_address: string; user_note: string;
//   submitted_at: string; animal_type: string; animal_condition: string;
//   report_status_id: number; report_status: string;
//   reporter_name: string | null; reporter_phone: string | null; reporter_email: string | null;
//   volunteer_name: string; volunteer_email: string | null; volunteer_phone: string | null;
// }
// interface UserProfile { user_id: number; username: string; email: string; phone: string; bio: string; profile_image_url: string; role_id: number; created_at: string; }
// interface FullTaskDetails { task: VolunteerTask; evidence: TaskProof[]; admin_notes: AdminNote[]; completion_notes: TaskCompletionNote[]; }

// // ── Helpers ───────────────────────────────────────────────────────────────────
// const getToken = (): string | null =>
//   localStorage.getItem('token') || sessionStorage.getItem('token');

// const getStoredUser = (): any => {
//   const s = localStorage.getItem('resqall_user') || sessionStorage.getItem('resqall_user');
//   if (s) { try { return JSON.parse(s); } catch { return null; } }
//   return null;
// };

// const hasPhone = (phone?: string | null): boolean =>
//   typeof phone === 'string' && phone.trim().length > 0;

// const hasEmail = (email?: string | null): boolean => {
//   if (typeof email !== 'string') return false;
//   const t = email.trim();
//   return t.length > 0 && t.includes('@') && t.includes('.');
// };

// const formatPhoneNumber = (phone?: string | null): string => {
//   if (!hasPhone(phone)) return 'Not provided';
//   const cleaned = String(phone).trim().replace(/\D/g, '');
//   return cleaned.length === 10 ? `+977 ${cleaned}` : String(phone).trim();
// };

// const getFullImageUrl = (proofUrl: string): string => {
//   if (!proofUrl) return '';
//   if (proofUrl.startsWith('http://') || proofUrl.startsWith('https://')) return proofUrl;
//   const baseUrl = 'http://localhost:5000';
//   const cleanUrl = proofUrl.replace(/^\/+/, '');
//   return cleanUrl.startsWith('uploads/') ? `${baseUrl}/${cleanUrl}` : `${baseUrl}/uploads/${cleanUrl}`;
// };

// // Animal emojis kept
// const getAnimalEmoji = (animalType: string): string => {
//   const type = animalType?.toLowerCase() || '';
//   if (type.includes('dog'))                            return '🐶';
//   if (type.includes('cat'))                            return '🐱';
//   if (type.includes('bird'))                           return '🐦';
//   if (type.includes('rabbit') || type.includes('bunny')) return '🐰';
//   if (type.includes('hamster'))                        return '🐹';
//   if (type.includes('turtle') || type.includes('tortoise')) return '🐢';
//   if (type.includes('horse'))                          return '🐴';
//   if (type.includes('cow'))                            return '🐮';
//   if (type.includes('goat'))                           return '🐐';
//   if (type.includes('sheep'))                          return '🐑';
//   if (type.includes('fish'))                           return '🐠';
//   if (type.includes('snake'))                          return '🐍';
//   if (type.includes('mouse') || type.includes('rat'))  return '🐭';
//   if (type.includes('monkey'))                         return '🐒';
//   if (type.includes('pig'))                            return '🐷';
//   if (type.includes('chicken'))                        return '🐔';
//   if (type.includes('duck'))                           return '🦆';
//   return '🐾';
// };

// // Smart card title
// const getCardTitle = (animalType: string, animalCondition: string): string => {
//   const type = (animalType || '').trim();
//   const cond = (animalCondition || '').trim();
//   if (!type) return 'Animal in need';
//   const adj = ['injured','stray','sick','lost','abandoned','wounded','starving','malnourished','critical','trapped','orphaned'];
//   if (cond && adj.some(a => cond.toLowerCase().includes(a)))
//     return `${cond.charAt(0).toUpperCase() + cond.slice(1).toLowerCase()} ${type}`;
//   return `${type} in need`;
// };

// const getStatusBadgeBg = (id?: number) => {
//   switch (id) {
//     case 1: return { bg: '#1e3f1a', color: '#c8e6b0' };
//     case 2: return { bg: '#1a3a5e', color: '#b0d4f1' };
//     case 3: return { bg: '#3d1a5e', color: '#e0c8f5' };
//     case 4: return { bg: '#4a4a4a', color: '#e0e0e0' };
//     default:return { bg: '#4a4a4a', color: '#e0e0e0' };
//   }
// };

// const getStatusDisplay = (statusName?: string): string => {
//   if (!statusName) return 'Unknown';
//   return statusName.replace(/_/g, ' ').replace(/\b\w/g, c => c.toUpperCase());
// };
// const getStatusClass = (statusName?: string): string => {
//   const n = statusName?.toLowerCase() || '';
//   if (n.includes('submitted')) return 'submitted';
//   if (n.includes('review'))    return 'review';
//   if (n.includes('progress'))  return 'progress';
//   if (n.includes('completed')) return 'completed';
//   if (n.includes('cancelled') || n.includes('declined')) return 'cancelled';
//   return 'unknown';
// };
// const getStatusText = (statusName: string): string => {
//   if (!statusName) return 'Unknown';
//   return statusName.replace(/_/g, ' ').split(' ').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ');
// };
// const getTaskStatusBadge = (statusId?: number): { text: string; class: string } => {
//   switch (statusId) {
//     case 1: return { text: 'ASSIGNED',    class: 'assigned' };
//     case 2: return { text: 'IN PROGRESS', class: 'progress' };
//     case 3: return { text: 'COMPLETED',   class: 'completed' };
//     case 4: return { text: 'DECLINED',    class: 'declined' };
//     default:return { text: 'UNKNOWN',     class: 'unknown' };
//   }
// };

// const formatDate = (dateString?: string): string => {
//   if (!dateString) return 'Not available';
//   try {
//     return new Date(dateString).toLocaleDateString('en-US', { month:'short', day:'numeric', year:'numeric', hour:'2-digit', minute:'2-digit' });
//   } catch { return 'Invalid date'; }
// };
// const formatShortDate = (dateString: string): string => {
//   if (!dateString) return 'Not available';
//   try {
//     return new Date(dateString).toLocaleDateString('en-US', { month:'short', day:'numeric', year:'numeric' });
//   } catch { return 'Not available'; }
// };
// const formatRelativeTime = (dateString: string): string => {
//   if (!dateString) return 'Not available';
//   try {
//     const diff  = Date.now() - new Date(dateString).getTime();
//     const mins  = Math.floor(diff / 60000);
//     const hours = Math.floor(mins / 60);
//     const days  = Math.floor(hours / 24);
//     if (mins < 1)   return 'Just now';
//     if (mins < 60)  return `${mins} minute${mins === 1 ? '' : 's'} ago`;
//     if (hours < 24) return `${hours} hour${hours === 1 ? '' : 's'} ago`;
//     if (days === 1) return 'Yesterday';
//     if (days < 7)   return `${days} days ago`;
//     return formatShortDate(dateString);
//   } catch { return 'Not available'; }
// };

// // ── Calculate distance ────────────────────────────────────────────────────────
// const calculateDistance = (la1:number,ln1:number,la2:number,ln2:number): number => {
//   const R=6371, dLa=(la2-la1)*Math.PI/180, dLn=(ln2-ln1)*Math.PI/180;
//   const a=Math.sin(dLa/2)**2+Math.cos(la1*Math.PI/180)*Math.cos(la2*Math.PI/180)*Math.sin(dLn/2)**2;
//   return R*2*Math.atan2(Math.sqrt(a),Math.sqrt(1-a));
// };

// // ── Location Tracker ──────────────────────────────────────────────────────────
// const LocationTracker: React.FC<{ taskId: number; isActive: boolean }> = ({ taskId, isActive }) => {
//   const [watchId,    setWatchId]    = useState<number|null>(null);
//   const [lastLoc,    setLastLoc]    = useState<GeolocationPosition|null>(null);
//   const [isTracking, setIsTracking] = useState(false);
//   const [error,      setError]      = useState<string|null>(null);
//   const [pending,    setPending]    = useState(0);
//   const queue = useRef<any[]>([]);

//   const save = useCallback(async (lat:number,lng:number,acc:number) => {
//     const token = getToken(); if (!token) return;
//     try {
//       const res  = await fetch('http://localhost:5000/api/volunteer/tracking/point',{ method:'POST',headers:{'Authorization':`Bearer ${token}`,'Content-Type':'application/json'},body:JSON.stringify({taskId,latitude:lat,longitude:lng,accuracy:acc}) });
//       const data = await res.json();
//       if (!data.success){ queue.current.push({lat,lng,acc}); setPending(queue.current.length); }
//     } catch { queue.current.push({lat,lng,acc}); setPending(queue.current.length); }
//   },[taskId]);

//   const retry = useCallback(async () => {
//     if (!queue.current.length) return;
//     const token = getToken(); if (!token) return;
//     const pts=[...queue.current]; queue.current=[]; setPending(0);
//     for (const p of pts) {
//       try { await fetch('http://localhost:5000/api/volunteer/tracking/point',{method:'POST',headers:{'Authorization':`Bearer ${token}`,'Content-Type':'application/json'},body:JSON.stringify({taskId,latitude:p.lat,longitude:p.lng,accuracy:p.acc})}); }
//       catch { queue.current.push(p); setPending(queue.current.length); }
//     }
//   },[taskId]);

//   const start = useCallback(() => {
//     if (!navigator.geolocation){ setError('Geolocation not supported'); return; }
//     setError(null);
//     navigator.geolocation.getCurrentPosition(pos=>{setLastLoc(pos);save(pos.coords.latitude,pos.coords.longitude,pos.coords.accuracy||0);},()=>{},{enableHighAccuracy:false,timeout:10000,maximumAge:60000});
//     const id=navigator.geolocation.watchPosition(
//       pos=>{
//         let doSave=true;
//         if(lastLoc){ const d=calculateDistance(lastLoc.coords.latitude,lastLoc.coords.longitude,pos.coords.latitude,pos.coords.longitude); doSave=d>0.05||(pos.timestamp-lastLoc.timestamp)/1000>30; }
//         if(doSave) save(pos.coords.latitude,pos.coords.longitude,pos.coords.accuracy||0);
//         setLastLoc(pos);
//       },
//       err=>{ const m:Record<number,string>={1:'Permission denied',2:'Unavailable',3:'Timed out'}; setError(m[err.code]||'Unknown'); },
//       {enableHighAccuracy:true,timeout:30000,maximumAge:0}
//     );
//     setWatchId(id); setIsTracking(true);
//   },[lastLoc,save]);

//   const stop = useCallback(()=>{ if(watchId!==null){ navigator.geolocation.clearWatch(watchId); setWatchId(null); setIsTracking(false); } },[watchId]);

//   useEffect(()=>{
//     if(isActive){ const t=setTimeout(()=>start(),1000); return()=>{ clearTimeout(t); stop(); }; }
//     else stop();
//   },[isActive,start,stop]);

//   useEffect(()=>{ window.addEventListener('online',retry); return()=>window.removeEventListener('online',retry); },[retry]);
//   useEffect(()=>{ const t=setInterval(()=>{ if(navigator.onLine&&queue.current.length)retry(); },30000); return()=>clearInterval(t); },[retry]);

//   if (!isActive) return null;
//   const dotBg = error ? '#f44336' : isTracking ? '#4caf50' : '#ff9800';
//   return (
//     <div style={{ position:'fixed',bottom:20,right:20,background:error?'#ffebee':'#e8f5e9',padding:'8px 12px',borderRadius:20,fontSize:'0.8rem',boxShadow:'0 2px 5px rgba(0,0,0,0.2)',zIndex:9999,display:'flex',alignItems:'center',gap:6 }}>
//       <span style={{ width:8,height:8,borderRadius:'50%',background:dotBg,animation:isTracking&&!error?'pulse 2s infinite':'none' }}/>
//       <span>{error?'Location Error':(isTracking?'Sharing Location':'Starting...')}</span>
//       {pending>0&&<span style={{ background:'#fff3e0',padding:'2px 6px',borderRadius:12,fontSize:'0.7rem' }}>{pending} pending</span>}
//     </div>
//   );
// };

// // ── Decline Modal ─────────────────────────────────────────────────────────────
// const DeclineModal: React.FC<{ isOpen:boolean; onClose:()=>void; onSubmit:(r:string)=>void; taskId:number }> = ({ isOpen,onClose,onSubmit,taskId }) => {
//   const [reason,setReason]=useState('');
//   const [other,setOther]=useState('');
//   const [submitting,setSubmitting]=useState(false);
//   if (!isOpen) return null;
//   const submit=async()=>{
//     const f=reason==='other'?other:reason;
//     if(f){ setSubmitting(true); try{ await onSubmit(f); }finally{ setSubmitting(false); setReason(''); setOther(''); onClose(); } }
//   };
//   return (
//     <div className="modal-overlay" onClick={onClose}>
//       <div className="modal-content" onClick={e=>e.stopPropagation()}>
//         <div className="modal-header">
//           <div className="modal-header-left">
//             <span className="modal-icon"><Icon type="material" name="MdCancel" size={26} color="#c62828"/></span>
//             <div><h3 className="modal-title">Decline Task #{taskId}</h3><p className="modal-subtitle">Please provide a reason for declining</p></div>
//           </div>
//           <button className="modal-close" onClick={onClose}>×</button>
//         </div>
//         <div className="modal-body">
//           <div className="decline-info"><p>Your reason helps us improve our volunteer matching system.</p></div>
//           <div className="form-group">
//             <label className="form-label">Reason <span className="required">*</span></label>
//             <select className="form-select" value={reason} onChange={e=>setReason(e.target.value)}>
//               <option value="">Select a reason</option>
//               <option value="Too far away">Too far away</option>
//               <option value="Already have active tasks">Already have active tasks</option>
//               <option value="Animal type not suitable">Animal type not suitable</option>
//               <option value="Condition too severe">Condition too severe</option>
//               <option value="Equipment not available">Equipment not available</option>
//               <option value="other">Other (please specify)</option>
//             </select>
//           </div>
//           {reason==='other'&&(
//             <div className="form-group">
//               <label className="form-label">Please specify <span className="required">*</span></label>
//               <textarea className="form-textarea" value={other} onChange={e=>setOther(e.target.value)} placeholder="Enter your reason..." rows={3}/>
//             </div>
//           )}
//         </div>
//         <div className="modal-footer">
//           <button className="modal-btn secondary" onClick={onClose}>Cancel</button>
//           <button className="modal-btn danger" onClick={submit} disabled={!reason||(reason==='other'&&!other)||submitting}>
//             {submitting?'Processing...':'Decline Task'}
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// };

// // ── Upload Evidence Modal ─────────────────────────────────────────────────────
// const UploadEvidenceModal: React.FC<{ isOpen:boolean; onClose:()=>void; onSubmit:(f:File,n:string)=>void; taskId:number }> = ({ isOpen,onClose,onSubmit,taskId }) => {
//   const [proofFile,setProofFile]=useState<File|null>(null);
//   const [notes,setNotes]=useState('');
//   const [previewUrl,setPreviewUrl]=useState<string|null>(null);
//   const [uploading,setUploading]=useState(false);
//   const [uploadError,setUploadError]=useState<string|null>(null);
//   if (!isOpen) return null;

//   const validateFile=(f:File)=>{
//     if(f.size>5*1024*1024){ setUploadError('File is too large. Maximum size is 5MB'); return false; }
//     if(!['image/jpeg','image/png','image/jpg','image/gif'].includes(f.type)){ setUploadError('Invalid file type. Allowed: JPG, PNG, GIF'); return false; }
//     return true;
//   };
//   const handleFileChange=(e:React.ChangeEvent<HTMLInputElement>)=>{
//     if(e.target.files?.[0]){ setUploadError(null); const f=e.target.files[0]; if(validateFile(f)){ if(previewUrl)URL.revokeObjectURL(previewUrl); setProofFile(f); setPreviewUrl(URL.createObjectURL(f)); } }
//   };
//   const removeFile=()=>{ if(previewUrl)URL.revokeObjectURL(previewUrl); setProofFile(null); setPreviewUrl(null); setUploadError(null); };
//   const handleSubmit=async()=>{
//     if(!proofFile){ setUploadError('Please select a photo'); return; }
//     if(!notes.trim()){ setUploadError('Please enter completion notes'); return; }
//     setUploading(true);
//     try{ await onSubmit(proofFile,notes); setProofFile(null); setNotes(''); setPreviewUrl(null); onClose(); }
//     finally{ setUploading(false); }
//   };
//   return (
//     <div className="modal-overlay" onClick={onClose}>
//       <div className="modal-content" onClick={e=>e.stopPropagation()}>
//         <div className="modal-header" style={{ background:'linear-gradient(135deg,#2D5A27,#1e3f1a)' }}>
//           <div className="modal-header-left">
//             <span className="modal-icon" style={{ background:'rgba(255,255,255,0.15)',color:'white' }}><Icon type="material" name="MdCameraAlt" size={24} color="white"/></span>
//             <div>
//               <h3 className="modal-title" style={{ color:'white' }}>Upload Evidence — Task #{taskId}</h3>
//               <p className="modal-subtitle">Add photos and notes to complete the mission</p>
//             </div>
//           </div>
//           <button className="modal-close" onClick={onClose}>×</button>
//         </div>
//         <div className="modal-body">
//           {uploadError&&<div className="error-message">{uploadError}</div>}
//           <div className="form-group">
//             <label className="form-label">Proof Photo <span className="required">*</span></label>
//             {previewUrl ? (
//               <div style={{ position:'relative',display:'inline-block',width:'100%' }}>
//                 <img src={previewUrl} alt="Preview" style={{ width:'100%',maxHeight:200,objectFit:'contain',borderRadius:4 }}/>
//                 <button onClick={removeFile} style={{ position:'absolute',top:5,right:5,background:'#c62828',color:'white',border:'none',borderRadius:'50%',width:25,height:25,cursor:'pointer',display:'flex',alignItems:'center',justifyContent:'center',fontSize:16,fontWeight:'bold' }}>×</button>
//               </div>
//             ) : (
//               <label style={{ cursor:'pointer',background:'#2D5A27',color:'white',padding:'8px 16px',borderRadius:4,fontSize:'0.9rem',fontWeight:600,display:'inline-flex',alignItems:'center',gap:6 }}>
//                 <Icon type="material" name="MdUpload" size={16} color="white"/> Choose Photo
//                 <input type="file" accept="image/jpeg,image/png,image/jpg,image/gif" onChange={handleFileChange} style={{ display:'none' }}/>
//               </label>
//             )}
//           </div>
//           <div className="form-group" style={{ marginTop:15 }}>
//             <label className="form-label">Completion Notes <span className="required">*</span></label>
//             <textarea value={notes} onChange={e=>setNotes(e.target.value)} placeholder="Describe the rescue outcome, any challenges, and the animal's condition..." rows={4} maxLength={500} style={{ width:'100%',padding:10,border:'2px solid #2D5A27',borderRadius:8,fontFamily:'inherit',resize:'vertical' }}/>
//             <p style={{ fontSize:'0.75rem',color:'#666',marginTop:5,textAlign:'right' }}>{notes.length}/500 characters</p>
//           </div>
//         </div>
//         <div className="modal-footer">
//           <button className="modal-btn secondary" onClick={onClose}>Cancel</button>
//           <button className="modal-btn primary" onClick={handleSubmit} disabled={!proofFile||!notes.trim()||uploading}>
//             {uploading?'Uploading...':'Submit Evidence'}
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// };

// // ── Task Detail Modal ─────────────────────────────────────────────────────────
// const TaskDetailModal: React.FC<{
//   task: VolunteerTask|null; isOpen: boolean; onClose: ()=>void;
//   onUploadEvidence: (taskId:number,file:File,notes:string)=>void;
//   actionLoading: boolean; userProfile: UserProfile|null;
//   evidence?: TaskProof[]; adminNotes?: AdminNote[];
// }> = ({ task,isOpen,onClose,onUploadEvidence,actionLoading,userProfile,evidence=[],adminNotes=[] }) => {
//   const [selectedImage,  setSelectedImage]  = useState<string|null>(null);
//   const [showUploadForm, setShowUploadForm] = useState(false);
//   const [tracking,       setTracking]       = useState(false);

//   useEffect(()=>{ setTracking(task?.task_status_id===2); },[task?.task_status_id]);
//   if (!isOpen||!task) return null;
//   const hasProofs = evidence.length>0;

//   const imgUrl=(proofUrl:string)=>{
//     if(proofUrl.startsWith('http')) return proofUrl;
//     const clean=proofUrl.startsWith('/')?proofUrl.substring(1):proofUrl;
//     return `http://localhost:5000/${clean}`;
//   };

//   return (
//     <>
//       {task.task_status_id===2&&<LocationTracker taskId={task.task_id} isActive={tracking}/>}
//       <div className="reports-modal-overlay" onClick={onClose}>
//         <div className="reports-modal-content large" onClick={e=>e.stopPropagation()}>
//           <div className="reports-modal-header dark" style={{ background:'#1e3f1a' }}>
//             <div>
//               <h3>Rescue Report #{task.report_id}</h3>
//               <div className="reports-modal-subheader">
//                 <span className="reports-status-badge" style={{ background:'rgba(255,255,255,0.2)',color:'white',padding:'0.25rem 0.75rem',borderRadius:20,fontSize:'0.75rem',fontWeight:600,textTransform:'uppercase' }}>
//                   {getTaskStatusBadge(task.task_status_id).text}
//                 </span>
//                 <span className="reports-meta" style={{ color:'rgba(255,255,255,0.8)' }}>
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
//                   <div className="reports-card-header beige">
//                     <h4 style={{ display:'flex',alignItems:'center',gap:6 }}><Icon type="game" name="GiPawPrint" size={16} color="#1e3f1a"/> Animal Information</h4>
//                   </div>
//                   <div className="reports-card-content">
//                     <div className="reports-animal-display">
//                       <div className="reports-animal-icon">{getAnimalEmoji(task.animal_type)}</div>
//                       <div className="reports-animal-details">
//                         <div className="reports-animal-type">{task.animal_type}</div>
//                         <div className="reports-animal-condition"><span className="condition-tag">{task.animal_condition}</span></div>
//                       </div>
//                     </div>
//                   </div>
//                 </div>

//                 <div className="reports-info-card">
//                   <div className="reports-card-header beige">
//                     <h4 style={{ display:'flex',alignItems:'center',gap:6 }}><Icon type="material" name="MdPerson" size={16} color="#1e3f1a"/> Reporter Details</h4>
//                   </div>
//                   <div className="reports-card-content">
//                     <div className="reports-detail-list">
//                       <div className="reports-detail-row"><span className="reports-detail-label">Name</span><span className="reports-detail-value">{task.reporter_name||'Anonymous'}</span></div>
//                       {hasEmail(task.reporter_email)&&(
//                         <div className="reports-detail-row">
//                           <span className="reports-detail-label">Email</span>
//                           <span className="reports-detail-value" style={{ display:'flex',alignItems:'center',gap:4 }}><Icon type="material" name="MdEmail" size={13} color="#1e3f1a"/>{task.reporter_email}</span>
//                         </div>
//                       )}
//                       {hasPhone(task.reporter_phone)&&(
//                         <div className="reports-detail-row">
//                           <span className="reports-detail-label">Phone</span>
//                           <span className="reports-detail-value" style={{ display:'flex',alignItems:'center',gap:4 }}><Icon type="material" name="MdPhone" size={13} color="#1e3f1a"/>{formatPhoneNumber(task.reporter_phone)}</span>
//                         </div>
//                       )}
//                     </div>
//                   </div>
//                 </div>

//                 <div className="reports-info-card">
//                   <div className="reports-card-header beige">
//                     <h4 style={{ display:'flex',alignItems:'center',gap:6 }}><Icon type="material" name="MdLocationOn" size={16} color="#1e3f1a"/> Location</h4>
//                   </div>
//                   <div className="reports-card-content">
//                     <div className="reports-location-info">
//                       <p>{task.location_address}</p>
//                       <button className="reports-btn map" onClick={()=>window.open(`https://maps.google.com/?q=${encodeURIComponent(task.location_address)}`,'_blank')}>
//                         <Icon type="material" name="MdMap" size={14} color="#2D5A27"/> View on Map
//                       </button>
//                     </div>
//                   </div>
//                 </div>

//                 <div className="reports-info-card">
//                   <div className="reports-card-header beige">
//                     <h4 style={{ display:'flex',alignItems:'center',gap:6 }}><Icon type="material" name="MdAccessTime" size={16} color="#1e3f1a"/> Timeline</h4>
//                   </div>
//                   <div className="reports-card-content">
//                     <div className="reports-detail-list">
//                       <div className="reports-detail-row"><span className="reports-detail-label">Reported</span><span className="reports-detail-value">{formatDate(task.submitted_at)}</span></div>
//                       {task.assigned_at&&<div className="reports-detail-row"><span className="reports-detail-label">Assigned</span><span className="reports-detail-value">{formatDate(task.assigned_at)}</span></div>}
//                       {task.started_at&&<div className="reports-detail-row"><span className="reports-detail-label">Started</span><span className="reports-detail-value">{formatDate(task.started_at)}</span></div>}
//                     </div>
//                   </div>
//                 </div>
//               </div>

//               <div className="reports-detail-column">
//                 <div className="reports-info-card">
//                   <div className="reports-card-header beige">
//                     <h4 style={{ display:'flex',alignItems:'center',gap:6 }}><Icon type="material" name="MdDescription" size={16} color="#1e3f1a"/> Mission Description</h4>
//                   </div>
//                   <div className="reports-card-content">
//                     <div className="reports-description"><p>{task.description}</p></div>
//                     {task.user_note&&(
//                       <div className="reports-user-note">
//                         <div className="note-label">Reporter's Note:</div>
//                         <p>{task.user_note}</p>
//                       </div>
//                     )}
//                   </div>
//                 </div>

//                 <div className="reports-info-card">
//                   <div className="reports-card-header beige">
//                     <div className="evidence-card-header">
//                       <h4><Icon type="material" name="MdCameraAlt" size={16} color="#1e3f1a"/> Evidence Photos</h4>
//                       {task.task_status_id===2&&!hasProofs&&!showUploadForm&&(
//                         <button className="evidence-upload-btn" onClick={()=>setShowUploadForm(true)}>
//                           <Icon type="material" name="MdUpload" size={13} color="white"/> Upload Evidence
//                         </button>
//                       )}
//                     </div>
//                   </div>
//                   <div className="reports-card-content">
//                     {evidence.length>0 ? (
//                       <div>
//                         <p style={{ marginBottom:10,color:'#2D5A27',fontWeight:600 }}>{evidence.length} photo(s) uploaded</p>
//                         <div style={{ display:'grid',gridTemplateColumns:'repeat(2,1fr)',gap:15 }}>
//                           {evidence.map(proof=>(
//                             <div key={proof.proof_id} style={{ border:'1px solid #e8dfc9',borderRadius:8,padding:8,background:'#f9f5ec',cursor:'pointer' }} onClick={()=>setSelectedImage(imgUrl(proof.proof_url))}>
//                               <img src={imgUrl(proof.proof_url)} alt={`Evidence ${proof.proof_id}`} style={{ width:'100%',height:120,objectFit:'cover',borderRadius:4 }} onError={e=>{(e.currentTarget as HTMLImageElement).style.display='none';}}/>
//                               <p style={{ fontSize:'0.7rem',textAlign:'center',marginTop:5,color:'#666' }}>Uploaded: {formatShortDate(proof.uploaded_at)}</p>
//                             </div>
//                           ))}
//                         </div>
//                       </div>
//                     ) : (
//                       <div style={{ padding:20,textAlign:'center',background:'#f9f5ec',borderRadius:8,color:'#666' }}>
//                         <Icon type="material" name="MdCameraAlt" size={32} color="#999"/>
//                         <p style={{ marginTop:8 }}>No evidence uploaded yet.</p>
//                       </div>
//                     )}
//                   </div>
//                 </div>

//                 {adminNotes.length>0&&(
//                   <div className="reports-info-card">
//                     <div className="reports-card-header beige">
//                       <h4 style={{ display:'flex',alignItems:'center',gap:6 }}><Icon type="material" name="MdPushPin" size={16} color="#1e3f1a"/> Admin Notes</h4>
//                     </div>
//                     <div className="reports-card-content">
//                       {adminNotes.map(note=>(
//                         <div key={note.note_id} style={{ background:'#f9f5ec',padding:12,borderRadius:8,marginBottom:10,borderLeft:'3px solid #2D5A27' }}>
//                           <div style={{ display:'flex',justifyContent:'space-between' }}>
//                             <span style={{ fontWeight:'bold',color:'#2D5A27' }}>{note.admin_name||'Admin'}</span>
//                             <span style={{ fontSize:'0.75rem',color:'#666' }}>{formatRelativeTime(note.created_at)}</span>
//                           </div>
//                           <p style={{ margin:0,marginTop:6 }}>{note.note_text}</p>
//                         </div>
//                       ))}
//                     </div>
//                   </div>
//                 )}
//               </div>
//             </div>

//             {selectedImage&&(
//               <div className="image-lightbox" onClick={()=>setSelectedImage(null)}>
//                 <img src={selectedImage} alt="Enlarged evidence" style={{ maxWidth:'90%',maxHeight:'90%',objectFit:'contain' }}/>
//                 <button onClick={()=>setSelectedImage(null)} style={{ position:'absolute',top:20,right:20,background:'white',border:'none',borderRadius:'50%',width:40,height:40,fontSize:20,cursor:'pointer' }}>×</button>
//               </div>
//             )}
//           </div>

//           <div className="reports-modal-footer">
//             <button className="reports-btn secondary" onClick={onClose}>Close</button>
//           </div>
//         </div>
//       </div>

//       {showUploadForm&&(
//         <UploadEvidenceModal
//           isOpen={showUploadForm}
//           onClose={()=>setShowUploadForm(false)}
//           onSubmit={(file,notes)=>{ onUploadEvidence(task.task_id,file,notes); setShowUploadForm(false); }}
//           taskId={task.task_id}
//         />
//       )}
//     </>
//   );
// };

// // ── Report Detail Modal ───────────────────────────────────────────────────────
// const ReportDetailModal: React.FC<{
//   report: Report|null; isOpen: boolean; onClose: ()=>void;
//   userPhone?: string; userEmail?: string; userName?: string;
//   evidence?: TaskProof[]; notes?: TaskCompletionNote[]; loading?: boolean;
// }> = ({ report,isOpen,onClose,userPhone,userEmail,userName,evidence=[],notes=[],loading=false }) => {
//   const [selectedImage,setSelectedImage]=useState<string|null>(null);
//   const [activeTab,setActiveTab]=useState<'details'|'evidence'|'notes'>('details');
//   const [imageErrors,setImageErrors]=useState<Record<number,boolean>>({});

//   if (!isOpen||!report) return null;

//   const reporterName = report.reporter_name||userName||'Anonymous';
//   const phoneNumber  = report.reporter_phone||userPhone;
//   const emailAddress = report.reporter_email||userEmail;
//   const volunteerName = report.volunteer_name;
//   const isCompleted   = report.status_id===4;
//   const hasEvidence   = evidence.length>0;
//   const hasNotes      = notes.length>0;

//   return (
//     <div className="modal-overlay" onClick={onClose}>
//       <div className="modal-content report-detail-modal horizontal-modal" onClick={e=>e.stopPropagation()}>
//         <div className="modal-header compact-header">
//           <div className="modal-header-left">
//             <span className="modal-animal-emoji small">{getAnimalEmoji(report.animal_type)}</span>
//             <div>
//               <h3 className="modal-title small">Report #{report.report_id}</h3>
//               <p className="modal-subtitle small">{report.animal_type} • {report.animal_condition}</p>
//             </div>
//           </div>
//           <div className="header-actions">
//             <span className={`status-badge-small status-${getStatusClass(report.status_name)}`}>{getStatusDisplay(report.status_name)}</span>
//             <button className="modal-close small" onClick={onClose}>×</button>
//           </div>
//         </div>

//         <div className="modal-tabs">
//           <button className={`modal-tab ${activeTab==='details'?'active':''}`} onClick={()=>setActiveTab('details')}>
//             <Icon type="material" name="MdAssignment" size={14}/> Details
//           </button>
//           {isCompleted&&(
//             <>
//               <button className={`modal-tab ${activeTab==='evidence'?'active':''}`} onClick={()=>setActiveTab('evidence')}>
//                 <Icon type="material" name="MdCameraAlt" size={14}/> Evidence {hasEvidence&&`(${evidence.length})`}
//               </button>
//               <button className={`modal-tab ${activeTab==='notes'?'active':''}`} onClick={()=>setActiveTab('notes')}>
//                 <Icon type="material" name="MdDescription" size={14}/> Notes {hasNotes&&`(${notes.length})`}
//               </button>
//             </>
//           )}
//         </div>

//         <div className="modal-body horizontal-body">
//           {activeTab==='details'&&(
//             <div className="details-tab-content">
//               <div className="details-two-column">
//                 <div className="details-column">
//                   <div className="detail-row"><span className="detail-row-label"><Icon type="material" name="MdPerson" size={12}/> Reporter</span><span className="detail-row-value">{reporterName}</span></div>
//                   {hasEmail(emailAddress)&&<div className="detail-row"><span className="detail-row-label"><Icon type="material" name="MdEmail" size={12}/> Email</span><span className="detail-row-value">{emailAddress}</span></div>}
//                   {hasPhone(phoneNumber)&&<div className="detail-row"><span className="detail-row-label"><Icon type="material" name="MdPhone" size={12}/> Phone</span><span className="detail-row-value phone">{formatPhoneNumber(phoneNumber)}</span></div>}
//                   <div className="detail-row"><span className="detail-row-label"><Icon type="material" name="MdTag" size={12}/> User ID</span><span className="detail-row-value">#{report.user_id}</span></div>
//                 </div>
//                 <div className="details-column">
//                   <div className="detail-row"><span className="detail-row-label"><Icon type="game" name="GiPawPrint" size={12}/> Animal</span><span className="detail-row-value">{report.animal_type}</span></div>
//                   <div className="detail-row"><span className="detail-row-label"><Icon type="material" name="MdLocalHospital" size={12}/> Condition</span><span className="detail-row-value">{report.animal_condition}</span></div>
//                   <div className="detail-row"><span className="detail-row-label"><Icon type="material" name="MdLocationOn" size={12}/> Location</span><span className="detail-row-value location">{report.location_address}</span></div>
//                   <div className="detail-row"><span className="detail-row-label"><Icon type="material" name="MdCalendarToday" size={12}/> Submitted</span><span className="detail-row-value">{formatShortDate(report.submitted_at)}</span></div>
//                 </div>
//               </div>
//               <div className="description-horizontal">
//                 <div className="description-horizontal-header"><Icon type="material" name="MdDescription" size={14}/> Description</div>
//                 <p>{report.description}</p>
//               </div>
//               {volunteerName&&(
//                 <div className="volunteer-horizontal">
//                   <span className="volunteer-horizontal-label"><Icon type="material" name="MdPerson" size={13}/> Assigned Ranger:</span>
//                   <span className="volunteer-horizontal-value">{volunteerName}</span>
//                 </div>
//               )}
//             </div>
//           )}

//           {activeTab==='evidence'&&isCompleted&&(
//             <div className="evidence-tab-content">
//               {loading ? <div className="loading-mini">Loading evidence...</div>
//                 : hasEvidence ? (
//                   <div className="evidence-horizontal-grid">
//                     {evidence.map(proof=>{
//                       const url=getFullImageUrl(proof.proof_url);
//                       const err=imageErrors[proof.proof_id];
//                       return (
//                         <div key={proof.proof_id} className="evidence-horizontal-item" onClick={()=>!err&&setSelectedImage(url)}>
//                           {!err ? <img src={url} alt="Evidence" onError={()=>setImageErrors(p=>({...p,[proof.proof_id]:true}))}/> : <div className="evidence-placeholder"><Icon type="material" name="MdBrokenImage" size={32} color="#999"/></div>}
//                           <span className="evidence-horizontal-date">{new Date(proof.uploaded_at).toLocaleDateString()}</span>
//                         </div>
//                       );
//                     })}
//                   </div>
//                 ) : <div className="empty-mini">No evidence photos available</div>
//               }
//             </div>
//           )}

//           {activeTab==='notes'&&isCompleted&&(
//             <div className="notes-tab-content">
//               {loading ? <div className="loading-mini">Loading notes...</div>
//                 : hasNotes ? (
//                   <div className="notes-horizontal-list">
//                     {notes.map(note=>(
//                       <div key={note.note_id} className="note-horizontal-item">
//                         <div className="note-horizontal-header">
//                           <span className="note-horizontal-author">{note.volunteer_name||'Volunteer'}</span>
//                           <span className="note-horizontal-time">{formatDate(note.created_at)}</span>
//                         </div>
//                         <p className="note-horizontal-text">{note.note_text}</p>
//                       </div>
//                     ))}
//                   </div>
//                 ) : <div className="empty-mini">No notes available</div>
//               }
//             </div>
//           )}
//         </div>

//         {selectedImage&&(
//           <div className="lightbox" onClick={()=>setSelectedImage(null)}>
//             <img src={selectedImage} alt="Enlarged evidence"/>
//             <button className="lightbox-close" onClick={()=>setSelectedImage(null)}>×</button>
//           </div>
//         )}

//         <div className="modal-footer compact-footer">
//           <button className="modal-btn secondary small" onClick={onClose}>Close</button>
//           {report.task_id&&<span className="task-id-badge small">Task #{report.task_id}</span>}
//         </div>
//       </div>
//     </div>
//   );
// };

// // ── Admin Dashboard ───────────────────────────────────────────────────────────
// const AdminDashboard: React.FC<{ stats:any; reports:Report[]; reportsLoading:boolean }> = ({ stats,reports,reportsLoading }) => {
//   const [showHeatmap,setShowHeatmap]=useState(false);
//   const [heatmapData,setHeatmapData]=useState<Report[]>([]);

//   const totalReports     = reports.length;
//   const submittedReports = reports.filter(r=>r.status_name?.toLowerCase()==='submitted').length;
//   const assignedReports  = reports.filter(r=>r.status_name?.toLowerCase()==='assigned').length;
//   const inProgressReports= reports.filter(r=>r.status_name?.toLowerCase()==='in_progress').length;
//   const completedReports = reports.filter(r=>r.status_name?.toLowerCase()==='completed').length;
//   const uniqueReporters  = new Set(reports.map(r=>r.user_id)).size;

//   useEffect(()=>{
//     if(reports?.length>0) setHeatmapData(reports.filter(r=>r.location_address&&r.location_address.trim()!==''&&r.location_address!=='No location'));
//   },[reports]);

//   const getMostCommonAnimal=()=>{
//     const counts=reports.reduce((a,r)=>{ if(r.animal_type) a[r.animal_type]=(a[r.animal_type]||0)+1; return a; },{} as Record<string,number>);
//     let max=0,best='N/A';
//     Object.entries(counts).forEach(([k,v])=>{ if(v>max){max=v;best=k;} });
//     return best;
//   };
//   const getHotspotCount=()=>{
//     const lc=heatmapData.reduce((a,r)=>{ a[r.location_address]=(a[r.location_address]||0)+1; return a; },{} as Record<string,number>);
//     return Object.values(lc).filter(c=>c>=3).length;
//   };

//   const chartData=[{ name:'Reports',value:totalReports },{ name:'Rescued',value:completedReports },{ name:'Volunteers',value:5 }];
//   const COLORS=['#A67C52','#2D5A27','#7D8C5A'];

//   return (
//     <div className="dashboard-wrapper animate-fade-in">
//       <div className="admin-dashboard">
//         <div className="admin-header-section">
//           <h1 className="admin-header-title">ResQAll Command Center</h1>
//           <p className="admin-header-subtitle">Welcome back, Commander</p>
//         </div>

//         <div className="admin-stats-grid">
//           {[
//             { icon:'MdAssignment',    label:'Total Reports',  value:totalReports },
//             { icon:'MdHourglassEmpty',label:'Active Cases',   value:submittedReports+assignedReports+inProgressReports },
//             { icon:'MdCheckCircle',   label:'Completed',      value:completedReports },
//             { icon:'MdGroup',         label:'Reporters',      value:uniqueReporters },
//           ].map(s=>(
//             <div key={s.label} className="stat-card">
//               <div className="stat-icon"><Icon type="material" name={s.icon} size={28} color="#2D5A27"/></div>
//               <div className="stat-content">
//                 <div className="stat-value">{reportsLoading?'...':s.value}</div>
//                 <div className="stat-label">{s.label}</div>
//               </div>
//             </div>
//           ))}
//         </div>

//         <div className="heatmap-section">
//           <div style={{ display:'flex',justifyContent:'space-between',alignItems:'center',marginBottom:'1rem' }}>
//             <div style={{ display:'flex',alignItems:'center',gap:10 }}>
//               <Icon type="material" name="MdMap" size={22} color="#2D5A27"/>
//               <h3 style={{ margin:0,fontSize:'1.2rem',fontWeight:600,color:'#2D5A27' }}>Incident Heatmap</h3>
//               <span style={{ fontSize:'0.85rem',color:'#888',fontWeight:400 }}>Most Reported Areas</span>
//             </div>
//             <button onClick={()=>setShowHeatmap(!showHeatmap)} className="reports-btn" style={{ background:showHeatmap?'#c62828':'#2D5A27',color:'white',border:'none',padding:'8px 20px',borderRadius:8,display:'flex',alignItems:'center',gap:6 }}>
//               <Icon type="material" name={showHeatmap?'MdVisibilityOff':'MdVisibility'} size={16} color="white"/>
//               {showHeatmap?'Hide Map':'Show Heatmap'}
//             </button>
//           </div>
//           {showHeatmap&&(
//             <div className="heatmap-container">
//               {heatmapData.length>0 ? (
//                 <>
//                   <Heatmap reports={heatmapData} height="500px"/>
//                   <div className="heatmap-stats-grid">
//                     <div className="heatmap-stat-card"><div className="heatmap-stat-label">Total Locations</div><div className="heatmap-stat-value">{heatmapData.length}</div></div>
//                     <div className="heatmap-stat-card"><div className="heatmap-stat-label">Unique Areas</div><div className="heatmap-stat-value">{new Set(heatmapData.map(r=>r.location_address)).size}</div></div>
//                     <div className="heatmap-stat-card"><div className="heatmap-stat-label">Most Common Animal</div><div className="heatmap-stat-value">{getMostCommonAnimal()}</div></div>
//                     <div className="heatmap-stat-card"><div className="heatmap-stat-label">Hotspots (3+ reports)</div><div className="heatmap-stat-value highlight">{getHotspotCount()}</div></div>
//                   </div>
//                   <div style={{ marginTop:'1.5rem' }}>
//                     <h4 style={{ marginBottom:'1rem',color:'#333' }}>Top Hotspot Areas</h4>
//                     <div className="hotspot-tags">
//                       {Object.entries(heatmapData.reduce((a,r)=>{ a[r.location_address]=(a[r.location_address]||0)+1; return a; },{} as Record<string,number>)).sort((a,b)=>b[1]-a[1]).slice(0,8).map(([loc,cnt])=>(
//                         <div key={loc} className={`hotspot-tag ${cnt>=5?'high':cnt>=3?'medium':'low'}`}>{loc.length>25?loc.substring(0,25)+'...':loc} ({cnt})</div>
//                       ))}
//                     </div>
//                   </div>
//                 </>
//               ) : (
//                 <div style={{ height:300,display:'flex',alignItems:'center',justifyContent:'center',background:'#f5f5f5',borderRadius:8,flexDirection:'column',gap:'1rem' }}>
//                   <Icon type="material" name="MdMap" size={48} color="#bbb"/>
//                   <p style={{ color:'#666' }}>No location data available for heatmap</p>
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
//                 <div className="chart-loading"><div className="spinner"/><p>Loading chart data...</p></div>
//               ) : (
//                 <ResponsiveContainer width="100%" height={300}>
//                   <BarChart data={chartData}>
//                     <XAxis dataKey="name" axisLine={false} tickLine={false}/>
//                     <YAxis axisLine={false} tickLine={false}/>
//                     <Tooltip cursor={{ fill:'#F5F1E8' }} formatter={(v)=>[v,'Count']}/>
//                     <Bar dataKey="value" radius={[10,10,0,0]} barSize={60}>
//                       {chartData.map((e,i)=><Cell key={`c-${i}`} fill={COLORS[i%COLORS.length]}/>)}
//                     </Bar>
//                   </BarChart>
//                 </ResponsiveContainer>
//               )}
//             </div>
//           </div>
//           <div className="volunteer-alert-box">
//             <div className="volunteer-alert-icon"><Icon type="material" name="MdBolt" size={36} color="#e65100"/></div>
//             <h3 className="volunteer-alert-title">Quick Navigation</h3>
//             <p className="volunteer-alert-text">Manage your volunteer force or review all mission reports.</p>
//             <Link to="/admin/users"           className="volunteer-alert-btn" style={{ marginBottom:10,background:'#2D5A27' }}><Icon type="material" name="MdGroup" size={16} color="white"/> Manage Volunteers</Link>
//             <Link to="/admin/rescue-reports"  className="volunteer-alert-btn" style={{ background:'#1976D2' }}><Icon type="material" name="MdAssignment" size={16} color="white"/> View All Reports</Link>
//           </div>
//         </div>

//         <div className="recent-reports-section">
//           <div className="section-header">
//             <h3>Recent Reports ({reports.length})</h3>
//             <Link to="/admin/rescue-reports" className="view-all-link">View All Reports →</Link>
//           </div>
//           <div className="reports-table-container">
//             {reportsLoading ? (
//               <div className="loading-message"><div className="loading-spinner-small"/><p>Loading reports...</p></div>
//             ) : reports.length>0 ? (
//               <table className="reports-table">
//                 <thead><tr><th>ID</th><th>Animal</th><th>Condition</th><th>Location</th><th>Reporter</th><th>Volunteer</th><th>Date</th><th>Status</th></tr></thead>
//                 <tbody>
//                   {reports.slice(0,10).map(r=>(
//                     <tr key={r.report_id}>
//                       <td>#{r.report_id}</td>
//                       <td><div className="animal-cell"><span className="animal-emoji">{getAnimalEmoji(r.animal_type)}</span><span className="animal-name">{r.animal_type||'Unknown'}</span></div></td>
//                       <td>{r.animal_condition||'Unknown'}</td>
//                       <td className="location-cell">{r.location_address||'No location'}</td>
//                       <td>{r.reporter_name||'Anonymous'}</td>
//                       <td>{r.volunteer_name ? <span className="volunteer-name">{r.volunteer_name}</span> : <span className="not-assigned">Not assigned</span>}</td>
//                       <td className="report-date">{formatShortDate(r.submitted_at)}</td>
//                       <td><span className={`status-badge status-${getStatusClass(r.status_name)}`}>{getStatusText(r.status_name)}</span></td>
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

// // ── Volunteer Dashboard ───────────────────────────────────────────────────────
// const VolunteerDashboard: React.FC<{
//   user: any; stats: any; reports: Report[];
//   reportsLoading: boolean; userProfile: UserProfile|null;
// }> = ({ user,stats,reports,reportsLoading,userProfile }) => {
//   const [activeMissions,    setActiveMissions]    = useState<VolunteerTask[]>([]);
//   const [pendingTasks,      setPendingTasks]      = useState<VolunteerTask[]>([]);
//   const [missionsLoading,   setMissionsLoading]   = useState(true);
//   const [fetchError,        setFetchError]        = useState<string|null>(null);
//   const [actionLoading,     setActionLoading]     = useState(false);
//   const [showAllActive,     setShowAllActive]     = useState(false);
//   const [showAllPending,    setShowAllPending]    = useState(false);
//   const [selectedTask,      setSelectedTask]      = useState<VolunteerTask|null>(null);
//   const [isTaskModalOpen,   setIsTaskModalOpen]   = useState(false);
//   const [isDeclineModalOpen,setIsDeclineModalOpen]= useState(false);
//   const [selectedTaskId,    setSelectedTaskId]    = useState<number|null>(null);
//   const [completedCount,    setCompletedCount]    = useState(0);
//   const [taskEvidence,      setTaskEvidence]      = useState<Record<number,TaskProof[]>>({});
//   const [taskAdminNotes,    setTaskAdminNotes]    = useState<Record<number,AdminNote[]>>({});
//   const [taskDetails,       setTaskDetails]       = useState<Record<number,VolunteerTask>>({});

//   // Eagerly fetch evidence so images show on cards without clicking
//   const fetchAllEvidence = (list: VolunteerTask[]) => {
//     const token = getToken();
//     list.forEach(async m => {
//       try {
//         const res  = await fetch(`http://localhost:5000/api/tasks/${m.task_id}/evidence`,{ headers:{ 'Authorization':`Bearer ${token}` } });
//         const data = await res.json();
//         if (data.success) setTaskEvidence(prev=>({ ...prev, [m.task_id]: data.data }));
//       } catch { /* skip */ }
//     });
//   };

//   useEffect(()=>{
//     if (!user?.user_id) return;
//     const load=async()=>{
//       try {
//         setMissionsLoading(true); setFetchError(null);
//         const token=getToken();
//         if (!token){ setFetchError('No authentication token'); return; }
//         const res=await fetch('http://localhost:5000/api/volunteers/tasks',{ method:'GET',headers:{ 'Authorization':`Bearer ${token}`,'Content-Type':'application/json' } });
//         if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
//         const data=await res.json();
//         if (data.success&&data.data) {
//           const assigned   = data.data.filter((t:VolunteerTask)=>t.task_status_id===1);
//           const inProgress = data.data.filter((t:VolunteerTask)=>t.task_status_id===2);
//           const completed  = data.data.filter((t:VolunteerTask)=>t.task_status_id===3);
//           setPendingTasks(assigned);
//           setActiveMissions(inProgress);
//           setCompletedCount(completed.length);
//           // Eagerly fetch evidence for all active missions so card images appear immediately
//           fetchAllEvidence([...assigned,...inProgress]);
//         } else { setPendingTasks([]); setActiveMissions([]); }
//       } catch(e) {
//         setFetchError(e instanceof Error?e.message:'Unknown error');
//         setPendingTasks([]); setActiveMissions([]);
//       } finally { setMissionsLoading(false); }
//     };
//     load();
//   },[user?.user_id]);

//   const fetchTaskEvidence=async(taskId:number)=>{
//     try{
//       const token=getToken();
//       const res=await fetch(`http://localhost:5000/api/tasks/${taskId}/evidence`,{ headers:{ 'Authorization':`Bearer ${token}` } });
//       const data=await res.json();
//       if(data.success) setTaskEvidence(prev=>({ ...prev,[taskId]:data.data }));
//     }catch(e){ console.error(e); }
//   };
//   const fetchTaskAdminNotes=async(reportId:number,taskId:number)=>{
//     try{
//       const token=getToken();
//       const res=await fetch(`http://localhost:5000/api/reports/${reportId}/admin-notes`,{ headers:{ 'Authorization':`Bearer ${token}` } });
//       const data=await res.json();
//       if(data.success) setTaskAdminNotes(prev=>({ ...prev,[taskId]:data.data }));
//     }catch(e){ console.error(e); }
//   };
//   const fetchFullTaskDetails=async(taskId:number)=>{
//     try{
//       const token=getToken();
//       const res=await fetch(`http://localhost:5000/api/tasks/task/${taskId}/full-details`,{ headers:{ 'Authorization':`Bearer ${token}` } });
//       const data=await res.json();
//       if(data.success){ setTaskDetails(prev=>({ ...prev,[taskId]:data.data.task })); return data.data; }
//     }catch(e){ console.error(e); }
//     return null;
//   };

//   const handleAcceptTask=async(taskId:number)=>{
//     try{
//       setActionLoading(true);
//       const token=getToken();
//       const res=await fetch(`http://localhost:5000/api/volunteers/tasks/${taskId}/accept`,{ method:'PATCH',headers:{ 'Authorization':`Bearer ${token}`,'Content-Type':'application/json' } });
//       const data=await res.json();
//       if(data.success){
//         const accepted=pendingTasks.find(t=>t.task_id===taskId);
//         if(accepted){
//           const updated={ ...accepted,task_status_id:2,task_status:'in_progress',started_at:new Date().toISOString() };
//           setPendingTasks(p=>p.filter(t=>t.task_id!==taskId));
//           setActiveMissions(p=>[...p,updated]);
//         }
//       } else console.log('Failed to accept: '+data.message);
//     }catch(e){ console.error(e); }
//     finally{ setActionLoading(false); }
//   };

//   const handleDeclineTask=async(taskId:number,reason:string)=>{
//     try{
//       setActionLoading(true);
//       const token=getToken();
//       const res=await fetch(`http://localhost:5000/api/volunteers/tasks/${taskId}/decline`,{ method:'PATCH',headers:{ 'Authorization':`Bearer ${token}`,'Content-Type':'application/json' },body:JSON.stringify({ reason }) });
//       const data=await res.json();
//       if(data.success) setPendingTasks(p=>p.filter(t=>t.task_id!==taskId));
//       else console.log('Failed to decline: '+data.message);
//     }catch(e){ console.error(e); }
//     finally{ setActionLoading(false); setIsDeclineModalOpen(false); setSelectedTaskId(null); }
//   };

//   const handleUploadEvidence=async(taskId:number,file:File,notes:string)=>{
//     try{
//       setActionLoading(true);
//       const token=getToken();
//       const fd=new FormData(); fd.append('proofs',file);
//       const up=await(await fetch(`http://localhost:5000/api/tasks/${taskId}/upload-proofs`,{ method:'POST',headers:{ 'Authorization':`Bearer ${token}` },body:fd })).json();
//       if(!up.success){ console.log('Upload failed: '+up.message); return; }
//       const note=await(await fetch(`http://localhost:5000/api/tasks/${taskId}/completion-notes`,{ method:'POST',headers:{ 'Authorization':`Bearer ${token}`,'Content-Type':'application/json' },body:JSON.stringify({ note_text:notes,volunteer_id:user.user_id }) })).json();
//       if(!note.success){ console.log('Note failed: '+note.message); return; }
//       fetchTaskEvidence(taskId);
//     }catch(e){ console.error(e); }
//     finally{ setActionLoading(false); }
//   };

//   const handleViewTaskDetails=async(task:VolunteerTask)=>{
//     setSelectedTask(task);
//     try{
//       const full=await fetchFullTaskDetails(task.task_id);
//       if(full){
//         setSelectedTask(full.task);
//         setTaskEvidence(prev=>({ ...prev,[task.task_id]:full.evidence||[] }));
//         setTaskAdminNotes(prev=>({ ...prev,[task.task_id]:full.admin_notes||[] }));
//       } else {
//         await Promise.all([fetchTaskEvidence(task.task_id),fetchTaskAdminNotes(task.report_id,task.task_id)]);
//       }
//     }catch(e){
//       await Promise.all([fetchTaskEvidence(task.task_id),fetchTaskAdminNotes(task.report_id,task.task_id)]);
//     }
//     setIsTaskModalOpen(true);
//   };

//   const displayedActive  = showAllActive  ? activeMissions : activeMissions.slice(0,3);
//   const displayedPending = showAllPending ? pendingTasks   : pendingTasks.slice(0,3);

//   return (
//     <div className="dashboard-wrapper animate-fade-in">
//       <div className="volunteer-dashboard-new" style={{ maxWidth:1200,margin:'0 auto' }}>

//         {/* Header */}
//         <div className="reports-header" style={{ marginBottom:'2rem' }}>
//           <div className="reports-header-content">
//             <h1 className="reports-title">Welcome back, Ranger {user.username}!</h1>
//             <p className="reports-subtitle">Your dedication saves lives. Ready for your next mission?</p>
//             {userProfile?.email&&(
//               <div style={{ marginTop:'0.5rem',display:'flex',alignItems:'center',gap:8 }}>
//                 <Icon type="material" name="MdEmail" size={16} color="#2D5A27"/>
//                 <span style={{ color:'#2D5A27',fontWeight:500 }}>{userProfile.email}</span>
//               </div>
//             )}
//             {userProfile?.phone&&(
//               <div style={{ marginTop:'0.5rem',display:'flex',alignItems:'center',gap:8 }}>
//                 <Icon type="material" name="MdPhone" size={16} color="#2D5A27"/>
//                 <span style={{ color:'#2D5A27',fontWeight:500 }}>Contact: {userProfile.phone}</span>
//               </div>
//             )}
//           </div>
//           <div className="reports-header-actions">
//             <Link to="/tasks"   className="reports-btn refresh"><Icon type="material" name="MdAssignment" size={16}/> Mission Board</Link>
//             <Link to="/profile" className="reports-btn refresh"><Icon type="material" name="MdEmojiEvents" size={16}/> My Profile</Link>
//           </div>
//         </div>

//         {/* Stats */}
//         <div className="reports-filters-card" style={{ marginBottom:'2rem',padding:'1.5rem' }}>
//           <div style={{ display:'grid',gridTemplateColumns:'repeat(4,1fr)',gap:'1.5rem' }}>
//             {[
//               { bg:'linear-gradient(135deg,#2D5A27,#1e3f1a)', label:'TOTAL RESCUES',   value:completedCount,        sub:'Lives Saved',        icon:'MdFavorite' },
//               { bg:'linear-gradient(135deg,#1976D2,#0D47A1)', label:'ACTIVE MISSIONS', value:activeMissions.length, sub:'In Progress',        icon:'MdMyLocation' },
//               { bg:'linear-gradient(135deg,#FF9F1C,#E65100)', label:'PENDING',          value:pendingTasks.length,   sub:'Awaiting Decision',  icon:'MdHourglassEmpty' },
//               { bg:'linear-gradient(135deg,#7D8C5A,#5A6B3E)', label:'SUCCESS RATE',
//                 value:`${completedCount+activeMissions.length>0?Math.round((completedCount/(completedCount+activeMissions.length))*100):0}%`,
//                 sub:'Mission Success', icon:'MdBarChart' },
//             ].map(s=>(
//               <div key={s.label} style={{ background:s.bg,borderRadius:12,padding:'1.25rem',color:'white' }}>
//                 <div style={{ fontSize:'0.85rem',opacity:0.9,marginBottom:'0.5rem',display:'flex',alignItems:'center',gap:6 }}>
//                   <Icon type="material" name={s.icon} size={14} color="rgba(255,255,255,0.9)"/>{s.label}
//                 </div>
//                 <div style={{ fontSize:'2.5rem',fontWeight:700,lineHeight:1 }}>{s.value}</div>
//                 <div style={{ fontSize:'0.8rem',opacity:0.8,marginTop:'0.5rem' }}>{s.sub}</div>
//               </div>
//             ))}
//           </div>
//         </div>

//         {/* Pending Tasks — old card style with accept/decline */}
//         {pendingTasks.length>0&&(
//           <div className="reports-section" style={{ marginBottom:'2.5rem' }}>
//             <div className="reports-header">
//               <h2 className="reports-title" style={{ fontSize:'1.5rem',display:'flex',alignItems:'center',gap:'0.5rem' }}>
//                 <Icon type="material" name="MdHourglassEmpty" size={22} color="#FF9F1C"/> Pending Confirmation ({pendingTasks.length})
//               </h2>
//               {pendingTasks.length>3&&(
//                 <button onClick={()=>setShowAllPending(!showAllPending)} className="view-all-link">
//                   {showAllPending?'Show Less ↑':`View All (${pendingTasks.length}) →`}
//                 </button>
//               )}
//             </div>
//             <div className="reports-grid" style={{ gridTemplateColumns:'repeat(3,1fr)' }}>
//               {displayedPending.map(task=>{
//                 const badge=getTaskStatusBadge(task.task_status_id);
//                 const displayM=taskDetails[task.task_id]||task;
//                 return (
//                   <div key={task.task_id} className="reports-card">
//                     <div className="reports-card-header" style={{ background:'#FF9F1C' }}>
//                       <div className="reports-card-title">
//                         <span className="reports-id" style={{ background:'rgba(255,255,255,0.2)',color:'white' }}>#{task.report_id}</span>
//                         <span className="reports-status" style={{ background:'rgba(255,255,255,0.2)',color:'white' }}>{badge.text}</span>
//                       </div>
//                       <div className="reports-date" style={{ color:'rgba(255,255,255,0.9)' }}>{formatShortDate(displayM.submitted_at)}</div>
//                     </div>
//                     <div className="reports-card-body">
//                       <div className="reports-animal-section">
//                         <div className="reports-animal-icon large">{getAnimalEmoji(task.animal_type)}</div>
//                         <div className="reports-animal-info"><h4>{task.animal_type}</h4><span className="reports-condition">{task.animal_condition}</span></div>
//                       </div>
//                       <div className="reports-location-section">
//                         <Icon type="material" name="MdLocationOn" size={16} color="#e65100"/>
//                         <span className="location-text">{task.location_address}</span>
//                       </div>
//                       <div className="reports-volunteer-section">
//                         <div className="reports-assigned-ranger" style={{ background:'#fef2e8' }}>
//                           <div className="ranger-avatar" style={{ background:'#E65100' }}>{task.reporter_name?.charAt(0).toUpperCase()||'?'}</div>
//                           <div className="ranger-info">
//                             <span className="ranger-name">{task.reporter_name||'Anonymous'}</span>
//                             <span className="ranger-role">Reporter</span>
//                             {hasEmail(task.reporter_email)&&<span className="ranger-phone" style={{ color:'#E65100',display:'flex',alignItems:'center',gap:3 }}><Icon type="material" name="MdEmail" size={11} color="#E65100"/>{task.reporter_email}</span>}
//                             {hasPhone(task.reporter_phone)&&<span className="ranger-phone" style={{ color:'#E65100',display:'flex',alignItems:'center',gap:3 }}><Icon type="material" name="MdPhone" size={11} color="#E65100"/>{formatPhoneNumber(task.reporter_phone)}</span>}
//                           </div>
//                         </div>
//                       </div>
//                       <p className="reports-description" style={{ fontSize:'0.85rem',marginBottom:'0.5rem',color:'#666' }}>
//                         {task.description?.length>80?`${task.description.substring(0,80)}...`:task.description||'No description provided'}
//                       </p>
//                     </div>
//                     <div className="reports-card-footer">
//                       <div style={{ display:'flex',gap:'0.75rem',width:'100%' }}>
//                         <button onClick={()=>handleAcceptTask(task.task_id!)} disabled={actionLoading} className="reports-btn" style={{ flex:2,background:'#2e7d32',color:'white',padding:'0.6rem',fontSize:'0.85rem',fontWeight:600,border:'none',borderRadius:4,cursor:actionLoading?'not-allowed':'pointer',display:'flex',alignItems:'center',justifyContent:'center',gap:6 }}>
//                           <Icon type="material" name="MdCheck" size={15} color="white"/>{actionLoading?'...':'Accept'}
//                         </button>
//                         <button onClick={()=>{ setSelectedTaskId(task.task_id!); setIsDeclineModalOpen(true); }} disabled={actionLoading} className="reports-btn" style={{ flex:1,background:'transparent',color:'#c62828',border:'1px solid #c62828',padding:'0.6rem',fontSize:'0.85rem',fontWeight:600,borderRadius:4,cursor:actionLoading?'not-allowed':'pointer' }}>
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

//         {/* Active Missions — new photo-card style */}
//         <div className="reports-section">
//           <div className="reports-header">
//             <h2 className="reports-title" style={{ fontSize:'1.5rem',display:'flex',alignItems:'center',gap:'0.5rem' }}>
//               <Icon type="material" name="MdMyLocation" size={22} color="#1e3f1a"/> Your Active Missions ({activeMissions.length})
//             </h2>
//             {activeMissions.length>3&&(
//               <button onClick={()=>setShowAllActive(!showAllActive)} className="view-all-link">
//                 {showAllActive?'Show Less ↑':`View All (${activeMissions.length}) →`}
//               </button>
//             )}
//           </div>

//           {missionsLoading ? (
//             <div className="reports-loading-container">
//               <div className="reports-loader"><div className="reports-spinner"/><p className="reports-loader-text">Loading your missions...</p></div>
//             </div>
//           ) : fetchError ? (
//             <div className="reports-empty-state">
//               <Icon type="material" name="MdError" size={48} color="#c62828"/>
//               <h3>Error Loading Missions</h3><p>{fetchError}</p>
//               <button onClick={()=>window.location.reload()} className="reports-btn primary">Retry</button>
//             </div>
//           ) : activeMissions.length>0 ? (
//             <div className="mb-grid">
//               {displayedActive.map(mission=>{
//                 const badgeColors  = getStatusBadgeBg(mission.task_status_id);
//                 const displayM     = taskDetails[mission.task_id]||mission;
//                 const evidencePhotos = taskEvidence[mission.task_id]||[];
//                 const firstPhoto   = evidencePhotos.length>0 ? getFullImageUrl(evidencePhotos[0].proof_url) : null;
//                 const cardTitle    = getCardTitle(mission.animal_type, mission.animal_condition);
//                 const isCritical   = mission.animal_condition?.toLowerCase().includes('critical')||mission.animal_condition?.toLowerCase().includes('injur');
//                 const condInTitle  = cardTitle.toLowerCase().startsWith((mission.animal_condition||'').toLowerCase().split(' ')[0]);

//                 return (
//                   <div key={mission.task_id} className="mb-card" onClick={()=>handleViewTaskDetails(mission)}>
//                     {/* Image / placeholder */}
//                     <div className="mb-card-img">
//                       {firstPhoto&&(
//                         <img src={firstPhoto} alt="Evidence"
//                           onError={e=>{
//                             (e.currentTarget as HTMLImageElement).style.display='none';
//                             const fb=(e.currentTarget as HTMLImageElement).nextElementSibling as HTMLElement;
//                             if(fb) fb.style.display='flex';
//                           }}
//                         />
//                       )}
//                       <div className="mb-card-placeholder" style={{ display:firstPhoto?'none':'flex' }}>
//                         <div className="mb-card-placeholder-icon">{getAnimalEmoji(mission.animal_type)}</div>
//                         <span className="mb-card-placeholder-label">No photo yet</span>
//                       </div>
//                       <span className="mb-card-badge" style={{ background:badgeColors.bg,color:badgeColors.color }}>
//                         {getTaskStatusBadge(mission.task_status_id).text}
//                       </span>
//                       <span className="mb-card-id">#{mission.report_id}</span>
//                     </div>

//                     {/* Body */}
//                     <div className="mb-card-body">
//                       <div className="mb-card-title-row">
//                         <span className="mb-card-emoji">{getAnimalEmoji(mission.animal_type)}</span>
//                         <span className="mb-card-title">{cardTitle}</span>
//                       </div>
//                       <div className="mb-card-location">
//                         <Icon type="material" name="MdLocationOn" size={13} color="#1e3f1a"/>
//                         <span className="mb-card-location-text">{mission.location_address}</span>
//                       </div>
//                       {mission.animal_condition&&!condInTitle&&(
//                         <span className={`mb-card-condition ${isCritical?'critical':'normal'}`}>{mission.animal_condition}</span>
//                       )}
//                       <p className="mb-card-desc">"{mission.description||'No description provided'}"</p>
//                       <div className="mb-card-reporter">
//                         <div className="mb-card-reporter-left">
//                           <div className="mb-card-avatar">{mission.reporter_name?.charAt(0).toUpperCase()||'?'}</div>
//                           <span className="mb-card-reporter-name">{mission.reporter_name||'Anonymous'}</span>
//                         </div>
//                         <span className="mb-card-time">{formatRelativeTime(displayM.submitted_at)}</span>
//                       </div>
//                     </div>

//                     {/* Footer */}
//                     <div className="mb-card-footer">
//                       <button className="mb-card-btn" onClick={e=>{e.stopPropagation();handleViewTaskDetails(mission);}}>
//                         <Icon type="material" name="MdCheckCircle" size={15} color="#c8e6b0"/> VIEW DETAILS
//                       </button>
//                     </div>
//                   </div>
//                 );
//               })}
//             </div>
//           ) : (
//             <div className="reports-empty-state">
//               <Icon type="material" name="MdMyLocation" size={48} color="#1e3f1a"/>
//               <h3>No Active Missions</h3>
//               <p>You don't have any active rescue missions at the moment.</p>
//               <Link to="/tasks" className="reports-btn primary">Browse Available Missions</Link>
//             </div>
//           )}
//         </div>
//       </div>

//       {selectedTask&&(
//         <TaskDetailModal
//           task={selectedTask} isOpen={isTaskModalOpen}
//           onClose={()=>{ setIsTaskModalOpen(false); setSelectedTask(null); }}
//           onUploadEvidence={handleUploadEvidence} actionLoading={actionLoading}
//           userProfile={userProfile}
//           evidence={taskEvidence[selectedTask.task_id]}
//           adminNotes={taskAdminNotes[selectedTask.task_id]}
//         />
//       )}

//       {selectedTaskId&&(
//         <DeclineModal
//           isOpen={isDeclineModalOpen}
//           onClose={()=>{ setIsDeclineModalOpen(false); setSelectedTaskId(null); }}
//           onSubmit={reason=>handleDeclineTask(selectedTaskId,reason)}
//           taskId={selectedTaskId}
//         />
//       )}
//     </div>
//   );
// };

// // ── Pending / Rejected ────────────────────────────────────────────────────────
// const PendingVolunteerDashboard: React.FC<{ user: any }> = () => (
//   <div className="dashboard-wrapper animate-fade-in">
//     <div className="pending-volunteer">
//       <div className="pending-icon"><Icon type="material" name="MdAccessTime" size={48} color="#FF9F1C"/></div>
//       <h2 className="pending-title">Activation Pending</h2>
//       <p className="pending-text">Thank you for joining ResQAll. Our HQ is currently reviewing your ranger profile. You will be notified via field log once approved.</p>
//     </div>
//   </div>
// );

// const RejectedVolunteerDashboard: React.FC<{ user: any }> = () => (
//   <div className="dashboard-wrapper animate-fade-in">
//     <div className="rejected-volunteer">
//       <h2 className="rejected-title">Application Status</h2>
//       <p className="rejected-text">Unfortunately, your ResQAll operative status was not approved.</p>
//     </div>
//   </div>
// );

// // ── User Dashboard ────────────────────────────────────────────────────────────
// const UserDashboard: React.FC<{
//   user: any; userReports: Report[]; reportsLoading: boolean;
//   onViewDetails: (r:Report)=>void; userProfile: UserProfile|null;
// }> = ({ user,userReports,reportsLoading,onViewDetails,userProfile }) => {
//   const myReports        = userReports.filter(r=>Number(r.user_id)===Number(user.user_id));
//   const totalReports     = myReports.length;
//   const submittedReports = myReports.filter(r=>r.status_name?.toLowerCase()==='submitted').length;
//   const inProgressReports= myReports.filter(r=>r.status_name?.toLowerCase()==='in_progress').length;
//   const completedReports = myReports.filter(r=>r.status_name?.toLowerCase()==='completed').length;

//   return (
//     <div className="dashboard-wrapper animate-fade-in">
//       <div className="user-dashboard">
//         <div className="welcome-section">
//           <div className="welcome-content">
//             <h1 className="welcome-title">
//               <span className="welcome-greeting">Welcome back,</span>
//               <span className="welcome-name">{user.username||'Animal Friend'}!</span>
//             </h1>
//             <p className="welcome-subtitle">Track your rescue reports and their progress</p>
//             {(userProfile?.email||userProfile?.phone)&&(
//               <div className="contact-info">
//                 {userProfile.email&&<span className="contact-item"><Icon type="material" name="MdEmail" size={14} color="white"/>{userProfile.email}</span>}
//                 {userProfile.phone&&<span className="contact-item"><Icon type="material" name="MdPhone" size={14} color="white"/>{userProfile.phone}</span>}
//               </div>
//             )}
//           </div>
//           <Link to="/create-report" className="create-report-btn">
//             <span className="btn-icon">+</span> New Report
//           </Link>
//         </div>

//         <div className="stats-grid">
//           {[
//             { icon:'MdAssignment',    label:'Total Reports', value:totalReports,      cls:'total' },
//             { icon:'MdHourglassEmpty',label:'Submitted',     value:submittedReports,  cls:'submitted' },
//             { icon:'MdRocketLaunch',  label:'In Progress',   value:inProgressReports, cls:'in-progress' },
//             { icon:'MdCheckCircle',   label:'Completed',     value:completedReports,  cls:'completed' },
//           ].map(s=>(
//             <div key={s.label} className="stat-card">
//               <div className={`stat-icon ${s.cls}`}><Icon type="material" name={s.icon} size={28} color="#2D5A27"/></div>
//               <div className="stat-content">
//                 <div className="stat-value">{s.value}</div>
//                 <div className="stat-label">{s.label}</div>
//               </div>
//             </div>
//           ))}
//         </div>

//         <div className="reports-section">
//           <div className="section-header">
//             <h2>Your Reports</h2>
//             {myReports.length>3&&<Link to="/my-reports" className="view-all-link">View All ({myReports.length}) →</Link>}
//           </div>

//           {reportsLoading ? (
//             <div className="loading-container"><div className="spinner"/><p>Loading your reports...</p></div>
//           ) : myReports.length>0 ? (
//             <div className="reports-grid user-reports">
//               {myReports.slice(0,3).map(report=>(
//                 <div key={report.report_id} className="report-card user">
//                   <div className="card-header">
//                     <div className="header-top">
//                       <span className="report-id">#{report.report_id}</span>
//                       <span className={`status-badge ${getStatusClass(report.status_name)}`}>{getStatusText(report.status_name)}</span>
//                     </div>
//                   </div>
//                   <div className="card-body">
//                     <div className="animal-info-row">
//                       <div className="animal-emoji-container">
//                         <span className="animal-emoji-large">{getAnimalEmoji(report.animal_type)}</span>
//                       </div>
//                       <div className="animal-details">
//                         <h3 className="animal-type">{report.animal_type||'Unknown Animal'}</h3>
//                         <div className="condition-tag">
//                           <span className="condition-indicator">●</span>{report.animal_condition||'Condition Unknown'}
//                         </div>
//                       </div>
//                     </div>
//                     <div className="location-row">
//                       <Icon type="material" name="MdLocationOn" size={16} color="#666"/>
//                       <span className="location-text" title={report.location_address}>{report.location_address}</span>
//                     </div>
//                     <div className="date-row">
//                       <Icon type="material" name="MdCalendarToday" size={16} color="#666"/>
//                       <span className="date-text">{formatShortDate(report.submitted_at)}</span>
//                     </div>
//                     <p className="description-preview">
//                       {report.description?.length>80?`${report.description.substring(0,80)}...`:report.description}
//                     </p>
//                   </div>
//                   <div className="card-footer">
//                     <button className="view-details-btn" onClick={()=>onViewDetails(report)}>
//                       View Details <span className="btn-arrow">→</span>
//                     </button>
//                   </div>
//                 </div>
//               ))}
//             </div>
//           ) : (
//             <div className="empty-state">
//               <div className="empty-icon"><Icon type="material" name="MdDescription" size={48} color="#bbb"/></div>
//               <h3>No Reports Yet</h3>
//               <p>Create your first rescue report to get started</p>
//               <Link to="/create-report" className="create-first-btn">Create Report</Link>
//             </div>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// };

// // ── Main Dashboard ────────────────────────────────────────────────────────────
// export const Dashboard: React.FC = () => {
//   const [isLoading,      setIsLoading]      = useState(true);
//   const [userReports,    setUserReports]    = useState<Report[]>([]);
//   const [allReports,     setAllReports]     = useState<Report[]>([]);
//   const [reportsLoading, setReportsLoading] = useState(true);
//   const [userProfile,    setUserProfile]    = useState<UserProfile|null>(null);
//   const [selectedReport, setSelectedReport] = useState<Report|null>(null);
//   const [isModalOpen,    setIsModalOpen]    = useState(false);
//   const [reportEvidence, setReportEvidence] = useState<Record<number,TaskProof[]>>({});
//   const [reportNotes,    setReportNotes]    = useState<Record<number,TaskCompletionNote[]>>({});
//   const [loadingDetails, setLoadingDetails] = useState<Record<number,boolean>>({});

//   const navigate = useNavigate();
//   const { user: currentUser } = useAuth();

//   useEffect(()=>{
//     if (!currentUser) return;
//     const fetch_=async()=>{
//       try{
//         const token=getToken();
//         const res=await fetch('http://localhost:5000/api/users/profile',{ headers:{ 'Authorization':`Bearer ${token}`,'Content-Type':'application/json' } });
//         if(res.ok){ const d=await res.json(); if(d.success) setUserProfile(d.data); }
//       }catch(e){ console.error(e); }
//     };
//     fetch_();
//   },[currentUser]);

//   const fetchAllReports=async()=>{
//     try{
//       const token=getToken();
//       const res=await fetch('http://localhost:5000/api/reports/admin/all',{ headers:{ 'Authorization':`Bearer ${token}`,'Content-Type':'application/json' } });
//       if(res.ok){ const d=await res.json(); if(d.success) setAllReports(d.data||[]); }
//     }catch(e){ console.error(e); }
//   };

//   useEffect(()=>{
//     if (!currentUser) return;
//     const fetch_=async()=>{
//       try{
//         setReportsLoading(true);
//         const token=getToken();
//         const res=await fetch('http://localhost:5000/api/reports/my-reports',{ headers:{ 'Authorization':`Bearer ${token}`,'Content-Type':'application/json' } });
//         if(res.ok){ const d=await res.json(); if(d.success) setUserReports(d.data||[]); }
//         if(getUserRole(currentUser)==='admin') await fetchAllReports();
//       }catch(e){ console.error(e); }
//       finally{ setReportsLoading(false); }
//     };
//     fetch_();
//   },[currentUser,userProfile]);

//   useEffect(()=>{
//     if(currentUser) setIsLoading(false);
//     else{ const t=setTimeout(()=>setIsLoading(false),1000); return()=>clearTimeout(t); }
//   },[currentUser]);

//   const getUserRole=(u:any):string=>{
//     if(!u) return 'user';
//     if(u.role&&typeof u.role==='object'&&u.role.role_name) return u.role.role_name.toLowerCase();
//     if(u.role_name) return u.role_name.toLowerCase();
//     if(u.role_id){ if(u.role_id===3) return 'admin'; if(u.role_id===2) return 'volunteer'; if(u.role_id===1) return 'user'; }
//     return 'user';
//   };

//   const getVolunteerStatus=(u:any):string|null=>{
//     if(!u) return null;
//     if(u.approval_status_id!==undefined){
//       if(u.approval_status_id===1) return 'pending';
//       if(u.approval_status_id===2) return 'approved';
//       if(u.approval_status_id===3) return 'rejected';
//     }
//     if(u.volunteer){
//       if(u.volunteer.approval_status_id!==undefined){
//         if(u.volunteer.approval_status_id===1) return 'pending';
//         if(u.volunteer.approval_status_id===2) return 'approved';
//         if(u.volunteer.approval_status_id===3) return 'rejected';
//       }
//       if(u.volunteer.status){ const s=u.volunteer.status.toLowerCase(); if(s.includes('pending')) return 'pending'; if(s.includes('approved')) return 'approved'; if(s.includes('reject')) return 'rejected'; }
//     }
//     if(u.volunteer_status){ const s=u.volunteer_status.toLowerCase(); if(s.includes('pending')) return 'pending'; if(s.includes('approved')) return 'approved'; if(s.includes('reject')) return 'rejected'; }
//     return null;
//   };

//   const fetchReportEvidence=async(reportId:number,taskId?:number)=>{
//     if(!taskId) return;
//     try{
//       setLoadingDetails(prev=>({ ...prev,[reportId]:true }));
//       const token=getToken();
//       const [er,nr]=await Promise.all([
//         fetch(`http://localhost:5000/api/tasks/${taskId}/evidence`,{ headers:{ 'Authorization':`Bearer ${token}` } }),
//         fetch(`http://localhost:5000/api/tasks/${taskId}/completion-notes`,{ headers:{ 'Authorization':`Bearer ${token}` } }),
//       ]);
//       const [ed,nd]=[await er.json(),await nr.json()];
//       if(ed.success) setReportEvidence(prev=>({ ...prev,[reportId]:ed.data||[] }));
//       if(nd.success) setReportNotes(prev=>({ ...prev,[reportId]:nd.data||[] }));
//     }catch(e){ console.error(e); }
//     finally{ setLoadingDetails(prev=>({ ...prev,[reportId]:false })); }
//   };

//   const handleViewDetails=(report:Report)=>{
//     setSelectedReport(report);
//     if(report.task_id) fetchReportEvidence(report.report_id,report.task_id);
//     setIsModalOpen(true);
//   };

//   useEffect(()=>{ if(!isLoading&&!currentUser) navigate('/login'); },[currentUser,navigate,isLoading]);

//   if(isLoading) return (
//     <div className="dashboard-wrapper">
//       <div className="no-access">
//         <div className="loading-spinner-large"/><h2>Loading...</h2>
//         <p>Please wait while we load your dashboard...</p>
//       </div>
//     </div>
//   );
//   if(!currentUser) return (
//     <div className="dashboard-wrapper">
//       <div className="no-access">
//         <h2>Access Denied</h2><p>Please log in to view the dashboard.</p>
//         <Link to="/login" className="login-link">Go to Login</Link>
//       </div>
//     </div>
//   );

//   const userRole       = getUserRole(currentUser);
//   const volunteerStatus= getVolunteerStatus(currentUser);

//   const getStats=()=>({
//     totalReports:     userReports.length,
//     completedRescues: userReports.filter(r=>r.status_name?.toLowerCase()==='completed').length,
//     activeVolunteers: 1,
//     pendingApprovals: 0,
//     myReports:        userReports.filter(r=>Number(r.user_id)===Number(currentUser.user_id)).length,
//     myCompletedTasks: userReports.filter(r=>r.status_name?.toLowerCase()==='completed').length,
//   });

//   const renderDashboard=()=>{
//     if(userRole==='admin')
//       return <AdminDashboard stats={getStats()} reports={allReports} reportsLoading={reportsLoading}/>;
//     if(userRole==='volunteer'){
//       if(volunteerStatus==='rejected')  return <RejectedVolunteerDashboard user={currentUser}/>;
//       if(volunteerStatus==='pending'||volunteerStatus==='none'||!volunteerStatus) return <PendingVolunteerDashboard user={currentUser}/>;
//       if(volunteerStatus==='approved')  return <VolunteerDashboard user={{...currentUser,role:userRole}} stats={getStats()} reports={userReports} reportsLoading={reportsLoading} userProfile={userProfile}/>;
//     }
//     return <UserDashboard user={{...currentUser,role:userRole}} userReports={userReports} reportsLoading={reportsLoading} onViewDetails={handleViewDetails} userProfile={userProfile}/>;
//   };

//   return (
//     <div className="dashboard-content">
//       {renderDashboard()}
//       <ReportDetailModal
//         report={selectedReport} isOpen={isModalOpen}
//         onClose={()=>{ setIsModalOpen(false); setSelectedReport(null); }}
//         userPhone={userProfile?.phone} userEmail={userProfile?.email} userName={userProfile?.username}
//         evidence={selectedReport?reportEvidence[selectedReport.report_id]:[]}
//         notes={selectedReport?reportNotes[selectedReport.report_id]:[]}
//         loading={selectedReport?loadingDetails[selectedReport.report_id]:false}
//       />
//     </div>
//   );
// };

// export default Dashboard;

// Dashboard.tsx — Full redesign with inline CSS, same logic preserved

import React, { useState, useEffect, useCallback, useRef } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell } from 'recharts';
import { useAuth } from '../../context/AuthContext';
import { Heatmap } from '../../components/Dashboard/HeatMap';

// ─── Interfaces ───────────────────────────────────────────────────────────────
interface Report {
  report_id: number; user_id: number; description: string;
  location_address: string; user_note: string; submitted_at: string;
  animal_type: string; animal_condition: string; status_id: number;
  status_name: string; is_deleted?: number;
  reporter_name?: string | null; reporter_phone?: string | null; reporter_email?: string | null;
  volunteer_name?: string | null; volunteer_id?: number;
  volunteer_phone?: string | null; volunteer_email?: string | null;
  task_id?: number; task_status_id?: number; task_status?: string;
  assigned_at?: string; started_at?: string; completed_at?: string;
  volunteer_responded_at?: string; volunteer_response?: string;
  declined_reason?: string; admin_note?: string;
}
interface AdminNote { note_id: number; report_id: number; admin_id: number; note_text: string; created_at: string; admin_name?: string; }
interface TaskProof { proof_id: number; task_id: number; proof_url: string; uploaded_at: string; }
interface TaskCompletionNote { note_id: number; task_id: number; volunteer_id: number; volunteer_name?: string; note_text: string; created_at: string; }
interface VolunteerTask {
  task_id: number; report_id: number; assigned_to_user_id: number; assigned_by_user_id: number;
  task_status_id: number; task_status: string; assigned_at: string;
  volunteer_responded_at?: string; volunteer_response?: string; declined_reason?: string;
  started_at?: string; completed_at?: string; is_deleted?: number;
  user_id: number; description: string; location_address: string; user_note: string;
  submitted_at: string; animal_type: string; animal_condition: string;
  report_status_id: number; report_status: string;
  reporter_name: string | null; reporter_phone: string | null; reporter_email: string | null;
  volunteer_name: string; volunteer_email: string | null; volunteer_phone: string | null;
}
interface UserProfile { user_id: number; username: string; email: string; phone: string; bio: string; profile_image_url: string; role_id: number; created_at: string; }

// ─── Design tokens ────────────────────────────────────────────────────────────
const T = {
  forest:   '#1e3f1a',
  green:    '#2D5A27',
  greenLt:  '#3d7035',
  sage:     '#7aaa6a',
  mint:     '#c8e6b0',
  cream:    '#faf6ee',
  sand:     '#f0e8d4',
  border:   '#e2d9c6',
  white:    '#ffffff',
  text:     '#1a2e1c',
  textMid:  '#4a6b4a',
  textSoft: '#8a9e8a',
  amber:    '#e07a20',
  amberLt:  '#fdf0e0',
  red:      '#c62828',
  redLt:    '#ffebee',
  blue:     '#1565c0',
  blueLt:   '#e3f2fd',
  shadow:   'rgba(30,63,26,0.10)',
  shadowMd: 'rgba(30,63,26,0.16)',
  shadowLg: 'rgba(30,63,26,0.22)',
  radius:   '16px',
  radiusLg: '24px',
  radiusSm: '10px',
  radiusXs: '6px',
};

// ─── Helpers ──────────────────────────────────────────────────────────────────
const getToken = () => localStorage.getItem('token') || sessionStorage.getItem('token');

const hasPhone = (p?: string | null) => typeof p === 'string' && p.trim().length > 0;
const hasEmail = (e?: string | null) => {
  if (typeof e !== 'string') return false;
  const t = e.trim();
  return t.length > 0 && t.includes('@') && t.includes('.');
};
const fmtPhone = (p?: string | null) => {
  if (!hasPhone(p)) return 'Not provided';
  const c = String(p).trim().replace(/\D/g, '');
  return c.length === 10 ? `+977 ${c}` : String(p).trim();
};
const imgUrl = (u: string) => {
  if (!u) return '';
  if (u.startsWith('http')) return u;
  const c = u.replace(/^\/+/, '');
  return c.startsWith('uploads/') ? `http://localhost:5000/${c}` : `http://localhost:5000/uploads/${c}`;
};
const animalEmoji = (t: string) => {
  const s = t?.toLowerCase() || '';
  if (s.includes('dog')) return '🐶'; if (s.includes('cat')) return '🐱';
  if (s.includes('bird')) return '🐦'; if (s.includes('rabbit') || s.includes('bunny')) return '🐰';
  if (s.includes('hamster')) return '🐹'; if (s.includes('turtle')) return '🐢';
  if (s.includes('horse')) return '🐴'; if (s.includes('cow')) return '🐮';
  if (s.includes('goat')) return '🐐'; if (s.includes('sheep')) return '🐑';
  if (s.includes('fish')) return '🐠'; if (s.includes('snake')) return '🐍';
  if (s.includes('mouse') || s.includes('rat')) return '🐭'; if (s.includes('monkey')) return '🐒';
  if (s.includes('pig')) return '🐷'; if (s.includes('chicken')) return '🐔';
  if (s.includes('duck')) return '🦆';
  return '🐾';
};
const statusLabel = (s: string) => (s || 'Unknown').replace(/_/g, ' ').replace(/\b\w/g, c => c.toUpperCase());
const taskBadge = (id?: number) => {
  switch (id) {
    case 1: return { text: 'ASSIGNED',    bg: '#fff8e1', color: '#e65100', dot: '#ffb300' };
    case 2: return { text: 'IN PROGRESS', bg: '#e8f5e9', color: '#2e7d32', dot: '#43a047' };
    case 3: return { text: 'COMPLETED',   bg: '#e8f5e9', color: '#1b5e20', dot: '#2e7d32' };
    case 4: return { text: 'DECLINED',    bg: '#ffebee', color: '#c62828', dot: '#e53935' };
    default: return { text: 'UNKNOWN',    bg: '#f5f5f5', color: '#757575', dot: '#9e9e9e' };
  }
};
const statusColor = (s?: string) => {
  const n = s?.toLowerCase() || '';
  if (n.includes('submitted')) return { bg: T.blueLt, color: T.blue };
  if (n.includes('assigned'))  return { bg: '#fff8e1', color: '#e65100' };
  if (n.includes('progress'))  return { bg: '#e8f5e9', color: '#2e7d32' };
  if (n.includes('completed')) return { bg: '#e8f5e9', color: '#1b5e20' };
  if (n.includes('declined') || n.includes('cancelled')) return { bg: T.redLt, color: T.red };
  return { bg: T.sand, color: T.textMid };
};
const fmtDate = (d?: string) => {
  if (!d) return '—';
  try { return new Date(d).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric', hour: '2-digit', minute: '2-digit' }); }
  catch { return '—'; }
};
const fmtShort = (d: string) => {
  if (!d) return '—';
  try { return new Date(d).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }); }
  catch { return '—'; }
};
const fmtRel = (d: string) => {
  if (!d) return '—';
  try {
    const diff = Date.now() - new Date(d).getTime();
    const m = Math.floor(diff / 60000), h = Math.floor(m / 60), day = Math.floor(h / 24);
    if (m < 1) return 'Just now';
    if (m < 60) return `${m}m ago`;
    if (h < 24) return `${h}h ago`;
    if (day === 1) return 'Yesterday';
    if (day < 7) return `${day}d ago`;
    return fmtShort(d);
  } catch { return '—'; }
};
const calcDist = (la1: number, ln1: number, la2: number, ln2: number) => {
  const R = 6371, dL = (la2 - la1) * Math.PI / 180, dN = (ln2 - ln1) * Math.PI / 180;
  const a = Math.sin(dL / 2) ** 2 + Math.cos(la1 * Math.PI / 180) * Math.cos(la2 * Math.PI / 180) * Math.sin(dN / 2) ** 2;
  return R * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
};

// ─── Micro components ─────────────────────────────────────────────────────────
const Pill: React.FC<{ bg: string; color: string; children: React.ReactNode; dot?: string }> = ({ bg, color, children, dot }) => (
  <span style={{ display: 'inline-flex', alignItems: 'center', gap: 5, background: bg, color, padding: '3px 10px', borderRadius: 20, fontSize: 11, fontWeight: 700, letterSpacing: '0.04em', textTransform: 'uppercase' }}>
    {dot && <span style={{ width: 6, height: 6, borderRadius: '50%', background: dot, flexShrink: 0 }} />}
    {children}
  </span>
);

const Divider = () => <div style={{ height: 1, background: T.border, margin: '0 0 16px' }} />;

const Avatar: React.FC<{ name?: string | null; size?: number; bg?: string }> = ({ name, size = 36, bg = T.forest }) => (
  <div style={{ width: size, height: size, borderRadius: '50%', background: bg, display: 'flex', alignItems: 'center', justifyContent: 'center', color: T.mint, fontWeight: 700, fontSize: size * 0.38, flexShrink: 0 }}>
    {name?.charAt(0).toUpperCase() || '?'}
  </div>
);

const Card: React.FC<{ children: React.ReactNode; style?: React.CSSProperties; hover?: boolean }> = ({ children, style, hover }) => {
  const [hovered, setHovered] = useState(false);
  return (
    <div
      onMouseEnter={() => hover && setHovered(true)}
      onMouseLeave={() => hover && setHovered(false)}
      style={{ background: T.white, borderRadius: T.radius, border: `1px solid ${hovered ? T.sage : T.border}`, boxShadow: hovered ? `0 8px 28px ${T.shadowMd}` : `0 2px 8px ${T.shadow}`, transition: 'all 0.25s ease', ...style }}
    >
      {children}
    </div>
  );
};

// ─── Location Tracker ─────────────────────────────────────────────────────────
const LocationTracker: React.FC<{ taskId: number; isActive: boolean }> = ({ taskId, isActive }) => {
  const [watchId, setWatchId] = useState<number | null>(null);
  const [lastLoc, setLastLoc] = useState<GeolocationPosition | null>(null);
  const [tracking, setTracking] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [pending, setPending] = useState(0);
  const queue = useRef<any[]>([]);

  const save = useCallback(async (lat: number, lng: number, acc: number) => {
    const token = getToken(); if (!token) return;
    try {
      const res = await fetch('http://localhost:5000/api/volunteer/tracking/point', { method: 'POST', headers: { 'Authorization': `Bearer ${token}`, 'Content-Type': 'application/json' }, body: JSON.stringify({ taskId, latitude: lat, longitude: lng, accuracy: acc }) });
      const data = await res.json();
      if (!data.success) { queue.current.push({ lat, lng, acc }); setPending(queue.current.length); }
    } catch { queue.current.push({ lat, lng, acc }); setPending(queue.current.length); }
  }, [taskId]);

  const retry = useCallback(async () => {
    if (!queue.current.length) return;
    const token = getToken(); if (!token) return;
    const pts = [...queue.current]; queue.current = []; setPending(0);
    for (const p of pts) { try { await fetch('http://localhost:5000/api/volunteer/tracking/point', { method: 'POST', headers: { 'Authorization': `Bearer ${token}`, 'Content-Type': 'application/json' }, body: JSON.stringify({ taskId, latitude: p.lat, longitude: p.lng, accuracy: p.acc }) }); } catch { queue.current.push(p); setPending(queue.current.length); } }
  }, [taskId]);

  const start = useCallback(() => {
    if (!navigator.geolocation) { setError('Geolocation not supported'); return; }
    setError(null);
    navigator.geolocation.getCurrentPosition(pos => { setLastLoc(pos); save(pos.coords.latitude, pos.coords.longitude, pos.coords.accuracy || 0); }, () => {}, { enableHighAccuracy: false, timeout: 10000, maximumAge: 60000 });
    const id = navigator.geolocation.watchPosition(pos => {
      let ok = true;
      if (lastLoc) { const d = calcDist(lastLoc.coords.latitude, lastLoc.coords.longitude, pos.coords.latitude, pos.coords.longitude); ok = d > 0.05 || (pos.timestamp - lastLoc.timestamp) / 1000 > 30; }
      if (ok) save(pos.coords.latitude, pos.coords.longitude, pos.coords.accuracy || 0);
      setLastLoc(pos);
    }, err => { setError(['', 'Permission denied', 'Unavailable', 'Timed out'][err.code] || 'Unknown'); }, { enableHighAccuracy: true, timeout: 30000, maximumAge: 0 });
    setWatchId(id); setTracking(true);
  }, [lastLoc, save]);

  const stop = useCallback(() => { if (watchId !== null) { navigator.geolocation.clearWatch(watchId); setWatchId(null); setTracking(false); } }, [watchId]);

  useEffect(() => { if (isActive) { const t = setTimeout(() => start(), 1000); return () => { clearTimeout(t); stop(); }; } else stop(); }, [isActive, start, stop]);
  useEffect(() => { window.addEventListener('online', retry); return () => window.removeEventListener('online', retry); }, [retry]);
  useEffect(() => { const t = setInterval(() => { if (navigator.onLine && queue.current.length) retry(); }, 30000); return () => clearInterval(t); }, [retry]);

  if (!isActive) return null;
  return (
    <div style={{ position: 'fixed', bottom: 24, right: 24, background: error ? T.redLt : '#e8f5e9', padding: '8px 14px', borderRadius: 20, fontSize: 12, fontWeight: 600, boxShadow: `0 4px 16px ${T.shadowMd}`, zIndex: 9999, display: 'flex', alignItems: 'center', gap: 8, border: `1px solid ${error ? '#ffcdd2' : '#c8e6c9'}` }}>
      <span style={{ width: 8, height: 8, borderRadius: '50%', background: error ? T.red : (tracking ? '#43a047' : '#ff9800'), animation: tracking && !error ? 'pulse 2s infinite' : 'none' }} />
      {error ? 'Location Error' : tracking ? 'Sharing Location' : 'Starting...'}
      {pending > 0 && <span style={{ background: T.amberLt, color: T.amber, padding: '2px 8px', borderRadius: 12, fontSize: 10 }}>{pending} pending</span>}
    </div>
  );
};

// ─── Decline Modal ────────────────────────────────────────────────────────────
const DeclineModal: React.FC<{ isOpen: boolean; onClose: () => void; onSubmit: (r: string) => void; taskId: number }> = ({ isOpen, onClose, onSubmit, taskId }) => {
  const [reason, setReason] = useState('');
  const [other, setOther] = useState('');
  const [sub, setSub] = useState(false);
  if (!isOpen) return null;
  const go = async () => {
    const f = reason === 'other' ? other : reason;
    if (f) { setSub(true); try { await onSubmit(f); } finally { setSub(false); setReason(''); setOther(''); onClose(); } }
  };
  return (
    <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.45)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1000, padding: 20 }} onClick={onClose}>
      <div style={{ background: T.white, borderRadius: T.radiusLg, width: '100%', maxWidth: 480, boxShadow: `0 24px 60px ${T.shadowLg}`, overflow: 'hidden' }} onClick={e => e.stopPropagation()}>
        <div style={{ padding: '24px 28px 20px', borderBottom: `1px solid ${T.border}`, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <div>
            <div style={{ fontWeight: 700, fontSize: 18, color: T.text }}>Decline Task #{taskId}</div>
            <div style={{ fontSize: 13, color: T.textSoft, marginTop: 2 }}>Please provide a reason for declining</div>
          </div>
          <button onClick={onClose} style={{ background: T.sand, border: 'none', borderRadius: T.radiusSm, width: 32, height: 32, cursor: 'pointer', fontSize: 18, color: T.textMid, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>×</button>
        </div>
        <div style={{ padding: '24px 28px' }}>
          <select value={reason} onChange={e => setReason(e.target.value)} style={{ width: '100%', padding: '10px 14px', borderRadius: T.radiusSm, border: `1.5px solid ${T.border}`, fontSize: 14, color: T.text, background: T.cream, marginBottom: 16, outline: 'none' }}>
            <option value="">Select a reason</option>
            <option value="Too far away">Too far away</option>
            <option value="Already have active tasks">Already have active tasks</option>
            <option value="Animal type not suitable">Animal type not suitable</option>
            <option value="Condition too severe">Condition too severe</option>
            <option value="Equipment not available">Equipment not available</option>
            <option value="other">Other (please specify)</option>
          </select>
          {reason === 'other' && (
            <textarea value={other} onChange={e => setOther(e.target.value)} placeholder="Enter your reason..." rows={3} style={{ width: '100%', padding: '10px 14px', borderRadius: T.radiusSm, border: `1.5px solid ${T.border}`, fontSize: 14, resize: 'vertical', fontFamily: 'inherit', outline: 'none', boxSizing: 'border-box' }} />
          )}
        </div>
        <div style={{ padding: '0 28px 24px', display: 'flex', gap: 12, justifyContent: 'flex-end' }}>
          <button onClick={onClose} style={{ padding: '9px 20px', borderRadius: T.radiusSm, border: `1.5px solid ${T.border}`, background: 'transparent', color: T.textMid, fontWeight: 600, cursor: 'pointer', fontSize: 14 }}>Cancel</button>
          <button onClick={go} disabled={!reason || (reason === 'other' && !other) || sub} style={{ padding: '9px 22px', borderRadius: T.radiusSm, background: !reason ? '#eee' : T.red, color: 'white', border: 'none', fontWeight: 700, cursor: !reason ? 'not-allowed' : 'pointer', fontSize: 14, opacity: sub ? 0.6 : 1 }}>
            {sub ? 'Processing…' : 'Decline Task'}
          </button>
        </div>
      </div>
    </div>
  );
};

// ─── Upload Evidence Modal ────────────────────────────────────────────────────
const UploadEvidenceModal: React.FC<{ isOpen: boolean; onClose: () => void; onSubmit: (f: File, n: string) => void; taskId: number }> = ({ isOpen, onClose, onSubmit, taskId }) => {
  const [file, setFile] = useState<File | null>(null);
  const [notes, setNotes] = useState('');
  const [preview, setPreview] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [err, setErr] = useState<string | null>(null);
  if (!isOpen) return null;
  const validate = (f: File) => {
    if (f.size > 5 * 1024 * 1024) { setErr('File too large (max 5MB)'); return false; }
    if (!['image/jpeg', 'image/png', 'image/jpg', 'image/gif'].includes(f.type)) { setErr('Invalid type — JPG, PNG or GIF only'); return false; }
    return true;
  };
  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files?.[0]) { setErr(null); const f = e.target.files[0]; if (validate(f)) { if (preview) URL.revokeObjectURL(preview); setFile(f); setPreview(URL.createObjectURL(f)); } }
  };
  const remove = () => { if (preview) URL.revokeObjectURL(preview); setFile(null); setPreview(null); setErr(null); };
  const submit = async () => {
    if (!file) { setErr('Please select a photo'); return; }
    if (!notes.trim()) { setErr('Please enter completion notes'); return; }
    setLoading(true); try { await onSubmit(file, notes); setFile(null); setNotes(''); setPreview(null); onClose(); } finally { setLoading(false); }
  };
  return (
    <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.45)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1000, padding: 20 }} onClick={onClose}>
      <div style={{ background: T.white, borderRadius: T.radiusLg, width: '100%', maxWidth: 520, boxShadow: `0 24px 60px ${T.shadowLg}`, overflow: 'hidden' }} onClick={e => e.stopPropagation()}>
        <div style={{ background: `linear-gradient(135deg, ${T.forest}, ${T.green})`, padding: '22px 28px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <div>
            <div style={{ fontWeight: 700, fontSize: 17, color: 'white' }}>📸 Upload Evidence — Task #{taskId}</div>
            <div style={{ fontSize: 12, color: T.mint, marginTop: 3 }}>Add photos to complete the mission</div>
          </div>
          <button onClick={onClose} style={{ background: 'rgba(255,255,255,0.15)', border: 'none', borderRadius: T.radiusSm, width: 32, height: 32, cursor: 'pointer', fontSize: 18, color: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>×</button>
        </div>
        <div style={{ padding: 28 }}>
          {err && <div style={{ background: T.redLt, color: T.red, padding: '10px 14px', borderRadius: T.radiusSm, marginBottom: 16, fontSize: 13, fontWeight: 600 }}>{err}</div>}
          <div style={{ marginBottom: 20 }}>
            <label style={{ display: 'block', fontWeight: 700, fontSize: 13, color: T.text, marginBottom: 8, textTransform: 'uppercase', letterSpacing: '0.05em' }}>Proof Photo *</label>
            {preview ? (
              <div style={{ position: 'relative', borderRadius: T.radiusSm, overflow: 'hidden', border: `2px solid ${T.border}` }}>
                <img src={preview} alt="preview" style={{ width: '100%', maxHeight: 200, objectFit: 'cover', display: 'block' }} />
                <button onClick={remove} style={{ position: 'absolute', top: 8, right: 8, background: T.red, color: 'white', border: 'none', borderRadius: '50%', width: 26, height: 26, cursor: 'pointer', fontSize: 16, display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 700 }}>×</button>
              </div>
            ) : (
              <label style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8, border: `2px dashed ${T.border}`, borderRadius: T.radiusSm, padding: '32px 20px', cursor: 'pointer', color: T.textMid, fontSize: 14, fontWeight: 600, transition: 'all 0.2s' }}>
                <span style={{ fontSize: 24 }}>📷</span> Choose Photo
                <input type="file" accept="image/*" onChange={onChange} style={{ display: 'none' }} />
              </label>
            )}
          </div>
          <div>
            <label style={{ display: 'block', fontWeight: 700, fontSize: 13, color: T.text, marginBottom: 8, textTransform: 'uppercase', letterSpacing: '0.05em' }}>Completion Notes *</label>
            <textarea value={notes} onChange={e => setNotes(e.target.value)} placeholder="Describe the rescue outcome, any challenges, and the animal's condition…" rows={4} maxLength={500} style={{ width: '100%', padding: '10px 14px', borderRadius: T.radiusSm, border: `1.5px solid ${T.border}`, fontSize: 14, resize: 'vertical', fontFamily: 'inherit', outline: 'none', boxSizing: 'border-box', background: T.cream }} />
            <div style={{ fontSize: 11, color: T.textSoft, textAlign: 'right', marginTop: 4 }}>{notes.length}/500</div>
          </div>
        </div>
        <div style={{ padding: '0 28px 24px', display: 'flex', gap: 12, justifyContent: 'flex-end' }}>
          <button onClick={onClose} style={{ padding: '9px 20px', borderRadius: T.radiusSm, border: `1.5px solid ${T.border}`, background: 'transparent', color: T.textMid, fontWeight: 600, cursor: 'pointer', fontSize: 14 }}>Cancel</button>
          <button onClick={submit} disabled={!file || !notes.trim() || loading} style={{ padding: '9px 22px', borderRadius: T.radiusSm, background: T.green, color: 'white', border: 'none', fontWeight: 700, cursor: !file || !notes.trim() ? 'not-allowed' : 'pointer', fontSize: 14, opacity: loading ? 0.6 : 1 }}>
            {loading ? 'Uploading…' : 'Submit Evidence'}
          </button>
        </div>
      </div>
    </div>
  );
};

// ─── Task Detail Modal ────────────────────────────────────────────────────────
const TaskDetailModal: React.FC<{
  task: VolunteerTask | null; isOpen: boolean; onClose: () => void;
  onUploadEvidence: (id: number, f: File, n: string) => void;
  actionLoading: boolean; userProfile: UserProfile | null;
  evidence?: TaskProof[]; adminNotes?: AdminNote[];
}> = ({ task, isOpen, onClose, onUploadEvidence, actionLoading, userProfile, evidence = [], adminNotes = [] }) => {
  const [zoom, setZoom] = useState<string | null>(null);
  const [showUpload, setShowUpload] = useState(false);
  const [trackActive, setTrackActive] = useState(false);
  useEffect(() => { setTrackActive(task?.task_status_id === 2); }, [task?.task_status_id]);
  if (!isOpen || !task) return null;
  const badge = taskBadge(task.task_status_id);

  const InfoBlock: React.FC<{ label: string; value: React.ReactNode }> = ({ label, value }) => (
    <div style={{ marginBottom: 12 }}>
      <div style={{ fontSize: 11, fontWeight: 700, color: T.textSoft, textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: 3 }}>{label}</div>
      <div style={{ fontSize: 14, color: T.text, fontWeight: 500 }}>{value}</div>
    </div>
  );

  return (
    <>
      {task.task_status_id === 2 && <LocationTracker taskId={task.task_id} isActive={trackActive} />}
      <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.5)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1000, padding: 20 }} onClick={onClose}>
        <div style={{ background: T.cream, borderRadius: T.radiusLg, width: '100%', maxWidth: 920, maxHeight: '90vh', overflowY: 'auto', boxShadow: `0 28px 70px ${T.shadowLg}` }} onClick={e => e.stopPropagation()}>
          {/* Header */}
          <div style={{ background: `linear-gradient(135deg, ${T.forest}, ${T.green})`, padding: '22px 28px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', borderRadius: `${T.radiusLg} ${T.radiusLg} 0 0`, position: 'sticky', top: 0, zIndex: 10 }}>
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                <span style={{ fontSize: 28 }}>{animalEmoji(task.animal_type)}</span>
                <div>
                  <div style={{ fontWeight: 700, fontSize: 18, color: 'white' }}>Rescue Report #{task.report_id}</div>
                  <div style={{ fontSize: 12, color: T.mint, marginTop: 2 }}>{fmtRel(task.submitted_at)}</div>
                </div>
              </div>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
              <Pill bg={badge.bg} color={badge.color} dot={badge.dot}>{badge.text}</Pill>
              <button onClick={onClose} style={{ background: 'rgba(255,255,255,0.15)', border: 'none', borderRadius: T.radiusSm, width: 34, height: 34, cursor: 'pointer', fontSize: 20, color: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>×</button>
            </div>
          </div>

          {/* Body grid */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 20, padding: 24 }}>
            {/* Left col */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
              {/* Animal */}
              <Card style={{ padding: 20 }}>
                <div style={{ fontWeight: 700, fontSize: 12, color: T.textSoft, textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: 14 }}>🐾 Animal</div>
                <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
                  <div style={{ width: 60, height: 60, borderRadius: T.radiusSm, background: T.sand, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 32 }}>{animalEmoji(task.animal_type)}</div>
                  <div>
                    <div style={{ fontWeight: 700, fontSize: 16, color: T.text }}>{task.animal_type}</div>
                    <Pill bg={T.amberLt} color={T.amber}>{task.animal_condition}</Pill>
                  </div>
                </div>
              </Card>
              {/* Reporter */}
              <Card style={{ padding: 20 }}>
                <div style={{ fontWeight: 700, fontSize: 12, color: T.textSoft, textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: 14 }}>👤 Reporter</div>
                <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 14 }}>
                  <Avatar name={task.reporter_name} />
                  <div style={{ fontWeight: 600, fontSize: 15, color: T.text }}>{task.reporter_name || 'Anonymous'}</div>
                </div>
                {hasEmail(task.reporter_email) && <InfoBlock label="Email" value={<a href={`mailto:${task.reporter_email}`} style={{ color: T.green, textDecoration: 'none' }}>{task.reporter_email}</a>} />}
                {hasPhone(task.reporter_phone) && <InfoBlock label="Phone" value={fmtPhone(task.reporter_phone)} />}
              </Card>
              {/* Location */}
              <Card style={{ padding: 20 }}>
                <div style={{ fontWeight: 700, fontSize: 12, color: T.textSoft, textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: 12 }}>📍 Location</div>
                <div style={{ fontSize: 14, color: T.text, lineHeight: 1.5, marginBottom: 12 }}>{task.location_address}</div>
                <button onClick={() => window.open(`https://maps.google.com/?q=${encodeURIComponent(task.location_address)}`, '_blank')} style={{ background: T.forest, color: 'white', border: 'none', borderRadius: T.radiusSm, padding: '8px 16px', fontSize: 13, fontWeight: 600, cursor: 'pointer', display: 'inline-flex', alignItems: 'center', gap: 6 }}>
                  🗺️ View on Map
                </button>
              </Card>
              {/* Timeline */}
              <Card style={{ padding: 20 }}>
                <div style={{ fontWeight: 700, fontSize: 12, color: T.textSoft, textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: 14 }}>⏱️ Timeline</div>
                <InfoBlock label="Reported" value={fmtDate(task.submitted_at)} />
                {task.assigned_at && <InfoBlock label="Assigned" value={fmtDate(task.assigned_at)} />}
                {task.started_at && <InfoBlock label="Started" value={fmtDate(task.started_at)} />}
              </Card>
            </div>

            {/* Right col */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
              {/* Description */}
              <Card style={{ padding: 20 }}>
                <div style={{ fontWeight: 700, fontSize: 12, color: T.textSoft, textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: 12 }}>📝 Description</div>
                <p style={{ fontSize: 14, color: T.text, lineHeight: 1.7, margin: '0 0 12px' }}>{task.description}</p>
                {task.user_note && (
                  <div style={{ background: T.amberLt, borderLeft: `3px solid ${T.amber}`, borderRadius: T.radiusXs, padding: '10px 14px' }}>
                    <div style={{ fontSize: 11, fontWeight: 700, color: T.amber, textTransform: 'uppercase', marginBottom: 4 }}>Reporter's Note</div>
                    <div style={{ fontSize: 13, color: T.text }}>{task.user_note}</div>
                  </div>
                )}
              </Card>
              {/* Evidence */}
              <Card style={{ padding: 20 }}>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 14 }}>
                  <div style={{ fontWeight: 700, fontSize: 12, color: T.textSoft, textTransform: 'uppercase', letterSpacing: '0.06em' }}>📸 Evidence Photos</div>
                  {task.task_status_id === 2 && !evidence.length && !showUpload && (
                    <button onClick={() => setShowUpload(true)} style={{ background: T.green, color: 'white', border: 'none', borderRadius: T.radiusSm, padding: '6px 12px', fontSize: 12, fontWeight: 700, cursor: 'pointer' }}>+ Upload</button>
                  )}
                </div>
                {evidence.length > 0 ? (
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 10 }}>
                    {evidence.map(p => (
                      <div key={p.proof_id} style={{ borderRadius: T.radiusSm, overflow: 'hidden', cursor: 'pointer', border: `1px solid ${T.border}`, position: 'relative' }} onClick={() => setZoom(imgUrl(p.proof_url))}>
                        <img src={imgUrl(p.proof_url)} alt="" style={{ width: '100%', height: 100, objectFit: 'cover', display: 'block' }} onError={e => { (e.currentTarget as any).style.display = 'none'; }} />
                        <div style={{ fontSize: 10, color: T.textSoft, padding: '4px 8px', background: T.sand }}>{fmtShort(p.uploaded_at)}</div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div style={{ textAlign: 'center', padding: '28px 0', color: T.textSoft, fontSize: 13 }}>No evidence uploaded yet</div>
                )}
              </Card>
              {/* Admin notes */}
              {adminNotes.length > 0 && (
                <Card style={{ padding: 20 }}>
                  <div style={{ fontWeight: 700, fontSize: 12, color: T.textSoft, textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: 14 }}>📌 Admin Notes</div>
                  {adminNotes.map(n => (
                    <div key={n.note_id} style={{ background: T.sand, borderLeft: `3px solid ${T.forest}`, borderRadius: T.radiusXs, padding: '10px 14px', marginBottom: 10 }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 6 }}>
                        <span style={{ fontWeight: 700, fontSize: 13, color: T.forest }}>{n.admin_name || 'Admin'}</span>
                        <span style={{ fontSize: 11, color: T.textSoft }}>{fmtRel(n.created_at)}</span>
                      </div>
                      <div style={{ fontSize: 13, color: T.text, lineHeight: 1.5 }}>{n.note_text}</div>
                    </div>
                  ))}
                </Card>
              )}
            </div>
          </div>

          <div style={{ padding: '0 24px 24px', display: 'flex', justifyContent: 'flex-end' }}>
            <button onClick={onClose} style={{ padding: '10px 24px', borderRadius: T.radiusSm, border: `1.5px solid ${T.border}`, background: 'transparent', color: T.textMid, fontWeight: 600, cursor: 'pointer', fontSize: 14 }}>Close</button>
          </div>
        </div>
      </div>

      {/* Zoom lightbox */}
      {zoom && (
        <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.92)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1100 }} onClick={() => setZoom(null)}>
          <img src={zoom} alt="" style={{ maxWidth: '90%', maxHeight: '90%', objectFit: 'contain', borderRadius: T.radiusSm }} />
          <button onClick={() => setZoom(null)} style={{ position: 'absolute', top: 20, right: 20, background: 'rgba(255,255,255,0.1)', border: 'none', borderRadius: '50%', width: 42, height: 42, fontSize: 22, color: 'white', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>×</button>
        </div>
      )}

      {showUpload && (
        <UploadEvidenceModal isOpen={showUpload} onClose={() => setShowUpload(false)} onSubmit={(f, n) => { onUploadEvidence(task.task_id, f, n); setShowUpload(false); }} taskId={task.task_id} />
      )}
    </>
  );
};

// ─── Report Detail Modal (User Dashboard) ─────────────────────────────────────
const ReportDetailModal: React.FC<{
  report: Report | null; isOpen: boolean; onClose: () => void;
  userPhone?: string; userEmail?: string; userName?: string;
  evidence?: TaskProof[]; notes?: TaskCompletionNote[]; loading?: boolean;
}> = ({ report, isOpen, onClose, userPhone, userEmail, userName, evidence = [], notes = [], loading = false }) => {
  const [tab, setTab] = useState<'info' | 'evidence' | 'notes'>('info');
  const [zoom, setZoom] = useState<string | null>(null);
  const [imgErrs, setImgErrs] = useState<Record<number, boolean>>({});
  if (!isOpen || !report) return null;

  const repName  = report.reporter_name || userName || 'Anonymous';
  const phone    = report.reporter_phone || userPhone;
  const email    = report.reporter_email || userEmail;
  const volName  = report.volunteer_name;
  const done     = report.status_id === 4;
  const sc       = statusColor(report.status_name);

  const Row: React.FC<{ icon: string; label: string; value: React.ReactNode }> = ({ icon, label, value }) => (
    <div style={{ display: 'flex', gap: 12, alignItems: 'flex-start', padding: '10px 0', borderBottom: `1px solid ${T.border}` }}>
      <span style={{ fontSize: 16, width: 20, flexShrink: 0, marginTop: 1 }}>{icon}</span>
      <div style={{ flex: 1 }}>
        <div style={{ fontSize: 11, fontWeight: 700, color: T.textSoft, textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: 2 }}>{label}</div>
        <div style={{ fontSize: 14, color: T.text, fontWeight: 500, lineHeight: 1.4 }}>{value}</div>
      </div>
    </div>
  );

  return (
    <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.5)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1000, padding: 20 }} onClick={onClose}>
      <div style={{ background: T.white, borderRadius: T.radiusLg, width: '100%', maxWidth: 680, maxHeight: '88vh', display: 'flex', flexDirection: 'column', boxShadow: `0 28px 70px ${T.shadowLg}` }} onClick={e => e.stopPropagation()}>

        {/* Top strip with animal */}
        <div style={{ background: `linear-gradient(135deg, ${T.forest} 0%, ${T.green} 100%)`, padding: '20px 24px', borderRadius: `${T.radiusLg} ${T.radiusLg} 0 0`, position: 'relative', overflow: 'hidden' }}>
          <div style={{ position: 'absolute', top: -30, right: -30, width: 120, height: 120, background: 'rgba(255,255,255,0.06)', borderRadius: '50%' }} />
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
              <div style={{ width: 52, height: 52, borderRadius: T.radiusSm, background: 'rgba(255,255,255,0.12)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 28, border: `1.5px solid rgba(255,255,255,0.2)` }}>
                {animalEmoji(report.animal_type)}
              </div>
              <div>
                <div style={{ fontWeight: 800, fontSize: 17, color: 'white', lineHeight: 1.2 }}>Report #{report.report_id}</div>
                <div style={{ fontSize: 13, color: T.mint, marginTop: 3 }}>{report.animal_type} · {report.animal_condition}</div>
              </div>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
              <Pill bg={sc.bg} color={sc.color}>{statusLabel(report.status_name)}</Pill>
              <button onClick={onClose} style={{ background: 'rgba(255,255,255,0.15)', border: 'none', borderRadius: T.radiusSm, width: 32, height: 32, cursor: 'pointer', fontSize: 18, color: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>×</button>
            </div>
          </div>
          {done && (
            <div style={{ display: 'flex', gap: 6, marginTop: 14 }}>
              {(['info', 'evidence', 'notes'] as const).map(t => (
                <button key={t} onClick={() => setTab(t)} style={{ padding: '5px 14px', borderRadius: 20, border: 'none', background: tab === t ? 'white' : 'rgba(255,255,255,0.15)', color: tab === t ? T.forest : 'white', fontWeight: 700, fontSize: 12, cursor: 'pointer', textTransform: 'capitalize' }}>
                  {t === 'info' ? '📋 Details' : t === 'evidence' ? `📸 Evidence${evidence.length ? ` (${evidence.length})` : ''}` : `📝 Notes${notes.length ? ` (${notes.length})` : ''}`}
                </button>
              ))}
            </div>
          )}
          {!done && (
            <div style={{ display: 'flex', gap: 6, marginTop: 14 }}>
              <button style={{ padding: '5px 14px', borderRadius: 20, border: 'none', background: 'white', color: T.forest, fontWeight: 700, fontSize: 12, cursor: 'pointer' }}>📋 Details</button>
            </div>
          )}
        </div>

        {/* Scrollable content */}
        <div style={{ flex: 1, overflowY: 'auto', padding: '20px 24px' }}>
          {tab === 'info' && (
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0 24px' }}>
              <div>
                <Row icon="👤" label="Reporter" value={repName} />
                {hasEmail(email) && <Row icon="✉️" label="Email" value={<a href={`mailto:${email}`} style={{ color: T.green, textDecoration: 'none', fontWeight: 600 }}>{email}</a>} />}
                {hasPhone(phone) && <Row icon="📱" label="Phone" value={<span style={{ fontWeight: 700, color: T.forest }}>{fmtPhone(phone)}</span>} />}
                <Row icon="🆔" label="User ID" value={`#${report.user_id}`} />
                <Row icon="📅" label="Submitted" value={fmtShort(report.submitted_at)} />
              </div>
              <div>
                <Row icon="🐾" label="Animal" value={report.animal_type} />
                <Row icon="💊" label="Condition" value={<Pill bg={T.amberLt} color={T.amber}>{report.animal_condition}</Pill>} />
                <Row icon="📍" label="Location" value={<span style={{ fontStyle: 'italic', lineHeight: 1.4, display: 'block' }}>{report.location_address}</span>} />
                {volName && <Row icon="🦸" label="Ranger" value={<span style={{ fontWeight: 700, color: T.forest }}>{volName}</span>} />}
              </div>
              {/* Description full-width */}
              <div style={{ gridColumn: '1 / -1', marginTop: 4 }}>
                <div style={{ background: T.sand, borderRadius: T.radiusSm, padding: '14px 16px', borderLeft: `3px solid ${T.sage}` }}>
                  <div style={{ fontSize: 11, fontWeight: 700, color: T.textSoft, textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: 8 }}>📝 Description</div>
                  <div style={{ fontSize: 14, color: T.text, lineHeight: 1.7 }}>{report.description}</div>
                </div>
              </div>
            </div>
          )}

          {tab === 'evidence' && done && (
            loading ? (
              <div style={{ textAlign: 'center', padding: '40px 0', color: T.textSoft, fontSize: 14 }}>Loading evidence…</div>
            ) : evidence.length > 0 ? (
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 12 }}>
                {evidence.map(p => {
                  const url = imgUrl(p.proof_url);
                  const errored = imgErrs[p.proof_id];
                  return (
                    <div key={p.proof_id} style={{ borderRadius: T.radiusSm, overflow: 'hidden', border: `1px solid ${T.border}`, cursor: errored ? 'default' : 'pointer', transition: 'all 0.2s', boxShadow: `0 2px 8px ${T.shadow}` }} onClick={() => !errored && setZoom(url)}>
                      {!errored ? (
                        <img src={url} alt="" style={{ width: '100%', height: 120, objectFit: 'cover', display: 'block' }} onError={() => setImgErrs(p2 => ({ ...p2, [p.proof_id]: true }))} />
                      ) : (
                        <div style={{ width: '100%', height: 120, background: T.sand, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 28, color: T.textSoft }}>🖼️</div>
                      )}
                      <div style={{ padding: '5px 8px', fontSize: 10, color: T.textSoft, background: T.cream }}>{new Date(p.uploaded_at).toLocaleDateString()}</div>
                    </div>
                  );
                })}
              </div>
            ) : (
              <div style={{ textAlign: 'center', padding: '40px 0', color: T.textSoft, fontSize: 14 }}>No evidence photos available</div>
            )
          )}

          {tab === 'notes' && done && (
            loading ? (
              <div style={{ textAlign: 'center', padding: '40px 0', color: T.textSoft, fontSize: 14 }}>Loading notes…</div>
            ) : notes.length > 0 ? (
              <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                {notes.map(n => (
                  <div key={n.note_id} style={{ background: T.sand, borderRadius: T.radiusSm, padding: '14px 16px', borderLeft: `3px solid ${T.forest}` }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 8 }}>
                      <span style={{ fontWeight: 700, fontSize: 13, color: T.forest }}>{n.volunteer_name || 'Volunteer'}</span>
                      <span style={{ fontSize: 11, color: T.textSoft }}>{fmtDate(n.created_at)}</span>
                    </div>
                    <div style={{ fontSize: 14, color: T.text, lineHeight: 1.6 }}>{n.note_text}</div>
                  </div>
                ))}
              </div>
            ) : (
              <div style={{ textAlign: 'center', padding: '40px 0', color: T.textSoft, fontSize: 14 }}>No notes available</div>
            )
          )}
        </div>

        <div style={{ padding: '14px 24px', borderTop: `1px solid ${T.border}`, display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: T.cream, borderRadius: `0 0 ${T.radiusLg} ${T.radiusLg}` }}>
          {report.task_id ? <span style={{ fontSize: 12, color: T.textSoft, fontWeight: 600 }}>Task #{report.task_id}</span> : <span />}
          <button onClick={onClose} style={{ padding: '9px 22px', borderRadius: T.radiusSm, border: `1.5px solid ${T.border}`, background: 'transparent', color: T.textMid, fontWeight: 600, cursor: 'pointer', fontSize: 14 }}>Close</button>
        </div>
      </div>

      {zoom && (
        <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.92)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1100 }} onClick={() => setZoom(null)}>
          <img src={zoom} alt="" style={{ maxWidth: '90%', maxHeight: '90%', objectFit: 'contain', borderRadius: T.radiusSm }} />
          <button onClick={() => setZoom(null)} style={{ position: 'absolute', top: 20, right: 20, background: 'rgba(255,255,255,0.1)', border: 'none', borderRadius: '50%', width: 42, height: 42, fontSize: 22, color: 'white', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>×</button>
        </div>
      )}
    </div>
  );
};

// ─── Admin Dashboard ───────────────────────────────────────────────────────────
const AdminDashboard: React.FC<{ stats: any; reports: Report[]; reportsLoading: boolean }> = ({ reports, reportsLoading }) => {
  const [showMap, setShowMap] = useState(false);
  const [mapData, setMapData] = useState<Report[]>([]);
  useEffect(() => { if (reports.length) setMapData(reports.filter(r => r.location_address && r.location_address.trim() !== '')); }, [reports]);

  const total     = reports.length;
  const submitted = reports.filter(r => r.status_name?.toLowerCase() === 'submitted').length;
  const assigned  = reports.filter(r => r.status_name?.toLowerCase() === 'assigned').length;
  const inProg    = reports.filter(r => r.status_name?.toLowerCase() === 'in_progress').length;
  const completed = reports.filter(r => r.status_name?.toLowerCase() === 'completed').length;
  const reporters = new Set(reports.map(r => r.user_id)).size;

  const chartData = [
    { name: 'Total', value: total }, { name: 'Active', value: submitted + assigned + inProg },
    { name: 'Done', value: completed }, { name: 'Reporters', value: reporters },
  ];
  const COLORS = [T.textMid, T.amber, T.green, T.sage];

  const getCommon = () => {
    const c = reports.reduce((a, r) => { if (r.animal_type) a[r.animal_type] = (a[r.animal_type] || 0) + 1; return a; }, {} as Record<string, number>);
    let mx = 0, best = 'N/A'; Object.entries(c).forEach(([k, v]) => { if (v > mx) { mx = v; best = k; } }); return best;
  };

  const StatTile: React.FC<{ icon: string; label: string; value: number | string; accent: string }> = ({ icon, label, value, accent }) => (
    <div style={{ background: T.white, borderRadius: T.radius, padding: '22px 24px', border: `1px solid ${T.border}`, boxShadow: `0 2px 8px ${T.shadow}`, display: 'flex', alignItems: 'center', gap: 16 }}>
      <div style={{ width: 52, height: 52, borderRadius: T.radiusSm, background: accent + '18', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 24, flexShrink: 0 }}>{icon}</div>
      <div>
        <div style={{ fontSize: 28, fontWeight: 800, color: T.text, lineHeight: 1 }}>{reportsLoading ? '…' : value}</div>
        <div style={{ fontSize: 12, fontWeight: 600, color: T.textSoft, textTransform: 'uppercase', letterSpacing: '0.05em', marginTop: 4 }}>{label}</div>
      </div>
    </div>
  );

  return (
    <div style={{ maxWidth: 1200, margin: '0 auto' }}>
      {/* Header */}
      <div style={{ background: `linear-gradient(135deg, ${T.forest}, ${T.green})`, borderRadius: T.radiusLg, padding: '32px 40px', marginBottom: 28, position: 'relative', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', top: -60, right: -60, width: 220, height: 220, background: 'rgba(255,255,255,0.06)', borderRadius: '50%' }} />
        <div style={{ position: 'absolute', bottom: -40, left: -40, width: 160, height: 160, background: 'rgba(255,255,255,0.04)', borderRadius: '50%' }} />
        <div style={{ position: 'relative', zIndex: 1 }}>
          <div style={{ fontSize: 13, color: T.mint, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: 8 }}>Admin Portal</div>
          <h1 style={{ color: 'white', margin: 0, fontSize: 32, fontWeight: 800 }}>ResQAll Command Center</h1>
          <p style={{ color: 'rgba(255,255,255,0.75)', margin: '8px 0 0', fontSize: 15 }}>Monitor and manage all rescue operations</p>
        </div>
      </div>

      {/* Stats */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 16, marginBottom: 28 }}>
        <StatTile icon="📋" label="Total Reports"  value={total}                           accent={T.textMid} />
        <StatTile icon="⚡" label="Active Cases"   value={submitted + assigned + inProg}   accent={T.amber}   />
        <StatTile icon="✅" label="Completed"      value={completed}                       accent={T.green}   />
        <StatTile icon="👥" label="Reporters"      value={reporters}                       accent={T.sage}    />
      </div>

      {/* Charts + quicklinks */}
      <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: 20, marginBottom: 28 }}>
        <Card style={{ padding: 24 }}>
          <div style={{ fontWeight: 700, fontSize: 15, color: T.text, marginBottom: 20 }}>Status Distribution</div>
          <ResponsiveContainer width="100%" height={240}>
            <BarChart data={chartData}>
              <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: T.textMid }} />
              <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: T.textSoft }} />
              <Tooltip cursor={{ fill: T.sand }} contentStyle={{ borderRadius: 8, border: `1px solid ${T.border}`, fontSize: 13 }} />
              <Bar dataKey="value" radius={[6, 6, 0, 0]} barSize={44}>{chartData.map((_, i) => <Cell key={i} fill={COLORS[i % COLORS.length]} />)}</Bar>
            </BarChart>
          </ResponsiveContainer>
        </Card>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
          <div style={{ background: `linear-gradient(135deg, ${T.amberLt}, #fde8b0)`, borderRadius: T.radius, padding: '20px 22px', border: `1px solid #f5c842`, flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
            <div style={{ fontWeight: 800, fontSize: 14, color: T.amber, marginBottom: 6 }}>⚡ Quick Links</div>
            <Link to="/admin/users" style={{ display: 'flex', alignItems: 'center', gap: 8, background: T.forest, color: 'white', padding: '9px 14px', borderRadius: T.radiusSm, textDecoration: 'none', fontWeight: 700, fontSize: 13, marginBottom: 8 }}>👥 Manage Volunteers</Link>
            <Link to="/admin/rescue-reports" style={{ display: 'flex', alignItems: 'center', gap: 8, background: T.blue, color: 'white', padding: '9px 14px', borderRadius: T.radiusSm, textDecoration: 'none', fontWeight: 700, fontSize: 13 }}>📋 All Reports</Link>
          </div>
          {/* Most common */}
          <Card style={{ padding: 18 }}>
            <div style={{ fontSize: 11, fontWeight: 700, color: T.textSoft, textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: 6 }}>Most Reported</div>
            <div style={{ fontSize: 22, fontWeight: 800, color: T.forest }}>{animalEmoji(getCommon())} {getCommon()}</div>
          </Card>
        </div>
      </div>

      {/* Heatmap */}
      <Card style={{ marginBottom: 28, overflow: 'hidden' }}>
        <div style={{ padding: '20px 24px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', borderBottom: `1px solid ${T.border}` }}>
          <div style={{ fontWeight: 700, fontSize: 15, color: T.text }}>🗺️ Incident Heatmap</div>
          <button onClick={() => setShowMap(m => !m)} style={{ background: showMap ? T.red : T.green, color: 'white', border: 'none', borderRadius: T.radiusSm, padding: '7px 16px', fontSize: 13, fontWeight: 700, cursor: 'pointer' }}>
            {showMap ? 'Hide Map' : 'Show Map'}
          </button>
        </div>
        {showMap && (
          <div style={{ padding: 24 }}>
            {mapData.length > 0 ? <Heatmap reports={mapData} height="420px" /> : <div style={{ textAlign: 'center', padding: '40px 0', color: T.textSoft }}>No location data available</div>}
          </div>
        )}
      </Card>

      {/* Recent table */}
      <Card style={{ overflow: 'hidden' }}>
        <div style={{ padding: '20px 24px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', borderBottom: `1px solid ${T.border}` }}>
          <div style={{ fontWeight: 700, fontSize: 15, color: T.text }}>Recent Reports ({reports.length})</div>
          <Link to="/admin/rescue-reports" style={{ color: T.green, textDecoration: 'none', fontWeight: 700, fontSize: 13 }}>View All →</Link>
        </div>
        <div style={{ overflowX: 'auto' }}>
          {reportsLoading ? (
            <div style={{ textAlign: 'center', padding: '32px 0', color: T.textSoft }}>Loading…</div>
          ) : reports.length > 0 ? (
            <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 13 }}>
              <thead>
                <tr style={{ background: T.cream }}>
                  {['ID', 'Animal', 'Condition', 'Location', 'Reporter', 'Volunteer', 'Date', 'Status'].map(h => (
                    <th key={h} style={{ padding: '12px 16px', textAlign: 'left', fontWeight: 700, color: T.textMid, textTransform: 'uppercase', letterSpacing: '0.04em', fontSize: 11, borderBottom: `2px solid ${T.border}` }}>{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {reports.slice(0, 10).map((r, i) => {
                  const sc = statusColor(r.status_name);
                  return (
                    <tr key={r.report_id} style={{ background: i % 2 === 0 ? T.white : T.cream, transition: 'background 0.15s' }}>
                      <td style={{ padding: '12px 16px', color: T.forest, fontWeight: 700 }}>#{r.report_id}</td>
                      <td style={{ padding: '12px 16px' }}>{animalEmoji(r.animal_type)} {r.animal_type || '—'}</td>
                      <td style={{ padding: '12px 16px', color: T.textMid }}>{r.animal_condition || '—'}</td>
                      <td style={{ padding: '12px 16px', color: T.textMid, maxWidth: 180, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{r.location_address || '—'}</td>
                      <td style={{ padding: '12px 16px' }}>{r.reporter_name || 'Anonymous'}</td>
                      <td style={{ padding: '12px 16px' }}>{r.volunteer_name ? <span style={{ color: T.forest, fontWeight: 600 }}>{r.volunteer_name}</span> : <span style={{ color: T.textSoft, fontStyle: 'italic' }}>Unassigned</span>}</td>
                      <td style={{ padding: '12px 16px', color: T.textSoft }}>{fmtShort(r.submitted_at)}</td>
                      <td style={{ padding: '12px 16px' }}><Pill bg={sc.bg} color={sc.color}>{statusLabel(r.status_name)}</Pill></td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          ) : (
            <div style={{ textAlign: 'center', padding: '40px 0', color: T.textSoft }}>No reports found</div>
          )}
        </div>
      </Card>
    </div>
  );
};

// ─── Volunteer Dashboard ───────────────────────────────────────────────────────
const VolunteerDashboard: React.FC<{ user: any; stats: any; reports: Report[]; reportsLoading: boolean; userProfile: UserProfile | null }> = ({ user, userProfile }) => {
  const [active,   setActive]   = useState<VolunteerTask[]>([]);
  const [pending,  setPending]  = useState<VolunteerTask[]>([]);
  const [loading,  setLoading]  = useState(true);
  const [err,      setErr]      = useState<string | null>(null);
  const [actLoad,  setActLoad]  = useState(false);
  const [showAllA, setShowAllA] = useState(false);
  const [showAllP, setShowAllP] = useState(false);
  const [selTask,  setSelTask]  = useState<VolunteerTask | null>(null);
  const [taskOpen, setTaskOpen] = useState(false);
  const [decOpen,  setDecOpen]  = useState(false);
  const [decId,    setDecId]    = useState<number | null>(null);
  const [cmpCnt,   setCmpCnt]   = useState(0);
  const [evidence, setEvidence] = useState<Record<number, TaskProof[]>>({});
  const [anotes,   setAnotes]   = useState<Record<number, AdminNote[]>>({});
  const [details,  setDetails]  = useState<Record<number, VolunteerTask>>({});

  useEffect(() => {
    if (!user?.user_id) return;
    (async () => {
      try {
        setLoading(true); setErr(null);
        const token = getToken();
        if (!token) { setErr('No auth token'); return; }
        const res = await fetch('http://localhost:5000/api/volunteers/tasks', { headers: { 'Authorization': `Bearer ${token}`, 'Content-Type': 'application/json' } });
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        const data = await res.json();
        if (data.success && data.data) {
          setPending(data.data.filter((t: VolunteerTask) => t.task_status_id === 1));
          setActive(data.data.filter((t: VolunteerTask) => t.task_status_id === 2));
          setCmpCnt(data.data.filter((t: VolunteerTask) => t.task_status_id === 3).length);
        }
      } catch (e) { setErr(e instanceof Error ? e.message : 'Unknown error'); }
      finally { setLoading(false); }
    })();
  }, [user?.user_id]);

  const fetchEvidence = async (taskId: number) => {
    const token = getToken();
    const res = await fetch(`http://localhost:5000/api/tasks/${taskId}/evidence`, { headers: { 'Authorization': `Bearer ${token}` } });
    const d = await res.json();
    if (d.success) setEvidence(p => ({ ...p, [taskId]: d.data }));
  };
  const fetchAnotes = async (reportId: number, taskId: number) => {
    const token = getToken();
    const res = await fetch(`http://localhost:5000/api/reports/${reportId}/admin-notes`, { headers: { 'Authorization': `Bearer ${token}` } });
    const d = await res.json();
    if (d.success) setAnotes(p => ({ ...p, [taskId]: d.data }));
  };
  const fetchFull = async (taskId: number) => {
    const token = getToken();
    const res = await fetch(`http://localhost:5000/api/tasks/task/${taskId}/full-details`, { headers: { 'Authorization': `Bearer ${token}` } });
    const d = await res.json();
    if (d.success) { setDetails(p => ({ ...p, [taskId]: d.data.task })); return d.data; }
    return null;
  };

  const accept = async (taskId: number) => {
    setActLoad(true);
    const token = getToken();
    const res = await fetch(`http://localhost:5000/api/volunteers/tasks/${taskId}/accept`, { method: 'PATCH', headers: { 'Authorization': `Bearer ${token}`, 'Content-Type': 'application/json' } });
    const d = await res.json();
    if (d.success) { const t = pending.find(x => x.task_id === taskId); if (t) { setPending(p => p.filter(x => x.task_id !== taskId)); setActive(p => [...p, { ...t, task_status_id: 2, task_status: 'in_progress', started_at: new Date().toISOString() }]); } }
    setActLoad(false);
  };
  const decline = async (taskId: number, reason: string) => {
    setActLoad(true);
    const token = getToken();
    const res = await fetch(`http://localhost:5000/api/volunteers/tasks/${taskId}/decline`, { method: 'PATCH', headers: { 'Authorization': `Bearer ${token}`, 'Content-Type': 'application/json' }, body: JSON.stringify({ reason }) });
    const d = await res.json();
    if (d.success) setPending(p => p.filter(x => x.task_id !== taskId));
    setActLoad(false); setDecOpen(false); setDecId(null);
  };
  const upload = async (taskId: number, file: File, notes: string) => {
    setActLoad(true);
    const token = getToken();
    const fd = new FormData(); fd.append('proofs', file);
    const up = await (await fetch(`http://localhost:5000/api/tasks/${taskId}/upload-proofs`, { method: 'POST', headers: { 'Authorization': `Bearer ${token}` }, body: fd })).json();
    if (!up.success) { setActLoad(false); return; }
    await fetch(`http://localhost:5000/api/tasks/${taskId}/completion-notes`, { method: 'POST', headers: { 'Authorization': `Bearer ${token}`, 'Content-Type': 'application/json' }, body: JSON.stringify({ note_text: notes, volunteer_id: user.user_id }) });
    fetchEvidence(taskId);
    setActLoad(false);
  };
  const viewTask = async (task: VolunteerTask) => {
    setSelTask(task);
    const full = await fetchFull(task.task_id);
    if (full) { setSelTask(full.task); setEvidence(p => ({ ...p, [task.task_id]: full.evidence || [] })); setAnotes(p => ({ ...p, [task.task_id]: full.admin_notes || [] })); }
    else { await Promise.all([fetchEvidence(task.task_id), fetchAnotes(task.report_id, task.task_id)]); }
    setTaskOpen(true);
  };

  const dispActive  = showAllA ? active  : active.slice(0, 3);
  const dispPending = showAllP ? pending : pending.slice(0, 3);
  const rate = cmpCnt + active.length > 0 ? Math.round((cmpCnt / (cmpCnt + active.length)) * 100) : 0;

  const MiniStat: React.FC<{ label: string; value: number | string; sub: string; grad: string }> = ({ label, value, sub, grad }) => (
    <div style={{ background: grad, borderRadius: T.radius, padding: '20px 22px', color: 'white' }}>
      <div style={{ fontSize: 11, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.07em', opacity: 0.85, marginBottom: 8 }}>{label}</div>
      <div style={{ fontSize: 36, fontWeight: 800, lineHeight: 1 }}>{value}</div>
      <div style={{ fontSize: 12, opacity: 0.75, marginTop: 6 }}>{sub}</div>
    </div>
  );

  return (
    <div style={{ maxWidth: 1200, margin: '0 auto' }}>
      {/* Welcome strip */}
      <div style={{ background: `linear-gradient(135deg, ${T.forest}, ${T.green})`, borderRadius: T.radiusLg, padding: '28px 36px', marginBottom: 24, display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: 16, position: 'relative', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', top: -40, right: -40, width: 180, height: 180, background: 'rgba(255,255,255,0.05)', borderRadius: '50%' }} />
        <div style={{ position: 'relative', zIndex: 1 }}>
          <div style={{ fontSize: 13, color: T.mint, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: 6 }}>Volunteer Portal</div>
          <h1 style={{ color: 'white', margin: 0, fontSize: 26, fontWeight: 800 }}>Welcome back, Ranger {user.username}!</h1>
          <p style={{ color: 'rgba(255,255,255,0.75)', margin: '6px 0 0', fontSize: 14 }}>Your dedication saves lives. Ready for your next mission?</p>
          {userProfile?.email && <div style={{ marginTop: 8, fontSize: 13, color: T.mint }}>✉️ {userProfile.email}</div>}
        </div>
        <div style={{ display: 'flex', gap: 10, position: 'relative', zIndex: 1 }}>
          <Link to="/tasks"   style={{ background: 'rgba(255,255,255,0.15)', color: 'white', padding: '9px 18px', borderRadius: T.radiusSm, textDecoration: 'none', fontWeight: 700, fontSize: 13, border: '1.5px solid rgba(255,255,255,0.25)' }}>📋 Mission Board</Link>
          <Link to="/profile" style={{ background: 'rgba(255,255,255,0.15)', color: 'white', padding: '9px 18px', borderRadius: T.radiusSm, textDecoration: 'none', fontWeight: 700, fontSize: 13, border: '1.5px solid rgba(255,255,255,0.25)' }}>🏆 Profile</Link>
        </div>
      </div>

      {/* Stats row */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 16, marginBottom: 28 }}>
        <MiniStat label="Total Rescues"   value={cmpCnt}        sub="Lives saved ✓"       grad={`linear-gradient(135deg, ${T.forest}, ${T.greenLt})`} />
        <MiniStat label="Active Missions" value={active.length} sub="In progress"          grad="linear-gradient(135deg, #1565c0, #0d47a1)" />
        <MiniStat label="Pending"         value={pending.length} sub="Awaiting decision"   grad={`linear-gradient(135deg, #e07a20, #b8560e)`} />
        <MiniStat label="Success Rate"    value={`${rate}%`}    sub="Mission success"       grad={`linear-gradient(135deg, ${T.sage}, #5a8a4a)`} />
      </div>

      {/* Pending tasks */}
      {pending.length > 0 && (
        <div style={{ marginBottom: 28 }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 16 }}>
            <h2 style={{ margin: 0, fontSize: 18, fontWeight: 800, color: T.text, display: 'flex', alignItems: 'center', gap: 8 }}>⏳ Pending Confirmation <span style={{ background: T.amberLt, color: T.amber, fontSize: 13, fontWeight: 700, padding: '2px 10px', borderRadius: 20 }}>{pending.length}</span></h2>
            {pending.length > 3 && <button onClick={() => setShowAllP(s => !s)} style={{ background: 'transparent', border: `1.5px solid ${T.border}`, borderRadius: T.radiusSm, padding: '6px 14px', fontSize: 13, fontWeight: 600, color: T.textMid, cursor: 'pointer' }}>{showAllP ? 'Show Less ↑' : `View All (${pending.length}) →`}</button>}
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 16 }}>
            {dispPending.map(task => {
              const dm = details[task.task_id] || task;
              return (
                <Card key={task.task_id} hover style={{ overflow: 'hidden' }}>
                  <div style={{ background: '#e07a20', padding: '14px 18px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                      <span style={{ background: 'rgba(255,255,255,0.2)', color: 'white', padding: '3px 10px', borderRadius: 20, fontSize: 12, fontWeight: 700 }}>#{task.report_id}</span>
                      <Pill bg="rgba(255,255,255,0.2)" color="white">ASSIGNED</Pill>
                    </div>
                    <span style={{ color: 'rgba(255,255,255,0.85)', fontSize: 12 }}>{fmtShort(dm.submitted_at)}</span>
                  </div>
                  <div style={{ padding: 18 }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 12 }}>
                      <div style={{ width: 50, height: 50, borderRadius: T.radiusSm, background: T.sand, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 28 }}>{animalEmoji(task.animal_type)}</div>
                      <div>
                        <div style={{ fontWeight: 700, fontSize: 15, color: T.text }}>{task.animal_type}</div>
                        <Pill bg={T.redLt} color={T.red}>{task.animal_condition}</Pill>
                      </div>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: 13, color: T.textMid, marginBottom: 10 }}>📍 <span style={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{task.location_address}</span></div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '8px 10px', background: '#fef2e8', borderRadius: T.radiusSm, marginBottom: 12 }}>
                      <Avatar name={task.reporter_name} size={28} bg={T.amber} />
                      <div>
                        <div style={{ fontWeight: 600, fontSize: 13, color: T.text }}>{task.reporter_name || 'Anonymous'}</div>
                        {hasPhone(task.reporter_phone) && <div style={{ fontSize: 11, color: T.textSoft }}>{fmtPhone(task.reporter_phone)}</div>}
                      </div>
                    </div>
                    <p style={{ fontSize: 13, color: T.textMid, lineHeight: 1.5, margin: '0 0 14px', overflow: 'hidden', display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical' as any }}>
                      {task.description || 'No description'}
                    </p>
                    <div style={{ display: 'flex', gap: 10 }}>
                      <button onClick={() => accept(task.task_id)} disabled={actLoad} style={{ flex: 2, background: T.green, color: 'white', border: 'none', borderRadius: T.radiusSm, padding: '9px 0', fontSize: 14, fontWeight: 700, cursor: actLoad ? 'not-allowed' : 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6 }}>✓ Accept</button>
                      <button onClick={() => { setDecId(task.task_id); setDecOpen(true); }} disabled={actLoad} style={{ flex: 1, background: 'transparent', color: T.red, border: `1.5px solid ${T.red}`, borderRadius: T.radiusSm, padding: '9px 0', fontSize: 14, fontWeight: 700, cursor: actLoad ? 'not-allowed' : 'pointer' }}>✕</button>
                    </div>
                  </div>
                </Card>
              );
            })}
          </div>
        </div>
      )}

      {/* Active missions */}
      <div>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 16 }}>
          <h2 style={{ margin: 0, fontSize: 18, fontWeight: 800, color: T.text, display: 'flex', alignItems: 'center', gap: 8 }}>🚀 Active Missions <span style={{ background: '#e8f5e9', color: T.green, fontSize: 13, fontWeight: 700, padding: '2px 10px', borderRadius: 20 }}>{active.length}</span></h2>
          {active.length > 3 && <button onClick={() => setShowAllA(s => !s)} style={{ background: 'transparent', border: `1.5px solid ${T.border}`, borderRadius: T.radiusSm, padding: '6px 14px', fontSize: 13, fontWeight: 600, color: T.textMid, cursor: 'pointer' }}>{showAllA ? 'Show Less ↑' : `View All (${active.length}) →`}</button>}
        </div>

        {loading ? (
          <div style={{ textAlign: 'center', padding: '48px 0', color: T.textSoft }}>
            <div style={{ fontSize: 32, marginBottom: 12 }}>⏳</div>
            Loading missions…
          </div>
        ) : err ? (
          <Card style={{ padding: 32, textAlign: 'center' }}>
            <div style={{ fontSize: 36, marginBottom: 10 }}>⚠️</div>
            <div style={{ color: T.red, fontWeight: 600, marginBottom: 12 }}>{err}</div>
            <button onClick={() => window.location.reload()} style={{ background: T.green, color: 'white', border: 'none', borderRadius: T.radiusSm, padding: '8px 20px', cursor: 'pointer', fontWeight: 700 }}>Retry</button>
          </Card>
        ) : active.length > 0 ? (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 16 }}>
            {dispActive.map(m => {
              const dm     = details[m.task_id] || m;
              const badge  = taskBadge(m.task_status_id);
              const photos = evidence[m.task_id] || [];
              const first  = photos.length > 0 ? imgUrl(photos[0].proof_url) : null;
              return (
                <Card key={m.task_id} hover style={{ overflow: 'hidden', display: 'flex', flexDirection: 'column' }}>
                  {/* Image or placeholder */}
                  <div style={{ height: 130, background: first ? undefined : `linear-gradient(135deg, ${T.sand}, #dff0d0)`, position: 'relative', overflow: 'hidden', flexShrink: 0 }}>
                    {first && <img src={first} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} onError={e => { (e.currentTarget as any).parentElement.style.background = `linear-gradient(135deg, ${T.sand}, #dff0d0)`; (e.currentTarget as any).style.display = 'none'; }} />}
                    {!first && <div style={{ width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column', gap: 4 }}><span style={{ fontSize: 36 }}>{animalEmoji(m.animal_type)}</span><span style={{ fontSize: 11, color: T.textMid, fontWeight: 600 }}>No photo yet</span></div>}
                    <div style={{ position: 'absolute', top: 8, left: 10 }}><Pill bg={badge.bg} color={badge.color} dot={badge.dot}>{badge.text}</Pill></div>
                    <div style={{ position: 'absolute', top: 8, right: 10, background: 'rgba(0,0,0,0.3)', color: 'white', fontSize: 11, padding: '2px 8px', borderRadius: 12, fontWeight: 600 }}>#{m.report_id}</div>
                  </div>
                  <div style={{ padding: '14px 16px', flex: 1, display: 'flex', flexDirection: 'column' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 8 }}>
                      <span style={{ fontSize: 22 }}>{animalEmoji(m.animal_type)}</span>
                      <div>
                        <div style={{ fontWeight: 700, fontSize: 14, color: T.text, lineHeight: 1.2 }}>{m.animal_type} Rescue</div>
                        <div style={{ fontSize: 11, color: T.red, fontWeight: 600 }}>{m.animal_condition}</div>
                      </div>
                    </div>
                    <div style={{ fontSize: 12, color: T.textMid, marginBottom: 8, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>📍 {m.location_address}</div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '8px 10px', background: '#e8f5e9', borderRadius: T.radiusSm, marginBottom: 8 }}>
                      <Avatar name={m.reporter_name} size={26} />
                      <div>
                        <div style={{ fontWeight: 600, fontSize: 12, color: T.text }}>{m.reporter_name || 'Anonymous'}</div>
                        {hasPhone(m.reporter_phone) && <div style={{ fontSize: 11, color: T.textSoft }}>{fmtPhone(m.reporter_phone)}</div>}
                      </div>
                    </div>
                    <p style={{ fontSize: 12, color: T.textSoft, lineHeight: 1.5, margin: '0 0 10px', flex: 1, overflow: 'hidden', display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical' as any }}>
                      "{m.description || 'No description'}"
                    </p>
                    {photos.length > 0 && <div style={{ fontSize: 11, color: T.green, fontWeight: 700, marginBottom: 8 }}>📸 {photos.length} evidence photo(s)</div>}
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', fontSize: 11, color: T.textSoft, marginBottom: 12 }}>
                      <span>{fmtRel(dm.submitted_at)}</span>
                      {m.assigned_at && <span>Assigned {fmtShort(m.assigned_at)}</span>}
                    </div>
                    <button onClick={() => viewTask(m)} style={{ width: '100%', background: T.forest, color: 'white', border: 'none', borderRadius: T.radiusSm, padding: '10px 0', fontSize: 14, fontWeight: 700, cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6 }}>
                      View Details →
                    </button>
                  </div>
                </Card>
              );
            })}
          </div>
        ) : (
          <Card style={{ padding: '48px 24px', textAlign: 'center' }}>
            <div style={{ fontSize: 48, marginBottom: 12 }}>🎯</div>
            <h3 style={{ color: T.forest, margin: '0 0 8px', fontWeight: 700 }}>No Active Missions</h3>
            <p style={{ color: T.textSoft, marginBottom: 20 }}>You don't have any active rescue missions right now.</p>
            <Link to="/tasks" style={{ background: T.green, color: 'white', padding: '10px 24px', borderRadius: T.radiusSm, textDecoration: 'none', fontWeight: 700, fontSize: 14 }}>Browse Available Missions</Link>
          </Card>
        )}
      </div>

      {selTask && (
        <TaskDetailModal task={selTask} isOpen={taskOpen} onClose={() => { setTaskOpen(false); setSelTask(null); }} onUploadEvidence={upload} actionLoading={actLoad} userProfile={userProfile} evidence={evidence[selTask.task_id]} adminNotes={anotes[selTask.task_id]} />
      )}
      {decId && <DeclineModal isOpen={decOpen} onClose={() => { setDecOpen(false); setDecId(null); }} onSubmit={reason => decline(decId, reason)} taskId={decId} />}
    </div>
  );
};

// ─── Pending / Rejected ───────────────────────────────────────────────────────
const PendingVolunteerDashboard: React.FC<{ user: any }> = () => (
  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: '70vh' }}>
    <div style={{ background: T.white, borderRadius: T.radiusLg, padding: '48px 56px', textAlign: 'center', boxShadow: `0 8px 32px ${T.shadowMd}`, border: `1px solid ${T.border}`, maxWidth: 560 }}>
      <div style={{ width: 80, height: 80, borderRadius: '50%', background: T.amberLt, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 36, margin: '0 auto 20px' }}>⏰</div>
      <h2 style={{ color: T.forest, fontWeight: 800, fontSize: 24, margin: '0 0 10px' }}>Activation Pending</h2>
      <p style={{ color: T.textMid, lineHeight: 1.7, fontSize: 15, margin: 0 }}>Thank you for joining ResQAll. Our HQ is reviewing your ranger profile. You'll be notified once approved.</p>
    </div>
  </div>
);

const RejectedVolunteerDashboard: React.FC<{ user: any }> = () => (
  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: '70vh' }}>
    <div style={{ background: T.white, borderRadius: T.radiusLg, padding: '48px 56px', textAlign: 'center', boxShadow: `0 8px 32px ${T.shadowMd}`, border: `1px solid ${T.border}`, maxWidth: 560 }}>
      <div style={{ width: 80, height: 80, borderRadius: '50%', background: T.redLt, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 36, margin: '0 auto 20px' }}>❌</div>
      <h2 style={{ color: T.red, fontWeight: 800, fontSize: 24, margin: '0 0 10px' }}>Application Not Approved</h2>
      <p style={{ color: T.textMid, lineHeight: 1.7, fontSize: 15, margin: 0 }}>Unfortunately your ResQAll operative status was not approved. Contact support for more info.</p>
    </div>
  </div>
);

// ─── User Dashboard ───────────────────────────────────────────────────────────
const UserDashboard: React.FC<{
  user: any; userReports: Report[]; reportsLoading: boolean;
  onViewDetails: (r: Report) => void; userProfile: UserProfile | null;
}> = ({ user, userReports, reportsLoading, onViewDetails, userProfile }) => {
  const mine       = userReports.filter(r => Number(r.user_id) === Number(user.user_id));
  const total      = mine.length;
  const submitted  = mine.filter(r => r.status_name?.toLowerCase() === 'submitted').length;
  const inProgress = mine.filter(r => r.status_name?.toLowerCase() === 'in_progress').length;
  const done       = mine.filter(r => r.status_name?.toLowerCase() === 'completed').length;

  const StatCard: React.FC<{ icon: string; label: string; value: number; color: string }> = ({ icon, label, value, color }) => (
    <div style={{ background: T.white, borderRadius: T.radius, padding: '20px 22px', border: `1px solid ${T.border}`, boxShadow: `0 2px 8px ${T.shadow}`, display: 'flex', alignItems: 'center', gap: 16 }}>
      <div style={{ width: 48, height: 48, borderRadius: T.radiusSm, background: color + '15', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 22, border: `1.5px solid ${color}30` }}>{icon}</div>
      <div>
        <div style={{ fontSize: 26, fontWeight: 800, color: T.text, lineHeight: 1 }}>{value}</div>
        <div style={{ fontSize: 11, fontWeight: 700, color: T.textSoft, textTransform: 'uppercase', letterSpacing: '0.05em', marginTop: 4 }}>{label}</div>
      </div>
    </div>
  );

  return (
    <div style={{ maxWidth: 1200, margin: '0 auto' }}>
      {/* Hero welcome */}
      <div style={{ background: `linear-gradient(135deg, ${T.forest} 0%, ${T.green} 60%, ${T.greenLt} 100%)`, borderRadius: T.radiusLg, padding: '32px 40px', marginBottom: 28, display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: 16, position: 'relative', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', top: -50, right: -50, width: 200, height: 200, background: 'rgba(255,255,255,0.06)', borderRadius: '50%' }} />
        <div style={{ position: 'absolute', bottom: -60, left: 80, width: 280, height: 280, background: 'rgba(255,255,255,0.04)', borderRadius: '50%' }} />
        <div style={{ position: 'relative', zIndex: 1 }}>
          <div style={{ fontSize: 12, color: T.mint, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.12em', marginBottom: 8 }}>Your Dashboard</div>
          <h1 style={{ color: 'white', margin: 0, fontSize: 28, fontWeight: 800 }}>Welcome back, {user.username || 'Animal Friend'}! 👋</h1>
          <p style={{ color: 'rgba(255,255,255,0.75)', margin: '8px 0 0', fontSize: 14 }}>Your reports help rescue animals in need.</p>
          {(userProfile?.email || userProfile?.phone) && (
            <div style={{ display: 'flex', gap: 14, marginTop: 12, flexWrap: 'wrap' }}>
              {userProfile.email && <span style={{ background: 'rgba(255,255,255,0.12)', color: 'white', padding: '4px 12px', borderRadius: 20, fontSize: 12, border: '1px solid rgba(255,255,255,0.2)' }}>✉️ {userProfile.email}</span>}
              {userProfile.phone && <span style={{ background: 'rgba(255,255,255,0.12)', color: 'white', padding: '4px 12px', borderRadius: 20, fontSize: 12, border: '1px solid rgba(255,255,255,0.2)' }}>📱 {userProfile.phone}</span>}
            </div>
          )}
        </div>
        <Link to="/create-report" style={{ background: 'white', color: T.forest, padding: '12px 28px', borderRadius: 50, textDecoration: 'none', fontWeight: 800, fontSize: 15, display: 'flex', alignItems: 'center', gap: 8, boxShadow: '0 4px 16px rgba(0,0,0,0.12)', position: 'relative', zIndex: 1, border: '2px solid white', transition: 'all 0.2s', flexShrink: 0 }}>
          <span style={{ fontSize: 18 }}>+</span> New Report
        </Link>
      </div>

      {/* Stats */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 16, marginBottom: 28 }}>
        <StatCard icon="📋" label="Total Reports"  value={total}      color={T.forest}  />
        <StatCard icon="⏳" label="Submitted"      value={submitted}  color={T.blue}    />
        <StatCard icon="🚀" label="In Progress"    value={inProgress} color={T.amber}   />
        <StatCard icon="✅" label="Completed"      value={done}       color={T.green}   />
      </div>

      {/* Reports section */}
      <Card style={{ overflow: 'hidden' }}>
        <div style={{ padding: '20px 24px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', borderBottom: `1px solid ${T.border}` }}>
          <div style={{ fontWeight: 800, fontSize: 16, color: T.text }}>Your Reports <span style={{ fontSize: 14, color: T.textSoft, fontWeight: 500 }}>({total})</span></div>
          {mine.length > 3 && <Link to="/my-reports" style={{ color: T.green, textDecoration: 'none', fontWeight: 700, fontSize: 13 }}>View All →</Link>}
        </div>

        {reportsLoading ? (
          <div style={{ textAlign: 'center', padding: '48px 0', color: T.textSoft }}>Loading your reports…</div>
        ) : mine.length > 0 ? (
          <div style={{ padding: 24, display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 16 }}>
            {mine.slice(0, 6).map(r => {
              const sc = statusColor(r.status_name);
              return (
                <div key={r.report_id} style={{ background: T.cream, borderRadius: T.radius, border: `1px solid ${T.border}`, overflow: 'hidden', display: 'flex', flexDirection: 'column', transition: 'all 0.2s', cursor: 'pointer' }}
                  onMouseEnter={e => { (e.currentTarget as HTMLDivElement).style.boxShadow = `0 6px 20px ${T.shadowMd}`; (e.currentTarget as HTMLDivElement).style.borderColor = T.sage; }}
                  onMouseLeave={e => { (e.currentTarget as HTMLDivElement).style.boxShadow = 'none'; (e.currentTarget as HTMLDivElement).style.borderColor = T.border; }}>
                  {/* Card top bar */}
                  <div style={{ background: T.sand, padding: '12px 16px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', borderBottom: `1px solid ${T.border}` }}>
                    <span style={{ fontWeight: 700, color: T.forest, fontSize: 13 }}>#{r.report_id}</span>
                    <Pill bg={sc.bg} color={sc.color}>{statusLabel(r.status_name)}</Pill>
                  </div>
                  {/* Animal hero */}
                  <div style={{ padding: '16px 16px 12px', flex: 1 }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 12, background: T.white, borderRadius: T.radiusSm, padding: '10px 12px', border: `1px solid ${T.border}` }}>
                      <div style={{ width: 48, height: 48, borderRadius: T.radiusSm, background: T.sand, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 26, border: `2px solid ${T.forest}30` }}>{animalEmoji(r.animal_type)}</div>
                      <div>
                        <div style={{ fontWeight: 700, fontSize: 15, color: T.text }}>{r.animal_type || 'Unknown'}</div>
                        <div style={{ fontSize: 12, color: T.textMid, marginTop: 2 }}>{r.animal_condition}</div>
                      </div>
                    </div>
                    <div style={{ fontSize: 12, color: T.textMid, marginBottom: 6, display: 'flex', alignItems: 'center', gap: 5 }}>📍 <span style={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{r.location_address}</span></div>
                    <div style={{ fontSize: 12, color: T.textSoft, marginBottom: 10 }}>📅 {fmtShort(r.submitted_at)}</div>
                    <p style={{ fontSize: 12, color: T.textMid, lineHeight: 1.5, margin: 0, overflow: 'hidden', display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical' as any }}>
                      {r.description || 'No description provided.'}
                    </p>
                  </div>
                  <div style={{ padding: '0 16px 16px' }}>
                    <button onClick={() => onViewDetails(r)} style={{ width: '100%', background: T.forest, color: 'white', border: 'none', borderRadius: T.radiusSm, padding: '10px 0', fontSize: 13, fontWeight: 700, cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6 }}>
                      View Details →
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          <div style={{ padding: '56px 24px', textAlign: 'center' }}>
            <div style={{ width: 80, height: 80, borderRadius: '50%', background: T.sand, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 36, margin: '0 auto 16px' }}>📝</div>
            <h3 style={{ color: T.forest, fontWeight: 800, margin: '0 0 8px', fontSize: 20 }}>No Reports Yet</h3>
            <p style={{ color: T.textSoft, margin: '0 0 20px', fontSize: 14 }}>Create your first rescue report to get started.</p>
            <Link to="/create-report" style={{ background: T.green, color: 'white', padding: '11px 28px', borderRadius: 50, textDecoration: 'none', fontWeight: 700, fontSize: 14 }}>File Your First Report</Link>
          </div>
        )}
      </Card>
    </div>
  );
};

// ─── Main Dashboard ───────────────────────────────────────────────────────────
export const Dashboard: React.FC = () => {
  const [isLoading,   setIsLoading]   = useState(true);
  const [userReports, setUserReports] = useState<Report[]>([]);
  const [allReports,  setAllReports]  = useState<Report[]>([]);
  const [repLoading,  setRepLoading]  = useState(true);
  const [profile,     setProfile]     = useState<UserProfile | null>(null);
  const [selReport,   setSelReport]   = useState<Report | null>(null);
  const [modalOpen,   setModalOpen]   = useState(false);
  const [repEvidence, setRepEvidence] = useState<Record<number, TaskProof[]>>({});
  const [repNotes,    setRepNotes]    = useState<Record<number, TaskCompletionNote[]>>({});
  const [repLoading2, setRepLoading2] = useState<Record<number, boolean>>({});

  const navigate = useNavigate();
  const { user: cu } = useAuth();

  useEffect(() => {
    if (!cu) return;
    (async () => {
      const token = getToken();
      const res = await fetch('http://localhost:5000/api/users/profile', { headers: { 'Authorization': `Bearer ${token}`, 'Content-Type': 'application/json' } });
      if (res.ok) { const d = await res.json(); if (d.success) setProfile(d.data); }
    })();
  }, [cu]);

  useEffect(() => {
    if (!cu) return;
    (async () => {
      setRepLoading(true);
      const token = getToken();
      const res = await fetch('http://localhost:5000/api/reports/my-reports', { headers: { 'Authorization': `Bearer ${token}`, 'Content-Type': 'application/json' } });
      if (res.ok) { const d = await res.json(); if (d.success) setUserReports(d.data || []); }
      if (getRole(cu) === 'admin') {
        const r2 = await fetch('http://localhost:5000/api/reports/admin/all', { headers: { 'Authorization': `Bearer ${token}`, 'Content-Type': 'application/json' } });
        if (r2.ok) { const d2 = await r2.json(); if (d2.success) setAllReports(d2.data || []); }
      }
      setRepLoading(false);
    })();
  }, [cu, profile]);

  useEffect(() => {
    if (cu) setIsLoading(false);
    else { const t = setTimeout(() => setIsLoading(false), 900); return () => clearTimeout(t); }
  }, [cu]);

  const getRole = (u: any): string => {
    if (!u) return 'user';
    if (u.role?.role_name) return u.role.role_name.toLowerCase();
    if (u.role_name) return u.role_name.toLowerCase();
    if (u.role_id === 3) return 'admin'; if (u.role_id === 2) return 'volunteer'; if (u.role_id === 1) return 'user';
    return 'user';
  };
  const getVolStatus = (u: any): string | null => {
    if (!u) return null;
    const id = u.approval_status_id ?? u.volunteer?.approval_status_id;
    if (id === 1) return 'pending'; if (id === 2) return 'approved'; if (id === 3) return 'rejected';
    const s = (u.volunteer?.status || u.volunteer_status || '').toLowerCase();
    if (s.includes('pending')) return 'pending'; if (s.includes('approved')) return 'approved'; if (s.includes('reject')) return 'rejected';
    return null;
  };

  const fetchDetails = async (repId: number, taskId?: number) => {
    if (!taskId) return;
    setRepLoading2(p => ({ ...p, [repId]: true }));
    const token = getToken();
    const [er, nr] = await Promise.all([
      fetch(`http://localhost:5000/api/tasks/${taskId}/evidence`, { headers: { 'Authorization': `Bearer ${token}` } }),
      fetch(`http://localhost:5000/api/tasks/${taskId}/completion-notes`, { headers: { 'Authorization': `Bearer ${token}` } }),
    ]);
    const [ed, nd] = [await er.json(), await nr.json()];
    if (ed.success) setRepEvidence(p => ({ ...p, [repId]: ed.data || [] }));
    if (nd.success) setRepNotes(p => ({ ...p, [repId]: nd.data || [] }));
    setRepLoading2(p => ({ ...p, [repId]: false }));
  };

  const openReport = (r: Report) => { setSelReport(r); if (r.task_id) fetchDetails(r.report_id, r.task_id); setModalOpen(true); };

  useEffect(() => { if (!isLoading && !cu) navigate('/login'); }, [cu, navigate, isLoading]);

  if (isLoading) return (
    <div style={{ minHeight: '100vh', background: T.cream, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <div style={{ textAlign: 'center' }}>
        <div style={{ width: 56, height: 56, border: `4px solid ${T.border}`, borderTop: `4px solid ${T.green}`, borderRadius: '50%', animation: 'spin 1s linear infinite', margin: '0 auto 16px' }} />
        <div style={{ color: T.textMid, fontWeight: 600 }}>Loading dashboard…</div>
      </div>
      <style>{`@keyframes spin { 0%{transform:rotate(0deg)} 100%{transform:rotate(360deg)} }`}</style>
    </div>
  );

  if (!cu) return (
    <div style={{ minHeight: '100vh', background: T.cream, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <Card style={{ padding: '48px 56px', textAlign: 'center', maxWidth: 460 }}>
        <div style={{ fontSize: 48, marginBottom: 16 }}>🔒</div>
        <h2 style={{ color: T.forest, margin: '0 0 8px', fontWeight: 800 }}>Access Denied</h2>
        <p style={{ color: T.textSoft, marginBottom: 24 }}>Please log in to view your dashboard.</p>
        <Link to="/login" style={{ background: T.green, color: 'white', padding: '11px 28px', borderRadius: 50, textDecoration: 'none', fontWeight: 700, fontSize: 14 }}>Go to Login</Link>
      </Card>
    </div>
  );

  const role    = getRole(cu);
  const volStat = getVolStatus(cu);
  const stats   = {
    totalReports: userReports.length,
    completedRescues: userReports.filter(r => r.status_name?.toLowerCase() === 'completed').length,
    activeVolunteers: 1, pendingApprovals: 0,
    myReports: userReports.filter(r => Number(r.user_id) === Number(cu.user_id)).length,
    myCompletedTasks: userReports.filter(r => r.status_name?.toLowerCase() === 'completed').length,
  };

  const renderContent = () => {
    if (role === 'admin') return <AdminDashboard stats={stats} reports={allReports} reportsLoading={repLoading} />;
    if (role === 'volunteer') {
      if (volStat === 'rejected')                                          return <RejectedVolunteerDashboard user={cu} />;
      if (volStat === 'pending' || volStat === 'none' || !volStat)        return <PendingVolunteerDashboard user={cu} />;
      if (volStat === 'approved') return <VolunteerDashboard user={{ ...cu, role }} stats={stats} reports={userReports} reportsLoading={repLoading} userProfile={profile} />;
    }
    return <UserDashboard user={{ ...cu, role }} userReports={userReports} reportsLoading={repLoading} onViewDetails={openReport} userProfile={profile} />;
  };

  return (
    <div style={{ minHeight: '100vh', background: T.cream, padding: '24px 20px' }}>
      <style>{`
        @keyframes spin  { 0%{transform:rotate(0deg)} 100%{transform:rotate(360deg)} }
        @keyframes pulse { 0%,100%{opacity:1;transform:scale(1)} 50%{opacity:.7;transform:scale(1.1)} }
        * { box-sizing: border-box; }
        a { transition: opacity .15s; }
        a:hover { opacity: .85; }
        button { font-family: inherit; }
      `}</style>
      {renderContent()}
      <ReportDetailModal
        report={selReport} isOpen={modalOpen}
        onClose={() => { setModalOpen(false); setSelReport(null); }}
        userPhone={profile?.phone} userEmail={profile?.email} userName={profile?.username}
        evidence={selReport ? repEvidence[selReport.report_id] : []}
        notes={selReport ? repNotes[selReport.report_id] : []}
        loading={selReport ? repLoading2[selReport.report_id] : false}
      />
    </div>
  );
};

export default Dashboard;