import { defineArrayMember, defineField, defineType } from 'sanity'

export const siteSettings = defineType({
  name: 'siteSettings',
  title: 'Site Settings',
  type: 'document',
  fields: [
    defineField({
      name: 'name',
      title: 'Artist Name',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'statement',
      title: 'Artist Statement',
      type: 'text',
      rows: 4,
    }),
    defineField({
      name: 'bio',
      title: 'Biography',
      type: 'array',
      of: [
        defineArrayMember({
          type: 'block',
          styles: [{ title: 'Normal', value: 'normal' }],
          lists: [],
        }),
      ],
    }),
    defineField({
      name: 'portraitImage',
      title: 'Portrait Image',
      type: 'image',
      options: { hotspot: true },
    }),
    defineField({
      name: 'atelierImages',
      title: 'Atelier Images',
      type: 'array',
      of: [
        defineArrayMember({
          type: 'image',
          options: { hotspot: true },
        }),
      ],
    }),
    defineField({
      name: 'contactEmail',
      title: 'Contact Email',
      type: 'string',
    }),
    defineField({
      name: 'instagram',
      title: 'Instagram URL',
      type: 'url',
    }),
    defineField({
      name: 'location',
      title: 'Location',
      type: 'string',
    }),
    defineField({
      name: 'expositions',
      title: 'Expositions',
      type: 'array',
      of: [
        defineArrayMember({
          type: 'object',
          fields: [
            defineField({
              name: 'year',
              title: 'Year',
              type: 'string', // or number if you prefer
              validation: (rule) => rule.required(),
            }),
            defineField({
              name: 'title',
              title: 'Title / Event',
              type: 'string',
              validation: (rule) => rule.required(),
            }),
            defineField({
              name: 'location',
              title: 'Location',
              type: 'string',
            }),
            defineField({
              name: 'details',
              title: 'Details',
              type: 'text',
            }),
          ],
          preview: {
            select: {
              title: 'title',
              subtitle: 'year',
            },
          },
        }),
      ],
    }),
  ],
  preview: {
    select: {
      title: 'name',
      media: 'portraitImage',
    },
  },
})
