# CSS 선택자(Selectors)

## 내가 원래 쓰던 선택자들

- element 선택자: `element { ... }`
- class 선택자: `.class { ... }`
  - 가장 일반적으로 사용
- id 선택자 `#id { ... }`
  - 딱 하나에만 적용하고 싶을 때

## 전체 선택자

`*` (Wildcard) 선택자로 스타일을 지정하면 페이지의 전체에 적용된다.
::: tip
브라우저마다 다른 기본 스타일을 초기화, 통일하는 reset.css, normalize.css에 `*` 선택자 사용
:::

## 속성(attribute) 선택자

html 속성 값들을 비교한 결과로 스타일 지정

### 형식

`element[attribute(operator) value]`

### operators

`element 이름`, `=`, `~=`, `|=`, `^=`, `$=`, `*=`

- `~=` 여러개
- `^=` 접두사
- `$=` 접미사
- `*=` 포함

### 예시

```css
span[id] {
	/* id를 가진 모든 span elements 선택 */
}

span[class^='test'] {
	/* class가 "test"로 시작하는 elements 선택 */
}
```
