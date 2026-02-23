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
    info.sample = docs.map((d: any) => {
      const data = d.data ?? {};
      // show available keys so we can spot API ID mismatches
      const keys = Object.keys(data).sort();
      return {
        id: d.id,
        uid: d.uid ?? null,
        title: data?.title ?? null,
        // raw values
        start_datetime: (data as any)?.start_datetime ?? null,
        end_datetime: (data as any)?.end_datetime ?? null,
        status: (data as any)?.status ?? null,
        // diagnostics
        dataKeys: keys,
        // show anything that looks like a start/end date field
        probableDateFields: keys
          .filter((k) => /(start|end|date|time)/i.test(k))
          .reduce((acc: any, k: string) => {
            acc[k] = (data as any)[k] ?? null;
            return acc;
          }, {}),
      };
    });
  } catch (err: any) {
    info.ok = false;
    info.error =
      err?.message ??
      (typeof err === "string" ? err : "Unknown error while fetching from Prismic");
  }

  return NextResponse.json(info, { status: info.ok ? 200 : 500 });
}
