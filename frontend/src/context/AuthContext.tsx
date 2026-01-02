// import React, { createContext, useContext, useEffect, useState } from 'react';

// export interface User {
//   id: string;
//   username: string;
//   email: string;
//   role: 'admin' | 'volunteer' | 'user';
//   volunteerStatus: 'pending' | 'approved' | 'rejected' | 'none';
//   badges: string[];
//   bio: string;
//   notificationPreferences: { email: boolean; browser: boolean };
// }

// interface AuthContextType {
//   user: User | null;
//   isAuthenticated: boolean;
//   login: (email: string) => User | null;
//   register: (username: string, email: string, isVolunteer: boolean) => User;
//   logout: () => void;
// }

// const AuthContext = createContext<AuthContextType | undefined>(undefined);

// // Mock users data
// const MOCK_USERS: User[] = [
//   {
//     id: '1',
//     username: 'admin',
//     email: 'admin@resqall.com',
//     role: 'admin',
//     volunteerStatus: 'none',
//     badges: ['Founder'],
//     bio: 'System Administrator',
//     notificationPreferences: { email: true, browser: true },
//   },
//   {
//     id: '2',
//     username: 'jane_doe',
//     email: 'jane@example.com',
//     role: 'user',
//     volunteerStatus: 'none',
//     badges: [],
//     bio: 'Animal welfare advocate',
//     notificationPreferences: { email: true, browser: false },
//   },
//   {
//     id: '3',
//     username: 'safari_sam',
//     email: 'sam@resqall.com',
//     role: 'volunteer',
//     volunteerStatus: 'approved',
//     badges: ['Ranger Scout', 'First Responder'],
//     bio: 'Emergency responder',
//     notificationPreferences: { email: true, browser: true },
//   },
//   {
//     id: '4',
//     username: 'wildlife_will',
//     email: 'will@example.com',
//     role: 'volunteer',
//     volunteerStatus: 'pending',
//     badges: [],
//     bio: '',
//     notificationPreferences: { email: true, browser: true },
//   },
// ];

// export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
//   const [user, setUser] = useState<User | null>(null);

//   useEffect(() => {
//     const storedUser = localStorage.getItem('resqall_user');
//     if (storedUser) {
//       try {
//         setUser(JSON.parse(storedUser));
//       } catch (error) {
//         console.error('Error parsing stored user:', error);
//         localStorage.removeItem('resqall_user');
//       }
//     }
//   }, []);

//   const login = (email: string): User | null => {
//     const foundUser = MOCK_USERS.find(u => u.email === email);
//     if (!foundUser) return null;
    
//     setUser(foundUser);
//     localStorage.setItem('resqall_user', JSON.stringify(foundUser));
//     return foundUser;
//   };

//   const register = (username: string, email: string, isVolunteer: boolean): User => {
//     const newUser: User = {
//       id: (Date.now() + Math.random()).toString(),
//       username,
//       email,
//       role: isVolunteer ? 'volunteer' : 'user',
//       volunteerStatus: isVolunteer ? 'pending' : 'none',
//       badges: [],
//       bio: '',
//       notificationPreferences: { email: true, browser: true },
//     };
    
//     setUser(newUser);
//     localStorage.setItem('resqall_user', JSON.stringify(newUser));
//     return newUser;
//   };

//   const logout = () => {
//     setUser(null);
//     localStorage.removeItem('resqall_user');
//   };

//   return (
//     <AuthContext.Provider value={{ user, isAuthenticated: !!user, login, register, logout }}>
//       {children}
//     </AuthContext.Provider>
//   );
// };

// export const useAuth = () => {
//   const context = useContext(AuthContext);
//   if (!context) throw new Error('useAuth must be used within an AuthProvider');
//   return context;
// };


import React, { createContext, useContext, useEffect, useState } from 'react';

export interface User {
  id: string;
  username: string;
  email: string;
  role: 'admin' | 'volunteer' | 'user';
  volunteerStatus: 'pending' | 'approved' | 'rejected' | 'none';
  badges: string[];
  bio: string;
  notificationPreferences: { email: boolean; browser: boolean };
}

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  login: (email: string) => boolean; // returns boolean, not User
  register: (username: string, email: string, isVolunteer: boolean) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Mock users
const MOCK_USERS: User[] = [
  {
    id: '1',
    username: 'admin',
    email: 'admin@resqall.com',
    role: 'admin',
    volunteerStatus: 'none',
    badges: ['Founder'],
    bio: 'System Administrator',
    notificationPreferences: { email: true, browser: true },
  },
  {
    id: '2',
    username: 'jane_doe',
    email: 'jane@example.com',
    role: 'user',
    volunteerStatus: 'none',
    badges: [],
    bio: 'Animal welfare advocate',
    notificationPreferences: { email: true, browser: false },
  },
  {
    id: '3',
    username: 'safari_sam',
    email: 'sam@resqall.com',
    role: 'volunteer',
    volunteerStatus: 'approved',
    badges: ['Ranger Scout', 'First Responder'],
    bio: 'Emergency responder',
    notificationPreferences: { email: true, browser: true },
  },
  {
    id: '4',
    username: 'wildlife_will',
    email: 'will@example.com',
    role: 'volunteer',
    volunteerStatus: 'pending',
    badges: [],
    bio: '',
    notificationPreferences: { email: true, browser: true },
  },
];

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const storedUser = localStorage.getItem('resqall_user');
    if (storedUser) {
      try {
        setUser(JSON.parse(storedUser));
      } catch (error) {
        console.error('Error parsing stored user:', error);
        localStorage.removeItem('resqall_user');
      }
    }
  }, []);

  const login = (email: string): boolean => {
    const foundUser = MOCK_USERS.find(u => u.email === email);
    if (!foundUser) return false;
    
    setUser(foundUser);
    localStorage.setItem('resqall_user', JSON.stringify(foundUser));
    return true;
  };

  const register = (username: string, email: string, isVolunteer: boolean) => {
    const newUser: User = {
      id: (Date.now() + Math.random()).toString(),
      username,
      email,
      role: isVolunteer ? 'volunteer' : 'user',
      volunteerStatus: isVolunteer ? 'pending' : 'none',
      badges: [],
      bio: '',
      notificationPreferences: { email: true, browser: true },
    };
    
    setUser(newUser);
    localStorage.setItem('resqall_user', JSON.stringify(newUser));
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('resqall_user');
  };

  return (
    <AuthContext.Provider value={{ user, isAuthenticated: !!user, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth must be used within an AuthProvider');
  return context;
};