<template>
  <div class="container">
    <nav class="navbar">Navigation</nav>
    <section class="forecast-day">

    </section>
    <section class="forecast-current">
      <div class="forecast-day__temperature">
        6
      </div>
      <div class="forecast-day__city">
        Vilnius
      </div>
      <div class="forecast-day__weather">
        Foggy
      </div>
    </section>
    <week-forecast title="Week forecast" :weatherData="testData"/>
  </div>
</template>

<script>
import WeekForecast from './WeekForecast'
export default {
  name: 'HelloWorld',
  components: { WeekForecast },
  props: {
    msg: String
  },
  data () {
    return {
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

.forecast-current {
  flex-grow: 1;
  background: #ec0855;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

</style>
