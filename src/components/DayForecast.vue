<template>
  <section class="forecast-day">
    <div class="forecast-day__title">
      {{ title }}
    </div>

    <div class="forecast-day__stats">
      <div
        class=""
        :class="stat.customClass"
        v-for="(stat, index) in stats"
        :key="index"
      >
        {{stat.value}}
      </div>
    </div>
  </section>
</template>

<script>
export default {
  name: 'DayForecast',
  props: {
    title: {
      type: String,
      default: 'Day forecast'
    },
    stats: {
      type: Array,
      required: true
    }
  }
}
</script>

<style scoped>

</style>
