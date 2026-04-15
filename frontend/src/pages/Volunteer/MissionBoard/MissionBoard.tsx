// import React, { useState, useEffect } from 'react';
// import { useNavigate, Link } from 'react-router-dom';
// import { useAuth } from '../../../context/AuthContext';
// import './MissionBoard.css';
// import { toast } from 'react-toastify';

// // Icon library imports
// import * as MdIcons from 'react-icons/md';
// import * as FaIcons from 'react-icons/fa';
// import * as Fa6Icons from 'react-icons/fa6';
// import * as IoIcons from 'react-icons/io5';
// import * as AiIcons from 'react-icons/ai';
// import * as BiIcons from 'react-icons/bi';
// import * as FiIcons from 'react-icons/fi';
// import * as GiIcons from 'react-icons/gi';
// import * as HiIcons from 'react-icons/hi2';
// import * as RiIcons from 'react-icons/ri';
// import * as TbIcons from 'react-icons/tb';
// import * as CiIcons from 'react-icons/ci';
// import * as SiIcons from 'react-icons/si';

// type IconProps = { type: string; name: string; size?: number; color?: string; className?: string };

// const getIconSet = (type: string) => {
//   switch (type) {
//     case 'material': return MdIcons;
//     case 'fa': return FaIcons;
//     case 'fa6': return Fa6Icons;
//     case 'ion': return IoIcons;
//     case 'ant': return AiIcons;
//     case 'bootstrap': return BiIcons;
//     case 'feather': return FiIcons;
//     case 'game': return GiIcons;
//     case 'hero': return HiIcons;
//     case 'remix': return RiIcons;
//     case 'tabler': return TbIcons;
//     case 'circum': return CiIcons;
//     case 'simple': return SiIcons;
//     default: return FaIcons;
//   }
// };

// const Icon: React.FC<IconProps> = ({ type, name, size = 20, color = 'inherit', className }) => {
//   const icons = getIconSet(type);
//   const Comp = (icons as Record<string, React.ComponentType<any>>)[name];
//   if (!Comp) return null;
//   return <Comp size={size} color={color} className={className} />;
// };

// // Interfaces
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
//   user_id: number;
//   description: string;
//   location_address: string;
//   user_note: string;
//   submitted_at: string;
//   animal_type: string;
//   animal_condition: string;
//   report_status_id: number;
//   report_status: string;
//   reporter_name: string;
//   reporter_phone: string;
//   reporter_email: string;
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
//   if (type.includes('dog')) return '🐕';
//   if (type.includes('cat')) return '🐈';
//   if (type.includes('bird')) return '🐦';
//   if (type.includes('rabbit') || type.includes('bunny')) return '🐇';
//   if (type.includes('hamster')) return '🐹';
//   if (type.includes('turtle') || type.includes('tortoise')) return '🐢';
//   if (type.includes('horse')) return '🐴';
//   if (type.includes('cow')) return '🐄';
//   if (type.includes('goat')) return '🐐';
//   if (type.includes('sheep')) return '🐑';
//   if (type.includes('fish')) return '🐟';
//   if (type.includes('snake')) return '🐍';
//   if (type.includes('mouse') || type.includes('rat')) return '🐭';
//   if (type.includes('monkey')) return '🐒';
//   if (type.includes('pig')) return '🐷';
//   if (type.includes('chicken')) return '🐔';
//   if (type.includes('duck')) return '🦆';
//   return '🐾';
// };

// const getCardTitle = (animalType: string, animalCondition: string): string => {
//   const type = (animalType || '').trim();
//   const cond = (animalCondition || '').trim();
//   if (!type) return 'Animal in need';
//   const adjectives = ['injured', 'stray', 'sick', 'lost', 'abandoned', 'wounded', 'starving', 'malnourished', 'critical', 'trapped', 'orphaned'];
//   const isAdj = adjectives.some(a => cond.toLowerCase().includes(a));
//   if (cond && isAdj) return `${cond.charAt(0).toUpperCase() + cond.slice(1).toLowerCase()} ${type}`;
//   return `${type} in need`;
// };

// const formatDate = (dateString: string): string => {
//   if (!dateString || dateString === 'Not available' || dateString === 'Invalid date' || dateString === '') return 'Not available';
//   try {
//     const date = new Date(dateString);
//     if (isNaN(date.getTime())) return 'Not available';
//     return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric', hour: '2-digit', minute: '2-digit' });
//   } catch (e) { return 'Not available'; }
// };

// const formatShortDate = (dateString: string): string => {
//   if (!dateString || dateString === 'Not available' || dateString === 'Invalid date' || dateString === '') return 'Not available';
//   try {
//     const date = new Date(dateString);
//     if (isNaN(date.getTime())) return 'Not available';
//     return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
//   } catch (e) { return 'Not available'; }
// };

// const formatRelativeTime = (dateString: string): string => {
//   if (!dateString || dateString === 'Not available' || dateString === 'Invalid date' || dateString === '') return 'Not available';
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
//   } catch (e) { return 'Not available'; }
// };

// const getTaskStatusBadge = (statusId: number | undefined): { text: string; class: string; color: string } => {
//   switch (statusId) {
//     case 1: return { text: 'PENDING', class: 'pending', color: '#1e3f1a' };
//     case 2: return { text: 'ACTIVE', class: 'active', color: '#1e3f1a' };
//     case 3: return { text: 'COMPLETED', class: 'completed', color: '#1e3f1a' };
//     case 4: return { text: 'DECLINED', class: 'declined', color: '#1e3f1a' };
//     default: return { text: 'UNKNOWN', class: 'unknown', color: '#1e3f1a' };
//   }
// };

// const getStatusBadgeBg = (id?: number) => {
//   switch (id) {
//     case 1: return { bg: '#1e3f1a', color: '#c8e6b0' };
//     case 2: return { bg: '#1a3a5e', color: '#b0d4f1' };
//     case 3: return { bg: '#3d1a5e', color: '#e0c8f5' };
//     case 4: return { bg: '#4a4a4a', color: '#e0e0e0' };
//     default: return { bg: '#4a4a4a', color: '#e0e0e0' };
//   }
// };

// const calculateDistance = (lat1: number, lng1: number, lat2: number, lng2: number): number => {
//   const R = 6371;
//   const dLat = (lat2 - lat1) * Math.PI / 180;
//   const dLng = (lng2 - lng1) * Math.PI / 180;
//   const a = Math.sin(dLat / 2) * Math.sin(dLat / 2) + Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) * Math.sin(dLng / 2) * Math.sin(dLng / 2);
//   return R * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
// };

// const getFullImageUrl = (proofUrl: string): string => {
//   if (!proofUrl) return '';
//   if (proofUrl.startsWith('http://') || proofUrl.startsWith('https://')) return proofUrl;
//   const baseUrl = `${process.env.REACT_APP_API_URL}`;
//   const cleanUrl = proofUrl.replace(/^\/+/, '');
//   if (cleanUrl.startsWith('uploads/')) return `${baseUrl}/${cleanUrl}`;
//   return `${baseUrl}/uploads/${cleanUrl}`;
// };

// // ─── Location Tracker ──────────────────────────────────────────────────────────
// const LocationTracker: React.FC<{ taskId: number; isActive: boolean }> = ({ taskId, isActive }) => {
//   const [watchId, setWatchId] = useState<number | null>(null);
//   const [lastLocation, setLastLocation] = useState<GeolocationPosition | null>(null);
//   const [isTracking, setIsTracking] = useState(false);
//   const [error, setError] = useState<string | null>(null);
//   const [pendingPoints, setPendingPoints] = useState<number>(0);
//   const pendingQueue = React.useRef<any[]>([]);

//   const saveLocation = async (latitude: number, longitude: number, accuracy: number) => {
//     try {
//       const token = sessionStorage.getItem('token') || localStorage.getItem('token');
//       if (!token) return;
//       const response = await fetch(`${process.env.REACT_APP_API_URL}/api/volunteer/tracking/point`, {
//         method: 'POST',
//         headers: { 'Authorization': `Bearer ${token}`, 'Content-Type': 'application/json' },
//         body: JSON.stringify({ taskId, latitude, longitude, accuracy })
//       });
//       const data = await response.json();
//       if (!data.success) { pendingQueue.current.push({ latitude, longitude, accuracy, timestamp: new Date() }); setPendingPoints(pendingQueue.current.length); }
//     } catch (error) { pendingQueue.current.push({ latitude, longitude, accuracy, timestamp: new Date() }); setPendingPoints(pendingQueue.current.length); }
//   };

//   const retryPendingPoints = async () => {
//     if (pendingQueue.current.length === 0) return;
//     const token = sessionStorage.getItem('token') || localStorage.getItem('token');
//     if (!token) return;
//     const points = [...pendingQueue.current]; pendingQueue.current = []; setPendingPoints(0);
//     for (const point of points) {
//       try { await fetch(`${process.env.REACT_APP_API_URL}/api/volunteer/tracking/point`, { method: 'POST', headers: { 'Authorization': `Bearer ${token}`, 'Content-Type': 'application/json' }, body: JSON.stringify({ taskId, latitude: point.latitude, longitude: point.longitude, accuracy: point.accuracy }) }); }
//       catch (error) { pendingQueue.current.push(point); setPendingPoints(pendingQueue.current.length); }
//     }
//   };

//   const startTracking = () => {
//     if (!navigator.geolocation) { setError('Geolocation is not supported by your browser'); return; }
//     setError(null);
//     navigator.geolocation.getCurrentPosition(
//       (position) => { setLastLocation(position); setError(null); saveLocation(position.coords.latitude, position.coords.longitude, position.coords.accuracy || 0); },
//       (error) => { console.warn('Initial position error:', error); },
//       { enableHighAccuracy: false, timeout: 10000, maximumAge: 60000 }
//     );
//     const id = navigator.geolocation.watchPosition(
//       (position) => {
//         setLastLocation(position); setError(null);
//         let shouldSave = true;
//         if (lastLocation) {
//           const distance = calculateDistance(lastLocation.coords.latitude, lastLocation.coords.longitude, position.coords.latitude, position.coords.longitude);
//           const timeDiff = (position.timestamp - lastLocation.timestamp) / 1000;
//           shouldSave = distance > 0.05 || timeDiff > 30;
//         }
//         if (shouldSave) saveLocation(position.coords.latitude, position.coords.longitude, position.coords.accuracy || 0);
//         setLastLocation(position);
//       },
//       (error) => {
//         let errorMsg = 'Unknown location error';
//         switch (error.code) {
//           case error.PERMISSION_DENIED: errorMsg = 'Location permission denied'; break;
//           case error.POSITION_UNAVAILABLE: errorMsg = 'Location unavailable'; break;
//           case error.TIMEOUT: errorMsg = 'Location request timed out'; break;
//         }
//         setError(errorMsg);
//       },
//       { enableHighAccuracy: true, timeout: 30000, maximumAge: 0 }
//     );
//     setWatchId(id); setIsTracking(true);
//   };

//   const stopTracking = () => { if (watchId !== null) { navigator.geolocation.clearWatch(watchId); setWatchId(null); setIsTracking(false); } };

//   useEffect(() => {
//     if (isActive) { const timer = setTimeout(() => { startTracking(); }, 1000); return () => { clearTimeout(timer); stopTracking(); }; }
//     else stopTracking();
//     return () => { stopTracking(); };
//   }, [isActive]);

//   useEffect(() => { const handleOnline = () => { retryPendingPoints(); }; window.addEventListener('online', handleOnline); return () => window.removeEventListener('online', handleOnline); }, []);
//   useEffect(() => { const interval = setInterval(() => { if (navigator.onLine && pendingQueue.current.length > 0) retryPendingPoints(); }, 30000); return () => clearInterval(interval); }, []);

