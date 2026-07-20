<template>
  <div>
    <!-- Hero Section -->
    <header class="relative h-[60vh] md:h-[70vh] w-full flex items-center justify-center overflow-hidden">
      <div class="absolute inset-0 z-0">
        <img
          :src="content.hero.image"
          class="w-full h-full object-cover grayscale opacity-40"
          alt="Ulaanbaatar skyline"
        />
        <div class="absolute inset-0 hero-gradient"></div>
      </div>

      <!-- Mongolian Script Watermark -->
      <div class="absolute right-[-5%] top-[20%] opacity-10 select-none pointer-events-none rotate-12 hidden lg:block">
        <p class="text-[200px] leading-tight font-headline-md text-stroke-gold italic">
          ᠬᠠᠭᠠᠨ ᠲᠤᠨᠠᠮᠠᠯ
        </p>
      </div>

      <div class="relative z-10 text-center px-6">
        <span class="font-label-md text-label-md text-secondary tracking-[0.3em] uppercase mb-4 block" v-reveal>{{ content.hero.label }}</span>
        <h1 class="font-display-lg text-display-lg-mobile md:text-display-lg text-on-surface mb-6 max-w-4xl mx-auto" v-reveal>
          {{ content.hero.titleLine1 }}<br /><span class="italic text-secondary">{{ content.hero.titleHighlight }}</span> холбоно
        </h1>
        <div class="w-16 h-[1px] bg-secondary mx-auto" v-reveal></div>
      </div>
    </header>

    <!-- Contact Cards -->
    <main class="max-w-container-max mx-auto px-6 md:px-margin-desktop py-section-gap">
      <!-- Top: 3 cards -->
      <div class="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
        <!-- Location -->
        <div class="border border-outline-variant/30 p-8 hover:border-secondary/50 transition-colors duration-500" v-reveal>
          <span class="material-symbols-outlined text-secondary text-3xl mb-6 block">location_on</span>
          <h3 class="font-headline-sm text-headline-sm text-on-surface mb-3">{{ content.cards.locationTitle }}</h3>
          <p class="font-body-md text-body-md text-on-surface-variant">{{ settings.address || 'Улаанбаатар хот' }}</p>
          <p class="font-body-sm text-body-sm text-outline mt-2">{{ settings.addressNote || 'Дэлгэрэнгүй хаягийг утсаар лавлана уу' }}</p>
        </div>
        <!-- Phone -->
        <div class="border border-outline-variant/30 p-8 hover:border-secondary/50 transition-colors duration-500" v-reveal="{ delay: 100 }">
          <span class="material-symbols-outlined text-secondary text-3xl mb-6 block">call</span>
          <h3 class="font-headline-sm text-headline-sm text-on-surface mb-3">{{ content.cards.phoneTitle }}</h3>
          <p class="font-body-md text-body-md text-on-surface-variant">
            {{ (settings.phones || []).map(p => formatPhone(p.number)).join(', ') }}
          </p>
          <p class="font-body-sm text-body-sm text-outline mt-2">{{ content.cards.businessHours }}</p>
        </div>
        <!-- Email & Social -->
        <div class="border border-outline-variant/30 p-8 hover:border-secondary/50 transition-colors duration-500" v-reveal="{ delay: 200 }">
          <span class="material-symbols-outlined text-secondary text-3xl mb-6 block">mail</span>
          <h3 class="font-headline-sm text-headline-sm text-on-surface mb-3">{{ content.cards.emailTitle }}</h3>
          <p class="font-body-md text-body-md text-on-surface-variant">{{ content.cards.email }}</p>
          <div class="flex gap-6 mt-4 pt-4 border-t border-outline-variant/20">
            <a :href="settings.facebookUrl" target="_blank" rel="noopener noreferrer" class="font-label-md text-label-md text-on-surface-variant hover:text-secondary transition-colors uppercase tracking-widest">{{ content.cards.facebookLabel }}</a>
          </div>
        </div>
      </div>

      <!-- Map -->
      <div class="w-full h-[450px] border border-outline-variant/30 overflow-hidden relative" v-reveal>
        <iframe
          :src="content.mapEmbedUrl"
          class="w-full h-full border-0 invert brightness-[0.85] contrast-[1.2] hue-rotate-[200deg]"
          allowfullscreen=""
          loading="lazy"
          referrerpolicy="no-referrer-when-downgrade"
        ></iframe>
        <!-- Overlay label -->
        <div class="absolute bottom-6 left-6 bg-background/90 backdrop-blur-md px-6 py-4 border border-secondary/30">
          <h3 class="font-label-md text-label-md text-secondary uppercase tracking-widest">{{ content.mapLabel }}</h3>
        </div>
      </div>
    </main>
  </div>
</template>

<script setup lang="ts">
const { settings } = useSiteSettings()
const { content, load } = useContactContent()

onMounted(() => load())

const formatPhone = (num: string) => {
  if (num.length === 8) return `${num.slice(0, 4)}-${num.slice(4)}`
  return num
}
</script>
