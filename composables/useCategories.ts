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

export const useCategories = () => {
  const { db, isConfigured } = useFirebase()
  const categories = ref<Category[]>([])
  const loading = ref(false)

  const getCategories = async () => {
    loading.value = true
    try {
      if (!isConfigured.value || !db) {
        categories.value = [...mockCategories]
        return categories.value
      }

      const q = query(collection(db, 'categories'), orderBy('order'))
      const snap = await getDocs(q)
      categories.value = snap.docs.map(d => ({ id: d.id, ...d.data() } as Category))
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
