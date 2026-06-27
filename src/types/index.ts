export type UserRole = 'admin' | 'user';
export type TaskPriority = 'Low' | 'Medium' | 'High';
export type TaskStatus = 'Open' | 'In Progress' | 'Testing' | 'Done';

export const TASK_PRIORITIES: TaskPriority[] = ['Low', 'Medium', 'High'];
export const TASK_STATUSES: TaskStatus[] = ['Open', 'In Progress', 'Testing', 'Done'];

export interface User {
  _id: string;
  name: string;
  email: string;
  role: UserRole;
  createdAt: string;
  updatedAt: string;
}

export interface Task {
  _id: string;
  title: string;
  description?: string;
  priority: TaskPriority;
  status: TaskStatus;
  dueDate?: string | null;
  createdBy: User;
  assignedTo?: User | null;
  createdAt: string;
  updatedAt: string;
}

export interface AuthResponse {
  token: string;
  user: User;
}

export interface TaskFormValues {
  title: string;
  description: string;
  priority: TaskPriority;
  status: TaskStatus;
  dueDate: string;
  assignedTo: string;
}
