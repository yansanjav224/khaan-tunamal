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
        <div v-for="cat in categories" :key="cat.id" class="px-4 py-3 hover:bg-dark-bg/50">
          <div class="flex items-center justify-between gap-4">
            <div class="flex items-center gap-3 min-w-0">
              <span class="text-gray-500 text-sm w-8 flex-shrink-0">{{ cat.order }}</span>
              <div class="w-10 h-10 flex-shrink-0 bg-dark-bg overflow-hidden">
                <img v-if="cat.image" :src="imgUrl(cat.image, IMG.thumb)" :alt="cat.name" class="w-full h-full object-cover" loading="lazy" />
              </div>
              <span class="text-gray-200 font-medium truncate">{{ cat.name }}</span>
              <span class="text-xs flex-shrink-0" :class="count(cat.id) ? 'text-gold' : 'text-gray-600'">
                {{ count(cat.id) }} бараа
              </span>
            </div>
            <div class="flex gap-3 flex-shrink-0">
              <button @click="startEdit(cat)" class="text-sm text-gray-400 hover:text-gold transition-colors">Засах</button>
              <button
                v-if="count(cat.id) && categories.length > 1"
                @click="mergingId = mergingId === cat.id ? '' : cat.id"
                class="text-sm text-gray-400 hover:text-gold transition-colors"
              >Нэгтгэх</button>
              <button @click="$emit('delete', cat)" class="text-sm text-gray-400 hover:text-red-400 transition-colors">Устгах</button>
            </div>
          </div>

          <!-- Merge. Renaming a category keeps its products; deleting one strands
               them. Moving each product by hand is the only other route, so this
               reassigns them in bulk and then removes the empty category. -->
          <div v-if="mergingId === cat.id" class="mt-3 pt-3 border-t border-dark-border flex flex-wrap items-center gap-3">
            <span class="text-sm text-gray-400">{{ count(cat.id) }} барааг зөөх:</span>
            <select v-model="mergeTarget" class="input-dark py-2 text-sm">
              <option value="" disabled>Хаашаа...</option>
              <option v-for="t in categories.filter(c => c.id !== cat.id)" :key="t.id" :value="t.id">{{ t.name }}</option>
            </select>
            <button
              :disabled="!mergeTarget"
              class="btn-gold text-sm !px-5 !py-2"
              @click="confirmMerge(cat)"
            >Зөөгөөд «{{ cat.name }}»-г устгах</button>
            <button class="text-sm text-gray-500 hover:text-gray-300" @click="mergingId = ''">Болих</button>
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
import type { Category, Product } from '~/composables/useMockData'

const props = defineProps<{
  categories: Category[]
  products: Product[]
}>()

type CategoryInput = { name: string; order: number; image: string }

const emit = defineEmits<{
  create: [data: CategoryInput]
  update: [id: string, data: CategoryInput]
  delete: [category: Category]
  merge: [from: Category, toId: string]
}>()

const count = (id: string) => props.products.filter(p => p.category === id).length

const mergingId = ref('')
const mergeTarget = ref('')

watch(mergingId, () => { mergeTarget.value = '' })

const confirmMerge = (cat: Category) => {
  const target = props.categories.find(c => c.id === mergeTarget.value)
  if (!target) return
  if (!confirm(`«${cat.name}»-ийн ${count(cat.id)} барааг «${target.name}» руу зөөгөөд, «${cat.name}» ангилалыг устгах уу?`)) return
  emit('merge', cat, target.id)
  mergingId.value = ''
}

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
