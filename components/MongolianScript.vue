<template>
  <div
    class="fixed inset-0 z-30 pointer-events-none overflow-hidden hidden xl:block bg-script"
    :style="{ opacity }"
  ></div>
</template>

<script setup lang="ts">
const opacity = ref(1)

function handleScroll() {
  const y = window.scrollY
  if (y <= 200) opacity.value = 1
  else if (y >= 700) opacity.value = 0
  else opacity.value = 1 - (y - 200) / 500
}

onMounted(() => window.addEventListener('scroll', handleScroll, { passive: true }))
onUnmounted(() => window.removeEventListener('scroll', handleScroll))
</script>

<style scoped>
.bg-script {
  background-image: url('/images/mongolian-bg.svg');
  background-size: cover;
  background-position: center center;
  background-repeat: no-repeat;
}
</style>
