// // import React, { createContext, useContext, useEffect, useState } from "react";
// // import { User } from "../types/types";

// // interface AuthContextType {
// //   user: User | null;
// //   isAuthenticated: boolean;
// //   login: (emailOrUsername: string, password: string) => Promise<boolean>;
// //   register: (
// //     username: string,
// //     email: string,
// //     password: string,
// //     phone: string,
// //     isVolunteer: boolean
// //   ) => Promise<boolean>;
// //   logout: () => void;
// //   updateUserProfile: (userId: number, data: Partial<User>) => Promise<boolean>;
// // }

// // const AuthContext = createContext<AuthContextType | undefined>(undefined);

// // export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
// //   const [user, setUser] = useState<User | null>(null);

// //   useEffect(() => {
// //     const storedUser = localStorage.getItem("resqall_user");
// //     if (storedUser) {
// //       try {
// //         const parsedUser: User = JSON.parse(storedUser);
// //         setUser(parsedUser);
// //       } catch {
// //         localStorage.removeItem("resqall_user");
// //       }
// //     }
// //   }, []);

// //   // 🔹 Fixed mapRole
// //   const mapRole = (dataUser: any): User => {
// //     let role_name: "user" | "volunteer" | "admin" = "user";
// //     if (dataUser.role_id === 1) role_name = "user";
// //     else if (dataUser.role_id === 2) role_name = "volunteer";
// //     else if (dataUser.role_id === 3) role_name = "admin";

// //     return {
// //       ...dataUser,
// //       user_id: dataUser.user_id, // ✅ use 'user_id' from backend
// //       role: { role_name },
// //       volunteerStatus: dataUser.volunteerStatus ?? "none",
// //     };
// //   };

// //   const login = async (emailOrUsername: string, password: string) => {
// //     try {
// //       const res = await fetch("http://localhost:5000/api/auth/login", {
// //         method: "POST",
// //         headers: { "Content-Type": "application/json" },
// //         body: JSON.stringify({ email: emailOrUsername, password }),
// //       });

// //       const data = await res.json();
// //       console.log("Login response:", res.status, data);

// //       if (!res.ok) return false;

// //       const mappedUser = mapRole(data.user);
// //       setUser(mappedUser);
// //       localStorage.setItem("resqall_user", JSON.stringify(mappedUser));
// //       localStorage.setItem("token", data.token);
// //       return true;
// //     } catch (err) {
// //       console.error("Login error:", err);
// //       return false;
// //     }
// //   };

// //   const register = async (
// //     username: string,
// //     email: string,
// //     password: string,
// //     phone: string,
// //     isVolunteer: boolean
// //   ) => {
// //     try {
// //       const body: any = { username, email, password, isVolunteer };
// //       if (phone?.trim()) body.phone = phone;

// //       const res = await fetch("http://localhost:5000/api/auth/register", {
// //         method: "POST",
// //         headers: { "Content-Type": "application/json" },
// //         body: JSON.stringify(body),
// //       });

// //       const data = await res.json();

// //       if (!res.ok) throw new Error(data.message || "Registration failed");

// //       const mappedUser = mapRole(data.user);
// //       setUser(mappedUser);
// //       localStorage.setItem("resqall_user", JSON.stringify(mappedUser));
// //       localStorage.setItem("token", data.token);
// //       return true;
// //     } catch (err: any) {
// //       console.error("Register error:", err);
// //       throw err;
// //     }
// //   };

// //   const logout = () => {
// //     setUser(null);
// //     localStorage.removeItem("resqall_user");
// //     localStorage.removeItem("token");
// //   };

// //   const updateUserProfile = async (userId: number, data: Partial<User>) => {
// //     try {
// //       const token = localStorage.getItem("token");
// //       const res = await fetch(`http://localhost:5000/api/users/${userId}`, {
// //         method: "PUT",
// //         headers: {
// //           "Content-Type": "application/json",
// //           Authorization: `Bearer ${token}`,
// //         },
// //         body: JSON.stringify(data),
// //       });

// //       if (!res.ok) throw new Error("Update failed");

// //       const updatedData = await res.json();
// //       const mappedUser = mapRole(updatedData);
// //       setUser(mappedUser);
// //       localStorage.setItem("resqall_user", JSON.stringify(mappedUser));
// //       return true;
// //     } catch (err) {
// //       console.error(err);
// //       return false;
// //     }
// //   };

