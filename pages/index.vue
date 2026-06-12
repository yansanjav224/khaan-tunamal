<template>
  <div>
    <!-- Hero -->
    <HeroSection />

    <!-- Stats Section -->
    <section class="py-24 px-6 md:px-margin-desktop max-w-container-max mx-auto" v-reveal>
      <div class="grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-32 text-center">
        <div class="flex flex-col items-center">
          <span class="font-display-lg text-display-lg text-secondary mb-2">{{ categories.length || 6 }}+</span>
          <span class="font-label-md text-label-md uppercase tracking-widest text-on-surface-variant">Ангилал</span>
        </div>
        <div class="flex flex-col items-center">
          <span class="font-display-lg text-display-lg text-secondary mb-2">{{ products.length || 50 }}+</span>
          <span class="font-label-md text-label-md uppercase tracking-widest text-on-surface-variant">Бүтээгдэхүүн</span>
        </div>
        <div v-for="stat in content.stats" :key="stat.label" class="flex flex-col items-center">
          <span class="font-display-lg text-display-lg text-secondary mb-2">{{ stat.value }}</span>
          <span class="font-label-md text-label-md uppercase tracking-widest text-on-surface-variant">{{ stat.label }}</span>
        </div>
      </div>
    </section>

    <!-- Featured Products - Bento Style -->
    <section class="py-section-gap px-6 md:px-margin-desktop max-w-container-max mx-auto">
      <div class="flex justify-between items-end mb-16" v-reveal>
        <div>
          <span class="font-label-md text-label-md text-secondary tracking-widest uppercase block mb-4">{{ content.featuredLabel }}</span>
          <h2 class="font-headline-md text-headline-md text-on-surface">{{ content.featuredTitle }}</h2>
        </div>
        <NuxtLink
          to="/products"
          class="font-label-md text-label-md uppercase tracking-widest text-on-surface-variant hover:text-secondary flex items-center gap-2 group transition-all"
        >
          Бүх бүтээгдэхүүн үзэх
          <span class="material-symbols-outlined text-[16px]">open_in_new</span>
        </NuxtLink>
      </div>

      <!-- Bento Grid -->
      <div class="grid grid-cols-1 md:grid-cols-12 md:grid-rows-2 gap-6 h-auto md:h-[1000px]" v-reveal>
        <!-- Main large product (8-col) -->
        <NuxtLink
          :to="bentoItems[0].link"
          class="md:col-span-8 md:row-span-1 relative group overflow-hidden gallery-hover"
        >
          <img :src="bentoItems[0].image" :alt="bentoItems[0].name" class="w-full h-full object-cover" />
          <div class="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-12">
            <div class="transform translate-y-8 group-hover:translate-y-0 transition-transform">
              <span class="font-label-md text-label-md text-secondary uppercase">{{ bentoItems[0].label }}</span>
              <h3 class="font-headline-sm text-headline-sm text-on-surface">{{ bentoItems[0].name }}</h3>
            </div>
          </div>
        </NuxtLink>

        <!-- Tall side product (4-col, 2 rows) -->
        <NuxtLink
          :to="bentoItems[1].link"
          class="md:col-span-4 md:row-span-2 relative group overflow-hidden gallery-hover bg-surface-container-low p-1 ghost-border"
        >
          <img :src="bentoItems[1].image" :alt="bentoItems[1].name" class="w-full h-full object-cover" />
          <div class="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col justify-center items-center text-center p-8">
            <span class="font-label-md text-label-md text-secondary uppercase">{{ bentoItems[1].label }}</span>
            <h3 class="font-headline-sm text-headline-sm text-on-surface">{{ bentoItems[1].name }}</h3>
          </div>
        </NuxtLink>

        <!-- Bottom left (4-col) -->
        <NuxtLink
          :to="bentoItems[2].link"
          class="md:col-span-4 md:row-span-1 relative group overflow-hidden gallery-hover"
        >
          <img :src="bentoItems[2].image" :alt="bentoItems[2].name" class="w-full h-full object-cover" />
          <div class="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-8">
            <div>
              <span class="font-label-md text-label-md text-secondary uppercase">{{ bentoItems[2].label }}</span>
              <h3 class="font-headline-sm text-headline-sm text-on-surface">{{ bentoItems[2].name }}</h3>
            </div>
          </div>
        </NuxtLink>

        <!-- Bottom right (4-col) -->
        <NuxtLink
          :to="bentoItems[3].link"
          class="md:col-span-4 md:row-span-1 relative group overflow-hidden gallery-hover"
        >
          <img :src="bentoItems[3].image" :alt="bentoItems[3].name" class="w-full h-full object-cover" />
          <div class="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-8">
            <div>
              <span class="font-label-md text-label-md text-secondary uppercase">{{ bentoItems[3].label }}</span>
              <h3 class="font-headline-sm text-headline-sm text-on-surface">{{ bentoItems[3].name }}</h3>
            </div>
          </div>
        </NuxtLink>
      </div>
    </section>

    <!-- Heritage Story Section -->
    <section class="py-section-gap relative">
      <div class="fine-line opacity-20"></div>
      <div class="max-w-container-max mx-auto px-6 md:px-margin-desktop py-24 flex flex-col md:flex-row gap-20 items-center">
        <!-- Artisan Image -->
        <div class="w-full md:w-1/2" v-reveal>
          <div class="relative inline-block">
            <img
              :src="content.heritage.image"
              alt="Artisan at work"
              class="w-full h-[600px] object-cover rounded-sm grayscale hover:grayscale-0 transition-all duration-1000"
            />
            <div class="absolute -bottom-8 -right-8 w-48 h-48 ghost-border p-4 bg-surface flex flex-col justify-center text-center">
              <span class="font-display-lg text-display-lg text-secondary">{{ content.heritage.experienceNumber }}</span>
              <span class="font-label-md text-label-md uppercase tracking-tighter">{{ content.heritage.experienceLabel }}</span>
            </div>
          </div>
        </div>

        <!-- Story Text -->
        <div class="w-full md:w-1/2 space-y-8" v-reveal="{ delay: 200 }">
          <span class="font-label-md text-label-md text-secondary tracking-widest uppercase">{{ content.heritage.label }}</span>
          <h2 class="font-display-lg text-display-lg text-on-surface italic">{{ content.heritage.title }}</h2>
          <p class="font-body-lg text-body-lg text-on-surface-variant">
            {{ content.heritage.description }}
          </p>
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

    <!-- Categories Section -->
    <section class="py-section-gap px-6 md:px-margin-desktop max-w-container-max mx-auto text-center">
      <span class="font-label-md text-label-md text-secondary tracking-widest uppercase block mb-6" v-reveal>{{ content.categoriesLabel }}</span>
      <h2 class="font-headline-md text-headline-md text-on-surface mb-20" v-reveal>{{ content.categoriesTitle }}</h2>
      <div class="grid grid-cols-2 md:grid-cols-4 gap-gutter">
        <NuxtLink
          v-for="(cat, i) in categoryItems"
          :key="cat.id"
          :to="`/products?category=${cat.id}`"
          class="group"
          v-reveal="{ delay: i * 100 }"
        >
          <div class="w-full aspect-[4/5] bg-surface-container-high overflow-hidden mb-6 ghost-border relative">
            <img
              :src="cat.image"
              :alt="cat.name"
              class="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700"
            />
            <div class="absolute inset-0 bg-secondary/10 opacity-0 group-hover:opacity-100 transition-opacity"></div>
          </div>
          <span class="font-label-md text-label-md uppercase tracking-widest text-on-surface group-hover:text-secondary transition-colors">{{ cat.name }}</span>
        </NuxtLink>
      </div>
    </section>

    <!-- Contact CTA -->
    <ContactCTA />
  </div>
