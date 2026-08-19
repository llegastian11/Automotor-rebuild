import siteRaw from './site-content.json';

export interface FeaturedMedia {
  url: string;
  alt?: string;
  title?: string;
  width?: number;
  height?: number;
}

export interface CategoryRef {
  id: number;
  name: string;
  slug: string;
  path: string;
  count: number;
}

export interface ContentEntry {
  id: number;
  type: 'post' | 'page';
  date: string;
  modified: string;
  slug: string;
  link: string;
  path: string;
  title: string;
  excerpt?: string;
  contentHtml: string;
  plainText: string;
  categories: CategoryRef[];
  category?: string;
  featuredMedia?: FeaturedMedia;
  imageUrls?: string[];
}

interface SiteContent {
  generatedAt: string;
  totals: { posts: number; pages: number; categories: number; media: number };
  categories: CategoryRef[];
  posts: ContentEntry[];
  pages: ContentEntry[];
}

export const site = siteRaw as unknown as SiteContent;

export const posts = site.posts;
export const pages = site.pages;
export const categories = site.categories;
export const activeCategories = categories.filter((cat) => cat.count > 0);

const allEntries = [...posts, ...pages];
export const entryByPath = new Map(allEntries.map((entry) => [entry.path, entry]));

/** Service pages that get a dedicated quote-form layout instead of the generic article layout. */
export const SERVICE_SLUGS = [
  'consulta-vehicular',
  'soat-electronico',
  'gps-vehicular',
  'seguro-vehicular',
  'reporte-infocorp',
  'libro-de-reclamos',
] as const;

export function postsByCategory(slug: string, limit = 6): ContentEntry[] {
  return posts.filter((post) => post.categories.some((cat) => cat.slug === slug)).slice(0, limit);
}

export function formatDate(value: string): string {
  return new Intl.DateTimeFormat('es-PE', { day: '2-digit', month: 'short', year: 'numeric' }).format(new Date(value));
}

export function clip(text = '', length = 180): string {
  return text.length > length ? `${text.slice(0, length).trim()}...` : text;
}

export function paginate<T>(items: T[], perPage: number, page: number): { items: T[]; page: number; totalPages: number } {
  const totalPages = Math.max(1, Math.ceil(items.length / perPage));
  const current = Math.min(Math.max(page, 1), totalPages);
  return { items: items.slice((current - 1) * perPage, current * perPage), page: current, totalPages };
}

const FALLBACK_IMAGE = '/migrated-media/86188978-como-saber-si-un-toyota-yaris-tiene-papeletas-en-peru.webp';

export function entryDescription(entry: ContentEntry): string {
  return clip(entry.excerpt || entry.plainText || 'Información automotriz en Perú.', 155);
}

export function entryImage(entry: ContentEntry): string {
  return entry.featuredMedia?.url || FALLBACK_IMAGE;
}
