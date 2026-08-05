import type { Category } from './useMockData'

/** Categories — same read/write split as `useProducts`. */
export const useCategories = () => {
  const { requireDb, load } = useFirebase()

  const { data, status, refresh } = useAsyncData<Category[]>(
    'categories',
    () => $fetch<Category[]>('/api/categories'),
    {
      default: () => [] as Category[],
      getCachedData: (key, nuxtApp) => nuxtApp.payload.data[key] as Category[] | undefined,
    },
  )

  const categories = data as Ref<Category[]>
  const loading = computed(() => status.value === 'pending')

  const categoryName = (id: string) => categories.value.find(c => c.id === id)?.name || ''

  const refreshLive = async () => {
    const fb = await load()
    if (!fb) return refresh()
    const { collection, getDocs } = await import('firebase/firestore')
    const snap = await getDocs(collection(fb.db, 'categories'))
    categories.value = snap.docs
      .map(d => ({ id: d.id, ...d.data() } as Category))
      .sort((a, b) => (a.order || 0) - (b.order || 0))
    return categories.value
  }

  const createCategory = async (data: Omit<Category, 'id'>) => {
    const db = await requireDb()
    const { collection, addDoc } = await import('firebase/firestore')
    const ref = await addDoc(collection(db, 'categories'), data)
    return ref.id
  }

  const updateCategory = async (id: string, data: Partial<Category>) => {
    const db = await requireDb()
    const { doc, updateDoc } = await import('firebase/firestore')
    await updateDoc(doc(db, 'categories', id), data)
  }

  const deleteCategory = async (id: string) => {
    const db = await requireDb()
    const { doc, deleteDoc } = await import('firebase/firestore')
    await deleteDoc(doc(db, 'categories', id))
  }

  return {
    categories,
    loading,
    categoryName,
    refresh,
    refreshLive,
    createCategory,
    updateCategory,
    deleteCategory,
  }
}
