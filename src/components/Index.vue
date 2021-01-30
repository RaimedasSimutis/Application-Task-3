<template>
  <div class="container">
    <navigation-bar
      :left-button-data="leftNavButtonData"
      :right-button-data="rightNavButtonData"
      @leftButtonClick="onLeftNavClick"
    />
    <title-with-stats :stats="currentWeatherTemp"/>
    <current-weather
      :location="currentCityData.location"
      :temperature="currentCityData.temperature"
      :icon="currentCityData.icon"
      :description="currentCityData.description"
    />
    <week-forecast title="Week forecast" :weatherData="testData"/>
    <search ref="search-ref" :options="CITIES_TEST"/>
  </div>
</template>

<script>
import WeekForecast from './WeekForecast'
import CurrentWeather from './CurrentWeather'
import NavigationBar from './NavigationBar'
import Search from './Search'
import CITIES_LIST from '../citiesList.json'
import CITIES_TEST from '../citiesTest.json'
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
      leftNavButtonData: {
        title: '',
        icon: 'fa-cloud',
        callback: this.onLeftNavClick
      },
      rightNavButtonData: {
        title: '',
        icon: 'fa-cog',
        callback: this.onRightNavClick
      },
      currentWeatherTemp: [
        {
          value: 8,
          customClass: ''
        },
        {
          value: 2,
          customClass: ''
        }
      ],
      testData: [
        {
          day: 'MON',
          icon: 'O',
          temperatureDay: 7,
          temperatureNight: 8
        },
        {
          day: 'TUS',
          icon: 'O',
          temperatureDay: 7,
          temperatureNight: 8
        },
        {
          day: 'WED',
          icon: 'O',
          temperatureDay: 7,
          temperatureNight: 8
        },
        {
          day: 'THU',
          icon: 'O',
          temperatureDay: 7,
          temperatureNight: 8
        },
        {
          day: 'FRI',
          icon: 'O',
          temperatureDay: 7,
          temperatureNight: 8
        },
        {
          day: 'SAT',
          icon: 'O',
          temperatureDay: 7,
          temperatureNight: 8
        },
        {
          day: 'SUN',
          icon: 'O',
          temperatureDay: 7,
          temperatureNight: 8
        }
      ]

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
}

</style>