//   if (!isActive) return null;

//   return (
//     <div className="mb-location-tracker">
//       <span className="mb-location-dot" style={{ background: error ? '#f44336' : (isTracking ? '#4caf50' : '#ff9800') }}></span>
//       <span>{error ? 'Location Error' : (isTracking ? 'Sharing Location' : 'Starting...')}</span>
//       {pendingPoints > 0 && <span className="mb-pending-badge">{pendingPoints} pending</span>}
//     </div>
//   );
// };

// // ─── Decline Modal ─────────────────────────────────────────────────────────────
// const DeclineModal: React.FC<{ isOpen: boolean; onClose: () => void; onSubmit: (reason: string) => void; taskId: number }> = ({ isOpen, onClose, onSubmit, taskId }) => {
//   const [reason, setReason] = useState('');
//   const [otherReason, setOtherReason] = useState('');

//   if (!isOpen) return null;

//   const handleSubmit = () => {
//     const finalReason = reason === 'other' ? otherReason : reason;
//     if (finalReason) { onSubmit(finalReason); setReason(''); setOtherReason(''); onClose(); }
//   };

//   return (
//     <div className="modal-overlay" onClick={onClose}>
//       <div className="modal-content decline-modal" onClick={e => e.stopPropagation()}>
//         <div className="modal-header decline-header" style={{ background: 'linear-gradient(135deg, #2D5A27 0%, #1e3f1a 100%)' }}>
//           <div className="modal-header-left">
//             <span className="modal-icon"><Icon type="material" name="MdCancel" size={22} color="white" /></span>
//             <div><h3 className="modal-title">Decline Mission</h3><p className="modal-subtitle">Task #{taskId}</p></div>
//           </div>
//           <button className="modal-close" onClick={onClose}>×</button>
//         </div>
//         <div className="modal-body">
//           <div className="decline-info"><p>Please provide a reason for declining this mission.</p></div>
//           <div className="form-group">
//             <label className="form-label">Reason <span className="required">*</span></label>
//             <select className="form-select" value={reason} onChange={(e) => setReason(e.target.value)}>
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
//               <textarea className="form-textarea" value={otherReason} onChange={(e) => setOtherReason(e.target.value)} placeholder="Enter your reason..." rows={3} />
//             </div>
//           )}
//         </div>
//         <div className="modal-footer">
//           <button className="modal-btn secondary" onClick={onClose}>Cancel</button>
//           <button className="modal-btn danger" onClick={handleSubmit} disabled={!reason || (reason === 'other' && !otherReason)}>
//             Decline Mission
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// };

// // ─── Redesigned Task Detail Modal ─────────────────────────────────────────────
// const TaskDetailModal: React.FC<{
//   task: Mission | null; isOpen: boolean; onClose: () => void;
//   onAccept?: (taskId: number) => void; onDecline?: (taskId: number, reason: string) => void;
//   onUploadEvidence?: (taskId: number, file: File, notes: string) => void;
//   actionLoading?: boolean; userProfile?: any;
//   evidence?: TaskProof[]; adminNotes?: AdminNote[]; completionNotes?: CompletionNote[];
// }> = ({ task, isOpen, onClose, onAccept, onDecline, onUploadEvidence, actionLoading, userProfile, evidence = [], adminNotes = [], completionNotes = [] }) => {
//   const [activeTab, setActiveTab] = useState<'overview' | 'evidence' | 'notes'>('overview');
//   const [zoom, setZoom] = useState<string | null>(null);
//   const [showUploadForm, setShowUploadForm] = useState(false);
//   const [uploadFile, setUploadFile] = useState<File | null>(null);
//   const [uploadPreview, setUploadPreview] = useState<string | null>(null);
//   const [uploadNotes, setUploadNotes] = useState('');
//   const [uploadErr, setUploadErr] = useState<string | null>(null);
//   const [uploading, setUploading] = useState(false);
//   const [showDeclineModal, setShowDeclineModal] = useState(false);
//   const [trackActive, setTrackActive] = useState(false);

//   useEffect(() => { setTrackActive(task?.task_status_id === 2); }, [task?.task_status_id]);
//   useEffect(() => {
//     setUploadFile(null); setUploadPreview(null); setUploadNotes(''); setUploadErr(null); setShowUploadForm(false);
//     setActiveTab('overview');
//   }, [task?.task_id, isOpen]);

//   if (!isOpen || !task) return null;

//   const badge = getTaskStatusBadge(task.task_status_id);
//   const emoji = getAnimalEmoji(task.animal_type);
//   const canUpload = task.task_status_id === 2;

//   const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     const f = e.target.files?.[0];
//     if (!f) return;
//     setUploadErr(null);
//     if (f.size > 5 * 1024 * 1024) { setUploadErr('File too large (max 5MB)'); return; }
//     if (!['image/jpeg', 'image/png', 'image/jpg', 'image/gif'].includes(f.type)) { setUploadErr('Invalid type — JPG, PNG or GIF only'); return; }
//     if (uploadPreview) URL.revokeObjectURL(uploadPreview);
//     setUploadFile(f);
//     setUploadPreview(URL.createObjectURL(f));
//   };

//   const removeFile = () => {
//     if (uploadPreview) URL.revokeObjectURL(uploadPreview);
//     setUploadFile(null); setUploadPreview(null); setUploadErr(null);
//   };

//   const submitEvidence = async () => {
//     if (!uploadFile) { setUploadErr('Please select a photo'); return; }
//     if (!uploadNotes.trim()) { setUploadErr('Please add completion notes'); return; }
//     setUploading(true);
//     try {
//       await onUploadEvidence?.(task.task_id, uploadFile, uploadNotes);
//       removeFile(); setUploadNotes(''); setUploadErr(null); setShowUploadForm(false);
//     } finally { setUploading(false); }
//   };

//   return (
//     <>
//       {task.task_status_id === 2 && <LocationTracker taskId={task.task_id} isActive={trackActive} />}

//       <div className="modal-overlay" onClick={onClose}>
//         <div className="mb-tdm-shell" onClick={e => e.stopPropagation()}>

//           {/* Header */}
//           <div className="mb-tdm-header">
//             <div className="mb-tdm-header-left">
//               <div className="mb-tdm-animal-badge">{emoji}</div>
//               <div>
//                 <div className="mb-tdm-title">{task.animal_type} Rescue</div>
//                 <div className="mb-tdm-subtitle">Report #{task.report_id} · {formatRelativeTime(task.submitted_at)}</div>
//               </div>
//             </div>
//             <div className="mb-tdm-header-right">
//               <span className="mb-tdm-status-badge" style={{ background: badge.color === '#1e3f1a' ? '#1e3f1a' : '#2D5A27', color: 'white' }}>
//                 {badge.text}
//               </span>
//               <button className="mb-tdm-close" onClick={onClose}>✕</button>
//             </div>
//           </div>

//           {/* Tabs */}
//           <div className="mb-tdm-tabs">
//             {(['overview', 'evidence', 'notes'] as const).map(t => (
//               <button
//                 key={t}
//                 className={`mb-tdm-tab ${activeTab === t ? 'active' : ''}`}
//                 onClick={() => setActiveTab(t)}
//               >
//                 {t === 'overview' && '📋 Overview'}
//                 {t === 'evidence' && `📸 Evidence${evidence.length ? ` (${evidence.length})` : ''}`}
//                 {t === 'notes' && `📝 Notes${adminNotes.length ? ` (${adminNotes.length})` : ''}`}
//               </button>
//             ))}
//           </div>

//           {/* Body */}
//           <div className="mb-tdm-body">

//             {/* OVERVIEW TAB */}
//             {activeTab === 'overview' && (
//               <div className="mb-tdm-overview">
//                 {/* Condition banner */}
//                 <div className="mb-tdm-condition-banner">
//                   <span className="mb-tdm-condition-emoji">{emoji}</span>
//                   <div>
//                     <div className="mb-tdm-condition-animal">{task.animal_type}</div>
//                     <span className="mb-tdm-condition-pill">{task.animal_condition}</span>
//                   </div>
//                   <button
//                     className="mb-tdm-map-btn"
//                     onClick={() => window.open(`https://maps.google.com/?q=${encodeURIComponent(task.location_address)}`, '_blank')}
//                   >
//                     <Icon type="fa" name="FaMapMarkerAlt" size={12} /> View Map
//                   </button>
//                 </div>

//                 {/* Two column info */}
//                 <div className="mb-tdm-two-col">
//                   <div className="mb-tdm-section">
//                     <div className="mb-tdm-section-title">📍 Location</div>
//                     <div className="mb-tdm-location-text">{task.location_address}</div>
//                   </div>
//                   <div className="mb-tdm-section">
//                     <div className="mb-tdm-section-title">👤 Reporter</div>
//                     <div className="mb-tdm-reporter-row">
//                       <div className="mb-tdm-avatar">
//                         {task.reporter_name?.charAt(0).toUpperCase() || '?'}
//                       </div>
//                       <div>
//                         <div className="mb-tdm-reporter-name">{task.reporter_name || 'Anonymous'}</div>
//                         {task.reporter_phone && task.reporter_phone !== 'No phone' && <div className="mb-tdm-reporter-sub">{task.reporter_phone}</div>}
//                         {task.reporter_email && task.reporter_email !== 'No email' && <div className="mb-tdm-reporter-sub">{task.reporter_email}</div>}
//                       </div>
//                     </div>
//                   </div>
//                 </div>

//                 <div className="mb-tdm-section">
//                   <div className="mb-tdm-section-title">📄 Description</div>
//                   <div className="mb-tdm-description">{task.description}</div>
//                   {task.user_note && (
//                     <div className="mb-tdm-note-box">
//                       <span className="mb-tdm-note-label">Reporter's Note</span>
//                       <div>{task.user_note}</div>
//                     </div>
//                   )}
//                 </div>

//                 {/* Timeline */}
//                 <div className="mb-tdm-section">
//                   <div className="mb-tdm-section-title">🕐 Timeline</div>
//                   <div className="mb-tdm-timeline">
//                     <div className="mb-tdm-timeline-item">
//                       <div className="mb-tdm-tl-dot submitted" />
//                       <div><div className="mb-tdm-tl-label">Reported</div><div className="mb-tdm-tl-val">{formatDate(task.submitted_at)}</div></div>
//                     </div>
//                     {task.assigned_at && (
//                       <div className="mb-tdm-timeline-item">
//                         <div className="mb-tdm-tl-dot assigned" />
//                         <div><div className="mb-tdm-tl-label">Assigned</div><div className="mb-tdm-tl-val">{formatDate(task.assigned_at)}</div></div>
//                       </div>
//                     )}
//                     {task.started_at && (
//                       <div className="mb-tdm-timeline-item">
//                         <div className="mb-tdm-tl-dot active" />
//                         <div><div className="mb-tdm-tl-label">Started</div><div className="mb-tdm-tl-val">{formatDate(task.started_at)}</div></div>
//                       </div>
//                     )}
//                     {task.completed_at && (
//                       <div className="mb-tdm-timeline-item">
//                         <div className="mb-tdm-tl-dot completed" />
//                         <div><div className="mb-tdm-tl-label">Completed</div><div className="mb-tdm-tl-val">{formatDate(task.completed_at)}</div></div>
//                       </div>
//                     )}
//                   </div>
//                 </div>
//               </div>
//             )}

