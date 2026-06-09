import {
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  type User,
} from 'firebase/auth'

export const useAuth = () => {
  const { auth, isConfigured } = useFirebase()
  const user = useState<User | null>('auth-user', () => null)
  const loading = ref(false)
  const error = ref('')

  const isAuthenticated = computed(() => !!user.value)

  // Auth state listener
  if (import.meta.client && auth) {
    onAuthStateChanged(auth, (u) => {
      user.value = u
    })
  }

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
    if (!auth) return
    await signOut(auth)
    user.value = null
    navigateTo('/admin/login')
  }

  return {
    user,
    loading,
    error,
    isAuthenticated,
    isConfigured,
    login,
    logout,
  }
}
