import React, { useState } from 'react';
import { Todo, UpdateTodoRequest } from '../../types/todo';

interface TodoItemProps {
  todo: Todo;
  onToggle: () => void;
  onUpdate: (data: UpdateTodoRequest) => void;
  onDelete: () => void;
  onHistoryClick: () => void;
}

export default function TodoItem({ todo, onToggle, onUpdate, onDelete, onHistoryClick }: TodoItemProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [editTitle, setEditTitle] = useState(todo.title);

  const handleSubmitEdit = (e: React.FormEvent) => {
    e.preventDefault();
    if (editTitle.trim()) {
      onUpdate({ title: editTitle.trim() });
      setIsEditing(false);
    }
  };

  const handleCancelEdit = () => {
    setEditTitle(todo.title);
    setIsEditing(false);
  };

  const getPriorityClass = () => {
    switch (todo.priority) {
      case 'HIGH':
        return 'priority-high';
      case 'LOW':
        return 'priority-low';
      default:
        return 'priority-medium';
    }
  };

  const formatDate = (dateString: string | null) => {
    if (!dateString) return null;
    return new Date(dateString).toLocaleDateString();
  };

  return (
    <li className={`todo-item ${todo.completed ? 'completed' : ''}`}>
      {isEditing ? (
        <form onSubmit={handleSubmitEdit} className="edit-form">
          <input
            type="text"
            value={editTitle}
            onChange={(e) => setEditTitle(e.target.value)}
            autoFocus
          />
          <div className="edit-actions">
            <button type="submit" className="btn btn-small btn-primary">
              Save
            </button>
            <button
              type="button"
              className="btn btn-small btn-secondary"
              onClick={handleCancelEdit}
            >
              Cancel
            </button>
          </div>
        </form>
      ) : (
        <>
          <div className="todo-checkbox">
            <input
              type="checkbox"
              checked={todo.completed}
              onChange={onToggle}
              id={`todo-${todo.id}`}
            />
            <label htmlFor={`todo-${todo.id}`}></label>
          </div>
          <div className="todo-content" onDoubleClick={() => setIsEditing(true)}>
            <span className="todo-title">{todo.title}</span>
            {todo.description && (
              <span className="todo-description">{todo.description}</span>
            )}
            <div className="todo-meta">
              <span className={`priority-badge ${getPriorityClass()}`}>
                {todo.priority}
              </span>
              {todo.dueDate && (
                <span className="due-date">Due: {formatDate(todo.dueDate)}</span>
              )}
            </div>
          </div>
          <div className="todo-actions">
            <button
              className="btn btn-small btn-secondary"
              onClick={onHistoryClick}
              title="View history"
            >
              History
            </button>
            <button
              className="btn btn-small btn-secondary"
              onClick={() => setIsEditing(true)}
            >
              Edit
            </button>
            <button
              className="btn btn-small btn-danger"
              onClick={onDelete}
            >
              Delete
            </button>
          </div>
        </>
      )}
    </li>
  );
}
