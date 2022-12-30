import { defineConfig } from 'astro/config';

import tailwind from "@astrojs/tailwind";

// https://astro.build/config
export default defineConfig({
  integrations: [tailwind()],
  vite: {
    css: {
      devSourcemap: false,
      preprocessorOptions: {
        scss: {
          additionalData: `
            @import "tailwindcss/base";
            @import "tailwindcss/components";
            @import "tailwindcss/utilities";

            $wlk-primary-color: #ff9292;
            $wlk-secondary-color: #ffdd67;
            $wlk-tertiary-color: #403f3f;
            $wlk-quaternary-color: white;
            
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