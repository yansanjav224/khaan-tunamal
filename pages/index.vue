<template>
  <div>
    <!-- Hero -->
    <HeroSection />

    <!-- Stats -->
    <section class="px-6 md:px-margin-desktop max-w-container-max mx-auto" v-reveal>
      <div class="fine-line opacity-20"></div>
      <div
        class="grid grid-cols-3 gap-6 md:gap-24 text-center py-12 md:py-16"
        :class="stats.length === 4 ? 'md:grid-cols-4' : stats.length === 2 ? 'md:grid-cols-2' : 'md:grid-cols-3'"
      >
        <div v-for="stat in stats" :key="stat.label" class="flex flex-col items-center">
          <span class="font-display-lg text-[32px] md:text-display-lg text-secondary mb-1 md:mb-2">{{ stat.value }}</span>
          <span class="font-label-md text-[10px] md:text-label-md uppercase tracking-widest text-on-surface-variant">{{ stat.label }}</span>
        </div>
      </div>
      <div class="fine-line opacity-20"></div>
    </section>

    <!-- Featured Products — Bento -->
    <section class="py-16 md:py-section-gap px-6 md:px-margin-desktop max-w-container-max mx-auto">
      <div class="flex justify-between items-end gap-6 mb-10 md:mb-12" v-reveal>
        <div>
          <span class="font-label-md text-label-md text-secondary tracking-widest uppercase block mb-4">{{ content.featuredLabel }}</span>
          <h2 class="font-headline-md text-headline-md text-on-surface">{{ content.featuredTitle }}</h2>
        </div>
        <NuxtLink
          to="/products"
          class="shrink-0 font-label-md text-label-md uppercase tracking-widest text-on-surface-variant hover:text-secondary flex items-center gap-2 group transition-all"
        >
          <span class="hidden sm:inline">Бүх бүтээгдэхүүн үзэх</span>
          <span class="sm:hidden">Бүгд</span>
          <span class="material-symbols-outlined text-[16px]">open_in_new</span>
        </NuxtLink>
      </div>

      <!-- Captions are permanent, not hover-only. On desktop the names and
           prices were hidden until the cursor landed on a tile, so the whole
           section read as an unlabelled photo collage. -->
      <div class="grid grid-cols-1 md:grid-cols-12 md:grid-rows-2 gap-4 md:gap-6 h-auto md:h-[840px]" v-reveal>
        <NuxtLink
          v-for="(item, i) in bentoItems"
          :key="item.link + item.name"
          :to="item.link"
          class="media-frame group ghost-border"
          :class="[
            i === 0 ? 'md:col-span-8 md:row-span-1 aspect-[16/10] md:aspect-auto' : '',
            i === 1 ? 'md:col-span-4 md:row-span-2 aspect-[4/5] md:aspect-auto' : '',
            i >= 2 ? 'md:col-span-4 md:row-span-1 aspect-[4/3] md:aspect-auto' : '',
          ]"
        >
          <img
            :src="imgUrl(item.image, i === 0 ? 1000 : 700)"
            :alt="item.name"
            loading="lazy"
            decoding="async"
          />
          <div class="media-caption absolute inset-x-0 bottom-0 z-10 px-6 pb-6 md:px-8 md:pb-7">
            <span class="font-label-md text-label-md text-secondary uppercase tracking-widest block mb-2">{{ item.label }}</span>
            <h3 class="font-headline-md text-headline-sm text-on-surface line-clamp-2">{{ item.name }}</h3>
            <p v-if="item.price" class="font-body-md text-body-sm text-on-surface/80 mt-1 tracking-wider">{{ item.price }}</p>
          </div>
        </NuxtLink>
      </div>

      <!-- Featured products beyond the four bento slots. Without this they were
           marked "featured" in the admin and then never shown anywhere. -->
      <div v-if="overflowFeatured.length" class="mt-16">
        <div class="fine-line opacity-20 mb-16"></div>
        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-y-16 gap-x-gutter">
          <ProductCard v-for="p in overflowFeatured" :key="p.id" :product="p" v-reveal />
        </div>
      </div>
    </section>

    <!-- Heritage Story -->
    <section class="py-section-gap relative">
      <div class="fine-line opacity-20"></div>
      <div class="max-w-container-max mx-auto px-6 md:px-margin-desktop py-16 md:py-24 flex flex-col md:flex-row gap-16 md:gap-20 items-center">
        <div class="w-full md:w-1/2 group" v-reveal>
          <div class="relative w-full">
            <div class="media-frame h-[420px] md:h-[560px] ghost-border">
              <img
                :src="imgUrl(content.heritage.image, 900)"
                alt="Гар урлалын мастер ажиллаж байна"
                loading="lazy"
                decoding="async"
              />
            </div>
            <!-- tracking-tighter ran "ЖИЛИЙН ТУРШЛАГА" into one word -->
            <div class="absolute -bottom-6 right-0 md:-right-8 w-36 h-36 md:w-44 md:h-44 ghost-border p-4 bg-surface flex flex-col justify-center text-center">
              <span class="font-display-lg text-[40px] md:text-display-lg text-secondary leading-none mb-2">{{ content.heritage.experienceNumber }}</span>
              <span class="font-label-md text-[10px] uppercase tracking-widest leading-snug text-on-surface-variant">{{ content.heritage.experienceLabel }}</span>
            </div>
          </div>
        </div>

        <div class="w-full md:w-1/2 space-y-8 pt-12 md:pt-0" v-reveal="{ delay: 200 }">
          <span class="font-label-md text-label-md text-secondary tracking-widest uppercase">{{ content.heritage.label }}</span>
          <h2 class="font-display-lg text-display-lg text-on-surface italic">{{ content.heritage.title }}</h2>
          <p class="font-body-lg text-body-lg text-on-surface-variant">{{ content.heritage.description }}</p>
          <div class="flex flex-col gap-4">
            <div v-for="feat in content.heritage.features" :key="feat" class="flex items-center gap-6">
              <span class="material-symbols-outlined text-secondary">verified</span>
              <span class="font-body-md text-body-md text-on-surface">{{ feat }}</span>
            </div>
          </div>
        </div>
      </div>
      <div class="fine-line opacity-20"></div>
    </section>

    <!-- Categories -->
    <section class="py-16 md:py-section-gap px-6 md:px-margin-desktop max-w-container-max mx-auto text-center">
      <span class="font-label-md text-label-md text-secondary tracking-widest uppercase block mb-4" v-reveal>{{ content.categoriesLabel }}</span>
      <h2 class="font-headline-md text-headline-md text-on-surface mb-12 md:mb-16" v-reveal>{{ content.categoriesTitle }}</h2>
      <div class="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-gutter">
        <NuxtLink
          v-for="(cat, i) in categoryItems"
          :key="cat.id"
          :to="`/products?category=${cat.id}`"
          class="group"
          v-reveal="{ delay: i * 100 }"
        >
          <div class="media-frame w-full aspect-[4/5] mb-4 ghost-border">
            <img
              :src="imgUrl(cat.image, 500)"
              :alt="cat.name"
              loading="lazy"
              decoding="async"
            />
            <div class="absolute inset-0 z-10 bg-secondary/10 opacity-0 group-hover:opacity-100 transition-opacity"></div>
          </div>
          <span class="font-label-md text-label-md uppercase tracking-widest text-on-surface group-hover:text-secondary transition-colors">{{ cat.name }}</span>
        </NuxtLink>
      </div>
    </section>

    <ContactCTA />
  </div>
