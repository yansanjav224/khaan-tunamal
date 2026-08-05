import type { Product } from '../../composables/useMockData'

export default defineEventHandler(async (): Promise<Product[]> => {
  return (await fetchProducts()) as Product[]
})
