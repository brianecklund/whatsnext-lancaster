export default function Home() {
  return (
    <div className="pageShell">
      <div className="scroll">
        <div style={{ paddingTop: 18 }}>
          <h1 className="detailTitle">What&apos;s next, Lancaster?</h1>
          <p className="subtle">
            A simple, CMS-powered calendar for local events and the places hosting them.
          </p>

          <div className="detailBlock">
            <div className="kv">
              <span><a href="/calendar">Open Calendar</a></span>
              <span>•</span>
              <span><a href="/locations">Browse Locations</a></span>
            </div>
          </div>

          <p className="subtle" style={{ marginTop: 16 }}>
            This build is designed for a Filter Munich-style split view: listings on the left, details on the right.
          </p>
        </div>
      </div>
    </div>
  );
}
