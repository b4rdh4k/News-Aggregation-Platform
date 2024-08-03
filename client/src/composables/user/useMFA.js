import { useToast } from 'vue-toastification'

export function useMFA() {
  const toast = useToast()

  const setupMFA = async (code) => {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/auth/setup-mfa?code=${encodeURIComponent(code)}`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          }
        }
      )
      const data = await response.json()

      if (response.ok) {
        toast.success('MFA setup successful!')
      } else {
        throw new Error(data.message || 'MFA setup failed')
      }
    } catch (error) {
      console.error('Setup MFA error:', error.message)
      toast.error('Failed to setup MFA')
    }
  }

  const verifyMFA = async (email, code) => {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/auth/verify-mfa?email=${encodeURIComponent(email)}&code=${encodeURIComponent(code)}`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          }
        }
      )
      const data = await response.json()

      if (response.ok) {
        toast.success('MFA verified successfully!')
      } else {
        throw new Error(data.message || 'MFA verification failed')
      }
    } catch (error) {
      console.error('Verify MFA error:', error.message)
      toast.error('Failed to verify MFA')
    }
  }

  const generateBackupCodes = async () => {
    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/auth/generate-backup-codes`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        }
      })
      const data = await response.json()

      if (response.ok) {
        console.log(data.backupCodes)
        toast.success('Backup codes generated successfully!')
      } else {
        throw new Error(data.message || 'Generating backup codes failed')
      }
    } catch (error) {
      console.error('Generate backup codes error:', error.message)
      toast.error('Failed to generate backup codes')
    }
  }

  return {
    setupMFA,
    verifyMFA,
    generateBackupCodes
  }
}
