# Todo List Kanban Board Application

A feature-rich todo list application with Kanban board UI, built with React, TypeScript, and Firebase. This application allows users to create, update, delete, filter tasks and manage tasks with drag-and-drop functionality.

## Features

- **칸반보드 인터페이스**: 할일을 '할 일', '진행 중', '완료' 상태로 구분하여 관리
- **드래그 앤 드롭**: 태스크를 드래그하여 상태 변경 가능
- **실시간 동기화**: Firebase를 통한 실시간 데이터 동기화
- **우선순위 관리**: 높음, 중간, 낮음 우선순위 설정
- **다크 모드**: 시스템 테마에 맞춘 다크 모드 지원
- **반응형 디자인**: 모바일, 태블릿, 데스크톱 환경 모두 지원

## 기술 스택

- **프론트엔드**: React 19, TypeScript
- **상태 관리**: React Hooks
- **스타일링**: TailwindCSS
- **드래그 앤 드롭**: @hello-pangea/dnd (React Beautiful DnD의 React 19 호환 포크)
- **데이터베이스**: Firebase Firestore
- **아이콘**: React Icons

## 시작하기

### 사전 요구사항

- Node.js 14.0 이상
- npm 또는 yarn
- Firebase 계정

### 설치 방법

1. 레포지토리 클론:
   ```
   git clone <repository-url>
   cd todolist
   ```

2. 의존성 설치:
   ```
   npm install
   ```

3. 환경 변수 설정:
   프로젝트 루트에 `.env.local` 파일을 생성하고 Firebase 설정을 추가합니다.
   자세한 내용은 `ENV_SETUP.md` 파일을 참조하세요.

4. 개발 서버 실행:
   ```
   npm start
   ```

5. 브라우저에서 [http://localhost:3000](http://localhost:3000)으로 접속하여 앱을 확인합니다.

## 주요 기능 설명

### 칸반보드 구조

애플리케이션은 다음 세 가지 상태로 할 일을 구분합니다:

1. **할 일 (Todo)**: 아직 시작하지 않은 작업
2. **진행 중 (In Progress)**: 현재 작업 중인 항목
3. **완료 (Done)**: 완료된 작업

### 드래그 앤 드롭

사용자는 직관적인 드래그 앤 드롭 인터페이스를 통해 작업의 상태를 변경할 수 있습니다:

- 한 열에서 다른 열로 태스크를 드래그하여 상태 변경
- 같은 열 내에서 태스크 순서 변경
- 실시간으로 Firebase에 변경사항 반영

### 할 일 관리

- **할 일 추가**: 제목, 설명, 우선순위, 상태 설정
- **할 일 수정**: 모든 속성 수정 가능
- **할 일 삭제**: 필요 없는 항목 삭제
- **완료 체크**: 할 일의 완료 상태 토글

## 프로젝트 구조

```
src/
├── components/
│   ├── todo/
│   │   ├── KanbanBoard.tsx          # 칸반보드 컴포넌트
│   │   ├── KanbanBoardContainer.tsx # 칸반보드 컨테이너
│   │   ├── KanbanColumn.tsx         # 칸반보드 열 컴포넌트
│   │   ├── TodoItem.tsx             # 드래그 가능한 할 일 항목
│   │   ├── TodoForm.tsx             # 할 일 추가/수정 폼
│   │   └── PrioritySelector.tsx     # 우선순위 선택 컴포넌트
│   ├── common/
│   │   ├── LoadingSpinner.tsx       # 로딩 인디케이터
│   │   └── ErrorMessage.tsx         # 오류 메시지
│   └── layout/
│       └── Layout.tsx               # 앱 레이아웃 (다크모드 포함)
├── hooks/
│   └── useTodos.ts                  # 할 일 관리 커스텀 훅
├── services/
│   └── firebase.ts                  # Firebase 서비스
├── types/
│   └── todo.ts                      # 타입 정의
├── utils/
│   └── icons.ts                     # 아이콘 유틸리티
└── App.tsx                          # 앱 진입점
```

## Firebase 데이터베이스 구조

애플리케이션은 Firestore 데이터베이스의 `todos` 컬렉션을 사용합니다. 각 문서는 다음과 같은 구조를 가집니다:

```typescript
interface Todo {
  id: string;          // UUID
  title: string;       // 할 일 제목
  description: string; // 설명 (선택사항)
  priority: number;    // 우선순위 (1: 높음, 2: 중간, 3: 낮음)
  status: string;      // 상태 ('todo', 'inProgress', 'done')
  completed: boolean;  // 완료 여부
  createdAt: timestamp;// 생성 시간
  updatedAt: timestamp;// 마지막 수정 시간
  userId: string;      // 사용자 ID (인증 구현 시 사용)
}
```

## 환경 변수 설정

환경 변수 설정에 대한 자세한 정보는 `ENV_SETUP.md` 파일을 참조하세요.

## 라이선스

이 프로젝트는 MIT 라이선스를 따릅니다.
