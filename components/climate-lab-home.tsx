'use client'

import Image from 'next/image'
import Link from 'next/link'
import {
  ArrowUpRight,
  Compass,
  FlaskConical,
  Globe2,
  Menu,
  Newspaper,
  Search,
  X,
} from 'lucide-react'
import { useState } from 'react'

function PlainButton({ children, onClick, label }: { children: React.ReactNode; onClick?: () => void; label?: string }) {
  return <button type="button" onClick={onClick} aria-label={label} className="inline-flex items-center justify-center border border-transparent px-3 py-2 text-sm transition-colors hover:bg-foreground/5">{children}</button>
}

type HomeEvent = { slug: string; number: string; date: string; location: string; title: string; description: string; tag: string }

export function ClimateLabHome({ events }: { events: HomeEvent[] }) {
  const [searchOpen, setSearchOpen] = useState(false)

  return (
    <main className="min-h-screen bg-background text-foreground">
      <header className="border-b border-border/80 bg-background/95">
        <div className="mx-auto flex max-w-[1440px] items-center justify-between px-6 py-5 lg:px-10">
          <Link href="/" className="flex items-center gap-3" aria-label="Climate Litigation Lab home">
            <Image src="/climate-justice-counsel-emblem.png" alt="Climate Justice Counsel emblem" width={64} height={64} className="size-14 shrink-0 object-contain" priority />
            <span className="font-serif text-lg tracking-tight">Climate Litigation Lab</span>
          </Link>
          <nav className="hidden items-center gap-8 text-[11px] font-medium uppercase tracking-[0.18em] text-muted-foreground md:flex">
            <a href="#events" className="transition-colors hover:text-foreground">Events</a>
            <Link href="/evidence" className="transition-colors hover:text-foreground">Evidence Workspace</Link>
            <Link href="/news" className="transition-colors hover:text-foreground">News</Link>
            <button onClick={() => setSearchOpen(true)} className="inline-flex items-center gap-2 transition-colors hover:text-foreground" aria-label="Open site search">
              <Search className="size-3.5" /> Search
            </button>
          </nav>
          <div className="md:hidden"><PlainButton label="Open navigation"><Menu className="size-5" /></PlainButton></div>
        </div>
      </header>

      <section className="relative isolate overflow-hidden border-b border-border/80">
        <div className="absolute inset-0 -z-20 bg-[url('https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Lab%20hero-CbpL5OlPTJyWbRLflrZX0qBHLP1u0V.png')] bg-cover bg-center opacity-55" />
        <div className="absolute inset-0 -z-10 bg-background/70" />
        <div className="mx-auto flex min-h-[650px] max-w-[1440px] flex-col justify-between px-6 py-10 lg:px-10 lg:py-14">
          <div className="flex items-center justify-between text-[10px] uppercase tracking-[0.22em] text-muted-foreground">
            <span>Established 2026 · Climate Justice Counsel</span>
            <span className="hidden items-center gap-2 md:flex"><Globe2 className="size-3.5 text-primary" /> A global research platform</span>
          </div>
          <div className="grid gap-12 lg:grid-cols-[1.2fr_0.8fr] lg:items-end">
            <div>
              <p className="mb-6 text-[11px] font-medium uppercase tracking-[0.24em] text-primary">An evolving record of climate law</p>
              <h1 className="max-w-4xl font-serif text-6xl leading-[0.9] tracking-[-0.055em] sm:text-7xl lg:text-[8.5rem]">Climate<br />Litigation<br /><em className="text-primary">Lab</em></h1>
            </div>
            <div className="max-w-sm border-l border-primary/70 pl-6 lg:mb-3">
              <p className="font-serif text-2xl leading-tight">A place to gather, examine, and share the legal response to a changing climate.</p>
              <p className="mt-6 text-sm leading-6 text-muted-foreground">The Lab convenes scholars, advocates, and communities around the cases and questions that are defining climate accountability.</p>
            </div>
          </div>
          <div className="border-t border-foreground/20 pt-5 text-[10px] uppercase tracking-[0.2em] text-muted-foreground">
            <span>Research · Events · Evidence</span>
          </div>
        </div>
      </section>

      <section id="events" className="mx-auto max-w-[1440px] px-6 py-24 lg:px-10 lg:py-32">
        <div className="mb-14 flex flex-col justify-between gap-5 border-b border-border pb-6 md:flex-row md:items-end">
          <div><p className="mb-4 text-[10px] uppercase tracking-[0.22em] text-primary">01 / Gatherings</p><h2 className="font-serif text-5xl tracking-[-0.04em] md:text-6xl">Upcoming events</h2></div>
          <p className="max-w-xs text-sm leading-6 text-muted-foreground">Conversations that bring the law into contact with the lived realities of climate change.</p>
        </div>
        <div className="grid gap-5 lg:grid-cols-2">
          {events.map((event) => <EventCard key={event.slug} event={event} />)}
        </div>
      </section>

      <section id="about" className="border-y border-border bg-secondary/35">
        <div className="mx-auto grid max-w-[1440px] gap-12 px-6 py-24 lg:grid-cols-[0.7fr_1.3fr] lg:px-10 lg:py-32">
          <div><p className="mb-5 text-[10px] uppercase tracking-[0.22em] text-primary">02 / The Lab</p><Compass className="size-10 text-primary" strokeWidth={1} /></div>
          <div><p className="max-w-3xl font-serif text-4xl leading-[1.08] tracking-[-0.035em] md:text-6xl">Climate litigation is not one field. It is a constellation of claims, courts, communities, and forms of evidence.</p><p className="mt-8 max-w-xl text-base leading-7 text-muted-foreground">The Climate Litigation Lab is an open research platform for tracing those connections. We document the arguments, people, places, and precedents shaping the next generation of climate law.</p></div>
        </div>
      </section>

      <section id="workspace" className="mx-auto max-w-[1440px] px-6 py-24 lg:px-10 lg:py-32">
        <div className="mb-14 flex flex-col justify-between gap-5 border-b border-border pb-6 md:flex-row md:items-end">
          <div><p className="mb-4 text-[10px] uppercase tracking-[0.22em] text-primary">03 / In development</p><h2 className="font-serif text-5xl tracking-[-0.04em] md:text-6xl">Lab tools</h2></div>
          <p className="max-w-sm text-sm leading-6 text-muted-foreground">Tools for building cases from evidence and interpreting the legal developments that may shape them.</p>
        </div>

        <div className="grid gap-5 lg:grid-cols-2">
          <Link href="/evidence" className="group flex min-h-[360px] flex-col justify-between border border-border p-7 transition-colors hover:border-primary hover:bg-secondary/40 lg:p-10">
            <div>
              <span className="text-[10px] uppercase tracking-[0.18em] text-primary">01 · Prototype live</span>
              <FlaskConical className="mt-12 size-8 text-primary" strokeWidth={1.25} />
            </div>
            <div className="mt-14">
              <h3 className="font-serif text-4xl tracking-[-0.03em] md:text-5xl">Evidence Workspace</h3>
              <p className="mt-5 max-w-xl text-sm leading-7 text-muted-foreground">Build the evidentiary record alongside the case. Explore demo private records and public sources, then see where each item supports an issue, creates tension, or reveals an evidence gap.</p>
              <span className="mt-8 inline-flex items-center gap-2 text-[10px] uppercase tracking-[0.18em] text-primary">Open Evidence Workspace <ArrowUpRight className="size-3.5" /></span>
            </div>
          </Link>

          <Link href="/news" className="group flex min-h-[360px] flex-col justify-between border border-border p-7 transition-colors hover:border-primary hover:bg-secondary/40 lg:p-10">
            <div>
              <span className="text-[10px] uppercase tracking-[0.18em] text-primary">02 · Publishing live</span>
              <Newspaper className="mt-12 size-8 text-primary" strokeWidth={1.25} />
            </div>
            <div className="mt-14">
              <h3 className="font-serif text-4xl tracking-[-0.03em] md:text-5xl">News</h3>
              <p className="mt-5 max-w-xl text-sm leading-7 text-muted-foreground">Recent climate cases and legal developments, with concise summaries and Climate Justice Counsel's analysis of what they mean. Rather than duplicating a case database, each entry will add our perspective on the reasoning, implications, and questions the development raises.</p>
              <span className="mt-8 inline-flex items-center gap-2 text-[10px] uppercase tracking-[0.18em] text-primary">Explore News & Analysis <ArrowUpRight className="size-3.5" /></span>
            </div>
          </Link>
        </div>
      </section>

      <section className="mx-auto max-w-[1440px] px-6 pb-24 lg:px-10"><div className="mb-10 flex items-end justify-between border-b border-border pb-6"><div><p className="mb-4 text-[10px] uppercase tracking-[0.22em] text-primary">04 / Archive</p><h2 className="font-serif text-5xl tracking-[-0.04em] md:text-6xl">Past events</h2></div></div><div className="border border-border px-6 py-10"><p className="max-w-xl text-sm leading-7 text-muted-foreground">No archived events yet. Completed Climate Litigation Lab sessions will appear here as their public case pages and materials are released.</p></div></section>

      <footer className="border-t border-border bg-foreground text-background"><div className="mx-auto flex max-w-[1440px] flex-col gap-10 px-6 py-12 lg:flex-row lg:items-end lg:justify-between lg:px-10"><div><div className="flex items-center gap-3"><Image src="/climate-justice-counsel-emblem.png" alt="Climate Justice Counsel emblem" width={56} height={56} className="size-12 shrink-0 object-contain" /><span className="font-serif text-xl">Climate Litigation Lab</span></div><p className="mt-5 max-w-sm text-sm leading-6 text-background/60">An open research platform by Climate Justice Counsel.</p></div><div className="flex flex-wrap gap-x-8 gap-y-3 text-[10px] uppercase tracking-[0.18em] text-background/60"><a href="https://climatejusticecounsel.org" target="_blank" rel="noreferrer" className="hover:text-background">Climate Justice Counsel</a><a href="mailto:lab@climatejusticecounsel.org" className="hover:text-background">Contact</a><span>© 2026</span></div></div></footer>

      {searchOpen && <div className="fixed inset-0 z-50 flex items-start justify-center bg-foreground/40 p-6 pt-28" role="dialog" aria-modal="true" aria-label="Search"><div className="w-full max-w-xl bg-background p-6 shadow-2xl"><div className="flex items-center justify-between border-b border-border pb-4"><span className="font-serif text-2xl">Search the Lab</span><PlainButton onClick={() => setSearchOpen(false)} label="Close search"><X className="size-5" /></PlainButton></div><div className="mt-8 flex items-center gap-3 border-b border-border pb-3"><Search className="size-5 text-muted-foreground" /><input autoFocus className="w-full bg-transparent font-serif text-2xl outline-none placeholder:text-muted-foreground" placeholder="Cases, events, jurisdictions..." /></div></div></div>}
    </main>
  )
}

function EventCard({ event }: { event: HomeEvent }) {
  return <Link href={`/events/${event.slug}`} className="group block border border-border p-7 transition-colors hover:border-primary hover:bg-secondary/40"><div className="flex items-start justify-between"><span className="text-[10px] uppercase tracking-[0.2em] text-primary">{event.number} · {event.tag}</span><ArrowUpRight className="size-5 text-muted-foreground transition-transform group-hover:-translate-y-1 group-hover:translate-x-1 group-hover:text-primary" /></div><div className="mt-20 grid gap-8 md:grid-cols-[0.35fr_1fr]"><div><p className="font-serif text-2xl">{event.date}</p><p className="mt-2 text-xs leading-5 text-muted-foreground">{event.location}</p></div><div><h3 className="max-w-xl font-serif text-3xl leading-tight md:text-4xl">{event.title}</h3><p className="mt-5 max-w-lg text-sm leading-6 text-muted-foreground">{event.description}</p><span className="mt-7 inline-flex items-center gap-2 text-[10px] uppercase tracking-[0.18em] text-primary">View event <ArrowUpRight className="size-3.5" /></span></div></div></Link>
}
