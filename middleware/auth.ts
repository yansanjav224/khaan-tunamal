export default defineNuxtRouteMiddleware(async (to) => {
  const { isAuthenticated, isConfigured, ensureAuthReady } = useAuth()

  // Firebase тохируулаагүй бол admin руу нэвтрэхийг зөвшөөрнө (dev mode)
  if (!isConfigured.value) return

  // Wait for Firebase to restore the persisted session before deciding, so a
  // logged-in admin isn't bounced to /admin/login on hard refresh / deep-link.
  if (import.meta.client) await ensureAuthReady()

  if (!isAuthenticated.value && to.path !== '/admin/login') {
    return navigateTo('/admin/login')
  }
})
