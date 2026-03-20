import UnifiedShellClient from '@/app/UnifiedShellClient';
import { getSiteData } from '@/lib/site-data';

export const revalidate = 60;

export default async function LocationsPage() {
  const { events, locations, updates } = await getSiteData();
  return <UnifiedShellClient initialSection="directory" events={events} locations={locations} updates={updates} />;
}
