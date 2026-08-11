<template>
  <div>
    <!-- Hero -->
    <header class="relative h-[60vh] md:h-[70vh] w-full flex items-center justify-center overflow-hidden">
      <div class="absolute inset-0 z-0">
        <img
          :src="imgUrl(content.hero.image, 1400)"
          class="w-full h-full object-cover grayscale opacity-40"
          :alt="content.mapLabel"
          fetchpriority="high"
          decoding="async"
        />
        <div class="absolute inset-0 hero-gradient"></div>
      </div>

      <div class="relative z-10 text-center px-6">
        <span v-if="content.hero.label" class="font-label-md text-label-md text-secondary tracking-[0.3em] uppercase mb-4 block" v-reveal>{{ content.hero.label }}</span>
        <h1 class="font-display-lg text-display-lg-mobile md:text-display-lg text-on-surface mb-6 max-w-4xl mx-auto" v-reveal>
          {{ content.hero.titleLine1 }}<br /><span class="italic text-secondary">{{ content.hero.titleHighlight }}</span> {{ content.hero.titleTail }}
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
          <div v-for="p in settings.phones || []" :key="p.number" class="mb-3">
            <p class="font-body-md text-body-md">
              <a :href="`tel:${p.number}`" class="text-[19px] font-medium text-secondary hover:brightness-110 transition-all">{{ formatPhone(p.number) }}</a>
              <span class="text-outline text-body-sm"> · {{ p.label }}</span>
            </p>
            <!-- Most customers here message rather than call. -->
            <div class="flex gap-4 mt-1">
              <a
                :href="`viber://chat?number=%2B976${p.number}`"
                class="font-label-md text-label-md uppercase tracking-widest text-outline hover:text-secondary transition-colors"
              >Viber</a>
              <a
                :href="`https://wa.me/976${p.number}`"
                target="_blank"
                rel="noopener noreferrer"
                class="font-label-md text-label-md uppercase tracking-widest text-outline hover:text-secondary transition-colors"
              >WhatsApp</a>
            </div>
          </div>
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
          <h2 class="font-headline-md text-headline-md text-on-surface mb-2">{{ ui.form.title }}</h2>
          <p class="font-body-md text-body-md text-on-surface-variant mb-8">
            {{ ui.form.intro }}
          </p>

          <form class="space-y-5" @submit.prevent="submit">
            <div>
              <label for="cf-name" class="block text-[15px] text-on-surface mb-2">{{ ui.form.nameLabel }}</label>
              <input
                id="cf-name"
                v-model="form.name"
                type="text"
                required
                maxlength="80"
                autocomplete="name"
                class="w-full bg-surface-container border border-outline-variant/40 text-on-surface px-4 py-3.5 text-[16px] placeholder:text-on-surface-variant/50 focus:outline-none focus:border-secondary transition-colors"
                :placeholder="ui.form.namePlaceholder"
              />
            </div>

            <div>
              <label for="cf-phone" class="block text-[15px] text-on-surface mb-2">{{ ui.form.phoneLabel }}</label>
              <input
                id="cf-phone"
                v-model="form.phone"
                type="tel"
                required
                maxlength="20"
                inputmode="tel"
                autocomplete="tel"
                class="w-full bg-surface-container border border-outline-variant/40 text-on-surface px-4 py-3.5 text-[16px] placeholder:text-on-surface-variant/50 focus:outline-none focus:border-secondary transition-colors"
                :placeholder="ui.form.phonePlaceholder"
              />
            </div>

            <div>
              <label for="cf-message" class="block text-[15px] text-on-surface mb-2">{{ ui.form.messageLabel }}</label>
              <textarea
                id="cf-message"
                v-model="form.message"
                required
                rows="5"
                maxlength="1000"
                class="w-full bg-surface-container border border-outline-variant/40 text-on-surface px-4 py-3.5 text-[16px] placeholder:text-on-surface-variant/50 focus:outline-none focus:border-secondary transition-colors resize-y"
                :placeholder="ui.form.messagePlaceholder"
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
              class="w-full inline-flex items-center justify-center gap-3 px-8 py-4 bg-secondary text-on-secondary text-[15px] font-semibold tracking-wide hover:brightness-110 transition-all disabled:opacity-50 disabled:pointer-events-none"
            >
              <span class="material-symbols-outlined text-lg">{{ sent ? 'check_circle' : 'send' }}</span>
              {{ sending ? ui.form.sending : sent ? ui.form.sent : ui.form.submit }}
            </button>

            <p v-if="sent" class="text-secondary text-body-sm" role="status">
              {{ ui.form.thanks }}
            </p>
            <p v-if="sendError" class="text-error text-body-sm" role="alert">{{ sendError }}</p>
          </form>
        </section>

        <!-- Map. The label used to float over the map as a translucent card,
             which sat on top of streets and read as clutter; it is a solid bar
             under the map now, with room for a photo of the entrance and a
             direct route into the Google Maps app. -->
        <section class="border border-outline-variant/30 overflow-hidden flex flex-col" v-reveal="{ delay: 150 }">
          <iframe
            :src="content.mapEmbedUrl"
            :title="content.mapLabel"
            class="w-full flex-1 min-h-[360px] border-0 invert brightness-[0.85] contrast-[1.2] hue-rotate-[200deg]"
            allowfullscreen=""
            loading="lazy"
            referrerpolicy="no-referrer-when-downgrade"
          ></iframe>

          <!-- Stacks on a phone so the button keeps its wording: an unlabelled
               arrow icon is exactly the kind of thing an older customer will not
               risk tapping. -->
          <div class="flex flex-col gap-4 sm:flex-row sm:items-center sm:gap-5 border-t border-outline-variant/30 bg-surface-container-low p-5 md:px-6">
            <div class="flex items-center gap-4 min-w-0 flex-1">
              <img
                v-if="content.mapImage"
                :src="imgUrl(content.mapImage, 220)"
                :alt="content.mapLabel"
                class="h-16 w-16 md:h-[72px] md:w-[72px] shrink-0 object-cover border border-outline-variant/30"
                loading="lazy"
                decoding="async"
              />
              <div class="min-w-0">
                <p class="font-label-md text-label-md text-secondary uppercase tracking-widest">{{ content.mapLabel }}</p>
                <p class="text-[15px] text-on-surface-variant leading-snug mt-1">{{ settings.address }}</p>
              </div>
            </div>
            <a
              v-if="content.mapLink"
              :href="content.mapLink"
              target="_blank"
              rel="noopener noreferrer"
              class="shrink-0 inline-flex items-center justify-center gap-2 px-6 py-3.5 bg-secondary text-on-secondary text-[15px] font-semibold tracking-wide hover:brightness-110 transition-all"
            >
              <span class="material-symbols-outlined text-[20px]">directions</span>
              {{ content.mapDirectionsLabel }}
            </a>
          </div>
        </section>
      </div>
    </main>
  </div>
