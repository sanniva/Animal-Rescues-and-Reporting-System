export type UserRole = 'admin' | 'user' | 'volunteer';

export interface User {
  id: string;
  username: string;
  email: string;
  role: UserRole;
  volunteerStatus: 'none' | 'pending' | 'approved' | 'rejected';
  badges: string[];
  bio?: string;
  notificationPreferences: {
    email: boolean;
    browser: boolean;
  };
}
