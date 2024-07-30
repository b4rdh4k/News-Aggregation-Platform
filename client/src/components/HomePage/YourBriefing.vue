<script setup>
import { ref, computed, onMounted } from 'vue'

const apiKey = import.meta.env.VITE_WEATHER_API_KEY

const currentLocation = ref('')
const currentDate = ref('')
const currentTemperature = ref('')
const humidity = ref('')
const windDirection = ref('')
const weatherForecast = ref([])
const currentTime = new Date().getHours()
const weatherFetched = ref(false)
const locationPermissionDenied = ref(false)

const weatherEmoji = computed(() => {
  if (currentTime >= 6 && currentTime < 12) {
    return '🌅🌆'
  } else if (currentTime >= 12 && currentTime < 18) {
    return '🌞🌻'
  } else {
    return '🌜🌠'
  }
})

const fetchWeatherData = async (location) => {
  try {
    const response = await fetch(
      `https://api.weatherapi.com/v1/forecast.json?key=${apiKey}&q=${location}&days=3`
    )
    const data = await response.json()

    currentDate.value = data.forecast.forecastday[0].date
    currentTemperature.value = `${data.current.temp_c}`
    humidity.value = data.current.humidity
    windDirection.value = data.current.wind_dir

    weatherForecast.value = data.forecast.forecastday.slice(1).map((day) => ({
      date: day.date,
      temperature: `${day.day.maxtemp_c}° / ${day.day.mintemp_c}°`
    }))

    weatherFetched.value = true
  } catch (error) {
    console.error('Error fetching weather data:', error)
  }
}

const getCurrentLocation = async () => {
  try {
    if (locationPermissionDenied.value) {
      return
    }

    if ('geolocation' in navigator) {
      const position = await new Promise((resolve, reject) => {
        const successCallback = (position) => {
          resolve(position)
        }
        const errorCallback = (error) => {
          if (error.code === error.PERMISSION_DENIED) {
            locationPermissionDenied.value = true
          }
          reject(error)
        }
        navigator.geolocation.getCurrentPosition(successCallback, errorCallback)
      })

      const { latitude, longitude } = position.coords
      const response = await fetch(
        `https://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${latitude},${longitude}`
      )
      const data = await response.json()
      currentLocation.value = `${data.location.name}, ${data.location.country}`
      localStorage.setItem('userLocation', currentLocation.value)
      await fetchWeatherData(currentLocation.value)
    }
  } catch (error) {
    console.error('Error getting current location:', error)
  }
}

onMounted(async () => {
  const storedLocation = localStorage.getItem('userLocation')
  if (storedLocation) {
    currentLocation.value = storedLocation
    await fetchWeatherData(storedLocation)
  }
})
</script>

<template>
  <div class="container flex justify-between p-4">
    <div class="flex flex-col mb-4 justify-start">
      <h1 class="text-3xl font-semibold text-accent dark:text-dark-accent">Your Briefing</h1>
      <div class="text-base text-secondary dark:text-dark-secondary">
        {{ currentDate }}
      </div>
      <span class="text-[40px]" aria-hidden="true" >{{ weatherEmoji }}</span>    </div>

    <div v-if="weatherFetched" class="flex flex-col justify-center items-center py-1 px-4 bg-secondary dark:bg-dark-secondary bg-opacity-20 dark:bg-opacity-20 text-text dark:text-dark-text rounded-lg">
      <div class="mr-4">
        <div class="font-semibold text-lg text-text dark:text-dark-text">
          {{ currentLocation }}
        </div>
        <div class="text-sm">{{ currentTemperature }}°C</div>
        <div class="text-sm">{{ humidity }}% Humidity</div>
        <div class="text-sm">{{ windDirection }} Wind Direction</div>
      </div>
    </div>
    <div v-else>
      <button
        @click="getCurrentLocation"
        class="bg-primary dark:bg-dark-primary hover:bg-accent dark:hover:bg-dark-accent text-text dark:text-dark-text p-3 rounded-xl"
      >
        Get Weather
      </button>
    </div>
  </div>
</template>

<style scoped></style>
