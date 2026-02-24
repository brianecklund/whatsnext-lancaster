import UpdatesSplitClient, { type UpdateLite } from "./UpdatesSplitClient";

export const dynamic = "force-dynamic";

export default async function UpdatesPage() {
  // NOTE: There is no "update" custom type wired up yet in this repo.
  // This is a front-end split-screen view that can be connected to Prismic later.

  const updates: UpdateLite[] = [
    {
      id: "u-1",
      title: "New seasonal menu at West Art",
      date: "This week",
      tags: ["new seasonal menu", "opening"],
      body:
        "A handful of new drinks and a few rotating food items just hit the board. If you’re planning a night out, check the latest menu before you go.",
      link: null,
    },
    {
      id: "u-2",
      title: "Parking PSA for First Friday",
      date: "Feb 2026",
      tags: ["PSA", "downtown"],
      body:
        "Heads up: expect heavier-than-normal traffic near Gallery Row. Give yourself a few extra minutes or consider parking a few blocks out and walking in.",
      link: null,
    },
    {
      id: "u-3",
      title: "Pop-up weekend: local makers market",
      date: "Upcoming",
      tags: ["pop-up", "market"],
      body:
        "A short, sweet weekend market with local makers and artists. More details will land on the calendar as soon as they’re confirmed.",
      link: null,
    },
  ];

  return <UpdatesSplitClient updates={updates} />;
}
