import { type SchemaTypeDefinition } from 'sanity'

import { siteSettings } from './siteSettings'
import { series } from './series'
import { sculpture } from './sculpture'

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [siteSettings, series, sculpture],
}