</template>

<script setup lang="ts">
const { settings } = useSiteSettings()
const { content } = useContactContent()
const { content: shared } = useSharedContent()
const ui = computed(() => shared.value.ui)
const { base } = useSiteUrl()

usePageSeo(() => ({
  title: `${ui.value.nav.contact} | ${settings.value.companyName}`,
  description: `${settings.value.companyName} — утас ${(settings.value.phones || []).map(p => formatPhone(p.number)).join(', ')}. ${settings.value.address}. ${content.value.cards.businessHours}`,
  image: content.value.hero.image,
}))

// The pin doubles as structured data: parsing it off the embed URL keeps the
// coordinates Google is told about and the map the visitor sees from drifting
// apart when an admin moves the pin.
const geo = computed(() => {
  const m = /[?&]q=(-?\d+\.?\d*),(-?\d+\.?\d*)/.exec(content.value.mapEmbedUrl || '')
  if (!m) return null
  return { '@type': 'GeoCoordinates', latitude: Number(m[1]), longitude: Number(m[2]) }
})

useJsonLd(() => ({
  '@context': 'https://schema.org',
  '@type': 'ContactPage',
  url: `${base}/contact`,
  // LocalBusiness rather than Organization: it inherits Place, so the pin and
  // the opening hours are readable by Google's local results.
  mainEntity: {
    '@type': 'LocalBusiness',
    name: settings.value.companyName,
    telephone: (settings.value.phones || []).map(p => `+976${p.number}`),
    email: content.value.cards.email,
    address: {
      '@type': 'PostalAddress',
      addressLocality: settings.value.address,
      addressCountry: 'MN',
    },
    ...(geo.value ? { geo: geo.value } : {}),
    ...(content.value.mapLink ? { hasMap: content.value.mapLink } : {}),
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
    sendError.value = ui.value.form.errPhone
    return
  }
  if (form.message.trim().length < 5) {
    sendError.value = ui.value.form.errMessage
    return
  }

  sending.value = true
  try {
    await $fetch('/api/contact', { method: 'POST', body: { ...form } })
    sent.value = true
  } catch (e: any) {
    sendError.value = e?.data?.message || e?.data?.statusMessage || ui.value.form.errGeneric
  } finally {
    sending.value = false
  }
}
</script>
