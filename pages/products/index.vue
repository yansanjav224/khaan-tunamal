<template>
  <div class="relative z-10">
    <main class="pt-28 md:pt-40">
      <!-- Hero -->
      <header class="px-6 md:px-margin-desktop max-w-container-max mx-auto mb-10 md:mb-20 text-center">
        <span v-if="content.hero.label" class="font-label-md text-[11px] md:text-label-md text-secondary uppercase tracking-[0.25em] md:tracking-[0.3em] block mb-3 md:mb-4" v-reveal>{{ content.hero.label }}</span>
        <h1 class="font-display-lg text-[34px] md:text-[64px] mb-5 md:mb-8 text-on-surface italic" v-reveal>{{ content.hero.title }}</h1>
        <div class="w-20 h-px bg-secondary/50 mx-auto mb-6 md:mb-8" v-reveal></div>
        <p class="max-w-2xl mx-auto font-body-lg text-[16px] md:text-body-lg text-on-surface-variant leading-relaxed" v-reveal>
          {{ content.hero.description }}
        </p>
      </header>

      <!-- Search -->
      <div class="max-w-md mx-auto mb-10 px-6">
        <div class="relative">
          <span class="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-on-surface-variant text-[20px] pointer-events-none">search</span>
          <label for="product-search" class="sr-only">{{ ui.products.searchPlaceholder }}</label>
          <input
            id="product-search"
            v-model="search"
            type="search"
            :placeholder="ui.products.searchPlaceholder"
            class="w-full bg-surface-container border border-outline-variant/40 text-on-surface pl-12 pr-4 py-3 font-body-md text-body-md placeholder:text-on-surface-variant/50 focus:outline-none focus:border-secondary transition-colors"
          />
        </div>
      </div>

      <!-- Filter tabs. Links rather than buttons: each category has a real page
           at /products/category/<id> with its own title and copy, and a crawler
           follows an href where it cannot follow a click handler. -->
      <nav class="flex md:justify-center gap-3 md:gap-8 mb-10 md:mb-12 px-6 overflow-x-auto whitespace-nowrap pb-1">
        <span
          class="shrink-0 px-4 py-2.5 text-[14px] border border-secondary text-secondary md:border-0 md:px-0 md:py-0 md:pb-2 md:border-b md:text-on-surface md:font-label-md md:text-label-md md:tracking-widest md:uppercase"
        >
          {{ ui.products.all }}
        </span>
        <NuxtLink
          v-for="cat in categories"
          :key="cat.id"
          :to="`/products/category/${cat.id}`"
          class="shrink-0 px-4 py-2.5 text-[14px] border border-outline-variant/40 text-on-surface-variant hover:text-secondary transition-colors md:border-0 md:px-0 md:py-0 md:pb-2 md:border-transparent md:font-label-md md:text-label-md md:tracking-widest md:uppercase"
        >
          {{ cat.name }}
        </NuxtLink>
      </nav>

      <!-- Grid -->
      <section class="px-6 md:px-margin-desktop max-w-container-max mx-auto pb-section-gap">
        <p v-if="filteredProducts.length" class="sr-only" aria-live="polite">
          {{ filteredProducts.length }} {{ ui.products.foundSuffix }}
        </p>

        <div v-if="filteredProducts.length" class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-y-14 md:gap-y-16 gap-x-6 md:gap-x-gutter">
          <ProductCard
            v-for="p in filteredProducts"
            :key="p.id"
            :product="p"
            v-reveal
          />
        </div>

        <div v-else class="text-center py-20">
          <span class="material-symbols-outlined text-outline-variant text-6xl mb-4 block">inventory_2</span>
          <template v-if="search.trim()">
            <p class="text-on-surface-variant text-body-lg">{{ content.emptyStateText }}</p>
            <button @click="clearFilters" class="mt-4 text-label-md text-secondary hover:underline uppercase tracking-widest">{{ content.emptyStateButton }}</button>
          </template>
          <p v-else class="text-on-surface-variant text-body-lg">{{ ui.products.emptyAll }}</p>
        </div>
      </section>
    </main>
  </div>
</template>

<script setup lang="ts">
const route = useRoute()

const { products: allProducts } = useProducts()
const { categories } = useCategories()
const { content } = useProductsContent()
const { settings } = useSiteSettings()
const { content: shared } = useSharedContent()
const ui = computed(() => shared.value.ui)
const { base } = useSiteUrl()

// ?category=X is the old shape of a category link. It still arrives from
// bookmarks and anything already shared, so it is sent to the page that now
// owns that content rather than being silently filtered here — two URLs for
// one list is the kind of duplication that keeps both out of search results.
const legacyCategory = computed(() => String(route.query.category || ''))
watchEffect(() => {
  if (legacyCategory.value && /^[a-z0-9-]+$/.test(legacyCategory.value)) {
    navigateTo(`/products/category/${legacyCategory.value}`, { redirectCode: 301, replace: true })
  }
})

const search = ref('')

usePageSeo(() => ({
  title: `${content.value.hero.title} — ${ui.value.nav.products} | ${settings.value.companyName}`,
  description: content.value.hero.description,
  image: allProducts.value[0]?.images?.[0],
}))

// An ItemList tells Google this is a product listing rather than a plain page.
useJsonLd(() => ({
  '@context': 'https://schema.org',
  '@type': 'ItemList',
  name: `${settings.value.companyName} — ${ui.value.nav.products}`,
  numberOfItems: allProducts.value.length,
  itemListElement: allProducts.value.slice(0, 30).map((p, i) => ({
    '@type': 'ListItem',
    position: i + 1,
    name: p.name,
    url: `${base}/products/${p.id}`,
  })),
}))

// This page is now the whole catalogue plus search; narrowing by category is
// what the category pages are for.
const filteredProducts = computed(() => {
  const q = search.value.trim().toLowerCase()
  const result = q
    ? allProducts.value.filter(p =>
        p.name.toLowerCase().includes(q) ||
        (p.description || '').toLowerCase().includes(q),
      )
    : [...allProducts.value]
  return result.sort((a, b) => (a.order || 0) - (b.order || 0))
})

const clearFilters = () => {
  search.value = ''
}
</script>
