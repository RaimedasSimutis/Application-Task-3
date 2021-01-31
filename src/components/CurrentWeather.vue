<template>
  <section class="current-weather">
    <div class="current-weather__temperature">
      {{convertedTemperature}}<span v-html="temperatureSign"></span>
    </div>
    <div class="current-weather__city">
      {{location}}
    </div>
    <div class="current-weather__weather">
      <div class="current-weather__weather-description">
        {{description}}
      </div>
      <div class="current-weather__weather-icon">
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
      return this.temperature ? Math.round(this.temperature) : '--'
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
    background: transparent;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;

    &__temperature {
      font-size: 50px;
      margin-bottom: 20px;
    }

    &__city {
      font-size: 22px;
    }

    &__weather {
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 14px;
      margin-top: 6px;
    }

    &__weather-description {
      margin-right: 5px;
    }

    &__weather-icon {
      /*background: url("http://openweathermap.org/img/wn/01n.png");*/
      width: 20px;
      height: 20px;
      display: flex;
      align-items: center;
      justify-content: center;

      img {
        height: 30px;
        width: 30px;
      }
    }
  }

</style>
