<template>
  <div class="min-h-screen flex flex-col bg-diagonal-lines">
    <AppHeader />
    <main class="flex-1">
      <slot />
    </main>
    <AppFooter />
  </div>
</template>

<script setup lang="ts">
const { getSettings } = useSiteSettings()
onMounted(() => getSettings())
</script>
