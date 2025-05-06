import React from 'react';
import Layout from './components/layout/Layout';
import KanbanBoardContainer from './components/todo/KanbanBoardContainer';
import { useTodos } from './hooks/useTodos';
import { TodoInput, TodoUpdate } from './types/todo';
import ErrorMessage from './components/common/ErrorMessage';

function App() {
  const {
    todos,
    loading,
    error,
    board,
    createTodo,
    editTodo,
    removeTodo,
    toggleComplete,
    handleDragEnd,
    getTodosForColumn
  } = useTodos();

  const handleCreateTodo = (todo: TodoInput) => {
    createTodo(todo);
  };

  const handleUpdateTodo = (id: string, data: TodoUpdate) => {
    editTodo(id, data);
  };

  const handleDeleteTodo = (id: string) => {
    removeTodo(id);
  };

  const handleToggleComplete = (id: string, completed: boolean) => {
    toggleComplete(id, completed);
  };

  return (
    <Layout>
      <div className="max-w-6xl mx-auto">
        <div className="mb-8 text-center">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100 mb-2">
            My Todo List
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            Keep track of your tasks and boost your productivity
          </p>
        </div>
        
        {error && <ErrorMessage message={error} />}
        
        <KanbanBoardContainer
          todos={todos}
          loading={loading}
          error={error}
          board={board}
          onCreateTodo={handleCreateTodo}
          onUpdateTodo={handleUpdateTodo}
          onDeleteTodo={handleDeleteTodo}
          onToggleComplete={handleToggleComplete}
          handleDragEnd={handleDragEnd}
          getTodosForColumn={getTodosForColumn}
        />
      </div>
    </Layout>
  );
}

export default App;
