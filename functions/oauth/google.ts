/**
 * GET /oauth/google: Google's answer to a login started by an installation, forwarded to it (shared/oauth-relay.ts).
 * The one redirect URI registered on Google for every installation.
 */
import { parseExtraHosts, relayTarget } from '../../shared/oauth-relay.ts'

interface Env {
    /** Hosts allowed besides <slug>.chicomanda.com, comma separated (e.g. the stage on Railway). */
    OAUTH_EXTRA_HOSTS?: string
}

export const onRequestGet: PagesFunction<Env> = async ({ request, env }) => {
    const target = relayTarget(request.url, parseExtraHosts(env.OAUTH_EXTRA_HOSTS))
    if (!target) {
        return new Response('Accesso con Google non valido. Torna alla pagina di accesso del tuo locale e riprova.', {
            status: 400, headers: { 'Content-Type': 'text/plain; charset=utf-8', 'Cache-Control': 'no-store' },
        })
    }
    return new Response(null, {
        status: 302,
        // The code must not stay in caches or in the Referer of the next page
        headers: { Location: target, 'Cache-Control': 'no-store', 'Referrer-Policy': 'no-referrer' },
    })
}
