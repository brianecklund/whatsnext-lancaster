import Link from "next/link";
import SpringHubBack from "./SpringHubBack";

export const metadata = {
  title: "Spring hub | What’s Next Lancaster",
  description: "Seasonal picks, upcoming events, reviews, and updates for spring in Lancaster, PA.",
};

export default function SpringHubPage() {
  return (
    <main className="contentPage springHubPage">
      <SpringHubBack />
      <header className="springHubHero">
        <p className="contentEyebrow">Seasonal hub</p>
        <h1 className="contentHeroTitle">Spring in Lancaster</h1>
        <p className="contentHeroLead">
          A landing spot for the season: ideas for where to go, what’s opening, what to eat, and what’s on the calendar as
          the weather turns.
        </p>
      </header>

      <section className="contentGridTwo springHubGrid">
        <div className="contentCard springHubCard">
          <div className="springHubCard__media wnlPlaceholderThumb wnlPlaceholderThumb--banner" aria-hidden />
          <h2 className="contentCardTitle">Suggestions</h2>
          <p style={{ color: "var(--muted)", lineHeight: 1.65, margin: 0 }}>
            We’re curating patios, markets, walks, and small venues that shine in spring. Use the live{" "}
            <Link href="/">calendar</Link> and <Link href="/locations">directory</Link>
            —this page will grow with more seasonal guides.
          </p>
        </div>
        <div className="contentCard">
          <h2 className="contentCardTitle">Upcoming events</h2>
          <p style={{ color: "var(--muted)", lineHeight: 1.65, margin: 0 }}>
            The main calendar stays current. On mobile, use the Calendar tab; on desktop, try month view to scan the weeks
            ahead.
          </p>
        </div>
        <div className="contentCard springHubCard">
          <div className="springHubCard__media wnlPlaceholderThumb wnlPlaceholderThumb--banner" aria-hidden />
          <h2 className="contentCardTitle">Reviews &amp; notes</h2>
          <p style={{ color: "var(--muted)", lineHeight: 1.65, margin: 0 }}>
            Short takes on openings and experiences will live here with links into the directory. Want something featured?{" "}
            <Link href="/contact">Get in touch</Link>
            .
          </p>
        </div>
        <div className="contentCard springHubCard">
          <div className="springHubCard__media wnlPlaceholderThumb wnlPlaceholderThumb--banner" aria-hidden />
          <h2 className="contentCardTitle">Updates</h2>
          <p style={{ color: "var(--muted)", lineHeight: 1.65, margin: 0 }}>
            PSAs, menu changes, and quick hits live under{" "}
            <Link href="/updates">Updates</Link>
            —the same feed you can open from the home news ticker.
          </p>
        </div>
      </section>

      <p className="springHubBack">
        <Link href="/">← Calendar home</Link>
      </p>
    </main>
  );
}
