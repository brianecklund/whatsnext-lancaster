
import type { EventLite, LocationLite } from '@/lib/types';
import type { UpdateLite } from '@/app/updates/UpdatesSplitClient';

export const TEST_DATA_TAG = 'WNL_TEST_DATA_2026_03';

function buildIso(date: string, time: string) {
  return `${date}T${time}:00`;
}

function img(seed: string) {
  return `https://picsum.photos/seed/${seed}/1200/900`;
}

type TestPartnerPage = {
  uid: string;
  name: string;
  category: string;
  address: string;
  description: string;
  website: string;
  phone: string;
  coverImageUrl: string;
  galleryImageUrls: string[];
  weekdayDescriptions: string[];
  mapsUrl: string;
};

export const testPartnerPages: TestPartnerPage[] = [
  {
    uid: 'test-harbor-hall',
    name: 'Harbor Hall',
    category: 'Music venue',
    address: '112 Water St, Lancaster, PA 17603',
    description: 'A fake featured partner used for staging and layout QA. Remove any content tagged with WNL_TEST_DATA_2026_03 when real partner data is ready.',
    website: 'https://example.com/harbor-hall',
    phone: '(717) 555-0101',
    coverImageUrl: img('harbor-hall-cover'),
    galleryImageUrls: [img('harbor-hall-1'), img('harbor-hall-2'), img('harbor-hall-3')],
    weekdayDescriptions: ['Mon: Closed', 'Tue–Thu: 4 PM – 10 PM', 'Fri: 4 PM – 12 AM', 'Sat: 11 AM – 12 AM', 'Sun: 11 AM – 8 PM'],
    mapsUrl: 'https://maps.google.com/?q=112+Water+St+Lancaster+PA+17603',
  },
  {
    uid: 'test-fig-lane-market',
    name: 'Fig Lane Market',
    category: 'Food hall',
    address: '27 Fig Ln, Lancaster, PA 17602',
    description: 'A fake featured partner used for CMS and split-view testing. This should be removed along with all WNL_TEST_DATA_2026_03 entries later.',
    website: 'https://example.com/fig-lane-market',
    phone: '(717) 555-0102',
    coverImageUrl: img('fig-lane-cover'),
    galleryImageUrls: [img('fig-lane-1'), img('fig-lane-2'), img('fig-lane-3')],
    weekdayDescriptions: ['Daily: 8 AM – 10 PM'],
    mapsUrl: 'https://maps.google.com/?q=27+Fig+Ln+Lancaster+PA+17602',
  },
  {
    uid: 'test-penn-square-studio',
    name: 'Penn Square Studio',
    category: 'Arts & culture',
    address: '8 Penn Sq, Lancaster, PA 17603',
    description: 'A fake featured partner page for development. Safe to remove by searching for WNL_TEST_DATA_2026_03.',
    website: 'https://example.com/penn-square-studio',
    phone: '(717) 555-0103',
    coverImageUrl: img('penn-square-cover'),
    galleryImageUrls: [img('penn-square-1'), img('penn-square-2'), img('penn-square-3')],
    weekdayDescriptions: ['Wed–Thu: 12 PM – 8 PM', 'Fri–Sat: 12 PM – 10 PM', 'Sun: 11 AM – 6 PM'],
    mapsUrl: 'https://maps.google.com/?q=8+Penn+Sq+Lancaster+PA+17603',
  },
];

export const testFeaturedLocations: LocationLite[] = testPartnerPages.map((page, index) => ({
  id: `test-location-${index + 1}`,
  key: page.uid,
  uid: page.uid,
  name: page.name,
  address: page.address,
  category: page.category,
  website: page.website,
  description: page.description,
  phone: page.phone,
  rating: 4.7,
  venue_external_id: `test-featured-${index + 1}`,
  source: TEST_DATA_TAG,
  customPageUid: page.uid,
  customPageUrl: `/locations/${page.uid}`,
  coverImageUrl: page.coverImageUrl,
  galleryImageUrls: page.galleryImageUrls,
  weekdayDescriptions: page.weekdayDescriptions,
  googleMapsUri: page.mapsUrl,
}));

