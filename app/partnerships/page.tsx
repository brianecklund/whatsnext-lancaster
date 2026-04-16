import { Suspense } from "react";
import type { Metadata } from "next";
import { siteCopy, withSiteTitle } from "@/lib/site-copy";
import PartnershipsPageClient from "./PartnershipsPageClient";

export const metadata: Metadata = {
  title: withSiteTitle("Partnerships"),
  description: siteCopy.pages.partnershipsMetaDescription,
};

export default function PartnershipsPage() {
  return (
    <Suspense fallback={<div className="contentPage" aria-busy="true" style={{ minHeight: 120 }} />}>
      <PartnershipsPageClient />
    </Suspense>
  );
}
