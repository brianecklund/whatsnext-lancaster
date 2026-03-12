module.exports = [
"[externals]/next/dist/compiled/next-server/app-route-turbo.runtime.dev.js [external] (next/dist/compiled/next-server/app-route-turbo.runtime.dev.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/compiled/next-server/app-route-turbo.runtime.dev.js", () => require("next/dist/compiled/next-server/app-route-turbo.runtime.dev.js"));

module.exports = mod;
}),
"[externals]/next/dist/compiled/@opentelemetry/api [external] (next/dist/compiled/@opentelemetry/api, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/compiled/@opentelemetry/api", () => require("next/dist/compiled/@opentelemetry/api"));

module.exports = mod;
}),
"[externals]/next/dist/compiled/next-server/app-page-turbo.runtime.dev.js [external] (next/dist/compiled/next-server/app-page-turbo.runtime.dev.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/compiled/next-server/app-page-turbo.runtime.dev.js", () => require("next/dist/compiled/next-server/app-page-turbo.runtime.dev.js"));

module.exports = mod;
}),
"[externals]/next/dist/server/app-render/work-unit-async-storage.external.js [external] (next/dist/server/app-render/work-unit-async-storage.external.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/server/app-render/work-unit-async-storage.external.js", () => require("next/dist/server/app-render/work-unit-async-storage.external.js"));

module.exports = mod;
}),
"[externals]/next/dist/server/app-render/work-async-storage.external.js [external] (next/dist/server/app-render/work-async-storage.external.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/server/app-render/work-async-storage.external.js", () => require("next/dist/server/app-render/work-async-storage.external.js"));

module.exports = mod;
}),
"[externals]/next/dist/shared/lib/no-fallback-error.external.js [external] (next/dist/shared/lib/no-fallback-error.external.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/shared/lib/no-fallback-error.external.js", () => require("next/dist/shared/lib/no-fallback-error.external.js"));

module.exports = mod;
}),
"[externals]/next/dist/server/app-render/after-task-async-storage.external.js [external] (next/dist/server/app-render/after-task-async-storage.external.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/server/app-render/after-task-async-storage.external.js", () => require("next/dist/server/app-render/after-task-async-storage.external.js"));

module.exports = mod;
}),
"[externals]/fs [external] (fs, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("fs", () => require("fs"));

module.exports = mod;
}),
"[externals]/path [external] (path, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("path", () => require("path"));

module.exports = mod;
}),
"[project]/lib/venue-import/cache.ts [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "getDefaultVenueImportParams",
    ()=>getDefaultVenueImportParams,
    "isVenueCacheFresh",
    ()=>isVenueCacheFresh,
    "readVenueCache",
    ()=>readVenueCache,
    "writeVenueCache",
    ()=>writeVenueCache
]);
var __TURBOPACK__imported__module__$5b$externals$5d2f$fs__$5b$external$5d$__$28$fs$2c$__cjs$29$__ = __turbopack_context__.i("[externals]/fs [external] (fs, cjs)");
var __TURBOPACK__imported__module__$5b$externals$5d2f$path__$5b$external$5d$__$28$path$2c$__cjs$29$__ = __turbopack_context__.i("[externals]/path [external] (path, cjs)");
;
;
const CACHE_PATH = __TURBOPACK__imported__module__$5b$externals$5d2f$path__$5b$external$5d$__$28$path$2c$__cjs$29$__["default"].join(process.cwd(), "data", "venue-cache.json");
const EMPTY_CACHE = {
    generatedAt: null,
    cacheDay: null,
    location: "Lancaster, PA",
    query: "restaurants bars coffee shops cafes music venues event spaces theaters shops boutiques businesses",
    limit: 30,
    providers: {
        google: 0
    },
    venues: []
};
function getDefaultVenueImportParams() {
    return {
        location: process.env.VENUE_IMPORT_LOCATION || EMPTY_CACHE.location,
        query: process.env.VENUE_IMPORT_QUERY || EMPTY_CACHE.query,
        limit: Number(process.env.VENUE_IMPORT_LIMIT || EMPTY_CACHE.limit),
        radiusMeters: Number(process.env.VENUE_IMPORT_RADIUS_METERS || 12000)
    };
}
async function readVenueCache() {
    try {
        const raw = await __TURBOPACK__imported__module__$5b$externals$5d2f$fs__$5b$external$5d$__$28$fs$2c$__cjs$29$__["promises"].readFile(CACHE_PATH, "utf8");
        const parsed = JSON.parse(raw);
        return {
            ...EMPTY_CACHE,
            ...parsed,
            providers: {
                ...EMPTY_CACHE.providers,
                ...parsed.providers || {}
            },
            venues: Array.isArray(parsed.venues) ? parsed.venues : []
        };
    } catch  {
        return EMPTY_CACHE;
    }
}
async function writeVenueCache(cache) {
    await __TURBOPACK__imported__module__$5b$externals$5d2f$fs__$5b$external$5d$__$28$fs$2c$__cjs$29$__["promises"].mkdir(__TURBOPACK__imported__module__$5b$externals$5d2f$path__$5b$external$5d$__$28$path$2c$__cjs$29$__["default"].dirname(CACHE_PATH), {
        recursive: true
    });
    await __TURBOPACK__imported__module__$5b$externals$5d2f$fs__$5b$external$5d$__$28$fs$2c$__cjs$29$__["promises"].writeFile(CACHE_PATH, `${JSON.stringify(cache, null, 2)}\n`, "utf8");
}
function getTodayCacheDay() {
    return new Date().toISOString().slice(0, 10);
}
function isVenueCacheFresh(cache, maxAgeHours = 24) {
    if (cache.cacheDay && cache.cacheDay === getTodayCacheDay() && Array.isArray(cache.venues) && cache.venues.length > 0) {
        return true;
    }
    if (!cache.generatedAt) return false;
    const generatedAt = new Date(cache.generatedAt).getTime();
    if (Number.isNaN(generatedAt)) return false;
    return Date.now() - generatedAt < maxAgeHours * 60 * 60 * 1000;
}
}),
"[project]/app/api/venues/status/route.ts [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "GET",
    ()=>GET,
    "dynamic",
    ()=>dynamic,
    "runtime",
    ()=>runtime
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/server.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$venue$2d$import$2f$cache$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/venue-import/cache.ts [app-route] (ecmascript)");
;
;
const runtime = "nodejs";
const dynamic = "force-dynamic";
async function GET() {
    const apiKey = process.env.GOOGLE_PLACES_API_KEY || process.env.GOOGLE_MAPS_API_KEY || null;
    const cache = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$venue$2d$import$2f$cache$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["readVenueCache"])();
    return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
        apiWorking: true,
        apiKeyPresent: Boolean(apiKey),
        cacheExists: Boolean(cache.venues?.length || cache.generatedAt),
        cacheDay: cache.cacheDay || null,
        cachedVenues: cache.venues?.length || 0,
        updatedAt: cache.generatedAt || null,
        location: cache.location,
        query: cache.query,
        time: new Date().toISOString()
    });
}
}),
];

//# sourceMappingURL=%5Broot-of-the-server%5D__7552f912._.js.map