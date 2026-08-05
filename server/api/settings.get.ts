import type { SiteSettings } from '../../composables/useMockData'
import { defaultSiteSettings } from '../../composables/useMockData'

export default defineEventHandler(async (): Promise<SiteSettings> => {
  const doc = await fetchSettings()
  // Merge over defaults so a partial/legacy document can never leave `phones`
  // or `values` undefined — the footer and contact page map over both.
  return { ...defaultSiteSettings, ...(doc || {}) } as SiteSettings
})
