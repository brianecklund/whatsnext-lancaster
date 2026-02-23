import "./globals.css";

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <header className="siteHeader">
          <div className="brand">
            <img
              className="brandLogo brandLogoDesktop"
              src="/brand/AT-Lanc-Logo.png"
              alt="What’s Next Lancaster"
            />
            <img
              className="brandLogo brandLogoMobile"
              src="/brand/AT-Lanc-Logo-Mobile.png"
              alt="What’s Next Lancaster"
            />
          </div>
          <nav className="topNav">
            <a href="/">Calendar</a>
            <a href="/locations">Directory</a>
            <a href="/about">About</a>
            <a href="/contact">Contact</a>
          </nav>
        </header>

        <main className="main">{children}</main>
      </body>
    </html>
  );
}