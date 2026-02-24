"use client";

import { useEffect, useMemo, useState } from "react";
import { useRouter, useSearchParams, usePathname } from "next/navigation";

export type UpdateLite = {
  id: string;
  title: string;
  tags: string[];
  date?: string | null; // ISO or display
  body?: string | null;
  link?: string | null;
};

type Props = {
  updates: UpdateLite[];
};

function norm(v: string) {
  return (v || "").toLowerCase().trim();
}

export default function UpdatesSplitClient({ updates }: Props) {
  const router = useRouter();
  const sp = useSearchParams();
  const pathname = usePathname();

  const q = sp.get("q") || "";
  const selectedKey = sp.get("u") || "";

  const [isMobile, setIsMobile] = useState(false);
  const [mobileTab, setMobileTab] = useState<"list" | "detail">("list");

  useEffect(() => {
    const mq = window.matchMedia("(max-width: 980px)");
    const apply = () => setIsMobile(mq.matches);
    apply();
    mq.addEventListener("change", apply);
    return () => mq.removeEventListener("change", apply);
  }, []);

  function setParam(key: string, value: string | null) {
    const params = new URLSearchParams(sp.toString());
    if (!value) params.delete(key);
    else params.set(key, value);
    router.push(`/updates?${params.toString()}`);
  }

  function setSelected(id: string) {
    setParam("u", id);
    if (isMobile) setMobileTab("detail");
  }

  const filtered = useMemo(() => {
    const nq = norm(q);
    if (!nq) return updates;
    return updates.filter((u) => {
      const hay = norm([u.title, ...(u.tags || []), u.body || ""].join(" "));
      return hay.includes(nq);
    });
  }, [updates, q]);

  const selectedDesktop = useMemo(() => {
    if (!filtered.length) return null;
    if (!selectedKey) return filtered[0];
    return filtered.find((u) => u.id === selectedKey) ?? filtered[0];
  }, [filtered, selectedKey]);

  const selectedMobile = useMemo(() => {
    if (!selectedKey) return null;
    return filtered.find((u) => u.id === selectedKey) ?? null;
  }, [filtered, selectedKey]);

  const selected = isMobile ? selectedMobile : selectedDesktop;

  const showLeft = !isMobile || mobileTab === "list";
  const showRight = !isMobile || mobileTab === "detail";

  return (
    <div className="pageShell">
      <div className="tagline">Updates, openings, menu changes, PSAs, and quick announcements.</div>

      <div className="split">
        {/* LEFT */}
        {showLeft ? (
          <aside className="pane paneLeft">
            <div className="scroll">
              <div className="leftSticky">
                <div className="tabs" aria-label="Primary navigation">
                  <button
                    type="button"
                    className="tabBtn"
                    data-active={pathname === "/" ? "true" : "false"}
                    onClick={() => router.push("/")}
                  >
                    Calendar
                  </button>
                  <button
                    type="button"
                    className="tabBtn"
                    data-active={pathname?.startsWith("/locations") ? "true" : "false"}
                    onClick={() => router.push("/locations")}
                  >
                    Directory
                  </button>
                  <button
                    type="button"
                    className="tabBtn"
                    data-active={pathname?.startsWith("/updates") ? "true" : "false"}
                    onClick={() => router.push("/updates")}
                  >
                    Updates
                  </button>
                </div>

                <div className="leftControls">
                  <input
                    className="searchInput"
                    placeholder="Search updates…"
                    value={q}
                    onChange={(e) => setParam("q", e.target.value)}
                    aria-label="Search updates"
                  />
                  {q ? (
                    <button className="clearBtn" type="button" onClick={() => setParam("q", null)}>
                      Clear
                    </button>
                  ) : null}
                </div>
              </div>

              {filtered.length === 0 ? (
                <div className="emptyList">No updates found.</div>
              ) : (
                <div style={{ paddingTop: 6 }}>
                  {filtered.map((u) => {
                    const active = selected?.id === u.id;
                    return (
                      <button
                        key={u.id}
                        className="eventRow"
                        data-active={active ? "true" : "false"}
                        onClick={() => setSelected(u.id)}
                        type="button"
                      >
                        <span className="eventRowTitle">{u.title}</span>
                        <span className="eventRowMeta">
                          {u.date ? <span>{u.date}</span> : null}
                        </span>
                        {u.tags?.length ? (
                          <span className="tagRow" aria-label="Update tags">
                            {u.tags.slice(0, 3).map((t) => (
                              <span key={t} className="tagChip">
                                {t}
                              </span>
                            ))}
                          </span>
                        ) : null}
                      </button>
                    );
                  })}
                </div>
              )}
            </div>
          </aside>
        ) : null}

        {/* RIGHT */}
        {showRight ? (
          <section className="pane paneRight">
            <div className="scroll">
              {!selected ? (
                <div className="emptyRight">Select an update to view details.</div>
              ) : (
                <div className="detailCard">
                  <div className="detailHeader">
                    <div>
                      <div className="detailTitle">{selected.title}</div>
                      <div className="detailMeta">
                        {selected.date ? <span>{selected.date}</span> : null}
                      </div>
                    </div>
                  </div>

                  {selected.tags?.length ? (
                    <div className="tagRow" style={{ marginTop: 10 }}>
                      {selected.tags.map((t) => (
                        <span key={t} className="tagChip">
                          {t}
                        </span>
                      ))}
                    </div>
                  ) : null}

                  {selected.body ? <div className="detailDesc">{selected.body}</div> : null}

                  {selected.link ? (
                    <div className="detailLinks">
                      <a className="pillBtn" href={selected.link} target="_blank" rel="noreferrer">
                        Learn more
                      </a>
                    </div>
                  ) : null}
                </div>
              )}
            </div>
          </section>
        ) : null}
      </div>

      {/* Mobile bottom tabs */}
      {isMobile ? (
        <div className="mobileTabs" role="tablist" aria-label="Updates view">
          <button
            type="button"
            className="mobileTab"
            data-active={mobileTab === "list" ? "true" : "false"}
            onClick={() => setMobileTab("list")}
          >
            List
          </button>
          <button
            type="button"
            className="mobileTab"
            data-active={mobileTab === "detail" ? "true" : "false"}
            onClick={() => setMobileTab("detail")}
          >
            Details
          </button>
        </div>
      ) : null}
    </div>
  );
}
