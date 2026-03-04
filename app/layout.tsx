import "./globals.css";

import Script from "next/script";

import SiteHeader from "./site-header";
import SmoothScrollInit from "./SmoothScrollInit";

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>

        {/* GSAP core + plugins (ScrollSmoother powers the smooth-scroll feel) */}
<Script src="https://cdn.jsdelivr.net/npm/gsap@3.12.5/dist/gsap.min.js" strategy="beforeInteractive" />
<Script src="https://cdn.jsdelivr.net/npm/gsap@3.12.5/dist/ScrollTrigger.min.js" strategy="beforeInteractive" />
<Script src="https://cdn.jsdelivr.net/npm/gsap@3.12.5/dist/ScrollSmoother.min.js" strategy="beforeInteractive" />

        <SmoothScrollInit />

        <div id="smooth-wrapper">
          <div id="smooth-content">
            <SiteHeader />
            <main className="main">{children}</main>
          </div>
        </div>
      </body>
    </html>
  );
}
