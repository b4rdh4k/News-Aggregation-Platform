import { useUserStore } from '@/store/user';

export const fetchApi = async (url, options = {}, useGuardianAPI = false) => {
  const baseUrl = useGuardianAPI
    ? import.meta.env.VITE_GUARDIAN_API_URL
    : import.meta.env.VITE_API_URL;

  const userStore = useUserStore();
  let token = userStore.token;

  if (!token) {
    token = localStorage.getItem('token');
  }

  const headers = {
    'Content-Type': 'application/json',
    ...options.headers,
  };

  if (!useGuardianAPI && token) {
    headers.Authorization = `Bearer ${token}`;
  }

  try {
    const response = await fetch(`${baseUrl}${url}`, {
      ...options,
      headers,
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    console.error('Fetch error:', error);
    throw error;
  }
};
