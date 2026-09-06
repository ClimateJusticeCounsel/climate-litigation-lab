import { defineField, defineType } from 'sanity'

export const speakerType = defineType({
  name: 'speaker',
  title: 'Speaker',
  type: 'document',
  fields: [
    defineField({ name: 'name', title: 'Name', type: 'string', validation: (rule) => rule.required() }),
    defineField({ name: 'role', title: 'Role / Title', type: 'string' }),
    defineField({ name: 'organization', title: 'Organization', type: 'string' }),
    defineField({ name: 'bio', title: 'Biography', type: 'text', rows: 6 }),
    defineField({ name: 'photo', title: 'Photo', type: 'image', options: { hotspot: true } }),
  ],
})
