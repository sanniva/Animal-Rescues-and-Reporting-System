import React, { useState, useEffect, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../../context/AuthContext';
import Icon from '../../../components/Icon';
import './MyReports.css';

// Interfaces
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
  task_id?: number;
  volunteer_name?: string;
  volunteer_email?: string;
  volunteer_phone?: string;
  completed_at?: string;
}

//  Design Tokens (match Dashboard exactly) 
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
};

//  Helpers 
const getToken = () => localStorage.getItem('token') || sessionStorage.getItem('token');

const hasPhone = (p?: string | null): boolean =>
  typeof p === 'string' && p.trim().length > 0;

const fmtPhone = (p?: string | null): string => {
  if (!hasPhone(p)) return 'Not provided';
  const c = String(p).trim().replace(/\D/g, '');
  return c.length === 10 ? `+977 ${c}` : String(p).trim();
};

const getFullImageUrl = (url: string): string => {
  if (!url) return '';
  if (url.startsWith('http://') || url.startsWith('https://')) return url;
  const clean = url.replace(/^\/+/, '');
  return clean.startsWith('uploads/')
    ? `${process.env.REACT_APP_API_URL}/${clean}`
    : `${process.env.REACT_APP_API_URL}/uploads/${clean}`;
};

const animalEmoji = (type: string): string => {
  const s = type?.toLowerCase() || '';
  if (s.includes('dog')) return '🐕';
  if (s.includes('cat')) return '🐈';
  if (s.includes('parrot')) return '🦜';
  if (s.includes('eagle')) return '🦅';
  if (s.includes('owl')) return '🦉';
  if (s.includes('duck')) return '🦆';
  if (s.includes('penguin')) return '🐧';
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
  if (s.includes('deer')) return '🦌';
  if (s.includes('fox')) return '🦊';
  if (s.includes('bear')) return '🐻';
  if (s.includes('elephant')) return '🐘';
  return '🐾';
};

const statusColor = (s?: string): { bg: string; color: string; dot: string } => {
  const n = s?.toLowerCase() || '';
  if (n.includes('submitted')) return { bg: T.blueLt, color: T.blue, dot: T.blue };
  if (n.includes('review')) return { bg: '#fff8e1', color: '#e65100', dot: '#ffb300' };
  if (n.includes('progress')) return { bg: '#e8f5e9', color: '#2e7d32', dot: '#43a047' };
  if (n.includes('completed')) return { bg: '#e8f5e9', color: '#1b5e20', dot: '#2e7d32' };
  if (n.includes('cancelled') || n.includes('declined'))
    return { bg: T.redLt, color: T.red, dot: T.red };
  return { bg: T.sand, color: T.textMid, dot: T.textSoft };
};

const statusLabel = (s?: string): string =>
  s ? s.replace(/_/g, ' ').replace(/\b\w/g, c => c.toUpperCase()) : 'Unknown';

const fmtDate = (d?: string): string => {
  if (!d) return '—';
  try {
    return new Date(d).toLocaleDateString('en-US', {
      month: 'short', day: 'numeric', year: 'numeric',
      hour: '2-digit', minute: '2-digit',
    });
  } catch { return '—'; }
};

const fmtShort = (d?: string): string => {
  if (!d) return '—';
  try {
    return new Date(d).toLocaleDateString('en-US', {
      month: 'short', day: 'numeric', year: 'numeric',
    });
  } catch { return '—'; }
};

