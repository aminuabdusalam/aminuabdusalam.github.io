// @ts-check
import { defineConfig } from 'astro/config';

// https://astro.build/config
export default defineConfig({
  site: 'https://aminuabdusalam.github.io',
  // If deploying to <user>.github.io, base stays '/'. If deploying to a
  // project subpath repo, set base to '/repo-name'.
  base: '/',
  trailingSlash: 'ignore',
  build: {
    format: 'directory',
  },
});

