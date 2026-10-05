import { test } from 'node:test'
import assert from 'node:assert/strict'
import { isInstallationHost, parseExtraHosts, relayTarget, stateHost } from '../shared/oauth-relay.ts'

/** A state as the app builds it: base64url JSON, a dot, a signature (not checked here). */
const state = (h: unknown) => `${Buffer.from(JSON.stringify({ h, n: 'nonce' })).toString('base64url')}.sig_-x`
const relay = (query: string, extra: string[] = []) => relayTarget(`https://chicomanda.com/oauth/google?${query}`, extra)

test('forwards Google\'s answer to the installation in the state, query unchanged', () => {
    const s = state('ludoproject.chicomanda.com')
    assert.equal(relay(`state=${s}&code=4%2F0Ab&scope=email+profile`),
        `https://ludoproject.chicomanda.com/api/auth/google/callback?state=${s}&code=4%2F0Ab&scope=email+profile`)
    // An error from Google (the user cancelled) goes to the installation too, which shows it
    assert.equal(relay(`error=access_denied&state=${s}`),
        `https://ludoproject.chicomanda.com/api/auth/google/callback?error=access_denied&state=${s}`)
})

test('forwards only to an installation', () => {
    for (const host of ['evil.example', 'chicomanda.com', 'www.chicomanda.com', 'vetrina.chicomanda.com',
        'a.b.chicomanda.com', 'evilchicomanda.com', 'ludoproject.chicomanda.com.evil.example', '-x.chicomanda.com', 42]) {
        assert.equal(relay(`state=${state(host)}&code=x`), undefined, String(host))
    }
    assert.equal(relay('code=x'), undefined)
    assert.equal(relay('state=not-base64!!&code=x'), undefined)
})

test('accepts the hosts listed in OAUTH_EXTRA_HOSTS (the stage, clients on their own domain)', () => {
    const extra = parseExtraHosts(' chi-comanda-staging.up.railway.app, App.Example.It ')
    assert.deepEqual(extra, ['chi-comanda-staging.up.railway.app', 'app.example.it'])
    assert.ok(relay(`state=${state('chi-comanda-staging.up.railway.app')}&code=x`, extra)?.startsWith('https://chi-comanda-staging.up.railway.app/'))
    assert.ok(isInstallationHost('app.example.it', extra))
    assert.equal(isInstallationHost('other.up.railway.app', extra), false)
})

test('reads the host of the state, lowercase', () => {
    assert.equal(stateHost(state('Bagno-Al-Mare.chicomanda.com')), 'bagno-al-mare.chicomanda.com')
    assert.equal(stateHost(null), undefined)
    assert.equal(stateHost('x'.repeat(3000)), undefined)
})
