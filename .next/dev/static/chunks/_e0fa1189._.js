(globalThis.TURBOPACK || (globalThis.TURBOPACK = [])).push([typeof document === "object" ? document.currentScript : undefined,
"[project]/app/components/useSmoothWheel.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "attachInertialScroll",
    ()=>attachInertialScroll,
    "useSmoothWheel",
    ()=>useSmoothWheel
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/navigation.js [app-client] (ecmascript)");
var _s = __turbopack_context__.k.signature();
"use client";
;
;
function normalizeWheelDelta(e, el) {
    let d = e.deltaY;
    if (e.deltaMode === WheelEvent.DOM_DELTA_LINE) d *= 16;
    else if (e.deltaMode === WheelEvent.DOM_DELTA_PAGE) d *= Math.max(el.clientHeight * 0.85, 120);
    return d;
}
/** If the wheel target sits inside a nested scroll container, keep native behavior. */ function wheelTargetIsNestedScroller(start, boundary) {
    let t = start;
    while(t && t !== boundary){
        if (t instanceof HTMLElement) {
            const st = getComputedStyle(t);
            const oy = st.overflowY;
            if ((oy === "auto" || oy === "scroll" || oy === "overlay") && t.scrollHeight > t.clientHeight + 2) {
                return true;
            }
        }
        t = t.parentNode;
    }
    return false;
}
function attachInertialScroll(el, options) {
    if ("TURBOPACK compile-time falsy", 0) //TURBOPACK unreachable
    ;
    const reduce = window.matchMedia?.("(prefers-reduced-motion: reduce)")?.matches;
    const coarse = window.matchMedia?.("(pointer: coarse)")?.matches;
    if (reduce || coarse) return ()=>{};
    let raf = null;
    let velocity = 0;
    const IMPULSE = 0.038;
    const FRICTION = 0.955;
    const MAX_V = 40;
    const STOP_EPS = 0.055;
    const tick = ()=>{
        const maxScroll = Math.max(0, el.scrollHeight - el.clientHeight);
        if (maxScroll < 1) {
            velocity = 0;
            raf = null;
            return;
        }
        const st = el.scrollTop;
        const v = velocity;
        const next = st + v;
        if (next <= 0) {
            el.scrollTop = 0;
            velocity = 0;
        } else if (next >= maxScroll) {
            el.scrollTop = maxScroll;
            velocity = 0;
        } else {
            el.scrollTop = next;
            velocity = v * FRICTION;
        }
        options?.onProgrammaticScroll?.(el);
        if (Math.abs(velocity) < STOP_EPS) {
            velocity = 0;
            raf = null;
            options?.onProgrammaticScroll?.(el);
            return;
        }
        raf = window.requestAnimationFrame(tick);
    };
    const onWheel = (e)=>{
        if (e.ctrlKey) return;
        if (Math.abs(e.deltaX) > Math.abs(e.deltaY)) return;
        if (el.scrollHeight <= el.clientHeight + 2) return;
        if (wheelTargetIsNestedScroller(e.target, el)) return;
        e.preventDefault();
        const delta = normalizeWheelDelta(e, el);
        velocity += delta * IMPULSE;
        velocity = Math.max(-MAX_V, Math.min(MAX_V, velocity));
        if (raf == null) raf = window.requestAnimationFrame(tick);
    };
    el.addEventListener("wheel", onWheel, {
        passive: false
    });
    return ()=>{
        el.removeEventListener("wheel", onWheel);
        if (raf != null) window.cancelAnimationFrame(raf);
    };
}
function useSmoothWheel(selector = ".scroll", options) {
    _s();
    const pathname = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["usePathname"])();
    const optsRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(options);
    optsRef.current = options;
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "useSmoothWheel.useEffect": ()=>{
            if (typeof document === "undefined") return;
            let cleanups = [];
            const bind = {
                "useSmoothWheel.useEffect.bind": ()=>{
                    cleanups.forEach({
                        "useSmoothWheel.useEffect.bind": (c)=>c()
                    }["useSmoothWheel.useEffect.bind"]);
                    cleanups = [];
                    const els = Array.from(document.querySelectorAll(selector));
                    for (const node of els){
                        cleanups.push(attachInertialScroll(node, {
                            onProgrammaticScroll: {
                                "useSmoothWheel.useEffect.bind": (el)=>optsRef.current?.onProgrammaticScroll?.(el)
                            }["useSmoothWheel.useEffect.bind"]
                        }));
                    }
                }
            }["useSmoothWheel.useEffect.bind"];
            bind();
            const id = window.requestAnimationFrame({
                "useSmoothWheel.useEffect.id": ()=>bind()
            }["useSmoothWheel.useEffect.id"]);
            return ({
                "useSmoothWheel.useEffect": ()=>{
                    window.cancelAnimationFrame(id);
                    cleanups.forEach({
                        "useSmoothWheel.useEffect": (c)=>c()
                    }["useSmoothWheel.useEffect"]);
                }
            })["useSmoothWheel.useEffect"];
        }
    }["useSmoothWheel.useEffect"], [
        selector,
        pathname
    ]);
}
_s(useSmoothWheel, "Hvjd7uhxl43yC2lAEJ44QOxYuDU=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["usePathname"]
    ];
});
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/app/components/ContentLayoutScrollMomentum.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>ContentLayoutScrollMomentum
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/navigation.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$components$2f$useSmoothWheel$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/app/components/useSmoothWheel.ts [app-client] (ecmascript)");
var _s = __turbopack_context__.k.signature();
"use client";
;
;
;
function isShellPath(pathname) {
    return pathname === "/" || pathname.startsWith("/locations") || pathname.startsWith("/updates");
}
function getContentScrollRoot() {
    const root = document.querySelector(".wnlPageRevealRoot");
    if (!root) return null;
    for (const child of root.children){
        if (child instanceof HTMLElement && child.classList.contains("siteHeader")) continue;
        if (child instanceof HTMLElement) return child;
    }
    return null;
}
function ContentLayoutScrollMomentum() {
    _s();
    const pathname = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["usePathname"])() ?? "";
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "ContentLayoutScrollMomentum.useEffect": ()=>{
            if ("TURBOPACK compile-time falsy", 0) //TURBOPACK unreachable
            ;
            if (isShellPath(pathname)) return;
            const reduce = window.matchMedia?.("(prefers-reduced-motion: reduce)")?.matches;
            const coarse = window.matchMedia?.("(pointer: coarse)")?.matches;
            if (reduce || coarse) return;
            let cleanup;
            let cancelled = false;
            let raf1 = 0;
            let raf2 = 0;
            const attach = {
                "ContentLayoutScrollMomentum.useEffect.attach": ()=>{
                    if (cancelled) return;
                    const el = getContentScrollRoot();
                    if (!el) return;
                    if (el.scrollHeight <= el.clientHeight + 4) return;
                    cleanup = (0, __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$components$2f$useSmoothWheel$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["attachInertialScroll"])(el);
                }
            }["ContentLayoutScrollMomentum.useEffect.attach"];
            raf1 = window.requestAnimationFrame({
                "ContentLayoutScrollMomentum.useEffect": ()=>{
                    raf2 = window.requestAnimationFrame(attach);
                }
            }["ContentLayoutScrollMomentum.useEffect"]);
            return ({
                "ContentLayoutScrollMomentum.useEffect": ()=>{
                    cancelled = true;
                    window.cancelAnimationFrame(raf1);
                    window.cancelAnimationFrame(raf2);
                    cleanup?.();
                }
            })["ContentLayoutScrollMomentum.useEffect"];
        }
    }["ContentLayoutScrollMomentum.useEffect"], [
        pathname
    ]);
    return null;
}
_s(ContentLayoutScrollMomentum, "Ejwy3p9Swaho7lLm52OirCOWqto=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["usePathname"]
    ];
});
_c = ContentLayoutScrollMomentum;
var _c;
__turbopack_context__.k.register(_c, "ContentLayoutScrollMomentum");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/app/components/PageRevealRoot.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>PageRevealRoot
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/navigation.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
"use client";
;
;
/**
 * Sitewide staged reveal: header + main on first paint / leaving the main shell.
 * Calendar ⟷ Directory ⟷ Updates stays visible: only `UnifiedShellClient` list/right cascade runs.
 */ function isMainShellRoute(pathname) {
    if (!pathname) return false;
    if (pathname === "/" || pathname === "") return true;
    if (pathname.startsWith("/locations")) return true;
    if (pathname.startsWith("/updates")) return true;
    return false;
}
function getMainScrollColumn() {
    const root = document.querySelector(".wnlPageRevealRoot");
    if (!root) return null;
    for (const child of root.children){
        if (child instanceof HTMLElement && child.classList.contains("siteHeader")) continue;
        if (child instanceof HTMLElement) return child;
    }
    return null;
}
const INITIAL_CONTENT_DELAY_MS = 24;
/** Brief hold before fade-in on client navigations (blog, donate, shell, etc.) so the swap reads as out → in. */ const ROUTE_TRANSITION_ENTER_DELAY_MS = 200;
function PageRevealRoot({ children }) {
    _s();
    const pathname = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["usePathname"])();
    const [headerReady, setHeaderReady] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [contentReady, setContentReady] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const prevPathRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(null);
    const revealTimerRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(undefined);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useLayoutEffect"])({
        "PageRevealRoot.useLayoutEffect": ()=>{
            const prev = prevPathRef.current;
            prevPathRef.current = pathname;
            const shellToShell = prev !== null && isMainShellRoute(prev) && isMainShellRoute(pathname);
            if (revealTimerRef.current != null) {
                window.clearTimeout(revealTimerRef.current);
                revealTimerRef.current = undefined;
            }
            if (shellToShell) {
                setHeaderReady(true);
                setContentReady(true);
                return;
            }
            setContentReady(false);
            setHeaderReady(true);
            const isFirstPaint = prev === null;
            const reduceMotion = window.matchMedia?.("(prefers-reduced-motion: reduce)")?.matches;
            const enterDelay = reduceMotion ? 0 : isFirstPaint ? INITIAL_CONTENT_DELAY_MS : ROUTE_TRANSITION_ENTER_DELAY_MS;
            revealTimerRef.current = window.setTimeout({
                "PageRevealRoot.useLayoutEffect": ()=>{
                    revealTimerRef.current = undefined;
                    setContentReady(true);
                }
            }["PageRevealRoot.useLayoutEffect"], enterDelay);
            return ({
                "PageRevealRoot.useLayoutEffect": ()=>{
                    if (revealTimerRef.current != null) {
                        window.clearTimeout(revealTimerRef.current);
                        revealTimerRef.current = undefined;
                    }
                }
            })["PageRevealRoot.useLayoutEffect"];
        }
    }["PageRevealRoot.useLayoutEffect"], [
        pathname
    ]);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "PageRevealRoot.useEffect": ()=>{
            if (!pathname || isMainShellRoute(pathname)) return;
            const run = {
                "PageRevealRoot.useEffect.run": ()=>{
                    const el = getMainScrollColumn();
                    if (el) el.scrollTop = 0;
                }
            }["PageRevealRoot.useEffect.run"];
            requestAnimationFrame({
                "PageRevealRoot.useEffect": ()=>{
                    requestAnimationFrame(run);
                }
            }["PageRevealRoot.useEffect"]);
        }
    }["PageRevealRoot.useEffect"], [
        pathname
    ]);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: [
            "wnlPageRevealRoot",
            headerReady ? "wnlPageRevealRoot--headerReady" : "",
            contentReady ? "wnlPageRevealRoot--contentReady" : ""
        ].filter(Boolean).join(" "),
        children: children
    }, void 0, false, {
        fileName: "[project]/app/components/PageRevealRoot.tsx",
        lineNumber: 90,
        columnNumber: 5
    }, this);
}
_s(PageRevealRoot, "Y9gP/bHLTiZUB8bH+WbCaoHFlu4=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["usePathname"]
    ];
});
_c = PageRevealRoot;
var _c;
__turbopack_context__.k.register(_c, "PageRevealRoot");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/app/components/BrandScrollSmiley.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>BrandScrollSmiley
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
"use client";
;
const BASE_DEG_PER_FRAME = 0.22;
function BrandScrollSmiley() {
    _s();
    const faceRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(null);
    const angleRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(0);
    const boostRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(0);
    const scrollTopRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(new WeakMap());
    const rafRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(0);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "BrandScrollSmiley.useEffect": ()=>{
            if ("TURBOPACK compile-time falsy", 0) //TURBOPACK unreachable
            ;
            if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
            const onScroll = {
                "BrandScrollSmiley.useEffect.onScroll": (e)=>{
                    const el = e.target;
                    if (!(el instanceof HTMLElement)) return;
                    if (el.scrollHeight <= el.clientHeight + 2) return;
                    const prev = scrollTopRef.current.get(el);
                    const st = el.scrollTop;
                    scrollTopRef.current.set(el, st);
                    if (prev === undefined) return;
                    const delta = st - prev;
                    boostRef.current += delta * 0.014;
                }
            }["BrandScrollSmiley.useEffect.onScroll"];
            const onWheel = {
                "BrandScrollSmiley.useEffect.onWheel": (e)=>{
                    boostRef.current += e.deltaY * 0.009;
                }
            }["BrandScrollSmiley.useEffect.onWheel"];
            const tick = {
                "BrandScrollSmiley.useEffect.tick": ()=>{
                    boostRef.current *= 0.94;
                    angleRef.current += BASE_DEG_PER_FRAME + boostRef.current;
                    const a = angleRef.current;
                    faceRef.current?.setAttribute("transform", `rotate(${a} 12 12)`);
                    rafRef.current = requestAnimationFrame(tick);
                }
            }["BrandScrollSmiley.useEffect.tick"];
            document.addEventListener("scroll", onScroll, true);
            document.addEventListener("wheel", onWheel, {
                passive: true,
                capture: true
            });
            rafRef.current = requestAnimationFrame(tick);
            return ({
                "BrandScrollSmiley.useEffect": ()=>{
                    document.removeEventListener("scroll", onScroll, true);
                    document.removeEventListener("wheel", onWheel, true);
                    cancelAnimationFrame(rafRef.current);
                }
            })["BrandScrollSmiley.useEffect"];
        }
    }["BrandScrollSmiley.useEffect"], []);
    const stroke = "#141418";
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
        className: "brandScrollArrow",
        "aria-hidden": true,
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
            width: "34",
            height: "34",
            viewBox: "0 0 24 24",
            className: "brandScrollArrow__svg",
            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("g", {
                ref: faceRef,
                transform: "rotate(0 12 12)",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("circle", {
                        cx: "12",
                        cy: "12",
                        r: "9.25",
                        fill: "none",
                        stroke: stroke,
                        strokeWidth: "1.35"
                    }, void 0, false, {
                        fileName: "[project]/app/components/BrandScrollSmiley.tsx",
                        lineNumber: 62,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("circle", {
                        cx: "8.35",
                        cy: "9.85",
                        r: "1.15",
                        fill: "none",
                        stroke: stroke,
                        strokeWidth: "1.2"
                    }, void 0, false, {
                        fileName: "[project]/app/components/BrandScrollSmiley.tsx",
                        lineNumber: 63,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("circle", {
                        cx: "15.65",
                        cy: "9.85",
                        r: "1.15",
                        fill: "none",
                        stroke: stroke,
                        strokeWidth: "1.2"
                    }, void 0, false, {
                        fileName: "[project]/app/components/BrandScrollSmiley.tsx",
                        lineNumber: 64,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                        d: "M 7.6 14.2 Q 12 19.2 16.4 14.2",
                        fill: "none",
                        stroke: stroke,
                        strokeWidth: "1.35",
                        strokeLinecap: "round"
                    }, void 0, false, {
                        fileName: "[project]/app/components/BrandScrollSmiley.tsx",
                        lineNumber: 65,
                        columnNumber: 11
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/app/components/BrandScrollSmiley.tsx",
                lineNumber: 61,
                columnNumber: 9
            }, this)
        }, void 0, false, {
            fileName: "[project]/app/components/BrandScrollSmiley.tsx",
            lineNumber: 60,
            columnNumber: 7
        }, this)
    }, void 0, false, {
        fileName: "[project]/app/components/BrandScrollSmiley.tsx",
        lineNumber: 59,
        columnNumber: 5
    }, this);
}
_s(BrandScrollSmiley, "CEo2Cr74PXpEdVLxjTeIarM6Jrw=");
_c = BrandScrollSmiley;
var _c;
__turbopack_context__.k.register(_c, "BrandScrollSmiley");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/app/components/segmentNavIcons.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "SegmentIconCalendar",
    ()=>SegmentIconCalendar,
    "SegmentIconChevronLeft",
    ()=>SegmentIconChevronLeft,
    "SegmentIconChevronRight",
    ()=>SegmentIconChevronRight,
    "SegmentIconDirectory",
    ()=>SegmentIconDirectory,
    "SegmentIconUpdates",
    ()=>SegmentIconUpdates
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
;
const svgProps = {
    width: 18,
    height: 18,
    viewBox: "0 0 24 24",
    fill: "none",
    xmlns: "http://www.w3.org/2000/svg",
    "aria-hidden": true
};
function SegmentIconCalendar() {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
        ...svgProps,
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
            d: "M7 3v3M17 3v3M4 9h16M6 5h12a2 2 0 012 2v12a2 2 0 01-2 2H6a2 2 0 01-2-2V7a2 2 0 012-2z",
            stroke: "currentColor",
            strokeWidth: "1.75",
            strokeLinecap: "round",
            strokeLinejoin: "round"
        }, void 0, false, {
            fileName: "[project]/app/components/segmentNavIcons.tsx",
            lineNumber: 15,
            columnNumber: 7
        }, this)
    }, void 0, false, {
        fileName: "[project]/app/components/segmentNavIcons.tsx",
        lineNumber: 14,
        columnNumber: 5
    }, this);
}
_c = SegmentIconCalendar;
function SegmentIconDirectory() {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
        ...svgProps,
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                d: "M12 21s7-4.35 7-10a7 7 0 10-14 0c0 5.65 7 10 7 10z",
                stroke: "currentColor",
                strokeWidth: "1.75",
                strokeLinecap: "round",
                strokeLinejoin: "round"
            }, void 0, false, {
                fileName: "[project]/app/components/segmentNavIcons.tsx",
                lineNumber: 29,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("circle", {
                cx: "12",
                cy: "11",
                r: "2.25",
                stroke: "currentColor",
                strokeWidth: "1.75"
            }, void 0, false, {
                fileName: "[project]/app/components/segmentNavIcons.tsx",
                lineNumber: 36,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/app/components/segmentNavIcons.tsx",
        lineNumber: 28,
        columnNumber: 5
    }, this);
}
_c1 = SegmentIconDirectory;
function SegmentIconUpdates() {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
        ...svgProps,
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                d: "M6 8a6 6 0 0112 0v9l-6 3-6-3V8z",
                stroke: "currentColor",
                strokeWidth: "1.75",
                strokeLinecap: "round",
                strokeLinejoin: "round"
            }, void 0, false, {
                fileName: "[project]/app/components/segmentNavIcons.tsx",
                lineNumber: 44,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                d: "M9 10h6M9 13h4",
                stroke: "currentColor",
                strokeWidth: "1.75",
                strokeLinecap: "round"
            }, void 0, false, {
                fileName: "[project]/app/components/segmentNavIcons.tsx",
                lineNumber: 51,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/app/components/segmentNavIcons.tsx",
        lineNumber: 43,
        columnNumber: 5
    }, this);
}
_c2 = SegmentIconUpdates;
function SegmentIconChevronLeft() {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
        ...svgProps,
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
            d: "M14 6l-6 6 6 6",
            stroke: "currentColor",
            strokeWidth: "1.75",
            strokeLinecap: "round",
            strokeLinejoin: "round"
        }, void 0, false, {
            fileName: "[project]/app/components/segmentNavIcons.tsx",
            lineNumber: 59,
            columnNumber: 7
        }, this)
    }, void 0, false, {
        fileName: "[project]/app/components/segmentNavIcons.tsx",
        lineNumber: 58,
        columnNumber: 5
    }, this);
}
_c3 = SegmentIconChevronLeft;
function SegmentIconChevronRight() {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
        ...svgProps,
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
            d: "M10 6l6 6-6 6",
            stroke: "currentColor",
            strokeWidth: "1.75",
            strokeLinecap: "round",
            strokeLinejoin: "round"
        }, void 0, false, {
            fileName: "[project]/app/components/segmentNavIcons.tsx",
            lineNumber: 67,
            columnNumber: 7
        }, this)
    }, void 0, false, {
        fileName: "[project]/app/components/segmentNavIcons.tsx",
        lineNumber: 66,
        columnNumber: 5
    }, this);
}
_c4 = SegmentIconChevronRight;
var _c, _c1, _c2, _c3, _c4;
__turbopack_context__.k.register(_c, "SegmentIconCalendar");
__turbopack_context__.k.register(_c1, "SegmentIconDirectory");
__turbopack_context__.k.register(_c2, "SegmentIconUpdates");
__turbopack_context__.k.register(_c3, "SegmentIconChevronLeft");
__turbopack_context__.k.register(_c4, "SegmentIconChevronRight");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/app/components/topNavMenuIcons.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "TopNavIconAbout",
    ()=>TopNavIconAbout,
    "TopNavIconBlog",
    ()=>TopNavIconBlog,
    "TopNavIconContact",
    ()=>TopNavIconContact,
    "TopNavIconDonate",
    ()=>TopNavIconDonate
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
;
const strokeIcon = {
    width: 18,
    height: 18,
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: 1.75,
    strokeLinecap: "round",
    strokeLinejoin: "round",
    xmlns: "http://www.w3.org/2000/svg",
    "aria-hidden": true
};
function TopNavIconBlog() {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
        ...strokeIcon,
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                d: "M4 6.5A2.5 2.5 0 016.5 4H18v14a2 2 0 01-2 2H6.5A2.5 2.5 0 014 17.5v-11z"
            }, void 0, false, {
                fileName: "[project]/app/components/topNavMenuIcons.tsx",
                lineNumber: 19,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                d: "M8 9h8M8 12.5h6"
            }, void 0, false, {
                fileName: "[project]/app/components/topNavMenuIcons.tsx",
                lineNumber: 20,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/app/components/topNavMenuIcons.tsx",
        lineNumber: 18,
        columnNumber: 5
    }, this);
}
_c = TopNavIconBlog;
function TopNavIconDonate() {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
        ...strokeIcon,
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
            d: "M12 6.2C10.2 4.2 7 4.5 7 7.4c0 2.6 2.3 4.7 5 7.6 2.7-2.9 5-5 5-7.6 0-2.9-3.2-3.2-5-1.2z"
        }, void 0, false, {
            fileName: "[project]/app/components/topNavMenuIcons.tsx",
            lineNumber: 28,
            columnNumber: 7
        }, this)
    }, void 0, false, {
        fileName: "[project]/app/components/topNavMenuIcons.tsx",
        lineNumber: 27,
        columnNumber: 5
    }, this);
}
_c1 = TopNavIconDonate;
function TopNavIconAbout() {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
        ...strokeIcon,
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("circle", {
                cx: "12",
                cy: "12",
                r: "9"
            }, void 0, false, {
                fileName: "[project]/app/components/topNavMenuIcons.tsx",
                lineNumber: 36,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                d: "M12 11v6M12 8h.01"
            }, void 0, false, {
                fileName: "[project]/app/components/topNavMenuIcons.tsx",
                lineNumber: 37,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/app/components/topNavMenuIcons.tsx",
        lineNumber: 35,
        columnNumber: 5
    }, this);
}
_c2 = TopNavIconAbout;
function TopNavIconContact() {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
        ...strokeIcon,
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                d: "M4 6h16v12H4V6z"
            }, void 0, false, {
                fileName: "[project]/app/components/topNavMenuIcons.tsx",
                lineNumber: 45,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                d: "M4 8l8 6 8-6"
            }, void 0, false, {
                fileName: "[project]/app/components/topNavMenuIcons.tsx",
                lineNumber: 46,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/app/components/topNavMenuIcons.tsx",
        lineNumber: 44,
        columnNumber: 5
    }, this);
}
_c3 = TopNavIconContact;
var _c, _c1, _c2, _c3;
__turbopack_context__.k.register(_c, "TopNavIconBlog");
__turbopack_context__.k.register(_c1, "TopNavIconDonate");
__turbopack_context__.k.register(_c2, "TopNavIconAbout");
__turbopack_context__.k.register(_c3, "TopNavIconContact");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/app/theme-palettes.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "DEFAULT_THEME",
    ()=>DEFAULT_THEME,
    "RETIRED_THEME_FALLBACK",
    ()=>RETIRED_THEME_FALLBACK,
    "THEME_PALETTES",
    ()=>THEME_PALETTES,
    "THEME_PREVIEW_COLORS",
    ()=>THEME_PREVIEW_COLORS,
    "normalizeThemeKey",
    ()=>normalizeThemeKey
]);
const DEFAULT_THEME = "paper-ink";
const THEME_PALETTES = [
    {
        key: "paper-ink",
        name: "Paper Ink"
    },
    {
        key: "night-shift",
        name: "Night Shift"
    },
    {
        key: "rose-room",
        name: "Rose Room"
    },
    {
        key: "ember-signal",
        name: "Ember Signal"
    }
];
const RETIRED_THEME_FALLBACK = {
    "moss-stone": "paper-ink",
    "ocean-blueprint": "paper-ink"
};
function normalizeThemeKey(stored) {
    if (!stored) return DEFAULT_THEME;
    if (THEME_PALETTES.some((t)=>t.key === stored)) return stored;
    return RETIRED_THEME_FALLBACK[stored] ?? DEFAULT_THEME;
}
const THEME_PREVIEW_COLORS = {
    "paper-ink": {
        bg: "#fbfaf6",
        text: "#1f1a17",
        accent: "#2a2420"
    },
    "night-shift": {
        bg: "#0e1116",
        text: "#e6edf3",
        accent: "#7aa2ff"
    },
    "rose-room": {
        bg: "#fff4f6",
        text: "#2a0f16",
        accent: "#d14b6c"
    },
    "ember-signal": {
        bg: "#fff6f2",
        text: "#2b140a",
        accent: "#ff6a3d"
    }
};
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/lib/site-preferences.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "FONT_OPTIONS",
    ()=>FONT_OPTIONS,
    "STORAGE_A11Y_FOCUS",
    ()=>STORAGE_A11Y_FOCUS,
    "STORAGE_A11Y_LINKS",
    ()=>STORAGE_A11Y_LINKS,
    "STORAGE_A11Y_REDUCED_MOTION",
    ()=>STORAGE_A11Y_REDUCED_MOTION,
    "STORAGE_FONT",
    ()=>STORAGE_FONT,
    "STORAGE_TEXT_SCALE",
    ()=>STORAGE_TEXT_SCALE,
    "TEXT_SCALE_OPTIONS",
    ()=>TEXT_SCALE_OPTIONS,
    "applyA11yEnhancedFocus",
    ()=>applyA11yEnhancedFocus,
    "applyA11yLinkUnderline",
    ()=>applyA11yLinkUnderline,
    "applyA11yReducedMotion",
    ()=>applyA11yReducedMotion,
    "applyFontFamily",
    ()=>applyFontFamily,
    "applyTextScale",
    ()=>applyTextScale,
    "applyTheme",
    ()=>applyTheme,
    "bootSitePreferencesFromStorage",
    ()=>bootSitePreferencesFromStorage
]);
const FONT_OPTIONS = [
    {
        key: "default",
        label: "Default (ABC Arizona Flare)"
    },
    {
        key: "inter-gabarito",
        label: "Inter / Gabarito"
    },
    {
        key: "dm-sans",
        label: "DM Sans"
    },
    {
        key: "source-serif",
        label: "Source Serif"
    },
    {
        key: "jetbrains-mono",
        label: "JetBrains Mono"
    }
];
const TEXT_SCALE_OPTIONS = [
    {
        key: "default",
        label: "Default size"
    },
    {
        key: "smaller",
        label: "Smaller"
    },
    {
        key: "larger",
        label: "Larger"
    }
];
const STORAGE_FONT = "wnl-font";
const STORAGE_TEXT_SCALE = "wnl-text-scale";
const STORAGE_A11Y_REDUCED_MOTION = "wnl-a11y-reduced-motion";
const STORAGE_A11Y_FOCUS = "wnl-a11y-enhanced-focus";
const STORAGE_A11Y_LINKS = "wnl-a11y-link-underline";
function applyFontFamily(key) {
    if (key === "default") document.documentElement.removeAttribute("data-font");
    else document.documentElement.setAttribute("data-font", key);
    try {
        window.localStorage.setItem(STORAGE_FONT, key);
    } catch  {
    /* ignore */ }
}
function applyTextScale(key) {
    if (key === "default") document.documentElement.removeAttribute("data-text-scale");
    else document.documentElement.setAttribute("data-text-scale", key);
    try {
        window.localStorage.setItem(STORAGE_TEXT_SCALE, key);
    } catch  {
    /* ignore */ }
}
function applyA11yReducedMotion(on) {
    if (on) document.documentElement.setAttribute("data-a11y-reduced-motion", "true");
    else document.documentElement.removeAttribute("data-a11y-reduced-motion");
    try {
        window.localStorage.setItem(STORAGE_A11Y_REDUCED_MOTION, on ? "1" : "0");
    } catch  {
    /* ignore */ }
}
function applyA11yEnhancedFocus(on) {
    if (on) document.documentElement.setAttribute("data-a11y-enhanced-focus", "true");
    else document.documentElement.removeAttribute("data-a11y-enhanced-focus");
    try {
        window.localStorage.setItem(STORAGE_A11Y_FOCUS, on ? "1" : "0");
    } catch  {
    /* ignore */ }
}
function applyA11yLinkUnderline(on) {
    if (on) document.documentElement.setAttribute("data-a11y-link-underline", "true");
    else document.documentElement.removeAttribute("data-a11y-link-underline");
    try {
        window.localStorage.setItem(STORAGE_A11Y_LINKS, on ? "1" : "0");
    } catch  {
    /* ignore */ }
}
function applyTheme(theme) {
    document.documentElement.setAttribute("data-theme", theme);
    try {
        window.localStorage.setItem("wnl-theme", theme);
    } catch  {
    /* ignore */ }
}
function bootSitePreferencesFromStorage() {
    if (typeof document === "undefined") return;
    try {
        applyFontFamily("default");
        window.localStorage.removeItem(STORAGE_FONT);
    } catch  {
    /* ignore */ }
    try {
        const s = window.localStorage.getItem(STORAGE_TEXT_SCALE);
        if (s && TEXT_SCALE_OPTIONS.some((o)=>o.key === s) && s !== "default") applyTextScale(s);
    } catch  {
    /* ignore */ }
    try {
        if (window.localStorage.getItem(STORAGE_A11Y_REDUCED_MOTION) === "1") applyA11yReducedMotion(true);
    } catch  {
    /* ignore */ }
    try {
        if (window.localStorage.getItem(STORAGE_A11Y_FOCUS) === "1") applyA11yEnhancedFocus(true);
    } catch  {
    /* ignore */ }
    try {
        if (window.localStorage.getItem(STORAGE_A11Y_LINKS) === "1") applyA11yLinkUnderline(true);
    } catch  {
    /* ignore */ }
}
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/lib/site-copy.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "getSiteVariant",
    ()=>getSiteVariant,
    "isDemoSite",
    ()=>isDemoSite,
    "siteCopy",
    ()=>siteCopy,
    "withSiteTitle",
    ()=>withSiteTitle
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$polyfills$2f$process$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = /*#__PURE__*/ __turbopack_context__.i("[project]/node_modules/next/dist/build/polyfills/process.js [app-client] (ecmascript)");
function getSiteVariant() {
    const raw = (("TURBOPACK compile-time value", "demo") ?? "").trim().toLowerCase();
    return raw === "demo" ? "demo" : "default";
}
const isDemoSite = getSiteVariant() === "demo";
const DEFAULT_COPY = {
    brandFull: "What’s Next Lancaster",
    brandShort: "What’s Next",
    brandAriaLabel: "What’s Next Lancaster",
    brandMobileCalendarAriaLabel: "What’s Next Lancaster — Calendar home",
    metadata: {
        title: "What's Next Lancaster",
        description: "Events, places, and updates happening around Lancaster."
    },
    nav: {
        calendar: "Calendar",
        directory: "Directory",
        updates: "Updates",
        blog: "Blog",
        donate: "Donate",
        about: "About",
        contact: "Contact"
    },
    calendarTickerIntro: "A calendar of events, specials, and pop-ups in Lancaster, PA.",
    splitTaglines: {
        directory: "A directory of places in Lancaster to explore.",
        updates: "Updates, openings, menu changes, PSAs, and quick announcements."
    },
    hubLeadDefault: "What’s Next Lancaster brings together a shared events calendar, a directory of places, and short community updates so you can see what’s on, where to go, and what just changed—whether you’re planning a night out or keeping up with openings and specials.",
    explore: {
        sectionAriaLabel: "Explore What’s Next",
        toggleClosedAria: "Explore What’s Next",
        toggleOpenAria: "Close explore panel"
    },
    hubPanel: {
        overlayAriaLabel: "What’s Next Lancaster highlights",
        closeHeaderAria: "Close What’s happening in Lancaster",
        title: "What’s happening in Lancaster"
    },
    newsBar: {
        desktopStripAriaLabel: "Latest updates — open full list",
        desktopClosePanelAria: "Close latest updates panel"
    },
    footer: {
        copyrightName: "What’s Next Lancaster",
        newsletterEmail: "hello@whatsnextlancaster.com"
    },
    pages: {
        aboutHeroLead: "What’s Next Lancaster brings together events, places, and community updates in one clear experience so people can browse quickly and discover more of the city.",
        donateLead: "Help keep What’s Next Lancaster free, current, and community-driven. Contributions help cover site upkeep, event curation, venue research, and the tools needed to keep the calendar, directory, and updates fresh.",
        partnershipsHeroTitle: "Partner with What’s Next Lancaster",
        partnershipsHeroLead: "We collaborate with venues, sponsors, and community organizations to highlight what’s happening in Lancaster and help people discover local experiences.",
        partnershipsMetaDescription: "Collaborate with What’s Next Lancaster to reach local audiences through events, places, and community updates.",
        howWePartnerMetaDescription: "How What’s Next Lancaster partners with local businesses and organizations to grow reach, audiences, and community collaboration in Lancaster, PA."
    }
};
/** Edit this block for demo / pitch deploys — no need to touch nav components. */ const DEMO_COPY = {
    brandFull: "Example City Guide",
    brandShort: "City Guide",
    brandAriaLabel: "Example City Guide",
    brandMobileCalendarAriaLabel: "Example City Guide — Events home",
    metadata: {
        title: "Example City Guide (demo)",
        description: "Demo shell: events, places, and community updates in one place."
    },
    nav: {
        calendar: "Events",
        directory: "Places",
        updates: "News",
        blog: "Stories",
        donate: "Support",
        about: "About",
        contact: "Contact"
    },
    calendarTickerIntro: "A sample calendar of events, specials, and pop-ups (demo content).",
    splitTaglines: {
        directory: "A sample directory of places to explore (demo).",
        updates: "Sample news: openings, changes, and quick announcements (demo)."
    },
    hubLeadDefault: "This demo brings together a calendar-style list, a place directory, and short updates so stakeholders can see the full layout with neutral branding.",
    explore: {
        sectionAriaLabel: "Explore Example City Guide",
        toggleClosedAria: "Explore Example City Guide",
        toggleOpenAria: "Close explore panel"
    },
    hubPanel: {
        overlayAriaLabel: "Example City Guide highlights",
        closeHeaderAria: "Close regional highlights",
        title: "What’s on in the region"
    },
    newsBar: {
        desktopStripAriaLabel: "Latest highlights — open panel",
        desktopClosePanelAria: "Close highlights panel"
    },
    footer: {
        copyrightName: "Example City Guide",
        newsletterEmail: "hello@example.com"
    },
    pages: {
        aboutHeroLead: "This demo experience brings together events, places, and community-style updates in one layout so reviewers can browse quickly and imagine their own city’s content.",
        donateLead: "This is sample copy for a support page in the demo. Replace with your organization’s story, impact, and funding needs.",
        partnershipsHeroTitle: "Partner with Example City Guide",
        partnershipsHeroLead: "Demo copy: how a regional guide can work with venues and sponsors through a shared calendar, directory, and update feed.",
        partnershipsMetaDescription: "Demo page: how a city guide can collaborate with local organizations through events, places, and updates.",
        howWePartnerMetaDescription: "Demo overview of partnership options for local businesses and organizations (placeholder content)."
    }
};
const siteCopy = getSiteVariant() === "demo" ? DEMO_COPY : DEFAULT_COPY;
function withSiteTitle(pageTitle) {
    return `${pageTitle} | ${siteCopy.brandFull}`;
}
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/app/site-header.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>SiteHeader
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2d$dom$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react-dom/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/navigation.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/client/app-dir/link.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$components$2f$BrandScrollSmiley$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/app/components/BrandScrollSmiley.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$components$2f$segmentNavIcons$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/app/components/segmentNavIcons.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$components$2f$topNavMenuIcons$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/app/components/topNavMenuIcons.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$theme$2d$palettes$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/app/theme-palettes.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$site$2d$preferences$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/site-preferences.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$site$2d$copy$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/site-copy.ts [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
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
;
const DESKTOP_LINKS = [
    {
        href: "/blog",
        label: __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$site$2d$copy$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["siteCopy"].nav.blog,
        Icon: __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$components$2f$topNavMenuIcons$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["TopNavIconBlog"]
    },
    {
        href: "/donate",
        label: __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$site$2d$copy$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["siteCopy"].nav.donate,
        Icon: __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$components$2f$topNavMenuIcons$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["TopNavIconDonate"]
    },
    {
        href: "/about",
        label: __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$site$2d$copy$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["siteCopy"].nav.about,
        Icon: __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$components$2f$topNavMenuIcons$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["TopNavIconAbout"]
    },
    {
        href: "/contact",
        label: __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$site$2d$copy$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["siteCopy"].nav.contact,
        Icon: __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$components$2f$topNavMenuIcons$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["TopNavIconContact"]
    }
];
const MOBILE_MENU_LINKS = [
    {
        href: "/",
        label: __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$site$2d$copy$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["siteCopy"].nav.calendar,
        Icon: __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$components$2f$segmentNavIcons$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["SegmentIconCalendar"]
    },
    {
        href: "/locations",
        label: __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$site$2d$copy$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["siteCopy"].nav.directory,
        Icon: __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$components$2f$segmentNavIcons$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["SegmentIconDirectory"]
    },
    {
        href: "/updates",
        label: __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$site$2d$copy$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["siteCopy"].nav.updates,
        Icon: __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$components$2f$segmentNavIcons$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["SegmentIconUpdates"]
    },
    {
        href: "/blog",
        label: __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$site$2d$copy$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["siteCopy"].nav.blog,
        Icon: __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$components$2f$topNavMenuIcons$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["TopNavIconBlog"]
    },
    {
        href: "/donate",
        label: __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$site$2d$copy$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["siteCopy"].nav.donate,
        Icon: __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$components$2f$topNavMenuIcons$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["TopNavIconDonate"]
    },
    {
        href: "/about",
        label: __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$site$2d$copy$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["siteCopy"].nav.about,
        Icon: __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$components$2f$topNavMenuIcons$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["TopNavIconAbout"]
    },
    {
        href: "/contact",
        label: __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$site$2d$copy$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["siteCopy"].nav.contact,
        Icon: __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$components$2f$topNavMenuIcons$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["TopNavIconContact"]
    }
];
const SHEET_CLOSE_MS = 320;
function SettingsPanel({ currentTheme, currentThemeLabel, onPickTheme, textScale, setTextScale, a11yMotion, setA11yMotion, a11yFocus, setA11yFocus, a11yLinks, setA11yLinks, paletteOpen, setPaletteOpen, typeOpen, setTypeOpen, a11yOpen, setA11yOpen, compactPalette }) {
    const a11yOnCount = (a11yMotion ? 1 : 0) + (a11yFocus ? 1 : 0) + (a11yLinks ? 1 : 0);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "settingsSheetScroll",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("section", {
                className: "settingsSection settingsSection--compact",
                "aria-labelledby": "settings-palette",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                        type: "button",
                        id: "settings-palette",
                        className: "settingsSectionToggle",
                        "aria-expanded": paletteOpen ? "true" : "false",
                        onClick: ()=>setPaletteOpen(!paletteOpen),
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                className: "settingsSectionToggleLabel",
                                children: "Palette"
                            }, void 0, false, {
                                fileName: "[project]/app/site-header.tsx",
                                lineNumber: 93,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                className: "settingsSectionToggleMeta muted",
                                children: currentThemeLabel
                            }, void 0, false, {
                                fileName: "[project]/app/site-header.tsx",
                                lineNumber: 94,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                className: "settingsSectionToggleChevron",
                                "aria-hidden": true,
                                children: paletteOpen ? "▾" : "▸"
                            }, void 0, false, {
                                fileName: "[project]/app/site-header.tsx",
                                lineNumber: 95,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/app/site-header.tsx",
                        lineNumber: 86,
                        columnNumber: 9
                    }, this),
                    paletteOpen ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: compactPalette ? "settingsPaletteGrid" : "mobileSheetList mobileThemeList",
                        "aria-label": "Color palettes",
                        children: __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$theme$2d$palettes$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["THEME_PALETTES"].map((theme)=>{
                            const sw = __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$theme$2d$palettes$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["THEME_PREVIEW_COLORS"][theme.key];
                            return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                type: "button",
                                className: "settingsPaletteOption",
                                "data-active": currentTheme === theme.key ? "true" : "false",
                                onClick: ()=>onPickTheme(theme.key),
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        className: "settingsPaletteOptionName",
                                        children: theme.name
                                    }, void 0, false, {
                                        fileName: "[project]/app/site-header.tsx",
                                        lineNumber: 111,
                                        columnNumber: 19
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        className: "settingsPaletteSwatches",
                                        "aria-hidden": true,
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                className: "settingsPaletteSwatch",
                                                style: {
                                                    background: sw.bg
                                                },
                                                title: "Background"
                                            }, void 0, false, {
                                                fileName: "[project]/app/site-header.tsx",
                                                lineNumber: 113,
                                                columnNumber: 21
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                className: "settingsPaletteSwatch",
                                                style: {
                                                    background: sw.text
                                                },
                                                title: "Text"
                                            }, void 0, false, {
                                                fileName: "[project]/app/site-header.tsx",
                                                lineNumber: 114,
                                                columnNumber: 21
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                className: "settingsPaletteSwatch",
                                                style: {
                                                    background: sw.accent
                                                },
                                                title: "Accent"
                                            }, void 0, false, {
                                                fileName: "[project]/app/site-header.tsx",
                                                lineNumber: 115,
                                                columnNumber: 21
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/app/site-header.tsx",
                                        lineNumber: 112,
                                        columnNumber: 19
                                    }, this)
                                ]
                            }, theme.key, true, {
                                fileName: "[project]/app/site-header.tsx",
                                lineNumber: 104,
                                columnNumber: 17
                            }, this);
                        })
                    }, void 0, false, {
                        fileName: "[project]/app/site-header.tsx",
                        lineNumber: 100,
                        columnNumber: 11
                    }, this) : null
                ]
            }, void 0, true, {
                fileName: "[project]/app/site-header.tsx",
                lineNumber: 85,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("section", {
                className: "settingsSection",
                "aria-labelledby": "settings-type",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                        type: "button",
                        id: "settings-type",
                        className: "settingsSectionToggle",
                        "aria-expanded": typeOpen ? "true" : "false",
                        onClick: ()=>setTypeOpen(!typeOpen),
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                className: "settingsSectionToggleLabel",
                                children: "Typography"
                            }, void 0, false, {
                                fileName: "[project]/app/site-header.tsx",
                                lineNumber: 132,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                className: "settingsSectionToggleChevron",
                                "aria-hidden": true,
                                children: typeOpen ? "▾" : "▸"
                            }, void 0, false, {
                                fileName: "[project]/app/site-header.tsx",
                                lineNumber: 133,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/app/site-header.tsx",
                        lineNumber: 125,
                        columnNumber: 9
                    }, this),
                    typeOpen ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Fragment"], {
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "settingsFieldGroup",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                    className: "settingsFieldLabel",
                                    children: "Text size"
                                }, void 0, false, {
                                    fileName: "[project]/app/site-header.tsx",
                                    lineNumber: 140,
                                    columnNumber: 15
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "settingsChipRow",
                                    children: __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$site$2d$preferences$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["TEXT_SCALE_OPTIONS"].map((opt)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                            type: "button",
                                            className: "settingsChip",
                                            "data-active": textScale === opt.key ? "true" : "false",
                                            onClick: ()=>{
                                                setTextScale(opt.key);
                                                (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$site$2d$preferences$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["applyTextScale"])(opt.key);
                                            },
                                            children: opt.label
                                        }, opt.key, false, {
                                            fileName: "[project]/app/site-header.tsx",
                                            lineNumber: 143,
                                            columnNumber: 19
                                        }, this))
                                }, void 0, false, {
                                    fileName: "[project]/app/site-header.tsx",
                                    lineNumber: 141,
                                    columnNumber: 15
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/app/site-header.tsx",
                            lineNumber: 139,
                            columnNumber: 13
                        }, this)
                    }, void 0, false) : null
                ]
            }, void 0, true, {
                fileName: "[project]/app/site-header.tsx",
                lineNumber: 124,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("section", {
                className: "settingsSection",
                "aria-labelledby": "settings-a11y",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                        type: "button",
                        id: "settings-a11y",
                        className: "settingsSectionToggle",
                        "aria-expanded": a11yOpen ? "true" : "false",
                        onClick: ()=>setA11yOpen(!a11yOpen),
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                className: "settingsSectionToggleLabel",
                                children: "Accessibility"
                            }, void 0, false, {
                                fileName: "[project]/app/site-header.tsx",
                                lineNumber: 170,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                className: `settingsA11yBadge${a11yOnCount > 0 ? " settingsA11yBadge--on" : ""}`,
                                "aria-live": "polite",
                                children: a11yOnCount === 0 ? "Off" : `${a11yOnCount} on`
                            }, void 0, false, {
                                fileName: "[project]/app/site-header.tsx",
                                lineNumber: 171,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                className: "settingsSectionToggleChevron",
                                "aria-hidden": true,
                                children: a11yOpen ? "▾" : "▸"
                            }, void 0, false, {
                                fileName: "[project]/app/site-header.tsx",
                                lineNumber: 174,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/app/site-header.tsx",
                        lineNumber: 163,
                        columnNumber: 9
                    }, this),
                    a11yOpen ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "settingsA11yBody",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                className: "settingsA11yHint muted",
                                children: [
                                    "Options: ",
                                    a11yOnCount === 0 ? "none active" : `${a11yOnCount} of 3 active`
                                ]
                            }, void 0, true, {
                                fileName: "[project]/app/site-header.tsx",
                                lineNumber: 180,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                className: "settingsToggle",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                        type: "checkbox",
                                        checked: a11yMotion,
                                        onChange: (e)=>{
                                            const on = e.target.checked;
                                            setA11yMotion(on);
                                            (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$site$2d$preferences$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["applyA11yReducedMotion"])(on);
                                        }
                                    }, void 0, false, {
                                        fileName: "[project]/app/site-header.tsx",
                                        lineNumber: 184,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        children: [
                                            "Reduce motion (minimize animations)",
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                className: `settingsToggleStatus${a11yMotion ? " settingsToggleStatus--on" : ""}`,
                                                children: a11yMotion ? "On" : "Off"
                                            }, void 0, false, {
                                                fileName: "[project]/app/site-header.tsx",
                                                lineNumber: 195,
                                                columnNumber: 17
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/app/site-header.tsx",
                                        lineNumber: 193,
                                        columnNumber: 15
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/app/site-header.tsx",
                                lineNumber: 183,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                className: "settingsToggle",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                        type: "checkbox",
                                        checked: a11yFocus,
                                        onChange: (e)=>{
                                            const on = e.target.checked;
                                            setA11yFocus(on);
                                            (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$site$2d$preferences$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["applyA11yEnhancedFocus"])(on);
                                        }
                                    }, void 0, false, {
                                        fileName: "[project]/app/site-header.tsx",
                                        lineNumber: 201,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        children: [
                                            "Stronger focus indicators",
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                className: `settingsToggleStatus${a11yFocus ? " settingsToggleStatus--on" : ""}`,
                                                children: a11yFocus ? "On" : "Off"
                                            }, void 0, false, {
                                                fileName: "[project]/app/site-header.tsx",
                                                lineNumber: 212,
                                                columnNumber: 17
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/app/site-header.tsx",
                                        lineNumber: 210,
                                        columnNumber: 15
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/app/site-header.tsx",
                                lineNumber: 200,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                className: "settingsToggle",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                        type: "checkbox",
                                        checked: a11yLinks,
                                        onChange: (e)=>{
                                            const on = e.target.checked;
                                            setA11yLinks(on);
                                            (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$site$2d$preferences$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["applyA11yLinkUnderline"])(on);
                                        }
                                    }, void 0, false, {
                                        fileName: "[project]/app/site-header.tsx",
                                        lineNumber: 218,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        children: [
                                            "Underline links",
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                className: `settingsToggleStatus${a11yLinks ? " settingsToggleStatus--on" : ""}`,
                                                children: a11yLinks ? "On" : "Off"
                                            }, void 0, false, {
                                                fileName: "[project]/app/site-header.tsx",
                                                lineNumber: 229,
                                                columnNumber: 17
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/app/site-header.tsx",
                                        lineNumber: 227,
                                        columnNumber: 15
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/app/site-header.tsx",
                                lineNumber: 217,
                                columnNumber: 13
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/app/site-header.tsx",
                        lineNumber: 179,
                        columnNumber: 11
                    }, this) : null
                ]
            }, void 0, true, {
                fileName: "[project]/app/site-header.tsx",
                lineNumber: 162,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/app/site-header.tsx",
        lineNumber: 84,
        columnNumber: 5
    }, this);
}
_c = SettingsPanel;
function SiteHeader() {
    _s();
    const pathname = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["usePathname"])();
    const [open, setOpen] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [settingsOpen, setSettingsOpen] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [menuClosing, setMenuClosing] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [settingsClosing, setSettingsClosing] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const menuCloseTimerRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(null);
    const settingsCloseTimerRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(null);
    const settingsWrapRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(null);
    const [desktop, setDesktop] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [paletteSectionOpen, setPaletteSectionOpen] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(true);
    const [typeSectionOpen, setTypeSectionOpen] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(true);
    const [a11ySectionOpen, setA11ySectionOpen] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(true);
    const [currentTheme, setCurrentTheme] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(__TURBOPACK__imported__module__$5b$project$5d2f$app$2f$theme$2d$palettes$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["DEFAULT_THEME"]);
    const [textScale, setTextScale] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])("default");
    const [a11yMotion, setA11yMotion] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [a11yFocus, setA11yFocus] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [a11yLinks, setA11yLinks] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const clearMenuCloseTimer = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "SiteHeader.useCallback[clearMenuCloseTimer]": ()=>{
            if (menuCloseTimerRef.current != null) {
                window.clearTimeout(menuCloseTimerRef.current);
                menuCloseTimerRef.current = null;
            }
        }
    }["SiteHeader.useCallback[clearMenuCloseTimer]"], []);
    const clearSettingsCloseTimer = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "SiteHeader.useCallback[clearSettingsCloseTimer]": ()=>{
            if (settingsCloseTimerRef.current != null) {
                window.clearTimeout(settingsCloseTimerRef.current);
                settingsCloseTimerRef.current = null;
            }
        }
    }["SiteHeader.useCallback[clearSettingsCloseTimer]"], []);
    const closeMenu = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "SiteHeader.useCallback[closeMenu]": ()=>{
            if (!open || menuClosing) return;
            setMenuClosing(true);
            clearMenuCloseTimer();
            menuCloseTimerRef.current = window.setTimeout({
                "SiteHeader.useCallback[closeMenu]": ()=>{
                    setOpen(false);
                    setMenuClosing(false);
                    menuCloseTimerRef.current = null;
                }
            }["SiteHeader.useCallback[closeMenu]"], SHEET_CLOSE_MS);
        }
    }["SiteHeader.useCallback[closeMenu]"], [
        open,
        menuClosing,
        clearMenuCloseTimer
    ]);
    const closeSettings = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "SiteHeader.useCallback[closeSettings]": ()=>{
            if (!settingsOpen || settingsClosing) return;
            if (desktop) {
                setSettingsOpen(false);
                return;
            }
            setSettingsClosing(true);
            clearSettingsCloseTimer();
            settingsCloseTimerRef.current = window.setTimeout({
                "SiteHeader.useCallback[closeSettings]": ()=>{
                    setSettingsOpen(false);
                    setSettingsClosing(false);
                    settingsCloseTimerRef.current = null;
                }
            }["SiteHeader.useCallback[closeSettings]"], SHEET_CLOSE_MS);
        }
    }["SiteHeader.useCallback[closeSettings]"], [
        settingsOpen,
        settingsClosing,
        desktop,
        clearSettingsCloseTimer
    ]);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "SiteHeader.useEffect": ()=>{
            return ({
                "SiteHeader.useEffect": ()=>{
                    clearMenuCloseTimer();
                    clearSettingsCloseTimer();
                }
            })["SiteHeader.useEffect"];
        }
    }["SiteHeader.useEffect"], [
        clearMenuCloseTimer,
        clearSettingsCloseTimer
    ]);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useLayoutEffect"])({
        "SiteHeader.useLayoutEffect": ()=>{
            const mq = window.matchMedia("(min-width: 981px)");
            const sync = {
                "SiteHeader.useLayoutEffect.sync": ()=>setDesktop(mq.matches)
            }["SiteHeader.useLayoutEffect.sync"];
            sync();
            mq.addEventListener("change", sync);
            return ({
                "SiteHeader.useLayoutEffect": ()=>mq.removeEventListener("change", sync)
            })["SiteHeader.useLayoutEffect"];
        }
    }["SiteHeader.useLayoutEffect"], []);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "SiteHeader.useEffect": ()=>{
            if (!settingsOpen || !desktop) return;
            const onDocDown = {
                "SiteHeader.useEffect.onDocDown": (e)=>{
                    const el = settingsWrapRef.current;
                    if (!el || el.contains(e.target)) return;
                    setSettingsOpen(false);
                }
            }["SiteHeader.useEffect.onDocDown"];
            document.addEventListener("mousedown", onDocDown);
            return ({
                "SiteHeader.useEffect": ()=>document.removeEventListener("mousedown", onDocDown)
            })["SiteHeader.useEffect"];
        }
    }["SiteHeader.useEffect"], [
        settingsOpen,
        desktop
    ]);
    const currentThemeLabel = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMemo"])({
        "SiteHeader.useMemo[currentThemeLabel]": ()=>__TURBOPACK__imported__module__$5b$project$5d2f$app$2f$theme$2d$palettes$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["THEME_PALETTES"].find({
                "SiteHeader.useMemo[currentThemeLabel]": (theme)=>theme.key === currentTheme
            }["SiteHeader.useMemo[currentThemeLabel]"])?.name ?? "Theme"
    }["SiteHeader.useMemo[currentThemeLabel]"], [
        currentTheme
    ]);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "SiteHeader.useEffect": ()=>{
            clearMenuCloseTimer();
            clearSettingsCloseTimer();
            setMenuClosing(false);
            setSettingsClosing(false);
            setOpen(false);
            setSettingsOpen(false);
            if (typeof document !== "undefined") {
                const isShellRoute = pathname === "/" || pathname?.startsWith("/locations") || pathname?.startsWith("/updates");
                document.body.dataset.layout = isShellRoute ? "shell" : "content";
            }
        }
    }["SiteHeader.useEffect"], [
        pathname,
        clearMenuCloseTimer,
        clearSettingsCloseTimer
    ]);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "SiteHeader.useEffect": ()=>{
            try {
                const stored = window.localStorage.getItem("wnl-theme");
                const initial = (0, __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$theme$2d$palettes$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["normalizeThemeKey"])(stored);
                setCurrentTheme(initial);
                document.documentElement.setAttribute("data-theme", initial);
            } catch  {
                setCurrentTheme(__TURBOPACK__imported__module__$5b$project$5d2f$app$2f$theme$2d$palettes$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["DEFAULT_THEME"]);
                document.documentElement.setAttribute("data-theme", __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$theme$2d$palettes$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["DEFAULT_THEME"]);
            }
        }
    }["SiteHeader.useEffect"], []);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "SiteHeader.useEffect": ()=>{
            try {
                const s = window.localStorage.getItem("wnl-text-scale");
                if (s && __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$site$2d$preferences$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["TEXT_SCALE_OPTIONS"].some({
                    "SiteHeader.useEffect": (o)=>o.key === s
                }["SiteHeader.useEffect"])) setTextScale(s);
            } catch  {
            /* ignore */ }
            setA11yMotion(window.localStorage.getItem("wnl-a11y-reduced-motion") === "1");
            setA11yFocus(window.localStorage.getItem("wnl-a11y-enhanced-focus") === "1");
            setA11yLinks(window.localStorage.getItem("wnl-a11y-link-underline") === "1");
        }
    }["SiteHeader.useEffect"], []);
    const lockScroll = open || settingsOpen && !desktop;
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "SiteHeader.useEffect": ()=>{
            if (!lockScroll) return;
            const prev = document.documentElement.style.overflow;
            document.documentElement.style.overflow = "hidden";
            return ({
                "SiteHeader.useEffect": ()=>{
                    document.documentElement.style.overflow = prev;
                }
            })["SiteHeader.useEffect"];
        }
    }["SiteHeader.useEffect"], [
        lockScroll
    ]);
    function onPickTheme(theme) {
        setCurrentTheme(theme);
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$site$2d$preferences$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["applyTheme"])(theme);
    }
    const settingsPanelProps = {
        currentTheme,
        currentThemeLabel,
        onPickTheme,
        textScale,
        setTextScale,
        a11yMotion,
        setA11yMotion,
        a11yFocus,
        setA11yFocus,
        a11yLinks,
        setA11yLinks,
        paletteOpen: paletteSectionOpen,
        setPaletteOpen: setPaletteSectionOpen,
        typeOpen: typeSectionOpen,
        setTypeOpen: setTypeSectionOpen,
        a11yOpen: a11ySectionOpen,
        setA11yOpen: setA11ySectionOpen,
        compactPalette: true
    };
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("header", {
        className: "siteHeader",
        children: [
            desktop ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                className: "brand",
                href: "/",
                "aria-label": __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$site$2d$copy$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["siteCopy"].brandAriaLabel,
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$app$2f$components$2f$BrandScrollSmiley$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {}, void 0, false, {
                        fileName: "[project]/app/site-header.tsx",
                        lineNumber: 411,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                        className: "brandText",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                className: "brandFull",
                                children: __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$site$2d$copy$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["siteCopy"].brandFull
                            }, void 0, false, {
                                fileName: "[project]/app/site-header.tsx",
                                lineNumber: 413,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                className: "brandShort",
                                "aria-hidden": true,
                                children: __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$site$2d$copy$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["siteCopy"].brandShort
                            }, void 0, false, {
                                fileName: "[project]/app/site-header.tsx",
                                lineNumber: 414,
                                columnNumber: 13
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/app/site-header.tsx",
                        lineNumber: 412,
                        columnNumber: 11
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/app/site-header.tsx",
                lineNumber: 410,
                columnNumber: 9
            }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "brand brand--mobileSplit",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                        className: "brandMark",
                        "aria-hidden": true,
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$app$2f$components$2f$BrandScrollSmiley$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {}, void 0, false, {
                            fileName: "[project]/app/site-header.tsx",
                            lineNumber: 422,
                            columnNumber: 13
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/app/site-header.tsx",
                        lineNumber: 421,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                        className: "brandText",
                        href: "/",
                        "aria-label": __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$site$2d$copy$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["siteCopy"].brandMobileCalendarAriaLabel,
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                className: "brandFull",
                                children: __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$site$2d$copy$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["siteCopy"].brandFull
                            }, void 0, false, {
                                fileName: "[project]/app/site-header.tsx",
                                lineNumber: 425,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                className: "brandShort",
                                "aria-hidden": true,
                                children: __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$site$2d$copy$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["siteCopy"].brandShort
                            }, void 0, false, {
                                fileName: "[project]/app/site-header.tsx",
                                lineNumber: 426,
                                columnNumber: 13
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/app/site-header.tsx",
                        lineNumber: 424,
                        columnNumber: 11
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/app/site-header.tsx",
                lineNumber: 420,
                columnNumber: 9
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("nav", {
                className: "topNav",
                "aria-label": "Primary",
                children: DESKTOP_LINKS.map((l)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                        className: "navLink",
                        href: l.href,
                        "data-active": pathname === l.href ? "true" : "false",
                        onClick: ()=>setOpen(false),
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                className: "navLinkLeadingIcon",
                                "aria-hidden": true,
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(l.Icon, {}, void 0, false, {
                                    fileName: "[project]/app/site-header.tsx",
                                    lineNumber: 443,
                                    columnNumber: 15
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/app/site-header.tsx",
                                lineNumber: 442,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                className: "navLinkText",
                                children: l.label
                            }, void 0, false, {
                                fileName: "[project]/app/site-header.tsx",
                                lineNumber: 445,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                className: "navLinkCaret",
                                "aria-hidden": true,
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
                                    viewBox: "0 0 24 24",
                                    fill: "none",
                                    xmlns: "http://www.w3.org/2000/svg",
                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                                        d: "M9 18l6-6-6-6",
                                        stroke: "currentColor",
                                        strokeWidth: "2",
                                        strokeLinecap: "round",
                                        strokeLinejoin: "round"
                                    }, void 0, false, {
                                        fileName: "[project]/app/site-header.tsx",
                                        lineNumber: 448,
                                        columnNumber: 17
                                    }, this)
                                }, void 0, false, {
                                    fileName: "[project]/app/site-header.tsx",
                                    lineNumber: 447,
                                    columnNumber: 15
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/app/site-header.tsx",
                                lineNumber: 446,
                                columnNumber: 13
                            }, this)
                        ]
                    }, l.href, true, {
                        fileName: "[project]/app/site-header.tsx",
                        lineNumber: 435,
                        columnNumber: 11
                    }, this))
            }, void 0, false, {
                fileName: "[project]/app/site-header.tsx",
                lineNumber: 433,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "headerActions",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "settingsDropdownWrap",
                        ref: settingsWrapRef,
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                type: "button",
                                className: "settingsBtn",
                                "aria-label": "Settings",
                                "aria-expanded": settingsOpen ? "true" : "false",
                                "aria-haspopup": "dialog",
                                title: "Settings",
                                onClick: ()=>{
                                    clearMenuCloseTimer();
                                    setMenuClosing(false);
                                    setOpen(false);
                                    if (settingsOpen) {
                                        closeSettings();
                                    } else {
                                        clearSettingsCloseTimer();
                                        setSettingsClosing(false);
                                        setSettingsOpen(true);
                                    }
                                },
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                    className: "settingsBtnIcon",
                                    "aria-hidden": true,
                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("img", {
                                        className: "settingsBtnIconImg",
                                        src: "/icons/gear-setting.svg",
                                        alt: "",
                                        width: 22,
                                        height: 22
                                    }, void 0, false, {
                                        fileName: "[project]/app/site-header.tsx",
                                        lineNumber: 485,
                                        columnNumber: 15
                                    }, this)
                                }, void 0, false, {
                                    fileName: "[project]/app/site-header.tsx",
                                    lineNumber: 483,
                                    columnNumber: 13
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/app/site-header.tsx",
                                lineNumber: 463,
                                columnNumber: 11
                            }, this),
                            desktop && settingsOpen ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "settingsDropdown",
                                role: "dialog",
                                "aria-label": "Settings",
                                onClick: (e)=>e.stopPropagation(),
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(SettingsPanel, {
                                    ...settingsPanelProps
                                }, void 0, false, {
                                    fileName: "[project]/app/site-header.tsx",
                                    lineNumber: 491,
                                    columnNumber: 15
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/app/site-header.tsx",
                                lineNumber: 490,
                                columnNumber: 13
                            }, this) : null
                        ]
                    }, void 0, true, {
                        fileName: "[project]/app/site-header.tsx",
                        lineNumber: 462,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                        type: "button",
                        className: "hamburgerBtn",
                        "data-open": open ? "true" : "false",
                        "aria-label": open ? "Close menu" : "Open menu",
                        "aria-expanded": open ? "true" : "false",
                        onClick: ()=>{
                            clearSettingsCloseTimer();
                            setSettingsClosing(false);
                            setSettingsOpen(false);
                            if (open) {
                                closeMenu();
                            } else {
                                clearMenuCloseTimer();
                                setMenuClosing(false);
                                setOpen(true);
                            }
                        },
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                            className: "hamburgerIcon",
                            "aria-hidden": true,
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {}, void 0, false, {
                                    fileName: "[project]/app/site-header.tsx",
                                    lineNumber: 516,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {}, void 0, false, {
                                    fileName: "[project]/app/site-header.tsx",
                                    lineNumber: 517,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {}, void 0, false, {
                                    fileName: "[project]/app/site-header.tsx",
                                    lineNumber: 518,
                                    columnNumber: 13
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/app/site-header.tsx",
                            lineNumber: 515,
                            columnNumber: 11
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/app/site-header.tsx",
                        lineNumber: 496,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/app/site-header.tsx",
                lineNumber: 461,
                columnNumber: 7
            }, this),
            open && typeof document !== "undefined" ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2d$dom$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["createPortal"])(/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: `mobileSheetOverlay mobileMenuOverlay mobileSheetOverlay--fromNav${menuClosing ? " mobileSheetOverlay--closing" : ""}`,
                role: "dialog",
                "aria-modal": "true",
                onClick: ()=>closeMenu(),
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "mobileSheet mobileMenuSheet",
                    onClick: (e)=>e.stopPropagation(),
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "mobileSheetHeader",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "mobileSheetTitle",
                                    children: "Menu"
                                }, void 0, false, {
                                    fileName: "[project]/app/site-header.tsx",
                                    lineNumber: 533,
                                    columnNumber: 19
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                    type: "button",
                                    className: "mobileSheetClose",
                                    onClick: ()=>closeMenu(),
                                    "aria-label": "Close menu",
                                    children: "✕"
                                }, void 0, false, {
                                    fileName: "[project]/app/site-header.tsx",
                                    lineNumber: 534,
                                    columnNumber: 19
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/app/site-header.tsx",
                            lineNumber: 532,
                            columnNumber: 17
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("nav", {
                            className: "mobileSheetList mobileMenuList",
                            "aria-label": "Mobile primary",
                            children: MOBILE_MENU_LINKS.map((l, idx)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                    className: "mobileSheetAction mobileMenuAction",
                                    href: l.href,
                                    "data-active": pathname === l.href ? "true" : "false",
                                    style: {
                                        ["--menuIndex"]: idx
                                    },
                                    onClick: ()=>closeMenu(),
                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        className: "mobileMenuActionLead",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                className: "mobileMenuActionIcon",
                                                "aria-hidden": true,
                                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(l.Icon, {}, void 0, false, {
                                                    fileName: "[project]/app/site-header.tsx",
                                                    lineNumber: 551,
                                                    columnNumber: 27
                                                }, this)
                                            }, void 0, false, {
                                                fileName: "[project]/app/site-header.tsx",
                                                lineNumber: 550,
                                                columnNumber: 25
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                className: "mobileMenuActionText",
                                                children: l.label
                                            }, void 0, false, {
                                                fileName: "[project]/app/site-header.tsx",
                                                lineNumber: 553,
                                                columnNumber: 25
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/app/site-header.tsx",
                                        lineNumber: 549,
                                        columnNumber: 23
                                    }, this)
                                }, l.href, false, {
                                    fileName: "[project]/app/site-header.tsx",
                                    lineNumber: 541,
                                    columnNumber: 21
                                }, this))
                        }, void 0, false, {
                            fileName: "[project]/app/site-header.tsx",
                            lineNumber: 539,
                            columnNumber: 17
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/app/site-header.tsx",
                    lineNumber: 531,
                    columnNumber: 15
                }, this)
            }, void 0, false, {
                fileName: "[project]/app/site-header.tsx",
                lineNumber: 525,
                columnNumber: 13
            }, this), document.body) : null,
            !desktop && settingsOpen && typeof document !== "undefined" ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2d$dom$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["createPortal"])(/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: `mobileSheetOverlay settingsSheetOverlay mobileSheetOverlay--fromNav${settingsClosing ? " mobileSheetOverlay--closing" : ""}`,
                role: "dialog",
                "aria-modal": "true",
                "aria-label": "Settings",
                onClick: ()=>closeSettings(),
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "mobileSheet settingsSheet",
                    onClick: (e)=>e.stopPropagation(),
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "mobileSheetHeader",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "mobileSheetTitle",
                                    children: "Settings"
                                }, void 0, false, {
                                    fileName: "[project]/app/site-header.tsx",
                                    lineNumber: 575,
                                    columnNumber: 19
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                    type: "button",
                                    className: "mobileSheetClose",
                                    onClick: ()=>closeSettings(),
                                    "aria-label": "Close settings",
                                    children: "✕"
                                }, void 0, false, {
                                    fileName: "[project]/app/site-header.tsx",
                                    lineNumber: 576,
                                    columnNumber: 19
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/app/site-header.tsx",
                            lineNumber: 574,
                            columnNumber: 17
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(SettingsPanel, {
                            ...settingsPanelProps
                        }, void 0, false, {
                            fileName: "[project]/app/site-header.tsx",
                            lineNumber: 581,
                            columnNumber: 17
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/app/site-header.tsx",
                    lineNumber: 573,
                    columnNumber: 15
                }, this)
            }, void 0, false, {
                fileName: "[project]/app/site-header.tsx",
                lineNumber: 566,
                columnNumber: 13
            }, this), document.body) : null
        ]
    }, void 0, true, {
        fileName: "[project]/app/site-header.tsx",
        lineNumber: 408,
        columnNumber: 5
    }, this);
}
_s(SiteHeader, "i0iLP9Kiqa8loPC9aD4st+cRec0=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["usePathname"]
    ];
});
_c1 = SiteHeader;
var _c, _c1;
__turbopack_context__.k.register(_c, "SettingsPanel");
__turbopack_context__.k.register(_c1, "SiteHeader");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/app/ThemeBoot.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>ThemeBoot
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$theme$2d$palettes$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/app/theme-palettes.ts [app-client] (ecmascript)");
var _s = __turbopack_context__.k.signature();
"use client";
;
;
function ThemeBoot() {
    _s();
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useLayoutEffect"])({
        "ThemeBoot.useLayoutEffect": ()=>{
            try {
                const stored = window.localStorage.getItem("wnl-theme") ?? window.localStorage.getItem("theme");
                const next = (0, __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$theme$2d$palettes$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["normalizeThemeKey"])(stored);
                document.documentElement.dataset.theme = next;
            } catch  {
            // no-op
            }
        }
    }["ThemeBoot.useLayoutEffect"], []);
    return null;
}
_s(ThemeBoot, "n7/vCynhJvM+pLkyL2DMQUF0odM=");
_c = ThemeBoot;
var _c;
__turbopack_context__.k.register(_c, "ThemeBoot");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/app/components/SitePreferencesBoot.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>SitePreferencesBoot
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$site$2d$preferences$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/site-preferences.ts [app-client] (ecmascript)");
var _s = __turbopack_context__.k.signature();
"use client";
;
;
function SitePreferencesBoot() {
    _s();
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useLayoutEffect"])({
        "SitePreferencesBoot.useLayoutEffect": ()=>{
            (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$site$2d$preferences$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["bootSitePreferencesFromStorage"])();
        }
    }["SitePreferencesBoot.useLayoutEffect"], []);
    return null;
}
_s(SitePreferencesBoot, "n7/vCynhJvM+pLkyL2DMQUF0odM=");
_c = SitePreferencesBoot;
var _c;
__turbopack_context__.k.register(_c, "SitePreferencesBoot");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/app/components/SiteFooterBar.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>SiteFooterBar
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/client/app-dir/link.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$site$2d$copy$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/site-copy.ts [app-client] (ecmascript)");
"use client";
;
;
;
function SiteFooterBar() {
    const year = new Date().getFullYear();
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("footer", {
        className: "siteFooterBar",
        "aria-label": "Site footer",
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "siteFooterBar__inner",
            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "siteFooterBar__left",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                        className: "siteFooterBar__copy",
                        children: [
                            "© ",
                            year,
                            " ",
                            __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$site$2d$copy$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["siteCopy"].footer.copyrightName
                        ]
                    }, void 0, true, {
                        fileName: "[project]/app/components/SiteFooterBar.tsx",
                        lineNumber: 12,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                        className: "siteFooterBar__sep",
                        "aria-hidden": true,
                        children: "·"
                    }, void 0, false, {
                        fileName: "[project]/app/components/SiteFooterBar.tsx",
                        lineNumber: 13,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                        className: "siteFooterBar__link",
                        href: "/contact",
                        children: "Contact"
                    }, void 0, false, {
                        fileName: "[project]/app/components/SiteFooterBar.tsx",
                        lineNumber: 14,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                        className: "siteFooterBar__sep",
                        "aria-hidden": true,
                        children: "·"
                    }, void 0, false, {
                        fileName: "[project]/app/components/SiteFooterBar.tsx",
                        lineNumber: 15,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("a", {
                        className: "siteFooterBar__link",
                        href: `mailto:${__TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$site$2d$copy$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["siteCopy"].footer.newsletterEmail}`,
                        children: "Newsletter signup"
                    }, void 0, false, {
                        fileName: "[project]/app/components/SiteFooterBar.tsx",
                        lineNumber: 16,
                        columnNumber: 11
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/app/components/SiteFooterBar.tsx",
                lineNumber: 11,
                columnNumber: 9
            }, this)
        }, void 0, false, {
            fileName: "[project]/app/components/SiteFooterBar.tsx",
            lineNumber: 10,
            columnNumber: 7
        }, this)
    }, void 0, false, {
        fileName: "[project]/app/components/SiteFooterBar.tsx",
        lineNumber: 9,
        columnNumber: 5
    }, this);
}
_c = SiteFooterBar;
var _c;
__turbopack_context__.k.register(_c, "SiteFooterBar");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
]);

//# sourceMappingURL=_e0fa1189._.js.map