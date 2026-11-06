<script setup lang="ts">
import logoUrl from '~/assets/images/orpheus-logo.png'
import { brandConfig } from '~/config/brand'

const { t } = useLocale()

// The topbar is always the "papel" (light) composition, per the brand manual's
// footer/header placement rule — independent of useTheme()'s toggle, which governs
// in-page section rhythm elsewhere, not this fixed chrome.
const papel = brandConfig.light
// Flat (dot-free) copies for `v-bind()` in <style> — a dotted path like
// `v-bind('papelBg')` compiles to a CSS custom property literally named
// `--hash-papel.background`, and an unescaped `.` isn't valid inside a bare `var()`
// reference, so the binding silently fails to resolve (renders as the `background`'s
// initial value — transparent).
const papelBg = papel.background
const papelBase = papel.base

const ctaRef = useTemplateRef<HTMLElement>('ctaRef')
const ctaInnerRef = useTemplateRef<HTMLElement>('ctaInnerRef')
useMagnetic(ctaRef, ctaInnerRef, 0.3)

const navLinks = [
  { href: '#equipo', label: () => t('nav.nosotros') },
  { href: '#servicios', label: () => t('nav.servicios') },
  { href: '#casos', label: () => t('nav.portafolio') },
  { href: '#enfoque', label: () => t('nav.metodologia') },
  { href: '#contacto', label: () => t('nav.contacto') },
]
</script>

<template>
  <header class="topbar">
    <div class="wrap">
      <a
        href="#portada"
        class="marca"
      >
        <img
          :src="logoUrl"
          :alt="`${brandConfig.name}, inicio`"
          height="34"
        />
      </a>

      <nav
        class="nav"
        aria-label="Secciones"
      >
        <a
          v-for="link in navLinks"
          :key="link.href"
          :href="link.href"
        >
          {{ link.label() }}
        </a>
      </nav>

      <div class="top-acc">
        <a
          class="acceso-link"
          href="/portal"
        >
          {{ t('nav.accesoClientes') }}
        </a>
        <a
          ref="ctaRef"
          class="pill pill--cta"
          href="#contacto"
        >
          <span
            ref="ctaInnerRef"
            class="mag-inner"
          >
            {{ t('nav.agendaDiagnostico') }}
          </span>
        </a>
      </div>
    </div>
  </header>
</template>

<style scoped>
.topbar {
  position: sticky;
  top: env(safe-area-inset-top, 0px);
  z-index: 50;
  background: v-bind('papelBg');
  color: v-bind('papelBase');
  border-bottom: 1px solid color-mix(in srgb, v-bind('papelBase') 24%, transparent);
}
.wrap {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 16px;
  padding-block: 10px;
  padding-inline: clamp(16px, 4vw, 48px);
}
.marca {
  display: flex;
  align-items: center;
  text-decoration: none;
}
.marca img {
  display: block;
  height: clamp(26px, 2.6vw, 34px);
  width: auto;
}
.nav {
  display: flex;
  gap: 6px;
}
.nav a {
  font: 500 15px/1 var(--font-primary);
  text-decoration: none;
  padding: 9px 14px;
  border-radius: 999px;
  color: inherit;
  transition: background 150ms;
}
.nav a:hover {
  background: color-mix(in srgb, v-bind('papelBase') 8%, transparent);
}
@media (max-width: 860px) {
  .nav {
    display: none;
  }
}
.top-acc {
  display: flex;
  align-items: center;
  gap: 6px;
}
.acceso-link {
  font: 500 15px/1 var(--font-primary);
  text-decoration: none;
  padding: 9px 14px;
  border-radius: 999px;
  border: 1.5px solid v-bind('papelBase');
  color: inherit;
  white-space: nowrap;
  transition:
    background 150ms,
    color 150ms;
}
.acceso-link:hover {
  background: v-bind('papelBase');
  color: v-bind('papelBg');
}
.pill {
  position: relative;
  display: inline-flex;
  align-items: center;
  border-radius: 999px;
  padding: 10px 18px;
  font: 500 15px/1 var(--font-primary);
  text-decoration: none;
  white-space: nowrap;
  will-change: transform;
}
.pill--cta {
  background: var(--color-brand-accent);
  color: v-bind('papelBg');
}
.mag-inner {
  display: inline-flex;
  pointer-events: none;
}
@media (max-width: 520px) {
  .acceso-link {
    padding: 8px 10px;
    font-size: 13px;
  }
  .pill {
    padding: 9px 12px;
    font-size: 13px;
  }
}
</style>
