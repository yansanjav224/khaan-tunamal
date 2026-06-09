<template>
  <section class="py-20 md:py-28">
    <div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
      <div v-reveal class="card mongolian-border p-10 md:p-16 relative overflow-hidden">
        <!-- Background glow -->
        <div class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] bg-gold/5 rounded-full blur-3xl pointer-events-none"></div>

        <div class="relative">
          <span class="text-gold/60 text-sm font-medium tracking-[0.2em] uppercase mb-4 block">Холбогдох</span>
          <h2 class="text-2xl md:text-4xl font-display font-bold mb-5">
            <span class="gold-gradient-text">Сонирхож байна уу?</span>
          </h2>
          <p class="text-gray-400 mb-10 max-w-lg mx-auto leading-relaxed">
            Бүтээгдэхүүнтэй холбоотой мэдээлэл авах, захиалга өгөхийг хүсвэл бидэнтэй холбогдоорой.
          </p>
          <div class="flex flex-col sm:flex-row items-center justify-center gap-4">
            <a href="tel:99907191" class="btn-gold flex items-center gap-2 text-base">
              <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
              </svg>
              9990-7191
            </a>
            <NuxtLink to="/contact" class="btn-outline text-base">
              Холбоо барих хуудас
            </NuxtLink>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
