import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    default: {
      cityCoords: {
        lat: 54.6872,
        lon: 25.2797
      },
      units: 'metric'
    },
    currentWeatherData: null,
    forecastWeatherData: null,
    // currentCity: null,
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
    SET_CURRENT_WEATHER (state, payload) {
      state.currentWeatherData = payload
    },
    SET_FORECAST_WEATHER (state, payload) {
      state.forecastWeatherData = payload
    }
    // SET_CITY(state, cityName) {
    //
    // }
    // SET_CITY_CORDS (state, payload) {
    //   const { lat, lon } = payload
    //   state.currentCity = { lat, lon }
    // }
  },
  actions: {
    fetchWeather ({ commit, state, dispatch }, userCityCords) {
      Promise.all([
        dispatch('fetchCurrentWeather', userCityCords),
        dispatch('fetchForecastWeather', userCityCords)
      ])
        .then(response => {
          console.log('data retreived')
        })
        .catch(reason => {
          console.log('data failet to retreive')
        })
    },
    fetchForecastWeather ({ commit, state }, cityCoords) {
      const { lat, lon } = cityCoords
      const exclude = 'minutely,hourly,current'
      const key = process.env.VUE_APP_WEATHER_API_KEY
      return axios.get(`https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&exclude=${exclude}&units=${state.default.units}&appid=${key}`)
        .then(response => {
          commit('SET_FORECAST_WEATHER', response.data.daily)
        })
    },
    fetchCurrentWeather ({ commit, state }, cityCoords) {
      const { lat, lon } = cityCoords
      const key = process.env.VUE_APP_WEATHER_API_KEY
      return axios.get(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=${state.default.units}&appid=${key}`)
        .then(response => {
          // commit('SET_CITY', userCityCords)
          commit('SET_CURRENT_WEATHER', response.data)
        })
    },
    getUserLocation ({ commit, state, dispatch }) {
      function success (pos) {
        const userCityCords = {
          lat: pos.coords.latitude,
          lon: pos.coords.longitude
        }
        // commit('SET_CITY_CORDS', userCityCords)
        dispatch('fetchWeather', userCityCords)
      }

      function error (err) {
        console.warn(`ERROR(${err.code}): ${err.message}`)
        // commit('SET_CITY_CORDS', state.defaultCityCords)
        dispatch('fetchWeather', state.defaultCityCords)
      }

      return navigator.geolocation.getCurrentPosition(success, error, state.geolocationOptions)
    }
  },
  modules: {
  }
})
