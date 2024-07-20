<script setup>
import { ref, computed, onMounted } from "vue";

const apiKey = "3220b3cdee7947d4b2a00531240907";

const currentLocation = ref("");
const currentDate = ref("");
const currentTemperature = ref("");
const humidity = ref("");
const windDirection = ref("");
const weatherForecast = ref([]);
const currentTime = new Date().getHours();

const weatherEmoji = computed(() => {
  if (currentTime >= 6 && currentTime < 12) {
    return "🌅🌆";
  } else if (currentTime >= 12 && currentTime < 18) {
    return "🌞🌻";
  } else {
    return "🌜🌠";
  }
});

const fetchWeatherData = async (location) => {
  try {
    const response = await fetch(
      `https://api.weatherapi.com/v1/forecast.json?key=${apiKey}&q=${location}&days=3`
    );
    const data = await response.json();

    currentDate.value = data.forecast.forecastday[0].date;
    currentTemperature.value = `${data.current.temp_c}`;
    humidity.value = data.current.humidity;
    windDirection.value = data.current.wind_dir;

    weatherForecast.value = data.forecast.forecastday.slice(1).map((day) => ({
      date: day.date,
      temperature: `${day.day.maxtemp_c}° / ${day.day.mintemp_c}°`,
    }));
  } catch (error) {
    console.error("Error fetching weather data:", error);
  }
};

const openWeatherSite = () => {
  window.open("https://www.weather.com", "_blank");
};

const getCurrentLocation = async () => {
  try {
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(async (position) => {
        const { latitude, longitude } = position.coords;
        const response = await fetch(
          `https://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${latitude},${longitude}`
        );
        const data = await response.json();
        currentLocation.value = `${data.location.name}, ${data.location.country}`;
        await fetchWeatherData(currentLocation.value);
      });
    } else {
      console.log("Geolocation is not available");
      await fetchWeatherData("Pristina, Kosovo");
    }
  } catch (error) {
    console.error("Error getting current location:", error);
    await fetchWeatherData("Pristina, Kosovo");
  }
};

onMounted(async () => {
  await getCurrentLocation();
});
</script>
<template>
  <div class="flex justify-between p-4">
    <div class="flex flex-col mb-4 justify-start">
      <h1 class="text-3xl font-semibold text-accent dark:text-dark-accent">
        Your Briefing
      </h1>
      <div class="text-base text-secondary dark:text-dark-secondary">
        {{ currentDate }}
      </div>
      <span class="text-[40px]">{{ weatherEmoji }}</span>
    </div>

    <div
      class="flex flex-col justify-end items-center py-1 px-4 bg-primary dark:bg-dark-primary text-text dark:text-dark-text rounded-lg"
    >
      <div class="mr-4">
        <div class="font-semibold text-lg text-accent dark:text-dark-accent">
          {{ currentLocation }}
        </div>
        <div class="text-sm">{{ currentTemperature }}°C</div>
        <div class="text-sm">{{ humidity }}% Humidity</div>
        <div class="text-sm">{{ windDirection }} Wind Direction</div>
        <button class="text-dark-text dark:text-text text-xs" @click="openWeatherSite">
          More on weather.com
        </button>
      </div>
    </div>
  </div>
</template>

<style scoped></style>
