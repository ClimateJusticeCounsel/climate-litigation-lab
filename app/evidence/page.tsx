'use client'

import { useMemo, useState } from 'react'
import Link from 'next/link'
import {
  ArrowLeft,
  ArrowUpRight,
  CheckCircle2,
  CircleAlert,
  CircleDot,
  FileSearch,
  Filter,
  FlaskConical,
  Gavel,
  Link2,
  Search,
  ShieldCheck,
} from 'lucide-react'
import { LocalFileFingerprint } from '@/components/local-file-fingerprint'
import { evidenceDemo, evidenceIssues, type EvidenceItem } from '@/lib/evidence-demo'

const relationLabel = {
  supports: 'Supports',
  challenges: 'Challenges',
  contextualizes: 'Context',
  gap: 'Gap',
} as const

export default function EvidenceWorkspaceDemo() {
  const [query, setQuery] = useState('')
  const [issue, setIssue] = useState('All issues')
  const [status, setStatus] = useState<'all' | 'synthetic' | 'public-source'>('all')
  const [selectedId, setSelectedId] = useState(evidenceDemo[0]?.id ?? '')

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase()
    return evidenceDemo.filter((item) => {
      const matchesQuery =
        !q ||
        [item.id, item.title, item.summary, item.sourceLabel, item.locator, ...item.tags]
          .join(' ')
          .toLowerCase()
          .includes(q)
      const matchesIssue =
        issue === 'All issues' || item.relations.some((relation) => relation.issue === issue)
      const matchesStatus = status === 'all' || item.status === status
      return matchesQuery && matchesIssue && matchesStatus
    })
  }, [query, issue, status])

  const selected = evidenceDemo.find((item) => item.id === selectedId) ?? filtered[0] ?? evidenceDemo[0]

  return (
    <main className="min-h-screen bg-background text-foreground">
      <header className="border-b border-border">
        <div className="mx-auto flex max-w-[1440px] items-center justify-between px-6 py-5 lg:px-10">
          <Link href="/" className="flex items-center gap-3">
            <span className="flex size-9 items-center justify-center border border-foreground/70 text-primary">
              <Gavel className="size-4" strokeWidth={1.5} />
            </span>
            <span className="font-serif text-lg">Climate Litigation Lab</span>
          </Link>
          <Link href="/" className="text-[10px] uppercase tracking-[0.18em] text-muted-foreground hover:text-foreground">
            <ArrowLeft className="mr-2 inline size-3.5" /> Back to Lab
          </Link>
        </div>
      </header>

      <section className="mx-auto max-w-[1440px] px-6 py-10 lg:px-10">
        <div className="flex flex-col gap-7 border-b border-border pb-8 lg:flex-row lg:items-end lg:justify-between">
          <div className="max-w-3xl">
            <div className="mb-4 flex items-center gap-2 text-[10px] uppercase tracking-[0.22em] text-primary">
              <FlaskConical className="size-3.5" /> Prototype / synthetic case
            </div>
            <h1 className="font-serif text-5xl tracking-[-0.04em] md:text-7xl">Evidence Workspace</h1>
            <p className="mt-5 max-w-2xl text-base leading-7 text-muted-foreground">
              A public prototype showing how field evidence, public sources, and developing legal issues can be linked. Synthetic records are clearly marked and contain no real claimant information.
            </p>
          </div>
          <div className="grid min-w-[300px] grid-cols-3 border border-border text-center text-xs">
            <Stat label="Records" value={String(evidenceDemo.length)} />
            <Stat label="Issues" value={String(evidenceIssues.length)} />
            <Stat label="Public" value={String(evidenceDemo.filter((e) => e.status === 'public-source').length)} />
          </div>
        </div>

        <LocalFileFingerprint />

        <div className="mt-7 grid gap-3 md:grid-cols-[1fr_auto_auto]">
          <label className="flex items-center gap-3 border border-border px-4 py-3">
            <Search className="size-4 text-muted-foreground" />
            <input
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder="Search evidence, tags, sources..."
              className="w-full bg-transparent text-sm outline-none placeholder:text-muted-foreground"
            />
          </label>
          <label className="flex items-center gap-2 border border-border px-4 py-3 text-sm">
            <Filter className="size-4 text-muted-foreground" />
            <select value={issue} onChange={(event) => setIssue(event.target.value)} className="bg-background outline-none">
              <option>All issues</option>
              {evidenceIssues.map((item) => <option key={item}>{item}</option>)}
            </select>
          </label>
          <div className="flex border border-border p-1 text-xs">
            {(['all', 'synthetic', 'public-source'] as const).map((value) => (
              <button
                key={value}
                type="button"
                onClick={() => setStatus(value)}
                className={`px-3 py-2 ${status === value ? 'bg-foreground text-background' : 'text-muted-foreground hover:text-foreground'}`}
              >
                {value === 'all' ? 'All' : value === 'synthetic' ? 'Synthetic' : 'Public'}
              </button>
            ))}
          </div>
        </div>

        <div className="mt-7 grid gap-6 xl:grid-cols-[0.95fr_1.05fr]">
          <div className="border border-border">
            <div className="flex items-center justify-between border-b border-border px-5 py-4">
              <span className="text-[10px] uppercase tracking-[0.18em] text-muted-foreground">Evidence register</span>
              <span className="text-xs text-muted-foreground">{filtered.length} shown</span>
            </div>
            <div className="max-h-[780px] divide-y divide-border overflow-y-auto">
              {filtered.map((item) => (
                <EvidenceRow
                  key={item.id}
                  item={item}
                  active={selected?.id === item.id}
                  onClick={() => setSelectedId(item.id)}
                />
              ))}
              {filtered.length === 0 && (
                <div className="px-5 py-16 text-center text-sm text-muted-foreground">No records match these filters.</div>
              )}
            </div>
          </div>

          {selected && <EvidenceDetail item={selected} />}
        </div>
      </section>
    </main>
  )
}

