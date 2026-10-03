import { test } from 'node:test'
import assert from 'node:assert/strict'
import { demoEmailText, validateDemoForm } from '../shared/demo-form.ts'

const valid = () => {
    const form = new FormData()
    form.set('topic', 'demo')
    form.set('name', 'Mario Rossi')
    form.set('venue', 'Bar Libra')
    form.set('email', 'mario@example.com')
    form.set('message', 'Vorrei una demo')
    form.set('consent', 'yes')
    return form
}

test('accepts a complete request', () => {
    const result = validateDemoForm(valid())
    assert.equal(result.ok, true)
    if (result.ok) assert.equal(result.request.phone, '')
})

test('flags the honeypot as spam', () => {
    const form = valid()
    form.set('website', 'http://spam.example')
    assert.deepEqual(validateDemoForm(form), { ok: false, spam: true, errors: [] })
})

test('requires consent, a valid email and the venue', () => {
    const form = valid()
    form.delete('consent')
    form.set('email', 'not-an-email')
    form.set('venue', '  ')
    const result = validateDemoForm(form)
    assert.equal(result.ok, false)
    if (!result.ok) assert.equal(result.errors.length, 3)
})

test('rejects unknown topics, bad phones and overlong fields', () => {
    const form = valid()
    form.set('topic', 'other')
    form.set('phone', 'call me')
    form.set('message', 'x'.repeat(2001))
    const result = validateDemoForm(form)
    assert.equal(result.ok, false)
    if (!result.ok) assert.equal(result.errors.length, 3)
})

test('the e-mail text carries every field', () => {
    const result = validateDemoForm(valid())
    if (!result.ok) assert.fail('valid request rejected')
    const body = demoEmailText(result.request, { country: 'IT' })
    for (const part of ['Richiesta demo', 'Mario Rossi', 'Bar Libra', 'mario@example.com', 'Vorrei una demo', 'IT']) {
        assert.ok(body.includes(part), part)
    }
})
