import apiClient from './client';
import { Todo, CreateTodoRequest, UpdateTodoRequest } from '../types/todo';

export const getTodos = async (
  completed?: boolean,
  priority?: string
): Promise<Todo[]> => {
  const params = new URLSearchParams();
  if (completed !== undefined) params.append('completed', String(completed));
  if (priority) params.append('priority', priority);

  const response = await apiClient.get<Todo[]>('/todos', { params });
  return response.data;
};

export const getTodoById = async (id: number): Promise<Todo> => {
  const response = await apiClient.get<Todo>(`/todos/${id}`);
  return response.data;
};

export const createTodo = async (data: CreateTodoRequest): Promise<Todo> => {
  const response = await apiClient.post<Todo>('/todos', data);
  return response.data;
};

export const updateTodo = async (
  id: number,
  data: UpdateTodoRequest
): Promise<Todo> => {
  const response = await apiClient.put<Todo>(`/todos/${id}`, data);
  return response.data;
};

export const toggleTodo = async (id: number): Promise<Todo> => {
  const response = await apiClient.patch<Todo>(`/todos/${id}/toggle`);
  return response.data;
};

export const deleteTodo = async (id: number): Promise<void> => {
  await apiClient.delete(`/todos/${id}`);
};
