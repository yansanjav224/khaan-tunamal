<template>
  <div
    class="mongolian-script-bg hidden lg:block"
    :style="{ transform: `translateY(${scrollOffset}px)` }"
  >
    Хаан Тунамал Хийц Монгол Төмөр Эдлэл Өв Уламжлал
  </div>
</template>

<script setup lang="ts">
const scrollOffset = ref(0)

function handleScroll() {
  scrollOffset.value = window.scrollY * 0.1
}

onMounted(() => window.addEventListener('scroll', handleScroll, { passive: true }))
onUnmounted(() => window.removeEventListener('scroll', handleScroll))
</script>