function Stat({ label, value }: { label: string; value: string }) {
  return (
    <div className="border-r border-border px-3 py-4 last:border-r-0">
      <div className="font-serif text-2xl">{value}</div>
      <div className="mt-1 text-[9px] uppercase tracking-[0.18em] text-muted-foreground">{label}</div>
    </div>
  )
}

function EvidenceRow({ item, active, onClick }: { item: EvidenceItem; active: boolean; onClick: () => void }) {
  return (
    <button type="button" onClick={onClick} className={`w-full px-5 py-5 text-left transition-colors ${active ? 'bg-muted/60' : 'hover:bg-muted/30'}`}>
      <div className="flex items-start justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="font-mono text-[10px] text-primary">{item.id}</span>
            <StatusPill status={item.status} />
          </div>
          <h2 className="mt-2 font-serif text-xl leading-6">{item.title}</h2>
        </div>
        <span className="text-[10px] uppercase tracking-[0.14em] text-muted-foreground">{item.kind}</span>
      </div>
      <p className="mt-3 line-clamp-2 text-sm leading-6 text-muted-foreground">{item.summary}</p>
      <div className="mt-4 flex flex-wrap gap-2">
        {item.relations.slice(0, 3).map((relation, index) => (
          <RelationPill key={`${relation.issue}-${relation.relation}-${index}`} relation={relation.relation} text={relation.issue} />
        ))}
      </div>
    </button>
  )
}

function EvidenceDetail({ item }: { item: EvidenceItem }) {
  return (
    <section className="border border-border xl:sticky xl:top-6 xl:self-start">
      <div className="border-b border-border px-6 py-5">
        <div className="flex flex-wrap items-center gap-2">
          <span className="font-mono text-xs text-primary">{item.id}</span>
          <StatusPill status={item.status} />
          <span className="text-[10px] uppercase tracking-[0.16em] text-muted-foreground">{item.kind}</span>
        </div>
        <h2 className="mt-4 font-serif text-3xl leading-tight">{item.title}</h2>
        <p className="mt-4 text-sm leading-7 text-muted-foreground">{item.summary}</p>
      </div>

      <div className="grid border-b border-border sm:grid-cols-2">
        <DetailCell label="Source" value={item.sourceLabel} />
        <DetailCell label="Exact location" value={item.locator} />
        <DetailCell label="Date" value={item.date} />
        <DetailCell label="Location" value={item.location ?? 'Not applicable'} />
      </div>

      {item.sourceUrl && (
        <div className="border-b border-border px-6 py-4">
          <a href={item.sourceUrl} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 text-sm text-primary hover:underline">
            <Link2 className="size-4" /> Open public source <ArrowUpRight className="size-3.5" />
          </a>
        </div>
      )}

      {item.hash && (
        <div className="border-b border-border px-6 py-5">
          <div className="flex items-center gap-2 text-[10px] uppercase tracking-[0.18em] text-muted-foreground">
            <ShieldCheck className="size-4 text-primary" /> Integrity fingerprint
          </div>
          <p className="mt-3 break-all font-mono text-[11px] leading-5 text-muted-foreground">SHA-256 · {item.hash}</p>
          <p className="mt-2 text-xs leading-5 text-muted-foreground">Prototype provenance field inspired by tamper-evident legal document workflows. This demo hash is illustrative only.</p>
        </div>
      )}

      <div className="px-6 py-6">
        <div className="mb-4 flex items-center gap-2 text-[10px] uppercase tracking-[0.18em] text-muted-foreground">
          <FileSearch className="size-4" /> Connections to developing case
        </div>
        <div className="space-y-3">
          {item.relations.map((relation, index) => (
            <div key={`${relation.issue}-${relation.relation}-${index}`} className="border border-border p-4">
              <div className="flex flex-wrap items-center justify-between gap-3">
                <span className="font-medium">{relation.issue}</span>
                <RelationPill relation={relation.relation} text={relationLabel[relation.relation]} />
              </div>
              <p className="mt-3 text-sm leading-6 text-muted-foreground">{relation.note}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

function DetailCell({ label, value }: { label: string; value: string }) {
  return (
    <div className="border-b border-r border-border px-6 py-4 even:border-r-0 sm:last:border-b-0 sm:nth-last-2:border-b-0">
      <div className="text-[9px] uppercase tracking-[0.18em] text-muted-foreground">{label}</div>
      <div className="mt-2 text-sm leading-6">{value}</div>
    </div>
  )
}

function StatusPill({ status }: { status: EvidenceItem['status'] }) {
  return (
    <span className="inline-flex items-center gap-1 border border-border px-2 py-1 text-[9px] uppercase tracking-[0.12em] text-muted-foreground">
      {status === 'synthetic' ? <FlaskConical className="size-3" /> : <CheckCircle2 className="size-3" />}
      {status === 'synthetic' ? 'Synthetic' : 'Public source'}
    </span>
  )
}

function RelationPill({ relation, text }: { relation: EvidenceItem['relations'][number]['relation']; text: string }) {
  const icon =
    relation === 'supports' ? <CheckCircle2 className="size-3" /> :
    relation === 'challenges' ? <CircleAlert className="size-3" /> :
    relation === 'gap' ? <CircleDot className="size-3" /> :
    <FileSearch className="size-3" />

  return (
    <span className="inline-flex items-center gap-1 border border-border px-2 py-1 text-[9px] uppercase tracking-[0.1em] text-muted-foreground">
      {icon}{text}
    </span>
  )
}
