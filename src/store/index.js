import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    defaultCityCords: {
      lat: 54.6872,
      lon: 25.2797
    },
    currentWeatherData: null,
    dailyWeatherData: null,
    currentCity: null,
    geolocationOptions: {
      enableHighAccuracy: true,
      timeout: 5000,
      maximumAge: 0
    }
    // temperatureUnit: 'celsius'
  },
  getters: {
  },
  mutations: {
    SET_WEATHER (state, payload) {
      state.currentWeatherData = payload.current
      state.dailyWeatherData = payload.daily
    },
    SET_CITY_CORDS (state, payload) {
      const { lat, lon } = payload
      state.currentCity = { lat, lon }
    }
  },
  actions: {
    fetchWeather ({ commit, state }) {
      const { lat, lon } = state.currentCity
      const exclude = 'minutely,hourly'
      const key = process.env.VUE_APP_WEATHER_API_KEY
      const units = 'metric'
      axios.get(`https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&exclude=${exclude}&units=${units}&appid=${key}`)
        .then(response => {
          const { current, daily } = response.data
          commit('SET_WEATHER', { current, daily })
        })
    },
    getUserLocation ({ commit, state, dispatch }) {
      function success (pos) {
        const userCityCords = {
          lat: pos.coords.latitude,
          lon: pos.coords.longitude
        }
        commit('SET_CITY_CORDS', userCityCords)
        dispatch('fetchWeather')
      }

      function error (err) {
        console.warn(`ERROR(${err.code}): ${err.message}`)
        commit('SET_CITY_CORDS', state.defaultCityCords)
      }

      return navigator.geolocation.getCurrentPosition(success, error, state.geolocationOptions)
    }
  },
  modules: {
  }
})
