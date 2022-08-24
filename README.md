# 노션 클로닝 프로젝트

Vanilla JS만을 사용하여 웹 서비스인 노션을 클로닝하는 프로젝트를 진행했습니다.

## 구현 방향

데이터의 흐름은 리엑트의 redux의 구조를 참고하여 구현했습니다.

<img src="https://user-images.githubusercontent.com/32689500/164178570-d5c2ec47-39c2-4d6d-9619-059fa5ffdcf7.svg" width="600" height="600">

### Store

- 모든 State를 관리.
- `dispatch()` 내부의 `reducer()`함수에서 이벤트에 종류에 따라 State를 변경

### Component

- 각 UI를 랜더링
- 발행-구독 패턴을 통해서 이벤트에 따라서 UI를 리랜더링
- State를 가지지 않으며 `getState()`를 이용해서 Store의 State를 참조

### UI

- 사용자와 상호작용하여 이벤트를 발생.

### Event Handler

- 이벤트 발생 시 이벤트 핸들러는 이벤트 관련 정보를 Store의 `dispatch()`함수의 매개변수로 전송

## 컴포넌트 구조

![test](https://user-images.githubusercontent.com/32689500/164192574-6896edcb-a341-40ae-890b-6c4af86f6af0.svg)
![struct](https://user-images.githubusercontent.com/32689500/164187879-1dc6b5c8-bb25-4d5d-ab9c-e3c9b3656739.svg)

### Store

- 어플리케이션의 모든 State를 가지고 관리.
- 이벤트 정보를 reducer에게 넘기고 처리된 State를 갱신함.
- 각 이벤트들에 따른 구독 정보를 저장하고 실행함.

### reducer

- 이벤트의 종류에 따라서 State가 어떻게 바뀌어야 하는지를 정리해 놓은 함수
- 현제 State와 발생한 Event 정보를 입력하면 다음 State를 반환한다.

### Sidebar

화면 우측에 표시되는 사이드바 컴포넌트이며 하위 컴포넌트로 SidebarHeader, DocumentList, SidebarFoot 3개가 있다.

- SidebarHeader
  - 사이드바 상단에 위치.
  - 별도 이벤트는 아직 구현하지 않음.
- DocumentList
  - 중간에 위치.
  - 모든 문서들의 제목과 상하관계를 트리 형태로 표현함.
  - 문서의 추가, 삭제, 선택, 하위문서 숨기기 등의 상호작용이 존재함.
- DocumentFooter
  - 하단에 위치
  - 최상위 문서 추가버튼이 존재

### Page

화면 좌측에 표시되는 컴포넌트, 하위 컴포넌트로 MainPage와 DocumentEditorPage가 있다.

- MainPage
  - 가장 기본으로 설정되어 있는 page
  - 아무런 문서를 선택하지 않았거나 선택한 문서가 삭제되었을 때 이 페이지가 출력된다.
- DocumentEditorPage
  - 선택한 문서의 제목과 내용을 표기하는 Editor와 하위 문서의 링크버튼이 표시되는 DocumentLinkContainer, 두 개의 하위 컴포넌트가 있다.

### Modal

특수한 경우에 화면 전체를 어둡게 하고 가운데에 새 창을 표시하는 컴포넌트, 이벤트 발생 이전에는 `display: none`이므로 공간을 차지하지 않는다.

## 이 외

### api.js

- API request를 사용 목적에 따라 나누어 함수로 구현해놓은 파일
- 보안상의 이유로 API end-point 값은 생략했습니다.

### constants.js

- 여러 컴포넌트가 공통적으로 사용하는 상수를 변수에 저장해 관리하는 파일

### storage.js

- 새션 스토리지를 사용하기 위한 함수가 있는 파일

### svg.js

- 어플리케이션 디자인에서 필요한 icon을 svg 태그로 구현해 js 변수에 저장해놓은 파일
