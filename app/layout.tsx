import "./globals.css";

import Script from "next/script";

import SiteHeader from "./site-header";

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <SiteHeader />

        <Script src="https://cdn.jsdelivr.net/npm/gsap@3.12.5/dist/gsap.min.js" strategy="beforeInteractive" />

        <main className="main">{children}</main>
      </body>
    </html>
  );
}
