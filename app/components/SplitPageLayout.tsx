"use client";

import type { CSSProperties, ReactNode } from "react";
import { useRouter } from "next/navigation";
import type { SegmentedView } from "@/app/components/SegmentedTabs";

type PageKey = SegmentedView;

type Props = {
  tagline: string;
  taglineHidden?: boolean;
  isMobile?: boolean;
  current: PageKey;
  onTabChange?: (view: PageKey) => void;
  children: ReactNode;
  mobileOverlay?: ReactNode;
  style?: CSSProperties;
};

export default function SplitPageLayout({
  tagline,
  taglineHidden = false,
  isMobile = false,
  current,
  onTabChange,
  children,
  mobileOverlay,
  style,
}: Props) {
  const router = useRouter();

  function change(view: PageKey) {
    if (onTabChange) {
      onTabChange(view);
      return;
    }
    if (view === "calendar") router.push("/");
    else if (view === "directory") router.push("/locations");
    else router.push("/updates");
  }

  return (
    <div className="pageShell" style={style}>
      <section className={`newsBar pageIntroBar ${taglineHidden ? "pageIntroBarHidden" : ""}`} aria-label="Page introduction">
        <div className="newsBar__intro">{tagline}</div>
      </section>
      {children}
      {isMobile ? (
        <div className="mobileTabs mobilePrimaryTabs" aria-label="Primary navigation">
          <button
            type="button"
            className="tabBtn"
            data-active={current === "calendar" ? "true" : "false"}
            onClick={() => change("calendar")}
          >
            Calendar
          </button>
          <button
            type="button"
            className="tabBtn"
            data-active={current === "directory" ? "true" : "false"}
            onClick={() => change("directory")}
          >
            Directory
          </button>
          <button
            type="button"
            className="tabBtn"
            data-active={current === "updates" ? "true" : "false"}
            onClick={() => change("updates")}
          >
            Updates
          </button>
        </div>
      ) : null}
      {mobileOverlay}
    </div>
  );
}