//             {/* EVIDENCE TAB */}
//             {activeTab === 'evidence' && (
//               <div className="mb-tdm-evidence-tab">
//                 {/* Existing evidence */}
//                 {evidence.length > 0 && (
//                   <div className="mb-tdm-section">
//                     <div className="mb-tdm-section-title">Uploaded Photos</div>
//                     <div className="mb-tdm-evidence-grid">
//                       {evidence.map(p => (
//                         <div key={p.proof_id} className="mb-tdm-evidence-item" onClick={() => setZoom(getFullImageUrl(p.proof_url))}>
//                           <img src={getFullImageUrl(p.proof_url)} alt="" onError={e => { (e.currentTarget as any).style.display = 'none'; }} />
//                           <div className="mb-tdm-evidence-date">{formatShortDate(p.uploaded_at)}</div>
//                         </div>
//                       ))}
//                     </div>
//                   </div>
//                 )}

//                 {/* Upload section */}
//                 {canUpload && (
//                   <div className="mb-tdm-section mb-tdm-upload-section">
//                     <div className="mb-tdm-section-title">
//                       {evidence.length > 0 ? 'Add More Evidence' : 'Upload Evidence Photo'}
//                     </div>

//                     {uploadErr && <div className="mb-tdm-upload-err">{uploadErr}</div>}

//                     {!showUploadForm ? (
//                       <button className="mb-tdm-upload-btn" onClick={() => setShowUploadForm(true)}>
//                         <Icon type="material" name="MdCameraAlt" size={16} /> Upload Photo
//                       </button>
//                     ) : (
//                       <>
//                         {!uploadPreview ? (
//                           <label className="mb-tdm-upload-zone">
//                             <div className="mb-tdm-upload-icon">📷</div>
//                             <div className="mb-tdm-upload-text">Click to choose a photo</div>
//                             <div className="mb-tdm-upload-sub">JPG, PNG or GIF · max 5MB</div>
//                             <input type="file" accept="image/*" onChange={handleFileChange} style={{ display: 'none' }} />
//                           </label>
//                         ) : (
//                           <div className="mb-tdm-preview-wrap">
//                             <img src={uploadPreview} alt="preview" className="mb-tdm-preview-img" />
//                             <button className="mb-tdm-remove-photo" onClick={removeFile}>✕ Remove</button>
//                           </div>
//                         )}

//                         <div className="mb-tdm-upload-notes-wrap">
//                           <label className="mb-tdm-upload-notes-label">
//                             Completion Notes <span style={{ color: '#c62828' }}>*</span>
//                           </label>
//                           <textarea
//                             className="mb-tdm-upload-notes"
//                             value={uploadNotes}
//                             onChange={e => setUploadNotes(e.target.value)}
//                             placeholder="Describe the rescue outcome, animal's condition, any challenges…"
//                             rows={3}
//                             maxLength={500}
//                           />
//                           <div className="mb-tdm-char-count">{uploadNotes.length}/500</div>
//                         </div>

//                         <div className="mb-tdm-upload-actions">
//                           <button className="mb-tdm-cancel-btn" onClick={() => { setShowUploadForm(false); removeFile(); setUploadNotes(''); }}>
//                             Cancel
//                           </button>
//                           <button
//                             className="mb-tdm-submit-btn"
//                             onClick={submitEvidence}
//                             disabled={!uploadFile || !uploadNotes.trim() || uploading || actionLoading}
//                           >
//                             {uploading ? '⏳ Uploading…' : '✓ Submit Evidence'}
//                           </button>
//                         </div>
//                       </>
//                     )}
//                   </div>
//                 )}

//                 {!canUpload && evidence.length === 0 && (
//                   <div className="mb-tdm-empty">No evidence uploaded yet</div>
//                 )}
//               </div>
//             )}

//             {/* NOTES TAB */}
//             {activeTab === 'notes' && (
//               <div className="mb-tdm-notes-tab">
//                 {completionNotes.length > 0 && (
//                   <div className="mb-tdm-section">
//                     <div className="mb-tdm-section-title">Completion Notes</div>
//                     {completionNotes.map(n => (
//                       <div key={n.note_id} className="mb-tdm-completion-note">
//                         <div className="mb-tdm-note-header">
//                           <span className="mb-tdm-note-author">{n.volunteer_name || 'Volunteer'}</span>
//                           <span className="mb-tdm-note-date">{formatDate(n.created_at)}</span>
//                         </div>
//                         <div className="mb-tdm-note-body">{n.note_text}</div>
//                       </div>
//                     ))}
//                   </div>
//                 )}

//                 {adminNotes.length > 0 && (
//                   <div className="mb-tdm-section">
//                     <div className="mb-tdm-section-title">Admin Notes</div>
//                     {adminNotes.map(n => (
//                       <div key={n.note_id} className="mb-tdm-admin-note">
//                         <div className="mb-tdm-note-header">
//                           <span className="mb-tdm-note-author">{n.admin_name || 'Admin'}</span>
//                           <span className="mb-tdm-note-date">{formatRelativeTime(n.created_at)}</span>
//                         </div>
//                         <div className="mb-tdm-note-body">{n.note_text}</div>
//                       </div>
//                     ))}
//                   </div>
//                 )}

//                 {completionNotes.length === 0 && adminNotes.length === 0 && (
//                   <div className="mb-tdm-empty">No notes available</div>
//                 )}
//               </div>
//             )}
//           </div>

//           {/* Footer */}
//           <div className="mb-tdm-footer">
//             <div className="mb-tdm-footer-left">
//               <span className="mb-tdm-task-chip">Task #{task.task_id}</span>
//               {task.task_status_id === 1 && onAccept && onDecline && (
//                 <div className="mb-tdm-actions">
//                   <button className="mb-tdm-accept-btn" onClick={() => onAccept(task.task_id)} disabled={actionLoading}>
//                     ✓ Accept Mission
//                   </button>
//                   <button className="mb-tdm-decline-btn" onClick={() => setShowDeclineModal(true)} disabled={actionLoading}>
//                     ✗ Decline
//                   </button>
//                 </div>
//               )}
//             </div>
//             <button className="mb-tdm-close-btn" onClick={onClose}>Close</button>
//           </div>
//         </div>
//       </div>

//       <DeclineModal isOpen={showDeclineModal} onClose={() => setShowDeclineModal(false)} onSubmit={(reason) => onDecline?.(task.task_id, reason)} taskId={task.task_id} />

//       {zoom && (
//         <div className="lightbox" onClick={() => setZoom(null)}>
//           <img src={zoom} alt="Enlarged evidence" />
//           <button className="lightbox-close" onClick={() => setZoom(null)}>×</button>
//         </div>
//       )}
//     </>
//   );
// };

// // ─── Main Mission Board ────────────────────────────────────────────────────────
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
//   const [taskEvidence, setTaskEvidence] = useState<{ [key: number]: TaskProof[] }>({});
//   const [taskAdminNotes, setTaskAdminNotes] = useState<{ [key: number]: AdminNote[] }>({});
//   const [taskCompletionNotes, setTaskCompletionNotes] = useState<{ [key: number]: CompletionNote[] }>({});
//   const [showAllActive, setShowAllActive] = useState(false);
//   const [showAllPending, setShowAllPending] = useState(false);
//   const [taskDetails, setTaskDetails] = useState<{ [key: number]: Mission }>({});

//   const { user: currentUser } = useAuth();
//   const navigate = useNavigate();

//   useEffect(() => {
//     if (!currentUser) { navigate('/login'); return; }
//     fetchMissions();
//   }, [currentUser]);

//   const fetchMissions = async () => {
//     try {
//       setLoading(true); setError(null);
//       const token = sessionStorage.getItem('token') || localStorage.getItem('token');
//       const response = await fetch(`${process.env.REACT_APP_API_URL}/api/volunteers/tasks`, { headers: { 'Authorization': `Bearer ${token}` } });
//       if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
//       const data = await response.json();
//       if (data.success && data.data) {
//         setMissions(data.data);
//         setFilteredMissions(data.data);
//         fetchAllEvidence(data.data, token);
//       }
//     } catch (err) {
//       setError(err instanceof Error ? err.message : 'Failed to fetch missions');
//     } finally { setLoading(false); }
//   };

//   const fetchAllEvidence = (missionList: Mission[], token: string | null) => {
//     missionList.forEach(async m => {
//       try {
//         const res = await fetch(`${process.env.REACT_APP_API_URL}/api/tasks/${m.task_id}/evidence`, { headers: { 'Authorization': `Bearer ${token}` } });
//         const data = await res.json();
//         if (data.success) setTaskEvidence(prev => ({ ...prev, [m.task_id]: data.data }));
//       } catch { /* silently skip */ }
//     });
//   };

//   const fetchTaskEvidence = async (taskId: number) => {
//     try {
//       const token = sessionStorage.getItem('token') || localStorage.getItem('token');
//       const response = await fetch(`${process.env.REACT_APP_API_URL}/api/tasks/${taskId}/evidence`, { headers: { 'Authorization': `Bearer ${token}` } });
//       const data = await response.json();
//       if (data.success) setTaskEvidence(prev => ({ ...prev, [taskId]: data.data }));
//     } catch (error) { console.error('Error fetching evidence:', error); }
//   };

//   const fetchTaskAdminNotes = async (reportId: number, taskId: number) => {
//     try {
//       const token = sessionStorage.getItem('token') || localStorage.getItem('token');
//       const response = await fetch(`${process.env.REACT_APP_API_URL}/api/reports/${reportId}/admin-notes`, { headers: { 'Authorization': `Bearer ${token}` } });
//       const data = await response.json();
//       if (data.success) setTaskAdminNotes(prev => ({ ...prev, [taskId]: data.data }));
//     } catch (error) { console.error('Error fetching admin notes:', error); }
//   };

//   const fetchTaskCompletionNotes = async (taskId: number) => {
//     try {
//       const token = sessionStorage.getItem('token') || localStorage.getItem('token');
//       const response = await fetch(`${process.env.REACT_APP_API_URL}/api/tasks/${taskId}/completion-notes`, { headers: { 'Authorization': `Bearer ${token}` } });
//       const data = await response.json();
//       if (data.success) setTaskCompletionNotes(prev => ({ ...prev, [taskId]: data.data }));
//     } catch (error) { console.error('Error fetching completion notes:', error); }
//   };

//   const fetchFullTaskDetails = async (taskId: number) => {
//     try {
//       const token = sessionStorage.getItem('token') || localStorage.getItem('token');
//       const response = await fetch(`${process.env.REACT_APP_API_URL}/api/tasks/task/${taskId}/full-details`, { headers: { 'Authorization': `Bearer ${token}` } });
//       const data = await response.json();
//       if (data.success) { setTaskDetails(prev => ({ ...prev, [taskId]: data.data.task })); return data.data; }
//     } catch (error) { console.error('Error fetching full task details:', error); }
//     return null;
//   };

//   const handleAcceptTask = async (taskId: number) => {
//     try {
//       setActionLoading(true);
//       const token = sessionStorage.getItem('token') || localStorage.getItem('token');
//       const response = await fetch(`${process.env.REACT_APP_API_URL}/api/volunteers/tasks/${taskId}/accept`, { method: 'PATCH', headers: { 'Authorization': `Bearer ${token}`, 'Content-Type': 'application/json' } });
//       const data = await response.json();
//       if (data.success) { await fetchMissions(); setIsTaskModalOpen(false); setSelectedTask(null); toast.success('Mission accepted successfully!'); }
//       else toast.error('Failed to accept task: ' + data.message);
//     } catch (error) { toast.error('Failed to accept task'); } finally { setActionLoading(false); }
//   };

