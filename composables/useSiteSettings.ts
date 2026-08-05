import type { SiteSettings } from './useMockData'
import { defaultSiteSettings } from './useMockData'

/**
 * Site-wide settings (company name, phones, Facebook URL, address).
 * The API merges the stored document over `defaultSiteSettings`, so consumers
 * can always assume `phones` and `values` are arrays.
 */
export const useSiteSettings = () => {
  const { requireDb, load } = useFirebase()

  const { data, status, refresh } = useAsyncData<SiteSettings>(
    'settings',
    () => $fetch<SiteSettings>('/api/settings'),
    {
      default: () => ({ ...defaultSiteSettings }),
      getCachedData: (key, nuxtApp) => nuxtApp.payload.data[key] as SiteSettings | undefined,
    },
  )

  const settings = data as Ref<SiteSettings>
  const loading = computed(() => status.value === 'pending')

  /** Bypass the server cache — used by the admin settings page. */
  const refreshLive = async () => {
    const fb = await load()
    if (!fb) return refresh()
    const { doc, getDoc } = await import('firebase/firestore')
    const snap = await getDoc(doc(fb.db, 'settings', 'site'))
    settings.value = snap.exists()
      ? { ...defaultSiteSettings, ...(snap.data() as Partial<SiteSettings>) }
      : { ...defaultSiteSettings }
    return settings.value
  }

  const updateSettings = async (payload: Partial<SiteSettings>) => {
    const db = await requireDb()
    const { doc, setDoc } = await import('firebase/firestore')
    const updated = { ...settings.value, ...payload }
    await setDoc(doc(db, 'settings', 'site'), updated)
    settings.value = updated
  }

  return { settings, loading, refresh, refreshLive, updateSettings }
}
