import { useCategoryStore } from './categoryStore'

export const initializeStores = () => {
  const categoryStore = useCategoryStore()

  categoryStore.fetchCategories()
}
