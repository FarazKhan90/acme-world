import apiClient from './client';
import { AuthResponse, LoginRequest, RegisterRequest, User } from '../types/auth';

export const login = async (data: LoginRequest): Promise<AuthResponse> => {
  const response = await apiClient.post<AuthResponse>('/auth/login', data);
  return response.data;
};

export const register = async (data: RegisterRequest): Promise<AuthResponse> => {
  const response = await apiClient.post<AuthResponse>('/auth/register', data);
  return response.data;
};

export const getCurrentUser = async (): Promise<User> => {
  const response = await apiClient.get<User>('/auth/me');
  return response.data;
};

export const logout = (): void => {
  localStorage.removeItem('accessToken');
  localStorage.removeItem('user');
};
