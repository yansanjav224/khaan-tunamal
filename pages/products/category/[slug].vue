<template>
  <div class="relative z-10">
    <main class="pt-28 md:pt-40">
      <header class="px-6 md:px-margin-desktop max-w-container-max mx-auto mb-10 md:mb-16">
        <!-- A visible trail, not just the JSON-LD one: it gives Google an
             internal link back to the catalogue and gives a visitor who landed
             here from search somewhere to go. -->
        <nav class="mb-6 md:mb-8 text-[13px] text-on-surface-variant" aria-label="Breadcrumb">
          <NuxtLink to="/" class="hover:text-secondary transition-colors">{{ ui.nav.home }}</NuxtLink>
          <span class="mx-2 text-outline">/</span>
          <NuxtLink to="/products" class="hover:text-secondary transition-colors">{{ ui.nav.products }}</NuxtLink>
          <span class="mx-2 text-outline">/</span>
          <span class="text-on-surface">{{ category.name }}</span>
        </nav>

        <h1 class="font-display-lg text-[34px] md:text-[64px] mb-5 md:mb-6 text-on-surface italic">{{ category.name }}</h1>
        <div class="w-20 h-px bg-secondary/50 mb-6 md:mb-8"></div>
        <p v-if="category.intro" class="max-w-2xl font-body-lg text-[16px] md:text-body-lg text-on-surface-variant leading-relaxed">
          {{ category.intro }}
        </p>
        <p class="mt-6 font-label-md text-label-md uppercase tracking-widest text-secondary">
          {{ items.length }} {{ ui.products.foundSuffix }}
        </p>
      </header>

      <!-- Sibling categories. Every category page links to every other one, so a
           crawler that finds one finds them all, and a visitor who came for a
           stove sees the fence and the cargo racks too. -->
      <nav v-if="siblings.length" class="px-6 md:px-margin-desktop max-w-container-max mx-auto mb-10 md:mb-12 flex gap-3 overflow-x-auto whitespace-nowrap pb-1">
        <NuxtLink
          to="/products"
          class="shrink-0 px-4 py-2.5 text-[14px] border border-outline-variant/40 text-on-surface-variant hover:text-secondary transition-colors"
        >{{ ui.products.all }}</NuxtLink>
        <NuxtLink
          v-for="c in siblings"
          :key="c.id"
          :to="`/products/category/${c.id}`"
          class="shrink-0 px-4 py-2.5 text-[14px] border transition-colors"
          :class="c.id === category.id
            ? 'border-secondary text-secondary'
            : 'border-outline-variant/40 text-on-surface-variant hover:text-secondary'"
        >{{ c.name }}</NuxtLink>
      </nav>

      <section class="px-6 md:px-margin-desktop max-w-container-max mx-auto pb-section-gap">
        <div v-if="items.length" class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-y-14 md:gap-y-16 gap-x-6 md:gap-x-gutter">
          <ProductCard v-for="p in items" :key="p.id" :product="p" v-reveal />
        </div>

        <!-- An empty category still has to sell: a customer who searched for
             fencing and found nothing should leave with a phone number, not a
             dead end. -->
        <div v-else class="py-16 text-center">
          <span class="material-symbols-outlined text-outline-variant text-6xl mb-4 block">inventory_2</span>
          <p class="text-on-surface-variant text-body-lg mb-2">{{ emptyLine }}</p>
          <p class="text-on-surface-variant text-body-md mb-8">{{ ui.product.ctaIntro }}</p>
          <div class="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              v-if="firstPhone"
              :href="`tel:${firstPhone}`"
              class="inline-flex items-center justify-center gap-3 px-10 py-4 bg-secondary text-on-secondary text-[15px] font-semibold tracking-wide hover:brightness-110 transition-all"
            >
              <span class="material-symbols-outlined text-[20px]">call</span>
              {{ formatPhone(firstPhone) }}
            </a>
            <NuxtLink
              to="/products"
              class="inline-flex items-center justify-center gap-3 px-10 py-4 ghost-border text-on-surface text-[15px] tracking-wide hover:border-secondary transition-all"
            >{{ ui.products.all }}</NuxtLink>
          </div>
        </div>

        <!-- Questions, as plain text rather than a JS accordion: a crawler
             reads it without executing anything, and an older visitor does not
             have to work out that the headings are clickable. -->
        <section v-if="faq.length" class="mt-20 md:mt-section-gap max-w-3xl">
          <div class="fine-line opacity-20 mb-12"></div>
          <h2 class="font-headline-md text-headline-md text-on-surface mb-10">{{ ui.products.faqTitle }}</h2>
          <div class="space-y-8">
            <div v-for="(item, i) in faq" :key="i" v-reveal>
              <h3 class="font-headline-sm text-[18px] text-on-surface mb-2">{{ item.q }}</h3>
              <p class="font-body-md text-body-md text-on-surface-variant leading-relaxed">{{ item.a }}</p>
            </div>
          </div>
        </section>
      </section>
    </main>
  </div>
