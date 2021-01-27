<template>
  <section class="search" v-show="isActive">
    <navigation-bar
      :leftButtonData="leftNavButtonData"
      @leftButtonClick="closeSearch"
    />
    <div>
      <input v-model="inputValue" :placeholder="placeholder">
    </div>
    <div>
      <div v-if="results">
        <div v-for="(result, index) in results" :key="index" @click="closeSearch(result)">
          {{result.name}}
        </div>
      </div>
      <div v-else>
        {{noDataText}}
      </div>
    </div>
  </section>
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

        return filterResults
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
    background: rgba(0, 255, 255, 0.68);
  }
</style>
