import { Suspense } from "react";
import ClockDayClient from "./ClockDayClient";
import { getSiteData } from "@/lib/site-data";

export const revalidate = 60;

export default async function ClockPage() {
  const { events } = await getSiteData();

  return (
    <Suspense fallback={null}>
      <ClockDayClient events={events} />
    </Suspense>
  );
}