// //   return (
// //     <AuthContext.Provider
// //       value={{ user, isAuthenticated: !!user, login, register, logout, updateUserProfile }}
// //     >
// //       {children}
// //     </AuthContext.Provider>
// //   );
// // };

// // export const useAuth = () => {
// //   const context = useContext(AuthContext);
// //   if (!context) throw new Error("useAuth must be used within AuthProvider");
// //   return context;
// // };


// // src/context/AuthContext.tsx
// import React, { createContext, useContext, useEffect, useState } from "react";
// import { User } from "../types/types";

// interface AuthContextType {
//   user: User | null;
//   isAuthenticated: boolean;
//   login: (emailOrUsername: string, password: string) => Promise<boolean>;
//   register: (
//     username: string,
//     email: string,
//     password: string,
//     phone: string,
//     isVolunteer: boolean
//   ) => Promise<boolean>;
//   logout: () => void;
//   updateUserProfile: (userId: number, data: Partial<User>) => Promise<boolean>;
// }

// const AuthContext = createContext<AuthContextType | undefined>(undefined);

// export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
//   const [user, setUser] = useState<User | null>(null);

//   useEffect(() => {
//     const storedUser = localStorage.getItem("resqall_user");
//     if (storedUser) {
//       try {
//         const parsedUser: User = JSON.parse(storedUser);
//         setUser(parsedUser);
//       } catch {
//         localStorage.removeItem("resqall_user");
//       }
//     }
//   }, []);

//   // Map backend response to frontend User type
//   const mapRole = (dataUser: any): User => {
//     let role_name: "user" | "volunteer" | "admin" = "user";
//     if (dataUser.role_id === 1) role_name = "user";
//     else if (dataUser.role_id === 2) role_name = "volunteer";
//     else if (dataUser.role_id === 3) role_name = "admin";

//     return {
//       ...dataUser,
//       user_id: dataUser.user_id ?? dataUser.id, // <- fix undefined user_id
//       username: dataUser.username,
//       email: dataUser.email,
//       phone: dataUser.phone,
//       profile_image_url: dataUser.profile_image_url ?? null,
//       role: { role_name },
//       volunteerStatus: dataUser.volunteerStatus ?? "none",
//       created_at: dataUser.created_at ?? new Date().toISOString(),
//     };
//   };

//   const login = async (emailOrUsername: string, password: string) => {
//     try {
//       const res = await fetch("http://localhost:5000/api/auth/login", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({ email: emailOrUsername, password }),
//       });

//       const data = await res.json();
//       if (!res.ok) return false;

//       const mappedUser = mapRole(data.user);
//       setUser(mappedUser);
//       localStorage.setItem("resqall_user", JSON.stringify(mappedUser));
//       localStorage.setItem("token", data.token);
//       return true;
//     } catch (err) {
//       console.error("Login error:", err);
//       return false;
//     }
//   };

//   const register = async (
//     username: string,
//     email: string,
//     password: string,
//     phone: string,
//     isVolunteer: boolean
//   ) => {
//     try {
//       const body: any = { username, email, password, isVolunteer };
//       if (phone?.trim()) body.phone = phone;

//       const res = await fetch("http://localhost:5000/api/auth/register", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify(body),
//       });

//       const data = await res.json();
//       if (!res.ok) throw new Error(data.message || "Registration failed");

//       const mappedUser = mapRole(data.user);
//       setUser(mappedUser);
//       localStorage.setItem("resqall_user", JSON.stringify(mappedUser));
//       localStorage.setItem("token", data.token);
//       return true;
//     } catch (err: any) {
//       console.error("Register error:", err);
//       throw err;
//     }
//   };

//   const logout = () => {
//     setUser(null);
//     localStorage.removeItem("resqall_user");
//     localStorage.removeItem("token");
//   };

//   const updateUserProfile = async (userId: number, data: Partial<User>) => {
//     try {
//       const token = localStorage.getItem("token");
//       const res = await fetch(`http://localhost:5000/api/users/${userId}`, {
//         method: "PUT",
//         headers: {
//           "Content-Type": "application/json",
//           Authorization: `Bearer ${token}`,
//         },
//         body: JSON.stringify(data),
//       });

//       if (!res.ok) throw new Error("Update failed");

