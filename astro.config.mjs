// @ts-check
import { defineConfig } from 'astro/config'
import sitemap from '@astrojs/sitemap'
import securityHeaders from './integrations/security-headers.mjs'
import { SITE } from './src/site.ts'

/** Pages that must not be in the sitemap. */
const NOT_IN_SITEMAP = ['/404']

export default defineConfig({
    site: 'https://chicomanda.com',
    trailingSlash: 'never',
    build: { format: 'file' },
    integrations: [
        sitemap({
            filter: page => !NOT_IN_SITEMAP.some(path => new URL(page).pathname.replace(/\/$/, '') === path),
        }),
        securityHeaders({ indexable: SITE.indexable }),
    ],
})
