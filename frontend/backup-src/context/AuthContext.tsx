// // // // // import React, { createContext, useContext, useEffect, useState } from "react";
// // // // // import { User } from "../types/types";

// // // // // interface AuthContextType {
// // // // //   user: User | null;
// // // // //   isAuthenticated: boolean;
// // // // //   login: (emailOrUsername: string, password: string) => Promise<boolean>;
// // // // //   register: (
// // // // //     username: string,
// // // // //     email: string,
// // // // //     password: string,
// // // // //     phone: string,
// // // // //     isVolunteer: boolean
// // // // //   ) => Promise<boolean>;
// // // // //   logout: () => void;
// // // // //   updateUserProfile: (userId: number, data: Partial<User>) => Promise<boolean>;
// // // // // }

// // // // // const AuthContext = createContext<AuthContextType | undefined>(undefined);

// // // // // export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
// // // // //   const [user, setUser] = useState<User | null>(null);

// // // // //   useEffect(() => {
// // // // //     const storedUser = localStorage.getItem("resqall_user");
// // // // //     if (storedUser) {
// // // // //       try {
// // // // //         const parsedUser: User = JSON.parse(storedUser);
// // // // //         setUser(parsedUser);
// // // // //       } catch {
// // // // //         localStorage.removeItem("resqall_user");
// // // // //       }
// // // // //     }
// // // // //   }, []);

// // // // //   // 🔹 Fixed mapRole
// // // // //   const mapRole = (dataUser: any): User => {
// // // // //     let role_name: "user" | "volunteer" | "admin" = "user";
// // // // //     if (dataUser.role_id === 1) role_name = "user";
// // // // //     else if (dataUser.role_id === 2) role_name = "volunteer";
// // // // //     else if (dataUser.role_id === 3) role_name = "admin";

// // // // //     return {
// // // // //       ...dataUser,
// // // // //       user_id: dataUser.user_id, // ✅ use 'user_id' from backend
// // // // //       role: { role_name },
// // // // //       volunteerStatus: dataUser.volunteerStatus ?? "none",
// // // // //     };
// // // // //   };

// // // // //   const login = async (emailOrUsername: string, password: string) => {
// // // // //     try {
// // // // //       const res = await fetch("http://localhost:5000/api/auth/login", {
// // // // //         method: "POST",
// // // // //         headers: { "Content-Type": "application/json" },
// // // // //         body: JSON.stringify({ email: emailOrUsername, password }),
// // // // //       });

// // // // //       const data = await res.json();
// // // // //       console.log("Login response:", res.status, data);

// // // // //       if (!res.ok) return false;

// // // // //       const mappedUser = mapRole(data.user);
// // // // //       setUser(mappedUser);
// // // // //       localStorage.setItem("resqall_user", JSON.stringify(mappedUser));
// // // // //       localStorage.setItem("token", data.token);
// // // // //       return true;
// // // // //     } catch (err) {
// // // // //       console.error("Login error:", err);
// // // // //       return false;
// // // // //     }
// // // // //   };

// // // // //   const register = async (
// // // // //     username: string,
// // // // //     email: string,
// // // // //     password: string,
// // // // //     phone: string,
// // // // //     isVolunteer: boolean
// // // // //   ) => {
// // // // //     try {
// // // // //       const body: any = { username, email, password, isVolunteer };
// // // // //       if (phone?.trim()) body.phone = phone;

// // // // //       const res = await fetch("http://localhost:5000/api/auth/register", {
// // // // //         method: "POST",
// // // // //         headers: { "Content-Type": "application/json" },
// // // // //         body: JSON.stringify(body),
// // // // //       });

// // // // //       const data = await res.json();

// // // // //       if (!res.ok) throw new Error(data.message || "Registration failed");

// // // // //       const mappedUser = mapRole(data.user);
// // // // //       setUser(mappedUser);
// // // // //       localStorage.setItem("resqall_user", JSON.stringify(mappedUser));
// // // // //       localStorage.setItem("token", data.token);
// // // // //       return true;
// // // // //     } catch (err: any) {
// // // // //       console.error("Register error:", err);
// // // // //       throw err;
// // // // //     }
// // // // //   };

// // // // //   const logout = () => {
// // // // //     setUser(null);
// // // // //     localStorage.removeItem("resqall_user");
// // // // //     localStorage.removeItem("token");
// // // // //   };

// // // // //   const updateUserProfile = async (userId: number, data: Partial<User>) => {
// // // // //     try {
// // // // //       const token = localStorage.getItem("token");
// // // // //       const res = await fetch(`http://localhost:5000/api/users/${userId}`, {
// // // // //         method: "PUT",
// // // // //         headers: {
// // // // //           "Content-Type": "application/json",
// // // // //           Authorization: `Bearer ${token}`,
// // // // //         },
// // // // //         body: JSON.stringify(data),
// // // // //       });

// // // // //       if (!res.ok) throw new Error("Update failed");

