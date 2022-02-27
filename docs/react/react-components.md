# React 컴포넌트(Components)

[React Docs: Components와 Props](https://ko.reactjs.org/docs/components-and-props.html)

React에서는 `Component`를 통해 UI를 재사용 가능한 조각으로 나눌 수 있다.

컴포넌트는 개념적으로 **JS 함수**와 유사하다. `props`를 **입력**으로 받고, 보통 JSX로 기술되는 React `Element`를 **반환**하는 함수라고 볼 수 있다.

:::tip
`props`는 읽기 전용이다. 컴포넌트 안의 `props`를 수정하면 안 된다. 이는 React에서 엄격한 규칙이다. 컴포넌트에서 값을 제어하고 싶다면 `state`를 쓰면 된다.
:::

## 컴포넌트 정의

컴포넌트는 JS `function`과 `class` 두 가지 방법으로 정의할 수 있다.

### 함수 컴포넌트 (Function Component)

```jsx
function Welcome(props) {
	return <h1>Hello, {props.name}</h1>;
}
```

위에 나온 컴포넌트의 개념을 그대로 받아서, props를 입력받고 React element(여기서는 JSX)를 return하는 함수로 작성한다.

### 클래스 컴포넌트 (Class Component)

ES6 class 문법을 이용해서 정의할 수도 있다.

```jsx
class Welcome extends React.Component {
	render() {
		return <h1>Hello, {this.props.name}</h1>;
	}
}
```

- 클래스 컴포넌트는 `React.Component`를 상속받는 클래스다.
- 클래스 컴포넌트에서는 React element를 반환하는 `render()` 함수를 작성한다.
- 함수 컴포넌트에서 parameter로 받았던 `props`는 클래스 컴포넌트의 멤버 변수가 되어 `this.props`로 접근할 수 있다.
- 기존에는 `state`나 life cycle 기능들을 쓰려면 클래스 컴포넌트를 사용해야 했지만, React 16.8 버전부터 **Hook**이 도입되면서 함수 컴포넌트에서도 이런 기능들을 쓸 수 있게 됐다.

:::tip
컴포넌트의 이름은 항상 **대문자**로 시작해야 한다.

React는 JSX에서 소문자 태그는 DOM 태그로 처리하고, 대문자로 시작하는 태그를 컴포넌트로 구분한다.
:::

## 컴포넌트 렌더링(Rendering) & 합성(Composing)

### 컴포넌트 렌더링

React element를 기술할 때, DOM 태그처럼 Rect component를 사용할 수 있다.

```jsx{1,5}
function Welcome(props) {
	return <h1>Hello, {props.name}</h1>;
}

const element = <Welcome name="Sara" />;
ReactDOM.render(element, document.getElementById('root'));
```

> React가 사용자 정의 컴포넌트로 작성한 엘리먼트를 발견하면 JSX 어트리뷰트와 자식을 해당 컴포넌트에 단일 객체로 전달합니다. 이 객체를 “props”라고 합니다.

### 컴포넌트 합성

컴포넌트 안에 DOM 태그들을 포함하는 것처럼, 다른 컴포넌트도 참조할 수 있다. 똑같은 컴포넌트를 여러번 사용할 수도 있다.

```jsx{8-10}
function Welcome(props) {
	return <h1>Hello, {props.name}</h1>;
}

function App() {
	return (
		<div>
			<Welcome name="Sara" />
			<Welcome name="Cahal" />
			<Welcome name="Edite" />
		</div>
	);
}

ReactDOM.render(<App />, document.getElementById('root'));
```

일반적으로 React 앱은 최상위 `App` 컴포넌트를 작성해 그 안에 여러 컴포넌트들을 구성하고, `index.js`에서 이 `App` 컴포넌트를 렌더링하는 구조를 가진다.

하지만 React는 이 구조를 꼭 따라야 하는 framework가 아니고 필요한 곳에 갖다 쓸 수 있는 library이므로 필요한 부분에만 component나 react element등을 사용할 수도 있다.
