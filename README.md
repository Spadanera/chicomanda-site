# Chi Comanda: showcase site

The public site of Chi Comanda: today on the previews `chicomanda-site.pages.dev` and `vetrina.chicomanda.com`, later
on `chicomanda.com`. It is static ([Astro](https://astro.build), no client-side framework); only the demo form has a
small backend, a Cloudflare Pages Function. The site's copy is in Italian.

| Path | Content |
|---|---|
| `/` | Hero, features, how it works, roles, who it is for, call to request a demo |
| `/demo` | Demo/contact form, with an e-mail link as fallback |
| `/demo/grazie`, `/demo/errore` | Outcome of the form, also without JavaScript |
| `/accedi` | Sign-in: sends the user to their venue's app (`<slug>.chicomanda.com/login`) |
| `/privacy` | Privacy policy |
| `/guida`, `/guida/…` | User guide for the venues' staff, copied from the app (below) |
| `404` | Error page |
| `POST /modulo/demo` | Pages Function of the form (`functions/modulo/demo.ts`) |
| `GET /oauth/google` | Relay of the app's Google login (`functions/oauth/google.ts`, below) |

The site **never uses the app's paths** (`/login`, `/api`, `/auth`, `/admin`, `/waiter`, `/bartender`, `/checkout`,
`/tables`, `/profile`, `/invitation`, `/reset`, `/askreset`, `/landing`, `/socket.io`): at the domain cutover they
became redirects to Ludoproject's app (`ludoproject.chicomanda.com`) at the cutover of 5 October 2026.

## User guide (`/guida`)

The guide is written in the app's repository, `chi-comanda/docs/guida` (Markdown, Italian), and copied here: never
edit `src/content/guida` or `public/guida/img` by hand.

```bash
npm run guida:sync                       # from ../chi-comanda/docs/guida
npm run guida:sync -- /path/to/docs/guida
```

The script copies the public pages only (`docs/guida/clienti/` is for clients and never published; a public page
linking to it stops the copy), rewrites the links between `.md` files to `/guida/<path>` (a folder's `README.md` is
the folder) and the images to `/guida/img/`, copies only the images the pages use, and records the app's commit in
`src/content/guida/SOURCE.txt`. Pages are rendered by `src/pages/guida/[...slug].astro` (title from the first `#`,
description from the first paragraph). After a sync: `npm run build`, check, commit, push.

When to sync: after the app's guide changes on the branch the clients use (today `main`, as only stage and a friendly
venue use the new features; later `production`).

## Development

Node 22 (`.nvmrc`).

```bash
npm install
npm run dev              # http://localhost:4321 (or --port), without the Function
npm run check            # astro check + typecheck of the Function
npm test                 # form and slug rules
npm run build            # dist/, with generated sitemap and _headers
npm run dev:functions    # build + wrangler pages dev: site, Function and _headers as in production
npm run todo             # lists the [[DA COMPLETARE: …]] placeholders
```

For `dev:functions` copy `.dev.vars.example` to `.dev.vars` (never commit it). Locally the site uses Cloudflare's
Turnstile **test keys** (the site key in `dev`/`dev:functions`, the secret in the example), which always pass: the
real keys only work on the widget's hostnames. The real secret lives only in the Pages project's secrets.

### Layout

```
src/site.ts                  settings: indexable, e-mail, Turnstile site key, data controller
src/styles/tokens.css        theme colours (from the app's theme.ts), light and dark
src/styles/fields.css        Material form controls (as Vuetify's), used by /demo and /accedi
src/icons/deco.ts            Art Déco icons, copied from the app
src/assets/logo/             maître logos, light and dark, copied from the app
shared/demo-form.ts          form validation (used by the Function)
shared/slug.ts               slug normalisation and rules (as the app's scripts/lib/slug.mjs)
functions/modulo/demo.ts     Pages Function of the form
integrations/security-headers.mjs   writes dist/_headers (CSP with the hashes of the inline scripts)
scripts/og-image.mjs         regenerates public/og.png (1200×630)
cutover/_redirects           redirects for the domain cutover, NOT active
```

### Keep in sync with the app (`chi-comanda`)

- `src/icons/deco.ts` is a copy of `client/src/icons/deco.ts`;
- `src/styles/tokens.css` follows the colours of `client/src/plugins/theme.ts`;
- `shared/slug.ts` repeats the rules and reserved names of `scripts/lib/slug.mjs` (plus `vetrina`, see below);
- logos and icons (`favicon.*`, `apple-touch-icon.png`, `icon-192.png`, `icon-512.png`) come from `client/public` and
  `client/src/assets/logo`.