// // // // //       const updatedData = await res.json();
// // // // //       const mappedUser = mapRole(updatedData);
// // // // //       setUser(mappedUser);
// // // // //       localStorage.setItem("resqall_user", JSON.stringify(mappedUser));
// // // // //       return true;
// // // // //     } catch (err) {
// // // // //       console.error(err);
// // // // //       return false;
// // // // //     }
// // // // //   };

// // // // //   return (
// // // // //     <AuthContext.Provider
// // // // //       value={{ user, isAuthenticated: !!user, login, register, logout, updateUserProfile }}
// // // // //     >
// // // // //       {children}
// // // // //     </AuthContext.Provider>
// // // // //   );
// // // // // };

// // // // // export const useAuth = () => {
// // // // //   const context = useContext(AuthContext);
// // // // //   if (!context) throw new Error("useAuth must be used within AuthProvider");
// // // // //   return context;
// // // // // };


// // // // // src/context/AuthContext.tsx
// // // // import React, { createContext, useContext, useEffect, useState } from "react";
// // // // import { User } from "../types/types";

// // // // interface AuthContextType {
// // // //   user: User | null;
// // // //   isAuthenticated: boolean;
// // // //   login: (emailOrUsername: string, password: string) => Promise<boolean>;
// // // //   register: (
// // // //     username: string,
// // // //     email: string,
// // // //     password: string,
// // // //     phone: string,
// // // //     isVolunteer: boolean
// // // //   ) => Promise<boolean>;
// // // //   logout: () => void;
// // // //   updateUserProfile: (userId: number, data: Partial<User>) => Promise<boolean>;
// // // // }

// // // // const AuthContext = createContext<AuthContextType | undefined>(undefined);

// // // // export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
// // // //   const [user, setUser] = useState<User | null>(null);

// // // //   useEffect(() => {
// // // //     const storedUser = localStorage.getItem("resqall_user");
// // // //     if (storedUser) {
// // // //       try {
// // // //         const parsedUser: User = JSON.parse(storedUser);
// // // //         setUser(parsedUser);
// // // //       } catch {
// // // //         localStorage.removeItem("resqall_user");
// // // //       }
// // // //     }
// // // //   }, []);

// // // //   // Map backend response to frontend User type
// // // //   const mapRole = (dataUser: any): User => {
// // // //     let role_name: "user" | "volunteer" | "admin" = "user";
// // // //     if (dataUser.role_id === 1) role_name = "user";
// // // //     else if (dataUser.role_id === 2) role_name = "volunteer";
// // // //     else if (dataUser.role_id === 3) role_name = "admin";

// // // //     return {
// // // //       ...dataUser,
// // // //       user_id: dataUser.user_id ?? dataUser.id, // <- fix undefined user_id
// // // //       username: dataUser.username,
// // // //       email: dataUser.email,
// // // //       phone: dataUser.phone,
// // // //       profile_image_url: dataUser.profile_image_url ?? null,
// // // //       role: { role_name },
// // // //       volunteerStatus: dataUser.volunteerStatus ?? "none",
// // // //       created_at: dataUser.created_at ?? new Date().toISOString(),
// // // //     };
// // // //   };

// // // //   const login = async (emailOrUsername: string, password: string) => {
// // // //     try {
// // // //       const res = await fetch("http://localhost:5000/api/auth/login", {
// // // //         method: "POST",
// // // //         headers: { "Content-Type": "application/json" },
// // // //         body: JSON.stringify({ email: emailOrUsername, password }),
// // // //       });

// // // //       const data = await res.json();
// // // //       if (!res.ok) return false;

// // // //       const mappedUser = mapRole(data.user);
// // // //       setUser(mappedUser);
// // // //       localStorage.setItem("resqall_user", JSON.stringify(mappedUser));
// // // //       localStorage.setItem("token", data.token);
// // // //       return true;
// // // //     } catch (err) {
// // // //       console.error("Login error:", err);
// // // //       return false;
// // // //     }
// // // //   };

// // // //   const register = async (
// // // //     username: string,
// // // //     email: string,
// // // //     password: string,
// // // //     phone: string,
// // // //     isVolunteer: boolean
// // // //   ) => {
// // // //     try {
// // // //       const body: any = { username, email, password, isVolunteer };
// // // //       if (phone?.trim()) body.phone = phone;

// // // //       const res = await fetch("http://localhost:5000/api/auth/register", {
// // // //         method: "POST",
// // // //         headers: { "Content-Type": "application/json" },
// // // //         body: JSON.stringify(body),
// // // //       });

// // // //       const data = await res.json();
// // // //       if (!res.ok) throw new Error(data.message || "Registration failed");

// // // //       const mappedUser = mapRole(data.user);
// // // //       setUser(mappedUser);
// // // //       localStorage.setItem("resqall_user", JSON.stringify(mappedUser));
// // // //       localStorage.setItem("token", data.token);
// // // //       return true;
// // // //     } catch (err: any) {
// // // //       console.error("Register error:", err);
// // // //       throw err;
// // // //     }
// // // //   };

