<template>
  <NuxtLayout>
    <NuxtPage />
  </NuxtLayout>
</template>

<script setup lang="ts">
// Search Console verification lives in runtime config rather than in the head
// block of nuxt.config, so the site can be verified by adding one env var in
// Vercel instead of editing and redeploying the repo. (The live domain is
// verified by a DNS TXT record instead, so this is a spare route.)
const token = String(useRuntimeConfig().public.gscVerification || '')

if (token) {
  useHead({
    meta: [{ name: 'google-site-verification', content: token }],
  })
}

// Analytics is not here — see plugins/analytics.client.ts.
</script>
