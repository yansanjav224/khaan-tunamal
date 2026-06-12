<template>
  <footer class="bg-surface-container-lowest border-t border-outline-variant/20 w-full mt-section-gap">
    <div class="flex flex-col items-center gap-8 py-16 px-6 md:px-margin-desktop max-w-container-max mx-auto text-center">
      <!-- 3-Column Grid -->
      <div class="grid grid-cols-1 md:grid-cols-3 w-full gap-16 mb-12">
        <!-- Brand -->
        <div class="text-left space-y-6">
          <h3 class="font-headline-sm text-headline-sm text-secondary">{{ sharedContent.footer.brandName }}</h3>
          <p class="font-body-md text-body-md text-on-surface-variant max-w-xs">
            {{ settings.companyDescription }}
          </p>
        </div>

        <!-- Links -->
        <div class="space-y-6">
          <h4 class="font-label-md text-label-md uppercase tracking-widest text-secondary">Холбоосууд</h4>
          <ul class="space-y-4">
            <li><NuxtLink to="/" class="font-body-md text-body-md text-on-surface-variant hover:text-secondary transition-colors">Нүүр хуудас</NuxtLink></li>
            <li><NuxtLink to="/products" class="font-body-md text-body-md text-on-surface-variant hover:text-secondary transition-colors">Бүтээгдэхүүн</NuxtLink></li>
            <li><NuxtLink to="/about" class="font-body-md text-body-md text-on-surface-variant hover:text-secondary transition-colors">Бидний тухай</NuxtLink></li>
            <li><NuxtLink to="/contact" class="font-body-md text-body-md text-on-surface-variant hover:text-secondary transition-colors">Холбоо барих</NuxtLink></li>
          </ul>
        </div>

        <!-- Contact -->
        <div class="text-right space-y-6">
          <h4 class="font-label-md text-label-md uppercase tracking-widest text-secondary">Холбоо барих</h4>
          <ul class="space-y-4">
            <li class="font-body-md text-body-md text-on-surface-variant">
              {{ settings.phones.map(p => formatPhone(p.number)).join(', ') }}
            </li>
            <li>
              <a :href="settings.facebookUrl" target="_blank" class="font-body-md text-body-md text-on-surface-variant hover:text-secondary transition-colors">Facebook хуудас</a>
            </li>
            <li>
              <a href="#" class="font-body-md text-body-md text-on-surface-variant hover:text-secondary transition-colors">Instagram</a>
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

      <!-- Bottom Links -->
      <div class="flex gap-8">
        <a href="#" class="text-on-surface-variant hover:text-secondary transition-colors duration-200">Instagram</a>
        <a :href="settings.facebookUrl" target="_blank" class="text-on-surface-variant hover:text-secondary transition-colors duration-200">Facebook</a>
      </div>
    </div>
  </footer>
</template>

<script setup lang="ts">
const { settings } = useSiteSettings()
const { content: sharedContent, load } = useSharedContent()

onMounted(() => load())

const formatPhone = (num: string) => {
  if (num.length === 8) return `${num.slice(0, 4)}-${num.slice(4)}`
  return num
}
</script>
