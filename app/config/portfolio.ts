import { brandConfig, serviceLines } from '~/config/brand'

/**
 * Hero deck project data
 *
 * Content pulled from orpheus-mocks/.../index.html's `#portada` card rolodex (the
 * `.deck-stage` cards), colors mapped onto `app/config/brand.ts` tokens instead of
 * the mock's literal `--tinta`/`--papel`/`--rojo` etc. Two deliberate simplifications
 * vs. the mock:
 * - `--carbon` (#191817, one card's near-black variant) collapses onto `brandConfig.dark.background`
 *   — visually indistinguishable from `--tinta` at this size.
 * - `--hoja` (#f5f5f5, TicketSaver's "grid paper" card) collapses onto `brandConfig.light.background`,
 *   dropping the mock's decorative graph-paper texture for that one card.
 *
 * This same data will back the full `#casos` portfolio section (Phase 1 item 6) — the
 * `href` anchors already point at those future section/card ids.
 */
export interface HeroDeckProject {
  id: string
  href: string
  cliente: string
  /** Title split on the mock's `<br>` breaks. */
  titleLines: string[]
  chip: string
  lineLabel: string
  bg: string
  fg: string
  /** The two accent strokes in the card's connector-line SVG motif. */
  lineStrokes: [string, string]
}

const INK = brandConfig.dark.background
const PAPER = brandConfig.light.background

export const heroDeckProjects: HeroDeckProject[] = [
  {
    id: 'hergom',
    href: '#caso-hergom',
    cliente: 'Hergom Chimenea',
    titleLines: ['Hergom', 'Chimenea'],
    chip: 'venta asistida por IA',
    lineLabel: 'Línea 1 · Estrategia',
    bg: INK,
    fg: PAPER,
    lineStrokes: [serviceLines.estrategia, serviceLines.ia],
  },
  {
    id: 'lazona',
    href: '#caso-lazona',
    cliente: 'La Zona Bienes Raíces',
    titleLines: ['La', 'Zona'],
    chip: 'reels con muebles por IA',
    lineLabel: 'Línea 1 · Estrategia',
    bg: serviceLines.contenido,
    fg: INK,
    lineStrokes: [INK, PAPER],
  },
  {
    id: 'eurocantos',
    href: '#caso-eurocantos',
    cliente: 'Eurocantos',
    titleLines: ['Euro', 'cantos'],
    chip: 'whatsapp ⇄ contpaqi',
    lineLabel: 'Línea 1 · Estrategia',
    bg: serviceLines.automatizacion,
    fg: PAPER,
    lineStrokes: [serviceLines.desarrollo, serviceLines.ia],
  },
  {
    id: 'produccion',
    href: '#produccion',
    cliente: 'Equipo de producción',
    titleLines: ['Produc', 'ción'],
    chip: 'video · fotografía',
    lineLabel: 'Línea 2 · Marketing y contenido',
    bg: INK,
    fg: PAPER,
    lineStrokes: [serviceLines.contenido, PAPER],
  },
  {
    id: 'pathos',
    href: '#proy-pathos',
    cliente: 'Pathos',
    titleLines: ['Pathos'],
    chip: 'inteligencia artificial',
    lineLabel: 'Línea 3 · IA y automatización',
    bg: serviceLines.ia,
    fg: INK,
    lineStrokes: [INK, PAPER],
  },
  {
    id: 'trainon',
    href: '#proy-trainon',
    cliente: 'TrainOn',
    titleLines: ['Train', 'On'],
    chip: 'inteligencia artificial',
    lineLabel: 'Línea 3 · IA y automatización',
    bg: INK,
    fg: PAPER,
    lineStrokes: [serviceLines.ia, serviceLines.automatizacion],
  },
  {
    id: 'dopme',
    href: '#proy-dopme',
    cliente: 'DopMe',
    titleLines: ['Dop', 'Me'],
    chip: 'app · adopción de perros',
    lineLabel: 'Línea 4 · Desarrollo',
    bg: serviceLines.desarrollo,
    fg: INK,
    lineStrokes: [INK, serviceLines.marca],
  },
  {
    id: 'ticketsaver',
    href: '#proy-ticketsaver',
    cliente: 'TicketSaver',
    titleLines: ['Ticket', 'Saver'],
    chip: 'app',
    lineLabel: 'Línea 4 · Desarrollo',
    bg: PAPER,
    fg: INK,
    lineStrokes: [serviceLines.desarrollo, INK],
  },
  {
    id: 'candylabs',
    href: '#proy-candylabs',
    cliente: 'CandyLabs',
    titleLines: ['Candy', 'Labs'],
    chip: 'app',
    lineLabel: 'Línea 4 · Desarrollo',
    bg: serviceLines.marca,
    fg: INK,
    lineStrokes: [serviceLines.desarrollo, serviceLines.estrategia],
  },
]
