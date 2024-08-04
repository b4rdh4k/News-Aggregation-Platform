import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import { useToast } from 'vue-toastification'

export const useNewsStore = defineStore('news', () => {
  const toast = useToast()
  const allNews = ref([])
  const perPage = 12

  const fetchAllStories = async () => {
    try {
      const response = await fetch('https://89xx7tdx-5095.euw.devtunnels.ms/article/all')
      if (!response.ok) {
        throw new Error('Network response was not ok')
      }
      const data = await response.json()
      //console.log('Fetched data:', data) 
      
      if (data && data.value && Array.isArray(data.value.Value)) {
        allNews.value = data.value.Value
      } else {
        console.error('Fetched data does not contain the expected array structure:', data)
        toast.error('Failed to fetch stories. Unexpected data structure.')
        //return
      }
    } catch (error) {
      console.error('Error fetching all stories:', error)
      toast.error('Failed to fetch stories.')
    }
  }
  
  const visibleNews = computed(() => allNews.value.slice(0, perPage))
  const hasNews = computed(() => visibleNews.value.length > 0)

  return {
    allNews,
    visibleNews,
    hasNews,
    fetchAllStories
  }
})
