import { z } from 'zod'

/**
 * Locale Messages Schema
 *
 * Defines the structure every `locales/*.json` file must conform to. Pattern follows
 * Holy-Fun-Yeah/hfy-website's established approach (Zod schema + per-locale JSON +
 * a `useLocale()` composable wrapper), adapted to this repo's i18n engine
 * (`nuxt-i18n-micro` — see nuxt.config.ts) and scoped to Orpheus's actual sections
 * rather than copied verbatim from that project's schema.
 *
 * Grows incrementally: add a namespace here only once the component that needs it is
 * actually being built (see the landing-page task list) — don't pre-guess copy for
 * sections not yet built. `common`, `nav`, `footer`, and `brief` are populated now
 * (content pulled directly from the orpheus-mocks source); `hero`, `enfoque`, `casos`,
 * `equipo`, `servicios`, `metodologia` get added as those components are built.
 *
 * Note: the brand's two slogans ("Rooted in creativity..." / "Build today...") are
 * NOT translatable content — the brand manual requires them always in English,
 * verbatim ("Siempre en inglés, con la redacción exacta"). They live in
 * `brandConfig.tagline` (app/config/brand.ts), not in locale files.
 *
 * Benefits of the schema (same as hfy-website's rationale):
 * - Compile-time TypeScript checking via `LocaleMessages`
 * - Runtime validation (see tests/locale.test.ts) catches missing/mistyped keys
 * - Every locale file is guaranteed to carry the same keys
 */
export const localeSchema = z.object({
  common: z.object({
    loading: z.string(),
    error: z.string(),
    readMore: z.string(),
  }),

  nav: z.object({
    nosotros: z.string(),
    servicios: z.string(),
    portafolio: z.string(),
    metodologia: z.string(),
    contacto: z.string(),
    accesoClientes: z.string(),
    agendaDiagnostico: z.string(),
  }),

  footer: z.object({
    correoLabel: z.string(),
    whatsappLabel: z.string(),
    instagramLabel: z.string(),
    baseLabel: z.string(),
    // orpheus-mocks' own convention for content not finalized yet (README: "marcados
    // POR DEFINIR") — reused here rather than inventing placeholder copy.
    placeholder: z.string(),
  }),

  // Client Brief — the landing page's contact form. Full 6-step wizard, content taken
  // directly from orpheus-mocks/.../index.html's PASOS array (exact field labels/help
  // text), not paraphrased.
  brief: z.object({
    eyebrow: z.string(),
    title: z.string(),
    intro: z.string(),
    help: z.string(),
    start: z.string(),
    back: z.string(),
    previous: z.string(),
    next: z.string(),
    submit: z.string(),
    requiredError: z.string(),
    emailError: z.string(),
    steps: z.object({
      contact: z.object({
        title: z.string(),
        help: z.string(),
        fields: z.object({
          name: z.string(),
          role: z.string(),
          company: z.string(),
          city: z.string(),
          email: z.string(),
          whatsapp: z.string(),
          website: z.string(),
          websitePlaceholder: z.string(),
        }),
      }),
      business: z.object({
        title: z.string(),
        help: z.string(),
        fields: z.object({
          industry: z.string(),
          yearsOperating: z.string(),
          teamSize: z.string(),
          teamSizeOptions: z.array(z.string()),
          averageTicket: z.string(),
          averageTicketPlaceholder: z.string(),
          mainProducts: z.string(),
          idealClient: z.string(),
        }),
      }),
      situation: z.object({
        title: z.string(),
        help: z.string(),
        fields: z.object({
          reason: z.string(),
          channels: z.string(),
          channelOptions: z.array(z.string()),
          tools: z.string(),
          toolsPlaceholder: z.string(),
        }),
      }),
      needs: z.object({
        title: z.string(),
        help: z.string(),
        fields: z.object({
          services: z.string(),
          serviceOptions: z.array(z.string()),
          problem: z.string(),
          attempted: z.string(),
        }),
      }),
      goals: z.object({
        title: z.string(),
        help: z.string(),
        fields: z.object({
          goal3m: z.string(),
          goal12m: z.string(),
          successMetric: z.string(),
          successMetricPlaceholder: z.string(),
        }),
      }),
      investment: z.object({
        title: z.string(),
        help: z.string(),
        fields: z.object({
          investmentRange: z.string(),
          investmentOptions: z.array(z.string()),
          startDate: z.string(),
          decisionMaker: z.string(),
        }),
      }),
    }),
    schedule: z.object({
      title: z.string(),
      help: z.string(),
      thanks: z.string(),
    }),
  }),
})

/** TypeScript type derived from the Zod schema — matches every `locales/*.json` shape. */
export type LocaleMessages = z.infer<typeof localeSchema>

/** Supported locale codes. Widen this (and add a `locales/<code>.json`) to go multilingual. */
export type LocaleCode = 'es'

/** Locale metadata (matches nuxt.config.ts `i18n.locales`). */
export interface LocaleInfo {
  code: LocaleCode
  iso: string
  name: string
}

export const SUPPORTED_LOCALES: LocaleInfo[] = [{ code: 'es', iso: 'es-MX', name: 'Español' }]

/**
 * Validate a locale JSON file against the schema.
 * @throws if validation fails — see tests/locale.test.ts for where this runs.
 */
export function validateLocale(data: unknown, locale: string): LocaleMessages {
  const result = localeSchema.safeParse(data)
  if (!result.success) {
    const issues = result.error.issues
      .map((i) => `  - ${i.path.join('.')}: ${i.message}`)
      .join('\n')
    throw new Error(`Locale validation failed for "${locale}":\n${issues}`)
  }
  return result.data
}

/** Check if a locale code is supported. */
export function isValidLocale(code: string): code is LocaleCode {
  return SUPPORTED_LOCALES.some((l) => l.code === code)
}
