// Copies the public part of the user guide from the app's repository (docs/guida, without clienti/) into the site:
// Markdown into src/content/guida, the images the pages use into public/guida/img. The guide is written for GitHub
// (links between .md files, images in img/): the copies get the site's paths, /guida/<path> (README = the folder) and
// /guida/img/<file>. Run it after every change of the
// guide in the app (`npm run guida:sync [path-to-docs/guida]`), then commit. The app's guide is the source: never edit
// the copies here.
import fs from 'node:fs'
import path from 'node:path'
import { execFileSync } from 'node:child_process'

const source = path.resolve(process.argv[2] || process.env.GUIDA_SRC || '../chi-comanda/docs/guida')
const contentDir = path.resolve('src/content/guida')
const imgDir = path.resolve('public/guida/img')
/** Clients-only pages: never on the public site. */
const EXCLUDED = ['clienti']

if (!fs.existsSync(path.join(source, 'README.md'))) {
    console.error(`No guide in ${source}: pass the path of the app's docs/guida`)
    process.exit(1)
}

fs.rmSync(contentDir, { recursive: true, force: true })
fs.rmSync(imgDir, { recursive: true, force: true })
fs.mkdirSync(imgDir, { recursive: true })

/** Link of a page to another .md of the guide, as a path of the site. */
function siteHref(href, fromDir) {
    if (/^([a-z]+:|#|\/)/i.test(href)) return href
    const [file, hash] = href.split('#')
    if (!file.endsWith('.md')) return href
    const rel = path.posix.normalize(path.posix.join(fromDir, file)).replace(/\.md$/, '').replace(/(^|\/)README$/i, '')
    return `/guida${rel ? `/${rel}` : ''}${hash ? `#${hash}` : ''}`
}

const images = new Set()
let pages = 0
function copyDir(rel) {
    for (const entry of fs.readdirSync(path.join(source, rel), { withFileTypes: true })) {
        const relPath = path.join(rel, entry.name)
        if (entry.isDirectory()) {
            if (rel === '' && (EXCLUDED.includes(entry.name) || entry.name === 'img')) continue
            copyDir(relPath)
        } else if (entry.name.endsWith('.md')) {
            const text = fs.readFileSync(path.join(source, relPath), 'utf8')
            if (/\]\((\.\.\/)*clienti\//.test(text)) throw new Error(`${relPath} links to the clients-only pages`)
            for (const [, img] of text.matchAll(/(?:src="|\]\()(?:\.\.\/)*img\/([^")]+)/g)) images.add(img)
            fs.mkdirSync(path.join(contentDir, rel), { recursive: true })
            const fromDir = rel.split(path.sep).join('/')
            const site = text
                .replace(/\]\(([^)\s]+)\)/g, (_, href) => `](${siteHref(href, fromDir)})`)
                .replace(/src="(?:\.\.\/)*img\//g, 'src="/guida/img/')
            fs.writeFileSync(path.join(contentDir, relPath), site)
            pages++
        }
    }
}
copyDir('')
for (const img of images) fs.copyFileSync(path.join(source, 'img', img), path.join(imgDir, img))

let commit = ''
try {
    commit = execFileSync('git', ['-C', source, 'log', '-1', '--format=%h %cs', '--', '.'], { encoding: 'utf8' }).trim()
} catch { /* not a git checkout */ }
fs.writeFileSync(path.join(contentDir, 'SOURCE.txt'), `Copied from chi-comanda docs/guida${commit ? ` at ${commit}` : ''} by npm run guida:sync. Do not edit.\n`)
console.log(`${pages} pages, ${images.size} images${commit ? ` (chi-comanda ${commit})` : ''}`)
