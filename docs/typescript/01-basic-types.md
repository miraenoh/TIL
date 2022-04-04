# TypeScript 기본

[TypeScript Handbook: Everyday Types](https://www.typescriptlang.org/docs/handbook/2/everyday-types.html)

## 원시 타입 (Primitive Types)

### Types from JS

- `string` 타입
- `number` 타입

  ✔️ `int`, `float`에 대응하는 타입은 따로 없고 모든 것이 `number`

- `boolean` 타입
- `null`, `undefined` 💡 차이점은 .. 알쥬?

  ```ts
  let num: number | undefined;
  let num2: number | null;
  ```

  요런 식으로 쓸 수도 있고 함수에서도 쓴다.

### `any` 타입 😈

```ts
let obj: any = { x: 0 };
// None of the following lines of code will throw compiler errors.
// Using `any` disables all further type checking, and it is assumed
// you know the environment better than TypeScript.
obj.foo();
obj();
obj.bar = 100;
obj = 'hello';
const n: number = obj;
```

값에 `any` 타입을 할당하면 그 값을 모든 타입으로 간주해서 사용할 수 있다. (Ex: object라고 가정해서 아무 property나 접근하거나 함수처럼 호출하거나 등등)

👉 위험하다 .. 불가피한 경우가 아니면 사용 ❌

### Additional Types

함수에서 주로 사용되는 추가 타입들 👇

- `void` 타입

  변수에는 안 쓰고, 리턴값이 없는 함수에 자동으로 할당(하거나 직접 명시하기도 함)

  ```ts
  // 이거나
  function noop() {
  	return;
  }

  // 이거나 똑같음
  function noop(): void {
  	return;
  }
  ```

- `unknown` 타입

  `unknown`은 어떤 타입이든 나타낼 수 있다. JS 라이브러리 등을 사용할 때 타입을 알 수 없는 경우가 종종 있는데, 이럴 때 사용하기도 한다고.

  `any`와 비슷하지만 차이점은 `unknown` 값을 가지고 뭘 해도 **not legal**이라 비교적 안전하다고 써 있다.

  ```ts
  function f1(a: any) {
  	a.b(); // OK
  }
  function f2(a: unknown) {
  	a.b(); // ❗️ ERROR: Object is of type 'unknown'.
  }
  ```

  그치만 .. 웬만하면 이것도 쓰지 말자.

- `never` 타입

  어떤 함수들은 **절대** 값을 리턴하지 않는 경우가 있는데, 이는 `void` 함수와는 다르다.

  1. 에러를 던지는 경우

     ```ts
     function fail(msg: string): never {
     	throw new Error(msg);
     }
     ```

  2. 끝나지 않는 함수일 경우

     ```ts
     function neverEnds(): never {
     	while (true) {
     		console.log('안 끝나 ~~~');
     	}
     }
     ```

     👆 요런 케이스로 사용할 때, 함수가 끝나는 경우가 생기면 TS 에러가 난다.

  함수의 리턴 타입 말고도, Union Type을 쓸 때 '이제 남은 타입이 없는데?' 요런 경우에도 나온다.

  ```ts
  function fn(x: string | number) {
  	if (typeof x === 'string') {
  		// do something
  	} else if (typeof x === 'number') {
  		// do something else
  	} else {
  		x; // has type 'never'!
  	}
  }
  ```

## Object 기반 타입

JS에서 `object` 말고도 `array`, `function` 등은 `object`를 기반으로 한 타입이다.

### `object` 타입

```ts
let obj: object = {};
obj.name = '이름';
obj.number = 1234;
```

어쨌든 이 값이 `object`이긴 해 .. 라는 뜻이다. 두루뭉실하니까 쓸 일은 별로 없고 보통 필드의 타입을 하나하나 명시해서 쓴다.

### array 표현

TS에서 array를 타입을 표현하는 방법은 두 가지가 있다.

1. `type[]` 방식

   ```tsx
   const numbers: number[] = [1, 2, 3];
   ```

   직관적이다.

2. `Array<type>` 방식

   ```tsx
   const numbers: Array<number> = [1, 2, 3];
   ```

   제네릭을 이용한 방법이다.

둘이 뜻은 똑같은데, 함수 파라미터로 전달할 때 `readonly`를 붙이려면 `string[]`과 같이 첫 번째 방식을 써야 한다.

### tuple

tuple은 서로 다른 타입들을 넣을 수 있는 배열이다.

```ts
let something: [string, number, boolean];
something = ['something', 1, true];
```

배열처럼 인덱스로 접근할 수도 있다. 대표적인 예시는 React에서 사용하는 `useState()` 훅.

## 함수에서 타입 사용하기

함수에서 파라미터와 함수의 반환값 타입을 지정해 줄 수 있다. 기본 예시 👇

```ts
// Parameter type annotation
function greet(name: string) {
	console.log('Hello, ' + name.toUpperCase() + '!!');
}

// Return type annotation
function getFavoriteNumber(): number {
	return 26;
}
```

### 함수 파라미터에 object 타입 명시하기

```ts
// The parameter's type annotation is an object type
function printCoord(pt: { x: number; y: number }) {
	console.log("The coordinate's x value is " + pt.x);
	console.log("The coordinate's y value is " + pt.y);
}
printCoord({ x: 3, y: 7 });
```

### Optional Properties ❓

```ts
function printName(obj: { first: string; last?: string }) {
	// ...
}
// Both OK
printName({ first: 'Bob' });
printName({ first: 'Alice', last: 'Alisson' });
```

넘겨줄 수도 있고, 안 넘겨줄 수도 있는 파라미터에는 `?`를 붙여서 표시한다.

### Default Parameter

```ts
function doSomething(str: string = 'default string') {
	// ...
}
doSomething();
```

값이 안 넘어오면 디폴트로 정의해 놓은 값을 할당한다.

### Rest Parameters

스프레드 `...`를 사용해서 몇 개인지 모르는 파라미터들을 배열로 받을 수 있다.

```ts
function getAllNumbers(...numbers: number[]) {
	// ...
}
getAllNumbers(1, 2, 3); // 몇개든 넣을 수 있음
```

## Type Aliases

커스텀 타입을 정의해서 **이름**을 붙이는 것.

```ts
type Point = {
	x: number;
	y: number;
};

// Exactly the same as the earlier example
function printCoord(pt: Point) {
	console.log("The coordinate's x value is " + pt.x);
	console.log("The coordinate's y value is " + pt.y);
}

printCoord({ x: 100, y: 100 });
```

`type` 키워드로 타입을 정의한다. 타입 이름은 CamelCase 사용!

👆 코드는 `object` 타입을 정의한 예시이고, primitive type이나 value 자체도 타입으로 사용할 수 있다.

```ts
type Text = string;
type Mirae = 'mirae';
```

요런 타입들은 위처럼 단독으로 사용하기 보단 Union Types👇 랑 같이 사용하는 경우가 많다.

## Union Types `|`

여러 개 타입을 `|`로 묶어서, 얘네중에 하나 ~ 라고 정의하는 것. `OR` 개념

```ts
type someTypes = string | number | boolean | undefined;
type Command = 'print' | 'quit';
```

특히 value 자체를 Union Type으로 지정해주면 특정 값들만 허용하고 싶을 때 유용하다.

```ts
function printId(id: number | string) {
	if (typeof id === 'string') {
		// In this branch, id is of type 'string'
		console.log(id.toUpperCase());
	} else {
		// Here, id is of type 'number'
		console.log(id);
	}
}
```

👆 이렇게 함수 파라미터로 받을 때는 함수 내에서 특정 타입에만 해당되는 구문을 실행하기 전에 검사를 해 줘야 한다.

### Object Union Types 구분하기

```ts
type Student = {
	studentID: number;
	// ...
};

type Teacher = {
	teacherId: number;
	// ...
};

type Member = Student | Teacher;
```

대충 요런 `Member` Union 타입이 있다고 했을 때, 함수 안에서 타입을 구분하려면?

1. `in` 이용하기

   ```ts
   function doSomething(member: Member) {
     if ('studentID' in member) {
       // member is Student
       // and TS knows that ✨
       ...
     } else {
       // member is Teacher
       ...
     }
   }
   ```

   특정 Property가 있는지 검사해서 코드를 작성하면 TS도 해당하는 타입을 알아내서 에러가 발생하지 않는다.

2. 공통 Property 이용하기

   ```ts
   type Student = {
   	memberType: 'student';
   	studentID: number;
   	// ...
   };

   type Teacher = {
   	memberType: 'teacher';
   	teacherId: number;
   	// ...
   };

   type Member = Student | Teacher;

   function doSomething(member: Member) {
     if (member.memberType === 'student') {
       // member is Student
       // and TS knows that ✨
       ...
     } else {
       // member is Teacher
       ...
     }
   }
   ```

   묶을 타입들에 각자의 특정 값을 가진 공통 프로퍼티를 추가하고, 이 프로퍼티를 검사해서 타입을 확인할 수 있다.

## Intersection Types `&`

```ts
type Animal = {
	name: string;
};

type Bear = Animal & {
	honey: boolean;
};

const bear = getBear();
bear.name;
bear.honey;
```

여러 개의 타입을 `&`로 묶어서 하나의 타입으로 사용할 수 있다. `AND` 개념!

## Enums

`enum`은 named constants의 조합을 정의할 수 있는 TS 기능인데, 다른 타입들과 달리 JS의 **type-level addition은 아니다**.

```ts
enum Direction {
	Up, // 0부터 시작
	Down, // 1
	Left, // 2
	Right // 3
}
```

네이밍 할 때는 CamelCase를 사용한다.

특별히 명시하지 않으면 0부터 시작해서 1씩 증가하고, 특정 값을 지정해줄 수도 있다.

```ts
enum Direction {
	Up = 1,
	Down,
	Left,
	Right
}
```

👆 이런 식으로 첫 값에 정수를 지정해주면 그 값부터 1씩 증가시키고(정수만 가능),

```ts
enum UserResponse {
	No = 0,
	Yes = 1
}

enum Direction {
	Up = 'UP',
	Down = 'DOWN',
	Left = 'LEFT',
	Right = 'RIGHT'
}
```

이렇게 특정 값을 하나하나 지정해 줄 수도 있다.

### `enum`의 문제

문제는 `enum`을 타입으로 지정해 줬을 때, 정의해 놓지 않은 값을 넣을 수 있다는 것!

```ts
enum UserResponse {
	No = 0,
	Yes = 1
}

let response: UserResponse;
response = 3; // ⚠️ 에러가 나지 않는다
```

위 코드에서 정의된 0, 1이 아니라 3을 넣었는데 에러가 나지 않는다.

👉 타입이 보장되지 않을 수 있으니 가능한 경우에는 Union Types 같은 걸로 대체해서 사용하는게 좋음!

## Type Inference

TS는 타입을 `:`로 명시하지 않아도 할당하는 값에 따라 자동으로 타입을 추론해 준다.

```ts
let num = 1; // 자동으로 number 타입 할당
num = 'text'; // ❗️ TS 에러 발생

function addTwoNumbers(num1: number, num2: number) {
	return num1 + num2; // 리턴 타입을 number로 추론
}
```

함수에서도 파라미터나 리턴값의 타입을 명시하지 않으면 자동으로 추론하는데, 주의할 점은 파라미터 타입을 명시하지 않으면 `any` 타입으로 자동 할당하기 때문에 개발자가 생각하는 함수 기능이 보장되지 않을 수 있다.

👉 함수 파라미터럼 필요한 곳에는 꼭 타입을 명시해주자!

## Type Assertions & `!`

TS는 타입을 보장하지 않는 경우에 개발자가 따로 이 타입이 맞아❗️ 하고 코드를 작성하고 싶을 때, `as` 키워드 같은 걸 사용해서 type assertion 할 수 있다.

```ts
const myCanvas = document.getElementById('main_canvas') as HTMLCanvasElement;
```

대표적으로 위처럼 `getElementBy...`나 `querySelector`같은 걸 사용할 때 그렇다.

```ts
const myCanvas = <HTMLCanvasElement>document.getElementById('main_canvas');
```

`as` 말고 angle-bracket `<어쩌구>`를 사용해도 똑같이 동작한다.

> TypeScript only allows type assertions which convert to a more specific or less specific version of a type. This rule prevents “impossible” coercions.

👉 TS는 **more specific** 하거나 **less specific**한 타입에 대해서만 type assertion을 허용한다. 딱 봐도 다른 타입인데 assertion하는 건 안 된다는 것.

```ts
const x = 'hello' as number; // ❗️ TS 에러
```

그래서 요런 건 에디터 상에서 바로 TS 오류를 띄운다.

예를 들어 JS 라이브러리를 사용해서 `any` 타입으로 리턴 값을 받았는데 얘가 `string`인 걸 나는 확실히 알고있다...뭐 이런 경우에 쓸 수 있다.

❗️ 그치만! 남발할 경우 TS를 쓰는 이점이 사라지니 불가피한 경우가 아니면 지양하도록 ~~

### 값 확실히 있다고 `!`

있는지 없는지 몰라 ~ 하는 `?`과는 다르게 `!`를 써주면 `null`이나 `undefined`일 수 있는 값이 있다고 칠(?) 수 있다.

```ts
function returnArrayOrNot(): string[] | undefined {
	return undefined;
}

let maybeArray = returnArrayOrNot()!; // !를 사용했으니 maybeArray는 string[] 타입이 된다
maybeArray.push('hi'); // ❗️ string[] 타입이라고 했지만 사실은 undefined이니까 런타임 에러 발생
```

상당히 위험하다 .. 이것도 불가피한 경우가 아니면 사용을 지양한다.
