import React from 'react';
import { DragDropContext, DropResult } from '@hello-pangea/dnd';
import { Todo, KanbanBoard as KanbanBoardType, TodoStatus } from '../../types/todo';
import KanbanColumn from './KanbanColumn';

interface KanbanBoardProps {
  board: KanbanBoardType;
  todos: Todo[];
  onDragEnd: (result: DropResult) => void;
  onToggleComplete: (id: string, completed: boolean) => void;
  onEdit: (id: string, data: Partial<Todo>) => void;
  onDelete: (id: string) => void;
  getTodosForColumn: (status: TodoStatus) => Todo[];
}

const KanbanBoard: React.FC<KanbanBoardProps> = ({
  board,
  onDragEnd,
  onToggleComplete,
  onEdit,
  onDelete,
  getTodosForColumn
}) => {
  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {board.columnOrder.map((columnId) => {
          const column = board.columns[columnId];
          const todos = getTodosForColumn(columnId);
          
          return (
            <KanbanColumn
              key={column.id}
              column={column}
              todos={todos}
              onToggleComplete={onToggleComplete}
              onEdit={onEdit}
              onDelete={onDelete}
            />
          );
        })}
      </div>
    </DragDropContext>
  );
};

export default KanbanBoard; 