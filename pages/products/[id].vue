<template>
  <!-- pt clears the fixed header (~88px); the old py-12/py-20 put the back link
       and the top of the card underneath it. -->
  <div class="pt-32 md:pt-40 pb-24">
    <div class="max-w-container-max mx-auto px-6 md:px-margin-desktop">
      <NuxtLink
        to="/products"
        class="inline-flex items-center gap-2 py-2 text-on-surface-variant hover:text-secondary transition-colors mb-6 font-label-md text-label-md uppercase tracking-widest"
      >
        <span class="material-symbols-outlined text-lg">arrow_back</span>
        {{ ui.product.back }}
      </NuxtLink>

      <div v-if="product" class="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-14">
        <ProductGallery :images="product.images || []" :alt="product.name" />

        <div class="flex flex-col">
          <!-- Info -->
          <div class="ghost-border bg-surface-container-low/40 p-6 lg:p-8 mb-6">
            <NuxtLink
              v-if="categoryName"
              :to="`/products/category/${product.category}`"
              class="inline-block text-secondary text-caption uppercase tracking-[0.3em] mb-4 px-3 py-2.5 border border-secondary/30 bg-secondary/5 hover:bg-secondary/15 transition-colors"
            >{{ categoryName }}</NuxtLink>

            <h1 class="font-display-lg text-headline-lg text-on-surface mb-5">{{ product.name }}</h1>

            <p class="text-secondary font-display-lg text-headline-lg mb-6">
              {{ formatPrice(product.price) }}<span class="text-[0.55em] align-baseline ml-1 text-secondary/70">₮</span>
            </p>

            <div v-if="product.sizes" class="flex flex-wrap items-center gap-3 mb-6 pb-6 border-b border-outline-variant/20">
              <span class="text-on-surface-variant text-caption uppercase tracking-widest">{{ ui.product.sizes }}</span>
              <div class="flex flex-wrap gap-2">
                <span
                  v-for="size in product.sizes.split(',')"
                  :key="size"
                  class="text-on-surface text-caption px-3 py-1 border border-outline-variant/30"
                >{{ size.trim() }}</span>
              </div>
            </div>

            <p class="text-on-surface-variant text-body-md leading-relaxed whitespace-pre-line">{{ product.description }}</p>
          </div>

          <!-- CTA -->
          <div class="ghost-border bg-surface-container-low/40 p-6 lg:p-8">
            <p class="text-on-surface-variant text-body-md mb-5">{{ ui.product.ctaIntro }}</p>
            <div class="flex flex-col sm:flex-row gap-3">
              <a
                v-for="(p, i) in settings.phones || []"
                :key="p.number"
                :href="`tel:${p.number}`"
                class="flex-1 inline-flex items-center justify-center gap-2 px-8 py-4 font-label-md text-label-md uppercase tracking-widest transition-all duration-300"
                :class="i === 0
                  ? 'bg-secondary text-on-secondary hover:brightness-110'
                  : 'border border-outline text-on-surface hover:border-secondary hover:text-secondary'"
              >
                <span class="material-symbols-outlined text-lg">call</span>
                {{ formatPhone(p.number) }}
              </a>
            </div>
            <a
              v-if="settings.facebookUrl"
              :href="settings.facebookUrl"
              target="_blank"
              rel="noopener noreferrer"
              class="mt-3 w-full inline-flex items-center justify-center gap-2 px-8 py-4 ghost-border font-label-md text-label-md uppercase tracking-widest text-on-surface hover:bg-surface-container-high transition-all"
            >
              <span class="material-symbols-outlined text-lg">chat</span>
              {{ ui.product.facebookCta }}
            </a>
          </div>
        </div>
      </div>

      <div v-else class="text-center py-20">
        <span class="material-symbols-outlined text-outline-variant text-6xl mb-4 block">inventory_2</span>
        <p class="text-on-surface-variant text-body-lg mb-6">{{ ui.product.notFound }}</p>
        <NuxtLink
          to="/products"
          class="inline-flex items-center justify-center px-8 py-4 ghost-border font-label-md text-label-md uppercase tracking-widest hover:border-secondary hover:text-secondary transition-all"
        >{{ ui.product.back }}</NuxtLink>
      </div>

      <!-- Related — internal links Google can follow, and a way out of a dead end -->
      <section v-if="related.length" class="mt-20 md:mt-section-gap">
        <div class="fine-line opacity-20 mb-16"></div>
        <h2 class="font-headline-md text-headline-md text-on-surface mb-10 md:mb-12 text-center">{{ ui.product.related }}</h2>
        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-y-14 gap-x-6 md:gap-x-gutter">
          <ProductCard v-for="p in related" :key="p.id" :product="p" v-reveal />
        </div>
      </section>
    </div>
  </div>
</template>

<script setup lang="ts">
// A missing product must return a real 404, not a 200 with an empty page —
// a soft 404 keeps the dead URL in Google's index. This runs in `validate`
// rather than as a top-level `await` in setup: an async setup here crashed
// hydration ("Cannot read properties of undefined (reading 'dispose')") and the
// whole page fell through to the 500 error view.
definePageMeta({
  validate: async (route) => {
    const products = await $fetch<Array<{ id: string }>>('/api/products').catch(() => [])
    // Empty list means the API hiccuped — don't bury a product that does exist.
    if (!products.length) return true
    return products.some(p => p.id === route.params.id)
  },
})

const route = useRoute()
const { products, findProduct } = useProducts()
const { categoryName: lookupCategory } = useCategories()
const { settings } = useSiteSettings()
const { content: shared } = useSharedContent()
const ui = computed(() => shared.value.ui)
const { abs, base } = useSiteUrl()

const productId = computed(() => route.params.id as string)
const product = computed(() => findProduct(productId.value))

const categoryName = computed(() => (product.value ? lookupCategory(product.value.category) : ''))

const related = computed(() => {
  const p = product.value
  if (!p) return []
  return products.value
    .filter(x => x.id !== p.id && x.category === p.category)
    .slice(0, 3)
})

// Declared before usePageSeo, not after: Unhead evaluates these getters
// synchronously during client setup, so a `const` defined further down is still
// in its temporal dead zone — that ReferenceError took the whole page to the
// 500 view on every product URL.
const formatPrice = (price: number) => price.toLocaleString('mn-MN')

usePageSeo(() => ({
  title: product.value
    ? `${product.value.name} | ${settings.value.companyName}`
    : `${ui.value.product.notFound} | ${settings.value.companyName}`,
  description: product.value
    ? `${product.value.description || product.value.name} Үнэ: ${formatPrice(product.value.price)}₮.`
    : 'Хүссэн бүтээгдэхүүн олдсонгүй.',
  image: product.value?.images?.[0],
  type: 'product',
}))

useJsonLd(() => {
  const p = product.value
  if (!p) return {}
  return {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: p.name,
    description: p.description || p.name,
    image: (p.images || []).map(i => abs(imgUrl(i, IMG.full))),
    category: categoryName.value || undefined,
    brand: { '@type': 'Brand', name: settings.value.companyName },
    offers: {
      '@type': 'Offer',
      price: p.price,
      priceCurrency: 'MNT',
      availability: 'https://schema.org/InStock',
      url: `${base}/products/${p.id}`,
      seller: { '@type': 'Organization', name: settings.value.companyName },
    },
  }
})

</script>
