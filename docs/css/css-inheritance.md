# CSS Property 상속

parent element에 적용한 CSS property가 child element에게 상속되어 같이 적용되는 경우가 있다.

## 상속되는 Property 예시

- font 관련 property (font-size, font-family, ...)
- color 관련 property
- 정렬 관련 property

## 상속되지 않는 Property 예시

- 크기 (width, height)
- margin
- display
- border

## 예외

상속되는 property지만 특정 HTML element에서는 상속되지 않을 수 있다.<br>
ex) `<button>` 의 `font-size`는 parent element의 `font-size`를 상속받지 않는다.

## 명시적 상속

property의 상속 유무는 property/element의 종류에 따라 다른데, 이에 따른 영향 없이 parent의 property를 상속받고 싶다면 child의 해당 propery 값을 `inherit`으로 지정해주면 된다.
