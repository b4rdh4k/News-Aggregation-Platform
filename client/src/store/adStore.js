// store/adsStore.js
import { defineStore } from 'pinia';
import { fetchApi } from '@/utils/fetchApi'; 

export const useAdsStore = defineStore('ads', {
  state: () => ({
    ads: [], 
    error: null,
  }),
  actions: {
    async fetchAllAds(range = null) {
      try {
        this.error = null;
        const response = await fetchApi('/ads/all', {
          method: 'GET',
          query: { range }, 
        });
        this.ads = response;
      } catch (error) {
        this.error = error.message;
      }
    },

    async fetchAllActiveAds(range = null) {
      try {
        this.error = null;
        const response = await fetchApi('/ads/allActive', {
          method: 'GET',
          query: { range },
        });
        console.log('Fetched ads:', response);
        this.ads = response;
      } catch (error) {
        this.error = error.message;
      }
    },
    

    async fetchAd(id) {
      try {
        this.error = null;
        const response = await fetchApi(`/ads/${id}`, {
          method: 'GET',
        });
        return response;
      } catch (error) {
        this.error = error.message;
        throw error;
      }
    },
  },
});
