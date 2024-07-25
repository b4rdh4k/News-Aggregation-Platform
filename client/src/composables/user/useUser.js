import { ref } from 'vue'

export function useUser() {
  const user = ref(null)

  const getUserInfo = async () => {
    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/auth/info`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json'
        }
      })
      const data = await response.json()

      if (response.ok) {
        user.value = data.user
      } else {
        throw new Error(data.message || 'Fetching user info failed')
      }
    } catch (error) {
      console.error('Get user info error:', error.message)
    }
  }

  return {
    user,
    getUserInfo
  }
}
