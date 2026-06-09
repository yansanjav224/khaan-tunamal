export default defineNuxtRouteMiddleware((to) => {
  const { isAuthenticated, isConfigured } = useAuth()

  // Firebase тохируулаагүй бол admin руу нэвтрэхийг зөвшөөрнө (dev mode)
  if (!isConfigured.value) return

  if (!isAuthenticated.value && to.path !== '/admin/login') {
    return navigateTo('/admin/login')
  }
})
