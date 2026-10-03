# Chi Comanda: sito vetrina

Il sito pubblico di Chi Comanda: oggi in anteprima su `chicomanda-site.pages.dev`, domani su `chicomanda.com`.
È statico ([Astro](https://astro.build), senza framework lato client). Solo il modulo demo ha un piccolo backend: una
Cloudflare Pages Function.

| Percorso | Contenuto |
|---|---|
| `/` | Hero, funzioni, come funziona, ruoli, per chi è, invito alla demo |
| `/demo` | Modulo per la demo o per un contatto, con il link email come alternativa |
| `/demo/grazie`, `/demo/errore` | Esito dell'invio, funzionano anche senza JavaScript |
| `/accedi` | Accesso all'app del proprio locale (`<slug>.chicomanda.com/login`) |
| `/privacy` | Informativa privacy |
| `404` | Pagina d'errore |
| `POST /modulo/demo` | Pages Function del modulo (`functions/modulo/demo.ts`) |

Il sito **non usa mai i percorsi dell'app** (`/login`, `/api`, `/auth`, `/admin`, `/waiter`, `/bartender`,
`/checkout`, `/tables`, `/profile`, `/invitation`, `/reset`, `/askreset`, `/landing`, `/socket.io`): al passaggio
di dominio diventano redirect verso Libra.

## Sviluppo

Node 22 (`.nvmrc`).

```bash
npm install
npm run dev              # http://localhost:4321, senza la Function
npm run check            # astro check + typecheck della Function
npm test                 # regole del modulo e degli slug
npm run build            # dist/, con sitemap e _headers generati
npm run dev:functions    # build + wrangler pages dev: sito, Function e _headers come in produzione
npm run todo             # elenca i segnaposto [[DA COMPLETARE: …]]
```

Per `dev:functions` copia `.dev.vars.example` in `.dev.vars` (non va mai nel repo). Il secret di test di Turnstile
nell'esempio fa sempre passare la verifica.

### Struttura

```
src/site.ts                  impostazioni: indexable, email, chiave Turnstile, dati del titolare
src/styles/tokens.css        colori del tema (da theme.ts dell'app), chiaro e scuro
src/icons/deco.ts            icone Art Déco, copiate dall'app
src/assets/logo/             loghi maître chiaro e scuro, copiati dall'app
shared/demo-form.ts          validazione del modulo (usata dalla Function)
shared/slug.ts               normalizzazione e regole degli slug (come scripts/lib/slug.mjs dell'app)
functions/modulo/demo.ts     Pages Function del modulo
integrations/security-headers.mjs   scrive dist/_headers (CSP con gli hash degli script inline)
scripts/og-image.mjs         rigenera public/og.png (1200×630)
cutover/_redirects           redirect per il passaggio di dominio, NON attivi
```

### Da tenere allineato con l'app (`chi-comanda`)

- `src/icons/deco.ts` è una copia di `client/src/icons/deco.ts`;
- `src/styles/tokens.css` riprende i colori di `client/src/plugins/theme.ts`;
- `shared/slug.ts` ripete le regole e i nomi riservati di `scripts/lib/slug.mjs`;
- loghi e icone (`favicon.*`, `apple-touch-icon.png`, `icon-192.png`, `icon-512.png`) vengono da `client/public` e
  `client/src/assets/logo`.

## Scelte

- **Font**: Federo self-hosted da `@fontsource/federo` per titoli e wordmark, font di sistema per il testo. Nessuna
  richiesta a Google Fonts.
- **Tema**: segue `prefers-color-scheme`; il pulsante nell'header lo forza e lo ricorda in `localStorage`.
- **Niente cookie**: statistiche con Cloudflare Web Analytics (senza cookie), quindi nessun banner. In
  `localStorage` restano solo il tema e l'ultimo locale di `/accedi`, dichiarati nella privacy.
- **Funzioni non promesse**: scontrino fiscale o registratore telematico (non c'è nel codice), uso offline (il
  service worker non ha cache), la versione "premium" dei cocktail.
- **noindex**: finché `SITE.indexable` in `src/site.ts` è `false` ogni pagina ha `noindex`. Gli indirizzi `*.pages.dev`
  hanno sempre `X-Robots-Tag: noindex` (in `_headers`), anche dopo il passaggio.
- **CSP**: `dist/_headers` è generato a ogni build: gli script inline sono ammessi solo tramite il loro hash sha256.
  Se aggiungi uno script esterno, aggiungilo in `integrations/security-headers.mjs`.

### Il modulo demo

`POST /modulo/demo` valida i campi (nome, locale, email, telefono facoltativo, messaggio, consenso), scarta in
silenzio gli invii che compilano il campo trappola, verifica Turnstile e invia **una email in testo semplice** con
Mailjet, con `Reply-To` impostato su chi ha scritto. Non salva niente. Senza JavaScript il browser segue un redirect
303 a `/demo/grazie` o `/demo/errore`; con JavaScript l'esito compare nella pagina e, in caso di errore, c'è un link
`mailto:` con il messaggio già pronto.

Secret del progetto Pages (*Settings → Variables and Secrets*, ambiente Production e Preview):

| Nome | Valore |
|---|---|
| `TURNSTILE_SECRET` | secret key del widget Turnstile |
| `MAILJET_API_KEY`, `MAILJET_API_SECRET` | chiavi API di Mailjet (le stesse dell'app vanno bene, meglio una sotto-chiave dedicata) |
| `MAIL_FROM` | mittente su un dominio autenticato in Mailjet, es. `sito@chicomanda.com` |
| `DEMO_TO` | indirizzo che riceve le richieste: `info@chicomanda.com` |

Se ne manca uno la Function risponde con errore e la pagina propone il link email.

### Accedi

`/accedi` normalizza il nome scritto ("Bagno Al Mare" → `bagno-al-mare`, accetta anche
`libra.chicomanda.com/login`), lo valida con le regole dell'app e, prima del redirect, fa una richiesta `no-cors` a
`https://<slug>.chicomanda.com/api/health` con un timeout di 6 secondi: se il sottodominio non esiste la pagina
dice "Locale non trovato" invece di mostrare l'errore DNS del browser. Nessun elenco di clienti viene pubblicato.
Questo funziona finché sulla zona `chicomanda.com` **non c'è un record DNS jolly** (`*`). Link diretti:
`/accedi?locale=libra`.

## Pubblicazione su Cloudflare Pages

Il progetto si chiama `chicomanda-site`, quindi l'anteprima è `https://chicomanda-site.pages.dev`. Non serve nessun
record DNS e `chicomanda.com` resta com'è.

**Con il repo GitHub** (consigliato): Cloudflare → *Workers & Pages* → *Create* → *Pages* → *Connect to Git* →
`Spadanera/chicomanda-site`.

- Production branch: `main`
- Build command: `npm run build`
- Build output directory: `dist`
- Variabile `NODE_VERSION` = `22`

La cartella `functions/` viene presa in automatico. Ogni altro branch ottiene un'anteprima
`<branch>.chicomanda-site.pages.dev`.

**Oppure a mano** dalla tua macchina:

```bash
npx wrangler login
npm run build
npx wrangler pages deploy dist --project-name chicomanda-site --branch main
```

Dopo il primo deploy:

1. **Secret** del modulo (tabella sopra).
2. **Turnstile**: Cloudflare → *Turnstile* → *Add widget*, hostname `chicomanda-site.pages.dev`,
   `vetrina.chicomanda.com` e `chicomanda.com`,
   modalità *Managed*. La site key va in `SITE.turnstileSiteKey` (`src/site.ts`), la secret key in `TURNSTILE_SECRET`.
3. **Web Analytics**: progetto Pages → *Metrics* → *Web Analytics* → *Enable*.
4. **Prova**: una richiesta demo vera, che arrivi a `DEMO_TO` e che rispondendo si risponda a chi l'ha inviata.

## Anteprima pubblica su vetrina.chicomanda.com

Finché `chicomanda.com` serve l'app di Libra, il sito è pubblicato anche su `vetrina.chicomanda.com`: progetto Pages
→ *Custom domains* → *Set up a custom domain* → `vetrina.chicomanda.com`. Cloudflare crea un solo record, il CNAME
`vetrina` → `chicomanda-site.pages.dev`, e il certificato. Non tocca apex, `www`, MX, TXT o i record di Mailjet.

- `vetrina` è tra gli slug riservati di `/accedi` (`shared/slug.ts`): va aggiunto anche a `RESERVED_SLUGS` in
  `scripts/lib/slug.mjs` dell'app, perché `new-client` non crei un locale con quel nome.
- L'indirizzo ha sempre `X-Robots-Tag: noindex` (in `_headers`), anche dopo il passaggio.
- Dopo il passaggio a `chicomanda.com`: una *Redirect Rule* 301 da `vetrina.chicomanda.com/*` a
  `https://chicomanda.com/${1}`, oppure rimuovere il custom domain e il CNAME.

## Passaggio a chicomanda.com (pianificato, da fare solo quando deciso)

Il passaggio tocca solo i record di `chicomanda.com` e `www`, mai MX, TXT, SPF, DKIM o i record di Mailjet.

1. **Libra sul suo sottodominio**: seguire *Moving a client to another domain* in `DEPLOY.md` dell'app, fino a quando
   `https://libra.chicomanda.com/api/health` risponde e lo staff usa il nuovo indirizzo.
2. **Verificare i redirect sull'anteprima**: copiare `cutover/_redirects` in `public/_redirects` su un branch, fare il
   deploy di anteprima e controllare che il percorso e la **query** restino uguali, per esempio
   `curl -sI 'https://<branch>.chicomanda-site.pages.dev/reset/abc?x=1'` deve dare `301` con
   `location: https://libra.chicomanda.com/reset/abc?x=1`. E che `POST /modulo/demo` funzioni ancora.
3. **Custom domain**: nel progetto Pages → *Custom domains* → aggiungere `chicomanda.com` e `www.chicomanda.com`
   (Cloudflare sostituisce i record apex/`www` che oggi puntano all'app su Railway). Con `public/_redirects` già in
   produzione, così i vecchi link dell'app vengono rediretti da subito. `www` → apex con una *Redirect Rule* o
   un *Bulk Redirect*.
4. **Indicizzazione**: `indexable: true` in `src/site.ts`, deploy, poi la sitemap
   `https://chicomanda.com/sitemap-index.xml` su Google Search Console.
5. Rimuovere `chicomanda.com` dai domini del servizio Railway di Libra solo dopo che i redirect funzionano.

Due dettagli dal codice dell'app:

- `/askreset` manca dall'elenco dei percorsi da redirigere in `DEPLOY.md` (punto 5 di *Moving a client*); qui c'è, e ci
  sono anche `/auth`, `/socket.io` e `/landing`;
- il sito tiene **`/icon-192.png` allo stesso percorso**: le notifiche push già attive su `chicomanda.com` la usano come
  icona.

## Da completare

`npm run todo` elenca i segnaposto `[[DA COMPLETARE: …]]` ancora presenti. Oggi:

- site key Turnstile (oggi la chiave di test, che fa passare tutto);
- conferma dell'elenco "Per chi è" (bar e cocktail bar, discoteche e locali con tavoli, eventi privati, feste e sagre);
- prezzi: per ora non mostrati (né piani né "su richiesta");
- Libra come referenza, con nome ed eventuale frase: per ora non citata.
