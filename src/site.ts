/**
 * Site-wide settings. Everything still missing is marked [[DA COMPLETARE: …]]:
 * `npm run todo` lists every occurrence in the repository.
 */

/** Cloudflare's Turnstile test site key: always passes, pairs with the test secret in .dev.vars.example. */
const TURNSTILE_TEST_SITE_KEY = '1x00000000000000000000AA'

export const SITE = {
    name: 'Chi Comanda',
    url: 'https://chicomanda.com',
    locale: 'it_IT',
    description:
        'Chi Comanda è l’app per gestire le comande di bar, cocktail bar e locali con tavoli: ordini dal telefono, bar e cucina, cassa e mappa dei tavoli in tempo reale.',
    /**
     * false while the site lives on the previews (pages.dev, vetrina.chicomanda.com): every page gets noindex.
     * Set to true only at the cutover to chicomanda.com (README, "Cutover to chicomanda.com").
     */
    indexable: false,
    /** Public contact address, forwarded by Cloudflare Email Routing. */
    contactEmail: 'info@chicomanda.com',
    /**
     * Cloudflare Turnstile site key (public), widget for chicomanda.com, vetrina.chicomanda.com and
     * chicomanda-site.pages.dev. It doesn't work on localhost, so `astro dev` and `npm run dev:functions`
     * use Cloudflare's test key (always passes), or PUBLIC_TURNSTILE_SITE_KEY when set.
     */
    turnstileSiteKey: import.meta.env.PUBLIC_TURNSTILE_SITE_KEY
        || (import.meta.env.DEV ? TURNSTILE_TEST_SITE_KEY : '0x4AAAAAAFMv-lvsQ_zc3Mb7'),
    /** Venues' installations live at <slug>.<appDomain>. */
    appDomain: 'chicomanda.com',
} as const

/**
 * Data controller, for the privacy policy and the footer. Today a natural person: no VAT number,
 * registered office or PEC, which are shown only when set (e.g. once a company or a VAT number exists).
 */
export const OWNER: { name: string, email: string, vat?: string, address?: string, pec?: string } = {
    name: 'Nicola Giuseppe Zirilli',
    email: 'nicola.zirilli@gmail.com',
}

export const NAV = [
    { href: '/#funzioni', label: 'Funzioni' },
    { href: '/#come-funziona', label: 'Come funziona' },
    { href: '/#per-chi', label: 'Per chi è' },
    { href: '/guida', label: 'Guida' },
] as const
