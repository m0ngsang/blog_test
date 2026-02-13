import "./globals.css";

export const metadata = {
  title: "My Blog",
  description: "Minimal magazine-style blog",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ko">
      <body>{children}</body>
    </html>
  );
}
