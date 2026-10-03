import { test } from 'node:test'
import assert from 'node:assert/strict'
import { displayName, normalizeSlug, slugProblem } from '../shared/slug.ts'

test('normalizes what people type', () => {
    assert.equal(normalizeSlug('  Libra '), 'libra')
    assert.equal(normalizeSlug('Bagno Al Mare'), 'bagno-al-mare')
    assert.equal(normalizeSlug('Caffè dell’Orologio'), 'caffe-dellorologio')
    assert.equal(normalizeSlug('bar__2000!!'), 'bar-2000')
    assert.equal(normalizeSlug('--x--'), 'x')
})

test('accepts the installation address', () => {
    assert.equal(normalizeSlug('libra.chicomanda.com'), 'libra')
    assert.equal(normalizeSlug('https://Libra.ChiComanda.com/login?x=1'), 'libra')
    // Another domain is just text
    assert.equal(normalizeSlug('libra.example.com'), 'libra-example-com')
})

test('validates like scripts/lib/slug.mjs', () => {
    assert.equal(slugProblem('libra'), null)
    assert.equal(slugProblem('bagno-al-mare'), null)
    assert.equal(slugProblem('ab'), null)
    assert.equal(slugProblem(''), 'empty')
    assert.equal(slugProblem('a'), 'invalid')
    assert.equal(slugProblem('a'.repeat(31)), 'invalid')
    assert.equal(slugProblem('a'.repeat(30)), null)
    assert.equal(slugProblem('-ab'), 'invalid')
    for (const reserved of ['www', 'mail', 'api', 'app', 'admin', 'staging', 'stage', 'status']) {
        assert.equal(slugProblem(reserved), 'reserved')
    }
})

test('display name', () => {
    assert.equal(displayName('libra'), 'Libra')
    assert.equal(displayName('bagno-al-mare'), 'Bagno Al Mare')
})
