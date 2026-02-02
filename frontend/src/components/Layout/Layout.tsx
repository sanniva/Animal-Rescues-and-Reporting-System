import React from "react";
import { Sidebar } from "../Sidebar/Sidebar";
import { useAuth } from "../../context/AuthContext";
import "./layout.css";

interface SidebarUser {
  user_id: number;
  username: string;
  role: "admin" | "volunteer" | "user";
  volunteerStatus?: "pending" | "approved" | "rejected" | "none";
}

interface LayoutProps {
  children: React.ReactNode;
}

export const Layout: React.FC<LayoutProps> = ({ children }) => {
  const { user, logout } = useAuth();

  // Map AuthContext user to Sidebar user
  const sidebarUser: SidebarUser | null = user
    ? {
        user_id: user.user_id,
        username: user.username,
        role: user.role.role_name as "admin" | "volunteer" | "user", // cast string to literal
        volunteerStatus: "none",
      }
    : null;

  return (
    <div className="layout-root">
      <Sidebar
        isOpen={true}
        onClose={() => {}}
        onOpenNotifications={() => {}}
        unreadNotificationsCount={0}
        currentUser={sidebarUser} // now type matches Sidebar
        logout={logout}
      />
      <main className="layout-content">{children}</main>
    </div>
  );
};
