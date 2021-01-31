<template>
  <div class="container">
    <navigation-bar
      :left-button-data="leftNavButtonData"
      :right-button-data="rightNavButtonData"
      title="Weather Forecast"
      :subtitle="currentCityData.location"
      @leftButtonClick="onLeftNavClick"
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
      title="Week forecast"
      :weatherData="weekForecastData"
    />
    <search
      ref="search-ref"
      title="Location"
      :subtitle="currentCityData.location"
      :options="CITIES_TEST" @selected="citySelected"
    />
  </div>
</template>

<script>
import WeekForecast from './WeekForecast'
import CurrentWeather from './CurrentWeather'
import NavigationBar from './NavigationBar'
import Search from './Search'
import CITIES_LIST from '../citiesList.json'
import CITIES_TEST from '../citiesTest.json'
import WEEK_DAYS from '../weekDays.json'
import TitleWithStats from './TitleWithStats'

export default {
  name: 'Index',
  components: { TitleWithStats, Search, NavigationBar, CurrentWeather, WeekForecast },
  props: {
    msg: String
  },
  data () {
    return {
      CITIES_LIST,
      CITIES_TEST,
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
          customClass: ''
        }
      ]
    },
    weekForecastData () {
      const { forecastWeatherData } = this.$store.state
      if (forecastWeatherData) {
        // create shallow copy of data
        const forecastData = [...forecastWeatherData]
        forecastData.shift()

        return forecastData.map((weekday) => {
          // find day of the week
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
  async created () {
    await this.$store.dispatch('getUserLocation')
    // this.$store.dispatch('fetchWeather', 'Vilnius')
  },
  methods: {
    onLeftNavClick () {
      console.log('left click')
      this.$refs['search-ref'].openSearch()
    },
    onRightNavClick () {
      console.log('right click')
      // this.$refs['search-ref'].openSearch()
    },
    citySelected (cityData) {
      // console.log(cityData)
      this.$store.dispatch('fetchWeather', { ...cityData.coord, name: cityData.name })
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">

.container {
  display: flex;
  flex-direction: column;
  height: 100%;
  position: relative;
  background: linear-gradient(90deg, rgba(70,86,99,1) 0%, rgba(97,102,94,1) 50%, rgba(92,101,117,1) 100%);
}

</style>
