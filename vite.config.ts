import { defineConfig, loadEnv } from 'vite'
import vue from '@vitejs/plugin-vue'
import tailwindcss from '@tailwindcss/vite'
import { VitePWA } from 'vite-plugin-pwa'
import Unfonts from 'unplugin-fonts/vite'
import { fileURLToPath, URL } from 'url'

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '')

  const PWA_NAME = env.VITE_PWA_NAME || 'Orpheus Studio'
  const PWA_THEME_COLOR = env.VITE_PWA_THEME_COLOR || '#111111'
  const PWA_ICON_SRC = env.VITE_PWA_ICON_SRC || 'pwa-512x512.png'

  return {
    plugins: [
      vue(),
      tailwindcss(),
      Unfonts({
        // Self-hosted via @fontsource (bundled by Vite) instead of the Google Fonts
        // CDN — avoids a third-party request/connection on every page load. Family
        // `name`s are @fontsource package slugs; see src/config/brand.ts for the
        // brand rationale (Orpheus Studio manual de marca v26).
        fontsource: {
          families: [
            { name: 'anton', weights: [400] }, // font-logo
            { name: 'syne', variable: true }, // font-headers (use font-extrabold for ExtraBold)
            { name: 'inter', variable: true }, // font-primary
            { name: 'ibm-plex-mono', weights: [400, 500] }, // font-secondary
            { name: 'instrument-serif', weights: [400], styles: ['normal', 'italic'] }, // quotes
            { name: 'permanent-marker', weights: [400] }, // hand annotations (bold)
            { name: 'caveat', variable: true }, // hand annotations (script)
          ],
        },
      }),
      VitePWA({
        registerType: 'autoUpdate',
        injectRegister: 'auto',
        workbox: {
          clientsClaim: true,
          skipWaiting: true,
          globPatterns: ['**/*.{js,css,html,ico,png,svg,woff2}'],
        },
        devOptions: {
          enabled: true,
        },
        manifest: {
          name: PWA_NAME,
          short_name: PWA_NAME,
          theme_color: PWA_THEME_COLOR,
          background_color: '#111111',
          display: 'standalone',
          icons: [
            {
              src: PWA_ICON_SRC,
              sizes: '512x512',
              type: 'image/png',
              purpose: 'any',
            },
            {
              src: PWA_ICON_SRC,
              sizes: '512x512',
              type: 'image/png',
              purpose: 'maskable',
            },
          ],
        },
      }),
    ],
    resolve: {
      alias: {
        '@': fileURLToPath(new URL('./src', import.meta.url)),
      },
    },
    build: {
      outDir: 'dist',
      rollupOptions: {
        output: {
          manualChunks: {
            vue: ['vue', 'vue-router', 'pinia'],
          },
        },
      },
    },
  }
})
