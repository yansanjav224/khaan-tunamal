<template>
  <div class="py-12 md:py-20">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <!-- Back link -->
      <NuxtLink to="/products" class="inline-flex items-center gap-2 text-gray-400 hover:text-gold transition-colors mb-8">
        <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7" />
        </svg>
        Бүтээгдэхүүн рүү буцах
      </NuxtLink>

      <div v-if="loading" class="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 animate-pulse">
        <div class="aspect-[4/3] bg-dark-surface rounded-xl"></div>
        <div class="space-y-4">
          <div class="h-8 bg-dark-surface rounded w-3/4"></div>
          <div class="h-6 bg-dark-surface rounded w-1/4"></div>
          <div class="h-20 bg-dark-surface rounded"></div>
        </div>
      </div>

      <div v-else-if="product" class="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-14">
        <!-- Gallery -->
        <ProductGallery :images="product.images || []" :alt="product.name" />

        <!-- Details -->
        <div class="flex flex-col">
          <!-- Info card -->
          <div class="rounded-2xl border border-dark-border/40 bg-dark-surface/30 p-6 lg:p-8 mb-6">
            <div v-if="categoryName" class="inline-block text-gold/80 text-xs font-semibold uppercase tracking-widest mb-3 px-3 py-1 rounded-full border border-gold/20 bg-gold/5">{{ categoryName }}</div>
            <h1 class="text-2xl md:text-3xl font-bold text-gray-100 mb-5 font-sans">{{ product.name }}</h1>

            <div class="flex items-baseline gap-2 mb-6">
              <span class="text-gold text-3xl font-bold">{{ formatPrice(product.price) }}</span>
              <span class="text-gold/60 text-lg">₮</span>
            </div>

            <div v-if="product.sizes" class="flex items-center gap-3 mb-6 pb-6 border-b border-dark-border/30">
              <span class="text-gray-500 text-sm">Хэмжээ</span>
              <div class="flex gap-2">
                <span v-for="size in product.sizes.split(',')" :key="size" class="text-gray-200 text-sm px-3 py-1 rounded-lg border border-dark-border/40 bg-dark-surface/50">{{ size.trim() }}</span>
              </div>
            </div>

            <p class="text-gray-400 leading-relaxed text-sm">{{ product.description }}</p>
          </div>

          <!-- CTA card -->
          <div class="rounded-2xl border border-dark-border/40 bg-dark-surface/30 p-6 lg:p-8">
            <p class="text-gray-500 text-sm mb-5">Захиалга өгөх, дэлгэрэнгүй мэдээлэл авахыг хүсвэл:</p>
            <div class="flex flex-col sm:flex-row gap-3">
              <a href="tel:99907191" class="btn-gold flex items-center justify-center gap-2 flex-1">
                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
                9990-7191
              </a>
              <a href="tel:99732244" class="btn-outline flex items-center justify-center gap-2 flex-1">
                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
                9973-2244
              </a>
            </div>
          </div>
        </div>
      </div>

      <div v-else class="text-center py-20">
        <p class="text-gray-400 text-lg">Бүтээгдэхүүн олдсонгүй</p>
        <NuxtLink to="/products" class="btn-outline mt-4 inline-block">Бүтээгдэхүүн рүү буцах</NuxtLink>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
const route = useRoute()
const { product, loading, getProduct } = useProducts()
const { categories, getCategories } = useCategories()

onMounted(async () => {
  await Promise.all([
    getProduct(route.params.id as string),
    categories.value.length ? Promise.resolve() : getCategories(),
  ])
})

const categoryName = computed(() => {
  if (!product.value) return ''
  const cat = categories.value.find(c => c.id === product.value!.category)
  return cat?.name || ''
})

const formatPrice = (price: number) => price.toLocaleString('mn-MN')
</script>
