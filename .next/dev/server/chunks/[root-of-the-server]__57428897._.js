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
"[project]/lib/google-places.ts [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "buildPlacePhotoProxyUrl",
    ()=>buildPlacePhotoProxyUrl,
    "fetchPlaceDetails",
    ()=>fetchPlaceDetails,
    "normalizePlaceDetails",
    ()=>normalizePlaceDetails
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$server$2d$only$2f$empty$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/server-only/empty.js [app-route] (ecmascript)");
;
const DETAILS_FIELD_MASK = [
    "id",
    "displayName",
    "formattedAddress",
    "websiteUri",
    "nationalPhoneNumber",
    "googleMapsUri",
    "rating",
    "regularOpeningHours",
    "currentOpeningHours",
    "photos"
].join(",");
function getApiKey() {
    const key = process.env.GOOGLE_PLACES_API_KEY || process.env.GOOGLE_MAPS_API_KEY;
    if (!key) {
        throw new Error("Missing GOOGLE_PLACES_API_KEY or GOOGLE_MAPS_API_KEY");
    }
    return key;
}
function buildPlacePhotoProxyUrl(name, maxWidthPx = 1600) {
    const params = new URLSearchParams({
        name,
        maxWidthPx: String(maxWidthPx)
    });
    return `/api/places/photo?${params.toString()}`;
}
function normalizePlaceDetails(data) {
    const placeId = data?.id?.trim();
    if (!placeId) return null;
    const photos = Array.isArray(data?.photos) ? data.photos.filter((photo)=>Boolean(photo?.name)).slice(0, 10) : [];
    const coverImageUrl = photos[0]?.name ? buildPlacePhotoProxyUrl(photos[0].name, 1800) : null;
    const galleryImageUrls = photos.slice(1, 7).map((photo)=>buildPlacePhotoProxyUrl(photo.name, 1400));
    const weekdayDescriptions = data?.regularOpeningHours?.weekdayDescriptions || data?.currentOpeningHours?.weekdayDescriptions || [];
    const photoAttributions = Array.from(new Set(photos.flatMap((photo)=>photo.authorAttributions || []).map((item)=>item?.displayName?.trim()).filter((value)=>Boolean(value))));
    return {
        placeId,
        displayName: data?.displayName?.text?.trim() || null,
        formattedAddress: data?.formattedAddress?.trim() || null,
        websiteUri: data?.websiteUri?.trim() || null,
        nationalPhoneNumber: data?.nationalPhoneNumber?.trim() || null,
        googleMapsUri: data?.googleMapsUri?.trim() || null,
        rating: typeof data?.rating === "number" ? data.rating : null,
        openNow: typeof data?.currentOpeningHours?.openNow === "boolean" ? data.currentOpeningHours.openNow : null,
        weekdayDescriptions,
        photos,
        coverImageUrl,
        galleryImageUrls,
        photoAttributions
    };
}
async function fetchPlaceDetails(placeId) {
    const trimmedId = placeId?.trim();
    if (!trimmedId) return null;
    const apiKey = getApiKey();
    const response = await fetch(`https://places.googleapis.com/v1/places/${encodeURIComponent(trimmedId)}`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            "X-Goog-Api-Key": apiKey,
            "X-Goog-FieldMask": DETAILS_FIELD_MASK
        },
        cache: "no-store"
    });
    if (!response.ok) {
        const message = await response.text();
        throw new Error(`Google Place Details failed (${response.status} ${response.statusText}): ${message}`);
    }
    const data = await response.json();
    return normalizePlaceDetails(data);
}
}),
"[project]/app/api/places/details/route.ts [app-route] (ecmascript)", ((__turbopack_context__) => {
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
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$google$2d$places$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/google-places.ts [app-route] (ecmascript)");
;
;
const runtime = "nodejs";
const dynamic = "force-dynamic";
async function GET(req) {
    try {
        const placeId = req.nextUrl.searchParams.get("id")?.trim();
        if (!placeId) {
            return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
                ok: false,
                error: "Missing id"
            }, {
                status: 400
            });
        }
        const details = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$google$2d$places$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["fetchPlaceDetails"])(placeId);
        return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
            ok: true,
            details
        });
    } catch (error) {
        return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
            ok: false,
            error: error instanceof Error ? error.message : "Unable to load place details"
        }, {
            status: 500
        });
    }
}
}),
];

//# sourceMappingURL=%5Broot-of-the-server%5D__57428897._.js.map