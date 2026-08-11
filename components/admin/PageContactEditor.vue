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
          <input v-model="form.hero.titleLine1" class="input w-full" />
        </div>
        <div>
          <label class="block text-sm text-gray-400 mb-1">Тодруулсан текст (алтан)</label>
          <input v-model="form.hero.titleHighlight" class="input w-full" />
        </div>
        <div>
          <label class="block text-sm text-gray-400 mb-1">Төгсгөлийн үг</label>
          <input v-model="form.hero.titleTail" class="input w-full" />
        </div>
        <div>
          <AdminSingleImageUpload v-model="form.hero.image" label="Дэвсгэр зураг" />
        </div>
      </div>
    </div>

    <!-- Cards -->
    <div class="card p-6">
      <h3 class="text-lg font-semibold text-gray-100 mb-4">Карт мэдээлэл</h3>
      <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label class="block text-sm text-gray-400 mb-1">Байршлын гарчиг</label>
          <input v-model="form.cards.locationTitle" class="input w-full" />
        </div>
        <div>
          <label class="block text-sm text-gray-400 mb-1">Утасны гарчиг</label>
          <input v-model="form.cards.phoneTitle" class="input w-full" />
        </div>
        <div>
          <label class="block text-sm text-gray-400 mb-1">Цахим шуудангийн гарчиг</label>
          <input v-model="form.cards.emailTitle" class="input w-full" />
        </div>
        <div>
          <label class="block text-sm text-gray-400 mb-1">Цахим шуудан хаяг</label>
          <input v-model="form.cards.email" class="input w-full" />
        </div>
        <div>
          <label class="block text-sm text-gray-400 mb-1">Ажлын цаг</label>
          <input v-model="form.cards.businessHours" class="input w-full" />
        </div>
        <div>
          <label class="block text-sm text-gray-400 mb-1">Instagram шошго</label>
          <input v-model="form.cards.instagramLabel" class="input w-full" />
        </div>
        <div>
          <label class="block text-sm text-gray-400 mb-1">Facebook шошго</label>
          <input v-model="form.cards.facebookLabel" class="input w-full" />
        </div>
      </div>
    </div>

    <!-- Map -->
    <div class="card p-6">
      <h3 class="text-lg font-semibold text-gray-100 mb-4">Газрын зураг</h3>
      <div class="space-y-4">
        <div>
          <label class="block text-sm text-gray-400 mb-1">Газрын зургийн хаяг (embed)</label>
          <input v-model="form.mapEmbedUrl" class="input w-full" placeholder="https://www.google.com/maps?q=47.930322,107.020728&z=16&hl=mn&output=embed" />
          <p class="text-xs text-gray-500 mt-1">
            Google Maps дээр байрлалаа олоод баруун товшиж координатаа хуулна. Дараа нь энд
            <code class="text-gray-400">https://www.google.com/maps?q=ӨРГӨРӨГ,УРТРАГ&amp;z=16&amp;hl=mn&amp;output=embed</code>
            гэж бичнэ. Төлбөргүй, түлхүүр шаардахгүй.
          </p>
        </div>
        <div>
          <label class="block text-sm text-gray-400 mb-1">Google Maps холбоос (Замын заавар товч)</label>
          <input v-model="form.mapLink" class="input w-full" placeholder="https://maps.app.goo.gl/..." />
          <p class="text-xs text-gray-500 mt-1">Google Maps дээрх "Хуваалцах" товчны богино холбоос.</p>
        </div>
        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label class="block text-sm text-gray-400 mb-1">Байршлын нэр</label>
            <input v-model="form.mapLabel" class="input w-full" />
          </div>
          <div>
            <label class="block text-sm text-gray-400 mb-1">Товчны бичиг</label>
            <input v-model="form.mapDirectionsLabel" class="input w-full" />
          </div>
        </div>
        <div>
          <AdminSingleImageUpload v-model="form.mapImage" label="Байршлын зураг (сонголт — үүд, байшингийн зураг)" />
        </div>
      </div>
    </div>

    <button @click="$emit('save', form)" :disabled="saving" class="bg-gold text-black px-6 py-2 rounded-lg font-medium hover:bg-gold/90 disabled:opacity-50">
      {{ saving ? 'Хадгалж байна...' : 'Хадгалах' }}
    </button>
  </div>
</template>

<script setup lang="ts">
import type { ContactContent } from '~/composables/usePageContentDefaults'

const props = defineProps<{
  modelValue: ContactContent
  saving: boolean
}>()

defineEmits<{
  save: [data: ContactContent]
}>()

const form = reactive(structuredClone(toRaw(props.modelValue)))

watch(() => props.modelValue, (val) => {
  Object.assign(form, structuredClone(toRaw(val)))
}, { deep: true })
</script>
