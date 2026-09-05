'use client'

import Image from 'next/image'
import Link from 'next/link'
import { eventData } from '@/lib/event-data'
import {
  ArrowUpRight,
  BookOpen,
  Compass,
  Globe2,
  Layers3,
  Menu,
  Search,
  X,
} from 'lucide-react'
import { useState } from 'react'

function PlainButton({ children, onClick, label }: { children: React.ReactNode; onClick?: () => void; label?: string }) {
  return <button type="button" onClick={onClick} aria-label={label} className="inline-flex items-center justify-center border border-transparent px-3 py-2 text-sm transition-colors hover:bg-foreground/5">{children}</button>
}

const pastEvents = [
  ['2026', 'The Climate Casebook: Evidence, Expertise, and the Courtroom', 'London · online'],
  ['2025', 'Public Law in a Warming World', 'The Hague'],
  ['2025', 'Litigating the Transition', 'New York · online'],
]

export function ClimateLabHome() {
  const [searchOpen, setSearchOpen] = useState(false)

  return (
    <main className="min-h-screen bg-background text-foreground">
      <header className="border-b border-border/80 bg-background/95">
        <div className="mx-auto flex max-w-[1440px] items-center justify-between px-6 py-5 lg:px-10">
          <Link href="/" className="flex items-center gap-3" aria-label="Climate Litigation Lab home">
            <Image src="/climate-justice-counsel-emblem.png" alt="Climate Justice Counsel emblem" width={42} height={42} className="size-10 object-contain" priority />
            <span className="font-serif text-lg tracking-tight">Climate Litigation Lab</span>
          </Link>
          <nav className="hidden items-center gap-8 text-[11px] font-medium uppercase tracking-[0.18em] text-muted-foreground md:flex">
            <a href="#events" className="transition-colors hover:text-foreground">Events</a>
            <a href="#research" className="transition-colors hover:text-foreground">Research</a>
            <a href="#about" className="transition-colors hover:text-foreground">About</a>
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
          <div className="flex items-end justify-between border-t border-foreground/20 pt-5 text-[10px] uppercase tracking-[0.2em] text-muted-foreground">
            <span>Research · Events · Evidence</span><span>Scroll to explore ↓</span>
          </div>
        </div>
      </section>

      <section id="events" className="mx-auto max-w-[1440px] px-6 py-24 lg:px-10 lg:py-32">
        <div className="mb-14 flex flex-col justify-between gap-5 border-b border-border pb-6 md:flex-row md:items-end">
          <div><p className="mb-4 text-[10px] uppercase tracking-[0.22em] text-primary">01 / Gatherings</p><h2 className="font-serif text-5xl tracking-[-0.04em] md:text-6xl">Upcoming events</h2></div>
          <p className="max-w-xs text-sm leading-6 text-muted-foreground">Conversations that bring the law into contact with the lived realities of climate change.</p>
        </div>
        <div className="grid gap-5 lg:grid-cols-2">
          {eventData.map((event) => <EventCard key={event.slug} event={event} />)}
        </div>
      </section>

      <section id="about" className="border-y border-border bg-secondary/35">
        <div className="mx-auto grid max-w-[1440px] gap-12 px-6 py-24 lg:grid-cols-[0.7fr_1.3fr] lg:px-10 lg:py-32">
          <div><p className="mb-5 text-[10px] uppercase tracking-[0.22em] text-primary">02 / The Lab</p><Compass className="size-10 text-primary" strokeWidth={1} /></div>
          <div><p className="max-w-3xl font-serif text-4xl leading-[1.08] tracking-[-0.035em] md:text-6xl">Climate litigation is not one field. It is a constellation of claims, courts, communities, and forms of evidence.</p><p className="mt-8 max-w-xl text-base leading-7 text-muted-foreground">The Climate Litigation Lab is an open research platform for tracing those connections. We document the arguments, people, places, and precedents shaping the next generation of climate law.</p></div>
        </div>
      </section>

      <section id="research" className="mx-auto max-w-[1440px] px-6 py-24 lg:px-10 lg:py-32">
        <div className="mb-14 flex items-end justify-between border-b border-border pb-6"><div><p className="mb-4 text-[10px] uppercase tracking-[0.22em] text-primary">03 / In development</p><h2 className="font-serif text-5xl tracking-[-0.04em] md:text-6xl">Research tools</h2></div><Layers3 className="hidden size-8 text-primary md:block" strokeWidth={1} /></div>
        <div className="grid border-l border-t border-border md:grid-cols-3">
          {[['Case atlas', 'A living index of climate cases, claims, remedies, and outcomes across jurisdictions.'], ['Evidence room', 'A structured archive for expert knowledge, scientific findings, and public records.'], ['Jurisdiction map', 'A visual way to follow how climate law travels between courts, places, and institutions.']].map(([title, description], index) => <div key={title} className="group min-h-72 border-b border-r border-border p-7 transition-colors hover:bg-secondary/50"><span className="text-[10px] tracking-[0.18em] text-primary">0{index + 1}</span><BookOpen className="mt-16 size-6 text-muted-foreground transition-colors group-hover:text-primary" strokeWidth={1.25} /><h3 className="mt-6 font-serif text-3xl">{title}</h3><p className="mt-3 max-w-xs text-sm leading-6 text-muted-foreground">{description}</p></div>)}
        </div>
      </section>

      <section className="mx-auto max-w-[1440px] px-6 pb-24 lg:px-10"><div className="mb-10 flex items-end justify-between border-b border-border pb-6"><div><p className="mb-4 text-[10px] uppercase tracking-[0.22em] text-primary">04 / Archive</p><h2 className="font-serif text-5xl tracking-[-0.04em] md:text-6xl">Past events</h2></div></div><div>{pastEvents.map(([year, title, place]) => <div key={title} className="grid gap-3 border-b border-border py-5 text-sm md:grid-cols-[0.2fr_1fr_0.4fr] md:items-center"><span className="text-primary">{year}</span><span className="font-serif text-2xl">{title}</span><span className="text-muted-foreground md:text-right">{place}</span></div>)}</div></section>

      <footer className="border-t border-border bg-foreground text-background"><div className="mx-auto flex max-w-[1440px] flex-col gap-10 px-6 py-12 lg:flex-row lg:items-end lg:justify-between lg:px-10"><div><div className="flex items-center gap-3"><Image src="/climate-justice-counsel-emblem.png" alt="Climate Justice Counsel emblem" width={38} height={38} className="size-9 object-contain brightness-0 invert" /><span className="font-serif text-xl">Climate Litigation Lab</span></div><p className="mt-5 max-w-sm text-sm leading-6 text-background/60">An open research platform by Climate Justice Counsel.</p></div><div className="flex flex-wrap gap-x-8 gap-y-3 text-[10px] uppercase tracking-[0.18em] text-background/60"><a href="https://climatejusticecounsel.org" target="_blank" rel="noreferrer" className="hover:text-background">Climate Justice Counsel</a><a href="mailto:lab@climatejusticecounsel.org" className="hover:text-background">Contact</a><span>© 2026</span></div></div></footer>

      {searchOpen && <div className="fixed inset-0 z-50 flex items-start justify-center bg-foreground/40 p-6 pt-28" role="dialog" aria-modal="true" aria-label="Search"><div className="w-full max-w-xl bg-background p-6 shadow-2xl"><div className="flex items-center justify-between border-b border-border pb-4"><span className="font-serif text-2xl">Search the Lab</span><PlainButton onClick={() => setSearchOpen(false)} label="Close search"><X className="size-5" /></PlainButton></div><div className="mt-8 flex items-center gap-3 border-b border-border pb-3"><Search className="size-5 text-muted-foreground" /><input autoFocus className="w-full bg-transparent font-serif text-2xl outline-none placeholder:text-muted-foreground" placeholder="Cases, events, jurisdictions..." /></div></div></div>}
    </main>
  )
}

function EventCard({ event }: { event: (typeof upcomingEvents)[number] }) {
  return <Link href={`/events/${event.slug}`} className="group block border border-border p-7 transition-colors hover:border-primary hover:bg-secondary/40"><div className="flex items-start justify-between"><span className="text-[10px] uppercase tracking-[0.2em] text-primary">{event.number} · {event.tag}</span><ArrowUpRight className="size-5 text-muted-foreground transition-transform group-hover:-translate-y-1 group-hover:translate-x-1 group-hover:text-primary" /></div><div className="mt-20 grid gap-8 md:grid-cols-[0.35fr_1fr]"><div><p className="font-serif text-2xl">{event.date}</p><p className="mt-2 text-xs leading-5 text-muted-foreground">{event.location}</p></div><div><h3 className="max-w-xl font-serif text-3xl leading-tight md:text-4xl">{event.title}</h3><p className="mt-5 max-w-lg text-sm leading-6 text-muted-foreground">{event.description}</p><span className="mt-7 inline-flex items-center gap-2 text-[10px] uppercase tracking-[0.18em] text-primary">View event <ArrowUpRight className="size-3.5" /></span></div></div></Link>
}

