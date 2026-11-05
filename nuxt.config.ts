import Unfonts from 'unplugin-fonts/vite'

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2025-01-01',

  future: {
    compatibilityVersion: 4,
  },

  devtools: { enabled: true },

  modules: ['@nuxt/eslint', '@pinia/nuxt', '@nuxt/devtools', 'nuxt-i18n-micro'],

  // Spanish-only for now (all real site copy is Spanish per orpheus-mocks); schema +
  // composable are already locale-ready (see app/types/locale.ts, useLocale.ts) so
  // adding `en` later is just a new locales/en.json + one entry here, no code changes.
  // `no_prefix`: no reason for a /es/ URL prefix with a single locale — switch to
  // `prefix_except_default` when a second locale is actually added.
  i18n: {
    locales: [{ code: 'es', iso: 'es-MX' }],
    defaultLocale: 'es',
    strategy: 'no_prefix',
    translationDir: 'locales',
    meta: true,
  },

  // Auto-import components without directory prefix
  components: [{ path: '~/components', pathPrefix: false }],

  // Code-based routing - routes defined in app/router.options.ts
  // Pages scanning is enabled but routes are overridden programmatically

  css: ['~/assets/css/main.css'],

  postcss: {
    plugins: {
      '@tailwindcss/postcss': {},
      autoprefixer: {},
      ...(process.env.NODE_ENV === 'production' ? { cssnano: {} } : {}),
    },
  },

  vite: {
    plugins: [
      // Self-hosted via @fontsource (bundled by Vite) instead of the Google Fonts
      // CDN — avoids a third-party request/connection on every page load. Family
      // `name`s are @fontsource package slugs; see app/config/brand.ts for the
      // brand rationale (Orpheus Studio manual de marca v26).
      Unfonts({
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
    ],
  },

  runtimeConfig: {
    databaseUrl: process.env.DATABASE_URL || '',
    public: {
      appName: process.env.NUXT_PUBLIC_APP_NAME || 'Orpheus Studio',
    },
  },

  nitro: {
    experimental: {
      asyncContext: true,
    },
  },

  typescript: {
    strict: true,
    // The vite-plugin-checker-based dev/build overlay this enables has a flaky
    // runtime bug copying TypeScript's lib .d.ts files into its own sandboxed
    // checker directory (unrelated to this project's code — reproduces on a
    // clean install). `yarn type-check` (nuxt typecheck) is the real gate and
    // runs clean; this overlay is DX-only, so it's off rather than chased.
    typeCheck: false,
  },

  eslint: {
    config: {
      standalone: false,
    },
  },
})