// // // //   const logout = () => {
// // // //     setUser(null);
// // // //     localStorage.removeItem("resqall_user");
// // // //     localStorage.removeItem("token");
// // // //   };

// // // //   const updateUserProfile = async (userId: number, data: Partial<User>) => {
// // // //     try {
// // // //       const token = localStorage.getItem("token");
// // // //       const res = await fetch(`http://localhost:5000/api/users/${userId}`, {
// // // //         method: "PUT",
// // // //         headers: {
// // // //           "Content-Type": "application/json",
// // // //           Authorization: `Bearer ${token}`,
// // // //         },
// // // //         body: JSON.stringify(data),
// // // //       });

// // // //       if (!res.ok) throw new Error("Update failed");

// // // //       const updatedData = await res.json();
// // // //       const mappedUser = mapRole(updatedData);
// // // //       setUser(mappedUser);
// // // //       localStorage.setItem("resqall_user", JSON.stringify(mappedUser));
// // // //       return true;
// // // //     } catch (err) {
// // // //       console.error(err);
// // // //       return false;
// // // //     }
// // // //   };

// // // //   return (
// // // //     <AuthContext.Provider
// // // //       value={{ user, isAuthenticated: !!user, login, register, logout, updateUserProfile }}
// // // //     >
// // // //       {children}
// // // //     </AuthContext.Provider>
// // // //   );
// // // // };

// // // // export const useAuth = () => {
// // // //   const context = useContext(AuthContext);
// // // //   if (!context) throw new Error("useAuth must be used within AuthProvider");
// // // //   return context;
// // // // };

// // // // src/context/AuthContext.tsx
// // // // 

// // // import React, { createContext, useContext, useEffect, useState } from "react";
// // // import { User, Role } from "../types/types";

// // // interface AuthContextType {
// // //   user: User | null;
// // //   isAuthenticated: boolean;
// // //   login: (emailOrUsername: string, password: string) => Promise<boolean>;
// // //   register: (
// // //     username: string,
// // //     email: string,
// // //     password: string,
// // //     phone: string,
// // //     isVolunteer: boolean
// // //   ) => Promise<boolean>;
// // //   logout: () => void;
// // //   updateUserProfile: (userId: number, data: Partial<User>) => Promise<boolean>;
// // // }

// // // const AuthContext = createContext<AuthContextType | undefined>(undefined);

// // // export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
// // //   const [user, setUser] = useState<User | null>(null);

// // //   useEffect(() => {
// // //     const storedUser = localStorage.getItem("resqall_user");
// // //     if (storedUser) {
// // //       try {
// // //         const parsedUser: User = JSON.parse(storedUser);
// // //         setUser(parsedUser);
// // //       } catch {
// // //         localStorage.removeItem("resqall_user");
// // //       }
// // //     }
// // //   }, []);

// // //   // Map backend response to frontend User type - FIXED VERSION
// // //   const mapRole = (dataUser: any): User => {
// // //     console.log("Mapping user data from API:", dataUser);
    
// // //     const roleId = dataUser.role_id;
// // //     let roleName: "user" | "volunteer" | "admin" = "user";
    
// // //     if (roleId === 1) roleName = "user";
// // //     else if (roleId === 2) roleName = "volunteer";
// // //     else if (roleId === 3) roleName = "admin";

// // //     // Create the Role object with both required fields
// // //     const role: Role = {
// // //       role_id: roleId,
// // //       role_name: roleName
// // //     };

// // //     // Create mapped user with all required fields
// // //     const mappedUser: User = {
// // //       user_id: dataUser.user_id ?? dataUser.id,
// // //       username: dataUser.username,
// // //       email: dataUser.email,
// // //       phone: dataUser.phone || "",
// // //       profile_image_url: dataUser.profile_image_url || undefined,
// // //       role: role, // This now has both role_id and role_name
// // //       created_at: dataUser.created_at ?? new Date().toISOString(),
      
// // //       // Add extra fields that Dashboard needs (outside the User type)
// // //       ...(dataUser.approval_status_id && { approval_status_id: dataUser.approval_status_id }),
// // //       ...(dataUser.volunteer_status && { volunteer_status: dataUser.volunteer_status }),
// // //       ...(dataUser.volunteer && { volunteer: dataUser.volunteer })
// // //     };

// // //     console.log("Mapped User (final):", mappedUser);
    
// // //     return mappedUser;
// // //   };

// // //   const login = async (emailOrUsername: string, password: string) => {
// // //     try {
// // //       const res = await fetch("http://localhost:5000/api/auth/login", {
// // //         method: "POST",
// // //         headers: { "Content-Type": "application/json" },
// // //         body: JSON.stringify({ email: emailOrUsername, password }),
// // //       });

// // //       const data = await res.json();
// // //       console.log("Login API Response:", data);
      
// // //       if (!res.ok) return false;

