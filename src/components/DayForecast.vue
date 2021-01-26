<template>
  <section class="forecast-day">
    <div class="forecast-day__title">
      {{ title }}
    </div>

    <div class="forecast-day__records">
      <div
        v-for="(record, index) in records"
        :key="index"
        class="forecast-day__record"
        :class="record.customClass"
      >
        {{record.value}}
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

<style scoped lang="scss">

  .forecast-day {

  }
</style>
