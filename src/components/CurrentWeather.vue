<template>
  <section class="current-weather">
    <div class="current-weather__temperature">
      {{temperature}}
    </div>
    <div class="current-weather__city">
      {{location}}
    </div>
    <div class="current-weather__weather">
      {{description}} {{icon}}
    </div>
  </section>
</template>

<script>
export default {
  name: 'CurrentWeather',
  props: {
    location: String,
    temperature: String,
    icon: String,
    description: String
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
  }

</style>
