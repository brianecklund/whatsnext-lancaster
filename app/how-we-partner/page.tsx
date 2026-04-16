import { Suspense } from "react";
import type { Metadata } from "next";
import { siteCopy, withSiteTitle } from "@/lib/site-copy";
import HowWePartnerPageClient from "./HowWePartnerPageClient";

export const metadata: Metadata = {
  title: withSiteTitle("How we partner"),
  description: siteCopy.pages.howWePartnerMetaDescription,
};

export default function HowWePartnerPage() {
  return (
    <Suspense fallback={<div className="contentPage" aria-busy="true" style={{ minHeight: 120 }} />}>
      <HowWePartnerPageClient />
    </Suspense>
  );
}
