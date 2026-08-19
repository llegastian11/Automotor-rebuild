/**
 * GitHub Pages serves this site under /Automotor-rebuild/ (astro.config `base`).
 * Root-relative hrefs/srcs written in markup don't get that prefix automatically —
 * this helper centralizes the rule (see the same fix applied to automotor-prototipo).
 */
export function withBase(path: string): string {
  const base = import.meta.env.BASE_URL;
  return base + path.replace(/^\//, '');
}
