<template>
  <div class="container">
    <navigation-bar/>
    <day-forecast :stats="currentWeatherTemp"/>
    <current-weather
      :location="currentCityData.location"
      :temperature="currentCityData.temperature"
      :icon="currentCityData.icon"
      :description="currentCityData.description"
    />
    <week-forecast title="Week forecast" :weatherData="testData"/>
  </div>
</template>

<script>
import WeekForecast from './WeekForecast'
import CurrentWeather from './CurrentWeather'
import DayForecast from './DayForecast'
import NavigationBar from './NavigationBar'
export default {
  name: 'Index',
  components: { NavigationBar, DayForecast, CurrentWeather, WeekForecast },
  props: {
    msg: String
  },
  data () {
    return {
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
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.navbar {
  height: 35px;
  background: #3A424C;
}

.container {
  display: flex;
  flex-direction: column;
  height: 100%;
}

</style>