</template>

<script setup lang="ts">
const { products, loading, getProducts } = useProducts()
const { categories, getCategories } = useCategories()
const { content, load } = useHomeContent()

onMounted(async () => {
  await Promise.all([getProducts(), getCategories(), load()])
})

// Fallback images from design
const fallbackImages = [
  'https://lh3.googleusercontent.com/aida-public/AB6AXuAeX_hHBfNhRd6czvapKAS6r3Ar4VRSsynT-xFUslPFC08Hqb0kNC2x_pqllwsbDBIl-4LI5K0bTAASVDXpaQQaKlFP82MqzsVpwLeAYF6LcLoYGNSfJ_y5hrcbNf_opRo5b4HQgVTBvGeRpB6DpGCr-0BYXzVL0mipzmBvZ57VaT1GE6SLfvQ2CZCXnvhE7Iug52xUk7hnxbnVKYbyLU7YdvUGyTjw4BEsZCdYhc9bvesEFavI6j3dKo_0tkZEAZPYHEMP5Dj1BsZ9',
  'https://lh3.googleusercontent.com/aida-public/AB6AXuDkqXAtyj9sEgDqMMjtsfYuu0X6oxbV4UlqXdpgBozKWETJvvdf55tYktKesCPXqOcpDjlrzroWoVgQ_MaWwMkJcXDuuzd9m0rVTqFe8PDkwa2N0OSD5BYcrVgH9Dos4NhC7HGyGF8PNuS9pUqV2TVVI7KlOPcE6PUdG7HEGCDCvs2XaeuxYoxGEY_fK_zFe89p0b7crnmIwS87pErptl4E6teDssKqfYV0vf6DGJy_ycziEDxJxQJqTLeGYVAveSO2TYE7qBRwK0Mn',
  'https://lh3.googleusercontent.com/aida-public/AB6AXuAslTjtpF-6vhpejqHolHVfeR3Am4BIQ-9wQk0rNR05_7a9Ec7cLP9cPd_9rC1QWN_pegJfI7CYNtSDgMcsufZcjTHd8Z3_3TS_pwJYVlIkjmTE0PoOyYJsymceBPpdD64DduNbmmK0RPnxCaS0gDk5DuZLqYBHF6oyWD4sTu1kKdcbjx06c4v7dGzt-ndKWye-eY7bIAYITilXCsbbSrErcW7bqCK-gGCfYKqzkJ9sVS-LaeFeB95_MUgquoKFSK9s0ZYRYwWDF6po',
  'https://lh3.googleusercontent.com/aida-public/AB6AXuC_TwJ2us7U645IsOaurU1JzaEfGYmRDg4aSac3nnO0c6usB_HbH8ekMFpApgHTX_qAu8ClZ8pFMvpc9t_tkriU0LXhLFGk6ymOBEEWMpspRMfJ_DkA3jlHXdVRi25FaOheD3Qrgh1cntrHa_86cuHclmsxGgx_qDKldHrOGfonDvv5F_jdSmZEQNNym3Oy4RyRo_xgIgSCUFN1XegLQ_dx6COlTdvPdQLQao2XevVwoNy9LHc7ihxbQueSk4OJaFHEyi6stUZf4qr8',
]

