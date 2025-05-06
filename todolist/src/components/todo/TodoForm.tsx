import React, { useState, useEffect } from 'react';
import { TodoInput, Priority, Todo, TodoStatus, getStatusText } from '../../types/todo';
import PrioritySelector from './PrioritySelector';

interface TodoFormProps {
  onSubmit: (todo: TodoInput) => void;
  initialValues?: Partial<Todo>;
  submitLabel?: string;
  isEditing?: boolean;
  onCancel?: () => void;
}

const TodoForm: React.FC<TodoFormProps> = ({
  onSubmit,
  initialValues,
  submitLabel = 'Add Todo',
  isEditing = false,
  onCancel
}) => {
  const [title, setTitle] = useState<string>(initialValues?.title || '');
  const [description, setDescription] = useState<string>(initialValues?.description || '');
  const [priority, setPriority] = useState<Priority>(initialValues?.priority || Priority.Medium);
  const [status, setStatus] = useState<TodoStatus>(initialValues?.status || TodoStatus.Todo);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (initialValues) {
      setTitle(initialValues.title || '');
      setDescription(initialValues.description || '');
      setPriority(initialValues.priority || Priority.Medium);
      setStatus(initialValues.status || TodoStatus.Todo);
    }
  }, [initialValues]);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    if (!title.trim()) {
      setError('Title is required');
      return;
    }
    
    onSubmit({
      title,
      description,
      priority,
      status,
      completed: status === TodoStatus.Done, // Update completed based on status
      userId: initialValues?.userId || 'anonymous' // In a real app, this would be the authenticated user's ID
    });
    
    if (!isEditing) {
      setTitle('');
      setDescription('');
      setPriority(Priority.Medium);
      setStatus(TodoStatus.Todo);
    }
    
    setError(null);
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 mb-6 transition-colors duration-200">
      <h2 className="text-lg font-semibold mb-4 text-gray-800 dark:text-gray-200">
        {isEditing ? 'Edit Todo' : 'Create New Todo'}
      </h2>
      
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label htmlFor="title" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            Title <span className="text-red-500">*</span>
          </label>
          <input
            id="title"
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="What needs to be done?"
            className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white transition-colors duration-200"
            autoFocus
          />
          {error && <p className="mt-1 text-sm text-red-600">{error}</p>}
        </div>
        
        <div className="mb-4">
          <label htmlFor="description" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            Description
          </label>
          <textarea
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Add details about this task (optional)"
            rows={3}
            className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white transition-colors duration-200"
          />
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Priority
            </label>
            <PrioritySelector value={priority} onChange={setPriority} className="w-full" />
          </div>
          
          <div>
            <label htmlFor="status" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Status
            </label>
            <select
              id="status"
              value={status}
              onChange={(e) => setStatus(e.target.value as TodoStatus)}
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white transition-colors duration-200"
            >
              <option value={TodoStatus.Todo}>{getStatusText(TodoStatus.Todo)}</option>
              <option value={TodoStatus.InProgress}>{getStatusText(TodoStatus.InProgress)}</option>
              <option value={TodoStatus.Done}>{getStatusText(TodoStatus.Done)}</option>
            </select>
          </div>
        </div>
        
        <div className="flex justify-end space-x-2">
          {onCancel && (
            <button
              type="button"
              onClick={onCancel}
              className="px-4 py-2 border border-gray-300 dark:border-gray-600 text-sm font-medium rounded-md text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors duration-200"
            >
              Cancel
            </button>
          )}
          <button
            type="submit"
            className="px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors duration-200"
          >
            {submitLabel}
          </button>
        </div>
      </form>
    </div>
  );
};

export default TodoForm; 