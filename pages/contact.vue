<template>
  <div class="py-12 md:py-20">
    <div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
      <h1 class="section-title">
        <span class="gold-gradient-text">Холбоо барих</span>
      </h1>
      <p class="section-subtitle">Бидэнтэй холбогдох</p>

      <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
        <!-- Contact info -->
        <div class="space-y-6">
          <div class="card p-6">
            <h3 class="text-gold font-semibold text-lg mb-4">Утас</h3>
            <div class="space-y-3">
              <a
                v-for="(phone, i) in settings.phones"
                :key="i"
                :href="`tel:${phone.number}`"
                class="flex items-center gap-3 text-gray-300 hover:text-gold transition-colors"
              >
                <div class="w-10 h-10 rounded-full bg-gold/10 flex items-center justify-center flex-shrink-0">
                  <svg class="w-5 h-5 text-gold" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                </div>
                <div>
                  <div class="font-medium">{{ formatPhone(phone.number) }}</div>
                  <div class="text-gray-500 text-sm">{{ phone.label }}</div>
                </div>
              </a>
            </div>
          </div>

          <div class="card p-6">
            <h3 class="text-gold font-semibold text-lg mb-4">Сошиал</h3>
            <a
              :href="settings.facebookUrl"
              target="_blank"
              class="flex items-center gap-3 text-gray-300 hover:text-gold transition-colors"
            >
              <div class="w-10 h-10 rounded-full bg-gold/10 flex items-center justify-center flex-shrink-0">
                <svg class="w-5 h-5 text-gold" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                </svg>
              </div>
              <div>
                <div class="font-medium">Facebook хуудас</div>
                <div class="text-gray-500 text-sm">Шинэ бүтээгдэхүүнийг дагаарай</div>
              </div>
            </a>
          </div>

          <div class="card p-6">
            <h3 class="text-gold font-semibold text-lg mb-4">Хаяг</h3>
            <div class="flex items-start gap-3 text-gray-300">
              <div class="w-10 h-10 rounded-full bg-gold/10 flex items-center justify-center flex-shrink-0 mt-1">
                <svg class="w-5 h-5 text-gold" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
              </div>
              <div>
                <div class="font-medium">{{ settings.address }}</div>
                <div class="text-gray-500 text-sm">{{ settings.addressNote }}</div>
              </div>
            </div>
          </div>
        </div>

        <!-- CTA right side -->
        <div class="card p-6 md:p-8 flex flex-col items-center justify-center text-center min-h-[400px]">
          <div class="w-16 h-16 rounded-full bg-gold/10 flex items-center justify-center mb-6">
            <svg class="w-8 h-8 text-gold" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
          </div>
          <h3 class="text-xl font-semibold text-gray-100 mb-2">Бидэнтэй холбогдоорой</h3>
          <p class="text-gray-400 mb-6">
            Бүтээгдэхүүний захиалга, асуулт, санал хүсэлтээ утсаар болон Facebook-ээр илгээнэ үү.
          </p>
          <a v-if="settings.phones.length" :href="`tel:${settings.phones[0].number}`" class="btn-gold">
            Утасдах: {{ formatPhone(settings.phones[0].number) }}
          </a>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
const { settings } = useSiteSettings()
</script>
