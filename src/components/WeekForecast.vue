<template>
  <section class="forecast-week">
    <title-with-stats :title="title"/>
    <div v-if="weatherData && weatherData.length" class="forecast-week__content">
      <div
        v-for="(day, index) in weatherData"
        :key="index"
        class="forecast-week__day-forecast"
      >
        <div class="forecast-week__day-name">
          {{ day.day }}
        </div>

        <div v-if="day.icon" class="forecast-week__icon">
          <img  :src="`http://openweathermap.org/img/wn/${day.icon}.png`" alt="icn"/>
        </div>

        <div class="forecast-week__stats">
          <div class="forecast-week__stat">
            {{day.temperatureDay}}
          </div>
          <div class="forecast-week__stat forecast-week__stat--darken">
            {{day.temperatureNight}}
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import TitleWithStats from './TitleWithStats'
export default {
  name: 'WeekForecast',
  components: { TitleWithStats },
  props: {
    weatherData: {
      type: Array,
      required: true
    },
    title: {
      type: String
    }
  }
}
</script>

<style scoped lang="scss">
  .forecast-week {

    &__content {
      display: flex;
      justify-content: space-between;
      padding: 10px;
    }

    &__day-forecast {
      width: 32px;
    }

    &__day-name {
      font-size: 11px;
      text-align: center;
      margin-bottom: 1px;
    }

    &__icon {
      width: 32px;
      height: 32px;
      display: flex;
      align-items: center;
      justify-content: center;

      img {
        width: 35px;
        height: 35px;
      }
    }

    &__stats {
      display: flex;
      justify-content: space-around;
    }

    &__stat {
      font-size: 10px;

      &--darken {
        color: $text-grey-light;
      }
    }

    &__stat {
      font-size: 10px;
    }
  }
</style>
