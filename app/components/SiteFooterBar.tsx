"use client";

import Link from "next/link";
import { siteCopy } from "@/lib/site-copy";

export default function SiteFooterBar() {
  const year = new Date().getFullYear();
  return (
    <footer className="siteFooterBar" aria-label="Site footer">
      <div className="siteFooterBar__inner">
        <div className="siteFooterBar__left">
          <span className="siteFooterBar__copy">© {year} {siteCopy.footer.copyrightName}</span>
          <span className="siteFooterBar__sep" aria-hidden>·</span>
          <Link className="siteFooterBar__link" href="/contact">Contact</Link>
          <span className="siteFooterBar__sep" aria-hidden>·</span>
          <a className="siteFooterBar__link" href={`mailto:${siteCopy.footer.newsletterEmail}`}>Newsletter signup</a>
        </div>
      </div>
    </footer>
  );
}

