<template>
  <section class="current-weather">
    <div class="current-weather__temperature">
      6
    </div>
    <div class="current-weather__city">
      Vilnius
    </div>
    <div class="current-weather__weather">
      Foggy
    </div>
  </section>
</template>

<script>
export default {
  name: 'CurrentWeather'
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
