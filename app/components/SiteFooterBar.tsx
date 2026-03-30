"use client";

import Link from "next/link";

export default function SiteFooterBar() {
  const year = new Date().getFullYear();
  return (
    <footer className="siteFooterBar" aria-label="Site footer">
      <div className="siteFooterBar__inner">
        <div className="siteFooterBar__left">
          <span className="siteFooterBar__copy">© {year} What’s Next Lancaster</span>
          <span className="siteFooterBar__sep" aria-hidden>·</span>
          <Link className="siteFooterBar__link" href="/contact">Contact</Link>
          <span className="siteFooterBar__sep" aria-hidden>·</span>
          <a className="siteFooterBar__link" href="mailto:hello@whatsnextlancaster.com">Newsletter signup</a>
        </div>
      </div>
    </footer>
  );
}

