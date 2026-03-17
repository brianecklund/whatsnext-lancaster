(globalThis.TURBOPACK || (globalThis.TURBOPACK = [])).push([typeof document === "object" ? document.currentScript : undefined,
"[project]/app/components/ToolbarIcon.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>ToolbarIcon
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
;
function ToolbarIcon({ src, alt }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("img", {
        src: src,
        alt: alt,
        className: "btnIconImg"
    }, void 0, false, {
        fileName: "[project]/app/components/ToolbarIcon.tsx",
        lineNumber: 2,
        columnNumber: 10
    }, this);
}
_c = ToolbarIcon;
var _c;
__turbopack_context__.k.register(_c, "ToolbarIcon");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/app/hooks/useBodyScrollLock.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "useBodyScrollLock",
    ()=>useBodyScrollLock
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var _s = __turbopack_context__.k.signature();
"use client";
;
function useBodyScrollLock(locked) {
    _s();
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "useBodyScrollLock.useEffect": ()=>{
            const previousHtmlOverflow = document.documentElement.style.overflow;
            const previousBodyOverflow = document.body.style.overflow;
            if (locked) {
                document.documentElement.style.overflow = "hidden";
                document.body.style.overflow = "hidden";
            }
            return ({
                "useBodyScrollLock.useEffect": ()=>{
                    document.documentElement.style.overflow = previousHtmlOverflow;
                    document.body.style.overflow = previousBodyOverflow;
                }
            })["useBodyScrollLock.useEffect"];
        }
    }["useBodyScrollLock.useEffect"], [
        locked
    ]);
}
_s(useBodyScrollLock, "OD7bBpZva5O2jO+Puf00hKivP7c=");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
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
function useSmoothWheel(_containerSelector = ".scroll") {
    _s();
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "useSmoothWheel.useEffect": ()=>{
            return;
        }
    }["useSmoothWheel.useEffect"], [
        _containerSelector
    ]);
}
_s(useSmoothWheel, "OD7bBpZva5O2jO+Puf00hKivP7c=");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/app/components/SplitPageLayout.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>SplitPageLayout
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/navigation.js [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
"use client";
;
function SplitPageLayout({ tagline, taglineHidden = false, isMobile = false, current, children, mobileOverlay, style }) {
    _s();
    const router = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRouter"])();
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "pageShell",
        style: style,
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("section", {
                className: `newsBar pageIntroBar ${taglineHidden ? "pageIntroBarHidden" : ""}`,
                "aria-label": "Page introduction",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
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
            isMobile ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "mobileTabs mobilePrimaryTabs",
                "aria-label": "Primary navigation",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
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
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
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
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
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
_s(SplitPageLayout, "fN7XvhJ+p5oE6+Xlo0NJmXpxjC8=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRouter"]
    ];
});
_c = SplitPageLayout;
var _c;
__turbopack_context__.k.register(_c, "SplitPageLayout");
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
var __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$components$2f$ToolbarIcon$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/app/components/ToolbarIcon.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$hooks$2f$useBodyScrollLock$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/app/hooks/useBodyScrollLock.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$components$2f$useSmoothWheel$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/app/components/useSmoothWheel.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$components$2f$SplitPageLayout$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/app/components/SplitPageLayout.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/navigation.js [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
"use client";
;
;
;
;
;
;
function norm(v) {
    return (v || "").toLowerCase().trim();
}
function tagIconFor(tag) {
    const t = norm(tag);
    if (t.includes("opening") || t.includes("launch")) return "✦";
    if (t.includes("food") || t.includes("drink") || t.includes("menu")) return "◔";
    if (t.includes("music") || t.includes("show") || t.includes("concert")) return "♪";
    if (t.includes("art") || t.includes("gallery")) return "✳";
    if (t.includes("community") || t.includes("market")) return "◎";
    if (t.includes("alert") || t.includes("psa") || t.includes("notice")) return "!";
    return "•";
}
function UpdateDetail({ update }) {
    const detailFlashKey = update?.id ?? update?.title ?? update?.date ?? "detail";
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "detailCard detailFlash",
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
                            children: update.title
                        }, void 0, false, {
                            fileName: "[project]/app/updates/UpdatesSplitClient.tsx",
                            lineNumber: 46,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "detailMeta fadeInItem",
                            style: {
                                animationDelay: "320ms"
                            },
                            children: update.date ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                children: update.date
                            }, void 0, false, {
                                fileName: "[project]/app/updates/UpdatesSplitClient.tsx",
                                lineNumber: 50,
                                columnNumber: 28
                            }, this) : null
                        }, void 0, false, {
                            fileName: "[project]/app/updates/UpdatesSplitClient.tsx",
                            lineNumber: 49,
                            columnNumber: 11
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/app/updates/UpdatesSplitClient.tsx",
                    lineNumber: 45,
                    columnNumber: 9
                }, this)
            }, void 0, false, {
                fileName: "[project]/app/updates/UpdatesSplitClient.tsx",
                lineNumber: 44,
                columnNumber: 7
            }, this),
            update.tags?.length ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "tagRow",
                style: {
                    marginTop: 10
                },
                children: update.tags.map((t)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                        className: "tagChip updateTagChip",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                className: "tagGlyph",
                                "aria-hidden": true,
                                children: tagIconFor(t)
                            }, void 0, false, {
                                fileName: "[project]/app/updates/UpdatesSplitClient.tsx",
                                lineNumber: 59,
                                columnNumber: 15
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                children: t
                            }, void 0, false, {
                                fileName: "[project]/app/updates/UpdatesSplitClient.tsx",
                                lineNumber: 60,
                                columnNumber: 15
                            }, this)
                        ]
                    }, t, true, {
                        fileName: "[project]/app/updates/UpdatesSplitClient.tsx",
                        lineNumber: 58,
                        columnNumber: 13
                    }, this))
            }, void 0, false, {
                fileName: "[project]/app/updates/UpdatesSplitClient.tsx",
                lineNumber: 56,
                columnNumber: 9
            }, this) : null,
            update.body ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "detailDesc fadeInItem",
                style: {
                    animationDelay: "360ms"
                },
                children: update.body
            }, void 0, false, {
                fileName: "[project]/app/updates/UpdatesSplitClient.tsx",
                lineNumber: 67,
                columnNumber: 9
            }, this) : null,
            update.link ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "detailLinks",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("a", {
                    className: "pillBtn",
                    href: update.link,
                    target: "_blank",
                    rel: "noreferrer",
                    children: "Learn more"
                }, void 0, false, {
                    fileName: "[project]/app/updates/UpdatesSplitClient.tsx",
                    lineNumber: 74,
                    columnNumber: 11
                }, this)
            }, void 0, false, {
                fileName: "[project]/app/updates/UpdatesSplitClient.tsx",
                lineNumber: 73,
                columnNumber: 9
            }, this) : null
        ]
    }, detailFlashKey, true, {
        fileName: "[project]/app/updates/UpdatesSplitClient.tsx",
        lineNumber: 43,
        columnNumber: 5
    }, this);
}
_c = UpdateDetail;
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
    const [filterOpen, setFilterOpen] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [taglineHidden, setTaglineHidden] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "UpdatesSplitClient.useEffect": ()=>{
            const mq = window.matchMedia("(max-width: 980px)");
            const apply = {
                "UpdatesSplitClient.useEffect.apply": ()=>setIsMobile(mq.matches)
            }["UpdatesSplitClient.useEffect.apply"];
            apply();
            if (mq.addEventListener) mq.addEventListener("change", apply);
            else mq.addListener(apply);
            return ({
                "UpdatesSplitClient.useEffect": ()=>{
                    if (mq.removeEventListener) mq.removeEventListener("change", apply);
                    else mq.removeListener(apply);
                }
            })["UpdatesSplitClient.useEffect"];
        }
    }["UpdatesSplitClient.useEffect"], []);
    const safeUpdates = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMemo"])({
        "UpdatesSplitClient.useMemo[safeUpdates]": ()=>Array.isArray(updates) ? updates : []
    }["UpdatesSplitClient.useMemo[safeUpdates]"], [
        updates
    ]);
    const tags = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMemo"])({
        "UpdatesSplitClient.useMemo[tags]": ()=>{
            const s = new Set();
            for (const u of safeUpdates){
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
        safeUpdates
    ]);
    const filtered = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMemo"])({
        "UpdatesSplitClient.useMemo[filtered]": ()=>{
            const nq = norm(q);
            const nt = norm(tag);
            return safeUpdates.filter({
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
        safeUpdates,
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
    const mobileDetailOpen = isMobile && Boolean(selectedMobile);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "UpdatesSplitClient.useEffect": ()=>{
            if (!isMobile) {
                setFilterOpen(false);
                setTaglineHidden(false);
            }
        }
    }["UpdatesSplitClient.useEffect"], [
        isMobile
    ]);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$hooks$2f$useBodyScrollLock$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useBodyScrollLock"])(filterOpen || mobileDetailOpen);
    function setParam(key, value) {
        const params = new URLSearchParams(sp.toString());
        if (!value) params.delete(key);
        else params.set(key, value);
        const query = params.toString();
        router.push(query ? `/updates?${query}` : "/updates");
    }
    function setSelected(id) {
        setParam("u", id);
    }
    function clearSelected() {
        setParam("u", null);
    }
    const leftSticky = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "leftSticky splitPageStickySurface",
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
                        lineNumber: 178,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                        type: "button",
                        className: "tabBtn",
                        "data-active": pathname?.startsWith("/locations") ? "true" : "false",
                        onClick: ()=>router.push("/locations"),
                        children: "Directory"
                    }, void 0, false, {
                        fileName: "[project]/app/updates/UpdatesSplitClient.tsx",
                        lineNumber: 186,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                        type: "button",
                        className: "tabBtn",
                        "data-active": pathname?.startsWith("/updates") ? "true" : "false",
                        onClick: ()=>router.push("/updates"),
                        children: "Updates"
                    }, void 0, false, {
                        fileName: "[project]/app/updates/UpdatesSplitClient.tsx",
                        lineNumber: 194,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/app/updates/UpdatesSplitClient.tsx",
                lineNumber: 177,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "leftControls",
                children: isMobile ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "searchRow",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                            className: "searchInput",
                            placeholder: "Search updates…",
                            value: q,
                            onChange: (e)=>setParam("q", e.target.value),
                            "aria-label": "Search updates"
                        }, void 0, false, {
                            fileName: "[project]/app/updates/UpdatesSplitClient.tsx",
                            lineNumber: 207,
                            columnNumber: 13
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                            type: "button",
                            className: "filterBtn",
                            "aria-label": filterOpen ? "Close filters" : "Open filters",
                            "aria-expanded": filterOpen ? "true" : "false",
                            onClick: ()=>setFilterOpen((v)=>!v),
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$app$2f$components$2f$ToolbarIcon$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                    src: "/icons/filter.svg",
                                    alt: "Filter"
                                }, void 0, false, {
                                    fileName: "[project]/app/updates/UpdatesSplitClient.tsx",
                                    lineNumber: 221,
                                    columnNumber: 15
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                    children: tag ? `Filter: ${tag}` : "Filter"
                                }, void 0, false, {
                                    fileName: "[project]/app/updates/UpdatesSplitClient.tsx",
                                    lineNumber: 222,
                                    columnNumber: 15
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/app/updates/UpdatesSplitClient.tsx",
                            lineNumber: 214,
                            columnNumber: 13
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/app/updates/UpdatesSplitClient.tsx",
                    lineNumber: 206,
                    columnNumber: 11
                }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Fragment"], {
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                            className: "searchInput",
                            placeholder: "Search updates…",
                            value: q,
                            onChange: (e)=>setParam("q", e.target.value),
                            "aria-label": "Search updates"
                        }, void 0, false, {
                            fileName: "[project]/app/updates/UpdatesSplitClient.tsx",
                            lineNumber: 227,
                            columnNumber: 13
                        }, this),
                        q || tag ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                            className: "clearBtn",
                            type: "button",
                            onClick: ()=>{
                                setParam("q", null);
                                setParam("tag", null);
                            },
                            children: "Clear"
                        }, void 0, false, {
                            fileName: "[project]/app/updates/UpdatesSplitClient.tsx",
                            lineNumber: 235,
                            columnNumber: 15
                        }, this) : null
                    ]
                }, void 0, true)
            }, void 0, false, {
                fileName: "[project]/app/updates/UpdatesSplitClient.tsx",
                lineNumber: 204,
                columnNumber: 7
            }, this),
            !isMobile ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
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
                        lineNumber: 252,
                        columnNumber: 11
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
                            lineNumber: 263,
                            columnNumber: 15
                        }, this);
                    })
                ]
            }, void 0, true, {
                fileName: "[project]/app/updates/UpdatesSplitClient.tsx",
                lineNumber: 251,
                columnNumber: 9
            }, this) : null
        ]
    }, void 0, true, {
        fileName: "[project]/app/updates/UpdatesSplitClient.tsx",
        lineNumber: 176,
        columnNumber: 5
    }, this);
    const list = filtered.length === 0 ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "emptyList",
        children: "No updates found."
    }, void 0, false, {
        fileName: "[project]/app/updates/UpdatesSplitClient.tsx",
        lineNumber: 280,
        columnNumber: 5
    }, this) : filtered.map((u)=>{
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
                    lineNumber: 292,
                    columnNumber: 11
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                    className: "eventRowMeta updateRowMeta",
                    children: u.date ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                        className: "updateDateBadge",
                        children: u.date
                    }, void 0, false, {
                        fileName: "[project]/app/updates/UpdatesSplitClient.tsx",
                        lineNumber: 294,
                        columnNumber: 23
                    }, this) : null
                }, void 0, false, {
                    fileName: "[project]/app/updates/UpdatesSplitClient.tsx",
                    lineNumber: 293,
                    columnNumber: 11
                }, this),
                u.tags?.length ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                    className: "tagRow",
                    "aria-label": "Update tags",
                    children: u.tags.slice(0, 3).map((t)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                            className: "tagChip updateTagChip",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                    className: "tagGlyph",
                                    "aria-hidden": true,
                                    children: tagIconFor(t)
                                }, void 0, false, {
                                    fileName: "[project]/app/updates/UpdatesSplitClient.tsx",
                                    lineNumber: 300,
                                    columnNumber: 19
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                    children: t
                                }, void 0, false, {
                                    fileName: "[project]/app/updates/UpdatesSplitClient.tsx",
                                    lineNumber: 301,
                                    columnNumber: 19
                                }, this)
                            ]
                        }, t, true, {
                            fileName: "[project]/app/updates/UpdatesSplitClient.tsx",
                            lineNumber: 299,
                            columnNumber: 17
                        }, this))
                }, void 0, false, {
                    fileName: "[project]/app/updates/UpdatesSplitClient.tsx",
                    lineNumber: 297,
                    columnNumber: 13
                }, this) : null
            ]
        }, u.id, true, {
            fileName: "[project]/app/updates/UpdatesSplitClient.tsx",
            lineNumber: 285,
            columnNumber: 9
        }, this);
    });
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$app$2f$components$2f$SplitPageLayout$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
        tagline: "Updates, openings, menu changes, PSAs, and quick announcements.",
        taglineHidden: taglineHidden,
        isMobile: isMobile,
        current: "updates",
        mobileOverlay: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
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
                            fileName: "[project]/app/updates/UpdatesSplitClient.tsx",
                            lineNumber: 320,
                            columnNumber: 13
                        }, void 0),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "mobileDetailTitle",
                            children: "Update"
                        }, void 0, false, {
                            fileName: "[project]/app/updates/UpdatesSplitClient.tsx",
                            lineNumber: 323,
                            columnNumber: 13
                        }, void 0)
                    ]
                }, void 0, true, {
                    fileName: "[project]/app/updates/UpdatesSplitClient.tsx",
                    lineNumber: 319,
                    columnNumber: 11
                }, void 0),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "scroll",
                    style: {
                        padding: "0 16px 96px 16px"
                    },
                    children: selectedMobile ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(UpdateDetail, {
                        update: selectedMobile
                    }, void 0, false, {
                        fileName: "[project]/app/updates/UpdatesSplitClient.tsx",
                        lineNumber: 326,
                        columnNumber: 31
                    }, void 0) : null
                }, void 0, false, {
                    fileName: "[project]/app/updates/UpdatesSplitClient.tsx",
                    lineNumber: 325,
                    columnNumber: 11
                }, void 0)
            ]
        }, void 0, true, {
            fileName: "[project]/app/updates/UpdatesSplitClient.tsx",
            lineNumber: 318,
            columnNumber: 9
        }, void 0),
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "split",
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("aside", {
                    className: "pane paneLeft",
                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "scroll",
                        onScroll: (e)=>{
                            if (isMobile) setTaglineHidden(e.currentTarget.scrollTop > 2);
                        },
                        children: [
                            leftSticky,
                            isMobile && filterOpen ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "filterOverlay",
                                role: "dialog",
                                "aria-modal": "true",
                                "aria-label": "Filters",
                                onClick: ()=>setFilterOpen(false),
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "filterOverlayPanel",
                                    onClick: (e)=>e.stopPropagation(),
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "filterOverlayHeader",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "filterOverlayTitle",
                                                    children: "Filters"
                                                }, void 0, false, {
                                                    fileName: "[project]/app/updates/UpdatesSplitClient.tsx",
                                                    lineNumber: 351,
                                                    columnNumber: 21
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                    type: "button",
                                                    className: "filterOverlayClose",
                                                    onClick: ()=>setFilterOpen(false),
                                                    "aria-label": "Close filters",
                                                    children: "✕"
                                                }, void 0, false, {
                                                    fileName: "[project]/app/updates/UpdatesSplitClient.tsx",
                                                    lineNumber: 352,
                                                    columnNumber: 21
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/app/updates/UpdatesSplitClient.tsx",
                                            lineNumber: 350,
                                            columnNumber: 19
                                        }, this),
                                        q || tag ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                            type: "button",
                                            className: "filterOverlayClear",
                                            onClick: ()=>{
                                                setParam("q", null);
                                                setParam("tag", null);
                                                setFilterOpen(false);
                                            },
                                            children: "Clear search & filters"
                                        }, void 0, false, {
                                            fileName: "[project]/app/updates/UpdatesSplitClient.tsx",
                                            lineNumber: 363,
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
                                                    onClick: ()=>{
                                                        setParam("tag", null);
                                                        setFilterOpen(false);
                                                    },
                                                    children: "All"
                                                }, void 0, false, {
                                                    fileName: "[project]/app/updates/UpdatesSplitClient.tsx",
                                                    lineNumber: 377,
                                                    columnNumber: 21
                                                }, this),
                                                tags.map((t)=>{
                                                    const on = norm(tag) === norm(t);
                                                    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                        type: "button",
                                                        className: "typePill",
                                                        "data-active": on ? "true" : "false",
                                                        onClick: ()=>{
                                                            setParam("tag", on ? null : t);
                                                            setFilterOpen(false);
                                                        },
                                                        children: t
                                                    }, t, false, {
                                                        fileName: "[project]/app/updates/UpdatesSplitClient.tsx",
                                                        lineNumber: 391,
                                                        columnNumber: 25
                                                    }, this);
                                                })
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/app/updates/UpdatesSplitClient.tsx",
                                            lineNumber: 376,
                                            columnNumber: 19
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/app/updates/UpdatesSplitClient.tsx",
                                    lineNumber: 349,
                                    columnNumber: 17
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/app/updates/UpdatesSplitClient.tsx",
                                lineNumber: 342,
                                columnNumber: 15
                            }, this) : null,
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "splitPageListBody",
                                children: list
                            }, void 0, false, {
                                fileName: "[project]/app/updates/UpdatesSplitClient.tsx",
                                lineNumber: 410,
                                columnNumber: 13
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/app/updates/UpdatesSplitClient.tsx",
                        lineNumber: 333,
                        columnNumber: 11
                    }, this)
                }, void 0, false, {
                    fileName: "[project]/app/updates/UpdatesSplitClient.tsx",
                    lineNumber: 332,
                    columnNumber: 9
                }, this),
                !isMobile ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("section", {
                    className: "pane paneRight",
                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "scroll",
                        children: !selectedDesktop ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "emptyRight",
                            children: "Select an update to view details."
                        }, void 0, false, {
                            fileName: "[project]/app/updates/UpdatesSplitClient.tsx",
                            lineNumber: 418,
                            columnNumber: 17
                        }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(UpdateDetail, {
                            update: selectedDesktop
                        }, void 0, false, {
                            fileName: "[project]/app/updates/UpdatesSplitClient.tsx",
                            lineNumber: 420,
                            columnNumber: 17
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/app/updates/UpdatesSplitClient.tsx",
                        lineNumber: 416,
                        columnNumber: 13
                    }, this)
                }, void 0, false, {
                    fileName: "[project]/app/updates/UpdatesSplitClient.tsx",
                    lineNumber: 415,
                    columnNumber: 11
                }, this) : null
            ]
        }, void 0, true, {
            fileName: "[project]/app/updates/UpdatesSplitClient.tsx",
            lineNumber: 331,
            columnNumber: 7
        }, this)
    }, void 0, false, {
        fileName: "[project]/app/updates/UpdatesSplitClient.tsx",
        lineNumber: 312,
        columnNumber: 5
    }, this);
}
_s(UpdatesSplitClient, "KOIEsUcLQUcMYuwX4yUSwVsRe/Q=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$components$2f$useSmoothWheel$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useSmoothWheel"],
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRouter"],
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useSearchParams"],
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["usePathname"],
        __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$hooks$2f$useBodyScrollLock$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useBodyScrollLock"]
    ];
});
_c1 = UpdatesSplitClient;
var _c, _c1;
__turbopack_context__.k.register(_c, "UpdateDetail");
__turbopack_context__.k.register(_c1, "UpdatesSplitClient");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
]);

//# sourceMappingURL=app_b7ccda7e._.js.map