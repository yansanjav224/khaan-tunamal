<template>
  <div>
    <!-- Main image -->
    <div
      ref="containerRef"
      class="aspect-square bg-dark-surface rounded-2xl overflow-hidden mb-4 border border-dark-border/60 relative"
      :class="images.length ? 'cursor-none' : ''"
      @mousemove="onMouseMove"
      @mouseenter="onMouseEnter"
      @mouseleave="onMouseLeave"
      @click="openZoom"
    >
      <img
        v-if="images.length"
        :src="images[activeIndex]"
        :alt="alt"
        class="w-full h-full object-cover"
      />
      <div v-else class="w-full h-full flex items-center justify-center">
        <div class="text-center">
          <svg class="w-16 h-16 text-dark-border mx-auto mb-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
          </svg>
          <span class="text-dark-border text-sm">Зураг байхгүй</span>
        </div>
      </div>

      <!-- Magnifying glass circle -->
      <div
        v-if="showLens && images.length"
        class="absolute pointer-events-none rounded-full border-2 border-white/40 shadow-[0_0_30px_rgba(0,0,0,0.6)] z-10"
        :style="lensStyle"
      />
    </div>

    <!-- Thumbnails -->
    <div v-if="images.length > 1" class="flex gap-3 overflow-x-auto pb-2">
      <button
        v-for="(img, i) in images"
        :key="i"
        @click="activeIndex = i"
        class="w-20 h-20 rounded-lg overflow-hidden border-2 transition-all flex-shrink-0"
        :class="activeIndex === i ? 'border-gold shadow-[0_0_10px_rgba(197,165,90,0.2)]' : 'border-dark-border/60 hover:border-gold/50'"
      >
        <img :src="img" :alt="`${alt} - ${i + 1}`" class="w-full h-full object-cover" />
      </button>
    </div>

    <!-- Fullscreen zoom modal -->
    <Teleport to="body">
      <div
        v-if="zoomed"
        class="fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-sm cursor-zoom-out"
        @click="zoomed = false"
      >
        <button class="absolute top-6 right-6 text-white/70 hover:text-white transition-colors" @click.stop="zoomed = false">
          <svg class="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
        <img
          :src="images[activeIndex]"
          :alt="alt"
          class="max-w-[90vw] max-h-[90vh] object-contain rounded-lg"
        />
      </div>
    </Teleport>
  </div>
</template>

<script setup lang="ts">
const props = defineProps<{
  images: string[]
  alt: string
}>()

const activeIndex = ref(0)
const zoomed = ref(false)
const showLens = ref(false)
const containerRef = ref<HTMLElement | null>(null)

const LENS_SIZE = 300
const ZOOM_FACTOR = 2.5

const mouseX = ref(0)
const mouseY = ref(0)
const containerRect = ref({ width: 0, height: 0 })

const lensStyle = computed(() => {
  const half = LENS_SIZE / 2
  const rect = containerRect.value
  if (!rect.width || !rect.height) return {}

  const ratioX = mouseX.value / rect.width
  const ratioY = mouseY.value / rect.height

  const bgWidth = rect.width * ZOOM_FACTOR
  const bgHeight = rect.height * ZOOM_FACTOR
  const bgX = -(ratioX * bgWidth - half)
  const bgY = -(ratioY * bgHeight - half)

  return {
    width: `${LENS_SIZE}px`,
    height: `${LENS_SIZE}px`,
    left: `${mouseX.value - half}px`,
    top: `${mouseY.value - half}px`,
    backgroundImage: `url(${props.images[activeIndex.value]})`,
    backgroundSize: `${bgWidth}px ${bgHeight}px`,
    backgroundPosition: `${bgX}px ${bgY}px`,
    backgroundRepeat: 'no-repeat',
  }
})

function onMouseMove(e: MouseEvent) {
  if (!containerRef.value) return
  const rect = containerRef.value.getBoundingClientRect()
  containerRect.value = { width: rect.width, height: rect.height }
  mouseX.value = e.clientX - rect.left
  mouseY.value = e.clientY - rect.top
}

function onMouseEnter() {
  if (props.images.length) showLens.value = true
}

function onMouseLeave() {
  showLens.value = false
}

const openZoom = () => {
  if (props.images.length) zoomed.value = true
}

watch(() => props.images, () => {
  activeIndex.value = 0
})
</script>
