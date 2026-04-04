"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import MobileContentBackButton from "@/app/components/MobileContentBackButton";
import { sanitizeInternalReturnPath } from "@/lib/sanitize-internal-path";

export default function PartnershipsPageClient() {
  const router = useRouter();
  const sp = useSearchParams();
  const returnPath = useMemo(() => sanitizeInternalReturnPath(sp.get("from")), [sp]);
  const [narrowViewport, setNarrowViewport] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(max-width: 980px)");
    const sync = () => setNarrowViewport(mq.matches);
    sync();
    mq.addEventListener("change", sync);
    return () => mq.removeEventListener("change", sync);
  }, []);

  return (
    <main className="contentPage">
      {narrowViewport && returnPath ? (
        <div className="simplePageMobileBack">
          <MobileContentBackButton onBack={() => router.push(returnPath)} label="Back" />
        </div>
      ) : null}

      <header className="contentHero">
        <p className="contentEyebrow">Partnerships</p>
        <h1 className="contentHeroTitle">Partner with What’s Next Lancaster</h1>
        <p className="contentHeroLead">
          We collaborate with venues, sponsors, and community organizations to highlight what’s happening in Lancaster and help people discover local experiences.
        </p>
      </header>

      <section className="contentGridTwo">
        <article className="contentCard">
          <h2 className="contentCardTitle">What we’re looking for</h2>
          <p>
            Strategic partners who want to reach engaged locals and visitors through the calendar, directory, and updates—aligned with a clear, community-first
            editorial voice.
          </p>
        </article>
        <article className="contentCard">
          <h2 className="contentCardTitle">Next steps</h2>
          <p>
            Read{" "}
            <Link href="/how-we-partner">how we work with partners</Link>
            , then email{" "}
            <a className="calloutLink" href="mailto:partnerships@whatsnextlancaster.com">
              partnerships@whatsnextlancaster.com
            </a>{" "}
            or use the{" "}
            <Link href="/contact">contact form</Link>.
          </p>
        </article>
      </section>

      <p className="springHubBack" style={{ marginTop: 24 }}>
        <Link href="/locations">Directory</Link>
        {" · "}
        <Link href="/">Calendar</Link>
        {" · "}
        <Link href="/contact">Contact</Link>
      </p>
    </main>
  );
}
