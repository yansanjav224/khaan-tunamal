import {
  collection,
  doc,
  getDocs,
  getDoc,
  addDoc,
  updateDoc,
  deleteDoc,
  query,
  where,
  orderBy,
} from 'firebase/firestore'
import { mockProducts, type Product } from './useMockData'

export const useProducts = () => {
  const { db, isConfigured } = useFirebase()
  const products = ref<Product[]>([])
  const product = ref<Product | null>(null)
  const loading = ref(false)

  const getProducts = async (categoryFilter?: string) => {
    loading.value = true
    try {
      if (!isConfigured.value || !db) {
        products.value = categoryFilter
          ? mockProducts.filter(p => p.category === categoryFilter)
          : [...mockProducts]
        return products.value
      }

      const col = collection(db, 'products')
      let q = categoryFilter
        ? query(col, where('category', '==', categoryFilter), orderBy('order'))
        : query(col, orderBy('order'))

      const snap = await getDocs(q)
      products.value = snap.docs.map(d => ({ id: d.id, ...d.data() } as Product))
      return products.value
    } finally {
      loading.value = false
    }
  }

  const getProduct = async (id: string) => {
    loading.value = true
    try {
      if (!isConfigured.value || !db) {
        product.value = mockProducts.find(p => p.id === id) || null
        return product.value
      }

      const snap = await getDoc(doc(db, 'products', id))
      product.value = snap.exists() ? { id: snap.id, ...snap.data() } as Product : null
      return product.value
    } finally {
      loading.value = false
    }
  }

  const getFeaturedProducts = async () => {
    loading.value = true
    try {
      if (!isConfigured.value || !db) {
        products.value = mockProducts.filter(p => p.featured)
        return products.value
      }

      const q = query(
        collection(db, 'products'),
        where('featured', '==', true),
      )
      const snap = await getDocs(q)
      products.value = snap.docs
        .map(d => ({ id: d.id, ...d.data() } as Product))
        .sort((a, b) => (a.order || 0) - (b.order || 0))
      return products.value
    } finally {
      loading.value = false
    }
  }

  const createProduct = async (data: Omit<Product, 'id'>) => {
    if (!db) throw new Error('Firebase тохируулаагүй')
    const docRef = await addDoc(collection(db, 'products'), data)
    return docRef.id
  }

  const updateProduct = async (id: string, data: Partial<Product>) => {
    if (!db) throw new Error('Firebase тохируулаагүй')
    await updateDoc(doc(db, 'products', id), data)
  }

  const deleteProduct = async (id: string) => {
    if (!db) throw new Error('Firebase тохируулаагүй')
    await deleteDoc(doc(db, 'products', id))
  }

  return {
    products,
    product,
    loading,
    getProducts,
    getProduct,
    getFeaturedProducts,
    createProduct,
    updateProduct,
    deleteProduct,
  }
}
