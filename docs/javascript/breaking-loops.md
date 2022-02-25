# 문장(Statement)에 label 부여해서 상위 loop break하기

원래 여러개의 루프가 쌓여 있을 때, 안쪽 루프에서 `break`하면 그 안쪽 루프만 중단되는데, 상위 루프까지 중단하고 싶을 때는 boolean 변수를 두고 검사해서 중단하는 식으로 코드를 썼었다.

그런데 아래처럼 break하고 싶은 루프문에 `label`을 부여하면 원하는 루프를 break할 수 있었다 . . ❗

```js
loop: for (let i = 0; i < 2; i++) {
	console.log(`i: ${i}`);
	for (let n = 0; n < 2; n++) {
		console.log(`n: ${n}`);
		break loop; // 상위 loop break
	}
}
```

## label

- 위 코드에서 'loop'이 `label`이다.
- 라벨은 문장(Statement)과 표현식(Expression) 모두에 부여할 수 있다.
- ❗ 라벨 붙였다고 변수가 되는 건 아니다.
