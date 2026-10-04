import { defineCollection } from 'astro:content'
import { glob } from 'astro/loaders'

/** The user guide, copied from the app's repository by `npm run guida:sync` (never edited here). */
const guida = defineCollection({
    loader: glob({ pattern: '**/*.md', base: './src/content/guida' }),
})

export const collections = { guida }
