import "./globals.css";

import SiteHeader from "./site-header";

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <SiteHeader />

        <main className="main">{children}</main>
      </body>
    </html>
  );
}
