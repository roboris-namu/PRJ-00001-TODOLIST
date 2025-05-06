import React, { useState } from 'react';
import { Todo, Priority, getPriorityText, getPriorityColor } from '../../types/todo';
import { FaEdit, FaTrash, FaCheck, FaClock, FaFlag, FaGripVertical } from 'react-icons/fa';
import TodoForm from './TodoForm';
import { Draggable } from '@hello-pangea/dnd';
import { withIconType } from '../../utils/icons';

interface TodoItemProps {
  todo: Todo;
  onToggleComplete: (id: string, completed: boolean) => void;
  onEdit: (id: string, data: Partial<Todo>) => void;
  onDelete: (id: string) => void;
  index: number;
}

const TodoItem: React.FC<TodoItemProps> = ({ todo, onToggleComplete, onEdit, onDelete, index }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);

  // Type cast all icons
  const EditIcon = withIconType(FaEdit);
  const TrashIcon = withIconType(FaTrash);
  const CheckIcon = withIconType(FaCheck);
  const ClockIcon = withIconType(FaClock);
  const FlagIcon = withIconType(FaFlag);
  const GripIcon = withIconType(FaGripVertical);

  const handleToggleComplete = () => {
    onToggleComplete(todo.id, todo.completed);
  };

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleDelete = () => {
    if (window.confirm('Are you sure you want to delete this task?')) {
      onDelete(todo.id);
    }
  };

  const handleUpdate = (updatedTodo: Partial<Todo>) => {
    onEdit(todo.id, updatedTodo);
    setIsEditing(false);
  };

  const handleCancelEdit = () => {
    setIsEditing(false);
  };

  const formatDate = (timestamp: any) => {
    if (!timestamp) return '';
    const date = timestamp.toDate();
    return new Intl.DateTimeFormat('en-US', {
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    }).format(date);
  };

  if (isEditing) {
    return (
      <TodoForm 
        onSubmit={handleUpdate} 
        initialValues={todo} 
        submitLabel="Update" 
        isEditing={true}
        onCancel={handleCancelEdit}
      />
    );
  }

  return (
    <Draggable draggableId={todo.id} index={index}>
      {(provided, snapshot) => (
        <div
          ref={provided.innerRef}
          {...provided.draggableProps}
          className={`
            bg-white dark:bg-gray-800 rounded-lg shadow p-4 mb-3
            border-l-4 transition-all duration-200
            ${todo.completed ? 'border-gray-400 dark:border-gray-600 opacity-70' : getPriorityColor(todo.priority)}
            ${snapshot.isDragging ? 'shadow-lg' : ''}
          `}
        >
          <div className="flex items-start justify-between">
            <div 
              {...provided.dragHandleProps} 
              className="flex items-center mr-2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 cursor-grab"
            >
              <GripIcon className="h-5 w-5" />
            </div>
            
            <div className="flex items-start space-x-3 flex-1">
              <button
                onClick={handleToggleComplete}
                className={`mt-1 flex-shrink-0 h-5 w-5 rounded-full border-2 focus:outline-none focus:ring-2 focus:ring-blue-500 
                  ${todo.completed 
                    ? 'bg-blue-500 border-blue-500 text-white flex items-center justify-center' 
                    : 'border-gray-400 dark:border-gray-500'}`}
                aria-label={todo.completed ? 'Mark as incomplete' : 'Mark as complete'}
              >
                {todo.completed && <CheckIcon className="h-3 w-3" />}
              </button>
              
              <div className="flex-1 min-w-0">
                <div 
                  className="cursor-pointer"
                  onClick={() => setIsExpanded(!isExpanded)}
                >
                  <h3 className={`text-md font-medium ${
                    todo.completed ? 'line-through text-gray-500 dark:text-gray-400' : 'text-gray-900 dark:text-gray-100'
                  }`}>
                    {todo.title}
                  </h3>
                  
                  {isExpanded && todo.description && (
                    <p className="mt-1 text-sm text-gray-600 dark:text-gray-300 whitespace-pre-line">
                      {todo.description}
                    </p>
                  )}
                  
                  <div className="mt-1 flex items-center text-xs text-gray-500 dark:text-gray-400 space-x-3">
                    <span className="flex items-center space-x-1">
                      <ClockIcon className="h-3 w-3" />
                      <span>{formatDate(todo.createdAt)}</span>
                    </span>
                    
                    <span className="flex items-center space-x-1">
                      <FlagIcon className={`h-3 w-3 ${
                        todo.priority === Priority.High ? 'text-red-500' :
                        todo.priority === Priority.Medium ? 'text-yellow-500' : 'text-green-500'
                      }`} />
                      <span>{getPriorityText(todo.priority)} Priority</span>
                    </span>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="flex items-center space-x-2 ml-4">
              <button
                onClick={handleEdit}
                className="text-gray-500 hover:text-blue-500 dark:text-gray-400 dark:hover:text-blue-400 transition-colors duration-200"
                aria-label="Edit todo"
              >
                <EditIcon className="h-4 w-4" />
              </button>
              
              <button
                onClick={handleDelete}
                className="text-gray-500 hover:text-red-500 dark:text-gray-400 dark:hover:text-red-400 transition-colors duration-200"
                aria-label="Delete todo"
              >
                <TrashIcon className="h-4 w-4" />
              </button>
            </div>
          </div>
        </div>
      )}
    </Draggable>
  );
};

export default TodoItem; 