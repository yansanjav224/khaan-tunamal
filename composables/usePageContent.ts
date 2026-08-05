import type { PageKey, PageContentMap } from './usePageContentDefaults'
import { pageContentDefaults } from './usePageContentDefaults'

/**
 * Admin-editable page copy, stored one document per page in Firestore
 * `pageContent/{key}`.
 *
 * `/api/page-content/[key]` deep-merges the stored document over the defaults
 * server-side, so the SSR HTML already contains the final copy and a partially
 * filled document can never blank out a section.
 */
export function usePageContent<K extends PageKey>(pageKey: K) {
  const { requireDb, load } = useFirebase()

  const { data, status, refresh } = useAsyncData<PageContentMap[K]>(
    `page-content:${pageKey}`,
    () => $fetch<PageContentMap[K]>(`/api/page-content/${pageKey}`),
    {
      default: () => structuredClone(pageContentDefaults[pageKey]),
      getCachedData: (key, nuxtApp) => nuxtApp.payload.data[key] as PageContentMap[K] | undefined,
    },
  )

  const content = data as Ref<PageContentMap[K]>
  const loading = computed(() => status.value === 'pending')

  /** Bypass the server cache — used by the admin page editor. */
  const refreshLive = async () => {
    const fb = await load()
    if (!fb) return refresh()
    const { doc, getDoc } = await import('firebase/firestore')
    const snap = await getDoc(doc(fb.db, 'pageContent', pageKey))
    const defaults = structuredClone(pageContentDefaults[pageKey])
    content.value = snap.exists()
      ? (deepMerge(defaults, snap.data()) as PageContentMap[K])
      : defaults
    return content.value
  }

  const save = async (payload: PageContentMap[K]) => {
    const db = await requireDb()
    const { doc, setDoc } = await import('firebase/firestore')
    await setDoc(doc(db, 'pageContent', pageKey), payload as any)
    content.value = payload
  }

  return { content, loading, refresh, refreshLive, save }
}

export const useHomeContent = () => usePageContent('home')
export const useAboutContent = () => usePageContent('about')
export const useContactContent = () => usePageContent('contact')
export const useProductsContent = () => usePageContent('products')
export const useSharedContent = () => usePageContent('shared')

/** Deep merge — objects merge key-by-key, arrays are replaced wholesale. */
function deepMerge(target: any, source: any): any {
  if (!source || typeof source !== 'object') return target
  if (Array.isArray(source)) return source

  const result = { ...target }
  for (const key of Object.keys(source)) {
    const s = source[key]
    const t = target?.[key]
    if (s && typeof s === 'object' && !Array.isArray(s) && t && typeof t === 'object' && !Array.isArray(t)) {
      result[key] = deepMerge(t, s)
    } else if (s !== undefined) {
      result[key] = s
    }
  }
  return result
}