## Choices

- **Same look as the app**: moving from the site to a venue's app must not feel like changing site.
  - Fonts: the app's own stack, Vuetify's `"Roboto", sans-serif` (the app doesn't load Roboto, so Android shows Roboto,
    Apple devices Helvetica, Windows Arial: the site does the same). Federo, self-hosted from `@fontsource/federo`,
    only for the wordmark, as in the app. No requests to Google Fonts. If the app ever self-hosts Roboto
    (`@fontsource/roboto`), do the same here.
  - Form fields, checkbox and radio: Material Design as Vuetify 3 draws them (`v-text-field` "filled" variant, floating
    label, suffix, messages), in `src/styles/fields.css`.
  - Buttons and cards: `v-btn` (uppercase, 4px radius, elevated / outlined) and `v-card` (4px, elevation 1).
- **Theme**: follows `prefers-color-scheme`; the header button forces it and remembers it in `localStorage`.
- **No cookies**: analytics with Cloudflare Web Analytics (cookieless), hence no banner. `localStorage` holds only the
  theme and the last venue of `/accedi`, both declared in the privacy policy.
- **Features not promised**: fiscal receipts / telematic cash register (not in the code), offline use (the service
  worker has no cache), the "premium" cocktail version.
- **noindex**: while `SITE.indexable` in `src/site.ts` is `false`, every page has `noindex`. The `*.pages.dev` addresses
  and `vetrina.chicomanda.com` always get `X-Robots-Tag: noindex` (in `_headers`), also after the cutover.
- **CSP**: `dist/_headers` is generated by every build: inline scripts are allowed only by their sha256 hash. An
  external script must be added in `integrations/security-headers.mjs`.

### Demo form

`POST /modulo/demo` validates the fields (name, venue, e-mail, optional phone, message, consent), silently drops
submissions that fill the honeypot field, verifies Turnstile and sends **one plain-text e-mail** through Mailjet, with
`Reply-To` set to the sender. Nothing is stored. Without JavaScript the browser follows a 303 redirect to `/demo/grazie`
or `/demo/errore`; with JavaScript the outcome is shown in the page and, on error, a `mailto:` link with the message
ready to send.

Secrets of the Pages project (*Settings → Variables and Secrets*, Production and Preview):

