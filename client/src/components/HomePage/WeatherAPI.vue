<template>
    <div class="bg-background flex justify-between p-4">
      <div class="flex flex-col mb-4 justify-start">
        <h1 class="text-lg font-semibold text-text">Your Briefing</h1>
        <div class="text-sm text-text">{{ currentDate }}</div>
          <span class="text-[40px]">{{ weatherEmoji }}</span> 
      </div>
  
      <div class="flex flex-col justify-end items-center py-1 px-8 bg-secondary dark:bg-dark-secondary text-accent dark:text-dark-accent rounded-lg">
        <div class="mr-4">
          <div class="font-semibold text-lg">{{ currentLocation }}</div>
          <div class="text-sm">{{ currentTemperature }}°C</div>
          <div class="text-sm">{{ humidity }}% Humidity</div>
          <div class="text-sm">{{ windDirection }} Wind Direction</div>
          <button class="text-text dark:text-dark-text text-xs" @click="openWeatherSite">
            More on weather.com
          </button>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    name: 'WeatherWidget',
    data() {
      return {
        currentLocation: '',
        currentDate: '',
        currentTemperature: '',
        humidity: '',
        windDirection: '',
        weatherForecast: [],
        currentTime: new Date().getHours(),
      };
    },
    computed: {
      weatherEmoji() {
        if (this.currentTime >= 6 && this.currentTime < 12) {
          return '🌅🌆';
        } else if (this.currentTime >= 12 && this.currentTime < 18) {
          return '🌞🌻';
        } else {
          return '🌜🌠';
        }
      },
    },
    methods: {
      async fetchWeatherData(location) {
        try {
          const apiKey = this.apiKey;
          const response = await fetch(`https://api.weatherapi.com/v1/forecast.json?key=${apiKey}&q=${location}&days=3`);
          const data = await response.json();
  
          this.currentDate = data.forecast.forecastday[0].date;
          this.currentTemperature = `${data.current.temp_c}`;
          this.humidity = data.current.humidity;
          this.windDirection = data.current.wind_dir;
  
          this.weatherForecast = data.forecast.forecastday.slice(1).map(day => ({
            date: day.date,
            temperature: `${day.day.maxtemp_c}° / ${day.day.mintemp_c}°`
          }));
        } catch (error) {
          console.error('Error fetching weather data:', error);
        }
      },
      openWeatherSite() {
        window.open('https://www.weather.com', '_blank');
      },
      async getCurrentLocation() {
        try {
          if ("geolocation" in navigator) {
            navigator.geolocation.getCurrentPosition(async (position) => {
              const { latitude, longitude } = position.coords;
              const response = await fetch(`https://api.weatherapi.com/v1/current.json?key=${this.apiKey}&q=${latitude},${longitude}`);
              const data = await response.json();
              this.currentLocation = data.location.name + ', ' + data.location.country;
              await this.fetchWeatherData(this.currentLocation);
            });
          } else {
            console.log("Geolocation is not available");
            await this.fetchWeatherData('Pristina, Kosovo');
          }
        } catch (error) {
          console.error('Error getting current location:', error);
          await this.fetchWeatherData('Pristina, Kosovo');
        }
      }
    },
    async mounted() {
      await this.getCurrentLocation();
    },
    props: {
      apiKey: {
        type: String,
        required: true
      }
    }
  };
  </script>
  
  <style scoped>
  </style>
  