import { useUserStore } from '@/store/user';

export const fetchApi = async (url, options = {}) => {
  const baseUrl = import.meta.env.VITE_API_URL; 

  const userStore = useUserStore();
  const token = userStore.token || localStorage.getItem('token');
  console.log('Token used:', token); // Debug line to check the token value

  const headers = {
    ...options.headers,
    'Content-Type': 'application/json',
  };

  if (token) {
    headers.Authorization = `Bearer ${token}`;
  }
  console.log('API URL:', `${baseUrl}${url}`); // Debug line to check the full URL


  try {
    const response = await fetch(`${baseUrl}${url}`, {
      ...options,
      headers,
      credentials: 'include',
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    console.log('response', response);
    return await response.json();
  } catch (error) {
    console.error('Fetch error:', error);
    throw error;
  }
};
