<template>
  <header class="bg-dark-surface/95 backdrop-blur-sm border-b border-dark-border sticky top-0 z-50">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="flex items-center justify-between h-16 md:h-20">
        <!-- Logo -->
        <NuxtLink to="/" class="flex items-center gap-3">
          <LogoHTX variant="sm" />
          <div class="hidden sm:block">
            <div class="text-gold font-display font-bold text-lg leading-tight">Хаан Тунамал</div>
            <div class="text-gray-500 text-xs">Монгол төмөр эдлэл</div>
          </div>
        </NuxtLink>

        <!-- Desktop Nav -->
        <nav class="hidden md:flex items-center gap-8">
          <NuxtLink
            v-for="link in navLinks"
            :key="link.to"
            :to="link.to"
            class="text-gray-300 hover:text-gold transition-colors text-sm font-medium tracking-wide"
            active-class="!text-gold"
          >
            {{ link.label }}
          </NuxtLink>
          <NuxtLink to="/contact" class="btn-gold text-sm !px-5 !py-2">
            Холбоо барих
          </NuxtLink>
        </nav>

        <!-- Mobile Menu Button -->
        <button
          @click="mobileOpen = !mobileOpen"
          class="md:hidden text-gray-300 hover:text-gold transition-colors"
        >
          <svg v-if="!mobileOpen" class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" />
          </svg>
          <svg v-else class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
          </svg>
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
        <div v-if="mobileOpen" class="md:hidden pb-4 border-t border-dark-border mt-2 pt-4">
          <div class="flex flex-col gap-3">
            <NuxtLink
              v-for="link in navLinks"
              :key="link.to"
              :to="link.to"
              class="text-gray-300 hover:text-gold transition-colors py-2"
              active-class="!text-gold"
              @click="mobileOpen = false"
            >
              {{ link.label }}
            </NuxtLink>
            <NuxtLink to="/contact" class="btn-gold text-center mt-2" @click="mobileOpen = false">
              Холбоо барих
            </NuxtLink>
          </div>
        </div>
      </Transition>
    </div>
  </header>
</template>

<script setup lang="ts">
const mobileOpen = ref(false)

const navLinks = [
  { to: '/', label: 'Нүүр' },
  { to: '/products', label: 'Бүтээгдэхүүн' },
  { to: '/about', label: 'Бидний тухай' },
]

// Close mobile menu on route change
const route = useRoute()
watch(() => route.path, () => {
  mobileOpen.value = false
})
</script>
