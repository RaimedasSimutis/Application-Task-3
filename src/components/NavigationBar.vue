<template>
  <nav class="navbar">
    <div class="navbar__button-container">
      <a v-if="leftButtonData" @click="buttonClick('left')">
        {{leftButtonData.title}}
      </a>
    </div>
    <div class="navbar__middle-container">
      <div class="navbar__middle-title">
        Navigation
      </div>
      <div class="navbar__middle-subtitle">
        None
      </div>
    </div>
    <div class="navbar__button-container">
      <a v-if="rightButtonData" @click="buttonClick('left')">
        {{rightButtonData.title}}
      </a>
    </div>

  </nav>
</template>

<script>
export default {
  name: 'NavigationBar',
  props: {
    leftButtonData: {
      type: Object
    },
    rightButtonData: {
      type: Object
    }
  },
  methods: {
    buttonClick (buttonId) {
      switch (buttonId) {
        case 'left': this.$emit('leftButtonClick')
          break
        case 'right': this.$emit('rightButtonClick')
          break
      }
    }
  }
}
</script>

<style scoped lang="scss">
  .navbar {
    height: 35px;
    background: #3A424C;
    display: flex;
    justify-content: space-between;

    &__button-container {
      /*flex-grow: 1;*/
      min-width: 50px;
      display: flex;
      justify-content: center;
      align-items: center;
    }

    &__middle-container {
      flex-grow: 1;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
    }

  }
</style>