const fallbackLabels = ['Дээд зэрэглэл', 'Дагалдах хэрэгсэл', 'Өв уламжлал', 'Урлалын багаж']
const fallbackNames = ['Уламжлалт төмөр зуух', 'Хүжсийн тавиур', 'Модон авдар', 'Зуухны багаж']

const bentoItems = computed(() => {
  const featured = products.value.filter(p => p.featured).sort((a, b) => (a.order || 0) - (b.order || 0))
  return [0, 1, 2, 3].map(i => {
    const p = featured[i]
    return {
      link: p ? `/products/${p.id}` : '/products',
      image: p?.images?.[0] || fallbackImages[i],
      name: p?.name || fallbackNames[i],
      label: p?.sizes || fallbackLabels[i],
    }
  })
})

const categoryFallbackImages = [
  'https://lh3.googleusercontent.com/aida-public/AB6AXuCmDwg5nfpLi6rlMohU8c-So-iGwLhuKOgsWqs5PUp6Cdmg4Hqydrrd6BrXLCUeieIb0KbrhGjdfnhykQ8PnqaKB26rF8AjmansTHrrKE2ramy258ARKXvUuta_q1wrvxOI9LQbSZUdG5OIu7cAuy7Syomk-wEVo5x-rWX_JY_NPoiqa69eJzm5-AePUKTZywShemuC08LvMr2U5-ltC1Sa-3XgGYviAymxwWZfBAQKf852duXJ3OXR3RVXLbHUyc3ZbtKOLuQoFEwJ',
  'https://lh3.googleusercontent.com/aida-public/AB6AXuBfhCldYHAefjN0vKC8gmQw9ZvWFdcmRwalxCL9IDOQho6k81ND21Fn8pU6cvx4OgpzzFrGv72mga0pHtKrN9xjaZ70WRMkCv4W6kp2k6Y4hRHqh80bloxLBMn61KaX3jWwlgVqeynZP814C459Ofu9AQ_jk_Nw0XKgHZkPDRBryzk23yQ888qtuCnMMjzZowfM87_xFog2hX2zNtsuFjAQzrmJHOhkf60RR717upZ86H9vxP1JyTNajamZNCLYsRoZJnTkH6_l7xwe',
  'https://lh3.googleusercontent.com/aida-public/AB6AXuCVpVbuDYlQm7qNViqJcwJkrDsobesrA8F9sOUGS3sggHzWcxQDg_h6jSrK8j6DA_N8cUpqxxsCaOFDXBn1Aj09x6slkfc1PcDpTU_FR-7Vne_c9e0qdZjWMklMqXn14zsEnsDaFSHYQck4AHUT776nPUqICvz_AkeUsLwM0YfZQ48hbG1fOmZgdlr47HRDToZQTcxMxk9VXNSpn06aRkxPnJyAPJAoe7JSIZ9TFFMr-4D16K2yFiqWWUaqGQknTvzq0irlQkn-w1sA',
  'https://lh3.googleusercontent.com/aida-public/AB6AXuDjcDEjSQAhzYmq-CY_WZchXc58VzwUlmPTt7UpH4zTD6MqG0w_3mak5x3Yx2rqJIXbT1CPY0wwBSX8j34TpfEq7s15CB-OlRpYV8-a2V0NtFVaJ6m4caQ3kKTK-2Q6J61JXSmIh7Ba-0lIduvEwyVB8l1eoeP8W21VVcD2jCycgvTMXh1mqUMjB88bmDPX8tNY_uA0MFzpZxhwvrhr1c4LxvPOFpGtwiTr3MnQxpYjEW4dII4KnQXDsWMbVcqY__lInWfVlKusRYbl',
]
const categoryFallbackNames = ['Төмөр эдлэл', 'Модон эдлэл', 'Дагалдах хэрэгсэл', 'Захиалгат бүтээл']

const categoryItems = computed(() => {
  if (categories.value.length) {
    return categories.value.slice(0, 4).map((cat, i) => ({
      ...cat,
      image: categoryFallbackImages[i] || categoryFallbackImages[0],
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
