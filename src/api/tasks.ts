import { api } from './client';
import type { Task, TaskPriority, TaskStatus } from '../types';

export type SortField = 'createdAt' | 'dueDate' | 'priority' | 'title';
export type SortDir = 'asc' | 'desc';

export interface TaskListFilters {
  status?: TaskStatus;
  priority?: TaskPriority;
  q?: string;
  assignedTo?: string;
  sortBy?: SortField;
  sortDir?: SortDir;
}

export interface TaskWriteInput {
  title: string;
  description?: string;
  priority?: TaskPriority;
  status?: TaskStatus;
  dueDate?: string;
  assignedTo?: string;
}

export const tasksApi = {
  async list(filters: TaskListFilters = {}) {
    const params: Record<string, string> = {};
    for (const [k, v] of Object.entries(filters)) {
      if (v) params[k] = v;
    }
    const { data } = await api.get<Task[]>('/tasks', { params });
    return data;
  },
  async getById(id: string) {
    const { data } = await api.get<Task>(`/tasks/${id}`);
    return data;
  },
  async create(input: TaskWriteInput) {
    const { data } = await api.post<Task>('/tasks', input);
    return data;
  },
  async update(id: string, input: Partial<TaskWriteInput>) {
    const { data } = await api.put<Task>(`/tasks/${id}`, input);
    return data;
  },
  async remove(id: string) {
    await api.delete(`/tasks/${id}`);
  },
};
