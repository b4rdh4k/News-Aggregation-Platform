import { useUserStore } from '../store/user';

export const fetchApi = async (url, options = {}) => {
  const userStore = useUserStore();
  const headers = {
    'Content-Type': 'application/json',
    ...options.headers,
    'Authorization': `Bearer ${userStore.token}`,
  };

  const response = await fetch(`${import.meta.env.VITE_API_URL}${url}`, {
    ...options,
    headers,
  });

  return response.json();
};
