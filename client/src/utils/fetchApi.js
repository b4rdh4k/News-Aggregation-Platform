import { useUserStore } from '@/store/user'

export const fetchApi = async (
  url,
  options = { redirect: 'follow', credentials: 'include' },
  useGuardianAPI = false
) => {
  const baseUrl = useGuardianAPI
    ? import.meta.env.VITE_GUARDIAN_API_URL
    : import.meta.env.VITE_API_URL

  const userStore = useUserStore()
  const token = userStore.token || localStorage.getItem('token')

  const headers = {
    ...options.headers,
    'Content-Type': 'application/json'
  }

  if (!useGuardianAPI && token) {
    headers.Authorization = `Bearer ${token}`
  }

  try {
    const response = await fetch(`${baseUrl}${url}`, {
      ...options,
      headers,
      credentials: 'include' // Ensure credentials are included
    })

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`)
    }

    return await response.json()
  } catch (error) {
    console.error('Fetch error:', error)
    throw error
  }
}