const featuredPartnerEvents: EventLite[] = [
  {
    id: 'test-event-1', key: 'test-event-1', uid: 'test-event-1',
    title: 'Lantern Room Sessions', summary: 'An intimate live set with regional indie artists.',
    description: 'Placeholder copy for a small-ticket live music night at Harbor Hall. Tagged for easy cleanup later.',
    descriptionText: 'Placeholder copy for a small-ticket live music night at Harbor Hall. Tagged for easy cleanup later.',
    start_datetime: buildIso('2026-03-29', '19:30'), end_datetime: buildIso('2026-03-29', '22:00'),
    event_type: 'Live music', status: 'Scheduled', locationName: 'Harbor Hall', address: '112 Water St, Lancaster, PA 17603', locationUrl: '/locations/test-harbor-hall',
    website_url: 'https://example.com/harbor-hall/lantern-room', tickets_url: 'https://example.com/harbor-hall/lantern-room/tickets', image_url: img('lantern-room-sessions'), imageUrl: img('lantern-room-sessions'), tags: [TEST_DATA_TAG, 'featured-partner', 'harbor-hall'], venue_external_id: 'test-featured-1', location_page_uid: 'test-harbor-hall'
  },
  {
    id: 'test-event-2', key: 'test-event-2', uid: 'test-event-2',
    title: 'Sunday Vinyl Social', summary: 'Low-key listening lounge night with guest selectors.',
    description: 'Fake event data for testing the event list, weekly overview, and partner linking.', descriptionText: 'Fake event data for testing the event list, weekly overview, and partner linking.',
    start_datetime: buildIso('2026-03-29', '14:00'), end_datetime: buildIso('2026-03-29', '17:00'),
    event_type: 'Music social', status: 'Scheduled', locationName: 'Harbor Hall', address: '112 Water St, Lancaster, PA 17603', locationUrl: '/locations/test-harbor-hall',
    website_url: 'https://example.com/harbor-hall/vinyl-social', tickets_url: null, image_url: img('vinyl-social'), imageUrl: img('vinyl-social'), tags: [TEST_DATA_TAG, 'featured-partner', 'harbor-hall'], venue_external_id: 'test-featured-1', location_page_uid: 'test-harbor-hall'
  },
  {
    id: 'test-event-3', key: 'test-event-3', uid: 'test-event-3',
    title: 'Blue Hour Jazz Trio', summary: 'Cocktail-hour jazz set with a rotating trio.',
    description: 'Fake Harbor Hall event for the next week calendar rail and weekly overview.', descriptionText: 'Fake Harbor Hall event for the next week calendar rail and weekly overview.',
    start_datetime: buildIso('2026-03-31', '18:00'), end_datetime: buildIso('2026-03-31', '20:30'),
    event_type: 'Live music', status: 'Scheduled', locationName: 'Harbor Hall', address: '112 Water St, Lancaster, PA 17603', locationUrl: '/locations/test-harbor-hall',
    website_url: 'https://example.com/harbor-hall/blue-hour-jazz', tickets_url: 'https://example.com/harbor-hall/blue-hour-jazz/tickets', image_url: img('blue-hour-jazz'), imageUrl: img('blue-hour-jazz'), tags: [TEST_DATA_TAG, 'featured-partner', 'harbor-hall'], venue_external_id: 'test-featured-1', location_page_uid: 'test-harbor-hall'
  },
  {
    id: 'test-event-4', key: 'test-event-4', uid: 'test-event-4',
    title: 'After Dark DJ Window', summary: 'Late-night DJ set with projected visuals.',
    description: 'Placeholder DJ event built to exercise late-night categories and card layouts.', descriptionText: 'Placeholder DJ event built to exercise late-night categories and card layouts.',
    start_datetime: buildIso('2026-04-02', '21:00'), end_datetime: buildIso('2026-04-02', '23:59'),
    event_type: 'DJ set', status: 'Scheduled', locationName: 'Harbor Hall', address: '112 Water St, Lancaster, PA 17603', locationUrl: '/locations/test-harbor-hall',
    website_url: 'https://example.com/harbor-hall/after-dark', tickets_url: 'https://example.com/harbor-hall/after-dark/tickets', image_url: img('after-dark-dj-window'), imageUrl: img('after-dark-dj-window'), tags: [TEST_DATA_TAG, 'featured-partner', 'harbor-hall'], venue_external_id: 'test-featured-1', location_page_uid: 'test-harbor-hall'
  },
  {
    id: 'test-event-5', key: 'test-event-5', uid: 'test-event-5',
    title: 'First Look Listening Party', summary: 'Preview tracks from local artists before release day.',
    description: 'Fake listening-party content for layout and filtering tests.', descriptionText: 'Fake listening-party content for layout and filtering tests.',
    start_datetime: buildIso('2026-04-04', '17:30'), end_datetime: buildIso('2026-04-04', '20:00'),
    event_type: 'Live music', status: 'Scheduled', locationName: 'Harbor Hall', address: '112 Water St, Lancaster, PA 17603', locationUrl: '/locations/test-harbor-hall',
    website_url: 'https://example.com/harbor-hall/first-look', tickets_url: null, image_url: img('first-look-listening-party'), imageUrl: img('first-look-listening-party'), tags: [TEST_DATA_TAG, 'featured-partner', 'harbor-hall'], venue_external_id: 'test-featured-1', location_page_uid: 'test-harbor-hall'
  },
  {
    id: 'test-event-6', key: 'test-event-6', uid: 'test-event-6',
    title: 'Breakfast Club Pop-Up', summary: 'Coffee, pastries, and guest brunch sandwiches.',
    description: 'Placeholder brunch pop-up at Fig Lane Market for the next week calendar.', descriptionText: 'Placeholder brunch pop-up at Fig Lane Market for the next week calendar.',
    start_datetime: buildIso('2026-03-30', '09:00'), end_datetime: buildIso('2026-03-30', '12:00'),
    event_type: 'Food & drink', status: 'Scheduled', locationName: 'Fig Lane Market', address: '27 Fig Ln, Lancaster, PA 17602', locationUrl: '/locations/test-fig-lane-market',
    website_url: 'https://example.com/fig-lane-market/breakfast-club', tickets_url: null, image_url: img('breakfast-club-pop-up'), imageUrl: img('breakfast-club-pop-up'), tags: [TEST_DATA_TAG, 'featured-partner', 'fig-lane-market'], venue_external_id: 'test-featured-2', location_page_uid: 'test-fig-lane-market'
  },
  {
    id: 'test-event-7', key: 'test-event-7', uid: 'test-event-7',
    title: 'Night Market Tasting Flights', summary: 'Small-bite tasting flights with rotating vendors.',
    description: 'Fake food-hall event used to test category filters and image cards.', descriptionText: 'Fake food-hall event used to test category filters and image cards.',
    start_datetime: buildIso('2026-03-31', '18:30'), end_datetime: buildIso('2026-03-31', '21:30'),
    event_type: 'Food & drink', status: 'Scheduled', locationName: 'Fig Lane Market', address: '27 Fig Ln, Lancaster, PA 17602', locationUrl: '/locations/test-fig-lane-market',
    website_url: 'https://example.com/fig-lane-market/night-market', tickets_url: 'https://example.com/fig-lane-market/night-market/tickets', image_url: img('night-market-tasting-flights'), imageUrl: img('night-market-tasting-flights'), tags: [TEST_DATA_TAG, 'featured-partner', 'fig-lane-market'], venue_external_id: 'test-featured-2', location_page_uid: 'test-fig-lane-market'
  },
  {
    id: 'test-event-8', key: 'test-event-8', uid: 'test-event-8',
    title: 'Community Dinner Series', summary: 'Communal table dinner with a spring menu.',
    description: 'Seeded partner event for dinner-series testing and weekly overview cards.', descriptionText: 'Seeded partner event for dinner-series testing and weekly overview cards.',
    start_datetime: buildIso('2026-04-01', '19:00'), end_datetime: buildIso('2026-04-01', '21:00'),
    event_type: 'Community dinner', status: 'Scheduled', locationName: 'Fig Lane Market', address: '27 Fig Ln, Lancaster, PA 17602', locationUrl: '/locations/test-fig-lane-market',
    website_url: 'https://example.com/fig-lane-market/community-dinner', tickets_url: 'https://example.com/fig-lane-market/community-dinner/tickets', image_url: img('community-dinner-series'), imageUrl: img('community-dinner-series'), tags: [TEST_DATA_TAG, 'featured-partner', 'fig-lane-market'], venue_external_id: 'test-featured-2', location_page_uid: 'test-fig-lane-market'
  },
  {
    id: 'test-event-9', key: 'test-event-9', uid: 'test-event-9',
    title: 'Rooftop Mocktail Hour', summary: 'Zero-proof drinks and sunset snacks.',
    description: 'Fake rooftop event meant to fill the week with lighter food-and-drink content.', descriptionText: 'Fake rooftop event meant to fill the week with lighter food-and-drink content.',
    start_datetime: buildIso('2026-04-03', '17:00'), end_datetime: buildIso('2026-04-03', '19:00'),
    event_type: 'Food & drink', status: 'Scheduled', locationName: 'Fig Lane Market', address: '27 Fig Ln, Lancaster, PA 17602', locationUrl: '/locations/test-fig-lane-market',
    website_url: 'https://example.com/fig-lane-market/mocktail-hour', tickets_url: null, image_url: img('rooftop-mocktail-hour'), imageUrl: img('rooftop-mocktail-hour'), tags: [TEST_DATA_TAG, 'featured-partner', 'fig-lane-market'], venue_external_id: 'test-featured-2', location_page_uid: 'test-fig-lane-market'
  },
  {
    id: 'test-event-10', key: 'test-event-10', uid: 'test-event-10',
    title: 'Chef Counter Preview', summary: 'Limited-seat preview of a new rotating menu.',
    description: 'Test partner event for CTA buttons and rich listing copy.', descriptionText: 'Test partner event for CTA buttons and rich listing copy.',
    start_datetime: buildIso('2026-04-04', '20:00'), end_datetime: buildIso('2026-04-04', '22:00'),
    event_type: 'Food & drink', status: 'Scheduled', locationName: 'Fig Lane Market', address: '27 Fig Ln, Lancaster, PA 17602', locationUrl: '/locations/test-fig-lane-market',
    website_url: 'https://example.com/fig-lane-market/chef-counter-preview', tickets_url: 'https://example.com/fig-lane-market/chef-counter-preview/tickets', image_url: img('chef-counter-preview'), imageUrl: img('chef-counter-preview'), tags: [TEST_DATA_TAG, 'featured-partner', 'fig-lane-market'], venue_external_id: 'test-featured-2', location_page_uid: 'test-fig-lane-market'
  },
  {
    id: 'test-event-11', key: 'test-event-11', uid: 'test-event-11',
    title: 'Sketchbook Social', summary: 'Open studio sketch session with timed poses.',
    description: 'Fake art event added for weekly overview previews and partner testing.', descriptionText: 'Fake art event added for weekly overview previews and partner testing.',
    start_datetime: buildIso('2026-03-30', '18:00'), end_datetime: buildIso('2026-03-30', '20:00'),
    event_type: 'Arts & culture', status: 'Scheduled', locationName: 'Penn Square Studio', address: '8 Penn Sq, Lancaster, PA 17603', locationUrl: '/locations/test-penn-square-studio',
    website_url: 'https://example.com/penn-square-studio/sketchbook-social', tickets_url: 'https://example.com/penn-square-studio/sketchbook-social/tickets', image_url: img('sketchbook-social'), imageUrl: img('sketchbook-social'), tags: [TEST_DATA_TAG, 'featured-partner', 'penn-square-studio'], venue_external_id: 'test-featured-3', location_page_uid: 'test-penn-square-studio'
  },
  {
    id: 'test-event-12', key: 'test-event-12', uid: 'test-event-12',
    title: 'Indie Film Matinee', summary: 'Screening and post-film conversation with local hosts.',
    description: 'Placeholder film event used to fill out the arts-and-culture category.', descriptionText: 'Placeholder film event used to fill out the arts-and-culture category.',
    start_datetime: buildIso('2026-04-01', '13:00'), end_datetime: buildIso('2026-04-01', '15:30'),
    event_type: 'Film screening', status: 'Scheduled', locationName: 'Penn Square Studio', address: '8 Penn Sq, Lancaster, PA 17603', locationUrl: '/locations/test-penn-square-studio',
    website_url: 'https://example.com/penn-square-studio/indie-film-matinee', tickets_url: null, image_url: img('indie-film-matinee'), imageUrl: img('indie-film-matinee'), tags: [TEST_DATA_TAG, 'featured-partner', 'penn-square-studio'], venue_external_id: 'test-featured-3', location_page_uid: 'test-penn-square-studio'
  },
  {
    id: 'test-event-13', key: 'test-event-13', uid: 'test-event-13',
    title: 'Print Lab Workshop', summary: 'Hands-on risograph and poster lab for beginners.',
    description: 'Seeded workshop content for category filtering and fake media coverage.', descriptionText: 'Seeded workshop content for category filtering and fake media coverage.',
    start_datetime: buildIso('2026-04-02', '18:30'), end_datetime: buildIso('2026-04-02', '21:00'),
    event_type: 'Workshop', status: 'Scheduled', locationName: 'Penn Square Studio', address: '8 Penn Sq, Lancaster, PA 17603', locationUrl: '/locations/test-penn-square-studio',
    website_url: 'https://example.com/penn-square-studio/print-lab', tickets_url: 'https://example.com/penn-square-studio/print-lab/tickets', image_url: img('print-lab-workshop'), imageUrl: img('print-lab-workshop'), tags: [TEST_DATA_TAG, 'featured-partner', 'penn-square-studio'], venue_external_id: 'test-featured-3', location_page_uid: 'test-penn-square-studio'
  },
  {
    id: 'test-event-14', key: 'test-event-14', uid: 'test-event-14',
    title: 'Friday Gallery Circuit', summary: 'Extended-hour gallery walk with artist pop-ins.',
    description: 'Placeholder gallery event for Friday calendar density and category cards.', descriptionText: 'Placeholder gallery event for Friday calendar density and category cards.',
    start_datetime: buildIso('2026-04-03', '17:30'), end_datetime: buildIso('2026-04-03', '21:30'),
    event_type: 'Art gallery', status: 'Scheduled', locationName: 'Penn Square Studio', address: '8 Penn Sq, Lancaster, PA 17603', locationUrl: '/locations/test-penn-square-studio',
    website_url: 'https://example.com/penn-square-studio/gallery-circuit', tickets_url: null, image_url: img('friday-gallery-circuit'), imageUrl: img('friday-gallery-circuit'), tags: [TEST_DATA_TAG, 'featured-partner', 'penn-square-studio'], venue_external_id: 'test-featured-3', location_page_uid: 'test-penn-square-studio'
  },
  {
    id: 'test-event-15', key: 'test-event-15', uid: 'test-event-15',
    title: 'Poetry & Projection Night', summary: 'Live spoken word paired with projection art.',
    description: 'Fake closing-week event for the arts partner test set.', descriptionText: 'Fake closing-week event for the arts partner test set.',
    start_datetime: buildIso('2026-04-04', '19:30'), end_datetime: buildIso('2026-04-04', '22:00'),
    event_type: 'Poetry reading', status: 'Scheduled', locationName: 'Penn Square Studio', address: '8 Penn Sq, Lancaster, PA 17603', locationUrl: '/locations/test-penn-square-studio',
    website_url: 'https://example.com/penn-square-studio/poetry-projection', tickets_url: 'https://example.com/penn-square-studio/poetry-projection/tickets', image_url: img('poetry-projection-night'), imageUrl: img('poetry-projection-night'), tags: [TEST_DATA_TAG, 'featured-partner', 'penn-square-studio'], venue_external_id: 'test-featured-3', location_page_uid: 'test-penn-square-studio'
  },
  {
    id: 'test-event-16', key: 'test-event-16', uid: 'test-event-16',
    title: 'Neighborhood Cleanup Meetup', summary: 'Volunteer meetup with coffee and cleanup routes.',
    description: 'General fake event tagged for cleanup later.', descriptionText: 'General fake event tagged for cleanup later.',
    start_datetime: buildIso('2026-03-29', '10:00'), end_datetime: buildIso('2026-03-29', '12:00'),
    event_type: 'Community meetup', status: 'Scheduled', locationName: 'Buchanan Park', address: '901 Buchanan Ave, Lancaster, PA 17603', website_url: 'https://example.com/cleanup-meetup', tickets_url: null, image_url: img('cleanup-meetup'), imageUrl: img('cleanup-meetup'), tags: [TEST_DATA_TAG, 'general-test'], venue_external_id: null, location_page_uid: null
  },
  {
    id: 'test-event-17', key: 'test-event-17', uid: 'test-event-17',
    title: 'Midweek Maker Pop-Up', summary: 'A small vendor market with rotating makers.',
    description: 'General fake market event for weekly overview density.', descriptionText: 'General fake market event for weekly overview density.',
    start_datetime: buildIso('2026-04-01', '16:00'), end_datetime: buildIso('2026-04-01', '20:00'),
    event_type: 'Community market', status: 'Scheduled', locationName: 'Queen Street Commons', address: '100 S Queen St, Lancaster, PA 17603', website_url: 'https://example.com/maker-popup', tickets_url: null, image_url: img('midweek-maker-popup'), imageUrl: img('midweek-maker-popup'), tags: [TEST_DATA_TAG, 'general-test'], venue_external_id: null, location_page_uid: null
  },
  {
    id: 'test-event-18', key: 'test-event-18', uid: 'test-event-18',
    title: 'Late Skate Video Night', summary: 'Outdoor skate clips and lo-fi soundtrack projections.',
    description: 'A final fake event to round out the seeded week with an Other-style category.', descriptionText: 'A final fake event to round out the seeded week with an Other-style category.',
    start_datetime: buildIso('2026-04-03', '20:30'), end_datetime: buildIso('2026-04-03', '22:30'),
    event_type: 'Outdoor screening', status: 'Scheduled', locationName: 'Warehouse Yard', address: '320 N Mulberry St, Lancaster, PA 17603', website_url: 'https://example.com/late-skate-video-night', tickets_url: null, image_url: img('late-skate-video-night'), imageUrl: img('late-skate-video-night'), tags: [TEST_DATA_TAG, 'general-test'], venue_external_id: null, location_page_uid: null
  },
];


