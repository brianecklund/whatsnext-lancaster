import "./globals.css";

import Script from "next/script";
import SiteHeader from "./site-header";
import GsapButtonFX from "./components/GsapButtonFX";
import GsapPageFX from "./components/GsapPageFX";

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <Script
          src="https://cdn.jsdelivr.net/npm/gsap@3.12.5/dist/gsap.min.js"
          strategy="afterInteractive"
        />
        <GsapButtonFX />
        <GsapPageFX />
        <SiteHeader />

        <main className="main">{children}</main>
      </body>
    </html>
  );
}
