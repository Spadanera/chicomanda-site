/**
 * POST /api/demo: the demo / contact request. Validates, checks Turnstile, sends one e-mail through Mailjet.
 * Nothing is stored. Secrets live in the Pages project settings (README), never in the repository.
 *
 * Works without JavaScript (303 redirects to /demo/grazie or /demo/errore) and with it
 * (Accept: application/json → JSON answer, the page shows the outcome in place).
 */
import { demoEmailText, TOPICS, validateDemoForm } from '../../shared/demo-form.ts'

interface Env {
    TURNSTILE_SECRET?: string
    MAILJET_API_KEY?: string
    MAILJET_API_SECRET?: string
    /** Sender, on a domain authenticated in Mailjet (SPF/DKIM), e.g. sito@chicomanda.com */
    MAIL_FROM?: string
    /** Where requests arrive. */
    DEMO_TO?: string
}

type Outcome = 'ok' | 'dati' | 'verifica' | 'invio'
const STATUS: Record<Outcome, number> = { ok: 200, dati: 400, verifica: 403, invio: 502 }

export const onRequestPost: PagesFunction<Env> = async ({ request, env }) => {
    const wantsJson = (request.headers.get('Accept') ?? '').includes('application/json')
    const reply = (outcome: Outcome, errors: string[] = []) => {
        if (wantsJson) return Response.json({ ok: outcome === 'ok', outcome, errors }, { status: STATUS[outcome] })
        const target = outcome === 'ok' ? '/demo/grazie' : '/demo/errore'
        return new Response(null, { status: 303, headers: { Location: new URL(target, request.url).href } })
    }

    // Only from our own pages
    const origin = request.headers.get('Origin')
    if (origin && origin !== new URL(request.url).origin) return reply('verifica')

    let form: FormData
    try {
        form = await request.formData()
    } catch {
        return reply('dati')
    }

    const result = validateDemoForm(form)
    if (!result.ok) {
        // A bot that filled the honeypot gets the same answer as a person: nothing to learn from it
        return result.spam ? reply('ok') : reply('dati', result.errors)
    }

    if (!env.TURNSTILE_SECRET || !env.MAILJET_API_KEY || !env.MAILJET_API_SECRET || !env.MAIL_FROM || !env.DEMO_TO) {
        console.error('demo: missing configuration (TURNSTILE_SECRET, MAILJET_API_KEY, MAILJET_API_SECRET, MAIL_FROM, DEMO_TO)')
        return reply('invio')
    }

    const token = form.get('cf-turnstile-response')
    if (typeof token !== 'string' || !(await turnstileOk(env.TURNSTILE_SECRET, token, request.headers.get('CF-Connecting-IP')))) {
        return reply('verifica')
    }

    const { request: demo } = result
    const sent = await fetch('https://api.mailjet.com/v3.1/send', {
        method: 'POST',
        headers: {
            Authorization: `Basic ${btoa(`${env.MAILJET_API_KEY}:${env.MAILJET_API_SECRET}`)}`,
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            Messages: [{
                From: { Email: env.MAIL_FROM, Name: 'Sito Chi Comanda' },
                To: [{ Email: env.DEMO_TO }],
                ReplyTo: { Email: demo.email, Name: demo.name },
                Subject: `${TOPICS[demo.topic]}: ${demo.venue}`.slice(0, 150),
                TextPart: demoEmailText(demo, { country: request.headers.get('CF-IPCountry') }),
            }],
        }),
    }).catch((error: unknown) => {
        console.error('demo: Mailjet unreachable', error)
        return null
    })

    if (!sent?.ok) {
        console.error('demo: Mailjet refused the message', sent?.status, await sent?.text().catch(() => ''))
        return reply('invio')
    }
    return reply('ok')
}

async function turnstileOk(secret: string, token: string, ip: string | null) {
    const body = new FormData()
    body.append('secret', secret)
    body.append('response', token)
    if (ip) body.append('remoteip', ip)
    try {
        const response = await fetch('https://challenges.cloudflare.com/turnstile/v0/siteverify', { method: 'POST', body })
        const outcome = await response.json<{ success: boolean }>()
        return outcome.success === true
    } catch (error) {
        console.error('demo: Turnstile unreachable', error)
        return false
    }
}

/** Anything but POST. */
export const onRequest: PagesFunction = () =>
    new Response('Method Not Allowed', { status: 405, headers: { Allow: 'POST' } })