const extraWeekEvents: EventLite[] = [
  {
    id: 'test-event-19', key: 'test-event-19', uid: 'test-event-19',
    title: 'Canal Side Songwriters', summary: 'Acoustic writers-round with three local performers.',
    description: 'Additional seeded music event for the first test week.', descriptionText: 'Additional seeded music event for the first test week.',
    start_datetime: buildIso('2026-03-30', '19:00'), end_datetime: buildIso('2026-03-30', '21:30'),
    event_type: 'Live music', status: 'Scheduled', locationName: 'Harbor Hall', address: '112 Water St, Lancaster, PA 17603', locationUrl: '/locations/test-harbor-hall',
    website_url: 'https://example.com/harbor-hall/canal-side-songwriters', tickets_url: 'https://example.com/harbor-hall/canal-side-songwriters/tickets', image_url: img('canal-side-songwriters'), imageUrl: img('canal-side-songwriters'), tags: [TEST_DATA_TAG, 'featured-partner', 'harbor-hall', 'week-one'], venue_external_id: 'test-featured-1', location_page_uid: 'test-harbor-hall'
  },
  {
    id: 'test-event-20', key: 'test-event-20', uid: 'test-event-20',
    title: 'Warehouse Soul Hour', summary: 'Soul and funk DJ set with candlelit tables.',
    description: 'Additional seeded Harbor Hall event for the first test week.', descriptionText: 'Additional seeded Harbor Hall event for the first test week.',
    start_datetime: buildIso('2026-04-01', '20:00'), end_datetime: buildIso('2026-04-01', '23:00'),
    event_type: 'DJ set', status: 'Scheduled', locationName: 'Harbor Hall', address: '112 Water St, Lancaster, PA 17603', locationUrl: '/locations/test-harbor-hall',
    website_url: 'https://example.com/harbor-hall/warehouse-soul-hour', tickets_url: null, image_url: img('warehouse-soul-hour'), imageUrl: img('warehouse-soul-hour'), tags: [TEST_DATA_TAG, 'featured-partner', 'harbor-hall', 'week-one'], venue_external_id: 'test-featured-1', location_page_uid: 'test-harbor-hall'
  },
  {
    id: 'test-event-21', key: 'test-event-21', uid: 'test-event-21',
    title: 'Chef Demo Lunch', summary: 'Midday demo and tasting from a rotating guest chef.',
    description: 'Extra Fig Lane seed data for the first week.', descriptionText: 'Extra Fig Lane seed data for the first week.',
    start_datetime: buildIso('2026-04-01', '12:00'), end_datetime: buildIso('2026-04-01', '13:30'),
    event_type: 'Food & drink', status: 'Scheduled', locationName: 'Fig Lane Market', address: '27 Fig Ln, Lancaster, PA 17602', locationUrl: '/locations/test-fig-lane-market',
    website_url: 'https://example.com/fig-lane-market/chef-demo-lunch', tickets_url: null, image_url: img('chef-demo-lunch'), imageUrl: img('chef-demo-lunch'), tags: [TEST_DATA_TAG, 'featured-partner', 'fig-lane-market', 'week-one'], venue_external_id: 'test-featured-2', location_page_uid: 'test-fig-lane-market'
  },
  {
    id: 'test-event-22', key: 'test-event-22', uid: 'test-event-22',
    title: 'Dessert Counter After Hours', summary: 'Late-night sweets menu with espresso drinks.',
    description: 'Extra food-and-drink seed data for the first week.', descriptionText: 'Extra food-and-drink seed data for the first week.',
    start_datetime: buildIso('2026-04-02', '20:30'), end_datetime: buildIso('2026-04-02', '22:30'),
    event_type: 'Food & drink', status: 'Scheduled', locationName: 'Fig Lane Market', address: '27 Fig Ln, Lancaster, PA 17602', locationUrl: '/locations/test-fig-lane-market',
    website_url: 'https://example.com/fig-lane-market/dessert-counter-after-hours', tickets_url: null, image_url: img('dessert-counter-after-hours'), imageUrl: img('dessert-counter-after-hours'), tags: [TEST_DATA_TAG, 'featured-partner', 'fig-lane-market', 'week-one'], venue_external_id: 'test-featured-2', location_page_uid: 'test-fig-lane-market'
  },
  {
    id: 'test-event-23', key: 'test-event-23', uid: 'test-event-23',
    title: 'Open Crit Night', summary: 'Artists pin work on the wall for group feedback.',
    description: 'Extra Penn Square Studio seed data for the first week.', descriptionText: 'Extra Penn Square Studio seed data for the first week.',
    start_datetime: buildIso('2026-03-31', '18:30'), end_datetime: buildIso('2026-03-31', '20:30'),
    event_type: 'Arts & culture', status: 'Scheduled', locationName: 'Penn Square Studio', address: '8 Penn Sq, Lancaster, PA 17603', locationUrl: '/locations/test-penn-square-studio',
    website_url: 'https://example.com/penn-square-studio/open-crit-night', tickets_url: null, image_url: img('open-crit-night'), imageUrl: img('open-crit-night'), tags: [TEST_DATA_TAG, 'featured-partner', 'penn-square-studio', 'week-one'], venue_external_id: 'test-featured-3', location_page_uid: 'test-penn-square-studio'
  },
  {
    id: 'test-event-24', key: 'test-event-24', uid: 'test-event-24',
    title: 'Zine Fold Workshop', summary: 'Make a mini zine and leave with printed copies.',
    description: 'Extra workshop seed data for the first week.', descriptionText: 'Extra workshop seed data for the first week.',
    start_datetime: buildIso('2026-04-04', '11:00'), end_datetime: buildIso('2026-04-04', '13:00'),
    event_type: 'Workshop', status: 'Scheduled', locationName: 'Penn Square Studio', address: '8 Penn Sq, Lancaster, PA 17603', locationUrl: '/locations/test-penn-square-studio',
    website_url: 'https://example.com/penn-square-studio/zine-fold-workshop', tickets_url: 'https://example.com/penn-square-studio/zine-fold-workshop/tickets', image_url: img('zine-fold-workshop'), imageUrl: img('zine-fold-workshop'), tags: [TEST_DATA_TAG, 'featured-partner', 'penn-square-studio', 'week-one'], venue_external_id: 'test-featured-3', location_page_uid: 'test-penn-square-studio'
  },
  {
    id: 'test-event-25', key: 'test-event-25', uid: 'test-event-25',
    title: 'Community Garden Swap', summary: 'Seeds, starts, and tool tips for spring planting.',
    description: 'Extra community event seed data for the first week.', descriptionText: 'Extra community event seed data for the first week.',
    start_datetime: buildIso('2026-04-02', '17:00'), end_datetime: buildIso('2026-04-02', '19:00'),
    event_type: 'Community meetup', status: 'Scheduled', locationName: 'Buchanan Park', address: '901 Buchanan Ave, Lancaster, PA 17603',
    website_url: 'https://example.com/community-garden-swap', tickets_url: null, image_url: img('community-garden-swap'), imageUrl: img('community-garden-swap'), tags: [TEST_DATA_TAG, 'general-test', 'week-one'], venue_external_id: null, location_page_uid: null
  },
  {
    id: 'test-event-26', key: 'test-event-26', uid: 'test-event-26',
    title: 'Warehouse Flea Preview', summary: 'Early look at a Sunday vintage and maker market.',
    description: 'Extra general seed data for the first week.', descriptionText: 'Extra general seed data for the first week.',
    start_datetime: buildIso('2026-04-04', '14:00'), end_datetime: buildIso('2026-04-04', '17:00'),
    event_type: 'Community market', status: 'Scheduled', locationName: 'Warehouse Yard', address: '320 N Mulberry St, Lancaster, PA 17603',
    website_url: 'https://example.com/warehouse-flea-preview', tickets_url: null, image_url: img('warehouse-flea-preview'), imageUrl: img('warehouse-flea-preview'), tags: [TEST_DATA_TAG, 'general-test', 'week-one'], venue_external_id: null, location_page_uid: null
  },
  {
    id: 'test-event-27', key: 'test-event-27', uid: 'test-event-27',
    title: 'Sunday Courtyard Brunch Set', summary: 'Outdoor brunch service with a mellow vinyl soundtrack.',
    description: 'Additional first-week event to increase seeded density.', descriptionText: 'Additional first-week event to increase seeded density.',
    start_datetime: buildIso('2026-04-04', '10:30'), end_datetime: buildIso('2026-04-04', '13:30'),
    event_type: 'Food & drink', status: 'Scheduled', locationName: 'Fig Lane Market', address: '27 Fig Ln, Lancaster, PA 17602', locationUrl: '/locations/test-fig-lane-market',
    website_url: 'https://example.com/fig-lane-market/courtyard-brunch-set', tickets_url: null, image_url: img('courtyard-brunch-set'), imageUrl: img('courtyard-brunch-set'), tags: [TEST_DATA_TAG, 'featured-partner', 'fig-lane-market', 'week-one'], venue_external_id: 'test-featured-2', location_page_uid: 'test-fig-lane-market'
  },
  {
    id: 'test-event-28', key: 'test-event-28', uid: 'test-event-28',
    title: 'Projector Poetry Salon', summary: 'Short readings paired with moving-image loops.',
    description: 'Additional first-week event to round out arts coverage.', descriptionText: 'Additional first-week event to round out arts coverage.',
    start_datetime: buildIso('2026-04-03', '19:00'), end_datetime: buildIso('2026-04-03', '21:00'),
    event_type: 'Poetry reading', status: 'Scheduled', locationName: 'Penn Square Studio', address: '8 Penn Sq, Lancaster, PA 17603', locationUrl: '/locations/test-penn-square-studio',
    website_url: 'https://example.com/penn-square-studio/projector-poetry-salon', tickets_url: 'https://example.com/penn-square-studio/projector-poetry-salon/tickets', image_url: img('projector-poetry-salon'), imageUrl: img('projector-poetry-salon'), tags: [TEST_DATA_TAG, 'featured-partner', 'penn-square-studio', 'week-one'], venue_external_id: 'test-featured-3', location_page_uid: 'test-penn-square-studio'
  },
  {
    id: 'test-event-29', key: 'test-event-29', uid: 'test-event-29',
    title: 'Riverfront Listening Lounge', summary: 'Ambient and downtempo listening session by the bar.',
    description: 'Extra Harbor Hall event to double the volume of week-one fixtures.', descriptionText: 'Extra Harbor Hall event to double the volume of week-one fixtures.',
    start_datetime: buildIso('2026-04-04', '21:00'), end_datetime: buildIso('2026-04-04', '23:30'),
    event_type: 'Live music', status: 'Scheduled', locationName: 'Harbor Hall', address: '112 Water St, Lancaster, PA 17603', locationUrl: '/locations/test-harbor-hall',
    website_url: 'https://example.com/harbor-hall/riverfront-listening-lounge', tickets_url: null, image_url: img('riverfront-listening-lounge'), imageUrl: img('riverfront-listening-lounge'), tags: [TEST_DATA_TAG, 'featured-partner', 'harbor-hall', 'week-one'], venue_external_id: 'test-featured-1', location_page_uid: 'test-harbor-hall'
  },
  {
    id: 'test-event-30', key: 'test-event-30', uid: 'test-event-30',
    title: 'Night Shift Noodles', summary: 'Late bowl-night special and rotating guest cooks.',
    description: 'Additional first-week food event to round out the seeded set.', descriptionText: 'Additional first-week food event to round out the seeded set.',
    start_datetime: buildIso('2026-04-03', '21:00'), end_datetime: buildIso('2026-04-03', '23:00'),
    event_type: 'Food & drink', status: 'Scheduled', locationName: 'Fig Lane Market', address: '27 Fig Ln, Lancaster, PA 17602', locationUrl: '/locations/test-fig-lane-market',
    website_url: 'https://example.com/fig-lane-market/night-shift-noodles', tickets_url: null, image_url: img('night-shift-noodles'), imageUrl: img('night-shift-noodles'), tags: [TEST_DATA_TAG, 'featured-partner', 'fig-lane-market', 'week-one'], venue_external_id: 'test-featured-2', location_page_uid: 'test-fig-lane-market'
  },
  {
    id: 'test-event-31', key: 'test-event-31', uid: 'test-event-31',
    title: 'Mural Walk Meetup', summary: 'A guided walk of murals and public art downtown.',
    description: 'Additional community/arts crossover event for the first week.', descriptionText: 'Additional community/arts crossover event for the first week.',
    start_datetime: buildIso('2026-04-04', '15:00'), end_datetime: buildIso('2026-04-04', '16:30'),
    event_type: 'Arts & culture', status: 'Scheduled', locationName: 'Penn Square Studio', address: '8 Penn Sq, Lancaster, PA 17603', locationUrl: '/locations/test-penn-square-studio',
    website_url: 'https://example.com/penn-square-studio/mural-walk-meetup', tickets_url: null, image_url: img('mural-walk-meetup'), imageUrl: img('mural-walk-meetup'), tags: [TEST_DATA_TAG, 'featured-partner', 'penn-square-studio', 'week-one'], venue_external_id: 'test-featured-3', location_page_uid: 'test-penn-square-studio'
  },
  {
    id: 'test-event-32', key: 'test-event-32', uid: 'test-event-32',
    title: 'Sunday Social Run Club', summary: 'Easy downtown loop with coffee after the run.',
    description: 'Additional general event to complete the first week expansion.', descriptionText: 'Additional general event to complete the first week expansion.',
    start_datetime: buildIso('2026-04-04', '08:30'), end_datetime: buildIso('2026-04-04', '10:00'),
    event_type: 'Community meetup', status: 'Scheduled', locationName: 'Queen Street Commons', address: '100 S Queen St, Lancaster, PA 17603',
    website_url: 'https://example.com/sunday-social-run-club', tickets_url: null, image_url: img('sunday-social-run-club'), imageUrl: img('sunday-social-run-club'), tags: [TEST_DATA_TAG, 'general-test', 'week-one'], venue_external_id: null, location_page_uid: null
  },
];

