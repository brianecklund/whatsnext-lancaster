module.exports = [
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
"[project]/app/components/SplitPageLayout.tsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>SplitPageLayout
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/navigation.js [app-ssr] (ecmascript)");
"use client";
;
;
function SplitPageLayout({ tagline, taglineHidden = false, isMobile = false, current, children, mobileOverlay, style }) {
    const router = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useRouter"])();
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "pageShell",
        style: style,
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("section", {
                className: `newsBar pageIntroBar ${taglineHidden ? "pageIntroBarHidden" : ""}`,
                "aria-label": "Page introduction",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "newsBar__intro",
                    children: tagline
                }, void 0, false, {
                    fileName: "[project]/app/components/SplitPageLayout.tsx",
                    lineNumber: 32,
                    columnNumber: 9
                }, this)
            }, void 0, false, {
                fileName: "[project]/app/components/SplitPageLayout.tsx",
                lineNumber: 31,
                columnNumber: 7
            }, this),
            children,
            isMobile ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "mobileTabs mobilePrimaryTabs",
                "aria-label": "Primary navigation",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                        type: "button",
                        className: "tabBtn",
                        "data-active": current === "calendar" ? "true" : "false",
                        onClick: ()=>router.push("/"),
                        children: "Calendar"
                    }, void 0, false, {
                        fileName: "[project]/app/components/SplitPageLayout.tsx",
                        lineNumber: 37,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                        type: "button",
                        className: "tabBtn",
                        "data-active": current === "directory" ? "true" : "false",
                        onClick: ()=>router.push("/locations"),
                        children: "Directory"
                    }, void 0, false, {
                        fileName: "[project]/app/components/SplitPageLayout.tsx",
                        lineNumber: 45,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                        type: "button",
                        className: "tabBtn",
                        "data-active": current === "updates" ? "true" : "false",
                        onClick: ()=>router.push("/updates"),
                        children: "Updates"
                    }, void 0, false, {
                        fileName: "[project]/app/components/SplitPageLayout.tsx",
                        lineNumber: 53,
                        columnNumber: 11
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/app/components/SplitPageLayout.tsx",
                lineNumber: 36,
                columnNumber: 9
            }, this) : null,
            mobileOverlay
        ]
    }, void 0, true, {
        fileName: "[project]/app/components/SplitPageLayout.tsx",
        lineNumber: 30,
        columnNumber: 5
    }, this);
}
}),
"[project]/lib/directoryCategories.ts [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "DIRECTORY_CATEGORIES",
    ()=>DIRECTORY_CATEGORIES,
    "mergeDirectoryCategories",
    ()=>mergeDirectoryCategories
]);
const DIRECTORY_CATEGORIES = [
    "Business",
    "Restaurant",
    "Store",
    "Music Venue",
    "Event Space",
    "Theater",
    "Coffee Shop",
    "Bar",
    "Brewery",
    "Gallery",
    "Service"
];
function mergeDirectoryCategories(input) {
    const discovered = input.filter((value)=>Boolean(value && value.trim()));
    return Array.from(new Set([
        ...DIRECTORY_CATEGORIES,
        ...discovered
    ])).sort((a, b)=>a.localeCompare(b));
}
}),
"[project]/app/locations/LocationsSplitClient.tsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>LocationsSplitClient
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$components$2f$ToolbarIcon$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/app/components/ToolbarIcon.tsx [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$hooks$2f$useBodyScrollLock$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/app/hooks/useBodyScrollLock.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/navigation.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$components$2f$SplitPageLayout$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/app/components/SplitPageLayout.tsx [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$directoryCategories$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/directoryCategories.ts [app-ssr] (ecmascript)");
"use client";
;
;
;
;
;
;
;
function normalize(v) {
    return (v || "").toLowerCase().trim();
}
function getLetter(value) {
    const first = (value || "").trim().charAt(0).toUpperCase();
    return /^[A-Z]$/.test(first) ? first : "#";
}
const ALPHABET = [
    "#",
    ..."ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("")
];
function LocationsSplitClient({ locations = [] }) {
    const router = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useRouter"])();
    const pathname = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["usePathname"])();
    const searchParams = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useSearchParams"])();
    const safeLocations = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useMemo"])(()=>Array.isArray(locations) ? locations : [], [
        locations
    ]);
    const [mounted, setMounted] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(false);
    const [isMobile, setIsMobile] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(false);
    const [filterOpen, setFilterOpen] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(false);
    const [desktopFilterOpen, setDesktopFilterOpen] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(false);
    const [mobileOverlayOffset, setMobileOverlayOffset] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(0);
    const [activeLetter, setActiveLetter] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])("#");
    const [taglineHidden, setTaglineHidden] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(false);
    const leftStickyRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useRef"])(null);
    const leftScrollRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useRef"])(null);
    const sectionRefs = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useRef"])({});
    const selectedKey = searchParams.get("location");
    const q = searchParams.get("q") ?? "";
    const cat = searchParams.get("cat") ?? "";
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        setMounted(true);
        const mq = window.matchMedia("(max-width: 980px)");
        const apply = ()=>setIsMobile(mq.matches);
        apply();
        if (mq.addEventListener) mq.addEventListener("change", apply);
        else mq.addListener(apply);
        return ()=>{
            if (mq.removeEventListener) mq.removeEventListener("change", apply);
            else mq.removeListener(apply);
        };
    }, []);
    const effectiveIsMobile = mounted ? isMobile : false;
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        if (!effectiveIsMobile) {
            setFilterOpen(false);
            setTaglineHidden(false);
        }
        if (effectiveIsMobile) setDesktopFilterOpen(false);
    }, [
        effectiveIsMobile
    ]);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$hooks$2f$useBodyScrollLock$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useBodyScrollLock"])(filterOpen || effectiveIsMobile && Boolean(selectedKey));
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
            ro = new ResizeObserver(updateOffset);
            ro.observe(leftStickyRef.current);
        }
        return ()=>{
            window.removeEventListener("resize", updateOffset);
            ro?.disconnect();
        };
    }, [
        effectiveIsMobile,
        q,
        cat,
        filterOpen,
        desktopFilterOpen
    ]);
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
        params.delete("location");
        navigate(params);
    }
    function setCategory(next) {
        const params = new URLSearchParams(searchParams.toString());
        if (!next) params.delete("cat");
        else params.set("cat", next);
        params.delete("location");
        navigate(params);
    }
    const categories = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useMemo"])(()=>(0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$directoryCategories$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["mergeDirectoryCategories"])(safeLocations.map((location)=>location.category)), [
        safeLocations
    ]);
    const filtered = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useMemo"])(()=>{
        const nq = normalize(q);
        const nc = normalize(cat);
        return safeLocations.filter((l)=>{
            const hay = normalize([
                l.name ?? "",
                l.address ?? "",
                l.category ?? "",
                l.description ?? ""
            ].filter(Boolean).join(" "));
            const matchesSearch = !nq || hay.includes(nq);
            const matchesCat = !nc || normalize(l.category) === nc;
            return matchesSearch && matchesCat;
        });
    }, [
        safeLocations,
        q,
        cat
    ]);
    const featuredPartners = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useMemo"])(()=>filtered.filter((location)=>Boolean(location.customPageUid)).sort((a, b)=>(a.name ?? "").localeCompare(b.name ?? "")), [
        filtered
    ]);
    const standardListings = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useMemo"])(()=>filtered.filter((location)=>!location.customPageUid).sort((a, b)=>(a.name ?? "").localeCompare(b.name ?? "")), [
        filtered
    ]);
    const groupedStandardListings = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useMemo"])(()=>{
        const grouped = new Map();
        for (const row of standardListings){
            const letter = getLetter(row.name);
            const existing = grouped.get(letter) ?? [];
            existing.push(row);
            grouped.set(letter, existing);
        }
        return ALPHABET.filter((letter)=>grouped.has(letter)).map((letter)=>({
                letter,
                rows: grouped.get(letter) ?? []
            }));
    }, [
        standardListings
    ]);
    const visibleLetters = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useMemo"])(()=>groupedStandardListings.map((section)=>section.letter), [
        groupedStandardListings
    ]);
    const orderedLocations = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useMemo"])(()=>[
            ...featuredPartners,
            ...standardListings
        ], [
        featuredPartners,
        standardListings
    ]);
    const selectedDesktop = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useMemo"])(()=>{
        if (orderedLocations.length === 0) return null;
        if (!selectedKey) return orderedLocations[0] ?? null;
        return filtered.find((l)=>l.key === selectedKey) ?? orderedLocations[0] ?? null;
    }, [
        orderedLocations,
        selectedKey,
        filtered
    ]);
    const selectedMobile = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useMemo"])(()=>{
        if (!selectedKey) return null;
        return filtered.find((l)=>l.key === selectedKey) ?? null;
    }, [
        filtered,
        selectedKey
    ]);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        if (visibleLetters.length === 0) {
            setActiveLetter("#");
            return;
        }
        if (!visibleLetters.includes(activeLetter)) {
            setActiveLetter(visibleLetters[0] ?? "#");
        }
    }, [
        visibleLetters,
        activeLetter
    ]);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        const container = leftScrollRef.current;
        if (!container || visibleLetters.length === 0) return;
        const syncActiveLetter = ()=>{
            const containerTop = container.getBoundingClientRect().top;
            const stickyHeight = leftStickyRef.current?.offsetHeight ?? 0;
            const activationLine = containerTop + stickyHeight + 28;
            let current = visibleLetters[0] ?? "#";
            let minPositive = Number.POSITIVE_INFINITY;
            for (const letter of visibleLetters){
                const section = sectionRefs.current[letter];
                if (!section) continue;
                const top = section.getBoundingClientRect().top;
                const delta = top - activationLine;
                if (delta <= 0) current = letter;
                if (delta > 0 && delta < minPositive) {
                    minPositive = delta;
                }
            }
            if (current !== activeLetter) setActiveLetter(current);
        };
        const observer = typeof IntersectionObserver !== "undefined" ? new IntersectionObserver(()=>syncActiveLetter(), {
            root: container,
            rootMargin: "-35% 0px -55% 0px",
            threshold: [
                0,
                0.01,
                0.1,
                0.5,
                1
            ]
        }) : null;
        for (const letter of visibleLetters){
            const section = sectionRefs.current[letter];
            if (section && observer) observer.observe(section);
        }
        syncActiveLetter();
        container.addEventListener("scroll", syncActiveLetter, {
            passive: true
        });
        window.addEventListener("resize", syncActiveLetter);
        return ()=>{
            observer?.disconnect();
            container.removeEventListener("scroll", syncActiveLetter);
            window.removeEventListener("resize", syncActiveLetter);
        };
    }, [
        visibleLetters,
        q,
        cat,
        featuredPartners.length,
        activeLetter
    ]);
    function jumpToLetter(letter) {
        const section = sectionRefs.current[letter];
        const container = leftScrollRef.current;
        if (!section || !container) return;
        const stickyHeight = leftStickyRef.current?.offsetHeight ?? 0;
        const top = section.offsetTop - stickyHeight - 12;
        container.scrollTo({
            top: Math.max(0, top),
            behavior: "smooth"
        });
        setActiveLetter(letter);
    }
    const mobileDetailOpen = effectiveIsMobile && Boolean(selectedMobile);
    const activeFilterLabel = cat ? `Filter: ${cat}` : "Filter";
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$app$2f$components$2f$SplitPageLayout$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {
        tagline: "A directory of places in Lancaster to explore.",
        taglineHidden: taglineHidden,
        isMobile: effectiveIsMobile,
        current: "directory",
        style: effectiveIsMobile ? {
            ["--mobileOverlayOffset"]: `${mobileOverlayOffset}px`
        } : undefined,
        mobileOverlay: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "mobileDetail",
            "data-open": mobileDetailOpen ? "true" : "false",
            "aria-hidden": !mobileDetailOpen,
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "mobileDetailHeader",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                            className: "backBtn",
                            type: "button",
                            onClick: clearSelected,
                            children: "Back"
                        }, void 0, false, {
                            fileName: "[project]/app/locations/LocationsSplitClient.tsx",
                            lineNumber: 317,
                            columnNumber: 13
                        }, void 0),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "mobileDetailTitle",
                            children: "Listing"
                        }, void 0, false, {
                            fileName: "[project]/app/locations/LocationsSplitClient.tsx",
                            lineNumber: 320,
                            columnNumber: 13
                        }, void 0)
                    ]
                }, void 0, true, {
                    fileName: "[project]/app/locations/LocationsSplitClient.tsx",
                    lineNumber: 316,
                    columnNumber: 11
                }, void 0),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "scroll",
                    style: {
                        padding: "0 16px 84px 16px"
                    },
                    children: selectedMobile ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(LocationDetail, {
                        location: selectedMobile
                    }, void 0, false, {
                        fileName: "[project]/app/locations/LocationsSplitClient.tsx",
                        lineNumber: 323,
                        columnNumber: 31
                    }, void 0) : null
                }, void 0, false, {
                    fileName: "[project]/app/locations/LocationsSplitClient.tsx",
                    lineNumber: 322,
                    columnNumber: 11
                }, void 0)
            ]
        }, void 0, true, {
            fileName: "[project]/app/locations/LocationsSplitClient.tsx",
            lineNumber: 315,
            columnNumber: 9
        }, void 0),
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "split",
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "pane paneLeft",
                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "scroll",
                        ref: leftScrollRef,
                        onScroll: (e)=>{
                            if (effectiveIsMobile) setTaglineHidden(e.currentTarget.scrollTop > 2);
                        },
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "leftSticky splitPageStickySurface",
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
                                                fileName: "[project]/app/locations/LocationsSplitClient.tsx",
                                                lineNumber: 333,
                                                columnNumber: 17
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                type: "button",
                                                className: "tabBtn",
                                                "data-active": pathname.startsWith("/locations") ? "true" : "false",
                                                onClick: ()=>router.push("/locations"),
                                                children: "Directory"
                                            }, void 0, false, {
                                                fileName: "[project]/app/locations/LocationsSplitClient.tsx",
                                                lineNumber: 341,
                                                columnNumber: 17
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                type: "button",
                                                className: "tabBtn",
                                                "data-active": pathname.startsWith("/updates") ? "true" : "false",
                                                onClick: ()=>router.push("/updates"),
                                                children: "Updates"
                                            }, void 0, false, {
                                                fileName: "[project]/app/locations/LocationsSplitClient.tsx",
                                                lineNumber: 349,
                                                columnNumber: 17
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/app/locations/LocationsSplitClient.tsx",
                                        lineNumber: 332,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "leftControls directoryLeftControls",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: `searchRow${!effectiveIsMobile ? " directorySearchRowDesktop" : ""}`,
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                                        className: "searchInput",
                                                        value: q,
                                                        onChange: (e)=>setQuery(e.target.value),
                                                        placeholder: "Search",
                                                        "aria-label": "Search locations"
                                                    }, void 0, false, {
                                                        fileName: "[project]/app/locations/LocationsSplitClient.tsx",
                                                        lineNumber: 361,
                                                        columnNumber: 19
                                                    }, this),
                                                    effectiveIsMobile ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                        type: "button",
                                                        className: "filterBtn",
                                                        "data-active": filterOpen || !!cat ? "true" : "false",
                                                        "aria-label": filterOpen ? "Close filters" : "Open filters",
                                                        "aria-expanded": filterOpen ? "true" : "false",
                                                        onClick: ()=>setFilterOpen((v)=>!v),
                                                        children: [
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$app$2f$components$2f$ToolbarIcon$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {
                                                                src: "/icons/filter.svg",
                                                                alt: "Filter"
                                                            }, void 0, false, {
                                                                fileName: "[project]/app/locations/LocationsSplitClient.tsx",
                                                                lineNumber: 378,
                                                                columnNumber: 23
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                children: activeFilterLabel
                                                            }, void 0, false, {
                                                                fileName: "[project]/app/locations/LocationsSplitClient.tsx",
                                                                lineNumber: 379,
                                                                columnNumber: 23
                                                            }, this)
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/app/locations/LocationsSplitClient.tsx",
                                                        lineNumber: 370,
                                                        columnNumber: 21
                                                    }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Fragment"], {
                                                        children: [
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                className: "directoryFilterWrap",
                                                                children: [
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                                        type: "button",
                                                                        className: "filterBtn filterBtnSquare squareIconBtn",
                                                                        "data-active": desktopFilterOpen || !!cat ? "true" : "false",
                                                                        "aria-label": desktopFilterOpen ? "Close filters" : activeFilterLabel,
                                                                        "aria-expanded": desktopFilterOpen ? "true" : "false",
                                                                        onClick: ()=>setDesktopFilterOpen((value)=>!value),
                                                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$app$2f$components$2f$ToolbarIcon$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {
                                                                            src: "/icons/filter.svg",
                                                                            alt: "Filter"
                                                                        }, void 0, false, {
                                                                            fileName: "[project]/app/locations/LocationsSplitClient.tsx",
                                                                            lineNumber: 392,
                                                                            columnNumber: 27
                                                                        }, this)
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/app/locations/LocationsSplitClient.tsx",
                                                                        lineNumber: 384,
                                                                        columnNumber: 25
                                                                    }, this),
                                                                    desktopFilterOpen ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                        className: "directoryFilterMenu",
                                                                        role: "dialog",
                                                                        "aria-label": "Directory filters",
                                                                        children: [
                                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                                                type: "button",
                                                                                className: "directoryFilterOption",
                                                                                "data-active": !cat ? "true" : "false",
                                                                                onClick: ()=>{
                                                                                    setCategory(null);
                                                                                    setDesktopFilterOpen(false);
                                                                                },
                                                                                children: "All"
                                                                            }, void 0, false, {
                                                                                fileName: "[project]/app/locations/LocationsSplitClient.tsx",
                                                                                lineNumber: 397,
                                                                                columnNumber: 29
                                                                            }, this),
                                                                            categories.map((t)=>{
                                                                                const on = normalize(cat) === normalize(t);
                                                                                return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                                                    type: "button",
                                                                                    className: "directoryFilterOption",
                                                                                    "data-active": on ? "true" : "false",
                                                                                    onClick: ()=>{
                                                                                        setCategory(on ? null : t);
                                                                                        setDesktopFilterOpen(false);
                                                                                    },
                                                                                    children: t
                                                                                }, t, false, {
                                                                                    fileName: "[project]/app/locations/LocationsSplitClient.tsx",
                                                                                    lineNumber: 411,
                                                                                    columnNumber: 33
                                                                                }, this);
                                                                            })
                                                                        ]
                                                                    }, void 0, true, {
                                                                        fileName: "[project]/app/locations/LocationsSplitClient.tsx",
                                                                        lineNumber: 396,
                                                                        columnNumber: 27
                                                                    }, this) : null
                                                                ]
                                                            }, void 0, true, {
                                                                fileName: "[project]/app/locations/LocationsSplitClient.tsx",
                                                                lineNumber: 383,
                                                                columnNumber: 23
                                                            }, this),
                                                            q || cat ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                                className: "clearBtn",
                                                                type: "button",
                                                                onClick: ()=>{
                                                                    setQuery("");
                                                                    setCategory(null);
                                                                    setDesktopFilterOpen(false);
                                                                },
                                                                children: "Clear"
                                                            }, void 0, false, {
                                                                fileName: "[project]/app/locations/LocationsSplitClient.tsx",
                                                                lineNumber: 430,
                                                                columnNumber: 25
                                                            }, this) : null
                                                        ]
                                                    }, void 0, true)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/app/locations/LocationsSplitClient.tsx",
                                                lineNumber: 360,
                                                columnNumber: 17
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: `directoryToolbar${effectiveIsMobile ? " directoryToolbarMobile" : ""}`,
                                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: `directoryAlphabetNav${effectiveIsMobile ? " directoryAlphabetNavMobile" : ""}`,
                                                    "aria-label": "Directory alphabet navigation",
                                                    children: ALPHABET.map((letter)=>{
                                                        const enabled = visibleLetters.includes(letter);
                                                        const active = activeLetter === letter;
                                                        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                            type: "button",
                                                            className: "directoryAlphaBtn",
                                                            "data-letter": letter,
                                                            "data-active": active ? "true" : "false",
                                                            disabled: !enabled,
                                                            onClick: ()=>jumpToLetter(letter),
                                                            children: letter
                                                        }, letter, false, {
                                                            fileName: "[project]/app/locations/LocationsSplitClient.tsx",
                                                            lineNumber: 452,
                                                            columnNumber: 25
                                                        }, this);
                                                    })
                                                }, void 0, false, {
                                                    fileName: "[project]/app/locations/LocationsSplitClient.tsx",
                                                    lineNumber: 447,
                                                    columnNumber: 19
                                                }, this)
                                            }, void 0, false, {
                                                fileName: "[project]/app/locations/LocationsSplitClient.tsx",
                                                lineNumber: 446,
                                                columnNumber: 17
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/app/locations/LocationsSplitClient.tsx",
                                        lineNumber: 359,
                                        columnNumber: 15
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/app/locations/LocationsSplitClient.tsx",
                                lineNumber: 331,
                                columnNumber: 13
                            }, this),
                            effectiveIsMobile && filterOpen ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "mobileSheetOverlay",
                                role: "dialog",
                                "aria-modal": "true",
                                onClick: ()=>setFilterOpen(false),
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "mobileSheet",
                                    onClick: (e)=>e.stopPropagation(),
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "mobileSheetHeader",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "mobileSheetTitle",
                                                    children: "Directory filters"
                                                }, void 0, false, {
                                                    fileName: "[project]/app/locations/LocationsSplitClient.tsx",
                                                    lineNumber: 474,
                                                    columnNumber: 21
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                    type: "button",
                                                    className: "mobileSheetClose",
                                                    onClick: ()=>setFilterOpen(false),
                                                    "aria-label": "Close filters",
                                                    children: "✕"
                                                }, void 0, false, {
                                                    fileName: "[project]/app/locations/LocationsSplitClient.tsx",
                                                    lineNumber: 475,
                                                    columnNumber: 21
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/app/locations/LocationsSplitClient.tsx",
                                            lineNumber: 473,
                                            columnNumber: 19
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "mobileSheetList",
                                            role: "group",
                                            "aria-label": "Directory filters",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                    type: "button",
                                                    className: "mobileSheetAction",
                                                    "data-active": !cat ? "true" : "false",
                                                    onClick: ()=>{
                                                        setCategory(null);
                                                        setFilterOpen(false);
                                                    },
                                                    children: "All"
                                                }, void 0, false, {
                                                    fileName: "[project]/app/locations/LocationsSplitClient.tsx",
                                                    lineNumber: 486,
                                                    columnNumber: 21
                                                }, this),
                                                categories.map((t)=>{
                                                    const on = normalize(cat) === normalize(t);
                                                    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                        type: "button",
                                                        className: "mobileSheetAction",
                                                        "data-active": on ? "true" : "false",
                                                        onClick: ()=>{
                                                            setCategory(on ? null : t);
                                                            setFilterOpen(false);
                                                        },
                                                        children: t
                                                    }, t, false, {
                                                        fileName: "[project]/app/locations/LocationsSplitClient.tsx",
                                                        lineNumber: 500,
                                                        columnNumber: 25
                                                    }, this);
                                                })
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/app/locations/LocationsSplitClient.tsx",
                                            lineNumber: 485,
                                            columnNumber: 19
                                        }, this),
                                        q || cat ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                            type: "button",
                                            className: "mobileSheetClear",
                                            onClick: ()=>{
                                                setQuery("");
                                                setCategory(null);
                                                setFilterOpen(false);
                                            },
                                            children: "Clear search & filters"
                                        }, void 0, false, {
                                            fileName: "[project]/app/locations/LocationsSplitClient.tsx",
                                            lineNumber: 517,
                                            columnNumber: 21
                                        }, this) : null
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/app/locations/LocationsSplitClient.tsx",
                                    lineNumber: 472,
                                    columnNumber: 17
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/app/locations/LocationsSplitClient.tsx",
                                lineNumber: 471,
                                columnNumber: 15
                            }, this) : null,
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "splitPageListBody",
                                children: filtered.length === 0 ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "emptyList",
                                    children: "No listings yet."
                                }, void 0, false, {
                                    fileName: "[project]/app/locations/LocationsSplitClient.tsx",
                                    lineNumber: 535,
                                    columnNumber: 15
                                }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "directoryListWrap",
                                    children: [
                                        featuredPartners.length > 0 ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "directoryGroupBlock",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "directorySectionHeading",
                                                    children: "Featured partners"
                                                }, void 0, false, {
                                                    fileName: "[project]/app/locations/LocationsSplitClient.tsx",
                                                    lineNumber: 540,
                                                    columnNumber: 21
                                                }, this),
                                                featuredPartners.map((l)=>{
                                                    const active = selectedKey ? selectedKey === l.key : selectedDesktop?.key === l.key;
                                                    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                        className: "eventRow",
                                                        "data-active": active ? "true" : "false",
                                                        onClick: ()=>setSelected(l.key),
                                                        type: "button",
                                                        children: [
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                className: "eventRowTitle",
                                                                children: l.name ?? "Untitled listing"
                                                            }, void 0, false, {
                                                                fileName: "[project]/app/locations/LocationsSplitClient.tsx",
                                                                lineNumber: 551,
                                                                columnNumber: 27
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                className: "eventRowMeta",
                                                                children: [
                                                                    l.category ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                        children: l.category
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/app/locations/LocationsSplitClient.tsx",
                                                                        lineNumber: 553,
                                                                        columnNumber: 43
                                                                    }, this) : null,
                                                                    l.address ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                        className: "dot",
                                                                        children: "•"
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/app/locations/LocationsSplitClient.tsx",
                                                                        lineNumber: 554,
                                                                        columnNumber: 42
                                                                    }, this) : null,
                                                                    l.address ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                        children: l.address
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/app/locations/LocationsSplitClient.tsx",
                                                                        lineNumber: 555,
                                                                        columnNumber: 42
                                                                    }, this) : null
                                                                ]
                                                            }, void 0, true, {
                                                                fileName: "[project]/app/locations/LocationsSplitClient.tsx",
                                                                lineNumber: 552,
                                                                columnNumber: 27
                                                            }, this)
                                                        ]
                                                    }, l.id, true, {
                                                        fileName: "[project]/app/locations/LocationsSplitClient.tsx",
                                                        lineNumber: 544,
                                                        columnNumber: 25
                                                    }, this);
                                                })
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/app/locations/LocationsSplitClient.tsx",
                                            lineNumber: 539,
                                            columnNumber: 19
                                        }, this) : null,
                                        groupedStandardListings.length > 0 ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "directoryGroupBlock",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "directorySectionHeading",
                                                    children: "Directory"
                                                }, void 0, false, {
                                                    fileName: "[project]/app/locations/LocationsSplitClient.tsx",
                                                    lineNumber: 565,
                                                    columnNumber: 21
                                                }, this),
                                                groupedStandardListings.map((section)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        ref: (node)=>{
                                                            sectionRefs.current[section.letter] = node;
                                                        },
                                                        className: "directoryLetterSection",
                                                        "data-letter-section": section.letter,
                                                        children: [
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                className: "directoryLetterHeading",
                                                                children: section.letter
                                                            }, void 0, false, {
                                                                fileName: "[project]/app/locations/LocationsSplitClient.tsx",
                                                                lineNumber: 575,
                                                                columnNumber: 25
                                                            }, this),
                                                            section.rows.map((l)=>{
                                                                const active = selectedKey ? selectedKey === l.key : selectedDesktop?.key === l.key;
                                                                return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                                    className: "eventRow",
                                                                    "data-active": active ? "true" : "false",
                                                                    onClick: ()=>setSelected(l.key),
                                                                    type: "button",
                                                                    children: [
                                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                            className: "eventRowTitle",
                                                                            children: l.name ?? "Untitled listing"
                                                                        }, void 0, false, {
                                                                            fileName: "[project]/app/locations/LocationsSplitClient.tsx",
                                                                            lineNumber: 586,
                                                                            columnNumber: 31
                                                                        }, this),
                                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                            className: "eventRowMeta",
                                                                            children: [
                                                                                l.category ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                                    children: l.category
                                                                                }, void 0, false, {
                                                                                    fileName: "[project]/app/locations/LocationsSplitClient.tsx",
                                                                                    lineNumber: 588,
                                                                                    columnNumber: 47
                                                                                }, this) : null,
                                                                                l.address ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                                    className: "dot",
                                                                                    children: "•"
                                                                                }, void 0, false, {
                                                                                    fileName: "[project]/app/locations/LocationsSplitClient.tsx",
                                                                                    lineNumber: 589,
                                                                                    columnNumber: 46
                                                                                }, this) : null,
                                                                                l.address ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                                    children: l.address
                                                                                }, void 0, false, {
                                                                                    fileName: "[project]/app/locations/LocationsSplitClient.tsx",
                                                                                    lineNumber: 590,
                                                                                    columnNumber: 46
                                                                                }, this) : null
                                                                            ]
                                                                        }, void 0, true, {
                                                                            fileName: "[project]/app/locations/LocationsSplitClient.tsx",
                                                                            lineNumber: 587,
                                                                            columnNumber: 31
                                                                        }, this)
                                                                    ]
                                                                }, l.id, true, {
                                                                    fileName: "[project]/app/locations/LocationsSplitClient.tsx",
                                                                    lineNumber: 579,
                                                                    columnNumber: 29
                                                                }, this);
                                                            })
                                                        ]
                                                    }, section.letter, true, {
                                                        fileName: "[project]/app/locations/LocationsSplitClient.tsx",
                                                        lineNumber: 567,
                                                        columnNumber: 23
                                                    }, this))
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/app/locations/LocationsSplitClient.tsx",
                                            lineNumber: 564,
                                            columnNumber: 19
                                        }, this) : null
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/app/locations/LocationsSplitClient.tsx",
                                    lineNumber: 537,
                                    columnNumber: 15
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/app/locations/LocationsSplitClient.tsx",
                                lineNumber: 533,
                                columnNumber: 13
                            }, this),
                            !effectiveIsMobile ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "splitPageMiniFooter",
                                "aria-hidden": "true",
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "splitPageMiniFooterInner",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                            children: "Lancaster directory"
                                        }, void 0, false, {
                                            fileName: "[project]/app/locations/LocationsSplitClient.tsx",
                                            lineNumber: 606,
                                            columnNumber: 19
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                            className: "dot",
                                            children: "•"
                                        }, void 0, false, {
                                            fileName: "[project]/app/locations/LocationsSplitClient.tsx",
                                            lineNumber: 607,
                                            columnNumber: 19
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                            children: "End of listings"
                                        }, void 0, false, {
                                            fileName: "[project]/app/locations/LocationsSplitClient.tsx",
                                            lineNumber: 608,
                                            columnNumber: 19
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/app/locations/LocationsSplitClient.tsx",
                                    lineNumber: 605,
                                    columnNumber: 17
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/app/locations/LocationsSplitClient.tsx",
                                lineNumber: 604,
                                columnNumber: 15
                            }, this) : null
                        ]
                    }, void 0, true, {
                        fileName: "[project]/app/locations/LocationsSplitClient.tsx",
                        lineNumber: 330,
                        columnNumber: 11
                    }, this)
                }, void 0, false, {
                    fileName: "[project]/app/locations/LocationsSplitClient.tsx",
                    lineNumber: 329,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "pane paneRight",
                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "scroll",
                        children: !selectedDesktop ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "emptyRight",
                            children: "Select a listing to see details."
                        }, void 0, false, {
                            fileName: "[project]/app/locations/LocationsSplitClient.tsx",
                            lineNumber: 618,
                            columnNumber: 15
                        }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(LocationDetail, {
                            location: selectedDesktop
                        }, void 0, false, {
                            fileName: "[project]/app/locations/LocationsSplitClient.tsx",
                            lineNumber: 620,
                            columnNumber: 15
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/app/locations/LocationsSplitClient.tsx",
                        lineNumber: 616,
                        columnNumber: 11
                    }, this)
                }, void 0, false, {
                    fileName: "[project]/app/locations/LocationsSplitClient.tsx",
                    lineNumber: 615,
                    columnNumber: 9
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/app/locations/LocationsSplitClient.tsx",
            lineNumber: 328,
            columnNumber: 7
        }, this)
    }, void 0, false, {
        fileName: "[project]/app/locations/LocationsSplitClient.tsx",
        lineNumber: 304,
        columnNumber: 5
    }, this);
}
function LocationDetail({ location }) {
    const detailFlashKey = location.id ?? location.uid ?? location.name ?? "detail";
    const [placeDetails, setPlaceDetails] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(null);
    const [detailsLoading, setDetailsLoading] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(false);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        let cancelled = false;
        const placeId = location.venue_external_id?.trim();
        if (!placeId) {
            setPlaceDetails(null);
            setDetailsLoading(false);
            return;
        }
        setDetailsLoading(true);
        fetch(`/api/places/details?id=${encodeURIComponent(placeId)}`, {
            cache: "no-store"
        }).then((response)=>response.json()).then((data)=>{
            if (cancelled) return;
            setPlaceDetails(data?.ok ? data.details ?? null : null);
        }).catch(()=>{
            if (!cancelled) setPlaceDetails(null);
        }).finally(()=>{
            if (!cancelled) setDetailsLoading(false);
        });
        return ()=>{
            cancelled = true;
        };
    }, [
        location.venue_external_id
    ]);
    const coverImageUrl = placeDetails?.coverImageUrl || location.coverImageUrl || null;
    const galleryImageUrls = placeDetails?.galleryImageUrls?.length ? placeDetails.galleryImageUrls : location.galleryImageUrls || [];
    const weekdayDescriptions = placeDetails?.weekdayDescriptions?.length ? placeDetails.weekdayDescriptions : location.weekdayDescriptions || [];
    const websiteHref = location.website || placeDetails?.websiteUri || null;
    const mapsHref = placeDetails?.googleMapsUri || location.googleMapsUri || null;
    const phone = placeDetails?.nationalPhoneNumber || location.phone || null;
    const rating = typeof placeDetails?.rating === "number" ? placeDetails.rating : location.rating;
    const photoAttributions = placeDetails?.photoAttributions?.length ? placeDetails.photoAttributions : [];
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "detailCard detailFlash",
        children: [
            coverImageUrl ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "locationCover fadeInItem",
                style: {
                    animationDelay: "160ms"
                },
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("img", {
                    src: coverImageUrl,
                    alt: location.name ?? "Listing cover"
                }, void 0, false, {
                    fileName: "[project]/app/locations/LocationsSplitClient.tsx",
                    lineNumber: 678,
                    columnNumber: 11
                }, this)
            }, void 0, false, {
                fileName: "[project]/app/locations/LocationsSplitClient.tsx",
                lineNumber: 676,
                columnNumber: 9
            }, this) : null,
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "detailTitle fadeInItem",
                style: {
                    animationDelay: "260ms"
                },
                children: location.name ?? "Untitled listing"
            }, void 0, false, {
                fileName: "[project]/app/locations/LocationsSplitClient.tsx",
                lineNumber: 682,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "detailMeta fadeInItem",
                style: {
                    animationDelay: "320ms"
                },
                children: [
                    location.category ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                        className: "badge",
                        children: location.category
                    }, void 0, false, {
                        fileName: "[project]/app/locations/LocationsSplitClient.tsx",
                        lineNumber: 687,
                        columnNumber: 30
                    }, this) : null,
                    location.address ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                        className: "muted",
                        children: location.address
                    }, void 0, false, {
                        fileName: "[project]/app/locations/LocationsSplitClient.tsx",
                        lineNumber: 688,
                        columnNumber: 29
                    }, this) : null,
                    typeof rating === "number" ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                        className: "muted",
                        children: [
                            "★ ",
                            rating.toFixed(1)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/app/locations/LocationsSplitClient.tsx",
                        lineNumber: 689,
                        columnNumber: 39
                    }, this) : null,
                    typeof placeDetails?.openNow === "boolean" ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                        className: `badge ${placeDetails.openNow ? "badgeOpen" : "badgeClosed"}`,
                        children: placeDetails.openNow ? "Open now" : "Closed now"
                    }, void 0, false, {
                        fileName: "[project]/app/locations/LocationsSplitClient.tsx",
                        lineNumber: 691,
                        columnNumber: 11
                    }, this) : null
                ]
            }, void 0, true, {
                fileName: "[project]/app/locations/LocationsSplitClient.tsx",
                lineNumber: 686,
                columnNumber: 7
            }, this),
            location.customPageUrl || websiteHref || mapsHref ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                className: "locationDetailLinks",
                style: {
                    marginTop: 10,
                    display: "flex",
                    gap: 14,
                    flexWrap: "wrap"
                },
                children: [
                    location.customPageUrl ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("a", {
                        className: "link",
                        href: location.customPageUrl,
                        children: "Full page"
                    }, void 0, false, {
                        fileName: "[project]/app/locations/LocationsSplitClient.tsx",
                        lineNumber: 700,
                        columnNumber: 13
                    }, this) : null,
                    websiteHref ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("a", {
                        className: "link",
                        href: websiteHref,
                        target: "_blank",
                        rel: "noreferrer",
                        children: "Website"
                    }, void 0, false, {
                        fileName: "[project]/app/locations/LocationsSplitClient.tsx",
                        lineNumber: 705,
                        columnNumber: 13
                    }, this) : null,
                    mapsHref ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("a", {
                        className: "link",
                        href: mapsHref,
                        target: "_blank",
                        rel: "noreferrer",
                        children: "Maps"
                    }, void 0, false, {
                        fileName: "[project]/app/locations/LocationsSplitClient.tsx",
                        lineNumber: 710,
                        columnNumber: 13
                    }, this) : null
                ]
            }, void 0, true, {
                fileName: "[project]/app/locations/LocationsSplitClient.tsx",
                lineNumber: 698,
                columnNumber: 9
            }, this) : null,
            location.description ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "detailBody fadeInItem",
                style: {
                    animationDelay: "380ms"
                },
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                    children: location.description
                }, void 0, false, {
                    fileName: "[project]/app/locations/LocationsSplitClient.tsx",
                    lineNumber: 719,
                    columnNumber: 11
                }, this)
            }, void 0, false, {
                fileName: "[project]/app/locations/LocationsSplitClient.tsx",
                lineNumber: 718,
                columnNumber: 9
            }, this) : null,
            phone || weekdayDescriptions.length || detailsLoading ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "locationDataCard fadeInItem",
                style: {
                    animationDelay: "420ms"
                },
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "locationDataTitle",
                        children: "Business info"
                    }, void 0, false, {
                        fileName: "[project]/app/locations/LocationsSplitClient.tsx",
                        lineNumber: 725,
                        columnNumber: 11
                    }, this),
                    phone ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "locationDataRow",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                className: "locationDataLabel",
                                children: "Phone"
                            }, void 0, false, {
                                fileName: "[project]/app/locations/LocationsSplitClient.tsx",
                                lineNumber: 728,
                                columnNumber: 15
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                children: phone
                            }, void 0, false, {
                                fileName: "[project]/app/locations/LocationsSplitClient.tsx",
                                lineNumber: 729,
                                columnNumber: 15
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/app/locations/LocationsSplitClient.tsx",
                        lineNumber: 727,
                        columnNumber: 13
                    }, this) : null,
                    weekdayDescriptions.length ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "locationHoursList",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "locationDataLabel",
                                children: "Hours"
                            }, void 0, false, {
                                fileName: "[project]/app/locations/LocationsSplitClient.tsx",
                                lineNumber: 735,
                                columnNumber: 15
                            }, this),
                            weekdayDescriptions.map((line)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "locationHoursRow",
                                    children: line
                                }, line, false, {
                                    fileName: "[project]/app/locations/LocationsSplitClient.tsx",
                                    lineNumber: 737,
                                    columnNumber: 17
                                }, this))
                        ]
                    }, void 0, true, {
                        fileName: "[project]/app/locations/LocationsSplitClient.tsx",
                        lineNumber: 734,
                        columnNumber: 13
                    }, this) : detailsLoading ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "locationHoursLoading",
                        children: "Loading hours…"
                    }, void 0, false, {
                        fileName: "[project]/app/locations/LocationsSplitClient.tsx",
                        lineNumber: 741,
                        columnNumber: 13
                    }, this) : null
                ]
            }, void 0, true, {
                fileName: "[project]/app/locations/LocationsSplitClient.tsx",
                lineNumber: 724,
                columnNumber: 9
            }, this) : null,
            galleryImageUrls.length ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "locationGalleryWrap fadeInItem",
                style: {
                    animationDelay: "480ms"
                },
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "locationGallery",
                        children: galleryImageUrls.map((src, index)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "locationGalleryItem",
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("img", {
                                    src: src,
                                    alt: `${location.name ?? "Listing"} image ${index + 1}`,
                                    loading: "lazy"
                                }, void 0, false, {
                                    fileName: "[project]/app/locations/LocationsSplitClient.tsx",
                                    lineNumber: 752,
                                    columnNumber: 17
                                }, this)
                            }, `${src}-${index}`, false, {
                                fileName: "[project]/app/locations/LocationsSplitClient.tsx",
                                lineNumber: 750,
                                columnNumber: 15
                            }, this))
                    }, void 0, false, {
                        fileName: "[project]/app/locations/LocationsSplitClient.tsx",
                        lineNumber: 748,
                        columnNumber: 11
                    }, this),
                    photoAttributions.length ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "locationPhotoAttribution",
                        children: [
                            "Photos: ",
                            photoAttributions.join(", ")
                        ]
                    }, void 0, true, {
                        fileName: "[project]/app/locations/LocationsSplitClient.tsx",
                        lineNumber: 757,
                        columnNumber: 13
                    }, this) : null
                ]
            }, void 0, true, {
                fileName: "[project]/app/locations/LocationsSplitClient.tsx",
                lineNumber: 747,
                columnNumber: 9
            }, this) : null
        ]
    }, detailFlashKey, true, {
        fileName: "[project]/app/locations/LocationsSplitClient.tsx",
        lineNumber: 674,
        columnNumber: 5
    }, this);
}
}),
];

//# sourceMappingURL=_98a312cb._.js.map