import type { BlogPostLite } from "@/lib/blog";

export type BlogDemoBlock =
  | { kind: "h2"; id: string; text: string }
  | { kind: "h3"; id?: string; text: string }
  | { kind: "p"; text: string }
  | { kind: "pullquote"; text: string }
  | { kind: "reviewMeta"; venue: string; price: string; verdict: string }
  | { kind: "profileFacts"; items: { label: string; value: string }[] }
  | { kind: "ul"; items: string[] };

export type BlogDemoDetail = {
  lite: BlogPostLite;
  sections: { id: string; label: string }[];
  blocks: BlogDemoBlock[];
};

const img = (seed: number) => `https://picsum.photos/seed/wnlblog${seed}/960/640`;

export const BLOG_DEMOS: BlogDemoDetail[] = [
  {
    lite: {
      id: "demo-coffee-crawl",
      uid: "lancaster-coffee-crawl",
      title: "A crawl through Lancaster’s best new espresso bars",
      excerpt: "Five stops, five roasts—what’s worth the queue on a Saturday morning.",
      category: "Review",
      date: "2026-03-15",
      imageUrl: img(11),
      layout: "review",
      featured: true,
    },
    sections: [
      { id: "overview", label: "Overview" },
      { id: "stops", label: "The stops" },
      { id: "verdict", label: "Verdict" },
    ],
    blocks: [
      {
        kind: "p",
        text: "Central Market opens before dawn, but the real competition is who can pull the cleanest ristretto before the lunch rush. I spent one gray March morning walking a simple loop: warehouse district, south end, then back toward the square.",
      },
      { kind: "h2", id: "overview", text: "Why a crawl still matters" },
      {
        kind: "p",
        text: "Pop-ups rotate fast here. A crawl isn’t performative—it’s the quickest honest read on which baristas are dialing in their grinders daily versus coasting on novelty.",
      },
      { kind: "pullquote", text: "The best cup wasn’t the trendiest room—it was the quietest bar, where the shot landed like chocolate without trying." },
      { kind: "h2", id: "stops", text: "The stops" },
      {
        kind: "reviewMeta",
        venue: "Stop 1 — Quarterlight Espresso",
        price: "Two drinks ≈ $13",
        verdict: "Bright, lime-forward single origin; pastry case is small but fresh.",
      },
      {
        kind: "p",
        text: "Order the cortado and ask what’s on batch. They rotate Ethiopian and Colombian small lots every few days; chalkboard dates are honest.",
      },
      {
        kind: "reviewMeta",
        venue: "Stop 2 — Foundry Pour",
        price: "Flight of three ≈ $18",
        verdict: "Loved the texture; milk drinks run a touch sweet.",
      },
      {
        kind: "ul",
        items: [
          "Bring cash for the municipal lot two blocks east on busy Saturdays.",
          "If you’re sensitive to acidity, ask for their Brazilian natal on espresso.",
        ],
      },
      { kind: "h2", id: "verdict", text: "Verdict" },
      {
        kind: "p",
        text: "Go Foundry if you want experimentation, Quarterlight if you want restraint. Either way, start early: lines double after 9:30.",
      },
    ],
  },
  {
    lite: {
      id: "demo-maker-maria",
      uid: "profile-maria-hand-loom",
      title: "Profile: Maria Voss and the hand-loom revival upstairs on Walnut",
      excerpt: "From textile salvage to teaching neighbors to dress their own looms in twelve hours.",
      category: "Profile",
      date: "2026-03-02",
      imageUrl: img(22),
      layout: "profile",
      featured: true,
    },
    sections: [
      { id: "roots", label: "Roots" },
      { id: "studio", label: "The studio" },
      { id: "what-next", label: "What’s next" },
    ],
    blocks: [
      {
        kind: "p",
        text: "Maria Voss didn’t plan on running a classroom. She wanted a door that locked and enough floor load for two looms salvaged from a Reading mill closure.",
      },
      { kind: "h2", id: "roots", text: "Roots in salvage" },
      {
        kind: "profileFacts",
        items: [
          { label: "Studio", value: "Walnut Street, second floor (look for the indogo yarn in the window)" },
          { label: "Classes", value: "Intro to rigid heddle, twelve-hour intensive, kids’ card-weaving Sundays" },
          { label: "Side project", value: "Natural dye garden on a friend’s roof in Cabbage Hill" },
        ],
      },
      { kind: "h2", id: "studio", text: "Inside the studio" },
      {
        kind: "p",
        text: "Light hits the western windows at four, which is when evening students arrive—teachers, nurses, a city planner who says weaving helps her stop answering email in her head.",
      },
      { kind: "pullquote", text: "“I’m not precious about perfection. I’m precise about tension.”" },
      { kind: "h2", id: "what-next", text: "What’s next" },
      {
        kind: "p",
        text: "A small spring exhibition with three other makers, all using locally grown flax spun in small batches—details to be announced on her mailing list.",
      },
    ],
  },
  {
    lite: {
      id: "demo-weekend-picks",
      uid: "weekend-picks-late-march",
      title: "Weekend picks: jazz loft, loft ceramics, and a record flea",
      excerpt: "Short walks, big sound, and one pop-up that will actually fit in your tote bag.",
      category: "Guide",
      date: "2026-03-19",
      imageUrl: img(33),
      layout: "article",
      featured: true,
    },
    sections: [],
    blocks: [
      {
        kind: "p",
        text: "Late March is slippery: slush, sunbreaks, and everyone pretending winter didn’t happen. These three events reward layering a scarf and leaving the car behind.",
      },
      { kind: "h3", text: "Friday — Loft jazz, doors 7:30" },
      {
        kind: "p",
        text: "Acoustic trio, no cover but a hat pass; room holds eighty and usually does. Arrive by 7 if you want a rail spot.",
      },
      { kind: "h3", text: "Saturday — Ceramics open shelves" },
      {
        kind: "ul",
        items: [
          "Seconds rack in the alley—handles a little wonky, prices kind.",
          "Studio dog off-leash hours until 2 p.m. (allergen note for the sensitive).",
        ],
      },
      { kind: "h3", text: "Sunday — Record flea, gymnasium" },
      {
        kind: "p",
        text: "Dealers from York and Philly; dollar bins heavy on seventies funk. Cash preferred, one ATM on site with a grumpy line.",
      },
    ],
  },
  {
    lite: {
      id: "demo-gallery-night",
      uid: "gallery-night-shift-review",
      title: "Review: “Night Shift” at the corridor galleries",
      excerpt: "Industrial photography meets neon sculpture—two floors, zero filler.",
      category: "Review",
      date: "2026-02-28",
      imageUrl: img(44),
      layout: "review",
      featured: false,
    },
    sections: [
      { id: "space", label: "The space" },
      { id: "standouts", label: "Standouts" },
      { id: "coda", label: "Coda" },
    ],
    blocks: [
      {
        kind: "p",
        text: "You enter through the freight elevator, which is either atmospheric or OSHA’s nightmare depending on your temperament. Either way it sets the tone.",
      },
      { kind: "h2", id: "space", text: "The space" },
      {
        kind: "p",
        text: "Concrete columns are left raw; wiring is exposed on purpose. Works that would feel twee elsewhere read urgent here—especially the large-format prints of third-shift hospital custodians.",
      },
      { kind: "h2", id: "standouts", text: "Standouts" },
      {
        kind: "reviewMeta",
        venue: "Helena R. — “Blue Hour Inventory”",
        price: "Free entry / suggested donation",
        verdict: "Chromatic restraint with violent small details; linger on the third panel.",
      },
      {
        kind: "p",
        text: "Neon piece by collaborative static/noise reads like a city’s EKG—worth the staircase climb even if you skip everything else.",
      },
      { kind: "h2", id: "coda", text: "Coda" },
      {
        kind: "pullquote",
        text: "A show about labor that doesn’t aestheticize exhaustion—rare enough to mention twice.",
      },
    ],
  },
  {
    lite: {
      id: "demo-chefs-table",
      uid: "chefs-table-residency-notes",
      title: "Notes from a chef’s table residency that refused small talk",
      excerpt: "Twelve seats, one burner, laminated prep lists you weren’t allowed to photograph.",
      category: "Review",
      date: "2026-02-14",
      imageUrl: img(55),
      layout: "review",
      featured: false,
    },
    sections: [
      { id: "menu", label: "Menu rhythm" },
      { id: "wine", label: "Wine" },
      { id: "worth-it", label: "Worth it?" },
    ],
    blocks: [
      {
        kind: "p",
        text: "Residency dinners can be TED talks with tweezers. This one was closer to eavesdropping on a very competent line during service—mess included.",
      },
      { kind: "h2", id: "menu", text: "Menu rhythm" },
      {
        kind: "p",
        text: "Cold pickles, hot broth, then fish handled almost entirely by scent—citrus in the air before the plate landed. Bread appeared once, late, almost apologetic.",
      },
      { kind: "h2", id: "wine", text: "Wine" },
      {
        kind: "ul",
        items: [
          "Orange pouring that actually matched the chili oil—not a stunt.",
          "Zero menu substitutions; allergies handled with a whispered sidebar.",
        ],
      },
      { kind: "h2", id: "worth-it", text: "Worth it?" },
      {
        kind: "reviewMeta",
        venue: "Twelve-seat counter, undisclosed until ticket email",
        price: "All-in with pairings (steep but fair for the labor)",
        verdict: "Yes, if you like restaurants that trust you to handle silence.",
      },
    ],
  },
  {
    lite: {
      id: "demo-community-qa",
      uid: "community-board-qa-march",
      title: "Community Q&A: what actually happened at the March board meeting",
      excerpt: "Zoning, a dog park expansion, and three public comments that changed the vote.",
      category: "Article",
      date: "2026-03-08",
      imageUrl: img(66),
      layout: "article",
      featured: false,
    },
    sections: [
      { id: "agenda", label: "Agenda" },
      { id: "vote", label: "The vote" },
      { id: "after", label: "Aftermath" },
    ],
    blocks: [
      {
        kind: "p",
        text: "School board and city council often merge in public imagination; this was strictly zoning. Still, forty people stayed past ten on a Tuesday.",
      },
      { kind: "h2", id: "agenda", text: "Agenda" },
      {
        kind: "p",
        text: "Variance for a corner lot, revised setback language, and—unexpectedly—a ten-minute presentation from youth soccer parents with laminated aerial photos.",
      },
      { kind: "h2", id: "vote", text: "The vote" },
      {
        kind: "p",
        text: "The swing vote cited noise modeling that hadn’t been in the initial packet. A clerk scrambled PDFs while half the room held phone flashlights like a vigil.",
      },
      { kind: "pullquote", text: "Procedure isn’t theater until someone brings a poster board at midnight." },
      { kind: "h2", id: "after", text: "Aftermath" },
      {
        kind: "p",
        text: "Next hearing is April; applicants must submit revised traffic flow charts. Translation: the dog park fence moves six feet east, and everyone pretends that was the goal all along.",
      },
    ],
  },
];

export function listDemoBlogLites(): BlogPostLite[] {
  return BLOG_DEMOS.map((d) => d.lite);
}

export function getBlogDemoByUid(uid: string): BlogDemoDetail | undefined {
  return BLOG_DEMOS.find((d) => d.lite.uid === uid);
}
