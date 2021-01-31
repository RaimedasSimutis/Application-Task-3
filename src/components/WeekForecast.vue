<template>
  <section class="forecast-week">
    <title-with-stats :title="title"/>
    <div v-if="weatherData && weatherData.length" class="forecast-week__content">
      <div
        v-for="(day, index) in weatherData"
        :key="index"
      >
        <div class="forecast-week__day-title">
          {{ day.day }}
        </div>

        <div class="forecast-week__icon">
          {{ day.icon }}
        </div>

        <div class="forecast-week__stats">
          <div class="forecast-week__stat">
            {{day.temperatureDay}}
          </div>
          <div class="forecast-week__stat">
            {{day.temperatureNight}}
          </div>
        </div>
      </div>
    </div>
    <div v-else>
      No data
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
      background-color: $bg-grey;
    }

    &__stats {
      display: flex;
      justify-content: space-around;
    }
  }
</style>