// // //       const mappedUser = mapRole(data.user);
// // //       setUser(mappedUser);
// // //       localStorage.setItem("resqall_user", JSON.stringify(mappedUser));
// // //       localStorage.setItem("token", data.token);
// // //       return true;
// // //     } catch (err) {
// // //       console.error("Login error:", err);
// // //       return false;
// // //     }
// // //   };

// // //   const register = async (
// // //     username: string,
// // //     email: string,
// // //     password: string,
// // //     phone: string,
// // //     isVolunteer: boolean
// // //   ) => {
// // //     try {
// // //       const body: any = { 
// // //         username, 
// // //         email, 
// // //         password, 
// // //         isVolunteer 
// // //       };
// // //       if (phone?.trim()) body.phone = phone;

// // //       console.log("Registration Request Body:", body);

// // //       const res = await fetch("http://localhost:5000/api/auth/register", {
// // //         method: "POST",
// // //         headers: { "Content-Type": "application/json" },
// // //         body: JSON.stringify(body),
// // //       });

// // //       const data = await res.json();
// // //       console.log("Registration API Response:", data);
      
// // //       if (!res.ok) throw new Error(data.message || "Registration failed");

// // //       const mappedUser = mapRole(data.user);
// // //       setUser(mappedUser);
// // //       localStorage.setItem("resqall_user", JSON.stringify(mappedUser));
// // //       localStorage.setItem("token", data.token);
// // //       return true;
// // //     } catch (err: any) {
// // //       console.error("Register error:", err);
// // //       throw err;
// // //     }
// // //   };

// // //   const logout = () => {
// // //     setUser(null);
// // //     localStorage.removeItem("resqall_user");
// // //     localStorage.removeItem("token");
// // //   };

// // //   const updateUserProfile = async (userId: number, data: Partial<User>) => {
// // //     try {
// // //       const token = localStorage.getItem("token");
// // //       const res = await fetch(`http://localhost:5000/api/users/${userId}`, {
// // //         method: "PATCH",
// // //         headers: {
// // //           "Content-Type": "application/json",
// // //           Authorization: `Bearer ${token}`,
// // //         },
// // //         body: JSON.stringify(data),
// // //       });

// // //       if (!res.ok) throw new Error("Update failed");

// // //       const updatedData = await res.json();
// // //       const mappedUser = mapRole(updatedData.user || updatedData);
// // //       setUser(mappedUser);
// // //       localStorage.setItem("resqall_user", JSON.stringify(mappedUser));
// // //       return true;
// // //     } catch (err) {
// // //       console.error(err);
// // //       return false;
// // //     }
// // //   };

// // //   return (
// // //     <AuthContext.Provider
// // //       value={{ user, isAuthenticated: !!user, login, register, logout, updateUserProfile }}
// // //     >
// // //       {children}
// // //     </AuthContext.Provider>
// // //   );
// // // };

// // // export const useAuth = () => {
// // //   const context = useContext(AuthContext);
// // //   if (!context) throw new Error("useAuth must be used within AuthProvider");
// // //   return context;
// // // };



// // // src/context/AuthContext.tsx
// // import React, { createContext, useContext, useEffect, useState } from "react";
// // import { User, Role, Volunteer } from "../types/types";

// // // Define the interface for volunteer details
// // export interface VolunteerDetails {
// //   hasCar: boolean;
// //   canFoster: boolean;
// //   animalHandling: string;
// //   city: string;
// // }

// // interface AuthContextType {
// //   user: User | null;
// //   isAuthenticated: boolean;
// //   login: (emailOrUsername: string, password: string) => Promise<boolean>;
// //   register: (
// //     username: string,
// //     email: string,
// //     password: string,
// //     phone: string,
// //     isVolunteer: boolean,
// //     volunteerDetails?: VolunteerDetails
// //   ) => Promise<boolean>;
// //   logout: () => void;
// //   updateUserProfile: (userId: number, data: Partial<User>) => Promise<boolean>;
// // }

// // const AuthContext = createContext<AuthContextType | undefined>(undefined);

// // export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
// //   const [user, setUser] = useState<User | null>(null);

// //   // Load user from localStorage on initial mount (SESSION PERSISTENCE)
// //   useEffect(() => {
// //     const loadUser = () => {
// //       const storedUser = localStorage.getItem("resqall_user");
// //       const token = localStorage.getItem("token");
      
// //       if (storedUser && token) {
// //         try {
// //           const parsedUser: User = JSON.parse(storedUser);
// //           setUser(parsedUser);
// //           console.log("User loaded from storage:", {
// //             id: parsedUser.user_id,
// //             role: parsedUser.role?.role_name,
// //             volunteer_status: parsedUser.volunteer?.status
// //           });
// //         } catch (error) {
// //           console.error("Error parsing stored user:", error);
// //           localStorage.removeItem("resqall_user");
// //           localStorage.removeItem("token");
// //         }
// //       }
// //     };
    
// //     loadUser();
// //   }, []);

// //   // Map backend response to frontend User type
// //   const mapUser = (dataUser: any): User => {
// //     console.log("Mapping user data from API:", dataUser);
    
