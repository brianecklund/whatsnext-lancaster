import type { Metadata } from "next";

/**
 * Site-wide marketing copy and nav labels.
 *
 * **Demo / white-label deploys:** set at build time:
 *   `NEXT_PUBLIC_SITE_VARIANT=demo`
 * (e.g. in Vercel “Environment Variables” scoped to a `demo/*` branch, or in `.env.local` locally.)
 *
 * **Git workflow:** keep `main` on `default`; use a long-lived `demo/...` branch that only differs by
 * env in the host (recommended), or merge the same `lib/site-copy.ts` and edit the `DEMO` object on the branch.
 */
export type SiteVariant = "default" | "demo";

export function getSiteVariant(): SiteVariant {
  const raw = (process.env.NEXT_PUBLIC_SITE_VARIANT ?? "").trim().toLowerCase();
  return raw === "demo" ? "demo" : "default";
}

export const isDemoSite = getSiteVariant() === "demo";

export type SiteCopy = {
  brandFull: string;
  brandShort: string;
  brandAriaLabel: string;
  brandMobileCalendarAriaLabel: string;
  metadata: Metadata;
  nav: {
    calendar: string;
    directory: string;
    updates: string;
    blog: string;
    donate: string;
    about: string;
    contact: string;
  };
  /** Intro line in the shell news bar (calendar / directory / updates). */
  calendarTickerIntro: string;
  splitTaglines: {
    directory: string;
    updates: string;
  };
  hubLeadDefault: string;
  explore: {
    sectionAriaLabel: string;
    toggleClosedAria: string;
    toggleOpenAria: string;
  };
  hubPanel: {
    overlayAriaLabel: string;
    closeHeaderAria: string;
    title: string;
  };
  newsBar: {
    desktopStripAriaLabel: string;
    desktopClosePanelAria: string;
  };
  footer: {
    copyrightName: string;
    newsletterEmail: string;
  };
  /** Long-form marketing copy on static content pages. */
  pages: {
    aboutHeroLead: string;
    donateLead: string;
    partnershipsHeroTitle: string;
    partnershipsHeroLead: string;
    partnershipsMetaDescription: string;
    howWePartnerMetaDescription: string;
  };
};

const DEFAULT_COPY: SiteCopy = {
  brandFull: "What’s Next Lancaster",
  brandShort: "What’s Next",
  brandAriaLabel: "What’s Next Lancaster",
  brandMobileCalendarAriaLabel: "What’s Next Lancaster — Calendar home",
  metadata: {
    title: "What's Next Lancaster",
    description: "Events, places, and updates happening around Lancaster.",
  },
  nav: {
    calendar: "Calendar",
    directory: "Directory",
    updates: "Updates",
    blog: "Blog",
    donate: "Donate",
    about: "About",
    contact: "Contact",
  },
  calendarTickerIntro: "A calendar of events, specials, and pop-ups in Lancaster, PA.",
  splitTaglines: {
    directory: "A directory of places in Lancaster to explore.",
    updates: "Updates, openings, menu changes, PSAs, and quick announcements.",
  },
  hubLeadDefault:
    "What’s Next Lancaster brings together a shared events calendar, a directory of places, and short community updates so you can see what’s on, where to go, and what just changed—whether you’re planning a night out or keeping up with openings and specials.",
  explore: {
    sectionAriaLabel: "Explore What’s Next",
    toggleClosedAria: "Explore What’s Next",
    toggleOpenAria: "Close explore panel",
  },
  hubPanel: {
    overlayAriaLabel: "What’s Next Lancaster highlights",
    closeHeaderAria: "Close What’s happening in Lancaster",
    title: "What’s happening in Lancaster",
  },
  newsBar: {
    desktopStripAriaLabel: "Latest updates — open full list",
    desktopClosePanelAria: "Close latest updates panel",
  },
  footer: {
    copyrightName: "What’s Next Lancaster",
    newsletterEmail: "hello@whatsnextlancaster.com",
  },
  pages: {
    aboutHeroLead:
      "What’s Next Lancaster brings together events, places, and community updates in one clear experience so people can browse quickly and discover more of the city.",
    donateLead:
      "Help keep What’s Next Lancaster free, current, and community-driven. Contributions help cover site upkeep, event curation, venue research, and the tools needed to keep the calendar, directory, and updates fresh.",
    partnershipsHeroTitle: "Partner with What’s Next Lancaster",
    partnershipsHeroLead:
      "We collaborate with venues, sponsors, and community organizations to highlight what’s happening in Lancaster and help people discover local experiences.",
    partnershipsMetaDescription:
      "Collaborate with What’s Next Lancaster to reach local audiences through events, places, and community updates.",
    howWePartnerMetaDescription:
      "How What’s Next Lancaster partners with local businesses and organizations to grow reach, audiences, and community collaboration in Lancaster, PA.",
  },
};

/** Edit this block for demo / pitch deploys — no need to touch nav components. */
const DEMO_COPY: SiteCopy = {
  brandFull: "Example City Guide",
  brandShort: "City Guide",
  brandAriaLabel: "Example City Guide",
  brandMobileCalendarAriaLabel: "Example City Guide — Events home",
  metadata: {
    title: "Example City Guide (demo)",
    description: "Demo shell: events, places, and community updates in one place.",
  },
  nav: {
    calendar: "Events",
    directory: "Places",
    updates: "News",
    blog: "Stories",
    donate: "Support",
    about: "About",
    contact: "Contact",
  },
  calendarTickerIntro: "A sample calendar of events, specials, and pop-ups (demo content).",
  splitTaglines: {
    directory: "A sample directory of places to explore (demo).",
    updates: "Sample news: openings, changes, and quick announcements (demo).",
  },
  hubLeadDefault:
    "This demo brings together a calendar-style list, a place directory, and short updates so stakeholders can see the full layout with neutral branding.",
  explore: {
    sectionAriaLabel: "Explore Example City Guide",
    toggleClosedAria: "Explore Example City Guide",
    toggleOpenAria: "Close explore panel",
  },
  hubPanel: {
    overlayAriaLabel: "Example City Guide highlights",
    closeHeaderAria: "Close regional highlights",
    title: "What’s on in the region",
  },
  newsBar: {
    desktopStripAriaLabel: "Latest highlights — open panel",
    desktopClosePanelAria: "Close highlights panel",
  },
  footer: {
    copyrightName: "Example City Guide",
    newsletterEmail: "hello@example.com",
  },
  pages: {
    aboutHeroLead:
      "This demo experience brings together events, places, and community-style updates in one layout so reviewers can browse quickly and imagine their own city’s content.",
    donateLead:
      "This is sample copy for a support page in the demo. Replace with your organization’s story, impact, and funding needs.",
    partnershipsHeroTitle: "Partner with Example City Guide",
    partnershipsHeroLead:
      "Demo copy: how a regional guide can work with venues and sponsors through a shared calendar, directory, and update feed.",
    partnershipsMetaDescription:
      "Demo page: how a city guide can collaborate with local organizations through events, places, and updates.",
    howWePartnerMetaDescription:
      "Demo overview of partnership options for local businesses and organizations (placeholder content).",
  },
};

export const siteCopy: SiteCopy = getSiteVariant() === "demo" ? DEMO_COPY : DEFAULT_COPY;

export function withSiteTitle(pageTitle: string): string {
  return `${pageTitle} | ${siteCopy.brandFull}`;
}
