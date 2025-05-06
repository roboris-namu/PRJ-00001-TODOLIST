# Firebase 데이터베이스 구조 및 사용 가이드

## 데이터베이스 구조

### 컬렉션: `todos`
각 할 일 항목은 다음과 같은 구조로 저장됩니다:

```typescript
interface Todo {
  id: string;          // UUID로 생성된 고유 식별자
  title: string;       // 할 일 제목
  description: string; // 할 일 설명 (선택사항)
  priority: number;    // 우선순위 (1: 높음, 2: 중간, 3: 낮음)
  completed: boolean;  // 완료 여부
  createdAt: timestamp;// 생성 시간
  updatedAt: timestamp;// 수정 시간
  userId: string;      // 사용자 ID (인증 구현 시 사용)
}
```

## 사용 방법

### 1. Firebase 초기화
```typescript
import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  // Firebase 설정 정보
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
```

### 2. CRUD 작업 예시

#### 할 일 추가
```typescript
import { collection, addDoc } from 'firebase/firestore';

const addTodo = async (todo: Omit<Todo, 'id'>) => {
  const docRef = await addDoc(collection(db, 'todos'), {
    ...todo,
    createdAt: new Date(),
    updatedAt: new Date()
  });
  return docRef.id;
};
```

#### 할 일 조회
```typescript
import { collection, query, orderBy, getDocs } from 'firebase/firestore';

const getTodos = async () => {
  const q = query(collection(db, 'todos'), orderBy('createdAt', 'desc'));
  const querySnapshot = await getDocs(q);
  return querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
};
```

#### 할 일 수정
```typescript
import { doc, updateDoc } from 'firebase/firestore';

const updateTodo = async (id: string, data: Partial<Todo>) => {
  const todoRef = doc(db, 'todos', id);
  await updateDoc(todoRef, {
    ...data,
    updatedAt: new Date()
  });
};
```

#### 할 일 삭제
```typescript
import { doc, deleteDoc } from 'firebase/firestore';

const deleteTodo = async (id: string) => {
  await deleteDoc(doc(db, 'todos', id));
};
```

## 데이터베이스 규칙

### 1. 데이터 구조 규칙
- 모든 할 일 항목은 필수 필드(id, title, priority, completed, createdAt, updatedAt)를 포함해야 합니다.
- description은 선택사항이지만, 제공될 경우 문자열이어야 합니다.
- priority는 1, 2, 3 중 하나의 값만 가질 수 있습니다.
- createdAt과 updatedAt은 timestamp 타입이어야 합니다.

### 2. 데이터 검증 규칙
```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /todos/{todoId} {
      allow read: if true;  // 모든 사용자가 읽기 가능
      allow create: if request.resource.data.keys().hasAll(['title', 'priority', 'completed', 'createdAt', 'updatedAt'])
                   && request.resource.data.title is string
                   && request.resource.data.priority in [1, 2, 3]
                   && request.resource.data.completed is bool
                   && request.resource.data.createdAt is timestamp
                   && request.resource.data.updatedAt is timestamp;
      allow update: if request.resource.data.diff(resource.data).affectedKeys()
                      .hasOnly(['title', 'description', 'priority', 'completed', 'updatedAt'])
                   && request.resource.data.updatedAt is timestamp;
      allow delete: if true;  // 모든 사용자가 삭제 가능
    }
  }
}
```

### 3. 성능 최적화 규칙
- 할 일 목록을 조회할 때는 createdAt 기준으로 정렬하여 최신 항목을 먼저 표시합니다.
- 대량의 데이터를 한 번에 조회하지 않도록 페이지네이션을 구현합니다.
- 실시간 업데이트를 위해 필요한 경우에만 onSnapshot을 사용합니다.

### 4. 보안 규칙
- 현재는 모든 사용자가 읽기/쓰기/삭제가 가능하도록 설정되어 있습니다.
- 인증 기능이 추가되면 userId를 기준으로 접근 제어를 구현해야 합니다.
- 민감한 정보는 저장하지 않습니다.