import React, { useEffect, useState, useCallback } from 'react';
import './RescueReports.css';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { MapContainer, TileLayer, Marker, Polyline, Popup } from 'react-leaflet';

import icon from 'leaflet/dist/images/marker-icon.png';
import iconShadow from 'leaflet/dist/images/marker-shadow.png';
import { MdAccessTime, MdAssignment, MdBrokenImage, MdCameraAlt, MdCheckCircle, MdClose, MdDownload, MdEmail, MdError, MdFilterList, MdLocationOn, MdPhone, MdRefresh, MdSearch, MdSort, MdWarning } from 'react-icons/md';
import { FaBan, FaPaw, FaUserShield } from 'react-icons/fa';
import { TbMapSearch } from 'react-icons/tb';

let DefaultIcon = L.icon({ iconUrl: icon, shadowUrl: iconShadow, iconSize: [25, 41], iconAnchor: [12, 41] });
L.Marker.prototype.options.icon = DefaultIcon;

const startIcon = L.divIcon({ html: '🏁', className: 'custom-marker', iconSize: [30, 30], popupAnchor: [0, -15] });
const endIcon   = L.divIcon({ html: '📍', className: 'custom-marker', iconSize: [30, 30], popupAnchor: [0, -15] });
const liveIcon  = L.divIcon({ html: '🔴', className: 'custom-marker', iconSize: [30, 30], popupAnchor: [0, -15] });

//  Interfaces 
interface TaskProof { proof_id: number; task_id: number; proof_url: string; uploaded_at: string; }
interface CompletionNote { note_id: number; task_id: number; volunteer_id: number; note_text: string; created_at: string; volunteer_name?: string; }
interface TrackingPoint { tracking_id: number; task_id: number; volunteer_id: number; latitude: number; longitude: number; accuracy: number; timestamp: string; synced: number; volunteer_name?: string; }
interface TrackingStats { pointCount: number; startTime: string | null; lastSeen: string | null; distance: number; lastLat?: number; lastLng?: number; pendingPoints: number; isLive: boolean; }

interface RescueReport {
  report_id: number; user_id: number; username: string; email: string; phone: string;
  description: string; location_address: string; user_note?: string; admin_note?: string;
  submitted_at: string; updated_at?: string; animal_type: string; animal_condition: string;
  status_id: number; status_name?: string; volunteer_name?: string; volunteer_id?: number;
  volunteer_email?: string; volunteer_phone?: string; declined_reason?: string;
  volunteer_responded_at?: string; volunteer_response?: string; task_id?: number; task_status?: string;
}

interface Volunteer {
  user_id: number; username: string; email: string; phone: string; bio?: string;
  joined_at: string; approval_status: string; approval_status_id: number;
  availability_status: string; availability_status_id: number; assigned_reports_count: number;
  role_id: number; created_at: string; has_car: number; can_foster: number;
  animal_handling: string; city: string; badges?: string;
}

interface ConfirmModal { show: boolean; title: string; message: string; confirmText: string; confirmColor: string; onConfirm: () => void; }
const CONFIRM_CLOSED: ConfirmModal = { show: false, title: '', message: '', confirmText: 'Confirm', confirmColor: '#c62828', onConfirm: () => {} };

//  Helpers 
const getFullImageUrl = (proofUrl: string): string => {
  if (!proofUrl) return '';
  if (proofUrl.startsWith('http://') || proofUrl.startsWith('https://')) return proofUrl;
  const baseUrl = 'http://localhost:5000';
  const cleanUrl = proofUrl.replace(/^\/+/, '');
  return cleanUrl.startsWith('uploads/') ? `${baseUrl}/${cleanUrl}` : `${baseUrl}/uploads/${cleanUrl}`;
};

const calculateDistance = (lat1: number, lng1: number, lat2: number, lng2: number): number => {
  const R = 6371, dLat = (lat2 - lat1) * Math.PI / 180, dLng = (lng2 - lng1) * Math.PI / 180;
  const a = Math.sin(dLat/2)**2 + Math.cos(lat1*Math.PI/180)*Math.cos(lat2*Math.PI/180)*Math.sin(dLng/2)**2;
  return R * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
};

const getAnimalEmoji = (t: string): string => {
  const s = t?.toLowerCase() || '';
  if (s.includes('dog')) return '🐶'; if (s.includes('cat')) return '🐱';
  if (s.includes('bird')) return '🐦'; if (s.includes('rabbit')) return '🐰';
  if (s.includes('hamster')) return '🐹'; if (s.includes('turtle')) return '🐢';
  if (s.includes('snake')) return '🐍'; if (s.includes('fish')) return '🐟';
  if (s.includes('horse')) return '🐴'; if (s.includes('cow')) return '🐮';
  if (s.includes('goat')) return '🐐'; if (s.includes('sheep')) return '🐑';
  return '🐾';
};

const getCardTitle = (animalType: string, animalCondition: string): string => {
  const type = (animalType || '').trim(), cond = (animalCondition || '').trim();
  if (!type) return 'Animal in need';
  const adjs = ['injured','stray','sick','lost','abandoned','wounded','starving','malnourished','critical','trapped','orphaned'];
  if (cond && adjs.some(a => cond.toLowerCase().includes(a)))
    return `${cond.charAt(0).toUpperCase() + cond.slice(1).toLowerCase()} ${type}`;
  return `${type} in need`;
};

const getStatusBadgeColors = (id: number) => {
  const m: Record<number, {bg:string;color:string}> = {
    1:{bg:'#1e3f1a',color:'#c8e6b0'}, 2:{bg:'#1a3a5e',color:'#b0d4f1'},
    3:{bg:'#1a4a3a',color:'#b0e8d0'}, 4:{bg:'#3d1a5e',color:'#e0c8f5'},
    5:{bg:'#5e1a1a',color:'#f5c8c8'},
  };
  return m[id] || {bg:'#4a4a4a',color:'#e0e0e0'};
};

