import { fetchApi } from '@/utils/fetchApi';

export const authService = {
  async login(credentials) {
    try {
      const response = await fetchApi('/auth/login', {
        method: 'POST',
        body: JSON.stringify(credentials),
        headers: {
          'Content-Type': 'application/json',
        },
      });
      return response;
    } catch (error) {
      throw new Error(error.message);
    }
  },

  async register(userInfo) {
    try {
      const response = await fetchApi('/auth/register', {
        method: 'POST',
        body: JSON.stringify(userInfo),
        headers: {
          'Content-Type': 'application/json',
        },
      });
      return response;
    } catch (error) {
      throw new Error(error.message);
    }
  },

  async fetchUserInfo(token) {
    try {
      return await fetchApi('/auth/info', {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });
    } catch (error) {
      throw new Error(error.message);
    }
  },

  async refreshAuthToken(refreshToken) {
    try {
      const response = await fetchApi('/auth/refresh', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ refreshToken }),
      });
      return response;
    } catch (error) {
      throw new Error(error.message);
    }
  },

  async updateUser(userId, userUpdateData, token) {
    try {
      await fetchApi(`/user/${userId}`, {
        method: 'PUT',
        body: JSON.stringify(userUpdateData),
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
      });
    } catch (error) {
      throw new Error(error.message);
    }
  },

  async updateUserPart(userId, endpoint, data, token) {
    try {
      await fetchApi(endpoint, {
        method: 'PATCH',
        body: JSON.stringify(data),
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
      });
    } catch (error) {
      throw new Error(error.message);
    }
  },

  async loginWithProvider(provider) {
    try {
      window.location.href = `https://89xx7tdx-5095.euw.devtunnels.ms/auth/login-${provider}`;
    } catch (error) {
      throw new Error(error.message);
    }
  },

  async handleProviderCallback() {
    try {
      const urlParams = new URLSearchParams(window.location.search);
      const accessToken = urlParams.get('accessToken');
      const refreshToken = urlParams.get('refreshToken');

      if (accessToken && refreshToken) {
        localStorage.setItem('token', accessToken);
        localStorage.setItem('refreshToken', refreshToken);
        return { accessToken, refreshToken };
      } else {
        throw new Error('No tokens found in URL');
      }
    } catch (error) {
      throw new Error(error.message);
    }
  },

  async logout() {
    try {
      await fetchApi('/auth/logout', {
        method: 'POST',
      });
    } catch (error) {
      throw new Error(error.message);
    }
  },
};
