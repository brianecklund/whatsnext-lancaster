import "./globals.css";
import type { Metadata } from "next";
import SiteHeader from "./site-header";
import ThemeBoot from "./ThemeBoot";

export const metadata: Metadata = {
  title: "What's Next Lancaster",
  description: "Events, places, and updates happening around Lancaster.",
};


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
        <ThemeBoot />
        <SiteHeader />
        {children}
      </body>
    </html>
  );
}