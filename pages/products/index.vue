<template>
  <div class="py-10 md:py-16">
    <div class="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-10">
      <!-- Header -->
      <div class="text-center mb-8">
        <h1 class="text-3xl md:text-4xl font-display font-bold mb-3">
          <span class="gold-gradient-text">Бүтээгдэхүүн</span>
        </h1>
        <div class="w-12 h-px bg-gold/40 mx-auto"></div>
      </div>

      <!-- Mobile: Filter button -->
      <div class="lg:hidden mb-4">
        <button
          @click="mobileFilterOpen = !mobileFilterOpen"
          class="w-full flex items-center gap-2 px-4 py-2.5 rounded-xl bg-dark-surface border border-dark-border/50 text-sm text-gray-300"
        >
          <svg class="w-4 h-4 text-gold" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z" />
          </svg>
          <span>Шүүлтүүр</span>
          <span v-if="activeFilterCount" class="bg-gold text-black text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">{{ activeFilterCount }}</span>
          <svg class="w-4 h-4 ml-auto transition-transform" :class="mobileFilterOpen ? 'rotate-180' : ''" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
          </svg>
        </button>

        <!-- Mobile dropdown -->
        <Transition
          enter-active-class="transition duration-200 ease-out"
          enter-from-class="opacity-0 -translate-y-2"
          enter-to-class="opacity-100 translate-y-0"
          leave-active-class="transition duration-150 ease-in"
          leave-from-class="opacity-100 translate-y-0"
          leave-to-class="opacity-0 -translate-y-2"
        >
          <div v-if="mobileFilterOpen" class="mt-2 bg-dark-surface border border-dark-border/50 rounded-xl p-4 space-y-4">
            <!-- Search -->
            <div>
              <input
                v-model="searchQuery"
                type="text"
                placeholder="Нэрээр хайх..."
                class="w-full px-3 py-2 rounded-lg bg-dark-bg border border-dark-border/50 text-sm text-gray-200 placeholder-gray-500 focus:border-gold/40 focus:outline-none"
              />
            </div>
            <!-- Categories -->
            <div class="flex flex-wrap gap-2">
              <button
                @click="activeCategory = ''; mobileFilterOpen = false"
                class="mobile-filter-btn"
                :class="!activeCategory ? 'mobile-filter-active' : 'mobile-filter-inactive'"
              >
                Бүгд
              </button>
              <button
                v-for="cat in categories"
                :key="cat.id"
                @click="activeCategory = cat.id; mobileFilterOpen = false"
                class="mobile-filter-btn"
                :class="activeCategory === cat.id ? 'mobile-filter-active' : 'mobile-filter-inactive'"
              >
                {{ cat.name }}
              </button>
            </div>
            <!-- Price -->
            <div class="flex gap-2 items-center">
              <input v-model.number="priceMin" type="number" placeholder="Доод үнэ" class="w-full px-3 py-2 rounded-lg bg-dark-bg border border-dark-border/50 text-sm text-gray-200 placeholder-gray-500 focus:border-gold/40 focus:outline-none" />
              <span class="text-gray-500 text-sm">—</span>
              <input v-model.number="priceMax" type="number" placeholder="Дээд үнэ" class="w-full px-3 py-2 rounded-lg bg-dark-bg border border-dark-border/50 text-sm text-gray-200 placeholder-gray-500 focus:border-gold/40 focus:outline-none" />
            </div>
            <button v-if="activeFilterCount" @click="clearFilters" class="text-sm text-gold hover:underline">Шүүлтүүр арилгах</button>
          </div>
        </Transition>
      </div>

      <!-- Sidebar + Products -->
      <div class="flex flex-col lg:flex-row gap-6 lg:gap-10">
        <!-- Sidebar (desktop only) -->
        <aside class="hidden lg:block lg:w-64 shrink-0">
          <div class="lg:sticky lg:top-24 bg-dark-surface/50 border border-dark-border/50 rounded-2xl p-6 space-y-6">
            <!-- Search -->
            <div>
              <h3 class="text-xs font-semibold text-gold/60 tracking-[0.2em] uppercase mb-3">Хайх</h3>
              <input
                v-model="searchQuery"
                type="text"
                placeholder="Нэрээр хайх..."
                class="w-full px-3 py-2.5 rounded-xl bg-dark-bg border border-dark-border/50 text-sm text-gray-200 placeholder-gray-500 focus:border-gold/40 focus:outline-none"
              />
            </div>

            <!-- Categories -->
            <div>
              <h3 class="text-xs font-semibold text-gold/60 tracking-[0.2em] uppercase mb-3 pb-3 border-b border-dark-border/40">Ангилал</h3>
              <nav class="flex flex-col gap-1.5">
                <button
                  @click="activeCategory = ''"
                  class="sidebar-btn"
                  :class="!activeCategory ? 'sidebar-btn-active' : 'sidebar-btn-inactive'"
                >
                  Бүгд <span class="text-gray-500 ml-1">({{ allProducts.length }})</span>
                </button>
                <button
                  v-for="cat in categories"
                  :key="cat.id"
                  @click="activeCategory = cat.id"
                  class="sidebar-btn"
                  :class="activeCategory === cat.id ? 'sidebar-btn-active' : 'sidebar-btn-inactive'"
                >
                  {{ cat.name }} <span class="text-gray-500 ml-1">({{ categoryCount(cat.id) }})</span>
                </button>
              </nav>
            </div>

            <!-- Price filter -->
            <div>
              <h3 class="text-xs font-semibold text-gold/60 tracking-[0.2em] uppercase mb-3 pb-3 border-b border-dark-border/40">Үнэ</h3>
              <div class="space-y-2">
                <input v-model.number="priceMin" type="number" placeholder="Доод үнэ" class="w-full px-3 py-2.5 rounded-xl bg-dark-bg border border-dark-border/50 text-sm text-gray-200 placeholder-gray-500 focus:border-gold/40 focus:outline-none" />
                <input v-model.number="priceMax" type="number" placeholder="Дээд үнэ" class="w-full px-3 py-2.5 rounded-xl bg-dark-bg border border-dark-border/50 text-sm text-gray-200 placeholder-gray-500 focus:border-gold/40 focus:outline-none" />
              </div>
            </div>

            <!-- Clear -->
            <button v-if="activeFilterCount" @click="clearFilters" class="w-full text-sm text-gold hover:underline text-center py-2">
              Шүүлтүүр арилгах
            </button>
          </div>
        </aside>

        <!-- Products grid -->
        <div class="flex-1 min-w-0">
          <!-- Results count -->
          <div class="flex items-center justify-between mb-4">
            <p class="text-sm text-gray-400">{{ filteredProducts.length }} бараа</p>
          </div>

          <div v-if="loading" class="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
            <div v-for="i in 8" :key="i" class="rounded-xl bg-dark-surface border border-dark-border animate-pulse overflow-hidden">
              <div class="aspect-[4/3] bg-dark-border"></div>
              <div class="p-3 sm:p-4 space-y-3">
                <div class="h-4 bg-dark-border rounded w-3/4"></div>
                <div class="h-4 bg-dark-border rounded w-1/2"></div>
              </div>
            </div>
          </div>

          <div v-else-if="filteredProducts.length" class="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
            <ProductCard v-for="p in filteredProducts" :key="p.id" :product="p" />
          </div>

          <div v-else class="text-center py-20">
            <svg class="w-16 h-16 text-dark-border mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
            </svg>
            <p class="text-gray-400">Хайлтад тохирох бараа олдсонгүй</p>
            <button @click="clearFilters" class="mt-3 text-sm text-gold hover:underline">Шүүлтүүр арилгах</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
