<template>
  <transition name="fade">
    <section class="search" v-show="isActive">
      <navigation-bar
        :leftButtonData="leftNavButtonData"
        @leftButtonClick="closeSearch"
      />
      <div class="search__input-container">
        <input class="search__input" v-model="inputValue" :placeholder="placeholder">
        <div class="search__icon-container">
          <i class="fas fa-search search__input-icon"></i>

        </div>
      </div>
      <div class="search__results-container">
        <div v-if="results">
          <div v-for="(result, index) in results" :key="index" @click="closeSearch(result)">
            {{result.name}}
          </div>
        </div>
        <div class="search__no-results" v-else>
          {{noDataText}}
        </div>
      </div>
    </section>
  </transition>
</template>

<script>
import NavigationBar from './NavigationBar'
export default {
  name: 'Search',
  components: { NavigationBar },
  props: {
    options: {
      type: Array,
      required: true
    },
    placeholder: {
      type: String,
      default: 'City name'
    },
    noDataText: {
      type: String,
      default: 'No results'
    }
  },
  data () {
    return {
      // results: null,
      inputValue: '',
      isActive: false,
      leftNavButtonData: {
        title: 'Done',
        icon: ''
      }
    }
  },
  computed: {
    results () {
      if (this.options && this.inputValue) {
        // return this.options.filter((option) => {
        //   return option.name.includes(this.inputValue)
        // })
        const filterResults = []

        for (let index = 0; index < this.options.length; index++) {
          console.log(this.options[index])
          const optionName = this.options[index].name.toLowerCase()

          if (optionName.includes(this.inputValue.toLowerCase())) {
            filterResults.push(this.options[index])
          }

          if (filterResults.length >= 10) {
            break
          }
        }

        return filterResults.length ? filterResults : null
      }
      return null
    }
  },
  methods: {
    openSearch () {
      this.isActive = true
    },
    closeSearch (selectedData) {
      if (selectedData) {
        this.$emit('citySelected', selectedData)
      }
      this.isActive = false
    }
  }
}
</script>

<style scoped lang="scss">
  .search{
    position: absolute;
    height: 100vh;
    width: 100vw;
    top: 0;
    right: 0;
    background-color: #4E555E;

    &__input-container {
      padding: 7px;
      position: relative;
      background-color: #3A424C;
    }

    &__input {
      width: 100%;
      border-radius: 5px;
      border: 1px solid #4C9FC7;
      background-color: #484F58;
      color: #FFFFFF;
      font-size: 10px;
      line-height: 20px;
      padding: 0 24px;

      &::placeholder {
        color: #9FA0A5;
      }
    }

    &__icon-container{
      position: absolute;
      top: 7px;
      left: 14px;
      height: 22px;
      display: flex;
      justify-content: center;
      align-items: center;

    }

    &__input-icon {
      font-size: 10px;
      color: #9E9FA4;
    }

    &__results-container {
      height: calc(100% - 61px);
    }

    &__no-results {
      height: 100%;
      display: flex;
      align-items: center;
      justify-content: center;
    }
  }

</style>
