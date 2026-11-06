<script setup lang="ts">
import { brandConfig, serviceLines } from '~/config/brand'
import { heroDeckProjects } from '~/config/portfolio'

const { t } = useLocale()

const tinta = brandConfig.dark
const papel = brandConfig.light
// Flat (dot-free) copies for `v-bind()` in <style> — see the comment in AppHeader.vue.
const tintaBg = tinta.background
const tintaBase = tinta.base
const papelBg = papel.background
const papelBase = papel.base
const lineIa = serviceLines.ia

const deckRef = ref<HTMLElement | null>(null)
useHeroDeck(deckRef)

const posicionCtaRef = useTemplateRef<HTMLElement>('posicionCtaRef')
const posicionCtaInnerRef = useTemplateRef<HTMLElement>('posicionCtaInnerRef')
useMagnetic(posicionCtaRef, posicionCtaInnerRef, 0.3)

const srTitle = `${brandConfig.name}. ${brandConfig.tagline[0]}`

/** The three slogan rows — structure/color are fixed brand art direction, not
 * translatable; only the service-line tag labels come from i18n. */
const sloganRows = [
  {
    mask: 'mordida',
    fbg: serviceLines.desarrollo,
    tagColor: serviceLines.estrategia,
    tagLabel: () => (t('services.lines.estrategia') as string).toLowerCase(),
    strokes: [tinta.background, serviceLines.estrategia] as [string, string],
  },
  {
    mask: 'reloj',
    fbg: serviceLines.contenido,
    tagColor: serviceLines.contenido,
    tagLabel: () => (t('services.lines.contenido') as string).toLowerCase(),
    strokes: [tinta.background, papel.background] as [string, string],
  },
  {
    mask: 'flecha',
    fbg: serviceLines.marca,
    tagColor: serviceLines.ia,
    tagLabel: () => (t('services.lines.ia') as string).toLowerCase(),
    strokes: [tinta.background, serviceLines.estrategia] as [string, string],
  },
]

const lineasPills: Array<{ n: number; slug: keyof typeof serviceLines; fg: string }> = [
  { n: 1, slug: 'estrategia', fg: papel.background },
  { n: 2, slug: 'contenido', fg: tinta.background },
  { n: 3, slug: 'ia', fg: tinta.background },
  { n: 4, slug: 'automatizacion', fg: papel.background },
  { n: 5, slug: 'desarrollo', fg: tinta.background },
  { n: 6, slug: 'marca', fg: tinta.background },
]

const estudioMembers = computed(() => t('hero.ledger.estudio.members') as unknown as string[])
const clientNames = computed(() => t('hero.ledger.clientes.names') as unknown as string[])

function cardInitialStyle(i: number) {
  const p = heroDeckProjects[i]!
  return {
    '--d': i,
    '--ad': i,
    zIndex: 100 - i * 10,
    '--bg': p.bg,
    '--fg': p.fg,
  }
}
</script>

