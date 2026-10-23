// @ts-check

import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';
import { defineConfig } from 'astro/config';

// https://astro.build/config
export default defineConfig({
	site: 'https://atarrh.io',
	integrations: [mdx(), sitemap()],
	// Astro 7's default ('jsx') drops whitespace at line breaks next to tags; it rendered "speaking.I" on About.
	compressHTML: true,
});