</template>

<script setup lang="ts">
const route = useRoute()
const slug = computed(() => String(route.params.slug || ''))

const { products } = useProducts()
const { categories } = useCategories()
const { settings } = useSiteSettings()
const { content: shared } = useSharedContent()
const ui = computed(() => shared.value.ui)
const { base, abs } = useSiteUrl()

// A slug with no category behind it is a 404, not an empty grid — otherwise
// every typo becomes a thin page for Google to index.
definePageMeta({
  validate: async (route) => {
    const slug = String(route.params.slug || '')
    if (!/^[a-z0-9-]+$/.test(slug)) return false
    const cats = await $fetch<Array<{ id: string }>>('/api/categories').catch(() => [])
    return cats.some(c => c.id === slug)
  },
})

const category = computed(
  () => categories.value.find(c => c.id === slug.value) || { id: slug.value, name: '', order: 0 } as any,
)
const siblings = computed(() => categories.value)
const faq = computed(() => (category.value.faq || []).filter(f => f?.q && f?.a))
const items = computed(() =>
  products.value
    .filter(p => p.category === slug.value)
    .sort((a, b) => (a.order || 0) - (b.order || 0)),
)

const firstPhone = computed(() => (settings.value.phones || [])[0]?.number || '')
const emptyLine = computed(() => `«${category.value.name}» ангилалд одоогоор бараа нэмэгдээгүй байна.`)

usePageSeo(() => ({
  title: category.value.seoTitle || `${category.value.name} | ${settings.value.companyName}`,
  description:
    category.value.seoDescription ||
    category.value.intro ||
    `${category.value.name} — ${settings.value.companyName}. ${settings.value.companyDescription}`,
  image: category.value.image || items.value[0]?.images?.[0],
}))

useJsonLd(() => [
  ...(faq.value.length ? [{
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faq.value.map(f => ({
      '@type': 'Question',
      name: f.q,
      acceptedAnswer: { '@type': 'Answer', text: f.a },
    })),
  }] : []),
  {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: ui.value.nav.home, item: `${base}/` },
      { '@type': 'ListItem', position: 2, name: ui.value.nav.products, item: `${base}/products` },
      { '@type': 'ListItem', position: 3, name: category.value.name, item: `${base}/products/category/${slug.value}` },
    ],
  },
  {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    name: category.value.name,
    description: category.value.intro || category.value.seoDescription || '',
    url: `${base}/products/category/${slug.value}`,
    ...(category.value.image ? { image: abs(category.value.image) } : {}),
    mainEntity: {
      '@type': 'ItemList',
      numberOfItems: items.value.length,
      itemListElement: items.value.slice(0, 30).map((p, i) => ({
        '@type': 'ListItem',
        position: i + 1,
        name: p.name,
        url: `${base}/products/${p.id}`,
      })),
    },
  },
])
</script>
