<template>
  <div>
    <h1 class="text-2xl font-bold text-gray-100 mb-8">Хянах самбар</h1>

    <!-- Seed data button -->
    <div v-if="products.length === 0 || categories.length === 0" class="card p-6 mb-8 border border-gold/30">
      <h2 class="text-lg font-semibold text-gray-100 mb-2">Анхны өгөгдөл оруулах</h2>
      <p class="text-gray-400 text-sm mb-4">5 ангилал, 18 бараа (бодит зурагтай), сайтын тохиргоог Firestore-д оруулна.</p>
      <button
        class="bg-gold text-black px-6 py-2 rounded-lg font-medium hover:bg-gold/90 disabled:opacity-50"
        :disabled="seeding"
        @click="seedAllData"
      >
        {{ seeding ? `Оруулж байна... (${seedProgress})` : 'Өгөгдөл оруулах' }}
      </button>
      <p v-if="seedDone" class="text-green-400 text-sm mt-3">Амжилттай оруулсан! Хуудсыг дахин ачаалж байна...</p>
      <p v-if="seedError" class="text-red-400 text-sm mt-3">{{ seedError }}</p>
    </div>

    <!-- Stats -->
    <div class="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-8">
      <div class="card p-6">
        <div class="text-gray-400 text-sm mb-1">Нийт бараа</div>
        <div class="text-3xl font-bold text-gold">{{ products.length }}</div>
      </div>
      <div class="card p-6">
        <div class="text-gray-400 text-sm mb-1">Ангилал</div>
        <div class="text-3xl font-bold text-gold">{{ categories.length }}</div>
      </div>
      <div class="card p-6">
        <div class="text-gray-400 text-sm mb-1">Онцлох бараа</div>
        <div class="text-3xl font-bold text-gold">{{ featuredCount }}</div>
      </div>
    </div>

    <!-- Quick links -->
    <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      <NuxtLink to="/admin/products" class="card card-hover p-6 flex items-center gap-4">
        <div class="w-12 h-12 rounded-full bg-gold/10 flex items-center justify-center flex-shrink-0">
          <svg class="w-6 h-6 text-gold" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
          </svg>
        </div>
        <div>
          <div class="font-semibold text-gray-100">Бараа удирдах</div>
          <div class="text-gray-500 text-sm">Бараа нэмэх, засах, устгах</div>
        </div>
      </NuxtLink>

      <NuxtLink to="/admin/categories" class="card card-hover p-6 flex items-center gap-4">
        <div class="w-12 h-12 rounded-full bg-gold/10 flex items-center justify-center flex-shrink-0">
          <svg class="w-6 h-6 text-gold" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" />
          </svg>
        </div>
        <div>
          <div class="font-semibold text-gray-100">Ангилал удирдах</div>
          <div class="text-gray-500 text-sm">Ангилал нэмэх, засах, устгах</div>
        </div>
      </NuxtLink>

      <NuxtLink to="/admin/pages" class="card card-hover p-6 flex items-center gap-4">
        <div class="w-12 h-12 rounded-full bg-gold/10 flex items-center justify-center flex-shrink-0">
          <svg class="w-6 h-6 text-gold" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z" />
          </svg>
        </div>
        <div>
          <div class="font-semibold text-gray-100">Хуудас удирдах</div>
          <div class="text-gray-500 text-sm">Хуудасны контент засах</div>
        </div>
      </NuxtLink>

      <NuxtLink to="/admin/settings" class="card card-hover p-6 flex items-center gap-4">
        <div class="w-12 h-12 rounded-full bg-gold/10 flex items-center justify-center flex-shrink-0">
          <svg class="w-6 h-6 text-gold" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.066 2.573c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.573 1.066c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.066-2.573c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
          </svg>
        </div>
        <div>
          <div class="font-semibold text-gray-100">Тохиргоо</div>
          <div class="text-gray-500 text-sm">Сайтын мэдээлэл засах</div>
        </div>
      </NuxtLink>
    </div>
  </div>
</template>

<script setup lang="ts">
import { collection, doc, setDoc } from 'firebase/firestore'
import { seedCategories, seedProducts, seedSiteSettings, seedPageContent } from '~/composables/useSeedData'

definePageMeta({ layout: 'admin', middleware: 'auth' })

const { db } = useFirebase()
const { products, getProducts } = useProducts()
const { categories, getCategories } = useCategories()

onMounted(async () => {
  await Promise.all([getProducts(), getCategories()])
})

const featuredCount = computed(() => products.value.filter(p => p.featured).length)

// Seed functionality
const seeding = ref(false)
const seedDone = ref(false)
const seedError = ref('')
const seedProgress = ref('')

const seedAllData = async () => {
  if (!db) { seedError.value = 'Firebase тохируулаагүй'; return }
  seeding.value = true
  seedError.value = ''
  try {
    // 1. Categories
    seedProgress.value = 'Ангилал (1/3)...'
    for (const cat of seedCategories) {
      const { id, ...data } = cat
      await setDoc(doc(db, 'categories', id), data)
    }
    // 2. Products
    seedProgress.value = 'Бараа (2/3)...'
    for (let i = 0; i < seedProducts.length; i++) {
      seedProgress.value = `Бараа ${i + 1}/${seedProducts.length}...`
      await setDoc(doc(collection(db, 'products')), seedProducts[i])
    }
    // 3. Settings
    seedProgress.value = 'Тохиргоо (3/4)...'
    await setDoc(doc(db, 'settings', 'site'), seedSiteSettings)
    // 4. Page content
    seedProgress.value = 'Хуудасны контент (4/4)...'
    for (const [key, data] of Object.entries(seedPageContent)) {
      await setDoc(doc(db, 'pageContent', key), data)
    }

    seedDone.value = true
    setTimeout(() => navigateTo('/admin', { replace: true }), 1500)
  } catch (e: any) {
    seedError.value = e.message || 'Алдаа гарлаа'
  } finally {
    seeding.value = false
  }
}
</script>
