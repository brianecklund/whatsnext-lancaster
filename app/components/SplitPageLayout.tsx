"use client";

import type { CSSProperties, ReactNode } from "react";
import { useMemo } from "react";
import { useRouter } from "next/navigation";
import SegmentedControl from "@/app/components/SegmentedControl";
import { SegmentIconCalendar, SegmentIconDirectory, SegmentIconUpdates } from "@/app/components/segmentNavIcons";

type PageKey = "calendar" | "directory" | "updates";

type Props = {
  tagline: string;
  taglineHidden?: boolean;
  isMobile?: boolean;
  mobileDetailOpen?: boolean;
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
  mobileDetailOpen = false,
  current,
  children,
  mobileOverlay,
  style,
  onNavigateSection,
  topBar,
  hideDefaultIntro = false,
}: Props) {
  const router = useRouter();

  const items = useMemo(
    () => [
      { key: "calendar" as const, label: "Calendar", href: "/" },
      { key: "directory" as const, label: "Directory", href: "/locations" },
      { key: "updates" as const, label: "Updates", href: "/updates" },
    ],
    [],
  );

  const navigateTo = (next: PageKey) => {
    if (onNavigateSection) {
      onNavigateSection(next);
      return;
    }
    const href = items.find((i) => i.key === next)?.href ?? "/";
    router.push(href);
  };

  return (
    <div
      className="pageShell"
      style={style}
      data-mobile-detail-open={isMobile && mobileDetailOpen ? "true" : "false"}
    >
      {topBar ?? (!hideDefaultIntro ? (
        <section className={`newsBar pageIntroBar ${taglineHidden ? "pageIntroBarHidden" : ""}`} aria-label="Page introduction">
          <div className="newsBar__intro">{tagline}</div>
        </section>
      ) : null)}
      {children}
      {isMobile ? (
        <div className="mobileTabs mobilePrimaryTabs mobileTabDock" aria-label="Primary navigation">
          <SegmentedControl
            className="segmentedControl--mobile"
            ariaLabel="Primary navigation"
            currentKey={current}
            items={[
              {
                key: "calendar",
                label: "Calendar",
                icon: <SegmentIconCalendar />,
                href: onNavigateSection ? undefined : "/",
                onClick: onNavigateSection ? () => onNavigateSection("calendar") : undefined,
              },
              {
                key: "directory",
                label: "Directory",
                icon: <SegmentIconDirectory />,
                href: onNavigateSection ? undefined : "/locations",
                onClick: onNavigateSection ? () => onNavigateSection("directory") : undefined,
              },
              {
                key: "updates",
                label: "Updates",
                icon: <SegmentIconUpdates />,
                href: onNavigateSection ? undefined : "/updates",
                onClick: onNavigateSection ? () => onNavigateSection("updates") : undefined,
              },
            ]}
          />
        </div>
      ) : null}
      {mobileOverlay}
    </div>
  );
}
