export default function AboutPage() {
  return (
    <main className="contentPage aboutPage">
      <section className="contentHero">
        <p className="contentEyebrow">About the project</p>
        <h1 className="contentHeroTitle">A more useful way to find what’s happening in Lancaster.</h1>
        <p className="contentHeroLead">
          What’s Next Lancaster brings together events, places, and community updates in one clear experience so people can browse quickly and discover more of the city.
        </p>
      </section>

      <section className="contentGridTwo">
        <article className="contentCard">
          <h2 className="contentCardTitle">Why it exists</h2>
          <p>So many good things in Lancaster are announced across scattered channels. This project creates a single, easy-to-scan hub that makes local discovery feel immediate instead of fragmented.</p>
          <p>It is built to support casual browsing, trip planning, neighborhood exploration, and a stronger connection between residents, visitors, and local businesses.</p>
        </article>
        <article className="contentCard">
          <h2 className="contentCardTitle">What it includes</h2>
          <div className="contentChecklist">
            <div><strong>Calendar</strong><span>Upcoming events, weekly overviews, and fast filters.</span></div>
            <div><strong>Directory</strong><span>Places and venues with rich information and visuals.</span></div>
            <div><strong>Updates</strong><span>Announcements, openings, alerts, and featured local changes.</span></div>
          </div>
        </article>
      </section>

      <section className="contentGridThree">
        <article className="contentCard">
          <h3 className="contentMiniTitle">Community-first</h3>
          <p>The site is designed around utility, clarity, and local relevance rather than clutter.</p>
        </article>
        <article className="contentCard">
          <h3 className="contentMiniTitle">Fast to browse</h3>
          <p>Information is organized so users can move through listings and details without losing context.</p>
        </article>
        <article className="contentCard">
          <h3 className="contentMiniTitle">Built to grow</h3>
          <p>The platform supports richer content, featured updates, PDFs, expanded place details, and more.</p>
        </article>
      </section>

      <section className="contentCard contentWideCard">
        <h2 className="contentCardTitle">How the experience works</h2>
        <div className="contentSteps">
          <div><span>01</span><p>Browse the current calendar and jump straight into event details.</p></div>
          <div><span>02</span><p>Explore directory entries to discover places worth visiting.</p></div>
          <div><span>03</span><p>Check updates for new openings, announcements, and featured notices.</p></div>
        </div>
      </section>
    </main>
  );
}
