# AJAX(Asynchronous JavaScript And XML)

## AJAX란?

- Asynchronous JavaScript And XML
- Javascript를 이용하여 비동기적으로 데이터를 주고받는 기술

## 방법

1. `XMLHttpRequest`
2. JQuery의 Ajax
   - `$.ajax(...)`
3. `axios` & `fetch`
   - 아래에서 비교

## fetch vs axios

### 공통점

- 브라우저, node.js에서 사용하는 Promise 기반의 **HTTP 통신 라이브러리**
- Promise 기반? return을 Promise 객체로 해준다
- 따라서 response 데이터를 다루기 쉬움
- promise 기반으로 다루기가 쉽다

### fetch

- ES6부터 JS의 내장 라이브러리로 들어왔다
- 사용하는 프레임워크가 안정적이지 않을 때 사용하기 좋다
- `axios`보다 기능이 부족하다

### axios

- 내장 라이브러리가 아니므로 모듈 설치를 해야한다
- Response timeout 처리 방법이 있다
- 크로스 브라우징에 신경을 많이 써서, 브라우저 호환성이 좋다
