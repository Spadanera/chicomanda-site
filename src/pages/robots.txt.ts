import type { APIRoute } from 'astro'
import { SITE } from '../site'

// Crawling stays allowed during the preview: pages carry noindex, and a crawler must be able to read it.
export const GET: APIRoute = () =>
    new Response(`User-agent: *\nAllow: /\n\nSitemap: ${new URL('/sitemap-index.xml', SITE.url).href}\n`, {
        headers: { 'Content-Type': 'text/plain; charset=utf-8' },
    })
