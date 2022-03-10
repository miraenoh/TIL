# React 훅(Hooks) - useState, useEffect

React 공식 문서에서 클래스 컴포넌트 대신 사용을 권장하는 훅을 공부해 보자!

## 훅(Hook)이란?

[Hook 개요](https://ko.reactjs.org/docs/hooks-overview.html)

> Hook은 함수 컴포넌트에서 React state와 생명주기 기능(lifecycle features)을 “연동(hook into)“할 수 있게 해주는 함수입니다.

👉🏻 Hook은 **함수 컴포넌트**도 클래스 컴포넌트처럼 `state`와 `생명주기 기능`을 쓸 수 있게 해 주는 기능이다.

React 16.8 버전 이전에는 state와 생명주기 기능을 쓰려면 클래스 컴포넌트를 사용해야 했는데, 16.8 버전부터 Hook을 추가하면서 함수 컴포넌트에서 이 기능들을 쓸 수 있게 됐고, 또 이렇게 사용하는 걸 [공식 문서에서도 권장하고 있다](https://ko.reactjs.org/docs/hooks-intro.html#motivation).

## React 내장 Hook

React 라이브러리 자체에 내장되어 사용할 수 있는 Hook들이다. 👇🏻

- 기본 Hooks
  - `useState` `useEffect` `useContext`
- 추가 Hooks
  - `useReducer` `useCallback` `useMemo` `useRef`, `useImperativeHandle` `useLayoutEffect` `useDebugValue`

기본적으로 위의 세 가지 Hook을 제공하고, 추가 Hook들은 "기본 Hook의 변경이거나 특정한 경우에만 필요한 것"이라고 한다. 추가 훅은 아직 사용해 본 적 없는데...필요할 때 공부해서 쓰면 될 것 같다.

## React `state`와 `useState` Hook

[Using the State Hook](https://ko.reactjs.org/docs/hooks-state.html)

## state

React에서 `state`는 함수 내에 선언된 변수처럼 React 컴포넌트 안에서 관리되는 JS 객체이다.

:::tip
나는 대충 컴포넌트 안의 변수인데, 값을 바꾸면 UI에도 자동으로 업데이트되는 신기한 변수(...)라고 이해함...
:::

### Class Component에서의 state

Hook 이전에는 함수 컴포넌트가 아닌 클래스 컴포넌트에서만 쓸 수 있었고, 이런 식으로👇🏻 썼다.

```jsx
class Example extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			count: 0
		};
	}

	render() {
		return (
			<div>
				<p>You clicked {this.state.count} times</p>
				<button onClick={() => this.setState({ count: this.state.count + 1 })}>Click me</button>
			</div>
		);
	}
}
```

`this.state` 객체를 두고, 이 객체 안에 관리할 값들을 속성(Property)로 둔다. 이 값들은 컴포넌트 안에서 `this.state.속성이름`으로 접근할 수 있고, 업데이트할 때는 `this.setState({속성이름: 새 값})` 이런 식으로 `setState` 함수를 호출해서 업데이트한다.

:::warning
state 값을 업데이트 할 때는 변수처럼 직접 접근해서 업데이트하지 않는다. 그렇게 해 봤자 UI에 렌더링되지 않으니까 state를 쓰는 의미가 없다.
:::

아무튼 이전에는 클래스 컴포넌트에서 이런 식으로 썼는데, `useState` Hook을 사용하면 함수 컴포넌트에서도 state 사용이 가능하다. (클래스 컴포넌트에서 this의 object로 선언하고, 관리하는 방식이 코드 보기에 썩 좋지도 않은 것 같다...)

### Function component에서의 state

```jsx{4}
import React, { useState } from 'react';

function Example() {
	const [count, setCount] = useState(0);

	return (
		<div>
			<p>You clicked {count} times</p>
			<button onClick={() => setCount(count + 1)}>Click me</button>
		</div>
	);
}
```

Hook은 `React.useState(...)`이런식으로 쓸 수도 있고, 👆🏻위처럼 import문에서 따로 Hook을 import하면 그냥 `useState` 이런식으로 쓸 수도 있다.

함수 컴포넌트에서처럼 하나의 객체에 속성으로 넣는 게 아니라 stateful하게 사용할 값을 각각 const로 선언해주는데, 이 때 `useState` 함수를 사용한다.

`useState` 함수는 에디터의 설명에 따르면 **stateful**한 **값**과 이걸 **업데이트할 함수**를 반환한다. 이 두개를 순서대로 반환하기 때문에, ES6 문법 `destructuring`을 이용해서 `[statefulValue, setStatefulValue] = useState(initialValue)` 이런식으로 사용할 값을 세팅해준다.

컴포넌트 안에서 값에 접근 & 업데이트하는 방식도 다른데, `this.state.~~` 이런식으로 쓰지 않고 그냥 컴포넌트 안의 변수/함수처럼 `this.state` 없이 바로 접근하고 호출한다.

stateful한 값을 여러개 사용하고 싶을 때는,

```jsx
const [count, setCount] = useState(0);
const [someValue, setSomeValue] = useState(초기값);
```

👆🏻이렇게 `useState` 훅을 여러번 사용하면 된다.

:::tip
state 업데이트는 **비동기**(Asynchronous)이다. 따라서 만약에 어떤 메소드 안에서 set~~을 이용해 state 값을 업데이트하고 바로 다음줄에 그 값을 콘솔에다 찍으면 업데이트 전 값이 나온다. 비동기라는걸 염두하고 코드를 쓰자!
:::

## React 생명주기 기능과 `useEffect` Hook

[Using the Effect Hook](https://ko.reactjs.org/docs/hooks-effect.html)

클래스 컴포넌트에서는 `componentDidMount()`, `componentWillUnmount()`, `componentDidUpdate()`와 같은 생명주기 메소드를 사용하여 컴포넌트가 렌더링되고 업데이트되는 등의 생명주기를 거칠 때 필요한 일을 처리했다.

이런 작업들을 **side effect**, 줄여서 **effect**라고 하는데 이 단어에서 나온게 `useEffect` Hook으로, 함수 컴포넌트의 생명주기에 관련해서 effect들을 처리할 수 있게 해주는 기능이다.

특히, 함수 컴포넌트에서 여러 생명주기 메소드에 나눠서 처리해야 했던 부분을 `useEffect` 문법 하나로 다 할 수 있게 만들어져 있다.

### `useEffect`로 컴포넌트가 렌더링될 때마다 effect 처리하기

```jsx
function Example() {
	const [count, setCount] = useState(0);

	// componentDidMount, componentDidUpdate와 같은 방식으로
	useEffect(() => {
		// 브라우저 API를 이용하여 문서 타이틀을 업데이트합니다.
		document.title = `You clicked ${count} times`;
	});

	...
}
```

👆🏻위 코드에서 effect란 state value인 `count`의 값에 맞게 웹 페이지 제목을 업데이트 하는 작업이다.

`useEffect` Hook에 effect를 수행하는 함수를 인자로 전달해서 처리한다. 이 때 그 함수 내부의 작업은 해당 컴포넌트가 렌더링 될 때마다, 즉 함수 컴포넌트로 치면 `componentDidMount`와 `componentDidUpdate`가 호출되는 시점마다 불러내져서 처리된다.

그런데 컴포넌트가 그려질 때 뿐만 아니라 컴포넌트가 없어질 때, 무언가를 정리하는(Clean-up) 작업을 해야 하는 경우가 많다. 이 때는 `useEffect`에 넘기는 함수에서 Clean-up 함수를 `return`해주면 된다.

### effect 함수 안에서 `return`으로 Clean-up 처리하기

```jsx
function FriendStatus(props) {
  const [isOnline, setIsOnline] = useState(null);

  useEffect(() => {
    function handleStatusChange(status) {
      setIsOnline(status.isOnline);
    }
    ChatAPI.subscribeToFriendStatus(props.friend.id, handleStatusChange);
    // effect 이후에 어떻게 정리(clean-up)할 것인지 표시합니다.
    return function cleanup() {
      ChatAPI.unsubscribeFromFriendStatus(props.friend.id, handleStatusChange);
    };
  });

	...
}
```

👆🏻위 코드에서는 `useEffect`에 전달하는 함수 하나에서 effect를 처리하고, `return`해주는 함수로 Clean-up까지 함께 써주고 있다. 이 때 주의할 점은, 리턴해주는 Clean-up 부분의 코드는 `componentWillUnmount`일 때만 호출되는 게 아니라, 컴포넌트가 업데이트 되어서 effect 함수 내부의 부분들이 재실행 되기 전에도 호출되어서 정리를 해준다는 점이다.

### 로직이 다른 effect들 분리하기

클래스 컴포넌트의 생명주기 메소드와 차별화되는 `useEffect` 훅의 장점은 생명주기별로 여러개의 effect들을 묶어서 써주지 않고, 각 effect별로 생명주기별 수행할 내용을 모아서 써줄 수 있다는 점이다.

예를 들어서 위에 나왔던 `count` 예제와 친구상태구독 예제에서의 effect들은 서로 다른 로직인데, 이 로직들을 각각의 `useEffect`로 분리할 수 있다.

```jsx
function FriendStatusWithCounter(props) {
	const [count, setCount] = useState(0);
	useEffect(() => {
		document.title = `You clicked ${count} times`;
	});

	const [isOnline, setIsOnline] = useState(null);
	useEffect(() => {
		function handleStatusChange(status) {
			setIsOnline(status.isOnline);
		}

		ChatAPI.subscribeToFriendStatus(props.friend.id, handleStatusChange);
		return () => {
			ChatAPI.unsubscribeFromFriendStatus(props.friend.id, handleStatusChange);
		};
	});
	// ...
}
```

생명주기별로 따로 쓰던 코드는 모아서 쓸 수 있고, 서로 다른 로직을 같이 써야했던 걸 분리할 수 있다!

### `useEffect` 두 번째 인자로 특정 상황에만 effect 처리하기

위의 코드들처럼 `useEffect`에 effect를 수행하는 함수 하나만 인자로 넘겨서 호출하면 컴포넌트가 그려질 때마다 **매번** effect 함수를 호출하게 된다. 하지만 특정 상황에만 effect를 처리하고 싶을 때가 많기 때문에, 그걸 위한 추가 기능이 있다.

위의 카운트 예제에서는 컴포넌트 안의 뭐라도 바뀌면 무조건 `document.title`을 업데이트하도록 되어있는데, 당연히 `count` 값이 바뀔 때에만 저 effect를 처리하고 싶어진다.

```jsx
useEffect(() => {
	document.title = `You clicked ${count} times`;
}, [count]); // count가 바뀔 때만 effect를 재실행합니다.
```

그럴 땐 👆🏻이렇게 `useEffect`의 두 번째 인자로 배열을 넣어준다. 이 배열 안에는 '이 값이 바뀌면 이 effect를 실행하겠다!' 하는 값들(`prop` or `state`)을 넣어준다. 이렇게 하면 배열 안의 값들에 변경이 생길 때에만 effect를 적용할 수 있다(배열의 여러 값들중에 하나만 바뀌어도 실행된다). 이렇게 유용한 `useEffect` 두 번째 인자는

```jsx
componentDidUpdate(prevProps, prevState) {
  if (prevState.count !== this.state.count) {
    document.title = `You clicked ${this.state.count} times`;
  }
}
```

이런 식으로 `if`문으로 검사하는걸 `useEffect` Hook API에 내재시킨 거라고 한다👍🏻

### 컴포넌트가 mount / unmount 될 때만 effect 실행하기

`useEffect`를 사용한 effect 처리는 `componentDidMount()`, `componentWillUnmount()`, `componentDidUpdate()`를 다 짬뽕시킨거라 딱! 컴포넌트가 마운트/언마운트 됐을 때만 effect를 실행하고 싶을 때 어떻게 해야 하나 난감했다. 해결법은 간단한데, `useEffect`의 두 번째 인자에 빈 배열 `[]`을 전달하면 된다.

```jsx
useEffect(() => {
	doSomething();
}, []);
```

👆🏻이렇게 하면 `componentDidMount()`와 동일하게 컴포넌트가 mount될 때에만 effect가 적용된다.

새로운 API는 아니고, `useEffect`의 두 번째 인자 안의 값이 하나라도 바뀌면 effect가 실행되는 원리인데 `[]`안에는 아무 값도 없어서 바뀔 일도 없다. 그래서 이 effect는 처음에만 실행되는 것!

같은 원리로 `componentWillUnmount()`처럼 쓰려면

```jsx
useEffect(() => {
	return () => {
		doCleanUp();
	};
}, []);
```

`[]`을 두 번째 인자로 넣고 `return` 안에 처리할 내용을 넣어주면 된다.

```jsx
useEffect(() => {
	doSomething();

	return () => {
		doCleanUp();
	};
}, []);
```

👆🏻이런 식으로 `componentDidMount`와 `componentWillUnmount`를 함께 기술할 수도 있다.

하.지.만 React 문서에서는 이렇게 사용하는 걸 주의하라고 한다. 왜냐면 내 머릿속에는 처음 그릴 때만 적용하면 되는 effect이지만, 사실은 외부의 컴포넌트에서 전달된 props가 바뀌면 다시 실행되어야 하는 경우가 있기 때문이라고.

```jsx
function ProductPage({ productId }) {
	const [product, setProduct] = useState(null);

	async function fetchProduct() {
		const response = await fetch('http://myapi/product/' + productId); // productId props 사용
		const json = await response.json();
		setProduct(json);
	}

	useEffect(() => {
		fetchProduct();
	}, []); // 🔴 `fetchProduct`가`productId`를 사용하므로 잘못되었습니다
	// ...
}
```

처음에만 데이터를 읽어오면 된다고 생각해서 `[]`를 인자로 전달하고 effect를 썼는데, 사실 이 effect 안에서는 `productId`라는 프로퍼티를 사용하기 때문에 외부에서 이 프로퍼티를 바꾸면 다시 실행되어야 한다.

```jsx
function ProductPage({ productId }) {
	const [product, setProduct] = useState(null);

	useEffect(() => {
		async function fetchProduct() {
			const response = await fetch('http://myapi/product/' + productId);
			const json = await response.json();
			setProduct(json);
		}

		fetchProduct();
	}, [productId]); // ✅ 효과는 productId 만 사용하므로 유효합니다
	// ...
}
```

그래서 이렇게 종속성을 따져서 배열에 넣어줘야 한다.

```jsx
useEffect(() => {
	function doSomething() {
		console.log('hello');
	}

	doSomething();
}, []); // ✅ 이 예에서는 컴포넌트 범위의 *어떤* 값도 사용하지 않기 때문에 좋습니다
```

👆🏻이렇게 아예 독립적인 경우에는 `[]`만 전달해서 사용해도 괜찮다. 공식 문서에서 주의주는 건 `[]`을 전달해서 `componentDidMount`처럼 사용할 때, 이 effect가 정말 **처음 그려질 때 한 번만 실행되는** effect가 맞는지 확인하라는 것 같다.

React에는 `useState`, `useEffect` 말고도 내장 훅들이 있고 심지어 커스텀 훅을 만들 수도 있는데, 필요할 때 좀 더 공부해서 추가해야겟당
