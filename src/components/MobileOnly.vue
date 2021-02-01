<template>
  <div v-if="isAlertVisible" class="mobile-only-alert">
    <p>We look better on mobile!</p>
    <img class="mobile-only-alert__image" :src="image" alt="mobile-illustration">
  </div>
</template>

<script>
import image from '../assets/images/mobile_illustration.svg'
export default {
  name: 'MobileOnly',
  data () {
    return {
      image,
      screenWidth: null,
      activationValue: 400
    }
  },
  computed: {
    isAlertVisible () {
      if (!this.screenWidth) {
        return false
      }
      return this.screenWidth > this.activationValue
    }
  },
  created () {
    window.addEventListener('resize', this.onScreenResize)
  },
  mounted () {
    this.screenWidth = window.innerWidth
  },
  destroyed () {
    window.removeEventListener('resize', this.onScreenResize)
  },
  methods: {
    onScreenResize () {
      this.screenWidth = window.innerWidth
    }
  }
}
</script>

<style scoped lang="scss">
  .mobile-only-alert {
    height: 100vh;
    width: 100vw;
    background-color: $bg-grey;
    position: fixed;
    top: 0;
    left: 0;
    z-index: 900;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    font-size: 21px;

    &__image {
      width: 60%;
    }
  }
</style>
