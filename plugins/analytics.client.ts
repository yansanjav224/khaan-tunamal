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

  const w = window as any

  // `dataLayer` and `gtag` are defined here rather than in an injected inline
  // script. useHead only queues that script — it does not run during plugin
  // setup — so the first page view fired against an undefined `gtag` and was
  // silently dropped. Every visitor's landing page, the one that says which
  // search brought them, was missing from the reports.
  w.dataLayer = w.dataLayer || []
  w.gtag = function gtag() { w.dataLayer.push(arguments) }
  w.gtag('js', new Date())
  // Automatic page views are off: gtag cannot see Vue Router, so it would
  // report the landing page and then nothing for the rest of the visit.
  // `send` below is the single source of page views.
  w.gtag('config', id, { send_page_view: false })

  useHead({
    script: [{ src: `https://www.googletagmanager.com/gtag/js?id=${id}`, async: true }],
  })

  const router = useRouter()

  // Whether afterEach fires for the route the visitor arrived on depends on
  // where plugin setup lands relative to the router's first navigation, and
  // that is not a detail worth betting the numbers on. Both paths are wired up
  // and the last-sent guard makes the overlap harmless — the alternative is a
  // landing page counted twice or not at all, and neither shows up as an error.
  let lastSent = ''

  const send = (path: string) => {
    // The owner's own trips through the admin panel are not traffic.
    if (path.startsWith('/admin')) return
    if (path === lastSent) return
    lastSent = path
    w.gtag('event', 'page_view', {
      page_path: path,
      page_location: location.href,
      page_title: document.title,
    })
  }

  send(router.currentRoute.value.fullPath)
  router.afterEach(to => send(to.fullPath))
})
