import { ClimateLabHome } from '@/components/climate-lab-home'
import { eventData } from '@/lib/event-data'
import { getPublishedEvents } from '@/sanity/lib/queries'

function formatEventDate(value?: string) {
  if (!value) return 'DATE TO BE ANNOUNCED'
  return new Intl.DateTimeFormat('en', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
    timeZone: 'UTC',
  }).format(new Date(value)).toUpperCase()
}

export default async function Home() {
  let events = eventData.map((event) => ({ ...event }))

  try {
    const published = await getPublishedEvents()
    if (published.length > 0) {
      events = published.map((event, index) => ({
        slug: event.slug,
        number: String(index + 1).padStart(2, '0'),
        date: formatEventDate(event.date),
        location: event.location || 'Location to be announced',
        title: event.title,
        description: event.summary || 'Event details will be published shortly.',
        tag: 'Published event',
      }))
    }
  } catch {
    // Keep the current static event cards if Sanity is temporarily unavailable.
  }

  return <ClimateLabHome events={events} />
}
