import { User, Report, Task } from "../types/types";

export const fetchReports = async (): Promise<Report[]> => {
  const res = await fetch("/api/reports");
  if (!res.ok) throw new Error("Failed to fetch reports");
  return res.json();
};

export const fetchUserById = async (id: number): Promise<User> => {
  const res = await fetch(`/api/users/${id}`);
  if (!res.ok) throw new Error("Failed to fetch user");
  return res.json();
};

export const fetchTasks = async (): Promise<Task[]> => {
  const res = await fetch("/api/tasks");
  if (!res.ok) throw new Error("Failed to fetch tasks");
  return res.json();
};
