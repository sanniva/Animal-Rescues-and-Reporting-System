// import React from "react";
// import { Sidebar } from "../Sidebar/Sidebar";
// import { useAuth } from "../../context/AuthContext";
// import "./layout.css";

// interface SidebarUser {
//   user_id: number;
//   username: string;
//   role: "admin" | "volunteer" | "user";
//   volunteerStatus?: "pending" | "approved" | "rejected" | "none";
// }

// interface LayoutProps {
//   children: React.ReactNode;
// }

// export const Layout: React.FC<LayoutProps> = ({ children }) => {
//   const { user, logout } = useAuth();

//   // Map AuthContext user to Sidebar user
//   const sidebarUser: SidebarUser | null = user
//     ? {
//         user_id: user.user_id,
//         username: user.username,
//         role: user.role.role_name as "admin" | "volunteer" | "user", // cast string to literal
//         volunteerStatus: "none",
//       }
//     : null;

//   return (
//     <div className="layout-root">
//       <Sidebar
//         isOpen={true}
//         onClose={() => {}}
//         onOpenNotifications={() => {}}
//         unreadNotificationsCount={0}
//         currentUser={sidebarUser} // now type matches Sidebar
//         logout={logout}
//       />
//       <main className="layout-content">{children}</main>
//     </div>
//   );
// };

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

  // Function to determine volunteer status
  const getVolunteerStatus = (user: any): "pending" | "approved" | "rejected" | "none" => {
    if (!user) return "none";
    
    // Check if user has volunteer property
    if (user.volunteer) {
      if (user.volunteer.approval_status_id === 1) return "pending";
      if (user.volunteer.approval_status_id === 2) return "approved";
      if (user.volunteer.approval_status_id === 3) return "rejected";
    }
    
    // Check if user has volunteer_status property
    if (user.volunteer_status) {
      if (user.volunteer_status === 'pending') return "pending";
      if (user.volunteer_status === 'approved') return "approved";
      if (user.volunteer_status === 'rejected') return "rejected";
    }
    
    // Check if user has approval_status_id directly
    if (user.approval_status_id) {
      if (user.approval_status_id === 1) return "pending";
      if (user.approval_status_id === 2) return "approved";
      if (user.approval_status_id === 3) return "rejected";
    }
    
    return "none";
  };

  // Map AuthContext user to Sidebar user with proper volunteer status
  const sidebarUser: SidebarUser | null = user
    ? {
        user_id: user.user_id,
        username: user.username,
        role: user.role?.role_name as "admin" | "volunteer" | "user",
        volunteerStatus: getVolunteerStatus(user), // Dynamically determine status
      }
    : null;

  // Debug log to see what's coming in
  console.log('Layout - Original user:', user);
  console.log('Layout - Sidebar user:', sidebarUser);

  return (
    <div className="layout-root">
      <Sidebar
        isOpen={true}
        onClose={() => {}}
        onOpenNotifications={() => {}}
        unreadNotificationsCount={0}
        currentUser={sidebarUser}
        logout={logout}
      />
      <main className="layout-content">{children}</main>
    </div>
  );
};