# ES6 (ECMAScript 2015)

## ES6란?

- ECMAScript 2015
- the second major revision to JavaScript.

## 주요 기능

[신선함으로 다가온 ES6 경험](https://techblog.woowahan.com/2554/)

- Class 문법
  - constructor 메소드, extends를 이용한 상속
- let & const
- Arrow functions
- 간결한 함수 선언, 짧아진 코드
- arrow function은 자신만의 this를 생성하지 않고, 상위 함수 scope의 this 적용
  - 함수 scope가 아닌 block scope
- Modules
  - export, import를 사용해 function/variables를 다른 곳에서 사용 가능
- Promise
- 템플릿 리터럴 (``)
- for/of

자주 사용하는 ES6 기능은 아래에 👇🏻

## Object key에 변수 넘기기 (Dynamic Ojbect Property Keys)

객체를 쓸 때 property key에 Dynamic하게 값을 넣고 싶다면?

JS object는 키를 사용해서 `[]`로 property에 접근이 가능하니까, ES6 이전에도 👇🏻이렇게 할 수 있었다.

```js
const orange = { taste: 'delicious' };
const newKey = 'price';
orange[newKey] = 4500;
```

단점은 위처럼 이미 선언된 object에만 접근해서 값을 넣어줄 수 있었는데, ES6에서는 `{}`로 object를 기술할 때 바로 `[]`을 사용해서 property key에 값을 넣을 수 있다.

```js
// ES6
const key = 'price';
const orange = {
	taste: 'delicious',
	[key]: 4500
};
```

스프레드`...`를 사용해서 이미 정의된 object에 새로 dynamic한 key와 value를 넣어줄 때 유용함!

```js{5}
// React
function handleChange(event) {
	const { name, value } = event.target;
	setItems((prevItems) => {
		return {...prevItems, [name]: value };
	});
}
```

👆🏻 이런 식으로 ~
