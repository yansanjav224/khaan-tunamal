<template>
  <footer class="bg-dark-surface border-t border-dark-border">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
      <div class="grid grid-cols-1 md:grid-cols-3 gap-10">
        <!-- Brand -->
        <div>
          <div class="flex items-center gap-3 mb-5">
            <LogoHTX variant="sm" />
            <div>
              <div class="text-gold font-display font-bold text-lg">{{ settings.companyName }}</div>
              <div class="text-gray-500 text-xs tracking-wide">{{ settings.companySlogan }}</div>
            </div>
          </div>
          <p class="text-gray-400 text-sm leading-relaxed max-w-xs">
            {{ settings.companyDescription }}
          </p>
        </div>

        <!-- Links -->
        <div>
          <h3 class="text-gold font-display font-semibold mb-5 text-sm tracking-wide uppercase">Холбоосууд</h3>
          <div class="flex flex-col gap-3">
            <NuxtLink to="/" class="text-gray-400 hover:text-gold transition-colors text-sm">Нүүр хуудас</NuxtLink>
            <NuxtLink to="/products" class="text-gray-400 hover:text-gold transition-colors text-sm">Бүтээгдэхүүн</NuxtLink>
            <NuxtLink to="/about" class="text-gray-400 hover:text-gold transition-colors text-sm">Бидний тухай</NuxtLink>
            <NuxtLink to="/contact" class="text-gray-400 hover:text-gold transition-colors text-sm">Холбоо барих</NuxtLink>
          </div>
        </div>

        <!-- Contact -->
        <div>
          <h3 class="text-gold font-display font-semibold mb-5 text-sm tracking-wide uppercase">Холбоо барих</h3>
          <div class="flex flex-col gap-3">
            <a
              v-for="(phone, i) in settings.phones"
              :key="i"
              :href="`tel:${phone.number}`"
              class="flex items-center gap-3 text-gray-400 hover:text-gold transition-colors text-sm"
            >
              <svg class="w-4 h-4 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
              </svg>
              {{ formatPhone(phone.number) }}
            </a>
            <a
              :href="settings.facebookUrl"
              target="_blank"
              class="flex items-center gap-3 text-gray-400 hover:text-gold transition-colors text-sm"
            >
              <svg class="w-4 h-4 shrink-0" fill="currentColor" viewBox="0 0 24 24">
                <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
              </svg>
              Facebook хуудас
            </a>
          </div>
        </div>
      </div>

      <div class="border-t border-dark-border mt-10 pt-8 flex flex-col md:flex-row items-center justify-between gap-4 text-gray-500 text-sm">
        <span>&copy; {{ new Date().getFullYear() }} {{ settings.companyName }}. Бүх эрх хуулиар хамгаалагдсан.</span>
        <span class="text-gray-600 text-xs">Монгол үндэсний урлал</span>
      </div>
    </div>
  </footer>
</template>

<script setup lang="ts">
const { settings } = useSiteSettings()
</script>
