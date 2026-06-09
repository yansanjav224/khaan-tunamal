<template>
  <div class="flex flex-wrap justify-center gap-3">
    <button
      @click="$emit('select', '')"
      class="px-5 py-2.5 rounded-full text-sm font-medium transition-all duration-300"
      :class="!active
        ? 'bg-gold text-dark-bg shadow-[0_0_16px_rgba(197,165,90,0.25)]'
        : 'bg-dark-surface/80 text-gray-400 border border-dark-border hover:text-gold hover:border-gold/40'"
    >
      Бүгд
    </button>
    <button
      v-for="cat in categories"
      :key="cat.id"
      @click="$emit('select', cat.id)"
      class="px-5 py-2.5 rounded-full text-sm font-medium transition-all duration-300"
      :class="active === cat.id
        ? 'bg-gold text-dark-bg shadow-[0_0_16px_rgba(197,165,90,0.25)]'
        : 'bg-dark-surface/80 text-gray-400 border border-dark-border hover:text-gold hover:border-gold/40'"
    >
      {{ cat.name }}
    </button>
  </div>
</template>

<script setup lang="ts">
import type { Category } from '~/composables/useMockData'

defineProps<{
  categories: Category[]
  active: string
}>()

defineEmits<{
  select: [category: string]
}>()
</script>
