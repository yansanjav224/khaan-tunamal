<template>
  <div>
    <h1 class="text-2xl font-bold text-gray-100 mb-8">Хуудасны контент</h1>

    <!-- Tabs -->
    <div class="flex gap-2 mb-8 border-b border-dark-border overflow-x-auto">
      <button
        v-for="tab in tabs"
        :key="tab.key"
        @click="activeTab = tab.key"
        class="px-4 py-2 text-sm font-medium whitespace-nowrap transition-colors border-b-2 -mb-px"
        :class="activeTab === tab.key
          ? 'border-gold text-gold'
          : 'border-transparent text-gray-400 hover:text-gray-200'"
      >
        {{ tab.label }}
      </button>
    </div>

    <!-- Loading -->
    <div v-if="initialLoading" class="text-gray-400 py-12 text-center">Ачаалж байна...</div>

    <!-- Editors -->
    <template v-else>
      <PageHomeEditor
        v-if="activeTab === 'home'"
        :model-value="homeContent"
        :saving="saving"
        @save="saveHome"
      />
      <PageAboutEditor
        v-if="activeTab === 'about'"
        :model-value="aboutContent"
        :saving="saving"
        @save="saveAbout"
      />
      <PageContactEditor
        v-if="activeTab === 'contact'"
        :model-value="contactContent"
        :saving="saving"
        @save="saveContact"
      />
      <PageProductsEditor
        v-if="activeTab === 'products'"
        :model-value="productsContent"
        :saving="saving"
        @save="saveProducts"
      />
      <PageSharedEditor
        v-if="activeTab === 'shared'"
        :model-value="sharedContent"
        :saving="saving"
        @save="saveShared"
      />
    </template>

    <!-- Status -->
    <p v-if="statusMsg" class="mt-4 text-sm" :class="statusError ? 'text-red-400' : 'text-green-400'">{{ statusMsg }}</p>
  </div>
</template>

<script setup lang="ts">
import type { HomeContent, AboutContent, ContactContent, ProductsContent, SharedContent } from '~/composables/usePageContentDefaults'

definePageMeta({ layout: 'admin', middleware: 'auth' })

const tabs = [
  { key: 'home', label: 'Нүүр' },
  { key: 'about', label: 'Тухай' },
  { key: 'contact', label: 'Холбоо барих' },
  { key: 'products', label: 'Бүтээгдэхүүн' },
  { key: 'shared', label: 'Дундын' },
]

const activeTab = ref('home')
const saving = ref(false)
const statusMsg = ref('')
const statusError = ref(false)
const initialLoading = ref(true)

const { content: homeContent, load: loadHome, save: saveHomeRaw } = useHomeContent()
const { content: aboutContent, load: loadAbout, save: saveAboutRaw } = useAboutContent()
const { content: contactContent, load: loadContact, save: saveContactRaw } = useContactContent()
const { content: productsContent, load: loadProducts, save: saveProductsRaw } = useProductsContent()
const { content: sharedContent, load: loadShared, save: saveSharedRaw } = useSharedContent()

onMounted(async () => {
  await Promise.all([loadHome(), loadAbout(), loadContact(), loadProducts(), loadShared()])
  initialLoading.value = false
})

const showStatus = (msg: string, isError = false) => {
  statusMsg.value = msg
  statusError.value = isError
  setTimeout(() => { statusMsg.value = '' }, 3000)
}

const wrapSave = (fn: (data: any) => Promise<void>) => async (data: any) => {
  saving.value = true
  try {
    await fn(data)
    showStatus('Амжилттай хадгалсан!')
  } catch (e: any) {
    showStatus(e.message || 'Алдаа гарлаа', true)
  } finally {
    saving.value = false
  }
}

const saveHome = wrapSave((data: HomeContent) => saveHomeRaw(data))
const saveAbout = wrapSave((data: AboutContent) => saveAboutRaw(data))
const saveContact = wrapSave((data: ContactContent) => saveContactRaw(data))
const saveProducts = wrapSave((data: ProductsContent) => saveProductsRaw(data))
const saveShared = wrapSave((data: SharedContent) => saveSharedRaw(data))
</script>
