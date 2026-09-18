import Image from 'next/image'
import Link from 'next/link'
import { ArrowLeft, ArrowUpRight } from 'lucide-react'
import { notFound } from 'next/navigation'
import { getNewsArticle, type NewsArticle } from '@/sanity/lib/queries'

const kindLabel: Record<NewsArticle['kind'], string> = {
  'case-note': 'Case Note',
  analysis: 'Analysis',
  viewpoint: 'Viewpoint',
}

function formatDate(value?: string) {
  if (!value) return ''
  return new Intl.DateTimeFormat('en', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
    timeZone: 'UTC',
  }).format(new Date(value))
}

export default async function NewsArticlePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  let article: NewsArticle | null = null
  try {
    article = await getNewsArticle(slug)
  } catch {
    article = null
  }
  if (!article) notFound()

  const dossier = [
    ['Court / institution', article.court],
    ['Case / development', article.caseName],
    ['Case number', article.caseNumber],
    ['Decision date', article.decisionDate ? formatDate(article.decisionDate) : undefined],
    ['Claim type', article.claimType],
    ['Outcome / status', article.outcome],
  ].filter(([, value]) => value)

  return (
    <main className="min-h-screen bg-background text-foreground">
      <header className="border-b border-border/80 bg-background">
        <div className="mx-auto flex max-w-[1320px] items-center justify-between px-6 py-5 lg:px-10">
          <Link href="/" className="flex items-center gap-3">
            <Image src="/climate-justice-counsel-emblem.png" alt="Climate Justice Counsel emblem" width={56} height={56} className="size-12 object-contain" />
            <span className="font-serif text-lg">Climate Litigation Lab</span>
          </Link>
          <Link href="/news" className="text-[10px] uppercase tracking-[0.18em] text-muted-foreground hover:text-foreground">
            <ArrowLeft className="mr-2 inline size-3.5" /> News & Analysis
          </Link>
        </div>
      </header>

      <article className="mx-auto max-w-[1320px] px-6 py-16 lg:px-10 lg:py-24">
        <header className="max-w-5xl border-b border-border pb-12">
          <p className="text-[10px] uppercase tracking-[0.2em] text-primary">
            {kindLabel[article.kind]}{article.jurisdiction ? ` · ${article.jurisdiction}` : ''}
          </p>
          <h1 className="mt-7 font-serif text-5xl leading-[0.98] tracking-[-0.05em] md:text-8xl">{article.title}</h1>
          <p className="mt-8 max-w-3xl font-serif text-2xl leading-9 text-muted-foreground">{article.deck}</p>
          <p className="mt-8 text-xs uppercase tracking-[0.14em] text-muted-foreground">{formatDate(article.publishedAt)}</p>
        </header>

        <div className="mt-16 grid gap-16 lg:grid-cols-[1fr_320px]">
          <div className="space-y-16">
            {article.whatHappened && <Section eyebrow="01" title="What happened" body={article.whatHappened} />}
            {article.whyItMatters && <Section eyebrow="02" title="Why it matters" body={article.whyItMatters} />}
            {article.cjcView && (
              <section className="border-y border-primary/40 py-10">
                <p className="text-[10px] uppercase tracking-[0.22em] text-primary">CJC View</p>
                <div className="mt-5 whitespace-pre-line font-serif text-2xl leading-9">{article.cjcView}</div>
              </section>
            )}
            {article.whatToWatch && article.whatToWatch.length > 0 && (
              <section>
                <p className="text-[10px] uppercase tracking-[0.22em] text-primary">What to watch</p>
                <div className="mt-6 divide-y divide-border border-y border-border">
                  {article.whatToWatch.map((item, index) => (
                    <div key={index} className="grid grid-cols-[36px_1fr] gap-4 py-5">
                      <span className="text-xs text-primary">{String(index + 1).padStart(2, '0')}</span>
                      <p className="text-sm leading-7">{item}</p>
                    </div>
                  ))}
                </div>
              </section>
            )}
          </div>

          <aside className="space-y-10">
            {dossier.length > 0 && (
              <div className="border-t border-border pt-5">
                <p className="text-[10px] uppercase tracking-[0.22em] text-primary">Case dossier</p>
                <dl className="mt-5 divide-y divide-border">
                  {dossier.map(([label, value]) => (
                    <div key={label} className="py-4">
                      <dt className="text-[10px] uppercase tracking-[0.14em] text-muted-foreground">{label}</dt>
                      <dd className="mt-2 text-sm leading-6">{value}</dd>
                    </div>
                  ))}
                </dl>
              </div>
            )}

            {(article.primarySources?.length || article.sabinUrl) && (
              <div className="border-t border-border pt-5">
                <p className="text-[10px] uppercase tracking-[0.22em] text-primary">Sources</p>
                <div className="mt-5 space-y-3">
                  {article.primarySources?.filter((source) => source.url).map((source, index) => (
                    <a key={index} href={source.url} target="_blank" rel="noreferrer" className="flex items-start justify-between gap-4 border border-border p-4 text-sm leading-6 hover:border-primary">
                      <span>{source.label || 'Primary source'}</span><ArrowUpRight className="mt-1 size-3.5 shrink-0 text-primary" />
                    </a>
                  ))}
                  {article.sabinUrl && (
                    <a href={article.sabinUrl} target="_blank" rel="noreferrer" className="flex items-start justify-between gap-4 border border-border p-4 text-sm leading-6 hover:border-primary">
                      <span>Sabin Center case record</span><ArrowUpRight className="mt-1 size-3.5 shrink-0 text-primary" />
                    </a>
                  )}
                </div>
              </div>
            )}
          </aside>
        </div>
      </article>
    </main>
  )
}

function Section({ eyebrow, title, body }: { eyebrow: string; title: string; body: string }) {
  return (
    <section>
      <p className="text-[10px] uppercase tracking-[0.22em] text-primary">{eyebrow}</p>
      <h2 className="mt-4 font-serif text-4xl tracking-[-0.03em]">{title}</h2>
      <div className="mt-6 max-w-3xl whitespace-pre-line text-base leading-8 text-muted-foreground">{body}</div>
    </section>
  )
}
