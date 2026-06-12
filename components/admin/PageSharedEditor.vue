<template>
  <div class="space-y-8">
    <!-- ContactCTA -->
    <div class="card p-6">
      <h3 class="text-lg font-semibold text-gray-100 mb-4">ContactCTA (бүх хуудас дахь CTA)</h3>
      <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label class="block text-sm text-gray-400 mb-1">Шошго</label>
          <input v-model="form.contactCTA.label" class="input w-full" />
        </div>
        <div>
          <label class="block text-sm text-gray-400 mb-1">Гарчиг</label>
          <input v-model="form.contactCTA.title" class="input w-full" />
        </div>
        <div class="md:col-span-2">
          <label class="block text-sm text-gray-400 mb-1">Тайлбар</label>
          <textarea v-model="form.contactCTA.description" rows="2" class="input w-full"></textarea>
        </div>
        <div>
          <label class="block text-sm text-gray-400 mb-1">Утасны дугаар</label>
          <input v-model="form.contactCTA.phone" class="input w-full" />
        </div>
        <div>
          <label class="block text-sm text-gray-400 mb-1">Утас (харагдах)</label>
          <input v-model="form.contactCTA.phoneDisplay" class="input w-full" />
        </div>
        <div>
          <label class="block text-sm text-gray-400 mb-1">Товч текст</label>
          <input v-model="form.contactCTA.buttonText" class="input w-full" />
        </div>
      </div>
    </div>

    <!-- Footer -->
    <div class="card p-6">
      <h3 class="text-lg font-semibold text-gray-100 mb-4">Footer</h3>
      <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label class="block text-sm text-gray-400 mb-1">Брэнд нэр</label>
          <input v-model="form.footer.brandName" class="input w-full" />
        </div>
        <div>
          <label class="block text-sm text-gray-400 mb-1">Зохиогчийн эрх текст</label>
          <input v-model="form.footer.copyright" class="input w-full" />
        </div>
      </div>
    </div>

    <button @click="$emit('save', form)" :disabled="saving" class="bg-gold text-black px-6 py-2 rounded-lg font-medium hover:bg-gold/90 disabled:opacity-50">
      {{ saving ? 'Хадгалж байна...' : 'Хадгалах' }}
    </button>
  </div>
</template>

<script setup lang="ts">
import type { SharedContent } from '~/composables/usePageContentDefaults'

const props = defineProps<{
  modelValue: SharedContent
  saving: boolean
}>()

defineEmits<{
  save: [data: SharedContent]
}>()

const form = reactive(structuredClone(toRaw(props.modelValue)))

watch(() => props.modelValue, (val) => {
  Object.assign(form, structuredClone(toRaw(val)))
}, { deep: true })
</script>
