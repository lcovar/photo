import { defineConfig } from 'astro/config';

export default defineConfig({
  site: 'https://lcovar.github.io',
  base: '/photo/',
  build: {
    format: 'file',
  },
});
