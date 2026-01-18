import { useState, useEffect } from 'react';
import { getTodoHistory } from '../../api/history';
import { TodoHistoryEntry, TodoSnapshot, ActionType } from '../../types/history';

interface TodoHistoryProps {
  todoId: number;
  todoTitle: string;
}

export default function TodoHistory({ todoId, todoTitle }: TodoHistoryProps) {
  const [history, setHistory] = useState<TodoHistoryEntry[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchHistory = async () => {
      try {
        setIsLoading(true);
        setError(null);
        const data = await getTodoHistory(todoId);
        setHistory(data);
      } catch (err) {
        setError('Failed to load history. Please try again.');
        console.error('Error fetching todo history:', err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchHistory();
  }, [todoId]);

  const formatDateTime = (dateString: string): string => {
    const date = new Date(dateString);
    return date.toLocaleString(undefined, {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  const getActionBadgeClass = (actionType: ActionType): string => {
    switch (actionType) {
      case 'CREATED':
        return 'action-badge action-created';
      case 'UPDATED':
        return 'action-badge action-updated';
      case 'COMPLETED':
        return 'action-badge action-completed';
      case 'UNCOMPLETED':
        return 'action-badge action-uncompleted';
      case 'DELETED':
        return 'action-badge action-deleted';
      default:
        return 'action-badge';
    }
  };

  const parseSnapshot = (snapshotJson: string): TodoSnapshot | null => {
    try {
      return JSON.parse(snapshotJson) as TodoSnapshot;
    } catch {
      return null;
    }
  };

  const getActionDescription = (entry: TodoHistoryEntry): string => {
    const snapshot = parseSnapshot(entry.snapshot);
    
    switch (entry.actionType) {
      case 'CREATED':
        return 'Todo was created';
      case 'UPDATED':
        return snapshot ? `Title: "${snapshot.title}"` : 'Todo was updated';
      case 'COMPLETED':
        return 'Todo was marked as completed';
      case 'UNCOMPLETED':
        return 'Todo was marked as incomplete';
      case 'DELETED':
        return 'Todo was deleted';
      default:
        return 'Unknown action';
    }
  };

  if (isLoading) {
    return (
      <div className="history-loading">
        <div className="loading-spinner"></div>
        <span>Loading history...</span>
      </div>
    );
  }

  if (error) {
    return <div className="history-error">{error}</div>;
  }

  if (history.length === 0) {
    return <div className="history-empty">No history available for this todo.</div>;
  }

  return (
    <div className="todo-history">
      <p className="history-subtitle">History for "{todoTitle}"</p>
      <ul className="history-list">
        {history.map((entry) => (
          <li key={entry.id} className="history-entry">
            <div className="history-entry-header">
              <span className={getActionBadgeClass(entry.actionType)}>
                {entry.actionType}
              </span>
              <span className="history-timestamp">{formatDateTime(entry.createdAt)}</span>
            </div>
            <p className="history-description">{getActionDescription(entry)}</p>
            <p className="history-user">by {entry.createdBy}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}
