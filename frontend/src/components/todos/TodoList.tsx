import { useState } from 'react';
import { useTodos } from '../../hooks/useTodos';
import TodoItem from './TodoItem';
import TodoForm from './TodoForm';
import TodoHistory from './TodoHistory';
import Modal from '../common/Modal';
import { Todo } from '../../types/todo';

type FilterType = 'all' | 'active' | 'completed';

export default function TodoList() {
  const { todos, isLoading, error, createTodo, updateTodo, toggleTodo, deleteTodo } = useTodos();
  const [filter, setFilter] = useState<FilterType>('all');
  const [selectedTodo, setSelectedTodo] = useState<Todo | null>(null);
  const [isHistoryModalOpen, setIsHistoryModalOpen] = useState(false);

  const handleHistoryClick = (todo: Todo) => {
    setSelectedTodo(todo);
    setIsHistoryModalOpen(true);
  };

  const handleCloseHistoryModal = () => {
    setIsHistoryModalOpen(false);
    setSelectedTodo(null);
  };

  const filteredTodos = todos.filter((todo) => {
    if (filter === 'active') return !todo.completed;
    if (filter === 'completed') return todo.completed;
    return true;
  });

  const activeTodosCount = todos.filter((t) => !t.completed).length;

  if (isLoading) {
    return <div className="loading">Loading todos...</div>;
  }

  if (error) {
    return <div className="error-message">{error}</div>;
  }

  return (
    <div className="todo-list-container">
      <TodoForm onSubmit={createTodo} />

      <div className="filters">
        <button
          className={`filter-btn ${filter === 'all' ? 'active' : ''}`}
          onClick={() => setFilter('all')}
        >
          All
        </button>
        <button
          className={`filter-btn ${filter === 'active' ? 'active' : ''}`}
          onClick={() => setFilter('active')}
        >
          Active
        </button>
        <button
          className={`filter-btn ${filter === 'completed' ? 'active' : ''}`}
          onClick={() => setFilter('completed')}
        >
          Completed
        </button>
      </div>

      <ul className="todo-list">
        {filteredTodos.length === 0 ? (
          <li className="no-todos">
            {filter === 'all' ? 'No todos yet. Add one above!' : `No ${filter} todos`}
          </li>
        ) : (
          filteredTodos.map((todo) => (
            <TodoItem
              key={todo.id}
              todo={todo}
              onToggle={() => toggleTodo(todo.id)}
              onUpdate={(data) => updateTodo(todo.id, data)}
              onDelete={() => deleteTodo(todo.id)}
              onHistoryClick={() => handleHistoryClick(todo)}
            />
          ))
        )}
      </ul>

      <div className="todo-stats">
        {activeTodosCount} item{activeTodosCount !== 1 ? 's' : ''} left
      </div>

      <Modal
        isOpen={isHistoryModalOpen}
        onClose={handleCloseHistoryModal}
        title="Todo History"
      >
        {selectedTodo && (
          <TodoHistory todoId={selectedTodo.id} todoTitle={selectedTodo.title} />
        )}
      </Modal>
    </div>
  );
}
