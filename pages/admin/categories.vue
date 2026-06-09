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

const { categories, getCategories, createCategory, updateCategory, deleteCategory } = useCategories()

await useAsyncData('admin-categories', () => getCategories())

const handleCreate = async (data: { name: string; order: number }) => {
  try {
    await createCategory(data)
    await getCategories()
  } catch (e: any) {
    alert(e.message || 'Алдаа гарлаа')
  }
}

const handleUpdate = async (id: string, data: { name: string; order: number }) => {
  try {
    await updateCategory(id, data)
    await getCategories()
  } catch (e: any) {
    alert(e.message || 'Алдаа гарлаа')
  }
}

const handleDelete = async (cat: Category) => {
  if (!confirm(`"${cat.name}" ангилалыг устгах уу?`)) return
  try {
    await deleteCategory(cat.id)
    await getCategories()
  } catch (e: any) {
    alert(e.message || 'Алдаа гарлаа')
  }
}
</script>
