import { ref } from 'vue';
import { useAuth } from '@/composables/user/useAuth';

export function useUser() {
  const user = ref(null);
  const { token, refreshToken, logout } = useAuth();

  const getUserInfo = async () => {
    try {
      const fetchUserInfo = async (currentToken) => {
        const response = await fetch(`${import.meta.env.VITE_API_URL}/auth/info`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${currentToken}`,
          },
        });
        const data = await response.json();

        if (response.ok) {
          user.value = data.user;
        } else {
          throw new Error(data.message || 'Fetching user info failed');
        }
      };

      try {
        await fetchUserInfo(token.value);
      } catch (error) {
        if (error.message.includes('Token expired')) {
          await refreshToken();
          await fetchUserInfo(token.value);
        } else {
          throw error;
        }
      }
    } catch (error) {
      console.error('Get user info error:', error.message);
      logout(); // Optionally log the user out if the error is critical
    }
  }

  return {
    user,
    getUserInfo
  }
}
