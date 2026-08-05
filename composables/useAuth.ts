import type { User } from 'firebase/auth'

/**
 * Admin authentication. Client-only, and it pulls the Firebase Auth SDK in on
 * demand so public visitors never download it.
 *
 * `ensureAuthReady()` resolves after the first auth-state emission, letting the
 * route middleware wait for a persisted session to be restored instead of
 * bouncing a logged-in admin to /admin/login on hard refresh.
 */

let authReady: Promise<void> | null = null
let resolveAuthReady: (() => void) | null = null

export const useAuth = () => {
  const { isConfigured, load } = useFirebase()
  const user = useState<User | null>('auth-user', () => null)
  const loading = ref(false)
  const error = ref('')

  const isAuthenticated = computed(() => !!user.value)

  const ensureAuthReady = (): Promise<void> => {
    if (!import.meta.client || !isConfigured.value) return Promise.resolve()

    if (!authReady) {
      authReady = new Promise<void>((resolve) => { resolveAuthReady = resolve })
      // Bind the listener exactly once, after the SDK finishes loading.
      void (async () => {
        const fb = await load()
        if (!fb) return resolveAuthReady?.()
        const { onAuthStateChanged } = await import('firebase/auth')
        onAuthStateChanged(fb.auth, (u) => {
          user.value = u
          resolveAuthReady?.()
        })
      })()
    }

    return authReady
  }

  const login = async (email: string, password: string) => {
    const fb = await load()
    if (!fb) {
      error.value = 'Firebase тохируулаагүй байна'
      return false
    }

    loading.value = true
    error.value = ''
    try {
      const { signInWithEmailAndPassword } = await import('firebase/auth')
      await signInWithEmailAndPassword(fb.auth, email, password)
      return true
    } catch (e: any) {
      error.value = e?.code === 'auth/invalid-credential'
        ? 'Имэйл эсвэл нууц үг буруу байна'
        : 'Нэвтрэхэд алдаа гарлаа'
      return false
    } finally {
      loading.value = false
    }
  }

  const logout = async () => {
    const fb = await load()
    if (fb) {
      const { signOut } = await import('firebase/auth')
      await signOut(fb.auth)
    }
    user.value = null
    return navigateTo('/admin/login')
  }

  return {
    user,
    loading,
    error,
    isAuthenticated,
    isConfigured,
    ensureAuthReady,
    login,
    logout,
  }
}
