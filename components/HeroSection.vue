<template>
  <section class="relative overflow-hidden min-h-[90vh] flex items-center">
    <!-- Background -->
    <div class="absolute inset-0 bg-gradient-to-b from-dark-bg via-dark-surface to-dark-bg"></div>
    <!-- diagonal lines come from global .bg-diagonal-lines -->

    <!-- Glow -->
    <div class="hero-glow hidden md:block"></div>

    <!-- Particles (desktop only) -->
    <div class="hidden md:block">
      <div class="particle"></div>
      <div class="particle"></div>
      <div class="particle"></div>
      <div class="particle"></div>
      <div class="particle"></div>
      <div class="particle"></div>
    </div>

    <div class="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 md:py-36 w-full">
      <div class="text-center max-w-3xl mx-auto">
        <!-- Logo emblem -->
        <div class="mb-8 animate-fade-in-up" style="animation-delay: 0ms;">
          <LogoHTX variant="xl" class="mx-auto animate-float" />
        </div>

        <h1 class="text-4xl md:text-6xl lg:text-7xl font-display font-bold mb-6 leading-tight animate-fade-in-up" style="animation-delay: 150ms;">
          <span class="gold-shimmer">Хаан Тунамал</span>
          <br>
          <span class="text-gray-100">Хийц</span>
        </h1>

        <p class="text-gray-400 text-lg md:text-xl mb-10 max-w-2xl mx-auto leading-relaxed animate-fade-in-up" style="animation-delay: 300ms;">
          Монгол үндэсний хэв маягтай төмөр зуух, хүжсийн тавиур, зуухны багаж болон бусад эдлэлийг гар урлалаар бүтээнэ.
        </p>

        <div class="flex flex-col sm:flex-row items-center justify-center gap-4 animate-fade-in-up" style="animation-delay: 450ms;">
          <NuxtLink to="/products" class="btn-gold text-lg px-8 py-4">
            Бүтээгдэхүүн үзэх
          </NuxtLink>
          <NuxtLink to="/contact" class="btn-outline text-lg px-8 py-4">
            Холбоо барих
          </NuxtLink>
        </div>

        <!-- Stats -->
        <div class="grid grid-cols-3 gap-8 mt-16 pt-8 border-t border-dark-border max-w-lg mx-auto animate-fade-in-up" style="animation-delay: 600ms;">
          <div>
            <div class="text-gold font-display text-2xl md:text-3xl font-bold">6+</div>
            <div class="text-gray-500 text-sm mt-1">Ангилал</div>
          </div>
          <div>
            <div class="text-gold font-display text-2xl md:text-3xl font-bold">50+</div>
            <div class="text-gray-500 text-sm mt-1">Бүтээгдэхүүн</div>
          </div>
          <div>
            <div class="text-gold font-display text-2xl md:text-3xl font-bold">10+</div>
            <div class="text-gray-500 text-sm mt-1">Жилийн туршлага</div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
