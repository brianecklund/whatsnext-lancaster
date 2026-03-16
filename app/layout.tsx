import "./globals.css";

import SiteHeader from "./site-header";
import RouteTransition from "./components/RouteTransition";
import RevealFX from "./components/RevealFX";
import { DEFAULT_THEME, THEME_PALETTES } from "./theme-palettes";

const themeBootScript = `
(function () {
  try {
    var allowed = ${JSON.stringify(THEME_PALETTES.map((theme) => theme.key))};
    var fallback = "${DEFAULT_THEME}";
    var stored = window.localStorage.getItem("wnl-theme");
    var theme = allowed.indexOf(stored) >= 0 ? stored : fallback;
    document.documentElement.setAttribute("data-theme", theme);
  } catch (e) {
    document.documentElement.setAttribute("data-theme", "${DEFAULT_THEME}");
  }
})();
`;

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" data-theme={DEFAULT_THEME}>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap" rel="stylesheet" />
        <script dangerouslySetInnerHTML={{ __html: themeBootScript }} />
      </head>
      <body>
        <SiteHeader />
        <RevealFX />
        <main className="main"><RouteTransition>{children}</RouteTransition></main>
      </body>
    </html>
  );
}
