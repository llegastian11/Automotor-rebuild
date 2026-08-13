import fs from 'node:fs/promises'
import path from 'node:path'
import site from '../src/data/site-content.json' with { type: 'json' }

const origin = 'https://automotor.pe'
const publicDir = path.resolve('public')
const urls = new Map()

function add(pathname, modified, priority = '0.7') {
  urls.set(pathname, { loc: `${origin}${pathname}`, lastmod: modified?.slice(0, 10), priority })
}

add('/', site.generatedAt, '1.0')
add('/archivo/', site.generatedAt, '0.8')
for (let page = 2; page <= Math.ceil(site.posts.length / 12); page += 1) add(`/archivo/page/${page}/`, site.generatedAt, '0.5')
for (const category of site.categories.filter((cat) => cat.count > 0)) add(`/categoria/${category.slug}/`, site.generatedAt, '0.7')
for (const post of site.posts) add(post.path, post.modified || post.date, '0.8')
for (const page of site.pages) add(page.path, page.modified || page.date, page.path === '/' ? '1.0' : '0.7')

const sitemap = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${[...urls.values()]
  .map(
    (url) => `  <url>\n    <loc>${url.loc}</loc>\n    ${url.lastmod ? `<lastmod>${url.lastmod}</lastmod>` : ''}\n    <priority>${url.priority}</priority>\n  </url>`,
  )
  .join('\n')}\n</urlset>\n`

await fs.mkdir(publicDir, { recursive: true })
await fs.writeFile(path.join(publicDir, 'sitemap.xml'), sitemap)
await fs.writeFile(path.join(publicDir, 'robots.txt'), `User-agent: *\nAllow: /\nSitemap: ${origin}/sitemap.xml\n`)
console.log(`Generated sitemap with ${urls.size} URLs`)
