<template>
  <div id="app">
<!--    <img alt="Vue logo" src="./assets/logo.png">-->
    <Index/>
  </div>
</template>

<script>
import Index from './components/Index.vue'

export default {
  name: 'App',
  components: {
    Index
  }
}
</script>

<style lang="scss">
  @import "styles/normalize.css";
  @import "styles/style.scss";
  @import "styles/fonts.scss";

#app {
  width: 100vw;
  height: 100vh;
  font-family: "Helvetika Neue 45 Light", Helvetica, sans-serif;
  font-weight: 400;
  color: #FFFFFF;
}
</style>
