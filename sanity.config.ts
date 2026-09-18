'use client'

import { defineConfig } from 'sanity'
import { structureTool } from 'sanity/structure'
import { dataset, projectId } from './sanity/env'
import { schemaTypes } from './sanity/schemaTypes'

export default defineConfig({
  name: 'default',
  title: 'Climate Litigation Lab',
  basePath: '/studio',
  projectId,
  dataset,
  plugins: [
    structureTool({
      structure: (S) =>
        S.list()
          .title('Publishing desk')
          .items([
            S.documentTypeListItem('newsArticle').title('News & Analysis'),
            S.documentTypeListItem('event').title('Events'),
            S.documentTypeListItem('speaker').title('Speakers'),
          ]),
    }),
  ],
  schema: {
    types: schemaTypes,
  },
})
