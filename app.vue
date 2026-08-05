<template>
  <NuxtLayout>
    <NuxtPage />
  </NuxtLayout>
</template>

<script setup lang="ts">
// Search Console verification lives in runtime config rather than in the head
// block of nuxt.config, so the site can be verified by adding one env var in
// Vercel instead of editing and redeploying the repo.
const token = String(useRuntimeConfig().public.gscVerification || '')

if (token) {
  useHead({
    meta: [{ name: 'google-site-verification', content: token }],
  })
}
</script>
