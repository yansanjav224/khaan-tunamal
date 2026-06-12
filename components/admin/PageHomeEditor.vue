<template>
  <div class="space-y-8">
    <!-- Hero -->
    <div class="card p-6">
      <h3 class="text-lg font-semibold text-gray-100 mb-4">Hero хэсэг</h3>
      <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label class="block text-sm text-gray-400 mb-1">Шошго</label>
          <input v-model="form.hero.label" class="input w-full" />
        </div>
        <div>
          <label class="block text-sm text-gray-400 mb-1">Гарчиг (1-р мөр)</label>
          <input v-model="form.hero.title" class="input w-full" />
        </div>
        <div>
          <label class="block text-sm text-gray-400 mb-1">Гарчиг (2-р мөр)</label>
          <input v-model="form.hero.titleLine2" class="input w-full" />
        </div>
        <div>
          <label class="block text-sm text-gray-400 mb-1">"Бүтээгдэхүүн" товч</label>
          <input v-model="form.hero.buttonProducts" class="input w-full" />
        </div>
        <div class="md:col-span-2">
          <label class="block text-sm text-gray-400 mb-1">Тайлбар</label>
          <textarea v-model="form.hero.description" rows="3" class="input w-full"></textarea>
        </div>
        <div>
          <label class="block text-sm text-gray-400 mb-1">"Холбоо барих" товч</label>
          <input v-model="form.hero.buttonContact" class="input w-full" />
        </div>
        <div>
          <AdminSingleImageUpload v-model="form.hero.image" label="Hero зураг" />
        </div>
      </div>
    </div>

    <!-- Stats -->
    <div class="card p-6">
      <h3 class="text-lg font-semibold text-gray-100 mb-4">Статистик (3-р тоо = туршлага)</h3>
      <div v-for="(stat, i) in form.stats" :key="i" class="flex gap-4 mb-3">
        <input v-model="stat.value" class="input w-24" placeholder="10+" />
        <input v-model="stat.label" class="input flex-1" placeholder="Жилийн туршлага" />
        <button @click="form.stats.splice(i, 1)" class="text-red-400 hover:text-red-300 text-sm">Устгах</button>
      </div>
      <button @click="form.stats.push({ value: '', label: '' })" class="text-gold text-sm hover:underline">+ Нэмэх</button>
    </div>

    <!-- Heritage -->
    <div class="card p-6">
      <h3 class="text-lg font-semibold text-gray-100 mb-4">Өв уламжлалын хэсэг</h3>
      <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label class="block text-sm text-gray-400 mb-1">Шошго</label>
          <input v-model="form.heritage.label" class="input w-full" />
        </div>
        <div>
          <label class="block text-sm text-gray-400 mb-1">Гарчиг</label>
          <input v-model="form.heritage.title" class="input w-full" />
        </div>
        <div class="md:col-span-2">
          <label class="block text-sm text-gray-400 mb-1">Тайлбар</label>
          <textarea v-model="form.heritage.description" rows="4" class="input w-full"></textarea>
        </div>
        <div>
          <label class="block text-sm text-gray-400 mb-1">Туршлагын тоо</label>
          <input v-model="form.heritage.experienceNumber" class="input w-full" />
        </div>
        <div>
          <label class="block text-sm text-gray-400 mb-1">Туршлагын шошго</label>
          <input v-model="form.heritage.experienceLabel" class="input w-full" />
        </div>
        <div>
          <AdminSingleImageUpload v-model="form.heritage.image" label="Артизан зураг" />
        </div>
        <div>
          <label class="block text-sm text-gray-400 mb-1">Онцлог шинж чанарууд</label>
          <div v-for="(feat, i) in form.heritage.features" :key="i" class="flex gap-2 mb-2">
            <input v-model="form.heritage.features[i]" class="input flex-1" />
            <button @click="form.heritage.features.splice(i, 1)" class="text-red-400 text-sm">×</button>
          </div>
          <button @click="form.heritage.features.push('')" class="text-gold text-sm hover:underline">+ Нэмэх</button>
        </div>
      </div>
    </div>

    <!-- Section labels -->
    <div class="card p-6">
      <h3 class="text-lg font-semibold text-gray-100 mb-4">Хэсгийн шошгууд</h3>
      <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label class="block text-sm text-gray-400 mb-1">Онцлох — шошго</label>
          <input v-model="form.featuredLabel" class="input w-full" />
        </div>
        <div>
          <label class="block text-sm text-gray-400 mb-1">Онцлох — гарчиг</label>
          <input v-model="form.featuredTitle" class="input w-full" />
        </div>
        <div>
          <label class="block text-sm text-gray-400 mb-1">Ангилал — шошго</label>
          <input v-model="form.categoriesLabel" class="input w-full" />
        </div>
        <div>
          <label class="block text-sm text-gray-400 mb-1">Ангилал — гарчиг</label>
          <input v-model="form.categoriesTitle" class="input w-full" />
        </div>
      </div>
    </div>

    <button @click="$emit('save', form)" :disabled="saving" class="bg-gold text-black px-6 py-2 rounded-lg font-medium hover:bg-gold/90 disabled:opacity-50">
      {{ saving ? 'Хадгалж байна...' : 'Хадгалах' }}
    </button>
  </div>
</template>

<script setup lang="ts">
import type { HomeContent } from '~/composables/usePageContentDefaults'

const props = defineProps<{
  modelValue: HomeContent
  saving: boolean
}>()

defineEmits<{
  save: [data: HomeContent]
}>()

const form = reactive(structuredClone(toRaw(props.modelValue)))

watch(() => props.modelValue, (val) => {
  Object.assign(form, structuredClone(toRaw(val)))
}, { deep: true })
</script>
