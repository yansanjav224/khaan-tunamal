/**
 * Google Analytics 4 — free, and entirely opt-in.
 *
 * Nothing is loaded unless NUXT_PUBLIC_GA_MEASUREMENT_ID is set, so the site
 * ships zero third-party JavaScript by default. GA4 was chosen over Vercel Web
 * Analytics because Vercel's free tier caps monthly events while GA4 does not.
 */
export default defineNuxtPlugin(() => {
  const id = String(useRuntimeConfig().public.gaMeasurementId || '')
  if (!id) return

  const router = useRouter()

  useHead({
    script: [
      { src: `https://www.googletagmanager.com/gtag/js?id=${id}`, async: true },
      {
        innerHTML: `window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments)}gtag('js',new Date());gtag('config','${id}',{send_page_view:false});`,
      },
    ],
  })

  // SPA navigation doesn't reload the page, so page views are sent manually.
  const send = (path: string) => {
    ;(window as any).gtag?.('event', 'page_view', { page_path: path, page_location: location.href })
  }

  router.afterEach(to => send(to.fullPath))
  send(router.currentRoute.value.fullPath)
})
