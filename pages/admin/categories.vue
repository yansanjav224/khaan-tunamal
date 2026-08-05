<template>
  <div>
    <h1 class="text-2xl font-bold text-gray-100 mb-6">Ангилал удирдах</h1>

    <AdminCategoryManager
      :categories="categories"
      @create="handleCreate"
      @update="handleUpdate"
      @delete="handleDelete"
    />
  </div>
</template>

<script setup lang="ts">
import type { Category } from '~/composables/useMockData'

definePageMeta({ layout: 'admin', middleware: 'auth' })

const { categories, refreshLive: reloadCategories, createCategory, updateCategory, deleteCategory } = useCategories()
const { products, refreshLive: reloadProducts } = useProducts()

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