// //     // Determine role
// //     const roleId = dataUser.role_id;
// //     let roleName: "user" | "volunteer" | "admin" = "user";
    
// //     if (roleId === 1) roleName = "user";
// //     else if (roleId === 2) roleName = "volunteer";
// //     else if (roleId === 3) roleName = "admin";

// //     // Create role object
// //     const role: Role = {
// //       role_id: roleId,
// //       role_name: roleName
// //     };

// //     // Map volunteer status
// //     let volunteerStatus: "none" | "pending" | "approved" | "rejected" = "none";
    
// //     // Check volunteer data structure
// //     if (dataUser.volunteer) {
// //       // From login/register response
// //       if (dataUser.volunteer.status) {
// //         if (dataUser.volunteer.status.toLowerCase().includes('pending')) volunteerStatus = "pending";
// //         else if (dataUser.volunteer.status.toLowerCase().includes('approve')) volunteerStatus = "approved";
// //         else if (dataUser.volunteer.status.toLowerCase().includes('reject')) volunteerStatus = "rejected";
// //       } else if (dataUser.volunteer.approval_status_id) {
// //         if (dataUser.volunteer.approval_status_id === 1) volunteerStatus = "pending";
// //         else if (dataUser.volunteer.approval_status_id === 2) volunteerStatus = "approved";
// //         else if (dataUser.volunteer.approval_status_id === 3) volunteerStatus = "rejected";
// //       }
// //     } else if (dataUser.approval_status_id) {
// //       // Direct from database
// //       if (dataUser.approval_status_id === 1) volunteerStatus = "pending";
// //       else if (dataUser.approval_status_id === 2) volunteerStatus = "approved";
// //       else if (dataUser.approval_status_id === 3) volunteerStatus = "rejected";
// //     }

// //     // Create volunteer object if applicable (never null, only undefined)
// //     let volunteer: Volunteer | undefined = undefined;
    
// //     if (dataUser.volunteer) {
// //       // Use data from volunteer object
// //       volunteer = {
// //         approval_status_id: dataUser.volunteer.approval_status_id,
// //         status: dataUser.volunteer.status,
// //         badges: dataUser.volunteer.badges || [],
// //         volunteer_since: dataUser.volunteer.volunteer_since,
// //         has_car: dataUser.volunteer.has_car === 1 || dataUser.volunteer.has_car === true,
// //         can_foster: dataUser.volunteer.can_foster === 1 || dataUser.volunteer.can_foster === true,
// //         animal_handling: dataUser.volunteer.animal_handling || '',
// //         city: dataUser.volunteer.city || null,
// //         total_tasks: dataUser.volunteer.total_tasks || 0,
// //         availability_status: dataUser.volunteer.availability_status || 'available'
// //       };
// //     } else if (roleId === 2) {
// //       // Create default volunteer object if role is volunteer but no data
// //       volunteer = {
// //         approval_status_id: dataUser.approval_status_id || 1,
// //         status: volunteerStatus,
// //         badges: [],
// //         volunteer_since: dataUser.joined_at || new Date().toISOString(),
// //         has_car: dataUser.has_car === 1 || dataUser.has_car === true,
// //         can_foster: dataUser.can_foster === 1 || dataUser.can_foster === true,
// //         animal_handling: dataUser.animal_handling || '',
// //         city: dataUser.city || null,
// //         total_tasks: 0,
// //         availability_status: 'available'
// //       };
// //     }

// //     // Create mapped user with all fields
// //     const mappedUser: User = {
// //       // Core user fields
// //       user_id: dataUser.user_id ?? dataUser.id,
// //       username: dataUser.username,
// //       email: dataUser.email,
// //       phone: dataUser.phone || "",
// //       profile_image_url: dataUser.profile_image_url || undefined,
// //       role: role,
// //       created_at: dataUser.created_at ?? new Date().toISOString(),
      
// //       // Status field
// //       volunteer_status: volunteerStatus,
      
// //       // Volunteer object (undefined if not volunteer)
// //       volunteer: volunteer
// //     };

// //     console.log("Mapped User:", {
// //       id: mappedUser.user_id,
// //       role: mappedUser.role?.role_name,
// //       volunteer_status: mappedUser.volunteer?.status,
// //       has_volunteer_data: !!mappedUser.volunteer
// //     });
    
// //     return mappedUser;
// //   };

// //   const login = async (emailOrUsername: string, password: string) => {
// //     try {
// //       const res = await fetch("http://localhost:5000/api/auth/login", {
// //         method: "POST",
// //         headers: { "Content-Type": "application/json" },
// //         body: JSON.stringify({ email: emailOrUsername, password }),
// //       });

// //       const data = await res.json();
// //       console.log("Login API Response:", data);
      
// //       if (!res.ok) return false;

// //       const mappedUser = mapUser(data.user);
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
// //     isVolunteer: boolean,
// //     volunteerDetails?: VolunteerDetails
// //   ) => {
// //     try {
// //       const body: any = { 
// //         username, 
// //         email, 
// //         password, 
// //         phone,
// //         isVolunteer 
// //       };

