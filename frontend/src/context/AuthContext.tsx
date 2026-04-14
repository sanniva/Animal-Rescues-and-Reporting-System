// src/context/AuthContext.tsx
import React, { createContext, useContext, useEffect, useState } from "react";
import { User, Role, Volunteer } from "../types/types";

export interface VolunteerDetails {
  hasCar: boolean;
  canFoster: boolean;
  animalHandling: string;
  city: string;
}

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  loading: boolean;
  login: (emailOrUsername: string, password: string, rememberMe?: boolean) => Promise<boolean>;
  register: (
    username: string,
    email: string,
    password: string,
    phone: string,
    isVolunteer: boolean,
    volunteerDetails?: VolunteerDetails
  ) => Promise<boolean>;
  logout: () => void;
  updateUserProfile: (userId: number, data: Partial<User>) => Promise<boolean>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  // IMPORTANT: starts true — no redirect fires until we've checked storage
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    try {
      // Check sessionStorage first, then localStorage (remember me)
      const storedUser =
        sessionStorage.getItem("resqall_user") ||
        localStorage.getItem("resqall_user");
      const token =
        sessionStorage.getItem("token") ||
        localStorage.getItem("token");

      if (storedUser && token) {
        const parsedUser: User = JSON.parse(storedUser);
        setUser(parsedUser);
      }
    } catch (error) {
      console.error("Error loading user from storage:", error);
      localStorage.removeItem("resqall_user");
      localStorage.removeItem("token");
      sessionStorage.removeItem("resqall_user");
      sessionStorage.removeItem("token");
    } finally {
      // Always unblock routing — whether we found a user or not
      setLoading(false);
    }
  }, []);

  const mapUser = (dataUser: any): User => {
    const roleId = dataUser.role_id;
    let roleName: "user" | "volunteer" | "admin" = "user";

    if (roleId === 1) roleName = "user";
    else if (roleId === 2) roleName = "volunteer";
    else if (roleId === 3) roleName = "admin";

    const role: Role = { role_id: roleId, role_name: roleName };

    let volunteerStatus: "none" | "pending" | "approved" | "rejected" = "none";

    if (dataUser.volunteer) {
      if (dataUser.volunteer.status) {
        if (dataUser.volunteer.status.toLowerCase().includes("pending")) volunteerStatus = "pending";
        else if (dataUser.volunteer.status.toLowerCase().includes("approve")) volunteerStatus = "approved";
        else if (dataUser.volunteer.status.toLowerCase().includes("reject")) volunteerStatus = "rejected";
      } else if (dataUser.volunteer.approval_status_id) {
        if (dataUser.volunteer.approval_status_id === 1) volunteerStatus = "pending";
        else if (dataUser.volunteer.approval_status_id === 2) volunteerStatus = "approved";
        else if (dataUser.volunteer.approval_status_id === 3) volunteerStatus = "rejected";
      }
    } else if (dataUser.approval_status_id) {
      if (dataUser.approval_status_id === 1) volunteerStatus = "pending";
      else if (dataUser.approval_status_id === 2) volunteerStatus = "approved";
      else if (dataUser.approval_status_id === 3) volunteerStatus = "rejected";
    }

    let volunteer: Volunteer | undefined = undefined;

    if (dataUser.volunteer) {
      volunteer = {
        approval_status_id:  dataUser.volunteer.approval_status_id,
        status:              dataUser.volunteer.status,
        badges:              dataUser.volunteer.badges || [],
        volunteer_since:     dataUser.volunteer.volunteer_since,
        has_car:             dataUser.volunteer.has_car === 1 || dataUser.volunteer.has_car === true,
        can_foster:          dataUser.volunteer.can_foster === 1 || dataUser.volunteer.can_foster === true,
        animal_handling:     dataUser.volunteer.animal_handling || "",
        city:                dataUser.volunteer.city || null,
        total_tasks:         dataUser.volunteer.total_tasks || 0,
        availability_status: dataUser.volunteer.availability_status || "available",
      };
    } else if (roleId === 2) {
      volunteer = {
        approval_status_id:  dataUser.approval_status_id || 1,
        status:              volunteerStatus,
        badges:              [],
        volunteer_since:     dataUser.joined_at || new Date().toISOString(),
        has_car:             dataUser.has_car === 1 || dataUser.has_car === true,
        can_foster:          dataUser.can_foster === 1 || dataUser.can_foster === true,
        animal_handling:     dataUser.animal_handling || "",
        city:                dataUser.city || null,
        total_tasks:         0,
        availability_status: "available",
      };
    }

    return {
      user_id:           dataUser.user_id ?? dataUser.id,
      username:          dataUser.username,
      email:             dataUser.email,
      phone:             dataUser.phone || "",
      profile_image_url: dataUser.profile_image_url || undefined,
      role,
      created_at:        dataUser.created_at ?? new Date().toISOString(),
      volunteer_status:  volunteerStatus,
      volunteer,
    };
  };

  // NOTE: login does NOT touch the `loading` flag — that flag is only for
  // the initial hydration check. Toggling it here would cause ProtectedRoute
  // to flash the spinner and could re-trigger redirects.
  const login = async (
    emailOrUsername: string,
    password: string,
    rememberMe: boolean = false
  ) => {
    try {
      const res = await fetch("http://localhost:5000/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: emailOrUsername, password }),
      });

      const data = await res.json();
      if (!res.ok) return false;

      const mappedUser = mapUser(data.user);
      setUser(mappedUser);

      if (rememberMe) {
        localStorage.setItem("resqall_user", JSON.stringify(mappedUser));
        localStorage.setItem("token", data.token);
        sessionStorage.removeItem("resqall_user");
        sessionStorage.removeItem("token");
      } else {
        sessionStorage.setItem("resqall_user", JSON.stringify(mappedUser));
        sessionStorage.setItem("token", data.token);
        localStorage.removeItem("resqall_user");
        localStorage.removeItem("token");
      }

      return true;
    } catch (err) {
      console.error("Login error:", err);
      return false;
    }
  };

  const register = async (
    username: string,
    email: string,
    password: string,
    phone: string,
    isVolunteer: boolean,
    volunteerDetails?: VolunteerDetails
  ) => {
    try {
      const body: any = { username, email, password, phone, isVolunteer };

      if (isVolunteer && volunteerDetails) {
        body.has_car         = volunteerDetails.hasCar;
        body.can_foster      = volunteerDetails.canFoster;
        body.animal_handling = volunteerDetails.animalHandling;
        body.city            = volunteerDetails.city;
      }

      const res = await fetch("http://localhost:5000/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.message || "Registration failed");

      const mappedUser = mapUser(data.user);
      setUser(mappedUser);
      sessionStorage.setItem("resqall_user", JSON.stringify(mappedUser));
      sessionStorage.setItem("token", data.token);

      return true;
    } catch (err: any) {
      console.error("Register error:", err);
      throw err;
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("resqall_user");
    localStorage.removeItem("token");
    sessionStorage.removeItem("resqall_user");
    sessionStorage.removeItem("token");
  };

  const updateUserProfile = async (userId: number, data: Partial<User>) => {
    try {
      const token =
        localStorage.getItem("token") || sessionStorage.getItem("token");

      const res = await fetch(`http://localhost:5000/api/users/${userId}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(data),
      });

      if (!res.ok) throw new Error("Update failed");

      const updatedData = await res.json();
      const mappedUser = mapUser(updatedData.user || updatedData);
      setUser(mappedUser);

      // Mirror to whichever storage has the active session
      if (localStorage.getItem("resqall_user")) {
        localStorage.setItem("resqall_user", JSON.stringify(mappedUser));
      } else {
        sessionStorage.setItem("resqall_user", JSON.stringify(mappedUser));
      }

      return true;
    } catch (err) {
      console.error(err);
      return false;
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: !!user,
        loading,
        login,
        register,
        logout,
        updateUserProfile,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth must be used within AuthProvider");
  return context;
};