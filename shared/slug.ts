/**
 * Venue slugs, i.e. the subdomain of each installation (<slug>.chicomanda.com).
 * The rules are those of chi-comanda scripts/lib/slug.mjs: keep them in sync.
 */

/** Subdomains that are not clients: product, infrastructure and Railway environments. */
export const RESERVED_SLUGS = ['www', 'mail', 'api', 'app', 'admin', 'staging', 'stage', 'status']

/** Lowercase letters, digits and hyphens, 2-30 characters, no leading or trailing hyphen. */
const SLUG = /^[a-z0-9](?:[a-z0-9-]{0,28}[a-z0-9])$/

/**
 * What a person types → a candidate slug: "Bagno Al Mare" → "bagno-al-mare", "Caffè" → "caffe".
 * An address of the installation is accepted too: "libra.chicomanda.com/login" → "libra".
 */
export function normalizeSlug(input: string, appDomain = 'chicomanda.com'): string {
    let value = input.trim().toLowerCase()
    const host = value.replace(/^[a-z]+:\/\//, '').split(/[/?#]/)[0]
    if (host.endsWith(`.${appDomain}`)) value = host.slice(0, -appDomain.length - 1)
    return value
        .normalize('NFD')
        .replace(/[̀-ͯ]/g, '')
        .replace(/['’`]/g, '')
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/^-+|-+$/g, '')
}

export type SlugProblem = 'empty' | 'invalid' | 'reserved'

/** null when `slug` can be a client's subdomain, otherwise why not. */
export function slugProblem(slug: string): SlugProblem | null {
    if (!slug) return 'empty'
    if (!SLUG.test(slug)) return 'invalid'
    if (RESERVED_SLUGS.includes(slug)) return 'reserved'
    return null
}

/** A readable name from the slug, for "Entra in …": "bagno-al-mare" → "Bagno Al Mare". */
export function displayName(slug: string): string {
    return slug.split('-').filter(Boolean).map(word => word[0].toUpperCase() + word.slice(1)).join(' ')
}
