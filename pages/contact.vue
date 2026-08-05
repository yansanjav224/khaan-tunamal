<template>
  <div>
    <!-- Hero -->
    <header class="relative h-[60vh] md:h-[70vh] w-full flex items-center justify-center overflow-hidden">
      <div class="absolute inset-0 z-0">
        <img
          :src="imgUrl(content.hero.image, 1400)"
          class="w-full h-full object-cover grayscale opacity-40"
          alt="Улаанбаатар хотын дүрслэл"
          fetchpriority="high"
          decoding="async"
        />
        <div class="absolute inset-0 hero-gradient"></div>
      </div>

      <!-- Mongolian script watermark -->
      <div class="absolute right-[-5%] top-[20%] opacity-10 select-none pointer-events-none rotate-12 hidden lg:block">
        <p class="text-[200px] leading-tight font-mongolian text-stroke-gold">
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

    <main class="max-w-container-max mx-auto px-6 md:px-margin-desktop py-24 md:py-section-gap">
      <!-- Contact cards -->
      <div class="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
        <div class="border border-outline-variant/30 p-8 hover:border-secondary/50 transition-colors duration-500" v-reveal>
          <span class="material-symbols-outlined text-secondary text-3xl mb-6 block">location_on</span>
          <h2 class="font-headline-sm text-headline-sm text-on-surface mb-3">{{ content.cards.locationTitle }}</h2>
          <p class="font-body-md text-body-md text-on-surface-variant">{{ settings.address }}</p>
          <p class="font-body-sm text-body-sm text-outline mt-2">{{ settings.addressNote }}</p>
        </div>

        <div class="border border-outline-variant/30 p-8 hover:border-secondary/50 transition-colors duration-500" v-reveal="{ delay: 100 }">
          <span class="material-symbols-outlined text-secondary text-3xl mb-6 block">call</span>
          <h2 class="font-headline-sm text-headline-sm text-on-surface mb-3">{{ content.cards.phoneTitle }}</h2>
          <p v-for="p in settings.phones || []" :key="p.number" class="font-body-md text-body-md">
            <a :href="`tel:${p.number}`" class="text-on-surface-variant hover:text-secondary transition-colors">{{ formatPhone(p.number) }}</a>
            <span class="text-outline text-body-sm"> · {{ p.label }}</span>
          </p>
          <p class="font-body-sm text-body-sm text-outline mt-2">{{ content.cards.businessHours }}</p>
        </div>

        <div class="border border-outline-variant/30 p-8 hover:border-secondary/50 transition-colors duration-500" v-reveal="{ delay: 200 }">
          <span class="material-symbols-outlined text-secondary text-3xl mb-6 block">mail</span>
          <h2 class="font-headline-sm text-headline-sm text-on-surface mb-3">{{ content.cards.emailTitle }}</h2>
          <p class="font-body-md text-body-md text-on-surface-variant">
            <a :href="`mailto:${content.cards.email}`" class="hover:text-secondary transition-colors">{{ content.cards.email }}</a>
          </p>
          <div class="flex gap-6 mt-4 pt-4 border-t border-outline-variant/20">
            <a
              :href="settings.facebookUrl"
              target="_blank"
              rel="noopener noreferrer"
              class="font-label-md text-label-md text-on-surface-variant hover:text-secondary transition-colors uppercase tracking-widest"
            >{{ content.cards.facebookLabel }}</a>
          </div>
        </div>
      </div>

      <!-- Message form + map -->
      <div class="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <section class="ghost-border p-8 md:p-10" v-reveal>
          <h2 class="font-headline-md text-headline-md text-on-surface mb-2">Зурвас үлдээх</h2>
          <p class="font-body-md text-body-md text-on-surface-variant mb-8">
            Утсаар холбогдох боломжгүй бол доорх маягтыг бөглөнө үү. Бид эргэн холбогдоно.
          </p>

          <form class="space-y-5" @submit.prevent="submit">
            <div>
              <label for="cf-name" class="block font-label-md text-label-md uppercase tracking-widest text-on-surface-variant mb-2">Нэр *</label>
              <input
                id="cf-name"
                v-model="form.name"
                type="text"
                required
                maxlength="80"
                autocomplete="name"
                class="w-full bg-surface-container border border-outline-variant/40 text-on-surface px-4 py-3 font-body-md text-body-md placeholder:text-on-surface-variant/50 focus:outline-none focus:border-secondary transition-colors"
                placeholder="Таны нэр"
              />
            </div>

            <div>
              <label for="cf-phone" class="block font-label-md text-label-md uppercase tracking-widest text-on-surface-variant mb-2">Утас *</label>
              <input
                id="cf-phone"
                v-model="form.phone"
                type="tel"
                required
                maxlength="20"
                inputmode="tel"
                autocomplete="tel"
                class="w-full bg-surface-container border border-outline-variant/40 text-on-surface px-4 py-3 font-body-md text-body-md placeholder:text-on-surface-variant/50 focus:outline-none focus:border-secondary transition-colors"
                placeholder="99112233"
              />
            </div>

            <div>
              <label for="cf-message" class="block font-label-md text-label-md uppercase tracking-widest text-on-surface-variant mb-2">Зурвас *</label>
              <textarea
                id="cf-message"
                v-model="form.message"
                required
                rows="5"
                maxlength="1000"
                class="w-full bg-surface-container border border-outline-variant/40 text-on-surface px-4 py-3 font-body-md text-body-md placeholder:text-on-surface-variant/50 focus:outline-none focus:border-secondary transition-colors resize-y"
                placeholder="Ямар бүтээгдэхүүн сонирхож байна вэ?"
              ></textarea>
              <p class="text-body-sm text-outline mt-1 text-right">{{ form.message.length }}/1000</p>
            </div>

            <!-- Honeypot: hidden from people, irresistible to bots. -->
            <div class="absolute left-[-9999px]" aria-hidden="true">
              <label for="cf-website">Вэбсайт</label>
              <input id="cf-website" v-model="form.website" type="text" tabindex="-1" autocomplete="off" />
            </div>

            <button
              type="submit"
              :disabled="sending || sent"
              class="w-full inline-flex items-center justify-center gap-3 px-8 py-4 bg-secondary text-on-secondary font-label-md text-label-md uppercase tracking-widest hover:brightness-110 transition-all disabled:opacity-50 disabled:pointer-events-none"
            >
              <span class="material-symbols-outlined text-lg">{{ sent ? 'check_circle' : 'send' }}</span>
              {{ sending ? 'Илгээж байна...' : sent ? 'Илгээгдлээ' : 'Илгээх' }}
            </button>

            <p v-if="sent" class="text-secondary text-body-sm" role="status">
              Баярлалаа! Бид тантай удахгүй холбогдоно.
            </p>
            <p v-if="sendError" class="text-error text-body-sm" role="alert">{{ sendError }}</p>
          </form>
        </section>

        <!-- Map -->
        <section class="min-h-[450px] lg:min-h-0 border border-outline-variant/30 overflow-hidden relative" v-reveal="{ delay: 150 }">
          <iframe
            :src="content.mapEmbedUrl"
            title="Байршил — Google Maps"
            class="w-full h-full min-h-[450px] border-0 invert brightness-[0.85] contrast-[1.2] hue-rotate-[200deg]"
            allowfullscreen=""
            loading="lazy"
            referrerpolicy="no-referrer-when-downgrade"
          ></iframe>
          <div class="absolute bottom-6 left-6 bg-background/90 backdrop-blur-md px-6 py-4 border border-secondary/30">
            <p class="font-label-md text-label-md text-secondary uppercase tracking-widest">{{ content.mapLabel }}</p>
          </div>
        </section>
      </div>
    </main>
  </div>
