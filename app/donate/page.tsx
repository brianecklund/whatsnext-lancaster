export default function DonatePage() {
  return (
    <main className="contentPage donatePage">
      <section className="contentHero">
        <p className="contentEyebrow">Support local discovery</p>
        <h1 className="contentHeroTitle">Help keep What’s Next Lancaster free, current, and community-driven.</h1>
        <p className="contentHeroLead">
          Contributions help cover site upkeep, event curation, venue research, and the tools needed to keep the calendar, directory, and updates fresh.
        </p>
      </section>

      <section className="contentGridTwo donateGrid">
        <article className="contentCard">
          <h2 className="contentCardTitle">What your support helps fund</h2>
          <div className="contentChecklist">
            <div><strong>Calendar maintenance</strong><span>Keeping event information accurate and easy to browse.</span></div>
            <div><strong>Directory growth</strong><span>Adding richer venue details, links, and imagery.</span></div>
            <div><strong>Community updates</strong><span>Highlighting openings, announcements, and timely local news.</span></div>
          </div>
        </article>

        <aside className="contentCard donateFormCard">
          <h2 className="contentCardTitle">Make a contribution</h2>
          <form className="donateForm">
            <div className="donateAmountRow">
              <button type="button" className="donateAmountBtn">$10</button>
              <button type="button" className="donateAmountBtn">$25</button>
              <button type="button" className="donateAmountBtn">$50</button>
              <button type="button" className="donateAmountBtn">Custom</button>
            </div>
            <label className="fieldLabel">Name<input className="fieldInput" type="text" placeholder="Your name" /></label>
            <label className="fieldLabel">Email<input className="fieldInput" type="email" placeholder="you@example.com" /></label>
            <label className="fieldLabel">Message<textarea className="fieldTextarea" placeholder="Share why you’re supporting the project." rows={4} /></label>
            <button type="submit" className="primaryActionBtn">Continue to donate</button>
            <p className="fieldHelp">This is a front-end form block ready to connect to your payment flow of choice.</p>
          </form>
        </aside>
      </section>

      <section className="contentGridThree">
        <article className="contentCard">
          <h3 className="contentMiniTitle">For locals</h3>
          <p>Support a cleaner way to see what is happening around Lancaster without digging through multiple feeds.</p>
        </article>
        <article className="contentCard">
          <h3 className="contentMiniTitle">For visitors</h3>
          <p>Help make the site a stronger planning tool for people discovering Lancaster for the first time.</p>
        </article>
        <article className="contentCard">
          <h3 className="contentMiniTitle">For venues</h3>
          <p>Contributions help improve visibility for independent spaces, events, and neighborhood businesses.</p>
        </article>
      </section>
    </main>
  );
}
