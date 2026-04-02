import { Suspense } from "react";
import ContactPageClient from "./ContactPageClient";

export default function ContactPage() {
  return (
    <Suspense fallback={<div className="simplePage" aria-busy="true" style={{ minHeight: 120 }} />}>
      <ContactPageClient />
    </Suspense>
  );
}
