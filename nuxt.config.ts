// Fonts, split out for readability.
//
// Body face: Manrope, not Hanken Grotesk. Hanken ships `cyrillic-ext`
// (U+0460-052F) but NOT the base Cyrillic block (U+0400-045F), so every
// Mongolian letter except Ө/Ү silently fell back to a system sans — words were
// literally rendering in two different typefaces. Manrope covers both blocks.
//
// Material Symbols is requested with `icon_names=`, which returns a subsetted
// font containing only the 14 glyphs the site uses instead of the full ~300 kB
// variable icon font.
// Prata carries the wordmark: a high-contrast display serif whose thick/thin
// stroke transition is what makes the gold gradient read as polished metal.
// Geometric faces (Russo One, Unbounded) held an even stroke and the gradient
// flattened out across it.
// Swap candidates that also carry Cyrillic: Playfair Display, Cormorant
// Garamond 300, EB Garamond 400.
const FONT_TEXT =
  'https://fonts.googleapis.com/css2?family=EB+Garamond:ital,wght@0,400..800;1,400..800&family=Manrope:wght@200..800&family=Prata&display=swap'

const FONT_ICONS =
  'https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@24,300,0,0' +
  '&icon_names=arrow_back,arrow_forward,call,chat,check_circle,close,inventory_2,location_on,mail,menu,open_in_new,search,send,verified' +
  '&display=block'

export default defineNuxtConfig({
  compatibilityDate: '2024-11-01',
  devtools: { enabled: true },
  modules: ['@nuxtjs/tailwindcss'],

  app: {
    head: {
      htmlAttrs: { lang: 'mn' },
      // Per-page titles/descriptions/OG tags are set with useSeoMeta in each
      // page; this is the site-wide fallback.
      title: 'Хаан Тунамал Хийц — Монгол төмөр эдлэл',
      meta: [
        { charset: 'utf-8' },
        { name: 'viewport', content: 'width=device-width, initial-scale=1' },
        { name: 'theme-color', content: '#131313' },
        { name: 'format-detection', content: 'telephone=no' },
      ],
      link: [
        { rel: 'icon', type: 'image/png', href: '/favicon.png' },
        { rel: 'apple-touch-icon', href: '/apple-touch-icon.png' },
        { rel: 'preconnect', href: 'https://fonts.googleapis.com' },
        { rel: 'preconnect', href: 'https://fonts.gstatic.com', crossorigin: '' },
        // No crossorigin: product images are plain (non-CORS) requests, and a
        // crossorigin preconnect would open a connection they cannot reuse.
        { rel: 'preconnect', href: 'https://res.cloudinary.com' },
        { rel: 'stylesheet', href: FONT_TEXT },
        { rel: 'stylesheet', href: FONT_ICONS },
      ],
    },
    pageTransition: { name: 'page', mode: 'out-in' },
  },

  runtimeConfig: {
    public: {
      // Absolute base for canonical URLs, OG images and the sitemap. Point
      // NUXT_PUBLIC_SITE_URL at the real domain once it is connected.
      siteUrl: 'https://khaan-tunamal-69w5.vercel.app',
      firebaseApiKey: '',
      firebaseAuthDomain: '',
      firebaseProjectId: '',
      firebaseStorageBucket: '',
      firebaseMessagingSenderId: '',
      firebaseAppId: '',
      cloudinaryCloudName: '',
      cloudinaryUploadPreset: '',
      gaMeasurementId: '',
      // Google Search Console verification token. Kept in runtime config so the
      // site can be verified by setting an env var in Vercel — no code change,
      // no redeploy of the repo.
      gscVerification: '',
    },
  },

  // Cost control. Firestore's free tier allows 50k reads/day and a full page
  // render costs ~25. Serving the public pages as ISR means a page is rendered
  // at most once per window no matter how many people visit, so read volume
  // scales with time instead of traffic. Product pages change rarely and get a
  // longer window. Admin is a pure SPA — it never renders on the server.
  routeRules: {
    '/': { isr: 900 },
    '/about': { isr: 900 },
    '/contact': { isr: 900 },
    '/products': { isr: 900 },
    '/products/**': { isr: 1800 },
    '/admin/**': { ssr: false, headers: { 'x-robots-tag': 'noindex, nofollow' } },
    '/api/**': {
      headers: { 'cache-control': 'public, max-age=0, s-maxage=300, stale-while-revalidate=600' },
    },
  },

  tailwindcss: {
    cssPath: '~/assets/css/main.css',
  },
})
