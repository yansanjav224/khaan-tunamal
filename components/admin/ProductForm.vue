<template>
  <div class="card p-6 md:p-8">
    <h2 class="text-xl font-bold text-gray-100 mb-6">
      {{ editing ? 'Бараа засах' : 'Шинэ бараа нэмэх' }}
    </h2>

    <form @submit.prevent="handleSubmit" class="space-y-5">
      <div>
        <label class="block text-sm text-gray-400 mb-2">Нэр *</label>
        <input v-model="form.name" type="text" required class="input-dark w-full" placeholder="Төмөр зуух 10 таш" />
      </div>

      <div>
        <label class="block text-sm text-gray-400 mb-2">Тайлбар</label>
        <textarea v-model="form.description" rows="3" class="input-dark w-full" placeholder="Бүтээгдэхүүний тайлбар..."></textarea>
      </div>

      <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label class="block text-sm text-gray-400 mb-2">Үнэ (₮) *</label>
          <input v-model.number="form.price" type="number" required min="0" class="input-dark w-full" placeholder="850000" />
        </div>
        <div>
          <label class="block text-sm text-gray-400 mb-2">Ангилал *</label>
          <select v-model="form.category" required class="input-dark w-full">
            <option value="" disabled>Сонгох...</option>
            <option v-for="cat in categories" :key="cat.id" :value="cat.id">{{ cat.name }}</option>
          </select>
        </div>
      </div>

      <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label class="block text-sm text-gray-400 mb-2">Хэмжээ</label>
          <input v-model="form.sizes" type="text" class="input-dark w-full" placeholder="16см, 10см" />
        </div>
        <div>
          <label class="block text-sm text-gray-400 mb-2">Эрэмбэ</label>
          <input v-model.number="form.order" type="number" class="input-dark w-full" placeholder="1" />
        </div>
      </div>

      <div class="flex items-center gap-3">
        <input v-model="form.featured" type="checkbox" id="featured" class="w-4 h-4 accent-gold" />
        <label for="featured" class="text-sm text-gray-400">Онцлох бараа</label>
      </div>

      <AdminImageUploader v-model="form.images" />

      <div class="flex gap-3 pt-4">
        <button type="submit" :disabled="saving" class="btn-gold disabled:opacity-50">
          {{ saving ? 'Хадгалж байна...' : (editing ? 'Хадгалах' : 'Нэмэх') }}
        </button>
        <button type="button" @click="$emit('cancel')" class="btn-outline">
          Болих
        </button>
      </div>
    </form>
  </div>
</template>

<script setup lang="ts">
import type { Product, Category } from '~/composables/useMockData'

const props = defineProps<{
  product?: Product | null
  categories: Category[]
}>()

const emit = defineEmits<{
  submit: [data: Omit<Product, 'id'>]
  cancel: []
}>()

const editing = computed(() => !!props.product)
const saving = ref(false)

const form = reactive({
  name: props.product?.name || '',
  description: props.product?.description || '',
  price: props.product?.price || 0,
  category: props.product?.category || '',
  images: [...(props.product?.images || [])],
  featured: props.product?.featured || false,
  sizes: props.product?.sizes || '',
  order: props.product?.order || 1,
})

const handleSubmit = async () => {
  saving.value = true
  try {
    emit('submit', { ...form })
  } finally {
    saving.value = false
  }
}
</script>
