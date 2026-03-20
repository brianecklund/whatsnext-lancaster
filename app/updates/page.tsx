import UnifiedShellClient from '@/app/UnifiedShellClient';
import { getSiteData } from '@/lib/site-data';

export const revalidate = 60;

export default async function UpdatesPage() {
  const { events, locations, updates } = await getSiteData();
  return <UnifiedShellClient initialSection="updates" events={events} locations={locations} updates={updates} />;
}
