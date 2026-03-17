module.exports = [
"[project]/app/components/NewsTickerBar.tsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>NewsTickerBar
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
"use client";
;
;
function NewsTickerBar({ introText, items }) {
    const rootRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useRef"])(null);
    const sliderRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useRef"])(null);
    const renderedItems = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useMemo"])(()=>{
        if (!items.length) {
            return [
                {
                    label: "NEWS",
                    text: "Upcoming Lancaster events and pop-ups.",
                    href: "#"
                }
            ];
        }
        const base = items.slice(0, 6);
        return [
            ...base,
            base[0]
        ];
    }, [
        items
    ]);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        const newsWidget = rootRef.current;
        const slider = sliderRef.current;
        if (!newsWidget || !slider) return;
        const allItems = Array.from(slider.querySelectorAll(".nw__slider__item"));
        if (!allItems.length) return;
        const path = newsWidget.querySelector(".js-news-widget__progress");
        if (!path) return;
        const itemHeight = allItems[0].getBoundingClientRect().height;
        const length = path.getTotalLength();
        const duration = 2200;
        let counter = 1;
        let strokeTimer;
        let resetTimer;
        let destroyed = false;
        const animateStroke = ()=>{
            if (destroyed) return;
            path.style.transition = "none";
            path.style.strokeDasharray = `${length} ${length}`;
            path.style.strokeDashoffset = `${length}`;
            path.getBoundingClientRect();
            path.style.transition = `stroke-dashoffset ${duration / 1000}s linear`;
            path.style.strokeDashoffset = "0";
            strokeTimer = window.setTimeout(()=>{
                slideItem();
            }, duration);
        };
        const slideItem = ()=>{
            if (destroyed) return;
            slider.style.transition = `transform ${duration / 1000 / 4}s ease-in-out`;
            slider.style.transform = `translate3d(0, -${itemHeight * counter}px, 0)`;
            if (counter === allItems.length - 1) {
                resetTimer = window.setTimeout(()=>{
                    slider.style.transition = "none";
                    slider.style.transform = "translate3d(0,0,0)";
                    counter = 1;
                }, duration / 4);
            } else {
                counter += 1;
            }
            animateStroke();
        };
        animateStroke();
        return ()=>{
            destroyed = true;
            if (strokeTimer) window.clearTimeout(strokeTimer);
            if (resetTimer) window.clearTimeout(resetTimer);
        };
    }, [
        renderedItems
    ]);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("section", {
        className: "newsBar",
        "aria-label": "Latest updates",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "newsBar__intro",
                children: introText
            }, void 0, false, {
                fileName: "[project]/app/components/NewsTickerBar.tsx",
                lineNumber: 92,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "nw js-news-widget",
                ref: rootRef,
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "nw__inner",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "nw__wrapper",
                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("ul", {
                                className: "nw__slider",
                                ref: sliderRef,
                                children: renderedItems.map((item, index)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("li", {
                                        className: "nw__slider__item",
                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("a", {
                                            className: "nw__slider__link",
                                            href: item.href || "#",
                                            children: [
                                                item.label ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("strong", {
                                                    children: [
                                                        item.label,
                                                        ":"
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/app/components/NewsTickerBar.tsx",
                                                    lineNumber: 101,
                                                    columnNumber: 35
                                                }, this) : null,
                                                " ",
                                                item.text
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/app/components/NewsTickerBar.tsx",
                                            lineNumber: 100,
                                            columnNumber: 19
                                        }, this)
                                    }, `${item.text}-${index}`, false, {
                                        fileName: "[project]/app/components/NewsTickerBar.tsx",
                                        lineNumber: 99,
                                        columnNumber: 17
                                    }, this))
                            }, void 0, false, {
                                fileName: "[project]/app/components/NewsTickerBar.tsx",
                                lineNumber: 97,
                                columnNumber: 13
                            }, this)
                        }, void 0, false, {
                            fileName: "[project]/app/components/NewsTickerBar.tsx",
                            lineNumber: 96,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "nw__progress",
                            "aria-hidden": true,
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
                                    className: "nw__progress__icon",
                                    viewBox: "0 0 30 30",
                                    xmlns: "http://www.w3.org/2000/svg",
                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                                        d: "M10.8 12.6H7v4.7h2.4c.2 2 1.7 3.9 3.7 4.5.4.1.8.2 1.2.2.7 0 1.3-.2 1.8-.6.6-.4.9-1 1.1-1.6L23 22V8l-12.2 4.6zm4.4 7.6c-.4.3-1 .3-1.6.1-1.3-.4-2.4-1.7-2.6-2.9l4.7 1.8c0 .4-.2.8-.5 1zm6.2-.5L11.8 16v-2l9.6-3.7v9.4z"
                                    }, void 0, false, {
                                        fileName: "[project]/app/components/NewsTickerBar.tsx",
                                        lineNumber: 110,
                                        columnNumber: 15
                                    }, this)
                                }, void 0, false, {
                                    fileName: "[project]/app/components/NewsTickerBar.tsx",
                                    lineNumber: 109,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
                                    className: "nw__progress__indicator",
                                    viewBox: "0 0 100 100",
                                    xmlns: "http://www.w3.org/2000/svg",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                                            className: "js-news-widget__progress__bg",
                                            d: "M 50,50 m 0,-48.5 a 48.5,48.5 0 1 1 0,97 a 48.5,48.5 0 1 1 0,-97",
                                            fill: "none"
                                        }, void 0, false, {
                                            fileName: "[project]/app/components/NewsTickerBar.tsx",
                                            lineNumber: 113,
                                            columnNumber: 15
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                                            className: "js-news-widget__progress",
                                            d: "M 50,50 m 0,-48.5 a 48.5,48.5 0 1 1 0,97 a 48.5,48.5 0 1 1 0,-97",
                                            fill: "none"
                                        }, void 0, false, {
                                            fileName: "[project]/app/components/NewsTickerBar.tsx",
                                            lineNumber: 114,
                                            columnNumber: 15
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/app/components/NewsTickerBar.tsx",
                                    lineNumber: 112,
                                    columnNumber: 13
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/app/components/NewsTickerBar.tsx",
                            lineNumber: 108,
                            columnNumber: 11
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/app/components/NewsTickerBar.tsx",
                    lineNumber: 95,
                    columnNumber: 9
                }, this)
            }, void 0, false, {
                fileName: "[project]/app/components/NewsTickerBar.tsx",
                lineNumber: 94,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/app/components/NewsTickerBar.tsx",
        lineNumber: 91,
        columnNumber: 5
    }, this);
}
}),
"[project]/app/components/ToolbarIcon.tsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>ToolbarIcon
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
;
function ToolbarIcon({ src, alt }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("img", {
        src: src,
        alt: alt,
        className: "btnIconImg"
    }, void 0, false, {
        fileName: "[project]/app/components/ToolbarIcon.tsx",
        lineNumber: 2,
        columnNumber: 10
    }, this);
}
}),
"[project]/app/hooks/useBodyScrollLock.ts [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "useBodyScrollLock",
    ()=>useBodyScrollLock
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
"use client";
;
function useBodyScrollLock(locked) {
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        const previousHtmlOverflow = document.documentElement.style.overflow;
        const previousBodyOverflow = document.body.style.overflow;
        if (locked) {
            document.documentElement.style.overflow = "hidden";
            document.body.style.overflow = "hidden";
        }
        return ()=>{
            document.documentElement.style.overflow = previousHtmlOverflow;
            document.body.style.overflow = previousBodyOverflow;
        };
    }, [
        locked
    ]);
}
}),
"[project]/lib/calendar.ts [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "dayKey",
    ()=>dayKey,
    "eventHasEnded",
    ()=>eventHasEnded,
    "nearestDayWithEvents",
    ()=>nearestDayWithEvents,
    "safeDateFromEvent",
    ()=>safeDateFromEvent,
    "startOfDay",
    ()=>startOfDay,
    "startOfToday",
    ()=>startOfToday
]);
function safeDateFromEvent(e) {
    const raw = e.start_datetime || e.end_datetime;
    if (!raw) return null;
    const d = new Date(raw);
    return Number.isNaN(d.getTime()) ? null : d;
}
function eventHasEnded(e, now = Date.now()) {
    const raw = e.end_datetime || e.start_datetime;
    if (!raw) return false;
    const d = new Date(raw);
    return !Number.isNaN(d.getTime()) && d.getTime() < now;
}
function startOfToday() {
    const d = new Date();
    d.setHours(0, 0, 0, 0);
    return d;
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
function nearestDayWithEvents(events) {
    const today = startOfToday();
    const dated = events.map((e)=>safeDateFromEvent(e)).filter((d)=>!!d).sort((a, b)=>a.getTime() - b.getTime());
    if (!dated.length) return today;
    const todayMatch = dated.find((d)=>dayKey(d) === dayKey(today));
    if (todayMatch) return startOfDay(todayMatch);
    const upcoming = dated.find((d)=>d.getTime() >= today.getTime());
    if (upcoming) return startOfDay(upcoming);
    return startOfDay(dated[dated.length - 1]);
}
}),
"[project]/app/components/useSmoothWheel.ts [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "useSmoothWheel",
    ()=>useSmoothWheel
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
"use client";
;
function useSmoothWheel(_containerSelector = ".scroll") {
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        return;
    }, [
        _containerSelector
    ]);
}
}),
"[project]/app/components/MediaBlocks.tsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>MediaBlocks
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
"use client";
;
;
function asUrl(v) {
    if (!v) return null;
    if (typeof v === "string") return v.trim() ? v : null;
    if (typeof v?.url === "string" && v.url) return v.url;
    if (typeof v?.href === "string" && v.href) return v.href;
    // Prismic Link fields sometimes appear as { url } or { link_type, ... }
    if (typeof v?.value === "string" && v.value) return v.value;
    return null;
}
function asText(rich) {
    if (!rich) return "";
    if (typeof rich === "string") return rich;
    if (Array.isArray(rich)) {
        return rich.map((b)=>typeof b?.text === "string" ? b.text : "").filter(Boolean).join("\n\n");
    }
    return "";
}
function safeHtml(v) {
    if (!v) return null;
    if (typeof v === "string") return v;
    if (typeof v?.html === "string") return v.html;
    // Some embed fields include oEmbed html in `oembed.html`
    if (typeof v?.oembed?.html === "string") return v.oembed.html;
    return null;
}
function MediaBlocks({ slices }) {
    const [lightboxSrc, setLightboxSrc] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(null);
    const tiltRaf = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useRef"])(null);
    const normalized = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useMemo"])(()=>Array.isArray(slices) ? slices : [], [
        slices
    ]);
    if (!normalized.length) return null;
    function onTiltMove(e) {
        const el = e.currentTarget;
        if (el.dataset.tilt !== "true") return;
        const reduce = window.matchMedia?.("(prefers-reduced-motion: reduce)")?.matches;
        if (reduce) return;
        const rect = el.getBoundingClientRect();
        const px = (e.clientX - rect.left) / Math.max(1, rect.width);
        const py = (e.clientY - rect.top) / Math.max(1, rect.height);
        const rx = (py - 0.5) * -8;
        const ry = (px - 0.5) * 10;
        if (tiltRaf.current) cancelAnimationFrame(tiltRaf.current);
        tiltRaf.current = requestAnimationFrame(()=>{
            el.style.setProperty("--tilt-rx", `${rx.toFixed(2)}deg`);
            el.style.setProperty("--tilt-ry", `${ry.toFixed(2)}deg`);
        });
    }
    function onTiltLeave(e) {
        const el = e.currentTarget;
        if (el.dataset.tilt !== "true") return;
        el.style.setProperty("--tilt-rx", `0deg`);
        el.style.setProperty("--tilt-ry", `0deg`);
    }
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "mediaBlocks",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "mediaBlocksTitle",
                children: "More"
            }, void 0, false, {
                fileName: "[project]/app/components/MediaBlocks.tsx",
                lineNumber: 76,
                columnNumber: 7
            }, this),
            normalized.map((slice, idx)=>{
                const type = String(slice?.slice_type ?? slice?.type ?? "").toLowerCase();
                const primary = slice?.primary ?? {};
                const items = Array.isArray(slice?.items) ? slice.items : [];
                const variation = String(slice?.variation ?? "").toLowerCase();
                // --- Showcase Hero ---
                if (type.includes("showcase_hero")) {
                    const style = String(primary?.style ?? "clean").toLowerCase();
                    const caption = asText(primary?.caption ?? "");
                    const embedHtml = safeHtml(primary?.media_embed ?? primary?.embed ?? primary?.oembed);
                    const fileUrl = asUrl(primary?.media_video_file ?? primary?.video_file ?? primary?.file);
                    const imgUrl = asUrl(primary?.media_image ?? primary?.image ?? primary?.photo);
                    const posterUrl = asUrl(primary?.poster ?? primary?.poster_image ?? primary?.thumbnail);
                    if (!embedHtml && !fileUrl && !imgUrl) return null;
                    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("section", {
                        className: "mbSection mbHero",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: `showcaseHero ${style} motionReveal`,
                                "data-tilt": style === "glow" || style === "poster" ? "true" : "false",
                                onMouseMove: onTiltMove,
                                onMouseLeave: onTiltLeave,
                                children: embedHtml ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "embedWrap",
                                    // eslint-disable-next-line react/no-danger
                                    dangerouslySetInnerHTML: {
                                        __html: embedHtml
                                    }
                                }, void 0, false, {
                                    fileName: "[project]/app/components/MediaBlocks.tsx",
                                    lineNumber: 104,
                                    columnNumber: 19
                                }, this) : fileUrl ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "videoWrap",
                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("video", {
                                        controls: true,
                                        playsInline: true,
                                        preload: "metadata",
                                        poster: posterUrl ?? undefined,
                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("source", {
                                            src: fileUrl
                                        }, void 0, false, {
                                            fileName: "[project]/app/components/MediaBlocks.tsx",
                                            lineNumber: 112,
                                            columnNumber: 23
                                        }, this)
                                    }, void 0, false, {
                                        fileName: "[project]/app/components/MediaBlocks.tsx",
                                        lineNumber: 111,
                                        columnNumber: 21
                                    }, this)
                                }, void 0, false, {
                                    fileName: "[project]/app/components/MediaBlocks.tsx",
                                    lineNumber: 110,
                                    columnNumber: 19
                                }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                    type: "button",
                                    className: "singleMedia",
                                    onClick: ()=>setLightboxSrc(imgUrl),
                                    "aria-label": "Open media",
                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("img", {
                                        src: imgUrl,
                                        alt: caption || "",
                                        loading: "lazy"
                                    }, void 0, false, {
                                        fileName: "[project]/app/components/MediaBlocks.tsx",
                                        lineNumber: 123,
                                        columnNumber: 21
                                    }, this)
                                }, void 0, false, {
                                    fileName: "[project]/app/components/MediaBlocks.tsx",
                                    lineNumber: 116,
                                    columnNumber: 19
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/app/components/MediaBlocks.tsx",
                                lineNumber: 97,
                                columnNumber: 15
                            }, this),
                            caption ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "mbCaption",
                                children: caption
                            }, void 0, false, {
                                fileName: "[project]/app/components/MediaBlocks.tsx",
                                lineNumber: 127,
                                columnNumber: 26
                            }, this) : null
                        ]
                    }, `${type}-${idx}`, true, {
                        fileName: "[project]/app/components/MediaBlocks.tsx",
                        lineNumber: 96,
                        columnNumber: 13
                    }, this);
                }
                // --- Showcase Gallery / Gallery ---
                if (type.includes("showcase_gallery") || type.includes("gallery")) {
                    const hoverStyle = String(primary?.hover ?? "zoom").toLowerCase();
                    const imgs = items.map((it)=>({
                            url: asUrl(it?.image ?? it?.img ?? it?.photo ?? it?.media),
                            caption: asText(it?.caption ?? it?.title ?? "")
                        })).filter((x)=>x.url);
                    if (!imgs.length) return null;
                    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("section", {
                        className: "mbSection",
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: `galleryGrid motionReveal ${hoverStyle === "reveal" ? "hoverReveal" : "hoverZoom"}`,
                            children: imgs.map((im, j)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                    type: "button",
                                    className: "galleryItem",
                                    onClick: ()=>setLightboxSrc(im.url),
                                    "aria-label": im.caption ? `Open image: ${im.caption}` : "Open image",
                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("img", {
                                        src: im.url,
                                        alt: im.caption || "",
                                        loading: "lazy"
                                    }, void 0, false, {
                                        fileName: "[project]/app/components/MediaBlocks.tsx",
                                        lineNumber: 156,
                                        columnNumber: 21
                                    }, this)
                                }, `${idx}-g-${j}`, false, {
                                    fileName: "[project]/app/components/MediaBlocks.tsx",
                                    lineNumber: 148,
                                    columnNumber: 19
                                }, this))
                        }, void 0, false, {
                            fileName: "[project]/app/components/MediaBlocks.tsx",
                            lineNumber: 146,
                            columnNumber: 15
                        }, this)
                    }, `${type}-${idx}`, false, {
                        fileName: "[project]/app/components/MediaBlocks.tsx",
                        lineNumber: 145,
                        columnNumber: 13
                    }, this);
                }
                // --- Showcase Embed ---
                if (type.includes("showcase_embed")) {
                    const embedHtml = safeHtml(primary?.embed ?? primary?.content ?? primary?.oembed);
                    const caption = asText(primary?.caption ?? "");
                    if (!embedHtml) return null;
                    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("section", {
                        className: "mbSection motionReveal",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "embedWrap",
                                // eslint-disable-next-line react/no-danger
                                dangerouslySetInnerHTML: {
                                    __html: embedHtml
                                }
                            }, void 0, false, {
                                fileName: "[project]/app/components/MediaBlocks.tsx",
                                lineNumber: 171,
                                columnNumber: 15
                            }, this),
                            caption ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "mbCaption",
                                children: caption
                            }, void 0, false, {
                                fileName: "[project]/app/components/MediaBlocks.tsx",
                                lineNumber: 176,
                                columnNumber: 26
                            }, this) : null
                        ]
                    }, `${type}-${idx}`, true, {
                        fileName: "[project]/app/components/MediaBlocks.tsx",
                        lineNumber: 170,
                        columnNumber: 13
                    }, this);
                }
                // --- Showcase Video (embed or file) ---
                if (type.includes("showcase_video") || type.includes("video")) {
                    const embedHtml = safeHtml(primary?.video ?? primary?.embed ?? primary?.oembed);
                    const fileUrl = asUrl(primary?.video_file ?? primary?.file ?? primary?.media);
                    const posterUrl = asUrl(primary?.poster ?? primary?.poster_image ?? primary?.thumbnail);
                    const caption = asText(primary?.caption ?? primary?.title ?? "");
                    if (!embedHtml && !fileUrl) return null;
                    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("section", {
                        className: "mbSection motionReveal",
                        children: [
                            embedHtml ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "embedWrap",
                                // Prismic embed fields are already HTML; we place them in a responsive wrapper.
                                // eslint-disable-next-line react/no-danger
                                dangerouslySetInnerHTML: {
                                    __html: embedHtml
                                }
                            }, void 0, false, {
                                fileName: "[project]/app/components/MediaBlocks.tsx",
                                lineNumber: 193,
                                columnNumber: 17
                            }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "videoWrap",
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("video", {
                                    controls: true,
                                    playsInline: true,
                                    preload: "metadata",
                                    poster: posterUrl ?? undefined,
                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("source", {
                                        src: fileUrl
                                    }, void 0, false, {
                                        fileName: "[project]/app/components/MediaBlocks.tsx",
                                        lineNumber: 202,
                                        columnNumber: 21
                                    }, this)
                                }, void 0, false, {
                                    fileName: "[project]/app/components/MediaBlocks.tsx",
                                    lineNumber: 201,
                                    columnNumber: 19
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/app/components/MediaBlocks.tsx",
                                lineNumber: 200,
                                columnNumber: 17
                            }, this),
                            caption ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "mbCaption",
                                children: caption
                            }, void 0, false, {
                                fileName: "[project]/app/components/MediaBlocks.tsx",
                                lineNumber: 206,
                                columnNumber: 26
                            }, this) : null
                        ]
                    }, `${type}-${idx}`, true, {
                        fileName: "[project]/app/components/MediaBlocks.tsx",
                        lineNumber: 191,
                        columnNumber: 13
                    }, this);
                }
                // --- Showcase GIF / GIF ---
                if (type.includes("showcase_gif") || type.includes("gif")) {
                    const gifUrl = asUrl(primary?.gif ?? primary?.image ?? primary?.media);
                    const caption = asText(primary?.caption ?? "");
                    if (!gifUrl) return null;
                    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("section", {
                        className: "mbSection motionReveal",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                type: "button",
                                className: "singleMedia",
                                onClick: ()=>setLightboxSrc(gifUrl),
                                "aria-label": "Open GIF",
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("img", {
                                    src: gifUrl,
                                    alt: caption || "",
                                    loading: "lazy"
                                }, void 0, false, {
                                    fileName: "[project]/app/components/MediaBlocks.tsx",
                                    lineNumber: 225,
                                    columnNumber: 17
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/app/components/MediaBlocks.tsx",
                                lineNumber: 218,
                                columnNumber: 15
                            }, this),
                            caption ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "mbCaption",
                                children: caption
                            }, void 0, false, {
                                fileName: "[project]/app/components/MediaBlocks.tsx",
                                lineNumber: 227,
                                columnNumber: 26
                            }, this) : null
                        ]
                    }, `${type}-${idx}`, true, {
                        fileName: "[project]/app/components/MediaBlocks.tsx",
                        lineNumber: 217,
                        columnNumber: 13
                    }, this);
                }
                // --- Showcase Image / Single image ---
                if (type.includes("showcase_image") || type.includes("image") || type.includes("photo")) {
                    const imgUrl = asUrl(primary?.image ?? primary?.photo ?? primary?.media);
                    const caption = asText(primary?.caption ?? "");
                    if (!imgUrl) return null;
                    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("section", {
                        className: "mbSection motionReveal",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                type: "button",
                                className: "singleMedia",
                                onClick: ()=>setLightboxSrc(imgUrl),
                                "aria-label": "Open image",
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("img", {
                                    src: imgUrl,
                                    alt: caption || "",
                                    loading: "lazy"
                                }, void 0, false, {
                                    fileName: "[project]/app/components/MediaBlocks.tsx",
                                    lineNumber: 246,
                                    columnNumber: 17
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/app/components/MediaBlocks.tsx",
                                lineNumber: 239,
                                columnNumber: 15
                            }, this),
                            caption ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "mbCaption",
                                children: caption
                            }, void 0, false, {
                                fileName: "[project]/app/components/MediaBlocks.tsx",
                                lineNumber: 248,
                                columnNumber: 26
                            }, this) : null
                        ]
                    }, `${type}-${idx}`, true, {
                        fileName: "[project]/app/components/MediaBlocks.tsx",
                        lineNumber: 238,
                        columnNumber: 13
                    }, this);
                }
                // --- Showcase Row (2-up / 3-up mixed media) ---
                if (type.includes("showcase_row") || type.includes("media_row") || type.includes("mediarow") || type.includes("media-grid") || type.includes("mediagrid") || type.includes("media_row_grid") || type.includes("row_grid")) {
                    const layoutRaw = String(primary?.layout ?? primary?.columns ?? primary?.grid ?? "").toLowerCase();
                    const cols = variation.includes("three") || variation.includes("3") ? 3 : variation.includes("two") || variation.includes("2") ? 2 : layoutRaw.includes("3") || layoutRaw.includes("three") ? 3 : 2;
                    const cells = items.map((it)=>{
                        const caption = asText(it?.caption ?? it?.title ?? "");
                        const behavior = String(it?.behavior ?? "none").toLowerCase();
                        // Embed (YouTube/Vimeo/etc)
                        const embedHtml = safeHtml(it?.embed ?? it?.oembed ?? it?.video ?? it?.content);
                        if (embedHtml) return {
                            kind: "embed",
                            embedHtml,
                            caption,
                            behavior
                        };
                        // Video file (mp4/webm)
                        const fileUrl = asUrl(it?.video_file ?? it?.file ?? it?.video ?? it?.media);
                        const posterUrl = asUrl(it?.poster ?? it?.poster_image ?? it?.thumbnail);
                        if (fileUrl && String(fileUrl).match(/\.(mp4|webm|mov)(\?|#|$)/i)) {
                            return {
                                kind: "video",
                                fileUrl,
                                posterUrl,
                                caption,
                                behavior
                            };
                        }
                        // Image / GIF
                        const imgUrl = asUrl(it?.image ?? it?.gif ?? it?.img ?? it?.photo ?? it?.media);
                        if (imgUrl) return {
                            kind: "image",
                            imgUrl,
                            caption,
                            behavior
                        };
                        return null;
                    }).filter(Boolean);
                    if (!cells.length) return null;
                    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("section", {
                        className: "mbSection motionReveal",
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: `mediaRowGrid cols${cols}`,
                            children: cells.map((c, j)=>{
                                if (c.kind === "embed") {
                                    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: `mediaCell embedCell ${c.behavior === "parallax" ? "parallax" : ""}`,
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "embedWrap",
                                                // eslint-disable-next-line react/no-danger
                                                dangerouslySetInnerHTML: {
                                                    __html: c.embedHtml
                                                }
                                            }, void 0, false, {
                                                fileName: "[project]/app/components/MediaBlocks.tsx",
                                                lineNumber: 309,
                                                columnNumber: 17
                                            }, this),
                                            c.caption ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "mbCaption",
                                                children: c.caption
                                            }, void 0, false, {
                                                fileName: "[project]/app/components/MediaBlocks.tsx",
                                                lineNumber: 314,
                                                columnNumber: 30
                                            }, this) : null
                                        ]
                                    }, `${idx}-mr-${j}`, true, {
                                        fileName: "[project]/app/components/MediaBlocks.tsx",
                                        lineNumber: 305,
                                        columnNumber: 15
                                    }, this);
                                }
                                if (c.kind === "video") {
                                    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: `mediaCell videoCell ${c.behavior === "parallax" ? "parallax" : ""}`,
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "videoWrap",
                                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("video", {
                                                    controls: true,
                                                    playsInline: true,
                                                    preload: "metadata",
                                                    poster: c.posterUrl ?? undefined,
                                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("source", {
                                                        src: c.fileUrl
                                                    }, void 0, false, {
                                                        fileName: "[project]/app/components/MediaBlocks.tsx",
                                                        lineNumber: 327,
                                                        columnNumber: 21
                                                    }, this)
                                                }, void 0, false, {
                                                    fileName: "[project]/app/components/MediaBlocks.tsx",
                                                    lineNumber: 326,
                                                    columnNumber: 19
                                                }, this)
                                            }, void 0, false, {
                                                fileName: "[project]/app/components/MediaBlocks.tsx",
                                                lineNumber: 325,
                                                columnNumber: 17
                                            }, this),
                                            c.caption ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "mbCaption",
                                                children: c.caption
                                            }, void 0, false, {
                                                fileName: "[project]/app/components/MediaBlocks.tsx",
                                                lineNumber: 330,
                                                columnNumber: 30
                                            }, this) : null
                                        ]
                                    }, `${idx}-mr-${j}`, true, {
                                        fileName: "[project]/app/components/MediaBlocks.tsx",
                                        lineNumber: 321,
                                        columnNumber: 15
                                    }, this);
                                }
                                return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: `mediaCell imageCell ${c.behavior === "tilt" ? "tilt" : ""} ${c.behavior === "parallax" ? "parallax" : ""}`,
                                    "data-tilt": c.behavior === "tilt" ? "true" : "false",
                                    onMouseMove: onTiltMove,
                                    onMouseLeave: onTiltLeave,
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                            type: "button",
                                            className: "singleMedia",
                                            onClick: ()=>setLightboxSrc(c.imgUrl),
                                            "aria-label": c.caption ? `Open image: ${c.caption}` : "Open image",
                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("img", {
                                                src: c.imgUrl,
                                                alt: c.caption || "",
                                                loading: "lazy"
                                            }, void 0, false, {
                                                fileName: "[project]/app/components/MediaBlocks.tsx",
                                                lineNumber: 350,
                                                columnNumber: 17
                                            }, this)
                                        }, void 0, false, {
                                            fileName: "[project]/app/components/MediaBlocks.tsx",
                                            lineNumber: 343,
                                            columnNumber: 15
                                        }, this),
                                        c.caption ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "mbCaption",
                                            children: c.caption
                                        }, void 0, false, {
                                            fileName: "[project]/app/components/MediaBlocks.tsx",
                                            lineNumber: 352,
                                            columnNumber: 28
                                        }, this) : null
                                    ]
                                }, `${idx}-mr-${j}`, true, {
                                    fileName: "[project]/app/components/MediaBlocks.tsx",
                                    lineNumber: 336,
                                    columnNumber: 13
                                }, this);
                            })
                        }, void 0, false, {
                            fileName: "[project]/app/components/MediaBlocks.tsx",
                            lineNumber: 301,
                            columnNumber: 7
                        }, this)
                    }, `${type}-${idx}`, false, {
                        fileName: "[project]/app/components/MediaBlocks.tsx",
                        lineNumber: 300,
                        columnNumber: 5
                    }, this);
                }
                // --- Embed (legacy) ---
                if (type.includes("embed")) {
                    const embedHtml = safeHtml(primary?.embed ?? primary?.content ?? primary?.oembed);
                    const caption = asText(primary?.caption ?? "");
                    if (!embedHtml) return null;
                    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("section", {
                        className: "mbSection motionReveal",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "embedWrap",
                                // eslint-disable-next-line react/no-danger
                                dangerouslySetInnerHTML: {
                                    __html: embedHtml
                                }
                            }, void 0, false, {
                                fileName: "[project]/app/components/MediaBlocks.tsx",
                                lineNumber: 368,
                                columnNumber: 15
                            }, this),
                            caption ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "mbCaption",
                                children: caption
                            }, void 0, false, {
                                fileName: "[project]/app/components/MediaBlocks.tsx",
                                lineNumber: 373,
                                columnNumber: 26
                            }, this) : null
                        ]
                    }, `${type}-${idx}`, true, {
                        fileName: "[project]/app/components/MediaBlocks.tsx",
                        lineNumber: 367,
                        columnNumber: 13
                    }, this);
                }
                // --- Showcase Text / Rich text ---
                if (type.includes("showcase_text") || type.includes("rich") || type.includes("text")) {
                    const kicker = asText(primary?.kicker ?? "");
                    const heading = asText(primary?.heading ?? primary?.title ?? "");
                    const body = asText(primary?.body ?? primary?.text ?? primary?.content);
                    const style = String(primary?.style ?? "plain").toLowerCase();
                    const align = String(primary?.align ?? "left").toLowerCase();
                    if (!kicker && !heading && !body) return null;
                    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("section", {
                        className: `mbSection motionReveal showcaseText ${align}`,
                        children: [
                            kicker ? style === "marquee" ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "marquee",
                                "aria-label": kicker,
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "marqueeTrack",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                            children: kicker
                                        }, void 0, false, {
                                            fileName: "[project]/app/components/MediaBlocks.tsx",
                                            lineNumber: 392,
                                            columnNumber: 23
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                            "aria-hidden": "true",
                                            children: kicker
                                        }, void 0, false, {
                                            fileName: "[project]/app/components/MediaBlocks.tsx",
                                            lineNumber: 393,
                                            columnNumber: 23
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                            "aria-hidden": "true",
                                            children: kicker
                                        }, void 0, false, {
                                            fileName: "[project]/app/components/MediaBlocks.tsx",
                                            lineNumber: 394,
                                            columnNumber: 23
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/app/components/MediaBlocks.tsx",
                                    lineNumber: 391,
                                    columnNumber: 21
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/app/components/MediaBlocks.tsx",
                                lineNumber: 390,
                                columnNumber: 19
                            }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "kicker",
                                children: kicker
                            }, void 0, false, {
                                fileName: "[project]/app/components/MediaBlocks.tsx",
                                lineNumber: 398,
                                columnNumber: 19
                            }, this) : null,
                            heading ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "mbHeading",
                                children: heading
                            }, void 0, false, {
                                fileName: "[project]/app/components/MediaBlocks.tsx",
                                lineNumber: 401,
                                columnNumber: 26
                            }, this) : null,
                            body ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: `mbRich ${style}`,
                                children: body
                            }, void 0, false, {
                                fileName: "[project]/app/components/MediaBlocks.tsx",
                                lineNumber: 402,
                                columnNumber: 23
                            }, this) : null
                        ]
                    }, `${type}-${idx}`, true, {
                        fileName: "[project]/app/components/MediaBlocks.tsx",
                        lineNumber: 387,
                        columnNumber: 13
                    }, this);
                }
                // --- Showcase CTA / Buttons / links ---
                if (type.includes("showcase_cta") || type.includes("button") || type.includes("link")) {
                    const links = items.map((it)=>({
                            label: String(it?.label ?? it?.text ?? it?.title ?? "").trim(),
                            url: asUrl(it?.url ?? it?.link ?? it?.href),
                            variant: String(it?.variant ?? "ghost").toLowerCase()
                        })).filter((x)=>x.label && x.url);
                    if (!links.length) return null;
                    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("section", {
                        className: "mbSection motionReveal",
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "mbButtons",
                            children: links.map((l, j)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("a", {
                                    className: `mbBtn ${l.variant === "primary" ? "primary" : ""}`,
                                    href: l.url,
                                    target: "_blank",
                                    rel: "noreferrer",
                                    children: l.label
                                }, `${idx}-b-${j}`, false, {
                                    fileName: "[project]/app/components/MediaBlocks.tsx",
                                    lineNumber: 421,
                                    columnNumber: 19
                                }, this))
                        }, void 0, false, {
                            fileName: "[project]/app/components/MediaBlocks.tsx",
                            lineNumber: 419,
                            columnNumber: 15
                        }, this)
                    }, `${type}-${idx}`, false, {
                        fileName: "[project]/app/components/MediaBlocks.tsx",
                        lineNumber: 418,
                        columnNumber: 13
                    }, this);
                }
                // Unknown slice type: no-op (keeps the UI resilient)
                return null;
            }),
            lightboxSrc ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "lightbox",
                role: "dialog",
                "aria-modal": "true",
                onClick: ()=>setLightboxSrc(null),
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                        className: "lightboxClose",
                        type: "button",
                        onClick: ()=>setLightboxSrc(null),
                        "aria-label": "Close",
                        children: "✕"
                    }, void 0, false, {
                        fileName: "[project]/app/components/MediaBlocks.tsx",
                        lineNumber: 443,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "lightboxInner",
                        onClick: (e)=>e.stopPropagation(),
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("img", {
                            src: lightboxSrc,
                            alt: ""
                        }, void 0, false, {
                            fileName: "[project]/app/components/MediaBlocks.tsx",
                            lineNumber: 448,
                            columnNumber: 13
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/app/components/MediaBlocks.tsx",
                        lineNumber: 446,
                        columnNumber: 11
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/app/components/MediaBlocks.tsx",
                lineNumber: 442,
                columnNumber: 9
            }, this) : null
        ]
    }, void 0, true, {
        fileName: "[project]/app/components/MediaBlocks.tsx",
        lineNumber: 75,
        columnNumber: 5
    }, this);
}
}),
"[project]/app/HomeSplitClient.tsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>HomeSplitClient
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$components$2f$NewsTickerBar$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/app/components/NewsTickerBar.tsx [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$components$2f$ToolbarIcon$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/app/components/ToolbarIcon.tsx [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$hooks$2f$useBodyScrollLock$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/app/hooks/useBodyScrollLock.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$calendar$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/calendar.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$components$2f$useSmoothWheel$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/app/components/useSmoothWheel.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$components$2f$MediaBlocks$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/app/components/MediaBlocks.tsx [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/navigation.js [app-ssr] (ecmascript)");
"use client";
;
;
;
;
;
;
;
;
;
const WEEKLY_KEY = "__weekly__";
function norm(v) {
    return (v || "").toLowerCase().trim();
}
function endOfWeekSaturdayFromDate(d) {
    const start = startOfWeekSundayFromDate(d);
    const end = new Date(start);
    end.setDate(start.getDate() + 6);
    end.setHours(23, 59, 59, 999);
    return end;
}
function startOfWeekSundayFromDate(d) {
    const x = (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$calendar$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["startOfDay"])(d);
    const offset = x.getDay();
    x.setDate(x.getDate() - offset);
    return x;
}
function endOfWeekFromStart(start) {
    const x = new Date(start);
    x.setDate(x.getDate() + 6);
    x.setHours(23, 59, 59, 999);
    return x;
}
function addDays(d, delta) {
    const x = new Date(d);
    x.setDate(x.getDate() + delta);
    return x;
}
function formatWeekRange(start, end) {
    const sameMonth = start.getMonth() === end.getMonth() && start.getFullYear() === end.getFullYear();
    const startLabel = start.toLocaleDateString(undefined, {
        month: "short",
        day: "numeric"
    });
    const endLabel = end.toLocaleDateString(undefined, sameMonth ? {
        day: "numeric"
    } : {
        month: "short",
        day: "numeric"
    });
    return `${startLabel}–${endLabel}`;
}
const DAY_ABBR = [
    "Sun",
    "Mon",
    "Tue",
    "Wed",
    "Thu",
    "Fri",
    "Sat"
];
function parseDayKey(ymd) {
    if (!ymd) return null;
    // Interpret as local date.
    const d = new Date(`${ymd}T00:00:00`);
    return Number.isNaN(d.getTime()) ? null : d;
}
function monthKey(d) {
    const y = d.getFullYear();
    const m = String(d.getMonth() + 1).padStart(2, "0");
    return `${y}-${m}`;
}
function addMonths(d, delta) {
    const x = new Date(d);
    const day = x.getDate();
    x.setDate(1);
    x.setMonth(x.getMonth() + delta);
    const dim = new Date(x.getFullYear(), x.getMonth() + 1, 0).getDate();
    x.setDate(Math.min(day, dim));
    return x;
}
function formatMonthYear(d) {
    const months = [
        "January",
        "February",
        "March",
        "April",
        "May",
        "June",
        "July",
        "August",
        "September",
        "October",
        "November",
        "December"
    ];
    return `${months[d.getMonth()]} ${d.getFullYear()}`;
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
function buildWeekInsights(items) {
    const buckets = {
        "Live music": 0,
        "Food & drink": 0,
        "Community": 0,
        "Other": 0
    };
    const timeWindows = {
        Morning: 0,
        Afternoon: 0,
        Evening: 0,
        Late: 0
    };
    const dayCounts = new Map();
    for (const e of items){
        const t = (e.event_type || "").toLowerCase();
        if (t.includes("music") || t.includes("concert") || t.includes("show")) buckets["Live music"]++;
        else if (t.includes("food") || t.includes("drink") || t.includes("dining") || t.includes("menu")) buckets["Food & drink"]++;
        else if (t.includes("community") || t.includes("market") || t.includes("fundraiser") || t.includes("family")) buckets["Community"]++;
        else buckets["Other"]++;
        const d = (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$calendar$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["safeDateFromEvent"])(e);
        if (!d) continue;
        const hour = d.getHours();
        if (hour < 12) timeWindows.Morning++;
        else if (hour < 17) timeWindows.Afternoon++;
        else if (hour < 21) timeWindows.Evening++;
        else timeWindows.Late++;
        const dk = (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$calendar$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["dayKey"])(d);
        if (!dayCounts.has(dk)) dayCounts.set(dk, {
            date: (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$calendar$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["startOfDay"])(d),
            count: 0
        });
        dayCounts.get(dk).count += 1;
    }
    const busiestDay = Array.from(dayCounts.values()).sort((a, b)=>b.count - a.count)[0];
    const busiestDayLabel = busiestDay ? `${formatDayHeading(busiestDay.date)} (${busiestDay.count})` : "No events";
    const peakWindow = Object.entries(timeWindows).sort((a, b)=>b[1] - a[1])[0];
    const peakWindowLabel = peakWindow && peakWindow[1] > 0 ? `${peakWindow[0]} (${peakWindow[1]})` : "Time TBD";
    return {
        buckets,
        busiestDayLabel,
        peakWindowLabel
    };
}
function HomeSplitClient({ events }) {
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$components$2f$useSmoothWheel$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useSmoothWheel"])(".scroll");
    const router = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useRouter"])();
    const sp = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useSearchParams"])();
    const pathname = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["usePathname"])();
    const q = sp.get("q") || "";
    const type = sp.get("type") || "";
    const view = sp.get("view") || "list";
    const dayParam = sp.get("day");
    const listRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useRef"])(null);
    const daySectionRefs = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useRef"])({});
    const [scrollDayKey, setScrollDayKey] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(null);
    const leftStickyRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useRef"])(null);
    const [didInitialScroll, setDidInitialScroll] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(false);
    // Staged intro animation (runs once per session): UI first, then list + right content.
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        if ("TURBOPACK compile-time truthy", 1) return;
        //TURBOPACK unreachable
        ;
        const KEY = undefined;
        // Assign indices for CSS-staggered animation.
        const listEl = undefined;
        const t = undefined;
    }, []);
    // default selection = weekly overview
    const selectedParam = sp.get("event");
    // URL drives selection, but on mobile we keep an optimistic client key so the
    // detail panel can update immediately on tap (before the router finishes).
    const [clientSelectedKey, setClientSelectedKey] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(null);
    const selectedKey = clientSelectedKey ?? selectedParam ?? null;
    // Initialize from matchMedia so the first tap on mobile reliably opens detail.
    const [mounted, setMounted] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(false);
    // Hydration-safe: start false so SSR and first client render match.
    const [isMobile, setIsMobile] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(false);
    // Mobile-only filter overlay state (used to show/hide filter pills on small screens)
    const [filterOpen, setFilterOpen] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(false);
    const [mobileOverlayOffset, setMobileOverlayOffset] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(0);
    const effectiveIsMobile = mounted ? isMobile : false;
    const viewMode = view === "month" ? "month" : "list";
    const selectedDisplayKey = selectedKey ?? (!effectiveIsMobile && viewMode === "list" ? WEEKLY_KEY : null);
    const selectedDay = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useMemo"])(()=>{
        const parsed = dayParam ? parseDayKey(dayParam) : null;
        if (parsed) return parsed;
        const source = events.filter((e)=>{
            const hay = norm([
                e.title ?? "",
                e.summary ?? "",
                e.locationName ?? "",
                e.address ?? "",
                e.event_type ?? ""
            ].filter(Boolean).join(" "));
            const matchesSearch = !norm(q) || hay.includes(norm(q));
            const matchesType = !norm(type) || norm(e.event_type ?? "") === norm(type);
            return matchesSearch && matchesType;
        });
        return (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$calendar$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["nearestDayWithEvents"])(source);
    }, [
        dayParam,
        events,
        q,
        type
    ]);
    const selectedDayStr = (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$calendar$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["dayKey"])(selectedDay);
    const monthAnchor = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useMemo"])(()=>{
        const d = new Date(selectedDay);
        d.setDate(1);
        d.setHours(0, 0, 0, 0);
        return d;
    }, [
        selectedDayStr
    ]);
    // Mobile-only: hide the subhead tagline when the user starts scrolling the left list.
    const [taglineHidden, setTaglineHidden] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(false);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        setMounted(true);
        const mq = window.matchMedia("(max-width: 980px)");
        const apply = ()=>setIsMobile(mq.matches);
        apply();
        // Safari < 14 uses addListener/removeListener
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const anyMq = mq;
        if (mq.addEventListener) mq.addEventListener("change", apply);
        else if (anyMq.addListener) anyMq.addListener(apply);
        return ()=>{
            if (mq.removeEventListener) mq.removeEventListener("change", apply);
            else if (anyMq.removeListener) anyMq.removeListener(apply);
        };
    }, []);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        if (!effectiveIsMobile) {
            setMobileOverlayOffset(0);
            return;
        }
        const updateOffset = ()=>{
            setMobileOverlayOffset(leftStickyRef.current?.offsetHeight ?? 0);
        };
        updateOffset();
        window.addEventListener("resize", updateOffset);
        let ro = null;
        if (typeof ResizeObserver !== "undefined" && leftStickyRef.current) {
            ro = new ResizeObserver(()=>updateOffset());
            ro.observe(leftStickyRef.current);
        }
        return ()=>{
            window.removeEventListener("resize", updateOffset);
            ro?.disconnect();
        };
    }, [
        effectiveIsMobile,
        q,
        type,
        viewMode,
        filterOpen
    ]);
    // Keep the optimistic client key in sync with the URL when navigation completes.
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        setClientSelectedKey(selectedParam);
    }, [
        selectedParam
    ]);
    function isMobileNow() {
        if ("TURBOPACK compile-time truthy", 1) return false;
        //TURBOPACK unreachable
        ;
    }
    function pushParams(next) {
        const qs = next.toString();
        router.push(`${pathname}${qs ? `?${qs}` : ""}`);
    }
    function setParam(key, value) {
        const params = new URLSearchParams(sp.toString());
        if (value == null || value === "") params.delete(key);
        else params.set(key, value);
        pushParams(params);
    }
    function setParams(updates) {
        const params = new URLSearchParams(sp.toString());
        for (const [k, v] of Object.entries(updates)){
            if (v == null || v === "") params.delete(k);
            else params.set(k, v);
        }
        pushParams(params);
    }
    const eventTypes = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useMemo"])(()=>{
        const set = new Set();
        for (const e of events)if (e.event_type) set.add(e.event_type);
        return Array.from(set).sort((a, b)=>a.localeCompare(b));
    }, [
        events
    ]);
    const filteredEvents = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useMemo"])(()=>{
        const nq = norm(q);
        const nt = norm(type);
        return events.filter((e)=>{
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
        });
    }, [
        events,
        q,
        type
    ]);
    const dayEvents = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useMemo"])(()=>{
        const key = selectedDayStr;
        return filteredEvents.filter((e)=>{
            const d = (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$calendar$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["safeDateFromEvent"])(e);
            return d ? (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$calendar$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["dayKey"])(d) === key : false;
        });
    }, [
        filteredEvents,
        selectedDayStr
    ]);
    const monthGrid = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useMemo"])(()=>{
        const first = new Date(monthAnchor);
        const startWeekday = first.getDay(); // 0=Sun..6=Sat
        const daysInMonth = new Date(first.getFullYear(), first.getMonth() + 1, 0).getDate();
        const cells = [];
        for(let i = 0; i < startWeekday; i++)cells.push({
            ymd: null,
            hasEvents: false
        });
        for(let d = 1; d <= daysInMonth; d++){
            const dt = new Date(first);
            dt.setDate(d);
            const ymd = (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$calendar$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["dayKey"])(dt);
            const hasEvents = filteredEvents.some((e)=>{
                const ed = (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$calendar$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["safeDateFromEvent"])(e);
                return ed ? (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$calendar$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["dayKey"])(ed) === ymd : false;
            });
            cells.push({
                ymd,
                hasEvents
            });
        }
        // Pad to complete weeks (multiples of 7)
        while(cells.length % 7 !== 0)cells.push({
            ymd: null,
            hasEvents: false
        });
        return {
            first,
            cells
        };
    }, [
        monthAnchor,
        filteredEvents
    ]);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        // Auto-open the only event for a selected day on desktop.
        // On mobile, this can feel "trappy" (Back immediately re-opens), so we skip it.
        if (effectiveIsMobile) return;
        if (viewMode !== "month") return;
        if (dayEvents.length !== 1) return;
        const only = dayEvents[0];
        const key = only.uid ?? only.id;
        if (selectedDisplayKey === key) return;
        setClientSelectedKey(key);
        setParam("event", key);
    }, [
        effectiveIsMobile,
        viewMode,
        selectedDayStr,
        dayEvents,
        selectedDisplayKey
    ]);
    const currentWeekRange = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useMemo"])(()=>{
        const today = (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$calendar$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["startOfToday"])();
        const start = startOfWeekSundayFromDate(today);
        const end = endOfWeekSaturdayFromDate(today);
        return {
            start,
            end
        };
    }, []);
    const leftDayGroups = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useMemo"])(()=>{
        const map = new Map();
        for (const e of filteredEvents){
            const d = (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$calendar$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["safeDateFromEvent"])(e);
            if (!d) continue;
            const dk = (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$calendar$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["dayKey"])(d);
            if (!map.has(dk)) map.set(dk, {
                date: (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$calendar$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["startOfDay"])(d),
                items: []
            });
            map.get(dk).items.push(e);
        }
        const groups = Array.from(map.values()).sort((a, b)=>a.date.getTime() - b.date.getTime());
        for (const g of groups){
            g.items.sort((a, b)=>{
                const da = (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$calendar$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["safeDateFromEvent"])(a)?.getTime() ?? 0;
                const db = (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$calendar$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["safeDateFromEvent"])(b)?.getTime() ?? 0;
                return da - db;
            });
        }
        return groups;
    }, [
        filteredEvents
    ]);
    const displayDayGroups = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useMemo"])(()=>{
        if (!leftDayGroups.length) return leftDayGroups;
        const currentIndex = leftDayGroups.findIndex((group)=>(0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$calendar$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["dayKey"])(group.date) === selectedDayStr);
        if (currentIndex <= 0) return leftDayGroups;
        return [
            ...leftDayGroups.slice(currentIndex),
            ...leftDayGroups.slice(0, currentIndex)
        ];
    }, [
        leftDayGroups,
        selectedDayStr
    ]);
    const currentWeekDayGroups = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useMemo"])(()=>{
        const start = currentWeekRange.start;
        const end = currentWeekRange.end;
        return displayDayGroups.filter((group)=>group.date.getTime() >= start.getTime() && group.date.getTime() <= end.getTime());
    }, [
        currentWeekRange,
        displayDayGroups
    ]);
    const dayJumpDates = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useMemo"])(()=>{
        const map = new Map();
        for (const group of currentWeekDayGroups){
            const idx = group.date.getDay();
            if (!map.has(idx)) map.set(idx, group.date);
        }
        return DAY_ABBR.map((label, idx)=>({
                label,
                index: idx,
                date: map.get(idx) ?? null
            }));
    }, [
        currentWeekDayGroups
    ]);
    function getListScrollOffset() {
        const stickyH = leftStickyRef.current?.offsetHeight ?? 0;
        return Math.max(stickyH + 10, 24);
    }
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        const root = listRef.current;
        if (!root || didInitialScroll || viewMode !== "list" || !leftDayGroups.length) return;
        const scrollToAnchor = ()=>{
            // On the default page load, keep the list at the natural top so the
            // Weekly Overview card starts directly underneath the sticky search /
            // filter controls instead of being scrolled up behind them.
            if (!dayParam) {
                root.scrollTop = 0;
                syncVisibleDayFromScroll(0);
                setScrollDayKey((0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$calendar$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["dayKey"])(leftDayGroups[0].date));
                setDidInitialScroll(true);
                return;
            }
            const target = daySectionRefs.current[selectedDayStr];
            const top = target ? Math.max(target.offsetTop - getListScrollOffset(), 0) : 0;
            root.scrollTop = top;
            syncVisibleDayFromScroll(top);
            setScrollDayKey(selectedDayStr);
            setDidInitialScroll(true);
        };
        window.requestAnimationFrame(scrollToAnchor);
    }, [
        dayParam,
        didInitialScroll,
        leftDayGroups,
        selectedDayStr,
        viewMode
    ]);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        if (dayParam) setDidInitialScroll(true);
    }, [
        dayParam
    ]);
    function syncVisibleDayFromScroll(scrollTop) {
        const root = listRef.current;
        if (!root) return;
        const threshold = scrollTop + getListScrollOffset() + 16;
        let active = currentWeekDayGroups[0]?.date ? (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$calendar$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["dayKey"])(currentWeekDayGroups[0].date) : null;
        for (const group of currentWeekDayGroups){
            const key = (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$calendar$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["dayKey"])(group.date);
            const el = daySectionRefs.current[key];
            if (!el) continue;
            if (el.offsetTop <= threshold) active = key;
            else break;
        }
        if (active && active !== scrollDayKey) setScrollDayKey(active);
    }
    function jumpToDay(target) {
        const key = (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$calendar$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["dayKey"])(target);
        const scrollNow = ()=>{
            const root = listRef.current;
            const el = daySectionRefs.current[key];
            if (!root || !el) return false;
            const top = Math.max(el.offsetTop - getListScrollOffset(), 0);
            root.scrollTo({
                top,
                behavior: "smooth"
            });
            syncVisibleDayFromScroll(top);
            return true;
        };
        setDidInitialScroll(true);
        setScrollDayKey(key);
        setClientSelectedKey(null);
        // Scroll immediately against the current DOM so the first tap always works,
        // then sync the URL and retry once after React/router updates settle.
        scrollNow();
        setParams({
            day: key,
            event: null
        });
        window.requestAnimationFrame(()=>{
            if (scrollNow()) return;
            window.setTimeout(scrollNow, 80);
        });
    }
    const weekBuckets = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useMemo"])(()=>{
        const currentStart = currentWeekRange.start;
        const currentEnd = currentWeekRange.end;
        const nextWeekStart = addDays(startOfWeekSundayFromDate(currentStart), 7);
        return Array.from({
            length: 5
        }, (_, index)=>{
            const start = index === 0 ? currentStart : addDays(nextWeekStart, (index - 1) * 7);
            const end = index === 0 ? currentEnd : endOfWeekFromStart(start);
            const eventsInRange = filteredEvents.map((e)=>({
                    e,
                    d: (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$calendar$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["safeDateFromEvent"])(e)
                })).filter(({ d })=>d && d.getTime() >= start.getTime() && d.getTime() <= end.getTime()).sort((a, b)=>a.d.getTime() - b.d.getTime()).map(({ e })=>e);
            const groupsMap = new Map();
            for (const e of eventsInRange){
                const d = (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$calendar$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["safeDateFromEvent"])(e);
                if (!d) continue;
                const dk = (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$calendar$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["dayKey"])(d);
                if (!groupsMap.has(dk)) groupsMap.set(dk, {
                    date: (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$calendar$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["startOfDay"])(d),
                    items: []
                });
                groupsMap.get(dk).items.push(e);
            }
            const groups = Array.from(groupsMap.values()).sort((a, b)=>a.date.getTime() - b.date.getTime());
            for (const group of groups){
                group.items.sort((a, b)=>((0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$calendar$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["safeDateFromEvent"])(a)?.getTime() ?? 0) - ((0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$calendar$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["safeDateFromEvent"])(b)?.getTime() ?? 0));
            }
            const { buckets, busiestDayLabel, peakWindowLabel } = buildWeekInsights(eventsInRange);
            return {
                key: `__week__:${(0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$calendar$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["dayKey"])(start)}`,
                label: index === 0 ? "This Week" : `Week ${index + 1}`,
                rangeLabel: formatWeekRange(start, end),
                start,
                end,
                events: eventsInRange,
                groups,
                insights: buckets,
                busiestDayLabel,
                peakWindowLabel
            };
        });
    }, [
        filteredEvents,
        currentWeekRange
    ]);
    const defaultWeekBucket = weekBuckets[0] ?? null;
    const selectedWeekBucket = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useMemo"])(()=>{
        if (selectedDisplayKey === WEEKLY_KEY) return defaultWeekBucket;
        if (!selectedDisplayKey?.startsWith("__week__:")) return null;
        return weekBuckets.find((bucket)=>bucket.key === selectedDisplayKey) ?? defaultWeekBucket;
    }, [
        defaultWeekBucket,
        selectedDisplayKey,
        weekBuckets
    ]);
    const weekEvents = selectedWeekBucket?.events ?? [];
    const weekEventsCount = weekEvents.length;
    const weekLabel = selectedWeekBucket?.rangeLabel ?? defaultWeekBucket?.rangeLabel ?? "";
    const weekInsights = selectedWeekBucket?.insights ?? {
        "Live music": 0,
        "Food & drink": 0,
        "Community": 0,
        "Other": 0
    };
    const weekGroups = selectedWeekBucket?.groups ?? [];
    const selectedEvent = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useMemo"])(()=>{
        if (!filteredEvents.length) return null;
        if (selectedDisplayKey === WEEKLY_KEY) return null;
        const byUid = selectedDisplayKey && filteredEvents.find((e)=>e.uid && e.uid === selectedDisplayKey);
        const byId = selectedDisplayKey && filteredEvents.find((e)=>e.id === selectedDisplayKey);
        return byUid || byId || null;
    }, [
        filteredEvents,
        selectedDisplayKey
    ]);
    const currentDisplayDayKey = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useMemo"])(()=>{
        if (selectedEvent) {
            const d = (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$calendar$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["safeDateFromEvent"])(selectedEvent);
            if (d) return (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$calendar$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["dayKey"])(d);
        }
        return scrollDayKey ?? selectedDayStr;
    }, [
        scrollDayKey,
        selectedDayStr,
        selectedEvent
    ]);
    const detailFlashKey = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useMemo"])(()=>{
        if (!selectedEvent) return "none";
        return `${selectedEvent.uid ?? selectedEvent.id ?? "event"}|${selectedDisplayKey}|${viewMode}|${q}|${type}`;
    }, [
        selectedEvent,
        selectedDisplayKey,
        viewMode,
        q,
        type
    ]);
    // stagger counter for left list
    let listAnimIndex = 0;
    // Close filter overlay when leaving mobile.
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        if (!effectiveIsMobile) setFilterOpen(false);
    }, [
        effectiveIsMobile
    ]);
    // On mobile, ensure route switches (Calendar/Directory/Updates) never carry a stuck detail overlay.
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        if (!effectiveIsMobile) return;
        setClientSelectedKey(null);
        if (sp.get("event")) setParam("event", null);
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [
        pathname
    ]);
    // Ensure tagline is visible again when leaving mobile.
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        if (!effectiveIsMobile) setTaglineHidden(false);
    }, [
        effectiveIsMobile
    ]);
    const mobileWeeklyOpen = effectiveIsMobile && !!selectedDisplayKey && (selectedDisplayKey === WEEKLY_KEY || selectedDisplayKey.startsWith("__week__:"));
    const mobileDetailOpen = effectiveIsMobile && (!!selectedEvent || mobileWeeklyOpen);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$hooks$2f$useBodyScrollLock$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useBodyScrollLock"])(mobileDetailOpen);
    const showLeft = true;
    // Desktop shows the split detail pane; mobile uses an overlay for details.
    const showRight = !effectiveIsMobile;
    // Right pane content helpers
    const selectedImg = selectedEvent ? pickImageUrl(selectedEvent) : null;
    const selectedDesc = selectedEvent ? pickDescriptionText(selectedEvent) : null;
    const selectedTime = selectedEvent ? (()=>{
        const d = (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$calendar$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["safeDateFromEvent"])(selectedEvent);
        return d ? formatTimeLabel(d) : "Time TBD";
    })() : null;
    const newsTickerItems = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useMemo"])(()=>{
        const upcoming = [
            ...events
        ].map((event)=>({
                event,
                date: (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$calendar$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["safeDateFromEvent"])(event)
            })).filter((entry)=>!!entry.date).filter(({ date })=>date.getTime() >= (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$calendar$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["startOfToday"])().getTime()).sort((a, b)=>a.date.getTime() - b.date.getTime()).slice(0, 6).map(({ event, date })=>({
                label: event.event_type ? event.event_type.toUpperCase() : "NEWS",
                text: `${event.title ?? event.summary ?? "Upcoming event"} • ${event.locationName ?? "Lancaster"} • ${formatTimeLabel(date)}`,
                href: "#"
            }));
        return upcoming.length ? upcoming : [
            {
                label: "NEWS",
                text: "Upcoming Lancaster events, specials, and pop-ups.",
                href: "#"
            }
        ];
    }, [
        events
    ]);
    const navigableEvents = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useMemo"])(()=>{
        return [
            ...filteredEvents
        ].sort((a, b)=>{
            const da = (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$calendar$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["safeDateFromEvent"])(a)?.getTime() ?? Number.MAX_SAFE_INTEGER;
            const db = (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$calendar$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["safeDateFromEvent"])(b)?.getTime() ?? Number.MAX_SAFE_INTEGER;
            if (da !== db) return da - db;
            return (a.title ?? "").localeCompare(b.title ?? "");
        });
    }, [
        filteredEvents
    ]);
    const selectedEventIndex = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useMemo"])(()=>{
        if (!selectedEvent) return -1;
        return navigableEvents.findIndex((e)=>selectedEvent.uid && e.uid ? e.uid === selectedEvent.uid : e.id === selectedEvent.id);
    }, [
        navigableEvents,
        selectedEvent
    ]);
    const previousEventKey = selectedEventIndex > 0 ? navigableEvents[selectedEventIndex - 1].uid ?? navigableEvents[selectedEventIndex - 1].id : null;
    const nextEventKey = selectedEventIndex >= 0 && selectedEventIndex < navigableEvents.length - 1 ? navigableEvents[selectedEventIndex + 1].uid ?? navigableEvents[selectedEventIndex + 1].id : null;
    function clearSelected() {
        setClientSelectedKey(null);
        setParam("event", null);
    }
    function openSelected(key) {
        setClientSelectedKey(key);
        setParam("event", key);
    }
    function openWeek(key) {
        setClientSelectedKey(key);
        setParam("event", key);
    }
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Fragment"], {
        children: [
            !(effectiveIsMobile && mobileDetailOpen) ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$app$2f$components$2f$NewsTickerBar$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {
                introText: "A calendar of events, specials, and pop-ups in Lancaster, PA.",
                items: newsTickerItems
            }, void 0, false, {
                fileName: "[project]/app/HomeSplitClient.tsx",
                lineNumber: 802,
                columnNumber: 7
            }, this) : null,
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "pageShell",
                "data-mobile-detail-open": mobileDetailOpen ? "true" : "false",
                style: effectiveIsMobile ? {
                    ["--mobileOverlayOffset"]: `${mobileOverlayOffset}px`
                } : undefined,
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "split",
                        children: [
                            ("TURBOPACK compile-time truthy", 1) ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("aside", {
                                className: "pane paneLeft",
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "scroll",
                                    ref: listRef,
                                    onScroll: (e)=>{
                                        const st = e.currentTarget.scrollTop;
                                        if (effectiveIsMobile) setTaglineHidden(st > 2);
                                        syncVisibleDayFromScroll(st);
                                    },
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "leftSticky",
                                            ref: leftStickyRef,
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "tabs",
                                                    "aria-label": "Primary navigation",
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                            type: "button",
                                                            className: "tabBtn",
                                                            "data-active": pathname === "/" ? "true" : "false",
                                                            onClick: ()=>router.push("/"),
                                                            children: "Calendar"
                                                        }, void 0, false, {
                                                            fileName: "[project]/app/HomeSplitClient.tsx",
                                                            lineNumber: 824,
                                                            columnNumber: 19
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                            type: "button",
                                                            className: "tabBtn",
                                                            "data-active": pathname?.startsWith("/locations") ? "true" : "false",
                                                            onClick: ()=>router.push("/locations"),
                                                            children: "Directory"
                                                        }, void 0, false, {
                                                            fileName: "[project]/app/HomeSplitClient.tsx",
                                                            lineNumber: 832,
                                                            columnNumber: 19
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                            type: "button",
                                                            className: "tabBtn",
                                                            "data-active": pathname?.startsWith("/updates") ? "true" : "false",
                                                            onClick: ()=>router.push("/updates"),
                                                            children: "Updates"
                                                        }, void 0, false, {
                                                            fileName: "[project]/app/HomeSplitClient.tsx",
                                                            lineNumber: 840,
                                                            columnNumber: 19
                                                        }, this)
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/app/HomeSplitClient.tsx",
                                                    lineNumber: 823,
                                                    columnNumber: 17
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "leftControls",
                                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        className: "calendarToolbar",
                                                        children: [
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                className: "dayJumpRail",
                                                                "aria-label": "Jump to day",
                                                                children: dayJumpDates.map((entry)=>{
                                                                    const isActive = currentDisplayDayKey ? entry.date ? (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$calendar$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["dayKey"])(entry.date) === currentDisplayDayKey : entry.index === parseDayKey(currentDisplayDayKey)?.getDay() : false;
                                                                    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                                        type: "button",
                                                                        className: "dayJumpBtn",
                                                                        "data-active": isActive ? "true" : "false",
                                                                        disabled: !entry.date,
                                                                        onClick: ()=>entry.date && jumpToDay(entry.date),
                                                                        "aria-label": entry.date ? `Jump to ${entry.label}` : `${entry.label} has no events`,
                                                                        children: entry.label.slice(0, 1)
                                                                    }, entry.label, false, {
                                                                        fileName: "[project]/app/HomeSplitClient.tsx",
                                                                        lineNumber: 861,
                                                                        columnNumber: 27
                                                                    }, this);
                                                                })
                                                            }, void 0, false, {
                                                                fileName: "[project]/app/HomeSplitClient.tsx",
                                                                lineNumber: 852,
                                                                columnNumber: 21
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                className: `searchRow calendarSearchRow${effectiveIsMobile ? " calendarSearchRowMobile" : ""}`,
                                                                children: [
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                                                        className: "searchInput",
                                                                        placeholder: "Search events…",
                                                                        value: q,
                                                                        onChange: (e)=>setParam("q", e.target.value),
                                                                        "aria-label": "Search events"
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/app/HomeSplitClient.tsx",
                                                                        lineNumber: 877,
                                                                        columnNumber: 23
                                                                    }, this),
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                                        type: "button",
                                                                        className: `viewBtn iconBtn${!effectiveIsMobile ? " squareIconBtn" : ""}`,
                                                                        "aria-label": viewMode === "month" ? "Switch to list view" : "Switch to calendar view",
                                                                        onClick: ()=>{
                                                                            clearSelected();
                                                                            setFilterOpen(false);
                                                                            setParam("view", viewMode === "month" ? "list" : "month");
                                                                        },
                                                                        children: [
                                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$app$2f$components$2f$ToolbarIcon$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {
                                                                                src: "/icons/calendar-alt.svg",
                                                                                alt: "Calendar view"
                                                                            }, void 0, false, {
                                                                                fileName: "[project]/app/HomeSplitClient.tsx",
                                                                                lineNumber: 894,
                                                                                columnNumber: 25
                                                                            }, this),
                                                                            effectiveIsMobile ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                                children: viewMode === "month" ? "List" : "Calendar"
                                                                            }, void 0, false, {
                                                                                fileName: "[project]/app/HomeSplitClient.tsx",
                                                                                lineNumber: 895,
                                                                                columnNumber: 46
                                                                            }, this) : null
                                                                        ]
                                                                    }, void 0, true, {
                                                                        fileName: "[project]/app/HomeSplitClient.tsx",
                                                                        lineNumber: 884,
                                                                        columnNumber: 23
                                                                    }, this),
                                                                    effectiveIsMobile ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                                        type: "button",
                                                                        className: "filterBtn",
                                                                        "aria-label": filterOpen ? "Close filters" : "Open filters",
                                                                        "aria-expanded": filterOpen ? "true" : "false",
                                                                        "data-active": filterOpen || !!type ? "true" : "false",
                                                                        onClick: ()=>setFilterOpen((v)=>!v),
                                                                        children: [
                                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$app$2f$components$2f$ToolbarIcon$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {
                                                                                src: "/icons/filter.svg",
                                                                                alt: "Filter"
                                                                            }, void 0, false, {
                                                                                fileName: "[project]/app/HomeSplitClient.tsx",
                                                                                lineNumber: 906,
                                                                                columnNumber: 27
                                                                            }, this),
                                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                                children: type ? `Filter: ${type}` : "Filter"
                                                                            }, void 0, false, {
                                                                                fileName: "[project]/app/HomeSplitClient.tsx",
                                                                                lineNumber: 907,
                                                                                columnNumber: 27
                                                                            }, this)
                                                                        ]
                                                                    }, void 0, true, {
                                                                        fileName: "[project]/app/HomeSplitClient.tsx",
                                                                        lineNumber: 898,
                                                                        columnNumber: 25
                                                                    }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                                        type: "button",
                                                                        className: "filterBtn filterBtnSquare squareIconBtn",
                                                                        "aria-label": filterOpen ? "Close filters" : "Open filters",
                                                                        "aria-expanded": filterOpen ? "true" : "false",
                                                                        "data-active": filterOpen || !!type ? "true" : "false",
                                                                        onClick: ()=>setFilterOpen((v)=>!v),
                                                                        children: [
                                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$app$2f$components$2f$ToolbarIcon$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {
                                                                                src: "/icons/filter.svg",
                                                                                alt: "Filter"
                                                                            }, void 0, false, {
                                                                                fileName: "[project]/app/HomeSplitClient.tsx",
                                                                                lineNumber: 918,
                                                                                columnNumber: 27
                                                                            }, this),
                                                                            !effectiveIsMobile ? null : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                                children: type ? "Filtered" : "Filter"
                                                                            }, void 0, false, {
                                                                                fileName: "[project]/app/HomeSplitClient.tsx",
                                                                                lineNumber: 919,
                                                                                columnNumber: 56
                                                                            }, this)
                                                                        ]
                                                                    }, void 0, true, {
                                                                        fileName: "[project]/app/HomeSplitClient.tsx",
                                                                        lineNumber: 910,
                                                                        columnNumber: 25
                                                                    }, this),
                                                                    !effectiveIsMobile && (q || type) ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                                        className: "clearBtn",
                                                                        onClick: ()=>{
                                                                            setParam("q", null);
                                                                            setParam("type", null);
                                                                        },
                                                                        type: "button",
                                                                        children: "Clear"
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/app/HomeSplitClient.tsx",
                                                                        lineNumber: 923,
                                                                        columnNumber: 25
                                                                    }, this) : null
                                                                ]
                                                            }, void 0, true, {
                                                                fileName: "[project]/app/HomeSplitClient.tsx",
                                                                lineNumber: 876,
                                                                columnNumber: 21
                                                            }, this)
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/app/HomeSplitClient.tsx",
                                                        lineNumber: 851,
                                                        columnNumber: 19
                                                    }, this)
                                                }, void 0, false, {
                                                    fileName: "[project]/app/HomeSplitClient.tsx",
                                                    lineNumber: 850,
                                                    columnNumber: 17
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/app/HomeSplitClient.tsx",
                                            lineNumber: 822,
                                            columnNumber: 15
                                        }, this),
                                        !effectiveIsMobile ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "filterDropdown",
                                            "data-open": filterOpen ? "true" : "false",
                                            "aria-hidden": filterOpen ? "false" : "true",
                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "filterDropdownInner",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        className: "typePills",
                                                        role: "group",
                                                        "aria-label": "Event type filters",
                                                        children: [
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                                type: "button",
                                                                className: "typePill",
                                                                "data-active": !type ? "true" : "false",
                                                                onClick: ()=>{
                                                                    setParam("type", null);
                                                                    setFilterOpen(false);
                                                                },
                                                                children: "All"
                                                            }, void 0, false, {
                                                                fileName: "[project]/app/HomeSplitClient.tsx",
                                                                lineNumber: 948,
                                                                columnNumber: 23
                                                            }, this),
                                                            eventTypes.map((t)=>{
                                                                const on = norm(type) === norm(t);
                                                                return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                                    type: "button",
                                                                    className: "typePill",
                                                                    "data-active": on ? "true" : "false",
                                                                    onClick: ()=>{
                                                                        setParam("type", on ? null : t);
                                                                        setFilterOpen(false);
                                                                    },
                                                                    children: t
                                                                }, t, false, {
                                                                    fileName: "[project]/app/HomeSplitClient.tsx",
                                                                    lineNumber: 962,
                                                                    columnNumber: 27
                                                                }, this);
                                                            })
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/app/HomeSplitClient.tsx",
                                                        lineNumber: 947,
                                                        columnNumber: 21
                                                    }, this),
                                                    q || type ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                        type: "button",
                                                        className: "filterDropdownClear",
                                                        onClick: ()=>{
                                                            setParam("q", null);
                                                            setParam("type", null);
                                                            setFilterOpen(false);
                                                        },
                                                        children: "Clear search & filters"
                                                    }, void 0, false, {
                                                        fileName: "[project]/app/HomeSplitClient.tsx",
                                                        lineNumber: 978,
                                                        columnNumber: 23
                                                    }, this) : null
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/app/HomeSplitClient.tsx",
                                                lineNumber: 946,
                                                columnNumber: 19
                                            }, this)
                                        }, void 0, false, {
                                            fileName: "[project]/app/HomeSplitClient.tsx",
                                            lineNumber: 941,
                                            columnNumber: 17
                                        }, this) : null,
                                        effectiveIsMobile && filterOpen ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "filterOverlay",
                                            role: "dialog",
                                            "aria-modal": "true",
                                            "aria-label": "Filters",
                                            onClick: ()=>setFilterOpen(false),
                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "filterOverlayPanel",
                                                onClick: (e)=>e.stopPropagation(),
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        className: "filterOverlayHeader",
                                                        children: [
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                className: "filterOverlayTitle",
                                                                children: "Filters"
                                                            }, void 0, false, {
                                                                fileName: "[project]/app/HomeSplitClient.tsx",
                                                                lineNumber: 1005,
                                                                columnNumber: 23
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                                type: "button",
                                                                className: "filterOverlayClose",
                                                                onClick: ()=>setFilterOpen(false),
                                                                "aria-label": "Close filters",
                                                                children: "✕"
                                                            }, void 0, false, {
                                                                fileName: "[project]/app/HomeSplitClient.tsx",
                                                                lineNumber: 1006,
                                                                columnNumber: 23
                                                            }, this)
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/app/HomeSplitClient.tsx",
                                                        lineNumber: 1004,
                                                        columnNumber: 21
                                                    }, this),
                                                    q || type ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                        type: "button",
                                                        className: "filterOverlayClear",
                                                        onClick: ()=>{
                                                            setParam("q", null);
                                                            setParam("type", null);
                                                            setFilterOpen(false);
                                                        },
                                                        children: "Clear search & filters"
                                                    }, void 0, false, {
                                                        fileName: "[project]/app/HomeSplitClient.tsx",
                                                        lineNumber: 1017,
                                                        columnNumber: 23
                                                    }, this) : null,
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        className: "typePills",
                                                        role: "group",
                                                        "aria-label": "Event type filters",
                                                        children: [
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                                type: "button",
                                                                className: "typePill",
                                                                "data-active": !type ? "true" : "false",
                                                                onClick: ()=>{
                                                                    setParam("type", null);
                                                                    setFilterOpen(false);
                                                                },
                                                                children: "All"
                                                            }, void 0, false, {
                                                                fileName: "[project]/app/HomeSplitClient.tsx",
                                                                lineNumber: 1031,
                                                                columnNumber: 23
                                                            }, this),
                                                            eventTypes.map((t)=>{
                                                                const on = norm(type) === norm(t);
                                                                return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                                    type: "button",
                                                                    className: "typePill",
                                                                    "data-active": on ? "true" : "false",
                                                                    onClick: ()=>{
                                                                        setParam("type", on ? null : t);
                                                                        setFilterOpen(false);
                                                                    },
                                                                    children: t
                                                                }, t, false, {
                                                                    fileName: "[project]/app/HomeSplitClient.tsx",
                                                                    lineNumber: 1045,
                                                                    columnNumber: 27
                                                                }, this);
                                                            })
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/app/HomeSplitClient.tsx",
                                                        lineNumber: 1030,
                                                        columnNumber: 21
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/app/HomeSplitClient.tsx",
                                                lineNumber: 1003,
                                                columnNumber: 19
                                            }, this)
                                        }, void 0, false, {
                                            fileName: "[project]/app/HomeSplitClient.tsx",
                                            lineNumber: 996,
                                            columnNumber: 17
                                        }, this) : null,
                                        viewMode === "list" ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Fragment"], {
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                    type: "button",
                                                    className: "weeklyOverview fadeInItem",
                                                    style: {
                                                        animationDelay: `${listAnimIndex++ * 35}ms`
                                                    },
                                                    "data-active": selectedDisplayKey === WEEKLY_KEY ? "true" : "false",
                                                    onClick: ()=>openWeek(WEEKLY_KEY),
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                            className: "weeklyTitle",
                                                            children: "Weekly Overview"
                                                        }, void 0, false, {
                                                            fileName: "[project]/app/HomeSplitClient.tsx",
                                                            lineNumber: 1074,
                                                            columnNumber: 21
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                            className: "weeklyCount",
                                                            children: [
                                                                defaultWeekBucket?.events.length ?? 0,
                                                                " event",
                                                                (defaultWeekBucket?.events.length ?? 0) === 1 ? "" : "s",
                                                                " left this week"
                                                            ]
                                                        }, void 0, true, {
                                                            fileName: "[project]/app/HomeSplitClient.tsx",
                                                            lineNumber: 1075,
                                                            columnNumber: 21
                                                        }, this)
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/app/HomeSplitClient.tsx",
                                                    lineNumber: 1067,
                                                    columnNumber: 19
                                                }, this),
                                                displayDayGroups.length === 0 ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "emptyList",
                                                    children: "No events match your search."
                                                }, void 0, false, {
                                                    fileName: "[project]/app/HomeSplitClient.tsx",
                                                    lineNumber: 1081,
                                                    columnNumber: 17
                                                }, this) : null,
                                                displayDayGroups.map((g)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("section", {
                                                        className: "dayBlock",
                                                        ref: (el)=>{
                                                            daySectionRefs.current[(0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$calendar$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["dayKey"])(g.date)] = el;
                                                        },
                                                        children: [
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                className: "dayTitle",
                                                                children: formatDayHeading(g.date)
                                                            }, void 0, false, {
                                                                fileName: "[project]/app/HomeSplitClient.tsx",
                                                                lineNumber: 1087,
                                                                columnNumber: 19
                                                            }, this),
                                                            g.items.map((e)=>{
                                                                const active = selectedEvent?.id === e.id || selectedEvent?.uid && e.uid && selectedEvent.uid === e.uid;
                                                                const title = e.title || "Untitled event";
                                                                const d = (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$calendar$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["safeDateFromEvent"])(e);
                                                                const timeLabel = d ? formatTimeLabel(d) : "Time TBD";
                                                                return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                                    className: "eventRow fadeInItem",
                                                                    style: {
                                                                        animationDelay: `${listAnimIndex++ * 35}ms`
                                                                    },
                                                                    "data-active": active ? "true" : "false",
                                                                    "data-past": (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$calendar$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["eventHasEnded"])(e) ? "true" : "false",
                                                                    onClick: ()=>{
                                                                        const key = e.uid ?? e.id;
                                                                        setClientSelectedKey(key);
                                                                        setParam("event", key);
                                                                    },
                                                                    type: "button",
                                                                    children: [
                                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                            className: "eventRowTitle",
                                                                            children: title
                                                                        }, void 0, false, {
                                                                            fileName: "[project]/app/HomeSplitClient.tsx",
                                                                            lineNumber: 1113,
                                                                            columnNumber: 25
                                                                        }, this),
                                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                            className: "eventRowMeta",
                                                                            children: [
                                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                                    children: timeLabel
                                                                                }, void 0, false, {
                                                                                    fileName: "[project]/app/HomeSplitClient.tsx",
                                                                                    lineNumber: 1115,
                                                                                    columnNumber: 27
                                                                                }, this),
                                                                                e.event_type ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                                    className: "dot",
                                                                                    children: "•"
                                                                                }, void 0, false, {
                                                                                    fileName: "[project]/app/HomeSplitClient.tsx",
                                                                                    lineNumber: 1116,
                                                                                    columnNumber: 43
                                                                                }, this) : null,
                                                                                e.event_type ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                                    children: e.event_type
                                                                                }, void 0, false, {
                                                                                    fileName: "[project]/app/HomeSplitClient.tsx",
                                                                                    lineNumber: 1117,
                                                                                    columnNumber: 43
                                                                                }, this) : null
                                                                            ]
                                                                        }, void 0, true, {
                                                                            fileName: "[project]/app/HomeSplitClient.tsx",
                                                                            lineNumber: 1114,
                                                                            columnNumber: 25
                                                                        }, this),
                                                                        (()=>{
                                                                            const raw = (e.summary ?? "") || (pickDescriptionText(e) ?? "");
                                                                            const s = (raw || "").trim();
                                                                            if (!s) return null;
                                                                            return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                                className: "eventRowDesc",
                                                                                children: s.length > 180 ? `${s.slice(0, 180).trim()}…` : s
                                                                            }, void 0, false, {
                                                                                fileName: "[project]/app/HomeSplitClient.tsx",
                                                                                lineNumber: 1125,
                                                                                columnNumber: 29
                                                                            }, this);
                                                                        })()
                                                                    ]
                                                                }, e.id, true, {
                                                                    fileName: "[project]/app/HomeSplitClient.tsx",
                                                                    lineNumber: 1099,
                                                                    columnNumber: 23
                                                                }, this);
                                                            })
                                                        ]
                                                    }, (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$calendar$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["dayKey"])(g.date), true, {
                                                        fileName: "[project]/app/HomeSplitClient.tsx",
                                                        lineNumber: 1086,
                                                        columnNumber: 17
                                                    }, this))
                                            ]
                                        }, void 0, true) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Fragment"], {
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "monthWrap",
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                            className: "monthHeader",
                                                            children: [
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                                    type: "button",
                                                                    className: "monthNavBtn",
                                                                    "aria-label": "Previous month",
                                                                    onClick: ()=>{
                                                                        const prev = addMonths(monthAnchor, -1);
                                                                        const d = new Date(prev);
                                                                        d.setDate(1);
                                                                        // clear selected event so the day list is visible
                                                                        setClientSelectedKey(null);
                                                                        setParams({
                                                                            day: (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$calendar$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["dayKey"])(d),
                                                                            event: null
                                                                        });
                                                                    },
                                                                    children: "‹"
                                                                }, void 0, false, {
                                                                    fileName: "[project]/app/HomeSplitClient.tsx",
                                                                    lineNumber: 1141,
                                                                    columnNumber: 23
                                                                }, this),
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                    className: "monthTitle",
                                                                    children: formatMonthYear(monthGrid.first)
                                                                }, void 0, false, {
                                                                    fileName: "[project]/app/HomeSplitClient.tsx",
                                                                    lineNumber: 1156,
                                                                    columnNumber: 23
                                                                }, this),
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                                    type: "button",
                                                                    className: "monthNavBtn",
                                                                    "aria-label": "Next month",
                                                                    onClick: ()=>{
                                                                        const next = addMonths(monthAnchor, 1);
                                                                        const d = new Date(next);
                                                                        d.setDate(1);
                                                                        setClientSelectedKey(null);
                                                                        setParams({
                                                                            day: (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$calendar$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["dayKey"])(d),
                                                                            event: null
                                                                        });
                                                                    },
                                                                    children: "›"
                                                                }, void 0, false, {
                                                                    fileName: "[project]/app/HomeSplitClient.tsx",
                                                                    lineNumber: 1157,
                                                                    columnNumber: 23
                                                                }, this)
                                                            ]
                                                        }, void 0, true, {
                                                            fileName: "[project]/app/HomeSplitClient.tsx",
                                                            lineNumber: 1140,
                                                            columnNumber: 21
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                            className: "weekdayRow",
                                                            "aria-hidden": "true",
                                                            children: [
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                    children: "Sun"
                                                                }, void 0, false, {
                                                                    fileName: "[project]/app/HomeSplitClient.tsx",
                                                                    lineNumber: 1174,
                                                                    columnNumber: 23
                                                                }, this),
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                    children: "Mon"
                                                                }, void 0, false, {
                                                                    fileName: "[project]/app/HomeSplitClient.tsx",
                                                                    lineNumber: 1174,
                                                                    columnNumber: 39
                                                                }, this),
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                    children: "Tue"
                                                                }, void 0, false, {
                                                                    fileName: "[project]/app/HomeSplitClient.tsx",
                                                                    lineNumber: 1174,
                                                                    columnNumber: 55
                                                                }, this),
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                    children: "Wed"
                                                                }, void 0, false, {
                                                                    fileName: "[project]/app/HomeSplitClient.tsx",
                                                                    lineNumber: 1174,
                                                                    columnNumber: 71
                                                                }, this),
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                    children: "Thu"
                                                                }, void 0, false, {
                                                                    fileName: "[project]/app/HomeSplitClient.tsx",
                                                                    lineNumber: 1174,
                                                                    columnNumber: 87
                                                                }, this),
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                    children: "Fri"
                                                                }, void 0, false, {
                                                                    fileName: "[project]/app/HomeSplitClient.tsx",
                                                                    lineNumber: 1174,
                                                                    columnNumber: 103
                                                                }, this),
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                    children: "Sat"
                                                                }, void 0, false, {
                                                                    fileName: "[project]/app/HomeSplitClient.tsx",
                                                                    lineNumber: 1174,
                                                                    columnNumber: 119
                                                                }, this)
                                                            ]
                                                        }, void 0, true, {
                                                            fileName: "[project]/app/HomeSplitClient.tsx",
                                                            lineNumber: 1173,
                                                            columnNumber: 21
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                            className: "monthGrid",
                                                            role: "grid",
                                                            "aria-label": "Calendar month view",
                                                            children: monthGrid.cells.map((c, i)=>{
                                                                if (!c.ymd) return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                    className: "monthCell empty"
                                                                }, `e-${i}`, false, {
                                                                    fileName: "[project]/app/HomeSplitClient.tsx",
                                                                    lineNumber: 1179,
                                                                    columnNumber: 44
                                                                }, this);
                                                                const dayNum = Number(c.ymd.split("-")[2]);
                                                                const active = c.ymd === selectedDayStr;
                                                                return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                                    type: "button",
                                                                    className: "monthCell",
                                                                    "data-active": active ? "true" : "false",
                                                                    "data-has": c.hasEvents ? "true" : "false",
                                                                    onClick: ()=>{
                                                                        setClientSelectedKey(null);
                                                                        setParams({
                                                                            day: c.ymd,
                                                                            event: null
                                                                        });
                                                                    },
                                                                    "aria-label": `Select ${c.ymd}`,
                                                                    children: [
                                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                            className: "monthDayNum",
                                                                            children: dayNum
                                                                        }, void 0, false, {
                                                                            fileName: "[project]/app/HomeSplitClient.tsx",
                                                                            lineNumber: 1195,
                                                                            columnNumber: 29
                                                                        }, this),
                                                                        c.hasEvents ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                            className: "monthDot",
                                                                            "aria-hidden": "true"
                                                                        }, void 0, false, {
                                                                            fileName: "[project]/app/HomeSplitClient.tsx",
                                                                            lineNumber: 1196,
                                                                            columnNumber: 44
                                                                        }, this) : null
                                                                    ]
                                                                }, c.ymd, true, {
                                                                    fileName: "[project]/app/HomeSplitClient.tsx",
                                                                    lineNumber: 1183,
                                                                    columnNumber: 27
                                                                }, this);
                                                            })
                                                        }, void 0, false, {
                                                            fileName: "[project]/app/HomeSplitClient.tsx",
                                                            lineNumber: 1177,
                                                            columnNumber: 21
                                                        }, this)
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/app/HomeSplitClient.tsx",
                                                    lineNumber: 1139,
                                                    columnNumber: 19
                                                }, this),
                                                effectiveIsMobile ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "dayEventsMobile",
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                            className: "dayEventsHeader",
                                                            children: [
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                    className: "dayEventsTitle",
                                                                    children: formatDayHeading(selectedDay)
                                                                }, void 0, false, {
                                                                    fileName: "[project]/app/HomeSplitClient.tsx",
                                                                    lineNumber: 1206,
                                                                    columnNumber: 25
                                                                }, this),
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                    className: "dayEventsCount",
                                                                    children: [
                                                                        dayEvents.length,
                                                                        " event",
                                                                        dayEvents.length === 1 ? "" : "s"
                                                                    ]
                                                                }, void 0, true, {
                                                                    fileName: "[project]/app/HomeSplitClient.tsx",
                                                                    lineNumber: 1207,
                                                                    columnNumber: 25
                                                                }, this)
                                                            ]
                                                        }, void 0, true, {
                                                            fileName: "[project]/app/HomeSplitClient.tsx",
                                                            lineNumber: 1205,
                                                            columnNumber: 23
                                                        }, this),
                                                        dayEvents.length === 0 ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                            className: "emptyList",
                                                            children: "No events on this day."
                                                        }, void 0, false, {
                                                            fileName: "[project]/app/HomeSplitClient.tsx",
                                                            lineNumber: 1213,
                                                            columnNumber: 25
                                                        }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                            className: "dayEventsList",
                                                            children: dayEvents.map((e)=>{
                                                                const key = e.uid ?? e.id;
                                                                const title = e.title || "Untitled event";
                                                                const d = (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$calendar$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["safeDateFromEvent"])(e);
                                                                const timeLabel = d ? formatTimeShort(d) : "Time TBD";
                                                                const venueBits = [
                                                                    e.locationName,
                                                                    e.event_type
                                                                ].filter(Boolean).join(" • ");
                                                                return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                                    type: "button",
                                                                    className: "eventCard",
                                                                    "data-past": (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$calendar$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["eventHasEnded"])(e) ? "true" : "false",
                                                                    onClick: ()=>{
                                                                        setClientSelectedKey(key);
                                                                        setParam("event", key);
                                                                    },
                                                                    children: [
                                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                            className: "eventCardTitle",
                                                                            children: title
                                                                        }, void 0, false, {
                                                                            fileName: "[project]/app/HomeSplitClient.tsx",
                                                                            lineNumber: 1233,
                                                                            columnNumber: 33
                                                                        }, this),
                                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                            className: "eventMeta",
                                                                            children: [
                                                                                timeLabel,
                                                                                venueBits ? ` • ${venueBits}` : ""
                                                                            ]
                                                                        }, void 0, true, {
                                                                            fileName: "[project]/app/HomeSplitClient.tsx",
                                                                            lineNumber: 1234,
                                                                            columnNumber: 33
                                                                        }, this)
                                                                    ]
                                                                }, key, true, {
                                                                    fileName: "[project]/app/HomeSplitClient.tsx",
                                                                    lineNumber: 1223,
                                                                    columnNumber: 31
                                                                }, this);
                                                            })
                                                        }, void 0, false, {
                                                            fileName: "[project]/app/HomeSplitClient.tsx",
                                                            lineNumber: 1215,
                                                            columnNumber: 25
                                                        }, this)
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/app/HomeSplitClient.tsx",
                                                    lineNumber: 1204,
                                                    columnNumber: 21
                                                }, this) : null
                                            ]
                                        }, void 0, true)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/app/HomeSplitClient.tsx",
                                    lineNumber: 813,
                                    columnNumber: 13
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/app/HomeSplitClient.tsx",
                                lineNumber: 812,
                                columnNumber: 11
                            }, this) : "TURBOPACK unreachable",
                            showRight ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("main", {
                                className: "pane paneRight",
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "scroll",
                                    children: [
                                        viewMode === "month" ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "dayRight",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "dayRightHeader",
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                            className: "rightDayLabel",
                                                            children: formatDayHeading(selectedDay)
                                                        }, void 0, false, {
                                                            fileName: "[project]/app/HomeSplitClient.tsx",
                                                            lineNumber: 1260,
                                                            columnNumber: 21
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                            className: "dayRightCount",
                                                            children: [
                                                                dayEvents.length,
                                                                " event",
                                                                dayEvents.length === 1 ? "" : "s"
                                                            ]
                                                        }, void 0, true, {
                                                            fileName: "[project]/app/HomeSplitClient.tsx",
                                                            lineNumber: 1261,
                                                            columnNumber: 21
                                                        }, this)
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/app/HomeSplitClient.tsx",
                                                    lineNumber: 1259,
                                                    columnNumber: 19
                                                }, this),
                                                dayEvents.length === 0 ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "emptyList",
                                                    children: "No events on this day."
                                                }, void 0, false, {
                                                    fileName: "[project]/app/HomeSplitClient.tsx",
                                                    lineNumber: 1267,
                                                    columnNumber: 21
                                                }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "dayRightList",
                                                    role: "list",
                                                    children: dayEvents.map((e)=>{
                                                        const key = e.uid ?? e.id;
                                                        const active = selectedEvent?.id === e.id || selectedEvent?.uid && e.uid && selectedEvent.uid === e.uid;
                                                        const title = e.title || "Untitled event";
                                                        const d = (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$calendar$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["safeDateFromEvent"])(e);
                                                        const timeLabel = d ? formatTimeShort(d) : "Time TBD";
                                                        const venueBits = [
                                                            e.locationName,
                                                            e.event_type
                                                        ].filter(Boolean).join(" • ");
                                                        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                            type: "button",
                                                            className: "dayRightRow",
                                                            "data-active": active ? "true" : "false",
                                                            onClick: ()=>{
                                                                setClientSelectedKey(key);
                                                                setParam("event", key);
                                                            },
                                                            role: "listitem",
                                                            children: [
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                    className: "dayRightTop",
                                                                    children: [
                                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                            className: "dayRightTitle",
                                                                            children: title
                                                                        }, void 0, false, {
                                                                            fileName: "[project]/app/HomeSplitClient.tsx",
                                                                            lineNumber: 1294,
                                                                            columnNumber: 31
                                                                        }, this),
                                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                            className: "dayRightTime",
                                                                            children: timeLabel
                                                                        }, void 0, false, {
                                                                            fileName: "[project]/app/HomeSplitClient.tsx",
                                                                            lineNumber: 1295,
                                                                            columnNumber: 31
                                                                        }, this)
                                                                    ]
                                                                }, void 0, true, {
                                                                    fileName: "[project]/app/HomeSplitClient.tsx",
                                                                    lineNumber: 1293,
                                                                    columnNumber: 29
                                                                }, this),
                                                                venueBits ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                    className: "dayRightMeta",
                                                                    children: venueBits
                                                                }, void 0, false, {
                                                                    fileName: "[project]/app/HomeSplitClient.tsx",
                                                                    lineNumber: 1297,
                                                                    columnNumber: 42
                                                                }, this) : null
                                                            ]
                                                        }, key, true, {
                                                            fileName: "[project]/app/HomeSplitClient.tsx",
                                                            lineNumber: 1282,
                                                            columnNumber: 27
                                                        }, this);
                                                    })
                                                }, void 0, false, {
                                                    fileName: "[project]/app/HomeSplitClient.tsx",
                                                    lineNumber: 1269,
                                                    columnNumber: 21
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/app/HomeSplitClient.tsx",
                                            lineNumber: 1258,
                                            columnNumber: 17
                                        }, this) : null,
                                        viewMode === "list" && selectedWeekBucket ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "rightHeader weeklyOverviewLanding",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "rightDayLabel fadeInItem",
                                                    style: {
                                                        animationDelay: "260ms"
                                                    },
                                                    children: "Weekly Overview"
                                                }, void 0, false, {
                                                    fileName: "[project]/app/HomeSplitClient.tsx",
                                                    lineNumber: 1309,
                                                    columnNumber: 19
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "weekSelectorRail fadeInItem",
                                                    style: {
                                                        animationDelay: "320ms"
                                                    },
                                                    children: weekBuckets.map((bucket)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                            type: "button",
                                                            className: "weekSelectorCard",
                                                            "data-active": selectedWeekBucket.key === bucket.key ? "true" : "false",
                                                            onClick: ()=>openWeek(bucket.key),
                                                            children: [
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                    className: "weekSelectorEyebrow",
                                                                    children: bucket.label
                                                                }, void 0, false, {
                                                                    fileName: "[project]/app/HomeSplitClient.tsx",
                                                                    lineNumber: 1325,
                                                                    columnNumber: 25
                                                                }, this),
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                    className: "weekSelectorRange",
                                                                    children: bucket.rangeLabel
                                                                }, void 0, false, {
                                                                    fileName: "[project]/app/HomeSplitClient.tsx",
                                                                    lineNumber: 1326,
                                                                    columnNumber: 25
                                                                }, this),
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                    className: "weekSelectorMeta",
                                                                    children: [
                                                                        bucket.events.length,
                                                                        " event",
                                                                        bucket.events.length === 1 ? "" : "s"
                                                                    ]
                                                                }, void 0, true, {
                                                                    fileName: "[project]/app/HomeSplitClient.tsx",
                                                                    lineNumber: 1327,
                                                                    columnNumber: 25
                                                                }, this)
                                                            ]
                                                        }, bucket.key, true, {
                                                            fileName: "[project]/app/HomeSplitClient.tsx",
                                                            lineNumber: 1318,
                                                            columnNumber: 23
                                                        }, this))
                                                }, void 0, false, {
                                                    fileName: "[project]/app/HomeSplitClient.tsx",
                                                    lineNumber: 1316,
                                                    columnNumber: 19
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "weekSummary fadeInItem",
                                                    style: {
                                                        animationDelay: "360ms"
                                                    },
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                            className: "weekSummaryTopline",
                                                            children: [
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                    children: [
                                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                                                            className: "weekSummaryTitle",
                                                                            children: selectedWeekBucket.label
                                                                        }, void 0, false, {
                                                                            fileName: "[project]/app/HomeSplitClient.tsx",
                                                                            lineNumber: 1335,
                                                                            columnNumber: 25
                                                                        }, this),
                                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                                            className: "weekSummarySubhead",
                                                                            children: [
                                                                                "Week of ",
                                                                                weekLabel,
                                                                                ". Browse the current week plus the next four weeks, then open a week for a fuller breakdown."
                                                                            ]
                                                                        }, void 0, true, {
                                                                            fileName: "[project]/app/HomeSplitClient.tsx",
                                                                            lineNumber: 1336,
                                                                            columnNumber: 25
                                                                        }, this)
                                                                    ]
                                                                }, void 0, true, {
                                                                    fileName: "[project]/app/HomeSplitClient.tsx",
                                                                    lineNumber: 1334,
                                                                    columnNumber: 23
                                                                }, this),
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                    className: "weekSummaryRangePill",
                                                                    children: selectedWeekBucket.rangeLabel
                                                                }, void 0, false, {
                                                                    fileName: "[project]/app/HomeSplitClient.tsx",
                                                                    lineNumber: 1340,
                                                                    columnNumber: 23
                                                                }, this)
                                                            ]
                                                        }, void 0, true, {
                                                            fileName: "[project]/app/HomeSplitClient.tsx",
                                                            lineNumber: 1333,
                                                            columnNumber: 21
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                            className: "weekSummaryGrid",
                                                            role: "list",
                                                            children: [
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                    className: "weekSummaryCard",
                                                                    role: "listitem",
                                                                    children: [
                                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                            className: "weekSummaryKicker",
                                                                            children: "Total events"
                                                                        }, void 0, false, {
                                                                            fileName: "[project]/app/HomeSplitClient.tsx",
                                                                            lineNumber: 1345,
                                                                            columnNumber: 25
                                                                        }, this),
                                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                            className: "weekSummaryValue",
                                                                            children: weekEventsCount
                                                                        }, void 0, false, {
                                                                            fileName: "[project]/app/HomeSplitClient.tsx",
                                                                            lineNumber: 1346,
                                                                            columnNumber: 25
                                                                        }, this)
                                                                    ]
                                                                }, void 0, true, {
                                                                    fileName: "[project]/app/HomeSplitClient.tsx",
                                                                    lineNumber: 1344,
                                                                    columnNumber: 23
                                                                }, this),
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                    className: "weekSummaryCard",
                                                                    role: "listitem",
                                                                    children: [
                                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                            className: "weekSummaryKicker",
                                                                            children: "Live music"
                                                                        }, void 0, false, {
                                                                            fileName: "[project]/app/HomeSplitClient.tsx",
                                                                            lineNumber: 1349,
                                                                            columnNumber: 25
                                                                        }, this),
                                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                            className: "weekSummaryValue",
                                                                            children: weekInsights["Live music"]
                                                                        }, void 0, false, {
                                                                            fileName: "[project]/app/HomeSplitClient.tsx",
                                                                            lineNumber: 1350,
                                                                            columnNumber: 25
                                                                        }, this)
                                                                    ]
                                                                }, void 0, true, {
                                                                    fileName: "[project]/app/HomeSplitClient.tsx",
                                                                    lineNumber: 1348,
                                                                    columnNumber: 23
                                                                }, this),
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                    className: "weekSummaryCard",
                                                                    role: "listitem",
                                                                    children: [
                                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                            className: "weekSummaryKicker",
                                                                            children: "Food & drink"
                                                                        }, void 0, false, {
                                                                            fileName: "[project]/app/HomeSplitClient.tsx",
                                                                            lineNumber: 1353,
                                                                            columnNumber: 25
                                                                        }, this),
                                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                            className: "weekSummaryValue",
                                                                            children: weekInsights["Food & drink"]
                                                                        }, void 0, false, {
                                                                            fileName: "[project]/app/HomeSplitClient.tsx",
                                                                            lineNumber: 1354,
                                                                            columnNumber: 25
                                                                        }, this)
                                                                    ]
                                                                }, void 0, true, {
                                                                    fileName: "[project]/app/HomeSplitClient.tsx",
                                                                    lineNumber: 1352,
                                                                    columnNumber: 23
                                                                }, this),
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                    className: "weekSummaryCard",
                                                                    role: "listitem",
                                                                    children: [
                                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                            className: "weekSummaryKicker",
                                                                            children: "Community"
                                                                        }, void 0, false, {
                                                                            fileName: "[project]/app/HomeSplitClient.tsx",
                                                                            lineNumber: 1357,
                                                                            columnNumber: 25
                                                                        }, this),
                                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                            className: "weekSummaryValue",
                                                                            children: weekInsights["Community"]
                                                                        }, void 0, false, {
                                                                            fileName: "[project]/app/HomeSplitClient.tsx",
                                                                            lineNumber: 1358,
                                                                            columnNumber: 25
                                                                        }, this)
                                                                    ]
                                                                }, void 0, true, {
                                                                    fileName: "[project]/app/HomeSplitClient.tsx",
                                                                    lineNumber: 1356,
                                                                    columnNumber: 23
                                                                }, this)
                                                            ]
                                                        }, void 0, true, {
                                                            fileName: "[project]/app/HomeSplitClient.tsx",
                                                            lineNumber: 1343,
                                                            columnNumber: 21
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                            className: "weekSummaryGrid weekSummaryGridSecondary",
                                                            role: "list",
                                                            children: [
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                    className: "weekSummaryCard",
                                                                    role: "listitem",
                                                                    children: [
                                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                            className: "weekSummaryKicker",
                                                                            children: "Busiest day"
                                                                        }, void 0, false, {
                                                                            fileName: "[project]/app/HomeSplitClient.tsx",
                                                                            lineNumber: 1364,
                                                                            columnNumber: 25
                                                                        }, this),
                                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                            className: "weekSummaryValueSmall",
                                                                            children: selectedWeekBucket.busiestDayLabel
                                                                        }, void 0, false, {
                                                                            fileName: "[project]/app/HomeSplitClient.tsx",
                                                                            lineNumber: 1365,
                                                                            columnNumber: 25
                                                                        }, this)
                                                                    ]
                                                                }, void 0, true, {
                                                                    fileName: "[project]/app/HomeSplitClient.tsx",
                                                                    lineNumber: 1363,
                                                                    columnNumber: 23
                                                                }, this),
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                    className: "weekSummaryCard",
                                                                    role: "listitem",
                                                                    children: [
                                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                            className: "weekSummaryKicker",
                                                                            children: "Peak time"
                                                                        }, void 0, false, {
                                                                            fileName: "[project]/app/HomeSplitClient.tsx",
                                                                            lineNumber: 1368,
                                                                            columnNumber: 25
                                                                        }, this),
                                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                            className: "weekSummaryValueSmall",
                                                                            children: selectedWeekBucket.peakWindowLabel
                                                                        }, void 0, false, {
                                                                            fileName: "[project]/app/HomeSplitClient.tsx",
                                                                            lineNumber: 1369,
                                                                            columnNumber: 25
                                                                        }, this)
                                                                    ]
                                                                }, void 0, true, {
                                                                    fileName: "[project]/app/HomeSplitClient.tsx",
                                                                    lineNumber: 1367,
                                                                    columnNumber: 23
                                                                }, this)
                                                            ]
                                                        }, void 0, true, {
                                                            fileName: "[project]/app/HomeSplitClient.tsx",
                                                            lineNumber: 1362,
                                                            columnNumber: 21
                                                        }, this)
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/app/HomeSplitClient.tsx",
                                                    lineNumber: 1332,
                                                    columnNumber: 19
                                                }, this),
                                                weekEventsCount === 0 ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "emptyRight",
                                                    children: "No events scheduled for this week yet."
                                                }, void 0, false, {
                                                    fileName: "[project]/app/HomeSplitClient.tsx",
                                                    lineNumber: 1375,
                                                    columnNumber: 21
                                                }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "weeklyLanding fadeInItem",
                                                    style: {
                                                        animationDelay: "420ms"
                                                    },
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                            className: "weeklyInsightsBar",
                                                            "aria-label": "Week visualizations",
                                                            children: Object.entries(weekInsights).map(([label, rawCount])=>{
                                                                const count = Number(rawCount) || 0;
                                                                return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                    className: "weeklyInsightMetric",
                                                                    children: [
                                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                            className: "weeklyInsightTop",
                                                                            children: [
                                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                                    children: label
                                                                                }, void 0, false, {
                                                                                    fileName: "[project]/app/HomeSplitClient.tsx",
                                                                                    lineNumber: 1384,
                                                                                    columnNumber: 31
                                                                                }, this),
                                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                                    children: count
                                                                                }, void 0, false, {
                                                                                    fileName: "[project]/app/HomeSplitClient.tsx",
                                                                                    lineNumber: 1385,
                                                                                    columnNumber: 31
                                                                                }, this)
                                                                            ]
                                                                        }, void 0, true, {
                                                                            fileName: "[project]/app/HomeSplitClient.tsx",
                                                                            lineNumber: 1383,
                                                                            columnNumber: 29
                                                                        }, this),
                                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                            className: "weeklyInsightTrack",
                                                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                                className: "weeklyInsightFill",
                                                                                style: {
                                                                                    width: `${weekEventsCount ? Math.max(count / weekEventsCount * 100, count > 0 ? 12 : 0) : 0}%`
                                                                                }
                                                                            }, void 0, false, {
                                                                                fileName: "[project]/app/HomeSplitClient.tsx",
                                                                                lineNumber: 1388,
                                                                                columnNumber: 31
                                                                            }, this)
                                                                        }, void 0, false, {
                                                                            fileName: "[project]/app/HomeSplitClient.tsx",
                                                                            lineNumber: 1387,
                                                                            columnNumber: 29
                                                                        }, this)
                                                                    ]
                                                                }, label, true, {
                                                                    fileName: "[project]/app/HomeSplitClient.tsx",
                                                                    lineNumber: 1382,
                                                                    columnNumber: 27
                                                                }, this);
                                                            })
                                                        }, void 0, false, {
                                                            fileName: "[project]/app/HomeSplitClient.tsx",
                                                            lineNumber: 1378,
                                                            columnNumber: 23
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                            className: "weeklyCards",
                                                            children: weekGroups.map((g)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                    className: "weeklyDayGroup",
                                                                    children: [
                                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                            className: "dayTitle",
                                                                            children: formatDayHeading(g.date)
                                                                        }, void 0, false, {
                                                                            fileName: "[project]/app/HomeSplitClient.tsx",
                                                                            lineNumber: 1403,
                                                                            columnNumber: 29
                                                                        }, this),
                                                                        g.items.map((e)=>{
                                                                            const title = e.title || "Untitled event";
                                                                            const d = (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$calendar$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["safeDateFromEvent"])(e);
                                                                            const timeLabel = d ? formatTimeLabel(d) : "Time TBD";
                                                                            const img = pickImageUrl(e);
                                                                            const desc = (pickDescriptionText(e) || e.summary || "").trim();
                                                                            return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                                                type: "button",
                                                                                className: "weeklyCard weeklyCardSelectable",
                                                                                "data-past": (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$calendar$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["eventHasEnded"])(e) ? "true" : "false",
                                                                                onClick: ()=>openSelected(e.uid ?? e.id),
                                                                                children: [
                                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                                        className: "weeklyCardMedia",
                                                                                        children: img ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                                            className: "media16x9",
                                                                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("img", {
                                                                                                className: "weeklyThumb",
                                                                                                src: img,
                                                                                                alt: ""
                                                                                            }, void 0, false, {
                                                                                                fileName: "[project]/app/HomeSplitClient.tsx",
                                                                                                lineNumber: 1424,
                                                                                                columnNumber: 41
                                                                                            }, this)
                                                                                        }, void 0, false, {
                                                                                            fileName: "[project]/app/HomeSplitClient.tsx",
                                                                                            lineNumber: 1422,
                                                                                            columnNumber: 39
                                                                                        }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                                            className: "media16x9 weeklyThumbPlaceholder",
                                                                                            "aria-hidden": true
                                                                                        }, void 0, false, {
                                                                                            fileName: "[project]/app/HomeSplitClient.tsx",
                                                                                            lineNumber: 1427,
                                                                                            columnNumber: 39
                                                                                        }, this)
                                                                                    }, void 0, false, {
                                                                                        fileName: "[project]/app/HomeSplitClient.tsx",
                                                                                        lineNumber: 1420,
                                                                                        columnNumber: 35
                                                                                    }, this),
                                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                                        className: "weeklyCardContent weeklyCardContentExpanded",
                                                                                        children: [
                                                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                                                className: "weeklyCardTop",
                                                                                                children: [
                                                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                                                        className: "weeklyCardTitleWrap",
                                                                                                        children: [
                                                                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                                                                className: "weeklyCardTitle",
                                                                                                                children: title
                                                                                                            }, void 0, false, {
                                                                                                                fileName: "[project]/app/HomeSplitClient.tsx",
                                                                                                                lineNumber: 1434,
                                                                                                                columnNumber: 41
                                                                                                            }, this),
                                                                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                                                                className: "weeklyCardTime",
                                                                                                                children: timeLabel
                                                                                                            }, void 0, false, {
                                                                                                                fileName: "[project]/app/HomeSplitClient.tsx",
                                                                                                                lineNumber: 1435,
                                                                                                                columnNumber: 41
                                                                                                            }, this)
                                                                                                        ]
                                                                                                    }, void 0, true, {
                                                                                                        fileName: "[project]/app/HomeSplitClient.tsx",
                                                                                                        lineNumber: 1433,
                                                                                                        columnNumber: 39
                                                                                                    }, this),
                                                                                                    e.tickets_url || e.website_url ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                                                        className: "weeklyCardActions",
                                                                                                        children: [
                                                                                                            e.tickets_url ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("a", {
                                                                                                                className: "weeklyMiniBtn",
                                                                                                                href: e.tickets_url,
                                                                                                                target: "_blank",
                                                                                                                rel: "noreferrer",
                                                                                                                onClick: (ev)=>ev.stopPropagation(),
                                                                                                                children: "Tickets"
                                                                                                            }, void 0, false, {
                                                                                                                fileName: "[project]/app/HomeSplitClient.tsx",
                                                                                                                lineNumber: 1441,
                                                                                                                columnNumber: 45
                                                                                                            }, this) : null,
                                                                                                            e.website_url ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("a", {
                                                                                                                className: "weeklyMiniBtn",
                                                                                                                href: e.website_url,
                                                                                                                target: "_blank",
                                                                                                                rel: "noreferrer",
                                                                                                                onClick: (ev)=>ev.stopPropagation(),
                                                                                                                children: "Website"
                                                                                                            }, void 0, false, {
                                                                                                                fileName: "[project]/app/HomeSplitClient.tsx",
                                                                                                                lineNumber: 1452,
                                                                                                                columnNumber: 45
                                                                                                            }, this) : null
                                                                                                        ]
                                                                                                    }, void 0, true, {
                                                                                                        fileName: "[project]/app/HomeSplitClient.tsx",
                                                                                                        lineNumber: 1439,
                                                                                                        columnNumber: 41
                                                                                                    }, this) : null
                                                                                                ]
                                                                                            }, void 0, true, {
                                                                                                fileName: "[project]/app/HomeSplitClient.tsx",
                                                                                                lineNumber: 1432,
                                                                                                columnNumber: 37
                                                                                            }, this),
                                                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                                                className: "weeklyCardMetaRow",
                                                                                                children: [
                                                                                                    e.locationName,
                                                                                                    e.event_type
                                                                                                ].filter(Boolean).join(" • ")
                                                                                            }, void 0, false, {
                                                                                                fileName: "[project]/app/HomeSplitClient.tsx",
                                                                                                lineNumber: 1466,
                                                                                                columnNumber: 37
                                                                                            }, this),
                                                                                            desc ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                                                className: "weeklyCardDesc",
                                                                                                children: desc.length > 200 ? `${desc.slice(0, 200).trim()}…` : desc
                                                                                            }, void 0, false, {
                                                                                                fileName: "[project]/app/HomeSplitClient.tsx",
                                                                                                lineNumber: 1469,
                                                                                                columnNumber: 45
                                                                                            }, this) : null
                                                                                        ]
                                                                                    }, void 0, true, {
                                                                                        fileName: "[project]/app/HomeSplitClient.tsx",
                                                                                        lineNumber: 1431,
                                                                                        columnNumber: 35
                                                                                    }, this)
                                                                                ]
                                                                            }, e.id, true, {
                                                                                fileName: "[project]/app/HomeSplitClient.tsx",
                                                                                lineNumber: 1413,
                                                                                columnNumber: 33
                                                                            }, this);
                                                                        })
                                                                    ]
                                                                }, (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$calendar$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["dayKey"])(g.date), true, {
                                                                    fileName: "[project]/app/HomeSplitClient.tsx",
                                                                    lineNumber: 1402,
                                                                    columnNumber: 27
                                                                }, this))
                                                        }, void 0, false, {
                                                            fileName: "[project]/app/HomeSplitClient.tsx",
                                                            lineNumber: 1400,
                                                            columnNumber: 23
                                                        }, this)
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/app/HomeSplitClient.tsx",
                                                    lineNumber: 1377,
                                                    columnNumber: 21
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/app/HomeSplitClient.tsx",
                                            lineNumber: 1308,
                                            columnNumber: 17
                                        }, this) : !selectedEvent ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "dayRight",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "dayRightHeader",
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                            className: "rightDayLabel",
                                                            children: formatDayHeading(selectedDay)
                                                        }, void 0, false, {
                                                            fileName: "[project]/app/HomeSplitClient.tsx",
                                                            lineNumber: 1483,
                                                            columnNumber: 21
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                            className: "dayRightCount",
                                                            children: [
                                                                dayEvents.length,
                                                                " event",
                                                                dayEvents.length === 1 ? "" : "s"
                                                            ]
                                                        }, void 0, true, {
                                                            fileName: "[project]/app/HomeSplitClient.tsx",
                                                            lineNumber: 1484,
                                                            columnNumber: 21
                                                        }, this)
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/app/HomeSplitClient.tsx",
                                                    lineNumber: 1482,
                                                    columnNumber: 19
                                                }, this),
                                                dayEvents.length === 0 ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "emptyList",
                                                    children: "No events on this day."
                                                }, void 0, false, {
                                                    fileName: "[project]/app/HomeSplitClient.tsx",
                                                    lineNumber: 1490,
                                                    columnNumber: 21
                                                }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "dayRightList",
                                                    role: "list",
                                                    children: dayEvents.map((e)=>{
                                                        const key = e.uid ?? e.id;
                                                        const title = e.title || "Untitled event";
                                                        const d = (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$calendar$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["safeDateFromEvent"])(e);
                                                        const timeLabel = d ? formatTimeShort(d) : "Time TBD";
                                                        const venueBits = [
                                                            e.locationName,
                                                            e.event_type
                                                        ].filter(Boolean).join(" • ");
                                                        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                            type: "button",
                                                            className: "dayRightRow",
                                                            "data-past": (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$calendar$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["eventHasEnded"])(e) ? "true" : "false",
                                                            onClick: ()=>openSelected(key),
                                                            role: "listitem",
                                                            children: [
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                    className: "dayRightTop",
                                                                    children: [
                                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                            className: "dayRightTitle",
                                                                            children: title
                                                                        }, void 0, false, {
                                                                            fileName: "[project]/app/HomeSplitClient.tsx",
                                                                            lineNumber: 1510,
                                                                            columnNumber: 31
                                                                        }, this),
                                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                            className: "dayRightTime",
                                                                            children: timeLabel
                                                                        }, void 0, false, {
                                                                            fileName: "[project]/app/HomeSplitClient.tsx",
                                                                            lineNumber: 1511,
                                                                            columnNumber: 31
                                                                        }, this)
                                                                    ]
                                                                }, void 0, true, {
                                                                    fileName: "[project]/app/HomeSplitClient.tsx",
                                                                    lineNumber: 1509,
                                                                    columnNumber: 29
                                                                }, this),
                                                                venueBits ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                    className: "dayRightMeta",
                                                                    children: venueBits
                                                                }, void 0, false, {
                                                                    fileName: "[project]/app/HomeSplitClient.tsx",
                                                                    lineNumber: 1513,
                                                                    columnNumber: 42
                                                                }, this) : null
                                                            ]
                                                        }, key, true, {
                                                            fileName: "[project]/app/HomeSplitClient.tsx",
                                                            lineNumber: 1501,
                                                            columnNumber: 27
                                                        }, this);
                                                    })
                                                }, void 0, false, {
                                                    fileName: "[project]/app/HomeSplitClient.tsx",
                                                    lineNumber: 1492,
                                                    columnNumber: 21
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/app/HomeSplitClient.tsx",
                                            lineNumber: 1481,
                                            columnNumber: 17
                                        }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "rightHeader",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "rightDayLabel fadeInItem",
                                                    style: {
                                                        animationDelay: "260ms"
                                                    },
                                                    children: selectedEvent.event_type || "Event"
                                                }, void 0, false, {
                                                    fileName: "[project]/app/HomeSplitClient.tsx",
                                                    lineNumber: 1522,
                                                    columnNumber: 19
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h1", {
                                                    className: "detailTitle fadeInItem",
                                                    style: {
                                                        animationDelay: "320ms"
                                                    },
                                                    children: selectedEvent.title || "Untitled event"
                                                }, void 0, false, {
                                                    fileName: "[project]/app/HomeSplitClient.tsx",
                                                    lineNumber: 1529,
                                                    columnNumber: 19
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "detailMeta fadeInItem",
                                                    style: {
                                                        animationDelay: "360ms"
                                                    },
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                            children: selectedTime
                                                        }, void 0, false, {
                                                            fileName: "[project]/app/HomeSplitClient.tsx",
                                                            lineNumber: 1534,
                                                            columnNumber: 21
                                                        }, this),
                                                        selectedEvent.locationName ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Fragment"], {
                                                            children: [
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                    className: "dot",
                                                                    children: "•"
                                                                }, void 0, false, {
                                                                    fileName: "[project]/app/HomeSplitClient.tsx",
                                                                    lineNumber: 1537,
                                                                    columnNumber: 25
                                                                }, this),
                                                                selectedEvent.locationUrl ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("a", {
                                                                    className: "venue link",
                                                                    href: selectedEvent.locationUrl,
                                                                    children: selectedEvent.locationName
                                                                }, void 0, false, {
                                                                    fileName: "[project]/app/HomeSplitClient.tsx",
                                                                    lineNumber: 1539,
                                                                    columnNumber: 27
                                                                }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                    className: "venue",
                                                                    children: selectedEvent.locationName
                                                                }, void 0, false, {
                                                                    fileName: "[project]/app/HomeSplitClient.tsx",
                                                                    lineNumber: 1543,
                                                                    columnNumber: 27
                                                                }, this)
                                                            ]
                                                        }, void 0, true) : null,
                                                        selectedEvent.address ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Fragment"], {
                                                            children: [
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                    className: "dot",
                                                                    children: "•"
                                                                }, void 0, false, {
                                                                    fileName: "[project]/app/HomeSplitClient.tsx",
                                                                    lineNumber: 1549,
                                                                    columnNumber: 25
                                                                }, this),
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                    className: "muted",
                                                                    children: selectedEvent.address
                                                                }, void 0, false, {
                                                                    fileName: "[project]/app/HomeSplitClient.tsx",
                                                                    lineNumber: 1550,
                                                                    columnNumber: 25
                                                                }, this)
                                                            ]
                                                        }, void 0, true) : null
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/app/HomeSplitClient.tsx",
                                                    lineNumber: 1533,
                                                    columnNumber: 19
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "heroImage",
                                                    style: selectedImg ? {
                                                        backgroundImage: `url(${selectedImg})`
                                                    } : undefined
                                                }, void 0, false, {
                                                    fileName: "[project]/app/HomeSplitClient.tsx",
                                                    lineNumber: 1556,
                                                    columnNumber: 19
                                                }, this),
                                                selectedEvent.summary ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                    className: "summary",
                                                    children: selectedEvent.summary
                                                }, void 0, false, {
                                                    fileName: "[project]/app/HomeSplitClient.tsx",
                                                    lineNumber: 1561,
                                                    columnNumber: 44
                                                }, this) : null,
                                                selectedDesc ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "detailBody",
                                                    children: selectedDesc
                                                }, void 0, false, {
                                                    fileName: "[project]/app/HomeSplitClient.tsx",
                                                    lineNumber: 1563,
                                                    columnNumber: 35
                                                }, this) : null,
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$app$2f$components$2f$MediaBlocks$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {
                                                    slices: selectedEvent?.content_blocks
                                                }, void 0, false, {
                                                    fileName: "[project]/app/HomeSplitClient.tsx",
                                                    lineNumber: 1566,
                                                    columnNumber: 19
                                                }, this),
                                                selectedEvent.website_url || selectedEvent.tickets_url ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "ctaRow",
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("a", {
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
                                                            lineNumber: 1570,
                                                            columnNumber: 23
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("a", {
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
                                                            lineNumber: 1583,
                                                            columnNumber: 23
                                                        }, this)
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/app/HomeSplitClient.tsx",
                                                    lineNumber: 1569,
                                                    columnNumber: 21
                                                }, this) : null
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/app/HomeSplitClient.tsx",
                                            lineNumber: 1521,
                                            columnNumber: 17
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/app/HomeSplitClient.tsx",
                                    lineNumber: 1254,
                                    columnNumber: 13
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/app/HomeSplitClient.tsx",
                                lineNumber: 1253,
                                columnNumber: 11
                            }, this) : null
                        ]
                    }, void 0, true, {
                        fileName: "[project]/app/HomeSplitClient.tsx",
                        lineNumber: 809,
                        columnNumber: 7
                    }, this),
                    effectiveIsMobile ? mobileDetailOpen ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "mobileTabs mobileTabsDetail",
                        "aria-label": "Event navigation",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                type: "button",
                                className: "tabBtn",
                                onClick: ()=>previousEventKey && openSelected(previousEventKey),
                                disabled: !previousEventKey,
                                "aria-disabled": !previousEventKey,
                                children: "Previous"
                            }, void 0, false, {
                                fileName: "[project]/app/HomeSplitClient.tsx",
                                lineNumber: 1608,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                type: "button",
                                className: "tabBtn",
                                onClick: clearSelected,
                                children: "Cal"
                            }, void 0, false, {
                                fileName: "[project]/app/HomeSplitClient.tsx",
                                lineNumber: 1617,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                type: "button",
                                className: "tabBtn",
                                onClick: ()=>nextEventKey && openSelected(nextEventKey),
                                disabled: !nextEventKey,
                                "aria-disabled": !nextEventKey,
                                children: "Next"
                            }, void 0, false, {
                                fileName: "[project]/app/HomeSplitClient.tsx",
                                lineNumber: 1624,
                                columnNumber: 13
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/app/HomeSplitClient.tsx",
                        lineNumber: 1607,
                        columnNumber: 11
                    }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "mobileTabs",
                        "aria-label": "Primary navigation",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                type: "button",
                                className: "tabBtn",
                                "data-active": pathname === "/" ? "true" : "false",
                                onClick: ()=>router.push("/"),
                                children: "Calendar"
                            }, void 0, false, {
                                fileName: "[project]/app/HomeSplitClient.tsx",
                                lineNumber: 1636,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                type: "button",
                                className: "tabBtn",
                                "data-active": pathname?.startsWith("/locations") ? "true" : "false",
                                onClick: ()=>router.push("/locations"),
                                children: "Directory"
                            }, void 0, false, {
                                fileName: "[project]/app/HomeSplitClient.tsx",
                                lineNumber: 1644,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                type: "button",
                                className: "tabBtn",
                                "data-active": pathname?.startsWith("/updates") ? "true" : "false",
                                onClick: ()=>router.push("/updates"),
                                children: "Updates"
                            }, void 0, false, {
                                fileName: "[project]/app/HomeSplitClient.tsx",
                                lineNumber: 1652,
                                columnNumber: 13
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/app/HomeSplitClient.tsx",
                        lineNumber: 1635,
                        columnNumber: 11
                    }, this) : null,
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "mobileDetail",
                        "data-open": mobileDetailOpen ? "true" : "false",
                        "aria-hidden": !mobileDetailOpen,
                        role: "dialog",
                        "aria-modal": mobileDetailOpen ? "true" : "false",
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "scroll mobileDetailScroll",
                            children: selectedEvent ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "detailCard detailFlash mobileEventDetailCard",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "detailTitle",
                                        children: selectedEvent.title ?? selectedEvent.summary ?? "Untitled event"
                                    }, void 0, false, {
                                        fileName: "[project]/app/HomeSplitClient.tsx",
                                        lineNumber: 1675,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "detailMeta",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                className: "muted",
                                                children: selectedTime ?? "Time TBD"
                                            }, void 0, false, {
                                                fileName: "[project]/app/HomeSplitClient.tsx",
                                                lineNumber: 1677,
                                                columnNumber: 17
                                            }, this),
                                            selectedEvent.event_type ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                className: "badge",
                                                children: selectedEvent.event_type
                                            }, void 0, false, {
                                                fileName: "[project]/app/HomeSplitClient.tsx",
                                                lineNumber: 1678,
                                                columnNumber: 45
                                            }, this) : null
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/app/HomeSplitClient.tsx",
                                        lineNumber: 1676,
                                        columnNumber: 15
                                    }, this),
                                    selectedImg ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "media16x9 mobileEventHero",
                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("img", {
                                            src: selectedImg,
                                            alt: ""
                                        }, void 0, false, {
                                            fileName: "[project]/app/HomeSplitClient.tsx",
                                            lineNumber: 1683,
                                            columnNumber: 19
                                        }, this)
                                    }, void 0, false, {
                                        fileName: "[project]/app/HomeSplitClient.tsx",
                                        lineNumber: 1681,
                                        columnNumber: 17
                                    }, this) : null,
                                    selectedDesc ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "detailBody mobileEventDetailBody",
                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                            children: selectedDesc
                                        }, void 0, false, {
                                            fileName: "[project]/app/HomeSplitClient.tsx",
                                            lineNumber: 1688,
                                            columnNumber: 19
                                        }, this)
                                    }, void 0, false, {
                                        fileName: "[project]/app/HomeSplitClient.tsx",
                                        lineNumber: 1687,
                                        columnNumber: 17
                                    }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "detailBody mobileEventDetailBody",
                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                            className: "muted",
                                            children: "No description yet."
                                        }, void 0, false, {
                                            fileName: "[project]/app/HomeSplitClient.tsx",
                                            lineNumber: 1692,
                                            columnNumber: 19
                                        }, this)
                                    }, void 0, false, {
                                        fileName: "[project]/app/HomeSplitClient.tsx",
                                        lineNumber: 1691,
                                        columnNumber: 17
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$app$2f$components$2f$MediaBlocks$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {
                                        slices: selectedEvent?.content_blocks
                                    }, void 0, false, {
                                        fileName: "[project]/app/HomeSplitClient.tsx",
                                        lineNumber: 1695,
                                        columnNumber: 15
                                    }, this),
                                    selectedEvent.website_url || selectedEvent.tickets_url ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "ctaRow",
                                        children: [
                                            selectedEvent.website_url ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("a", {
                                                className: "ctaBtn",
                                                href: selectedEvent.website_url,
                                                target: "_blank",
                                                rel: "noreferrer",
                                                children: "Website"
                                            }, void 0, false, {
                                                fileName: "[project]/app/HomeSplitClient.tsx",
                                                lineNumber: 1699,
                                                columnNumber: 21
                                            }, this) : null,
                                            selectedEvent.tickets_url ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("a", {
                                                className: "ctaBtn",
                                                href: selectedEvent.tickets_url,
                                                target: "_blank",
                                                rel: "noreferrer",
                                                children: "Tickets"
                                            }, void 0, false, {
                                                fileName: "[project]/app/HomeSplitClient.tsx",
                                                lineNumber: 1702,
                                                columnNumber: 21
                                            }, this) : null
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/app/HomeSplitClient.tsx",
                                        lineNumber: 1697,
                                        columnNumber: 17
                                    }, this) : null
                                ]
                            }, detailFlashKey, true, {
                                fileName: "[project]/app/HomeSplitClient.tsx",
                                lineNumber: 1674,
                                columnNumber: 13
                            }, this) : selectedWeekBucket ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "weeklyOverviewLanding mobileWeeklyOverviewOpen",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "weekSummary fadeInItem",
                                        style: {
                                            animationDelay: "180ms"
                                        },
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "weekSummaryTopline",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        children: [
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                className: "rightDayLabel",
                                                                children: "Weekly Overview"
                                                            }, void 0, false, {
                                                                fileName: "[project]/app/HomeSplitClient.tsx",
                                                                lineNumber: 1712,
                                                                columnNumber: 21
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                                                className: "weekSummaryTitle",
                                                                children: selectedWeekBucket.label
                                                            }, void 0, false, {
                                                                fileName: "[project]/app/HomeSplitClient.tsx",
                                                                lineNumber: 1713,
                                                                columnNumber: 21
                                                            }, this)
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/app/HomeSplitClient.tsx",
                                                        lineNumber: 1711,
                                                        columnNumber: 19
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        className: "weekSummaryRangePill",
                                                        children: selectedWeekBucket.rangeLabel
                                                    }, void 0, false, {
                                                        fileName: "[project]/app/HomeSplitClient.tsx",
                                                        lineNumber: 1715,
                                                        columnNumber: 19
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/app/HomeSplitClient.tsx",
                                                lineNumber: 1710,
                                                columnNumber: 17
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "weekSummaryGrid",
                                                role: "list",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        className: "weekSummaryCard",
                                                        role: "listitem",
                                                        children: [
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                className: "weekSummaryKicker",
                                                                children: "Events"
                                                            }, void 0, false, {
                                                                fileName: "[project]/app/HomeSplitClient.tsx",
                                                                lineNumber: 1720,
                                                                columnNumber: 21
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                className: "weekSummaryValue",
                                                                children: selectedWeekBucket.events.length
                                                            }, void 0, false, {
                                                                fileName: "[project]/app/HomeSplitClient.tsx",
                                                                lineNumber: 1721,
                                                                columnNumber: 21
                                                            }, this)
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/app/HomeSplitClient.tsx",
                                                        lineNumber: 1719,
                                                        columnNumber: 19
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        className: "weekSummaryCard",
                                                        role: "listitem",
                                                        children: [
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                className: "weekSummaryKicker",
                                                                children: "Live music"
                                                            }, void 0, false, {
                                                                fileName: "[project]/app/HomeSplitClient.tsx",
                                                                lineNumber: 1724,
                                                                columnNumber: 21
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                className: "weekSummaryValue",
                                                                children: weekInsights["Live music"]
                                                            }, void 0, false, {
                                                                fileName: "[project]/app/HomeSplitClient.tsx",
                                                                lineNumber: 1725,
                                                                columnNumber: 21
                                                            }, this)
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/app/HomeSplitClient.tsx",
                                                        lineNumber: 1723,
                                                        columnNumber: 19
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        className: "weekSummaryCard",
                                                        role: "listitem",
                                                        children: [
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                className: "weekSummaryKicker",
                                                                children: "Food & drink"
                                                            }, void 0, false, {
                                                                fileName: "[project]/app/HomeSplitClient.tsx",
                                                                lineNumber: 1728,
                                                                columnNumber: 21
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                className: "weekSummaryValue",
                                                                children: weekInsights["Food & drink"]
                                                            }, void 0, false, {
                                                                fileName: "[project]/app/HomeSplitClient.tsx",
                                                                lineNumber: 1729,
                                                                columnNumber: 21
                                                            }, this)
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/app/HomeSplitClient.tsx",
                                                        lineNumber: 1727,
                                                        columnNumber: 19
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/app/HomeSplitClient.tsx",
                                                lineNumber: 1718,
                                                columnNumber: 17
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/app/HomeSplitClient.tsx",
                                        lineNumber: 1709,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "weeklyLanding fadeInItem",
                                        style: {
                                            animationDelay: "260ms"
                                        },
                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "weeklyCards",
                                            children: weekGroups.map((g)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "weeklyDayGroup",
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                            className: "weeklyCondensedDayTitle",
                                                            children: formatDayHeading(g.date)
                                                        }, void 0, false, {
                                                            fileName: "[project]/app/HomeSplitClient.tsx",
                                                            lineNumber: 1738,
                                                            columnNumber: 23
                                                        }, this),
                                                        g.items.map((e)=>{
                                                            const title = e.title || "Untitled event";
                                                            const d = (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$calendar$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["safeDateFromEvent"])(e);
                                                            const timeLabel = d ? formatTimeShort(d) : "Time TBD";
                                                            const desc = pickDescriptionText(e);
                                                            const img = pickImageUrl(e);
                                                            return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                                type: "button",
                                                                className: "weeklyCard weeklyCardSelectable",
                                                                onClick: ()=>openSelected(e.uid ?? e.id),
                                                                children: [
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                        className: "weeklyCardMedia",
                                                                        children: img ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                            className: "media16x9",
                                                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("img", {
                                                                                className: "weeklyThumb",
                                                                                src: img,
                                                                                alt: ""
                                                                            }, void 0, false, {
                                                                                fileName: "[project]/app/HomeSplitClient.tsx",
                                                                                lineNumber: 1756,
                                                                                columnNumber: 35
                                                                            }, this)
                                                                        }, void 0, false, {
                                                                            fileName: "[project]/app/HomeSplitClient.tsx",
                                                                            lineNumber: 1754,
                                                                            columnNumber: 33
                                                                        }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                            className: "media16x9 weeklyThumbPlaceholder",
                                                                            "aria-hidden": true
                                                                        }, void 0, false, {
                                                                            fileName: "[project]/app/HomeSplitClient.tsx",
                                                                            lineNumber: 1759,
                                                                            columnNumber: 33
                                                                        }, this)
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/app/HomeSplitClient.tsx",
                                                                        lineNumber: 1752,
                                                                        columnNumber: 29
                                                                    }, this),
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                        className: "weeklyCardContent weeklyCardContentExpanded",
                                                                        children: [
                                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                                className: "weeklyCardTop",
                                                                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                                    className: "weeklyCardTitleWrap",
                                                                                    children: [
                                                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                                            className: "weeklyCardTitle",
                                                                                            children: title
                                                                                        }, void 0, false, {
                                                                                            fileName: "[project]/app/HomeSplitClient.tsx",
                                                                                            lineNumber: 1765,
                                                                                            columnNumber: 35
                                                                                        }, this),
                                                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                                            className: "weeklyCardTime",
                                                                                            children: timeLabel
                                                                                        }, void 0, false, {
                                                                                            fileName: "[project]/app/HomeSplitClient.tsx",
                                                                                            lineNumber: 1766,
                                                                                            columnNumber: 35
                                                                                        }, this)
                                                                                    ]
                                                                                }, void 0, true, {
                                                                                    fileName: "[project]/app/HomeSplitClient.tsx",
                                                                                    lineNumber: 1764,
                                                                                    columnNumber: 33
                                                                                }, this)
                                                                            }, void 0, false, {
                                                                                fileName: "[project]/app/HomeSplitClient.tsx",
                                                                                lineNumber: 1763,
                                                                                columnNumber: 31
                                                                            }, this),
                                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                                className: "weeklyCardMetaRow",
                                                                                children: [
                                                                                    e.locationName,
                                                                                    e.event_type
                                                                                ].filter(Boolean).join(" • ")
                                                                            }, void 0, false, {
                                                                                fileName: "[project]/app/HomeSplitClient.tsx",
                                                                                lineNumber: 1769,
                                                                                columnNumber: 31
                                                                            }, this),
                                                                            desc ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                                className: "weeklyCardDesc",
                                                                                children: desc.length > 180 ? `${desc.slice(0, 180).trim()}…` : desc
                                                                            }, void 0, false, {
                                                                                fileName: "[project]/app/HomeSplitClient.tsx",
                                                                                lineNumber: 1770,
                                                                                columnNumber: 39
                                                                            }, this) : null
                                                                        ]
                                                                    }, void 0, true, {
                                                                        fileName: "[project]/app/HomeSplitClient.tsx",
                                                                        lineNumber: 1762,
                                                                        columnNumber: 29
                                                                    }, this)
                                                                ]
                                                            }, e.id, true, {
                                                                fileName: "[project]/app/HomeSplitClient.tsx",
                                                                lineNumber: 1746,
                                                                columnNumber: 27
                                                            }, this);
                                                        })
                                                    ]
                                                }, (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$calendar$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["dayKey"])(g.date), true, {
                                                    fileName: "[project]/app/HomeSplitClient.tsx",
                                                    lineNumber: 1737,
                                                    columnNumber: 21
                                                }, this))
                                        }, void 0, false, {
                                            fileName: "[project]/app/HomeSplitClient.tsx",
                                            lineNumber: 1735,
                                            columnNumber: 17
                                        }, this)
                                    }, void 0, false, {
                                        fileName: "[project]/app/HomeSplitClient.tsx",
                                        lineNumber: 1734,
                                        columnNumber: 15
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/app/HomeSplitClient.tsx",
                                lineNumber: 1708,
                                columnNumber: 13
                            }, this) : null
                        }, void 0, false, {
                            fileName: "[project]/app/HomeSplitClient.tsx",
                            lineNumber: 1672,
                            columnNumber: 9
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/app/HomeSplitClient.tsx",
                        lineNumber: 1665,
                        columnNumber: 7
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/app/HomeSplitClient.tsx",
                lineNumber: 808,
                columnNumber: 5
            }, this)
        ]
    }, void 0, true);
}
}),
];

//# sourceMappingURL=_c7f59ef7._.js.map