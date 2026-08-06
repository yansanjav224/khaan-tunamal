<template>
  <nav class="fixed top-0 w-full z-50 bg-surface/80 backdrop-blur-md border-b border-outline-variant/30">
    <div class="flex justify-between items-center px-6 md:px-margin-desktop py-5 md:py-6 max-w-container-max mx-auto">
      <NuxtLink
        to="/"
        class="font-brand text-[12px] whitespace-nowrap sm:text-[15px] md:text-[22px] text-secondary tracking-tight"
      >
        ХААН ТУНАМАЛ ХИЙЦ ХХК
      </NuxtLink>

      <!-- Desktop nav -->
      <div class="hidden md:flex gap-12">
        <NuxtLink
          v-for="link in navLinks"
          :key="link.to"
          :to="link.to"
          class="font-label-md text-label-md uppercase tracking-widest transition-all duration-300"
          :class="isActive(link.to) ? 'text-secondary border-b border-secondary pb-1' : 'text-on-surface-variant hover:text-secondary'"
        >
          {{ link.label }}
        </NuxtLink>
      </div>

      <!-- Mobile: a phone button sits next to the menu. Calling is what most
           visitors here actually want, and burying it behind a hamburger costs
           older customers the one action they came for. -->
      <div class="flex items-center gap-2 md:hidden">
        <a
          v-if="primaryPhone"
          :href="`tel:${primaryPhone}`"
          class="flex items-center gap-2 px-4 py-2.5 bg-secondary text-on-secondary text-[13px] font-semibold tracking-wide"
          aria-label="Утсаар залгах"
        >
          <span class="material-symbols-outlined text-[18px]">call</span>
          Залгах
        </a>
        <button
          class="w-11 h-11 flex items-center justify-center text-secondary border border-outline-variant/40"
          :aria-expanded="mobileOpen"
          aria-label="Цэс"
          @click="mobileOpen = !mobileOpen"
        >
          <span class="material-symbols-outlined text-[26px]">{{ mobileOpen ? 'close' : 'menu' }}</span>
        </button>
      </div>
    </div>

    <!-- Mobile nav: full-height sheet with large targets rather than a cramped
         12px list. -->
    <Transition
      enter-active-class="transition duration-200 ease-out"
      enter-from-class="opacity-0 -translate-y-2"
      enter-to-class="opacity-100 translate-y-0"
      leave-active-class="transition duration-150 ease-in"
      leave-from-class="opacity-100 translate-y-0"
      leave-to-class="opacity-0 -translate-y-2"
    >
      <div v-if="mobileOpen" class="md:hidden bg-surface/98 backdrop-blur-md border-t border-outline-variant/20 px-6 py-4">
        <div class="flex flex-col divide-y divide-outline-variant/15">
          <NuxtLink
            v-for="link in navLinks"
            :key="link.to"
            :to="link.to"
            class="flex items-center justify-between py-4 text-[17px] transition-colors"
            :class="isActive(link.to) ? 'text-secondary' : 'text-on-surface'"
            @click="mobileOpen = false"
          >
            {{ link.label }}
            <span class="material-symbols-outlined text-[20px] text-on-surface-variant">arrow_forward</span>
          </NuxtLink>
        </div>

        <div v-if="settings.phones?.length" class="mt-5 pt-5 border-t border-outline-variant/20 flex flex-col gap-3">
          <a
            v-for="p in settings.phones"
            :key="p.number"
            :href="`tel:${p.number}`"
            class="flex items-center gap-3 text-[17px] text-on-surface"
            @click="mobileOpen = false"
          >
            <span class="material-symbols-outlined text-secondary text-[20px]">call</span>
            {{ formatPhone(p.number) }}
          </a>
        </div>
      </div>
    </Transition>
  </nav>
</template>

<script setup lang="ts">
const route = useRoute()
const { settings } = useSiteSettings()
const mobileOpen = ref(false)

const navLinks = [
  { to: '/', label: 'Нүүр' },
  { to: '/products', label: 'Бүтээгдэхүүн' },
  { to: '/about', label: 'Бидний тухай' },
  { to: '/contact', label: 'Холбоо барих' },
]

const primaryPhone = computed(() => settings.value.phones?.[0]?.number || '')

const isActive = (path: string) => {
  if (path === '/') return route.path === '/'
  return route.path.startsWith(path)
}

watch(() => route.path, () => {
  mobileOpen.value = false
})
</script>
