"use client";

import { useEffect, useMemo, useState } from "react";
import { useSmoothWheel } from "@/app/components/useSmoothWheel";
import { useRouter, useSearchParams, usePathname } from "next/navigation";

export type UpdateLite = {
  id: string;
  title: string;
  tags: string[];
  date?: string | null;
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
  useSmoothWheel(".scroll");
  const router = useRouter();
  const sp = useSearchParams();
  const pathname = usePathname();

  const q = sp.get("q") || "";
  const tag = sp.get("tag") || "";
  const selectedKey = sp.get("u") || "";

  const [isMobile, setIsMobile] = useState(false);
  const [filterOpen, setFilterOpen] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(max-width: 980px)");
    const apply = () => setIsMobile(mq.matches);
    apply();
    mq.addEventListener("change", apply);
    return () => mq.removeEventListener("change", apply);
  }, []);

  useEffect(() => {
    if (!isMobile) setFilterOpen(false);
  }, [isMobile]);

  function setParam(key: string, value: string | null) {
    const params = new URLSearchParams(sp.toString());
    if (!value) params.delete(key);
    else params.set(key, value);
    const qs = params.toString();
    router.push(qs ? `/updates?${qs}` : "/updates");
  }

  function setSelected(id: string) {
    setParam("u", id);
  }

  function clearSelected() {
    setParam("u", null);
  }

  const tags = useMemo(() => {
    const s = new Set<string>();
    for (const u of updates) {
      for (const t of u.tags || []) {
        const tt = (t || "").trim();
        if (tt) s.add(tt);
      }
    }
    return Array.from(s).sort((a, b) => a.localeCompare(b));
  }, [updates]);

  const filtered = useMemo(() => {
    const nq = norm(q);
    const nt = norm(tag);
    return updates.filter((u) => {
      if (nt) {
        const utags = (u.tags || []).map((t) => norm(t));
        if (!utags.includes(nt)) return false;
      }
      if (!nq) return true;
      const hay = norm([u.title, ...(u.tags || []), u.body || ""].join(" "));
      return hay.includes(nq);
    });
  }, [updates, q, tag]);

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
  const detailFlashKey = selected?.id ?? selected?.title ?? selected?.date ?? "detail";
  const mobileDetailOpen = isMobile && Boolean(selectedMobile);

  return (
    <div className="pageShell">
      <div className="tagline">Updates, openings, menu changes, PSAs, and quick announcements.</div>

      <div className="split">
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
                {isMobile ? (
                  <div className="searchRow">
                    <input
                      className="searchInput"
                      placeholder="Search updates…"
                      value={q}
                      onChange={(e) => setParam("q", e.target.value)}
                      aria-label="Search updates"
                    />
                    <button
                      type="button"
                      className="filterBtn"
                      aria-label={filterOpen ? "Close filters" : "Open filters"}
                      aria-expanded={filterOpen ? "true" : "false"}
                      onClick={() => setFilterOpen((v) => !v)}
                    >
                      Filter
                    </button>
                  </div>
                ) : (
                  <>
                    <input
                      className="searchInput"
                      placeholder="Search updates…"
                      value={q}
                      onChange={(e) => setParam("q", e.target.value)}
                      aria-label="Search updates"
                    />
                    {q || tag ? (
                      <button
                        className="clearBtn"
                        type="button"
                        onClick={() => {
                          setParam("q", null);
                          setParam("tag", null);
                        }}
                      >
                        Clear
                      </button>
                    ) : null}
                  </>
                )}
              </div>

              {!isMobile ? (
                <div className="typePills" role="group" aria-label="Update filters">
                  <button
                    type="button"
                    className="typePill"
                    data-active={!tag ? "true" : "false"}
                    onClick={() => setParam("tag", null)}
                  >
                    All
                  </button>
                  {tags.map((t) => {
                    const on = norm(tag) === norm(t);
                    return (
                      <button
                        key={t}
                        type="button"
                        className="typePill"
                        data-active={on ? "true" : "false"}
                        onClick={() => setParam("tag", on ? null : t)}
                      >
                        {t}
                      </button>
                    );
                  })}
                </div>
              ) : null}

              {isMobile && filterOpen ? (
                <div
                  className="filterOverlay"
                  role="dialog"
                  aria-modal="true"
                  aria-label="Filters"
                  onClick={() => setFilterOpen(false)}
                >
                  <div className="filterOverlayPanel" onClick={(e) => e.stopPropagation()}>
                    <div className="filterOverlayHeader">
                      <div className="filterOverlayTitle">Filters</div>
                      <button
                        type="button"
                        className="filterOverlayClose"
                        onClick={() => setFilterOpen(false)}
                        aria-label="Close filters"
                      >
                        ✕
                      </button>
                    </div>

                    {q || tag ? (
                      <button
                        type="button"
                        className="filterOverlayClear"
                        onClick={() => {
                          setParam("q", null);
                          setParam("tag", null);
                          setFilterOpen(false);
                        }}
                      >
                        Clear search & filters
                      </button>
                    ) : null}

                    <div className="typePills" role="group" aria-label="Update filters">
                      <button
                        type="button"
                        className="typePill"
                        data-active={!tag ? "true" : "false"}
                        onClick={() => {
                          setParam("tag", null);
                          setFilterOpen(false);
                        }}
                      >
                        All
                      </button>
                      {tags.map((t) => {
                        const on = norm(tag) === norm(t);
                        return (
                          <button
                            key={t}
                            type="button"
                            className="typePill"
                            data-active={on ? "true" : "false"}
                            onClick={() => {
                              setParam("tag", on ? null : t);
                              setFilterOpen(false);
                            }}
                          >
                            {t}
                          </button>
                        );
                      })}
                    </div>
                  </div>
                </div>
              ) : null}
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
                      <span className="eventRowMeta">{u.date ? <span>{u.date}</span> : null}</span>
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

        {!isMobile ? (
          <section className="pane paneRight">
            <div className="scroll">
              {!selectedDesktop ? (
                <div className="emptyRight">Select an update to view details.</div>
              ) : (
                <div key={detailFlashKey} className="detailCard detailFlash">
                  <div className="detailHeader">
                    <div>
                      <div className="detailTitle fadeInItem" style={{ animationDelay: "260ms" }}>
                        {selectedDesktop.title}
                      </div>
                      <div className="detailMeta fadeInItem" style={{ animationDelay: "320ms" }}>
                        {selectedDesktop.date ? <span>{selectedDesktop.date}</span> : null}
                      </div>
                    </div>
                  </div>

                  {selectedDesktop.tags?.length ? (
                    <div className="tagRow" style={{ marginTop: 10 }}>
                      {selectedDesktop.tags.map((t) => (
                        <span key={t} className="tagChip">
                          {t}
                        </span>
                      ))}
                    </div>
                  ) : null}

                  {selectedDesktop.body ? (
                    <div className="detailDesc fadeInItem" style={{ animationDelay: "360ms" }}>
                      {selectedDesktop.body}
                    </div>
                  ) : null}

                  {selectedDesktop.link ? (
                    <div className="detailLinks">
                      <a className="pillBtn" href={selectedDesktop.link} target="_blank" rel="noreferrer">
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

      {isMobile ? (
        <div className="mobileTabs" aria-label="Primary navigation">
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
      ) : null}

      <div className="mobileDetail" data-open={mobileDetailOpen ? "true" : "false"} aria-hidden={!mobileDetailOpen}>
        <div className="mobileDetailHeader">
          <button className="backBtn" type="button" onClick={clearSelected}>
            Back
          </button>
          <div className="mobileDetailTitle">Update</div>
        </div>
        <div className="scroll" style={{ padding: "0 16px 84px 16px" }}>
          {selectedMobile ? (
            <div key={detailFlashKey} className="detailCard detailFlash">
              <div className="detailHeader">
                <div>
                  <div className="detailTitle fadeInItem" style={{ animationDelay: "260ms" }}>
                    {selectedMobile.title}
                  </div>
                  <div className="detailMeta fadeInItem" style={{ animationDelay: "320ms" }}>
                    {selectedMobile.date ? <span>{selectedMobile.date}</span> : null}
                  </div>
                </div>
              </div>

              {selectedMobile.tags?.length ? (
                <div className="tagRow" style={{ marginTop: 10 }}>
                  {selectedMobile.tags.map((t) => (
                    <span key={t} className="tagChip">
                      {t}
                    </span>
                  ))}
                </div>
              ) : null}

              {selectedMobile.body ? (
                <div className="detailDesc fadeInItem" style={{ animationDelay: "360ms" }}>
                  {selectedMobile.body}
                </div>
              ) : null}

              {selectedMobile.link ? (
                <div className="detailLinks">
                  <a className="pillBtn" href={selectedMobile.link} target="_blank" rel="noreferrer">
                    Learn more
                  </a>
                </div>
              ) : null}
            </div>
          ) : null}
        </div>
      </div>
    </div>
  );
}
