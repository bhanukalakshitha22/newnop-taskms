import { api } from './client';
import type { User } from '../types';

export const usersApi = {
  async list() {
    const { data } = await api.get<User[]>('/users');
    return data;
  },
};
