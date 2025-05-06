import { useState, useEffect, useCallback } from 'react';
import { 
  Todo, 
  TodoInput, 
  TodoUpdate, 
  TodoStatus, 
  KanbanBoard
} from '../types/todo';
import { 
  addTodo, 
  getTodos, 
  updateTodo, 
  deleteTodo, 
  subscribeTodos, 
  updateTodoStatus 
} from '../services/firebase';
import { DropResult } from '@hello-pangea/dnd';

// 타입 가드 함수 추가
const isTodoStatus = (status: any): status is TodoStatus => {
  return Object.values(TodoStatus).includes(status as TodoStatus);
};

export const useTodos = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [initialized, setInitialized] = useState<boolean>(false);
  const [board, setBoard] = useState<KanbanBoard>({
    columns: {
      [TodoStatus.Todo]: {
        id: TodoStatus.Todo,
        title: '할 일',
        todoIds: [] as string[]
      },
      [TodoStatus.InProgress]: {
        id: TodoStatus.InProgress,
        title: '진행 중',
        todoIds: [] as string[]
      },
      [TodoStatus.Done]: {
        id: TodoStatus.Done,
        title: '완료',
        todoIds: [] as string[]
      }
    },
    columnOrder: [TodoStatus.Todo, TodoStatus.InProgress, TodoStatus.Done]
  });

  // Convert todos array to kanban board structure
  const updateBoardFromTodos = useCallback((todosList: Todo[]) => {
    const newBoard = {
      columns: {
        [TodoStatus.Todo]: {
          id: TodoStatus.Todo,
          title: '할 일',
          todoIds: [] as string[]
        },
        [TodoStatus.InProgress]: {
          id: TodoStatus.InProgress,
          title: '진행 중',
          todoIds: [] as string[]
        },
        [TodoStatus.Done]: {
          id: TodoStatus.Done,
          title: '완료',
          todoIds: [] as string[]
        }
      },
      columnOrder: [TodoStatus.Todo, TodoStatus.InProgress, TodoStatus.Done]
    };
    
    // Group todos by status
    todosList.forEach(todo => {
      let status = todo.status;
      
      // 유효한 상태가 아니면 기본값 설정
      if (!isTodoStatus(status)) {
        status = todo.completed ? TodoStatus.Done : TodoStatus.Todo;
      }
      
      newBoard.columns[status].todoIds.push(todo.id);
    });
    
    setBoard(newBoard);
  }, []);

  useEffect(() => {
    let unsubscribe: () => void;
    
    const initializeFirebase = async () => {
      try {
        setLoading(true);
        
        // Subscribe to real-time updates
        unsubscribe = subscribeTodos((updatedTodos) => {
          setTodos(updatedTodos);
          updateBoardFromTodos(updatedTodos);
          setLoading(false);
          setInitialized(true);
        });
        
        // 5초 후에도 데이터가 로드되지 않으면 로딩 상태 해제
        setTimeout(() => {
          if (!initialized) {
            setLoading(false);
            setInitialized(true);
            console.log("Firebase subscription timeout - forcing UI to render");
          }
        }, 5000);
        
      } catch (err) {
        setError('Failed to connect to Firebase');
        console.error(err);
        setLoading(false);
        setInitialized(true);
      }
    };

    initializeFirebase();

    // Cleanup subscription
    return () => {
      if (unsubscribe) {
        unsubscribe();
      }
    };
  }, [updateBoardFromTodos, initialized]);

  const createTodo = async (todo: TodoInput) => {
    try {
      setLoading(true);
      await addTodo(todo);
      setError(null);
    } catch (err) {
      setError('Failed to create todo');
      console.error(err);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const editTodo = async (id: string, data: TodoUpdate) => {
    try {
      setLoading(true);
      await updateTodo(id, data);
      setError(null);
    } catch (err) {
      setError('Failed to update todo');
      console.error(err);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const removeTodo = async (id: string) => {
    try {
      setLoading(true);
      await deleteTodo(id);
      setError(null);
    } catch (err) {
      setError('Failed to delete todo');
      console.error(err);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const toggleComplete = async (id: string, completed: boolean) => {
    return editTodo(id, { 
      completed: !completed,
      status: !completed ? TodoStatus.Done : TodoStatus.Todo 
    });
  };

  // Update todo status (for Kanban board)
  const moveTask = async (id: string, newStatus: TodoStatus) => {
    try {
      setLoading(true);
      await updateTodoStatus(id, newStatus);
      setError(null);
    } catch (err) {
      setError(`Failed to move task to ${newStatus}`);
      console.error(err);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  // Handle drag end event from react-beautiful-dnd
  const handleDragEnd = async (result: DropResult) => {
    const { destination, source, draggableId } = result;

    // If no destination or dropped in the same place
    if (!destination || 
        (destination.droppableId === source.droppableId && 
         destination.index === source.index)) {
      return;
    }

    const sourceStatus = source.droppableId as TodoStatus;
    const destinationStatus = destination.droppableId as TodoStatus;
    
    // If dropped in a different column
    if (sourceStatus !== destinationStatus) {
      // Update local state for immediate feedback
      const newBoard = { ...board };
      
      // Remove from source column
      const sourceColumn = newBoard.columns[sourceStatus];
      const sourceIds = Array.from(sourceColumn.todoIds);
      sourceIds.splice(source.index, 1);
      newBoard.columns[sourceStatus] = {
        ...sourceColumn,
        todoIds: sourceIds
      };
      
      // Add to destination column
      const destColumn = newBoard.columns[destinationStatus];
      const destIds = Array.from(destColumn.todoIds);
      destIds.splice(destination.index, 0, draggableId);
      newBoard.columns[destinationStatus] = {
        ...destColumn,
        todoIds: destIds
      };
      
      // Update state
      setBoard(newBoard);
      
      // Update database
      try {
        await updateTodoStatus(draggableId, destinationStatus);
      } catch (error) {
        console.error('Failed to update task status:', error);
        // Revert to original state on error
        updateBoardFromTodos(todos);
      }
    } else {
      // If just reordering within the same column, we can
      // update the local state for a smoother experience
      const newBoard = { ...board };
      const column = newBoard.columns[sourceStatus];
      const newTodoIds = Array.from(column.todoIds);
      
      // Remove from old position
      newTodoIds.splice(source.index, 1);
      // Insert at new position
      newTodoIds.splice(destination.index, 0, draggableId);
      
      // Update column
      newBoard.columns[sourceStatus] = {
        ...column,
        todoIds: newTodoIds
      };
      
      setBoard(newBoard);
    }
  };

  // Get todos for a specific column
  const getTodosForColumn = (status: TodoStatus): Todo[] => {
    const column = board.columns[status];
    if (!column) return [];
    
    return column.todoIds.map(todoId => 
      todos.find(todo => todo.id === todoId)
    ).filter(todo => todo !== undefined) as Todo[];
  };

  return {
    todos,
    loading,
    error,
    board,
    createTodo,
    editTodo,
    removeTodo,
    toggleComplete,
    handleDragEnd,
    getTodosForColumn,
    moveTask
  };
}; 