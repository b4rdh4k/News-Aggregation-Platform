import { useUserStore } from '../store/user';

export const fetchApi = async (url, options = {}) => {
  const userStore = useUserStore();
  const token = userStore.token || localStorage.getItem('token');

  const headers = {
    'Content-Type': 'application/json',
    ...options.headers,
    'Authorization': token ? `Bearer ${token}` : undefined,
  };

  const response = await fetch(`${import.meta.env.VITE_API_URL}${url}`, {
    ...options,
    headers,
  });

  if (response.status === 401) {
    console.error('Unauthorized. Redirecting to login...');
  }

  return response.json();
};
