<template>
  <div class="card overflow-hidden">
    <!-- Desktop table -->
    <div class="hidden md:block overflow-x-auto">
      <table class="w-full">
        <thead class="bg-dark-bg">
          <tr>
            <th class="text-left text-xs text-gray-500 font-medium px-4 py-3">Зураг</th>
            <th class="text-left text-xs text-gray-500 font-medium px-4 py-3">Нэр</th>
            <th class="text-left text-xs text-gray-500 font-medium px-4 py-3">Ангилал</th>
            <th class="text-left text-xs text-gray-500 font-medium px-4 py-3">Үнэ</th>
            <th class="text-left text-xs text-gray-500 font-medium px-4 py-3">Онцлох</th>
            <th class="text-right text-xs text-gray-500 font-medium px-4 py-3">Үйлдэл</th>
          </tr>
        </thead>
        <tbody>
          <template v-for="p in products" :key="p.id">
            <tr class="border-t border-dark-border hover:bg-dark-bg/50">
              <td class="px-4 py-3">
                <div class="w-12 h-12 rounded-lg overflow-hidden bg-dark-bg">
                  <img v-if="p.images?.length" :src="p.images[0]" class="w-full h-full object-cover" />
                  <div v-else class="w-full h-full flex items-center justify-center text-dark-border">
                    <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                  </div>
                </div>
              </td>
              <td class="px-4 py-3 text-gray-200 font-medium">{{ p.name }}</td>
              <td class="px-4 py-3 text-gray-400 text-sm">{{ getCategoryName(p.category) }}</td>
              <td class="px-4 py-3 text-gold font-medium">{{ formatPrice(p.price) }}₮</td>
              <td class="px-4 py-3">
                <span v-if="p.featured" class="text-xs bg-gold/20 text-gold px-2 py-1 rounded">Тийм</span>
                <span v-else class="text-xs text-gray-500">-</span>
              </td>
              <td class="px-4 py-3 text-right">
                <button @click="$emit('edit', p)" class="text-sm text-gray-400 hover:text-gold transition-colors mr-3">
                  {{ editingId === p.id ? 'Хаах' : 'Засах' }}
                </button>
                <button @click="$emit('delete', p)" class="text-sm text-gray-400 hover:text-red-400 transition-colors">
                  Устгах
                </button>
              </td>
            </tr>
            <!-- Inline edit form -->
            <tr v-if="editingId === p.id">
              <td colspan="6" class="px-4 py-4 bg-dark-bg/30">
                <slot name="edit-form" :product="p" />
              </td>
            </tr>
          </template>
        </tbody>
      </table>
    </div>

    <!-- Mobile list -->
    <div class="md:hidden divide-y divide-dark-border">
      <template v-for="p in products" :key="p.id">
        <div class="p-4 flex items-center gap-4">
          <div class="w-14 h-14 rounded-lg overflow-hidden bg-dark-bg flex-shrink-0">
            <img v-if="p.images?.length" :src="p.images[0]" class="w-full h-full object-cover" />
          </div>
          <div class="flex-1 min-w-0">
            <div class="font-medium text-gray-200 truncate">{{ p.name }}</div>
            <div class="text-gold text-sm">{{ formatPrice(p.price) }}₮</div>
          </div>
          <div class="flex gap-2">
            <button @click="$emit('edit', p)" class="text-gray-400 hover:text-gold p-1">
              <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
              </svg>
            </button>
            <button @click="$emit('delete', p)" class="text-gray-400 hover:text-red-400 p-1">
              <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
              </svg>
            </button>
          </div>
        </div>
        <!-- Inline edit form (mobile) -->
        <div v-if="editingId === p.id" class="p-4 bg-dark-bg/30">
          <slot name="edit-form" :product="p" />
        </div>
      </template>
    </div>

    <div v-if="!products.length" class="p-8 text-center text-gray-500">
      Бараа байхгүй байна
    </div>
  </div>
</template>

<script setup lang="ts">
import type { Product, Category } from '~/composables/useMockData'

const props = defineProps<{
  products: Product[]
  categories: Category[]
  editingId?: string
}>()

defineEmits<{
  edit: [product: Product]
  delete: [product: Product]
}>()

const getCategoryName = (catId: string) => {
  return props.categories.find(c => c.id === catId)?.name || catId
}

const formatPrice = (price: number) => price.toLocaleString('mn-MN')
</script>
