<template>
  <NuxtLink :to="`/products/${product.id}`" class="product-card group cursor-pointer block">
    <!-- Image -->
    <div class="aspect-[4/5] overflow-hidden bg-surface-container mb-6 relative">
      <img
        v-if="product.images?.length"
        :src="imgUrl(product.images[0], IMG.card)"
        :alt="product.name"
        class="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
        loading="lazy"
        decoding="async"
      />
      <div v-else class="w-full h-full bg-surface-container-high"></div>

      <!-- Hover Overlay -->
      <div class="product-overlay absolute inset-0 bg-background/40 opacity-0 transition-opacity duration-300 flex items-center justify-center backdrop-blur-[2px]">
        <span class="px-8 py-3 border border-secondary text-on-surface bg-background/20 font-label-md tracking-widest uppercase">Дэлгэрэнгүй</span>
      </div>
    </div>

    <!-- Info (centered) -->
    <div class="text-center">
      <span class="font-label-md text-[10px] text-secondary/70 tracking-[0.2em] uppercase mb-2 block">{{ categoryName }}</span>
      <h3 class="font-headline-md text-headline-sm text-on-surface mb-1 group-hover:text-secondary transition-colors">{{ product.name }}</h3>
      <p class="font-body-md text-on-surface-variant font-light tracking-wider">{{ formatPrice(product.price) }}₮</p>
    </div>
  </NuxtLink>
</template>

<script setup lang="ts">
import type { Product } from '~/composables/useMockData'

const props = defineProps<{
  product: Product
}>()

const { categoryName: lookupCategory } = useCategories()

const categoryName = computed(() => lookupCategory(props.product.category))

const formatPrice = (price: number) => price.toLocaleString('mn-MN')
</script>
