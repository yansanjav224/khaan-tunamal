<template>
  <section class="pt-4 pb-16 md:pb-section-gap px-6 md:px-margin-desktop max-w-container-max mx-auto">
    <div class="bg-surface-container-low py-16 md:py-20 px-8 md:px-20 text-center relative overflow-hidden ghost-border" v-reveal>
      <div class="relative z-10">
        <span class="font-label-md text-label-md text-secondary tracking-widest uppercase block mb-6">{{ content.contactCTA.label }}</span>
        <h2 class="font-headline-md text-headline-md text-on-surface mb-6">{{ content.contactCTA.title }}</h2>
        <p class="font-body-lg text-body-lg text-on-surface-variant max-w-2xl mx-auto mb-10">
          {{ content.contactCTA.description }}
        </p>
        <div class="flex flex-col md:flex-row justify-center gap-4 md:gap-6">
          <a
            :href="`tel:${content.contactCTA.phone}`"
            class="flex items-center justify-center gap-4 px-12 py-5 bg-secondary text-on-secondary font-label-md text-label-md uppercase tracking-widest hover:brightness-110 transition-all"
          >
            <span class="material-symbols-outlined">call</span>
            {{ content.contactCTA.phoneDisplay }}
          </a>
          <NuxtLink
            to="/contact"
            class="flex items-center justify-center gap-4 px-12 py-5 ghost-border text-on-surface font-label-md text-label-md uppercase tracking-widest hover:bg-surface-container-high transition-all"
          >
            <span class="material-symbols-outlined">mail</span>
            {{ content.contactCTA.buttonText }}
          </NuxtLink>
        </div>
      </div>

      <!-- Artistic background Mongolian character -->
      <!-- Kept fully inside the panel: at translate-x-1/4 it was sliced in half
           by the overflow and read as a stray shape rather than a mark. -->
      <div
        class="absolute -right-4 md:right-2 top-1/2 -translate-y-1/2 opacity-[0.05] text-[200px] md:text-[280px] leading-none font-mongolian pointer-events-none select-none hidden lg:block"
        aria-hidden="true"
      >
        ᠬ
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
const { content } = useSharedContent()
</script>
