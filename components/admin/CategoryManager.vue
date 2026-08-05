<template>
  <div class="space-y-6">
    <!-- Add form -->
    <div class="card p-6">
      <h3 class="text-lg font-semibold text-gray-100 mb-4">
        {{ editingCategory ? 'Ангилал засах' : 'Шинэ ангилал нэмэх' }}
      </h3>
      <form @submit.prevent="handleSubmit" class="space-y-4">
        <div class="flex flex-col sm:flex-row gap-3">
          <input
            v-model="form.name"
            type="text"
            required
            class="input-dark flex-1"
            placeholder="Ангилалын нэр"
          />
          <input
            v-model.number="form.order"
            type="number"
            class="input-dark w-24"
            placeholder="Эрэмбэ"
          />
        </div>

        <!-- The home page renders a picture per category; without this field it
             always fell back to a stock design image. -->
        <AdminSingleImageUpload v-model="form.image" label="Ангиллын зураг (нүүр хуудсанд харагдана)" />

        <div class="flex gap-2">
          <button type="submit" class="btn-gold whitespace-nowrap">
            {{ editingCategory ? 'Хадгалах' : 'Нэмэх' }}
          </button>
          <button
            v-if="editingCategory"
            type="button"
            @click="cancelEdit"
            class="btn-outline"
          >
            Болих
          </button>
        </div>
      </form>
    </div>

    <!-- Category list -->
    <div class="card overflow-hidden">
      <div class="divide-y divide-dark-border">
        <div
          v-for="cat in categories"
          :key="cat.id"
          class="flex items-center justify-between px-4 py-3 hover:bg-dark-bg/50"
        >
          <div class="flex items-center gap-3 min-w-0">
            <span class="text-gray-500 text-sm w-8 flex-shrink-0">{{ cat.order }}</span>
            <div class="w-10 h-10 flex-shrink-0 bg-dark-bg overflow-hidden">
              <img v-if="cat.image" :src="imgUrl(cat.image, IMG.thumb)" :alt="cat.name" class="w-full h-full object-cover" loading="lazy" />
            </div>
            <span class="text-gray-200 font-medium truncate">{{ cat.name }}</span>
            <span class="text-gray-500 text-xs flex-shrink-0">({{ cat.id }})</span>
          </div>
          <div class="flex gap-2">
            <button @click="startEdit(cat)" class="text-sm text-gray-400 hover:text-gold transition-colors">
              Засах
            </button>
            <button @click="$emit('delete', cat)" class="text-sm text-gray-400 hover:text-red-400 transition-colors">
              Устгах
            </button>
          </div>
        </div>
      </div>
      <div v-if="!categories.length" class="p-8 text-center text-gray-500">
        Ангилал байхгүй байна
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { Category } from '~/composables/useMockData'

const props = defineProps<{
  categories: Category[]
}>()

type CategoryInput = { name: string; order: number; image: string }

const emit = defineEmits<{
  create: [data: CategoryInput]
  update: [id: string, data: CategoryInput]
  delete: [category: Category]
}>()

const editingCategory = ref<Category | null>(null)
const form = reactive<CategoryInput>({
  name: '',
  order: 1,
  image: '',
})

const startEdit = (cat: Category) => {
  editingCategory.value = cat
  form.name = cat.name
  form.order = cat.order
  form.image = cat.image || ''
}

const cancelEdit = () => {
  editingCategory.value = null
  form.name = ''
  form.order = 1
  form.image = ''
}

const handleSubmit = () => {
  const data: CategoryInput = { name: form.name, order: form.order, image: form.image }
  if (editingCategory.value) {
    emit('update', editingCategory.value.id, data)
    cancelEdit()
  } else {
    emit('create', data)
    form.name = ''
    form.image = ''
    form.order = props.categories.length + 1
  }
}
</script>
