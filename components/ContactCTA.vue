<template>
  <section class="pt-4 pb-16 md:pb-section-gap px-6 md:px-margin-desktop max-w-container-max mx-auto">
    <div class="bg-surface-container-low py-14 md:py-16 px-8 md:px-16 relative overflow-hidden ghost-border" v-reveal>
      <div class="relative z-10">
        <span v-if="content.contactCTA.label" class="font-label-md text-label-md text-secondary tracking-widest uppercase block mb-6">{{ content.contactCTA.label }}</span>
        <h2 class="font-headline-md text-headline-md text-on-surface mb-6">{{ content.contactCTA.title }}</h2>
        <p class="font-body-lg text-body-lg text-on-surface-variant max-w-2xl mb-10">
          {{ content.contactCTA.description }}
        </p>
        <div class="flex flex-col sm:flex-row gap-4 md:gap-6">
          <a
            v-if="phone"
            :href="`tel:${phone}`"
            class="flex items-center justify-center gap-4 px-12 py-5 bg-secondary text-on-secondary font-label-md text-label-md uppercase tracking-widest hover:brightness-110 transition-all"
          >
            <span class="material-symbols-outlined">call</span>
            {{ formatPhone(phone) }}
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

    </div>
  </section>
</template>

<script setup lang="ts">
const { content } = useSharedContent()

// The number comes from site settings rather than from this block's own field.
// It used to be stored separately, so changing the phone under Тохиргоо left
// this button — the main call-to-action on the home page — still dialling the
// old one.
const { settings } = useSiteSettings()
const phone = computed(() => (settings.value.phones || [])[0]?.number || '')
</script>
