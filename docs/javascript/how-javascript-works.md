# JavaScript 동작 원리

[JavaScript와 이벤트 루프](https://meetup.toast.com/posts/89)

## JavaScript 엔진

JS코드를 해석하고 실행하는 인터프리터.
주로 웹 브라우저에 내장되어있지만 서버사이드(node.js)에서는 V8같은 엔진 이용

### JS 엔진 구성

- Call Stack
  **단 하나**의 Call stack(호출스택) 사용 -> "Run to Completion"
  함수가 실행되면 그에 해당하는 **스택 프레임**을 생성하여 Call stack에 push
  해당 함수 실행 중 다른 함수가 실행되면 또한 스택 프레임을 생성하여 push
  함수가 종료되면 pop하고 그 함수를 호출했던 함수로 돌아가 계속 실행
- Task Queue (Event queue)
  JavaScript RUntime Environment에서 처리할 Task들을 임시 저장하는 대기 큐.
  Call Stack이 비워지면 큐에 들어온 순서대로 수행
- 비동기로 호출되는 함수들은 Call Stack에 쌓이지 않고 Task Queue에 enqueue.
- 이벤트에 의해 실행되는 함수(핸들러)/WEB API에 정의된 함수들은 비동기로 실행된다.
- Heap
  동적으로 생성된 객체(instance)는 힙에 할당됨
- JS는 '단일 스레드' 기반의 언어다?
  A. JavaScript 엔진이 단일 호출 스택을 사용한다. JavaScript 구동환경(브라우저, Node.js)에서는 여러 스레드를 사용한다.

### 이벤트 루프

- Node.js의 경우 비동기 IO 지원을 위해 libuv 라이브러리 사용, libuv가 이벤트 루프 제공
- 모든 비동기 API들은 작업이 완료되면 콜백 함수를 태스크 큐에 추가
- 이벤트 루프는 Call Stack이 비워지면 태스크 큐의 첫번째 태스크를 실행
- 이벤트 **루프**인 이유: 콜 스택에 태스크가 없을때 태스크 큐에 태스크가 있는지 계속 검사하기 때문
