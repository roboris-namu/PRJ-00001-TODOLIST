import { Timestamp } from "firebase/firestore";

export interface Todo {
  id: string;
  title: string;
  description: string;
  priority: 1 | 2 | 3;
  completed: boolean;
  createdAt: Timestamp;
  updatedAt: Timestamp;
  userId: string;
  status: TodoStatus;
}

export type TodoInput = Omit<Todo, 'id' | 'createdAt' | 'updatedAt'>;

export type TodoUpdate = Partial<TodoInput>;

export enum Priority {
  High = 1,
  Medium = 2,
  Low = 3
}

export enum TodoStatus {
  Todo = 'todo',
  InProgress = 'inProgress',
  Done = 'done'
}

export interface KanbanColumn {
  id: TodoStatus;
  title: string;
  todoIds: string[];
}

export interface KanbanBoard {
  columns: {
    [key in TodoStatus]: KanbanColumn;
  };
  columnOrder: TodoStatus[];
}

export const getPriorityText = (priority: Priority): string => {
  switch (priority) {
    case Priority.High:
      return 'High';
    case Priority.Medium:
      return 'Medium';
    case Priority.Low:
      return 'Low';
    default:
      return 'Unknown';
  }
};

export const getPriorityColor = (priority: Priority): string => {
  switch (priority) {
    case Priority.High:
      return 'bg-red-500 dark:bg-red-600';
    case Priority.Medium:
      return 'bg-yellow-500 dark:bg-yellow-600';
    case Priority.Low:
      return 'bg-green-500 dark:bg-green-600';
    default:
      return 'bg-gray-500 dark:bg-gray-600';
  }
};

export const getStatusText = (status: TodoStatus): string => {
  switch (status) {
    case TodoStatus.Todo:
      return '할 일';
    case TodoStatus.InProgress:
      return '진행 중';
    case TodoStatus.Done:
      return '완료';
    default:
      return 'Unknown';
  }
};

export const getStatusColor = (status: TodoStatus): string => {
  switch (status) {
    case TodoStatus.Todo:
      return 'bg-gray-100 dark:bg-gray-700';
    case TodoStatus.InProgress:
      return 'bg-blue-100 dark:bg-blue-700';
    case TodoStatus.Done:
      return 'bg-green-100 dark:bg-green-700';
    default:
      return 'bg-gray-100 dark:bg-gray-700';
  }
}; 