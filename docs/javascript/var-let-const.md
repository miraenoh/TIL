# 함수 선언 키워드 var, let, const

## var

- ES6 이전에 사용
- 블록 스코프 지원 ❌ 함수 스코프만 지원
- 재할당⭕ 재선언⭕
- 재선언⭕ 이므로 변수 중복 선언 가능

## let

- 재할당⭕ 재선언❌

## const

- 재할당❌ 재선언❌

### const 변수의 타입이 객체일 때 재할당 금지란?

=을 사용해 재할당(객체에 대한 참조)는 불가능하지만, 객체의 프로퍼티는 보호되지 않음 👉🏻 object의 property에 대한 변경이 가능함

## 무엇을 사용할까?

- 기본적으로 const 사용
- 재할당이 필요할 경우 let 사용
- ES6를 사용한다면 var는 사용하지 않는다