import type { Product } from './useMockData'

/**
 * Products.
 *
 * Reads go through `/api/products`, which is rendered on the server and cached
 * — that is what puts real product data in the SSR HTML (for Google/Facebook)
 * and keeps Firestore reads proportional to time rather than to visitors.
 *
 * Writes and the admin's own reads use the Firebase SDK directly: the admin
 * must see their change immediately, not after the server cache expires.
 */
export const useProducts = () => {
  const { requireDb, load } = useFirebase()

  const asyncData = useAsyncData<Product[]>(
    'products',
    () => $fetch<Product[]>('/api/products'),
    {
      default: () => [] as Product[],
      // Reuse the payload across client-side navigation instead of refetching.
      getCachedData: (key, nuxtApp) => nuxtApp.payload.data[key] as Product[] | undefined,
    },
  )
  const { data, status, refresh } = asyncData

  /** Await the initial fetch — needed before deciding a product is missing. */
  const ready = () => Promise.resolve(asyncData)

  const products = data as Ref<Product[]>
  const loading = computed(() => status.value === 'pending')

  const featuredProducts = computed(() =>
    products.value.filter(p => p.featured).sort((a, b) => (a.order || 0) - (b.order || 0)),
  )

  const findProduct = (id: string) => products.value.find(p => p.id === id) || null

  /** Bypass the server cache — used by the admin after a write. */
  const refreshLive = async () => {
    const fb = await load()
    if (!fb) return refresh()
    const { collection, getDocs } = await import('firebase/firestore')
    const snap = await getDocs(collection(fb.db, 'products'))
    products.value = snap.docs
      .map(d => ({ id: d.id, ...d.data() } as Product))
      .sort((a, b) => (a.order || 0) - (b.order || 0))
    return products.value
  }

  const createProduct = async (data: Omit<Product, 'id'>) => {
    const db = await requireDb()
    const { collection, addDoc } = await import('firebase/firestore')
    const ref = await addDoc(collection(db, 'products'), data)
    return ref.id
  }

  const updateProduct = async (id: string, data: Partial<Product>) => {
    const db = await requireDb()
    const { doc, updateDoc } = await import('firebase/firestore')
    await updateDoc(doc(db, 'products', id), data)
  }

  const deleteProduct = async (id: string) => {
    const db = await requireDb()
    const { doc, deleteDoc } = await import('firebase/firestore')
    await deleteDoc(doc(db, 'products', id))
  }

  return {
    products,
    loading,
    ready,
    featuredProducts,
    findProduct,
    refresh,
    refreshLive,
    createProduct,
    updateProduct,
    deleteProduct,
  }
}
