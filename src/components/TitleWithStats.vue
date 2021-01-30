<template>
  <section class="title-with-stats">
    <div class="title-with-stats__title">
      {{ title }}
    </div>

    <div class="title-with-stats__records">
      <div
        v-for="(record, index) in stats"
        :key="index"
        class="title-with-stats__record"
        :class="record.customClass"
      >
        {{record.value}}
      </div>
    </div>
  </section>
</template>

<script>
export default {
  name: 'TitleWithStats',
  props: {
    title: {
      type: String,
      default: 'Day forecast'
    },
    stats: {
      type: Array,
      required: true
    }
  }
}
</script>

<style scoped lang="scss">

  .title-with-stats {
    background-color: $bg-grey;
    display: flex;
    justify-content: space-between;

    &__records {
      display: flex;
    }

    &__record {
      margin-left: 12px;
    }
  }
</style>