const followingWeekEvents: EventLite[] = [
  {
    id: 'test-event-33', key: 'test-event-33', uid: 'test-event-33',
    title: 'Monday Mix Room', summary: 'Start the week with a stripped-back set and drink specials.',
    description: 'Week-two Harbor Hall seed event.', descriptionText: 'Week-two Harbor Hall seed event.',
    start_datetime: buildIso('2026-04-05', '19:00'), end_datetime: buildIso('2026-04-05', '21:30'),
    event_type: 'Live music', status: 'Scheduled', locationName: 'Harbor Hall', address: '112 Water St, Lancaster, PA 17603', locationUrl: '/locations/test-harbor-hall',
    website_url: 'https://example.com/harbor-hall/monday-mix-room', tickets_url: null, image_url: img('monday-mix-room'), imageUrl: img('monday-mix-room'), tags: [TEST_DATA_TAG, 'featured-partner', 'harbor-hall', 'week-two'], venue_external_id: 'test-featured-1', location_page_uid: 'test-harbor-hall'
  },
  {
    id: 'test-event-34', key: 'test-event-34', uid: 'test-event-34',
    title: 'Tuesday Tape Exchange', summary: 'Collector swap night with demos and listening stations.',
    description: 'Week-two Harbor Hall seed event.', descriptionText: 'Week-two Harbor Hall seed event.',
    start_datetime: buildIso('2026-04-06', '18:30'), end_datetime: buildIso('2026-04-06', '20:30'),
    event_type: 'Music social', status: 'Scheduled', locationName: 'Harbor Hall', address: '112 Water St, Lancaster, PA 17603', locationUrl: '/locations/test-harbor-hall',
    website_url: 'https://example.com/harbor-hall/tuesday-tape-exchange', tickets_url: null, image_url: img('tuesday-tape-exchange'), imageUrl: img('tuesday-tape-exchange'), tags: [TEST_DATA_TAG, 'featured-partner', 'harbor-hall', 'week-two'], venue_external_id: 'test-featured-1', location_page_uid: 'test-harbor-hall'
  },
  {
    id: 'test-event-35', key: 'test-event-35', uid: 'test-event-35',
    title: 'Blue Room Quartet', summary: 'Midweek jazz with a guest saxophone feature.',
    description: 'Week-two Harbor Hall seed event.', descriptionText: 'Week-two Harbor Hall seed event.',
    start_datetime: buildIso('2026-04-07', '19:30'), end_datetime: buildIso('2026-04-07', '22:00'),
    event_type: 'Live music', status: 'Scheduled', locationName: 'Harbor Hall', address: '112 Water St, Lancaster, PA 17603', locationUrl: '/locations/test-harbor-hall',
    website_url: 'https://example.com/harbor-hall/blue-room-quartet', tickets_url: 'https://example.com/harbor-hall/blue-room-quartet/tickets', image_url: img('blue-room-quartet'), imageUrl: img('blue-room-quartet'), tags: [TEST_DATA_TAG, 'featured-partner', 'harbor-hall', 'week-two'], venue_external_id: 'test-featured-1', location_page_uid: 'test-harbor-hall'
  },
  {
    id: 'test-event-36', key: 'test-event-36', uid: 'test-event-36',
    title: 'Harbor Late Set', summary: 'A late-night dancefloor edit series with visuals.',
    description: 'Week-two Harbor Hall seed event.', descriptionText: 'Week-two Harbor Hall seed event.',
    start_datetime: buildIso('2026-04-09', '21:30'), end_datetime: buildIso('2026-04-09', '23:59'),
    event_type: 'DJ set', status: 'Scheduled', locationName: 'Harbor Hall', address: '112 Water St, Lancaster, PA 17603', locationUrl: '/locations/test-harbor-hall',
    website_url: 'https://example.com/harbor-hall/harbor-late-set', tickets_url: 'https://example.com/harbor-hall/harbor-late-set/tickets', image_url: img('harbor-late-set'), imageUrl: img('harbor-late-set'), tags: [TEST_DATA_TAG, 'featured-partner', 'harbor-hall', 'week-two'], venue_external_id: 'test-featured-1', location_page_uid: 'test-harbor-hall'
  },
  {
    id: 'test-event-37', key: 'test-event-37', uid: 'test-event-37',
    title: 'Saturday Soundcheck Patio', summary: 'Open-air mini sets all afternoon.',
    description: 'Week-two Harbor Hall seed event.', descriptionText: 'Week-two Harbor Hall seed event.',
    start_datetime: buildIso('2026-04-10', '15:00'), end_datetime: buildIso('2026-04-10', '18:00'),
    event_type: 'Live music', status: 'Scheduled', locationName: 'Harbor Hall', address: '112 Water St, Lancaster, PA 17603', locationUrl: '/locations/test-harbor-hall',
    website_url: 'https://example.com/harbor-hall/saturday-soundcheck-patio', tickets_url: null, image_url: img('saturday-soundcheck-patio'), imageUrl: img('saturday-soundcheck-patio'), tags: [TEST_DATA_TAG, 'featured-partner', 'harbor-hall', 'week-two'], venue_external_id: 'test-featured-1', location_page_uid: 'test-harbor-hall'
  },
  {
    id: 'test-event-38', key: 'test-event-38', uid: 'test-event-38',
    title: 'Morning Bun Drop', summary: 'Pastries, coffee, and an early vendor preview.',
    description: 'Week-two Fig Lane seed event.', descriptionText: 'Week-two Fig Lane seed event.',
    start_datetime: buildIso('2026-04-05', '09:00'), end_datetime: buildIso('2026-04-05', '11:30'),
    event_type: 'Food & drink', status: 'Scheduled', locationName: 'Fig Lane Market', address: '27 Fig Ln, Lancaster, PA 17602', locationUrl: '/locations/test-fig-lane-market',
    website_url: 'https://example.com/fig-lane-market/morning-bun-drop', tickets_url: null, image_url: img('morning-bun-drop'), imageUrl: img('morning-bun-drop'), tags: [TEST_DATA_TAG, 'featured-partner', 'fig-lane-market', 'week-two'], venue_external_id: 'test-featured-2', location_page_uid: 'test-fig-lane-market'
  },
  {
    id: 'test-event-39', key: 'test-event-39', uid: 'test-event-39',
    title: 'Lunch Counter Residency', summary: 'A weeknight menu takeover from a guest chef.',
    description: 'Week-two Fig Lane seed event.', descriptionText: 'Week-two Fig Lane seed event.',
    start_datetime: buildIso('2026-04-06', '12:00'), end_datetime: buildIso('2026-04-06', '14:00'),
    event_type: 'Food & drink', status: 'Scheduled', locationName: 'Fig Lane Market', address: '27 Fig Ln, Lancaster, PA 17602', locationUrl: '/locations/test-fig-lane-market',
    website_url: 'https://example.com/fig-lane-market/lunch-counter-residency', tickets_url: null, image_url: img('lunch-counter-residency'), imageUrl: img('lunch-counter-residency'), tags: [TEST_DATA_TAG, 'featured-partner', 'fig-lane-market', 'week-two'], venue_external_id: 'test-featured-2', location_page_uid: 'test-fig-lane-market'
  },
  {
    id: 'test-event-40', key: 'test-event-40', uid: 'test-event-40',
    title: 'Night Market Office Party', summary: 'Group tastings, DJs, and shared plates.',
    description: 'Week-two Fig Lane seed event.', descriptionText: 'Week-two Fig Lane seed event.',
    start_datetime: buildIso('2026-04-07', '18:00'), end_datetime: buildIso('2026-04-07', '21:00'),
    event_type: 'Food & drink', status: 'Scheduled', locationName: 'Fig Lane Market', address: '27 Fig Ln, Lancaster, PA 17602', locationUrl: '/locations/test-fig-lane-market',
    website_url: 'https://example.com/fig-lane-market/night-market-office-party', tickets_url: 'https://example.com/fig-lane-market/night-market-office-party/tickets', image_url: img('night-market-office-party'), imageUrl: img('night-market-office-party'), tags: [TEST_DATA_TAG, 'featured-partner', 'fig-lane-market', 'week-two'], venue_external_id: 'test-featured-2', location_page_uid: 'test-fig-lane-market'
  },
  {
    id: 'test-event-41', key: 'test-event-41', uid: 'test-event-41',
    title: 'Dumpling Lab', summary: 'Hands-on class with a take-home recipe card.',
    description: 'Week-two Fig Lane seed event.', descriptionText: 'Week-two Fig Lane seed event.',
    start_datetime: buildIso('2026-04-08', '18:30'), end_datetime: buildIso('2026-04-08', '20:30'),
    event_type: 'Workshop', status: 'Scheduled', locationName: 'Fig Lane Market', address: '27 Fig Ln, Lancaster, PA 17602', locationUrl: '/locations/test-fig-lane-market',
    website_url: 'https://example.com/fig-lane-market/dumpling-lab', tickets_url: 'https://example.com/fig-lane-market/dumpling-lab/tickets', image_url: img('dumpling-lab'), imageUrl: img('dumpling-lab'), tags: [TEST_DATA_TAG, 'featured-partner', 'fig-lane-market', 'week-two'], venue_external_id: 'test-featured-2', location_page_uid: 'test-fig-lane-market'
  },
  {
    id: 'test-event-42', key: 'test-event-42', uid: 'test-event-42',
    title: 'Sunday Sauce Club', summary: 'Family-style dinner with rotating hosts.',
    description: 'Week-two Fig Lane seed event.', descriptionText: 'Week-two Fig Lane seed event.',
    start_datetime: buildIso('2026-04-11', '17:00'), end_datetime: buildIso('2026-04-11', '19:30'),
    event_type: 'Food & drink', status: 'Scheduled', locationName: 'Fig Lane Market', address: '27 Fig Ln, Lancaster, PA 17602', locationUrl: '/locations/test-fig-lane-market',
    website_url: 'https://example.com/fig-lane-market/sunday-sauce-club', tickets_url: null, image_url: img('sunday-sauce-club'), imageUrl: img('sunday-sauce-club'), tags: [TEST_DATA_TAG, 'featured-partner', 'fig-lane-market', 'week-two'], venue_external_id: 'test-featured-2', location_page_uid: 'test-fig-lane-market'
  },
  {
    id: 'test-event-43', key: 'test-event-43', uid: 'test-event-43',
    title: 'Open Studio Mondays', summary: 'Drop in to work, look around, and meet other makers.',
    description: 'Week-two Penn Square Studio seed event.', descriptionText: 'Week-two Penn Square Studio seed event.',
    start_datetime: buildIso('2026-04-05', '17:00'), end_datetime: buildIso('2026-04-05', '20:00'),
    event_type: 'Arts & culture', status: 'Scheduled', locationName: 'Penn Square Studio', address: '8 Penn Sq, Lancaster, PA 17603', locationUrl: '/locations/test-penn-square-studio',
    website_url: 'https://example.com/penn-square-studio/open-studio-mondays', tickets_url: null, image_url: img('open-studio-mondays'), imageUrl: img('open-studio-mondays'), tags: [TEST_DATA_TAG, 'featured-partner', 'penn-square-studio', 'week-two'], venue_external_id: 'test-featured-3', location_page_uid: 'test-penn-square-studio'
  },
  {
    id: 'test-event-44', key: 'test-event-44', uid: 'test-event-44',
    title: 'Poster Archive Talk', summary: 'A conversation around regional print ephemera.',
    description: 'Week-two Penn Square Studio seed event.', descriptionText: 'Week-two Penn Square Studio seed event.',
    start_datetime: buildIso('2026-04-06', '19:00'), end_datetime: buildIso('2026-04-06', '20:30'),
    event_type: 'Arts & culture', status: 'Scheduled', locationName: 'Penn Square Studio', address: '8 Penn Sq, Lancaster, PA 17603', locationUrl: '/locations/test-penn-square-studio',
    website_url: 'https://example.com/penn-square-studio/poster-archive-talk', tickets_url: null, image_url: img('poster-archive-talk'), imageUrl: img('poster-archive-talk'), tags: [TEST_DATA_TAG, 'featured-partner', 'penn-square-studio', 'week-two'], venue_external_id: 'test-featured-3', location_page_uid: 'test-penn-square-studio'
  },
  {
    id: 'test-event-45', key: 'test-event-45', uid: 'test-event-45',
    title: 'Midweek Screening Club', summary: 'Experimental shorts and a post-show discussion.',
    description: 'Week-two Penn Square Studio seed event.', descriptionText: 'Week-two Penn Square Studio seed event.',
    start_datetime: buildIso('2026-04-07', '19:30'), end_datetime: buildIso('2026-04-07', '21:30'),
    event_type: 'Film screening', status: 'Scheduled', locationName: 'Penn Square Studio', address: '8 Penn Sq, Lancaster, PA 17603', locationUrl: '/locations/test-penn-square-studio',
    website_url: 'https://example.com/penn-square-studio/midweek-screening-club', tickets_url: 'https://example.com/penn-square-studio/midweek-screening-club/tickets', image_url: img('midweek-screening-club'), imageUrl: img('midweek-screening-club'), tags: [TEST_DATA_TAG, 'featured-partner', 'penn-square-studio', 'week-two'], venue_external_id: 'test-featured-3', location_page_uid: 'test-penn-square-studio'
  },
  {
    id: 'test-event-46', key: 'test-event-46', uid: 'test-event-46',
    title: 'Type Lab Open Night', summary: 'Open critique and printing session for type nerds.',
    description: 'Week-two Penn Square Studio seed event.', descriptionText: 'Week-two Penn Square Studio seed event.',
    start_datetime: buildIso('2026-04-08', '18:30'), end_datetime: buildIso('2026-04-08', '21:00'),
    event_type: 'Workshop', status: 'Scheduled', locationName: 'Penn Square Studio', address: '8 Penn Sq, Lancaster, PA 17603', locationUrl: '/locations/test-penn-square-studio',
    website_url: 'https://example.com/penn-square-studio/type-lab-open-night', tickets_url: null, image_url: img('type-lab-open-night'), imageUrl: img('type-lab-open-night'), tags: [TEST_DATA_TAG, 'featured-partner', 'penn-square-studio', 'week-two'], venue_external_id: 'test-featured-3', location_page_uid: 'test-penn-square-studio'
  },
  {
    id: 'test-event-47', key: 'test-event-47', uid: 'test-event-47',
    title: 'Friday Projection Salon', summary: 'Moving-image installations and ambient performances.',
    description: 'Week-two Penn Square Studio seed event.', descriptionText: 'Week-two Penn Square Studio seed event.',
    start_datetime: buildIso('2026-04-09', '19:00'), end_datetime: buildIso('2026-04-09', '22:00'),
    event_type: 'Arts & culture', status: 'Scheduled', locationName: 'Penn Square Studio', address: '8 Penn Sq, Lancaster, PA 17603', locationUrl: '/locations/test-penn-square-studio',
    website_url: 'https://example.com/penn-square-studio/friday-projection-salon', tickets_url: 'https://example.com/penn-square-studio/friday-projection-salon/tickets', image_url: img('friday-projection-salon'), imageUrl: img('friday-projection-salon'), tags: [TEST_DATA_TAG, 'featured-partner', 'penn-square-studio', 'week-two'], venue_external_id: 'test-featured-3', location_page_uid: 'test-penn-square-studio'
  },
  {
    id: 'test-event-48', key: 'test-event-48', uid: 'test-event-48',
    title: 'Saturday Print Swap', summary: 'Trade posters, zines, and artist editions.',
    description: 'Week-two Penn Square Studio seed event.', descriptionText: 'Week-two Penn Square Studio seed event.',
    start_datetime: buildIso('2026-04-10', '12:00'), end_datetime: buildIso('2026-04-10', '15:00'),
    event_type: 'Arts & culture', status: 'Scheduled', locationName: 'Penn Square Studio', address: '8 Penn Sq, Lancaster, PA 17603', locationUrl: '/locations/test-penn-square-studio',
    website_url: 'https://example.com/penn-square-studio/saturday-print-swap', tickets_url: null, image_url: img('saturday-print-swap'), imageUrl: img('saturday-print-swap'), tags: [TEST_DATA_TAG, 'featured-partner', 'penn-square-studio', 'week-two'], venue_external_id: 'test-featured-3', location_page_uid: 'test-penn-square-studio'
  },
  {
    id: 'test-event-49', key: 'test-event-49', uid: 'test-event-49',
    title: 'Neighborhood Picnic Meetup', summary: 'Open-invite meetup with lawn games and snacks.',
    description: 'Week-two general seed event.', descriptionText: 'Week-two general seed event.',
    start_datetime: buildIso('2026-04-05', '12:00'), end_datetime: buildIso('2026-04-05', '14:30'),
    event_type: 'Community meetup', status: 'Scheduled', locationName: 'Buchanan Park', address: '901 Buchanan Ave, Lancaster, PA 17603',
    website_url: 'https://example.com/neighborhood-picnic-meetup', tickets_url: null, image_url: img('neighborhood-picnic-meetup'), imageUrl: img('neighborhood-picnic-meetup'), tags: [TEST_DATA_TAG, 'general-test', 'week-two'], venue_external_id: null, location_page_uid: null
  },
  {
    id: 'test-event-50', key: 'test-event-50', uid: 'test-event-50',
    title: 'Midweek Market Stretch', summary: 'An evening market with extra vendor rows.',
    description: 'Week-two general seed event.', descriptionText: 'Week-two general seed event.',
    start_datetime: buildIso('2026-04-07', '17:00'), end_datetime: buildIso('2026-04-07', '21:00'),
    event_type: 'Community market', status: 'Scheduled', locationName: 'Queen Street Commons', address: '100 S Queen St, Lancaster, PA 17603',
    website_url: 'https://example.com/midweek-market-stretch', tickets_url: null, image_url: img('midweek-market-stretch'), imageUrl: img('midweek-market-stretch'), tags: [TEST_DATA_TAG, 'general-test', 'week-two'], venue_external_id: null, location_page_uid: null
  },
  {
    id: 'test-event-51', key: 'test-event-51', uid: 'test-event-51',
    title: 'Moonlight Courtside Cinema', summary: 'Outdoor screening with blankets and snacks.',
    description: 'Week-two general seed event.', descriptionText: 'Week-two general seed event.',
    start_datetime: buildIso('2026-04-09', '20:30'), end_datetime: buildIso('2026-04-09', '22:30'),
    event_type: 'Outdoor screening', status: 'Scheduled', locationName: 'Warehouse Yard', address: '320 N Mulberry St, Lancaster, PA 17603',
    website_url: 'https://example.com/moonlight-courtside-cinema', tickets_url: null, image_url: img('moonlight-courtside-cinema'), imageUrl: img('moonlight-courtside-cinema'), tags: [TEST_DATA_TAG, 'general-test', 'week-two'], venue_external_id: null, location_page_uid: null
  },
  {
    id: 'test-event-52', key: 'test-event-52', uid: 'test-event-52',
    title: 'Saturday Community Repair Bar', summary: 'Bring a lamp, jacket, or small fix-it project.',
    description: 'Week-two general seed event.', descriptionText: 'Week-two general seed event.',
    start_datetime: buildIso('2026-04-10', '10:00'), end_datetime: buildIso('2026-04-10', '13:00'),
    event_type: 'Community meetup', status: 'Scheduled', locationName: 'Queen Street Commons', address: '100 S Queen St, Lancaster, PA 17603',
    website_url: 'https://example.com/community-repair-bar', tickets_url: null, image_url: img('community-repair-bar'), imageUrl: img('community-repair-bar'), tags: [TEST_DATA_TAG, 'general-test', 'week-two'], venue_external_id: null, location_page_uid: null
  },
  {
    id: 'test-event-53', key: 'test-event-53', uid: 'test-event-53',
    title: 'Sunday Closing Party', summary: 'Final night wrap-up with DJs, snacks, and giveaways.',
    description: 'Week-two general seed event.', descriptionText: 'Week-two general seed event.',
    start_datetime: buildIso('2026-04-11', '18:00'), end_datetime: buildIso('2026-04-11', '21:00'),
    event_type: 'Other', status: 'Scheduled', locationName: 'Warehouse Yard', address: '320 N Mulberry St, Lancaster, PA 17603',
    website_url: 'https://example.com/sunday-closing-party', tickets_url: null, image_url: img('sunday-closing-party'), imageUrl: img('sunday-closing-party'), tags: [TEST_DATA_TAG, 'general-test', 'week-two'], venue_external_id: null, location_page_uid: null
  },
];

