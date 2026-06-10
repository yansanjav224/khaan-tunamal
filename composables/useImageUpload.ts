export const useImageUpload = () => {
  const config = useRuntimeConfig()
  const uploading = ref(false)
  const progress = ref(0)

  const cloudName = config.public.cloudinaryCloudName as string
  const uploadPreset = config.public.cloudinaryUploadPreset as string

  const uploadImage = async (file: File): Promise<string> => {
    if (!cloudName || !uploadPreset) {
      throw new Error('Cloudinary тохируулаагүй')
    }

    uploading.value = true
    progress.value = 0
    try {
      const formData = new FormData()
      formData.append('file', file)
      formData.append('upload_preset', uploadPreset)
      formData.append('folder', 'khaan-tunamal')

      const res = await fetch(
        `https://api.cloudinary.com/v1_1/${cloudName}/image/upload`,
        { method: 'POST', body: formData }
      )

      if (!res.ok) throw new Error('Зураг upload хийхэд алдаа')

      const data = await res.json()
      progress.value = 100
      return data.secure_url
    } finally {
      uploading.value = false
    }
  }

  const deleteImage = async (url: string) => {
    // Cloudinary-с зураг устгахад server-side API шаардлагатай
    // Одоогоор зүгээр skip хийнэ — зураг Cloudinary-д үлдэнэ
    console.warn('Cloudinary зураг устгах: admin dashboard-аас устгана')
  }

  return {
    uploading,
    progress,
    uploadImage,
    deleteImage,
  }
}
