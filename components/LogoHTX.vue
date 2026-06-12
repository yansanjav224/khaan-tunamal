<template>
  <div class="logo-htx" :class="sizeClass">
    <svg :width="size" :height="size" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="50" cy="50" r="47" stroke="#e9c176" stroke-width="1.5" />
      <circle cx="50" cy="50" r="41" stroke="#e9c176" stroke-width="0.4" opacity="0.4" />
      <text
        x="50"
        y="53"
        text-anchor="middle"
        dominant-baseline="middle"
        fill="#e9c176"
        :font-size="fontSize"
        font-family="'EB Garamond', serif"
        font-weight="700"
        letter-spacing="2"
      >ХТХ</text>
      <line x1="36" y1="65" x2="64" y2="65" stroke="#e9c176" stroke-width="0.5" opacity="0.35" />
    </svg>
  </div>
</template>

<script setup lang="ts">
const props = withDefaults(defineProps<{
  variant?: 'sm' | 'md' | 'lg' | 'xl'
}>(), {
  variant: 'md',
})

const sizeMap = { sm: 40, md: 48, lg: 80, xl: 100 }
const fontSizeMap = { sm: 16, md: 18, lg: 28, xl: 32 }

const size = computed(() => sizeMap[props.variant])
const fontSize = computed(() => fontSizeMap[props.variant])
const sizeClass = computed(() => `logo-${props.variant}`)
</script>

<style scoped>
.logo-htx {
  display: inline-flex;
  align-items: center;
  justify-content: center;
}
</style>
