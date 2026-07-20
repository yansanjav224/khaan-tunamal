import {
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  type User,
} from 'firebase/auth'

// Bound once on the client. `authReadyPromise` resolves on the first auth-state
// emission so route middleware can wait for Firebase to restore a persisted
// session before deciding whether to redirect to /admin/login.
let authReadyPromise: Promise<void> | null = null
let resolveAuthReady: (() => void) | null = null
let listenerBound = false

export const useAuth = () => {
  const { auth, isConfigured } = useFirebase()
  const user = useState<User | null>('auth-user', () => null)
  const loading = ref(false)
  const error = ref('')

  const isAuthenticated = computed(() => !!user.value)

  // Auth state listener — bind exactly once (was re-subscribing on every call).
  if (import.meta.client && auth && !listenerBound) {
    listenerBound = true
    authReadyPromise = new Promise<void>((resolve) => { resolveAuthReady = resolve })
    onAuthStateChanged(auth, (u) => {
      user.value = u
      resolveAuthReady?.()
    })
  }

  const ensureAuthReady = () => authReadyPromise ?? Promise.resolve()

  const login = async (email: string, password: string) => {
    if (!auth) {
      error.value = 'Firebase тохируулаагүй байна'
      return false
    }
    loading.value = true
    error.value = ''
    try {
      await signInWithEmailAndPassword(auth, email, password)
      return true
    } catch (e: any) {
      error.value = e.code === 'auth/invalid-credential'
        ? 'Имэйл эсвэл нууц үг буруу байна'
        : 'Нэвтрэхэд алдаа гарлаа'
      return false
    } finally {
      loading.value = false
    }
  }

  const logout = async () => {
    if (auth) await signOut(auth)
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
