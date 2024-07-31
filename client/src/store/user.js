import { defineStore } from 'pinia'
import { useAuth } from '@/composables/user/useAuth'
import { useUser } from '@/composables/user/useUser'
import { useMFA } from '@/composables/user/useMFA'

export const useUserStore = defineStore('user', () => {
  const {
    token,
    decodedToken,
    login,
    register,
    logout,
    refreshToken,
    forgotPassword,
    changePassword
  } = useAuth()
  const { user, getUserInfo } = useUser()
  const { setupMFA, verifyMFA, generateBackupCodes } = useMFA()

  const fetchUserInfo = async () => {
    await getUserInfo(); // Ensure this method fetches and sets the user data in `user`
  };

  return {
    token,
    decodedToken,
    user,
    login,
    register,
    logout,
    refreshToken,
    forgotPassword,
    changePassword,
    fetchUserInfo,
    getUserInfo,
    setupMFA,
    verifyMFA,
    generateBackupCodes
  }
})
