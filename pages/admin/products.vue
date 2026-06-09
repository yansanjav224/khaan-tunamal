<template>
  <div>
    <div class="flex items-center justify-between mb-6">
      <h1 class="text-2xl font-bold text-gray-100">Бараа удирдах</h1>
      <button
        v-if="!showForm"
        @click="openCreateForm"
        class="btn-gold text-sm"
      >
        + Шинэ бараа
      </button>
    </div>

    <!-- Form -->
    <div v-if="showForm" class="mb-8">
      <AdminProductForm
        :product="editingProduct"
        :categories="categories"
        @submit="handleSubmit"
        @cancel="closeForm"
      />
    </div>

    <!-- Table -->
    <AdminProductTable
      :products="products"
      :categories="categories"
      @edit="openEditForm"
      @delete="handleDelete"
    />
  </div>
</template>

<script setup lang="ts">
import type { Product } from '~/composables/useMockData'

definePageMeta({ layout: 'admin', middleware: 'auth' })

const { products, getProducts, createProduct, updateProduct, deleteProduct } = useProducts()
const { categories, getCategories } = useCategories()

await useAsyncData('admin-products', () => getProducts())
await useAsyncData('admin-cats', () => getCategories())

const showForm = ref(false)
const editingProduct = ref<Product | null>(null)

const openCreateForm = () => {
  editingProduct.value = null
  showForm.value = true
}

const openEditForm = (product: Product) => {
  editingProduct.value = product
  showForm.value = true
}

const closeForm = () => {
  showForm.value = false
  editingProduct.value = null
}

const handleSubmit = async (data: Omit<Product, 'id'>) => {
  try {
    if (editingProduct.value) {
      await updateProduct(editingProduct.value.id, data)
    } else {
      await createProduct(data)
    }
    closeForm()
    await getProducts()
  } catch (e: any) {
    alert(e.message || 'Алдаа гарлаа')
  }
}

const handleDelete = async (product: Product) => {
  if (!confirm(`"${product.name}" устгах уу?`)) return
  try {
    await deleteProduct(product.id)
    await getProducts()
  } catch (e: any) {
    alert(e.message || 'Алдаа гарлаа')
  }
}
</script>
