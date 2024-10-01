<template>
    <div class="container">
      <div class="header">
        <h1>WEATHER APP</h1>
        <div class="search-bar">
          <input
            type="text"
            v-model="city"
            placeholder="Enter city name"
            class="search-input"
          />
          <button @click="searchByCity" class="search-button">Search</button>
        </div>
      </div>
  
      <!-- Add the main section for displaying API data -->
      <main v-if="weatherData">
        <!-- Display the weather data attribute returned from API -->
        <h2>
          {{ weatherData.name }}, {{ weatherData.sys.country }}
        </h2>
        <div>
          <!-- Image source of the weather icon -->
          <img :src="iconUrl" alt="Weather Icon" />
          <p>{{ temperature }} °C</p>
        </div>
        <!-- Weather description -->
        <span>{{ weatherData.weather[0].description }}</span>
      </main>
    </div>
  </template>
  
  <script>
    import axios from "axios";
  
    const apikey = "45a44649fdecd7437ff1f2b97e4746b8";
  
    export default {
      name: "App",
      data() {
        return {
          city: "",
          weatherData: null,
        };
      },
      computed: {
        // Convert the temperature from Kelvin to Celsius
        temperature() {
          return this.weatherData
            ? Math.floor(this.weatherData.main.temp - 273.15)
            : null;
        },
        // Get the current weather icon URL
        iconUrl() {
          return this.weatherData
            ? `http://openweathermap.org/img/w/${this.weatherData.weather[0].icon}.png`
            : null;
        },
      },
      methods: {
        // Fetch weather data based on city input
        async searchByCity() {
          if (this.city !== "") {
            const url = `http://api.openweathermap.org/data/2.5/weather?q=${this.city}&appid=${apikey}`;
            await this.fetchWeatherData(url);
          }
        },
        // Fetch current weather data based on geolocation
        async fetchCurrentLocationWeather() {
          if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(async (position) => {
              const { latitude, longitude } = position.coords;
              const url = `http://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apikey}`;
              await this.fetchWeatherData(url);
            });
          }
        },
        // Fetch weather data from the API
        async fetchWeatherData(url) {
          try {
            const response = await axios.get(url);
            this.weatherData = response.data;
          } catch (error) {
            console.error("Error fetching weather data:", error);
          }
        },
      },
      mounted() {
        // Automatically fetch weather data for the user's current location when the app is mounted
        this.fetchCurrentLocationWeather();
      },
    };
  </script>
  
  <style scoped>
    .container {
      text-align: center;
    }
    .search-bar {
      margin: 20px;
    }
    .search-input {
      padding: 10px;
      font-size: 16px;
    }
    .search-button {
      padding: 10px;
      font-size: 16px;
      cursor: pointer;
    }
  </style>
  