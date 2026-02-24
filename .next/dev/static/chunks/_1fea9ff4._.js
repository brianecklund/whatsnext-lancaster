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
    const selectedKey = selectedParam ?? WEEKLY_KEY;
    const [isMobile, setIsMobile] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [mobileTab, setMobileTab] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])("list");
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "HomeSplitClient.useEffect": ()=>{
            const mq = window.matchMedia("(max-width: 980px)");
            const apply = {
                "HomeSplitClient.useEffect.apply": ()=>setIsMobile(mq.matches)
            }["HomeSplitClient.useEffect.apply"];
            apply();
            mq.addEventListener("change", apply);
            return ({
                "HomeSplitClient.useEffect": ()=>mq.removeEventListener("change", apply)
            })["HomeSplitClient.useEffect"];
        }
    }["HomeSplitClient.useEffect"], []);
    function setParam(key, value) {
        const params = new URLSearchParams(sp.toString());
        if (!value) params.delete(key);
        else params.set(key, value);
        router.push(`/?${params.toString()}`);
    }
    function goDetailMobile() {
        if (isMobile) setMobileTab("detail");
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
    const showLeft = !isMobile || mobileTab === "list";
    const showRight = !isMobile || mobileTab === "detail";
    // Right pane content helpers
    const selectedImg = selectedEvent ? pickImageUrl(selectedEvent) : null;
    const selectedDesc = selectedEvent ? pickDescriptionText(selectedEvent) : null;
    const selectedTime = selectedEvent ? (()=>{
        const d = safeDateFromEvent(selectedEvent);
        return d ? formatTimeLabel(d) : "Time TBD";
    })() : null;
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "pageShell",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "tagline",
                children: "A calendar of events, specials, and pop-ups in Lancaster, PA."
            }, void 0, false, {
                fileName: "[project]/app/HomeSplitClient.tsx",
                lineNumber: 330,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "split",
                children: [
                    showLeft ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("aside", {
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
                                                    lineNumber: 338,
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
                                                    lineNumber: 346,
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
                                                    lineNumber: 354,
                                                    columnNumber: 19
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/app/HomeSplitClient.tsx",
                                            lineNumber: 337,
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
                                                    lineNumber: 365,
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
                                                    lineNumber: 371,
                                                    columnNumber: 21
                                                }, this) : null
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/app/HomeSplitClient.tsx",
                                            lineNumber: 364,
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
                                                    lineNumber: 385,
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
                                                        lineNumber: 396,
                                                        columnNumber: 23
                                                    }, this);
                                                })
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/app/HomeSplitClient.tsx",
                                            lineNumber: 384,
                                            columnNumber: 17
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/app/HomeSplitClient.tsx",
                                    lineNumber: 336,
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
                                        setParam("event", WEEKLY_KEY);
                                        goDetailMobile();
                                    },
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "weeklyTitle",
                                            children: "Weekly Overview"
                                        }, void 0, false, {
                                            fileName: "[project]/app/HomeSplitClient.tsx",
                                            lineNumber: 421,
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
                                            lineNumber: 422,
                                            columnNumber: 17
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/app/HomeSplitClient.tsx",
                                    lineNumber: 411,
                                    columnNumber: 15
                                }, this),
                                leftDayGroups.length === 0 ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "emptyList",
                                    children: "No events match your search."
                                }, void 0, false, {
                                    fileName: "[project]/app/HomeSplitClient.tsx",
                                    lineNumber: 429,
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
                                                lineNumber: 435,
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
                                                        if (e.uid) setParam("event", e.uid);
                                                        else setParam("event", e.id);
                                                        goDetailMobile();
                                                    },
                                                    type: "button",
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                            className: "eventRowTitle",
                                                            children: title
                                                        }, void 0, false, {
                                                            fileName: "[project]/app/HomeSplitClient.tsx",
                                                            lineNumber: 459,
                                                            columnNumber: 25
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                            className: "eventRowMeta",
                                                            children: [
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                    children: timeLabel
                                                                }, void 0, false, {
                                                                    fileName: "[project]/app/HomeSplitClient.tsx",
                                                                    lineNumber: 461,
                                                                    columnNumber: 27
                                                                }, this),
                                                                e.event_type ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                    className: "dot",
                                                                    children: "•"
                                                                }, void 0, false, {
                                                                    fileName: "[project]/app/HomeSplitClient.tsx",
                                                                    lineNumber: 462,
                                                                    columnNumber: 43
                                                                }, this) : null,
                                                                e.event_type ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                    children: e.event_type
                                                                }, void 0, false, {
                                                                    fileName: "[project]/app/HomeSplitClient.tsx",
                                                                    lineNumber: 463,
                                                                    columnNumber: 43
                                                                }, this) : null
                                                            ]
                                                        }, void 0, true, {
                                                            fileName: "[project]/app/HomeSplitClient.tsx",
                                                            lineNumber: 460,
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
                                                                lineNumber: 471,
                                                                columnNumber: 29
                                                            }, this);
                                                        })()
                                                    ]
                                                }, e.id, true, {
                                                    fileName: "[project]/app/HomeSplitClient.tsx",
                                                    lineNumber: 447,
                                                    columnNumber: 23
                                                }, this);
                                            })
                                        ]
                                    }, dayKey(g.date), true, {
                                        fileName: "[project]/app/HomeSplitClient.tsx",
                                        lineNumber: 434,
                                        columnNumber: 17
                                    }, this))
                            ]
                        }, void 0, true, {
                            fileName: "[project]/app/HomeSplitClient.tsx",
                            lineNumber: 335,
                            columnNumber: 13
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/app/HomeSplitClient.tsx",
                        lineNumber: 334,
                        columnNumber: 11
                    }, this) : null,
                    showRight ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("main", {
                        className: "pane paneRight",
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "scroll",
                            children: [
                                isMobile && mobileTab === "detail" ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "mobileBackBar",
                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                        type: "button",
                                        className: "mobileBackBtn",
                                        onClick: ()=>setMobileTab("list"),
                                        children: "← Back to list"
                                    }, void 0, false, {
                                        fileName: "[project]/app/HomeSplitClient.tsx",
                                        lineNumber: 493,
                                        columnNumber: 19
                                    }, this)
                                }, void 0, false, {
                                    fileName: "[project]/app/HomeSplitClient.tsx",
                                    lineNumber: 492,
                                    columnNumber: 17
                                }, this) : null,
                                selectedKey === WEEKLY_KEY ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "rightHeader",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "rightDayLabel",
                                            children: "Weekly Overview"
                                        }, void 0, false, {
                                            fileName: "[project]/app/HomeSplitClient.tsx",
                                            lineNumber: 505,
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
                                                    lineNumber: 508,
                                                    columnNumber: 21
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                    className: "weekSummarySubhead",
                                                    children: "A quick snapshot of what's happening on the calendar this week."
                                                }, void 0, false, {
                                                    fileName: "[project]/app/HomeSplitClient.tsx",
                                                    lineNumber: 509,
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
                                                                    lineNumber: 515,
                                                                    columnNumber: 25
                                                                }, this),
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                    className: "weekSummaryValue",
                                                                    children: weekEventsCount
                                                                }, void 0, false, {
                                                                    fileName: "[project]/app/HomeSplitClient.tsx",
                                                                    lineNumber: 516,
                                                                    columnNumber: 25
                                                                }, this)
                                                            ]
                                                        }, void 0, true, {
                                                            fileName: "[project]/app/HomeSplitClient.tsx",
                                                            lineNumber: 514,
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
                                                                    lineNumber: 519,
                                                                    columnNumber: 25
                                                                }, this),
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                    className: "weekSummaryValue",
                                                                    children: weekInsights["Live music"]
                                                                }, void 0, false, {
                                                                    fileName: "[project]/app/HomeSplitClient.tsx",
                                                                    lineNumber: 520,
                                                                    columnNumber: 25
                                                                }, this)
                                                            ]
                                                        }, void 0, true, {
                                                            fileName: "[project]/app/HomeSplitClient.tsx",
                                                            lineNumber: 518,
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
                                                                    lineNumber: 523,
                                                                    columnNumber: 25
                                                                }, this),
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                    className: "weekSummaryValue",
                                                                    children: weekInsights["Food & drink"]
                                                                }, void 0, false, {
                                                                    fileName: "[project]/app/HomeSplitClient.tsx",
                                                                    lineNumber: 524,
                                                                    columnNumber: 25
                                                                }, this)
                                                            ]
                                                        }, void 0, true, {
                                                            fileName: "[project]/app/HomeSplitClient.tsx",
                                                            lineNumber: 522,
                                                            columnNumber: 23
                                                        }, this)
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/app/HomeSplitClient.tsx",
                                                    lineNumber: 513,
                                                    columnNumber: 21
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/app/HomeSplitClient.tsx",
                                            lineNumber: 507,
                                            columnNumber: 19
                                        }, this),
                                        weekEventsCount === 0 ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "emptyRight",
                                            children: "No events scheduled for the rest of this week."
                                        }, void 0, false, {
                                            fileName: "[project]/app/HomeSplitClient.tsx",
                                            lineNumber: 531,
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
                                                            lineNumber: 538,
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
                                                                    if (e.uid) setParam("event", e.uid);
                                                                    else setParam("event", e.id);
                                                                    goDetailMobile();
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
                                                                            lineNumber: 560,
                                                                            columnNumber: 37
                                                                        }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                            className: "weeklyThumbPlaceholder",
                                                                            "aria-hidden": true
                                                                        }, void 0, false, {
                                                                            fileName: "[project]/app/HomeSplitClient.tsx",
                                                                            lineNumber: 562,
                                                                            columnNumber: 37
                                                                        }, this)
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/app/HomeSplitClient.tsx",
                                                                        lineNumber: 557,
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
                                                                                            lineNumber: 569,
                                                                                            columnNumber: 39
                                                                                        }, this),
                                                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                                            className: "weeklyCardTime",
                                                                                            children: timeLabel
                                                                                        }, void 0, false, {
                                                                                            fileName: "[project]/app/HomeSplitClient.tsx",
                                                                                            lineNumber: 570,
                                                                                            columnNumber: 39
                                                                                        }, this)
                                                                                    ]
                                                                                }, void 0, true, {
                                                                                    fileName: "[project]/app/HomeSplitClient.tsx",
                                                                                    lineNumber: 568,
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
                                                                                            lineNumber: 576,
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
                                                                                            lineNumber: 587,
                                                                                            columnNumber: 43
                                                                                        }, this) : null
                                                                                    ]
                                                                                }, void 0, true, {
                                                                                    fileName: "[project]/app/HomeSplitClient.tsx",
                                                                                    lineNumber: 574,
                                                                                    columnNumber: 39
                                                                                }, this) : null
                                                                            ]
                                                                        }, void 0, true, {
                                                                            fileName: "[project]/app/HomeSplitClient.tsx",
                                                                            lineNumber: 567,
                                                                            columnNumber: 35
                                                                        }, this)
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/app/HomeSplitClient.tsx",
                                                                        lineNumber: 566,
                                                                        columnNumber: 33
                                                                    }, this)
                                                                ]
                                                            }, e.id, true, {
                                                                fileName: "[project]/app/HomeSplitClient.tsx",
                                                                lineNumber: 547,
                                                                columnNumber: 31
                                                            }, this);
                                                        })
                                                    ]
                                                }, dayKey(g.date), true, {
                                                    fileName: "[project]/app/HomeSplitClient.tsx",
                                                    lineNumber: 537,
                                                    columnNumber: 25
                                                }, this))
                                        }, void 0, false, {
                                            fileName: "[project]/app/HomeSplitClient.tsx",
                                            lineNumber: 535,
                                            columnNumber: 21
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/app/HomeSplitClient.tsx",
                                    lineNumber: 504,
                                    columnNumber: 17
                                }, this) : !selectedEvent ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "emptyRight",
                                    children: "Select an event."
                                }, void 0, false, {
                                    fileName: "[project]/app/HomeSplitClient.tsx",
                                    lineNumber: 610,
                                    columnNumber: 17
                                }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "rightHeader",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "rightDayLabel",
                                            children: selectedEvent.event_type || "Event"
                                        }, void 0, false, {
                                            fileName: "[project]/app/HomeSplitClient.tsx",
                                            lineNumber: 613,
                                            columnNumber: 19
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h1", {
                                            className: "detailTitle",
                                            children: selectedEvent.title || "Untitled event"
                                        }, void 0, false, {
                                            fileName: "[project]/app/HomeSplitClient.tsx",
                                            lineNumber: 615,
                                            columnNumber: 19
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "detailMeta",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                    children: selectedTime
                                                }, void 0, false, {
                                                    fileName: "[project]/app/HomeSplitClient.tsx",
                                                    lineNumber: 618,
                                                    columnNumber: 21
                                                }, this),
                                                selectedEvent.locationName ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Fragment"], {
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                            className: "dot",
                                                            children: "•"
                                                        }, void 0, false, {
                                                            fileName: "[project]/app/HomeSplitClient.tsx",
                                                            lineNumber: 621,
                                                            columnNumber: 25
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                            className: "venue",
                                                            children: selectedEvent.locationName
                                                        }, void 0, false, {
                                                            fileName: "[project]/app/HomeSplitClient.tsx",
                                                            lineNumber: 622,
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
                                                            lineNumber: 627,
                                                            columnNumber: 25
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                            className: "muted",
                                                            children: selectedEvent.address
                                                        }, void 0, false, {
                                                            fileName: "[project]/app/HomeSplitClient.tsx",
                                                            lineNumber: 628,
                                                            columnNumber: 25
                                                        }, this)
                                                    ]
                                                }, void 0, true) : null
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/app/HomeSplitClient.tsx",
                                            lineNumber: 617,
                                            columnNumber: 19
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "heroImage",
                                            style: selectedImg ? {
                                                backgroundImage: `url(${selectedImg})`
                                            } : undefined
                                        }, void 0, false, {
                                            fileName: "[project]/app/HomeSplitClient.tsx",
                                            lineNumber: 634,
                                            columnNumber: 19
                                        }, this),
                                        selectedEvent.summary ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                            className: "summary",
                                            children: selectedEvent.summary
                                        }, void 0, false, {
                                            fileName: "[project]/app/HomeSplitClient.tsx",
                                            lineNumber: 639,
                                            columnNumber: 44
                                        }, this) : null,
                                        selectedDesc ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "detailBody",
                                            children: selectedDesc
                                        }, void 0, false, {
                                            fileName: "[project]/app/HomeSplitClient.tsx",
                                            lineNumber: 641,
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
                                                    lineNumber: 645,
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
                                                    lineNumber: 658,
                                                    columnNumber: 23
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/app/HomeSplitClient.tsx",
                                            lineNumber: 644,
                                            columnNumber: 21
                                        }, this) : null
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/app/HomeSplitClient.tsx",
                                    lineNumber: 612,
                                    columnNumber: 17
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/app/HomeSplitClient.tsx",
                            lineNumber: 490,
                            columnNumber: 13
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/app/HomeSplitClient.tsx",
                        lineNumber: 489,
                        columnNumber: 11
                    }, this) : null
                ]
            }, void 0, true, {
                fileName: "[project]/app/HomeSplitClient.tsx",
                lineNumber: 331,
                columnNumber: 7
            }, this),
            isMobile ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
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
                        lineNumber: 682,
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
                        lineNumber: 690,
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
                        lineNumber: 698,
                        columnNumber: 11
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/app/HomeSplitClient.tsx",
                lineNumber: 681,
                columnNumber: 9
            }, this) : null
        ]
    }, void 0, true, {
        fileName: "[project]/app/HomeSplitClient.tsx",
        lineNumber: 329,
        columnNumber: 5
    }, this);
}
_s(HomeSplitClient, "I2JvH8WmniXYU+OP3oHfCWg/YeA=", false, function() {
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
"[project]/node_modules/next/dist/compiled/react/cjs/react-jsx-dev-runtime.development.js [app-client] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$polyfills$2f$process$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = /*#__PURE__*/ __turbopack_context__.i("[project]/node_modules/next/dist/build/polyfills/process.js [app-client] (ecmascript)");
/**
 * @license React
 * react-jsx-dev-runtime.development.js
 *
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */ "use strict";
"production" !== ("TURBOPACK compile-time value", "development") && function() {
    function getComponentNameFromType(type) {
        if (null == type) return null;
        if ("function" === typeof type) return type.$$typeof === REACT_CLIENT_REFERENCE ? null : type.displayName || type.name || null;
        if ("string" === typeof type) return type;
        switch(type){
            case REACT_FRAGMENT_TYPE:
                return "Fragment";
            case REACT_PROFILER_TYPE:
                return "Profiler";
            case REACT_STRICT_MODE_TYPE:
                return "StrictMode";
            case REACT_SUSPENSE_TYPE:
                return "Suspense";
            case REACT_SUSPENSE_LIST_TYPE:
                return "SuspenseList";
            case REACT_ACTIVITY_TYPE:
                return "Activity";
            case REACT_VIEW_TRANSITION_TYPE:
                return "ViewTransition";
        }
        if ("object" === typeof type) switch("number" === typeof type.tag && console.error("Received an unexpected object in getComponentNameFromType(). This is likely a bug in React. Please file an issue."), type.$$typeof){
            case REACT_PORTAL_TYPE:
                return "Portal";
            case REACT_CONTEXT_TYPE:
                return type.displayName || "Context";
            case REACT_CONSUMER_TYPE:
                return (type._context.displayName || "Context") + ".Consumer";
            case REACT_FORWARD_REF_TYPE:
                var innerType = type.render;
                type = type.displayName;
                type || (type = innerType.displayName || innerType.name || "", type = "" !== type ? "ForwardRef(" + type + ")" : "ForwardRef");
                return type;
            case REACT_MEMO_TYPE:
                return innerType = type.displayName || null, null !== innerType ? innerType : getComponentNameFromType(type.type) || "Memo";
            case REACT_LAZY_TYPE:
                innerType = type._payload;
                type = type._init;
                try {
                    return getComponentNameFromType(type(innerType));
                } catch (x) {}
        }
        return null;
    }
    function testStringCoercion(value) {
        return "" + value;
    }
    function checkKeyStringCoercion(value) {
        try {
            testStringCoercion(value);
            var JSCompiler_inline_result = !1;
        } catch (e) {
            JSCompiler_inline_result = !0;
        }
        if (JSCompiler_inline_result) {
            JSCompiler_inline_result = console;
            var JSCompiler_temp_const = JSCompiler_inline_result.error;
            var JSCompiler_inline_result$jscomp$0 = "function" === typeof Symbol && Symbol.toStringTag && value[Symbol.toStringTag] || value.constructor.name || "Object";
            JSCompiler_temp_const.call(JSCompiler_inline_result, "The provided key is an unsupported type %s. This value must be coerced to a string before using it here.", JSCompiler_inline_result$jscomp$0);
            return testStringCoercion(value);
        }
    }
    function getTaskName(type) {
        if (type === REACT_FRAGMENT_TYPE) return "<>";
        if ("object" === typeof type && null !== type && type.$$typeof === REACT_LAZY_TYPE) return "<...>";
        try {
            var name = getComponentNameFromType(type);
            return name ? "<" + name + ">" : "<...>";
        } catch (x) {
            return "<...>";
        }
    }
    function getOwner() {
        var dispatcher = ReactSharedInternals.A;
        return null === dispatcher ? null : dispatcher.getOwner();
    }
    function UnknownOwner() {
        return Error("react-stack-top-frame");
    }
    function hasValidKey(config) {
        if (hasOwnProperty.call(config, "key")) {
            var getter = Object.getOwnPropertyDescriptor(config, "key").get;
            if (getter && getter.isReactWarning) return !1;
        }
        return void 0 !== config.key;
    }
    function defineKeyPropWarningGetter(props, displayName) {
        function warnAboutAccessingKey() {
            specialPropKeyWarningShown || (specialPropKeyWarningShown = !0, console.error("%s: `key` is not a prop. Trying to access it will result in `undefined` being returned. If you need to access the same value within the child component, you should pass it as a different prop. (https://react.dev/link/special-props)", displayName));
        }
        warnAboutAccessingKey.isReactWarning = !0;
        Object.defineProperty(props, "key", {
            get: warnAboutAccessingKey,
            configurable: !0
        });
    }
    function elementRefGetterWithDeprecationWarning() {
        var componentName = getComponentNameFromType(this.type);
        didWarnAboutElementRef[componentName] || (didWarnAboutElementRef[componentName] = !0, console.error("Accessing element.ref was removed in React 19. ref is now a regular prop. It will be removed from the JSX Element type in a future release."));
        componentName = this.props.ref;
        return void 0 !== componentName ? componentName : null;
    }
    function ReactElement(type, key, props, owner, debugStack, debugTask) {
        var refProp = props.ref;
        type = {
            $$typeof: REACT_ELEMENT_TYPE,
            type: type,
            key: key,
            props: props,
            _owner: owner
        };
        null !== (void 0 !== refProp ? refProp : null) ? Object.defineProperty(type, "ref", {
            enumerable: !1,
            get: elementRefGetterWithDeprecationWarning
        }) : Object.defineProperty(type, "ref", {
            enumerable: !1,
            value: null
        });
        type._store = {};
        Object.defineProperty(type._store, "validated", {
            configurable: !1,
            enumerable: !1,
            writable: !0,
            value: 0
        });
        Object.defineProperty(type, "_debugInfo", {
            configurable: !1,
            enumerable: !1,
            writable: !0,
            value: null
        });
        Object.defineProperty(type, "_debugStack", {
            configurable: !1,
            enumerable: !1,
            writable: !0,
            value: debugStack
        });
        Object.defineProperty(type, "_debugTask", {
            configurable: !1,
            enumerable: !1,
            writable: !0,
            value: debugTask
        });
        Object.freeze && (Object.freeze(type.props), Object.freeze(type));
        return type;
    }
    function jsxDEVImpl(type, config, maybeKey, isStaticChildren, debugStack, debugTask) {
        var children = config.children;
        if (void 0 !== children) if (isStaticChildren) if (isArrayImpl(children)) {
            for(isStaticChildren = 0; isStaticChildren < children.length; isStaticChildren++)validateChildKeys(children[isStaticChildren]);
            Object.freeze && Object.freeze(children);
        } else console.error("React.jsx: Static children should always be an array. You are likely explicitly calling React.jsxs or React.jsxDEV. Use the Babel transform instead.");
        else validateChildKeys(children);
        if (hasOwnProperty.call(config, "key")) {
            children = getComponentNameFromType(type);
            var keys = Object.keys(config).filter(function(k) {
                return "key" !== k;
            });
            isStaticChildren = 0 < keys.length ? "{key: someKey, " + keys.join(": ..., ") + ": ...}" : "{key: someKey}";
            didWarnAboutKeySpread[children + isStaticChildren] || (keys = 0 < keys.length ? "{" + keys.join(": ..., ") + ": ...}" : "{}", console.error('A props object containing a "key" prop is being spread into JSX:\n  let props = %s;\n  <%s {...props} />\nReact keys must be passed directly to JSX without using spread:\n  let props = %s;\n  <%s key={someKey} {...props} />', isStaticChildren, children, keys, children), didWarnAboutKeySpread[children + isStaticChildren] = !0);
        }
        children = null;
        void 0 !== maybeKey && (checkKeyStringCoercion(maybeKey), children = "" + maybeKey);
        hasValidKey(config) && (checkKeyStringCoercion(config.key), children = "" + config.key);
        if ("key" in config) {
            maybeKey = {};
            for(var propName in config)"key" !== propName && (maybeKey[propName] = config[propName]);
        } else maybeKey = config;
        children && defineKeyPropWarningGetter(maybeKey, "function" === typeof type ? type.displayName || type.name || "Unknown" : type);
        return ReactElement(type, children, maybeKey, getOwner(), debugStack, debugTask);
    }
    function validateChildKeys(node) {
        isValidElement(node) ? node._store && (node._store.validated = 1) : "object" === typeof node && null !== node && node.$$typeof === REACT_LAZY_TYPE && ("fulfilled" === node._payload.status ? isValidElement(node._payload.value) && node._payload.value._store && (node._payload.value._store.validated = 1) : node._store && (node._store.validated = 1));
    }
    function isValidElement(object) {
        return "object" === typeof object && null !== object && object.$$typeof === REACT_ELEMENT_TYPE;
    }
    var React = __turbopack_context__.r("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)"), REACT_ELEMENT_TYPE = Symbol.for("react.transitional.element"), REACT_PORTAL_TYPE = Symbol.for("react.portal"), REACT_FRAGMENT_TYPE = Symbol.for("react.fragment"), REACT_STRICT_MODE_TYPE = Symbol.for("react.strict_mode"), REACT_PROFILER_TYPE = Symbol.for("react.profiler"), REACT_CONSUMER_TYPE = Symbol.for("react.consumer"), REACT_CONTEXT_TYPE = Symbol.for("react.context"), REACT_FORWARD_REF_TYPE = Symbol.for("react.forward_ref"), REACT_SUSPENSE_TYPE = Symbol.for("react.suspense"), REACT_SUSPENSE_LIST_TYPE = Symbol.for("react.suspense_list"), REACT_MEMO_TYPE = Symbol.for("react.memo"), REACT_LAZY_TYPE = Symbol.for("react.lazy"), REACT_ACTIVITY_TYPE = Symbol.for("react.activity"), REACT_VIEW_TRANSITION_TYPE = Symbol.for("react.view_transition"), REACT_CLIENT_REFERENCE = Symbol.for("react.client.reference"), ReactSharedInternals = React.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE, hasOwnProperty = Object.prototype.hasOwnProperty, isArrayImpl = Array.isArray, createTask = console.createTask ? console.createTask : function() {
        return null;
    };
    React = {
        react_stack_bottom_frame: function(callStackForError) {
            return callStackForError();
        }
    };
    var specialPropKeyWarningShown;
    var didWarnAboutElementRef = {};
    var unknownOwnerDebugStack = React.react_stack_bottom_frame.bind(React, UnknownOwner)();
    var unknownOwnerDebugTask = createTask(getTaskName(UnknownOwner));
    var didWarnAboutKeySpread = {};
    exports.Fragment = REACT_FRAGMENT_TYPE;
    exports.jsxDEV = function(type, config, maybeKey, isStaticChildren) {
        var trackActualOwner = 1e4 > ReactSharedInternals.recentlyCreatedOwnerStacks++;
        if (trackActualOwner) {
            var previousStackTraceLimit = Error.stackTraceLimit;
            Error.stackTraceLimit = 10;
            var debugStackDEV = Error("react-stack-top-frame");
            Error.stackTraceLimit = previousStackTraceLimit;
        } else debugStackDEV = unknownOwnerDebugStack;
        return jsxDEVImpl(type, config, maybeKey, isStaticChildren, debugStackDEV, trackActualOwner ? createTask(getTaskName(type)) : unknownOwnerDebugTask);
    };
}();
}),
"[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$polyfills$2f$process$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = /*#__PURE__*/ __turbopack_context__.i("[project]/node_modules/next/dist/build/polyfills/process.js [app-client] (ecmascript)");
'use strict';
if ("TURBOPACK compile-time falsy", 0) //TURBOPACK unreachable
;
else {
    module.exports = __turbopack_context__.r("[project]/node_modules/next/dist/compiled/react/cjs/react-jsx-dev-runtime.development.js [app-client] (ecmascript)");
}
}),
"[project]/node_modules/next/navigation.js [app-client] (ecmascript)", ((__turbopack_context__, module, exports) => {

module.exports = __turbopack_context__.r("[project]/node_modules/next/dist/client/components/navigation.js [app-client] (ecmascript)");
}),
]);

//# sourceMappingURL=_1fea9ff4._.js.map