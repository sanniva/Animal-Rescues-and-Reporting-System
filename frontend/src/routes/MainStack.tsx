import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { UserRole } from '../types/user';

// IMPORT CORRECT DASHBOARD PATH
import { Dashboard } from '../pages/Admin/Dashboard'; // <-- CHANGE THIS
import { Login } from '../pages/Auth/Login';
import { Layout } from '../components/Layout/Layout';

const MainStack: React.FC = () => {
  const { user } = useAuth();

  const ProtectedRoute: React.FC<{ children: React.ReactNode; allowedRoles?: UserRole[] }> = ({ children, allowedRoles }) => {
    if (!user) return <Navigate to="/login" />;
    if (allowedRoles && !allowedRoles.includes(user.role)) {
      // User has a role but not allowed for this route - still show dashboard
      return <Navigate to="/dashboard" />;
    }
    return <>{children}</>;
  };

  return (
    <Routes>
      <Route path="/login" element={<Login />} />

      {/* Redirect based on authentication */}
      <Route
        path="/"
        element={
          user ? <Navigate to="/dashboard" /> : <Navigate to="/login" />
        }
      />


      {/* Single Dashboard route for all users */}
      {/* <Route 
        path="/dashboard" 
        element={
          <ProtectedRoute>
            <Dashboard />
          </ProtectedRoute>
        } 
      /> */}

      <Route element={<ProtectedRoute><Layout /></ProtectedRoute>}>
        <Route path="/dashboard" element={<Dashboard />} />
      </Route>

      {/* Example of other protected routes with role restrictions */}
      {/* <Route 
        path="/admin/volunteers" 
        element={
          <ProtectedRoute allowedRoles={['admin']}>
            <AdminVolunteers />
          </ProtectedRoute>
        } 
      />
      
      <Route 
        path="/tasks" 
        element={
          <ProtectedRoute allowedRoles={['volunteer', 'admin']}>
            <Tasks />
          </ProtectedRoute>
        } 
      />
      
      <Route 
        path="/submit-report" 
        element={
          <ProtectedRoute allowedRoles={['user', 'volunteer', 'admin']}>
            <SubmitReport />
          </ProtectedRoute>
        } 
      />
      
      <Route 
        path="/profile" 
        element={
          <ProtectedRoute>
            <Profile />
          </ProtectedRoute>
        } 
      /> */}
    </Routes>
  );
};

export default MainStack;