// //       // Add volunteer details if user is signing up as volunteer
// //       if (isVolunteer && volunteerDetails) {
// //         body.has_car = volunteerDetails.hasCar;
// //         body.can_foster = volunteerDetails.canFoster;
// //         body.animal_handling = volunteerDetails.animalHandling;
// //         body.city = volunteerDetails.city;
// //       }

// //       console.log("Registration Request Body:", body);

// //       const res = await fetch("http://localhost:5000/api/auth/register", {
// //         method: "POST",
// //         headers: { "Content-Type": "application/json" },
// //         body: JSON.stringify(body),
// //       });

// //       const data = await res.json();
// //       console.log("Registration API Response:", data);
      
// //       if (!res.ok) throw new Error(data.message || "Registration failed");

// //       const mappedUser = mapUser(data.user);
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
// //         method: "PATCH",
// //         headers: {
// //           "Content-Type": "application/json",
// //           Authorization: `Bearer ${token}`,
// //         },
// //         body: JSON.stringify(data),
// //       });

// //       if (!res.ok) throw new Error("Update failed");

// //       const updatedData = await res.json();
// //       const mappedUser = mapUser(updatedData.user || updatedData);
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
// //       value={{ 
// //         user, 
// //         isAuthenticated: !!user, 
// //         login, 
// //         register, 
// //         logout, 
// //         updateUserProfile 
// //       }}
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
// import { User, Role, Volunteer } from "../types/types";

// // Define the interface for volunteer details
// export interface VolunteerDetails {
//   hasCar: boolean;
//   canFoster: boolean;
//   animalHandling: string;
//   city: string;
// }

// interface AuthContextType {
//   user: User | null;
//   isAuthenticated: boolean;
//   login: (emailOrUsername: string, password: string) => Promise<boolean>;
//   register: (
//     username: string,
//     email: string,
//     password: string,
//     phone: string,
//     isVolunteer: boolean,
//     volunteerDetails?: VolunteerDetails
//   ) => Promise<boolean>;
//   logout: () => void;
//   updateUserProfile: (userId: number, data: Partial<User>) => Promise<boolean>;
// }

// const AuthContext = createContext<AuthContextType | undefined>(undefined);

// export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
//   const [user, setUser] = useState<User | null>(null);

//   // Load user from localStorage on initial mount (SESSION PERSISTENCE)
//   useEffect(() => {
//     const loadUser = () => {
//       const storedUser = localStorage.getItem("resqall_user");
//       const token = localStorage.getItem("token");
      
//       if (storedUser && token) {
//         try {
//           const parsedUser: User = JSON.parse(storedUser);
//           setUser(parsedUser);
//           console.log("User loaded from storage:", {
//             id: parsedUser.user_id,
//             role: parsedUser.role?.role_name,
//             volunteer_status: parsedUser.volunteer?.status,
//             profile_image: parsedUser.profile_image_url // Add this log
//           });
//         } catch (error) {
//           console.error("Error parsing stored user:", error);
//           localStorage.removeItem("resqall_user");
//           localStorage.removeItem("token");
//         }
//       }
//     };
    
//     loadUser();
//   }, []);

//   // Map backend response to frontend User type
//   const mapUser = (dataUser: any): User => {
//     console.log("Mapping user data from API:", dataUser);
    
//     // Log the profile image URL specifically
//     console.log("Profile image URL from API:", dataUser.profile_image_url);
    
//     // Determine role
//     const roleId = dataUser.role_id;
//     let roleName: "user" | "volunteer" | "admin" = "user";
    
//     if (roleId === 1) roleName = "user";
//     else if (roleId === 2) roleName = "volunteer";
//     else if (roleId === 3) roleName = "admin";

//     // Create role object
//     const role: Role = {
//       role_id: roleId,
//       role_name: roleName
//     };

//     // Map volunteer status
//     let volunteerStatus: "none" | "pending" | "approved" | "rejected" = "none";
    
//     // Check volunteer data structure
//     if (dataUser.volunteer) {
//       // From login/register response
//       if (dataUser.volunteer.status) {
//         if (dataUser.volunteer.status.toLowerCase().includes('pending')) volunteerStatus = "pending";
//         else if (dataUser.volunteer.status.toLowerCase().includes('approve')) volunteerStatus = "approved";
//         else if (dataUser.volunteer.status.toLowerCase().includes('reject')) volunteerStatus = "rejected";
//       } else if (dataUser.volunteer.approval_status_id) {
//         if (dataUser.volunteer.approval_status_id === 1) volunteerStatus = "pending";
//         else if (dataUser.volunteer.approval_status_id === 2) volunteerStatus = "approved";
//         else if (dataUser.volunteer.approval_status_id === 3) volunteerStatus = "rejected";
//       }
//     } else if (dataUser.approval_status_id) {
//       // Direct from database
//       if (dataUser.approval_status_id === 1) volunteerStatus = "pending";
//       else if (dataUser.approval_status_id === 2) volunteerStatus = "approved";
//       else if (dataUser.approval_status_id === 3) volunteerStatus = "rejected";
//     }

