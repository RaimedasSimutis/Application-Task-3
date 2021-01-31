<template>
  <section class="title-with-stats">
    <div class="title-with-stats__title">
      {{ title }}
    </div>
    <div v-if="stats" class="title-with-stats__records">
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
      required: true
    },
    stats: {
      type: Array
    }
  }
}
</script>

<style scoped lang="scss">

  .title-with-stats {
    background-color: $bg-grey;
    display: flex;
    justify-content: space-between;
    padding: 10px 10px;
    font-size: 14px;

    &__records {
      display: flex;
    }

    &__record {
      margin-left: 12px;
    }
  }
</style>
