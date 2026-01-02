import React from 'react';
import { Outlet } from 'react-router-dom';
import { Sidebar } from '../Sidebar/Sidebar';
import { useAuth } from '../../context/AuthContext';
import './layout.css';

export const Layout: React.FC = () => {
  const { user, logout } = useAuth();

  return (
    <div className="layout-root">
      <Sidebar
        isOpen={true}
        onClose={() => {}}
        onOpenNotifications={() => {}}
        unreadNotificationsCount={3}
        currentUser={user}
        logout={logout}
      />

      <main className="layout-content">
        <Outlet />
      </main>
    </div>
  );
};
