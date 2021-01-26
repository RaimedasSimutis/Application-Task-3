<template>
  <section class="forecast-week">
    <div v-if="title" class="forecast-week__heading">title</div>
    <div class="forecast-week__content">
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

  </section>
</template>

<script>
export default {
  name: 'WeekForecast',
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

    &__heading {
      height: 35px;
      background: #3A424C;
    }

    &__content {
      display: flex;
      justify-content: space-between;
    }

    &__stats {
      display: flex;
      justify-content: space-around;
    }
  }
</style>
