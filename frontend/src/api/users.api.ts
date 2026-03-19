import { http } from './http';
import type { User } from '../types';

export const usersApi = {
  list() {
    return http.get<User[]>('/users').then((response) => response.data);
  },
};