<template>
  <section
    id="portada"
    class="portada"
  >
    <div class="hero">
      <div class="wrap">
        <div class="meta-row">
          <span class="label">{{ t('hero.meta.portfolioLabel') }}</span>
          <span class="label">{{ t('hero.meta.locationLabel') }}</span>
        </div>

        <div
          ref="deckRef"
          class="deck"
          aria-label="Proyectos destacados"
        >
          <div class="wordmark">
            <h1 class="sr">{{ srTitle }}</h1>
            <div
              class="sl-rows"
              aria-hidden="true"
            >
              <div class="sl-row">
                <span class="sl-serif">Rooted</span>
                <span
                  class="slf"
                  :class="`slf--${sloganRows[0]!.mask}`"
                  :style="{ '--fbg': sloganRows[0]!.fbg }"
                >
                  <span
                    class="slf-tag"
                    :style="{ '--c': sloganRows[0]!.tagColor }"
                    >{{ sloganRows[0]!.tagLabel() }}</span
                  >
                  <span class="slf-in">
                    <svg
                      viewBox="0 0 300 100"
                      preserveAspectRatio="xMidYMid meet"
                    >
                      <g
                        fill="none"
                        stroke-width="10"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                      >
                        <path
                          d="M-3000 80 H120 L170 30 H3300"
                          :stroke="sloganRows[0]!.strokes[0]"
                        />
                        <path
                          d="M-3000 96 H136 L186 46 H3300"
                          :stroke="sloganRows[0]!.strokes[1]"
                        />
                      </g>
                      <g
                        :fill="papel.background"
                        :stroke="tinta.background"
                        stroke-width="3"
                      >
                        <circle
                          cx="170"
                          cy="30"
                          r="6"
                        />
                        <circle
                          cx="236"
                          cy="46"
                          r="6"
                        />
                      </g>
                    </svg>
                  </span>
                </span>
                <span class="sl-serif">in</span>
              </div>

              <div class="sl-row">
                <span
                  class="sl-sans"
                  :style="{ color: serviceLines.marca }"
                  >creativit<span class="sl-serif">y,</span></span
                >
                <span
                  class="slf"
                  :class="`slf--${sloganRows[1]!.mask}`"
                  :style="{ '--fbg': sloganRows[1]!.fbg }"
                >
                  <span
                    class="slf-tag"
                    :style="{ '--c': sloganRows[1]!.tagColor }"
                    >{{ sloganRows[1]!.tagLabel() }}</span
                  >
                  <span class="slf-in">
                    <svg
                      viewBox="0 0 300 100"
                      preserveAspectRatio="xMidYMid meet"
                    >
                      <g
                        fill="none"
                        stroke-width="10"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                      >
                        <path
                          d="M-3000 80 H120 L170 30 H3300"
                          :stroke="sloganRows[1]!.strokes[0]"
                        />
                        <path
                          d="M-3000 96 H136 L186 46 H3300"
                          :stroke="sloganRows[1]!.strokes[1]"
                        />
                      </g>
                      <g
                        :fill="papel.background"
                        :stroke="tinta.background"
                        stroke-width="3"
                      >
                        <circle
                          cx="170"
                          cy="30"
                          r="6"
                        />
                        <circle
                          cx="236"
                          cy="46"
                          r="6"
                        />
                      </g>
                    </svg>
                  </span>
                </span>
              </div>

              <div class="sl-row">
                <span class="sl-serif">driven by</span>
                <span
                  class="slf"
                  :class="`slf--${sloganRows[2]!.mask}`"
                  :style="{ '--fbg': sloganRows[2]!.fbg }"
                >
                  <span
                    class="slf-tag"
                    :style="{ '--c': sloganRows[2]!.tagColor }"
                    >{{ sloganRows[2]!.tagLabel() }}</span
                  >
                  <span class="slf-in">
                    <svg
                      viewBox="0 0 300 100"
                      preserveAspectRatio="xMidYMid meet"
                    >
                      <g
                        fill="none"
                        stroke-width="10"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                      >
                        <path
                          d="M-3000 80 H120 L170 30 H3300"
                          :stroke="sloganRows[2]!.strokes[0]"
                        />
                        <path
                          d="M-3000 96 H136 L186 46 H3300"
                          :stroke="sloganRows[2]!.strokes[1]"
                        />
                      </g>
                      <g
                        :fill="papel.background"
                        :stroke="tinta.background"
                        stroke-width="3"
                      >
                        <circle
                          cx="170"
                          cy="30"
                          r="6"
                        />
                        <circle
                          cx="236"
                          cy="46"
                          r="6"
                        />
                      </g>
                    </svg>
                  </span>
                </span>
                <span
                  class="sl-sans"
                  :style="{ color: serviceLines.ia }"
                  >innovatio<span class="sl-serif">n.</span></span
                >
              </div>
            </div>
          </div>

          <div class="deck-side deck-izq">
            <span class="label">{{ t('hero.deckSide.projectLabel') }}</span>
            <span class="deck-cliente">{{ heroDeckProjects[0]!.cliente }}</span>
          </div>
          <div class="deck-side deck-der">
            <span class="label">{{ t('hero.deckSide.projectsLabel') }}</span>
            <span class="deck-cuenta dato"
              ><b>01</b> / {{ String(heroDeckProjects.length).padStart(2, '0') }}</span
            >
          </div>

          <div class="deck-stage">
            <a
              v-for="(project, i) in heroDeckProjects"
              :key="project.id"
              class="deck-card"
              :class="{ 'deck-card--grid': project.id === 'ticketsaver' }"
              :href="project.href"
              :data-cliente="project.cliente"
              :style="cardInitialStyle(i)"
            >
              <svg
                class="dc-lineas"
                viewBox="0 0 200 125"
                preserveAspectRatio="xMaxYMid slice"
                aria-hidden="true"
              >
                <g
                  fill="none"
                  stroke-width="9"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                >
                  <path
                    d="M70 140 V95 L120 45 H220"
                    :stroke="project.lineStrokes[0]"
                  />
                  <path
                    d="M92 140 V104 L134 62 H220"
                    :stroke="project.lineStrokes[1]"
                  />
                </g>
              </svg>
              <span class="dc-top">
                <span class="label">{{ project.lineLabel }}</span>
                <span class="label">{{ String(i + 1).padStart(2, '0') }}</span>
              </span>
              <span class="dc-title">
                <template
                  v-for="(line, li) in project.titleLines"
                  :key="li"
                >
                  {{ line }}<br v-if="li < project.titleLines.length - 1" />
                </template>
              </span>
              <span class="dc-chip">{{ project.chip }}</span>
            </a>
          </div>
        </div>
      </div>
    </div>

    <div class="wrap portada-cuerpo">
      <div class="ledger">
        <div>
          <h2 class="label">{{ t('hero.ledger.estudio.title') }}</h2>
          <ul>
            <li>{{ estudioMembers[0] }}</li>
            <li>{{ estudioMembers[1] }}</li>
            <li>
              {{ t('hero.ledger.estudio.placeholderRole') }} ·
              <span class="pd">{{ t('footer.placeholder') }}: nombre</span>
            </li>
            <li>{{ estudioMembers[2] }}</li>
            <li
              class="dato"
              style="margin-top: 8px; opacity: 0.7"
            >
              {{ t('hero.ledger.estudio.operatingSince') }}
            </li>
          </ul>
        </div>
        <div>
          <h2 class="label">{{ t('hero.ledger.clientes.title') }}</h2>
          <ul>
            <li
              v-for="name in clientNames"
              :key="name"
            >
              {{ name }}
            </li>
          </ul>
        </div>
        <div>
          <h2 class="label">{{ t('hero.ledger.lineas.title') }}</h2>
          <ul class="pills-lineas">
            <li
              v-for="pill in lineasPills"
              :key="pill.slug"
              :style="{ '--c': serviceLines[pill.slug], '--t': pill.fg }"
            >
              <b>{{ pill.n }}</b
              >{{ t(`services.lines.${pill.slug}`) }}
            </li>
          </ul>
        </div>
      </div>

      <div class="posicion">
        <p class="posicion-lead">{{ t('hero.posicion.lead') }}</p>
        <div class="posicion-txt">
          <p>{{ t('hero.posicion.paragraph1') }}</p>
          <p>{{ t('hero.posicion.paragraph2') }}</p>
          <div class="posicion-cta">
            <a
              ref="posicionCtaRef"
              class="senal senal--link"
              href="#enfoque"
            >
              <span
                ref="posicionCtaInnerRef"
                class="mag-inner"
              >
                <span class="senal-cel senal-flecha">
                  <svg
                    class="fm"
                    viewBox="0 0 24 24"
                    style="transform: rotate(90deg)"
                    aria-hidden="true"
                  >
                    <path
                      d="M2.5 9.6h11.4L9 4.7h5L21.5 12 14 19.3H9l4.9-4.9H2.5z"
                      fill="currentColor"
                    />
                  </svg>
                </span>
                <span class="senal-cel senal-txt">{{ t('hero.posicion.cta') }}</span>
              </span>
            </a>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.sr {
  position: absolute;
  width: 1px;
  height: 1px;
  overflow: hidden;
  clip: rect(0 0 0 0);
  white-space: nowrap;
}
.wrap {
  padding-inline: clamp(16px, 4vw, 48px);
}
.hero {
  background: v-bind('tintaBg');
  color: v-bind('tintaBase');
}
.hero .wrap {
  padding-block: clamp(20px, 3vw, 36px) 0;
}
.meta-row {
  display: flex;
  justify-content: space-between;
  gap: 16px;
  flex-wrap: wrap;
  color: color-mix(in srgb, v-bind('tintaBase') 65%, transparent);
}
.label {
  font-family: var(--font-headers);
  font-weight: 700;
  font-size: 12px;
  line-height: 14px;
  letter-spacing: 0.2em;
  text-transform: uppercase;
}
.dato {
  font-family: var(--font-secondary);
  font-size: 13px;
  line-height: 1.4;
}

