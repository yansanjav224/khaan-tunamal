<template>
  <!-- pt clears the fixed header. Without it the flex centring pushed the first
       line of the headline up behind the bar on phones — "Хаан Тунамал" was
       simply missing and the hero opened on the word "Хийц". -->
  <section class="relative pt-28 pb-4 md:pt-40 md:pb-24 md:min-h-[860px] flex items-center px-6 md:px-margin-desktop max-w-container-max mx-auto">
    <div class="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-14 w-full items-center">
      <!-- Left: copy -->
      <div class="md:col-span-6 z-10" v-reveal>
        <!-- Mark and name read as one object: the name is set in the plate's
             own brushed steel rather than the page gold. Left-aligned like
             everything else in the column — centring it over left-aligned copy
             left the mark floating off to the right of its own text. -->
        <div class="mb-8 md:mb-10">
          <img
            src="/images/logo-xtx-plain.png"
            :alt="`${content.hero.title} ${content.hero.titleLine2}`"
            class="h-[60px] md:h-[84px] w-auto mb-3 md:mb-5"
            width="420"
            height="125"
            fetchpriority="high"
          />
          <h1 class="wordmark-steel font-brand text-[19px] md:text-[26px] tracking-[0.14em] leading-snug">
            {{ content.hero.title }} {{ content.hero.titleLine2 }}
          </h1>
          <p
            v-if="content.hero.label"
            class="font-label-md text-[11px] md:text-label-md text-secondary tracking-[0.28em] uppercase mt-4"
          >{{ content.hero.label }}</p>
        </div>

        <p class="font-body-lg text-[17px] md:text-body-lg text-on-surface-variant max-w-lg mb-7 md:mb-10">
          {{ content.hero.description }}
        </p>

        <!-- One filled primary, one quiet secondary. Both were outlined before,
             so nothing announced itself as the main action. -->
        <div class="flex flex-col sm:flex-row sm:flex-wrap sm:items-center gap-3 md:gap-6">
          <NuxtLink
            to="/products"
            class="text-center px-10 py-4 bg-secondary text-on-secondary font-label-md text-[13px] md:text-label-md uppercase tracking-widest hover:brightness-110 transition-all duration-300"
          >
            {{ content.hero.buttonProducts }}
          </NuxtLink>
          <NuxtLink
            to="/contact"
            class="px-6 py-4 font-label-md text-[13px] md:text-label-md uppercase tracking-widest text-on-surface hover:text-secondary flex items-center justify-center gap-2 group transition-all ghost-border sm:border-0"
          >
            {{ content.hero.buttonContact }}
            <span class="material-symbols-outlined group-hover:translate-x-1 transition-transform">arrow_forward</span>
          </NuxtLink>
        </div>
      </div>

      <!-- Right: hero image -->
      <div class="hidden md:col-span-6 relative md:flex justify-center" v-reveal="{ delay: 300 }">
        <div class="relative w-full aspect-[16/10] md:aspect-square max-w-2xl">
          <div class="absolute inset-0 bg-gradient-to-tr from-secondary/10 to-transparent blur-3xl"></div>
          <div class="media-frame absolute inset-0">
            <!-- Largest-contentful element: eager and high priority, never lazy. -->
            <img
              :src="imgUrl(content.hero.image, 1000)"
              :alt="`${content.hero.title} ${content.hero.titleLine2}`"
              width="1000"
              height="1000"
              fetchpriority="high"
              decoding="async"
            />
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
const { content } = useHomeContent()
</script>
