<template>
  <div class="space-y-8">
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
      </div>
    </div>

    <div class="card p-6">
      <h3 class="text-lg font-semibold text-gray-100 mb-4">Хоосон төлөв</h3>
      <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label class="block text-sm text-gray-400 mb-1">Хоосон текст</label>
          <input v-model="form.emptyStateText" class="input w-full" />
        </div>
        <div>
          <label class="block text-sm text-gray-400 mb-1">Товч текст</label>
          <input v-model="form.emptyStateButton" class="input w-full" />
        </div>
      </div>
    </div>

    <button @click="$emit('save', form)" :disabled="saving" class="bg-gold text-black px-6 py-2 rounded-lg font-medium hover:bg-gold/90 disabled:opacity-50">
      {{ saving ? 'Хадгалж байна...' : 'Хадгалах' }}
    </button>
  </div>
</template>

<script setup lang="ts">
import type { ProductsContent } from '~/composables/usePageContentDefaults'

const props = defineProps<{
  modelValue: ProductsContent
  saving: boolean
}>()

defineEmits<{
  save: [data: ProductsContent]
}>()

const form = reactive(structuredClone(toRaw(props.modelValue)))

watch(() => props.modelValue, (val) => {
  Object.assign(form, structuredClone(toRaw(val)))
}, { deep: true })
</script>
