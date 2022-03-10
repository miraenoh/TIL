# JSX 속성(Attribute)에 객체 넣기, 조건부 속성 추가하기

기본적으로 React element에 속성(Attribute)을 추가하는 방식은 이렇다.

```jsx
<p className="todo-done" style={{ textDecoration: 'line-through' }}>
	Buy milk
</p>
```

속성 이름은 `camelCase`지만 HTML태그와 유사하게 속성을 넣고, JS 표현식을 넣을 경우엔 `{}`을 사용한다.

그런데 어떤 조건에 따라 속성의 값을 다르게 넣거나, 아예 속성 자체를 어떤 조건을 만족할 때만 넣고 싶다면?

## 삼항 연산자(Ternary Operator)를 사용하여 조건부 속성 넣기

JSX 속성에 `{}`을 사용해서 JS 표현식을 넣을 수 있으니까, 당연히 그 JS 표현식 안에 Ternary Operator를 사용할 수 있다.

`isDone` 값이 `true`일 경우에만 스타일을 적용하는 코드는 이렇게 쓸 수 있다.

```jsx
<p style={isDone ? { textDecoration: 'line-through' } : null}>Buy milk</p>
```

표현식 안에 삼항 연산자를 이용해서 `isDone`이 truthy할 때 정해진 스타일을 넣고 falsy할 때 `null`을 넣어줬다(빈 객체 `{}`를 넣어도 됨).

그런데 만약 한 조건에 따라 넣을 속성이 여러개라면?

```jsx
<p className={isDone ? 'todo-done' : null} style={isDone ? { textDecoration: 'line-through' } : null}>
	Buy milk
</p>
```

속성마다 삼항 연산자를 추가해줘야 해서 매우 귀찮고 코드도 길어진다. 👆🏻코드처럼 두 개가 아니라 몇십개면 더 심각함...

이걸 해결하기 위해 뜬금없이 element에 객체(Object)로 속성 넣는 법을 보자.

## 속성(Attribute)에 객체(Object) 삽입하기

HTML처럼 JSX 태그 안에 속성을 쓰지 않고 객체(Object)로 삽입할 수 있다. 스프레드(`...`)를 활용하면 됨.

예시로 위의 `className`과 `style` 속성들을 객체로 묶어서 넣어보자.

```jsx
const attributes = {
	className: 'todo-done',
	style: { textDecoration: 'line-through' }
};

return (
	<div id="app">
		<p {...attributes}>Buy milk</p>
	</div>
);
```

객체로 속성을 작성한 뒤, 속성을 넣을 태그에 JS 표현식을 위한 중괄호`{}`를 써주고 그 안에 스프레드`...`로 속성 객체를 풀어주면 된다.

👆🏻코드를 인라인으로 태그 안의 표현식에 다 써주면 👇🏻이렇게 됨.

```jsx
<p {...{ className: 'todo-done', style: { textDecoration: 'line-through' } }}>Buy milk</p>
```

뭔가 상당히 가독성이 구리고 굳이 이렇게 넣어야 하나 싶지만...아까 위처럼 여러 속성을 조건부로 넣어야 할 때는 유용하다.

## `&&` 연산자를 사용하여 조건부 속성 넣기

👆🏻위에 객체로 속성 넣는 걸 활용해서, 각 속성마다 조건 검사를 안 하고 한 번만 검사해서 삽입할 수 있다.

```jsx
const attributes = {
	className: 'todo-done',
	style: { textDecoration: 'line-through' }
};

return (
	<div id="app">
		<p {...(isDone && attributes)}>Buy milk</p>
	</div>
);
```

`isDone`이 truthy할 경우에만 `attributes` 객체를 스프레드로 풀어서 속성으로 넘겨준다.

```jsx
<p {...(isDone ? attributes : null)}>Buy milk</p>
```

물론 이렇게 삼항 연산자를 이용해서 쓸 수도 있다. 이 경우에는 조건이 거짓일 경우 다른 속성 객체를 넣을 수도 있다.

```jsx
<p {...(isDone ? attrsTrue : attrsFalse)}>Buy milk</p>
```

👆🏻이런 식으로 ~

암튼 요렇게 조건 검사해서 객체로 속성 여러개 한 번에 넣는 걸 인라인으로 하면 👇🏻이렇게 된다.

```jsx
<p
	{...(isDone && {
		className: 'todo-done',
		style: { textDecoration: 'line-through' }
	})}
>
	Buy milk
</p>
```

처음 볼 땐 뭐지? 싶었지만 한 조건에 따른 속성이 아주 많아진다면 이렇게 객체를 풀어서 넣는 게 유용할 듯 하다.
