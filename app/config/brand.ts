import type { BrandConfig } from '~/types/brand'

/**
 * Brand Configuration - Single Source of Truth
 *
 * Values sourced from Orpheus-Org/orpheus-templates, `manual/orpheus-manual-de-marca-v26.pdf`
 * (section 03 · Color, section 04 · Tipografía) — the manual's text is the authority.
 * Tinta/papel/rojo are independently corroborated by every `logo-vectorial/*.svg`.
 * The 5 non-rojo service-line hexes in `lenguaje-grafico/*.svg` (service-lines/pill-system
 * assets) use a different, apparently older palette than the manual text for those 5 —
 * only the manual's swatches are followed here. Do not hand-tune these without
 * re-checking the manual — it is the brand's actual source of truth, not this file.
 *
 * ## Composition rule (manual, "Proporción y reglas")
 *
 * Orpheus's brand is ink-dominant, not light-dominant: the canonical signature is
 * tinta background / papel type / rojo accent. "Un color manda en cada composición:
 * tinta o papel" — a single section of the page should be either all-ink or all-paper,
 * never a blend. In practice: `light` below is the papel composition, `dark` is the
 * tinta composition, and base/background invert cleanly between them (tinta <-> papel),
 * which happens to line up with this template's light/dark architecture. Landing-page
 * sections alternate between the two per the mock (hero/portfolio = papel, focus/
 * services/contact = tinta) — that alternation is a layout decision per section, it
 * is independent of (and probably should not be driven by) a user dark-mode toggle.
 *
 * ## Quick Reference
 *
 * | Role       | Light (papel composition) | Dark (tinta composition) |
 * |------------|----------------------------|---------------------------|
 * | background | papel #F2EDE4              | tinta #111111             |
 * | base       | tinta #111111              | papel #F2EDE4             |
 * | accent     | rojo señal #E63323          | same                      |
 * | secondary  | naranja andén #F2711C      | same (manual: usable "sobre tinta") |
 * | contrast   | electric aqua #69E7F2      | same (manual: usable "sobre tinta") |
 * | neutral    | white card surface         | elevated near-black       |
 *
 * `neutral` (card/elevation surface) is not a manual swatch — the brand manual
 * doesn't define UI elevation, only the flat composition colors — so this is a
 * judgment call, not a literal brand value.
 *
 * ## Service line colors
 *
 * The manual defines 5 more swatches tied to Orpheus's 6 service lines (Estrategia =
 * rojo, Contenido, IA, Desarrollo, Automatización, Marca), each capped at ~1% coverage,
 * used only as category tags/graphic elements, never as general UI chrome. These don't
 * fit the 6-role BrandPalette, so they're exported separately below as `serviceLines`.
 *
 * @see app/types/brand.ts for the base template's role documentation
 */
export const brandConfig: BrandConfig = {
  name: 'Orpheus Studio',
  tagline: ['Rooted in creativity, driven by innovation.', 'Build today, to inspire tomorrow.'],

  /**
   * Light palette = the "papel" composition.
   */
  light: {
    /** Tinta. Primary text/icons/borders. On papel: 16.2:1 (manual, "Texto y fondo"). */
    base: '#111111',

    /** Rojo señal. Manual: "una palabra, cifra o etiqueta por pieza" — use sparingly. */
    accent: '#E63323',

    /** Electric aqua. Manual: graphic element only on papel (not body text) — pills/blocks. */
    contrast: '#69E7F2',

    /** Naranja andén (Línea de Contenido). Analogous to rojo. Graphic element only on papel. */
    secondary: '#F2711C',

    /** Not a manual swatch — elevated card surface against the papel canvas. */
    neutral: '#FFFFFF',

    /** Papel. */
    background: '#F2EDE4',
  },

  /**
   * Dark palette = the "tinta" composition (Orpheus's actual default/signature look).
   */
  dark: {
    /** Papel. Inverted from light. On tinta: 16.2:1. */
    base: '#F2EDE4',

    /** Rojo señal. Manual: on tinta only at 24px+ (4.4:1) — large text/display only. */
    accent: '#E63323',

    /** Electric aqua. Manual: explicitly usable as text on tinta (14.3:1-class). */
    contrast: '#69E7F2',

    /** Naranja andén. Manual: explicitly usable as text on tinta. */
    secondary: '#F2711C',

    /** Not a manual swatch — elevated surface, slightly lighter than tinta background. */
    neutral: '#1C1C1C',

    /** Tinta. Orpheus's default/dominant background (60% per manual's proportion rule). */
    background: '#111111',
  },

  /**
   * Typography. Manual section 04: Anton = display/headlines (caps only), Syne =
   * display-wide subheads/labels (caps only, ExtraBold), Inter = body/slogan/statement.
   * Weight isn't part of BrandTypography's font-family-only slots — pair `font-headers`
   * with `font-extrabold` in markup to match the manual's "Syne ExtraBold" spec.
   */
  typography: {
    /** Anton. Manual: "Display, titulares y cifras." Hero headlines only, never body. */
    logo: 'Anton',

    /** Syne (ExtraBold). Manual: "Display ancha, subtítulos y labels." */
    headers: 'Syne Variable',

    /** Inter. Manual: body text, slogan (400), statement (600), social posters (800). */
    primary: 'Inter Variable',

    /** IBM Plex Mono. Manual: "datos" — timestamps, technical/data labels. */
    secondary: 'IBM Plex Mono',
  },
}

/**
 * Orpheus's 6 service-line colors (manual, section 03 · Color + 05 · Lenguaje gráfico).
 * Each line is capped at ~1% coverage and used only as a category tag/graphic element
 * (metro-line accents, pill tags, portfolio category badges) — never as general UI
 * chrome. Rojo doubles as both the brand accent (see `brandConfig`) and the Estrategia
 * line color.
 */
export const serviceLines = {
  estrategia: '#E63323', // Rojo señal
  contenido: '#F2711C', // Naranja andén
  ia: '#D8EB47', // Lemon lime
  desarrollo: '#69E7F2', // Electric aqua
  marca: '#F4C3C2', // Cotton rose
  automatizacion: '#0E5838', // Emerald depths
} as const

/**
 * Brand accent fonts beyond the base 4-role system (manual, section 04 · Tipografía:
 * "Acentos"). Not part of BrandTypography since they're used for specific brand
 * moments, not general UI roles — expose as extra CSS vars / Tailwind tokens where
 * they're actually used (quotes, hand-drawn annotations).
 */
export const accentFonts = {
  quote: 'Instrument Serif', // Italic, for pull quotes
  handwritten: 'Caveat', // Hand-annotation layer (manual: always rendered in rojo)
  handwrittenBold: 'Permanent Marker', // Heavier hand-annotation / sticker treatment
} as const
