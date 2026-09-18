import Image from 'next/image'
import Link from 'next/link'
import { ArrowLeft, ArrowUpRight, CalendarDays, MapPin, Play, Users } from 'lucide-react'
import { notFound } from 'next/navigation'
import { eventData } from '@/lib/event-data'
import { getPublishedEvent, type PublishedEvent } from '@/sanity/lib/queries'

function formatDate(value?: string) {
  if (!value) return 'Date to be announced'
  return new Intl.DateTimeFormat('en', {
    weekday: 'long',
    day: 'numeric',
    month: 'long',
    year: 'numeric',
    timeZone: 'UTC',
  }).format(new Date(value))
}

type EventPageProps = { params: Promise<{ slug: string }> }

export default async function EventPage({ params }: EventPageProps) {
  const { slug } = await params
  let event: PublishedEvent | null = null

  try {
    event = await getPublishedEvent(slug)
  } catch {
    event = null
  }

  if (!event) {
    const fallback = eventData.find((item) => item.slug === slug)
    if (!fallback) notFound()
    event = {
      _id: fallback.slug,
      slug: fallback.slug,
      title: fallback.title,
      location: fallback.location,
      summary: fallback.description,
    }
  }

  const hasSpeakers = Boolean(event.speakers?.length)
  const hasProgram = Boolean(event.program?.length)
  const hasResources = Boolean(event.resources?.length)

  return (
    <main className="min-h-screen bg-background text-foreground">
      <header className="border-b border-border">
        <div className="mx-auto flex max-w-[1200px] items-center justify-between px-6 py-5 lg:px-10">
          <Link href="/" className="flex items-center gap-3">
            <Image src="/climate-justice-counsel-emblem.png" alt="Climate Justice Counsel emblem" width={56} height={56} className="size-12 object-contain" />
            <span className="font-serif text-lg">Climate Litigation Lab</span>
          </Link>
          <Link href="/" className="text-[10px] uppercase tracking-[0.18em] text-muted-foreground hover:text-foreground">
            <ArrowLeft className="mr-2 inline size-3.5" /> Back to Lab
          </Link>
        </div>
      </header>

      <div className="mx-auto max-w-[1200px] px-6 py-16 lg:px-10 lg:py-24">
        <div className="max-w-4xl">
          <p className="mb-6 text-[10px] uppercase tracking-[0.22em] text-primary">Event dossier</p>
          <h1 className="font-serif text-5xl leading-[0.95] tracking-[-0.05em] md:text-8xl">{event.title}</h1>
          {event.summary && <p className="mt-8 max-w-2xl text-lg leading-8 text-muted-foreground">{event.summary}</p>}
        </div>

        <div className="mt-16 grid gap-8 border-y border-border py-7 md:grid-cols-3">
          <Meta icon={<CalendarDays />} label="Date" value={formatDate(event.date)} />
          <Meta icon={<MapPin />} label="Location" value={event.location || 'To be announced'} />
          <Meta icon={<Users />} label="Format" value={event.presentationEnabled ? 'Workshop · Interactive presentation' : 'Workshop'} />
        </div>

        {event.presentationEnabled && (
          <div className="mt-14">
            <button type="button" className="inline-flex items-center border border-primary bg-primary px-5 py-3 text-sm text-primary-foreground">
              <Play className="mr-2 size-4" /> Launch Interactive Presentation
            </button>
          </div>
        )}

        <div className="mt-24 grid gap-16 lg:grid-cols-[0.75fr_1.25fr]">
          <aside>
            <p className="text-[10px] uppercase tracking-[0.22em] text-primary">On this page</p>
            <div className="mt-5 space-y-3 text-sm text-muted-foreground">
              <a href="#overview" className="block hover:text-foreground">Overview</a>
              {hasSpeakers && <a href="#speakers" className="block hover:text-foreground">Speakers</a>}
              {hasProgram && <a href="#program" className="block hover:text-foreground">Programme</a>}
              {hasResources && <a href="#resources" className="block hover:text-foreground">Resources</a>}
            </div>
          </aside>

          <div className="space-y-20">
            <section id="overview">
              <p className="mb-5 text-[10px] uppercase tracking-[0.22em] text-primary">01 / Overview</p>
              <h2 className="font-serif text-4xl">About this event</h2>
              <p className="mt-6 max-w-2xl whitespace-pre-line text-base leading-8 text-muted-foreground">
                {event.summary || 'Further event details will be published here.'}
              </p>
            </section>

            {hasSpeakers && (
              <section id="speakers">
                <p className="mb-5 text-[10px] uppercase tracking-[0.22em] text-primary">02 / Speakers</p>
                <div className="divide-y divide-border border-y border-border">
                  {event.speakers?.map((speaker) => (
                    <div key={speaker._id} className="py-5">
                      <span className="font-serif text-2xl">{speaker.name}</span>
                      {(speaker.role || speaker.organization) && (
                        <p className="mt-2 text-sm text-muted-foreground">
                          {[speaker.role, speaker.organization].filter(Boolean).join(' · ')}
                        </p>
                      )}
                      {speaker.bio && <p className="mt-3 max-w-2xl text-sm leading-7 text-muted-foreground">{speaker.bio}</p>}
                    </div>
                  ))}
                </div>
              </section>
            )}

            {hasProgram && (
              <section id="program">
                <p className="mb-5 text-[10px] uppercase tracking-[0.22em] text-primary">03 / Programme</p>
                <div className="divide-y divide-border border-y border-border">
                  {event.program?.map((item, index) => (
                    <div key={index} className="grid gap-3 py-5 sm:grid-cols-[0.25fr_1fr]">
                      <span className="text-sm text-primary">{item.time || '—'}</span>
                      <div>
                        <span className="font-serif text-2xl">{item.title || 'Programme item'}</span>
                        {item.description && <p className="mt-2 text-sm leading-7 text-muted-foreground">{item.description}</p>}
                      </div>
                    </div>
                  ))}
                </div>
              </section>
            )}

            {hasResources && (
              <section id="resources">
                <p className="mb-5 text-[10px] uppercase tracking-[0.22em] text-primary">04 / Resources</p>
                <div className="grid gap-3 sm:grid-cols-2">
                  {event.resources?.filter((resource) => resource.url).map((resource, index) => (
                    <a key={index} href={resource.url} target="_blank" rel="noreferrer" className="flex items-center justify-between border border-border p-5 text-sm hover:border-primary">
                      {resource.label || 'Resource'} <ArrowUpRight className="size-4 text-primary" />
                    </a>
                  ))}
                </div>
              </section>
            )}
          </div>
        </div>
      </div>
    </main>
  )
}

function Meta({ icon, label, value }: { icon: React.ReactNode; label: string; value: string }) {
  return <div className="flex gap-3"><span className="text-primary">{icon}</span><div><p className="text-[10px] uppercase tracking-[0.18em] text-muted-foreground">{label}</p><p className="mt-2 text-sm">{value}</p></div></div>
}
