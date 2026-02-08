// src/components/Sidebar/Sidebar.tsx
import React from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import Icon from '../../components/Icon';
import './sidebar.css';

interface User {
  user_id: number;
  username: string;
  role: 'admin' | 'volunteer' | 'user';
  volunteerStatus?: 'pending' | 'approved' | 'rejected' | 'none';
}

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
  onOpenNotifications: () => void;
  unreadNotificationsCount: number;
  currentUser: User | null;
  logout: () => void;
}

export const Sidebar: React.FC<SidebarProps> = ({
  isOpen,
  onClose,
  onOpenNotifications,
  unreadNotificationsCount,
  currentUser,
  logout
}) => {
  const location = useLocation();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    onClose();
  };

  const NavItem = ({ to, icon, label }: { to: string; icon: string; label: string }) => {
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

            {/* {(currentUser?.role === 'user' || currentUser?.role === 'volunteer') && (
              <NavItem to="/create-report" icon="FiAlertTriangle" label="File Field Report" />
            )} */}

            {(currentUser?.role === 'user') && (
              <>
                <NavItem to="/create-report" icon="FiAlertTriangle" label="File Field Report" />
                <NavItem to="/my-reports" icon="FiFileText" label="My Reports" />
              </>
             
            )}

            {currentUser?.role === 'volunteer' && currentUser.volunteerStatus === 'approved' && (
              <NavItem to="/tasks" icon="FiClipboard" label="Deployment Board" />
            )}

            {currentUser?.role === 'admin' && (
              <>
                <NavItem to="/admin/users" icon="FiUsers" label="Ranger Personnel" />
                <NavItem to="/admin/reports" icon="FiFileText" label="Master Log" />
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
                <div className="user-avatar">
                  {currentUser.username.charAt(0).toUpperCase()}
                </div>
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
                onOpenNotifications();
              }}
              className="notifications-btn"
            >
              <Icon type="feather" name="FiBell" size={18} className="bell-icon" />
              {unreadNotificationsCount > 0 && (
                <span className="notification-badge">{unreadNotificationsCount}</span>
              )}
            </button>
          </div>

          <button onClick={handleLogout} className="logout-btn">
            <Icon type="feather" name="FiLogOut" size={16} className="logout-icon" />
            <span className="logout-text">Terminate Session</span>
          </button>
        </div>
      </div>
    </aside>
  );
};
