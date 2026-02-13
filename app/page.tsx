import React from "react";
type Post = {
  slug: string;
  title: string;
  excerpt: string;
  date: string;
  category: "IGIS" | "공간" | "금융";
  tags: string[];
};

const CATEGORIES: Post["category"][] = ["IGIS", "공간", "금융"];
const FEATURED_TAGS = ["#ai", "#리츠", "#데이터센터", "#플레이스메이킹", "#도쿄"];

const posts: Post[] = [
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

function getParam(name: string) {
  if (typeof window === "undefined") return null;
  const url = new URL(window.location.href);
  return url.searchParams.get(name);
}

export default function Home() {
  // ✅ 클라이언트에서만 읽기
  const [cat, setCat] = React.useState<string | null>(null);
  const [tag, setTag] = React.useState<string | null>(null);

  React.useEffect(() => {
    setCat(getParam("cat"));
    setTag(getParam("tag"));
  }, []);

  const filtered = posts.filter((p) => {
    const okCat = cat ? p.category === cat : true;
    const okTag = tag ? p.tags.includes(tag) : true;
    return okCat && okTag;
  });

  const clearFilters = () => {
    if (typeof window === "undefined") return;
    const url = new URL(window.location.href);
    url.searchParams.delete("cat");
    url.searchParams.delete("tag");
    window.location.href = url.pathname;
  };

  const setFilter = (next: { cat?: string; tag?: string }) => {
    if (typeof window === "undefined") return;
    const url = new URL(window.location.href);
    if (next.cat !== undefined) {
      if (next.cat) url.searchParams.set("cat", next.cat);
      else url.searchParams.delete("cat");
    }
    if (next.tag !== undefined) {
      if (next.tag) url.searchParams.set("tag", next.tag);
      else url.searchParams.delete("tag");
    }
    window.location.href = url.toString();
  };

  return (
    <main className="container">
      <nav className="nav">
        <div className="brand">MY BLOG</div>

        <a className="pill" href="/">Home</a>

        {CATEGORIES.map((c) => (
          <button
            key={c}
            className="pill"
            onClick={() => setFilter({ cat: c })}
            style={{
              cursor: "pointer",
              background: cat === c ? "#111" : "transparent",
              color: cat === c ? "#fff" : "inherit",
            }}
          >
            {c}
          </button>
        ))}

        <a href="/posts/hello" className="pill">Sample</a>
      </nav>

      <h1 className="h1">최신 글</h1>
      <p className="sub">
        {cat || tag ? (
          <>
            필터 적용됨:{" "}
            <b>{cat ? cat : "전체"}</b>
            {tag ? <> / <b>{tag}</b></> : null}
            {" · "}
            <button className="pill" onClick={clearFilters} style={{ cursor: "pointer" }}>
              필터 해제
            </button>
          </>
        ) : (
          "카테고리/태그를 눌러 글을 걸러볼 수 있어."
        )}
      </p>

      <div className="pills">
        {FEATURED_TAGS.map((t) => (
          <button
            key={t}
            className="pill"
            onClick={() => setFilter({ tag: t })}
            style={{
              cursor: "pointer",
              background: tag === t ? "#111" : "transparent",
              color: tag === t ? "#fff" : "var(--muted)",
            }}
          >
            {t}
          </button>
        ))}
      </div>

      <div className="grid">
        {(filtered.length ? filtered : posts).map((p) => (
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
