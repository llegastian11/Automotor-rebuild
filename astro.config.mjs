import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

export default defineConfig({
  site: 'https://llegastian11.github.io',
  base: '/Automotor-rebuild',
  trailingSlash: 'always',
  integrations: [
    sitemap({
      filter: (page) => !page.includes('/page/'),
    }),
  ],
});
