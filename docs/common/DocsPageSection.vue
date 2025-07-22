<template>

  <section
    :style="style"
    class="section-wrapper"
  >
    <h2 v-if="title">
      {{ title }}
      <DocsAnchorTarget
        v-if="anchor"
        :anchor="anchor"
      />
    </h2>
    <slot></slot>
  </section>

</template>


<script>

  import consola from 'consola';

  export default {
    name: 'DocsPageSection',
    props: {
      title: {
        type: String,
        default: null,
      },
      anchor: {
        type: String,
        default: null,
        validator(value) {
          return value.match(/#\w+/);
        },
      },
      fullwidth: {
        type: Boolean,
        default: false,
      },
    },
    computed: {
      style() {
        return this.fullwidth ? {} : { maxWidth: '900px' };
      },
    },
    mounted() {
      if (this.title && !this.anchor) {
        consola.warn(`DocsPageSection: An anchor is required for title '${this.title}'`);
      } else if (!this.title && this.anchor) {
        consola.warn(`DocsPageSection: A title is required for anchor '${this.anchor}'`);
      }
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
  @media (max-width: 768px) {
    .section-wrapper {
      overflow-x: scroll;
    }
  }

</style>
