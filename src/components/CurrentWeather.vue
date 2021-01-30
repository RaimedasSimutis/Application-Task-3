<template>
  <section class="current-weather">
    <div class="current-weather__temperature">
      {{convertedTemperature}}<span v-html="temperatureSign"></span>
    </div>
    <div class="current-weather__city">
      {{location}}
    </div>
    <div class="current-weather__weather">
      <div>
        {{description}}
      </div>
      <div>
        <img :src="`http://openweathermap.org/img/wn/${icon}.png`" alt="weather-icon"/>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  name: 'CurrentWeather',
  props: {
    location: String,
    temperature: Number,
    icon: String,
    description: String,
    temperatureUnit: {
      type: String
    }
  },
  computed: {
    convertedTemperature () {
      return this.temperature ? Math.round(this.temperature - 273.15) : '--'
    },
    temperatureSign () {
      switch (this.temperatureUnit) {
        case 'C': return '&#176;'
        case 'F': return '&#176;'
      }
      return '&#176;'
    }
  }
}
</script>

<style scoped lang="scss">

  .current-weather {
    flex-grow: 1;
    background: #ec0855;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;

    &__weather {
      display: flex;
      align-items: center;
      justify-content: center;
    }
  }

</style>
