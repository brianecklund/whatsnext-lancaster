import { Suspense } from "react";
import type { Metadata } from "next";
import PartnershipsPageClient from "./PartnershipsPageClient";

export const metadata: Metadata = {
  title: "Partnerships | What’s Next Lancaster",
  description: "Collaborate with What’s Next Lancaster to reach local audiences through events, places, and community updates.",
};

export default function PartnershipsPage() {
  return (
    <Suspense fallback={<div className="contentPage" aria-busy="true" style={{ minHeight: 120 }} />}>
      <PartnershipsPageClient />
    </Suspense>
  );
}
