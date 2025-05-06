# 환경 변수 설정 가이드

이 문서는 투두리스트 칸반보드 애플리케이션을 위한 환경 변수 설정 방법을 설명합니다.

## 환경 변수 파일 생성

프로젝트 루트 디렉토리에 `.env.local` 파일을 생성하고 다음과 같은 형식으로 환경 변수를 설정하세요:

```
# Firebase 설정
REACT_APP_FIREBASE_API_KEY=your-api-key
REACT_APP_FIREBASE_AUTH_DOMAIN=your-app.firebaseapp.com
REACT_APP_FIREBASE_PROJECT_ID=your-app
REACT_APP_FIREBASE_STORAGE_BUCKET=your-app.appspot.com
REACT_APP_FIREBASE_MESSAGING_SENDER_ID=your-sender-id
REACT_APP_FIREBASE_APP_ID=your-app-id

# 애플리케이션 설정
REACT_APP_NAME=할 일 관리 앱
REACT_APP_VERSION=1.0.0

# 개발 설정
REACT_APP_DEBUG_MODE=true
BROWSER=none
```

## Firebase 설정 가져오기

1. [Firebase 콘솔](https://console.firebase.google.com/)에 로그인합니다.
2. 프로젝트를 생성하거나 기존 프로젝트를 선택합니다.
3. 프로젝트 설정(⚙️) > 프로젝트 설정으로 이동합니다.
4. "웹 앱에 Firebase 추가" 버튼을 클릭하여 웹 앱을 등록합니다.
5. 앱을 등록한 후, `firebaseConfig` 객체를 복사하여 환경 변수에 설정합니다.

## Firestore 데이터베이스 설정

1. Firebase 콘솔에서 "Firestore Database"를 선택합니다.
2. "데이터베이스 만들기" 버튼을 클릭합니다.
3. 시작 모드(테스트 모드 또는 프로덕션 모드)를 선택합니다.
4. 데이터베이스가 생성되면 "규칙" 탭으로 이동하여 다음과 같이 보안 규칙을 설정합니다:

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /todos/{todoId} {
      allow read: if true;  // 모든 사용자가 읽기 가능
      allow create: if request.resource.data.keys().hasAll(['title', 'priority', 'completed', 'createdAt', 'updatedAt', 'status'])
                   && request.resource.data.title is string
                   && request.resource.data.priority in [1, 2, 3]
                   && request.resource.data.completed is bool
                   && request.resource.data.createdAt is timestamp
                   && request.resource.data.updatedAt is timestamp;
      allow update: if request.resource.data.diff(resource.data).affectedKeys()
                      .hasOnly(['title', 'description', 'priority', 'completed', 'updatedAt', 'status'])
                   && request.resource.data.updatedAt is timestamp;
      allow delete: if true;  // 모든 사용자가 삭제 가능
    }
  }
}
```

## 주의사항

- `.env.local` 파일은 Git에 커밋하지 않습니다(`.gitignore`에 포함되어 있음).
- 프로덕션 배포 시에는 호스팅 서비스의 환경 변수 설정 기능을 사용하세요.
- 개발 환경에서는 `.env.development.local`, 프로덕션 환경에서는 `.env.production.local` 파일을 사용할 수도 있습니다.

## 환경 변수 사용 방법

React 애플리케이션에서는 `process.env.REACT_APP_*` 형식으로 환경 변수에 접근할 수 있습니다.

예시:
```javascript
const apiKey = process.env.REACT_APP_FIREBASE_API_KEY;
```

## 문제해결

- 환경 변수 변경 후에는 개발 서버를 재시작해야 변경사항이 적용됩니다.
- 환경 변수가 제대로 로드되지 않는 경우, `.env` 파일의 형식을 확인하세요(공백이나 따옴표가 없어야 함).
- 환경 변수 이름은 반드시 `REACT_APP_`으로 시작해야 합니다. 