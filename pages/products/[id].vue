<template>
  <div class="py-12 md:py-20">
    <div class="max-w-[1280px] mx-auto px-5 md:px-margin-desktop">
      <!-- Back link -->
      <NuxtLink to="/products" class="inline-flex items-center gap-2 text-on-surface-variant hover:text-gold transition-colors mb-8 text-label-md uppercase tracking-widest">
        <span class="material-symbols-outlined text-lg">arrow_back</span>
        Бүтээгдэхүүн рүү буцах
      </NuxtLink>

      <div v-if="loading" class="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 animate-pulse">
        <div class="aspect-[4/3] bg-dark-surface"></div>
        <div class="space-y-4">
          <div class="h-8 bg-dark-surface w-3/4"></div>
          <div class="h-6 bg-dark-surface w-1/4"></div>
          <div class="h-20 bg-dark-surface"></div>
        </div>
      </div>

      <div v-else-if="product" class="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-14">
        <!-- Gallery -->
        <ProductGallery :images="product.images || []" :alt="product.name" />

        <!-- Details -->
        <div class="flex flex-col">
          <!-- Info card -->
          <div class="border border-outline-variant/10 bg-dark-surface/30 p-6 lg:p-8 mb-6">
            <div v-if="categoryName" class="inline-block text-gold text-[10px] font-bold uppercase tracking-[0.3em] mb-4 px-3 py-1 border border-gold/30 bg-gold/5">{{ categoryName }}</div>
            <h1 class="font-display text-headline-lg text-on-surface mb-5">{{ product.name }}</h1>

            <div class="flex items-baseline gap-2 mb-6">
              <span class="text-gold font-display text-headline-lg">{{ formatPrice(product.price) }}</span>
              <span class="text-gold/60 text-lg">₮</span>
            </div>

            <div v-if="product.sizes" class="flex items-center gap-3 mb-6 pb-6 border-b border-outline-variant/10">
              <span class="text-on-surface-variant text-caption uppercase tracking-widest">Хэмжээ</span>
              <div class="flex gap-2">
                <span v-for="size in product.sizes.split(',')" :key="size" class="text-on-surface text-caption px-3 py-1 border border-outline-variant/20 bg-dark-surface/50">{{ size.trim() }}</span>
              </div>
            </div>

            <p class="text-on-surface-variant text-body-md leading-relaxed">{{ product.description }}</p>
          </div>

          <!-- CTA card -->
          <div class="border border-outline-variant/10 bg-dark-surface/30 p-6 lg:p-8">
            <p class="text-on-surface-variant text-body-md mb-5">Захиалга өгөх, дэлгэрэнгүй мэдээлэл авахыг хүсвэл:</p>
            <div class="flex flex-col sm:flex-row gap-3">
              <a href="tel:99907191" class="btn-gold flex items-center justify-center gap-2 flex-1">
                <span class="material-symbols-outlined text-lg">call</span>
                9990-7191
              </a>
              <a href="tel:99732244" class="btn-outline flex items-center justify-center gap-2 flex-1">
                <span class="material-symbols-outlined text-lg">call</span>
                9973-2244
              </a>
            </div>
          </div>
        </div>
      </div>

      <div v-else class="text-center py-20">
        <span class="material-symbols-outlined text-outline-variant text-6xl mb-4 block">inventory_2</span>
        <p class="text-on-surface-variant text-body-lg">Бүтээгдэхүүн олдсонгүй</p>
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
