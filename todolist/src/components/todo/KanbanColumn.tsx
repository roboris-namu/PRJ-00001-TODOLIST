import React from 'react';
import { Droppable } from '@hello-pangea/dnd';
import { KanbanColumn as KanbanColumnType, Todo, TodoStatus, getStatusColor } from '../../types/todo';
import TodoItem from './TodoItem';

interface KanbanColumnProps {
  column: KanbanColumnType;
  todos: Todo[];
  onToggleComplete: (id: string, completed: boolean) => void;
  onEdit: (id: string, data: Partial<Todo>) => void;
  onDelete: (id: string) => void;
}

const KanbanColumn: React.FC<KanbanColumnProps> = ({
  column,
  todos,
  onToggleComplete,
  onEdit,
  onDelete
}) => {
  const columnBgColor = getStatusColor(column.id);

  return (
    <div className="flex flex-col min-h-[50vh] rounded-lg shadow-md overflow-hidden bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700">
      <div className={`p-3 ${columnBgColor} border-b border-gray-200 dark:border-gray-700`}>
        <h3 className="font-semibold text-gray-800 dark:text-gray-200 flex items-center">
          <span>{column.title}</span>
          <span className="ml-2 px-2 py-0.5 text-xs bg-white dark:bg-gray-700 rounded-full">
            {todos.length}
          </span>
        </h3>
      </div>

      <Droppable droppableId={column.id}>
        {(provided, snapshot) => (
          <div
            ref={provided.innerRef}
            {...provided.droppableProps}
            className={`flex-1 p-2 overflow-y-auto min-h-[200px] transition-colors duration-200 ${
              snapshot.isDraggingOver ? 'bg-blue-50 dark:bg-blue-900/20' : ''
            }`}
            style={{ maxHeight: 'calc(100vh - 250px)' }}
          >
            {todos.length > 0 ? (
              todos.map((todo, index) => (
                <TodoItem
                  key={todo.id}
                  todo={todo}
                  index={index}
                  onToggleComplete={onToggleComplete}
                  onEdit={onEdit}
                  onDelete={onDelete}
                />
              ))
            ) : (
              <div className="flex items-center justify-center h-full text-gray-400 dark:text-gray-500 italic text-sm p-4 text-center">
                {column.id === TodoStatus.Todo ? '할 일을 추가하세요' : 
                 column.id === TodoStatus.InProgress ? '진행 중인 작업이 없습니다' : 
                 '완료된 작업이 없습니다'}
              </div>
            )}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
    </div>
  );
};

export default KanbanColumn; 