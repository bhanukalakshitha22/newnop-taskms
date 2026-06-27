import { api } from './client';
import type { AuthResponse, User } from '../types';

export const authApi = {
  async register(payload: { name: string; email: string; password: string }) {
    const { data } = await api.post<AuthResponse>('/auth/register', payload);
    return data;
  },
  async login(payload: { email: string; password: string }) {
    const { data } = await api.post<AuthResponse>('/auth/login', payload);
    return data;
  },
  async me() {
    const { data } = await api.get<User>('/auth/me');
    return data;
  },
};
