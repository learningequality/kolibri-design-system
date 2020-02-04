<template>

  <section :style="style" class="section-wrapper">
    <h2 v-if="title">
      {{ title }}
      <AnchorTarget v-if="anchor" :anchor="anchor" />
    </h2>
    <slot></slot>
  </section>

</template>


<script>

  export default {
    name: 'PageSection',
    props: {
      title: {
        type: String,
        required: false,
      },
      anchor: {
        type: String,
        required: false,
      },
      fullwidth: {
        type: Boolean,
        default: false,
      },
    },
    computed: {
      style() {
        return this.fullwidth ? {} : { maxWidth: '700px' };
      },
    },
  };

</script>


<style lang="scss" scoped>

  .section-wrapper {
    margin-right: auto;
  }

  .section-wrapper:not(:first-child) {
    margin-top: 32px;
    border-top: 1px solid #dedede;
  }

</style>
