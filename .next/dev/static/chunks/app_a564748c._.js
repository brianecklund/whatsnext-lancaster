(globalThis.TURBOPACK || (globalThis.TURBOPACK = [])).push([typeof document === "object" ? document.currentScript : undefined,
"[project]/app/components/useSmoothWheel.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "useSmoothWheel",
    ()=>useSmoothWheel
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var _s = __turbopack_context__.k.signature();
"use client";
;
function useSmoothWheel(containerSelector = ".scroll") {
    _s();
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "useSmoothWheel.useEffect": ()=>{
            if ("TURBOPACK compile-time falsy", 0) //TURBOPACK unreachable
            ;
            const reduce = window.matchMedia?.("(prefers-reduced-motion: reduce)")?.matches;
            if (reduce) return;
            const isCoarse = window.matchMedia?.("(pointer: coarse)")?.matches;
            if (isCoarse) return;
            const containers = Array.from(document.querySelectorAll(containerSelector));
            if (!containers.length) return;
            const state = new Map();
            const clamp = {
                "useSmoothWheel.useEffect.clamp": (n, min, max)=>Math.max(min, Math.min(max, n))
            }["useSmoothWheel.useEffect.clamp"];
            const onWheel = {
                "useSmoothWheel.useEffect.onWheel": (el, e)=>{
                    // Let trackpads behave naturally (optional heuristic)
                    const looksLikeTrackpad = e.deltaMode === 0 && Math.abs(e.deltaY) < 12;
                    if (looksLikeTrackpad) return;
                    // Only take over vertical wheel scrolling
                    if (Math.abs(e.deltaX) > 0) return;
                    e.preventDefault();
                    const s = state.get(el) ?? {
                        target: el.scrollTop,
                        raf: null
                    };
                    // More pronounced inertia: amplify wheel input slightly
                    // and ease toward the target more slowly in RAF.
                    s.target = clamp(s.target + e.deltaY * 1.35, 0, Math.max(0, el.scrollHeight - el.clientHeight));
                    if (s.raf == null) {
                        const tick = {
                            "useSmoothWheel.useEffect.onWheel.tick": ()=>{
                                const cur = el.scrollTop;
                                const diff = s.target - cur;
                                // Smaller factor = longer glide
                                el.scrollTop = cur + diff * 0.10;
                                if (Math.abs(diff) < 0.25) {
                                    el.scrollTop = s.target;
                                    s.raf = null;
                                    return;
                                }
                                s.raf = requestAnimationFrame(tick);
                            }
                        }["useSmoothWheel.useEffect.onWheel.tick"];
                        s.raf = requestAnimationFrame(tick);
                    }
                    state.set(el, s);
                }
            }["useSmoothWheel.useEffect.onWheel"];
            const offs = [];
            for (const el of containers){
                const fn = {
                    "useSmoothWheel.useEffect.fn": (e)=>onWheel(el, e)
                }["useSmoothWheel.useEffect.fn"];
                el.addEventListener("wheel", fn, {
                    passive: false
                });
                offs.push({
                    "useSmoothWheel.useEffect": ()=>el.removeEventListener("wheel", fn)
                }["useSmoothWheel.useEffect"]);
            }
            return ({
                "useSmoothWheel.useEffect": ()=>{
                    offs.forEach({
                        "useSmoothWheel.useEffect": (off)=>off()
                    }["useSmoothWheel.useEffect"]);
                    for (const s of state.values()){
                        if (s.raf) cancelAnimationFrame(s.raf);
                    }
                    state.clear();
                }
            })["useSmoothWheel.useEffect"];
        }
    }["useSmoothWheel.useEffect"], [
        containerSelector
    ]);
}
_s(useSmoothWheel, "OD7bBpZva5O2jO+Puf00hKivP7c=");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/app/locations/LocationsSplitClient.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>LocationsSplitClient
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$components$2f$useSmoothWheel$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/app/components/useSmoothWheel.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/navigation.js [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
"use client";
;
;
;
function normalize(v) {
    return (v || "").toLowerCase().trim();
}
function LocationsSplitClient({ locations }) {
    _s();
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$components$2f$useSmoothWheel$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useSmoothWheel"])(".scroll");
    const router = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRouter"])();
    const pathname = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["usePathname"])();
    const searchParams = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useSearchParams"])();
    const selectedKey = searchParams.get("location");
    const q = searchParams.get("q") ?? "";
    const cat = searchParams.get("cat") ?? "";
    function navigate(params) {
        const qs = params.toString();
        router.replace(qs ? `/locations?${qs}` : "/locations");
    }
    function setSelected(key) {
        const params = new URLSearchParams(searchParams.toString());
        params.set("location", key);
        navigate(params);
    }
    function clearSelected() {
        const params = new URLSearchParams(searchParams.toString());
        params.delete("location");
        navigate(params);
    }
    function setQuery(next) {
        const params = new URLSearchParams(searchParams.toString());
        if (!next) params.delete("q");
        else params.set("q", next);
        navigate(params);
    }
    function setCategory(next) {
        const params = new URLSearchParams(searchParams.toString());
        if (!next) params.delete("cat");
        else params.set("cat", next);
        params.delete("location");
        navigate(params);
    }
    const categories = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMemo"])({
        "LocationsSplitClient.useMemo[categories]": ()=>{
            const set = new Set();
            for (const l of locations){
                if (l.category) set.add(l.category);
            }
            return Array.from(set).sort({
                "LocationsSplitClient.useMemo[categories]": (a, b)=>a.localeCompare(b)
            }["LocationsSplitClient.useMemo[categories]"]);
        }
    }["LocationsSplitClient.useMemo[categories]"], [
        locations
    ]);
    const filtered = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMemo"])({
        "LocationsSplitClient.useMemo[filtered]": ()=>{
            const nq = normalize(q);
            const nc = normalize(cat);
            return locations.filter({
                "LocationsSplitClient.useMemo[filtered]": (l)=>{
                    const hay = normalize([
                        l.name ?? "",
                        l.address ?? "",
                        l.category ?? "",
                        l.description ?? ""
                    ].filter(Boolean).join(" "));
                    const matchesSearch = !nq || hay.includes(nq);
                    const matchesCat = !nc || normalize(l.category ?? "") === nc;
                    return matchesSearch && matchesCat;
                }
            }["LocationsSplitClient.useMemo[filtered]"]);
        }
    }["LocationsSplitClient.useMemo[filtered]"], [
        locations,
        q,
        cat
    ]);
    const selectedDesktop = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMemo"])({
        "LocationsSplitClient.useMemo[selectedDesktop]": ()=>{
            if (!filtered.length) return null;
            if (!selectedKey) return filtered[0];
            return filtered.find({
                "LocationsSplitClient.useMemo[selectedDesktop]": (l)=>l.key === selectedKey
            }["LocationsSplitClient.useMemo[selectedDesktop]"]) ?? filtered[0];
        }
    }["LocationsSplitClient.useMemo[selectedDesktop]"], [
        filtered,
        selectedKey
    ]);
    const selectedMobile = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMemo"])({
        "LocationsSplitClient.useMemo[selectedMobile]": ()=>{
            if (!selectedKey) return null;
            return filtered.find({
                "LocationsSplitClient.useMemo[selectedMobile]": (l)=>l.key === selectedKey
            }["LocationsSplitClient.useMemo[selectedMobile]"]) ?? null;
        }
    }["LocationsSplitClient.useMemo[selectedMobile]"], [
        filtered,
        selectedKey
    ]);
    const mobileDetailOpen = Boolean(selectedKey);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "pageShell",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "tagline",
                children: "A directory of places in Lancaster to explore."
            }, void 0, false, {
                fileName: "[project]/app/locations/LocationsSplitClient.tsx",
                lineNumber: 91,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "split",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
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
                                                    fileName: "[project]/app/locations/LocationsSplitClient.tsx",
                                                    lineNumber: 99,
                                                    columnNumber: 17
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                    type: "button",
                                                    className: "tabBtn",
                                                    "data-active": pathname.startsWith("/locations") ? "true" : "false",
                                                    onClick: ()=>router.push("/locations"),
                                                    children: "Directory"
                                                }, void 0, false, {
                                                    fileName: "[project]/app/locations/LocationsSplitClient.tsx",
                                                    lineNumber: 107,
                                                    columnNumber: 17
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                    type: "button",
                                                    className: "tabBtn",
                                                    "data-active": pathname.startsWith("/updates") ? "true" : "false",
                                                    onClick: ()=>router.push("/updates"),
                                                    children: "Updates"
                                                }, void 0, false, {
                                                    fileName: "[project]/app/locations/LocationsSplitClient.tsx",
                                                    lineNumber: 115,
                                                    columnNumber: 17
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/app/locations/LocationsSplitClient.tsx",
                                            lineNumber: 98,
                                            columnNumber: 15
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "leftControls",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                                    className: "searchInput",
                                                    value: q,
                                                    onChange: (e)=>setQuery(e.target.value),
                                                    placeholder: "Search",
                                                    "aria-label": "Search locations"
                                                }, void 0, false, {
                                                    fileName: "[project]/app/locations/LocationsSplitClient.tsx",
                                                    lineNumber: 126,
                                                    columnNumber: 17
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "typePills",
                                                    role: "group",
                                                    "aria-label": "Directory filters",
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                            type: "button",
                                                            className: "typePill",
                                                            "data-active": !cat ? "true" : "false",
                                                            onClick: ()=>setCategory(null),
                                                            children: "All"
                                                        }, void 0, false, {
                                                            fileName: "[project]/app/locations/LocationsSplitClient.tsx",
                                                            lineNumber: 135,
                                                            columnNumber: 3
                                                        }, this),
                                                        categories.map((t)=>{
                                                            const on = normalize(cat ?? "") === normalize(t);
                                                            return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                                type: "button",
                                                                className: "typePill",
                                                                "data-active": on ? "true" : "false",
                                                                onClick: ()=>setCategory(on ? null : t),
                                                                children: t
                                                            }, t, false, {
                                                                fileName: "[project]/app/locations/LocationsSplitClient.tsx",
                                                                lineNumber: 146,
                                                                columnNumber: 7
                                                            }, this);
                                                        })
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/app/locations/LocationsSplitClient.tsx",
                                                    lineNumber: 134,
                                                    columnNumber: 1
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/app/locations/LocationsSplitClient.tsx",
                                            lineNumber: 125,
                                            columnNumber: 15
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/app/locations/LocationsSplitClient.tsx",
                                    lineNumber: 97,
                                    columnNumber: 13
                                }, this),
                                filtered.length === 0 ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "emptyList",
                                    children: "No listings yet."
                                }, void 0, false, {
                                    fileName: "[project]/app/locations/LocationsSplitClient.tsx",
                                    lineNumber: 163,
                                    columnNumber: 15
                                }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    style: {
                                        paddingTop: 6
                                    },
                                    children: filtered.map((l)=>{
                                        const active = selectedKey ? selectedKey === l.key : selectedDesktop?.key === l.key;
                                        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                            className: "eventRow",
                                            "data-active": active ? "true" : "false",
                                            onClick: ()=>setSelected(l.key),
                                            type: "button",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                    className: "eventRowTitle",
                                                    children: l.name ?? "Untitled listing"
                                                }, void 0, false, {
                                                    fileName: "[project]/app/locations/LocationsSplitClient.tsx",
                                                    lineNumber: 176,
                                                    columnNumber: 23
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                    className: "eventRowMeta",
                                                    children: [
                                                        l.category ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                            children: l.category
                                                        }, void 0, false, {
                                                            fileName: "[project]/app/locations/LocationsSplitClient.tsx",
                                                            lineNumber: 178,
                                                            columnNumber: 39
                                                        }, this) : null,
                                                        l.address ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                            className: "dot",
                                                            children: "•"
                                                        }, void 0, false, {
                                                            fileName: "[project]/app/locations/LocationsSplitClient.tsx",
                                                            lineNumber: 179,
                                                            columnNumber: 38
                                                        }, this) : null,
                                                        l.address ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                            children: l.address
                                                        }, void 0, false, {
                                                            fileName: "[project]/app/locations/LocationsSplitClient.tsx",
                                                            lineNumber: 180,
                                                            columnNumber: 38
                                                        }, this) : null
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/app/locations/LocationsSplitClient.tsx",
                                                    lineNumber: 177,
                                                    columnNumber: 23
                                                }, this)
                                            ]
                                        }, l.id, true, {
                                            fileName: "[project]/app/locations/LocationsSplitClient.tsx",
                                            lineNumber: 169,
                                            columnNumber: 21
                                        }, this);
                                    })
                                }, void 0, false, {
                                    fileName: "[project]/app/locations/LocationsSplitClient.tsx",
                                    lineNumber: 165,
                                    columnNumber: 15
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/app/locations/LocationsSplitClient.tsx",
                            lineNumber: 96,
                            columnNumber: 11
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/app/locations/LocationsSplitClient.tsx",
                        lineNumber: 95,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "pane paneRight",
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "scroll",
                            children: !selectedDesktop ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "emptyRight",
                                children: "Select a listing to see details."
                            }, void 0, false, {
                                fileName: "[project]/app/locations/LocationsSplitClient.tsx",
                                lineNumber: 195,
                                columnNumber: 15
                            }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(LocationDetail, {
                                location: selectedDesktop
                            }, void 0, false, {
                                fileName: "[project]/app/locations/LocationsSplitClient.tsx",
                                lineNumber: 197,
                                columnNumber: 15
                            }, this)
                        }, void 0, false, {
                            fileName: "[project]/app/locations/LocationsSplitClient.tsx",
                            lineNumber: 193,
                            columnNumber: 11
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/app/locations/LocationsSplitClient.tsx",
                        lineNumber: 192,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/app/locations/LocationsSplitClient.tsx",
                lineNumber: 93,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "mobileTabs",
                "aria-label": "Primary navigation",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("a", {
                        className: "tabBtn",
                        href: "/",
                        children: "Calendar"
                    }, void 0, false, {
                        fileName: "[project]/app/locations/LocationsSplitClient.tsx",
                        lineNumber: 205,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("a", {
                        className: "tabBtn",
                        href: "/locations",
                        "aria-current": "page",
                        children: "Directory"
                    }, void 0, false, {
                        fileName: "[project]/app/locations/LocationsSplitClient.tsx",
                        lineNumber: 206,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("a", {
                        className: "tabBtn",
                        href: "/updates",
                        children: "Updates"
                    }, void 0, false, {
                        fileName: "[project]/app/locations/LocationsSplitClient.tsx",
                        lineNumber: 207,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/app/locations/LocationsSplitClient.tsx",
                lineNumber: 204,
                columnNumber: 7
            }, this),
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
                                fileName: "[project]/app/locations/LocationsSplitClient.tsx",
                                lineNumber: 217,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "mobileDetailTitle",
                                children: "Listing"
                            }, void 0, false, {
                                fileName: "[project]/app/locations/LocationsSplitClient.tsx",
                                lineNumber: 220,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/app/locations/LocationsSplitClient.tsx",
                        lineNumber: 216,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "scroll",
                        style: {
                            padding: "0 16px 84px 16px"
                        },
                        children: selectedMobile ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(LocationDetail, {
                            location: selectedMobile
                        }, void 0, false, {
                            fileName: "[project]/app/locations/LocationsSplitClient.tsx",
                            lineNumber: 223,
                            columnNumber: 29
                        }, this) : null
                    }, void 0, false, {
                        fileName: "[project]/app/locations/LocationsSplitClient.tsx",
                        lineNumber: 222,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/app/locations/LocationsSplitClient.tsx",
                lineNumber: 211,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/app/locations/LocationsSplitClient.tsx",
        lineNumber: 90,
        columnNumber: 5
    }, this);
}
_s(LocationsSplitClient, "gfq5Pb0MHC9zekmfSb+sXmVfnJ8=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$components$2f$useSmoothWheel$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useSmoothWheel"],
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRouter"],
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["usePathname"],
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useSearchParams"]
    ];
});
_c = LocationsSplitClient;
function LocationDetail({ location }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "detailCard",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "detailTitle fadeInItem",
                style: {
                    animationDelay: "260ms"
                },
                children: location.name ?? "Untitled listing"
            }, void 0, false, {
                fileName: "[project]/app/locations/LocationsSplitClient.tsx",
                lineNumber: 233,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "detailMeta fadeInItem",
                style: {
                    animationDelay: "320ms"
                },
                children: [
                    location.category ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                        className: "badge",
                        children: location.category
                    }, void 0, false, {
                        fileName: "[project]/app/locations/LocationsSplitClient.tsx",
                        lineNumber: 238,
                        columnNumber: 30
                    }, this) : null,
                    location.address ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                        className: "muted",
                        children: location.address
                    }, void 0, false, {
                        fileName: "[project]/app/locations/LocationsSplitClient.tsx",
                        lineNumber: 239,
                        columnNumber: 29
                    }, this) : null
                ]
            }, void 0, true, {
                fileName: "[project]/app/locations/LocationsSplitClient.tsx",
                lineNumber: 237,
                columnNumber: 7
            }, this),
            location.website ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                style: {
                    marginTop: 10
                },
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("a", {
                    className: "link",
                    href: location.website,
                    target: "_blank",
                    rel: "noreferrer",
                    children: "Website"
                }, void 0, false, {
                    fileName: "[project]/app/locations/LocationsSplitClient.tsx",
                    lineNumber: 244,
                    columnNumber: 11
                }, this)
            }, void 0, false, {
                fileName: "[project]/app/locations/LocationsSplitClient.tsx",
                lineNumber: 243,
                columnNumber: 9
            }, this) : null,
            location.description ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "detailBody fadeInItem",
                style: {
                    marginTop: 14,
                    animationDelay: "360ms"
                },
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                    children: location.description
                }, void 0, false, {
                    fileName: "[project]/app/locations/LocationsSplitClient.tsx",
                    lineNumber: 252,
                    columnNumber: 11
                }, this)
            }, void 0, false, {
                fileName: "[project]/app/locations/LocationsSplitClient.tsx",
                lineNumber: 251,
                columnNumber: 9
            }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "detailBody fadeInItem",
                style: {
                    marginTop: 14,
                    animationDelay: "360ms"
                },
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                    className: "muted",
                    children: "No description yet."
                }, void 0, false, {
                    fileName: "[project]/app/locations/LocationsSplitClient.tsx",
                    lineNumber: 256,
                    columnNumber: 11
                }, this)
            }, void 0, false, {
                fileName: "[project]/app/locations/LocationsSplitClient.tsx",
                lineNumber: 255,
                columnNumber: 9
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/app/locations/LocationsSplitClient.tsx",
        lineNumber: 232,
        columnNumber: 5
    }, this);
}
_c1 = LocationDetail;
var _c, _c1;
__turbopack_context__.k.register(_c, "LocationsSplitClient");
__turbopack_context__.k.register(_c1, "LocationDetail");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
]);

//# sourceMappingURL=app_a564748c._.js.map