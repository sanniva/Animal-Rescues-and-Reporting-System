import React, { useState, useEffect, useCallback, useRef } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell } from 'recharts';
import { useAuth } from '../../context/AuthContext';
import { Heatmap } from '../../components/Dashboard/HeatMap';
import Icon from '../../components/Icon';
import './Dashboard.css';
import { toast } from 'react-toastify';

//Interfaces 
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

// Design tokens
const T = {
  forest: '#1e3f1a',
  green: '#2D5A27',
  greenLt: '#3d7035',
  sage: '#7aaa6a',
  mint: '#c8e6b0',
  cream: '#faf6ee',
  sand: '#f0e8d4',
  border: '#e2d9c6',
  white: '#ffffff',
  text: '#1a2e1c',
  textMid: '#4a6b4a',
  textSoft: '#8a9e8a',
  amber: '#e07a20',
  amberLt: '#fdf0e0',
  red: '#c62828',
  redLt: '#ffebee',
  blue: '#1565c0',
  blueLt: '#e3f2fd',
  shadow: 'rgba(30,63,26,0.10)',
  shadowMd: 'rgba(30,63,26,0.16)',
  shadowLg: 'rgba(30,63,26,0.22)',
  radius: '16px',
  radiusLg: '24px',
  radiusSm: '10px',
  radiusXs: '6px',
};

// Helpers
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
  return c.startsWith('uploads/') ? `${process.env.REACT_APP_API_URL}/${c}` : `${process.env.REACT_APP_API_URL}/uploads/${c}`;
};

const animalEmoji = (type: string) => {
  const s = type?.toLowerCase() || '';
  if (s.includes('dog')) return '🐕';
  if (s.includes('cat')) return '🐈';
  if (s.includes('bird')) return '🐦';
  if (s.includes('rabbit') || s.includes('bunny')) return '🐇';
  if (s.includes('hamster')) return '🐹';
  if (s.includes('turtle')) return '🐢';
  if (s.includes('horse')) return '🐴';
  if (s.includes('cow')) return '🐄';
  if (s.includes('goat')) return '🐐';
  if (s.includes('sheep')) return '🐑';
  if (s.includes('fish')) return '🐟';
  if (s.includes('snake')) return '🐍';
  if (s.includes('mouse') || s.includes('rat')) return '🐭';
  if (s.includes('monkey')) return '🐒';
  if (s.includes('pig')) return '🐷';
  if (s.includes('chicken')) return '🐔';
  if (s.includes('duck')) return '🦆';
  return '🐾';
};

const statusLabel = (s: string) => (s || 'Unknown').replace(/_/g, ' ').replace(/\b\w/g, c => c.toUpperCase());
const taskBadge = (id?: number) => {
  switch (id) {
    case 1: return { text: 'ASSIGNED', bg: '#fff8e1', color: '#e65100', dot: '#ffb300' };
    case 2: return { text: 'IN PROGRESS', bg: '#e8f5e9', color: '#2e7d32', dot: '#43a047' };
    case 3: return { text: 'COMPLETED', bg: '#e8f5e9', color: '#1b5e20', dot: '#2e7d32' };
    case 4: return { text: 'DECLINED', bg: '#ffebee', color: '#c62828', dot: '#e53935' };
    default: return { text: 'UNKNOWN', bg: '#f5f5f5', color: '#757575', dot: '#9e9e9e' };
  }
};
const statusColor = (s?: string) => {
  const n = s?.toLowerCase() || '';
  if (n.includes('submitted')) return { bg: T.blueLt, color: T.blue };
  if (n.includes('assigned')) return { bg: '#fff8e1', color: '#e65100' };
  if (n.includes('progress')) return { bg: '#e8f5e9', color: '#2e7d32' };
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

//  Micro components 
const Pill: React.FC<{ bg: string; color: string; children: React.ReactNode; dot?: string }> = ({ bg, color, children, dot }) => (
  <span className="pill" style={{ background: bg, color }}>
    {dot && <span className="pill-dot" style={{ background: dot }} />}
    {children}
  </span>
);

const Divider = () => <div className="divider" />;

const Avatar: React.FC<{ name?: string | null; size?: number; bg?: string }> = ({ name, size = 36, bg = T.forest }) => (
  <div className="avatar" style={{ width: size, height: size, background: bg }}>
    {name?.charAt(0).toUpperCase() || '?'}
  </div>
);

interface CardProps {
  children: React.ReactNode;
  style?: React.CSSProperties;
  hover?: boolean;
  className?: string;
  key?: string | number;
}

const Card: React.FC<CardProps> = ({ children, style, hover, className, key }) => {
  const [hovered, setHovered] = useState(false);
  return (
    <div
      key={key}
      className={`card ${hover ? 'card-hover' : ''} ${className || ''}`}
      onMouseEnter={() => hover && setHovered(true)}
      onMouseLeave={() => hover && setHovered(false)}
      style={{
        borderColor: hovered ? T.sage : T.border,
        boxShadow: hovered ? `0 8px 28px ${T.shadowMd}` : `0 2px 8px ${T.shadow}`,
        ...style
      }}
    >
      {children}
    </div>
  );
};

// Location Tracker 
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
      const res = await fetch(`${process.env.REACT_APP_API_URL}/api/volunteer/tracking/point`, { method: 'POST', headers: { 'Authorization': `Bearer ${token}`, 'Content-Type': 'application/json' }, body: JSON.stringify({ taskId, latitude: lat, longitude: lng, accuracy: acc }) });
      const data = await res.json();
      if (!data.success) { queue.current.push({ lat, lng, acc }); setPending(queue.current.length); }
    } catch { queue.current.push({ lat, lng, acc }); setPending(queue.current.length); }
  }, [taskId]);

  const retry = useCallback(async () => {
    if (!queue.current.length) return;
    const token = getToken(); if (!token) return;
    const pts = [...queue.current]; queue.current = []; setPending(0);
    for (const p of pts) { try { await fetch(`${process.env.REACT_APP_API_URL}/api/volunteer/tracking/point`, { method: 'POST', headers: { 'Authorization': `Bearer ${token}`, 'Content-Type': 'application/json' }, body: JSON.stringify({ taskId, latitude: p.lat, longitude: p.lng, accuracy: p.acc }) }); } catch { queue.current.push(p); setPending(queue.current.length); } }
  }, [taskId]);

  const start = useCallback(() => {
    if (!navigator.geolocation) { setError('Geolocation not supported'); return; }
    setError(null);
    navigator.geolocation.getCurrentPosition(pos => { setLastLoc(pos); save(pos.coords.latitude, pos.coords.longitude, pos.coords.accuracy || 0); }, () => { }, { enableHighAccuracy: false, timeout: 10000, maximumAge: 60000 });
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
    <div className="location-tracker" style={{ background: error ? T.redLt : '#e8f5e9' }}>
      <span className="location-dot" style={{ background: error ? T.red : (tracking ? '#43a047' : '#ff9800') }} />
      {error ? 'Location Error' : tracking ? 'Sharing Location' : 'Starting...'}
      {pending > 0 && <span className="pending-badge" style={{ background: T.amberLt, color: T.amber }}>{pending} pending</span>}
    </div>
  );
};

