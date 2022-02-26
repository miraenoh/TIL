# JSX

JavaScript를 확장한 문법.

```jsx
const element = <h1>Hello, world!</h1>;
```

React에서 UI를 표현하기 위헤 사용하는 문법이다. JS 코드에 마크업을 넣을 수 있는데, `React.createElement()`로 생성한 것과 같은 React element를 반환한다.

즉, 위 코드를 Babel로 Pure JS 컴파일하면 밑처럼 나온다.

```jsx
const element = React.createElement('h1', null, 'Hello, world!');
```

:::tip
React에서 JSX 사용은 필수가 아님. but `createElement`로 생성하는 방법에 비해 편하고 가독성이 좋기 때문에 보통은 쓴다고
:::

## 표현식(Expression) 삽입

## JSX 속성(Attributes)
