import { ref as storageRef, uploadBytes, getDownloadURL, deleteObject } from 'firebase/storage'

export const useImageUpload = () => {
  const { storage } = useFirebase()
  const uploading = ref(false)
  const progress = ref(0)

  const uploadImage = async (file: File): Promise<string> => {
    if (!storage) throw new Error('Firebase тохируулаагүй')

    uploading.value = true
    progress.value = 0
    try {
      const filename = `${Date.now()}_${file.name}`
      const fileRef = storageRef(storage, `products/${filename}`)
      await uploadBytes(fileRef, file)
      const url = await getDownloadURL(fileRef)
      progress.value = 100
      return url
    } finally {
      uploading.value = false
    }
  }

  const deleteImage = async (url: string) => {
    if (!storage) return
    try {
      const fileRef = storageRef(storage, url)
      await deleteObject(fileRef)
    } catch (e) {
      console.warn('Зураг устгахад алдаа:', e)
    }
  }

  return {
    uploading,
    progress,
    uploadImage,
    deleteImage,
  }
}
