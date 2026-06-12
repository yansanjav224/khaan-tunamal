<template>
  <div class="relative z-10">
    <main class="pt-40">
      <!-- Hero Section -->
      <header class="px-6 md:px-margin-desktop max-w-container-max mx-auto mb-section-gap text-center">
        <span class="font-label-md text-label-md text-secondary uppercase tracking-[0.3em] block mb-4" v-reveal>{{ content.hero.label }}</span>
        <h1 class="font-display-lg text-display-lg md:text-[64px] mb-8 text-on-surface italic" v-reveal>{{ content.hero.title }}</h1>
        <div class="w-24 h-px bg-secondary/50 mx-auto mb-12" v-reveal></div>
        <p class="max-w-2xl mx-auto font-body-lg text-body-lg text-on-surface-variant leading-relaxed" v-reveal>
          {{ content.hero.description }}
        </p>
      </header>

      <!-- Filter Tabs -->
      <div class="flex justify-center gap-8 mb-16 px-6 overflow-x-auto whitespace-nowrap">
        <button
          @click="activeCategory = ''"
          class="font-label-md text-label-md pb-2 tracking-widest uppercase transition-colors"
          :class="!activeCategory ? 'border-b border-secondary text-on-surface' : 'text-on-surface-variant hover:text-secondary'"
        >
          Бүгд
        </button>
        <button
          v-for="cat in categories"
          :key="cat.id"
          @click="activeCategory = cat.id"
          class="font-label-md text-label-md pb-2 tracking-widest uppercase transition-colors"
          :class="activeCategory === cat.id ? 'border-b border-secondary text-on-surface' : 'text-on-surface-variant hover:text-secondary'"
        >
          {{ cat.name }}
        </button>
      </div>

      <!-- Gallery Grid -->
      <section class="px-6 md:px-margin-desktop max-w-container-max mx-auto pb-section-gap">
        <!-- Loading -->
        <div v-if="loading" class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-y-24 gap-x-gutter">
          <div v-for="i in 6" :key="i" class="animate-pulse">
            <div class="aspect-[4/5] bg-surface-container-high mb-6"></div>
            <div class="text-center space-y-2">
              <div class="h-3 bg-surface-container-high w-1/3 mx-auto"></div>
              <div class="h-5 bg-surface-container-high w-2/3 mx-auto"></div>
              <div class="h-4 bg-surface-container-high w-1/4 mx-auto"></div>
            </div>
          </div>
        </div>

        <!-- Products Grid -->
        <div v-else-if="filteredProducts.length" class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-y-24 gap-x-gutter">
          <ProductCard
            v-for="p in filteredProducts"
            :key="p.id"
            :product="p"
            v-reveal
          />
        </div>

        <!-- Empty State -->
        <div v-else class="text-center py-20">
          <span class="material-symbols-outlined text-outline-variant text-6xl mb-4 block">inventory_2</span>
          <p class="text-on-surface-variant text-body-lg">{{ content.emptyStateText }}</p>
          <button @click="clearFilters" class="mt-4 text-label-md text-secondary hover:underline uppercase tracking-widest">{{ content.emptyStateButton }}</button>
        </div>
      </section>

    </main>
  </div>
</template>

<script setup lang="ts">
const route = useRoute()
const router = useRouter()

const activeCategory = ref((route.query.category as string) || '')
const { products: allProducts, loading, getProducts } = useProducts()
const { categories, getCategories } = useCategories()
const { content, load } = useProductsContent()

onMounted(async () => {
  await load()
  if (!allProducts.value.length || !categories.value.length) {
    await Promise.all([getProducts(), getCategories()])
  }
})

const filteredProducts = computed(() => {
  let result = [...allProducts.value]
  if (activeCategory.value) {
    result = result.filter(p => p.category === activeCategory.value)
  }
  return result.sort((a, b) => (a.order || 0) - (b.order || 0))
})

const clearFilters = () => {
  activeCategory.value = ''
  router.replace({ query: {} })
}

watch(activeCategory, (cat) => {
  router.replace({ query: cat ? { category: cat } : {} })
})
</script>
