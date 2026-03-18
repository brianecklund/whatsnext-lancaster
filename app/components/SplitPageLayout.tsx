"use client";

import type { CSSProperties, ReactNode } from "react";

export type PageKey = "calendar" | "directory" | "updates";

type Props = {
  tagline: string;
  taglineHidden?: boolean;
  isMobile?: boolean;
  current: PageKey;
  children: ReactNode;
  mobileOverlay?: ReactNode;
  style?: CSSProperties;
  mobileTabs?: ReactNode;
};

export default function SplitPageLayout({
  tagline,
  taglineHidden = false,
  isMobile = false,
  current,
  children,
  mobileOverlay,
  style,
  mobileTabs,
}: Props) {

  return (
    <div className="pageShell" style={style}>
      <section className={`newsBar pageIntroBar ${taglineHidden ? "pageIntroBarHidden" : ""}`} aria-label="Page introduction">
        <div className="newsBar__intro">{tagline}</div>
      </section>
      {children}
      {isMobile ? mobileTabs ?? null : null}
      {mobileOverlay}
    </div>
  );
}