</template>

<script setup lang="ts">
const { settings } = useSiteSettings()
const { content } = useContactContent()
const { base } = useSiteUrl()

usePageSeo(() => ({
  title: 'Холбоо барих | Хаан Тунамал Хийц',
  description: `${settings.value.companyName} — утас ${(settings.value.phones || []).map(p => formatPhone(p.number)).join(', ')}. ${settings.value.address}. ${content.value.cards.businessHours}`,
  image: content.value.hero.image,
}))

useJsonLd(() => ({
  '@context': 'https://schema.org',
  '@type': 'ContactPage',
  url: `${base}/contact`,
  mainEntity: {
    '@type': 'Organization',
    name: settings.value.companyName,
    telephone: (settings.value.phones || []).map(p => `+976${p.number}`),
    email: content.value.cards.email,
    address: {
      '@type': 'PostalAddress',
      addressLocality: settings.value.address,
      addressCountry: 'MN',
    },
  },
}))

const form = reactive({ name: '', phone: '', message: '', website: '' })
const sending = ref(false)
const sent = ref(false)
const sendError = ref('')

const submit = async () => {
  if (sending.value || sent.value) return
  sendError.value = ''

  const phoneDigits = form.phone.replace(/\D/g, '')
  if (phoneDigits.length < 6) {
    sendError.value = 'Утасны дугаараа зөв оруулна уу.'
    return
  }
  if (form.message.trim().length < 5) {
    sendError.value = 'Зурвасаа бичнэ үү.'
    return
  }

  sending.value = true
  try {
    await $fetch('/api/contact', { method: 'POST', body: { ...form } })
    sent.value = true
  } catch (e: any) {
    sendError.value = e?.data?.statusMessage || 'Илгээхэд алдаа гарлаа. Утсаар холбогдоно уу.'
  } finally {
    sending.value = false
  }
}
</script>