const fmtRel = (d?: string): string => {
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

const isWithinDateRange = (dateString: string, range: string): boolean => {
  const diff = (Date.now() - new Date(dateString).getTime()) / (1000 * 60 * 60 * 24);
  switch (range) {
    case 'today': return diff < 1;
    case 'week': return diff < 7;
    case 'month': return diff < 30;
    case '3months': return diff < 90;
    case '6months': return diff < 180;
    default: return true;
  }
};

//  Pill Component  //
const Pill: React.FC<{ bg: string; color: string; dot?: string; children: React.ReactNode }> = ({
  bg, color, dot, children,
}) => (
  <span className="pill" style={{ background: bg, color }}>
    {dot && <span className="pill-dot" style={{ background: dot }} />}
    {children}
  </span>
);

//  Enhanced Report Detail Modal (Like Dashboard)  //
const MRDetailModal: React.FC<{
  report: Report | null;
  isOpen: boolean;
  onClose: () => void;
}> = ({ report, isOpen, onClose }) => {
  const [evidence, setEvidence] = useState<TaskProof[]>([]);
  const [notes, setNotes] = useState<CompletionNote[]>([]);
  const [loading, setLoading] = useState(false);
  const [zoom, setZoom] = useState<string | null>(null);
  const [imgErrs, setImgErrs] = useState<Record<number, boolean>>({});
  const [activeTab, setActiveTab] = useState<'info' | 'evidence' | 'notes'>('info');

  useEffect(() => {
    if (isOpen && report?.task_id && report.status_id === 4) {
      fetchDetails(report.task_id);
    } else {
      setEvidence([]); setNotes([]); setImgErrs({});
    }
    setActiveTab('info');
  }, [isOpen, report]);

  const fetchDetails = async (taskId: number) => {
    setLoading(true);
    const token = getToken();
    try {
      const [er, nr] = await Promise.all([
        fetch(`${process.env.REACT_APP_API_URL}/api/tasks/${taskId}/evidence`,
          { headers: { 'Authorization': `Bearer ${token}` } }),
        fetch(`${process.env.REACT_APP_API_URL}/api/tasks/${taskId}/completion-notes`,
          { headers: { 'Authorization': `Bearer ${token}` } }),
      ]);
      const [ed, nd] = [await er.json(), await nr.json()];
      if (ed.success) setEvidence(ed.data || []);
      if (nd.success) setNotes(nd.data || []);
    } catch (e) { console.error(e); }
    finally { setLoading(false); }
  };

  if (!isOpen || !report) return null;

  const done = report.status_id === 4;
  const sc = statusColor(report.status_name);
  const emoji = animalEmoji(report.animal_type);

  const DetailRow: React.FC<{ icon: React.ReactNode; label: string; value: React.ReactNode }> = ({
    icon, label, value,
  }) => (
    <div className="myr-detail-row">
      <span className="myr-detail-icon">{icon}</span>
      <div>
        <div className="myr-detail-label">{label}</div>
        <div className="myr-detail-value">{value}</div>
      </div>
    </div>
  );

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="myr-modal" onClick={e => e.stopPropagation()}>

        <div className="modal-header-gradient myr-modal-header-inner">
          <div className="modal-header-row">
            <div className="animal-icon-badge" style={{ fontSize: 30 }}>{emoji}</div>
            <div>
              <div className="modal-title">Report #{report.report_id}</div>
              <div className="modal-subtitle">{report.animal_type} · {report.animal_condition}</div>
            </div>
          </div>
          <div className="modal-header-actions">
            <Pill bg={sc.bg} color={sc.color} dot={sc.dot}>{statusLabel(report.status_name)}</Pill>
            <button className="modal-close" onClick={onClose}>×</button>
          </div>
        </div>

        {done && (
          <div className="modal-tabs">
            {(['info', 'evidence', 'notes'] as const).map(t => (
              <button key={t} className={`modal-tab ${activeTab === t ? 'active' : ''}`}
                onClick={() => setActiveTab(t)}>
                {t === 'info' && 'Details'}
                {t === 'evidence' && `Evidence${evidence.length ? ` (${evidence.length})` : ''}`}
                {t === 'notes' && `Notes${notes.length ? ` (${notes.length})` : ''}`}
              </button>
            ))}
          </div>
        )}

        <div className="modal-scrollable">
          {activeTab === 'info' && (
            <div className="details-grid">
              <div className="details-col">
                <DetailRow icon={<Icon type="fa" name="FaUser" size={13} />}
                  label="Reporter" value={report.reporter_name || 'Anonymous'} />
                {report.email && (
                  <DetailRow icon={<Icon type="fa" name="FaEnvelope" size={13} />}
                    label="Email" value={<a href={`mailto:${report.email}`}>{report.email}</a>} />
                )}
                {hasPhone(report.reporter_phone) && (
                  <DetailRow icon={<Icon type="fa" name="FaPhone" size={13} />}
                    label="Phone" value={fmtPhone(report.reporter_phone)} />
                )}
                <DetailRow icon={<Icon type="fa" name="FaIdCard" size={13} />}
                  label="User ID" value={`#${report.user_id}`} />
                <DetailRow icon={<Icon type="fa" name="FaCalendarAlt" size={13} />}
                  label="Submitted" value={fmtShort(report.submitted_at)} />
              </div>
              <div className="details-col">
                <DetailRow icon={<span style={{ fontSize: 14 }}>{emoji}</span>}
                  label="Animal" value={report.animal_type} />
                <DetailRow icon={<Icon type="fa" name="FaMedkit" size={13} />}
                  label="Condition" value={<Pill bg={T.amberLt} color={T.amber}>{report.animal_condition}</Pill>} />
                <DetailRow icon={<Icon type="fa" name="FaMapMarkerAlt" size={13} />}
                  label="Location" value={report.location_address} />
                {report.volunteer_name && (
                  <DetailRow icon={<Icon type="fa" name="FaUserShield" size={13} />}
                    label="Ranger" value={report.volunteer_name} />
                )}
              </div>
              <div className="details-full">
                <div className="description-box">
                  <div className="description-label">
                    <Icon type="fa" name="FaFileAlt" size={11} /> Description
                  </div>
                  <div className="description-text">{report.description}</div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'evidence' && done && (
            loading ? (
              <div className="loading-state">Loading evidence…</div>
            ) : evidence.length > 0 ? (
              <div className="evidence-grid-large">
                {evidence.map(p => {
                  const url = getFullImageUrl(p.proof_url);
                  return (
                    <div key={p.proof_id} className="evidence-card"
                      onClick={() => !imgErrs[p.proof_id] && setZoom(url)}>
                      {!imgErrs[p.proof_id] ? (
                        <img src={url} alt=""
                          onError={() => setImgErrs(e => ({ ...e, [p.proof_id]: true }))} />
                      ) : (
                        <div className="evidence-placeholder">
                          <Icon type="fa" name="FaCamera" size={28} />
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

          {activeTab === 'notes' && done && (
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
          <img src={zoom} alt="Enlarged evidence" />
          <button className="lightbox-close" onClick={() => setZoom(null)}>×</button>
        </div>
      )}
    </div>
  );
};

// ─── Edit Modal ───────────────────────────────────────────────────────────────
const MREditModal: React.FC<{
  report: Report | null;
  isOpen: boolean;
  onClose: () => void;
  onSave: (updated: Report) => Promise<void>;
}> = ({ report, isOpen, onClose, onSave }) => {
  const [description, setDescription] = useState('');
  const [location, setLocation] = useState('');
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (report) {
      setDescription(report.description);
      setLocation(report.location_address);
      setError(null);
    }
  }, [report]);

  if (!isOpen || !report) return null;

  const handleSave = async () => {
    setError(null);
    if (description.trim().length < 10) { setError('Description must be at least 10 characters'); return; }
    if (location.trim().length < 5) { setError('Location must be at least 5 characters'); return; }
    if (description.trim() === report.description && location.trim() === report.location_address) {
      setError('No changes made'); return;
    }
    setSaving(true);
    try {
      await onSave({ ...report, description: description.trim(), location_address: location.trim() });
      onClose();
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Failed to save');
    } finally { setSaving(false); }
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="myr-modal myr-modal-sm" onClick={e => e.stopPropagation()}>
        <div className="myr-edit-header">
          <div className="modal-header-row">
            <div className="animal-icon-badge" style={{ fontSize: 22 }}>
              {animalEmoji(report.animal_type)}
            </div>
            <div>
              <div className="modal-title" style={{ color: T.white }}>Edit Report #{report.report_id}</div>
              <div className="modal-subtitle">{report.animal_type}</div>
            </div>
          </div>
          <button className="modal-close" onClick={onClose} disabled={saving}>×</button>
        </div>

        <div className="myr-form-body">
          {error && <div className="error-message">{error}</div>}
          <div className="form-group">
            <label className="form-label">Description <span className="required">*</span></label>
            <textarea className="form-textarea" value={description}
              onChange={e => setDescription(e.target.value)}
              rows={4} disabled={saving}
              placeholder="Describe the animal's situation…" />
          </div>
          <div className="form-group">
            <label className="form-label">Location <span className="required">*</span></label>
            <textarea className="form-textarea" value={location}
              onChange={e => setLocation(e.target.value)}
              rows={2} disabled={saving}
              placeholder="Provide the exact location…" />
          </div>
        </div>

        <div className="modal-footer-between">
          <button className="btn-secondary" onClick={onClose} disabled={saving}>Cancel</button>
          <button className="myr-btn-amber btn-primary" onClick={handleSave} disabled={saving}>
            {saving ? 'Saving…' : 'Save Changes'}
          </button>
        </div>
      </div>
    </div>
  );
};

// ─── Delete Confirm Modal ─────────────────────────────────────────────────────
const MRDeleteModal: React.FC<{
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  isDeleting: boolean;
}> = ({ isOpen, onClose, onConfirm, isDeleting }) => {
  if (!isOpen) return null;
  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="myr-modal myr-modal-xs" onClick={e => e.stopPropagation()}>
        <div className="myr-delete-header">
          <div className="modal-title" style={{ color: T.white }}>Confirm Delete</div>
          <button className="modal-close" onClick={onClose} disabled={isDeleting}>×</button>
        </div>
        <div className="myr-delete-body">
          <Icon type="fa" name="FaExclamationTriangle" size={40} color={T.red} />
          <p>This action <strong>cannot be undone</strong>. The report will be permanently removed.</p>
        </div>
        <div className="modal-footer-between">
          <button className="btn-secondary" onClick={onClose} disabled={isDeleting}>Cancel</button>
          <button className="btn-danger" onClick={onConfirm} disabled={isDeleting}>
            {isDeleting ? 'Deleting…' : 'Delete Report'}
          </button>
        </div>
      </div>
    </div>
  );
};

// ─── Report List Item (Horizontal Card Style) ─────────────────────────────────
const MRReportListItem: React.FC<{
  report: Report;
  onView: () => void;
  onEdit: (e: React.MouseEvent) => void;
  onDelete: (e: React.MouseEvent) => void;
  editable: boolean;
}> = ({ report, onView, onEdit, onDelete, editable }) => {
  const sc = statusColor(report.status_name);
  const emoji = animalEmoji(report.animal_type);

  return (
    <div className="myr-report-list-item" onClick={onView}>
      <div className="myr-list-left">
        <div className="myr-list-emoji">{emoji}</div>
        <div className="myr-list-info">
          <div className="myr-list-header">
            <span className="myr-list-id">#{report.report_id}</span>
            <span className="myr-list-animal">{report.animal_type || 'Unknown'}</span>
            <span className="myr-list-condition">{report.animal_condition}</span>
          </div>
          <div className="myr-list-location">
            <Icon type="fa" name="FaMapMarkerAlt" size={11} color={T.sage} />
            <span>{report.location_address}</span>
          </div>
          <div className="myr-list-desc">
            {report.description.length > 100
              ? `${report.description.slice(0, 100)}…`
              : report.description}
          </div>
          <div className="myr-list-meta">
            <span className="myr-list-date">
              <Icon type="fa" name="FaCalendarAlt" size={10} /> {fmtShort(report.submitted_at)}
            </span>
            <span className="myr-list-rel">{fmtRel(report.submitted_at)}</span>
            {report.volunteer_name && (
              <span className="myr-list-ranger">
                <Icon type="fa" name="FaUserShield" size={10} /> {report.volunteer_name}
              </span>
            )}
          </div>
        </div>
      </div>
      <div className="myr-list-right">
        <Pill bg={sc.bg} color={sc.color} dot={sc.dot}>{statusLabel(report.status_name)}</Pill>
        <div className="myr-list-actions" onClick={e => e.stopPropagation()}>
          <button className="myr-list-view" onClick={onView}>
            <Icon type="fa" name="FaEye" size={12} /> View
          </button>
          {editable && (
            <>
              <button className="myr-list-edit" onClick={onEdit}>
                <Icon type="fa" name="FaEdit" size={11} /> Edit
              </button>
              <button className="myr-list-delete" onClick={onDelete}>
                <Icon type="fa" name="FaTrash" size={11} />
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

// ─── Main Component ───────────────────────────────────────────────────────────
const MyReports: React.FC = () => {
  const [reports, setReports] = useState<Report[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedReport, setSelected] = useState<Report | null>(null);
  const [editingReport, setEditing] = useState<Report | null>(null);
  const [isDetailOpen, setDetailOpen] = useState(false);
  const [isEditOpen, setEditOpen] = useState(false);
  const [deleteTarget, setDeleteTarget] = useState<number | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);

  const [searchTerm, setSearch] = useState('');
  const [statusFilter, setStatus] = useState('all');
  const [animalFilter, setAnimal] = useState('all');
  const [dateFilter, setDate] = useState('all');
  const [currentPage, setPage] = useState(1);
  const [perPage, setPerPage] = useState(10);

  const { user: currentUser } = useAuth();

  useEffect(() => {
    if (!currentUser) return;
    (async () => {
      try {
        setLoading(true); setError(null);
        const token = getToken();
        const res = await fetch(`${process.env.REACT_APP_API_URL}/api/reports/my-reports`, {
          headers: { 'Authorization': `Bearer ${token}`, 'Content-Type': 'application/json' },
        });
        if (res.ok) {
          const data = await res.json();
          if (data.success) setReports(data.data || []);
          else setError(data.message || 'Failed to load reports');
        } else {
          setError('Failed to fetch reports: ' + res.statusText);
        }
      } catch { setError('Error loading reports. Please try again.'); }
      finally { setLoading(false); }
    })();
  }, [currentUser]);

  const animalTypes = useMemo(
    () => Array.from(new Set(reports.map(r => r.animal_type).filter(Boolean))).sort(),
    [reports]
  );
  const statuses = useMemo(
    () => Array.from(new Set(reports.map(r => r.status_name).filter((s): s is string => Boolean(s)))).sort(),
    [reports]
  );

  const filtered = useMemo(() => {
    const q = searchTerm.toLowerCase();
    return reports.filter(r => {
      const matchSearch = !searchTerm
        || r.description.toLowerCase().includes(q)
        || r.location_address.toLowerCase().includes(q)
        || r.animal_type.toLowerCase().includes(q)
        || r.animal_condition.toLowerCase().includes(q)
        || r.report_id.toString().includes(searchTerm);
      return (
        matchSearch
        && (statusFilter === 'all' || r.status_name === statusFilter)
        && (animalFilter === 'all' || r.animal_type === animalFilter)
        && (dateFilter === 'all' || isWithinDateRange(r.submitted_at, dateFilter))
      );
    });
  }, [reports, searchTerm, statusFilter, animalFilter, dateFilter]);

  useEffect(() => { setPage(1); }, [searchTerm, statusFilter, animalFilter, dateFilter, perPage]);

  const totalPages = Math.ceil(filtered.length / perPage);
  const paginated = filtered.slice((currentPage - 1) * perPage, currentPage * perPage);

  const handleSave = async (updated: Report) => {
    const token = getToken();
    const res = await fetch(`${process.env.REACT_APP_API_URL}/api/reports/${updated.report_id}`, {
      method: 'PATCH',
      headers: { 'Authorization': `Bearer ${token}`, 'Content-Type': 'application/json' },
      body: JSON.stringify({ description: updated.description, location_address: updated.location_address }),
    });
    const data = await res.json();
    if (!data.success) throw new Error(data.message || 'Failed to update');
    setReports(prev => prev.map(r => r.report_id === updated.report_id ? { ...r, ...updated } : r));
    if (selectedReport?.report_id === updated.report_id) setSelected(updated);
  };

  const handleDelete = async () => {
    if (!deleteTarget) return;
    setIsDeleting(true);
    try {
      const token = getToken();
      const res = await fetch(`${process.env.REACT_APP_API_URL}/api/reports/${deleteTarget}`, {
        method: 'DELETE',
        headers: { 'Authorization': `Bearer ${token}`, 'Content-Type': 'application/json' },
      });
      const data = await res.json();
      if (data.success) {
        setReports(prev => prev.filter(r => r.report_id !== deleteTarget));
        setDeleteTarget(null);
        setDetailOpen(false);
      } else alert(data.message || 'Failed to delete');
    } catch { alert('Error deleting report.'); }
    finally { setIsDeleting(false); }
  };

  const total = reports.length;
  const submitted = reports.filter(r => r.status_name?.toLowerCase() === 'submitted').length;
  const inProg = reports.filter(r => r.status_name?.toLowerCase().includes('progress')).length;
  const done = reports.filter(r => r.status_name?.toLowerCase() === 'completed').length;

  if (!currentUser) return (
    <div className="myr-container">
      <div className="access-denied">
        <Icon type="fa" name="FaLock" size={48} />
        <h2>Access Denied</h2>
        <p>Please log in to view your reports.</p>
        <Link to="/login" className="login-link">Go to Login</Link>
      </div>
    </div>
  );

  return (
    <div className="myr-container">

      {/* ── Header ───────────────────────────────────────────────────────── */}
      <div className="myr-page-header">
        <div>
          <div className="welcome-badge">My Reports</div>
          <h1 className="myr-page-title">Your Rescue Reports</h1>
          <p className="myr-page-sub">Track every animal rescue you have submitted</p>
        </div>
        <Link to="/create-report" className="btn-primary myr-new-btn">
          <Icon type="fa" name="FaPlus" size={13} /> New Report
        </Link>
      </div>

      {/* ── Stats ────────────────────────────────────────────────────────── */}
      <div className="myr-stats-row">
        {([
          { label: 'Total Reports', value: total, grad: `linear-gradient(135deg, ${T.forest}, ${T.greenLt})` },
          { label: 'Submitted', value: submitted, grad: `linear-gradient(135deg, ${T.blue}, #0d47a1)` },
          { label: 'In Progress', value: inProg, grad: `linear-gradient(135deg, ${T.amber}, #b8560e)` },
          { label: 'Completed', value: done, grad: `linear-gradient(135deg, ${T.sage}, #5a8a4a)` },
        ] as { label: string; value: number; grad: string }[]).map(s => (
          <div key={s.label} className="mini-stat myr-stat-tile" style={{ background: s.grad }}>
            <div>
              <div className="mini-stat-label">{s.label}</div>
              <div className="mini-stat-value">{loading ? '…' : s.value}</div>
            </div>
          </div>
        ))}
      </div>

      {/* ── Filters ──────────────────────────────────────────────────────── */}
      <div className="myr-filter-card">
        <div className="myr-search-wrap">
          <span className="myr-search-icon">
            <Icon type="fa" name="FaSearch" size={14} color={T.textSoft} />
          </span>
          <input
            type="text"
            className="myr-search-input"
            placeholder="Search by ID, description, location, animal…"
            value={searchTerm}
            onChange={e => setSearch(e.target.value)}
          />
          {searchTerm && (
            <button className="myr-clear-btn" onClick={() => setSearch('')}>
              <Icon type="fa" name="FaTimes" size={12} />
            </button>
          )}
        </div>

        <div className="myr-filters-row">
          {([
            { label: 'Status', value: statusFilter, setter: setStatus,
              opts: [['all', 'All Statuses'], ...statuses.map(s => [s, statusLabel(s)])] },
            { label: 'Animal', value: animalFilter, setter: setAnimal,
              opts: [['all', 'All Animals'], ...animalTypes.map(a => [a, a])] },
            { label: 'Date Range', value: dateFilter, setter: setDate,
              opts: [['all', 'All Time'], ['today', 'Today'], ['week', 'Last 7 Days'], ['month', 'Last 30 Days'], ['3months', 'Last 3 Months'], ['6months', 'Last 6 Months']] },
            { label: 'Per Page', value: String(perPage), setter: (v: string) => setPerPage(Number(v)),
              opts: [['10', '10'], ['15', '15'], ['20', '20'], ['30', '30']] },
          ] as { label: string; value: string; setter: (v: string) => void; opts: string[][] }[]).map(f => (
            <div key={f.label} className="myr-filter-group">
              <label className="myr-filter-label">{f.label}</label>
              <select className="form-select" value={f.value}
                onChange={e => f.setter(e.target.value)}>
                {f.opts.map(([val, lbl]) => <option key={val} value={val}>{lbl}</option>)}
              </select>
            </div>
          ))}
        </div>

        <div className="myr-results-summary">
          {filtered.length === 0 ? '0' : `${(currentPage - 1) * perPage + 1}–${Math.min(currentPage * perPage, filtered.length)}`}
          {' '}of {filtered.length} reports
          {searchTerm && <> matching <em>"{searchTerm}"</em></>}
        </div>
      </div>

      {/* ── Content ──────────────────────────────────────────────────────── */}
      {loading ? (
        <div className="loading-state">
          <div className="loading-spinner" />
          Loading your reports…
        </div>
      ) : error ? (
        <div className="myr-error-state">
          <Icon type="fa" name="FaExclamationTriangle" size={44} color={T.amber} />
          <h3>Unable to Load Reports</h3>
          <p>{error}</p>
          <button className="btn-primary" onClick={() => window.location.reload()}>Try Again</button>
        </div>
      ) : filtered.length > 0 ? (
        <>
          <div className="myr-list-container">
            {paginated.map(r => (
              <MRReportListItem
                key={r.report_id}
                report={r}
                editable={r.status_id === 1}
                onView={() => { setSelected(r); setDetailOpen(true); }}
                onEdit={e => { e.stopPropagation(); setEditing(r); setEditOpen(true); }}
                onDelete={e => { e.stopPropagation(); setDeleteTarget(r.report_id); }}
              />
            ))}
          </div>

          {totalPages > 1 && (
            <div className="myr-pagination">
              <button className="myr-page-btn" onClick={() => setPage(p => p - 1)}
                disabled={currentPage === 1}>
                <Icon type="fa" name="FaChevronLeft" size={11} /> Prev
              </button>
              <div className="myr-page-numbers">
                {Array.from({ length: totalPages }, (_, i) => i + 1).map(p => {
                  if (p === 1 || p === totalPages || (p >= currentPage - 1 && p <= currentPage + 1)) {
                    return (
                      <button key={p}
                        className={`myr-page-num ${currentPage === p ? 'active' : ''}`}
                        onClick={() => setPage(p)}>
                        {p}
                      </button>
                    );
                  }
                  if (p === currentPage - 2 || p === currentPage + 2)
                    return <span key={p} className="myr-dots">…</span>;
                  return null;
                })}
              </div>
              <button className="myr-page-btn" onClick={() => setPage(p => p + 1)}
                disabled={currentPage === totalPages}>
                Next <Icon type="fa" name="FaChevronRight" size={11} />
              </button>
              <span className="myr-page-info">Page {currentPage} of {totalPages}</span>
            </div>
          )}
        </>
      ) : (
        <div className="myr-empty-state">
          <span style={{ fontSize: 72 }}>🐾</span>
          <h3>No Reports Found</h3>
          <p>
            {searchTerm || statusFilter !== 'all' || animalFilter !== 'all' || dateFilter !== 'all'
              ? 'No reports match your filters. Try adjusting your search.'
              : "You haven't submitted any reports yet. Start by creating your first report!"}
          </p>
          {(searchTerm || statusFilter !== 'all' || animalFilter !== 'all' || dateFilter !== 'all') ? (
            <button className="btn-primary"
              onClick={() => { setSearch(''); setStatus('all'); setAnimal('all'); setDate('all'); }}>
              Clear All Filters
            </button>
          ) : (
            <Link to="/create-report" className="btn-primary">Submit Your First Report</Link>
          )}
        </div>
      )}

      {/* ── Modals ───────────────────────────────────────────────────────── */}
      <MRDetailModal
        report={selectedReport}
        isOpen={isDetailOpen}
        onClose={() => { setDetailOpen(false); setSelected(null); }}
      />
      <MREditModal
        report={editingReport}
        isOpen={isEditOpen}
        onClose={() => { setEditOpen(false); setEditing(null); }}
        onSave={handleSave}
      />
      <MRDeleteModal
        isOpen={deleteTarget !== null}
        onClose={() => setDeleteTarget(null)}
        onConfirm={handleDelete}
        isDeleting={isDeleting}
      />
    </div>
  );
};

export default MyReports;


