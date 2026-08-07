<template>
  <footer class="bg-surface-container-lowest border-t border-outline-variant/20 w-full mt-16 md:mt-20">
    <div class="flex flex-col items-center gap-6 py-14 md:py-16 px-6 md:px-margin-desktop max-w-container-max mx-auto text-center">
      <!-- 3-Column Grid -->
      <div class="grid grid-cols-1 md:grid-cols-3 w-full gap-10 md:gap-16 mb-10">
        <!-- Brand -->
        <div class="text-left space-y-5">
          <img
            src="/images/logo-xtx-plain.png"
            :alt="sharedContent.footer.brandName"
            class="h-12 w-auto"
            width="420"
            height="125"
            loading="lazy"
          />
          <h3 class="font-headline-sm text-headline-sm text-secondary">{{ sharedContent.footer.brandName }}</h3>
          <p class="font-body-md text-body-md text-on-surface-variant max-w-xs">
            {{ settings.companyDescription }}
          </p>
        </div>

        <!-- Links -->
        <div class="space-y-6">
          <h4 class="font-label-md text-label-md uppercase tracking-widest text-secondary">{{ ui.footer.linksTitle }}</h4>
          <ul class="space-y-4">
            <li><NuxtLink to="/" class="text-[16px] text-on-surface-variant hover:text-secondary transition-colors">{{ ui.nav.home }}</NuxtLink></li>
            <li><NuxtLink to="/products" class="text-[16px] text-on-surface-variant hover:text-secondary transition-colors">{{ ui.nav.products }}</NuxtLink></li>
            <li><NuxtLink to="/about" class="text-[16px] text-on-surface-variant hover:text-secondary transition-colors">{{ ui.nav.about }}</NuxtLink></li>
            <li><NuxtLink to="/contact" class="text-[16px] text-on-surface-variant hover:text-secondary transition-colors">{{ ui.nav.contact }}</NuxtLink></li>
          </ul>
        </div>

        <!-- Contact -->
        <div class="text-right space-y-6">
          <h4 class="font-label-md text-label-md uppercase tracking-widest text-secondary">{{ ui.footer.contactTitle }}</h4>
          <ul class="space-y-4">
            <li v-for="p in settings.phones || []" :key="p.number">
              <a
                :href="`tel:${p.number}`"
                class="text-[17px] font-medium text-on-surface hover:text-secondary transition-colors"
              >{{ formatPhone(p.number) }}</a>
            </li>
            <li>
              <a :href="settings.facebookUrl" target="_blank" rel="noopener noreferrer" class="font-body-md text-body-md text-on-surface-variant hover:text-secondary transition-colors">{{ ui.footer.facebook }}</a>
            </li>
          </ul>
        </div>
      </div>

      <!-- Separator -->
      <div class="fine-line opacity-10 mb-8"></div>

      <!-- Copyright -->
      <p class="font-body-md text-body-md text-on-surface-variant opacity-60">
        &copy; {{ new Date().getFullYear() }} {{ sharedContent.footer.copyright }}
      </p>

    </div>
  </footer>
</template>

<script setup lang="ts">
const { settings } = useSiteSettings()
const { content: sharedContent } = useSharedContent()
const ui = computed(() => sharedContent.value.ui)
</script>
