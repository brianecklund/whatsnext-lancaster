
import { NextRequest, NextResponse } from "next/server";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

function getApiKey() {
  const key = process.env.GOOGLE_PLACES_API_KEY || process.env.GOOGLE_MAPS_API_KEY;
  if (!key) throw new Error("Missing GOOGLE_PLACES_API_KEY or GOOGLE_MAPS_API_KEY");
  return key;
}

export async function GET(req: NextRequest) {
  try {
    const name = req.nextUrl.searchParams.get("name")?.trim();
    const maxWidthPx = Math.min(Math.max(Number(req.nextUrl.searchParams.get("maxWidthPx") || "1600"), 1), 4800);

    if (!name) {
      return new NextResponse("Missing photo name", { status: 400 });
    }

    const apiKey = getApiKey();
    const metaUrl = new URL(`https://places.googleapis.com/v1/${name}/media`);
    metaUrl.searchParams.set("key", apiKey);
    metaUrl.searchParams.set("maxWidthPx", String(maxWidthPx));
    metaUrl.searchParams.set("skipHttpRedirect", "true");

    const metaRes = await fetch(metaUrl.toString(), { cache: "no-store" });
    if (!metaRes.ok) {
      return new NextResponse(await metaRes.text(), { status: metaRes.status });
    }

    const meta = (await metaRes.json()) as { photoUri?: string };
    if (!meta.photoUri) {
      return new NextResponse("Photo URI unavailable", { status: 404 });
    }

    const imgRes = await fetch(meta.photoUri, { cache: "no-store" });
    if (!imgRes.ok || !imgRes.body) {
      return new NextResponse("Unable to fetch image", { status: 502 });
    }

    return new NextResponse(imgRes.body, {
      status: 200,
      headers: {
        "Content-Type": imgRes.headers.get("content-type") || "image/jpeg",
        "Cache-Control": "private, max-age=0, no-store",
      },
    });
  } catch (error) {
    return new NextResponse(error instanceof Error ? error.message : "Unable to load photo", { status: 500 });
  }
}
