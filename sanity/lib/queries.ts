import { sanityClient } from './client'

export type PublishedEvent = {
  _id: string
  title: string
  slug: string
  date?: string
  location?: string
  summary?: string
  program?: Array<{ time?: string; title?: string; description?: string }>
  speakers?: Array<{ _id: string; name: string; role?: string; organization?: string; bio?: string }>
  resources?: Array<{ label?: string; url?: string }>
  presentationEnabled?: boolean
}

export type NewsArticle = {
  _id: string
  title: string
  slug: string
  publishedAt: string
  kind: 'case-note' | 'analysis' | 'viewpoint'
  jurisdiction?: string
  deck: string
  featured?: boolean
  whatHappened?: string
  whyItMatters?: string
  cjcView?: string
  whatToWatch?: string[]
  court?: string
  caseName?: string
  caseNumber?: string
  decisionDate?: string
  claimType?: string
  outcome?: string
  primarySources?: Array<{ label?: string; url?: string }>
  sabinUrl?: string
}

const eventProjection = `{
  _id,
  title,
  "slug": slug.current,
  date,
  location,
  summary,
  program,
  "speakers": speakers[]->{_id, name, role, organization, bio},
  resources,
  presentationEnabled
}`

const newsProjection = `{
  _id,
  title,
  "slug": slug.current,
  publishedAt,
  kind,
  jurisdiction,
  deck,
  featured,
  whatHappened,
  whyItMatters,
  cjcView,
  whatToWatch,
  court,
  caseName,
  caseNumber,
  decisionDate,
  claimType,
  outcome,
  primarySources,
  sabinUrl
}`

export async function getPublishedEvents(): Promise<PublishedEvent[]> {
  return sanityClient.fetch(
    `*[_type == "event" && defined(slug.current)] | order(date asc) ${eventProjection}`,
    {},
    { next: { revalidate: 60 } },
  )
}

export async function getPublishedEvent(slug: string): Promise<PublishedEvent | null> {
  return sanityClient.fetch(
    `*[_type == "event" && slug.current == $slug][0] ${eventProjection}`,
    { slug },
    { next: { revalidate: 60 } },
  )
}

export async function getNewsArticles(): Promise<NewsArticle[]> {
  return sanityClient.fetch(
    `*[_type == "newsArticle" && defined(slug.current)] | order(publishedAt desc) ${newsProjection}`,
    {},
    { next: { revalidate: 60 } },
  )
}

export async function getNewsArticle(slug: string): Promise<NewsArticle | null> {
  return sanityClient.fetch(
    `*[_type == "newsArticle" && slug.current == $slug][0] ${newsProjection}`,
    { slug },
    { next: { revalidate: 60 } },
  )
}
