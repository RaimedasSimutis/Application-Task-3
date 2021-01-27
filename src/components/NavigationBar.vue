<template>
  <nav class="navbar">
    <button @click="buttonClick('left')">
      Settings
    </button>
    Navigation
  </nav>
</template>

<script>
export default {
  name: 'NavigationBar',
  methods: {
    buttonClick (buttonId) {
      switch (buttonId) {
        case 'left': this.$emit('leftButtonClick')
          break
        case 'right': this.$emit('righttButtonClick')
          break
      }
    }
  }
}
</script>

<style scoped>

</style>
