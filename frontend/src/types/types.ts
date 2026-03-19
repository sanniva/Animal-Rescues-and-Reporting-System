// // // // src/types.ts
// // // export interface Role {
// // //   role_id: number;
// // //   role_name: "user" | "volunteer" | "admin";
// // // }

// // // export interface AvailabilityStatus {
// // //   status_id: number;
// // //   status_name: "available" | "unavailable";
// // // }

// // // export interface VolunteerApprovalStatus {
// // //   status_id: number;
// // //   status_name: "pending" | "approved" | "rejected";
// // // }

// // // export interface AnimalType {
// // //   type_id: number;
// // //   type_name: string;
// // // }

// // // export interface AnimalCondition {
// // //   condition_id: number;
// // //   condition_name: string;
// // // }

// // // export interface ReportStatus {
// // //   status_id: number;
// // //   status_name: "submitted" | "assigned" | "in_progress" | "completed" | "declined";
// // // }

// // // export interface TaskStatus {
// // //   status_id: number;
// // //   status_name: "assigned" | "in_progress" | "completed" | "declined";
// // // }

// // // export interface User {
// // //   user_id: number;
// // //   username: string;
// // //   email: string;
// // //   phone: string;
// // //   profile_image_url?: string;
// // //   role: Role;
// // //   created_at: string;
// // // }

// // // export interface VolunteerProfile {
// // //   user_id: number;
// // //   joined_at: string;
// // //   availability_status: AvailabilityStatus;
// // //   approval_status: VolunteerApprovalStatus;
// // // }

// // // export interface Report {
// // //   report_id: number;
// // //   user: User;
// // //   animal_type: AnimalType;
// // //   animal_condition: AnimalCondition;
// // //   description: string;
// // //   location_address: string;
// // //   status: ReportStatus;
// // //   user_note?: string;
// // //   submitted_at: string;
// // // }

// // // export interface Task {
// // //   task_id: number;
// // //   report: Report;
// // //   assigned_to: User;   // Volunteer
// // //   assigned_by: User;   // Admin
// // //   status: TaskStatus;
// // //   assigned_at: string;
// // //   deadline?: string;
// // //   started_at?: string;
// // //   completed_at?: string;
// // //   proof?: string; // URL of proof if uploaded
// // //   volunteer_note?: string;
// // // }


// // // src/types.ts
// // export interface Role {
// //   role_id: number;
// //   role_name: "user" | "volunteer" | "admin";
// // }

// // export interface AvailabilityStatus {
// //   status_id: number;
// //   status_name: "available" | "unavailable";
// // }

// // export interface VolunteerApprovalStatus {
// //   status_id: number;
// //   status_name: "pending" | "approved" | "rejected";
// // }

// // export interface AnimalType {
// //   type_id: number;
// //   type_name: string;
// // }

// // export interface AnimalCondition {
// //   condition_id: number;
// //   condition_name: string;
// // }

// // export interface ReportStatus {
// //   status_id: number;
// //   status_name: "submitted" | "assigned" | "in_progress" | "completed" | "declined";
// // }

// // export interface TaskStatus {
// //   status_id: number;
// //   status_name: "assigned" | "in_progress" | "completed" | "declined";
// // }

// // // Add Volunteer interface
// // export interface Volunteer {
// //   approval_status_id?: number;
// //   status?: string;
// //   badges?: any[];
// //   volunteer_since?: string;
// // }

// // export interface User {
// //   user_id: number;
// //   username: string;
// //   email: string;
// //   phone: string;
// //   profile_image_url?: string;
// //   role: Role;
// //   created_at: string;
  
// //   // Add these optional fields for AuthContext
// //   approval_status_id?: number;
// //   volunteer?: Volunteer;
// //   volunteer_status?: string;
// // }

// // export interface VolunteerProfile {
// //   user_id: number;
// //   joined_at: string;
// //   availability_status: AvailabilityStatus;
// //   approval_status: VolunteerApprovalStatus;
// // }

// // export interface Report {
// //   report_id: number;
// //   user: User;
// //   animal_type: AnimalType;
// //   animal_condition: AnimalCondition;
// //   description: string;
// //   location_address: string;
// //   status: ReportStatus;
// //   user_note?: string;
// //   submitted_at: string;
// // }

// // export interface Task {
// //   task_id: number;
// //   report: Report;
// //   assigned_to: User;   // Volunteer
// //   assigned_by: User;   // Admin
// //   status: TaskStatus;
// //   assigned_at: string;
// //   deadline?: string;
// //   started_at?: string;
// //   completed_at?: string;
// //   proof?: string; // URL of proof if uploaded
// //   volunteer_note?: string;
// // }

// // src/types/types.ts

// export interface Role {
//   role_id: number;
//   role_name: "user" | "volunteer" | "admin";
// }

// export interface AvailabilityStatus {
//   status_id: number;
//   status_name: "available" | "unavailable";
// }

// export interface VolunteerApprovalStatus {
//   status_id: number;
//   status_name: "pending" | "approved" | "rejected";
// }

// export interface AnimalType {
//   type_id: number;
//   type_name: string;
// }

// export interface AnimalCondition {
//   condition_id: number;
//   condition_name: string;
// }