//   const handleDeclineTask = async (taskId: number, reason: string) => {
//     try {
//       setActionLoading(true);
//       const token = sessionStorage.getItem('token') || localStorage.getItem('token');
//       const response = await fetch(`${process.env.REACT_APP_API_URL}/api/volunteers/tasks/${taskId}/decline`, { method: 'PATCH', headers: { 'Authorization': `Bearer ${token}`, 'Content-Type': 'application/json' }, body: JSON.stringify({ reason }) });
//       const data = await response.json();
//       if (data.success) { await fetchMissions(); setIsTaskModalOpen(false); setSelectedTask(null); toast.success('Mission declined'); }
//       else toast.error('Failed to decline task: ' + data.message);
//     } catch (error) { toast.error('Failed to decline task'); } finally { setActionLoading(false); }
//   };

//   const handleUploadEvidence = async (taskId: number, file: File, notes: string) => {
//     try {
//       setActionLoading(true);
//       const token = sessionStorage.getItem('token') || localStorage.getItem('token');
//       const formData = new FormData(); formData.append('proofs', file);
//       const uploadResponse = await fetch(`${process.env.REACT_APP_API_URL}/api/tasks/${taskId}/upload-proofs`, { method: 'POST', headers: { 'Authorization': `Bearer ${token}` }, body: formData });
//       const uploadData = await uploadResponse.json();
//       if (!uploadData.success) { toast.error('Failed to upload proof: ' + uploadData.message); return; }
//       const noteResponse = await fetch(`${process.env.REACT_APP_API_URL}/api/tasks/${taskId}/completion-notes`, { method: 'POST', headers: { 'Authorization': `Bearer ${token}`, 'Content-Type': 'application/json' }, body: JSON.stringify({ note_text: notes, volunteer_id: currentUser?.user_id }) });
//       const noteData = await noteResponse.json();
//       if (!noteData.success) { toast.error('Failed to save completion note: ' + noteData.message); return; }
//       const completeResponse = await fetch(`${process.env.REACT_APP_API_URL}/api/volunteers/tasks/${taskId}/complete`, { method: 'PATCH', headers: { 'Authorization': `Bearer ${token}`, 'Content-Type': 'application/json' } });
//       const completeData = await completeResponse.json();
//       if (completeData.success) { await fetchMissions(); setIsTaskModalOpen(false); setSelectedTask(null); toast.success('Mission completed successfully!'); }
//       else toast.error('Failed to complete mission: ' + completeData.message);
//     } catch (error) { toast.error('Failed to upload evidence and complete mission'); } finally { setActionLoading(false); }
//   };

//   const handleViewTaskDetails = async (mission: Mission) => {
//     setSelectedTask(mission);
//     try {
//       const fullDetails = await fetchFullTaskDetails(mission.task_id);
//       if (fullDetails) {
//         setSelectedTask(fullDetails.task);
//         setTaskEvidence(prev => ({ ...prev, [mission.task_id]: fullDetails.evidence || [] }));
//         setTaskAdminNotes(prev => ({ ...prev, [mission.task_id]: fullDetails.admin_notes || [] }));
//         setTaskCompletionNotes(prev => ({ ...prev, [mission.task_id]: fullDetails.completion_notes || [] }));
//       } else {
//         await Promise.all([fetchTaskEvidence(mission.task_id), fetchTaskAdminNotes(mission.report_id, mission.task_id), fetchTaskCompletionNotes(mission.task_id)]);
//       }
//     } catch (error) {
//       await Promise.all([fetchTaskEvidence(mission.task_id), fetchTaskAdminNotes(mission.report_id, mission.task_id), fetchTaskCompletionNotes(mission.task_id)]);
//     }
//     setIsTaskModalOpen(true);
//   };

//   const pendingCount = missions.filter(m => m.task_status_id === 1).length;
//   const activeCount = missions.filter(m => m.task_status_id === 2).length;
//   const completedCount = missions.filter(m => m.task_status_id === 3).length;

//   useEffect(() => {
//     let filtered = [...missions];
//     if (activeTab !== 'all') {
//       filtered = filtered.filter(m => {
//         if (activeTab === 'pending') return m.task_status_id === 1;
//         if (activeTab === 'active') return m.task_status_id === 2;
//         if (activeTab === 'completed') return m.task_status_id === 3;
//         return true;
//       });
//     }
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

//   const getDisplayedMissions = () => {
//     switch (activeTab) {
//       case 'pending': return displayedPendingTasks;
//       case 'active': return displayedActiveMissions;
//       case 'completed': return completedTasks;
//       default: return filteredMissions;
//     }
//   };
//   const displayedMissions = getDisplayedMissions();

//   return (
//     <div className="dashboard-wrapper animate-fade-in">
//       <div className="volunteer-dashboard-new" style={{ maxWidth: '1200px', margin: '0 auto' }}>

//         {/* Header */}
//         <div className="reports-header" style={{ marginBottom: '2rem' }}>
//           <div className="reports-header-content">
//             <h1 className="reports-title">Mission Board</h1>
//             <p className="reports-subtitle">Welcome back, {currentUser?.username}! Review and manage your missions.</p>
//           </div>
//           <div className="reports-header-actions">
//             <Link to="/dashboard" className="reports-btn refresh" style={{ display: 'inline-flex', alignItems: 'center', gap: '6px' }}>
//               <Icon type="material" name="MdHome" size={16} /> Back to Dashboard
//             </Link>
//           </div>
//         </div>

//         {/* Tabs and Filters */}
//         <div className="reports-filters-card" style={{ marginBottom: '2rem', padding: '1.5rem' }}>
//           <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '1.5rem', borderBottom: '2px solid var(--border)', paddingBottom: '1rem', flexWrap: 'wrap' }}>
//             {(['all', 'pending', 'active', 'completed'] as const).map(tab => {
//               const count = tab === 'all' ? missions.length : tab === 'pending' ? pendingCount : tab === 'active' ? activeCount : completedCount;
//               return (
//                 <button key={tab} onClick={() => setActiveTab(tab)} className={`tab-btn ${activeTab === tab ? 'active' : ''}`} style={{ padding: '0.5rem 1rem', background: activeTab === tab ? '#1e3f1a' : 'transparent', color: activeTab === tab ? 'white' : '#1e3f1a', border: '1px solid #1e3f1a', borderRadius: '8px', cursor: 'pointer', fontWeight: '600', transition: 'all 0.2s ease', textTransform: 'capitalize' }}>
//                   {tab === 'all' ? `All (${count})` : `${tab.charAt(0).toUpperCase() + tab.slice(1)} (${count})`}
//                 </button>
//               );
//             })}
//           </div>
//           <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: '1rem', flexWrap: 'wrap' }}>
//             <div style={{ flex: 1, minWidth: '250px', position: 'relative' }}>
//               <span style={{ position: 'absolute', left: '10px', top: '50%', transform: 'translateY(-50%)', display: 'flex', alignItems: 'center' }}>
//                 <Icon type="material" name="MdSearch" size={18} color="#1e3f1a" />
//               </span>
//               <input type="text" placeholder="Search missions..." value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} style={{ width: '100%', padding: '0.75rem 1rem 0.75rem 2.5rem', border: '2px solid #1e3f1a', borderRadius: '8px', fontSize: '0.95rem', background: 'white' }} />
//             </div>
//             <div style={{ background: '#e8f0e0', padding: '0.5rem 1rem', borderRadius: '8px', color: '#1e3f1a', fontWeight: '600', whiteSpace: 'nowrap' }}>
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
//               <Icon type="material" name="MdError" size={48} color="#c62828" />
//               <h3 style={{ color: '#1e3f1a' }}>Error Loading Missions</h3>
//               <p>{error}</p>
//               <button onClick={fetchMissions} className="reports-btn primary" style={{ background: '#1e3f1a' }}>Retry</button>
//             </div>
//           ) : displayedMissions.length === 0 ? (
//             <div className="reports-empty-state">
//               <Icon type="material" name={activeTab === 'all' ? 'MdAssignment' : activeTab === 'pending' ? 'MdHourglassEmpty' : activeTab === 'active' ? 'MdMyLocation' : 'MdCheckCircle'} size={48} color="#1e3f1a" />
//               <h3 style={{ color: '#1e3f1a' }}>No {activeTab} missions</h3>
//               <p>
//                 {activeTab === 'all' && 'There are no missions available.'}
//                 {activeTab === 'pending' && "You don't have any pending missions."}
//                 {activeTab === 'active' && "You're not on any active missions."}
//                 {activeTab === 'completed' && 'No completed missions yet.'}
//               </p>
//             </div>
//           ) : (
//             <div className="reports-grid" style={{ gridTemplateColumns: 'repeat(3, 1fr)' }}>
//               {displayedMissions.map((mission) => {
//                 const statusBadge = getTaskStatusBadge(mission.task_status_id);
//                 const badgeColors = getStatusBadgeBg(mission.task_status_id);
//                 const displayMission = taskDetails[mission.task_id] || mission;
//                 const evidencePhotos = taskEvidence[mission.task_id] || [];
//                 const firstPhoto = evidencePhotos.length > 0 ? getFullImageUrl(evidencePhotos[0].proof_url) : null;
//                 const cardTitle = getCardTitle(mission.animal_type, mission.animal_condition);
//                 const isCritical = mission.animal_condition?.toLowerCase().includes('critical') || mission.animal_condition?.toLowerCase().includes('injur');
//                 const condInTitle = cardTitle.toLowerCase().startsWith((mission.animal_condition || '').toLowerCase().split(' ')[0]);

//                 return (
//                   <div key={mission.task_id} className="mb-card" onClick={() => handleViewTaskDetails(mission)}>

//                     <div className="mb-card-img">
//                       {firstPhoto && (
//                         <img
//                           src={firstPhoto}
//                           alt="Evidence"
//                           onError={e => {
//                             (e.currentTarget as HTMLImageElement).style.display = 'none';
//                             const fb = (e.currentTarget as HTMLImageElement).nextElementSibling as HTMLElement;
//                             if (fb) fb.style.display = 'flex';
//                           }}
//                         />
//                       )}
//                       <div className="mb-card-placeholder" style={{ display: firstPhoto ? 'none' : 'flex' }}>
//                         <div className="mb-card-placeholder-icon">{getAnimalEmoji(mission.animal_type)}</div>
//                         <span className="mb-card-placeholder-label">No photo yet</span>
//                       </div>

//                       <span className="mb-card-badge" style={{ background: badgeColors.bg, color: badgeColors.color }}>{statusBadge.text}</span>
//                       <span className="mb-card-id">#{mission.report_id}</span>
//                     </div>

//                     <div className="mb-card-body">
//                       <div className="mb-card-title-row">
//                         <span className="mb-card-emoji">{getAnimalEmoji(mission.animal_type)}</span>
//                         <span className="mb-card-title">{cardTitle}</span>
//                       </div>

//                       <div className="mb-card-location">
//                         <Icon type="material" name="MdLocationOn" size={13} color="#1e3f1a" />
//                         <span className="mb-card-location-text">{mission.location_address}</span>
//                       </div>

//                       {mission.animal_condition && !condInTitle && (
//                         <span className={`mb-card-condition ${isCritical ? 'critical' : 'normal'}`}>{mission.animal_condition}</span>
//                       )}

//                       <p className="mb-card-desc">"{mission.description || 'No description provided'}"</p>

//                       <div className="mb-card-reporter">
//                         <div className="mb-card-reporter-left">
//                           <div className="mb-card-avatar">{mission.reporter_name?.charAt(0).toUpperCase() || '?'}</div>
//                           <span className="mb-card-reporter-name">{mission.reporter_name || 'Anonymous'}</span>
//                         </div>
//                         <span className="mb-card-time">{formatRelativeTime(displayMission.submitted_at)}</span>
//                       </div>
//                     </div>

