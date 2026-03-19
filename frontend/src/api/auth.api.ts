import { http } from './http';
import type { AuthResponse, User } from '../types';

export const authApi = {
  register(payload: { name: string; email: string; password: string; role?: 'ADMIN' | 'MEMBER' }) {
    return http.post<AuthResponse>('/auth/register', payload).then((response) => response.data);
  },
  login(payload: { email: string; password: string }) {
    return http.post<AuthResponse>('/auth/login', payload).then((response) => response.data);
  },
  logout() {
    return http.post('/auth/logout').then((response) => response.data);
  },
  me() {
    return http.get<User>('/auth/me').then((response) => response.data);
  },
};
