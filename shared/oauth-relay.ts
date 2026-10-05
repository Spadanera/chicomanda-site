/**
 * Relay of the Google login (app: README, *Google login*). Google allows no wildcard redirect URI, so every
 * installation registers the same one, `https://chicomanda.com/oauth/google`, and this relay forwards Google's answer
 * (code, state, error…) to the installation named in the OAuth state, query unchanged.
 *
 * The relay does not verify the state's signature (it doesn't know the installations' secrets): the installation
 * does, together with the nonce of its session. The relay only refuses to forward anywhere but an installation:
 * `<slug>.chicomanda.com` with a valid slug, or a host listed in OAUTH_EXTRA_HOSTS (clients on their own domain, the
 * stage on Railway). The code is useless without the Google client secret, which only the installations hold.
 */
import { slugProblem } from './slug.ts'

export const CALLBACK_PATH = '/api/auth/google/callback'

/** Host named in the state (`<base64url(JSON)>.<signature>`, built by the app's auth/google-state.ts). */
export function stateHost(state: string | null): string | undefined {
    if (!state || state.length > 2000) return undefined
    const [payload] = state.split('.')
    try {
        const host = JSON.parse(atob(payload.replace(/-/g, '+').replace(/_/g, '/')))?.h
        return typeof host === 'string' ? host.toLowerCase() : undefined
    } catch {
        return undefined
    }
}

/** An installation's host: `<slug>.<appDomain>` with a valid client slug, or one of `extraHosts`. */
export function isInstallationHost(host: string, extraHosts: string[], appDomain = 'chicomanda.com'): boolean {
    if (extraHosts.includes(host)) return true
    if (!host.endsWith(`.${appDomain}`)) return false
    const slug = host.slice(0, -appDomain.length - 1)
    return !slug.includes('.') && slugProblem(slug) === null
}

export function parseExtraHosts(value: string | undefined): string[] {
    return (value || '').split(',').map(h => h.trim().toLowerCase()).filter(Boolean)
}

/** Where to send Google's answer: the installation's callback with the same query; undefined when not allowed. */
export function relayTarget(requestUrl: string, extraHosts: string[], appDomain = 'chicomanda.com'): string | undefined {
    const url = new URL(requestUrl)
    const host = stateHost(url.searchParams.get('state'))
    if (!host || !isInstallationHost(host, extraHosts, appDomain)) return undefined
    return `https://${host}${CALLBACK_PATH}${url.search}`
}