//                     <div className="mb-card-footer">
//                       <button className="mb-card-btn" onClick={e => { e.stopPropagation(); handleViewTaskDetails(mission); }}>
//                         <Icon type="material" name="MdCheckCircle" size={15} color="#c8e6b0" />
//                         VIEW DETAILS
//                       </button>
//                     </div>
//                   </div>
//                 );
//               })}
//             </div>
//           )}
//         </div>

//         {activeTab === 'pending' && pendingTasks.length > 3 && !showAllPending && (
//           <div className="view-all-container" style={{ marginTop: '1rem', textAlign: 'center' }}>
//             <button onClick={() => setShowAllPending(true)} className="view-all-link" style={{ color: '#1e3f1a', borderColor: '#1e3f1a' }}>
//               View All {pendingTasks.length} Pending Missions →
//             </button>
//           </div>
//         )}
//         {activeTab === 'active' && activeMissions.length > 3 && !showAllActive && (
//           <div className="view-all-container" style={{ marginTop: '1rem', textAlign: 'center' }}>
//             <button onClick={() => setShowAllActive(true)} className="view-all-link" style={{ color: '#1e3f1a', borderColor: '#1e3f1a' }}>
//               View All {activeMissions.length} Active Missions →
//             </button>
//           </div>
//         )}
//       </div>

//       {selectedTask && (
//         <TaskDetailModal
//           task={selectedTask}
//           isOpen={isTaskModalOpen}
//           onClose={() => { setIsTaskModalOpen(false); setSelectedTask(null); }}
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
import { toast } from 'react-toastify';

// Icon library imports
import * as MdIcons from 'react-icons/md';
import * as FaIcons from 'react-icons/fa';
import * as Fa6Icons from 'react-icons/fa6';
import * as IoIcons from 'react-icons/io5';
import * as AiIcons from 'react-icons/ai';
import * as BiIcons from 'react-icons/bi';
import * as FiIcons from 'react-icons/fi';
import * as GiIcons from 'react-icons/gi';
import * as HiIcons from 'react-icons/hi2';
import * as RiIcons from 'react-icons/ri';
import * as TbIcons from 'react-icons/tb';
import * as CiIcons from 'react-icons/ci';
import * as SiIcons from 'react-icons/si';

type IconProps = { type: string; name: string; size?: number; color?: string; className?: string };

const getIconSet = (type: string) => {
  switch (type) {
    case 'material': return MdIcons;
    case 'fa': return FaIcons;
    case 'fa6': return Fa6Icons;
    case 'ion': return IoIcons;
    case 'ant': return AiIcons;
    case 'bootstrap': return BiIcons;
    case 'feather': return FiIcons;
    case 'game': return GiIcons;
    case 'hero': return HiIcons;
    case 'remix': return RiIcons;
    case 'tabler': return TbIcons;
    case 'circum': return CiIcons;
    case 'simple': return SiIcons;
    default: return FaIcons;
  }
};

const Icon: React.FC<IconProps> = ({ type, name, size = 20, color = 'inherit', className }) => {
  const icons = getIconSet(type);
  const Comp = (icons as Record<string, React.ComponentType<any>>)[name];
  if (!Comp) return null;
  return <Comp size={size} color={color} className={className} />;
};

// Interfaces
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
  user_id: number;
  description: string;
  location_address: string;
  user_note: string;
  submitted_at: string;
  animal_type: string;
  animal_condition: string;
  report_status_id: number;
  report_status: string;
  reporter_name: string;
  reporter_phone: string;
  reporter_email: string;
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
  if (type.includes('dog')) return '🐕';
  if (type.includes('cat')) return '🐈';
  if (type.includes('bird')) return '🐦';
  if (type.includes('rabbit') || type.includes('bunny')) return '🐇';
  if (type.includes('hamster')) return '🐹';
  if (type.includes('turtle') || type.includes('tortoise')) return '🐢';
  if (type.includes('horse')) return '🐴';
  if (type.includes('cow')) return '🐄';
  if (type.includes('goat')) return '🐐';
  if (type.includes('sheep')) return '🐑';
  if (type.includes('fish')) return '🐟';
  if (type.includes('snake')) return '🐍';
  if (type.includes('mouse') || type.includes('rat')) return '🐭';
  if (type.includes('monkey')) return '🐒';
  if (type.includes('pig')) return '🐷';
  if (type.includes('chicken')) return '🐔';
  if (type.includes('duck')) return '🦆';
  return '🐾';
};

const getCardTitle = (animalType: string, animalCondition: string): string => {
  const type = (animalType || '').trim();
  const cond = (animalCondition || '').trim();
  if (!type) return 'Animal in need';
  const adjectives = ['injured', 'stray', 'sick', 'lost', 'abandoned', 'wounded', 'starving', 'malnourished', 'critical', 'trapped', 'orphaned'];
  const isAdj = adjectives.some(a => cond.toLowerCase().includes(a));
  if (cond && isAdj) return `${cond.charAt(0).toUpperCase() + cond.slice(1).toLowerCase()} ${type}`;
  return `${type} in need`;
};

const formatDate = (dateString: string): string => {
  if (!dateString || dateString === 'Not available' || dateString === 'Invalid date' || dateString === '') return 'Not available';
  try {
    const date = new Date(dateString);
    if (isNaN(date.getTime())) return 'Not available';
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric', hour: '2-digit', minute: '2-digit' });
  } catch (e) { return 'Not available'; }
};

const formatShortDate = (dateString: string): string => {
  if (!dateString || dateString === 'Not available' || dateString === 'Invalid date' || dateString === '') return 'Not available';
  try {
    const date = new Date(dateString);
    if (isNaN(date.getTime())) return 'Not available';
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
  } catch (e) { return 'Not available'; }
};

const formatRelativeTime = (dateString: string): string => {
  if (!dateString || dateString === 'Not available' || dateString === 'Invalid date' || dateString === '') return 'Not available';
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
  } catch (e) { return 'Not available'; }
};

const getTaskStatusBadge = (statusId: number | undefined): { text: string; class: string; color: string } => {
  switch (statusId) {
    case 1: return { text: 'PENDING', class: 'pending', color: '#1e3f1a' };
    case 2: return { text: 'ACTIVE', class: 'active', color: '#1e3f1a' };
    case 3: return { text: 'COMPLETED', class: 'completed', color: '#1e3f1a' };
    case 4: return { text: 'DECLINED', class: 'declined', color: '#1e3f1a' };
    default: return { text: 'UNKNOWN', class: 'unknown', color: '#1e3f1a' };
  }
};

const getStatusBadgeBg = (id?: number) => {
  switch (id) {
    case 1: return { bg: '#1e3f1a', color: '#c8e6b0' };
    case 2: return { bg: '#1a3a5e', color: '#b0d4f1' };
    case 3: return { bg: '#3d1a5e', color: '#e0c8f5' };
    case 4: return { bg: '#4a4a4a', color: '#e0e0e0' };
    default: return { bg: '#4a4a4a', color: '#e0e0e0' };
  }
};

const calculateDistance = (lat1: number, lng1: number, lat2: number, lng2: number): number => {
  const R = 6371;
  const dLat = (lat2 - lat1) * Math.PI / 180;
  const dLng = (lng2 - lng1) * Math.PI / 180;
  const a = Math.sin(dLat / 2) * Math.sin(dLat / 2) + Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) * Math.sin(dLng / 2) * Math.sin(dLng / 2);
  return R * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
};

const getFullImageUrl = (proofUrl: string): string => {
  if (!proofUrl) return '';
  if (proofUrl.startsWith('http://') || proofUrl.startsWith('https://')) return proofUrl;
  const baseUrl = `${process.env.REACT_APP_API_URL}`;
  const cleanUrl = proofUrl.replace(/^\/+/, '');
  if (cleanUrl.startsWith('uploads/')) return `${baseUrl}/${cleanUrl}`;
  return `${baseUrl}/uploads/${cleanUrl}`;
};

// ─── Location Tracker ──────────────────────────────────────────────────────────
const LocationTracker: React.FC<{ taskId: number; isActive: boolean }> = ({ taskId, isActive }) => {
  const [watchId, setWatchId] = useState<number | null>(null);
  const [lastLocation, setLastLocation] = useState<GeolocationPosition | null>(null);
  const [isTracking, setIsTracking] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [pendingPoints, setPendingPoints] = useState<number>(0);
  const pendingQueue = React.useRef<any[]>([]);

  const saveLocation = async (latitude: number, longitude: number, accuracy: number) => {
    try {
      const token = sessionStorage.getItem('token') || localStorage.getItem('token');
      if (!token) return;
      const response = await fetch(`${process.env.REACT_APP_API_URL}/api/volunteer/tracking/point`, {
        method: 'POST',
        headers: { 'Authorization': `Bearer ${token}`, 'Content-Type': 'application/json' },
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
  };

  const retryPendingPoints = async () => {
    if (pendingQueue.current.length === 0) return;
    const token = sessionStorage.getItem('token') || localStorage.getItem('token');
    if (!token) return;
    const points = [...pendingQueue.current];
    pendingQueue.current = [];
    setPendingPoints(0);
    for (const point of points) {
      try {
        await fetch(`${process.env.REACT_APP_API_URL}/api/volunteer/tracking/point`, {
          method: 'POST',
          headers: { 'Authorization': `Bearer ${token}`, 'Content-Type': 'application/json' },
          body: JSON.stringify({ taskId, latitude: point.latitude, longitude: point.longitude, accuracy: point.accuracy })
        });
      } catch (error) {
        pendingQueue.current.push(point);
        setPendingPoints(pendingQueue.current.length);
      }
    }
  };

  const startTracking = () => {
    if (!navigator.geolocation) { setError('Geolocation is not supported by your browser'); return; }
    setError(null);
    navigator.geolocation.getCurrentPosition(
      (position) => { setLastLocation(position); setError(null); saveLocation(position.coords.latitude, position.coords.longitude, position.coords.accuracy || 0); },
      (error) => { console.warn('Initial position error:', error); },
      { enableHighAccuracy: false, timeout: 10000, maximumAge: 60000 }
    );
    const id = navigator.geolocation.watchPosition(
      (position) => {
        setLastLocation(position); setError(null);
        let shouldSave = true;
        if (lastLocation) {
          const distance = calculateDistance(lastLocation.coords.latitude, lastLocation.coords.longitude, position.coords.latitude, position.coords.longitude);
          const timeDiff = (position.timestamp - lastLocation.timestamp) / 1000;
          shouldSave = distance > 0.05 || timeDiff > 30;
        }
        if (shouldSave) saveLocation(position.coords.latitude, position.coords.longitude, position.coords.accuracy || 0);
        setLastLocation(position);
      },
      (error) => {
        let errorMsg = 'Unknown location error';
        switch (error.code) {
          case error.PERMISSION_DENIED: errorMsg = 'Location permission denied'; break;
          case error.POSITION_UNAVAILABLE: errorMsg = 'Location unavailable'; break;
          case error.TIMEOUT: errorMsg = 'Location request timed out'; break;
        }
        setError(errorMsg);
      },
      { enableHighAccuracy: true, timeout: 30000, maximumAge: 0 }
    );
    setWatchId(id);
    setIsTracking(true);
  };

  const stopTracking = () => {
    if (watchId !== null) {
      navigator.geolocation.clearWatch(watchId);
      setWatchId(null);
      setIsTracking(false);
    }
  };

  useEffect(() => {
    if (isActive) {
      const timer = setTimeout(() => { startTracking(); }, 1000);
      return () => { clearTimeout(timer); stopTracking(); };
    } else {
      stopTracking();
    }
    return () => { stopTracking(); };
  }, [isActive]);

  useEffect(() => {
    const handleOnline = () => { retryPendingPoints(); };
    window.addEventListener('online', handleOnline);
    return () => window.removeEventListener('online', handleOnline);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      if (navigator.onLine && pendingQueue.current.length > 0) retryPendingPoints();
    }, 30000);
    return () => clearInterval(interval);
  }, []);

  if (!isActive) return null;

  return (
    <div className="mb-location-tracker">
      <span className="mb-location-dot" style={{ background: error ? '#f44336' : (isTracking ? '#4caf50' : '#ff9800') }}></span>
      <span>{error ? 'Location Error' : (isTracking ? 'Sharing Location' : 'Starting...')}</span>
      {pendingPoints > 0 && <span className="mb-pending-badge">{pendingPoints} pending</span>}
    </div>
  );
};

// ─── Decline Modal ─────────────────────────────────────────────────────────────
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
      <div className="modal-content decline-modal" onClick={e => e.stopPropagation()}>
        <div className="modal-header decline-header" style={{ background: 'linear-gradient(135deg, #2D5A27 0%, #1e3f1a 100%)' }}>
          <div className="modal-header-left">
            <span className="modal-icon"><Icon type="material" name="MdCancel" size={22} color="white" /></span>
            <div>
              <h3 className="modal-title">Decline Mission</h3>
              <p className="modal-subtitle">Task #{taskId}</p>
            </div>
          </div>
          <button className="modal-close" onClick={onClose}>×</button>
        </div>
        <div className="modal-body">
          <div className="decline-info"><p>Please provide a reason for declining this mission.</p></div>
          <div className="form-group">
            <label className="form-label">Reason <span className="required">*</span></label>
            <select className="form-select" value={reason} onChange={(e) => setReason(e.target.value)}>
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
            disabled={!reason || (reason === 'other' && !otherReason)}
          >
            Decline Mission
          </button>
        </div>
      </div>
    </div>
  );
};