// ── Volunteer Selection Modal ─────────────────────────────────────────────────
const VolunteerSelectModal: React.FC<{
  report: RescueReport | null; isOpen: boolean; onClose: () => void;
  onSelect: (v: Volunteer) => void; volunteers: Volunteer[]; loadingVolunteers: boolean;
  getAnimalEmoji: (t: string) => string; formatVolunteerDate: (d: string) => string;
}> = ({ report, isOpen, onClose, onSelect, volunteers, loadingVolunteers, getAnimalEmoji, formatVolunteerDate }) => {
  if (!isOpen || !report) return null;
  const avail   = volunteers.filter(v => v.availability_status_id === 1 || v.availability_status?.toLowerCase() === 'available');
  const unavail = volunteers.filter(v => v.availability_status_id === 2 || v.availability_status?.toLowerCase() === 'unavailable');
  const getBadges = (b?: string) => {
    if (!b) return null;
    try {
      if (!b.startsWith('[')) return b.split(',').slice(0,3).join(', ');
      const list = JSON.parse(b);
      return Array.isArray(list) && list.length ? list.slice(0,3).join(', ') : null;
    } catch { return b; }
  };
  return (
    <div className="reports-modal-overlay" onClick={onClose}>
      <div className="reports-modal-content" onClick={e => e.stopPropagation()}>
        <div className="reports-modal-header dark">
          <div><h3>Assign Ranger</h3><p className="reports-modal-subtitle">Report #{report.report_id}</p></div>
          <button className="reports-modal-close" onClick={onClose}><MdClose size={20}/></button>
        </div>
        <div className="reports-modal-body">
          <div className="reports-summary-card">
            <div className="reports-summary-item"><span className="reports-summary-label">Animal</span><span className="reports-summary-value">{getAnimalEmoji(report.animal_type)} {report.animal_type}</span></div>
            <div className="reports-summary-item"><span className="reports-summary-label">Location</span><span className="reports-summary-value location">{report.location_address}</span></div>
          </div>
          <div className="reports-volunteers-container">
            <h4>Available Rangers ({avail.length})</h4>
            {loadingVolunteers ? (
              <div className="reports-loading-state"><div className="reports-spinner"/><p>Loading rangers...</p></div>
            ) : volunteers.length === 0 ? (
              <div className="reports-empty-state small"><FaPaw size={32} color="#ccc"/><p>No rangers found</p></div>
            ) : (
              <div className="reports-volunteers-grid">
                {avail.length > 0 && (
                  <div className="reports-volunteer-category">
                    <div className="reports-category-header"><span className="reports-status-dot available"/><span>Available ({avail.length})</span></div>
                    {avail.map(v => (
                      <div key={v.user_id} className="reports-volunteer-item">
                        <div className="reports-volunteer-avatar-wrapper">
                          <div className="reports-volunteer-avatar">{v.username.charAt(0).toUpperCase()}</div>
                          {v.assigned_reports_count > 0 && <span className="reports-badge-count">{v.assigned_reports_count}</span>}
                        </div>
                        <div className="reports-volunteer-info">
                          <div className="reports-volunteer-header"><h5>{v.username}</h5><span className="reports-volunteer-status available">Available</span></div>
                          <div className="reports-volunteer-contact"><span>{v.email}</span>{v.phone && <span>{v.phone}</span>}</div>
                          <div className="reports-volunteer-details">
                            <div className="reports-detail-row"><span className="reports-detail-label">City:</span><span className="reports-detail-value">{v.city||'N/A'}</span></div>
                            <div className="reports-detail-row"><span className="reports-detail-label">Has Car:</span><span className="reports-detail-value">{v.has_car===1?'Yes':'No'}</span></div>
                            <div className="reports-detail-row"><span className="reports-detail-label">Can Foster:</span><span className="reports-detail-value">{v.can_foster===1?'Yes':'No'}</span></div>
                            <div className="reports-detail-row"><span className="reports-detail-label">Handling:</span><span className="reports-detail-value">{v.animal_handling||'N/A'}</span></div>
                            {getBadges(v.badges) && <div className="reports-detail-row"><span className="reports-detail-label">Badges:</span><span className="reports-detail-value">{getBadges(v.badges)}</span></div>}
                          </div>
                          <div className="reports-volunteer-meta"><span>Joined {formatVolunteerDate(v.joined_at)}</span><span>{v.assigned_reports_count} active rescues</span></div>
                        </div>
                        <button className="reports-btn assign" onClick={() => onSelect(v)}>Assign</button>
                      </div>
                    ))}
                  </div>
                )}
                {unavail.length > 0 && (
                  <div className="reports-volunteer-category">
                    <div className="reports-category-header"><span className="reports-status-dot unavailable"/><span>Unavailable ({unavail.length})</span></div>
                    {unavail.map(v => (
                      <div key={v.user_id} className="reports-volunteer-item unavailable">
                        <div className="reports-volunteer-avatar-wrapper"><div className="reports-volunteer-avatar unavailable">{v.username.charAt(0).toUpperCase()}</div></div>
                        <div className="reports-volunteer-info">
                          <div className="reports-volunteer-header"><h5>{v.username}</h5><span className="reports-volunteer-status unavailable">Unavailable</span></div>
                          <div className="reports-volunteer-contact"><span>{v.email}</span></div>
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
        <div className="reports-modal-footer"><button className="reports-btn secondary" onClick={onClose}>Cancel</button></div>
      </div>
    </div>
  );
};

//  Report Detail Modal 
const ReportDetailModal: React.FC<{
  report: RescueReport | null; isOpen: boolean; onClose: () => void;
  onAssignClick: () => void; onUnassign: (id: number) => void;
  getAnimalEmoji: (t: string) => string; formatDate: (d: string) => string;
  getStatusName: (id: number, name?: string) => string;
  showMessage: (t: string, type: 'success'|'error') => void;
  evidence?: TaskProof[]; completionNotes?: CompletionNote[];
}> = ({ report, isOpen, onClose, onAssignClick, onUnassign, getAnimalEmoji, formatDate, getStatusName, showMessage, evidence=[], completionNotes=[] }) => {

  const [activeTab,      setActiveTab]      = useState<'overview'|'ranger'|'evidence'|'notes'>('overview');
  const [localNote,      setLocalNote]      = useState('');
  const [savingNote,     setSavingNote]     = useState(false);
  const [selectedImage,  setSelectedImage]  = useState<string|null>(null);
  const [imageErrors,    setImageErrors]    = useState<Record<number,boolean>>({});
  const [trackingPoints, setTrackingPoints] = useState<TrackingPoint[]>([]);
  const [trackingStats,  setTrackingStats]  = useState<TrackingStats>({ pointCount:0, startTime:null, lastSeen:null, distance:0, pendingPoints:0, isLive:false });
  const [loadingTrack,   setLoadingTrack]   = useState(false);
  const [autoRefresh,    setAutoRefresh]    = useState(false);
  const [mapKey,         setMapKey]         = useState(0);

  useEffect(() => { if (report) setLocalNote(report.admin_note || ''); }, [report]);
  useEffect(() => {
    if (report?.task_id && isOpen) {
      fetchTracking(report.task_id);
      if (autoRefresh) {
        const iv = setInterval(() => { fetchTracking(report.task_id!); setMapKey(k=>k+1); }, 5000);
        return () => clearInterval(iv);
      }
    }
  }, [report?.task_id, isOpen, autoRefresh]);

  const fetchTracking = async (taskId: number) => {
    try {
      setLoadingTrack(true);
      const token = sessionStorage.getItem('token') || localStorage.getItem('token');
      if (!token) return;
      for (const url of [`http://localhost:5000/api/tasks/${taskId}/tracking`, `http://localhost:5000/api/admin/tracking/route/${taskId}`]) {
        try {
          const r = await fetch(url, { headers: { 'Authorization': `Bearer ${token}` } });
          if (r.ok) {
            const d = await r.json();
            if (d.success && d.data?.length) {
              const pts: TrackingPoint[] = d.data.map((p: any) => ({ ...p, latitude: parseFloat(p.latitude), longitude: parseFloat(p.longitude) }));
              setTrackingPoints(pts); setMapKey(k=>k+1);
              const sorted = [...pts].sort((a,b) => new Date(a.timestamp).getTime()-new Date(b.timestamp).getTime());
              let dist = 0;
              for (let i=1;i<sorted.length;i++) dist += calculateDistance(sorted[i-1].latitude,sorted[i-1].longitude,sorted[i].latitude,sorted[i].longitude);
              const last = new Date(sorted[sorted.length-1].timestamp);
              setTrackingStats({ pointCount:pts.length, startTime:new Date(sorted[0].timestamp).toLocaleTimeString(), lastSeen:last.toLocaleTimeString(), distance:Math.round(dist*10)/10, pendingPoints:pts.filter(p=>!p.synced).length, isLive:(Date.now()-last.getTime())<300000, lastLat:sorted[sorted.length-1].latitude, lastLng:sorted[sorted.length-1].longitude });
              break;
            }
          }
        } catch {}
      }
    } finally { setLoadingTrack(false); }
  };

  if (!isOpen || !report) return null;


  const handleSaveNote = async (e: React.FormEvent) => {
  e.preventDefault();
  if (!localNote.trim()) { showMessage('Please enter a note','error'); return; }
  try {
    const token = sessionStorage.getItem('token') || localStorage.getItem('token');
    if (!token) { showMessage('Please login first','error'); return; }
    setSavingNote(true);
    
    //Change from 'admin-note' to 'admin-notes' 
    const res = await fetch(`http://localhost:5000/api/reports/${report.report_id}/admin-notes`, { 
      method: 'POST', 
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      }, 
      body: JSON.stringify({ note_text: localNote })  
    });
    
    if (res.ok) { 
      const d = await res.json(); 
      showMessage('Note saved!','success'); 
      report.admin_note = d.data?.note_text || localNote; 
    } else { 
      const d = await res.json(); 
      showMessage(d.message || 'Failed to save','error'); 
    }
  } catch (err: any) { 
    showMessage(err.message || 'Error saving note','error'); 
  } finally { 
    setSavingNote(false); 
  }
};

  const statusDisplay = getStatusName(report.status_id, report.status_name);
  const isDeclined    = report.status_id === 5;
  const isInProgress  = report.status_id === 3;
  const isCompleted   = report.status_id === 4;
  const isAssigned    = report.status_id === 2;
  const showTracking  = !!report.task_id && (isInProgress || isCompleted);
  const canAssign     = !isInProgress && !isCompleted && !isAssigned;
  const positions: [number,number][] = trackingPoints.map(p => [p.latitude,p.longitude]);

  const scMap: Record<number,{bg:string;text:string;dot:string}> = {
    1:{bg:'#e8f5e9',text:'#2e7d32',dot:'#4caf50'}, 2:{bg:'#e3f2fd',text:'#1565c0',dot:'#42a5f5'},
    3:{bg:'#fff8e1',text:'#f57f17',dot:'#ffa726'}, 4:{bg:'#ede7f6',text:'#4527a0',dot:'#7e57c2'},
    5:{bg:'#ffebee',text:'#c62828',dot:'#ef5350'},
  };
  const sc = scMap[report.status_id] || scMap[1];

  const tabs = [
    {key:'overview', label:'Overview',  icon:'📋'},
    {key:'ranger',   label:'Ranger',    icon:'🦸'},
    {key:'evidence', label:`Evidence${evidence.length>0?` (${evidence.length})`:''}`, icon:'📸'},
    {key:'notes',    label:'Notes',     icon:'📌'},
  ];

  return (
    <div className="rdm-overlay" onClick={onClose}>
      <div className="rdm-shell" onClick={e=>e.stopPropagation()}>

        {/* Hero */}
        <div className="rdm-hero">
          <div className="rdm-hero-left">
            <div className="rdm-hero-emoji">{getAnimalEmoji(report.animal_type)}</div>
            <div className="rdm-hero-info">
              <div className="rdm-hero-eyebrow">Mission #{report.report_id} · {formatDate(report.submitted_at)}</div>
              <h2 className="rdm-hero-title">{report.animal_type}</h2>
              <span className="rdm-hero-condition">{report.animal_condition}</span>
            </div>
          </div>
          <div className="rdm-hero-right">
            <span className="rdm-status-pill" style={{background:sc.bg,color:sc.text}}>
              <span className="rdm-status-dot" style={{background:sc.dot}}/>
              {statusDisplay}
            </span>
            <button className="rdm-close-btn" onClick={onClose}>✕</button>
          </div>
        </div>

        {/* Tabs */}
        <div className="rdm-tabbar">
          {tabs.map(t => (
            <button key={t.key} className={`rdm-tab${activeTab===t.key?' active':''}`} onClick={()=>setActiveTab(t.key as any)}>
              <span className="rdm-tab-icon">{t.icon}</span>
              <span>{t.label}</span>
            </button>
          ))}
          {isDeclined && (
            <span className="rdm-tab-alert" onClick={()=>setActiveTab('ranger')}>⚠ Declined — reassign needed</span>
          )}
        </div>

        {/* Body */}
        <div className="rdm-body">

          {/* ══ OVERVIEW ══ */}
          {activeTab==='overview' && (
            <div className="rdm-two-col">
              <div className="rdm-col">
                <div className="rdm-card">
                  <div className="rdm-card-title">📍 Location</div>
                  <p className="rdm-location-text">{report.location_address}</p>
                  <button className="rdm-map-btn" onClick={()=>window.open(`https://maps.google.com/?q=${encodeURIComponent(report.location_address)}`,'_blank')}>
                    <TbMapSearch size={13} style={{marginRight:5}}/>Open in Google Maps
                  </button>
                </div>
                <div className="rdm-card">
                  <div className="rdm-card-title">👤 Reporter</div>
                  <div className="rdm-reporter-row">
                    <div className="rdm-avatar-lg">{report.username.charAt(0).toUpperCase()}</div>
                    <div>
                      <div className="rdm-name">{report.username}</div>
                      <div className="rdm-contact"><MdEmail size={11} style={{marginRight:4}}/>{report.email}</div>
                      <div className="rdm-contact"><MdPhone size={11} style={{marginRight:4}}/>{report.phone}</div>
                    </div>
                  </div>
                </div>
                <div className="rdm-card">
                  <div className="rdm-card-title">📝 Description</div>
                  <p className="rdm-desc-text">{report.description}</p>
                  {report.user_note && (
                    <div className="rdm-reporter-note">
                      <div className="rdm-reporter-note-label">Reporter's note</div>
                      <p>{report.user_note}</p>
                    </div>
                  )}
                </div>
              </div>

              <div className="rdm-col">
                <div className="rdm-card rdm-ranger-snapshot">
                  <div className="rdm-card-title-row">
                    <span className="rdm-card-title">🦸 Ranger</span>
                    {canAssign && (
                      <button className="rdm-pill-btn primary" onClick={()=>{setActiveTab('ranger');onAssignClick();}}>
                        {isDeclined ? '↺ Reassign' : report.volunteer_name ? '↺ Change' : '+ Assign'}
                      </button>
                    )}
                  </div>
                  {report.volunteer_name && !isDeclined ? (
                    <div className="rdm-ranger-row">
                      <div className="rdm-avatar-md">{report.volunteer_name.charAt(0).toUpperCase()}</div>
                      <div>
                        <div className="rdm-name">{report.volunteer_name}</div>
                        {report.volunteer_email && <div className="rdm-contact">{report.volunteer_email}</div>}
                      </div>
                      <span className={`rdm-badge ${isInProgress?'orange':isCompleted?'purple':isAssigned?'blue':'green'}`}>
                        {isAssigned ? 'Pending Acceptance' : statusDisplay}
                      </span>
                    </div>
                  ) : isDeclined ? (
                    <div className="rdm-declined-inline">
                      <span className="rdm-declined-icon-sm">🚫</span>
                      <div>
                        <div className="rdm-declined-name">{report.volunteer_name} declined</div>
                        {report.declined_reason && <div className="rdm-declined-reason-sm">"{report.declined_reason}"</div>}
                      </div>
                      <button className="rdm-pill-btn danger" onClick={onAssignClick}>Reassign →</button>
                    </div>
                  ) : (
                    <div className="rdm-no-ranger-sm">
                      <span>🕊️</span><span>No ranger assigned</span>
                      <button className="rdm-pill-btn primary" onClick={onAssignClick}>Assign →</button>
                    </div>
                  )}
                  {isAssigned && report.volunteer_name && (
                    <div className="rdm-pending-note">
                      ⏳ Ranger has been notified and is pending response
                    </div>
                  )}
                </div>

                {showTracking && (
                  <div className="rdm-card">
                    <div className="rdm-card-title">🗺️ Tracking</div>
                    <div className="rdm-track-mini">
                      <span className={`rdm-live-dot${trackingStats.isLive?' live':''}`}/>
                      <span className="rdm-track-status">{trackingStats.isLive?'Ranger is live':'Last known position'}</span>
                      {trackingStats.lastSeen && <span className="rdm-track-time">{trackingStats.lastSeen}</span>}
                    </div>
                    {trackingStats.pointCount>0 && (
                      <div className="rdm-track-stats-mini">
                        <div className="rdm-mini-stat"><div>{trackingStats.pointCount}</div><div>Points</div></div>
                        <div className="rdm-mini-stat"><div>{trackingStats.distance}km</div><div>Distance</div></div>
                      </div>
                    )}
                  </div>
                )}

                {completionNotes.length>0 && (
                  <div className="rdm-card">
                    <div className="rdm-card-title">✅ Completion Notes ({completionNotes.length})</div>
                    {completionNotes.slice(0,2).map(n => (
                      <div key={n.note_id} className="rdm-note-item">
                        <div className="rdm-note-meta"><span className="rdm-note-author">{n.volunteer_name||'Volunteer'}</span><span className="rdm-note-time">{formatDate(n.created_at)}</span></div>
                        <p className="rdm-note-text">{n.note_text}</p>
                      </div>
                    ))}
                    {completionNotes.length>2 && <div className="rdm-more-notes">+{completionNotes.length-2} more</div>}
                  </div>
                )}
              </div>
            </div>
          )}

          {/* ══ RANGER TAB ══ */}
          {activeTab==='ranger' && (
            <div className="rdm-ranger-tab">
              {isDeclined && (
                <div className="rdm-declined-card">
                  <div className="rdm-declined-header">
                    <div className="rdm-declined-badge">🚫 MISSION DECLINED</div>
                    {report.volunteer_responded_at && <span className="rdm-declined-when">on {formatDate(report.volunteer_responded_at)}</span>}
                  </div>
                  {report.volunteer_name && (
                    <div className="rdm-declined-ranger">
                      <div className="rdm-avatar-md declined">{report.volunteer_name.charAt(0).toUpperCase()}</div>
                      <div>
                        <div className="rdm-name">{report.volunteer_name}</div>
                        {report.volunteer_email && <div className="rdm-contact">{report.volunteer_email}</div>}
                        {report.volunteer_phone && <div className="rdm-contact">{report.volunteer_phone}</div>}
                      </div>
                    </div>
                  )}
                  {report.declined_reason ? (
                    <div className="rdm-reason-box">
                      <div className="rdm-reason-label">Reason given</div>
                      <div className="rdm-reason-text">"{report.declined_reason}"</div>
                    </div>
                  ) : (
                    <div className="rdm-reason-box empty"><em>No reason provided by ranger</em></div>
                  )}
                  <button className="rdm-reassign-cta" onClick={onAssignClick}>Assign a New Ranger →</button>
                </div>
              )}

              {!isDeclined && report.volunteer_name && (
                <div className="rdm-card rdm-assigned-card">
                  <div className="rdm-card-title-row">
                    <span className="rdm-card-title">🦸 Assigned Ranger</span>
                    {!isInProgress && !isCompleted && !isAssigned && (
                      <button className="rdm-pill-btn danger-outline" onClick={()=>onUnassign(report.report_id)}>Unassign</button>
                    )}
                  </div>
                  <div className="rdm-ranger-detail-row">
                    <div className="rdm-avatar-lg">{report.volunteer_name.charAt(0).toUpperCase()}</div>
                    <div className="rdm-ranger-detail-info">
                      <div className="rdm-name">{report.volunteer_name}</div>
                      {report.volunteer_email && <div className="rdm-contact"><MdEmail size={11} style={{marginRight:4}}/>{report.volunteer_email}</div>}
                      {report.volunteer_phone && <div className="rdm-contact"><MdPhone size={11} style={{marginRight:4}}/>{report.volunteer_phone}</div>}
                    </div>
                    <span className={`rdm-badge lg ${isInProgress?'orange':isCompleted?'purple':isAssigned?'blue':'green'}`}>
                      {isAssigned ? 'Pending Acceptance' : statusDisplay}
                    </span>
                  </div>
                  {isAssigned && (
                    <div className="rdm-pending-full">
                      ⏳ The ranger has been notified and is waiting to accept or decline this mission.
                    </div>
                  )}
                  {(isInProgress || isCompleted) && (
                    <div className="rdm-locked-note">🔒 Ranger assignment is locked while mission is {isCompleted?'completed':'in progress'}.</div>
                  )}
                </div>
              )}

              {!isDeclined && !report.volunteer_name && (
                <div className="rdm-card rdm-unassigned-card">
                  <div className="rdm-unassigned-icon">🕊️</div>
                  <h3>No ranger assigned yet</h3>
                  <p>This mission needs a ranger. Assign one to get it started.</p>
                  <button className="rdm-reassign-cta" onClick={onAssignClick}>+ Assign a Ranger</button>
                </div>
              )}

              {showTracking && (
                <div className="rdm-card" style={{marginTop:16}}>
                  <div className="rdm-card-title-row">
                    <span className="rdm-card-title">🗺️ Live Tracking</span>
                    <div style={{display:'flex',gap:8}}>
                      <button className={`rdm-pill-btn${autoRefresh?' primary':''}`} onClick={()=>setAutoRefresh(!autoRefresh)}>↻ {autoRefresh?'Auto':'Manual'}</button>
                      <button className="rdm-pill-btn" onClick={()=>{if(report.task_id){fetchTracking(report.task_id);setMapKey(k=>k+1);}}}>↻</button>
                    </div>
                  </div>
                  <div className="rdm-track-stat-grid">
                    {[['Points',trackingStats.pointCount],['Distance',`${trackingStats.distance}km`],['Started',trackingStats.startTime||'—'],['Last seen',trackingStats.lastSeen||'—']].map(([l,v])=>(
                      <div key={l as string} className="rdm-stat-cell"><div className="rdm-stat-val">{v}</div><div className="rdm-stat-lbl">{l}</div></div>
                    ))}
                  </div>
                  {loadingTrack ? (
                    <div className="rdm-track-empty"><div className="reports-spinner"/><p>Loading…</p></div>
                  ) : positions.length>0 ? (
                    <div className="rdm-map-wrap">
                      <MapContainer key={mapKey} center={positions[positions.length-1]} zoom={15} style={{height:'100%',width:'100%'}}>
                        <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" attribution="© OpenStreetMap"/>
                        <Polyline positions={positions} color="#2D5A27" weight={4} opacity={0.8}/>
                        <Marker position={positions[0]} icon={startIcon}><Popup><strong>Start</strong><br/>{new Date(trackingPoints[0].timestamp).toLocaleString()}</Popup></Marker>
                        <Marker position={positions[positions.length-1]} icon={trackingStats.isLive?liveIcon:endIcon}><Popup><strong>{trackingStats.isLive?'Current':'Last seen'}</strong><br/>{new Date(trackingPoints[trackingPoints.length-1].timestamp).toLocaleString()}</Popup></Marker>
                      </MapContainer>
                    </div>
                  ) : (
                    <div className="rdm-track-empty"><span style={{fontSize:'2.5rem'}}>📡</span><p>No tracking data yet</p></div>
                  )}
                </div>
              )}
            </div>
          )}

          {/* ══ EVIDENCE TAB ══ */}
          {activeTab==='evidence' && (
            <div className="rdm-evidence-wrap">
              {evidence.length===0 ? (
                <div className="rdm-empty-tab">
                  <span>📷</span>
                  <p>No evidence photos uploaded yet</p>
                  {!isCompleted && report.volunteer_name && <p className="rdm-empty-sub">Evidence will appear here once the ranger completes the mission</p>}
                  {!report.volunteer_name && <p className="rdm-empty-sub">Assign a ranger to this mission to see evidence</p>}
                </div>
              ) : (
                <>
                  <div className="rdm-evidence-count">{evidence.length} photo{evidence.length!==1?'s':''} uploaded</div>
                  <div className="rdm-photo-grid">
                    {evidence.map(proof => {
                      const url = getFullImageUrl(proof.proof_url);
                      const err = imageErrors[proof.proof_id];
                      return (
                        <div key={proof.proof_id} className="rdm-photo-card" onClick={()=>!err&&setSelectedImage(url)}>
                          {!err ? (
                            <img src={url} alt={`Evidence ${proof.proof_id}`} className="rdm-photo-img" onError={()=>setImageErrors(p=>({...p,[proof.proof_id]:true}))}/>
                          ) : (
                            <div className="rdm-photo-err"><MdBrokenImage size={28} color="#aaa"/><span>Unavailable</span></div>
                          )}
                          <div className="rdm-photo-date">{formatDate(proof.uploaded_at)}</div>
                        </div>
                      );
                    })}
                  </div>
                </>
              )}
            </div>
          )}

          {/* ══ NOTES TAB ══ */}
          {activeTab==='notes' && (
            <div className="rdm-notes-wrap">
              {completionNotes.length>0 && (
                <div className="rdm-notes-section">
                  <div className="rdm-notes-section-label">✅ Completion Notes from Ranger</div>
                  {completionNotes.map(n => (
                    <div key={n.note_id} className="rdm-note-item">
                      <div className="rdm-note-meta"><span className="rdm-note-author">{n.volunteer_name||'Ranger'}</span><span className="rdm-note-time">{formatDate(n.created_at)}</span></div>
                      <p className="rdm-note-text">{n.note_text}</p>
                    </div>
                  ))}
                </div>
              )}
              <div className="rdm-notes-section">
                <div className="rdm-notes-section-label">📌 Admin Note</div>
                {isInProgress||isCompleted ? (
                  <div className="rdm-note-locked">
                    <span>🔒</span>
                    <div>Notes are locked while the mission is {isCompleted?'completed':'in progress'}.
                      {report.admin_note && <p className="rdm-note-locked-text">"{report.admin_note}"</p>}
                    </div>
                  </div>
                ) : (
                  <form onSubmit={handleSaveNote}>
                    <textarea className="rdm-note-textarea" placeholder="Add internal notes about this rescue mission…" value={localNote} onChange={e=>setLocalNote(e.target.value)} rows={4}/>
                    <div style={{display:'flex',justifyContent:'flex-end',marginTop:10}}>
                      <button type="submit" className="rdm-save-btn" disabled={savingNote||!localNote.trim()}>
                        {savingNote?'Saving…':'Save Note'}
                      </button>
                    </div>
                  </form>
                )}
              </div>
            </div>
          )}

        </div>

        {/* Footer */}
        <div className="rdm-footer">
          <span className="rdm-footer-meta">#{report.report_id} · {report.animal_type} · {statusDisplay}</span>
          <button className="rdm-footer-close" onClick={onClose}>Close</button>
        </div>

        {/* Lightbox */}
        {selectedImage && (
          <div className="rdm-lightbox" onClick={()=>setSelectedImage(null)}>
            <img src={selectedImage} alt="Evidence"/>
            <button className="rdm-lightbox-close" onClick={()=>setSelectedImage(null)}>✕</button>
          </div>
        )}
      </div>
    </div>
  );
};

//  Main Component  //
const RescueReports: React.FC = () => {
  const [reports,              setReports]             = useState<RescueReport[]>([]);
  const [volunteers,           setVolunteers]          = useState<Volunteer[]>([]);
  const [loading,              setLoading]             = useState(true);
  const [loadingVolunteers,    setLoadingVolunteers]   = useState(false);
  const [filterStatus,         setFilterStatus]        = useState<string>('all');
  const [sortBy,               setSortBy]              = useState<string>('recent');
  const [searchQuery,          setSearchQuery]         = useState<string>('');
  const [selectedReport,       setSelectedReport]      = useState<RescueReport|null>(null);
  const [isModalOpen,          setIsModalOpen]         = useState(false);
  const [isVolunteerModalOpen, setIsVolunteerModalOpen]= useState(false);
  const [showSuccess,          setShowSuccess]         = useState(false);
  const [showError,            setShowError]           = useState(false);
  const [message,              setMessage]             = useState('');
  const [confirmModal,         setConfirmModal]        = useState<ConfirmModal>(CONFIRM_CLOSED);
  const [taskEvidence,         setTaskEvidence]        = useState<{[k:number]:TaskProof[]}>({});
  const [taskNotes,            setTaskNotes]           = useState<{[k:number]:CompletionNote[]}>({});
  // Local state for currently-open modal — avoids stale state race condition
  const [modalEvidence,        setModalEvidence]       = useState<TaskProof[]>([]);
  const [modalNotes,           setModalNotes]          = useState<CompletionNote[]>([]);
  const [currentPage,          setCurrentPage]         = useState(1);
  const [itemsPerPage]                                 = useState(9);

  const showMsg = (text: string, type: 'success'|'error') => {
    setMessage(text);
    if (type==='success') setShowSuccess(true); else setShowError(true);
    setTimeout(()=>{ setShowSuccess(false); setShowError(false); setMessage(''); }, 3000);
  };

  const showConfirm = (title: string, msg: string, onConfirm: ()=>void, confirmText='Confirm', confirmColor='#c62828') =>
    setConfirmModal({show:true,title,message:msg,confirmText,confirmColor,onConfirm});

  //  Fetch evidence for a task — returns the array so callers can use it immediately 
  const fetchEvidence = async (taskId: number): Promise<TaskProof[]> => {
    try {
      const token = sessionStorage.getItem('token') || localStorage.getItem('token');
      if (!token) return [];
      const response = await fetch(`http://localhost:5000/api/tasks/${taskId}/evidence`, {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      const data = await response.json();
      const items: TaskProof[] = data.success ? (data.data || []) : [];
      setTaskEvidence(prev => ({ ...prev, [taskId]: items }));
      return items;
    } catch (error) {
      console.error('Error fetching evidence:', error);
      setTaskEvidence(prev => ({ ...prev, [taskId]: [] }));
      return [];
    }
  };

  //  Fetch completion notes for a task — returns array immediately 
  const fetchNotes = async (taskId: number): Promise<CompletionNote[]> => {
    try {
      const token = sessionStorage.getItem('token') || localStorage.getItem('token');
      if (!token) return [];
      const response = await fetch(`http://localhost:5000/api/tasks/${taskId}/completion-notes`, {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      const data = await response.json();
      const items: CompletionNote[] = data.success ? (data.data || []) : [];
      setTaskNotes(prev => ({ ...prev, [taskId]: items }));
      return items;
    } catch (error) {
      console.error('Error fetching notes:', error);
      setTaskNotes(prev => ({ ...prev, [taskId]: [] }));
      return [];
    }
  };

  const fetchTaskVolunteerInfo = useCallback(async (list: RescueReport[]) => {
    const token = sessionStorage.getItem('token') || localStorage.getItem('token');
    if (!token) return;

    const reportsNeedingInfo = list.filter(
      r => [2, 3, 4, 5].includes(r.status_id) && !r.volunteer_name
    );

    if (reportsNeedingInfo.length === 0) return;

    await Promise.all(
      reportsNeedingInfo.map(async (rep) => {
        try {
          const res = await fetch(
            `http://localhost:5000/api/volunteers/report/${rep.report_id}/task`,
            { headers: { 'Authorization': `Bearer ${token}` } }
          );
          const data = await res.json();
          if (data.success && data.data && data.data.volunteer_name) {
            setReports(prev =>
              prev.map(r =>
                r.report_id === rep.report_id
                  ? {
                      ...r,
                      volunteer_name:  data.data.volunteer_name  || r.volunteer_name,
                      volunteer_email: data.data.volunteer_email || r.volunteer_email,
                      volunteer_id:    data.data.assigned_to_user_id || r.volunteer_id,
                      task_id:         data.data.task_id || r.task_id,
                    }
                  : r
              )
            );
          }
        } catch (err) {
          // Non-fatal: silently skip if task endpoint fails for a report
          console.warn(`Could not fetch task info for report ${rep.report_id}`);
        }
      })
    );
  }, []);

  //  Fetch evidence/notes for all reports with tasks  //
  const fetchAllTaskData = useCallback((list: RescueReport[]) => {
    list.forEach(rep => {
      if (rep.task_id) {
        fetchEvidence(rep.task_id);
        fetchNotes(rep.task_id);
      }
    });
  }, []);

  //  Fetch all reports  //
  const fetchReports = useCallback(async () => {
    try {
      setLoading(true);
      const token = sessionStorage.getItem('token') || localStorage.getItem('token');
      if (!token) { showMsg('Please login first','error'); setLoading(false); return; }

      const res = await fetch('http://localhost:5000/api/reports/admin/all', {
        headers: { 'Authorization': `Bearer ${token}`, 'Content-Type': 'application/json' }
      });

      if (res.ok) {
        const d = await res.json();
        if (d.success) {
          const mapped: RescueReport[] = (d.data || []).map((r: any) => ({
            report_id:              r.report_id,
            user_id:                r.user_id,
            username:               r.reporter_name || 'Anonymous',
            email:                  r.email         || 'No email',
            phone:                  r.reporter_phone || 'No phone',
            description:            r.description,
            location_address:       r.location_address,
            user_note:              r.user_note,
            admin_note:             r.admin_note,
            submitted_at:           r.submitted_at,
            animal_type:            r.animal_type      || 'Unknown',
            animal_condition:       r.animal_condition || 'Unknown',
            status_id:              r.status_id        || 1,
            status_name:            r.status_name,
            // volunteer fields — may be null if the API doesn't JOIN tasks
            volunteer_id:           r.volunteer_id,
            volunteer_name:         r.volunteer_name   || null,
            volunteer_email:        r.volunteer_email  || null,
            volunteer_phone:        r.volunteer_phone  || null,
            task_id:                r.task_id,
            task_status:            r.task_status,
            declined_reason:        r.declined_reason,
            volunteer_responded_at: r.volunteer_responded_at,
            volunteer_response:     r.volunteer_response,
          }));

          setReports(mapped);
          setCurrentPage(1);

          // Fetch task/evidence/notes data
          fetchAllTaskData(mapped);

          // KEY FIX: enrich any reports where volunteer_name came back null
          fetchTaskVolunteerInfo(mapped);

        } else {
          showMsg(d.message || 'Failed to load', 'error');
        }
      } else {
        showMsg('Failed to fetch reports', 'error');
      }
    } catch {
      showMsg('Error loading reports. Please check your connection.', 'error');
    } finally {
      setLoading(false);
    }
  }, [fetchAllTaskData, fetchTaskVolunteerInfo]);

  //  Fetch available volunteers  //
  const fetchVolunteers = useCallback(async () => {
    try {
      setLoadingVolunteers(true);
      const token = sessionStorage.getItem('token') || localStorage.getItem('token');
      if (!token) { setVolunteers([]); return; }

      const res = await fetch('http://localhost:5000/api/volunteers/available', {
        headers: { 'Authorization': `Bearer ${token}`, 'Content-Type': 'application/json' }
      });

      if (res.ok) {
        const d = await res.json();
        if (d.success) {
          setVolunteers((d.data || []).map((v: any) => ({
            user_id:               v.user_id,
            username:              v.username,
            email:                 v.email,
            phone:                 v.phone            || 'Not provided',
            bio:                   v.bio,
            joined_at:             v.joined_at        || v.created_at,
            approval_status:       v.approval_status,
            approval_status_id:    v.approval_status_id,
            availability_status:   v.availability_status,
            availability_status_id:v.availability_status_id,
            assigned_reports_count:v.assigned_reports_count || 0,
            role_id:               v.role_id,
            created_at:            v.created_at,
            has_car:               v.has_car    !== undefined ? v.has_car    : 0,
            can_foster:            v.can_foster !== undefined ? v.can_foster : 0,
            animal_handling:       v.animal_handling || '',
            city:                  v.city            || '',
            badges:                v.badges,
          })));
        } else {
          setVolunteers([]);
        }
      } else {
        setVolunteers([]);
      }
    } catch {
      setVolunteers([]);
    } finally {
      setLoadingVolunteers(false);
    }
  }, []);

  //  Open detail modal
  const handleViewDetails = async (report: RescueReport) => {
    setSelectedReport(report);
    // Reset modal data first
    setModalEvidence([]);
    setModalNotes([]);

    if (report.task_id) {
      // Fetch in parallel  returns data directly so no stale-state race
      const [evidence, notes] = await Promise.all([
        fetchEvidence(report.task_id),
        fetchNotes(report.task_id),
      ]);
      setModalEvidence(evidence);
      setModalNotes(notes);
    }
    setIsModalOpen(true);
  };

  useEffect(() => { fetchReports(); fetchVolunteers(); }, [fetchReports, fetchVolunteers]);

  //  Assign volunteer 
  const assignVolunteer = async (reportId: number, volunteerId: number, volunteerName: string) => {
    try {
      const token = sessionStorage.getItem('token') || localStorage.getItem('token');
      if (!token) { showMsg('Please login first', 'error'); return; }

      const res = await fetch('http://localhost:5000/api/volunteers/assign', {
        method: 'POST',
        headers: { 'Authorization': `Bearer ${token}`, 'Content-Type': 'application/json' },
        body: JSON.stringify({ report_id: reportId, volunteer_id: volunteerId })
      });

      if (res.ok) {
        const data = await res.json();
        const vol = volunteers.find(v => v.user_id === volunteerId);
        setReports(prev => prev.map(r =>
          r.report_id === reportId ? {
            ...r,
            volunteer_id:           volunteerId,
            volunteer_name:         volunteerName,
            volunteer_email:        vol?.email || '',
            volunteer_phone:        vol?.phone || '',
            status_id:              2,
            status_name:            'assigned',
            task_id:                data.data?.task_id,
            declined_reason:        undefined,
            volunteer_responded_at: undefined,
            volunteer_response:     undefined,
          } : r
        ));
        setVolunteers(prev => prev.map(v =>
          v.user_id === volunteerId
            ? { ...v, assigned_reports_count: (v.assigned_reports_count || 0) + 1 }
            : v
        ));
        showMsg(`Ranger "${volunteerName}" has been notified! They need to accept the mission.`, 'success');
        setIsVolunteerModalOpen(false);
        setSelectedReport(null);
        await fetchReports();
        await fetchVolunteers();
      } else {
        const d = await res.json();
        showMsg(d.message || 'Failed to assign', 'error');
      }
    } catch (err: any) {
      showMsg(err.message || 'Error assigning ranger', 'error');
    }
  };

  //  Unassign volunteer 
  const unassignVolunteer = (reportId: number) =>
    showConfirm(
      'Unassign Ranger',
      'Are you sure? The mission will go back to "Submitted" status.',
      () => doUnassign(reportId),
      'Unassign',
      '#FF9F1C'
    );

  const doUnassign = async (reportId: number) => {
    try {
      const token = sessionStorage.getItem('token') || localStorage.getItem('token');
      if (!token) { showMsg('Please login first', 'error'); return; }

      const res = await fetch(`http://localhost:5000/api/volunteers/unassign/${reportId}`, {
        method: 'DELETE',
        headers: { 'Authorization': `Bearer ${token}`, 'Content-Type': 'application/json' }
      });

      if (res.ok) {
        setReports(prev => prev.map(r =>
          r.report_id === reportId ? {
            ...r,
            volunteer_id:           undefined,
            volunteer_name:         undefined,
            volunteer_email:        undefined,
            volunteer_phone:        undefined,
            status_id:              1,
            status_name:            'submitted',
            task_id:                undefined,
            declined_reason:        undefined,
            volunteer_responded_at: undefined,
            volunteer_response:     undefined,
          } : r
        ));
        showMsg('Ranger unassigned successfully', 'success');
        await fetchReports();
        await fetchVolunteers();
      } else {
        const d = await res.json();
        showMsg(d.message || 'Failed to unassign', 'error');
      }
    } catch (err: any) {
      showMsg(err.message || 'Error unassigning', 'error');
    }
  };

  //  Formatters 
  const formatDate = (s: string) => {
    try { return new Date(s).toLocaleDateString('en-US',{month:'short',day:'numeric',year:'numeric',hour:'2-digit',minute:'2-digit'}); }
    catch { return 'Invalid date'; }
  };

  const formatRelative = (s: string) => {
    try {
      const diff=Date.now()-new Date(s).getTime(), m=Math.floor(diff/60000), h=Math.floor(m/60), d=Math.floor(h/24);
      if (m<1) return 'Just now'; if (m<60) return `${m}m ago`; if (h<24) return `${h}h ago`;
      if (d===1) return 'Yesterday'; if (d<7) return `${d} days ago`; return formatDate(s);
    } catch { return 'Invalid date'; }
  };

  const formatVolDate = (s: string) => {
    try { return new Date(s).toLocaleDateString('en-US',{year:'numeric',month:'short',day:'numeric'}); }
    catch { return 'Invalid'; }
  };

  const getStatusName = (id: number, name?: string) => {
    if (name) return name.split('_').map(w=>w.charAt(0).toUpperCase()+w.slice(1)).join(' ');
    const m: Record<number,string> = {1:'Submitted',2:'Assigned (Pending)',3:'In Progress',4:'Completed',5:'Declined'};
    return m[id] || 'Unknown';
  };

  //  Export CSV  /
  const exportCSV = () => {
    try {
      const data = reports.map(r=>({
        'Report ID':  r.report_id,
        'Status':     getStatusName(r.status_id,r.status_name),
        'Animal':     r.animal_type,
        'Condition':  r.animal_condition,
        'Location':   r.location_address,
        'Reporter':   r.username,
        'Email':      r.email,
        'Phone':      r.phone,
        'Ranger':     r.volunteer_name || 'Not assigned',
        'Date':       formatDate(r.submitted_at),
        'Description':r.description.replace(/,/g,';'),
      }));
      if (!data.length) { showMsg('No data','error'); return; }
      const headers = Object.keys(data[0]);
      const csv = [headers.join(','),...data.map(row=>headers.map(h=>{
        const v=row[h as keyof typeof row];
        return (typeof v==='string'&&v.includes(','))?`"${v}"`:v;
      }).join(','))].join('\n');
      const a=document.createElement('a');
      a.href=URL.createObjectURL(new Blob([csv],{type:'text/csv;charset=utf-8;'}));
      a.download=`rescue_reports_${new Date().toISOString().split('T')[0]}.csv`;
      a.style.display='none'; document.body.appendChild(a); a.click(); document.body.removeChild(a);
      showMsg(`Exported ${data.length} reports`,'success');
    } catch { showMsg('Export failed','error'); }
  };

  // ── Filter & sort ──────────────────────────────────────────────────────────
  const filtered = reports.filter(r => {
    if (filterStatus !== 'all') {
      const m: Record<string,number> = {submitted:1,assigned:2,'in-progress':3,completed:4,declined:5};
      if (r.status_id !== m[filterStatus]) return false;
    }
    if (searchQuery) {
      const q = searchQuery.toLowerCase();
      return r.username?.toLowerCase().includes(q)
        || r.animal_type?.toLowerCase().includes(q)
        || r.location_address?.toLowerCase().includes(q)
        || r.description?.toLowerCase().includes(q)
        || r.report_id.toString().includes(q)
        || r.volunteer_name?.toLowerCase().includes(q)
        || (r.declined_reason?.toLowerCase().includes(q) ?? false);
    }
    return true;
  }).sort((a,b) => {
    if (sortBy==='recent')   return new Date(b.submitted_at).getTime()-new Date(a.submitted_at).getTime();
    if (sortBy==='oldest')   return new Date(a.submitted_at).getTime()-new Date(b.submitted_at).getTime();
    if (sortBy==='critical') {
      const s=(c:string)=>{const x=c?.toLowerCase()||'';return x.includes('critical')?0:x.includes('severe')?1:x.includes('urgent')?2:3;};
      return s(a.animal_condition)-s(b.animal_condition);
    }
    if (sortBy==='status') return a.status_id-b.status_id;
    return 0;
  });

  const lastIdx=currentPage*itemsPerPage, firstIdx=lastIdx-itemsPerPage;
  const currentItems=filtered.slice(firstIdx,lastIdx), totalPages=Math.ceil(filtered.length/itemsPerPage);
  const getPages=()=>{
    const n:number[]=[];
    if(totalPages<=5){for(let i=1;i<=totalPages;i++)n.push(i);}
    else if(currentPage<=3){for(let i=1;i<=5;i++)n.push(i);}
    else if(currentPage>=totalPages-2){for(let i=totalPages-4;i<=totalPages;i++)n.push(i);}
    else{for(let i=currentPage-2;i<=currentPage+2;i++)n.push(i);}
    return n;
  };

  //  Loading state  //
  if (loading) return (
    <div className="reports-loading-container">
      <div className="reports-loader"><div className="reports-spinner"/><p className="reports-loader-text">Loading rescue missions…</p></div>
    </div>
  );

  //  Render 
  return (
    <div className="reports-container">

      {/* Confirm modal */}
      {confirmModal.show && (
        <div style={{position:'fixed',inset:0,background:'rgba(0,0,0,0.45)',zIndex:99999,display:'flex',alignItems:'center',justifyContent:'center',backdropFilter:'blur(3px)'}}>
          <div style={{background:'white',borderRadius:20,padding:'36px 32px',maxWidth:420,width:'90%',boxShadow:'0 25px 50px rgba(0,0,0,0.2)',border:'1px solid #e8dfc9',textAlign:'center'}}>
            <MdWarning size={48} color="#FF9F1C" style={{marginBottom:14}}/>
            <h3 style={{color:'#2D5A27',margin:'0 0 10px',fontSize:'1.25rem',fontWeight:700}}>{confirmModal.title}</h3>
            <p style={{color:'#666',margin:'0 0 28px',lineHeight:1.65,fontSize:'0.95rem'}}>{confirmModal.message}</p>
            <div style={{display:'flex',gap:12,justifyContent:'center'}}>
              <button onClick={()=>setConfirmModal(CONFIRM_CLOSED)} style={{padding:'11px 28px',borderRadius:10,border:'2px solid #e8dfc9',background:'white',color:'#666',fontWeight:600,cursor:'pointer',fontSize:'0.9rem'}}>Cancel</button>
              <button onClick={()=>{confirmModal.onConfirm();setConfirmModal(CONFIRM_CLOSED);}} style={{padding:'11px 28px',borderRadius:10,border:'none',background:confirmModal.confirmColor,color:'white',fontWeight:600,cursor:'pointer',fontSize:'0.9rem'}}>{confirmModal.confirmText}</button>
            </div>
          </div>
        </div>
      )}

      {showSuccess && <div className="reports-notification success"><MdCheckCircle size={18} color="#2e7d32"/><span>{message}</span></div>}
      {showError   && <div className="reports-notification error"><MdError size={18} color="#b33a3a"/><span>{message}</span></div>}

      {/* Header */}
      <div className="reports-header">
        <div className="reports-header-content">
          <h1 className="reports-title">Rescue Operations</h1>
          <p className="reports-subtitle">Manage and coordinate animal rescue missions with our ranger team</p>
        </div>
        <div className="reports-header-actions">
          <button onClick={fetchReports} className="reports-btn refresh" title="Refresh"><MdRefresh size={18}/></button>
          <button onClick={exportCSV} className="reports-btn primary" disabled={!reports.length}><MdDownload size={16} style={{marginRight:4}}/>Export CSV</button>
        </div>
      </div>

      {/* Filters */}
      <div className="reports-filters-card">
        <div className="reports-search-wrapper">
          <MdSearch className="search-icon" size={18}/>
          <input type="text" placeholder="Search by ID, animal, location, ranger, reason…" value={searchQuery} onChange={e=>setSearchQuery(e.target.value)} className="reports-search-input"/>
          {searchQuery && <button className="reports-clear-search" onClick={()=>setSearchQuery('')}><MdClose size={18}/></button>}
        </div>
        <div className="reports-filters-row">
          <div className="reports-filter-group">
            <label className="reports-filter-label"><MdFilterList size={11} style={{marginRight:4}}/>Status</label>
            <div className="reports-select-wrapper">
              <select value={filterStatus} onChange={e=>setFilterStatus(e.target.value)} className="reports-filter-select">
                <option value="all">All Status</option>
                <option value="submitted">Submitted</option>
                <option value="assigned">Assigned (Pending)</option>
                <option value="in-progress">In Progress</option>
                <option value="completed">Completed</option>
                <option value="declined">Declined</option>
              </select>
              <span className="reports-select-arrow">▼</span>
            </div>
          </div>
          <div className="reports-filter-group">
            <label className="reports-filter-label"><MdSort size={11} style={{marginRight:4}}/>Sort By</label>
            <div className="reports-select-wrapper">
              <select value={sortBy} onChange={e=>setSortBy(e.target.value)} className="reports-filter-select">
                <option value="recent">Most Recent</option>
                <option value="oldest">Oldest</option>
                <option value="critical">Critical First</option>
                <option value="status">By Status</option>
              </select>
              <span className="reports-select-arrow">▼</span>
            </div>
          </div>
          <div className="reports-stats-badge">{filtered.length} of {reports.length} missions</div>
        </div>
      </div>

      {/* Grid */}
      <div className="reports-content">
        {filtered.length===0 ? (
          <div className="reports-empty-state">
            <FaPaw size={48} color="#ccc" style={{marginBottom:16}}/>
            <h3>No Rescue Missions Found</h3>
            <p>
              {searchQuery
                ? `No missions matching "${searchQuery}"`
                : filterStatus!=='all'
                  ? `No missions with status "${filterStatus}"`
                  : 'No rescue missions reported yet.'}
            </p>
            {(searchQuery||filterStatus!=='all') && (
              <button onClick={()=>{setSearchQuery('');setFilterStatus('all');setCurrentPage(1);}} className="reports-btn outline">Clear Filters</button>
            )}
          </div>
        ) : (
          <>
            <div className="reports-grid">
              {currentItems.map(report => {
                const isDeclined      = report.status_id===5;
                const isAssigned      = report.status_id===2;
                const isInProg        = report.status_id===3;
                const statusDisplay   = getStatusName(report.status_id,report.status_name);
                const badgeColors     = getStatusBadgeColors(report.status_id);
                const evidencePhotos  = report.task_id ? (taskEvidence[report.task_id]||[]) : [];
                const firstPhoto      = evidencePhotos.length>0 ? getFullImageUrl(evidencePhotos[0].proof_url) : null;
                const cardTitle       = getCardTitle(report.animal_type,report.animal_condition);
                const isCritical      = report.animal_condition?.toLowerCase().includes('critical') || report.animal_condition?.toLowerCase().includes('injur');
                const condInTitle     = cardTitle.toLowerCase().startsWith((report.animal_condition||'').toLowerCase().split(' ')[0]);
                const completionNotes = report.task_id ? (taskNotes[report.task_id]||[]) : [];

                return (
                  <div key={report.report_id} className="rr-card" onClick={()=>handleViewDetails(report)}>
                    <div className="rr-card-img">
                      {firstPhoto && (
                        <img
                          src={firstPhoto}
                          alt="Evidence"
                          onError={e=>{
                            (e.currentTarget as HTMLImageElement).style.display='none';
                            const fb=(e.currentTarget as HTMLImageElement).nextElementSibling as HTMLElement;
                            if(fb) fb.style.display='flex';
                          }}
                        />
                      )}
                      <div className="rr-card-placeholder" style={{display:firstPhoto?'none':'flex'}}>
                        <div className="rr-card-placeholder-emoji">{getAnimalEmoji(report.animal_type)}</div>
                        <span className="rr-card-placeholder-label">No photo yet</span>
                      </div>
                      <span className="rr-card-badge" style={{background:badgeColors.bg,color:badgeColors.color}}>{statusDisplay.toUpperCase()}</span>
                      <span className="rr-card-id">#{report.report_id}</span>
                      {evidencePhotos.length>0 && <span className="rr-card-photo-count"><MdCameraAlt size={11} style={{marginRight:3}}/>{evidencePhotos.length}</span>}
                    </div>

                    <div className="rr-card-body">
                      <div className="rr-card-title-row">
                        <span className="rr-card-emoji">{getAnimalEmoji(report.animal_type)}</span>
                        <span className="rr-card-title">{cardTitle}</span>
                      </div>
                      {report.animal_condition&&!condInTitle && (
                        <span className={`rr-card-condition ${isCritical?'critical':'normal'}`}>{report.animal_condition}</span>
                      )}
                      <div className="rr-card-location">
                        <MdLocationOn size={13} color="#2D5A27" className="rr-location-icon"/>
                        <span className="rr-card-location-text">{report.location_address}</span>
                      </div>
                      <p className="rr-card-desc">"{report.description}"</p>

                      {/* Ranger section — shows volunteer name when assigned */}
                      <div className="rr-card-ranger">
                        {report.volunteer_name ? (
                          <div className={`rr-ranger-pill ${isDeclined?'declined':isAssigned?'pending':''}`}>
                            <div className={`rr-ranger-avatar ${isDeclined?'declined':isAssigned?'pending':''}`}>
                              {report.volunteer_name.charAt(0).toUpperCase()}
                            </div>
                            <div className="rr-ranger-info">
                              <span className="rr-ranger-name">{report.volunteer_name}</span>
                              <span className="rr-ranger-role">
                                {isDeclined  ? 'Declined mission'   :
                                 isAssigned  ? 'Pending acceptance' :
                                 isInProg    ? 'In Progress'        : 'Assigned Ranger'}
                              </span>
                              {isDeclined && report.declined_reason && (
                                <span className="rr-ranger-reason">
                                  "{report.declined_reason.length>35
                                    ? `${report.declined_reason.substring(0,35)}…`
                                    : report.declined_reason}"
                                </span>
                              )}
                            </div>
                            {isDeclined  && <FaBan size={14} color="#d32f2f"/>}
                            {isAssigned  && <MdAccessTime size={14} color="#ff9800"/>}
                          </div>
                        ) : (
                          <div className="rr-no-ranger">
                            <FaUserShield size={13} color="#aaa" style={{marginRight:6}}/>
                            <span>No ranger assigned</span>
                          </div>
                        )}
                      </div>

                      <div className="rr-card-reporter-row">
                        <div className="rr-reporter-pill">
                          <div className="rr-reporter-avatar">{report.username.charAt(0).toUpperCase()}</div>
                          <span className="rr-reporter-name">{report.username}</span>
                        </div>
                        <span className="rr-card-time"><MdAccessTime size={11} style={{marginRight:3}}/>{formatRelative(report.submitted_at)}</span>
                      </div>

                      {completionNotes.length>0 && (
                        <div className="rr-completion-note-teaser">
                          <MdCheckCircle size={12} color="#2D5A27" style={{marginRight:4,flexShrink:0}}/>
                          <span>
                            "{completionNotes[0].note_text.length>55
                              ? `${completionNotes[0].note_text.substring(0,55)}…`
                              : completionNotes[0].note_text}"
                          </span>
                        </div>
                      )}
                    </div>

                    <div className="rr-card-footer">
                      <button
                        className="rr-card-btn"
                        onClick={e=>{e.stopPropagation();handleViewDetails(report);}}
                      >
                        <MdAssignment size={14} style={{marginRight:5}}/>VIEW MISSION DETAILS
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>

            {totalPages>1 && (
              <div className="reports-pagination">
                <button onClick={()=>setCurrentPage(p=>Math.max(p-1,1))} disabled={currentPage===1} className="reports-pagination-btn">← Prev</button>
                <div className="reports-pagination-numbers">
                  {getPages().map(n=>(
                    <button key={n} onClick={()=>setCurrentPage(n)} className={`reports-pagination-number${currentPage===n?' active':''}`}>{n}</button>
                  ))}
                </div>
                <button onClick={()=>setCurrentPage(p=>Math.min(p+1,totalPages))} disabled={currentPage===totalPages} className="reports-pagination-btn">Next →</button>
              </div>
            )}
          </>
        )}
      </div>

      {/* Modals */}
      <ReportDetailModal
        report={selectedReport}
        isOpen={isModalOpen}
        onClose={()=>{setIsModalOpen(false);setSelectedReport(null);setModalEvidence([]);setModalNotes([]);}}
        onAssignClick={()=>{setIsModalOpen(false);setIsVolunteerModalOpen(true);}}
        onUnassign={unassignVolunteer}
        getAnimalEmoji={getAnimalEmoji}
        formatDate={formatDate}
        getStatusName={getStatusName}
        showMessage={showMsg}
        evidence={modalEvidence}
        completionNotes={modalNotes}
      />

      <VolunteerSelectModal
        report={selectedReport}
        isOpen={isVolunteerModalOpen}
        onClose={()=>{setIsVolunteerModalOpen(false);setIsModalOpen(true);}}
        onSelect={vol=>{if(selectedReport) assignVolunteer(selectedReport.report_id,vol.user_id,vol.username);}}
        volunteers={volunteers}
        loadingVolunteers={loadingVolunteers}
        getAnimalEmoji={getAnimalEmoji}
        formatVolunteerDate={formatVolDate}
      />
    </div>
  );
};

export default RescueReports;