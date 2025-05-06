## **Project Overview (프로젝트 개요):**

**이 프로젝트는 사용자가 할 일을 관리할 수 있는 투두리스트 웹 애플리케이션으로, Firebase를 활용해 데이터를 저장하고 관리합니다.**

1. 사용자는 할 일을 추가, 수정, 삭제할 수 있으며, Firebase에 저장된 데이터가 실시간으로 동기화됩니다.
2. 간단하고 직관적인 인터페이스를 통해 할 일의 우선순위를 설정하고 완료된 항목을 체크할 수 있습니다.

## **Core Functionalities (핵심 기능):**

**투두리스트의 주요 기능은 다음과 같습니다:**

1. **할 일 추가**: 사용자가 새로운 할 일을 추가하면 Firebase에 저장됩니다.
2. **할 일 수정**: 기존 할 일을 수정하면 Firebase에 자동으로 반영됩니다.
3. **할 일 삭제**: 불필요한 항목을 삭제하면 Firebase에서도 제거됩니다.
4. **완료 체크**: 완료된 항목을 체크하면 Firebase에 해당 정보가 업데이트됩니다.
5. **우선순위 설정**: 할 일의 중요도를 설정하여 우선 처리할 항목을 관리합니다.

## **Doc (문서):**

**프로젝트 개발에 사용될 기술 스택과 도구는 다음과 같습니다:**

1. **Frontend**: React, TailwindCSS, TypeScript를 사용하여 UI와 기능을 구현합니다.
2. **Backend**: Firestore를 사용하여 데이터를 저장하고 실시간으로 동기화합니다.
3. **npm 패키지**:

• firebase: Firebase와의 연동을 위해 사용합니다.

• react-icons: 직관적인 인터페이스를 위한 아이콘을 제공합니다.

• uuid: 각 투두 항목에 고유한 ID를 부여합니다.

## **Development Checklist (개발 체크리스트):**

### 1. 프로젝트 초기 설정
- [ ] React + TypeScript 프로젝트 생성
- [ ] TailwindCSS 설정
- [ ] Firebase 프로젝트 생성 및 설정
- [ ] 필요한 npm 패키지 설치
- [ ] ESLint, Prettier 설정

### 2. Firebase 설정
- [ ] Firebase 초기화 코드 작성
- [ ] Firestore 데이터베이스 규칙 설정
- [ ] Firebase 보안 규칙 설정
- [ ] Firebase 연동 테스트

### 3. 컴포넌트 개발
- [ ] TodoList 컴포넌트
- [ ] TodoItem 컴포넌트
- [ ] TodoForm 컴포넌트
- [ ] PrioritySelector 컴포넌트
- [ ] LoadingSpinner 컴포넌트
- [ ] ErrorMessage 컴포넌트

### 4. 기능 구현
- [ ] 할 일 추가 기능
- [ ] 할 일 수정 기능
- [ ] 할 일 삭제 기능
- [ ] 완료 체크 기능
- [ ] 우선순위 설정 기능
- [ ] 실시간 데이터 동기화

### 5. UI/UX 구현
- [ ] 반응형 디자인 적용
- [ ] 다크 모드 지원
- [ ] 로딩 상태 표시
- [ ] 에러 처리 및 표시
- [ ] 사용자 피드백 구현

### 6. 테스트 및 최적화
- [ ] 단위 테스트 작성
- [ ] 성능 최적화
- [ ] 코드 리팩토링
- [ ] 크로스 브라우저 테스트

## **File Structure (파일 구조):**

```
src/
├── components/
│   ├── todo/
│   │   ├── TodoList.tsx
│   │   ├── TodoItem.tsx
│   │   ├── TodoForm.tsx
│   │   └── PrioritySelector.tsx
│   ├── common/
│   │   ├── LoadingSpinner.tsx
│   │   └── ErrorMessage.tsx
│   └── layout/
│       └── Layout.tsx
├── hooks/
│   ├── useTodos.ts
│   └── useFirebase.ts
├── services/
│   └── firebase.ts
├── types/
│   └── todo.ts
├── utils/
│   ├── constants.ts
│   └── helpers.ts
├── styles/
│   └── globals.css
├── App.tsx
└── main.tsx
```

### 주요 파일 설명:

1. **components/**
   - `todo/`: 투두리스트 관련 컴포넌트
   - `common/`: 공통으로 사용되는 컴포넌트
   - `layout/`: 레이아웃 관련 컴포넌트

2. **hooks/**
   - `useTodos.ts`: 투두리스트 관련 커스텀 훅
   - `useFirebase.ts`: Firebase 관련 커스텀 훅

3. **services/**
   - `firebase.ts`: Firebase 초기화 및 설정

4. **types/**
   - `todo.ts`: TypeScript 타입 정의

5. **utils/**
   - `constants.ts`: 상수 정의
   - `helpers.ts`: 유틸리티 함수

## **Current File Structure (현재 파일 구조):**

실제 프로젝트가 생성되면 커서를 이용해 작성할 예정이므로 현재는 비워둡니다.