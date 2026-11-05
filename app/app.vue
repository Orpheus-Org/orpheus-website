<script setup lang="ts">
// Initialize brand system - injects CSS variables into :root
// This must be called at app root to ensure all components have access
const { brand } = useBrand()

useHead({
  titleTemplate: (title) => (title ? `${title} - ${brand.value.name}` : brand.value.name),
  htmlAttrs: { lang: 'es' },
  meta: [
    { charset: 'utf-8' },
    { name: 'viewport', content: 'width=device-width, initial-scale=1' },
    {
      name: 'description',
      content:
        'Creatividad humana con herramientas de IA para llevar a los negocios al siguiente paso.',
    },
  ],
  link: [{ rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }],
})
</script>

<template>
  <NuxtLayout>
    <NuxtPage />
  </NuxtLayout>
</template>
