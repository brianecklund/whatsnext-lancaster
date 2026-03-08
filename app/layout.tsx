import "./globals.css";

import SiteHeader from "./site-header";
import RouteTransition from "./components/RouteTransition";
import RevealFX from "./components/RevealFX";

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <SiteHeader />
        <RevealFX />

        <main className="main"><RouteTransition>{children}</RouteTransition></main>
      </body>
    </html>
  );
}
