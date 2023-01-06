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
          additionalData: `
            $wlk-primary-color: #ff9292;
            $wlk-secondary-color: #ffdd67;
            $wlk-tertiary-color: #403f3f;
            $wlk-quaternary-color: white;

            $inv-primary-color: #3157AD;
            $inv-secondary-color: #ede5da;
            
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