//     // Create volunteer object if applicable (never null, only undefined)
//     let volunteer: Volunteer | undefined = undefined;
    
//     if (dataUser.volunteer) {
//       // Use data from volunteer object
//       volunteer = {
//         approval_status_id: dataUser.volunteer.approval_status_id,
//         status: dataUser.volunteer.status,
//         badges: dataUser.volunteer.badges || [],
//         volunteer_since: dataUser.volunteer.volunteer_since,
//         has_car: dataUser.volunteer.has_car === 1 || dataUser.volunteer.has_car === true,
//         can_foster: dataUser.volunteer.can_foster === 1 || dataUser.volunteer.can_foster === true,
//         animal_handling: dataUser.volunteer.animal_handling || '',
//         city: dataUser.volunteer.city || null,
//         total_tasks: dataUser.volunteer.total_tasks || 0,
//         availability_status: dataUser.volunteer.availability_status || 'available'
//       };
//     } else if (roleId === 2) {
//       // Create default volunteer object if role is volunteer but no data
//       volunteer = {
//         approval_status_id: dataUser.approval_status_id || 1,
//         status: volunteerStatus,
//         badges: [],
//         volunteer_since: dataUser.joined_at || new Date().toISOString(),
//         has_car: dataUser.has_car === 1 || dataUser.has_car === true,
//         can_foster: dataUser.can_foster === 1 || dataUser.can_foster === true,
//         animal_handling: dataUser.animal_handling || '',
//         city: dataUser.city || null,
//         total_tasks: 0,
//         availability_status: 'available'
//       };
//     }

//     // Create mapped user with all fields
//     const mappedUser: User = {
//       // Core user fields
//       user_id: dataUser.user_id ?? dataUser.id,
//       username: dataUser.username,
//       email: dataUser.email,
//       phone: dataUser.phone || "",
//       profile_image_url: dataUser.profile_image_url || undefined, // Make sure this is captured
//       role: role,
//       created_at: dataUser.created_at ?? new Date().toISOString(),
      
//       // Status field
//       volunteer_status: volunteerStatus,
      
//       // Volunteer object (undefined if not volunteer)
//       volunteer: volunteer
//     };

//     console.log("Mapped User:", {
//       id: mappedUser.user_id,
//       role: mappedUser.role?.role_name,
//       volunteer_status: mappedUser.volunteer?.status,
//       profile_image: mappedUser.profile_image_url // Log the profile image in the mapped user
//     });
    
//     return mappedUser;
//   };

//   const login = async (emailOrUsername: string, password: string) => {
//     try {
//       const res = await fetch("http://localhost:5000/api/auth/login", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({ email: emailOrUsername, password }),
//       });

//       const data = await res.json();
//       console.log("Login API Response:", data);
      
//       if (!res.ok) return false;

//       const mappedUser = mapUser(data.user);
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
//     isVolunteer: boolean,
//     volunteerDetails?: VolunteerDetails
//   ) => {
//     try {
//       const body: any = { 
//         username, 
//         email, 
//         password, 
//         phone,
//         isVolunteer 
//       };

//       // Add volunteer details if user is signing up as volunteer
//       if (isVolunteer && volunteerDetails) {
//         body.has_car = volunteerDetails.hasCar;
//         body.can_foster = volunteerDetails.canFoster;
//         body.animal_handling = volunteerDetails.animalHandling;
//         body.city = volunteerDetails.city;
//       }

//       console.log("Registration Request Body:", body);

//       const res = await fetch("http://localhost:5000/api/auth/register", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify(body),
//       });

//       const data = await res.json();
//       console.log("Registration API Response:", data);
      
//       if (!res.ok) throw new Error(data.message || "Registration failed");

//       const mappedUser = mapUser(data.user);
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
//         method: "PATCH",
//         headers: {
//           "Content-Type": "application/json",
//           Authorization: `Bearer ${token}`,
//         },
//         body: JSON.stringify(data),
//       });

//       if (!res.ok) throw new Error("Update failed");

