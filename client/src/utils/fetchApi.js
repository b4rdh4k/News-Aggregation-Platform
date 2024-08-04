import { useUserStore } from '@/store/user';

export const fetchApi = async (url, options = {redirect: "follow", credentials: "include"}) => {
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

    console.log('Response status:', response.status);
    console.log('Response headers:', response.headers);
    
    if (!response.ok) {
      const responseBody = await response.text(); // Read response body for debugging
      console.error('Response body:', responseBody);
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    console.log('response', response);
    return await response.json();
  } catch (error) {
    console.error('Fetch error:', error);
    throw error;
  }
};
