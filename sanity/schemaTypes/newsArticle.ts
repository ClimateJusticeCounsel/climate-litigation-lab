import { defineField, defineType } from 'sanity'

export const newsArticleType = defineType({
  name: 'newsArticle',
  title: 'News & Analysis',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Headline',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: { source: 'title', maxLength: 96 },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'publishedAt',
      title: 'Publication date',
      type: 'datetime',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'kind',
      title: 'Article type',
      type: 'string',
      options: {
        layout: 'radio',
        list: [
          { title: 'Case Note', value: 'case-note' },
          { title: 'Analysis', value: 'analysis' },
          { title: 'Viewpoint', value: 'viewpoint' },
        ],
      },
      initialValue: 'case-note',
      validation: (rule) => rule.required(),
    }),
    defineField({ name: 'jurisdiction', title: 'Jurisdiction', type: 'string' }),
    defineField({
      name: 'deck',
      title: 'Summary / deck',
      type: 'text',
      rows: 4,
      description: 'The short standfirst shown under the headline and on the News index.',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'featured',
      title: 'Feature on News page',
      type: 'boolean',
      initialValue: false,
    }),
    defineField({
      name: 'whatHappened',
      title: 'What happened',
      type: 'text',
      rows: 12,
    }),
    defineField({
      name: 'whyItMatters',
      title: 'Why it matters',
      type: 'text',
      rows: 10,
    }),
    defineField({
      name: 'cjcView',
      title: 'CJC View',
      type: 'text',
      rows: 12,
      description: 'Climate Justice Counsel analysis. Keep factual reporting and CJC analysis clearly distinguishable.',
    }),
    defineField({
      name: 'whatToWatch',
      title: 'What to watch',
      type: 'array',
      of: [{ type: 'string' }],
    }),
    defineField({
      name: 'court',
      title: 'Court / institution',
      type: 'string',
      group: 'dossier',
    }),
    defineField({
      name: 'caseName',
      title: 'Case / development',
      type: 'string',
      group: 'dossier',
    }),
    defineField({
      name: 'caseNumber',
      title: 'Case number',
      type: 'string',
      group: 'dossier',
    }),
    defineField({
      name: 'decisionDate',
      title: 'Decision date',
      type: 'date',
      group: 'dossier',
    }),
    defineField({
      name: 'claimType',
      title: 'Claim type',
      type: 'string',
      group: 'dossier',
    }),
    defineField({
      name: 'outcome',
      title: 'Outcome / status',
      type: 'text',
      rows: 3,
      group: 'dossier',
    }),
    defineField({
      name: 'primarySources',
      title: 'Primary sources',
      type: 'array',
      of: [{ type: 'resourceLink' }],
      group: 'sources',
    }),
    defineField({
      name: 'sabinUrl',
      title: 'Sabin Center case record',
      type: 'url',
      group: 'sources',
    }),
  ],
  groups: [
    { name: 'dossier', title: 'Case dossier' },
    { name: 'sources', title: 'Sources' },
  ],
  preview: {
    select: {
      title: 'title',
      subtitle: 'jurisdiction',
    },
  },
})
