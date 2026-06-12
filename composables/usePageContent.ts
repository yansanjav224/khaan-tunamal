import { doc, getDoc, setDoc } from 'firebase/firestore'
import type {
  HomeContent, AboutContent, ContactContent,
  ProductsContent, SharedContent,
} from './usePageContentDefaults'
import {
  defaultHomeContent, defaultAboutContent, defaultContactContent,
  defaultProductsContent, defaultSharedContent,
} from './usePageContentDefaults'

type PageContentMap = {
  home: HomeContent
  about: AboutContent
  contact: ContactContent
  products: ProductsContent
  shared: SharedContent
}

type PageKey = keyof PageContentMap

const defaultsMap: Record<PageKey, any> = {
  home: defaultHomeContent,
  about: defaultAboutContent,
  contact: defaultContactContent,
  products: defaultProductsContent,
  shared: defaultSharedContent,
}

const cache = new Map<PageKey, { data: Ref<any>; loaded: boolean }>()

function getCache<K extends PageKey>(key: K) {
  if (!cache.has(key)) {
    cache.set(key, {
      data: ref(structuredClone(defaultsMap[key])),
      loaded: false,
    })
  }
  return cache.get(key)!
}

export function usePageContent<K extends PageKey>(pageKey: K) {
  const { db, isConfigured } = useFirebase()
  const loading = ref(false)
  const entry = getCache(pageKey)
  const content = entry.data as Ref<PageContentMap[K]>

  const load = async () => {
    if (entry.loaded) return content.value

    if (!isConfigured.value || !db) {
      content.value = structuredClone(defaultsMap[pageKey])
      entry.loaded = true
      return content.value
    }

    loading.value = true
    try {
      const snap = await getDoc(doc(db, 'pageContent', pageKey))
      if (snap.exists()) {
        // Deep merge: keep defaults for any missing keys
        content.value = deepMerge(structuredClone(defaultsMap[pageKey]), snap.data()) as PageContentMap[K]
      } else {
        content.value = structuredClone(defaultsMap[pageKey])
      }
      entry.loaded = true
    } catch (e) {
      console.error(`[PageContent] ${pageKey} уншихад алдаа:`, e)
      content.value = structuredClone(defaultsMap[pageKey])
    } finally {
      loading.value = false
    }
    return content.value
  }

  const save = async (data: PageContentMap[K]) => {
    if (!isConfigured.value || !db) {
      throw new Error('Firebase тохируулаагүй байна')
    }

    loading.value = true
    try {
      await setDoc(doc(db, 'pageContent', pageKey), data as any)
      content.value = data
    } catch (e) {
      console.error(`[PageContent] ${pageKey} хадгалахад алдаа:`, e)
      throw e
    } finally {
      loading.value = false
    }
  }

  const refresh = () => {
    entry.loaded = false
    return load()
  }

  return { content, loading, load, save, refresh }
}

// Convenience composables for each page
export const useHomeContent = () => usePageContent('home')
export const useAboutContent = () => usePageContent('about')
export const useContactContent = () => usePageContent('contact')
export const useProductsContent = () => usePageContent('products')
export const useSharedContent = () => usePageContent('shared')

// Deep merge utility — arrays are replaced, not merged
function deepMerge(target: any, source: any): any {
  if (!source || typeof source !== 'object') return target
  if (Array.isArray(source)) return source

  const result = { ...target }
  for (const key of Object.keys(source)) {
    if (
      source[key] &&
      typeof source[key] === 'object' &&
      !Array.isArray(source[key]) &&
      target[key] &&
      typeof target[key] === 'object' &&
      !Array.isArray(target[key])
    ) {
      result[key] = deepMerge(target[key], source[key])
    } else if (source[key] !== undefined) {
      result[key] = source[key]
    }
  }
  return result
}
