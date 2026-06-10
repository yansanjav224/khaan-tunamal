export default defineNuxtConfig({
  compatibilityDate: '2024-11-01',
  devtools: { enabled: true },
  modules: ['@nuxtjs/tailwindcss'],
  app: {
    head: {
      title: 'Хаан Тунамал Хийц — Монгол төмөр эдлэл',
      meta: [
        { charset: 'utf-8' },
        { name: 'viewport', content: 'width=device-width, initial-scale=1' },
        { name: 'description', content: 'Монгол үндэсний хэв маягтай төмөр зуух, хүжсийн тавиур, зуухны багаж, модон авдар' },
        { property: 'og:title', content: 'Хаан Тунамал Хийц' },
        { property: 'og:description', content: 'Монгол үндэсний хэв маягтай төмөр эдлэл' },
      ],
      link: [
        { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
        { rel: 'preconnect', href: 'https://fonts.googleapis.com' },
        { rel: 'preconnect', href: 'https://fonts.gstatic.com', crossorigin: '' },
        { rel: 'stylesheet', href: 'https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800&family=Noto+Sans+Mongolian&family=Playfair+Display:wght@400;500;600;700;800&display=swap' },
      ],
    },
    pageTransition: { name: 'page', mode: 'out-in' },
  },
  runtimeConfig: {
    public: {
      firebaseApiKey: '',
      firebaseAuthDomain: '',
      firebaseProjectId: '',
      firebaseStorageBucket: '',
      firebaseMessagingSenderId: '',
      firebaseAppId: '',
      cloudinaryCloudName: '',
      cloudinaryUploadPreset: '',
    },
  },
  tailwindcss: {
    cssPath: '~/assets/css/main.css',
  },
})
