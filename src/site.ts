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
     * false while the site lives on the pages.dev preview: every page gets noindex.
     * Set to true only at the cutover to chicomanda.com (README, "Passaggio a chicomanda.com").
     */
    indexable: false,
    /** [[DA COMPLETARE: confermare l'indirizzo pubblico di contatto e che sia instradato con Email Routing]] */
    contactEmail: 'info@chicomanda.com',
    /** Venues' installations live at <slug>.<appDomain>. */
    appDomain: 'chicomanda.com',
} as const

/** Data controller, for the privacy policy and the footer. */
export const OWNER = {
    name: '[[DA COMPLETARE: ragione sociale o nome e cognome del titolare]]',
    vat: '[[DA COMPLETARE: P.IVA]]',
    address: '[[DA COMPLETARE: sede legale]]',
    pec: '[[DA COMPLETARE: PEC, se presente]]',
} as const

export const NAV = [
    { href: '/#funzioni', label: 'Funzioni' },
    { href: '/#come-funziona', label: 'Come funziona' },
    { href: '/#per-chi', label: 'Per chi è' },
] as const
