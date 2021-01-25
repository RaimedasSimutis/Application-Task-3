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
    weatherData: null,
    currentCity: null,
    geolocationOptions: {
      enableHighAccuracy: true,
      timeout: 5000,
      maximumAge: 0
    }
  },
  mutations: {
    SET_WEATHER (state, payload) {
      state.weatherData = payload
    },
    SET_CITY_CORDS (state, payload) {
      const { lat, lon } = payload
      state.currentCity = { lat, lon }
    }
  },
  actions: {
    fetchWeather ({ commit, state }) {
      const { lat, lon } = state.currentCity
      axios.get(`http://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${process.env.VUE_APP_WEATHER_API_KEY}`)
        .then(response => {
          commit('SET_WEATHER', response)
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
