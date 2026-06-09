<template>
  <div>
    <label class="block text-sm text-gray-400 mb-2">Зургууд</label>

    <!-- Current images -->
    <div v-if="modelValue.length" class="flex flex-wrap gap-3 mb-3">
      <div
        v-for="(img, i) in modelValue"
        :key="i"
        class="relative w-24 h-24 rounded-lg overflow-hidden border border-dark-border group"
      >
        <img :src="img" class="w-full h-full object-cover" />
        <button
          @click="removeImage(i)"
          class="absolute inset-0 bg-black/60 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
        >
          <svg class="w-5 h-5 text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
          </svg>
        </button>
      </div>
    </div>

    <!-- Upload area -->
    <div
      @click="openFileDialog"
      @dragover.prevent="dragOver = true"
      @dragleave="dragOver = false"
      @drop.prevent="handleDrop"
      class="border-2 border-dashed rounded-lg p-6 text-center cursor-pointer transition-colors"
      :class="dragOver ? 'border-gold bg-gold/5' : 'border-dark-border hover:border-gold/50'"
    >
      <div v-if="uploading" class="text-gold">
        <svg class="w-8 h-8 mx-auto mb-2 animate-spin" fill="none" viewBox="0 0 24 24">
          <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
          <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
        </svg>
        Зураг байршуулж байна...
      </div>
      <div v-else>
        <svg class="w-8 h-8 mx-auto mb-2 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
        </svg>
        <p class="text-gray-400 text-sm">Зураг чирж оруулах эсвэл дарж сонгох</p>
        <p class="text-gray-500 text-xs mt-1">PNG, JPG, WebP (10MB хүртэл)</p>
      </div>
    </div>

    <input
      ref="fileInput"
      type="file"
      accept="image/*"
      multiple
      class="hidden"
      @change="handleFileSelect"
    />
  </div>
</template>

<script setup lang="ts">
const props = defineProps<{
  modelValue: string[]
}>()

const emit = defineEmits<{
  'update:modelValue': [value: string[]]
}>()

const { uploadImage, uploading } = useImageUpload()
const { isConfigured } = useFirebase()
const fileInput = ref<HTMLInputElement>()
const dragOver = ref(false)

const openFileDialog = () => {
  fileInput.value?.click()
}

const handleFileSelect = async (e: Event) => {
  const input = e.target as HTMLInputElement
  if (input.files) {
    await uploadFiles(Array.from(input.files))
    input.value = ''
  }
}

const handleDrop = async (e: DragEvent) => {
  dragOver.value = false
  if (e.dataTransfer?.files) {
    await uploadFiles(Array.from(e.dataTransfer.files))
  }
}

const uploadFiles = async (files: File[]) => {
  if (!isConfigured.value) {
    // Dev mode: create local preview URLs
    const urls = files.map(f => URL.createObjectURL(f))
    emit('update:modelValue', [...props.modelValue, ...urls])
    return
  }

  for (const file of files) {
    try {
      const url = await uploadImage(file)
      emit('update:modelValue', [...props.modelValue, url])
    } catch (e) {
      console.error('Зураг upload алдаа:', e)
    }
  }
}

const removeImage = (index: number) => {
  const newImages = [...props.modelValue]
  newImages.splice(index, 1)
  emit('update:modelValue', newImages)
}
</script>
