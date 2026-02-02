import { createClient, prismic } from "@/prismicio";
import { format, parseISO } from "date-fns";

type PageProps = {
  params: { uid: string };
};

export const dynamic = "force-dynamic";

export default async function LocationPage({ params }: PageProps) {
  const client = createClient();
  const location = await client.getByUID("location", params.uid);

  const eventDocs = await client.getAllByType("event", {
    filters: [prismic.filter.at("my.event.location", location.id)],
    orderings: [{ field: "my.event.start_datetime", direction: "asc" }],
  });

  const desc = location.data?.description;
  const descText =
    typeof desc === "string" ? desc : Array.isArray(desc) ? prismic.asText(desc) : null;

  // ✅ Safe Prismic link handling (no `.url` access)
  const websiteUrl = prismic.asLink(location.data?.website);

  return (
    <div className="pageShell">
      <div className="scroll">
        <div style={{ paddingTop: 18 }}>
          <h1 className="detailTitle">{location.data?.name ?? "Location"}</h1>

          <div className="kv" style={{ marginBottom: 10 }}>
            {location.data?.category ? (
              <span className="badge">{location.data.category}</span>
            ) : null}

            {location.data?.address ? <span>{location.data.address}</span> : null}

            {websiteUrl ? (
              <>
                <span>•</span>
                <a href={websiteUrl} target="_blank" rel="noreferrer">
                  Website
                </a>
              </>
            ) : null}
          </div>

          <div className="detailBlock">
            <div className="h2">About</div>
            <div className="subtle" style={{ whiteSpace: "pre-wrap" }}>
              {descText ?? "No description added yet."}
            </div>
          </div>

          <div className="detailBlock">
            <div className="h2">Upcoming events</div>
            {eventDocs.length === 0 ? (
              <div className="subtle">No upcoming events published for this location yet.</div>
            ) : (
              <div>
                {eventDocs.map((e: any) => {
                  const start = e.data?.start_datetime ? parseISO(e.data.start_datetime) : null;
                  return (
                    <div key={e.id} className="row" style={{ cursor: "default" }}>
                      <div className="rowTop">
                        <div className="rowTitle">{e.data?.title ?? "Event"}</div>
                        {e.data?.event_type ? (
                          <span className="badge">{e.data.event_type}</span>
                        ) : null}
                      </div>
                      <div className="meta">
                        {start ? <span>{format(start, "MMM d, h:mm a")}</span> : null}
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>

          <div className="detailBlock">
            <div className="subtle">
              Prefer split view?{" "}
              <a href={`/locations?loc=${location.uid}`}>Open in split layout</a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
