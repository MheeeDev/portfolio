// @ts-check
import { defineConfig } from 'astro/config';
import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';

// Served from the custom domain set in GitHub → Settings → Pages, so the site lives at the root.
// SITE_URL / BASE_PATH override this, e.g. for a preview at https://mheeedev.github.io/portfolio/.
export default defineConfig({
  site: process.env.SITE_URL ?? 'https://iamautomationeng.com',
  base: process.env.BASE_PATH ?? '/',
  trailingSlash: 'always',
  integrations: [mdx(), sitemap({ filter: (page) => !page.includes('/print/') })],
});
