import "./globals.css";

export const metadata = {
  title: "What's Next Lancaster",
  description: "A simple city events calendar powered by Prismic."
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <header className="header">
          <div className="brand">What&apos;s Next Lancaster</div>
          <nav className="nav">
            <a href="/calendar">Calendar</a>
            <a href="/locations">Locations</a>
          </nav>
        </header>
        <main className="main">{children}</main>
      </body>
    </html>
  );
}
