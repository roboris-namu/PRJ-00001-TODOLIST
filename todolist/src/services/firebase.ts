import { initializeApp } from 'firebase/app';
import { 
  getFirestore, 
  collection, 
  addDoc, 
  doc, 
  updateDoc, 
  deleteDoc, 
  query, 
  orderBy, 
  getDocs, 
  onSnapshot, 
  Timestamp 
} from 'firebase/firestore';
import { Todo, TodoInput, TodoUpdate, TodoStatus } from '../types/todo';

// Firebase configuration
// 실제 사용 시 .env 파일에서 환경변수를 불러와 사용해야 합니다
// 예: process.env.REACT_APP_FIREBASE_API_KEY
const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY || "AIzaSyAhQG2cT7idJkvjIRo0pgMin_HaYvtT6J0",
  authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN || "prj00001-todolist.firebaseapp.com",
  projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID || "prj00001-todolist",
  storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET || "prj00001-todolist.firebasestorage.app",
  messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID || "411317712668",
  appId: process.env.REACT_APP_FIREBASE_APP_ID || "1:411317712668:web:af15a9f3017c0b1ab26cd9"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

// Collection reference
const todosCollection = collection(db, 'todos');

// Add a new todo
export const addTodo = async (todo: TodoInput): Promise<string> => {
  // Assign default status if not provided
  const todoWithStatus = {
    ...todo,
    status: todo.status || TodoStatus.Todo
  };
  
  const docRef = await addDoc(todosCollection, {
    ...todoWithStatus,
    createdAt: Timestamp.now(),
    updatedAt: Timestamp.now()
  });
  return docRef.id;
};

// Get all todos
export const getTodos = async (): Promise<Todo[]> => {
  const q = query(todosCollection, orderBy('createdAt', 'desc'));
  const querySnapshot = await getDocs(q);
  return querySnapshot.docs.map(doc => {
    const data = doc.data();
    
    // Ensure status is set (for backward compatibility with existing data)
    if (!data.status) {
      data.status = data.completed ? TodoStatus.Done : TodoStatus.Todo;
    }
    
    return { 
      id: doc.id, 
      ...data 
    } as Todo;
  });
};

// Update a todo
export const updateTodo = async (id: string, data: TodoUpdate): Promise<void> => {
  const todoRef = doc(db, 'todos', id);
  
  // Update completed field based on status if needed
  const updateData = { ...data };
  if (data.status === TodoStatus.Done && !('completed' in data)) {
    updateData.completed = true;
  } else if (data.status === TodoStatus.Todo && !('completed' in data)) {
    updateData.completed = false;
  }
  
  await updateDoc(todoRef, {
    ...updateData,
    updatedAt: Timestamp.now()
  });
};

// Delete a todo
export const deleteTodo = async (id: string): Promise<void> => {
  await deleteDoc(doc(db, 'todos', id));
};

// Update todo status
export const updateTodoStatus = async (id: string, status: TodoStatus): Promise<void> => {
  const todoRef = doc(db, 'todos', id);
  
  await updateDoc(todoRef, {
    status,
    // Update completed field to maintain compatibility
    completed: status === TodoStatus.Done,
    updatedAt: Timestamp.now()
  });
};

// Subscribe to todos (real-time updates)
export const subscribeTodos = (callback: (todos: Todo[]) => void): (() => void) => {
  const q = query(todosCollection, orderBy('createdAt', 'desc'));
  
  return onSnapshot(q, (querySnapshot) => {
    const todos = querySnapshot.docs.map(doc => {
      const data = doc.data();
      
      // Ensure status is set (for backward compatibility)
      if (!data.status) {
        data.status = data.completed ? TodoStatus.Done : TodoStatus.Todo;
      }
      
      return {
        id: doc.id,
        ...data
      } as Todo;
    });
    callback(todos);
  });
};

export default db; 