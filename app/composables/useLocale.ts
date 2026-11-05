import { SUPPORTED_LOCALES, type LocaleCode, type LocaleInfo } from '~/types/locale'

/**
 * Locale Composable
 *
 * Wraps nuxt-i18n-micro's useI18n() with this repo's locale metadata, matching the
 * shape of Holy-Fun-Yeah/hfy-website's useLocale() (which wraps nuxt-i18n-micro too)
 * for consistency across projects, even though only `es` is populated for now.
 */
export function useLocale() {
  const { t, getLocale, switchLocale: switchLocaleRaw, getLocales } = useI18n()

  /** Current locale code. */
  const currentLocale = computed<LocaleCode>(() => (getLocale() as LocaleCode) || 'es')

  /** Current locale's metadata. */
  const currentLocaleInfo = computed<LocaleInfo>(
    () => SUPPORTED_LOCALES.find((l) => l.code === currentLocale.value) || SUPPORTED_LOCALES[0]!
  )

  /** All locales configured in nuxt.config.ts, enriched with our metadata. */
  const availableLocales = computed(() => {
    const configured = getLocales() as Array<{ code: string; iso?: string }>
    return configured.map((locale) => {
      const info = SUPPORTED_LOCALES.find((l) => l.code === locale.code)
      return {
        code: locale.code as LocaleCode,
        iso: locale.iso || info?.iso || locale.code,
        name: info?.name || locale.code,
      }
    })
  })

  /** Switch locale. */
  function switchLocale(code: LocaleCode) {
    switchLocaleRaw(code)
  }

  return {
    currentLocale,
    currentLocaleInfo,
    availableLocales,
    switchLocale,
    /** Translate — passthrough to nuxt-i18n-micro's `t`. */
    t,
  }
}