// Decline Modal 
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
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content decline-modal" onClick={e => e.stopPropagation()}>
        <div className="modal-header decline-header">
          <div>
            <div className="modal-title">Decline Task #{taskId}</div>
            <div className="modal-subtitle">Please provide a reason for declining</div>
          </div>
          <button className="modal-close" onClick={onClose}>×</button>
        </div>
        <div className="modal-body">
          <select className="form-select" value={reason} onChange={e => setReason(e.target.value)}>
            <option value="">Select a reason</option>
            <option value="Too far away">Too far away</option>
            <option value="Already have active tasks">Already have active tasks</option>
            <option value="Animal type not suitable">Animal type not suitable</option>
            <option value="Condition too severe">Condition too severe</option>
            <option value="Equipment not available">Equipment not available</option>
            <option value="other">Other (please specify)</option>
          </select>
          {reason === 'other' && (
            <textarea className="form-textarea" value={other} onChange={e => setOther(e.target.value)} placeholder="Enter your reason..." rows={3} />
          )}
        </div>
        <div className="modal-footer">
          <button className="btn-secondary" onClick={onClose}>Cancel</button>
          <button className="btn-danger" onClick={go} disabled={!reason || (reason === 'other' && !other) || sub}>
            {sub ? 'Processing…' : 'Decline Task'}
          </button>
        </div>
      </div>
    </div>
  );
};

