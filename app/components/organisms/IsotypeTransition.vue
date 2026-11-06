<script setup lang="ts">
import { brandConfig, serviceLines } from '~/config/brand'

const { t } = useLocale()
const tinta = brandConfig.dark
// Flat (dot-free) copies for `v-bind()` in <style> — see the comment in AppHeader.vue.
const tintaBg = tinta.background
const tintaBase = tinta.base
const lineEstrategia = serviceLines.estrategia
const lineDesarrollo = serviceLines.desarrollo
const lineIa = serviceLines.ia

const stageRef = ref<HTMLElement | null>(null)
useIsotypeTransition(stageRef)
</script>

<template>
  <div
    ref="stageRef"
    class="transicion"
    aria-hidden="true"
  >
    <div class="t-fondo">
      <canvas class="t-gl" />
    </div>
    <div class="t-pre label">{{ t('hero.transicion.pre') }}</div>
    <div class="t-o">
      <svg viewBox="0 0 300 300">
        <path
          fill="currentColor"
          fill-rule="evenodd"
          d="M300.00 150.00 C300.00 167.40 299.89 190.30 299.67 202.19 C299.45 214.08 299.12 215.81 298.68 221.36 C298.24 226.91 297.69 231.23 297.03 235.49 C296.36 239.75 295.59 243.42 294.70 246.93 C293.81 250.45 292.80 253.59 291.67 256.57 C290.54 259.55 289.30 262.27 287.93 264.83 C286.56 267.40 285.07 269.75 283.43 271.97 C281.80 274.19 280.05 276.23 278.14 278.14 C276.23 280.05 274.19 281.80 271.97 283.43 C269.75 285.07 267.40 286.56 264.83 287.93 C262.27 289.30 259.55 290.54 256.57 291.67 C253.59 292.80 250.45 293.81 246.93 294.70 C243.42 295.59 239.75 296.36 235.49 297.03 C231.23 297.69 226.91 298.24 221.36 298.68 C215.81 299.12 214.08 299.45 202.19 299.67 C190.30 299.89 167.40 300.00 150.00 300.00 C132.60 300.00 109.70 299.89 97.81 299.67 C85.92 299.45 84.19 299.12 78.64 298.68 C73.09 298.24 68.77 297.69 64.51 297.03 C60.25 296.36 56.58 295.59 53.07 294.70 C49.55 293.81 46.41 292.80 43.43 291.67 C40.45 290.54 37.73 289.30 35.17 287.93 C32.60 286.56 30.25 285.07 28.03 283.43 C25.81 281.80 23.77 280.05 21.86 278.14 C19.95 276.23 18.20 274.19 16.57 271.97 C14.93 269.75 13.44 267.40 12.07 264.83 C10.70 262.27 9.46 259.55 8.33 256.57 C7.20 253.59 6.19 250.45 5.30 246.93 C4.41 243.42 3.64 239.75 2.97 235.49 C2.31 231.23 1.76 226.91 1.32 221.36 C0.88 215.81 0.55 214.08 0.33 202.19 C0.11 190.30 0.00 167.40 0.00 150.00 C0.00 132.60 0.11 109.70 0.33 97.81 C0.55 85.92 0.88 84.19 1.32 78.64 C1.76 73.09 2.31 68.77 2.97 64.51 C3.64 60.25 4.41 56.58 5.30 53.07 C6.19 49.55 7.20 46.41 8.33 43.43 C9.46 40.45 10.70 37.73 12.07 35.17 C13.44 32.60 14.93 30.25 16.57 28.03 C18.20 25.81 19.95 23.77 21.86 21.86 C23.77 19.95 25.81 18.20 28.03 16.57 C30.25 14.93 32.60 13.44 35.17 12.07 C37.73 10.70 40.45 9.46 43.43 8.33 C46.41 7.20 49.55 6.19 53.07 5.30 C56.58 4.41 60.25 3.64 64.51 2.97 C68.77 2.31 73.09 1.76 78.64 1.32 C84.19 0.88 85.92 0.55 97.81 0.33 C109.70 0.11 132.60 0.00 150.00 0.00 C167.40 0.00 190.30 0.11 202.19 0.33 C214.08 0.55 215.81 0.88 221.36 1.32 C226.91 1.76 231.23 2.31 235.49 2.97 C239.75 3.64 243.42 4.41 246.93 5.30 C250.45 6.19 253.59 7.20 256.57 8.33 C259.55 9.46 262.27 10.70 264.83 12.07 C267.40 13.44 269.75 14.93 271.97 16.57 C274.19 18.20 276.23 19.95 278.14 21.86 C280.05 23.77 281.80 25.81 283.43 28.03 C285.07 30.25 286.56 32.60 287.93 35.17 C289.30 37.73 290.54 40.45 291.67 43.43 C292.80 46.41 293.81 49.55 294.70 53.07 C295.59 56.58 296.36 60.25 297.03 64.51 C297.69 68.77 298.24 73.09 298.68 78.64 C299.12 84.19 299.45 85.92 299.67 97.81 C299.89 109.70 300.00 132.60 300.00 150.00 Z M250.99 250.99 C248.31 253.68 245.23 256.48 242.51 258.65 C239.79 260.82 237.32 262.46 234.66 264.02 C231.99 265.58 229.31 266.89 226.53 268.02 C223.76 269.15 220.93 270.06 218.03 270.79 C215.13 271.51 212.16 272.03 209.13 272.37 C206.10 272.70 202.99 272.84 199.84 272.79 C196.69 272.74 193.47 272.50 190.20 272.08 C186.93 271.65 183.61 271.03 180.25 270.23 C176.89 269.42 173.47 268.43 170.03 267.26 C166.59 266.08 163.10 264.72 159.59 263.18 C156.07 261.63 152.53 259.90 148.96 257.99 C145.39 256.08 141.79 253.99 138.17 251.71 C134.56 249.42 130.92 246.96 127.24 244.30 C123.56 241.63 119.88 238.80 116.11 235.70 C112.33 232.60 108.73 229.51 104.58 225.69 C100.43 221.88 95.57 217.19 91.19 212.81 C86.81 208.43 82.12 203.57 78.31 199.42 C74.49 195.27 71.40 191.67 68.30 187.89 C65.20 184.12 62.37 180.44 59.70 176.76 C57.04 173.08 54.58 169.44 52.29 165.83 C50.01 162.21 47.92 158.61 46.01 155.04 C44.10 151.47 42.37 147.93 40.82 144.41 C39.28 140.90 37.92 137.41 36.74 133.97 C35.57 130.53 34.58 127.11 33.77 123.75 C32.97 120.39 32.35 117.07 31.92 113.80 C31.50 110.53 31.26 107.31 31.21 104.16 C31.16 101.01 31.30 97.90 31.63 94.87 C31.97 91.84 32.49 88.87 33.21 85.97 C33.94 83.07 34.85 80.24 35.98 77.47 C37.11 74.69 38.42 72.01 39.98 69.34 C41.54 66.68 43.18 64.21 45.35 61.49 C47.52 58.77 50.32 55.69 53.01 53.01 C55.69 50.32 58.77 47.52 61.49 45.35 C64.21 43.18 66.68 41.54 69.34 39.98 C72.01 38.42 74.69 37.11 77.47 35.98 C80.24 34.85 83.07 33.94 85.97 33.21 C88.87 32.49 91.84 31.97 94.87 31.63 C97.90 31.30 101.01 31.16 104.16 31.21 C107.31 31.26 110.53 31.50 113.80 31.92 C117.07 32.35 120.39 32.97 123.75 33.77 C127.11 34.58 130.53 35.57 133.97 36.74 C137.41 37.92 140.90 39.28 144.41 40.82 C147.93 42.37 151.47 44.10 155.04 46.01 C158.61 47.92 162.21 50.01 165.83 52.29 C169.44 54.58 173.08 57.04 176.76 59.70 C180.44 62.37 184.12 65.20 187.89 68.30 C191.67 71.40 195.27 74.49 199.42 78.31 C203.57 82.12 208.43 86.81 212.81 91.19 C217.19 95.57 221.88 100.43 225.69 104.58 C229.51 108.73 232.60 112.33 235.70 116.11 C238.80 119.88 241.63 123.56 244.30 127.24 C246.96 130.92 249.42 134.56 251.71 138.17 C253.99 141.79 256.08 145.39 257.99 148.96 C259.90 152.53 261.63 156.07 263.18 159.59 C264.72 163.10 266.08 166.59 267.26 170.03 C268.43 173.47 269.42 176.89 270.23 180.25 C271.03 183.61 271.65 186.93 272.08 190.20 C272.50 193.47 272.74 196.69 272.79 199.84 C272.84 202.99 272.70 206.10 272.37 209.13 C272.03 212.16 271.51 215.13 270.79 218.03 C270.06 220.93 269.15 223.76 268.02 226.53 C266.89 229.31 265.58 231.99 264.02 234.66 C262.46 237.32 260.82 239.79 258.65 242.51 C256.48 245.23 253.68 248.31 250.99 250.99 Z"
        />
      </svg>
    </div>
    <div class="t-post">
      <span class="label">{{ t('hero.transicion.postLabel') }}</span>
      <span class="headline"
        >{{ t('hero.transicion.postHeadlineLine1') }}<br />{{
          t('hero.transicion.postHeadlineLine2')
        }}</span
      >
    </div>
  </div>
