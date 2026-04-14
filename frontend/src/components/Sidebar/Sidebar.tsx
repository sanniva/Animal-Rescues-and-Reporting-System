import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import Icon from '../../components/Icon';
import { useNotifications } from '../../context/NotificationContext';
import './sidebar.css';

interface User {
  user_id: number;
  username: string;
  role: 'admin' | 'volunteer' | 'user';
  volunteerStatus?: 'pending' | 'approved' | 'rejected' | 'none';
  profile_image_url?: string;
}

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
  currentUser: User | null;
  logout: () => void;
}

export const Sidebar: React.FC<SidebarProps> = ({
  isOpen,
  onClose,
  currentUser,
  logout
}) => {
  const location = useLocation();
  const navigate = useNavigate();
  const [profileImageError, setProfileImageError] = useState(false);
  const [freshImageUrl, setFreshImageUrl] = useState<string | null>(null);
  const { openNotificationPanel, unreadCount } = useNotifications();

  // Re-fetch the user's profile image whenever user changes or navigates back
  useEffect(() => {
    setProfileImageError(false);

    if (!currentUser?.user_id) return;

    const fetchFreshImage = async () => {
      try {
        const token =
          sessionStorage.getItem('token') || localStorage.getItem('token');
        if (!token) return;

        const res = await fetch(
          `${process.env.REACT_APP_API_URL}/api/users/${currentUser.user_id}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
              'Content-Type': 'application/json',
            },
            cache: 'no-store',
          }
        );

        if (res.ok) {
          const data = await res.json();
          if (data.profile_image_url) {
            setFreshImageUrl(resolveImageUrl(data.profile_image_url));
          } else {
            setFreshImageUrl(null);
          }
        }
      } catch {
        // silently fall back to initials
      }
    };

    fetchFreshImage();
  }, [currentUser?.user_id, currentUser?.profile_image_url]);

  // Also refresh whenever the user navigates (picks up changes made on Profile page)
  useEffect(() => {
    if (!currentUser?.user_id) return;

    const fetchFreshImage = async () => {
      try {
        const token =
          sessionStorage.getItem('token') || localStorage.getItem('token');
        if (!token) return;

        const res = await fetch(
          `${process.env.REACT_APP_API_URL}/api/users/${currentUser.user_id}?t=${Date.now()}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
              'Content-Type': 'application/json',
            },
            cache: 'no-store',
          }
        );

        if (res.ok) {
          const data = await res.json();
          setFreshImageUrl(
            data.profile_image_url ? resolveImageUrl(data.profile_image_url) : null
          );
          setProfileImageError(false);
        }
      } catch {
        // silent
      }
    };

    fetchFreshImage();
 }, [location.pathname, currentUser?.user_id]);

  const handleLogout = async () => {
    try {
      // Call the logout function from auth context
      await logout();
    } catch (error) {
      console.error('Logout error:', error);
    } finally {
      // Close the sidebar
      onClose();
      // Navigate to login page with replace to prevent going back
      navigate('/login', { replace: true });
    }
  };

  const resolveImageUrl = (url: string): string => {
    if (!url) return '';
    if (url.startsWith('http')) return url;
    const clean = url.startsWith('/') ? url : `/${url}`;
    return `${process.env.REACT_APP_API_URL}${clean}`;
  };

  const NavItem = ({
    to,
    icon,
    label,
  }: {
    to: string;
    icon: string;
    label: string;
  }) => {
    const isActive = location.pathname === to;
    return (
      <Link
        to={to}
        onClick={onClose}
        className={`nav-item ${isActive ? 'nav-item-active' : ''}`}
      >
        <div className="nav-icon-wrapper">
          <Icon
            type="feather"
            name={icon as any}
            size={20}
            className={isActive ? 'nav-icon-active' : 'nav-icon'}
          />
        </div>
        <span className="nav-label">{label}</span>
        {isActive && <div className="nav-indicator"></div>}
      </Link>
    );
  };

  const renderUserAvatar = () => {
    if (!currentUser) return null;

    // Prefer the freshly-fetched URL, fall back to what was passed in props
    const imageUrl =
      freshImageUrl ||
      (currentUser.profile_image_url
        ? resolveImageUrl(currentUser.profile_image_url)
        : null);

    if (imageUrl && !profileImageError) {
      return (
        <div className="user-avatar-image-container">
          <img
            src={imageUrl}
            alt={currentUser.username}
            className="user-avatar-image"
            onError={() => setProfileImageError(true)}
          />
        </div>
      );
    }

    return (
      <div className="user-avatar-initials">
        {currentUser.username.charAt(0).toUpperCase()}
      </div>
    );
  };

  return (
    <aside className={`sidebar ${isOpen ? 'sidebar-open' : ''}`}>
      {/* Sidebar Header */}
      <div className="sidebar-header">
        <div className="sidebar-brand">
          <div className="sidebar-logo">
            <div className="logo-icon-wrapper">
              <Icon type="fa" name="FaPaw" size={24} className="logo-icon" />
            </div>
            <h1 className="logo-text">ResQAll</h1>
          </div>
        </div>
      </div>

      {/* Navigation Links */}
      <div className="sidebar-nav">
        <div className="nav-section">
          <p className="section-title">Tactical Operations</p>
          <div className="nav-items">
            <NavItem to="/dashboard" icon="FiHome" label="Mission Dashboard" />

            {currentUser?.role === 'user' && (
              <>
                <NavItem
                  to="/create-report"
                  icon="FiAlertTriangle"
                  label="File Field Report"
                />
                <NavItem
                  to="/my-reports"
                  icon="FiFileText"
                  label="My Reports"
                />
              </>
            )}

            {currentUser?.role === 'volunteer' &&
              currentUser.volunteerStatus === 'approved' && (
                <NavItem
                  to="/mission-board"
                  icon="FiGrid"
                  label="Mission Board"
                />
              )}

            {currentUser?.role === 'admin' && (
              <>
                <NavItem
                  to="/admin/users"
                  icon="FiUsers"
                  label="Ranger Personnel"
                />
                <NavItem
                  to="/admin/rescue-reports"
                  icon="FiFileText"
                  label="Master Log"
                />
              </>
            )}
          </div>
        </div>
      </div>

      {/* Sidebar Footer */}
      <div className="sidebar-footer">
        <div className="user-card">
          <div className="user-card-content">
            {currentUser ? (
              <div
                className="user-identity"
                onClick={() => {
                  navigate(`/profile/${currentUser.user_id}`);
                  onClose();
                }}
              >
                {renderUserAvatar()}
                <div className="user-info">
                  <p className="user-name">{currentUser.username}</p>
                  <p className="user-role">{currentUser.role}</p>
                </div>
              </div>
            ) : (
              <div className="user-identity-placeholder">Loading user...</div>
            )}

            <button
              onClick={(e) => {
                e.preventDefault();
                openNotificationPanel();
              }}
              className="notifications-btn"
            >
              <Icon
                type="feather"
                name="FiBell"
                size={18}
                className="bell-icon"
              />
              {unreadCount > 0 && (
                <span className="notification-badge">{unreadCount}</span>
              )}
            </button>
          </div>

          <button onClick={handleLogout} className="logout-btn">
            <Icon
              type="feather"
              name="FiLogOut"
              size={16}
              className="logout-icon"
            />
            <span className="logout-text">Terminate Session</span>
          </button>
        </div>
      </div>
    </aside>
  );
};