<script setup lang="ts">
// The marketing landing page follows orpheus-mocks' fixed papel/tinta rhythm per
// section — not the app-wide light/dark toggle — so it skips the default layout
// (AppHeader/AppFooter + theme-reactive background) and composes its own chrome.
definePageMeta({ layout: false })

const { brand } = useBrand()
const { t } = useLocale()
</script>

<template>
  <div>
    <AppHeader />
    <main>
      <HeroPortada />
      <IsotypeTransition />
      <section class="wip-note">
        <p class="label">{{ brand.name }}</p>
        <p>{{ t('hero.transicion.postLabel') }} — el resto de la página sigue en construcción.</p>
      </section>
    </main>
  </div>
</template>

<style scoped>
.wip-note {
  background: var(--color-brand-background);
  color: color-mix(in srgb, var(--color-brand-base) 60%, transparent);
  padding: clamp(48px, 8vw, 96px) clamp(16px, 4vw, 48px);
  display: grid;
  gap: 8px;
  justify-items: center;
  text-align: center;
  font-family: var(--font-primary);
}
.wip-note .label {
  font-family: var(--font-headers);
  font-weight: 700;
  font-size: 12px;
  letter-spacing: 0.2em;
  text-transform: uppercase;
  color: var(--color-brand-accent);
  margin: 0;
}
.wip-note p:not(.label) {
  margin: 0;
}
</style>
