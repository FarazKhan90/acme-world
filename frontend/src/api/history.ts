import apiClient from './client';
import { TodoHistoryEntry } from '../types/history';

export const getTodoHistory = async (todoId: number): Promise<TodoHistoryEntry[]> => {
  const response = await apiClient.get<TodoHistoryEntry[]>(`/todos/${todoId}/history`);
  return response.data;
};
