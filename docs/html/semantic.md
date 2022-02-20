# 시맨틱(Semantic) HTML

**의미에 맞는** 태그로 HTML을 작성하는 것. <br>
HTML의 각 element가 의미를 가지므로 가독성 ↑ 유지보수 ↑ <br>
`<div>`, `<span>`처럼 특별한 의미를 가지지 않은 태그는 시맨틱하지 않다.

## Semantic Tags (HTML5)

- `<h*>` 제목 태그
- `<header>`
  - `<body>` 하위에 있으면 👉🏻 페이지 헤더
  - `<article>`, `<section>` 하위에 있으면 👉🏻 해당 영역 헤더
- `<footer>`
  - `<header>`와 마찬가지로 위치에 따라 특정 영역의 푸터로 사용
- `<main>` 페이지의 컨텐츠(내용) 영역
  - 한 페이지에 **한 번** 사용
  - `<body>` 태그 하위에 존재
- `<article>`
  - 하나의 의미 있는 콘텐츠 블록 영역
  - ex) 카페/블로그의 게시글, 기사 등
- `<section>`
  - `<article>`과 유사, but 페이지의 **단일** 부분을 **그룹화**
  - 의미적으로 그룹화하는 게 아니고 단순 스타일링만 해야 할 때는 `<div>` 사용
- `<aside>`
  - 페이지의 메인 내용이 위치한 곳과 다른 곳에 위치
  - 페이지 내용과 관련된 추가 정보를 포함
- `<nav>` 네비게이션