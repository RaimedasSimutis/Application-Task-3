<template>
  <div class="container">
    <navigation-bar/>
    <day-forecast :stats="currentWeatherTemp"/>
    <current-weather
      location="Vilnius"
      temperature="6"
      icon="empty"
      description="cloudy"
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
  name: 'HelloWorld',
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

.forecast-day {

}

</style>