</template>

<script setup lang="ts">
const { products, featuredProducts } = useProducts()
const { categories } = useCategories()
const { settings } = useSiteSettings()
const { content } = useHomeContent()
const { abs, base } = useSiteUrl()

usePageSeo(() => ({
  title: 'Хаан Тунамал Хийц — Монгол үндэсний төмөр эдлэл, зуух',
  description: content.value.hero.description,
  image: content.value.hero.image,
}))

// Google surfaces the phone, locality and price range directly in results when
// a LocalBusiness block is present.
useJsonLd(() => ({
  '@context': 'https://schema.org',
  '@type': 'LocalBusiness',
  name: settings.value.companyName,
  description: settings.value.companyDescription,
  url: base,
  image: abs(content.value.hero.image),
  telephone: (settings.value.phones || []).map(p => `+976${p.number}`),
  address: {
    '@type': 'PostalAddress',
    addressLocality: settings.value.address,
    addressCountry: 'MN',
  },
  sameAs: settings.value.facebookUrl ? [settings.value.facebookUrl] : [],
  priceRange: '₮₮',
}))

// Live counts first, then whatever extra stats the admin configured.
const stats = computed(() => [
  { value: `${categories.value.length}`, label: 'Ангилал' },
  { value: `${products.value.length}`, label: 'Бүтээгдэхүүн' },
  ...(content.value.stats || []),
])

const fallbackImages = [
  '/images/design/design-1.webp',
  '/images/design/design-15.webp',
  '/images/design/design-2.webp',
  '/images/design/design-6.webp',
]
const fallbackLabels = ['Дээд зэрэглэл', 'Дагалдах хэрэгсэл', 'Өв уламжлал', 'Урлалын багаж']
const fallbackNames = ['Уламжлалт төмөр зуух', 'Хүжсийн тавиур', 'Модон авдар', 'Зуухны багаж']

const bentoItems = computed(() =>
  [0, 1, 2, 3].map((i) => {
    const p = featuredProducts.value[i]
    return {
      link: p ? `/products/${p.id}` : '/products',
      image: p?.images?.[0] || fallbackImages[i],
      name: p?.name || fallbackNames[i],
      label: p?.sizes || fallbackLabels[i],
      price: p ? `${p.price.toLocaleString('mn-MN')}₮` : '',
    }
  }),
)

const overflowFeatured = computed(() => featuredProducts.value.slice(4))

const categoryFallbackImages = [
  '/images/design/design-8.webp',
  '/images/design/design-3.webp',
  '/images/design/design-11.webp',
  '/images/design/design-13.webp',
]
const categoryFallbackNames = ['Төмөр эдлэл', 'Модон эдлэл', 'Дагалдах хэрэгсэл', 'Захиалгат бүтээл']

const categoryItems = computed(() => {
  if (categories.value.length) {
    return categories.value.slice(0, 4).map((cat, i) => ({
      ...cat,
      image: cat.image || categoryFallbackImages[i] || categoryFallbackImages[0],
    }))
  }
  return categoryFallbackNames.map((name, i) => ({
    id: `cat-${i}`,
    name,
    order: i,
    image: categoryFallbackImages[i],
  }))
})
</script>
