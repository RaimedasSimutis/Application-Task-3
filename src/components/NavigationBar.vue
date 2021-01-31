<template>
  <nav class="navbar">
    <div class="navbar__button-container navbar__button-container--left">
      <a v-if="leftButtonData" @click="buttonClick('left')">
        <i v-if="leftButtonData.icon" class="fas" :class="leftButtonData.icon"></i>
        <span v-if="leftButtonData.title" :class="leftButtonData.customTitleClass">
          {{leftButtonData.title}}
        </span>
      </a>
    </div>
    <div class="navbar__middle-container">
      <div class="navbar__middle-title">
        {{title}}
      </div>
      <div class="navbar__middle-subtitle">
        {{subtitle}}
      </div>
    </div>
    <div class="navbar__button-container navbar__button-container--right">
      <a v-if="rightButtonData" @click="buttonClick('right')">
        <i v-if="rightButtonData.icon" class="fas" :class="rightButtonData.icon"></i>
        <span v-if="rightButtonData.title" :class="rightButtonData.customTitleClass">
          {{rightButtonData.title}}
        </span>
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
    },
    title: {
      type: String
    },
    subtitle: {
      type: String
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
    padding: 0 10px;

    &__button-container {
      min-width: 50px;
      display: flex;

      align-items: center;
      color: #54C9F9;

      &--left {
        justify-content: flex-start;
      }

      &--right {
        justify-content: flex-end;
      }
    }

    &__middle-container {
      flex-grow: 1;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      font-size: 11px;
    }

    &__middle-title {
      margin-bottom: 3px;
    }

    &__middle-subtitle {
      color: $text-grey-light;
    }
  }
</style>
