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
"[project]/app/updates/UpdatesSplitClient.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>UpdatesSplitClient
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
function norm(v) {
    return (v || "").toLowerCase().trim();
}
function UpdatesSplitClient({ updates }) {
    _s();
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$components$2f$useSmoothWheel$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useSmoothWheel"])(".scroll");
    const router = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRouter"])();
    const sp = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useSearchParams"])();
    const pathname = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["usePathname"])();
    const q = sp.get("q") || "";
    const tag = sp.get("tag") || "";
    const selectedKey = sp.get("u") || "";
    const [isMobile, setIsMobile] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [mobileTab, setMobileTab] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])("list");
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "UpdatesSplitClient.useEffect": ()=>{
            const mq = window.matchMedia("(max-width: 980px)");
            const apply = {
                "UpdatesSplitClient.useEffect.apply": ()=>setIsMobile(mq.matches)
            }["UpdatesSplitClient.useEffect.apply"];
            apply();
            mq.addEventListener("change", apply);
            return ({
                "UpdatesSplitClient.useEffect": ()=>mq.removeEventListener("change", apply)
            })["UpdatesSplitClient.useEffect"];
        }
    }["UpdatesSplitClient.useEffect"], []);
    function setParam(key, value) {
        const params = new URLSearchParams(sp.toString());
        if (!value) params.delete(key);
        else params.set(key, value);
        router.push(`/updates?${params.toString()}`);
    }
    function setSelected(id) {
        setParam("u", id);
        if (isMobile) setMobileTab("detail");
    }
    // Available tag filters (unique, sorted)
    const tags = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMemo"])({
        "UpdatesSplitClient.useMemo[tags]": ()=>{
            const s = new Set();
            for (const u of updates){
                for (const t of u.tags || []){
                    const tt = (t || "").trim();
                    if (tt) s.add(tt);
                }
            }
            return Array.from(s).sort({
                "UpdatesSplitClient.useMemo[tags]": (a, b)=>a.localeCompare(b)
            }["UpdatesSplitClient.useMemo[tags]"]);
        }
    }["UpdatesSplitClient.useMemo[tags]"], [
        updates
    ]);
    const filtered = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMemo"])({
        "UpdatesSplitClient.useMemo[filtered]": ()=>{
            const nq = norm(q);
            const nt = norm(tag);
            return updates.filter({
                "UpdatesSplitClient.useMemo[filtered]": (u)=>{
                    if (nt) {
                        const utags = (u.tags || []).map({
                            "UpdatesSplitClient.useMemo[filtered].utags": (t)=>norm(t)
                        }["UpdatesSplitClient.useMemo[filtered].utags"]);
                        if (!utags.includes(nt)) return false;
                    }
                    if (!nq) return true;
                    const hay = norm([
                        u.title,
                        ...u.tags || [],
                        u.body || ""
                    ].join(" "));
                    return hay.includes(nq);
                }
            }["UpdatesSplitClient.useMemo[filtered]"]);
        }
    }["UpdatesSplitClient.useMemo[filtered]"], [
        updates,
        q,
        tag
    ]);
    const selectedDesktop = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMemo"])({
        "UpdatesSplitClient.useMemo[selectedDesktop]": ()=>{
            if (!filtered.length) return null;
            if (!selectedKey) return filtered[0];
            return filtered.find({
                "UpdatesSplitClient.useMemo[selectedDesktop]": (u)=>u.id === selectedKey
            }["UpdatesSplitClient.useMemo[selectedDesktop]"]) ?? filtered[0];
        }
    }["UpdatesSplitClient.useMemo[selectedDesktop]"], [
        filtered,
        selectedKey
    ]);
    const selectedMobile = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMemo"])({
        "UpdatesSplitClient.useMemo[selectedMobile]": ()=>{
            if (!selectedKey) return null;
            return filtered.find({
                "UpdatesSplitClient.useMemo[selectedMobile]": (u)=>u.id === selectedKey
            }["UpdatesSplitClient.useMemo[selectedMobile]"]) ?? null;
        }
    }["UpdatesSplitClient.useMemo[selectedMobile]"], [
        filtered,
        selectedKey
    ]);
    const selected = isMobile ? selectedMobile : selectedDesktop;
    const showLeft = !isMobile || mobileTab === "list";
    const showRight = !isMobile || mobileTab === "detail";
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "pageShell",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "tagline",
                children: "Updates, openings, menu changes, PSAs, and quick announcements."
            }, void 0, false, {
                fileName: "[project]/app/updates/UpdatesSplitClient.tsx",
                lineNumber: 101,
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
                                                    fileName: "[project]/app/updates/UpdatesSplitClient.tsx",
                                                    lineNumber: 110,
                                                    columnNumber: 19
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                    type: "button",
                                                    className: "tabBtn",
                                                    "data-active": pathname?.startsWith("/locations") ? "true" : "false",
                                                    onClick: ()=>router.push("/locations"),
                                                    children: "Directory"
                                                }, void 0, false, {
                                                    fileName: "[project]/app/updates/UpdatesSplitClient.tsx",
                                                    lineNumber: 118,
                                                    columnNumber: 19
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                    type: "button",
                                                    className: "tabBtn",
                                                    "data-active": pathname?.startsWith("/updates") ? "true" : "false",
                                                    onClick: ()=>router.push("/updates"),
                                                    children: "Updates"
                                                }, void 0, false, {
                                                    fileName: "[project]/app/updates/UpdatesSplitClient.tsx",
                                                    lineNumber: 126,
                                                    columnNumber: 19
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/app/updates/UpdatesSplitClient.tsx",
                                            lineNumber: 109,
                                            columnNumber: 17
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "leftControls",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                                    className: "searchInput",
                                                    placeholder: "Search updates…",
                                                    value: q,
                                                    onChange: (e)=>setParam("q", e.target.value),
                                                    "aria-label": "Search updates"
                                                }, void 0, false, {
                                                    fileName: "[project]/app/updates/UpdatesSplitClient.tsx",
                                                    lineNumber: 137,
                                                    columnNumber: 19
                                                }, this),
                                                q ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                    className: "clearBtn",
                                                    type: "button",
                                                    onClick: ()=>{
                                                        setParam("q", null);
                                                        setParam("tag", null);
                                                    },
                                                    children: "Clear"
                                                }, void 0, false, {
                                                    fileName: "[project]/app/updates/UpdatesSplitClient.tsx",
                                                    lineNumber: 145,
                                                    columnNumber: 21
                                                }, this) : null,
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "typePills",
                                                    role: "group",
                                                    "aria-label": "Update filters",
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                            type: "button",
                                                            className: "typePill",
                                                            "data-active": !tag ? "true" : "false",
                                                            onClick: ()=>setParam("tag", null),
                                                            children: "All"
                                                        }, void 0, false, {
                                                            fileName: "[project]/app/updates/UpdatesSplitClient.tsx",
                                                            lineNumber: 154,
                                                            columnNumber: 3
                                                        }, this),
                                                        tags.map((t)=>{
                                                            const on = norm(tag) === norm(t);
                                                            return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                                type: "button",
                                                                className: "typePill",
                                                                "data-active": on ? "true" : "false",
                                                                onClick: ()=>setParam("tag", on ? null : t),
                                                                children: t
                                                            }, t, false, {
                                                                fileName: "[project]/app/updates/UpdatesSplitClient.tsx",
                                                                lineNumber: 165,
                                                                columnNumber: 7
                                                            }, this);
                                                        })
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/app/updates/UpdatesSplitClient.tsx",
                                                    lineNumber: 153,
                                                    columnNumber: 1
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/app/updates/UpdatesSplitClient.tsx",
                                            lineNumber: 136,
                                            columnNumber: 17
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/app/updates/UpdatesSplitClient.tsx",
                                    lineNumber: 108,
                                    columnNumber: 15
                                }, this),
                                filtered.length === 0 ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "emptyList",
                                    children: "No updates found."
                                }, void 0, false, {
                                    fileName: "[project]/app/updates/UpdatesSplitClient.tsx",
                                    lineNumber: 182,
                                    columnNumber: 17
                                }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    style: {
                                        paddingTop: 6
                                    },
                                    children: filtered.map((u)=>{
                                        const active = selected?.id === u.id;
                                        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                            className: "eventRow",
                                            "data-active": active ? "true" : "false",
                                            onClick: ()=>setSelected(u.id),
                                            type: "button",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                    className: "eventRowTitle",
                                                    children: u.title
                                                }, void 0, false, {
                                                    fileName: "[project]/app/updates/UpdatesSplitClient.tsx",
                                                    lineNumber: 195,
                                                    columnNumber: 25
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                    className: "eventRowMeta",
                                                    children: u.date ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                        children: u.date
                                                    }, void 0, false, {
                                                        fileName: "[project]/app/updates/UpdatesSplitClient.tsx",
                                                        lineNumber: 197,
                                                        columnNumber: 37
                                                    }, this) : null
                                                }, void 0, false, {
                                                    fileName: "[project]/app/updates/UpdatesSplitClient.tsx",
                                                    lineNumber: 196,
                                                    columnNumber: 25
                                                }, this),
                                                u.tags?.length ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                    className: "tagRow",
                                                    "aria-label": "Update tags",
                                                    children: u.tags.slice(0, 3).map((t)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                            className: "tagChip",
                                                            children: t
                                                        }, t, false, {
                                                            fileName: "[project]/app/updates/UpdatesSplitClient.tsx",
                                                            lineNumber: 202,
                                                            columnNumber: 31
                                                        }, this))
                                                }, void 0, false, {
                                                    fileName: "[project]/app/updates/UpdatesSplitClient.tsx",
                                                    lineNumber: 200,
                                                    columnNumber: 27
                                                }, this) : null
                                            ]
                                        }, u.id, true, {
                                            fileName: "[project]/app/updates/UpdatesSplitClient.tsx",
                                            lineNumber: 188,
                                            columnNumber: 23
                                        }, this);
                                    })
                                }, void 0, false, {
                                    fileName: "[project]/app/updates/UpdatesSplitClient.tsx",
                                    lineNumber: 184,
                                    columnNumber: 17
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/app/updates/UpdatesSplitClient.tsx",
                            lineNumber: 107,
                            columnNumber: 13
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/app/updates/UpdatesSplitClient.tsx",
                        lineNumber: 106,
                        columnNumber: 11
                    }, this) : null,
                    showRight ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("section", {
                        className: "pane paneRight",
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "scroll",
                            children: !selected ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "emptyRight",
                                children: "Select an update to view details."
                            }, void 0, false, {
                                fileName: "[project]/app/updates/UpdatesSplitClient.tsx",
                                lineNumber: 222,
                                columnNumber: 17
                            }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "detailCard",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "detailHeader",
                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "detailTitle fadeInItem",
                                                    style: {
                                                        animationDelay: "260ms"
                                                    },
                                                    children: selected.title
                                                }, void 0, false, {
                                                    fileName: "[project]/app/updates/UpdatesSplitClient.tsx",
                                                    lineNumber: 227,
                                                    columnNumber: 23
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "detailMeta fadeInItem",
                                                    style: {
                                                        animationDelay: "320ms"
                                                    },
                                                    children: selected.date ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                        children: selected.date
                                                    }, void 0, false, {
                                                        fileName: "[project]/app/updates/UpdatesSplitClient.tsx",
                                                        lineNumber: 231,
                                                        columnNumber: 42
                                                    }, this) : null
                                                }, void 0, false, {
                                                    fileName: "[project]/app/updates/UpdatesSplitClient.tsx",
                                                    lineNumber: 230,
                                                    columnNumber: 23
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/app/updates/UpdatesSplitClient.tsx",
                                            lineNumber: 226,
                                            columnNumber: 21
                                        }, this)
                                    }, void 0, false, {
                                        fileName: "[project]/app/updates/UpdatesSplitClient.tsx",
                                        lineNumber: 225,
                                        columnNumber: 19
                                    }, this),
                                    selected.tags?.length ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "tagRow",
                                        style: {
                                            marginTop: 10
                                        },
                                        children: selected.tags.map((t)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                className: "tagChip",
                                                children: t
                                            }, t, false, {
                                                fileName: "[project]/app/updates/UpdatesSplitClient.tsx",
                                                lineNumber: 239,
                                                columnNumber: 25
                                            }, this))
                                    }, void 0, false, {
                                        fileName: "[project]/app/updates/UpdatesSplitClient.tsx",
                                        lineNumber: 237,
                                        columnNumber: 21
                                    }, this) : null,
                                    selected.body ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "detailDesc fadeInItem",
                                        style: {
                                            animationDelay: "360ms"
                                        },
                                        children: selected.body
                                    }, void 0, false, {
                                        fileName: "[project]/app/updates/UpdatesSplitClient.tsx",
                                        lineNumber: 247,
                                        columnNumber: 21
                                    }, this) : null,
                                    selected.link ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "detailLinks",
                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("a", {
                                            className: "pillBtn",
                                            href: selected.link,
                                            target: "_blank",
                                            rel: "noreferrer",
                                            children: "Learn more"
                                        }, void 0, false, {
                                            fileName: "[project]/app/updates/UpdatesSplitClient.tsx",
                                            lineNumber: 254,
                                            columnNumber: 23
                                        }, this)
                                    }, void 0, false, {
                                        fileName: "[project]/app/updates/UpdatesSplitClient.tsx",
                                        lineNumber: 253,
                                        columnNumber: 21
                                    }, this) : null
                                ]
                            }, void 0, true, {
                                fileName: "[project]/app/updates/UpdatesSplitClient.tsx",
                                lineNumber: 224,
                                columnNumber: 17
                            }, this)
                        }, void 0, false, {
                            fileName: "[project]/app/updates/UpdatesSplitClient.tsx",
                            lineNumber: 220,
                            columnNumber: 13
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/app/updates/UpdatesSplitClient.tsx",
                        lineNumber: 219,
                        columnNumber: 11
                    }, this) : null
                ]
            }, void 0, true, {
                fileName: "[project]/app/updates/UpdatesSplitClient.tsx",
                lineNumber: 103,
                columnNumber: 7
            }, this),
            isMobile ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "mobileTabs",
                role: "tablist",
                "aria-label": "Updates view",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                        type: "button",
                        className: "mobileTab",
                        "data-active": mobileTab === "list" ? "true" : "false",
                        onClick: ()=>setMobileTab("list"),
                        children: "List"
                    }, void 0, false, {
                        fileName: "[project]/app/updates/UpdatesSplitClient.tsx",
                        lineNumber: 269,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                        type: "button",
                        className: "mobileTab",
                        "data-active": mobileTab === "detail" ? "true" : "false",
                        onClick: ()=>setMobileTab("detail"),
                        children: "Details"
                    }, void 0, false, {
                        fileName: "[project]/app/updates/UpdatesSplitClient.tsx",
                        lineNumber: 277,
                        columnNumber: 11
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/app/updates/UpdatesSplitClient.tsx",
                lineNumber: 268,
                columnNumber: 9
            }, this) : null
        ]
    }, void 0, true, {
        fileName: "[project]/app/updates/UpdatesSplitClient.tsx",
        lineNumber: 100,
        columnNumber: 5
    }, this);
}
_s(UpdatesSplitClient, "vBKfJjH5Yw2SipaODHos7XCJTxE=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$components$2f$useSmoothWheel$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useSmoothWheel"],
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRouter"],
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useSearchParams"],
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["usePathname"]
    ];
});
_c = UpdatesSplitClient;
var _c;
__turbopack_context__.k.register(_c, "UpdatesSplitClient");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
]);

//# sourceMappingURL=app_61d73739._.js.map