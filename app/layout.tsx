import "./globals.css";
import type { Metadata } from "next";
import Script from "next/script";
import SiteHeader from "./site-header";

export const metadata: Metadata = {
  title: "What's Next Lancaster",
  description: "Events, places, and updates happening around Lancaster.",
};

const themeBootScript = `
(function () {
  try {
    var stored = localStorage.getItem("theme");
    if (stored) {
      document.documentElement.dataset.theme = stored;
      return;
    }

    var prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
    document.documentElement.dataset.theme = prefersDark ? "dark" : "light";
  } catch (e) {}
})();
`;

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap"
        />
      </head>
      <body>
        <Script
          id="theme-boot"
          strategy="beforeInteractive"
          dangerouslySetInnerHTML={{ __html: themeBootScript }}
        />
        <SiteHeader />
        {children}
      </body>
    </html>
  );
}