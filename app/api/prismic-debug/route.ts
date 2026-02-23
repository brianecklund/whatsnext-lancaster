import { NextResponse } from "next/server";
import { createClient, repositoryName } from "@/prismicio";

export const runtime = "nodejs";

export async function GET() {
  const info: any = {
    ok: false,
    repositoryName: repositoryName ?? null,
    hasAccessToken: Boolean(process.env.PRISMIC_ACCESS_TOKEN || process.env.PRISMIC_TOKEN),
  };

  try {
    const client = createClient();
    const docs = await client.getAllByType("event", { pageSize: 5 });

    info.ok = true;
    info.eventCountSample = docs.length;
    info.sample = docs.map((d: any) => ({
      id: d.id,
      uid: d.uid ?? null,
      title: d.data?.title ?? null,
      start_datetime: d.data?.start_datetime ?? null,
      status: d.data?.status ?? null,
    }));
  } catch (err: any) {
    info.ok = false;
    info.error =
      err?.message ??
      (typeof err === "string" ? err : "Unknown error while fetching from Prismic");
  }

  return NextResponse.json(info, { status: info.ok ? 200 : 500 });
}
