import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import './NotificationPopup.css';

interface PopupNotification {
  id: string;
  type_id: number;
  type_name: string;
  title: string;
  message: string;
  related_entity_type?: string;
  related_entity_id?: number;
  notification_id?: number;
}

const NotificationPopup: React.FC = () => {
  const [notifications, setNotifications] = useState<PopupNotification[]>([]);
  const [shownNotificationIds, setShownNotificationIds] = useState<Set<number>>(new Set());
  const { user } = useAuth();
  const navigate = useNavigate();
  const pollingInterval = useRef<NodeJS.Timeout | null>(null);

  // Clear shown notifications when user changes
  useEffect(() => {
    setShownNotificationIds(new Set());
    setNotifications([]);
  }, [user]);

  useEffect(() => {
    const handleShowNotification = (event: CustomEvent) => {
      const newNotification = {
        id: `popup-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
        notification_id: event.detail.notification_id,
        ...event.detail
      };
      
      // Only show if not already shown
      if (!shownNotificationIds.has(newNotification.notification_id)) {
        setNotifications(prev => [newNotification, ...prev].slice(0, 3));
        setShownNotificationIds(prev => new Set(prev).add(newNotification.notification_id));
        
        // Auto remove after 5 seconds
        setTimeout(() => {
          setNotifications(prev => prev.filter(n => n.id !== newNotification.id));
        }, 5000);
      }
    };

    window.addEventListener('show-notification-popup', handleShowNotification as EventListener);

    return () => {
      window.removeEventListener('show-notification-popup', handleShowNotification as EventListener);
    };
  }, [shownNotificationIds]);

  // Poll for new notifications
  useEffect(() => {
    const checkForNewNotifications = async () => {
      if (!user) return;
      
      try {
        const token = sessionStorage.getItem('token') || localStorage.getItem('token');
        
        const response = await fetch('http://localhost:5000/api/notifications/recent', {
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
          }
        });

        if (response.ok) {
          const data = await response.json();
          if (data.data && data.data.length > 0) {
            // Only show notifications that are unread AND not shown before
            const newNotifications = data.data.filter((n: any) => 
              n.is_read === 0 && !shownNotificationIds.has(n.notification_id)
            );
            
            newNotifications.forEach((n: any) => {
              const event = new CustomEvent('show-notification-popup', { 
                detail: {
                  notification_id: n.notification_id,
                  type_id: n.type_id,
                  type_name: n.type_name,
                  title: n.title,
                  message: n.message,
                  related_entity_type: n.related_entity_type,
                  related_entity_id: n.related_entity_id
                }
              });
              window.dispatchEvent(event);
            });
          }
        }
      } catch (error) {
        console.error('Error checking for new notifications:', error);
      }
    };

    if (user) {
      // Check immediately
      checkForNewNotifications();
      
      // Then every 30 seconds (increased from 10 to reduce frequency)
      pollingInterval.current = setInterval(checkForNewNotifications, 30000);

      return () => {
        if (pollingInterval.current) {
          clearInterval(pollingInterval.current);
        }
      };
    }
  }, [user, shownNotificationIds]);

  const handleClick = (notification: PopupNotification) => {
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
          }
      }
    }
    
    setNotifications(prev => prev.filter(n => n.id !== notification.id));
  };

  const getIcon = (type_name: string) => {
    switch (type_name) {
      case 'new_report': return '🚨';
      case 'task_assigned': return '🎯';
      case 'task_declined': return '⚠️';
      case 'task_completed': return '✅';
      case 'badge_assigned': return '🏆';
      default: return '📌';
    }
  };

  const getColor = (type_name: string) => {
    switch (type_name) {
      case 'new_report': return '#ff4757';
      case 'task_assigned': return '#0EA5E9';
      case 'task_declined': return '#f39c12';
      case 'task_completed': return '#10B981';
      case 'badge_assigned': return '#8B5CF6';
      default: return '#2D5A27';
    }
  };

  if (notifications.length === 0) return null;

  return (
    <div className="notification-popup-container">
      {notifications.map((notification) => (
        <div
          key={notification.id}
          className="notification-popup"
          style={{ 
            '--notification-color': getColor(notification.type_name)
          } as React.CSSProperties}
          onClick={() => handleClick(notification)}
        >
          <div className="popup-icon">{getIcon(notification.type_name)}</div>
          <div className="popup-content">
            <div className="popup-title">{notification.title}</div>
            <div className="popup-message">{notification.message}</div>
          </div>
          <button
            className="popup-close"
            onClick={(e) => {
              e.stopPropagation();
              setNotifications(prev => prev.filter(n => n.id !== notification.id));
            }}
          >
            ×
          </button>
        </div>
      ))}
    </div>
  );
};

export default NotificationPopup;

