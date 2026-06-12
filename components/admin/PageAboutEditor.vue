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
          <label class="block text-sm text-gray-400 mb-1">Гарчиг</label>
          <input v-model="form.hero.title" class="input w-full" />
        </div>
        <div class="md:col-span-2">
          <label class="block text-sm text-gray-400 mb-1">Тайлбар</label>
          <textarea v-model="form.hero.description" rows="3" class="input w-full"></textarea>
        </div>
        <div>
          <AdminSingleImageUpload v-model="form.hero.image" label="Hero зураг" />
        </div>
      </div>
    </div>

    <!-- Story -->
    <div class="card p-6">
      <h3 class="text-lg font-semibold text-gray-100 mb-4">Бидний түүх</h3>
      <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label class="block text-sm text-gray-400 mb-1">Хэсгийн гарчиг</label>
          <input v-model="form.story.title" class="input w-full" />
        </div>
        <div>
          <label class="block text-sm text-gray-400 mb-1">Ишлэл</label>
          <input v-model="form.story.quote" class="input w-full" />
        </div>
        <div class="md:col-span-2">
          <label class="block text-sm text-gray-400 mb-1">1-р параграф</label>
          <textarea v-model="form.story.text1" rows="3" class="input w-full"></textarea>
        </div>
        <div class="md:col-span-2">
          <label class="block text-sm text-gray-400 mb-1">2-р параграф</label>
          <textarea v-model="form.story.text2" rows="3" class="input w-full"></textarea>
        </div>
        <div>
          <AdminSingleImageUpload v-model="form.story.image" label="Түүхийн зураг" />
        </div>
        <div>
          <label class="block text-sm text-gray-400 mb-2">Статистик</label>
          <div v-for="(stat, i) in form.story.stats" :key="i" class="flex gap-2 mb-2">
            <input v-model="stat.value" class="input w-20" placeholder="10+" />
            <input v-model="stat.label" class="input flex-1" placeholder="Жилийн туршлага" />
            <button @click="form.story.stats.splice(i, 1)" class="text-red-400 text-sm">×</button>
          </div>
          <button @click="form.story.stats.push({ value: '', label: '' })" class="text-gold text-sm hover:underline">+ Нэмэх</button>
        </div>
      </div>
    </div>

    <!-- Crafts -->
    <div class="card p-6">
      <h3 class="text-lg font-semibold text-gray-100 mb-4">Гар урлалын уламжлал</h3>
      <div class="mb-4">
        <label class="block text-sm text-gray-400 mb-1">Хэсгийн гарчиг</label>
        <input v-model="form.craftSectionTitle" class="input w-full" />
      </div>
      <div v-for="(craft, i) in form.crafts" :key="i" class="border border-dark-border rounded-lg p-4 mb-4">
        <div class="flex justify-between items-center mb-3">
          <span class="text-gray-300 font-medium">Багана {{ i + 1 }}</span>
          <button @click="form.crafts.splice(i, 1)" class="text-red-400 text-sm hover:text-red-300">Устгах</button>
        </div>
        <div class="grid grid-cols-1 md:grid-cols-2 gap-3">
          <div>
            <label class="block text-sm text-gray-400 mb-1">Гарчиг</label>
            <input v-model="craft.title" class="input w-full" />
          </div>
          <div>
            <AdminSingleImageUpload v-model="craft.image" label="Зураг" />
          </div>
          <div class="md:col-span-2">
            <label class="block text-sm text-gray-400 mb-1">Тайлбар</label>
            <textarea v-model="craft.description" rows="2" class="input w-full"></textarea>
          </div>
        </div>
      </div>
      <button @click="form.crafts.push({ title: '', description: '', image: '' })" class="text-gold text-sm hover:underline">+ Багана нэмэх</button>
    </div>

    <!-- Core Values -->
    <div class="card p-6">
      <h3 class="text-lg font-semibold text-gray-100 mb-4">Үнэт зүйлс</h3>
      <div class="mb-4">
        <label class="block text-sm text-gray-400 mb-1">Хэсгийн гарчиг</label>
        <input v-model="form.valuesSectionTitle" class="input w-full" />
      </div>
      <div v-for="(val, i) in form.values" :key="i" class="flex gap-3 mb-3">
        <input v-model="val.title" class="input w-40" placeholder="Гарчиг" />
        <input v-model="val.description" class="input flex-1" placeholder="Тайлбар" />
        <button @click="form.values.splice(i, 1)" class="text-red-400 text-sm">×</button>
      </div>
      <button @click="form.values.push({ title: '', description: '' })" class="text-gold text-sm hover:underline">+ Нэмэх</button>
      <div class="mt-4">
        <AdminSingleImageUpload v-model="form.valuesImage" label="Үнэт зүйлсийн зураг" />
      </div>
    </div>

    <!-- CTA -->
    <div class="card p-6">
      <h3 class="text-lg font-semibold text-gray-100 mb-4">CTA хэсэг</h3>
      <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label class="block text-sm text-gray-400 mb-1">Гарчиг</label>
          <input v-model="form.cta.title" class="input w-full" />
        </div>
        <div>
          <label class="block text-sm text-gray-400 mb-1">Товч текст</label>
          <input v-model="form.cta.buttonText" class="input w-full" />
        </div>
        <div class="md:col-span-2">
          <label class="block text-sm text-gray-400 mb-1">Тайлбар</label>
          <textarea v-model="form.cta.description" rows="2" class="input w-full"></textarea>
        </div>
        <div>
          <label class="block text-sm text-gray-400 mb-1">Утасны дугаар</label>
          <input v-model="form.cta.phone" class="input w-full" />
        </div>
        <div>
          <label class="block text-sm text-gray-400 mb-1">Утас (харагдах)</label>
          <input v-model="form.cta.phoneDisplay" class="input w-full" />
        </div>
      </div>
    </div>

    <button @click="$emit('save', form)" :disabled="saving" class="bg-gold text-black px-6 py-2 rounded-lg font-medium hover:bg-gold/90 disabled:opacity-50">
      {{ saving ? 'Хадгалж байна...' : 'Хадгалах' }}
    </button>
  </div>
</template>

<script setup lang="ts">
import type { AboutContent } from '~/composables/usePageContentDefaults'

const props = defineProps<{
  modelValue: AboutContent
  saving: boolean
}>()

defineEmits<{
  save: [data: AboutContent]
}>()

const form = reactive(structuredClone(toRaw(props.modelValue)))

watch(() => props.modelValue, (val) => {
  Object.assign(form, structuredClone(toRaw(val)))
}, { deep: true })
</script>
