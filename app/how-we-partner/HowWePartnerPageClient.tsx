"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import MobileContentBackButton from "@/app/components/MobileContentBackButton";
import { sanitizeInternalReturnPath } from "@/lib/sanitize-internal-path";

export default function HowWePartnerPageClient() {
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
        <p className="contentEyebrow">How we partner</p>
        <h1 className="contentHeroTitle">Growing together in Lancaster</h1>
        <p className="contentHeroLead">
          We work with local businesses and organizations to help them reach new audiences, strengthen visibility, and spark partnerships and unexpected collaborations
          across the community.
        </p>
      </header>

      <section className="contentGridThree">
        <article className="contentCard">
          <h3 className="contentMiniTitle">Reach</h3>
          <p>
            Your story surfaces where people already browse for events, places, and timely updates—so discovery feels natural, not noisy.
          </p>
        </article>
        <article className="contentCard">
          <h3 className="contentMiniTitle">Growth</h3>
          <p>
            We focus on clear presentation and trusted context so visitors can act: attend, visit, share, and come back.
          </p>
        </article>
        <article className="contentCard">
          <h3 className="contentMiniTitle">Community</h3>
          <p>
            Connections between venues, makers, and groups are part of the point—when the network grows, everyone benefits.
          </p>
        </article>
      </section>

      <section className="contentCard contentWideCard">
        <h2 className="contentCardTitle">Interested?</h2>
        <p style={{ marginBottom: 0 }}>
          See the{" "}
          <Link href="/partnerships">partnerships overview</Link>
          , email{" "}
          <a href="mailto:partnerships@whatsnextlancaster.com">partnerships@whatsnextlancaster.com</a>
          , or{" "}
          <Link href="/contact">send a message</Link>.
        </p>
      </section>

      <p className="springHubBack" style={{ marginTop: 24 }}>
        <Link href="/contact">Contact</Link>
        {" · "}
        <Link href="/partnerships">Partnerships</Link>
      </p>
    </main>
  );
}
