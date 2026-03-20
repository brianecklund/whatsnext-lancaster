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
  onNavigateSection?: (section: PageKey) => void;
  topBar?: ReactNode;
  hideDefaultIntro?: boolean;
};

export default function SplitPageLayout({
  tagline,
  taglineHidden = false,
  isMobile = false,
  current,
  children,
  mobileOverlay,
  style,
  onNavigateSection,
  topBar,
  hideDefaultIntro = false,
}: Props) {
  return (
    <div className="pageShell" style={style}>
      {topBar ?? (!hideDefaultIntro ? (
        <section className={`newsBar pageIntroBar ${taglineHidden ? "pageIntroBarHidden" : ""}`} aria-label="Page introduction">
          <div className="newsBar__intro">{tagline}</div>
        </section>
      ) : null)}
      {children}
      {isMobile ? (
        <div className="mobileTabs mobilePrimaryTabs" aria-label="Primary navigation">
          <SegmentedControl
            className="segmentedControl--mobile"
            ariaLabel="Primary navigation"
            currentKey={current}
            items={[
              { key: "calendar", label: "Calendar", href: onNavigateSection ? undefined : "/", onClick: onNavigateSection ? () => onNavigateSection("calendar") : undefined },
              { key: "directory", label: "Directory", href: onNavigateSection ? undefined : "/locations", onClick: onNavigateSection ? () => onNavigateSection("directory") : undefined },
              { key: "updates", label: "Updates", href: onNavigateSection ? undefined : "/updates", onClick: onNavigateSection ? () => onNavigateSection("updates") : undefined },
            ]}
          />
        </div>
      ) : null}
      {mobileOverlay}
    </div>
  );
}
