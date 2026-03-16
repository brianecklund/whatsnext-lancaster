"use client";

import type { CSSProperties, ReactNode } from "react";
import { useRouter } from "next/navigation";

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
  const router = useRouter();

  return (
    <div className="pageShell" style={style}>
      <div className={`tagline ${taglineHidden ? "taglineHidden" : ""}`}>{tagline}</div>
      {children}
      {isMobile ? (
        <div className="mobileTabs mobilePrimaryTabs" aria-label="Primary navigation">
          <button
            type="button"
            className="tabBtn"
            data-active={current === "calendar" ? "true" : "false"}
            onClick={() => router.push("/")}
          >
            Calendar
          </button>
          <button
            type="button"
            className="tabBtn"
            data-active={current === "directory" ? "true" : "false"}
            onClick={() => router.push("/locations")}
          >
            Directory
          </button>
          <button
            type="button"
            className="tabBtn"
            data-active={current === "updates" ? "true" : "false"}
            onClick={() => router.push("/updates")}
          >
            Updates
          </button>
        </div>
      ) : null}
      {mobileOverlay}
    </div>
  );
}
