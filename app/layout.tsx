import "./globals.css";

import SiteHeader from "./site-header";
import Script from "next/script";

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        {/* GSAP core + ScrollTrigger + ScrollSmoother (calendar stacking) */}
        <Script
          src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.5/gsap.min.js"
          strategy="beforeInteractive"
        />
        <Script
          src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.5/ScrollTrigger.min.js"
          strategy="beforeInteractive"
        />
        {/* ScrollSmoother is a GSAP Club plugin; CodePen demos often load it from this hosted build */}
        <Script
          src="https://assets.codepen.io/16327/ScrollSmoother.min.js"
          strategy="beforeInteractive"
        />

        <SiteHeader />

        <main className="main">{children}</main>
      </body>
    </html>
  );
}
