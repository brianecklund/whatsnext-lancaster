"use client";

import type { CSSProperties, ReactNode } from "react";
import SegmentedControl from "@/app/components/SegmentedControl";

type PageKey = "calendar" | "directory" | "updates";

type Props = {
  tagline: string;
  taglineHidden?: boolean;
  isMobile?: boolean;
  current: PageKey;
  children: ReactNode;
  mobileOverlay?: ReactNode;
  style?: CSSProperties;
};

export default function SplitPageLayout({
  tagline,
  taglineHidden = false,
  isMobile = false,
  current,
  children,
  mobileOverlay,
  style,
}: Props) {
  return (
    <div className="pageShell" style={style}>
      <section className={`newsBar pageIntroBar ${taglineHidden ? "pageIntroBarHidden" : ""}`} aria-label="Page introduction">
        <div className="newsBar__intro">{tagline}</div>
      </section>
      {children}
      {isMobile ? (
        <div className="mobileTabs mobilePrimaryTabs" aria-label="Primary navigation">
          <SegmentedControl
            className="segmentedControl--mobile"
            ariaLabel="Primary navigation"
            currentKey={current}
            items={[
              { key: "calendar", label: "Calendar", href: "/" },
              { key: "directory", label: "Directory", href: "/locations" },
              { key: "updates", label: "Updates", href: "/updates" },
            ]}
          />
        </div>
      ) : null}
      {mobileOverlay}
    </div>
  );
}
