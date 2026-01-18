export type ActionType = 'CREATED' | 'UPDATED' | 'COMPLETED' | 'UNCOMPLETED' | 'DELETED';

export interface TodoSnapshot {
  id: number;
  title: string;
  description: string | null;
  completed: boolean;
  priority: 'LOW' | 'MEDIUM' | 'HIGH';
  dueDate: string | null;
  createdAt: string;
  updatedAt: string;
  deletedAt: string | null;
}

export interface TodoHistoryEntry {
  id: number;
  actionType: ActionType;
  snapshot: string; // JSON string that can be parsed to TodoSnapshot
  createdAt: string;
  createdBy: string;
}
