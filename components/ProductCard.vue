<template>
  <NuxtLink :to="`/products/${product.id}`" class="product-card group cursor-pointer block">
    <!-- Image -->
    <div class="media-frame aspect-[4/5] mb-5">
      <img
        v-if="product.images?.length"
        :src="imgUrl(product.images[0], IMG.card)"
        :alt="product.name"
        loading="lazy"
        decoding="async"
      />
      <div v-else class="w-full h-full bg-surface-container-high"></div>

    </div>

    <!-- Info. The name gets a fixed two-line box so prices sit on one baseline
         across the row — titles vary from one to three lines. -->
    <div class="text-center">
      <span class="font-label-md text-[11px] text-secondary/80 tracking-[0.18em] uppercase mb-2 block">{{ categoryName }}</span>
      <h3 class="font-headline-md text-[19px] md:text-headline-sm leading-snug text-on-surface mb-2 group-hover:text-secondary transition-colors line-clamp-2 min-h-[2.6em] flex items-center justify-center">
        {{ product.name }}
      </h3>
      <p class="font-body-md text-[18px] font-medium text-secondary tracking-wide">{{ formatPrice(product.price) }}₮</p>

      <!-- Touch devices never see the hover overlay, so the card needs to say
           out loud that it opens. -->
      <span class="md:hidden mt-2 inline-flex items-center gap-1 text-[13px] text-on-surface-variant">
        {{ shared.ui.product.detail }}
        <span class="material-symbols-outlined text-[16px]">arrow_forward</span>
      </span>
    </div>
  </NuxtLink>
</template>

<script setup lang="ts">
import type { Product } from '~/composables/useMockData'

const props = defineProps<{
  product: Product
}>()

const { categoryName: lookupCategory } = useCategories()
const { content: shared } = useSharedContent()

const categoryName = computed(() => lookupCategory(props.product.category))

const formatPrice = (price: number) => price.toLocaleString('mn-MN')
</script>
