// // src/types.ts
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

// export interface User {
//   user_id: number;
//   username: string;
//   email: string;
//   phone: string;
//   profile_image_url?: string;
//   role: Role;
//   created_at: string;
// }

// export interface VolunteerProfile {
//   user_id: number;
//   joined_at: string;
//   availability_status: AvailabilityStatus;
//   approval_status: VolunteerApprovalStatus;
// }

// export interface Report {
//   report_id: number;
//   user: User;
//   animal_type: AnimalType;
//   animal_condition: AnimalCondition;
//   description: string;
//   location_address: string;
//   status: ReportStatus;
//   user_note?: string;
//   submitted_at: string;
// }

// export interface Task {
//   task_id: number;
//   report: Report;
//   assigned_to: User;   // Volunteer
//   assigned_by: User;   // Admin
//   status: TaskStatus;
//   assigned_at: string;
//   deadline?: string;
//   started_at?: string;
//   completed_at?: string;
//   proof?: string; // URL of proof if uploaded
//   volunteer_note?: string;
// }


// src/types.ts
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

// Add Volunteer interface
export interface Volunteer {
  approval_status_id?: number;
  status?: string;
  badges?: any[];
  volunteer_since?: string;
}

export interface User {
  user_id: number;
  username: string;
  email: string;
  phone: string;
  profile_image_url?: string;
  role: Role;
  created_at: string;
  
  // Add these optional fields for AuthContext
  approval_status_id?: number;
  volunteer?: Volunteer;
  volunteer_status?: string;
}

export interface VolunteerProfile {
  user_id: number;
  joined_at: string;
  availability_status: AvailabilityStatus;
  approval_status: VolunteerApprovalStatus;
}

export interface Report {
  report_id: number;
  user: User;
  animal_type: AnimalType;
  animal_condition: AnimalCondition;
  description: string;
  location_address: string;
  status: ReportStatus;
  user_note?: string;
  submitted_at: string;
}

export interface Task {
  task_id: number;
  report: Report;
  assigned_to: User;   // Volunteer
  assigned_by: User;   // Admin
  status: TaskStatus;
  assigned_at: string;
  deadline?: string;
  started_at?: string;
  completed_at?: string;
  proof?: string; // URL of proof if uploaded
  volunteer_note?: string;
}