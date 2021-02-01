<template>
  <transition name="fade">
    <section class="search" v-show="isActive">
      <navigation-bar
        :leftButtonData="leftNavButtonData"
        :title="title"
        :subtitle="subtitle"
        @leftButtonClick="closeSearch"
      />
      <div class="search__input-container">
        <div class="search__icon-container search__icon-container--left">
          <i class="fas fa-search search__input-icon"></i>
        </div>
        <input class="search__input" v-model="inputValue" :placeholder="placeholder">
        <a class="search__icon-container search__icon-container--right" @click="emptyInput">
          <i class="fas fa-times-circle search__input-icon"></i>
        </a>
      </div>
      <div class="search__results-container">
        <div class="search__results" v-if="results">
          <div
            class="search__result-row"
            v-for="(result, index) in results"
            :key="index"
            @click="closeSearch(result)"
          >
            <div
              class="search__result-text"
              v-html="highlightMatchingText(result.name)"
            >
            </div>
          </div>
        </div>
        <div class="search__no-results" v-else>
          <p>{{noDataText}}</p>
          <img class="search__no-results-image" :src="noDataImage" alt="no-results">
        </div>
      </div>
    </section>
  </transition>
</template>

<script>
import NavigationBar from './NavigationBar'
import image from '../assets/images/no_data.svg'
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
    },
    title: {
      type: String
    },
    subtitle: {
      type: String
    }
  },
  data () {
    return {
      inputValue: '',
      isActive: false,
      noDataImage: image,
      leftNavButtonData: {
        title: 'Done',
        icon: '',
        customTitleClass: 'fs-14'
      }
    }
  },
  computed: {
    results () {
      if (this.options && this.inputValue) {
        const filterResults = []

        for (let index = 0; index < this.options.length; index++) {
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
        this.$emit('selected', selectedData)
      }
      this.inputValue = ''
      this.isActive = false
    },
    highlightMatchingText (name) {
      if (!name) {
        return
      }
      const inputText = this.inputValue.toLowerCase()
      const cityName = name.toLowerCase()
      const matchingStringIndex = cityName.indexOf(inputText)
      const stringBeforeMatch = name.slice(0, matchingStringIndex)
      const matchingString = name.slice(matchingStringIndex, matchingStringIndex + inputText.length)
      const stringAfterMatch = name.slice(matchingStringIndex + inputText.length)
      return `${stringBeforeMatch}<span style="color: #FFFFFF">${matchingString}</span>${stringAfterMatch}`
    },
    emptyInput () {
      this.inputValue = ''
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
    background-color: $bg-grey-light;
    display: flex;
    flex-direction: column;

    &__input-container {
      padding: 7px;
      position: relative;
      background-color: $bg-grey;
    }

    &__input {
      width: 100%;
      border-radius: 5px;
      border: 1px solid $border-blue;
      background-color: $bg-grey-4;
      color: $text-white;
      font-size: 12px;
      line-height: 24px;
      padding: 0 24px;

      &::placeholder {
        color: $text-grey-light;
      }
    }

    &__icon-container{
      position: absolute;
      height: 24px;
      display: flex;
      justify-content: center;
      align-items: center;

      &--left {
        top: 9px;
        left: 14px;
      }

      &--right {
        top: 9px;
        right: 14px;
      }
    }

    &__input-icon {
      font-size: 12px;
      color: #9E9FA4;
    }

    &__results-container {
      height: calc(100% - 61px);
    }

    &__results {
      padding-left: 15px;
      flex-grow: 1;
    }

    &__result-row {
      height: 35px;
      border-bottom: 1px solid $border-grey;
      display: flex;
      align-items: center;
      font-size: 12px;
    }

    &__result-text {
      color: $text-grey-light;
    }

    &__no-results {
      height: 100%;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
    }

    &__no-results-image {
      max-width: 80%;
      max-height: 50vh;
    }
  }

</style>
