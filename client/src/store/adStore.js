import { defineStore } from 'pinia';
import { fetchApi } from '@/utils/fetchApi';

export const usePersonalizedAdsStore = defineStore('personalizedAds', {
  state: () => ({
    ads: [],
    loading: false,
    error: null,
    totalAds: 0,
  }),

  actions: {
    async fetchPersonalizedAds(range = null) {
      this.loading = true;
      this.error = null;

      try {
        const url = `/ads/personalized${range ? `?range=${range}` : ''}`;
        const response = await fetchApi(url);
        
        this.ads = response.ads;
        this.totalAds = response.totalAds;
      } catch (error) {
        this.error = error.message;
        console.error('Error fetching personalized ads:', error);
      } finally {
        this.loading = false;
      }
    }
  }
});
