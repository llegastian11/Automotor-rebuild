import { entryByPath } from '../data/content';
import { withBase } from './url';

/**
 * WordPress content HTML still has automotor.pe hrefs and /migrated-media/
 * image srcs. Rewrite internal links to their real Astro route (with base)
 * and media paths to the base-prefixed public asset — same rules the old
 * client router applied at render time, just done once at build time here.
 */
function localizeHref(href: string): string {
  try {
    const url = new URL(href, 'https://automotor.pe');
    const pageMatch = url.pathname.match(/\/page\/(\d+)\/?$/);
    if (pageMatch) return withBase(`/archivo/page/${pageMatch[1]}/`);
    if (url.hostname === 'automotor.pe' && entryByPath.has(url.pathname)) return withBase(url.pathname);
  } catch {
    // not a valid absolute/relative URL against automotor.pe — leave as-is
  }
  return href;
}

export function rewriteContentHtml(html: string): string {
  return html
    .replace(/href="([^"]+)"/g, (_, href) => `href="${localizeHref(href)}"`)
    .replace(/src="(\/migrated-media\/[^"]+)"/g, (_, src) => `src="${withBase(src)}"`)
    .replace(/srcset="([^"]+)"/g, (_, srcset) => {
      const rewritten = srcset
        .split(',')
        .map((candidate: string) => {
          const [src, descriptor] = candidate.trim().split(/\s+/, 2);
          return [src.startsWith('/migrated-media/') ? withBase(src) : src, descriptor].filter(Boolean).join(' ');
        })
        .join(', ');
      return `srcset="${rewritten}"`;
    });
}
