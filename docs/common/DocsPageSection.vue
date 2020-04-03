<template>

  <section :style="style" class="section-wrapper">
    <h2 v-if="title">
      {{ title }}
      <DocsAnchorTarget v-if="anchor" :anchor="anchor" />
    </h2>
    <slot></slot>
  </section>

</template>


<script>

  export default {
    name: 'DocsPageSection',
    props: {
      title: {
        type: String,
        required: true,
      },
      anchor: {
        type: String,
        required: true,
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
