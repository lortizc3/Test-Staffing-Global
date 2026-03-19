import { http } from './http';
import type { Task, TaskPriority, TaskStatus } from '../types';

export type TaskFilters = {
  status?: TaskStatus | '';
  priority?: TaskPriority | '';
  search?: string;
  assignedToId?: string;
};

export const tasksApi = {
  list(filters: TaskFilters) {
    return http.get<Task[]>('/tasks', { params: filters }).then((response) => response.data);
  },
  getById(id: string) {
    return http.get<Task>(`/tasks/${id}`).then((response) => response.data);
  },
  create(payload: { title: string; description: string; status: TaskStatus; priority: TaskPriority; assignedToId: string }) {
    return http.post<Task>('/tasks', payload).then((response) => response.data);
  },
  update(id: string, payload: Partial<{ title: string; description: string; status: TaskStatus; priority: TaskPriority; assignedToId: string }>) {
    return http.put<Task>(`/tasks/${id}`, payload).then((response) => response.data);
  },
  updateStatus(id: string, status: TaskStatus) {
    return http.patch<Task>(`/tasks/${id}/status`, { status }).then((response) => response.data);
  },
  remove(id: string) {
    return http.delete(`/tasks/${id}`);
  },
};