//  Task Detail Modal 
const TaskDetailModal: React.FC<{
  task: VolunteerTask | null; isOpen: boolean; onClose: () => void;
  onUploadEvidence: (id: number, f: File, n: string) => Promise<void>;
  actionLoading: boolean; userProfile: UserProfile | null;
  evidence?: TaskProof[]; adminNotes?: AdminNote[];
}> = ({ task, isOpen, onClose, onUploadEvidence, actionLoading, userProfile, evidence = [], adminNotes = [] }) => {
  const [activeTab, setActiveTab] = useState<'overview' | 'evidence' | 'notes'>('overview');
  const [zoom, setZoom] = useState<string | null>(null);
  const [trackActive, setTrackActive] = useState(false);

  // Evidence upload state
  const [showUploadForm, setShowUploadForm] = useState(false);
  const [uploadFile, setUploadFile] = useState<File | null>(null);
  const [uploadPreview, setUploadPreview] = useState<string | null>(null);
  const [uploadNotes, setUploadNotes] = useState('');
  const [uploadErr, setUploadErr] = useState<string | null>(null);
  const [uploading, setUploading] = useState(false);

  useEffect(() => { setTrackActive(task?.task_status_id === 2); }, [task?.task_status_id]);
  useEffect(() => {
    setUploadFile(null);
    if (uploadPreview) URL.revokeObjectURL(uploadPreview);
    setUploadPreview(null);
    setUploadNotes('');
    setUploadErr(null);
    setShowUploadForm(false);
    setActiveTab('overview');
  }, [task?.task_id, isOpen]);

  if (!isOpen || !task) return null;

  const badge = taskBadge(task.task_status_id);
  const emoji = animalEmoji(task.animal_type);
  const canUpload = task.task_status_id === 2;

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
    setUploading(true);
    try {
      await onUploadEvidence(task.task_id, uploadFile, uploadNotes);
     
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
        <div className="tdm-shell" onClick={e => e.stopPropagation()}>

          {/*  Header */}
          <div className="tdm-header">
            <div className="tdm-header-left">
              <div className="tdm-animal-badge">{emoji}</div>
              <div>
                <div className="tdm-title">{task.animal_type} Rescue</div>
                <div className="tdm-subtitle">Report #{task.report_id} · {fmtRel(task.submitted_at)}</div>
              </div>
            </div>
            <div className="tdm-header-right">
              <Pill bg={badge.bg} color={badge.color} dot={badge.dot}>{badge.text}</Pill>
              <button className="tdm-close" onClick={onClose}>✕</button>
            </div>
          </div>

          {/* ── Tabs ── */}
          <div className="tdm-tabs">
            {(['overview', 'evidence', 'notes'] as const).map(t => (
              <button
                key={t}
                className={`tdm-tab ${activeTab === t ? 'active' : ''}`}
                onClick={() => setActiveTab(t)}
              >
                {t === 'overview' && '📋 Overview'}
                {t === 'evidence' && `📸 Evidence${evidence.length ? ` (${evidence.length})` : ''}`}
                {t === 'notes' && `📝 Notes${adminNotes.length ? ` (${adminNotes.length})` : ''}`}
              </button>
            ))}
          </div>

          {/*  Body  */}
          <div className="tdm-body">

            {/* OVERVIEW TAB */}
            {activeTab === 'overview' && (
              <div className="tdm-overview">
                <div className="tdm-condition-banner">
                  <span className="tdm-condition-emoji">{emoji}</span>
                  <div>
                    <div className="tdm-condition-animal">{task.animal_type}</div>
                    <Pill bg={T.redLt} color={T.red}>{task.animal_condition}</Pill>
                  </div>
                  <button
                    className="tdm-map-btn"
                    onClick={() => window.open(`https://maps.google.com/?q=${encodeURIComponent(task.location_address)}`, '_blank')}
                  >
                    <Icon type="fa" name="FaMapMarkerAlt" size={12} /> View Map
                  </button>
                </div>

                <div className="tdm-two-col">
                  <div className="tdm-section">
                    <div className="tdm-section-title">📍 Location</div>
                    <div className="tdm-location-text">{task.location_address}</div>
                  </div>
                  <div className="tdm-section">
                    <div className="tdm-section-title">👤 Reporter</div>
                    <div className="tdm-reporter-row">
                      <Avatar name={task.reporter_name} size={32} />
                      <div>
                        <div className="tdm-reporter-name">{task.reporter_name || 'Anonymous'}</div>
                        {hasPhone(task.reporter_phone) && <div className="tdm-reporter-sub">{fmtPhone(task.reporter_phone)}</div>}
                        {hasEmail(task.reporter_email) && <div className="tdm-reporter-sub">{task.reporter_email}</div>}
                      </div>
                    </div>
                  </div>
                </div>

                <div className="tdm-section">
                  <div className="tdm-section-title">📄 Description</div>
                  <div className="tdm-description">{task.description}</div>
                  {task.user_note && (
                    <div className="tdm-note-box">
                      <span className="tdm-note-label">Reporter's Note</span>
                      <div>{task.user_note}</div>
                    </div>
                  )}
                </div>

                <div className="tdm-section">
                  <div className="tdm-section-title">🕐 Timeline</div>
                  <div className="tdm-timeline">
                    <div className="tdm-timeline-item">
                      <div className="tdm-tl-dot tl-submitted" />
                      <div><div className="tdm-tl-label">Reported</div><div className="tdm-tl-val">{fmtDate(task.submitted_at)}</div></div>
                    </div>
                    {task.assigned_at && (
                      <div className="tdm-timeline-item">
                        <div className="tdm-tl-dot tl-assigned" />
                        <div><div className="tdm-tl-label">Assigned</div><div className="tdm-tl-val">{fmtDate(task.assigned_at)}</div></div>
                      </div>
                    )}
                    {task.started_at && (
                      <div className="tdm-timeline-item">
                        <div className="tdm-tl-dot tl-active" />
                        <div><div className="tdm-tl-label">Started</div><div className="tdm-tl-val">{fmtDate(task.started_at)}</div></div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            )}

            {/* EVIDENCE TAB */}
            {activeTab === 'evidence' && (
              <div className="tdm-evidence-tab">
                {/* Existing evidence */}
                {evidence.length > 0 && (
                  <div className="tdm-section">
                    <div className="tdm-section-title">Uploaded Photos</div>
                    <div className="tdm-evidence-grid">
                      {evidence.map(p => (
                        <div key={p.proof_id} className="tdm-evidence-item" onClick={() => setZoom(imgUrl(p.proof_url))}>
                          <img src={imgUrl(p.proof_url)} alt="" onError={e => { (e.currentTarget as any).style.display = 'none'; }} />
                          <div className="tdm-evidence-date">{fmtShort(p.uploaded_at)}</div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Upload section — only when in_progress */}
                {canUpload && (
                  <div className="tdm-section tdm-upload-section">
                    <div className="tdm-section-title">
                      {evidence.length > 0 ? 'Add More Evidence' : 'Upload Evidence Photo'}
                    </div>

                    {uploadErr && <div className="tdm-upload-err">{uploadErr}</div>}

                    {/* Show upload button first, expand form on click */}
                    {!showUploadForm ? (
                      <button className="tdm-upload-trigger-btn" onClick={() => setShowUploadForm(true)}>
                        <Icon type="fa" name="FaCamera" size={14} /> Upload Photo
                      </button>
                    ) : (
                      <>
                        {/* Photo picker */}
                        {!uploadPreview ? (
                          <label className="tdm-upload-zone">
                            <div className="tdm-upload-icon">📷</div>
                            <div className="tdm-upload-text">Click to choose a photo</div>
                            <div className="tdm-upload-sub">JPG, PNG or GIF · max 5MB</div>
                            <input type="file" accept="image/*" onChange={handleFileChange} style={{ display: 'none' }} />
                          </label>
                        ) : (
                          <div className="tdm-preview-wrap">
                            <img src={uploadPreview} alt="preview" className="tdm-preview-img" />
                            <button className="tdm-remove-photo" onClick={removeFile}>✕ Remove</button>
                          </div>
                        )}

                        {/* Notes */}
                        <div className="tdm-upload-notes-wrap">
                          <label className="tdm-upload-notes-label">
                            Completion Notes <span style={{ color: T.red }}>*</span>
                          </label>
                          <textarea
                            className="tdm-upload-notes"
                            value={uploadNotes}
                            onChange={e => setUploadNotes(e.target.value)}
                            placeholder="Describe the rescue outcome, animal's condition, any challenges…"
                            rows={3}
                            maxLength={500}
                          />
                          <div className="tdm-char-count">{uploadNotes.length}/500</div>
                        </div>

                        <div className="tdm-upload-actions">
                          <button
                            className="tdm-cancel-upload-btn"
                            onClick={() => { setShowUploadForm(false); removeFile(); setUploadNotes(''); setUploadErr(null); }}
                          >
                            Cancel
                          </button>
                          <button
                            className="tdm-submit-evidence-btn"
                            onClick={submitEvidence}
                            disabled={!uploadFile || !uploadNotes.trim() || uploading || actionLoading}
                          >
                            {uploading ? '⏳ Uploading…' : '✓ Submit Evidence'}
                          </button>
                        </div>
                      </>
                    )}
                  </div>
                )}

                {!canUpload && evidence.length === 0 && (
                  <div className="tdm-empty">No evidence uploaded yet</div>
                )}
              </div>
            )}

            {/* NOTES TAB */}
            {activeTab === 'notes' && (
              <div className="tdm-notes-tab">
                {adminNotes.length > 0 ? adminNotes.map(n => (
                  <div key={n.note_id} className="tdm-admin-note">
                    <div className="tdm-note-header">
                      <span className="tdm-note-author">{n.admin_name || 'Admin'}</span>
                      <span className="tdm-note-date">{fmtRel(n.created_at)}</span>
                    </div>
                    <div className="tdm-note-body">{n.note_text}</div>
                  </div>
                )) : (
                  <div className="tdm-empty">No admin notes yet</div>
                )}
              </div>
            )}
          </div>

          {/* ── Footer ── */}
          <div className="tdm-footer">
            <span className="tdm-task-chip">Task #{task.task_id}</span>
            <button className="btn-secondary" onClick={onClose}>Close</button>
          </div>
        </div>
      </div>

      {zoom && (
        <div className="lightbox" onClick={() => setZoom(null)}>
          <img src={zoom} alt="" />
          <button className="lightbox-close" onClick={() => setZoom(null)}>×</button>
        </div>
      )}
    </>
  );
};

//  Report Detail Modal (User Dashboard) 
const ReportDetailModal: React.FC<{
  report: Report | null; isOpen: boolean; onClose: () => void;
  userPhone?: string; userEmail?: string; userName?: string;
  evidence?: TaskProof[]; notes?: TaskCompletionNote[]; loading?: boolean;
}> = ({ report, isOpen, onClose, userPhone, userEmail, userName, evidence = [], notes = [], loading = false }) => {
  const [tab, setTab] = useState<'info' | 'evidence' | 'notes'>('info');
  const [zoom, setZoom] = useState<string | null>(null);
  const [imgErrs, setImgErrs] = useState<Record<number, boolean>>({});
  if (!isOpen || !report) return null;

  const repName = report.reporter_name || userName || 'Anonymous';
  const phone = report.reporter_phone || userPhone;
  const email = report.reporter_email || userEmail;
  const volName = report.volunteer_name;
  const done = report.status_id === 4;
  const sc = statusColor(report.status_name);
  const animalEmojiChar = animalEmoji(report.animal_type);

  const Row: React.FC<{ icon: React.ReactNode; label: string; value: React.ReactNode }> = ({ icon, label, value }) => (
    <div className="detail-row">
      <span className="detail-icon">{icon}</span>
      <div className="detail-content">
        <div className="detail-label">{label}</div>
        <div className="detail-value">{value}</div>
      </div>
    </div>
  );

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content-report" onClick={e => e.stopPropagation()}>
        <div className="modal-header-gradient">
          <div className="modal-header-row">
            <div className="animal-icon-badge" style={{ fontSize: 32 }}>
              {animalEmojiChar}
            </div>
            <div>
              <div className="modal-title">Report #{report.report_id}</div>
              <div className="modal-subtitle">{report.animal_type} · {report.animal_condition}</div>
            </div>
          </div>
          <div className="modal-header-actions">
            <Pill bg={sc.bg} color={sc.color}>{statusLabel(report.status_name)}</Pill>
            <button className="modal-close" onClick={onClose}>×</button>
          </div>
        </div>

        {done && (
          <div className="modal-tabs">
            <button className={`modal-tab ${tab === 'info' ? 'active' : ''}`} onClick={() => setTab('info')}>Details</button>
            <button className={`modal-tab ${tab === 'evidence' ? 'active' : ''}`} onClick={() => setTab('evidence')}>
              Evidence {evidence.length ? `(${evidence.length})` : ''}
            </button>
            <button className={`modal-tab ${tab === 'notes' ? 'active' : ''}`} onClick={() => setTab('notes')}>
              Notes {notes.length ? `(${notes.length})` : ''}
            </button>
          </div>
        )}

        <div className="modal-scrollable">
          {tab === 'info' && (
            <div className="details-grid">
              <div className="details-col">
                <Row icon={<Icon type="fa" name="FaUser" size={14} />} label="Reporter" value={repName} />
                {hasEmail(email) && <Row icon={<Icon type="fa" name="FaEnvelope" size={14} />} label="Email" value={<a href={`mailto:${email}`}>{email}</a>} />}
                {hasPhone(phone) && <Row icon={<Icon type="fa" name="FaPhone" size={14} />} label="Phone" value={fmtPhone(phone)} />}
                <Row icon={<Icon type="fa" name="FaIdCard" size={14} />} label="User ID" value={`#${report.user_id}`} />
                <Row icon={<Icon type="fa" name="FaCalendarAlt" size={14} />} label="Submitted" value={fmtShort(report.submitted_at)} />
              </div>
              <div className="details-col">
                <Row icon={<span style={{ fontSize: 14 }}>{animalEmojiChar}</span>} label="Animal" value={report.animal_type} />
                <Row icon={<Icon type="fa" name="FaMedkit" size={14} />} label="Condition" value={<Pill bg={T.amberLt} color={T.amber}>{report.animal_condition}</Pill>} />
                <Row icon={<Icon type="fa" name="FaMapMarkerAlt" size={14} />} label="Location" value={report.location_address} />
                {volName && <Row icon={<Icon type="fa" name="FaUserShield" size={14} />} label="Ranger" value={volName} />}
              </div>
              <div className="details-full">
                <div className="description-box">
                  <div className="description-label">
                    <Icon type="fa" name="FaFileAlt" size={12} /> Description
                  </div>
                  <div className="description-text">{report.description}</div>
                </div>
              </div>
            </div>
          )}

          {tab === 'evidence' && done && (
            loading ? (
              <div className="loading-state">Loading evidence…</div>
            ) : evidence.length > 0 ? (
              <div className="evidence-grid-large">
                {evidence.map(p => {
                  const url = imgUrl(p.proof_url);
                  const errored = imgErrs[p.proof_id];
                  return (
                    <div key={p.proof_id} className="evidence-card" onClick={() => !errored && setZoom(url)}>
                      {!errored ? (
                        <img src={url} alt="" onError={() => setImgErrs(p2 => ({ ...p2, [p.proof_id]: true }))} />
                      ) : (
                        <div className="evidence-placeholder">
                          <Icon type="gi" name="GiPhoto" size={32} />
                        </div>
                      )}
                      <div className="evidence-date">{new Date(p.uploaded_at).toLocaleDateString()}</div>
                    </div>
                  );
                })}
              </div>
            ) : (
              <div className="empty-state">No evidence photos available</div>
            )
          )}

          {tab === 'notes' && done && (
            loading ? (
              <div className="loading-state">Loading notes…</div>
            ) : notes.length > 0 ? (
              <div className="notes-list">
                {notes.map(n => (
                  <div key={n.note_id} className="note-card">
                    <div className="note-header">
                      <span className="note-author">{n.volunteer_name || 'Volunteer'}</span>
                      <span className="note-date">{fmtDate(n.created_at)}</span>
                    </div>
                    <div className="note-text">{n.note_text}</div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="empty-state">No notes available</div>
            )
          )}
        </div>

        <div className="modal-footer-between">
          {report.task_id && <span className="task-badge">Task #{report.task_id}</span>}
          <button className="btn-secondary" onClick={onClose}>Close</button>
        </div>
      </div>

      {zoom && (
        <div className="lightbox" onClick={() => setZoom(null)}>
          <img src={zoom} alt="" />
          <button className="lightbox-close" onClick={() => setZoom(null)}>×</button>
        </div>
      )}
    </div>
  );
};

//  Hot Areas Panel 
const HotAreasPanel: React.FC<{ reports: Report[] }> = ({ reports }) => {
  const getArea = (addr: string) => {
    if (!addr) return 'Unknown';
    const parts = addr.split(',').map(s => s.trim());
    return parts.slice(0, 2).join(', ') || addr.substring(0, 30);
  };

  const counts = reports.reduce((acc, r) => {
    const area = getArea(r.location_address);
    acc[area] = (acc[area] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  const sorted = Object.entries(counts).sort((a, b) => b[1] - a[1]).slice(0, 7);
  const max = sorted[0]?.[1] || 1;
  const barColors = ['#e65100', '#9e9e9e', '#bf360c', '#2D5A27', '#1565c0', '#7aaa6a', '#e07a20'];
  const rankLabels = ['🥇', '🥈', '🥉'];

  return (
    <div className="hot-areas-panel">
      <div className="hot-areas-title">🔥 Top Hot Areas</div>
      {sorted.length === 0 ? (
        <div className="hot-areas-empty">No location data</div>
      ) : sorted.map(([area, count], i) => (
        <div key={area} className="hot-area-row">
          <div className={`hot-area-rank ${i < 3 ? `rank-${i + 1}` : 'rank-default'}`}>
            {i < 3 ? rankLabels[i] : i + 1}
          </div>
          <div className="hot-area-info">
            <div className="hot-area-name" title={area}>{area}</div>
            <div className="hot-area-bar-wrap">
              <div className="hot-area-bar" style={{ width: `${(count / max) * 100}%`, background: barColors[i % barColors.length] }} />
            </div>
          </div>
          <div>
            <div className="hot-area-count">{count}</div>
            <div className="hot-area-count-label">reports</div>
          </div>
        </div>
      ))}
    </div>
  );
};

//  Admin Dashboard 
const AdminDashboard: React.FC<{ stats: any; reports: Report[]; reportsLoading: boolean }> = ({ reports, reportsLoading }) => {
  const [showMap, setShowMap] = useState(false);
  const [mapData, setMapData] = useState<Report[]>([]);
  useEffect(() => { if (reports.length) setMapData(reports.filter(r => r.location_address && r.location_address.trim() !== '')); }, [reports]);

  const total = reports.length;
  const submitted = reports.filter(r => r.status_name?.toLowerCase() === 'submitted').length;
  const assigned = reports.filter(r => r.status_name?.toLowerCase() === 'assigned').length;
  const inProg = reports.filter(r => r.status_name?.toLowerCase() === 'in_progress').length;
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
  const commonAnimalEmoji = animalEmoji(getCommon());

  const StatTile: React.FC<{ icon: React.ReactNode; label: string; value: number | string; accent: string }> = ({ icon, label, value, accent }) => (
    <div className="stat-tile">
      <div className="stat-icon" style={{ background: accent + '18' }}>{icon}</div>
      <div>
        <div className="stat-value">{reportsLoading ? '…' : value}</div>
        <div className="stat-label">{label}</div>
      </div>
    </div>
  );

  return (
    <div className="admin-dashboard">
      <div className="admin-header">
        <div className="admin-header-content">
          <div className="admin-badge">Admin Portal</div>
          <h1>ResQAll Command Center</h1>
          <p>Monitor and manage all rescue operations</p>
        </div>
      </div>

      <div className="stats-grid">
        <StatTile icon={<Icon type="fa" name="FaClipboardList" size={24} />} label="Total Reports" value={total} accent={T.textMid} />
        <StatTile icon={<Icon type="fa" name="FaBolt" size={24} />} label="Active Cases" value={submitted + assigned + inProg} accent={T.amber} />
        <StatTile icon={<Icon type="fa" name="FaCheckCircle" size={24} />} label="Completed" value={completed} accent={T.green} />
        <StatTile icon={<Icon type="fa" name="FaUsers" size={24} />} label="Reporters" value={reporters} accent={T.sage} />
      </div>

      <div className="charts-row">
        <Card className="chart-card">
          <div className="card-header">Status Distribution</div>
          <ResponsiveContainer width="100%" height={240}>
            <BarChart data={chartData}>
              <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: T.textMid }} />
              <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: T.textSoft }} />
              <Tooltip cursor={{ fill: T.sand }} contentStyle={{ borderRadius: 8, border: `1px solid ${T.border}`, fontSize: 13 }} />
              <Bar dataKey="value" radius={[6, 6, 0, 0]} barSize={44}>{chartData.map((_, i) => <Cell key={i} fill={COLORS[i % COLORS.length]} />)}</Bar>
            </BarChart>
          </ResponsiveContainer>
        </Card>

        <div className="quick-links">
          <div className="quick-links-card">
            <div className="quick-links-header">
              <Icon type="fa" name="FaLink" size={14} />
              Quick Links
            </div>
            <Link to="/admin/users" className="quick-link volunteer-link">
              <Icon type="fa" name="FaUsers" size={14} />
              Manage Volunteers
            </Link>
            <Link to="/admin/rescue-reports" className="quick-link reports-link">
              <Icon type="fa" name="FaFileAlt" size={14} />
              All Reports
            </Link>
          </div>
          <Card className="most-reported-card">
            <div className="card-header">Most Reported</div>
            <div className="most-reported">
              <span style={{ fontSize: 32 }}>{commonAnimalEmoji}</span>
              <span>{getCommon()}</span>
            </div>
          </Card>
        </div>
      </div>

      <Card className="heatmap-card">
        <div className="card-header">
          <span><Icon type="fa" name="FaMap" size={14} /> Incident Heatmap</span>
          <button className="toggle-map-btn" onClick={() => setShowMap(m => !m)}>
            {showMap ? 'Hide Map' : 'Show Map'}
          </button>
        </div>
        <div className="heatmap-with-sidebar">
          {showMap && (
            <div className="heatmap-container">
              {mapData.length > 0
                ? <Heatmap reports={mapData} height="420px" />
                : <div className="empty-map">No location data available</div>}
            </div>
          )}
          <HotAreasPanel reports={reports} />
        </div>
      </Card>

      <Card className="reports-table-card">
        <div className="card-header">
          <span>Recent Reports ({reports.length})</span>
          <Link to="/admin/rescue-reports" className="view-all-link">View All →</Link>
        </div>
        <div className="table-wrapper">
          {reportsLoading ? (
            <div className="loading-state">Loading…</div>
          ) : reports.length > 0 ? (
            <table className="reports-table">
              <thead>
                <tr>
                  <th>ID</th><th>Animal</th><th>Condition</th><th>Location</th><th>Reporter</th><th>Volunteer</th><th>Date</th><th>Status</th>
                </tr>
              </thead>
              <tbody>
                {reports.slice(0, 10).map((r) => {
                  const sc = statusColor(r.status_name);
                  const animalEmojiChar = animalEmoji(r.animal_type);
                  return (
                    <tr key={r.report_id}>
                      <td>#{r.report_id}</td>
                      <td><span style={{ marginRight: 6 }}>{animalEmojiChar}</span> {r.animal_type || '—'}</td>
                      <td>{r.animal_condition || '—'}</td>
                      <td className="location-cell">{r.location_address || '—'}</td>
                      <td>{r.reporter_name || 'Anonymous'}</td>
                      <td>{r.volunteer_name ? <span className="volunteer-name">{r.volunteer_name}</span> : <span className="unassigned">Unassigned</span>}</td>
                      <td>{fmtShort(r.submitted_at)}</td>
                      <td><Pill bg={sc.bg} color={sc.color}>{statusLabel(r.status_name)}</Pill></td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          ) : (
            <div className="empty-state">No reports found</div>
          )}
        </div>
      </Card>
    </div>
  );
};

// Volunteer Dashboard 
const VolunteerDashboard: React.FC<{ user: any; stats: any; reports: Report[]; reportsLoading: boolean; userProfile: UserProfile | null }> = ({ user, userProfile }) => {
  const [active, setActive] = useState<VolunteerTask[]>([]);
  const [pending, setPending] = useState<VolunteerTask[]>([]);
  const [loading, setLoading] = useState(true);
  const [err, setErr] = useState<string | null>(null);
  const [actLoad, setActLoad] = useState(false);
  const [showAllA, setShowAllA] = useState(false);
  const [showAllP, setShowAllP] = useState(false);
  const [selTask, setSelTask] = useState<VolunteerTask | null>(null);
  const [taskOpen, setTaskOpen] = useState(false);
  const [decOpen, setDecOpen] = useState(false);
  const [decId, setDecId] = useState<number | null>(null);
  const [cmpCnt, setCmpCnt] = useState(0);
  const [evidence, setEvidence] = useState<Record<number, TaskProof[]>>({});
  const [anotes, setAnotes] = useState<Record<number, AdminNote[]>>({});

  useEffect(() => {
    if (!user?.user_id) return;
    (async () => {
      try {
        setLoading(true); setErr(null);
        const token = getToken();
        if (!token) { setErr('No auth token'); return; }
        const res = await fetch(`${process.env.REACT_APP_API_URL}/api/volunteers/tasks`, { headers: { 'Authorization': `Bearer ${token}`, 'Content-Type': 'application/json' } });
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
    const res = await fetch(`${process.env.REACT_APP_API_URL}/api/tasks/${taskId}/evidence`, { headers: { 'Authorization': `Bearer ${token}` } });
    const d = await res.json();
    if (d.success) setEvidence(p => ({ ...p, [taskId]: d.data }));
  };

  const fetchAnotes = async (reportId: number, taskId: number) => {
    const token = getToken();
    const res = await fetch(`${process.env.REACT_APP_API_URL}/api/reports/${reportId}/admin-notes`, { headers: { 'Authorization': `Bearer ${token}` } });
    const d = await res.json();
    if (d.success) setAnotes(p => ({ ...p, [taskId]: d.data }));
  };

  const fetchFull = async (taskId: number) => {
    const token = getToken();
    const res = await fetch(`${process.env.REACT_APP_API_URL}/api/tasks/task/${taskId}/full-details`, { headers: { 'Authorization': `Bearer ${token}` } });
    const d = await res.json();
    if (d.success) { return d.data; }
    return null;
  };

  const accept = async (taskId: number) => {
    setActLoad(true);
    const token = getToken();
    const res = await fetch(`${process.env.REACT_APP_API_URL}/api/volunteers/tasks/${taskId}/accept`, { method: 'PATCH', headers: { 'Authorization': `Bearer ${token}`, 'Content-Type': 'application/json' } });
    const d = await res.json();
    if (d.success) {
      const t = pending.find(x => x.task_id === taskId);
      if (t) {
        setPending(p => p.filter(x => x.task_id !== taskId));
        setActive(p => [...p, { ...t, task_status_id: 2, task_status: 'in_progress', started_at: new Date().toISOString() }]);
      }
      toast.success('Mission accepted!');
    } else {
      toast.error('Failed to accept task');
    }
    setActLoad(false);
  };

  const decline = async (taskId: number, reason: string) => {
    setActLoad(true);
    const token = getToken();
    const res = await fetch(`${process.env.REACT_APP_API_URL}/api/volunteers/tasks/${taskId}/decline`, { method: 'PATCH', headers: { 'Authorization': `Bearer ${token}`, 'Content-Type': 'application/json' }, body: JSON.stringify({ reason }) });
    const d = await res.json();
    if (d.success) {
      setPending(p => p.filter(x => x.task_id !== taskId));
      toast.success('Mission declined');
    } else {
      toast.error('Failed to decline task');
    }
    setActLoad(false); setDecOpen(false); setDecId(null);
  };

  // Upload evidence + complete task in one flow
  const upload = async (taskId: number, file: File, notes: string): Promise<void> => {
    setActLoad(true);
    const token = getToken();

    // 1. Upload proof photo
    const fd = new FormData();
    fd.append('proofs', file);
    const upRes = await fetch(`${process.env.REACT_APP_API_URL}/api/tasks/${taskId}/upload-proofs`, {
      method: 'POST',
      headers: { 'Authorization': `Bearer ${token}` },
      body: fd,
    });
    const upData = await upRes.json();
    if (!upData.success) {
      toast.error('Failed to upload proof: ' + upData.message);
      setActLoad(false);
      return;
    }

    // 2. Save completion note
    const noteRes = await fetch(`${process.env.REACT_APP_API_URL}/api/tasks/${taskId}/completion-notes`, {
      method: 'POST',
      headers: { 'Authorization': `Bearer ${token}`, 'Content-Type': 'application/json' },
      body: JSON.stringify({ note_text: notes, volunteer_id: user.user_id }),
    });
    const noteData = await noteRes.json();
    if (!noteData.success) {
      toast.error('Failed to save note: ' + noteData.message);
      setActLoad(false);
      return;
    }

    // 3. Mark task complete
    const completeRes = await fetch(`${process.env.REACT_APP_API_URL}/api/volunteers/tasks/${taskId}/complete`, {
      method: 'PATCH',
      headers: { 'Authorization': `Bearer ${token}`, 'Content-Type': 'application/json' },
    });
    const completeData = await completeRes.json();

    if (completeData.success) {
      // Move task from active → completed in local state
      setActive(prev => prev.filter(t => t.task_id !== taskId));
      setCmpCnt(prev => prev + 1);
      // Close modal — matches MissionBoard behavior
      setTaskOpen(false);
      setSelTask(null);
      toast.success('🎉 Mission completed! Thank you for your service!');
    } else {
      toast.error('Failed to complete mission: ' + completeData.message);
    }

    fetchEvidence(taskId);
    setActLoad(false);
  };

  const viewTask = async (task: VolunteerTask) => {
    setSelTask(task);
    const full = await fetchFull(task.task_id);
    if (full) {
      setSelTask(full.task);
      setEvidence(p => ({ ...p, [task.task_id]: full.evidence || [] }));
      setAnotes(p => ({ ...p, [task.task_id]: full.admin_notes || [] }));
    } else {
      await Promise.all([fetchEvidence(task.task_id), fetchAnotes(task.report_id, task.task_id)]);
    }
    setTaskOpen(true);
  };

  const dispActive = showAllA ? active : active.slice(0, 3);
  const dispPending = showAllP ? pending : pending.slice(0, 3);
  const rate = cmpCnt + active.length > 0 ? Math.round((cmpCnt / (cmpCnt + active.length)) * 100) : 0;

  const MiniStat: React.FC<{ icon: React.ReactNode; label: string; value: number | string; sub: string; grad: string }> = ({ icon, label, value, sub, grad }) => (
    <div className="mini-stat" style={{ background: grad }}>
      <div className="mini-stat-icon">{icon}</div>
      <div>
        <div className="mini-stat-label">{label}</div>
        <div className="mini-stat-value">{value}</div>
        <div className="mini-stat-sub">{sub}</div>
      </div>
    </div>
  );

  return (
    <div className="volunteer-dashboard">
      <div className="volunteer-welcome">
        <div>
          <div className="welcome-badge">Volunteer Portal</div>
          <h1>Welcome back, Ranger {user.username}!</h1>
          <p>Your dedication saves lives. Ready for your next mission?</p>
          {userProfile?.email && <div className="contact-email"><Icon type="fa" name="FaEnvelope" size={12} /> {userProfile.email}</div>}
        </div>
        <div className="welcome-actions">
          <Link to="/tasks" className="action-btn mission-btn">
            <Icon type="fa" name="FaClipboardList" size={14} />
            Mission Board
          </Link>
          <Link to="/profile" className="action-btn profile-btn">
            <Icon type="fa" name="FaUser" size={14} />
            Profile
          </Link>
        </div>
      </div>

      <div className="stats-row">
        <MiniStat icon={<Icon type="fa" name="FaHeart" size={24} />} label="Total Rescues" value={cmpCnt} sub="Lives saved ✓" grad={`linear-gradient(135deg, ${T.forest}, ${T.greenLt})`} />
        <MiniStat icon={<Icon type="fa" name="FaRocket" size={24} />} label="Active Missions" value={active.length} sub="In progress" grad="linear-gradient(135deg, #1565c0, #0d47a1)" />
        <MiniStat icon={<Icon type="fa" name="FaClock" size={24} />} label="Pending" value={pending.length} sub="Awaiting decision" grad={`linear-gradient(135deg, #e07a20, #b8560e)`} />
        <MiniStat icon={<Icon type="fa" name="FaChartLine" size={24} />} label="Success Rate" value={`${rate}%`} sub="Mission success" grad={`linear-gradient(135deg, ${T.sage}, #5a8a4a)`} />
      </div>

      {pending.length > 0 && (
        <div className="section-pending">
          <div className="section-header">
            <h2>Pending Confirmation <span className="badge-count">{pending.length}</span></h2>
            {pending.length > 3 && <button className="view-toggle" onClick={() => setShowAllP(s => !s)}>{showAllP ? 'Show Less ↑' : `View All (${pending.length}) →`}</button>}
          </div>
          <div className="cards-grid">
            {dispPending.map(task => {
              const animalEmojiChar = animalEmoji(task.animal_type);
              return (
                <Card key={task.task_id} hover className="pending-card">
                  <div className="pending-card-header">
                    <span className="report-id">#{task.report_id}</span>
                    <Pill bg="rgba(255,255,255,0.2)" color="white">ASSIGNED</Pill>
                  </div>
                  <div className="card-content">
                    <div className="animal-row">
                      <span style={{ fontSize: 40 }}>{animalEmojiChar}</span>
                      <div>
                        <div className="animal-type">{task.animal_type}</div>
                        <Pill bg={T.redLt} color={T.red}>{task.animal_condition}</Pill>
                      </div>
                    </div>
                    <div className="location-row">
                      <Icon type="fa" name="FaMapMarkerAlt" size={12} />
                      <span>{task.location_address}</span>
                    </div>
                    <div className="reporter-info">
                      <Avatar name={task.reporter_name} size={28} />
                      <div>
                        <div className="reporter-name">{task.reporter_name || 'Anonymous'}</div>
                        {hasPhone(task.reporter_phone) && <div className="reporter-phone">{fmtPhone(task.reporter_phone)}</div>}
                      </div>
                    </div>
                    <p className="description-preview">{task.description || 'No description'}</p>
                  </div>
                  <div className="card-actions">
                    <button className="accept-btn" onClick={() => accept(task.task_id)} disabled={actLoad}>
                      <Icon type="fa" name="FaCheck" size={12} />
                      Accept
                    </button>
                    <button className="decline-btn" onClick={() => { setDecId(task.task_id); setDecOpen(true); }} disabled={actLoad}>
                      <Icon type="fa" name="FaTimes" size={12} />
                      Decline
                    </button>
                  </div>
                </Card>
              );
            })}
          </div>
        </div>
      )}

      <div className="section-active">
        <div className="section-header">
          <h2>Active Missions <span className="badge-count">{active.length}</span></h2>
          {active.length > 3 && <button className="view-toggle" onClick={() => setShowAllA(s => !s)}>{showAllA ? 'Show Less ↑' : `View All (${active.length}) →`}</button>}
        </div>

        {loading ? (
          <div className="loading-state">Loading missions…</div>
        ) : err ? (
          <Card className="error-card">
            <Icon type="fa" name="FaExclamationTriangle" size={36} />
            <div className="error-message">{err}</div>
            <button className="retry-btn" onClick={() => window.location.reload()}>Retry</button>
          </Card>
        ) : active.length > 0 ? (
          <div className="cards-grid">
            {dispActive.map(m => {
              const animalEmojiChar = animalEmoji(m.animal_type);
              const badge = taskBadge(m.task_status_id);
              const photos = evidence[m.task_id] || [];
              const first = photos.length > 0 ? imgUrl(photos[0].proof_url) : null;
              return (
                <Card key={m.task_id} hover className="mission-card">
                  <div className="mission-image">
                    {first ? (
                      <img src={first} alt="" />
                    ) : (
                      <div className="image-placeholder">
                        <span style={{ fontSize: 36 }}>{animalEmojiChar}</span>
                        <span>No photo yet</span>
                      </div>
                    )}
                    <div className="image-badge">
                      <Pill bg={badge.bg} color={badge.color} dot={badge.dot}>{badge.text}</Pill>
                    </div>
                    <div className="report-id-badge">#{m.report_id}</div>
                  </div>
                  <div className="card-content">
                    <div className="title-row">
                      <span style={{ fontSize: 20 }}>{animalEmojiChar}</span>
                      <div>
                        <div className="animal-type">{m.animal_type} Rescue</div>
                        <div className="condition">{m.animal_condition}</div>
                      </div>
                    </div>
                    <div className="location-row">
                      <Icon type="fa" name="FaMapMarkerAlt" size={12} />
                      <span>{m.location_address}</span>
                    </div>
                    <div className="reporter-mini">
                      <Avatar name={m.reporter_name} size={24} />
                      <span>{m.reporter_name || 'Anonymous'}</span>
                    </div>
                    <p className="description-preview">"{m.description || 'No description'}"</p>
                    {photos.length > 0 && <div className="evidence-indicator"><Icon type="fa" name="FaCamera" size={12} /> {photos.length} evidence photo(s)</div>}
                    <div className="time-row">
                      <span>{fmtRel(m.submitted_at)}</span>
                      {m.assigned_at && <span>Assigned {fmtShort(m.assigned_at)}</span>}
                    </div>
                  </div>
                  <div className="card-footer">
                    <button className="view-details-btn" onClick={() => viewTask(m)}>
                      View Details →
                    </button>
                  </div>
                </Card>
              );
            })}
          </div>
        ) : (
          <Card className="empty-card">
            <span style={{ fontSize: 48 }}>🐾</span>
            <h3>No Active Missions</h3>
            <p>You don't have any active rescue missions right now.</p>
            <Link to="/tasks" className="browse-btn">Browse Available Missions</Link>
          </Card>
        )}
      </div>

      {selTask && (
        <TaskDetailModal
          task={selTask}
          isOpen={taskOpen}
          onClose={() => { setTaskOpen(false); setSelTask(null); }}
          onUploadEvidence={upload}
          actionLoading={actLoad}
          userProfile={userProfile}
          evidence={evidence[selTask.task_id]}
          adminNotes={anotes[selTask.task_id]}
        />
      )}
      {decId && (
        <DeclineModal
          isOpen={decOpen}
          onClose={() => { setDecOpen(false); setDecId(null); }}
          onSubmit={reason => decline(decId, reason)}
          taskId={decId}
        />
      )}
    </div>
  );
};

// Pending / Rejected
const PendingVolunteerDashboard: React.FC<{ user: any }> = () => (
  <div className="status-page">
    <Card className="status-card">
      <Icon type="fa" name="FaClock" size={48} />
      <h2>Activation Pending</h2>
      <p>Thank you for joining ResQAll. Our HQ is reviewing your ranger profile. You'll be notified once approved.</p>
    </Card>
  </div>
);

const RejectedVolunteerDashboard: React.FC<{ user: any }> = () => (
  <div className="status-page">
    <Card className="status-card">
      <Icon type="fa" name="FaTimesCircle" size={48} />
      <h2>Application Not Approved</h2>
      <p>Unfortunately your ResQAll operative status was not approved. Contact support for more info.</p>
    </Card>
  </div>
);

// User Dashboard 
const UserDashboard: React.FC<{
  user: any; userReports: Report[]; reportsLoading: boolean;
  onViewDetails: (r: Report) => void; userProfile: UserProfile | null;
}> = ({ user, userReports, reportsLoading, onViewDetails, userProfile }) => {
  const mine = userReports.filter(r => Number(r.user_id) === Number(user.user_id));
  const total = mine.length;
  const submitted = mine.filter(r => r.status_name?.toLowerCase() === 'submitted').length;
  const inProgress = mine.filter(r => r.status_name?.toLowerCase() === 'in_progress').length;
  const done = mine.filter(r => r.status_name?.toLowerCase() === 'completed').length;

  const StatCard: React.FC<{ icon: React.ReactNode; label: string; value: number; color: string }> = ({ icon, label, value, color }) => (
    <div className="stat-tile">
      <div className="stat-icon" style={{ background: color + '15' }}>{icon}</div>
      <div>
        <div className="stat-value">{value}</div>
        <div className="stat-label">{label}</div>
      </div>
    </div>
  );

  return (
    <div className="user-dashboard">
      <div className="user-welcome">
        <div>
          <div className="welcome-badge">Your Dashboard</div>
          <h1>Welcome back, {user.username || 'Animal Friend'}!</h1>
          <p>Your reports help rescue animals in need.</p>
          {(userProfile?.email || userProfile?.phone) && (
            <div className="contact-info">
              {userProfile.email && <span><Icon type="fa" name="FaEnvelope" size={12} /> {userProfile.email}</span>}
              {userProfile.phone && <span><Icon type="fa" name="FaPhone" size={12} /> {userProfile.phone}</span>}
            </div>
          )}
        </div>
        <Link to="/create-report" className="create-report-btn">
          <Icon type="fa" name="FaPlus" size={14} />
          New Report
        </Link>
      </div>

      <div className="stats-grid">
        <StatCard icon={<Icon type="fa" name="FaClipboardList" size={22} />} label="Total Reports" value={total} color={T.forest} />
        <StatCard icon={<Icon type="fa" name="FaHourglassHalf" size={22} />} label="Submitted" value={submitted} color={T.blue} />
        <StatCard icon={<Icon type="fa" name="FaRocket" size={22} />} label="In Progress" value={inProgress} color={T.amber} />
        <StatCard icon={<Icon type="fa" name="FaCheckCircle" size={22} />} label="Completed" value={done} color={T.green} />
      </div>

      <Card className="reports-card">
        <div className="card-header">
          <span>Your Reports ({total})</span>
          {mine.length > 3 && <Link to="/my-reports" className="view-all-link">View All →</Link>}
        </div>

        {reportsLoading ? (
          <div className="loading-state">Loading your reports…</div>
        ) : mine.length > 0 ? (
          <div className="reports-grid-user">
            {mine.slice(0, 6).map(r => {
              const sc = statusColor(r.status_name);
              const animalEmojiChar = animalEmoji(r.animal_type);
              return (
                <div key={r.report_id} className="report-card-user" onClick={() => onViewDetails(r)}>
                  <div className="card-top">
                    <span className="report-id">#{r.report_id}</span>
                    <Pill bg={sc.bg} color={sc.color}>{statusLabel(r.status_name)}</Pill>
                  </div>
                  <div className="animal-section">
                    <span style={{ fontSize: 48 }}>{animalEmojiChar}</span>
                    <div>
                      <div className="animal-type">{r.animal_type || 'Unknown'}</div>
                      <div className="animal-condition">{r.animal_condition}</div>
                    </div>
                  </div>
                  <div className="location-row">
                    <Icon type="fa" name="FaMapMarkerAlt" size={12} />
                    <span>{r.location_address}</span>
                  </div>
                  <div className="date-row">
                    <Icon type="fa" name="FaCalendarAlt" size={12} />
                    <span>{fmtShort(r.submitted_at)}</span>
                  </div>
                  <p className="description-preview">{r.description || 'No description provided.'}</p>
                  <button className="view-details-btn">View Details →</button>
                </div>
              );
            })}
          </div>
        ) : (
          <div className="empty-state-reports">
            <span style={{ fontSize: 48 }}>🐾</span>
            <h3>No Reports Yet</h3>
            <p>Create your first rescue report to get started.</p>
            <Link to="/create-report" className="create-first-btn">File Your First Report</Link>
          </div>
        )}
      </Card>
    </div>
  );
};

//  Main Dashboard 
export const Dashboard: React.FC = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [userReports, setUserReports] = useState<Report[]>([]);
  const [allReports, setAllReports] = useState<Report[]>([]);
  const [repLoading, setRepLoading] = useState(true);
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [selReport, setSelReport] = useState<Report | null>(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [repEvidence, setRepEvidence] = useState<Record<number, TaskProof[]>>({});
  const [repNotes, setRepNotes] = useState<Record<number, TaskCompletionNote[]>>({});
  const [repLoading2, setRepLoading2] = useState<Record<number, boolean>>({});

  const navigate = useNavigate();
  const { user: cu } = useAuth();

  useEffect(() => {
    if (!cu) return;
    (async () => {
      const token = getToken();
      const res = await fetch(`${process.env.REACT_APP_API_URL}/api/users/profile`, { headers: { 'Authorization': `Bearer ${token}`, 'Content-Type': 'application/json' } });
      if (res.ok) { const d = await res.json(); if (d.success) setProfile(d.data); }
    })();
  }, [cu]);

  useEffect(() => {
    if (!cu) return;
    (async () => {
      setRepLoading(true);
      const token = getToken();
      const res = await fetch(`${process.env.REACT_APP_API_URL}/api/reports/my-reports`, { headers: { 'Authorization': `Bearer ${token}`, 'Content-Type': 'application/json' } });
      if (res.ok) { const d = await res.json(); if (d.success) setUserReports(d.data || []); }
      if (getRole(cu) === 'admin') {
        const r2 = await fetch(`${process.env.REACT_APP_API_URL}/api/reports/admin/all`, { headers: { 'Authorization': `Bearer ${token}`, 'Content-Type': 'application/json' } });
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
      fetch(`${process.env.REACT_APP_API_URL}/api/tasks/${taskId}/evidence`, { headers: { 'Authorization': `Bearer ${token}` } }),
      fetch(`${process.env.REACT_APP_API_URL}/api/tasks/${taskId}/completion-notes`, { headers: { 'Authorization': `Bearer ${token}` } }),
    ]);
    const [ed, nd] = [await er.json(), await nr.json()];
    if (ed.success) setRepEvidence(p => ({ ...p, [repId]: ed.data || [] }));
    if (nd.success) setRepNotes(p => ({ ...p, [repId]: nd.data || [] }));
    setRepLoading2(p => ({ ...p, [repId]: false }));
  };

  const openReport = (r: Report) => { setSelReport(r); if (r.task_id) fetchDetails(r.report_id, r.task_id); setModalOpen(true); };

  useEffect(() => { if (!isLoading && !cu) navigate('/login'); }, [cu, navigate, isLoading]);

  if (isLoading) return (
    <div className="loading-page">
      <div className="loading-spinner"></div>
      <div>Loading dashboard…</div>
    </div>
  );

  if (!cu) return (
    <div className="loading-page">
      <Card className="access-denied">
        <Icon type="fa" name="FaLock" size={48} />
        <h2>Access Denied</h2>
        <p>Please log in to view your dashboard.</p>
        <Link to="/login" className="login-link">Go to Login</Link>
      </Card>
    </div>
  );

  const role = getRole(cu);
  const volStat = getVolStatus(cu);
  const stats = {
    totalReports: userReports.length,
    completedRescues: userReports.filter(r => r.status_name?.toLowerCase() === 'completed').length,
    activeVolunteers: 1, pendingApprovals: 0,
    myReports: userReports.filter(r => Number(r.user_id) === Number(cu.user_id)).length,
    myCompletedTasks: userReports.filter(r => r.status_name?.toLowerCase() === 'completed').length,
  };

  const renderContent = () => {
    if (role === 'admin') return <AdminDashboard stats={stats} reports={allReports} reportsLoading={repLoading} />;
    if (role === 'volunteer') {
      if (volStat === 'rejected') return <RejectedVolunteerDashboard user={cu} />;
      if (volStat === 'pending' || volStat === 'none' || !volStat) return <PendingVolunteerDashboard user={cu} />;
      if (volStat === 'approved') return <VolunteerDashboard user={{ ...cu, role }} stats={stats} reports={userReports} reportsLoading={repLoading} userProfile={profile} />;
    }
    return <UserDashboard user={{ ...cu, role }} userReports={userReports} reportsLoading={repLoading} onViewDetails={openReport} userProfile={profile} />;
  };

  return (
    <div className="dashboard-container">
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