| Name | Value |
|---|---|
| `TURNSTILE_SECRET` | secret key of the Turnstile widget |
| `MAILJET_API_KEY`, `MAILJET_API_SECRET` | Mailjet API keys (the app's keys work; a dedicated sub-key is better) |
| `MAIL_FROM` | sender on a domain authenticated in Mailjet, e.g. `sito@chicomanda.com` |
| `DEMO_TO` | address receiving the requests: `info@chicomanda.com` |

If one is missing the Function answers with an error and the page offers the e-mail link.

### Sign-in (`/accedi`)

`/accedi` normalises the typed name ("Bagno Al Mare" → `bagno-al-mare`; `ludoproject.chicomanda.com/login` is accepted too),
validates it with the app's rules and, before redirecting, makes a `no-cors` request to
`https://<slug>.chicomanda.com/api/health` with a 6-second timeout: if the subdomain doesn't exist the page says
"Locale non trovato" instead of showing the browser's DNS error. No list of clients is published. This works as long
as the `chicomanda.com` zone has **no wildcard DNS record** (`*`). Direct links: `/accedi?locale=ludoproject`.

## Google login relay (`/oauth/google`)

Google accepts no wildcard redirect URI, so instead of registering `https://<slug>.chicomanda.com/api/auth/google/callback`
for every client, the OAuth client has **one** redirect URI, `https://chicomanda.com/oauth/google`, and every installation
sets `GOOGLE_CALLBACK_URL` to it (the app's `scripts/new-client` does). The installation sends Google a signed `state`
naming its host; Google answers here; the function forwards the whole query to
`https://<host>/api/auth/google/callback`, where the installation checks the signature and its session's nonce
(`shared/oauth-relay.ts`, app: `server/src/auth/google-state.ts`).

It forwards only to `<slug>.chicomanda.com` with a valid client slug, or to a host in the variable
`OAUTH_EXTRA_HOSTS` of the Pages project (comma separated: the stage on Railway, clients on their own domain). It never
verifies or stores anything: the code is useless without the Google client secret, which only the installations hold.

## Publishing on Cloudflare Pages

The project is named `chicomanda-site`, so its address is `https://chicomanda-site.pages.dev`. No DNS record is needed
and `chicomanda.com` is left as it is.

**From the GitHub repository** (recommended): Cloudflare → *Workers & Pages* → *Create*. The page offers a **Worker**
by default (with "Deploy command" and "Preview command"): use the *Pages* link at the bottom instead ("Looking to
deploy Pages?") → *Import an existing Git repository* → `Spadanera/chicomanda-site`.

- Production branch: `main`
- Build command: `npm run build`
- Build output directory: `dist`
- Environment variable `NODE_VERSION` = `22`

The `functions/` folder is picked up automatically. Every push to `main` deploys; any other branch gets a preview at
`<branch>.chicomanda-site.pages.dev`.

**Or by hand** from your machine:

```bash
npx wrangler login
npm run build
npx wrangler pages deploy dist --project-name chicomanda-site --branch main
```

After the first deploy:

1. **Secrets** of the form (table above).
2. **Turnstile**: Cloudflare → *Turnstile* → widget `chicomanda-site`, *Managed* mode, hostnames
   `chicomanda-site.pages.dev`, `vetrina.chicomanda.com` and `chicomanda.com`. The site key is in
   `SITE.turnstileSiteKey` (`src/site.ts`), the secret key in `TURNSTILE_SECRET`.
3. **Web Analytics**: Pages project → *Metrics* → *Web Analytics* → *Enable*.
4. **Test**: a real demo request, which must reach `DEMO_TO`; replying to it must reply to the sender.

## Public preview on vetrina.chicomanda.com

While `chicomanda.com` serves Libra's app, the site is also published on `vetrina.chicomanda.com`: Pages project →
*Custom domains* → *Set up a custom domain* → `vetrina.chicomanda.com`. Cloudflare creates a single record, the CNAME
`vetrina` → `chicomanda-site.pages.dev`, and the certificate. It doesn't touch the apex, `www`, MX, TXT or Mailjet's
records.

- `vetrina` is a reserved slug in `/accedi` (`shared/slug.ts`): add it to `RESERVED_SLUGS` in the app's
  `scripts/lib/slug.mjs` too, so `new-client` never creates a venue with that name.
- The address always has `X-Robots-Tag: noindex` (in `_headers`), also after the cutover.
- After the cutover to `chicomanda.com`: a 301 *Redirect Rule* from `vetrina.chicomanda.com/*` to
  `https://chicomanda.com/${1}`, or remove the custom domain and its CNAME.

## Cutover to chicomanda.com (planned, only when decided)

The cutover touches only the `chicomanda.com` (apex) and `www` records, never MX, TXT, SPF, DKIM or Mailjet's records.

1. **Libra on its subdomain**: follow *Moving a client to another domain* in the app's `DEPLOY.md`, until
   `https://libra.chicomanda.com/api/health` answers and the staff uses the new address.
2. **Check the redirects on a preview**: copy `cutover/_redirects` to `public/_redirects` on a branch, deploy the
   preview and check that path and **query** are kept, e.g.
   `curl -sI 'https://<branch>.chicomanda-site.pages.dev/reset/abc?x=1'` must give `301` with
   `location: https://libra.chicomanda.com/reset/abc?x=1`, and that `POST /modulo/demo` still works.
3. **Custom domain**: merge the branch so `public/_redirects` is in production, then in the Pages project → *Custom
   domains* → add `chicomanda.com` and `www.chicomanda.com` (Cloudflare replaces the apex/`www` records that point to
   the app on Railway today). The app's old links are redirected right away. `www` → apex with a *Redirect Rule* or a
   *Bulk Redirect*.
4. **Indexing**: `indexable: true` in `src/site.ts`, deploy, then submit `https://chicomanda.com/sitemap-index.xml` to
   Google Search Console.
5. Remove `chicomanda.com` from the domains of Libra's Railway service only once the redirects work.
6. `vetrina.chicomanda.com`: redirect or remove it (see above).

Two details from the app's code:

- `/askreset` is missing from the list of paths to redirect in `DEPLOY.md` (step 5 of *Moving a client*); it is here,
  together with `/auth`, `/socket.io` and `/landing`;
- the site keeps **`/icon-192.png` at the same path**: the push subscriptions already active on `chicomanda.com` use
  it as their icon.

## Still open

`npm run todo` lists the `[[DA COMPLETARE: …]]` placeholders still in the code (none today). Open choices:

- prices: not shown for now (neither plans nor "on request");
- Libra as a reference, with name and maybe a quote: not mentioned for now.
