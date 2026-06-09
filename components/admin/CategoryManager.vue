<template>
  <div class="space-y-6">
    <!-- Add form -->
    <div class="card p-6">
      <h3 class="text-lg font-semibold text-gray-100 mb-4">
        {{ editingCategory ? 'Ангилал засах' : 'Шинэ ангилал нэмэх' }}
      </h3>
      <form @submit.prevent="handleSubmit" class="flex flex-col sm:flex-row gap-3">
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
          <div class="flex items-center gap-3">
            <span class="text-gray-500 text-sm w-8">{{ cat.order }}</span>
            <span class="text-gray-200 font-medium">{{ cat.name }}</span>
            <span class="text-gray-500 text-xs">({{ cat.id }})</span>
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

const emit = defineEmits<{
  create: [data: { name: string; order: number }]
  update: [id: string, data: { name: string; order: number }]
  delete: [category: Category]
}>()

const editingCategory = ref<Category | null>(null)
const form = reactive({
  name: '',
  order: 1,
})

const startEdit = (cat: Category) => {
  editingCategory.value = cat
  form.name = cat.name
  form.order = cat.order
}

const cancelEdit = () => {
  editingCategory.value = null
  form.name = ''
  form.order = 1
}

const handleSubmit = () => {
  if (editingCategory.value) {
    emit('update', editingCategory.value.id, { name: form.name, order: form.order })
    cancelEdit()
  } else {
    emit('create', { name: form.name, order: form.order })
    form.name = ''
    form.order = props.categories.length + 1
  }
}
</script>
