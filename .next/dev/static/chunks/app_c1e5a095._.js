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
"[project]/app/components/MediaBlocks.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>MediaBlocks
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
"use client";
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
    _s();
    const [lightboxSrc, setLightboxSrc] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const tiltRaf = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(null);
    const normalized = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMemo"])({
        "MediaBlocks.useMemo[normalized]": ()=>Array.isArray(slices) ? slices : []
    }["MediaBlocks.useMemo[normalized]"], [
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
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "mediaBlocks",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
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
                    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("section", {
                        className: "mbSection mbHero",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: `showcaseHero ${style} motionReveal`,
                                "data-tilt": style === "glow" || style === "poster" ? "true" : "false",
                                onMouseMove: onTiltMove,
                                onMouseLeave: onTiltLeave,
                                children: embedHtml ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "embedWrap",
                                    // eslint-disable-next-line react/no-danger
                                    dangerouslySetInnerHTML: {
                                        __html: embedHtml
                                    }
                                }, void 0, false, {
                                    fileName: "[project]/app/components/MediaBlocks.tsx",
                                    lineNumber: 104,
                                    columnNumber: 19
                                }, this) : fileUrl ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "videoWrap",
                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("video", {
                                        controls: true,
                                        playsInline: true,
                                        preload: "metadata",
                                        poster: posterUrl ?? undefined,
                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("source", {
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
                                }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                    type: "button",
                                    className: "singleMedia",
                                    onClick: ()=>setLightboxSrc(imgUrl),
                                    "aria-label": "Open media",
                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("img", {
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
                            caption ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
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
                    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("section", {
                        className: "mbSection",
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: `galleryGrid motionReveal ${hoverStyle === "reveal" ? "hoverReveal" : "hoverZoom"}`,
                            children: imgs.map((im, j)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                    type: "button",
                                    className: "galleryItem",
                                    onClick: ()=>setLightboxSrc(im.url),
                                    "aria-label": im.caption ? `Open image: ${im.caption}` : "Open image",
                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("img", {
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
                    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("section", {
                        className: "mbSection motionReveal",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
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
                            caption ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
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
                    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("section", {
                        className: "mbSection motionReveal",
                        children: [
                            embedHtml ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
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
                            }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "videoWrap",
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("video", {
                                    controls: true,
                                    playsInline: true,
                                    preload: "metadata",
                                    poster: posterUrl ?? undefined,
                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("source", {
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
                            caption ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
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
                    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("section", {
                        className: "mbSection motionReveal",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                type: "button",
                                className: "singleMedia",
                                onClick: ()=>setLightboxSrc(gifUrl),
                                "aria-label": "Open GIF",
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("img", {
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
                            caption ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
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
                    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("section", {
                        className: "mbSection motionReveal",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                type: "button",
                                className: "singleMedia",
                                onClick: ()=>setLightboxSrc(imgUrl),
                                "aria-label": "Open image",
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("img", {
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
                            caption ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
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
                    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("section", {
                        className: "mbSection motionReveal",
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: `mediaRowGrid cols${cols}`,
                            children: cells.map((c, j)=>{
                                if (c.kind === "embed") {
                                    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: `mediaCell embedCell ${c.behavior === "parallax" ? "parallax" : ""}`,
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
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
                                            c.caption ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
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
                                    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: `mediaCell videoCell ${c.behavior === "parallax" ? "parallax" : ""}`,
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "videoWrap",
                                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("video", {
                                                    controls: true,
                                                    playsInline: true,
                                                    preload: "metadata",
                                                    poster: c.posterUrl ?? undefined,
                                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("source", {
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
                                            c.caption ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
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
                                return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: `mediaCell imageCell ${c.behavior === "tilt" ? "tilt" : ""} ${c.behavior === "parallax" ? "parallax" : ""}`,
                                    "data-tilt": c.behavior === "tilt" ? "true" : "false",
                                    onMouseMove: onTiltMove,
                                    onMouseLeave: onTiltLeave,
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                            type: "button",
                                            className: "singleMedia",
                                            onClick: ()=>setLightboxSrc(c.imgUrl),
                                            "aria-label": c.caption ? `Open image: ${c.caption}` : "Open image",
                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("img", {
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
                                        c.caption ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
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
                    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("section", {
                        className: "mbSection motionReveal",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
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
                            caption ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
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
                    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("section", {
                        className: `mbSection motionReveal showcaseText ${align}`,
                        children: [
                            kicker ? style === "marquee" ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "marquee",
                                "aria-label": kicker,
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "marqueeTrack",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                            children: kicker
                                        }, void 0, false, {
                                            fileName: "[project]/app/components/MediaBlocks.tsx",
                                            lineNumber: 392,
                                            columnNumber: 23
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                            "aria-hidden": "true",
                                            children: kicker
                                        }, void 0, false, {
                                            fileName: "[project]/app/components/MediaBlocks.tsx",
                                            lineNumber: 393,
                                            columnNumber: 23
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
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
                            }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "kicker",
                                children: kicker
                            }, void 0, false, {
                                fileName: "[project]/app/components/MediaBlocks.tsx",
                                lineNumber: 398,
                                columnNumber: 19
                            }, this) : null,
                            heading ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "mbHeading",
                                children: heading
                            }, void 0, false, {
                                fileName: "[project]/app/components/MediaBlocks.tsx",
                                lineNumber: 401,
                                columnNumber: 26
                            }, this) : null,
                            body ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
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
                    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("section", {
                        className: "mbSection motionReveal",
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "mbButtons",
                            children: links.map((l, j)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("a", {
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
            lightboxSrc ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "lightbox",
                role: "dialog",
                "aria-modal": "true",
                onClick: ()=>setLightboxSrc(null),
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
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
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "lightboxInner",
                        onClick: (e)=>e.stopPropagation(),
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("img", {
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
_s(MediaBlocks, "WToVcCfMtfCzz+8rjXdFQtbp9NI=");
_c = MediaBlocks;
var _c;
__turbopack_context__.k.register(_c, "MediaBlocks");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/app/HomeSplitClient.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>HomeSplitClient
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$components$2f$useSmoothWheel$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/app/components/useSmoothWheel.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$components$2f$MediaBlocks$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/app/components/MediaBlocks.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/navigation.js [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
"use client";
;
;
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
function endOfWeekSaturdayFromDate(d) {
    const start = startOfWeekSundayFromDate(d);
    const end = new Date(start);
    end.setDate(start.getDate() + 6);
    end.setHours(23, 59, 59, 999);
    return end;
}
function startOfWeekSundayFromDate(d) {
    const x = startOfDay(d);
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
const DAY_ABBR = [
    "Sun",
    "Mon",
    "Tue",
    "Wed",
    "Thu",
    "Fri",
    "Sat"
];
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
        const d = safeDateFromEvent(e);
        if (!d) continue;
        const hour = d.getHours();
        if (hour < 12) timeWindows.Morning++;
        else if (hour < 17) timeWindows.Afternoon++;
        else if (hour < 21) timeWindows.Evening++;
        else timeWindows.Late++;
        const dk = dayKey(d);
        if (!dayCounts.has(dk)) dayCounts.set(dk, {
            date: startOfDay(d),
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
    _s();
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$components$2f$useSmoothWheel$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useSmoothWheel"])(".scroll");
    const router = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRouter"])();
    const sp = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useSearchParams"])();
    const pathname = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["usePathname"])();
    const q = sp.get("q") || "";
    const type = sp.get("type") || "";
    const view = sp.get("view") || "list";
    const dayParam = sp.get("day");
    const listRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(null);
    const daySectionRefs = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])({});
    const [scrollDayKey, setScrollDayKey] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const leftStickyRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(null);
    const [didInitialScroll, setDidInitialScroll] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    // Staged intro animation (runs once per session): UI first, then list + right content.
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "HomeSplitClient.useEffect": ()=>{
            if ("TURBOPACK compile-time falsy", 0) //TURBOPACK unreachable
            ;
            const KEY = "wnl_intro_done_v1";
            if (window.sessionStorage?.getItem(KEY)) return;
            window.sessionStorage?.setItem(KEY, "1");
            document.body.classList.add("wnl-intro");
            // Assign indices for CSS-staggered animation.
            const listEl = listRef.current;
            if (listEl) {
                const items = listEl.querySelectorAll('button.eventRow, button.weeklyCondRow, button.weeklyOverview');
                items.forEach({
                    "HomeSplitClient.useEffect": (el, i)=>el.style.setProperty("--i", String(i))
                }["HomeSplitClient.useEffect"]);
            }
            const t = window.setTimeout({
                "HomeSplitClient.useEffect.t": ()=>{
                    document.body.classList.remove("wnl-intro");
                }
            }["HomeSplitClient.useEffect.t"], 1400);
            return ({
                "HomeSplitClient.useEffect": ()=>window.clearTimeout(t)
            })["HomeSplitClient.useEffect"];
        }
    }["HomeSplitClient.useEffect"], []);
    // default selection = weekly overview
    const selectedParam = sp.get("event");
    // URL drives selection, but on mobile we keep an optimistic client key so the
    // detail panel can update immediately on tap (before the router finishes).
    const [clientSelectedKey, setClientSelectedKey] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const selectedKey = clientSelectedKey ?? selectedParam ?? null;
    // Initialize from matchMedia so the first tap on mobile reliably opens detail.
    const [mounted, setMounted] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    // Hydration-safe: start false so SSR and first client render match.
    const [isMobile, setIsMobile] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    // Mobile-only filter overlay state (used to show/hide filter pills on small screens)
    const [filterOpen, setFilterOpen] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [mobileOverlayOffset, setMobileOverlayOffset] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(0);
    const effectiveIsMobile = mounted ? isMobile : false;
    const viewMode = view === "month" ? "month" : "list";
    const selectedDisplayKey = selectedKey ?? (!effectiveIsMobile && viewMode === "list" ? WEEKLY_KEY : null);
    const selectedDay = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMemo"])({
        "HomeSplitClient.useMemo[selectedDay]": ()=>{
            const parsed = dayParam ? parseDayKey(dayParam) : null;
            if (parsed) return parsed;
            const source = events.filter({
                "HomeSplitClient.useMemo[selectedDay].source": (e)=>{
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
                }
            }["HomeSplitClient.useMemo[selectedDay].source"]);
            return nearestDayWithEvents(source);
        }
    }["HomeSplitClient.useMemo[selectedDay]"], [
        dayParam,
        events,
        q,
        type
    ]);
    const selectedDayStr = dayKey(selectedDay);
    const monthAnchor = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMemo"])({
        "HomeSplitClient.useMemo[monthAnchor]": ()=>{
            const d = new Date(selectedDay);
            d.setDate(1);
            d.setHours(0, 0, 0, 0);
            return d;
        }
    }["HomeSplitClient.useMemo[monthAnchor]"], [
        selectedDayStr
    ]);
    // Mobile-only: hide the subhead tagline when the user starts scrolling the left list.
    const [taglineHidden, setTaglineHidden] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
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
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "HomeSplitClient.useEffect": ()=>{
            if (!effectiveIsMobile) {
                setMobileOverlayOffset(0);
                return;
            }
            const updateOffset = {
                "HomeSplitClient.useEffect.updateOffset": ()=>{
                    setMobileOverlayOffset(leftStickyRef.current?.offsetHeight ?? 0);
                }
            }["HomeSplitClient.useEffect.updateOffset"];
            updateOffset();
            window.addEventListener("resize", updateOffset);
            let ro = null;
            if (typeof ResizeObserver !== "undefined" && leftStickyRef.current) {
                ro = new ResizeObserver({
                    "HomeSplitClient.useEffect": ()=>updateOffset()
                }["HomeSplitClient.useEffect"]);
                ro.observe(leftStickyRef.current);
            }
            return ({
                "HomeSplitClient.useEffect": ()=>{
                    window.removeEventListener("resize", updateOffset);
                    ro?.disconnect();
                }
            })["HomeSplitClient.useEffect"];
        }
    }["HomeSplitClient.useEffect"], [
        effectiveIsMobile,
        q,
        type,
        viewMode,
        filterOpen
    ]);
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
    const dayEvents = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMemo"])({
        "HomeSplitClient.useMemo[dayEvents]": ()=>{
            const key = selectedDayStr;
            return filteredEvents.filter({
                "HomeSplitClient.useMemo[dayEvents]": (e)=>{
                    const d = safeDateFromEvent(e);
                    return d ? dayKey(d) === key : false;
                }
            }["HomeSplitClient.useMemo[dayEvents]"]);
        }
    }["HomeSplitClient.useMemo[dayEvents]"], [
        filteredEvents,
        selectedDayStr
    ]);
    const monthGrid = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMemo"])({
        "HomeSplitClient.useMemo[monthGrid]": ()=>{
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
                const ymd = dayKey(dt);
                const hasEvents = filteredEvents.some({
                    "HomeSplitClient.useMemo[monthGrid].hasEvents": (e)=>{
                        const ed = safeDateFromEvent(e);
                        return ed ? dayKey(ed) === ymd : false;
                    }
                }["HomeSplitClient.useMemo[monthGrid].hasEvents"]);
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
        }
    }["HomeSplitClient.useMemo[monthGrid]"], [
        monthAnchor,
        filteredEvents
    ]);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "HomeSplitClient.useEffect": ()=>{
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
        }
    }["HomeSplitClient.useEffect"], [
        effectiveIsMobile,
        viewMode,
        selectedDayStr,
        dayEvents,
        selectedDisplayKey
    ]);
    const currentWeekRange = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMemo"])({
        "HomeSplitClient.useMemo[currentWeekRange]": ()=>{
            const today = startOfToday();
            const start = startOfWeekSundayFromDate(today);
            const end = endOfWeekSaturdayFromDate(today);
            return {
                start,
                end
            };
        }
    }["HomeSplitClient.useMemo[currentWeekRange]"], []);
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
            const anchorIndex = groups.findIndex({
                "HomeSplitClient.useMemo[leftDayGroups].anchorIndex": (g)=>dayKey(g.date) === selectedDayStr
            }["HomeSplitClient.useMemo[leftDayGroups].anchorIndex"]);
            if (anchorIndex <= 0) return groups;
            return [
                ...groups.slice(anchorIndex),
                ...groups.slice(0, anchorIndex)
            ];
        }
    }["HomeSplitClient.useMemo[leftDayGroups]"], [
        filteredEvents,
        selectedDayStr
    ]);
    const currentWeekDayGroups = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMemo"])({
        "HomeSplitClient.useMemo[currentWeekDayGroups]": ()=>{
            const start = currentWeekRange.start;
            const end = currentWeekRange.end;
            return leftDayGroups.filter({
                "HomeSplitClient.useMemo[currentWeekDayGroups]": (group)=>group.date.getTime() >= start.getTime() && group.date.getTime() <= end.getTime()
            }["HomeSplitClient.useMemo[currentWeekDayGroups]"]);
        }
    }["HomeSplitClient.useMemo[currentWeekDayGroups]"], [
        currentWeekRange,
        leftDayGroups
    ]);
    const dayJumpDates = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMemo"])({
        "HomeSplitClient.useMemo[dayJumpDates]": ()=>{
            const map = new Map();
            for (const group of currentWeekDayGroups){
                const idx = group.date.getDay();
                if (!map.has(idx)) map.set(idx, group.date);
            }
            return DAY_ABBR.map({
                "HomeSplitClient.useMemo[dayJumpDates]": (label, idx)=>({
                        label,
                        index: idx,
                        date: map.get(idx) ?? null
                    })
            }["HomeSplitClient.useMemo[dayJumpDates]"]);
        }
    }["HomeSplitClient.useMemo[dayJumpDates]"], [
        currentWeekDayGroups
    ]);
    function getListScrollOffset() {
        const stickyH = leftStickyRef.current?.offsetHeight ?? 0;
        return Math.max(stickyH + 10, 24);
    }
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "HomeSplitClient.useEffect": ()=>{
            const root = listRef.current;
            if (!root || didInitialScroll || viewMode !== "list" || !leftDayGroups.length) return;
            root.scrollTop = 0;
            setScrollDayKey(selectedDayStr);
            setDidInitialScroll(true);
        }
    }["HomeSplitClient.useEffect"], [
        didInitialScroll,
        leftDayGroups,
        selectedDayStr,
        viewMode
    ]);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "HomeSplitClient.useEffect": ()=>{
            if (dayParam) setDidInitialScroll(true);
        }
    }["HomeSplitClient.useEffect"], [
        dayParam
    ]);
    function syncVisibleDayFromScroll(scrollTop) {
        const root = listRef.current;
        if (!root) return;
        const threshold = scrollTop + getListScrollOffset() + 16;
        let active = currentWeekDayGroups[0]?.date ? dayKey(currentWeekDayGroups[0].date) : null;
        for (const group of currentWeekDayGroups){
            const key = dayKey(group.date);
            const el = daySectionRefs.current[key];
            if (!el) continue;
            if (el.offsetTop <= threshold) active = key;
            else break;
        }
        if (active && active !== scrollDayKey) setScrollDayKey(active);
    }
    function jumpToDay(target) {
        const key = dayKey(target);
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
    const weekBuckets = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMemo"])({
        "HomeSplitClient.useMemo[weekBuckets]": ()=>{
            const currentStart = currentWeekRange.start;
            const currentEnd = currentWeekRange.end;
            const nextWeekStart = addDays(startOfWeekSundayFromDate(currentStart), 7);
            return Array.from({
                length: 5
            }, {
                "HomeSplitClient.useMemo[weekBuckets]": (_, index)=>{
                    const start = index === 0 ? currentStart : addDays(nextWeekStart, (index - 1) * 7);
                    const end = index === 0 ? currentEnd : endOfWeekFromStart(start);
                    const eventsInRange = filteredEvents.map({
                        "HomeSplitClient.useMemo[weekBuckets].eventsInRange": (e)=>({
                                e,
                                d: safeDateFromEvent(e)
                            })
                    }["HomeSplitClient.useMemo[weekBuckets].eventsInRange"]).filter({
                        "HomeSplitClient.useMemo[weekBuckets].eventsInRange": ({ d })=>d && d.getTime() >= start.getTime() && d.getTime() <= end.getTime()
                    }["HomeSplitClient.useMemo[weekBuckets].eventsInRange"]).sort({
                        "HomeSplitClient.useMemo[weekBuckets].eventsInRange": (a, b)=>a.d.getTime() - b.d.getTime()
                    }["HomeSplitClient.useMemo[weekBuckets].eventsInRange"]).map({
                        "HomeSplitClient.useMemo[weekBuckets].eventsInRange": ({ e })=>e
                    }["HomeSplitClient.useMemo[weekBuckets].eventsInRange"]);
                    const groupsMap = new Map();
                    for (const e of eventsInRange){
                        const d = safeDateFromEvent(e);
                        if (!d) continue;
                        const dk = dayKey(d);
                        if (!groupsMap.has(dk)) groupsMap.set(dk, {
                            date: startOfDay(d),
                            items: []
                        });
                        groupsMap.get(dk).items.push(e);
                    }
                    const groups = Array.from(groupsMap.values()).sort({
                        "HomeSplitClient.useMemo[weekBuckets].groups": (a, b)=>a.date.getTime() - b.date.getTime()
                    }["HomeSplitClient.useMemo[weekBuckets].groups"]);
                    for (const group of groups){
                        group.items.sort({
                            "HomeSplitClient.useMemo[weekBuckets]": (a, b)=>(safeDateFromEvent(a)?.getTime() ?? 0) - (safeDateFromEvent(b)?.getTime() ?? 0)
                        }["HomeSplitClient.useMemo[weekBuckets]"]);
                    }
                    const { buckets, busiestDayLabel, peakWindowLabel } = buildWeekInsights(eventsInRange);
                    return {
                        key: `__week__:${dayKey(start)}`,
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
                }
            }["HomeSplitClient.useMemo[weekBuckets]"]);
        }
    }["HomeSplitClient.useMemo[weekBuckets]"], [
        filteredEvents,
        currentWeekRange
    ]);
    const defaultWeekBucket = weekBuckets[0] ?? null;
    const selectedWeekBucket = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMemo"])({
        "HomeSplitClient.useMemo[selectedWeekBucket]": ()=>{
            if (selectedDisplayKey === WEEKLY_KEY) return defaultWeekBucket;
            if (!selectedDisplayKey?.startsWith("__week__:")) return null;
            return weekBuckets.find({
                "HomeSplitClient.useMemo[selectedWeekBucket]": (bucket)=>bucket.key === selectedDisplayKey
            }["HomeSplitClient.useMemo[selectedWeekBucket]"]) ?? defaultWeekBucket;
        }
    }["HomeSplitClient.useMemo[selectedWeekBucket]"], [
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
    const selectedEvent = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMemo"])({
        "HomeSplitClient.useMemo[selectedEvent]": ()=>{
            if (!filteredEvents.length) return null;
            if (selectedDisplayKey === WEEKLY_KEY) return null;
            const byUid = selectedDisplayKey && filteredEvents.find({
                "HomeSplitClient.useMemo[selectedEvent]": (e)=>e.uid && e.uid === selectedDisplayKey
            }["HomeSplitClient.useMemo[selectedEvent]"]);
            const byId = selectedDisplayKey && filteredEvents.find({
                "HomeSplitClient.useMemo[selectedEvent]": (e)=>e.id === selectedDisplayKey
            }["HomeSplitClient.useMemo[selectedEvent]"]);
            return byUid || byId || null;
        }
    }["HomeSplitClient.useMemo[selectedEvent]"], [
        filteredEvents,
        selectedDisplayKey
    ]);
    const currentDisplayDayKey = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMemo"])({
        "HomeSplitClient.useMemo[currentDisplayDayKey]": ()=>{
            if (selectedEvent) {
                const d = safeDateFromEvent(selectedEvent);
                if (d) return dayKey(d);
            }
            return scrollDayKey ?? selectedDayStr;
        }
    }["HomeSplitClient.useMemo[currentDisplayDayKey]"], [
        scrollDayKey,
        selectedDayStr,
        selectedEvent
    ]);
    const detailFlashKey = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMemo"])({
        "HomeSplitClient.useMemo[detailFlashKey]": ()=>{
            if (!selectedEvent) return "none";
            return `${selectedEvent.uid ?? selectedEvent.id ?? "event"}|${selectedDisplayKey}|${viewMode}|${q}|${type}`;
        }
    }["HomeSplitClient.useMemo[detailFlashKey]"], [
        selectedEvent,
        selectedDisplayKey,
        viewMode,
        q,
        type
    ]);
    // stagger counter for left list
    let listAnimIndex = 0;
    // Close filter overlay when leaving mobile.
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "HomeSplitClient.useEffect": ()=>{
            if (!effectiveIsMobile) setFilterOpen(false);
        }
    }["HomeSplitClient.useEffect"], [
        effectiveIsMobile
    ]);
    // On mobile, ensure route switches (Calendar/Directory/Updates) never carry a stuck detail overlay.
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "HomeSplitClient.useEffect": ()=>{
            if (!effectiveIsMobile) return;
            setClientSelectedKey(null);
            if (sp.get("event")) setParam("event", null);
        // eslint-disable-next-line react-hooks/exhaustive-deps
        }
    }["HomeSplitClient.useEffect"], [
        pathname
    ]);
    // Ensure tagline is visible again when leaving mobile.
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "HomeSplitClient.useEffect": ()=>{
            if (!effectiveIsMobile) setTaglineHidden(false);
        }
    }["HomeSplitClient.useEffect"], [
        effectiveIsMobile
    ]);
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
    const mobileDetailOpen = effectiveIsMobile && !!selectedEvent;
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
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "pageShell",
        style: effectiveIsMobile ? {
            ["--mobileOverlayOffset"]: `${mobileOverlayOffset}px`
        } : undefined,
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: `tagline ${taglineHidden ? "taglineHidden" : ""}`,
                children: "A calendar of events, specials, and pop-ups in Lancaster, PA."
            }, void 0, false, {
                fileName: "[project]/app/HomeSplitClient.tsx",
                lineNumber: 774,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "split",
                children: [
                    ("TURBOPACK compile-time truthy", 1) ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("aside", {
                        className: "pane paneLeft",
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "scroll",
                            ref: listRef,
                            onScroll: (e)=>{
                                const st = e.currentTarget.scrollTop;
                                if (effectiveIsMobile) setTaglineHidden(st > 2);
                                syncVisibleDayFromScroll(st);
                            },
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "leftSticky",
                                    ref: leftStickyRef,
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
                                                    lineNumber: 792,
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
                                                    lineNumber: 800,
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
                                                    lineNumber: 808,
                                                    columnNumber: 19
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/app/HomeSplitClient.tsx",
                                            lineNumber: 791,
                                            columnNumber: 17
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "leftControls",
                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "calendarToolbar",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        className: "dayJumpRail",
                                                        "aria-label": "Jump to day",
                                                        children: dayJumpDates.map((entry)=>{
                                                            const isActive = currentDisplayDayKey ? entry.date ? dayKey(entry.date) === currentDisplayDayKey : entry.index === parseDayKey(currentDisplayDayKey)?.getDay() : false;
                                                            return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                                type: "button",
                                                                className: "dayJumpBtn",
                                                                "data-active": isActive ? "true" : "false",
                                                                disabled: !entry.date,
                                                                onClick: ()=>entry.date && jumpToDay(entry.date),
                                                                "aria-label": entry.date ? `Jump to ${entry.label}` : `${entry.label} has no events`,
                                                                children: entry.label.slice(0, 1)
                                                            }, entry.label, false, {
                                                                fileName: "[project]/app/HomeSplitClient.tsx",
                                                                lineNumber: 829,
                                                                columnNumber: 27
                                                            }, this);
                                                        })
                                                    }, void 0, false, {
                                                        fileName: "[project]/app/HomeSplitClient.tsx",
                                                        lineNumber: 820,
                                                        columnNumber: 21
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        className: `searchRow calendarSearchRow${effectiveIsMobile ? " calendarSearchRowMobile" : ""}`,
                                                        children: [
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                                                className: "searchInput",
                                                                placeholder: "Search events…",
                                                                value: q,
                                                                onChange: (e)=>setParam("q", e.target.value),
                                                                "aria-label": "Search events"
                                                            }, void 0, false, {
                                                                fileName: "[project]/app/HomeSplitClient.tsx",
                                                                lineNumber: 845,
                                                                columnNumber: 23
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                                type: "button",
                                                                className: "viewBtn",
                                                                "aria-label": viewMode === "month" ? "Switch to list view" : "Switch to calendar view",
                                                                onClick: ()=>{
                                                                    clearSelected();
                                                                    setFilterOpen(false);
                                                                    setParam("view", viewMode === "month" ? "list" : "month");
                                                                },
                                                                children: viewMode === "month" ? effectiveIsMobile ? "List" : "List view" : effectiveIsMobile ? "Cal" : "Calendar view"
                                                            }, void 0, false, {
                                                                fileName: "[project]/app/HomeSplitClient.tsx",
                                                                lineNumber: 852,
                                                                columnNumber: 23
                                                            }, this),
                                                            effectiveIsMobile ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                                type: "button",
                                                                className: "filterBtn",
                                                                "aria-label": filterOpen ? "Close filters" : "Open filters",
                                                                "aria-expanded": filterOpen ? "true" : "false",
                                                                "data-active": filterOpen || !!type ? "true" : "false",
                                                                onClick: ()=>setFilterOpen((v)=>!v),
                                                                children: type ? `Filter: ${type}` : "Filter"
                                                            }, void 0, false, {
                                                                fileName: "[project]/app/HomeSplitClient.tsx",
                                                                lineNumber: 865,
                                                                columnNumber: 25
                                                            }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                                type: "button",
                                                                className: "filterBtn filterBtnSquare",
                                                                "aria-label": filterOpen ? "Close filters" : "Open filters",
                                                                "aria-expanded": filterOpen ? "true" : "false",
                                                                "data-active": filterOpen || !!type ? "true" : "false",
                                                                onClick: ()=>setFilterOpen((v)=>!v),
                                                                children: type ? "F*" : "F"
                                                            }, void 0, false, {
                                                                fileName: "[project]/app/HomeSplitClient.tsx",
                                                                lineNumber: 876,
                                                                columnNumber: 25
                                                            }, this),
                                                            !effectiveIsMobile && (q || type) ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                                className: "clearBtn",
                                                                onClick: ()=>{
                                                                    setParam("q", null);
                                                                    setParam("type", null);
                                                                },
                                                                type: "button",
                                                                children: "Clear"
                                                            }, void 0, false, {
                                                                fileName: "[project]/app/HomeSplitClient.tsx",
                                                                lineNumber: 888,
                                                                columnNumber: 25
                                                            }, this) : null
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/app/HomeSplitClient.tsx",
                                                        lineNumber: 844,
                                                        columnNumber: 21
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/app/HomeSplitClient.tsx",
                                                lineNumber: 819,
                                                columnNumber: 19
                                            }, this)
                                        }, void 0, false, {
                                            fileName: "[project]/app/HomeSplitClient.tsx",
                                            lineNumber: 818,
                                            columnNumber: 17
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/app/HomeSplitClient.tsx",
                                    lineNumber: 790,
                                    columnNumber: 15
                                }, this),
                                !effectiveIsMobile ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "filterDropdown",
                                    "data-open": filterOpen ? "true" : "false",
                                    "aria-hidden": filterOpen ? "false" : "true",
                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "filterDropdownInner",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "typePills",
                                                role: "group",
                                                "aria-label": "Event type filters",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
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
                                                        lineNumber: 913,
                                                        columnNumber: 23
                                                    }, this),
                                                    eventTypes.map((t)=>{
                                                        const on = norm(type) === norm(t);
                                                        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
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
                                                            lineNumber: 927,
                                                            columnNumber: 27
                                                        }, this);
                                                    })
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/app/HomeSplitClient.tsx",
                                                lineNumber: 912,
                                                columnNumber: 21
                                            }, this),
                                            q || type ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
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
                                                lineNumber: 943,
                                                columnNumber: 23
                                            }, this) : null
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/app/HomeSplitClient.tsx",
                                        lineNumber: 911,
                                        columnNumber: 19
                                    }, this)
                                }, void 0, false, {
                                    fileName: "[project]/app/HomeSplitClient.tsx",
                                    lineNumber: 906,
                                    columnNumber: 17
                                }, this) : null,
                                effectiveIsMobile && filterOpen ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
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
                                                        fileName: "[project]/app/HomeSplitClient.tsx",
                                                        lineNumber: 970,
                                                        columnNumber: 23
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                        type: "button",
                                                        className: "filterOverlayClose",
                                                        onClick: ()=>setFilterOpen(false),
                                                        "aria-label": "Close filters",
                                                        children: "✕"
                                                    }, void 0, false, {
                                                        fileName: "[project]/app/HomeSplitClient.tsx",
                                                        lineNumber: 971,
                                                        columnNumber: 23
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/app/HomeSplitClient.tsx",
                                                lineNumber: 969,
                                                columnNumber: 21
                                            }, this),
                                            q || type ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
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
                                                lineNumber: 982,
                                                columnNumber: 23
                                            }, this) : null,
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "typePills",
                                                role: "group",
                                                "aria-label": "Event type filters",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
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
                                                        lineNumber: 996,
                                                        columnNumber: 23
                                                    }, this),
                                                    eventTypes.map((t)=>{
                                                        const on = norm(type) === norm(t);
                                                        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
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
                                                            lineNumber: 1010,
                                                            columnNumber: 27
                                                        }, this);
                                                    })
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/app/HomeSplitClient.tsx",
                                                lineNumber: 995,
                                                columnNumber: 21
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/app/HomeSplitClient.tsx",
                                        lineNumber: 968,
                                        columnNumber: 19
                                    }, this)
                                }, void 0, false, {
                                    fileName: "[project]/app/HomeSplitClient.tsx",
                                    lineNumber: 961,
                                    columnNumber: 17
                                }, this) : null,
                                viewMode === "list" ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Fragment"], {
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                            type: "button",
                                            className: "weeklyOverview fadeInItem",
                                            style: {
                                                animationDelay: `${listAnimIndex++ * 35}ms`
                                            },
                                            "data-active": selectedDisplayKey === WEEKLY_KEY ? "true" : "false",
                                            onClick: ()=>openWeek(WEEKLY_KEY),
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "weeklyTitle",
                                                    children: "Weekly Overview"
                                                }, void 0, false, {
                                                    fileName: "[project]/app/HomeSplitClient.tsx",
                                                    lineNumber: 1039,
                                                    columnNumber: 17
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "weeklyCount",
                                                    children: [
                                                        defaultWeekBucket?.events.length ?? 0,
                                                        " event",
                                                        (defaultWeekBucket?.events.length ?? 0) === 1 ? "" : "s",
                                                        " left this week"
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/app/HomeSplitClient.tsx",
                                                    lineNumber: 1040,
                                                    columnNumber: 17
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/app/HomeSplitClient.tsx",
                                            lineNumber: 1032,
                                            columnNumber: 15
                                        }, this),
                                        effectiveIsMobile && (selectedWeekBucket ?? defaultWeekBucket) ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "weeklyMobilePanel fadeInItem",
                                            style: {
                                                animationDelay: "320ms"
                                            },
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "weekSummaryMini",
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                            className: "weekSummaryMiniTitle",
                                                            children: [
                                                                "Week of ",
                                                                (selectedWeekBucket ?? defaultWeekBucket)?.rangeLabel
                                                            ]
                                                        }, void 0, true, {
                                                            fileName: "[project]/app/HomeSplitClient.tsx",
                                                            lineNumber: 1050,
                                                            columnNumber: 21
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                            className: "weekSummaryMiniGrid",
                                                            role: "list",
                                                            children: [
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                    className: "weekSummaryMiniCard",
                                                                    role: "listitem",
                                                                    children: [
                                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                            className: "weekSummaryMiniKicker",
                                                                            children: "Total"
                                                                        }, void 0, false, {
                                                                            fileName: "[project]/app/HomeSplitClient.tsx",
                                                                            lineNumber: 1053,
                                                                            columnNumber: 25
                                                                        }, this),
                                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                            className: "weekSummaryMiniValue",
                                                                            children: (selectedWeekBucket ?? defaultWeekBucket)?.events.length ?? 0
                                                                        }, void 0, false, {
                                                                            fileName: "[project]/app/HomeSplitClient.tsx",
                                                                            lineNumber: 1054,
                                                                            columnNumber: 25
                                                                        }, this)
                                                                    ]
                                                                }, void 0, true, {
                                                                    fileName: "[project]/app/HomeSplitClient.tsx",
                                                                    lineNumber: 1052,
                                                                    columnNumber: 23
                                                                }, this),
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                    className: "weekSummaryMiniCard",
                                                                    role: "listitem",
                                                                    children: [
                                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                            className: "weekSummaryMiniKicker",
                                                                            children: "Live"
                                                                        }, void 0, false, {
                                                                            fileName: "[project]/app/HomeSplitClient.tsx",
                                                                            lineNumber: 1057,
                                                                            columnNumber: 25
                                                                        }, this),
                                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                            className: "weekSummaryMiniValue",
                                                                            children: weekInsights["Live music"]
                                                                        }, void 0, false, {
                                                                            fileName: "[project]/app/HomeSplitClient.tsx",
                                                                            lineNumber: 1058,
                                                                            columnNumber: 25
                                                                        }, this)
                                                                    ]
                                                                }, void 0, true, {
                                                                    fileName: "[project]/app/HomeSplitClient.tsx",
                                                                    lineNumber: 1056,
                                                                    columnNumber: 23
                                                                }, this),
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                    className: "weekSummaryMiniCard",
                                                                    role: "listitem",
                                                                    children: [
                                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                            className: "weekSummaryMiniKicker",
                                                                            children: "Food"
                                                                        }, void 0, false, {
                                                                            fileName: "[project]/app/HomeSplitClient.tsx",
                                                                            lineNumber: 1061,
                                                                            columnNumber: 25
                                                                        }, this),
                                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                            className: "weekSummaryMiniValue",
                                                                            children: weekInsights["Food & drink"]
                                                                        }, void 0, false, {
                                                                            fileName: "[project]/app/HomeSplitClient.tsx",
                                                                            lineNumber: 1062,
                                                                            columnNumber: 25
                                                                        }, this)
                                                                    ]
                                                                }, void 0, true, {
                                                                    fileName: "[project]/app/HomeSplitClient.tsx",
                                                                    lineNumber: 1060,
                                                                    columnNumber: 23
                                                                }, this)
                                                            ]
                                                        }, void 0, true, {
                                                            fileName: "[project]/app/HomeSplitClient.tsx",
                                                            lineNumber: 1051,
                                                            columnNumber: 21
                                                        }, this)
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/app/HomeSplitClient.tsx",
                                                    lineNumber: 1049,
                                                    columnNumber: 19
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "weeklyCondensed",
                                                    "aria-label": "Weekly overview (condensed)",
                                                    children: weekGroups.map((g)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                            children: [
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                    className: "weeklyCondensedDayTitle",
                                                                    children: formatDayHeading(g.date)
                                                                }, void 0, false, {
                                                                    fileName: "[project]/app/HomeSplitClient.tsx",
                                                                    lineNumber: 1070,
                                                                    columnNumber: 25
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
                                                                        onClick: ()=>openSelected(e.uid ?? e.id),
                                                                        children: [
                                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                                className: "weeklyCondTop",
                                                                                children: [
                                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                                        className: "weeklyCondTime",
                                                                                        children: timeLabel
                                                                                    }, void 0, false, {
                                                                                        fileName: "[project]/app/HomeSplitClient.tsx",
                                                                                        lineNumber: 1089,
                                                                                        columnNumber: 33
                                                                                    }, this),
                                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                                        className: "weeklyCondTitle",
                                                                                        children: title
                                                                                    }, void 0, false, {
                                                                                        fileName: "[project]/app/HomeSplitClient.tsx",
                                                                                        lineNumber: 1090,
                                                                                        columnNumber: 33
                                                                                    }, this)
                                                                                ]
                                                                            }, void 0, true, {
                                                                                fileName: "[project]/app/HomeSplitClient.tsx",
                                                                                lineNumber: 1088,
                                                                                columnNumber: 31
                                                                            }, this),
                                                                            venueBits ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                                className: "weeklyCondMeta",
                                                                                children: venueBits
                                                                            }, void 0, false, {
                                                                                fileName: "[project]/app/HomeSplitClient.tsx",
                                                                                lineNumber: 1093,
                                                                                columnNumber: 33
                                                                            }, this) : null
                                                                        ]
                                                                    }, e.id, true, {
                                                                        fileName: "[project]/app/HomeSplitClient.tsx",
                                                                        lineNumber: 1082,
                                                                        columnNumber: 29
                                                                    }, this);
                                                                })
                                                            ]
                                                        }, dayKey(g.date), true, {
                                                            fileName: "[project]/app/HomeSplitClient.tsx",
                                                            lineNumber: 1069,
                                                            columnNumber: 23
                                                        }, this))
                                                }, void 0, false, {
                                                    fileName: "[project]/app/HomeSplitClient.tsx",
                                                    lineNumber: 1067,
                                                    columnNumber: 19
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/app/HomeSplitClient.tsx",
                                            lineNumber: 1048,
                                            columnNumber: 17
                                        }, this) : null,
                                        leftDayGroups.length === 0 ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "emptyList",
                                            children: "No events match your search."
                                        }, void 0, false, {
                                            fileName: "[project]/app/HomeSplitClient.tsx",
                                            lineNumber: 1105,
                                            columnNumber: 17
                                        }, this) : null,
                                        leftDayGroups.map((g)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("section", {
                                                className: "dayBlock",
                                                ref: (el)=>{
                                                    daySectionRefs.current[dayKey(g.date)] = el;
                                                },
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        className: "dayTitle",
                                                        children: formatDayHeading(g.date)
                                                    }, void 0, false, {
                                                        fileName: "[project]/app/HomeSplitClient.tsx",
                                                        lineNumber: 1111,
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
                                                                    lineNumber: 1136,
                                                                    columnNumber: 25
                                                                }, this),
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                    className: "eventRowMeta",
                                                                    children: [
                                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                            children: timeLabel
                                                                        }, void 0, false, {
                                                                            fileName: "[project]/app/HomeSplitClient.tsx",
                                                                            lineNumber: 1138,
                                                                            columnNumber: 27
                                                                        }, this),
                                                                        e.event_type ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                            className: "dot",
                                                                            children: "•"
                                                                        }, void 0, false, {
                                                                            fileName: "[project]/app/HomeSplitClient.tsx",
                                                                            lineNumber: 1139,
                                                                            columnNumber: 43
                                                                        }, this) : null,
                                                                        e.event_type ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                            children: e.event_type
                                                                        }, void 0, false, {
                                                                            fileName: "[project]/app/HomeSplitClient.tsx",
                                                                            lineNumber: 1140,
                                                                            columnNumber: 43
                                                                        }, this) : null
                                                                    ]
                                                                }, void 0, true, {
                                                                    fileName: "[project]/app/HomeSplitClient.tsx",
                                                                    lineNumber: 1137,
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
                                                                        lineNumber: 1148,
                                                                        columnNumber: 29
                                                                    }, this);
                                                                })()
                                                            ]
                                                        }, e.id, true, {
                                                            fileName: "[project]/app/HomeSplitClient.tsx",
                                                            lineNumber: 1123,
                                                            columnNumber: 23
                                                        }, this);
                                                    })
                                                ]
                                            }, dayKey(g.date), true, {
                                                fileName: "[project]/app/HomeSplitClient.tsx",
                                                lineNumber: 1110,
                                                columnNumber: 17
                                            }, this))
                                    ]
                                }, void 0, true) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Fragment"], {
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "monthWrap",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "monthHeader",
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
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
                                                                    day: dayKey(d),
                                                                    event: null
                                                                });
                                                            },
                                                            children: "‹"
                                                        }, void 0, false, {
                                                            fileName: "[project]/app/HomeSplitClient.tsx",
                                                            lineNumber: 1164,
                                                            columnNumber: 23
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                            className: "monthTitle",
                                                            children: formatMonthYear(monthGrid.first)
                                                        }, void 0, false, {
                                                            fileName: "[project]/app/HomeSplitClient.tsx",
                                                            lineNumber: 1179,
                                                            columnNumber: 23
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                            type: "button",
                                                            className: "monthNavBtn",
                                                            "aria-label": "Next month",
                                                            onClick: ()=>{
                                                                const next = addMonths(monthAnchor, 1);
                                                                const d = new Date(next);
                                                                d.setDate(1);
                                                                setClientSelectedKey(null);
                                                                setParams({
                                                                    day: dayKey(d),
                                                                    event: null
                                                                });
                                                            },
                                                            children: "›"
                                                        }, void 0, false, {
                                                            fileName: "[project]/app/HomeSplitClient.tsx",
                                                            lineNumber: 1180,
                                                            columnNumber: 23
                                                        }, this)
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/app/HomeSplitClient.tsx",
                                                    lineNumber: 1163,
                                                    columnNumber: 21
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "weekdayRow",
                                                    "aria-hidden": "true",
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                            children: "Sun"
                                                        }, void 0, false, {
                                                            fileName: "[project]/app/HomeSplitClient.tsx",
                                                            lineNumber: 1197,
                                                            columnNumber: 23
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                            children: "Mon"
                                                        }, void 0, false, {
                                                            fileName: "[project]/app/HomeSplitClient.tsx",
                                                            lineNumber: 1197,
                                                            columnNumber: 39
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                            children: "Tue"
                                                        }, void 0, false, {
                                                            fileName: "[project]/app/HomeSplitClient.tsx",
                                                            lineNumber: 1197,
                                                            columnNumber: 55
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                            children: "Wed"
                                                        }, void 0, false, {
                                                            fileName: "[project]/app/HomeSplitClient.tsx",
                                                            lineNumber: 1197,
                                                            columnNumber: 71
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                            children: "Thu"
                                                        }, void 0, false, {
                                                            fileName: "[project]/app/HomeSplitClient.tsx",
                                                            lineNumber: 1197,
                                                            columnNumber: 87
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                            children: "Fri"
                                                        }, void 0, false, {
                                                            fileName: "[project]/app/HomeSplitClient.tsx",
                                                            lineNumber: 1197,
                                                            columnNumber: 103
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                            children: "Sat"
                                                        }, void 0, false, {
                                                            fileName: "[project]/app/HomeSplitClient.tsx",
                                                            lineNumber: 1197,
                                                            columnNumber: 119
                                                        }, this)
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/app/HomeSplitClient.tsx",
                                                    lineNumber: 1196,
                                                    columnNumber: 21
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "monthGrid",
                                                    role: "grid",
                                                    "aria-label": "Calendar month view",
                                                    children: monthGrid.cells.map((c, i)=>{
                                                        if (!c.ymd) return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                            className: "monthCell empty"
                                                        }, `e-${i}`, false, {
                                                            fileName: "[project]/app/HomeSplitClient.tsx",
                                                            lineNumber: 1202,
                                                            columnNumber: 44
                                                        }, this);
                                                        const dayNum = Number(c.ymd.split("-")[2]);
                                                        const active = c.ymd === selectedDayStr;
                                                        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
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
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                    className: "monthDayNum",
                                                                    children: dayNum
                                                                }, void 0, false, {
                                                                    fileName: "[project]/app/HomeSplitClient.tsx",
                                                                    lineNumber: 1218,
                                                                    columnNumber: 29
                                                                }, this),
                                                                c.hasEvents ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                    className: "monthDot",
                                                                    "aria-hidden": "true"
                                                                }, void 0, false, {
                                                                    fileName: "[project]/app/HomeSplitClient.tsx",
                                                                    lineNumber: 1219,
                                                                    columnNumber: 44
                                                                }, this) : null
                                                            ]
                                                        }, c.ymd, true, {
                                                            fileName: "[project]/app/HomeSplitClient.tsx",
                                                            lineNumber: 1206,
                                                            columnNumber: 27
                                                        }, this);
                                                    })
                                                }, void 0, false, {
                                                    fileName: "[project]/app/HomeSplitClient.tsx",
                                                    lineNumber: 1200,
                                                    columnNumber: 21
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/app/HomeSplitClient.tsx",
                                            lineNumber: 1162,
                                            columnNumber: 19
                                        }, this),
                                        effectiveIsMobile ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "dayEventsMobile",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "dayEventsHeader",
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                            className: "dayEventsTitle",
                                                            children: formatDayHeading(selectedDay)
                                                        }, void 0, false, {
                                                            fileName: "[project]/app/HomeSplitClient.tsx",
                                                            lineNumber: 1229,
                                                            columnNumber: 25
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                            className: "dayEventsCount",
                                                            children: [
                                                                dayEvents.length,
                                                                " event",
                                                                dayEvents.length === 1 ? "" : "s"
                                                            ]
                                                        }, void 0, true, {
                                                            fileName: "[project]/app/HomeSplitClient.tsx",
                                                            lineNumber: 1230,
                                                            columnNumber: 25
                                                        }, this)
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/app/HomeSplitClient.tsx",
                                                    lineNumber: 1228,
                                                    columnNumber: 23
                                                }, this),
                                                dayEvents.length === 0 ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "emptyList",
                                                    children: "No events on this day."
                                                }, void 0, false, {
                                                    fileName: "[project]/app/HomeSplitClient.tsx",
                                                    lineNumber: 1236,
                                                    columnNumber: 25
                                                }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "dayEventsList",
                                                    children: dayEvents.map((e)=>{
                                                        const key = e.uid ?? e.id;
                                                        const title = e.title || "Untitled event";
                                                        const d = safeDateFromEvent(e);
                                                        const timeLabel = d ? formatTimeShort(d) : "Time TBD";
                                                        const venueBits = [
                                                            e.locationName,
                                                            e.event_type
                                                        ].filter(Boolean).join(" • ");
                                                        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                            type: "button",
                                                            className: "eventCard",
                                                            onClick: ()=>{
                                                                setClientSelectedKey(key);
                                                                setParam("event", key);
                                                            },
                                                            children: [
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                    className: "eventCardTitle",
                                                                    children: title
                                                                }, void 0, false, {
                                                                    fileName: "[project]/app/HomeSplitClient.tsx",
                                                                    lineNumber: 1255,
                                                                    columnNumber: 33
                                                                }, this),
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                    className: "eventMeta",
                                                                    children: [
                                                                        timeLabel,
                                                                        venueBits ? ` • ${venueBits}` : ""
                                                                    ]
                                                                }, void 0, true, {
                                                                    fileName: "[project]/app/HomeSplitClient.tsx",
                                                                    lineNumber: 1256,
                                                                    columnNumber: 33
                                                                }, this)
                                                            ]
                                                        }, key, true, {
                                                            fileName: "[project]/app/HomeSplitClient.tsx",
                                                            lineNumber: 1246,
                                                            columnNumber: 31
                                                        }, this);
                                                    })
                                                }, void 0, false, {
                                                    fileName: "[project]/app/HomeSplitClient.tsx",
                                                    lineNumber: 1238,
                                                    columnNumber: 25
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/app/HomeSplitClient.tsx",
                                            lineNumber: 1227,
                                            columnNumber: 21
                                        }, this) : null
                                    ]
                                }, void 0, true)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/app/HomeSplitClient.tsx",
                            lineNumber: 781,
                            columnNumber: 13
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/app/HomeSplitClient.tsx",
                        lineNumber: 780,
                        columnNumber: 11
                    }, this) : "TURBOPACK unreachable",
                    showRight ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("main", {
                        className: "pane paneRight",
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "scroll",
                            children: [
                                viewMode === "month" ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "dayRight",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "dayRightHeader",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "rightDayLabel",
                                                    children: formatDayHeading(selectedDay)
                                                }, void 0, false, {
                                                    fileName: "[project]/app/HomeSplitClient.tsx",
                                                    lineNumber: 1282,
                                                    columnNumber: 21
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "dayRightCount",
                                                    children: [
                                                        dayEvents.length,
                                                        " event",
                                                        dayEvents.length === 1 ? "" : "s"
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/app/HomeSplitClient.tsx",
                                                    lineNumber: 1283,
                                                    columnNumber: 21
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/app/HomeSplitClient.tsx",
                                            lineNumber: 1281,
                                            columnNumber: 19
                                        }, this),
                                        dayEvents.length === 0 ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "emptyList",
                                            children: "No events on this day."
                                        }, void 0, false, {
                                            fileName: "[project]/app/HomeSplitClient.tsx",
                                            lineNumber: 1289,
                                            columnNumber: 21
                                        }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "dayRightList",
                                            role: "list",
                                            children: dayEvents.map((e)=>{
                                                const key = e.uid ?? e.id;
                                                const active = selectedEvent?.id === e.id || selectedEvent?.uid && e.uid && selectedEvent.uid === e.uid;
                                                const title = e.title || "Untitled event";
                                                const d = safeDateFromEvent(e);
                                                const timeLabel = d ? formatTimeShort(d) : "Time TBD";
                                                const venueBits = [
                                                    e.locationName,
                                                    e.event_type
                                                ].filter(Boolean).join(" • ");
                                                return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                    type: "button",
                                                    className: "dayRightRow",
                                                    "data-active": active ? "true" : "false",
                                                    onClick: ()=>{
                                                        setClientSelectedKey(key);
                                                        setParam("event", key);
                                                    },
                                                    role: "listitem",
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                            className: "dayRightTop",
                                                            children: [
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                    className: "dayRightTitle",
                                                                    children: title
                                                                }, void 0, false, {
                                                                    fileName: "[project]/app/HomeSplitClient.tsx",
                                                                    lineNumber: 1316,
                                                                    columnNumber: 31
                                                                }, this),
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                    className: "dayRightTime",
                                                                    children: timeLabel
                                                                }, void 0, false, {
                                                                    fileName: "[project]/app/HomeSplitClient.tsx",
                                                                    lineNumber: 1317,
                                                                    columnNumber: 31
                                                                }, this)
                                                            ]
                                                        }, void 0, true, {
                                                            fileName: "[project]/app/HomeSplitClient.tsx",
                                                            lineNumber: 1315,
                                                            columnNumber: 29
                                                        }, this),
                                                        venueBits ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                            className: "dayRightMeta",
                                                            children: venueBits
                                                        }, void 0, false, {
                                                            fileName: "[project]/app/HomeSplitClient.tsx",
                                                            lineNumber: 1319,
                                                            columnNumber: 42
                                                        }, this) : null
                                                    ]
                                                }, key, true, {
                                                    fileName: "[project]/app/HomeSplitClient.tsx",
                                                    lineNumber: 1304,
                                                    columnNumber: 27
                                                }, this);
                                            })
                                        }, void 0, false, {
                                            fileName: "[project]/app/HomeSplitClient.tsx",
                                            lineNumber: 1291,
                                            columnNumber: 21
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/app/HomeSplitClient.tsx",
                                    lineNumber: 1280,
                                    columnNumber: 17
                                }, this) : null,
                                viewMode === "list" && selectedWeekBucket ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "rightHeader weeklyOverviewLanding",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "rightDayLabel fadeInItem",
                                            style: {
                                                animationDelay: "260ms"
                                            },
                                            children: "Weekly Overview"
                                        }, void 0, false, {
                                            fileName: "[project]/app/HomeSplitClient.tsx",
                                            lineNumber: 1331,
                                            columnNumber: 19
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "weekSelectorRail fadeInItem",
                                            style: {
                                                animationDelay: "320ms"
                                            },
                                            children: weekBuckets.map((bucket)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                    type: "button",
                                                    className: "weekSelectorCard",
                                                    "data-active": selectedWeekBucket.key === bucket.key ? "true" : "false",
                                                    onClick: ()=>openWeek(bucket.key),
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                            className: "weekSelectorEyebrow",
                                                            children: bucket.label
                                                        }, void 0, false, {
                                                            fileName: "[project]/app/HomeSplitClient.tsx",
                                                            lineNumber: 1347,
                                                            columnNumber: 25
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                            className: "weekSelectorRange",
                                                            children: bucket.rangeLabel
                                                        }, void 0, false, {
                                                            fileName: "[project]/app/HomeSplitClient.tsx",
                                                            lineNumber: 1348,
                                                            columnNumber: 25
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                            className: "weekSelectorMeta",
                                                            children: [
                                                                bucket.events.length,
                                                                " event",
                                                                bucket.events.length === 1 ? "" : "s"
                                                            ]
                                                        }, void 0, true, {
                                                            fileName: "[project]/app/HomeSplitClient.tsx",
                                                            lineNumber: 1349,
                                                            columnNumber: 25
                                                        }, this)
                                                    ]
                                                }, bucket.key, true, {
                                                    fileName: "[project]/app/HomeSplitClient.tsx",
                                                    lineNumber: 1340,
                                                    columnNumber: 23
                                                }, this))
                                        }, void 0, false, {
                                            fileName: "[project]/app/HomeSplitClient.tsx",
                                            lineNumber: 1338,
                                            columnNumber: 19
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "weekSummary fadeInItem",
                                            style: {
                                                animationDelay: "360ms"
                                            },
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "weekSummaryTopline",
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                            children: [
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                                                    className: "weekSummaryTitle",
                                                                    children: selectedWeekBucket.label
                                                                }, void 0, false, {
                                                                    fileName: "[project]/app/HomeSplitClient.tsx",
                                                                    lineNumber: 1357,
                                                                    columnNumber: 25
                                                                }, this),
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                                    className: "weekSummarySubhead",
                                                                    children: [
                                                                        "Week of ",
                                                                        weekLabel,
                                                                        ". Browse the current week plus the next four weeks, then open a week for a fuller breakdown."
                                                                    ]
                                                                }, void 0, true, {
                                                                    fileName: "[project]/app/HomeSplitClient.tsx",
                                                                    lineNumber: 1358,
                                                                    columnNumber: 25
                                                                }, this)
                                                            ]
                                                        }, void 0, true, {
                                                            fileName: "[project]/app/HomeSplitClient.tsx",
                                                            lineNumber: 1356,
                                                            columnNumber: 23
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                            className: "weekSummaryRangePill",
                                                            children: selectedWeekBucket.rangeLabel
                                                        }, void 0, false, {
                                                            fileName: "[project]/app/HomeSplitClient.tsx",
                                                            lineNumber: 1362,
                                                            columnNumber: 23
                                                        }, this)
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/app/HomeSplitClient.tsx",
                                                    lineNumber: 1355,
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
                                                                    lineNumber: 1367,
                                                                    columnNumber: 25
                                                                }, this),
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                    className: "weekSummaryValue",
                                                                    children: weekEventsCount
                                                                }, void 0, false, {
                                                                    fileName: "[project]/app/HomeSplitClient.tsx",
                                                                    lineNumber: 1368,
                                                                    columnNumber: 25
                                                                }, this)
                                                            ]
                                                        }, void 0, true, {
                                                            fileName: "[project]/app/HomeSplitClient.tsx",
                                                            lineNumber: 1366,
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
                                                                    lineNumber: 1371,
                                                                    columnNumber: 25
                                                                }, this),
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                    className: "weekSummaryValue",
                                                                    children: weekInsights["Live music"]
                                                                }, void 0, false, {
                                                                    fileName: "[project]/app/HomeSplitClient.tsx",
                                                                    lineNumber: 1372,
                                                                    columnNumber: 25
                                                                }, this)
                                                            ]
                                                        }, void 0, true, {
                                                            fileName: "[project]/app/HomeSplitClient.tsx",
                                                            lineNumber: 1370,
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
                                                                    lineNumber: 1375,
                                                                    columnNumber: 25
                                                                }, this),
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                    className: "weekSummaryValue",
                                                                    children: weekInsights["Food & drink"]
                                                                }, void 0, false, {
                                                                    fileName: "[project]/app/HomeSplitClient.tsx",
                                                                    lineNumber: 1376,
                                                                    columnNumber: 25
                                                                }, this)
                                                            ]
                                                        }, void 0, true, {
                                                            fileName: "[project]/app/HomeSplitClient.tsx",
                                                            lineNumber: 1374,
                                                            columnNumber: 23
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                            className: "weekSummaryCard",
                                                            role: "listitem",
                                                            children: [
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                    className: "weekSummaryKicker",
                                                                    children: "Community"
                                                                }, void 0, false, {
                                                                    fileName: "[project]/app/HomeSplitClient.tsx",
                                                                    lineNumber: 1379,
                                                                    columnNumber: 25
                                                                }, this),
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                    className: "weekSummaryValue",
                                                                    children: weekInsights["Community"]
                                                                }, void 0, false, {
                                                                    fileName: "[project]/app/HomeSplitClient.tsx",
                                                                    lineNumber: 1380,
                                                                    columnNumber: 25
                                                                }, this)
                                                            ]
                                                        }, void 0, true, {
                                                            fileName: "[project]/app/HomeSplitClient.tsx",
                                                            lineNumber: 1378,
                                                            columnNumber: 23
                                                        }, this)
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/app/HomeSplitClient.tsx",
                                                    lineNumber: 1365,
                                                    columnNumber: 21
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "weekSummaryGrid weekSummaryGridSecondary",
                                                    role: "list",
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                            className: "weekSummaryCard",
                                                            role: "listitem",
                                                            children: [
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                    className: "weekSummaryKicker",
                                                                    children: "Busiest day"
                                                                }, void 0, false, {
                                                                    fileName: "[project]/app/HomeSplitClient.tsx",
                                                                    lineNumber: 1386,
                                                                    columnNumber: 25
                                                                }, this),
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                    className: "weekSummaryValueSmall",
                                                                    children: selectedWeekBucket.busiestDayLabel
                                                                }, void 0, false, {
                                                                    fileName: "[project]/app/HomeSplitClient.tsx",
                                                                    lineNumber: 1387,
                                                                    columnNumber: 25
                                                                }, this)
                                                            ]
                                                        }, void 0, true, {
                                                            fileName: "[project]/app/HomeSplitClient.tsx",
                                                            lineNumber: 1385,
                                                            columnNumber: 23
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                            className: "weekSummaryCard",
                                                            role: "listitem",
                                                            children: [
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                    className: "weekSummaryKicker",
                                                                    children: "Peak time"
                                                                }, void 0, false, {
                                                                    fileName: "[project]/app/HomeSplitClient.tsx",
                                                                    lineNumber: 1390,
                                                                    columnNumber: 25
                                                                }, this),
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                    className: "weekSummaryValueSmall",
                                                                    children: selectedWeekBucket.peakWindowLabel
                                                                }, void 0, false, {
                                                                    fileName: "[project]/app/HomeSplitClient.tsx",
                                                                    lineNumber: 1391,
                                                                    columnNumber: 25
                                                                }, this)
                                                            ]
                                                        }, void 0, true, {
                                                            fileName: "[project]/app/HomeSplitClient.tsx",
                                                            lineNumber: 1389,
                                                            columnNumber: 23
                                                        }, this)
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/app/HomeSplitClient.tsx",
                                                    lineNumber: 1384,
                                                    columnNumber: 21
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/app/HomeSplitClient.tsx",
                                            lineNumber: 1354,
                                            columnNumber: 19
                                        }, this),
                                        weekEventsCount === 0 ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "emptyRight",
                                            children: "No events scheduled for this week yet."
                                        }, void 0, false, {
                                            fileName: "[project]/app/HomeSplitClient.tsx",
                                            lineNumber: 1397,
                                            columnNumber: 21
                                        }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "weeklyLanding fadeInItem",
                                            style: {
                                                animationDelay: "420ms"
                                            },
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "weeklyInsightsBar",
                                                    "aria-label": "Week visualizations",
                                                    children: Object.entries(weekInsights).map(([label, rawCount])=>{
                                                        const count = Number(rawCount) || 0;
                                                        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                            className: "weeklyInsightMetric",
                                                            children: [
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                    className: "weeklyInsightTop",
                                                                    children: [
                                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                            children: label
                                                                        }, void 0, false, {
                                                                            fileName: "[project]/app/HomeSplitClient.tsx",
                                                                            lineNumber: 1406,
                                                                            columnNumber: 31
                                                                        }, this),
                                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                            children: count
                                                                        }, void 0, false, {
                                                                            fileName: "[project]/app/HomeSplitClient.tsx",
                                                                            lineNumber: 1407,
                                                                            columnNumber: 31
                                                                        }, this)
                                                                    ]
                                                                }, void 0, true, {
                                                                    fileName: "[project]/app/HomeSplitClient.tsx",
                                                                    lineNumber: 1405,
                                                                    columnNumber: 29
                                                                }, this),
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                    className: "weeklyInsightTrack",
                                                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                        className: "weeklyInsightFill",
                                                                        style: {
                                                                            width: `${weekEventsCount ? Math.max(count / weekEventsCount * 100, count > 0 ? 12 : 0) : 0}%`
                                                                        }
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/app/HomeSplitClient.tsx",
                                                                        lineNumber: 1410,
                                                                        columnNumber: 31
                                                                    }, this)
                                                                }, void 0, false, {
                                                                    fileName: "[project]/app/HomeSplitClient.tsx",
                                                                    lineNumber: 1409,
                                                                    columnNumber: 29
                                                                }, this)
                                                            ]
                                                        }, label, true, {
                                                            fileName: "[project]/app/HomeSplitClient.tsx",
                                                            lineNumber: 1404,
                                                            columnNumber: 27
                                                        }, this);
                                                    })
                                                }, void 0, false, {
                                                    fileName: "[project]/app/HomeSplitClient.tsx",
                                                    lineNumber: 1400,
                                                    columnNumber: 23
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "weeklyCards",
                                                    children: weekGroups.map((g)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                            className: "weeklyDayGroup",
                                                            children: [
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                    className: "dayTitle",
                                                                    children: formatDayHeading(g.date)
                                                                }, void 0, false, {
                                                                    fileName: "[project]/app/HomeSplitClient.tsx",
                                                                    lineNumber: 1425,
                                                                    columnNumber: 29
                                                                }, this),
                                                                g.items.map((e)=>{
                                                                    const title = e.title || "Untitled event";
                                                                    const d = safeDateFromEvent(e);
                                                                    const timeLabel = d ? formatTimeLabel(d) : "Time TBD";
                                                                    const img = pickImageUrl(e);
                                                                    const desc = (pickDescriptionText(e) || e.summary || "").trim();
                                                                    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                                        type: "button",
                                                                        className: "weeklyCard weeklyCardSelectable",
                                                                        onClick: ()=>openSelected(e.uid ?? e.id),
                                                                        children: [
                                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                                className: "weeklyCardMedia",
                                                                                children: img ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                                    className: "media16x9",
                                                                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("img", {
                                                                                        className: "weeklyThumb",
                                                                                        src: img,
                                                                                        alt: ""
                                                                                    }, void 0, false, {
                                                                                        fileName: "[project]/app/HomeSplitClient.tsx",
                                                                                        lineNumber: 1445,
                                                                                        columnNumber: 41
                                                                                    }, this)
                                                                                }, void 0, false, {
                                                                                    fileName: "[project]/app/HomeSplitClient.tsx",
                                                                                    lineNumber: 1443,
                                                                                    columnNumber: 39
                                                                                }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                                    className: "media16x9 weeklyThumbPlaceholder",
                                                                                    "aria-hidden": true
                                                                                }, void 0, false, {
                                                                                    fileName: "[project]/app/HomeSplitClient.tsx",
                                                                                    lineNumber: 1448,
                                                                                    columnNumber: 39
                                                                                }, this)
                                                                            }, void 0, false, {
                                                                                fileName: "[project]/app/HomeSplitClient.tsx",
                                                                                lineNumber: 1441,
                                                                                columnNumber: 35
                                                                            }, this),
                                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                                className: "weeklyCardContent weeklyCardContentExpanded",
                                                                                children: [
                                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
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
                                                                                                        lineNumber: 1455,
                                                                                                        columnNumber: 41
                                                                                                    }, this),
                                                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                                                        className: "weeklyCardTime",
                                                                                                        children: timeLabel
                                                                                                    }, void 0, false, {
                                                                                                        fileName: "[project]/app/HomeSplitClient.tsx",
                                                                                                        lineNumber: 1456,
                                                                                                        columnNumber: 41
                                                                                                    }, this)
                                                                                                ]
                                                                                            }, void 0, true, {
                                                                                                fileName: "[project]/app/HomeSplitClient.tsx",
                                                                                                lineNumber: 1454,
                                                                                                columnNumber: 39
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
                                                                                                        lineNumber: 1462,
                                                                                                        columnNumber: 45
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
                                                                                                        lineNumber: 1473,
                                                                                                        columnNumber: 45
                                                                                                    }, this) : null
                                                                                                ]
                                                                                            }, void 0, true, {
                                                                                                fileName: "[project]/app/HomeSplitClient.tsx",
                                                                                                lineNumber: 1460,
                                                                                                columnNumber: 41
                                                                                            }, this) : null
                                                                                        ]
                                                                                    }, void 0, true, {
                                                                                        fileName: "[project]/app/HomeSplitClient.tsx",
                                                                                        lineNumber: 1453,
                                                                                        columnNumber: 37
                                                                                    }, this),
                                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                                        className: "weeklyCardMetaRow",
                                                                                        children: [
                                                                                            e.locationName,
                                                                                            e.event_type
                                                                                        ].filter(Boolean).join(" • ")
                                                                                    }, void 0, false, {
                                                                                        fileName: "[project]/app/HomeSplitClient.tsx",
                                                                                        lineNumber: 1487,
                                                                                        columnNumber: 37
                                                                                    }, this),
                                                                                    desc ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                                        className: "weeklyCardDesc",
                                                                                        children: desc.length > 200 ? `${desc.slice(0, 200).trim()}…` : desc
                                                                                    }, void 0, false, {
                                                                                        fileName: "[project]/app/HomeSplitClient.tsx",
                                                                                        lineNumber: 1490,
                                                                                        columnNumber: 45
                                                                                    }, this) : null
                                                                                ]
                                                                            }, void 0, true, {
                                                                                fileName: "[project]/app/HomeSplitClient.tsx",
                                                                                lineNumber: 1452,
                                                                                columnNumber: 35
                                                                            }, this)
                                                                        ]
                                                                    }, e.id, true, {
                                                                        fileName: "[project]/app/HomeSplitClient.tsx",
                                                                        lineNumber: 1435,
                                                                        columnNumber: 33
                                                                    }, this);
                                                                })
                                                            ]
                                                        }, dayKey(g.date), true, {
                                                            fileName: "[project]/app/HomeSplitClient.tsx",
                                                            lineNumber: 1424,
                                                            columnNumber: 27
                                                        }, this))
                                                }, void 0, false, {
                                                    fileName: "[project]/app/HomeSplitClient.tsx",
                                                    lineNumber: 1422,
                                                    columnNumber: 23
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/app/HomeSplitClient.tsx",
                                            lineNumber: 1399,
                                            columnNumber: 21
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/app/HomeSplitClient.tsx",
                                    lineNumber: 1330,
                                    columnNumber: 17
                                }, this) : !selectedEvent ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "dayRight",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "dayRightHeader",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "rightDayLabel",
                                                    children: formatDayHeading(selectedDay)
                                                }, void 0, false, {
                                                    fileName: "[project]/app/HomeSplitClient.tsx",
                                                    lineNumber: 1504,
                                                    columnNumber: 21
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "dayRightCount",
                                                    children: [
                                                        dayEvents.length,
                                                        " event",
                                                        dayEvents.length === 1 ? "" : "s"
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/app/HomeSplitClient.tsx",
                                                    lineNumber: 1505,
                                                    columnNumber: 21
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/app/HomeSplitClient.tsx",
                                            lineNumber: 1503,
                                            columnNumber: 19
                                        }, this),
                                        dayEvents.length === 0 ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "emptyList",
                                            children: "No events on this day."
                                        }, void 0, false, {
                                            fileName: "[project]/app/HomeSplitClient.tsx",
                                            lineNumber: 1511,
                                            columnNumber: 21
                                        }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "dayRightList",
                                            role: "list",
                                            children: dayEvents.map((e)=>{
                                                const key = e.uid ?? e.id;
                                                const title = e.title || "Untitled event";
                                                const d = safeDateFromEvent(e);
                                                const timeLabel = d ? formatTimeShort(d) : "Time TBD";
                                                const venueBits = [
                                                    e.locationName,
                                                    e.event_type
                                                ].filter(Boolean).join(" • ");
                                                return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                    type: "button",
                                                    className: "dayRightRow",
                                                    onClick: ()=>openSelected(key),
                                                    role: "listitem",
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                            className: "dayRightTop",
                                                            children: [
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                    className: "dayRightTitle",
                                                                    children: title
                                                                }, void 0, false, {
                                                                    fileName: "[project]/app/HomeSplitClient.tsx",
                                                                    lineNumber: 1530,
                                                                    columnNumber: 31
                                                                }, this),
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                    className: "dayRightTime",
                                                                    children: timeLabel
                                                                }, void 0, false, {
                                                                    fileName: "[project]/app/HomeSplitClient.tsx",
                                                                    lineNumber: 1531,
                                                                    columnNumber: 31
                                                                }, this)
                                                            ]
                                                        }, void 0, true, {
                                                            fileName: "[project]/app/HomeSplitClient.tsx",
                                                            lineNumber: 1529,
                                                            columnNumber: 29
                                                        }, this),
                                                        venueBits ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                            className: "dayRightMeta",
                                                            children: venueBits
                                                        }, void 0, false, {
                                                            fileName: "[project]/app/HomeSplitClient.tsx",
                                                            lineNumber: 1533,
                                                            columnNumber: 42
                                                        }, this) : null
                                                    ]
                                                }, key, true, {
                                                    fileName: "[project]/app/HomeSplitClient.tsx",
                                                    lineNumber: 1522,
                                                    columnNumber: 27
                                                }, this);
                                            })
                                        }, void 0, false, {
                                            fileName: "[project]/app/HomeSplitClient.tsx",
                                            lineNumber: 1513,
                                            columnNumber: 21
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/app/HomeSplitClient.tsx",
                                    lineNumber: 1502,
                                    columnNumber: 17
                                }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "rightHeader",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "rightDayLabel fadeInItem",
                                            style: {
                                                animationDelay: "260ms"
                                            },
                                            children: selectedEvent.event_type || "Event"
                                        }, void 0, false, {
                                            fileName: "[project]/app/HomeSplitClient.tsx",
                                            lineNumber: 1542,
                                            columnNumber: 19
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h1", {
                                            className: "detailTitle fadeInItem",
                                            style: {
                                                animationDelay: "320ms"
                                            },
                                            children: selectedEvent.title || "Untitled event"
                                        }, void 0, false, {
                                            fileName: "[project]/app/HomeSplitClient.tsx",
                                            lineNumber: 1549,
                                            columnNumber: 19
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "detailMeta fadeInItem",
                                            style: {
                                                animationDelay: "360ms"
                                            },
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                    children: selectedTime
                                                }, void 0, false, {
                                                    fileName: "[project]/app/HomeSplitClient.tsx",
                                                    lineNumber: 1554,
                                                    columnNumber: 21
                                                }, this),
                                                selectedEvent.locationName ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Fragment"], {
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                            className: "dot",
                                                            children: "•"
                                                        }, void 0, false, {
                                                            fileName: "[project]/app/HomeSplitClient.tsx",
                                                            lineNumber: 1557,
                                                            columnNumber: 25
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                            className: "venue",
                                                            children: selectedEvent.locationName
                                                        }, void 0, false, {
                                                            fileName: "[project]/app/HomeSplitClient.tsx",
                                                            lineNumber: 1558,
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
                                                            lineNumber: 1563,
                                                            columnNumber: 25
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                            className: "muted",
                                                            children: selectedEvent.address
                                                        }, void 0, false, {
                                                            fileName: "[project]/app/HomeSplitClient.tsx",
                                                            lineNumber: 1564,
                                                            columnNumber: 25
                                                        }, this)
                                                    ]
                                                }, void 0, true) : null
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/app/HomeSplitClient.tsx",
                                            lineNumber: 1553,
                                            columnNumber: 19
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "heroImage",
                                            style: selectedImg ? {
                                                backgroundImage: `url(${selectedImg})`
                                            } : undefined
                                        }, void 0, false, {
                                            fileName: "[project]/app/HomeSplitClient.tsx",
                                            lineNumber: 1570,
                                            columnNumber: 19
                                        }, this),
                                        selectedEvent.summary ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                            className: "summary",
                                            children: selectedEvent.summary
                                        }, void 0, false, {
                                            fileName: "[project]/app/HomeSplitClient.tsx",
                                            lineNumber: 1575,
                                            columnNumber: 44
                                        }, this) : null,
                                        selectedDesc ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "detailBody",
                                            children: selectedDesc
                                        }, void 0, false, {
                                            fileName: "[project]/app/HomeSplitClient.tsx",
                                            lineNumber: 1577,
                                            columnNumber: 35
                                        }, this) : null,
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$app$2f$components$2f$MediaBlocks$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                            slices: selectedEvent?.content_blocks
                                        }, void 0, false, {
                                            fileName: "[project]/app/HomeSplitClient.tsx",
                                            lineNumber: 1580,
                                            columnNumber: 19
                                        }, this),
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
                                                    lineNumber: 1584,
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
                                                    lineNumber: 1597,
                                                    columnNumber: 23
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/app/HomeSplitClient.tsx",
                                            lineNumber: 1583,
                                            columnNumber: 21
                                        }, this) : null
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/app/HomeSplitClient.tsx",
                                    lineNumber: 1541,
                                    columnNumber: 17
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/app/HomeSplitClient.tsx",
                            lineNumber: 1276,
                            columnNumber: 13
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/app/HomeSplitClient.tsx",
                        lineNumber: 1275,
                        columnNumber: 11
                    }, this) : null
                ]
            }, void 0, true, {
                fileName: "[project]/app/HomeSplitClient.tsx",
                lineNumber: 777,
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
                        lineNumber: 1621,
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
                        lineNumber: 1629,
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
                        lineNumber: 1637,
                        columnNumber: 11
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/app/HomeSplitClient.tsx",
                lineNumber: 1620,
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
                                lineNumber: 1655,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "mobileDetailTitle",
                                children: "Event"
                            }, void 0, false, {
                                fileName: "[project]/app/HomeSplitClient.tsx",
                                lineNumber: 1658,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/app/HomeSplitClient.tsx",
                        lineNumber: 1654,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "scroll",
                        style: {
                            padding: "0 16px 84px 16px"
                        },
                        children: selectedEvent ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "detailCard detailFlash",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "detailTitle",
                                    children: selectedEvent.title ?? selectedEvent.summary ?? "Untitled event"
                                }, void 0, false, {
                                    fileName: "[project]/app/HomeSplitClient.tsx",
                                    lineNumber: 1663,
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
                                            lineNumber: 1665,
                                            columnNumber: 17
                                        }, this),
                                        selectedEvent.event_type ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                            className: "badge",
                                            children: selectedEvent.event_type
                                        }, void 0, false, {
                                            fileName: "[project]/app/HomeSplitClient.tsx",
                                            lineNumber: 1666,
                                            columnNumber: 45
                                        }, this) : null
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/app/HomeSplitClient.tsx",
                                    lineNumber: 1664,
                                    columnNumber: 15
                                }, this),
                                selectedImg ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "media16x9",
                                    style: {
                                        marginTop: 14
                                    },
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("img", {
                                            src: selectedImg,
                                            alt: ""
                                        }, void 0, false, {
                                            fileName: "[project]/app/HomeSplitClient.tsx",
                                            lineNumber: 1671,
                                            columnNumber: 19
                                        }, this),
                                        selectedDesc ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "mediaDescBtn",
                                            children: selectedDesc.slice(0, 120)
                                        }, void 0, false, {
                                            fileName: "[project]/app/HomeSplitClient.tsx",
                                            lineNumber: 1672,
                                            columnNumber: 35
                                        }, this) : null
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/app/HomeSplitClient.tsx",
                                    lineNumber: 1669,
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
                                        lineNumber: 1677,
                                        columnNumber: 19
                                    }, this)
                                }, void 0, false, {
                                    fileName: "[project]/app/HomeSplitClient.tsx",
                                    lineNumber: 1676,
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
                                        lineNumber: 1681,
                                        columnNumber: 19
                                    }, this)
                                }, void 0, false, {
                                    fileName: "[project]/app/HomeSplitClient.tsx",
                                    lineNumber: 1680,
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
                                        lineNumber: 1686,
                                        columnNumber: 19
                                    }, this)
                                }, void 0, false, {
                                    fileName: "[project]/app/HomeSplitClient.tsx",
                                    lineNumber: 1685,
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
                                        lineNumber: 1693,
                                        columnNumber: 19
                                    }, this)
                                }, void 0, false, {
                                    fileName: "[project]/app/HomeSplitClient.tsx",
                                    lineNumber: 1692,
                                    columnNumber: 17
                                }, this) : null,
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$app$2f$components$2f$MediaBlocks$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                    slices: selectedEvent?.content_blocks
                                }, void 0, false, {
                                    fileName: "[project]/app/HomeSplitClient.tsx",
                                    lineNumber: 1699,
                                    columnNumber: 15
                                }, this)
                            ]
                        }, detailFlashKey, true, {
                            fileName: "[project]/app/HomeSplitClient.tsx",
                            lineNumber: 1662,
                            columnNumber: 13
                        }, this) : null
                    }, void 0, false, {
                        fileName: "[project]/app/HomeSplitClient.tsx",
                        lineNumber: 1660,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/app/HomeSplitClient.tsx",
                lineNumber: 1649,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/app/HomeSplitClient.tsx",
        lineNumber: 773,
        columnNumber: 5
    }, this);
}
_s(HomeSplitClient, "50t2lCInlNhAlijDLkzvsHcYUU4=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$components$2f$useSmoothWheel$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useSmoothWheel"],
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

//# sourceMappingURL=app_c1e5a095._.js.map