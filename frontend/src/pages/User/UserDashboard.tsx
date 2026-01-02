// src/pages/User/UserDashboard.tsx - FIXED
import React from 'react';
import { useAuth } from '../../context/AuthContext';

const UserDashboard = () => {
  const { user, logout } = useAuth();

  return (
    <div style={{ padding: '20px' }}>
      <h1>User Dashboard</h1>
      {user ? (
        <>
          <p>Welcome, {user.email}!</p>
          <p>Your role: {user.role}</p>
          <button onClick={logout}>Logout</button>
        </>
      ) : (
        <div>
          <p>Please login first</p>
          <a href="/login">Go to Login</a>
        </div>
      )}
    </div>
  );
};

export default UserDashboard;