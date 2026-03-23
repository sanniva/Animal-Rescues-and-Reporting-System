import React, { useEffect, useState, useCallback } from 'react';
import './UserList.css';
import { toast } from 'react-toastify';

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

// ── Avatar component: shows profile image or initial fallback ──
const UserAvatar: React.FC<{
  user: User;
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}> = ({ user, size = 'md', className = '' }) => {
  const [imgError, setImgError] = useState(false);

  const resolveUrl = (url: string): string => {
    if (!url) return '';
    if (url.startsWith('http')) return url;
    const clean = url.startsWith('/') ? url : `/${url}`;
    return `http://localhost:5000${clean}`;
  };

  const imageUrl = user.profile_image_url ? resolveUrl(user.profile_image_url) : null;

  if (imageUrl && !imgError) {
    return (
      <div className={`avatar-wrapper ${size} ${className}`} data-role={user.role}>
        <img
          src={imageUrl}
          alt={user.username}
          className="avatar-img"
          onError={() => setImgError(true)}
        />
      </div>
    );
  }

  return (
    <div className={`avatar-wrapper ${size} ${className}`} data-role={user.role}>
      <span className="avatar-initial">{user.username.charAt(0).toUpperCase()}</span>
    </div>
  );
};

const UserList: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [activeTab, setActiveTab] = useState<'volunteers' | 'users'>('volunteers');
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [confirmModal, setConfirmModal] = useState<ConfirmModal>(CONFIRM_CLOSED);

  const showConfirm = (
    title: string,
    message: string,
    onConfirm: () => void,
    confirmText = 'Confirm',
    confirmColor = '#c62828'
  ) => {
    setConfirmModal({ show: true, title, message, confirmText, confirmColor, onConfirm });
  };

  const fetchUsers = useCallback(async () => {
    try {
      const token = sessionStorage.getItem('token') || localStorage.getItem('token');
      if (!token) { setLoading(false); return; }

      const res = await fetch('http://localhost:5000/api/users', {
        headers: { Authorization: `Bearer ${token}`, 'Content-Type': 'application/json' },
      });

      if (!res.ok) throw new Error(`Failed to fetch users (${res.status})`);

      const data = await res.json();

      const mappedUsers: User[] = data.map((u: any) => {
        let role = 'user';
        if (u.role_id === 2 || u.role === 'volunteer' || u.role_name === 'volunteer') role = 'volunteer';
        else if (u.role_id === 3 || u.role === 'admin' || u.role_name === 'admin') role = 'admin';

        let status: string | undefined;
        if (u.volunteer?.status) status = u.volunteer.status.toLowerCase();
        else if (u.volunteer_status) status = u.volunteer_status.toLowerCase();
        else if (u.status_name) status = u.status_name.toLowerCase();
        else if (u.approval_status_id === 1) status = 'pending';
        else if (u.approval_status_id === 2) status = 'approved';
        else if (u.approval_status_id === 3) status = 'rejected';
        else if (role === 'volunteer') status = 'pending';

        let badges: string[] = [];
        if (u.badges_string) badges = u.badges_string.split('||').filter((b: string) => b.trim() !== '');
        else if (u.badges && Array.isArray(u.badges)) badges = u.badges;
        else if (u.volunteer?.badges) {
          badges = Array.isArray(u.volunteer.badges)
            ? u.volunteer.badges
            : (typeof u.volunteer.badges === 'string' ? JSON.parse(u.volunteer.badges) : []);
        }

        return {
          id: u.user_id || u.id,
          user_id: u.user_id || u.id,
          username: u.username || 'Unknown',
          email: u.email || 'No email',
          phone: u.phone, bio: u.bio, role,
          role_id: u.role_id,
          approval_status: status,
          volunteer_status: status,
          badges, badge_count: u.badge_count || badges.length || 0,
          joined_at: u.volunteer?.volunteer_since || u.joined_at || u.created_at,
          created_at: u.created_at,
          profile_image_url: u.profile_image_url,
        };
      });

      setUsers(mappedUsers);
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
      if (!token) { toast.error('Please login first'); return; }

      const response = await fetch(`http://localhost:5000/api/users/${userId}/approve`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
      });

      if (response.ok) {
        toast.success('Volunteer approved successfully!');
        setUsers(prev => prev.map(u =>
          (u.user_id === userId || u.id === userId)
            ? { ...u, approval_status: 'approved', volunteer_status: 'approved' }
            : u
        ));
      } else {
        toast.error('Failed to approve volunteer');
      }
    } catch (error: any) {
      toast.error(`Failed to approve volunteer: ${error.message}`);
    }
  };

  const rejectVolunteer = async (userId: number) => {
    try {
      const token = sessionStorage.getItem('token') || localStorage.getItem('token');
      if (!token) { toast.error('Please login first'); return; }

      const response = await fetch(`http://localhost:5000/api/users/${userId}/reject`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
      });

      if (response.ok) {
        toast.success('Volunteer rejected');
        setUsers(prev => prev.map(u =>
          (u.user_id === userId || u.id === userId)
            ? { ...u, approval_status: 'rejected', volunteer_status: 'rejected' }
            : u
        ));
      } else {
        toast.error('Failed to reject volunteer');
      }
    } catch (error: any) {
      toast.error(`Failed to reject volunteer: ${error.message}`);
    }
  };

  const deleteUser = async (id: number) => {
    try {
      const token = sessionStorage.getItem('token') || localStorage.getItem('token');
      const res = await fetch(`http://localhost:5000/api/users/${id}`, {
        method: 'DELETE',
        headers: { Authorization: `Bearer ${token}`, 'Content-Type': 'application/json' },
      });
      if (res.ok) { toast.success('User deleted successfully!'); fetchUsers(); }
      else throw new Error('Delete failed');
    } catch (err: any) {
      toast.error(`Failed to delete user: ${err.message}`);
    }
  };

  const exportCSV = () => {
    const headers = ['ID', 'Username', 'Email', 'Role', 'Status', 'Phone', 'Joined Date', 'Badges Count'];
    const data = users.map(u => [
      u.id, u.username, u.email, u.role,
      u.approval_status || u.volunteer_status || '',
      u.phone || '', u.joined_at || '', u.badges?.length || 0,
    ]);
    const csv = [headers, ...data].map(r => r.join(',')).join('\n');
    const blob = new Blob([csv], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `users_${new Date().toISOString().split('T')[0]}.csv`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const filteredUsers = users.filter(u =>
    u.username.toLowerCase().includes(searchTerm.toLowerCase()) ||
    u.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    (u.phone && u.phone.includes(searchTerm))
  );

  const allVolunteersFiltered      = filteredUsers.filter(u => u.role === 'volunteer');
  const pendingVolunteersFiltered  = allVolunteersFiltered.filter(v => v.approval_status === 'pending' || v.volunteer_status === 'pending');
  const activeVolunteersFiltered   = allVolunteersFiltered.filter(v => v.approval_status === 'approved' || v.volunteer_status === 'approved');
  const rejectedVolunteersFiltered = allVolunteersFiltered.filter(v => v.approval_status === 'rejected' || v.volunteer_status === 'rejected');

  const allVolunteersUnfiltered      = users.filter(u => u.role === 'volunteer');
  const pendingVolunteersUnfiltered  = allVolunteersUnfiltered.filter(v => v.approval_status === 'pending' || v.volunteer_status === 'pending');
  const activeVolunteersUnfiltered   = allVolunteersUnfiltered.filter(v => v.approval_status === 'approved' || v.volunteer_status === 'approved');
  const rejectedVolunteersUnfiltered = allVolunteersUnfiltered.filter(v => v.approval_status === 'rejected' || v.volunteer_status === 'rejected');

  const getFormattedStatus = (status: string | undefined) => status ? status.toUpperCase() : '';

  if (loading) {
    return (
      <div className="loading-container">
        <div className="loading-spinner"></div>
        <p>Loading users...</p>
      </div>
    );
  }

  return (
    <div className="container">

      {/* ── Custom Confirm Modal ── */}
      {confirmModal.show && (
        <div style={{
          position: 'fixed', top: 0, left: 0, right: 0, bottom: 0,
          background: 'rgba(0,0,0,0.45)', zIndex: 99999,
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          backdropFilter: 'blur(3px)'
        }}>
          <div style={{
            background: 'white', borderRadius: '20px',
            padding: '36px 32px', maxWidth: '420px', width: '90%',
            boxShadow: '0 25px 50px rgba(0,0,0,0.2)',
            border: '1px solid #e8dfc9', textAlign: 'center',
            animation: 'fadeIn 0.15s ease'
          }}>
            {/* Warning icon — SVG instead of emoji */}
            <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '14px' }}>
              <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="#FF9F1C" strokeWidth="1.8">
                <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"/>
                <line x1="12" y1="9" x2="12" y2="13"/>
                <line x1="12" y1="17" x2="12.01" y2="17"/>
              </svg>
            </div>
            <h3 style={{
              color: '#2D5A27', margin: '0 0 10px',
              fontSize: '1.25rem', fontWeight: 700
            }}>
              {confirmModal.title}
            </h3>
            <p style={{
              color: '#666', margin: '0 0 28px',
              lineHeight: 1.65, fontSize: '0.95rem'
            }}>
              {confirmModal.message}
            </p>
            <div style={{ display: 'flex', gap: '12px', justifyContent: 'center' }}>
              <button
                onClick={() => setConfirmModal(CONFIRM_CLOSED)}
                style={{
                  padding: '11px 28px', borderRadius: '10px',
                  border: '2px solid #e8dfc9', background: 'white',
                  color: '#666', fontWeight: 600, cursor: 'pointer',
                  fontSize: '0.9rem', transition: 'all 0.2s'
                }}
                onMouseEnter={e => (e.currentTarget.style.borderColor = '#2D5A27')}
                onMouseLeave={e => (e.currentTarget.style.borderColor = '#e8dfc9')}
              >
                Cancel
              </button>
              <button
                onClick={() => {
                  confirmModal.onConfirm();
                  setConfirmModal(CONFIRM_CLOSED);
                }}
                style={{
                  padding: '11px 28px', borderRadius: '10px',
                  border: 'none', background: confirmModal.confirmColor,
                  color: 'white', fontWeight: 600, cursor: 'pointer',
                  fontSize: '0.9rem', transition: 'all 0.2s'
                }}
              >
                {confirmModal.confirmText}
              </button>
            </div>
          </div>
        </div>
      )}

      <div className="header">
        <div>
          <h2>People Management</h2>
          <p>Manage your ranger squad and user base.</p>
        </div>
        <button onClick={exportCSV} className="export-btn">
          {/* SVG chart icon instead of emoji */}
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <polyline points="23 6 13.5 15.5 8.5 10.5 1 18"/>
            <polyline points="17 6 23 6 23 12"/>
          </svg>
          Export CSV
        </button>
      </div>

      <div className="stats-grid">
        <div className="stat-card total">
          <div className="stat-value">{users.length}</div>
          <div className="stat-label">Total Users</div>
        </div>
        <div className="stat-card pending">
          <div className="stat-value">{pendingVolunteersUnfiltered.length}</div>
          <div className="stat-label">Pending Rangers</div>
        </div>
        <div className="stat-card approved">
          <div className="stat-value">{activeVolunteersUnfiltered.length}</div>
          <div className="stat-label">Active Rangers</div>
        </div>
        <div className="stat-card rejected">
          <div className="stat-value">{rejectedVolunteersUnfiltered.length}</div>
          <div className="stat-label">Rejected</div>
        </div>
      </div>

      <div className="search-container">
        <div className="search-input-wrapper">
          <svg className="search-icon" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <circle cx="11" cy="11" r="8"/>
            <line x1="21" y1="21" x2="16.65" y2="16.65"/>
          </svg>
          <input
            type="text"
            placeholder="Search by name, email, or phone..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="search-input"
          />
          {searchTerm && (
            <button className="search-clear" onClick={() => setSearchTerm('')}>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <line x1="18" y1="6" x2="6" y2="18"/>
                <line x1="6" y1="6" x2="18" y2="18"/>
              </svg>
            </button>
          )}
        </div>
      </div>

      <div className="tabs">
        <button className={activeTab === 'volunteers' ? 'active' : ''} onClick={() => setActiveTab('volunteers')}>
          Ranger Squad ({allVolunteersFiltered.length})
        </button>
        <button className={activeTab === 'users' ? 'active' : ''} onClick={() => setActiveTab('users')}>
          User Directory ({filteredUsers.length})
        </button>
      </div>

      {activeTab === 'volunteers' && (
        <div className="list-view">
          {pendingVolunteersFiltered.length > 0 && (
            <div className="list-section">
              <div className="section-header">
                <h3>Pending Approvals <span className="section-count">{pendingVolunteersFiltered.length}</span></h3>
              </div>
              <div className="list-container">
                {pendingVolunteersFiltered.map(v => (
                  <div key={v.id} className="list-item pending-item">
                    <UserAvatar user={v} size="md" className="pending" />
                    <div className="item-content">
                      <div className="item-header">
                        <div className="item-title">
                          <strong>{v.username}</strong>
                          <span className="item-id">#{v.user_id || v.id}</span>
                        </div>
                        <span className="status-badge pending">Pending</span>
                      </div>
                      <div className="item-details">
                        <span className="item-detail">
                          <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
                            <polyline points="22,6 12,13 2,6"/>
                          </svg>
                          {v.email}
                        </span>
                        {v.phone && (
                          <span className="item-detail">
                            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                              <rect x="5" y="2" width="14" height="20" rx="2" ry="2"/>
                              <line x1="12" y1="18" x2="12" y2="18"/>
                            </svg>
                            {v.phone}
                          </span>
                        )}
                        <span className="item-detail">
                          <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <rect x="3" y="4" width="18" height="18" rx="2" ry="2"/>
                            <line x1="16" y1="2" x2="16" y2="6"/>
                            <line x1="8" y1="2" x2="8" y2="6"/>
                            <line x1="3" y1="10" x2="21" y2="10"/>
                          </svg>
                          Applied: {v.joined_at ? new Date(v.joined_at).toLocaleDateString() :
                                   v.created_at ? new Date(v.created_at).toLocaleDateString() : 'N/A'}
                        </span>
                      </div>
                      {v.bio && <div className="item-bio">"{v.bio}"</div>}
                    </div>
                    <div className="item-actions">
                      <button
                        className="action-btn reject"
                        onClick={() => showConfirm(
                          'Reject Volunteer',
                          `Are you sure you want to reject ${v.username}'s volunteer application?`,
                          () => rejectVolunteer(v.user_id || v.id),
                          'Reject', '#c62828'
                        )}
                      >
                        Reject
                      </button>
                      <button
                        className="action-btn approve"
                        onClick={() => showConfirm(
                          'Approve Volunteer',
                          `Are you sure you want to approve ${v.username} as a volunteer?`,
                          () => approveVolunteer(v.user_id || v.id),
                          'Approve', '#2D5A27'
                        )}
                      >
                        Approve
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeVolunteersFiltered.length > 0 && (
            <div className="list-section">
              <div className="section-header">
                <h3>Active Rangers <span className="section-count">{activeVolunteersFiltered.length}</span></h3>
              </div>
              <div className="list-container">
                {activeVolunteersFiltered.map(v => (
                  <div key={v.id} className="list-item active-item">
                    <UserAvatar user={v} size="md" className="active" />
                    <div className="item-content">
                      <div className="item-header">
                        <div className="item-title">
                          <strong>{v.username}</strong>
                          <span className="item-id">#{v.user_id || v.id}</span>
                        </div>
                        <span className="status-badge approved">Active</span>
                      </div>
                      <div className="item-details">
                        <span className="item-detail">
                          <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
                            <polyline points="22,6 12,13 2,6"/>
                          </svg>
                          {v.email}
                        </span>
                        {v.phone && (
                          <span className="item-detail">
                            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                              <rect x="5" y="2" width="14" height="20" rx="2" ry="2"/>
                              <line x1="12" y1="18" x2="12" y2="18"/>
                            </svg>
                            {v.phone}
                          </span>
                        )}
                        <span className="item-detail">
                          <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <rect x="3" y="4" width="18" height="18" rx="2" ry="2"/>
                            <line x1="16" y1="2" x2="16" y2="6"/>
                            <line x1="8" y1="2" x2="8" y2="6"/>
                            <line x1="3" y1="10" x2="21" y2="10"/>
                          </svg>
                          Joined: {v.joined_at ? new Date(v.joined_at).toLocaleDateString() :
                                   v.created_at ? new Date(v.created_at).toLocaleDateString() : 'N/A'}
                        </span>
                      </div>
                      <div className="item-badges">
                        {v.badges && v.badges.length > 0 ? (
                          <>
                            <span className="badges-label">Badges:</span>
                            <div className="badge-stack">
                              {v.badges.slice(0, 3).map((badge, idx) => (
                                <div key={idx} className="badge-item"
                                  style={{ zIndex: (v.badges?.length || 0) - idx }} title={badge}>
                                  🏅
                                </div>
                              ))}
                              {v.badges.length > 3 && (
                                <div className="badge-count" title={`${v.badges.length - 3} more badges`}>
                                  +{v.badges.length - 3}
                                </div>
                              )}
                            </div>
                          </>
                        ) : (
                          <span className="no-badges">No badges yet</span>
                        )}
                      </div>
                    </div>
                    <div className="item-actions">
                      <button
                        className="action-btn remove"
                        onClick={() => showConfirm(
                          'Remove Volunteer',
                          `Are you sure you want to remove ${v.username} from the ranger squad?`,
                          () => rejectVolunteer(v.user_id || v.id),
                          'Remove', '#FF9F1C'
                        )}
                      >
                        Remove
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {rejectedVolunteersFiltered.length > 0 && (
            <div className="list-section">
              <div className="section-header">
                <h3>Rejected Applications <span className="section-count">{rejectedVolunteersFiltered.length}</span></h3>
              </div>
              <div className="list-container">
                {rejectedVolunteersFiltered.map(v => (
                  <div key={v.id} className="list-item rejected-item">
                    <UserAvatar user={v} size="md" className="rejected" />
                    <div className="item-content">
                      <div className="item-header">
                        <div className="item-title">
                          <strong>{v.username}</strong>
                          <span className="item-id">#{v.user_id || v.id}</span>
                        </div>
                        <span className="status-badge rejected">Rejected</span>
                      </div>
                      <div className="item-details">
                        <span className="item-detail">
                          <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
                            <polyline points="22,6 12,13 2,6"/>
                          </svg>
                          {v.email}
                        </span>
                        <span className="item-detail">
                          <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <rect x="3" y="4" width="18" height="18" rx="2" ry="2"/>
                            <line x1="16" y1="2" x2="16" y2="6"/>
                            <line x1="8" y1="2" x2="8" y2="6"/>
                            <line x1="3" y1="10" x2="21" y2="10"/>
                          </svg>
                          Applied: {v.joined_at ? new Date(v.joined_at).toLocaleDateString() :
                                   v.created_at ? new Date(v.created_at).toLocaleDateString() : 'N/A'}
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {allVolunteersFiltered.length === 0 && (
            <div className="empty-state">
              <div className="empty-icon-svg">
                <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="#b8cfc4" strokeWidth="1.5">
                  <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/>
                  <circle cx="9" cy="7" r="4"/>
                  <path d="M23 21v-2a4 4 0 0 0-3-3.87"/>
                  <path d="M16 3.13a4 4 0 0 1 0 7.75"/>
                </svg>
              </div>
              <h4>No Volunteers Found</h4>
              <p>There are no volunteers matching your search.</p>
            </div>
          )}
        </div>
      )}

      {activeTab === 'users' && (
        <div className="list-view">
          <div className="list-section">
            <div className="section-header">
              <h3>User Directory <span className="section-count">{filteredUsers.length}</span></h3>
            </div>
            <div className="list-container">
              {filteredUsers.map(u => (
                <div key={u.id} className="user-item">
                  <UserAvatar user={u} size="sm" />
                  <div className="user-info-wrapper">
                    <div className="user-main-info">
                      <span className="user-name" title={u.username}>{u.username}</span>
                      <span className="user-id">#{u.id}</span>
                      <span className={`role-tag ${u.role}`}>{u.role}</span>
                    </div>
                    <div className="user-contact-info">
                      <span className="contact-item email" title={u.email}>
                        <svg className="contact-svg" width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                          <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
                          <polyline points="22,6 12,13 2,6"/>
                        </svg>
                        <span className="contact-text">{u.email}</span>
                      </span>
                      {u.phone && (
                        <span className="contact-item phone" title={u.phone}>
                          <svg className="contact-svg" width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <rect x="5" y="2" width="14" height="20" rx="2" ry="2"/>
                            <line x1="12" y1="18" x2="12" y2="18"/>
                          </svg>
                          <span className="contact-text">{u.phone}</span>
                        </span>
                      )}
                      <span className="contact-item date">
                        <svg className="contact-svg" width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                          <rect x="3" y="4" width="18" height="18" rx="2" ry="2"/>
                          <line x1="16" y1="2" x2="16" y2="6"/>
                          <line x1="8" y1="2" x2="8" y2="6"/>
                          <line x1="3" y1="10" x2="21" y2="10"/>
                        </svg>
                        <span className="contact-text">
                          {u.created_at ? new Date(u.created_at).toLocaleDateString() : 'N/A'}
                        </span>
                      </span>
                    </div>
                    <div className="user-meta-info">
                      {u.role === 'volunteer' && u.approval_status && (
                        <span className={`status-tag ${u.approval_status}`}>
                          {getFormattedStatus(u.approval_status)}
                        </span>
                      )}
                    </div>
                  </div>
                  {u.role !== 'admin' && (
                    <button
                      className="delete-user-btn"
                      onClick={() => showConfirm(
                        'Delete User',
                        `Are you sure you want to delete ${u.username}? This action cannot be undone.`,
                        () => deleteUser(u.id),
                        'Delete', '#c62828'
                      )}
                      title="Delete user"
                    >
                      Delete
                    </button>
                  )}
                </div>
              ))}
            </div>
          </div>
          {filteredUsers.length === 0 && (
            <div className="empty-state">
              <div className="empty-icon-svg">
                <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="#b8cfc4" strokeWidth="1.5">
                  <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/>
                  <circle cx="12" cy="7" r="4"/>
                </svg>
              </div>
              <h4>No Users Found</h4>
              <p>There are no users matching your search.</p>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default UserList;