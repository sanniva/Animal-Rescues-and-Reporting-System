import React, { useState, useEffect } from "react";
import { Sidebar } from "../Sidebar/Sidebar";
import { useAuth } from "../../context/AuthContext";
import Icon from "../../components/Icon";
import "./layout.css";

interface SidebarUser {
  user_id: number;
  username: string;
  role: "admin" | "volunteer" | "user";
  volunteerStatus?: "pending" | "approved" | "rejected" | "none";
  profile_image_url?: string;
}

interface LayoutProps {
  children: React.ReactNode;
}

export const Layout: React.FC<LayoutProps> = ({ children }) => {
  const { user, logout } = useAuth();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);

  // Handle window resize
  useEffect(() => {
    const handleResize = () => {
      const mobile = window.innerWidth <= 768;
      setIsMobile(mobile);
      // Auto-close sidebar on mobile when resizing from desktop to mobile
      if (mobile) {
        setIsSidebarOpen(false);
      }
    };

    window.addEventListener('resize', handleResize);
    handleResize();

    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Close sidebar when clicking outside on mobile
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (isMobile && isSidebarOpen) {
        const sidebar = document.querySelector('.sidebar');
        const menuButton = document.querySelector('.mobile-menu-btn');
        
        if (sidebar && !sidebar.contains(event.target as Node) && 
            menuButton && !menuButton.contains(event.target as Node)) {
          setIsSidebarOpen(false);
        }
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isMobile, isSidebarOpen]);

  // Function to determine volunteer status
  const getVolunteerStatus = (user: any): "pending" | "approved" | "rejected" | "none" => {
    if (!user) return "none";
    
    if (user.volunteer) {
      if (user.volunteer.approval_status_id === 1) return "pending";
      if (user.volunteer.approval_status_id === 2) return "approved";
      if (user.volunteer.approval_status_id === 3) return "rejected";
    }
    
    if (user.volunteer_status) {
      if (user.volunteer_status === 'pending') return "pending";
      if (user.volunteer_status === 'approved') return "approved";
      if (user.volunteer_status === 'rejected') return "rejected";
    }
    
    if (user.approval_status_id) {
      if (user.approval_status_id === 1) return "pending";
      if (user.approval_status_id === 2) return "approved";
      if (user.approval_status_id === 3) return "rejected";
    }
    
    return "none";
  };

  // Map AuthContext user to Sidebar user
  const sidebarUser: SidebarUser | null = user
    ? {
        user_id: user.user_id,
        username: user.username,
        role: user.role?.role_name as "admin" | "volunteer" | "user",
        volunteerStatus: getVolunteerStatus(user),
        profile_image_url: user.profile_image_url,
      }
    : null;

  return (
    <div className="layout-root">
      {/* Mobile Header with Menu Button - Profile removed */}
      {isMobile && (
        <div className="mobile-header">
          <button 
            className="mobile-menu-btn"
            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
            aria-label="Toggle menu"
          >
            <Icon 
              type="feather" 
              name={isSidebarOpen ? "FiX" : "FiMenu"} 
              size={24} 
            />
          </button>
          <div className="mobile-logo">
            <Icon type="fa" name="FaPaw" size={20} className="mobile-logo-icon" />
            <span className="mobile-logo-text">ResQAll</span>
          </div>
          {/* Empty div for spacing to keep logo centered */}
          <div style={{ width: '40px' }}></div>
        </div>
      )}

      {/* Overlay for mobile when sidebar is open */}
      {isMobile && isSidebarOpen && (
        <div 
          className="sidebar-overlay"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <Sidebar
        isOpen={isSidebarOpen}
        onClose={() => setIsSidebarOpen(false)}
        currentUser={sidebarUser}
        logout={logout}
      />
      
      {/* Main Content */}
      <main className={`layout-content ${isMobile ? 'mobile-content' : ''} ${isSidebarOpen ? 'sidebar-open' : ''}`}>
        {children}
      </main>
    </div>
  );
};
