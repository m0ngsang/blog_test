const posts = [
  {
    slug: "hello",
    title: "첫 글: 내 웹사이트 시작",
    excerpt: "매거진처럼 읽기 좋은 미니멀 블로그를 만들고 있어요.",
    date: "2026-02-13",
    category: "IGIS",
    tags: ["#ai", "#리츠"],
  },
  {
    slug: "project-1",
    title: "프로젝트: 데이터 기반 인력/재무 모델링",
    excerpt: "내가 했던 분석/모델링을 짧게 정리합니다.",
    date: "2026-02-10",
    category: "금융",
    tags: ["#데이터센터"],
  },
];

export default function Home() {
  return (
    <main className="container">
      <nav className="nav">
        <div className="brand">MY BLOG</div>
        <a href="/" className="pill">Home</a>
        <a href="/posts/hello" className="pill">Sample</a>
      </nav>

      <h1 className="h1">최신 글</h1>
      <p className="sub">카드를 누르면 글 페이지로 이동해.</p>

      <div className="grid">
        {posts.map((p) => (
          <a className="card" key={p.slug} href={`/posts/${p.slug}`}>
            <div style={{ fontWeight: 700, letterSpacing: "-0.02em" }}>{p.title}</div>
            <p className="sub">{p.excerpt}</p>
            <div className="meta">
              <span>{p.date}</span>
              <span>·</span>
              <span>{p.category}</span>
              <span>·</span>
              <span>{p.tags.join(" ")}</span>
            </div>
          </a>
        ))}
      </div>

      <hr className="hr" />
      <p className="sub">© {new Date().getFullYear()} MY BLOG</p>
    </main>
  );
}
