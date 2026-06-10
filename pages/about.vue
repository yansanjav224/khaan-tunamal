<template>
  <div class="py-12 md:py-20">
    <div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
      <h1 class="section-title">
        <span class="gold-gradient-text">Бидний тухай</span>
      </h1>
      <p class="section-subtitle">{{ settings.companyName }}</p>

      <div class="space-y-12">
        <!-- About text -->
        <div class="card p-8 md:p-12">
          <p class="text-gray-300 leading-relaxed text-lg mb-6">
            <span class="text-gold font-semibold">{{ settings.companyName }}</span>
            {{ aboutTextWithoutName }}
          </p>
          <p v-if="settings.aboutText2" class="text-gray-300 leading-relaxed text-lg">
            {{ settings.aboutText2 }}
          </p>
        </div>

        <!-- Values -->
        <div v-if="settings.values.length" class="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div v-for="(val, i) in settings.values" :key="i" class="card p-6 text-center">
            <div class="w-14 h-14 mx-auto mb-4 rounded-full bg-gold/10 flex items-center justify-center">
              <!-- shield -->
              <svg v-if="val.icon === 'shield'" class="w-7 h-7 text-gold" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
              </svg>
              <!-- heart -->
              <svg v-else-if="val.icon === 'heart'" class="w-7 h-7 text-gold" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
              </svg>
              <!-- bolt -->
              <svg v-else-if="val.icon === 'bolt'" class="w-7 h-7 text-gold" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
              <!-- star -->
              <svg v-else-if="val.icon === 'star'" class="w-7 h-7 text-gold" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
              </svg>
              <!-- fire -->
              <svg v-else-if="val.icon === 'fire'" class="w-7 h-7 text-gold" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M17.657 18.657A8 8 0 016.343 7.343S7 9 9 10c0-2 .5-5 2.986-7C14 5 16.09 5.777 17.656 7.343A7.975 7.975 0 0120 13a7.975 7.975 0 01-2.343 5.657z" />
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M9.879 16.121A3 3 0 1012.015 11L11 14H9c0 .768.293 1.536.879 2.121z" />
              </svg>
              <!-- globe -->
              <svg v-else class="w-7 h-7 text-gold" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <h3 class="text-gold font-semibold text-lg mb-2">{{ val.title }}</h3>
            <p class="text-gray-400 text-sm">{{ val.description }}</p>
          </div>
        </div>
      </div>
    </div>

    <ContactCTA />
  </div>
</template>

<script setup lang="ts">
const { settings } = useSiteSettings()

const aboutTextWithoutName = computed(() => {
  const text = settings.value.aboutText
  const name = settings.value.companyName
  if (text.startsWith(name)) {
    return text.slice(name.length)
  }
  return ' ' + text
})
</script>
