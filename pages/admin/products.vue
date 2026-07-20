<template>
  <div>
    <div class="flex items-center justify-between mb-6">
      <h1 class="text-2xl font-bold text-gray-100">Бараа удирдах</h1>
      <button
        v-if="!showCreateForm"
        @click="openCreateForm"
        class="btn-gold text-sm"
      >
        + Шинэ бараа
      </button>
    </div>

    <!-- Create form (top) -->
    <div v-if="showCreateForm" class="mb-8">
      <AdminProductForm
        :product="null"
        :categories="categories"
        :submitting="submitting"
        @submit="handleCreate"
        @cancel="showCreateForm = false"
      />
    </div>

    <!-- Table with inline edit -->
    <AdminProductTable
      :products="products"
      :categories="categories"
      :editing-id="editingProduct?.id || ''"
      @edit="openEditForm"
      @delete="handleDelete"
    >
      <template #edit-form="{ product }">
        <AdminProductForm
          :product="product"
          :categories="categories"
          :submitting="submitting"
          @submit="(data) => handleUpdate(product.id, data)"
          @cancel="editingProduct = null"
        />
      </template>
    </AdminProductTable>
  </div>
</template>

<script setup lang="ts">
import type { Product } from '~/composables/useMockData'

definePageMeta({ layout: 'admin', middleware: 'auth' })

const { products, getProducts, createProduct, updateProduct, deleteProduct } = useProducts()
const { categories, getCategories } = useCategories()

onMounted(async () => {
  await Promise.all([getProducts(), getCategories()])
})

const showCreateForm = ref(false)
const editingProduct = ref<Product | null>(null)
const submitting = ref(false)

const openCreateForm = () => {
  editingProduct.value = null
  showCreateForm.value = true
}

const openEditForm = (product: Product) => {
  showCreateForm.value = false
  editingProduct.value = product
}

const handleCreate = async (data: Omit<Product, 'id'>) => {
  if (submitting.value) return
  submitting.value = true
  try {
    await createProduct(data)
    showCreateForm.value = false
    await getProducts()
  } catch (e: any) {
    alert(e.message || 'Алдаа гарлаа')
  } finally {
    submitting.value = false
  }
}

const handleUpdate = async (id: string, data: Omit<Product, 'id'>) => {
  if (submitting.value) return
  submitting.value = true
  try {
    await updateProduct(id, data)
    editingProduct.value = null
    await getProducts()
  } catch (e: any) {
    alert(e.message || 'Алдаа гарлаа')
  } finally {
    submitting.value = false
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
