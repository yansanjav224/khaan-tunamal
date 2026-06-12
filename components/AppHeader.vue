<template>
  <nav class="fixed top-0 w-full z-50 bg-surface/70 backdrop-blur-md border-b border-outline-variant/30">
    <div class="flex justify-between items-center px-6 md:px-margin-desktop py-6 max-w-container-max mx-auto">
      <NuxtLink to="/" class="font-headline-md text-headline-md text-secondary tracking-tighter">
        ХААН ТУНАМАЛ
      </NuxtLink>

      <!-- Desktop Nav -->
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

      <!-- Mobile Menu Button -->
      <button class="md:hidden text-secondary" @click="mobileOpen = !mobileOpen">
        <span class="material-symbols-outlined">{{ mobileOpen ? 'close' : 'menu' }}</span>
      </button>
    </div>

    <!-- Mobile Nav -->
    <Transition
      enter-active-class="transition duration-200 ease-out"
      enter-from-class="opacity-0 -translate-y-2"
      enter-to-class="opacity-100 translate-y-0"
      leave-active-class="transition duration-150 ease-in"
      leave-from-class="opacity-100 translate-y-0"
      leave-to-class="opacity-0 -translate-y-2"
    >
      <div v-if="mobileOpen" class="md:hidden bg-surface/95 backdrop-blur-md border-t border-outline-variant/20 px-6 py-6">
        <div class="flex flex-col gap-1">
          <NuxtLink
            v-for="link in navLinks"
            :key="link.to"
            :to="link.to"
            class="font-label-md text-label-md uppercase tracking-widest py-4 transition-colors"
            :class="isActive(link.to) ? 'text-secondary' : 'text-on-surface-variant'"
            @click="mobileOpen = false"
          >
            {{ link.label }}
          </NuxtLink>
        </div>
      </div>
    </Transition>
  </nav>
</template>

<script setup lang="ts">
const route = useRoute()
const mobileOpen = ref(false)

const navLinks = [
  { to: '/', label: 'Нүүр' },
  { to: '/products', label: 'Бүтээгдэхүүн' },
  { to: '/about', label: 'Бидний тухай' },
  { to: '/contact', label: 'Холбоо барих' },
]

const isActive = (path: string) => {
  if (path === '/') return route.path === '/'
  return route.path.startsWith(path)
}

watch(() => route.path, () => {
  mobileOpen.value = false
})
</script>