const route = useRoute()
const router = useRouter()

const activeCategory = ref((route.query.category as string) || '')
const searchQuery = ref('')
const priceMin = ref<number | null>(null)
const priceMax = ref<number | null>(null)
const mobileFilterOpen = ref(false)

const { products: allProducts, loading, getProducts } = useProducts()
const { categories, getCategories } = useCategories()

// Fetch ALL products once on client
onMounted(async () => {
  if (!allProducts.value.length || !categories.value.length) {
    await Promise.all([getProducts(), getCategories()])
  }
})

// Client-side filtering
const filteredProducts = computed(() => {
  let result = [...allProducts.value]

  // Category filter
  if (activeCategory.value) {
    result = result.filter(p => p.category === activeCategory.value)
  }

  // Name search
  if (searchQuery.value.trim()) {
    const q = searchQuery.value.toLowerCase().trim()
    result = result.filter(p => p.name.toLowerCase().includes(q))
  }

  // Price range
  if (priceMin.value) {
    result = result.filter(p => p.price >= priceMin.value!)
  }
  if (priceMax.value) {
    result = result.filter(p => p.price <= priceMax.value!)
  }

  return result.sort((a, b) => (a.order || 0) - (b.order || 0))
})

const categoryCount = (catId: string) => {
  return allProducts.value.filter(p => p.category === catId).length
}

const activeFilterCount = computed(() => {
  let count = 0
  if (activeCategory.value) count++
  if (searchQuery.value.trim()) count++
  if (priceMin.value) count++
  if (priceMax.value) count++
  return count
})

const clearFilters = () => {
  activeCategory.value = ''
  searchQuery.value = ''
  priceMin.value = null
  priceMax.value = null
  router.replace({ query: {} })
}

// Sync category to URL
watch(activeCategory, (cat) => {
  router.replace({ query: cat ? { category: cat } : {} })
})
</script>

<style scoped>
.sidebar-btn {
  @apply w-full px-4 py-3 rounded-xl text-sm transition-all duration-200 text-left;
}

.sidebar-btn-active {
  @apply bg-gold/10 text-gold font-semibold border border-gold/20;
}

.sidebar-btn-inactive {
  @apply text-gray-400 hover:text-gray-200 hover:bg-white/[0.04] border border-transparent;
}

.mobile-filter-btn {
  @apply px-4 py-2 rounded-lg text-sm transition-all duration-200;
}

.mobile-filter-active {
  @apply bg-gold/15 text-gold font-medium border border-gold/20;
}

.mobile-filter-inactive {
  @apply text-gray-400 bg-dark-bg/50 border border-dark-border/30 hover:text-gray-200;
}
</style>
