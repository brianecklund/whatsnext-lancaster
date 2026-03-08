import "./globals.css";

import Script from "next/script";
import SiteHeader from "./site-header";
import GsapButtonFX from "./components/GsapButtonFX";

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <Script
          src="https://cdn.jsdelivr.net/npm/gsap@3.13.0/dist/gsap.min.js"
          strategy="afterInteractive"
        />
        <GsapButtonFX />
        <SiteHeader />

        <main className="main">{children}</main>
      </body>
    </html>
  );
}
