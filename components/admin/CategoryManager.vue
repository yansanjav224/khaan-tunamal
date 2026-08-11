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

        <!-- Every category has its own page at /products/category/<id>. These
             three fields are what Google shows and reads there. -->
        <div class="pt-2 border-t border-dark-border space-y-4">
          <p class="text-sm text-gray-400">
            Google-д зориулсан бичвэр
            <span class="text-gray-600">— ангиллын хуудас: <code>/products/category/{{ editingCategory?.id || '…' }}</code></span>
          </p>
          <div>
            <label class="block text-sm text-gray-400 mb-1">Хайлтын гарчиг</label>
            <input v-model="form.seoTitle" class="input-dark w-full" placeholder="Гар хийцийн монгол зуух, тулга | Хаан Тунамал Хийц" />
            <p class="text-xs text-gray-500 mt-1">Google-ийн үр дүнд харагдах хөх гарчиг. 50–60 тэмдэгт. Хоосон бол ангиллын нэрээр автоматаар үүснэ.</p>
          </div>
          <div>
            <label class="block text-sm text-gray-400 mb-1">Хайлтын тайлбар</label>
            <textarea v-model="form.seoDescription" rows="2" class="input-dark w-full" placeholder="Гарчгийн доор харагдах 2 мөр"></textarea>
            <p class="text-xs text-gray-500 mt-1">120–160 тэмдэгт. Хүнд уншуулах өгүүлбэр, түлхүүр үг шигтгэсэн байх.</p>
          </div>
          <div>
            <label class="block text-sm text-gray-400 mb-1">Танилцуулга бичвэр</label>
            <textarea v-model="form.intro" rows="4" class="input-dark w-full" placeholder="Ангиллын хуудсан дээр барааны жагсаалтын дээр харагдах хэсэг"></textarea>
            <p class="text-xs text-gray-500 mt-1">Хуудсан дээр үнэхээр харагдана. 300–600 тэмдэгт байх тусам Google сайн ойлгоно.</p>
          </div>
        </div>

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

type CategoryInput = { name: string; order: number; image: string; seoTitle: string; seoDescription: string; intro: string }

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
const blank = (): CategoryInput => ({
  name: '',
  order: 1,
  image: '',
  seoTitle: '',
  seoDescription: '',
  intro: '',
})

const form = reactive<CategoryInput>(blank())

const startEdit = (cat: Category) => {
  editingCategory.value = cat
  Object.assign(form, blank(), {
    name: cat.name,
    order: cat.order,
    image: cat.image || '',
    seoTitle: cat.seoTitle || '',
    seoDescription: cat.seoDescription || '',
    intro: cat.intro || '',
  })
}

const cancelEdit = () => {
  editingCategory.value = null
  Object.assign(form, blank())
}

const handleSubmit = () => {
  const data: CategoryInput = { ...form }
  if (editingCategory.value) {
    emit('update', editingCategory.value.id, data)
    cancelEdit()
  } else {
    emit('create', data)
    const next = props.categories.length + 1
    Object.assign(form, blank(), { order: next })
  }
}
</script>
