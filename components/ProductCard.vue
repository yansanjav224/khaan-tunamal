<template>
  <NuxtLink :to="`/products/${product.id}`" class="product-card group cursor-pointer block">
    <!-- Image -->
    <div class="media-frame aspect-[4/5] mb-6 ghost-border">
      <img
        v-if="product.images?.length"
        :src="imgUrl(product.images[0], IMG.card)"
        :alt="product.name"
        loading="lazy"
        decoding="async"
      />
      <div v-else class="w-full h-full bg-surface-container-high"></div>

      <!-- Hover overlay -->
      <div class="absolute inset-0 z-10 bg-background/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center backdrop-blur-[2px]">
        <span class="px-8 py-3 border border-secondary text-on-surface bg-background/20 font-label-md text-label-md tracking-widest uppercase">Дэлгэрэнгүй</span>
      </div>
    </div>

    <!-- Info. The name gets a fixed two-line box so prices sit on one baseline
         across the row — titles vary from one to three lines. -->
    <div class="text-center">
      <span class="font-label-md text-[10px] text-secondary/70 tracking-[0.2em] uppercase mb-2 block">{{ categoryName }}</span>
      <h3 class="font-headline-md text-headline-sm text-on-surface mb-2 group-hover:text-secondary transition-colors line-clamp-2 min-h-[2.8em] flex items-center justify-center">
        {{ product.name }}
      </h3>
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
