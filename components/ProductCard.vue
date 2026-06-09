<template>
  <NuxtLink :to="`/products/${product.id}`" class="group block rounded-xl bg-dark-surface border border-dark-border overflow-hidden transition-all duration-300 hover:border-gold/40 hover:shadow-[0_4px_24px_rgba(197,165,90,0.1)]">
    <!-- Image -->
    <div class="aspect-[4/3] bg-dark-bg relative overflow-hidden">
      <img
        v-if="product.images?.length"
        :src="product.images[0]"
        :alt="product.name"
        class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
      />
      <div v-else class="w-full h-full flex items-center justify-center bg-gradient-to-br from-dark-surface to-dark-bg">
        <LogoHTX variant="md" class="opacity-20" />
      </div>
      <!-- Featured badge -->
      <div v-if="product.featured" class="absolute top-3 left-3 bg-gold text-dark-bg text-xs font-bold px-3 py-1.5 rounded-full">
        Онцлох
      </div>
      <!-- Hover overlay -->
      <div class="absolute inset-0 bg-gradient-to-t from-dark-bg/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
    </div>

    <!-- Info -->
    <div class="p-4 md:p-5 flex flex-col">
      <h3 class="font-sans font-semibold text-gray-200 group-hover:text-gold transition-colors line-clamp-1 text-sm">
        {{ product.name }}
      </h3>
      <p class="text-gray-500 text-xs mt-1 h-4">{{ product.sizes || '' }}</p>
      <div class="flex items-center justify-between mt-2 pt-3 border-t border-dark-border/40">
        <span class="text-gold font-semibold text-sm font-sans">{{ formatPrice(product.price) }}₮</span>
        <span class="text-gray-600 text-xs group-hover:text-gold/60 transition-colors flex items-center gap-1">
          Дэлгэрэнгүй
          <svg class="w-3 h-3 group-hover:translate-x-0.5 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" /></svg>
        </span>
      </div>
    </div>
  </NuxtLink>
</template>

<script setup lang="ts">
import type { Product } from '~/composables/useMockData'

defineProps<{
  product: Product
}>()

const formatPrice = (price: number) => {
  return price.toLocaleString('mn-MN')
}
</script>
