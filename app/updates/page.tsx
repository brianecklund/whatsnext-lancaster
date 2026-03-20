import { Suspense } from "react";
import UnifiedShellClient from '@/app/UnifiedShellClient';
import { getSiteData } from '@/lib/site-data';

export const revalidate = 60;

export default async function UpdatesPage() {
  const { events, locations, updates } = await getSiteData();
  return (
    <Suspense fallback={null}>
      <UnifiedShellClient initialSection="updates" events={events} locations={locations} updates={updates} />
    </Suspense>
  );
}
