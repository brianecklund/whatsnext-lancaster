export default function AboutPage() {
  return (
    <div className="aboutPage">
      {/* Hero */}
      <section className="aboutHero">
        <div className="aboutHeroInner">
          <h1 className="aboutHeroTitle">What’s Next Lancaster</h1>
          <p className="aboutHeroLead">
            A simple, community-first way to find what’s happening around Lancaster — events,
            specials, pop-ups, openings, and more.
          </p>
        </div>
      </section>

      {/* Title + body */}
      <section className="aboutStory">
        <div className="aboutStoryInner">
          <h2 className="aboutStoryTitle">Why this exists</h2>
          <div className="aboutStoryBody">
            <p>
              Lancaster has an amazing mix of venues, restaurants, galleries, makers, and
              community spaces — and a lot of great things get announced in a dozen different
              places.
            </p>
            <p>
              What’s Next Lancaster is a clean, no-friction hub to browse what’s going on right
              now, save time planning, and discover places you haven’t visited yet.
            </p>
          </div>
        </div>
      </section>

      {/* 3-up */}
      <section className="aboutGrid" aria-label="How it works">
        <div className="aboutGridInner">
          <div className="aboutCard">
            <img className="aboutCardImg" src="/about/browse.svg" alt="Browse events" />
            <h3 className="aboutCardTitle">Browse fast</h3>
            <p className="aboutCardBody">
              Scan the calendar list, filter by type, and click into details without losing your
              place.
            </p>
          </div>

          <div className="aboutCard">
            <img className="aboutCardImg" src="/about/discover.svg" alt="Discover places" />
            <h3 className="aboutCardTitle">Discover places</h3>
            <p className="aboutCardBody">
              Use the directory to explore new venues and businesses, then jump right to their
              website.
            </p>
          </div>

          <div className="aboutCard">
            <img className="aboutCardImg" src="/about/share.svg" alt="Share updates" />
            <h3 className="aboutCardTitle">Stay in the loop</h3>
            <p className="aboutCardBody">
              Updates highlight things like openings, menu changes, and PSAs so you don’t miss
              what’s new.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
