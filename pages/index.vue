<template>
  <div>
    <MongolianScript />
    <HeroSection />

    <!-- Featured Products -->
    <section class="py-20 md:py-28">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div v-reveal class="text-center mb-14">
          <span class="text-gold/60 text-sm font-medium tracking-[0.2em] uppercase mb-3 block">Шилдэг сонголт</span>
          <h2 class="text-3xl md:text-5xl font-display font-bold">
            <span class="gold-gradient-text">Онцлох бүтээгдэхүүн</span>
          </h2>
          <div class="w-16 h-px bg-gold/40 mx-auto mt-4"></div>
        </div>

        <div v-if="loading" class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <div v-for="i in 4" :key="i" class="card animate-pulse">
            <div class="aspect-[4/3] bg-dark-border"></div>
            <div class="p-4 space-y-3">
              <div class="h-4 bg-dark-border rounded w-3/4"></div>
              <div class="h-4 bg-dark-border rounded w-1/2"></div>
            </div>
          </div>
        </div>

        <div v-else class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
          <ProductCard
            v-for="(p, index) in featuredProducts"
            :key="p.id"
            :product="p"
            v-reveal="{ delay: index * 120 }"
          />
        </div>

        <div v-reveal="{ delay: 200 }" class="text-center mt-12">
          <NuxtLink to="/products" class="btn-outline inline-flex items-center gap-2 text-base">
            Бүх бүтээгдэхүүн үзэх
            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 8l4 4m0 0l-4 4m4-4H3" /></svg>
          </NuxtLink>
        </div>
      </div>
    </section>

    <!-- Categories -->
    <section class="py-20 md:py-28 relative overflow-hidden">
      <!-- Subtle background -->
      <div class="absolute inset-0 bg-gradient-to-b from-dark-surface/60 via-dark-surface/40 to-dark-surface/60"></div>

      <div class="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div v-reveal class="text-center mb-14">
          <span class="text-gold/60 text-sm font-medium tracking-[0.2em] uppercase mb-3 block">Бүтээгдэхүүний төрөл</span>
          <h2 class="text-3xl md:text-5xl font-display font-bold">
            <span class="gold-gradient-text">Ангилалууд</span>
          </h2>
          <div class="w-16 h-px bg-gold/40 mx-auto mt-4"></div>
        </div>

        <div class="grid grid-cols-2 md:grid-cols-3 gap-5 md:gap-8 max-w-4xl mx-auto">
          <NuxtLink
            v-for="(cat, index) in categoriesWithIcons"
            :key="cat.id"
            :to="`/products?category=${cat.id}`"
            class="group relative"
            v-reveal="{ delay: index * 100 }"
          >
            <div class="card card-hover p-6 md:p-8 text-center h-full flex flex-col items-center justify-center gap-4 min-h-[140px] md:min-h-[180px]">
              <!-- Icon -->
              <div class="w-14 h-14 md:w-16 md:h-16 rounded-full bg-gold/5 border border-gold/20 flex items-center justify-center group-hover:bg-gold/10 group-hover:border-gold/40 transition-all duration-300">
                <div v-html="cat.icon" class="w-7 h-7 md:w-8 md:h-8 text-gold/70 group-hover:text-gold transition-colors"></div>
              </div>
              <!-- Name -->
              <h3 class="font-display font-semibold text-gray-200 group-hover:text-gold transition-colors text-sm md:text-base">
                {{ cat.name }}
              </h3>
              <!-- Subtle arrow -->
              <svg class="w-4 h-4 text-gold/0 group-hover:text-gold/60 transition-all duration-300 group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </div>
          </NuxtLink>
        </div>
      </div>
    </section>

    <ContactCTA />
  </div>
</template>

<script setup lang="ts">
const { products, loading, getProducts } = useProducts()
const { categories, getCategories } = useCategories()

// Fetch all products + categories on client
onMounted(async () => {
  await Promise.all([getProducts(), getCategories()])
})

// Compute featured from all products
const featuredProducts = computed(() =>
  products.value.filter(p => p.featured).sort((a, b) => (a.order || 0) - (b.order || 0))
)

const categoryIcons: Record<string, string> = {
  'zuukh-beleg': '<svg fill="none" stroke="currentColor" viewBox="0 0 24 24" class="w-full h-full"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M17.657 18.657A8 8 0 016.343 7.343S7 9 9 10c0-2 .5-5 2.986-7C14 5 16.09 5.777 17.656 7.343A7.975 7.975 0 0120 13a7.975 7.975 0 01-2.343 5.657z" /><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M9.879 16.121A3 3 0 1012.015 11L11 14H9c0 .768.293 1.536.879 2.121z" /></svg>',
  'zuukh-tom': '<svg fill="none" stroke="currentColor" viewBox="0 0 24 24" class="w-full h-full"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M17.657 18.657A8 8 0 016.343 7.343S7 9 9 10c0-2 .5-5 2.986-7C14 5 16.09 5.777 17.656 7.343A7.975 7.975 0 0120 13a7.975 7.975 0 01-2.343 5.657z" /><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M9.879 16.121A3 3 0 1012.015 11L11 14H9c0 .768.293 1.536.879 2.121z" /></svg>',
  taviur: '<svg fill="none" stroke="currentColor" viewBox="0 0 24 24" class="w-full h-full"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" /></svg>',
  avdar: '<svg fill="none" stroke="currentColor" viewBox="0 0 24 24" class="w-full h-full"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" /></svg>',
  mashin: '<svg fill="none" stroke="currentColor" viewBox="0 0 24 24" class="w-full h-full"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>',
}

const categoriesWithIcons = computed(() =>
  categories.value.map(cat => ({
    ...cat,
    icon: categoryIcons[cat.id] || categoryIcons.avdar,
  }))
)
</script>
