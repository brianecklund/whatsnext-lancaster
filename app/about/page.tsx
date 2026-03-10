const platformHighlights = [
  {
    title: "Browse what matters faster",
    body:
      "See the week at a glance, jump directly to the day you care about, and move from overview to event detail without losing your place.",
  },
  {
    title: "Discover places through activity",
    body:
      "The directory is built to become more than a list — it can reveal who is active this week, what kinds of events they host, and what to check next.",
  },
  {
    title: "Track what is changing locally",
    body:
      "Openings, specials, pop-ups, seasonal programming, and neighborhood updates all belong in one shared, readable place.",
  },
];

const futureFeatures = [
  "Smarter weekly overview blocks with clearer venue and category signals",
  "A richer venue directory with business details, event patterns, and related places",
  "Automated imports from outside data sources to keep local place information fresher",
  "Better mobile browsing so users can scan, open, and move between events quickly",
];

const principles = [
  { label: "Readable", value: "Clean layouts, larger type, fast scanning" },
  { label: "Local", value: "Built around Lancaster-specific discovery" },
  { label: "Useful", value: "Designed for real planning, not endless browsing" },
  { label: "Evolving", value: "Structured to grow with richer place and event data" },
];

export default function AboutPage() {
  return (
    <div className="aboutPage">
      <section className="aboutHero">
        <div className="aboutHeroInner">
          <div className="aboutEyebrow">About</div>
          <h1 className="aboutHeroTitle">What’s Next Lancaster</h1>
          <p className="aboutHeroLead">
            A community-first event and discovery platform for Lancaster — built to make it easier
            to see what is happening now, what is coming next, and which places are shaping the
            week.
          </p>

          <div className="aboutHeroStats" role="list" aria-label="Platform highlights">
            <div className="aboutHeroStat" role="listitem">
              <div className="aboutHeroStatKicker">Focus</div>
              <div className="aboutHeroStatValue">Events + places</div>
            </div>
            <div className="aboutHeroStat" role="listitem">
              <div className="aboutHeroStatKicker">Built for</div>
              <div className="aboutHeroStatValue">Local discovery</div>
            </div>
            <div className="aboutHeroStat" role="listitem">
              <div className="aboutHeroStatKicker">Direction</div>
              <div className="aboutHeroStatValue">A smarter city guide</div>
            </div>
          </div>
        </div>
      </section>

      <section className="aboutStory">
        <div className="aboutStoryInner aboutTwoCol">
          <div>
            <div className="aboutSectionEyebrow">Why this exists</div>
            <h2 className="aboutStoryTitle">Lancaster has plenty happening, but the information is fragmented.</h2>
          </div>
          <div className="aboutStoryBody">
            <p>
              Great events and local updates get posted across venue sites, Instagram stories,
              newsletters, flyers, and last-minute announcements. That can make it harder to get a
              clear sense of what is really happening across the city in a single week.
            </p>
            <p>
              What’s Next Lancaster is meant to reduce that friction. It brings events, places, and
              updates into a format that is easy to scan, easy to navigate, and better suited to
              planning a night out or discovering somewhere new.
            </p>
          </div>
        </div>
      </section>

      <section className="aboutHighlights" aria-label="What the platform is designed to do">
        <div className="aboutGridInner">
          {platformHighlights.map((item) => (
            <article key={item.title} className="aboutCard aboutFeatureCard">
              <div className="aboutFeatureIndex">0{platformHighlights.indexOf(item) + 1}</div>
              <h3 className="aboutCardTitle">{item.title}</h3>
              <p className="aboutCardBody">{item.body}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="aboutProcess">
        <div className="aboutStoryInner">
          <div className="aboutSectionEyebrow">How to use it</div>
          <h2 className="aboutStoryTitle">A simple flow for browsing the week</h2>

          <div className="aboutTimeline" role="list">
            <div className="aboutTimelineItem" role="listitem">
              <div className="aboutTimelineStep">1</div>
              <div>
                <h3 className="aboutTimelineTitle">Start with the week</h3>
                <p className="aboutCardBody">
                  Use the weekly overview to understand the rhythm of the next few days before
                  drilling into an individual listing.
                </p>
              </div>
            </div>
            <div className="aboutTimelineItem" role="listitem">
              <div className="aboutTimelineStep">2</div>
              <div>
                <h3 className="aboutTimelineTitle">Jump into a day</h3>
                <p className="aboutCardBody">
                  Scan by day, filter by type, and move directly to the listings most relevant to the
                  current week.
                </p>
              </div>
            </div>
            <div className="aboutTimelineItem" role="listitem">
              <div className="aboutTimelineStep">3</div>
              <div>
                <h3 className="aboutTimelineTitle">Open details without losing context</h3>
                <p className="aboutCardBody">
                  Browse venue information, summaries, tickets, links, and related context while
                  keeping the overall flow of the page intact.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="aboutPrinciples">
        <div className="aboutStoryInner">
          <div className="aboutSectionEyebrow">What guides the experience</div>
          <h2 className="aboutStoryTitle">The product is being shaped around a few simple principles.</h2>

          <div className="aboutPrinciplesGrid" role="list">
            {principles.map((item) => (
              <div key={item.label} className="aboutPrincipleCard" role="listitem">
                <div className="aboutPrincipleLabel">{item.label}</div>
                <div className="aboutPrincipleValue">{item.value}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="aboutFuture">
        <div className="aboutStoryInner aboutFutureWrap">
          <div>
            <div className="aboutSectionEyebrow">Where it is heading</div>
            <h2 className="aboutStoryTitle">The next evolution is a smarter local discovery layer.</h2>
          </div>

          <div className="aboutFutureList" role="list">
            {futureFeatures.map((item) => (
              <div key={item} className="aboutFutureItem" role="listitem">
                <span className="aboutFutureBullet" aria-hidden>•</span>
                <span>{item}</span>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
