import { defineField, defineType } from 'sanity'

export const eventType = defineType({
  name: 'event',
  title: 'Event',
  type: 'document',
  fields: [
    defineField({ name: 'title', title: 'Title', type: 'string', validation: (rule) => rule.required() }),
    defineField({ name: 'slug', title: 'Slug', type: 'slug', options: { source: 'title' }, validation: (rule) => rule.required() }),
    defineField({ name: 'date', title: 'Date', type: 'datetime' }),
    defineField({ name: 'location', title: 'Location', type: 'string' }),
    defineField({ name: 'summary', title: 'Summary', type: 'text', rows: 4 }),
    defineField({ name: 'body', title: 'Body', type: 'array', of: [{ type: 'block' }] }),
    defineField({ name: 'program', title: 'Program', type: 'array', of: [{ type: 'programItem' }] }),
    defineField({ name: 'speakers', title: 'Speakers', type: 'array', of: [{ type: 'reference', to: [{ type: 'speaker' }] }] }),
    defineField({ name: 'resources', title: 'Resources', type: 'array', of: [{ type: 'resourceLink' }] }),
    defineField({ name: 'presentationEnabled', title: 'Enable interactive presentation', type: 'boolean', initialValue: false }),
  ],
})

export const programItemType = defineType({
  name: 'programItem',
  title: 'Program Item',
  type: 'object',
  fields: [
    defineField({ name: 'time', title: 'Time', type: 'string' }),
    defineField({ name: 'title', title: 'Title', type: 'string' }),
    defineField({ name: 'description', title: 'Description', type: 'text', rows: 3 }),
  ],
})

export const resourceLinkType = defineType({
  name: 'resourceLink',
  title: 'Resource Link',
  type: 'object',
  fields: [
    defineField({ name: 'label', title: 'Label', type: 'string' }),
    defineField({ name: 'url', title: 'URL', type: 'url' }),
  ],
})
