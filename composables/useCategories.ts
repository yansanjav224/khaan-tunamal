import {
  collection,
  doc,
  getDocs,
  addDoc,
  updateDoc,
  deleteDoc,
  query,
  orderBy,
} from 'firebase/firestore'
import { mockCategories, type Category } from './useMockData'

// Shared state — persists across page navigations
const categories = ref<Category[]>([])
const loading = ref(false)

export const useCategories = () => {
  const { db, isConfigured } = useFirebase()

  const getCategories = async () => {
    loading.value = true
    try {
      if (!isConfigured.value || !db) {
        categories.value = [...mockCategories]
        return categories.value
      }

      const snap = await getDocs(collection(db, 'categories'))
      categories.value = snap.docs
        .map(d => ({ id: d.id, ...d.data() } as Category))
        .sort((a, b) => (a.order || 0) - (b.order || 0))
      return categories.value
    } catch (e) {
      console.error('[Categories] Уншихад алдаа:', e)
      return categories.value
    } finally {
      loading.value = false
    }
  }

  const createCategory = async (data: Omit<Category, 'id'>) => {
    if (!db) throw new Error('Firebase тохируулаагүй')
    const docRef = await addDoc(collection(db, 'categories'), data)
    return docRef.id
  }

  const updateCategory = async (id: string, data: Partial<Category>) => {
    if (!db) throw new Error('Firebase тохируулаагүй')
    await updateDoc(doc(db, 'categories', id), data)
  }

  const deleteCategory = async (id: string) => {
    if (!db) throw new Error('Firebase тохируулаагүй')
    await deleteDoc(doc(db, 'categories', id))
  }

  return {
    categories,
    loading,
    getCategories,
    createCategory,
    updateCategory,
    deleteCategory,
  }
}
