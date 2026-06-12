<template>
  <section class="relative min-h-[921px] flex items-center px-6 md:px-margin-desktop max-w-container-max mx-auto overflow-hidden">
    <!-- Mongolian Script Vertical Watermark -->
    <div class="mongolian-script-vertical text-[120px] left-8 top-20 text-secondary hidden lg:block">
      ᠬᠠᠭᠠᠨ ᠲᠤᠨᠠᠮᠠᠯ
    </div>

    <div class="grid grid-cols-1 md:grid-cols-12 gap-gutter w-full items-center">
      <!-- Left: Text Content -->
      <div class="md:col-span-5 z-10" v-reveal>
        <span class="font-label-md text-label-md text-secondary tracking-[0.3em] uppercase block mb-6">{{ content.hero.label }}</span>
        <h1 class="font-display-lg text-display-lg-mobile md:text-[84px] text-on-surface mb-8 leading-tight italic">
          {{ content.hero.title }} <br /> {{ content.hero.titleLine2 }}
        </h1>
        <p class="font-body-lg text-body-lg text-on-surface-variant max-w-md mb-12">
          {{ content.hero.description }}
        </p>
        <div class="flex flex-wrap gap-8">
          <NuxtLink
            to="/products"
            class="px-10 py-4 ghost-border font-label-md text-label-md uppercase tracking-widest text-on-surface hover:bg-secondary hover:text-on-secondary transition-all duration-500"
          >
            {{ content.hero.buttonProducts }}
          </NuxtLink>
          <NuxtLink
            to="/contact"
            class="px-10 py-4 font-label-md text-label-md uppercase tracking-widest text-on-surface hover:text-secondary flex items-center gap-2 group transition-all"
          >
            {{ content.hero.buttonContact }}
            <span class="material-symbols-outlined group-hover:translate-x-2 transition-transform">arrow_forward</span>
          </NuxtLink>
        </div>
      </div>

      <!-- Right: Hero Image -->
      <div class="md:col-span-7 relative flex justify-center mt-12 md:mt-0" v-reveal="{ delay: 300 }">
        <div class="relative w-full aspect-square max-w-2xl">
          <div class="absolute inset-0 bg-gradient-to-tr from-secondary/5 to-transparent rounded-full blur-3xl"></div>
          <img
            :src="content.hero.image"
            alt="Монгол гар урлал"
            class="w-full h-full object-contain drop-shadow-[0_20px_50px_rgba(233,193,118,0.2)] relative z-10"
          />
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
const { content, load } = useHomeContent()
onMounted(() => load())
</script>
