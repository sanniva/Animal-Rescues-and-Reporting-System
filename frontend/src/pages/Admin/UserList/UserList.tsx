import React, { useEffect, useState, useCallback } from 'react';
import './UserList.css';
import { toast } from 'react-toastify';
import Icon from '../../../components/Icon';

interface User {
  id: number;
  user_id: number;
  username: string;
  email: string;
  phone?: string;
  bio?: string;
  role: string;
  role_id?: number;
  approval_status?: 'pending' | 'approved' | 'rejected' | string;
  volunteer_status?: 'pending' | 'approved' | 'rejected' | string;
  badges?: string[];
  badge_count?: number;
  joined_at?: string;
  created_at?: string;
  profile_image_url?: string;
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

const UserAvatar: React.FC<{ user: User; size?: 'sm' | 'md' | 'lg'; statusClass?: string }> = ({
  user, size = 'md', statusClass = ''
}) => {
  const [imgError, setImgError] = useState(false);
  const resolveUrl = (url: string) => {
    if (!url) return '';
    if (url.startsWith('http')) return url;
    return `${process.env.REACT_APP_API_URL}${url.startsWith('/') ? url : `/${url}`}`;
  };
  const imageUrl = user.profile_image_url ? resolveUrl(user.profile_image_url) : null;
  return (
    <div className={`avatar ${size} ${statusClass}`} data-role={user.role}>
      {imageUrl && !imgError
        ? <img src={imageUrl} alt={user.username} onError={() => setImgError(true)} />
        : <span>{user.username.charAt(0).toUpperCase()}</span>
      }
    </div>
  );
};

const UserList: React.FC = () => {
  const [users, setUsers]               = useState<User[]>([]);
  const [activeTab, setActiveTab]       = useState<'volunteers' | 'users'>('volunteers');
  const [loading, setLoading]           = useState(true);
  const [searchTerm, setSearchTerm]     = useState('');
  const [confirmModal, setConfirmModal] = useState<ConfirmModal>(CONFIRM_CLOSED);
  const [taskErrorModal, setTaskErrorModal] = useState<{
    show: boolean;
    message: string;
    tasks: { task_id: number; report_id: number; description: string; status_name: string }[];
  }>({ show: false, message: '', tasks: [] });

  const showConfirm = (
    title: string, message: string, onConfirm: () => void,
    confirmText = 'Confirm', confirmColor = '#c62828'
  ) => setConfirmModal({ show: true, title, message, confirmText, confirmColor, onConfirm });

  const fetchUsers = useCallback(async () => {
    try {
      const token = sessionStorage.getItem('token') || localStorage.getItem('token');
      if (!token) { setLoading(false); return; }
      const res = await fetch(`${process.env.REACT_APP_API_URL}/api/users`, {
        headers: { Authorization: `Bearer ${token}`, 'Content-Type': 'application/json' },
      });
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      const data = await res.json();

      const mapped: User[] = data.map((u: any) => {
        let role = 'user';
        if (u.role_id === 2 || u.role === 'volunteer' || u.role_name === 'volunteer') role = 'volunteer';
        else if (u.role_id === 3 || u.role === 'admin' || u.role_name === 'admin') role = 'admin';

        let status: string | undefined;
        if (u.volunteer?.status)             status = u.volunteer.status.toLowerCase();
        else if (u.volunteer_status)         status = u.volunteer_status.toLowerCase();
        else if (u.approval_status_id === 1) status = 'pending';
        else if (u.approval_status_id === 2) status = 'approved';
        else if (u.approval_status_id === 3) status = 'rejected';
        else if (role === 'volunteer')       status = 'pending';

        let badges: string[] = [];
        if (u.badges_string) badges = u.badges_string.split('||').filter((b: string) => b.trim() !== '');
        else if (u.badges && Array.isArray(u.badges)) badges = u.badges;
        else if (u.volunteer?.badges) {
          badges = Array.isArray(u.volunteer.badges) ? u.volunteer.badges
            : (typeof u.volunteer.badges === 'string' ? JSON.parse(u.volunteer.badges) : []);
        }

        return {
          id: u.user_id || u.id, user_id: u.user_id || u.id,
          username: u.username || 'Unknown', email: u.email || 'No email',
          phone: u.phone, bio: u.bio, role, role_id: u.role_id,
          approval_status: status, volunteer_status: status,
          badges, badge_count: u.badge_count || badges.length || 0,
          joined_at: u.volunteer?.volunteer_since || u.joined_at || u.created_at,
          created_at: u.created_at, profile_image_url: u.profile_image_url,
        };
      });

      setUsers(mapped);
    } catch (err: any) {
      toast.error(`Failed to fetch users: ${err.message}`);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => { fetchUsers(); }, [fetchUsers]);

  const approveVolunteer = async (userId: number) => {
    try {
      const token = sessionStorage.getItem('token') || localStorage.getItem('token');
      const res = await fetch(`${process.env.REACT_APP_API_URL}/api/users/${userId}/approve`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
      });
      const data = await res.json();
      if (!res.ok) { toast.error(data.message || 'Failed to approve volunteer'); return; }
      toast.success('Volunteer approved!');
      setUsers(prev => prev.map(u =>
        (u.user_id === userId || u.id === userId)
          ? { ...u, approval_status: 'approved', volunteer_status: 'approved' } : u
      ));
    } catch (e: any) { toast.error(e.message); }
  };

  const rejectVolunteer = async (userId: number) => {
    try {
      const token = sessionStorage.getItem('token') || localStorage.getItem('token');
      const res = await fetch(`${process.env.REACT_APP_API_URL}/api/users/${userId}/reject`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
      });
      const data = await res.json();

      if (res.status === 409) {
        setTaskErrorModal({
          show: true,
          message: data.message || 'This volunteer has active tasks that must be reassigned first.',
          tasks: data.active_tasks || [],
        });
        return;
      }

      if (!res.ok) { toast.error(data.message || 'Failed to reject volunteer'); return; }

      toast.success('Volunteer rejected');
      setUsers(prev => prev.map(u =>
        (u.user_id === userId || u.id === userId)
          ? { ...u, approval_status: 'rejected', volunteer_status: 'rejected' } : u
      ));
    } catch (e: any) { toast.error(e.message); }
  };

  const deleteUser = async (id: number) => {
    try {
      const token = sessionStorage.getItem('token') || localStorage.getItem('token');
      const res = await fetch(`${process.env.REACT_APP_API_URL}/api/users/${id}`, {
        method: 'DELETE',
        headers: { Authorization: `Bearer ${token}`, 'Content-Type': 'application/json' },
      });
      const data = await res.json();
      if (!res.ok) { toast.error(data.message || 'Delete failed'); return; }
      toast.success('User deleted!');
      fetchUsers();
    } catch (e: any) { toast.error(e.message); }
  };

  const exportCSV = () => {
    const headers = ['ID', 'Username', 'Email', 'Role', 'Status', 'Phone', 'Joined Date', 'Badges Count'];
    const rows = users.map(u => [u.id, u.username, u.email, u.role, u.approval_status || '', u.phone || '', u.joined_at || '', u.badges?.length || 0]);
    const csv = [headers, ...rows].map(r => r.join(',')).join('\n');
    const a = document.createElement('a');
    a.href = URL.createObjectURL(new Blob([csv], { type: 'text/csv' }));
    a.download = `users_${new Date().toISOString().split('T')[0]}.csv`;
    a.click();
  };

  const filtered    = users.filter(u =>
    u.username.toLowerCase().includes(searchTerm.toLowerCase()) ||
    u.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    (u.phone && u.phone.includes(searchTerm))
  );
  const allVols      = filtered.filter(u => u.role === 'volunteer');
  const pendingVols  = allVols.filter(v => v.approval_status === 'pending'  || v.volunteer_status === 'pending');
  const activeVols   = allVols.filter(v => v.approval_status === 'approved' || v.volunteer_status === 'approved');
  const rejectedVols = allVols.filter(v => v.approval_status === 'rejected' || v.volunteer_status === 'rejected');
  const allVolsRaw   = users.filter(u => u.role === 'volunteer');
  const pendingCount  = allVolsRaw.filter(v => v.approval_status === 'pending'  || v.volunteer_status === 'pending').length;
  const activeCount   = allVolsRaw.filter(v => v.approval_status === 'approved' || v.volunteer_status === 'approved').length;
  const rejectedCount = allVolsRaw.filter(v => v.approval_status === 'rejected' || v.volunteer_status === 'rejected').length;
  const fmtDate = (d?: string) => d ? new Date(d).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }) : 'N/A';

  if (loading) return <div className="page-loading"><div className="spinner"></div><p>Loading people…</p></div>;

  return (
    <div className="ul-page">

      {/* Confirm Modal */}
      {confirmModal.show && (
        <div className="modal-backdrop">
          <div className="confirm-modal">
            <div className="confirm-icon"><Icon type="fa" name="FaExclamationTriangle" size={32} color="#e07a20" /></div>
            <h3 className="confirm-title">{confirmModal.title}</h3>
            <p className="confirm-message">{confirmModal.message}</p>
            <div className="confirm-actions">
              <button className="btn-cancel" onClick={() => setConfirmModal(CONFIRM_CLOSED)}>Cancel</button>
              <button className="btn-confirm" style={{ background: confirmModal.confirmColor }}
                onClick={() => { confirmModal.onConfirm(); setConfirmModal(CONFIRM_CLOSED); }}>
                {confirmModal.confirmText}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Active Tasks Error Modal */}
      {taskErrorModal.show && (
        <div className="modal-backdrop">
          <div className="confirm-modal">
            <div className="confirm-icon"><Icon type="fa" name="FaExclamationTriangle" size={32} color="#c62828" /></div>
            <h3 className="confirm-title">Cannot Remove Volunteer</h3>
            <p className="confirm-message">{taskErrorModal.message}</p>
            {taskErrorModal.tasks.length > 0 && (
              <div style={{ width: '100%', marginTop: 12 }}>
                <p style={{ fontSize: 13, fontWeight: 600, marginBottom: 6, color: '#5c6b5c' }}>
                  Active tasks that need reassignment:
                </p>
                <ul style={{ listStyle: 'none', padding: 0, margin: 0, maxHeight: 160, overflowY: 'auto', border: '1px solid #e0e8d8', borderRadius: 8 }}>
                  {taskErrorModal.tasks.map(t => (
                    <li key={t.task_id} style={{ padding: '8px 12px', fontSize: 13, borderBottom: '1px solid #f0f4ec', display: 'flex', gap: 8, alignItems: 'flex-start' }}>
                      <Icon type="fa" name="FaTasks" size={12} color="#e07a20" />
                      <span style={{ color: '#3a4d3a' }}>
                        <strong>Task #{t.task_id}</strong> ({t.status_name}) — {t.description || 'No description'}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            )}
            <div className="confirm-actions" style={{ marginTop: 16 }}>
              <button className="btn-confirm" style={{ background: '#2D5A27' }}
                onClick={() => setTaskErrorModal({ show: false, message: '', tasks: [] })}>
                Got it
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Page Header */}
      <div className="page-header">
        <div className="page-header-left">
          <div className="page-eyebrow"><Icon type="fa" name="FaShieldAlt" size={14} color="#7aaa6a" /> Admin Portal</div>
          <h1 className="page-title">People Management</h1>
          <p className="page-subtitle">Manage your ranger squad and user base</p>
        </div>
        <button className="export-btn" onClick={exportCSV}><Icon type="fa" name="FaDownload" size={14} /> Export CSV</button>
      </div>

      {/* Stats */}
      <div className="stats-row">
        <div className="stat-card total">
          <div className="stat-icon-wrap"><Icon type="fa" name="FaUsers" size={22} color="#1e3f1a" /></div>
          <div className="stat-body"><div className="stat-num">{users.length}</div><div className="stat-lbl">Total Users</div></div>
        </div>
        <div className="stat-card pending">
          <div className="stat-icon-wrap"><Icon type="fa" name="FaClock" size={22} color="#e07a20" /></div>
          <div className="stat-body"><div className="stat-num">{pendingCount}</div><div className="stat-lbl">Pending</div></div>
        </div>
        <div className="stat-card approved">
          <div className="stat-icon-wrap"><Icon type="fa" name="FaCheckCircle" size={22} color="#2D5A27" /></div>
          <div className="stat-body"><div className="stat-num">{activeCount}</div><div className="stat-lbl">Active Rangers</div></div>
        </div>
        <div className="stat-card rejected">
          <div className="stat-icon-wrap"><Icon type="fa" name="FaTimesCircle" size={22} color="#c62828" /></div>
          <div className="stat-body"><div className="stat-num">{rejectedCount}</div><div className="stat-lbl">Rejected</div></div>
        </div>
      </div>

      {/* Search */}
      <div className="search-wrap">
        <div className="search-inner">
          <Icon type="fa" name="FaSearch" size={16} color="#8a9e8a" />
          <input type="text" placeholder="Search by name, email or phone…" value={searchTerm}
            onChange={e => setSearchTerm(e.target.value)} className="search-input" />
          {searchTerm && (
            <button className="search-clear" onClick={() => setSearchTerm('')}>
              <Icon type="fa" name="FaTimes" size={12} color="#8a9e8a" />
            </button>
          )}
        </div>
      </div>

      {/* Tabs */}
      <div className="tabs-row">
        <button className={`tab-btn ${activeTab === 'volunteers' ? 'active' : ''}`} onClick={() => setActiveTab('volunteers')}>
          <Icon type="fa" name="FaUserShield" size={15} /> Ranger Squad <span className="tab-count">{allVols.length}</span>
        </button>
        <button className={`tab-btn ${activeTab === 'users' ? 'active' : ''}`} onClick={() => setActiveTab('users')}>
          <Icon type="fa" name="FaUsers" size={15} /> User Directory <span className="tab-count">{filtered.length}</span>
        </button>
      </div>

      {/* Volunteer Tab */}
      {activeTab === 'volunteers' && (
        <div className="tab-content">

          {pendingVols.length > 0 && (
            <div className="section-block">
              <div className="section-head">
                <span className="section-dot pending"></span>
                <h3>Pending Approvals</h3>
                <span className="section-badge pending">{pendingVols.length}</span>
              </div>
              <div className="vol-list">
                {pendingVols.map(v => (
                  <div key={v.id} className="vol-card pending-card">
                    <div className="vol-left">
                      <UserAvatar user={v} size="md" statusClass="pending" />
                      <div className="vol-info">
                        <div className="vol-name-row">
                          <strong className="vol-name">{v.username}</strong>
                          <span className="vol-id">#{v.user_id || v.id}</span>
                          <span className="status-pill pending">Pending</span>
                        </div>
                        <div className="vol-details">
                          <span className="detail-item"><Icon type="fa" name="FaEnvelope" size={12} color="#8a9e8a" />{v.email}</span>
                          {v.phone && <span className="detail-item"><Icon type="fa" name="FaPhone" size={12} color="#8a9e8a" />{v.phone}</span>}
                          <span className="detail-item"><Icon type="fa" name="FaCalendarAlt" size={12} color="#8a9e8a" />Applied {fmtDate(v.joined_at || v.created_at)}</span>
                        </div>
                        {v.bio && <div className="vol-bio">"{v.bio}"</div>}
                      </div>
                    </div>
                    <div className="vol-actions">
                      <button className="action-btn reject" onClick={() => showConfirm('Reject Volunteer', `Reject ${v.username}'s application?`, () => rejectVolunteer(v.user_id || v.id), 'Reject', '#c62828')}>
                        <Icon type="fa" name="FaTimes" size={13} /> Reject
                      </button>
                      <button className="action-btn approve" onClick={() => showConfirm('Approve Volunteer', `Approve ${v.username} as a ranger?`, () => approveVolunteer(v.user_id || v.id), 'Approve', '#2D5A27')}>
                        <Icon type="fa" name="FaCheck" size={13} /> Approve
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeVols.length > 0 && (
            <div className="section-block">
              <div className="section-head">
                <span className="section-dot active"></span>
                <h3>Active Rangers</h3>
                <span className="section-badge active">{activeVols.length}</span>
              </div>
              <div className="vol-list">
                {activeVols.map(v => (
                  <div key={v.id} className="vol-card active-card">
                    <div className="vol-left">
                      <UserAvatar user={v} size="md" statusClass="active" />
                      <div className="vol-info">
                        <div className="vol-name-row">
                          <strong className="vol-name">{v.username}</strong>
                          <span className="vol-id">#{v.user_id || v.id}</span>
                          <span className="status-pill active">Active</span>
                        </div>
                        <div className="vol-details">
                          <span className="detail-item"><Icon type="fa" name="FaEnvelope" size={12} color="#8a9e8a" />{v.email}</span>
                          {v.phone && <span className="detail-item"><Icon type="fa" name="FaPhone" size={12} color="#8a9e8a" />{v.phone}</span>}
                          <span className="detail-item"><Icon type="fa" name="FaCalendarAlt" size={12} color="#8a9e8a" />Joined {fmtDate(v.joined_at || v.created_at)}</span>
                        </div>
                        <div className="badges-row">
                          {v.badges && v.badges.length > 0 ? (
                            <>
                              <Icon type="fa" name="FaMedal" size={12} color="#e07a20" />
                              <div className="badge-stack">
                                {v.badges.slice(0, 4).map((badge, i) => <span key={i} className="badge-chip" title={badge}>🏅</span>)}
                                {v.badges.length > 4 && <span className="badge-more">+{v.badges.length - 4}</span>}
                              </div>
                            </>
                          ) : (
                            <span className="no-badges"><Icon type="fa" name="FaMedal" size={12} color="#c8d4c0" /> No badges yet</span>
                          )}
                        </div>
                      </div>
                    </div>
                    <div className="vol-actions">
                      <button className="action-btn remove" onClick={() => showConfirm('Remove Ranger', `Remove ${v.username} from the ranger squad?`, () => rejectVolunteer(v.user_id || v.id), 'Remove', '#e07a20')}>
                        <Icon type="fa" name="FaUserMinus" size={13} /> Remove
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {rejectedVols.length > 0 && (
            <div className="section-block">
              <div className="section-head">
                <span className="section-dot rejected"></span>
                <h3>Rejected Applications</h3>
                <span className="section-badge rejected">{rejectedVols.length}</span>
              </div>
              <div className="vol-list">
                {rejectedVols.map(v => (
                  <div key={v.id} className="vol-card rejected-card">
                    <div className="vol-left">
                      <UserAvatar user={v} size="md" statusClass="rejected" />
                      <div className="vol-info">
                        <div className="vol-name-row">
                          <strong className="vol-name">{v.username}</strong>
                          <span className="vol-id">#{v.user_id || v.id}</span>
                          <span className="status-pill rejected">Rejected</span>
                        </div>
                        <div className="vol-details">
                          <span className="detail-item"><Icon type="fa" name="FaEnvelope" size={12} color="#8a9e8a" />{v.email}</span>
                          <span className="detail-item"><Icon type="fa" name="FaCalendarAlt" size={12} color="#8a9e8a" />Applied {fmtDate(v.joined_at || v.created_at)}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {allVols.length === 0 && (
            <div className="empty-state">
              <Icon type="fa" name="FaUsers" size={48} color="#c8d4c0" />
              <h4>No Volunteers Found</h4>
              <p>No volunteers match your search.</p>
            </div>
          )}
        </div>
      )}

      {/* Users Tab */}
      {activeTab === 'users' && (
        <div className="tab-content">
          <div className="section-block">
            <div className="section-head">
              <span className="section-dot neutral"></span>
              <h3>User Directory</h3>
              <span className="section-badge neutral">{filtered.length}</span>
            </div>
            <div className="user-table">
              <div className="user-table-head">
                <span>User</span><span>Email</span><span>Phone</span>
                <span>Joined</span><span>Role</span><span>Status</span><span></span>
              </div>
              {filtered.map(u => (
                <div key={u.id} className="user-row">
                  <div className="user-col identity">
                    <UserAvatar user={u} size="sm" />
                    <div><div className="user-name">{u.username}</div><div className="user-uid">#{u.id}</div></div>
                  </div>
                  <div className="user-col">
                    <span className="user-email"><Icon type="fa" name="FaEnvelope" size={12} color="#1565c0" />{u.email}</span>
                  </div>
                  <div className="user-col">
                    {u.phone ? <span className="user-phone"><Icon type="fa" name="FaPhone" size={12} color="#5c6b5c" />{u.phone}</span> : <span className="user-na">—</span>}
                  </div>
                  <div className="user-col">
                    <span className="user-date"><Icon type="fa" name="FaCalendarAlt" size={12} color="#8a9e8a" />{fmtDate(u.created_at)}</span>
                  </div>
                  <div className="user-col"><span className={`role-chip ${u.role}`}>{u.role}</span></div>
                  <div className="user-col">
                    {u.role === 'volunteer' && u.approval_status
                      ? <span className={`status-pill ${u.approval_status}`}>{u.approval_status.toUpperCase()}</span>
                      : <span className="user-na">—</span>}
                  </div>
                  <div className="user-col action-col">
                    {u.role !== 'admin' && (
                      <button className="delete-btn" title="Delete user"
                        onClick={() => showConfirm('Delete User', `Delete ${u.username}? This cannot be undone.`, () => deleteUser(u.id), 'Delete', '#c62828')}>
                        <Icon type="fa" name="FaTrash" size={13} />
                      </button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
          {filtered.length === 0 && (
            <div className="empty-state">
              <Icon type="fa" name="FaUser" size={48} color="#c8d4c0" />
              <h4>No Users Found</h4>
              <p>No users match your search.</p>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default UserList;