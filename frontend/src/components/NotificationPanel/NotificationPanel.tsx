import React, { useEffect, useRef } from 'react';
import { useNotifications } from '../../context/NotificationContext';
import { useAuth } from '../../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import './NotificationPanel.css';

interface NotificationPanelProps {
  isOpen: boolean;
  onClose: () => void;
}

const NotificationPanel: React.FC<NotificationPanelProps> = ({ isOpen, onClose }) => {
  const { 
    notifications, 
    unreadCount, 
    markAsRead, 
    markAllAsRead, 
    deleteNotification 
  } = useNotifications();
  
  const { user } = useAuth();
  const navigate = useNavigate();
  const panelRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (panelRef.current && !panelRef.current.contains(event.target as Node)) {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen, onClose]);

  const handleNotificationClick = async (notification: any) => {
    if (!notification.read) {
      await markAsRead(notification.notification_id);
    }

    if (notification.related_entity_type && notification.related_entity_id) {
      switch (notification.type_name) {
        case 'new_report':
          if (user?.role?.role_name === 'admin') {
            navigate(`/admin/rescue-reports?highlight=${notification.related_entity_id}`);
          }
          break;
        case 'task_assigned':
          navigate(`/mission-board?task=${notification.related_entity_id}`);
          break;
        case 'task_declined':
          if (user?.role?.role_name === 'admin') {
            navigate(`/admin/rescue-reports?report=${notification.related_entity_id}`);
          }
          break;
        case 'task_completed':
          if (user?.role?.role_name === 'admin') {
            navigate(`/admin/rescue-reports?report=${notification.related_entity_id}`);
          } else {
            navigate(`/my-reports?report=${notification.related_entity_id}`);
          }
          break;
        case 'badge_assigned':
          navigate(`/profile/${user?.user_id}?badges=true`);
          break;
        default:
          if (notification.related_entity_type === 'report') {
            if (user?.role?.role_name === 'admin') {
              navigate(`/admin/rescue-reports?report=${notification.related_entity_id}`);
            } else {
              navigate(`/my-reports?report=${notification.related_entity_id}`);
            }
          } else if (notification.related_entity_type === 'task') {
            navigate(`/mission-board?task=${notification.related_entity_id}`);
          }
      }
    }

    onClose();
  };

  const getNotificationIcon = (type_name: string) => {
    switch (type_name) {
      case 'new_report': return '🚨';
      case 'task_assigned': return '🎯';
      case 'task_declined': return '⚠️';
      case 'task_completed': return '✅';
      case 'badge_assigned': return '🏆';
      default: return '📌';
    }
  };

  const getTimeAgo = (date: Date) => {
    const seconds = Math.floor((new Date().getTime() - date.getTime()) / 1000);
    
    if (seconds < 60) return 'just now';
    const minutes = Math.floor(seconds / 60);
    if (minutes < 60) return `${minutes}m ago`;
    const hours = Math.floor(minutes / 60);
    if (hours < 24) return `${hours}h ago`;
    const days = Math.floor(hours / 24);
    return `${days}d ago`;
  };

  if (!isOpen) return null;

  return (
    <>
      <div className="notification-overlay" onClick={onClose} />
      <div ref={panelRef} className={`notification-panel ${isOpen ? 'open' : ''}`}>
        <div className="notification-header">
          <div className="notification-header-left">
            <h3>Notifications</h3>
            {unreadCount > 0 && (
              <span className="notification-badge">{unreadCount} new</span>
            )}
          </div>
          <div className="notification-header-right">
            {unreadCount > 0 && (
              <button onClick={markAllAsRead} className="mark-all-read-btn">
                Mark all as read
              </button>
            )}
            <button onClick={onClose} className="close-btn">×</button>
          </div>
        </div>

        <div className="notification-list">
          {notifications.length === 0 ? (
            <div className="empty-notifications">
              <span className="empty-icon">🔔</span>
              <p>No notifications yet</p>
            </div>
          ) : (
            notifications.map((notification) => (
              <div
                key={notification.id}
                className={`notification-item ${!notification.read ? 'unread' : ''}`}
                onClick={() => handleNotificationClick(notification)}
              >
                <div className="notification-icon">
                  {getNotificationIcon(notification.type_name)}
                </div>
                <div className="notification-content">
                  <div className="notification-title">{notification.title}</div>
                  <div className="notification-message">{notification.message}</div>
                  <div className="notification-time">
                    {getTimeAgo(notification.timestamp)}
                  </div>
                </div>
                <button
                  className="notification-delete"
                  onClick={(e) => {
                    e.stopPropagation();
                    deleteNotification(notification.notification_id);
                  }}
                >
                  ×
                </button>
              </div>
            ))
          )}
        </div>
      </div>
    </>
  );
};

export default NotificationPanel;