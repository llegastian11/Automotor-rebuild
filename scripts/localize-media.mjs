import fs from 'node:fs/promises'
import path from 'node:path'
import crypto from 'node:crypto'

const dataPath = path.resolve('src/data/site-content.json')
const mediaDir = path.resolve('public/migrated-media')
const publicPrefix = '/migrated-media/'
const data = JSON.parse(await fs.readFile(dataPath, 'utf8'))

function extFrom(url, mime = '') {
  const pathname = new URL(url).pathname
  const ext = path.extname(pathname)
  if (ext) return ext.split('?')[0]
  if (mime.includes('png')) return '.png'
  if (mime.includes('webp')) return '.webp'
  return '.jpg'
}

function filenameFor(url, mime) {
  const safe = path.basename(new URL(url).pathname).replace(/[^a-zA-Z0-9._-]/g, '-')
  const hash = crypto.createHash('sha1').update(url).digest('hex').slice(0, 8)
  const ext = extFrom(url, mime)
  return safe && safe.includes('.') ? `${hash}-${safe}` : `${hash}${ext}`
}

const urlSet = new Set()
for (const media of data.media) if (media.url) urlSet.add(media.url)
for (const entry of [...data.posts, ...data.pages]) for (const url of entry.imageUrls || []) urlSet.add(url)
for (const entry of [...data.posts, ...data.pages]) {
  for (const match of entry.contentHtml.matchAll(/https:\/\/automotor\.pe\/wp-content\/uploads\/[^"'\s)]+/g)) {
    urlSet.add(match[0])
  }
}

await fs.mkdir(mediaDir, { recursive: true })
const map = {}

for (const url of urlSet) {
  try {
    const res = await fetch(url)
    if (!res.ok) throw new Error(String(res.status))
    const mime = res.headers.get('content-type') || ''
    const filename = filenameFor(url, mime)
    const filePath = path.join(mediaDir, filename)
    const bytes = new Uint8Array(await res.arrayBuffer())
    await fs.writeFile(filePath, bytes)
    map[url] = `${publicPrefix}${filename}`
  } catch (error) {
    console.warn(`Skipped ${url}: ${error.message}`)
  }
}

function localizeUrl(url) {
  return map[url] || url
}

function localizeHtml(html = '') {
  let next = html
  for (const [remote, local] of Object.entries(map)) {
    next = next.split(remote).join(local)
  }
  return next
}

for (const media of data.media) {
  media.originalUrl = media.url
  media.url = localizeUrl(media.url)
}

for (const entry of [...data.posts, ...data.pages]) {
  if (entry.featuredMedia?.url) {
    entry.featuredMedia.originalUrl = entry.featuredMedia.url
    entry.featuredMedia.url = localizeUrl(entry.featuredMedia.url)
  }
  entry.imageUrls = (entry.imageUrls || []).map(localizeUrl)
  entry.contentHtml = localizeHtml(entry.contentHtml)
}

data.mediaLocalization = {
  generatedAt: new Date().toISOString(),
  downloaded: Object.keys(map).length,
  directory: publicPrefix,
}

await fs.writeFile(dataPath, JSON.stringify(data, null, 2))
await fs.writeFile(path.resolve('src/data/media-map.json'), JSON.stringify(map, null, 2))
console.log(`Downloaded ${Object.keys(map).length} media files to ${mediaDir}`)
