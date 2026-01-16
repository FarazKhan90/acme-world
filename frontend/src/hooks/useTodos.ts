import { useState, useEffect, useCallback } from 'react';
import { Todo, CreateTodoRequest, UpdateTodoRequest } from '../types/todo';
import * as todoApi from '../api/todos';

export function useTodos() {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchTodos = useCallback(async () => {
    try {
      setIsLoading(true);
      setError(null);
      const data = await todoApi.getTodos();
      setTodos(data);
    } catch (err) {
      setError('Failed to fetch todos');
      console.error('Error fetching todos:', err);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchTodos();
  }, [fetchTodos]);

  const createTodo = async (data: CreateTodoRequest) => {
    try {
      const newTodo = await todoApi.createTodo(data);
      setTodos((prev) => [newTodo, ...prev]);
      return newTodo;
    } catch (err) {
      setError('Failed to create todo');
      throw err;
    }
  };

  const updateTodo = async (id: number, data: UpdateTodoRequest) => {
    try {
      const updatedTodo = await todoApi.updateTodo(id, data);
      setTodos((prev) =>
        prev.map((todo) => (todo.id === id ? updatedTodo : todo))
      );
      return updatedTodo;
    } catch (err) {
      setError('Failed to update todo');
      throw err;
    }
  };

  const toggleTodo = async (id: number) => {
    try {
      const updatedTodo = await todoApi.toggleTodo(id);
      setTodos((prev) =>
        prev.map((todo) => (todo.id === id ? updatedTodo : todo))
      );
      return updatedTodo;
    } catch (err) {
      setError('Failed to toggle todo');
      throw err;
    }
  };

  const deleteTodo = async (id: number) => {
    try {
      await todoApi.deleteTodo(id);
      setTodos((prev) => prev.filter((todo) => todo.id !== id));
    } catch (err) {
      setError('Failed to delete todo');
      throw err;
    }
  };

  return {
    todos,
    isLoading,
    error,
    fetchTodos,
    createTodo,
    updateTodo,
    toggleTodo,
    deleteTodo,
  };
}