//       const updatedData = await res.json();
//       const mappedUser = mapRole(updatedData);
//       setUser(mappedUser);
//       localStorage.setItem("resqall_user", JSON.stringify(mappedUser));
//       return true;
//     } catch (err) {
//       console.error(err);
//       return false;
//     }
//   };

//   return (
//     <AuthContext.Provider
//       value={{ user, isAuthenticated: !!user, login, register, logout, updateUserProfile }}
//     >
//       {children}
//     </AuthContext.Provider>
//   );
// };

// export const useAuth = () => {
//   const context = useContext(AuthContext);
//   if (!context) throw new Error("useAuth must be used within AuthProvider");
//   return context;
// };

// src/context/AuthContext.tsx
// 

import React, { createContext, useContext, useEffect, useState } from "react";
import { User, Role } from "../types/types";

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  login: (emailOrUsername: string, password: string) => Promise<boolean>;
  register: (
    username: string,
    email: string,
    password: string,
    phone: string,
    isVolunteer: boolean
  ) => Promise<boolean>;
  logout: () => void;
  updateUserProfile: (userId: number, data: Partial<User>) => Promise<boolean>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const storedUser = localStorage.getItem("resqall_user");
    if (storedUser) {
      try {
        const parsedUser: User = JSON.parse(storedUser);
        setUser(parsedUser);
      } catch {
        localStorage.removeItem("resqall_user");
      }
    }
  }, []);

  // Map backend response to frontend User type - FIXED VERSION
  const mapRole = (dataUser: any): User => {
    console.log("Mapping user data from API:", dataUser);
    
    const roleId = dataUser.role_id;
    let roleName: "user" | "volunteer" | "admin" = "user";
    
    if (roleId === 1) roleName = "user";
    else if (roleId === 2) roleName = "volunteer";
    else if (roleId === 3) roleName = "admin";

    // Create the Role object with both required fields
    const role: Role = {
      role_id: roleId,
      role_name: roleName
    };

    // Create mapped user with all required fields
    const mappedUser: User = {
      user_id: dataUser.user_id ?? dataUser.id,
      username: dataUser.username,
      email: dataUser.email,
      phone: dataUser.phone || "",
      profile_image_url: dataUser.profile_image_url || undefined,
      role: role, // This now has both role_id and role_name
      created_at: dataUser.created_at ?? new Date().toISOString(),
      
      // Add extra fields that Dashboard needs (outside the User type)
      ...(dataUser.approval_status_id && { approval_status_id: dataUser.approval_status_id }),
      ...(dataUser.volunteer_status && { volunteer_status: dataUser.volunteer_status }),
      ...(dataUser.volunteer && { volunteer: dataUser.volunteer })
    };

    console.log("Mapped User (final):", mappedUser);
    
    return mappedUser;
  };

  const login = async (emailOrUsername: string, password: string) => {
    try {
      const res = await fetch("http://localhost:5000/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: emailOrUsername, password }),
      });

      const data = await res.json();
      console.log("Login API Response:", data);
      
      if (!res.ok) return false;

      const mappedUser = mapRole(data.user);
      setUser(mappedUser);
      localStorage.setItem("resqall_user", JSON.stringify(mappedUser));
      localStorage.setItem("token", data.token);
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
    isVolunteer: boolean
  ) => {
    try {
      const body: any = { 
        username, 
        email, 
        password, 
        isVolunteer 
      };
      if (phone?.trim()) body.phone = phone;

      console.log("Registration Request Body:", body);

      const res = await fetch("http://localhost:5000/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });

      const data = await res.json();
      console.log("Registration API Response:", data);
      
      if (!res.ok) throw new Error(data.message || "Registration failed");

      const mappedUser = mapRole(data.user);
      setUser(mappedUser);
      localStorage.setItem("resqall_user", JSON.stringify(mappedUser));
      localStorage.setItem("token", data.token);
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
  };

  const updateUserProfile = async (userId: number, data: Partial<User>) => {
    try {
      const token = localStorage.getItem("token");
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
      const mappedUser = mapRole(updatedData.user || updatedData);
      setUser(mappedUser);
      localStorage.setItem("resqall_user", JSON.stringify(mappedUser));
      return true;
    } catch (err) {
      console.error(err);
      return false;
    }
  };

  return (
    <AuthContext.Provider
      value={{ user, isAuthenticated: !!user, login, register, logout, updateUserProfile }}
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