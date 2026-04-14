import React, { createContext, useState, useContext, useEffect, useCallback, useRef } from 'react';
import { useAuth } from './AuthContext';

export interface Notification {
  id: string;
  notification_id: number;
  type_id: number;
  type_name: string;
  title: string;
  message: string;
  timestamp: Date;
  read: boolean;
  related_entity_type?: string;
  related_entity_id?: number;
}

interface NotificationContextType {
  notifications: Notification[];
  unreadCount: number;
  markAsRead: (notificationId: number) => Promise<void>;
  markAllAsRead: () => Promise<void>;
  deleteNotification: (notificationId: number) => Promise<void>;
  isNotificationPanelOpen: boolean;
  openNotificationPanel: () => void;
  closeNotificationPanel: () => void;
  toggleNotificationPanel: () => void;
  refreshNotifications: () => Promise<void>;
}

const NotificationContext = createContext<NotificationContextType | undefined>(undefined);

export const useNotifications = () => {
  const context = useContext(NotificationContext);
  if (!context) {
    throw new Error('useNotifications must be used within a NotificationProvider');
  }
  return context;
};

export const NotificationProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [unreadCount, setUnreadCount] = useState(0);
  const [isNotificationPanelOpen, setIsNotificationPanelOpen] = useState(false);
  const { user } = useAuth(); // Changed from currentUser to user
  const pollingInterval = useRef<NodeJS.Timeout | null>(null);

  const fetchNotifications = useCallback(async () => {
    if (!user) return; // Changed from currentUser to user

    try {
      const token = sessionStorage.getItem('token') || localStorage.getItem('token');
      const response = await fetch('${process.env.REACT_APP_API_URL}/api/notifications', {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });

      if (response.ok) {
        const data = await response.json();
        
        const formattedNotifications: Notification[] = data.data.map((n: any) => ({
          id: `notif-${n.notification_id}`,
          notification_id: n.notification_id,
          type_id: n.type_id,
          type_name: n.type_name,
          title: n.title,
          message: n.message,
          timestamp: new Date(n.created_at),
          read: n.is_read === 1,
          related_entity_type: n.related_entity_type,
          related_entity_id: n.related_entity_id
        }));

        setNotifications(formattedNotifications);
        setUnreadCount(data.unread_count || 0);
      }
    } catch (error) {
      console.error('Error fetching notifications:', error);
    }
  }, [user]); // Changed dependency

  const markAsRead = useCallback(async (notificationId: number) => {
    if (!user) return; // Changed from currentUser to user

    try {
      const token = sessionStorage.getItem('token') || localStorage.getItem('token');
      const response = await fetch(`${process.env.REACT_APP_API_URL}/api/notifications/${notificationId}/read`, {
        method: 'PATCH',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });

      if (response.ok) {
        setNotifications(prev => 
          prev.map(n => 
            n.notification_id === notificationId ? { ...n, read: true } : n
          )
        );
        setUnreadCount(prev => Math.max(0, prev - 1));
      }
    } catch (error) {
      console.error('Error marking notification as read:', error);
    }
  }, [user]); // Changed dependency

  const markAllAsRead = useCallback(async () => {
    if (!user) return; // Changed from currentUser to user

    try {
      const token = sessionStorage.getItem('token') || localStorage.getItem('token');
      const response = await fetch('${process.env.REACT_APP_API_URL}/api/notifications/read-all', {
        method: 'PATCH',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });

      if (response.ok) {
        setNotifications(prev => prev.map(n => ({ ...n, read: true })));
        setUnreadCount(0);
      }
    } catch (error) {
      console.error('Error marking all as read:', error);
    }
  }, [user]); // Changed dependency

  const deleteNotification = useCallback(async (notificationId: number) => {
    if (!user) return; // Changed from currentUser to user

    try {
      const token = sessionStorage.getItem('token') || localStorage.getItem('token');
      const response = await fetch(`${process.env.REACT_APP_API_URL}/api/notifications/${notificationId}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });

      if (response.ok) {
        setNotifications(prev => prev.filter(n => n.notification_id !== notificationId));
        const removed = notifications.find(n => n.notification_id === notificationId);
        if (removed && !removed.read) {
          setUnreadCount(prev => Math.max(0, prev - 1));
        }
      }
    } catch (error) {
      console.error('Error deleting notification:', error);
    }
  }, [user, notifications]); // Changed dependency

  const openNotificationPanel = useCallback(() => {
    setIsNotificationPanelOpen(true);
    fetchNotifications();
  }, [fetchNotifications]);

  const closeNotificationPanel = useCallback(() => {
    setIsNotificationPanelOpen(false);
  }, []);

  const toggleNotificationPanel = useCallback(() => {
    setIsNotificationPanelOpen(prev => !prev);
    if (!isNotificationPanelOpen) {
      fetchNotifications();
    }
  }, [isNotificationPanelOpen, fetchNotifications]);

  const refreshNotifications = useCallback(async () => {
    await fetchNotifications();
  }, [fetchNotifications]);

  useEffect(() => {
    if (user) { // Changed from currentUser to user
      fetchNotifications();
    }
  }, [user, fetchNotifications]); // Changed dependency

  useEffect(() => {
    if (user) { // Changed from currentUser to user
      pollingInterval.current = setInterval(() => {
        fetchNotifications();
      }, 30000);

      return () => {
        if (pollingInterval.current) {
          clearInterval(pollingInterval.current);
        }
      };
    }
  }, [user, fetchNotifications]); // Changed dependency

  return (
    <NotificationContext.Provider value={{
      notifications,
      unreadCount,
      markAsRead,
      markAllAsRead,
      deleteNotification,
      isNotificationPanelOpen,
      openNotificationPanel,
      closeNotificationPanel,
      toggleNotificationPanel,
      refreshNotifications
    }}>
      {children}
    </NotificationContext.Provider>
  );
};

