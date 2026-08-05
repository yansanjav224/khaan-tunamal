import type { Category } from '../../composables/useMockData'

export default defineEventHandler(async (): Promise<Category[]> => {
  return (await fetchCategories()) as Category[]
})
