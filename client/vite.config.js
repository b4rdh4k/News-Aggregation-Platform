import { fileURLToPath, URL } from 'node:url'
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueDevTools from 'vite-plugin-vue-devtools'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue(), vueDevTools()],
  css: {
    preprocessorOptions: {
      scss: {
        additionalData: `
        @import "@/admin/styles/_variables.scss";
        @import "@/admin/styles/base.scss";
        @import "@/admin/styles/components.scss";
        @import "@/admin/styles/layout.scss";
        @import "@/admin/styles/main.scss";
        `
      }
    }
  },
  build: {
    minify: 'terser'
  },
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  }
})