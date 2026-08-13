import fs from 'node:fs/promises'
import path from 'node:path'

const base = 'https://automotor.pe/wp-json/wp/v2'
const outDir = path.resolve('src/data')

async function fetchJson(url) {
  const res = await fetch(url)
  if (!res.ok) throw new Error(`${res.status} ${url}`)
  return res.json()
}

async function fetchAll(endpoint, params = '') {
  const first = await fetch(`${base}/${endpoint}?per_page=100&page=1${params}`)
  if (!first.ok) throw new Error(`${first.status} ${endpoint}`)
  const pages = Number(first.headers.get('x-wp-totalpages') || 1)
  const items = await first.json()
  for (let page = 2; page <= pages; page += 1) {
    items.push(...(await fetchJson(`${base}/${endpoint}?per_page=100&page=${page}${params}`)))
  }
  return items
}

function strip(html = '') {
  return html
    .replace(/<script[\s\S]*?<\/script>/gi, '')
    .replace(/<style[\s\S]*?<\/style>/gi, '')
    .replace(/<[^>]*>/g, ' ')
    .replace(/&nbsp;/g, ' ')
    .replace(/&hellip;/g, '...')
    .replace(/&#8211;/g, '-')
    .replace(/\s+/g, ' ')
    .trim()
}

function cleanHtml(html = '') {
  return html
    .replace(/<script[\s\S]*?<\/script>/gi, '')
    .replace(/<style[\s\S]*?<\/style>/gi, '')
    .replace(/\sclass="[^"]*"/g, '')
    .replace(/\sstyle="[^"]*"/g, '')
}

function pathFrom(link) {
  try {
    return new URL(link).pathname
  } catch {
    return '/'
  }
}

const [postsRaw, pagesRaw, categoriesRaw, mediaRaw] = await Promise.all([
  fetchAll('posts', '&_embed=1'),
  fetchAll('pages', '&_embed=1'),
  fetchAll('categories'),
  fetchAll('media'),
])

const categories = Object.fromEntries(
  categoriesRaw.map((cat) => [
    cat.id,
    { id: cat.id, name: cat.name, slug: cat.slug, link: cat.link, path: pathFrom(cat.link), count: cat.count },
  ]),
)

const media = Object.fromEntries(
  mediaRaw.map((item) => [
    item.id,
    {
      id: item.id,
      date: item.date,
      slug: item.slug,
      title: strip(item.title?.rendered || ''),
      alt: item.alt_text || strip(item.title?.rendered || ''),
      url: item.source_url,
      mime: item.mime_type,
      width: item.media_details?.width || null,
      height: item.media_details?.height || null,
      sizes: item.media_details?.sizes || {},
    },
  ]),
)

function normalize(item, type) {
  const featured = media[item.featured_media] || null
  const cats = (item.categories || []).map((id) => categories[id]).filter(Boolean)
  return {
    id: item.id,
    type,
    date: item.date,
    modified: item.modified,
    slug: item.slug,
    link: item.link,
    path: pathFrom(item.link),
    title: strip(item.title?.rendered || ''),
    excerpt: strip(item.excerpt?.rendered || '').replace(/\s*\[\.\.\.\]$/, '...'),
    contentHtml: cleanHtml(item.content?.rendered || ''),
    plainText: strip(item.content?.rendered || ''),
    categories: cats,
    category: cats[0]?.name || 'Pagina',
    featuredMedia: featured,
    imageUrls: [
      ...new Set([
        ...(featured?.url ? [featured.url] : []),
        ...[...(item.content?.rendered || '').matchAll(/<img[^>]+src=["']([^"']+)["']/gi)].map((m) => m[1]),
      ]),
    ],
  }
}

const posts = postsRaw.map((post) => normalize(post, 'post'))
const pages = pagesRaw.map((page) => normalize(page, 'page'))

await fs.mkdir(outDir, { recursive: true })
await fs.writeFile(
  path.join(outDir, 'site-content.json'),
  JSON.stringify(
    {
      generatedAt: new Date().toISOString(),
      source: base,
      totals: { posts: posts.length, pages: pages.length, categories: categoriesRaw.length, media: mediaRaw.length },
      categories: categoriesRaw.map((cat) => categories[cat.id]),
      posts,
      pages,
      media: Object.values(media),
    },
    null,
    2,
  ),
)

console.log(`Exported ${posts.length} posts, ${pages.length} pages, ${categoriesRaw.length} categories, ${mediaRaw.length} media`)
