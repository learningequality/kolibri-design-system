<template>

  <span v-if="!textEmpty" :style="textStyle">
    <template v-if="text">
      {{ text }}
    </template>
    <template v-else>
      <slot></slot>
    </template>
  </span>

  <KEmptyPlaceholder v-else />

</template>


<script>

  import KEmptyPlaceholder from './KEmptyPlaceholder.vue';

  export default {
    name: 'KOptionalText',
    components: {
      KEmptyPlaceholder,
    },
    props: {
      /**
       * Text to display
       */
      text: {
        type: String,
        default: null,
      },
      /**
       * If provided, sets the styles of the text
       */
      textStyle: {
        type: Object,
        default: null,
      },
    },
    computed: {
      textEmpty() {
        if (this.text && this.text.trim()) {
          return false;
        }

        const slotsText = this.getSlotsText();
        return !slotsText.trim();
      },
    },
    methods: {
      getSlotsText() {
        if (!this.$slots.default || !this.$slots.default.length) {
          return '';
        }

        return this.$slots.default
          .map(node => {
            if (node.text) {
              return node.text;
            }
            if (node.children) {
              return node.children.map(child => child.text).join('');
            }
            return '';
          })
          .join('');
      },
    },
  };

</script>


<style lang="scss" scoped></style>
