/**
 * Site-wide settings. Everything still missing is marked [[DA COMPLETARE: …]]:
 * `npm run todo` lists every occurrence in the repository.
 */

export const SITE = {
    name: 'Chi Comanda',
    url: 'https://chicomanda.com',
    locale: 'it_IT',
    description:
        'Chi Comanda è l’app per gestire le comande di bar, cocktail bar e locali con tavoli: ordini dal telefono, bar e cucina, cassa e mappa dei tavoli in tempo reale.',
    /**
     * false: search engines are kept out, every page gets a noindex robots tag and every response
     * `X-Robots-Tag: noindex, nofollow` (_headers). Kept false on chicomanda.com too, by choice (8 October 2026: the
     * site is live but not promoted); set to true to be found on Google.
     */
    indexable: false,
    /** Public contact address, forwarded by Cloudflare Email Routing. */
    contactEmail: 'info@chicomanda.com',
    /** Venues' installations live at <slug>.<appDomain>. */
    appDomain: 'chicomanda.com',
    /** Sign-up page of the shared installation (chi-comanda docs/saas.md): the venue and its admin are created there. */
    signupUrl: 'https://app.chicomanda.com/registrati',
} as const

/**
 * Trial and plans, as the app applies them (chi-comanda docs/saas.md, *Plans* and *Lifecycle*; guide
 * amministratore/abbonamento.md). Prices are Stripe's (scripts/stripe-setup.mjs): change them here too when they change.
 */
export const PRICING = {
    trialDays: 30,
    graceDays: 14,
    /** Suspended → subscription closed, then closed → data deleted. */
    readOnlyDays: 90,
    deletionDays: 90,
    /** Euro a month, VAT excluded; the yearly price is `yearlyMonths` months. */
    yearlyMonths: 10,
    plans: [
        {
            id: 'base',
            name: 'Base',
            monthly: 29,
            for: 'Bar, pub e cocktail bar',
            features: [
                'Ordini al tavolo, bar, cucina e cassa',
                'Pagamenti con carta, SumUp e Satispay',
                'Notifiche push e messaggi allo staff',
                'Consumazione minima al tavolo',
                'Menu pubblico con QR code',
                'Accesso con Google',
            ],
        },
        {
            id: 'pro',
            name: 'Pro',
            monthly: 49,
            for: 'Locali con cucina e una squadra da organizzare',
            features: [
                'Tutto quello che c’è in Base',
                'Uscite (portate) per la cucina',
                'Report del personale',
            ],
        },
    ],
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
    { href: '/prezzi', label: 'Prezzi' },
    { href: '/guida', label: 'Guida' },
] as const

/**
 * Version of the terms, the privacy notice and the data processing agreement: the app stores the one each owner accepts
 * (chi-comanda LEGAL_VERSION, with TERMS_URL = /condizioni and PRIVACY_URL = /privacy). A new text = a new version here
 * and in the app's LEGAL_VERSION.
 */
export const LEGAL = {
    version: '2026-10',
    date: '8 ottobre 2026',
    /** Courts for disputes with business customers (terms, art. 17). */
    court: '',
} as const
