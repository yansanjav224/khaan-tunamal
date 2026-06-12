<template>
  <section class="py-section-gap px-6 md:px-margin-desktop max-w-container-max mx-auto">
    <div class="bg-surface-container-low py-20 px-8 md:px-20 text-center relative overflow-hidden ghost-border" v-reveal>
      <div class="relative z-10">
        <span class="font-label-md text-label-md text-secondary tracking-widest uppercase block mb-6">{{ content.contactCTA.label }}</span>
        <h2 class="font-headline-md text-headline-md text-on-surface mb-8">{{ content.contactCTA.title }}</h2>
        <p class="font-body-lg text-body-lg text-on-surface-variant max-w-2xl mx-auto mb-12">
          {{ content.contactCTA.description }}
        </p>
        <div class="flex flex-col md:flex-row justify-center gap-8">
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
      <div class="absolute right-0 top-0 opacity-10 text-[200px] font-display-lg pointer-events-none select-none translate-x-1/4 -translate-y-1/4">
        ᠬ
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
const { content, load } = useSharedContent()
onMounted(() => load())
</script>
