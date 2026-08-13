import fs from 'node:fs/promises'
import path from 'node:path'
import http from 'node:http'
import { chromium } from 'playwright'
import site from '../src/data/site-content.json' with { type: 'json' }

const dist = path.resolve('dist')
let origin = ''
const routes = new Set(['/','/archivo/'])

for (let page = 2; page <= Math.ceil(site.posts.length / 12); page += 1) routes.add(`/archivo/page/${page}/`)
for (const category of site.categories.filter((cat) => cat.count > 0)) routes.add(`/categoria/${category.slug}/`)
for (const post of site.posts) routes.add(post.path)
for (const page of site.pages) routes.add(page.path)

function targetFile(route) {
  if (route === '/') return path.join(dist, 'index.html')
  return path.join(dist, route.replace(/^\/|\/$/g, ''), 'index.html')
}

const server = http.createServer(async (request, response) => {
  const url = new URL(request.url, origin)
  let filePath = path.join(dist, url.pathname)
  try {
    const stat = await fs.stat(filePath)
    if (stat.isDirectory()) filePath = path.join(filePath, 'index.html')
  } catch {
    filePath = path.join(dist, 'index.html')
  }
  let body
  try {
    body = await fs.readFile(filePath)
  } catch {
    filePath = path.join(dist, 'index.html')
    body = await fs.readFile(filePath)
  }
  response.writeHead(200, { 'content-type': filePath.endsWith('.css') ? 'text/css' : filePath.endsWith('.js') ? 'application/javascript' : 'text/html' })
  response.end(body)
})

await new Promise((resolve) => server.listen(0, '127.0.0.1', resolve))
origin = `http://127.0.0.1:${server.address().port}`

const browser = await chromium.launch({ headless: true })
for (const route of routes) {
  const page = await browser.newPage({ viewport: { width: 1365, height: 900 } })
  await page.goto(`${origin}${route}`, { waitUntil: 'networkidle' })
  const html = await page.content()
  const file = targetFile(route)
  await fs.mkdir(path.dirname(file), { recursive: true })
  await fs.writeFile(file, html)
  await page.close()
}
await browser.close()
server.close()
console.log(`Prerendered ${routes.size} routes`)
