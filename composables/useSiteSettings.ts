import { doc, getDoc, setDoc } from 'firebase/firestore'
import type { SiteSettings } from './useMockData'
import { mockSiteSettings } from './useMockData'

const siteSettings = ref<SiteSettings>(mockSiteSettings)
const loaded = ref(false)

export const useSiteSettings = () => {
  const { db, isConfigured } = useFirebase()
  const loading = ref(false)

  const getSettings = async () => {
    if (!isConfigured.value || !db) {
      siteSettings.value = mockSiteSettings
      loaded.value = true
      return siteSettings.value
    }

    if (loaded.value) return siteSettings.value

    loading.value = true
    try {
      const snap = await getDoc(doc(db, 'settings', 'site'))
      if (snap.exists()) {
        // Merge over defaults so a partial/legacy doc can't leave phones/values/etc.
        // undefined (AppFooter + contact page call settings.phones.map on every page).
        siteSettings.value = { ...mockSiteSettings, ...(snap.data() as Partial<SiteSettings>) }
      } else {
        siteSettings.value = mockSiteSettings
      }
      loaded.value = true
    } catch (e) {
      console.error('[SiteSettings] Уншихад алдаа:', e)
      siteSettings.value = mockSiteSettings
    } finally {
      loading.value = false
    }
    return siteSettings.value
  }

  const updateSettings = async (data: Partial<SiteSettings>) => {
    if (!isConfigured.value || !db) {
      throw new Error('Firebase тохируулаагүй байна')
    }

    loading.value = true
    try {
      const updated = { ...siteSettings.value, ...data }
      await setDoc(doc(db, 'settings', 'site'), updated)
      siteSettings.value = updated
    } catch (e) {
      console.error('[SiteSettings] Хадгалахад алдаа:', e)
      throw e
    } finally {
      loading.value = false
    }
  }

  const refresh = () => {
    loaded.value = false
    return getSettings()
  }

  return {
    settings: siteSettings,
    loading,
    getSettings,
    updateSettings,
    refresh,
  }
}