// export interface ReportStatus {
//   status_id: number;
//   status_name: "submitted" | "assigned" | "in_progress" | "completed" | "declined";
// }

// export interface TaskStatus {
//   status_id: number;
//   status_name: "assigned" | "in_progress" | "completed" | "declined";
// }

// export interface Volunteer {
//   approval_status_id?: number;
//   status?: string;
//   badges?: any[];
//   volunteer_since?: string;
// }

// export interface User {
//   user_id: number;
//   username: string;
//   email: string;
//   phone: string;
//   profile_image_url?: string;
//   role: Role;
//   created_at: string;
//   approval_status_id?: number;
//   volunteer?: Volunteer;
//   volunteer_status?: string;
//   role_id?: number;
//   role_name?: string;
//   bio?: string;
// }

// export interface Report {
//   report_id?: number;
//   user_id?: number;
//   user?: User;
//   animal_type_id?: number;
//   animal_type?: AnimalType;
//   animal_condition_id?: number;
//   animal_condition?: AnimalCondition;
//   description: string;
//   location_address: string;
//   status_id?: number;
//   status?: ReportStatus;
//   user_note?: string;
//   submitted_at?: string;
//   is_deleted?: boolean;
// }

// export interface Task {
//   task_id: number;
//   report: Report;
//   assigned_to: User;
//   assigned_by: User;
//   status: TaskStatus;
//   assigned_at: string;
//   deadline?: string;
//   started_at?: string;
//   completed_at?: string;
//   proof?: string;
//   volunteer_note?: string;
// }

// export interface Notification {
//   notification_id?: number;
//   user_id: number;
//   type: 'new_report' | 'status_update' | 'admin_alert';
//   title: string;
//   message: string;
//   is_read: boolean;
//   created_at?: string;
//   metadata?: Record<string, any>;
// }

// // Add ApiResponse interface
// export interface ApiResponse {
//   success: boolean;
//   message?: string;
//   report_id?: number;
//   data?: any;
//   error?: string;
// }

// // Or if you want a more generic ApiResponse
// export interface GenericApiResponse<T = any> {
//   success: boolean;
//   message?: string;
//   data?: T;
//   error?: string;
//   pagination?: {
//     total: number;
//     limit: number;
//     offset: number;
//     has_more: boolean;
//   };
// }

// src/types/types.ts

export interface Role {
  role_id: number;
  role_name: "user" | "volunteer" | "admin";
}

export interface AvailabilityStatus {
  status_id: number;
  status_name: "available" | "unavailable";
}

export interface VolunteerApprovalStatus {
  status_id: number;
  status_name: "pending" | "approved" | "rejected";
}

export interface AnimalType {
  type_id: number;
  type_name: string;
}

export interface AnimalCondition {
  condition_id: number;
  condition_name: string;
}

export interface ReportStatus {
  status_id: number;
  status_name: "submitted" | "assigned" | "in_progress" | "completed" | "declined";
}

export interface TaskStatus {
  status_id: number;
  status_name: "assigned" | "in_progress" | "completed" | "declined";
}

// Updated Volunteer interface with ALL fields from your database
export interface Volunteer {
  approval_status_id?: number;
  status?: string;
  badges?: any[];
  volunteer_since?: string;
  
  // Additional fields from your database
  has_car?: boolean;
  can_foster?: boolean;
  animal_handling?: string;
  city?: string | null;
  total_tasks?: number;
  availability_status?: string;
  availability_status_id?: number;
}

export interface User {
  user_id: number;
  username: string;
  email: string;
  phone: string;
  profile_image_url?: string;
  role: Role;
  created_at: string;
  
  // These fields might come directly from the API
  approval_status_id?: number;
  volunteer?: Volunteer;
  volunteer_status?: string;
  role_id?: number;
  role_name?: string;
  bio?: string;
  
  // Additional fields that might be in the API response
  joined_at?: string;
  has_car?: boolean;
  can_foster?: boolean;
  animal_handling?: string;
  city?: string | null;
}

export interface Report {
  report_id?: number;
  user_id?: number;
  user?: User;
  animal_type_id?: number;
  animal_type?: AnimalType;
  animal_condition_id?: number;
  animal_condition?: AnimalCondition;
  description: string;
  location_address: string;
  status_id?: number;
  status?: ReportStatus;
  user_note?: string;
  submitted_at?: string;
  is_deleted?: boolean;
}

export interface Task {
  task_id: number;
  report: Report;
  assigned_to: User;
  assigned_by: User;
  status: TaskStatus;
  assigned_at: string;
  deadline?: string;
  started_at?: string;
  completed_at?: string;
  proof?: string;
  volunteer_note?: string;
}

export interface Notification {
  notification_id?: number;
  user_id: number;
  type: 'new_report' | 'status_update' | 'admin_alert';
  title: string;
  message: string;
  is_read: boolean;
  created_at?: string;
  metadata?: Record<string, any>;
}

export interface ApiResponse {
  success: boolean;
  message?: string;
  report_id?: number;
  data?: any;
  error?: string;
}

export interface GenericApiResponse<T = any> {
  success: boolean;
  message?: string;
  data?: T;
  error?: string;
  pagination?: {
    total: number;
    limit: number;
    offset: number;
    has_more: boolean;
  };
}
