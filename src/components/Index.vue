<template>
  <div class="container">
    <loader :active="loading"/>
    <navigation-bar
      :left-button-data="leftNavButtonData"
      :right-button-data="rightNavButtonData"
      title="Weather Forecast"
      :subtitle="currentCityData.location"
      @leftButtonClick="onLeftNavClick"
      @rightButtonClick="onRightNavClick"
    />
    <title-with-stats
      title="Day forecast"
      :stats="currentDayTemperature"
    />
    <current-weather
      :location="currentCityData.location"
      :temperature="currentCityData.temperature"
      :icon="currentCityData.icon"
      :description="currentCityData.description"
    />
    <week-forecast
      title="Week Forecast"
      :weatherData="weekForecastData"
    />
    <search
      ref="search-ref"
      title="Location"
      :subtitle="currentCityData.location"
      :options="CITIES_LIST" @selected="citySelected"
    />
  </div>
</template>

<script>
import WeekForecast from './WeekForecast'
import CurrentWeather from './CurrentWeather'
import NavigationBar from './NavigationBar'
import Search from './Search'
import CITIES_LIST from '../citiesSample.json'
import WEEK_DAYS from '../weekDays.json'
import TitleWithStats from './TitleWithStats'
import Loader from './Loader'

export default {
  name: 'Index',
  components: { Loader, TitleWithStats, Search, NavigationBar, CurrentWeather, WeekForecast },
  props: {
    msg: String
  },
  data () {
    return {
      CITIES_LIST,
      WEEK_DAYS,
      leftNavButtonData: {
        title: '',
        icon: 'fa-cloud',
        callback: this.onLeftNavClick
      },
      rightNavButtonData: {
        title: '',
        icon: 'fa-cog',
        callback: this.onRightNavClick
      }
    }
  },
  computed: {
    loading () {
      return this.$store.state.loading
    },
    currentCityData () {
      const data = this.$store.state.currentWeatherData

      if (data) {
        return {
          location: data.name,
          temperature: data.main.temp,
          icon: data.weather[0].icon,
          description: data.weather[0].main
        }
      }
      return {}
    },
    currentDayTemperature () {
      const { forecastWeatherData } = this.$store.state
      return [
        {
          value: forecastWeatherData ? Math.round(forecastWeatherData[0].temp.day) : '-',
          customClass: ''
        },
        {
          value: forecastWeatherData ? Math.round(forecastWeatherData[0].temp.night) : '-',
          customClass: 'text-darken'
        }
      ]
    },
    weekForecastData () {
      const { forecastWeatherData } = this.$store.state
      if (forecastWeatherData) {
        const forecastData = [...forecastWeatherData]
        forecastData.shift()

        return forecastData.map((weekday) => {
          const dayIndex = new Date(weekday.dt * 1000).getDay()

          return {
            day: WEEK_DAYS[dayIndex].name,
            icon: weekday.weather[0].icon,
            temperatureDay: Math.round(weekday.temp.day),
            temperatureNight: Math.round(weekday.temp.night)
          }
        })
      } else {
        return []
      }
    }
  },
  created () {
    this.$store.dispatch('fetchWeather', this.$store.state.default.cityCoords)
    this.$store.dispatch('getUserLocation')
  },
  methods: {
    onLeftNavClick () {
      this.$refs['search-ref'].openSearch()
    },
    onRightNavClick () {
      this.$refs['search-ref'].openSearch()
    },
    citySelected (cityData) {
      this.$store.dispatch('fetchWeather', { ...cityData.coord, name: cityData.name })
    }
  }
}
</script>

<style scoped lang="scss">

.container {
  display: flex;
  flex-direction: column;
  height: 100%;
  position: relative;
  background: linear-gradient(90deg, $bg-grey-1 0%, $bg-grey-2 50%, $bg-grey-3 100%);
}

</style>
