import { defineConfig } from 'astro/config';

import tailwind from "@astrojs/tailwind";

// https://astro.build/config
export default defineConfig({
  integrations: [tailwind()],
  vite: {
    build: {
      rollupOptions: {
        cache: false
      },
      sourcemap: false
    },
    css: {
      devSourcemap: false,
      preprocessorOptions: {
        scss: {
          additionalData: '@import "./src/styles/_mixins.scss";'
        }
      }
    }
  }
});