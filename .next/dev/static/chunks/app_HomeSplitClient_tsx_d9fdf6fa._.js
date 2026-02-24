(globalThis.TURBOPACK || (globalThis.TURBOPACK = [])).push([typeof document === "object" ? document.currentScript : undefined,
"[project]/app/HomeSplitClient.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>HomeSplitClient
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/navigation.js [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
"use client";
;
;
const WEEKLY_KEY = "__weekly__";
function norm(v) {
    return (v || "").toLowerCase().trim();
}
function safeDateFromEvent(e) {
    const raw = e.start_datetime || e.end_datetime;
    if (!raw) return null;
    const d = new Date(raw);
    return Number.isNaN(d.getTime()) ? null : d;
}
function startOfToday() {
    const d = new Date();
    d.setHours(0, 0, 0, 0);
    return d;
}
function endOfSundayFromToday() {
    const today = startOfToday();
    const day = today.getDay(); // 0=Sun..6=Sat
    const daysUntilSunday = (7 - day) % 7;
    const end = new Date(today);
    end.setDate(today.getDate() + daysUntilSunday);
    end.setHours(23, 59, 59, 999);
    return end;
}
function startOfDay(d) {
    const x = new Date(d);
    x.setHours(0, 0, 0, 0);
    return x;
}
function dayKey(d) {
    const y = d.getFullYear();
    const m = String(d.getMonth() + 1).padStart(2, "0");
    const dd = String(d.getDate()).padStart(2, "0");
    return `${y}-${m}-${dd}`;
}
function formatDayHeading(d) {
    return d.toLocaleDateString(undefined, {
        weekday: "long",
        month: "short",
        day: "numeric"
    });
}
function formatTimeLabel(d) {
    return d.toLocaleString(undefined, {
        weekday: "short",
        month: "short",
        day: "numeric",
        hour: "numeric",
        minute: "2-digit"
    });
}
function formatTimeShort(d) {
    return d.toLocaleTimeString(undefined, {
        hour: "numeric",
        minute: "2-digit"
    });
}
// eslint-disable-next-line @typescript-eslint/no-explicit-any
function pickImageUrl(e) {
    if (!e) return null;
    // normalized keys
    if (typeof e.imageUrl === "string" && e.imageUrl) return e.imageUrl;
    if (typeof e.image_url === "string" && e.image_url) return e.image_url;
    // raw prismic-ish image field
    const img = e.image;
    if (img) {
        if (typeof img.url === "string" && img.url) return img.url;
        const square = img.Square || img.square;
        if (square?.url) return square.url;
        const thumbs = img.thumbnails || img.variants;
        if (thumbs?.Square?.url) return thumbs.Square.url;
        if (thumbs?.square?.url) return thumbs.square.url;
    }
    return null;
}
function pickDescriptionText(e) {
    if (e.descriptionText) return e.descriptionText;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const d = e.description;
    if (!d) return null;
    if (typeof d === "string") return d;
    // very lightweight rich text fallback (avoid prismic runtime dependency here)
    if (Array.isArray(d)) {
        const parts = d.map((b)=>typeof b?.text === "string" ? b.text : "").filter(Boolean);
        return parts.length ? parts.join("\n\n") : null;
    }
    return null;
}
function HomeSplitClient({ events }) {
    _s();
    const router = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRouter"])();
    const sp = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useSearchParams"])();
    const pathname = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["usePathname"])();
    const q = sp.get("q") || "";
    const type = sp.get("type") || "";
    // default selection = weekly overview
    const selectedParam = sp.get("event");
    // URL drives selection, but on mobile we keep an optimistic client key so the
    // detail panel can update immediately on tap (before the router finishes).
    const [clientSelectedKey, setClientSelectedKey] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const selectedKey = clientSelectedKey ?? selectedParam ?? WEEKLY_KEY;
    // Initialize from matchMedia so the first tap on mobile reliably opens detail.
    const [mounted, setMounted] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    // Hydration-safe: start false so SSR and first client render match.
    const [isMobile, setIsMobile] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "HomeSplitClient.useEffect": ()=>{
            setMounted(true);
            const mq = window.matchMedia("(max-width: 980px)");
            const apply = {
                "HomeSplitClient.useEffect.apply": ()=>setIsMobile(mq.matches)
            }["HomeSplitClient.useEffect.apply"];
            apply();
            // Safari < 14 uses addListener/removeListener
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            const anyMq = mq;
            if (mq.addEventListener) mq.addEventListener("change", apply);
            else if (anyMq.addListener) anyMq.addListener(apply);
            return ({
                "HomeSplitClient.useEffect": ()=>{
                    if (mq.removeEventListener) mq.removeEventListener("change", apply);
                    else if (anyMq.removeListener) anyMq.removeListener(apply);
                }
            })["HomeSplitClient.useEffect"];
        }
    }["HomeSplitClient.useEffect"], []);
    // Keep the optimistic client key in sync with the URL when navigation completes.
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "HomeSplitClient.useEffect": ()=>{
            setClientSelectedKey(selectedParam);
        }
    }["HomeSplitClient.useEffect"], [
        selectedParam
    ]);
    function isMobileNow() {
        if ("TURBOPACK compile-time falsy", 0) //TURBOPACK unreachable
        ;
        return window.matchMedia("(max-width: 980px)").matches;
    }
    function setParam(key, value) {
        const params = new URLSearchParams(sp.toString());
        if (!value) params.delete(key);
        else params.set(key, value);
        router.push(`/?${params.toString()}`);
    }
    const eventTypes = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMemo"])({
        "HomeSplitClient.useMemo[eventTypes]": ()=>{
            const set = new Set();
            for (const e of events)if (e.event_type) set.add(e.event_type);
            return Array.from(set).sort({
                "HomeSplitClient.useMemo[eventTypes]": (a, b)=>a.localeCompare(b)
            }["HomeSplitClient.useMemo[eventTypes]"]);
        }
    }["HomeSplitClient.useMemo[eventTypes]"], [
        events
    ]);
    const filteredEvents = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMemo"])({
        "HomeSplitClient.useMemo[filteredEvents]": ()=>{
            const nq = norm(q);
            const nt = norm(type);
            return events.filter({
                "HomeSplitClient.useMemo[filteredEvents]": (e)=>{
                    const hay = norm([
                        e.title ?? "",
                        e.summary ?? "",
                        e.locationName ?? "",
                        e.address ?? "",
                        e.event_type ?? ""
                    ].filter(Boolean).join(" "));
                    const matchesSearch = !nq || hay.includes(nq);
                    const matchesType = !nt || norm(e.event_type ?? "") === nt;
                    return matchesSearch && matchesType;
                }
            }["HomeSplitClient.useMemo[filteredEvents]"]);
        }
    }["HomeSplitClient.useMemo[filteredEvents]"], [
        events,
        q,
        type
    ]);
    const leftDayGroups = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMemo"])({
        "HomeSplitClient.useMemo[leftDayGroups]": ()=>{
            const map = new Map();
            for (const e of filteredEvents){
                const d = safeDateFromEvent(e);
                if (!d) continue;
                const dk = dayKey(d);
                if (!map.has(dk)) map.set(dk, {
                    date: startOfDay(d),
                    items: []
                });
                map.get(dk).items.push(e);
            }
            const groups = Array.from(map.values()).sort({
                "HomeSplitClient.useMemo[leftDayGroups].groups": (a, b)=>a.date.getTime() - b.date.getTime()
            }["HomeSplitClient.useMemo[leftDayGroups].groups"]);
            for (const g of groups){
                g.items.sort({
                    "HomeSplitClient.useMemo[leftDayGroups]": (a, b)=>{
                        const da = safeDateFromEvent(a)?.getTime() ?? 0;
                        const db = safeDateFromEvent(b)?.getTime() ?? 0;
                        return da - db;
                    }
                }["HomeSplitClient.useMemo[leftDayGroups]"]);
            }
            return groups;
        }
    }["HomeSplitClient.useMemo[leftDayGroups]"], [
        filteredEvents
    ]);
    const weeklyRange = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMemo"])({
        "HomeSplitClient.useMemo[weeklyRange]": ()=>{
            const start = startOfToday();
            const end = endOfSundayFromToday();
            return {
                start,
                end
            };
        }
    }["HomeSplitClient.useMemo[weeklyRange]"], []);
    const weekEvents = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMemo"])({
        "HomeSplitClient.useMemo[weekEvents]": ()=>{
            const { start, end } = weeklyRange;
            return filteredEvents.map({
                "HomeSplitClient.useMemo[weekEvents]": (e)=>({
                        e,
                        d: safeDateFromEvent(e)
                    })
            }["HomeSplitClient.useMemo[weekEvents]"]).filter({
                "HomeSplitClient.useMemo[weekEvents]": ({ d })=>d && d.getTime() >= start.getTime() && d.getTime() <= end.getTime()
            }["HomeSplitClient.useMemo[weekEvents]"]).sort({
                "HomeSplitClient.useMemo[weekEvents]": (a, b)=>a.d.getTime() - b.d.getTime()
            }["HomeSplitClient.useMemo[weekEvents]"]).map({
                "HomeSplitClient.useMemo[weekEvents]": ({ e })=>e
            }["HomeSplitClient.useMemo[weekEvents]"]);
        }
    }["HomeSplitClient.useMemo[weekEvents]"], [
        filteredEvents,
        weeklyRange
    ]);
    const weekEventsCount = weekEvents.length;
    const weekLabel = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMemo"])({
        "HomeSplitClient.useMemo[weekLabel]": ()=>{
            const fmt = {
                "HomeSplitClient.useMemo[weekLabel].fmt": (d)=>{
                    const m = d.getMonth() + 1;
                    const day = d.getDate();
                    const yy = String(d.getFullYear()).slice(-2);
                    return `${m}/${day}/${yy}`;
                }
            }["HomeSplitClient.useMemo[weekLabel].fmt"];
            return `${fmt(weeklyRange.start)} to ${fmt(weeklyRange.end)}`;
        }
    }["HomeSplitClient.useMemo[weekLabel]"], [
        weeklyRange
    ]);
    const weekInsights = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMemo"])({
        "HomeSplitClient.useMemo[weekInsights]": ()=>{
            const buckets = {
                "Live music": 0,
                "Food & drink": 0,
                "Community": 0,
                "Other": 0
            };
            for (const e of weekEvents){
                const t = (e.event_type || "").toLowerCase();
                if (t.includes("music") || t.includes("concert") || t.includes("show")) buckets["Live music"]++;
                else if (t.includes("food") || t.includes("drink") || t.includes("dining") || t.includes("menu")) buckets["Food & drink"]++;
                else if (t.includes("community") || t.includes("market") || t.includes("fundraiser") || t.includes("family")) buckets["Community"]++;
                else buckets["Other"]++;
            }
            return buckets;
        }
    }["HomeSplitClient.useMemo[weekInsights]"], [
        weekEvents
    ]);
    const weekGroups = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMemo"])({
        "HomeSplitClient.useMemo[weekGroups]": ()=>{
            const map = new Map();
            for (const e of weekEvents){
                const d = safeDateFromEvent(e);
                if (!d) continue;
                const dk = dayKey(d);
                if (!map.has(dk)) map.set(dk, {
                    date: startOfDay(d),
                    items: []
                });
                map.get(dk).items.push(e);
            }
            const groups = Array.from(map.values()).sort({
                "HomeSplitClient.useMemo[weekGroups].groups": (a, b)=>a.date.getTime() - b.date.getTime()
            }["HomeSplitClient.useMemo[weekGroups].groups"]);
            for (const g of groups){
                g.items.sort({
                    "HomeSplitClient.useMemo[weekGroups]": (a, b)=>{
                        const da = safeDateFromEvent(a)?.getTime() ?? 0;
                        const db = safeDateFromEvent(b)?.getTime() ?? 0;
                        return da - db;
                    }
                }["HomeSplitClient.useMemo[weekGroups]"]);
            }
            return groups;
        }
    }["HomeSplitClient.useMemo[weekGroups]"], [
        weekEvents
    ]);
    const selectedEvent = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMemo"])({
        "HomeSplitClient.useMemo[selectedEvent]": ()=>{
            if (!filteredEvents.length) return null;
            if (selectedKey === WEEKLY_KEY) return null;
            const byUid = selectedKey && filteredEvents.find({
                "HomeSplitClient.useMemo[selectedEvent]": (e)=>e.uid && e.uid === selectedKey
            }["HomeSplitClient.useMemo[selectedEvent]"]);
            const byId = selectedKey && filteredEvents.find({
                "HomeSplitClient.useMemo[selectedEvent]": (e)=>e.id === selectedKey
            }["HomeSplitClient.useMemo[selectedEvent]"]);
            return byUid || byId || null;
        }
    }["HomeSplitClient.useMemo[selectedEvent]"], [
        filteredEvents,
        selectedKey
    ]);
    // stagger counter for left list
    let listAnimIndex = 0;
    const effectiveIsMobile = mounted ? isMobile : false;
    const showLeft = true;
    // Desktop shows the split detail pane; mobile uses an overlay for details.
    const showRight = !effectiveIsMobile;
    // Right pane content helpers
    const selectedImg = selectedEvent ? pickImageUrl(selectedEvent) : null;
    const selectedDesc = selectedEvent ? pickDescriptionText(selectedEvent) : null;
    const selectedTime = selectedEvent ? (()=>{
        const d = safeDateFromEvent(selectedEvent);
        return d ? formatTimeLabel(d) : "Time TBD";
    })() : null;
    const mobileDetailOpen = effectiveIsMobile && selectedKey !== WEEKLY_KEY && !!selectedEvent;
    function clearSelected() {
        setClientSelectedKey(null);
        setParam("event", null);
    }
    function openSelected(key) {
        setClientSelectedKey(key);
        setParam("event", key);
    }
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "pageShell",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "tagline",
                children: "A calendar of events, specials, and pop-ups in Lancaster, PA."
            }, void 0, false, {
                fileName: "[project]/app/HomeSplitClient.tsx",
                lineNumber: 373,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "split",
                children: [
                    ("TURBOPACK compile-time truthy", 1) ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("aside", {
                        className: "pane paneLeft",
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "scroll",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "leftSticky",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "tabs",
                                            "aria-label": "Primary navigation",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                    type: "button",
                                                    className: "tabBtn",
                                                    "data-active": pathname === "/" ? "true" : "false",
                                                    onClick: ()=>router.push("/"),
                                                    children: "Calendar"
                                                }, void 0, false, {
                                                    fileName: "[project]/app/HomeSplitClient.tsx",
                                                    lineNumber: 381,
                                                    columnNumber: 19
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                    type: "button",
                                                    className: "tabBtn",
                                                    "data-active": pathname?.startsWith("/locations") ? "true" : "false",
                                                    onClick: ()=>router.push("/locations"),
                                                    children: "Directory"
                                                }, void 0, false, {
                                                    fileName: "[project]/app/HomeSplitClient.tsx",
                                                    lineNumber: 389,
                                                    columnNumber: 19
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                    type: "button",
                                                    className: "tabBtn",
                                                    "data-active": pathname?.startsWith("/updates") ? "true" : "false",
                                                    onClick: ()=>router.push("/updates"),
                                                    children: "Updates"
                                                }, void 0, false, {
                                                    fileName: "[project]/app/HomeSplitClient.tsx",
                                                    lineNumber: 397,
                                                    columnNumber: 19
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/app/HomeSplitClient.tsx",
                                            lineNumber: 380,
                                            columnNumber: 17
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "leftControls",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                                    className: "searchInput",
                                                    placeholder: "Search events…",
                                                    value: q,
                                                    onChange: (e)=>setParam("q", e.target.value)
                                                }, void 0, false, {
                                                    fileName: "[project]/app/HomeSplitClient.tsx",
                                                    lineNumber: 408,
                                                    columnNumber: 19
                                                }, this),
                                                q || type ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                    className: "clearBtn",
                                                    onClick: ()=>{
                                                        setParam("q", null);
                                                        setParam("type", null);
                                                    },
                                                    type: "button",
                                                    children: "Clear"
                                                }, void 0, false, {
                                                    fileName: "[project]/app/HomeSplitClient.tsx",
                                                    lineNumber: 414,
                                                    columnNumber: 21
                                                }, this) : null
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/app/HomeSplitClient.tsx",
                                            lineNumber: 407,
                                            columnNumber: 17
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "typePills",
                                            role: "group",
                                            "aria-label": "Event type filters",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                    type: "button",
                                                    className: "typePill",
                                                    "data-active": !type ? "true" : "false",
                                                    onClick: ()=>setParam("type", null),
                                                    children: "All"
                                                }, void 0, false, {
                                                    fileName: "[project]/app/HomeSplitClient.tsx",
                                                    lineNumber: 428,
                                                    columnNumber: 19
                                                }, this),
                                                eventTypes.map((t)=>{
                                                    const on = norm(type) === norm(t);
                                                    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                        type: "button",
                                                        className: "typePill",
                                                        "data-active": on ? "true" : "false",
                                                        onClick: ()=>setParam("type", on ? null : t),
                                                        children: t
                                                    }, t, false, {
                                                        fileName: "[project]/app/HomeSplitClient.tsx",
                                                        lineNumber: 439,
                                                        columnNumber: 23
                                                    }, this);
                                                })
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/app/HomeSplitClient.tsx",
                                            lineNumber: 427,
                                            columnNumber: 17
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/app/HomeSplitClient.tsx",
                                    lineNumber: 379,
                                    columnNumber: 15
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                    type: "button",
                                    className: "weeklyOverview fadeInItem",
                                    style: {
                                        animationDelay: `${listAnimIndex++ * 35}ms`
                                    },
                                    "data-active": selectedKey === WEEKLY_KEY ? "true" : "false",
                                    onClick: ()=>{
                                        setClientSelectedKey(WEEKLY_KEY);
                                        setParam("event", WEEKLY_KEY);
                                    },
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "weeklyTitle",
                                            children: "Weekly Overview"
                                        }, void 0, false, {
                                            fileName: "[project]/app/HomeSplitClient.tsx",
                                            lineNumber: 465,
                                            columnNumber: 17
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "weeklyCount",
                                            children: [
                                                weekEventsCount,
                                                " event",
                                                weekEventsCount === 1 ? "" : "s",
                                                " left this week"
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/app/HomeSplitClient.tsx",
                                            lineNumber: 466,
                                            columnNumber: 17
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/app/HomeSplitClient.tsx",
                                    lineNumber: 454,
                                    columnNumber: 15
                                }, this),
                                leftDayGroups.length === 0 ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "emptyList",
                                    children: "No events match your search."
                                }, void 0, false, {
                                    fileName: "[project]/app/HomeSplitClient.tsx",
                                    lineNumber: 473,
                                    columnNumber: 17
                                }, this) : null,
                                leftDayGroups.map((g)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("section", {
                                        className: "dayBlock",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "dayTitle",
                                                children: formatDayHeading(g.date)
                                            }, void 0, false, {
                                                fileName: "[project]/app/HomeSplitClient.tsx",
                                                lineNumber: 479,
                                                columnNumber: 19
                                            }, this),
                                            g.items.map((e)=>{
                                                const active = selectedEvent?.id === e.id || selectedEvent?.uid && e.uid && selectedEvent.uid === e.uid;
                                                const title = e.title || "Untitled event";
                                                const d = safeDateFromEvent(e);
                                                const timeLabel = d ? formatTimeLabel(d) : "Time TBD";
                                                return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                    className: "eventRow fadeInItem",
                                                    style: {
                                                        animationDelay: `${listAnimIndex++ * 35}ms`
                                                    },
                                                    "data-active": active ? "true" : "false",
                                                    onClick: ()=>{
                                                        const key = e.uid ?? e.id;
                                                        setClientSelectedKey(key);
                                                        setParam("event", key);
                                                    },
                                                    type: "button",
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                            className: "eventRowTitle",
                                                            children: title
                                                        }, void 0, false, {
                                                            fileName: "[project]/app/HomeSplitClient.tsx",
                                                            lineNumber: 504,
                                                            columnNumber: 25
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                            className: "eventRowMeta",
                                                            children: [
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                    children: timeLabel
                                                                }, void 0, false, {
                                                                    fileName: "[project]/app/HomeSplitClient.tsx",
                                                                    lineNumber: 506,
                                                                    columnNumber: 27
                                                                }, this),
                                                                e.event_type ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                    className: "dot",
                                                                    children: "•"
                                                                }, void 0, false, {
                                                                    fileName: "[project]/app/HomeSplitClient.tsx",
                                                                    lineNumber: 507,
                                                                    columnNumber: 43
                                                                }, this) : null,
                                                                e.event_type ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                    children: e.event_type
                                                                }, void 0, false, {
                                                                    fileName: "[project]/app/HomeSplitClient.tsx",
                                                                    lineNumber: 508,
                                                                    columnNumber: 43
                                                                }, this) : null
                                                            ]
                                                        }, void 0, true, {
                                                            fileName: "[project]/app/HomeSplitClient.tsx",
                                                            lineNumber: 505,
                                                            columnNumber: 25
                                                        }, this),
                                                        (()=>{
                                                            const raw = (e.summary ?? "") || (pickDescriptionText(e) ?? "");
                                                            const s = (raw || "").trim();
                                                            if (!s) return null;
                                                            return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                className: "eventRowDesc",
                                                                children: s.length > 180 ? `${s.slice(0, 180).trim()}…` : s
                                                            }, void 0, false, {
                                                                fileName: "[project]/app/HomeSplitClient.tsx",
                                                                lineNumber: 516,
                                                                columnNumber: 29
                                                            }, this);
                                                        })()
                                                    ]
                                                }, e.id, true, {
                                                    fileName: "[project]/app/HomeSplitClient.tsx",
                                                    lineNumber: 491,
                                                    columnNumber: 23
                                                }, this);
                                            })
                                        ]
                                    }, dayKey(g.date), true, {
                                        fileName: "[project]/app/HomeSplitClient.tsx",
                                        lineNumber: 478,
                                        columnNumber: 17
                                    }, this))
                            ]
                        }, void 0, true, {
                            fileName: "[project]/app/HomeSplitClient.tsx",
                            lineNumber: 378,
                            columnNumber: 13
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/app/HomeSplitClient.tsx",
                        lineNumber: 377,
                        columnNumber: 11
                    }, this) : "TURBOPACK unreachable",
                    showRight ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("main", {
                        className: "pane paneRight",
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "scroll",
                            children: selectedKey === WEEKLY_KEY ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "rightHeader",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "rightDayLabel",
                                        children: "Weekly Overview"
                                    }, void 0, false, {
                                        fileName: "[project]/app/HomeSplitClient.tsx",
                                        lineNumber: 539,
                                        columnNumber: 19
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "weekSummary",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                                className: "weekSummaryTitle",
                                                children: [
                                                    "Week of ",
                                                    weekLabel
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/app/HomeSplitClient.tsx",
                                                lineNumber: 542,
                                                columnNumber: 21
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                className: "weekSummarySubhead",
                                                children: "A quick snapshot of what's happening on the calendar this week."
                                            }, void 0, false, {
                                                fileName: "[project]/app/HomeSplitClient.tsx",
                                                lineNumber: 543,
                                                columnNumber: 21
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "weekSummaryGrid",
                                                role: "list",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        className: "weekSummaryCard",
                                                        role: "listitem",
                                                        children: [
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                className: "weekSummaryKicker",
                                                                children: "Total events"
                                                            }, void 0, false, {
                                                                fileName: "[project]/app/HomeSplitClient.tsx",
                                                                lineNumber: 549,
                                                                columnNumber: 25
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                className: "weekSummaryValue",
                                                                children: weekEventsCount
                                                            }, void 0, false, {
                                                                fileName: "[project]/app/HomeSplitClient.tsx",
                                                                lineNumber: 550,
                                                                columnNumber: 25
                                                            }, this)
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/app/HomeSplitClient.tsx",
                                                        lineNumber: 548,
                                                        columnNumber: 23
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        className: "weekSummaryCard",
                                                        role: "listitem",
                                                        children: [
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                className: "weekSummaryKicker",
                                                                children: "Live music"
                                                            }, void 0, false, {
                                                                fileName: "[project]/app/HomeSplitClient.tsx",
                                                                lineNumber: 553,
                                                                columnNumber: 25
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                className: "weekSummaryValue",
                                                                children: weekInsights["Live music"]
                                                            }, void 0, false, {
                                                                fileName: "[project]/app/HomeSplitClient.tsx",
                                                                lineNumber: 554,
                                                                columnNumber: 25
                                                            }, this)
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/app/HomeSplitClient.tsx",
                                                        lineNumber: 552,
                                                        columnNumber: 23
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        className: "weekSummaryCard",
                                                        role: "listitem",
                                                        children: [
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                className: "weekSummaryKicker",
                                                                children: "Food & drink"
                                                            }, void 0, false, {
                                                                fileName: "[project]/app/HomeSplitClient.tsx",
                                                                lineNumber: 557,
                                                                columnNumber: 25
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                className: "weekSummaryValue",
                                                                children: weekInsights["Food & drink"]
                                                            }, void 0, false, {
                                                                fileName: "[project]/app/HomeSplitClient.tsx",
                                                                lineNumber: 558,
                                                                columnNumber: 25
                                                            }, this)
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/app/HomeSplitClient.tsx",
                                                        lineNumber: 556,
                                                        columnNumber: 23
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/app/HomeSplitClient.tsx",
                                                lineNumber: 547,
                                                columnNumber: 21
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/app/HomeSplitClient.tsx",
                                        lineNumber: 541,
                                        columnNumber: 19
                                    }, this),
                                    weekEventsCount === 0 ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "emptyRight",
                                        children: "No events scheduled for the rest of this week."
                                    }, void 0, false, {
                                        fileName: "[project]/app/HomeSplitClient.tsx",
                                        lineNumber: 565,
                                        columnNumber: 21
                                    }, this) : effectiveIsMobile ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "weeklyCondensed",
                                        "aria-label": "Weekly overview (condensed)",
                                        children: weekGroups.map((g)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        className: "weeklyCondensedDayTitle",
                                                        children: formatDayHeading(g.date)
                                                    }, void 0, false, {
                                                        fileName: "[project]/app/HomeSplitClient.tsx",
                                                        lineNumber: 570,
                                                        columnNumber: 27
                                                    }, this),
                                                    g.items.map((e)=>{
                                                        const title = e.title || "Untitled event";
                                                        const d = safeDateFromEvent(e);
                                                        const timeLabel = d ? formatTimeShort(d) : "Time TBD";
                                                        const venueBits = [
                                                            e.locationName,
                                                            e.event_type
                                                        ].filter(Boolean).join(" • ");
                                                        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                            type: "button",
                                                            className: "weeklyCondRow",
                                                            onClick: ()=>{
                                                                const key = e.uid ?? e.id;
                                                                setClientSelectedKey(key);
                                                                setParam("event", key);
                                                            },
                                                            children: [
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                    className: "weeklyCondTop",
                                                                    children: [
                                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                            className: "weeklyCondTime",
                                                                            children: timeLabel
                                                                        }, void 0, false, {
                                                                            fileName: "[project]/app/HomeSplitClient.tsx",
                                                                            lineNumber: 594,
                                                                            columnNumber: 35
                                                                        }, this),
                                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                            className: "weeklyCondTitle",
                                                                            children: title
                                                                        }, void 0, false, {
                                                                            fileName: "[project]/app/HomeSplitClient.tsx",
                                                                            lineNumber: 595,
                                                                            columnNumber: 35
                                                                        }, this)
                                                                    ]
                                                                }, void 0, true, {
                                                                    fileName: "[project]/app/HomeSplitClient.tsx",
                                                                    lineNumber: 593,
                                                                    columnNumber: 33
                                                                }, this),
                                                                venueBits ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                    className: "weeklyCondMeta",
                                                                    children: venueBits
                                                                }, void 0, false, {
                                                                    fileName: "[project]/app/HomeSplitClient.tsx",
                                                                    lineNumber: 598,
                                                                    columnNumber: 35
                                                                }, this) : null
                                                            ]
                                                        }, e.id, true, {
                                                            fileName: "[project]/app/HomeSplitClient.tsx",
                                                            lineNumber: 582,
                                                            columnNumber: 31
                                                        }, this);
                                                    })
                                                ]
                                            }, dayKey(g.date), true, {
                                                fileName: "[project]/app/HomeSplitClient.tsx",
                                                lineNumber: 569,
                                                columnNumber: 25
                                            }, this))
                                    }, void 0, false, {
                                        fileName: "[project]/app/HomeSplitClient.tsx",
                                        lineNumber: 567,
                                        columnNumber: 21
                                    }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "weeklyCards",
                                        children: weekGroups.map((g)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "weeklyDayGroup",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        className: "dayTitle",
                                                        children: formatDayHeading(g.date)
                                                    }, void 0, false, {
                                                        fileName: "[project]/app/HomeSplitClient.tsx",
                                                        lineNumber: 610,
                                                        columnNumber: 27
                                                    }, this),
                                                    g.items.map((e)=>{
                                                        const title = e.title || "Untitled event";
                                                        const d = safeDateFromEvent(e);
                                                        const timeLabel = d ? formatTimeLabel(d) : "Time TBD";
                                                        const img = pickImageUrl(e);
                                                        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                            type: "button",
                                                            className: "weeklyCard weeklyCardSelectable",
                                                            onClick: ()=>{
                                                                const key = e.uid ?? e.id;
                                                                setClientSelectedKey(key);
                                                                setParam("event", key);
                                                            },
                                                            children: [
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                    className: "weeklyCardMedia",
                                                                    children: img ? // eslint-disable-next-line @next/next/no-img-element
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("img", {
                                                                        className: "weeklyThumb",
                                                                        src: img,
                                                                        alt: ""
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/app/HomeSplitClient.tsx",
                                                                        lineNumber: 633,
                                                                        columnNumber: 37
                                                                    }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                        className: "weeklyThumbPlaceholder",
                                                                        "aria-hidden": true
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/app/HomeSplitClient.tsx",
                                                                        lineNumber: 635,
                                                                        columnNumber: 37
                                                                    }, this)
                                                                }, void 0, false, {
                                                                    fileName: "[project]/app/HomeSplitClient.tsx",
                                                                    lineNumber: 630,
                                                                    columnNumber: 33
                                                                }, this),
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                    className: "weeklyCardContent",
                                                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                        className: "weeklyCardTop",
                                                                        children: [
                                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                                className: "weeklyCardTitleWrap",
                                                                                children: [
                                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                                        className: "weeklyCardTitle",
                                                                                        children: title
                                                                                    }, void 0, false, {
                                                                                        fileName: "[project]/app/HomeSplitClient.tsx",
                                                                                        lineNumber: 642,
                                                                                        columnNumber: 39
                                                                                    }, this),
                                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                                        className: "weeklyCardTime",
                                                                                        children: timeLabel
                                                                                    }, void 0, false, {
                                                                                        fileName: "[project]/app/HomeSplitClient.tsx",
                                                                                        lineNumber: 643,
                                                                                        columnNumber: 39
                                                                                    }, this)
                                                                                ]
                                                                            }, void 0, true, {
                                                                                fileName: "[project]/app/HomeSplitClient.tsx",
                                                                                lineNumber: 641,
                                                                                columnNumber: 37
                                                                            }, this),
                                                                            e.tickets_url || e.website_url ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                                className: "weeklyCardActions",
                                                                                children: [
                                                                                    e.tickets_url ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("a", {
                                                                                        className: "weeklyMiniBtn",
                                                                                        href: e.tickets_url,
                                                                                        target: "_blank",
                                                                                        rel: "noreferrer",
                                                                                        onClick: (ev)=>ev.stopPropagation(),
                                                                                        children: "Tickets"
                                                                                    }, void 0, false, {
                                                                                        fileName: "[project]/app/HomeSplitClient.tsx",
                                                                                        lineNumber: 649,
                                                                                        columnNumber: 43
                                                                                    }, this) : null,
                                                                                    e.website_url ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("a", {
                                                                                        className: "weeklyMiniBtn",
                                                                                        href: e.website_url,
                                                                                        target: "_blank",
                                                                                        rel: "noreferrer",
                                                                                        onClick: (ev)=>ev.stopPropagation(),
                                                                                        children: "Website"
                                                                                    }, void 0, false, {
                                                                                        fileName: "[project]/app/HomeSplitClient.tsx",
                                                                                        lineNumber: 660,
                                                                                        columnNumber: 43
                                                                                    }, this) : null
                                                                                ]
                                                                            }, void 0, true, {
                                                                                fileName: "[project]/app/HomeSplitClient.tsx",
                                                                                lineNumber: 647,
                                                                                columnNumber: 39
                                                                            }, this) : null
                                                                        ]
                                                                    }, void 0, true, {
                                                                        fileName: "[project]/app/HomeSplitClient.tsx",
                                                                        lineNumber: 640,
                                                                        columnNumber: 35
                                                                    }, this)
                                                                }, void 0, false, {
                                                                    fileName: "[project]/app/HomeSplitClient.tsx",
                                                                    lineNumber: 639,
                                                                    columnNumber: 33
                                                                }, this)
                                                            ]
                                                        }, e.id, true, {
                                                            fileName: "[project]/app/HomeSplitClient.tsx",
                                                            lineNumber: 619,
                                                            columnNumber: 31
                                                        }, this);
                                                    })
                                                ]
                                            }, dayKey(g.date), true, {
                                                fileName: "[project]/app/HomeSplitClient.tsx",
                                                lineNumber: 609,
                                                columnNumber: 25
                                            }, this))
                                    }, void 0, false, {
                                        fileName: "[project]/app/HomeSplitClient.tsx",
                                        lineNumber: 607,
                                        columnNumber: 21
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/app/HomeSplitClient.tsx",
                                lineNumber: 538,
                                columnNumber: 17
                            }, this) : !selectedEvent ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "emptyRight",
                                children: "Select an event."
                            }, void 0, false, {
                                fileName: "[project]/app/HomeSplitClient.tsx",
                                lineNumber: 683,
                                columnNumber: 17
                            }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "rightHeader",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "rightDayLabel",
                                        children: selectedEvent.event_type || "Event"
                                    }, void 0, false, {
                                        fileName: "[project]/app/HomeSplitClient.tsx",
                                        lineNumber: 686,
                                        columnNumber: 19
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h1", {
                                        className: "detailTitle",
                                        children: selectedEvent.title || "Untitled event"
                                    }, void 0, false, {
                                        fileName: "[project]/app/HomeSplitClient.tsx",
                                        lineNumber: 688,
                                        columnNumber: 19
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "detailMeta",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                children: selectedTime
                                            }, void 0, false, {
                                                fileName: "[project]/app/HomeSplitClient.tsx",
                                                lineNumber: 691,
                                                columnNumber: 21
                                            }, this),
                                            selectedEvent.locationName ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Fragment"], {
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                        className: "dot",
                                                        children: "•"
                                                    }, void 0, false, {
                                                        fileName: "[project]/app/HomeSplitClient.tsx",
                                                        lineNumber: 694,
                                                        columnNumber: 25
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                        className: "venue",
                                                        children: selectedEvent.locationName
                                                    }, void 0, false, {
                                                        fileName: "[project]/app/HomeSplitClient.tsx",
                                                        lineNumber: 695,
                                                        columnNumber: 25
                                                    }, this)
                                                ]
                                            }, void 0, true) : null,
                                            selectedEvent.address ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Fragment"], {
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                        className: "dot",
                                                        children: "•"
                                                    }, void 0, false, {
                                                        fileName: "[project]/app/HomeSplitClient.tsx",
                                                        lineNumber: 700,
                                                        columnNumber: 25
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                        className: "muted",
                                                        children: selectedEvent.address
                                                    }, void 0, false, {
                                                        fileName: "[project]/app/HomeSplitClient.tsx",
                                                        lineNumber: 701,
                                                        columnNumber: 25
                                                    }, this)
                                                ]
                                            }, void 0, true) : null
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/app/HomeSplitClient.tsx",
                                        lineNumber: 690,
                                        columnNumber: 19
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "heroImage",
                                        style: selectedImg ? {
                                            backgroundImage: `url(${selectedImg})`
                                        } : undefined
                                    }, void 0, false, {
                                        fileName: "[project]/app/HomeSplitClient.tsx",
                                        lineNumber: 707,
                                        columnNumber: 19
                                    }, this),
                                    selectedEvent.summary ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                        className: "summary",
                                        children: selectedEvent.summary
                                    }, void 0, false, {
                                        fileName: "[project]/app/HomeSplitClient.tsx",
                                        lineNumber: 712,
                                        columnNumber: 44
                                    }, this) : null,
                                    selectedDesc ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "detailBody",
                                        children: selectedDesc
                                    }, void 0, false, {
                                        fileName: "[project]/app/HomeSplitClient.tsx",
                                        lineNumber: 714,
                                        columnNumber: 35
                                    }, this) : null,
                                    selectedEvent.website_url || selectedEvent.tickets_url ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "ctaRow",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("a", {
                                                className: "ctaBtn",
                                                "data-disabled": selectedEvent.website_url ? "false" : "true",
                                                href: selectedEvent.website_url || "#",
                                                target: selectedEvent.website_url ? "_blank" : undefined,
                                                rel: selectedEvent.website_url ? "noreferrer" : undefined,
                                                onClick: (ev)=>{
                                                    if (!selectedEvent.website_url) ev.preventDefault();
                                                },
                                                children: "Website"
                                            }, void 0, false, {
                                                fileName: "[project]/app/HomeSplitClient.tsx",
                                                lineNumber: 718,
                                                columnNumber: 23
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("a", {
                                                className: "ctaBtn",
                                                "data-disabled": selectedEvent.tickets_url ? "false" : "true",
                                                href: selectedEvent.tickets_url || "#",
                                                target: selectedEvent.tickets_url ? "_blank" : undefined,
                                                rel: selectedEvent.tickets_url ? "noreferrer" : undefined,
                                                onClick: (ev)=>{
                                                    if (!selectedEvent.tickets_url) ev.preventDefault();
                                                },
                                                children: "Tickets"
                                            }, void 0, false, {
                                                fileName: "[project]/app/HomeSplitClient.tsx",
                                                lineNumber: 731,
                                                columnNumber: 23
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/app/HomeSplitClient.tsx",
                                        lineNumber: 717,
                                        columnNumber: 21
                                    }, this) : null
                                ]
                            }, void 0, true, {
                                fileName: "[project]/app/HomeSplitClient.tsx",
                                lineNumber: 685,
                                columnNumber: 17
                            }, this)
                        }, void 0, false, {
                            fileName: "[project]/app/HomeSplitClient.tsx",
                            lineNumber: 535,
                            columnNumber: 13
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/app/HomeSplitClient.tsx",
                        lineNumber: 534,
                        columnNumber: 11
                    }, this) : null
                ]
            }, void 0, true, {
                fileName: "[project]/app/HomeSplitClient.tsx",
                lineNumber: 374,
                columnNumber: 7
            }, this),
            effectiveIsMobile ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "mobileTabs",
                "aria-label": "Primary navigation",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                        type: "button",
                        className: "tabBtn",
                        "data-active": pathname === "/" ? "true" : "false",
                        onClick: ()=>router.push("/"),
                        children: "Calendar"
                    }, void 0, false, {
                        fileName: "[project]/app/HomeSplitClient.tsx",
                        lineNumber: 755,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                        type: "button",
                        className: "tabBtn",
                        "data-active": pathname?.startsWith("/locations") ? "true" : "false",
                        onClick: ()=>router.push("/locations"),
                        children: "Directory"
                    }, void 0, false, {
                        fileName: "[project]/app/HomeSplitClient.tsx",
                        lineNumber: 763,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                        type: "button",
                        className: "tabBtn",
                        "data-active": pathname?.startsWith("/updates") ? "true" : "false",
                        onClick: ()=>router.push("/updates"),
                        children: "Updates"
                    }, void 0, false, {
                        fileName: "[project]/app/HomeSplitClient.tsx",
                        lineNumber: 771,
                        columnNumber: 11
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/app/HomeSplitClient.tsx",
                lineNumber: 754,
                columnNumber: 9
            }, this) : null,
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "mobileDetail",
                "data-open": mobileDetailOpen ? "true" : "false",
                "aria-hidden": !mobileDetailOpen,
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "mobileDetailHeader",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                className: "backBtn",
                                type: "button",
                                onClick: clearSelected,
                                children: "Back"
                            }, void 0, false, {
                                fileName: "[project]/app/HomeSplitClient.tsx",
                                lineNumber: 789,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "mobileDetailTitle",
                                children: "Event"
                            }, void 0, false, {
                                fileName: "[project]/app/HomeSplitClient.tsx",
                                lineNumber: 792,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/app/HomeSplitClient.tsx",
                        lineNumber: 788,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "scroll",
                        style: {
                            padding: "0 16px 84px 16px"
                        },
                        children: selectedEvent ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "detailCard",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "detailTitle",
                                    children: selectedEvent.title ?? selectedEvent.summary ?? "Untitled event"
                                }, void 0, false, {
                                    fileName: "[project]/app/HomeSplitClient.tsx",
                                    lineNumber: 797,
                                    columnNumber: 15
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "detailMeta",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                            className: "muted",
                                            children: selectedTime ?? "Time TBD"
                                        }, void 0, false, {
                                            fileName: "[project]/app/HomeSplitClient.tsx",
                                            lineNumber: 799,
                                            columnNumber: 17
                                        }, this),
                                        selectedEvent.event_type ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                            className: "badge",
                                            children: selectedEvent.event_type
                                        }, void 0, false, {
                                            fileName: "[project]/app/HomeSplitClient.tsx",
                                            lineNumber: 800,
                                            columnNumber: 45
                                        }, this) : null
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/app/HomeSplitClient.tsx",
                                    lineNumber: 798,
                                    columnNumber: 15
                                }, this),
                                selectedImg ? // eslint-disable-next-line @next/next/no-img-element
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("img", {
                                    src: selectedImg,
                                    alt: "",
                                    style: {
                                        width: "100%",
                                        height: 220,
                                        objectFit: "cover",
                                        borderRadius: 12,
                                        marginTop: 14
                                    }
                                }, void 0, false, {
                                    fileName: "[project]/app/HomeSplitClient.tsx",
                                    lineNumber: 804,
                                    columnNumber: 17
                                }, this) : null,
                                selectedDesc ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "detailBody",
                                    style: {
                                        marginTop: 14
                                    },
                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                        children: selectedDesc
                                    }, void 0, false, {
                                        fileName: "[project]/app/HomeSplitClient.tsx",
                                        lineNumber: 818,
                                        columnNumber: 19
                                    }, this)
                                }, void 0, false, {
                                    fileName: "[project]/app/HomeSplitClient.tsx",
                                    lineNumber: 817,
                                    columnNumber: 17
                                }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "detailBody",
                                    style: {
                                        marginTop: 14
                                    },
                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                        className: "muted",
                                        children: "No description yet."
                                    }, void 0, false, {
                                        fileName: "[project]/app/HomeSplitClient.tsx",
                                        lineNumber: 822,
                                        columnNumber: 19
                                    }, this)
                                }, void 0, false, {
                                    fileName: "[project]/app/HomeSplitClient.tsx",
                                    lineNumber: 821,
                                    columnNumber: 17
                                }, this),
                                selectedEvent.website_url ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                    style: {
                                        marginTop: 12
                                    },
                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("a", {
                                        className: "link",
                                        href: selectedEvent.website_url,
                                        target: "_blank",
                                        rel: "noreferrer",
                                        children: "Website"
                                    }, void 0, false, {
                                        fileName: "[project]/app/HomeSplitClient.tsx",
                                        lineNumber: 827,
                                        columnNumber: 19
                                    }, this)
                                }, void 0, false, {
                                    fileName: "[project]/app/HomeSplitClient.tsx",
                                    lineNumber: 826,
                                    columnNumber: 17
                                }, this) : null,
                                selectedEvent.tickets_url ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                    style: {
                                        marginTop: 8
                                    },
                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("a", {
                                        className: "link",
                                        href: selectedEvent.tickets_url,
                                        target: "_blank",
                                        rel: "noreferrer",
                                        children: "Tickets"
                                    }, void 0, false, {
                                        fileName: "[project]/app/HomeSplitClient.tsx",
                                        lineNumber: 834,
                                        columnNumber: 19
                                    }, this)
                                }, void 0, false, {
                                    fileName: "[project]/app/HomeSplitClient.tsx",
                                    lineNumber: 833,
                                    columnNumber: 17
                                }, this) : null
                            ]
                        }, void 0, true, {
                            fileName: "[project]/app/HomeSplitClient.tsx",
                            lineNumber: 796,
                            columnNumber: 13
                        }, this) : null
                    }, void 0, false, {
                        fileName: "[project]/app/HomeSplitClient.tsx",
                        lineNumber: 794,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/app/HomeSplitClient.tsx",
                lineNumber: 783,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/app/HomeSplitClient.tsx",
        lineNumber: 372,
        columnNumber: 5
    }, this);
}
_s(HomeSplitClient, "hwONkVR2gxvqz/I0zK2hBhpx8i4=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRouter"],
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useSearchParams"],
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["usePathname"]
    ];
});
_c = HomeSplitClient;
var _c;
__turbopack_context__.k.register(_c, "HomeSplitClient");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
]);

//# sourceMappingURL=app_HomeSplitClient_tsx_d9fdf6fa._.js.map