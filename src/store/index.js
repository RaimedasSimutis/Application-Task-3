import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    weatherData: null,
    currentCity: null
  },
  mutations: {
    SET_WEATHER (state, payload) {
      state.weatherData = payload
    }
  },
  actions: {
    fetchWeather ({ commit, state }, city) {
      axios.get(`http://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${process.env.VUE_APP_WEATHER_API_KEY}`)
        .then(response => {
          commit('SET_WEATHER', response)
        })
    }
  },
  modules: {
  }
})
