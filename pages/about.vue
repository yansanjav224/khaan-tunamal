<template>
  <div>
    <main class="relative overflow-hidden pt-32">
      <!-- Mongolian Script Background -->
      <MongolianScript />

      <!-- Hero Section -->
      <section class="max-w-container-max mx-auto px-6 md:px-margin-desktop mb-section-gap">
        <div class="grid md:grid-cols-12 gap-gutter items-center">
        <!-- Image (left) -->
        <div class="md:col-span-6 order-1" v-reveal>
          <div class="aspect-[4/5] overflow-hidden">
            <img
              :src="content.hero.image"
              alt="Craftsmanship"
              class="w-full h-full object-cover grayscale-[30%] brightness-75"
            />
          </div>
        </div>
        <!-- Text (right) -->
        <div class="md:col-span-5 md:col-start-8 order-2" v-reveal="{ delay: 200 }">
          <span class="font-label-md text-label-md text-secondary uppercase tracking-[0.4em] mb-6 block">{{ content.hero.label }}</span>
          <h1 class="font-display-lg text-display-lg md:text-[72px] leading-tight mb-6 italic">
            {{ content.hero.title }}
          </h1>
          <p class="font-body-lg text-body-lg text-on-surface-variant">
            {{ content.hero.description }}
          </p>
        </div>
        </div>
      </section>

      <!-- Our Story: Бидний түүх -->
      <section class="max-w-container-max mx-auto px-6 md:px-margin-desktop mb-section-gap">
        <div class="grid md:grid-cols-12 gap-gutter items-center">
          <div class="md:col-span-5" v-reveal>
            <h2 class="font-headline-md text-headline-md text-secondary mb-8">{{ content.story.title }}</h2>
            <div class="space-y-6 font-body-md text-body-md text-on-surface-variant">
              <p>{{ content.story.text1 }}</p>
              <p>{{ content.story.text2 }}</p>
            </div>
            <div class="mt-12 flex space-x-16 border-t border-outline-variant/30 pt-8">
              <div v-for="stat in content.story.stats" :key="stat.label">
                <span class="block font-display-lg text-display-lg text-secondary">{{ stat.value }}</span>
                <span class="font-label-md text-label-md uppercase tracking-widest text-outline">{{ stat.label }}</span>
              </div>
            </div>
          </div>
          <div class="md:col-span-6 md:col-start-8 relative" v-reveal="{ delay: 200 }">
            <div class="aspect-[4/5] bg-surface-container relative overflow-hidden">
              <img :src="content.story.image" alt="Heritage Detail" class="w-full h-full object-cover" />
            </div>
            <!-- Pull Quote -->
            <div class="absolute -bottom-12 -left-12 bg-surface p-12 ghost-border hidden lg:block max-w-md">
              <p class="font-headline-md text-headline-md italic text-on-surface leading-relaxed">
                "{{ content.story.quote }}"
              </p>
            </div>
          </div>
        </div>
      </section>

      <!-- Craft Tradition: Гар урлалын уламжлал -->
      <section class="bg-surface-container-lowest py-section-gap overflow-hidden mb-section-gap">
        <div class="max-w-container-max mx-auto px-6 md:px-margin-desktop">
          <div class="text-center mb-24" v-reveal>
            <h2 class="font-display-lg text-display-lg mb-6">{{ content.craftSectionTitle }}</h2>
            <div class="w-24 h-px bg-secondary mx-auto"></div>
          </div>
          <div class="grid md:grid-cols-3 gap-16">
            <div v-for="(craft, i) in content.crafts" :key="craft.title" v-reveal="{ delay: i * 200 }">
              <div class="aspect-square mb-8 overflow-hidden grayscale hover:grayscale-0 transition-all duration-700">
                <img :src="craft.image" :alt="craft.title" class="w-full h-full object-cover" />
              </div>
              <h3 class="font-headline-sm text-headline-sm text-secondary mb-4 uppercase tracking-wider">{{ craft.title }}</h3>
              <p class="font-body-md text-body-md text-on-surface-variant">{{ craft.description }}</p>
            </div>
          </div>
        </div>
      </section>

      <!-- Core Values: Бидний үнэт зүйлс -->
      <section class="max-w-container-max mx-auto px-6 md:px-margin-desktop mb-section-gap">
        <div class="grid md:grid-cols-2 gap-24 items-start">
          <div v-reveal>
            <h2 class="font-display-lg text-display-lg mb-12">{{ content.valuesSectionTitle }}</h2>
            <div class="space-y-16">
              <div v-for="value in content.values" :key="value.title" class="group">
                <h4 class="font-headline-sm text-headline-sm text-secondary mb-4 flex items-center">
                  <span class="w-8 h-px bg-secondary mr-4 transition-all group-hover:w-16"></span>
                  {{ value.title }}
                </h4>
                <p class="font-body-md text-body-md text-on-surface-variant pl-12">{{ value.description }}</p>
              </div>
            </div>
          </div>
          <div class="relative md:mt-24" v-reveal="{ delay: 200 }">
            <div class="ghost-border p-4">
              <div class="bg-surface-container h-[600px] overflow-hidden">
                <img :src="content.valuesImage" alt="Workshop Focus" class="w-full h-full object-cover" />
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- CTA Section -->
      <section class="max-w-container-max mx-auto px-6 md:px-margin-desktop mb-section-gap text-center">
        <div class="max-w-3xl mx-auto border border-outline-variant/30 py-24 px-12" v-reveal>
          <h2 class="font-headline-md text-headline-md mb-8 uppercase tracking-widest">{{ content.cta.title }}</h2>
          <p class="font-body-lg text-body-lg text-on-surface-variant mb-12">
            {{ content.cta.description }}
          </p>
          <div class="flex flex-col md:flex-row justify-center gap-8">
            <a :href="`tel:${content.cta.phone}`" class="border border-secondary px-10 py-4 font-label-md text-label-md uppercase tracking-[0.2em] hover:bg-secondary hover:text-on-secondary transition-all">{{ content.cta.phoneDisplay }}</a>
            <NuxtLink to="/contact" class="border border-outline px-10 py-4 font-label-md text-label-md uppercase tracking-[0.2em] hover:bg-on-surface hover:text-surface transition-all">{{ content.cta.buttonText }}</NuxtLink>
          </div>
        </div>
      </section>
    </main>
  </div>
</template>

<script setup lang="ts">
const { content, load } = useAboutContent()
onMounted(() => load())
</script>
