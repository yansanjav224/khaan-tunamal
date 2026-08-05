/**
 * Firestore REST reader for server-side rendering.
 *
 * Why REST and not firebase-admin: the public collections are world-readable
 * (see firestore.rules), so a service-account key is unnecessary. That keeps
 * the project on Firebase's free Spark plan and avoids shipping admin
 * credentials to Vercel.
 *
 * Why the results are cached: Spark allows 50k document reads/day. A full page
 * render costs ~25 reads (18 products + 5 categories + settings + pageContent).
 * Caching here, combined with ISR in nuxt.config, decouples read volume from
 * visitor count — reads scale with time, not traffic.
 */

type FsValue = Record<string, any>

function decode(v: FsValue): any {
  if (v == null) return null
  if ('stringValue' in v) return v.stringValue
  if ('integerValue' in v) return Number(v.integerValue)
  if ('doubleValue' in v) return Number(v.doubleValue)
  if ('booleanValue' in v) return v.booleanValue
  if ('nullValue' in v) return null
  if ('timestampValue' in v) return v.timestampValue
  if ('arrayValue' in v) return (v.arrayValue?.values || []).map(decode)
  if ('mapValue' in v) return decodeFields(v.mapValue?.fields || {})
  return null
}

function decodeFields(fields: Record<string, FsValue>): Record<string, any> {
  const out: Record<string, any> = {}
  for (const [k, v] of Object.entries(fields)) out[k] = decode(v)
  return out
}

function endpoint(path: string) {
  const { public: pub } = useRuntimeConfig()
  const projectId = pub.firebaseProjectId as string
  const apiKey = pub.firebaseApiKey as string
  if (!projectId || !apiKey) return null
  const base = `https://firestore.googleapis.com/v1/projects/${projectId}/databases/(default)/documents`
  return { url: `${base}/${path}`, apiKey }
}

/** Read every document in a collection, following pagination. */
async function readCollection(name: string): Promise<Array<Record<string, any>>> {
  const ep = endpoint(name)
  if (!ep) return []

  const docs: Array<Record<string, any>> = []
  let pageToken: string | undefined

  do {
    const res: any = await $fetch(ep.url, {
      query: { key: ep.apiKey, pageSize: 300, ...(pageToken ? { pageToken } : {}) },
    })
    for (const d of res?.documents || []) {
      docs.push({ id: String(d.name).split('/').pop(), ...decodeFields(d.fields || {}) })
    }
    pageToken = res?.nextPageToken
  } while (pageToken)

  return docs
}

/** Read a single document. Returns null when it does not exist. */
async function readDoc(path: string): Promise<Record<string, any> | null> {
  const ep = endpoint(path)
  if (!ep) return null
  try {
    const d: any = await $fetch(ep.url, { query: { key: ep.apiKey } })
    if (!d?.fields) return null
    return { id: String(d.name).split('/').pop(), ...decodeFields(d.fields) }
  } catch {
    // 404 (no doc) and 403 (rules) both mean "fall back to defaults".
    return null
  }
}

const CACHE = { maxAge: 900, swr: true, group: 'firestore' } as const

export const fetchProducts = defineCachedFunction(
  async () => {
    const docs = await readCollection('products')
    return docs.sort((a, b) => (a.order || 0) - (b.order || 0))
  },
  { ...CACHE, name: 'products', getKey: () => 'all' },
)

export const fetchCategories = defineCachedFunction(
  async () => {
    const docs = await readCollection('categories')
    return docs.sort((a, b) => (a.order || 0) - (b.order || 0))
  },
  { ...CACHE, name: 'categories', getKey: () => 'all' },
)

export const fetchSettings = defineCachedFunction(
  async () => readDoc('settings/site'),
  { ...CACHE, name: 'settings', getKey: () => 'site' },
)

export const fetchPageContent = defineCachedFunction(
  async (key: string) => readDoc(`pageContent/${key}`),
  { ...CACHE, name: 'pageContent', getKey: (key: string) => key },
)
