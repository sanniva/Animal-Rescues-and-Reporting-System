import React from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import Icon from '../../components/Icon';
import './sidebar.css';

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
  onOpenNotifications: () => void;
  unreadNotificationsCount: number;
  currentUser: {
    username: string;
    role: 'admin' | 'volunteer' | 'user';
    volunteerStatus?: 'pending' | 'approved' | 'rejected' | 'none';
  } | null;
  logout: () => void;  // This should match what Layout.tsx is passing
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

  const NavItem = ({ to, icon, label }: { to: string, icon: string, label: string }) => {
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
            
            {(currentUser?.role === 'user' || currentUser?.role === 'volunteer') && (
              <NavItem to="/submit-report" icon="FiAlertTriangle" label="File Field Report" />
            )}
            
            {currentUser?.role === 'volunteer' && currentUser.volunteerStatus === 'approved' && (
              <NavItem to="/tasks" icon="FiClipboard" label="Deployment Board" />
            )}
            
            {currentUser?.role === 'admin' && (
              <>
                <NavItem to="/admin/volunteers" icon="FiUsers" label="Ranger Personnel" />
                <NavItem to="/admin/reports" icon="FiFileText" label="Master Log" />
              </>
            )}
          </div>
        </div>
      </div>

      {/* Sidebar Footer User Card */}
      <div className="sidebar-footer">
        <div className="user-card">
          <div className="user-card-content">
            {/* Clickable User Identity Section */}
            <div 
              onClick={() => {
                navigate('/profile');
                onClose();
              }}
              className="user-identity"
            >
              <div className="user-avatar">
                {currentUser?.username?.charAt(0).toUpperCase() || 'U'}
              </div>
              <div className="user-info">
                <p className="user-name">{currentUser?.username || 'User'}</p>
                <p className="user-role">{currentUser?.role || 'user'}</p>
              </div>
            </div>
            
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
          
          <button 
            onClick={handleLogout}
            className="logout-btn"
          >
            <Icon type="feather" name="FiLogOut" size={16} className="logout-icon" />
            <span className="logout-text">Terminate Session</span>
          </button>
        </div>
      </div>
    </aside>
  );
};