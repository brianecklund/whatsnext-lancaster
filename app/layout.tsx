import { Suspense } from "react";
import "./globals.css";
import type { Metadata, Viewport } from "next";
import { siteCopy } from "@/lib/site-copy";
import ContentLayoutScrollMomentum from "./components/ContentLayoutScrollMomentum";
import PageRevealRoot from "./components/PageRevealRoot";
import SiteHeader from "./site-header";
import ThemeBoot from "./ThemeBoot";
import SitePreferencesBoot from "./components/SitePreferencesBoot";
import SiteFooterBar from "./components/SiteFooterBar";

export const metadata: Metadata = siteCopy.metadata;

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
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
          href="https://fonts.googleapis.com/css2?family=DM+Sans:ital,opsz,wght@0,9..40,400..700;1,9..40,400..700&family=Inter:wght@300;400;500;600;700&family=JetBrains+Mono:ital,wght@0,400;0,500;0,600;1,400&family=Source+Serif+4:ital,opsz,wght@0,8..60,400;0,8..60,600;1,8..60,400&display=swap"
        />
      </head>
      <body>
        <ThemeBoot />
        <SitePreferencesBoot />
        <ContentLayoutScrollMomentum />
        <PageRevealRoot>
          <Suspense fallback={null}>
            <SiteHeader />
          </Suspense>
          {children}
          <SiteFooterBar />
        </PageRevealRoot>
      </body>
    </html>
  );
}