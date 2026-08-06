<template>
  <!-- Traditional Mongolian script, which is written vertically by nature.
       This used to be Cyrillic rotated on its side by `writing-mode`, which
       read as a rendering fault rather than as texture — and it was legible
       enough to compete with the headline beside it. -->
  <div
    class="mongolian-script-bg font-mongolian hidden xl:block"
    :style="{ transform: `translateY(${scrollOffset}px)` }"
    aria-hidden="true"
  >
    ᠬᠠᠭᠠᠨ ᠲᠤᠨᠠᠮᠠᠯ ᠬᠢᠢᠴᠡ
  </div>
</template>

<script setup lang="ts">
const scrollOffset = ref(0)

function handleScroll() {
  scrollOffset.value = window.scrollY * 0.08
}

onMounted(() => window.addEventListener('scroll', handleScroll, { passive: true }))
onUnmounted(() => window.removeEventListener('scroll', handleScroll))
</script>
