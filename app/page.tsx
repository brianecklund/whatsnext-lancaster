import UnifiedShellClient from '@/app/UnifiedShellClient';
import { getSiteData } from '@/lib/site-data';

export const dynamic = 'force-dynamic';

export default async function HomePage() {
  const { events, locations, updates } = await getSiteData();
  return <UnifiedShellClient events={events} locations={locations} updates={updates} initialView="calendar" />;
}
