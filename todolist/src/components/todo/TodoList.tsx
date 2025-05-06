import React, { useState } from 'react';
import { Todo, Priority } from '../../types/todo';
import TodoItem from './TodoItem';
import TodoForm from './TodoForm';
import LoadingSpinner from '../common/LoadingSpinner';
import ErrorMessage from '../common/ErrorMessage';
import { FaFilter, FaSortAmountDown, FaSortAmountUp } from 'react-icons/fa';
import { withIconType } from '../../utils/icons';

interface TodoListProps {
  todos: Todo[];
  loading: boolean;
  error: string | null;
  onCreateTodo: (todo: Omit<Todo, 'id' | 'createdAt' | 'updatedAt'>) => void;
  onUpdateTodo: (id: string, data: Partial<Todo>) => void;
  onDeleteTodo: (id: string) => void;
  onToggleComplete: (id: string, completed: boolean) => void;
}

type SortField = 'createdAt' | 'priority' | 'title';
type SortOrder = 'asc' | 'desc';

const TodoList: React.FC<TodoListProps> = ({
  todos,
  loading,
  error,
  onCreateTodo,
  onUpdateTodo,
  onDeleteTodo,
  onToggleComplete
}) => {
  const [filter, setFilter] = useState<'all' | 'active' | 'completed'>('all');
  const [sortField, setSortField] = useState<SortField>('createdAt');
  const [sortOrder, setSortOrder] = useState<SortOrder>('desc');
  const [priorityFilter, setPriorityFilter] = useState<Priority | null>(null);

  // Type cast all icons
  const FilterIcon = withIconType(FaFilter);
  const SortUpIcon = withIconType(FaSortAmountUp);
  const SortDownIcon = withIconType(FaSortAmountDown);

  const toggleSortOrder = () => {
    setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
  };

  const handleSortChange = (field: SortField) => {
    if (sortField === field) {
      toggleSortOrder();
    } else {
      setSortField(field);
      setSortOrder('desc');
    }
  };

  const filteredTodos = todos.filter(todo => {
    if (filter === 'active' && todo.completed) return false;
    if (filter === 'completed' && !todo.completed) return false;
    if (priorityFilter !== null && todo.priority !== priorityFilter) return false;
    return true;
  });

  const sortedTodos = [...filteredTodos].sort((a, b) => {
    let comparison = 0;
    
    if (sortField === 'createdAt') {
      const dateA = a.createdAt?.toDate?.() || new Date();
      const dateB = b.createdAt?.toDate?.() || new Date();
      comparison = dateA.getTime() - dateB.getTime();
    } else if (sortField === 'priority') {
      comparison = a.priority - b.priority;
    } else if (sortField === 'title') {
      comparison = a.title.localeCompare(b.title);
    }
    
    return sortOrder === 'asc' ? comparison : -comparison;
  });

  const totalTodos = todos.length;
  const completedTodos = todos.filter(todo => todo.completed).length;
  const activeTodos = totalTodos - completedTodos;

  return (
    <div>
      <div className="mb-6">
        <TodoForm onSubmit={onCreateTodo} />
      </div>
      
      {error && <ErrorMessage message={error} />}
      
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden transition-colors duration-200">
        <div className="border-b border-gray-200 dark:border-gray-700 p-4">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
            <h2 className="text-lg font-semibold text-gray-800 dark:text-gray-200 mb-3 sm:mb-0">
              Your Tasks
            </h2>
            
            <div className="flex items-center space-x-2">
              <div className="relative">
                <select
                  value={filter}
                  onChange={(e) => setFilter(e.target.value as any)}
                  className="appearance-none pl-8 pr-4 py-1 text-sm bg-gray-100 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-700 dark:text-gray-200 transition-colors duration-200"
                >
                  <option value="all">All Tasks ({totalTodos})</option>
                  <option value="active">Active ({activeTodos})</option>
                  <option value="completed">Completed ({completedTodos})</option>
                </select>
                <FilterIcon className="absolute left-2 top-1/2 transform -translate-y-1/2 text-gray-500 dark:text-gray-400 h-3 w-3" />
              </div>
              
              <div className="relative">
                <select
                  value={priorityFilter === null ? '' : priorityFilter}
                  onChange={(e) => setPriorityFilter(e.target.value ? Number(e.target.value) as Priority : null)}
                  className="appearance-none pl-8 pr-4 py-1 text-sm bg-gray-100 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-700 dark:text-gray-200 transition-colors duration-200"
                >
                  <option value="">All Priorities</option>
                  <option value={Priority.High}>High</option>
                  <option value={Priority.Medium}>Medium</option>
                  <option value={Priority.Low}>Low</option>
                </select>
                <FilterIcon className="absolute left-2 top-1/2 transform -translate-y-1/2 text-gray-500 dark:text-gray-400 h-3 w-3" />
              </div>
              
              <button
                onClick={() => handleSortChange('createdAt')}
                className={`p-1 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${sortField === 'createdAt' ? 'bg-blue-100 dark:bg-blue-900 text-blue-600 dark:text-blue-400' : 'text-gray-500 dark:text-gray-400'}`}
                title={`Sort by date ${sortOrder === 'asc' ? '(oldest first)' : '(newest first)'}`}
              >
                {sortOrder === 'asc' ? <SortUpIcon className="h-4 w-4" /> : <SortDownIcon className="h-4 w-4" />}
              </button>
            </div>
          </div>
        </div>
        
        <div className="p-4">
          {loading ? (
            <div className="py-8">
              <LoadingSpinner />
            </div>
          ) : sortedTodos.length > 0 ? (
            <div>
              {sortedTodos.map((todo, index) => (
                <TodoItem
                  key={todo.id}
                  todo={todo}
                  index={index}
                  onToggleComplete={onToggleComplete}
                  onEdit={onUpdateTodo}
                  onDelete={onDeleteTodo}
                />
              ))}
            </div>
          ) : (
            <div className="py-8 text-center text-gray-500 dark:text-gray-400">
              <p>No tasks found. Try changing your filters or add a new task!</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default TodoList; 