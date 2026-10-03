// @ts-check
import { defineConfig } from 'astro/config';
import svelte from '@astrojs/svelte';
import mdx from '@astrojs/mdx';

// GitHub Pages project site: https://markussteinbrecher.github.io/meineSteuer/
export default defineConfig({
  site: 'https://markussteinbrecher.github.io',
  base: '/meineSteuer',
  trailingSlash: 'always',
  integrations: [svelte(), mdx()],
});