// ─── Task Detail Modal ─────────────────────────────────────────────────────────
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
  task, isOpen, onClose, onAccept, onDecline, onUploadEvidence,
  actionLoading, userProfile, evidence = [], adminNotes = [], completionNotes = []
}) => {
  const [activeTab, setActiveTab] = useState<'overview' | 'evidence' | 'notes'>('overview');
  const [zoom, setZoom] = useState<string | null>(null);
  const [showUploadForm, setShowUploadForm] = useState(false);
  const [uploadFile, setUploadFile] = useState<File | null>(null);
  const [uploadPreview, setUploadPreview] = useState<string | null>(null);
  const [uploadNotes, setUploadNotes] = useState('');
  const [uploadErr, setUploadErr] = useState<string | null>(null);
  const [uploading, setUploading] = useState(false);
  const [showDeclineModal, setShowDeclineModal] = useState(false);
  const [trackActive, setTrackActive] = useState(false);

  useEffect(() => { setTrackActive(task?.task_status_id === 2); }, [task?.task_status_id]);

  useEffect(() => {
    setUploadFile(null);
    setUploadPreview(null);
    setUploadNotes('');
    setUploadErr(null);
    setShowUploadForm(false);
    setActiveTab('overview');
  }, [task?.task_id, isOpen]);

  if (!isOpen || !task) return null;

  const badge = getTaskStatusBadge(task.task_status_id);
  const emoji = getAnimalEmoji(task.animal_type);

  // ─── KEY FIX: only allow upload if active AND no evidence yet ───────────────
  const canUpload = task.task_status_id === 2 && evidence.length === 0;
  const alreadySubmitted = task.task_status_id === 2 && evidence.length > 0;
  // ───────────────────────────────────────────────────────────────────────────

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const f = e.target.files?.[0];
    if (!f) return;
    setUploadErr(null);
    if (f.size > 5 * 1024 * 1024) { setUploadErr('File too large (max 5MB)'); return; }
    if (!['image/jpeg', 'image/png', 'image/jpg', 'image/gif'].includes(f.type)) { setUploadErr('Invalid type — JPG, PNG or GIF only'); return; }
    if (uploadPreview) URL.revokeObjectURL(uploadPreview);
    setUploadFile(f);
    setUploadPreview(URL.createObjectURL(f));
  };

  const removeFile = () => {
    if (uploadPreview) URL.revokeObjectURL(uploadPreview);
    setUploadFile(null);
    setUploadPreview(null);
    setUploadErr(null);
  };

  const submitEvidence = async () => {
    if (!uploadFile) { setUploadErr('Please select a photo'); return; }
    if (!uploadNotes.trim()) { setUploadErr('Please add completion notes'); return; }

    // Double-check: block if evidence already exists
    if (evidence.length > 0) {
      setUploadErr('Evidence has already been submitted for this task.');
      return;
    }

    setUploading(true);
    try {
      await onUploadEvidence?.(task.task_id, uploadFile, uploadNotes);
      removeFile();
      setUploadNotes('');
      setUploadErr(null);
      setShowUploadForm(false);
    } finally {
      setUploading(false);
    }
  };

  return (
    <>
      {task.task_status_id === 2 && <LocationTracker taskId={task.task_id} isActive={trackActive} />}

      <div className="modal-overlay" onClick={onClose}>
        <div className="mb-tdm-shell" onClick={e => e.stopPropagation()}>

          {/* Header */}
          <div className="mb-tdm-header">
            <div className="mb-tdm-header-left">
              <div className="mb-tdm-animal-badge">{emoji}</div>
              <div>
                <div className="mb-tdm-title">{task.animal_type} Rescue</div>
                <div className="mb-tdm-subtitle">Report #{task.report_id} · {formatRelativeTime(task.submitted_at)}</div>
              </div>
            </div>
            <div className="mb-tdm-header-right">
              <span className="mb-tdm-status-badge" style={{ background: '#2D5A27', color: 'white' }}>
                {badge.text}
              </span>
              <button className="mb-tdm-close" onClick={onClose}>✕</button>
            </div>
          </div>

          {/* Tabs */}
          <div className="mb-tdm-tabs">
            {(['overview', 'evidence', 'notes'] as const).map(t => (
              <button
                key={t}
                className={`mb-tdm-tab ${activeTab === t ? 'active' : ''}`}
                onClick={() => setActiveTab(t)}
              >
                {t === 'overview' && '📋 Overview'}
                {t === 'evidence' && `📸 Evidence${evidence.length ? ` (${evidence.length})` : ''}`}
                {t === 'notes' && `📝 Notes${adminNotes.length ? ` (${adminNotes.length})` : ''}`}
              </button>
            ))}
          </div>

          {/* Body */}
          <div className="mb-tdm-body">

            {/* OVERVIEW TAB */}
            {activeTab === 'overview' && (
              <div className="mb-tdm-overview">
                <div className="mb-tdm-condition-banner">
                  <span className="mb-tdm-condition-emoji">{emoji}</span>
                  <div>
                    <div className="mb-tdm-condition-animal">{task.animal_type}</div>
                    <span className="mb-tdm-condition-pill">{task.animal_condition}</span>
                  </div>
                  <button
                    className="mb-tdm-map-btn"
                    onClick={() => window.open(`https://maps.google.com/?q=${encodeURIComponent(task.location_address)}`, '_blank')}
                  >
                    <Icon type="fa" name="FaMapMarkerAlt" size={12} /> View Map
                  </button>
                </div>

                <div className="mb-tdm-two-col">
                  <div className="mb-tdm-section">
                    <div className="mb-tdm-section-title">📍 Location</div>
                    <div className="mb-tdm-location-text">{task.location_address}</div>
                  </div>
                  <div className="mb-tdm-section">
                    <div className="mb-tdm-section-title">👤 Reporter</div>
                    <div className="mb-tdm-reporter-row">
                      <div className="mb-tdm-avatar">
                        {task.reporter_name?.charAt(0).toUpperCase() || '?'}
                      </div>
                      <div>
                        <div className="mb-tdm-reporter-name">{task.reporter_name || 'Anonymous'}</div>
                        {task.reporter_phone && task.reporter_phone !== 'No phone' && (
                          <div className="mb-tdm-reporter-sub">{task.reporter_phone}</div>
                        )}
                        {task.reporter_email && task.reporter_email !== 'No email' && (
                          <div className="mb-tdm-reporter-sub">{task.reporter_email}</div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>

                <div className="mb-tdm-section">
                  <div className="mb-tdm-section-title">📄 Description</div>
                  <div className="mb-tdm-description">{task.description}</div>
                  {task.user_note && (
                    <div className="mb-tdm-note-box">
                      <span className="mb-tdm-note-label">Reporter's Note</span>
                      <div>{task.user_note}</div>
                    </div>
                  )}
                </div>

                <div className="mb-tdm-section">
                  <div className="mb-tdm-section-title">🕐 Timeline</div>
                  <div className="mb-tdm-timeline">
                    <div className="mb-tdm-timeline-item">
                      <div className="mb-tdm-tl-dot submitted" />
                      <div>
                        <div className="mb-tdm-tl-label">Reported</div>
                        <div className="mb-tdm-tl-val">{formatDate(task.submitted_at)}</div>
                      </div>
                    </div>
                    {task.assigned_at && (
                      <div className="mb-tdm-timeline-item">
                        <div className="mb-tdm-tl-dot assigned" />
                        <div>
                          <div className="mb-tdm-tl-label">Assigned</div>
                          <div className="mb-tdm-tl-val">{formatDate(task.assigned_at)}</div>
                        </div>
                      </div>
                    )}
                    {task.started_at && (
                      <div className="mb-tdm-timeline-item">
                        <div className="mb-tdm-tl-dot active" />
                        <div>
                          <div className="mb-tdm-tl-label">Started</div>
                          <div className="mb-tdm-tl-val">{formatDate(task.started_at)}</div>
                        </div>
                      </div>
                    )}
                    {task.completed_at && (
                      <div className="mb-tdm-timeline-item">
                        <div className="mb-tdm-tl-dot completed" />
                        <div>
                          <div className="mb-tdm-tl-label">Completed</div>
                          <div className="mb-tdm-tl-val">{formatDate(task.completed_at)}</div>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            )}

            {/* EVIDENCE TAB */}
            {activeTab === 'evidence' && (
              <div className="mb-tdm-evidence-tab">

                {/* Show uploaded evidence */}
                {evidence.length > 0 && (
                  <div className="mb-tdm-section">
                    <div className="mb-tdm-section-title">Uploaded Photo</div>
                    <div className="mb-tdm-evidence-grid">
                      {evidence.map(p => (
                        <div key={p.proof_id} className="mb-tdm-evidence-item" onClick={() => setZoom(getFullImageUrl(p.proof_url))}>
                          <img
                            src={getFullImageUrl(p.proof_url)}
                            alt="Evidence"
                            onError={e => { (e.currentTarget as any).style.display = 'none'; }}
                          />
                          <div className="mb-tdm-evidence-date">{formatShortDate(p.uploaded_at)}</div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Already submitted banner */}
                {alreadySubmitted && (
                  <div className="mb-tdm-section">
                    <div style={{
                      background: '#e8f5e9',
                      border: '1px solid #4caf50',
                      borderRadius: '8px',
                      padding: '12px 16px',
                      color: '#1b5e20',
                      fontWeight: 600,
                      display: 'flex',
                      alignItems: 'center',
                      gap: '8px'
                    }}>
                      ✅ Evidence submitted. This task is awaiting final completion confirmation.
                    </div>
                  </div>
                )}

                {/* Upload form - only shown if active and NO evidence yet */}
                {canUpload && (
                  <div className="mb-tdm-section mb-tdm-upload-section">
                    <div className="mb-tdm-section-title">Upload Evidence Photo</div>
                    <p style={{ fontSize: '0.85rem', color: '#555', marginBottom: '12px' }}>
                      ⚠️ You can only submit evidence <strong>once</strong>. Submitting will mark this mission as completed.
                    </p>

                    {uploadErr && <div className="mb-tdm-upload-err">{uploadErr}</div>}

                    {!showUploadForm ? (
                      <button className="mb-tdm-upload-btn" onClick={() => setShowUploadForm(true)}>
                        <Icon type="material" name="MdCameraAlt" size={16} /> Upload Photo & Complete Mission
                      </button>
                    ) : (
                      <>
                        {!uploadPreview ? (
                          <label className="mb-tdm-upload-zone">
                            <div className="mb-tdm-upload-icon">📷</div>
                            <div className="mb-tdm-upload-text">Click to choose a photo</div>
                            <div className="mb-tdm-upload-sub">JPG, PNG or GIF · max 5MB</div>
                            <input type="file" accept="image/*" onChange={handleFileChange} style={{ display: 'none' }} />
                          </label>
                        ) : (
                          <div className="mb-tdm-preview-wrap">
                            <img src={uploadPreview} alt="preview" className="mb-tdm-preview-img" />
                            <button className="mb-tdm-remove-photo" onClick={removeFile}>✕ Remove</button>
                          </div>
                        )}

                        <div className="mb-tdm-upload-notes-wrap">
                          <label className="mb-tdm-upload-notes-label">
                            Completion Notes <span style={{ color: '#c62828' }}>*</span>
                          </label>
                          <textarea
                            className="mb-tdm-upload-notes"
                            value={uploadNotes}
                            onChange={e => setUploadNotes(e.target.value)}
                            placeholder="Describe the rescue outcome, animal's condition, any challenges…"
                            rows={3}
                            maxLength={500}
                          />
                          <div className="mb-tdm-char-count">{uploadNotes.length}/500</div>
                        </div>

                        <div className="mb-tdm-upload-actions">
                          <button
                            className="mb-tdm-cancel-btn"
                            onClick={() => { setShowUploadForm(false); removeFile(); setUploadNotes(''); }}
                          >
                            Cancel
                          </button>
                          <button
                            className="mb-tdm-submit-btn"
                            onClick={submitEvidence}
                            disabled={!uploadFile || !uploadNotes.trim() || uploading || actionLoading}
                          >
                            {uploading || actionLoading ? '⏳ Submitting…' : '✓ Submit & Complete Mission'}
                          </button>
                        </div>
                      </>
                    )}
                  </div>
                )}

                {/* Nothing to show for non-active completed/declined tasks with no evidence */}
                {!canUpload && !alreadySubmitted && evidence.length === 0 && (
                  <div className="mb-tdm-empty">No evidence uploaded for this task.</div>
                )}
              </div>
            )}

            {/* NOTES TAB */}
            {activeTab === 'notes' && (
              <div className="mb-tdm-notes-tab">
                {completionNotes.length > 0 && (
                  <div className="mb-tdm-section">
                    <div className="mb-tdm-section-title">Completion Notes</div>
                    {completionNotes.map(n => (
                      <div key={n.note_id} className="mb-tdm-completion-note">
                        <div className="mb-tdm-note-header">
                          <span className="mb-tdm-note-author">{n.volunteer_name || 'Volunteer'}</span>
                          <span className="mb-tdm-note-date">{formatDate(n.created_at)}</span>
                        </div>
                        <div className="mb-tdm-note-body">{n.note_text}</div>
                      </div>
                    ))}
                  </div>
                )}

                {adminNotes.length > 0 && (
                  <div className="mb-tdm-section">
                    <div className="mb-tdm-section-title">Admin Notes</div>
                    {adminNotes.map(n => (
                      <div key={n.note_id} className="mb-tdm-admin-note">
                        <div className="mb-tdm-note-header">
                          <span className="mb-tdm-note-author">{n.admin_name || 'Admin'}</span>
                          <span className="mb-tdm-note-date">{formatRelativeTime(n.created_at)}</span>
                        </div>
                        <div className="mb-tdm-note-body">{n.note_text}</div>
                      </div>
                    ))}
                  </div>
                )}

                {completionNotes.length === 0 && adminNotes.length === 0 && (
                  <div className="mb-tdm-empty">No notes available</div>
                )}
              </div>
            )}
          </div>

          {/* Footer */}
          <div className="mb-tdm-footer">
            <div className="mb-tdm-footer-left">
              <span className="mb-tdm-task-chip">Task #{task.task_id}</span>
              {task.task_status_id === 1 && onAccept && onDecline && (
                <div className="mb-tdm-actions">
                  <button
                    className="mb-tdm-accept-btn"
                    onClick={() => onAccept(task.task_id)}
                    disabled={actionLoading}
                  >
                    ✓ Accept Mission
                  </button>
                  <button
                    className="mb-tdm-decline-btn"
                    onClick={() => setShowDeclineModal(true)}
                    disabled={actionLoading}
                  >
                    ✗ Decline
                  </button>
                </div>
              )}
              {task.task_status_id === 2 && (
                <div style={{ fontSize: '0.8rem', color: '#1e3f1a', fontStyle: 'italic' }}>
                  Go to Evidence tab to submit proof and complete this mission.
                </div>
              )}
            </div>
            <button className="mb-tdm-close-btn" onClick={onClose}>Close</button>
          </div>
        </div>
      </div>

      <DeclineModal
        isOpen={showDeclineModal}
        onClose={() => setShowDeclineModal(false)}
        onSubmit={(reason) => onDecline?.(task.task_id, reason)}
        taskId={task.task_id}
      />

      {zoom && (
        <div className="lightbox" onClick={() => setZoom(null)}>
          <img src={zoom} alt="Enlarged evidence" />
          <button className="lightbox-close" onClick={() => setZoom(null)}>×</button>
        </div>
      )}
    </>
  );
};

// ─── Main Mission Board ────────────────────────────────────────────────────────
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
  const [taskEvidence, setTaskEvidence] = useState<{ [key: number]: TaskProof[] }>({});
  const [taskAdminNotes, setTaskAdminNotes] = useState<{ [key: number]: AdminNote[] }>({});
  const [taskCompletionNotes, setTaskCompletionNotes] = useState<{ [key: number]: CompletionNote[] }>({});
  const [showAllActive, setShowAllActive] = useState(false);
  const [showAllPending, setShowAllPending] = useState(false);
  const [taskDetails, setTaskDetails] = useState<{ [key: number]: Mission }>({});

  const { user: currentUser } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!currentUser) { navigate('/login'); return; }
    fetchMissions();
  }, [currentUser]);

  const fetchMissions = async () => {
    try {
      setLoading(true);
      setError(null);
      const token = sessionStorage.getItem('token') || localStorage.getItem('token');
      const response = await fetch(`${process.env.REACT_APP_API_URL}/api/volunteers/tasks`, {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
      const data = await response.json();
      if (data.success && data.data) {
        setMissions(data.data);
        setFilteredMissions(data.data);
        fetchAllEvidence(data.data, token);
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch missions');
    } finally {
      setLoading(false);
    }
  };

  const fetchAllEvidence = (missionList: Mission[], token: string | null) => {
    missionList.forEach(async m => {
      try {
        const res = await fetch(`${process.env.REACT_APP_API_URL}/api/tasks/${m.task_id}/evidence`, {
          headers: { 'Authorization': `Bearer ${token}` }
        });
        const data = await res.json();
        if (data.success) setTaskEvidence(prev => ({ ...prev, [m.task_id]: data.data }));
      } catch { /* silently skip */ }
    });
  };

  const fetchTaskEvidence = async (taskId: number) => {
    try {
      const token = sessionStorage.getItem('token') || localStorage.getItem('token');
      const response = await fetch(`${process.env.REACT_APP_API_URL}/api/tasks/${taskId}/evidence`, {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      const data = await response.json();
      if (data.success) setTaskEvidence(prev => ({ ...prev, [taskId]: data.data }));
    } catch (error) {
      console.error('Error fetching evidence:', error);
    }
  };

  const fetchTaskAdminNotes = async (reportId: number, taskId: number) => {
    try {
      const token = sessionStorage.getItem('token') || localStorage.getItem('token');
      const response = await fetch(`${process.env.REACT_APP_API_URL}/api/reports/${reportId}/admin-notes`, {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      const data = await response.json();
      if (data.success) setTaskAdminNotes(prev => ({ ...prev, [taskId]: data.data }));
    } catch (error) {
      console.error('Error fetching admin notes:', error);
    }
  };

  const fetchTaskCompletionNotes = async (taskId: number) => {
    try {
      const token = sessionStorage.getItem('token') || localStorage.getItem('token');
      const response = await fetch(`${process.env.REACT_APP_API_URL}/api/tasks/${taskId}/completion-notes`, {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      const data = await response.json();
      if (data.success) setTaskCompletionNotes(prev => ({ ...prev, [taskId]: data.data }));
    } catch (error) {
      console.error('Error fetching completion notes:', error);
    }
  };

  const fetchFullTaskDetails = async (taskId: number) => {
    try {
      const token = sessionStorage.getItem('token') || localStorage.getItem('token');
      const response = await fetch(`${process.env.REACT_APP_API_URL}/api/tasks/task/${taskId}/full-details`, {
        headers: { 'Authorization': `Bearer ${token}` }
      });
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
      const token = sessionStorage.getItem('token') || localStorage.getItem('token');
      const response = await fetch(`${process.env.REACT_APP_API_URL}/api/volunteers/tasks/${taskId}/accept`, {
        method: 'PATCH',
        headers: { 'Authorization': `Bearer ${token}`, 'Content-Type': 'application/json' }
      });
      const data = await response.json();
      if (data.success) {
        await fetchMissions();
        setIsTaskModalOpen(false);
        setSelectedTask(null);
        toast.success('Mission accepted successfully!');
      } else {
        toast.error('Failed to accept task: ' + data.message);
      }
    } catch (error) {
      toast.error('Failed to accept task');
    } finally {
      setActionLoading(false);
    }
  };

  const handleDeclineTask = async (taskId: number, reason: string) => {
    try {
      setActionLoading(true);
      const token = sessionStorage.getItem('token') || localStorage.getItem('token');
      const response = await fetch(`${process.env.REACT_APP_API_URL}/api/volunteers/tasks/${taskId}/decline`, {
        method: 'PATCH',
        headers: { 'Authorization': `Bearer ${token}`, 'Content-Type': 'application/json' },
        body: JSON.stringify({ reason })
      });
      const data = await response.json();
      if (data.success) {
        await fetchMissions();
        setIsTaskModalOpen(false);
        setSelectedTask(null);
        toast.success('Mission declined');
      } else {
        toast.error('Failed to decline task: ' + data.message);
      }
    } catch (error) {
      toast.error('Failed to decline task');
    } finally {
      setActionLoading(false);
    }
  };

  // ─── FIXED: Single evidence + immediate completion ─────────────────────────
  const handleUploadEvidence = async (taskId: number, file: File, notes: string) => {
    try {
      setActionLoading(true);
      const token = sessionStorage.getItem('token') || localStorage.getItem('token');

      // Block if evidence already uploaded (extra safety on top of modal check)
      const existingEvidence = taskEvidence[taskId] || [];
      if (existingEvidence.length > 0) {
        toast.error('Evidence already submitted for this task. Only one submission is allowed.');
        return;
      }

      // Step 1: Upload the photo
      const formData = new FormData();
      formData.append('proofs', file);
      const uploadResponse = await fetch(`${process.env.REACT_APP_API_URL}/api/tasks/${taskId}/upload-proofs`, {
        method: 'POST',
        headers: { 'Authorization': `Bearer ${token}` },
        body: formData
      });
      const uploadData = await uploadResponse.json();
      if (!uploadData.success) {
        toast.error('Failed to upload photo: ' + uploadData.message);
        return;
      }

      // Step 2: Save the completion note
      const noteResponse = await fetch(`${process.env.REACT_APP_API_URL}/api/tasks/${taskId}/completion-notes`, {
        method: 'POST',
        headers: { 'Authorization': `Bearer ${token}`, 'Content-Type': 'application/json' },
        body: JSON.stringify({ note_text: notes, volunteer_id: currentUser?.user_id })
      });
      const noteData = await noteResponse.json();
      if (!noteData.success) {
        toast.error('Failed to save completion note: ' + noteData.message);
        return;
      }

      // Step 3: Mark task as completed + award badges
      const completeResponse = await fetch(`${process.env.REACT_APP_API_URL}/api/volunteers/tasks/${taskId}/complete`, {
        method: 'PATCH',
        headers: { 'Authorization': `Bearer ${token}`, 'Content-Type': 'application/json' }
      });
      const completeData = await completeResponse.json();

      if (completeData.success) {
        await fetchMissions();
        setIsTaskModalOpen(false);
        setSelectedTask(null);

        // Show badge message if any were awarded
        if (completeData.data?.badges_awarded?.length > 0) {
          toast.success(`🏆 Mission completed! Badges earned: ${completeData.data.badges_awarded.join(', ')}`);
        } else {
          toast.success('✅ Mission completed successfully! Thank you for your service!');
        }
      } else {
        toast.error('Failed to complete mission: ' + completeData.message);
      }
    } catch (error) {
      console.error('Upload evidence error:', error);
      toast.error('Something went wrong. Please try again.');
    } finally {
      setActionLoading(false);
    }
  };
  // ───────────────────────────────────────────────────────────────────────────

  const handleViewTaskDetails = async (mission: Mission) => {
    setSelectedTask(mission);
    try {
      const fullDetails = await fetchFullTaskDetails(mission.task_id);
      if (fullDetails) {
        setSelectedTask(fullDetails.task);
        setTaskEvidence(prev => ({ ...prev, [mission.task_id]: fullDetails.evidence || [] }));
        setTaskAdminNotes(prev => ({ ...prev, [mission.task_id]: fullDetails.admin_notes || [] }));
        setTaskCompletionNotes(prev => ({ ...prev, [mission.task_id]: fullDetails.completion_notes || [] }));
      } else {
        await Promise.all([
          fetchTaskEvidence(mission.task_id),
          fetchTaskAdminNotes(mission.report_id, mission.task_id),
          fetchTaskCompletionNotes(mission.task_id)
        ]);
      }
    } catch (error) {
      await Promise.all([
        fetchTaskEvidence(mission.task_id),
        fetchTaskAdminNotes(mission.report_id, mission.task_id),
        fetchTaskCompletionNotes(mission.task_id)
      ]);
    }
    setIsTaskModalOpen(true);
  };

  const pendingCount = missions.filter(m => m.task_status_id === 1).length;
  const activeCount = missions.filter(m => m.task_status_id === 2).length;
  const completedCount = missions.filter(m => m.task_status_id === 3).length;

  useEffect(() => {
    let filtered = [...missions];
    if (activeTab !== 'all') {
      filtered = filtered.filter(m => {
        if (activeTab === 'pending') return m.task_status_id === 1;
        if (activeTab === 'active') return m.task_status_id === 2;
        if (activeTab === 'completed') return m.task_status_id === 3;
        return true;
      });
    }
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

  const getDisplayedMissions = () => {
    switch (activeTab) {
      case 'pending': return displayedPendingTasks;
      case 'active': return displayedActiveMissions;
      case 'completed': return completedTasks;
      default: return filteredMissions;
    }
  };
  const displayedMissions = getDisplayedMissions();

  return (
    <div className="dashboard-wrapper animate-fade-in">
      <div className="volunteer-dashboard-new" style={{ maxWidth: '1200px', margin: '0 auto' }}>

        {/* Header */}
        <div className="reports-header" style={{ marginBottom: '2rem' }}>
          <div className="reports-header-content">
            <h1 className="reports-title">Mission Board</h1>
            <p className="reports-subtitle">Welcome back, {currentUser?.username}! Review and manage your missions.</p>
          </div>
          <div className="reports-header-actions">
            <Link to="/dashboard" className="reports-btn refresh" style={{ display: 'inline-flex', alignItems: 'center', gap: '6px' }}>
              <Icon type="material" name="MdHome" size={16} /> Back to Dashboard
            </Link>
          </div>
        </div>

        {/* Tabs and Filters */}
        <div className="reports-filters-card" style={{ marginBottom: '2rem', padding: '1.5rem' }}>
          <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '1.5rem', borderBottom: '2px solid var(--border)', paddingBottom: '1rem', flexWrap: 'wrap' }}>
            {(['all', 'pending', 'active', 'completed'] as const).map(tab => {
              const count = tab === 'all' ? missions.length : tab === 'pending' ? pendingCount : tab === 'active' ? activeCount : completedCount;
              return (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`tab-btn ${activeTab === tab ? 'active' : ''}`}
                  style={{
                    padding: '0.5rem 1rem',
                    background: activeTab === tab ? '#1e3f1a' : 'transparent',
                    color: activeTab === tab ? 'white' : '#1e3f1a',
                    border: '1px solid #1e3f1a',
                    borderRadius: '8px',
                    cursor: 'pointer',
                    fontWeight: '600',
                    transition: 'all 0.2s ease',
                    textTransform: 'capitalize'
                  }}
                >
                  {tab === 'all' ? `All (${count})` : `${tab.charAt(0).toUpperCase() + tab.slice(1)} (${count})`}
                </button>
              );
            })}
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: '1rem', flexWrap: 'wrap' }}>
            <div style={{ flex: 1, minWidth: '250px', position: 'relative' }}>
              <span style={{ position: 'absolute', left: '10px', top: '50%', transform: 'translateY(-50%)', display: 'flex', alignItems: 'center' }}>
                <Icon type="material" name="MdSearch" size={18} color="#1e3f1a" />
              </span>
              <input
                type="text"
                placeholder="Search missions..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                style={{ width: '100%', padding: '0.75rem 1rem 0.75rem 2.5rem', border: '2px solid #1e3f1a', borderRadius: '8px', fontSize: '0.95rem', background: 'white' }}
              />
            </div>
            <div style={{ background: '#e8f0e0', padding: '0.5rem 1rem', borderRadius: '8px', color: '#1e3f1a', fontWeight: '600', whiteSpace: 'nowrap' }}>
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
              <Icon type="material" name="MdError" size={48} color="#c62828" />
              <h3 style={{ color: '#1e3f1a' }}>Error Loading Missions</h3>
              <p>{error}</p>
              <button onClick={fetchMissions} className="reports-btn primary" style={{ background: '#1e3f1a' }}>Retry</button>
            </div>
          ) : displayedMissions.length === 0 ? (
            <div className="reports-empty-state">
              <Icon
                type="material"
                name={activeTab === 'all' ? 'MdAssignment' : activeTab === 'pending' ? 'MdHourglassEmpty' : activeTab === 'active' ? 'MdMyLocation' : 'MdCheckCircle'}
                size={48}
                color="#1e3f1a"
              />
              <h3 style={{ color: '#1e3f1a' }}>No {activeTab} missions</h3>
              <p>
                {activeTab === 'all' && 'There are no missions available.'}
                {activeTab === 'pending' && "You don't have any pending missions."}
                {activeTab === 'active' && "You're not on any active missions."}
                {activeTab === 'completed' && 'No completed missions yet.'}
              </p>
            </div>
          ) : (
            <div className="reports-grid" style={{ gridTemplateColumns: 'repeat(3, 1fr)' }}>
              {displayedMissions.map((mission) => {
                const statusBadge = getTaskStatusBadge(mission.task_status_id);
                const badgeColors = getStatusBadgeBg(mission.task_status_id);
                const displayMission = taskDetails[mission.task_id] || mission;
                const evidencePhotos = taskEvidence[mission.task_id] || [];
                const firstPhoto = evidencePhotos.length > 0 ? getFullImageUrl(evidencePhotos[0].proof_url) : null;
                const cardTitle = getCardTitle(mission.animal_type, mission.animal_condition);
                const isCritical = mission.animal_condition?.toLowerCase().includes('critical') || mission.animal_condition?.toLowerCase().includes('injur');
                const condInTitle = cardTitle.toLowerCase().startsWith((mission.animal_condition || '').toLowerCase().split(' ')[0]);

                return (
                  <div key={mission.task_id} className="mb-card" onClick={() => handleViewTaskDetails(mission)}>
                    <div className="mb-card-img">
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
                      <div className="mb-card-placeholder" style={{ display: firstPhoto ? 'none' : 'flex' }}>
                        <div className="mb-card-placeholder-icon">{getAnimalEmoji(mission.animal_type)}</div>
                        <span className="mb-card-placeholder-label">No photo yet</span>
                      </div>
                      <span className="mb-card-badge" style={{ background: badgeColors.bg, color: badgeColors.color }}>{statusBadge.text}</span>
                      <span className="mb-card-id">#{mission.report_id}</span>
                    </div>

                    <div className="mb-card-body">
                      <div className="mb-card-title-row">
                        <span className="mb-card-emoji">{getAnimalEmoji(mission.animal_type)}</span>
                        <span className="mb-card-title">{cardTitle}</span>
                      </div>
                      <div className="mb-card-location">
                        <Icon type="material" name="MdLocationOn" size={13} color="#1e3f1a" />
                        <span className="mb-card-location-text">{mission.location_address}</span>
                      </div>
                      {mission.animal_condition && !condInTitle && (
                        <span className={`mb-card-condition ${isCritical ? 'critical' : 'normal'}`}>{mission.animal_condition}</span>
                      )}
                      <p className="mb-card-desc">"{mission.description || 'No description provided'}"</p>
                      <div className="mb-card-reporter">
                        <div className="mb-card-reporter-left">
                          <div className="mb-card-avatar">{mission.reporter_name?.charAt(0).toUpperCase() || '?'}</div>
                          <span className="mb-card-reporter-name">{mission.reporter_name || 'Anonymous'}</span>
                        </div>
                        <span className="mb-card-time">{formatRelativeTime(displayMission.submitted_at)}</span>
                      </div>
                    </div>

                    <div className="mb-card-footer">
                      <button className="mb-card-btn" onClick={e => { e.stopPropagation(); handleViewTaskDetails(mission); }}>
                        <Icon type="material" name="MdCheckCircle" size={15} color="#c8e6b0" />
                        VIEW DETAILS
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>

        {activeTab === 'pending' && pendingTasks.length > 3 && !showAllPending && (
          <div className="view-all-container" style={{ marginTop: '1rem', textAlign: 'center' }}>
            <button onClick={() => setShowAllPending(true)} className="view-all-link" style={{ color: '#1e3f1a', borderColor: '#1e3f1a' }}>
              View All {pendingTasks.length} Pending Missions →
            </button>
          </div>
        )}
        {activeTab === 'active' && activeMissions.length > 3 && !showAllActive && (
          <div className="view-all-container" style={{ marginTop: '1rem', textAlign: 'center' }}>
            <button onClick={() => setShowAllActive(true)} className="view-all-link" style={{ color: '#1e3f1a', borderColor: '#1e3f1a' }}>
              View All {activeMissions.length} Active Missions →
            </button>
          </div>
        )}
      </div>

      {selectedTask && (
        <TaskDetailModal
          task={selectedTask}
          isOpen={isTaskModalOpen}
          onClose={() => { setIsTaskModalOpen(false); setSelectedTask(null); }}
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