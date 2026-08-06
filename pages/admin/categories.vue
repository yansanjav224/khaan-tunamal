<template>
  <div>
    <h1 class="text-2xl font-bold text-gray-100 mb-6">Ангилал удирдах</h1>

    <p v-if="busy" class="mb-4 text-sm text-gold">{{ busy }}</p>

    <AdminCategoryManager
      :categories="categories"
      :products="products"
      @create="handleCreate"
      @update="handleUpdate"
      @delete="handleDelete"
      @merge="handleMerge"
    />
  </div>
</template>

<script setup lang="ts">
import type { Category } from '~/composables/useMockData'

definePageMeta({ layout: 'admin', middleware: 'auth' })

const { categories, refreshLive: reloadCategories, createCategory, updateCategory, deleteCategory } = useCategories()
const { products, refreshLive: reloadProducts, updateProduct } = useProducts()

onMounted(() => Promise.all([reloadCategories(), reloadProducts()]))

const handleCreate = async (data: { name: string; order: number; image: string }) => {
  try {
    await createCategory(data)
    await reloadCategories()
  } catch (e: any) {
    alert(e.message || 'Алдаа гарлаа')
  }
}

const handleUpdate = async (id: string, data: { name: string; order: number; image: string }) => {
  try {
    await updateCategory(id, data)
    await reloadCategories()
  } catch (e: any) {
    alert(e.message || 'Алдаа гарлаа')
  }
}

const busy = ref('')

// Reassign then remove. Renaming a category keeps its products attached, but
// consolidating two of them otherwise means editing every product by hand.
const handleMerge = async (from: Category, toId: string) => {
  const moving = products.value.filter(p => p.category === from.id)
  busy.value = `${moving.length} бараа зөөж байна...`
  try {
    for (let i = 0; i < moving.length; i++) {
      busy.value = `Бараа зөөж байна ${i + 1}/${moving.length}...`
      await updateProduct(moving[i].id, { category: toId })
    }
    await deleteCategory(from.id)
    await Promise.all([reloadCategories(), reloadProducts()])
    busy.value = ''
  } catch (e: any) {
    busy.value = ''
    alert(e.message || 'Алдаа гарлаа')
  }
}

const handleDelete = async (cat: Category) => {
  const affected = products.value.filter(p => p.category === cat.id).length
  const message = affected > 0
    ? `"${cat.name}" ангилалд ${affected} бараа байна. Устгавал тэдгээр нь ангилалгүй болно. Үргэлжлүүлэх үү?`
    : `"${cat.name}" ангилалыг устгах уу?`
  if (!confirm(message)) return
  try {
    await deleteCategory(cat.id)
    await reloadCategories()
  } catch (e: any) {
    alert(e.message || 'Алдаа гарлаа')
  }
}
</script>
