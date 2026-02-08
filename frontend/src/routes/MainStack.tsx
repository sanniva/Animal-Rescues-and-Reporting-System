import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { Login } from "../pages/Auth/Login";
import Dashboard from "../pages/Dashboard/Dashboard";
import ProtectedRoute from "../components/ProtectedRoute";
import { useAuth } from "../context/AuthContext";
import UserList from "../pages/Admin/UserList/UserList";
import { Profile } from "../pages/Profile/Profile";
import ReportSubmission from "../pages/User/ReportSubmission/ReportSubmission";
import MyReports from "../pages/User/MyReports/MyReports";

const MainStack: React.FC = () => {
  const { user } = useAuth();

  return (
    <Routes>
      <Route path="/login" element={<Login />} />

      <Route
        path="/"
        element={user ? <Navigate to="/dashboard" /> : <Navigate to="/login" />}
      />

      <Route
        path="/dashboard"
        element={
          <ProtectedRoute allowedRoles={["admin", "volunteer", "user"]}>
            <Dashboard />
          </ProtectedRoute>
        }
      />

      {/* Admin-only user management */}
      <Route
        path="/admin/users"
        element={
          <ProtectedRoute allowedRoles={["admin"]}>
            <UserList />
          </ProtectedRoute>
        }
      />

      {/* Profile route */}
      <Route
        path="/profile/:userId"
        element={
          <ProtectedRoute allowedRoles={["admin", "volunteer", "user"]}>
            <Profile />
          </ProtectedRoute>
        }
      />

      {/* Optional fallback route for /profile (current user) */}
      <Route
        path="/profile"
        element={
          <ProtectedRoute allowedRoles={["admin", "volunteer", "user"]}>
            <Profile />
          </ProtectedRoute>
        }
      />

         {/* Report Submission - ONLY FOR REGULAR USERS */}
      <Route
        path="/create-report"
        element={
          <ProtectedRoute allowedRoles={["user"]}>
            <ReportSubmission />
          </ProtectedRoute>
        }
      />

      <Route
        path="/my-reports"
        element={
          <ProtectedRoute allowedRoles={["user"]}>
            <MyReports />
          </ProtectedRoute>
        }
      />

      {/* Catch-all */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
};

export default MainStack;
