import Image from 'next/image'
import Link from 'next/link'
import { ArrowLeft, ArrowUpRight } from 'lucide-react'
import { getNewsArticles, type NewsArticle } from '@/sanity/lib/queries'

const kindLabel: Record<NewsArticle['kind'], string> = {
  'case-note': 'Case Note',
  analysis: 'Analysis',
  viewpoint: 'Viewpoint',
}

function formatDate(value: string) {
  return new Intl.DateTimeFormat('en', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
    timeZone: 'UTC',
  }).format(new Date(value))
}

export default async function NewsPage() {
  let articles: NewsArticle[] = []
  try {
    articles = await getNewsArticles()
  } catch {
    articles = []
  }

  const featured = articles.find((article) => article.featured) ?? articles[0]
  const recent = featured ? articles.filter((article) => article._id !== featured._id) : []

  return (
    <main className="min-h-screen bg-background text-foreground">
      <header className="border-b border-border/80 bg-background">
        <div className="mx-auto flex max-w-[1320px] items-center justify-between px-6 py-5 lg:px-10">
          <Link href="/" className="flex items-center gap-3">
            <Image src="/climate-justice-counsel-emblem.png" alt="Climate Justice Counsel emblem" width={56} height={56} className="size-12 object-contain" />
            <span className="font-serif text-lg">Climate Litigation Lab</span>
          </Link>
          <Link href="/" className="text-[10px] uppercase tracking-[0.18em] text-muted-foreground hover:text-foreground">
            <ArrowLeft className="mr-2 inline size-3.5" /> Back to Lab
          </Link>
        </div>
      </header>

      <div className="mx-auto max-w-[1320px] px-6 py-20 lg:px-10 lg:py-28">
        <div className="border-b border-border pb-10">
          <p className="mb-5 text-[10px] uppercase tracking-[0.22em] text-primary">News · Case notes · Analysis</p>
          <h1 className="font-serif text-6xl tracking-[-0.05em] md:text-8xl">News & Analysis</h1>
          <p className="mt-7 max-w-2xl text-base leading-7 text-muted-foreground">
            Recent climate cases and legal developments, with Climate Justice Counsel&apos;s analysis of the reasoning, implications, and questions they raise.
          </p>
        </div>

        {!featured ? (
          <div className="mt-14 border border-border px-7 py-12">
            <p className="font-serif text-3xl">The desk is ready.</p>
            <p className="mt-4 max-w-xl text-sm leading-7 text-muted-foreground">
              Published News & Analysis entries from Sanity will appear here. Drafts remain in the Studio until they are published.
            </p>
          </div>
        ) : (
          <>
            <section className="mt-14 border-b border-border pb-16">
              <p className="text-[10px] uppercase tracking-[0.2em] text-primary">Featured</p>
              <Link href={`/news/${featured.slug}`} className="group mt-7 grid gap-10 lg:grid-cols-[0.72fr_1.28fr]">
                <div className="text-xs leading-6 text-muted-foreground">
                  <p className="uppercase tracking-[0.16em]">{kindLabel[featured.kind]}{featured.jurisdiction ? ` · ${featured.jurisdiction}` : ''}</p>
                  <p className="mt-2">{formatDate(featured.publishedAt)}</p>
                </div>
                <div>
                  <h2 className="max-w-4xl font-serif text-4xl leading-[1.02] tracking-[-0.035em] group-hover:text-primary md:text-6xl">{featured.title}</h2>
                  <p className="mt-6 max-w-2xl text-base leading-8 text-muted-foreground">{featured.deck}</p>
                  <span className="mt-8 inline-flex items-center gap-2 text-[10px] uppercase tracking-[0.18em] text-primary">Read analysis <ArrowUpRight className="size-3.5" /></span>
                </div>
              </Link>
            </section>

            <section className="py-16">
              <div className="mb-8 flex items-end justify-between border-b border-border pb-5">
                <h2 className="font-serif text-4xl tracking-[-0.03em]">Recent</h2>
                <span className="text-[10px] uppercase tracking-[0.18em] text-muted-foreground">{articles.length} published</span>
              </div>
              <div className="divide-y divide-border border-b border-border">
                {recent.map((article) => (
                  <Link key={article._id} href={`/news/${article.slug}`} className="group grid gap-5 py-8 md:grid-cols-[0.25fr_1fr_auto] md:items-start">
                    <div className="text-[10px] uppercase tracking-[0.16em] text-muted-foreground">
                      {kindLabel[article.kind]}{article.jurisdiction ? ` · ${article.jurisdiction}` : ''}
                    </div>
                    <div>
                      <h3 className="font-serif text-3xl leading-tight group-hover:text-primary">{article.title}</h3>
                      <p className="mt-3 max-w-2xl text-sm leading-7 text-muted-foreground">{article.deck}</p>
                    </div>
                    <div className="text-xs text-muted-foreground">{formatDate(article.publishedAt)}</div>
                  </Link>
                ))}
              </div>
            </section>
          </>
        )}
      </div>
    </main>
  )
}
