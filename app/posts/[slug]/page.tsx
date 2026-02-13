const posts: Record<string, { title: string; date: string; body: string }> = {
  hello: {
    title: "첫 글: 내 웹사이트 시작",
    date: "2026-02-13",
    body: `
## 왜 이 스타일?
정보 중심 + 여백 + 단순한 네비게이션이 좋아서.

## 앞으로 쓸 것
- 프로젝트 기록
- 읽은 것 정리
- 짧은 인사이트
`.trim(),
  },
  "project-1": {
    title: "프로젝트: 데이터 기반 인력/재무 모델링",
    date: "2026-02-10",
    body: `
## 한 줄 요약
숫자로 설명 가능한 계획을 만들자.

## 핵심
- 지표 정의
- 가정/시나리오
- 결과를 “읽기 쉽게” 보여주기
`.trim(),
  },
};

export default function PostPage({ params }: { params: { slug: string } }) {
  const post = posts[params.slug];
  if (!post) return <div className="container">Not found.</div>;

  return (
    <main className="container">
      <a href="/" className="pill">← 홈</a>
      <h1 className="h1">{post.title}</h1>
      <div className="meta"><span>{post.date}</span></div>
      <hr className="hr" />
      <article className="article">
        {post.body.split("\n").map((line, i) => {
          if (line.startsWith("## ")) return <h2 key={i}>{line.replace("## ", "")}</h2>;
          return <p key={i}>{line}</p>;
        })}
      </article>
    </main>
  );
}
