/**
 * The demo / contact request: field rules shared by the page (limits on the inputs) and the Pages Function
 * (the only validation that counts).
 */

export const LIMITS = {
    name: 100,
    venue: 120,
    email: 254,
    phone: 30,
    message: 2000,
} as const

export const TOPICS = {
    demo: 'Richiesta demo',
    info: 'Informazioni',
} as const

export type Topic = keyof typeof TOPICS

export interface DemoRequest {
    topic: Topic
    name: string
    venue: string
    email: string
    phone: string
    message: string
}

export type Validation =
    | { ok: true, request: DemoRequest }
    | { ok: false, spam: boolean, errors: string[] }

const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
const PHONE = /^[+0-9 ()./-]{6,}$/

const text = (form: FormData, key: string) => {
    const value = form.get(key)
    return typeof value === 'string' ? value.trim() : ''
}

/** Validates the submitted form. `website` is the honeypot: invisible to people, filled by bots. */
export function validateDemoForm(form: FormData): Validation {
    if (text(form, 'website')) return { ok: false, spam: true, errors: [] }

    const topic = text(form, 'topic') || 'demo'
    const request = {
        topic: topic as Topic,
        name: text(form, 'name'),
        venue: text(form, 'venue'),
        email: text(form, 'email'),
        phone: text(form, 'phone'),
        // Single line breaks are kept, runs of blank lines collapsed
        message: text(form, 'message').replace(/\r\n?/g, '\n').replace(/\n{3,}/g, '\n\n'),
    }

    const errors: string[] = []
    if (!(topic in TOPICS)) errors.push('Motivo non valido')
    if (!request.name) errors.push('Manca il nome')
    if (!request.venue) errors.push('Manca il nome del locale')
    if (!EMAIL.test(request.email)) errors.push('Email non valida')
    if (request.phone && !PHONE.test(request.phone)) errors.push('Telefono non valido')
    if (!request.message) errors.push('Manca il messaggio')
    if (form.get('consent') !== 'yes') errors.push('Serve il consenso al trattamento dei dati')
    for (const [key, max] of Object.entries(LIMITS)) {
        if (request[key as keyof typeof LIMITS].length > max) errors.push(`Campo troppo lungo: ${key}`)
    }
    // No line breaks in what ends up in e-mail headers
    if (/[\r\n]/.test(request.name + request.email)) errors.push('Caratteri non validi')

    return errors.length ? { ok: false, spam: false, errors } : { ok: true, request }
}

/** Plain-text body of the e-mail sent to the team. */
export function demoEmailText(request: DemoRequest, meta: { country?: string | null }) {
    return [
        `${TOPICS[request.topic]} dal sito chicomanda.com`,
        '',
        `Nome: ${request.name}`,
        `Locale: ${request.venue}`,
        `Email: ${request.email}`,
        `Telefono: ${request.phone || '-'}`,
        '',
        request.message,
        '',
        '--',
        `Consenso al trattamento: sì · ${new Date().toISOString()}${meta.country ? ` · ${meta.country}` : ''}`,
    ].join('\n')
}