</template>

<style scoped>
/* Accessible/no-motion default: a short static panel, post content always visible. */
.transicion {
  position: relative;
  min-height: 60vh;
  overflow: hidden;
  background: v-bind('tintaBg');
  color: v-bind('tintaBase');
  display: grid;
  place-items: center;
  padding-block: clamp(56px, 8vw, 96px);
}
.t-fondo {
  position: absolute;
  inset: 0;
  background:
    radial-gradient(
      ellipse 50% 30% at 35% 40%,
      color-mix(in srgb, v-bind('lineEstrategia') 35%, transparent),
      transparent 70%
    ),
    radial-gradient(
      ellipse 40% 25% at 65% 60%,
      color-mix(in srgb, v-bind('lineDesarrollo') 25%, transparent),
      transparent 70%
    ),
    v-bind('tintaBg');
}
.t-fondo::before {
  content: '';
  position: absolute;
  inset: 0;
  z-index: 2;
  background: radial-gradient(
    ellipse 80% 70% at 50% 45%,
    transparent 40%,
    color-mix(in srgb, v-bind('tintaBg') 75%, transparent) 100%
  );
}
.t-gl {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  display: block;
}
.label {
  font-family: var(--font-headers);
  font-weight: 700;
  font-size: 12px;
  letter-spacing: 0.2em;
  text-transform: uppercase;
}
.t-pre {
  display: none;
}
.t-o {
  display: none;
}
.t-post {
  position: relative;
  z-index: 5;
  display: grid;
  place-content: center;
  justify-items: center;
  gap: 18px;
  text-align: center;
  padding-inline: 16px;
}
.t-post .label {
  color: v-bind('lineIa');
}
.headline {
  font-family: var(--font-logo);
  font-weight: 400;
  font-size: clamp(40px, 7vw, 100px);
  line-height: 0.9;
  text-transform: uppercase;
}

/* Full pinned/animated treatment — matches prefers-reduced-motion: no-preference */
@media (prefers-reduced-motion: no-preference) {
  .transicion {
    height: 100vh;
    height: 100svh;
    min-height: 0;
    display: block;
    padding-block: 0;
  }
  .t-pre {
    display: block;
    position: absolute;
    left: 0;
    right: 0;
    bottom: 10%;
    z-index: 4;
    text-align: center;
    opacity: 0.7;
  }
  .t-o {
    display: block;
    position: absolute;
    left: 50%;
    top: 50%;
    z-index: 4;
    width: clamp(120px, 16vw, 200px);
    aspect-ratio: 1;
    margin: calc(clamp(120px, 16vw, 200px) / -2) 0 0 calc(clamp(120px, 16vw, 200px) / -2);
    transform-origin: 47% 47%;
    color: v-bind('tintaBase');
  }
  .t-o svg {
    display: block;
    width: 100%;
    height: 100%;
  }
  .t-post {
    position: absolute;
    inset: 0;
    opacity: 0;
    padding-inline: 16px;
  }
}
</style>