//       const updatedData = await res.json();
//       const mappedUser = mapUser(updatedData.user || updatedData);
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
//       value={{ 
//         user, 
//         isAuthenticated: !!user, 
//         login, 
//         register, 
//         logout, 
//         updateUserProfile 
//       }}
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
  loading: boolean; // ADD THIS
  login: (emailOrUsername: string, password: string, rememberMe?: boolean) => Promise<boolean>; // ADD rememberMe
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
  const [loading, setLoading] = useState(true); // ADD THIS

  // Load user from storage on mount - WITH DUAL STORAGE SUPPORT
  useEffect(() => {
    const loadUser = () => {
      try {
        console.log("Checking for existing session...");
        
        // First check localStorage (remember me)
        let storedUser = localStorage.getItem("resqall_user");
        let token = localStorage.getItem("token");
        let storageSource = 'localStorage';
        
        // If not in localStorage, check sessionStorage
        if (!storedUser || !token) {
          storedUser = sessionStorage.getItem("resqall_user");
          token = sessionStorage.getItem("token");
          storageSource = 'sessionStorage';
        }

        if (storedUser && token) {
          const parsedUser: User = JSON.parse(storedUser);
          setUser(parsedUser);
          console.log(`User loaded from ${storageSource}:`, {
            id: parsedUser.user_id,
            role: parsedUser.role?.role_name,
            username: parsedUser.username
          });
        } else {
          console.log("No existing session found");
        }
      } catch (error) {
        console.error("Error loading user:", error);
        localStorage.removeItem("resqall_user");
        localStorage.removeItem("token");
        sessionStorage.removeItem("resqall_user");
        sessionStorage.removeItem("token");
      } finally {
        setLoading(false);
        console.log("Auth loading complete");
      }
    };
    
    loadUser();
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
        approval_status_id:   dataUser.volunteer.approval_status_id,
        status:               dataUser.volunteer.status,
        badges:               dataUser.volunteer.badges || [],
        volunteer_since:      dataUser.volunteer.volunteer_since,
        has_car:              dataUser.volunteer.has_car === 1 || dataUser.volunteer.has_car === true,
        can_foster:           dataUser.volunteer.can_foster === 1 || dataUser.volunteer.can_foster === true,
        animal_handling:      dataUser.volunteer.animal_handling || "",
        city:                 dataUser.volunteer.city || null,
        total_tasks:          dataUser.volunteer.total_tasks || 0,
        availability_status:  dataUser.volunteer.availability_status || "available",
      };
    } else if (roleId === 2) {
      volunteer = {
        approval_status_id:   dataUser.approval_status_id || 1,
        status:               volunteerStatus,
        badges:               [],
        volunteer_since:      dataUser.joined_at || new Date().toISOString(),
        has_car:              dataUser.has_car === 1 || dataUser.has_car === true,
        can_foster:           dataUser.can_foster === 1 || dataUser.can_foster === true,
        animal_handling:      dataUser.animal_handling || "",
        city:                 dataUser.city || null,
        total_tasks:          0,
        availability_status:  "available",
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

  // FIXED login with rememberMe parameter and dual storage
  const login = async (emailOrUsername: string, password: string, rememberMe: boolean = false) => {
    try {
      setLoading(true);
      console.log("Attempting login with rememberMe:", rememberMe);
      
      const res = await fetch("http://localhost:5000/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: emailOrUsername, password }),
      });

      const data = await res.json();
      console.log("Login API Response:", data);
      
      if (!res.ok) return false;

      const mappedUser = mapUser(data.user);
      setUser(mappedUser);
      
      // Store based on remember me preference - DUAL STORAGE
      if (rememberMe) {
        // Persistent login - survives browser restart
        localStorage.setItem("resqall_user", JSON.stringify(mappedUser));
        localStorage.setItem("token", data.token);
        // Clear session storage
        sessionStorage.removeItem("resqall_user");
        sessionStorage.removeItem("token");
        console.log("User saved to localStorage (remember me)");
      } else {
        // Session only - cleared when browser/tab closes
        sessionStorage.setItem("resqall_user", JSON.stringify(mappedUser));
        sessionStorage.setItem("token", data.token);
        // Clear local storage
        localStorage.removeItem("resqall_user");
        localStorage.removeItem("token");
        console.log("User saved to sessionStorage (temporary)");
      }
      
      return true;
    } catch (err) {
      console.error("Login error:", err);
      return false;
    } finally {
      setLoading(false);
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
      setLoading(true);
      
      const body: any = { username, email, password, phone, isVolunteer };

      if (isVolunteer && volunteerDetails) {
        body.has_car        = volunteerDetails.hasCar;
        body.can_foster     = volunteerDetails.canFoster;
        body.animal_handling = volunteerDetails.animalHandling;
        body.city           = volunteerDetails.city;
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
      
      // By default, use session storage for new registrations
      sessionStorage.setItem("resqall_user", JSON.stringify(mappedUser));
      sessionStorage.setItem("token", data.token);
      console.log("New user saved to sessionStorage");
      
      return true;
    } catch (err: any) {
      console.error("Register error:", err);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    setUser(null);
    // Clear all storage
    localStorage.removeItem("resqall_user");
    localStorage.removeItem("token");
    sessionStorage.removeItem("resqall_user");
    sessionStorage.removeItem("token");
    console.log("User logged out, all storage cleared");
  };

  const updateUserProfile = async (userId: number, data: Partial<User>) => {
    try {
      const token = localStorage.getItem("token") || sessionStorage.getItem("token");
      
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
      
      // Update storage based on where user is stored
      if (localStorage.getItem("resqall_user")) {
        localStorage.setItem("resqall_user", JSON.stringify(mappedUser));
      } else if (sessionStorage.getItem("resqall_user")) {
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
        loading, // ADD THIS
        login, 
        register, 
        logout, 
        updateUserProfile 
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