import type { Firestore } from 'firebase/firestore'
import type { Auth } from 'firebase/auth'

/**
 * Lazily-loaded Firebase.
 *
 * Public pages read their data from the cached `/api/*` endpoints, so the
 * ~520 kB Firebase SDK is only downloaded on the admin routes that actually
 * write. `load()` dynamic-imports it on first use; `isConfigured` stays
 * synchronous and works during SSR because it only inspects runtime config.
 */

export interface FirebaseBundle {
  db: Firestore
  auth: Auth
}

let bundle: FirebaseBundle | null = null
let pending: Promise<FirebaseBundle | null> | null = null

export const useFirebase = () => {
  const config = useRuntimeConfig()

  const isConfigured = computed(
    () => !!config.public.firebaseApiKey && !!config.public.firebaseProjectId,
  )

  const load = async (): Promise<FirebaseBundle | null> => {
    if (bundle) return bundle
    if (!import.meta.client || !isConfigured.value) return null

    if (!pending) {
      pending = (async () => {
        const [{ initializeApp, getApps }, { getFirestore }, { getAuth }] = await Promise.all([
          import('firebase/app'),
          import('firebase/firestore'),
          import('firebase/auth'),
        ])

        const app = getApps().length
          ? getApps()[0]
          : initializeApp({
              apiKey: config.public.firebaseApiKey as string,
              authDomain: config.public.firebaseAuthDomain as string,
              projectId: config.public.firebaseProjectId as string,
              storageBucket: config.public.firebaseStorageBucket as string,
              messagingSenderId: config.public.firebaseMessagingSenderId as string,
              appId: config.public.firebaseAppId as string,
            })

        bundle = { db: getFirestore(app), auth: getAuth(app) }
        return bundle
      })()
    }

    return pending
  }

  /** Same as `load()` but throws — for write paths that cannot degrade. */
  const requireDb = async (): Promise<Firestore> => {
    const fb = await load()
    if (!fb) throw new Error('Firebase тохируулаагүй байна')
    return fb.db
  }

  return { isConfigured, load, requireDb }
}
