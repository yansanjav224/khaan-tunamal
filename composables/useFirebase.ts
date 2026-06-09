import type { Firestore } from 'firebase/firestore'
import type { FirebaseStorage } from 'firebase/storage'
import type { Auth } from 'firebase/auth'

export const useFirebase = () => {
  const nuxtApp = useNuxtApp()
  const firebase = nuxtApp.$firebase as { db: Firestore; storage: FirebaseStorage; auth: Auth } | undefined

  const isConfigured = computed(() => !!firebase)

  return {
    db: firebase?.db ?? null,
    storage: firebase?.storage ?? null,
    auth: firebase?.auth ?? null,
    isConfigured,
  }
}