/* Wordmark / slogan */
.deck {
  position: relative;
  height: calc(100svh - 58px);
  min-height: 640px;
  margin-top: clamp(16px, 2.5vw, 32px);
}
.wordmark {
  position: absolute;
  left: 0;
  right: 0;
  top: 0;
  z-index: 5;
  margin: 0;
  padding: clamp(4px, 1vw, 12px) 0 clamp(10px, 1.4vw, 20px);
  background: color-mix(in srgb, v-bind('tintaBg') 84%, transparent);
}
.sl-rows {
  display: grid;
  font-size: clamp(40px, 7.2vw, 112px);
  line-height: 1;
  letter-spacing: -0.03em;
}
.sl-row {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 0.18em;
  padding: 0.16em 0 0.12em;
  border-bottom: 1px solid color-mix(in srgb, v-bind('tintaBase') 24%, transparent);
  flex-wrap: wrap;
}
.sl-row:first-child {
  padding-top: 0.32em;
}
.sl-serif {
  font-family: var(--font-quote);
  font-style: normal;
  font-weight: 400;
  letter-spacing: -0.01em;
}
.sl-sans {
  font-family: var(--font-primary);
  font-weight: 400;
  white-space: nowrap;
}
.sl-sans .sl-serif {
  letter-spacing: 0;
}
.slf {
  position: relative;
  flex: 1 1 2.2em;
  min-width: 2em;
  height: 0.78em;
  align-self: center;
}
.slf-in {
  position: absolute;
  inset: 0;
  background: var(--fbg);
  overflow: hidden;
}
.slf-in svg {
  width: 100%;
  height: 100%;
  display: block;
}
.slf-tag {
  position: absolute;
  left: 50%;
  top: -0.32em;
  transform: translate(-50%, -50%);
  z-index: 1;
  font-family: var(--font-primary);
  font-weight: 500;
  font-size: clamp(11px, 0.95vw, 14px);
  line-height: 1;
  /* .sl-rows sets letter-spacing: -0.03em for the 112px slogan text — inherited as an
     absolute px value, it would crush this pill's much smaller text, so reset it. */
  letter-spacing: 0;
  color: var(--c);
  border: 1.5px solid var(--c);
  background: v-bind('tintaBg');
  border-radius: 999px;
  padding: 5px 10px;
  white-space: nowrap;
}
.slf--mordida .slf-in {
  border-radius: 0.2em;
  -webkit-mask:
    radial-gradient(circle at 0 50%, transparent 0.26em, #000 calc(0.26em + 1px)),
    radial-gradient(circle at 100% 50%, transparent 0.26em, #000 calc(0.26em + 1px));
  -webkit-mask-composite: source-in;
  mask:
    radial-gradient(circle at 0 50%, transparent 0.26em, #000 calc(0.26em + 1px)),
    radial-gradient(circle at 100% 50%, transparent 0.26em, #000 calc(0.26em + 1px));
  mask-composite: intersect;
}
.slf--reloj .slf-in {
  border-radius: 0.16em;
  -webkit-mask:
    radial-gradient(ellipse 0.5em 0.62em at -0.22em 50%, transparent 98%, #000),
    radial-gradient(ellipse 0.5em 0.62em at calc(100% + 0.22em) 50%, transparent 98%, #000);
  -webkit-mask-composite: source-in;
  mask:
    radial-gradient(ellipse 0.5em 0.62em at -0.22em 50%, transparent 98%, #000),
    radial-gradient(ellipse 0.5em 0.62em at calc(100% + 0.22em) 50%, transparent 98%, #000);
  mask-composite: intersect;
}
.slf--flecha .slf-in {
  border-radius: 0.12em;
  clip-path: polygon(0 0, 100% 0, calc(100% - 0.3em) 50%, 100% 100%, 0 100%, 0.3em 50%);
}
@media (max-width: 860px) {
  .sl-rows {
    font-size: clamp(38px, 11vw, 72px);
  }
  .slf {
    flex-basis: 1.6em;
  }
}

/* Deck side labels */
.deck-side {
  position: absolute;
  top: var(--centro, 70%);
  transform: translateY(-50%);
  display: grid;
  gap: 6px;
  z-index: 2;
  max-width: 18ch;
  color: color-mix(in srgb, v-bind('tintaBase') 65%, transparent);
}
.deck-izq {
  left: 0;
}
.deck-der {
  right: 0;
  text-align: right;
}
.deck-cliente {
  font-size: clamp(16px, 1.4vw, 19px);
  line-height: 1.2;
  color: v-bind('tintaBase');
}
.deck-cuenta {
  font-size: 15px;
}
.deck-cuenta b {
  font-weight: 400;
  color: v-bind('tintaBase');
  font-size: 20px;
}

/* Card rolodex */
.deck-stage {
  position: absolute;
  inset: 0;
  perspective: 1400px;
  overflow: hidden;
  -webkit-mask-image: linear-gradient(#000 93%, transparent);
  mask-image: linear-gradient(#000 93%, transparent);
}
.deck-card {
  --paso: 30%;
  position: absolute;
  left: 50%;
  top: var(--centro, 70%);
  width: clamp(260px, 42vw, 560px);
  aspect-ratio: 16 / 10;
  max-width: calc(100% - 16px);
  background: var(--bg);
  color: var(--fg);
  text-decoration: none;
  overflow: hidden;
  display: grid;
  grid-template-rows: auto 1fr auto;
  padding: clamp(14px, 1.6vw, 22px);
  box-shadow: inset 0 0 0 1px rgba(255, 255, 255, 0.22);
  transform: translate(-50%, -50%) translateY(calc(var(--d) * var(--paso)))
    translateZ(calc(var(--ad) * -90px)) rotateX(calc(var(--d) * -16deg));
  opacity: clamp(0, calc(1 - (var(--ad) - 2.2) * 0.6), 1);
  outline-offset: 4px;
  backface-visibility: hidden;
}
.deck-card--grid {
  box-shadow: none;
  background-image:
    linear-gradient(color-mix(in srgb, v-bind('tintaBase') 24%, transparent) 1px, transparent 1px),
    linear-gradient(
      90deg,
      color-mix(in srgb, v-bind('tintaBase') 24%, transparent) 1px,
      transparent 1px
    );
  background-size: 28px 28px;
}
.dc-lineas {
  position: absolute;
  right: 0;
  top: 0;
  height: 100%;
  width: 60%;
  pointer-events: none;
}
.dc-top {
  position: relative;
  display: flex;
  justify-content: space-between;
  gap: 12px;
}
.dc-title {
  position: relative;
  align-self: end;
  font-family: var(--font-logo);
  font-weight: 400;
  font-size: clamp(34px, 5.4vw, 80px);
  line-height: 0.86;
  text-transform: uppercase;
}
.dc-chip {
  position: relative;
  justify-self: start;
  margin-top: 12px;
  display: inline-block;
  border-radius: 999px;
  border: 1.5px solid currentColor;
  padding: 7px 12px;
  font-family: var(--font-primary);
  font-weight: 500;
  font-size: clamp(12px, 1.1vw, 14px);
  line-height: 1;
}
@media (max-width: 860px) {
  .deck {
    height: auto;
    min-height: 0;
    display: grid;
    grid-template-columns: 1fr auto;
    align-items: start;
    gap: 12px 16px;
  }
  .wordmark {
    position: relative;
    grid-column: 1 / -1;
    grid-row: 1;
  }
  .deck-side {
    position: static;
    transform: none;
    grid-row: 2;
  }
  .deck-stage {
    position: relative;
    grid-column: 1 / -1;
    grid-row: 3;
    height: clamp(380px, 64vh, 520px);
    margin-top: -8px;
  }
  .deck-card {
    width: min(86vw, 440px);
    --paso: 26%;
    top: 36%;
  }
}

/* Ledger / posicion */
.portada-cuerpo {
  padding-block: clamp(48px, 7vw, 96px) clamp(56px, 8vw, 110px);
  background: v-bind('papelBg');
  color: v-bind('papelBase');
}
.ledger {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 32px;
}
.ledger h2 {
  margin-bottom: 14px;
  color: color-mix(in srgb, v-bind('papelBase') 65%, transparent);
}
.ledger ul {
  list-style: none;
  margin: 0;
  padding: 0;
  display: grid;
  gap: 4px;
  font-size: clamp(17px, 1.5vw, 20px);
  line-height: 1.25;
}
.pd {
  display: inline-block;
  background: v-bind('lineIa');
  color: v-bind('tintaBg');
  border: 1px dashed v-bind('papelBase');
  font-family: var(--font-secondary);
  font-size: 12px;
  line-height: 1.3;
  padding: 3px 8px;
}
.pills-lineas {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
}
.pills-lineas li {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  background: var(--c);
  color: var(--t);
  border-radius: 999px;
  padding: 9px 16px 9px 6px;
  font-family: var(--font-primary);
  font-weight: 500;
  font-size: 16px;
  line-height: 1;
}
.pills-lineas b {
  display: inline-grid;
  place-items: center;
  width: 22px;
  height: 22px;
  border-radius: 50%;
  background: var(--t);
  color: var(--c);
  font-family: var(--font-primary);
  font-weight: 700;
  font-size: 12px;
}
@media (max-width: 760px) {
  .ledger {
    grid-template-columns: 1fr;
  }
}
.posicion {
  display: grid;
  grid-template-columns: minmax(0, 1.6fr) minmax(0, 1fr);
  gap: clamp(28px, 5vw, 80px);
  align-items: end;
  margin-top: clamp(48px, 8vw, 120px);
}
.posicion-lead {
  font-family: var(--font-primary);
  font-weight: 400;
  font-size: clamp(34px, 4.6vw, 68px);
  line-height: 1.05;
  letter-spacing: -0.03em;
  max-width: 18ch;
}
.posicion-txt {
  display: grid;
  gap: 22px;
  max-width: 46ch;
}
.posicion-txt p {
  font-size: clamp(17px, 1.4vw, 19px);
  margin: 0;
}
.posicion-cta {
  display: flex;
  align-items: center;
  gap: 16px;
}
@media (max-width: 860px) {
  .posicion {
    grid-template-columns: 1fr;
  }
}

/* "senal" link (CTA below the lead paragraph) */
.senal {
  position: relative;
  display: inline-flex;
  align-items: stretch;
  max-width: 100%;
  background: v-bind('papelBg');
  color: v-bind('papelBase');
  border: 1.5px solid v-bind('papelBase');
  border-top: 10px solid v-bind('papelBase');
  border-radius: 10px;
  overflow: hidden;
  text-decoration: none;
  vertical-align: top;
  will-change: transform;
}
.mag-inner {
  display: inline-flex;
  align-items: stretch;
  pointer-events: none;
}
.senal-cel {
  display: flex;
  align-items: center;
  gap: 6px;
  padding: 10px 16px;
  min-width: 0;
}
.senal-cel + .senal-cel {
  border-left: 1.5px solid v-bind('papelBase');
}
.senal-flecha {
  padding: 10px 14px;
}
.fm {
  width: clamp(26px, 2.6vw, 36px);
  height: auto;
  display: block;
}
.senal-txt {
  font-family: var(--font-primary);
  font-weight: 700;
  font-size: clamp(17px, 1.7vw, 24px);
  line-height: 1.02;
  letter-spacing: -0.03em;
}
</style>