/** Weeks 3–5 of the seeded calendar: Apr 12 through May 2 (weekly overview rail + filters). */
const lateAprilThroughEarlyMayEvents: EventLite[] = [
  {
    id: 'test-event-54',
    key: 'test-event-54',
    uid: 'test-event-54',
    title: 'Tax Day Acoustic Brunch',
    summary: 'Easy listening set and coffee specials.',
    description: 'Seeded week-three event for late April testing.',
    descriptionText: 'Seeded week-three event for late April testing.',
    start_datetime: buildIso('2026-04-12', '11:00'),
    end_datetime: buildIso('2026-04-12', '13:30'),
    event_type: 'Live music',
    status: 'Scheduled',
    locationName: 'Harbor Hall',
    address: '112 Water St, Lancaster, PA 17603',
    locationUrl: '/locations/test-harbor-hall',
    website_url: 'https://example.com/harbor-hall/tax-day-brunch',
    tickets_url: null,
    image_url: img('tax-day-acoustic-brunch'),
    imageUrl: img('tax-day-acoustic-brunch'),
    tags: [TEST_DATA_TAG, 'featured-partner', 'harbor-hall', 'weeks-3-5'],
    venue_external_id: 'test-featured-1',
    location_page_uid: 'test-harbor-hall',
  },
  {
    id: 'test-event-55',
    key: 'test-event-55',
    uid: 'test-event-55',
    title: 'Mid-April Open Mic',
    summary: 'Sign-ups at the door, two songs or ten minutes.',
    description: 'Seeded music event mid-April.',
    descriptionText: 'Seeded music event mid-April.',
    start_datetime: buildIso('2026-04-14', '19:30'),
    end_datetime: buildIso('2026-04-14', '22:00'),
    event_type: 'Live music',
    status: 'Scheduled',
    locationName: 'Harbor Hall',
    address: '112 Water St, Lancaster, PA 17603',
    locationUrl: '/locations/test-harbor-hall',
    website_url: 'https://example.com/harbor-hall/mid-april-open-mic',
    tickets_url: null,
    image_url: img('mid-april-open-mic'),
    imageUrl: img('mid-april-open-mic'),
    tags: [TEST_DATA_TAG, 'featured-partner', 'harbor-hall', 'weeks-3-5'],
    venue_external_id: 'test-featured-1',
    location_page_uid: 'test-harbor-hall',
  },
  {
    id: 'test-event-56',
    key: 'test-event-56',
    uid: 'test-event-56',
    title: 'Riverside Reggae Afternoon',
    summary: 'Daytime roots and dub on the patio.',
    description: 'Seeded Harbor Hall event Apr 16.',
    descriptionText: 'Seeded Harbor Hall event Apr 16.',
    start_datetime: buildIso('2026-04-16', '15:00'),
    end_datetime: buildIso('2026-04-16', '18:00'),
    event_type: 'Live music',
    status: 'Scheduled',
    locationName: 'Harbor Hall',
    address: '112 Water St, Lancaster, PA 17603',
    locationUrl: '/locations/test-harbor-hall',
    website_url: 'https://example.com/harbor-hall/riverside-reggae',
    tickets_url: 'https://example.com/harbor-hall/riverside-reggae/tickets',
    image_url: img('riverside-reggae-afternoon'),
    imageUrl: img('riverside-reggae-afternoon'),
    tags: [TEST_DATA_TAG, 'featured-partner', 'harbor-hall', 'weeks-3-5'],
    venue_external_id: 'test-featured-1',
    location_page_uid: 'test-harbor-hall',
  },
  {
    id: 'test-event-57',
    key: 'test-event-57',
    uid: 'test-event-57',
    title: 'Fig Lane Spring Tasting',
    summary: 'Seasonal bites from six stalls.',
    description: 'Seeded food event Apr 17.',
    descriptionText: 'Seeded food event Apr 17.',
    start_datetime: buildIso('2026-04-17', '17:00'),
    end_datetime: buildIso('2026-04-17', '20:00'),
    event_type: 'Food & drink',
    status: 'Scheduled',
    locationName: 'Fig Lane Market',
    address: '27 Fig Ln, Lancaster, PA 17602',
    locationUrl: '/locations/test-fig-lane-market',
    website_url: 'https://example.com/fig-lane-market/spring-tasting',
    tickets_url: null,
    image_url: img('fig-lane-spring-tasting'),
    imageUrl: img('fig-lane-spring-tasting'),
    tags: [TEST_DATA_TAG, 'featured-partner', 'fig-lane-market', 'weeks-3-5'],
    venue_external_id: 'test-featured-2',
    location_page_uid: 'test-fig-lane-market',
  },
  {
    id: 'test-event-58',
    key: 'test-event-58',
    uid: 'test-event-58',
    title: 'Studio Spring Open House',
    summary: 'New member orientation and studio tours.',
    description: 'Seeded arts event Apr 18.',
    descriptionText: 'Seeded arts event Apr 18.',
    start_datetime: buildIso('2026-04-18', '13:00'),
    end_datetime: buildIso('2026-04-18', '16:00'),
    event_type: 'Arts & culture',
    status: 'Scheduled',
    locationName: 'Penn Square Studio',
    address: '8 Penn Sq, Lancaster, PA 17603',
    locationUrl: '/locations/test-penn-square-studio',
    website_url: 'https://example.com/penn-square-studio/spring-open-house',
    tickets_url: null,
    image_url: img('studio-spring-open-house'),
    imageUrl: img('studio-spring-open-house'),
    tags: [TEST_DATA_TAG, 'featured-partner', 'penn-square-studio', 'weeks-3-5'],
    venue_external_id: 'test-featured-3',
    location_page_uid: 'test-penn-square-studio',
  },
  {
    id: 'test-event-59',
    key: 'test-event-59',
    uid: 'test-event-59',
    title: 'Earth Day Park Cleanup',
    summary: 'Gloves and bags provided; coffee after.',
    description: 'Seeded community event Apr 22.',
    descriptionText: 'Seeded community event Apr 22.',
    start_datetime: buildIso('2026-04-22', '09:00'),
    end_datetime: buildIso('2026-04-22', '11:30'),
    event_type: 'Community meetup',
    status: 'Scheduled',
    locationName: 'Buchanan Park',
    address: '901 Buchanan Ave, Lancaster, PA 17603',
    website_url: 'https://example.com/earth-day-cleanup',
    tickets_url: null,
    image_url: img('earth-day-park-cleanup'),
    imageUrl: img('earth-day-park-cleanup'),
    tags: [TEST_DATA_TAG, 'general-test', 'weeks-3-5'],
    venue_external_id: null,
    location_page_uid: null,
  },
  {
    id: 'test-event-60',
    key: 'test-event-60',
    uid: 'test-event-60',
    title: 'Late April DJ Loft',
    summary: 'House and disco until midnight.',
    description: 'Seeded Harbor Hall late set Apr 23.',
    descriptionText: 'Seeded Harbor Hall late set Apr 23.',
    start_datetime: buildIso('2026-04-23', '21:00'),
    end_datetime: buildIso('2026-04-23', '23:59'),
    event_type: 'DJ set',
    status: 'Scheduled',
    locationName: 'Harbor Hall',
    address: '112 Water St, Lancaster, PA 17603',
    locationUrl: '/locations/test-harbor-hall',
    website_url: 'https://example.com/harbor-hall/late-april-dj-loft',
    tickets_url: null,
    image_url: img('late-april-dj-loft'),
    imageUrl: img('late-april-dj-loft'),
    tags: [TEST_DATA_TAG, 'featured-partner', 'harbor-hall', 'weeks-3-5'],
    venue_external_id: 'test-featured-1',
    location_page_uid: 'test-harbor-hall',
  },
  {
    id: 'test-event-61',
    key: 'test-event-61',
    uid: 'test-event-61',
    title: 'Pasta Night Pop-Up',
    summary: 'Fresh pasta counter with natural wine pairings.',
    description: 'Seeded Fig Lane Apr 24.',
    descriptionText: 'Seeded Fig Lane Apr 24.',
    start_datetime: buildIso('2026-04-24', '18:00'),
    end_datetime: buildIso('2026-04-24', '21:00'),
    event_type: 'Food & drink',
    status: 'Scheduled',
    locationName: 'Fig Lane Market',
    address: '27 Fig Ln, Lancaster, PA 17602',
    locationUrl: '/locations/test-fig-lane-market',
    website_url: 'https://example.com/fig-lane-market/pasta-night',
    tickets_url: null,
    image_url: img('pasta-night-pop-up'),
    imageUrl: img('pasta-night-pop-up'),
    tags: [TEST_DATA_TAG, 'featured-partner', 'fig-lane-market', 'weeks-3-5'],
    venue_external_id: 'test-featured-2',
    location_page_uid: 'test-fig-lane-market',
  },
  {
    id: 'test-event-62',
    key: 'test-event-62',
    uid: 'test-event-62',
    title: 'Life Drawing Marathon',
    summary: 'Three hours, rotating poses, bring your own board.',
    description: 'Seeded Penn Square Apr 25.',
    descriptionText: 'Seeded Penn Square Apr 25.',
    start_datetime: buildIso('2026-04-25', '14:00'),
    end_datetime: buildIso('2026-04-25', '17:00'),
    event_type: 'Arts & culture',
    status: 'Scheduled',
    locationName: 'Penn Square Studio',
    address: '8 Penn Sq, Lancaster, PA 17603',
    locationUrl: '/locations/test-penn-square-studio',
    website_url: 'https://example.com/penn-square-studio/life-drawing-marathon',
    tickets_url: 'https://example.com/penn-square-studio/life-drawing-marathon/tickets',
    image_url: img('life-drawing-marathon'),
    imageUrl: img('life-drawing-marathon'),
    tags: [TEST_DATA_TAG, 'featured-partner', 'penn-square-studio', 'weeks-3-5'],
    venue_external_id: 'test-featured-3',
    location_page_uid: 'test-penn-square-studio',
  },
  {
    id: 'test-event-63',
    key: 'test-event-63',
    uid: 'test-event-63',
    title: 'April Last-Call Market',
    summary: 'Extended hours vendor hall.',
    description: 'Seeded market Apr 26.',
    descriptionText: 'Seeded market Apr 26.',
    start_datetime: buildIso('2026-04-26', '16:00'),
    end_datetime: buildIso('2026-04-26', '21:00'),
    event_type: 'Community market',
    status: 'Scheduled',
    locationName: 'Queen Street Commons',
    address: '100 S Queen St, Lancaster, PA 17603',
    website_url: 'https://example.com/april-last-call-market',
    tickets_url: null,
    image_url: img('april-last-call-market'),
    imageUrl: img('april-last-call-market'),
    tags: [TEST_DATA_TAG, 'general-test', 'weeks-3-5'],
    venue_external_id: null,
    location_page_uid: null,
  },
  {
    id: 'test-event-64',
    key: 'test-event-64',
    uid: 'test-event-64',
    title: 'Harbor Hall May Eve',
    summary: 'Full band send-off for April.',
    description: 'Seeded live music Apr 29.',
    descriptionText: 'Seeded live music Apr 29.',
    start_datetime: buildIso('2026-04-29', '20:00'),
    end_datetime: buildIso('2026-04-29', '23:00'),
    event_type: 'Live music',
    status: 'Scheduled',
    locationName: 'Harbor Hall',
    address: '112 Water St, Lancaster, PA 17603',
    locationUrl: '/locations/test-harbor-hall',
    website_url: 'https://example.com/harbor-hall/may-eve',
    tickets_url: 'https://example.com/harbor-hall/may-eve/tickets',
    image_url: img('harbor-hall-may-eve'),
    imageUrl: img('harbor-hall-may-eve'),
    tags: [TEST_DATA_TAG, 'featured-partner', 'harbor-hall', 'weeks-3-5'],
    venue_external_id: 'test-featured-1',
    location_page_uid: 'test-harbor-hall',
  },
  {
    id: 'test-event-65',
    key: 'test-event-65',
    uid: 'test-event-65',
    title: 'May Day Baker’s Breakfast',
    summary: 'Sweet and savory trays, early birds welcome.',
    description: 'Seeded food May 1.',
    descriptionText: 'Seeded food May 1.',
    start_datetime: buildIso('2026-05-01', '08:00'),
    end_datetime: buildIso('2026-05-01', '11:00'),
    event_type: 'Food & drink',
    status: 'Scheduled',
    locationName: 'Fig Lane Market',
    address: '27 Fig Ln, Lancaster, PA 17602',
    locationUrl: '/locations/test-fig-lane-market',
    website_url: 'https://example.com/fig-lane-market/may-day-breakfast',
    tickets_url: null,
    image_url: img('may-day-bakers-breakfast'),
    imageUrl: img('may-day-bakers-breakfast'),
    tags: [TEST_DATA_TAG, 'featured-partner', 'fig-lane-market', 'weeks-3-5'],
    venue_external_id: 'test-featured-2',
    location_page_uid: 'test-fig-lane-market',
  },
  {
    id: 'test-event-66',
    key: 'test-event-66',
    uid: 'test-event-66',
    title: 'First Weekend in May Studio Sale',
    summary: 'Discounted prints and small works.',
    description: 'Seeded arts May 2.',
    descriptionText: 'Seeded arts May 2.',
    start_datetime: buildIso('2026-05-02', '10:00'),
    end_datetime: buildIso('2026-05-02', '15:00'),
    event_type: 'Arts & culture',
    status: 'Scheduled',
    locationName: 'Penn Square Studio',
    address: '8 Penn Sq, Lancaster, PA 17603',
    locationUrl: '/locations/test-penn-square-studio',
    website_url: 'https://example.com/penn-square-studio/may-studio-sale',
    tickets_url: null,
    image_url: img('may-studio-sale'),
    imageUrl: img('may-studio-sale'),
    tags: [TEST_DATA_TAG, 'featured-partner', 'penn-square-studio', 'weeks-3-5'],
    venue_external_id: 'test-featured-3',
    location_page_uid: 'test-penn-square-studio',
  },
  {
    id: 'test-event-67',
    key: 'test-event-67',
    uid: 'test-event-67',
    title: 'Warehouse Yard May Kickoff',
    summary: 'Outdoor films and food trucks.',
    description: 'Seeded Other category May 2 evening.',
    descriptionText: 'Seeded Other category May 2 evening.',
    start_datetime: buildIso('2026-05-02', '19:30'),
    end_datetime: buildIso('2026-05-02', '22:00'),
    event_type: 'Outdoor screening',
    status: 'Scheduled',
    locationName: 'Warehouse Yard',
    address: '320 N Mulberry St, Lancaster, PA 17603',
    website_url: 'https://example.com/warehouse-may-kickoff',
    tickets_url: null,
    image_url: img('warehouse-may-kickoff'),
    imageUrl: img('warehouse-may-kickoff'),
    tags: [TEST_DATA_TAG, 'general-test', 'weeks-3-5'],
    venue_external_id: null,
    location_page_uid: null,
  },
];

export const testEvents: EventLite[] = [
  ...featuredPartnerEvents,
  ...extraWeekEvents,
  ...followingWeekEvents,
  ...lateAprilThroughEarlyMayEvents,
];

export const testUpdates: UpdateLite[] = [
  {
    id: 'test-update-1',
    title: 'Test data note',
    summary: 'Staging-only seeded content spans Mar 29–May 2 (including weeks through early May for overview QA).',
    date: 'Mar 25, 2026',
    sortDate: '2026-03-25',
    tags: [TEST_DATA_TAG, 'announcement'],
    body: 'Seeded events cover late March through May 2 so weekly overview week rails and category counts can be tested across multiple buckets. Remove items tagged WNL_TEST_DATA_2026_03 when real content is ready.',
    link: null,
    pinned: true,
  },
];

export function getTestPartnerPage(uid: string) {
  return testPartnerPages.find((page) => page.uid === uid) ?? null;
}
