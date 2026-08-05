import { pageContentDefaults, type PageKey } from '../../../composables/usePageContentDefaults'

const VALID: PageKey[] = ['home', 'about', 'contact', 'products', 'shared']

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

export default defineEventHandler(async (event) => {
  const key = getRouterParam(event, 'key') as PageKey
  if (!VALID.includes(key)) {
    throw createError({ statusCode: 404, statusMessage: 'Unknown page key' })
  }

  const defaults = structuredClone(pageContentDefaults[key])
  const doc = await fetchPageContent(key)
  if (!doc) return defaults

  // `id` is an artefact of the REST decoder, not part of the content shape.
  const { id: _id, ...fields } = doc
  return deepMerge(defaults, fields)
})
