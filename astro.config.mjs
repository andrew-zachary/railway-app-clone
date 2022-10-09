import { defineConfig } from 'astro/config';

import tailwind from "@astrojs/tailwind";

// https://astro.build/config
export default defineConfig({
  integrations: [tailwind()],
  vite: {
    css: {
      preprocessorOptions: {
        scss: {
          additionalData: `
            $primary-color: #ff9292;
            $secondary-color: #ffdd67;
            $tertiary-color: #403f3f;
            $quaternary-color: white;
            @mixin withRtl($property, $ltr-value, $rtl-value) {
              & {
                #{$property}: $ltr-value;
              }
          
              [dir='rtl'] & {
                #{$property}: $rtl-value;
              }
            }
          `
        }
      }
    }
  }
});