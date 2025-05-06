
# 📋 Todo List Kanban Board Application  
> A feature-rich Kanban-style todo list app built with React, TypeScript, and Firebase.  
> ✅ 리액트, 타입스크립트, 파이어베이스 기반의 칸반보드 할 일 관리 앱입니다.

---

## ✨ Features | 기능

- 🧱 **Kanban Board Interface**  
  구분된 컬럼으로 할 일(Task)을 `할 일`, `진행 중`, `완료`로 관리

- 🎯 **Drag & Drop Support**  
  마우스로 태스크를 드래그하여 상태 및 순서를 변경

- 🔄 **Real-time Synchronization**  
  Firebase Firestore를 통한 실시간 데이터 반영

- 📌 **Priority Management**  
  `높음`, `중간`, `낮음` 우선순위 태깅 기능

- 🌙 **Dark Mode**  
  시스템 테마에 맞춰 다크모드 자동 적용

- 📱 **Responsive Design**  
  데스크톱, 태블릿, 모바일 환경 모두 최적화

---

## 🛠️ Tech Stack | 기술 스택

| Category       | Stack                                                                 |
|----------------|-----------------------------------------------------------------------|
| Frontend       | React 19, TypeScript                                                  |
| State Handling | React Hooks                                                           |
| Styling        | Tailwind CSS                                                          |
| Drag & Drop    | @hello-pangea/dnd (React Beautiful DnD의 React 19 호환 포크)         |
| DB/Realtime    | Firebase Firestore                                                    |
| Icons          | React Icons                                                           |

---

## 🚀 Getting Started | 시작하기

### ✅ Prerequisites | 사전 요구사항

- Node.js 14 이상
- npm 또는 yarn
- Firebase 프로젝트 및 API 키

### 📦 Installation | 설치

```bash
git clone <repository-url>
cd todolist
npm install
```

### ⚙️ Environment Variables | 환경 변수 설정

1. 루트에 `.env.local` 파일 생성  
2. Firebase 정보를 아래 형식으로 입력:

```env
REACT_APP_FIREBASE_API_KEY=...
REACT_APP_FIREBASE_AUTH_DOMAIN=...
REACT_APP_FIREBASE_PROJECT_ID=...
REACT_APP_FIREBASE_STORAGE_BUCKET=...
REACT_APP_FIREBASE_MESSAGING_SENDER_ID=...
REACT_APP_FIREBASE_APP_ID=...
```

👉 상세 내용은 `ENV_SETUP.md` 참조

### ▶️ Start Development Server | 개발 서버 실행

```bash
npm start
```

브라우저에서 [http://localhost:3000](http://localhost:3000) 접속

---

## 🧩 Core Features | 주요 기능 설명

### 📌 Kanban Columns

1. **Todo** – 아직 시작되지 않은 작업  
2. **In Progress** – 현재 작업 중  
3. **Done** – 완료된 항목

### 🔁 Drag & Drop Interactions

- 열 간 상태 이동
- 열 내 순서 변경
- 변경 시 실시간 Firebase 반영

### 📝 Task Management

- 추가: 제목, 설명, 우선순위, 상태 입력
- 수정: 모든 필드 변경 가능
- 삭제: 필요 없는 태스크 제거
- 완료 체크: `완료` 상태 전환

---

## 📂 Project Structure | 프로젝트 구조

```
src/
├── components/
│   ├── todo/
│   │   ├── KanbanBoard.tsx
│   │   ├── KanbanBoardContainer.tsx
│   │   ├── KanbanColumn.tsx
│   │   ├── TodoItem.tsx
│   │   ├── TodoForm.tsx
│   │   └── PrioritySelector.tsx
│   ├── common/
│   │   ├── LoadingSpinner.tsx
│   │   └── ErrorMessage.tsx
│   └── layout/
│       └── Layout.tsx
├── hooks/
│   └── useTodos.ts
├── services/
│   └── firebase.ts
├── types/
│   └── todo.ts
├── utils/
│   └── icons.ts
└── App.tsx
```

---

## 🔥 Firebase Firestore Schema

```ts
interface Todo {
  id: string;
  title: string;
  description?: string;
  priority: number;           // 1: 높음, 2: 중간, 3: 낮음
  status: 'todo' | 'inProgress' | 'done';
  completed: boolean;
  createdAt: Timestamp;
  updatedAt: Timestamp;
  userId?: string;
}
```

---

## 📜 License | 라이선스

MIT License
