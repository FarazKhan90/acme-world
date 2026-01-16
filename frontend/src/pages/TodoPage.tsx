import { useAuth } from '../context/AuthContext';
import TodoList from '../components/todos/TodoList';

export default function TodoPage() {
  const { user, logout } = useAuth();

  return (
    <div className="todo-page">
      <header className="header">
        <h1>Todo App</h1>
        <div className="user-info">
          <span>Welcome, {user?.firstName || user?.username}</span>
          <button onClick={logout} className="btn btn-secondary">
            Logout
          </button>
        </div>
      </header>
      <main className="main-content">
        <TodoList />
      </main>
    </div>
  );
}
