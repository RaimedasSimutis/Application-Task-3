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
    geolocationOptions: {
      enableHighAccuracy: true,
      timeout: 5000,
      maximumAge: 0
    },
    currentWeatherData: null,
    forecastWeatherData: null,
    loading: false
  },
  getters: {
  },
  mutations: {
    SET_CURRENT_WEATHER (state, payload) {
      state.currentWeatherData = payload
    },
    SET_FORECAST_WEATHER (state, payload) {
      state.forecastWeatherData = payload
    },
    SET_LOADING (state, payload) {
      state.loading = payload
    }
  },
  actions: {
    fetchWeather ({ commit, state, dispatch }, userCityCords) {
      dispatch('updateLoaderStatus', true)
      Promise.all([
        dispatch('fetchCurrentWeather', userCityCords),
        dispatch('fetchForecastWeather', userCityCords)
      ])
        .then(response => {
        })
        .catch(reason => {
          console.log('Failed to fetch data', reason)
        })
        .finally(() => {
          dispatch('updateLoaderStatus', false)
        })
    },
    fetchForecastWeather ({ commit, state }, cityCoords) {
      const { lat, lon } = cityCoords
      const exclude = 'minutely,hourly,current'
      const key = process.env.VUE_APP_WEATHER_API_KEY
      commit('SET_FORECAST_WEATHER', null)
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
          commit('SET_CURRENT_WEATHER', response.data)
        })
    },
    getUserLocation ({ state, dispatch }) {
      function success (pos) {
        const userCityCords = {
          lat: pos.coords.latitude,
          lon: pos.coords.longitude
        }
        dispatch('fetchWeather', userCityCords)
      }

      function error (err) {
        console.warn(`ERROR(${err.code}): ${err.message}`)
      }

      return navigator.geolocation.getCurrentPosition(success, error, state.geolocationOptions)
    },
    updateLoaderStatus ({ commit, state }, status) {
      commit('SET_LOADING', status)
    }
  },
  modules: {
  }
})
