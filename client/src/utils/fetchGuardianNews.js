export const fetchGuardianNews = async (url, options = {}) => {
    const baseUrl = import.meta.env.VITE_GUARDIAN_API_URL;
  
    const headers = {
      ...options.headers,
      'Content-Type': 'application/json',
    };
  
    try {
      const response = await fetch(`${baseUrl}${url}`, {
        ...options,
        headers,
      });
  
      if (!response.ok) {
        console.error(`HTTP error! status: ${response.status}, statusText: ${response.statusText}`);
        throw new Error(`HTTP error! status: ${response.status}`);
      }
  
      const jsonResponse = await response.json();
      console.log('Guardian fetch successful:', jsonResponse);
      return jsonResponse;
    } catch (error) {
      console.error('Guardian fetch error:', error.message);
      throw error;
    }
  };
  