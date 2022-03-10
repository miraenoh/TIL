# JSX

JavaScript를 확장한 문법.

```jsx
const element = <h1>Hello, world!</h1>;
```

React에서 UI를 표현하기 위헤 사용하는 문법이다. JS 코드에 마크업을 넣을 수 있는데, `React.createElement()`로 생성한 것과 같은 React element를 반환한다.

즉, 위 코드를 Babel로 Pure JS 컴파일하면 👇🏻처럼 나온다.

```jsx
const element = React.createElement('h1', null, 'Hello, world!');
```

JSX는 React element를 반환하기 때문에, JSX 자체도 표현식이다. 따라서 변수에 넣거나, 함수에 인자로 전달하거나 반환하거나...등등이 가능하다.

생긴건 HTML 비슷하게 생겼지만, 손쉽게 JS 표현식이나 커스텀 React Element를 삽입할 수 있어서 엄청 편하게 페이지를 구성할 수 있다.

:::tip
React에서 JSX 사용은 필수가 아님. but `createElement`로 생성하는 방법에 비해 편하고 가독성이 좋기 때문에 보통은 쓴다고
:::

## 표현식(Expression) 삽입

JSX는 마크업으로 되어 있지만 HTML이 아니고 JS이기 때문에 JS 표현식을 삽입할 수 있다.

```jsx
const authorName = 'Mirae';

const element = (
	<div>
		<p>Created by {authorName}.</p>
		<p>Copyright {new Date().getFullYear()}.</p>
	</div>
);
```

위처럼 변수를 넣을 수도 있고, `new Date().getFullYear()`같이 뭘 실행시킨 값을 넣을 수도 있고, 아무튼 `유효한 모든 JavaScript 표현식`을 넣을 수 있다.

`표현식(Expression)`만 넣을 수 있는 거니깐 `JS 문(Statement)`은 당연히 안 된다.

## JSX 속성(Attributes)

JSX 태그에는 HTML에서처럼 속성(attribute)을 추가할 수 있고 JS 표현식도 넣을 수 있는데, 몇 가지 주의할 점이 있다.

- JSX는 HTML이 아니라 JavaScript이므로, 속성 이름을 camelCase로 쓴다.

  예시: `contenteditable` 👉🏻 `contentEditable`

- HTML에서처럼, 속성 값에는 `string` 값이 들어간다. `boolean`값도 마찬가지로 아래처럼 `"`로 감싸준다

  ```jsx
  <h1 className="heading" contentEditable="true">
  ```

  다만, 표현식으로 들어가는 경우는 `string`으로 만들지 않아도 된다.

  ```jsx
  const isTrue = true
  <h1 contentEditable={isTrue}> 	// 이거나

  <h1 contentEditable={true}>		// 이거나 둘다 됨
  ```

- HTML과 다르게, 한 번 열고 안 닫는 태그는 에러 난다. 안에 내용이 없다면 `<img />` 이런식으로 self-closing이라도 해 줘야함.

### 왜 HTML 속성 `class`를 JSX에선 `className`이라고 쓸까?

`class`는 JavaScript에서 쓰는 `class` 키워드로, **예약어**이다. 따라서 class 뒤에 name을 붙이고 camelCase로 바꿔서 `className`이라고 쓴다.

그래서 JSX에서 태그 안에 `class` 속성을 넣으려고 시도하면`Warning: Invalid DOM property 'class'. Did you mean 'className?`이라면서 콘솔에 경고가 찍힌다.

## JSX 인라인 스타일 (Inline Style)

JSX 태그에 `style` attribute로 HTML에서처럼 인라인 스타일을 삽입하면?

```jsx
<h1 style="font-size: 16px;">Hello</h1>
```

에 러 난 다

React에서 `style` 속성은 HTML에서 쓰는 CSS 문자열 대신 `캐멀 케이스 프로퍼티를 가진 JavaScript 객체`를 받는다. 아래처럼 ~

```jsx
const headingStyle = {
	fontSize: '16px'
};
<h1 style={headingStyle}>Hello</h1>;
```

이때 style용 객체의 속성 이름은 css에서 `kebab-case`를 쓰는것과 다르게 JS식 `camelCase`로 써줘야 하고, 속성값은 `string`값으로 써줘야 한다. 위에처럼 object 변수를 따로 써서 넣는 게 아니라 인라인으로 다 넣는다면

```jsx
<h1 style={{ fontSize: '16px' }}>Hello</h1>
```

요렇게 되는데, style이라고 뭔가 특별하게 중괄호가 두개씩인게 아니라, JS object를 삽입하느라 저렇게 됐다고 이해하자 ~

:::tip
HTML에서 인라인 스타일을 잘 안 쓰는 것과 비슷하게, React 공식 문서에서도 class를 추가해서 css 파일로 스타일링 하는 것을 권장하고 있다.

다만, `style` attribute를 이용한 스타일링은 JS에서 동적으로 스타일을 바꾸고 싶은 경우에 유용하다.
:::
