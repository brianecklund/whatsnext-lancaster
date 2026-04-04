import { Suspense } from "react";
import type { Metadata } from "next";
import HowWePartnerPageClient from "./HowWePartnerPageClient";

export const metadata: Metadata = {
  title: "How we partner | What’s Next Lancaster",
  description:
    "How What’s Next Lancaster partners with local businesses and organizations to grow reach, audiences, and community collaboration in Lancaster, PA.",
};

export default function HowWePartnerPage() {
  return (
    <Suspense fallback={<div className="contentPage" aria-busy="true" style={{ minHeight: 120 }} />}>
      <HowWePartnerPageClient />
    </Suspense>
  );
}
