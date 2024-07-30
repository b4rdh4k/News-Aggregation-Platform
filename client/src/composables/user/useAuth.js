import { ref } from 'vue'
import { useToast } from 'vue-toastification'
import VueJwtDecode from 'vue-jwt-decode'

export function useAuth() {
  const token = ref(localStorage.getItem('token') || null)
  const decodedToken = ref(token.value ? VueJwtDecode.decode(token.value) : null)
  const toast = useToast()

  const login = async (credentials) => {
    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/auth/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(credentials)
      })
      const data = await response.json()

      if (response.ok) {
        token.value = data.accessToken
        localStorage.setItem('token', data.accessToken)
        decodedToken.value = VueJwtDecode.decode(data.accessToken)
      } else {
        throw new Error(data.message || 'Login failed')
      }
    } catch (error) {
      console.error('Login error:', error.message)
      throw error
    }
  }

  const register = async (userInfo) => {
    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/auth/register`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(userInfo)
      })
      const data = await response.json()

      if (response.ok) {
        token.value = data.accessToken
        localStorage.setItem('token', data.accessToken)
        decodedToken.value = VueJwtDecode.decode(data.accessToken)
      } else {
        throw new Error(data.message || 'Registration failed')
      }
    } catch (error) {
      console.error('Registration error:', error.message)
    }
  }

  const logout = () => {
    token.value = null
    decodedToken.value = null
    localStorage.removeItem('token')
  }

  const refreshToken = async () => {
    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/auth/refresh`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        }
      })
      const data = await response.json()

      if (response.ok) {
        token.value = data.accessToken
        localStorage.setItem('token', data.accessToken)
        decodedToken.value = VueJwtDecode.decode(data.accessToken)
      } else {
        throw new Error(data.message || 'Token refresh failed')
      }
    } catch (error) {
      console.error('Refresh token error:', error.message)
    }
  }

  const forgotPassword = async (email) => {
    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/auth/forgot-password`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ email })
      })
      const data = await response.json()

      if (response.ok) {
        toast.success('Operation successful!')
      } else {
        throw new Error(data.message || 'Forgot password request failed')
      }
    } catch (error) {
      console.error('Forgot password error:', error.message)
    }
  }

  const changePassword = async (newPassword) => {
    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/auth/change-password`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ newPassword })
      })
      const data = await response.json()

      if (response.ok) {
        toast.success('Password changed successfully!')
      } else {
        throw new Error(data.message || 'Change password failed')
      }
    } catch (error) {
      console.error('Change password error:', error.message)
    }
  }

  return {
    token,
    decodedToken,
    login,
    register,
    logout,
    refreshToken,
    forgotPassword,
    changePassword
  }
}
