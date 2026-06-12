<template>
  <div>
    <label v-if="label" class="block text-sm text-gray-400 mb-2">{{ label }}</label>
    <div class="flex items-start gap-4">
      <!-- Preview -->
      <div v-if="modelValue" class="relative w-32 h-32 rounded-lg overflow-hidden border border-dark-border group flex-shrink-0">
        <img :src="modelValue" class="w-full h-full object-cover" />
        <div class="absolute inset-0 bg-black/60 flex items-center justify-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
          <button @click="openFileDialog" class="text-white hover:text-gold transition-colors" title="Солих">
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14" />
            </svg>
          </button>
          <button @click="$emit('update:modelValue', '')" class="text-red-400 hover:text-red-300 transition-colors" title="Устгах">
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
            </svg>
          </button>
        </div>
      </div>

      <!-- Upload area -->
      <div
        v-if="!modelValue"
        @click="openFileDialog"
        @dragover.prevent="dragOver = true"
        @dragleave="dragOver = false"
        @drop.prevent="handleDrop"
        class="w-32 h-32 border-2 border-dashed rounded-lg flex flex-col items-center justify-center cursor-pointer transition-colors"
        :class="dragOver ? 'border-gold bg-gold/5' : 'border-dark-border hover:border-gold/50'"
      >
        <div v-if="uploading" class="text-gold text-center">
          <svg class="w-6 h-6 mx-auto mb-1 animate-spin" fill="none" viewBox="0 0 24 24">
            <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
            <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
          </svg>
          <span class="text-xs">Байршуулж байна</span>
        </div>
        <div v-else class="text-center">
          <svg class="w-6 h-6 mx-auto mb-1 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
          </svg>
          <span class="text-xs text-gray-400">Зураг сонгох</span>
        </div>
      </div>
    </div>
    <input ref="fileInput" type="file" accept="image/*" class="hidden" @change="handleFileSelect" />
  </div>
</template>

<script setup lang="ts">
defineProps<{
  modelValue: string
  label?: string
}>()

const emit = defineEmits<{
  'update:modelValue': [value: string]
}>()

const { uploadImage, uploading } = useImageUpload()
const { isConfigured } = useFirebase()
const fileInput = ref<HTMLInputElement>()
const dragOver = ref(false)

const openFileDialog = () => fileInput.value?.click()

const handleFileSelect = async (e: Event) => {
  const input = e.target as HTMLInputElement
  if (input.files?.[0]) {
    await uploadFile(input.files[0])
    input.value = ''
  }
}

const handleDrop = async (e: DragEvent) => {
  dragOver.value = false
  if (e.dataTransfer?.files?.[0]) {
    await uploadFile(e.dataTransfer.files[0])
  }
}

const uploadFile = async (file: File) => {
  if (!isConfigured.value) {
    emit('update:modelValue', URL.createObjectURL(file))
    return
  }
  try {
    const url = await uploadImage(file)
    emit('update:modelValue', url)
  } catch (e) {
    console.error('Зураг upload алдаа:', e)
  }
}
</script>
