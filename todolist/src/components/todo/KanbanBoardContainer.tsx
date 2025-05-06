import React, { useState, useEffect } from 'react';
import { Todo, TodoInput, TodoStatus, KanbanBoard as KanbanBoardType } from '../../types/todo';
import TodoForm from './TodoForm';
import KanbanBoard from './KanbanBoard';
import LoadingSpinner from '../common/LoadingSpinner';
import ErrorMessage from '../common/ErrorMessage';
import { DropResult } from '@hello-pangea/dnd';

interface KanbanBoardContainerProps {
  todos: Todo[];
  loading: boolean;
  error: string | null;
  board: KanbanBoardType;
  onCreateTodo: (todo: TodoInput) => void;
  onUpdateTodo: (id: string, data: Partial<Todo>) => void;
  onDeleteTodo: (id: string) => void;
  onToggleComplete: (id: string, completed: boolean) => void;
  handleDragEnd: (result: DropResult) => void;
  getTodosForColumn: (status: TodoStatus) => Todo[];
}

const KanbanBoardContainer: React.FC<KanbanBoardContainerProps> = ({
  todos,
  loading,
  error,
  board,
  onCreateTodo,
  onUpdateTodo,
  onDeleteTodo,
  onToggleComplete,
  handleDragEnd,
  getTodosForColumn
}) => {
  // 초기 상태를 true로 설정하여 폼이 처음부터 표시되도록 함
  const [isFormVisible, setIsFormVisible] = useState(true);
  const [longLoading, setLongLoading] = useState(false);
  
  // 로딩이 3초 이상 지속되면 longLoading 상태를 true로 설정
  useEffect(() => {
    let timer: NodeJS.Timeout;
    
    if (loading) {
      timer = setTimeout(() => {
        setLongLoading(true);
      }, 3000);
    } else {
      setLongLoading(false);
    }
    
    return () => {
      if (timer) clearTimeout(timer);
    };
  }, [loading]);

  return (
    <div>
      <div className="mb-6 flex flex-col md:flex-row items-start md:items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-100 mb-2">
            Board View
          </h2>
          <p className="text-sm text-gray-600 dark:text-gray-400">
            Drag and drop tasks between columns to update their status
          </p>
        </div>
        
        <button
          onClick={() => setIsFormVisible(!isFormVisible)}
          className="mt-4 md:mt-0 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors duration-200"
        >
          {isFormVisible ? 'Hide Form' : 'Add New Task'}
        </button>
      </div>
      
      {isFormVisible && (
        <div className="mb-6">
          <TodoForm onSubmit={onCreateTodo} />
        </div>
      )}
      
      {error && <ErrorMessage message={error} />}
      
      {loading && !longLoading ? (
        <div className="flex justify-center items-center h-64">
          <LoadingSpinner size="lg" />
        </div>
      ) : (
        <>
          {longLoading && (
            <div className="mb-4 p-3 bg-yellow-100 dark:bg-yellow-900 text-yellow-800 dark:text-yellow-200 rounded">
              <p>Firebase 연결을 기다리는 중입니다. 잠시만 기다려주세요...</p>
              <p className="text-sm mt-1">데이터가 로드되는 동안 할 일을 추가할 수 있습니다.</p>
            </div>
          )}
          
          <KanbanBoard
            board={board}
            todos={todos}
            onDragEnd={handleDragEnd}
            onToggleComplete={onToggleComplete}
            onEdit={onUpdateTodo}
            onDelete={onDeleteTodo}
            getTodosForColumn={getTodosForColumn}
          />
        </>
      )}
    </div>
  );
};

export default KanbanBoardContainer; 